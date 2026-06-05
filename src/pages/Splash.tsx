import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex bg-gradient-to-br from-primary-600 to-primary-500 w-full max-w-md md:max-w-2xl md:rounded-[40px] md:shadow-2xl mx-auto min-h-[100dvh] md:min-h-[80vh] relative overflow-hidden flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center text-white"
      >
        <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-md mb-6 shadow-2xl">
          <Sparkles size={64} className="text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Glow & Flow</h1>
        <p className="text-primary-100 font-medium">Premium Salon & Spa</p>
      </motion.div>
    </div>
  );
}
