import React, { useState } from 'react';
import { gameService } from '../services/gameService';

interface LoginScreenProps {
  onLogin: (name: string, password: string) => void;
  error: string | null;
  isLoading: boolean;
}

const LoginScreen = ({ onLogin, error, isLoading }: LoginScreenProps) => {
  const [view, setView] = useState<'login' | 'importUser'>('login');
  
  // Login State
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // User Import State
  const [importCode, setImportCode] = useState('');
  const [importMessage, setImportMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && password && !isLoading) {
      onLogin(name, password);
    }
  };
  
  const handleImportUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportMessage(null);
    if (!importCode) return;

    const result = gameService.importUserData(importCode);
    setImportMessage({ type: result.success ? 'success' : 'error', text: result.message });
    if (result.success) {
      setImportCode('');
       setTimeout(() => {
        setView('login');
        setImportMessage(null);
      }, 2500);
    }
  };

  const renderLogin = () => (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="name-input" className="sr-only">Nome do Guerreiro</label>
            <input
              id="name-input"
              name="name"
              type="text"
              autoComplete="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-3 border border-gray-600 bg-gray-900 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Nome do Guerreiro"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password-input" className="sr-only">Senha</label>
            <input
              id="password-input"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-3 border border-gray-600 bg-gray-900 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="Palavra Sagrada (senha)"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading || !name || !password}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition duration-150 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Desvendando seu Destino...' : 'Entrar na Jornada'}
          </button>
        </div>
      </form>
       {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
       <div className="pt-4 text-center text-sm text-gray-400">
          <p>
            Primeiro acesso ou novo dispositivo?{' '}
            <button onClick={() => setView('importUser')} className="font-medium text-yellow-400 hover:text-yellow-300">
              Insira seu Código de Invocação
            </button>
          </p>
        </div>
    </>
  );
  
  const renderImportUser = () => (
    <>
      <form className="mt-8 space-y-4" onSubmit={handleImportUserSubmit}>
          <textarea
            value={importCode}
            onChange={(e) => setImportCode(e.target.value)}
            required
            className="appearance-none rounded-md relative block w-full h-24 px-3 py-3 border border-gray-600 bg-gray-900 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Cole o Código de Invocação fornecido pelo Mestre..."
          />
          <button
            type="submit"
            disabled={!importCode}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition disabled:bg-gray-600"
          >
            Invocar Guerreiro
          </button>
      </form>
      {importMessage && <p className={`mt-4 text-center text-sm ${importMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{importMessage.text}</p>}
      <p className="pt-4 text-center text-sm text-gray-400">
        <button onClick={() => setView('login')} className="font-medium text-yellow-400 hover:text-yellow-300">
          &larr; Voltar para o Login
        </button>
      </p>
    </>
  );

  const getTitle = () => {
    switch(view) {
      case 'importUser': return 'Ritual de Invocação';
      default: return 'As Dez Ilhas Sagradas';
    }
  };
  
  const getSubtitle = () => {
    switch(view) {
      case 'importUser': return 'Insira o código secreto para materializar seu guerreiro.';
      default: return 'A Jornada de um Guerreiro Começa';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-2xl border border-yellow-500/30">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-cinzel text-yellow-400 tracking-wider">
            {getTitle()}
          </h1>
          <p className="mt-2 text-gray-300">
            {getSubtitle()}
          </p>
        </div>
        {view === 'login' && renderLogin()}
        {view === 'importUser' && renderImportUser()}
      </div>
    </div>
  );
};

export default LoginScreen;