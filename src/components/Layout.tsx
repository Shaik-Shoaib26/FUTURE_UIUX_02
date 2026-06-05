import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './BottomNav';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function AppLayout() {
  const location = useLocation();
  const showNav = ['/home', '/history', '/notifications', '/profile'].includes(location.pathname);

  return (
    <div className="mx-auto w-full md:max-w-7xl bg-background-app text-slate-800 min-h-[100dvh] relative shadow-2xl overflow-hidden flex flex-col md:flex-row hide-scrollbar font-sans md:border-x border-gray-200/50">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] bg-primary blur-[120px] rounded-full opacity-10"></div>
        <div className="absolute top-[60%] -right-[5%] w-[500px] h-[500px] bg-rose-gold blur-[150px] rounded-full opacity-20"></div>
      </div>

      {showNav && <Navigation />}

      <div className={cn("flex-1 overflow-y-auto hide-scrollbar pb-24 md:pb-0 relative z-10 w-full", showNav && "md:ml-64")}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
