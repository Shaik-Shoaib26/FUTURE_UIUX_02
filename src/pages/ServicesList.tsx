import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Search, Star } from 'lucide-react';
import { categories, services } from '../data/mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function ServicesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const fromState = (location.state as any)?.categoryId;
    const fromQuery = new URLSearchParams(location.search).get('category');
    return (fromState ?? fromQuery) || categories[0].id;
  });

  const filteredServices = services.filter(s => s.categoryId === activeTab);

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-[#F4EBFF]/70 px-6 md:px-12 pt-12 pb-4 sticky top-0 z-20 shadow-sm border-b border-[#E9D5FF]/60 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-[#F3E8FF] rounded-full transition">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Our Services</h1>
          <div className="w-10"></div>
        </div>

        <div className="bg-[#FAF5FF] rounded-2xl flex items-center px-4 mb-4 shadow-sm border border-[#E9D5FF] md:max-w-md">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search treatments..." 
            className="flex-1 py-2.5 px-3 bg-transparent focus:outline-none text-slate-700 text-sm"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                activeTab === cat.id ? "bg-primary text-white border-primary shadow-md shadow-primary/20" : "bg-[#FAF5FF] text-slate-600 border-[#E9D5FF] hover:border-primary/50"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-12 flex flex-col space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={service.id}
              onClick={() => navigate(`/services/${service.id}`)}
              className="bg-[#FBF2FF]/90 backdrop-blur-sm rounded-[24px] p-3 shadow-sm border border-[#E9D5FF] flex items-center space-x-4 active:scale-[0.98] transition cursor-pointer hover:shadow-md hover:bg-[#F3E8FF] md:p-5 md:flex-col md:items-start md:space-x-0 cursor-pointer"
            >
              <img src={service.imageUrl} alt={service.name} className="w-24 h-24 rounded-2xl object-cover md:w-full md:h-48 md:mb-4" />
              <div className="flex-1 py-1 pr-2 md:pr-0 md:w-full">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-800 leading-tight text-lg">{service.name}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-3 line-clamp-2">{service.description}</p>
                <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-3">
                  <div className="flex items-center space-x-1 text-slate-500 text-xs">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-slate-700">{service.rating}</span>
                    <span>({service.reviewsCount})</span>
                  </div>
                  <p className="text-primary font-bold">₹{service.price}</p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-slate-500 py-12">
            No services found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
