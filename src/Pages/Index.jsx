// src/Pages/Index.jsx
import React, { useState, useEffect } from 'react';
import Application from './Application';
import { fetchAPI } from '../utils/api';

const ITEMS_PER_PAGE = 10; // Number of applications per page

function Index() {
  const [allApplications, setAllApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await fetchAPI('/applications');
        setAllApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  // Sorting logic
  const sortedApplications = [...allApplications];
  if (sortConfig.key) {
    sortedApplications.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  // Calculate pagination values
  const indexOfLastApplication = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstApplication =
    indexOfLastApplication - ITEMS_PER_PAGE;
  const currentApplications = sortedApplications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const totalPages = Math.ceil(
    allApplications.length / ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }

    setSortConfig({ key: direction ? key : null, direction });
  };

  // Pagination control logic
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className='Index'>
      <h2>Applications</h2>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('position')}>
              Position{' '}
              {sortConfig.key === 'position' &&
                (sortConfig.direction === 'ascending'
                  ? '↑'
                  : sortConfig.direction === 'descending'
                  ? '↓'
                  : '')}
            </th>
            <th onClick={() => handleSort('company')}>
              Company{' '}
              {sortConfig.key === 'company' &&
                (sortConfig.direction === 'ascending'
                  ? '↑'
                  : sortConfig.direction === 'descending'
                  ? '↓'
                  : '')}
            </th>
            <th onClick={() => handleSort('status')}>
              Status{' '}
              {sortConfig.key === 'status' &&
                (sortConfig.direction === 'ascending'
                  ? '↑'
                  : sortConfig.direction === 'descending'
                  ? '↓'
                  : '')}
            </th>
            <th onClick={() => handleSort('date_applied')}>
              Date Applied{' '}
              {sortConfig.key === 'date_applied' &&
                (sortConfig.direction === 'ascending'
                  ? '↑'
                  : sortConfig.direction === 'descending'
                  ? '↓'
                  : '')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((application) => (
            <Application
              key={application.id}
              application={application}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className='pagination'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Page Numbers */}
      <div className='page-numbers'>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Index;
