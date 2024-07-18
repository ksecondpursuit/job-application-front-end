// src/Pages/ShowApplication.jsx
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

function ShowApplication() {
  const [application, setApplication] = useState({});
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    fetchAPI(`/applications/${id}`).then(setApplication).catch(console.error);
  }, [id]);

  const handleDelete = () => {
    fetchAPI(`/applications/${id}`, { method: 'DELETE' })
      .then(() => navigate('/applications'))
      .catch(console.error);
  };

  return (
    <article>
      <h3>
        {application.is_favorite ? <span>⭐️</span> : null}
        {application.job_title} - {application.company} ({application.date_applied})
      </h3>
      <p>
        <strong>Status:</strong> {application.status}
      </p>
      <div className='showNavigation'>
        <Link to='/applications'>
          <button>Back</button>
        </Link>
        <Link to={`/applications/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </article>
  );
}

export default ShowApplication;