import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy, 
  Timestamp, 
  onSnapshot, 
  Unsubscribe 
} from 'firebase/firestore';

export interface CompetencyAnswerItem {
  taskId: string;
  title: string;
  contentArea: string; // 'M' | 'H' | 'A' | 'S'
  thinkingLevel: string; // 'T' | 'A' | 'K'
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  solution: string;
  difficulty?: number;
  options?: string[];
}

export interface AreaBreakdown {
  total: number;
  correct: number;
}

export interface LevelBreakdown {
  total: number;
  correct: number;
}

export interface CompetencyTestSubmission {
  id?: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  avatarUrl?: string;
  testId: string; // 'PM-01' .. 'PM-10'
  testTitle: string; // '1. Országos Kompetenciamérés Próbateszt'
  startedAt: string; // ISO string
  completedAt?: string; // ISO string (if completed)
  lastActiveAt?: string; // ISO string (last progress update)
  status: 'in_progress' | 'completed';
  durationSeconds: number;
  timeLimitMinutes: number;
  score: number;
  answeredCount: number;
  totalTasks: number;
  percentage: number;
  breakdownByArea: {
    M: AreaBreakdown;
    H: AreaBreakdown;
    A: AreaBreakdown;
    S: AreaBreakdown;
    [key: string]: AreaBreakdown;
  };
  breakdownByLevel: {
    T: LevelBreakdown;
    A: LevelBreakdown;
    K: LevelBreakdown;
    [key: string]: LevelBreakdown;
  };
  answers: {
    [taskId: string]: CompetencyAnswerItem;
  };
  createdAt?: any;
}

const COLLECTION_NAME = 'competency_test_submissions';

/**
 * Creates an in-progress competency practice test submission document in Firestore when student starts.
 */
export async function createOrStartCompetencySubmission(
  submission: Omit<CompetencyTestSubmission, 'id' | 'createdAt'>
): Promise<string> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(colRef, {
      ...submission,
      status: submission.status || 'in_progress',
      lastActiveAt: new Date().toISOString(),
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error starting competency test submission:', error);
    throw error;
  }
}

/**
 * Real-time updates the answers and progress of an in-progress submission document.
 */
export async function updateCompetencySubmissionProgress(
  submissionId: string,
  progress: Partial<CompetencyTestSubmission>
): Promise<void> {
  try {
    if (!submissionId) return;
    const docRef = doc(db, COLLECTION_NAME, submissionId);
    await updateDoc(docRef, {
      ...progress,
      lastActiveAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating competency test submission progress:', error);
    // Silent fail for non-blocking background auto-saves
  }
}

/**
 * Completes a submission (sets status to 'completed' and sets completedAt).
 */
export async function completeCompetencySubmission(
  submissionId: string,
  finalData: Partial<CompetencyTestSubmission>
): Promise<void> {
  try {
    if (!submissionId) return;
    const docRef = doc(db, COLLECTION_NAME, submissionId);
    await updateDoc(docRef, {
      ...finalData,
      status: 'completed',
      completedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error completing competency test submission:', error);
    throw error;
  }
}

/**
 * Saves a competency practice test submission to Firestore (creates or updates).
 */
export async function saveCompetencySubmission(
  submission: Omit<CompetencyTestSubmission, 'id' | 'createdAt'>,
  existingId?: string
): Promise<string> {
  try {
    if (existingId) {
      await completeCompetencySubmission(existingId, submission);
      return existingId;
    }
    const colRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(colRef, {
      ...submission,
      status: submission.status || 'completed',
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving competency test submission:', error);
    throw error;
  }
}

/**
 * Fetches all competency practice test submissions for the teacher view with dynamically resolved student names.
 */
export async function getTeacherCompetencySubmissions(): Promise<CompetencyTestSubmission[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const [snapshot, profilesSnap] = await Promise.all([
      getDocs(q),
      getDocs(collection(db, 'profiles')).catch((err) => {
        console.warn('Error fetching profiles in getTeacherCompetencySubmissions:', err);
        return null;
      })
    ]);

    const profilesMap = new Map<string, any>();
    if (profilesSnap) {
      profilesSnap.forEach((d) => profilesMap.set(d.id, d.data()));
    }

    const submissions: CompetencyTestSubmission[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const answers = data.answers || {};
      const answeredCount = data.answeredCount !== undefined 
        ? data.answeredCount 
        : Object.keys(answers).length;

      const prof = data.userId ? profilesMap.get(data.userId) : null;
      const studentName = prof?.full_name?.trim() || prof?.username?.trim() || data.studentName || 'Névtelen Diák';
      const studentEmail = prof?.email?.trim() || data.studentEmail || '';
      const avatarUrl = prof?.avatar_url || data.avatarUrl;

      submissions.push({
        id: docSnap.id,
        userId: data.userId || '',
        studentName,
        studentEmail,
        avatarUrl,
        testId: data.testId || '',
        testTitle: data.testTitle || '',
        startedAt: data.startedAt || '',
        completedAt: data.completedAt || '',
        lastActiveAt: data.lastActiveAt || data.completedAt || data.startedAt || '',
        status: data.status === 'in_progress' ? 'in_progress' : 'completed',
        durationSeconds: data.durationSeconds || 0,
        timeLimitMinutes: data.timeLimitMinutes || 45,
        score: data.score || 0,
        answeredCount,
        totalTasks: data.totalTasks || 31,
        percentage: data.percentage || 0,
        breakdownByArea: data.breakdownByArea || {
          M: { total: 0, correct: 0 },
          H: { total: 0, correct: 0 },
          A: { total: 0, correct: 0 },
          S: { total: 0, correct: 0 }
        },
        breakdownByLevel: data.breakdownByLevel || {
          T: { total: 0, correct: 0 },
          A: { total: 0, correct: 0 },
          K: { total: 0, correct: 0 }
        },
        answers,
        createdAt: data.createdAt
      });
    });

    return submissions;
  } catch (error) {
    console.error('Error fetching competency test submissions:', error);
    throw error;
  }
}

/**
 * Real-time subscription to all competency practice test submissions for the teacher view.
 * Automatically and dynamically resolves the latest student profile name (full_name / username)
 * whenever either the test progress or the student's profile changes.
 */
export function subscribeTeacherCompetencySubmissions(
  onData: (submissions: CompetencyTestSubmission[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTION_NAME);
  const q = query(colRef, orderBy('createdAt', 'desc'));

  let rawSubmissions: CompetencyTestSubmission[] = [];
  let profilesMap = new Map<string, { full_name?: string; username?: string; email?: string; avatar_url?: string }>();
  let hasReceivedSubmissions = false;

  const emitMerged = () => {
    if (!hasReceivedSubmissions) return;
    const enriched = rawSubmissions.map((sub) => {
      if (!sub.userId) return sub;
      const prof = profilesMap.get(sub.userId);
      if (!prof) return sub;
      const latestName = prof.full_name?.trim() || prof.username?.trim();
      const latestEmail = prof.email?.trim();
      return {
        ...sub,
        studentName: latestName || sub.studentName,
        studentEmail: latestEmail || sub.studentEmail,
        avatarUrl: prof.avatar_url || sub.avatarUrl
      };
    });
    onData(enriched);
  };

  // 1. Live listener for profiles collection to guarantee dynamic name updates
  const unsubProfiles = onSnapshot(
    collection(db, 'profiles'),
    (profSnap) => {
      const nextMap = new Map<string, { full_name?: string; username?: string; email?: string; avatar_url?: string }>();
      profSnap.forEach((d) => {
        const pData = d.data();
        nextMap.set(d.id, {
          full_name: pData.full_name,
          username: pData.username,
          email: pData.email,
          avatar_url: pData.avatar_url
        });
      });
      profilesMap = nextMap;
      emitMerged();
    },
    (err) => {
      console.warn('Error subscribing to profiles in competency submissions:', err);
    }
  );

  // 2. Live listener for competency test submissions
  const unsubSubmissions = onSnapshot(
    q,
    (snapshot) => {
      const submissions: CompetencyTestSubmission[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const answers = data.answers || {};
        const answeredCount = data.answeredCount !== undefined 
          ? data.answeredCount 
          : Object.keys(answers).length;

        submissions.push({
          id: docSnap.id,
          userId: data.userId || '',
          studentName: data.studentName || 'Névtelen Diák',
          studentEmail: data.studentEmail || '',
          avatarUrl: data.avatarUrl,
          testId: data.testId || '',
          testTitle: data.testTitle || '',
          startedAt: data.startedAt || '',
          completedAt: data.completedAt || '',
          lastActiveAt: data.lastActiveAt || data.completedAt || data.startedAt || '',
          status: data.status === 'in_progress' ? 'in_progress' : 'completed',
          durationSeconds: data.durationSeconds || 0,
          timeLimitMinutes: data.timeLimitMinutes || 45,
          score: data.score || 0,
          answeredCount,
          totalTasks: data.totalTasks || 31,
          percentage: data.percentage || 0,
          breakdownByArea: data.breakdownByArea || {
            M: { total: 0, correct: 0 },
            H: { total: 0, correct: 0 },
            A: { total: 0, correct: 0 },
            S: { total: 0, correct: 0 }
          },
          breakdownByLevel: data.breakdownByLevel || {
            T: { total: 0, correct: 0 },
            A: { total: 0, correct: 0 },
            K: { total: 0, correct: 0 }
          },
          answers,
          createdAt: data.createdAt
        });
      });

      rawSubmissions = submissions;
      hasReceivedSubmissions = true;
      emitMerged();
    },
    (error) => {
      console.error('Error in competency submissions real-time subscription:', error);
      if (onError) onError(error);
    }
  );

  return () => {
    unsubProfiles();
    unsubSubmissions();
  };
}

/**
 * Deletes a competency practice test submission.
 */
export async function deleteCompetencySubmission(submissionId: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, submissionId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting competency test submission:', error);
    throw error;
  }
}

/**
 * Fetches a single submission by its document ID, dynamically resolving latest student name from profiles.
 */
export async function getCompetencySubmissionById(
  submissionId: string
): Promise<CompetencyTestSubmission | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, submissionId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;

    const data = docSnap.data();
    let studentName = data.studentName || 'Névtelen Diák';
    let studentEmail = data.studentEmail || '';
    let avatarUrl = data.avatarUrl;

    if (data.userId) {
      try {
        const profSnap = await getDoc(doc(db, 'profiles', data.userId));
        if (profSnap.exists()) {
          const prof = profSnap.data();
          if (prof.full_name?.trim()) studentName = prof.full_name.trim();
          else if (prof.username?.trim()) studentName = prof.username.trim();
          if (prof.email?.trim()) studentEmail = prof.email.trim();
          if (prof.avatar_url) avatarUrl = prof.avatar_url;
        }
      } catch (e) {
        console.warn('Error fetching profile for submission by id:', e);
      }
    }

    const answers = data.answers || {};
    return {
      id: docSnap.id,
      userId: data.userId || '',
      studentName,
      studentEmail,
      avatarUrl,
      testId: data.testId || '',
      testTitle: data.testTitle || '',
      startedAt: data.startedAt || '',
      completedAt: data.completedAt || '',
      lastActiveAt: data.lastActiveAt || '',
      status: data.status === 'in_progress' ? 'in_progress' : 'completed',
      durationSeconds: data.durationSeconds || 0,
      timeLimitMinutes: data.timeLimitMinutes || 45,
      score: data.score || 0,
      answeredCount: data.answeredCount || Object.keys(answers).length,
      totalTasks: data.totalTasks || 31,
      percentage: data.percentage || 0,
      breakdownByArea: data.breakdownByArea || {},
      breakdownByLevel: data.breakdownByLevel || {},
      answers,
      createdAt: data.createdAt
    };
  } catch (error) {
    console.error('Error fetching competency test submission by id:', error);
    throw error;
  }
}

/**
 * Real-time subscription to a student's own competency practice test submissions,
 * automatically keeping their studentName updated to their latest profile name.
 */
export function subscribeStudentCompetencySubmissions(
  userId: string,
  onData: (submissions: CompetencyTestSubmission[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const colRef = collection(db, COLLECTION_NAME);
  const q = query(colRef, where('userId', '==', userId));

  let rawSubmissions: CompetencyTestSubmission[] = [];
  let userProfile: { full_name?: string; username?: string; email?: string; avatar_url?: string } | null = null;
  let hasReceivedSubmissions = false;

  const emitMerged = () => {
    if (!hasReceivedSubmissions) return;
    const resolvedName = userProfile?.full_name?.trim() || userProfile?.username?.trim();
    const resolvedEmail = userProfile?.email?.trim();
    const resolvedAvatar = userProfile?.avatar_url;

    const enriched = rawSubmissions.map((sub) => ({
      ...sub,
      studentName: resolvedName || sub.studentName,
      studentEmail: resolvedEmail || sub.studentEmail,
      avatarUrl: resolvedAvatar || sub.avatarUrl
    }));
    onData(enriched);
  };

  const unsubProfile = onSnapshot(
    doc(db, 'profiles', userId),
    (pSnap) => {
      if (pSnap.exists()) {
        const pData = pSnap.data();
        userProfile = {
          full_name: pData.full_name,
          username: pData.username,
          email: pData.email,
          avatar_url: pData.avatar_url
        };
      }
      emitMerged();
    },
    (err) => console.warn('Error subscribing to profile for student submissions:', err)
  );

  const unsubSubmissions = onSnapshot(
    q,
    (snapshot) => {
      const submissions: CompetencyTestSubmission[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const answers = data.answers || {};
        const answeredCount = data.answeredCount !== undefined 
          ? data.answeredCount 
          : Object.keys(answers).length;

        submissions.push({
          id: docSnap.id,
          userId: data.userId || '',
          studentName: data.studentName || 'Névtelen Diák',
          studentEmail: data.studentEmail || '',
          avatarUrl: data.avatarUrl,
          testId: data.testId || '',
          testTitle: data.testTitle || '',
          startedAt: data.startedAt || '',
          completedAt: data.completedAt || '',
          lastActiveAt: data.lastActiveAt || data.completedAt || data.startedAt || '',
          status: data.status === 'in_progress' ? 'in_progress' : 'completed',
          durationSeconds: data.durationSeconds || 0,
          timeLimitMinutes: data.timeLimitMinutes || 45,
          score: data.score || 0,
          answeredCount,
          totalTasks: data.totalTasks || 31,
          percentage: data.percentage || 0,
          breakdownByArea: data.breakdownByArea || {
            M: { total: 0, correct: 0 },
            H: { total: 0, correct: 0 },
            A: { total: 0, correct: 0 },
            S: { total: 0, correct: 0 }
          },
          breakdownByLevel: data.breakdownByLevel || {
            T: { total: 0, correct: 0 },
            A: { total: 0, correct: 0 },
            K: { total: 0, correct: 0 }
          },
          answers,
          createdAt: data.createdAt
        });
      });

      // Sort client-side: newest first
      submissions.sort((a, b) => {
        const timeA = a.createdAt?.toDate?.()?.getTime() || (a.startedAt ? new Date(a.startedAt).getTime() : 0);
        const timeB = b.createdAt?.toDate?.()?.getTime() || (b.startedAt ? new Date(b.startedAt).getTime() : 0);
        return timeB - timeA;
      });

      rawSubmissions = submissions;
      hasReceivedSubmissions = true;
      emitMerged();
    },
    (error) => {
      console.error('Error in student competency submissions subscription:', error);
      if (onError) onError(error);
    }
  );

  return () => {
    unsubProfile();
    unsubSubmissions();
  };
}

/**
 * Fetches all competency practice test submissions for a specific student,
 * dynamically resolved with their latest profile name.
 */
export async function getStudentCompetencySubmissions(userId: string): Promise<CompetencyTestSubmission[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, where('userId', '==', userId));
    const [snapshot, profSnap] = await Promise.all([
      getDocs(q),
      getDoc(doc(db, 'profiles', userId)).catch(() => null)
    ]);

    let resolvedName: string | undefined;
    let resolvedEmail: string | undefined;
    let resolvedAvatar: string | undefined;

    if (profSnap && profSnap.exists()) {
      const pData = profSnap.data();
      resolvedName = pData.full_name?.trim() || pData.username?.trim();
      resolvedEmail = pData.email?.trim();
      resolvedAvatar = pData.avatar_url;
    }

    const submissions: CompetencyTestSubmission[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const answers = data.answers || {};
      const answeredCount = data.answeredCount !== undefined 
        ? data.answeredCount 
        : Object.keys(answers).length;

      submissions.push({
        id: docSnap.id,
        userId: data.userId || '',
        studentName: resolvedName || data.studentName || 'Névtelen Diák',
        studentEmail: resolvedEmail || data.studentEmail || '',
        avatarUrl: resolvedAvatar || data.avatarUrl,
        testId: data.testId || '',
        testTitle: data.testTitle || '',
        startedAt: data.startedAt || '',
        completedAt: data.completedAt || '',
        lastActiveAt: data.lastActiveAt || data.completedAt || data.startedAt || '',
        status: data.status === 'in_progress' ? 'in_progress' : 'completed',
        durationSeconds: data.durationSeconds || 0,
        timeLimitMinutes: data.timeLimitMinutes || 45,
        score: data.score || 0,
        answeredCount,
        totalTasks: data.totalTasks || 31,
        percentage: data.percentage || 0,
        breakdownByArea: data.breakdownByArea || {
          M: { total: 0, correct: 0 },
          H: { total: 0, correct: 0 },
          A: { total: 0, correct: 0 },
          S: { total: 0, correct: 0 }
        },
        breakdownByLevel: data.breakdownByLevel || {
          T: { total: 0, correct: 0 },
          A: { total: 0, correct: 0 },
          K: { total: 0, correct: 0 }
        },
        answers,
        createdAt: data.createdAt
      });
    });

    submissions.sort((a, b) => {
      const timeA = a.createdAt?.toDate?.()?.getTime() || (a.startedAt ? new Date(a.startedAt).getTime() : 0);
      const timeB = b.createdAt?.toDate?.()?.getTime() || (b.startedAt ? new Date(b.startedAt).getTime() : 0);
      return timeB - timeA;
    });

    return submissions;
  } catch (error) {
    console.error('Error fetching student competency submissions:', error);
    throw error;
  }
}

/**
 * Updates the studentName and studentEmail in all existing competency test submissions for a given userId.
 * Called when a user updates their profile name in ProfilePage.
 */
export async function updateStudentCompetencySubmissionsName(
  userId: string,
  newName: string,
  newEmail?: string
): Promise<number> {
  if (!userId || !newName) return 0;
  try {
    const cleanName = newName.trim();
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return 0;

    const promises: Promise<void>[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const needsNameUpdate = data.studentName !== cleanName;
      const needsEmailUpdate = newEmail && data.studentEmail !== newEmail.trim();

      if (needsNameUpdate || needsEmailUpdate) {
        const updateData: any = {};
        if (needsNameUpdate) updateData.studentName = cleanName;
        if (needsEmailUpdate) updateData.studentEmail = newEmail!.trim();
        promises.push(updateDoc(docSnap.ref, updateData));
      }
    });

    await Promise.all(promises);
    return promises.length;
  } catch (error) {
    console.error('Error updating student name across competency submissions:', error);
    return 0;
  }
}

