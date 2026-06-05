import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/mockData';
import { ChevronLeft, Clock, Star, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);

  if (!service) return <div className="p-8 text-center bg-background-app">Service not found</div>;

  return (
    <div className="flex flex-col bg-white min-h-[100dvh] pb-32">
      <div className="relative h-80 w-full">
        <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute top-12 left-6 right-6 flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <ChevronLeft size={24} />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <Heart size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 md:px-12 pt-6 relative -mt-6 bg-white rounded-t-[32px] md:rounded-t-[48px] flex-1">
        <div className="md:max-w-3xl md:mx-auto">
          <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 leading-tight mb-2">{service.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span className="flex items-center space-x-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-slate-700">{service.rating}</span>
                <span>({service.reviewsCount} reviews)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <div className="flex items-center space-x-2 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 flex-1 justify-center">
            <Clock size={20} className="text-primary" />
            <span className="font-medium text-slate-700">{service.duration} mins</span>
          </div>
          <div className="flex items-center space-x-2 bg-primary-50 px-4 py-3 rounded-2xl border border-primary-100 flex-1 justify-center">
            <span className="font-bold text-primary text-lg">${service.price}</span>
          </div>
        </div>

        <div className="mb-24 md:mb-32">
          <h2 className="text-lg font-bold text-slate-800 mb-2">About Service</h2>
          <p className="text-slate-500 leading-relaxed text-sm md:text-base">{service.description}</p>
        </div>
        </div>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 md:left-64 max-w-md md:max-w-none md:w-auto md:mx-12 mx-auto p-6 bg-white/90 backdrop-blur-lg border-t md:border-t-0 md:bottom-6 md:rounded-[32px] md:shadow-2xl border-gray-100 z-50"
      >
        <button 
          onClick={() => navigate(`/book/${service.id}/specialist`)}
          className="w-full md:w-auto md:px-24 bg-gradient-to-r from-primary to-[#8B5CF6] text-white py-4 rounded-[24px] font-bold shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Book Now
        </button>
      </motion.div>
    </div>
  );
}
