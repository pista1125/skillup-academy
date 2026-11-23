import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const Grade8AlgebraIntroQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroQuiz").then(m => ({ default: m.AlgebraIntroQuiz })))
const Grade8AlgebraIntroTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroTheory").then(m => ({ default: m.AlgebraIntroTheory })))
const Grade8CalculatorProjectQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/alkalmazas-szamologep-projektmunka/CalculatorProjectQuiz").then(m => ({ default: m.CalculatorProjectQuiz })))
const Grade8CalculatorProjectTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/alkalmazas-szamologep-projektmunka/CalculatorProjectTheory").then(m => ({ default: m.CalculatorProjectTheory })))
const Grade8CentralSimilarityQuiz = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityQuiz").then(m => ({ default: m.CentralSimilarityQuiz })))
const Grade8CentralSimilarityTheory = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityTheory").then(m => ({ default: m.CentralSimilarityTheory })))
const Grade8Chapter2GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryQuiz").then(m => ({ default: m.Chapter2GeometrySummaryQuiz })))
const Grade8Chapter2GeometrySummaryTheory = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryTheory").then(m => ({ default: m.Chapter2GeometrySummaryTheory })))
const Grade8Chapter3EquationsSummaryQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryQuiz").then(m => ({ default: m.Chapter3EquationsSummaryQuiz })))
const Grade8Chapter3EquationsSummaryTheory = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryTheory").then(m => ({ default: m.Chapter3EquationsSummaryTheory })))
const Grade8Chapter5PythagorasSummaryQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/osszefoglalas/Chapter5PythagorasSummaryQuiz").then(m => ({ default: m.Chapter5PythagorasSummaryQuiz })))
const Grade8Chapter5PythagorasSummaryTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/osszefoglalas/Chapter5PythagorasSummaryTheory").then(m => ({ default: m.Chapter5PythagorasSummaryTheory })))
const Grade8Chapter6SummaryQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryQuiz").then(m => ({ default: m.Chapter6SummaryQuiz })))
const Grade8Chapter6SummaryTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryTheory").then(m => ({ default: m.Chapter6SummaryTheory })))
const Grade8ChapterSummaryQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummaryQuiz").then(m => ({ default: m.ChapterSummaryQuiz })))
const Grade8ChapterSummaryTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummaryTheory").then(m => ({ default: m.ChapterSummaryTheory })))
const Grade8CongruenceTransformQuiz = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformQuiz").then(m => ({ default: m.CongruenceTransformQuiz })))
const Grade8CongruenceTransformTheory = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformTheory").then(m => ({ default: m.CongruenceTransformTheory })))
const Grade8ConstructionsMeasurementsQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/szerkesztesek-meresek/ConstructionsMeasurementsQuiz").then(m => ({ default: m.ConstructionsMeasurementsQuiz })))
const Grade8ConstructionsMeasurementsTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/szerkesztesek-meresek/ConstructionsMeasurementsTheory").then(m => ({ default: m.ConstructionsMeasurementsTheory })))
const Grade8ConversePythagorasQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-megforditasa/ConversePythagorasQuiz").then(m => ({ default: m.ConversePythagorasQuiz })))
const Grade8ConversePythagorasTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-megforditasa/ConversePythagorasTheory").then(m => ({ default: m.ConversePythagorasTheory })))
const Grade8DirectProportionQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionQuiz").then(m => ({ default: m.DirectProportionQuiz })))
const Grade8DirectProportionTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionTheory").then(m => ({ default: m.DirectProportionTheory })))
const Grade8EarthQuiz = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthQuiz").then(m => ({ default: m.EarthQuiz })))
const Grade8EarthTheory = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthTheory").then(m => ({ default: m.EarthTheory })))
const Grade8EquationsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsQuiz").then(m => ({ default: m.EquationsQuiz })))
const Grade8EquationsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsTheory").then(m => ({ default: m.EquationsTheory })))
const Grade8FactoringQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringQuiz").then(m => ({ default: m.FactoringQuiz })))
const Grade8FactoringTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringTheory").then(m => ({ default: m.FactoringTheory })))
const Grade8FinancialProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsQuiz").then(m => ({ default: m.FinancialProblemsQuiz })))
const Grade8FinancialProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsTheory").then(m => ({ default: m.FinancialProblemsTheory })))
const Grade8FindingPatternsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsQuiz").then(m => ({ default: m.FindingPatternsQuiz })))
const Grade8FindingPatternsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsTheory").then(m => ({ default: m.FindingPatternsTheory })))
const Grade8FrequencyStatisticsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsQuiz").then(m => ({ default: m.FrequencyStatisticsQuiz })))
const Grade8FrequencyStatisticsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsTheory").then(m => ({ default: m.FrequencyStatisticsTheory })))
const Grade8FunctionsGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsQuiz").then(m => ({ default: m.FunctionsGraphsQuiz })))
const Grade8FunctionsGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsTheory").then(m => ({ default: m.FunctionsGraphsTheory })))
const Grade8GeometricConstructionsQuiz = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsQuiz").then(m => ({ default: m.GeometricConstructionsQuiz })))
const Grade8GeometricConstructionsTheory = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsTheory").then(m => ({ default: m.GeometricConstructionsTheory })))
const Grade8GeometricEquationsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsQuiz").then(m => ({ default: m.GeometricEquationsQuiz })))
const Grade8GeometricEquationsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsTheory").then(m => ({ default: m.GeometricEquationsTheory })))
const Grade8GeometrySoftwareQuiz = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareQuiz").then(m => ({ default: m.GeometrySoftwareQuiz })))
const Grade8GeometrySoftwareTheory = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareTheory").then(m => ({ default: m.GeometrySoftwareTheory })))
const Grade8InverseProportionQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionQuiz").then(m => ({ default: m.InverseProportionQuiz })))
const Grade8InverseProportionTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionTheory").then(m => ({ default: m.InverseProportionTheory })))
const Grade8LogicQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/logika-feladatok/LogicQuiz").then(m => ({ default: m.LogicQuiz })))
const Grade8LogicTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/logika-feladatok/LogicTheory").then(m => ({ default: m.LogicTheory })))
const Grade8MixedWordProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsQuiz").then(m => ({ default: m.MixedWordProblemsQuiz })))
const Grade8MixedWordProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsTheory").then(m => ({ default: m.MixedWordProblemsTheory })))
const Grade8MixingWordProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsQuiz").then(m => ({ default: m.MixingWordProblemsQuiz })))
const Grade8MixingWordProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsTheory").then(m => ({ default: m.MixingWordProblemsTheory })))
const Grade8MotionWorkProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsQuiz").then(m => ({ default: m.MotionWorkProblemsQuiz })))
const Grade8MotionWorkProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsTheory").then(m => ({ default: m.MotionWorkProblemsTheory })))
const Grade8NumbersAgesQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesQuiz").then(m => ({ default: m.NumbersAgesQuiz })))
const Grade8NumbersAgesTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesTheory").then(m => ({ default: m.NumbersAgesTheory })))
const Grade8PlottingGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsQuiz").then(m => ({ default: m.PlottingGraphsQuiz })))
const Grade8PlottingGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsTheory").then(m => ({ default: m.PlottingGraphsTheory })))
const Grade8PolynomialMultQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultQuiz").then(m => ({ default: m.PolynomialMultQuiz })))
const Grade8PolynomialMultTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultTheory").then(m => ({ default: m.PolynomialMultTheory })))
const Grade8PowersQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersQuiz").then(m => ({ default: m.PowersQuiz })))
const Grade8PowersTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersTheory").then(m => ({ default: m.PowersTheory })))
const Grade8ProbabilityBasicsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsQuiz").then(m => ({ default: m.ProbabilityBasicsQuiz })))
const Grade8ProbabilityBasicsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsTheory").then(m => ({ default: m.ProbabilityBasicsTheory })))
const Grade8ProbabilityGameQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameQuiz").then(m => ({ default: m.ProbabilityGameQuiz })))
const Grade8ProbabilityGameTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameTheory").then(m => ({ default: m.ProbabilityGameTheory })))
const Grade8ProbabilityProblemsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsQuiz").then(m => ({ default: m.ProbabilityProblemsQuiz })))
const Grade8ProbabilityProblemsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsTheory").then(m => ({ default: m.ProbabilityProblemsTheory })))
const Grade8PyramidSurfaceVolumeQuiz = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeQuiz").then(m => ({ default: m.PyramidSurfaceVolumeQuiz })))
const Grade8PyramidSurfaceVolumeTheory = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeTheory").then(m => ({ default: m.PyramidSurfaceVolumeTheory })))
const Grade8PyramidsQuiz = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsQuiz").then(m => ({ default: m.PyramidsQuiz })))
const Grade8PyramidsTheory = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsTheory").then(m => ({ default: m.PyramidsTheory })))
const Grade8PythagorasApplicationsQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-alkalmazasa/PythagorasApplicationsQuiz").then(m => ({ default: m.PythagorasApplicationsQuiz })))
const Grade8PythagorasApplicationsTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-alkalmazasa/PythagorasApplicationsTheory").then(m => ({ default: m.PythagorasApplicationsTheory })))
const Grade8PythagorasTheoremQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel/PythagorasTheoremQuiz").then(m => ({ default: m.PythagorasTheoremQuiz })))
const Grade8PythagorasTheoremTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel/PythagorasTheoremTheory").then(m => ({ default: m.PythagorasTheoremTheory })))
const Grade8RationalOperationsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsQuiz").then(m => ({ default: m.RationalOperationsQuiz })))
const Grade8RationalOperationsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsTheory").then(m => ({ default: m.RationalOperationsTheory })))
const Grade8RationalSetQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetQuiz").then(m => ({ default: m.RationalSetQuiz })))
const Grade8RationalSetTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetTheory").then(m => ({ default: m.RationalSetTheory })))
const Grade8ReadingGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsQuiz").then(m => ({ default: m.ReadingGraphsQuiz })))
const Grade8ReadingGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsTheory").then(m => ({ default: m.ReadingGraphsTheory })))
const Grade8SequencesQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesQuiz").then(m => ({ default: m.SequencesQuiz })))
const Grade8SequencesTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesTheory").then(m => ({ default: m.SequencesTheory })))
const Grade8SetBasicsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsQuiz").then(m => ({ default: m.SetBasicsQuiz })))
const Grade8SetBasicsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsTheory").then(m => ({ default: m.SetBasicsTheory })))
const Grade8SetOperationsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsQuiz").then(m => ({ default: m.SetOperationsQuiz })))
const Grade8SetOperationsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsTheory").then(m => ({ default: m.SetOperationsTheory })))
const Grade8SimilarityQuiz = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityQuiz").then(m => ({ default: m.SimilarityQuiz })))
const Grade8SimilarityTheory = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityTheory").then(m => ({ default: m.SimilarityTheory })))
const Grade8SolidsReviewQuiz = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewQuiz").then(m => ({ default: m.SolidsReviewQuiz })))
const Grade8SolidsReviewTheory = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewTheory").then(m => ({ default: m.SolidsReviewTheory })))
const Grade8SolidsSummaryQuiz = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummaryQuiz").then(m => ({ default: m.SolidsSummaryQuiz })))
const Grade8SolidsSummaryTheory = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummaryTheory").then(m => ({ default: m.SolidsSummaryTheory })))
const Grade8SpecialRightTrianglesQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/nevezetes-derekszogu-haromszogek/SpecialRightTrianglesQuiz").then(m => ({ default: m.SpecialRightTrianglesQuiz })))
const Grade8SpecialRightTrianglesTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/nevezetes-derekszogu-haromszogek/SpecialRightTrianglesTheory").then(m => ({ default: m.SpecialRightTrianglesTheory })))
const Grade8SphereQuiz = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereQuiz").then(m => ({ default: m.SphereQuiz })))
const Grade8SphereTheory = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereTheory").then(m => ({ default: m.SphereTheory })))
const Grade8SqrtConceptQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptQuiz").then(m => ({ default: m.SqrtConceptQuiz })))
const Grade8SqrtConceptTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptTheory").then(m => ({ default: m.SqrtConceptTheory })))
const Grade8SquareRootsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsQuiz").then(m => ({ default: m.SquareRootsQuiz })))
const Grade8SquareRootsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsTheory").then(m => ({ default: m.SquareRootsTheory })))
const Grade8TransformationsQuiz = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsQuiz").then(m => ({ default: m.TransformationsQuiz })))
const Grade8TransformationsTheory = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsTheory").then(m => ({ default: m.TransformationsTheory })))

export const Grade8Activities: React.FC<ActivityRouterProps> = ({
  activityType,
  onBack,
  onActivitySelect,
  setActivityType: setActivityTypeProp,
  selectedGrade,
  selectedTopic,
  handleMaterialSelect,
  handleQuizComplete,
  percentMode,
  vennLevel
}) => {
  const handleBack = onBack;
  const handleActivitySelect = onActivitySelect;
  // selectedTopic is a topic id string in MathPage, but may be a topic object elsewhere
  const topicOf = (fallback: string): string =>
    (typeof selectedTopic === 'string' ? selectedTopic : (selectedTopic as any)?.id) || fallback;
  const setActivityType = (type: string) => {
    if (setActivityTypeProp) {
      setActivityTypeProp(type);
    } else {
      onActivitySelect(type, typeof selectedTopic === 'object' ? selectedTopic?.id : selectedTopic);
    }
  };

  if (!activityType) return null;

  return (
    <>
                  {activityType === 'g8-logic-quiz' && (
                    <Grade8LogicQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-logic-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-logic-theory' && (
                    <Grade8LogicTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-logic-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-set-basics-theory' && (
                    <Grade8SetBasicsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-set-basics-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-set-basics-quiz' && (
                    <Grade8SetBasicsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-set-basics-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-set-operations-theory' && (
                    <Grade8SetOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-set-operations-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-set-operations-quiz' && (
                    <Grade8SetOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-set-operations-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-rational-set-theory' && (
                    <Grade8RationalSetTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-rational-set-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-rational-set-quiz' && (
                    <Grade8RationalSetQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-rational-set-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-rational-operations-theory' && (
                    <Grade8RationalOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-rational-operations-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-rational-operations-quiz' && (
                    <Grade8RationalOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-rational-operations-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-powers-theory' && (
                    <Grade8PowersTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-powers-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-powers-quiz' && (
                    <Grade8PowersQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-powers-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-sqrt-concept-theory' && (
                    <Grade8SqrtConceptTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-sqrt-concept-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-sqrt-concept-quiz' && (
                    <Grade8SqrtConceptQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-sqrt-concept-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-square-roots-theory' && (
                    <Grade8SquareRootsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-square-roots-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-square-roots-quiz' && (
                    <Grade8SquareRootsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-square-roots-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-algebra-intro-theory' && (
                    <Grade8AlgebraIntroTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-algebra-intro-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-algebra-intro-quiz' && (
                    <Grade8AlgebraIntroQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-algebra-intro-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-factoring-theory' && (
                    <Grade8FactoringTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-factoring-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-factoring-quiz' && (
                    <Grade8FactoringQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-factoring-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-polynomial-mult-theory' && (
                    <Grade8PolynomialMultTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-polynomial-mult-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-polynomial-mult-quiz' && (
                    <Grade8PolynomialMultQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-polynomial-mult-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-chapter1-summary-theory' && (
                    <Grade8ChapterSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-chapter1-summary-quiz', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-chapter1-summary-quiz' && (
                    <Grade8ChapterSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-chapter1-summary-theory', topicOf('g8-numbers-letters'))}
                    />
                  )}

                  {activityType === 'g8-geom-congruence-theory' && (
                    <Grade8CongruenceTransformTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-congruence-quiz', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-congruence-quiz' && (
                    <Grade8CongruenceTransformQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-congruence-theory', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-transforms-theory' && (
                    <Grade8TransformationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-transforms-quiz', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-transforms-quiz' && (
                    <Grade8TransformationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-transforms-theory', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-software-theory' && (
                    <Grade8GeometrySoftwareTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-software-quiz', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-software-quiz' && (
                    <Grade8GeometrySoftwareQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-software-theory', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-similarity-theory' && (
                    <Grade8SimilarityTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-similarity-quiz', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-similarity-quiz' && (
                    <Grade8SimilarityQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-similarity-theory', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-central-similarity-theory' && (
                    <Grade8CentralSimilarityTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-central-similarity-quiz', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-central-similarity-quiz' && (
                    <Grade8CentralSimilarityQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-central-similarity-theory', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-constructions-theory' && (
                    <Grade8GeometricConstructionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-constructions-quiz', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-constructions-quiz' && (
                    <Grade8GeometricConstructionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-constructions-theory', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-summary-theory' && (
                    <Grade8Chapter2GeometrySummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-summary-quiz', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-geom-summary-quiz' && (
                    <Grade8Chapter2GeometrySummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-summary-theory', topicOf('g8-geometry'))}
                    />
                  )}

                  {activityType === 'g8-eq-basic-theory' && (
                    <Grade8EquationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-basic', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-basic' && (
                    <Grade8EquationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-basic-theory', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-numbers-ages-theory' && (
                    <Grade8NumbersAgesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-numbers-ages', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-numbers-ages' && (
                    <Grade8NumbersAgesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-numbers-ages-theory', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-mixing-theory' && (
                    <Grade8MixingWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-mixing', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-mixing' && (
                    <Grade8MixingWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-mixing-theory', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-motion-work-theory' && (
                    <Grade8MotionWorkProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-motion-work', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-motion-work' && (
                    <Grade8MotionWorkProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-motion-work-theory', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-geometry-theory' && (
                    <Grade8GeometricEquationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-geometry', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-geometry' && (
                    <Grade8GeometricEquationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-geometry-theory', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-mixed-theory' && (
                    <Grade8MixedWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-mixed', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-mixed' && (
                    <Grade8MixedWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-mixed-theory', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-financial-theory' && (
                    <Grade8FinancialProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-financial', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-financial' && (
                    <Grade8FinancialProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-financial-theory', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-summary-theory' && (
                    <Grade8Chapter3EquationsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-summary', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-eq-summary' && (
                    <Grade8Chapter3EquationsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-summary-theory', topicOf('g8-equations'))}
                    />
                  )}

                  {activityType === 'g8-pyth-constructions-theory' && (
                    <Grade8ConstructionsMeasurementsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-constructions', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-constructions' && (
                    <Grade8ConstructionsMeasurementsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-constructions-theory', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-theorem-theory' && (
                    <Grade8PythagorasTheoremTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-theorem', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-theorem' && (
                    <Grade8PythagorasTheoremQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-theorem-theory', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-converse-theory' && (
                    <Grade8ConversePythagorasTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-converse', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-converse' && (
                    <Grade8ConversePythagorasQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-converse-theory', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-applications-theory' && (
                    <Grade8PythagorasApplicationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-applications', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-applications' && (
                    <Grade8PythagorasApplicationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-applications-theory', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-calculator-theory' && (
                    <Grade8CalculatorProjectTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-calculator', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-calculator' && (
                    <Grade8CalculatorProjectQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-calculator-theory', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-special-triangles-theory' && (
                    <Grade8SpecialRightTrianglesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-special-triangles', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-special-triangles' && (
                    <Grade8SpecialRightTrianglesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-special-triangles-theory', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-summary-theory' && (
                    <Grade8Chapter5PythagorasSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-summary', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-pyth-summary' && (
                    <Grade8Chapter5PythagorasSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-summary-theory', topicOf('g8-pythagoras'))}
                    />
                  )}

                  {activityType === 'g8-func-direct-theory' && (
                    <Grade8DirectProportionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-direct', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-direct' && (
                    <Grade8DirectProportionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-direct-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-graphs-theory' && (
                    <Grade8FunctionsGraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-graphs', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-graphs' && (
                    <Grade8FunctionsGraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-graphs-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-inverse-theory' && (
                    <Grade8InverseProportionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-inverse', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-inverse' && (
                    <Grade8InverseProportionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-inverse-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-reading-theory' && (
                    <Grade8ReadingGraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-reading', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-reading' && (
                    <Grade8ReadingGraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-reading-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-plotting-theory' && (
                    <Grade8PlottingGraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-plotting', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-plotting' && (
                    <Grade8PlottingGraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-plotting-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-frequency-theory' && (
                    <Grade8FrequencyStatisticsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-frequency', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-frequency' && (
                    <Grade8FrequencyStatisticsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-frequency-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-game-theory' && (
                    <Grade8ProbabilityGameTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-game', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-game' && (
                    <Grade8ProbabilityGameQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-game-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-prob-basics-theory' && (
                    <Grade8ProbabilityBasicsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-prob-basics', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-prob-basics' && (
                    <Grade8ProbabilityBasicsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-prob-basics-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-prob-problems-theory' && (
                    <Grade8ProbabilityProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-prob-problems', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-prob-problems' && (
                    <Grade8ProbabilityProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-prob-problems-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-patterns-theory' && (
                    <Grade8FindingPatternsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-patterns', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-patterns' && (
                    <Grade8FindingPatternsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-patterns-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-sequences-theory' && (
                    <Grade8SequencesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-sequences', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-sequences' && (
                    <Grade8SequencesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-sequences-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-summary-theory' && (
                    <Grade8Chapter6SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-summary', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-func-summary' && (
                    <Grade8Chapter6SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-summary-theory', topicOf('g8-functions-probability-sequences'))}
                    />
                  )}

                  {activityType === 'g8-solids-review-theory' && (
                    <Grade8SolidsReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-review', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-review' && (
                    <Grade8SolidsReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-review-theory', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-theory' && (
                    <Grade8PyramidsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-pyramids', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids' && (
                    <Grade8PyramidsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-theory', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-calc-theory' && (
                    <Grade8PyramidSurfaceVolumeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-pyramids-calc', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-calc' && (
                    <Grade8PyramidSurfaceVolumeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-calc-theory', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-sphere-theory' && (
                    <Grade8SphereTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-sphere', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-sphere' && (
                    <Grade8SphereQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-sphere-theory', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-earth-theory' && (
                    <Grade8EarthTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-earth', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-earth' && (
                    <Grade8EarthQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-earth-theory', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-summary-theory' && (
                    <Grade8SolidsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-summary', topicOf('g8-solids'))}
                    />
                  )}

                  {activityType === 'g8-solids-summary' && (
                    <Grade8SolidsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-summary-theory', topicOf('g8-solids'))}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 1. Hányféleképpen lehet? */}
    </>
  );
};
