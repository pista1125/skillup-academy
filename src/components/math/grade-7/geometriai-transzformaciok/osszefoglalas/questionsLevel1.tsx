import React from 'react';
import { Question } from '../QuizTemplate';

export const summaryQuestionsLevel1: Question[] = [
  {
    id: 'sum-1',
    level: 1,
    question: 'Melyik két ideális geometriai eszközt engedi meg a klasszikus euklideszi szerkesztés?',
    options: [
      'Beosztás nélküli egyenes vonalzót és tetszőleges sugarú körzőt',
      'Szögmérőt és milliméterpapírt',
      'Derékszögű vonalzót és sablont',
      'Centiméteres vonalzót és számológépet'
    ],
    correctAnswer: 0,
    explanation: 'Az euklideszi geometria alapszabálya szerint csak vonalzóval (egyenes húzásra) és körzővel (távolság átvitelére és körívezésre) dolgozhatunk.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <rect x="20" y="55" width="80" height="15" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <line x1="110" y1="20" x2="95" y2="70" stroke="#0284c7" strokeWidth="2" />
        <line x1="110" y1="20" x2="135" y2="70" stroke="#0284c7" strokeWidth="2" />
        <circle cx="110" cy="20" r="3" fill="#0284c7" />
      </svg>
    )
  },
  {
    id: 'sum-2',
    level: 1,
    question: 'Hány fixpontja van a sík tengelyes tükrözésének?',
    options: [
      'Végtelen sok (a tükörtengely összes pontja)',
      'Pontosan 1 darab',
      'Pontosan 2 darab',
      'Egyetlen fixpontja sincs'
    ],
    correctAnswer: 0,
    explanation: 'A tükörtengely minden egyes pontja helyben marad a tükrözés során (P\' = P), így végtelen sok fixpont létezik.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="45" x2="140" y2="45" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="45" cy="45" r="3" fill="#ef4444" />
        <circle cx="80" cy="45" r="3" fill="#ef4444" />
        <circle cx="115" cy="45" r="3" fill="#ef4444" />
        <text x="135" y="38" className="text-[10px] font-bold fill-rose-600">t</text>
      </svg>
    )
  },
  {
    id: 'sum-3',
    level: 1,
    question: 'Hány fixpontja van a sík középpontos tükrözésének?',
    options: [
      'Pontosan 1 darab (maga az O centrum)',
      'Végtelen sok pontja',
      'Pontosan 2 darab',
      'Nincs fixpontja'
    ],
    correctAnswer: 0,
    explanation: 'A középpontos tükrözés során kizárólag a tükrözés centruma (O) marad helyben (O\' = O).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="80" cy="45" r="4" fill="#0d9488" />
        <text x="86" y="48" className="text-[12px] font-black fill-teal-700">O</text>
      </svg>
    )
  },
  {
    id: 'sum-4',
    level: 1,
    question: 'Hogyan változik az alakzatok körüljárási iránya tengelyes tükrözéskor?',
    options: [
      'Megfordul (pl. óramutatóval ellentétesből megegyező lesz)',
      'Változatlanul megmarad',
      'Mindig 90°-kal elfordul',
      'Függ az alakzat méretétől'
    ],
    correctAnswer: 0,
    explanation: 'A tengelyes tükrözés orientációváltó transzformáció: a síkból való 3D kifordítás miatt a körüljárási irány megfordul.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="80" y1="10" x2="80" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M 40 45 A 15 15 0 1 1 50 30" fill="none" stroke="#0284c7" strokeWidth="2" />
        <polyline points="48,25 53,30 46,33" fill="#0284c7" />
        <text x="35" y="65" className="text-[9px] font-bold fill-sky-700">↺</text>
        <path d="M 120 45 A 15 15 0 1 0 110 30" fill="none" stroke="#d97706" strokeWidth="2" />
        <polyline points="112,25 107,30 114,33" fill="#d97706" />
        <text x="115" y="65" className="text-[9px] font-bold fill-amber-700">↻</text>
      </svg>
    )
  },
  {
    id: 'sum-5',
    level: 1,
    question: 'Hogyan változik az alakzatok körüljárási iránya középpontos tükrözéskor?',
    options: [
      'Megmarad (irányítástartó transzformáció)',
      'Mindig megfordul',
      'Csak háromszögeknél fordul meg',
      'Negatív irányúvá válik'
    ],
    correctAnswer: 0,
    explanation: 'A középpontos tükrözés megfelel a síkbeli 180°-os elforgatásnak, ami megtartja a körüljárási irányt.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="80" cy="45" r="3" fill="#0d9488" />
        <text x="77" y="38" className="text-[8px] font-bold fill-teal-700">O</text>
        <text x="35" y="50" className="text-[12px] font-bold fill-teal-700">↺</text>
        <text x="115" y="50" className="text-[12px] font-bold fill-teal-700">↺</text>
      </svg>
    )
  },
  {
    id: 'sum-6',
    level: 1,
    question: 'Milyen helyzetű egymáshoz képest egy tetszőleges egyenes (e) és középpontos tükörképe (e\')?',
    options: [
      'Mindig párhuzamosak (e ∥ e\') vagy egybeesnek',
      'Mindig merőlegesek egymásra',
      'Mindig 45°-os szöget zárnak be',
      'Mindig egyetlen pontban metszik egymást'
    ],
    correctAnswer: 0,
    explanation: 'A középpontos tükrözés alaptulajdonsága, hogy bármely egyenes képe párhuzamos az eredeti egyenessel.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="25" x2="140" y2="25" stroke="#0284c7" strokeWidth="2" />
        <line x1="20" y1="65" x2="140" y2="65" stroke="#0284c7" strokeWidth="2" />
        <circle cx="80" cy="45" r="3" fill="#0d9488" />
        <text x="135" y="20" className="text-[9px] font-bold fill-sky-700">e</text>
        <text x="135" y="60" className="text-[9px] font-bold fill-sky-700">e'</text>
        <text x="75" y="57" className="text-[9px] font-bold fill-slate-700">e ∥ e'</text>
      </svg>
    )
  },
  {
    id: 'sum-7',
    level: 1,
    question: 'Mekkora a csúcsszögek kapcsolata két metsző egyenesnél?',
    options: [
      'Mindig pontosan egyenlők (α = α\')',
      'Összegük mindig 90°',
      'Összegük mindig 180°',
      'Különböző nagyságúak'
    ],
    correctAnswer: 0,
    explanation: 'A két metsző egyenes által alkotott szemközti szögek (csúcsszögek) a metszéspontra vonatkozó középpontos tükrözés miatt mindig egyenlők.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="20" x2="140" y2="70" stroke="#475569" strokeWidth="1.8" />
        <line x1="20" y1="70" x2="140" y2="20" stroke="#475569" strokeWidth="1.8" />
        <path d="M 68 45 A 15 15 0 0 1 68 35" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <path d="M 92 45 A 15 15 0 0 1 92 55" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <text x="50" y="48" className="text-[9px] font-bold fill-rose-600">α</text>
        <text x="100" y="48" className="text-[9px] font-bold fill-rose-600">α</text>
      </svg>
    )
  },
  {
    id: 'sum-8',
    level: 1,
    question: 'Mennyi a mellékszögek összege?',
    options: [
      'Mindig 180°',
      'Mindig 90°',
      'Mindig 360°',
      'Általában 100°'
    ],
    correctAnswer: 0,
    explanation: 'A mellékszögeknek egy közös száruk van, másik két száruk pedig egyenest alkot (egyenesszög), ezért összegük pontosan 180°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="65" x2="140" y2="65" stroke="#475569" strokeWidth="2" />
        <line x1="80" y1="65" x2="110" y2="20" stroke="#475569" strokeWidth="2" />
        <text x="50" y="60" className="text-[10px] font-bold fill-teal-700">α</text>
        <text x="95" y="60" className="text-[10px] font-bold fill-amber-700">β</text>
        <text x="60" y="80" className="text-[9px] font-bold fill-slate-700">α + β = 180°</text>
      </svg>
    )
  },
  {
    id: 'sum-9',
    level: 1,
    question: 'Mennyi a pótszögek összege?',
    options: [
      'Mindig 90°',
      'Mindig 180°',
      'Mindig 270°',
      'Mindig 360°'
    ],
    correctAnswer: 0,
    explanation: 'Két szöget pótszögnek nevezünk, ha összegük pontosan 90° (derékszögre pótolják egymást).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="70" x2="120" y2="70" stroke="#475569" strokeWidth="2" />
        <line x1="30" y1="70" x2="30" y2="15" stroke="#475569" strokeWidth="2" />
        <line x1="30" y1="70" x2="95" y2="25" stroke="#e11d48" strokeWidth="1.8" />
        <text x="45" y="64" className="text-[9px] font-bold fill-teal-700">α</text>
        <text x="36" y="48" className="text-[9px] font-bold fill-amber-700">β</text>
        <text x="65" y="55" className="text-[9px] font-bold fill-rose-600">α + β = 90°</text>
      </svg>
    )
  },
  {
    id: 'sum-10',
    level: 1,
    question: 'Mekkora egy 35°-os szög kiegészítő szöge (amellyel összege 180°)?',
    options: [
      '145° (mivel 180° - 35° = 145°)',
      '55° (mivel 90° - 35° = 55°)',
      '65°',
      '155°'
    ],
    correctAnswer: 0,
    explanation: 'Két szög kiegészítő szög, ha összegük 180°. Így a kiegészítő szög: 180° - 35° = 145°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="65" x2="140" y2="65" stroke="#475569" strokeWidth="2" />
        <line x1="80" y1="65" x2="125" y2="35" stroke="#e11d48" strokeWidth="2" />
        <text x="100" y="60" className="text-[8px] font-bold fill-rose-600">35°</text>
        <text x="45" y="55" className="text-[10px] font-black fill-teal-700">145°</text>
      </svg>
    )
  },
  {
    id: 'sum-11',
    level: 1,
    question: 'Mennyi minden síkháromszög belső szögeinek összege?',
    options: [
      'Mindig pontosan 180°',
      'Mindig pontosan 360°',
      'Oldalhosszaktól függően változik',
      'Mindig pontosan 90°'
    ],
    correctAnswer: 0,
    explanation: 'Bármely síkbeli háromszög három belső szögének összege pontosan 180°: α + β + γ = 180°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,70 130,70 80,20" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
        <text x="80" y="55" textAnchor="middle" className="text-[10px] font-black fill-teal-900">∑ = 180°</text>
      </svg>
    )
  },
  {
    id: 'sum-12',
    level: 1,
    question: 'Mennyi bármely konvex háromszög külső szögeinek összege (csúcsonként egyet véve)?',
    options: [
      'Mindig 360°',
      'Mindig 180°',
      'Mindig 540°',
      'Mindig 720°'
    ],
    correctAnswer: 0,
    explanation: 'Bármely konvex sokszög (így a háromszög) külső szögeinek összege pontosan 360°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="40,65 120,65 80,25" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <line x1="120" y1="65" x2="150" y2="65" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="80" y="50" textAnchor="middle" className="text-[9px] font-black fill-amber-900">Külső ∑ = 360°</text>
      </svg>
    )
  },
  {
    id: 'sum-13',
    level: 1,
    question: 'Mennyi bármely konvex négyszög belső szögeinek összege?',
    options: [
      'Mindig 360° (két háromszögre bontható: 2 × 180°)',
      'Mindig 180°',
      'Mindig 540°',
      'A szögek típusától függ'
    ],
    correctAnswer: 0,
    explanation: 'Egy négyszög egy átlóval két háromszögre vágható, így szögösszege: 2 · 180° = 360°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,65 130,65 110,25 50,25" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
        <line x1="30" y1="65" x2="110" y2="25" stroke="#4338ca" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="80" y="52" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900">∑ = 360°</text>
      </svg>
    )
  },
  {
    id: 'sum-14',
    level: 1,
    question: 'Hány szimmetriatengelye van egy általános paralelogrammának?',
    options: [
      '0 darab (nincs szimmetriatengelye)',
      '1 darab',
      '2 darab (az átlói)',
      '4 darab'
    ],
    correctAnswer: 0,
    explanation: 'Az általános paralelogrammának 0 szimmetriatengelye van. Kizárólag középpontosan szimmetrikus!',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,65 110,65 130,25 50,25" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
        <circle cx="80" cy="45" r="2.5" fill="#64748b" />
        <text x="80" y="78" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">0 tengely, 1 centrum</text>
      </svg>
    )
  },
  {
    id: 'sum-15',
    level: 1,
    question: 'Középpontosan szimmetrikus-e a téglalap, és hány szimmetriatengelye van?',
    options: [
      'Igen (középpontos), és pontosan 2 szimmetriatengelye van (az oldalfelezők)',
      'Nem középpontos, és 4 tengelye van',
      'Igen, és az átlói a szimmetriatengelyei',
      'Nem szimmetrikus semmilyen módon'
    ],
    correctAnswer: 0,
    explanation: 'A téglalapnak 2 szimmetriatengelye van (a szemközti oldalakat felező merőlegesek), és az átlók metszéspontja szimmetriaközéppont.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <rect x="35" y="25" width="90" height="40" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <line x1="80" y1="15" x2="80" y2="75" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
        <line x1="25" y1="45" x2="135" y2="45" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="80" cy="45" r="2.5" fill="#0284c7" />
      </svg>
    )
  },
  {
    id: 'sum-16',
    level: 1,
    question: 'Hány szimmetriatengelye van a rombusznak, és mik ezek az egyenesek?',
    options: [
      '2 darab (az átlói egyenesei)',
      '4 darab (átlók és oldalfelezők)',
      '1 darab (csak a hosszabb átló)',
      '0 darab'
    ],
    correctAnswer: 0,
    explanation: 'A rombusz szimmetriatengelyei a két átlójának egyenesei. Emiatt az átlói felezik a rombusz belső szögeit és merőlegesek egymásra.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,15 130,45 80,75 30,45" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2" />
        <line x1="80" y1="10" x2="80" y2="80" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
        <line x1="25" y1="45" x2="135" y2="45" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
      </svg>
    )
  },
  {
    id: 'sum-17',
    level: 1,
    question: 'Hány szimmetriatengelye van a négyzetnek?',
    options: [
      '4 darab (2 oldalfelező merőleges és 2 átló)',
      '2 darab',
      '8 darab',
      'Végtelen sok'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet a téglalap és a rombusz tulajdonságait egyesíti: a 2 oldalfelező és a 2 átló együtt 4 szimmetriatengelyt alkot.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <rect x="55" y="20" width="50" height="50" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
        <line x1="80" y1="10" x2="80" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="45" y1="45" x2="115" y2="45" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="50" y1="15" x2="110" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="50" y1="75" x2="110" y2="15" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    )
  },
  {
    id: 'sum-18',
    level: 1,
    question: 'Hány szimmetriatengelye van egy konvex deltoidnak (amely nem rombusz)?',
    options: [
      'Pontosan 1 darab (a főátló egyenese)',
      '2 darab (mindkét átló)',
      '0 darab',
      'Középpontosan szimmetrikus'
    ],
    correctAnswer: 0,
    explanation: 'Az általános deltoidnak 1 szimmetriatengelye van: a két egyenlő szárat összekötő csúcsokon átmenő főátló egyenese.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,15 115,45 80,75 45,45" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
        <line x1="80" y1="10" x2="80" y2="80" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    )
  },
  {
    id: 'sum-19',
    level: 1,
    question: 'Hány szimmetriatengelye van egy szabályos háromszögnek?',
    options: [
      '3 darab (az oldalfelező merőlegesek)',
      '1 darab',
      '6 darab',
      '0 darab'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos háromszögnek 3 szimmetriatengelye van, amelyek egybeesnek a magasságvonalakkal és a szögfelezőkkel.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="40,70 120,70 80,15" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
        <line x1="80" y1="15" x2="80" y2="70" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="40" y1="70" x2="100" y2="42" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="120" y1="70" x2="60" y2="42" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    )
  },
  {
    id: 'sum-20',
    level: 1,
    question: 'Hány szimmetriatengelye van egy körnek?',
    options: [
      'Végtelen sok (a kör középpontján átmenő bármely egyenes)',
      'Pontosan 360 darab',
      'Pontosan 4 darab',
      'Pontosan 2 darab'
    ],
    correctAnswer: 0,
    explanation: 'A kör a középpontján átmenő bármely egyenesre (minden átmérőegyenesre) tengelyesen szimmetrikus, így végtelen sok tengelye van.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="80" cy="45" r="30" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <line x1="35" y1="45" x2="125" y2="45" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="80" y1="5" x2="80" y2="85" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="50" y1="15" x2="110" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
      </svg>
    )
  },
  {
    id: 'sum-21',
    level: 1,
    question: 'Mi a kör átmérője (d) és sugara (r) közötti összefüggés?',
    options: [
      'd = 2 · r (az átmérő a sugár kétszerese)',
      'd = r / 2',
      'd = r²',
      'd = 2 · π · r'
    ],
    correctAnswer: 0,
    explanation: 'Az átmérő a középponton átmenő húr, amely két sugár hosszából tevődik össze: d = 2r.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="80" cy="45" r="28" fill="none" stroke="#0f766e" strokeWidth="2" />
        <line x1="52" y1="45" x2="108" y2="45" stroke="#e11d48" strokeWidth="2" />
        <circle cx="80" cy="45" r="2" fill="#0f766e" />
        <text x="80" y="40" textAnchor="middle" className="text-[9px] font-bold fill-rose-600">d = 2r</text>
      </svg>
    )
  },
  {
    id: 'sum-22',
    level: 1,
    question: 'Mi a húr definíciója a geometriában?',
    options: [
      'A körvonal bármely két pontját összekötő szakasz',
      'A körvonalat egyetlen pontban érintő egyenes',
      'A középpontból a körvonalra húzott szakasz',
      'A körvonal egy tetszőleges íve'
    ],
    correctAnswer: 0,
    explanation: 'A húr a körvonal két pontját összekötő egyenes szakasz. A leghosszabb húr az átmérő.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="80" cy="45" r="28" fill="none" stroke="#0284c7" strokeWidth="2" />
        <line x1="60" y1="24" x2="105" y2="35" stroke="#e11d48" strokeWidth="2" />
        <circle cx="60" cy="24" r="2" fill="#e11d48" />
        <circle cx="105" cy="35" r="2" fill="#e11d48" />
        <text x="85" y="24" className="text-[9px] font-bold fill-rose-600">húr</text>
      </svg>
    )
  },
  {
    id: 'sum-23',
    level: 1,
    question: 'Mekkora szöget zár be a kör érintője az érintési ponthoz húzott sugárral?',
    options: [
      'Mindig pontosan 90°-ot (derékszög)',
      'Mindig 45°-ot',
      'Mindig 60°-ot',
      'A kör sugarától függ'
    ],
    correctAnswer: 0,
    explanation: 'A kör érintője mindig merőleges (90°) az érintési pontba mutató sugárra: e ⊥ r.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="65" cy="45" r="26" fill="none" stroke="#0f766e" strokeWidth="2" />
        <line x1="91" y1="10" x2="91" y2="80" stroke="#e11d48" strokeWidth="2" />
        <line x1="65" y1="45" x2="91" y2="45" stroke="#0f766e" strokeWidth="1.8" />
        <circle cx="91" cy="45" r="2.5" fill="#e11d48" />
        {/* Hungarian right angle: circular arc + dot */}
        <path d="M 91 37 A 8 8 0 0 0 83 45" fill="none" stroke="#e11d48" strokeWidth="1.2" />
        <circle cx="87" cy="41" r="1" fill="#e11d48" />
      </svg>
    )
  },
  {
    id: 'sum-24',
    level: 1,
    question: 'Melyik nevezetes vonalak metszéspontja adja a háromszög köré írható kör középpontját (O)?',
    options: [
      'Az oldalfelező merőlegesek',
      'A belső szögfelezők',
      'A súlyvonalak',
      'A magasságvonalak'
    ],
    correctAnswer: 0,
    explanation: 'Az oldalfelező merőlegesek pontjai egyenlő távol vannak a csúcsoktól, így metszéspontjukból rajzolható a háromszög köré írt kör.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="35,68 125,68 80,18" fill="none" stroke="#475569" strokeWidth="1.8" />
        <circle cx="80" cy="48" r="3" fill="#0d9488" />
        <circle cx="80" cy="48" r="46" fill="none" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="85" y="46" className="text-[10px] font-bold fill-teal-800">O</text>
      </svg>
    )
  },
  {
    id: 'sum-25',
    level: 1,
    question: 'Melyik nevezetes vonalak metszéspontja adja a beírható kör középpontját (I)?',
    options: [
      'A belső szögfelezők',
      'Az oldalfelező merőlegesek',
      'A magasságvonalak',
      'A súlyvonalak'
    ],
    correctAnswer: 0,
    explanation: 'A belső szögfelező pontjai egyenlő távolságra vannak a szárak egyeneseitől, metszéspontjuk az oldalakhoz azonos távolságra lévő beírt kör középpontja.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="35,68 125,68 80,18" fill="none" stroke="#475569" strokeWidth="1.8" />
        <circle cx="80" cy="50" r="18" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <circle cx="80" cy="50" r="2.5" fill="#16a34a" />
        <text x="85" y="48" className="text-[10px] font-bold fill-emerald-800">I</text>
      </svg>
    )
  },
  {
    id: 'sum-26',
    level: 1,
    question: 'Mi a háromszög súlyvonala?',
    options: [
      'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
      'A csúcsból a szemközti oldalra bocsátott merőleges',
      'A belső szöget felező félegyenes',
      'Az oldalt merőlegesen felező egyenes'
    ],
    correctAnswer: 0,
    explanation: 'A súlyvonal a háromszög csúcsát a szemközti oldal felezőpontjával köti össze.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,68 130,68 75,20" fill="none" stroke="#475569" strokeWidth="1.8" />
        <line x1="75" y1="20" x2="80" y2="68" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="80" cy="68" r="2.5" fill="#7c3aed" />
        <text x="82" y="45" className="text-[9px] font-bold fill-purple-700">s_c</text>
      </svg>
    )
  },
  {
    id: 'sum-27',
    level: 1,
    question: 'Milyen arányban osztja a súlypont (S) a súlyvonalat a csúcstól számítva?',
    options: [
      '2 : 1 arányban (a csúcs felőli rész a hosszabb)',
      '1 : 1 arányban (pontosan felezi)',
      '3 : 1 arányban',
      '1 : 2 arányban'
    ],
    correctAnswer: 0,
    explanation: 'A súlypont a súlyvonalat a csúcstól mérve 2 : 1 arányban (2/3 és 1/3 részekre) osztja fel.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="40" y1="70" x2="120" y2="20" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="93" cy="37" r="3.5" fill="#e11d48" />
        <text x="96" y="32" className="text-[10px] font-black fill-rose-600">S</text>
        <text x="60" y="55" className="text-[8px] font-bold fill-purple-700">2 rész</text>
        <text x="105" y="27" className="text-[8px] font-bold fill-purple-700">1 rész</text>
      </svg>
    )
  },
  {
    id: 'sum-28',
    level: 1,
    question: 'Milyen alakzat egy szakasz felezőmerőlegese a síkban mint mértani hely?',
    options: [
      'A szakasz két végpontjától egyenlő távolságra lévő pontok halmaza',
      'A szakaszhoz legközelebb lévő pontok köre',
      'A szakaszt 90°-ban metsző összes görbe',
      'A sík azon pontjai, ahonnan a szakasz derékszögben látszik'
    ],
    correctAnswer: 0,
    explanation: 'A sík azon pontjainak halmaza, amelyek egy AB szakasz két végpontjától egyenlő távolságra vannak (|PA| = |PB|), a szakasz felezőmerőleges egyenese.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="55" x2="130" y2="55" stroke="#475569" strokeWidth="2" />
        <line x1="80" y1="15" x2="80" y2="80" stroke="#e11d48" strokeWidth="2" />
        <circle cx="80" cy="30" r="2.5" fill="#e11d48" />
        <line x1="30" y1="55" x2="80" y2="30" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="130" y1="55" x2="80" y2="30" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 1" />
        <text x="85" y="30" className="text-[8px] font-bold fill-rose-600">P</text>
      </svg>
    )
  },
  {
    id: 'sum-29',
    level: 1,
    question: 'Milyen szögpárok a váltószögek két párhuzamos egyenes és egy metsző egyenes esetén?',
    options: [
      'Egyenlők egymással (α = α\')',
      'Összegük mindig 90°',
      'Összegük mindig 180°',
      'Mindig tompaszögek'
    ],
    correctAnswer: 0,
    explanation: 'Két párhuzamos egyenes metszésekor a váltószögek (Z-alak) szárai párhuzamosak és ellentétes irányításúak, ezért nagyságuk egyenlő.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="25" x2="140" y2="25" stroke="#475569" strokeWidth="1.8" />
        <line x1="20" y1="65" x2="140" y2="65" stroke="#475569" strokeWidth="1.8" />
        <line x1="50" y1="75" x2="110" y2="15" stroke="#0d9488" strokeWidth="1.8" />
        <text x="90" y="38" className="text-[9px] font-bold fill-teal-700">α</text>
        <text x="65" y="60" className="text-[9px] font-bold fill-teal-700">α'</text>
      </svg>
    )
  },
  {
    id: 'sum-30',
    level: 1,
    question: 'Hogyan szerkeszthető meg egy 60°-os szög kizárólag körzővel és vonalzóval?',
    options: [
      'Szabályos háromszög szerkesztésével (a sugárral azonos körív metszésével)',
      'Egy derékszög harmadolásával',
      'A vonalzó hosszának háromszori felmérésével',
      'Két 45°-os szög kivonásával'
    ],
    correctAnswer: 0,
    explanation: 'A 60°-os alapszög egy szabályos háromszög belső szögeként szerkeszthető meg: az alap sugarával körívezünk mindkét végpontból.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="65" x2="110" y2="65" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="65" x2="70" y2="20" stroke="#0f766e" strokeWidth="2" />
        <path d="M 55 65 A 25 25 0 0 0 45 45" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <text x="55" y="52" className="text-[10px] font-bold fill-rose-600">60°</text>
      </svg>
    )
  }
];
