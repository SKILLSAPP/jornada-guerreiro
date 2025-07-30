

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
  onClick: () => void;
}

function IslandCard({ island, status, onClick }: IslandCardProps) {
  const baseClasses = "relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 h-64 flex flex-col justify-end p-4 text-white";
  const statusStyles = {
    conquered: 'border-4 border-yellow-400 hover:scale-105 cursor-pointer shadow-yellow-400/30',
    current: 'border-4 border-teal-400 hover:scale-105 cursor-pointer shadow-teal-400/30',
    locked: 'border-2 border-gray-600 filter grayscale cursor-not-allowed',
  };

  return (
    <div className={`${baseClasses} ${statusStyles[status]}`} onClick={status !== 'locked' ? onClick : undefined}>
      <img 
        src={island.imageUrl} 
        alt={island.name} 
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      <div className="relative z-10">
        <h3 className="font-cinzel text-xl font-bold">{island.name}</h3>
        <p className="text-sm text-gray-300">{island.softSkill}</p>
      </div>

      {status === 'conquered' && (
        <div className="absolute top-4 inset-x-0 flex justify-center">
          <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full shadow-lg">CONQUISTADA</span>
        </div>
      )}
      {status === 'locked' && (
        <div className="absolute top-4 inset-x-0 flex justify-center">
          <span className="bg-black/60 text-gray-200 px-4 py-1 text-sm font-bold rounded-lg border border-gray-500 shadow-lg">BLOQUEADA</span>
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

  const conqueredIslands = Object.keys(playerData.progress)
    .filter(id => playerData.progress[Number(id)].score >= contentService.TOTAL_POINTS_TO_CONQUER)
    .map(Number);
  
  const currentIslandId = conqueredIslands.length + 1;

  if (islands.length === 0) {
    return <div className="text-center p-8 text-yellow-300">Carregando Ilhas Sagradas...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-cinzel text-center mb-8 text-gray-200">As Dez Ilhas Sagradas Aguardam</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {islands.map((island) => {
          let status: 'conquered' | 'current' | 'locked';

          if (playerData.isTester) {
            status = 'current'; // All are available for testers
            if (conqueredIslands.includes(island.id)) {
              status = 'conquered';
            }
          } else {
            status = 'locked';
            if (conqueredIslands.includes(island.id)) {
              status = 'conquered';
            } else if (island.id === currentIslandId) {
              status = 'current';
            }
          }

          return (
            <IslandCard
              key={island.id}
              island={island}
              status={status}
              onClick={() => onSelectIsland(island)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IslandMap;