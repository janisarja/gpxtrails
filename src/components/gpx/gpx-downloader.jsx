'use client';

import togpx from 'togpx';
import ButtonLarge from '@/src/components/ui/button-large';

export function GPXDownloader({ name, desc, geojson }) {

  const toSafeFilename = (name, fallback = 'trail') => {
    return (name ?? fallback)
      .toLowerCase()
      .trim()
      // Replace invalid filename characters
      .replace(/[\/\\?%*:|"<>]/g, '')
      // Replace whitespace with single dashes
      .replace(/\s+/g, '-')
      // Remove anything that’s not safe-ish
      .replace(/[^a-z0-9._-]/g, '')
      // Collapse multiple dashes
      .replace(/-+/g, '-')
      // Prevent empty filename
      || fallback;
  };

  const handleDownload = () => {
    const gpx = togpx(geojson, {
      creator: '',
      metadata: {
        name: name,
        desc: desc || ''
      }
    });

    const blob = new Blob([gpx], {
      type: 'application/gpx+xml',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${toSafeFilename(name)}.gpx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ButtonLarge onClick={handleDownload} text="Download GPX" />
  );
}

export default GPXDownloader;
