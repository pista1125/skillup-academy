import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const Grade7AnglePairsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsQuiz").then(m => ({ default: m.AnglePairsQuiz })))
const Grade7AnglePairsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsTheory").then(m => ({ default: m.AnglePairsTheory })))
const Grade7AreaVolumeUnitsQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsQuiz").then(m => ({ default: m.AreaVolumeUnitsQuiz })))
const Grade7AreaVolumeUnitsTheory = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsTheory").then(m => ({ default: m.AreaVolumeUnitsTheory })))
const Grade7BalanceScaleQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleQuiz").then(m => ({ default: m.BalanceScaleQuiz })))
const Grade7BalanceScaleTheory = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleTheory").then(m => ({ default: m.BalanceScaleTheory })))
const Grade7CalculateHundredQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredQuiz").then(m => ({ default: m.CalculateHundredQuiz })))
const Grade7CalculateHundredTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredTheory").then(m => ({ default: m.CalculateHundredTheory })))
const Grade7CircleQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleQuiz").then(m => ({ default: m.CircleQuiz })))
const Grade7CircleTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleTheory").then(m => ({ default: m.CircleTheory })))
const Grade7CombiningSubstitutionQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionQuiz").then(m => ({ default: m.CombiningSubstitutionQuiz })))
const Grade7CombiningSubstitutionTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionTheory").then(m => ({ default: m.CombiningSubstitutionTheory })))
const Grade7ComplexOperationsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsQuiz").then(m => ({ default: m.ComplexOperationsQuiz })))
const Grade7ComplexOperationsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsTheory").then(m => ({ default: m.ComplexOperationsTheory })))
const Grade7ComplexPercentQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentQuiz").then(m => ({ default: m.ComplexPercentQuiz })))
const Grade7ComplexPercentTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentTheory").then(m => ({ default: m.ComplexPercentTheory })))
const Grade7ConstructionsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsQuiz").then(m => ({ default: m.ConstructionsQuiz })))
const Grade7ConstructionsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsTheory").then(m => ({ default: m.ConstructionsTheory })))
const Grade7CountItQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingQuiz").then(m => ({ default: m.CountingQuiz })))
const Grade7CountItTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingTheory").then(m => ({ default: m.CountingTheory })))
const Grade7DeltoidAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaQuiz").then(m => ({ default: m.DeltoidAreaQuiz })))
const Grade7DeltoidAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaTheory").then(m => ({ default: m.DeltoidAreaTheory })))
const Grade7DivisibilityReviewQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewQuiz").then(m => ({ default: m.DivisibilityReviewQuiz })))
const Grade7DivisibilityReviewTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewTheory").then(m => ({ default: m.DivisibilityReviewTheory })))
const Grade7DivisibilityRulesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesQuiz").then(m => ({ default: m.DivisibilityRulesQuiz })))
const Grade7DivisibilityRulesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesTheory").then(m => ({ default: m.DivisibilityRulesTheory })))
const Grade7DivisorsMultiplesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesQuiz").then(m => ({ default: m.DivisorsMultiplesQuiz })))
const Grade7DivisorsMultiplesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesTheory").then(m => ({ default: m.DivisorsMultiplesTheory })))
const Grade7EquationMethodsQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsQuiz").then(m => ({ default: m.EquationMethodsQuiz })))
const Grade7EquationMethodsTheory = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsTheory").then(m => ({ default: m.EquationMethodsTheory })))
const Grade7EquationSolveQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveQuiz").then(m => ({ default: m.EquationSolveQuiz })))
const Grade7EquationSolveTheory = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveTheory").then(m => ({ default: m.EquationSolveTheory })))
const Grade7EquationSummaryQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummaryQuiz").then(m => ({ default: m.EquationSummaryQuiz })))
const Grade7EquationSummaryTheory = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummaryTheory").then(m => ({ default: m.EquationSummaryTheory })))
const Grade7EquationWordProblemsQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsQuiz").then(m => ({ default: m.EquationWordProblemsQuiz })))
const Grade7EquationWordProblemsTheory = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsTheory").then(m => ({ default: m.EquationWordProblemsTheory })))
const Grade7ExpansionFactoringQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringQuiz").then(m => ({ default: m.ExpansionFactoringQuiz })))
const Grade7ExpansionFactoringTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringTheory").then(m => ({ default: m.ExpansionFactoringTheory })))
const Grade7FractionsDecimalsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsQuiz").then(m => ({ default: m.FractionsDecimalsQuiz })))
const Grade7FractionsDecimalsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsTheory").then(m => ({ default: m.FractionsDecimalsTheory })))
const Grade7GamesQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameQuiz").then(m => ({ default: m.GameQuiz })))
const Grade7GamesTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameTheory").then(m => ({ default: m.GameTheory })))
const Grade7GeomEscapeRoomQuiz = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomQuiz").then(m => ({ default: m.GeometryEscapeRoomQuiz })))
const Grade7GeomEscapeRoomTheory = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomTheory").then(m => ({ default: m.GeometryEscapeRoomTheory })))
const Grade7GeomSummaryQuiz = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz })))
const Grade7GeomSummaryTheory = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory })))
const Grade7GeometricConceptsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsQuiz").then(m => ({ default: m.GeometricConceptsQuiz })))
const Grade7GeometricConceptsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsTheory").then(m => ({ default: m.GeometricConceptsTheory })))
const Grade7GeometricTransformationsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsQuiz").then(m => ({ default: m.GeometricTransformationsQuiz })))
const Grade7GeometricTransformationsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsTheory").then(m => ({ default: m.GeometricTransformationsTheory })))
const Grade7GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz })))
const Grade7GeometrySummaryTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory })))
const Grade7GraphsQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphQuiz").then(m => ({ default: m.GraphQuiz })))
const Grade7GraphsTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphTheory").then(m => ({ default: m.GraphTheory })))
const Grade7GreatestCommonDivisorQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorQuiz").then(m => ({ default: m.GreatestCommonDivisorQuiz })))
const Grade7GreatestCommonDivisorTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorTheory").then(m => ({ default: m.GreatestCommonDivisorTheory })))
const Grade7HowManyCasesQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesQuiz").then(m => ({ default: m.PossibilitiesQuiz })))
const Grade7HowManyCasesTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesTheory").then(m => ({ default: m.PossibilitiesTheory })))
const Grade7IntegerPropertiesQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesQuiz").then(m => ({ default: m.IntegerPropertiesQuiz })))
const Grade7IntegerPropertiesTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesTheory").then(m => ({ default: m.IntegerPropertiesTheory })))
const Grade7LargeNumbersPowersQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersQuiz").then(m => ({ default: m.LargeNumbersPowersQuiz })))
const Grade7LargeNumbersPowersTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersTheory").then(m => ({ default: m.LargeNumbersPowersTheory })))
const Grade7LeastCommonMultipleQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleQuiz").then(m => ({ default: m.LeastCommonMultipleQuiz })))
const Grade7LeastCommonMultipleTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleTheory").then(m => ({ default: m.LeastCommonMultipleTheory })))
const Grade7LogicQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicQuiz").then(m => ({ default: m.LogicQuiz })))
const Grade7LogicTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicTheory").then(m => ({ default: m.LogicTheory })))
const Grade7MathGamesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesQuiz").then(m => ({ default: m.MathGamesQuiz })))
const Grade7MathGamesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesTheory").then(m => ({ default: m.MathGamesTheory })))
const Grade7NumbersLettersQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersQuiz").then(m => ({ default: m.NumbersLettersQuiz })))
const Grade7NumbersLettersTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersTheory").then(m => ({ default: m.NumbersLettersTheory })))
const Grade7OrderItQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingQuiz").then(m => ({ default: m.OrderingQuiz })))
const Grade7OrderItTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingTheory").then(m => ({ default: m.OrderingTheory })))
const Grade7ParallelogramAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaQuiz").then(m => ({ default: m.ParallelogramAreaQuiz })))
const Grade7ParallelogramAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaTheory").then(m => ({ default: m.ParallelogramAreaTheory })))
const Grade7ParallelogramQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidQuiz").then(m => ({ default: m.ParallelogramDeltoidQuiz })))
const Grade7ParallelogramTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidTheory").then(m => ({ default: m.ParallelogramDeltoidTheory })))
const Grade7PctWordProblemsQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz })))
const Grade7PctWordProblemsTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory })))
const Grade7PercentReviewQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewQuiz").then(m => ({ default: m.PercentReviewQuiz })))
const Grade7PercentReviewTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewTheory").then(m => ({ default: m.PercentReviewTheory })))
const Grade7PercentSummaryQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummaryQuiz").then(m => ({ default: m.PercentSummaryQuiz })))
const Grade7PercentSummaryTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummaryTheory").then(m => ({ default: m.PercentSummaryTheory })))
const Grade7PointReflectionQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionQuiz").then(m => ({ default: m.PointReflectionQuiz })))
const Grade7PointReflectionTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionTheory").then(m => ({ default: m.PointReflectionTheory })))
const Grade7PointSymmetricShapesQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesQuiz").then(m => ({ default: m.PointSymmetricShapesQuiz })))
const Grade7PointSymmetricShapesTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesTheory").then(m => ({ default: m.PointSymmetricShapesTheory })))
const Grade7PolygonAnglesDiagonalsQuiz = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsQuiz").then(m => ({ default: m.PolygonAnglesDiagonalsQuiz })))
const Grade7PolygonAnglesDiagonalsTheory = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsTheory").then(m => ({ default: m.PolygonAnglesDiagonalsTheory })))
const Grade7PowersApplicationQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationQuiz").then(m => ({ default: m.PowersApplicationQuiz })))
const Grade7PowersApplicationTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationTheory").then(m => ({ default: m.PowersApplicationTheory })))
const Grade7PowersSummaryQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummaryQuiz").then(m => ({ default: m.PowersSummaryQuiz })))
const Grade7PowersSummaryTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummaryTheory").then(m => ({ default: m.PowersSummaryTheory })))
const Grade7PracticeQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeQuiz").then(m => ({ default: m.PracticeQuiz })))
const Grade7PracticeTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeTheory").then(m => ({ default: m.PracticeTheory })))
const Grade7PrimeFactorizationQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationQuiz").then(m => ({ default: m.PrimeFactorizationQuiz })))
const Grade7PrimeFactorizationTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationTheory").then(m => ({ default: m.PrimeFactorizationTheory })))
const Grade7PrismSurfaceVolumeQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeQuiz").then(m => ({ default: m.PrismSurfaceVolumeQuiz })))
const Grade7PrismSurfaceVolumeTheory = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeTheory").then(m => ({ default: m.PrismSurfaceVolumeTheory })))
const Grade7ProofsQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofQuiz").then(m => ({ default: m.ProofQuiz })))
const Grade7ProofsTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofTheory").then(m => ({ default: m.ProofTheory })))
const Grade7RatioReviewQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewQuiz").then(m => ({ default: m.RatioReviewQuiz })))
const Grade7RatioReviewTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewTheory").then(m => ({ default: m.RatioReviewTheory })))
const Grade7RationalOperationsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsQuiz").then(m => ({ default: m.RationalOperationsQuiz })))
const Grade7RationalOperationsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsTheory").then(m => ({ default: m.RationalOperationsTheory })))
const Grade7RationalSummaryQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummaryQuiz").then(m => ({ default: m.RationalSummaryQuiz })))
const Grade7RationalSummaryTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummaryTheory").then(m => ({ default: m.RationalSummaryTheory })))
const Grade7ReflectionAppQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppQuiz").then(m => ({ default: m.ReflectionAppQuiz })))
const Grade7ReflectionAppTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppTheory").then(m => ({ default: m.ReflectionAppTheory })))
const Grade7RegularPolygonsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsQuiz").then(m => ({ default: m.RegularPolygonsQuiz })))
const Grade7RegularPolygonsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsTheory").then(m => ({ default: m.RegularPolygonsTheory })))
const Grade7SolidsInSpaceAndPlaneQuiz = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneQuiz").then(m => ({ default: m.SolidsInSpaceAndPlaneQuiz })))
const Grade7SolidsInSpaceAndPlaneTheory = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneTheory").then(m => ({ default: m.SolidsInSpaceAndPlaneTheory })))
const Grade7StatsCentralQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencyQuiz").then(m => ({ default: m.CentralTendencyQuiz })))
const Grade7StatsCentralTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencyTheory").then(m => ({ default: m.CentralTendencyTheory })))
const Grade7StatsExpQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationQuiz").then(m => ({ default: m.ExperimentSimulationQuiz })))
const Grade7StatsExpTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationTheory").then(m => ({ default: m.ExperimentSimulationTheory })))
const Grade7StatsFreqQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisQuiz").then(m => ({ default: m.FrequencyAnalysisQuiz })))
const Grade7StatsFreqTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisTheory").then(m => ({ default: m.FrequencyAnalysisTheory })))
const Grade7StatsGraphQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingQuiz").then(m => ({ default: m.GraphReadingQuiz })))
const Grade7StatsGraphTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingTheory").then(m => ({ default: m.GraphReadingTheory })))
const Grade7StatsProbQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilityQuiz").then(m => ({ default: m.ProbabilityQuiz })))
const Grade7StatsProbTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilityTheory").then(m => ({ default: m.ProbabilityTheory })))
const Grade7StatsRelationsQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsQuiz").then(m => ({ default: m.SetRelationsQuiz })))
const Grade7StatsRelationsTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsTheory").then(m => ({ default: m.SetRelationsTheory })))
const Grade7StatsRepQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsQuiz").then(m => ({ default: m.MappingRepresentationsQuiz })))
const Grade7StatsRepTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsTheory").then(m => ({ default: m.MappingRepresentationsTheory })))
const Grade7StatsSummaryQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummaryQuiz").then(m => ({ default: m.StatsSummaryQuiz })))
const Grade7StatsSummaryTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummaryTheory").then(m => ({ default: m.StatsSummaryTheory })))
const Grade7SummaryQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummaryQuiz").then(m => ({ default: m.SummaryQuiz })))
const Grade7SummaryTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummaryTheory").then(m => ({ default: m.SummaryTheory })))
const Grade7SymmetryQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonQuiz").then(m => ({ default: m.SymmetryComparisonQuiz })))
const Grade7SymmetryTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonTheory").then(m => ({ default: m.SymmetryComparisonTheory })))
const Grade7TrapezoidAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaQuiz").then(m => ({ default: m.TrapezoidAreaQuiz })))
const Grade7TrapezoidAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaTheory").then(m => ({ default: m.TrapezoidAreaTheory })))
const Grade7TriangleAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaQuiz").then(m => ({ default: m.TriangleAreaQuiz })))
const Grade7TriangleAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaTheory").then(m => ({ default: m.TriangleAreaTheory })))
const Grade7TriangleCongruenceQuiz = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceQuiz").then(m => ({ default: m.TriangleCongruenceQuiz })))
const Grade7TriangleCongruenceTheory = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceTheory").then(m => ({ default: m.TriangleCongruenceTheory })))
const Grade7TriangleLinesQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesQuiz").then(m => ({ default: m.TriangleLinesQuiz })))
const Grade7TriangleLinesTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesTheory").then(m => ({ default: m.TriangleLinesTheory })))
const Grade7TriangleSidesAnglesQuiz = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesQuiz").then(m => ({ default: m.TriangleSidesAnglesQuiz })))
const Grade7TriangleSidesAnglesTheory = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesTheory").then(m => ({ default: m.TriangleSidesAnglesTheory })))
const Grade7TrianglesAndQuadrilateralsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsQuiz").then(m => ({ default: m.TrianglesAndQuadrilateralsQuiz })))
const Grade7TrianglesAndQuadrilateralsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsTheory").then(m => ({ default: m.TrianglesAndQuadrilateralsTheory })))
const Grade7WhatPercentQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentQuiz").then(m => ({ default: m.WhatPercentQuiz })))
const Grade7WhatPercentTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentTheory").then(m => ({ default: m.WhatPercentTheory })))
const Grade7WordProblemsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz })))
const Grade7WordProblemsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory })))

// Lazy loaded activity components

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

                  {activityType === 'g7-geom-symmetry-theory' && (
                    <Grade7SymmetryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-symmetry-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-symmetry-quiz' && (
                    <Grade7SymmetryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-symmetry-theory')}
                    />
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

                  {activityType === 'g7-geom-circle-theory' && (
                    <Grade7CircleTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-geom-circle-quiz')}
                    />
                  )}

                  {activityType === 'g7-geom-circle-quiz' && (
                    <Grade7CircleQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-geom-circle-theory')}
                    />
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
                    />
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
                    />
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

                  {activityType === 'g7-eq-solve-theory' && (
                    <Grade7EquationSolveTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-eq-solve-quiz')}
                    />
                  )}

                  {activityType === 'g7-eq-solve-quiz' && (
                    <Grade7EquationSolveQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-solve-theory')}
                    />
                  )}

                  {activityType === 'g7-eq-word-theory' && (
                    <Grade7EquationWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-eq-word-quiz')}
                    />
                  )}

                  {activityType === 'g7-eq-word-quiz' && (
                    <Grade7EquationWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-word-theory')}
                    />
                  )}

                  {activityType === 'g7-eq-summary-theory' && (
                    <Grade7EquationSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g7-eq-summary-quiz')}
                    />
                  )}

                  {activityType === 'g7-eq-summary-quiz' && (
                    <Grade7EquationSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g7-eq-summary-theory')}
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

                  {activityType === 'g7-geom-sides-angles-theory' && (
                    <Grade7TriangleSidesAnglesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-sides-angles-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-sides-angles-quiz' && (
                    <Grade7TriangleSidesAnglesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-sides-angles-theory', selectedTopic?.id || 'g7-geometry')}
                    />
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

                  {activityType === 'g7-geom-units-theory' && (
                    <Grade7AreaVolumeUnitsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-units-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-units-quiz' && (
                    <Grade7AreaVolumeUnitsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-units-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-parallelogram-area-theory' && (
                    <Grade7ParallelogramAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-parallelogram-area-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-parallelogram-area-quiz' && (
                    <Grade7ParallelogramAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-parallelogram-area-theory', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-triangle-area-theory' && (
                    <Grade7TriangleAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geom-triangle-area-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geom-triangle-area-quiz' && (
                    <Grade7TriangleAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-triangle-area-theory', selectedTopic?.id || 'g7-geometry')}
                    />
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

                  {activityType === 'g7-geometry-summary-theory' && (
                    <Grade7GeomSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g7-geometry-summary-quiz', selectedTopic?.id || 'g7-geometry')}
                    />
                  )}

                  {activityType === 'g7-geometry-summary-quiz' && (
                    <Grade7GeomSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geometry-summary-theory', selectedTopic?.id || 'g7-geometry')}
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
                  )}

    </>
  );
};
