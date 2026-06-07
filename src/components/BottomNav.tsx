import { Home, Calendar, Bell, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

export function Navigation() {
  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F8F1FF]/95 backdrop-blur-md border-t border-[#E9D5FF]/60 pb-safe z-50">
        <div className="flex items-center justify-around px-6 py-3">
          <NavItem to="/home" icon={Home} label="Home" />
          <NavItem to="/history" icon={Calendar} label="Bookings" />
          <NavItem to="/notifications" icon={Bell} label="Alerts" />
          <NavItem to="/profile" icon={User} label="Profile" />
        </div>
      </nav>

      {/* Desktop Side Nav */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[#F8F1FF]/95 backdrop-blur-md border-r border-[#E9D5FF]/60 z-50 p-6">
        <div className="flex items-center gap-3 mb-10">
          <Logo compact />
        </div>
        <div className="flex flex-col gap-2">
           <DesktopNavItem to="/home" icon={Home} label="Dashboard" />
           <DesktopNavItem to="/history" icon={Calendar} label="Bookings" />
           <DesktopNavItem to="/notifications" icon={Bell} label="Alerts" />
           <DesktopNavItem to="/profile" icon={User} label="Profile" />
        </div>
      </nav>
    </>
  );
}

function NavItem({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center space-y-1 w-16 transition-colors",
          isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className={cn("p-2 rounded-xl transition-all duration-300", isActive && "bg-primary-50")}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
}

function DesktopNavItem({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300",
          isActive ? "bg-primary text-white shadow-lg shadow-purple-200" : "text-slate-500 hover:bg-[#F3E8FF] hover:text-slate-800"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
          <span className="font-bold text-sm">{label}</span>
        </>
      )}
    </NavLink>
  );
}
