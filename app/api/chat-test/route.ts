import Anthropic from "@anthropic-ai/sdk";

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY;

  if (!key) {
    return Response.json({ error: "ANTHROPIC_API_KEY is not set in environment variables" });
  }

  try {
    const anthropic = new Anthropic({ apiKey: key });
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 20,
      messages: [{ role: "user", content: "say hi" }],
    });
    return Response.json({ ok: true, reply: msg.content[0] });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : String(err) });
  }
}
