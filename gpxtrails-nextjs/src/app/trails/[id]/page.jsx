import TrailInfo from '@/src/components/TrailInfo';
import TrailMapWrapper from '@/src/components/TrailMapWrapper';

const Page = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:3001/api/trails/${id}`);
  const trail = await res.json();
  
  return (
    <div>
      <TrailInfo trail={trail} />
      <TrailMapWrapper trail={trail.geojson} center={trail.center}/>
    </div>
  );
}

export default Page;
