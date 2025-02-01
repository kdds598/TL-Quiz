import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Quiz.module.css";
import { useQuizData } from "../Context/Context";
import ProgressBar from "./Pbar";
const Quiz = () => {
    

  const { quizData, loading, error } = useQuizData();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [startTime, setStartTime] = useState(null);

  let elapsedTime = Date.now() - startTime;
  let attempted = Object.values(answers).filter(Boolean).length;
  let unattempted = quizData.questions.length - attempted;
  let correct = Object.values(answers).filter((answer) => answer.isCorrect).length;
  let incorrect = attempted - correct;
  let accuracy = ((correct / attempted) * 100).toFixed(2);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now()); // Track start time when quiz starts
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
       elapsedTime = Date.now() - startTime;
       attempted = Object.values(answers).filter(Boolean).length;
       unattempted = quizData.questions.length - attempted;
       correct = Object.values(answers).filter((answer) => answer.is_correct).length;
       incorrect = attempted - correct;
       accuracy = ((correct / attempted) * 100).toFixed(2);

      navigate("/result", {
        state: {
          score,
          attempted,
          unattempted,
          correct,
          incorrect,
          accuracy,
          pm:quizData.correct_answer_marks,
          len:quizData.questions.length,
          timeTaken: elapsedTime, // Pass time taken in milliseconds
        },
      });
    }
  }, [timeLeft, startTime, answers, navigate, quizData]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleAnswerClick = (option) => {
    if (answers[currentQuestion] !== undefined) return;

    setAnswers({
      ...answers,
      [currentQuestion]: option,
    });

    if (option.is_correct) {
      setScore(score + 4); // +4 for correct answer
    } else {
      setScore(score - 1); // -1 for incorrect answer
    }
  };

  const handleNext = () => {



    if(currentQuestion === quizData.questions.length - 1){

        elapsedTime = Date.now() - startTime;
        attempted = Object.values(answers).filter(Boolean).length;
        unattempted = quizData.questions.length - attempted;
        correct = Object.values(answers).filter((answer) => answer.is_correct).length;
        incorrect = attempted - correct;
        accuracy = ((correct / attempted) * 100).toFixed(2);
 

        navigate("/result", {
            state: {
              score,
              attempted,
              unattempted,
              correct,
              incorrect,
              accuracy,
              pm:quizData.correct_answer_marks,
              len:quizData.questions.length,
              timeTaken: elapsedTime, // Pass time taken in milliseconds
            },
          });
    }

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (




    <div className={styles.quizContainer}>

      <div className={styles.questionContainer}>
          <ProgressBar progress={score/(quizData.correct_answer_marks* quizData.questions.length)*100} />


        <div className={styles.timer}>Time Left: {formatTime(timeLeft)}</div>
        <h3 className={styles.question}>
          {quizData.questions[currentQuestion].description}
        </h3>

        <div className={styles.options}>
          {quizData.questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${
                answers[currentQuestion] !== undefined
                  ? option.is_correct
                    ? styles.correct
                    : answers[currentQuestion] === option
                    ? styles.wrong
                    : ""
                  : ""
              }`}
              onClick={() => handleAnswerClick(option)}
            >{index+1}.{" "}
              {option.description}
            </button>
          ))}
        </div>

        {answers[currentQuestion] && !answers[currentQuestion].isCorrect && (
          <p className={styles.correctAnswer}>
            Correct Answer:{" "}
            <span>
              {quizData.questions[currentQuestion].options.find(
                (opt) => opt.is_correct
              ).description}
            </span>
          </p>
        )}

        <div className={styles.navButtons}>
          <button
            className={styles.prevButton}
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            className={styles.nextButton}
            onClick={handleNext}
          >
            {currentQuestion === quizData.questions.length - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
