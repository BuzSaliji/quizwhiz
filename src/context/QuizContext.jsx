import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

export const useQuiz = () => {
    return useContext(QuizContext);
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT_SCORE':
            return { ...state, score: state.score + 1 };
        case 'RESET':
            return { ...state, score: 0, currentQuestionIndex: 0 };
        case 'NEXT_QUESTION':
            return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
        default:
            return state;
    }
};

const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, { score: 0, currentQuestionIndex: 0 });

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
};

export default QuizProvider;
