import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';

interface CircleQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

const circleQuestions: Question[] = [
  // --- 1. SZINT: KÖNNYŰ (1-10) ---
  {
    id: 'cq-1',
    level: 1,
    question: 'Egy kör átmérője d = 18 cm. Mekkora a kör sugara (r)?',
    options: ['9 cm', '36 cm', '18 cm', '4,5 cm'],
    correctAnswer: 0,
    explanation: 'A sugár mindig az átmérő fele: r = d / 2 = 18 cm / 2 = 9 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="38" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
        <line x1="42" y1="50" x2="118" y2="50" stroke="#4f46e5" strokeWidth="2.5" />
        <circle cx="80" cy="50" r="3" fill="#e11d48" />
        <text x="80" y="44" textAnchor="middle" className="text-[11px] font-bold fill-indigo-700">d = 18 cm</text>
        <text x="60" y="66" textAnchor="middle" className="text-[10px] font-bold fill-rose-700">r = ?</text>
      </svg>
    )
  },
  {
    id: 'cq-2',
    level: 1,
    question: 'Mi a neve a kör középpontján átmenő húrnak?',
    options: ['Átmérő', 'Sugár', 'Körív', 'Érintő'],
    correctAnswer: 0,
    explanation: 'A kör középpontján átmenő húr az átmérő (d = 2r), amely egyben a kör leghosszabb húrja.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="36" fill="none" stroke="#e11d48" strokeWidth="2" />
        <line x1="44" y1="50" x2="116" y2="50" stroke="#4f46e5" strokeWidth="3" />
        <circle cx="80" cy="50" r="3.5" fill="#e11d48" />
        <text x="80" y="42" textAnchor="middle" className="text-[11px] font-bold fill-indigo-700">Átmérő (d)</text>
      </svg>
    )
  },
  {
    id: 'cq-3',
    level: 1,
    question: 'Melyik alakzat a körlapnak két sugár és a közbezárt körív által határolt síkrésze?',
    options: ['Körcikk (szektor)', 'Körszelet', 'Körgyűrű', 'Húr'],
    correctAnswer: 0,
    explanation: 'A két sugár és a közbezárt ív által határolt pizzaszelet-alakú síkrész a körcikk (szektor).',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="36" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M 80 50 L 116 50 A 36 36 0 0 0 105 24 Z" fill="#10b981" fillOpacity="0.4" stroke="#059669" strokeWidth="2" />
        <circle cx="80" cy="50" r="3" fill="#e11d48" />
        <text x="100" y="45" className="text-[10px] font-bold fill-emerald-800">Körcikk</text>
      </svg>
    )
  },
  {
    id: 'cq-4',
    level: 1,
    question: 'Mi a neve a körvonal bármely két pontját összekötő belső szakasznak?',
    options: ['Húr', 'Sugár', 'Érintő', 'Körív'],
    correctAnswer: 0,
    explanation: 'A körvonal két tetszőleges pontját összekötő egyenes szakasz neve húr.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="36" fill="none" stroke="#e11d48" strokeWidth="2" />
        <line x1="55" y1="28" x2="114" y2="60" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="55" cy="28" r="3" fill="#f59e0b" />
        <circle cx="114" cy="60" r="3" fill="#f59e0b" />
        <text x="85" y="40" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">Húr (AB)</text>
      </svg>
    )
  },
  {
    id: 'cq-5',
    level: 1,
    question: 'Hány közös pontja van a körvonalnak és egy érintő egyenesnek?',
    options: ['Pontosan 1', 'Pontosan 2', '0 (nincs közös pont)', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'Az érintő egyenes definíció szerint pontosan 1 pontban (érintési pont) találkozik a körrel.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="46" r="32" fill="none" stroke="#e11d48" strokeWidth="2" />
        <line x1="25" y1="78" x2="135" y2="78" stroke="#d97706" strokeWidth="2.5" />
        <circle cx="80" cy="78" r="4" fill="#d97706" />
        <text x="80" y="93" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">E (1 közös pont)</text>
      </svg>
    )
  },
  {
    id: 'cq-6',
    level: 1,
    question: 'Hány szimmetriatengelye van egy körnek a síkban?',
    options: ['Végtelen sok', '360 darab', '2 darab', '1 darab'],
    correctAnswer: 0,
    explanation: 'A körnek végtelen sok szimmetriatengelye van: bármely, a kör O középpontján átmenő egyenes szimmetriatengely.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="35" fill="none" stroke="#e11d48" strokeWidth="2" />
        <line x1="80" y1="10" x2="80" y2="90" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="40" y1="50" x2="120" y2="50" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="52" y1="22" x2="108" y2="78" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="80" cy="50" r="3" fill="#e11d48" />
        <text x="80" y="98" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">∞ tengely</text>
      </svg>
    )
  },
  {
    id: 'cq-7',
    level: 1,
    question: 'Melyik alakzat a körlapnak egy húr és a hozzá tartozó körív által határolt síkrésze?',
    options: ['Körszelet (szegmens)', 'Körcikk', 'Körgyűrű', 'Átló'],
    correctAnswer: 0,
    explanation: 'A húr és az ív által közbezárt levágott darab a körszelet (szegmens). Nem ér be a középpontig!',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="36" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M 55 28 A 36 36 0 0 1 114 60 Z" fill="#0d9488" fillOpacity="0.4" stroke="#0f766e" strokeWidth="2" />
        <text x="85" y="44" className="text-[10px] font-bold fill-teal-800">Körszelet</text>
      </svg>
    )
  },
  {
    id: 'cq-8',
    level: 1,
    question: 'Milyen szögben áll a kör érintő egyenese az érintési pontba mutató sugárral?',
    options: ['Merőleges (90°)', 'Párhuzamos (0°)', '45°-os szögben', '60°-os szögben'],
    correctAnswer: 0,
    explanation: 'Alaptétel: A kör érintője az érintési pontba húzott sugárra mindig szigorúan merőleges (e ⊥ r).',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="45" r="30" fill="none" stroke="#e11d48" strokeWidth="2" />
        <line x1="80" y1="45" x2="80" y2="75" stroke="#e11d48" strokeWidth="2" />
        <line x1="35" y1="75" x2="125" y2="75" stroke="#d97706" strokeWidth="2.5" />
        <rect x="73" y="68" width="7" height="7" fill="none" stroke="#8b5cf6" strokeWidth="1.2" />
        <text x="96" y="65" className="text-[10px] font-bold fill-purple-700">e ⊥ r</text>
      </svg>
    )
  },
  {
    id: 'cq-9',
    level: 1,
    question: 'Hány közös pontja van a körvonalnak és egy szelő egyenesnek?',
    options: ['2 közös pont', '1 közös pont', '0 közös pont', '3 közös pont'],
    correctAnswer: 0,
    explanation: 'A szelő egyenes átmetszi a kört, ezért pontosan 2 pontban metszi a körvonalat (d < r).',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="34" fill="none" stroke="#e11d48" strokeWidth="2" />
        <line x1="25" y1="36" x2="135" y2="36" stroke="#0284c7" strokeWidth="2" />
        <circle cx="53" cy="36" r="3.5" fill="#0284c7" />
        <circle cx="107" cy="36" r="3.5" fill="#0284c7" />
        <text x="80" y="30" textAnchor="middle" className="text-[10px] font-bold fill-sky-700">2 metszéspont</text>
      </svg>
    )
  },
  {
    id: 'cq-10',
    level: 1,
    question: 'Mi a neve két közös középpontú (koncentrikus), de eltérő sugarú kör közötti síkrésznek?',
    options: ['Körgyűrű', 'Körcikk', 'Körszelet', 'Körlemez'],
    correctAnswer: 0,
    explanation: 'Két azonos középpontú, különböző sugarú kör által bezárt fánkszerű síkrész a körgyűrű.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="36" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
        <circle cx="80" cy="50" r="18" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
        <text x="80" y="30" textAnchor="middle" className="text-[10px] font-bold fill-purple-700">Körgyűrű</text>
      </svg>
    )
  },

  // --- 2. SZINT: KÖZEPES (11-20) ---
  {
    id: 'cq-11',
    level: 2,
    question: 'Egy kör sugara r = 6 cm. Az e egyenes távolsága a középponttól d = 4 cm. Milyen egyenes az e?',
    options: ['Szelő egyenes (2 pont)', 'Érintő egyenes (1 pont)', 'Elkerülő egyenes (0 pont)', 'Átmérő'],
    correctAnswer: 0,
    explanation: 'Mivel d = 4 cm < r = 6 cm (d < r), az egyenes közelebb van a középponthoz, mint a sugár, tehát szelő egyenes és 2 pontban metszi a kört.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="36" fill="#ffe4e6" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="30" y1="26" x2="130" y2="26" stroke="#0284c7" strokeWidth="2" />
        <line x1="80" y1="50" x2="80" y2="26" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="80" cy="50" r="2.5" fill="#e11d48" />
        <text x="85" y="42" className="text-[9px] font-bold fill-purple-600">d = 4</text>
        <text x="110" y="60" className="text-[9px] font-bold fill-rose-600">r = 6</text>
      </svg>
    )
  },
  {
    id: 'cq-12',
    level: 2,
    question: 'Egy kör átmérője d_kor = 10 cm. Milyen helyzetű az egyenes a körhöz képest, ha távolsága a középponttól d = 5 cm?',
    options: ['Érintő (1 közös pont)', 'Szelő (2 közös pont)', 'Elkerülő (0 közös pont)', 'Nem dönthető el'],
    correctAnswer: 0,
    explanation: 'A kör sugara r = 10 / 2 = 5 cm. Mivel a távolság d = 5 cm = r, az egyenes pontosan érintő, és 1 közös pontja van a körrel.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="45" r="30" fill="none" stroke="#e11d48" strokeWidth="2" />
        <line x1="25" y1="75" x2="135" y2="75" stroke="#d97706" strokeWidth="2.5" />
        <circle cx="80" cy="75" r="3" fill="#d97706" />
        <text x="80" y="90" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">d = r = 5 cm (Érintő)</text>
      </svg>
    )
  },
  {
    id: 'cq-13',
    level: 2,
    question: 'Egy kör sugara r = 8 cm. Létezhet-e ebben a körben egy 17 cm hosszúságú húr?',
    options: [
      'Nem, mert a leghosszabb húr az átmérő (16 cm)',
      'Igen, a kör bármely húrja lehet 17 cm',
      'Csak akkor, ha átmegy a középponton',
      'Igen, ha a körlap elég nagy'
    ],
    correctAnswer: 0,
    explanation: 'A körben húzható leghosszabb húr az átmérő: d = 2 · 8 = 16 cm. Semelyik húr hossza sem haladhatja meg az átmérőt (h ≤ 2r).',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="35" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="45" y1="50" x2="115" y2="50" stroke="#4f46e5" strokeWidth="2" />
        <text x="80" y="44" textAnchor="middle" className="text-[10px] font-bold fill-indigo-700">max: d = 16 cm</text>
        <text x="80" y="70" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">17 cm &gt; 16 cm ❌</text>
      </svg>
    )
  },
  {
    id: 'cq-14',
    level: 2,
    question: 'Két kör sugara r₁ = 5 cm és r₂ = 3 cm. Mekkora a középpontjaik távolsága (d), ha kívülről érintik egymást?',
    options: ['8 cm', '2 cm', '15 cm', '4 cm'],
    correctAnswer: 0,
    explanation: 'Kívülről érintkező körök esetén a középpontok távolsága a sugarak összege: d = r₁ + r₂ = 5 + 3 = 8 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="55" cy="50" r="25" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="95" cy="50" r="15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
        <circle cx="80" cy="50" r="3" fill="#d97706" />
        <line x1="55" y1="50" x2="95" y2="50" stroke="#059669" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="75" y="70" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700">d = 5 + 3 = 8 cm</text>
      </svg>
    )
  },
  {
    id: 'cq-15',
    level: 2,
    question: 'Két kör sugara r₁ = 9 cm és r₂ = 4 cm. Mekkora a középpontjaik távolsága (d), ha belülről érintik egymást?',
    options: ['5 cm', '13 cm', '4,5 cm', '36 cm'],
    correctAnswer: 0,
    explanation: 'Belülről érintkező körök esetén a középpontok távolsága a sugarak különbsége: d = r₁ - r₂ = 9 - 4 = 5 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="75" cy="50" r="36" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="95" cy="50" r="16" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <circle cx="111" cy="50" r="3" fill="#d97706" />
        <text x="80" y="94" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">d = 9 - 4 = 5 cm</text>
      </svg>
    )
  },
  {
    id: 'cq-16',
    level: 2,
    question: 'Egy körben 60°-os középponti szöghöz tartozó körcikket vágunk ki. A teljes kör területének hányadrésze ez a körcikk?',
    options: ['1/6 része', '1/4 része', '1/3 része', '1/8 része'],
    correctAnswer: 0,
    explanation: 'A teljes kör 360°. A körcikk aránya: 60° / 360° = 1 / 6 része.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="36" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M 80 50 L 116 50 A 36 36 0 0 0 98 19 Z" fill="#10b981" fillOpacity="0.4" stroke="#059669" strokeWidth="2" />
        <text x="80" y="94" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700">60° / 360° = 1/6</text>
      </svg>
    )
  },
  {
    id: 'cq-17',
    level: 2,
    question: 'Két kör sugara r₁ = 6 cm és r₂ = 2 cm, középpontjaik távolsága d = 10 cm. Hány közös pontja van a két körnek?',
    options: ['0 közös pont', '1 közös pont', '2 közös pont', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'Mivel d = 10 cm > r₁ + r₂ = 6 + 2 = 8 cm, a két kör egymáson kívül helyezkedik el, így 0 közös pontjuk van.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="45" cy="50" r="22" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="115" cy="50" r="12" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <line x1="45" y1="50" x2="115" y2="50" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="80" y="44" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">d = 10 &gt; 8</text>
        <text x="80" y="85" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">0 közös pont</text>
      </svg>
    )
  },
  {
    id: 'cq-18',
    level: 2,
    question: 'Két kör sugara r₁ = 8 cm és r₂ = 5 cm, középpontjaik távolsága d = 6 cm. Hány közös pontjuk van?',
    options: ['2 közös pont (metsző körök)', '1 közös pont', '0 közös pont', '3 közös pont'],
    correctAnswer: 0,
    explanation: 'A sugarak különbsége r₁ - r₂ = 3 cm, összege r₁ + r₂ = 13 cm. Mivel 3 < 6 < 13 (|r₁ - r₂| < d < r₁ + r₂), a két kör metszi egymást 2 pontban.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="65" cy="50" r="28" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="95" cy="50" r="20" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <circle cx="83" cy="27" r="3" fill="#10b981" />
        <circle cx="83" cy="73" r="3" fill="#10b981" />
        <text x="80" y="93" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700">2 metszéspont</text>
      </svg>
    )
  },
  {
    id: 'cq-19',
    level: 2,
    question: 'A Thalész-tétel szerint ha egy háromszög egyik oldala a kör átmérője, és a harmadik csúcsa a körvonalon van, mekkora a harmadik csúcsnál lévő szög?',
    options: ['Pontosan 90° (derékszög)', 'Mindig 60°', 'Mindig 45°', 'Attól függ, hol van a pont'],
    correctAnswer: 0,
    explanation: 'Thalész-tétel: A kör átmérőjének két végpontjával a körvonal bármely más pontja derékszöget (90°) zár be.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <path d="M 30 70 A 50 50 0 0 1 130 70 Z" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="30" y1="70" x2="130" y2="70" stroke="#1e293b" strokeWidth="2" />
        <line x1="30" y1="70" x2="105" y2="28" stroke="#2563eb" strokeWidth="2" />
        <line x1="130" y1="70" x2="105" y2="28" stroke="#2563eb" strokeWidth="2" />
        <circle cx="105" cy="28" r="3" fill="#2563eb" />
        <text x="110" y="24" className="text-[10px] font-bold fill-blue-700">90°</text>
      </svg>
    )
  },
  {
    id: 'cq-20',
    level: 2,
    question: 'Egy derékszögű háromszög átfogója c = 12 cm. Mekkora a háromszög köré írt kör sugara (r)?',
    options: ['6 cm', '12 cm', '24 cm', '3 cm'],
    correctAnswer: 0,
    explanation: 'A Thalész-tétel megfordítása szerint a derékszögű háromszög köré írt körének középpontja az átfogó felezőpontja, így sugara az átfogó fele: r = c / 2 = 12 / 2 = 6 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="36" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
        <polygon points="44,50 116,50 92,20" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <circle cx="80" cy="50" r="2.5" fill="#e11d48" />
        <text x="80" y="65" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">c = 12 cm ⟹ r = 6 cm</text>
      </svg>
    )
  },

  // --- 3. SZINT: NEHÉZ (21-30) ---
  {
    id: 'cq-21',
    level: 3,
    question: 'Egy kör sugara r = 10 cm. Egy húr távolsága a kör középpontjától d = 6 cm. Milyen hosszú ez a húr?',
    options: ['16 cm', '8 cm', '12 cm', '14 cm'],
    correctAnswer: 0,
    explanation: 'A középpontból a húrra állított merőleges felezi a húrt. Derékszögű háromszöget kapunk, ahol az átfogó r = 10, az egyik befogó d = 6. A félhúr hossza: √(10² - 6²) = √(100 - 36) = √64 = 8 cm. A teljes húr: 2 · 8 cm = 16 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="38" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="49" y1="27" x2="111" y2="27" stroke="#f59e0b" strokeWidth="2.5" />
        <line x1="80" y1="50" x2="80" y2="27" stroke="#8b5cf6" strokeWidth="1.5" />
        <line x1="80" y1="50" x2="111" y2="27" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="85" y="42" className="text-[9px] font-bold fill-purple-700">d = 6</text>
        <text x="100" y="46" className="text-[9px] font-bold fill-rose-700">r = 10</text>
        <text x="80" y="20" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">Húr = 16 cm</text>
      </svg>
    )
  },
  {
    id: 'cq-22',
    level: 3,
    question: 'Két kör sugara r₁ = 12 cm és r₂ = 5 cm. A középpontjaik távolsága d = 13 cm. Hány közös pontja van a két körnek?',
    options: ['2 közös pont (metsző)', '1 közös pont (érintő)', '0 közös pont', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'r₁ - r₂ = 12 - 5 = 7 cm, r₁ + r₂ = 12 + 5 = 17 cm. Mivel 7 < 13 < 17, a két kör metszi egymást, így 2 közös pontjuk van.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="60" cy="50" r="32" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="100" cy="50" r="18" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <text x="80" y="92" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">7 &lt; d=13 &lt; 17 ⟹ 2 pont</text>
      </svg>
    )
  },
  {
    id: 'cq-23',
    level: 3,
    question: 'Egy kör külső P pontjából a körhöz húzott érintőszakasz hossza PE = 12 cm, a kör sugara r = 5 cm. Milyen messze van a P pont az O középponttól?',
    options: ['13 cm', '17 cm', '7 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'Mivel az érintő merőleges a sugárra (OE ⊥ PE), az OEP derékszögű háromszög. Pithagorasz-tétellel: OP = √(r² + PE²) = √(5² + 12²) = √(25 + 144) = √169 = 13 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="55" cy="50" r="22" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="55" cy="50" r="2" fill="#e11d48" />
        <circle cx="125" cy="50" r="3" fill="#1e293b" />
        <line x1="55" y1="50" x2="68" y2="32" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="125" y1="50" x2="68" y2="32" stroke="#d97706" strokeWidth="2" />
        <line x1="55" y1="50" x2="125" y2="50" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="130" y="54" className="text-[9px] font-bold fill-slate-800">P</text>
        <text x="95" y="32" className="text-[9px] font-bold fill-amber-700">12 cm</text>
        <text x="90" y="62" className="text-[9px] font-bold fill-purple-700">OP = 13 cm</text>
      </svg>
    )
  },
  {
    id: 'cq-24',
    level: 3,
    question: 'Két koncentrikus kör sugara R = 5 cm és r = 3 cm. Mekkora a köztük lévő körgyűrű szélessége?',
    options: ['2 cm', '8 cm', '15 cm', '4 cm'],
    correctAnswer: 0,
    explanation: 'A körgyűrű szélessége a külső és belső sugár különbsége: R - r = 5 cm - 3 cm = 2 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="35" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="80" cy="50" r="21" fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="101" y1="50" x2="115" y2="50" stroke="#e11d48" strokeWidth="2.5" />
        <text x="80" y="92" textAnchor="middle" className="text-[10px] font-bold fill-purple-700">Szélesség = R - r = 2 cm</text>
      </svg>
    )
  },
  {
    id: 'cq-25',
    level: 3,
    question: 'Hány közös érintő egyenese van két olyan körnek, amelyek kívülről érintik egymást?',
    options: ['3 darab (2 külső és 1 belső érintő)', '4 darab', '2 darab', '1 darab'],
    correctAnswer: 0,
    explanation: 'Két kívülről érintkező körnek 2 külső közös érintője van, és az érintési pontban pontosan 1 belső közös érintője, így összesen 3 darab.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="55" cy="50" r="20" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="95" cy="50" r="20" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <line x1="25" y1="30" x2="125" y2="30" stroke="#d97706" strokeWidth="1.2" />
        <line x1="25" y1="70" x2="125" y2="70" stroke="#d97706" strokeWidth="1.2" />
        <line x1="75" y1="15" x2="75" y2="85" stroke="#d97706" strokeWidth="1.5" />
        <text x="80" y="96" textAnchor="middle" className="text-[9px] font-bold fill-amber-700">Összesen: 3 érintő</text>
      </svg>
    )
  },
  {
    id: 'cq-26',
    level: 3,
    question: 'Hány közös érintő egyenese van két metsző körnek?',
    options: ['2 darab (csak 2 külső érintő)', '3 darab', '4 darab', '0 darab'],
    correctAnswer: 0,
    explanation: 'Mivel a két kör metszi egymást, közéjük nem húzható belső érintő, csak a 2 külső közös érintőjük létezik.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="65" cy="50" r="22" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="95" cy="50" r="22" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <line x1="35" y1="28" x2="125" y2="28" stroke="#d97706" strokeWidth="1.5" />
        <line x1="35" y1="72" x2="125" y2="72" stroke="#d97706" strokeWidth="1.5" />
        <text x="80" y="92" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">2 külső érintő</text>
      </svg>
    )
  },
  {
    id: 'cq-27',
    level: 3,
    question: 'Hány közös érintő egyenese van két egymáson kívül lévő (diszjunkt) körnek?',
    options: ['4 darab (2 külső és 2 belső érintő)', '2 darab', '3 darab', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'Két egymáson kívül lévő körnek 2 külső érintője és az őket elválasztó 2 keresztező belső érintője van, tehát összesen 4 darab.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="50" cy="50" r="18" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="110" cy="50" r="18" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <line x1="25" y1="32" x2="135" y2="32" stroke="#d97706" strokeWidth="1" />
        <line x1="25" y1="68" x2="135" y2="68" stroke="#d97706" strokeWidth="1" />
        <line x1="38" y1="20" x2="122" y2="80" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="38" y1="80" x2="122" y2="20" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2" />
        <text x="80" y="95" textAnchor="middle" className="text-[9px] font-bold fill-amber-700">Összesen: 4 érintő</text>
      </svg>
    )
  },
  {
    id: 'cq-28',
    level: 3,
    question: 'Egy körvonalon felveszünk 5 különböző pontot. Legfeljebb hány különböző húr húzható ezek között a pontok között?',
    options: ['10 húr', '5 húr', '20 húr', '15 húr'],
    correctAnswer: 0,
    explanation: 'Minden pontból a többi 4 pontba húzható húr: (5 · 4) / 2 = 20 / 2 = 10 darab húr.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="35" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        {/* 5 points and chords */}
        <polygon points="80,15 113,39 101,78 59,78 47,39" fill="none" stroke="#6366f1" strokeWidth="1.2" />
        <line x1="80" y1="15" x2="101" y2="78" stroke="#f59e0b" strokeWidth="1" />
        <line x1="80" y1="15" x2="59" y2="78" stroke="#f59e0b" strokeWidth="1" />
        <line x1="113" y1="39" x2="59" y2="78" stroke="#f59e0b" strokeWidth="1" />
        <line x1="113" y1="39" x2="47" y2="39" stroke="#f59e0b" strokeWidth="1" />
        <line x1="101" y1="78" x2="47" y2="39" stroke="#f59e0b" strokeWidth="1" />
        <text x="80" y="94" textAnchor="middle" className="text-[10px] font-bold fill-indigo-700">5 · 4 / 2 = 10 húr</text>
      </svg>
    )
  },
  {
    id: 'cq-29',
    level: 3,
    question: 'Két kör sugara r₁ = 8 cm és r₂ = 3 cm. Milyen távolságra van egymástól a két középpont (d), ha a kisebb kör belülről érinti a nagyobbat?',
    options: ['5 cm', '11 cm', '2,67 cm', '24 cm'],
    correctAnswer: 0,
    explanation: 'Belső érintkezés esetén a középpontok távolsága a sugarak különbsége: d = r₁ - r₂ = 8 - 3 = 5 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="70" cy="50" r="35" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="85" cy="50" r="20" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
        <circle cx="105" cy="50" r="3" fill="#d97706" />
        <text x="80" y="94" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">d = 8 - 3 = 5 cm</text>
      </svg>
    )
  },
  {
    id: 'cq-30',
    level: 3,
    question: 'Egy szabályos hatszög köré írt körének sugara r = 6 cm. Mekkora a szabályos hatszög egy oldalának hossza (a)?',
    options: ['6 cm', '12 cm', '3 cm', '6 · √3 cm'],
    correctAnswer: 0,
    explanation: 'A szabályos hatszög a középpontjából 6 darab egybevágó szabályos (egyenlő oldalú) háromszögre bontható, így az oldala pontosan megegyezik a köré írt kör sugarával: a = r = 6 cm.',
    figure: (
      <svg viewBox="0 0 160 100" className="w-36 h-24 mx-auto">
        <circle cx="80" cy="50" r="35" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" />
        <polygon points="115,50 97.5,80.3 62.5,80.3 45,50 62.5,19.7 97.5,19.7" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
        <line x1="80" y1="50" x2="115" y2="50" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="80" y1="50" x2="97.5" y2="80.3" stroke="#0284c7" strokeWidth="1.5" />
        <text x="80" y="95" textAnchor="middle" className="text-[10px] font-bold fill-rose-700">a = r = 6 cm</text>
      </svg>
    )
  }
];

const circleCheatSheets: CheatSheetContent[] = [
  {
    title: '1. A Kör Alapfogalmai és Részei',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-2.5 bg-rose-50 dark:bg-slate-900 rounded-xl border border-rose-200">
          <strong className="text-rose-700 block mb-1">Körvonal és Körlap</strong>
          <div>• <strong>Körvonal:</strong> pontok halmaza, melyek távolsága a középponttól |OP| = r.</div>
          <div>• <strong>Körlap:</strong> pontok halmaza, melyek távolsága legfeljebb r: |OP| ≤ r.</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <strong>Sugár (r):</strong> d / 2
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <strong>Átmérő (d):</strong> 2 · r (leghosszabb húr)
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <strong>Húr:</strong> 2 pontot összekötő szakasz
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <strong>Körív:</strong> 2 pont közötti görbe darab
          </div>
        </div>
        <div className="p-2 bg-emerald-50 dark:bg-slate-900 rounded-lg text-[11px]">
          <strong>Körcikk vs. Körszelet:</strong> Körcikk = 2 sugár + ív (pizzaszelet). Körszelet = húr + ív (csak a levágott szél).
        </div>
      </div>
    )
  },
  {
    title: '2. Egyenes és Kör Kölcsönös Helyzete',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-2 rounded-lg bg-sky-50 dark:bg-slate-900 border border-sky-200">
          <strong>1. Szelő (d &lt; r):</strong> 2 metszéspont a körvonallal; a kimetszett szakasz a húr.
        </div>
        <div className="p-2 rounded-lg bg-amber-50 dark:bg-slate-900 border border-amber-200">
          <strong>2. Érintő (d = r):</strong> Pontosan 1 közös pont (E). <strong>Tétel: e ⊥ r!</strong>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200">
          <strong>3. Elkerülő (d &gt; r):</strong> 0 közös pont, az egyenes a körön kívül halad.
        </div>
      </div>
    )
  },
  {
    title: '3. Két Kör Kölcsönös Helyzete',
    content: (
      <div className="space-y-2 text-xs sm:text-sm">
        <div>• <strong>Koncentrikus (d = 0):</strong> közös középpont (0 közös pont).</div>
        <div>• <strong>Belső kör (d &lt; r₁ - r₂):</strong> egyik a másikban (0 pont).</div>
        <div>• <strong>Belülről érintő (d = r₁ - r₂):</strong> 1 közös pont belül.</div>
        <div>• <strong>Metsző (r₁ - r₂ &lt; d &lt; r₁ + r₂):</strong> 2 közös metszéspont.</div>
        <div>• <strong>Kívülről érintő (d = r₁ + r₂):</strong> 1 közös pont kívül.</div>
        <div>• <strong>Egymáson kívül fekvő (d &gt; r₁ + r₂):</strong> 0 közös pont.</div>
      </div>
    )
  },
  {
    title: '4. Szimmetriák és Thalész-tétel',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-2.5 bg-rose-50 dark:bg-slate-900 rounded-xl border border-rose-200">
          <strong className="text-rose-700 block mb-1">A kör szimmetriái:</strong>
          <div>• Végtelen sok szimmetriatengely (minden átmérőegyenes).</div>
          <div>• Középpontosan szimmetrikus saját O középpontjára.</div>
          <div>• Tetszőleges forgásszögre forgásszimmetrikus.</div>
        </div>
        <div className="p-2.5 bg-indigo-50 dark:bg-slate-900 rounded-xl border border-indigo-200">
          <strong className="text-indigo-700 block mb-1">Thalész-tétel:</strong>
          Ha a kör átmérőjének két végpontját összekötjük a körvonal bármely más pontjával, a keletkező szög mindig <strong>90° (derékszög)</strong>.
        </div>
      </div>
    )
  }
];

export const CircleQuiz: React.FC<CircleQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter
}) => {
  return (
    <QuizTemplate
      title="12. A Kör Kvíz"
      subtitle="Teszteld tudásodat a kör részeiről, az egyenes és a kör, valamint két kör kölcsönös helyzetéről!"
      topicId="g7-geom-circle"
      topicName="12. A Kör"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🎯 KVÍZ"
      themeColor="rose"
      questions={circleQuestions}
      cheatSheets={circleCheatSheets}
      pdfFilename="7_osztaly_a_kor_teszt.pdf"
      onBack={onBack}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-800 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-rose-500" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-800 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-rose-500" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default CircleQuiz;
