

import React from 'react';
import { PlayerData, Island } from '../types';
import { contentService } from '../services/contentService';
import ChallengeCard from './ChallengeCard';
import ProgressBar from './ProgressBar';

interface IslandViewProps {
  island: Island;
  playerData: PlayerData;
  onUpdateProgress: (newProgress: PlayerData) => void;
  onBackToMap: () => void;
}

const IslandView = ({ island, playerData, onUpdateProgress, onBackToMap }: IslandViewProps) => {
  const islandProgress = playerData.progress[island.id] || { score: 0, completedChallenges: [], pendingSubmissions: {} };
  const isConquered = islandProgress.score >= contentService.TOTAL_POINTS_TO_CONQUER;

  const handleSubmitForReview = (challengeId: number, submissionText: string) => {
    const newProgress = JSON.parse(JSON.stringify(playerData.progress)); // Deep copy
    const currentIslandProgress = newProgress[island.id] || { score: 0, completedChallenges: [], pendingSubmissions: {} };
    
    if (!currentIslandProgress.pendingSubmissions) {
      currentIslandProgress.pendingSubmissions = {};
    }

    if (currentIslandProgress.pendingSubmissions[challengeId]) return;

    currentIslandProgress.pendingSubmissions[challengeId] = {
      submission: submissionText,
      submittedAt: new Date().toISOString(),
    };
    
    newProgress[island.id] = currentIslandProgress;
    onUpdateProgress({ ...playerData, progress: newProgress });
  };

  return (
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
          <h3 className="font-cinzel text-2xl text-gray-200 mb-4 border-b border-gray-600 pb-2">A Trilha Mágica</h3>
          <div className="space-y-4">
            {island.challenges.map((challenge, index) => {
              const isCompleted = islandProgress.completedChallenges.includes(challenge.id);
              const isPending = !!islandProgress.pendingSubmissions?.[challenge.id];
              const isLocked = !playerData.isTester && index > 0 && !islandProgress.completedChallenges.includes(island.challenges[index - 1].id);
              return (
                <ChallengeCard 
                  key={challenge.id}
                  island={island}
                  challenge={challenge}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  isPending={isPending}
                  onSubmitForReview={handleSubmitForReview}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslandView;