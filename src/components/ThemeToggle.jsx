// ThemeToggle.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../redux/QuizSlice";
import "./ThemeStyle.css"; // Import your CSS file

const ThemeToggle = () => {
  const theme = useSelector((state) => state.quiz.theme);
  const dispatch = useDispatch();

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("New Theme:", newTheme);
    dispatch(changeTheme(newTheme));
  };


  return (
    <div className={`toggle-switch ${theme}`} onClick={switchTheme}>
      <input
        type="checkbox"
        className={`theme-checkbox ${theme}`}
        onChange={() => {}}
        checked={theme === "dark"}
      />
      <label htmlFor="toggle-switch" className="slider"></label>
      <p className="light-dark pop">
        {theme !== "dark" ? "LIGHT MODE" : "DARK MODE"}
      </p>
    </div>
  );
};

export default ThemeToggle;
