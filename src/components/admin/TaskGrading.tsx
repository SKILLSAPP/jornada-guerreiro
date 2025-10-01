import React, { useState, useEffect, useCallback } from 'react';
import { PlayerData, Island } from '../../types';
import { gameService } from '../../services/gameService';
import { contentService } from '../../services/contentService';
import PlayerCard from './PlayerCard';

// --- Componente de Modal de Invocação ---
interface InvocationModalProps {
  code: string;
  onClose: () => void;
}

const InvocationModal = ({ code, onClose }: InvocationModalProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Código de Invocação copiado!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl border border-purple-500/50">
        <h3 className="text-2xl font-cinzel text-purple-400 mb-4">Código de Invocação do Guerreiro</h3>
        <p className="text-gray-300 mb-2">Entregue este código ao guerreiro. Ele deve seguir os seguintes passos:</p>
        <ol className="list-decimal list-inside text-gray-400 text-sm mb-4 bg-black/30 p-3 rounded-md">
            <li>Abra o jogo no navegador.</li>
            <li>Na tela de login, clique em "Insira seu Código de Invocação".</li>
            <li>Cole o código abaixo e clique em "Invocar Guerreiro".</li>
            <li>Após a mensagem de sucesso, a tela voltará ao login.</li>
            <li>Use as credenciais fornecidas pelo Mestre para entrar na jornada.</li>
        </ol>
        <textarea
          readOnly
          value={code}
          className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 font-mono text-xs"
        />
        <div className="mt-4 flex gap-4">
          <button onClick={handleCopy} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Copiar Código
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};


export default function UserManagement() {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [passwords, setPasswords] = useState<Record<string, string>>({});
    const [islands, setIslands] = useState<Island[]>([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const [loading, setLoading] = useState(true);
    const [invocationCode, setInvocationCode] = useState<string | null>(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        const playersResult = await gameService.getAllPlayersData();
        if (playersResult.error) {
            setError(playersResult.error);
            setPlayers([]);
        } else {
            setPlayers(playersResult.data || []);
        }
        
        const passwordsResult = await gameService.getPlayerPasswords();
        if (passwordsResult.error) {
            setError(prev => prev ? `${prev}\n${passwordsResult.error}` : passwordsResult.error);
            setPasswords({});
        } else {
            setPasswords(passwordsResult.data || {});
        }

        setIslands(contentService.getIslands());
        setLoading(false);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isCreatingUser) return;
        setIsCreatingUser(true);
        setMessage(null);
        setError(null);
        const result = await gameService.createUser(newUserName, newUserPassword);
        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setNewUserName('');
            setNewUserPassword('');
            await loadData();
        } else {
             setMessage({ type: 'error', text: result.message });
        }
        setIsCreatingUser(false);
        setTimeout(() => setMessage(null), 5000);
    };

    const handleUpdateUser = useCallback(async (updatePayload: { originalName: string, newName: string, newPassword?: string, newFeedback: string }) => {
        const result = await gameService.updateUser(updatePayload);
        setMessage({ type: result.success ? 'success' : 'error', text: result.message });
        if (result.success) {
            await loadData();
        }
        setTimeout(() => setMessage(null), 4000);
    }, [loadData]);
    
    const handleInvoke = useCallback(async (name: string) => {
        const result = await gameService.getFullPlayerData(name);
        if (result.error) {
            setMessage({ type: 'error', text: result.error });
            setTimeout(() => setMessage(null), 4000);
            return;
        }

        if (result.data) {
             try {
                const jsonString = JSON.stringify(result.data);
                // Use a safe Base64 encoding method for UTF-8 characters
                const base64Code = btoa(unescape(encodeURIComponent(jsonString)));
                setInvocationCode(base64Code);
            } catch (error) {
                console.error("Error encoding invocation code:", error);
                setMessage({ type: 'error', text: 'Erro ao gerar o código de invocação. Verifique se o nome do guerreiro contém caracteres especiais.' });
                setTimeout(() => setMessage(null), 4000);
            }
        } else {
            setMessage({ type: 'error', text: `Não foi possível encontrar os dados completos para ${name}.` });
            setTimeout(() => setMessage(null), 4000);
        }
    }, []);

    const handleDeleteUser = useCallback(async (name: string) => {
        const confirmation = window.confirm(`Tem certeza que deseja excluir o guerreiro "${name}"? Esta ação é permanente e não pode ser desfeita.`);
        if (confirmation) {
            setMessage(null);
            const result = await gameService.deleteUser(name);
            setMessage({ type: result.success ? 'success' : 'error', text: result.message });
            if (result.success) {
                await loadData();
            }
            setTimeout(() => setMessage(null), 4000);
        }
    }, [loadData]);

    const getPlayerStatus = useCallback((player: PlayerData) => {
        const totalScore = Object.values(player.progress).reduce((acc, island) => acc + island.score, 0);
        const conqueredIslandsCount = Object.keys(player.progress).filter(id => player.progress[Number(id)].score >= contentService.TOTAL_POINTS_TO_CONQUER).length;
        const currentIslandId = conqueredIslandsCount + 1;
        const currentIsland = islands.find(i => i.id === currentIslandId);
        return {
            totalScore,
            currentIslandName: currentIsland ? currentIsland.name : 'Jornada Concluída'
        };
    }, [islands]);

    return (
        <div className="space-y-8">
            {invocationCode && <InvocationModal code={invocationCode} onClose={() => setInvocationCode(null)} />}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-cinzel text-yellow-400 mb-4">Criar Novo Guerreiro</h2>
              <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label htmlFor="new-user-name" className="block text-sm font-medium text-gray-300 mb-1">Nome do Guerreiro (Login)</label>
                  <input type="text" id="new-user-name" value={newUserName} onChange={e => setNewUserName(e.target.value)} required className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
                <div>
                  <label htmlFor="new-user-password" className="block text-sm font-medium text-gray-300 mb-1">Palavra Sagrada (Senha)</label>
                  <input type="password" id="new-user-password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} required className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
                <button type="submit" disabled={isCreatingUser} className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-wait">{isCreatingUser ? 'Criando...' : 'Criar Guerreiro'}</button>
              </form>
            </div>
            
             {message && <p className={`-my-4 mb-4 text-center text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>}
             
            <div className="space-y-4">
              <h2 className="text-xl font-cinzel text-yellow-400 mb-4">Guerreiros Ativos</h2>
              {loading ? (
                 <p className="text-gray-500 italic text-center p-8">Buscando guerreiros na fortaleza de dados...</p>
              ) : error ? (
                <div className="text-center text-sm p-4 rounded-md bg-red-900/50 text-red-300 border border-red-500/50" dangerouslySetInnerHTML={{ __html: error.replace(/\n/g, '<br />')}}></div>
              ) : players.length > 0 ? (
                players.map(player => {
                  try {
                    const status = getPlayerStatus(player);
                    return (
                      <PlayerCard
                        key={player.name}
                        player={player}
                        password={passwords[player.name]}
                        status={status}
                        onUpdate={handleUpdateUser}
                        onInvoke={handleInvoke}
                        onDelete={handleDeleteUser}
                      />
                    );
                  } catch (error) {
                    console.error(`Failed to render player card for ${player.name}:`, error);
                    return (
                      <div key={player.name} className="bg-red-900/50 p-4 rounded-lg border border-red-500">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div>
                            <h3 className="font-semibold text-xl text-red-300">Erro ao Carregar: {player.name}</h3>
                            <p className="text-red-200 mt-2 text-sm">Os dados deste guerreiro estão corrompidos (provavelmente falta o progresso). Recomenda-se excluir e recriar este guerreiro.</p>
                          </div>
                          <button 
                            onClick={() => handleDeleteUser(player.name)} 
                            className="mt-2 sm:mt-0 px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-md flex-shrink-0"
                          >
                            Excluir Guerreiro
                          </button>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                 <p className="text-gray-500 italic text-center p-8">Nenhum guerreiro foi criado ainda.</p>
              )}
            </div>
        </div>
    );
}