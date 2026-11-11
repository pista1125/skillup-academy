import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SquareCirclesMiniSvg } from './CirclePracticeFigures';

interface CirclePracticeSorterProps {
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
    title: 'Négyzet és kör viszonya',
    subtitle: 'Válogasd szét a kifejezéseket aszerint, hogy a beírt vagy a körülírt körre vonatkoznak!',
    categories: [
      {
        id: 'cat-inscribed',
        name: 'Beírt kör tulajdonsága',
        description: 'Érinti a négyzet mind a 4 oldalát (r = a/2)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-circumscribed',
        name: 'Körülírt kör tulajdonsága',
        description: 'Átmegy a négyzet mind a 4 csúcsán (R = a√2/2)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-square',
        name: 'Maga a négyzet',
        description: 'A 4 egyenlő oldalú, derékszögű alapalakzat',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      { id: 'cps1-1', content: 'Sugara r = a / 2', figure: <SquareCirclesMiniSvg size={44} />, categoryId: 'cat-inscribed' },
      { id: 'cps1-2', content: 'Sugara R = a√2 / 2', figure: <SquareCirclesMiniSvg size={44} />, categoryId: 'cat-circumscribed' },
      { id: 'cps1-3', content: 'Átlója d = a√2', categoryId: 'cat-square' },
      { id: 'cps1-4', content: 'Átmérője a négyzet oldalával egyenlő', figure: <SquareCirclesMiniSvg size={44} />, categoryId: 'cat-inscribed' },
      { id: 'cps1-5', content: 'Átmérője a négyzet átlójával egyenlő', figure: <SquareCirclesMiniSvg size={44} />, categoryId: 'cat-circumscribed' },
      { id: 'cps1-6', content: 'Területe T = a²', categoryId: 'cat-square' },
      { id: 'cps1-7', content: 'Területe kb. 0,785 a²', figure: <SquareCirclesMiniSvg size={44} />, categoryId: 'cat-inscribed' },
      { id: 'cps1-8', content: 'Területe kb. 1,57 a²', figure: <SquareCirclesMiniSvg size={44} />, categoryId: 'cat-circumscribed' },
      { id: 'cps1-9', content: 'Kerülete K = 4a', categoryId: 'cat-square' },
      { id: 'cps1-10', content: 'Kisebb a területe, mint a négyzeté', categoryId: 'cat-inscribed' },
      { id: 'cps1-11', content: 'Nagyobb a területe, mint a négyzeté', categoryId: 'cat-circumscribed' },
      { id: 'cps1-12', content: 'Mindkét kör középpontja a szimmetriaközéppontjába esik', categoryId: 'cat-square' }
    ]
  },
  2: {
    title: 'Mértékegységek és fizikai jelentések',
    subtitle: 'Válogasd szét a kifejezéseket a fizikai mennyiség jellege szerint!',
    categories: [
      {
        id: 'cat-dist',
        name: 'Megtett út / Hosszúság',
        description: 'Méter, centiméter, kilométer',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-speed',
        name: 'Sebesség',
        description: 'km/h, m/s',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-rev',
        name: 'Fordulatszám / Szögsebesség',
        description: 'Fordulat/perc (RPM), 1/s',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'cps2-1', content: 'Kerék kerülete K = 2rπ', categoryId: 'cat-dist' },
      { id: 'cps2-2', content: 'Autó sebessége: v = 90 km/h', categoryId: 'cat-speed' },
      { id: 'cps2-3', content: 'Motor fordulatszáma: 3000 fordulat/perc', categoryId: 'cat-rev' },
      { id: 'cps2-4', content: 's = n · 2rπ út', categoryId: 'cat-dist' },
      { id: 'cps2-5', content: 'Futó sebessége: v = s / t', categoryId: 'cat-speed' },
      { id: 'cps2-6', content: 'Percenkénti kanyarulatok száma', categoryId: 'cat-rev' },
      { id: 'cps2-7', content: 'Stadion egyenesének hossza L = 100 m', categoryId: 'cat-dist' },
      { id: 'cps2-8', content: 'Kerék kerületi sebessége', categoryId: 'cat-speed' },
      { id: 'cps2-9', content: 'Bicikli pedálfordulatszáma (kadencia)', categoryId: 'cat-rev' },
      { id: 'cps2-10', content: 'Ívhossz i méterben', categoryId: 'cat-dist' },
      { id: 'cps2-11', content: 'v = 2πr · f', categoryId: 'cat-speed' },
      { id: 'cps2-12', content: 'Fordulatok száma: n = s / K', categoryId: 'cat-rev' }
    ]
  },
  3: {
    title: 'Geometriai szélsőértékek és optimalizálás',
    subtitle: 'Válogasd szét a síkidomokat az izoperimetrikus tulajdonságaik szerint!',
    categories: [
      {
        id: 'cat-max-circle',
        name: 'Azonos kerület mellett a legnagyobb területű',
        description: 'Kör (izoperimetrikus bajnok)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-regular',
        name: 'Adott oldalszám mellett maximális területű',
        description: 'Szabályos sokszögek (szabályos háromszög, négyzet)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-suboptimal',
        name: 'Kisebb hatékonyságú síkidomok',
        description: 'Nem szabályos, nyújtott téglalapok, rombuszok',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      { id: 'cps3-1', content: 'Kör (K = 40 cm, T ≈ 127,3 cm²)', categoryId: 'cat-max-circle' },
      { id: 'cps3-2', content: 'Négyzet a téglalapok között (K = 40 cm, T = 100 cm²)', categoryId: 'cat-regular' },
      { id: 'cps3-3', content: 'Nyújtott 1×19 cm-es téglalap (K = 40 cm, T = 19 cm²)', categoryId: 'cat-suboptimal' },
      { id: 'cps3-4', content: 'Szabályos hatszög azonos kerületű hatszögek között', categoryId: 'cat-regular' },
      { id: 'cps3-5', content: 'Körcikk esetén i = 2r arány', categoryId: 'cat-max-circle' },
      { id: 'cps3-6', content: 'Szabályos háromszög azonos kerületű háromszögek között', categoryId: 'cat-regular' },
      { id: 'cps3-7', content: 'Lapos deltoid', categoryId: 'cat-suboptimal' },
      { id: 'cps3-8', content: 'Gömb a 3D testek között (adott felszínnél legnagyobb térfogat)', categoryId: 'cat-max-circle' },
      { id: 'cps3-9', content: 'Szabályos 12-szög', categoryId: 'cat-regular' },
      { id: 'cps3-10', content: 'Hosszúkás paralelogramma', categoryId: 'cat-suboptimal' },
      { id: 'cps3-11', content: 'Kerek szappanhólyag formája', categoryId: 'cat-max-circle' },
      { id: 'cps3-12', content: 'Keskeny trapéz', categoryId: 'cat-suboptimal' }
    ]
  }
};

export const CirclePracticeSorter: React.FC<CirclePracticeSorterProps> = (props) => {
  return (
    <SorterTemplate
      title="Körszámítások és Összetett Alakzatok Csoportosító"
      subtitle="Válogasd szét a geometriai kifejezéseket a megfelelő kategóriákba!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      color="indigo"
      levels={sorterLevels}
      {...props}
    />
  );
};
