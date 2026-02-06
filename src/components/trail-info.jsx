const TrailInfo = async ({ trail }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">{trail.name}</h1>
      <p className="text-sm text-gray-600">
        <b>Description:</b> {trail.description}
      </p>
      <p className="text-sm text-gray-600">
        <b>Distance:</b> {trail.distance_km} km
      </p>
    </>
  );
}

export default TrailInfo;
