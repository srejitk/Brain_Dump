import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Signup,
  Mockman,
  Home,
  ArchivePage,
  TrashPage,
  ErrorPage,
} from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign-up" element={<Signup />}></Route>
      <Route path="/archive" element={<ArchivePage />}></Route>
      <Route path="/trash" element={<TrashPage />}></Route>
      <Route path="/mockman" element={<Mockman />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}
