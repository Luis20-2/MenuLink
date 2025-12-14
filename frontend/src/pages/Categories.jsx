import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import categoryService from '../services/categoryService';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/forms.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    display_order: 1
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAll();
      setCategories(response.data || []);
      setError('');
    } catch (err) {
      setError('Error al cargar categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', display_order: 1 });
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || '',
      display_order: category.display_order || 1
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) return;

    try {
      await categoryService.delete(id);
      setCategories(categories.filter(c => c.id !== id));
      setSuccess('Categoría eliminada exitosamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al eliminar la categoría');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await categoryService.update(editingId, formData);
        setCategories(categories.map(c => c.id === editingId ? { ...c, ...formData } : c));
        setSuccess('Categoría actualizada exitosamente');
      } else {
        const response = await categoryService.create(formData);
        setCategories([...categories, response.data]);
        setSuccess('Categoría creada exitosamente');
      }
      setModalOpen(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la categoría');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'display_order' ? parseInt(value) : value
    }));
  };

  return (
    <div className="container p-4">
      <div className="flex-between mb-4">
        <h1>Categorías de Menú</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          <FiPlus style={{ marginRight: '0.5rem' }} /> Nueva Categoría
        </button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      {loading ? (
        <LoadingSpinner />
      ) : categories.length === 0 ? (
        <div className="text-center p-4">
          <p style={{ fontSize: '1.1rem', color: '#999' }}>
            No hay categorías aún. Crea la primera haciendo clic en "Nueva Categoría".
          </p>
        </div>
      ) : (
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {categories.map(category => (
            <ItemCard
              key={category.id}
              item={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Editar Categoría' : 'Nueva Categoría'}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="ej: Entradas, Platos Principales, Postres"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción opcional de la categoría"
            />
          </div>

          <div className="form-group">
            <label htmlFor="display_order">Orden de Visualización</label>
            <input
              type="number"
              id="display_order"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Actualizar' : 'Crear'} Categoría
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
