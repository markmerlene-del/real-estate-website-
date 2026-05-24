import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

export const maxDuration = 10;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Tonia, a warm and knowledgeable real estate assistant for Texas Platinum Group — a full-service real estate brokerage in Texas. You're also affiliated with BPO Homes.

Your role is to:
- Warmly greet visitors and learn about their real estate needs
- Help buyers understand the home-buying process in Texas
- Help sellers understand how to list and price their home
- Answer questions about Texas Platinum Group's services (buyer representation, seller representation, investment properties, commercial real estate, BPO/valuations)
- Qualify leads by naturally collecting: name, email, phone number, whether they're buying or selling, property type, budget range, and timeline
- Explain the benefits of working with Texas Platinum Group

When collecting lead info, do it conversationally — don't ask for everything at once. Start by asking what brings them in today.

Once you have collected a person's name AND email AND at least one of (phone, budget, or property interest), output a JSON block at the very end of your message in this exact format (do NOT include it before you have at least name + email):
<lead_data>{"name":"...","email":"...","phone":"...","property_type":"...","budget_range":"...","timeline":"...","message":"..."}</lead_data>

Keep responses concise and friendly. You represent a professional real estate team, so be warm but professional. If asked about specific property listings, let them know you can connect them with an agent who will share current listings that match their needs.

Texas Platinum Group is based in Texas and serves the DFW area and surrounding regions.`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = anthropic.messages.stream({
          model: "claude-haiku-4-5",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages,
        });

        let fullText = "";

        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const chunk = event.delta.text;
            fullText += chunk;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "text", content: chunk })}\n\n`)
            );
          }
        }

        // Check if lead data was captured
        const leadMatch = fullText.match(/<lead_data>([\s\S]*?)<\/lead_data>/);
        if (leadMatch) {
          try {
            const leadData = JSON.parse(leadMatch[1]);
            const supabase = await createClient();
            await supabase.from("leads").insert({
              name: leadData.name || "",
              email: leadData.email || "",
              phone: leadData.phone || null,
              property_type: leadData.property_type || null,
              budget_range: leadData.budget_range || null,
              timeline: leadData.timeline || null,
              message: leadData.message || null,
              stage: "new",
              source: "website",
            });
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "lead_saved" })}\n\n`)
            );
          } catch {
            // Silent fail — lead save is best-effort
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "error", content: msg })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
