import TrailInfo from '@/src/components/trail-info';
import TrailMapWrapper from '@/src/components/trail-map-wrapper';
import { getTrailById } from '@/src/controllers/trail-controller';

const Page = async ({ params }) => {
  const { id } = await params;
  
  let trail;

  try {
  trail = await getTrailById(id);
  } catch (err) {
    return (<div>{res.status} Failed to fetch trail</div>)
  }

  if (trail) return (
    <div>
      <TrailInfo trail={trail} />
      <TrailMapWrapper trail={trail.geojson} center={trail.center}/>
    </div>
  );
}

export default Page;
