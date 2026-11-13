import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const Grade10AlgebraicMethodsQuiz = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/egyenletrendszerek-megoldasa-algebrai-modszerekkel/AlgebraicMethodsQuiz").then(m => ({ default: m.AlgebraicMethodsQuiz })))
const Grade10AlgebraicMethodsTheory = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/egyenletrendszerek-megoldasa-algebrai-modszerekkel/AlgebraicMethodsTheory").then(m => ({ default: m.AlgebraicMethodsTheory })))
const Grade10ApplyFormulaQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/alkalmazzuk-a-megoldokepletet/ApplyFormulaQuiz").then(m => ({ default: m.ApplyFormulaQuiz })))
const Grade10ApplyFormulaTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/alkalmazzuk-a-megoldokepletet/ApplyFormulaTheory").then(m => ({ default: m.ApplyFormulaTheory })))
const Grade10CompletingSquareAppQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/teljes-negyzette-kiegeszites-alkalmazasa/CompletingSquareAppQuiz").then(m => ({ default: m.CompletingSquareAppQuiz })))
const Grade10CompletingSquareAppTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/teljes-negyzette-kiegeszites-alkalmazasa/CompletingSquareAppTheory").then(m => ({ default: m.CompletingSquareAppTheory })))
const Grade10CompletingSquareQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/teljes-negyzette-kiegeszites/CompletingSquareQuiz").then(m => ({ default: m.CompletingSquareQuiz })))
const Grade10CompletingSquareTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/teljes-negyzette-kiegeszites/CompletingSquareTheory").then(m => ({ default: m.CompletingSquareTheory })))
const Grade10CompositeEquationsQuiz = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/egyenletrendszerek/CompositeEquationsQuiz").then(m => ({ default: m.CompositeEquationsQuiz })))
const Grade10CompositeEquationsTheory = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/egyenletrendszerek/CompositeEquationsTheory").then(m => ({ default: m.CompositeEquationsTheory })))
const Grade10CompositeTransformQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/osszetett-fuggvenytranszformaciok/CompositeTransformQuiz").then(m => ({ default: m.CompositeTransformQuiz })))
const Grade10CompositeTransformTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/osszetett-fuggvenytranszformaciok/CompositeTransformTheory").then(m => ({ default: m.CompositeTransformTheory })))
const Grade10ComprehensiveReviewQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/gyakorlas-tudasproba/ComprehensiveReviewQuiz").then(m => ({ default: m.ComprehensiveReviewQuiz })))
const Grade10ComprehensiveReviewTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/gyakorlas-tudasproba/ComprehensiveReviewTheory").then(m => ({ default: m.ComprehensiveReviewTheory })))
const Grade10ConcreteFunctionsQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/fuggvenyek-egy-egy-konkret-problemahoz/ConcreteFunctionsQuiz").then(m => ({ default: m.ConcreteFunctionsQuiz })))
const Grade10ConcreteFunctionsTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/fuggvenyek-egy-egy-konkret-problemahoz/ConcreteFunctionsTheory").then(m => ({ default: m.ConcreteFunctionsTheory })))
const Grade10DiscriminantQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/diszkriminans/DiscriminantQuiz").then(m => ({ default: m.DiscriminantQuiz })))
const Grade10DiscriminantTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/diszkriminans/DiscriminantTheory").then(m => ({ default: m.DiscriminantTheory })))
const Grade10EqPracticeQuiz = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/gyakorlas/PracticeQuiz").then(m => ({ default: m.PracticeQuiz })))
const Grade10EqPracticeTheory = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/gyakorlas/PracticeTheory").then(m => ({ default: m.PracticeTheory })))
const Grade10ExamQuiz = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/gyakorlas-tudasproba/ExamQuiz").then(m => ({ default: m.ExamQuiz })))
const Grade10ExamTheory = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/gyakorlas-tudasproba/ExamTheory").then(m => ({ default: m.ExamTheory })))
const Grade10FinancialProblemsQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/penzugyekkel-kapcsolatos-szoveges-feladatok/FinancialProblemsQuiz").then(m => ({ default: m.FinancialProblemsQuiz })))
const Grade10FinancialProblemsTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/penzugyekkel-kapcsolatos-szoveges-feladatok/FinancialProblemsTheory").then(m => ({ default: m.FinancialProblemsTheory })))
const Grade10GeometryProblemsQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/szoveges-feladatok-geometriabol/GeometryProblemsQuiz").then(m => ({ default: m.GeometryProblemsQuiz })))
const Grade10GeometryProblemsTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/szoveges-feladatok-geometriabol/GeometryProblemsTheory").then(m => ({ default: m.GeometryProblemsTheory })))
const Grade10GraphicLinearQuiz = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/egyenletrendszerek-grafikus-megoldasa/GraphicLinearQuiz").then(m => ({ default: m.GraphicLinearQuiz })))
const Grade10GraphicLinearTheory = lazy(() => import("@/components/math/grade-10/egyenletrendszerek/egyenletrendszerek-grafikus-megoldasa/GraphicLinearTheory").then(m => ({ default: m.GraphicLinearTheory })))
const Grade10ImplicationMatcher = lazy(() => import("@/components/math/grade-10/logika/allitas-es-megforditasa/ImplicationMatcher").then(m => ({ default: m.ImplicationMatcher })))
const Grade10ImplicationQuiz = lazy(() => import("@/components/math/grade-10/logika/allitas-es-megforditasa/ImplicationQuiz").then(m => ({ default: m.ImplicationQuiz })))
const Grade10ImplicationSorter = lazy(() => import("@/components/math/grade-10/logika/allitas-es-megforditasa/ImplicationSorter").then(m => ({ default: m.ImplicationSorter })))
const Grade10ImplicationTheory = lazy(() => import("@/components/math/grade-10/logika/allitas-es-megforditasa/ImplicationTheory").then(m => ({ default: m.ImplicationTheory })))
const Grade10IntegerPowersQuiz = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/egesz-kitevoju-hatvanyok/IntegerPowersQuiz").then(m => ({ default: m.IntegerPowersQuiz })))
const Grade10IntegerPowersTheory = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/egesz-kitevoju-hatvanyok/IntegerPowersTheory").then(m => ({ default: m.IntegerPowersTheory })))
const Grade10LogicOperationsMatcher = lazy(() => import("@/components/math/grade-10/logika/vagy-es-muvelet/LogicOperationsMatcher").then(m => ({ default: m.LogicOperationsMatcher })))
const Grade10LogicOperationsQuiz = lazy(() => import("@/components/math/grade-10/logika/vagy-es-muvelet/LogicOperationsQuiz").then(m => ({ default: m.LogicOperationsQuiz })))
const Grade10LogicOperationsSorter = lazy(() => import("@/components/math/grade-10/logika/vagy-es-muvelet/LogicOperationsSorter").then(m => ({ default: m.LogicOperationsSorter })))
const Grade10LogicOperationsTheory = lazy(() => import("@/components/math/grade-10/logika/vagy-es-muvelet/LogicOperationsTheory").then(m => ({ default: m.LogicOperationsTheory })))
const Grade10MotionWorkQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/szoveges-feladatok-mozgasrol-es-munkavegzesrol/MotionWorkQuiz").then(m => ({ default: m.MotionWorkQuiz })))
const Grade10MotionWorkTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/szoveges-feladatok-mozgasrol-es-munkavegzesrol/MotionWorkTheory").then(m => ({ default: m.MotionWorkTheory })))
const Grade10NegationMatcher = lazy(() => import("@/components/math/grade-10/logika/allitas-es-tagadasa/NegationMatcher").then(m => ({ default: m.NegationMatcher })))
const Grade10NegationQuiz = lazy(() => import("@/components/math/grade-10/logika/allitas-es-tagadasa/NegationQuiz").then(m => ({ default: m.NegationQuiz })))
const Grade10NegationSorter = lazy(() => import("@/components/math/grade-10/logika/allitas-es-tagadasa/NegationSorter").then(m => ({ default: m.NegationSorter })))
const Grade10NegationTheory = lazy(() => import("@/components/math/grade-10/logika/allitas-es-tagadasa/NegationTheory").then(m => ({ default: m.NegationTheory })))
const Grade10ParabolaBasicsQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/parabolak-a-koordinata-rendszerben/ParabolaBasicsQuiz").then(m => ({ default: m.ParabolaBasicsQuiz })))
const Grade10ParabolaBasicsTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/parabolak-a-koordinata-rendszerben/ParabolaBasicsTheory").then(m => ({ default: m.ParabolaBasicsTheory })))
const Grade10PowerBasicsQuiz = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/a-hatvanyozas-ismetles/PowerBasicsQuiz").then(m => ({ default: m.PowerBasicsQuiz })))
const Grade10PowerBasicsTheory = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/a-hatvanyozas-ismetles/PowerBasicsTheory").then(m => ({ default: m.PowerBasicsTheory })))
const Grade10PowersPracticeQuiz = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/gyakorlas-hatvanyozas/PowersPracticeQuiz").then(m => ({ default: m.PowersPracticeQuiz })))
const Grade10PowersPracticeTheory = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/gyakorlas-hatvanyozas/PowersPracticeTheory").then(m => ({ default: m.PowersPracticeTheory })))
const Grade10PracticeApplicationQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/gyakorlas-alkalmazas/PracticeApplicationQuiz").then(m => ({ default: m.PracticeApplicationQuiz })))
const Grade10PracticeApplicationTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/gyakorlas-alkalmazas/PracticeApplicationTheory").then(m => ({ default: m.PracticeApplicationTheory })))
const Grade10PracticeExamMatcher = lazy(() => import("@/components/math/grade-10/logika/gyakorlas-tudasproba/PracticeExamMatcher").then(m => ({ default: m.PracticeExamMatcher })))
const Grade10PracticeExamQuiz = lazy(() => import("@/components/math/grade-10/logika/gyakorlas-tudasproba/PracticeExamQuiz").then(m => ({ default: m.PracticeExamQuiz })))
const Grade10PracticeExamSorter = lazy(() => import("@/components/math/grade-10/logika/gyakorlas-tudasproba/PracticeExamSorter").then(m => ({ default: m.PracticeExamSorter })))
const Grade10PracticeExamTheory = lazy(() => import("@/components/math/grade-10/logika/gyakorlas-tudasproba/PracticeExamTheory").then(m => ({ default: m.PracticeExamTheory })))
const Grade10PracticeTestQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/gyakorlas-tudasproba/PracticeTestQuiz").then(m => ({ default: m.PracticeTestQuiz })))
const Grade10PracticeTestTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/gyakorlas-tudasproba/PracticeTestTheory").then(m => ({ default: m.PracticeTestTheory })))
const Grade10QuadraticFormulaQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/a-masodfoku-egyenlet-megoldokeplete/QuadraticFormulaQuiz").then(m => ({ default: m.QuadraticFormulaQuiz })))
const Grade10QuadraticFormulaTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/a-masodfoku-egyenlet-megoldokeplete/QuadraticFormulaTheory").then(m => ({ default: m.QuadraticFormulaTheory })))
const Grade10QuadraticFunctionsQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/masodfoku-fuggvenyek/QuadraticFunctionsQuiz").then(m => ({ default: m.QuadraticFunctionsQuiz })))
const Grade10QuadraticFunctionsTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/masodfoku-fuggvenyek/QuadraticFunctionsTheory").then(m => ({ default: m.QuadraticFunctionsTheory })))
const Grade10QuadraticGraphQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/masodfoku-fuggvenyek-grafikonja/QuadraticGraphQuiz").then(m => ({ default: m.QuadraticGraphQuiz })))
const Grade10QuadraticGraphTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/masodfoku-fuggvenyek-grafikonja/QuadraticGraphTheory").then(m => ({ default: m.QuadraticGraphTheory })))
const Grade10ReducibleQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/masodfoku-egyenletre-visszavezetheto-feladatok/ReducibleQuiz").then(m => ({ default: m.ReducibleQuiz })))
const Grade10ReducibleTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/masodfoku-egyenletre-visszavezetheto-feladatok/ReducibleTheory").then(m => ({ default: m.ReducibleTheory })))
const Grade10RootIdentitiesQuiz = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/a-gyokvonas-azonossagai/RootIdentitiesQuiz").then(m => ({ default: m.RootIdentitiesQuiz })))
const Grade10RootIdentitiesTheory = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/a-gyokvonas-azonossagai/RootIdentitiesTheory").then(m => ({ default: m.RootIdentitiesTheory })))
const Grade10RootPracticeQuiz = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/gyakorlas-gyokvonas/RootPracticeQuiz").then(m => ({ default: m.RootPracticeQuiz })))
const Grade10RootPracticeTheory = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/gyakorlas-gyokvonas/RootPracticeTheory").then(m => ({ default: m.RootPracticeTheory })))
const Grade10ScientificNotationQuiz = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/szamok-normalalakja/ScientificNotationQuiz").then(m => ({ default: m.ScientificNotationQuiz })))
const Grade10ScientificNotationTheory = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/szamok-normalalakja/ScientificNotationTheory").then(m => ({ default: m.ScientificNotationTheory })))
const Grade10ShiftTransformQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/fel-le-jobbra-balra/ShiftTransformQuiz").then(m => ({ default: m.ShiftTransformQuiz })))
const Grade10ShiftTransformTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/fel-le-jobbra-balra/ShiftTransformTheory").then(m => ({ default: m.ShiftTransformTheory })))
const Grade10SquareRootTasksQuiz = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/negyzetgyokos-feladatok/SquareRootTasksQuiz").then(m => ({ default: m.SquareRootTasksQuiz })))
const Grade10SquareRootTasksTheory = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/negyzetgyokos-feladatok/SquareRootTasksTheory").then(m => ({ default: m.SquareRootTasksTheory })))
const Grade10StretchTransformQuiz = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/sovanyabb-koverebb/StretchTransformQuiz").then(m => ({ default: m.StretchTransformQuiz })))
const Grade10StretchTransformTheory = lazy(() => import("@/components/math/grade-10/fuggvenytranszformaciok/sovanyabb-koverebb/StretchTransformTheory").then(m => ({ default: m.StretchTransformTheory })))
const Grade10SummaryQuiz = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/gyakorlas-tudasproba/SummaryQuiz").then(m => ({ default: m.SummaryQuiz })))
const Grade10SummaryTheory = lazy(() => import("@/components/math/grade-10/hatvanyozas-es-negyzetgyok/gyakorlas-tudasproba/SummaryTheory").then(m => ({ default: m.SummaryTheory })))
const Grade10TrueOrFalseMatcher = lazy(() => import("@/components/math/grade-10/logika/igaz-vagy-hamis/TrueOrFalseMatcher").then(m => ({ default: m.TrueOrFalseMatcher })))
const Grade10TrueOrFalseQuiz = lazy(() => import("@/components/math/grade-10/logika/igaz-vagy-hamis/TrueOrFalseQuiz").then(m => ({ default: m.TrueOrFalseQuiz })))
const Grade10TrueOrFalseSorter = lazy(() => import("@/components/math/grade-10/logika/igaz-vagy-hamis/TrueOrFalseSorter").then(m => ({ default: m.TrueOrFalseSorter })))
const Grade10TrueOrFalseTheory = lazy(() => import("@/components/math/grade-10/logika/igaz-vagy-hamis/TrueOrFalseTheory").then(m => ({ default: m.TrueOrFalseTheory })))
const Grade10TruthTableMatcher = lazy(() => import("@/components/math/grade-10/logika/tablazatba-foglalva/TruthTableMatcher").then(m => ({ default: m.TruthTableMatcher })))
const Grade10TruthTableQuiz = lazy(() => import("@/components/math/grade-10/logika/tablazatba-foglalva/TruthTableQuiz").then(m => ({ default: m.TruthTableQuiz })))
const Grade10TruthTableSorter = lazy(() => import("@/components/math/grade-10/logika/tablazatba-foglalva/TruthTableSorter").then(m => ({ default: m.TruthTableSorter })))
const Grade10TruthTableTheory = lazy(() => import("@/components/math/grade-10/logika/tablazatba-foglalva/TruthTableTheory").then(m => ({ default: m.TruthTableTheory })))
const Grade10WordProblemsQuiz = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz })))
const Grade10WordProblemsTheory = lazy(() => import("@/components/math/grade-10/masodfoku-egyenletek/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory })))


// 10. Osztály - VI. Egybevágóság és kör (Grade 10 Topic VI)
const Grade10TriangleCongruenceTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/haromszogek-egybevagosaganak-alapesetei/TriangleCongruenceTheory").then(m => ({ default: m.TriangleCongruenceTheory })))
const Grade10TriangleCongruenceQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/haromszogek-egybevagosaganak-alapesetei/TriangleCongruenceQuiz").then(m => ({ default: m.TriangleCongruenceQuiz })))

const Grade10CongruentTrianglesTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/egybevago-haromszogek/CongruentTrianglesTheory").then(m => ({ default: m.CongruentTrianglesTheory })))
const Grade10CongruentTrianglesQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/egybevago-haromszogek/CongruentTrianglesQuiz").then(m => ({ default: m.CongruentTrianglesQuiz })))

const Grade10CircleCircumferenceAreaTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/a-kor-kerulete-es-terulete/CircleCircumferenceAreaTheory").then(m => ({ default: m.CircleCircumferenceAreaTheory })))
const Grade10CircleCircumferenceAreaQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/a-kor-kerulete-es-terulete/CircleCircumferenceAreaQuiz").then(m => ({ default: m.CircleCircumferenceAreaQuiz })))

const Grade10CentralAngleArcSectorTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/kozepponti-szog-koriv-korcikk/CentralAngleArcSectorTheory").then(m => ({ default: m.CentralAngleArcSectorTheory })))
const Grade10CentralAngleArcSectorQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/kozepponti-szog-koriv-korcikk/CentralAngleArcSectorQuiz").then(m => ({ default: m.CentralAngleArcSectorQuiz })))

const Grade10CirclePracticeTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/gyakorlas-kor-alapok/CirclePracticeTheory").then(m => ({ default: m.CirclePracticeTheory })))
const Grade10CirclePracticeQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/gyakorlas-kor-alapok/CirclePracticeQuiz").then(m => ({ default: m.CirclePracticeQuiz })))

const Grade10EverydayArcsSectorsTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/korivek-korcikkek-a-mindennapokban/EverydayArcsSectorsTheory").then(m => ({ default: m.EverydayArcsSectorsTheory })))
const Grade10EverydayArcsSectorsQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/korivek-korcikkek-a-mindennapokban/EverydayArcsSectorsQuiz").then(m => ({ default: m.EverydayArcsSectorsQuiz })))

const Grade10PolygonsAndCirclesTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/sokszogek-es-korok/PolygonsAndCirclesTheory").then(m => ({ default: m.PolygonsAndCirclesTheory })))
const Grade10PolygonsAndCirclesQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/sokszogek-es-korok/PolygonsAndCirclesQuiz").then(m => ({ default: m.PolygonsAndCirclesQuiz })))

const Grade10PolygonCirclePracticeTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/gyakorlas-sokszogek-korok/PolygonCirclePracticeTheory").then(m => ({ default: m.PolygonCirclePracticeTheory })))
const Grade10PolygonCirclePracticeQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/gyakorlas-sokszogek-korok/PolygonCirclePracticeQuiz").then(m => ({ default: m.PolygonCirclePracticeQuiz })))

const Grade10GeometryReviewTheory = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/ismetles/GeometryReviewTheory").then(m => ({ default: m.GeometryReviewTheory })))
const Grade10GeometryReviewQuiz = lazy(() => import("@/components/math/grade-10/egybevagosag-es-kor/ismetles/GeometryReviewQuiz").then(m => ({ default: m.GeometryReviewQuiz })))

// 10. Osztály - VII. Statisztika és valószínűségszámítás (Grade 10 Topic VII)
const Grade10AverageArithmeticTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/atlag-szamtani-kozep/AverageArithmeticTheory").then(m => ({ default: m.AverageArithmeticTheory })))
const Grade10AverageArithmeticQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/atlag-szamtani-kozep/AverageArithmeticQuiz").then(m => ({ default: m.AverageArithmeticQuiz })))

const Grade10ArithmeticGeometricTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/szamtani-kozep-mertani-kozep/ArithmeticGeometricTheory").then(m => ({ default: m.ArithmeticGeometricTheory })))
const Grade10ArithmeticGeometricQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/szamtani-kozep-mertani-kozep/ArithmeticGeometricQuiz").then(m => ({ default: m.ArithmeticGeometricQuiz })))

const Grade10ChangesTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/valtozasok/ChangesTheory").then(m => ({ default: m.ChangesTheory })))
const Grade10ChangesQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/valtozasok/ChangesQuiz").then(m => ({ default: m.ChangesQuiz })))

const Grade10SummaryStatsTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/szamsokasagok-statisztikai-jellemzoi/SummaryStatsTheory").then(m => ({ default: m.SummaryStatsTheory })))
const Grade10SummaryStatsQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/szamsokasagok-statisztikai-jellemzoi/SummaryStatsQuiz").then(m => ({ default: m.SummaryStatsQuiz })))

const Grade10ClassIntervalTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/osztalyba-sorolas-atlagok-atlaga/ClassIntervalTheory").then(m => ({ default: m.ClassIntervalTheory })))
const Grade10ClassIntervalQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/osztalyba-sorolas-atlagok-atlaga/ClassIntervalQuiz").then(m => ({ default: m.ClassIntervalQuiz })))

const Grade10RandomFrequencyTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/veletlen-relativ-gyakorisag/RandomFrequencyTheory").then(m => ({ default: m.RandomFrequencyTheory })))
const Grade10RandomFrequencyQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/veletlen-relativ-gyakorisag/RandomFrequencyQuiz").then(m => ({ default: m.RandomFrequencyQuiz })))

const Grade10ClassicalProbTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/megismerheto-veletlen/ClassicalProbTheory").then(m => ({ default: m.ClassicalProbTheory })))
const Grade10ClassicalProbQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/megismerheto-veletlen/ClassicalProbQuiz").then(m => ({ default: m.ClassicalProbQuiz })))

const Grade10EventCertaintyTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/biztos-lehetetlen-veletlen/EventCertaintyTheory").then(m => ({ default: m.EventCertaintyTheory })))
const Grade10EventCertaintyQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/biztos-lehetetlen-veletlen/EventCertaintyQuiz").then(m => ({ default: m.EventCertaintyQuiz })))

const Grade10PracticalProbTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/valoszinuseg-a-gyakorlatban/PracticalProbTheory").then(m => ({ default: m.PracticalProbTheory })))
const Grade10PracticalProbQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/valoszinuseg-a-gyakorlatban/PracticalProbQuiz").then(m => ({ default: m.PracticalProbQuiz })))

const Grade10ChapterSynthesisTheory = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/gyakorlas-tudasproba/ChapterSynthesisTheory").then(m => ({ default: m.ChapterSynthesisTheory })))
const Grade10ChapterSynthesisQuiz = lazy(() => import("@/components/math/grade-10/statisztika-es-valoszinusegszamitas/gyakorlas-tudasproba/ChapterSynthesisQuiz").then(m => ({ default: m.ChapterSynthesisQuiz })))

// 10. Osztály - VIII. Egyenletek és egyenlőtlenségek (Grade 10 Topic VIII)
const Grade10EquivalentEquationsTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/ekvivalens-egyenletek/EquivalentEquationsTheory").then(m => ({ default: m.EquivalentEquationsTheory })))
const Grade10EquivalentEquationsQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/ekvivalens-egyenletek/EquivalentEquationsQuiz").then(m => ({ default: m.EquivalentEquationsQuiz })))
const Grade10RadicalEquationsTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyokos-egyenletek/RadicalEquationsTheory").then(m => ({ default: m.RadicalEquationsTheory })))
const Grade10RadicalEquationsQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyokos-egyenletek/RadicalEquationsQuiz").then(m => ({ default: m.RadicalEquationsQuiz })))
const Grade10LabDevelopmentTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/laboratoriumi-fejlesztesek/LabDevelopmentTheory").then(m => ({ default: m.LabDevelopmentTheory })))
const Grade10LabDevelopmentQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/laboratoriumi-fejlesztesek/LabDevelopmentQuiz").then(m => ({ default: m.LabDevelopmentQuiz })))
const Grade10QuadraticInequalitiesTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenlotlensegek/QuadraticInequalitiesTheory").then(m => ({ default: m.QuadraticInequalitiesTheory })))
const Grade10QuadraticInequalitiesQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenlotlensegek/QuadraticInequalitiesQuiz").then(m => ({ default: m.QuadraticInequalitiesQuiz })))
const Grade10InequalitiesPracticeTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-egyenlotlensegek/InequalitiesPracticeTheory").then(m => ({ default: m.InequalitiesPracticeTheory })))
const Grade10InequalitiesPracticeQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-egyenlotlensegek/InequalitiesPracticeQuiz").then(m => ({ default: m.InequalitiesPracticeQuiz })))
const Grade10RootFactorizationTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/polinom-gyoktenyezos-alakja/RootFactorizationTheory").then(m => ({ default: m.RootFactorizationTheory })))
const Grade10RootFactorizationQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/polinom-gyoktenyezos-alakja/RootFactorizationQuiz").then(m => ({ default: m.RootFactorizationQuiz })))
const Grade10VieteFormulasTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/viete-formulak/VieteFormulasTheory").then(m => ({ default: m.VieteFormulasTheory })))
const Grade10VieteFormulasQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/viete-formulak/VieteFormulasQuiz").then(m => ({ default: m.VieteFormulasQuiz })))
const Grade10GroupCompetitionTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/csoportverseny/GroupCompetitionTheory").then(m => ({ default: m.GroupCompetitionTheory })))
const Grade10GroupCompetitionQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/csoportverseny/GroupCompetitionQuiz").then(m => ({ default: m.GroupCompetitionQuiz })))
const Grade10QuadraticSystemsTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenletrendszerek/QuadraticSystemsTheory").then(m => ({ default: m.QuadraticSystemsTheory })))
const Grade10QuadraticSystemsQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenletrendszerek/QuadraticSystemsQuiz").then(m => ({ default: m.QuadraticSystemsQuiz })))
const Grade10Topic8PracticeExamTheory = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-tudasproba/PracticeExamTheory").then(m => ({ default: m.PracticeExamTheory })))
const Grade10Topic8PracticeExamQuiz = lazy(() => import("@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-tudasproba/PracticeExamQuiz").then(m => ({ default: m.PracticeExamQuiz })))

export const Grade10Activities: React.FC<ActivityRouterProps> = ({
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
                  {activityType === 'g10-logic-igaz-hamis-theory' && (
                    <Grade10TrueOrFalseTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-logic-igaz-hamis-quiz', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-igaz-hamis-quiz' && (
                    <Grade10TrueOrFalseQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-igaz-hamis-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-igaz-hamis-matcher', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-igaz-hamis-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-igaz-hamis-matcher' && (
                    <Grade10TrueOrFalseMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-igaz-hamis-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-igaz-hamis-theory', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-igaz-hamis-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-igaz-hamis-sorter' && (
                    <Grade10TrueOrFalseSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-igaz-hamis-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-igaz-hamis-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-igaz-hamis-matcher', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {/* 10. Osztály - I. Logika - 2. Állítás és tagadása */}

                  {activityType === 'g10-logic-allitas-tagadas-theory' && (
                    <Grade10NegationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-logic-allitas-tagadas-quiz', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-allitas-tagadas-quiz' && (
                    <Grade10NegationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-allitas-tagadas-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-allitas-tagadas-matcher', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-allitas-tagadas-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-allitas-tagadas-matcher' && (
                    <Grade10NegationMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-allitas-tagadas-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-allitas-tagadas-theory', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-allitas-tagadas-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-allitas-tagadas-sorter' && (
                    <Grade10NegationSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-allitas-tagadas-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-allitas-tagadas-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-allitas-tagadas-matcher', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {/* 10. Osztály - I. Logika - 3. VAGY művelet, ÉS művelet */}

                  {activityType === 'g10-logic-vagy-es-theory' && (
                    <Grade10LogicOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-logic-vagy-es-quiz', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-vagy-es-quiz' && (
                    <Grade10LogicOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-vagy-es-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-vagy-es-matcher', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-vagy-es-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-vagy-es-matcher' && (
                    <Grade10LogicOperationsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-vagy-es-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-vagy-es-theory', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-vagy-es-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-vagy-es-sorter' && (
                    <Grade10LogicOperationsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-vagy-es-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-vagy-es-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-vagy-es-matcher', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {/* 10. Osztály - I. Logika - 4. Igaz vagy hamis? Foglaljuk táblázatba! */}

                  {activityType === 'g10-logic-tablazat-theory' && (
                    <Grade10TruthTableTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-logic-tablazat-quiz', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-tablazat-quiz' && (
                    <Grade10TruthTableQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-tablazat-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-tablazat-matcher', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-tablazat-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-tablazat-matcher' && (
                    <Grade10TruthTableMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-tablazat-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-tablazat-theory', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-tablazat-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-tablazat-sorter' && (
                    <Grade10TruthTableSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-tablazat-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-tablazat-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-tablazat-matcher', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {/* 10. Osztály - I. Logika - 5. Állítás és megfordítása */}

                  {activityType === 'g10-logic-allitas-megforditas-theory' && (
                    <Grade10ImplicationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-logic-allitas-megforditas-quiz', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-allitas-megforditas-quiz' && (
                    <Grade10ImplicationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-allitas-megforditas-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-allitas-megforditas-matcher', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-allitas-megforditas-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-allitas-megforditas-matcher' && (
                    <Grade10ImplicationMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-allitas-megforditas-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-allitas-megforditas-theory', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-allitas-megforditas-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-allitas-megforditas-sorter' && (
                    <Grade10ImplicationSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-allitas-megforditas-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-allitas-megforditas-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-allitas-megforditas-matcher', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {/* 10. Osztály - I. Logika - 6. Gyakorlás, tudáspróba */}

                  {activityType === 'g10-logic-tudasproba-theory' && (
                    <Grade10PracticeExamTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-logic-tudasproba-quiz', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-tudasproba-quiz' && (
                    <Grade10PracticeExamQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-tudasproba-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-tudasproba-matcher', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-tudasproba-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-tudasproba-matcher' && (
                    <Grade10PracticeExamMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-tudasproba-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-tudasproba-theory', selectedTopic || 'g10-logika')}
                      onSwitchToSorter={() => handleActivitySelect('g10-logic-tudasproba-sorter', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {activityType === 'g10-logic-tudasproba-sorter' && (
                    <Grade10PracticeExamSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g10-logic-tudasproba-quiz', selectedTopic || 'g10-logika')}
                      onSwitchToTheory={() => handleActivitySelect('g10-logic-tudasproba-theory', selectedTopic || 'g10-logika')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-logic-tudasproba-matcher', selectedTopic || 'g10-logika')}
                    />
                  )}

                  {/* 10. Osztály - II. Egyenletrendszerek - 1. Grafikus megoldás */}

                  {activityType === 'g10-eq-graphic-theory' && (
                    <Grade10GraphicLinearTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-graphic-quiz', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-graphic-quiz' && (
                    <Grade10GraphicLinearQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-graphic-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-graphic-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-graphic-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-graphic-matcher' && (
                    <Grade10GraphicLinearQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-graphic-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-graphic-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-graphic-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-graphic-sorter' && (
                    <Grade10GraphicLinearQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-graphic-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-graphic-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-graphic-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {/* 10. Osztály - II. Egyenletrendszerek - 2. Algebrai megoldás */}

                  {activityType === 'g10-eq-algebraic-theory' && (
                    <Grade10AlgebraicMethodsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-algebraic-quiz', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-algebraic-quiz' && (
                    <Grade10AlgebraicMethodsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-algebraic-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-algebraic-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-algebraic-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-algebraic-matcher' && (
                    <Grade10AlgebraicMethodsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-algebraic-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-algebraic-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-algebraic-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-algebraic-sorter' && (
                    <Grade10AlgebraicMethodsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-algebraic-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-algebraic-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-algebraic-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {/* 10. Osztály - II. Egyenletrendszerek - 3. Összetett és szöveges rendszerek */}

                  {activityType === 'g10-eq-composite-theory' && (
                    <Grade10CompositeEquationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-composite-quiz', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-composite-quiz' && (
                    <Grade10CompositeEquationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-composite-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-composite-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-composite-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-composite-matcher' && (
                    <Grade10CompositeEquationsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-composite-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-composite-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-composite-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-composite-sorter' && (
                    <Grade10CompositeEquationsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-composite-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-composite-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-composite-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {/* Grade 10 - Topic II: Egyenletrendszerek - 4. Gyakorlás */}

                  {activityType === 'g10-eq-practice-theory' && (
                    <Grade10EqPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-practice-quiz', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-practice-quiz' && (
                    <Grade10EqPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-practice-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-practice-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-practice-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-practice-matcher' && (
                    <Grade10EqPracticeQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-practice-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-practice-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-practice-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-practice-sorter' && (
                    <Grade10EqPracticeQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-practice-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-practice-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-practice-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {/* Grade 10 - Topic II: Egyenletrendszerek - 5. Gyakorlás, tudáspróba */}

                  {activityType === 'g10-eq-exam-theory' && (
                    <Grade10ExamTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-exam-quiz', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-exam-quiz' && (
                    <Grade10ExamQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-exam-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-exam-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-exam-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-exam-matcher' && (
                    <Grade10ExamQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-exam-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-exam-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-exam-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {activityType === 'g10-eq-exam-sorter' && (
                    <Grade10ExamQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-exam-theory', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-exam-matcher', selectedTopic || 'g10-egyenletrendszerek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-exam-sorter', selectedTopic || 'g10-egyenletrendszerek')}
                    />
                  )}

                  {/* Grade 10 - Topic III: Hatványozás és a négyzetgyök - 1. A hatványozás (ismétlés) */}

                  {activityType === 'g10-pow-basics-theory' && (
                    <Grade10PowerBasicsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-pow-basics-quiz', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-pow-basics-quiz' && (
                    <Grade10PowerBasicsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-pow-basics-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-pow-basics-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-pow-basics-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-pow-basics-matcher' && (
                    <Grade10PowerBasicsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-pow-basics-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-pow-basics-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-pow-basics-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-pow-basics-sorter' && (
                    <Grade10PowerBasicsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-pow-basics-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-pow-basics-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-pow-basics-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {/* Grade 10 - Topic III: Hatványozás és a négyzetgyök - 2. Egész kitevőjű hatványok */}

                  {activityType === 'g10-int-powers-theory' && (
                    <Grade10IntegerPowersTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-int-powers-quiz', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-int-powers-quiz' && (
                    <Grade10IntegerPowersQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-int-powers-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-int-powers-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-int-powers-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-int-powers-matcher' && (
                    <Grade10IntegerPowersQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-int-powers-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-int-powers-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-int-powers-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-int-powers-sorter' && (
                    <Grade10IntegerPowersQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-int-powers-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-int-powers-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-int-powers-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {/* Grade 10 - Topic III: Hatványozás és a négyzetgyök - 3. Hatványozás gyakorlása */}

                  {activityType === 'g10-powers-practice-theory' && (
                    <Grade10PowersPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-powers-practice-quiz', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-powers-practice-quiz' && (
                    <Grade10PowersPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-powers-practice-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-powers-practice-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-powers-practice-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-powers-practice-matcher' && (
                    <Grade10PowersPracticeQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-powers-practice-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-powers-practice-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-powers-practice-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-powers-practice-sorter' && (
                    <Grade10PowersPracticeQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-powers-practice-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-powers-practice-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-powers-practice-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {/* Grade 10 - Topic III: Hatványozás és a négyzetgyök - 4. Számok normálalakja */}

                  {(activityType === 'g10-scientific-notation-theory' || activityType === 'g10-sci-notation-theory') && (
                    <Grade10ScientificNotationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-scientific-notation-quiz', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {(activityType === 'g10-scientific-notation-quiz' || activityType === 'g10-sci-notation-quiz') && (
                    <Grade10ScientificNotationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-scientific-notation-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-scientific-notation-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-scientific-notation-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {(activityType === 'g10-scientific-notation-matcher' || activityType === 'g10-sci-notation-matcher') && (
                    <Grade10ScientificNotationQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-scientific-notation-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-scientific-notation-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-scientific-notation-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {(activityType === 'g10-scientific-notation-sorter' || activityType === 'g10-sci-notation-sorter') && (
                    <Grade10ScientificNotationQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-scientific-notation-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-scientific-notation-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-scientific-notation-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {/* Grade 10 - Topic III: Hatványozás és a négyzetgyök - 5. A gyökvonás azonosságai */}

                  {activityType === 'g10-root-identities-theory' && (
                    <Grade10RootIdentitiesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-root-identities-quiz', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-root-identities-quiz' && (
                    <Grade10RootIdentitiesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-root-identities-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-root-identities-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-root-identities-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-root-identities-matcher' && (
                    <Grade10RootIdentitiesQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-root-identities-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-root-identities-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-root-identities-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-root-identities-sorter' && (
                    <Grade10RootIdentitiesQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-root-identities-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-root-identities-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-root-identities-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {/* Grade 10 - Topic III: Hatványozás és a négyzetgyök - 6. Négyzetgyökös feladatok */}

                  {(activityType === 'g10-sqrt-tasks-theory' || activityType === 'g10-root-tasks-theory') && (
                    <Grade10SquareRootTasksTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-sqrt-tasks-quiz', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {(activityType === 'g10-sqrt-tasks-quiz' || activityType === 'g10-root-tasks-quiz') && (
                    <Grade10SquareRootTasksQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-sqrt-tasks-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-sqrt-tasks-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-sqrt-tasks-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {(activityType === 'g10-sqrt-tasks-matcher' || activityType === 'g10-root-tasks-matcher') && (
                    <Grade10SquareRootTasksQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-sqrt-tasks-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-sqrt-tasks-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-sqrt-tasks-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {(activityType === 'g10-sqrt-tasks-sorter' || activityType === 'g10-root-tasks-sorter') && (
                    <Grade10SquareRootTasksQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-sqrt-tasks-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-sqrt-tasks-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-sqrt-tasks-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {/* Grade 10 - Topic III: Hatványozás és a négyzetgyök - 7. Gyakorlás (gyökvonás) */}

                  {activityType === 'g10-root-practice-theory' && (
                    <Grade10RootPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-root-practice-quiz', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-root-practice-quiz' && (
                    <Grade10RootPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-root-practice-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-root-practice-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-root-practice-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-root-practice-matcher' && (
                    <Grade10RootPracticeQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-root-practice-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-root-practice-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-root-practice-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-root-practice-sorter' && (
                    <Grade10RootPracticeQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-root-practice-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-root-practice-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-root-practice-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {/* Grade 10 - Topic III: Hatványozás és a négyzetgyök - 8. Gyakorlás, tudáspróba */}

                  {activityType === 'g10-hatvany-tudasproba-theory' && (
                    <Grade10SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-hatvany-tudasproba-quiz', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-hatvany-tudasproba-quiz' && (
                    <Grade10SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-hatvany-tudasproba-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-hatvany-tudasproba-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-hatvany-tudasproba-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-hatvany-tudasproba-matcher' && (
                    <Grade10SummaryQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-hatvany-tudasproba-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-hatvany-tudasproba-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-hatvany-tudasproba-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {activityType === 'g10-hatvany-tudasproba-sorter' && (
                    <Grade10SummaryQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-hatvany-tudasproba-theory', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-hatvany-tudasproba-matcher', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-hatvany-tudasproba-sorter', selectedTopic || 'g10-hatvanyozas-negyzetgyok')}
                    />
                  )}

                  {/* Grade 10 - Topic IV: Függvénytranszformációk - 1. Függvények egy-egy konkrét problémához */}

                  {activityType === 'g10-transz-konkret-theory' && (
                    <Grade10ConcreteFunctionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-konkret-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-konkret-quiz' && (
                    <Grade10ConcreteFunctionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-konkret-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-konkret-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-konkret-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-konkret-matcher' && (
                    <Grade10ConcreteFunctionsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-konkret-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-konkret-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-konkret-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-konkret-sorter' && (
                    <Grade10ConcreteFunctionsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-konkret-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-konkret-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-konkret-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* Grade 10 - Topic IV: Függvénytranszformációk - 2. Parabolák a koordináta-rendszerben */}

                  {activityType === 'g10-transz-parabolak-theory' && (
                    <Grade10ParabolaBasicsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-parabolak-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-parabolak-quiz' && (
                    <Grade10ParabolaBasicsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-parabolak-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-parabolak-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-parabolak-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-parabolak-matcher' && (
                    <Grade10ParabolaBasicsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-parabolak-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-parabolak-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-parabolak-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-parabolak-sorter' && (
                    <Grade10ParabolaBasicsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-parabolak-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-parabolak-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-parabolak-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* Grade 10 - Topic IV: Függvénytranszformációk - 3. „Fel”-, „le”, „jobbra”-, „balra” */}

                  {activityType === 'g10-transz-fel-le-theory' && (
                    <Grade10ShiftTransformTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-fel-le-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-fel-le-quiz' && (
                    <Grade10ShiftTransformQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-fel-le-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-fel-le-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-fel-le-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-fel-le-matcher' && (
                    <Grade10ShiftTransformQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-fel-le-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-fel-le-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-fel-le-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-fel-le-sorter' && (
                    <Grade10ShiftTransformQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-fel-le-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-fel-le-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-fel-le-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* Grade 10 - Topic IV: Függvénytranszformációk - 4. „Soványabb”, „kövérebb” */}

                  {activityType === 'g10-transz-sovanyabb-theory' && (
                    <Grade10StretchTransformTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-sovanyabb-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-sovanyabb-quiz' && (
                    <Grade10StretchTransformQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-sovanyabb-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-sovanyabb-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-sovanyabb-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-sovanyabb-matcher' && (
                    <Grade10StretchTransformQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-sovanyabb-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-sovanyabb-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-sovanyabb-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-sovanyabb-sorter' && (
                    <Grade10StretchTransformQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-sovanyabb-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-sovanyabb-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-sovanyabb-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* 10. Osztály - IV. Függvénytranszformációk - 5. Összetett függvénytranszformációk */}

                  {activityType === 'g10-transz-osszetett-theory' && (
                    <Grade10CompositeTransformTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-osszetett-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-osszetett-quiz' && (
                    <Grade10CompositeTransformQuiz
                      initialGameMode="quiz"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-osszetett-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-osszetett-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-osszetett-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-osszetett-matcher' && (
                    <Grade10CompositeTransformQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-osszetett-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-osszetett-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-osszetett-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-osszetett-sorter' && (
                    <Grade10CompositeTransformQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-osszetett-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-osszetett-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-osszetett-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* 10. Osztály - IV. Függvénytranszformációk - 6. Másodfokú függvények */}

                  {activityType === 'g10-transz-masodfoku-theory' && (
                    <Grade10QuadraticFunctionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-masodfoku-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-masodfoku-quiz' && (
                    <Grade10QuadraticFunctionsQuiz
                      initialGameMode="quiz"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-masodfoku-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-masodfoku-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-masodfoku-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-masodfoku-matcher' && (
                    <Grade10QuadraticFunctionsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-masodfoku-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-masodfoku-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-masodfoku-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-masodfoku-sorter' && (
                    <Grade10QuadraticFunctionsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-masodfoku-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-masodfoku-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-masodfoku-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* 10. Osztály - IV. Függvénytranszformációk - 7. Másodfokú függvények grafikonja */}

                  {activityType === 'g10-transz-masodfoku-grafikon-theory' && (
                    <Grade10QuadraticGraphTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-masodfoku-grafikon-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-masodfoku-grafikon-quiz' && (
                    <Grade10QuadraticGraphQuiz
                      initialGameMode="quiz"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-masodfoku-grafikon-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-masodfoku-grafikon-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-masodfoku-grafikon-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-masodfoku-grafikon-matcher' && (
                    <Grade10QuadraticGraphQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-masodfoku-grafikon-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-masodfoku-grafikon-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-masodfoku-grafikon-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-masodfoku-grafikon-sorter' && (
                    <Grade10QuadraticGraphQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-masodfoku-grafikon-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-masodfoku-grafikon-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-masodfoku-grafikon-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* 10. Osztály - IV. Függvénytranszformációk - 8. Gyakorlás, alkalmazás */}

                  {activityType === 'g10-transz-alkalmazas-theory' && (
                    <Grade10PracticeApplicationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-alkalmazas-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-alkalmazas-quiz' && (
                    <Grade10PracticeApplicationQuiz
                      initialGameMode="quiz"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-alkalmazas-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-alkalmazas-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-alkalmazas-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-alkalmazas-matcher' && (
                    <Grade10PracticeApplicationQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-alkalmazas-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-alkalmazas-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-alkalmazas-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-alkalmazas-sorter' && (
                    <Grade10PracticeApplicationQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-alkalmazas-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-alkalmazas-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-alkalmazas-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* 10. Osztály - IV. Függvénytranszformációk - 9. Gyakorlás, tudáspróba */}

                  {activityType === 'g10-transz-tudasproba-theory' && (
                    <Grade10PracticeTestTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-transz-tudasproba-quiz', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-tudasproba-quiz' && (
                    <Grade10PracticeTestQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-tudasproba-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-tudasproba-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-tudasproba-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-tudasproba-matcher' && (
                    <Grade10PracticeTestQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-tudasproba-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-tudasproba-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-tudasproba-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {activityType === 'g10-transz-tudasproba-sorter' && (
                    <Grade10PracticeTestQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-transz-tudasproba-theory', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-transz-tudasproba-matcher', selectedTopic || 'g10-fuggvenytranszformaciok')}
                      onSwitchToSorter={() => handleActivitySelect('g10-transz-tudasproba-sorter', selectedTopic || 'g10-fuggvenytranszformaciok')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 1. Teljes négyzetté kiegészítés */}

                  {activityType === 'g10-quad-teljes-negyzet-theory' && (
                    <Grade10CompletingSquareTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-teljes-negyzet-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-teljes-negyzet-quiz' && (
                    <Grade10CompletingSquareQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-teljes-negyzet-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-teljes-negyzet-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-teljes-negyzet-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-teljes-negyzet-matcher' && (
                    <Grade10CompletingSquareQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-teljes-negyzet-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-teljes-negyzet-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-teljes-negyzet-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-teljes-negyzet-sorter' && (
                    <Grade10CompletingSquareQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-teljes-negyzet-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-teljes-negyzet-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-teljes-negyzet-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 2. Teljes négyzetté kiegészítés alkalmazása */}

                  {activityType === 'g10-quad-teljes-negyzet-alkalmazasa-theory' && (
                    <Grade10CompletingSquareAppTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-teljes-negyzet-alkalmazasa-quiz' && (
                    <Grade10CompletingSquareAppQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-teljes-negyzet-alkalmazasa-matcher' && (
                    <Grade10CompletingSquareAppQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-teljes-negyzet-alkalmazasa-sorter' && (
                    <Grade10CompletingSquareAppQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 3. A másodfokú egyenlet megoldóképlete */}

                  {activityType === 'g10-quad-megoldokeplet-theory' && (
                    <Grade10QuadraticFormulaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-megoldokeplet-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-megoldokeplet-quiz' && (
                    <Grade10QuadraticFormulaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-megoldokeplet-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-megoldokeplet-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-megoldokeplet-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-megoldokeplet-matcher' && (
                    <Grade10QuadraticFormulaQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-megoldokeplet-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-megoldokeplet-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-megoldokeplet-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-megoldokeplet-sorter' && (
                    <Grade10QuadraticFormulaQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-megoldokeplet-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-megoldokeplet-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-megoldokeplet-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 4. Alkalmazzuk a megoldóképletet! */}

                  {activityType === 'g10-quad-megoldokeplet-alkalmazasa-theory' && (
                    <Grade10ApplyFormulaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-megoldokeplet-alkalmazasa-quiz' && (
                    <Grade10ApplyFormulaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-megoldokeplet-alkalmazasa-matcher' && (
                    <Grade10ApplyFormulaQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-megoldokeplet-alkalmazasa-sorter' && (
                    <Grade10ApplyFormulaQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-megoldokeplet-alkalmazasa-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 5. Szöveges feladatok */}

                  {activityType === 'g10-quad-szoveges-alap-theory' && (
                    <Grade10WordProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-szoveges-alap-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-alap-quiz' && (
                    <Grade10WordProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-alap-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-alap-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-alap-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-alap-matcher' && (
                    <Grade10WordProblemsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-alap-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-alap-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-alap-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-alap-sorter' && (
                    <Grade10WordProblemsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-alap-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-alap-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-alap-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 6. Diszkrimináns */}

                  {activityType === 'g10-quad-diszkriminans-theory' && (
                    <Grade10DiscriminantTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-diszkriminans-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-diszkriminans-quiz' && (
                    <Grade10DiscriminantQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-diszkriminans-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-diszkriminans-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-diszkriminans-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-diszkriminans-matcher' && (
                    <Grade10DiscriminantQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-diszkriminans-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-diszkriminans-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-diszkriminans-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-diszkriminans-sorter' && (
                    <Grade10DiscriminantQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-diszkriminans-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-diszkriminans-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-diszkriminans-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 7. Szöveges feladatok geometriából */}

                  {activityType === 'g10-quad-szoveges-geometria-theory' && (
                    <Grade10GeometryProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-szoveges-geometria-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-geometria-quiz' && (
                    <Grade10GeometryProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-geometria-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-geometria-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-geometria-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-geometria-matcher' && (
                    <Grade10GeometryProblemsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-geometria-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-geometria-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-geometria-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-geometria-sorter' && (
                    <Grade10GeometryProblemsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-geometria-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-geometria-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-geometria-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 8. Másodfokú egyenletre visszavezethető feladatok */}

                  {activityType === 'g10-quad-visszavezetheto-theory' && (
                    <Grade10ReducibleTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-visszavezetheto-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-visszavezetheto-quiz' && (
                    <Grade10ReducibleQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-visszavezetheto-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-visszavezetheto-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-visszavezetheto-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-visszavezetheto-matcher' && (
                    <Grade10ReducibleQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-visszavezetheto-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-visszavezetheto-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-visszavezetheto-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-visszavezetheto-sorter' && (
                    <Grade10ReducibleQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-visszavezetheto-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-visszavezetheto-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-visszavezetheto-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 9. Pénzügyekkel kapcsolatos szöveges feladatok */}

                  {activityType === 'g10-quad-szoveges-penzugy-theory' && (
                    <Grade10FinancialProblemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-szoveges-penzugy-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-penzugy-quiz' && (
                    <Grade10FinancialProblemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-penzugy-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-penzugy-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-penzugy-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-penzugy-matcher' && (
                    <Grade10FinancialProblemsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-penzugy-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-penzugy-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-penzugy-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-penzugy-sorter' && (
                    <Grade10FinancialProblemsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-penzugy-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-penzugy-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-penzugy-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 10. Szöveges feladatok mozgásról és munkavégzésről */}

                  {activityType === 'g10-quad-szoveges-mozgas-munka-theory' && (
                    <Grade10MotionWorkTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-mozgas-munka-quiz' && (
                    <Grade10MotionWorkQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-mozgas-munka-matcher' && (
                    <Grade10MotionWorkQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-szoveges-mozgas-munka-sorter' && (
                    <Grade10MotionWorkQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-szoveges-mozgas-munka-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {/* 10. Osztály - V. Másodfokú egyenletek - 11. Gyakorlás, tudáspróba */}

                  {activityType === 'g10-quad-tudasproba-theory' && (
                    <Grade10ComprehensiveReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-quad-tudasproba-quiz', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-tudasproba-quiz' && (
                    <Grade10ComprehensiveReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-tudasproba-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-tudasproba-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-tudasproba-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-tudasproba-matcher' && (
                    <Grade10ComprehensiveReviewQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-tudasproba-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-tudasproba-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-tudasproba-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}

                  {activityType === 'g10-quad-tudasproba-sorter' && (
                    <Grade10ComprehensiveReviewQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-quad-tudasproba-theory', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-quad-tudasproba-matcher', selectedTopic || 'g10-masodfoku-egyenletek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-quad-tudasproba-sorter', selectedTopic || 'g10-masodfoku-egyenletek')}
                    />
                  )}
    
                  {/* ============================================================== */}
                  {/* 10. Osztály - VI. Egybevágóság és kör (Topic VI)               */}
                  {/* ============================================================== */}

                  {/* 1. Háromszögek egybevágóságának alapesetei */}
                  {activityType === 'g10-geo-haromszog-alapesetek-theory' && (
                    <Grade10TriangleCongruenceTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-haromszog-alapesetek-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-haromszog-alapesetek-quiz' && (
                    <Grade10TriangleCongruenceQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-haromszog-alapesetek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-haromszog-alapesetek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-haromszog-alapesetek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-haromszog-alapesetek-matcher' && (
                    <Grade10TriangleCongruenceQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-haromszog-alapesetek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-haromszog-alapesetek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-haromszog-alapesetek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-haromszog-alapesetek-sorter' && (
                    <Grade10TriangleCongruenceQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-haromszog-alapesetek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-haromszog-alapesetek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-haromszog-alapesetek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* 2. Egybevágó háromszögek */}
                  {activityType === 'g10-geo-egybevago-haromszogek-theory' && (
                    <Grade10CongruentTrianglesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-egybevago-haromszogek-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-egybevago-haromszogek-quiz' && (
                    <Grade10CongruentTrianglesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-egybevago-haromszogek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-egybevago-haromszogek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-egybevago-haromszogek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-egybevago-haromszogek-matcher' && (
                    <Grade10CongruentTrianglesQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-egybevago-haromszogek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-egybevago-haromszogek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-egybevago-haromszogek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-egybevago-haromszogek-sorter' && (
                    <Grade10CongruentTrianglesQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-egybevago-haromszogek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-egybevago-haromszogek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-egybevago-haromszogek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* 3. A kör kerülete és területe */}
                  {activityType === 'g10-geo-kor-kerulet-terulet-theory' && (
                    <Grade10CircleCircumferenceAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-kor-kerulet-terulet-quiz' && (
                    <Grade10CircleCircumferenceAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-kor-kerulet-terulet-matcher' && (
                    <Grade10CircleCircumferenceAreaQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-kor-kerulet-terulet-sorter' && (
                    <Grade10CircleCircumferenceAreaQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-kor-kerulet-terulet-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* 4. Középponti szög, körív, körcikk */}
                  {activityType === 'g10-geo-kozepponti-szog-iv-cikk-theory' && (
                    <Grade10CentralAngleArcSectorTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-kozepponti-szog-iv-cikk-quiz' && (
                    <Grade10CentralAngleArcSectorQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-kozepponti-szog-iv-cikk-matcher' && (
                    <Grade10CentralAngleArcSectorQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-kozepponti-szog-iv-cikk-sorter' && (
                    <Grade10CentralAngleArcSectorQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-kozepponti-szog-iv-cikk-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* 5. Körszámítások és összetett alakzatok */}
                  {activityType === 'g10-geo-gyakorlas-kor-theory' && (
                    <Grade10CirclePracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-gyakorlas-kor-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-gyakorlas-kor-quiz' && (
                    <Grade10CirclePracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-gyakorlas-kor-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-gyakorlas-kor-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-gyakorlas-kor-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-gyakorlas-kor-matcher' && (
                    <Grade10CirclePracticeQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-gyakorlas-kor-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-gyakorlas-kor-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-gyakorlas-kor-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-gyakorlas-kor-sorter' && (
                    <Grade10CirclePracticeQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-gyakorlas-kor-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-gyakorlas-kor-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-gyakorlas-kor-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* 6. Körívek, körcikkek a mindennapokban */}
                  {activityType === 'g10-geo-korivek-mindennapokban-theory' && (
                    <Grade10EverydayArcsSectorsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-korivek-mindennapokban-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-korivek-mindennapokban-quiz' && (
                    <Grade10EverydayArcsSectorsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-korivek-mindennapokban-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-korivek-mindennapokban-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-korivek-mindennapokban-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-korivek-mindennapokban-matcher' && (
                    <Grade10EverydayArcsSectorsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-korivek-mindennapokban-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-korivek-mindennapokban-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-korivek-mindennapokban-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-korivek-mindennapokban-sorter' && (
                    <Grade10EverydayArcsSectorsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-korivek-mindennapokban-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-korivek-mindennapokban-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-korivek-mindennapokban-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* 7. Sokszögek és körök */}
                  {activityType === 'g10-geo-sokszogek-es-korok-theory' && (
                    <Grade10PolygonsAndCirclesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-sokszogek-es-korok-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-sokszogek-es-korok-quiz' && (
                    <Grade10PolygonsAndCirclesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-sokszogek-es-korok-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-sokszogek-es-korok-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-sokszogek-es-korok-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-sokszogek-es-korok-matcher' && (
                    <Grade10PolygonsAndCirclesQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-sokszogek-es-korok-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-sokszogek-es-korok-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-sokszogek-es-korok-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-sokszogek-es-korok-sorter' && (
                    <Grade10PolygonsAndCirclesQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-sokszogek-es-korok-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-sokszogek-es-korok-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-sokszogek-es-korok-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* 8. Érintőtrapézok és szabályos sokszögek */}
                  {activityType === 'g10-geo-gyakorlas-sokszogek-theory' && (
                    <Grade10PolygonCirclePracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-gyakorlas-sokszogek-quiz' && (
                    <Grade10PolygonCirclePracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-gyakorlas-sokszogek-matcher' && (
                    <Grade10PolygonCirclePracticeQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-gyakorlas-sokszogek-sorter' && (
                    <Grade10PolygonCirclePracticeQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-gyakorlas-sokszogek-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* 9. Ismétlés */}
                  {activityType === 'g10-geo-ismetles-theory' && (
                    <Grade10GeometryReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-geo-ismetles-quiz', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-ismetles-quiz' && (
                    <Grade10GeometryReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-ismetles-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-ismetles-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-ismetles-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-ismetles-matcher' && (
                    <Grade10GeometryReviewQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-ismetles-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-ismetles-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-ismetles-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}
                  {activityType === 'g10-geo-ismetles-sorter' && (
                    <Grade10GeometryReviewQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-geo-ismetles-theory', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-geo-ismetles-matcher', selectedTopic || 'g10-egybevagosag-kor')}
                      onSwitchToSorter={() => handleActivitySelect('g10-geo-ismetles-sorter', selectedTopic || 'g10-egybevagosag-kor')}
                    />
                  )}

                  {/* Topic VII: Statisztika és valószínűségszámítás */}
                  {/* 1. Átlag, számtani közép */}
                  {activityType === 'g10-stat-atlag-szamtani-kozep-theory' && (
                    <Grade10AverageArithmeticTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-atlag-szamtani-kozep-quiz' && (
                    <Grade10AverageArithmeticQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-atlag-szamtani-kozep-matcher' && (
                    <Grade10AverageArithmeticQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-atlag-szamtani-kozep-sorter' && (
                    <Grade10AverageArithmeticQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-atlag-szamtani-kozep-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 2. Ráadás – Számtani közép, mértani közép */}
                  {activityType === 'g10-stat-szamtani-mertani-kozep-theory' && (
                    <Grade10ArithmeticGeometricTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-szamtani-mertani-kozep-quiz' && (
                    <Grade10ArithmeticGeometricQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-szamtani-mertani-kozep-matcher' && (
                    <Grade10ArithmeticGeometricQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-szamtani-mertani-kozep-sorter' && (
                    <Grade10ArithmeticGeometricQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-szamtani-mertani-kozep-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 3. Változások */}
                  {activityType === 'g10-stat-valtozasok-theory' && (
                    <Grade10ChangesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-valtozasok-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-valtozasok-quiz' && (
                    <Grade10ChangesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-valtozasok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-valtozasok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-valtozasok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-valtozasok-matcher' && (
                    <Grade10ChangesQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-valtozasok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-valtozasok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-valtozasok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-valtozasok-sorter' && (
                    <Grade10ChangesQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-valtozasok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-valtozasok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-valtozasok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 4. Számsokaságok statisztikai jellemzői */}
                  {activityType === 'g10-stat-statisztikai-jellemzok-theory' && (
                    <Grade10SummaryStatsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-statisztikai-jellemzok-quiz' && (
                    <Grade10SummaryStatsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-statisztikai-jellemzok-matcher' && (
                    <Grade10SummaryStatsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-statisztikai-jellemzok-sorter' && (
                    <Grade10SummaryStatsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-statisztikai-jellemzok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 5. Osztályba sorolás, átlagok átlaga */}
                  {activityType === 'g10-stat-osztalyba-sorolas-atlagok-theory' && (
                    <Grade10ClassIntervalTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-osztalyba-sorolas-atlagok-quiz' && (
                    <Grade10ClassIntervalQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-osztalyba-sorolas-atlagok-matcher' && (
                    <Grade10ClassIntervalQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-osztalyba-sorolas-atlagok-sorter' && (
                    <Grade10ClassIntervalQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-osztalyba-sorolas-atlagok-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 6. Véletlen? – Relatív gyakoriság */}
                  {activityType === 'g10-stat-veletlen-relativ-gyakorisag-theory' && (
                    <Grade10RandomFrequencyTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-veletlen-relativ-gyakorisag-quiz' && (
                    <Grade10RandomFrequencyQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-veletlen-relativ-gyakorisag-matcher' && (
                    <Grade10RandomFrequencyQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-veletlen-relativ-gyakorisag-sorter' && (
                    <Grade10RandomFrequencyQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-veletlen-relativ-gyakorisag-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 7. Megismerhető véletlen */}
                  {activityType === 'g10-stat-megismerheto-veletlen-theory' && (
                    <Grade10ClassicalProbTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-megismerheto-veletlen-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-megismerheto-veletlen-quiz' && (
                    <Grade10ClassicalProbQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-megismerheto-veletlen-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-megismerheto-veletlen-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-megismerheto-veletlen-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-megismerheto-veletlen-matcher' && (
                    <Grade10ClassicalProbQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-megismerheto-veletlen-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-megismerheto-veletlen-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-megismerheto-veletlen-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-megismerheto-veletlen-sorter' && (
                    <Grade10ClassicalProbQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-megismerheto-veletlen-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-megismerheto-veletlen-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-megismerheto-veletlen-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 8. Biztos, lehetetlen, véletlen */}
                  {activityType === 'g10-stat-biztos-lehetetlen-veletlen-theory' && (
                    <Grade10EventCertaintyTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-biztos-lehetetlen-veletlen-quiz' && (
                    <Grade10EventCertaintyQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-biztos-lehetetlen-veletlen-matcher' && (
                    <Grade10EventCertaintyQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-biztos-lehetetlen-veletlen-sorter' && (
                    <Grade10EventCertaintyQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-biztos-lehetetlen-veletlen-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 9. Valószínűség a gyakorlatban */}
                  {activityType === 'g10-stat-valoszinuseg-gyakorlatban-theory' && (
                    <Grade10PracticalProbTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-valoszinuseg-gyakorlatban-quiz' && (
                    <Grade10PracticalProbQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-valoszinuseg-gyakorlatban-matcher' && (
                    <Grade10PracticalProbQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-valoszinuseg-gyakorlatban-sorter' && (
                    <Grade10PracticalProbQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-valoszinuseg-gyakorlatban-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* 10. Gyakorlás, tudáspróba */}
                  {activityType === 'g10-stat-gyakorlas-tudasproba-theory' && (
                    <Grade10ChapterSynthesisTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-quiz', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-gyakorlas-tudasproba-quiz' && (
                    <Grade10ChapterSynthesisQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-gyakorlas-tudasproba-matcher' && (
                    <Grade10ChapterSynthesisQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}
                  {activityType === 'g10-stat-gyakorlas-tudasproba-sorter' && (
                    <Grade10ChapterSynthesisQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-theory', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-matcher', selectedTopic || 'g10-statisztika-valoszinuseg')}
                      onSwitchToSorter={() => handleActivitySelect('g10-stat-gyakorlas-tudasproba-sorter', selectedTopic || 'g10-statisztika-valoszinuseg')}
                    />
                  )}

                  {/* Topic VIII: Egyenletek és egyenlőtlenségek */}
                  {/* 1. Ekvivalens egyenletek */}
                  {activityType === 'g10-eq-ekvivalens-egyenletek-theory' && (
                    <Grade10EquivalentEquationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-ekvivalens-egyenletek-quiz' && (
                    <Grade10EquivalentEquationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-ekvivalens-egyenletek-matcher' && (
                    <Grade10EquivalentEquationsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-ekvivalens-egyenletek-sorter' && (
                    <Grade10EquivalentEquationsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-ekvivalens-egyenletek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 2. Gyökös egyenletek */}
                  {activityType === 'g10-eq-gyokos-egyenletek-theory' && (
                    <Grade10RadicalEquationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-gyokos-egyenletek-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyokos-egyenletek-quiz' && (
                    <Grade10RadicalEquationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyokos-egyenletek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyokos-egyenletek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyokos-egyenletek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyokos-egyenletek-matcher' && (
                    <Grade10RadicalEquationsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyokos-egyenletek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyokos-egyenletek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyokos-egyenletek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyokos-egyenletek-sorter' && (
                    <Grade10RadicalEquationsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyokos-egyenletek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyokos-egyenletek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyokos-egyenletek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 3. Ráadás: Laboratóriumi fejlesztések */}
                  {activityType === 'g10-eq-laboratoriumi-fejlesztesek-theory' && (
                    <Grade10LabDevelopmentTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-laboratoriumi-fejlesztesek-quiz' && (
                    <Grade10LabDevelopmentQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-laboratoriumi-fejlesztesek-matcher' && (
                    <Grade10LabDevelopmentQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-laboratoriumi-fejlesztesek-sorter' && (
                    <Grade10LabDevelopmentQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-laboratoriumi-fejlesztesek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 4. Másodfokú egyenlőtlenségek */}
                  {activityType === 'g10-eq-masodfoku-egyenlotlensegek-theory' && (
                    <Grade10QuadraticInequalitiesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-masodfoku-egyenlotlensegek-quiz' && (
                    <Grade10QuadraticInequalitiesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-masodfoku-egyenlotlensegek-matcher' && (
                    <Grade10QuadraticInequalitiesQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-masodfoku-egyenlotlensegek-sorter' && (
                    <Grade10QuadraticInequalitiesQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-masodfoku-egyenlotlensegek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 5. Gyakorlás: Törtes és abszolútértékes egyenlőtlenségek */}
                  {activityType === 'g10-eq-gyakorlas-egyenlotlensegek-theory' && (
                    <Grade10InequalitiesPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyakorlas-egyenlotlensegek-quiz' && (
                    <Grade10InequalitiesPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyakorlas-egyenlotlensegek-matcher' && (
                    <Grade10InequalitiesPracticeQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyakorlas-egyenlotlensegek-sorter' && (
                    <Grade10InequalitiesPracticeQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyakorlas-egyenlotlensegek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 6. Polinom gyöktényezős alakja */}
                  {activityType === 'g10-eq-polinom-gyoktenyezos-alakja-theory' && (
                    <Grade10RootFactorizationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-polinom-gyoktenyezos-alakja-quiz' && (
                    <Grade10RootFactorizationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-polinom-gyoktenyezos-alakja-matcher' && (
                    <Grade10RootFactorizationQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-polinom-gyoktenyezos-alakja-sorter' && (
                    <Grade10RootFactorizationQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-polinom-gyoktenyezos-alakja-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 7. Ráadás – Viète-formulák! */}
                  {activityType === 'g10-eq-viete-formulak-theory' && (
                    <Grade10VieteFormulasTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-viete-formulak-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-viete-formulak-quiz' && (
                    <Grade10VieteFormulasQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-viete-formulak-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-viete-formulak-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-viete-formulak-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-viete-formulak-matcher' && (
                    <Grade10VieteFormulasQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-viete-formulak-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-viete-formulak-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-viete-formulak-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-viete-formulak-sorter' && (
                    <Grade10VieteFormulasQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-viete-formulak-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-viete-formulak-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-viete-formulak-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 8. Csoportverseny */}
                  {activityType === 'g10-eq-csoportverseny-theory' && (
                    <Grade10GroupCompetitionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-csoportverseny-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-csoportverseny-quiz' && (
                    <Grade10GroupCompetitionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-csoportverseny-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-csoportverseny-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-csoportverseny-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-csoportverseny-matcher' && (
                    <Grade10GroupCompetitionQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-csoportverseny-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-csoportverseny-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-csoportverseny-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-csoportverseny-sorter' && (
                    <Grade10GroupCompetitionQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-csoportverseny-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-csoportverseny-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-csoportverseny-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 9. Ráadás – Másodfokú egyenletrendszerek */}
                  {activityType === 'g10-eq-masodfoku-egyenletrendszerek-theory' && (
                    <Grade10QuadraticSystemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-masodfoku-egyenletrendszerek-quiz' && (
                    <Grade10QuadraticSystemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-masodfoku-egyenletrendszerek-matcher' && (
                    <Grade10QuadraticSystemsQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-masodfoku-egyenletrendszerek-sorter' && (
                    <Grade10QuadraticSystemsQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-masodfoku-egyenletrendszerek-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}

                  {/* 10. Gyakorlás, tudáspróba */}
                  {activityType === 'g10-eq-gyakorlas-tudasproba-theory' && (
                    <Grade10Topic8PracticeExamTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-quiz', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyakorlas-tudasproba-quiz' && (
                    <Grade10Topic8PracticeExamQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyakorlas-tudasproba-matcher' && (
                    <Grade10Topic8PracticeExamQuiz
                      initialGameMode="matcher"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}
                  {activityType === 'g10-eq-gyakorlas-tudasproba-sorter' && (
                    <Grade10Topic8PracticeExamQuiz
                      initialGameMode="sorter"
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-theory', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToMatcher={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-matcher', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                      onSwitchToSorter={() => handleActivitySelect('g10-eq-gyakorlas-tudasproba-sorter', selectedTopic || 'g10-egyenletek-egyenlotlensegek')}
                    />
                  )}


    </>
  );
};
