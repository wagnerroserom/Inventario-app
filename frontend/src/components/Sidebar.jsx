// src/components/Sidebar.jsx
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">Inventario App</h1>
      </div>

      {/* Menú */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
            >
              🏠 Inicio
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
            >
              📦 Productos
            </button>
          </li>
          <li>
            <button
              onClick={() => alert('Función en desarrollo')}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
            >
               Reportes
            </button>
          </li>
          <li>
            <button
              onClick={() => alert('Función en desarrollo')}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
            >
              👥 Usuarios
            </button>
          </li>
        </ul>
      </nav>

      {/* Cerrar sesión */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition"
        >
          🔐 Cerrar sesión
        </button>
      </div>
    </div>
  );
}