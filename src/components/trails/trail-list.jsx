import { useId } from 'react';
import Link from 'next/link';

const TrailList = ({ trails, title = 'Trails' }) => {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-lg font-semibold text-slate-900">{title}</h2>
      <ul className="divide-y" role="list">
        {trails.map(trail => (
          <li key={trail.id} className="flex items-center justify-between p-3">
            <Link className="text-indigo-600 hover:underline" href={`/trails/${trail.id}`}>
              {trail.name}
            </Link>
            <p className="text-sm text-gray-500">
              {trail.distance_km.toFixed(1)} km
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TrailList;
