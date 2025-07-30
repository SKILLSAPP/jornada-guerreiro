import React, { useState, useCallback, useEffect } from 'react';
import { PlayerData } from './types';
import { gameService } from './services/gameService';
import { contentService } from './services/contentService';
import LoginScreen from './components/LoginScreen';
import GameScreen from './components/GameScreen';
import WelcomeScreen from './components/WelcomeScreen';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true
  const [loginError, setLoginError] = useState<string | null>(null);
  const [storytellingUrl, setStorytellingUrl] = useState<string>('');
  const [mainBgUrl, setMainBgUrl] = useState('');
  const [welcomeBgUrl, setWelcomeBgUrl] = useState('');

  const loadContentUrls = useCallback(() => {
    setStorytellingUrl(contentService.getStorytellingUrl());
    setMainBgUrl(contentService.getMainBackgroundUrl());
    setWelcomeBgUrl(contentService.getWelcomeBackgroundUrl());
  }, []);

  useEffect(() => {
    // Check for a logged in user in localStorage on initial load
    const loggedInUser = gameService.getLoggedInUser();
    if (loggedInUser) {
      setPlayerData(loggedInUser);
    }
    setIsLoading(false);
    loadContentUrls();    
  }, [loadContentUrls]);

  const handleLogin = useCallback(async (name: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);
    const data = await gameService.login(name, password);
    if (data) {
      setPlayerData(data);
    } else {
      setLoginError('Guerreiro não encontrado, senha incorreta ou acesso revogado.');
    }
    setIsLoading(false);
  }, []);

  const handleUpdateProgress = useCallback((newProgress: PlayerData) => {
    setPlayerData(newProgress);
    gameService.savePlayerData(newProgress);
  }, []);

  const handleLogout = useCallback(() => {
    gameService.logout();
    setPlayerData(null);
    setLoginError(null);
    setIsLoading(false);
    // Refresh content URLs in case admin changed them
    loadContentUrls();
  }, [loadContentUrls]);
  
  const handleStartJourney = useCallback(() => {
    if (playerData) {
      const updatedData = { ...playerData, storySeen: true };
      setPlayerData(updatedData);
      gameService.savePlayerData(updatedData);
    }
  }, [playerData]);

  const renderContent = () => {
    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen text-yellow-400 font-cinzel text-2xl">Carregando a jornada...</div>;
    }
    if (!playerData) {
      return <LoginScreen onLogin={handleLogin} error={loginError} isLoading={isLoading} />;
    }
    if (playerData.isAdmin) {
      return <AdminDashboard onLogout={handleLogout} />;
    }
    if (!playerData.storySeen) {
      return <WelcomeScreen onStartJourney={handleStartJourney} storytellingUrl={storytellingUrl} welcomeBackgroundUrl={welcomeBgUrl} />;
    }
    return (
      <GameScreen 
        playerData={playerData} 
        onUpdateProgress={handleUpdateProgress} 
        onLogout={handleLogout} 
        storytellingUrl={storytellingUrl}
      />
    );
  };
  
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen antialiased bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url('${mainBgUrl}')` }}>
      <div className="min-h-screen bg-black bg-opacity-70 backdrop-blur-sm">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;