import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appointment } from '../data/mockData';

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthResult = {
  success: boolean;
  message: string;
};

type StoreContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
  currentUser: { name: string; email: string } | null;
  login: (email: string, password: string) => AuthResult;
  signup: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const USERS_KEY = 'glownflow_users';
const CURRENT_USER_KEY = 'glownflow_current_user';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: `a${Date.now()}` };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'cancelled' } : app))
    );
  };

  const login = (email: string, password: string): AuthResult => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      return { success: false, message: 'No account found for this email. Please sign up.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }
    setCurrentUser({ name: user.name, email: user.email });
    return { success: true, message: 'Login successful.' };
  };

  const signup = (name: string, email: string, password: string): AuthResult => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'This email is already registered. Please login instead.' };
    }
    const newUser: User = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({ name: newUser.name, email: newUser.email });
    return { success: true, message: 'Account created successfully.' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <StoreContext.Provider
      value={{
        appointments,
        addAppointment,
        cancelAppointment,
        currentUser,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
