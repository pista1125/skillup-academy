import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

// Lazy loaded activity components
const AreaVolumeMeasurementQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementQuiz").then(m => ({ default: m.AreaVolumeMeasurementQuiz })))
const AreaVolumeMeasurementTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementTheory").then(m => ({ default: m.AreaVolumeMeasurementTheory })))
const Chapter5SummaryQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummaryQuiz").then(m => ({ default: m.Chapter5SummaryQuiz })))
const Chapter5SummaryTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummaryTheory").then(m => ({ default: m.Chapter5SummaryTheory })))
const ChartsDiagramsQuiz = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsQuiz").then(m => ({ default: m.ChartsDiagramsQuiz })))
const ChartsDiagramsTheory = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsTheory").then(m => ({ default: m.ChartsDiagramsTheory })))
const DataMeanQuiz = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanQuiz").then(m => ({ default: m.DataMeanQuiz })))
const DataMeanTheory = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanTheory").then(m => ({ default: m.DataMeanTheory })))
const DirectProportionGraphQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphQuiz").then(m => ({ default: m.DirectProportionGraphQuiz })))
const DirectProportionGraphTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphTheory").then(m => ({ default: m.DirectProportionGraphTheory })))
const DirectProportionQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionQuiz").then(m => ({ default: m.DirectProportionQuiz })))
const DirectProportionTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionTheory").then(m => ({ default: m.DirectProportionTheory })))
const FractionPartQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartQuiz").then(m => ({ default: m.FractionPartQuiz })))
const FractionPartTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartTheory").then(m => ({ default: m.FractionPartTheory })))
const Grade6AxialReflectionQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionQuiz").then(m => ({ default: m.AxialReflectionQuiz })))
const Grade6AxialReflectionTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionTheory").then(m => ({ default: m.AxialReflectionTheory })))
const Grade6AxialSymmetryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryQuiz").then(m => ({ default: m.AxialSymmetryQuiz })))
const Grade6AxialSymmetryTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryTheory").then(m => ({ default: m.AxialSymmetryTheory })))
const Grade6BisectorQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorQuiz").then(m => ({ default: m.BisectorQuiz })))
const Grade6BisectorTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorTheory").then(m => ({ default: m.BisectorTheory })))
const Grade6Chapter1SummaryQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszefoglalas/Chapter1SummaryQuiz").then(m => ({ default: m.Chapter1SummaryQuiz }))) as any;
const Grade6Chapter1SummaryTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszefoglalas/Chapter1SummaryTheory").then(m => ({ default: m.Chapter1SummaryTheory })))
const Grade6CircleQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleQuiz").then(m => ({ default: m.CircleQuiz })))
const Grade6CircleTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleTheory").then(m => ({ default: m.CircleTheory })))
const Grade6ComplexOperationsQuiz = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsQuiz").then(m => ({ default: m.ComplexOperationsQuiz })))
const Grade6ComplexOperationsTheory = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsTheory").then(m => ({ default: m.ComplexOperationsTheory })))
const Grade6CongruenceQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceQuiz").then(m => ({ default: m.CongruenceQuiz })))
const Grade6CongruenceTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceTheory").then(m => ({ default: m.CongruenceTheory })))
const Grade6ConstructionTasksQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksQuiz").then(m => ({ default: m.ConstructionTasksQuiz })))
const Grade6ConstructionTasksTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksTheory").then(m => ({ default: m.ConstructionTasksTheory })))
const Grade6ConstructionsQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsQuiz").then(m => ({ default: m.ConstructionsQuiz })))
const Grade6ConstructionsTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsTheory").then(m => ({ default: m.ConstructionsTheory })))
const Grade6CountingPossibilitiesQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-eset-van/CountingPossibilitiesQuiz").then(m => ({ default: m.CountingPossibilitiesQuiz })))
const Grade6CountingPossibilitiesTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-eset-van/CountingPossibilitiesTheory").then(m => ({ default: m.CountingPossibilitiesTheory })))
const Grade6DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionQuiz").then(m => ({ default: m.DecimalDivisionQuiz })))
const Grade6DecimalDivisionTheory = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionTheory").then(m => ({ default: m.DecimalDivisionTheory })))
const Grade6DecimalFractionsQuiz = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/DecimalFractionsQuiz").then(m => ({ default: m.DecimalFractionsQuiz })))
const Grade6DecimalFractionsTheory = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/DecimalFractionsTheory").then(m => ({ default: m.DecimalFractionsTheory })))
const Grade6DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationQuiz").then(m => ({ default: m.DecimalMultiplicationQuiz })))
const Grade6DecimalMultiplicationTheory = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationTheory").then(m => ({ default: m.DecimalMultiplicationTheory })))
const Grade6DivisibilityBy2510Quiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-2-vel-5-tel-10-zel/DivisibilityBy2510Quiz").then(m => ({ default: m.DivisibilityBy2510Quiz })))
const Grade6DivisibilityBy2510Theory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-2-vel-5-tel-10-zel/DivisibilityBy2510Theory").then(m => ({ default: m.DivisibilityBy2510Theory })))
const Grade6DivisibilityBy39Quiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-3-mal-es-9-cel/DivisibilityBy39Quiz").then(m => ({ default: m.DivisibilityBy39Quiz })))
const Grade6DivisibilityBy39Theory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-3-mal-es-9-cel/DivisibilityBy39Theory").then(m => ({ default: m.DivisibilityBy39Theory })))
const Grade6DivisibilityBy4100Quiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-4-gyel-es-100-zal/DivisibilityBy4100Quiz").then(m => ({ default: m.DivisibilityBy4100Quiz })))
const Grade6DivisibilityBy4100Theory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-4-gyel-es-100-zal/DivisibilityBy4100Theory").then(m => ({ default: m.DivisibilityBy4100Theory })))
const Grade6DivisibilityCompositeQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszetett-oszthatosagi-szabalyok/DivisibilityCompositeQuiz").then(m => ({ default: m.DivisibilityCompositeQuiz })))
const Grade6DivisibilityCompositeTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszetett-oszthatosagi-szabalyok/DivisibilityCompositeTheory").then(m => ({ default: m.DivisibilityCompositeTheory })))
const Grade6DivisionQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-osztasa/IntegerDivisionQuiz").then(m => ({ default: m.IntegerDivisionQuiz })))
const Grade6DivisionTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-osztasa/IntegerDivisionTheory").then(m => ({ default: m.IntegerDivisionTheory })))
const Grade6DivisorsMultiplesQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-tobbszoros/DivisorsMultiplesQuiz").then(m => ({ default: m.DivisorsMultiplesQuiz })))
const Grade6DivisorsMultiplesTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-tobbszoros/DivisorsMultiplesTheory").then(m => ({ default: m.DivisorsMultiplesTheory })))
const Grade6FractionDivisionQuiz = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionQuiz").then(m => ({ default: m.FractionDivisionQuiz })))
const Grade6FractionDivisionTheory = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionTheory").then(m => ({ default: m.FractionDivisionTheory })))
const Grade6FractionMultiplicationQuiz = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationQuiz").then(m => ({ default: m.FractionMultiplicationQuiz })))
const Grade6FractionMultiplicationTheory = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationTheory").then(m => ({ default: m.FractionMultiplicationTheory })))
const Grade6FractionsReviewQuiz = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewQuiz").then(m => ({ default: m.FractionsReviewQuiz })))
const Grade6FractionsReviewTheory = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewTheory").then(m => ({ default: m.FractionsReviewTheory })))
const Grade6FractionsSummaryQuiz = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummaryQuiz").then(m => ({ default: m.FractionsSummaryQuiz })))
const Grade6FractionsSummaryTheory = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummaryTheory").then(m => ({ default: m.FractionsSummaryTheory })))
const Grade6GCDQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-kozos-oszto/GCDQuiz").then(m => ({ default: m.GCDQuiz })))
const Grade6GCDTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-kozos-oszto/GCDTheory").then(m => ({ default: m.GCDTheory })))
const Grade6GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz })))
const Grade6GeometrySummaryTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory })))
const Grade6LCMQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/tobbszoros-kozos-tobbszoros/LCMQuiz").then(m => ({ default: m.LCMQuiz })))
const Grade6LCMTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/tobbszoros-kozos-tobbszoros/LCMTheory").then(m => ({ default: m.LCMTheory })))
const Grade6MultiplicationQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-szorzasa/IntegerMultiplicationQuiz").then(m => ({ default: m.IntegerMultiplicationQuiz })))
const Grade6MultiplicationTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-szorzasa/IntegerMultiplicationTheory").then(m => ({ default: m.IntegerMultiplicationTheory })))
const Grade6OperationsQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/muveletek-az-egesz-szamok-koreben/OperationsWithIntegersQuiz").then(m => ({ default: m.OperationsWithIntegersQuiz })))
const Grade6OperationsTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/muveletek-az-egesz-szamok-koreben/OperationsWithIntegersTheory").then(m => ({ default: m.OperationsWithIntegersTheory })))
const Grade6PlanarShapesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesQuiz").then(m => ({ default: m.PlanarShapesQuiz })))
const Grade6PlanarShapesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesTheory").then(m => ({ default: m.PlanarShapesTheory })))
const Grade6PrimeFactorizationQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationQuiz").then(m => ({ default: m.PrimeFactorizationQuiz })))
const Grade6PrimeFactorizationTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationTheory").then(m => ({ default: m.PrimeFactorizationTheory })))
const Grade6ReflectionPropertiesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesQuiz").then(m => ({ default: m.ReflectionPropertiesQuiz })))
const Grade6ReflectionPropertiesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesTheory").then(m => ({ default: m.ReflectionPropertiesTheory })))
const Grade6RemaindersQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/szamolas-maradekokkal/RemainderCalculationQuiz").then(m => ({ default: m.RemainderCalculationQuiz })))
const Grade6RemaindersTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/szamolas-maradekokkal/RemainderCalculationTheory").then(m => ({ default: m.RemainderCalculationTheory })))
const Grade6SurfaceAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaQuiz").then(m => ({ default: m.SurfaceAreaQuiz })))
const Grade6SymmetricShapesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesQuiz").then(m => ({ default: m.SymmetricShapesQuiz })))
const Grade6SymmetricShapesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesTheory").then(m => ({ default: m.SymmetricShapesTheory })))
const Grade6VolumeQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeQuiz").then(m => ({ default: m.VolumeQuiz })))
const Grade6WordProblemsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz })))
const Grade6WordProblemsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory })))
const LengthMassTimeQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeQuiz").then(m => ({ default: m.LengthMassTimeQuiz })))
const LengthMassTimeTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeTheory").then(m => ({ default: m.LengthMassTimeTheory })))
const MultipleSolutionsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsQuiz").then(m => ({ default: m.MultipleSolutionsQuiz })))
const MultipleSolutionsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsTheory").then(m => ({ default: m.MultipleSolutionsTheory })))
const OpenSentencesQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesQuiz").then(m => ({ default: m.OpenSentencesQuiz })))
const OpenSentencesTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesTheory").then(m => ({ default: m.OpenSentencesTheory })))
const PercentPracticeQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeQuiz").then(m => ({ default: m.PercentPracticeQuiz })))
const PercentPracticeTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeTheory").then(m => ({ default: m.PercentPracticeTheory })))
const PercentageQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageQuiz").then(m => ({ default: m.PercentageQuiz })))
const PercentageTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageTheory").then(m => ({ default: m.PercentageTheory })))
const PieChartQuiz = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartQuiz").then(m => ({ default: m.PieChartQuiz })))
const PieChartTheory = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartTheory").then(m => ({ default: m.PieChartTheory })))
const PolygonAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaQuiz").then(m => ({ default: m.PolygonAreaQuiz })))
const PolygonAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaTheory").then(m => ({ default: m.PolygonAreaTheory })))
const PolygonPerimeterQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterQuiz").then(m => ({ default: m.PolygonPerimeterQuiz })))
const PolygonPerimeterTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterTheory").then(m => ({ default: m.PolygonPerimeterTheory })))
const PracticalSurfaceAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaQuiz").then(m => ({ default: m.PracticalSurfaceAreaQuiz })))
const PracticalSurfaceAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaTheory").then(m => ({ default: m.PracticalSurfaceAreaTheory })))
const ProportionalDivisionQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionQuiz").then(m => ({ default: m.ProportionalDivisionQuiz })))
const ProportionalDivisionTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionTheory").then(m => ({ default: m.ProportionalDivisionTheory })))
const RatioIntroQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroQuiz").then(m => ({ default: m.RatioIntroQuiz })))
const RatioIntroTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroTheory").then(m => ({ default: m.RatioIntroTheory })))
const RatioSummaryQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummaryQuiz").then(m => ({ default: m.RatioSummaryQuiz })))
const RatioSummaryTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummaryTheory").then(m => ({ default: m.RatioSummaryTheory })))
const RulesAndRelationsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsQuiz").then(m => ({ default: m.RulesAndRelationsQuiz })))
const RulesAndRelationsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsTheory").then(m => ({ default: m.RulesAndRelationsTheory })))
const SpatialShapesQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesQuiz").then(m => ({ default: m.SpatialShapesQuiz })))
const SpatialShapesTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesTheory").then(m => ({ default: m.SpatialShapesTheory })))
const StatisticsGamesQuiz = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesQuiz").then(m => ({ default: m.StatisticsGamesQuiz })))
const StatisticsGamesTheory = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesTheory").then(m => ({ default: m.StatisticsGamesTheory })))
const StatisticsSummaryQuiz = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummaryQuiz").then(m => ({ default: m.StatisticsSummaryQuiz })))
const StatisticsSummaryTheory = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummaryTheory").then(m => ({ default: m.StatisticsSummaryTheory })))
const SurfaceAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaTheory").then(m => ({ default: m.SurfaceAreaTheory })))
const VolumeTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeTheory").then(m => ({ default: m.VolumeTheory })))

export const Grade6Activities: React.FC<ActivityRouterProps> = ({
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
    (typeof selectedTopic === 'string' ? selectedTopic : selectedTopic?.id) || fallback;
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
                  {activityType === 'g6-planar-shapes-theory' && (
                    <Grade6PlanarShapesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-planar-shapes-quiz')}
                    />
                  )}

                  {activityType === 'g6-planar-shapes-quiz' && (
                    <Grade6PlanarShapesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-planar-shapes-theory')}
                    />
                  )}

                  {activityType === 'g6-congruence-theory' && (
                    <Grade6CongruenceTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-congruence-quiz')}
                    />
                  )}

                  {activityType === 'g6-congruence-quiz' && (
                    <Grade6CongruenceQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-congruence-theory')}
                    />
                  )}

                  {activityType === 'g6-circle-theory' && (
                    <Grade6CircleTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-circle-quiz')}
                    />
                  )}

                  {activityType === 'g6-circle-quiz' && (
                    <Grade6CircleQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-circle-theory')}
                    />
                  )}

                  {activityType === 'g6-bisector-theory' && (
                    <Grade6BisectorTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-bisector-quiz')}
                    />
                  )}

                  {activityType === 'g6-bisector-quiz' && (
                    <Grade6BisectorQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-bisector-theory')}
                    />
                  )}

                  {activityType === 'g6-constructions-theory' && (
                    <Grade6ConstructionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-constructions-quiz')}
                    />
                  )}

                  {activityType === 'g6-constructions-quiz' && (
                    <Grade6ConstructionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-constructions-theory')}
                    />
                  )}

                  {activityType === 'g6-axial-reflection-theory' && (
                    <Grade6AxialReflectionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-axial-reflection-quiz')}
                    />
                  )}

                  {activityType === 'g6-axial-reflection-quiz' && (
                    <Grade6AxialReflectionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-axial-reflection-theory')}
                    />
                  )}

                  {activityType === 'g6-reflection-properties-theory' && (
                    <Grade6ReflectionPropertiesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-reflection-properties-quiz')}
                    />
                  )}

                  {activityType === 'g6-reflection-properties-quiz' && (
                    <Grade6ReflectionPropertiesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-reflection-properties-theory')}
                    />
                  )}

                  {activityType === 'g6-axial-symmetry-theory' && (
                    <Grade6AxialSymmetryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-axial-symmetry-quiz')}
                    />
                  )}

                  {activityType === 'g6-axial-symmetry-quiz' && (
                    <Grade6AxialSymmetryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-axial-symmetry-theory')}
                    />
                  )}

                  {activityType === 'g6-symmetric-shapes-theory' && (
                    <Grade6SymmetricShapesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-symmetric-shapes-quiz')}
                    />
                  )}

                  {activityType === 'g6-symmetric-shapes-quiz' && (
                    <Grade6SymmetricShapesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-symmetric-shapes-theory')}
                    />
                  )}

                  {activityType === 'g6-construction-tasks-theory' && (
                    <Grade6ConstructionTasksTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-construction-tasks-quiz')}
                    />
                  )}

                  {activityType === 'g6-construction-tasks-quiz' && (
                    <Grade6ConstructionTasksQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-construction-tasks-theory')}
                    />
                  )}

                  {activityType === 'g6-geometry-summary-theory' && (
                    <Grade6GeometrySummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-geometry-summary-quiz')}
                    />
                  )}

                  {activityType === 'g6-geometry-summary-quiz' && (
                    <Grade6GeometrySummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-geometry-summary-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-operations-theory' && (
                    <Grade6OperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-operations-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-operations-quiz' && (
                    <Grade6OperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-operations-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-mult-theory' && (
                    <Grade6MultiplicationTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-mult-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-mult-quiz' && (
                    <Grade6MultiplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-mult-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-div-theory' && (
                    <Grade6DivisionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-div-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-div-quiz' && (
                    <Grade6DivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-div-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-cases-theory' && (
                    <Grade6CountingPossibilitiesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-cases-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-cases-quiz' && (
                    <Grade6CountingPossibilitiesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-cases-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-divisors-theory' && (
                    <Grade6DivisorsMultiplesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-divisors-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-divisors-quiz' && (
                    <Grade6DivisorsMultiplesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-divisors-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-remainders-theory' && (
                    <Grade6RemaindersTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-remainders-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-remainders-quiz' && (
                    <Grade6RemaindersQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-remainders-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-factorization-theory' && (
                    <Grade6PrimeFactorizationTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-factorization-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-factorization-quiz' && (
                    <Grade6PrimeFactorizationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-factorization-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-divisibility-2-5-10-theory' && (
                    <Grade6DivisibilityBy2510Theory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-divisibility-2-5-10-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-divisibility-2-5-10-quiz' && (
                    <Grade6DivisibilityBy2510Quiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-divisibility-2-5-10-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-divisibility-3-9-theory' && (
                    <Grade6DivisibilityBy39Theory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-divisibility-3-9-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-divisibility-3-9-quiz' && (
                    <Grade6DivisibilityBy39Quiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-divisibility-3-9-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-divisibility-4-100-theory' && (
                    <Grade6DivisibilityBy4100Theory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-divisibility-4-100-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-divisibility-4-100-quiz' && (
                    <Grade6DivisibilityBy4100Quiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-divisibility-4-100-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-composite-divisibility-theory' && (
                    <Grade6DivisibilityCompositeTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-composite-divisibility-quiz')}
                    />
                  )}

                  {(activityType === 'g6-integers-composite-divisibility-quiz' || activityType === 'divisibility-quiz') && (
                    <Grade6DivisibilityCompositeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-composite-divisibility-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-lcm-theory' && (
                    <Grade6LCMTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-lcm-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-lcm-quiz' && (
                    <Grade6LCMQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-lcm-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-gcd-theory' && (
                    <Grade6GCDTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-gcd-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-gcd-quiz' && (
                    <Grade6GCDQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-gcd-theory')}
                    />
                  )}

                  {activityType === 'g6-integers-summary-theory' && (
                    <Grade6Chapter1SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g6-integers-summary-quiz')}
                    />
                  )}

                  {activityType === 'g6-integers-summary-quiz' && (
                    <Grade6Chapter1SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g6-integers-summary-theory')}
                    />
                  )}

                  {/* 7. Osztály - I. Gondolkodjunk! */}

                  {activityType === 'g6-fractions-review-theory' && (
                    <Grade6FractionsReviewTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fractions-review-quiz', topicOf('g6-fractions'))}
                    />
                  )}

                  {(activityType === 'g6-fractions-review-quiz' || activityType === 'g6-fractions-quiz') && (
                    <Grade6FractionsReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fractions-review-theory', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-fraction-multiplication-theory' && (
                    <Grade6FractionMultiplicationTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fraction-multiplication-quiz', topicOf('g6-fractions'))}
                    />
                  )}

                  {(activityType === 'g6-fraction-multiplication-quiz' || activityType === 'g6-fraction-mult-quiz') && (
                    <Grade6FractionMultiplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fraction-multiplication-theory', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-fraction-division-theory' && (
                    <Grade6FractionDivisionTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fraction-division-quiz', topicOf('g6-fractions'))}
                    />
                  )}

                  {(activityType === 'g6-fraction-division-quiz' || activityType === 'g6-fraction-div-quiz') && (
                    <Grade6FractionDivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fraction-division-theory', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-decimal-fractions-theory' && (
                    <Grade6DecimalFractionsTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-decimal-fractions-quiz', topicOf('g6-fractions'))}
                    />
                  )}

                  {(activityType === 'g6-decimal-fractions-quiz' || activityType === 'g6-decimal-quiz') && (
                    <Grade6DecimalFractionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-decimal-fractions-theory', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-decimal-multiplication-theory' && (
                    <Grade6DecimalMultiplicationTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-decimal-multiplication-quiz', topicOf('g6-fractions'))}
                    />
                  )}

                  {(activityType === 'g6-decimal-multiplication-quiz' || activityType === 'g6-decimal-multiplier-quiz') && (
                    <Grade6DecimalMultiplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-decimal-multiplication-theory', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-decimal-division-theory' && (
                    <Grade6DecimalDivisionTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-decimal-division-quiz', topicOf('g6-fractions'))}
                    />
                  )}

                  {(activityType === 'g6-decimal-division-quiz' || activityType === 'g6-decimal-divider-quiz') && (
                    <Grade6DecimalDivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-decimal-division-theory', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-complex-operations-theory' && (
                    <Grade6ComplexOperationsTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-complex-operations-quiz', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-complex-operations-quiz' && (
                    <Grade6ComplexOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-complex-operations-theory', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-fractions-summary-theory' && (
                    <Grade6FractionsSummaryTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fractions-summary-quiz', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-fractions-summary-quiz' && (
                    <Grade6FractionsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fractions-summary-theory', topicOf('g6-fractions'))}
                    />
                  )}

                  {activityType === 'g6-ratio-intro-theory' && (
                    <RatioIntroTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-ratio-intro-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-ratio-intro-quiz' && (
                    <RatioIntroQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-intro-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-ratio-division-theory' && (
                    <ProportionalDivisionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-ratio-division-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-ratio-division-quiz' && (
                    <ProportionalDivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-division-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-direct-prop-theory' && (
                    <DirectProportionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-direct-prop-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {(activityType === 'g6-direct-prop-quiz' || activityType === 'direct-proportion-quiz') && (
                    <DirectProportionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-direct-prop-graph-theory' && (
                    <DirectProportionGraphTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-direct-prop-graph-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-direct-prop-graph-quiz' && (
                    <DirectProportionGraphQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-graph-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-rules-relations-theory' && (
                    <RulesAndRelationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-rules-relations-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-rules-relations-quiz' && (
                    <RulesAndRelationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-rules-relations-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-fraction-part-theory' && (
                    <FractionPartTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-fraction-part-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-fraction-part-quiz' && (
                    <FractionPartQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fraction-part-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-percentage-theory' && (
                    <PercentageTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-percentage-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-percentage-quiz' && (
                    <PercentageQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-percentage-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-percent-practice-theory' && (
                    <PercentPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-percent-practice-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-percent-practice-quiz' && (
                    <PercentPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-percent-practice-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-open-sentences-theory' && (
                    <OpenSentencesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-open-sentences-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-open-sentences-quiz' && (
                    <OpenSentencesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-open-sentences-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-word-problems-theory' && (
                    <Grade6WordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-word-problems-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-word-problems-quiz' && (
                    <Grade6WordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-word-problems-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-multiple-solutions-theory' && (
                    <MultipleSolutionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-multiple-solutions-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-multiple-solutions-quiz' && (
                    <MultipleSolutionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-multiple-solutions-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-ratio-summary-theory' && (
                    <RatioSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-ratio-summary-quiz', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-ratio-summary-quiz' && (
                    <RatioSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-summary-theory', topicOf('g6-ratio-percent-word'))}
                    />
                  )}

                  {activityType === 'g6-length-mass-time-theory' && (
                    <LengthMassTimeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-length-mass-time-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-length-mass-time-quiz' && (
                    <LengthMassTimeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-length-mass-time-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-polygon-perimeter-theory' && (
                    <PolygonPerimeterTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-polygon-perimeter-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-polygon-perimeter-quiz' && (
                    <PolygonPerimeterQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-polygon-perimeter-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-area-volume-measurement-theory' && (
                    <AreaVolumeMeasurementTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-area-volume-measurement-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-area-volume-measurement-quiz' && (
                    <AreaVolumeMeasurementQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-area-volume-measurement-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-polygon-area-theory' && (
                    <PolygonAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-polygon-area-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-polygon-area-quiz' && (
                    <PolygonAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-polygon-area-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-spatial-shapes-theory' && (
                    <SpatialShapesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-spatial-shapes-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-spatial-shapes-quiz' && (
                    <SpatialShapesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-spatial-shapes-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-surface-area-theory' && (
                    <SurfaceAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-surface-area-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-surface-area-quiz' && (
                    <Grade6SurfaceAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-surface-area-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-practical-surface-theory' && (
                    <PracticalSurfaceAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-practical-surface-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-practical-surface-quiz' && (
                    <PracticalSurfaceAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-practical-surface-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-volume-theory' && (
                    <VolumeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-volume-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-volume-quiz' && (
                    <Grade6VolumeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-volume-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-chapter5-summary-theory' && (
                    <Chapter5SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-chapter5-summary-quiz', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-chapter5-summary-quiz' && (
                    <Chapter5SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-chapter5-summary-theory', topicOf('g6-measurements'))}
                    />
                  )}

                  {activityType === 'g6-stat-games-theory' && (
                    <StatisticsGamesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-stat-games-quiz', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-stat-games-quiz' && (
                    <StatisticsGamesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-stat-games-theory', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-charts-diagrams-theory' && (
                    <ChartsDiagramsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-charts-diagrams-quiz', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-charts-diagrams-quiz' && (
                    <ChartsDiagramsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-charts-diagrams-theory', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-pie-chart-theory' && (
                    <PieChartTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-pie-chart-quiz', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-pie-chart-quiz' && (
                    <PieChartQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-pie-chart-theory', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-data-mean-theory' && (
                    <DataMeanTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-data-mean-quiz', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-data-mean-quiz' && (
                    <DataMeanQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-data-mean-theory', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-stat-summary-theory' && (
                    <StatisticsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-stat-summary-quiz', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType === 'g6-stat-summary-quiz' && (
                    <StatisticsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-stat-summary-theory', topicOf('g6-statistics'))}
                    />
                  )}

                  {activityType && typeof activityType === 'string' && activityType.startsWith('g6-summary-') && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 animate-slide-up">
                      <div className="inline-flex p-6 bg-emerald-50 rounded-full text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        VII. Év végi összefoglalás
                      </h3>
                      <p className="text-slate-500 max-w-md mx-auto mb-8 px-4">
                        Ez az interaktív modul kidolgozás alatt áll, és hamarosan elérhető lesz!
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
