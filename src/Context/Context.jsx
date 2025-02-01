import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import {Oval} from 'react-loader-spinner'

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          "https://api.allorigins.win/get?url=" + encodeURIComponent(
          "https://api.jsonserve.com/Uw5CrX"
          )
        );

        const data = JSON.parse(response.data.contents);
        
        setQuizData(data); 
      } catch (err) {
        console.error("Error fetching quiz data:", err); 
        setError("Failed to fetch quiz data. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchQuizData(); 
  }, []); 
  return (
    <QuizContext.Provider value={{ quizData, loading, error }}>
      {loading ? (
         <div>       
            Loading...
        </div> 
      ) : error ? (
        <div>{error}</div> 
      ) : (
        children
      )}
    </QuizContext.Provider>
  );

};

export const  useQuizData =()=>useContext(QuizContext);
