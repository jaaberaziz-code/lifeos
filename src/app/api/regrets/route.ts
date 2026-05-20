import { NextRequest, NextResponse } from "next/server";
import { getSuperpowersClient } from "@/lib/superpowers";

// ── Profanity filter (basic) ─────────────────────────────────────────
const PROFANITY_LIST = [
  /\b(fuck|shit|bitch|asshole|bastard|damn|crap|dick|piss)\b/gi,
];

function cleanText(text: string): string {
  let cleaned = text.trim();
  for (const pattern of PROFANITY_LIST) {
    cleaned = cleaned.replace(pattern, (match) => "*".repeat(match.length));
  }
  return cleaned;
}

// ── POST — Submit a regret ───────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, category } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const cleaned = cleanText(text);
    if (cleaned.length < 3) {
      return NextResponse.json(
        { error: "Text must be at least 3 characters" },
        { status: 400 },
      );
    }

    const record = {
      text: cleaned,
      category: typeof category === "string" ? category.toLowerCase() : "other",
      timestamp: new Date().toISOString(),
    };

    const client = getSuperpowersClient();

    // Try Superpowers; fall back to file-based storage if unavailable
    try {
      await client.insert(record);
    } catch {
      // Fallback: write to a local JSON file
      const fs = await import("fs/promises");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "src/data/regrets.json");

      let regrets: unknown[] = [];
      try {
        const existing = await fs.readFile(filePath, "utf-8");
        regrets = JSON.parse(existing);
      } catch {
        // File doesn't exist yet
      }
      regrets.unshift(record);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(regrets, null, 2));
    }

    return NextResponse.json({ success: true, record }, { status: 201 });
  } catch (error) {
    console.error("POST /api/regrets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ── GET — Fetch all regrets ──────────────────────────────────────────
export async function GET() {
  try {
    const client = getSuperpowersClient();
    let regrets: unknown[];

    try {
      regrets = await client.list();
    } catch {
      // Fallback to file
      const fs = await import("fs/promises");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "src/data/regrets.json");
      try {
        const data = await fs.readFile(filePath, "utf-8");
        regrets = JSON.parse(data);
      } catch {
        regrets = [];
      }
    }

    // Sort descending by timestamp
    const sorted = (regrets as Array<{ timestamp?: string }>).sort(
      (a, b) =>
        new Date(b.timestamp || 0).getTime() -
        new Date(a.timestamp || 0).getTime(),
    );

    return NextResponse.json(sorted);
  } catch (error) {
    console.error("GET /api/regrets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
