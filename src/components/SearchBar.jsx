// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  cursor: pointer;
  
  &.clear {
    color: #dc3545;
    
    &:hover {
      color: #c82333;
    }
  }
`;

const SearchSuggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-top: 0.5rem;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
`;

const SuggestionItem = styled.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &.highlighted {
    background: #667eea;
    color: white;
  }
`;

const RecentSearches = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  h6 {
    margin-bottom: 0.5rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

const RecentSearch = styled.div`
  display: inline-flex;
  align-items: center;
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background: #e9ecef;
  }
`;

const SearchBar = ({ 
  onSearch, 
  placeholder = "Buscar productos...",
  suggestions = [],
  showRecent = true 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const debouncedQuery = useDebounce(query, 300);

  // Cargar búsquedas recientes
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Guardar búsqueda reciente
  const saveRecentSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    const updated = [
      searchTerm,
      ...recentSearches.filter(s => s !== searchTerm)
    ].slice(0, 5);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Ejecutar búsqueda
  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
      saveRecentSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    saveRecentSearch(suggestion);
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    onSearch(search);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else {
        onSearch(query);
        saveRecentSearch(query);
        setShowSuggestions(false);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
      />
      
      {query ? (
        <SearchIcon 
          className="clear" 
          onClick={handleClear}
          title="Limpiar búsqueda"
        >
          <FaTimes />
        </SearchIcon>
      ) : (
        <SearchIcon title="Buscar">
          <FaSearch />
        </SearchIcon>
      )}
      
      {showSuggestions && (query || (showRecent && recentSearches.length > 0)) && (
        <SearchSuggestions>
          {showRecent && recentSearches.length > 0 && !query && (
            <RecentSearches>
              <h6>Búsquedas recientes:</h6>
              {recentSearches.map((search, index) => (
                <RecentSearch 
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                >
                  {search}
                </RecentSearch>
              ))}
            </RecentSearches>
          )}
          
          {suggestions.length > 0 && query && (
            <div>
              {suggestions.map((suggestion, index) => (
                <SuggestionItem
                  key={index}
                  className={highlightedIndex === index ? 'highlighted' : ''}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {suggestion}
                </SuggestionItem>
              ))}
            </div>
          )}
          
          {query && suggestions.length === 0 && (
            <SuggestionItem style={{ color: '#666', fontStyle: 'italic' }}>
              No se encontraron sugerencias
            </SuggestionItem>
          )}
        </SearchSuggestions>
      )}
    </SearchContainer>
  );
};

export default SearchBar;