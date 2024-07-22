// Components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../utils/api'; // Import fetchAPI

function NavBar() {
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    // Fetch the number of applications when the component mounts
    const fetchApplicationCount = async () => {
      try {
        const data = await fetchAPI('/applications');
        setApplicationCount(data.length);
      } catch (error) {
        console.error('Error fetching application count:', error);
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
            Applications ({applicationCount})
          </Link>
        </li>
        <li>
          <Link to='/applications/new'>New Application</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
