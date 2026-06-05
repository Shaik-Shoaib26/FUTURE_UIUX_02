import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Star } from 'lucide-react';
import { categories, services, specialists } from '../data/mockData';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

export function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { currentUser } = useStore();

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-md border-b border-gray-200/50 px-6 md:px-12 pt-12 pb-24 rounded-b-[40px] relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-slate-500 text-sm mb-1">Good morning, {currentUser?.name ?? 'Sarah'}</p>
            <h1 className="text-slate-800 text-2xl font-extrabold tracking-tight">Ready to glow?</h1>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex items-center space-x-2 text-slate-500 mb-8 max-w-[200px]">
          <MapPin size={16} />
          <span className="text-sm truncate">Hindupur, Andhra Pradesh</span>
        </div>

        <div className="absolute -bottom-7 left-6 right-6 md:max-w-md md:left-12">
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-2 flex items-center space-x-3 px-4">
            <Search className="text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search services..." 
              className="flex-1 py-2.5 focus:outline-none text-slate-700 bg-transparent text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 mt-14">
        {/* Categories */}
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-slate-800">Categories</h2>
          <button onClick={() => navigate('/services')} className="text-primary text-sm font-medium flex items-center md:hidden">
            See All <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {categories.map((cat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={cat.id} 
              onClick={() => navigate('/services')}
              className="flex flex-col items-center min-w-[80px]"
            >
              <div className="w-16 h-16 bg-white rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-center mb-2 active:scale-95 transition hover:shadow-md">
                <span className="text-2xl font-bold text-primary">{cat.name.charAt(0)}</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{cat.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Popular Services */}
        <div className="mt-8 mb-4 flex justify-between items-end">
          <h2 className="text-xl font-bold text-slate-800">Popular Services</h2>
        </div>
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:space-x-0 md:gap-6">
          {services.map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              key={service.id}
              onClick={() => navigate(`/services/${service.id}`)}
              className="min-w-[240px] md:min-w-0 bg-white rounded-[28px] p-4 border border-gray-100 shadow-sm active:scale-95 transition hover:shadow-md cursor-pointer"
            >
              <div className="w-full h-32 rounded-2xl overflow-hidden mb-3 relative">
                <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center space-x-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">{service.rating}</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-800 mb-1 truncate">{service.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm">{service.duration} min</p>
                <p className="text-primary font-bold">${service.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Specialists */}
        <div className="mt-8 mb-4 flex justify-between items-end">
          <h2 className="text-xl font-bold text-slate-800">Top Specialists</h2>
        </div>
        <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-6 mb-4">
          {specialists.slice(0, 3).map((spec) => (
            <div key={spec.id} className="bg-white rounded-[28px] p-5 flex items-center space-x-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full bg-rose-gold/20 p-1 ring-2 ring-rose-gold/20 flex-shrink-0">
                <img src={spec.imageUrl} alt={spec.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{spec.name}</h3>
                <p className="text-slate-400 text-xs mb-1">{spec.role}</p>
                <div className="flex items-center gap-1 text-accent-pink">
                  <Star size={12} className="fill-current" />
                  <span className="text-xs font-bold text-slate-600">{spec.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
