export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const userMessage = body.messages?.at(-1)?.content;

    const res = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await res.json();

    return new Response(
      JSON.stringify({ role: "assistant", content: data.reply }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error", { status: 500 });
  }
}
