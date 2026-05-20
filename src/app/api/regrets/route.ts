import { NextRequest, NextResponse } from "next/server";
import { getRegrets, addRegret } from "@/lib/storage";

// ── Profanity filter ────────────────────────────────────────────────
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

// ── POST ─────────────────────────────────────────────────────────────
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

    const record = await addRegret(
      cleaned,
      typeof category === "string" ? category.toLowerCase() : "other",
    );

    return NextResponse.json({ success: true, record }, { status: 201 });
  } catch (error) {
    console.error("POST /api/regrets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ── GET ──────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const regrets = await getRegrets();
    return NextResponse.json(regrets);
  } catch (error) {
    console.error("GET /api/regrets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
