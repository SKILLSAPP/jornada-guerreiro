

import React, { useState, useEffect, useCallback } from 'react';
import { PlayerData, Island } from '../../types';
import { gameService } from '../../services/gameService';
import { contentService } from '../../services/contentService';
import PlayerCard from './PlayerCard';

export default function UserManagement() {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [usersWithPasswords, setUsersWithPasswords] = useState<{ [key: string]: string }>({});
    const [islands, setIslands] = useState<Island[]>([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    const loadData = useCallback(() => {
        setPlayers(gameService.getAllPlayersData());
        setUsersWithPasswords(gameService.getUsersWithPasswords());
        setIslands(contentService.getIslands());
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        const result = gameService.createUser(newUserName, newUserPassword);
        setMessage({ type: result.success ? 'success' : 'error', text: result.message });
        if (result.success) {
            setNewUserName('');
            setNewUserPassword('');
            loadData();
        }
        setTimeout(() => setMessage(null), 4000);
    };

    const handleUpdateUser = useCallback((updatePayload: { originalName: string, newName: string, newPassword: string, newFeedback: string }) => {
        const result = gameService.updateUser(updatePayload);
        setMessage({ type: result.success ? 'success' : 'error', text: result.message });
        if (result.success) {
            loadData();
        }
        setTimeout(() => setMessage(null), 4000);
    }, [loadData]);
    
    const handleDeleteUser = useCallback((name: string) => {
        const result = gameService.deleteUser(name);
        setMessage({ type: result.success ? 'success' : 'error', text: result.message });
        if (result.success) {
            loadData();
        }
        setTimeout(() => setMessage(null), 4000);
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
                <button type="submit" className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors">Criar Guerreiro</button>
              </form>
              {message && <p className={`mt-4 text-center text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-cinzel text-yellow-400 mb-4">Guerreiros Ativos</h2>
              {players.length > 0 ? (
                players.map(player => (
                  <PlayerCard
                    key={player.name}
                    player={player}
                    password={usersWithPasswords[player.name] || ''}
                    status={getPlayerStatus(player)}
                    onUpdate={handleUpdateUser}
                    onDelete={handleDeleteUser}
                  />
                ))
              ) : (
                 <p className="text-gray-500 italic text-center p-8">Nenhum guerreiro foi criado ainda.</p>
              )}
            </div>
        </div>
    );
}