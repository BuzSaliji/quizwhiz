
import './App.css';

import React, { useEffect } from 'react';

function App() {
  const fetchQuizData = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const data = await response.json();
      console.log(data);
    }

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <div className="App">
      <h1>QuizWhiz</h1>
    </div>
  );
}

export default App;
