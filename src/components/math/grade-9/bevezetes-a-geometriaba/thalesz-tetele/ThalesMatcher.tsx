import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ThalesTheoremSVG,
  ThalesProofSVG,
  ThalesLocusSVG
} from './ThalesFigures';

interface ThalesMatcherProps {
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

export const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: A Tétel és Alapfogalmai',
    subtitle: 'Párosítsd a Thalész-tétel alapfogalmait a megfelelő meghatározással!',
    pairs: [
      {
        id: 'thm1-1',
        prompt: 'Thalész-tétel kimondása',
        value: 'Kör átmérőjének két végpontját összekötve a kör bármely pontjával, a szög 90°',
        figure: <ThalesTheoremSVG size={65} />
      },
      {
        id: 'thm1-2',
        prompt: 'Thalész-tétel megfordítása',
        value: 'Minden derékszögű háromszög derékszögű csúcsa rajta van az átfogó mint átmérő fölé rajzolt körön'
      },
      {
        id: 'thm1-3',
        prompt: 'Körülírt kör középpontja derékszögű háromszögben',
        value: 'Az átfogó felezőpontja (O)'
      },
      {
        id: 'thm1-4',
        prompt: 'Körülírt kör sugara derékszögű háromszögben',
        value: 'R = c / 2 (az átfogó pontosan fele)'
      },
      {
        id: 'thm1-5',
        prompt: 'Átfogóhoz tartozó súlyvonal',
        value: 's_c = R = c / 2 (hossza megegyezik a sugárral)'
      },
      {
        id: 'thm1-6',
        prompt: 'A tétel feltétele a szakaszra',
        value: 'Az AB szakasznak a kör átmérőjének kell lennie (át kell mennie a középponton)'
      }
    ]
  },
  2: {
    title: '2. Szint: Bizonyítás és Látószögek',
    subtitle: 'Párosítsd a bizonyítás lépéseit és a mértani hely tulajdonságait!',
    pairs: [
      {
        id: 'thm2-1',
        prompt: 'Bizonyítás kulcslépése',
        value: 'Az OC sugár behúzása két egyenlő szárú háromszögre osztja a háromszöget',
        figure: <ThalesProofSVG size={65} />
      },
      {
        id: 'thm2-2',
        prompt: 'Bizonyítás egyenlete',
        value: '2α + 2β = 180° => α + β = 90° = γ',
        figure: <ThalesProofSVG size={65} />
      },
      {
        id: 'thm2-3',
        prompt: 'Pont a Thalész-körön kívül fekszik',
        value: 'A látószög kisebb 90°-nál (< 90°, hegyesszög)',
        figure: <ThalesLocusSVG size={65} />
      },
      {
        id: 'thm2-4',
        prompt: 'Pont a Thalész-körön belül fekszik',
        value: 'A látószög nagyobb 90°-nál (> 90°, tompaszög)',
        figure: <ThalesLocusSVG size={65} />
      },
      {
        id: 'thm2-5',
        prompt: 'Mértani helyből kizárt pontok',
        value: 'Az A és B végpontok (itt nem értelmezhető az ACB szög)'
      },
      {
        id: 'thm2-6',
        prompt: 'Kerületi szög az átmérőhöz',
        value: 'A félkörívhez tartozó kerületi szög mindig derékszög'
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos és Szerkesztési Feladatok',
    subtitle: 'Párosítsd a konkrét geometriai feladatokat a pontos eredménnyel!',
    pairs: [
      {
        id: 'thm3-1',
        prompt: 'Ha a derékszögű háromszög átfogója c = 16 cm, mekkora a Thalész-kör sugara?',
        value: '8 cm (mert R = c / 2 = 16 / 2 = 8 cm)'
      },
      {
        id: 'thm3-2',
        prompt: 'A Thalész-kör sugara R = 6.5 cm. Mekkora az átfogó hossza?',
        value: '13 cm (mert c = 2R = 2 · 6.5 = 13 cm)'
      },
      {
        id: 'thm3-3',
        prompt: 'Befogók 9 cm és 12 cm. Mekkora a derékszögű csúcsból induló súlyvonal?',
        value: '7.5 cm (mert c = 15 cm, s_c = 15 / 2 = 7.5 cm)'
      },
      {
        id: 'thm3-4',
        prompt: 'Thalész-körön lévő C csúcs esetén az egyik hegyesszög 38°. Mekkora a másik?',
        value: '52° (mert 90° - 38° = 52°)'
      },
      {
        id: 'thm3-5',
        prompt: 'Egy pontból a 10 cm-es szakasz 115°-os szögben látszik. Hol van a pont?',
        value: 'A szakasz fölé rajzolt Thalész-körön belül (mert 115° > 90°)'
      },
      {
        id: 'thm3-6',
        prompt: 'Egy pontból a szakasz 70°-os szögben látszik. Hol van a pont?',
        value: 'A szakasz fölé rajzolt Thalész-körön kívül (mert 70° < 90°)'
      }
    ]
  }
};

export const ThalesMatcher: React.FC<ThalesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Thalész tétele'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
      storageKey="grade9-thales-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};
