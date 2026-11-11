import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ClockMiniSvg,
  WiperMiniSvg,
  GearMiniSvg,
  PizzaSliceMiniSvg
} from './EverydayArcsSectorsFigures';

interface EverydayArcsSectorsSorterProps {
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
    title: 'Mutatók által bezárt szögek fajtái',
    subtitle: 'Csoportosítsd az időpontokat a mutatók által bezárt hegyes-, derék- vagy tompaszög szerint!',
    categories: [
      {
        id: 'cat-acute',
        name: 'Hegyesszög (< 90°)',
        description: '0° és 90° közötti szög',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-right',
        name: 'Pontosan derékszög (90°)',
        description: '90°-os szögállás',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszög (> 90° és < 180°)',
        description: '90° és 180° közötti szög',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'eas1-1', content: '1:00 óra (30°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-acute' },
      { id: 'eas1-2', content: '3:00 óra (90°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-right' },
      { id: 'eas1-3', content: '4:00 óra (120°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-obtuse' },
      { id: 'eas1-4', content: '2:00 óra (60°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-acute' },
      { id: 'eas1-5', content: '9:00 óra (90°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-right' },
      { id: 'eas1-6', content: '5:00 óra (150°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-obtuse' },
      { id: 'eas1-7', content: '3:15 óra (7,5°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-acute' },
      { id: 'eas1-8', content: '8:20 óra (130°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-obtuse' },
      { id: 'eas1-9', content: '1:05 óra (2,5°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-acute' },
      { id: 'eas1-10', content: '2:30 óra (105°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-obtuse' },
      { id: 'eas1-11', content: '12:10 óra (55°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-acute' },
      { id: 'eas1-12', content: '7:00 óra (150°)', figure: <ClockMiniSvg size={44} />, categoryId: 'cat-obtuse' }
    ]
  },
  2: {
    title: 'Gyakorlati körös eszközök',
    subtitle: 'Válogasd szét a mindennapi eszközöket az általuk leírt geometriai forma szerint!',
    categories: [
      {
        id: 'cat-full-circle',
        name: 'Teljes körforgás (360°)',
        description: 'Kerékpárkerék, körforgalom, kör alakú pizza',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-sector',
        name: 'Körcikk (szektor)',
        description: 'Tortaszelet, kerti szektormozgású locsoló',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-annulus-sector',
        name: 'Körgyűrű-cikk (sávos ív)',
        description: 'Ablaktörlő lapát, legyező papírrésze',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'eas2-1', content: 'Autó kereke gördüléskor', categoryId: 'cat-full-circle' },
      { id: 'eas2-2', content: 'Pizzaszelet', categoryId: 'cat-sector' },
      { id: 'eas2-3', content: 'Szélvédő ablaktörlője által letörölt sáv', categoryId: 'cat-annulus-sector' },
      { id: 'eas2-4', content: 'Körforgalom zöld szigete', categoryId: 'cat-full-circle' },
      { id: 'eas2-5', content: '90°-os kanyarban szóró öntöző', categoryId: 'cat-sector' },
      { id: 'eas2-6', content: 'Kinyitható legyező papírsávja', categoryId: 'cat-annulus-sector' },
      { id: 'eas2-7', content: 'Kerek falióra számlapja', categoryId: 'cat-full-circle' },
      { id: 'eas2-8', content: 'Kördiagram egyetlen szelete', categoryId: 'cat-sector' },
      { id: 'eas2-9', content: 'Íves autópálya-lehajtó útteste', categoryId: 'cat-annulus-sector' },
      { id: 'eas2-10', content: 'Kerek asztal lapja', categoryId: 'cat-full-circle' },
      { id: 'eas2-11', content: 'Cirkuszi reflektor fénycsóvája a talajon', categoryId: 'cat-sector' },
      { id: 'eas2-12', content: 'Íves stadionlelátó üléssora', categoryId: 'cat-annulus-sector' }
    ]
  },
  3: {
    title: 'Szögsebességek nagysága',
    subtitle: 'Hasonlítsd össze az elfordulási sebességeket!',
    categories: [
      {
        id: 'cat-very-fast',
        name: 'Gyors forgás (> 10°/s)',
        description: 'Kerék 60 km/h-nál, fúrógép, ventilátor',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-moderate',
        name: 'Közepes forgás (0,1°/s – 10°/s)',
        description: 'Óra másodpercmutatója (6°/s), ablaktörlő',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-slow',
        name: 'Lassú mozgás (< 0,1°/s)',
        description: 'Óra nagymutatója (0,1°/s), kismutatója, Föld forgása',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      { id: 'eas3-1', content: 'Autó kereke 90 km/h sebességnél (~4800°/s)', categoryId: 'cat-very-fast' },
      { id: 'eas3-2', content: 'Óra másodpercmutatója (360°/60s = 6°/s)', categoryId: 'cat-moderate' },
      { id: 'eas3-3', content: 'Óra nagymutatója (360°/3600s = 0,1°/s)', categoryId: 'cat-slow' },
      { id: 'eas3-4', content: 'Autó ablaktörlője oda-vissza mozgáskor (~60°/s)', categoryId: 'cat-very-fast' },
      { id: 'eas3-5', content: 'Radarantenna forgása (~36°/s)', categoryId: 'cat-very-fast' },
      { id: 'eas3-6', content: 'Óra kismutatója (0,0083°/s)', categoryId: 'cat-slow' },
      { id: 'eas3-7', content: 'Föld tengely körüli forgása (360°/24h ≈ 0,004°/s)', categoryId: 'cat-slow' },
      { id: 'eas3-8', content: 'Lassan körbeforduló kilátó étterem (~1°/s)', categoryId: 'cat-moderate' },
      { id: 'eas3-9', content: 'Napórára vetülő árnyék mozgása', categoryId: 'cat-slow' },
      { id: 'eas3-10', content: 'Kerti forgó locsolófej (~180°/s)', categoryId: 'cat-very-fast' },
      { id: 'eas3-11', content: 'Szélerőmű lapátja normál szélben (~15°/s)', categoryId: 'cat-very-fast' },
      { id: 'eas3-12', content: 'Óriáskerék forgása (~0,5°/s)', categoryId: 'cat-moderate' }
    ]
  }
};

export const EverydayArcsSectorsSorter: React.FC<EverydayArcsSectorsSorterProps> = (props) => {
  return (
    <SorterTemplate
      title="Körívek a mindennapokban Csoportosító"
      subtitle="Válogasd szét a mindennapi geometriai kifejezéseket a megfelelő kategóriákba!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      color="purple"
      levels={sorterLevels}
      {...props}
    />
  );
};
