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
  const amount = useSelector((state)=>state.quiz.amount)
  const loading = useSelector((state) => state.quiz.loading);
  const SelectedCat = useSelector((state) => state.quiz.selectedCategory || "");
  const selectedDiff = useSelector((state) => state.quiz.difficulty);
  const selectAm = useSelector((state) => state.quiz.amount);
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
    setSelectedAmount(selectedValue)
    dispatch(changeAmount(selectedValue));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="Home">
          <div className="nav-bar-home">
            <div>
              <h1>Quizzical</h1>
            </div>
          </div>

          <div>
            <select
              name=""
              id=""
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
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
              name=""
              id=""
              value={selectAm}
              onChange={handleAmountChange}
            />
          </div>
          <div className="all-card">
            {categories.map((cat) => (
              <div className="card">
                <div>
                  <img src={`/images/${cat.id}.jpeg`} alt="" />
                </div>
                <div>{cat.name}</div>
                <div>
                  <button onClick={() => dispatch(changeCategory(cat.id))}>
                    Select this category
                  </button>
                </div>
                <div>
                  <button onClick={() => dispatch(changeDifficulty("easy"))}>
                    Easy
                  </button>
                  <button onClick={() => dispatch(changeDifficulty("medium"))}>
                    Medium
                  </button>
                  <button onClick={() => dispatch(changeDifficulty("hard"))}>
                    Hard
                  </button>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Enter How Many Questions"
                    onChange={handleAmountChange}
                    value={selectAm}
                  />
                </div>
                <button>
                  <Link to={"quiz"}>Start</Link>
                </button>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Home;
