import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  IsoscelesMiniSvg,
  PerpendicularBisectorMiniSvg,
  ParallelogramMiniSvg,
  KiteMiniSvg
} from './CongruentTrianglesFigures';

interface CongruentTrianglesSorterProps {
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
    title: 'Nevezetes pontok helyzete a háromszögben',
    subtitle: 'Válogasd szét, melyik háromszögtípusban hol helyezkedik el a magasságpont vagy körülírt kör középpontja!',
    categories: [
      {
        id: 'cat-inside',
        name: 'Mindig a háromszögön BELÜL van',
        description: 'Belső szögfelezők és súlypont bármely háromszögben',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-boundary',
        name: 'A háromszög HATÁRÁN (oldalon vagy csúcson)',
        description: 'Derékszögű háromszög átfogóján vagy derékszögű csúcsán',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-outside',
        name: 'A háromszögön KÍVÜL helyezkedik el',
        description: 'Tompaszögű háromszög magasságpontja és köré írt kör középpontja',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'cts1-1', content: 'Bármely háromszög súlypontja (S)', categoryId: 'cat-inside', figure: <IsoscelesMiniSvg size={54} /> },
      { id: 'cts1-2', content: 'Derékszögű háromszög magasságpontja (a derékszögű csúcs)', categoryId: 'cat-boundary' },
      { id: 'cts1-3', content: 'Tompaszögű háromszög magasságpontja (M)', categoryId: 'cat-outside' },
      { id: 'cts1-4', content: 'Bármely háromszög beírt körének középpontja (K)', categoryId: 'cat-inside' },
      { id: 'cts1-5', content: 'Derékszögű körülírt körének középpontja (átfogó felezője)', categoryId: 'cat-boundary', figure: <PerpendicularBisectorMiniSvg size={54} /> },
      { id: 'cts1-6', content: 'Tompaszögű körülírt körének középpontja (O)', categoryId: 'cat-outside' },
      { id: 'cts1-7', content: 'Hegyesszögű háromszög magasságpontja', categoryId: 'cat-inside' },
      { id: 'cts1-8', content: 'Hegyesszögű háromszög körülírt körének középpontja', categoryId: 'cat-inside' },
      { id: 'cts1-9', content: 'Szabályos háromszög összes nevezetes pontja', categoryId: 'cat-inside', figure: <IsoscelesMiniSvg size={54} /> },
      { id: 'cts1-10', content: '120°-os szögű háromszög magasságpontja', categoryId: 'cat-outside' },
      { id: 'cts1-11', content: 'Pitagoraszi 3-4-5 háromszög átfogójának közepe', categoryId: 'cat-boundary' },
      { id: 'cts1-12', content: 'Egyenlő szárú háromszög súlypontja', categoryId: 'cat-inside', figure: <IsoscelesMiniSvg size={54} /> }
    ]
  },
  2: {
    title: 'Négyszögek szimmetriái és tulajdonságai',
    subtitle: 'Csoportosítsd a négyszögeket az átlóik tulajdonságai alapján!',
    categories: [
      {
        id: 'cat-perp',
        name: 'Átlói merőlegesek egymásra',
        description: 'Rombusz, deltoid, négyzet',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-equal',
        name: 'Átlói egyenlő hosszúak',
        description: 'Téglalap, négyzet, húrtrapéz',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-bisect',
        name: 'Átlói kölcsönösen felezik egymást',
        description: 'Minden paralelogramma (paralelogramma, rombusz, téglalap, négyzet)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'cts2-1', content: 'Rombusz átlói (merőlegesek)', categoryId: 'cat-perp' },
      { id: 'cts2-2', content: 'Téglalap átlói (egyenlő hosszúak)', categoryId: 'cat-equal' },
      { id: 'cts2-3', content: 'Általános paralelogramma átlói', categoryId: 'cat-bisect', figure: <ParallelogramMiniSvg size={54} /> },
      { id: 'cts2-4', content: 'Deltoid átlói (e ⊥ f)', categoryId: 'cat-perp', figure: <KiteMiniSvg size={54} /> },
      { id: 'cts2-5', content: 'Húrtrapéz átlói (egyenlő hosszúak)', categoryId: 'cat-equal' },
      { id: 'cts2-6', content: 'Négyzet átlói (merőlegesek is egymásra)', categoryId: 'cat-perp' },
      { id: 'cts2-7', content: 'Négyzet átlói (egyforma hosszúak is)', categoryId: 'cat-equal' },
      { id: 'cts2-8', content: 'Rombusz átlói (felezik is egymást)', categoryId: 'cat-bisect', figure: <ParallelogramMiniSvg size={54} /> },
      { id: 'cts2-9', content: 'Téglalap átlói (felezik is egymást)', categoryId: 'cat-bisect' },
      { id: 'cts2-10', content: 'Szimmetrikus deltoid átlói', categoryId: 'cat-perp', figure: <KiteMiniSvg size={54} /> },
      { id: 'cts2-11', content: 'Egyenlő szárú trapéz átlói', categoryId: 'cat-equal' },
      { id: 'cts2-12', content: 'Négyzet átlói (kölcsönösen felezik egymást)', categoryId: 'cat-bisect' }
    ]
  },
  3: {
    title: 'Háromszög-típusok szimmetriatengelyei',
    subtitle: 'Válogasd szét a háromszögeket a szimmetriatengelyeik száma szerint!',
    categories: [
      {
        id: 'cat-zero',
        name: '0 szimmetriatengely',
        description: 'Általános (különböző oldalú) háromszögek',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      },
      {
        id: 'cat-one',
        name: 'Pontosan 1 szimmetriatengely',
        description: 'Egyenlő szárú (nem szabályos) háromszögek',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-three',
        name: 'Pontosan 3 szimmetriatengely',
        description: 'Szabályos (egyenlő oldalú) háromszögek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'cts3-1', content: 'Oldalai: 5 cm, 6 cm, 7 cm', categoryId: 'cat-zero' },
      { id: 'cts3-2', content: 'Oldalai: 8 cm, 8 cm, 10 cm', categoryId: 'cat-one' },
      { id: 'cts3-3', content: 'Oldalai: 6 cm, 6 cm, 6 cm', categoryId: 'cat-three' },
      { id: 'cts3-4', content: 'Derékszögű háromszög 3-4-5 oldalakkal', categoryId: 'cat-zero' },
      { id: 'cts3-5', content: 'Egyenlő szárú derékszögű háromszög (45°-45°-90°)', categoryId: 'cat-one' },
      { id: 'cts3-6', content: 'Minden szöge 60°-os háromszög', categoryId: 'cat-three' },
      { id: 'cts3-7', content: 'Szögei: 40°, 60°, 80°', categoryId: 'cat-zero' },
      { id: 'cts3-8', content: 'Szögei: 30°, 75°, 75°', categoryId: 'cat-one' },
      { id: 'cts3-9', content: 'Szabályos háromszög beírt és körülírt körrel', categoryId: 'cat-three' },
      { id: 'cts3-10', content: 'Tompaszögű egyenlő szárú (120°, 30°, 30°)', categoryId: 'cat-one' },
      { id: 'cts3-11', content: 'Pitagoraszi 5-12-13 derékszögű', categoryId: 'cat-zero' },
      { id: 'cts3-12', content: 'Háromszög, melynek minden oldala a = 12 cm', categoryId: 'cat-three' }
    ]
  }
};

export const CongruentTrianglesSorter: React.FC<CongruentTrianglesSorterProps> = (props) => {
  return (
    <SorterTemplate
      title="Egybevágó háromszögek Csoportosító"
      subtitle="Válogasd szét a geometriai állításokat, eseteket és tulajdonságokat a megfelelő kategóriákba!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      color="teal"
      levels={sorterLevels}
      {...props}
    />
  );
};
