// src/components/EditProductModal.jsx
import { useState } from 'react';

export default function EditProductModal({ product, onClose, onProductUpdated }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description || '',
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4000/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Producto actualizado exitosamente');
        onProductUpdated(); // Refresca la lista
        onClose(); // Cierra el modal
      } else {
        setError(data.error || 'Error al actualizar el producto');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Precio ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-1">Categoría ID (opcional)</label>
            <input
              type="number"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="1, 2, etc."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}