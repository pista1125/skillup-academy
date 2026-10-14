import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SetRelationsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Függvény vagy Nem függvény?',
    subtitle: 'Döntsd el a hozzárendelésekről és tulajdonságokról, hogy megfelelnek-e a függvény definíciójának!',
    categories: [
      {
        id: 'cat-func',
        name: 'Függvény (Szabályos)',
        description: 'Minden bemeneti elemből pontosan egyetlen nyíl indul ki',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-not-func',
        name: 'Nem függvény (Szabálytalan)',
        description: 'Többértelmű kapcsolat (egy bemenethez több kép), vagy hiányos hozzárendelés',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's1-1',
        label: 'Minden bemeneti számnak pontosan 1 képe van',
        category: 'cat-func',
        figure: (
          <span className="text-[11px] font-bold text-emerald-700">1 ➔ 1</span>
        )
      },
      {
        id: 's1-2',
        label: 'Egy kiinduló elemből két külön nyíl indul ki',
        category: 'cat-not-func',
        figure: (
          <span className="text-[11px] font-bold text-red-600">1 ➔ 2 ❌</span>
        )
      },
      {
        id: 's1-3',
        label: 'f(x) = 2x + 1 a valós számok halmazán',
        category: 'cat-func',
        figure: (
          <span className="text-[10px] font-mono font-bold text-indigo-700">2x + 1</span>
        )
      },
      {
        id: 's1-4',
        label: 'Minden emberhez a saját érvényes TAJ-száma',
        category: 'cat-func',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">TAJ-szám</span>
        )
      },
      {
        id: 's1-5',
        label: 'Minden pozitív egész számhoz az összes osztója',
        category: 'cat-not-func',
        figure: (
          <span className="text-[10px] font-bold text-red-600">Összes osztó</span>
        )
      },
      {
        id: 's1-6',
        label: 'Minden emberhez az összes édes gyermeke',
        category: 'cat-not-func',
        figure: (
          <span className="text-[10px] font-bold text-red-600">Gyermekek</span>
        )
      },
      {
        id: 's1-7',
        label: 'Minden emberhez a saját biológiai édesanyja',
        category: 'cat-func',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">Édesanya</span>
        )
      },
      {
        id: 's1-8',
        label: 'x: [1, 2, 3], y: [5, 5, 5] (konstans függvény)',
        category: 'cat-func',
        figure: (
          <span className="text-[10px] font-mono font-bold text-amber-700">y = 5</span>
        )
      },
      {
        id: 's1-9',
        label: 'x: [2, 2, 3], y: [6, 9, 12] (2-höz 6 és 9 is tartozik)',
        category: 'cat-not-func',
        figure: (
          <span className="text-[10px] font-mono font-bold text-red-600">x=2 két kép</span>
        )
      },
      {
        id: 's1-10',
        label: 'Az alaphalmaz egyik eleméből nem indul ki nyíl',
        category: 'cat-not-func',
        figure: (
          <span className="text-[10px] font-bold text-red-600">Hiányos ❌</span>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: A Hozzárendelés Típusa',
    subtitle: 'Csoportosítsd a hozzárendeléseket a nyilak jellege és egyértelműsége szerint!',
    categories: [
      {
        id: 'cat-bijective',
        name: 'Kölcsönösen egyértelmű (1 : 1)',
        description: 'Minden bemenetnek más a képe, és visszafelé is pontosan egy őskép tartozik hozzá',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-many-one',
        name: 'Több az egyhez (Függvény)',
        description: 'Különböző bemeneteknek lehet azonos a képe (szabályos függvény, de nem 1:1)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-one-many',
        name: 'Egy a többhöz (NEM függvény)',
        description: 'Egyetlen bemenethez több kimenet tartozik (többértelmű hozzárendelés)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's2-1',
        label: 'f(x) = 3x - 5 a valós számokon',
        category: 'cat-bijective',
        figure: (
          <span className="text-[10px] font-mono font-bold text-indigo-700">3x - 5</span>
        )
      },
      {
        id: 's2-2',
        label: 'f(x) = x² az egészeken: f(-2) = f(2) = 4',
        category: 'cat-many-one',
        figure: (
          <span className="text-[10px] font-mono font-bold text-amber-700">x²</span>
        )
      },
      {
        id: 's2-3',
        label: 'f(x) = |x| abszolút érték: f(-7) = f(7) = 7',
        category: 'cat-many-one',
        figure: (
          <span className="text-[10px] font-mono font-bold text-amber-700">|x|</span>
        )
      },
      {
        id: 's2-4',
        label: 'Diákok ➔ Saját diákigazolvány számuk',
        category: 'cat-bijective',
        figure: (
          <span className="text-[10px] font-bold text-indigo-700">Diákigazolvány</span>
        )
      },
      {
        id: 's2-5',
        label: 'Minden egész számhoz a nála kisebb prímek',
        category: 'cat-one-many',
        figure: (
          <span className="text-[10px] font-bold text-rose-700">Kisebb prímek</span>
        )
      },
      {
        id: 's2-6',
        label: 'f(x) = 9 (minden számhoz a 9 konstans)',
        category: 'cat-many-one',
        figure: (
          <span className="text-[10px] font-mono font-bold text-amber-700">f(x) = 9</span>
        )
      },
      {
        id: 's2-7',
        label: 'Pozitív számhoz a két négyzetgyöke: x ➔ ±√x',
        category: 'cat-one-many',
        figure: (
          <span className="text-[10px] font-mono font-bold text-rose-700">±√x</span>
        )
      },
      {
        id: 's2-8',
        label: 'f(x) = x + 10 a racionális számokon',
        category: 'cat-bijective',
        figure: (
          <span className="text-[10px] font-mono font-bold text-indigo-700">x + 10</span>
        )
      },
      {
        id: 's2-9',
        label: 'Minden emberhez az összes élő testvére',
        category: 'cat-one-many',
        figure: (
          <span className="text-[10px] font-bold text-rose-700">Testvérek</span>
        )
      },
      {
        id: 's2-10',
        label: 'f(x) = 2x (két szám duplája mindig más)',
        category: 'cat-bijective',
        figure: (
          <span className="text-[10px] font-mono font-bold text-indigo-700">2x</span>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Bemenet, Kimenet és Tiltott Értékek',
    subtitle: 'Sorold be a fogalmakat aszerint, hogy az értelmezési tartományhoz, az értékkészlethez, vagy a tiltott értékekhez tartoznak!',
    categories: [
      {
        id: 'cat-domain',
        name: 'Értelmezési tartomány (D / Bemenet)',
        description: 'Kiindulási elemek halmaza, független változók, ősképek',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-range',
        name: 'Értékkészlet (R / Kimenet)',
        description: 'A függvény által ténylegesen felvett értékek halmaza, képek',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-forbidden',
        name: 'Tiltott / Kizárt érték',
        description: 'Értelmezetlen műveletek (pl. nullával való osztás miatt kieső számok)',
        badgeColor: 'bg-red-100 text-red-800 border-red-300'
      }
    ],
    items: [
      {
        id: 's3-1',
        label: 'Őskép (kiinduló x érték az alaphalmazban)',
        category: 'cat-domain',
        figure: (
          <span className="text-[10px] font-bold text-blue-700">Őskép (x)</span>
        )
      },
      {
        id: 's3-2',
        label: 'Képérték (f(x) vagy kimenő y érték)',
        category: 'cat-range',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">Képérték (y)</span>
        )
      },
      {
        id: 's3-3',
        label: 'f(x) = 12 / x esetén az x = 0 szám',
        category: 'cat-forbidden',
        figure: (
          <span className="text-[10px] font-mono font-bold text-red-600">x = 0 tiltott</span>
        )
      },
      {
        id: 's3-4',
        label: 'A hozzárendelés alaphalmazának elemei (A halmaz)',
        category: 'cat-domain',
        figure: (
          <span className="text-[10px] font-bold text-blue-700">Alaphalmaz</span>
        )
      },
      {
        id: 's3-5',
        label: 'A célhalmaz azon elemei, ahova érkezik legalább 1 nyíl',
        category: 'cat-range',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">R ⊆ B</span>
        )
      },
      {
        id: 's3-6',
        label: 'f(x) = 8 / (x - 5) esetén az x = 5 szám',
        category: 'cat-forbidden',
        figure: (
          <span className="text-[10px] font-mono font-bold text-red-600">x = 5 tiltott</span>
        )
      },
      {
        id: 's3-7',
        label: 'f(x) = x² valós számokon felvett nemnegatív értékei: [0, +∞)',
        category: 'cat-range',
        figure: (
          <span className="text-[10px] font-mono font-bold text-emerald-700">y ≥ 0</span>
        )
      },
      {
        id: 's3-8',
        label: 'A független változó összes lehetséges értéke',
        category: 'cat-domain',
        figure: (
          <span className="text-[10px] font-bold text-blue-700">Független x</span>
        )
      },
      {
        id: 's3-9',
        label: 'A függő változó által megkapott eredmények összessége',
        category: 'cat-range',
        figure: (
          <span className="text-[10px] font-bold text-emerald-700">Függő y</span>
        )
      },
      {
        id: 's3-10',
        label: 'Nullával való osztást eredményező bemeneti számok',
        category: 'cat-forbidden',
        figure: (
          <span className="text-[10px] font-bold text-red-600">/ 0 hiba!</span>
        )
      }
    ]
  }
};

export const SetRelationsSorter: React.FC<SetRelationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g7-stats-relations',
  topicTitle = '1. Két halmaz közötti hozzárendelések'
}) => {
  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={currentLevel || level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
    />
  );
};

export default SetRelationsSorter;
