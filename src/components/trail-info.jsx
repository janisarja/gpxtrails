const TrailInfo = async ({ trail }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">{trail.name}</h1>
      <p className="text-sm text-gray-600">Kuvaus: {trail.description}</p>
      <p className="text-sm text-gray-600">Pituus: {trail.distance_km} km</p>
    </>
  );
}

export default TrailInfo;
