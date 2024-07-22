// src/Pages/Application.jsx
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils'; // Make sure you have this import

function Application({ application }) {
  return (
    <tr>
      <td>
        <Link to={`/applications/${application.id}`}>
          {application.position}
        </Link>
      </td>
      <td>{application.company}</td>
      <td>{application.status}</td>
      <td>{formatDate(application.date_applied)}</td>
    </tr>
  );
}

export default Application;
