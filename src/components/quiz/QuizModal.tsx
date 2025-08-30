import React, { useState, useEffect, useMemo } from 'react';
import { Quiz, Difficulty } from '../../types';
import { contentService } from '../../services/contentService';

interface QuizModalProps {
  quizId: string;
  challengeId: number;
  onClose: () => void;
  onSubmit: (challengeId: number, answers: number[]) => void;
}

export default function QuizModal({ quizId, challengeId, onClose, onSubmit }: QuizModalProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [view, setView] = useState<'questioning' | 'finished'>('questioning');

  useEffect(() => {
    const loadedQuiz = contentService.getQuiz(quizId);
    setQuiz(loadedQuiz);
    if (loadedQuiz) {
      setAnswers(new Array(loadedQuiz.questions.length).fill(-1));
    }
  }, [quizId]);

  const currentQuestion = useMemo(() => quiz?.questions[currentQuestionIndex], [quiz, currentQuestionIndex]);

  const difficultyStyles: Record<Difficulty, string> = {
    'Fácil': 'bg-green-800 text-green-200 border-green-600',
    'Médio': 'bg-yellow-800 text-yellow-200 border-yellow-600',
    'Difícil': 'bg-red-800 text-red-200 border-red-600',
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setView('finished');
    }
  };
  
  const handleSubmitQuiz = () => {
      if(!quiz) return;
      onSubmit(challengeId, answers);
      onClose();
  }

  if (!quiz) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg p-6 text-white">Carregando Quiz...</div>
      </div>
    );
  }

  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col border-2 border-blue-500/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-cinzel text-blue-300">{quiz.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>
        
        {view === 'questioning' && currentQuestion && (
          <div className="flex-grow overflow-y-auto pr-2">
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{width: `${progressPercentage}%`}}></div>
            </div>
            <p className="text-right text-sm text-gray-400 mb-4">Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}</p>

            <div className="flex justify-between items-start mb-4 gap-4">
              <h4 className="text-xl text-gray-200 flex-1">{currentQuestion.questionText}</h4>
              <div className="flex flex-col items-end flex-shrink-0">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${difficultyStyles[currentQuestion.difficulty]}`}>
                      {currentQuestion.difficulty}
                  </span>
                  <span className="font-bold text-yellow-400 mt-1">{currentQuestion.points} pts</span>
              </div>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestionIndex] === index;
                const buttonClass = isSelected ? 'bg-blue-600 ring-2 ring-blue-400' : 'bg-gray-700 hover:bg-gray-600';

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full text-left p-4 rounded-lg transition-colors text-white font-medium ${buttonClass}`}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        
        {view === 'finished' && (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-cinzel text-yellow-400">Quiz Concluído</h2>
                <p className="text-gray-300 mt-2 max-w-md">Suas respostas foram registradas. Envie seu teste para que o Mestre possa avaliar seu conhecimento e fornecer sua sabedoria.</p>
            </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-700">
            {view === 'questioning' ? (
                <button
                    onClick={handleNext}
                    disabled={answers[currentQuestionIndex] === -1}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {currentQuestionIndex < quiz.questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Teste'}
                </button>
            ) : (
                <button
                    onClick={handleSubmitQuiz}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors animate-pulse"
                >
                    Submeter para Avaliação
                </button>
            )}
        </div>
      </div>
    </div>
  );
}