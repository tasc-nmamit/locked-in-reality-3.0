import { db } from "~/server/db";

export const dynamic = "force-static";

export async function GET() {
  try {
    const data = await db.question.findMany({
      select: { id: true },
      orderBy: { level: "asc" },
    });

    return new Response(JSON.stringify({ data: data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}
