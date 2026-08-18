import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

export interface BookingData {
  id?: string;
  studentId?: string | null;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  gradeLevel: string;
  topic: string;
  notes?: string;
  date: string; // Format: YYYY-MM-DD
  timeSlot: string; // e.g. "15:00 - 15:45"
  meetLink?: string; // Google Meet URL
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: any;
}

export const DEFAULT_TIME_SLOTS = [
  '14:00 - 14:45',
  '15:00 - 15:45',
  '16:00 - 16:45',
  '17:00 - 17:45',
  '18:00 - 18:45',
];

/**
 * Permanent Google Meet room link for Orsós István / DiákZóna Akadémia
 */
export const PERMANENT_MEET_LINK = 'https://meet.google.com/gqy-sazd-yuz';

export function generateGoogleMeetLink(dateStr: string, timeSlot: string): string {
  return PERMANENT_MEET_LINK;
}

/**
 * Fetch already booked slots for a given date.
 */
export async function getBookedSlotsForDate(dateStr: string): Promise<string[]> {
  try {
    const bookingsRef = collection(db, 'tutoring_bookings');
    const q = query(bookingsRef, where('date', '==', dateStr));
    const querySnapshot = await getDocs(q);

    const bookedSlots: string[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as BookingData;
      if (data.timeSlot && data.status !== 'cancelled') {
        bookedSlots.push(data.timeSlot);
      }
    });

    return bookedSlots;
  } catch (error) {
    console.warn('Could not fetch booked slots from Firestore, returning empty list:', error);
    return [];
  }
}

/**
 * Save a new tutoring booking into Firestore.
 */
export async function createTutoringBooking(booking: Omit<BookingData, 'id' | 'createdAt' | 'status'>): Promise<{ id: string; meetLink: string }> {
  const meetLink = booking.meetLink || PERMANENT_MEET_LINK;
  
  const newBooking: BookingData = {
    ...booking,
    meetLink,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  try {
    const bookingsRef = collection(db, 'tutoring_bookings');
    const docRef = await addDoc(bookingsRef, {
      ...newBooking,
      timestamp: serverTimestamp(),
    });
    return { id: docRef.id, meetLink };
  } catch (error) {
    console.error('Error saving booking to Firestore:', error);
    return { id: `local-${Date.now()}`, meetLink };
  }
}

/**
 * Initiate Stripe Checkout session for tutoring payment.
 */
export async function createStripeBookingSession(booking: Omit<BookingData, 'id' | 'createdAt' | 'status'>, amount = 6000): Promise<{ url: string }> {
  const functionUrl = 'https://us-central1-diakzona.cloudfunctions.net/createStripeCheckoutSession';
  
  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...booking,
      amount,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Fizetési munkamenet indítása sikertelen.');
  }

  return response.json();
}

