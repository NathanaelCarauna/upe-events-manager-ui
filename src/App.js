import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import * as React from 'react';
import Dashboard from './pages/Dashboard';
import Eventos from './pages/Eventos';
import DadosEvento from './pages/DadosEvento';
import Papers from './pages/Papers';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from './components/Footer';
import DadosPaper from './pages/DadosPaper';


function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/eventos' element={<Eventos/>} />
          <Route path='/papers' element={<Papers/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dados-evento/:event_id' element={<DadosEvento/>} />
          <Route path='/dados-paper/:paper_id' element={<DadosPaper/>} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
