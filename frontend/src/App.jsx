import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from './pages/SearchPage';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/polut' element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
