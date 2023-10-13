import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const playAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
    navigate('/');
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}`);
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [categoryId]);

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  let shuffledAnswers = [];
  if (!loading && questions[currentQuestionIndex]) {
    const currentQuestion = questions[currentQuestionIndex];
    shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);
  }

  return (
    <div className="quiz">
      <h1>Quiz</h1>
      {!loading && questions[currentQuestionIndex] && !isQuizFinished ? (
        <div className="container">
          <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
          {shuffledAnswers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerClick(answer)}>
              {answer}
            </button>
          ))}
        </div>
      ) : null}
      {isQuizFinished && (
        <div className='endgame'>
          <h1 className='endheader'>Your Score: {score}</h1>
          <button onClick={playAgain}>Play Again</button>
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Quiz;
