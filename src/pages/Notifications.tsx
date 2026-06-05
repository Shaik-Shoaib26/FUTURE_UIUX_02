import { useState } from 'react';
import { Calendar, Tag, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockNotifications = [
  { id: '1', title: 'Upcoming Appointment', body: 'Your hair coloring with Elena is tomorrow at 10:00 AM.', type: 'booking', time: '2 hours ago', read: false },
  { id: '2', title: '20% Off Spa Sessions', body: 'Flash sale! Book any spa session this weekend and get 20% off.', type: 'promo', time: '1 day ago', read: true },
  { id: '3', title: 'Booking Confirmed', body: 'Your facial with Marcus is confirmed for Oct 12.', type: 'success', time: '3 days ago', read: true },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'booking': return <Calendar size={18} className="text-primary" />;
      case 'promo': return <Tag size={18} className="text-rose-500" />;
      case 'success': return <CheckCircle size={18} className="text-success" />;
      default: return <Calendar size={18} className="text-primary" />;
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md pt-12 pb-4 sticky top-0 z-20 shadow-sm px-6 md:px-12 border-b border-gray-200/50">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Alerts</h1>
          <button onClick={markAllRead} className="text-sm text-primary font-medium hover:underline">Mark all read</button>
        </div>
      </div>

      <div className="p-6 md:p-12 flex flex-col space-y-3 pb-24">
        <AnimatePresence>
          {notifications.map((n, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={n.id}
              className={`bg-white/80 backdrop-blur-md rounded-[24px] p-4 shadow-sm border border-gray-100 flex items-start space-x-4 relative overflow-hidden transition-shadow hover:shadow-md ${!n.read ? 'ring-1 ring-primary/20' : ''}`}
            >
              {!n.read && <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-primary to-[#8B5CF6]"></div>}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!n.read ? 'bg-primary-50' : 'bg-[#F8F9FC]'}`}>
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <h3 className={`text-sm ${!n.read ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>{n.title}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed">{n.body}</p>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{n.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
