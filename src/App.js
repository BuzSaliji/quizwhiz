import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizEnd, setIsQuizEnd] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Check if it's the last question
    if (currentQuestionIndex === quizData.length - 1) {
      setIsQuizEnd(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const fetchQuizData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const data = await response.json();
      setQuizData(data.results);
    } catch (error) {
      console.error("Error fetching quiz data: ", error);
    }
  };

  const handlePlayAgain = () => {
    // Reset state variables
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizEnd(false);
    // Optionally, fetch new quiz data
    fetchQuizData();
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <div className="App">
      <h1>QuizWhiz</h1>
      {isQuizEnd ? (
        <div>
          <p>Your Score: {score}</p>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      ) : quizData.length > 0 ? (
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: quizData[currentQuestionIndex].question }} />
          <ul>
            {[quizData[currentQuestionIndex].correct_answer, ...quizData[currentQuestionIndex].incorrect_answers].map((answer, index) => (
              <li key={index} onClick={() => handleAnswerClick(answer === quizData[currentQuestionIndex].correct_answer)} dangerouslySetInnerHTML={{ __html: answer }} />
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
