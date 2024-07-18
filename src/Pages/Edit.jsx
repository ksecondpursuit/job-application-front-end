import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

function EditApplicationForm() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState({
    position: '',
    company: '',
    status: '',
    notes: '',
  });

  const handleTextChange = (event) => {
    setApplication({
      ...application,
      [event.target.id]: event.target.value,
    });
  };

  const updateApplication = () => {
    fetchAPI(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(application),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => navigate(`/applications/${id}`))
      .catch(console.error);
  };

  useEffect(() => {
    fetchAPI(`/applications/${id}`)
      .then(setApplication)
      .catch(console.error);
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateApplication();
  };

  return (
    <div className='Edit'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='position'>Position:</label>
        <input
          id='position'
          value={application.position}
          type='text'
          onChange={handleTextChange}
          placeholder='Position'
          required
        />
        <label htmlFor='company'>Company:</label>
        <input
          id='company'
          value={application.company}
          type='text'
          onChange={handleTextChange}
          placeholder='Company'
          required
        />
        <label htmlFor='status'>Status:</label>
        <input
          id='status'
          value={application.status}
          type='text'
          onChange={handleTextChange}
          placeholder='Status'
        />
        <label htmlFor='notes'>Notes:</label>
        <input
          id='notes'
          value={application.notes}
          type='text'
          onChange={handleTextChange}
          placeholder='Notes'
        />
        <br />
        <br />
        <button type='submit'>Submit</button>
      </form>
      <br />
      <Link to={`/applications/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default EditApplicationForm;
