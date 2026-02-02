'use client';

import TrailEditor from '@/src/components/trail-editor';

// Page for creating a new trail
const Page = () => {

  const postTrail = async (payload) => {
    const res = await fetch('/api/trails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res;
  }

  return (
    <TrailEditor 
      apiCall={postTrail}
      buttonText={'Upload Trail'}
    />
  );
}

export default Page;
