import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';

export interface SorterScoreRecord {
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
  heartsRemaining: number;
  stars: number;
  score: number;
  itemsCount: number;
  sortedItemsCount?: number;
  isGameOver?: boolean;
  createdAt: string;
}

const COLLECTION_NAME = 'sorter_leaderboard';
const LOCAL_STORAGE_KEY = 'sorter_local_scores_v1';

/**
 * Helyi gyorsítótár lekérése
 */
function getLocalScores(): SorterScoreRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading local sorter scores:', e);
    return [];
  }
}

/**
 * Eredmény mentése helyi gyorsítótárba
 */
function saveLocalScore(record: SorterScoreRecord) {
  try {
    const current = getLocalScores();
    const updated = [record, ...current].slice(0, 150);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving local sorter score:', e);
  }
}

export interface SaveSorterScoreInput {
  userId?: string | null;
  studentName?: string;
  userName?: string;
  userCode?: string;
  grade?: number;
  chapterId?: string;
  topicId: string;
  topicTitle?: string;
  level: number;
  timeSeconds: number;
  mistakes?: number;
  heartsRemaining?: number;
  stars?: number;
  score: number;
  itemsCount: number;
  sortedItemsCount?: number;
  isGameOver?: boolean;
  [key: string]: any;
}

/**
 * Csoportosító játék eredményének mentése (Firestore + localStorage)
 */
export async function saveSorterScore(
  data: SaveSorterScoreInput
): Promise<{ success: boolean; id: string; error?: any }> {
  const nowIso = new Date().toISOString();
  const rawName = (data.studentName || data.userName || '').trim();
  const safeName = rawName.length > 0 ? rawName : 'Vendég Diák';
  const cleanTopicId = (data.topicId || 'sorter').toLowerCase().replace(/[^a-z0-9-]+/g, '');
  const localId = 'sorter_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);

  const cleanRecord: SorterScoreRecord = {
    id: localId,
    userId: data.userId || null,
    studentName: safeName,
    userCode: data.userCode || undefined,
    grade: Number(data.grade) || 6,
    chapterId: data.chapterId || 'sorter',
    topicId: cleanTopicId,
    topicTitle: data.topicTitle || 'Csoportosító játék',
    level: Number(data.level) || 1,
    timeSeconds: Math.max(1, Number(data.timeSeconds) || 1),
    mistakes: Math.max(0, Number(data.mistakes) || 0),
    heartsRemaining: Math.max(0, Math.min(3, typeof data.heartsRemaining === 'number' ? data.heartsRemaining : 0)),
    stars: Math.max(0, Math.min(3, typeof data.stars === 'number' ? data.stars : 0)),
    score: Math.max(0, Number(data.score) || 0),
    itemsCount: Number(data.itemsCount) || 12,
    sortedItemsCount: typeof data.sortedItemsCount === 'number' ? data.sortedItemsCount : (data.isGameOver ? 0 : Number(data.itemsCount) || 12),
    isGameOver: Boolean(data.isGameOver),
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
    console.warn('Firestore save failed for sorter score (saved to local backup):', error);
    return { success: true, id: localId };
  }
}

/**
 * Top rangsor lekérdezése adott témakör és szint szerint
 */
export async function getTopSorterScores(
  topicId: string,
  level: number,
  limitCount: number = 10,
  grade: number = 6
): Promise<SorterScoreRecord[]> {
  const cleanTopicId = (topicId || 'sorter').toLowerCase().replace(/[^a-z0-9-]+/g, '');
  const numLevel = Number(level) || 1;
  const numGrade = Number(grade) || 6;
  const results: SorterScoreRecord[] = [];

  try {
    const colRef = collection(db, COLLECTION_NAME);
    let snapshot: any = null;
    try {
      const q = query(
        colRef,
        where('topicId', '==', cleanTopicId),
        where('level', '==', numLevel),
        where('grade', '==', numGrade),
        orderBy('score', 'desc'),
        orderBy('timeSeconds', 'asc'),
        limit(limitCount)
      );
      snapshot = await getDocs(q);
    } catch (indexErr) {
      console.warn('Index-based Firestore query failed, falling back to equality query + client sort:', indexErr);
      try {
        const simpleQ = query(
          colRef,
          where('topicId', '==', cleanTopicId),
          where('level', '==', numLevel),
          where('grade', '==', numGrade),
          limit(50)
        );
        snapshot = await getDocs(simpleQ);
      } catch (simpleErr) {
        console.warn('Equality query also failed, falling back to topicId query with in-memory filter:', simpleErr);
        try {
          const broadQ = query(
            colRef,
            where('topicId', '==', cleanTopicId),
            limit(100)
          );
          snapshot = await getDocs(broadQ);
        } catch (broadErr) {
          console.warn('Broad Firestore query also failed:', broadErr);
        }
      }
    }

    if (snapshot && typeof snapshot.forEach === 'function') {
      snapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
        const data = docSnap.data();
        if (
          data.topicId === cleanTopicId &&
          Number(data.level) === numLevel &&
          Number(data.grade) === numGrade
        ) {
          results.push({
            id: docSnap.id,
            ...(data as Omit<SorterScoreRecord, 'id'>)
          });
        }
      });
    }
  } catch (err) {
    console.warn('Firestore sorter leaderboard fetch failed, using local cache:', err);
  }

  // Fallback / merge a helyi mentésekből (hogy az azonnali saját mentés azonnal látszódjon)
  const localScores = getLocalScores();
  const filteredLocal = localScores.filter(
    (s) =>
      s.topicId === cleanTopicId &&
      Number(s.level) === numLevel &&
      Number(s.grade) === numGrade
  );

  const combined = [...results];
  for (const loc of filteredLocal) {
    const isDuplicate = combined.some(
      (c) =>
        (c.id && loc.id && c.id === loc.id) ||
        (c.createdAt && loc.createdAt && c.createdAt === loc.createdAt && (c.studentName === loc.studentName || c.userId === loc.userId))
    );
    if (!isDuplicate) {
      combined.push(loc);
    }
  }

  combined.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if ((b.stars || 0) !== (a.stars || 0)) {
      return (b.stars || 0) - (a.stars || 0);
    }
    return a.timeSeconds - b.timeSeconds;
  });

  return combined.slice(0, limitCount);
}

/**
 * Formázott idő másodpercekből (mm:ss)
 */
export function formatSorterTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
