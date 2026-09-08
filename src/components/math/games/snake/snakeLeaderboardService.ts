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
    Timestamp
} from 'firebase/firestore';

export interface SnakeScoreRecord {
    id?: string;
    userId: string | null;
    playerName: string;
    userCode?: string;
    grade: number;
    operation: string;
    difficulty: string;
    score: number;
    correctCount: number;
    bestStreak: number;
    createdAt: string; // ISO string or formatted date
}

const COLLECTION_NAME = 'snake_leaderboard';
const LOCAL_STORAGE_KEY = 'math_snake_local_scores_v1';

/**
 * Helper to get local backup scores from localStorage
 */
function getLocalScores(): SnakeScoreRecord[] {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        console.error('Error reading local snake scores:', e);
        return [];
    }
}

/**
 * Helper to save score to local backup
 */
function saveLocalScore(record: SnakeScoreRecord) {
    try {
        const current = getLocalScores();
        const updated = [record, ...current].slice(0, 100);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
        console.error('Error saving local snake score:', e);
    }
}

/**
 * Save a new snake game score to Firestore (and localStorage cache)
 */
export async function saveSnakeScore(data: {
    userId: string | null;
    playerName: string;
    userCode?: string;
    grade: number;
    operation: string;
    difficulty: string;
    score: number;
    correctCount: number;
    bestStreak: number;
}): Promise<{ success: boolean; id?: string; error?: any }> {
    const nowIso = new Date().toISOString();
    const cleanRecord: SnakeScoreRecord = {
        userId: data.userId || null,
        playerName: data.playerName.trim() || 'Névtelen Kígyómester',
        userCode: data.userCode || undefined,
        grade: Number(data.grade) || 1,
        operation: data.operation || 'MIXED',
        difficulty: data.difficulty || 'MEDIUM',
        score: Number(data.score) || 0,
        correctCount: Number(data.correctCount) || 0,
        bestStreak: Number(data.bestStreak) || 0,
        createdAt: nowIso
    };

    // Save to local cache first
    saveLocalScore(cleanRecord);

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...cleanRecord,
            timestamp: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.warn('Firestore save failed for snake score (saved to local backup):', error);
        return { success: true, id: 'local_' + Date.now() };
    }
}

/**
 * Get top 10 (or custom limit) snake scores, optionally filtered by grade
 */
export async function getTopSnakeScores(
    grade?: number | null,
    limitCount: number = 10
): Promise<SnakeScoreRecord[]> {
    try {
        let scores: SnakeScoreRecord[] = [];

        // Try querying Firestore
        try {
            let q;
            if (grade && grade > 0) {
                q = query(
                    collection(db, COLLECTION_NAME),
                    where('grade', '==', Number(grade)),
                    orderBy('score', 'desc'),
                    limit(limitCount * 2)
                );
            } else {
                q = query(
                    collection(db, COLLECTION_NAME),
                    orderBy('score', 'desc'),
                    limit(limitCount * 2)
                );
            }

            const snapshot = await getDocs(q);
            snapshot.forEach(docSnap => {
                const data = docSnap.data();
                let dateStr = new Date().toISOString();
                if (data.timestamp instanceof Timestamp) {
                    dateStr = data.timestamp.toDate().toISOString();
                } else if (data.createdAt) {
                    dateStr = data.createdAt;
                }

                scores.push({
                    id: docSnap.id,
                    userId: data.userId || null,
                    playerName: data.playerName || 'Játékos',
                    userCode: data.userCode || undefined,
                    grade: Number(data.grade) || 1,
                    operation: data.operation || 'MIXED',
                    difficulty: data.difficulty || 'MEDIUM',
                    score: Number(data.score) || 0,
                    correctCount: Number(data.correctCount) || 0,
                    bestStreak: Number(data.bestStreak) || 0,
                    createdAt: dateStr
                });
            });
        } catch (firestoreErr) {
            console.warn('Firestore query error, falling back to local scores:', firestoreErr);
        }

        // Merge with local scores to ensure newly created offline/local scores are immediately visible
        const localScores = getLocalScores();
        const mergedMap = new Map<string, SnakeScoreRecord>();

        scores.forEach(s => {
            if (s.id) mergedMap.set(s.id, s);
        });

        localScores.forEach((ls, idx) => {
            const key = `${ls.playerName}_${ls.grade}_${ls.score}_${ls.createdAt}`;
            if (!mergedMap.has(key)) {
                if (!grade || ls.grade === Number(grade)) {
                    mergedMap.set(key, { ...ls, id: ls.id || `local_${idx}` });
                }
            }
        });

        const allMerged = Array.from(mergedMap.values());

        // Sort descending by score, then by correctCount, then by bestStreak
        allMerged.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
            return b.bestStreak - a.bestStreak;
        });

        // Filter by grade if specified
        const filtered = (grade && grade > 0)
            ? allMerged.filter(s => s.grade === Number(grade))
            : allMerged;

        return filtered.slice(0, limitCount);
    } catch (e) {
        console.error('Error fetching top snake scores:', e);
        return [];
    }
}
