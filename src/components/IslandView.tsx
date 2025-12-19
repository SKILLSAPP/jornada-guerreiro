
import React from 'react';
import { PlayerData, Island } from '../types';
import { contentService } from '../services/contentService';
import ChallengeCard from './ChallengeCard';
import ProgressBar from './ProgressBar';
import ExtraordinaryChallenge from './ExtraordinaryChallenge';

interface IslandViewProps {
  island: Island;
  playerData: PlayerData;
  onUpdateProgress: (newProgress: PlayerData) => void;
  onBackToMap: () => void;
}

const IslandView = ({ island, playerData, onUpdateProgress, onBackToMap }: IslandViewProps) => {
  const islandProgress = playerData.progress[island.id] || { score: 0, completedChallenges: [], pendingSubmissions: {} };
  const isConquered = islandProgress.score >= contentService.TOTAL_POINTS_TO_CONQUER;

  // Lógica atualizada para respeitar a sequência personalizada
  const currentIslandId = contentService.getCurrentIslandId(playerData);
  const isCurrentIsland = island.id === currentIslandId;

  const handleSubmitForReview = (challengeId: number, submission: string | number[], submissionType: 'quiz' | 'submission' | 'presentation') => {
    const newProgress = JSON.parse(JSON.stringify(playerData));
    const currentIslandProgress = newProgress.progress[island.id] || { score: 0, completedChallenges: [], pendingSubmissions: {} };
    
    if (!currentIslandProgress.pendingSubmissions) {
      currentIslandProgress.pendingSubmissions = {};
    }

    const existingSubmission = currentIslandProgress.pendingSubmissions[challengeId];

    // Impede a nova submissão de um quiz que já foi respondido e está pendente
    if (existingSubmission && existingSubmission.answers) {
      alert("Você já enviou este quiz. Aguarde a avaliação do Mestre.");
      return;
    }
    
    // Para um quiz de redenção, atualizamos a submissão pendente existente.
    // Para um novo quiz, criamos uma nova.
    const baseSubmission = existingSubmission || {};

    if (submissionType === 'quiz' && Array.isArray(submission)) {
       currentIslandProgress.pendingSubmissions[challengeId] = {
        ...baseSubmission,
        submissionType: 'quiz',
        answers: submission,
        submittedAt: new Date().toISOString(),
      };
    } else if (submissionType === 'submission' && typeof submission === 'string') {
      currentIslandProgress.pendingSubmissions[challengeId] = {
        ...baseSubmission,
        submissionType: 'submission',
        submission: submission,
        submittedAt: new Date().toISOString(),
      };
    } else if (submissionType === 'presentation') {
       // Isso também não deve poder ser reenviado, mas a UI já impede.
       if (existingSubmission) return;
       currentIslandProgress.pendingSubmissions[challengeId] = {
        ...baseSubmission,
        submissionType: 'presentation',
        submittedAt: new Date().toISOString(),
      };
    }
    
    newProgress.progress[island.id] = currentIslandProgress;
    onUpdateProgress({ ...newProgress });

    alert("Sua tarefa foi enviada ao Mestre para avaliação!");
  };
  
  return (
    <>
    <div className="bg-gray-800/50 p-6 rounded-lg border border-yellow-500/20">
      <button onClick={onBackToMap} className="mb-4 text-yellow-400 hover:text-yellow-300 font-semibold">
        &larr; Voltar ao Mapa-Múndi
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <img 
            src={island.imageUrl} 
            alt={island.name} 
            className="rounded-lg shadow-lg mb-4 object-cover w-full aspect-[4/3]"
          />
          <h2 className="font-cinzel text-3xl text-yellow-400">{island.name}</h2>
          <p className="text-lg text-gray-300 mb-2">{island.pinyinName} - {island.softSkill}</p>
          <p className="text-gray-400 italic mb-4">{island.story}</p>
          
          <h3 className="font-cinzel text-xl text-gray-200 mb-2">Progresso para a Conquista</h3>
          <ProgressBar current={islandProgress.score} total={contentService.TOTAL_POINTS_TO_CONQUER} />
          <p className="text-center text-gray-300 mt-2">{islandProgress.score} / {contentService.TOTAL_POINTS_TO_CONQUER} Moedas de Ouro</p>
          {isConquered && (
            <div className="mt-4 p-4 bg-yellow-400/20 border border-yellow-500 rounded-lg text-center">
              <h4 className="font-bold text-yellow-300">PERGAMINHO DAS VIRTUDES OBTIDO!</h4>
              <p className="text-yellow-400">Você dominou {island.softSkill}.</p>
            </div>
          )}
        </div>

        <div className="lg:w-2/3">
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl text-gray-200 mb-4 border-b border-gray-600 pb-2">Desafios da Ilha</h3>
            {island.challenges.map((challenge, index) => {
              const isCompleted = islandProgress.completedChallenges.includes(challenge.id);
              const pendingSubmission = islandProgress.pendingSubmissions?.[challenge.id];
              const isPending = !!pendingSubmission;
              const isLocked = !playerData.isTester && index > 0 && !islandProgress.completedChallenges.includes(island.challenges[index - 1].id);

              return (
                <ChallengeCard 
                  key={challenge.id}
                  island={island}
                  challenge={challenge}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  isPending={isPending}
                  pendingSubmission={pendingSubmission}
                  onSubmitForReview={handleSubmitForReview}
                />
              );
            })}
          </div>
          
           {isCurrentIsland && !isConquered && (
            <div className="mt-8">
              <ExtraordinaryChallenge 
                island={island}
                playerData={playerData}
                onUpdateProgress={onUpdateProgress}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default IslandView;
