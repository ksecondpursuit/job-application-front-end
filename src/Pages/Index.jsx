import React, { useState, useEffect } from 'react';
import Application from './Application';
import { fetchAPI } from '../utils/api';

const ITEMS_PER_PAGE = 10; // Number of applications per page

function Index() {
  const [allApplications, setAllApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await fetchAPI('/applications');
        setAllApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchApplications();
  }, []);

  // Calculate pagination values
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

  // Calculate total pages
  const totalPages = Math.ceil(
    allApplications.length / ITEMS_PER_PAGE
  );

  return (
    <div className='Index'>
      <h2>Applications</h2>

      {/* Pagination Controls */}
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
