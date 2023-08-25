import React, { type ReactElement } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyLibrary from './pages/my-library';
import Navbar from './components/Navbar';
import NoMatch from './pages/errors/404';
import Movie from './pages/movie';
import Home from './pages/home';

const App = (): ReactElement => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my' element={<MyLibrary />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
