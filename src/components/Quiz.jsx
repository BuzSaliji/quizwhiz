import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1>Quiz</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <p dangerouslySetInnerHTML={{ __html: question.question }} />
        </div>
      ))}
    </div>
  );
};

export default Quiz;
