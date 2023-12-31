import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const categories = [
  { name: 'General Knowledge', value: '9' },
  { name: 'Film', value: '11' },
  { name: 'Music', value: '12' },
  { name: 'Sports', value: '21' },
  { name: 'History', value: '23' },
];

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to QuizWhiz</h1>
      <p>Select a category to start the quiz:</p>
      <ul>
        {categories.map((category) => (
          <button key={category.value}>
            <Link to={`/quiz/${category.value}`}>{category.name}</Link>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Home;
