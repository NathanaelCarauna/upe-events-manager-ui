import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import Dashboard from "./pages/Dashboard";
import Eventos from "./pages/Eventos";
import Metricas from "./pages/Metricas";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />;
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/metricas" element={<Metricas />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
