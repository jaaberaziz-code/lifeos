import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, getSystemPrompt, isAiEnabled } from "@/lib/openrouter";

export async function POST(request: NextRequest) {
  if (!isAiEnabled()) {
    return NextResponse.json(
      { error: "AI not configured — add OPENROUTER_API_KEY" },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      getSystemPrompt(),
      ...(history || []).slice(-10),
      { role: "user", content: message },
    ];

    const response = await chatCompletion(messages);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "AI request failed" },
      { status: 500 },
    );
  }
}
