import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeQuestions } from '../redux/QuizSlice'

export default function Quiz() {
  const [questVal,setQuestVal]=useState([])
  const dispatch = useDispatch()
  const category = useSelector((state) => state.quiz.selectedCategory);
  const difficulty = useSelector((state) => state.quiz.difficulty);
  const amount = useSelector((state) => state.quiz.amount);
  console.log(difficulty)
  console.log(category,amount)
  useEffect(()=>{
    const getQuestions = async () => {
      try {
        const resp = await axios.get(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
        );
        setQuestVal(resp.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    getQuestions();
    console.log(questVal);
    dispatch(changeQuestions(questVal));
  },[])
  
  return (
    <div>Quiz</div>
  )
}
