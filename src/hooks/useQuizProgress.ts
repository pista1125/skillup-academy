import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  subscribeUserProgress,
  QuizProgressRecord,
  generateQuizId
} from '@/services/quizProgressService';

export interface TopicProgressResult {
  isCompleted: boolean;
  hasStarted: boolean;
  bestScore?: number;
  attemptsCount?: number;
  completedLevelsCount: number;
  levelScores: {
    1?: number;
    2?: number;
    3?: number;
  };
}

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
    return progressMap[id] || progressMap[`${topicId}__${gameType}__${level}`] || progressMap[`${topicId}__${level}`];
  };

  const getTopicProgress = (topicKey: string): TopicProgressResult => {
    if (!topicKey) {
      return { isCompleted: false, hasStarted: false, completedLevelsCount: 0, levelScores: {} };
    }

    const cleanKey = topicKey
      .toLowerCase()
      .replace(/^g[0-9]+-/, '')
      .replace(/^rat-/, '')
      .replace(/^sec-/, '')
      .replace(/-(quiz|matcher|sorter|theory)$/, '');

    const matchingRecords: QuizProgressRecord[] = [];
    const seenIds = new Set<string>();

    const allRecords = Object.values(progressMap);
    for (const rec of allRecords) {
      if (!rec || !rec.id || seenIds.has(rec.id)) continue;
      seenIds.add(rec.id);

      const recTopic = (rec.topicId || '').toLowerCase();
      const recTopicClean = recTopic
        .replace(/^g[0-9]+-/, '')
        .replace(/^rat-/, '')
        .replace(/^sec-/, '')
        .replace(/-(quiz|matcher|sorter|theory)$/, '');

      const recQuizId = (rec.quizId || '').toLowerCase();

      const recTitle = (rec.title || rec.topicTitle || '').toLowerCase();

      const titleMatches = (
        (cleanKey === 'logic' && (recTitle.includes('logik') || recTopicClean.includes('logik'))) ||
        (cleanKey === 'set-basics' && (recTitle.includes('halmazokr') || recTitle.includes('halmazok alap') || recTopicClean.includes('halmaz-alap') || recTopicClean.includes('halmazok-alap'))) ||
        (cleanKey === 'set-operations' && (recTitle.includes('halmazművelet') || recTitle.includes('műveletek halmaz') || recTopicClean.includes('halmaz-muvelet') || recTopicClean.includes('set-op'))) ||
        (cleanKey === 'rational-set' && (recTitle.includes('racionális számok halmaza') || recTopicClean.includes('racionalis-halmaz'))) ||
        (cleanKey === 'rational-operations' && (recTitle.includes('mit tudunk a racionális') || recTopicClean.includes('racionalis-muvelet'))) ||
        (cleanKey === 'powers' && (recTitle.includes('hatvány') || recTopicClean.includes('hatvany'))) ||
        (cleanKey === 'sqrt-concept' && (recTitle.includes('négyzetgyök fogalm') || recTopicClean.includes('negyzetgyok-fogalom') || recTopicClean.includes('gyokfogalom'))) ||
        (cleanKey === 'square-roots' && (recTitle.includes('számok négyzetgyöke') || recTopicClean.includes('szamok-negyzetgyoke') || recTopicClean.includes('negyzetgyok'))) ||
        (cleanKey === 'algebra-intro' && (recTitle.includes('betűs kifejezések') || recTopicClean.includes('betus-ismetles') || recTopicClean.includes('betus-kif'))) ||
        (cleanKey === 'factoring' && (recTitle.includes('kiemelés') || recTitle.includes('szorzása és a kiemelés') || recTopicClean.includes('betus-szorzas'))) ||
        (cleanKey === 'polynomial-mult' && (recTitle.includes('többtagú') || recTopicClean.includes('tobbtagu'))) ||
        (cleanKey === 'chapter1-summary' && (recTitle.includes('összefoglaló') || recTitle.includes('nagyteszt') || recTopicClean.includes('chapter-summary') || recTopicClean.includes('summary')))
      );

      const isMatch =
        rec.topicId === topicKey ||
        recTopicClean === cleanKey ||
        (cleanKey.length > 3 && recTopicClean.includes(cleanKey)) ||
        (cleanKey.length > 3 && recQuizId.includes(cleanKey)) ||
        titleMatches;

      if (isMatch) {
        matchingRecords.push(rec);
      }
    }

    const levelScores: { 1?: number; 2?: number; 3?: number } = {};
    let totalAttempts = 0;
    let maxScore = 0;
    let sumScore = 0;
    let scoredLevelsCount = 0;

    for (const rec of matchingRecords) {
      let lvl: 1 | 2 | 3 = 1;
      if (rec.level === 1 || rec.level === 2 || rec.level === 3) {
        lvl = rec.level;
      } else if (rec.quizId?.includes('lvl1') || rec.quizId?.includes('level1')) {
        lvl = 1;
      } else if (rec.quizId?.includes('lvl2') || rec.quizId?.includes('level2')) {
        lvl = 2;
      } else if (rec.quizId?.includes('lvl3') || rec.quizId?.includes('level3')) {
        lvl = 3;
      }

      const scoreValue = rec.bestScore !== undefined ? rec.bestScore : (rec.lastScore ?? 100);
      if (levelScores[lvl] === undefined || scoreValue > (levelScores[lvl] || 0)) {
        levelScores[lvl] = scoreValue;
      }
      totalAttempts += rec.attemptsCount || 1;
    }

    const completedLevels = Object.keys(levelScores).map(Number) as (1 | 2 | 3)[];
    const completedLevelsCount = completedLevels.length;
    const hasStarted = completedLevelsCount > 0;

    if (completedLevelsCount > 0) {
      completedLevels.forEach((l) => {
        const s = levelScores[l] || 0;
        sumScore += s;
        scoredLevelsCount++;
        if (s > maxScore) maxScore = s;
      });
    }

    const avgScore = scoredLevelsCount > 0 ? Math.round(sumScore / scoredLevelsCount) : undefined;
    const isCompleted = completedLevelsCount >= 3;

    return {
      isCompleted,
      hasStarted,
      bestScore: avgScore !== undefined ? avgScore : (hasStarted ? maxScore : undefined),
      attemptsCount: totalAttempts > 0 ? totalAttempts : undefined,
      completedLevelsCount,
      levelScores
    };
  };

  return {
    progressMap,
    loading,
    getQuizProgress,
    getTopicProgress
  };
}

export default useQuizProgress;
