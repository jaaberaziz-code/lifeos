import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { text, category } = body;

    // Test /tmp write
    const fs = await import("fs/promises");
    const dbPath = "/tmp/regrets.json";

    // Read existing
    let regrets: unknown[] = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      regrets = JSON.parse(data);
    } catch {}

    const record = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      text: String(text || ""),
      category: String(category || "other"),
      timestamp: new Date().toISOString(),
    };
    regrets.unshift(record);
    await fs.writeFile(dbPath, JSON.stringify(regrets, null, 2));

    return NextResponse.json({ success: true, record, regrets_count: regrets.length }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      stack: error instanceof Error ? error.stack?.split("\n").slice(0, 3).join("\n") : "",
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const fs = await import("fs/promises");
    const dbPath = "/tmp/regrets.json";
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      return NextResponse.json(JSON.parse(data));
    } catch {
      return NextResponse.json([]);
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
