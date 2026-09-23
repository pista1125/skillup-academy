import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';

export interface MatcherScoreRecord {
  id?: string;
  userId: string | null;
  studentName: string;
  userCode?: string;
  grade: number;
  chapterId: string;
  topicId: string;
  topicTitle?: string;
  level: number;
  timeSeconds: number;
  mistakes: number;
  pairsCount: number;
  createdAt: string;
}

const COLLECTION_NAME = 'matcher_leaderboard';
const LOCAL_STORAGE_KEY = 'matcher_local_scores_v1';

/**
 * Helyi gyorsítótár lekérése
 */
function getLocalScores(): MatcherScoreRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading local matcher scores:', e);
    return [];
  }
}

/**
 * Eredmény mentése helyi gyorsítótárba
 */
function saveLocalScore(record: MatcherScoreRecord) {
  try {
    const current = getLocalScores();
    const updated = [record, ...current].slice(0, 150);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving local matcher score:', e);
  }
}

/**
 * Párosító játék eredményének mentése (Firestore + localStorage)
 */
export async function saveMatcherScore(data: {
  userId: string | null;
  studentName: string;
  userCode?: string;
  grade: number;
  chapterId: string;
  topicId: string;
  topicTitle?: string;
  level: number;
  timeSeconds: number;
  mistakes: number;
  pairsCount: number;
}): Promise<{ success: boolean; id?: string; error?: any }> {
  const nowIso = new Date().toISOString();
  const cleanTopicId = (data.topicId || 'matcher').toLowerCase().replace(/[^a-z0-9-]+/g, '');
  const cleanRecord: MatcherScoreRecord = {
    userId: data.userId || null,
    studentName: data.studentName.trim() || 'Diák',
    userCode: data.userCode || undefined,
    grade: Number(data.grade) || 6,
    chapterId: data.chapterId || 'egesz-szamok-oszthatosag',
    topicId: cleanTopicId,
    topicTitle: data.topicTitle || 'Párosító játék',
    level: Number(data.level) || 1,
    timeSeconds: Math.max(1, Number(data.timeSeconds) || 1),
    mistakes: Math.max(0, Number(data.mistakes) || 0),
    pairsCount: Number(data.pairsCount) || 8,
    createdAt: nowIso
  };

  saveLocalScore(cleanRecord);

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...cleanRecord,
      timestamp: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn('Firestore save failed for matcher score (saved to local backup):', error);
    return { success: true, id: 'local_' + Date.now() };
  }
}

/**
 * Top rangsor lekérdezése adott témakör és szint szerint
 */
export async function getTopMatcherScores(
  topicId: string,
  level: number,
  limitCount: number = 10,
  grade: number = 6
): Promise<MatcherScoreRecord[]> {
  const cleanTopicId = (topicId || 'matcher').toLowerCase().replace(/[^a-z0-9-]+/g, '');

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(
      colRef,
      where('topicId', '==', cleanTopicId),
      where('level', '==', Number(level)),
      where('grade', '==', Number(grade)),
      orderBy('timeSeconds', 'asc'),
      orderBy('mistakes', 'asc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    const results: MatcherScoreRecord[] = [];
    snapshot.forEach((docSnap) => {
      results.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<MatcherScoreRecord, 'id'>)
      });
    });

    if (results.length > 0) {
      return results;
    }
  } catch (err) {
    console.warn('Firestore matcher leaderboard fetch failed or index missing, using local cache:', err);
  }

  // Fallback a helyi mentésekből
  const localScores = getLocalScores();
  const filtered = localScores.filter(
    (s) =>
      s.topicId === cleanTopicId &&
      Number(s.level) === Number(level) &&
      Number(s.grade) === Number(grade)
  );

  filtered.sort((a, b) => {
    if (a.timeSeconds !== b.timeSeconds) {
      return a.timeSeconds - b.timeSeconds;
    }
    return a.mistakes - b.mistakes;
  });

  return filtered.slice(0, limitCount);
}

/**
 * Formázott idő másodpercekből (mm:ss)
 */
export function formatMatcherTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
