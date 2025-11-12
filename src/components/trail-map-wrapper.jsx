'use client';

import dynamic from 'next/dynamic';

const TrailMap = dynamic(() => import('./trail-map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, 
});

const TrailMapWrapper = (props) => {
  return <TrailMap {...props} />;
};

export default TrailMapWrapper;
