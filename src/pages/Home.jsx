import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, changeCategory, changeDifficulty, changeAmount } from "../redux/QuizSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state) => state.quiz.categories?.trivia_categories || []
  );
  const SelectedCat = useSelector((state) => state.quiz.selectedCategory || "");
  const selectedDiff = useSelector((state) => state.quiz.difficulty);
  const selectAm=useSelector((state)=>state.quiz.amount)
  const [selectedCategory, setSelectedCategory] = useState(SelectedCat);
  const [selectedDifficulty, setselectedDifficulty] = useState(selectedDiff);
  const [selectAmount,setSelectedAmount]=useState(selectAm)
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const handleDifficultyChange=(e)=>{
    const selectedValue = e.target.value
    setselectedDifficulty(selectedValue)
    dispatch(changeDifficulty(selectedValue))
  }
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    dispatch(changeCategory(selectedValue));
  };
  const handleAmountChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAmount(selectedValue);
    dispatch(changeAmount(selectedValue));
  };

  return (
    <div>
      <div>
        <h1>Quizzical</h1>
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
        <select value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="">Select the Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input type="text" placeholder="Enter the Amount" name="" id="" value={selectAm} onChange={handleAmountChange}/>
      </div>
      <div><button><Link to={"quiz"}>Start</Link></button></div>
    </div>
  );
};

export default Home;
