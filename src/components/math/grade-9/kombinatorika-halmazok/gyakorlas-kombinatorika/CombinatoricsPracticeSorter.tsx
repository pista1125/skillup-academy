import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CompleteGraph5Svg,
  RoundTableSvg,
  PigeonholeSvg,
  PodiumSvg,
  BlockSeatingSvg
} from './CombinatoricsPracticeFigures';

interface CombinatoricsPracticeSorterProps {
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
    title: '1. Szint: Megoldási Módszer és Modell Besorolása',
    subtitle: 'Döntsd el, hogy Permutáció, Páronkénti kapcsolat (Kézfogás) vagy Skatulya-elv szükséges!',
    categories: [
      {
        id: 'cat-perm',
        name: 'Permutáció & Szorzási Szabály',
        description: 'Elemek sorba rendezése és független helyiértékek szorzata',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-pairs',
        name: 'Páronkénti Kapcsolat (Kézfogás)',
        description: 'Kétirányú, kölcsönös események száma (n(n-1)/2)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-dirichlet',
        name: 'Skatulya-elv (Dirichlet-elv)',
        description: 'Biztos egyezések és garantált rekesz-tartalmak bizonyítása',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'cps1-1', label: '5 könyv sorbarendezése egy polcon', category: 'cat-perm' },
      { id: 'cps1-2', label: '4-jegyű bankkártya PIN kódok száma', category: 'cat-perm' },
      { id: 'cps1-3', label: '6 fős futóverseny dobogósai (arany, ezüst, bronz)', category: 'cat-perm', figure: <PodiumSvg size={65} /> },
      { id: 'cps1-4', label: '3-jegyű számok {1,2,3,4}-ből ismétlés nélkül', category: 'cat-perm' },
      { id: 'cps1-5', label: '8 fős társaság kézfogásai találkozáskor', category: 'cat-pairs', figure: <CompleteGraph5Svg size={65} /> },
      { id: 'cps1-6', label: '6 csapatos bajnokság összes körmérkőzése', category: 'cat-pairs' },
      { id: 'cps1-7', label: '10 fős szilveszteri társaság koccintásai', category: 'cat-pairs' },
      { id: 'cps1-8', label: '6 csúcsú teljes gráf összes éle', category: 'cat-pairs', figure: <CompleteGraph5Svg size={65} /> },
      { id: 'cps1-9', label: '13 ember között biztosan van kettő azonos születési hónappal', category: 'cat-dirichlet', figure: <PigeonholeSvg pigeons={13} holes={12} size={70} /> },
      { id: 'cps1-10', label: '8 ember között biztosan van kettő, aki a hét azonos napján született', category: 'cat-dirichlet' },
      { id: 'cps1-11', label: 'Zoknis fiókból minimálisan kivett zoknik 2 szín esetén a biztos párhoz', category: 'cat-dirichlet' },
      { id: 'cps1-12', label: '37 fős osztályban legalább 4 diák ugyanabban a hónapban született', category: 'cat-dirichlet' }
    ]
  },
  2: {
    title: '2. Szint: Feltételek és Számítási Logika Csoportosítása',
    subtitle: 'Különböztesd meg az ismétléses, ismétlés nélküli és komplementer eseteket!',
    categories: [
      {
        id: 'cat-repeat',
        name: 'Ismétlés Megengedett (n^k)',
        description: 'Minden pozícióra a teljes elemkészletből választhatunk',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-norepeat',
        name: 'Ismétlés Nélküli Sorrendek',
        description: 'Minden felhasznált elem kiesik, csökkenő tényezők szorzata',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-complement',
        name: 'Komplementer / Feltételes',
        description: '„Nincsenek egymás mellett”, „legalább egy azonos” (összes mínusz tiltott)',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      }
    ],
    items: [
      { id: 'cps2-1', label: '3-tárcsás bőrönd lakat összes beállítása', category: 'cat-repeat' },
      { id: 'cps2-2', label: '8 bites bináris bájt lehetséges állapotai', category: 'cat-repeat' },
      { id: 'cps2-3', label: '4 kockával dobunk egyszerre: kimenetelek száma', category: 'cat-repeat' },
      { id: 'cps2-4', label: '5 mérkőzéses TOTÓ szelvény összes kitöltése', category: 'cat-repeat' },
      { id: 'cps2-5', label: '6 futó célba érési sorrendje', category: 'cat-norepeat', figure: <PodiumSvg size={65} /> },
      { id: 'cps2-6', label: '8 fős csoportból elnök és titkár választása', category: 'cat-norepeat' },
      { id: 'cps2-7', label: '4 betűs szó (pl. LÁMP) összes anagrammája', category: 'cat-norepeat' },
      { id: 'cps2-8', label: '5 különböző kártyalap kiosztása 5 játékosnak', category: 'cat-norepeat' },
      { id: 'cps2-9', label: '5 ember padban, 2 barát NEM ülhet egymás mellett', category: 'cat-complement', figure: <BlockSeatingSvg size={70} /> },
      { id: 'cps2-10', label: '4-jegyű PIN legalább egy ismétlődő számjeggyel', category: 'cat-complement' },
      { id: 'cps2-11', label: 'Legalább egy 6-ost dobunk 3 szabályos kockával', category: 'cat-complement' },
      { id: 'cps2-12', label: '6 ember kerekasztalnál, 2 barát NEM ülhet egymás mellett', category: 'cat-complement', figure: <RoundTableSvg seatsCount={6} size={65} /> }
    ]
  },
  3: {
    title: '3. Szint: Eredmények Nagyságrendi Besorolása',
    subtitle: 'Számold ki vagy becsüld meg a kombinatorikai érték nagyságrendjét!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kicsi Érték (Legfeljebb 24)',
        description: 'Eredmény: 1 és 24 között',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes Érték (25 és 100 között)',
        description: 'Eredmény: 25 és 100 között',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-large',
        name: 'Nagy Érték (100 felett)',
        description: 'Eredmény: 100 felett',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'cps3-1', label: '4 ember összes lehetséges sorbarendezése egyenesben', category: 'cat-small' },
      { id: 'cps3-2', label: '5 ember kézfogásai (mindenki mindenkivel)', category: 'cat-small', figure: <CompleteGraph5Svg size={65} /> },
      { id: 'cps3-3', label: '5 ember leülése egy kerekasztal köré', category: 'cat-small', figure: <RoundTableSvg seatsCount={5} size={65} /> },
      { id: 'cps3-4', label: '3-jegyű páros számok {1,2,3,4,5}-ből ismétlés nélkül', category: 'cat-small' },
      { id: 'cps3-5', label: '8 fős sakkbajnokság körmérkőzéseinek száma', category: 'cat-medium' },
      { id: 'cps3-6', label: '10 fős szilveszteri buli koccintásai', category: 'cat-medium' },
      { id: 'cps3-7', label: '5 ember ül egy padban, 2 barát egymás mellett', category: 'cat-medium', figure: <BlockSeatingSvg size={70} /> },
      { id: 'cps3-8', label: '3 fiú és 3 lány felváltva ül egy 6 fős padban', category: 'cat-medium' },
      { id: 'cps3-9', label: '5 könyv tetszőleges sorbarendezése a polcon', category: 'cat-large' },
      { id: 'cps3-10', label: '8 fős futóverseny dobogósai (arany, ezüst, bronz)', category: 'cat-large', figure: <PodiumSvg size={65} /> },
      { id: 'cps3-11', label: '6 diák összes ülésrendje egy 6 fős padsorban', category: 'cat-large' },
      { id: 'cps3-12', label: 'Háromjegyű valódi számok száma (100–999)', category: 'cat-large' }
    ]
  }
};

export const CombinatoricsPracticeSorter: React.FC<CombinatoricsPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-komb-gyakorlas-sorter'}
      topicTitle={topicTitle || '9. Osztály - Kombinatorika Gyakorló Csoportosító'}
    />
  );
};

export default CombinatoricsPracticeSorter;
