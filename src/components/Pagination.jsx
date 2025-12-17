// src/components/Pagination.jsx
import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const PaginationContainer = styled.nav`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dee2e6;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border-radius: 5px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.active ? '#5a6fd8' : '#f8f9fa'};
    border-color: #667eea;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    
    &:hover {
      background: transparent;
      transform: none;
    }
  }
`;

const PaginationInfo = styled.div`
  margin-left: 1rem;
  color: #666;
  font-size: 0.9rem;
  
  strong {
    color: #333;
  }
`;

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  itemsPerPage = 12
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    if (currentPage <= 3) {
      start = 2;
      end = 4;
    }
    
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
      end = totalPages - 1;
    }
    
    pages.push(1);
    
    if (start > 2) pages.push('...');
    
    for (let i = start; i <= end; i++) pages.push(i);
    
    if (end < totalPages - 1) pages.push('...');
    
    pages.push(totalPages);
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div>
      <PaginationInfo className="mb-3">
        Mostrando <strong>{startItem}-{endItem}</strong> de <strong>{totalItems}</strong> productos
      </PaginationInfo>
      
      <PaginationContainer>
        <PageButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="Primera página"
        >
          <FaAngleDoubleLeft />
        </PageButton>
        
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Página anterior"
        >
          <FaAngleLeft />
        </PageButton>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <PageButton key={`ellipsis-${index}`} className="ellipsis" disabled>
              ...
            </PageButton>
          ) : (
            <PageButton
              key={page}
              onClick={() => onPageChange(page)}
              active={currentPage === page}
              title={`Página ${page}`}
            >
              {page}
            </PageButton>
          )
        ))}
        
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Página siguiente"
        >
          <FaAngleRight />
        </PageButton>
        
        <PageButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Última página"
        >
          <FaAngleDoubleRight />
        </PageButton>
      </PaginationContainer>
    </div>
  );
};

export default Pagination;