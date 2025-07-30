
import React from 'react';

interface WelcomeScreenProps {
  onStartJourney: () => void;
  storytellingUrl: string;
  welcomeBackgroundUrl: string;
}

const WelcomeScreen = ({ onStartJourney, storytellingUrl, welcomeBackgroundUrl }: WelcomeScreenProps) => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center text-white p-4 bg-gray-900 transition-all duration-1000"
      style={{ backgroundImage: `url('${welcomeBackgroundUrl}')` }}
    >
      <div className="bg-black/70 p-8 sm:p-12 rounded-2xl shadow-2xl text-center backdrop-blur-md border-2 border-yellow-500/30 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold font-cinzel text-yellow-400 tracking-wider mb-6" style={{ textShadow: '0 0 10px rgba(250, 204, 21, 0.5)' }}>
          As Dez Ilhas Sagradas
        </h1>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
          A jornada para dominar as virtudes e restaurar a luz ao Império da Dinastia Han o aguarda. Prepare seu espírito, guerreiro.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href={storytellingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto group relative flex justify-center py-4 px-8 border-2 border-yellow-400 text-lg font-medium rounded-lg text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-yellow-400 transition-all duration-300 ease-in-out font-cinzel transform hover:scale-105"
          >
            Storytelling do Game
          </a>
          
          <button
            onClick={onStartJourney}
            className="w-full md:w-auto group relative flex justify-center py-4 px-8 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-yellow-500 transition-all duration-300 ease-in-out font-cinzel animate-pulse transform hover:scale-105 hover:animate-none"
          >
            O Chamado do Guerreiro
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;