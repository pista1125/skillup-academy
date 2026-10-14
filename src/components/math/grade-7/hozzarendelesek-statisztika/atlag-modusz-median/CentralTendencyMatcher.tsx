import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface CentralTendencyMatcherProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

const LEVEL_1_PAIRS: MatcherPair[] = [
  {
    id: 'ct-m1-1',
    prompt: 'Számtani közép (Átlag)',
    value: 'Az adatok összegének és darabszámának hányadosa (Σx / n)',
  },
  {
    id: 'ct-m1-2',
    prompt: 'Módusz (Mo)',
    value: 'A sokaságban legtöbbször előforduló, leggyakoribb adat',
  },
  {
    id: 'ct-m1-3',
    prompt: 'Medián (páratlan n)',
    value: 'Növekvő rendezés után a pontosan középen álló elem',
  },
  {
    id: 'ct-m1-4',
    prompt: 'Medián (páros n)',
    value: 'Növekvő rendezés után a két középső adat számtani közepe',
  },
  {
    id: 'ct-m1-5',
    prompt: 'Terjedelem (R)',
    value: 'A legnagyobb és a legkisebb adat különbsége (Max - Min)',
  },
  {
    id: 'ct-m1-6',
    prompt: 'Növekvő nagyságrendi rendezés',
    value: 'Elengedhetetlen első lépés a medián kiszámításához',
  },
  {
    id: 'ct-m1-7',
    prompt: 'Kiugró érték (outlier)',
    value: 'Extrém adat, ami az átlagot erősen torzítja, a mediánt nem',
  },
  {
    id: 'ct-m1-8',
    prompt: 'Gyakoriság',
    value: 'Megmutatja, hogy egy adat hányszor szerepel a mintában',
  },
];

const LEVEL_2_PAIRS: MatcherPair[] = [
  {
    id: 'ct-m2-1',
    prompt: '[2, 4, 6, 8, 10] átlaga',
    value: 'x̄ = 6 (30 / 5 = 6)',
  },
  {
    id: 'ct-m2-2',
    prompt: '[3, 5, 5, 5, 8, 9] módusza',
    value: 'Mo = 5 (3-szor szerepel)',
  },
  {
    id: 'ct-m2-3',
    prompt: '[1, 4, 7, 10, 13] mediánja',
    value: 'Me = 7 (középső elem az 5-ből)',
  },
  {
    id: 'ct-m2-4',
    prompt: '[2, 4, 8, 10] mediánja',
    value: 'Me = 6 (a 4 és 8 számtani közepe)',
  },
  {
    id: 'ct-m2-5',
    prompt: '[5, 12, 3, 20, 8] terjedelme',
    value: 'R = 17 (20 - 3 = 17)',
  },
  {
    id: 'ct-m2-6',
    prompt: '[4, 4, 5, 5, 5] átlaga',
    value: 'x̄ = 4,6 (23 / 5 = 4,6)',
  },
  {
    id: 'ct-m2-7',
    prompt: '[10, 20, 30, 40] terjedelme',
    value: 'R = 30 (40 - 10 = 30)',
  },
  {
    id: 'ct-m2-8',
    prompt: '[1, 2, 3, 4, 5, 6] mediánja',
    value: 'Me = 3,5 ((3 + 4) / 2 = 3,5)',
  },
];

const LEVEL_3_PAIRS: MatcherPair[] = [
  {
    id: 'ct-m3-1',
    prompt: 'Kategóriás (nem-szám) adatoknál is működik',
    value: 'A Módusz (pl. legkedveltebb tantárgy, pólóméret)',
  },
  {
    id: 'ct-m3-2',
    prompt: 'Érzékeny a kiugró extrém adatokra',
    value: 'A számtani közép (átlag)',
  },
  {
    id: 'ct-m3-3',
    prompt: 'Robusztus (ellenálló) a kiugró adatokkal szemben',
    value: 'A medián',
  },
  {
    id: 'ct-m3-4',
    prompt: 'n = 15 rendezett adat mediánja',
    value: 'A rendezett sor 8. eleme',
  },
  {
    id: 'ct-m3-5',
    prompt: 'n = 20 rendezett adat mediánja',
    value: 'A rendezett sor 10. és 11. elemének számtani közepe',
  },
  {
    id: 'ct-m3-6',
    prompt: 'Ha minden adat azonos értékű (c)',
    value: 'Átlag = Módusz = Medián = c, és a Terjedelem = 0',
  },
  {
    id: 'ct-m3-7',
    prompt: 'Ha minden adathoz hozzáadunk 10-et',
    value: 'Az átlag és medián 10-zel nő, de a terjedelem változatlan',
  },
  {
    id: 'ct-m3-8',
    prompt: 'Terjedelem, ha az érdemjegyek 1 és 5 közöttiek',
    value: 'R = 4 (5 - 1 = 4)',
  },
];

export const CentralTendencyMatcher: React.FC<CentralTendencyMatcherProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  topicId = 'g7-stats-central',
}) => {
  return (
    <MatcherTemplate
      title="Átlag, Módusz, Medián Párosító"
      subtitle="Párosítsd a statisztikai definíciókat, számításokat és mintaértékeket!"
      topicTitle="4. Átlag, módusz, medián"
      badge="PÁROSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="emerald"
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
          title: '1. szint: Statisztikai alapfogalmak',
          description: 'Találd meg a mutatók és fogalmak helyes meghatározását!',
          pairs: LEVEL_1_PAIRS,
        },
        2: {
          title: '2. szint: Számítások kis adatsorokra',
          description: 'Kösd össze az adathalmazokat a helyes számszerű mutatókkal!',
          pairs: LEVEL_2_PAIRS,
        },
        3: {
          title: '3. szint: Statisztikai összefüggések',
          description: 'Párosítsd a tulajdonságokat és szabályszerűségeket!',
          pairs: LEVEL_3_PAIRS,
        },
      }}
    />
  );
};

export default CentralTendencyMatcher;
