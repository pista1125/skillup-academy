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
    </>
  );
};
