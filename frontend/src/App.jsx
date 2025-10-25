import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import TrailPage from './pages/TrailPage';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/polut' element={<SearchPage />} />
        <Route path='/polut/:trailId' element={<TrailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
