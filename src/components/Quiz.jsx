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

        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}`);
        const data = await response.json();
        setQuestions(data.results);
    
        setLoading(false);
      };

    fetchQuestions();
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;

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

  return (
    <div>
      <h1>Quiz</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
          {questions[currentQuestionIndex].incorrect_answers.map((answer, index) => (
            <button key={index} onClick={() => setSelectedAnswer(answer)}>
              {answer}
            </button>
          ))}
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
