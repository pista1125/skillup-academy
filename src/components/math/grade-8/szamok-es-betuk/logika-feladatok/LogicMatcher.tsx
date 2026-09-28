import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LogicMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LOGIC_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  // 1. SZINT: ÁLLÍTÁSOK ÉS IGAZSÁGÉRTÉKEK
  1: {
    level: 1,
    title: '1. Szint: Állítások és Igazságértékek',
    description: 'Párosítsd a matematikai állításokat a megfelelő logikai értékükkel és indoklásukkal!',
    pairs: [
      { id: 'p1-1', prompt: 'Minden prímszám páratlan', value: 'Hamis (a 2 prím és páros)' },
      { id: 'p1-2', prompt: 'Két páratlan szám összege', value: 'Mindig páros (Igaz)' },
      { id: 'p1-3', prompt: 'Egy szám osztható 6-tal', value: 'Akkor és csak akkor, ha 2-vel és 3-mal is osztható' },
      { id: 'p1-4', prompt: 'A négyzet téglalap', value: 'Mindig igaz (minden szöge 90°)' },
      { id: 'p1-5', prompt: '3² + 4² = 5²', value: 'Igaz (9 + 16 = 25)' },
      { id: 'p1-6', prompt: 'A 0 pozitív szám', value: 'Hamis (a 0 sem pozitív, sem negatív)' }
    ]
  },

  // 2. SZINT: TAGADÁSOK ÉS LOGIKAI MŰVELETEK
  2: {
    level: 2,
    title: '2. Szint: Tagadás és Logikai Műveletek',
    description: 'Keresd meg az állítások pontos tagadását és a logikai műveletek szabályait!',
    pairs: [
      { id: 'p2-1', prompt: '„Minden diák szeret fagyizni” tagadása', value: '„Van olyan diák, aki nem szeret fagyizni”' },
      { id: 'p2-2', prompt: '„Van páros prímszám” tagadása', value: '„Nincs páros prímszám” (Minden prím páratlan)' },
      { id: 'p2-3', prompt: '„A ÉS B” akkor igaz, ha...', value: 'Mindkét kijelentés egyszerre igaz' },
      { id: 'p2-4', prompt: '„A VAGY B” akkor igaz, ha...', value: 'Legalább az egyik kijelentés igaz' },
      { id: 'p2-5', prompt: '„Ha esik az eső, vizes az aszfalt”', value: 'Fordítva nem biztos: vizes lehet locsolástól is' },
      { id: 'p2-6', prompt: '„Legalább 3 ceruzám van” tagadása', value: '„Legfeljebb 2 ceruzám van”' }
    ]
  },

  // 3. SZINT: SKATULYA-ELV ÉS LOGIKAI FEJTÖRŐK
  3: {
    level: 3,
    title: '3. Szint: Skatulya-elv és Lovagok-Lókötők',
    description: 'Párosítsd a klasszikus logikai feladványokat a helyes következtetéssel!',
    pairs: [
      { id: 'p3-1', prompt: '13 ember születési hónapja', value: 'Legalább 2 ugyanabban a hónapban született (13 > 12)' },
      { id: 'p3-2', prompt: '3 zokni a sötét fiókból (fekete/fehér)', value: 'Biztosan lesz köztük legalább 1 egyforma pár' },
      { id: 'p3-3', prompt: 'Lovag mondja: „Én lovag vagyok”', value: 'Ebből még nem tudjuk (mindketten ezt mondanák)' },
      { id: 'p3-4', prompt: 'Valaki mondja: „Én lókötő vagyok”', value: 'Lehetetlen mondat (egyik típus sem mondhatja)' },
      { id: 'p3-5', prompt: '5 pont egy 2×2-es négyzetben', value: 'Van 2 pont, amelyek távolsága ≤ √2 (Skatulya)' },
      { id: 'p3-6', prompt: 'Közvetett bizonyítás alapja', value: 'Feltesszük az állítás ellenkezőjét és ellentmondásra jutunk' }
    ]
  }
};

export const LogicMatcher: React.FC<LogicMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(level || 1);

  useEffect(() => {
    if (level) {
      setCurrentLevel(level);
    }
  }, [level]);

  return (
    <MatcherTemplate
      level={currentLevel}
      levels={LOGIC_MATCHER_LEVELS}
      grade={8}
      chapterId="szamok-es-betuk"
      title="Logikai feladatok – Párosító Játék"
      subtitle="Keresd meg az összetartozó logikai állításokat, tagadásokat és következtetéseket!"
      badge="🧠 8. Osztály • I. Témakör: Logika"
      topicId="g8-logic-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="blue"
    />
  );
};

(LogicMatcher as any).levels = LOGIC_MATCHER_LEVELS;
(LogicMatcher as any).levelsConfig = LOGIC_MATCHER_LEVELS;

export default LogicMatcher;
