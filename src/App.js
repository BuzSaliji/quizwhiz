
import './App.css';

import React, { useEffect, useState } from 'react';

function App() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const fetchQuizData = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const data = await response.json();
    setQuizData(data.results);
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <div className="App">
      <h1>QuizWhiz</h1>
      {quizData.length > 0 && currentQuestionIndex < quizData.length ? (
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: quizData[currentQuestionIndex].question }} />
          <ul>
            {[quizData[currentQuestionIndex].correct_answer, ...quizData[currentQuestionIndex].incorrect_answers].map((answer, index) => (
              <li key={index} onClick={() => handleAnswerClick(answer === quizData[currentQuestionIndex].correct_answer)} dangerouslySetInnerHTML={{ __html: answer }} />
            ))}
          </ul>
        </div>
      ) : (
        <p>Your Score: {score}</p>
      )}
    </div>
  );
}
  

export default App;
