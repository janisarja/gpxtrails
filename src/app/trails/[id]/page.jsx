import TrailInfo from '@/src/components/trails/trail-info';
import TrailMapWrapper from '@/src/components/wrappers/trail-map-wrapper';
import { getTrailById } from '@/src/controllers/trail-controller';
import GPXDownloaderWrapper from '@/src/components/wrappers/gpx-downloader-wrapper';
import TwoColumnLayout from '@/src/components/ui/two-column-layout';

const Page = async ({ params }) => {
  const { id } = await params;
  
  let trail;

  try {
  trail = await getTrailById(id);
  } catch (err) {
    return (<div>{res.status} Failed to fetch trail</div>)
  }

  if (trail) return (
    <TwoColumnLayout
      left={(
        <div>
          <TrailInfo trail={trail} />
          <GPXDownloaderWrapper 
            name={trail.name} 
            desc={trail.description} 
            geojson={trail.geojson}
          />
        </div>
      )}
      right={
        <TrailMapWrapper 
          trail={trail.geojson} 
          center={trail.center} 
        />
      }
    />
  );
}

export default Page;
