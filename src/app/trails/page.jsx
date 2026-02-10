import TrailList from '@/src/components/trails/trail-list';
import { getAllTrails } from '@/src/controllers/trail-controller';
import AllTrailsMapWrapper from '@/src/components/wrappers/all-trails-map-wrapper';
import TwoColumnLayout from '@/src/components/ui/two-column-layout';

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
    <section aria-labelledby="trails-title">
      <h1 id="trails-title" className="sr-only">Trails</h1>
      <TwoColumnLayout
        leftLabel="Trail list"
        rightLabel="Trails map"
        left={<TrailList trails={trails} />}
        right={<AllTrailsMapWrapper trails={trails} />}
      />
    </section>
  );
}

export default Page;
