import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

// Lazy loaded activity components
const AreaVolumeMeasurementMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementMatcher").then(m => ({ default: m.AreaVolumeMeasurementMatcher })))
const AreaVolumeMeasurementQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementQuiz").then(m => ({ default: m.AreaVolumeMeasurementQuiz })))
const AreaVolumeMeasurementSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementSorter").then(m => ({ default: m.AreaVolumeMeasurementSorter })))
const AreaVolumeMeasurementTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementTheory").then(m => ({ default: m.AreaVolumeMeasurementTheory })))
const Chapter5SummaryMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummaryMatcher").then(m => ({ default: m.Chapter5SummaryMatcher })))
const Chapter5SummaryQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummaryQuiz").then(m => ({ default: m.Chapter5SummaryQuiz })))
const Chapter5SummarySorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummarySorter").then(m => ({ default: m.Chapter5SummarySorter })))
const Chapter5SummaryTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummaryTheory").then(m => ({ default: m.Chapter5SummaryTheory })))
const ChartsDiagramsMatcher = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsMatcher").then(m => ({ default: m.ChartsDiagramsMatcher })))
const ChartsDiagramsQuiz = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsQuiz").then(m => ({ default: m.ChartsDiagramsQuiz })))
const ChartsDiagramsSorter = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsSorter").then(m => ({ default: m.ChartsDiagramsSorter })))
const ChartsDiagramsTheory = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsTheory").then(m => ({ default: m.ChartsDiagramsTheory })))
const DataMeanMatcher = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanMatcher").then(m => ({ default: m.DataMeanMatcher })))
const DataMeanQuiz = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanQuiz").then(m => ({ default: m.DataMeanQuiz })))
const DataMeanSorter = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanSorter").then(m => ({ default: m.DataMeanSorter })))
const DataMeanTheory = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanTheory").then(m => ({ default: m.DataMeanTheory })))
const DirectProportionGraphMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphMatcher").then(m => ({ default: m.DirectProportionGraphMatcher })))
const DirectProportionGraphQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphQuiz").then(m => ({ default: m.DirectProportionGraphQuiz })))
const DirectProportionGraphSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphSorter").then(m => ({ default: m.DirectProportionGraphSorter })))
const DirectProportionGraphTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphTheory").then(m => ({ default: m.DirectProportionGraphTheory })))
const DirectProportionMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionMatcher").then(m => ({ default: m.DirectProportionMatcher })))
const DirectProportionQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionQuiz").then(m => ({ default: m.DirectProportionQuiz })))
const DirectProportionSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionSorter").then(m => ({ default: m.DirectProportionSorter })))
const DirectProportionTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionTheory").then(m => ({ default: m.DirectProportionTheory })))
const FractionPartMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartMatcher").then(m => ({ default: m.FractionPartMatcher })))
const FractionPartQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartQuiz").then(m => ({ default: m.FractionPartQuiz })))
const FractionPartSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartSorter").then(m => ({ default: m.FractionPartSorter })))
const FractionPartTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartTheory").then(m => ({ default: m.FractionPartTheory })))
const Grade6AxialReflectionMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionMatcher").then(m => ({ default: m.AxialReflectionMatcher })))
const Grade6AxialReflectionQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionQuiz").then(m => ({ default: m.AxialReflectionQuiz })))
const Grade6AxialReflectionSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionSorter").then(m => ({ default: m.AxialReflectionSorter })))
const Grade6AxialReflectionTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionTheory").then(m => ({ default: m.AxialReflectionTheory })))
const Grade6AxialSymmetryMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryMatcher").then(m => ({ default: m.AxialSymmetryMatcher })))
const Grade6AxialSymmetryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryQuiz").then(m => ({ default: m.AxialSymmetryQuiz })))
const Grade6AxialSymmetrySorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetrySorter").then(m => ({ default: m.AxialSymmetrySorter })))
const Grade6AxialSymmetryTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryTheory").then(m => ({ default: m.AxialSymmetryTheory })))
const Grade6BisectorMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorMatcher").then(m => ({ default: m.BisectorMatcher })))
const Grade6BisectorQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorQuiz").then(m => ({ default: m.BisectorQuiz })))
const Grade6BisectorSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorSorter").then(m => ({ default: m.BisectorSorter })))
const Grade6BisectorTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorTheory").then(m => ({ default: m.BisectorTheory })))
const Grade6Chapter1SummaryQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszefoglalas/Chapter1SummaryQuiz").then(m => ({ default: m.Chapter1SummaryQuiz }))) as any;
const Grade6Chapter1SummaryTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszefoglalas/Chapter1SummaryTheory").then(m => ({ default: m.Chapter1SummaryTheory })))
const Grade6CircleMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleMatcher").then(m => ({ default: m.CircleMatcher })))
const Grade6CircleQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleQuiz").then(m => ({ default: m.CircleQuiz })))
const Grade6CircleSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleSorter").then(m => ({ default: m.CircleSorter })))
const Grade6CircleTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleTheory").then(m => ({ default: m.CircleTheory })))
const Grade6ComplexOperationsMatcher = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsMatcher").then(m => ({ default: m.ComplexOperationsMatcher })))
const Grade6ComplexOperationsQuiz = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsQuiz").then(m => ({ default: m.ComplexOperationsQuiz })))
const Grade6ComplexOperationsSorter = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsSorter").then(m => ({ default: m.ComplexOperationsSorter })))
const Grade6ComplexOperationsTheory = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsTheory").then(m => ({ default: m.ComplexOperationsTheory })))
const Grade6CongruenceMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceMatcher").then(m => ({ default: m.CongruenceMatcher })))
const Grade6CongruenceQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceQuiz").then(m => ({ default: m.CongruenceQuiz })))
const Grade6CongruenceSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceSorter").then(m => ({ default: m.CongruenceSorter })))
const Grade6CongruenceTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceTheory").then(m => ({ default: m.CongruenceTheory })))
const Grade6ConstructionTasksMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksMatcher").then(m => ({ default: m.ConstructionTasksMatcher })))
const Grade6ConstructionTasksQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksQuiz").then(m => ({ default: m.ConstructionTasksQuiz })))
const Grade6ConstructionTasksSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksSorter").then(m => ({ default: m.ConstructionTasksSorter })))
const Grade6ConstructionTasksTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksTheory").then(m => ({ default: m.ConstructionTasksTheory })))
const Grade6ConstructionsMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsMatcher").then(m => ({ default: m.ConstructionsMatcher })))
const Grade6ConstructionsQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsQuiz").then(m => ({ default: m.ConstructionsQuiz })))
const Grade6ConstructionsSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsSorter").then(m => ({ default: m.ConstructionsSorter })))
const Grade6ConstructionsTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsTheory").then(m => ({ default: m.ConstructionsTheory })))
const Grade6CountingPossibilitiesQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-eset-van/CountingPossibilitiesQuiz").then(m => ({ default: m.CountingPossibilitiesQuiz })))
const Grade6CountingPossibilitiesTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-eset-van/CountingPossibilitiesTheory").then(m => ({ default: m.CountingPossibilitiesTheory })))
const Grade6DecimalDivisionMatcher = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionMatcher").then(m => ({ default: m.DecimalDivisionMatcher })))
const Grade6DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionQuiz").then(m => ({ default: m.DecimalDivisionQuiz })))
const Grade6DecimalDivisionSorter = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionSorter").then(m => ({ default: m.DecimalDivisionSorter })))
const Grade6DecimalDivisionTheory = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionTheory").then(m => ({ default: m.DecimalDivisionTheory })))
const Grade6DecimalFractionsQuiz = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/DecimalFractionsQuiz").then(m => ({ default: m.DecimalFractionsQuiz })))
const Grade6DecimalFractionsSorter = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/DecimalFractionsSorter").then(m => ({ default: m.DecimalFractionsSorter }))) as any;
const Grade6DecimalFractionsTheory = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/DecimalFractionsTheory").then(m => ({ default: m.DecimalFractionsTheory })))
const Grade6DecimalMultiplicationMatcher = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationMatcher").then(m => ({ default: m.DecimalMultiplicationMatcher })))
const Grade6DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationQuiz").then(m => ({ default: m.DecimalMultiplicationQuiz })))
const Grade6DecimalMultiplicationSorter = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationSorter").then(m => ({ default: m.DecimalMultiplicationSorter })))
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
const Grade6FractionDivisionMatcher = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionMatcher").then(m => ({ default: m.FractionDivisionMatcher })))
const Grade6FractionDivisionQuiz = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionQuiz").then(m => ({ default: m.FractionDivisionQuiz })))
const Grade6FractionDivisionSorter = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionSorter").then(m => ({ default: m.FractionDivisionSorter }))) as any;
const Grade6FractionDivisionTheory = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionTheory").then(m => ({ default: m.FractionDivisionTheory })))
const Grade6FractionMultiplicationMatcher = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationMatcher").then(m => ({ default: m.FractionMultiplicationMatcher })))
const Grade6FractionMultiplicationQuiz = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationQuiz").then(m => ({ default: m.FractionMultiplicationQuiz })))
const Grade6FractionMultiplicationSorter = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationSorter").then(m => ({ default: m.FractionMultiplicationSorter })))
const Grade6FractionMultiplicationTheory = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationTheory").then(m => ({ default: m.FractionMultiplicationTheory })))
const Grade6FractionToDecimalMatcher = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/FractionToDecimalMatcher").then(m => ({ default: m.FractionToDecimalMatcher })))
const Grade6FractionsReviewMatcher = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewMatcher").then(m => ({ default: m.FractionsReviewMatcher })))
const Grade6FractionsReviewQuiz = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewQuiz").then(m => ({ default: m.FractionsReviewQuiz })))
const Grade6FractionsReviewSorter = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewSorter").then(m => ({ default: m.FractionsReviewSorter })))
const Grade6FractionsReviewTheory = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewTheory").then(m => ({ default: m.FractionsReviewTheory })))
const Grade6FractionsSummaryMatcher = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummaryMatcher").then(m => ({ default: m.FractionsSummaryMatcher })))
const Grade6FractionsSummaryQuiz = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummaryQuiz").then(m => ({ default: m.FractionsSummaryQuiz })))
const Grade6FractionsSummarySorter = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummarySorter").then(m => ({ default: m.FractionsSummarySorter })))
const Grade6FractionsSummaryTheory = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummaryTheory").then(m => ({ default: m.FractionsSummaryTheory })))
const Grade6GCDQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-kozos-oszto/GCDQuiz").then(m => ({ default: m.GCDQuiz })))
const Grade6GCDTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-kozos-oszto/GCDTheory").then(m => ({ default: m.GCDTheory })))
const Grade6GeometrySummaryMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummaryMatcher").then(m => ({ default: m.GeometrySummaryMatcher })))
const Grade6GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz })))
const Grade6GeometrySummarySorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummarySorter").then(m => ({ default: m.GeometrySummarySorter })))
const Grade6GeometrySummaryTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory })))
const Grade6LCMQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/tobbszoros-kozos-tobbszoros/LCMQuiz").then(m => ({ default: m.LCMQuiz })))
const Grade6LCMTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/tobbszoros-kozos-tobbszoros/LCMTheory").then(m => ({ default: m.LCMTheory })))
const Grade6MultiplicationQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-szorzasa/IntegerMultiplicationQuiz").then(m => ({ default: m.IntegerMultiplicationQuiz })))
const Grade6MultiplicationTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-szorzasa/IntegerMultiplicationTheory").then(m => ({ default: m.IntegerMultiplicationTheory })))
const Grade6OperationsQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/muveletek-az-egesz-szamok-koreben/OperationsWithIntegersQuiz").then(m => ({ default: m.OperationsWithIntegersQuiz })))
const Grade6OperationsTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/muveletek-az-egesz-szamok-koreben/OperationsWithIntegersTheory").then(m => ({ default: m.OperationsWithIntegersTheory })))
const Grade6PlanarShapesMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesMatcher").then(m => ({ default: m.PlanarShapesMatcher })))
const Grade6PlanarShapesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesQuiz").then(m => ({ default: m.PlanarShapesQuiz })))
const Grade6PlanarShapesSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesSorter").then(m => ({ default: m.PlanarShapesSorter })))
const Grade6PlanarShapesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesTheory").then(m => ({ default: m.PlanarShapesTheory })))
const Grade6PrimeFactorizationQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationQuiz").then(m => ({ default: m.PrimeFactorizationQuiz })))
const Grade6PrimeFactorizationTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationTheory").then(m => ({ default: m.PrimeFactorizationTheory })))
const Grade6ReflectionPropertiesMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesMatcher").then(m => ({ default: m.ReflectionPropertiesMatcher })))
const Grade6ReflectionPropertiesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesQuiz").then(m => ({ default: m.ReflectionPropertiesQuiz })))
const Grade6ReflectionPropertiesSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesSorter").then(m => ({ default: m.ReflectionPropertiesSorter })))
const Grade6ReflectionPropertiesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesTheory").then(m => ({ default: m.ReflectionPropertiesTheory })))
const Grade6RemaindersQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/szamolas-maradekokkal/RemainderCalculationQuiz").then(m => ({ default: m.RemainderCalculationQuiz })))
const Grade6RemaindersTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/szamolas-maradekokkal/RemainderCalculationTheory").then(m => ({ default: m.RemainderCalculationTheory })))
const Grade6SurfaceAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaQuiz").then(m => ({ default: m.SurfaceAreaQuiz })))
const Grade6SymmetricShapesMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesMatcher").then(m => ({ default: m.SymmetricShapesMatcher })))
const Grade6SymmetricShapesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesQuiz").then(m => ({ default: m.SymmetricShapesQuiz })))
const Grade6SymmetricShapesSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesSorter").then(m => ({ default: m.SymmetricShapesSorter })))
const Grade6SymmetricShapesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesTheory").then(m => ({ default: m.SymmetricShapesTheory })))
const Grade6VolumeQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeQuiz").then(m => ({ default: m.VolumeQuiz })))
const Grade6WordProblemsMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsMatcher").then(m => ({ default: m.WordProblemsMatcher })))
const Grade6WordProblemsModule = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsModule").then(m => ({ default: m.WordProblemsModule })))
const Grade6WordProblemsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz })))
const Grade6WordProblemsSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsSorter").then(m => ({ default: m.WordProblemsSorter })))
const Grade6WordProblemsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory })))
const LengthMassTimeMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeMatcher").then(m => ({ default: m.LengthMassTimeMatcher })))
const LengthMassTimeQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeQuiz").then(m => ({ default: m.LengthMassTimeQuiz })))
const LengthMassTimeSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeSorter").then(m => ({ default: m.LengthMassTimeSorter })))
const LengthMassTimeTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeTheory").then(m => ({ default: m.LengthMassTimeTheory })))
const MultipleSolutionsMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsMatcher").then(m => ({ default: m.MultipleSolutionsMatcher })))
const MultipleSolutionsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsQuiz").then(m => ({ default: m.MultipleSolutionsQuiz })))
const MultipleSolutionsSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsSorter").then(m => ({ default: m.MultipleSolutionsSorter })))
const MultipleSolutionsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsTheory").then(m => ({ default: m.MultipleSolutionsTheory })))
const OpenSentencesMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesMatcher").then(m => ({ default: m.OpenSentencesMatcher })))
const OpenSentencesQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesQuiz").then(m => ({ default: m.OpenSentencesQuiz })))
const OpenSentencesSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesSorter").then(m => ({ default: m.OpenSentencesSorter })))
const OpenSentencesTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesTheory").then(m => ({ default: m.OpenSentencesTheory })))
const PercentPracticeMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeMatcher").then(m => ({ default: m.PercentPracticeMatcher })))
const PercentPracticeQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeQuiz").then(m => ({ default: m.PercentPracticeQuiz })))
const PercentPracticeSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeSorter").then(m => ({ default: m.PercentPracticeSorter })))
const PercentPracticeTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeTheory").then(m => ({ default: m.PercentPracticeTheory })))
const PercentageMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageMatcher").then(m => ({ default: m.PercentageMatcher })))
const PercentageQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageQuiz").then(m => ({ default: m.PercentageQuiz })))
const PercentageSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageSorter").then(m => ({ default: m.PercentageSorter })))
const PercentageTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageTheory").then(m => ({ default: m.PercentageTheory })))
const PieChartMatcher = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartMatcher").then(m => ({ default: m.PieChartMatcher })))
const PieChartQuiz = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartQuiz").then(m => ({ default: m.PieChartQuiz })))
const PieChartSorter = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartSorter").then(m => ({ default: m.PieChartSorter })))
const PieChartTheory = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartTheory").then(m => ({ default: m.PieChartTheory })))
const PolygonAreaMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaMatcher").then(m => ({ default: m.PolygonAreaMatcher })))
const PolygonAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaQuiz").then(m => ({ default: m.PolygonAreaQuiz })))
const PolygonAreaSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaSorter").then(m => ({ default: m.PolygonAreaSorter })))
const PolygonAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaTheory").then(m => ({ default: m.PolygonAreaTheory })))
const PolygonPerimeterMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterMatcher").then(m => ({ default: m.PolygonPerimeterMatcher })))
const PolygonPerimeterQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterQuiz").then(m => ({ default: m.PolygonPerimeterQuiz })))
const PolygonPerimeterSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterSorter").then(m => ({ default: m.PolygonPerimeterSorter })))
const PolygonPerimeterTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterTheory").then(m => ({ default: m.PolygonPerimeterTheory })))
const PracticalSurfaceAreaMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaMatcher").then(m => ({ default: m.PracticalSurfaceAreaMatcher })))
const PracticalSurfaceAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaQuiz").then(m => ({ default: m.PracticalSurfaceAreaQuiz })))
const PracticalSurfaceAreaSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaSorter").then(m => ({ default: m.PracticalSurfaceAreaSorter })))
const PracticalSurfaceAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaTheory").then(m => ({ default: m.PracticalSurfaceAreaTheory })))
const ProportionalDivisionMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionMatcher").then(m => ({ default: m.ProportionalDivisionMatcher })))
const ProportionalDivisionQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionQuiz").then(m => ({ default: m.ProportionalDivisionQuiz })))
const ProportionalDivisionSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionSorter").then(m => ({ default: m.ProportionalDivisionSorter })))
const ProportionalDivisionTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionTheory").then(m => ({ default: m.ProportionalDivisionTheory })))
const RatioIntroMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroMatcher").then(m => ({ default: m.RatioIntroMatcher })))
const RatioIntroQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroQuiz").then(m => ({ default: m.RatioIntroQuiz })))
const RatioIntroSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroSorter").then(m => ({ default: m.RatioIntroSorter })))
const RatioIntroTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroTheory").then(m => ({ default: m.RatioIntroTheory })))
const RatioSummaryMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummaryMatcher").then(m => ({ default: m.RatioSummaryMatcher })))
const RatioSummaryQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummaryQuiz").then(m => ({ default: m.RatioSummaryQuiz })))
const RatioSummarySorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummarySorter").then(m => ({ default: m.RatioSummarySorter })))
const RatioSummaryTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummaryTheory").then(m => ({ default: m.RatioSummaryTheory })))
const RulesAndRelationsMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsMatcher").then(m => ({ default: m.RulesAndRelationsMatcher })))
const RulesAndRelationsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsQuiz").then(m => ({ default: m.RulesAndRelationsQuiz })))
const RulesAndRelationsSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsSorter").then(m => ({ default: m.RulesAndRelationsSorter })))
const RulesAndRelationsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsTheory").then(m => ({ default: m.RulesAndRelationsTheory })))
const SpatialShapesMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesMatcher").then(m => ({ default: m.SpatialShapesMatcher })))
const SpatialShapesQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesQuiz").then(m => ({ default: m.SpatialShapesQuiz })))
const SpatialShapesSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesSorter").then(m => ({ default: m.SpatialShapesSorter })))
const SpatialShapesTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesTheory").then(m => ({ default: m.SpatialShapesTheory })))
const StatisticsGamesMatcher = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesMatcher").then(m => ({ default: m.StatisticsGamesMatcher })))
const StatisticsGamesQuiz = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesQuiz").then(m => ({ default: m.StatisticsGamesQuiz })))
const StatisticsGamesSorter = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesSorter").then(m => ({ default: m.StatisticsGamesSorter })))
const StatisticsGamesTheory = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesTheory").then(m => ({ default: m.StatisticsGamesTheory })))
const StatisticsSummaryMatcher = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummaryMatcher").then(m => ({ default: m.StatisticsSummaryMatcher })))
const StatisticsSummaryQuiz = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummaryQuiz").then(m => ({ default: m.StatisticsSummaryQuiz })))
const StatisticsSummarySorter = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummarySorter").then(m => ({ default: m.StatisticsSummarySorter })))
const StatisticsSummaryTheory = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummaryTheory").then(m => ({ default: m.StatisticsSummaryTheory })))
const SurfaceAreaMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaMatcher").then(m => ({ default: m.SurfaceAreaMatcher })))
const SurfaceAreaSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaSorter").then(m => ({ default: m.SurfaceAreaSorter })))
const SurfaceAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaTheory").then(m => ({ default: m.SurfaceAreaTheory })))
const VolumeMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeMatcher").then(m => ({ default: m.VolumeMatcher })))
const VolumeSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeSorter").then(m => ({ default: m.VolumeSorter })))
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

                  {activityType === 'g6-planar-shapes-matcher' && (
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
                      <Grade6PlanarShapesMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-planar-shapes-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-planar-shapes-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-planar-shapes-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-planar-shapes-sorter' && (
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
                      <Grade6PlanarShapesSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-planar-shapes-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-planar-shapes-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-planar-shapes-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-congruence-matcher' && (
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
                      <Grade6CongruenceMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-congruence-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-congruence-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-congruence-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-congruence-sorter' && (
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
                      <Grade6CongruenceSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-congruence-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-congruence-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-congruence-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-circle-matcher' && (
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
                      <Grade6CircleMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-circle-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-circle-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-circle-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-circle-sorter' && (
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
                      <Grade6CircleSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-circle-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-circle-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-circle-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-bisector-matcher' && (
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
                      <Grade6BisectorMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-bisector-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-bisector-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-bisector-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-bisector-sorter' && (
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
                      <Grade6BisectorSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-bisector-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-bisector-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-bisector-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-constructions-matcher' && (
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
                      <Grade6ConstructionsMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-constructions-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-constructions-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-constructions-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-constructions-sorter' && (
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
                      <Grade6ConstructionsSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-constructions-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-constructions-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-constructions-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-axial-reflection-matcher' && (
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
                      <Grade6AxialReflectionMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-axial-reflection-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-axial-reflection-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-axial-reflection-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-axial-reflection-sorter' && (
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
                      <Grade6AxialReflectionSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-axial-reflection-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-axial-reflection-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-axial-reflection-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-reflection-properties-matcher' && (
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
                      <Grade6ReflectionPropertiesMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-reflection-properties-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-reflection-properties-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-reflection-properties-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-reflection-properties-sorter' && (
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
                      <Grade6ReflectionPropertiesSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-reflection-properties-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-reflection-properties-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-reflection-properties-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-axial-symmetry-matcher' && (
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
                      <Grade6AxialSymmetryMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-axial-symmetry-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-axial-symmetry-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-axial-symmetry-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-axial-symmetry-sorter' && (
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
                      <Grade6AxialSymmetrySorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-axial-symmetry-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-axial-symmetry-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-axial-symmetry-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-symmetric-shapes-matcher' && (
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
                      <Grade6SymmetricShapesMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-symmetric-shapes-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-symmetric-shapes-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-symmetric-shapes-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-symmetric-shapes-sorter' && (
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
                      <Grade6SymmetricShapesSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-symmetric-shapes-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-symmetric-shapes-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-symmetric-shapes-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-construction-tasks-matcher' && (
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
                      <Grade6ConstructionTasksMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-construction-tasks-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-construction-tasks-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-construction-tasks-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-construction-tasks-sorter' && (
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
                      <Grade6ConstructionTasksSorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-construction-tasks-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-construction-tasks-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-construction-tasks-theory')}
                      />
                    </div>
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

                  {activityType === 'g6-geometry-summary-matcher' && (
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
                      <Grade6GeometrySummaryMatcher
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-geometry-summary-quiz')}
                        onSwitchToSorter={() => setActivityType('g6-geometry-summary-sorter')}
                        onSwitchToTheory={() => setActivityType('g6-geometry-summary-theory')}
                      />
                    </div>
                  )}

                  {activityType === 'g6-geometry-summary-sorter' && (
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
                      <Grade6GeometrySummarySorter
                        onBack={handleBack}
                        onSwitchToQuiz={() => setActivityType('g6-geometry-summary-quiz')}
                        onSwitchToMatcher={() => setActivityType('g6-geometry-summary-matcher')}
                        onSwitchToTheory={() => setActivityType('g6-geometry-summary-theory')}
                      />
                    </div>
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

                  {(activityType === 'g6-integers-lcm-quiz' || activityType === 'divisibility-lkktquiz') && (
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

                  {(activityType === 'g6-integers-gcd-quiz' || activityType === 'divisibility-gcdquiz') && (
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
                      onSwitchToQuiz={() => handleActivitySelect('g6-fractions-review-quiz', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-fractions-review-quiz' || activityType === 'g6-fractions-review' || activityType === 'g6-fractions-quiz') && (
                    <Grade6FractionsReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fractions-review-theory', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-fractions-review-matcher' || activityType === 'g6-fraction-visual-matcher') && (
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
                      <Grade6FractionsReviewMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-fractions-review-sorter' && (
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
                      <Grade6FractionsReviewSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-fraction-multiplication-theory' && (
                    <Grade6FractionMultiplicationTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fraction-multiplication-quiz', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-fraction-multiplication-quiz' || activityType === 'g6-fraction-mult-quiz') && (
                    <Grade6FractionMultiplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fraction-multiplication-theory', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-fraction-multiplication-matcher' || activityType === 'g6-fraction-multiplier') && (
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
                      <Grade6FractionMultiplicationMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-fraction-multiplication-sorter' && (
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
                      <Grade6FractionMultiplicationSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-fraction-division-theory' && (
                    <Grade6FractionDivisionTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fraction-division-quiz', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-fraction-division-quiz' || activityType === 'g6-fraction-div-quiz') && (
                    <Grade6FractionDivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fraction-division-theory', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-fraction-division-matcher' || activityType === 'g6-fraction-divider') && (
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
                      <Grade6FractionDivisionMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-fraction-division-sorter' && (
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
                      <Grade6FractionDivisionSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-decimal-fractions-theory' && (
                    <Grade6DecimalFractionsTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-decimal-fractions-quiz', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-decimal-fractions-quiz' || activityType === 'g6-decimal-quiz') && (
                    <Grade6DecimalFractionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-decimal-fractions-theory', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-decimal-fractions-matcher' || activityType === 'g6-to-decimal-matcher') && (
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
                      <Grade6FractionToDecimalMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-decimal-fractions-sorter' && (
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
                      <Grade6DecimalFractionsSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-decimal-multiplication-theory' && (
                    <Grade6DecimalMultiplicationTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-decimal-multiplication-quiz', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-decimal-multiplication-quiz' || activityType === 'g6-decimal-multiplier-quiz') && (
                    <Grade6DecimalMultiplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-decimal-multiplication-theory', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-decimal-multiplication-matcher' || activityType === 'g6-decimal-multiplier') && (
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
                      <Grade6DecimalMultiplicationMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-decimal-multiplication-sorter' && (
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
                      <Grade6DecimalMultiplicationSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-decimal-division-theory' && (
                    <Grade6DecimalDivisionTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-decimal-division-quiz', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-decimal-division-quiz' || activityType === 'g6-decimal-divider-quiz') && (
                    <Grade6DecimalDivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-decimal-division-theory', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-decimal-division-matcher' || activityType === 'g6-decimal-divider') && (
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
                      <Grade6DecimalDivisionMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-decimal-division-sorter' && (
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
                      <Grade6DecimalDivisionSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-complex-operations-theory' && (
                    <Grade6ComplexOperationsTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-complex-operations-quiz', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {activityType === 'g6-complex-operations-quiz' && (
                    <Grade6ComplexOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-complex-operations-theory', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {activityType === 'g6-complex-operations-matcher' && (
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
                      <Grade6ComplexOperationsMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-complex-operations-sorter' && (
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
                      <Grade6ComplexOperationsSorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-fractions-summary-theory' && (
                    <Grade6FractionsSummaryTheory
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fractions-summary-quiz', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {(activityType === 'g6-fractions-summary-quiz' || activityType === 'g6-fractions-closing-test') && (
                    <Grade6FractionsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fractions-summary-theory', selectedTopic?.id || 'g6-fractions')}
                    />
                  )}

                  {activityType === 'g6-fractions-summary-matcher' && (
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
                      <Grade6FractionsSummaryMatcher onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-fractions-summary-sorter' && (
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
                      <Grade6FractionsSummarySorter onNextLevel={handleBack} />
                    </div>
                  )}

                  {activityType === 'g6-word-problems-quiz' && (
                    <Grade6WordProblemsQuiz onBack={handleBack} />
                  )}

                  {activityType === 'g6-word-problems-module' && (
                    <Grade6WordProblemsModule onBack={handleBack} />
                  )}

                  {activityType === 'g6-ratio-intro-theory' && (
                    <RatioIntroTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {(activityType === 'g6-ratio-intro-quiz' || activityType === 'ratio-intro') && (
                    <RatioIntroQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-intro-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-ratio-intro-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-ratio-intro-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-intro-matcher' && (
                    <RatioIntroMatcher
                      onBack={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-intro-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-intro-sorter' && (
                    <RatioIntroSorter
                      onBack={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-intro-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-division-theory' && (
                    <ProportionalDivisionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-division-quiz' && (
                    <ProportionalDivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-division-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-ratio-division-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-ratio-division-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-division-matcher' && (
                    <ProportionalDivisionMatcher
                      onBack={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-division-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-division-sorter' && (
                    <ProportionalDivisionSorter
                      onBack={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-division-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-direct-prop-theory' && (
                    <DirectProportionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {(activityType === 'g6-direct-prop-quiz' || activityType === 'direct-proportion-quiz') && (
                    <DirectProportionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-direct-prop-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-direct-prop-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-direct-prop-matcher' && (
                    <DirectProportionMatcher
                      onBack={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToSorter={() => handleActivitySelect('g6-direct-prop-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-direct-prop-sorter' && (
                    <DirectProportionSorter
                      onBack={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-direct-prop-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-direct-prop-graph-theory' && (
                    <DirectProportionGraphTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-direct-prop-graph-quiz' && (
                    <DirectProportionGraphQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-graph-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-direct-prop-graph-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-direct-prop-graph-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-direct-prop-graph-matcher' && (
                    <DirectProportionGraphMatcher
                      onBack={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-graph-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToSorter={() => handleActivitySelect('g6-direct-prop-graph-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-direct-prop-graph-sorter' && (
                    <DirectProportionGraphSorter
                      onBack={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-graph-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-direct-prop-graph-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-rules-relations-theory' && (
                    <RulesAndRelationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-rules-relations-quiz' && (
                    <RulesAndRelationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-rules-relations-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-rules-relations-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-rules-relations-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-rules-relations-matcher' && (
                    <RulesAndRelationsMatcher
                      onBack={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-rules-relations-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-rules-relations-sorter' && (
                    <RulesAndRelationsSorter
                      onBack={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-rules-relations-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-fraction-part-theory' && (
                    <FractionPartTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-fraction-part-quiz' && (
                    <FractionPartQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-fraction-part-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-fraction-part-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-fraction-part-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-fraction-part-matcher' && (
                    <FractionPartMatcher
                      onBack={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-fraction-part-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-fraction-part-sorter' && (
                    <FractionPartSorter
                      onBack={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-fraction-part-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-percentage-theory' && (
                    <PercentageTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-percentage-quiz' && (
                    <PercentageQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-percentage-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-percentage-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-percentage-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-percentage-matcher' && (
                    <PercentageMatcher
                      onBack={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-percentage-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-percentage-sorter' && (
                    <PercentageSorter
                      onBack={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-percentage-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-percent-practice-theory' && (
                    <PercentPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-percent-practice-quiz' && (
                    <PercentPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-percent-practice-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-percent-practice-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-percent-practice-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-percent-practice-matcher' && (
                    <PercentPracticeMatcher
                      onBack={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-percent-practice-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-percent-practice-sorter' && (
                    <PercentPracticeSorter
                      onBack={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-percent-practice-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-open-sentences-theory' && (
                    <OpenSentencesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-open-sentences-quiz' && (
                    <OpenSentencesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-open-sentences-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-open-sentences-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-open-sentences-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-open-sentences-matcher' && (
                    <OpenSentencesMatcher
                      onBack={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-open-sentences-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-open-sentences-sorter' && (
                    <OpenSentencesSorter
                      onBack={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-open-sentences-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-word-problems-theory' && (
                    <Grade6WordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-word-problems-quiz' && (
                    <Grade6WordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-word-problems-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-word-problems-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-word-problems-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-word-problems-matcher' && (
                    <Grade6WordProblemsMatcher
                      onBack={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-word-problems-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-word-problems-sorter' && (
                    <Grade6WordProblemsSorter
                      onBack={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-word-problems-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-word-problems-module' && (
                    <Grade6WordProblemsModule onBack={handleBack} />
                  )}

                  {activityType === 'g6-multiple-solutions-theory' && (
                    <MultipleSolutionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-multiple-solutions-quiz' && (
                    <MultipleSolutionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-multiple-solutions-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-multiple-solutions-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-multiple-solutions-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-multiple-solutions-matcher' && (
                    <MultipleSolutionsMatcher
                      onBack={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-multiple-solutions-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-multiple-solutions-sorter' && (
                    <MultipleSolutionsSorter
                      onBack={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-multiple-solutions-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-summary-theory' && (
                    <RatioSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-summary-quiz' && (
                    <RatioSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-summary-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenMatcher={() => handleActivitySelect('g6-ratio-summary-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onOpenSorter={() => handleActivitySelect('g6-ratio-summary-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-summary-matcher' && (
                    <RatioSummaryMatcher
                      onBack={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-summary-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-ratio-summary-sorter' && (
                    <RatioSummarySorter
                      onBack={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                      onSwitchToTheory={() => handleActivitySelect('g6-ratio-summary-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                    />
                  )}

                  {activityType === 'g6-length-mass-time-theory' && (
                    <LengthMassTimeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                    />
                  )}

                  {activityType === 'g6-length-mass-time-quiz' && (
                    <LengthMassTimeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-length-mass-time-theory', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                      onOpenMatcher={() => handleActivitySelect('g6-length-mass-time-matcher', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                      onOpenSorter={() => handleActivitySelect('g6-length-mass-time-sorter', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                    />
                  )}

                  {activityType === 'g6-length-mass-time-matcher' && (
                    <LengthMassTimeMatcher
                      onBack={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                      onSwitchToTheory={() => handleActivitySelect('g6-length-mass-time-theory', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                    />
                  )}

                  {activityType === 'g6-length-mass-time-sorter' && (
                    <LengthMassTimeSorter
                      onBack={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-length-mass-time-theory', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-polygon-perimeter-theory' && (
                    <PolygonPerimeterTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-polygon-perimeter-quiz' && (
                    <PolygonPerimeterQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-polygon-perimeter-theory', selectedTopic?.id || 'g6-measurements')}
                      onOpenMatcher={() => handleActivitySelect('g6-polygon-perimeter-matcher', selectedTopic?.id || 'g6-measurements')}
                      onOpenSorter={() => handleActivitySelect('g6-polygon-perimeter-sorter', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-polygon-perimeter-matcher' && (
                    <PolygonPerimeterMatcher
                      onBack={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-polygon-perimeter-theory', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-polygon-perimeter-sorter' && (
                    <PolygonPerimeterSorter
                      onBack={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-polygon-perimeter-theory', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-area-volume-measurement-theory' && (
                    <AreaVolumeMeasurementTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-area-volume-measurement-quiz' && (
                    <AreaVolumeMeasurementQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-area-volume-measurement-theory', selectedTopic?.id || 'g6-measurements')}
                      onOpenMatcher={() => handleActivitySelect('g6-area-volume-measurement-matcher', selectedTopic?.id || 'g6-measurements')}
                      onOpenSorter={() => handleActivitySelect('g6-area-volume-measurement-sorter', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-area-volume-measurement-matcher' && (
                    <AreaVolumeMeasurementMatcher
                      onBack={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-area-volume-measurement-theory', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToSorter={() => handleActivitySelect('g6-area-volume-measurement-sorter', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-area-volume-measurement-sorter' && (
                    <AreaVolumeMeasurementSorter
                      onBack={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-area-volume-measurement-theory', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-area-volume-measurement-matcher', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-polygon-area-theory' && (
                    <PolygonAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-polygon-area-quiz' && (
                    <PolygonAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-polygon-area-theory', selectedTopic?.id || 'g6-measurements')}
                      onOpenMatcher={() => handleActivitySelect('g6-polygon-area-matcher', selectedTopic?.id || 'g6-measurements')}
                      onOpenSorter={() => handleActivitySelect('g6-polygon-area-sorter', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-polygon-area-matcher' && (
                    <PolygonAreaMatcher
                      onBack={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-polygon-area-theory', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToSorter={() => handleActivitySelect('g6-polygon-area-sorter', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-polygon-area-sorter' && (
                    <PolygonAreaSorter
                      onBack={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-polygon-area-theory', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-polygon-area-matcher', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-spatial-shapes-theory' && (
                    <SpatialShapesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-spatial-shapes-quiz' && (
                    <SpatialShapesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-spatial-shapes-theory', selectedTopic?.id || 'g6-measurements')}
                      onOpenMatcher={() => handleActivitySelect('g6-spatial-shapes-matcher', selectedTopic?.id || 'g6-measurements')}
                      onOpenSorter={() => handleActivitySelect('g6-spatial-shapes-sorter', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-spatial-shapes-matcher' && (
                    <SpatialShapesMatcher
                      onBack={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-spatial-shapes-theory', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToSorter={() => handleActivitySelect('g6-spatial-shapes-sorter', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-spatial-shapes-sorter' && (
                    <SpatialShapesSorter
                      onBack={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-spatial-shapes-theory', selectedTopic?.id || 'g6-measurements')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-spatial-shapes-matcher', selectedTopic?.id || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-surface-area-theory' && (
                    <SurfaceAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-surface-area-quiz' && (
                    <Grade6SurfaceAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-surface-area-theory', selectedTopic || 'g6-measurements')}
                      onOpenMatcher={() => handleActivitySelect('g6-surface-area-matcher', selectedTopic || 'g6-measurements')}
                      onOpenSorter={() => handleActivitySelect('g6-surface-area-sorter', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-surface-area-matcher' && (
                    <SurfaceAreaMatcher
                      onBack={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-surface-area-theory', selectedTopic || 'g6-measurements')}
                      onSwitchToSorter={() => handleActivitySelect('g6-surface-area-sorter', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-surface-area-sorter' && (
                    <SurfaceAreaSorter
                      onBack={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-surface-area-theory', selectedTopic || 'g6-measurements')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-surface-area-matcher', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-practical-surface-theory' && (
                    <PracticalSurfaceAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-practical-surface-quiz' && (
                    <PracticalSurfaceAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-practical-surface-theory', selectedTopic || 'g6-measurements')}
                      onOpenMatcher={() => handleActivitySelect('g6-practical-surface-matcher', selectedTopic || 'g6-measurements')}
                      onOpenSorter={() => handleActivitySelect('g6-practical-surface-sorter', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-practical-surface-matcher' && (
                    <PracticalSurfaceAreaMatcher
                      onBack={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-practical-surface-theory', selectedTopic || 'g6-measurements')}
                      onSwitchToSorter={() => handleActivitySelect('g6-practical-surface-sorter', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-practical-surface-sorter' && (
                    <PracticalSurfaceAreaSorter
                      onBack={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-practical-surface-theory', selectedTopic || 'g6-measurements')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-practical-surface-matcher', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-volume-theory' && (
                    <VolumeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-volume-quiz' && (
                    <Grade6VolumeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-volume-theory', selectedTopic || 'g6-measurements')}
                      onOpenMatcher={() => handleActivitySelect('g6-volume-matcher', selectedTopic || 'g6-measurements')}
                      onOpenSorter={() => handleActivitySelect('g6-volume-sorter', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-volume-matcher' && (
                    <VolumeMatcher
                      onBack={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-volume-theory', selectedTopic || 'g6-measurements')}
                      onSwitchToSorter={() => handleActivitySelect('g6-volume-sorter', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-volume-sorter' && (
                    <VolumeSorter
                      onBack={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-volume-theory', selectedTopic || 'g6-measurements')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-volume-matcher', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-chapter5-summary-theory' && (
                    <Chapter5SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-chapter5-summary-quiz' && (
                    <Chapter5SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-chapter5-summary-theory', selectedTopic || 'g6-measurements')}
                      onOpenMatcher={() => handleActivitySelect('g6-chapter5-summary-matcher', selectedTopic || 'g6-measurements')}
                      onOpenSorter={() => handleActivitySelect('g6-chapter5-summary-sorter', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-chapter5-summary-matcher' && (
                    <Chapter5SummaryMatcher
                      onBack={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-chapter5-summary-theory', selectedTopic || 'g6-measurements')}
                      onSwitchToSorter={() => handleActivitySelect('g6-chapter5-summary-sorter', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-chapter5-summary-sorter' && (
                    <Chapter5SummarySorter
                      onBack={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                      onSwitchToTheory={() => handleActivitySelect('g6-chapter5-summary-theory', selectedTopic || 'g6-measurements')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-chapter5-summary-matcher', selectedTopic || 'g6-measurements')}
                    />
                  )}

                  {activityType === 'g6-stat-games-theory' && (
                    <StatisticsGamesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-stat-games-quiz' && (
                    <StatisticsGamesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-stat-games-theory', selectedTopic || 'g6-statistics')}
                      onOpenMatcher={() => handleActivitySelect('g6-stat-games-matcher', selectedTopic || 'g6-statistics')}
                      onOpenSorter={() => handleActivitySelect('g6-stat-games-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-stat-games-matcher' && (
                    <StatisticsGamesMatcher
                      onBack={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-stat-games-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToSorter={() => handleActivitySelect('g6-stat-games-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-stat-games-sorter' && (
                    <StatisticsGamesSorter
                      onBack={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-stat-games-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-stat-games-matcher', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-charts-diagrams-theory' && (
                    <ChartsDiagramsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-charts-diagrams-quiz' && (
                    <ChartsDiagramsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-charts-diagrams-theory', selectedTopic || 'g6-statistics')}
                      onOpenMatcher={() => handleActivitySelect('g6-charts-diagrams-matcher', selectedTopic || 'g6-statistics')}
                      onOpenSorter={() => handleActivitySelect('g6-charts-diagrams-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-charts-diagrams-matcher' && (
                    <ChartsDiagramsMatcher
                      onBack={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-charts-diagrams-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToSorter={() => handleActivitySelect('g6-charts-diagrams-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-charts-diagrams-sorter' && (
                    <ChartsDiagramsSorter
                      onBack={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-charts-diagrams-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-charts-diagrams-matcher', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-pie-chart-theory' && (
                    <PieChartTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-pie-chart-quiz' && (
                    <PieChartQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-pie-chart-theory', selectedTopic || 'g6-statistics')}
                      onOpenMatcher={() => handleActivitySelect('g6-pie-chart-matcher', selectedTopic || 'g6-statistics')}
                      onOpenSorter={() => handleActivitySelect('g6-pie-chart-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-pie-chart-matcher' && (
                    <PieChartMatcher
                      onBack={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-pie-chart-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToSorter={() => handleActivitySelect('g6-pie-chart-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-pie-chart-sorter' && (
                    <PieChartSorter
                      onBack={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-pie-chart-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-pie-chart-matcher', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-data-mean-theory' && (
                    <DataMeanTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-data-mean-quiz' && (
                    <DataMeanQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-data-mean-theory', selectedTopic || 'g6-statistics')}
                      onOpenMatcher={() => handleActivitySelect('g6-data-mean-matcher', selectedTopic || 'g6-statistics')}
                      onOpenSorter={() => handleActivitySelect('g6-data-mean-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-data-mean-matcher' && (
                    <DataMeanMatcher
                      onBack={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-data-mean-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToSorter={() => handleActivitySelect('g6-data-mean-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-data-mean-sorter' && (
                    <DataMeanSorter
                      onBack={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-data-mean-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-data-mean-matcher', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-stat-summary-theory' && (
                    <StatisticsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-stat-summary-quiz' && (
                    <StatisticsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g6-stat-summary-theory', selectedTopic || 'g6-statistics')}
                      onOpenMatcher={() => handleActivitySelect('g6-stat-summary-matcher', selectedTopic || 'g6-statistics')}
                      onOpenSorter={() => handleActivitySelect('g6-stat-summary-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-stat-summary-matcher' && (
                    <StatisticsSummaryMatcher
                      onBack={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-stat-summary-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToSorter={() => handleActivitySelect('g6-stat-summary-sorter', selectedTopic || 'g6-statistics')}
                    />
                  )}

                  {activityType === 'g6-stat-summary-sorter' && (
                    <StatisticsSummarySorter
                      onBack={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToQuiz={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                      onSwitchToTheory={() => handleActivitySelect('g6-stat-summary-theory', selectedTopic || 'g6-statistics')}
                      onSwitchToMatcher={() => handleActivitySelect('g6-stat-summary-matcher', selectedTopic || 'g6-statistics')}
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
