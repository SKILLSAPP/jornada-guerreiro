import React, { useState } from 'react';
import { PlayerData } from '../../types';
import { gameService } from '../../services/gameService';

interface PlayerCardProps {
    player: PlayerData;
    password: string;
    status: { totalScore: number; currentIslandName: string };
    onUpdate: (payload: { originalName: string, newName: string, newPassword: string, newFeedback: string }) => void;
    onDelete: (name: string) => void;
}

const InvocationCodeModal = ({ code, onClose }: { code: string; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-lg border border-yellow-500/50">
            <h3 className="text-xl font-cinzel text-yellow-400 mb-4">Código de Invocação</h3>
            <p className="text-gray-300 mb-4 text-sm">Envie este código ao guerreiro. Ele usará este código uma única vez na tela de login para configurar sua conta.</p>
            <textarea
                readOnly
                value={code}
                className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 font-mono text-xs"
            />
            <div className="mt-4 flex gap-4">
                <button 
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
                >
                    Copiar Código
                </button>
                <button 
                    onClick={onClose} 
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    Fechar
                </button>
            </div>
        </div>
    </div>
);


export default function PlayerCard({ player, password, status, onUpdate, onDelete }: PlayerCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(player.name);
    const [editPassword, setEditPassword] = useState(password);
    const [showPassword, setShowPassword] = useState(false);
    const [editFeedback, setEditFeedback] = useState(player.mentorFeedback || '');
    const [invocationCode, setInvocationCode] = useState<string | null>(null);


    const handleSave = () => {
        onUpdate({ originalName: player.name, newName: editName, newPassword: editPassword, newFeedback: editFeedback });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditName(player.name);
        setEditPassword(password);
        setEditFeedback(player.mentorFeedback || '');
        setIsEditing(false);
    };

    const handleGenerateCode = () => {
        const code = gameService.exportUserData(player.name);
        setInvocationCode(code);
    };
    
    return (
        <>
            {invocationCode && <InvocationCodeModal code={invocationCode} onClose={() => setInvocationCode(null)} />}
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 transition-all duration-300">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="flex-grow">
                            {isEditing ? (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input value={editName} onChange={e => setEditName(e.target.value)} className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white" placeholder="Nome"/>
                                    <input value={editPassword} onChange={e => setEditPassword(e.target.value)} className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white" placeholder="Senha"/>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="font-semibold text-xl text-yellow-300">{player.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-400">Senha:</span>
                                        <input type={showPassword ? 'text' : 'password'} value={password} readOnly className="text-sm text-gray-300 bg-transparent border-none p-0 w-24"/>
                                        <button onClick={() => setShowPassword(s => !s)} className="text-gray-500 hover:text-gray-300">
                                        {showPassword ? '👁️‍🗨️' : '👁️'}
                                        </button>
                                    </div>
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
                                    <button onClick={handleGenerateCode} className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-md">Invocar</button>
                                    <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md">Editar</button>
                                    <button onClick={() => {
                                        if (window.confirm(`Tem certeza que deseja remover o guerreiro ${player.name}? Esta ação é permanente.`)) {
                                            onDelete(player.name)
                                        }
                                    }} className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm font-semibold rounded-md">Excluir</button>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-2 pt-3 border-t border-gray-700/50">
                        {isEditing ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Feedback do Mestre</label>
                                <textarea
                                    value={editFeedback}
                                    onChange={e => setEditFeedback(e.target.value)}
                                    className="w-full h-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white mt-1"
                                    placeholder="Escreva um feedback construtivo..."
                                />
                            </div>
                        ) : (
                            <div>
                                <h4 className="font-semibold text-gray-400 text-sm">Feedback do Mestre:</h4>
                                <p className="text-gray-300 italic whitespace-pre-wrap text-sm mt-1">{player.mentorFeedback || 'Nenhum feedback fornecido.'}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}