import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { AxialSymmetryMiniFigure } from './AxialSymmetryDiagrams';

export interface AxialSymmetrySorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function AxialSymmetrySorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: AxialSymmetrySorterProps) {
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
    // 1. SZINT: TENGELYEK SZÁMA SZERINTI CSOPORTOSÍTÁS
    1: {
      level: 1,
      title: '1. Szint: Szimmetriatengelyek száma',
      description: 'Csoportosítsd a síkidomokat a szimmetriatengelyeik száma szerint!',
      categories: [
        {
          id: 'cat-0-1',
          title: '0 vagy 1 szimmetriatengely',
          description: 'Aszimmetrikus vagy egyetlen tengellyel rendelkező alakzatok'
        },
        {
          id: 'cat-2',
          title: 'Pontosan 2 szimmetriatengely',
          description: 'Két egymásra merőleges szimmetriatengellyel bíró alakzatok'
        },
        {
          id: 'cat-3-plus',
          title: '3 vagy több tengely (akár végtelen)',
          description: 'Magasabb szimmetriájú szabályos alakzatok és a kör'
        }
      ],
      items: [
        { id: 'it1-1', label: 'Általános háromszög (0 tengely)', figure: <AxialSymmetryMiniFigure type="zero_axes" />, categoryId: 'cat-0-1' },
        { id: 'it1-2', label: 'Egyenlő szárú háromszög (1 tengely)', figure: <AxialSymmetryMiniFigure type="one_axis" />, categoryId: 'cat-0-1' },
        { id: 'it1-3', label: 'Deltoid (1 szimmetriaátló)', figure: <AxialSymmetryMiniFigure type="deltoid" />, categoryId: 'cat-0-1' },
        { id: 'it1-4', label: 'Egyenlő szárú trapéz (1 tengely)', figure: <AxialSymmetryMiniFigure type="isosceles_trapezoid" />, categoryId: 'cat-0-1' },
        { id: 'it1-5', label: 'Téglalap (2 oldalfelező merőleges)', figure: <AxialSymmetryMiniFigure type="two_axes" />, categoryId: 'cat-2' },
        { id: 'it1-6', label: 'Rombusz (2 átló)', figure: <AxialSymmetryMiniFigure type="rhombus_axes" />, categoryId: 'cat-2' },
        { id: 'it1-7', label: 'Szabályos háromszög (3 tengely)', figure: <AxialSymmetryMiniFigure type="three_axes" />, categoryId: 'cat-3-plus' },
        { id: 'it1-8', label: 'Négyzet (4 tengely)', figure: <AxialSymmetryMiniFigure type="four_axes" />, categoryId: 'cat-3-plus' },
        { id: 'it1-9', label: 'Szabályos hatszög (6 tengely)', figure: <AxialSymmetryMiniFigure type="six_axes" />, categoryId: 'cat-3-plus' },
        { id: 'it1-10', label: 'Körlap (végtelen sok tengely)', figure: <AxialSymmetryMiniFigure type="infinite_axes" />, categoryId: 'cat-3-plus' }
      ]
    },

    // 2. SZINT: BETŰK SZIMMETRIÁJÁNAK IRÁNYA
    2: {
      level: 2,
      title: '2. Szint: Betűk és szimbólumok szimmetriairánya',
      description: 'Válogasd szét a nagybetűket a szimmetriatengelyeik iránya szerint!',
      categories: [
        {
          id: 'vert',
          title: 'Csak függőleges tengely',
          description: 'Függőleges tengelyre tükrös betűk (bal = jobb)'
        },
        {
          id: 'horiz',
          title: 'Csak vízszintes tengely',
          description: 'Vízszintes tengelyre tükrös betűk (felső = alsó)'
        },
        {
          id: 'both',
          title: 'Két tengely (Függőleges és Vízszintes)',
          description: 'Mindkét irányban szimmetrikus betűk'
        },
        {
          id: 'none',
          title: 'Nincs szimmetriatengely',
          description: 'Aszimmetrikus betűk (0 tengely)'
        }
      ],
      items: [
        { id: 'it2-1', label: '„A” betű', figure: <AxialSymmetryMiniFigure type="letter_a" />, categoryId: 'vert' },
        { id: 'it2-2', label: '„M” betű', figure: <AxialSymmetryMiniFigure type="letter_m" />, categoryId: 'vert' },
        { id: 'it2-3', label: '„T” betű', figure: <AxialSymmetryMiniFigure type="letter_t" />, categoryId: 'vert' },
        { id: 'it2-4', label: '„B” betű', figure: <AxialSymmetryMiniFigure type="letter_b" />, categoryId: 'horiz' },
        { id: 'it2-5', label: '„E” betű', figure: <AxialSymmetryMiniFigure type="letter_e" />, categoryId: 'horiz' },
        { id: 'it2-6', label: '„C” betű', figure: <AxialSymmetryMiniFigure type="letter_c" />, categoryId: 'horiz' },
        { id: 'it2-7', label: '„H” betű', figure: <AxialSymmetryMiniFigure type="letter_h" />, categoryId: 'both' },
        { id: 'it2-8', label: '„X” betű', figure: <AxialSymmetryMiniFigure type="letter_x" />, categoryId: 'both' },
        { id: 'it2-9', label: '„F” betű', figure: <AxialSymmetryMiniFigure type="letter_f" />, categoryId: 'none' },
        { id: 'it2-10', label: '„P” betű', figure: <AxialSymmetryMiniFigure type="letter_p" />, categoryId: 'none' }
      ]
    },

    // 3. SZINT: TENGELYES SZIMMETRIA LÉTEZÉSE ALAKZATOKNÁL
    3: {
      level: 3,
      title: '3. Szint: Szimmetrikus vs. Nem szimmetrikus alakzatok',
      description: 'Döntsd el az alakzatokról és formákról, hogy tengelyesen szimmetrikusak-e!',
      categories: [
        {
          id: 'symmetric',
          title: 'Tengelyesen szimmetrikus alakzat',
          description: 'Létezik legalább 1 olyan tengely, amelyre tükrözve önmagába megy át'
        },
        {
          id: 'asymmetric',
          title: 'NEM tengelyesen szimmetrikus alakzat',
          description: 'Egyetlen szimmetriatengellyel sem rendelkezik'
        }
      ],
      items: [
        { id: 'it3-1', label: 'Szabályos 12-szög', figure: <AxialSymmetryMiniFigure type="twelve_axes" />, categoryId: 'symmetric' },
        { id: 'it3-2', label: 'Általános paralelogramma', figure: <AxialSymmetryMiniFigure type="parallelogram" />, categoryId: 'asymmetric' },
        { id: 'it3-3', label: 'Rombusz', figure: <AxialSymmetryMiniFigure type="rhombus_axes" />, categoryId: 'symmetric' },
        { id: 'it3-4', label: 'Derékszögű háromszög', figure: <AxialSymmetryMiniFigure type="right_triangle" />, categoryId: 'asymmetric' },
        { id: 'it3-5', label: 'Egyenlő szárú húrtrapéz', figure: <AxialSymmetryMiniFigure type="isosceles_trapezoid" />, categoryId: 'symmetric' },
        { id: 'it3-6', label: 'Általános trapéz', figure: <AxialSymmetryMiniFigure type="general_trapezoid" />, categoryId: 'asymmetric' },
        { id: 'it3-7', label: 'Szabályos kilencszög', figure: <AxialSymmetryMiniFigure type="nine_axes" />, categoryId: 'symmetric' },
        { id: 'it3-8', label: '„S” betű (csak középpontos)', figure: <AxialSymmetryMiniFigure type="letter_s" />, categoryId: 'asymmetric' },
        { id: 'it3-9', label: 'Koncentrikus körgyűrű', figure: <AxialSymmetryMiniFigure type="concentric_rings" />, categoryId: 'symmetric' },
        { id: 'it3-10', label: '„Z” betű (nincs tengely)', figure: <AxialSymmetryMiniFigure type="letter_z" />, categoryId: 'asymmetric' }
      ]
    }
  };

  const currentConfig = levelsConfig[level];

  return (
    <SorterTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Tengelyes szimmetria csoportosító"
      badge="📐 6. Osztály • III. Geometria • 8. Fejezet"
      topicId="g6-axial-symmetry-sorter"
      themeColor="violet"
      currentLevel={level}
      config={currentConfig}
      onLevelChange={(lvl) => setLevel(lvl)}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
