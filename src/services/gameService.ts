import { PlayerData } from '../types';
import { supabase, supabaseInitializationError } from '../supabaseClient';

const LOGGED_IN_USER_KEY = 'rpg_soft_skills_logged_in_user_session';

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
  mentorFeedback: '',
  taskFeedback: {},
});

const login = async (name: string, password: string): Promise<PlayerData | null> => {
  if (supabaseInitializationError) {
    console.error(supabaseInitializationError);
    return null;
  }
  if (!name || !password) return null;

  let loggedInData: PlayerData | null = null;

  // Admin and Tester login remains local for now
  if (name.toUpperCase() === ADMIN_USER.name) {
    if (password === ADMIN_USER.password) {
      loggedInData = { name: ADMIN_USER.name, isAdmin: true, progress: {} };
    }
  } else if (name.toUpperCase() === TESTER_USER.name) {
    if (password === TESTER_USER.password) {
        loggedInData = { ...createInitialPlayerData(TESTER_USER.name, true) };
    }
  } else {
    // Regular player login now uses Supabase
    const { data, error } = await supabase!
      .from('players')
      .select('password, player_data')
      .eq('name_lowercase', name.toLowerCase())
      .single();

    if (error) {
      console.error('Supabase login error:', error);
      return null;
    }

    if (data && data.password === password) {
        loggedInData = data.player_data as unknown as PlayerData;
    }
  }
  
  if (loggedInData) {
    // Session management remains in localStorage for simplicity
    const sessionData = { name: loggedInData.name, isAdmin: loggedInData.isAdmin, isTester: loggedInData.isTester };
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(sessionData));
  } else {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
  }

  return loggedInData;
};

const logout = (): void => {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
};

const getLoggedInUser = (): Partial<PlayerData> | null => {
    try {
        const userJson = localStorage.getItem(LOGGED_IN_USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
        console.error("Failed to get logged in user session:", error);
        logout();
        return null;
    }
};

const getPlayerData = async (name: string): Promise<PlayerData | null> => {
    if (supabaseInitializationError) {
        console.error(supabaseInitializationError);
        return null;
    }
    const { data, error } = await supabase!
        .from('players')
        .select('player_data')
        .eq('name_lowercase', name.toLowerCase())
        .single();
    
    if (error) {
        console.error('Supabase getPlayerData error:', error);
        return null;
    }

    return data ? (data.player_data as unknown as PlayerData) : null;
}

const createUser = async (name: string, password: string): Promise<{ success: boolean; message: string }> => {
  if (supabaseInitializationError) return { success: false, message: supabaseInitializationError };
  if (!name || !password) {
    return { success: false, message: 'Nome e senha são obrigatórios.' };
  }
  if (name.toUpperCase() === ADMIN_USER.name || name.toUpperCase() === TESTER_USER.name) {
    return { success: false, message: 'Este nome é reservado.' };
  }
  
  const nameLowercase = name.toLowerCase();

  // Check if user already exists
  const { data: existingUser, error: checkError } = await supabase!
    .from('players')
    .select('id')
    .eq('name_lowercase', nameLowercase)
    .single();

  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows found, which is good
    console.error('Error checking for existing user:', checkError);
    return { success: false, message: `Erro ao verificar guerreiro: ${checkError.message}` };
  }

  if (existingUser) {
    return { success: false, message: 'Um guerreiro com este nome já existe.' };
  }
  
  const initialData = createInitialPlayerData(name);
  const { error: insertError } = await supabase!.from('players').insert({
    name: name,
    name_lowercase: nameLowercase,
    password: password,
    player_data: initialData as any,
  });

  if (insertError) {
    console.error('Error creating user:', insertError);
    return { success: false, message: `Falha ao criar guerreiro no banco de dados: ${insertError.message}` };
  }

  return { success: true, message: `Guerreiro ${name} criado com sucesso!` };
};

const updateUser = async (payload: { originalName: string; newName: string; newPassword?: string; newFeedback: string }): Promise<{ success: boolean, message: string }> => {
    if (supabaseInitializationError) return { success: false, message: supabaseInitializationError };
    const { originalName, newName, newPassword, newFeedback } = payload;
    if (!newName) return { success: false, message: "O nome não pode estar vazio." };

    const originalKey = originalName.toLowerCase();
    const newKey = newName.toLowerCase();
    
    // Check if new name is already taken
    if (originalKey !== newKey) {
        const { data: existingUser, error: checkError } = await supabase!
            .from('players')
            .select('id')
            .eq('name_lowercase', newKey)
            .single();
        if (checkError && checkError.code !== 'PGRST116') {
             return { success: false, message: `Erro ao verificar nome: ${checkError.message}` };
        }
        if (existingUser) {
            return { success: false, message: `O nome '${newName}' já está em uso.` };
        }
    }

    // Fetch current player data to update it
    const { data, error: fetchError } = await supabase!.from('players').select('player_data').eq('name_lowercase', originalKey).single();
    if (fetchError || !data) {
        return { success: false, message: `Guerreiro ${originalName} não encontrado.`};
    }
    
    // FIX: Cast to unknown first to satisfy TypeScript's strict type checking.
    const playerData = data.player_data as unknown as PlayerData;
    playerData.name = newName;
    playerData.mentorFeedback = newFeedback;
    
    const updatePayload: any = {
        name: newName,
        name_lowercase: newKey,
        player_data: playerData,
    };
    if (newPassword) {
        updatePayload.password = newPassword;
    }

    const { error: updateError } = await supabase!
        .from('players')
        .update(updatePayload)
        .eq('name_lowercase', originalKey);

    if (updateError) {
        console.error('Error updating user:', updateError);
        return { success: false, message: `Erro ao atualizar guerreiro: ${updateError.message}` };
    }

    const loggedInUser = getLoggedInUser();
    if(loggedInUser && loggedInUser.name === originalName) {
        const sessionData = { ...loggedInUser, name: newName };
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(sessionData));
    }
    return { success: true, message: "Guerreiro atualizado com sucesso!" };
}

const savePlayerData = async (playerData: PlayerData): Promise<void> => {
  if (supabaseInitializationError) {
      console.error(supabaseInitializationError);
      return;
  }
  if (playerData.isAdmin || playerData.isTester) return;

  const { error } = await supabase!
    .from('players')
    .update({ player_data: playerData as any })
    .eq('name_lowercase', playerData.name.toLowerCase());

  if (error) {
      console.error("Error saving player data to Supabase:", error);
  }
};

const getAllPlayersData = async (): Promise<PlayerData[]> => {
    if (supabaseInitializationError) {
        console.error(supabaseInitializationError);
        return [];
    }
    const { data, error } = await supabase!
      .from('players')
      .select('player_data');

    if (error) {
        console.error("Error fetching all players data:", error);
        return [];
    }
    
    // FIX: Filter out null/malformed player_data entries to prevent crashes during rendering.
    return data
        .map(p => p.player_data as unknown as PlayerData)
        .filter(p => p && p.name) // Ensures the player object and its name exist
        .sort((a, b) => a.name.localeCompare(b.name));
};

const getFullPlayerData = async (name: string): Promise<any | null> => {
    if (supabaseInitializationError) {
        console.error(supabaseInitializationError);
        return null;
    }
    const { data, error } = await supabase!
        .from('players')
        .select('player_data, password')
        .eq('name_lowercase', name.toLowerCase())
        .single();
    
    if (error) {
        console.error(`Error fetching full data for ${name}:`, error);
        return null;
    }

    // Replicate the old structure for invocation logic
    // FIX: Cast to unknown first to satisfy TypeScript's strict type checking.
    const fullData = data.player_data as unknown as PlayerData;
    return { ...fullData, password: data.password };
};

const getPlayerPasswords = async (): Promise<Record<string, string>> => {
    if (supabaseInitializationError) {
        console.error(supabaseInitializationError);
        return {};
    }
    const { data, error } = await supabase!
      .from('players')
      .select('name, password');
    
    if (error) {
        console.error("Error fetching player passwords:", error);
        return {};
    }

    const passwords: Record<string, string> = {};
    data.forEach(p => {
        if (p.password) {
            passwords[p.name] = p.password;
        }
    });
    return passwords;
};

const invokePlayer = async (code: string): Promise<{ success: boolean; message: string }> => {
    if (supabaseInitializationError) return { success: false, message: supabaseInitializationError };
    try {
        const decodedJson = decodeURIComponent(escape(atob(code)));
        const playerDataWithPassword = JSON.parse(decodedJson);

        if (!playerDataWithPassword || !playerDataWithPassword.name || !playerDataWithPassword.password) {
            throw new Error("Dados essenciais do guerreiro ausentes.");
        }
        
        const { password, ...playerData } = playerDataWithPassword;

        const { error } = await supabase!.from('players').upsert({
            name: playerData.name,
            name_lowercase: playerData.name.toLowerCase(),
            password: password,
            player_data: playerData as any,
        }, {
            onConflict: 'name_lowercase',
        });

        if (error) throw error;
        
        return { success: true, message: 'Guerreiro invocado com sucesso! Use suas credenciais para entrar na jornada.' };
    } catch (error) {
        console.error("Falha na invocação:", error);
        const errorMessage = (error instanceof Error) ? error.message : 'Erro desconhecido';
        return { success: false, message: `Código de invocação inválido ou corrompido. Detalhes: ${errorMessage}` };
    }
};

const deleteUser = async (name: string): Promise<{ success: boolean; message: string }> => {
  if (supabaseInitializationError) return { success: false, message: supabaseInitializationError };
  
  const nameLowercase = name.toLowerCase();

  const { error } = await supabase!
    .from('players')
    .delete()
    .eq('name_lowercase', nameLowercase);

  if (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: `Erro ao excluir guerreiro: ${error.message}` };
  }

  return { success: true, message: `Guerreiro ${name} excluído com sucesso.` };
};

export const gameService = {
  login,
  logout,
  getLoggedInUser,
  getPlayerData,
  createUser,
  updateUser,
  savePlayerData,
  getAllPlayersData,
  getPlayerPasswords,
  getFullPlayerData,
  invokePlayer,
  deleteUser,
  ADMIN_USER,
};