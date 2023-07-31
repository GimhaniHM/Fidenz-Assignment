import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';
//import City from './pages/City';
import Footer from './components/Footer';

function App() {
  let queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
