import { NextRequest } from "next/server";

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
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt: Msg = {
      role: "system",
      content:
        "You are LifeOS AI, an assistant for personal growth, reflection, and life management. " +
        "Be warm, concise, and practical. The user shares thoughts, regrets, or questions about life. " +
        "Respond with empathy and actionable insights. Keep responses under 4 sentences unless they ask for depth.",
    };

    const messages: Msg[] = [
      systemPrompt,
      ...(history ?? []),
      { role: "user", content: message },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://lifeos-self-nu.vercel.app",
          "X-Title": "LifeOS",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter error:", response.status, error);
      return new Response(
        JSON.stringify({
          error: `AI service error (${response.status})`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "...";

    return new Response(JSON.stringify({ response: reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
