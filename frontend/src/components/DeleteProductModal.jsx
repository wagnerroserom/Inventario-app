// src/components/DeleteProductModal.jsx
export default function DeleteProductModal({ product, onClose, onProductDeleted }) {
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${product.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('✅ Producto eliminado exitosamente');
        onProductDeleted(); // Refresca la lista
        onClose(); // Cierra el modal
      } else {
        const data = await response.json();
        alert('Error: ' + (data.error || 'No se pudo eliminar'));
      }
    } catch (err) {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-red-600">Eliminar Producto</h2>
        <p>
          ¿Estás seguro de que deseas eliminar el producto <strong>{product.name}</strong>?
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}