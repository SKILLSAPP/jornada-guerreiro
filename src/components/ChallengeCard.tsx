import React, { useState } from 'react';
import { Island, Challenge, PendingSubmission } from '../types';
import QuizModal from './quiz/QuizModal';

interface ChallengeCardProps {
  island: Island;
  challenge: Challenge;
  isCompleted: boolean;
  isLocked: boolean;
  isPending: boolean;
  pendingSubmission?: PendingSubmission;
  onSubmitForReview: (challengeId: number, submission: string | number[], submissionType: 'quiz' | 'submission' | 'presentation') => void;
}

interface ResourceLinkProps {
  resource: Challenge['resources'][0];
}

// FIX: Changed to React.FC to correctly handle the 'key' prop and fix TypeScript errors.
const ResourceLink: React.FC<ResourceLinkProps> = ({ resource }) => {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium py-1 px-3 rounded-full transition-colors"
    >
      <span>{resource.label}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

// FIX: Changed to React.FC to correctly handle the 'key' prop and fix TypeScript errors.
const ChallengeCard: React.FC<ChallengeCardProps> = ({ island, challenge, isCompleted, isLocked, isPending, pendingSubmission, onSubmitForReview }) => {
  const [isQuizModalOpen, setQuizModalOpen] = useState(false);
  
  const isRedemptionQuizOffered = isPending && !!pendingSubmission?.redemptionQuizOffered;
  const isRedemptionQuizTaken = isRedemptionQuizOffered && !!pendingSubmission?.answers;

  // Determine the correct quizId for the modal, handling regular and redemption quizzes.
  const modalQuizId = isRedemptionQuizOffered
    ? `island-${island.id}-challenge-${challenge.id}-redemption`
    : challenge.quizId;

  const cardClasses = `p-5 rounded-lg border transition-all duration-300 ${
    isCompleted ? 'bg-green-900/40 border-green-500/50' : 
    isPending ? 'bg-yellow-900/50 border-yellow-600/60' :
    isLocked ? 'bg-gray-700/30 border-gray-600/50 opacity-60' : 
    'bg-gray-700/70 border-gray-600 hover:border-yellow-400'
  }`;

  const handleQuizSubmit = (challengeId: number, answers: number[]) => {
      onSubmitForReview(challengeId, answers, 'quiz');
  };
  
  const renderActionButtons = () => {
    // 1. Guardian Challenge - Initial submission
    if (challenge.id === 4) {
      return (
        <button
          onClick={() => onSubmitForReview(challenge.id, '', 'presentation')}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Enfrente o Guardião (Sinalizar Prontidão)
        </button>
      );
    }
    // 2. Internal Quiz
    if (challenge.quizId) {
      return (
        <button onClick={() => setQuizModalOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Fazer Quiz
        </button>
      );
    }
    // 3. External Quiz (Legacy)
    if (challenge.quizUrl) {
      return (
        <div className="flex flex-col sm:flex-row gap-2">
          <a href={challenge.quizUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Fazer Quiz (Externo)
          </a>
          <button onClick={() => onSubmitForReview(challenge.id, "Quiz externo concluído.", 'submission')} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors">
            Concluí o Quiz
          </button>
        </div>
      );
    }
    return null;
  };
  
  return (
     <>
      <div className={cardClasses}>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-bold font-cinzel text-gray-100">{challenge.title}</h4>
            <p className="text-sm text-yellow-400 mb-2">{challenge.points} Moedas de Ouro</p>
            <p className="text-gray-300">{challenge.description}</p>
          </div>
          <div className="text-right ml-4 flex-shrink-0">
            {isCompleted ? (
              <span className="px-3 py-1 text-sm font-semibold text-green-200 bg-green-800 rounded-full">Concluído</span>
            ) : isPending ? (
               <span className="px-3 py-1 text-sm font-semibold text-yellow-200 bg-yellow-800 rounded-full">Pendente</span>
            ) : isLocked ? (
              <span className="px-3 py-1 text-sm font-semibold text-gray-400 bg-gray-800 rounded-full">Bloqueado</span>
            ) : (
              <span className="px-3 py-1 text-sm font-semibold text-teal-200 bg-teal-800 rounded-full">Disponível</span>
            )}
          </div>
        </div>
        
        {!isLocked && !isCompleted && !isPending && (
          <div className="mt-4 pt-4 border-t border-gray-600/50 space-y-4">
             {challenge.resources.length > 0 && (
              <div>
                <h5 className="text-gray-300 font-semibold mb-2">Materiais de Estudo:</h5>
                <div className="flex flex-wrap gap-2">
                  {challenge.resources.map((resource, index) => (
                    <ResourceLink key={index} resource={resource} />
                  ))}
                </div>
              </div>
            )}
            {renderActionButtons()}
          </div>
        )}
        
         {isPending && (
           <div className="mt-4 pt-4 border-t border-gray-600/50">
              <p className="text-center text-yellow-300 italic mb-4">
                {isRedemptionQuizOffered && !isRedemptionQuizTaken
                    ? "O Mestre lhe concedeu uma nova chance! Faça o Quiz de Redenção."
                    : "Sua tarefa foi enviada ao Mestre. Aguarde o seu julgamento."}
              </p>
               {isRedemptionQuizOffered && !isRedemptionQuizTaken && (
                <button onClick={() => setQuizModalOpen(true)} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors animate-pulse">
                  Fazer Quiz de Redenção
                </button>
              )}
           </div>
         )}
      </div>

      {isQuizModalOpen && modalQuizId && (
        <QuizModal
          quizId={modalQuizId}
          challengeId={challenge.id}
          onClose={() => setQuizModalOpen(false)}
          onSubmit={handleQuizSubmit}
        />
      )}
    </>
  );
};

export default ChallengeCard;