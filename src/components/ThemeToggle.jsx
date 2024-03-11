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
    <div className={`toggle-switch ${theme}`} role="switch" onClick={switchTheme}>
      <label htmlFor="theme" className="theme">
        <span className="theme__toggle-wrap">
          <input
            id="theme"
            className="theme__toggle"
            type="checkbox"
            role="switch"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={switchTheme}
          />
          <span className="theme__fill"></span>
          <span className="theme__icon">
            <span className="theme__icon-part"></span>
            <span className="theme__icon-part"></span>
            <span className="theme__icon-part"></span>
            <span className="theme__icon-part"></span>
            <span className="theme__icon-part"></span>
            <span className="theme__icon-part"></span>
            <span className="theme__icon-part"></span>
            <span className="theme__icon-part"></span>
            <span className="theme__icon-part"></span>
          </span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
