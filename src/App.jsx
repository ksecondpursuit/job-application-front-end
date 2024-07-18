// src/App.jsx
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
  import EditApplicationForm from './Pages/EditApplicationForm';
  import FourOFour from './Pages/FourOFour';
  import Home from './Pages/Home';
  import ApplicationsIndex from './Pages/ApplicationsIndex';
  import NewApplicationForm from './Pages/NewApplicationForm';
  import ShowApplication from './Pages/ShowApplication';
  import NavBar from './Components/NavBar'; 
  
  function App() {
    return (
      <div className='App'>
        <Router>
          <NavBar /> 
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/applications' element={<ApplicationsIndex />} />
              <Route path='/applications/new' element={<NewApplicationForm />} />
              <Route path='/applications/:id' element={<ShowApplication />} />
              <Route path='/applications/:id/edit' element={<EditApplicationForm />} />
              <Route path='*' element={<FourOFour />} />
            </Routes>
          </main>
        </Router>
      </div>
    );
  }
  
  export default App;