import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CongruentShapesMiniFigure,
  CongruenceCaseMiniFigure,
  TransformationMiniFigure,
  PolygonSplitMiniFigure
} from './CongruenceDiagrams';

export interface CongruenceSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function CongruenceSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: CongruenceSorterProps) {
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
    // 1. SZINT: EGYBEVÁGÓ VS. HASONLÓ VS. KÜLÖNBÖZŐ ALAKZATOK
    1: {
      level: 1,
      title: 'Egybevágó, hasonló vagy különböző alakzatok?',
      subtitle: 'Sorold be az alakzatpárokat a megfelelő kategóriába!',
      categories: [
        {
          id: 'congruent',
          title: 'Egybevágó alakzatok (≅)',
          description: 'Alakjuk és méretük is pontosan megegyezik',
          color: 'emerald'
        },
        {
          id: 'similar-only',
          title: 'Csak hasonló alakzatok (~)',
          description: 'Alakjuk azonos, de méretük eltérő',
          color: 'blue'
        },
        {
          id: 'different',
          title: 'Különböző alakzatok',
          description: 'Alakjuk és arányaik sem egyeznek meg',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', figure: <CongruentShapesMiniFigure type="circles" />, text: 'Két kör (r = 5 cm)', categoryId: 'congruent' },
        { id: 'i1-2', figure: <CongruentShapesMiniFigure type="squares" />, text: 'Négyzetek (4 cm és 8 cm)', categoryId: 'similar-only' },
        { id: 'i1-3', figure: <PolygonSplitMiniFigure type="rectangle" />, text: 'Téglalap és tükörképe', categoryId: 'congruent' },
        { id: 'i1-4', figure: <CongruenceCaseMiniFigure type="equilateral" />, text: 'Szabályos △-ek (3 cm és 6 cm)', categoryId: 'similar-only' },
        { id: 'i1-5', figure: <CongruentShapesMiniFigure type="squares" />, text: 'Négyzet és szabályos △', categoryId: 'different' },
        { id: 'i1-6', figure: <CongruenceCaseMiniFigure type="SSS" />, text: 'Két △ 3-4-5 cm oldalakkal', categoryId: 'congruent' },
        { id: 'i1-7', figure: <CongruentShapesMiniFigure type="circles" />, text: 'Két kör (r = 3 cm és 7 cm)', categoryId: 'similar-only' },
        { id: 'i1-8', figure: <CongruentShapesMiniFigure type="perimeters" />, text: 'Kör és négyzet (azonos K)', categoryId: 'different' },
        { id: 'i1-9', figure: <TransformationMiniFigure type="translation" />, text: 'Alakzat és eltolt képe', categoryId: 'congruent' },
        { id: 'i1-10', figure: <CongruentShapesMiniFigure type="triangles" />, text: 'Tompaszögű és derékszögű △', categoryId: 'different' }
      ]
    },

    // 2. SZINT: HÁROMSZÖGEK EGYBEVÁGÓSÁGI FELTÉTELEI
    2: {
      level: 2,
      title: 'Háromszögek egybevágósági feltételei',
      subtitle: 'Döntsd el a megadott adatok alapján, hogy garantált-e az egybevágóság!',
      categories: [
        {
          id: 'valid-congruence',
          title: 'Biztosan egybevágó (Alapeset)',
          description: 'A 4 alapeset valamelyike teljesül: (o-o-o), (o-sz-o), (sz-o-sz), (o-o-sz)',
          color: 'emerald'
        },
        {
          id: 'similarity-only',
          title: 'Csak hasonló (Nem egybevágó)',
          description: 'A szögek egyenlők (sz-sz-sz), de a méret eltérhet',
          color: 'blue'
        },
        {
          id: 'insufficient',
          title: 'Nem elegendő feltétel',
          description: 'Kevés az adat vagy hibás az elrendezés',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i2-1', figure: <CongruenceCaseMiniFigure type="SSS" />, text: 'a, b, c oldalak azonosak (o-o-o)', categoryId: 'valid-congruence' },
        { id: 'i2-2', figure: <CongruenceCaseMiniFigure type="AAA" />, text: 'α, β, γ szögek azonosak (sz-sz-sz)', categoryId: 'similarity-only' },
        { id: 'i2-3', figure: <CongruenceCaseMiniFigure type="SAS" />, text: '2 oldal és közbezárt szög (o-sz-o)', categoryId: 'valid-congruence' },
        { id: 'i2-4', figure: <CongruentShapesMiniFigure type="segments" />, text: 'Csak két oldal egyezik meg', categoryId: 'insufficient' },
        { id: 'i2-5', figure: <CongruenceCaseMiniFigure type="ASA" />, text: '1 oldal és 2 rajta fekvő szög (sz-o-sz)', categoryId: 'valid-congruence' },
        { id: 'i2-6', figure: <CongruenceCaseMiniFigure type="equilateral" />, text: 'Két szabályos △ szögei (60°)', categoryId: 'similarity-only' },
        { id: 'i2-7', figure: <CongruenceCaseMiniFigure type="SsA" />, text: '2 oldal + nagyobbikkal szemközti szög', categoryId: 'valid-congruence' },
        { id: 'i2-8', figure: <CongruentShapesMiniFigure type="angles" />, text: '2 oldal + kisebbikkel szemközti szög', categoryId: 'insufficient' },
        { id: 'i2-9', figure: <CongruentShapesMiniFigure type="perimeters" />, text: 'Csak a kerületük egyenlő', categoryId: 'insufficient' },
        { id: 'i2-10', figure: <CongruentShapesMiniFigure type="triangle_sides_angles" />, text: 'Azonos szögek, 2-szeres méret', categoryId: 'similarity-only' }
      ]
    },

    // 3. SZINT: GEOMETRIAI TRANSZFORMÁCIÓK TULAJDONSÁGAI
    3: {
      level: 3,
      title: 'Geometriai transzformációk csoportosítása',
      subtitle: 'Sorold be a leképezéseket a körüljárási irány és az egybevágóság megtartása szerint!',
      categories: [
        {
          id: 'direct-isometry',
          title: 'Közvetlen egybevágóság (Iránytartó)',
          description: 'A körüljárási irány változatlan marad',
          color: 'blue'
        },
        {
          id: 'opposite-isometry',
          title: 'Közvetett egybevágóság (Irányváltó)',
          description: 'A körüljárási irány megfordul',
          color: 'emerald'
        },
        {
          id: 'not-isometry',
          title: 'Nem egybevágóság',
          description: 'A méret vagy az alak megváltozik',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i3-1', figure: <TransformationMiniFigure type="translation" />, text: 'Párhuzamos eltolás', categoryId: 'direct-isometry' },
        { id: 'i3-2', figure: <TransformationMiniFigure type="axial_reflection" />, text: 'Tengelyes tükrözés', categoryId: 'opposite-isometry' },
        { id: 'i3-3', figure: <TransformationMiniFigure type="rotation" />, text: 'Elforgatás +90°-kal', categoryId: 'direct-isometry' },
        { id: 'i3-4', figure: <CongruentShapesMiniFigure type="triangles" />, text: 'Középpontos nagyítás (2x)', categoryId: 'not-isometry' },
        { id: 'i3-5', figure: <TransformationMiniFigure type="central_reflection" />, text: 'Középpontos tükrözés (180°)', categoryId: 'direct-isometry' },
        { id: 'i3-6', figure: <TransformationMiniFigure type="axial_reflection" />, text: 'Tükrözés az y tengelyre', categoryId: 'opposite-isometry' },
        { id: 'i3-7', figure: <CongruentShapesMiniFigure type="triangles" />, text: 'Alakzat kicsinyítése', categoryId: 'not-isometry' },
        { id: 'i3-8', figure: <TransformationMiniFigure type="translation" />, text: 'Csúsztatás a síkon', categoryId: 'direct-isometry' },
        { id: 'i3-9', figure: <CongruentShapesMiniFigure type="orientation" />, text: 'Jobb kéz ⟹ bal kéz tükörképe', categoryId: 'opposite-isometry' },
        { id: 'i3-10', figure: <PolygonSplitMiniFigure type="rhombus" />, text: 'Vízszintes összenyomás / nyújtás', categoryId: 'not-isometry' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-geometry"
      title="Egybevágóság Csoportosító"
      subtitle="Rendezd az alakzatokat, tételeket és transzformációkat a megfelelő kategóriákba!"
      badge="📐 6. Osztály • III. Geometria • 2. Fejezet"
      topicId="g6-congruence-sorter"
      themeColor="orange"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}
