import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <h1>Job Application Tracker</h1>
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
