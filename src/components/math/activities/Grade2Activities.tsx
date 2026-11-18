import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components (wired per subtopic as completed)
const G2Numbers20G2Theory = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/szamok-0-tol-20-ig/Numbers20G2Theory").then(m => ({ default: m.Numbers20G2Theory })));
const G2Numbers20G2Quiz = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/szamok-0-tol-20-ig/Numbers20G2Quiz").then(m => ({ default: m.Numbers20G2Quiz })));
const G2Add10G2Theory = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/osszeadas-10-es-szamkor/Add10G2Theory").then(m => ({ default: m.Add10G2Theory })));
const G2Add10G2Quiz = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/osszeadas-10-es-szamkor/Add10G2Quiz").then(m => ({ default: m.Add10G2Quiz })));
const G2Sub10G2Theory = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/kivonas-10-es-szamkor/Sub10G2Theory").then(m => ({ default: m.Sub10G2Theory })));
const G2Sub10G2Quiz = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/kivonas-10-es-szamkor/Sub10G2Quiz").then(m => ({ default: m.Sub10G2Quiz })));
const G2Add20G2Theory = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/osszeadas-20-as-szamkor/Add20G2Theory").then(m => ({ default: m.Add20G2Theory })));
const G2Add20G2Quiz = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/osszeadas-20-as-szamkor/Add20G2Quiz").then(m => ({ default: m.Add20G2Quiz })));
const G2Sub20G2Theory = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/kivonas-20-as-szamkor/Sub20G2Theory").then(m => ({ default: m.Sub20G2Theory })));
const G2Sub20G2Quiz = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/kivonas-20-as-szamkor/Sub20G2Quiz").then(m => ({ default: m.Sub20G2Quiz })));
const G2WordProblems20G2Theory = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/szoveges-feladatok/WordProblems20G2Theory").then(m => ({ default: m.WordProblems20G2Theory })));
const G2WordProblems20G2Quiz = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/szoveges-feladatok/WordProblems20G2Quiz").then(m => ({ default: m.WordProblems20G2Quiz })));
const G2Count20ExamG2Theory = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/megallo/Count20ExamG2Theory").then(m => ({ default: m.Count20ExamG2Theory })));
const G2Count20ExamG2Quiz = lazy(() => import("@/components/math/grade-2/szamolas-20-ig/megallo/Count20ExamG2Quiz").then(m => ({ default: m.Count20ExamG2Quiz })));

export const Grade2Activities: React.FC<ActivityRouterProps> = ({
  activityType,
  onBack,
  onActivitySelect,
  selectedTopic,
}) => {
  const handleBack = onBack;
  const handleActivitySelect = onActivitySelect;

  if (!activityType) return null;

  return (
    <>
      {/* ===== 2. Osztály – I. Számolás 0-tól 20-ig ===== */}

      {/* 1. Számok 0-tól 20-ig */}
      {activityType === 'g2-c20-szamok-theory' && (
        <G2Numbers20G2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g2-c20-szamok-quiz', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-szamok-quiz' && (
        <G2Numbers20G2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-szamok-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-szamok-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-szamok-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-szamok-matcher' && (
        <G2Numbers20G2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-szamok-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-szamok-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-szamok-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-szamok-sorter' && (
        <G2Numbers20G2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-szamok-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-szamok-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-szamok-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}

      {/* 2. Összeadás 10-es számkör */}
      {activityType === 'g2-c20-osszeadas10-theory' && (
        <G2Add10G2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g2-c20-osszeadas10-quiz', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-osszeadas10-quiz' && (
        <G2Add10G2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-osszeadas10-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-osszeadas10-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-osszeadas10-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-osszeadas10-matcher' && (
        <G2Add10G2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-osszeadas10-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-osszeadas10-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-osszeadas10-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-osszeadas10-sorter' && (
        <G2Add10G2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-osszeadas10-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-osszeadas10-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-osszeadas10-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}

      {/* 3. Kivonás 10-es számkör */}
      {activityType === 'g2-c20-kivonas10-theory' && (
        <G2Sub10G2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g2-c20-kivonas10-quiz', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-kivonas10-quiz' && (
        <G2Sub10G2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-kivonas10-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-kivonas10-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-kivonas10-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-kivonas10-matcher' && (
        <G2Sub10G2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-kivonas10-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-kivonas10-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-kivonas10-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-kivonas10-sorter' && (
        <G2Sub10G2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-kivonas10-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-kivonas10-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-kivonas10-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}

      {/* 4. Összeadás 20-as számkör */}
      {activityType === 'g2-c20-osszeadas20-theory' && (
        <G2Add20G2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g2-c20-osszeadas20-quiz', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-osszeadas20-quiz' && (
        <G2Add20G2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-osszeadas20-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-osszeadas20-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-osszeadas20-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-osszeadas20-matcher' && (
        <G2Add20G2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-osszeadas20-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-osszeadas20-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-osszeadas20-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-osszeadas20-sorter' && (
        <G2Add20G2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-osszeadas20-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-osszeadas20-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-osszeadas20-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}

      {/* 5. Kivonás 20-as számkör */}
      {activityType === 'g2-c20-kivonas20-theory' && (
        <G2Sub20G2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g2-c20-kivonas20-quiz', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-kivonas20-quiz' && (
        <G2Sub20G2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-kivonas20-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-kivonas20-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-kivonas20-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-kivonas20-matcher' && (
        <G2Sub20G2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-kivonas20-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-kivonas20-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-kivonas20-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-kivonas20-sorter' && (
        <G2Sub20G2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-kivonas20-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-kivonas20-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-kivonas20-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}

      {/* 6. Szöveges feladatok */}
      {activityType === 'g2-c20-szoveges-theory' && (
        <G2WordProblems20G2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g2-c20-szoveges-quiz', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-szoveges-quiz' && (
        <G2WordProblems20G2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-szoveges-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-szoveges-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-szoveges-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-szoveges-matcher' && (
        <G2WordProblems20G2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-szoveges-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-szoveges-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-szoveges-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-szoveges-sorter' && (
        <G2WordProblems20G2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-szoveges-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-szoveges-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-szoveges-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}

      {/* 7. Megálló – tudáspróba */}
      {activityType === 'g2-c20-tudasproba-theory' && (
        <G2Count20ExamG2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g2-c20-tudasproba-quiz', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-tudasproba-quiz' && (
        <G2Count20ExamG2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-tudasproba-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-tudasproba-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-tudasproba-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-tudasproba-matcher' && (
        <G2Count20ExamG2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-tudasproba-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-tudasproba-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-tudasproba-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
      {activityType === 'g2-c20-tudasproba-sorter' && (
        <G2Count20ExamG2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g2-c20-tudasproba-theory', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToMatcher={() => handleActivitySelect('g2-c20-tudasproba-matcher', selectedTopic || 'g2-numbers-to-20')}
          onSwitchToSorter={() => handleActivitySelect('g2-c20-tudasproba-sorter', selectedTopic || 'g2-numbers-to-20')}
        />
      )}
    </>
  );
};
