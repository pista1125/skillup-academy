import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ClassIntervalMatcherProps {
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

const matcherLevels: Record<number, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és osztályközök',
    subtitle: 'Párosítsd az osztályba sorolás és az átlagok összevonásának szakkifejezéseit a definíciójukkal!',
    pairs: [
      {
        id: 'cim1-1',
        left: 'Osztályba sorolás',
        right: 'Nagy adathalmazok intervallumokba (osztályközökbe) csoportosítása'
      },
      {
        id: 'cim1-2',
        left: 'Osztályközép (x_közép)',
        right: 'Az adott osztály alsó és felső határának számtani közepe: (a + b) / 2'
      },
      {
        id: 'cim1-3',
        left: 'Osztályhatárok',
        right: 'Az intervallum alsó és felső végpontja'
      },
      {
        id: 'cim1-4',
        left: 'Gyakoriság (fᵢ)',
        right: 'Az adott osztályközbe tartozó adatok pontos darabszáma'
      },
      {
        id: 'cim1-5',
        left: 'Relatív gyakoriság',
        right: 'Az osztályba esők aránya a teljes mintához képest: fᵢ / N'
      },
      {
        id: 'cim1-6',
        left: 'Súlyozott számtani közép',
        right: 'Az adatok és gyakoriságaik szorzatösszege osztva a teljes létszámmal'
      },
      {
        id: 'cim1-7',
        left: 'Átlagok átlaga csapda',
        right: 'Csoportok átlagát egyszerűen összeadni és osztani csak egyenlő létszámnál szabad!'
      },
      {
        id: 'cim1-8',
        left: 'Folytonos hisztogram',
        right: 'Olyan oszlopdiagram, ahol az oszlopok rés nélkül érintkeznek az intervallumhatároknál'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Osztályközepek és csoportátlagok számítása',
    subtitle: 'Számítsd ki a konkrét osztályközepeket és a súlyozott csoportátlagokat!',
    pairs: [
      {
        id: 'cim2-1',
        left: '[1000; 1050] intervallum osztályközepe',
        right: '1025'
      },
      {
        id: 'cim2-2',
        left: '[0; 9] intervallum osztályközepe',
        right: '4,5'
      },
      {
        id: 'cim2-3',
        left: 'Bence feladata: 2 db (átlag 6) és 3 db (átlag 3)',
        right: 'Súlyozott átlag: 4,2'
      },
      {
        id: 'cim2-4',
        left: '20 fiú (átlag 175 cm) és 30 lány (átlag 165 cm)',
        right: 'Súlyozott átlag: 169 cm'
      },
      {
        id: 'cim2-5',
        left: '200 izzóból 172 db világít legalább 1000 órát',
        right: 'Megfelelőségi arány: 86%'
      },
      {
        id: 'cim2-6',
        left: '10.A fiúk: 14 fő, átlagmagasság: 176 cm',
        right: 'Összmagasság: 2464 cm'
      },
      {
        id: 'cim2-7',
        left: '[140; 150] testmagasság osztályközepe',
        right: '145 cm'
      },
      {
        id: 'cim2-8',
        left: 'Azonos létszámú (20-20 fős) csoportok: átlag 4 és 5',
        right: 'Együttes átlag: 4,5'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Statisztikai törvények és érvelés',
    subtitle: 'Párosítsd a csoportosítás és a súlyozás mélyebb matematikai logikáját!',
    pairs: [
      {
        id: 'cim3-1',
        left: 'Mikor egyezik meg az egyszerű átlag a súlyozottal?',
        right: 'Pontosan akkor, ha a részcsoportok létszáma egyenlő: n₁ = n₂'
      },
      {
        id: 'cim3-2',
        left: 'Miért nem 3 egy dolgozat osztályátlaga?',
        right: 'Mert a különböző érdemjegyek gyakorisága szinte sosem azonos'
      },
      {
        id: 'cim3-3',
        left: 'Közelítő átlag osztályközepekkel',
        right: 'Gyors becslés óriási mintáknál, enyhe kerekítési pontatlansággal'
      },
      {
        id: 'cim3-4',
        left: 'Diszjunktivitás követelménye',
        right: 'Minden adat pontosan egyetlen osztályba tartozhat (nincs átfedés)'
      },
      {
        id: 'cim3-5',
        left: 'Kosárlabda csapat dobószázaléka',
        right: 'Összes sikeres dobás osztva az összes kísérlettel (nem a %-ok átlaga!)'
      },
      {
        id: 'cim3-6',
        left: 'Cégátlag: 42,4 év (férfiak 46,4 év, nők 40,2 év)',
        right: 'Nőkből van több, mert az összetett átlag a női átlaghoz húz'
      },
      {
        id: 'cim3-7',
        left: 'Súlyozott átlag általános képlete',
        right: 'x̄ = (n₁·x̄₁ + n₂·x̄₂ + ··· + nₖ·x̄ₖ) / (n₁ + n₂ + ··· + nₖ)'
      },
      {
        id: 'cim3-8',
        left: 'Csoportosítás információvesztesége',
        right: 'Az egyéni adatok pontos értéke elvész, csak az intervallum marad meg'
      }
    ]
  }
};

export const ClassIntervalMatcher: React.FC<ClassIntervalMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      topicId={props.topicId || 'g10-stat-osztalyba-sorolas-atlagok-matcher'}
      topicTitle={props.topicTitle || 'Osztályba sorolás, átlagok átlaga'}
      levels={matcherLevels}
      {...props}
    />
  );
};

export default ClassIntervalMatcher;

