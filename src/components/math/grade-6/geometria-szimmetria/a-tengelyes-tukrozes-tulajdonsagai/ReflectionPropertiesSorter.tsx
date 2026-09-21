import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface ReflectionPropertiesSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function ReflectionPropertiesSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: ReflectionPropertiesSorterProps) {
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
      title: '1. Szint: Megmaradó vs. Megváltozó tulajdonságok',
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
          description: 'A tükrözés során módosuló jellemzők'
        }
      ],
      items: [
        { id: 'it1-1', label: 'Szakaszok hossza (|A\'B\'| = |AB|)', categoryId: 'invariant' },
        { id: 'it1-2', label: 'Szögek nagysága (szögtartás)', categoryId: 'invariant' },
        { id: 'it1-3', label: 'Síkidomok területe (T\' = T)', categoryId: 'invariant' },
        { id: 'it1-4', label: 'Sokszögek kerülete (K\' = K)', categoryId: 'invariant' },
        { id: 'it1-5', label: 'Kör sugara (r\' = r)', categoryId: 'invariant' },
        { id: 'it1-6', label: 'Egyenesek párhuzamossága (a\' ∥ b\')', categoryId: 'invariant' },
        { id: 'it1-7', label: 'Körüljárási irány (pozitívból negatív lesz)', categoryId: 'changing' },
        { id: 'it1-8', label: 'Tengelyen kívüli pontok helyzete (x; y)', categoryId: 'changing' },
        { id: 'it1-9', label: 'Jobb és bal oldal (kezek orientációja)', categoryId: 'changing' },
        { id: 'it1-10', label: 'Egy alakzat csúcsainak sorrendje', categoryId: 'changing' }
      ]
    },

    // 2. SZINT: FIX ELEMEK CSOPORTOSÍTÁSA
    2: {
      level: 2,
      title: '2. Szint: Fixpontok, fixegyenesek és nem-fix elemek',
      description: 'Csoportosítsd a geometriai alakzatokat és pontokat aszerint, hogyan viselkednek a tükrözésben!',
      categories: [
        {
          id: 'fixed_point',
          title: 'Fixpont (P\' = P)',
          description: 'Pontonként a helyén maradó elem'
        },
        {
          id: 'fixed_line',
          title: 'Fixegyenes (e\' = e)',
          description: 'Önmagába képződő vonal (pontjai helyet cserélhetnek)'
        },
        {
          id: 'not_fixed',
          title: 'Nem fix elem',
          description: 'Elmozduló pont vagy máshová képződő egyenes'
        }
      ],
      items: [
        { id: 'it2-1', label: 'A tükrözési tengely tetszőleges P pontja (P ∈ t)', categoryId: 'fixed_point' },
        { id: 'it2-2', label: 'Tengelyt metsző szakasz M metszéspontja', categoryId: 'fixed_point' },
        { id: 'it2-3', label: 'A tükrözési t tengely egésze mint vonal', categoryId: 'fixed_line' },
        { id: 'it2-4', label: 'A tengelyre merőleges m egyenes (m ⊥ t)', categoryId: 'fixed_line' },
        { id: 'it2-5', label: 'A tengelytől 5 cm-re lévő A pont', categoryId: 'not_fixed' },
        { id: 'it2-6', label: 'A tengellyel párhuzamos e egyenes (e ∥ t, e ≠ t)', categoryId: 'not_fixed' },
        { id: 'it2-7', label: 'A tengellyel 45°-os szöget bezáró egyenes', categoryId: 'not_fixed' },
        { id: 'it2-8', label: 'Egy tengelyen kívül fekvő kör középpontja', categoryId: 'not_fixed' }
      ]
    },

    // 3. SZINT: TRANSZFORMÁCIÓK ÖSSZETÉTELE
    3: {
      level: 3,
      title: '3. Szint: Transzformációk összetételének fajtái',
      description: 'Válogasd szét a geometriai állításokat az összetett tükrözések típusa szerint!',
      categories: [
        {
          id: 'single_refl',
          title: 'Egyetlen tengelyes tükrözés',
          description: '1 db tengelyre tükrözés sajátosságai'
        },
        {
          id: 'parallel_refl',
          title: 'Két párhuzamos tengelyre tükrözés',
          description: 't₁ ∥ t₂ (párhuzamos eltolás)'
        },
        {
          id: 'intersecting_refl',
          title: 'Két metsző tengelyre tükrözés',
          description: 't₁ és t₂ metszik egymást α szögben (elforgatás)'
        }
      ],
      items: [
        { id: 'it3-1', label: 'Megfordítja a körüljárási irányt (+ ⟶ −)', categoryId: 'single_refl' },
        { id: 'it3-2', label: 'Végtelen sok fixpontja van egy egyenes mentén', categoryId: 'single_refl' },
        { id: 'it3-3', label: 'Involúció: kétszer alkalmazva identitás', categoryId: 'single_refl' },
        { id: 'it3-4', label: 'Egyenértékű egy 2·d nagyságú párhuzamos eltolással', categoryId: 'parallel_refl' },
        { id: 'it3-5', label: 'Nincs fixpontja a síkban', categoryId: 'parallel_refl' },
        { id: 'it3-6', label: 'Megtartja a körüljárási irányt (kétszer fordul)', categoryId: 'parallel_refl' },
        { id: 'it3-7', label: 'Egyenértékű az O pont körüli 2·α szögű elforgatással', categoryId: 'intersecting_refl' },
        { id: 'it3-8', label: 'Pontosan 1 fixpontja van (az O metszéspont)', categoryId: 'intersecting_refl' },
        { id: 'it3-9', label: 'Merőleges tengelyeknél 180°-os középpontos tükrözést ad', categoryId: 'intersecting_refl' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-geometry"
      title="A tengelyes tükrözés tulajdonságai Csoportosító"
      subtitle="Válogasd szét a tükrözési tulajdonságokat, fix elemeket és transzformációkat!"
      badge="📐 6. Osztály • III. Geometria • 7. Fejezet"
      topicId="g6-reflection-properties-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}
