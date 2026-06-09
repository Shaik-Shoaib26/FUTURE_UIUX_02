import { useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { calculateRevenue } from '../../lib/bookingService';
import { BarChart3, CalendarDays, Wallet, TrendingUp } from 'lucide-react';

export function AdminRevenue() {
  const { bookings } = useStore();
  const revenue = useMemo(() => calculateRevenue(bookings), [bookings]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-2">Admin Revenue</p>
        <h1 className="text-3xl font-bold text-slate-900">Revenue Analytics</h1>
        <p className="mt-2 text-slate-500 max-w-2xl">Revenue totals and performance metrics generated from live booking records.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-6">
            <span className="uppercase text-xs tracking-[0.3em] font-bold">Today</span>
            <CalendarDays size={20} />
          </div>
          <p className="text-4xl font-bold text-slate-900">₹{revenue.today.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Revenue captured from today's bookings.</p>
        </div>

        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-6">
            <span className="uppercase text-xs tracking-[0.3em] font-bold">Weekly</span>
            <Wallet size={20} />
          </div>
          <p className="text-4xl font-bold text-slate-900">₹{revenue.weekly.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Revenue earned in the current week.</p>
        </div>

        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-6">
            <span className="uppercase text-xs tracking-[0.3em] font-bold">Monthly</span>
            <TrendingUp size={20} />
          </div>
          <p className="text-4xl font-bold text-slate-900">₹{revenue.monthly.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Revenue earned in the current month.</p>
        </div>

        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-6">
            <span className="uppercase text-xs tracking-[0.3em] font-bold">All Time</span>
            <BarChart3 size={20} />
          </div>
          <p className="text-4xl font-bold text-slate-900">₹{revenue.total.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Total revenue across all bookings.</p>
        </div>
      </div>

      <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Notes</h2>
        <p className="text-slate-500">Revenue calculations exclude cancelled bookings and reflect live booking changes. Create new bookings through the main app flow to update these numbers instantly.</p>
      </div>
    </div>
  );
}
