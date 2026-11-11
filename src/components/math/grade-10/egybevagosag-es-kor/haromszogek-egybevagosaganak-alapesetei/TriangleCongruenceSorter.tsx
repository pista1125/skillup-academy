import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SssMiniSvg,
  SasMiniSvg,
  AsaMiniSvg,
  SsaMiniSvg,
  RightTriangleMiniSvg
} from './TriangleCongruenceFigures';

interface TriangleCongruenceSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Adathármasok csoportosítása',
    subtitle: 'Válogasd szét, hogy a megadott adatok melyik egybevágósági alapesetet alkotják!',
    categories: [
      {
        id: 'cat-sss',
        name: 'SSS / (o, o, o)',
        description: 'Három oldal hossza ismert',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sas',
        name: 'SAS / (o, sz, o)',
        description: 'Két oldal és a közbezárt szög',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-asa',
        name: 'ASA / (sz, o, sz)',
        description: 'Egy oldal és két szög',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'tcs1-1', content: 'a = 4 cm, b = 7 cm, c = 9 cm', categoryId: 'cat-sss', figure: <SssMiniSvg size={54} /> },
      { id: 'tcs1-2', content: 'a = 5 cm, b = 8 cm, γ = 50°', categoryId: 'cat-sas', figure: <SasMiniSvg size={54} /> },
      { id: 'tcs1-3', content: 'c = 12 cm, α = 30°, β = 70°', categoryId: 'cat-asa', figure: <AsaMiniSvg size={54} /> },
      { id: 'tcs1-4', content: 'x = 3, y = 4, z = 5', categoryId: 'cat-sss' },
      { id: 'tcs1-5', content: 'b = 6 cm, c = 10 cm, α = 45°', categoryId: 'cat-sas' },
      { id: 'tcs1-6', content: 'a = 8 cm, β = 60°, γ = 40°', categoryId: 'cat-asa' },
      { id: 'tcs1-7', content: 'Oldalak: 11 cm, 13 cm, 15 cm', categoryId: 'cat-sss' },
      { id: 'tcs1-8', content: 'Derékszögű befogók: a = 3, b = 4 (γ = 90°)', categoryId: 'cat-sas', figure: <RightTriangleMiniSvg size={54} /> },
      { id: 'tcs1-9', content: 'Alap c = 6 cm, alapi szögek: 50°, 50°', categoryId: 'cat-asa' },
      { id: 'tcs1-10', content: 'Szabályos háromszög 3 oldala: 8, 8, 8 cm', categoryId: 'cat-sss', figure: <SssMiniSvg size={54} /> },
      { id: 'tcs1-11', content: 'Oldalak: 7 és 9 cm, közrezárt szög 110°', categoryId: 'cat-sas', figure: <SasMiniSvg size={54} /> },
      { id: 'tcs1-12', content: 'Átfogó c = 10 cm, hegyesszögek 30° és 60°', categoryId: 'cat-asa', figure: <AsaMiniSvg size={54} /> }
    ]
  },
  2: {
    title: 'Szerkesztési egyértelműség vizsgálata',
    subtitle: 'Csoportosítsd az adatokat aszerint, hogy egyértelmű, több megoldású vagy lehetetlen!',
    categories: [
      {
        id: 'cat-unique',
        name: 'Egyértelmű (1 megoldás)',
        description: 'Pontosan egy háromszög szerkeszthető (egybevágóak)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-ambiguous',
        name: 'Nem egyértelmű (2 megoldás)',
        description: 'A szög a kisebbik oldallal szemben van (SSA csapda)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-impossible',
        name: 'Lehetetlen (0 megoldás)',
        description: 'Háromszög-egyenlőtlenség sérül vagy szögösszeg > 180°',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'tcs2-1', content: 'a = 5 cm, b = 6 cm, c = 7 cm', categoryId: 'cat-unique', figure: <SssMiniSvg size={54} /> },
      { id: 'tcs2-2', content: 'a = 2 cm, b = 3 cm, c = 6 cm (2+3 < 6)', categoryId: 'cat-impossible' },
      { id: 'tcs2-3', content: 'a = 10 cm, b = 6 cm, β = 30° (szög a kisebbel szemben)', categoryId: 'cat-ambiguous', figure: <SsaMiniSvg size={54} /> },
      { id: 'tcs2-4', content: 'a = 6 cm, b = 10 cm, β = 30° (szög a nagyobbal szemben)', categoryId: 'cat-unique', figure: <SsaMiniSvg size={54} /> },
      { id: 'tcs2-5', content: 'α = 90°, β = 100° (összeg > 180°)', categoryId: 'cat-impossible' },
      { id: 'tcs2-6', content: 'a = 8 cm, b = 5 cm, α = 45°', categoryId: 'cat-unique' },
      { id: 'tcs2-7', content: 'a = 4 cm, b = 9 cm, α = 20° (b > a és m < a)', categoryId: 'cat-ambiguous', figure: <SsaMiniSvg size={54} /> },
      { id: 'tcs2-8', content: 'a = 1 cm, b = 1 cm, c = 5 cm', categoryId: 'cat-impossible' },
      { id: 'tcs2-9', content: 'a = 4 cm, b = 7 cm, γ = 65°', categoryId: 'cat-unique' },
      { id: 'tcs2-10', content: 'α = 60°, β = 70°, γ = 50°, c = 8 cm', categoryId: 'cat-unique' },
      { id: 'tcs2-11', content: 'a = 3 cm, b = 8 cm, α = 15° (két metszéspont)', categoryId: 'cat-ambiguous' },
      { id: 'tcs2-12', content: 'a = 4 cm, b = 4 cm, c = 8 cm (elfajuló egyenes szakasz)', categoryId: 'cat-impossible' }
    ]
  },
  3: {
    title: 'Transzformációk és alakzatok tulajdonságai',
    subtitle: 'Milyen geometriai reláció érvényesül az alakzatpárok között?',
    categories: [
      {
        id: 'cat-congruent',
        name: 'Biztosan egybevágóak',
        description: 'Oldalaik és szögeik szigorúan páronként megegyeznek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-similar',
        name: 'Hasonlóak, de nem feltétlen egybevágóak',
        description: 'Szögeik azonosak, de méretük (oldalaik) eltérhet',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-independent',
        name: 'Nem feltétlen hasonlóak',
        description: 'Csak a területük vagy egyetlen adatuk egyezik meg',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      { id: 'tcs3-1', content: 'Két azonos sugarú kör', categoryId: 'cat-congruent' },
      { id: 'tcs3-2', content: 'Két tetszőleges szabályos háromszög', categoryId: 'cat-similar' },
      { id: 'tcs3-3', content: 'Két 30 cm² területű háromszög', categoryId: 'cat-independent' },
      { id: 'tcs3-4', content: 'Egybevágó transzformációval képzett alakzatok', categoryId: 'cat-congruent' },
      { id: 'tcs3-5', content: 'Két 3-4-5 és 6-8-10 oldalú derékszögű háromszög', categoryId: 'cat-similar' },
      { id: 'tcs3-6', content: 'Két rombusz, melyeknek oldala 6 cm', categoryId: 'cat-independent' },
      { id: 'tcs3-7', content: 'Egyenlő szárú háromszög alapja és szára megegyezik', categoryId: 'cat-congruent' },
      { id: 'tcs3-8', content: 'Két négyzet különböző oldalhosszal', categoryId: 'cat-similar' },
      { id: 'tcs3-9', content: 'Paralelogramma átlója által kettévágott két háromszög', categoryId: 'cat-congruent' },
      { id: 'tcs3-10', content: 'Két háromszög, melyeknek szögei 40°, 60°, 80°', categoryId: 'cat-similar' },
      { id: 'tcs3-11', content: 'Két téglalap, melyeknek kerülete 20 cm', categoryId: 'cat-independent' },
      { id: 'tcs3-12', content: 'Deltoid szimmetriaátlója által alkotott két félháromszög', categoryId: 'cat-congruent' }
    ]
  }
};

export const TriangleCongruenceSorter: React.FC<TriangleCongruenceSorterProps> = (props) => {
  return (
    <SorterTemplate
      title="Háromszögek egybevágósága Csoportosító"
      subtitle="Válogasd szét a geometriai állításokat, eseteket és tulajdonságokat a megfelelő kategóriákba!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      color="emerald"
      levels={sorterLevels}
      {...props}
    />
  );
};
