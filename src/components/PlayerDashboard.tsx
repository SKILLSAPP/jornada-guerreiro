

import React, { useMemo } from 'react';
import { PlayerData } from '../types';
import { contentService } from '../services/contentService';
import Mandala from './Mandala';

interface PlayerDashboardProps {
  playerData: PlayerData;
  onBackToMap: () => void;
}

const PlayerDashboard = ({ playerData, onBackToMap }: PlayerDashboardProps) => {
  const islands = useMemo(() => contentService.getIslands(), []);
  
  const totalScore = Object.values(playerData.progress).reduce((acc, island) => acc + island.score, 0);
  
  const petalsEarned = contentService.MANDALA_PETAL_THRESHOLDS.filter(threshold => totalScore >= threshold).length;
  
  const nextPetalThreshold = contentService.MANDALA_PETAL_THRESHOLDS[petalsEarned];

  const conqueredIslands = Object.keys(playerData.progress)
    .filter(id => playerData.progress[Number(id)].score >= contentService.TOTAL_POINTS_TO_CONQUER)
    .map(Number);
  
  const currentIslandId = conqueredIslands.length + 1;

  return (
    <div className="bg-gray-800/60 p-6 rounded-lg border border-yellow-500/20 backdrop-blur-sm">
      <button onClick={onBackToMap} className="mb-6 text-yellow-400 hover:text-yellow-300 font-semibold">
        &larr; Voltar ao Mapa-Múndi
      </button>

      <h2 className="text-4xl font-cinzel text-center text-yellow-400 mb-8">Pergaminho da Jornada</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna Central: Mandala e Feedback */}
        <div className="lg:col-span-1 lg:order-2 bg-gray-900/40 p-6 rounded-xl border border-gray-700/50 flex flex-col items-center">
            <h3 className="text-2xl font-cinzel text-yellow-300 mb-4">A Mandala Mágica</h3>
            <Mandala petalsEarned={petalsEarned} />
            <p className="text-gray-300 mt-4 text-center">Você reuniu <span className="font-bold text-white">{petalsEarned} de 5</span> pétalas.</p>
            <p className="text-3xl font-cinzel text-white my-4">{totalScore.toLocaleString()} <span className="text-yellow-400 text-2xl">Moedas de Ouro</span></p>
            {petalsEarned < 5 && nextPetalThreshold &&(
                 <p className="text-sm text-gray-400 text-center">A próxima pétala será sua ao atingir {nextPetalThreshold.toLocaleString()} moedas.</p>
            )}
            {petalsEarned === 5 && (
                 <p className="font-bold text-yellow-300 text-center">A MANDALA ESTÁ COMPLETA!</p>
            )}

            <div className="w-full mt-8 pt-6 border-t border-gray-600/50">
                <h3 className="text-2xl font-cinzel text-yellow-300 mb-4 text-center">Palavras do Mestre</h3>
                {playerData.mentorFeedback ? (
                    <p className="text-gray-300 bg-black/30 p-4 rounded-lg italic whitespace-pre-wrap font-serif">{playerData.mentorFeedback}</p>
                ) : (
                    <p className="text-gray-500 italic text-center">O Mestre ainda não deixou sua sabedoria registrada aqui. Continue sua jornada.</p>
                )}
            </div>
        </div>

        {/* Coluna da Esquerda/Direita: Progresso nas Ilhas */}
        <div className="lg:col-span-2 lg:order-1 bg-gray-900/40 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-2xl font-cinzel text-yellow-300 mb-4">Progresso nas Ilhas Sagradas</h3>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-3">
            {islands.map(island => {
              const islandProgress = playerData.progress[island.id] || { score: 0 };
              const isConquered = conqueredIslands.includes(island.id);
              const isCurrent = island.id === currentIslandId;
              
              let statusIcon;
              if (isConquered) {
                statusIcon = <span title="Conquistada" className="text-green-400">✔</span>;
              } else if (isCurrent) {
                statusIcon = <span title="Jornada Atual" className="text-blue-400">»</span>;
              } else {
                statusIcon = <span title="Bloqueada" className="text-gray-500">🔒</span>;
              }

              return (
                <div key={island.id} className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold">{statusIcon}</div>
                    <div>
                      <p className="font-semibold text-gray-200">{island.name}</p>
                      <p className="text-sm text-gray-400">{island.softSkill}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-yellow-400">{islandProgress.score.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Moedas</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;