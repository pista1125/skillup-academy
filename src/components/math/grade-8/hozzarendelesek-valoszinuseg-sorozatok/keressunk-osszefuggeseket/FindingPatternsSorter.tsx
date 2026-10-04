import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FindingPatternsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Sorozatok és Mintázatok Növekedési Típusa',
    subtitle: 'Csoportosítsd a sorozatokat: Lineáris (+d), Másodfokú (n² jellegű), vagy Exponenciális (·q)!',
    categories: [
      {
        id: 'cat-lin',
        name: 'Lineáris (Állandó Differencia)',
        description: 'A szomszédos elemek különbsége állandó számmal növekszik (d = konstans)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-quad',
        name: 'Másodfokú (Négyzetes)',
        description: 'A tagok különbségei egyenletesen nőnek (2. rendű differencia állandó)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-exp',
        name: 'Exponenciális (Mértani)',
        description: 'Minden tag az előzőnek egy állandó számszorosa (pl. duplázódik, triplázódik)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 's1-1', label: '3, 7, 11, 15, 19... (mindig +4)', category: 'cat-lin' },
      { id: 's1-2', label: 'Gyufaszál négyzetlánc: 4, 7, 10, 13... [f(n) = 3n + 1]', category: 'cat-lin' },
      { id: 's1-3', label: '100, 95, 90, 85, 80... (mindig -5)', category: 'cat-lin' },
      { id: 's1-4', label: 'Páros számok: 2, 4, 6, 8, 10... [2n]', category: 'cat-lin' },
      { id: 's1-5', label: 'Háromszögszámok: 1, 3, 6, 10, 15, 21...', category: 'cat-quad' },
      { id: 's1-6', label: 'Négyzetszámok: 1, 4, 9, 16, 25, 36... [n²]', category: 'cat-quad' },
      { id: 's1-7', label: 'Kézfogások száma: 0, 1, 3, 6, 10... [n(n-1)/2]', category: 'cat-quad' },
      { id: 's1-8', label: 'Konvex sokszögek átlói: 0, 2, 5, 9, 14, 20... [n(n-3)/2]', category: 'cat-quad' },
      { id: 's1-9', label: '2, 4, 8, 16, 32, 64... [2ⁿ hatványok]', category: 'cat-exp' },
      { id: 's1-10', label: '1, 3, 9, 27, 81... [3ⁿ hatványok]', category: 'cat-exp' },
      { id: 's1-11', label: 'Baktériumok osztódása (minden lépésben megduplázódnak)', category: 'cat-exp' },
      { id: 's1-12', label: '64, 32, 16, 8, 4, 2... (mindig felére csökken)', category: 'cat-exp' }
    ]
  },
  2: {
    title: '2. Szint: Képletek és Matematikai Területek',
    subtitle: 'Válogasd szét a feladványokat a matematikai alkalmazási területük szerint!',
    categories: [
      {
        id: 'cat-geom',
        name: 'Sokszögek Geometriája',
        description: 'Csúcsok, átlók, belső szögek és oldalak összefüggései n oldalú sokszögekben',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-match',
        name: 'Gyufaszál- és Láncalakzatok',
        description: 'Egymáshoz kapcsolódó geometriai cellákból épített mintázatok elemszámai',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-comb',
        name: 'Kombinatorika és Sorozatösszegek',
        description: 'Kézfogások, körmérkőzések, Gauss-összeg és háromszögszámok',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Konvex sokszög átlóinak száma: n(n - 3) / 2', category: 'cat-geom' },
      { id: 's2-2', label: 'Konvex n-szög belső szögeinek összege: (n - 2) · 180°', category: 'cat-geom' },
      { id: 's2-3', label: 'Egy csúcsból húzható átlók száma: n - 3', category: 'cat-geom' },
      { id: 's2-4', label: 'Egy csúcsból behúzható átlók által alkotott háromszögek száma: n - 2', category: 'cat-geom' },
      { id: 's2-5', label: 'Négyzetlánc gyufaszálainak száma: 3n + 1', category: 'cat-match' },
      { id: 's2-6', label: 'Háromszöglánc gyufaszálainak száma: 2n + 1', category: 'cat-match' },
      { id: 's2-7', label: 'Házikólánc (négyzet + tető) gyufaszálai: 5n + 1', category: 'cat-match' },
      { id: 's2-8', label: 'Kerítésoszlopok (n) és a köztük lévő lécek (n - 1 mező)', category: 'cat-match' },
      { id: 's2-9', label: 'n ember közötti összes kézfogás: n(n - 1) / 2', category: 'cat-comb' },
      { id: 's2-10', label: 'Háromszögszámok (első n szám összege): n(n + 1) / 2', category: 'cat-comb' },
      { id: 's2-11', label: 'Bajnokság meccseinek száma oda-visszavágó nélkül: n(n - 1) / 2', category: 'cat-comb' },
      { id: 's2-12', label: 'Két szomszédos háromszögszám összege: T_{n-1} + T_n = n²', category: 'cat-comb' }
    ]
  },
  3: {
    title: '3. Szint: Igaz, Hamis és Tévhitek Mintázatoknál',
    subtitle: 'Döntsd el a mintázatokról és szabályokról szóló kijelentésekről, hogy igazak vagy tévhitek!',
    categories: [
      {
        id: 'cat-true',
        name: 'Matematikailag Igaz',
        description: 'Bizonyított, minden esetben érvényes szabály',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-spec',
        name: 'Csak Bizonyos Esetben Igaz',
        description: 'Csak adott feltétel vagy speciális sorozat esetén teljesül',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-false',
        name: 'Matematikai Tévhit',
        description: 'Elhamarkodott következtetés vagy hibás képlet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Két egymást követő háromszögszám összege mindig négyzetszám', category: 'cat-true' },
      { id: 's3-2', label: 'A háromszögnek pontosan 0 darab átlója van [3 · 0 / 2 = 0]', category: 'cat-true' },
      { id: 's3-3', label: 'Ha a differencia (d) állandó, a sorozat grafikonja egy egyenesre esik', category: 'cat-true' },
      { id: 's3-4', label: 'A kézfogások száma mindig egész szám, mert n és (n-1) közül az egyik biztosan páros', category: 'cat-true' },
      { id: 's3-5', label: 'A sorozat tagjai csak pozitív egész számok lehetnek', category: 'cat-spec' },
      { id: 's3-6', label: 'A különbségek vizsgálatával mindig egyértelműen meghatározható a szabály', category: 'cat-spec' },
      { id: 's3-7', label: 'Az alakzatok elemszáma arányos a sorszámmal (egyenes arányosság)', category: 'cat-spec' },
      { id: 's3-8', label: 'A sorozat növekvő (a tagok mindig nagyobbak az előzőnél)', category: 'cat-spec' },
      { id: 's3-9', label: '„A 2, 4 után a következő szám KIZÁRÓLAG a 6 lehet, semmi más”', category: 'cat-false' },
      { id: 's3-10', label: '„Ha egy négyzet 4 gyufából áll, akkor 10 négyzetből álló lánchoz 40 gyufa kell”', category: 'cat-false' },
      { id: 's3-11', label: '„Egy konvex sokszögnek mindig kétszer annyi átlója van, mint oldala”', category: 'cat-false' },
      { id: 's3-12', label: '„A háromszögszámok képlete T_n = n² / 2”', category: 'cat-false' }
    ]
  }
};

export const FindingPatternsSorter: React.FC<FindingPatternsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'finding-patterns',
  topicTitle = 'Keressünk Összefüggéseket!'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="VI. FEJEZET • 8. OSZTÁLY"
      themeColor="amber"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default FindingPatternsSorter;
