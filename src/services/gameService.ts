import { PlayerData } from '../types';
import { REVOKED_USERS } from '../constants';

const USERS_KEY = 'rpg_soft_skills_users';
const PLAYER_DATA_PREFIX = 'playerData_';
const LOGGED_IN_USER_KEY = 'rpg_soft_skills_logged_in_user';

const ADMIN_USER = {
  name: 'MENTOR',
  password: 'mestre',
};

const TESTER_USER = {
  name: 'ADMINISTRADOR',
  password: 'desbloqueado',
};

const createInitialPlayerData = (name: string, isTester = false): PlayerData => ({
  name: name,
  progress: {},
  storySeen: false,
  isAdmin: false,
  isTester,
  mentorFeedback: ''
});

const login = async (name: string, password: string): Promise<PlayerData | null> => {
  if (!name || !password) {
    return null;
  }

  let loggedInData: PlayerData | null = null;

  // Admin Login
  if (name.toUpperCase() === ADMIN_USER.name) {
    if (password === ADMIN_USER.password) {
      loggedInData = { name: ADMIN_USER.name, isAdmin: true, progress: {} };
    }
  } else if (name.toUpperCase() === TESTER_USER.name) {
    if (password === TESTER_USER.password) {
        loggedInData = createInitialPlayerData(TESTER_USER.name, true);
    }
  } else {
    // Check against the Master's Edict (Revoked Users List)
    if (REVOKED_USERS.map(u => u.toUpperCase()).includes(name.toUpperCase())) {
      console.warn(`Acesso negado para o usuário revogado: ${name}`);
      return null; // Access denied by the Master
    }

    // Regular User Login
    const usersString = localStorage.getItem(USERS_KEY);
    const users = usersString ? JSON.parse(usersString) : {};
    const playerDataKey = `${PLAYER_DATA_PREFIX}${name}`;

    if (users[name] && users[name] === password) {
        const savedData = localStorage.getItem(playerDataKey);
        loggedInData = savedData ? JSON.parse(savedData) : createInitialPlayerData(name);
        if (!savedData) {
            localStorage.setItem(playerDataKey, JSON.stringify(loggedInData));
        }
    }
  }
  
  if (loggedInData) {
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(loggedInData));
  } else {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
  }

  return loggedInData;
};

const logout = (): void => {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
};

const getLoggedInUser = (): PlayerData | null => {
    try {
        const userJson = localStorage.getItem(LOGGED_IN_USER_KEY);
        if (!userJson) return null;
        
        const userData: PlayerData = JSON.parse(userJson);
        
        // Re-fetch the latest data to ensure it's not stale
        if (userData.isAdmin || userData.isTester) {
            return userData;
        }
        
        const playerDataKey = `${PLAYER_DATA_PREFIX}${userData.name}`;
        const latestDataJson = localStorage.getItem(playerDataKey);
        return latestDataJson ? JSON.parse(latestDataJson) : null;

    } catch (error) {
        console.error("Failed to get logged in user:", error);
        logout(); // Clear potentially corrupted data
        return null;
    }
};

const createUser = (name: string, password: string): { success: boolean; message: string } => {
  if (!name || !password) {
    return { success: false, message: 'Nome e senha são obrigatórios.' };
  }

  const usersString = localStorage.getItem(USERS_KEY);
  const users = usersString ? JSON.parse(usersString) : {};

  if (users[name]) {
    return { success: false, message: 'Um guerreiro com este nome já existe.' };
  }
   if (name.toUpperCase() === ADMIN_USER.name || name.toUpperCase() === TESTER_USER.name) {
    return { success: false, message: 'Este nome é reservado.' };
  }

  // Register new user
  users[name] = password;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Create initial player data
  const initialData = createInitialPlayerData(name);
  const playerDataKey = `${PLAYER_DATA_PREFIX}${name}`;
  localStorage.setItem(playerDataKey, JSON.stringify(initialData));

  return { success: true, message: `Guerreiro ${name} criado com sucesso!` };
};

const updateUser = ({ originalName, newName, newPassword, newFeedback }: { originalName: string; newName: string; newPassword: string; newFeedback: string }): { success: boolean, message: string } => {
    if (!newName || !newPassword) {
        return { success: false, message: "Nome e senha não podem estar vazios." };
    }

    const usersString = localStorage.getItem(USERS_KEY);
    const users = usersString ? JSON.parse(usersString) : {};
    
    // Check if the new name is already taken by another user
    if (newName !== originalName && users[newName]) {
        return { success: false, message: `O nome '${newName}' já está em uso por outro guerreiro.` };
    }

    // Get old player data
    const oldPlayerDataKey = `${PLAYER_DATA_PREFIX}${originalName}`;
    const playerDataString = localStorage.getItem(oldPlayerDataKey);
    if (!playerDataString) {
        return { success: false, message: `Não foi possível encontrar os dados do guerreiro ${originalName}.` };
    }
    const playerData: PlayerData = JSON.parse(playerDataString);

    // Update the users object
    delete users[originalName];
    users[newName] = newPassword;
    
    // Update player data object with new name and feedback
    playerData.name = newName;
    playerData.mentorFeedback = newFeedback;

    // Save updated users and player data
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.removeItem(oldPlayerDataKey);
    localStorage.setItem(`${PLAYER_DATA_PREFIX}${newName}`, JSON.stringify(playerData));
    
    // If the updated user was the one logged in, update their session
    const loggedInUser = getLoggedInUser();
    if(loggedInUser && loggedInUser.name === originalName) {
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(playerData));
    }


    return { success: true, message: "Guerreiro atualizado com sucesso!" };
};

const deleteUser = (name: string): { success: boolean, message: string } => {
    const usersString = localStorage.getItem(USERS_KEY);
    const users = usersString ? JSON.parse(usersString) : {};

    if (!users[name]) {
        return { success: false, message: "Guerreiro não encontrado." };
    }

    // Delete from users list
    delete users[name];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Delete player data
    localStorage.removeItem(`${PLAYER_DATA_PREFIX}${name}`);
    
    // If the deleted user was the one logged in, log them out
    const loggedInUser = getLoggedInUser();
    if (loggedInUser && loggedInUser.name === name) {
        logout();
    }
    
    return { success: true, message: `Guerreiro ${name} removido com sucesso.` };
};

const getUsersWithPasswords = (): { [name: string]: string } => {
    const usersString = localStorage.getItem(USERS_KEY);
    return usersString ? JSON.parse(usersString) : {};
};


const savePlayerData = (playerData: PlayerData): void => {
  if (playerData.isAdmin || playerData.isTester) return; // Do not save admin data/progress
  const playerDataKey = `${PLAYER_DATA_PREFIX}${playerData.name}`;
  localStorage.setItem(playerDataKey, JSON.stringify(playerData));

  // Also update the logged-in user data to keep it in sync
  const loggedInUser = getLoggedInUser();
  if (loggedInUser && loggedInUser.name === playerData.name) {
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(playerData));
  }
};

const getAllPlayersData = (): PlayerData[] => {
  const players: PlayerData[] = [];
  const usersString = localStorage.getItem(USERS_KEY);
  const users = usersString ? JSON.parse(usersString) : {};
  
  for (const name in users) {
      if (name.toUpperCase() !== ADMIN_USER.name) {
         const playerDataKey = `${PLAYER_DATA_PREFIX}${name}`;
         const dataString = localStorage.getItem(playerDataKey);
         if (dataString) {
            try {
                players.push(JSON.parse(dataString));
            } catch (e) {
                console.error(`Error parsing player data for key ${playerDataKey}`, e);
            }
         }
      }
  }
  return players.sort((a, b) => a.name.localeCompare(b.name));
};

const exportUserData = (name: string): string => {
    const usersString = localStorage.getItem(USERS_KEY);
    const users = usersString ? JSON.parse(usersString) : {};
    const password = users[name];

    const playerDataKey = `${PLAYER_DATA_PREFIX}${name}`;
    const dataString = localStorage.getItem(playerDataKey);

    if (password && dataString) {
        const payload = {
            user: { name, password },
            data: JSON.parse(dataString)
        };
        // Encode to Base64 to make it a clean, single string for copy-pasting
        return btoa(JSON.stringify(payload));
    }
    // Return a specific error string if data is missing, so the UI can handle it.
    return "ERRO: Não foi possível encontrar todos os dados para este guerreiro. Sincronize e tente novamente.";
};

const importUserData = (encodedString: string): { success: boolean, message: string } => {
    try {
        const decoded = atob(encodedString);
        const payload = JSON.parse(decoded);

        if (!payload.user || !payload.user.name || !payload.user.password || !payload.data) {
            throw new Error("Formato de código inválido.");
        }

        const { name, password } = payload.user;

        const usersString = localStorage.getItem(USERS_KEY);
        const users = usersString ? JSON.parse(usersString) : {};

        if (users[name]) {
            return { success: false, message: `Guerreiro '${name}' já existe neste computador.` };
        }

        // Add user to users list
        users[name] = password;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        // Save player data
        const playerDataKey = `${PLAYER_DATA_PREFIX}${name}`;
        localStorage.setItem(playerDataKey, JSON.stringify(payload.data));

        return { success: true, message: `Guerreiro '${name}' invocado com sucesso! Você já pode fazer o login.` };

    } catch (error: any) {
        console.error("Falha ao importar dados:", error);
        return { success: false, message: `Código de invocação inválido ou corrompido. (${error.message})` };
    }
};

export const gameService = {
  login,
  logout,
  getLoggedInUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersWithPasswords,
  savePlayerData,
  getAllPlayersData,
  exportUserData,
  importUserData,
  ADMIN_USER
};