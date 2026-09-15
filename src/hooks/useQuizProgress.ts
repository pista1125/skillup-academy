import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  subscribeUserProgress,
  QuizProgressRecord,
  generateQuizId
} from '@/services/quizProgressService';

export function useQuizProgress(explicitUserId?: string) {
  const { user } = useAuth();
  const targetUserId = explicitUserId || user?.uid;

  const [progressMap, setProgressMap] = useState<Record<string, QuizProgressRecord>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!targetUserId) {
      setProgressMap({});
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeUserProgress(
      targetUserId,
      (data) => {
        setProgressMap(data);
        setLoading(false);
      },
      (error) => {
        console.error('useQuizProgress hiba:', error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [targetUserId]);

  const getQuizProgress = (
    grade: number | string,
    chapterId: string,
    topicId: string,
    gameType: 'quiz' | 'matcher' | 'sorter' = 'quiz',
    level: number | string = 1
  ): QuizProgressRecord | undefined => {
    const id = generateQuizId(grade, chapterId, topicId, gameType, level);
    return progressMap[id] || progressMap[`${topicId}__${gameType}__${level}`];
  };

  const getTopicProgress = (topicKey: string): { isCompleted: boolean; bestScore?: number; attemptsCount?: number } => {
    if (!topicKey) return { isCompleted: false };

    // 1. Direct match
    if (progressMap[topicKey]) {
      const rec = progressMap[topicKey];
      return { isCompleted: rec.completed, bestScore: rec.bestScore, attemptsCount: rec.attemptsCount };
    }

    // 2. Normalized variants
    const clean = topicKey.toLowerCase().replace(/^g[0-9]+-/, '').replace(/-(quiz|matcher|sorter|theory)$/, '');
    if (progressMap[clean]) {
      const rec = progressMap[clean];
      return { isCompleted: rec.completed, bestScore: rec.bestScore, attemptsCount: rec.attemptsCount };
    }

    // 3. Search anywhere in keys
    const matchKey = Object.keys(progressMap).find(
      (k) => k.includes(clean) || (clean.length > 4 && k.toLowerCase().includes(clean))
    );
    if (matchKey && progressMap[matchKey]) {
      const rec = progressMap[matchKey];
      return { isCompleted: rec.completed, bestScore: rec.bestScore, attemptsCount: rec.attemptsCount };
    }

    return { isCompleted: false };
  };

  return {
    progressMap,
    loading,
    getQuizProgress,
    getTopicProgress
  };
}

export default useQuizProgress;
