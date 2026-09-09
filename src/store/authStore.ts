import { useEffect, useState } from 'react';
import i18n from '../locales/i18n';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  is_superadmin?: boolean;
}

interface AuthState {
  user: User | null;
  language: 'en' | 'fr' | 'rw';
}

let state: AuthState = {
  user: null,
  language: (localStorage.getItem('impacto_lang') as any) || 'en',
};

const listeners = new Set<() => void>();

export const useAuthStore = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const updateUserLanguage = (lng: 'en' | 'fr' | 'rw') => {
    state.language = lng;
    localStorage.setItem('impacto_lang', lng);
    i18n.changeLanguage(lng);
    listeners.forEach((l) => l());
  };

  const setUser = (user: User | null) => {
    state.user = user;
    listeners.forEach((l) => l());
  };

  return {
    user: state.user,
    language: state.language,
    updateUserLanguage,
    setUser,
  };
};
