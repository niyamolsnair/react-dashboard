import React from "react";
import colors from "../utils/colors";

const SearchBar = ({ searchTerm, onSearch, onClear }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Search is performed automatically as user types
  };

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "10px", 
      marginBottom: "20px",
      flexWrap: "wrap" 
    }}>
      {/* Search Input */}
      <div style={{ position: "relative", flex: 1, maxWidth: "400px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search widgets..."
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "8px",
            border: `1px solid ${colors.gray.main}`,
            outline: "none",
            fontSize: "14px",
            boxSizing: "border-box",
            height: "42px"
          }}
        />
        
        {/* Clear button inside search box (only shown when there's text) */}
        {searchTerm && (
          <button
            type="button"
            onClick={onClear}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              color: colors.danger.main,
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            }}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
      
      {/* Search Button - Separate Box */}
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          backgroundColor: colors.primary.main,
          color: colors.white,
          border: "none",
          borderRadius: "8px",
          padding: "0 16px",
          cursor: "pointer",
          fontWeight: 500,
          fontSize: "14px",
          height: "42px",
          minWidth: "80px"
        }}
      >
        Search
      </button>
      
      {/* Clear Button - Separate Box (only shown when there's text) */}
      {searchTerm && (
        <button
          type="button"
          onClick={onClear}
          style={{
            backgroundColor: colors.gray.main,
            color: colors.white,
            border: "none",
            borderRadius: "8px",
            padding: "0 16px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
            height: "42px",
            minWidth: "80px"
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;