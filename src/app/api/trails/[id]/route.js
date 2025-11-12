import { getTrailById } from '@/src/controllers/trail-controller';

// GET /api/trails/[id]
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const trail = await getTrailById(id);
    if (!trail) {
      return new Response(JSON.stringify({ error: 'Trail not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(trail), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
