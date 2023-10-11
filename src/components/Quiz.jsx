import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

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
        alert(`Quiz finished! Your score: ${score}`);
      }
    }, 500);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <div>
      <h1>Quiz</h1>
      {!loading && (
        <div>
          <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
          {shuffledAnswers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerClick(answer)}>
              {answer}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quiz;
