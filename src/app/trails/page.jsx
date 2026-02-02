import TrailList from '@/src/components/trail-list';
import { getAllTrails } from '@/src/controllers/trail-controller';
import AllTrailsMapWrapper from '@/src/components/all-trails-map-wrapper';

const Page = async () => {
  let trails;
  try {
    trails = await getAllTrails();
    // Convert to plain objects
    if (Array.isArray(trails)) trails = trails.map(t => (typeof t.toJSON === 'function' ? t.toJSON() : t));
  } catch (err) {
    console.log(err);
    return (<div>Failed to fetch trails</div>)
  }

  if (trails) return (
    <div>
      <TrailList trails={trails} />
      <AllTrailsMapWrapper trails={trails} />
    </div>
  );
}

export default Page;
