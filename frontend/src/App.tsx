
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Index';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;

