import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Calendar, MapPin, Share2, Home } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { services, specialists } from '../data/mockData';
import { format } from 'date-fns';

export function Confirmation() {
  const navigate = useNavigate();
  const { bookings } = useStore();

  const latestAppt = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  const serviceName = latestAppt?.serviceName || services.find((s) => s.id === latestAppt?.serviceId)?.name;
  const specialistName = latestAppt?.specialistName || specialists.find((s) => s.id === latestAppt?.specialistId)?.name;

  useEffect(() => {
    if (!latestAppt) {
      navigate('/home');
    }
  }, [latestAppt, navigate]);

  if (!latestAppt) return null;

  return (
    <div className="flex flex-col bg-primary min-h-[100dvh] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[50%] bg-primary-500 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[40%] bg-primary-600 rounded-full blur-[80px] opacity-70"></div>
      </div>

      <div className="flex-1 flex flex-col p-6 items-center justify-center relative z-10 text-white mt-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6 relative"
        >
          <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
          <Check size={48} className="text-success" strokeWidth={3} />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-primary-100 text-center mb-10">Your appointment has been successfully scheduled.</p>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full md:max-w-md bg-white rounded-3xl p-6 shadow-xl text-slate-800"
        >
          <p className="text-sm text-slate-400 font-medium mb-1">Booking ID: {latestAppt.bookingId ?? latestAppt.id}</p>
          <h2 className="text-xl font-bold mb-6 pb-4 border-b border-slate-100">{serviceName}</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="text-primary opacity-70" size={20} />
              <div>
                <p className="font-bold text-slate-800">{format(new Date(latestAppt.date), 'EEEE, MMM dd')}</p>
                <p className="text-xs text-slate-500">{latestAppt.time || format(new Date(latestAppt.date), 'hh:mm a')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-primary opacity-70" size={20} />
              <div>
                <p className="font-bold text-slate-800">{specialistName}</p>
                <p className="text-xs text-slate-500">{latestAppt.email}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-slate-100">
            <button className="flex-1 bg-slate-50 text-slate-700 py-3 rounded-xl text-sm font-bold flex flex-col justify-center items-center active:scale-95 transition">
              <Calendar size={18} className="mb-1" />
              Add to Calendar
            </button>
            <button className="flex-1 bg-slate-50 text-slate-700 py-3 rounded-xl text-sm font-bold flex flex-col justify-center items-center active:scale-95 transition">
              <Share2 size={18} className="mb-1" />
              Share
            </button>
          </div>
        </motion.div>
      </div>

      <div className="p-6 relative z-10 w-full mb-8 md:max-w-md mx-auto">
        <button 
          onClick={() => navigate('/home')}
          className="w-full bg-white text-primary py-4 rounded-2xl font-bold shadow-lg hover:bg-white/90 active:scale-[0.98] transition flex items-center justify-center space-x-2"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}
