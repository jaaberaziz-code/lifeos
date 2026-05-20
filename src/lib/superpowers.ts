/**
 * Superpowers Database Client
 *
 * Connects to a Superpowers instance (https://github.com/obra/superpowers)
 * for real-time data persistence.
 *
 * Configure via SUPERPOWERS_API_URL env var (default: http://localhost:3000)
 */

const DEFAULT_BUCKET = "regrets_database";

interface SuperpowersConfig {
  apiUrl: string;
  bucket: string;
}

interface RegretRecord {
  id?: string;
  text: string;
  category: string;
  timestamp: string;
}

class SuperpowersClient {
  private config: SuperpowersConfig;

  constructor() {
    this.config = {
      apiUrl:
        process.env.SUPERPOWERS_API_URL ||
        process.env.NEXT_PUBLIC_SUPERPOWERS_API_URL ||
        "http://localhost:3000",
      bucket: DEFAULT_BUCKET,
    };
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  get bucket(): string {
    return this.config.bucket;
  }

  // ── CRUD ──────────────────────────────────────────────────────────

  /** Insert a record into the Superpowers bucket */
  async insert(record: RegretRecord): Promise<Response> {
    const url = `${this.config.apiUrl}/api/buckets/${this.config.bucket}/rows`;
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  }

  /** Fetch all records from the Superpowers bucket */
  async list(): Promise<RegretRecord[]> {
    const url = `${this.config.apiUrl}/api/buckets/${this.config.bucket}/rows`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Superpowers fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    // Support both { rows: [...] } and direct array responses
    return Array.isArray(data) ? data : data.rows ?? [];
  }
}

// Singleton
let client: SuperpowersClient | null = null;

export function getSuperpowersClient(): SuperpowersClient {
  if (!client) {
    client = new SuperpowersClient();
  }
  return client;
}

export type { RegretRecord, SuperpowersConfig };
