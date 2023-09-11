import React from "react";
import Pagination from "react-bootstrap/Pagination";
import './pagination-component.scss'

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  // Görünen sayfa sayısı ve orta sayfa hesaplamaları
  const visiblePages = 5;
  const middlePage = Math.floor(visiblePages / 2);
  const startPage = Math.max(1, currentPage - middlePage);
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  // Sayfa numaralarını oluşturmak için bir dizi kullanılır
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="pagination">
      <Pagination.Prev className="pagination-prev"
        onClick={() => onPageChange(currentPage - 1)} // Önceki sayfaya gitme işlevi
        disabled={currentPage === 1} // İlk sayfadaysanız düğme devre dışı bırakılır
      />
      {startPage > 1 && (
        <>
          <Pagination.Item className="pagination-item" onClick={() => onPageChange(1)}>{1}</Pagination.Item>
          {startPage > 2 && <Pagination.Ellipsis />} {/* Gerekirse elipsis gösterme */}
        </>
      )}
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage} // Aktif sayfayı vurgula
          onClick={() => onPageChange(number)} // Sayfa numarasına tıklama işlevi
        >
          {number}
        </Pagination.Item>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <Pagination.Ellipsis />} {/* Gerekirse elipsis gösterme */}
          <Pagination.Item
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        </>
      )}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)} // Sonraki sayfaya gitme işlevi
        disabled={currentPage === totalPages} // Son sayfadaysanız düğme devre dışı bırakılır
      />
    </Pagination>
  );
}

export default PaginationComponent;
