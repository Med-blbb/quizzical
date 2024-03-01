import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  changeCategory,
  changeDifficulty,
  changeAmount,
  changeLoading,
} from "../redux/QuizSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "../components/LoaderStyle.css";
import "../components/HomeStyle.css";

const Home = () => {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state) => state.quiz.categories?.trivia_categories || []
  );
  const quiz = useSelector((state) => state.quiz);
  let { amount, loading, SelectedCat, selectedDiff, selectAm } = quiz;
  const [selectedCategory, setSelectedCategory] = useState(SelectedCat);
  const [selectedDifficulty, setselectedDifficulty] = useState(selectedDiff);
  const [selectAmount, setSelectedAmount] = useState(selectAm);
  useEffect(() => {
    dispatch(changeLoading(true));

    setTimeout(async () => {
      dispatch(getCategories());
      dispatch(changeLoading(false));
    }, 2000);
  }, []);
  const handleDifficultyChange = (e) => {
    const selectedValue = e.target.value;
    setselectedDifficulty(selectedValue);
    dispatch(changeDifficulty(selectedValue));
  };
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(changeCategory(selectedValue));
  };
  const handleAmountChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAmount(selectedValue);
    dispatch(changeAmount(selectedValue));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <div className="nav-bar-home">
            <h1>
              Qui<span>zz</span>ical
            </h1>
          </div>

          <div>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Any Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option value="">Select the Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <input
              type="text"
              placeholder="Enter the Amount"
              value={selectAm}
              onChange={handleAmountChange}
            />
          </div>
          <div className="all-card">
            {categories.map((cat) => (
              <div
                className="card"
                style={{ backgroundImage: `url(./images/${cat.id}.jpeg)` }}
              >
                <div className="category--name">{cat.name}</div>
                <button>
                  <Link to={"quiz"} className="link">
                    Pick category
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
