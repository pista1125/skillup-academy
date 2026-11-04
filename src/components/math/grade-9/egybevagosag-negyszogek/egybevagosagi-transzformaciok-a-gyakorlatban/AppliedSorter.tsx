import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AppliedSorterProps {
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
    title: '1. Szint: Transzformációk Szerepe a Díszítősorokban',
    subtitle: 'Sorold be az állításokat és mintajellemzőket a megfelelő transzformációhoz!',
    categories: [
      {
        id: 'cat-trans',
        name: 'Eltolás (Transzláció)',
        description: 'Minden friz közös alapja, periodikus mozgás egy egyenes mentén',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-refl',
        name: 'Tengelyes Tükrözés',
        description: 'Hosszanti felezőtengely vagy merőleges kereszttengelyek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-glide',
        name: 'Csúsztatva Tükrözés',
        description: 'Fél lépésnyi eltolás és hossztengelyes tükrözés kompozíciója',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Eltolás
      { id: 'as1-1', label: 'Minden frizben kötelezően jelen lévő, periodikus v vektorú mozgás', category: 'cat-trans' },
      { id: 'as1-2', label: 'Önmagában a p1 (hop) típusú legegyszerűbb frizcsoportot alkotja', category: 'cat-trans' },
      { id: 'as1-3', label: 'Két egymást követő azonos csúsztatva tükrözés eredője (2v eltolás)', category: 'cat-trans' },
      { id: 'as1-4', label: 'Két párhuzamos egyenesre való egymás utáni tükrözés eredője', category: 'cat-trans' },
      // Tengelyes Tükrözés
      { id: 'as1-5', label: 'A szalag hossztengelyére való tükrözés (p11m / jump)', category: 'cat-refl' },
      { id: 'as1-6', label: 'A haladási vonalra merőleges kereszt-szimmetriatengelyek sora (p1m1)', category: 'cat-refl' },
      { id: 'as1-7', label: 'Megfordítja a motívum körüljárási irányát egy lépésben', category: 'cat-refl' },
      { id: 'as1-8', label: 'Szimmetrikus tükörképpárok kialakítása a mintában', category: 'cat-refl' },
      // Csúsztatva Tükrözés
      { id: 'as1-9', label: 'Fél periódusnyi eltolás és a felezővonalra való tükrözés összessége', category: 'cat-glide' },
      { id: 'as1-10', label: 'A két emberi láb által a nedves homokban hagyott váltott lépések sora', category: 'cat-glide' },
      { id: 'as1-11', label: 'A p11g (step) kódú frizcsoport egyetlen sajátos szimmetriája', category: 'cat-glide' },
      { id: 'as1-12', label: 'Váltakozó oldali, tükrözött elemek periodikus elhelyezkedése a tengely két oldalán', category: 'cat-glide' }
    ]
  },
  2: {
    title: '2. Szint: Szabályos Sokszögek Síklefedési Képessége',
    subtitle: 'Csoportosítsd a szabályos síkidomokat parkettázási tulajdonságaik szerint!',
    categories: [
      {
        id: 'cat-regular',
        name: 'Önmagában Parkettázó',
        description: 'Kizárólag ezzel az egy idommal hézagmentesen lefedhető a sík',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-semi',
        name: 'Félszabályos Parkettában',
        description: 'Önmagában nem, de más szabályos idomokkal társítva parkettáz',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-none',
        name: 'Nem Parkettázó Idom',
        description: 'Sem önmagában, sem szabályos parkettában nem adhat 360°-os zárt csúcsot',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Önmagában parkettázó
      { id: 'as2-1', label: 'Szabályos háromszög (6 × 60° = 360°)', category: 'cat-regular' },
      { id: 'as2-2', label: 'Négyzet (4 × 90° = 360°)', category: 'cat-regular' },
      { id: 'as2-3', label: 'Szabályos hatszög (3 × 120° = 360°, méhsejt-rács)', category: 'cat-regular' },
      { id: 'as2-4', label: 'Olyan szabályos sokszög, amelynek belső szöge egész osztója a 360°-nak', category: 'cat-regular' },
      // Félszabályos
      { id: 'as2-5', label: 'Szabályos nyolcszög (135°: két nyolcszög és egy négyzet: 2×135° + 90° = 360°)', category: 'cat-semi' },
      { id: 'as2-6', label: 'Szabályos tizenkétszög (150°: egy tizenkétszög, egy hatszög és egy négyzet: 150°+120°+90°=360°)', category: 'cat-semi' },
      { id: 'as2-7', label: 'Szabályos hatszögek és háromszögek kombinációja (3.6.3.6 kagome-rács)', category: 'cat-semi' },
      { id: 'as2-8', label: 'Olyan idom, amely más szabályos idomokkal együtt kiegészíti a csúcsot 360°-ra', category: 'cat-semi' },
      // Nem parkettázó
      { id: 'as2-9', label: 'Szabályos ötszög (108°: 3 db esetén 36° rés marad, 4 db esetén átfedés)', category: 'cat-none' },
      { id: 'as2-10', label: 'Szabályos hétszög (128,57°: nem kombinálható 360°-ra szabályos sokszögekkel)', category: 'cat-none' },
      { id: 'as2-11', label: 'Szabályos kilencszög (140°: nem hozható létre vele szabályos csúcsösszeg)', category: 'cat-none' },
      { id: 'as2-12', label: 'Szabályos tízszög (144°: 2 db 288°, 3 db 432°, nem osztója a 360°-nak)', category: 'cat-none' }
    ]
  },
  3: {
    title: '3. Szint: Szimmetriák a Valóságban és a Művészetben',
    subtitle: 'Válogasd szét a példákat a periodicitás és dimenzió jellege szerint!',
    categories: [
      {
        id: 'cat-frieze',
        name: 'Szalagornamens (1D)',
        description: 'Egyetlen egyenes mentén, egy dimenzióban periodikus díszítősor',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-wallpaper',
        name: 'Síklefedés (2D Tapéta)',
        description: 'A teljes síkot két független irányban periodikusan kitöltő minta',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-crystal',
        name: 'Térbeli Kristályrács (3D)',
        description: 'Három dimenzióban eltolható fizikai atomi és molekuláris struktúra',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      // Szalagornamens (1D)
      { id: 'as3-1', label: 'Görög meander szegélydísz egy antik váza peremén', category: 'cat-frieze' },
      { id: 'as3-2', label: 'Kerítéslécek periodikusan ismétlődő mintázata az utcán', category: 'cat-frieze' },
      { id: 'as3-3', label: 'Emberi vagy állati lépések váltakozó sora a friss hóban', category: 'cat-frieze' },
      { id: 'as3-4', label: 'Népviseleti kötény alsó szélére hímzett díszítősor', category: 'cat-frieze' },
      // Síklefedés (2D)
      { id: 'as3-5', label: 'Fürdőszobai csempézés vagy sakktábla négyzethálója', category: 'cat-wallpaper' },
      { id: 'as3-6', label: 'M. C. Escher egymásba illeszkedő halakat és madarakat ábrázoló grafikái', category: 'cat-wallpaper' },
      { id: 'as3-7', label: 'Az Alhambra mór palotájának színes csempeburkolatai', category: 'cat-wallpaper' },
      { id: 'as3-8', label: 'Méhek által viaszból épített síkbeli hatszöges lépszerkezet', category: 'cat-wallpaper' },
      // Térbeli Kristályrács (3D)
      { id: 'as3-9', label: 'Konyhasó (NaCl) szabályos kockarácsos atomi kristályszerkezete', category: 'cat-crystal' },
      { id: 'as3-10', label: 'Gyémánt és grafit szénatomjainak háromdimenziós rácsa', category: 'cat-crystal' },
      { id: 'as3-11', label: 'Fémek tércentrált és lapcentrált elemi cellás rácsai', category: 'cat-crystal' },
      { id: 'as3-12', label: 'Jégkristály hexagonális molekuláris térrácsa', category: 'cat-crystal' }
    ]
  }
};

export const AppliedSorter: React.FC<AppliedSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-trans-gyakorlat-sorter',
  topicTitle = '5. Egybevágósági transzformációk a gyakorlatban'
}) => {
  return (
    <SorterTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={9}
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={sorterLevels}
      levelConfigs={sorterLevels}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
    />
  );
};

(AppliedSorter as any).sorterLevels = sorterLevels;


