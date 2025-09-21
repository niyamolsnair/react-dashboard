import React from 'react';
import { useDashboardStore } from '../store/useDashboardStore';
import { widgetColors } from '../utils/colors';

export default function WidgetCard({ widget, categoryId, index }) {
  const removeWidget = useDashboardStore(s => s.removeWidget);
  const bgColor = widgetColors[index % widgetColors.length];

  return (
    <div style={{
      backgroundColor: bgColor,
      padding: 12,
      borderRadius: 10,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      position: 'relative',
      transition: 'transform 0.2s, box-shadow 0.2s',
      minHeight: 80
    }}
      className="widget-card"
    >
      <button
        onClick={() => removeWidget(categoryId, widget.id)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'rgba(255,255,255,0.7)',
          border: 'none',
          borderRadius: '50%',
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 'bold',
          padding: 0
        }}
      >
        ✕
      </button>
      <h4 style={{ 
        margin: '0 0 6px 0', 
        paddingRight: 30,
        fontSize: 16,
        fontWeight: 600
      }}>
        {widget.title}
      </h4>
      <p style={{ 
        margin: 0,
        fontSize: 14,
        lineHeight: 1.4
      }}>
        {widget.text}
      </p>
    </div>
  );
}