import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface SolidsInSpaceAndPlaneSorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Geometriai testek típusa szerint
const level1Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a geometriai testeket fajtájuk (hasáb, gúla, forgástest) szerint!',
  categories: [
    { id: 'prism', name: 'Hasábok (2 alaplap, téglalap palást)', color: 'blue' },
    { id: 'pyramid', name: 'Gúlák (1 alaplap, közös csúcs)', color: 'amber' },
    { id: 'curved', name: 'Forgástestek (görbült felület)', color: 'purple' }
  ],
  items: [
    {
      id: 's1-1',
      label: 'Kocka (6 egybevágó négyzet határolja)',
      categoryId: 'prism',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="18,38 46,38 58,26 30,26" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
          <polygon points="18,18 46,18 58,6 30,6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
          <polygon points="18,18 46,18 46,38 18,38" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <polygon points="46,18 58,6 58,26 46,38" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's1-2',
      label: 'Négyzet alapú gúla (1 négyzet + 4 háromszög)',
      categoryId: 'pyramid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="20,40 50,40 60,30 30,30" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <polygon points="20,40 50,40 40,8" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
          <polygon points="50,40 60,30 40,8" fill="#fed7aa" stroke="#d97706" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's1-3',
      label: 'Egyenes körhenger (2 kör alaplap + palást)',
      categoryId: 'curved',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <ellipse cx="40" cy="12" rx="18" ry="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <path d="M 22 12 L 22 36 A 18 6 0 0 0 58 36 L 58 12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's1-4',
      label: 'Téglatest (6 téglalap határolja)',
      categoryId: 'prism',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 48,40 62,28 29,28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
          <polygon points="15,20 48,20 62,8 29,8" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
          <polygon points="15,20 48,20 48,40 15,40" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <polygon points="48,20 62,8 62,28 48,40" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's1-5',
      label: 'Egyenes körkúp (1 kör alap + csúcs)',
      categoryId: 'curved',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <ellipse cx="40" cy="38" rx="20" ry="7" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <path d="M 20 38 L 40 8 L 60 38" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's1-6',
      label: 'Tetraéder (szabályos 4 háromszög határolja)',
      categoryId: 'pyramid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="18,40 62,40 40,8" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
          <line x1="40" y1="8" x2="42" y2="40" stroke="#d97706" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 's1-7',
      label: 'Háromoldalú hasáb (2 háromszög alap + 3 téglalap)',
      categoryId: 'prism'
    },
    {
      id: 's1-8',
      label: 'Gömb (tökéletesen szimmetrikus gömbfelület)',
      categoryId: 'curved'
    },
    {
      id: 's1-9',
      label: 'Ötoldalú gúla (1 ötszög alap + 5 háromszög oldal)',
      categoryId: 'pyramid'
    },
    {
      id: 's1-10',
      label: 'Hatszög alapú egyenes hasáb (2 hatszög + 6 téglalap)',
      categoryId: 'prism'
    }
  ]
};

// 2. SZINT: Élek száma és Euler-tétel adatai szerint
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a testeket az éleik száma (E) szerint!',
  categories: [
    { id: 'few_edges', name: '10-nél kevesebb él (E < 10)', color: 'emerald' },
    { id: 'twelve_edges', name: 'Pontosan 12 él (E = 12)', color: 'teal' },
    { id: 'many_edges', name: '12-nél több él (E > 12)', color: 'blue' }
  ],
  items: [
    {
      id: 's2-1',
      label: 'Tetraéder (C = 4, L = 4, E = 6 él)',
      categoryId: 'few_edges'
    },
    {
      id: 's2-2',
      label: 'Négyzet alapú gúla (C = 5, L = 5, E = 8 él)',
      categoryId: 'few_edges'
    },
    {
      id: 's2-3',
      label: 'Háromoldalú hasáb (C = 6, L = 5, E = 9 él)',
      categoryId: 'few_edges'
    },
    {
      id: 's2-4',
      label: 'Kocka (C = 8, L = 6, E = 12 él)',
      categoryId: 'twelve_edges'
    },
    {
      id: 's2-5',
      label: 'Téglatest (C = 8, L = 6, E = 12 él)',
      categoryId: 'twelve_edges'
    },
    {
      id: 's2-6',
      label: 'Oktaéder (szabályos 8-lapú test, E = 12 él)',
      categoryId: 'twelve_edges'
    },
    {
      id: 's2-7',
      label: 'Hatszög alapú gúla (C = 7, L = 7, E = 12 él)',
      categoryId: 'twelve_edges'
    },
    {
      id: 's2-8',
      label: 'Ötoldalú hasáb (C = 10, L = 7, E = 15 él)',
      categoryId: 'many_edges'
    },
    {
      id: 's2-9',
      label: 'Hatszög alapú hasáb (C = 12, L = 8, E = 18 él)',
      categoryId: 'many_edges'
    },
    {
      id: 's2-10',
      label: 'Nyolcoldalú hasáb (C = 16, L = 10, E = 24 él)',
      categoryId: 'many_edges'
    }
  ]
};

// 3. SZINT: Síkbeli és ábrázolási kategóriák
const level3Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a síkbeli alakzatokat és leírásokat tulajdonságaik szerint!',
  categories: [
    { id: 'valid_net', name: 'Szabályos testháló (összehajtható)', color: 'emerald' },
    { id: 'invalid_net', name: 'Hibás háló (nem hajtogatható)', color: 'rose' },
    { id: 'ortho_view', name: 'Vetület (háromkép-rendszer)', color: 'indigo' }
  ],
  items: [
    {
      id: 's3-1',
      label: 'Kocka klasszikus kereszt alakú hálója (1-4-1 elrendezés)',
      categoryId: 'valid_net'
    },
    {
      id: 's3-2',
      label: '6 négyzetlap egyetlen egyenes vonalban (összehajtva átfedik egymást)',
      categoryId: 'invalid_net'
    },
    {
      id: 's3-3',
      label: 'Elölnézet: négyzet, felülnézet: négyzet, oldalnézet: négyzet (Kocka)',
      categoryId: 'ortho_view'
    },
    {
      id: 's3-4',
      label: 'Négyzet alap körül 4 háromszög lap (Négyzetes gúla)',
      categoryId: 'valid_net'
    },
    {
      id: 's3-5',
      label: '4 négyzetlap találkozik egyetlen csúcspontban (2x2-es tömb, nem ad kockát)',
      categoryId: 'invalid_net'
    },
    {
      id: 's3-6',
      label: 'Elölnézet: téglalap, felülnézet: kör (Henger)',
      categoryId: 'ortho_view'
    },
    {
      id: 's3-7',
      label: 'Háromoldalú hasáb hálója (3 téglalap palást + 2 háromszög alaplap)',
      categoryId: 'valid_net'
    },
    {
      id: 's3-8',
      label: '5 négyzetből álló alakzat kockahálóként bemutatva (hiányzik egy lapja!)',
      categoryId: 'invalid_net'
    },
    {
      id: 's3-9',
      label: 'Elölnézet: háromszög, felülnézet: kör ponttal (Kúp)',
      categoryId: 'ortho_view'
    },
    {
      id: 's3-10',
      label: 'Kocka lépcsős vagy Z-alakú hálója (nincs átfedés, kockát ad)',
      categoryId: 'valid_net'
    }
  ]
};

export const SolidsInSpaceAndPlaneSorter: React.FC<SolidsInSpaceAndPlaneSorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory
}) => {
  const activeLvl = Number(currentLevel ?? level) || 1;
  return (
    <SorterTemplate
      key={`solids-sorter-lvl-${activeLvl}`}
      title="Testek Térben és Síkban Csoportosító"
      subtitle="Rendszerezd a geometriai testeket, éleik számát és síkbeli ábrázolásukat!"
      badge="7. OSZTÁLY • CSOPORTOSÍTÓ"
      level={activeLvl as any}
      currentLevel={activeLvl as any}
      levels={{
        1: level1Config,
        2: level2Config,
        3: level3Config
      }}
      level1Config={level1Config}
      level2Config={level2Config}
      level3Config={level3Config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
