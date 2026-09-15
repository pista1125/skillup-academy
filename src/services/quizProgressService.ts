import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';

export interface QuizProgressRecord {
  id: string; // "${userId}__${quizId}"
  quizId: string; // "${grade}__${chapterId}__${topicId}__${gameType}__lvl${level}"
  userId: string;
  userCode?: string;
  studentName: string;
  studentEmail?: string;

  // Helymeghatározás
  grade: number; // 5
  chapterId: string; // "egesz-szamok"
  topicId: string; // "negativ-szamok"
  topicTitle?: string; // "Negatív számok"
  gameType: 'quiz' | 'matcher' | 'sorter';
  level: number; // 1 | 2 | 3

  // Eredmények
  completed: boolean;
  bestScore: number; // Százalék (0 - 100)
  lastScore: number; // Legutóbbi százalék (0 - 100)
  scorePoints?: number; // Elért pontok (pl. 10)
  totalQuestions?: number; // Összes kérdés (pl. 10)
  bestStreak?: number;
  attemptsCount: number; // Hányszor végezte el

  // Időbélyegek
  firstCompletedAt: string;
  lastCompletedAt: string;
}

const COLLECTION_NAME = 'quiz_progress';

/**
 * Determinisztikus kvíz- és játékazonosító generálása
 */
export function generateQuizId(
  grade: number | string = 5,
  chapterId: string = 'egesz-szamok',
  topicId: string = 'altalanos',
  gameType: 'quiz' | 'matcher' | 'sorter' = 'quiz',
  level: number | string = 1
): string {
  const cleanGrade = String(grade).replace('grade-', '').replace('g', '');
  return `${cleanGrade}__${chapterId}__${topicId}__${gameType}__lvl${level}`;
}

export interface SaveQuizProgressParams {
  userId: string;
  studentName: string;
  studentEmail?: string;
  userCode?: string;
  grade?: number;
  chapterId?: string;
  topicId?: string;
  topicTitle?: string;
  title?: string;
  gameType?: 'quiz' | 'matcher' | 'sorter';
  level?: number;
  percentage?: number;
  score?: number;
  scorePoints?: number;
  totalQuestions?: number;
  bestStreak?: number;
  quizId?: string;
  completed?: boolean;
}

/**
 * Kvíz / Játék eredményének elmentése vagy frissítése
 */
export async function saveQuizProgress(params: SaveQuizProgressParams): Promise<void> {
  if (!params.userId) return;

  const grade = params.grade || 5;
  const chapterId = params.chapterId || 'egesz-szamok';
  const topicId = params.topicId || 'altalanos';
  const gameType = params.gameType || 'quiz';
  const level = params.level || 1;

  const quizId = params.quizId || generateQuizId(grade, chapterId, topicId, gameType, level);
  const docId = `${params.userId}__${quizId}`;
  const docRef = doc(db, COLLECTION_NAME, docId);

  try {
    const existingSnap = await getDoc(docRef);
    const now = new Date().toISOString();
    const rawPct = params.percentage !== undefined ? params.percentage : (params.score !== undefined ? params.score : 100);
    const currentPercentage = Math.round(rawPct);
    const displayTitle = params.topicTitle || params.title || topicId;

    if (existingSnap.exists()) {
      const prevData = existingSnap.data() as QuizProgressRecord;
      const updatedAttempts = (prevData.attemptsCount || 1) + 1;
      const updatedBest = Math.max(prevData.bestScore || 0, currentPercentage);
      const updatedStreak = Math.max(prevData.bestStreak || 0, params.bestStreak || 0);

      await setDoc(
        docRef,
        {
          studentName: params.studentName || prevData.studentName || 'Diák',
          studentEmail: params.studentEmail || prevData.studentEmail || '',
          userCode: params.userCode || prevData.userCode || '',
          completed: true,
          bestScore: updatedBest,
          lastScore: currentPercentage,
          scorePoints: params.scorePoints ?? prevData.scorePoints,
          totalQuestions: params.totalQuestions ?? prevData.totalQuestions,
          bestStreak: updatedStreak,
          attemptsCount: updatedAttempts,
          lastCompletedAt: now
        },
        { merge: true }
      );
    } else {
      const newRecord: QuizProgressRecord = {
        id: docId,
        quizId,
        userId: params.userId,
        studentName: params.studentName || 'Diák',
        studentEmail: params.studentEmail || '',
        userCode: params.userCode || '',
        grade,
        chapterId,
        topicId,
        topicTitle: displayTitle,
        gameType,
        level,
        completed: true,
        bestScore: currentPercentage,
        lastScore: currentPercentage,
        scorePoints: params.scorePoints ?? 10,
        totalQuestions: params.totalQuestions ?? 10,
        bestStreak: params.bestStreak || 0,
        attemptsCount: 1,
        firstCompletedAt: now,
        lastCompletedAt: now
      };

      await setDoc(docRef, newRecord);
    }
  } catch (error) {
    console.error('Hiba történt a kvíz haladás mentésekor:', error);
  }
}

/**
 * Egy adott diák összes kvíz és játék haladásának valós idejű figyelése
 */
export function subscribeUserProgress(
  userId: string,
  onData: (progressMap: Record<string, QuizProgressRecord>) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  if (!userId) {
    onData({});
    return () => {};
  }

  const colRef = collection(db, COLLECTION_NAME);
  const q = query(colRef, where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const map: Record<string, QuizProgressRecord> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as QuizProgressRecord;
        if (data.quizId) {
          map[data.quizId] = data;
        }
        // Könnyebb kulcsolhatóság: topicId + gameType + level szerint is
        const shortKey = `${data.topicId}__${data.gameType}__${data.level}`;
        map[shortKey] = data;

        // Csak topic szerint is a legjobb pontszám
        if (!map[data.topicId] || (map[data.topicId].bestScore < data.bestScore)) {
          map[data.topicId] = data;
        }
      });
      onData(map);
    },
    (err) => {
      console.error('Hiba a diák haladás feliratkozásakor:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Egy tanári osztályba tartozó diákok összes haladásának lekérése
 */
export function subscribeClassProgress(
  studentIds: string[],
  onData: (records: QuizProgressRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  if (!studentIds || studentIds.length === 0) {
    onData([]);
    return () => {};
  }

  // Firestore `in` lekérdezés max 30 elemet fogad el
  const chunkSize = 30;
  const chunks: string[][] = [];
  for (let i = 0; i < studentIds.length; i += chunkSize) {
    chunks.push(studentIds.slice(i, i + chunkSize));
  }

  const colRef = collection(db, COLLECTION_NAME);
  const unsubs: Unsubscribe[] = [];
  const resultsByChunk: Record<number, QuizProgressRecord[]> = {};

  const notify = () => {
    const allRecords: QuizProgressRecord[] = [];
    Object.values(resultsByChunk).forEach((arr) => allRecords.push(...arr));
    onData(allRecords);
  };

  chunks.forEach((chunk, index) => {
    const q = query(colRef, where('userId', 'in', chunk));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const records: QuizProgressRecord[] = [];
        snapshot.forEach((docSnap) => {
          records.push(docSnap.data() as QuizProgressRecord);
        });
        resultsByChunk[index] = records;
        notify();
      },
      (err) => {
        console.error('Hiba az osztály haladás lekérésekor:', err);
        if (onError) onError(err);
      }
    );
    unsubs.push(unsub);
  });

  return () => {
    unsubs.forEach((u) => u());
  };
}
