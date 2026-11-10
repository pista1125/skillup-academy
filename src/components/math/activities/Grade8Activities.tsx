import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const Grade8AlgebraIntroMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroMatcher").then(m => ({ default: m.AlgebraIntroMatcher })))
const Grade8AlgebraIntroQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroQuiz").then(m => ({ default: m.AlgebraIntroQuiz })))
const Grade8AlgebraIntroSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroSorter").then(m => ({ default: m.AlgebraIntroSorter })))
const Grade8AlgebraIntroTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroTheory").then(m => ({ default: m.AlgebraIntroTheory })))
const Grade8AlgebraQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroQuiz").then(m => ({ default: m.AlgebraIntroQuiz }))) as any;
const Grade8CalculatorProjectQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/alkalmazas-szamologep-projektmunka/CalculatorProjectQuiz").then(m => ({ default: m.CalculatorProjectQuiz })))
const Grade8CalculatorProjectTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/alkalmazas-szamologep-projektmunka/CalculatorProjectTheory").then(m => ({ default: m.CalculatorProjectTheory })))
const Grade8CentralSimilarityMatcher = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityMatcher").then(m => ({ default: m.CentralSimilarityMatcher })))
const Grade8CentralSimilarityQuiz = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityQuiz").then(m => ({ default: m.CentralSimilarityQuiz })))
const Grade8CentralSimilaritySorter = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilaritySorter").then(m => ({ default: m.CentralSimilaritySorter })))
const Grade8CentralSimilarityTheory = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityTheory").then(m => ({ default: m.CentralSimilarityTheory })))
const Grade8Chapter2GeometrySummaryMatcher = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryMatcher").then(m => ({ default: m.Chapter2GeometrySummaryMatcher })))
const Grade8Chapter2GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryQuiz").then(m => ({ default: m.Chapter2GeometrySummaryQuiz })))
const Grade8Chapter2GeometrySummarySorter = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummarySorter").then(m => ({ default: m.Chapter2GeometrySummarySorter })))
const Grade8Chapter2GeometrySummaryTheory = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryTheory").then(m => ({ default: m.Chapter2GeometrySummaryTheory })))
const Grade8Chapter3EquationsSummaryMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryMatcher").then(m => ({ default: m.Chapter3EquationsSummaryMatcher })))
const Grade8Chapter3EquationsSummaryQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryQuiz").then(m => ({ default: m.Chapter3EquationsSummaryQuiz })))
const Grade8Chapter3EquationsSummarySorter = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummarySorter").then(m => ({ default: m.Chapter3EquationsSummarySorter })))
const Grade8Chapter3EquationsSummaryTheory = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryTheory").then(m => ({ default: m.Chapter3EquationsSummaryTheory })))
const Grade8Chapter5PythagorasSummaryQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/osszefoglalas/Chapter5PythagorasSummaryQuiz").then(m => ({ default: m.Chapter5PythagorasSummaryQuiz })))
const Grade8Chapter5PythagorasSummaryTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/osszefoglalas/Chapter5PythagorasSummaryTheory").then(m => ({ default: m.Chapter5PythagorasSummaryTheory })))
const Grade8Chapter6SummaryMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryMatcher").then(m => ({ default: m.Chapter6SummaryMatcher })))
const Grade8Chapter6SummaryQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryQuiz").then(m => ({ default: m.Chapter6SummaryQuiz })))
const Grade8Chapter6SummarySorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummarySorter").then(m => ({ default: m.Chapter6SummarySorter })))
const Grade8Chapter6SummaryTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryTheory").then(m => ({ default: m.Chapter6SummaryTheory })))
const Grade8ChapterSummaryMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummaryMatcher").then(m => ({ default: m.ChapterSummaryMatcher })))
const Grade8ChapterSummaryQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummaryQuiz").then(m => ({ default: m.ChapterSummaryQuiz })))
const Grade8ChapterSummarySorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummarySorter").then(m => ({ default: m.ChapterSummarySorter })))
const Grade8ChapterSummaryTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummaryTheory").then(m => ({ default: m.ChapterSummaryTheory })))
const Grade8CongruenceTransformMatcher = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformMatcher").then(m => ({ default: m.CongruenceTransformMatcher })))
const Grade8CongruenceTransformQuiz = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformQuiz").then(m => ({ default: m.CongruenceTransformQuiz })))
const Grade8CongruenceTransformSorter = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformSorter").then(m => ({ default: m.CongruenceTransformSorter })))
const Grade8CongruenceTransformTheory = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformTheory").then(m => ({ default: m.CongruenceTransformTheory })))
const Grade8ConstructionsMeasurementsQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/szerkesztesek-meresek/ConstructionsMeasurementsQuiz").then(m => ({ default: m.ConstructionsMeasurementsQuiz })))
const Grade8ConstructionsMeasurementsTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/szerkesztesek-meresek/ConstructionsMeasurementsTheory").then(m => ({ default: m.ConstructionsMeasurementsTheory })))
const Grade8ConversePythagorasQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-megforditasa/ConversePythagorasQuiz").then(m => ({ default: m.ConversePythagorasQuiz })))
const Grade8ConversePythagorasTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-megforditasa/ConversePythagorasTheory").then(m => ({ default: m.ConversePythagorasTheory })))
const Grade8DirectProportionMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionMatcher").then(m => ({ default: m.DirectProportionMatcher })))
const Grade8DirectProportionQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionQuiz").then(m => ({ default: m.DirectProportionQuiz })))
const Grade8DirectProportionSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionSorter").then(m => ({ default: m.DirectProportionSorter })))
const Grade8DirectProportionTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionTheory").then(m => ({ default: m.DirectProportionTheory })))
const Grade8EarthMatcher = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthMatcher").then(m => ({ default: m.EarthMatcher })))
const Grade8EarthQuiz = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthQuiz").then(m => ({ default: m.EarthQuiz })))
const Grade8EarthSorter = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthSorter").then(m => ({ default: m.EarthSorter })))
const Grade8EarthTheory = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthTheory").then(m => ({ default: m.EarthTheory })))
const Grade8EquationBalanceQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationBalanceQuiz").then(m => ({ default: m.EquationBalanceQuiz })))
const Grade8EquationsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsMatcher").then(m => ({ default: m.EquationsMatcher })))
const Grade8EquationsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsQuiz").then(m => ({ default: m.EquationsQuiz })))
const Grade8EquationsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsSorter").then(m => ({ default: m.EquationsSorter })))
const Grade8EquationsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsTheory").then(m => ({ default: m.EquationsTheory })))
const Grade8FactoringMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringMatcher").then(m => ({ default: m.FactoringMatcher })))
const Grade8FactoringQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringQuiz").then(m => ({ default: m.FactoringQuiz })))
const Grade8FactoringSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringSorter").then(m => ({ default: m.FactoringSorter })))
const Grade8FactoringTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringTheory").then(m => ({ default: m.FactoringTheory })))
const Grade8FinancialProblemsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsMatcher").then(m => ({ default: m.FinancialProblemsMatcher })))
const Grade8FinancialProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsQuiz").then(m => ({ default: m.FinancialProblemsQuiz })))
const Grade8FinancialProblemsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsSorter").then(m => ({ default: m.FinancialProblemsSorter })))
const Grade8FinancialProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsTheory").then(m => ({ default: m.FinancialProblemsTheory })))
const Grade8FindingPatternsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsMatcher").then(m => ({ default: m.FindingPatternsMatcher })))
const Grade8FindingPatternsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsQuiz").then(m => ({ default: m.FindingPatternsQuiz })))
const Grade8FindingPatternsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsSorter").then(m => ({ default: m.FindingPatternsSorter })))
const Grade8FindingPatternsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsTheory").then(m => ({ default: m.FindingPatternsTheory })))
const Grade8FrequencyStatisticsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsMatcher").then(m => ({ default: m.FrequencyStatisticsMatcher })))
const Grade8FrequencyStatisticsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsQuiz").then(m => ({ default: m.FrequencyStatisticsQuiz })))
const Grade8FrequencyStatisticsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsSorter").then(m => ({ default: m.FrequencyStatisticsSorter })))
const Grade8FrequencyStatisticsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsTheory").then(m => ({ default: m.FrequencyStatisticsTheory })))
const Grade8FunctionsGraphsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsMatcher").then(m => ({ default: m.FunctionsGraphsMatcher })))
const Grade8FunctionsGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsQuiz").then(m => ({ default: m.FunctionsGraphsQuiz })))
const Grade8FunctionsGraphsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsSorter").then(m => ({ default: m.FunctionsGraphsSorter })))
const Grade8FunctionsGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsTheory").then(m => ({ default: m.FunctionsGraphsTheory })))
const Grade8GeometricConstructionsMatcher = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsMatcher").then(m => ({ default: m.GeometricConstructionsMatcher })))
const Grade8GeometricConstructionsQuiz = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsQuiz").then(m => ({ default: m.GeometricConstructionsQuiz })))
const Grade8GeometricConstructionsSorter = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsSorter").then(m => ({ default: m.GeometricConstructionsSorter })))
const Grade8GeometricConstructionsTheory = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsTheory").then(m => ({ default: m.GeometricConstructionsTheory })))
const Grade8GeometricEquationsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsMatcher").then(m => ({ default: m.GeometricEquationsMatcher })))
const Grade8GeometricEquationsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsQuiz").then(m => ({ default: m.GeometricEquationsQuiz })))
const Grade8GeometricEquationsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsSorter").then(m => ({ default: m.GeometricEquationsSorter })))
const Grade8GeometricEquationsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsTheory").then(m => ({ default: m.GeometricEquationsTheory })))
const Grade8GeometrySoftwareMatcher = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareMatcher").then(m => ({ default: m.GeometrySoftwareMatcher })))
const Grade8GeometrySoftwareQuiz = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareQuiz").then(m => ({ default: m.GeometrySoftwareQuiz })))
const Grade8GeometrySoftwareSorter = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareSorter").then(m => ({ default: m.GeometrySoftwareSorter })))
const Grade8GeometrySoftwareTheory = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareTheory").then(m => ({ default: m.GeometrySoftwareTheory })))
const Grade8InverseProportionMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionMatcher").then(m => ({ default: m.InverseProportionMatcher })))
const Grade8InverseProportionQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionQuiz").then(m => ({ default: m.InverseProportionQuiz })))
const Grade8InverseProportionSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionSorter").then(m => ({ default: m.InverseProportionSorter })))
const Grade8InverseProportionTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionTheory").then(m => ({ default: m.InverseProportionTheory })))
const Grade8LogicQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/logika-feladatok/LogicQuiz").then(m => ({ default: m.LogicQuiz })))
const Grade8LogicTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/logika-feladatok/LogicTheory").then(m => ({ default: m.LogicTheory })))
const Grade8MixedWordProblemsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsMatcher").then(m => ({ default: m.MixedWordProblemsMatcher })))
const Grade8MixedWordProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsQuiz").then(m => ({ default: m.MixedWordProblemsQuiz })))
const Grade8MixedWordProblemsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsSorter").then(m => ({ default: m.MixedWordProblemsSorter })))
const Grade8MixedWordProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsTheory").then(m => ({ default: m.MixedWordProblemsTheory })))
const Grade8MixingWordProblemsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsMatcher").then(m => ({ default: m.MixingWordProblemsMatcher })))
const Grade8MixingWordProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsQuiz").then(m => ({ default: m.MixingWordProblemsQuiz })))
const Grade8MixingWordProblemsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsSorter").then(m => ({ default: m.MixingWordProblemsSorter })))
const Grade8MixingWordProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsTheory").then(m => ({ default: m.MixingWordProblemsTheory })))
const Grade8MotionWorkProblemsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsMatcher").then(m => ({ default: m.MotionWorkProblemsMatcher })))
const Grade8MotionWorkProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsQuiz").then(m => ({ default: m.MotionWorkProblemsQuiz })))
const Grade8MotionWorkProblemsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsSorter").then(m => ({ default: m.MotionWorkProblemsSorter })))
const Grade8MotionWorkProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsTheory").then(m => ({ default: m.MotionWorkProblemsTheory })))
const Grade8NumbersAgesMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesMatcher").then(m => ({ default: m.NumbersAgesMatcher })))
const Grade8NumbersAgesQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesQuiz").then(m => ({ default: m.NumbersAgesQuiz })))
const Grade8NumbersAgesSorter = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesSorter").then(m => ({ default: m.NumbersAgesSorter })))
const Grade8NumbersAgesTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesTheory").then(m => ({ default: m.NumbersAgesTheory })))
const Grade8PlottingGraphsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsMatcher").then(m => ({ default: m.PlottingGraphsMatcher })))
const Grade8PlottingGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsQuiz").then(m => ({ default: m.PlottingGraphsQuiz })))
const Grade8PlottingGraphsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsSorter").then(m => ({ default: m.PlottingGraphsSorter })))
const Grade8PlottingGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsTheory").then(m => ({ default: m.PlottingGraphsTheory })))
const Grade8PolynomialMultMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultMatcher").then(m => ({ default: m.PolynomialMultMatcher })))
const Grade8PolynomialMultQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultQuiz").then(m => ({ default: m.PolynomialMultQuiz })))
const Grade8PolynomialMultSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultSorter").then(m => ({ default: m.PolynomialMultSorter })))
const Grade8PolynomialMultTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultTheory").then(m => ({ default: m.PolynomialMultTheory })))
const Grade8PowersMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersMatcher").then(m => ({ default: m.PowersMatcher })))
const Grade8PowersQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersQuiz").then(m => ({ default: m.PowersQuiz })))
const Grade8PowersSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersSorter").then(m => ({ default: m.PowersSorter })))
const Grade8PowersTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersTheory").then(m => ({ default: m.PowersTheory })))
const Grade8ProbabilityBasicsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsMatcher").then(m => ({ default: m.ProbabilityBasicsMatcher })))
const Grade8ProbabilityBasicsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsQuiz").then(m => ({ default: m.ProbabilityBasicsQuiz })))
const Grade8ProbabilityBasicsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsSorter").then(m => ({ default: m.ProbabilityBasicsSorter })))
const Grade8ProbabilityBasicsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsTheory").then(m => ({ default: m.ProbabilityBasicsTheory })))
const Grade8ProbabilityGameMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameMatcher").then(m => ({ default: m.ProbabilityGameMatcher })))
const Grade8ProbabilityGameQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameQuiz").then(m => ({ default: m.ProbabilityGameQuiz })))
const Grade8ProbabilityGameSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameSorter").then(m => ({ default: m.ProbabilityGameSorter })))
const Grade8ProbabilityGameTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameTheory").then(m => ({ default: m.ProbabilityGameTheory })))
const Grade8ProbabilityProblemsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsMatcher").then(m => ({ default: m.ProbabilityProblemsMatcher })))
const Grade8ProbabilityProblemsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsQuiz").then(m => ({ default: m.ProbabilityProblemsQuiz })))
const Grade8ProbabilityProblemsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsSorter").then(m => ({ default: m.ProbabilityProblemsSorter })))
const Grade8ProbabilityProblemsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsTheory").then(m => ({ default: m.ProbabilityProblemsTheory })))
const Grade8PyramidSurfaceVolumeMatcher = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeMatcher").then(m => ({ default: m.PyramidSurfaceVolumeMatcher })))
const Grade8PyramidSurfaceVolumeQuiz = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeQuiz").then(m => ({ default: m.PyramidSurfaceVolumeQuiz })))
const Grade8PyramidSurfaceVolumeSorter = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeSorter").then(m => ({ default: m.PyramidSurfaceVolumeSorter })))
const Grade8PyramidSurfaceVolumeTheory = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeTheory").then(m => ({ default: m.PyramidSurfaceVolumeTheory })))
const Grade8PyramidsMatcher = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsMatcher").then(m => ({ default: m.PyramidsMatcher })))
const Grade8PyramidsQuiz = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsQuiz").then(m => ({ default: m.PyramidsQuiz })))
const Grade8PyramidsSorter = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsSorter").then(m => ({ default: m.PyramidsSorter })))
const Grade8PyramidsTheory = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsTheory").then(m => ({ default: m.PyramidsTheory })))
const Grade8PythagorasApplicationsQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-alkalmazasa/PythagorasApplicationsQuiz").then(m => ({ default: m.PythagorasApplicationsQuiz })))
const Grade8PythagorasApplicationsTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-alkalmazasa/PythagorasApplicationsTheory").then(m => ({ default: m.PythagorasApplicationsTheory })))
const Grade8PythagorasTheoremQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel/PythagorasTheoremQuiz").then(m => ({ default: m.PythagorasTheoremQuiz })))
const Grade8PythagorasTheoremTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel/PythagorasTheoremTheory").then(m => ({ default: m.PythagorasTheoremTheory })))
const Grade8RationalOperationsMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsMatcher").then(m => ({ default: m.RationalOperationsMatcher })))
const Grade8RationalOperationsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsQuiz").then(m => ({ default: m.RationalOperationsQuiz })))
const Grade8RationalOperationsSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsSorter").then(m => ({ default: m.RationalOperationsSorter })))
const Grade8RationalOperationsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsTheory").then(m => ({ default: m.RationalOperationsTheory })))
const Grade8RationalSetMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetMatcher").then(m => ({ default: m.RationalSetMatcher })))
const Grade8RationalSetQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetQuiz").then(m => ({ default: m.RationalSetQuiz })))
const Grade8RationalSetSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetSorter").then(m => ({ default: m.RationalSetSorter })))
const Grade8RationalSetTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetTheory").then(m => ({ default: m.RationalSetTheory })))
const Grade8ReadingGraphsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsMatcher").then(m => ({ default: m.ReadingGraphsMatcher })))
const Grade8ReadingGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsQuiz").then(m => ({ default: m.ReadingGraphsQuiz })))
const Grade8ReadingGraphsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsSorter").then(m => ({ default: m.ReadingGraphsSorter })))
const Grade8ReadingGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsTheory").then(m => ({ default: m.ReadingGraphsTheory })))
const Grade8SequencesMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesMatcher").then(m => ({ default: m.SequencesMatcher })))
const Grade8SequencesQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesQuiz").then(m => ({ default: m.SequencesQuiz })))
const Grade8SequencesSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesSorter").then(m => ({ default: m.SequencesSorter })))
const Grade8SequencesTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesTheory").then(m => ({ default: m.SequencesTheory })))
const Grade8SetBasicsMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsMatcher").then(m => ({ default: m.SetBasicsMatcher })))
const Grade8SetBasicsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsQuiz").then(m => ({ default: m.SetBasicsQuiz })))
const Grade8SetBasicsSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsSorter").then(m => ({ default: m.SetBasicsSorter })))
const Grade8SetBasicsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsTheory").then(m => ({ default: m.SetBasicsTheory })))
const Grade8SetOperationsMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsMatcher").then(m => ({ default: m.SetOperationsMatcher })))
const Grade8SetOperationsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsQuiz").then(m => ({ default: m.SetOperationsQuiz })))
const Grade8SetOperationsSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsSorter").then(m => ({ default: m.SetOperationsSorter })))
const Grade8SetOperationsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsTheory").then(m => ({ default: m.SetOperationsTheory })))
const Grade8SimilarityMatcher = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityMatcher").then(m => ({ default: m.SimilarityMatcher })))
const Grade8SimilarityQuiz = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityQuiz").then(m => ({ default: m.SimilarityQuiz })))
const Grade8SimilaritySorter = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilaritySorter").then(m => ({ default: m.SimilaritySorter })))
const Grade8SimilarityTheory = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityTheory").then(m => ({ default: m.SimilarityTheory })))
const Grade8SolidsReviewMatcher = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewMatcher").then(m => ({ default: m.SolidsReviewMatcher })))
const Grade8SolidsReviewQuiz = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewQuiz").then(m => ({ default: m.SolidsReviewQuiz })))
const Grade8SolidsReviewSorter = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewSorter").then(m => ({ default: m.SolidsReviewSorter })))
const Grade8SolidsReviewTheory = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewTheory").then(m => ({ default: m.SolidsReviewTheory })))
const Grade8SolidsSummaryMatcher = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummaryMatcher").then(m => ({ default: m.SolidsSummaryMatcher })))
const Grade8SolidsSummaryQuiz = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummaryQuiz").then(m => ({ default: m.SolidsSummaryQuiz })))
const Grade8SolidsSummarySorter = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummarySorter").then(m => ({ default: m.SolidsSummarySorter })))
const Grade8SolidsSummaryTheory = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummaryTheory").then(m => ({ default: m.SolidsSummaryTheory })))
const Grade8SpecialRightTrianglesQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/nevezetes-derekszogu-haromszogek/SpecialRightTrianglesQuiz").then(m => ({ default: m.SpecialRightTrianglesQuiz })))
const Grade8SpecialRightTrianglesTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/nevezetes-derekszogu-haromszogek/SpecialRightTrianglesTheory").then(m => ({ default: m.SpecialRightTrianglesTheory })))
const Grade8SphereMatcher = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereMatcher").then(m => ({ default: m.SphereMatcher })))
const Grade8SphereQuiz = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereQuiz").then(m => ({ default: m.SphereQuiz })))
const Grade8SphereSorter = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereSorter").then(m => ({ default: m.SphereSorter })))
const Grade8SphereTheory = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereTheory").then(m => ({ default: m.SphereTheory })))
const Grade8SqrtConceptMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptMatcher").then(m => ({ default: m.SqrtConceptMatcher })))
const Grade8SqrtConceptQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptQuiz").then(m => ({ default: m.SqrtConceptQuiz })))
const Grade8SqrtConceptSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptSorter").then(m => ({ default: m.SqrtConceptSorter })))
const Grade8SqrtConceptTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptTheory").then(m => ({ default: m.SqrtConceptTheory })))
const Grade8SquareRootsMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsMatcher").then(m => ({ default: m.SquareRootsMatcher })))
const Grade8SquareRootsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsQuiz").then(m => ({ default: m.SquareRootsQuiz })))
const Grade8SquareRootsSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsSorter").then(m => ({ default: m.SquareRootsSorter })))
const Grade8SquareRootsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsTheory").then(m => ({ default: m.SquareRootsTheory })))
const Grade8TransformationsMatcher = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsMatcher").then(m => ({ default: m.TransformationsMatcher })))
const Grade8TransformationsQuiz = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsQuiz").then(m => ({ default: m.TransformationsQuiz })))
const Grade8TransformationsSorter = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsSorter").then(m => ({ default: m.TransformationsSorter })))
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
                  {(activityType === 'g8-logic' || activityType === 'g8-logic-quiz') && (
                    <Grade8LogicQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-logic-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-logic-theory' && (
                    <Grade8LogicTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-logic-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-set-basics-theory' && (
                    <Grade8SetBasicsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-set-basics-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-set-basics' || activityType === 'g8-set-basics-quiz') && (
                    <Grade8SetBasicsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-set-basics-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-set-basics-matcher' && (
                    <Grade8SetBasicsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-set-basics-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-set-basics-sorter' && (
                    <Grade8SetBasicsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-set-basics-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-set-operations-theory' && (
                    <Grade8SetOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-set-operations-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-set-operations' || activityType === 'g8-set-operations-quiz') && (
                    <Grade8SetOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-set-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-set-operations-matcher' && (
                    <Grade8SetOperationsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-set-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-set-operations-sorter' && (
                    <Grade8SetOperationsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-set-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-rational-set-theory' && (
                    <Grade8RationalSetTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-rational-set-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-rational-set' || activityType === 'g8-rational-set-quiz') && (
                    <Grade8RationalSetQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-rational-set-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-rational-set-matcher' && (
                    <Grade8RationalSetMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-rational-set-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-rational-set-sorter' && (
                    <Grade8RationalSetSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-rational-set-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-rational-operations-theory' && (
                    <Grade8RationalOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-rational-operations-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-rational-operations' || activityType === 'g8-rational-operations-quiz') && (
                    <Grade8RationalOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-rational-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-rational-operations-matcher' && (
                    <Grade8RationalOperationsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-rational-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-rational-operations-sorter' && (
                    <Grade8RationalOperationsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-rational-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-powers-theory' && (
                    <Grade8PowersTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-powers-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-powers' || activityType === 'g8-powers-quiz') && (
                    <Grade8PowersQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-powers-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-powers-matcher' && (
                    <Grade8PowersMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-powers-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-powers-sorter' && (
                    <Grade8PowersSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-powers-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-sqrt-concept-theory' && (
                    <Grade8SqrtConceptTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-sqrt-concept-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-sqrt-concept' || activityType === 'g8-sqrt-concept-quiz') && (
                    <Grade8SqrtConceptQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-sqrt-concept-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-sqrt-concept-matcher' && (
                    <Grade8SqrtConceptMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-sqrt-concept-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-sqrt-concept-sorter' && (
                    <Grade8SqrtConceptSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-sqrt-concept-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-square-roots-theory' && (
                    <Grade8SquareRootsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-square-roots-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-square-roots' || activityType === 'g8-square-roots-quiz') && (
                    <Grade8SquareRootsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-square-roots-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-square-roots-matcher' && (
                    <Grade8SquareRootsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-square-roots-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-square-roots-sorter' && (
                    <Grade8SquareRootsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-square-roots-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-algebra-intro-theory' && (
                    <Grade8AlgebraIntroTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-algebra-intro-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-algebra-intro' || activityType === 'g8-algebra-intro-quiz') && (
                    <Grade8AlgebraIntroQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-algebra-intro-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-algebra-intro-matcher' && (
                    <Grade8AlgebraIntroMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-algebra-intro-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-algebra-intro-sorter' && (
                    <Grade8AlgebraIntroSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-algebra-intro-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-factoring-theory' && (
                    <Grade8FactoringTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-factoring-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-factoring' || activityType === 'g8-factoring-quiz') && (
                    <Grade8FactoringQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-factoring-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-factoring-matcher' && (
                    <Grade8FactoringMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-factoring-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-factoring-sorter' && (
                    <Grade8FactoringSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-factoring-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-polynomial-mult-theory' && (
                    <Grade8PolynomialMultTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-polynomial-mult-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-polynomial-mult' || activityType === 'g8-polynomial-mult-quiz') && (
                    <Grade8PolynomialMultQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-polynomial-mult-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-polynomial-mult-matcher' && (
                    <Grade8PolynomialMultMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-polynomial-mult-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-polynomial-mult-sorter' && (
                    <Grade8PolynomialMultSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-polynomial-mult-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-chapter1-summary-theory' && (
                    <Grade8ChapterSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-chapter1-summary-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {(activityType === 'g8-chapter1-summary' || activityType === 'g8-chapter1-summary-quiz') && (
                    <Grade8ChapterSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-chapter1-summary-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-chapter1-summary-matcher' && (
                    <Grade8ChapterSummaryMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-chapter1-summary-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-chapter1-summary-sorter' && (
                    <Grade8ChapterSummarySorter
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-chapter1-summary-theory', selectedTopic?.id || 'g8-numbers-letters')}
                    />
                  )}

                  {activityType === 'g8-geom-congruence-theory' && (
                    <Grade8CongruenceTransformTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-congruence-quiz', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {(activityType === 'g8-geom-congruence' || activityType === 'g8-geom-congruence-quiz') && (
                    <Grade8CongruenceTransformQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-congruence-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-congruence-matcher' && (
                    <Grade8CongruenceTransformMatcher
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-congruence-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-congruence-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-congruence-sorter' && (
                    <Grade8CongruenceTransformSorter
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-congruence-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-congruence-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-transforms-theory' && (
                    <Grade8TransformationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-transforms-quiz', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {(activityType === 'g8-geom-transforms' || activityType === 'g8-geom-transforms-quiz') && (
                    <Grade8TransformationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-transforms-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-transforms-matcher' && (
                    <Grade8TransformationsMatcher
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-transforms-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-transforms-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-transforms-sorter' && (
                    <Grade8TransformationsSorter
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-transforms-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-transforms-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-software-theory' && (
                    <Grade8GeometrySoftwareTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-software-quiz', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {(activityType === 'g8-geom-software' || activityType === 'g8-geom-software-quiz') && (
                    <Grade8GeometrySoftwareQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-software-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-software-matcher' && (
                    <Grade8GeometrySoftwareMatcher
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-software-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-software-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-software-sorter' && (
                    <Grade8GeometrySoftwareSorter
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-software-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-software-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-similarity-theory' && (
                    <Grade8SimilarityTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-similarity-quiz', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {(activityType === 'g8-geom-similarity' || activityType === 'g8-geom-similarity-quiz') && (
                    <Grade8SimilarityQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-similarity-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-similarity-matcher' && (
                    <Grade8SimilarityMatcher
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-similarity-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-similarity-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-similarity-sorter' && (
                    <Grade8SimilaritySorter
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-similarity-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-similarity-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-central-similarity-theory' && (
                    <Grade8CentralSimilarityTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-central-similarity-quiz', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {(activityType === 'g8-geom-central-similarity' || activityType === 'g8-geom-central-similarity-quiz') && (
                    <Grade8CentralSimilarityQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-central-similarity-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-central-similarity-matcher' && (
                    <Grade8CentralSimilarityMatcher
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-central-similarity-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-central-similarity-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-central-similarity-sorter' && (
                    <Grade8CentralSimilaritySorter
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-central-similarity-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-central-similarity-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-constructions-theory' && (
                    <Grade8GeometricConstructionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-constructions-quiz', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {(activityType === 'g8-geom-constructions' || activityType === 'g8-geom-constructions-quiz') && (
                    <Grade8GeometricConstructionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-constructions-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-constructions-matcher' && (
                    <Grade8GeometricConstructionsMatcher
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-constructions-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-constructions-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-constructions-sorter' && (
                    <Grade8GeometricConstructionsSorter
                      onNextLevel={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-constructions-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-constructions-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-summary-theory' && (
                    <Grade8Chapter2GeometrySummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-geom-summary-quiz', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {(activityType === 'g8-geom-summary' || activityType === 'g8-geom-summary-quiz') && (
                    <Grade8Chapter2GeometrySummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-summary-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-summary-matcher' && (
                    <Grade8Chapter2GeometrySummaryMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-summary-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-summary-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-geom-summary-sorter' && (
                    <Grade8Chapter2GeometrySummarySorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-geom-summary-quiz', selectedTopic || 'g8-geometry')}
                      onSwitchToTheory={() => handleActivitySelect('g8-geom-summary-theory', selectedTopic || 'g8-geometry')}
                    />
                  )}

                  {activityType === 'g8-algebra' && (
                    <Grade8AlgebraQuiz onBack={handleBack} />
                  )}

                  {activityType === 'g8-eq-basic-theory' && (
                    <Grade8EquationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-basic', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {(activityType === 'g8-eq-basic' || activityType === 'g8-eq-basic-quiz') && (
                    <Grade8EquationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-basic-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-basic-matcher' && (
                    <Grade8EquationsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-basic', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-basic-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-basic-sorter' && (
                    <Grade8EquationsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-basic', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-basic-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-equation-balance' && (
                    <Grade8EquationBalanceQuiz onBack={handleBack} />
                  )}

                  {activityType === 'g8-eq-numbers-ages-theory' && (
                    <Grade8NumbersAgesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-numbers-ages', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {(activityType === 'g8-eq-numbers-ages' || activityType === 'g8-eq-numbers-ages-quiz') && (
                    <Grade8NumbersAgesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-numbers-ages-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-numbers-ages-matcher' && (
                    <Grade8NumbersAgesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-numbers-ages', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-numbers-ages-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-numbers-ages-sorter' && (
                    <Grade8NumbersAgesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-numbers-ages', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-numbers-ages-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-mixing-theory' && (
                    <Grade8MixingWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-mixing', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {(activityType === 'g8-eq-mixing' || activityType === 'g8-eq-mixing-quiz') && (
                    <Grade8MixingWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-mixing-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-mixing-matcher' && (
                    <Grade8MixingWordProblemsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-mixing', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-mixing-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-mixing-sorter' && (
                    <Grade8MixingWordProblemsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-mixing', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-mixing-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-motion-work-theory' && (
                    <Grade8MotionWorkProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-motion-work', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {(activityType === 'g8-eq-motion-work' || activityType === 'g8-eq-motion-work-quiz') && (
                    <Grade8MotionWorkProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-motion-work-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-motion-work-matcher' && (
                    <Grade8MotionWorkProblemsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-motion-work', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-motion-work-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-motion-work-sorter' && (
                    <Grade8MotionWorkProblemsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-motion-work', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-motion-work-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-geometry-theory' && (
                    <Grade8GeometricEquationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-geometry', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {(activityType === 'g8-eq-geometry' || activityType === 'g8-eq-geometry-quiz') && (
                    <Grade8GeometricEquationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-geometry-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-geometry-matcher' && (
                    <Grade8GeometricEquationsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-geometry', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-geometry-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-geometry-sorter' && (
                    <Grade8GeometricEquationsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-geometry', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-geometry-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-mixed-theory' && (
                    <Grade8MixedWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-mixed', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {(activityType === 'g8-eq-mixed' || activityType === 'g8-eq-mixed-quiz') && (
                    <Grade8MixedWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-mixed-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-mixed-matcher' && (
                    <Grade8MixedWordProblemsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-mixed', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-mixed-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-mixed-sorter' && (
                    <Grade8MixedWordProblemsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-mixed', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-mixed-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-financial-theory' && (
                    <Grade8FinancialProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-financial', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {(activityType === 'g8-eq-financial' || activityType === 'g8-eq-financial-quiz') && (
                    <Grade8FinancialProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-financial-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-financial-matcher' && (
                    <Grade8FinancialProblemsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-financial', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-financial-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-financial-sorter' && (
                    <Grade8FinancialProblemsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-financial', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-financial-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-summary-theory' && (
                    <Grade8Chapter3EquationsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-eq-summary', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {(activityType === 'g8-eq-summary' || activityType === 'g8-eq-summary-quiz') && (
                    <Grade8Chapter3EquationsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-summary-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-summary-matcher' && (
                    <Grade8Chapter3EquationsSummaryMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-summary', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-summary-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-eq-summary-sorter' && (
                    <Grade8Chapter3EquationsSummarySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-eq-summary', selectedTopic || 'g8-equations')}
                      onSwitchToTheory={() => handleActivitySelect('g8-eq-summary-theory', selectedTopic || 'g8-equations')}
                    />
                  )}

                  {activityType === 'g8-pyth-constructions-theory' && (
                    <Grade8ConstructionsMeasurementsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-constructions', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-constructions' && (
                    <Grade8ConstructionsMeasurementsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-constructions-theory', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-theorem-theory' && (
                    <Grade8PythagorasTheoremTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-theorem', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-theorem' && (
                    <Grade8PythagorasTheoremQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-theorem-theory', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-converse-theory' && (
                    <Grade8ConversePythagorasTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-converse', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-converse' && (
                    <Grade8ConversePythagorasQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-converse-theory', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-applications-theory' && (
                    <Grade8PythagorasApplicationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-applications', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-applications' && (
                    <Grade8PythagorasApplicationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-applications-theory', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-calculator-theory' && (
                    <Grade8CalculatorProjectTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-calculator', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-calculator' && (
                    <Grade8CalculatorProjectQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-calculator-theory', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-special-triangles-theory' && (
                    <Grade8SpecialRightTrianglesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-special-triangles', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-special-triangles' && (
                    <Grade8SpecialRightTrianglesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-special-triangles-theory', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-summary-theory' && (
                    <Grade8Chapter5PythagorasSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-pyth-summary', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-pyth-summary' && (
                    <Grade8Chapter5PythagorasSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-pyth-summary-theory', selectedTopic || 'g8-pythagoras')}
                    />
                  )}

                  {activityType === 'g8-func-direct-theory' && (
                    <Grade8DirectProportionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-direct', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-direct' && (
                    <Grade8DirectProportionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-direct-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-direct-matcher' && (
                    <Grade8DirectProportionMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-direct', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-direct-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-direct-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-direct-sorter' && (
                    <Grade8DirectProportionSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-direct', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-direct-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-direct-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-graphs-theory' && (
                    <Grade8FunctionsGraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-graphs', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-graphs' && (
                    <Grade8FunctionsGraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-graphs-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-graphs-matcher' && (
                    <Grade8FunctionsGraphsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-graphs', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-graphs-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-graphs-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-graphs-sorter' && (
                    <Grade8FunctionsGraphsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-graphs', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-graphs-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-graphs-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-inverse-theory' && (
                    <Grade8InverseProportionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-inverse', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-inverse' && (
                    <Grade8InverseProportionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-inverse-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-inverse-matcher' && (
                    <Grade8InverseProportionMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-inverse', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-inverse-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-inverse-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-inverse-sorter' && (
                    <Grade8InverseProportionSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-inverse', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-inverse-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-inverse-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-reading-theory' && (
                    <Grade8ReadingGraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-reading', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-reading' && (
                    <Grade8ReadingGraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-reading-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-reading-matcher' && (
                    <Grade8ReadingGraphsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-reading', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-reading-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-reading-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-reading-sorter' && (
                    <Grade8ReadingGraphsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-reading', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-reading-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-reading-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-plotting-theory' && (
                    <Grade8PlottingGraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-plotting', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-plotting' && (
                    <Grade8PlottingGraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-plotting-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-plotting-matcher' && (
                    <Grade8PlottingGraphsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-plotting', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-plotting-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-plotting-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-plotting-sorter' && (
                    <Grade8PlottingGraphsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-plotting', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-plotting-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-plotting-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-frequency-theory' && (
                    <Grade8FrequencyStatisticsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-frequency', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-frequency' && (
                    <Grade8FrequencyStatisticsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-frequency-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-frequency-matcher' && (
                    <Grade8FrequencyStatisticsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-frequency', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-frequency-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-frequency-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-frequency-sorter' && (
                    <Grade8FrequencyStatisticsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-frequency', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-frequency-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-frequency-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-game-theory' && (
                    <Grade8ProbabilityGameTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-game', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-game' && (
                    <Grade8ProbabilityGameQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-game-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-game-matcher' && (
                    <Grade8ProbabilityGameMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-game', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-game-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-game-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-game-sorter' && (
                    <Grade8ProbabilityGameSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-game', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-game-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-game-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-prob-basics-theory' && (
                    <Grade8ProbabilityBasicsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-prob-basics', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-prob-basics' && (
                    <Grade8ProbabilityBasicsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-prob-basics-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-prob-basics-matcher' && (
                    <Grade8ProbabilityBasicsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-prob-basics', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-prob-basics-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-prob-basics-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-prob-basics-sorter' && (
                    <Grade8ProbabilityBasicsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-prob-basics', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-prob-basics-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-prob-basics-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-prob-problems-theory' && (
                    <Grade8ProbabilityProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-prob-problems', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-prob-problems' && (
                    <Grade8ProbabilityProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-prob-problems-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-prob-problems-matcher' && (
                    <Grade8ProbabilityProblemsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-prob-problems', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-prob-problems-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-prob-problems-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-prob-problems-sorter' && (
                    <Grade8ProbabilityProblemsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-prob-problems', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-prob-problems-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-prob-problems-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-patterns-theory' && (
                    <Grade8FindingPatternsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-patterns', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-patterns' && (
                    <Grade8FindingPatternsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-patterns-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-patterns-matcher' && (
                    <Grade8FindingPatternsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-patterns', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-patterns-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-patterns-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-patterns-sorter' && (
                    <Grade8FindingPatternsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-patterns', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-patterns-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-patterns-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-sequences-theory' && (
                    <Grade8SequencesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-sequences', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-sequences' && (
                    <Grade8SequencesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-sequences-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-sequences-matcher' && (
                    <Grade8SequencesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-sequences', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-sequences-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-sequences-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-sequences-sorter' && (
                    <Grade8SequencesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-sequences', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-sequences-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-sequences-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-summary-theory' && (
                    <Grade8Chapter6SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-func-summary', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-summary' && (
                    <Grade8Chapter6SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-summary-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-summary-matcher' && (
                    <Grade8Chapter6SummaryMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-summary', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-summary-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToSorter={() => handleActivitySelect('g8-func-summary-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-func-summary-sorter' && (
                    <Grade8Chapter6SummarySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-func-summary', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToTheory={() => handleActivitySelect('g8-func-summary-theory', selectedTopic || 'g8-functions-probability-sequences')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-func-summary-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                    />
                  )}

                  {activityType === 'g8-solids-review-theory' && (
                    <Grade8SolidsReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-review', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-review' && (
                    <Grade8SolidsReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-review-theory', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-review-matcher' && (
                    <Grade8SolidsReviewMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-review', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-review-theory', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-review-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-review-sorter' && (
                    <Grade8SolidsReviewSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-review', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-review-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-review-matcher', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-theory' && (
                    <Grade8PyramidsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-pyramids', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {(activityType === 'g8-solids-pyramids' || activityType === 'g8-solids-pyramids-intro') && (
                    <Grade8PyramidsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-theory', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-matcher' && (
                    <Grade8PyramidsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-pyramids', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-theory', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-pyramids-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-sorter' && (
                    <Grade8PyramidsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-pyramids', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-pyramids-matcher', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-calc-theory' && (
                    <Grade8PyramidSurfaceVolumeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-pyramids-calc', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-calc' && (
                    <Grade8PyramidSurfaceVolumeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-calc-theory', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-calc-matcher' && (
                    <Grade8PyramidSurfaceVolumeMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-pyramids-calc', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-calc-theory', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-pyramids-calc-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-pyramids-calc-sorter' && (
                    <Grade8PyramidSurfaceVolumeSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-pyramids-calc', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-calc-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-pyramids-calc-matcher', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-sphere-theory' && (
                    <Grade8SphereTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-sphere', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-sphere' && (
                    <Grade8SphereQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-sphere-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-sphere-matcher', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-sphere-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-sphere-matcher' && (
                    <Grade8SphereMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-sphere', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-sphere-theory', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-sphere-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-sphere-sorter' && (
                    <Grade8SphereSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-sphere', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-sphere-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-sphere-matcher', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-earth-theory' && (
                    <Grade8EarthTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-earth', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-earth' && (
                    <Grade8EarthQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-earth-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-earth-matcher', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-earth-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-earth-matcher' && (
                    <Grade8EarthMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-earth', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-earth-theory', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-earth-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-earth-sorter' && (
                    <Grade8EarthSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-earth', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-earth-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-earth-matcher', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-summary-theory' && (
                    <Grade8SolidsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g8-solids-summary', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-summary' && (
                    <Grade8SolidsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-summary-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-summary-matcher', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-summary-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-summary-matcher' && (
                    <Grade8SolidsSummaryMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-summary', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-summary-theory', selectedTopic || 'g8-solids')}
                      onSwitchToSorter={() => handleActivitySelect('g8-solids-summary-sorter', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {activityType === 'g8-solids-summary-sorter' && (
                    <Grade8SolidsSummarySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g8-solids-summary', selectedTopic || 'g8-solids')}
                      onSwitchToTheory={() => handleActivitySelect('g8-solids-summary-theory', selectedTopic || 'g8-solids')}
                      onSwitchToMatcher={() => handleActivitySelect('g8-solids-summary-matcher', selectedTopic || 'g8-solids')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 1. Hányféleképpen lehet? */}
    </>
  );
};
