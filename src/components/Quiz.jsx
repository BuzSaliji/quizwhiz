import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [isQuizFinished, setIsQuizFinished] = useState(false);


  const playAgain = () => {
    // Reset any quiz state if needed
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);

    // Navigate to the home page
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
  

  if (loading) return <p>Loading...</p>;

  // eslint-disable-next-line no-unused-vars
  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null); 
    } else {
      alert(`Quiz finished! Your score: ${score}`);
    }
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    console.log("Selected Answer:", answer);
  
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
      } else {
        setIsQuizFinished(true);
      }
    }, 500);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz">
      <h1>Quiz</h1>
      {!loading && (
        <div className="container">
          <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
          {shuffledAnswers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerClick(answer)}>
              {answer}
            </button>
          ))}
        </div>
      )}
      {isQuizFinished && (
        <div className='endgame'>
          <h1 className='endheader'>Your Score: {score}</h1>
          <button onClick={playAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;