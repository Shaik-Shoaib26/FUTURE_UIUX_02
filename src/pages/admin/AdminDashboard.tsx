import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, CalendarDays, Clock, CheckCircle2, Users } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { services } from '../../data/mockData';
import { format, isSameDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { calculateRevenue } from '../../lib/bookingService';

export function AdminDashboard() {
  const { bookings } = useStore();
  const revenue = useMemo(() => calculateRevenue(bookings), [bookings]);

  const totalAppointments = bookings.length;
  const todayAppointments = bookings.filter((booking) => isSameDay(parseISO(booking.date), new Date()) && booking.status !== 'cancelled').length;
  const pendingAppointments = bookings.filter((booking) => booking.status === 'pending').length;
  const completedAppointments = bookings.filter((booking) => booking.status === 'completed').length;

  const recentBookings = bookings
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-2">Admin Overview</p>
          <h1 className="text-3xl font-bold text-slate-900">Salon Dashboard</h1>
          <p className="text-slate-500 mt-2 max-w-2xl">Track real appointments, customer revenue, and booking status live from the Glow & Flow appointment system.</p>
        </div>
        <Link to="/admin/appointments" className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-600 transition">
          View All Appointments
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-6">
            <span className="uppercase text-xs tracking-[0.3em] font-bold">Revenue</span>
            <CreditCard size={20} />
          </div>
          <p className="text-4xl font-bold text-slate-900">₹{revenue.total.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Total revenue from confirmed bookings</p>
        </div>

        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-6">
            <span className="uppercase text-xs tracking-[0.3em] font-bold">Appointments</span>
            <CalendarDays size={20} />
          </div>
          <p className="text-4xl font-bold text-slate-900">{totalAppointments}</p>
          <p className="mt-2 text-sm text-slate-500">Total bookings stored from the app</p>
        </div>

        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-6">
            <span className="uppercase text-xs tracking-[0.3em] font-bold">Today</span>
            <Clock size={20} />
          </div>
          <p className="text-4xl font-bold text-slate-900">{todayAppointments}</p>
          <p className="mt-2 text-sm text-slate-500">Appointments scheduled for today</p>
        </div>

        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-6">
            <span className="uppercase text-xs tracking-[0.3em] font-bold">Completed</span>
            <CheckCircle2 size={20} />
          </div>
          <p className="text-4xl font-bold text-slate-900">{completedAppointments}</p>
          <p className="mt-2 text-sm text-slate-500">Bookings marked as completed</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Revenue Breakdown</h2>
          <div className="space-y-4 text-slate-700">
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span>Today</span>
              <span className="font-bold">₹{revenue.today.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span>This Week</span>
              <span className="font-bold">₹{revenue.weekly.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>This Month</span>
              <span className="font-bold">₹{revenue.monthly.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-[32px] bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
              <p className="text-sm text-slate-500">Latest appointments from your live booking data.</p>
            </div>
            <Link to="/admin/appointments" className="text-primary font-semibold hover:underline">See all</Link>
          </div>
          {recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking) => {
                const serviceName = services.find((s) => s.id === booking.serviceId)?.name || 'Service';
                return (
                  <div key={booking.id} className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">{booking.customerName}</p>
                        <p className="font-semibold text-slate-900">{serviceName}</p>
                      </div>
                      <div className="text-sm text-slate-500">{format(new Date(booking.date), 'MMM dd, yyyy')} • {format(new Date(booking.date), 'hh:mm a')}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No bookings yet. Bookings will appear here once customers complete the flow.</p>
          )}
        </div>
      </div>
    </div>
  );
}
