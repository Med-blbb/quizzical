import React from "react";
import "./LoaderStyle.css";
import { useSelector } from "react-redux";

export default function Loader() {
  const theme = useSelector((state) => state.quiz.theme);
  return (
    <div className={`wrapper-${theme}`}>
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  );
}
