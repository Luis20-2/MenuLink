import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import categoryService from '../services/categoryService';
import menuItemService from '../services/menuItemService';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/forms.css';

export default function Preview() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, itemsRes] = await Promise.all([
        categoryService.getAll(),
        menuItemService.getAll()
      ]);
      
      const cats = categoriesRes.data || [];
      setCategories(cats);
      setItems(itemsRes.data || []);
      
      if (cats.length > 0) {
        setSelectedCategory(cats[0].id);
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getItemsByCategory = (categoryId) => {
    return items.filter(item => item.category_id === categoryId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '2rem',
        borderRadius: '8px 8px 0 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>🍽️ {user?.name}</h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Menú Digital</p>
      </div>

      {categories.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'white' }}>
          <p style={{ color: '#999', fontSize: '1.1rem' }}>
            No hay categorías creadas aún.
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white' }}>
          {/* Pestañas de categorías */}
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #ddd',
            overflowX: 'auto'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: 'none',
                  backgroundColor: selectedCategory === category.id ? '#4CAF50' : '#f5f5f5',
                  color: selectedCategory === category.id ? 'white' : '#333',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  minWidth: '150px'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Items de la categoría seleccionada */}
          <div style={{ padding: '2rem' }}>
            {selectedCategory && getItemsByCategory(selectedCategory).length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999' }}>
                Esta categoría aún no tiene items.
              </p>
            ) : (
              <div>
                {selectedCategory && getItemsByCategory(selectedCategory).map(item => (
                  <div
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #eee',
                      paddingBottom: '1.5rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                        {item.description && (
                          <p style={{ color: '#666', margin: '0 0 0.5rem 0' }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#4CAF50' }}>
                        ${parseFloat(item.price).toFixed(2)}
                      </div>
                    </div>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          maxHeight: '200px',
                          borderRadius: '4px',
                          marginTop: '1rem',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
