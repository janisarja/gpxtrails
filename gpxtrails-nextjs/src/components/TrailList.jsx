const TrailList = async ({ trails }) => {
  return (
    <div>
      <ul>
        {trails.map(trail => (
          <li key={trail.id}>
            <a href={`trails/${trail.id}`}>{trail.name}</a>
            <p>{trail.distance_km.toFixed(1)} km</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrailList;
