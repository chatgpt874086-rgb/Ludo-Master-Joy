import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  uid: string;
  username: string;
  mobile: string;
  user_id: string;
  wallet_balance: number;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ludo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('ludo_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ludo_user');
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/user/${user.uid}`);
      const data = await res.json();
      if (data) {
        setUser(data);
        localStorage.setItem('ludo_user', JSON.stringify(data));
      }
    } catch (e) {
      console.error("Failed to refresh user", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
