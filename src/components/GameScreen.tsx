import React, { useState, useCallback } from 'react';
import { PlayerData, Island } from '../types';
import { contentService } from '../services/contentService';
import IslandMap from './IslandMap';
import IslandView from './IslandView';
import PlayerDashboard from './PlayerDashboard';
import ChallengePath from './ChallengePath';

interface GameScreenProps {
  playerData: PlayerData;
  onUpdateProgress: (newProgress: PlayerData) => void;
  onLogout: () => void;
}

const GameScreen = ({ playerData, onUpdateProgress, onLogout }: GameScreenProps) => {
  const [currentView, setCurrentView] = useState<'map' | 'island' | 'dashboard' | 'challengePath'>('map');
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);

  const handleSelectIsland = useCallback((island: Island) => {
    setSelectedIsland(island);
    setCurrentView('island');
  }, []);
  
  const handleBackToMap = useCallback(() => {
    setSelectedIsland(null);
    setCurrentView('map');
  }, []);
  
  const handleShowDashboard = useCallback(() => {
    setCurrentView('dashboard');
  }, []);

  const handleShowChallengePath = useCallback(() => {
    const islands = contentService.getIslands();
    const conqueredIslands = Object.keys(playerData.progress)
        .filter(id => playerData.progress[Number(id)].score >= contentService.TOTAL_POINTS_TO_CONQUER)
        .map(Number);
    const currentIslandId = conqueredIslands.length + 1;
    const currentIsland = islands.find(i => i.id === currentIslandId);
    if (currentIsland) {
        setSelectedIsland(currentIsland);
        setCurrentView('challengePath');
    } else {
        const lastIsland = islands[islands.length - 1];
        if(lastIsland){
            setSelectedIsland(lastIsland);
            setCurrentView('challengePath');
        }
    }
  }, [playerData]);


  const totalScore = Object.values(playerData.progress).reduce((acc, island) => acc + island.score, 0);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'island':
        return selectedIsland && (
          <IslandView
            island={selectedIsland}
            playerData={playerData}
            onUpdateProgress={onUpdateProgress}
            onBackToMap={handleBackToMap}
          />
        );
      case 'dashboard':
        return (
          <PlayerDashboard 
            playerData={playerData} 
            onBackToMap={handleBackToMap} 
            onUpdateProgress={onUpdateProgress}
          />
        );
      case 'challengePath':
        return selectedIsland && (
            <ChallengePath 
                island={selectedIsland}
                playerData={playerData}
                onBackToMap={handleBackToMap}
            />
        );
      case 'map':
      default:
        return (
          <IslandMap
            playerData={playerData}
            onSelectIsland={handleSelectIsland}
          />
        );
    }
  };

  return (
    <>
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b-2 border-yellow-500/30 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cinzel text-yellow-400">Bem-vindo, Guerreiro {playerData.name}</h1>
          <p className="text-gray-300">Sua pontuação total: {totalScore} Moedas de Ouro</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <button
            onClick={handleShowChallengePath}
            className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Trilha Mágica
          </button>
          <button
            onClick={handleShowDashboard}
            className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Meu Progresso
          </button>
          <a
            href={contentService.getStorytellingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Storytelling
          </a>
          <a
            href={contentService.getManualUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Manual
          </a>
          <button 
            onClick={onLogout} 
            className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Encerrar
          </button>
        </div>
      </header>
      <main>
        {renderCurrentView()}
      </main>
    </div>
    </>
  );
};

export default GameScreen;