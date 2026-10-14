import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface StatsSummaryMatcherProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

const LEVEL_1_PAIRS: MatcherPair[] = [
  {
    id: 'sm-m1-1',
    prompt: 'Függvény definíciója',
    value: 'Minden alaphalmazbeli elemhez pontosan egy képelem tartozik',
  },
  {
    id: 'sm-m1-2',
    prompt: 'Számtani közép (átlag)',
    value: 'Az adatok összegének és darabszámának hányadosa: x̄ = Σx / n',
  },
  {
    id: 'sm-m1-3',
    prompt: 'Módusz (Mo)',
    value: 'A mintában a leggyakrabban előforduló érték',
  },
  {
    id: 'sm-m1-4',
    prompt: 'Medián (Me)',
    value: 'A nagyság szerint növekvő sorrendbe rendezett minta középső eleme',
  },
  {
    id: 'sm-m1-5',
    prompt: 'Terjedelem (R)',
    value: 'A legnagyobb és a legkisebb adat különbsége: R = max - min',
  },
  {
    id: 'sm-m1-6',
    prompt: 'Relatív gyakoriság (g)',
    value: 'g = k / n (az összes relatív gyakoriság összege 100%)',
  },
  {
    id: 'sm-m1-7',
    prompt: 'Klasszikus valószínűség',
    value: 'P(A) = kedvező esetek / összes eset = k / n',
  },
  {
    id: 'sm-m1-8',
    prompt: 'Nagy számok törvénye',
    value: 'Sok kísérlet esetén a relatív gyakoriság megközelíti a valószínűséget',
  },
];

const LEVEL_2_PAIRS: MatcherPair[] = [
  {
    id: 'sm-m2-1',
    prompt: '2, 3, 5, 5, 10 átlaga',
    value: '(2 + 3 + 5 + 5 + 10) / 5 = 25 / 5 = 5',
  },
  {
    id: 'sm-m2-2',
    prompt: '2, 3, 5, 5, 10 módusza',
    value: 'Mo = 5 (kétszer szerepel)',
  },
  {
    id: 'sm-m2-3',
    prompt: '2, 3, 5, 5, 10 mediánja',
    value: 'Me = 5 (a rendezett sor 3. adata)',
  },
  {
    id: 'sm-m2-4',
    prompt: '2, 3, 5, 5, 10 terjedelme',
    value: 'R = 10 - 2 = 8',
  },
  {
    id: 'sm-m2-5',
    prompt: '25%-os részarány körcikke',
    value: 'α = 0,25 · 360° = 90° (derékszög)',
  },
  {
    id: 'sm-m2-6',
    prompt: 'Páros szám kockával',
    value: 'P = 3/6 = 1/2 = 50%',
  },
  {
    id: 'sm-m2-7',
    prompt: 'Ellentett esemény',
    value: 'P(Ā) = 1 - P(A)',
  },
  {
    id: 'sm-m2-8',
    prompt: 'Biztos esemény',
    value: 'P(I) = 1 (100%)',
  },
];

const LEVEL_3_PAIRS: MatcherPair[] = [
  {
    id: 'sm-m3-1',
    prompt: 'Kölcsönösen egyértelmű',
    value: 'Oda-vissza egy-egy elem felel meg egymásnak',
  },
  {
    id: 'sm-m3-2',
    prompt: 'Grafikon zérushelye',
    value: 'Ahol a függvény grafikonja metszi az x tengelyt (y = 0)',
  },
  {
    id: 'sm-m3-3',
    prompt: 'Grafikon maximuma',
    value: 'A legmagasabb pont, ahol a függvényérték a legnagyobb',
  },
  {
    id: 'sm-m3-4',
    prompt: 'Relatív gyakoriságok összege',
    value: 'Mindig pontosan 1 (vagyis 100%)',
  },
  {
    id: 'sm-m3-5',
    prompt: 'Körcikk középponti szöge',
    value: 'α = g · 360°',
  },
  {
    id: 'sm-m3-6',
    prompt: 'Lehetetlen esemény',
    value: 'P(∅) = 0 (0%)',
  },
  {
    id: 'sm-m3-7',
    prompt: 'Két érmével két Fej dobása',
    value: 'P = 1/4 = 25% (FF kimenetel)',
  },
  {
    id: 'sm-m3-8',
    prompt: 'Aszimmetrikus test kísérlete',
    value: 'A valószínűséget csak sok próba mérésével becsülhetjük',
  },
];

export const StatsSummaryMatcher: React.FC<StatsSummaryMatcherProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  topicId = 'g7-stats-summary',
}) => {
  return (
    <MatcherTemplate
      title="Összefoglaló Párosító"
      subtitle="Párosítsd a fejezet legfontosabb fogalmait, mutatóit és valószínűségi képleteit!"
      topicTitle="8. Összefoglalás"
      badge="PÁROSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="slate"
      topicId={topicId}
      grade={7}
      chapterId="hozzarendelesek-statisztika"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      levelsConfig={{
        1: {
          title: '1. szint: A fejezet alappillérei és definíciói',
          description: 'Kösd össze a statisztikai és függvénytani alapfogalmakat a jelentésükkel!',
          pairs: LEVEL_1_PAIRS,
        },
        2: {
          title: '2. szint: Számítások és képletek mintapéldákon',
          description: 'Párosítsd az adatsorokat és formulákat a helyes számszerű eredménnyel!',
          pairs: LEVEL_2_PAIRS,
        },
        3: {
          title: '3. szint: Rendszerező haladó összefüggések',
          description: 'Találd meg a haladó geometriai és statisztikai fogalmak párjait!',
          pairs: LEVEL_3_PAIRS,
        },
      }}
    />
  );
};

export default StatsSummaryMatcher;
