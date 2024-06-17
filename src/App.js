import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from './images/logoupe.png'
import Dashboard from './pages/Dashboard'
import Eventos from './pages/Eventos'
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/eventos' element={<Eventos/>} />
        </Routes>
      </Router>
    </>
      
  );
}

export default App;
