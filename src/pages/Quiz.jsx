import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLoading,
  changeQuestions,
  getQuestions,
} from "../redux/QuizSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function Quiz() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.quiz.loading);
  const category = useSelector((state) => state.quiz.selectedCategory);
  const difficulty = useSelector((state) => state.quiz.difficulty);
  const amount = useSelector((state) => state.quiz.amount);
  const questions = useSelector((state) => state.quiz.questions);
  const [QandA, setQandA] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (questions.length === 0 && category && difficulty && amount) {
      dispatch(changeLoading(true));
      setTimeout(async () => {
        try {
          const response = await dispatch(
            getQuestions({ category, amount, difficulty })
          );
          const fetchedQuestions = response.payload; // Assuming payload contains the actual data

          if (Array.isArray(fetchedQuestions)) {
            const formattedQuestions = fetchedQuestions.map((q) => ({
              question: q.question,
              shuffledAnswers: shuffle([
                ...q.incorrect_answers,
                q.correct_answer,
              ]),
              correctAnswer: q.correct_answer,
              selectedAnswer: "",
            }));
            setQandA(formattedQuestions);
          } else {
            console.error(
              "Invalid format for fetchedQuestions:",
              fetchedQuestions
            );
          }
        } catch (error) {
          console.error("Error fetching questions:", error.message);
        } finally {
          dispatch(changeLoading(false));
        }
      }, 1000);
    }
  }, [dispatch, questions, category, difficulty, amount]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function updateAnswer(currentQuestion, answer) {
    setQandA(
      QandA.map((questionObject) =>
        questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject
      )
    );
  }

  function checkAnswers() {
    const notAllAnswered = QandA.some(
      (questionObject) => questionObject.selectedAnswer === ""
    );

    setShowWarning(notAllAnswered);

    if (!notAllAnswered) {
      const newNumCorrectAnswers = QandA.reduce(
        (acc, questionObject) =>
          questionObject.selectedAnswer === questionObject.correctAnswer
            ? acc + 1
            : acc,
        0
      );

      setNumCorrectAnswers(newNumCorrectAnswers);
      setShowResult(true);
    }
  }

  function playAgain() {
    dispatch(changeQuestions([]));
    setQandA([]);
    setShowResult(false);
    setNumCorrectAnswers(0);
  }

  function cancelQuiz() {
    dispatch(changeQuestions([]));
    setQandA([]);
    setShowResult(false);
    setNumCorrectAnswers(0);
  }

  console.log(questions);
  console.log(category);
  console.log(difficulty);
  console.log(amount);
  console.log(loading);

  const questionsElements = QandA.map((questionObject, index) => (
    <div key={index} className="question">
      <p>{questionObject.question}</p>
      <ul>
        {questionObject.shuffledAnswers.map((answer, answerIndex) => (
          <li key={answerIndex}>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value={answer}
                onChange={(e) =>
                  updateAnswer(questionObject.question, e.target.value)
                }
                checked={questionObject.selectedAnswer === answer}
              />
              {answer}
            </label>
          </li>
        ))}
      </ul>
    </div>
  ));
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="questions-container">{questionsElements}</div>

          <div className="text-center">
            {showWarning && (
              <p className="warning-message">
                There are questions not answered yet.
              </p>
            )}

            {questions.length > 0 && !showResult && (
              <div>
                <button className="check-btn" onClick={checkAnswers}>
                  Check answers
                </button><button className="play-again-btn" onClick={()=>window.location.reload()}>
                <Link to="/">
                Cancel quiz</Link></button>
              </div>
            )}
          </div>

          {showResult && (
            <div className="result-container">
              <p className="result-message">
                You scored {numCorrectAnswers}/{amount} correct answers.
              </p>
              <button className="play-again-btn" onClick={playAgain}>
                Play again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
