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

const formatSupabaseError = (error: any, context: string): string => {
    console.error(`Supabase error (${context}):`, error);
    if (error && typeof error.message === 'string') {
        if (error.message.includes('Failed to fetch')) {
            return `Não foi possível conectar à fortaleza de dados. Verifique sua conexão com a internet ou se o serviço de backend está ativo (pode estar em modo de suspensão por inatividade).`;
        }
        return `Erro na fortaleza de dados: ${error.message}`;
    }
    return `Ocorreu um erro desconhecido na fortaleza de dados durante: ${context}.`;
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

const login = async (name: string, password: string): Promise<{ data: PlayerData | null; error: string | null; }> => {
  if (supabaseInitializationError) {
    return { data: null, error: supabaseInitializationError };
  }
  if (!name || !password) return { data: null, error: 'Nome e senha são obrigatórios.' };

  try {
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

      if (error && error.code !== 'PGRST116') {
        return { data: null, error: formatSupabaseError(error, 'login') };
      }

      if (data && data.password === password) {
          loggedInData = data.player_data as unknown as PlayerData;
      }
    }
    
    if (loggedInData) {
      // Session management remains in localStorage for simplicity
      const sessionData = { name: loggedInData.name, isAdmin: loggedInData.isAdmin, isTester: loggedInData.isTester };
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(sessionData));
      return { data: loggedInData, error: null };
    } else {
      localStorage.removeItem(LOGGED_IN_USER_KEY);
      return { data: null, error: null }; // Indicates wrong credentials but not a network error
    }
  } catch(error) {
      return { data: null, error: formatSupabaseError(error, 'login') };
  }
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

const getPlayerData = async (name: string): Promise<{ data: PlayerData | null; error: string | null }> => {
    if (supabaseInitializationError) {
        return { data: null, error: supabaseInitializationError };
    }
    try {
        const { data, error } = await supabase!
            .from('players')
            .select('player_data')
            .eq('name_lowercase', name.toLowerCase())
            .single();
        
        if (error && error.code !== 'PGRST116') {
            return { data: null, error: formatSupabaseError(error, 'busca de dados do guerreiro') };
        }

        const playerData = data ? (data.player_data as unknown as PlayerData) : null;
        return { data: playerData, error: null };
    } catch (error) {
        return { data: null, error: formatSupabaseError(error, 'busca de dados do guerreiro') };
    }
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
  
  try {
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase!
      .from('players')
      .select('id')
      .eq('name_lowercase', nameLowercase)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows found, which is good
      return { success: false, message: formatSupabaseError(checkError, 'verificação de guerreiro') };
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
      return { success: false, message: formatSupabaseError(insertError, 'criação de guerreiro') };
    }

    return { success: true, message: `Guerreiro ${name} criado com sucesso!` };
  } catch (error) {
      return { success: false, message: formatSupabaseError(error, 'criação de guerreiro') };
  }
};

const updateUser = async (payload: { originalName: string; newName: string; newPassword?: string; newFeedback: string }): Promise<{ success: boolean, message: string }> => {
    if (supabaseInitializationError) return { success: false, message: supabaseInitializationError };
    const { originalName, newName, newPassword, newFeedback } = payload;
    if (!newName) return { success: false, message: "O nome não pode estar vazio." };

    const originalKey = originalName.toLowerCase();
    const newKey = newName.toLowerCase();
    
    try {
        // Check if new name is already taken
        if (originalKey !== newKey) {
            const { data: existingUser, error: checkError } = await supabase!
                .from('players')
                .select('id')
                .eq('name_lowercase', newKey)
                .single();
            if (checkError && checkError.code !== 'PGRST116') {
                 return { success: false, message: formatSupabaseError(checkError, 'verificação de nome') };
            }
            if (existingUser) {
                return { success: false, message: `O nome '${newName}' já está em uso.` };
            }
        }

        // Fetch current player data to update it
        const { data, error: fetchError } = await supabase!.from('players').select('player_data').eq('name_lowercase', originalKey).single();
        if (fetchError || !data) {
            return { success: false, message: formatSupabaseError(fetchError, `busca de ${originalName}`) || `Guerreiro ${originalName} não encontrado.`};
        }
        
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
            return { success: false, message: formatSupabaseError(updateError, 'atualização de guerreiro') };
        }

        const loggedInUser = getLoggedInUser();
        if(loggedInUser && loggedInUser.name === originalName) {
            const sessionData = { ...loggedInUser, name: newName };
            localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(sessionData));
        }
        return { success: true, message: "Guerreiro atualizado com sucesso!" };
    } catch (error) {
        return { success: false, message: formatSupabaseError(error, 'atualização de guerreiro') };
    }
}

const savePlayerData = async (playerData: PlayerData): Promise<void> => {
  if (supabaseInitializationError) {
      console.error(supabaseInitializationError);
      return;
  }
  if (playerData.isAdmin || playerData.isTester) return;

  try {
      const { error } = await supabase!
        .from('players')
        .update({ player_data: playerData as any })
        .eq('name_lowercase', playerData.name.toLowerCase());

      if (error) {
          console.error("Error saving player data to Supabase:", formatSupabaseError(error, 'salvamento de progresso'));
      }
  } catch (error) {
      console.error("Error saving player data to Supabase:", formatSupabaseError(error, 'salvamento de progresso'));
  }
};

const getAllPlayersData = async (): Promise<{ data: PlayerData[] | null; error: string | null }> => {
    if (supabaseInitializationError) {
        return { data: null, error: supabaseInitializationError };
    }
    try {
        const { data, error } = await supabase!
          .from('players')
          .select('player_data');

        if (error) {
            return { data: null, error: formatSupabaseError(error, 'busca de todos os guerreiros') };
        }
        
        const players = data
            .map(p => p.player_data as unknown as PlayerData)
            .filter(p => p && p.name)
            .sort((a, b) => a.name.localeCompare(b.name));
        
        return { data: players, error: null };
    } catch (error) {
        return { data: null, error: formatSupabaseError(error, 'busca de todos os guerreiros') };
    }
};

const getFullPlayerData = async (name: string): Promise<{ data: any | null; error: string | null }> => {
    if (supabaseInitializationError) {
        return { data: null, error: supabaseInitializationError };
    }
    try {
        const { data, error } = await supabase!
            .from('players')
            .select('player_data, password')
            .eq('name_lowercase', name.toLowerCase())
            .single();
        
        if (error && error.code !== 'PGRST116') {
            return { data: null, error: formatSupabaseError(error, `busca de dados de invocação para ${name}`) };
        }

        if (!data) {
            return { data: null, error: null };
        }

        const fullData = {
            ...(data.player_data as unknown as PlayerData),
            password: data.password
        };
        return { data: fullData, error: null };
    } catch(error) {
        return { data: null, error: formatSupabaseError(error, `busca de dados de invocação para ${name}`) };
    }
};

const getPlayerPasswords = async (): Promise<{ data: Record<string, string> | null, error: string | null }> => {
    if (supabaseInitializationError) {
        return { data: null, error: supabaseInitializationError };
    }
    try {
        const { data, error } = await supabase!
          .from('players')
          .select('name, password');
        
        if (error) {
            return { data: null, error: formatSupabaseError(error, 'busca de senhas') };
        }

        const passwords: Record<string, string> = {};
        data.forEach(p => {
            if (p.password) {
                passwords[p.name] = p.password;
            }
        });
        return { data: passwords, error: null };
    } catch (error) {
        return { data: null, error: formatSupabaseError(error, 'busca de senhas') };
    }
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
        const errorMessage = formatSupabaseError(error, 'invocação');
        return { success: false, message: `Código de invocação inválido ou corrompido. Detalhes: ${errorMessage}` };
    }
};

const deleteUser = async (name: string): Promise<{ success: boolean; message: string }> => {
  if (supabaseInitializationError) return { success: false, message: supabaseInitializationError };
  
  const nameLowercase = name.toLowerCase();
  
  try {
      const { error } = await supabase!
        .from('players')
        .delete()
        .eq('name_lowercase', nameLowercase);

      if (error) {
        return { success: false, message: formatSupabaseError(error, 'exclusão de guerreiro') };
      }

      return { success: true, message: `Guerreiro ${name} excluído com sucesso.` };
  } catch (error) {
      return { success: false, message: formatSupabaseError(error, 'exclusão de guerreiro') };
  }
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