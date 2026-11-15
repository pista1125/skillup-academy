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
const G11PasswordsTheory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/jelszavak/PasswordsTheory").then(m => ({ default: m.PasswordsTheory })))
const G11PasswordsQuiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/jelszavak/PasswordsQuiz").then(m => ({ default: m.PasswordsQuiz })))
const G11PermutationsTheory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/sorba-rendezes/PermutationsTheory").then(m => ({ default: m.PermutationsTheory })))
const G11PermutationsQuiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/sorba-rendezes/PermutationsQuiz").then(m => ({ default: m.PermutationsQuiz })))
const G11CombinationsTheory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/amikor-nem-szamit-a-kivalasztas-sorrendje/CombinationsTheory").then(m => ({ default: m.CombinationsTheory })))
const G11CombinationsQuiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/amikor-nem-szamit-a-kivalasztas-sorrendje/CombinationsQuiz").then(m => ({ default: m.CombinationsQuiz })))
const G11BinomialCoefficientsTheory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/binomialis-egyutthatok/BinomialCoefficientsTheory").then(m => ({ default: m.BinomialCoefficientsTheory })))
const G11BinomialCoefficientsQuiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/binomialis-egyutthatok/BinomialCoefficientsQuiz").then(m => ({ default: m.BinomialCoefficientsQuiz })))
const G11CombinatoricsPractice1Theory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-1/CombinatoricsPractice1Theory").then(m => ({ default: m.CombinatoricsPractice1Theory })))
const G11CombinatoricsPractice1Quiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-1/CombinatoricsPractice1Quiz").then(m => ({ default: m.CombinatoricsPractice1Quiz })))
const G11CaseAnalysisTheory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/esetszetvalasztas/CaseAnalysisTheory").then(m => ({ default: m.CaseAnalysisTheory })))
const G11CaseAnalysisQuiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/esetszetvalasztas/CaseAnalysisQuiz").then(m => ({ default: m.CaseAnalysisQuiz })))
const G11CombinatoricsPractice2Theory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-2/CombinatoricsPractice2Theory").then(m => ({ default: m.CombinatoricsPractice2Theory })))
const G11CombinatoricsPractice2Quiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-2/CombinatoricsPractice2Quiz").then(m => ({ default: m.CombinatoricsPractice2Quiz })))
const G11GraphPropertiesTheory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/grafok-jellemzoi/GraphPropertiesTheory").then(m => ({ default: m.GraphPropertiesTheory })))
const G11GraphPropertiesQuiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/grafok-jellemzoi/GraphPropertiesQuiz").then(m => ({ default: m.GraphPropertiesQuiz })))
const G11CombinatoricsGraphsTheory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/kombinatorika-es-grafok/CombinatoricsGraphsTheory").then(m => ({ default: m.CombinatoricsGraphsTheory })))
const G11CombinatoricsGraphsQuiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/kombinatorika-es-grafok/CombinatoricsGraphsQuiz").then(m => ({ default: m.CombinatoricsGraphsQuiz })))
const G11CombinatoricsPracticeExamTheory = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/gyakorlas-tudasproba/CombinatoricsPracticeExamTheory").then(m => ({ default: m.CombinatoricsPracticeExamTheory })))
const G11CombinatoricsPracticeExamQuiz = lazy(() => import("@/components/math/grade-11/kombinatorika-grafok/gyakorlas-tudasproba/CombinatoricsPracticeExamQuiz").then(m => ({ default: m.CombinatoricsPracticeExamQuiz })))
const G11PowersReviewTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/hatvanyozas-ismetles/PowersReviewTheory").then(m => ({ default: m.PowersReviewTheory })))
const G11PowersReviewQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/hatvanyozas-ismetles/PowersReviewQuiz").then(m => ({ default: m.PowersReviewQuiz })))
const G11NthRootTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/szamok-n-edik-gyoke/NthRootTheory").then(m => ({ default: m.NthRootTheory })))
const G11NthRootQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/szamok-n-edik-gyoke/NthRootQuiz").then(m => ({ default: m.NthRootQuiz })))
const G11RationalExponents1Theory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-1/RationalExponents1Theory").then(m => ({ default: m.RationalExponents1Theory })))
const G11RationalExponents1Quiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-1/RationalExponents1Quiz").then(m => ({ default: m.RationalExponents1Quiz })))
const G11RationalExponents2Theory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-2/RationalExponents2Theory").then(m => ({ default: m.RationalExponents2Theory })))
const G11RationalExponents2Quiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-2/RationalExponents2Quiz").then(m => ({ default: m.RationalExponents2Quiz })))
const G11PowerRootPracticeTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-hatvany-gyok/PowerRootPracticeTheory").then(m => ({ default: m.PowerRootPracticeTheory })))
const G11PowerRootPracticeQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-hatvany-gyok/PowerRootPracticeQuiz").then(m => ({ default: m.PowerRootPracticeQuiz })))
const G11FinancialCalcTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/penzugyi-szamitasok/FinancialCalcTheory").then(m => ({ default: m.FinancialCalcTheory })))
const G11FinancialCalcQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/penzugyi-szamitasok/FinancialCalcQuiz").then(m => ({ default: m.FinancialCalcQuiz })))
const G11ExponentialFunctionsTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-fuggvenyek/ExponentialFunctionsTheory").then(m => ({ default: m.ExponentialFunctionsTheory })))
const G11ExponentialFunctionsQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-fuggvenyek/ExponentialFunctionsQuiz").then(m => ({ default: m.ExponentialFunctionsQuiz })))
const G11ExponentialProcessesTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-folyamatok/ExponentialProcessesTheory").then(m => ({ default: m.ExponentialProcessesTheory })))
const G11ExponentialProcessesQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-folyamatok/ExponentialProcessesQuiz").then(m => ({ default: m.ExponentialProcessesQuiz })))
const G11HalfLifeTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/felezesi-ido/HalfLifeTheory").then(m => ({ default: m.HalfLifeTheory })))
const G11HalfLifeQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/felezesi-ido/HalfLifeQuiz").then(m => ({ default: m.HalfLifeQuiz })))
const G11LogarithmConceptTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/a-logaritmus-fogalma/LogarithmConceptTheory").then(m => ({ default: m.LogarithmConceptTheory })))
const G11LogarithmConceptQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/a-logaritmus-fogalma/LogarithmConceptQuiz").then(m => ({ default: m.LogarithmConceptQuiz })))
const G11CommonLogarithmTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/tizes-alapu-logaritmus/CommonLogarithmTheory").then(m => ({ default: m.CommonLogarithmTheory })))
const G11CommonLogarithmQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/tizes-alapu-logaritmus/CommonLogarithmQuiz").then(m => ({ default: m.CommonLogarithmQuiz })))
const G11PowerRootLogTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/hatvany-gyok-es-logaritmus/PowerRootLogTheory").then(m => ({ default: m.PowerRootLogTheory })))
const G11PowerRootLogQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/hatvany-gyok-es-logaritmus/PowerRootLogQuiz").then(m => ({ default: m.PowerRootLogQuiz })))
const G11LogPractice1Theory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-1/LogPractice1Theory").then(m => ({ default: m.LogPractice1Theory })))
const G11LogPractice1Quiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-1/LogPractice1Quiz").then(m => ({ default: m.LogPractice1Quiz })))
const G11ExponentialInequalitiesTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-egyenlotlensegek/ExponentialInequalitiesTheory").then(m => ({ default: m.ExponentialInequalitiesTheory })))
const G11ExponentialInequalitiesQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-egyenlotlensegek/ExponentialInequalitiesQuiz").then(m => ({ default: m.ExponentialInequalitiesQuiz })))
const G11LogPractice2Theory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-2/LogPractice2Theory").then(m => ({ default: m.LogPractice2Theory })))
const G11LogPractice2Quiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-2/LogPractice2Quiz").then(m => ({ default: m.LogPractice2Quiz })))
const G11ExpLogPracticeExamTheory = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-tudasproba/ExpLogPracticeExamTheory").then(m => ({ default: m.ExpLogPracticeExamTheory })))
const G11ExpLogPracticeExamQuiz = lazy(() => import("@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-tudasproba/ExpLogPracticeExamQuiz").then(m => ({ default: m.ExpLogPracticeExamQuiz })))

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

      {/* ===== 11. Osztály – II. Kombinatorika, gráfok ===== */}

      {/* 16. Jelszavak */}
      {activityType === 'g11-comb-jelszavak-theory' && (
        <G11PasswordsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-jelszavak-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-jelszavak-quiz' && (
        <G11PasswordsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-jelszavak-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-jelszavak-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-jelszavak-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-jelszavak-matcher' && (
        <G11PasswordsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-jelszavak-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-jelszavak-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-jelszavak-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-jelszavak-sorter' && (
        <G11PasswordsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-jelszavak-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-jelszavak-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-jelszavak-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 17. Sorba rendezés */}
      {activityType === 'g11-comb-sorba-rendezes-theory' && (
        <G11PermutationsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-sorba-rendezes-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-sorba-rendezes-quiz' && (
        <G11PermutationsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-sorba-rendezes-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-sorba-rendezes-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-sorba-rendezes-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-sorba-rendezes-matcher' && (
        <G11PermutationsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-sorba-rendezes-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-sorba-rendezes-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-sorba-rendezes-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-sorba-rendezes-sorter' && (
        <G11PermutationsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-sorba-rendezes-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-sorba-rendezes-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-sorba-rendezes-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 18. Amikor nem számít a kiválasztás sorrendje */}
      {activityType === 'g11-comb-kombinacio-theory' && (
        <G11CombinationsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-kombinacio-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-kombinacio-quiz' && (
        <G11CombinationsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-kombinacio-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-kombinacio-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-kombinacio-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-kombinacio-matcher' && (
        <G11CombinationsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-kombinacio-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-kombinacio-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-kombinacio-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-kombinacio-sorter' && (
        <G11CombinationsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-kombinacio-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-kombinacio-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-kombinacio-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 19. Binomiális együtthatók */}
      {activityType === 'g11-comb-binomialis-theory' && (
        <G11BinomialCoefficientsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-binomialis-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-binomialis-quiz' && (
        <G11BinomialCoefficientsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-binomialis-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-binomialis-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-binomialis-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-binomialis-matcher' && (
        <G11BinomialCoefficientsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-binomialis-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-binomialis-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-binomialis-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-binomialis-sorter' && (
        <G11BinomialCoefficientsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-binomialis-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-binomialis-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-binomialis-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 20. Gyakorlás */}
      {activityType === 'g11-comb-gyakorlas-elso-theory' && (
        <G11CombinatoricsPractice1Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-gyakorlas-elso-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-gyakorlas-elso-quiz' && (
        <G11CombinatoricsPractice1Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-gyakorlas-elso-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-gyakorlas-elso-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-gyakorlas-elso-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-gyakorlas-elso-matcher' && (
        <G11CombinatoricsPractice1Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-gyakorlas-elso-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-gyakorlas-elso-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-gyakorlas-elso-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-gyakorlas-elso-sorter' && (
        <G11CombinatoricsPractice1Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-gyakorlas-elso-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-gyakorlas-elso-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-gyakorlas-elso-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 21. Esetszétválasztás */}
      {activityType === 'g11-comb-esetszetvalasztas-theory' && (
        <G11CaseAnalysisTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-esetszetvalasztas-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-esetszetvalasztas-quiz' && (
        <G11CaseAnalysisQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-esetszetvalasztas-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-esetszetvalasztas-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-esetszetvalasztas-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-esetszetvalasztas-matcher' && (
        <G11CaseAnalysisQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-esetszetvalasztas-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-esetszetvalasztas-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-esetszetvalasztas-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-esetszetvalasztas-sorter' && (
        <G11CaseAnalysisQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-esetszetvalasztas-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-esetszetvalasztas-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-esetszetvalasztas-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 22. Gyakorlás */}
      {activityType === 'g11-comb-gyakorlas-masodik-theory' && (
        <G11CombinatoricsPractice2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-gyakorlas-masodik-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-gyakorlas-masodik-quiz' && (
        <G11CombinatoricsPractice2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-gyakorlas-masodik-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-gyakorlas-masodik-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-gyakorlas-masodik-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-gyakorlas-masodik-matcher' && (
        <G11CombinatoricsPractice2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-gyakorlas-masodik-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-gyakorlas-masodik-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-gyakorlas-masodik-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-gyakorlas-masodik-sorter' && (
        <G11CombinatoricsPractice2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-gyakorlas-masodik-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-gyakorlas-masodik-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-gyakorlas-masodik-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 23. Gráfok jellemzői */}
      {activityType === 'g11-comb-grafok-jellemzoi-theory' && (
        <G11GraphPropertiesTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-grafok-jellemzoi-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-grafok-jellemzoi-quiz' && (
        <G11GraphPropertiesQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-grafok-jellemzoi-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-grafok-jellemzoi-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-grafok-jellemzoi-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-grafok-jellemzoi-matcher' && (
        <G11GraphPropertiesQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-grafok-jellemzoi-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-grafok-jellemzoi-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-grafok-jellemzoi-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-grafok-jellemzoi-sorter' && (
        <G11GraphPropertiesQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-grafok-jellemzoi-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-grafok-jellemzoi-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-grafok-jellemzoi-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 24. Kombinatorika és gráfok */}
      {activityType === 'g11-comb-kombinatorika-grafok-theory' && (
        <G11CombinatoricsGraphsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-kombinatorika-grafok-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-kombinatorika-grafok-quiz' && (
        <G11CombinatoricsGraphsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-kombinatorika-grafok-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-kombinatorika-grafok-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-kombinatorika-grafok-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-kombinatorika-grafok-matcher' && (
        <G11CombinatoricsGraphsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-kombinatorika-grafok-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-kombinatorika-grafok-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-kombinatorika-grafok-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-kombinatorika-grafok-sorter' && (
        <G11CombinatoricsGraphsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-kombinatorika-grafok-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-kombinatorika-grafok-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-kombinatorika-grafok-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* 25. Gyakorlás, tudáspróba */}
      {activityType === 'g11-comb-tudasproba-theory' && (
        <G11CombinatoricsPracticeExamTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-comb-tudasproba-quiz', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-tudasproba-quiz' && (
        <G11CombinatoricsPracticeExamQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-tudasproba-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-tudasproba-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-tudasproba-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-tudasproba-matcher' && (
        <G11CombinatoricsPracticeExamQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-tudasproba-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-tudasproba-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-tudasproba-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}
      {activityType === 'g11-comb-tudasproba-sorter' && (
        <G11CombinatoricsPracticeExamQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-comb-tudasproba-theory', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToMatcher={() => handleActivitySelect('g11-comb-tudasproba-matcher', selectedTopic || 'g11-kombinatorika-grafok')}
          onSwitchToSorter={() => handleActivitySelect('g11-comb-tudasproba-sorter', selectedTopic || 'g11-kombinatorika-grafok')}
        />
      )}

      {/* ===== 11. Osztály – III. Hatvány, gyök, logaritmus ===== */}

      {/* 26. Hatványozás – ismétlés */}
      {activityType === 'g11-exp-hatvanyozas-ismetles-theory' && (
        <G11PowersReviewTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-hatvanyozas-ismetles-quiz' && (
        <G11PowersReviewQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-hatvanyozas-ismetles-matcher' && (
        <G11PowersReviewQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-hatvanyozas-ismetles-sorter' && (
        <G11PowersReviewQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-hatvanyozas-ismetles-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 27. Számok n-edik gyöke */}
      {activityType === 'g11-exp-n-edik-gyok-theory' && (
        <G11NthRootTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-n-edik-gyok-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-n-edik-gyok-quiz' && (
        <G11NthRootQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-n-edik-gyok-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-n-edik-gyok-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-n-edik-gyok-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-n-edik-gyok-matcher' && (
        <G11NthRootQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-n-edik-gyok-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-n-edik-gyok-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-n-edik-gyok-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-n-edik-gyok-sorter' && (
        <G11NthRootQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-n-edik-gyok-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-n-edik-gyok-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-n-edik-gyok-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 3. Racionális számok a kitevőben I. */}
      {activityType === 'g11-exp-tortkitevo-elso-theory' && (
        <G11RationalExponents1Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-tortkitevo-elso-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tortkitevo-elso-quiz' && (
        <G11RationalExponents1Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tortkitevo-elso-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tortkitevo-elso-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tortkitevo-elso-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tortkitevo-elso-matcher' && (
        <G11RationalExponents1Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tortkitevo-elso-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tortkitevo-elso-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tortkitevo-elso-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tortkitevo-elso-sorter' && (
        <G11RationalExponents1Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tortkitevo-elso-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tortkitevo-elso-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tortkitevo-elso-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 4. Racionális számok a kitevőben II. */}
      {activityType === 'g11-exp-tortkitevo-masodik-theory' && (
        <G11RationalExponents2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-tortkitevo-masodik-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tortkitevo-masodik-quiz' && (
        <G11RationalExponents2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tortkitevo-masodik-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tortkitevo-masodik-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tortkitevo-masodik-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tortkitevo-masodik-matcher' && (
        <G11RationalExponents2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tortkitevo-masodik-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tortkitevo-masodik-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tortkitevo-masodik-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tortkitevo-masodik-sorter' && (
        <G11RationalExponents2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tortkitevo-masodik-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tortkitevo-masodik-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tortkitevo-masodik-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 5. Gyakorlás */}
      {activityType === 'g11-exp-hatvany-gyok-gyakorlas-theory' && (
        <G11PowerRootPracticeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-hatvany-gyok-gyakorlas-quiz' && (
        <G11PowerRootPracticeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-hatvany-gyok-gyakorlas-matcher' && (
        <G11PowerRootPracticeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-hatvany-gyok-gyakorlas-sorter' && (
        <G11PowerRootPracticeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-hatvany-gyok-gyakorlas-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 6. Pénzügyi számítások */}
      {activityType === 'g11-exp-penzugyek-theory' && (
        <G11FinancialCalcTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-penzugyek-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-penzugyek-quiz' && (
        <G11FinancialCalcQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-penzugyek-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-penzugyek-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-penzugyek-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-penzugyek-matcher' && (
        <G11FinancialCalcQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-penzugyek-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-penzugyek-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-penzugyek-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-penzugyek-sorter' && (
        <G11FinancialCalcQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-penzugyek-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-penzugyek-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-penzugyek-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 7. Exponenciális függvények */}
      {activityType === 'g11-exp-exponencialis-fuggveny-theory' && (
        <G11ExponentialFunctionsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-fuggveny-quiz' && (
        <G11ExponentialFunctionsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-fuggveny-matcher' && (
        <G11ExponentialFunctionsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-fuggveny-sorter' && (
        <G11ExponentialFunctionsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-fuggveny-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 8. Exponenciális folyamatok */}
      {activityType === 'g11-exp-exponencialis-folyamat-theory' && (
        <G11ExponentialProcessesTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-exponencialis-folyamat-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-folyamat-quiz' && (
        <G11ExponentialProcessesQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-folyamat-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-folyamat-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-folyamat-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-folyamat-matcher' && (
        <G11ExponentialProcessesQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-folyamat-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-folyamat-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-folyamat-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-folyamat-sorter' && (
        <G11ExponentialProcessesQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-folyamat-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-folyamat-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-folyamat-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 9. Felezési idő */}
      {activityType === 'g11-exp-felezesi-ido-theory' && (
        <G11HalfLifeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-felezesi-ido-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-felezesi-ido-quiz' && (
        <G11HalfLifeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-felezesi-ido-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-felezesi-ido-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-felezesi-ido-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-felezesi-ido-matcher' && (
        <G11HalfLifeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-felezesi-ido-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-felezesi-ido-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-felezesi-ido-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-felezesi-ido-sorter' && (
        <G11HalfLifeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-felezesi-ido-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-felezesi-ido-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-felezesi-ido-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 10. A logaritmus fogalma */}
      {activityType === 'g11-exp-logaritmus-fogalom-theory' && (
        <G11LogarithmConceptTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-logaritmus-fogalom-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-logaritmus-fogalom-quiz' && (
        <G11LogarithmConceptQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-logaritmus-fogalom-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-logaritmus-fogalom-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-logaritmus-fogalom-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-logaritmus-fogalom-matcher' && (
        <G11LogarithmConceptQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-logaritmus-fogalom-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-logaritmus-fogalom-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-logaritmus-fogalom-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-logaritmus-fogalom-sorter' && (
        <G11LogarithmConceptQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-logaritmus-fogalom-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-logaritmus-fogalom-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-logaritmus-fogalom-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 11. A tízes alapú logaritmus használata */}
      {activityType === 'g11-exp-tizes-logaritmus-theory' && (
        <G11CommonLogarithmTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-tizes-logaritmus-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tizes-logaritmus-quiz' && (
        <G11CommonLogarithmQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tizes-logaritmus-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tizes-logaritmus-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tizes-logaritmus-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tizes-logaritmus-matcher' && (
        <G11CommonLogarithmQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tizes-logaritmus-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tizes-logaritmus-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tizes-logaritmus-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tizes-logaritmus-sorter' && (
        <G11CommonLogarithmQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tizes-logaritmus-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tizes-logaritmus-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tizes-logaritmus-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 12. Hatvány, gyök, logaritmus */}
      {activityType === 'g11-exp-logaritmus-modellek-theory' && (
        <G11PowerRootLogTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-logaritmus-modellek-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-logaritmus-modellek-quiz' && (
        <G11PowerRootLogQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-logaritmus-modellek-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-logaritmus-modellek-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-logaritmus-modellek-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-logaritmus-modellek-matcher' && (
        <G11PowerRootLogQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-logaritmus-modellek-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-logaritmus-modellek-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-logaritmus-modellek-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-logaritmus-modellek-sorter' && (
        <G11PowerRootLogQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-logaritmus-modellek-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-logaritmus-modellek-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-logaritmus-modellek-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 13. Gyakorlás */}
      {activityType === 'g11-exp-log-gyakorlas-elso-theory' && (
        <G11LogPractice1Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-log-gyakorlas-elso-quiz' && (
        <G11LogPractice1Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-log-gyakorlas-elso-matcher' && (
        <G11LogPractice1Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-log-gyakorlas-elso-sorter' && (
        <G11LogPractice1Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-log-gyakorlas-elso-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 14. Exponenciális egyenlőtlenségek */}
      {activityType === 'g11-exp-exponencialis-egyenlotlenseg-theory' && (
        <G11ExponentialInequalitiesTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-egyenlotlenseg-quiz' && (
        <G11ExponentialInequalitiesQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-egyenlotlenseg-matcher' && (
        <G11ExponentialInequalitiesQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-exponencialis-egyenlotlenseg-sorter' && (
        <G11ExponentialInequalitiesQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-exponencialis-egyenlotlenseg-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 15. Gyakorlás */}
      {activityType === 'g11-exp-log-gyakorlas-masodik-theory' && (
        <G11LogPractice2Theory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-log-gyakorlas-masodik-quiz' && (
        <G11LogPractice2Quiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-log-gyakorlas-masodik-matcher' && (
        <G11LogPractice2Quiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-log-gyakorlas-masodik-sorter' && (
        <G11LogPractice2Quiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-log-gyakorlas-masodik-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}

      {/* 16. Gyakorlás, tudáspróba */}
      {activityType === 'g11-exp-tudasproba-theory' && (
        <G11ExpLogPracticeExamTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g11-exp-tudasproba-quiz', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tudasproba-quiz' && (
        <G11ExpLogPracticeExamQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tudasproba-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tudasproba-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tudasproba-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tudasproba-matcher' && (
        <G11ExpLogPracticeExamQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tudasproba-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tudasproba-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tudasproba-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
      {activityType === 'g11-exp-tudasproba-sorter' && (
        <G11ExpLogPracticeExamQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g11-exp-tudasproba-theory', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToMatcher={() => handleActivitySelect('g11-exp-tudasproba-matcher', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
          onSwitchToSorter={() => handleActivitySelect('g11-exp-tudasproba-sorter', selectedTopic || 'g11-hatvany-gyok-logaritmus')}
        />
      )}
    </>
  );
};
