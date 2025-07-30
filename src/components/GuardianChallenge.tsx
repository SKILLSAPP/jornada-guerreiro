import React, { useState } from 'react';
import { Challenge } from '../types';
import { geminiService } from '../services/geminiService';

interface GuardianChallengeProps {
  challenge: Challenge;
  softSkill: string;
  onSubmitForReview: (challengeId: number, submissionText: string) => void;
  onClose: () => void;
}

const GuardianChallenge = ({ challenge, softSkill, onSubmitForReview, onClose }: GuardianChallengeProps) => {
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!plan.trim()) {
      alert("Um guerreiro deve apresentar um plano, não o silêncio.");
      return;
    }
    setIsLoading(true);
    setAiFeedback('');
    
    // Non-blocking call to AI for initial feedback
    geminiService.evaluatePlan(plan, softSkill).then(feedback => {
        setAiFeedback(feedback);
    });

    // Immediately submit for master's review
    onSubmitForReview(challenge.id, plan);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-red-500/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-cinzel text-red-400">{challenge.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>
        
        <p className="text-gray-300 mb-4">Analise o estudo de caso fornecido. Identifique as causas raiz e desenhe planos de ação corretivos e preventivos usando seu conhecimento de <span className="font-bold text-yellow-400">{softSkill}</span>. Apresente seu plano abaixo para a avaliação do Guardião.</p>
        
        <textarea
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="Apresente sua análise crítica e plano de ação aqui..."
          className="w-full h-48 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-red-500 focus:border-red-500"
          disabled={isSubmitted}
        />

        <div className="mt-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted || !plan.trim()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isSubmitted ? 'Plano Submetido!' : 'Submeter ao Guardião'}
          </button>
        </div>

        {isSubmitted && (
            <div className="mt-4 text-center p-3 bg-blue-900/50 border border-blue-500 rounded-lg">
                <p className="font-semibold text-blue-300">Sua estratégia foi enviada!</p>
                <p className="text-blue-400 text-sm">O Mestre avaliará seu plano e concederá os pontos em breve. Uma análise inicial do guardião pode aparecer abaixo. Você já pode fechar esta janela.</p>
            </div>
        )}
        
        {aiFeedback && (
          <div className="mt-6 p-4 bg-gray-900/50 border border-gray-600 rounded-lg">
            <h4 className="font-cinzel text-xl text-yellow-300 mb-2">A Análise Inicial do Guardião</h4>
            <div 
              className="prose prose-invert prose-p:text-gray-300 prose-headings:text-yellow-400 text-gray-300" 
              dangerouslySetInnerHTML={{ __html: aiFeedback.replace(/\n/g, '<br />') }} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GuardianChallenge;