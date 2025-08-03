// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProductModal from '../components/CreateProductModal';
import EditProductModal from '../components/EditProductModal';
import DeleteProductModal from '../components/DeleteProductModal';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const navigate = useNavigate();

  // Verificar autenticación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchProducts(token);
    }
  }, [navigate]);

  // Obtener productos
  const fetchProducts = async (token) => {
    try {
      const response = await fetch('http://localhost:4000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Inventario App</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Productos</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              + Nuevo Producto
            </button>
          </div>

          {loading ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              Cargando productos...
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">No hay productos registrados.</p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category?.name || 'Sin categoría'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setDeletingProduct(product)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear producto */}
      {showModal && (
        <CreateProductModal
          onClose={() => setShowModal(false)}
          onProductCreated={() => fetchProducts(localStorage.getItem('token'))}
        />
      )}

      {/* Modal para editar producto */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={() => fetchProducts(localStorage.getItem('token'))}
        />
      )}

      {/* Modal para eliminar producto */}
      {deletingProduct && (
        <DeleteProductModal
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onProductDeleted={() => fetchProducts(localStorage.getItem('token'))}
        />
      )}
    </div>
  );
}