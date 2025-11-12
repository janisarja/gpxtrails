import TrailList from '@/src/components/trail-list';
import { getAllTrails } from '@/src/controllers/trail-controller';

const Page = async () => {
  let trails;
  try {
    trails = await getAllTrails();
  } catch (err) {
    return (<div>{res.status} Failed to fetch trails</div>)
  }

  if (trails) return (
    <TrailList trails={trails} />
  );
}

export default Page;
