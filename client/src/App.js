import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Activity from "./components/Activity";
import Country from "./components/Country";
import Home from "./components/Home";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<Landing />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path={"/activity"} element={<Activity />} />
        <Route exact path={"/country/:id"} element={<Country />} />
      </Routes>
    </div>
  );
}

export default App;
