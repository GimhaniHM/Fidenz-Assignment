import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import City from './pages/City';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/city" element={<City />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
