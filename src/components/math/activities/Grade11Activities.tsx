import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const G11AcuteTangentTheory = lazy(() => import("@/components/math/grade-11/trigonometria/hegyesszog-tangense/AcuteTangentTheory").then(m => ({ default: m.AcuteTangentTheory })))
const G11AcuteTangentQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/hegyesszog-tangense/AcuteTangentQuiz").then(m => ({ default: m.AcuteTangentQuiz })))
const G11TangentCalcTheory = lazy(() => import("@/components/math/grade-11/trigonometria/szamolas-szogek-tangensevel/TangentCalcTheory").then(m => ({ default: m.TangentCalcTheory })))
const G11TangentCalcQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/szamolas-szogek-tangensevel/TangentCalcQuiz").then(m => ({ default: m.TangentCalcQuiz })))
const G11AcuteSineCosineTheory = lazy(() => import("@/components/math/grade-11/trigonometria/hegyesszog-szinusza-koszinusza/AcuteSineCosineTheory").then(m => ({ default: m.AcuteSineCosineTheory })))
const G11AcuteSineCosineQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/hegyesszog-szinusza-koszinusza/AcuteSineCosineQuiz").then(m => ({ default: m.AcuteSineCosineQuiz })))
const G11TrigPropertiesTheory = lazy(() => import("@/components/math/grade-11/trigonometria/a-szogfuggvenyek-tulajdonsagai/TrigPropertiesTheory").then(m => ({ default: m.TrigPropertiesTheory })))
const G11TrigPropertiesQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/a-szogfuggvenyek-tulajdonsagai/TrigPropertiesQuiz").then(m => ({ default: m.TrigPropertiesQuiz })))
const G11RightTriangleSolvingTheory = lazy(() => import("@/components/math/grade-11/trigonometria/hosszusagok-es-szogek-kiszamitasa/RightTriangleSolvingTheory").then(m => ({ default: m.RightTriangleSolvingTheory })))
const G11RightTriangleSolvingQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/hosszusagok-es-szogek-kiszamitasa/RightTriangleSolvingQuiz").then(m => ({ default: m.RightTriangleSolvingQuiz })))
const G11TrigAreaFormulaTheory = lazy(() => import("@/components/math/grade-11/trigonometria/uj-teruletkeplet/TrigAreaFormulaTheory").then(m => ({ default: m.TrigAreaFormulaTheory })))
const G11TrigAreaFormulaQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/uj-teruletkeplet/TrigAreaFormulaQuiz").then(m => ({ default: m.TrigAreaFormulaQuiz })))
const G11TowerHeightTrigTheory = lazy(() => import("@/components/math/grade-11/trigonometria/milyen-magas-a-torony/TowerHeightTrigTheory").then(m => ({ default: m.TowerHeightTrigTheory })))
const G11TowerHeightTrigQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/milyen-magas-a-torony/TowerHeightTrigQuiz").then(m => ({ default: m.TowerHeightTrigQuiz })))
const G11ObtuseSineTheory = lazy(() => import("@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-szinusza/ObtuseSineTheory").then(m => ({ default: m.ObtuseSineTheory })))
const G11ObtuseSineQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-szinusza/ObtuseSineQuiz").then(m => ({ default: m.ObtuseSineQuiz })))
const G11SineLawTheory = lazy(() => import("@/components/math/grade-11/trigonometria/a-szinusztetel/SineLawTheory").then(m => ({ default: m.SineLawTheory })))
const G11SineLawQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/a-szinusztetel/SineLawQuiz").then(m => ({ default: m.SineLawQuiz })))
const G11SineLawApplicationsTheory = lazy(() => import("@/components/math/grade-11/trigonometria/alkalmazasok-szinusztetel/SineLawApplicationsTheory").then(m => ({ default: m.SineLawApplicationsTheory })))
const G11SineLawApplicationsQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/alkalmazasok-szinusztetel/SineLawApplicationsQuiz").then(m => ({ default: m.SineLawApplicationsQuiz })))
const G11ObtuseCosineTheory = lazy(() => import("@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-koszinusza/ObtuseCosineTheory").then(m => ({ default: m.ObtuseCosineTheory })))
const G11ObtuseCosineQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-koszinusza/ObtuseCosineQuiz").then(m => ({ default: m.ObtuseCosineQuiz })))
const G11CosineLawTheory = lazy(() => import("@/components/math/grade-11/trigonometria/a-koszinusztetel/CosineLawTheory").then(m => ({ default: m.CosineLawTheory })))
const G11CosineLawQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/a-koszinusztetel/CosineLawQuiz").then(m => ({ default: m.CosineLawQuiz })))
const G11PolygonTrigTheory = lazy(() => import("@/components/math/grade-11/trigonometria/sokszogek-es-szogfuggvenyek/PolygonTrigTheory").then(m => ({ default: m.PolygonTrigTheory })))
const G11PolygonTrigQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/sokszogek-es-szogfuggvenyek/PolygonTrigQuiz").then(m => ({ default: m.PolygonTrigQuiz })))
const G11TrigRegularPolygonsTheory = lazy(() => import("@/components/math/grade-11/trigonometria/a-kor-es-a-szabalyos-sokszogek/TrigRegularPolygonsTheory").then(m => ({ default: m.TrigRegularPolygonsTheory })))
const G11TrigRegularPolygonsQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/a-kor-es-a-szabalyos-sokszogek/TrigRegularPolygonsQuiz").then(m => ({ default: m.TrigRegularPolygonsQuiz })))
const G11TrigGroupCompetitionTheory = lazy(() => import("@/components/math/grade-11/trigonometria/csoportverseny/TrigGroupCompetitionTheory").then(m => ({ default: m.TrigGroupCompetitionTheory })))
const G11TrigGroupCompetitionQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/csoportverseny/TrigGroupCompetitionQuiz").then(m => ({ default: m.TrigGroupCompetitionQuiz })))
const G11TrigPracticeExamTheory = lazy(() => import("@/components/math/grade-11/trigonometria/gyakorlas-tudasproba/TrigPracticeExamTheory").then(m => ({ default: m.TrigPracticeExamTheory })))
const G11TrigPracticeExamQuiz = lazy(() => import("@/components/math/grade-11/trigonometria/gyakorlas-tudasproba/TrigPracticeExamQuiz").then(m => ({ default: m.TrigPracticeExamQuiz })))

export const Grade11Activities: React.FC<ActivityRouterProps> = ({
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
      {/* ===== 11. Osztály – I. Trigonometria ===== */}

      {/* 1. Hegyesszög tangense */}
      {activityType === 'g11-trig-tangens-fogalma-theory' && (
        <G11AcuteTangentTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-tangens-fogalma-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tangens-fogalma-quiz' && (
        <G11AcuteTangentQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tangens-fogalma-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tangens-fogalma-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tangens-fogalma-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tangens-fogalma-matcher' && (
        <G11AcuteTangentQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tangens-fogalma-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tangens-fogalma-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tangens-fogalma-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tangens-fogalma-sorter' && (
        <G11AcuteTangentQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tangens-fogalma-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tangens-fogalma-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tangens-fogalma-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 2. Számolás szögek tangensével */}
      {activityType === 'g11-trig-tangens-szamolas-theory' && (
        <G11TangentCalcTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-tangens-szamolas-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tangens-szamolas-quiz' && (
        <G11TangentCalcQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tangens-szamolas-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tangens-szamolas-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tangens-szamolas-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tangens-szamolas-matcher' && (
        <G11TangentCalcQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tangens-szamolas-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tangens-szamolas-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tangens-szamolas-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tangens-szamolas-sorter' && (
        <G11TangentCalcQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tangens-szamolas-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tangens-szamolas-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tangens-szamolas-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 3. Hegyesszög szinusza, koszinusza */}
      {activityType === 'g11-trig-szinusz-koszinusz-theory' && (
        <G11AcuteSineCosineTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-szinusz-koszinusz-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szinusz-koszinusz-quiz' && (
        <G11AcuteSineCosineQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szinusz-koszinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szinusz-koszinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szinusz-koszinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szinusz-koszinusz-matcher' && (
        <G11AcuteSineCosineQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szinusz-koszinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szinusz-koszinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szinusz-koszinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szinusz-koszinusz-sorter' && (
        <G11AcuteSineCosineQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szinusz-koszinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szinusz-koszinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szinusz-koszinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 4. A szögfüggvények tulajdonságai */}
      {activityType === 'g11-trig-tulajdonsagok-theory' && (
        <G11TrigPropertiesTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-tulajdonsagok-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tulajdonsagok-quiz' && (
        <G11TrigPropertiesQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tulajdonsagok-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tulajdonsagok-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tulajdonsagok-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tulajdonsagok-matcher' && (
        <G11TrigPropertiesQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tulajdonsagok-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tulajdonsagok-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tulajdonsagok-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tulajdonsagok-sorter' && (
        <G11TrigPropertiesQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tulajdonsagok-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tulajdonsagok-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tulajdonsagok-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 5. Hosszúságok és szögek kiszámítása */}
      {activityType === 'g11-trig-derekszogu-megoldas-theory' && (
        <G11RightTriangleSolvingTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-derekszogu-megoldas-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-derekszogu-megoldas-quiz' && (
        <G11RightTriangleSolvingQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-derekszogu-megoldas-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-derekszogu-megoldas-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-derekszogu-megoldas-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-derekszogu-megoldas-matcher' && (
        <G11RightTriangleSolvingQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-derekszogu-megoldas-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-derekszogu-megoldas-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-derekszogu-megoldas-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-derekszogu-megoldas-sorter' && (
        <G11RightTriangleSolvingQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-derekszogu-megoldas-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-derekszogu-megoldas-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-derekszogu-megoldas-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 6. Új területképlet */}
      {activityType === 'g11-trig-teruletkeplet-theory' && (
        <G11TrigAreaFormulaTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-teruletkeplet-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-teruletkeplet-quiz' && (
        <G11TrigAreaFormulaQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-teruletkeplet-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-teruletkeplet-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-teruletkeplet-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-teruletkeplet-matcher' && (
        <G11TrigAreaFormulaQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-teruletkeplet-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-teruletkeplet-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-teruletkeplet-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-teruletkeplet-sorter' && (
        <G11TrigAreaFormulaQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-teruletkeplet-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-teruletkeplet-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-teruletkeplet-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* Ráadás – Milyen magas a torony? */}
      {activityType === 'g11-trig-torony-theory' && (
        <G11TowerHeightTrigTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-torony-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-torony-quiz' && (
        <G11TowerHeightTrigQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-torony-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-torony-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-torony-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-torony-matcher' && (
        <G11TowerHeightTrigQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-torony-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-torony-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-torony-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-torony-sorter' && (
        <G11TowerHeightTrigQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-torony-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-torony-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-torony-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 7. A tompaszög és a derékszög szinusza */}
      {activityType === 'g11-trig-tompaszog-szinusz-theory' && (
        <G11ObtuseSineTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-tompaszog-szinusz-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tompaszog-szinusz-quiz' && (
        <G11ObtuseSineQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tompaszog-szinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tompaszog-szinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tompaszog-szinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tompaszog-szinusz-matcher' && (
        <G11ObtuseSineQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tompaszog-szinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tompaszog-szinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tompaszog-szinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tompaszog-szinusz-sorter' && (
        <G11ObtuseSineQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tompaszog-szinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tompaszog-szinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tompaszog-szinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 8. A szinusztétel */}
      {activityType === 'g11-trig-szinusztetel-theory' && (
        <G11SineLawTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-szinusztetel-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szinusztetel-quiz' && (
        <G11SineLawQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szinusztetel-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szinusztetel-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szinusztetel-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szinusztetel-matcher' && (
        <G11SineLawQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szinusztetel-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szinusztetel-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szinusztetel-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szinusztetel-sorter' && (
        <G11SineLawQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szinusztetel-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szinusztetel-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szinusztetel-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 9. Alkalmazások */}
      {activityType === 'g11-trig-alkalmazasok-theory' && (
        <G11SineLawApplicationsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-alkalmazasok-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-alkalmazasok-quiz' && (
        <G11SineLawApplicationsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-alkalmazasok-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-alkalmazasok-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-alkalmazasok-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-alkalmazasok-matcher' && (
        <G11SineLawApplicationsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-alkalmazasok-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-alkalmazasok-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-alkalmazasok-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-alkalmazasok-sorter' && (
        <G11SineLawApplicationsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-alkalmazasok-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-alkalmazasok-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-alkalmazasok-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 10. A tompaszög és a derékszög koszinusza */}
      {activityType === 'g11-trig-tompaszog-koszinusz-theory' && (
        <G11ObtuseCosineTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tompaszog-koszinusz-quiz' && (
        <G11ObtuseCosineQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tompaszog-koszinusz-matcher' && (
        <G11ObtuseCosineQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tompaszog-koszinusz-sorter' && (
        <G11ObtuseCosineQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tompaszog-koszinusz-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 11. A koszinusztétel */}
      {activityType === 'g11-trig-koszinusztetel-theory' && (
        <G11CosineLawTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-koszinusztetel-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-koszinusztetel-quiz' && (
        <G11CosineLawQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-koszinusztetel-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-koszinusztetel-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-koszinusztetel-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-koszinusztetel-matcher' && (
        <G11CosineLawQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-koszinusztetel-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-koszinusztetel-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-koszinusztetel-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-koszinusztetel-sorter' && (
        <G11CosineLawQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-koszinusztetel-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-koszinusztetel-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-koszinusztetel-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 12. Sokszögek és szögfüggvények */}
      {activityType === 'g11-trig-sokszogek-theory' && (
        <G11PolygonTrigTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-sokszogek-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-sokszogek-quiz' && (
        <G11PolygonTrigQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-sokszogek-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-sokszogek-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-sokszogek-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-sokszogek-matcher' && (
        <G11PolygonTrigQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-sokszogek-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-sokszogek-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-sokszogek-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-sokszogek-sorter' && (
        <G11PolygonTrigQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-sokszogek-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-sokszogek-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-sokszogek-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 13. A kör és a szabályos sokszögek */}
      {activityType === 'g11-trig-szabalyos-sokszogek-theory' && (
        <G11TrigRegularPolygonsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szabalyos-sokszogek-quiz' && (
        <G11TrigRegularPolygonsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szabalyos-sokszogek-matcher' && (
        <G11TrigRegularPolygonsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-szabalyos-sokszogek-sorter' && (
        <G11TrigRegularPolygonsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-szabalyos-sokszogek-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 14. Csoportverseny */}
      {activityType === 'g11-trig-csoportverseny-theory' && (
        <G11TrigGroupCompetitionTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-csoportverseny-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-csoportverseny-quiz' && (
        <G11TrigGroupCompetitionQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-csoportverseny-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-csoportverseny-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-csoportverseny-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-csoportverseny-matcher' && (
        <G11TrigGroupCompetitionQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-csoportverseny-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-csoportverseny-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-csoportverseny-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-csoportverseny-sorter' && (
        <G11TrigGroupCompetitionQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-csoportverseny-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-csoportverseny-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-csoportverseny-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}

      {/* 15. Gyakorlás, tudáspróba */}
      {activityType === 'g11-trig-tudasproba-theory' && (
        <G11TrigPracticeExamTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-trig-tudasproba-quiz', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tudasproba-quiz' && (
        <G11TrigPracticeExamQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tudasproba-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tudasproba-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tudasproba-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tudasproba-matcher' && (
        <G11TrigPracticeExamQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tudasproba-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tudasproba-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tudasproba-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
      {activityType === 'g11-trig-tudasproba-sorter' && (
        <G11TrigPracticeExamQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-trig-tudasproba-theory', selectedTopic || 'g11-trigonometria')}
          onSwitchToMatcher={() => handleActivitySelect('g11-trig-tudasproba-matcher', selectedTopic || 'g11-trigonometria')}
          onSwitchToSorter={() => handleActivitySelect('g11-trig-tudasproba-sorter', selectedTopic || 'g11-trigonometria')}
        />
      )}
    </>
  );
};
