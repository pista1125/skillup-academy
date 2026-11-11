import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SectorMiniSvg, SegmentMiniSvg } from './CentralAngleArcSectorFigures';
import { CircularRingMiniSvg } from '../a-kor-kerulete-es-terulete/CircleCircumferenceAreaFigures';

interface CentralAngleArcSectorSorterProps {
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
    title: 'Síkrészek típusai a körben',
    subtitle: 'Válogasd szét az alakzatokat aszerint, hogy körcikk, körszelet vagy körgyűrű!',
    categories: [
      {
        id: 'cat-cikk',
        name: 'Körcikk (szektor)',
        description: 'Két sugár és egy körív határolja (pizza-szelet)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-szelet',
        name: 'Körszelet (szegmens)',
        description: 'Egy húr és egy körív határolja',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-gyuru',
        name: 'Körgyűrű',
        description: 'Két koncentrikus kör közötti terület',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'cas1-1', content: 'Két sugár és egy ív által bezárt terület', figure: <SectorMiniSvg size={44} />, categoryId: 'cat-cikk' },
      { id: 'cas1-2', content: 'Egyenes húr és a körív közötti rész', figure: <SegmentMiniSvg size={44} />, categoryId: 'cat-szelet' },
      { id: 'cas1-3', content: 'Két azonos középpontú kör közötti sáv', figure: <CircularRingMiniSvg size={44} />, categoryId: 'cat-gyuru' },
      { id: 'cas1-4', content: 'Pizzaszelet alakú síkrész', figure: <SectorMiniSvg size={44} />, categoryId: 'cat-cikk' },
      { id: 'cas1-5', content: 'T = T_cikk - T_háromszög képlettel számított rész', figure: <SegmentMiniSvg size={44} />, categoryId: 'cat-szelet' },
      { id: 'cas1-6', content: 'T = π · (R² - r²) képlettel számított rész', figure: <CircularRingMiniSvg size={44} />, categoryId: 'cat-gyuru' },
      { id: 'cas1-7', content: 'Óramutatók által súrolt körcikk', categoryId: 'cat-cikk' },
      { id: 'cas1-8', content: 'Íj és ideg által bezárt síkrész', categoryId: 'cat-szelet' },
      { id: 'cas1-9', content: 'Futópálya kanyarulata (koncentrikus ívek)', categoryId: 'cat-gyuru' },
      { id: 'cas1-10', content: 'K_cikk = i + 2r kerületű alakzat', figure: <SectorMiniSvg size={44} />, categoryId: 'cat-cikk' },
      { id: 'cas1-11', content: 'Húr által levágott kupola', figure: <SegmentMiniSvg size={44} />, categoryId: 'cat-szelet' },
      { id: 'cas1-12', content: 'Autógumi oldalprofilja', figure: <CircularRingMiniSvg size={44} />, categoryId: 'cat-gyuru' }
    ]
  },
  2: {
    title: 'Szögtartományok és körcikkek aránya',
    subtitle: 'Válogasd szét a szögeket a teljes körhöz viszonyított nagyságuk szerint!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kisebb, mint a negyedkör (< 90°)',
        description: 'A kör 1/4-énél kisebb szektorok',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-quarter-half',
        name: 'Negyedkör és félkör között (90° – 180°)',
        description: 'A kör 1/4-e és 1/2-e közé eső szektorok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-major',
        name: 'Nagyobb, mint a félkör (> 180°)',
        description: 'Konkáv középponti szögekhez tartozó szektorok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'cas2-1', content: '30°-os középponti szög', categoryId: 'cat-small' },
      { id: 'cas2-2', content: '120°-os középponti szög', categoryId: 'cat-quarter-half' },
      { id: 'cas2-3', content: '270°-os középponti szög (háromnegyed kör)', categoryId: 'cat-major' },
      { id: 'cas2-4', content: '45°-os középponti szög', categoryId: 'cat-small' },
      { id: 'cas2-5', content: '150°-os középponti szög', categoryId: 'cat-quarter-half' },
      { id: 'cas2-6', content: '300°-os középponti szög', categoryId: 'cat-major' },
      { id: 'cas2-7', content: '60°-os középponti szög', categoryId: 'cat-small' },
      { id: 'cas2-8', content: '135°-os középponti szög', categoryId: 'cat-quarter-half' },
      { id: 'cas2-9', content: '210°-os középponti szög', categoryId: 'cat-major' },
      { id: 'cas2-10', content: '72°-os középponti szög (szabályos ötszög)', categoryId: 'cat-small' },
      { id: 'cas2-11', content: '100°-os középponti szög', categoryId: 'cat-quarter-half' },
      { id: 'cas2-12', content: '330°-os középponti szög', categoryId: 'cat-major' }
    ]
  },
  3: {
    title: 'Ívhossz és sugár aránya (Szög radiánban)',
    subtitle: 'Válogasd szét az íveket aszerint, hogyan viszonyul az ívhossz (i) a sugárhoz (r)!',
    categories: [
      {
        id: 'cat-i-less-r',
        name: 'i < r (α < 1 rad, kb. 57,3°)',
        description: 'Az ívhossz rövidebb, mint a sugár',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-i-equal-r',
        name: 'i ≈ r (α ≈ 1 rad = 57,3°)',
        description: 'Az ívhossz pontosan megegyezik a sugárral',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-i-greater-r',
        name: 'i > r (α > 1 rad)',
        description: 'Az ívhossz hosszabb, mint a sugár',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'cas3-1', content: '30°-os szög íve (i = rπ/6 ≈ 0,52r)', categoryId: 'cat-i-less-r' },
      { id: 'cas3-2', content: '1 radián nagyságú szög íve (i = r)', categoryId: 'cat-i-equal-r' },
      { id: 'cas3-3', content: '90°-os szög íve (i = rπ/2 ≈ 1,57r)', categoryId: 'cat-i-greater-r' },
      { id: 'cas3-4', content: '45°-os szög íve (i = rπ/4 ≈ 0,79r)', categoryId: 'cat-i-less-r' },
      { id: 'cas3-5', content: '57,3°-os szög íve', categoryId: 'cat-i-equal-r' },
      { id: 'cas3-6', content: '60°-os szög íve (i = rπ/3 ≈ 1,05r > r)', categoryId: 'cat-i-greater-r' },
      { id: 'cas3-7', content: '20°-os szög íve', categoryId: 'cat-i-less-r' },
      { id: 'cas3-8', content: '180° (félkör íve: i = πr ≈ 3,14r)', categoryId: 'cat-i-greater-r' },
      { id: 'cas3-9', content: '180° / π szög íve', categoryId: 'cat-i-equal-r' },
      { id: 'cas3-10', content: '10°-os szög íve', categoryId: 'cat-i-less-r' },
      { id: 'cas3-11', content: '120°-os szög íve (i = 2πr/3 ≈ 2,09r)', categoryId: 'cat-i-greater-r' },
      { id: 'cas3-12', content: '270°-os szög íve', categoryId: 'cat-i-greater-r' }
    ]
  }
};

export const CentralAngleArcSectorSorter: React.FC<CentralAngleArcSectorSorterProps> = (props) => {
  return (
    <SorterTemplate
      title="Középponti szög, körív, körcikk Csoportosító"
      subtitle="Válogasd szét a geometriai fogalmakat és mennyiségeket a megfelelő kategóriákba!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      color="blue"
      levels={sorterLevels}
      {...props}
    />
  );
};
