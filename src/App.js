import React from 'react';
import QuizProvider from './context/QuizContext';
import Quiz from './components/Quiz';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <QuizProvider>
            <Router>
                <Routes>
                    <Route path="/quiz/:categoryId" element={<Quiz />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </QuizProvider>
    );
};

export default App;
