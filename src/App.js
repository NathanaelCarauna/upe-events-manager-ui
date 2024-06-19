import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import * as React from 'react';
import Dashboard from './pages/Dashboard'
import Eventos from './pages/Eventos'
import Papers from './pages/Papers';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/eventos' element={<Eventos/>} />
          <Route path='/papers' element={<Papers/>} />
        </Routes>
      </Router>
    </>
      
  );
}

export default App;