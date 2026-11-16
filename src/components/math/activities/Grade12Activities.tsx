import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const G12SpatialDistanceTheory = lazy(() => import("@/components/math/grade-12/tergeometria/terelemek-tavolsaga-ismetles/SpatialDistanceTheory").then(m => ({ default: m.SpatialDistanceTheory })))
const G12SpatialDistanceQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/terelemek-tavolsaga-ismetles/SpatialDistanceQuiz").then(m => ({ default: m.SpatialDistanceQuiz })))
const G12PrismTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-hasab/PrismTheory").then(m => ({ default: m.PrismTheory })))
const G12PrismQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-hasab/PrismQuiz").then(m => ({ default: m.PrismQuiz })))
const G12PrismAreaVolumeTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-hasab-felszine-es-terfogata/PrismAreaVolumeTheory").then(m => ({ default: m.PrismAreaVolumeTheory })))
const G12PrismAreaVolumeQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-hasab-felszine-es-terfogata/PrismAreaVolumeQuiz").then(m => ({ default: m.PrismAreaVolumeQuiz })))
const G12CylinderTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-henger/CylinderTheory").then(m => ({ default: m.CylinderTheory })))
const G12CylinderQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-henger/CylinderQuiz").then(m => ({ default: m.CylinderQuiz })))
const G12CylinderAreaVolumeTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-henger-felszine-es-terfogata/CylinderAreaVolumeTheory").then(m => ({ default: m.CylinderAreaVolumeTheory })))
const G12CylinderAreaVolumeQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-henger-felszine-es-terfogata/CylinderAreaVolumeQuiz").then(m => ({ default: m.CylinderAreaVolumeQuiz })))
const G12SphereSectionsTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-gomb-a-gomb-szeletelese/SphereSectionsTheory").then(m => ({ default: m.SphereSectionsTheory })))
const G12SphereSectionsQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-gomb-a-gomb-szeletelese/SphereSectionsQuiz").then(m => ({ default: m.SphereSectionsQuiz })))
const G12SphereAreaVolumeTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-gomb-felszine-es-terfogata/SphereAreaVolumeTheory").then(m => ({ default: m.SphereAreaVolumeTheory })))
const G12SphereAreaVolumeQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-gomb-felszine-es-terfogata/SphereAreaVolumeQuiz").then(m => ({ default: m.SphereAreaVolumeQuiz })))
const G12SimilarSolidsTheory = lazy(() => import("@/components/math/grade-12/tergeometria/hasonlo-testek-felszine-terfogata/SimilarSolidsTheory").then(m => ({ default: m.SimilarSolidsTheory })))
const G12SimilarSolidsQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/hasonlo-testek-felszine-terfogata/SimilarSolidsQuiz").then(m => ({ default: m.SimilarSolidsQuiz })))
const G12SpatialAnglesTheory = lazy(() => import("@/components/math/grade-12/tergeometria/terelemek-hajlasszoge/SpatialAnglesTheory").then(m => ({ default: m.SpatialAnglesTheory })))
const G12SpatialAnglesQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/terelemek-hajlasszoge/SpatialAnglesQuiz").then(m => ({ default: m.SpatialAnglesQuiz })))
const G12PyramidTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-gula/PyramidTheory").then(m => ({ default: m.PyramidTheory })))
const G12PyramidQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-gula/PyramidQuiz").then(m => ({ default: m.PyramidQuiz })))
const G12PyramidAreaVolumeTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-gula-felszine-es-terfogata/PyramidAreaVolumeTheory").then(m => ({ default: m.PyramidAreaVolumeTheory })))
const G12PyramidAreaVolumeQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-gula-felszine-es-terfogata/PyramidAreaVolumeQuiz").then(m => ({ default: m.PyramidAreaVolumeQuiz })))
const G12ConeTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-forgaskup/ConeTheory").then(m => ({ default: m.ConeTheory })))
const G12ConeQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-forgaskup/ConeQuiz").then(m => ({ default: m.ConeQuiz })))
const G12ConeAreaVolumeTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-forgaskup-felszine-es-terfogata/ConeAreaVolumeTheory").then(m => ({ default: m.ConeAreaVolumeTheory })))
const G12ConeAreaVolumeQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-forgaskup-felszine-es-terfogata/ConeAreaVolumeQuiz").then(m => ({ default: m.ConeAreaVolumeQuiz })))
const G12FrustumTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup/FrustumTheory").then(m => ({ default: m.FrustumTheory })))
const G12FrustumQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup/FrustumQuiz").then(m => ({ default: m.FrustumQuiz })))
const G12FrustumAreaTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-felszine/FrustumAreaTheory").then(m => ({ default: m.FrustumAreaTheory })))
const G12FrustumAreaQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-felszine/FrustumAreaQuiz").then(m => ({ default: m.FrustumAreaQuiz })))
const G12FrustumVolumeTheory = lazy(() => import("@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-terfogata/FrustumVolumeTheory").then(m => ({ default: m.FrustumVolumeTheory })))
const G12FrustumVolumeQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-terfogata/FrustumVolumeQuiz").then(m => ({ default: m.FrustumVolumeQuiz })))
const G12SolidsEverydayTheory = lazy(() => import("@/components/math/grade-12/tergeometria/tergeometria-a-hetkoznapi-eletben/SolidsEverydayTheory").then(m => ({ default: m.SolidsEverydayTheory })))
const G12SolidsEverydayQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/tergeometria-a-hetkoznapi-eletben/SolidsEverydayQuiz").then(m => ({ default: m.SolidsEverydayQuiz })))
const G12SolidsPracticeExamTheory = lazy(() => import("@/components/math/grade-12/tergeometria/gyakorlas-tudasproba/SolidsPracticeExamTheory").then(m => ({ default: m.SolidsPracticeExamTheory })))
const G12SolidsPracticeExamQuiz = lazy(() => import("@/components/math/grade-12/tergeometria/gyakorlas-tudasproba/SolidsPracticeExamQuiz").then(m => ({ default: m.SolidsPracticeExamQuiz })))
const G12NumberSequencesTheory = lazy(() => import("@/components/math/grade-12/sorozatok/szamsorozatok/NumberSequencesTheory").then(m => ({ default: m.NumberSequencesTheory })))
const G12NumberSequencesQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/szamsorozatok/NumberSequencesQuiz").then(m => ({ default: m.NumberSequencesQuiz })))
const G12SequenceDefinitionTheory = lazy(() => import("@/components/math/grade-12/sorozatok/sorozatok-megadasa/SequenceDefinitionTheory").then(m => ({ default: m.SequenceDefinitionTheory })))
const G12SequenceDefinitionQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/sorozatok-megadasa/SequenceDefinitionQuiz").then(m => ({ default: m.SequenceDefinitionQuiz })))
const G12ArithmeticSequenceTheory = lazy(() => import("@/components/math/grade-12/sorozatok/szamtani-sorozatok/ArithmeticSequenceTheory").then(m => ({ default: m.ArithmeticSequenceTheory })))
const G12ArithmeticSequenceQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/szamtani-sorozatok/ArithmeticSequenceQuiz").then(m => ({ default: m.ArithmeticSequenceQuiz })))
const G12ArithmeticSumTheory = lazy(() => import("@/components/math/grade-12/sorozatok/a-szamtani-sorozat-elso-n-tagjanak-osszege/ArithmeticSumTheory").then(m => ({ default: m.ArithmeticSumTheory })))
const G12ArithmeticSumQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/a-szamtani-sorozat-elso-n-tagjanak-osszege/ArithmeticSumQuiz").then(m => ({ default: m.ArithmeticSumQuiz })))
const G12GeometricSequenceTheory = lazy(() => import("@/components/math/grade-12/sorozatok/mertani-sorozatok/GeometricSequenceTheory").then(m => ({ default: m.GeometricSequenceTheory })))
const G12GeometricSequenceQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/mertani-sorozatok/GeometricSequenceQuiz").then(m => ({ default: m.GeometricSequenceQuiz })))
const G12GeometricSumTheory = lazy(() => import("@/components/math/grade-12/sorozatok/a-mertani-sorozat-elso-n-tagjanak-osszege/GeometricSumTheory").then(m => ({ default: m.GeometricSumTheory })))
const G12GeometricSumQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/a-mertani-sorozat-elso-n-tagjanak-osszege/GeometricSumQuiz").then(m => ({ default: m.GeometricSumQuiz })))
const G12MixedSequencesTheory = lazy(() => import("@/components/math/grade-12/sorozatok/vegyes-feladatok/MixedSequencesTheory").then(m => ({ default: m.MixedSequencesTheory })))
const G12MixedSequencesQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/vegyes-feladatok/MixedSequencesQuiz").then(m => ({ default: m.MixedSequencesQuiz })))
const G12FinanceInvestmentsTheory = lazy(() => import("@/components/math/grade-12/sorozatok/penzugyi-feladatok-1-tokebefektetesek/FinanceInvestmentsTheory").then(m => ({ default: m.FinanceInvestmentsTheory })))
const G12FinanceInvestmentsQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/penzugyi-feladatok-1-tokebefektetesek/FinanceInvestmentsQuiz").then(m => ({ default: m.FinanceInvestmentsQuiz })))
const G12FinanceLoansTheory = lazy(() => import("@/components/math/grade-12/sorozatok/penzugyi-feladatok-2-hitelek-es-kockazatok/FinanceLoansTheory").then(m => ({ default: m.FinanceLoansTheory })))
const G12FinanceLoansQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/penzugyi-feladatok-2-hitelek-es-kockazatok/FinanceLoansQuiz").then(m => ({ default: m.FinanceLoansQuiz })))
const G12SequencesPracticeExamTheory = lazy(() => import("@/components/math/grade-12/sorozatok/gyakorlas-tudasproba/SequencesPracticeExamTheory").then(m => ({ default: m.SequencesPracticeExamTheory })))
const G12SequencesPracticeExamQuiz = lazy(() => import("@/components/math/grade-12/sorozatok/gyakorlas-tudasproba/SequencesPracticeExamQuiz").then(m => ({ default: m.SequencesPracticeExamQuiz })))

export const Grade12Activities: React.FC<ActivityRouterProps> = ({
  activityType,
  onBack,
  onActivitySelect,
  selectedTopic,
}) => {
  const handleBack = onBack;
  const handleActivitySelect = onActivitySelect;

  if (!activityType) return null;

  return (
    <>
      {/* ===== 12. Osztály – I. Térgeometria ===== */}

      {/* 1. Térelemek távolsága (ismétlés) */}
      {activityType === 'g12-ter-terelemek-tavolsaga-theory' && (
        <G12SpatialDistanceTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-terelemek-tavolsaga-quiz' && (
        <G12SpatialDistanceQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-terelemek-tavolsaga-matcher' && (
        <G12SpatialDistanceQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-terelemek-tavolsaga-sorter' && (
        <G12SpatialDistanceQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-terelemek-tavolsaga-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 2. A hasáb */}
      {activityType === 'g12-ter-hasab-theory' && (
        <G12PrismTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-hasab-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasab-quiz' && (
        <G12PrismQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasab-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasab-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasab-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasab-matcher' && (
        <G12PrismQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasab-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasab-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasab-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasab-sorter' && (
        <G12PrismQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasab-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasab-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasab-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 3. A hasáb felszíne és térfogata */}
      {activityType === 'g12-ter-hasab-felszin-terfogat-theory' && (
        <G12PrismAreaVolumeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasab-felszin-terfogat-quiz' && (
        <G12PrismAreaVolumeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasab-felszin-terfogat-matcher' && (
        <G12PrismAreaVolumeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasab-felszin-terfogat-sorter' && (
        <G12PrismAreaVolumeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasab-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 4. A henger */}
      {activityType === 'g12-ter-henger-theory' && (
        <G12CylinderTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-henger-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-henger-quiz' && (
        <G12CylinderQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-henger-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-henger-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-henger-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-henger-matcher' && (
        <G12CylinderQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-henger-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-henger-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-henger-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-henger-sorter' && (
        <G12CylinderQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-henger-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-henger-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-henger-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 5. A henger felszíne és térfogata */}
      {activityType === 'g12-ter-henger-felszin-terfogat-theory' && (
        <G12CylinderAreaVolumeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-henger-felszin-terfogat-quiz' && (
        <G12CylinderAreaVolumeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-henger-felszin-terfogat-matcher' && (
        <G12CylinderAreaVolumeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-henger-felszin-terfogat-sorter' && (
        <G12CylinderAreaVolumeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-henger-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 6. A gömb, a gömb szeletelése */}
      {activityType === 'g12-ter-gomb-szeletelese-theory' && (
        <G12SphereSectionsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-gomb-szeletelese-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gomb-szeletelese-quiz' && (
        <G12SphereSectionsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gomb-szeletelese-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gomb-szeletelese-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gomb-szeletelese-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gomb-szeletelese-matcher' && (
        <G12SphereSectionsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gomb-szeletelese-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gomb-szeletelese-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gomb-szeletelese-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gomb-szeletelese-sorter' && (
        <G12SphereSectionsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gomb-szeletelese-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gomb-szeletelese-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gomb-szeletelese-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 7. A gömb felszíne és térfogata */}
      {activityType === 'g12-ter-gomb-felszin-terfogat-theory' && (
        <G12SphereAreaVolumeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gomb-felszin-terfogat-quiz' && (
        <G12SphereAreaVolumeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gomb-felszin-terfogat-matcher' && (
        <G12SphereAreaVolumeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gomb-felszin-terfogat-sorter' && (
        <G12SphereAreaVolumeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gomb-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 8. Hasonló testek felszíne, térfogata */}
      {activityType === 'g12-ter-hasonlo-testek-theory' && (
        <G12SimilarSolidsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-hasonlo-testek-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasonlo-testek-quiz' && (
        <G12SimilarSolidsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasonlo-testek-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasonlo-testek-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasonlo-testek-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasonlo-testek-matcher' && (
        <G12SimilarSolidsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasonlo-testek-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasonlo-testek-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasonlo-testek-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hasonlo-testek-sorter' && (
        <G12SimilarSolidsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hasonlo-testek-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hasonlo-testek-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hasonlo-testek-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 9. Térelemek hajlásszöge */}
      {activityType === 'g12-ter-hajlasszog-theory' && (
        <G12SpatialAnglesTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-hajlasszog-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hajlasszog-quiz' && (
        <G12SpatialAnglesQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hajlasszog-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hajlasszog-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hajlasszog-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hajlasszog-matcher' && (
        <G12SpatialAnglesQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hajlasszog-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hajlasszog-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hajlasszog-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hajlasszog-sorter' && (
        <G12SpatialAnglesQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hajlasszog-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hajlasszog-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hajlasszog-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 10. A gúla */}
      {activityType === 'g12-ter-gula-theory' && (
        <G12PyramidTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-gula-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gula-quiz' && (
        <G12PyramidQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gula-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gula-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gula-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gula-matcher' && (
        <G12PyramidQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gula-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gula-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gula-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gula-sorter' && (
        <G12PyramidQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gula-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gula-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gula-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 11. A gúla felszíne és térfogata */}
      {activityType === 'g12-ter-gula-felszin-terfogat-theory' && (
        <G12PyramidAreaVolumeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gula-felszin-terfogat-quiz' && (
        <G12PyramidAreaVolumeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gula-felszin-terfogat-matcher' && (
        <G12PyramidAreaVolumeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-gula-felszin-terfogat-sorter' && (
        <G12PyramidAreaVolumeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-gula-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 12. A forgáskúp */}
      {activityType === 'g12-ter-forgaskup-theory' && (
        <G12ConeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-forgaskup-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-forgaskup-quiz' && (
        <G12ConeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-forgaskup-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-forgaskup-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-forgaskup-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-forgaskup-matcher' && (
        <G12ConeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-forgaskup-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-forgaskup-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-forgaskup-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-forgaskup-sorter' && (
        <G12ConeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-forgaskup-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-forgaskup-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-forgaskup-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 13. A forgáskúp felszíne és térfogata */}
      {activityType === 'g12-ter-forgaskup-felszin-terfogat-theory' && (
        <G12ConeAreaVolumeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-forgaskup-felszin-terfogat-quiz' && (
        <G12ConeAreaVolumeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-forgaskup-felszin-terfogat-matcher' && (
        <G12ConeAreaVolumeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-forgaskup-felszin-terfogat-sorter' && (
        <G12ConeAreaVolumeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-forgaskup-felszin-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 14. A csonkagúla és a csonkakúp */}
      {activityType === 'g12-ter-csonka-testek-theory' && (
        <G12FrustumTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-csonka-testek-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-testek-quiz' && (
        <G12FrustumQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-testek-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-testek-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-testek-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-testek-matcher' && (
        <G12FrustumQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-testek-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-testek-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-testek-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-testek-sorter' && (
        <G12FrustumQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-testek-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-testek-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-testek-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 15. A csonkagúla és a csonkakúp felszíne */}
      {activityType === 'g12-ter-csonka-felszin-theory' && (
        <G12FrustumAreaTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-csonka-felszin-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-felszin-quiz' && (
        <G12FrustumAreaQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-felszin-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-felszin-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-felszin-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-felszin-matcher' && (
        <G12FrustumAreaQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-felszin-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-felszin-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-felszin-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-felszin-sorter' && (
        <G12FrustumAreaQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-felszin-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-felszin-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-felszin-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 16. A csonkagúla és a csonkakúp térfogata */}
      {activityType === 'g12-ter-csonka-terfogat-theory' && (
        <G12FrustumVolumeTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-csonka-terfogat-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-terfogat-quiz' && (
        <G12FrustumVolumeQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-terfogat-matcher' && (
        <G12FrustumVolumeQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-csonka-terfogat-sorter' && (
        <G12FrustumVolumeQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-csonka-terfogat-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-csonka-terfogat-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-csonka-terfogat-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 17. Térgeometria a hétköznapi életben */}
      {activityType === 'g12-ter-hetkoznapi-theory' && (
        <G12SolidsEverydayTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-hetkoznapi-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hetkoznapi-quiz' && (
        <G12SolidsEverydayQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hetkoznapi-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hetkoznapi-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hetkoznapi-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hetkoznapi-matcher' && (
        <G12SolidsEverydayQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hetkoznapi-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hetkoznapi-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hetkoznapi-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-hetkoznapi-sorter' && (
        <G12SolidsEverydayQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-hetkoznapi-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-hetkoznapi-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-hetkoznapi-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* 18. Gyakorlás, tudáspróba */}
      {activityType === 'g12-ter-tudasproba-theory' && (
        <G12SolidsPracticeExamTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-ter-tudasproba-quiz', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-tudasproba-quiz' && (
        <G12SolidsPracticeExamQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-tudasproba-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-tudasproba-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-tudasproba-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-tudasproba-matcher' && (
        <G12SolidsPracticeExamQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-tudasproba-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-tudasproba-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-tudasproba-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}
      {activityType === 'g12-ter-tudasproba-sorter' && (
        <G12SolidsPracticeExamQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-ter-tudasproba-theory', selectedTopic || 'g12-tergeometria')}
          onSwitchToMatcher={() => handleActivitySelect('g12-ter-tudasproba-matcher', selectedTopic || 'g12-tergeometria')}
          onSwitchToSorter={() => handleActivitySelect('g12-ter-tudasproba-sorter', selectedTopic || 'g12-tergeometria')}
        />
      )}

      {/* ===== 12. Osztály – II. Sorozatok ===== */}

      {/* 1. Számsorozatok */}
      {activityType === 'g12-seq-szamsorozatok-theory' && (
        <G12NumberSequencesTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-szamsorozatok-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamsorozatok-quiz' && (
        <G12NumberSequencesQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamsorozatok-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamsorozatok-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamsorozatok-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamsorozatok-matcher' && (
        <G12NumberSequencesQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamsorozatok-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamsorozatok-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamsorozatok-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamsorozatok-sorter' && (
        <G12NumberSequencesQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamsorozatok-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamsorozatok-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamsorozatok-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 2. Sorozatok megadása */}
      {activityType === 'g12-seq-megadas-theory' && (
        <G12SequenceDefinitionTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-megadas-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-megadas-quiz' && (
        <G12SequenceDefinitionQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-megadas-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-megadas-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-megadas-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-megadas-matcher' && (
        <G12SequenceDefinitionQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-megadas-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-megadas-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-megadas-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-megadas-sorter' && (
        <G12SequenceDefinitionQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-megadas-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-megadas-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-megadas-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 3. Számtani sorozatok */}
      {activityType === 'g12-seq-szamtani-theory' && (
        <G12ArithmeticSequenceTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-szamtani-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamtani-quiz' && (
        <G12ArithmeticSequenceQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamtani-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamtani-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamtani-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamtani-matcher' && (
        <G12ArithmeticSequenceQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamtani-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamtani-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamtani-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamtani-sorter' && (
        <G12ArithmeticSequenceQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamtani-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamtani-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamtani-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 4. A számtani sorozat első n tagjának összege */}
      {activityType === 'g12-seq-szamtani-osszeg-theory' && (
        <G12ArithmeticSumTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-szamtani-osszeg-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamtani-osszeg-quiz' && (
        <G12ArithmeticSumQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamtani-osszeg-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamtani-osszeg-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamtani-osszeg-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamtani-osszeg-matcher' && (
        <G12ArithmeticSumQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamtani-osszeg-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamtani-osszeg-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamtani-osszeg-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-szamtani-osszeg-sorter' && (
        <G12ArithmeticSumQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-szamtani-osszeg-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-szamtani-osszeg-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-szamtani-osszeg-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 5. Mértani sorozatok */}
      {activityType === 'g12-seq-mertani-theory' && (
        <G12GeometricSequenceTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-mertani-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-mertani-quiz' && (
        <G12GeometricSequenceQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-mertani-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-mertani-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-mertani-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-mertani-matcher' && (
        <G12GeometricSequenceQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-mertani-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-mertani-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-mertani-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-mertani-sorter' && (
        <G12GeometricSequenceQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-mertani-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-mertani-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-mertani-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 6. A mértani sorozat első n tagjának összege */}
      {activityType === 'g12-seq-mertani-osszeg-theory' && (
        <G12GeometricSumTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-mertani-osszeg-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-mertani-osszeg-quiz' && (
        <G12GeometricSumQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-mertani-osszeg-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-mertani-osszeg-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-mertani-osszeg-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-mertani-osszeg-matcher' && (
        <G12GeometricSumQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-mertani-osszeg-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-mertani-osszeg-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-mertani-osszeg-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-mertani-osszeg-sorter' && (
        <G12GeometricSumQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-mertani-osszeg-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-mertani-osszeg-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-mertani-osszeg-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 7. Vegyes feladatok */}
      {activityType === 'g12-seq-vegyes-theory' && (
        <G12MixedSequencesTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-vegyes-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-vegyes-quiz' && (
        <G12MixedSequencesQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-vegyes-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-vegyes-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-vegyes-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-vegyes-matcher' && (
        <G12MixedSequencesQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-vegyes-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-vegyes-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-vegyes-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-vegyes-sorter' && (
        <G12MixedSequencesQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-vegyes-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-vegyes-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-vegyes-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 8. Pénzügyi feladatok I. – tőkebefektetések */}
      {activityType === 'g12-seq-tokebefektetes-theory' && (
        <G12FinanceInvestmentsTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-tokebefektetes-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-tokebefektetes-quiz' && (
        <G12FinanceInvestmentsQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-tokebefektetes-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-tokebefektetes-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-tokebefektetes-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-tokebefektetes-matcher' && (
        <G12FinanceInvestmentsQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-tokebefektetes-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-tokebefektetes-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-tokebefektetes-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-tokebefektetes-sorter' && (
        <G12FinanceInvestmentsQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-tokebefektetes-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-tokebefektetes-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-tokebefektetes-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 9. Pénzügyi feladatok II. – hitelek és kockázatok */}
      {activityType === 'g12-seq-hitelek-theory' && (
        <G12FinanceLoansTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-hitelek-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-hitelek-quiz' && (
        <G12FinanceLoansQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-hitelek-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-hitelek-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-hitelek-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-hitelek-matcher' && (
        <G12FinanceLoansQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-hitelek-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-hitelek-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-hitelek-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-hitelek-sorter' && (
        <G12FinanceLoansQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-hitelek-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-hitelek-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-hitelek-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}

      {/* 10. Gyakorlás, tudáspróba */}
      {activityType === 'g12-seq-tudasproba-theory' && (
        <G12SequencesPracticeExamTheory
          onBack={handleBack}
          onStartQuiz={() => handleActivitySelect('g12-seq-tudasproba-quiz', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-tudasproba-quiz' && (
        <G12SequencesPracticeExamQuiz
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-tudasproba-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-tudasproba-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-tudasproba-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-tudasproba-matcher' && (
        <G12SequencesPracticeExamQuiz
          initialGameMode="matcher"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-tudasproba-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-tudasproba-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-tudasproba-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
      {activityType === 'g12-seq-tudasproba-sorter' && (
        <G12SequencesPracticeExamQuiz
          initialGameMode="sorter"
          onBack={handleBack}
          onSwitchToTheory={() => handleActivitySelect('g12-seq-tudasproba-theory', selectedTopic || 'g12-sorozatok')}
          onSwitchToMatcher={() => handleActivitySelect('g12-seq-tudasproba-matcher', selectedTopic || 'g12-sorozatok')}
          onSwitchToSorter={() => handleActivitySelect('g12-seq-tudasproba-sorter', selectedTopic || 'g12-sorozatok')}
        />
      )}
    </>
  );
};
