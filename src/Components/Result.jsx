import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Styles/Result.module.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [rank ,setrank] =useState(["na","na"]);
  const { score, attempted, unattempted, correct, incorrect, accuracy, timeTaken, pm, len } = location.state;
  let p=Number(pm);
  let l=Number(len);

  let progress = (score ) /( p*l) * 100;

  
   let rank=(progress >= 90 ? ["Warlord", "👑"] : progress >= 60 ? ["Vanguard", "🎖️"] : ["Recruited", "🔰"]
   )

  const formatTime = (timeInMillis) => {
    const minutes = Math.floor(timeInMillis / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleReattempt = () => {
    navigate("/"); 
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.result}>
        <h2 style={{ textAlign: "center" }}>Quiz Completed!</h2>
        <hr />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" ,minWidth:"50%"}}>
          {/* Left side content */}
          <div style={{ flex: 1 }}>
            <p>Time Taken: {formatTime(timeTaken)}</p>
            <p>Score: {score}</p>
            <p>Attempted: {attempted}</p>
            <p>Unattempted: {unattempted}</p>
            <p>Correct: {correct}</p>
            <p>Incorrect: {incorrect}</p>
            <p>Points Scored: {score}</p>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }}>Accuracy: {accuracy}%</p>
          </div>

          <div className={styles.gg} >
            <h1 className={styles.headingr}> Rank </h1>
            <h4 className={styles.emoji} >{rank[1]}</h4>
            <h4 className={styles.rank}>{rank[0]}</h4>
          </div>
        </div>
        <hr />
        <div style={{ textAlign: "center" }} className={styles.reattemptButtonContainer}>
          <button className={styles.reattemptButton} onClick={handleReattempt}>
            Reattempt Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
