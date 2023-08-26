import React, { type ReactElement } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import Pages from './pages';

const App = (): ReactElement => {
  return (
    <Router>
      <Navbar />
      <Container fixed>
        <Routes>
          <Route path='/' element={<Pages.Home />} />
          <Route path='/my' element={<Pages.MyLibrary />} />
          <Route path='/movie/:id' element={<Pages.Movie />} />
          <Route path='*' element={<Pages.NoMatch />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
