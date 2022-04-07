import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Country from "./components/Country";
import Activity from "./components/Activity";
import Error404 from "./components/Error404";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path={"/"} element={<Landing />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path={"/country/:id"} element={<Country />} />
        <Route exact path={"/activity"} element={<Activity />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
