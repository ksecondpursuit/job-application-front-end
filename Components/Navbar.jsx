// Components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <h1>Pursuit's Ultimate Job Tracker</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/applications'>Applications</Link>
        </li>
        <li>
          <Link to='/applications/new'>New Application</Link>
        </li>
 
      </ul>
    </nav>
  );
}

export default NavBar;