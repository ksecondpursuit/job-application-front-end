// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Edit from './Pages/Edit';
import FourOFour from './Pages/FourOFour';
import Home from './Pages/Home';
import Index from './Pages/Index';
import New from './Pages/New';
import Show from './Pages/Show';
import NavBar from '../Components/Navbar'; // Assuming you have a Navbar component

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/applications' element={<Index />} />
            <Route path='/applications/new' element={<New />} />
            <Route path='/applications/:id' element={<Show />} />
            <Route path='/applications/:id/edit' element={<Edit />} />
            <Route path='*' element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;