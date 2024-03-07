import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Category from "./pages/Category";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz/category/:id/difficulty/:difficulty/amount/:amount" element={<Quiz />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </Router>
  );
};

export default App;
