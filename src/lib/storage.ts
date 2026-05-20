/**
 * Storage service for LifeOS
 *
 * Strategy:
 * 1. Vercel KV (Upstash REST API) - in production when env vars are set
 * 2. JSON file fallback - in development
 *
 * No external packages needed — uses plain fetch() for KV.
 */

export interface RegretRecord {
  id?: string;
  text: string;
  category: string;
  timestamp: string;
}

const KV_KEY = "lifeos_regrets";

// ── KV helpers ──────────────────────────────────────────────────────

function getKvConfig() {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    "";
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    "";
  return url && token ? { url, token } : null;
}

async function kvGet<T>(key: string): Promise<T | null> {
  const cfg = getKvConfig();
  if (!cfg) return null;

  const res = await fetch(`${cfg.url}/get/${key}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
  });

  if (!res.ok) {
    console.error(`KV GET error: ${res.status} ${res.statusText}`);
    return null;
  }

  const data = await res.json();
  // Upstash returns { result: "..." } with the value as a JSON string
  if (data.result === null || data.result === undefined) return null;

  try {
    return JSON.parse(data.result) as T;
  } catch {
    return data.result as T;
  }
}

async function kvSet(key: string, value: unknown): Promise<boolean> {
  const cfg = getKvConfig();
  if (!cfg) return false;

  // Upstash REST API expects the raw JSON value as the body
  const res = await fetch(`${cfg.url}/set/${key}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  return res.ok;
}

function generateId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

// ── File fallback ───────────────────────────────────────────────────

async function readFileFallback(): Promise<RegretRecord[]> {
  const dbPath = process.env.VERCEL
    ? "/tmp/regrets.json"
    : process.cwd() + "/src/data/regrets.json";
  try {
    const fs = await import("fs/promises");
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeFileFallback(regrets: RegretRecord[]): Promise<void> {
  const dbPath = process.env.VERCEL
    ? "/tmp/regrets.json"
    : process.cwd() + "/src/data/regrets.json";
  const fs = await import("fs/promises");
  const path = await import("path");
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(regrets, null, 2));
}

// ── Public API ──────────────────────────────────────────────────────

export async function getRegrets(): Promise<RegretRecord[]> {
  // Try KV first
  const kv = getKvConfig();
  if (kv) {
    const data = await kvGet<RegretRecord[]>(KV_KEY);
    if (data) return data;
  }

  // Fallback to file
  return readFileFallback();
}

export async function addRegret(
  text: string,
  category: string,
): Promise<RegretRecord> {
  const record: RegretRecord = {
    id: generateId(),
    text,
    category,
    timestamp: new Date().toISOString(),
  };

  // Try KV
  const kv = getKvConfig();
  if (kv) {
    const existing = (await kvGet<RegretRecord[]>(KV_KEY)) || [];
    existing.unshift(record);
    await kvSet(KV_KEY, existing);
    return record;
  }

  // Fallback to file
  const existing = await readFileFallback();
  existing.unshift(record);
  await writeFileFallback(existing);
  return record;
}
