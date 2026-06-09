import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, CalendarDays, Users, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

const menuItems = [
  { to: '/admin', label: 'Overview', icon: Home },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/revenue', label: 'Revenue', icon: BarChart3 },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 md:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-72 bg-white shadow-xl rounded-[32px] border border-gray-200 p-6 sticky top-6 h-fit">
            <div className="mb-8">
              <div className="text-primary text-sm uppercase tracking-[0.3em] font-bold mb-2">Glow & Flow Admin</div>
              <h1 className="text-2xl font-bold">Salon Management</h1>
              <p className="text-sm text-slate-500 mt-3">Manage live bookings, customers, revenue and appointment workflows.</p>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        isActive ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    <Icon size={18} className="text-inherit" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-10 rounded-[28px] bg-primary/5 border border-primary/10 p-5 text-sm text-slate-700">
              <h3 className="font-bold text-slate-900 mb-2">Live data synced</h3>
              <p>All bookings are stored in localStorage and your dashboard updates instantly when customers book appointments.</p>
            </motion.div>
          </aside>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
