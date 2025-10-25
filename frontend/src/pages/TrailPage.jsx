import { useEffect, useState } from 'react';
import { useParams } from'react-router-dom';
import axios from 'axios';
import TrailMap from '../components/TrailMap';

const TrailPage = () => {
  const { trailId } = useParams();
  const [trail, setTrail] = useState({});

  useEffect(() => {
    if (!trailId) return;

    axios.get(`http://localhost:3001/api/trails/${trailId}`)
      .then(res => {
        setTrail(res.data);
      });
  }, [trailId]);
  
  return (
    <div>
      <h1>{trail.name}</h1>
      <p>Kuvaus: {trail.description}</p>
      <p>Pituus: {trail.distance_km}</p>
      <TrailMap trail={trail.geojson}/>
    </div>
  );
}

export default TrailPage;
