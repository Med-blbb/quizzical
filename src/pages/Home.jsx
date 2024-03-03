import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  changeCategory,
  changeDifficulty,
  changeAmount,
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
    setTimeout(async () => {
      dispatch(getCategories());
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
  console.log(categories);
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

          <div className="all-card">
            {categories.map((cat) => (
              <div
                className="card"
                style={{ backgroundImage: `url(./images/${cat.id}.jpeg)` }}
                key={cat.id}
              >
                <div className="category--name">{cat.name}</div>
                <Link to={`category/${cat.id}`} className="link">
                  <button onClick={() => dispatch(changeCategory(cat.id))}>
                    Pick category
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
