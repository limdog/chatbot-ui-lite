export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const userMessage = body.messages?.at(-1)?.content;

    const url = new URL(process.env.N8N_WEBHOOK_URL!);
    url.searchParams.append("message", userMessage || "");

    const res = await fetch(url.toString(), { method: "GET" });

    // Parse n8n response
    const data = await res.json();
    const replyText = Array.isArray(data) ? data[0]?.reply : data.reply;

    // Return in Chatbot UI Lite expected format
    return new Response(
      JSON.stringify({
        role: "assistant",
        content: replyText ?? "Sorry, I couldn't generate a reply.",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("chat.ts error", err);
    return new Response("Error", { status: 500 });
  }
}
