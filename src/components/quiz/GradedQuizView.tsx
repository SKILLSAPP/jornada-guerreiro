
import React from 'react';
import { GradedQuiz, Difficulty } from '../../types';

interface GradedQuizViewProps {
  gradedQuiz: GradedQuiz;
}

const GradedQuizView = ({ gradedQuiz }: GradedQuizViewProps) => {

  const difficultyStyles: Record<Difficulty, string> = {
    'Fácil': 'bg-green-800 text-green-200 border-green-600',
    'Médio': 'bg-yellow-800 text-yellow-200 border-yellow-600',
    'Difícil': 'bg-red-800 text-red-200 border-red-600',
  };

  const getOptionStyle = (optionIndex: number, studentAnswerIndex: number, correctAnswerIndex: number) => {
    const isStudentAnswer = optionIndex === studentAnswerIndex;
    const isCorrectAnswer = optionIndex === correctAnswerIndex;

    if (isCorrectAnswer) {
      return 'border-green-500 bg-green-900/40';
    }
    if (isStudentAnswer) { // E, por exclusão, incorreta
      return 'border-red-500 bg-red-900/40';
    }
    return 'border-gray-700 bg-gray-900/50';
  };

  const getOptionIcon = (optionIndex: number, studentAnswerIndex: number, correctAnswerIndex: number) => {
    const isStudentAnswer = optionIndex === studentAnswerIndex;
    const isCorrectAnswer = optionIndex === correctAnswerIndex;

    if (isCorrectAnswer && isStudentAnswer) return <span className="text-green-400 font-bold mr-3" title="Sua Resposta Correta">✔️</span>;
    if (isCorrectAnswer) return <span className="text-green-400 font-bold mr-3" title="Resposta Correta">✔️</span>;
    if (isStudentAnswer) return <span className="text-red-400 font-bold mr-3" title="Sua Resposta">👤</span>;
    return <span className="text-gray-500 font-bold mr-3">❌</span>;
  };


  return (
    <div className="space-y-6">
      {gradedQuiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
          <div className="flex justify-between items-start mb-4 gap-4">
            <p className="font-semibold text-gray-200 flex-1">{qIndex + 1}. {q.questionText}</p>
            <div className="flex flex-col items-end flex-shrink-0">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${difficultyStyles[q.difficulty]}`}>
                    {q.difficulty}
                </span>
                <span className="font-bold text-yellow-400 mt-1">{q.points} pts</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            {q.options.map((opt, oIndex) => (
              <div
                key={oIndex}
                className={`p-3 rounded-md border text-sm text-gray-300 flex items-start ${getOptionStyle(oIndex, q.studentAnswerIndex, q.correctAnswerIndex)}`}
              >
                {getOptionIcon(oIndex, q.studentAnswerIndex, q.correctAnswerIndex)}
                <span>{opt.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-3 bg-gray-900/60 rounded-md border border-yellow-500/30">
            <p className="font-cinzel text-yellow-300 text-sm mb-1">Feedback do Mentor IA</p>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{q.feedback}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GradedQuizView;
