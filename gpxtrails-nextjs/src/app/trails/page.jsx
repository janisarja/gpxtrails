import TrailList from '@/src/components/TrailList';

const Page = async () => {
  const res = await fetch('http://localhost:3001/api/trails');
  const trails = await res.json();

  return (
    <TrailList trails={trails} />
  );
}

export default Page;
