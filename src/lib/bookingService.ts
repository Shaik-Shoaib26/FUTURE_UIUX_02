import { Appointment } from '../data/mockData';
import { isSameDay, isWithinInterval, parseISO, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

const BOOKINGS_KEY = 'glownflow_bookings';
const LEGACY_APPOINTMENTS_KEY = 'glownflow_appointments';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type BookingInput = Omit<Appointment, 'id' | 'createdAt' | 'status'> & {
  status?: BookingStatus;
};

export type CustomerSummary = {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  totalBookings: number;
  totalSpending: number;
  lastAppointment: string;
};

export type RevenueSummary = {
  today: number;
  weekly: number;
  monthly: number;
  total: number;
};

const normalizeBooking = (booking: any): Appointment => {
  const status = booking.status === 'upcoming' ? 'confirmed' : booking.status || 'pending';

  return {
    id: booking.id,
    serviceId: booking.serviceId,
    specialistId: booking.specialistId,
    date: booking.date,
    status,
    price: booking.price ?? 0,
    customerName: booking.customerName || booking.userEmail || 'Guest',
    phoneNumber: booking.phoneNumber || 'N/A',
    email: booking.email || booking.userEmail || 'guest@glownflow.com',
    duration: booking.duration ?? 0,
    createdAt: booking.createdAt || booking.date,
    userEmail: booking.userEmail,
  };
};

export const getBookings = (): Appointment[] => {
  const raw = localStorage.getItem(BOOKINGS_KEY) ?? localStorage.getItem(LEGACY_APPOINTMENTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeBooking);
  } catch {
    return [];
  }
};

export const saveBookings = (bookings: Appointment[]) => {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

export const createBooking = (bookingInput: BookingInput): Appointment => {
  const newBooking: Appointment = {
    ...bookingInput,
    id: `a${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: bookingInput.status || 'pending',
  };
  const bookings = getBookings();
  saveBookings([...bookings, newBooking]);
  return newBooking;
};

export const updateBookingStatus = (id: string, status: BookingStatus): Appointment[] => {
  const bookings = getBookings().map((booking) => booking.id === id ? { ...booking, status } : booking);
  saveBookings(bookings);
  return bookings;
};

export const deleteBooking = (id: string): Appointment[] => {
  const bookings = getBookings().filter((booking) => booking.id !== id);
  saveBookings(bookings);
  return bookings;
};

const isActiveBooking = (booking: Appointment) => booking.status !== 'cancelled';

export const getCustomers = (bookings: Appointment[]): CustomerSummary[] => {
  const map: Record<string, CustomerSummary> = {};

  bookings.forEach((booking) => {
    if (!booking.email) return;
    const key = booking.email;
    const createdAt = new Date(booking.date).toISOString();

    if (!map[key]) {
      map[key] = {
        id: key,
        customerName: booking.customerName,
        phoneNumber: booking.phoneNumber,
        email: booking.email,
        totalBookings: 0,
        totalSpending: 0,
        lastAppointment: createdAt,
      };
    }

    map[key].totalBookings += 1;
    if (isActiveBooking(booking)) {
      map[key].totalSpending += booking.price;
    }

    if (new Date(booking.date) > new Date(map[key].lastAppointment)) {
      map[key].lastAppointment = booking.date;
    }
  });

  return Object.values(map).sort((a, b) => b.totalSpending - a.totalSpending);
};

export const calculateRevenue = (bookings: Appointment[]): RevenueSummary => {
  const activeBookings = bookings.filter(isActiveBooking);
  const today = activeBookings.reduce((sum, booking) => isSameDay(parseISO(booking.date), new Date()) ? sum + booking.price : sum, 0);
  const weekly = activeBookings.reduce((sum, booking) => {
    const date = parseISO(booking.date);
    const range = { start: startOfWeek(new Date()), end: endOfWeek(new Date()) };
    return isWithinInterval(date, range) ? sum + booking.price : sum;
  }, 0);
  const monthly = activeBookings.reduce((sum, booking) => {
    const date = parseISO(booking.date);
    const range = { start: startOfMonth(new Date()), end: endOfMonth(new Date()) };
    return isWithinInterval(date, range) ? sum + booking.price : sum;
  }, 0);
  const total = activeBookings.reduce((sum, booking) => sum + booking.price, 0);
  return { today, weekly, monthly, total };
};
