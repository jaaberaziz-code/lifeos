import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    return NextResponse.json({
      response: `You said: "${message || "nothing"}" — LifeOS AI ready to help.`,
    });
  } catch {
    return NextResponse.json({ response: "Send me a message to reflect on." });
  }
}
