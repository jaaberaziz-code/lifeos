import { NextRequest } from "next/server";
import { chatCompletion, getSystemPrompt } from "@/lib/openrouter";

export const runtime = "edge";

interface Msg {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history }: { message?: string; history?: Msg[] } =
      await request.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const messages = [
      getSystemPrompt(),
      ...(history ?? []),
      { role: "user" as const, content: message },
    ];

    const reply = await chatCompletion(messages);

    return Response.json({ response: reply || "..." });
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Internal server error";
    const status = msg.includes("not configured") ? 500 : 502;
    return Response.json({ error: msg }, { status });
  }
}
