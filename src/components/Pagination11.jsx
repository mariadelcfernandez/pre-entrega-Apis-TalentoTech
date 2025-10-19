// src/components/Pagination.jsx
import styled from 'styled-components';
import React from 'react';


const PaginationContainer = styled.nav`
  .page-link {
    border-radius: 8px;
    margin: 0 2px;
    border: none;
    color: #6c757d;
    
    &:hover {
      background-color: #e9ecef;
      color: #495057;
    }
  }
  
  .page-item.active .page-link {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Valores por defecto para evitar errores
  const safeCurrentPage = currentPage || 1;
  const safeTotalPages = totalPages || 0;

  // Si no hay páginas, no mostrar la paginación
  if (safeTotalPages <= 1) {
    return null;
  }
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, safeCurrentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(safeTotalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <PaginationContainer>
      <ul className="pagination justify-content-center">
        {/* Botón anterior */}
        <li className={`page-item ${safeCurrentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {/* Primera página */}
        {startPage > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => onPageChange(1)}>
                1
              </button>
            </li>
            {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
          </>
        )}

        {/* Páginas visibles */}
        {pages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        {/* Última página */}
        {endPage < safeTotalPages && (
          <>
            {endPage < safeTotalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
            <li className="page-item">
              <button className="page-link" onClick={() => onPageChange(safeTotalPages)}>
                {safeTotalPages}
              </button>
            </li>
          </>
        )}

        {/* Botón siguiente */}
        <li className={`page-item ${safeCurrentPage === safeTotalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage === safeTotalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </PaginationContainer>
  );
};

export default Pagination;