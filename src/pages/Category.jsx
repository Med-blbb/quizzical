import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  changeAmount,
  changeCategory,
  changeDifficulty,
  changeLoading,
  getCategories,
} from "../redux/QuizSlice";
import Loader from "../components/Loader";
import "../components/CategoryStyle.css";

export default function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const dispatch = useDispatch();
  
  const [selectedDifficulty, setselectedDifficulty] = useState("");
  const [selectedAmount, setSelectedAmount] = useState();
  const loading = useSelector((state) => state.quiz.loading);
  const categories = useSelector(
    (state) => state.quiz.categories?.trivia_categories || []
  );
  const difficulty = useSelector((state) => state.quiz.difficulty);
  const amount = useSelector((state) => state.quiz.amount);

  useEffect(() => {
    dispatch(changeLoading(true));
    setTimeout(async () => dispatch(changeLoading(false)), 2000);
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const foundCategory = categories.find((cat) => cat.id == id);
    setCategory(foundCategory);
    dispatch(changeCategory(id));
  }, [id, categories]);
  const handleDifficultyChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Difficulty:", selectedValue);
    setselectedDifficulty(selectedValue);
    dispatch(changeDifficulty(selectedValue));
  };

  const handleAmountChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAmount(selectedValue);
    dispatch(changeAmount(selectedValue));
  };
  const handleStart = () => {
    console.log("Start button clicked!");
    if (difficulty.length == "" ) {
      window.alert(
        "Please select a difficulty level before starting the quiz."
      );
    }
     if (amount.length == "") {
       window.alert(
         "Please select a question number before starting the quiz."
       );
     }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-cat">
          <div className="nav-bar-home">
            <h1>
              Qui<span>zz</span>ical
            </h1>
          </div>
          <div className="cat-card">
            <h1 className="title">
              {category ? category.name : "Category not found"}
            </h1>

            <img className="cat-card-img" src={`/images/${id}.jpeg`} alt="" />
            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option value="">Select the Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select value={selectedAmount} onChange={handleAmountChange}>
              <option value="">Select Number of Questions</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <div className="btn-grp">
              <Link className="cat-link" to="/">
                <button>home</button>
              </Link>
              <Link
                className="cat-link"
                to={difficulty.length > 0 && amount.length > 0 ? "/quiz" : "#"}
              >
                <button onClick={handleStart}>Start Quiz</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
