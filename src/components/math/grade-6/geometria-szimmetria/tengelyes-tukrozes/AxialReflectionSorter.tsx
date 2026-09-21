import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ReflectionMiniFigure } from './AxialReflectionDiagrams';

export interface AxialReflectionSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function AxialReflectionSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: AxialReflectionSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number'
    ? propLevel
    : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number'
      ? propLevel
      : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: TULAJDONSÁGOK CSOPORTOSÍTÁSA
    1: {
      level: 1,
      title: 'Tükrözési tulajdonságok szétválogatása',
      description: 'Válogasd szét a geometriai állításokat aszerint, hogy mit csinál a tengelyes tükrözés!',
      categories: [
        {
          id: 'invariant',
          title: 'Változatlan tulajdonság (Invariáns)',
          description: 'A tükrözés során pontosan megmaradó mennyiségek'
        },
        {
          id: 'changing',
          title: 'Megváltozó tulajdonság',
          description: 'A tükrözés során módosuló geometriai jellemzők'
        },
        {
          id: 'axis_properties',
          title: 'Tengelyen lévő elemek',
          description: 'A tükrözés tengelyéhez kapcsolódó sajátosságok'
        }
      ],
      items: [
        { id: 'it1-1', label: 'Szakaszok hossza (|A\'B\'| = |AB|)', categoryId: 'invariant' },
        { id: 'it1-2', label: 'Szögek nagysága (szögtartás)', categoryId: 'invariant' },
        { id: 'it1-3', label: 'Síkidomok területe (T_A\'B\'C\' = T_ABC)', categoryId: 'invariant' },
        { id: 'it1-4', label: 'Kör sugara (r\' = r)', categoryId: 'invariant' },
        { id: 'it1-5', label: 'Egyenesek párhuzamossága (a\' ∥ b\')', categoryId: 'invariant' },
        { id: 'it1-6', label: 'Körüljárási irány (pozitívból negatív lesz)', categoryId: 'changing' },
        { id: 'it1-7', label: 'Nem-tengelybeli pontok koordinátái', categoryId: 'changing' },
        { id: 'it1-8', label: 'Félsíkok elhelyezkedése (bal ↔ jobb)', categoryId: 'changing' },
        { id: 'it1-9', label: 'Fixpontok: képe önmaga (P\' = P)', categoryId: 'axis_properties' },
        { id: 'it1-10', label: 'Tengelyre merőleges egyenes: önmagába képződik (m\' = m)', categoryId: 'axis_properties' },
        { id: 'it1-11', label: 'Tengelyt metsző szakasz: a metszéspont helyben marad', categoryId: 'axis_properties' }
      ]
    },

    // 2. SZINT: KOORDINÁTA-TRANSZFORMÁCIÓK CSOPORTOSÍTÁSA
    2: {
      level: 2,
      title: 'Koordinátapontok tükörképei',
      description: 'Csoportosítsd a pontpárokat aszerint, hogy milyen tengelyre tükröztük őket!',
      categories: [
        {
          id: 'x_axis',
          title: 'Tükrözés az x-tengelyre',
          description: '(x; y) ⟶ (x; -y) (az y koordináta előjelet vált)'
        },
        {
          id: 'y_axis',
          title: 'Tükrözés az y-tengelyre',
          description: '(x; y) ⟶ (-x; y) (az x koordináta előjelet vált)'
        },
        {
          id: 'origin',
          title: 'Tükrözés az origóra',
          description: '(x; y) ⟶ (-x; -y) (mindkét koordináta előjelet vált)'
        }
      ],
      items: [
        { id: 'it2-1', label: 'A(3; 4) ⟶ A\'(3; -4)', categoryId: 'x_axis' },
        { id: 'it2-2', label: 'B(-5; 2) ⟶ B\'(-5; -2)', categoryId: 'x_axis' },
        { id: 'it2-3', label: 'C(7; -9) ⟶ C\'(7; 9)', categoryId: 'x_axis' },
        { id: 'it2-4', label: 'D(-1; -6) ⟶ D\'(-1; 6)', categoryId: 'x_axis' },
        { id: 'it2-5', label: 'E(3; 4) ⟶ E\'(-3; 4)', categoryId: 'y_axis' },
        { id: 'it2-6', label: 'F(-5; 2) ⟶ F\'(5; 2)', categoryId: 'y_axis' },
        { id: 'it2-7', label: 'G(7; -9) ⟶ G\'(-7; -9)', categoryId: 'y_axis' },
        { id: 'it2-8', label: 'H(-1; -6) ⟶ H\'(1; -6)', categoryId: 'y_axis' },
        { id: 'it2-9', label: 'I(3; 4) ⟶ I\'(-3; -4)', categoryId: 'origin' },
        { id: 'it2-10', label: 'J(-5; 2) ⟶ J\'(5; -2)', categoryId: 'origin' },
        { id: 'it2-11', label: 'K(7; -9) ⟶ K\'(-7; 9)', categoryId: 'origin' },
        { id: 'it2-12', label: 'L(-1; -6) ⟶ L\'(1; 6)', categoryId: 'origin' }
      ]
    },

    // 3. SZINT: TRANSZFORMÁCIÓK ÉS ÖSSZETÉTELEK
    3: {
      level: 3,
      title: 'Transzformációk típusai és összetételei',
      description: 'Válogasd szét a geometriai transzformációk tulajdonságait!',
      categories: [
        {
          id: 'single_reflection',
          title: 'Egy tengelyes tükrözés',
          description: 'Egyetlen t tengelyre történő reflexió'
        },
        {
          id: 'parallel_reflections',
          title: 'Két párhuzamos tengelyre tükrözés',
          description: 't₁ ∥ t₂ tengelyekre történő egymás utáni tükrözés'
        },
        {
          id: 'perpendicular_reflections',
          title: 'Két merőleges tengelyre tükrözés',
          description: 't₁ ⊥ t₂ tengelyekre történő egymás utáni tükrözés'
        }
      ],
      items: [
        { id: 'it3-1', label: 'Megfordítja a körüljárási irányt', categoryId: 'single_reflection' },
        { id: 'it3-2', label: 'Involúció: (P\')\' = P önmaga inverze', categoryId: 'single_reflection' },
        { id: 'it3-3', label: 'Végtelen sok fixpontja van (a t tengely minden pontja)', categoryId: 'single_reflection' },
        { id: 'it3-4', label: 'PP\' felezőmerőlegese a tengely', categoryId: 'single_reflection' },
        { id: 'it3-5', label: 'Egyenértékű egy párhuzamos eltolással (2·d távolság)', categoryId: 'parallel_reflections' },
        { id: 'it3-6', label: 'Megtartja a körüljárási irányt (kétszer fordul meg)', categoryId: 'parallel_reflections' },
        { id: 'it3-7', label: 'Nincs fixpontja a síkban', categoryId: 'parallel_reflections' },
        { id: 'it3-8', label: 'Egyenértékű az origóra (metszéspontra) vett középpontos tükrözéssel', categoryId: 'perpendicular_reflections' },
        { id: 'it3-9', label: '180°-os elforgatással egyenértékű', categoryId: 'perpendicular_reflections' },
        { id: 'it3-10', label: 'Pontosan 1 fixpontja van (a két tengely metszéspontja)', categoryId: 'perpendicular_reflections' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-geometry"
      title="Tengelyes tükrözés Csoportosító"
      subtitle="Válogasd szét a tükrözési tulajdonságokat és koordináta-szabályokat!"
      badge="📐 6. Osztály • III. Geometria • 6. Fejezet"
      topicId="g6-axial-reflection-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}
