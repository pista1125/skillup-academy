import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { ConstructionsMatcher } from './ConstructionsMatcher';
import { ConstructionsSorter } from './ConstructionsSorter';

interface ConstructionsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

const constructionsQuestions: Question[] = [
  // --- 1. SZINT: ALAP / KÖNNYŰ (1-10) ---
  {
    id: 'con-1',
    level: 1,
    question: 'Melyik két ideális eszközt engedi meg a klasszikus euklideszi szerkesztés?',
    options: [
      'Körzőt és beosztás nélküli egyenes vonalzót',
      'Szögmérőt és derékszögű vonalzót',
      'Centiméter-beosztásos vonalzót és sablont',
      'Számítógépes egeret és nyomtatót'
    ],
    correctAnswer: 0,
    explanation: 'Az ókori görög euklideszi geometria alapszabálya szerint kizárólag körző és egyélű, jelölés nélküli egyenes vonalzó használható.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <rect x="20" y="30" width="120" height="14" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
        <line x1="40" y1="30" x2="40" y2="44" stroke="#94a3b8" strokeWidth="1" />
        <line x1="60" y1="30" x2="60" y2="44" stroke="#94a3b8" strokeWidth="1" />
        <line x1="80" y1="30" x2="80" y2="44" stroke="#94a3b8" strokeWidth="1" />
        <line x1="100" y1="30" x2="100" y2="44" stroke="#94a3b8" strokeWidth="1" />
        <line x1="120" y1="30" x2="120" y2="44" stroke="#94a3b8" strokeWidth="1" />
        {/* Compass icon representation */}
        <line x1="80" y1="55" x2="60" y2="90" stroke="#0d9488" strokeWidth="2.5" />
        <line x1="80" y1="55" x2="100" y2="90" stroke="#0d9488" strokeWidth="2.5" />
        <circle cx="80" cy="55" r="4" fill="#0d9488" />
        <text x="80" y="24" textAnchor="middle" className="text-[10px] font-bold fill-teal-800">Euklideszi eszközök</text>
      </svg>
    )
  },
  {
    id: 'con-2',
    level: 1,
    question: 'Mi a szakaszfelező merőleges pontjainak alapvető mértani hely tulajdonsága?',
    options: [
      'Egyenlő távolságra vannak a szakasz két végpontjától (|PA| = |PB|)',
      'Kétszer olyan messze vannak az A-tól, mint a B-től',
      'Pontosan 90°-os szöget zárnak be a sík x-tengelyével',
      'Mindig átmennek a kör középpontján'
    ],
    correctAnswer: 0,
    explanation: 'A szakaszfelező merőleges minden P pontjára igaz, hogy a szakasz két végpontjától mért távolsága egyenlő: |PA| = |PB|.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="70" x2="130" y2="70" stroke="#0f766e" strokeWidth="2" />
        <circle cx="30" cy="70" r="3" fill="#0f766e" />
        <circle cx="130" cy="70" r="3" fill="#0f766e" />
        <text x="22" y="74" className="text-[9px] font-bold fill-teal-900">A</text>
        <text x="134" y="74" className="text-[9px] font-bold fill-teal-900">B</text>
        <line x1="80" y1="15" x2="80" y2="90" stroke="#e11d48" strokeWidth="2" />
        <circle cx="80" cy="30" r="3" fill="#e11d48" />
        <text x="85" y="32" className="text-[9px] font-bold fill-rose-600">P</text>
        <line x1="30" y1="70" x2="80" y2="30" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
        <line x1="130" y1="70" x2="80" y2="30" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="80" y="10" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">|PA| = |PB|</text>
      </svg>
    )
  },
  {
    id: 'con-3',
    level: 1,
    question: 'Mekkora sugarat kell körzőnyílásba venni egy szakasz felezőmerőlegesének szerkesztésekor?',
    options: [
      'A szakasz hosszának felénél szemmel láthatóan nagyobbat (r > |AB| / 2)',
      'Pontosan a szakasz felét',
      'A szakasz felénél kisebbet',
      'Tetszőleges 1 cm-es nyílást'
    ],
    correctAnswer: 0,
    explanation: 'Ha a körzőnyílás nem nagyobb a szakasz felénél, a két végpontból húzott körívek nem fogják metszeni egymást!',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="50" x2="130" y2="50" stroke="#0f766e" strokeWidth="2" />
        <circle cx="30" cy="50" r="2.5" fill="#0f766e" />
        <circle cx="130" cy="50" r="2.5" fill="#0f766e" />
        <path d="M 80 20 A 60 60 0 0 1 80 80" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M 80 20 A 60 60 0 0 0 80 80" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="80" cy="30" r="2.5" fill="#e11d48" />
        <circle cx="80" cy="70" r="2.5" fill="#e11d48" />
        <text x="80" y="14" textAnchor="middle" className="text-[10px] font-bold fill-teal-700">r &gt; |AB| / 2</text>
      </svg>
    )
  },
  {
    id: 'con-4',
    level: 1,
    question: 'Hogyan állítható elő egy pontosan 60°-os szög körzővel és vonalzóval?',
    options: [
      'Egy szabályos háromszög megszerkesztésével (azonos sugarú ívek)',
      'Egy 90°-os szög lemérésével és kivonásával',
      'Két derékszög összeadásával',
      'A vonalzó skálájának 60 mm-es jelölésével'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos háromszög minden szöge 60°. Ha a szakasz mindkét végpontjából a szakaszhosszal körívezünk, 60°-os szög keletkezik.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="35" y1="80" x2="125" y2="80" stroke="#0f766e" strokeWidth="2" />
        <line x1="35" y1="80" x2="80" y2="20" stroke="#0f766e" strokeWidth="2" />
        <line x1="125" y1="80" x2="80" y2="20" stroke="#0f766e" strokeWidth="2" strokeDasharray="2 2" />
        <path d="M 60 80 A 25 25 0 0 0 52 57" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="66" y="70" className="text-[11px] font-black fill-amber-700">60°</text>
        <circle cx="35" cy="80" r="3" fill="#0f766e" />
        <circle cx="125" cy="80" r="3" fill="#0f766e" />
        <circle cx="80" cy="20" r="3" fill="#0f766e" />
      </svg>
    )
  },
  {
    id: 'con-5',
    level: 1,
    question: 'Hogyan szerkeszthető meg egy 90°-os szög szögmérő nélkül?',
    options: [
      'Egyenesre merőleges állításával (az egyenesszög, 180° felezésével)',
      'A vonalzó műanyag sarkának körberajzolásával',
      'Három darab 30°-os szög találomra történő egymás mellé tételével',
      'Egy körlap 4 egyenlő részre hajtogatásával'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenesszög 180°-os. Ha egyenesre egy adott pontban merőlegest állítunk, a 180° két 90°-os derékszögre oszlik.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="20" y1="75" x2="140" y2="75" stroke="#64748b" strokeWidth="2" />
        <line x1="80" y1="15" x2="80" y2="85" stroke="#e11d48" strokeWidth="2" />
        <path d="M 80 60 A 15 15 0 0 1 95 75" fill="none" stroke="#e11d48" strokeWidth="1.3" />
        <circle cx="86" cy="69" r="1.6" fill="#e11d48" />
        <text x="100" y="55" className="text-[11px] font-bold fill-rose-600">90°</text>
      </svg>
    )
  },
  {
    id: 'con-6',
    level: 1,
    question: 'Mit csinál egy szög szögfelezője?',
    options: [
      'Két egyenlő nagyságú részre osztja a szögtartományt',
      'Merőlegest állít a szög egyik szárára',
      'Meghosszabbítja a szög szárait a végtelenbe',
      'Levágja a szög csúcsát'
    ],
    correctAnswer: 0,
    explanation: 'A szögfelező a szög csúcsából kiinduló félegyenes, amely a szöget két egyenlő szögre osztja: α/2 és α/2.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="80" x2="135" y2="80" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="80" x2="110" y2="15" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="80" x2="130" y2="44" stroke="#e11d48" strokeWidth="2" />
        <circle cx="30" cy="80" r="3" fill="#0f766e" />
        <text x="134" y="44" className="text-[10px] font-bold fill-rose-600">f_α</text>
        <text x="75" y="74" className="text-[9px] font-bold fill-teal-800">α/2</text>
        <text x="65" y="60" className="text-[9px] font-bold fill-teal-800">α/2</text>
      </svg>
    )
  },
  {
    id: 'con-7',
    level: 1,
    question: 'Megszerkeszthető-e olyan háromszög, amelynek oldalai 4 cm, 6 cm és 12 cm?',
    options: [
      'Nem, mert a háromszög-egyenlőtlenség szerint 4 + 6 = 10 < 12',
      'Igen, mert három pozitív szám van megadva',
      'Igen, de csak akkor, ha derékszögű',
      'Csak tompaszögűként szerkeszthető meg'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög-egyenlőtlenség értelmében bármely két oldal összege nagyobb kell legyen a harmadiknál. Mivel 4 + 6 = 10 < 12, a két körív el sem éri egymást, nem létezik ilyen háromszög!',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="20" y1="70" x2="140" y2="70" stroke="#0f766e" strokeWidth="2.5" />
        <text x="80" y="85" textAnchor="middle" className="text-[9px] font-bold fill-teal-800">c = 12 cm</text>
        <path d="M 50 45 A 35 35 0 0 1 50 85" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M 100 40 A 50 50 0 0 0 100 85" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="80" y="55" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">Nem metszik egymást!</text>
      </svg>
    )
  },
  {
    id: 'con-8',
    level: 1,
    question: 'Melyik egybevágósági alapesetet jelenti a rövidítés: o-sz-o?',
    options: [
      'Két oldal és a közbezárt szög',
      'Három oldal egyenlősége',
      'Két szög és egy tetszőleges oldal',
      'Két oldal és a kisebbikkel szemközti szög'
    ],
    correctAnswer: 0,
    explanation: 'Az o-sz-o (Oldal-Szög-Oldal) alapesetben adott két oldal és a közöttük lévő közbezárt szög.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="80" x2="130" y2="80" stroke="#0f766e" strokeWidth="2.5" />
        <line x1="30" y1="80" x2="70" y2="25" stroke="#4f46e5" strokeWidth="2.5" />
        <line x1="70" y1="25" x2="130" y2="80" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M 55 80 A 25 25 0 0 0 45 60" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="56" y="70" className="text-[10px] font-bold fill-amber-700">α</text>
        <text x="40" y="45" className="text-[10px] font-bold fill-indigo-700">b</text>
        <text x="80" y="94" textAnchor="middle" className="text-[10px] font-bold fill-teal-800">c</text>
      </svg>
    )
  },
  {
    id: 'con-9',
    level: 1,
    question: 'Hogyan kapunk 30°-os szöget szögmérő nélkül?',
    options: [
      'A 60°-os szög szögfelezőjének megszerkesztésével',
      'A 90°-os szög 3 egyenlő részre hajtogatásával',
      'Egy tetszőleges hegyesszög felével',
      'Két 15°-os szög vonalzóval való összeadásával'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos háromszögből kapott 60°-os szöget elfelezve pontosan 30°-os szöget kapunk: 60° / 2 = 30°.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="80" x2="130" y2="80" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="80" x2="90" y2="20" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="80" x2="125" y2="45" stroke="#e11d48" strokeWidth="2" />
        <text x="95" y="72" className="text-[11px] font-bold fill-rose-600">30°</text>
        <text x="75" y="48" className="text-[10px] font-bold fill-slate-400">60°/2</text>
      </svg>
    )
  },
  {
    id: 'con-10',
    level: 1,
    question: 'Hogyan kapunk 45°-os szöget szögmérő nélkül?',
    options: [
      'A 90°-os derékszög szögfelezőjének megszerkesztésével',
      'A 60°-os szögből 15° levonásával',
      'A vonalzó 45 mm-es jelöléséből',
      'Egy tetszőleges szög harmadolásával'
    ],
    correctAnswer: 0,
    explanation: 'A merőleges egyenesekkel előállított 90°-os szöget elfelezve pontosan 45°-os szöget kapunk: 90° / 2 = 45°.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="80" x2="130" y2="80" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="80" x2="30" y2="15" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="80" x2="95" y2="15" stroke="#e11d48" strokeWidth="2" />
        <path d="M 50 80 A 20 20 0 0 0 44 65" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="65" y="65" className="text-[11px] font-bold fill-rose-600">45°</text>
        <circle cx="30" cy="80" r="3" fill="#0f766e" />
      </svg>
    )
  },

  // --- 2. SZINT: KÖZEPES (11-20) ---
  {
    id: 'con-11',
    level: 2,
    question: 'Hogyan állítunk merőlegest egy egyenes adott P pontjában (P ∈ e)?',
    options: [
      'P-ből két egyenlő távolságú pontot (A, B) mérünk az egyenesre, majd megszerkesztjük az AB felezőmerőlegesét',
      'A vonalzó derékszögű sarkát P-hez illesztjük',
      'P-ből tetszőleges irányba egyenest húzunk és lemérjük a 90°-ot',
      'Csak akkor lehetséges, ha P az egyenes legvégén van'
    ],
    correctAnswer: 0,
    explanation: 'A P pontból körívezve kapunk egy AB szakaszt, amelynek P épp a felezőpontja. Ennek felezőmerőlegese garantáltan átmegy P-n és merőleges az egyenesre.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="20" y1="65" x2="140" y2="65" stroke="#64748b" strokeWidth="1.8" />
        <circle cx="80" cy="65" r="3" fill="#0f766e" />
        <circle cx="50" cy="65" r="2.5" fill="#0284c7" />
        <circle cx="110" cy="65" r="2.5" fill="#0284c7" />
        <line x1="80" y1="15" x2="80" y2="85" stroke="#e11d48" strokeWidth="2" />
        <text x="80" y="78" textAnchor="middle" className="text-[9px] font-bold fill-teal-900">P</text>
        <text x="50" y="78" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">A</text>
        <text x="110" y="78" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">B</text>
      </svg>
    )
  },
  {
    id: 'con-12',
    level: 2,
    question: 'Hogyan bocsátunk merőlegest egy külső P pontból egy egyenesre (P ∉ e)?',
    options: [
      'P-ből olyan körívet húzunk, amely két pontban (A, B) metszi az egyenest, majd megszerkesztjük az AB felezőmerőlegesét',
      'P-t összekötjük az egyenes legközelebbi végével',
      'A vonalzót szemmértékkel merőlegesre állítjuk',
      'P körül 90°-kal elforgatjuk a füzetet'
    ],
    correctAnswer: 0,
    explanation: 'A külső P pontból elegendően nagy sugárral körívezünk, ami 2 pontban (A, B) metszi az egyenest. Mivel |PA| = |PB|, P rajta van az AB felezőmerőlegesén.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="20" y1="65" x2="140" y2="65" stroke="#64748b" strokeWidth="1.8" />
        <circle cx="80" cy="25" r="3" fill="#0f766e" />
        <text x="85" y="27" className="text-[9px] font-bold fill-teal-900">P</text>
        <path d="M 45 65 A 50 50 0 0 0 115 65" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="45" cy="65" r="2.5" fill="#0284c7" />
        <circle cx="115" cy="65" r="2.5" fill="#0284c7" />
        <line x1="80" y1="15" x2="80" y2="85" stroke="#e11d48" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'con-13',
    level: 2,
    question: 'Hogyan szerkeszthető meg egy 120°-os szög?',
    options: [
      'Két 60°-os szög egymás mellé szerkesztésével (60° + 60°)',
      'Egy derékszögből 30° levonásával',
      'A vonalzó 12 cm-es szakaszának meghúzásával',
      'Három 45°-os szög összeadásával'
    ],
    correctAnswer: 0,
    explanation: 'Ha egy félegyenes kezdőpontjából körívezünk, majd az ívre kétszer egymás után felmérjük a sugár hosszát (két 60°-os lépés), 120°-os tompaszöget kapunk.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="75" x2="130" y2="75" stroke="#0f766e" strokeWidth="2" />
        <line x1="80" y1="75" x2="35" y2="25" stroke="#e11d48" strokeWidth="2" />
        <path d="M 110 75 A 30 30 0 0 0 58 50" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="75" y="48" className="text-[11px] font-bold fill-rose-600">120°</text>
        <circle cx="80" cy="75" r="3" fill="#0f766e" />
      </svg>
    )
  },
  {
    id: 'con-14',
    level: 2,
    question: 'Egy háromszög két oldala a = 7 cm, b = 10 cm. Milyen határok közé kell esnie a c harmadik oldal hosszának, hogy a háromszög megszerkeszthető legyen?',
    options: [
      '3 cm < c < 17 cm',
      'c > 17 cm',
      'c < 3 cm',
      'Pontosan c = 17 cm'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög-egyenlőtlenség szerint a harmadik oldalnak nagyobbnak kell lennie a két oldal különbségénél (10 - 7 = 3 cm), és kisebbnek az összegüknél (10 + 7 = 17 cm): 3 < c < 17.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <rect x="25" y="30" width="110" height="40" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="80" y="48" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">|a - b| &lt; c &lt; a + b</text>
        <text x="80" y="62" textAnchor="middle" className="text-[11px] font-black fill-emerald-700">3 cm &lt; c &lt; 17 cm</text>
      </svg>
    )
  },
  {
    id: 'con-15',
    level: 2,
    question: 'Hogyan szerkeszthető párhuzamos egyenes egy külső P ponton át?',
    options: [
      'Egy metsző egyenessel alkotott váltószög vagy egyállású szög átmásolásával',
      'A vonalzó két szélének párhuzamosra állításával',
      'P-ből körívezünk, és ahol a kör véget ér, ott húzzuk az egyenest',
      'A vonalzón lemérjük a legkisebb távolságot 3 pontban'
    ],
    correctAnswer: 0,
    explanation: 'A P pontot összekötjük az egyenes egy tetszőleges Q pontjával, majd a PQ egyenessel bezárt szöget átmásoljuk P-be váltószögként.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="20" y1="75" x2="140" y2="75" stroke="#0f766e" strokeWidth="2" />
        <line x1="20" y1="35" x2="140" y2="35" stroke="#4f46e5" strokeWidth="2" />
        <line x1="45" y1="85" x2="105" y2="25" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="95" cy="35" r="3" fill="#4f46e5" />
        <text x="100" y="30" className="text-[9px] font-bold fill-indigo-700">P</text>
        <text x="142" y="38" className="text-[9px] font-bold fill-indigo-700">p ∥ e</text>
      </svg>
    )
  },
  {
    id: 'con-16',
    level: 2,
    question: 'Mit jelent a szögfelező pontjainak mértani hely tulajdonsága?',
    options: [
      'Egyenlő távolságra vannak a szög két szárától',
      'Egyenlő távolságra vannak a szög csúcsától',
      'Pontosan 90°-os szöget zárnak be a szárakkal',
      'Párhuzamosak a szög szárait összekötő húrral'
    ],
    correctAnswer: 0,
    explanation: 'A szögfelező bármely pontjából merőlegest bocsátva a két szögszárra, a merőleges szakaszok hossza pontosan megegyezik: d(P, a) = d(P, b).',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="25" y1="75" x2="135" y2="75" stroke="#0f766e" strokeWidth="2" />
        <line x1="25" y1="75" x2="105" y2="20" stroke="#0f766e" strokeWidth="2" />
        <line x1="25" y1="75" x2="125" y2="42" stroke="#e11d48" strokeWidth="2" />
        <circle cx="85" cy="55" r="3" fill="#e11d48" />
        <text x="88" y="52" className="text-[9px] font-bold fill-rose-600">P</text>
        <line x1="85" y1="55" x2="85" y2="75" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
        <text x="80" y="94" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">d(P,a) = d(P,b)</text>
      </svg>
    )
  },
  {
    id: 'con-17',
    level: 2,
    question: 'Egy háromszög megszerkeszthető-e a sz-o-sz alapeset szerint, ha c = 8 cm, α = 110°, β = 80°?',
    options: [
      'Nem, mert α + β = 110° + 80° = 190° > 180°, így a szárak nem metszenek!',
      'Igen, mert adott egy oldal és két szög',
      'Igen, és a harmadik szög negatív lesz',
      'Csak akkor, ha a c oldalt meghosszabbítjuk'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög belső szögeinek összege 180°. Ha már két szög összege 190° (meghaladja a 180°-ot), a szögszárak távolodnak egymástól, sosem metszik egymást!',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="75" x2="130" y2="75" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="75" x2="10" y2="20" stroke="#e11d48" strokeWidth="1.8" />
        <line x1="130" y1="75" x2="150" y2="20" stroke="#e11d48" strokeWidth="1.8" />
        <text x="80" y="45" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">α + β = 190° &gt; 180°</text>
        <text x="80" y="60" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">Nem metszenek!</text>
      </svg>
    )
  },
  {
    id: 'con-18',
    level: 2,
    question: 'Hogyan állítható elő egy 75°-os szög szögmérő nélkül?',
    options: [
      'Egy 60°-os és egy 15°-os szög összeadásával (vagy 45° + 30°)',
      'Egy 90°-os szögből 20° levonásával',
      'Két 45°-os szög összeadásával',
      'A 180°-os egyenesszög 3 egyenlő részre osztásával'
    ],
    correctAnswer: 0,
    explanation: 'A 75° előállítható 45° + 30° összegeként, vagy a 60° és 90° közötti 30°-os különbség elfelezésével: 60° + 15° = 75°.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="75" x2="130" y2="75" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="75" x2="70" y2="15" stroke="#e11d48" strokeWidth="2" />
        <path d="M 60 75 A 30 30 0 0 0 45 42" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="65" y="55" className="text-[11px] font-black fill-amber-700">75°</text>
        <text x="100" y="35" className="text-[9px] font-bold fill-slate-500">45° + 30°</text>
      </svg>
    )
  },
  {
    id: 'con-19',
    level: 2,
    question: 'Hogyan lehet megtalálni egy kör hiányzó O középpontját körzővel és vonalzóval?',
    options: [
      'Két különböző húr felezőmerőlegesének metszéspontjaként',
      'A kör legszélesebb pontjának szemmértékes kijelölésével',
      'A vonalzóval átlókat húzunk tetszőleges irányban',
      'Két érintő egyenes összehúzásával'
    ],
    correctAnswer: 0,
    explanation: 'Minden húr felezőmerőlegese átmegy a kör középpontján. Két nem párhuzamos húr felezőmerőlegese egyetlen pontban metszi egymást: ez a kör O középpontja!',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="35" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="50" y1="30" x2="110" y2="30" stroke="#0f766e" strokeWidth="1.5" />
        <line x1="50" y1="70" x2="105" y2="75" stroke="#0f766e" strokeWidth="1.5" />
        <line x1="80" y1="15" x2="80" y2="85" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="77" y1="88" x2="83" y2="12" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="2 2" />
        <circle cx="80" cy="50" r="3.5" fill="#e11d48" />
        <text x="85" y="53" className="text-[10px] font-bold fill-rose-600">O</text>
      </svg>
    )
  },
  {
    id: 'con-20',
    level: 2,
    question: 'A szögmásolás során melyik méretet vesszük körzőnyílásba a szárak kimetszése után?',
    options: [
      'A két szár közötti húrhosszt (a két metszéspont távolságát)',
      'A szög szárainak teljes hosszát a papír széléig',
      'A szög csúcsának távolságát a vonalzótól',
      'Mindig pontosan 5 centimétert'
    ],
    correctAnswer: 0,
    explanation: 'Az azonos sugarú ívek elmetszése után a két száron lévő metszéspont közötti távolságot (a húrt) kell körzőbe venni, és felmérni az új ívre.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="25" y1="75" x2="135" y2="75" stroke="#0f766e" strokeWidth="1.8" />
        <line x1="25" y1="75" x2="95" y2="25" stroke="#0f766e" strokeWidth="1.8" />
        <path d="M 65 75 A 40 40 0 0 0 52 46" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="65" cy="75" r="2.5" fill="#f59e0b" />
        <circle cx="52" cy="46" r="2.5" fill="#f59e0b" />
        <line x1="65" y1="75" x2="52" y2="46" stroke="#e11d48" strokeWidth="2" />
        <text x="68" y="58" className="text-[9px] font-bold fill-rose-600">húrhossz</text>
      </svg>
    )
  },

  // --- 3. SZINT: HALADÓ / NEHÉZ (21-30) ---
  {
    id: 'con-21',
    level: 3,
    question: 'Két oldal és egy szög (o-o-sz) esetén mikor van pontosan 1 egyértelmű megoldás a háromszögre?',
    options: [
      'Ha a megadott szög a két megadott oldal közül a nagyobbikkal szemben van (a ≥ b és α adott)',
      'Ha a szög a kisebbik oldallal szemben van',
      'Csak akkor, ha a szög pontosan 90°',
      'Minden esetben mindig 2 megoldás van'
    ],
    correctAnswer: 0,
    explanation: 'Ha az adott szög a nagyobbikkal szemközti (a ≥ b), a körív pontosan egyetlen pozitív pontban metszi a szögszárat, így a háromszög egyértelmű (1 megoldás).',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="80" x2="140" y2="80" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="80" x2="70" y2="30" stroke="#4f46e5" strokeWidth="2" />
        <circle cx="70" cy="30" r="3" fill="#4f46e5" />
        <text x="65" y="24" className="text-[9px] font-bold fill-indigo-700">C</text>
        <path d="M 115 65 A 55 55 0 0 1 125 90" fill="none" stroke="#e11d48" strokeWidth="1.8" />
        <circle cx="120" cy="80" r="3" fill="#e11d48" />
        <text x="122" y="92" className="text-[9px] font-bold fill-rose-600">B (1 pont)</text>
      </svg>
    )
  },
  {
    id: 'con-22',
    level: 3,
    question: 'Hogyan szerkeszthető meg egy 15°-os szög a legegyszerűbben?',
    options: [
      'A 60°-os szög kétszeri egymás utáni felezésével (60° → 30° → 15°)',
      'A 45°-os szög 3 egyenlő részre osztásával',
      'A 90°-os szög hattagú felosztásával',
      'Csak szögmérővel szerkeszthető meg'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos háromszög 60°-os szögét felezve 30°-ot kapunk, majd a 30°-os szöget még egyszer elfelezve pontosan 15°-os szöget kapunk: 60° / 4 = 15°.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="25" y1="80" x2="135" y2="80" stroke="#0f766e" strokeWidth="2" />
        <line x1="25" y1="80" x2="130" y2="52" stroke="#e11d48" strokeWidth="2" />
        <path d="M 65 80 A 40 40 0 0 0 63 69" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="75" y="74" className="text-[11px] font-bold fill-rose-600">15°</text>
        <text x="100" y="40" className="text-[9px] font-bold fill-slate-500">60° → 30° → 15°</text>
      </svg>
    )
  },
  {
    id: 'con-23',
    level: 3,
    question: 'Hogyan szerkeszthető meg egy háromszög köré írt körének középpontja?',
    options: [
      'A háromszög oldalfelező merőlegeseinek metszéspontjaként',
      'A belső szögfelezők metszéspontjaként',
      'A három csúcs összekötésével a szemközti oldalakkal',
      'A három magasságvonal talppontjának átlagaként'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a köré írt kör középpontja mindhárom csúcstól egyenlő távolságra van (|OA| = |OB| = |OC|), az oldalfelező merőlegesek metszéspontjában található.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <polygon points="30,80 130,80 70,25" fill="#f0fdfa" stroke="#0f766e" strokeWidth="2" />
        <line x1="80" y1="80" x2="80" y2="40" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="50" y1="52.5" x2="90" y2="60" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="2 2" />
        <circle cx="80" cy="58" r="3" fill="#e11d48" />
        <text x="85" y="60" className="text-[9px] font-bold fill-rose-600">O</text>
        <circle cx="80" cy="58" r="54" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 2" />
      </svg>
    )
  },
  {
    id: 'con-24',
    level: 3,
    question: 'Hogyan szerkeszthető meg egy háromszög beírt körének középpontja?',
    options: [
      'A belső szögfelezők metszéspontjaként',
      'Az oldalfelező merőlegesek metszéspontjaként',
      'A súlyvonalak metszéspontjaként',
      'A leghosszabb magasságvonal felezőpontjaként'
    ],
    correctAnswer: 0,
    explanation: 'A beírt kör mindhárom oldaltól egyenlő távolságra van, ezért a belső szögfelezők metszéspontja adja a középpontját.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <polygon points="30,80 130,80 70,25" fill="#f0fdf4" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="80" x2="80" y2="58" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="130" y1="80" x2="65" y2="58" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2 2" />
        <circle cx="76" cy="62" r="2.5" fill="#10b981" />
        <circle cx="76" cy="62" r="18" fill="none" stroke="#10b981" strokeWidth="1.2" />
        <text x="76" y="93" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">Szögfelezők metszése</text>
      </svg>
    )
  },
  {
    id: 'con-25',
    level: 3,
    question: 'Hogyan szerkeszthető meg egy háromszög C csúcsból induló m_c magasságvonala?',
    options: [
      'A C csúcsból merőlegest bocsátunk a c oldal egyenesére',
      'A C csúcsot összekötjük az AB oldal F felezőpontjával',
      'A C csúcsban elfelezzük a γ szöget',
      'A vonalzóval egy 90°-os vonalat rajzolunk C-ből'
    ],
    correctAnswer: 0,
    explanation: 'A magasságvonal definíció szerint a csúcsból a szemközti oldal egyenesére bocsátott merőleges szakasz.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <polygon points="30,75 130,75 80,20" fill="none" stroke="#0f766e" strokeWidth="2" />
        <line x1="80" y1="20" x2="80" y2="75" stroke="#e11d48" strokeWidth="2" />
        <path d="M 80 65 A 10 10 0 0 1 90 75" fill="none" stroke="#e11d48" strokeWidth="1.2" />
        <circle cx="84" cy="71" r="1.3" fill="#e11d48" />
        <text x="84" y="50" className="text-[9px] font-bold fill-rose-600">m_c</text>
        <text x="78" y="16" className="text-[9px] font-bold fill-teal-900">C</text>
      </svg>
    )
  },
  {
    id: 'con-26',
    level: 3,
    question: 'Hogyan állítható elő egy 105°-os szög körzővel és vonalzóval?',
    options: [
      'Egy 60°-os és egy 45°-os szög összeadásával (60° + 45° = 105°)',
      'Két 50°-os és egy 5°-os szög összeadásával',
      'Egy 90°-os szögből 15° levonásával',
      'Egy 120°-os és 45°-os szög különbségeként'
    ],
    correctAnswer: 0,
    explanation: 'A 60° (szabályos háromszögből) és a 45° (derékszög felezéséből) mindketten alapszerkesztéssel előállíthatók. Összegük: 60° + 45° = 105°.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <line x1="30" y1="75" x2="130" y2="75" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="75" x2="10" y2="20" stroke="#e11d48" strokeWidth="2" />
        <path d="M 60 75 A 30 30 0 0 0 22 55" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="45" y="55" className="text-[11px] font-bold fill-rose-600">105°</text>
        <text x="90" y="35" className="text-[9px] font-bold fill-slate-500">60° + 45°</text>
      </svg>
    )
  },
  {
    id: 'con-27',
    level: 3,
    question: 'Derékszögű háromszög esetén hol helyezkedik el a köré írt kör középpontja?',
    options: [
      'Pontosan az átfogó felezőpontjában (Thalész-tétel miatt)',
      'A háromszög belső súlypontjában',
      'A derékszögű csúcsban',
      'A háromszögön kívül, a leghosszabb befogó mellett'
    ],
    correctAnswer: 0,
    explanation: 'A Thalész-tétel megfordítása kimondja, hogy bármely derékszögű háromszög köré írt körének átmérője az átfogó, középpontja pedig az átfogó felezőpontja.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <path d="M 25 75 A 55 55 0 0 1 135 75 Z" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="25" y1="75" x2="135" y2="75" stroke="#1e293b" strokeWidth="2" />
        <line x1="25" y1="75" x2="110" y2="30" stroke="#2563eb" strokeWidth="2" />
        <line x1="135" y1="75" x2="110" y2="30" stroke="#2563eb" strokeWidth="2" />
        <circle cx="80" cy="75" r="3" fill="#e11d48" />
        <text x="80" y="88" textAnchor="middle" className="text-[9px] font-bold fill-rose-600">F (középpont)</text>
      </svg>
    )
  },
  {
    id: 'con-28',
    level: 3,
    question: 'Hány fokos szögek oszthatók fel tetszőlegesen három egyenlő részre (harmadolhatók) KIZÁRÓLAG euklideszi körzővel és vonalzóval?',
    options: [
      'Csak speciális szögek (pl. a 90°-ból 30°), általános szög nem harmadolható euklideszi módon',
      'Bármilyen tetszőleges szög pontosan harmadolható',
      'Minden hegyesszög harmadolható, de a tompaszögek nem',
      'Egyetlen szög sem harmadolható'
    ],
    correctAnswer: 0,
    explanation: 'A matematika történetének híres tétele (Wantzel, 1837): a tetszőleges szög harmadolása körzővel és vonalzóval általánosságban lehetetlen (a 3 klasszikus görög probléma egyike)! Csak speciális szögek harmadolhatók, mint a 90° (mert 30° szerkeszthető).',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <rect x="20" y="25" width="120" height="50" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="80" y="44" textAnchor="middle" className="text-[10px] font-black fill-rose-700">Szögharmadolás tétele</text>
        <text x="80" y="60" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">Általánosan LEHETETLEN!</text>
      </svg>
    )
  },
  {
    id: 'con-29',
    level: 3,
    question: 'Egy trapéz megszerkesztéséhez legkevesebb hány független adatra van szükség?',
    options: [
      '4 független adatra (mivel a párhuzamosság 1 feltételt már biztosít)',
      '3 adatra, mint a háromszögnél',
      '5 adatra, mint egy általános négyszögnél',
      'Mindig pontosan 6 adatra'
    ],
    correctAnswer: 0,
    explanation: 'Egy általános négyszög 5 független adattal határozható meg. A trapéznál azonban két szemközti oldal párhuzamos, ami 1 kötöttséget jelent, így 5 - 1 = 4 független adat elegendő a szerkesztéshez.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <polygon points="30,75 130,75 110,35 50,35" fill="#f0fdfa" stroke="#0f766e" strokeWidth="2" />
        <line x1="50" y1="35" x2="110" y2="35" stroke="#0f766e" strokeWidth="2" />
        <text x="80" y="58" textAnchor="middle" className="text-[10px] font-bold fill-teal-800">4 független adat</text>
      </svg>
    )
  },
  {
    id: 'con-30',
    level: 3,
    question: 'Mi a szerkesztési feladat utolsó, elengedhetetlen lépése a matematikai dolgozatokban?',
    options: [
      'A diszkusszió (elemzés, hogy a kapott feltételek mellett hány megoldás létezik)',
      'A ceruza hegyezése és a radírozás',
      'A vonalzóval való visszamérés ellenőrzésképpen',
      'A lap hátoldalának kitöltése'
    ],
    correctAnswer: 0,
    explanation: 'A diszkusszió vizsgálja meg, hogy az adott adatok mellett mikor van 0, 1, 2 vagy végtelen sok megoldás, és hogy a megszerkesztett alakzat valóban kielégíti-e az összes kiinduló feltételt.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <rect x="25" y="25" width="110" height="50" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
        <text x="80" y="44" textAnchor="middle" className="text-[10px] font-black fill-slate-800">4. Lépés: Diszkusszió</text>
        <text x="80" y="60" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">Hány megoldás létezik?</text>
      </svg>
    )
  }
];

const cheatSheets: CheatSheetContent[] = [
  {
    title: 'Euklideszi Szerkesztési Szabályok',
    category: 'Eszközök & Alapelvek',
    content: (
      <div className="space-y-3 text-xs">
        <div>
          <strong className="text-teal-700 dark:text-teal-300 block mb-1">A megengedett eszközök:</strong>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li><strong>Egyenes vonalzó:</strong> Kizárólag két pont összekötésére és egyenes meghosszabbítására szolgál (beosztás nélkül!).</li>
            <li><strong>Körző:</strong> Távolságok felvételére, átvitelére és körívek metszéspontjainak kijelölésére szolgál.</li>
          </ul>
        </div>
        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-slate-900 border border-teal-200">
          <strong className="text-teal-900 dark:text-teal-200 block mb-0.5">A 4 kötelező lépés:</strong>
          1. Vázlat & adatok • 2. Szerkesztés menete • 3. Precíz rajz • 4. Diszkusszió (megoldások száma).
        </div>
      </div>
    )
  },
  {
    title: 'Szakaszfelező és Merőlegesek',
    category: 'Alapszerkesztések',
    content: (
      <div className="space-y-3 text-xs">
        <div>
          <strong className="text-teal-700 dark:text-teal-300 block mb-1">Felezőmerőleges:</strong>
          <p className="text-slate-600 dark:text-slate-300">
            A két végpontból (A és B) azonos <MathText>r &gt; |AB| / 2</MathText> sugárral körívezünk mindkét oldalra. Az <MathText>M₁M₂</MathText> egyenes a felezőmerőleges, metszéspontja az <MathText>F</MathText> felezőpont.
          </p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 text-slate-700 dark:text-slate-300">
          <strong>Mértani hely:</strong> A felezőmerőleges pontjai egyenlő távol vannak a végpontoktól: <MathText>|PA| = |PB|</MathText>.
        </div>
      </div>
    )
  },
  {
    title: 'Szögszerkesztések és Nevezetes Szögek',
    category: 'Szögek',
    content: (
      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-teal-50 dark:bg-slate-900 border border-teal-200">
            <strong>60°:</strong> Szabályos 3-szögből
          </div>
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-slate-900 border border-indigo-200">
            <strong>90°:</strong> 180° felezéséből (merőleges)
          </div>
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-slate-900 border border-emerald-200">
            <strong>30°:</strong> 60° felezéséből
          </div>
          <div className="p-2 rounded-lg bg-cyan-50 dark:bg-slate-900 border border-cyan-200">
            <strong>45°:</strong> 90° felezéséből
          </div>
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200">
            <strong>75°:</strong> 45° + 30° (vagy 60° + 15°)
          </div>
          <div className="p-2 rounded-lg bg-rose-50 dark:bg-slate-900 border border-rose-200">
            <strong>120°:</strong> 60° + 60°
          </div>
        </div>
        <p className="text-[11px] text-slate-500 pt-1">
          A szögfelező pontjai egyenlő távolságra vannak a szögszáraktól: <MathText>d(P, a) = d(P, b)</MathText>.
        </p>
      </div>
    )
  },
  {
    title: 'Háromszögek 4 Egybevágósági Alapesete',
    category: 'Háromszögek',
    content: (
      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
        <div>• <strong>o-o-o:</strong> 3 oldal adott (Feltétel: háromszög-egyenlőtlenség <MathText>a + b &gt; c</MathText>).</div>
        <div>• <strong>o-sz-o:</strong> 2 oldal és a közbezárt szög (Feltétel: <MathText>0° &lt; γ &lt; 180°</MathText>).</div>
        <div>• <strong>sz-o-sz:</strong> 1 oldal és a rajta fekvő 2 szög (Feltétel: <MathText>α + β &lt; 180°</MathText>).</div>
        <div>• <strong>o-o-sz:</strong> 2 oldal és a nagyobbikkal szemközti szög (<MathText>a ≥ b</MathText>, ekkor 1 megoldás).</div>
      </div>
    )
  }
];

export const ConstructionsQuiz: React.FC<ConstructionsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  return (
    <QuizTemplate
      title="13. Szerkesztések Kvíz"
      subtitle="Euklideszi alapszerkesztések, szakaszfelezés, merőlegesek, szögmásolás és háromszögszerkesztések"
      topicId="g7-geom-constructions-quiz"
      topicTitle="13. Szerkesztések"
      topicBadge="📐 7. Osztály • III. Geometriai transzformációk"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🎯 KVÍZ"
      themeColor="teal"
      questions={constructionsQuestions}
      cheatSheets={cheatSheets}
      pdfFilename="7_osztaly_geometriai_szerkesztesek_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <ConstructionsMatcher
          onNextLevel={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ConstructionsSorter
          onNextLevel={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      customActionButtons={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="border-teal-300 text-teal-800 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-xs font-bold"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1.5" /> Párkereső játék
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="border-teal-300 text-teal-800 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-xs font-bold"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" /> Csoportosító játék
            </Button>
          )}
        </div>
      }
    />
  );
};

export default ConstructionsQuiz;
