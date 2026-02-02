'use client';

import dynamic from 'next/dynamic';

const AllTrailsMap = dynamic(() => import('./all-trails-map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>, 
});

const AllTrailsMapWrapper = (props) => {
  return <AllTrailsMap {...props} />;
};

export default AllTrailsMapWrapper;
