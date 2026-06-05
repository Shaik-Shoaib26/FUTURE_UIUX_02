import { useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

export function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout } = useStore();

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md pt-12 pb-24 px-6 md:px-12 rounded-b-[40px] relative border-b border-gray-200/50">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Profile</h1>
        
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-rose-gold/20 rounded-full p-1 border border-rose-gold/30">
             <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" alt="Sarah" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="text-slate-800">
            <h2 className="text-xl font-bold">{currentUser?.name ?? 'Sarah Jenkins'}</h2>
            <p className="text-slate-500 text-sm">{currentUser?.email ?? 'sarah@example.com'}</p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 -mt-12 relative z-10 space-y-4 pb-24 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-6 md:items-start">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/80 backdrop-blur-md p-5 rounded-[28px] shadow-sm hover:shadow-md border border-gray-100 flex items-center justify-between md:col-span-full">
          <div className="flex items-center space-x-3">
             <div className="w-12 h-12 bg-rose-gold/20 rounded-2xl flex items-center justify-center text-rose-500">
               <Gift size={24} />
             </div>
             <div>
               <h3 className="font-bold text-slate-800 text-sm">Glow Points</h3>
               <p className="text-xs text-slate-500">1,250 available</p>
             </div>
          </div>
          <button className="text-primary text-sm font-bold bg-primary-50 px-4 py-2 rounded-xl">Redeem</button>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white/80 backdrop-blur-md rounded-[28px] shadow-sm hover:shadow-md border border-gray-100 overflow-hidden">
          <ProfileLink icon={User} title="Edit Profile" />
          <div className="h-px bg-slate-50 mx-6"></div>
          <ProfileLink icon={CreditCard} title="Payment Methods" />
          <div className="h-px bg-slate-50 mx-6"></div>
          <ProfileLink icon={Settings} title="Settings" />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/80 backdrop-blur-md rounded-[28px] shadow-sm hover:shadow-md border border-gray-100 overflow-hidden">
          <ProfileLink icon={HelpCircle} title="Help Center" />
          <div className="h-px bg-slate-50 mx-6"></div>
          <ProfileLink icon={Bell} title="Notifications" onClick={() => navigate('/notifications')} />
        </motion.div>

        <motion.button 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          onClick={() => { logout(); navigate('/auth'); }}
          className="w-full bg-white/80 backdrop-blur-md rounded-[28px] shadow-sm hover:shadow-md border border-gray-100 overflow-hidden p-5 flex items-center justify-between text-rose-500 active:scale-95 transition"
        >
          <div className="flex items-center space-x-3">
            <LogOut size={20} />
            <span className="font-bold">Logout</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}

function ProfileLink({ icon: Icon, title, onClick }: { icon: any, title: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center justify-between p-5 hover:bg-slate-50 transition cursor-pointer active:bg-slate-100">
      <div className="flex items-center space-x-3 text-slate-700">
        <Icon size={20} className="text-slate-400" />
        <span className="font-medium text-sm">{title}</span>
      </div>
      <ChevronRight size={18} className="text-slate-300" />
    </div>
  );
}
