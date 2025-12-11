import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'admin' | 'user';
interface AuthState { user?: { name: string; role: Role } }

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({});

  const loginAsUser = () => setAuth({ user: { name: 'Guest', role: 'user' }});
  const loginAsAdmin = () => setAuth({ user: { name: 'Admin', role: 'admin' }});
  const logout = () => setAuth({});

  return (
    <AuthContext.Provider value={{ auth, loginAsUser, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
