import React, { useState } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';
import { nanoid } from 'nanoid';

export default function AddWidgetModal({ categoryId, onClose }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const addWidget = useDashboardStore(s => s.addWidget);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a widget title');
      return;
    }
    const widget = { id: nanoid(), title: title.trim(), text: text.trim() };
    addWidget(categoryId, widget);
    onClose && onClose();
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.35)'
    }}>
      <form onSubmit={handleSubmit} style={{
        width: 360,
        background: '#fff',
        padding: 16,
        borderRadius: 8,
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)'
      }}>
        <h3 style={{ marginTop: 0 }}>Add Widget</h3>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Widget title"
          style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Widget text (optional)"
          rows={4}
          style={{ width: '100%', padding: 8, marginBottom: 12, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" onClick={() => onClose && onClose()} style={{ padding: '8px 12px' }}>Cancel</button>
          <button type="submit" style={{ padding: '8px 12px' }}>Add</button>
        </div>
      </form>
    </div>
  )
}
