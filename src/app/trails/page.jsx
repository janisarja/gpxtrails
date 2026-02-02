import TrailList from '@/src/components/trail-list';
import { getAllTrails } from '@/src/controllers/trail-controller';
import AllTrailsMapWrapper from '@/src/components/all-trails-map-wrapper';
import TwoColumnLayout from '@/src/components/two-column-layout';

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
    <TwoColumnLayout
      left={<TrailList trails={trails} />}
      right={<AllTrailsMapWrapper trails={trails} />}
    />
  );
}

export default Page;
