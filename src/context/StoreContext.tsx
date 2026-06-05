import React, { createContext, useContext, useState } from 'react';
import { Appointment, mockAppointments } from '../data/mockData';

type StoreContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: `a${Date.now()}` };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'cancelled' } : app))
    );
  };

  return (
    <StoreContext.Provider value={{ appointments, addAppointment, cancelAppointment }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
