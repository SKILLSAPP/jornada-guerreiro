
import React, { useState } from 'react';
import { PlayerData } from '../../types';

interface PlayerCardProps {
    player: PlayerData;
    password?: string;
    status: { totalScore: number; currentIslandName: string };
    onUpdate: (payload: { originalName: string, newName: string, newPassword?: string, newFeedback: string, customIslandOrder?: number[] }) => void;
    onInvoke: (name: string) => void;
    onDelete: (name: string) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, password, status, onUpdate, onInvoke, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(player.name);
    const [editPassword, setEditPassword] = useState(password || '');
    const [showPassword, setShowPassword] = useState(false);
    const [editFeedback, setEditFeedback] = useState(player.mentorFeedback || '');
    const [editOrder, setEditOrder] = useState(player.customIslandOrder ? player.customIslandOrder.join(', ') : '');

    const handleSave = () => {
        const orderArray = editOrder.split(',')
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n) && n >= 1 && n <= 10);
        
        onUpdate({ 
            originalName: player.name, 
            newName: editName, 
            newPassword: editPassword, 
            newFeedback: editFeedback,
            customIslandOrder: orderArray.length > 0 ? orderArray : undefined
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditName(player.name);
        setEditPassword(password || '');
        setEditFeedback(player.mentorFeedback || '');
        setEditOrder(player.customIslandOrder ? player.customIslandOrder.join(', ') : '');
        setIsEditing(false);
    };

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 transition-all duration-300">
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-grow">
                        {isEditing ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400">Nome do Guerreiro</label>
                                    <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white" placeholder="Nome"/>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400">Palavra Sagrada</label>
                                    <input value={editPassword} onChange={e => setEditPassword(e.target.value)} className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white" placeholder="Senha"/>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="font-semibold text-xl text-yellow-300">{player.name}</h3>
                                {password && (
                                  <div className="flex items-center gap-2 mt-1">
                                      <span className="text-sm text-gray-400">Senha:</span>
                                      <input type={showPassword ? 'text' : 'password'} value={password} readOnly className="text-sm text-gray-300 bg-transparent border-none p-0 w-24"/>
                                      <button onClick={() => setShowPassword(s => !s)} className="text-gray-500 hover:text-gray-300">
                                      {showPassword ? '👁️‍🗨️' : '👁️'}
                                      </button>
                                  </div>
                                )}
                            </div>
                        )}
                    </div>

                    {!isEditing && (
                        <div className="text-left sm:text-right flex-shrink-0">
                            <p className="text-sm text-gray-400">Pontuação: <span className="font-bold text-white">{status.totalScore}</span></p>
                            <p className="text-sm text-gray-400">Estágio: <span className="font-bold text-white">{status.currentIslandName}</span></p>
                        </div>
                    )}

                    <div className="flex items-center gap-2 flex-wrap">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-md">Salvar</button>
                                <button onClick={handleCancel} className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold rounded-md">Cancelar</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md">Editar</button>
                                <button onClick={() => onInvoke(player.name)} className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-md">Invocar</button>
                                <button onClick={() => onDelete(player.name)} className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-md">Excluir</button>
                            </>
                        )}
                    </div>
                </div>
                
                <div className="mt-2 pt-3 border-t border-gray-700/50 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isEditing ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Feedback do Mestre</label>
                                <textarea
                                    value={editFeedback}
                                    onChange={e => setEditFeedback(e.target.value)}
                                    className="w-full h-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white mt-1"
                                    placeholder="Escreva um feedback construtivo..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Ordem das Ilhas (Ex: 3, 1, 2, 4...)</label>
                                <input
                                    type="text"
                                    value={editOrder}
                                    onChange={e => setEditOrder(e.target.value)}
                                    className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white mt-1"
                                    placeholder="IDs separados por vírgula (1 a 10)"
                                />
                                <p className="text-[10px] text-gray-500 mt-1">Se vazio, usará a ordem padrão 1, 2, 3...</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <h4 className="font-semibold text-gray-400 text-sm">Feedback do Mestre:</h4>
                                <p className="text-gray-300 italic whitespace-pre-wrap text-sm mt-1">{player.mentorFeedback || 'Nenhum feedback fornecido.'}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-400 text-sm">Trilha Personalizada:</h4>
                                <p className="text-gray-300 text-sm mt-1">
                                    {player.customIslandOrder && player.customIslandOrder.length > 0 
                                        ? player.customIslandOrder.join(' → ') 
                                        : 'Ordem Padrão (1 → 10)'}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
};

export default PlayerCard;
