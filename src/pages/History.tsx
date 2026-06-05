import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { services, specialists } from '../data/mockData';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { Calendar, Clock, MapPin, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function History() {
  const { appointments, cancelAppointment } = useStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filteredAppointments = appointments.filter(a => a.status === activeTab).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md pt-12 pb-2 sticky top-0 z-20 shadow-sm border-b border-gray-200/50 md:px-6">
        <h1 className="text-2xl font-bold text-slate-800 px-6 md:px-0 mb-4">Bookings</h1>
        
        <div className="flex px-6 md:px-0 space-x-4">
          {(['upcoming', 'completed', 'cancelled'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-medium capitalize relative transition-colors",
                activeTab === tab ? "text-primary" : "text-slate-400"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-12 flex flex-col space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-6 pb-24">
        <AnimatePresence mode="popLayout">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appt => {
              const service = services.find(s => s.id === appt.serviceId);
              const specialist = specialists.find(s => s.id === appt.specialistId);
              if (!service || !specialist) return null;

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={appt.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-[24px] p-5 shadow-sm border border-gray-100 relative overflow-hidden transition-shadow hover:shadow-md"
                >
                  {appt.status === 'upcoming' && (
                    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                       <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-l-[60px] border-t-primary-50 border-l-transparent"></div>
                       <div className="absolute top-2 right-2 flex flex-col items-center">
                          <Clock size={14} className="text-primary z-10" />
                       </div>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                    <div className="pr-4">
                      <p className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">{format(new Date(appt.date), 'MMM dd, yyyy')}</p>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">{service.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">with {specialist.name}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-3">
                      <div className="flex items-center space-x-1 text-slate-600 text-sm bg-slate-50 px-2 py-1 rounded-md">
                        <Calendar size={14} />
                        <span>{format(new Date(appt.date), 'hh:mm a')}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-600 text-sm bg-slate-50 px-2 py-1 rounded-md">
                        <MapPin size={14} />
                        <span>NYC Studio</span>
                      </div>
                    </div>
                  </div>

                  {appt.status === 'upcoming' && (
                    <div className="flex space-x-3 pt-2">
                       <button className="flex-1 bg-gradient-to-r from-primary to-[#8B5CF6] text-white py-3 rounded-[24px] font-bold text-sm shadow-md shadow-purple-200 hover:scale-[1.02] transition active:scale-95">
                         Reschedule
                       </button>
                       <button 
                        onClick={() => cancelAppointment(appt.id)}
                        className="p-3 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-100 transition active:scale-95 custom-shadow"
                       >
                         <XCircle size={20} />
                       </button>
                    </div>
                  )}
                  {appt.status === 'completed' && (
                    <button className="w-full bg-[#F8F9FC] text-slate-800 py-3 rounded-[24px] font-bold text-sm border border-gray-200 hover:border-gray-300 transition active:scale-95 shadow-sm">
                      Book Again
                    </button>
                  )}
                </motion.div>
              )
            })
          ) : (
            <div className="text-center text-slate-500 py-12 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={24} className="text-slate-400" />
              </div>
              <p>No {activeTab} bookings found.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
