import React, { useState, useCallback } from 'react';
import { PlayerData, Island } from '../types';
import IslandMap from './IslandMap';
import IslandView from './IslandView';
import PlayerDashboard from './PlayerDashboard';

interface GameScreenProps {
  playerData: PlayerData;
  onUpdateProgress: (newProgress: PlayerData) => void;
  onLogout: () => void;
  storytellingUrl: string;
}

const GameScreen = ({ playerData, onUpdateProgress, onLogout, storytellingUrl }: GameScreenProps) => {
  const [currentView, setCurrentView] = useState<'map' | 'island' | 'dashboard'>('map');
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
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b-2 border-yellow-500/30 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cinzel text-yellow-400">Bem-vindo, Guerreiro {playerData.name}</h1>
          <p className="text-gray-300">Sua pontuação total: {totalScore} Moedas de Ouro</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <button
            onClick={handleShowDashboard}
            className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Meu Progresso
          </button>
          <a
            href={storytellingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Storytelling
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
  );
};

export default GameScreen;