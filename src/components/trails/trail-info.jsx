import { useId } from 'react';

const TrailInfo = ({ trail, headingId }) => {
  const generatedId = useId();
  const titleId = headingId ?? generatedId;

  return (
    <section aria-labelledby={titleId}>
      <h1 id={titleId} className="text-2xl font-semibold text-gray-900">{trail.name}</h1>
      <dl className="text-sm text-gray-600">
        <div>
          <dt className="font-semibold">Description</dt>
          <dd>{trail.description}</dd>
        </div>
        <div>
          <dt className="font-semibold">Distance</dt>
          <dd>{trail.distance_km} km</dd>
        </div>
      </dl>
    </section>
  );
}

export default TrailInfo;
