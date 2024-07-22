// src/Pages/Index.jsx
import React, { useState, useEffect } from 'react';
import Application from './Application';
import { fetchAPI } from '../utils/api';

const ITEMS_PER_PAGE = 10;

function Index() {
  const [allApplications, setAllApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await fetchAPI('/applications');
        setAllApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError(
          'Error fetching applications. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const indexOfLastApplication = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstApplication =
    indexOfLastApplication - ITEMS_PER_PAGE;
  const currentApplications = allApplications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(
    allApplications.length / ITEMS_PER_PAGE
  );

  if (isLoading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='Index'>
      <h2>Applications</h2>

      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Company</th>
            <th>Status</th>
            <th>Date Applied</th>
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
    </div>
  );
}

export default Index;
