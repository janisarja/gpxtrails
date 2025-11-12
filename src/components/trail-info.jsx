const TrailInfo = async ({ trail }) => {
  
  return (
    <div>
      <h1>{trail.name}</h1>
      <p>Kuvaus: {trail.description}</p>
      <p>Pituus: {trail.distance_km}</p>
    </div>
  );
}

export default TrailInfo;
