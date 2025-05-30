export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const userMessage = body.messages?.at(-1)?.content;

    const url = new URL(process.env.N8N_WEBHOOK_URL!);
    url.searchParams.append("message", userMessage || "");

    const res = await fetch(url.toString(), {
      method: "GET"
    });

    const data = await res.json();

    // Extract reply from n8n response
    const replyText = Array.isArray(data) ? data[0]?.reply : data.reply;

    return new Response(
      JSON.stringify({ role: "assistant", content: replyText }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response("Error", { status: 500 });
  }
}
