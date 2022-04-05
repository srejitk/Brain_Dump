import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Signup, Mockman, Home } from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign-up" element={<Signup />}></Route>
      <Route path="/mockman" element={<Mockman />}></Route>
    </Routes>
  );
}
