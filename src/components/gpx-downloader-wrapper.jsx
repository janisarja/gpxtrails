'use client';

import dynamic from 'next/dynamic';

const GPXDownloader = dynamic(() => import('./gpx-downloader'), { 
  ssr: false,
});

const GPXDownloaderWrapper = (props) => {
  return <GPXDownloader {...props} />;
};

export default GPXDownloaderWrapper;
