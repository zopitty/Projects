import React from "react";
import Display from "./components/Display";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Display />
    </div>
  );
}

export default App;
