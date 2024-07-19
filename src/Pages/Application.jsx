import { Link } from 'react-router-dom';

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
    </tr>
  );
}

export default Application;
