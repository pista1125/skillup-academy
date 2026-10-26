import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PercentageSorterProps {
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
    title: '1. Szint: Keresett Alapelem Meghatározása (Könnyű)',
    subtitle: 'Húzd a feladatokat a megfelelő kategóriába aszerint, hogy mit kell kiszámolni!',
    categories: [
      {
        id: 'cat-base',
        name: 'Alap keresése (A = E / p%)',
        description: 'A 100%-os egész mennyiség vagy az eredeti érték a kérdés',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-rate',
        name: 'Százalékláb keresése (p% = E / A)',
        description: 'A hány százalék, arány vagy leárazás mértéke a kérdés',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-value',
        name: 'Százalékérték keresése (E = A · p%)',
        description: 'A konkrét részmennyiség, ÁFA összege vagy engedmény a kérdés',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'pcs1-1', label: 'Melyik számnak a 20%-a a 40?', category: 'cat-base' },
      { id: 'pcs1-2', label: 'Egy kabát 30% akció után 14 000 Ft: mennyi volt az eredeti ára?', category: 'cat-base' },
      { id: 'pcs1-3', label: 'Hány diák jár az iskolába, ha a 15%-uk pontosan 90 fő?', category: 'cat-base' },
      { id: 'pcs1-4', label: 'Nettó ár kiszámítása a 25 400 Ft-os bruttó fogyasztói árból', category: 'cat-base' },
      { id: 'pcs1-5', label: '50-nek a 15 hány százaléka?', category: 'cat-rate' },
      { id: 'pcs1-6', label: 'Egy könyv ára 4000 Ft-ról 5000 Ft-ra nőtt: hány % a drágulás?', category: 'cat-rate' },
      { id: 'pcs1-7', label: '20 g só 180 g vízben: hány tömegszázalékos az oldat?', category: 'cat-rate' },
      { id: 'pcs1-8', label: 'Egy dolgozó a 600 szavazatból 240-et kapott: szavazati arány?', category: 'cat-rate' },
      { id: 'pcs1-9', label: 'Mennyi 500-nak a 20%-a?', category: 'cat-value' },
      { id: 'pcs1-10', label: '50 000 Ft nettó összeg 27%-os ÁFA tartalma forintban', category: 'cat-value' },
      { id: 'pcs1-11', label: '600 diák 12%-a kitűnő: hány kitűnő tanuló van?', category: 'cat-value' },
      { id: 'pcs1-12', label: '15 000 Ft éttermi számlára 10% szervizdíj kiszámítása', category: 'cat-value' }
    ]
  },
  2: {
    title: '2. Szint: Szorzótényezők és Változások (Közepes)',
    subtitle: 'Kategorizáld az eseményeket a szorzótényezőjük értéke (k) szerint!',
    categories: [
      {
        id: 'cat-growth',
        name: 'Növekedés (Szorzó: k > 1,00)',
        description: 'Áremelés, ÁFA hozzáadása, kamat, infláció, drágulás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-decrease',
        name: 'Csökkenés (Szorzó: k < 1,00)',
        description: 'Leárazás, akció, árengedmény, selejt, súlyvesztés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-constant',
        name: 'Változatlan (Szorzó: k = 1,00)',
        description: '100% egész, 0% árváltozás, fix szinten maradó érték',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      { id: 'pcs2-1', label: '+20% áremelés közvetlen szorzója (· 1,20)', category: 'cat-growth' },
      { id: 'pcs2-2', label: '+27% magyar ÁFA felszámítása (· 1,27)', category: 'cat-growth' },
      { id: 'pcs2-3', label: '+5% éves banki betéti kamat jóváírása (· 1,05)', category: 'cat-growth' },
      { id: 'pcs2-4', label: '8% infláció hatása az árakra (· 1,08)', category: 'cat-growth' },
      { id: 'pcs2-5', label: '-15% szezonális leárazás (· 0,85)', category: 'cat-decrease' },
      { id: 'pcs2-6', label: '-30% végkiárusítás a ruhaüzletben (· 0,70)', category: 'cat-decrease' },
      { id: 'pcs2-7', label: '5% selejt levonása a gyártásból (· 0,95)', category: 'cat-decrease' },
      { id: 'pcs2-8', label: '10% testsúlycsökkenés diéta után (· 0,90)', category: 'cat-decrease' },
      { id: 'pcs2-9', label: 'Az eredeti alap 100%-a (· 1,00)', category: 'cat-constant' },
      { id: 'pcs2-10', label: '0%-os fizetésemelés', category: 'cat-constant' },
      { id: 'pcs2-11', label: 'Egy rúd teljes hosszának megőrzése', category: 'cat-constant' },
      { id: 'pcs2-12', label: '1/1 arányú változatlan kifizetés', category: 'cat-constant' }
    ]
  },
  3: {
    title: '3. Szint: Számítási Stratégiák és Csapdák (Nehéz)',
    subtitle: 'Rendszerezd a feladatokat a szükséges matematikai eljárás alapján!',
    categories: [
      {
        id: 'cat-direct-mult',
        name: 'Közvetlen szorzás (Alapból új érték)',
        description: 'Adott az eredeti ár, közvetlenül megszorozzuk a tényezővel',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-reverse-div',
        name: 'Visszaszámolás osztással (Újból eredeti)',
        description: 'Bruttóból nettó vagy akciós árból eredeti ár: osztás a szorzóval',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-chain-mult',
        name: 'Láncolt szorzás (Több egymás utáni változás)',
        description: 'Egymás utáni változások: a szorzótényezők összeszorzódnak',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'pcs3-1', label: '50 000 Ft nettó ár 27% ÁFA-s bruttója: 50 000 · 1,27', category: 'cat-direct-mult' },
      { id: 'pcs3-2', label: '20 000 Ft cipő 15% leárazás után: 20 000 · 0,85', category: 'cat-direct-mult' },
      { id: 'pcs3-3', label: 'Kördiagram középponti szöge 25%-hoz: 360° · 0,25 = 90°', category: 'cat-direct-mult' },
      { id: 'pcs3-4', label: '80 000 Ft-os fizetés 5%-os emelés után: 80 000 · 1,05', category: 'cat-direct-mult' },
      { id: 'pcs3-5', label: 'Bruttó 25 400 Ft-ból nettó ár: 25 400 / 1,27 = 20 000 Ft', category: 'cat-reverse-div' },
      { id: 'pcs3-6', label: 'Akciós 14 000 Ft-ból eredeti ár: 14 000 / 0,70 = 20 000 Ft', category: 'cat-reverse-div' },
      { id: 'pcs3-7', label: 'Melyik számnak a 10%-a 40? 40 / 0,10 = 400', category: 'cat-reverse-div' },
      { id: 'pcs3-8', label: '20% leárazás utáni visszaállításhoz szükséges emelés: 1 / 0,80 = 1,25', category: 'cat-reverse-div' },
      { id: 'pcs3-9', label: '+20% emelés majd -20% leárazás: 1,20 · 0,80 = 0,96 (4% veszteség)', category: 'cat-chain-mult' },
      { id: 'pcs3-10', label: 'Kétszeri 10% leárazás összevont hatása: 0,90 · 0,90 = 0,81', category: 'cat-chain-mult' },
      { id: 'pcs3-11', label: 'Téglalap oldalai: +20% hossz, -10% szélesség: 1,20 · 0,90 = 1,08', category: 'cat-chain-mult' },
      { id: 'pcs3-12', label: 'Kocka éle +10%: térfogatának változása 1,10³ = 1,331 (+33,1%)', category: 'cat-chain-mult' }
    ]
  }
};

export const PercentageSorter: React.FC<PercentageSorterProps> = ({
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
      topicId={topicId || 'g9-szamok-szazalek-sorter'}
      topicTitle={topicTitle || 'Százalékszámítás Csoportosító'}
    />
  );
};

export default PercentageSorter;
