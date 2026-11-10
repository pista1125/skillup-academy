import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const Grade9AbsEquationMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/abszolut-ertekes-egyenletek/AbsEquationMatcher").then(m => ({ default: m.AbsEquationMatcher })))
const Grade9AbsEquationQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/abszolut-ertekes-egyenletek/AbsEquationQuiz").then(m => ({ default: m.AbsEquationQuiz })))
const Grade9AbsEquationSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/abszolut-ertekes-egyenletek/AbsEquationSorter").then(m => ({ default: m.AbsEquationSorter })))
const Grade9AbsEquationTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/abszolut-ertekes-egyenletek/AbsEquationTheory").then(m => ({ default: m.AbsEquationTheory })))
const Grade9AbsValueMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/abszoluterteek-fuggveny/AbsValueMatcher").then(m => ({ default: m.AbsValueMatcher })))
const Grade9AbsValueQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/abszoluterteek-fuggveny/AbsValueQuiz").then(m => ({ default: m.AbsValueQuiz })))
const Grade9AbsValueSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/abszoluterteek-fuggveny/AbsValueSorter").then(m => ({ default: m.AbsValueSorter })))
const Grade9AbsValueTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/abszoluterteek-fuggveny/AbsValueTheory").then(m => ({ default: m.AbsValueTheory })))
const Grade9AlgebraicOperationsQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/szamolas-az-algebraban/AlgebraicOperationsQuiz").then(m => ({ default: m.AlgebraicOperationsQuiz })))
const Grade9AlgebraicOperationsTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/szamolas-az-algebraban/AlgebraicOperationsTheory").then(m => ({ default: m.AlgebraicOperationsTheory })))
const Grade9AppliedMatcher = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/egybevagosagi-transzformaciok-a-gyakorlatban/AppliedMatcher").then(m => ({ default: m.AppliedMatcher })))
const Grade9AppliedQuiz = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/egybevagosagi-transzformaciok-a-gyakorlatban/AppliedQuiz").then(m => ({ default: m.AppliedQuiz })))
const Grade9AppliedSorter = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/egybevagosagi-transzformaciok-a-gyakorlatban/AppliedSorter").then(m => ({ default: m.AppliedSorter })))
const Grade9AppliedTheory = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/egybevagosagi-transzformaciok-a-gyakorlatban/AppliedTheory").then(m => ({ default: m.AppliedTheory })))
const Grade9AreaMatcher = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/nevezetes-negyszogek-terulete/AreaMatcher").then(m => ({ default: m.AreaMatcher })))
const Grade9AreaQuiz = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/nevezetes-negyszogek-terulete/AreaQuiz").then(m => ({ default: m.AreaQuiz })))
const Grade9AreaSorter = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/nevezetes-negyszogek-terulete/AreaSorter").then(m => ({ default: m.AreaSorter })))
const Grade9AreaTheory = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/nevezetes-negyszogek-terulete/AreaTheory").then(m => ({ default: m.AreaTheory })))
const Grade9AxialMatcher = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/tengelyes-tukrozes/AxialMatcher").then(m => ({ default: m.AxialMatcher })))
const Grade9AxialQuiz = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/tengelyes-tukrozes/AxialQuiz").then(m => ({ default: m.AxialQuiz })))
const Grade9AxialSorter = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/tengelyes-tukrozes/AxialSorter").then(m => ({ default: m.AxialSorter })))
const Grade9AxialTheory = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/tengelyes-tukrozes/AxialTheory").then(m => ({ default: m.AxialTheory })))
const Grade9ChangesMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/valtozasok-abrazolasa/ChangesMatcher").then(m => ({ default: m.ChangesMatcher })))
const Grade9ChangesQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/valtozasok-abrazolasa/ChangesQuiz").then(m => ({ default: m.ChangesQuiz })))
const Grade9ChangesSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/valtozasok-abrazolasa/ChangesSorter").then(m => ({ default: m.ChangesSorter })))
const Grade9ChangesTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/valtozasok-abrazolasa/ChangesTheory").then(m => ({ default: m.ChangesTheory })))
const Grade9Chapter2KnowledgeTestMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/gyakorlas-tudasproba/Chapter2KnowledgeTestMatcher").then(m => ({ default: m.Chapter2KnowledgeTestMatcher })))
const Grade9Chapter2KnowledgeTestQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/gyakorlas-tudasproba/Chapter2KnowledgeTestQuiz").then(m => ({ default: m.Chapter2KnowledgeTestQuiz })))
const Grade9Chapter2KnowledgeTestSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/gyakorlas-tudasproba/Chapter2KnowledgeTestSorter").then(m => ({ default: m.Chapter2KnowledgeTestSorter })))
const Grade9Chapter2KnowledgeTestTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/gyakorlas-tudasproba/Chapter2KnowledgeTestTheory").then(m => ({ default: m.Chapter2KnowledgeTestTheory })))
const Grade9CharacterizationMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/fuggvenyek-jellemzese/CharacterizationMatcher").then(m => ({ default: m.CharacterizationMatcher })))
const Grade9CharacterizationQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/fuggvenyek-jellemzese/CharacterizationQuiz").then(m => ({ default: m.CharacterizationQuiz })))
const Grade9CharacterizationSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/fuggvenyek-jellemzese/CharacterizationSorter").then(m => ({ default: m.CharacterizationSorter })))
const Grade9CharacterizationTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/fuggvenyek-jellemzese/CharacterizationTheory").then(m => ({ default: m.CharacterizationTheory })))
const Grade9CircleMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-kor/CircleMatcher").then(m => ({ default: m.CircleMatcher })))
const Grade9CircleQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-kor/CircleQuiz").then(m => ({ default: m.CircleQuiz })))
const Grade9CircleSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-kor/CircleSorter").then(m => ({ default: m.CircleSorter })))
const Grade9CircleTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-kor/CircleTheory").then(m => ({ default: m.CircleTheory })))
const Grade9CombinatoricsPracticeMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-kombinatorika/CombinatoricsPracticeMatcher").then(m => ({ default: m.CombinatoricsPracticeMatcher })))
const Grade9CombinatoricsPracticeQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-kombinatorika/CombinatoricsPracticeQuiz").then(m => ({ default: m.CombinatoricsPracticeQuiz })))
const Grade9CombinatoricsPracticeSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-kombinatorika/CombinatoricsPracticeSorter").then(m => ({ default: m.CombinatoricsPracticeSorter })))
const Grade9CombinatoricsPracticeTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-kombinatorika/CombinatoricsPracticeTheory").then(m => ({ default: m.CombinatoricsPracticeTheory })))
const Grade9CompoundInterestMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/kamatos-kamat/CompoundInterestMatcher").then(m => ({ default: m.CompoundInterestMatcher })))
const Grade9CompoundInterestQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/kamatos-kamat/CompoundInterestQuiz").then(m => ({ default: m.CompoundInterestQuiz })))
const Grade9CompoundInterestSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/kamatos-kamat/CompoundInterestSorter").then(m => ({ default: m.CompoundInterestSorter })))
const Grade9CompoundInterestTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/kamatos-kamat/CompoundInterestTheory").then(m => ({ default: m.CompoundInterestTheory })))
const Grade9ConstructionMatcher = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/szerkesztesek/ConstructionMatcher").then(m => ({ default: m.ConstructionMatcher })))
const Grade9ConstructionQuiz = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/szerkesztesek/ConstructionQuiz").then(m => ({ default: m.ConstructionQuiz })))
const Grade9ConstructionSorter = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/szerkesztesek/ConstructionSorter").then(m => ({ default: m.ConstructionSorter })))
const Grade9ConstructionTheory = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/szerkesztesek/ConstructionTheory").then(m => ({ default: m.ConstructionTheory })))
const Grade9CountingContMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/folytatjuk-az-osszeszamlalast/CountingContMatcher").then(m => ({ default: m.CountingContMatcher })))
const Grade9CountingContQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/folytatjuk-az-osszeszamlalast/CountingContQuiz").then(m => ({ default: m.CountingContQuiz })))
const Grade9CountingContSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/folytatjuk-az-osszeszamlalast/CountingContSorter").then(m => ({ default: m.CountingContSorter })))
const Grade9CountingContTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/folytatjuk-az-osszeszamlalast/CountingContTheory").then(m => ({ default: m.CountingContTheory })))
const Grade9DiagramsMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/diagramok/DiagramsMatcher").then(m => ({ default: m.DiagramsMatcher })))
const Grade9DiagramsQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/diagramok/DiagramsQuiz").then(m => ({ default: m.DiagramsQuiz })))
const Grade9DiagramsSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/diagramok/DiagramsSorter").then(m => ({ default: m.DiagramsSorter })))
const Grade9DiagramsTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/diagramok/DiagramsTheory").then(m => ({ default: m.DiagramsTheory })))
const Grade9DistancesMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/tavolsagok/DistancesMatcher").then(m => ({ default: m.DistancesMatcher })))
const Grade9DistancesQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/tavolsagok/DistancesQuiz").then(m => ({ default: m.DistancesQuiz })))
const Grade9DistancesSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/tavolsagok/DistancesSorter").then(m => ({ default: m.DistancesSorter })))
const Grade9DistancesTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/tavolsagok/DistancesTheory").then(m => ({ default: m.DistancesTheory })))
const Grade9DomainQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/alaphalmaz-ertelmezesi-tartomany-megoldashalmaz/DomainQuiz").then(m => ({ default: m.DomainQuiz })))
const Grade9DomainTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/alaphalmaz-ertelmezesi-tartomany-megoldashalmaz/DomainTheory").then(m => ({ default: m.DomainTheory })))
const Grade9EquationsQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/egyenletek/EquationsQuiz").then(m => ({ default: m.EquationsQuiz })))
const Grade9EquationsTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/egyenletek/EquationsTheory").then(m => ({ default: m.EquationsTheory })))
const Grade9EverydayGraphsMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/grafikonok-a-mindennapokban/EverydayGraphsMatcher").then(m => ({ default: m.EverydayGraphsMatcher })))
const Grade9EverydayGraphsQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/grafikonok-a-mindennapokban/EverydayGraphsQuiz").then(m => ({ default: m.EverydayGraphsQuiz })))
const Grade9EverydayGraphsSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/grafikonok-a-mindennapokban/EverydayGraphsSorter").then(m => ({ default: m.EverydayGraphsSorter })))
const Grade9EverydayGraphsTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/grafikonok-a-mindennapokban/EverydayGraphsTheory").then(m => ({ default: m.EverydayGraphsTheory })))
const Grade9ExtremaMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/szelsoertekek/ExtremaMatcher").then(m => ({ default: m.ExtremaMatcher })))
const Grade9ExtremaQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/szelsoertekek/ExtremaQuiz").then(m => ({ default: m.ExtremaQuiz })))
const Grade9ExtremaSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/szelsoertekek/ExtremaSorter").then(m => ({ default: m.ExtremaSorter })))
const Grade9ExtremaTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/szelsoertekek/ExtremaTheory").then(m => ({ default: m.ExtremaTheory })))
const Grade9FactorizationQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/szorzatta-alakitas/FactorizationQuiz").then(m => ({ default: m.FactorizationQuiz })))
const Grade9FactorizationTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/szorzatta-alakitas/FactorizationTheory").then(m => ({ default: m.FactorizationTheory })))
const Grade9FractionsMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamolas-tortekkel/FractionsMatcher").then(m => ({ default: m.FractionsMatcher })))
const Grade9FractionsQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamolas-tortekkel/FractionsQuiz").then(m => ({ default: m.FractionsQuiz })))
const Grade9FractionsSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamolas-tortekkel/FractionsSorter").then(m => ({ default: m.FractionsSorter })))
const Grade9FractionsTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamolas-tortekkel/FractionsTheory").then(m => ({ default: m.FractionsTheory })))
const Grade9FuncPracticeExamMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/gyakorlas-tudasproba/PracticeExamMatcher").then(m => ({ default: m.PracticeExamMatcher })))
const Grade9FuncPracticeExamQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/gyakorlas-tudasproba/PracticeExamQuiz").then(m => ({ default: m.PracticeExamQuiz })))
const Grade9FuncPracticeExamSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/gyakorlas-tudasproba/PracticeExamSorter").then(m => ({ default: m.PracticeExamSorter })))
const Grade9FuncPracticeExamTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/gyakorlas-tudasproba/PracticeExamTheory").then(m => ({ default: m.PracticeExamTheory })))
const Grade9FuncProportionalityMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/az-egyenes-es-forditott-aranyossag-fuggvenye/ProportionalityMatcher").then(m => ({ default: m.ProportionalityMatcher })))
const Grade9FuncProportionalityQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/az-egyenes-es-forditott-aranyossag-fuggvenye/ProportionalityQuiz").then(m => ({ default: m.ProportionalityQuiz })))
const Grade9FuncProportionalitySorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/az-egyenes-es-forditott-aranyossag-fuggvenye/ProportionalitySorter").then(m => ({ default: m.ProportionalitySorter })))
const Grade9FuncProportionalityTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/az-egyenes-es-forditott-aranyossag-fuggvenye/ProportionalityTheory").then(m => ({ default: m.ProportionalityTheory })))
const Grade9FunctionConceptMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/a-fuggveny-fogalma/FunctionConceptMatcher").then(m => ({ default: m.FunctionConceptMatcher })))
const Grade9FunctionConceptQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/a-fuggveny-fogalma/FunctionConceptQuiz").then(m => ({ default: m.FunctionConceptQuiz })))
const Grade9FunctionConceptSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/a-fuggveny-fogalma/FunctionConceptSorter").then(m => ({ default: m.FunctionConceptSorter })))
const Grade9FunctionConceptTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/a-fuggveny-fogalma/FunctionConceptTheory").then(m => ({ default: m.FunctionConceptTheory })))
const Grade9GeometryReviewMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/gyakorlas-tudasproba/GeometryReviewMatcher").then(m => ({ default: m.GeometryReviewMatcher })))
const Grade9GeometryReviewQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/gyakorlas-tudasproba/GeometryReviewQuiz").then(m => ({ default: m.GeometryReviewQuiz })))
const Grade9GeometryReviewSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/gyakorlas-tudasproba/GeometryReviewSorter").then(m => ({ default: m.GeometryReviewSorter })))
const Grade9GeometryReviewTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/gyakorlas-tudasproba/GeometryReviewTheory").then(m => ({ default: m.GeometryReviewTheory })))
const Grade9GraphicEqMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenletek-grafikus-megoldasa/GraphicEqMatcher").then(m => ({ default: m.GraphicEqMatcher })))
const Grade9GraphicEqQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenletek-grafikus-megoldasa/GraphicEqQuiz").then(m => ({ default: m.GraphicEqQuiz })))
const Grade9GraphicEqSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenletek-grafikus-megoldasa/GraphicEqSorter").then(m => ({ default: m.GraphicEqSorter })))
const Grade9GraphicEqTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenletek-grafikus-megoldasa/GraphicEqTheory").then(m => ({ default: m.GraphicEqTheory })))
const Grade9GraphsMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/grafok/GraphsMatcher").then(m => ({ default: m.GraphsMatcher })))
const Grade9GraphsQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/grafok/GraphsQuiz").then(m => ({ default: m.GraphsQuiz })))
const Grade9GraphsSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/grafok/GraphsSorter").then(m => ({ default: m.GraphsSorter })))
const Grade9GraphsTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/grafok/GraphsTheory").then(m => ({ default: m.GraphsTheory })))
const Grade9HowManyWaysMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/hanyfelekeppen-lehet/HowManyWaysMatcher").then(m => ({ default: m.HowManyWaysMatcher })))
const Grade9HowManyWaysQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/hanyfelekeppen-lehet/HowManyWaysQuiz").then(m => ({ default: m.HowManyWaysQuiz })))
const Grade9HowManyWaysSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/hanyfelekeppen-lehet/HowManyWaysSorter").then(m => ({ default: m.HowManyWaysSorter })))
const Grade9HowManyWaysTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/hanyfelekeppen-lehet/HowManyWaysTheory").then(m => ({ default: m.HowManyWaysTheory })))
const Grade9InequalityMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenlotlensegek/InequalityMatcher").then(m => ({ default: m.InequalityMatcher })))
const Grade9InequalityQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenlotlensegek/InequalityQuiz").then(m => ({ default: m.InequalityQuiz })))
const Grade9InequalitySorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenlotlensegek/InequalitySorter").then(m => ({ default: m.InequalitySorter })))
const Grade9InequalityTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenlotlensegek/InequalityTheory").then(m => ({ default: m.InequalityTheory })))
const Grade9IntervalsMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/intervallumok/IntervalsMatcher").then(m => ({ default: m.IntervalsMatcher })))
const Grade9IntervalsQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/intervallumok/IntervalsQuiz").then(m => ({ default: m.IntervalsQuiz })))
const Grade9IntervalsSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/intervallumok/IntervalsSorter").then(m => ({ default: m.IntervalsSorter })))
const Grade9IntervalsTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/intervallumok/IntervalsTheory").then(m => ({ default: m.IntervalsTheory })))
const Grade9KnowledgeTestMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-tudasproba/KnowledgeTestMatcher").then(m => ({ default: m.KnowledgeTestMatcher })))
const Grade9KnowledgeTestQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-tudasproba/KnowledgeTestQuiz").then(m => ({ default: m.KnowledgeTestQuiz })))
const Grade9KnowledgeTestSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-tudasproba/KnowledgeTestSorter").then(m => ({ default: m.KnowledgeTestSorter })))
const Grade9KnowledgeTestTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-tudasproba/KnowledgeTestTheory").then(m => ({ default: m.KnowledgeTestTheory })))
const Grade9LinearMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/linearis-fuggvenyek/LinearMatcher").then(m => ({ default: m.LinearMatcher })))
const Grade9LinearQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/linearis-fuggvenyek/LinearQuiz").then(m => ({ default: m.LinearQuiz })))
const Grade9LinearSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/linearis-fuggvenyek/LinearSorter").then(m => ({ default: m.LinearSorter })))
const Grade9LinearSystemsQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/elsofoku-ketismeretlenes-egyenletrendszer/LinearSystemsQuiz").then(m => ({ default: m.LinearSystemsQuiz })))
const Grade9LinearSystemsTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/elsofoku-ketismeretlenes-egyenletrendszer/LinearSystemsTheory").then(m => ({ default: m.LinearSystemsTheory })))
const Grade9LinearTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/linearis-fuggvenyek/LinearTheory").then(m => ({ default: m.LinearTheory })))
const Grade9LocksMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/szamzarak/LocksMatcher").then(m => ({ default: m.LocksMatcher })))
const Grade9LocksQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/szamzarak/LocksQuiz").then(m => ({ default: m.LocksQuiz })))
const Grade9LocksSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/szamzarak/LocksSorter").then(m => ({ default: m.LocksSorter })))
const Grade9LocksTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/szamzarak/LocksTheory").then(m => ({ default: m.LocksTheory })))
const Grade9NumberSetsMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/muveletek-szamhalmazokban/NumberSetsMatcher").then(m => ({ default: m.NumberSetsMatcher })))
const Grade9NumberSetsQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/muveletek-szamhalmazokban/NumberSetsQuiz").then(m => ({ default: m.NumberSetsQuiz })))
const Grade9NumberSetsSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/muveletek-szamhalmazokban/NumberSetsSorter").then(m => ({ default: m.NumberSetsSorter })))
const Grade9NumberSetsTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/muveletek-szamhalmazokban/NumberSetsTheory").then(m => ({ default: m.NumberSetsTheory })))
const Grade9PercentageMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szazalekszamitas/PercentageMatcher").then(m => ({ default: m.PercentageMatcher })))
const Grade9PercentageQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szazalekszamitas/PercentageQuiz").then(m => ({ default: m.PercentageQuiz })))
const Grade9PercentageSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szazalekszamitas/PercentageSorter").then(m => ({ default: m.PercentageSorter })))
const Grade9PercentageTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szazalekszamitas/PercentageTheory").then(m => ({ default: m.PercentageTheory })))
const Grade9PlaneGeometryMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-sik-geometriaja/PlaneGeometryMatcher").then(m => ({ default: m.PlaneGeometryMatcher })))
const Grade9PlaneGeometryQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-sik-geometriaja/PlaneGeometryQuiz").then(m => ({ default: m.PlaneGeometryQuiz })))
const Grade9PlaneGeometrySorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-sik-geometriaja/PlaneGeometrySorter").then(m => ({ default: m.PlaneGeometrySorter })))
const Grade9PlaneGeometryTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-sik-geometriaja/PlaneGeometryTheory").then(m => ({ default: m.PlaneGeometryTheory })))
const Grade9PlottingMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/keszitsunk-grafikont/PlottingMatcher").then(m => ({ default: m.PlottingMatcher })))
const Grade9PlottingQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/keszitsunk-grafikont/PlottingQuiz").then(m => ({ default: m.PlottingQuiz })))
const Grade9PlottingSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/keszitsunk-grafikont/PlottingSorter").then(m => ({ default: m.PlottingSorter })))
const Grade9PlottingTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/keszitsunk-grafikont/PlottingTheory").then(m => ({ default: m.PlottingTheory })))
const Grade9PowersMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/hatvanyozas/PowersMatcher").then(m => ({ default: m.PowersMatcher })))
const Grade9PowersPracticeMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/gyakorlas-hatvanyozas/PowersPracticeMatcher").then(m => ({ default: m.PowersPracticeMatcher })))
const Grade9PowersPracticeQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/gyakorlas-hatvanyozas/PowersPracticeQuiz").then(m => ({ default: m.PowersPracticeQuiz })))
const Grade9PowersPracticeSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/gyakorlas-hatvanyozas/PowersPracticeSorter").then(m => ({ default: m.PowersPracticeSorter })))
const Grade9PowersPracticeTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/gyakorlas-hatvanyozas/PowersPracticeTheory").then(m => ({ default: m.PowersPracticeTheory })))
const Grade9PowersQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/hatvanyozas/PowersQuiz").then(m => ({ default: m.PowersQuiz })))
const Grade9PowersSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/hatvanyozas/PowersSorter").then(m => ({ default: m.PowersSorter })))
const Grade9PowersTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/hatvanyozas/PowersTheory").then(m => ({ default: m.PowersTheory })))
const Grade9PracticalMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/gyakorlati-feladatok/PracticalMatcher").then(m => ({ default: m.PracticalMatcher })))
const Grade9PracticalQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/gyakorlati-feladatok/PracticalQuiz").then(m => ({ default: m.PracticalQuiz })))
const Grade9PracticalSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/gyakorlati-feladatok/PracticalSorter").then(m => ({ default: m.PracticalSorter })))
const Grade9PracticalTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/gyakorlati-feladatok/PracticalTheory").then(m => ({ default: m.PracticalTheory })))
const Grade9PracticeTestQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/gyakorlas-tudasproba/PracticeTestQuiz").then(m => ({ default: m.PracticeTestQuiz })))
const Grade9PracticeTestTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/gyakorlas-tudasproba/PracticeTestTheory").then(m => ({ default: m.PracticeTestTheory })))
const Grade9ProblemSolvingQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/problemamegoldas-egyenletekkel/ProblemSolvingQuiz").then(m => ({ default: m.ProblemSolvingQuiz })))
const Grade9ProblemSolvingTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/problemamegoldas-egyenletekkel/ProblemSolvingTheory").then(m => ({ default: m.ProblemSolvingTheory })))
const Grade9ProportionalDivisionMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/aranyos-osztas/ProportionalDivisionMatcher").then(m => ({ default: m.ProportionalDivisionMatcher })))
const Grade9ProportionalDivisionQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/aranyos-osztas/ProportionalDivisionQuiz").then(m => ({ default: m.ProportionalDivisionQuiz })))
const Grade9ProportionalDivisionSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/aranyos-osztas/ProportionalDivisionSorter").then(m => ({ default: m.ProportionalDivisionSorter })))
const Grade9ProportionalDivisionTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/aranyos-osztas/ProportionalDivisionTheory").then(m => ({ default: m.ProportionalDivisionTheory })))
const Grade9ProportionalityMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/aranyossag/ProportionalityMatcher").then(m => ({ default: m.ProportionalityMatcher })))
const Grade9ProportionalityQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/aranyossag/ProportionalityQuiz").then(m => ({ default: m.ProportionalityQuiz })))
const Grade9ProportionalitySorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/aranyossag/ProportionalitySorter").then(m => ({ default: m.ProportionalitySorter })))
const Grade9ProportionalityTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/aranyossag/ProportionalityTheory").then(m => ({ default: m.ProportionalityTheory })))
const Grade9PythagorasMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/pitagorasz-tetele/PythagorasMatcher").then(m => ({ default: m.PythagorasMatcher })))
const Grade9PythagorasQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/pitagorasz-tetele/PythagorasQuiz").then(m => ({ default: m.PythagorasQuiz })))
const Grade9PythagorasSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/pitagorasz-tetele/PythagorasSorter").then(m => ({ default: m.PythagorasSorter })))
const Grade9PythagorasTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/pitagorasz-tetele/PythagorasTheory").then(m => ({ default: m.PythagorasTheory })))
const Grade9QuadraticRootMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/masodfoku-es-negyzetgyok-fuggveny/QuadraticRootMatcher").then(m => ({ default: m.QuadraticRootMatcher })))
const Grade9QuadraticRootQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/masodfoku-es-negyzetgyok-fuggveny/QuadraticRootQuiz").then(m => ({ default: m.QuadraticRootQuiz })))
const Grade9QuadraticRootSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/masodfoku-es-negyzetgyok-fuggveny/QuadraticRootSorter").then(m => ({ default: m.QuadraticRootSorter })))
const Grade9QuadraticRootTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/masodfoku-es-negyzetgyok-fuggveny/QuadraticRootTheory").then(m => ({ default: m.QuadraticRootTheory })))
const Grade9QuadrilateralMatcher = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/szimmetrikus-negyszogek/QuadrilateralMatcher").then(m => ({ default: m.QuadrilateralMatcher })))
const Grade9QuadrilateralQuiz = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/szimmetrikus-negyszogek/QuadrilateralQuiz").then(m => ({ default: m.QuadrilateralQuiz })))
const Grade9QuadrilateralSorter = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/szimmetrikus-negyszogek/QuadrilateralSorter").then(m => ({ default: m.QuadrilateralSorter })))
const Grade9QuadrilateralTheory = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/szimmetrikus-negyszogek/QuadrilateralTheory").then(m => ({ default: m.QuadrilateralTheory })))
const Grade9RationalIrrationalMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/racionalis-es-irracionalis-szamok/RationalIrrationalMatcher").then(m => ({ default: m.RationalIrrationalMatcher })))
const Grade9RationalIrrationalQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/racionalis-es-irracionalis-szamok/RationalIrrationalQuiz").then(m => ({ default: m.RationalIrrationalQuiz })))
const Grade9RationalIrrationalSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/racionalis-es-irracionalis-szamok/RationalIrrationalSorter").then(m => ({ default: m.RationalIrrationalSorter })))
const Grade9RationalIrrationalTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/racionalis-es-irracionalis-szamok/RationalIrrationalTheory").then(m => ({ default: m.RationalIrrationalTheory })))
const Grade9RotationMatcher = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/forgatas-es-kozeppontos-tukrozes/RotationMatcher").then(m => ({ default: m.RotationMatcher })))
const Grade9RotationQuiz = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/forgatas-es-kozeppontos-tukrozes/RotationQuiz").then(m => ({ default: m.RotationQuiz })))
const Grade9RotationSorter = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/forgatas-es-kozeppontos-tukrozes/RotationSorter").then(m => ({ default: m.RotationSorter })))
const Grade9RotationTheory = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/forgatas-es-kozeppontos-tukrozes/RotationTheory").then(m => ({ default: m.RotationTheory })))
const Grade9ScientificCalculationMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamolas-normalalakkal/ScientificCalculationMatcher").then(m => ({ default: m.ScientificCalculationMatcher })))
const Grade9ScientificCalculationQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamolas-normalalakkal/ScientificCalculationQuiz").then(m => ({ default: m.ScientificCalculationQuiz })))
const Grade9ScientificCalculationSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamolas-normalalakkal/ScientificCalculationSorter").then(m => ({ default: m.ScientificCalculationSorter })))
const Grade9ScientificCalculationTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamolas-normalalakkal/ScientificCalculationTheory").then(m => ({ default: m.ScientificCalculationTheory })))
const Grade9ScientificNotationMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamok-normalalakja/ScientificNotationMatcher").then(m => ({ default: m.ScientificNotationMatcher })))
const Grade9ScientificNotationQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamok-normalalakja/ScientificNotationQuiz").then(m => ({ default: m.ScientificNotationQuiz })))
const Grade9ScientificNotationSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamok-normalalakja/ScientificNotationSorter").then(m => ({ default: m.ScientificNotationSorter })))
const Grade9ScientificNotationTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/szamok-normalalakja/ScientificNotationTheory").then(m => ({ default: m.ScientificNotationTheory })))
const Grade9SetOperationsMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/halmazok-unioja-metszete-kulonbsege/SetOperationsMatcher").then(m => ({ default: m.SetOperationsMatcher })))
const Grade9SetOperationsQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/halmazok-unioja-metszete-kulonbsege/SetOperationsQuiz").then(m => ({ default: m.SetOperationsQuiz })))
const Grade9SetOperationsSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/halmazok-unioja-metszete-kulonbsege/SetOperationsSorter").then(m => ({ default: m.SetOperationsSorter })))
const Grade9SetOperationsTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/halmazok-unioja-metszete-kulonbsege/SetOperationsTheory").then(m => ({ default: m.SetOperationsTheory })))
const Grade9SetsMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/halmazok/SetsMatcher").then(m => ({ default: m.SetsMatcher })))
const Grade9SetsPracticeMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-halmazok/SetsPracticeMatcher").then(m => ({ default: m.SetsPracticeMatcher })))
const Grade9SetsPracticeQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-halmazok/SetsPracticeQuiz").then(m => ({ default: m.SetsPracticeQuiz })))
const Grade9SetsPracticeSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-halmazok/SetsPracticeSorter").then(m => ({ default: m.SetsPracticeSorter })))
const Grade9SetsPracticeTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/gyakorlas-halmazok/SetsPracticeTheory").then(m => ({ default: m.SetsPracticeTheory })))
const Grade9SetsQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/halmazok/SetsQuiz").then(m => ({ default: m.SetsQuiz })))
const Grade9SetsSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/halmazok/SetsSorter").then(m => ({ default: m.SetsSorter })))
const Grade9SetsTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/halmazok/SetsTheory").then(m => ({ default: m.SetsTheory })))
const Grade9SieveMatcher = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/a-szitaformula/SieveMatcher").then(m => ({ default: m.SieveMatcher })))
const Grade9SieveQuiz = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/a-szitaformula/SieveQuiz").then(m => ({ default: m.SieveQuiz })))
const Grade9SieveSorter = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/a-szitaformula/SieveSorter").then(m => ({ default: m.SieveSorter })))
const Grade9SieveTheory = lazy(() => import("@/components/math/grade-9/kombinatorika-halmazok/a-szitaformula/SieveTheory").then(m => ({ default: m.SieveTheory })))
const Grade9SlopeMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenesek-meredeksege/SlopeMatcher").then(m => ({ default: m.SlopeMatcher })))
const Grade9SlopeQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenesek-meredeksege/SlopeQuiz").then(m => ({ default: m.SlopeQuiz })))
const Grade9SlopeSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenesek-meredeksege/SlopeSorter").then(m => ({ default: m.SlopeSorter })))
const Grade9SlopeTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/egyenesek-meredeksege/SlopeTheory").then(m => ({ default: m.SlopeTheory })))
const Grade9SolvingQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/egyenletek-megoldasa/SolvingQuiz").then(m => ({ default: m.SolvingQuiz })))
const Grade9SolvingTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/egyenletek-megoldasa/SolvingTheory").then(m => ({ default: m.SolvingTheory })))
const Grade9SpecialProductsQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/nevezetes-szorzatok/SpecialProductsQuiz").then(m => ({ default: m.SpecialProductsQuiz })))
const Grade9SpecialProductsTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/nevezetes-szorzatok/SpecialProductsTheory").then(m => ({ default: m.SpecialProductsTheory })))
const Grade9SpecialTrianglesMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/kulonleges-derekszogu-haromszogek/SpecialTrianglesMatcher").then(m => ({ default: m.SpecialTrianglesMatcher })))
const Grade9SpecialTrianglesQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/kulonleges-derekszogu-haromszogek/SpecialTrianglesQuiz").then(m => ({ default: m.SpecialTrianglesQuiz })))
const Grade9SpecialTrianglesSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/kulonleges-derekszogu-haromszogek/SpecialTrianglesSorter").then(m => ({ default: m.SpecialTrianglesSorter })))
const Grade9SpecialTrianglesTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/kulonleges-derekszogu-haromszogek/SpecialTrianglesTheory").then(m => ({ default: m.SpecialTrianglesTheory })))
const Grade9SquareRootMatcher = lazy(() => import("@/components/math/grade-9/szamok-vilaga/a-negyzetgyok/SquareRootMatcher").then(m => ({ default: m.SquareRootMatcher })))
const Grade9SquareRootQuiz = lazy(() => import("@/components/math/grade-9/szamok-vilaga/a-negyzetgyok/SquareRootQuiz").then(m => ({ default: m.SquareRootQuiz })))
const Grade9SquareRootSorter = lazy(() => import("@/components/math/grade-9/szamok-vilaga/a-negyzetgyok/SquareRootSorter").then(m => ({ default: m.SquareRootSorter })))
const Grade9SquareRootTheory = lazy(() => import("@/components/math/grade-9/szamok-vilaga/a-negyzetgyok/SquareRootTheory").then(m => ({ default: m.SquareRootTheory })))
const Grade9SummaryMatcher = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/gyakorlas-tudasproba/SummaryMatcher").then(m => ({ default: m.SummaryMatcher })))
const Grade9SummaryQuiz = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/gyakorlas-tudasproba/SummaryQuiz").then(m => ({ default: m.SummaryQuiz })))
const Grade9SummarySorter = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/gyakorlas-tudasproba/SummarySorter").then(m => ({ default: m.SummarySorter })))
const Grade9SummaryTheory = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/gyakorlas-tudasproba/SummaryTheory").then(m => ({ default: m.SummaryTheory })))
const Grade9TablesMatcher = lazy(() => import("@/components/math/grade-9/fuggvenyek/tablazatok/TablesMatcher").then(m => ({ default: m.TablesMatcher })))
const Grade9TablesQuiz = lazy(() => import("@/components/math/grade-9/fuggvenyek/tablazatok/TablesQuiz").then(m => ({ default: m.TablesQuiz })))
const Grade9TablesSorter = lazy(() => import("@/components/math/grade-9/fuggvenyek/tablazatok/TablesSorter").then(m => ({ default: m.TablesSorter })))
const Grade9TablesTheory = lazy(() => import("@/components/math/grade-9/fuggvenyek/tablazatok/TablesTheory").then(m => ({ default: m.TablesTheory })))
const Grade9ThalesAppsMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-thalesz-tetel-alkalmazasai/ThalesAppsMatcher").then(m => ({ default: m.ThalesAppsMatcher })))
const Grade9ThalesAppsQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-thalesz-tetel-alkalmazasai/ThalesAppsQuiz").then(m => ({ default: m.ThalesAppsQuiz })))
const Grade9ThalesAppsSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-thalesz-tetel-alkalmazasai/ThalesAppsSorter").then(m => ({ default: m.ThalesAppsSorter })))
const Grade9ThalesAppsTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-thalesz-tetel-alkalmazasai/ThalesAppsTheory").then(m => ({ default: m.ThalesAppsTheory })))
const Grade9ThalesMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/thalesz-tetele/ThalesMatcher").then(m => ({ default: m.ThalesMatcher })))
const Grade9ThalesQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/thalesz-tetele/ThalesQuiz").then(m => ({ default: m.ThalesQuiz })))
const Grade9ThalesSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/thalesz-tetele/ThalesSorter").then(m => ({ default: m.ThalesSorter })))
const Grade9ThalesTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/thalesz-tetele/ThalesTheory").then(m => ({ default: m.ThalesTheory })))
const Grade9TriangleAreaMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/haromszogek-kerulete-es-terulete/TriangleAreaMatcher").then(m => ({ default: m.TriangleAreaMatcher })))
const Grade9TriangleAreaQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/haromszogek-kerulete-es-terulete/TriangleAreaQuiz").then(m => ({ default: m.TriangleAreaQuiz })))
const Grade9TriangleAreaSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/haromszogek-kerulete-es-terulete/TriangleAreaSorter").then(m => ({ default: m.TriangleAreaSorter })))
const Grade9TriangleAreaTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/haromszogek-kerulete-es-terulete/TriangleAreaTheory").then(m => ({ default: m.TriangleAreaTheory })))
const Grade9TriangleLines1Matcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-haromszog-nevezetes-vonalai-es-pontjai-1/TriangleLines1Matcher").then(m => ({ default: m.TriangleLines1Matcher })))
const Grade9TriangleLines1Quiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-haromszog-nevezetes-vonalai-es-pontjai-1/TriangleLines1Quiz").then(m => ({ default: m.TriangleLines1Quiz })))
const Grade9TriangleLines1Sorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-haromszog-nevezetes-vonalai-es-pontjai-1/TriangleLines1Sorter").then(m => ({ default: m.TriangleLines1Sorter })))
const Grade9TriangleLines1Theory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-haromszog-nevezetes-vonalai-es-pontjai-1/TriangleLines1Theory").then(m => ({ default: m.TriangleLines1Theory })))
const Grade9TriangleLines2Matcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-haromszog-nevezetes-vonalai-es-pontjai-2/TriangleLines2Matcher").then(m => ({ default: m.TriangleLines2Matcher })))
const Grade9TriangleLines2Quiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-haromszog-nevezetes-vonalai-es-pontjai-2/TriangleLines2Quiz").then(m => ({ default: m.TriangleLines2Quiz })))
const Grade9TriangleLines2Sorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-haromszog-nevezetes-vonalai-es-pontjai-2/TriangleLines2Sorter").then(m => ({ default: m.TriangleLines2Sorter })))
const Grade9TriangleLines2Theory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/a-haromszog-nevezetes-vonalai-es-pontjai-2/TriangleLines2Theory").then(m => ({ default: m.TriangleLines2Theory })))
const Grade9TrianglePracticeMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/gyakorlas-haromszogek/TrianglePracticeMatcher").then(m => ({ default: m.TrianglePracticeMatcher })))
const Grade9TrianglePracticeQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/gyakorlas-haromszogek/TrianglePracticeQuiz").then(m => ({ default: m.TrianglePracticeQuiz })))
const Grade9TrianglePracticeSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/gyakorlas-haromszogek/TrianglePracticeSorter").then(m => ({ default: m.TrianglePracticeSorter })))
const Grade9TrianglePracticeTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/gyakorlas-haromszogek/TrianglePracticeTheory").then(m => ({ default: m.TrianglePracticeTheory })))
const Grade9TrianglesMatcher = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/altalanos-es-szimmetrikus-haromszogek/TrianglesMatcher").then(m => ({ default: m.TrianglesMatcher })))
const Grade9TrianglesQuiz = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/altalanos-es-szimmetrikus-haromszogek/TrianglesQuiz").then(m => ({ default: m.TrianglesQuiz })))
const Grade9TrianglesSorter = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/altalanos-es-szimmetrikus-haromszogek/TrianglesSorter").then(m => ({ default: m.TrianglesSorter })))
const Grade9TrianglesTheory = lazy(() => import("@/components/math/grade-9/bevezetes-a-geometriaba/altalanos-es-szimmetrikus-haromszogek/TrianglesTheory").then(m => ({ default: m.TrianglesTheory })))
const Grade9VariablesMatcher = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/a-betuk-szerepe-a-szamolasban/VariablesMatcher").then(m => ({ default: m.VariablesMatcher })))
const Grade9VariablesQuiz = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/a-betuk-szerepe-a-szamolasban/VariablesQuiz").then(m => ({ default: m.VariablesQuiz })))
const Grade9VariablesSorter = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/a-betuk-szerepe-a-szamolasban/VariablesSorter").then(m => ({ default: m.VariablesSorter })))
const Grade9VariablesTheory = lazy(() => import("@/components/math/grade-9/egyenletek-azonossagok/a-betuk-szerepe-a-szamolasban/VariablesTheory").then(m => ({ default: m.VariablesTheory })))
const Grade9VectorMatcher = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/vektorok-es-az-eltolas/VectorMatcher").then(m => ({ default: m.VectorMatcher })))
const Grade9VectorQuiz = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/vektorok-es-az-eltolas/VectorQuiz").then(m => ({ default: m.VectorQuiz })))
const Grade9VectorSorter = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/vektorok-es-az-eltolas/VectorSorter").then(m => ({ default: m.VectorSorter })))
const Grade9VectorTheory = lazy(() => import("@/components/math/grade-9/egybevagosag-negyszogek/vektorok-es-az-eltolas/VectorTheory").then(m => ({ default: m.VectorTheory })))

export const Grade9Activities: React.FC<ActivityRouterProps> = ({
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
                  {activityType === 'g9-komb-hanyfelekeppen-theory' && (
                    <Grade9HowManyWaysTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-hanyfelekeppen-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-hanyfelekeppen-quiz' && (
                    <Grade9HowManyWaysQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-hanyfelekeppen-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-hanyfelekeppen-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-hanyfelekeppen-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-hanyfelekeppen-matcher' && (
                    <Grade9HowManyWaysMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-hanyfelekeppen-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-hanyfelekeppen-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-hanyfelekeppen-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-hanyfelekeppen-sorter' && (
                    <Grade9HowManyWaysSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-hanyfelekeppen-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-hanyfelekeppen-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-hanyfelekeppen-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 2. Gráfok */}

                  {activityType === 'g9-komb-grafok-theory' && (
                    <Grade9GraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-grafok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-grafok-quiz' && (
                    <Grade9GraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-grafok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-grafok-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-grafok-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-grafok-matcher' && (
                    <Grade9GraphsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-grafok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-grafok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-grafok-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-grafok-sorter' && (
                    <Grade9GraphsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-grafok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-grafok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-grafok-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 3. Számzárak */}

                  {activityType === 'g9-komb-szamzarak-theory' && (
                    <Grade9LocksTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-szamzarak-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-szamzarak-quiz' && (
                    <Grade9LocksQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-szamzarak-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-szamzarak-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-szamzarak-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-szamzarak-matcher' && (
                    <Grade9LocksMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-szamzarak-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-szamzarak-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-szamzarak-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-szamzarak-sorter' && (
                    <Grade9LocksSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-szamzarak-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-szamzarak-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-szamzarak-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 4. Folytatjuk az összeszámlálást */}

                  {activityType === 'g9-komb-osszeszamlalas-theory' && (
                    <Grade9CountingContTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-osszeszamlalas-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-osszeszamlalas-quiz' && (
                    <Grade9CountingContQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-osszeszamlalas-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-osszeszamlalas-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-osszeszamlalas-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-osszeszamlalas-matcher' && (
                    <Grade9CountingContMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-osszeszamlalas-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-osszeszamlalas-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-osszeszamlalas-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-osszeszamlalas-sorter' && (
                    <Grade9CountingContSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-osszeszamlalas-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-osszeszamlalas-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-osszeszamlalas-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 5. Gyakorlás (Kombinatorika) */}

                  {activityType === 'g9-komb-gyakorlas-theory' && (
                    <Grade9CombinatoricsPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-gyakorlas-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-gyakorlas-quiz' && (
                    <Grade9CombinatoricsPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-gyakorlas-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-gyakorlas-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-gyakorlas-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-gyakorlas-matcher' && (
                    <Grade9CombinatoricsPracticeMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-gyakorlas-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-gyakorlas-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-gyakorlas-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-gyakorlas-sorter' && (
                    <Grade9CombinatoricsPracticeSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-gyakorlas-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-gyakorlas-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-gyakorlas-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 6. Halmazok */}

                  {activityType === 'g9-komb-halmazok-theory' && (
                    <Grade9SetsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-halmazok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-halmazok-quiz' && (
                    <Grade9SetsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-halmazok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-halmazok-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-halmazok-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-halmazok-matcher' && (
                    <Grade9SetsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-halmazok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-halmazok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-halmazok-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-halmazok-sorter' && (
                    <Grade9SetsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-halmazok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-halmazok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-halmazok-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 7. Halmazok uniója, metszete, különbsége */}

                  {activityType === 'g9-komb-halmaz-muveletek-theory' && (
                    <Grade9SetOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-halmaz-muveletek-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-halmaz-muveletek-quiz' && (
                    <Grade9SetOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-halmaz-muveletek-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-halmaz-muveletek-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-halmaz-muveletek-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-halmaz-muveletek-matcher' && (
                    <Grade9SetOperationsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-halmaz-muveletek-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-halmaz-muveletek-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-halmaz-muveletek-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-halmaz-muveletek-sorter' && (
                    <Grade9SetOperationsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-halmaz-muveletek-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-halmaz-muveletek-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-halmaz-muveletek-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 8. A szitaformula */}

                  {activityType === 'g9-komb-szitaformula-theory' && (
                    <Grade9SieveTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-szitaformula-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-szitaformula-quiz' && (
                    <Grade9SieveQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-szitaformula-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-szitaformula-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-szitaformula-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-szitaformula-matcher' && (
                    <Grade9SieveMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-szitaformula-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-szitaformula-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-szitaformula-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-szitaformula-sorter' && (
                    <Grade9SieveSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-szitaformula-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-szitaformula-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-szitaformula-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 9. Intervallumok */}

                  {activityType === 'g9-komb-intervallumok-theory' && (
                    <Grade9IntervalsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-intervallumok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-intervallumok-quiz' && (
                    <Grade9IntervalsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-intervallumok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-intervallumok-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-intervallumok-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-intervallumok-matcher' && (
                    <Grade9IntervalsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-intervallumok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-intervallumok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-intervallumok-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-intervallumok-sorter' && (
                    <Grade9IntervalsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-intervallumok-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-intervallumok-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-intervallumok-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 10. Gyakorlás (Halmazok) */}

                  {activityType === 'g9-komb-gyakorlas-halmaz-theory' && (
                    <Grade9SetsPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-gyakorlas-halmaz-quiz' && (
                    <Grade9SetsPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-gyakorlas-halmaz-matcher' && (
                    <Grade9SetsPracticeMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-gyakorlas-halmaz-sorter' && (
                    <Grade9SetsPracticeSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-gyakorlas-halmaz-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - I. Kombinatorika, halmazok - 11. Gyakorlás, tudáspróba */}

                  {activityType === 'g9-komb-tudasproba-theory' && (
                    <Grade9KnowledgeTestTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-komb-tudasproba-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-tudasproba-quiz' && (
                    <Grade9KnowledgeTestQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-tudasproba-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-tudasproba-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-tudasproba-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-tudasproba-matcher' && (
                    <Grade9KnowledgeTestMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-tudasproba-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-tudasproba-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-komb-tudasproba-sorter', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {activityType === 'g9-komb-tudasproba-sorter' && (
                    <Grade9KnowledgeTestSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-komb-tudasproba-quiz', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-komb-tudasproba-theory', selectedTopic || 'g9-kombinatorika-halmazok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-komb-tudasproba-matcher', selectedTopic || 'g9-kombinatorika-halmazok')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 1. Műveletek számhalmazokban */}

                  {activityType === 'g9-szamok-muveletek-theory' && (
                    <Grade9NumberSetsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-muveletek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-muveletek-quiz' && (
                    <Grade9NumberSetsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-muveletek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-muveletek-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-muveletek-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-muveletek-matcher' && (
                    <Grade9NumberSetsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-muveletek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-muveletek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-muveletek-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-muveletek-sorter' && (
                    <Grade9NumberSetsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-muveletek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-muveletek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-muveletek-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 2. Számolás törtekkel */}

                  {activityType === 'g9-szamok-tortek-theory' && (
                    <Grade9FractionsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-tortek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-tortek-quiz' && (
                    <Grade9FractionsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-tortek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-tortek-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-tortek-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-tortek-matcher' && (
                    <Grade9FractionsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-tortek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-tortek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-tortek-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-tortek-sorter' && (
                    <Grade9FractionsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-tortek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-tortek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-tortek-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 3. Racionális és irracionális számok */}

                  {activityType === 'g9-szamok-racionalis-theory' && (
                    <Grade9RationalIrrationalTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-racionalis-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-racionalis-quiz' && (
                    <Grade9RationalIrrationalQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-racionalis-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-racionalis-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-racionalis-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-racionalis-matcher' && (
                    <Grade9RationalIrrationalMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-racionalis-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-racionalis-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-racionalis-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-racionalis-sorter' && (
                    <Grade9RationalIrrationalSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-racionalis-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-racionalis-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-racionalis-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 4. Arányosság */}

                  {activityType === 'g9-szamok-aranyossag-theory' && (
                    <Grade9ProportionalityTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-aranyossag-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-aranyossag-quiz' && (
                    <Grade9ProportionalityQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-aranyossag-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-aranyossag-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-aranyossag-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-aranyossag-matcher' && (
                    <Grade9ProportionalityMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-aranyossag-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-aranyossag-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-aranyossag-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-aranyossag-sorter' && (
                    <Grade9ProportionalitySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-aranyossag-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-aranyossag-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-aranyossag-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 5. Arányos osztás */}

                  {activityType === 'g9-szamok-aranyos-osztas-theory' && (
                    <Grade9ProportionalDivisionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-aranyos-osztas-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-aranyos-osztas-quiz' && (
                    <Grade9ProportionalDivisionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-aranyos-osztas-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-aranyos-osztas-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-aranyos-osztas-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-aranyos-osztas-matcher' && (
                    <Grade9ProportionalDivisionMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-aranyos-osztas-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-aranyos-osztas-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-aranyos-osztas-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-aranyos-osztas-sorter' && (
                    <Grade9ProportionalDivisionSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-aranyos-osztas-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-aranyos-osztas-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-aranyos-osztas-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 6. Százalékszámítás */}

                  {activityType === 'g9-szamok-szazalek-theory' && (
                    <Grade9PercentageTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-szazalek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-szazalek-quiz' && (
                    <Grade9PercentageQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-szazalek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-szazalek-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-szazalek-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-szazalek-matcher' && (
                    <Grade9PercentageMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-szazalek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-szazalek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-szazalek-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-szazalek-sorter' && (
                    <Grade9PercentageSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-szazalek-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-szazalek-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-szazalek-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 7. Hatványozás */}

                  {activityType === 'g9-szamok-hatvany-theory' && (
                    <Grade9PowersTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-hatvany-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-hatvany-quiz' && (
                    <Grade9PowersQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-hatvany-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-hatvany-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-hatvany-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-hatvany-matcher' && (
                    <Grade9PowersMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-hatvany-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-hatvany-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-hatvany-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-hatvany-sorter' && (
                    <Grade9PowersSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-hatvany-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-hatvany-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-hatvany-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 8. Gyakorlás (Hatványozás) */}

                  {activityType === 'g9-szamok-gyakorlas-hatvany-theory' && (
                    <Grade9PowersPracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-gyakorlas-hatvany-quiz' && (
                    <Grade9PowersPracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-gyakorlas-hatvany-matcher' && (
                    <Grade9PowersPracticeMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-gyakorlas-hatvany-sorter' && (
                    <Grade9PowersPracticeSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-gyakorlas-hatvany-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 9. A négyzetgyök */}

                  {activityType === 'g9-szamok-negyzetgyok-theory' && (
                    <Grade9SquareRootTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-negyzetgyok-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-negyzetgyok-quiz' && (
                    <Grade9SquareRootQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-negyzetgyok-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-negyzetgyok-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-negyzetgyok-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-negyzetgyok-matcher' && (
                    <Grade9SquareRootMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-negyzetgyok-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-negyzetgyok-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-negyzetgyok-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-negyzetgyok-sorter' && (
                    <Grade9SquareRootSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-negyzetgyok-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-negyzetgyok-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-negyzetgyok-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 10. Számok normálalakja */}

                  {activityType === 'g9-szamok-normalalak-theory' && (
                    <Grade9ScientificNotationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-normalalak-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-normalalak-quiz' && (
                    <Grade9ScientificNotationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-normalalak-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-normalalak-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-normalalak-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-normalalak-matcher' && (
                    <Grade9ScientificNotationMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-normalalak-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-normalalak-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-normalalak-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-normalalak-sorter' && (
                    <Grade9ScientificNotationSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-normalalak-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-normalalak-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-normalalak-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 11. Számolás normálalakkal */}

                  {activityType === 'g9-szamok-szamolas-normalalak-theory' && (
                    <Grade9ScientificCalculationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-szamolas-normalalak-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-szamolas-normalalak-quiz' && (
                    <Grade9ScientificCalculationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-szamolas-normalalak-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-szamolas-normalalak-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-szamolas-normalalak-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-szamolas-normalalak-matcher' && (
                    <Grade9ScientificCalculationMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-szamolas-normalalak-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-szamolas-normalalak-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-szamolas-normalalak-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-szamolas-normalalak-sorter' && (
                    <Grade9ScientificCalculationSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-szamolas-normalalak-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-szamolas-normalalak-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-szamolas-normalalak-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 12. Kamatos kamat */}

                  {activityType === 'g9-szamok-kamatos-kamat-theory' && (
                    <Grade9CompoundInterestTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-kamatos-kamat-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-kamatos-kamat-quiz' && (
                    <Grade9CompoundInterestQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-kamatos-kamat-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-kamatos-kamat-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-kamatos-kamat-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-kamatos-kamat-matcher' && (
                    <Grade9CompoundInterestMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-kamatos-kamat-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-kamatos-kamat-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-kamatos-kamat-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-kamatos-kamat-sorter' && (
                    <Grade9CompoundInterestSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-kamatos-kamat-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-kamatos-kamat-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-kamatos-kamat-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - II. A számok világa - 13. Gyakorlás, tudáspróba */}

                  {activityType === 'g9-szamok-tudasproba-theory' && (
                    <Grade9Chapter2KnowledgeTestTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-szamok-tudasproba-quiz', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-tudasproba-quiz' && (
                    <Grade9Chapter2KnowledgeTestQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-tudasproba-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-tudasproba-matcher', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-tudasproba-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-tudasproba-matcher' && (
                    <Grade9Chapter2KnowledgeTestMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-tudasproba-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-tudasproba-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToSorter={() => handleActivitySelect('g9-szamok-tudasproba-sorter', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {activityType === 'g9-szamok-tudasproba-sorter' && (
                    <Grade9Chapter2KnowledgeTestSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-szamok-tudasproba-quiz', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToTheory={() => handleActivitySelect('g9-szamok-tudasproba-theory', selectedTopic || 'g9-szamok-vilaga')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-szamok-tudasproba-matcher', selectedTopic || 'g9-szamok-vilaga')}
                    />
                  )}

                  {/* 9. Osztály - III. Egyenletek és azonosságok - 1. A betűk szerepe a számolásban */}

                  {activityType === 'g9-egyenlet-betuk-theory' && (
                    <Grade9VariablesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-betuk-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-betuk-quiz' && (
                    <Grade9VariablesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-betuk-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-egyenlet-betuk-matcher', selectedTopic || 'g9-egyenletek-azonossagok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-egyenlet-betuk-sorter', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-betuk-matcher' && (
                    <Grade9VariablesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-egyenlet-betuk-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-betuk-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                      onSwitchToSorter={() => handleActivitySelect('g9-egyenlet-betuk-sorter', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-betuk-sorter' && (
                    <Grade9VariablesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-egyenlet-betuk-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-betuk-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-egyenlet-betuk-matcher', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. Osztály - III. Egyenletek és azonosságok - 2. Számolás az algebrában */}

                  {activityType === 'g9-egyenlet-algebrai-szamolas-theory' && (
                    <Grade9AlgebraicOperationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-algebrai-szamolas-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-algebrai-szamolas-quiz' && (
                    <Grade9AlgebraicOperationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-algebrai-szamolas-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. Osztály - III. Egyenletek és azonosságok - 3. Nevezetes szorzatok */}

                  {activityType === 'g9-egyenlet-nevezetes-theory' && (
                    <Grade9SpecialProductsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-nevezetes-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-nevezetes-quiz' && (
                    <Grade9SpecialProductsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-nevezetes-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. Osztály - III. Egyenletek és azonosságok - 4. Szorzattá alakítás */}

                  {activityType === 'g9-egyenlet-szorzatta-theory' && (
                    <Grade9FactorizationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-szorzatta-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-szorzatta-quiz' && (
                    <Grade9FactorizationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-szorzatta-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. OsztĂˇly - III. Egyenletek Ă©s azonossĂˇgok - 5. Egyenletek */}

                  {activityType === 'g9-egyenlet-alap-theory' && (
                    <Grade9EquationsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-alap-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-alap-quiz' && (
                    <Grade9EquationsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-alap-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. OsztĂˇly - III. Egyenletek Ă©s azonossĂˇgok - 6. ProblĂ©mamegoldĂˇs egyenletekkel */}

                  {activityType === 'g9-egyenlet-problemamegoldas-theory' && (
                    <Grade9ProblemSolvingTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-problemamegoldas-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-problemamegoldas-quiz' && (
                    <Grade9ProblemSolvingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-problemamegoldas-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. OsztĂˇly - III. Egyenletek Ă©s azonossĂˇgok - 7. Alaphalmaz, Ă©rtelmezĂ©si tartomĂˇny, megoldĂˇshalmaz */}

                  {activityType === 'g9-egyenlet-alaphalmaz-theory' && (
                    <Grade9DomainTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-alaphalmaz-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-alaphalmaz-quiz' && (
                    <Grade9DomainQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-alaphalmaz-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. OsztĂˇly - III. Egyenletek Ă©s azonossĂˇgok - 8. Egyenletek megoldĂˇsa */}

                  {activityType === 'g9-egyenlet-megoldasa-theory' && (
                    <Grade9SolvingTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-megoldasa-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-megoldasa-quiz' && (
                    <Grade9SolvingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-megoldasa-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. OsztĂˇly - III. Egyenletek Ă©s azonossĂˇgok - 9. ElsĹ‘fokĂş kĂ©tismeretlenes egyenletrendszer */}

                  {activityType === 'g9-egyenlet-rendszerek-theory' && (
                    <Grade9LinearSystemsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-rendszerek-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-rendszerek-quiz' && (
                    <Grade9LinearSystemsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-rendszerek-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. Osztály - III. Egyenletek és azonosságok - 10. Gyakorlás, tudáspróba */}

                  {activityType === 'g9-egyenlet-gyakorlas-theory' && (
                    <Grade9PracticeTestTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-egyenlet-gyakorlas-quiz', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {activityType === 'g9-egyenlet-gyakorlas-quiz' && (
                    <Grade9PracticeTestQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-egyenlet-gyakorlas-theory', selectedTopic || 'g9-egyenletek-azonossagok')}
                    />
                  )}

                  {/* 9. Osztály - IV. Bevezetés a geometriába - 1. A sík geometriája */}

                  {activityType === 'g9-geom-sik-theory' && (
                    <Grade9PlaneGeometryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-sik-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-sik-quiz' && (
                    <Grade9PlaneGeometryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-sik-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-sik-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-sik-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-sik-matcher' && (
                    <Grade9PlaneGeometryMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-sik-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-sik-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-sik-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-sik-sorter' && (
                    <Grade9PlaneGeometrySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-sik-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-sik-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-sik-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {/* 9. Osztály - IV. Bevezetés a geometriába - 2. Általános és szimmetrikus háromszögek */}

                  {activityType === 'g9-geom-haromszogek-theory' && (
                    <Grade9TrianglesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-haromszogek-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-haromszogek-quiz' && (
                    <Grade9TrianglesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-haromszogek-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-haromszogek-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-haromszogek-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-haromszogek-matcher' && (
                    <Grade9TrianglesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-haromszogek-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-haromszogek-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-haromszogek-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-haromszogek-sorter' && (
                    <Grade9TrianglesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-haromszogek-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-haromszogek-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-haromszogek-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {/* 9. Osztály - IV. Bevezetés a geometriába - 3. Pitagorasz tétele */}

                  {activityType === 'g9-geom-pitagorasz-theory' && (
                    <Grade9PythagorasTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-pitagorasz-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-pitagorasz-quiz' && (
                    <Grade9PythagorasQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-pitagorasz-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-pitagorasz-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-pitagorasz-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-pitagorasz-matcher' && (
                    <Grade9PythagorasMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-pitagorasz-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-pitagorasz-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-pitagorasz-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-pitagorasz-sorter' && (
                    <Grade9PythagorasSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-pitagorasz-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-pitagorasz-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-pitagorasz-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {/* 9. Osztály - IV. Bevezetés a geometriába - 4. Különleges derékszögű háromszögek */}

                  {activityType === 'g9-geom-kulonleges-derekszogu-theory' && (
                    <Grade9SpecialTrianglesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-kulonleges-derekszogu-quiz' && (
                    <Grade9SpecialTrianglesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-kulonleges-derekszogu-matcher' && (
                    <Grade9SpecialTrianglesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-kulonleges-derekszogu-sorter' && (
                    <Grade9SpecialTrianglesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-kulonleges-derekszogu-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {/* 9. Osztály - IV. Bevezetés a geometriába - 5. Távolságok */}

                  {activityType === 'g9-geom-tavolsagok-theory' && (
                    <Grade9DistancesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-tavolsagok-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-tavolsagok-quiz' && (
                    <Grade9DistancesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-tavolsagok-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-tavolsagok-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-tavolsagok-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-tavolsagok-matcher' && (
                    <Grade9DistancesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-tavolsagok-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-tavolsagok-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-tavolsagok-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-tavolsagok-sorter' && (
                    <Grade9DistancesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-tavolsagok-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-tavolsagok-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-tavolsagok-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {/* 9. Osztály - IV. Bevezetés a geometriába - 6. A kör */}

                  {activityType === 'g9-geom-kor-theory' && (
                    <Grade9CircleTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-kor-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-kor-quiz' && (
                    <Grade9CircleQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-kor-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-kor-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-kor-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-kor-matcher' && (
                    <Grade9CircleMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-kor-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-kor-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-kor-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-kor-sorter' && (
                    <Grade9CircleSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-kor-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-kor-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-kor-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-nevezetes-vonalak-1-theory' && (
                    <Grade9TriangleLines1Theory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-nevezetes-vonalak-1-quiz' && (
                    <Grade9TriangleLines1Quiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-nevezetes-vonalak-1-matcher' && (
                    <Grade9TriangleLines1Matcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-nevezetes-vonalak-1-sorter' && (
                    <Grade9TriangleLines1Sorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-nevezetes-vonalak-1-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-nevezetes-vonalak-2-theory' && (
                    <Grade9TriangleLines2Theory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-nevezetes-vonalak-2-quiz' && (
                    <Grade9TriangleLines2Quiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-nevezetes-vonalak-2-matcher' && (
                    <Grade9TriangleLines2Matcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-nevezetes-vonalak-2-sorter' && (
                    <Grade9TriangleLines2Sorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-nevezetes-vonalak-2-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-gyakorlas-theory' && (
                    <Grade9TrianglePracticeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-gyakorlas-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-gyakorlas-quiz' && (
                    <Grade9TrianglePracticeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-gyakorlas-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-gyakorlas-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-gyakorlas-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-gyakorlas-matcher' && (
                    <Grade9TrianglePracticeMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-gyakorlas-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-gyakorlas-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-gyakorlas-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-gyakorlas-sorter' && (
                    <Grade9TrianglePracticeSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-gyakorlas-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-gyakorlas-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-gyakorlas-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-thalesz-theory' && (
                    <Grade9ThalesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-thalesz-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-thalesz-quiz' && (
                    <Grade9ThalesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-thalesz-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-thalesz-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-thalesz-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-thalesz-matcher' && (
                    <Grade9ThalesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-thalesz-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-thalesz-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-thalesz-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-thalesz-sorter' && (
                    <Grade9ThalesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-thalesz-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-thalesz-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-thalesz-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-thalesz-alkalmazas-theory' && (
                    <Grade9ThalesAppsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-thalesz-alkalmazas-quiz' && (
                    <Grade9ThalesAppsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-thalesz-alkalmazas-matcher' && (
                    <Grade9ThalesAppsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-thalesz-alkalmazas-sorter' && (
                    <Grade9ThalesAppsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-thalesz-alkalmazas-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-haromszog-kerulet-terulet-theory' && (
                    <Grade9TriangleAreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-haromszog-kerulet-terulet-quiz' && (
                    <Grade9TriangleAreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-haromszog-kerulet-terulet-matcher' && (
                    <Grade9TriangleAreaMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-haromszog-kerulet-terulet-sorter' && (
                    <Grade9TriangleAreaSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-haromszog-kerulet-terulet-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-tudasproba-theory' && (
                    <Grade9GeometryReviewTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-geom-tudasproba-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-tudasproba-quiz' && (
                    <Grade9GeometryReviewQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-tudasproba-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-tudasproba-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-tudasproba-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-tudasproba-matcher' && (
                    <Grade9GeometryReviewMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-tudasproba-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-tudasproba-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToSorter={() => handleActivitySelect('g9-geom-tudasproba-sorter', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {activityType === 'g9-geom-tudasproba-sorter' && (
                    <Grade9GeometryReviewSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-geom-tudasproba-quiz', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToTheory={() => handleActivitySelect('g9-geom-tudasproba-theory', selectedTopic || 'g9-bevezetes-geometriaba')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-geom-tudasproba-matcher', selectedTopic || 'g9-bevezetes-geometriaba')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 1. Táblázatok */}

                  {activityType === 'g9-func-tablazatok-theory' && (
                    <Grade9TablesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-tablazatok-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-tablazatok-quiz' && (
                    <Grade9TablesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-tablazatok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-tablazatok-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-tablazatok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-tablazatok-matcher' && (
                    <Grade9TablesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-tablazatok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-tablazatok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-tablazatok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-tablazatok-sorter' && (
                    <Grade9TablesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-tablazatok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-tablazatok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-tablazatok-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 2. Diagramok */}

                  {activityType === 'g9-func-diagramok-theory' && (
                    <Grade9DiagramsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-diagramok-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-diagramok-quiz' && (
                    <Grade9DiagramsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-diagramok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-diagramok-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-diagramok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-diagramok-matcher' && (
                    <Grade9DiagramsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-diagramok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-diagramok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-diagramok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-diagramok-sorter' && (
                    <Grade9DiagramsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-diagramok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-diagramok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-diagramok-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 3. Változások ábrázolása */}

                  {activityType === 'g9-func-valtozasok-theory' && (
                    <Grade9ChangesTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-valtozasok-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-valtozasok-quiz' && (
                    <Grade9ChangesQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-valtozasok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-valtozasok-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-valtozasok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-valtozasok-matcher' && (
                    <Grade9ChangesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-valtozasok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-valtozasok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-valtozasok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-valtozasok-sorter' && (
                    <Grade9ChangesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-valtozasok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-valtozasok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-valtozasok-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 4. Grafikonok a mindennapokban */}

                  {activityType === 'g9-func-mindennapok-theory' && (
                    <Grade9EverydayGraphsTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-mindennapok-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-mindennapok-quiz' && (
                    <Grade9EverydayGraphsQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-mindennapok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-mindennapok-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-mindennapok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-mindennapok-matcher' && (
                    <Grade9EverydayGraphsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-mindennapok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-mindennapok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-mindennapok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-mindennapok-sorter' && (
                    <Grade9EverydayGraphsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-mindennapok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-mindennapok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-mindennapok-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 5. A függvény fogalma */}

                  {activityType === 'g9-func-fogalom-theory' && (
                    <Grade9FunctionConceptTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-fogalom-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-fogalom-quiz' && (
                    <Grade9FunctionConceptQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-fogalom-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-fogalom-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-fogalom-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-fogalom-matcher' && (
                    <Grade9FunctionConceptMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-fogalom-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-fogalom-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-fogalom-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-fogalom-sorter' && (
                    <Grade9FunctionConceptSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-fogalom-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-fogalom-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-fogalom-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 6. Készítsünk grafikont! */}

                  {activityType === 'g9-func-grafikon-theory' && (
                    <Grade9PlottingTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-grafikon-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-grafikon-quiz' && (
                    <Grade9PlottingQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-grafikon-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-grafikon-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-grafikon-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-grafikon-matcher' && (
                    <Grade9PlottingMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-grafikon-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-grafikon-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-grafikon-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-grafikon-sorter' && (
                    <Grade9PlottingSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-grafikon-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-grafikon-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-grafikon-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 7. Az egyenes és fordított arányosság függvénye */}

                  {activityType === 'g9-func-aranyossag-theory' && (
                    <Grade9FuncProportionalityTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-aranyossag-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-aranyossag-quiz' && (
                    <Grade9FuncProportionalityQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-aranyossag-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-aranyossag-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-aranyossag-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-aranyossag-matcher' && (
                    <Grade9FuncProportionalityMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-aranyossag-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-aranyossag-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-aranyossag-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-aranyossag-sorter' && (
                    <Grade9FuncProportionalitySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-aranyossag-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-aranyossag-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-aranyossag-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 8. Egyenesek meredeksége */}

                  {activityType === 'g9-func-meredekseg-theory' && (
                    <Grade9SlopeTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-meredekseg-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-meredekseg-quiz' && (
                    <Grade9SlopeQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-meredekseg-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-meredekseg-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-meredekseg-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-meredekseg-matcher' && (
                    <Grade9SlopeMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-meredekseg-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-meredekseg-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-meredekseg-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-meredekseg-sorter' && (
                    <Grade9SlopeSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-meredekseg-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-meredekseg-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-meredekseg-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 9. Lineáris függvények */}

                  {activityType === 'g9-func-linearis-theory' && (
                    <Grade9LinearTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-linearis-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-linearis-quiz' && (
                    <Grade9LinearQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-linearis-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-linearis-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-linearis-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-linearis-matcher' && (
                    <Grade9LinearMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-linearis-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-linearis-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-linearis-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-linearis-sorter' && (
                    <Grade9LinearSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-linearis-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-linearis-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-linearis-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 10. Abszolútérték-függvény */}

                  {activityType === 'g9-func-abszolut-theory' && (
                    <Grade9AbsValueTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-abszolut-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-abszolut-quiz' && (
                    <Grade9AbsValueQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-abszolut-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-abszolut-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-abszolut-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-abszolut-matcher' && (
                    <Grade9AbsValueMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-abszolut-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-abszolut-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-abszolut-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-abszolut-sorter' && (
                    <Grade9AbsValueSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-abszolut-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-abszolut-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-abszolut-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 11. Függvények jellemzése */}

                  {activityType === 'g9-func-jellemzes-theory' && (
                    <Grade9CharacterizationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-jellemzes-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-jellemzes-quiz' && (
                    <Grade9CharacterizationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-jellemzes-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-jellemzes-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-jellemzes-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-jellemzes-matcher' && (
                    <Grade9CharacterizationMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-jellemzes-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-jellemzes-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-jellemzes-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-jellemzes-sorter' && (
                    <Grade9CharacterizationSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-jellemzes-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-jellemzes-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-jellemzes-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 12. Szélsőértékek */}

                  {activityType === 'g9-func-szelsoertek-theory' && (
                    <Grade9ExtremaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-szelsoertek-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-szelsoertek-quiz' && (
                    <Grade9ExtremaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-szelsoertek-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-szelsoertek-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-szelsoertek-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-szelsoertek-matcher' && (
                    <Grade9ExtremaMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-szelsoertek-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-szelsoertek-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-szelsoertek-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-szelsoertek-sorter' && (
                    <Grade9ExtremaSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-szelsoertek-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-szelsoertek-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-szelsoertek-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 13. Másodfokú és négyzetgyök-függvény */}

                  {activityType === 'g9-func-masodfoku-gyok-theory' && (
                    <Grade9QuadraticRootTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-masodfoku-gyok-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-masodfoku-gyok-quiz' && (
                    <Grade9QuadraticRootQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-masodfoku-gyok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-masodfoku-gyok-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-masodfoku-gyok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-masodfoku-gyok-matcher' && (
                    <Grade9QuadraticRootMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-masodfoku-gyok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-masodfoku-gyok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-masodfoku-gyok-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-masodfoku-gyok-sorter' && (
                    <Grade9QuadraticRootSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-masodfoku-gyok-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-masodfoku-gyok-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-masodfoku-gyok-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 14. Gyakorlati feladatok */}

                  {activityType === 'g9-func-gyakorlat-theory' && (
                    <Grade9PracticalTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-gyakorlat-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-gyakorlat-quiz' && (
                    <Grade9PracticalQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-gyakorlat-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-gyakorlat-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-gyakorlat-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-gyakorlat-matcher' && (
                    <Grade9PracticalMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-gyakorlat-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-gyakorlat-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-gyakorlat-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-gyakorlat-sorter' && (
                    <Grade9PracticalSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-gyakorlat-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-gyakorlat-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-gyakorlat-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 15. Egyenletek grafikus megoldása */}

                  {activityType === 'g9-func-grafikus-egyenlet-theory' && (
                    <Grade9GraphicEqTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-grafikus-egyenlet-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-grafikus-egyenlet-quiz' && (
                    <Grade9GraphicEqQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-grafikus-egyenlet-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-grafikus-egyenlet-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-grafikus-egyenlet-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-grafikus-egyenlet-matcher' && (
                    <Grade9GraphicEqMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-grafikus-egyenlet-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-grafikus-egyenlet-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-grafikus-egyenlet-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-grafikus-egyenlet-sorter' && (
                    <Grade9GraphicEqSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-grafikus-egyenlet-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-grafikus-egyenlet-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-grafikus-egyenlet-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 16. Egyenlőtlenségek */}

                  {activityType === 'g9-func-egyenlotlenseg-theory' && (
                    <Grade9InequalityTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-egyenlotlenseg-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-egyenlotlenseg-quiz' && (
                    <Grade9InequalityQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-egyenlotlenseg-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-egyenlotlenseg-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-egyenlotlenseg-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-egyenlotlenseg-matcher' && (
                    <Grade9InequalityMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-egyenlotlenseg-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-egyenlotlenseg-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-egyenlotlenseg-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-egyenlotlenseg-sorter' && (
                    <Grade9InequalitySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-egyenlotlenseg-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-egyenlotlenseg-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-egyenlotlenseg-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 17. Abszolút értékes egyenletek */}

                  {activityType === 'g9-func-abszolut-egyenlet-theory' && (
                    <Grade9AbsEquationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-abszolut-egyenlet-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-abszolut-egyenlet-quiz' && (
                    <Grade9AbsEquationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-abszolut-egyenlet-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-abszolut-egyenlet-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-abszolut-egyenlet-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-abszolut-egyenlet-matcher' && (
                    <Grade9AbsEquationMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-abszolut-egyenlet-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-abszolut-egyenlet-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-abszolut-egyenlet-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-abszolut-egyenlet-sorter' && (
                    <Grade9AbsEquationSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-abszolut-egyenlet-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-abszolut-egyenlet-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-abszolut-egyenlet-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - V. Függvények - 18. Gyakorlás, tudáspróba */}

                  {activityType === 'g9-func-tudasproba-theory' && (
                    <Grade9FuncPracticeExamTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-func-tudasproba-quiz', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-tudasproba-quiz' && (
                    <Grade9FuncPracticeExamQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-tudasproba-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-tudasproba-matcher', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-tudasproba-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-tudasproba-matcher' && (
                    <Grade9FuncPracticeExamMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-tudasproba-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-tudasproba-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-func-tudasproba-sorter', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {activityType === 'g9-func-tudasproba-sorter' && (
                    <Grade9FuncPracticeExamSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-func-tudasproba-quiz', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-func-tudasproba-theory', selectedTopic || 'g9-fuggvenyek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-func-tudasproba-matcher', selectedTopic || 'g9-fuggvenyek')}
                    />
                  )}

                  {/* 9. Osztály - VI. Egybevágóság, négyszögek - 1. Forgatás és középpontos tükrözés */}

                  {activityType === 'g9-trans-forgatas-theory' && (
                    <Grade9RotationTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-trans-forgatas-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-forgatas-quiz' && (
                    <Grade9RotationQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-forgatas-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-forgatas-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-forgatas-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-forgatas-matcher' && (
                    <Grade9RotationMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-forgatas-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-forgatas-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-forgatas-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-forgatas-sorter' && (
                    <Grade9RotationSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-forgatas-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-forgatas-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-forgatas-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {/* 9. Osztály - VI. Egybevágóság, négyszögek - 2. Vektorok és az eltolás */}

                  {activityType === 'g9-trans-vektorok-theory' && (
                    <Grade9VectorTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-trans-vektorok-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-vektorok-quiz' && (
                    <Grade9VectorQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-vektorok-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-vektorok-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-vektorok-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-vektorok-matcher' && (
                    <Grade9VectorMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-vektorok-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-vektorok-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-vektorok-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-vektorok-sorter' && (
                    <Grade9VectorSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-vektorok-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-vektorok-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-vektorok-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {/* 9. Osztály - VI. Egybevágóság, négyszögek - 3. Tengelyes tükrözés */}

                  {activityType === 'g9-trans-tengelyes-theory' && (
                    <Grade9AxialTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-trans-tengelyes-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-tengelyes-quiz' && (
                    <Grade9AxialQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-tengelyes-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-tengelyes-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-tengelyes-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-tengelyes-matcher' && (
                    <Grade9AxialMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-tengelyes-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-tengelyes-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-tengelyes-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-tengelyes-sorter' && (
                    <Grade9AxialSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-tengelyes-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-tengelyes-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-tengelyes-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {/* 9. Osztály - VI. Egybevágóság, négyszögek - 4. Szerkesztések */}

                  {activityType === 'g9-trans-szerkesztes-theory' && (
                    <Grade9ConstructionTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-trans-szerkesztes-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-szerkesztes-quiz' && (
                    <Grade9ConstructionQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-szerkesztes-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-szerkesztes-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-szerkesztes-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-szerkesztes-matcher' && (
                    <Grade9ConstructionMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-szerkesztes-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-szerkesztes-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-szerkesztes-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-szerkesztes-sorter' && (
                    <Grade9ConstructionSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-szerkesztes-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-szerkesztes-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-szerkesztes-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {/* 9. Osztály - VI. Egybevágóság, négyszögek - 5. Egybevágósági transzformációk a gyakorlatban */}

                  {activityType === 'g9-trans-gyakorlat-theory' && (
                    <Grade9AppliedTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-trans-gyakorlat-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-gyakorlat-quiz' && (
                    <Grade9AppliedQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-gyakorlat-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-gyakorlat-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-gyakorlat-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-gyakorlat-matcher' && (
                    <Grade9AppliedMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-gyakorlat-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-gyakorlat-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-gyakorlat-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-gyakorlat-sorter' && (
                    <Grade9AppliedSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-gyakorlat-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-gyakorlat-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-gyakorlat-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {/* 9. Osztály - VI. Egybevágóság, négyszögek - 6. Szimmetrikus négyszögek */}

                  {activityType === 'g9-trans-negyszogek-theory' && (
                    <Grade9QuadrilateralTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-trans-negyszogek-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-negyszogek-quiz' && (
                    <Grade9QuadrilateralQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-negyszogek-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-negyszogek-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-negyszogek-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-negyszogek-matcher' && (
                    <Grade9QuadrilateralMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-negyszogek-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-negyszogek-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-negyszogek-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-negyszogek-sorter' && (
                    <Grade9QuadrilateralSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-negyszogek-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-negyszogek-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-negyszogek-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {/* 9. Osztály - VI. Egybevágóság, négyszögek - 7. Nevezetes négyszögek területe */}

                  {activityType === 'g9-trans-terulet-theory' && (
                    <Grade9AreaTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-trans-terulet-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-terulet-quiz' && (
                    <Grade9AreaQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-terulet-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-terulet-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-terulet-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-terulet-matcher' && (
                    <Grade9AreaMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-terulet-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-terulet-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-terulet-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-terulet-sorter' && (
                    <Grade9AreaSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-terulet-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-terulet-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-terulet-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {/* 9. Osztály - VI. Egybevágóság, négyszögek - 8. Gyakorlás, tudáspróba */}

                  {activityType === 'g9-trans-osszefoglalas-theory' && (
                    <Grade9SummaryTheory
                      onBack={handleBack}
                      onStartQuiz={() => handleActivitySelect('g9-trans-osszefoglalas-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-osszefoglalas-quiz' && (
                    <Grade9SummaryQuiz
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-osszefoglalas-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-osszefoglalas-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-osszefoglalas-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-osszefoglalas-matcher' && (
                    <Grade9SummaryMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-osszefoglalas-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-osszefoglalas-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToSorter={() => handleActivitySelect('g9-trans-osszefoglalas-sorter', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {activityType === 'g9-trans-osszefoglalas-sorter' && (
                    <Grade9SummarySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => handleActivitySelect('g9-trans-osszefoglalas-quiz', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToTheory={() => handleActivitySelect('g9-trans-osszefoglalas-theory', selectedTopic || 'g9-egybevagosag-negyszogek')}
                      onSwitchToMatcher={() => handleActivitySelect('g9-trans-osszefoglalas-matcher', selectedTopic || 'g9-egybevagosag-negyszogek')}
                    />
                  )}

                  {/* 10. Osztály - I. Logika - 1. Igaz vagy hamis */}
    </>
  );
};
