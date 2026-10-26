import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProportionalDivisionSorterProps {
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
    title: '1. Szint: Feladatok Típusa és Aránytagok Száma (Könnyű)',
    subtitle: 'Húzd az arányos osztási szituációkat a megfelelő szerkezeti kategóriába!',
    categories: [
      {
        id: 'cat-two',
        name: '2-tagú arányos osztás (a : b)',
        description: 'Két részre osztás, az arányrészek összege: S = a + b',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-three',
        name: '3-tagú arányos osztás (a : b : c)',
        description: 'Három részre osztás, az arányrészek összege: S = a + b + c',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-not-prop',
        name: 'Nem arányos osztás (Egyik sem)',
        description: 'Fix összegű levonás, egyenlő felezés vagy nem arányos szituáció',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'pds1-1', label: '60 cm-es szakasz felosztása 2 : 3 arányban', category: 'cat-two' },
      { id: 'pds1-2', label: '100 000 Ft elosztása két befektető között 3 : 7 arányban', category: 'cat-two' },
      { id: 'pds1-3', label: 'Téglalap oldalainak aránya 2 : 5, kerülete 42 cm', category: 'cat-two' },
      { id: 'pds1-4', label: 'Sárgaréz ötvözet: réz és cink 7 : 3 arányban', category: 'cat-two' },
      { id: 'pds1-5', label: 'Háromszög belső szögei 2 : 3 : 4 arányban', category: 'cat-three' },
      { id: 'pds1-6', label: '1600 ml limonádé szirup, víz és citromlé 1 : 5 : 2 arányban', category: 'cat-three' },
      { id: 'pds1-7', label: 'Háromszög kerülete 45 cm, oldalai 3 : 5 : 7 arányban', category: 'cat-three' },
      { id: 'pds1-8', label: 'Aranyötvözet: arany, ezüst és réz 14 : 3 : 3 arányban', category: 'cat-three' },
      { id: 'pds1-9', label: 'Örökség felosztása 1/2 : 1/3 : 1/4 arányban', category: 'cat-three' },
      { id: 'pds1-10', label: 'Egy torta pontos elfelezése két testvér között (50% - 50%)', category: 'cat-not-prop' },
      { id: 'pds1-11', label: 'Bér kifizetése: 200 000 Ft alapbér + 50 000 Ft bónusz', category: 'cat-not-prop' },
      { id: 'pds1-12', label: 'Taxi viteldíjának elszámolása 1000 Ft alapdíjjal', category: 'cat-not-prop' }
    ]
  },
  2: {
    title: '2. Szint: Alkalmazási Területek (Közepes)',
    subtitle: 'Csoportosítsd a feladatokat aszerint, hogy milyen témakörből származnak!',
    categories: [
      {
        id: 'cat-geom',
        name: 'Geometria (Szögek, Oldalak)',
        description: 'Háromszögek, téglalapok belső szögei, oldalai, kerülete és területe',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-fin',
        name: 'Pénzügy és Gazdaság',
        description: 'Befektetési nyereség, jutalom, örökség, költségek megosztása',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-chem',
        name: 'Kémia, Keverékek és Receptek',
        description: 'Fémötvözetek, oldatok, betonhabarcs, szörpök és élelmiszer receptek',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      }
    ],
    items: [
      { id: 'pds2-1', label: 'Háromszög belső szögei α : β : γ = 1 : 2 : 3 arányban', category: 'cat-geom' },
      { id: 'pds2-2', label: 'Téglalap szomszédos oldalainak aránya 3 : 4', category: 'cat-geom' },
      { id: 'pds2-3', label: 'Egy 80 cm-es szakasz P pont általi 3 : 5 arányú felosztása', category: 'cat-geom' },
      { id: 'pds2-4', label: 'Háromszög oldalai 4 : 5 : 6 arányban, kerülete 60 cm', category: 'cat-geom' },
      { id: 'pds2-5', label: '1 600 000 Ft nyereség felosztása befektetett tőke (3 : 5) arányában', category: 'cat-fin' },
      { id: 'pds2-6', label: '420 000 Ft prémium ledolgozott napok (12, 15, 18 nap) arányában', category: 'cat-fin' },
      { id: 'pds2-7', label: 'Társasházi közös költség lakásméretek (60 m² és 90 m²) arányában', category: 'cat-fin' },
      { id: 'pds2-8', label: 'Lottónyeremény elosztása a vásárolt szelvények száma szerint', category: 'cat-fin' },
      { id: 'pds2-9', label: 'Bronz ötvözet készítése: réz és ón 9 : 1 tömegarányban', category: 'cat-chem' },
      { id: 'pds2-10', label: 'Szörp és víz 1 : 4 arányú keverése házi üdítőhöz', category: 'cat-chem' },
      { id: 'pds2-11', label: 'Beton készítése: sóder, cement és víz 4 : 1 : 0.5 arányban', category: 'cat-chem' },
      { id: 'pds2-12', label: '20%-os sóoldat készítése só és víz 1 : 4 arányú bemérésével', category: 'cat-chem' }
    ]
  },
  3: {
    title: '3. Szint: Matematikai Megoldási Stratégia (Nehéz)',
    subtitle: 'Rendszerezd a feladatokat a szükséges matematikai módszer alapján!',
    categories: [
      {
        id: 'cat-direct-sum',
        name: 'Közvetlen összegből osztás (e = M / S)',
        description: 'A teljes összeg adott (pl. 180° szögek, kerület, teljes folyadéktérfogat)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-half-perim',
        name: 'Félkerülettel való számolás (K / 2)',
        description: 'Téglalap kerületénél a két oldal összege a félkerület: a + b = K / 2',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-quadratic',
        name: 'Szorzat / Terület (x²-es egyenlet)',
        description: 'Területnél vagy szorzatnál az aránytagok négyzete jelenik meg: a · b · x² = T',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'pds3-1', label: 'Háromszög belső szögei 2 : 3 : 4 arányban (M = 180°)', category: 'cat-direct-sum' },
      { id: 'pds3-2', label: 'Háromszög kerülete 36 cm, oldalai 3 : 4 : 5 arányúak', category: 'cat-direct-sum' },
      { id: 'pds3-3', label: '1500 ml kész limonádé összetevőinek kimérése', category: 'cat-direct-sum' },
      { id: 'pds3-4', label: '50 kg bronz ötvözet réz- és óntartalmának kiszámítása', category: 'cat-direct-sum' },
      { id: 'pds3-5', label: 'Téglalap kerülete 42 cm, oldalai 2 : 5 arányúak (a + b = 21 cm)', category: 'cat-half-perim' },
      { id: 'pds3-6', label: 'Téglalap K = 100 m, hosszúság és szélesség 3 : 7 arányú (a + b = 50 m)', category: 'cat-half-perim' },
      { id: 'pds3-7', label: 'Kerítés hossza 56 m téglalap alakú telken, oldalak 3 : 4 (a + b = 28 m)', category: 'cat-half-perim' },
      { id: 'pds3-8', label: 'Téglalap kerülete 80 cm, oldalak aránya 1 : 3 (a + b = 40 cm)', category: 'cat-half-perim' },
      { id: 'pds3-9', label: 'Téglalap területe T = 48 cm², oldalai 3 : 4 arányban (12x² = 48)', category: 'cat-quadratic' },
      { id: 'pds3-10', label: 'Téglalap alakú szoba területe 24 m², oldalai 2 : 3 arányban (6x² = 24)', category: 'cat-quadratic' },
      { id: 'pds3-11', label: 'Fotó nagyítása: terület 300 cm², oldalak 3 : 4 (12x² = 300)', category: 'cat-quadratic' },
      { id: 'pds3-12', label: 'Paralelogramma alapja és magassága 2 : 5 arányban, területe 90 cm²', category: 'cat-quadratic' }
    ]
  }
};

export const ProportionalDivisionSorter: React.FC<ProportionalDivisionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-szamok-aranyos-osztas-sorter'}
      topicTitle={topicTitle || 'Arányos Osztás Csoportosító'}
    />
  );
};

export default ProportionalDivisionSorter;
