import React, { useState } from 'react';
import { gameService } from '../services/gameService';

interface LoginScreenProps {
  onLogin: (name: string, password: string) => void;
  error: string | null;
  isLoading: boolean;
}

const LoginScreen = ({ onLogin, error, isLoading }: LoginScreenProps) => {
  const [view, setView] = useState<'login' | 'invoke'>('login');
  
  // States for login form
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // States for invocation form
  const [invocationCode, setInvocationCode] = useState('');
  const [invokeMessage, setInvokeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isInvoking, setIsInvoking] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && password && !isLoading) {
      onLogin(name, password);
    }
  };

  const handleInvokeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invocationCode.trim() || isInvoking) return;

    setIsInvoking(true);
    setInvokeMessage(null);

    const result = await gameService.invokePlayer(invocationCode);
    setInvokeMessage({ type: result.success ? 'success' : 'error', text: result.message });
    setIsInvoking(false);

    if (result.success) {
      setInvocationCode('');
      setTimeout(() => {
        setView('login');
        setInvokeMessage(null);
      }, 3000); // Go back to login after 3s on success
    }
  };
  
  if (view === 'invoke') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-2xl border border-yellow-500/30">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-cinzel text-yellow-400 tracking-wider">
              RITUAL DE INVOCação
            </h1>
            <p className="mt-2 text-gray-300">
              Insira o código secreto para materializar seu guerreiro.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleInvokeSubmit}>
            <textarea
              value={invocationCode}
              onChange={(e) => setInvocationCode(e.target.value)}
              required
              disabled={isInvoking}
              className="appearance-none relative block w-full px-3 py-3 h-32 border border-gray-600 bg-gray-900 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Cole o Código de Invocação fornecido pelo Mestre..."
            />

            <div>
              <button
                type="submit"
                disabled={isInvoking || !invocationCode.trim()}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition duration-150 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {isInvoking ? 'Invocando...' : 'Invocar Guerreiro'}
              </button>
            </div>
          </form>
          {invokeMessage && <p className={`mt-4 text-center text-sm ${invokeMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{invokeMessage.text}</p>}
          <div className="text-center">
            <button onClick={() => setView('login')} className="font-medium text-yellow-500 hover:text-yellow-400">
              &larr; Voltar para o Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Original Login View
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-80 rounded-2xl shadow-2xl border border-yellow-500/30">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-cinzel text-yellow-400 tracking-wider">
            As Dez Ilhas Sagradas
          </h1>
          <p className="mt-2 text-gray-300">
            A Jornada de um Guerreiro Começa
          </p>
        </div>
        
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

        <div className="text-center pt-6 mt-6 border-t border-gray-700/50">
          <p className="text-sm text-gray-400">Primeiro acesso ou novo dispositivo?</p>
          <button onClick={() => setView('invoke')} className="font-medium text-yellow-500 hover:text-yellow-400">
            Insira seu Código de Invocação
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;