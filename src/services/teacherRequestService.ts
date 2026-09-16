import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  query, 
  where, 
  onSnapshot, 
  updateDoc 
} from 'firebase/firestore';
import { Profile } from '@/contexts/AuthContext';

export interface TeacherApplicationData {
  schoolName?: string;
  subject?: string;
  note?: string;
}

/**
 * Submit a request to become a teacher (status: pending).
 */
export async function requestTeacherAccess(
  userId: string, 
  data: TeacherApplicationData
): Promise<void> {
  const userRef = doc(db, 'profiles', userId);
  await updateDoc(userRef, {
    teacher_status: 'pending',
    teacher_requested_at: new Date().toISOString(),
    school_name: data.schoolName?.trim() || '',
    subject: data.subject?.trim() || '',
    teacher_note: data.note?.trim() || '',
    updated_at: new Date().toISOString()
  });
}

/**
 * Cancel a pending teacher request.
 */
export async function cancelTeacherRequest(userId: string): Promise<void> {
  const userRef = doc(db, 'profiles', userId);
  await updateDoc(userRef, {
    teacher_status: 'none',
    updated_at: new Date().toISOString()
  });
}

/**
 * Real-time subscription to pending teacher requests for admin.
 */
export function subscribePendingTeacherRequests(
  callback: (requests: Profile[]) => void,
  onError?: (err: Error) => void
): () => void {
  const q = query(
    collection(db, 'profiles'),
    where('teacher_status', '==', 'pending')
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const requests = snapshot.docs.map((d) => ({
        ...(d.data() as Profile),
        id: d.id
      }));
      callback(requests);
    },
    (err) => {
      console.error('Error listening to pending teacher requests:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Real-time subscription to all approved teachers for admin.
 */
export function subscribeApprovedTeachers(
  callback: (teachers: Profile[]) => void,
  onError?: (err: Error) => void
): () => void {
  const q = query(
    collection(db, 'profiles'),
    where('role', '==', 'teacher')
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const teachers = snapshot.docs.map((d) => ({
        ...(d.data() as Profile),
        id: d.id
      }));
      callback(teachers);
    },
    (err) => {
      console.error('Error listening to approved teachers:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Admin approves a teacher request.
 */
export async function approveTeacherRequest(userId: string): Promise<void> {
  const userRef = doc(db, 'profiles', userId);
  await updateDoc(userRef, {
    role: 'teacher',
    teacher_status: 'approved',
    updated_at: new Date().toISOString()
  });
}

/**
 * Admin rejects a teacher request.
 */
export async function rejectTeacherRequest(userId: string, reason?: string): Promise<void> {
  const userRef = doc(db, 'profiles', userId);
  await updateDoc(userRef, {
    role: 'student',
    teacher_status: 'rejected',
    teacher_reject_reason: reason || null,
    updated_at: new Date().toISOString()
  });
}

/**
 * Admin revokes teacher access (resets user to student).
 */
export async function revokeTeacherAccess(userId: string): Promise<void> {
  const userRef = doc(db, 'profiles', userId);
  await updateDoc(userRef, {
    role: 'student',
    teacher_status: 'none',
    updated_at: new Date().toISOString()
  });
}
