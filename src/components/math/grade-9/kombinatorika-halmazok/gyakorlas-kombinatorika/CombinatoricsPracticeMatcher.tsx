import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CompleteGraph5Svg,
  RoundTableSvg,
  PigeonholeSvg,
  PodiumSvg,
  DigitSlotsSvg,
  BlockSeatingSvg,
  DegreeParitySvg,
  PolygonDiagonalsSvg
} from './CombinatoricsPracticeFigures';

interface CombinatoricsPracticeMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapvető Kombinatorikai Képletek és Típusfeladatok',
    subtitle: 'Párosítsd a feladatokat a helyes kombinatorikai képlettel és számértékkel!',
    pairs: [
      {
        id: 'cpm1-1',
        prompt: 'n különböző elem sorbarendezése (Permutáció)',
        value: 'P_n = n! = n · (n-1) · ... · 1'
      },
      {
        id: 'cpm1-2',
        prompt: 'Kézfogások száma n ember között (mindenki mindenkivel)',
        value: 'n · (n-1) / 2',
        figure: <CompleteGraph5Svg size={70} />
      },
      {
        id: 'cpm1-3',
        prompt: 'n személy leültetése körasztal köré (ciklikus permutáció)',
        value: '(n - 1)!',
        figure: <RoundTableSvg seatsCount={5} size={70} />
      },
      {
        id: 'cpm1-4',
        prompt: 'Háromjegyű valódi számok száma összesen (100–999)',
        value: '9 · 10 · 10 = 900 szám'
      },
      {
        id: 'cpm1-5',
        prompt: '4 fős futóverseny dobogósai (arany, ezüst, bronz)',
        value: '4 · 3 · 2 = 24 sorrend',
        figure: <PodiumSvg size={70} />
      },
      {
        id: 'cpm1-6',
        prompt: '13 ember születési hónapja (Dirichlet-elv)',
        value: 'Legalább kettő ugyanabban a hónapban született',
        figure: <PigeonholeSvg pigeons={13} holes={12} size={75} />
      },
      {
        id: 'cpm1-7',
        prompt: '5 csúcsú teljes gráf éleinek száma',
        value: '(5 · 4) / 2 = 10 él',
        figure: <CompleteGraph5Svg size={70} />
      },
      {
        id: 'cpm1-8',
        prompt: '0! értéke definíció szerint',
        value: '0! = 1'
      }
    ]
  },
  2: {
    title: '2. Szint: Számalkotás, Paritás és Ültetés Megkötésekkel',
    subtitle: 'Párosítsd a feltételes kombinatorikai problémákat a pontos eredménnyel!',
    pairs: [
      {
        id: 'cpm2-1',
        prompt: '3-jegyű különböző jegyű számok {1,2,3,4,5}-ből',
        value: '5 · 4 · 3 = 60 szám'
      },
      {
        id: 'cpm2-2',
        prompt: '3-jegyű különböző jegyű számok {0,1,2,3,4}-ből',
        value: '4 · 4 · 3 = 48 szám (0 nem állhat elöl)',
        figure: (
          <DigitSlotsSvg
            slots={[
              { label: 'Százasok', count: '4', color: '#ec4899' },
              { label: 'Tízesek', count: '4', color: '#6366f1' },
              { label: 'Egyesek', count: '3', color: '#10b981' }
            ]}
            size={85}
          />
        )
      },
      {
        id: 'cpm2-3',
        prompt: '4 barát padban, 2 adott barát egymás mellett ül',
        value: '3! · 2! = 6 · 2 = 12 lehetőség (blokk-elv)',
        figure: <BlockSeatingSvg size={80} />
      },
      {
        id: 'cpm2-4',
        prompt: '4 barát padban, 2 adott barát NEM ül egymás mellett',
        value: '24 - 12 = 12 lehetőség (komplementer)'
      },
      {
        id: 'cpm2-5',
        prompt: '6 ember körmérkőzéses bajnokságának összes meccse',
        value: '(6 · 5) / 2 = 15 mérkőzés',
        figure: <CompleteGraph5Svg size={70} />
      },
      {
        id: 'cpm2-6',
        prompt: 'Egy gráf csúcsainak fokszámösszege (Kézfogási lemma)',
        value: 'Mindig páros szám (2 · élek száma)'
      },
      {
        id: 'cpm2-7',
        prompt: 'Fiókban 8 piros és 8 kék zokni, garantált egyszínű pár',
        value: 'Legalább 3 zoknit kell kivenni vakon'
      },
      {
        id: 'cpm2-8',
        prompt: '5 fős társaság körasztalnál, 2 barát egymás mellett',
        value: '(4 - 1)! · 2! = 6 · 2 = 12 ülésrend',
        figure: <RoundTableSvg seatsCount={5} highlightBlock={true} size={70} />
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Bizonyításos Feladványok',
    subtitle: 'Párosítsd a mesterfokú feladványokat a matematikai indoklással!',
    pairs: [
      {
        id: 'cpm3-1',
        prompt: 'Lehet-e olyan 5 fős társaság, ahol mindenkinek 3 ismerőse van?',
        value: 'Nem létezik, mert a fokszámösszeg 15 lenne (páratlan!)',
        figure: <DegreeParitySvg size={75} />
      },
      {
        id: 'cpm3-2',
        prompt: '4 fiú és 4 lány felváltva ül egy 8 fős padban',
        value: '2 · 4! · 4! = 2 · 24 · 24 = 1 152 lehetőség'
      },
      {
        id: 'cpm3-3',
        prompt: '3-jegyű különböző jegyű páros számok {1,2,3,4,5}-ből',
        value: '4 · 3 · 2 = 24 szám (utolsó jegy 2 vagy 4)'
      },
      {
        id: 'cpm3-4',
        prompt: '3 fiú és 3 lány felváltva körasztal körül',
        value: '(3 - 1)! · 3! = 2 · 6 = 12 ülésrend',
        figure: <RoundTableSvg seatsCount={6} alternating={true} size={70} />
      },
      {
        id: 'cpm3-5',
        prompt: '6 könyv a polcon, 2 matekkönyv nem egymás mellett',
        value: '6! - 5! · 2! = 720 - 240 = 480 sorrend'
      },
      {
        id: 'cpm3-6',
        prompt: '10 csapat körmérkőzése (mindenki játszik mindenkivel)',
        value: '(10 · 9) / 2 = 45 mérkőzés',
        figure: <CompleteGraph5Svg size={70} />
      },
      {
        id: 'cpm3-7',
        prompt: '7 csúcsú konvex sokszög összes átlójának száma',
        value: 'n(n-3)/2 = (7 · 4) / 2 = 14 átló',
        figure: <PolygonDiagonalsSvg size={70} />
      },
      {
        id: 'cpm3-8',
        prompt: 'Páratlan fokszámú csúcsok száma bármely egyszerű gráfban',
        value: 'Csak páros számú lehet'
      }
    ]
  }
};

export const CombinatoricsPracticeMatcher: React.FC<CombinatoricsPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="rose"
      topicId={topicId || 'g9-komb-gyakorlas-matcher'}
      topicTitle={topicTitle || '9. Osztály - Kombinatorika Gyakorló Párosító'}
    />
  );
};

export default CombinatoricsPracticeMatcher;
