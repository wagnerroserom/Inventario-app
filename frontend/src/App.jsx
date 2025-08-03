import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar las páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal: login */}
          <Route path="/" element={<Login />} />
          
          {/* Otra forma de acceder al login */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta del panel principal */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
