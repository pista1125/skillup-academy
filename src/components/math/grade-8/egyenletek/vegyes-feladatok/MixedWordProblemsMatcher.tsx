import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MixedWordProblemsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapvető Vegyes Feladványok és Egyenletek',
    subtitle: 'Párosítsd a szöveges feladatot a helyes matematikai egyenlettel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Tyúkok (2 láb) és nyulak (4 láb) összesen 20 fej és 56 láb',
        value: '2x + 4(20 - x) = 56'
      },
      {
        id: 'p2',
        prompt: 'Két szám összege 50, különbsége 14',
        value: 'x + (x + 14) = 50'
      },
      {
        id: 'p3',
        prompt: 'Diákjegy 1500 Ft, felnőttjegy 2500 Ft, 100 jegy 190 000 Ft-ért',
        value: '1500x + 2500(100 - x) = 190 000'
      },
      {
        id: 'p4',
        prompt: '20 Ft-os és 50 Ft-os érmékből 30 db van 1020 Ft értékben',
        value: '20x + 50(30 - x) = 1020'
      },
      {
        id: 'p5',
        prompt: 'Ha 2 diák ül padonként, 4 áll; ha 3 ül, 1 pad üres',
        value: '2p + 4 = 3(p - 1)'
      },
      {
        id: 'p6',
        prompt: 'Két szám aránya 3 : 5, összegük 72',
        value: '3x + 5x = 72'
      },
      {
        id: 'p7',
        prompt: 'Egy szám 4-szereséből 12-t kivonva 36-ot kapunk',
        value: '4x - 12 = 36'
      },
      {
        id: 'p8',
        prompt: 'Két testvér életkorának összege 28, a nővér 4 évvel idősebb',
        value: 'x + (x + 4) = 28'
      }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Modellek és Hiány-Többlet Egyenletek',
    subtitle: 'Kösd össze a feladat leírását a logikai modellel!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Könyvek: 15 / polc esetén 8 kimarad; 18 / polc esetén 1 polc üres',
        value: '15p + 8 = 18(p - 1)'
      },
      {
        id: 'p10',
        prompt: 'Lépcsőfokok: kettesével lépve 6-tal több lépés, mint hármasával',
        value: 'x / 2 - x / 3 = 6'
      },
      {
        id: 'p11',
        prompt: 'Kirándulás: 60 000 Ft, 2 fővel kevesebb esetén 1000 Ft többlet fejenként',
        value: '60000 / (x - 2) - 60000 / x = 1000'
      },
      {
        id: 'p12',
        prompt: 'Apa 3-szorosa a fiúnak, 12 év múlva kétszerese lesz',
        value: '3x + 12 = 2(x + 12)'
      },
      {
        id: 'p13',
        prompt: 'Autók (4 kerék) és motorok (2 kerék): 40 jármű, 130 kerék',
        value: '4x + 2(40 - x) = 130'
      },
      {
        id: 'p14',
        prompt: 'Egyenletrendszer összeadással: x + y = 30 és x - y = 8',
        value: '2x = 38 ⇒ x = 19, y = 11'
      },
      {
        id: 'p15',
        prompt: 'Téglalap kerülete 40 cm, hossza 4 cm-rel több szélességénél',
        value: '2(x + x + 4) = 40'
      },
      {
        id: 'p16',
        prompt: 'Alma 400 Ft/kg, banán 600 Ft/kg, 8 kg gyümölcs 3800 Ft',
        value: '400x + 600(8 - x) = 3800'
      }
    ]
  },
  3: {
    title: '3. Szint: Felvételi Típusú Összetett Feladatok és Eredmények',
    subtitle: 'Párosítsd az összetett feladatot a pontos végeredménnyel!',
    pairs: [
      {
        id: 'p17',
        prompt: '35 tyúk és nyúl összesen 94 lábbal',
        value: '23 tyúk és 12 nyúl'
      },
      {
        id: 'p18',
        prompt: 'Padok és diákok: 2p + 5 = 3(p - 2)',
        value: '11 pad és 27 diák'
      },
      {
        id: 'p19',
        prompt: '150 mozijegy 420 000 Ft-ért (3200 Ft és 2400 Ft)',
        value: '75 db 3200 Ft-os jegy'
      },
      {
        id: 'p20',
        prompt: 'Lépcsőfokok kettesével és hármasával, 7 lépés különbség',
        value: '42 lépcsőfok'
      },
      {
        id: 'p21',
        prompt: 'Két szám összege 84, egyik a másik 3-szorosa',
        value: '21 és 63'
      },
      {
        id: 'p22',
        prompt: '40 állat (kacsák és bárányok), összesen 110 láb',
        value: '15 bárány és 25 kacsa'
      },
      {
        id: 'p23',
        prompt: '60 db érme (50 és 100 Ft-os), összesen 4200 Ft',
        value: '36 db 50 Ft-os és 24 db 100 Ft-os'
      },
      {
        id: 'p24',
        prompt: 'Egy szám harmada és negyede összege 28',
        value: 'x = 48'
      }
    ]
  }
};

export const MixedWordProblemsMatcher: React.FC<MixedWordProblemsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-eq-mixed',
  topicTitle = 'Vegyes szöveges feladatok'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="Párosító Játék"
      badgeColor="violet"
    />
  );
};

export default MixedWordProblemsMatcher;
