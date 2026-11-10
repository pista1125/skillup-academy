import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const Grade5AdditionQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/osszeadas-irasbeli-osszeadas/AdditionQuiz").then(m => ({ default: m.AdditionQuiz })))
const Grade5AdditionTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/osszeadas-irasbeli-osszeadas/AdditionTheory").then(m => ({ default: m.AdditionTheory })))
const Grade5AnglesQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/a-szog/AnglesQuiz").then(m => ({ default: m.AnglesQuiz })))
const Grade5AnglesTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/a-szog/AnglesTheory").then(m => ({ default: m.AnglesTheory })))
const Grade5AreaMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terulet-merese/AreaMatcher").then(m => ({ default: m.AreaMatcher })))
const Grade5AreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terulet-merese/AreaQuiz").then(m => ({ default: m.AreaQuiz })))
const Grade5AreaSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terulet-merese/AreaSorter").then(m => ({ default: m.AreaSorter })))
const Grade5AreaTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terulet-merese/AreaTheory").then(m => ({ default: m.AreaTheory })))
const Grade5AverageMatcher = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/atlag-es-tulajdonsagai/AverageMatcher").then(m => ({ default: m.AverageMatcher })))
const Grade5AverageQuiz = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/atlag-es-tulajdonsagai/AverageQuiz").then(m => ({ default: m.AverageQuiz })))
const Grade5AverageSorter = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/atlag-es-tulajdonsagai/AverageSorter").then(m => ({ default: m.AverageSorter })))
const Grade5AverageTheory = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/atlag-es-tulajdonsagai/AverageTheory").then(m => ({ default: m.AverageTheory })))
const Grade5BodiesQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/test-felulet-vonal-pont/BodiesQuiz").then(m => ({ default: m.BodiesQuiz })))
const Grade5BodiesTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/test-felulet-vonal-pont/BodiesTheory").then(m => ({ default: m.BodiesTheory })))
const Grade5BuildingQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/testek-epitese-szemleltetese/BuildingQuiz").then(m => ({ default: m.BuildingQuiz })))
const Grade5BuildingTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/testek-epitese-szemleltetese/BuildingTheory").then(m => ({ default: m.BuildingTheory })))
const Grade5CapacityMeasurementMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/az-urtartalom-merese-mertekegysegei/CapacityMeasurementMatcher").then(m => ({ default: m.CapacityMeasurementMatcher })))
const Grade5CapacityMeasurementQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/az-urtartalom-merese-mertekegysegei/CapacityMeasurementQuiz").then(m => ({ default: m.CapacityMeasurementQuiz })))
const Grade5CapacityMeasurementSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/az-urtartalom-merese-mertekegysegei/CapacityMeasurementSorter").then(m => ({ default: m.CapacityMeasurementSorter })))
const Grade5CapacityMeasurementTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/az-urtartalom-merese-mertekegysegei/CapacityMeasurementTheory").then(m => ({ default: m.CapacityMeasurementTheory })))
const Grade5Chapter1SummaryQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/osszefoglalas/Chapter1SummaryQuiz").then(m => ({ default: m.Chapter1SummaryQuiz })))
const Grade5Chapter1SummaryTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/osszefoglalas/Chapter1SummaryTheory").then(m => ({ default: m.Chapter1SummaryTheory })))
const Grade5Chapter2SummaryQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/osszefoglalas/Chapter2SummaryQuiz").then(m => ({ default: m.Chapter2SummaryQuiz })))
const Grade5Chapter2SummaryTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/osszefoglalas/Chapter2SummaryTheory").then(m => ({ default: m.Chapter2SummaryTheory })))
const Grade5CoordinateSystemMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-derekszogu-koordinata-rendszer/CoordinateSystemMatcher").then(m => ({ default: m.CoordinateSystemMatcher })))
const Grade5CoordinateSystemQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-derekszogu-koordinata-rendszer/CoordinateSystemQuiz").then(m => ({ default: m.CoordinateSystemQuiz })))
const Grade5CoordinateSystemSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-derekszogu-koordinata-rendszer/CoordinateSystemSorter").then(m => ({ default: m.CoordinateSystemSorter })))
const Grade5CoordinateSystemTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-derekszogu-koordinata-rendszer/CoordinateSystemTheory").then(m => ({ default: m.CoordinateSystemTheory })))
const Grade5CuboidCubeMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka/CuboidCubeMatcher").then(m => ({ default: m.CuboidCubeMatcher })))
const Grade5CuboidCubeQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka/CuboidCubeQuiz").then(m => ({ default: m.CuboidCubeQuiz })))
const Grade5CuboidCubeSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka/CuboidCubeSorter").then(m => ({ default: m.CuboidCubeSorter })))
const Grade5CuboidCubeTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka/CuboidCubeTheory").then(m => ({ default: m.CuboidCubeTheory })))
const Grade5CuboidCubeVolumeMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-terfogata/CuboidCubeVolumeMatcher").then(m => ({ default: m.CuboidCubeVolumeMatcher })))
const Grade5CuboidCubeVolumeQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-terfogata/VolumeQuiz").then(m => ({ default: m.CuboidCubeVolumeQuiz })))
const Grade5CuboidCubeVolumeSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-terfogata/CuboidCubeVolumeSorter").then(m => ({ default: m.CuboidCubeVolumeSorter })))
const Grade5CuboidCubeVolumeTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-terfogata/CuboidCubeVolumeTheory").then(m => ({ default: m.CuboidCubeVolumeTheory })))
const Grade5DataCollectionMatcher = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/adatgyujtes-az-adatok-abrazolasa/DataCollectionMatcher").then(m => ({ default: m.DataCollectionMatcher })))
const Grade5DataCollectionQuiz = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/adatgyujtes-az-adatok-abrazolasa/DataCollectionQuiz").then(m => ({ default: m.DataCollectionQuiz })))
const Grade5DataCollectionSorter = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/adatgyujtes-az-adatok-abrazolasa/DataCollectionSorter").then(m => ({ default: m.DataCollectionSorter })))
const Grade5DataCollectionTheory = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/adatgyujtes-az-adatok-abrazolasa/DataCollectionTheory").then(m => ({ default: m.DataCollectionTheory })))
const Grade5DecimalAdditionSubtractionQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-osszeadasa-es-kivonasa/DecimalAdditionSubtractionQuiz").then(m => ({ default: m.DecimalAdditionSubtractionQuiz })))
const Grade5DecimalAdditionSubtractionTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-osszeadasa-es-kivonasa/DecimalAdditionSubtractionTheory").then(m => ({ default: m.DecimalAdditionSubtractionTheory })))
const Grade5DecimalCompareRoundingQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-abrazolasa-kerekitese-es-osszehasonlitasa/DecimalCompareRoundingQuiz").then(m => ({ default: m.DecimalCompareRoundingQuiz })))
const Grade5DecimalCompareRoundingTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-abrazolasa-kerekitese-es-osszehasonlitasa/DecimalCompareRoundingTheory").then(m => ({ default: m.DecimalCompareRoundingTheory })))
const Grade5DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-osztasa-pozitiv-egesz-szammal/DecimalDivisionQuiz").then(m => ({ default: m.DecimalDivisionQuiz })))
const Grade5DecimalDivisionTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-osztasa-pozitiv-egesz-szammal/DecimalDivisionTheory").then(m => ({ default: m.DecimalDivisionTheory })))
const Grade5DecimalFractionsQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek/DecimalFractionsQuiz").then(m => ({ default: m.DecimalFractionsQuiz })))
const Grade5DecimalFractionsTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek/DecimalFractionsTheory").then(m => ({ default: m.DecimalFractionsTheory })))
const Grade5DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-szorzasa-termeszetes-szammal/DecimalMultiplicationQuiz").then(m => ({ default: m.DecimalMultiplicationQuiz })))
const Grade5DecimalMultiplicationTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-szorzasa-termeszetes-szammal/DecimalMultiplicationTheory").then(m => ({ default: m.DecimalMultiplicationTheory })))
const Grade5DirectProportionMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/egyenes-aranyossag/DirectProportionMatcher").then(m => ({ default: m.DirectProportionMatcher })))
const Grade5DirectProportionQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/egyenes-aranyossag/DirectProportionQuiz").then(m => ({ default: m.DirectProportionQuiz })))
const Grade5DirectProportionSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/egyenes-aranyossag/DirectProportionSorter").then(m => ({ default: m.DirectProportionSorter })))
const Grade5DirectProportionTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/egyenes-aranyossag/DirectProportionTheory").then(m => ({ default: m.DirectProportionTheory })))
const Grade5DivisionQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/osztas-irasbeli-osztas-ketjegyu-osztoval/DivisionQuiz").then(m => ({ default: m.DivisionQuiz })))
const Grade5DivisionTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/osztas-irasbeli-osztas-ketjegyu-osztoval/DivisionTheory").then(m => ({ default: m.DivisionTheory })))
const Grade5EverydayWordProblemsMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/szoveges-feladatok-a-hetkoznapjainkban/EverydayWordProblemsMatcher").then(m => ({ default: m.EverydayWordProblemsMatcher })))
const Grade5EverydayWordProblemsQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/szoveges-feladatok-a-hetkoznapjainkban/EverydayWordProblemsQuiz").then(m => ({ default: m.EverydayWordProblemsQuiz })))
const Grade5EverydayWordProblemsSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/szoveges-feladatok-a-hetkoznapjainkban/EverydayWordProblemsSorter").then(m => ({ default: m.EverydayWordProblemsSorter })))
const Grade5EverydayWordProblemsTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/szoveges-feladatok-a-hetkoznapjainkban/EverydayWordProblemsTheory").then(m => ({ default: m.EverydayWordProblemsTheory })))
const Grade5FamousSequencesMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/nevezetes-erdekes-sorozatok/FamousSequencesMatcher").then(m => ({ default: m.FamousSequencesMatcher })))
const Grade5FamousSequencesQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/nevezetes-erdekes-sorozatok/FamousSequencesQuiz").then(m => ({ default: m.FamousSequencesQuiz })))
const Grade5FamousSequencesSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/nevezetes-erdekes-sorozatok/FamousSequencesSorter").then(m => ({ default: m.FamousSequencesSorter })))
const Grade5FamousSequencesTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/nevezetes-erdekes-sorozatok/FamousSequencesTheory").then(m => ({ default: m.FamousSequencesTheory })))
const Grade5FindSolutionsMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/keressuk-a-megoldasokat/FindSolutionsMatcher").then(m => ({ default: m.FindSolutionsMatcher })))
const Grade5FindSolutionsQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/keressuk-a-megoldasokat/FindSolutionsQuiz").then(m => ({ default: m.FindSolutionsQuiz })))
const Grade5FindSolutionsSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/keressuk-a-megoldasokat/FindSolutionsSorter").then(m => ({ default: m.FindSolutionsSorter })))
const Grade5FindSolutionsTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/keressuk-a-megoldasokat/FindSolutionsTheory").then(m => ({ default: m.FindSolutionsTheory })))
const Grade5FractionDivideQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tort-osztasa-pozitiv-egesz-szammal/FractionDivideQuiz").then(m => ({ default: m.FractionDivideQuiz })))
const Grade5FractionDivideTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tort-osztasa-pozitiv-egesz-szammal/FractionDivideTheory").then(m => ({ default: m.FractionDivideTheory })))
const Grade5FractionMultiplyQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tort-szorzasa-termeszetes-szammal/FractionMultiplyQuiz").then(m => ({ default: m.FractionMultiplyQuiz })))
const Grade5FractionMultiplyTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tort-szorzasa-termeszetes-szammal/FractionMultiplyTheory").then(m => ({ default: m.FractionMultiplyTheory })))
const Grade5FractionToDecimalMatcher = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.FractionToDecimalMatcher })))
const Grade5FractionToDecimalQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/kozonseges-tortek-tizedes-tort-alakja/FractionToDecimalQuiz").then(m => ({ default: m.FractionToDecimalQuiz })))
const Grade5FractionToDecimalTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/kozonseges-tortek-tizedes-tort-alakja/FractionToDecimalTheory").then(m => ({ default: m.FractionToDecimalTheory })))
const Grade5FractionsDiffDenomQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/kulonbozo-nevezeju-tortek-osszeadasa-es-kivonasa/FractionsDiffDenomQuiz").then(m => ({ default: m.FractionsDiffDenomQuiz })))
const Grade5FractionsDiffDenomTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/kulonbozo-nevezeju-tortek-osszeadasa-es-kivonasa/FractionsDiffDenomTheory").then(m => ({ default: m.FractionsDiffDenomTheory })))
const Grade5FractionsExpandSimplifyQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tortek-bovitese-egyszerusitese-osszehasonlitasa/FractionsExpandSimplifyQuiz").then(m => ({ default: m.FractionsExpandSimplifyQuiz })))
const Grade5FractionsExpandSimplifyTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tortek-bovitese-egyszerusitese-osszehasonlitasa/FractionsExpandSimplifyTheory").then(m => ({ default: m.FractionsExpandSimplifyTheory })))
const Grade5FractionsIntroQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/ismerkedes-a-tortekkel/FractionsIntroQuiz").then(m => ({ default: m.FractionsIntroQuiz })))
const Grade5FractionsIntroTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/ismerkedes-a-tortekkel/FractionsIntroTheory").then(m => ({ default: m.FractionsIntroTheory })))
const Grade5FractionsNumberLineQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tortek-abrazolasa-szamegyenesen-vegyes-tortek/FractionsNumberLineQuiz").then(m => ({ default: m.FractionsNumberLineQuiz })))
const Grade5FractionsNumberLineTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tortek-abrazolasa-szamegyenesen-vegyes-tortek/FractionsNumberLineTheory").then(m => ({ default: m.FractionsNumberLineTheory })))
const Grade5FractionsReviewQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/mit-tanultunk-eddig-gyakoroljunk/FractionsReviewQuiz").then(m => ({ default: m.FractionsReviewQuiz })))
const Grade5FractionsReviewTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/mit-tanultunk-eddig-gyakoroljunk/FractionsReviewTheory").then(m => ({ default: m.FractionsReviewTheory })))
const Grade5FractionsSameDenomQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/egyenlo-nevezeju-tortek-osszeadasa-es-kivonasa/FractionsSameDenomQuiz").then(m => ({ default: m.FractionsSameDenomQuiz })))
const Grade5FractionsSameDenomTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/egyenlo-nevezeju-tortek-osszeadasa-es-kivonasa/FractionsSameDenomTheory").then(m => ({ default: m.FractionsSameDenomTheory })))
const Grade5GridLocationMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/helymeghatarozas/GridLocationMatcher").then(m => ({ default: m.GridLocationMatcher })))
const Grade5GridLocationQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/helymeghatarozas/GridLocationQuiz").then(m => ({ default: m.GridLocationQuiz })))
const Grade5GridLocationSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/helymeghatarozas/GridLocationSorter").then(m => ({ default: m.GridLocationSorter })))
const Grade5GridLocationTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/helymeghatarozas/GridLocationTheory").then(m => ({ default: m.GridLocationTheory })))
const Grade5GroupingQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/csoportositasok/GroupingQuiz").then(m => ({ default: m.GroupingQuiz })))
const Grade5GroupingTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/csoportositasok/GroupingTheory").then(m => ({ default: m.GroupingTheory })))
const Grade5IntegerAdditionSubtractionQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/egesz-szamok-osszeadasa-es-kivonasa/IntegerAdditionSubtractionQuiz").then(m => ({ default: m.IntegerAdditionSubtractionQuiz })))
const Grade5IntegerAdditionSubtractionTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/egesz-szamok-osszeadasa-es-kivonasa/IntegerAdditionSubtractionTheory").then(m => ({ default: m.IntegerAdditionSubtractionTheory })))
const Grade5LengthMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-hosszusag-merese/LengthMatcher").then(m => ({ default: m.LengthMatcher })))
const Grade5LengthQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-hosszusag-merese/LengthQuiz").then(m => ({ default: m.LengthQuiz })))
const Grade5LengthSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-hosszusag-merese/LengthSorter").then(m => ({ default: m.LengthSorter })))
const Grade5LengthTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-hosszusag-merese/LengthTheory").then(m => ({ default: m.LengthTheory })))
const Grade5LinesQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/egyenesek-sikban-terben/LinesQuiz").then(m => ({ default: m.LinesQuiz })))
const Grade5LinesTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/egyenesek-sikban-terben/LinesTheory").then(m => ({ default: m.LinesTheory })))
const Grade5LocationRoleMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-helymeghatarozas-szerepe-kornyezetunkben/LocationRoleMatcher").then(m => ({ default: m.LocationRoleMatcher })))
const Grade5LocationRoleQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-helymeghatarozas-szerepe-kornyezetunkben/LocationRoleQuiz").then(m => ({ default: m.LocationRoleQuiz })))
const Grade5LocationRoleSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-helymeghatarozas-szerepe-kornyezetunkben/LocationRoleSorter").then(m => ({ default: m.LocationRoleSorter })))
const Grade5LocationRoleTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-helymeghatarozas-szerepe-kornyezetunkben/LocationRoleTheory").then(m => ({ default: m.LocationRoleTheory })))
const Grade5LocationSummaryMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/osszefoglalas/LocationSummaryMatcher").then(m => ({ default: m.LocationSummaryMatcher })))
const Grade5LocationSummaryQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/osszefoglalas/LocationSummaryQuiz").then(m => ({ default: m.LocationSummaryQuiz })))
const Grade5LocationSummarySorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/osszefoglalas/LocationSummarySorter").then(m => ({ default: m.LocationSummarySorter })))
const Grade5LocationSummaryTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/osszefoglalas/LocationSummaryTheory").then(m => ({ default: m.LocationSummaryTheory })))
const Grade5LogicGamesMatcher = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/jatekok/LogicGamesMatcher").then(m => ({ default: m.LogicGamesMatcher })))
const Grade5LogicGamesQuiz = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/jatekok/LogicGamesQuiz").then(m => ({ default: m.LogicGamesQuiz })))
const Grade5LogicGamesSorter = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/jatekok/LogicGamesSorter").then(m => ({ default: m.LogicGamesSorter })))
const Grade5LogicGamesTheory = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/jatekok/LogicGamesTheory").then(m => ({ default: m.LogicGamesTheory })))
const Grade5MassMeasurementMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/a-tomeg-merese-mertekegysegei/MassMeasurementMatcher").then(m => ({ default: m.MassMeasurementMatcher })))
const Grade5MassMeasurementQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/a-tomeg-merese-mertekegysegei/MassMeasurementQuiz").then(m => ({ default: m.MassMeasurementQuiz })))
const Grade5MassMeasurementSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/a-tomeg-merese-mertekegysegei/MassMeasurementSorter").then(m => ({ default: m.MassMeasurementSorter })))
const Grade5MassMeasurementTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/a-tomeg-merese-mertekegysegei/MassMeasurementTheory").then(m => ({ default: m.MassMeasurementTheory })))
const Grade5MeasurementSummaryMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/osszefoglalas/MeasurementSummaryMatcher").then(m => ({ default: m.MeasurementSummaryMatcher })))
const Grade5MeasurementSummaryQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/osszefoglalas/MeasurementSummaryQuiz").then(m => ({ default: m.MeasurementSummaryQuiz })))
const Grade5MeasurementSummarySorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/osszefoglalas/MeasurementSummarySorter").then(m => ({ default: m.MeasurementSummarySorter })))
const Grade5MeasurementSummaryTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/osszefoglalas/MeasurementSummaryTheory").then(m => ({ default: m.MeasurementSummaryTheory })))
const Grade5MultiplicationQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/szorzas-irasbeli-szorzas/MultiplicationQuiz").then(m => ({ default: m.MultiplicationQuiz })))
const Grade5MultiplicationTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/szorzas-irasbeli-szorzas/MultiplicationTheory").then(m => ({ default: m.MultiplicationTheory })))
const Grade5NegativeNumbersQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/negativ-szamok/NegativeNumbersQuiz").then(m => ({ default: m.NegativeNumbersQuiz })))
const Grade5NegativeNumbersTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/negativ-szamok/NegativeNumbersTheory").then(m => ({ default: m.NegativeNumbersTheory })))
const Grade5NumberLineQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-abrazolasa-a-szamegyenesen/NumberLineQuiz").then(m => ({ default: m.NumberLineQuiz })))
const Grade5NumberLineTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-abrazolasa-a-szamegyenesen/NumberLineTheory").then(m => ({ default: m.NumberLineTheory })))
const Grade5NumberReadingQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamjegyek-harmas-csoportositasa-es-a-szamok-kiolvasasa/NumberReadingQuiz").then(m => ({ default: m.NumberReadingQuiz })))
const Grade5NumberReadingTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamjegyek-harmas-csoportositasa-es-a-szamok-kiolvasasa/NumberReadingTheory").then(m => ({ default: m.NumberReadingTheory })))
const Grade5NumberSpellingQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-termeszetes-szamok-helyesirasa/NumberSpellingQuiz").then(m => ({ default: m.NumberSpellingQuiz })))
const Grade5NumberSpellingTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-termeszetes-szamok-helyesirasa/NumberSpellingTheory").then(m => ({ default: m.NumberSpellingTheory })))
const Grade5NumberSystemsQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/szamrendszerek/NumberSystemsQuiz").then(m => ({ default: m.NumberSystemsQuiz })))
const Grade5NumberSystemsTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/szamrendszerek/NumberSystemsTheory").then(m => ({ default: m.NumberSystemsTheory })))
const Grade5NumbersSummaryMatcher = lazy(() => import("@/components/math/grade-5/ev-vegi-osszefoglalas/szamok-es-muveletek/NumbersSummaryMatcher").then(m => ({ default: m.NumbersSummaryMatcher })))
const Grade5NumbersSummaryQuiz = lazy(() => import("@/components/math/grade-5/ev-vegi-osszefoglalas/szamok-es-muveletek/NumbersSummaryQuiz").then(m => ({ default: m.NumbersSummaryQuiz })))
const Grade5NumbersSummarySorter = lazy(() => import("@/components/math/grade-5/ev-vegi-osszefoglalas/szamok-es-muveletek/NumbersSummarySorter").then(m => ({ default: m.NumbersSummarySorter })))
const Grade5NumbersSummaryTheory = lazy(() => import("@/components/math/grade-5/ev-vegi-osszefoglalas/szamok-es-muveletek/NumbersSummaryTheory").then(m => ({ default: m.NumbersSummaryTheory })))
const Grade5OpenSentencesMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/nyitott-mondatok/OpenSentencesMatcher").then(m => ({ default: m.OpenSentencesMatcher })))
const Grade5OpenSentencesQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/nyitott-mondatok/OpenSentencesQuiz").then(m => ({ default: m.OpenSentencesQuiz })))
const Grade5OpenSentencesSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/nyitott-mondatok/OpenSentencesSorter").then(m => ({ default: m.OpenSentencesSorter })))
const Grade5OpenSentencesTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/nyitott-mondatok/OpenSentencesTheory").then(m => ({ default: m.OpenSentencesTheory })))
const Grade5OppositeAbsoluteQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-ellentettje-es-abszolut-erteke/OppositeAbsoluteQuiz").then(m => ({ default: m.OppositeAbsoluteQuiz })))
const Grade5OppositeAbsoluteTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-ellentettje-es-abszolut-erteke/OppositeAbsoluteTheory").then(m => ({ default: m.OppositeAbsoluteTheory })))
const Grade5OrderOfOperationsFractionsQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/muveletek-sorrendje-zarojelfelbontas/OrderOfOperationsFractionsQuiz").then(m => ({ default: m.OrderOfOperationsFractionsQuiz })))
const Grade5OrderOfOperationsFractionsTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/muveletek-sorrendje-zarojelfelbontas/OrderOfOperationsFractionsTheory").then(m => ({ default: m.OrderOfOperationsFractionsTheory })))
const Grade5OrderOfOperationsQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/muveletek-tulajdonsagai-muveleti-sorrend-zarojelek/OrderOfOperationsQuiz").then(m => ({ default: m.OrderOfOperationsQuiz })))
const Grade5OrderOfOperationsTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/muveletek-tulajdonsagai-muveleti-sorrend-zarojelek/OrderOfOperationsTheory").then(m => ({ default: m.OrderOfOperationsTheory })))
const Grade5PerimeterMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-kerulete/PerimeterMatcher").then(m => ({ default: m.PerimeterMatcher })))
const Grade5PerimeterQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-kerulete/PerimeterQuiz").then(m => ({ default: m.PerimeterQuiz })))
const Grade5PerimeterSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-kerulete/PerimeterSorter").then(m => ({ default: m.PerimeterSorter })))
const Grade5PerimeterTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-kerulete/PerimeterTheory").then(m => ({ default: m.PerimeterTheory })))
const Grade5PlaceValueQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-helyiertekes-iras/PlaceValueQuiz").then(m => ({ default: m.PlaceValueQuiz })))
const Grade5PlaceValueTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-helyiertekes-iras/PlaceValueTheory").then(m => ({ default: m.PlaceValueTheory })))
const Grade5PointPlottingMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/pontok-abrazolasa/PointPlottingMatcher").then(m => ({ default: m.PointPlottingMatcher })))
const Grade5PointPlottingQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/pontok-abrazolasa/PointPlottingQuiz").then(m => ({ default: m.PointPlottingQuiz })))
const Grade5PointPlottingSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/pontok-abrazolasa/PointPlottingSorter").then(m => ({ default: m.PointPlottingSorter })))
const Grade5PointPlottingTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/pontok-abrazolasa/PointPlottingTheory").then(m => ({ default: m.PointPlottingTheory })))
const Grade5PolygonsQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/sikidomok-sokszogek/PolygonsQuiz").then(m => ({ default: m.PolygonsQuiz })))
const Grade5PolygonsTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/sikidomok-sokszogek/PolygonsTheory").then(m => ({ default: m.PolygonsTheory })))
const Grade5PracticalMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/gyakorlati-feladatok/PracticalProblemsMatcher").then(m => ({ default: m.PracticalProblemsMatcher })))
const Grade5PracticalQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/gyakorlati-feladatok/PracticalProblemsQuiz").then(m => ({ default: m.PracticalProblemsQuiz })))
const Grade5PracticalSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/gyakorlati-feladatok/PracticalProblemsSorter").then(m => ({ default: m.PracticalProblemsSorter })))
const Grade5PracticalTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/gyakorlati-feladatok/PracticalProblemsTheory").then(m => ({ default: m.PracticalProblemsTheory })))
const Grade5ProbabilityMatcher = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/lehetetlen-lehetseges-biztos/ProbabilityMatcher").then(m => ({ default: m.ProbabilityMatcher })))
const Grade5ProbabilityQuiz = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/lehetetlen-lehetseges-biztos/ProbabilityQuiz").then(m => ({ default: m.ProbabilityQuiz })))
const Grade5ProbabilitySorter = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/lehetetlen-lehetseges-biztos/ProbabilitySorter").then(m => ({ default: m.ProbabilitySorter })))
const Grade5ProbabilityTheory = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/lehetetlen-lehetseges-biztos/ProbabilityTheory").then(m => ({ default: m.ProbabilityTheory })))
const Grade5QuadsQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/teglalap-negyzet/QuadsQuiz").then(m => ({ default: m.QuadsQuiz })))
const Grade5QuadsTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/teglalap-negyzet/QuadsTheory").then(m => ({ default: m.QuadsTheory })))
const Grade5RectangleAreaMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-terulete/RectangleAreaMatcher").then(m => ({ default: m.RectangleAreaMatcher })))
const Grade5RectangleAreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-terulete/RectangleAreaQuiz").then(m => ({ default: m.RectangleAreaQuiz })))
const Grade5RectangleAreaSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-terulete/RectangleAreaSorter").then(m => ({ default: m.RectangleAreaSorter })))
const Grade5RectangleAreaTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-terulete/RectangleAreaTheory").then(m => ({ default: m.RectangleAreaTheory })))
const Grade5RelationsMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/keressunk-osszefuggeseket/RelationsMatcher").then(m => ({ default: m.RelationsMatcher })))
const Grade5RelationsQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/keressunk-osszefuggeseket/RelationsQuiz").then(m => ({ default: m.RelationsQuiz })))
const Grade5RelationsSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/keressunk-osszefuggeseket/RelationsSorter").then(m => ({ default: m.RelationsSorter })))
const Grade5RelationsTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/keressunk-osszefuggeseket/RelationsTheory").then(m => ({ default: m.RelationsTheory })))
const Grade5RhythmPatternsMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/ritmusok-diszitesek/RhythmPatternsMatcher").then(m => ({ default: m.RhythmPatternsMatcher })))
const Grade5RhythmPatternsQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/ritmusok-diszitesek/RhythmPatternsQuiz").then(m => ({ default: m.RhythmPatternsQuiz })))
const Grade5RhythmPatternsSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/ritmusok-diszitesek/RhythmPatternsSorter").then(m => ({ default: m.RhythmPatternsSorter })))
const Grade5RhythmPatternsTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/ritmusok-diszitesek/RhythmPatternsTheory").then(m => ({ default: m.RhythmPatternsTheory })))
const Grade5RomanNumeralsQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-kialakulasa-a-romai-szamok/RomanNumeralsQuiz").then(m => ({ default: m.RomanNumeralsQuiz })))
const Grade5RomanNumeralsTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-kialakulasa-a-romai-szamok/RomanNumeralsTheory").then(m => ({ default: m.RomanNumeralsTheory })))
const Grade5RoundingQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/becsles-kerekites/RoundingQuiz").then(m => ({ default: m.RoundingQuiz })))
const Grade5RoundingTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/becsles-kerekites/RoundingTheory").then(m => ({ default: m.RoundingTheory })))
const Grade5SequencesMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/sorozatok/SequencesMatcher").then(m => ({ default: m.SequencesMatcher })))
const Grade5SequencesQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/sorozatok/SequencesQuiz").then(m => ({ default: m.SequencesQuiz })))
const Grade5SequencesSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/sorozatok/SequencesSorter").then(m => ({ default: m.SequencesSorter })))
const Grade5SequencesTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/sorozatok/SequencesTheory").then(m => ({ default: m.SequencesTheory })))
const Grade5SetsQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/halmazok/SetsQuiz").then(m => ({ default: m.SetsQuiz })))
const Grade5SetsTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/halmazok/SetsTheory").then(m => ({ default: m.SetsTheory })))
const Grade5SimpleWordProblemsMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/egyszeru-szoveges-feladatok/SimpleWordProblemsMatcher").then(m => ({ default: m.SimpleWordProblemsMatcher })))
const Grade5SimpleWordProblemsQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/egyszeru-szoveges-feladatok/SimpleWordProblemsQuiz").then(m => ({ default: m.SimpleWordProblemsQuiz })))
const Grade5SimpleWordProblemsSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/egyszeru-szoveges-feladatok/SimpleWordProblemsSorter").then(m => ({ default: m.SimpleWordProblemsSorter })))
const Grade5SimpleWordProblemsTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/egyszeru-szoveges-feladatok/SimpleWordProblemsTheory").then(m => ({ default: m.SimpleWordProblemsTheory })))
const Grade5SpatialOrientationMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/tajekozodas-sikban-terben/SpatialOrientationMatcher").then(m => ({ default: m.SpatialOrientationMatcher })))
const Grade5SpatialOrientationQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/tajekozodas-sikban-terben/SpatialOrientationQuiz").then(m => ({ default: m.SpatialOrientationQuiz })))
const Grade5SpatialOrientationSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/tajekozodas-sikban-terben/SpatialOrientationSorter").then(m => ({ default: m.SpatialOrientationSorter })))
const Grade5SpatialOrientationTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/tajekozodas-sikban-terben/SpatialOrientationTheory").then(m => ({ default: m.SpatialOrientationTheory })))
const Grade5StatsSummaryMatcher = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/osszefoglalas/StatsSummaryMatcher").then(m => ({ default: m.StatsSummaryMatcher })))
const Grade5StatsSummaryQuiz = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/osszefoglalas/StatsSummaryQuiz").then(m => ({ default: m.StatsSummaryQuiz })))
const Grade5StatsSummarySorter = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/osszefoglalas/StatsSummarySorter").then(m => ({ default: m.StatsSummarySorter })))
const Grade5StatsSummaryTheory = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/osszefoglalas/StatsSummaryTheory").then(m => ({ default: m.StatsSummaryTheory })))
const Grade5SubtractionQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/kivonas-irasbeli-kivonas/SubtractionQuiz").then(m => ({ default: m.SubtractionQuiz })))
const Grade5SubtractionTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/kivonas-irasbeli-kivonas/SubtractionTheory").then(m => ({ default: m.SubtractionTheory })))
const Grade5SummaryQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/osszefoglalas/SummaryQuiz").then(m => ({ default: m.SummaryQuiz })))
const Grade5SummaryTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/osszefoglalas/SummaryTheory").then(m => ({ default: m.SummaryTheory })))
const Grade5SurfaceAreaMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-felszine/SurfaceAreaMatcher").then(m => ({ default: m.SurfaceAreaMatcher })))
const Grade5SurfaceAreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-felszine/SurfaceAreaQuiz").then(m => ({ default: m.SurfaceAreaQuiz })))
const Grade5SurfaceAreaSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-felszine/SurfaceAreaSorter").then(m => ({ default: m.SurfaceAreaSorter })))
const Grade5SurfaceAreaTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-felszine/SurfaceAreaTheory").then(m => ({ default: m.SurfaceAreaTheory })))
const Grade5TablesGraphsMatcher = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/tablazatok-grafikonok/TablesGraphsMatcher").then(m => ({ default: m.TablesGraphsMatcher })))
const Grade5TablesGraphsQuiz = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/tablazatok-grafikonok/TablesGraphsQuiz").then(m => ({ default: m.TablesGraphsQuiz })))
const Grade5TablesGraphsSorter = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/tablazatok-grafikonok/TablesGraphsSorter").then(m => ({ default: m.TablesGraphsSorter })))
const Grade5TablesGraphsTheory = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/tablazatok-grafikonok/TablesGraphsTheory").then(m => ({ default: m.TablesGraphsTheory })))
const Grade5TimeMeasurementMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/az-ido-merese-mertekegysegei/TimeMeasurementMatcher").then(m => ({ default: m.TimeMeasurementMatcher })))
const Grade5TimeMeasurementQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/az-ido-merese-mertekegysegei/TimeMeasurementQuiz").then(m => ({ default: m.TimeMeasurementQuiz })))
const Grade5TimeMeasurementSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/az-ido-merese-mertekegysegei/TimeMeasurementSorter").then(m => ({ default: m.TimeMeasurementSorter })))
const Grade5TimeMeasurementTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/az-ido-merese-mertekegysegei/TimeMeasurementTheory").then(m => ({ default: m.TimeMeasurementTheory })))
const Grade5UnitConversionsMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/mertekegyseg-atvaltasok/UnitConversionsMatcher").then(m => ({ default: m.UnitConversionsMatcher })))
const Grade5UnitConversionsQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/mertekegyseg-atvaltasok/UnitConversionsQuiz").then(m => ({ default: m.UnitConversionsQuiz })))
const Grade5UnitConversionsSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/mertekegyseg-atvaltasok/UnitConversionsSorter").then(m => ({ default: m.UnitConversionsSorter })))
const Grade5UnitConversionsTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/mertekegyseg-atvaltasok/UnitConversionsTheory").then(m => ({ default: m.UnitConversionsTheory })))
const Grade5VariableQuantitiesMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/aranyossagok-valtozo-mennyisegek/VariableQuantitiesMatcher").then(m => ({ default: m.VariableQuantitiesMatcher })))
const Grade5VariableQuantitiesQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/aranyossagok-valtozo-mennyisegek/VariableQuantitiesQuiz").then(m => ({ default: m.VariableQuantitiesQuiz })))
const Grade5VariableQuantitiesSorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/aranyossagok-valtozo-mennyisegek/VariableQuantitiesSorter").then(m => ({ default: m.VariableQuantitiesSorter })))
const Grade5VariableQuantitiesTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/aranyossagok-valtozo-mennyisegek/VariableQuantitiesTheory").then(m => ({ default: m.VariableQuantitiesTheory })))
const Grade5VolumeMeasureMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terfogat-merese/VolumeMeasureMatcher").then(m => ({ default: m.VolumeMeasureMatcher })))
const Grade5VolumeMeasureQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terfogat-merese/VolumeMeasureQuiz").then(m => ({ default: m.VolumeMeasureQuiz })))
const Grade5VolumeMeasureSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terfogat-merese/VolumeMeasureSorter").then(m => ({ default: m.VolumeMeasureSorter })))
const Grade5VolumeMeasureTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terfogat-merese/VolumeMeasureTheory").then(m => ({ default: m.VolumeMeasureTheory })))
const Grade5WordProblemsSummaryMatcher = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/osszefoglalas/WordProblemsSummaryMatcher").then(m => ({ default: m.WordProblemsSummaryMatcher })))
const Grade5WordProblemsSummaryQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/osszefoglalas/WordProblemsSummaryQuiz").then(m => ({ default: m.WordProblemsSummaryQuiz })))
const Grade5WordProblemsSummarySorter = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/osszefoglalas/WordProblemsSummarySorter").then(m => ({ default: m.WordProblemsSummarySorter })))
const Grade5WordProblemsSummaryTheory = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/osszefoglalas/WordProblemsSummaryTheory").then(m => ({ default: m.WordProblemsSummaryTheory })))

export const Grade5Activities: React.FC<ActivityRouterProps> = ({
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
                  {activityType === 'g5-roman-numerals-theory' && (
                    <Grade5RomanNumeralsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-roman-numerals-quiz')}
                    />
                  )}

                  {activityType === 'g5-roman-numerals-quiz' && (
                    <Grade5RomanNumeralsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-roman-numerals-theory')}
                    />
                  )}

                  {activityType === 'g5-place-value-theory' && (
                    <Grade5PlaceValueTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-place-value-quiz')}
                    />
                  )}

                  {activityType === 'g5-place-value-quiz' && (
                    <Grade5PlaceValueQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-place-value-theory')}
                    />
                  )}

                  {activityType === 'g5-number-reading-theory' && (
                    <Grade5NumberReadingTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-number-reading-quiz')}
                    />
                  )}

                  {activityType === 'g5-number-reading-quiz' && (
                    <Grade5NumberReadingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-number-reading-theory')}
                    />
                  )}

                  {activityType === 'g5-number-spelling-theory' && (
                    <Grade5NumberSpellingTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-number-spelling-quiz')}
                    />
                  )}

                  {activityType === 'g5-number-spelling-quiz' && (
                    <Grade5NumberSpellingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-number-spelling-theory')}
                    />
                  )}

                  {activityType === 'g5-number-systems-theory' && (
                    <Grade5NumberSystemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-number-systems-quiz')}
                    />
                  )}

                  {activityType === 'g5-number-systems-quiz' && (
                    <Grade5NumberSystemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-number-systems-theory')}
                    />
                  )}

                  {activityType === 'g5-number-line-theory' && (
                    <Grade5NumberLineTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-number-line-quiz')}
                    />
                  )}

                  {activityType === 'g5-number-line-quiz' && (
                    <Grade5NumberLineQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-number-line-theory')}
                    />
                  )}

                  {activityType === 'g5-rounding-theory' && (
                    <Grade5RoundingTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-rounding-quiz')}
                    />
                  )}

                  {activityType === 'g5-rounding-quiz' && (
                    <Grade5RoundingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-rounding-theory')}
                    />
                  )}

                  {activityType === 'g5-addition-theory' && (
                    <Grade5AdditionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-addition-quiz')}
                    />
                  )}

                  {activityType === 'g5-addition-quiz' && (
                    <Grade5AdditionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-addition-theory')}
                    />
                  )}

                  {activityType === 'g5-subtraction-theory' && (
                    <Grade5SubtractionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-subtraction-quiz')}
                    />
                  )}

                  {activityType === 'g5-subtraction-quiz' && (
                    <Grade5SubtractionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-subtraction-theory')}
                    />
                  )}

                  {activityType === 'g5-multiplication-theory' && (
                    <Grade5MultiplicationTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-multiplication-quiz')}
                    />
                  )}

                  {activityType === 'g5-multiplication-quiz' && (
                    <Grade5MultiplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-multiplication-theory')}
                    />
                  )}

                  {activityType === 'g5-division-theory' && (
                    <Grade5DivisionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-division-quiz')}
                    />
                  )}

                  {activityType === 'g5-division-quiz' && (
                    <Grade5DivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-division-theory')}
                    />
                  )}

                  {activityType === 'g5-order-of-operations-theory' && (
                    <Grade5OrderOfOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-order-of-operations-quiz')}
                    />
                  )}

                  {activityType === 'g5-order-of-operations-quiz' && (
                    <Grade5OrderOfOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-order-of-operations-theory')}
                    />
                  )}

                  {activityType === 'g5-negative-numbers-theory' && (
                    <Grade5NegativeNumbersTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-negative-numbers-quiz')}
                    />
                  )}

                  {activityType === 'g5-negative-numbers-quiz' && (
                    <Grade5NegativeNumbersQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-negative-numbers-theory')}
                    />
                  )}

                  {activityType === 'g5-opposite-absolute-theory' && (
                    <Grade5OppositeAbsoluteTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-opposite-absolute-quiz')}
                    />
                  )}

                  {activityType === 'g5-opposite-absolute-quiz' && (
                    <Grade5OppositeAbsoluteQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-opposite-absolute-theory')}
                    />
                  )}

                  {activityType === 'g5-integer-addition-subtraction-theory' && (
                    <Grade5IntegerAdditionSubtractionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-integer-addition-subtraction-quiz')}
                    />
                  )}

                  {activityType === 'g5-integer-addition-subtraction-quiz' && (
                    <Grade5IntegerAdditionSubtractionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-integer-addition-subtraction-theory')}
                    />
                  )}

                  {activityType === 'g5-chapter1-summary-theory' && (
                    <Grade5Chapter1SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-chapter1-summary-quiz')}
                    />
                  )}

                  {activityType === 'g5-chapter1-summary-quiz' && (
                    <Grade5Chapter1SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-chapter1-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-fractions-intro-theory' && (
                    <Grade5FractionsIntroTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fractions-intro-quiz')}
                    />
                  )}

                  {activityType === 'g5-fractions-intro-quiz' && (
                    <Grade5FractionsIntroQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fractions-intro-theory')}
                    />
                  )}

                  {activityType === 'g5-fractions-expand-simplify-theory' && (
                    <Grade5FractionsExpandSimplifyTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fractions-expand-simplify-quiz')}
                    />
                  )}

                  {activityType === 'g5-fractions-expand-simplify-quiz' && (
                    <Grade5FractionsExpandSimplifyQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fractions-expand-simplify-theory')}
                    />
                  )}

                  {activityType === 'g5-fractions-number-line-theory' && (
                    <Grade5FractionsNumberLineTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fractions-number-line-quiz')}
                    />
                  )}

                  {activityType === 'g5-fractions-number-line-quiz' && (
                    <Grade5FractionsNumberLineQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fractions-number-line-theory')}
                    />
                  )}

                  {activityType === 'g5-fractions-same-denom-theory' && (
                    <Grade5FractionsSameDenomTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fractions-same-denom-quiz')}
                    />
                  )}

                  {activityType === 'g5-fractions-same-denom-quiz' && (
                    <Grade5FractionsSameDenomQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fractions-same-denom-theory')}
                    />
                  )}

                  {activityType === 'g5-fractions-diff-denom-theory' && (
                    <Grade5FractionsDiffDenomTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fractions-diff-denom-quiz')}
                    />
                  )}

                  {activityType === 'g5-fractions-diff-denom-quiz' && (
                    <Grade5FractionsDiffDenomQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fractions-diff-denom-theory')}
                    />
                  )}

                  {activityType === 'g5-fraction-multiply-theory' && (
                    <Grade5FractionMultiplyTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fraction-multiply-quiz')}
                    />
                  )}

                  {activityType === 'g5-fraction-multiply-quiz' && (
                    <Grade5FractionMultiplyQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fraction-multiply-theory')}
                    />
                  )}

                  {activityType === 'g5-fraction-divide-theory' && (
                    <Grade5FractionDivideTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fraction-divide-quiz')}
                    />
                  )}

                  {activityType === 'g5-fraction-divide-quiz' && (
                    <Grade5FractionDivideQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fraction-divide-theory')}
                    />
                  )}

                  {activityType === 'g5-fractions-order-of-operations-theory' && (
                    <Grade5OrderOfOperationsFractionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fractions-order-of-operations-quiz')}
                    />
                  )}

                  {activityType === 'g5-fractions-order-of-operations-quiz' && (
                    <Grade5OrderOfOperationsFractionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fractions-order-of-operations-theory')}
                    />
                  )}

                  {activityType === 'g5-fractions-review-theory' && (
                    <Grade5FractionsReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fractions-review-quiz')}
                    />
                  )}

                  {activityType === 'g5-fractions-review-quiz' && (
                    <Grade5FractionsReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fractions-review-theory')}
                    />
                  )}

                  {activityType === 'g5-decimal-fractions-theory' && (
                    <Grade5DecimalFractionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-decimal-fractions-quiz')}
                    />
                  )}

                  {activityType === 'g5-decimal-fractions-quiz' && (
                    <Grade5DecimalFractionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-decimal-fractions-theory')}
                    />
                  )}

                  {activityType === 'g5-decimal-compare-rounding-theory' && (
                    <Grade5DecimalCompareRoundingTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-decimal-compare-rounding-quiz')}
                    />
                  )}

                  {activityType === 'g5-decimal-compare-rounding-quiz' && (
                    <Grade5DecimalCompareRoundingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-decimal-compare-rounding-theory')}
                    />
                  )}

                  {activityType === 'g5-decimal-add-sub-theory' && (
                    <Grade5DecimalAdditionSubtractionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-decimal-add-sub-quiz')}
                    />
                  )}

                  {activityType === 'g5-decimal-add-sub-quiz' && (
                    <Grade5DecimalAdditionSubtractionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-decimal-add-sub-theory')}
                    />
                  )}

                  {activityType === 'g5-decimal-multiply-theory' && (
                    <Grade5DecimalMultiplicationTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-decimal-multiply-quiz')}
                    />
                  )}

                  {activityType === 'g5-decimal-multiply-quiz' && (
                    <Grade5DecimalMultiplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-decimal-multiply-theory')}
                    />
                  )}

                  {activityType === 'g5-decimal-divide-theory' && (
                    <Grade5DecimalDivisionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-decimal-divide-quiz')}
                    />
                  )}

                  {activityType === 'g5-decimal-divide-quiz' && (
                    <Grade5DecimalDivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-decimal-divide-theory')}
                    />
                  )}

                  {activityType === 'g5-fraction-to-decimal-theory' && (
                    <Grade5FractionToDecimalTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-fraction-to-decimal-quiz')}
                    />
                  )}

                  {activityType === 'g5-fraction-to-decimal-quiz' && (
                    <Grade5FractionToDecimalQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-fraction-to-decimal-theory')}
                    />
                  )}

                  {activityType === 'g5-chapter2-summary-theory' && (
                    <Grade5Chapter2SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-chapter2-summary-quiz')}
                    />
                  )}

                  {activityType === 'g5-chapter2-summary-quiz' && (
                    <Grade5Chapter2SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-chapter2-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-grouping-theory' && (
                    <Grade5GroupingTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-grouping-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-grouping-quiz' && (
                    <Grade5GroupingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-grouping-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-sets-theory' && (
                    <Grade5SetsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-sets-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-sets-quiz' && (
                    <Grade5SetsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-sets-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-bodies-theory' && (
                    <Grade5BodiesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-bodies-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-bodies-quiz' && (
                    <Grade5BodiesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-bodies-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-angles-theory' && (
                    <Grade5AnglesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-angles-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-angles-quiz' && (
                    <Grade5AnglesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-angles-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-triangles-theory' && (
                    <Grade5PolygonsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-triangles-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-triangles-quiz' && (
                    <Grade5PolygonsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-triangles-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-building-theory' && (
                    <Grade5BuildingTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-building-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-building-quiz' && (
                    <Grade5BuildingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-building-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-lines-theory' && (
                    <Grade5LinesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-lines-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-lines-quiz' && (
                    <Grade5LinesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-lines-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-quads-theory' && (
                    <Grade5QuadsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-quads-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-quads-quiz' && (
                    <Grade5QuadsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-quads-theory')}
                    />
                  )}

                  {activityType === 'g5-geom-summary-theory' && (
                    <Grade5SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-geom-summary-quiz')}
                    />
                  )}

                  {activityType === 'g5-geom-summary-quiz' && (
                    <Grade5SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-geom-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-length-theory' && (
                    <Grade5LengthTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-length-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-length-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-length-quiz' && (
                    <Grade5LengthQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-length-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-length-matcher' && (
                    <Grade5LengthMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-length-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-length-sorter' && (
                    <Grade5LengthSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-length-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-perimeter-theory' && (
                    <Grade5PerimeterTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-perimeter-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-perimeter-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-perimeter-quiz' && (
                    <Grade5PerimeterQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-perimeter-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-perimeter-matcher' && (
                    <Grade5PerimeterMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-perimeter-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-perimeter-sorter' && (
                    <Grade5PerimeterSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-perimeter-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-area-theory' && (
                    <Grade5AreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-area-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-area-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-area-quiz' && (
                    <Grade5AreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-area-matcher' && (
                    <Grade5AreaMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-area-sorter' && (
                    <Grade5AreaSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-rectangle-area-theory' && (
                    <Grade5RectangleAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-rectangle-area-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-rectangle-area-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-rectangle-area-quiz' && (
                    <Grade5RectangleAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-rectangle-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-rectangle-area-matcher' && (
                    <Grade5RectangleAreaMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-rectangle-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-rectangle-area-sorter' && (
                    <Grade5RectangleAreaSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-rectangle-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-cuboid-cube-theory' && (
                    <Grade5CuboidCubeTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-cuboid-cube-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-cuboid-cube-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-cuboid-cube-quiz' && (
                    <Grade5CuboidCubeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-cuboid-cube-matcher' && (
                    <Grade5CuboidCubeMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-cuboid-cube-sorter' && (
                    <Grade5CuboidCubeSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-surface-area-theory' && (
                    <Grade5SurfaceAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-surface-area-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-surface-area-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-surface-area-quiz' && (
                    <Grade5SurfaceAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-surface-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-surface-area-matcher' && (
                    <Grade5SurfaceAreaMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-surface-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-surface-area-sorter' && (
                    <Grade5SurfaceAreaSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-surface-area-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-volume-measure-theory' && (
                    <Grade5VolumeMeasureTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-volume-measure-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-volume-measure-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-volume-measure-quiz' && (
                    <Grade5VolumeMeasureQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-volume-measure-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-volume-measure-matcher' && (
                    <Grade5VolumeMeasureMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-volume-measure-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-volume-measure-sorter' && (
                    <Grade5VolumeMeasureSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-volume-measure-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-cuboid-cube-volume-theory' && (
                    <Grade5CuboidCubeVolumeTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-cuboid-cube-volume-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-cuboid-cube-volume-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-cuboid-cube-volume-quiz' && (
                    <Grade5CuboidCubeVolumeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-volume-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-cuboid-cube-volume-matcher' && (
                    <Grade5CuboidCubeVolumeMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-volume-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-cuboid-cube-volume-sorter' && (
                    <Grade5CuboidCubeVolumeSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-volume-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-practical-theory' && (
                    <Grade5PracticalTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-practical-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-practical-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-practical-quiz' && (
                    <Grade5PracticalQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-practical-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-practical-matcher' && (
                    <Grade5PracticalMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-practical-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-practical-sorter' && (
                    <Grade5PracticalSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-practical-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-summary-theory' && (
                    <Grade5MeasurementSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-meas-summary-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-meas-summary-quiz')}
                    />
                  )}

                  {activityType === 'g5-meas-summary-quiz' && (
                    <Grade5MeasurementSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-summary-matcher' && (
                    <Grade5MeasurementSummaryMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-meas-summary-sorter' && (
                    <Grade5MeasurementSummarySorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-meas-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-role-theory' && (
                    <Grade5LocationRoleTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-role-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-role-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-role-quiz' && (
                    <Grade5LocationRoleQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-role-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-role-matcher' && (
                    <Grade5LocationRoleMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-role-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-role-sorter' && (
                    <Grade5LocationRoleSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-role-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-grid-theory' && (
                    <Grade5GridLocationTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-grid-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-grid-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-grid-quiz' && (
                    <Grade5GridLocationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-grid-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-grid-matcher' && (
                    <Grade5GridLocationMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-grid-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-grid-sorter' && (
                    <Grade5GridLocationSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-grid-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-coord-sys-theory' && (
                    <Grade5CoordinateSystemTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-coord-sys-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-coord-sys-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-coord-sys-quiz' && (
                    <Grade5CoordinateSystemQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-coord-sys-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-coord-sys-matcher' && (
                    <Grade5CoordinateSystemMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-coord-sys-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-coord-sys-sorter' && (
                    <Grade5CoordinateSystemSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-coord-sys-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-points-theory' && (
                    <Grade5PointPlottingTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-points-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-points-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-points-quiz' && (
                    <Grade5PointPlottingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-points-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-points-matcher' && (
                    <Grade5PointPlottingMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-points-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-points-sorter' && (
                    <Grade5PointPlottingSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-points-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-spatial-theory' && (
                    <Grade5SpatialOrientationTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-spatial-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-spatial-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-spatial-quiz' && (
                    <Grade5SpatialOrientationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-spatial-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-spatial-matcher' && (
                    <Grade5SpatialOrientationMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-spatial-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-spatial-sorter' && (
                    <Grade5SpatialOrientationSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-spatial-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-patterns-theory' && (
                    <Grade5RhythmPatternsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-patterns-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-patterns-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-patterns-quiz' && (
                    <Grade5RhythmPatternsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-patterns-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-patterns-matcher' && (
                    <Grade5RhythmPatternsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-patterns-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-patterns-sorter' && (
                    <Grade5RhythmPatternsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-patterns-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-relations-theory' && (
                    <Grade5RelationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-relations-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-relations-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-relations-quiz' && (
                    <Grade5RelationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-relations-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-relations-matcher' && (
                    <Grade5RelationsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-relations-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-relations-sorter' && (
                    <Grade5RelationsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-relations-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-sequences-theory' && (
                    <Grade5SequencesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-sequences-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-sequences-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-sequences-quiz' && (
                    <Grade5SequencesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-sequences-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-sequences-matcher' && (
                    <Grade5SequencesMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-sequences-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-sequences-sorter' && (
                    <Grade5SequencesSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-sequences-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-famous-seq-theory' && (
                    <Grade5FamousSequencesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-famous-seq-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-famous-seq-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-famous-seq-quiz' && (
                    <Grade5FamousSequencesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-famous-seq-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-famous-seq-matcher' && (
                    <Grade5FamousSequencesMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-famous-seq-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-famous-seq-sorter' && (
                    <Grade5FamousSequencesSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-famous-seq-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-summary-theory' && (
                    <Grade5LocationSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-loc-summary-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-loc-summary-quiz')}
                    />
                  )}

                  {activityType === 'g5-loc-summary-quiz' && (
                    <Grade5LocationSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-summary-matcher' && (
                    <Grade5LocationSummaryMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-loc-summary-sorter' && (
                    <Grade5LocationSummarySorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-loc-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-mass-theory' && (
                    <Grade5MassMeasurementTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-mass-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-mass-quiz')}
                    />
                  )}

                  {activityType === 'g5-mass-quiz' && (
                    <Grade5MassMeasurementQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-mass-theory')}
                    />
                  )}

                  {activityType === 'g5-mass-matcher' && (
                    <Grade5MassMeasurementMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-mass-theory')}
                    />
                  )}

                  {activityType === 'g5-mass-sorter' && (
                    <Grade5MassMeasurementSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-mass-theory')}
                    />
                  )}

                  {activityType === 'g5-cap-theory' && (
                    <Grade5CapacityMeasurementTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-cap-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-cap-quiz')}
                    />
                  )}

                  {activityType === 'g5-cap-quiz' && (
                    <Grade5CapacityMeasurementQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-cap-theory')}
                    />
                  )}

                  {activityType === 'g5-cap-matcher' && (
                    <Grade5CapacityMeasurementMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-cap-theory')}
                    />
                  )}

                  {activityType === 'g5-cap-sorter' && (
                    <Grade5CapacityMeasurementSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-cap-theory')}
                    />
                  )}

                  {activityType === 'g5-time-theory' && (
                    <Grade5TimeMeasurementTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-time-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-time-quiz')}
                    />
                  )}

                  {activityType === 'g5-time-quiz' && (
                    <Grade5TimeMeasurementQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-time-theory')}
                    />
                  )}

                  {activityType === 'g5-time-matcher' && (
                    <Grade5TimeMeasurementMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-time-theory')}
                    />
                  )}

                  {activityType === 'g5-time-sorter' && (
                    <Grade5TimeMeasurementSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-time-theory')}
                    />
                  )}

                  {activityType === 'g5-conv-theory' && (
                    <Grade5UnitConversionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-conv-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-conv-quiz')}
                    />
                  )}

                  {activityType === 'g5-conv-quiz' && (
                    <Grade5UnitConversionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-conv-theory')}
                    />
                  )}

                  {activityType === 'g5-conv-matcher' && (
                    <Grade5UnitConversionsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-conv-theory')}
                    />
                  )}

                  {activityType === 'g5-conv-sorter' && (
                    <Grade5UnitConversionsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-conv-theory')}
                    />
                  )}

                  {activityType === 'g5-var-theory' && (
                    <Grade5VariableQuantitiesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-var-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-var-quiz')}
                    />
                  )}

                  {activityType === 'g5-var-quiz' && (
                    <Grade5VariableQuantitiesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-var-theory')}
                    />
                  )}

                  {activityType === 'g5-var-matcher' && (
                    <Grade5VariableQuantitiesMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-var-theory')}
                    />
                  )}

                  {activityType === 'g5-var-sorter' && (
                    <Grade5VariableQuantitiesSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-var-theory')}
                    />
                  )}

                  {activityType === 'g5-direct-theory' && (
                    <Grade5DirectProportionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-direct-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-direct-quiz')}
                    />
                  )}

                  {activityType === 'g5-direct-quiz' && (
                    <Grade5DirectProportionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-direct-theory')}
                    />
                  )}

                  {activityType === 'g5-direct-matcher' && (
                    <Grade5DirectProportionMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-direct-theory')}
                    />
                  )}

                  {activityType === 'g5-direct-sorter' && (
                    <Grade5DirectProportionSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-direct-theory')}
                    />
                  )}

                  {activityType === 'g5-open-theory' && (
                    <Grade5OpenSentencesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-open-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-open-quiz')}
                    />
                  )}

                  {activityType === 'g5-open-quiz' && (
                    <Grade5OpenSentencesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-open-theory')}
                    />
                  )}

                  {activityType === 'g5-open-matcher' && (
                    <Grade5OpenSentencesMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-open-theory')}
                    />
                  )}

                  {activityType === 'g5-open-sorter' && (
                    <Grade5OpenSentencesSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-open-theory')}
                    />
                  )}

                  {activityType === 'g5-sol-theory' && (
                    <Grade5FindSolutionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-sol-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-sol-quiz')}
                    />
                  )}

                  {activityType === 'g5-sol-quiz' && (
                    <Grade5FindSolutionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-sol-theory')}
                    />
                  )}

                  {activityType === 'g5-sol-matcher' && (
                    <Grade5FindSolutionsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-sol-theory')}
                    />
                  )}

                  {activityType === 'g5-sol-sorter' && (
                    <Grade5FindSolutionsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-sol-theory')}
                    />
                  )}

                  {activityType === 'g5-simp-wp-theory' && (
                    <Grade5SimpleWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-simp-wp-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-simp-wp-quiz')}
                    />
                  )}

                  {activityType === 'g5-simp-wp-quiz' && (
                    <Grade5SimpleWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-simp-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-simp-wp-matcher' && (
                    <Grade5SimpleWordProblemsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-simp-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-simp-wp-sorter' && (
                    <Grade5SimpleWordProblemsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-simp-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-daily-wp-theory' && (
                    <Grade5EverydayWordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-daily-wp-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-daily-wp-quiz')}
                    />
                  )}

                  {activityType === 'g5-daily-wp-quiz' && (
                    <Grade5EverydayWordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-daily-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-daily-wp-matcher' && (
                    <Grade5EverydayWordProblemsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-daily-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-daily-wp-sorter' && (
                    <Grade5EverydayWordProblemsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-daily-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-summary-wp-theory' && (
                    <Grade5WordProblemsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-summary-wp-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-summary-wp-quiz')}
                    />
                  )}

                  {activityType === 'g5-summary-wp-quiz' && (
                    <Grade5WordProblemsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-summary-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-summary-wp-matcher' && (
                    <Grade5WordProblemsSummaryMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-summary-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-summary-wp-sorter' && (
                    <Grade5WordProblemsSummarySorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-summary-wp-theory')}
                    />
                  )}

                  {activityType === 'g5-games-theory' && (
                    <Grade5LogicGamesTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-games-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-games-quiz')}
                    />
                  )}

                  {activityType === 'g5-games-quiz' && (
                    <Grade5LogicGamesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-games-theory')}
                    />
                  )}

                  {activityType === 'g5-games-matcher' && (
                    <Grade5LogicGamesMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-games-theory')}
                    />
                  )}

                  {activityType === 'g5-games-sorter' && (
                    <Grade5LogicGamesSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-games-theory')}
                    />
                  )}

                  {activityType === 'g5-tables-theory' && (
                    <Grade5TablesGraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-tables-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-tables-quiz')}
                    />
                  )}

                  {activityType === 'g5-tables-quiz' && (
                    <Grade5TablesGraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-tables-theory')}
                    />
                  )}

                  {activityType === 'g5-tables-matcher' && (
                    <Grade5TablesGraphsMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-tables-theory')}
                    />
                  )}

                  {activityType === 'g5-tables-sorter' && (
                    <Grade5TablesGraphsSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-tables-theory')}
                    />
                  )}

                  {activityType === 'g5-data-theory' && (
                    <Grade5DataCollectionTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-data-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-data-quiz')}
                    />
                  )}

                  {activityType === 'g5-data-quiz' && (
                    <Grade5DataCollectionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-data-theory')}
                    />
                  )}

                  {activityType === 'g5-data-matcher' && (
                    <Grade5DataCollectionMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-data-theory')}
                    />
                  )}

                  {activityType === 'g5-data-sorter' && (
                    <Grade5DataCollectionSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-data-theory')}
                    />
                  )}

                  {activityType === 'g5-average-theory' && (
                    <Grade5AverageTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-average-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-average-quiz')}
                    />
                  )}

                  {activityType === 'g5-average-quiz' && (
                    <Grade5AverageQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-average-theory')}
                    />
                  )}

                  {activityType === 'g5-average-matcher' && (
                    <Grade5AverageMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-average-theory')}
                    />
                  )}

                  {activityType === 'g5-average-sorter' && (
                    <Grade5AverageSorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-average-theory')}
                    />
                  )}

                  {activityType === 'g5-prob-theory' && (
                    <Grade5ProbabilityTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-prob-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-prob-quiz')}
                    />
                  )}

                  {activityType === 'g5-prob-quiz' && (
                    <Grade5ProbabilityQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-prob-theory')}
                    />
                  )}

                  {activityType === 'g5-prob-matcher' && (
                    <Grade5ProbabilityMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-prob-theory')}
                    />
                  )}

                  {activityType === 'g5-prob-sorter' && (
                    <Grade5ProbabilitySorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-prob-theory')}
                    />
                  )}

                  {activityType === 'g5-stats-summary-theory' && (
                    <Grade5StatsSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-stats-summary-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-stats-summary-quiz')}
                    />
                  )}

                  {activityType === 'g5-stats-summary-quiz' && (
                    <Grade5StatsSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-stats-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-stats-summary-matcher' && (
                    <Grade5StatsSummaryMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-stats-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-stats-summary-sorter' && (
                    <Grade5StatsSummarySorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-stats-summary-theory')}
                    />
                  )}

                  {activityType === 'g5-summary-numbers-theory' && (
                    <Grade5NumbersSummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => setActivityType('g5-summary-numbers-quiz')}
                      onSwitchToQuiz={() => setActivityType('g5-summary-numbers-quiz')}
                    />
                  )}

                  {activityType === 'g5-summary-numbers-quiz' && (
                    <Grade5NumbersSummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-summary-numbers-theory')}
                    />
                  )}

                  {activityType === 'g5-summary-numbers-matcher' && (
                    <Grade5NumbersSummaryMatcher
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-summary-numbers-theory')}
                    />
                  )}

                  {activityType === 'g5-summary-numbers-sorter' && (
                    <Grade5NumbersSummarySorter
                      onBack={handleBack}
                      onSwitchToTheory={() => setActivityType('g5-summary-numbers-theory')}
                    />
                  )}

                  {activityType === 'g5-fraction-to-decimal-matcher' && (
                    <Grade5FractionToDecimalMatcher onBack={handleBack} />
                  )}
    </>
  );
};
