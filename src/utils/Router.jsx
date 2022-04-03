import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Mockman } from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route to="/" element={<Home />}></Route>
      <Route to="/login" element={<Login />}></Route>
      <Route to="/signup" element={<Signup />}></Route>
      <Route to="/mockman" element={<Mockman />}></Route>
    </Routes>
  );
}
