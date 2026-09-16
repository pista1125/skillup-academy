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
      .replace(/^(g[0-9]+|grade-[0-9]+)-/, '')
      .replace(/^rat-/, '')
      .replace(/^int-sec-[0-9]+-?/, '')
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
        .replace(/^(g[0-9]+|grade-[0-9]+)-/, '')
        .replace(/^rat-/, '')
        .replace(/^int-sec-[0-9]+-?/, '')
        .replace(/^sec-/, '')
        .replace(/-(quiz|matcher|sorter|theory)$/, '');

      const recQuizId = (rec.quizId || '').toLowerCase();

      const recTitle = (rec.title || rec.topicTitle || '').toLowerCase();

      const titleMatches = (
        // Grade 8
        (cleanKey === 'logic' && (recTitle.includes('logik') || recTopicClean.includes('logik'))) ||
        (cleanKey === 'set-basics' && (recTitle.includes('halmazokr') || recTitle.includes('halmazok alap') || recTopicClean.includes('halmaz-alap') || recTopicClean.includes('halmazok-alap') || recTopicClean.includes('halmazokról'))) ||
        (cleanKey === 'set-operations' && (recTitle.includes('halmazművelet') || recTitle.includes('műveletek halmaz') || recTopicClean.includes('halmaz-muvelet') || recTopicClean.includes('set-op'))) ||
        (cleanKey === 'rational-set' && (recTitle.includes('racionális számok halmaza') || recTopicClean.includes('racionalis-halmaz'))) ||
        (cleanKey === 'rational-operations' && (recTitle.includes('mit tudunk a racionális') || recTopicClean.includes('racionalis-muvelet'))) ||
        (cleanKey === 'powers' && (recTitle.includes('hatvány') || recTopicClean.includes('hatvany'))) ||
        (cleanKey === 'sqrt-concept' && (recTitle.includes('négyzetgyök fogalm') || recTopicClean.includes('negyzetgyok-fogalom') || recTopicClean.includes('gyokfogalom') || recTitle.includes('négyzetgyök fogalma'))) ||
        (cleanKey === 'square-roots' && (recTitle.includes('számok négyzetgyöke') || recTopicClean.includes('szamok-negyzetgyoke') || (recTitle.includes('négyzetgyök') && !recTitle.includes('fogalm')))) ||
        (cleanKey === 'algebra-intro' && (recTitle.includes('betűs kifejezések') || recTopicClean.includes('betus-ismetles') || recTopicClean.includes('betus-kif'))) ||
        (cleanKey === 'factoring' && (recTitle.includes('kiemelés') || recTitle.includes('szorzása és a kiemelés') || recTopicClean.includes('betus-szorzas') || recTopicClean.includes('factoring'))) ||
        (cleanKey === 'polynomial-mult' && (recTitle.includes('többtagú') || recTopicClean.includes('tobbtagu') || recTopicClean.includes('polynomial'))) ||
        (cleanKey === 'chapter1-summary' && (recTitle.includes('összefoglaló') || recTitle.includes('nagyteszt') || recTopicClean.includes('chapter-summary') || recTopicClean.includes('summary') || recTopicClean.includes('fejezet-osszefoglalo'))) ||
        // Grade 6
        (cleanKey === 'integers-operations' && (recTitle.includes('műveletek az egész') || recTitle.includes('műveletek kvíz') || recTopicClean.includes('operations'))) ||
        (cleanKey === 'integers-mult' && (recTitle.includes('szorzása') || recTitle.includes('szorzás kvíz') || recTopicClean.includes('mult'))) ||
        (cleanKey === 'integers-div' && (recTitle.includes('osztása') || recTitle.includes('osztás kvíz') || recTopicClean.includes('div'))) ||
        (cleanKey === 'integers-cases' && (recTitle.includes('hány eset') || recTitle.includes('összeszámolás') || recTopicClean.includes('cases'))) ||
        (cleanKey === 'integers-divisors' && (recTitle.includes('osztó, többszörös') || recTitle.includes('osztópárok') || recTopicClean.includes('divisors'))) ||
        (cleanKey === 'integers-remainders' && (recTitle.includes('maradék') || recTopicClean.includes('remainder'))) ||
        (cleanKey === 'integers-factorization' && (recTitle.includes('prímtényez') || recTitle.includes('hány osztója van') || recTopicClean.includes('factorization'))) ||
        (cleanKey === 'integers-divisibility-2-5-10' && (recTitle.includes('2-vel, 5-tel') || recTitle.includes('2, 5, 10') || recTopicClean.includes('2-5-10'))) ||
        (cleanKey === 'integers-divisibility-3-9' && (recTitle.includes('3-mal és 9') || recTitle.includes('3, 9') || recTopicClean.includes('3-9'))) ||
        (cleanKey === 'integers-divisibility-4-100' && (recTitle.includes('4-gyel és 100') || recTitle.includes('4, 100') || recTopicClean.includes('4-100'))) ||
        (cleanKey === 'integers-composite-divisibility' && (recTitle.includes('összetett oszthatóság') || recTopicClean.includes('composite'))) ||
        (cleanKey === 'integers-lcm' && (recTitle.includes('lkkt') || recTitle.includes('többszörös, közös') || recTopicClean.includes('lcm'))) ||
        (cleanKey === 'integers-gcd' && (recTitle.includes('lnko') || recTitle.includes('osztó, közös osztó') || recTopicClean.includes('gcd'))) ||
        (cleanKey === 'integers-summary' && (recTitle.includes('fejezeti összefoglalás') || (recTitle.includes('összefoglal') && recTopicClean.includes('6')) || recTopicClean.includes('summary'))) ||
        // Grade 5
        (cleanKey === 'roman-numerals' && (recTitle.includes('római') || recTitle.includes('romai') || recTopicClean.includes('roman'))) ||
        (cleanKey === 'place-value' && (recTitle.includes('helyiérték') || recTitle.includes('helyiertek') || recTopicClean.includes('place-value'))) ||
        (cleanKey === 'number-reading' && (recTitle.includes('kiolvasás') || recTitle.includes('kiolvasas') || recTitle.includes('csoportosítás') || recTopicClean.includes('reading'))) ||
        (cleanKey === 'number-spelling' && (recTitle.includes('helyesírás') || recTitle.includes('helyesiras') || recTopicClean.includes('spelling'))) ||
        (cleanKey === 'number-systems' && (recTitle.includes('számrendszer') || recTitle.includes('szamrendszer') || recTopicClean.includes('systems'))) ||
        (cleanKey === 'number-line' && (recTitle.includes('számegyenes') || recTitle.includes('szamegyenes') || recTopicClean.includes('line'))) ||
        (cleanKey === 'rounding' && (recTitle.includes('kerekítés') || recTitle.includes('becslés') || recTopicClean.includes('rounding'))) ||
        (cleanKey === 'addition' && ((recTitle.includes('összeadás') || recTitle.includes('osszeadas')) && !recTitle.includes('egész számok') && !recTitle.includes('kivonás') || recTopicClean.includes('addition') && !recTopicClean.includes('integer'))) ||
        (cleanKey === 'subtraction' && ((recTitle.includes('kivonás') || recTitle.includes('kivonas')) && !recTitle.includes('összeadás') && !recTitle.includes('egész számok') || recTopicClean.includes('subtraction') && !recTopicClean.includes('integer'))) ||
        (cleanKey === 'multiplication' && ((recTitle.includes('szorzás') || recTitle.includes('szorzas')) && !recTitle.includes('egész számok') && !recTitle.includes('tizedes') || recTopicClean.includes('multiplication') && !recTopicClean.includes('decimal'))) ||
        (cleanKey === 'division' && ((recTitle.includes('osztás') || recTitle.includes('osztas')) && !recTitle.includes('egész számok') && !recTitle.includes('tizedes') || recTopicClean.includes('division') && !recTopicClean.includes('decimal'))) ||
        (cleanKey === 'order-of-operations' && (recTitle.includes('műveleti sorrend') || recTitle.includes('sorrend') || recTitle.includes('zárójelek') || recTopicClean.includes('order'))) ||
        (cleanKey === 'negative-numbers' && (recTitle.includes('negatív szám') || recTitle.includes('negativ') || recTopicClean.includes('negative'))) ||
        (cleanKey === 'opposite-absolute' && (recTitle.includes('ellentett') || recTitle.includes('abszolút') || recTitle.includes('abszolut') || recTopicClean.includes('opposite') || recTopicClean.includes('absolute'))) ||
        (cleanKey === 'integer-addition-subtraction' && (recTitle.includes('egész számok összeadása') || recTitle.includes('egész számok műveletei') || recTopicClean.includes('integer-addition-subtraction'))) ||
        (cleanKey === 'chapter1-summary' && ((recTitle.includes('összefoglal') || recTitle.includes('témazáró')) && (recTopicClean.includes('g5') || recTopicClean.includes('grade-5') || recTitle.includes('5'))))
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
