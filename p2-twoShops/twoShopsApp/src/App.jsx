import React from "react";
import Display from "./pages/Display";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
