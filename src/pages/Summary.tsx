import { useParams, useNavigate } from 'react-router-dom';
import { services, specialists } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { format, parse } from 'date-fns';

export function Summary() {
  const { serviceId, specialistId, date } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === serviceId);
  const specialist = specialists.find(s => s.id === specialistId);

  if (!service || !specialist || !date) return null;

  const decodedDateParts = decodeURIComponent(date).split('T');
  const datePart = decodedDateParts[0];
  const timePart = decodedDateParts[1] || '09:00 AM';
  const dateTime = parse(`${datePart} ${timePart}`, 'yyyy-MM-dd hh:mm a', new Date());
  const displayTime = format(dateTime, 'hh:mm a');

  const handlePayment = () => {
    navigate('/book/payment', {
      state: {
        serviceId: service.id,
        specialistId: specialist.id,
        date: dateTime.toISOString(),
        price: service.price,
      },
    });
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md px-6 pt-12 pb-4 sticky top-0 z-20 border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 hover:bg-white rounded-full transition shadow-sm border border-gray-100 bg-white">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Booking Summary</h1>
        </div>
      </div>

      <div className="p-6 md:p-12 md:max-w-2xl md:mx-auto w-full flex-1 overflow-y-auto pb-32">
        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 shadow-xl shadow-purple-900/5 border border-gray-100 mb-6">
          <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-slate-100">
            <img src={service.imageUrl} alt={service.name} className="w-20 h-20 rounded-2xl object-cover" />
            <div>
              <h3 className="font-bold text-slate-800">{service.name}</h3>
              <p className="text-primary font-bold mt-1">${service.price}</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span className="flex items-center"><Clock size={16} className="mr-2 text-slate-400" /> {service.duration} mins</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 shadow-xl shadow-purple-900/5 border border-gray-100 mb-6">
          <h3 className="font-bold text-slate-800 mb-4">Appointment Details</h3>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 mt-1">
              <img src={specialist.imageUrl} className="w-full h-full rounded-full object-cover" alt="" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Specialist</p>
              <p className="font-bold text-slate-800">{specialist.name}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary">
              <CalendarIcon size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Date & Time</p>
              <p className="font-bold text-slate-800">{format(dateTime, 'EEEE, MMM dd, yyyy')} at {displayTime}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Location</p>
              <p className="font-bold text-slate-800">Hindupur, Andhra Pradesh</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 shadow-xl shadow-purple-900/5 border border-gray-100">
          <h3 className="font-bold text-slate-800 mb-4">Payment Summary</h3>
          <div className="flex justify-between text-slate-600 mb-2 text-sm">
            <span>Subtotal</span>
            <span className="font-medium text-slate-800">${service.price}</span>
          </div>
          <div className="flex justify-between text-slate-600 mb-4 text-sm pb-4 border-b border-slate-100">
            <span>Taxes & Fees</span>
            <span className="font-medium text-slate-800">$5.00</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-slate-800">
            <span>Total</span>
            <span className="text-primary">${service.price + 5}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-0 max-w-md md:max-w-xl mx-auto p-6 bg-white/90 backdrop-blur-md border-t border-gray-200/50 md:border-none md:bottom-6 md:rounded-[32px] md:shadow-xl z-50">
        <button 
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-primary to-[#8B5CF6] text-white py-4 rounded-[24px] font-bold shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
