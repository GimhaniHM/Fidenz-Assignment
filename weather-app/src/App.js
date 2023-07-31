import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CityInfo from './pages/CityInfo';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Home />} />

         <Route exact path="/:CityCode" element={<CityInfo />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
