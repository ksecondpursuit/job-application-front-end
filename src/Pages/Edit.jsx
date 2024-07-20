import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

function EditApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState({
    position: '',
    company: '',
    status: '',
    notes: '',
    date_applied: '', // Ensure date_applied is in initial state
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleTextChange = (event) => {
    setApplication({
      ...application,
      [event.target.id]: event.target.value,
    });
  };

  const updateApplication = () => {
    const updatedApplication = {
      ...application,
      date_applied:
        application.date_applied ||
        new Date().toISOString().split('T')[0],
    };

    fetchAPI(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedApplication),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => navigate(`/applications/${id}`))
      .catch((error) => {
        console.error('Error updating application:', error);
        // Handle the error more gracefully (e.g., show error message to user)
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAPI(`/applications/${id}`)
      .then((data) => {
        // Ensure all properties in initial state are set from fetched data
        setApplication({
          position: data.position || '',
          company: data.company || '',
          status: data.status || '',
          notes: data.notes || '',
          date_applied: data.date_applied || '',
        });
      })
      .catch((error) => {
        console.error('Error fetching application:', error);
        // Handle the error (e.g., redirect)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateApplication();
  };

  if (isLoading) {
    return <div>Loading application data...</div>;
  }

  if (!application) {
    return <div>Application not found.</div>;
  }

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

        {/* Hidden input for date_applied (important!) */}
        <input
          type='hidden'
          id='date_applied'
          value={application.date_applied}
          onChange={handleTextChange}
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
