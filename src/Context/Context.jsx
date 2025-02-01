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
 <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    }}>
      <Oval 
        strokeColor="#0000FF" // Blue color for the spinner lines
        strokeWidth="5"       // Width of the spinner lines
        animationDuration="0.75" // Speed of rotation
        width="100"           // Width of the spinner
        visible={true}        // Controls whether the spinner is visible or not
      />        </div> 
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
