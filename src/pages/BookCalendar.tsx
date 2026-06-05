import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays, startOfToday } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export function BookCalendar() {
  const { serviceId, specialistId } = useParams();
  const navigate = useNavigate();
  
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = Array.from({ length: 14 }).map((_, i) => addDays(today, i));

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      // Encode date + time string safely
      const dateString = encodeURIComponent(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}`);
      navigate(`/book/${serviceId}/${specialistId}/${dateString}/summary`);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md px-6 pt-12 pb-4 sticky top-0 z-20 border-b border-gray-200/50">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 hover:bg-white rounded-full transition shadow-sm border border-gray-100 bg-white">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Select Date & Time</h1>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">{format(selectedDate, 'MMMM yyyy')}</h2>
        
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar -mx-6 px-6 mb-8 pb-2">
          {dates.map((date, i) => {
            const isSelected = selectedDate.getTime() === date.getTime();
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "min-w-[64px] flex flex-col items-center p-3 rounded-2xl transition-all duration-300",
                  isSelected ? "bg-primary text-white shadow-lg shadow-purple-200" : "bg-white text-slate-600 border border-gray-100 hover:border-primary/30"
                )}
              >
                <span className="text-xs font-medium mb-1">{format(date, 'EEE')}</span>
                <span className="text-xl font-bold">{format(date, 'dd')}</span>
              </button>
            )
          })}
        </div>

        <h2 className="text-lg font-bold text-slate-800 mb-4">Available Times</h2>
        <div className="grid grid-cols-3 gap-3 mb-24">
          {timeSlots.map((time, i) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={i}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-3 rounded-[24px] text-sm font-medium transition-all duration-300",
                  isSelected ? "bg-primary-50 text-primary border-2 border-primary shadow-sm" : "bg-white text-slate-600 border border-gray-100 shadow-sm hover:border-primary/30"
                )}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 md:left-0 max-w-md md:max-w-xl mx-auto p-6 bg-white/90 backdrop-blur-md border-t border-gray-200/50 md:border-none md:bottom-6 md:rounded-[32px] md:shadow-xl z-50"
      >
        <button 
          onClick={handleContinue}
          disabled={!selectedTime}
          className={cn(
            "w-full py-4 rounded-[24px] font-bold shadow-lg transition-all",
            selectedTime ? "bg-gradient-to-r from-primary to-[#8B5CF6] text-white shadow-purple-200 hover:scale-[1.02] active:scale-[0.98]" : "bg-slate-200 text-slate-400 cursor-not-allowed"
          )}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
