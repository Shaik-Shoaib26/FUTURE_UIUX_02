import { motion } from 'motion/react';
import { ArrowLeft, HelpCircle, MessageSquare, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  { id: '1', question: 'How do I reschedule an appointment?', answer: 'Open your booking details and choose a new date or specialist.' },
  { id: '2', question: 'What payment methods are accepted?', answer: 'We accept Visa, Mastercard, and most major debit cards.' },
  { id: '3', question: 'How can I update my account email?', answer: 'Use the Edit Profile screen to change your email address.' },
];

export function HelpCenter() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md pt-12 pb-6 px-6 md:px-12 rounded-b-[40px] relative border-b border-gray-200/50">
        <button onClick={() => navigate(-1)} className="text-slate-600 mb-4 text-sm font-medium hover:text-slate-800">
          <ArrowLeft size={18} className="inline-block mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Help Center</h1>
        <p className="text-sm text-slate-500 mt-2">Find answers, contact support, or review common questions.</p>
      </div>

      <div className="px-6 md:px-12 -mt-10 relative z-10 space-y-4 pb-24">
        {faqs.map((faq, index) => (
          <motion.div key={faq.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.05 }} className="bg-white/80 backdrop-blur-md rounded-[28px] shadow-sm border border-gray-100 p-5">
            <h2 className="font-semibold text-slate-800">{faq.question}</h2>
            <p className="text-sm text-slate-500 mt-2">{faq.answer}</p>
          </motion.div>
        ))}

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/80 backdrop-blur-md rounded-[28px] shadow-sm border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-3 text-slate-700">
            <MessageSquare size={18} className="text-slate-400" />
            <div>
              <p className="font-semibold text-sm">Chat with support</p>
              <p className="text-xs text-slate-500">Tap to email our team for live help.</p>
            </div>
          </div>
          <a href="mailto:support@glowandflow.com" className="block w-full rounded-3xl bg-primary text-white text-center py-3 text-sm font-semibold hover:bg-primary-dark transition">
            Email Support
          </a>

          <div className="flex items-center gap-3 text-slate-700">
            <Phone size={18} className="text-slate-400" />
            <div>
              <p className="font-semibold text-sm">Call us</p>
              <p className="text-xs text-slate-500">Available 9am–6pm Mon–Fri.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
