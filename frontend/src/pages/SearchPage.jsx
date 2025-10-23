import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/trails')
      .then(res => {
        console.log('Fetcehd data');
        setTrails(res.data);
      });
  }, []);

  return (
    <div>
      <ul>
        {trails.map(trail => (
          <li key={trail.id}>
            <a href={`./${trail.id}`}>{trail.name}</a>
            <p>{trail.distance_km.toFixed(1)} km</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
