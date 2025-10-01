import React, { useState, useCallback, useEffect } from 'react';
import { PlayerData } from './types';
import { gameService } from './services/gameService';
import { contentService } from './services/contentService';
import LoginScreen from './components/LoginScreen';
import GameScreen from './components/GameScreen';
import WelcomeScreen from './components/WelcomeScreen';
import AdminDashboard from './components/AdminDashboard';
import { supabaseInitializationError } from './supabaseClient';
import { geminiInitializationError } from './services/geminiService';

const ErrorDisplay = ({ title, message }: { title: string; message: string }) => (
    <div className="flex items-center justify-center min-h-screen text-white p-4">
        <div className="bg-red-900/50 p-8 rounded-lg border border-red-500 max-w-2xl text-center shadow-2xl">
            <h1 className="text-3xl font-cinzel text-red-300 mb-4">{title}</h1>
            <p className="text-red-200 whitespace-pre-wrap">{message}</p>
            <p className="mt-6 text-sm text-gray-400">Por favor, verifique a configuração do ambiente (geralmente um arquivo .env) e recarregue a página.</p>
        </div>
    </div>
);


function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  const mainBgUrl = contentService.getMainBackgroundUrl();
  const welcomeBgUrl = contentService.getWelcomeBackgroundUrl();
  const storytellingUrl = contentService.getStorytellingUrl();

  useEffect(() => {
    const checkSession = async () => {
        if (supabaseInitializationError || geminiInitializationError) {
             setIsLoading(false);
             return;
        }
        const sessionUser = gameService.getLoggedInUser();
        if (sessionUser) {
            if (sessionUser.isAdmin) {
                setPlayerData({ name: sessionUser.name, isAdmin: true, progress: {} });
            } else if (sessionUser.isTester) {
                // Construct a valid PlayerData object for testers on session restore
                setPlayerData({ 
                    name: sessionUser.name, 
                    isTester: true, 
                    progress: {},
                    storySeen: true,
                });
            } else {
                const result = await gameService.getPlayerData(sessionUser.name);
                if (result.error) {
                    console.error("Failed to restore session:", result.error);
                    gameService.logout(); // Clear bad session
                    setLoginError(result.error);
                    setPlayerData(null);
                } else {
                    setPlayerData(result.data);
                }
            }
        }
        setIsLoading(false);
    };
    checkSession();
  }, []);

  const handleLogin = useCallback(async (name: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);
    const result = await gameService.login(name, password);
    
    if (result.error) {
        setLoginError(result.error);
    } else if (result.data) {
        setPlayerData(result.data);
    } else {
        const adminName = gameService.ADMIN_USER.name;
        const errorMsg = name.toUpperCase() === adminName.toUpperCase()
            ? 'Senha do Mestre incorreta.'
            : 'Guerreiro não encontrado ou senha incorreta.';
        setLoginError(errorMsg);
    }
    
    setIsLoading(false);
  }, []);

  const handleUpdateProgress = useCallback(async (newProgress: PlayerData) => {
    setPlayerData(newProgress);
    await gameService.savePlayerData(newProgress);
  }, []);

  const handleLogout = useCallback(() => {
    gameService.logout();
    setPlayerData(null);
    setLoginError(null);
    setIsLoading(false);
  }, []);
  
  const handleStartJourney = useCallback(async () => {
    if (playerData) {
      const updatedData = { ...playerData, storySeen: true };
      setPlayerData(updatedData);
      await gameService.savePlayerData(updatedData);
    }
  }, [playerData]);
  
  const renderContent = () => {
    if (supabaseInitializationError) {
        return <ErrorDisplay title="Erro na Conexão com a Fortaleza de Dados" message={supabaseInitializationError} />;
    }
    if (geminiInitializationError) {
        return <ErrorDisplay title="Erro na Conexão com os Espíritos Sábios" message={geminiInitializationError} />;
    }

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