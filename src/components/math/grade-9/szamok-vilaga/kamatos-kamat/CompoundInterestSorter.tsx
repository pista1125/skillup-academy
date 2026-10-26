import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompoundInterestSorterProps {
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
    title: '1. Szint: Kamattényezők és Folyamatok Iránya (Könnyű)',
    subtitle: 'Sorold be a pénzügyi folyamatokat a kamattényező (q) nagysága alapján!',
    categories: [
      {
        id: 'cat-growth',
        name: 'Tőkenövekedés (q > 1)',
        description: 'A tőke évről évre gyarapszik (pl. betéti kamat, pozitív hozam)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-loss',
        name: 'Értékcsökkenés (0 < q < 1)',
        description: 'A tőke értéke évről évre csökken (pl. amortizáció, infláció)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-neutral',
        name: 'Értékmegőrzés (q = 1)',
        description: 'Nincs hozam és nincs értékvesztés, a nominális összeg fix',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      { id: 'cis-1-1', label: 'Évi 8%-os lekötött bankbetét (q = 1,08)', category: 'cat-growth' },
      { id: 'cis-1-2', label: 'Babakötvény megtakarítás (q = 1,09)', category: 'cat-growth' },
      { id: 'cis-1-3', label: 'Évi 5%-os gazdasági termelésbővülés (q = 1,05)', category: 'cat-growth' },
      { id: 'cis-1-4', label: 'Részvényalap átlagos 10%-os hozama (q = 1,10)', category: 'cat-growth' },
      { id: 'cis-1-5', label: 'Új személyautó évi 15%-os amortizációja (q = 0,85)', category: 'cat-loss' },
      { id: 'cis-1-6', label: 'Évi 6%-os pénzromlás / infláció (q = 0,94)', category: 'cat-loss' },
      { id: 'cis-1-7', label: 'Számítógépek évi 25%-os avulása (q = 0,75)', category: 'cat-loss' },
      { id: 'cis-1-8', label: 'Fém alkatrészek kopása és leértékelődése (q = 0,90)', category: 'cat-loss' },
      { id: 'cis-1-9', label: 'Otthoni széfben őrzött készpénz névleges értéke (q = 1,0)', category: 'cat-neutral' },
      { id: 'cis-1-10', label: '0%-os kamatú folyószámla egyenlege (q = 1,0)', category: 'cat-neutral' },
      { id: 'cis-1-11', label: 'Kamatmentes baráti kölcsön összege (q = 1,0)', category: 'cat-neutral' },
      { id: 'cis-1-12', label: 'Fix összegű bérleti kaució a szerződés végén (q = 1,0)', category: 'cat-neutral' }
    ]
  },
  2: {
    title: '2. Szint: Kamatozási Módszerek Osztályozása (Közepes)',
    subtitle: 'Különböztesd meg az egyszerű kamatot, kamatos kamatot és értékcsökkenést!',
    categories: [
      {
        id: 'cat-simple',
        name: 'Egyszerű kamat (Lineáris)',
        description: 'Tₙ = T₀ + n · K, a kamat nem tőkésedik, fix összeg jár évente',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-compound',
        name: 'Kamatos kamat (Exponenciális)',
        description: 'Tₙ = T₀ · qⁿ, a felhalmozott kamat is kamatozik a következő évben',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-depreciation',
        name: 'Amortizáció / Értékvesztés',
        description: 'Tₙ = T₀ · (1 - p/100)ⁿ, gépjárművek és elektronika avulása',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'cis-2-1', label: 'Fix évi 50 000 Ft kamat kifizetése a kézbe év végén', category: 'cat-simple' },
      { id: 'cis-2-2', label: 'Tₙ = 100 000 + n · 8000 képlettel leírt növekedés', category: 'cat-simple' },
      { id: 'cis-2-3', label: 'A kamat év végén nem csapódik a tőkéhez, kiveszik', category: 'cat-simple' },
      { id: 'cis-2-4', label: 'Minden évben kizárólag a kezdőtőke kamatozik', category: 'cat-simple' },
      { id: 'cis-2-5', label: 'Tₙ = 500 000 · 1,08ⁿ képlettel leírt bankbetét', category: 'cat-compound' },
      { id: 'cis-2-6', label: 'A jóváírt kamat a következő évben már maga is kamatozik', category: 'cat-compound' },
      { id: 'cis-2-7', label: 'Nyugdíjcélú megtakarítás 25 éves felhalmozása', category: 'cat-compound' },
      { id: 'cis-2-8', label: 'Hitelkártya tartozás görgetése kamat-tőkésítéssel', category: 'cat-compound' },
      { id: 'cis-2-9', label: 'Gyári gépsor könyvelési leírása évi 12%-kal', category: 'cat-depreciation' },
      { id: 'cis-2-10', label: 'Tₙ = 4 000 000 · 0,85ⁿ értékű használt jármű', category: 'cat-depreciation' },
      { id: 'cis-2-11', label: 'Készpénz reálértékének csökkenése infláció mellett', category: 'cat-depreciation' },
      { id: 'cis-2-12', label: 'Okostelefon piaci ára a megjelenése után évről évre', category: 'cat-depreciation' }
    ]
  },
  3: {
    title: '3. Szint: Képlet Tagjainak Szerepe (Nehéz)',
    subtitle: 'Melyik paramétert képviseli a kiemelt pénzügyi adat a Tₙ = T₀ · qⁿ modellben?',
    categories: [
      {
        id: 'cat-param-t0',
        name: 'Kezdőtőke (T₀)',
        description: 'Az induló, induláskor befizetett vagy felvett alapösszeg',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-param-q',
        name: 'Kamattényező (q)',
        description: 'Az évenkénti szorzó: q = 1 + p/100 vagy q = 1 - p/100',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-param-n',
        name: 'Futamidő / Kitevő (n)',
        description: 'A kamatperiódusok (évek, félévek) száma a hatványkitevőben',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'cis-3-1', label: 'Az 500 000 Ft a Tₙ = 500 000 · 1,06³ képletben', category: 'cat-param-t0' },
      { id: 'cis-3-2', label: 'A hitelszerződésben felvett tőketartozás induló értéke', category: 'cat-param-t0' },
      { id: 'cis-3-3', label: 'Az új autó szalonból kiguruló ára a vásárlás napján', category: 'cat-param-t0' },
      { id: 'cis-3-4', label: 'A babakötvénybe a születéskor befizetett induló összeg', category: 'cat-param-t0' },
      { id: 'cis-3-5', label: 'Az 1,07-es szorzó 7%-os éves kamatláb esetén', category: 'cat-param-q' },
      { id: 'cis-3-6', label: 'A 0,88-as szorzó évi 12%-os értékvesztésnél', category: 'cat-param-q' },
      { id: 'cis-3-7', label: 'A félévente tőkésített 10% féléves szorzója (1,05)', category: 'cat-param-q' },
      { id: 'cis-3-8', label: 'A növekedési vagy csökkenési ráta alapja', category: 'cat-param-q' },
      { id: 'cis-3-9', label: 'A 10-es szám a T₁₀ = 1M · 1,08¹⁰ hatványkitevőjében', category: 'cat-param-n' },
      { id: 'cis-3-10', label: 'Féléves tőkésítésnél az eltelt félévek száma (2n)', category: 'cat-param-n' },
      { id: 'cis-3-11', label: 'A lakáshitel szerződéses 20 éves futamideje', category: 'cat-param-n' },
      { id: 'cis-3-12', label: 'A 72-es szabállyal becsült duplázódási idő években', category: 'cat-param-n' }
    ]
  }
};

export const CompoundInterestSorter: React.FC<CompoundInterestSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-kamatos-kamat-sorter',
  topicTitle = 'Kamatos kamat'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`ci-sorter-${activeLevel}`}
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      categories={config.categories}
      items={config.items}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
    />
  );
};

export default CompoundInterestSorter;
