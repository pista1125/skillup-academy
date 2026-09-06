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
  orderBy, 
  Timestamp 
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
 * Fetches all competency practice test submissions for the teacher view.
 */
export async function getTeacherCompetencySubmissions(): Promise<CompetencyTestSubmission[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

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
 * Fetches a single submission by its document ID.
 */
export async function getCompetencySubmissionById(
  submissionId: string
): Promise<CompetencyTestSubmission | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, submissionId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;

    const data = docSnap.data();
    const answers = data.answers || {};
    return {
      id: docSnap.id,
      userId: data.userId || '',
      studentName: data.studentName || 'Névtelen Diák',
      studentEmail: data.studentEmail || '',
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
