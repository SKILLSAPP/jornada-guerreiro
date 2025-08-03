import React, { useState } from 'react';

import TaskGrading from './admin/TaskGrading';
import UserManagement from './admin/UserManagement';
import ContentManagement from './admin/ContentManagement';
import QuizManager from './admin/QuizManager';
import ProgressMonitor from './admin/ProgressMonitor';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const tabs = {
      tasks: { label: 'Avaliar Tarefas', Component: TaskGrading },
      progress: { label: 'Posição dos Alunos', Component: ProgressMonitor },
      users: { label: 'Gerenciar Alunos', Component: UserManagement },
      quizzes: { label: 'Gerenciar Quizzes', Component: QuizManager },
      content: { label: 'Gerenciar Conteúdo', Component: ContentManagement },
  };

  const ActiveComponent = tabs[activeTab as keyof typeof tabs].Component;

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-gray-200">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b-2 border-yellow-500/30 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-cinzel text-yellow-400">Painel do Mestre</h1>
          <p className="text-gray-300">Gerencie a jornada de seus guerreiros.</p>
        </div>
        <button 
          onClick={onLogout} 
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors self-start sm:self-center"
        >
          Sair do Modo Mestre
        </button>
      </header>
      
      <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
        {Object.entries(tabs).map(([key, { label }]) => (
            <button 
                key={key}
                onClick={() => setActiveTab(key)} 
                className={`flex-shrink-0 py-2 px-4 font-semibold transition-colors whitespace-nowrap ${activeTab === key ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-300'}`}
            >
                {label}
            </button>
        ))}
      </div>

      <main>
        <ActiveComponent />
      </main>
    </div>
  );
};


export default AdminDashboard;