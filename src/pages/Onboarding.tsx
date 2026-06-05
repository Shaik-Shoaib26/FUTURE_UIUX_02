import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Scissors, Sparkles, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

const slides = [
  {
    title: 'Find Top Specialists',
    description: 'Discover the best hair and beauty specialists in your area.',
    icon: Scissors,
  },
  {
    title: 'Book with Ease',
    description: 'Schedule appointments instantly from your phone 24/7.',
    icon: Sparkles,
  },
  {
    title: 'Self-care Simplified',
    description: 'Manage bookings, payments, and rewards all in one place.',
    icon: Heart,
  },
];

export function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="flex bg-white w-full max-w-md md:max-w-2xl md:rounded-[40px] md:shadow-2xl mx-auto min-h-[100dvh] md:min-h-[80vh] relative flex-col">
      <div className="flex justify-end p-6">
        <button
          onClick={() => navigate('/auth')}
          className="text-slate-400 font-medium hover:text-slate-700 transition"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center w-full"
          >
            <div className="w-64 h-64 bg-primary-50 rounded-full flex items-center justify-center mb-12 relative">
              <div className="absolute inset-0 bg-primary-100 rounded-full blur-2xl opacity-50 blur-xl"></div>
              {(() => {
                const Icon = slides[current].icon;
                return <Icon size={80} className="text-primary z-10" strokeWidth={1} />;
              })()}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{slides[current].title}</h2>
            <p className="text-slate-500 text-lg">{slides[current].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 flex items-center justify-between">
        <div className="flex space-x-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current ? "w-8 bg-primary" : "w-2 bg-slate-200"
              )}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition hover:scale-105 active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
