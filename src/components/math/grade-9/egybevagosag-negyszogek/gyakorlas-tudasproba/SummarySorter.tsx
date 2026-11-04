import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SummarySorterProps {
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
    title: '1. Szint: Transzformációk Körüljárási Irány Szerint',
    subtitle: 'Csoportosítsd az egybevágóságokat az orientáció megőrzése vagy megváltoztatása szerint!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Iránytartó (Egyenes)',
        description: 'Megőrzi a körüljárási irányt (óramutató járása szerinti marad)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-reverse',
        name: 'Irányváltó (Fordított)',
        description: 'Megfordítja a körüljárási irányt (tükörkép keletkezik)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-identity',
        name: 'Identitás (Helybenhagyó)',
        description: 'Minden pont pontosan az eredeti helyén marad',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Iránytartó
      { id: 'ss1-1', label: 'Középpontos tükrözés egy O pontra', category: 'cat-direct' },
      { id: 'ss1-2', label: 'Síkbeli elforgatás α = 60°-os szöggel', category: 'cat-direct' },
      { id: 'ss1-3', label: 'Párhuzamos eltolás v(3; 4) vektorral', category: 'cat-direct' },
      { id: 'ss1-4', label: 'Két egymást követő tengelyes tükrözés kompozíciója', category: 'cat-direct' },
      // Irányváltó
      { id: 'ss1-5', label: 'Tengelyes tükrözés egy t egyenesre', category: 'cat-reverse' },
      { id: 'ss1-6', label: 'Csúsztatva tükrözés (frizek váltott lépései)', category: 'cat-reverse' },
      { id: 'ss1-7', label: 'Három egymást követő tengelyes tükrözés eredője', category: 'cat-reverse' },
      { id: 'ss1-8', label: 'Tükrözés az x-tengelyre a koordinátasíkon', category: 'cat-reverse' },
      // Identitás
      { id: 'ss1-9', label: 'Kétszer egymás után végzett tükrözés ugyanarra a tengelyre', category: 'cat-identity' },
      { id: 'ss1-10', label: '360°-os forgatás a középpont körül', category: 'cat-identity' },
      { id: 'ss1-11', label: 'Nullvektorral (v = 0) történő párhuzamos eltolás', category: 'cat-identity' },
      { id: 'ss1-12', label: 'Kétszeri középpontos tükrözés ugyanarra az O pontra', category: 'cat-identity' }
    ]
  },
  2: {
    title: '2. Szint: Négyszögek Szimmetria Kategóriái',
    subtitle: 'Válogasd szét a négyszögeket tengelyes és középpontos szimmetriájuk alapján!',
    categories: [
      {
        id: 'cat-axial',
        name: 'Csak Tengelyesen Szimmetrikus',
        description: 'Van szimmetriatengelye, de nem középpontosan szimmetrikus',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-central',
        name: 'Csak Középpontosan Szimmetrikus',
        description: 'Átlómetszéspontjára szimmetrikus, de nincs szimmetriatengelye',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-both',
        name: 'Tengelyes és Középpontos is',
        description: 'Több szimmetriatengellyel és középpontos szimmetriával is rendelkezik',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Csak tengelyes
      { id: 'ss2-1', label: 'Húrtrapéz: 1 szimmetriatengelye van az alapok mentén', category: 'cat-axial' },
      { id: 'ss2-2', label: 'Deltoid: 1 szimmetriaátlója van, ami a harántátlót felezi', category: 'cat-axial' },
      { id: 'ss2-3', label: 'Egyenlő szárú trapéz, amely nem paralelogramma', category: 'cat-axial' },
      { id: 'ss2-4', label: 'Sárkány alakú konvex deltoid különböző szögekkel', category: 'cat-axial' },
      // Csak középpontos
      { id: 'ss2-5', label: 'Általános paralelogramma: átlói felezik egymást az O pontban', category: 'cat-central' },
      { id: 'ss2-6', label: 'Nincs szimmetriatengelye, de 180°-os forgatásra önmagába megy át', category: 'cat-central' },
      { id: 'ss2-7', label: 'Két párhuzamos oldalpárú alakzat, amely nem téglalap és nem rombusz', category: 'cat-central' },
      { id: 'ss2-8', label: 'Középpontjára szimmetrikus, de átlóira nem tükrözhető négyszög', category: 'cat-central' },
      // Mindkettő
      { id: 'ss2-9', label: 'Téglalap: 2 oldalfelező tengelye és O szimmetriaközéppontja van', category: 'cat-both' },
      { id: 'ss2-10', label: 'Rombusz: 2 átlótengelye és O szimmetriaközéppontja van', category: 'cat-both' },
      { id: 'ss2-11', label: 'Négyzet: 4 szimmetriatengelye és középpontos szimmetriája van', category: 'cat-both' },
      { id: 'ss2-12', label: 'Szabályos 4-szög minden forgási és tükrözési szimmetriával', category: 'cat-both' }
    ]
  },
  3: {
    title: '3. Szint: Síkidomok Területképletének Jellege',
    subtitle: 'Sorold be a síkidomokat a területüket megadó alapvető képletcsaládba!',
    categories: [
      {
        id: 'cat-base-height',
        name: 'Alap és Magasság (a · m)',
        description: 'Alap és a hozzá tartozó merőleges magasság szorzata alapján számított',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-diagonals',
        name: 'Merőleges Átlók Fele ((e · f)/2)',
        description: 'Egymásra merőleges átlók szorzatának felével számított terület',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-product',
        name: 'Oldalak Közvetlen Szorzata (a · b)',
        description: 'Két egymásra merőleges határoló oldal szorzata',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Alap és magasság
      { id: 'ss3-1', label: 'Paralelogramma területe: T = a · m_a', category: 'cat-base-height' },
      { id: 'ss3-2', label: 'Trapéz területe: T = ((a + c)/2) · m', category: 'cat-base-height' },
      { id: 'ss3-3', label: 'Középvonal szorozva a magassággal: k · m', category: 'cat-base-height' },
      { id: 'ss3-4', label: 'Átdarabolással téglalappá alakított ferde sáv területe', category: 'cat-base-height' },
      // Merőleges átlók fele
      { id: 'ss3-5', label: 'Rombusz területe az átlók szorzatából: T = (e · f) / 2', category: 'cat-diagonals' },
      { id: 'ss3-6', label: 'Deltoid területe a befoglaló téglalap feléből', category: 'cat-diagonals' },
      { id: 'ss3-7', label: 'Négyzet területe az átlójának négyzetéből: d² / 2', category: 'cat-diagonals' },
      { id: 'ss3-8', label: 'Bármely merőleges átlójú konvex négyszög területe', category: 'cat-diagonals' },
      // Oldalak szorzata
      { id: 'ss3-9', label: 'Téglalap területe: T = a · b', category: 'cat-product' },
      { id: 'ss3-10', label: 'Négyzet területe az oldala alapján: T = a²', category: 'cat-product' },
      { id: 'ss3-11', label: 'Derékszögű szoba alapterülete: szélesség × hosszúság', category: 'cat-product' },
      { id: 'ss3-12', label: 'Négyzetrácsos sakktábla egyetlen mezőjének területe', category: 'cat-product' }
    ]
  }
};

export const SummarySorter: React.FC<SummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-trans-osszefoglalas-sorter',
  topicTitle = '8. Gyakorlás, tudáspróba'
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

(SummarySorter as any).sorterLevels = sorterLevels;

