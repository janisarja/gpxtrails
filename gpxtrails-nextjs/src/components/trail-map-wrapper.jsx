'use client';

import dynamic from 'next/dynamic';

const TrailMap = dynamic(() => import('./TrailMap'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, 
});

const TrailMapWrapper = (props) => {
  return <TrailMap {...props} />;
};

export default TrailMapWrapper;
