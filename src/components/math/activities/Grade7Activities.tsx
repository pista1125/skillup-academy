import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator, Variable } from 'lucide-react';

// Lazy loaded activity components
const FunctionTableQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/FunctionTableQuiz").then(m => ({ default: m.FunctionTableQuiz })))
const Grade7AnglePairsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsMatcher").then(m => ({ default: m.AnglePairsMatcher })))
const Grade7AnglePairsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsQuiz").then(m => ({ default: m.AnglePairsQuiz })))
const Grade7AnglePairsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsSorter").then(m => ({ default: m.AnglePairsSorter })))
const Grade7AnglePairsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsTheory").then(m => ({ default: m.AnglePairsTheory })))
const Grade7AreaVolumeUnitsMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsMatcher").then(m => ({ default: m.AreaVolumeUnitsMatcher })))
const Grade7AreaVolumeUnitsQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsQuiz").then(m => ({ default: m.AreaVolumeUnitsQuiz })))
const Grade7AreaVolumeUnitsSorter = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsSorter").then(m => ({ default: m.AreaVolumeUnitsSorter })))
const Grade7AreaVolumeUnitsTheory = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsTheory").then(m => ({ default: m.AreaVolumeUnitsTheory })))
const Grade7BalanceScaleMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleMatcher").then(m => ({ default: m.BalanceScaleMatcher })))
const Grade7BalanceScaleQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleQuiz").then(m => ({ default: m.BalanceScaleQuiz })))
const Grade7BalanceScaleSorter = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleSorter").then(m => ({ default: m.BalanceScaleSorter })))
const Grade7BalanceScaleTheory = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleTheory").then(m => ({ default: m.BalanceScaleTheory })))
const Grade7CalculateHundredMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredMatcher").then(m => ({ default: m.CalculateHundredMatcher })))
const Grade7CalculateHundredQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredQuiz").then(m => ({ default: m.CalculateHundredQuiz })))
const Grade7CalculateHundredSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredSorter").then(m => ({ default: m.CalculateHundredSorter })))
const Grade7CalculateHundredTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredTheory").then(m => ({ default: m.CalculateHundredTheory })))
const Grade7CircleMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleMatcher").then(m => ({ default: m.CircleMatcher })))
const Grade7CircleQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleQuiz").then(m => ({ default: m.CircleQuiz })))
const Grade7CircleSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleSorter").then(m => ({ default: m.CircleSorter })))
const Grade7CircleTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleTheory").then(m => ({ default: m.CircleTheory })))
const Grade7CombiningSubstitutionMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionMatcher").then(m => ({ default: m.CombiningSubstitutionMatcher })))
const Grade7CombiningSubstitutionQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionQuiz").then(m => ({ default: m.CombiningSubstitutionQuiz })))
const Grade7CombiningSubstitutionSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionSorter").then(m => ({ default: m.CombiningSubstitutionSorter })))
const Grade7CombiningSubstitutionTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionTheory").then(m => ({ default: m.CombiningSubstitutionTheory })))
const Grade7ComplexOperationsMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsMatcher").then(m => ({ default: m.ComplexOperationsMatcher })))
const Grade7ComplexOperationsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsQuiz").then(m => ({ default: m.ComplexOperationsQuiz })))
const Grade7ComplexOperationsSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsSorter").then(m => ({ default: m.ComplexOperationsSorter })))
const Grade7ComplexOperationsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsTheory").then(m => ({ default: m.ComplexOperationsTheory })))
const Grade7ComplexPercentMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentMatcher").then(m => ({ default: m.ComplexPercentMatcher })))
const Grade7ComplexPercentQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentQuiz").then(m => ({ default: m.ComplexPercentQuiz })))
const Grade7ComplexPercentSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentSorter").then(m => ({ default: m.ComplexPercentSorter })))
const Grade7ComplexPercentTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentTheory").then(m => ({ default: m.ComplexPercentTheory })))
const Grade7ConstructionsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsMatcher").then(m => ({ default: m.ConstructionsMatcher })))
const Grade7ConstructionsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsQuiz").then(m => ({ default: m.ConstructionsQuiz })))
const Grade7ConstructionsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsSorter").then(m => ({ default: m.ConstructionsSorter })))
const Grade7ConstructionsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsTheory").then(m => ({ default: m.ConstructionsTheory })))
const Grade7CountItMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingMatcher").then(m => ({ default: m.CountingMatcher })))
const Grade7CountItQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingQuiz").then(m => ({ default: m.CountingQuiz })))
const Grade7CountItSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingSorter").then(m => ({ default: m.CountingSorter })))
const Grade7CountItTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingTheory").then(m => ({ default: m.CountingTheory })))
const Grade7DeltoidAreaMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaMatcher").then(m => ({ default: m.DeltoidAreaMatcher })))
const Grade7DeltoidAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaQuiz").then(m => ({ default: m.DeltoidAreaQuiz })))
const Grade7DeltoidAreaSorter = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaSorter").then(m => ({ default: m.DeltoidAreaSorter })))
const Grade7DeltoidAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaTheory").then(m => ({ default: m.DeltoidAreaTheory })))
const Grade7DivisibilityReviewMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewMatcher").then(m => ({ default: m.DivisibilityReviewMatcher })))
const Grade7DivisibilityReviewQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewQuiz").then(m => ({ default: m.DivisibilityReviewQuiz })))
const Grade7DivisibilityReviewSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewSorter").then(m => ({ default: m.DivisibilityReviewSorter })))
const Grade7DivisibilityReviewTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewTheory").then(m => ({ default: m.DivisibilityReviewTheory })))
const Grade7DivisibilityRulesMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesMatcher").then(m => ({ default: m.DivisibilityRulesMatcher })))
const Grade7DivisibilityRulesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesQuiz").then(m => ({ default: m.DivisibilityRulesQuiz })))
const Grade7DivisibilityRulesSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesSorter").then(m => ({ default: m.DivisibilityRulesSorter })))
const Grade7DivisibilityRulesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesTheory").then(m => ({ default: m.DivisibilityRulesTheory })))
const Grade7DivisorsMultiplesMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesMatcher").then(m => ({ default: m.DivisorsMultiplesMatcher })))
const Grade7DivisorsMultiplesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesQuiz").then(m => ({ default: m.DivisorsMultiplesQuiz })))
const Grade7DivisorsMultiplesSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesSorter").then(m => ({ default: m.DivisorsMultiplesSorter })))
const Grade7DivisorsMultiplesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesTheory").then(m => ({ default: m.DivisorsMultiplesTheory })))
const Grade7EquationMethodsMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsMatcher").then(m => ({ default: m.EquationMethodsMatcher })))
const Grade7EquationMethodsQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsQuiz").then(m => ({ default: m.EquationMethodsQuiz })))
const Grade7EquationMethodsSorter = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsSorter").then(m => ({ default: m.EquationMethodsSorter })))
const Grade7EquationMethodsTheory = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsTheory").then(m => ({ default: m.EquationMethodsTheory })))
const Grade7EquationSolveMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveMatcher").then(m => ({ default: m.EquationSolveMatcher })))
const Grade7EquationSolveQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveQuiz").then(m => ({ default: m.EquationSolveQuiz })))
const Grade7EquationSolveSorter = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveSorter").then(m => ({ default: m.EquationSolveSorter })))
const Grade7EquationSolveTheory = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveTheory").then(m => ({ default: m.EquationSolveTheory })))
const Grade7EquationSummaryMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummaryMatcher").then(m => ({ default: m.EquationSummaryMatcher })))
const Grade7EquationSummaryQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummaryQuiz").then(m => ({ default: m.EquationSummaryQuiz })))
const Grade7EquationSummarySorter = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummarySorter").then(m => ({ default: m.EquationSummarySorter })))
const Grade7EquationSummaryTheory = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummaryTheory").then(m => ({ default: m.EquationSummaryTheory })))
const Grade7EquationWordProblemsMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsMatcher").then(m => ({ default: m.EquationWordProblemsMatcher })))
const Grade7EquationWordProblemsQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsQuiz").then(m => ({ default: m.EquationWordProblemsQuiz })))
const Grade7EquationWordProblemsSorter = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsSorter").then(m => ({ default: m.EquationWordProblemsSorter })))
const Grade7EquationWordProblemsTheory = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsTheory").then(m => ({ default: m.EquationWordProblemsTheory })))
const Grade7ExpansionFactoringMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringMatcher").then(m => ({ default: m.ExpansionFactoringMatcher })))
const Grade7ExpansionFactoringQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringQuiz").then(m => ({ default: m.ExpansionFactoringQuiz })))
const Grade7ExpansionFactoringSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringSorter").then(m => ({ default: m.ExpansionFactoringSorter })))
const Grade7ExpansionFactoringTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringTheory").then(m => ({ default: m.ExpansionFactoringTheory })))
const Grade7FractionsDecimalsMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsMatcher").then(m => ({ default: m.FractionsDecimalsMatcher })))
const Grade7FractionsDecimalsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsQuiz").then(m => ({ default: m.FractionsDecimalsQuiz })))
const Grade7FractionsDecimalsSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsSorter").then(m => ({ default: m.FractionsDecimalsSorter })))
const Grade7FractionsDecimalsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsTheory").then(m => ({ default: m.FractionsDecimalsTheory })))
const Grade7GamesMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameMatcher").then(m => ({ default: m.GameMatcher })))
const Grade7GamesQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameQuiz").then(m => ({ default: m.GameQuiz })))
const Grade7GamesSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameSorter").then(m => ({ default: m.GameSorter })))
const Grade7GamesTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameTheory").then(m => ({ default: m.GameTheory })))
const Grade7GeomEscapeRoomMatcher = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomMatcher").then(m => ({ default: m.GeometryEscapeRoomMatcher })))
const Grade7GeomEscapeRoomQuiz = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomQuiz").then(m => ({ default: m.GeometryEscapeRoomQuiz })))
const Grade7GeomEscapeRoomSorter = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomSorter").then(m => ({ default: m.GeometryEscapeRoomSorter })))
const Grade7GeomEscapeRoomTheory = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomTheory").then(m => ({ default: m.GeometryEscapeRoomTheory })))
const Grade7GeomSummaryMatcher = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummaryMatcher").then(m => ({ default: m.GeometrySummaryMatcher })))
const Grade7GeomSummaryQuiz = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz })))
const Grade7GeomSummarySorter = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummarySorter").then(m => ({ default: m.GeometrySummarySorter })))
const Grade7GeomSummaryTheory = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory })))
const Grade7GeometricConceptsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsMatcher").then(m => ({ default: m.GeometricConceptsMatcher })))
const Grade7GeometricConceptsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsQuiz").then(m => ({ default: m.GeometricConceptsQuiz })))
const Grade7GeometricConceptsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsSorter").then(m => ({ default: m.GeometricConceptsSorter })))
const Grade7GeometricConceptsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsTheory").then(m => ({ default: m.GeometricConceptsTheory })))
const Grade7GeometricTransformationsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsMatcher").then(m => ({ default: m.GeometricTransformationsMatcher })))
const Grade7GeometricTransformationsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsQuiz").then(m => ({ default: m.GeometricTransformationsQuiz })))
const Grade7GeometricTransformationsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsSorter").then(m => ({ default: m.GeometricTransformationsSorter })))
const Grade7GeometricTransformationsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsTheory").then(m => ({ default: m.GeometricTransformationsTheory })))
const Grade7GeometrySummaryMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummaryMatcher").then(m => ({ default: m.GeometrySummaryMatcher })))
const Grade7GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz })))
const Grade7GeometrySummarySorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummarySorter").then(m => ({ default: m.GeometrySummarySorter })))
const Grade7GeometrySummaryTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory })))
const Grade7GraphsMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphMatcher").then(m => ({ default: m.GraphMatcher })))
const Grade7GraphsQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphQuiz").then(m => ({ default: m.GraphQuiz })))
const Grade7GraphsSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphSorter").then(m => ({ default: m.GraphSorter })))
const Grade7GraphsTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphTheory").then(m => ({ default: m.GraphTheory })))
const Grade7GreatestCommonDivisorMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorMatcher").then(m => ({ default: m.GreatestCommonDivisorMatcher })))
const Grade7GreatestCommonDivisorQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorQuiz").then(m => ({ default: m.GreatestCommonDivisorQuiz })))
const Grade7GreatestCommonDivisorSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorSorter").then(m => ({ default: m.GreatestCommonDivisorSorter })))
const Grade7GreatestCommonDivisorTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorTheory").then(m => ({ default: m.GreatestCommonDivisorTheory })))
const Grade7HowManyCasesMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesMatcher").then(m => ({ default: m.PossibilitiesMatcher })))
const Grade7HowManyCasesQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesQuiz").then(m => ({ default: m.PossibilitiesQuiz })))
const Grade7HowManyCasesSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesSorter").then(m => ({ default: m.PossibilitiesSorter })))
const Grade7HowManyCasesTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesTheory").then(m => ({ default: m.PossibilitiesTheory })))
const Grade7IntegerPropertiesMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesMatcher").then(m => ({ default: m.IntegerPropertiesMatcher })))
const Grade7IntegerPropertiesQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesQuiz").then(m => ({ default: m.IntegerPropertiesQuiz })))
const Grade7IntegerPropertiesSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesSorter").then(m => ({ default: m.IntegerPropertiesSorter })))
const Grade7IntegerPropertiesTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesTheory").then(m => ({ default: m.IntegerPropertiesTheory })))
const Grade7LargeNumbersPowersMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersMatcher").then(m => ({ default: m.LargeNumbersPowersMatcher })))
const Grade7LargeNumbersPowersQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersQuiz").then(m => ({ default: m.LargeNumbersPowersQuiz })))
const Grade7LargeNumbersPowersSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersSorter").then(m => ({ default: m.LargeNumbersPowersSorter })))
const Grade7LargeNumbersPowersTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersTheory").then(m => ({ default: m.LargeNumbersPowersTheory })))
const Grade7LeastCommonMultipleMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleMatcher").then(m => ({ default: m.LeastCommonMultipleMatcher })))
const Grade7LeastCommonMultipleQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleQuiz").then(m => ({ default: m.LeastCommonMultipleQuiz })))
const Grade7LeastCommonMultipleSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleSorter").then(m => ({ default: m.LeastCommonMultipleSorter })))
const Grade7LeastCommonMultipleTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleTheory").then(m => ({ default: m.LeastCommonMultipleTheory })))
const Grade7LogicMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicMatcher").then(m => ({ default: m.LogicMatcher })))
const Grade7LogicQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicQuiz").then(m => ({ default: m.LogicQuiz })))
const Grade7LogicSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicSorter").then(m => ({ default: m.LogicSorter })))
const Grade7LogicTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicTheory").then(m => ({ default: m.LogicTheory })))
const Grade7MathGamesMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesMatcher").then(m => ({ default: m.MathGamesMatcher })))
const Grade7MathGamesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesQuiz").then(m => ({ default: m.MathGamesQuiz })))
const Grade7MathGamesSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesSorter").then(m => ({ default: m.MathGamesSorter })))
const Grade7MathGamesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesTheory").then(m => ({ default: m.MathGamesTheory })))
const Grade7NumbersLettersMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersMatcher").then(m => ({ default: m.NumbersLettersMatcher })))
const Grade7NumbersLettersQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersQuiz").then(m => ({ default: m.NumbersLettersQuiz })))
const Grade7NumbersLettersSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersSorter").then(m => ({ default: m.NumbersLettersSorter })))
const Grade7NumbersLettersTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersTheory").then(m => ({ default: m.NumbersLettersTheory })))
const Grade7OrderItMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingMatcher").then(m => ({ default: m.OrderingMatcher })))
const Grade7OrderItQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingQuiz").then(m => ({ default: m.OrderingQuiz })))
const Grade7OrderItSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingSorter").then(m => ({ default: m.OrderingSorter })))
const Grade7OrderItTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingTheory").then(m => ({ default: m.OrderingTheory })))
const Grade7ParallelogramAreaMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaMatcher").then(m => ({ default: m.ParallelogramAreaMatcher })))
const Grade7ParallelogramAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaQuiz").then(m => ({ default: m.ParallelogramAreaQuiz })))
const Grade7ParallelogramAreaSorter = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaSorter").then(m => ({ default: m.ParallelogramAreaSorter })))
const Grade7ParallelogramAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaTheory").then(m => ({ default: m.ParallelogramAreaTheory })))
const Grade7ParallelogramMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidMatcher").then(m => ({ default: m.ParallelogramDeltoidMatcher })))
const Grade7ParallelogramQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidQuiz").then(m => ({ default: m.ParallelogramDeltoidQuiz })))
const Grade7ParallelogramSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidSorter").then(m => ({ default: m.ParallelogramDeltoidSorter })))
const Grade7ParallelogramTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidTheory").then(m => ({ default: m.ParallelogramDeltoidTheory })))
const Grade7PctWordProblemsMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsMatcher").then(m => ({ default: m.WordProblemsMatcher })))
const Grade7PctWordProblemsQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz })))
const Grade7PctWordProblemsSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsSorter").then(m => ({ default: m.WordProblemsSorter })))
const Grade7PctWordProblemsTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory })))
const Grade7PercentReviewMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewMatcher").then(m => ({ default: m.PercentReviewMatcher })))
const Grade7PercentReviewQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewQuiz").then(m => ({ default: m.PercentReviewQuiz })))
const Grade7PercentReviewSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewSorter").then(m => ({ default: m.PercentReviewSorter })))
const Grade7PercentReviewTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewTheory").then(m => ({ default: m.PercentReviewTheory })))
const Grade7PercentSummaryMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummaryMatcher").then(m => ({ default: m.PercentSummaryMatcher })))
const Grade7PercentSummaryQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummaryQuiz").then(m => ({ default: m.PercentSummaryQuiz })))
const Grade7PercentSummarySorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummarySorter").then(m => ({ default: m.PercentSummarySorter })))
const Grade7PercentSummaryTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummaryTheory").then(m => ({ default: m.PercentSummaryTheory })))
const Grade7PointReflectionMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionMatcher").then(m => ({ default: m.PointReflectionMatcher })))
const Grade7PointReflectionQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionQuiz").then(m => ({ default: m.PointReflectionQuiz })))
const Grade7PointReflectionSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionSorter").then(m => ({ default: m.PointReflectionSorter })))
const Grade7PointReflectionTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionTheory").then(m => ({ default: m.PointReflectionTheory })))
const Grade7PointSymmetricShapesMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesMatcher").then(m => ({ default: m.PointSymmetricShapesMatcher })))
const Grade7PointSymmetricShapesQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesQuiz").then(m => ({ default: m.PointSymmetricShapesQuiz })))
const Grade7PointSymmetricShapesSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesSorter").then(m => ({ default: m.PointSymmetricShapesSorter })))
const Grade7PointSymmetricShapesTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesTheory").then(m => ({ default: m.PointSymmetricShapesTheory })))
const Grade7PolygonAnglesDiagonalsMatcher = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsMatcher").then(m => ({ default: m.PolygonAnglesDiagonalsMatcher })))
const Grade7PolygonAnglesDiagonalsQuiz = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsQuiz").then(m => ({ default: m.PolygonAnglesDiagonalsQuiz })))
const Grade7PolygonAnglesDiagonalsSorter = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsSorter").then(m => ({ default: m.PolygonAnglesDiagonalsSorter })))
const Grade7PolygonAnglesDiagonalsTheory = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsTheory").then(m => ({ default: m.PolygonAnglesDiagonalsTheory })))
const Grade7PowersApplicationMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationMatcher").then(m => ({ default: m.PowersApplicationMatcher })))
const Grade7PowersApplicationQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationQuiz").then(m => ({ default: m.PowersApplicationQuiz })))
const Grade7PowersApplicationSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationSorter").then(m => ({ default: m.PowersApplicationSorter })))
const Grade7PowersApplicationTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationTheory").then(m => ({ default: m.PowersApplicationTheory })))
const Grade7PowersSummaryMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummaryMatcher").then(m => ({ default: m.PowersSummaryMatcher })))
const Grade7PowersSummaryQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummaryQuiz").then(m => ({ default: m.PowersSummaryQuiz })))
const Grade7PowersSummarySorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummarySorter").then(m => ({ default: m.PowersSummarySorter })))
const Grade7PowersSummaryTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummaryTheory").then(m => ({ default: m.PowersSummaryTheory })))
const Grade7PracticeMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeMatcher").then(m => ({ default: m.PracticeMatcher })))
const Grade7PracticeQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeQuiz").then(m => ({ default: m.PracticeQuiz })))
const Grade7PracticeSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeSorter").then(m => ({ default: m.PracticeSorter })))
const Grade7PracticeTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeTheory").then(m => ({ default: m.PracticeTheory })))
const Grade7PrimeFactorizationMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationMatcher").then(m => ({ default: m.PrimeFactorizationMatcher })))
const Grade7PrimeFactorizationQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationQuiz").then(m => ({ default: m.PrimeFactorizationQuiz })))
const Grade7PrimeFactorizationSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationSorter").then(m => ({ default: m.PrimeFactorizationSorter })))
const Grade7PrimeFactorizationTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationTheory").then(m => ({ default: m.PrimeFactorizationTheory })))
const Grade7PrismSurfaceVolumeMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeMatcher").then(m => ({ default: m.PrismSurfaceVolumeMatcher })))
const Grade7PrismSurfaceVolumeQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeQuiz").then(m => ({ default: m.PrismSurfaceVolumeQuiz })))
const Grade7PrismSurfaceVolumeSorter = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeSorter").then(m => ({ default: m.PrismSurfaceVolumeSorter })))
const Grade7PrismSurfaceVolumeTheory = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeTheory").then(m => ({ default: m.PrismSurfaceVolumeTheory })))
const Grade7ProofsMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofMatcher").then(m => ({ default: m.ProofMatcher })))
const Grade7ProofsQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofQuiz").then(m => ({ default: m.ProofQuiz })))
const Grade7ProofsSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofSorter").then(m => ({ default: m.ProofSorter })))
const Grade7ProofsTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofTheory").then(m => ({ default: m.ProofTheory })))
const Grade7RatioReviewMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewMatcher").then(m => ({ default: m.RatioReviewMatcher })))
const Grade7RatioReviewQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewQuiz").then(m => ({ default: m.RatioReviewQuiz })))
const Grade7RatioReviewSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewSorter").then(m => ({ default: m.RatioReviewSorter })))
const Grade7RatioReviewTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewTheory").then(m => ({ default: m.RatioReviewTheory })))
const Grade7RationalOperationsMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsMatcher").then(m => ({ default: m.RationalOperationsMatcher })))
const Grade7RationalOperationsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsQuiz").then(m => ({ default: m.RationalOperationsQuiz })))
const Grade7RationalOperationsSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsSorter").then(m => ({ default: m.RationalOperationsSorter })))
const Grade7RationalOperationsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsTheory").then(m => ({ default: m.RationalOperationsTheory })))
const Grade7RationalSummaryMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummaryMatcher").then(m => ({ default: m.RationalSummaryMatcher })))
const Grade7RationalSummaryQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummaryQuiz").then(m => ({ default: m.RationalSummaryQuiz })))
const Grade7RationalSummarySorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummarySorter").then(m => ({ default: m.RationalSummarySorter })))
const Grade7RationalSummaryTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummaryTheory").then(m => ({ default: m.RationalSummaryTheory })))
const Grade7ReflectionAppMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppMatcher").then(m => ({ default: m.ReflectionAppMatcher })))
const Grade7ReflectionAppQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppQuiz").then(m => ({ default: m.ReflectionAppQuiz })))
const Grade7ReflectionAppSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppSorter").then(m => ({ default: m.ReflectionAppSorter })))
const Grade7ReflectionAppTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppTheory").then(m => ({ default: m.ReflectionAppTheory })))
const Grade7RegularPolygonsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsMatcher").then(m => ({ default: m.RegularPolygonsMatcher })))
const Grade7RegularPolygonsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsQuiz").then(m => ({ default: m.RegularPolygonsQuiz })))
const Grade7RegularPolygonsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsSorter").then(m => ({ default: m.RegularPolygonsSorter })))
const Grade7RegularPolygonsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsTheory").then(m => ({ default: m.RegularPolygonsTheory })))
const Grade7SolidsInSpaceAndPlaneMatcher = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneMatcher").then(m => ({ default: m.SolidsInSpaceAndPlaneMatcher })))
const Grade7SolidsInSpaceAndPlaneQuiz = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneQuiz").then(m => ({ default: m.SolidsInSpaceAndPlaneQuiz })))
const Grade7SolidsInSpaceAndPlaneSorter = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneSorter").then(m => ({ default: m.SolidsInSpaceAndPlaneSorter })))
const Grade7SolidsInSpaceAndPlaneTheory = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneTheory").then(m => ({ default: m.SolidsInSpaceAndPlaneTheory })))
const Grade7StatsCentralMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencyMatcher").then(m => ({ default: m.CentralTendencyMatcher })))
const Grade7StatsCentralQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencyQuiz").then(m => ({ default: m.CentralTendencyQuiz })))
const Grade7StatsCentralSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencySorter").then(m => ({ default: m.CentralTendencySorter })))
const Grade7StatsCentralTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencyTheory").then(m => ({ default: m.CentralTendencyTheory })))
const Grade7StatsExpMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationMatcher").then(m => ({ default: m.ExperimentSimulationMatcher })))
const Grade7StatsExpQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationQuiz").then(m => ({ default: m.ExperimentSimulationQuiz })))
const Grade7StatsExpSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationSorter").then(m => ({ default: m.ExperimentSimulationSorter })))
const Grade7StatsExpTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationTheory").then(m => ({ default: m.ExperimentSimulationTheory })))
const Grade7StatsFreqMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisMatcher").then(m => ({ default: m.FrequencyAnalysisMatcher })))
const Grade7StatsFreqQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisQuiz").then(m => ({ default: m.FrequencyAnalysisQuiz })))
const Grade7StatsFreqSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisSorter").then(m => ({ default: m.FrequencyAnalysisSorter })))
const Grade7StatsFreqTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisTheory").then(m => ({ default: m.FrequencyAnalysisTheory })))
const Grade7StatsGraphMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingMatcher").then(m => ({ default: m.GraphReadingMatcher })))
const Grade7StatsGraphQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingQuiz").then(m => ({ default: m.GraphReadingQuiz })))
const Grade7StatsGraphSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingSorter").then(m => ({ default: m.GraphReadingSorter })))
const Grade7StatsGraphTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingTheory").then(m => ({ default: m.GraphReadingTheory })))
const Grade7StatsProbMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilityMatcher").then(m => ({ default: m.ProbabilityMatcher })))
const Grade7StatsProbQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilityQuiz").then(m => ({ default: m.ProbabilityQuiz })))
const Grade7StatsProbSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilitySorter").then(m => ({ default: m.ProbabilitySorter })))
const Grade7StatsProbTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilityTheory").then(m => ({ default: m.ProbabilityTheory })))
const Grade7StatsRelationsMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsMatcher").then(m => ({ default: m.SetRelationsMatcher })))
const Grade7StatsRelationsQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsQuiz").then(m => ({ default: m.SetRelationsQuiz })))
const Grade7StatsRelationsSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsSorter").then(m => ({ default: m.SetRelationsSorter })))
const Grade7StatsRelationsTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsTheory").then(m => ({ default: m.SetRelationsTheory })))
const Grade7StatsRepMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsMatcher").then(m => ({ default: m.MappingRepresentationsMatcher })))
const Grade7StatsRepQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsQuiz").then(m => ({ default: m.MappingRepresentationsQuiz })))
const Grade7StatsRepSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsSorter").then(m => ({ default: m.MappingRepresentationsSorter })))
const Grade7StatsRepTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsTheory").then(m => ({ default: m.MappingRepresentationsTheory })))
const Grade7StatsSummaryMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummaryMatcher").then(m => ({ default: m.StatsSummaryMatcher })))
const Grade7StatsSummaryQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummaryQuiz").then(m => ({ default: m.StatsSummaryQuiz })))
const Grade7StatsSummarySorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummarySorter").then(m => ({ default: m.StatsSummarySorter })))
const Grade7StatsSummaryTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummaryTheory").then(m => ({ default: m.StatsSummaryTheory })))
const Grade7SummaryMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummaryMatcher").then(m => ({ default: m.SummaryMatcher })))
const Grade7SummaryQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummaryQuiz").then(m => ({ default: m.SummaryQuiz })))
const Grade7SummarySorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummarySorter").then(m => ({ default: m.SummarySorter })))
const Grade7SummaryTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummaryTheory").then(m => ({ default: m.SummaryTheory })))
const Grade7SymmetryMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonMatcher").then(m => ({ default: m.SymmetryComparisonMatcher })))
const Grade7SymmetryQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonQuiz").then(m => ({ default: m.SymmetryComparisonQuiz })))
const Grade7SymmetrySorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonSorter").then(m => ({ default: m.SymmetryComparisonSorter })))
const Grade7SymmetryTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonTheory").then(m => ({ default: m.SymmetryComparisonTheory })))
const Grade7TrapezoidAreaMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaMatcher").then(m => ({ default: m.TrapezoidAreaMatcher })))
const Grade7TrapezoidAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaQuiz").then(m => ({ default: m.TrapezoidAreaQuiz })))
const Grade7TrapezoidAreaSorter = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaSorter").then(m => ({ default: m.TrapezoidAreaSorter })))
const Grade7TrapezoidAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaTheory").then(m => ({ default: m.TrapezoidAreaTheory })))
const Grade7TriangleAreaMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaMatcher").then(m => ({ default: m.TriangleAreaMatcher })))
const Grade7TriangleAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaQuiz").then(m => ({ default: m.TriangleAreaQuiz })))
const Grade7TriangleAreaSorter = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaSorter").then(m => ({ default: m.TriangleAreaSorter })))
const Grade7TriangleAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaTheory").then(m => ({ default: m.TriangleAreaTheory })))
const Grade7TriangleCongruenceMatcher = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceMatcher").then(m => ({ default: m.TriangleCongruenceMatcher })))
const Grade7TriangleCongruenceQuiz = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceQuiz").then(m => ({ default: m.TriangleCongruenceQuiz })))
const Grade7TriangleCongruenceSorter = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceSorter").then(m => ({ default: m.TriangleCongruenceSorter })))
const Grade7TriangleCongruenceTheory = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceTheory").then(m => ({ default: m.TriangleCongruenceTheory })))
const Grade7TriangleLinesMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesMatcher").then(m => ({ default: m.TriangleLinesMatcher })))
const Grade7TriangleLinesQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesQuiz").then(m => ({ default: m.TriangleLinesQuiz })))
const Grade7TriangleLinesSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesSorter").then(m => ({ default: m.TriangleLinesSorter })))
const Grade7TriangleLinesTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesTheory").then(m => ({ default: m.TriangleLinesTheory })))
const Grade7TriangleSidesAnglesMatcher = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesMatcher").then(m => ({ default: m.TriangleSidesAnglesMatcher })))
const Grade7TriangleSidesAnglesQuiz = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesQuiz").then(m => ({ default: m.TriangleSidesAnglesQuiz })))
const Grade7TriangleSidesAnglesSorter = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesSorter").then(m => ({ default: m.TriangleSidesAnglesSorter })))
const Grade7TriangleSidesAnglesTheory = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesTheory").then(m => ({ default: m.TriangleSidesAnglesTheory })))
const Grade7TrianglesAndQuadrilateralsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsMatcher").then(m => ({ default: m.TrianglesAndQuadrilateralsMatcher })))
const Grade7TrianglesAndQuadrilateralsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsQuiz").then(m => ({ default: m.TrianglesAndQuadrilateralsQuiz })))
const Grade7TrianglesAndQuadrilateralsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsSorter").then(m => ({ default: m.TrianglesAndQuadrilateralsSorter })))
const Grade7TrianglesAndQuadrilateralsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsTheory").then(m => ({ default: m.TrianglesAndQuadrilateralsTheory })))
const Grade7WhatPercentMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentMatcher").then(m => ({ default: m.WhatPercentMatcher })))
const Grade7WhatPercentQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentQuiz").then(m => ({ default: m.WhatPercentQuiz })))
const Grade7WhatPercentSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentSorter").then(m => ({ default: m.WhatPercentSorter })))
const Grade7WhatPercentTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentTheory").then(m => ({ default: m.WhatPercentTheory })))
const Grade7WordProblemsMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsMatcher").then(m => ({ default: m.WordProblemsMatcher })))
const Grade7WordProblemsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz })))
const Grade7WordProblemsSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsSorter").then(m => ({ default: m.WordProblemsSorter })))
const Grade7WordProblemsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory })))
const MappingQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/MappingQuiz").then(m => ({ default: m.MappingQuiz })))
const WordProblemsQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz })))

export const Grade7Activities: React.FC<ActivityRouterProps> = ({
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
                  {activityType === 'g7-logic-count-it-theory' && (
                    <Grade7CountItTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-logic-count-it-quiz')}
                    />
                  )}

                  {activityType === 'g7-logic-count-it-quiz' && (
                    <Grade7CountItQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-logic-count-it-theory')}
                    />
                  )}

                  {activityType === 'g7-logic-count-it-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7CountItMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-count-it-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7CountItSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {/* Section 2: Rendezd sorba! */}

                  {activityType === 'g7-logic-order-it-theory' && (
                    <Grade7OrderItTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-logic-order-it-quiz')}
                    />
                  )}

                  {activityType === 'g7-logic-order-it-quiz' && (
                    <Grade7OrderItQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-logic-order-it-theory')}
                    />
                  )}

                  {activityType === 'g7-logic-order-it-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7OrderItMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-order-it-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7OrderItSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-how-many-cases-theory' && (
                    <Grade7HowManyCasesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-logic-how-many-cases-quiz')}
                    />
                  )}

                  {activityType === 'g7-logic-how-many-cases-quiz' && (
                    <Grade7HowManyCasesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-logic-how-many-cases-theory')}
                    />
                  )}

                  {activityType === 'g7-logic-how-many-cases-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7HowManyCasesMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-how-many-cases-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7HowManyCasesSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-graphs-theory' && (
                    <Grade7GraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-logic-graphs-quiz')}
                    />
                  )}

                  {activityType === 'g7-logic-graphs-quiz' && (
                    <Grade7GraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-logic-graphs-theory')}
                    />
                  )}

                  {activityType === 'g7-logic-graphs-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GraphsMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-graphs-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GraphsSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {/* Section 5: Igazold! Cáfold! */}

                  {activityType === 'g7-logic-proofs-theory' && (
                    <Grade7ProofsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-logic-proofs-quiz')}
                    />
                  )}

                  {activityType === 'g7-logic-proofs-quiz' && (
                    <Grade7ProofsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-logic-proofs-theory')}
                    />
                  )}

                  {activityType === 'g7-logic-proofs-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ProofsMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-proofs-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ProofsSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {/* Section 6: Matematikai játékok */}

                  {activityType === 'g7-logic-games-theory' && (
                    <Grade7GamesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-logic-games-quiz')}
                    />
                  )}

                  {activityType === 'g7-logic-games-quiz' && (
                    <Grade7GamesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-logic-games-theory')}
                    />
                  )}

                  {activityType === 'g7-logic-games-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GamesMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-games-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GamesSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {/* Section 7: Összefoglalás */}

                  {activityType === 'g7-logic-summary-theory' && (
                    <Grade7SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-logic-summary-quiz')}
                    />
                  )}

                  {activityType === 'g7-logic-summary-quiz' && (
                    <Grade7SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-logic-summary-theory')}
                    />
                  )}

                  {activityType === 'g7-logic-summary-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7SummaryMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-logic-summary-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7SummarySorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-integer-properties-theory' && (
                    <Grade7IntegerPropertiesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-integer-properties-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-integer-properties-quiz' && (
                    <Grade7IntegerPropertiesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-integer-properties-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-integer-properties-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7IntegerPropertiesMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-integer-properties-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7IntegerPropertiesSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-fractions-decimals-theory' && (
                    <Grade7FractionsDecimalsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-fractions-decimals-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-fractions-decimals-quiz' && (
                    <Grade7FractionsDecimalsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-fractions-decimals-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-fractions-decimals-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7FractionsDecimalsMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-fractions-decimals-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7FractionsDecimalsSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-operations-theory' && (
                    <Grade7RationalOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-operations-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-operations-quiz' && (
                    <Grade7RationalOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-operations-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-operations-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7RationalOperationsMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-operations-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7RationalOperationsSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-word-problems-theory' && (
                    <Grade7WordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-word-problems-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-word-problems-quiz' && (
                    <Grade7WordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-word-problems-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-word-problems-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7WordProblemsMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-word-problems-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7WordProblemsSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-complex-operations-theory' && (
                    <Grade7ComplexOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-complex-operations-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-complex-operations-quiz' && (
                    <Grade7ComplexOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-complex-operations-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-complex-operations-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ComplexOperationsMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-complex-operations-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ComplexOperationsSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-numbers-letters-theory' && (
                    <Grade7NumbersLettersTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-numbers-letters-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-numbers-letters-quiz' && (
                    <Grade7NumbersLettersQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-numbers-letters-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-numbers-letters-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7NumbersLettersMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-numbers-letters-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7NumbersLettersSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-combining-substitution-theory' && (
                    <Grade7CombiningSubstitutionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-combining-substitution-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-combining-substitution-quiz' && (
                    <Grade7CombiningSubstitutionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-combining-substitution-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-combining-substitution-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7CombiningSubstitutionMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-combining-substitution-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7CombiningSubstitutionSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-expansion-factoring-theory' && (
                    <Grade7ExpansionFactoringTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-expansion-factoring-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-expansion-factoring-quiz' && (
                    <Grade7ExpansionFactoringQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-expansion-factoring-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-expansion-factoring-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ExpansionFactoringMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-expansion-factoring-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ExpansionFactoringSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-summary-theory' && (
                    <Grade7RationalSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-rat-summary-quiz')}
                    />
                  )}

                  {activityType === 'g7-rat-summary-quiz' && (
                    <Grade7RationalSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-rat-summary-theory')}
                    />
                  )}

                  {activityType === 'g7-rat-summary-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7RationalSummaryMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g7-rat-summary-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7RationalSummarySorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {/* 7. Osztály - III. Geometriai transzformációk */}

                  {activityType === 'g7-geom-concepts-theory' && (
                    <Grade7GeometricConceptsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-concepts-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-concepts-quiz' && (
                    <Grade7GeometricConceptsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-concepts-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-concepts-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeometricConceptsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-concepts-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-concepts-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeometricConceptsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-concepts-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-triangle-lines-theory' && (
                    <Grade7TriangleLinesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-triangle-lines-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-triangle-lines-quiz' && (
                    <Grade7TriangleLinesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-triangle-lines-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-triangle-lines-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TriangleLinesMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-triangle-lines-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-triangle-lines-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TriangleLinesSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-triangle-lines-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-triangles-quads-theory' && (
                    <Grade7TrianglesAndQuadrilateralsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-triangles-quads-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-triangles-quads-quiz' && (
                    <Grade7TrianglesAndQuadrilateralsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-triangles-quads-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-triangles-quads-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TrianglesAndQuadrilateralsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-triangles-quads-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-triangles-quads-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TrianglesAndQuadrilateralsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-triangles-quads-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-transformations-theory' && (
                    <Grade7GeometricTransformationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-transformations-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-transformations-quiz' && (
                    <Grade7GeometricTransformationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-transformations-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-transformations-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeometricTransformationsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-transformations-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-transformations-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeometricTransformationsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-transformations-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-point-reflection-theory' && (
                    <Grade7PointReflectionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-point-reflection-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-point-reflection-quiz' && (
                    <Grade7PointReflectionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-point-reflection-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-point-reflection-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7PointReflectionMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-point-reflection-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-point-reflection-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7PointReflectionSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-point-reflection-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-reflection-app-theory' && (
                    <Grade7ReflectionAppTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-reflection-app-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-reflection-app-quiz' && (
                    <Grade7ReflectionAppQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-reflection-app-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-reflection-app-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ReflectionAppMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-reflection-app-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-reflection-app-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ReflectionAppSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-reflection-app-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-angle-pairs-theory' && (
                    <Grade7AnglePairsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-angle-pairs-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-angle-pairs-quiz' && (
                    <Grade7AnglePairsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-angle-pairs-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-angle-pairs-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7AnglePairsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-angle-pairs-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-angle-pairs-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7AnglePairsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-angle-pairs-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-symmetry-theory' && (
                    <Grade7SymmetryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-symmetry-quiz')}
                    />
                  )}

                  {(activityType === 'g7-geom-symmetry-quiz' || activityType === 'axial-symmetry-quiz') && (
                    <Grade7SymmetryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-symmetry-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-symmetry-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7SymmetryMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-symmetry-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-symmetry-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7SymmetrySorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-symmetry-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-parallelogram-theory' && (
                    <Grade7ParallelogramTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-parallelogram-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-parallelogram-quiz' && (
                    <Grade7ParallelogramQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-parallelogram-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-parallelogram-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ParallelogramMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-parallelogram-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-parallelogram-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ParallelogramSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-parallelogram-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-point-symmetric-shapes-theory' && (
                    <Grade7PointSymmetricShapesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-point-symmetric-shapes-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-point-symmetric-shapes-quiz' && (
                    <Grade7PointSymmetricShapesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-point-symmetric-shapes-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-point-symmetric-shapes-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7PointSymmetricShapesMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-point-symmetric-shapes-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-point-symmetric-shapes-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7PointSymmetricShapesSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-point-symmetric-shapes-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-regular-polygons-theory' && (
                    <Grade7RegularPolygonsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-regular-polygons-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-regular-polygons-quiz' && (
                    <Grade7RegularPolygonsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-regular-polygons-theory')}
                    />
                  )}

                  {activityType === 'g7-geom-regular-polygons-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7RegularPolygonsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-regular-polygons-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-regular-polygons-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7RegularPolygonsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-regular-polygons-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-circle-theory' && (
                    <Grade7CircleTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-circle-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-circle-quiz' && (
                    <Grade7CircleQuiz
                      onBack={handleBack}
                      onOpenMatcher={() => setActivityType('g7-geom-circle-matcher')}
                      onOpenSorter={() => setActivityType('g7-geom-circle-sorter')}
                    />
                  )}

                  {activityType === 'g7-geom-circle-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7CircleMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-circle-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-circle-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7CircleSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-circle-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-constructions-theory' && (
                    <Grade7ConstructionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-constructions-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-constructions-quiz' && (
                    <Grade7ConstructionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-constructions-theory')}
                      onOpenMatcher={() => setActivityType('g7-geom-constructions-matcher')}
                      onOpenSorter={() => setActivityType('g7-geom-constructions-sorter')}
                    />
                  )}

                  {activityType === 'g7-geom-constructions-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ConstructionsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-constructions-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-constructions-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ConstructionsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-constructions-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-summary-theory' && (
                    <Grade7GeometrySummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-summary-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-summary-quiz' && (
                    <Grade7GeometrySummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-summary-theory')}
                      onOpenMatcher={() => setActivityType('g7-geom-summary-matcher')}
                      onOpenSorter={() => setActivityType('g7-geom-summary-sorter')}
                    />
                  )}

                  {activityType === 'g7-geom-summary-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeometrySummaryMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-summary-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-geom-summary-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeometrySummarySorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-summary-quiz')} />
                    </div>
                  )}

                  {activityType === 'g7-pow-large-numbers-theory' && (
                    <Grade7LargeNumbersPowersTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-large-numbers-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-large-numbers-quiz' && (
                    <Grade7LargeNumbersPowersQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-large-numbers-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-large-numbers-matcher' && (
                    <Grade7LargeNumbersPowersMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-large-numbers-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-large-numbers-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-large-numbers-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-large-numbers-sorter' && (
                    <Grade7LargeNumbersPowersSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-large-numbers-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-large-numbers-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-large-numbers-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-application-theory' && (
                    <Grade7PowersApplicationTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-application-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-application-quiz' && (
                    <Grade7PowersApplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-application-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-application-matcher' && (
                    <Grade7PowersApplicationMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-application-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-application-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-application-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-application-sorter' && (
                    <Grade7PowersApplicationSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-application-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-application-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-application-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-divisibility-review-theory' && (
                    <Grade7DivisibilityReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-divisibility-review-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-divisibility-review-quiz' && (
                    <Grade7DivisibilityReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-divisibility-review-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-divisibility-review-matcher' && (
                    <Grade7DivisibilityReviewMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-divisibility-review-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-divisibility-review-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-divisibility-review-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-divisibility-review-sorter' && (
                    <Grade7DivisibilityReviewSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-divisibility-review-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-divisibility-review-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-divisibility-review-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-logic-theory' && (
                    <Grade7LogicTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-logic-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-logic-quiz' && (
                    <Grade7LogicQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-logic-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-logic-matcher' && (
                    <Grade7LogicMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-logic-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-logic-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-logic-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-logic-sorter' && (
                    <Grade7LogicSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-logic-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-logic-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-logic-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-prime-factors-theory' && (
                    <Grade7PrimeFactorizationTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-prime-factors-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-prime-factors-quiz' && (
                    <Grade7PrimeFactorizationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-prime-factors-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-prime-factors-matcher' && (
                    <Grade7PrimeFactorizationMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-prime-factors-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-prime-factors-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-prime-factors-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-prime-factors-sorter' && (
                    <Grade7PrimeFactorizationSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-prime-factors-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-prime-factors-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-prime-factors-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-custom-rules-theory' && (
                    <Grade7DivisibilityRulesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-custom-rules-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-custom-rules-quiz' && (
                    <Grade7DivisibilityRulesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-custom-rules-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-custom-rules-matcher' && (
                    <Grade7DivisibilityRulesMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-custom-rules-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-custom-rules-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-custom-rules-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-custom-rules-sorter' && (
                    <Grade7DivisibilityRulesSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-custom-rules-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-custom-rules-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-custom-rules-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-divisors-multiples-theory' && (
                    <Grade7DivisorsMultiplesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-divisors-multiples-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-divisors-multiples-quiz' && (
                    <Grade7DivisorsMultiplesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-divisors-multiples-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-divisors-multiples-matcher' && (
                    <Grade7DivisorsMultiplesMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-divisors-multiples-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-divisors-multiples-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-divisors-multiples-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-divisors-multiples-sorter' && (
                    <Grade7DivisorsMultiplesSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-divisors-multiples-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-divisors-multiples-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-divisors-multiples-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-gcd-theory' && (
                    <Grade7GreatestCommonDivisorTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-gcd-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-gcd-quiz' && (
                    <Grade7GreatestCommonDivisorQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-gcd-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-gcd-matcher' && (
                    <Grade7GreatestCommonDivisorMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-gcd-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-gcd-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-gcd-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-gcd-sorter' && (
                    <Grade7GreatestCommonDivisorSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-gcd-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-gcd-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-gcd-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-lcm-theory' && (
                    <Grade7LeastCommonMultipleTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-lcm-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-lcm-quiz' && (
                    <Grade7LeastCommonMultipleQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-lcm-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-lcm-matcher' && (
                    <Grade7LeastCommonMultipleMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-lcm-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-lcm-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-lcm-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-lcm-sorter' && (
                    <Grade7LeastCommonMultipleSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-lcm-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-lcm-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-lcm-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-games-theory' && (
                    <Grade7MathGamesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-games-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-games-quiz' && (
                    <Grade7MathGamesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-games-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-games-matcher' && (
                    <Grade7MathGamesMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-games-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-games-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-games-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-games-sorter' && (
                    <Grade7MathGamesSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-games-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-games-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-games-matcher')}
                    />
                  )}

                  {activityType === 'g7-pow-summary-theory' && (
                    <Grade7PowersSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pow-summary-quiz')}
                    />
                  )}

                  {activityType === 'g7-pow-summary-quiz' && (
                    <Grade7PowersSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-summary-theory')}
                    />
                  )}

                  {activityType === 'g7-pow-summary-matcher' && (
                    <Grade7PowersSummaryMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-summary-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-summary-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pow-summary-sorter')}
                    />
                  )}

                  {activityType === 'g7-pow-summary-sorter' && (
                    <Grade7PowersSummarySorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pow-summary-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pow-summary-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pow-summary-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-ratio-theory' && (
                    <Grade7RatioReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-ratio-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-ratio-quiz' && (
                    <Grade7RatioReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-ratio-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-ratio-matcher' && (
                    <Grade7RatioReviewMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-ratio-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-ratio-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-ratio-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-ratio-sorter' && (
                    <Grade7RatioReviewSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-ratio-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-ratio-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-ratio-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-review-theory' && (
                    <Grade7PercentReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-review-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-review-quiz' && (
                    <Grade7PercentReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-review-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-review-matcher' && (
                    <Grade7PercentReviewMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-review-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-review-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-review-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-review-sorter' && (
                    <Grade7PercentReviewSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-review-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-review-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-review-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-100-theory' && (
                    <Grade7CalculateHundredTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-100-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-100-quiz' && (
                    <Grade7CalculateHundredQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-100-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-100-matcher' && (
                    <Grade7CalculateHundredMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-100-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-100-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-100-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-100-sorter' && (
                    <Grade7CalculateHundredSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-100-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-100-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-100-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-what-theory' && (
                    <Grade7WhatPercentTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-what-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-what-quiz' && (
                    <Grade7WhatPercentQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-what-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-what-matcher' && (
                    <Grade7WhatPercentMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-what-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-what-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-what-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-what-sorter' && (
                    <Grade7WhatPercentSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-what-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-what-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-what-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-practice-theory' && (
                    <Grade7PracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-practice-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-practice-quiz' && (
                    <Grade7PracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-practice-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-practice-matcher' && (
                    <Grade7PracticeMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-practice-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-practice-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-practice-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-practice-sorter' && (
                    <Grade7PracticeSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-practice-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-practice-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-practice-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-complex-theory' && (
                    <Grade7ComplexPercentTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-complex-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-complex-quiz' && (
                    <Grade7ComplexPercentQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-complex-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-complex-matcher' && (
                    <Grade7ComplexPercentMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-complex-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-complex-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-complex-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-complex-sorter' && (
                    <Grade7ComplexPercentSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-complex-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-complex-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-complex-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-word-theory' && (
                    <Grade7PctWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-word-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-word-quiz' && (
                    <Grade7PctWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-word-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-word-matcher' && (
                    <Grade7PctWordProblemsMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-word-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-word-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-word-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-word-sorter' && (
                    <Grade7PctWordProblemsSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-word-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-word-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-word-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-summary-theory' && (
                    <Grade7PercentSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-summary-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-summary-quiz' && (
                    <Grade7PercentSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-summary-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-summary-matcher' && (
                    <Grade7PercentSummaryMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-summary-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-summary-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-summary-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-summary-sorter' && (
                    <Grade7PercentSummarySorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-summary-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-summary-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-summary-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-eq-methods-theory' && (
                    <Grade7EquationMethodsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-eq-methods-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-eq-methods-quiz' && (
                    <Grade7EquationMethodsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-eq-methods-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-eq-methods-matcher' && (
                    <Grade7EquationMethodsMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-eq-methods-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-eq-methods-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-eq-methods-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-eq-methods-sorter' && (
                    <Grade7EquationMethodsSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-eq-methods-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-eq-methods-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-eq-methods-matcher')}
                    />
                  )}

                  {activityType === 'g7-pct-balance-theory' && (
                    <Grade7BalanceScaleTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-pct-balance-quiz')}
                    />
                  )}

                  {activityType === 'g7-pct-balance-quiz' && (
                    <Grade7BalanceScaleQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-balance-theory')}
                    />
                  )}

                  {activityType === 'g7-pct-balance-matcher' && (
                    <Grade7BalanceScaleMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-balance-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-balance-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-pct-balance-sorter')}
                    />
                  )}

                  {activityType === 'g7-pct-balance-sorter' && (
                    <Grade7BalanceScaleSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-pct-balance-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-pct-balance-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-pct-balance-matcher')}
                    />
                  )}

                  {(activityType === 'g7-eq-solve-theory' || activityType === 'g7-pct-eq-solve-theory') && (
                    <Grade7EquationSolveTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-eq-solve-quiz')}
                    />
                  )}

                  {(activityType === 'g7-eq-solve-quiz' || activityType === 'g7-pct-eq-solve-quiz') && (
                    <Grade7EquationSolveQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-solve-theory')}
                    />
                  )}

                  {(activityType === 'g7-eq-solve-matcher' || activityType === 'g7-pct-eq-solve-matcher') && (
                    <Grade7EquationSolveMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-solve-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-eq-solve-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-eq-solve-sorter')}
                    />
                  )}

                  {(activityType === 'g7-eq-solve-sorter' || activityType === 'g7-pct-eq-solve-sorter') && (
                    <Grade7EquationSolveSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-solve-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-eq-solve-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-eq-solve-matcher')}
                    />
                  )}

                  {(activityType === 'g7-eq-word-theory' || activityType === 'g7-pct-eq-word-theory') && (
                    <Grade7EquationWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-eq-word-quiz')}
                    />
                  )}

                  {(activityType === 'g7-eq-word-quiz' || activityType === 'g7-pct-eq-word-quiz') && (
                    <Grade7EquationWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-word-theory')}
                    />
                  )}

                  {(activityType === 'g7-eq-word-matcher' || activityType === 'g7-pct-eq-word-matcher') && (
                    <Grade7EquationWordProblemsMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-word-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-eq-word-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-eq-word-sorter')}
                    />
                  )}

                  {(activityType === 'g7-eq-word-sorter' || activityType === 'g7-pct-eq-word-sorter') && (
                    <Grade7EquationWordProblemsSorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-word-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-eq-word-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-eq-word-matcher')}
                    />
                  )}

                  {(activityType === 'g7-eq-summary-theory' || activityType === 'g7-pct-eq-summary-theory') && (
                    <Grade7EquationSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-eq-summary-quiz')}
                    />
                  )}

                  {(activityType === 'g7-eq-summary-quiz' || activityType === 'g7-pct-eq-summary-quiz') && (
                    <Grade7EquationSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-summary-theory')}
                    />
                  )}

                  {(activityType === 'g7-eq-summary-matcher' || activityType === 'g7-pct-eq-summary-matcher') && (
                    <Grade7EquationSummaryMatcher
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-summary-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-eq-summary-quiz')}
                      onSwitchToSorter={() => setActivityType('g7-eq-summary-sorter')}
                    />
                  )}

                  {(activityType === 'g7-eq-summary-sorter' || activityType === 'g7-pct-eq-summary-sorter') && (
                    <Grade7EquationSummarySorter
                      onBack={handleBack}
                      onNextLevel={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-summary-theory')}
                      onSwitchToQuiz={() => setActivityType('g7-eq-summary-quiz')}
                      onSwitchToMatcher={() => setActivityType('g7-eq-summary-matcher')}
                    />
                  )}

                  {activityType === 'g7-geom-congruence-theory' && (
                    <Grade7TriangleCongruenceTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-congruence-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-congruence-quiz' && (
                    <Grade7TriangleCongruenceQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-congruence-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-congruence-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TriangleCongruenceMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-congruence-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-congruence-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-congruence-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-congruence-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TriangleCongruenceSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-congruence-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-congruence-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-congruence-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-sides-angles-theory' && (
                    <Grade7TriangleSidesAnglesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-sides-angles-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {(activityType === 'g7-geom-sides-angles-quiz' || activityType === 'triangle-angles-quiz') && (
                    <Grade7TriangleSidesAnglesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-sides-angles-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {(activityType === 'g7-geom-sides-angles-matcher' || activityType === 'angle-matching') && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TriangleSidesAnglesMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-sides-angles-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-sides-angles-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-sides-angles-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {(activityType === 'g7-geom-sides-angles-sorter' || activityType === 'triangle-classification') && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TriangleSidesAnglesSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-sides-angles-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-sides-angles-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-sides-angles-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-polygons-theory' && (
                    <Grade7PolygonAnglesDiagonalsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-polygons-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-polygons-quiz' && (
                    <Grade7PolygonAnglesDiagonalsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-polygons-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-polygons-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7PolygonAnglesDiagonalsMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-polygons-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-polygons-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-polygons-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-polygons-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7PolygonAnglesDiagonalsSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-polygons-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-polygons-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-polygons-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-units-theory' && (
                    <Grade7AreaVolumeUnitsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-units-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {(activityType === 'g7-geom-units-quiz' || activityType === 'area-conversion-quiz' || activityType === 'volume-quiz') && (
                    <Grade7AreaVolumeUnitsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-units-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-units-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7AreaVolumeUnitsMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-units-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-units-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-units-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-units-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7AreaVolumeUnitsSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-units-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-units-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-units-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-parallelogram-area-theory' && (
                    <Grade7ParallelogramAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-parallelogram-area-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {(activityType === 'g7-geom-parallelogram-area-quiz' || activityType === 'parallelogram-area-quiz' || activityType === 'parallelogram-area') && (
                    <Grade7ParallelogramAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-parallelogram-area-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-parallelogram-area-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ParallelogramAreaMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-parallelogram-area-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-parallelogram-area-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-parallelogram-area-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-parallelogram-area-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7ParallelogramAreaSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-parallelogram-area-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-parallelogram-area-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-parallelogram-area-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-triangle-area-theory' && (
                    <Grade7TriangleAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-triangle-area-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {(activityType === 'g7-geom-triangle-area-quiz' || activityType === 'area-calculation-quiz' || activityType === 'triangle-area') && (
                    <Grade7TriangleAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-triangle-area-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-triangle-area-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TriangleAreaMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-triangle-area-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-triangle-area-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-triangle-area-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-triangle-area-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TriangleAreaSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-triangle-area-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-triangle-area-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-triangle-area-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-trapezoid-area-theory' && (
                    <Grade7TrapezoidAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-trapezoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-trapezoid-area-quiz' && (
                    <Grade7TrapezoidAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-trapezoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-trapezoid-area-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TrapezoidAreaMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-trapezoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-trapezoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-trapezoid-area-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-trapezoid-area-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7TrapezoidAreaSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-trapezoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-trapezoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-trapezoid-area-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-deltoid-area-theory' && (
                    <Grade7DeltoidAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-deltoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-deltoid-area-quiz' && (
                    <Grade7DeltoidAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-deltoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-deltoid-area-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7DeltoidAreaMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-deltoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-deltoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-deltoid-area-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-deltoid-area-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7DeltoidAreaSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-deltoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-deltoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-deltoid-area-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-prism-surface-volume-theory' && (
                    <Grade7PrismSurfaceVolumeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-prism-surface-volume-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-prism-surface-volume-quiz' && (
                    <Grade7PrismSurfaceVolumeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-prism-surface-volume-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-prism-surface-volume-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7PrismSurfaceVolumeMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-prism-surface-volume-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-prism-surface-volume-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-prism-surface-volume-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-prism-surface-volume-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7PrismSurfaceVolumeSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-prism-surface-volume-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-prism-surface-volume-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-prism-surface-volume-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-solids-space-plane-theory' && (
                    <Grade7SolidsInSpaceAndPlaneTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-solids-space-plane-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-solids-space-plane-quiz' && (
                    <Grade7SolidsInSpaceAndPlaneQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-solids-space-plane-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-solids-space-plane-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7SolidsInSpaceAndPlaneMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-solids-space-plane-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-solids-space-plane-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-solids-space-plane-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-solids-space-plane-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7SolidsInSpaceAndPlaneSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-solids-space-plane-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-solids-space-plane-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-solids-space-plane-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-escape-room-theory' && (
                    <Grade7GeomEscapeRoomTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-escape-room-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-escape-room-quiz' && (
                    <Grade7GeomEscapeRoomQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-escape-room-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-escape-room-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeomEscapeRoomMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-escape-room-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-escape-room-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-escape-room-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-escape-room-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeomEscapeRoomSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-escape-room-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-escape-room-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-escape-room-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-summary-theory' && (
                    <Grade7GeomSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-summary-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {(activityType === 'g7-geom-summary-quiz' || activityType === 'g7-geometry-summary') && (
                    <Grade7GeomSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-summary-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-summary-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeomSummaryMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-summary-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-summary-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToSorter={() => handleActivitySelect('g7-geom-summary-sorter', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-geom-summary-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7GeomSummarySorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-geom-summary-theory', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-geom-summary-quiz', selectedTopic?.id || 'g7-geometry')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-geom-summary-matcher', selectedTopic?.id || 'g7-geometry')}
                      />
                    </div>
                  )}
                  {/* Grade 7 Geometria ágak vége */}

                  {/* Grade 7 VIII. Hozzárendelések, statisztika - 1. Két halmaz közötti hozzárendelések */}

                  {activityType === 'g7-stats-relations-theory' && (
                    <Grade7StatsRelationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-stats-relations-quiz', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-relations-quiz' && (
                    <Grade7StatsRelationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-relations-theory', selectedTopic?.id || 'g7-stats')}
                      onOpenMatcher={() => handleActivitySelect('g7-stats-relations-matcher', selectedTopic?.id || 'g7-stats')}
                      onOpenSorter={() => handleActivitySelect('g7-stats-relations-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-relations-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsRelationsMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-relations-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-relations-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToSorter={() => handleActivitySelect('g7-stats-relations-sorter', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-stats-relations-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsRelationsSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-relations-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-relations-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-stats-relations-matcher', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {/* Grade 7 VIII. Hozzárendelések, statisztika - 2. A hozzárendelések megadási módjai */}

                  {activityType === 'g7-stats-rep-theory' && (
                    <Grade7StatsRepTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-stats-rep-quiz', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-rep-quiz' && (
                    <Grade7StatsRepQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-rep-theory', selectedTopic?.id || 'g7-stats')}
                      onOpenMatcher={() => handleActivitySelect('g7-stats-rep-matcher', selectedTopic?.id || 'g7-stats')}
                      onOpenSorter={() => handleActivitySelect('g7-stats-rep-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-rep-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsRepMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-rep-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-rep-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToSorter={() => handleActivitySelect('g7-stats-rep-sorter', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-stats-rep-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsRepSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-rep-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-rep-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-stats-rep-matcher', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {/* Grade 7 VIII. Hozzárendelések, statisztika - 3. Olvassunk a grafikonról! */}

                  {activityType === 'g7-stats-graph-theory' && (
                    <Grade7StatsGraphTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-stats-graph-quiz', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-graph-quiz' && (
                    <Grade7StatsGraphQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-graph-theory', selectedTopic?.id || 'g7-stats')}
                      onOpenMatcher={() => handleActivitySelect('g7-stats-graph-matcher', selectedTopic?.id || 'g7-stats')}
                      onOpenSorter={() => handleActivitySelect('g7-stats-graph-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-graph-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsGraphMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-graph-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-graph-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToSorter={() => handleActivitySelect('g7-stats-graph-sorter', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-stats-graph-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsGraphSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-graph-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-graph-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-stats-graph-matcher', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {/* Grade 7 VIII. Hozzárendelések, statisztika - 4. Átlag, módusz, medián */}

                  {activityType === 'g7-stats-central-theory' && (
                    <Grade7StatsCentralTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-stats-central-quiz', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-central-quiz' && (
                    <Grade7StatsCentralQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-central-theory', selectedTopic?.id || 'g7-stats')}
                      onOpenMatcher={() => handleActivitySelect('g7-stats-central-matcher', selectedTopic?.id || 'g7-stats')}
                      onOpenSorter={() => handleActivitySelect('g7-stats-central-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-central-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsCentralMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-central-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-central-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToSorter={() => handleActivitySelect('g7-stats-central-sorter', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-stats-central-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsCentralSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-central-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-central-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-stats-central-matcher', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {/* Grade 7 VIII. Hozzárendelések, statisztika - 5. Gyakoriság, relatív gyakoriság */}

                  {activityType === 'g7-stats-freq-theory' && (
                    <Grade7StatsFreqTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-stats-freq-quiz', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-freq-quiz' && (
                    <Grade7StatsFreqQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-freq-theory', selectedTopic?.id || 'g7-stats')}
                      onOpenMatcher={() => handleActivitySelect('g7-stats-freq-matcher', selectedTopic?.id || 'g7-stats')}
                      onOpenSorter={() => handleActivitySelect('g7-stats-freq-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-freq-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsFreqMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-freq-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-freq-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToSorter={() => handleActivitySelect('g7-stats-freq-sorter', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-stats-freq-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsFreqSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-freq-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-freq-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-stats-freq-matcher', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {/* Grade 7 VIII. Hozzárendelések, statisztika - 6. Valószínűség */}

                  {activityType === 'g7-stats-prob-theory' && (
                    <Grade7StatsProbTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-stats-prob-quiz', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-prob-quiz' && (
                    <Grade7StatsProbQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-prob-theory', selectedTopic?.id || 'g7-stats')}
                      onOpenMatcher={() => handleActivitySelect('g7-stats-prob-matcher', selectedTopic?.id || 'g7-stats')}
                      onOpenSorter={() => handleActivitySelect('g7-stats-prob-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-prob-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsProbMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-prob-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-prob-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToSorter={() => handleActivitySelect('g7-stats-prob-sorter', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-stats-prob-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsProbSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-prob-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-prob-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-stats-prob-matcher', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {/* Grade 7 VIII. Hozzárendelések, statisztika - 7. Tippelj, kísérletezz, ellenőrizz! */}

                  {activityType === 'g7-stats-exp-theory' && (
                    <Grade7StatsExpTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-stats-exp-quiz', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-exp-quiz' && (
                    <Grade7StatsExpQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-exp-theory', selectedTopic?.id || 'g7-stats')}
                      onOpenMatcher={() => handleActivitySelect('g7-stats-exp-matcher', selectedTopic?.id || 'g7-stats')}
                      onOpenSorter={() => handleActivitySelect('g7-stats-exp-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-exp-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsExpMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-exp-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-exp-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToSorter={() => handleActivitySelect('g7-stats-exp-sorter', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-stats-exp-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsExpSorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-exp-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-exp-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-stats-exp-matcher', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {/* Grade 7 VIII. Hozzárendelések, statisztika - 8. Összefoglalás */}

                  {activityType === 'g7-stats-summary-theory' && (
                    <Grade7StatsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-stats-summary-quiz', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-summary-quiz' && (
                    <Grade7StatsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-summary-theory', selectedTopic?.id || 'g7-stats')}
                      onOpenMatcher={() => handleActivitySelect('g7-stats-summary-matcher', selectedTopic?.id || 'g7-stats')}
                      onOpenSorter={() => handleActivitySelect('g7-stats-summary-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  )}

                  {activityType === 'g7-stats-summary-matcher' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsSummaryMatcher
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-summary-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-summary-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToSorter={() => handleActivitySelect('g7-stats-summary-sorter', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-stats-summary-sorter' && (
                    <div className="w-full max-w-5xl mx-auto px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Vissza a témakörökhöz
                      </Button>
                      <Grade7StatsSummarySorter
                        onNextLevel={handleBack}
                        onBack={handleBack}
                        onSwitchToTheory={() => handleActivitySelect('g7-stats-summary-theory', selectedTopic?.id || 'g7-stats')}
                        onSwitchToQuiz={() => handleActivitySelect('g7-stats-summary-quiz', selectedTopic?.id || 'g7-stats')}
                        onSwitchToMatcher={() => handleActivitySelect('g7-stats-summary-matcher', selectedTopic?.id || 'g7-stats')}
                      />
                    </div>
                  )}

                  {activityType === 'g7-word-problems' && (
                    <WordProblemsQuiz onBack={handleBack} />
                  )}

                  {activityType === 'g7-mapping-quiz' && (
                    <MappingQuiz onBack={handleBack} />
                  )}

                  {activityType === 'g7-function-table-quiz' && (
                    <FunctionTableQuiz onBack={handleBack} />
                  )}

                  {(activityType === 'g7-rational-numbers' || activityType === 'g7-expression-usage') && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 animate-slide-up">
                      <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-400 mb-6 group-hover:scale-110 transition-transform">

                        {activityType === 'g7-rational-numbers' ? <Calculator className="w-12 h-12" /> : <Variable className="w-12 h-12" />}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">

                        {activityType === 'g7-rational-numbers' ? 'Racionális számok' : 'Számok és betűs kifejezések'}
                      </h3>
                      <p className="text-slate-500 max-w-md mx-auto mb-8 px-4">
                        Ez az interaktív modul hamarosan elkészül! Addig is nézd meg a többi tananyagot.
                      </p>
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="rounded-xl px-8"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza a témakörökhöz
                      </Button>
                    </div>
                  )}
    </>
  );
};
