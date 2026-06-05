import { useParams, useNavigate } from 'react-router-dom';
import { specialists, services } from '../data/mockData';
import { ChevronLeft, Star, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function SpecialistSelect() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === serviceId);
  const availableSpecialists = specialists.filter(s => serviceId && s.servicesOffered.includes(serviceId));

  if (!service) return null;

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md px-6 pt-12 pb-4 sticky top-0 z-20 shadow-sm border-b border-gray-200/50">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 hover:bg-white rounded-full transition shadow-sm border border-gray-100 bg-white">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Select Specialist</h1>
            <p className="text-xs text-slate-500 font-medium">{service.name}</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-12 flex flex-col space-y-4 pb-24 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-6">
        {availableSpecialists.length > 0 ? (
          availableSpecialists.map((spec, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={spec.id}
              onClick={() => navigate(`/book/${service.id}/${spec.id}/calendar`)}
              className="bg-white/80 backdrop-blur-md rounded-[28px] p-5 shadow-sm hover:shadow-md border border-gray-100 active:scale-[0.98] transition cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-rose-gold/20 p-1 ring-2 ring-rose-gold/20 flex-shrink-0">
                  <img src={spec.imageUrl} alt={spec.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{spec.name}</h3>
                  <p className="text-slate-500 text-xs mb-1">{spec.role} • {spec.experience}</p>
                  <div className="flex items-center gap-1 text-accent-pink">
                    <Star size={12} className="fill-current" />
                    <span className="text-xs font-bold text-slate-600">{spec.rating}</span>
                    <span className="text-xs text-slate-400">({spec.reviewsCount})</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <ChevronRight size={16} className="text-primary" />
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 bg-[#F8F9FC] border border-gray-100 p-3 rounded-2xl">{spec.about}</p>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-slate-500 py-12">
            No specialists available for this service right now.
          </div>
        )}
      </div>
    </div>
  );
}
