/**
 * OpenRouter AI client for LifeOS
 * 
 * Uses OpenRouter API to provide AI-powered reflection & assistance.
 * Configurable via NEXT_PUBLIC_OPENROUTER_API_KEY or OPENROUTER_API_KEY env vars.
 */

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  signal?: AbortSignal;
}

function getApiKey(): string {
  return (
    process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
    process.env.OPENROUTER_API_KEY ||
    ""
  );
}

export function isAiEnabled(): boolean {
  return !!getApiKey();
}

export function getDefaultModel(): string {
  return process.env.NEXT_PUBLIC_AI_MODEL || "google/gemini-2.0-flash-exp:free";
}

/**
 * Send a chat completion request to OpenRouter (server-side)
 */
export async function chatCompletion(
  messages: ChatMessage[],
  options: ChatOptions = {},
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("OpenRouter API key not configured");
  }

  const model = options.model || getDefaultModel();

  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://lifeos-self-nu.vercel.app",
      "X-Title": "LifeOS",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 500,
    }),
    signal: options.signal,
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "Unknown error");
    throw new Error(`OpenRouter ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

/**
 * System prompt for the LifeOS AI Assistant
 */
export function getSystemPrompt(): ChatMessage {
  return {
    role: "system",
    content: `You are LifeOS AI — a compassionate, insightful assistant for "Regrets of a Lifetime."

Your role:
- Help users reflect on their regrets with empathy and wisdom
- Offer gentle perspective shifts without toxic positivity
- Suggest actionable insights when appropriate
- Keep responses concise (2-4 sentences usually)
- Maintain a warm, melancholic-but-hopeful tone
- NEVER judge or minimize someone's regret

Theme: dark, introspective, cathartic. You're like a wise friend in a dimly lit café at 2am.`,
  };
}
