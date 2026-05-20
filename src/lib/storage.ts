/**
 * Storage service for LifeOS
 *
 * Layers (first available wins):
 * 1. Vercel KV (Upstash REST API) — when env vars are set from Vercel dashboard
 * 2. /tmp/regrets.json — writable on Vercel serverless
 * 3. src/data/regrets.json — local development fallback
 */

export interface RegretRecord {
  id: string;
  text: string;
  category: string;
  timestamp: string;
}

const KV_KEY = "lifeos_regrets";

// ── Helpers ─────────────────────────────────────────────────────────

function generateId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

function getDbPath(): string {
  if (process.env.VERCEL) return "/tmp/regrets.json";
  return process.cwd() + "/src/data/regrets.json";
}

// ── KV Layer (Upstash REST API) ────────────────────────────────────

function getKvConfig(): { url: string; token: string } | null {
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

  try {
    const res = await fetch(`${cfg.url}/get/${key}`, {
      headers: { Authorization: `Bearer ${cfg.token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.result === null || data.result === undefined) return null;
    return typeof data.result === "string"
      ? JSON.parse(data.result)
      : data.result;
  } catch {
    return null;
  }
}

async function kvSet(key: string, value: unknown): Promise<boolean> {
  const cfg = getKvConfig();
  if (!cfg) return false;

  try {
    const res = await fetch(`${cfg.url}/set/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── File Layer ─────────────────────────────────────────────────────

async function readFile(): Promise<RegretRecord[]> {
  const fs = await import("fs/promises");
  try {
    const data = await fs.readFile(getDbPath(), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeFile(regrets: RegretRecord[]): Promise<void> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const dbPath = getDbPath();
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(regrets, null, 2));
}

// ── Public API ─────────────────────────────────────────────────────

export async function getRegrets(): Promise<RegretRecord[]> {
  // 1. KV
  const kv = getKvConfig();
  if (kv) {
    const data = await kvGet<RegretRecord[]>(KV_KEY);
    if (data) return data;
  }
  // 2. File (Vercel /tmp or local)
  return readFile();
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

  const kv = getKvConfig();
  if (kv) {
    const existing = (await kvGet<RegretRecord[]>(KV_KEY)) || [];
    existing.unshift(record);
    await kvSet(KV_KEY, existing);
    return record;
  }

  // File fallback
  const existing = await readFile();
  existing.unshift(record);
  await writeFile(existing);
  return record;
}
