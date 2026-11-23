import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

const BOOKED_SLOTS_URL = 'https://us-central1-diakzona.cloudfunctions.net/getBookedSlots';

/**
 * Fetch already booked slots for a given date.
 * A foglalások személyes adatokat tartalmaznak (név, e-mail, telefon, cím), ezért a kliens
 * nem olvashatja őket közvetlenül: a getBookedSlots Cloud Function csak az idősávokat adja vissza.
 */
export async function getBookedSlotsForDate(dateStr: string): Promise<string[]> {
  try {
    const response = await fetch(`${BOOKED_SLOTS_URL}?date=${encodeURIComponent(dateStr)}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return Array.isArray(data.slots) ? data.slots.filter((s: unknown) => typeof s === 'string') : [];
  } catch (error) {
    console.warn('Could not fetch booked slots, returning empty list:', error);
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
 * Initiate Stripe Checkout session for tutoring payment (5000 HUF).
 */
export async function createStripeBookingSession(
  booking: Omit<BookingData, 'id' | 'createdAt' | 'status'>,
  amount = 5000
): Promise<{ url: string; sessionId?: string }> {
  const functionUrl = 'https://createstripecheckoutsession-ljp5sa765q-uc.a.run.app';
  
  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studentId: booking.studentId || null,
      studentName: booking.studentName,
      studentEmail: booking.studentEmail,
      studentPhone: booking.studentPhone,
      gradeLevel: booking.gradeLevel,
      topic: booking.topic,
      notes: booking.notes || '',
      date: booking.date,
      timeSlot: booking.timeSlot,
      amount,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'A fizetési folyamat indítása sikertelen.');
  }

  return response.json();
}


