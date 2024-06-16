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

function App() {
  return (
      <Router>
       <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static">
           <Toolbar>
             <IconButton
               size="large"
                edge="start"
               color="inherit"
               aria-label="menu"
                sx={{ mr: 2 }}
              >
                <img src={logo}></img>
              </IconButton>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/eventos">Eventos</Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/eventos' element={<Eventos/>} />
        </Routes>
      </Router>
      
  );
}

export default App;
