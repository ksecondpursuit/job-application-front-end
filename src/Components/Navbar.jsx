// src/Components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

function NavBar() {
  const [applicationCount, setApplicationCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationCount = async () => {
      try {
        const data = await fetchAPI('/applications');
        setApplicationCount(data.length);
      } catch (error) {
        console.error('Error fetching application count:', error);
        setError('Error fetching application count.');
      }
    };

    fetchApplicationCount();
  }, []);

  return (
    <nav>
      <h1>Pursuit's Ultimate Job Tracker</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/applications'>
            Applications ({error ? 'N/A' : applicationCount})
          </Link>
        </li>
        <li>
          <Link to='/applications/new'>New Application</Link>
        </li>
      </ul>
      {error && <p className='error'>{error}</p>}
    </nav>
  );
}

export default NavBar;
