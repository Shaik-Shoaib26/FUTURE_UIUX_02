import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialMethods = [
  { id: '1', brand: 'Visa', last4: '1248', expiry: '09/26' },
  { id: '2', brand: 'Mastercard', last4: '5290', expiry: '07/27' },
];

export function PaymentMethods() {
  const navigate = useNavigate();
  const [methods, setMethods] = useState(initialMethods);

  const addMethod = () => {
    const nextId = `${methods.length + 1}`;
    setMethods([...methods, { id: nextId, brand: 'New Card', last4: '0000', expiry: '12/30' }]);
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md pt-12 pb-6 px-6 md:px-12 rounded-b-[40px] relative border-b border-gray-200/50">
        <button onClick={() => navigate(-1)} className="text-slate-600 mb-4 text-sm font-medium hover:text-slate-800">
          <ArrowLeft size={18} className="inline-block mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Payment Methods</h1>
        <p className="text-sm text-slate-500 mt-2">View and manage your saved cards for quick checkout.</p>
      </div>

      <div className="px-6 md:px-12 -mt-10 relative z-10 space-y-4 pb-24">
        {methods.map((method, index) => (
          <motion.div key={method.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.05 }} className="bg-white/80 backdrop-blur-md rounded-[28px] shadow-sm border border-gray-100 p-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-800">{method.brand} •••• {method.last4}</div>
              <div className="text-xs text-slate-500">Expires {method.expiry}</div>
            </div>
            <CreditCard size={22} className="text-primary" />
          </motion.div>
        ))}

        <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full rounded-3xl bg-primary text-white py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition" onClick={addMethod}>
          <Plus size={16} /> Add Payment Method
        </motion.button>
      </div>
    </div>
  );
}
