import React, { useEffect, useState } from "react"
import { useDashboardStore } from "./store/useDashboardStore"
import Category from "./components/Category"
import SearchBar from "./components/SearchBar"
import sampleData from "./data/dashboard.json"
import colors from "./utils/colors"

function App() {
  const setInitialData = useDashboardStore(s => s.setInitialData)
  const categories = useDashboardStore(s => s.categories)
  const addCategory = useDashboardStore(s => s.addCategory)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [newCategoryName, setNewCategoryName] = useState("")

  useEffect(() => setInitialData(sampleData), [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      return
    }

    const results = []
    categories.forEach(category => {
      category.widgets.forEach(widget => {
        if (
          widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          widget.text.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            id: widget.id,
            title: widget.title,
            text: widget.text,
            categoryName: category.name
          })
        }
      })
    })
    
    setSearchResults(results)
  }, [searchTerm, categories])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim())
      setNewCategoryName("")
    }
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh", padding: 20 }}>
      <h1 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, color: colors.primary.main }}>
        Dynamic Dashboard
      </h1>

      <div style={{ maxWidth: 1200, margin: "20px auto" }}>
        <SearchBar 
          searchTerm={searchTerm} 
          onSearch={handleSearch} 
          onClear={handleClearSearch} 
        />

        {searchTerm && (
          <div style={{ backgroundColor: colors.white, padding: 16, borderRadius: 10, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontWeight: 600, margin: 0 }}>
                {searchResults.length > 0 ? 
                  `Search Results (${searchResults.length} found)` : 
                  "No Results Found"
                }
              </h2>
              
              {/* Back to Dashboard Button */}
              <button
                onClick={handleClearSearch}
                style={{
                  backgroundColor: colors.primary.main,
                  color: colors.white,
                  padding: "8px 16px",
                  borderRadius: 6,
                  cursor: "pointer",
                  border: "none",
                  fontWeight: 500
                }}
              >
                Back to Dashboard
              </button>
            </div>
            
            {searchResults.length > 0 ? (
              <ul style={{ padding: 0, margin: 0 }}>
                {searchResults.map(r => (
                  <li
                    key={r.id}
                    style={{
                      backgroundColor: colors.gray.light,
                      border: `1px solid ${colors.gray.main}`,
                      padding: 12,
                      marginBottom: 8,
                      borderRadius: 8,
                      listStyle: "none"
                    }}
                  >
                    <strong style={{ color: colors.primary.dark }}>{r.title}</strong> 
                    <p style={{ margin: "8px 0", color: colors.gray.dark }}>{r.text}</p>
                    <em style={{ color: colors.gray.dark, fontSize: 14 }}>Category: {r.categoryName}</em>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ color: colors.gray.dark, fontSize: 16, marginBottom: 16 }}>
                  No widgets found matching "<strong>{searchTerm}</strong>"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Always show dashboard when not searching or show categories below search results */}
        {(!searchTerm || searchResults.length > 0) && (
          <>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {categories.map((cat, idx) => (
                <Category key={cat.id} category={cat} index={idx} />
              ))}
            </div>

            {/* Add Category */}
            <div style={{ marginTop: 20, padding: 16, backgroundColor: colors.white, borderRadius: 10, border: `1px solid ${colors.gray.main}` }}>
              <h2 style={{ marginBottom: 8, color: colors.primary.dark }}>Add Category</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  style={{
                    flex: 1,
                    padding: 8,
                    borderRadius: 6,
                    border: `1px solid ${colors.gray.main}`
                  }}
                />
                <button
                  onClick={handleAddCategory}
                  style={{
                    backgroundColor: colors.primary.main,
                    color: colors.white,
                    padding: "8px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    border: "none"
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App