import type { Appointment } from '../data/mockData';
import { collection, addDoc, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, Timestamp, updateDoc, Unsubscribe, DocumentData } from 'firebase/firestore';
import { init as emailjsInit, send as emailjsSend } from '@emailjs/browser';
import { db } from './firebase';
import { format, isSameDay, isWithinInterval, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { services, specialists } from '../data/mockData';

const APPOINTMENTS_COLLECTION = 'appointments';
const LOCAL_BOOKINGS_KEY = 'glownflow_bookings';
const NOTIFICATION_EMAIL = import.meta.env.VITE_NOTIFICATION_EMAIL ?? 'shaikshoaib436@gmail.com';
const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const emailjsConfigured = Boolean(EMAILJS_USER_ID && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID);
if (EMAILJS_USER_ID) {
  emailjsInit(EMAILJS_USER_ID);
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type BookingInput = Omit<Appointment, 'id' | 'createdAt' | 'status' | 'bookingId' | 'serviceName' | 'specialistName' | 'time'> & {
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

const parseTimestamp = (value: any): string => {
  if (!value) return new Date().toISOString();
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === 'string') return value;
  return new Date(value).toISOString();
};

const mapFirestoreBooking = (id: string, data: DocumentData): Appointment => {
  const date = parseTimestamp(data.date);
  return {
    id,
    bookingId: data.bookingId || id,
    serviceId: data.serviceId,
    specialistId: data.specialistId,
    serviceName: data.serviceName,
    specialistName: data.specialistName,
    date,
    time: data.time || (date ? format(new Date(date), 'hh:mm a') : ''),
    status: data.status || 'confirmed',
    price: data.price ?? 0,
    customerName: data.customerName || 'Guest',
    phoneNumber: data.phoneNumber || 'N/A',
    email: data.email || 'guest@glownflow.com',
    duration: data.duration ?? 0,
    createdAt: parseTimestamp(data.createdAt),
    userEmail: data.userEmail,
  };
};

const getLocalBookings = (): Appointment[] => {
  const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((booking) => ({
      ...booking,
      bookingId: booking.bookingId || booking.id,
      time: booking.time || (booking.date ? format(new Date(booking.date), 'hh:mm a') : ''),
    }));
  } catch {
    return [];
  }
};

const saveLocalBookings = (bookings: Appointment[]) => {
  localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(bookings));
};

export const getBookingsRealtime = (callback: (bookings: Appointment[]) => void): Unsubscribe => {
  if (!db) {
    callback(getLocalBookings());
    return () => {};
  }

  const appointmentsRef = collection(db, APPOINTMENTS_COLLECTION);
  const bookingsQuery = query(appointmentsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    bookingsQuery,
    (snapshot) => {
      const bookings = snapshot.docs.map((doc) => mapFirestoreBooking(doc.id, doc.data()));
      callback(bookings);
    },
    (error) => {
      console.error('Firestore realtime bookings failed:', error);
      callback(getLocalBookings());
    }
  );
};

export const getBookingById = async (id: string): Promise<Appointment | null> => {
  if (!db) return null;
  const appointmentDoc = doc(db, APPOINTMENTS_COLLECTION, id);
  const snapshot = await getDoc(appointmentDoc);
  if (!snapshot.exists()) return null;
  return mapFirestoreBooking(snapshot.id, snapshot.data());
};

const generateBookingId = () => {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GLOW-${Date.now().toString().slice(-6)}-${suffix}`;
};

const sendBookingNotification = async (booking: Appointment) => {
  if (!emailjsConfigured) {
    console.warn('EmailJS is not configured. Notification skipped.');
    return;
  }

  const templateParams = {
    subject: 'New Appointment Booking - Glow & Flow',
    booking_id: booking.bookingId || booking.id,
    customer_name: booking.customerName,
    phone_number: booking.phoneNumber,
    email_address: booking.email,
    service: booking.serviceName || booking.serviceId,
    specialist: booking.specialistName || booking.specialistId,
    date: format(new Date(booking.date), 'EEEE, MMM dd, yyyy'),
    time: booking.time,
    duration: `${booking.duration} mins`,
    price: booking.price,
    status: booking.status,
    to_email: NOTIFICATION_EMAIL,
    message_body: `Booking ID: ${booking.bookingId || booking.id}\n\nCustomer Name: ${booking.customerName}\nPhone Number: ${booking.phoneNumber}\nEmail: ${booking.email}\n\nService: ${booking.serviceName || booking.serviceId}\nSpecialist: ${booking.specialistName || booking.specialistId}\n\nDate: ${format(new Date(booking.date), 'EEEE, MMM dd, yyyy')}\nTime: ${booking.time}\n\nDuration: ${booking.duration} mins\nPrice: ₹${booking.price}\n\nStatus: Confirmed`,
  };

  try {
    await emailjsSend(EMAILJS_SERVICE_ID!, EMAILJS_TEMPLATE_ID!, templateParams);
  } catch (error) {
    console.error('Email notification failed:', error);
  }
};

export const createBooking = async (bookingInput: BookingInput): Promise<Appointment> => {
  const service = services.find((item) => item.id === bookingInput.serviceId);
  const specialist = specialists.find((item) => item.id === bookingInput.specialistId);
  const booking: Omit<Appointment, 'id'> = {
    ...bookingInput,
    bookingId: generateBookingId(),
    serviceName: service?.name,
    specialistName: specialist?.name,
    time: format(new Date(bookingInput.date), 'hh:mm a'),
    status: bookingInput.status || 'confirmed',
    price: bookingInput.price,
    customerName: bookingInput.customerName,
    phoneNumber: bookingInput.phoneNumber,
    email: bookingInput.email,
    duration: bookingInput.duration,
    date: bookingInput.date,
    userEmail: bookingInput.userEmail,
    createdAt: new Date().toISOString(),
  };

  if (!db) {
    const localBooking: Appointment = {
      ...booking,
      id: `local-${Date.now()}`,
    };
    saveLocalBookings([localBooking, ...getLocalBookings()]);
    await sendBookingNotification(localBooking);
    return localBooking;
  }

  const collectionRef = collection(db, APPOINTMENTS_COLLECTION);
  const docRef = await addDoc(collectionRef, {
    ...booking,
    createdAt: serverTimestamp(),
  });

  const savedBooking = await getBookingById(docRef.id);
  if (savedBooking) {
    await sendBookingNotification(savedBooking);
    return savedBooking;
  }

  return {
    ...booking,
    id: docRef.id,
    createdAt: new Date().toISOString(),
  };
};

export const updateBookingStatus = async (id: string, status: BookingStatus): Promise<void> => {
  if (!db) {
    const bookings = getLocalBookings().map((booking) => (booking.id === id ? { ...booking, status } : booking));
    saveLocalBookings(bookings);
    return;
  }
  const bookingDoc = doc(db, APPOINTMENTS_COLLECTION, id);
  await updateDoc(bookingDoc, { status });
};

export const deleteBooking = async (id: string): Promise<void> => {
  if (!db) {
    const bookings = getLocalBookings().filter((booking) => booking.id !== id);
    saveLocalBookings(bookings);
    return;
  }
  const bookingDoc = doc(db, APPOINTMENTS_COLLECTION, id);
  await deleteDoc(bookingDoc);
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
  const today = activeBookings.reduce((sum, booking) => (isSameDay(parseISO(booking.date), new Date()) ? sum + booking.price : sum), 0);
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
