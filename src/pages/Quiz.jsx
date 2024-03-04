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
import "../components/QuizStyle.css";

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
          const fetchedQuestions = response.payload;

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
      <h3>{questionObject.question}</h3>
      <div className="answers-btn-container">
        {questionObject.shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={(e) =>
              updateAnswer(questionObject.question, e.target.value)
            }
            checked={questionObject.selectedAnswer === answer}
          >{answer}</button>
        ))}
      </div>
    </div>
  ));
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="all-quiz">
          <div className="nav-bar-home">
            <h1>
              Qui<span>zz</span>ical
            </h1>
          </div>
          <div className="questions-container">{questionsElements}</div>

          <div className="button-ch-container">
            {showWarning && (
              <p className="warning-message">
                There are questions not answered yet.
              </p>
            )}

            {questions.length > 0 && !showResult && (
              <div className="check-btn-grp">
                <button className="check-btn" onClick={checkAnswers}>
                  Check answers
                </button>
                <button
                  className="play-again-btn"
                  onClick={() => window.location.reload()}
                >
                  <Link className="cancel-link" to="/">
                    Cancel quiz
                  </Link>
                </button>
              </div>
            )}
          </div>

          {showResult && (
            <div className="result-container">
              <p className="result-message">
                You scored {numCorrectAnswers}/{amount} correct answers{" "}
                {(numCorrectAnswers * 100) / amount}%.
              </p>
              <div className="result-btn-grp">
                <button className="play-again-btn" onClick={playAgain}>
                  Play again
                </button>
                <Link to="/">
                  <button className="" onClick={playAgain}>
                    HOME
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
