import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Bell, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Settings() {
  const navigate = useNavigate();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(true);

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md pt-12 pb-6 px-6 md:px-12 rounded-b-[40px] relative border-b border-gray-200/50">
        <button onClick={() => navigate(-1)} className="text-slate-600 mb-4 text-sm font-medium hover:text-slate-800">
          <ArrowLeft size={18} className="inline-block mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-2">Customize how Glow N Flow works for you.</p>
      </div>

      <div className="px-6 md:px-12 -mt-10 relative z-10 space-y-4 pb-24">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/80 backdrop-blur-md rounded-[28px] shadow-sm border border-gray-100 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-700">
              <ShieldCheck size={18} className="text-slate-400" />
              <div>
                <p className="font-semibold text-sm">Push notifications</p>
                <p className="text-xs text-slate-500">Receive updates about appointments and offers.</p>
              </div>
            </div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition"></div>
              <span className="ml-3 text-sm text-slate-600">{pushNotifications ? 'On' : 'Off'}</span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-700">
              <Bell size={18} className="text-slate-400" />
              <div>
                <p className="font-semibold text-sm">Email updates</p>
                <p className="text-xs text-slate-500">Get email reminders and special announcements.</p>
              </div>
            </div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" checked={emailUpdates} onChange={() => setEmailUpdates(!emailUpdates)} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition"></div>
              <span className="ml-3 text-sm text-slate-600">{emailUpdates ? 'On' : 'Off'}</span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-700">
              <Sparkles size={18} className="text-slate-400" />
              <div>
                <p className="font-semibold text-sm">Special offers</p>
                <p className="text-xs text-slate-500">Receive personalised deals and promotions.</p>
              </div>
            </div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" checked={specialOffers} onChange={() => setSpecialOffers(!specialOffers)} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition"></div>
              <span className="ml-3 text-sm text-slate-600">{specialOffers ? 'On' : 'Off'}</span>
            </label>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
