import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Apple, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'apple' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/book/confirmation', { replace: true });
    }, 2000);
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
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" opacity="0.1"/><path d="M15.4 17.5c-1 1.4-2.2 2.6-3.8 2.6-1.5 0-2.3-1-4-1-1.8 0-2.6 1-4 1-1.3 0-2.8-1.5-3.8-3C-2 11.2.6 5.8 4 5.8c1.6 0 2.8 1 4 1 1.2 0 3-1.3 4.8-1 2 .4 3.4 1.8 4 3-1.8 1-2.4 3-1 4.8 1 1.6 2.6 2 3.8 2.2-.4 1.4-1.2 2.8-2.2 4.2zM12.8 5.6C12.8 3.5 14.5 2 16.4 2c.2 2-1 4-3 4-.2 0-.4-.2-.6-.4z"/></svg>
              </div>
              <span className="font-medium text-slate-800">Apple Pay</span>
            </div>
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", selectedMethod === 'apple' ? "border-primary" : "border-slate-300")}>
              {selectedMethod === 'apple' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>
        </div>

        {selectedMethod === 'card' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
              <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800" />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                <input type="text" placeholder="MM/YY" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                <input type="text" placeholder="123" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800" />
              </div>
            </div>
          </motion.div>
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
