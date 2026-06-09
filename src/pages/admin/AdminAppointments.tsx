import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useStore } from '../../context/StoreContext';
import { services, specialists, Appointment } from '../../data/mockData';
import { Search, Filter, Eye, CheckCircle2, XCircle, Clock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const statusOptions = ['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const;

type StatusFilter = typeof statusOptions[number];

export function AdminAppointments() {
  const { bookings, updateBookingStatus } = useStore();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [activeBooking, setActiveBooking] = useState<Appointment | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const service = services.find((s) => s.id === booking.serviceId)?.name || '';
      const specialist = specialists.find((sp) => sp.id === booking.specialistId)?.name || '';
      const query = search.toLowerCase();
      const matchesText = [booking.customerName, booking.email, booking.phoneNumber, service, specialist]
        .some((value) => value?.toLowerCase().includes(query));
      const matchesStatus = status === 'all' || booking.status === status;
      return matchesText && matchesStatus;
    });
  }, [bookings, search, status]);

  const handleStatusChange = (bookingId: string, nextStatus: Appointment['status']) => {
    updateBookingStatus(bookingId, nextStatus);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-2">Admin Appointments</p>
          <h1 className="text-3xl font-bold text-slate-900">Live Booking Queue</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <Search size={16} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, service, specialist"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <Filter size={16} className="text-slate-400" />
            <select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} className="bg-transparent text-sm outline-none text-slate-700">
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-[1.2fr_1.5fr_1.4fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-xs uppercase tracking-[0.25em] text-slate-500 bg-slate-50">
          <span>Booking ID</span>
          <span>Customer</span>
          <span>Service / Specialist</span>
          <span>Date</span>
          <span>Time</span>
          <span>Status</span>
          <span className="text-right">Price</span>
        </div>
        <div className="space-y-2 p-4">
          {filteredBookings.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">No bookings match your search or filter.</div>
          ) : (
            filteredBookings.map((booking) => {
              const service = services.find((s) => s.id === booking.serviceId);
              const specialist = specialists.find((sp) => sp.id === booking.specialistId);
              return (
                <motion.div key={booking.id} layout className="grid grid-cols-[1.2fr_1.5fr_1.4fr_1fr_1fr_1fr_1fr] gap-4 rounded-[28px] border border-gray-100 bg-slate-50 p-4 items-center">
                  <div className="font-semibold text-slate-900 truncate">{booking.bookingId || booking.id}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{booking.customerName}</p>
                    <p className="text-xs text-slate-500">{booking.email} · {booking.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{service?.name || booking.serviceName || 'Unknown'}</p>
                    <p className="text-xs text-slate-500">{specialist?.name || booking.specialistName || 'Unknown'}</p>
                  </div>
                  <div className="text-slate-600 text-sm">{format(parseISO(booking.date), 'MMM dd, yyyy')}</div>
                  <div className="text-slate-600 text-sm">{format(parseISO(booking.date), 'hh:mm a')}</div>
                  <div>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value as Appointment['status'])}
                      className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                    >
                      {statusOptions.filter((option) => option !== 'all').map((option) => (
                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col items-end justify-between text-right">
                    <p className="font-semibold text-slate-900">₹{booking.price.toLocaleString()}</p>
                    <button onClick={() => setActiveBooking(booking)} className="text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1">
                      <Eye size={14} /> Details
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Booking Details</p>
                  <h2 className="text-2xl font-bold text-slate-900">{activeBooking.customerName}</h2>
                  <p className="text-sm text-slate-500">Booking ID: {activeBooking.id}</p>
                </div>
                <button onClick={() => setActiveBooking(null)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">Close</button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Service</p>
                    <p className="font-semibold text-slate-900">{services.find((s) => s.id === activeBooking.serviceId)?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Specialist</p>
                    <p className="font-semibold text-slate-900">{specialists.find((sp) => sp.id === activeBooking.specialistId)?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Duration</p>
                    <p className="font-semibold text-slate-900">{activeBooking.duration} mins</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Date</p>
                    <p className="font-semibold text-slate-900">{format(parseISO(activeBooking.date), 'EEEE, MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Time</p>
                    <p className="font-semibold text-slate-900">{format(parseISO(activeBooking.date), 'hh:mm a')}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Status</p>
                    <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{activeBooking.status}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Customer</p>
                  <p className="font-semibold text-slate-900">{activeBooking.customerName}</p>
                  <p className="text-sm text-slate-500">{activeBooking.email}</p>
                  <p className="text-sm text-slate-500">{activeBooking.phoneNumber}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Pricing</p>
                  <p className="font-semibold text-slate-900">₹{activeBooking.price.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Created: {format(parseISO(activeBooking.createdAt), 'MMM dd, yyyy')}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button onClick={() => setActiveBooking(null)} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Close</button>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleStatusChange(activeBooking.id, 'confirmed')} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600">Confirm</button>
                  <button onClick={() => handleStatusChange(activeBooking.id, 'completed')} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Complete</button>
                  <button onClick={() => handleStatusChange(activeBooking.id, 'cancelled')} className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
