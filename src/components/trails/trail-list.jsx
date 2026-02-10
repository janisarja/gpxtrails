const TrailList = async ({ trails }) => {
  return (
    <ul className="divide-y">
      {trails.map(trail => (
        <li key={trail.id} className="flex items-center justify-between p-3">
          <a className="text-indigo-600 hover:underline" href={`trails/${trail.id}`}>{trail.name}</a>
          <p className="text-sm text-gray-500">{trail.distance_km.toFixed(1)} km</p>
        </li>
      ))}
    </ul>
  );
}

export default TrailList;
