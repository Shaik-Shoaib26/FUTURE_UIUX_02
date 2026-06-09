import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { useStore } from '../../context/StoreContext';
import { getCustomers } from '../../lib/bookingService';

export function AdminCustomers() {
  const { bookings } = useStore();

  const customers = useMemo(() => getCustomers(bookings), [bookings]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-2">Admin Customers</p>
        <h1 className="text-3xl font-bold text-slate-900">Customer Insights</h1>
        <p className="mt-2 text-slate-500 max-w-2xl">Automatically generated from live bookings, including total spend and last appointment.</p>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-xs uppercase tracking-[0.3em] text-slate-500 bg-slate-50">
          <span>Customer</span>
          <span>Email</span>
          <span>Total Bookings</span>
          <span>Total Spend</span>
          <span>Last Appointment</span>
        </div>
        <div className="divide-y divide-gray-100">
          {customers.length === 0 ? (
            <div className="p-10 text-center text-slate-500">No customers yet. Customer profiles appear after the first booking.</div>
          ) : (
            customers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-5 items-center">
                <div>
                  <p className="font-semibold text-slate-900">{customer.customerName}</p>
                  <p className="text-sm text-slate-500">{customer.phoneNumber}</p>
                </div>
                <div className="text-slate-700 text-sm">{customer.email}</div>
                <div className="font-semibold text-slate-900">{customer.totalBookings}</div>
                <div className="font-semibold text-slate-900">₹{customer.totalSpending.toLocaleString()}</div>
                <div className="text-sm text-slate-500">{format(parseISO(customer.lastAppointment), 'MMM dd, yyyy')}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
