import { createTrail, getAllTrails } from '@/src/controllers/trail-controller';

// GET /api/trails
export async function GET(req) {
  try {
    const trails = await getAllTrails(req);
    return new Response(JSON.stringify(trails), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST /api/trails
export async function POST(req) {
  try {
    const body = await req.json();
    const newTrail = await createTrail(body);
    return new Response(JSON.stringify(newTrail), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
