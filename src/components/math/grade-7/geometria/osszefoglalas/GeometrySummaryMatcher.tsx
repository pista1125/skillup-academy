import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface GeometrySummaryMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Síkidomok Területképletei
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'Háromszög területe',
    value: 'T = (a · m_a) / 2 = (b · m_b) / 2',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-10">
        <polygon points="10,40 70,40 40,10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
        <line x1="40" y1="10" x2="40" y2="40" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Paralelogramma területe',
    value: 'T = a · m_a = b · m_b',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-10">
        <polygon points="15,40 55,40 70,15 30,15" fill="#d1fae5" stroke="#059669" strokeWidth="1.2" />
        <line x1="30" y1="15" x2="30" y2="40" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Trapéz területe',
    value: 'T = ((a + c) / 2) · m = k · m',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-10">
        <polygon points="10,40 70,40 55,15 25,15" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
        <line x1="25" y1="15" x2="25" y2="40" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Deltoid és Rombusz területe',
    value: 'T = (e · f) / 2 (átlók szorzatának fele)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-10">
        <polygon points="40,8 65,25 40,42 15,25" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
        <line x1="40" y1="8" x2="40" y2="42" stroke="#9d174d" strokeWidth="1" />
        <line x1="15" y1="25" x2="65" y2="25" stroke="#9d174d" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Derékszögű háromszög területe',
    value: 'T = (a · b) / 2 (két befogó szorzatának fele)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-10">
        <polygon points="15,40 65,40 15,10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
        <path d="M 15 32 A 8 8 0 0 1 23 40" fill="none" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="19" cy="36" r="1" fill="#7c3aed" />
      </svg>
    )
  }
];

// 2. SZINT: Sokszögek, Szögek és Mértékegységek
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'n-oldalú sokszög összes átlója',
    value: 'd_n = n · (n - 3) / 2'
  },
  {
    id: 'l2-p2',
    prompt: 'n-oldalú sokszög belső szögösszege',
    value: 'S_n = (n - 2) · 180°'
  },
  {
    id: 'l2-p3',
    prompt: 'Konvex sokszögek külső szögösszege',
    value: 'Mindig pontosan 360° (független n-től)'
  },
  {
    id: 'l2-p4',
    prompt: '1 hektár (ha) átváltása',
    value: '1 ha = 100 a = 10 000 m²'
  },
  {
    id: 'l2-p5',
    prompt: 'Térfogat és űrmérték aranyhídja',
    value: '1 dm³ = 1 liter (1 m³ = 1000 liter)'
  }
];

// 3. SZINT: Hasábok, Testek és az Euler-tétel
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Egyenes hasáb térfogata',
    value: 'V = T_a · M (alapterület × testmagasság)'
  },
  {
    id: 'l3-p2',
    prompt: 'Egyenes hasáb teljes felszíne',
    value: 'A = 2 · T_a + T_p = 2 · T_a + K_a · M'
  },
  {
    id: 'l3-p3',
    prompt: 'Euler-féle poliédertétel',
    value: 'C + L = E + 2 (Csúcsok + Lapok = Élek + 2)'
  },
  {
    id: 'l3-p4',
    prompt: 'n-oldalú hasáb éleinek száma',
    value: 'E = 3 · n él (n alsó + n felső + n oldalél)'
  },
  {
    id: 'l3-p5',
    prompt: 'n-oldalú gúla éleinek száma',
    value: 'E = 2 · n él (n alapi él + n csúcsba futó él)'
  }
];

export const GeometrySummaryMatcher: React.FC<GeometrySummaryMatcherProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory
}) => {
  const activeLvl = Number(currentLevel ?? level) || 1;
  return (
    <MatcherTemplate
      key={`geom-summary-matcher-lvl-${activeLvl}`}
      title="Geometria Összefoglaló Párosító"
      subtitle="Párosítsd a sík- és térgeometria legfontosabb képleteit és összefüggéseit!"
      badge="7. OSZTÁLY • VII. GEOMETRIA"
      level={activeLvl as any}
      currentLevel={activeLvl as any}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
    />
  );
};
