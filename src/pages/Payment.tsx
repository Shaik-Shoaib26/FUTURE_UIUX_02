import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Apple, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useStore } from '../context/StoreContext';

type PaymentState = {
  serviceId: string;
  specialistId: string;
  date: string;
  price: number;
  duration: number;
  customerName: string;
  phoneNumber: string;
  email: string;
};

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, addAppointment } = useStore();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'apple' | 'phonepe' | 'googlepay' | 'paytm' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const pendingAppointment = location.state as PaymentState | null;

  useEffect(() => {
    if (!pendingAppointment) {
      navigate('/home', { replace: true });
    }
  }, [pendingAppointment, navigate]);

  const handlePay = () => {
    if (!pendingAppointment) return;
    setIsProcessing(true);
    setTimeout(() => {
      addAppointment({
        serviceId: pendingAppointment.serviceId,
        specialistId: pendingAppointment.specialistId,
        date: pendingAppointment.date,
        status: 'confirmed',
        price: pendingAppointment.price,
        duration: pendingAppointment.duration,
        customerName: pendingAppointment.customerName,
        phoneNumber: pendingAppointment.phoneNumber,
        email: pendingAppointment.email,
        userEmail: currentUser?.email ?? pendingAppointment.email,
      });
      navigate('/book/confirmation', { replace: true });
    }, 1200);
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-[100dvh]">
      <div className="bg-white px-6 pt-12 pb-4 sticky top-0 z-20 border-b border-slate-100 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 hover:bg-slate-100 rounded-full transition" disabled={isProcessing}>
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Payment</h1>
        </div>
      </div>

      <div className="p-6 md:p-12 mb-32 md:max-w-2xl md:mx-auto w-full flex-1">
        <h2 className="font-bold text-slate-800 mb-4">Select Payment Method</h2>
        
        <div className="space-y-3 mb-8">
          <button 
            onClick={() => setSelectedMethod('card')}
            className={cn("w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all", selectedMethod === 'card' ? "border-primary bg-primary-50" : "border-slate-100 bg-white")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <CreditCard size={20} className="text-slate-700" />
              </div>
              <span className="font-medium text-slate-800">Credit Card</span>
            </div>
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", selectedMethod === 'card' ? "border-primary" : "border-slate-300")}>
              {selectedMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>

          <button 
            onClick={() => setSelectedMethod('apple')}
            className={cn("w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all", selectedMethod === 'apple' ? "border-primary bg-primary-50" : "border-slate-100 bg-white")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-800">
                <Apple size={20} />
              </div>
              <span className="font-medium text-slate-800">Apple Pay</span>
            </div>
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", selectedMethod === 'apple' ? "border-primary" : "border-slate-300")}> 
              {selectedMethod === 'apple' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>

          <button 
            onClick={() => setSelectedMethod('phonepe')}
            className={cn("w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all", selectedMethod === 'phonepe' ? "border-primary bg-primary-50" : "border-slate-100 bg-white")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary font-bold">PP</div>
              <span className="font-medium text-slate-800">PhonePe</span>
            </div>
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", selectedMethod === 'phonepe' ? "border-primary" : "border-slate-300")}> 
              {selectedMethod === 'phonepe' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>

          <button 
            onClick={() => setSelectedMethod('googlepay')}
            className={cn("w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all", selectedMethod === 'googlepay' ? "border-primary bg-primary-50" : "border-slate-100 bg-white")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-700 font-bold">G</div>
              <span className="font-medium text-slate-800">Google Pay</span>
            </div>
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", selectedMethod === 'googlepay' ? "border-primary" : "border-slate-300")}> 
              {selectedMethod === 'googlepay' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>

          <button 
            onClick={() => setSelectedMethod('paytm')}
            className={cn("w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all", selectedMethod === 'paytm' ? "border-primary bg-primary-50" : "border-slate-100 bg-white")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-700 font-bold">PT</div>
              <span className="font-medium text-slate-800">Paytm</span>
            </div>
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", selectedMethod === 'paytm' ? "border-primary" : "border-slate-300")}> 
              {selectedMethod === 'paytm' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>

          <button 
            onClick={() => setSelectedMethod('cash')}
            className={cn("w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all", selectedMethod === 'cash' ? "border-primary bg-primary-50" : "border-slate-100 bg-white")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-700">
                <DollarSign size={20} />
              </div>
              <span className="font-medium text-slate-800">Cash</span>
            </div>
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", selectedMethod === 'cash' ? "border-primary" : "border-slate-300")}> 
              {selectedMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>
        </div>

        {['phonepe', 'googlepay', 'paytm'].includes(selectedMethod) && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
            <p className="text-slate-600 text-sm font-medium">UPI payment selected.</p>
            <p className="text-slate-500 text-sm">Use your UPI app to pay with the QR code or UPI ID below.</p>
            <div className="rounded-2xl bg-slate-50 p-4 text-center text-slate-700">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">UPI ID</p>
              <p className="font-semibold text-slate-800">glownflow@upi</p>
            </div>
          </div>
        )}

        {selectedMethod === 'cash' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
            <p className="text-slate-600 text-sm font-medium">Cash payment selected.</p>
            <p className="text-slate-500 text-sm">Pay cash directly at the salon when you arrive.</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-0 max-w-md md:max-w-xl mx-auto p-6 bg-white/90 backdrop-blur-md border-t border-gray-200/50 md:border-none md:bottom-6 md:rounded-[32px] md:shadow-xl z-50">
        <button 
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 transition hover:bg-primary-600 active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            <span>Pay securely</span>
          )}
        </button>
      </div>
    </div>
  );
}
