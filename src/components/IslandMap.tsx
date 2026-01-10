
import React, { useState, useEffect } from 'react';
import { PlayerData, Island } from '../types';
import { contentService } from '../services/contentService';

interface IslandMapProps {
  playerData: PlayerData;
  onSelectIsland: (island: Island) => void;
}

interface IslandCardProps {
  island: Island;
  status: 'conquered' | 'current' | 'locked';
  sequenceOrder?: number;
  onClick: () => void;
}

const IslandCard: React.FC<IslandCardProps> = ({ island, status, sequenceOrder, onClick }) => {
  const baseClasses = "relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 h-64 flex flex-col justify-end p-4 text-white";
  const statusStyles = {
    conquered: 'border-4 border-yellow-400 hover:scale-105 cursor-pointer shadow-yellow-400/30',
    current: 'border-4 border-teal-400 hover:scale-105 cursor-pointer shadow-teal-400/30 ring-4 ring-teal-500/20 animate-pulse-slow',
    locked: 'border-2 border-gray-600 filter grayscale cursor-not-allowed opacity-80',
  };

  return (
    <div className={`${baseClasses} ${statusStyles[status]}`} onClick={status !== 'locked' ? onClick : undefined}>
      <img 
        src={island.imageUrl} 
        alt={island.name} 
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      {sequenceOrder !== undefined && (
          <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center font-cinzel text-sm font-bold text-gray-200">
            {sequenceOrder}
          </div>
      )}

      <div className="relative z-10">
        <h3 className="font-cinzel text-xl font-bold">{island.name}</h3>
        <p className="text-sm text-gray-300">{island.softSkill}</p>
      </div>

      {status === 'conquered' && (
        <div className="absolute top-4 inset-x-0 flex justify-center">
          <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full shadow-lg">CONQUISTADA</span>
        </div>
      )}
      {status === 'current' && (
        <div className="absolute top-4 inset-x-0 flex justify-center">
          <span className="bg-teal-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-bounce">PRÓXIMO OBJETIVO</span>
        </div>
      )}
      {status === 'locked' && (
        <div className="absolute top-4 inset-x-0 flex justify-center">
          <span className="bg-black/60 text-gray-400 px-4 py-1 text-sm font-bold rounded-lg border border-gray-700 shadow-lg">BLOQUEADA</span>
        </div>
      )}
    </div>
  );
};

const IslandMap = ({ playerData, onSelectIsland }: IslandMapProps) => {
  const [islands, setIslands] = useState<Island[]>([]);

  useEffect(() => {
    setIslands(contentService.getIslands());
  }, []);

  const sequence = contentService.getIslandSequence(playerData);
  const currentIslandId = contentService.getCurrentIslandId(playerData);
  const currentIndexInSequence = sequence.indexOf(currentIslandId);

  if (islands.length === 0) {
    return <div className="text-center p-8 text-yellow-300">Carregando Ilhas Sagradas...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-cinzel text-center mb-2 text-gray-200">As Dez Ilhas Sagradas Aguardam</h2>
      <p className="text-center text-gray-400 mb-8 text-sm">Identifique o selo de "Próximo Objetivo" para avançar em sua jornada personalizada.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {islands.map((island) => {
          const islandId = Number(island.id);
          const isConquered = contentService.isIslandConquered(playerData, islandId);
          const sequenceIndex = sequence.indexOf(islandId);
          
          let status: 'conquered' | 'current' | 'locked';

          if (playerData.isTester) {
            status = isConquered ? 'conquered' : 'current';
          } else {
            // 1. Se já foi conquistada, o status é obrigatoriamente "conquered"
            if (isConquered) {
              status = 'conquered';
            } 
            // 2. Se é a ilha atual (primeira não conquistada da sequência)
            else if (islandId === currentIslandId) {
              status = 'current';
            }
            // 3. Se a ilha está na sequência e seu índice é menor que o índice da atual,
            // tratamos como conquistada (segurança extra para fluxo Lunna)
            else if (sequenceIndex !== -1 && sequenceIndex < currentIndexInSequence) {
              status = 'conquered';
            }
            // 4. Caso contrário, está bloqueada
            else {
              status = 'locked';
            }
          }

          return (
            <IslandCard
              key={islandId}
              island={island}
              status={status}
              sequenceOrder={sequenceIndex !== -1 ? sequenceIndex + 1 : undefined}
              onClick={() => onSelectIsland(island)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IslandMap;
