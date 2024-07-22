// src/Pages/Index.jsx
import { useState, useEffect } from 'react';
import Application from './Application';
import { fetchAPI } from '../utils/api';

function Index() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchAPI(`/applications`)
      .then(setApplications)
      .catch(console.error);
  }, []);

  return (
    <div className='Index'>
      <h2>Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Company</th>
            <th>Status</th>
            <th>Date Applied</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <Application
              key={application.id}
              application={application}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
