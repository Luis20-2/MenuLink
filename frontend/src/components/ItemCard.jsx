import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import '../styles/forms.css';

export default function ItemCard({ item, onEdit, onDelete, type = 'item' }) {
  const getPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : price;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{item.name}</h3>
      </div>
      <div className="card-body">
        {item.description && (
          <p>{item.description}</p>
        )}
        {item.price && (
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4CAF50' }}>
            ${getPrice(item.price)}
          </p>
        )}
        {item.display_order && (
          <p style={{ fontSize: '0.9rem', color: '#999' }}>
            Orden: {item.display_order}
          </p>
        )}
      </div>
      <div className="card-footer">
        <button className="btn btn-secondary btn-sm" onClick={() => onEdit(item)}>
          <FiEdit2 style={{ marginRight: '0.25rem' }} /> Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.id)}>
          <FiTrash2 style={{ marginRight: '0.25rem' }} /> Eliminar
        </button>
      </div>
    </div>
  );
}