import React, { useState } from "react"
import { useDashboardStore } from "../store/useDashboardStore"
import colors, { categoryColors } from "../utils/colors"

function Category({ category, index }) {
  const addWidget = useDashboardStore(s => s.addWidget)
  const removeWidget = useDashboardStore(s => s.removeWidget)
  const removeCategory = useDashboardStore(s => s.removeCategory)

  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newText, setNewText] = useState("")

  const handleAddWidget = () => {
    if (newTitle.trim()) {
      addWidget(category.id, newTitle.trim(), newText.trim())
      setNewTitle("")
      setNewText("")
      setShowForm(false)
    }
  }

  // Pick category color based on index
  const bgColor = categoryColors[index % categoryColors.length]

  return (
    <div
      className="rounded-xl shadow-md flex flex-col"
      style={{ 
        backgroundColor: bgColor, 
        padding: "16px", 
        position: "relative",
        minHeight: "200px"
      }}
    >
      {/* Category Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ 
          color: colors.primary.main, 
          fontWeight: 600, 
          fontSize: "18px",
          margin: 0
        }}>
          {category.name}
        </h2>
        <button
          onClick={() => removeCategory(category.id)}
          style={{
            color: colors.danger.main,
            fontWeight: 700,
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
            background: "transparent",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0
          }}
          title="Remove category"
        >
          ✕
        </button>
      </div>

      {/* Widgets */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "12px",
          flex: 1
        }}
      >
        {category.widgets.map((widget) => (
          <div
            key={widget.id}
            style={{
              backgroundColor: colors.white,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              borderRadius: "8px",
              padding: "12px",
              position: "relative",
              minHeight: "80px"
            }}
          >
            <button
              onClick={() => removeWidget(category.id, widget.id)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "rgba(255,255,255,0.7)",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                padding: 0
              }}
              title="Remove widget"
            >
              ✕
            </button>
            <h3 style={{ 
              fontWeight: 600, 
              marginBottom: "4px", 
              marginRight: "24px",
              fontSize: "16px",
              marginTop: 0
            }}>
              {widget.title}
            </h3>
            <p style={{ 
              color: colors.gray.dark, 
              fontSize: "14px",
              margin: 0
            }}>
              {widget.text}
            </p>
          </div>
        ))}
      </div>

      {/* Add Widget Form */}
      {showForm ? (
        <div
          style={{ 
            backgroundColor: colors.gray.light, 
            padding: "12px", 
            borderRadius: "8px",
            marginTop: "16px"
          }}
        >
          <input
            type="text"
            placeholder="Widget title *"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "6px",
              border: `1px solid ${colors.gray.main}`,
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
          <textarea
            placeholder="Widget text (optional)"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            rows={2}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "6px",
              border: `1px solid ${colors.gray.main}`,
              fontSize: "14px",
              resize: "vertical",
              minHeight: "60px",
              boxSizing: "border-box"
            }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleAddWidget}
              disabled={!newTitle.trim()}
              style={{
                flex: 1,
                backgroundColor: newTitle.trim() ? colors.primary.main : colors.gray.main,
                color: colors.white,
                padding: "8px 0",
                borderRadius: "6px",
                cursor: newTitle.trim() ? "pointer" : "not-allowed",
                border: "none",
                fontSize: "14px"
              }}
            >
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                flex: 1,
                backgroundColor: colors.gray.main,
                color: colors.white,
                padding: "8px 0",
                borderRadius: "6px",
                cursor: "pointer",
                border: "none",
                fontSize: "14px"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          style={{
            marginTop: "12px",
            backgroundColor: colors.secondary.main,
            color: colors.white,
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
            fontSize: "14px",
            alignSelf: "flex-start"
          }}
        >
          + Add Widget
        </button>
      )}
    </div>
  )
}

export default Category