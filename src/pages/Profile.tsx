import { useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

export function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout } = useStore();

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-[#F4EBFF]/70 backdrop-blur-md pt-12 pb-24 px-6 md:px-12 rounded-b-[40px] relative border-b border-[#E9D5FF]/60">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Profile</h1>
        
        <div className="text-slate-800">
          <h2 className="text-xl font-bold">{currentUser?.name ?? 'Sarah Jenkins'}</h2>
          <p className="text-slate-500 text-sm">{currentUser?.email ?? 'sarah@example.com'}</p>
        </div>
      </div>

      <div className="px-6 md:px-12 -mt-12 relative z-10 space-y-4 pb-24 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-6 md:items-start">
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-[#FBF2FF]/90 backdrop-blur-md rounded-[28px] shadow-sm hover:shadow-md border border-[#E9D5FF] overflow-hidden">
          <ProfileLink icon={User} title="Edit Profile" onClick={() => navigate('/profile/edit')} />
          <div className="h-px bg-slate-50 mx-6"></div>
          <ProfileLink icon={CreditCard} title="Payment Methods" onClick={() => navigate('/profile/payments')} />
          <div className="h-px bg-slate-50 mx-6"></div>
          <ProfileLink icon={Settings} title="Settings" onClick={() => navigate('/profile/settings')} />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#FBF2FF]/90 backdrop-blur-md rounded-[28px] shadow-sm hover:shadow-md border border-[#E9D5FF] overflow-hidden">
          <ProfileLink icon={HelpCircle} title="Help Center" onClick={() => navigate('/help-center')} />
          <div className="h-px bg-slate-50 mx-6"></div>
          <ProfileLink icon={Bell} title="Notifications" onClick={() => navigate('/notifications')} />
        </motion.div>

        <motion.button 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          onClick={() => { logout(); navigate('/auth'); }}
          className="w-full bg-[#FBF2FF]/90 backdrop-blur-md rounded-[28px] shadow-sm hover:shadow-md border border-[#E9D5FF] overflow-hidden p-5 flex items-center justify-between text-rose-500 active:scale-95 transition"
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
    <div onClick={onClick} className="flex items-center justify-between p-5 hover:bg-[#F3E8FF] transition cursor-pointer active:bg-[#E9D5FF]/40">
      <div className="flex items-center space-x-3 text-slate-700">
        <Icon size={20} className="text-slate-400" />
        <span className="font-medium text-sm">{title}</span>
      </div>
      <ChevronRight size={18} className="text-slate-300" />
    </div>
  );
}
