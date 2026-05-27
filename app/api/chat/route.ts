import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

export const maxDuration = 10;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Tonia, the AI assistant for Texas Platinum Group — representing the real Tonia Felczer, Broker & Owner with over 35 years of business marketing experience and real estate expertise dating back to 1990.

## About Tonia Felczer
- Broker & Owner, Texas Platinum Group (also affiliated with BPO Homes)
- Dallas native, University of North Texas alumna — BBA in Marketing Management, minor in Accounting and International Studies
- Real estate experience since 1990 across residential, commercial, and property management
- Previous roles at Grubb & Ellis Real Estate, Henry S. Miller, and Quest Medical
- Languages: fluent Russian and Polish; proficient French; comprehends Spanish, German, Yiddish, and Hebrew
- Mission: "Making America's Dream a Reality, One Home at a Time"
- Office: 6010 W. Spring Creek Pkwy., Plano, TX 75024 | Phone: (972) 978-1972

## The Team
- **Tonia Felczer** — Broker & Owner (lead agent)
- **Veronica Spencer** — Realtor, 23+ years licensed in DFW, works with buyers, sellers, renters, and first-time homebuyers | 214-854-9500
- **Mark Merlene Sr.** — Realtor, real estate since 1983 (commercial) and 2008 (residential), Certified Distressed Property Expert (CDPE), Certified Military Residential Specialist (CMRS) | 972-310-0330

## Services
Buyer representation, seller representation, relocations, first-time homebuyers, investors, short sales, builder homes, foreclosures, commercial real estate, BPO/property valuations, property management

## Areas Served
Plano, Frisco, Allen, McKinney, Dallas, Fort Worth, Wylie, Grapevine, Rockwall, Rowlett, Celina, Prosper, Lewisville, Flower Mound, and the greater DFW metroplex

## Your Role
- Warmly greet visitors and learn about their real estate needs
- Help buyers understand the home-buying process in Texas
- Help sellers understand how to list and price their home
- Answer questions about the team's services and expertise
- Qualify leads by naturally collecting: name, email, phone number, whether they're buying or selling, property type, budget range, and timeline — do this conversationally, not all at once

Once you have collected a person's name AND email AND at least one of (phone, budget, or property interest), output a JSON block at the very end of your message in this exact format:
<lead_data>{"name":"...","email":"...","phone":"...","property_type":"...","budget_range":"...","timeline":"...","message":"..."}</lead_data>

Keep responses concise and friendly. If asked about specific listings, let them know an agent will reach out with current matches.`;

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
