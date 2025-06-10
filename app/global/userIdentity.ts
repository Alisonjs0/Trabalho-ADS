// src/stores/userStore.ts
import { create } from 'zustand';

interface User {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    cargo: string;
    senha: string | null;
    setor: string | null;
}

interface UserState {
    user: User | null;
    setUser: (userData: User) => void; 
    clearUser: () => void;
}


export const useUserStore = create<UserState>((set) => ({
    user: null,

    setUser: (newUserData) => {
        set({ user: newUserData });
    },
    
    clearUser: () => {
        set({ user: null });
    },
}));