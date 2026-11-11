import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CoinFlipLawOfLargeNumbersSvg,
  ThreeCoinsOutcomesSvg,
  DiceSimulationFrequencySvg
} from './RandomFrequencyFigures';

interface RandomFrequencySorterProps {
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
    title: 'Kísérleti események esélyének nagyságrendi csoportosítása',
    subtitle: 'Határozd meg az események valószínűségét vagy relatív gyakoriságát, és sorold be a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-small',
        name: 'Esély < 25%',
        description: 'Ritka, kis valószínűségű kimenetel',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-med',
        name: '25% ≤ Esély ≤ 50%',
        description: 'Közepesen esélyes esemény',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-large',
        name: 'Esély > 50%',
        description: 'Gyakori, nagy valószínűségű kimenetel',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'rfs1-1', content: 'Szabályos kockával 6-os dobása', categoryId: 'cat-small', figure: <DiceSimulationFrequencySvg size={54} /> },
      { id: 'rfs1-2', content: '3 érmével mindhárom érmén fej dobása', categoryId: 'cat-small', figure: <ThreeCoinsOutcomesSvg size={54} /> },
      { id: 'rfs1-3', content: 'Két kockával dobva az összeg 12', categoryId: 'cat-small' },
      { id: 'rfs1-4', content: 'Két kockával dobva mindkettőn 1-es', categoryId: 'cat-small' },

      { id: 'rfs1-5', content: '2 érmével két fej dobása', categoryId: 'cat-med' },
      { id: 'rfs1-6', content: '1 érmével fej dobása', categoryId: 'cat-med', figure: <CoinFlipLawOfLargeNumbersSvg size={54} /> },
      { id: 'rfs1-7', content: 'Szabályos kockával páros szám dobása', categoryId: 'cat-med' },
      { id: 'rfs1-8', content: '3 érmével pontosan 1 fej dobása', categoryId: 'cat-med' },

      { id: 'rfs1-9', content: 'Szabályos kockával 2-nél nagyobb szám dobása', categoryId: 'cat-large' },
      { id: 'rfs1-10', content: 'Szabályos kockával NEM 6-os dobása', categoryId: 'cat-large' },
      { id: 'rfs1-11', content: '2 érmével legalább egy fej dobása', categoryId: 'cat-large' },
      { id: 'rfs1-12', content: 'Szabályos kockával 7-nél kisebb szám dobása', categoryId: 'cat-large' }
    ]
  },
  2: {
    title: 'Matematikai Igazság vs. Tévhit a véletlenről',
    subtitle: 'Válogasd szét a nagy számok törvényének igaz szabályait és a játékosok téves megérzéseit!',
    categories: [
      {
        id: 'cat-truth',
        name: 'Matematikai Igazság',
        description: 'Tétel vagy tapasztalatilag igazolt törvényszerűség',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-myth',
        name: 'Tévhit / Játékosok tévedése',
        description: 'Gyakori félreértés vagy hibás érvelés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'rfs2-1', content: 'Sok kísérletnél a relatív gyakoriság egy elméleti értékhez (valószínűséghez) simul', categoryId: 'cat-truth', figure: <CoinFlipLawOfLargeNumbersSvg size={54} /> },
      { id: 'rfs2-2', content: 'A relatív gyakoriság értéke mindig a [0; 1] intervallumba (0% és 100% közé) esik', categoryId: 'cat-truth' },
      { id: 'rfs2-3', content: 'Független kísérleteknél a korábbi kimenetelek semmilyen hatással nincsenek a következő dobásra', categoryId: 'cat-truth' },
      { id: 'rfs2-4', content: 'Biztos esemény relatív gyakorisága minden kísérletsorozatban pontosan 1', categoryId: 'cat-truth' },
      { id: 'rfs2-5', content: 'Lehetetlen esemény relatív gyakorisága és valószínűsége szigorúan 0', categoryId: 'cat-truth' },
      { id: 'rfs2-6', content: '3 érme feldobásakor 8 egyenlően valószínű elemi kimenetel létezik (2³ = 8)', categoryId: 'cat-truth', figure: <ThreeCoinsOutcomesSvg size={54} /> },

      { id: 'rfs2-7', content: 'Ha egymás után 5 fejet dobtunk, a 6. dobásra már biztosan „beérik” az írás', categoryId: 'cat-myth' },
      { id: 'rfs2-8', content: 'Minden 10 dobásból álló sorozatban pontosan 5 fejnek és 5 írásnak kell születnie', categoryId: 'cat-myth' },
      { id: 'rfs2-9', content: 'A gyakoriság és a relatív gyakoriság pontosan ugyanazt a fogalmat jelenti', categoryId: 'cat-myth' },
      { id: 'rfs2-10', content: '3 érménél a 3 fej, 2 fej, 1 fej, 0 fej kimenetelek egyforma eséllyel fordulnak elő', categoryId: 'cat-myth', figure: <ThreeCoinsOutcomesSvg size={54} /> },
      { id: 'rfs2-11', content: 'Egy esemény relatív gyakorisága szélsőséges kísérletben negatív szám is lehet', categoryId: 'cat-myth' },
      { id: 'rfs2-12', content: 'Mindössze 5-10 kísérletből is pontosan megállapítható egy ismeretlen kocka torzítása', categoryId: 'cat-myth' }
    ]
  },
  3: {
    title: 'Gyakoriság, Relatív gyakoriság vagy Elméleti valószínűség?',
    subtitle: 'Melyik alapfogalomra vonatkoznak az alábbi állítások és példák?',
    categories: [
      {
        id: 'cat-freq',
        name: 'Gyakoriság (k)',
        description: 'A bekövetkezések konkrét darabszáma (nemnegatív egész szám)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-relfreq',
        name: 'Relatív gyakoriság (k/n)',
        description: 'Kísérletből számított tapasztalati arány (0 és 1 közötti tört)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-prob',
        name: 'Elméleti valószínűség (P)',
        description: 'Matematikai modellből számított pontos elméleti esély',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'rfs3-1', content: '50 érmedobásból pontosan 24 alkalommal lett fej', categoryId: 'cat-freq' },
      { id: 'rfs3-2', content: 'A megvizsgált 850 alkatrészből 17 selejtes darabot találtak a minőségellenőrök', categoryId: 'cat-freq' },
      { id: 'rfs3-3', content: 'Azt mutatja meg, hogy az esemény hányszor következett be az n kísérlet során', categoryId: 'cat-freq' },

      { id: 'rfs3-4', content: '50 dobásból a fejek aránya: 24/50 = 0,48 (48%)', categoryId: 'cat-relfreq', figure: <CoinFlipLawOfLargeNumbersSvg size={54} /> },
      { id: 'rfs3-5', content: 'A kísérletek számának növelésével ingadozása egyre kisebbé válik', categoryId: 'cat-relfreq' },
      { id: 'rfs3-6', content: 'Az adott kísérletsorozatban megfigyelt bekövetkezési hányados (k / n)', categoryId: 'cat-relfreq' },

      { id: 'rfs3-7', content: 'Szabályos dobókockán a 6-os dobásának eleve rögzített matematikai esélye: 1/6', categoryId: 'cat-prob', figure: <DiceSimulationFrequencySvg size={54} /> },
      { id: 'rfs3-8', content: 'Szimmetria alapján a kedvező és összes kimenetel hányadosaként kapott számérték', categoryId: 'cat-prob' },
      { id: 'rfs3-9', content: 'Az a határérték, amihez végtelen sok kísérlet esetén a relatív gyakoriság tart', categoryId: 'cat-prob' }
    ]
  }
};

export const RandomFrequencySorter: React.FC<RandomFrequencySorterProps> = (props) => {
  return (
    <SorterTemplate
      topicId={props.topicId || 'g10-stat-veletlen-relativ-gyakorisag-sorter'}
      topicTitle={props.topicTitle || 'Véletlen? – Relatív gyakoriság'}
      levels={sorterLevels}
      {...props}
    />
  );
};

export default RandomFrequencySorter;
