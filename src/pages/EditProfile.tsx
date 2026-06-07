import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Phone, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah@example.com');
  const [phone, setPhone] = useState('+1 555 0132');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Profile updated successfully');
    navigate('/profile');
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white/40 backdrop-blur-md pt-12 pb-6 px-6 md:px-12 rounded-b-[40px] relative border-b border-gray-200/50">
        <button onClick={() => navigate(-1)} className="text-slate-600 mb-4 text-sm font-medium hover:text-slate-800">
          <ArrowLeft size={18} className="inline-block mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
        <p className="text-sm text-slate-500 mt-2">Update your name, email, and contact details.</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 md:px-12 -mt-10 relative z-10 space-y-4 pb-24">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/80 backdrop-blur-md rounded-[28px] shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center space-x-3 text-slate-700">
            <User size={20} className="text-slate-400" />
            <label className="font-medium text-sm">Full Name</label>
          </div>
          <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />

          <div className="flex items-center space-x-3 text-slate-700">
            <Mail size={20} className="text-slate-400" />
            <label className="font-medium text-sm">Email</label>
          </div>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />

          <div className="flex items-center space-x-3 text-slate-700">
            <Phone size={20} className="text-slate-400" />
            <label className="font-medium text-sm">Phone</label>
          </div>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />

          <button type="submit" className="w-full rounded-3xl bg-primary text-white py-3 text-sm font-semibold hover:bg-primary-dark transition">
            Save Changes
          </button>
        </motion.div>
      </form>
    </div>
  );
}
