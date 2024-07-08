import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Dashboard from './pages/Dashboard';
import Eventos from './pages/Eventos';
import Papers from './pages/Papers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import theme from './themes/theme';
import {ThemeProvider, CssBaseline, Box} from '@mui/material';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Box display="flex" minHeight="100vh">
                    <Navbar/>
                    <Box component="main" flexGrow={1} p={3} bgcolor="#f4f6f8">
                        <ToastContainer/>
                        <Routes>
                            <Route path='/' element={<Dashboard/>}/>
                            <Route path='/eventos' element={<Eventos/>}/>
                            <Route path='/papers' element={<Papers/>}/>
                        </Routes>
                        <Footer/>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
