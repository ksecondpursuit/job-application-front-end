import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

function NewApplicationForm() {
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    position: '',
    company: '',
    status: '',
    notes: '',
  });

  const addApplication = () => {
    fetchAPI(`/applications`, {
      method: 'POST',
      body: JSON.stringify(application),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => navigate('/applications/'))
      .catch(console.error);
  };

  const handleTextChange = (event) => {
    setApplication({
      ...application,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addApplication();
  };

  return (
    <div className='New'>
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
      <Link to='/applications'>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default NewApplicationForm;
