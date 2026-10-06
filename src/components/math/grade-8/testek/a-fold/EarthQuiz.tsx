import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Globe,
  Compass,
  Ruler,
  Maximize2,
  Clock,
  Sun,
  Layers,
  Plane,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { EarthMatcher } from './EarthMatcher';
import { EarthSorter } from './EarthSorter';

interface EarthQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-earth-dim',
    title: 'A Föld Méretei és Gömbmodellje',
    icon: <Globe className="w-4 h-4 text-teal-600" />,
    formula: 'R \\approx 6370\\text{ km}, \\quad d = 2R \\approx 12\\,740\\text{ km}, \\quad K_{\\text{Egyenlítő}} \\approx 40\\,000\\text{ km}',
    note: 'Lapultsága csak kb. 0,3% (1/298), ezért matematikai számításokban gömbként modellezzük.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="25" r="22" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.2" />
        <ellipse cx="80" cy="25" rx="22" ry="6" fill="none" stroke="#0f766e" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="80" y1="25" x2="102" y2="25" stroke="#0f766e" strokeWidth="1.5" />
        <text x="91" y="22" className="text-[6px] font-bold fill-teal-900" textAnchor="middle">R=6370</text>
      </svg>
    )
  },
  {
    id: 'cs-grid',
    title: 'Fokhálózat és Távolságarányok',
    icon: <Compass className="w-4 h-4 text-blue-600" />,
    formula: '1^\\circ\\text{ szélesség} = \\frac{40\\,000\\text{ km}}{360^\\circ} \\approx 111,1\\text{ km}, \\quad r_\\phi = R \\cdot \\cos(\\phi)',
    note: 'A délkör mentén 1° elmozdulás mindig kb. 111,1 km. A 60°-os szélességi kör kerülete pontosan 20 000 km.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="130" height="34" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
        <text x="80" y="22" className="text-[7.5px] font-black fill-blue-900" textAnchor="middle">1° szélesség ≈ 111,1 km</text>
        <text x="80" y="34" className="text-[6.5px] font-bold fill-blue-700" textAnchor="middle">Délkör félhossza: 20 000 km</text>
      </svg>
    )
  },
  {
    id: 'cs-surface-vol',
    title: 'Felszín és Térfogat',
    icon: <Ruler className="w-4 h-4 text-purple-600" />,
    formula: 'A = 4\\pi R^2 \\approx 510\\text{ millió km}^2, \\quad V = \\frac{4}{3}\\pi R^3 \\approx 1083\\text{ milliárd km}^3',
    note: 'A felszín kb. 71%-a óceán és világtenger (~361 M km²), és csupán kb. 29%-a szárazföld (~149 M km²).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="4" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
        <text x="42" y="23" className="text-[6.5px] font-black fill-purple-900" textAnchor="middle">A ≈ 510 M km²</text>
        <text x="42" y="34" className="text-[5.5px] font-bold fill-purple-700" textAnchor="middle">71% víz : 29% föld</text>
        <rect x="85" y="8" width="65" height="34" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
        <text x="117" y="23" className="text-[6.5px] font-black fill-indigo-900" textAnchor="middle">V ≈ 1083 Mrd km³</text>
        <text x="117" y="34" className="text-[5.5px] font-bold fill-indigo-700" textAnchor="middle">M ≈ 5,97·10²⁴ kg</text>
      </svg>
    )
  },
  {
    id: 'cs-eratosthenes',
    title: 'Eratoszthenész és az Időzónák',
    icon: <Sun className="w-4 h-4 text-amber-600" />,
    formula: '\\frac{7,2^\\circ}{360^\\circ} = \\frac{1}{50} \\implies K = 50 \\times 5000\\text{ stádium}, \\quad 1\\text{ óra} = 15^\\circ \\iff 1^\\circ = 4\\text{ perc}',
    note: 'A Föld 24 óra alatt fordul 360°-ot, így 1 órányi időeltérés 15° hosszúságkülönbségnek felel meg.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x="80" y="23" className="text-[7.5px] font-black fill-amber-900" textAnchor="middle">1 óra = 15° | 1° = 4 perc</text>
        <text x="80" y="34" className="text-[6.5px] font-bold fill-amber-800" textAnchor="middle">Eratoszthenész: 7,2° = 1/50 kör</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Földrajzi Adatok',
    subtitle: 'Földátmérő, sugár, Egyenlítő, fokhálózat, szélességi és hosszúsági körök',
    range: '1 - 10. feladat',
    focus: 'Alapok & Fokhálózat',
    questions: [
      {
        id: 'eq-l1-q1',
        prompt: 'A Föld átlagos sugara R ≈ 6370 km. Hozzávetőlegesen mekkora a Föld átmérője (d)?',
        options: ['12 740 km', '6370 km', '25 480 km', '40 000 km'],
        correctAnswer: '12 740 km',
        explanation: 'Az átmérő a sugár kétszerese: d = 2 · R = 2 · 6370 = 12 740 km.',
        breakdown: [
          { label: 'Képlet', value: 'd = 2 · R' },
          { label: 'Számítás', value: '2 · 6370 km = 12 740 km' }
        ]
      },
      {
        id: 'eq-l1-q2',
        prompt: 'Hozzávetőlegesen hány kilométer az Egyenlítő teljes kerülete (K)?',
        options: ['kb. 40 000 km', 'kb. 20 000 km', 'kb. 12 740 km', 'kb. 6370 km'],
        correctAnswer: 'kb. 40 000 km',
        explanation: 'K = 2 · π · R = 2 · 3,1416 · 6370 ≈ 40 024 km, amit kerekítve kb. 40 000 km-nek veszünk.',
        breakdown: [
          { label: 'Képlet', value: 'K = 2 · π · R' },
          { label: 'Behelyettesítés', value: '2 · 3,1416 · 6370 ≈ 40 024 km ≈ 40 000 km' }
        ]
      },
      {
        id: 'eq-l1-q3',
        prompt: 'Milyen alakú síkmetszet keletkezik a Föld felszínén, ha az Egyenlítő síkjával metsszük el a gömböt?',
        options: ['Főkör (a lehető legnagyobb kör)', 'Kis kör', 'Ellipszis', 'Parabola'],
        correctAnswer: 'Főkör (a lehető legnagyobb kör)',
        explanation: 'Mivel az Egyenlítő síkja átmegy a Föld középpontján, a kimetszett kör főkör, sugara pontosan megegyezik a gömb R sugarával.',
        breakdown: [
          { label: 'Definíció', value: 'A középponton átmenő sík főkör-t metsz ki.' },
          { label: 'Sugár', value: 'r = R = 6370 km' }
        ]
      },
      {
        id: 'eq-l1-q4',
        prompt: 'Mi a neve a 0°-os hosszúsági körnek, ahonnan a keleti és nyugati hosszúságot számítjuk?',
        options: ['Greenwich-i kezdőmeridián', 'Egyenlítő', 'Ráktérítő', 'Baktérítő'],
        correctAnswer: 'Greenwich-i kezdőmeridián',
        explanation: 'A kezdőmeridián a London melletti Greenwich Királyi Csillagvizsgálóján halad át, foka 0° hosszúság.',
        breakdown: [
          { label: 'Kezdővonal', value: '0° hosszúsági kör (Greenwich)' },
          { label: 'Irányok', value: '0° - 180° K (kelet) és 0° - 180° NY (nyugat)' }
        ]
      },
      {
        id: 'eq-l1-q5',
        prompt: 'Milyen tartományban mozognak a szélességi fokok a Föld felszínén?',
        options: ['0° és 90° között (Északi és Déli)', '0° és 180° között', '0° és 360° között', '-180° és +180° között'],
        correctAnswer: '0° és 90° között (Északi és Déli)',
        explanation: 'Az Egyenlítő 0°, az Északi-sark 90° É, a Déli-sark 90° D. A szélességi körök 0° és 90° között változnak.',
        breakdown: [
          { label: 'Egyenlítő', value: '0° szélesség' },
          { label: 'Pólusok', value: '90° Északi, illetve 90° Déli szélesség' }
        ]
      },
      {
        id: 'eq-l1-q6',
        prompt: 'Milyen hosszú egyetlen délkör (hosszúsági félkör) az Északi-sarktól a Déli-sarkig?',
        options: ['kb. 20 000 km (a főkör kerületének fele)', 'kb. 40 000 km', 'kb. 10 000 km', 'kb. 6370 km'],
        correctAnswer: 'kb. 20 000 km (a főkör kerületének fele)',
        explanation: 'Mivel a teljes főkör 40 000 km, a pólusokat összekötő fél-főkör hossza pontosan 40 000 / 2 = 20 000 km.',
        breakdown: [
          { label: 'Fél-főkör', value: 'K / 2 = π · R' },
          { label: 'Hossz', value: '40 000 / 2 = 20 000 km' }
        ]
      },
      {
        id: 'eq-l1-q7',
        prompt: 'Hány fokos a teljes körkerület a geometriában?',
        options: ['360°', '180°', '100°', '90°'],
        correctAnswer: '360°',
        explanation: 'A teljes kör szöge 360°, a félkör 180°, a derékszög 90°.',
        breakdown: [
          { label: 'Teljes szög', value: '360°' }
        ]
      },
      {
        id: 'eq-l1-q8',
        prompt: 'Melyik pontban döfi át a Föld forgástengelye az északi félgömb felszínét?',
        options: ['Északi-sark (90° É)', 'Északi sarkkör (66,5° É)', 'Ráktérítő (23,5° É)', 'Greenwich'],
        correctAnswer: 'Északi-sark (90° É)',
        explanation: 'A forgástengely a felszínt pontosan a 90° É-i szélességen (Északi-sark) és a 90° D-i szélességen (Déli-sark) döfi át.',
        breakdown: [
          { label: 'Pólus', value: '90° Északi szélesség' }
        ]
      },
      {
        id: 'eq-l1-q9',
        prompt: 'Hány óra alatt tesz meg a Föld egyetlen teljes 360°-os fordulatot a saját tengelye körül?',
        options: ['24 óra', '12 óra', '48 óra', '365 nap'],
        correctAnswer: '24 óra',
        explanation: 'A Föld tengely körüli forgási ideje 1 nap = 24 óra (a Nap körüli keringése pedig 1 év ≈ 365,25 nap).',
        breakdown: [
          { label: 'Forgási idő', value: '24 óra (1 nap)' }
        ]
      },
      {
        id: 'eq-l1-q10',
        prompt: 'Hogyan viszonyul egymáshoz a szélességi körök sugara az Egyenlítőtől a sarkok felé haladva?',
        options: ['Folyamatosan csökken, a sarkon 0-vá válik', 'Állandó marad', 'Növekszik', 'Először nő, majd csökken'],
        correctAnswer: 'Folyamatosan csökken, a sarkon 0-vá válik',
        explanation: 'A szélességi körök sugara r = R · cos(φ). Az Egyenlítőnél a legnagyobb (6370 km), a sarkoknál pedig ponttá zsugorodik (0 km).',
        breakdown: [
          { label: 'Sugár képlete', value: 'r = R · cos(φ)' },
          { label: 'Változás', value: '0°-nál 6370 km, 90°-nál 0 km' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Felszín, Térfogat és Távolságszámítás',
    subtitle: 'Felszín (510 M km²), térfogat, 1° ≈ 111 km távolság, ortodróma és szárazföld-víz arány',
    range: '11 - 20. feladat',
    focus: 'Gyakorlat & Számítások',
    questions: [
      {
        id: 'eq-l2-q1',
        prompt: 'Hozzávetőlegesen hány kilométer távolságot jelent 1° szélesség menti elmozdulás a délkör mentén?',
        options: ['kb. 111,1 km (40 000 km / 360°)', 'kb. 40 km', 'kb. 10 km', 'kb. 1000 km'],
        correctAnswer: 'kb. 111,1 km (40 000 km / 360°)',
        explanation: 'A 40 000 km-es teljes délkör kerületet 360 fokra osztva: 40 000 / 360 ≈ 111,11 km adódik fokonként.',
        breakdown: [
          { label: 'Képlet', value: 'K / 360°' },
          { label: 'Számítás', value: '40 000 / 360 ≈ 111,1 km / fok' }
        ]
      },
      {
        id: 'eq-l2-q2',
        prompt: 'Körülbelül mekkora a Föld teljes felszíne (A = 4πR²) négyzetkilométerben?',
        options: ['kb. 510 millió km²', 'kb. 100 millió km²', 'kb. 1 milliárd km²', 'kb. 40 millió km²'],
        correctAnswer: 'kb. 510 millió km²',
        explanation: 'A = 4 · π · R² = 4 · 3,1416 · 6370² ≈ 509,9 millió km² ≈ 510 millió km².',
        breakdown: [
          { label: 'Képlet', value: 'A = 4 · π · R²' },
          { label: 'Számítás', value: '4 · 3,1416 · 40 576 900 ≈ 510 000 000 km²' }
        ]
      },
      {
        id: 'eq-l2-q3',
        prompt: 'A Föld 510 millió km² felszínének hány százalékát borítják tengerek és óceánok (világtenger)?',
        options: ['kb. 71% (kb. 361 millió km²)', 'kb. 50%', 'kb. 29%', 'kb. 90%'],
        correctAnswer: 'kb. 71% (kb. 361 millió km²)',
        explanation: 'A Föld felszínének kb. 71%-a vízfelület (óceánok, tengerek), és mindössze kb. 29%-a szárazföld.',
        breakdown: [
          { label: 'Vízfelület', value: '510 · 0,71 ≈ 361 millió km² (71%)' },
          { label: 'Szárazföld', value: '510 · 0,29 ≈ 149 millió km² (29%)' }
        ]
      },
      {
        id: 'eq-l2-q4',
        prompt: 'Mennyi a Föld térfogata gömbként számolva (V = 4/3 πR³)?',
        options: ['kb. 1083 milliárd km³ (1,08 · 10¹² km³)', 'kb. 510 milliárd km³', 'kb. 40 000 milliárd km³', 'kb. 100 millió km³'],
        correctAnswer: 'kb. 1083 milliárd km³ (1,08 · 10¹² km³)',
        explanation: 'V = (4/3) · π · 6370³ ≈ 1,083 · 10¹² km³ (több mint 1083 milliárd köbkilométer).',
        breakdown: [
          { label: 'Képlet', value: 'V = (4/3) · π · R³' },
          { label: 'Számítás', value: '(4/3) · 3,1416 · 2,584 · 10¹¹ ≈ 1,083 · 10¹² km³' }
        ]
      },
      {
        id: 'eq-l2-q5',
        prompt: 'Két város ugyanazon a délkörön fekszik, és a szélességkülönbségük pontosan 10°. Hozzávetőlegesen hány km távolságra vannak egymástól a felszín mentén?',
        options: ['kb. 1111 km', 'kb. 100 km', 'kb. 4000 km', 'kb. 2000 km'],
        correctAnswer: 'kb. 1111 km',
        explanation: 'Mivel 1° szélességkülönbség kb. 111,1 km, így 10° elmozdulás: 10 · 111,1 = 1111 km.',
        breakdown: [
          { label: 'Fokonként', value: '111,1 km' },
          { label: '10 fok esetén', value: '10 · 111,1 km = 1111 km' }
        ]
      },
      {
        id: 'eq-l2-q6',
        prompt: 'Mi a neve a gömbfelület bármely két pontja közötti legrövidebb útnak (a pontokon átmenő főkör ívének)?',
        options: ['Ortodróma', 'Loxodróma', 'Párhuzamos', 'Asztrálvonal'],
        correctAnswer: 'Ortodróma',
        explanation: 'A gömb felszínén a legrövidebb távolság a két pont és a középpont síkja által kimetszett főkör rövidebb íve, az ortodróma.',
        breakdown: [
          { label: 'Fogalom', value: 'Ortodróma (főkörív = legrövidebb távolság)' }
        ]
      },
      {
        id: 'eq-l2-q7',
        prompt: 'Miért repülnek a repülőgépek London és Tokió között az északi sarkvidék felett, ahelyett hogy a térképi egyenes szélességi kör mentén haladnának?',
        options: [
          'Mert a főkör ívén (ortodróma) több mint 1500 km-rel rövidebb az út a gömbön.',
          'Mert ott nincs légörvény.',
          'Mert a Föld észak felé vékonyabb.',
          'Hogy elkerüljék a magas hegyeket.'
        ],
        correctAnswer: 'Mert a főkör ívén (ortodróma) több mint 1500 km-rel rövidebb az út a gömbön.',
        explanation: 'Gömbfelületen a szélességi kör íve jóval hosszabb, mint a főkör íve (ortodróma), így az északi kanyarral óriási üzemanyag- és időmegtakarítás érhető el.',
        breakdown: [
          { label: 'Gömbi geometria', value: 'Főkörív < Szélességi körív' }
        ]
      },
      {
        id: 'eq-l2-q8',
        prompt: 'Mekkora a 60°-os északi szélességi kör sugara (r), ha cos(60°) = 0,5?',
        options: ['3185 km (a földsugár fele)', '6370 km', '4000 km', '1500 km'],
        correctAnswer: '3185 km (a földsugár fele)',
        explanation: 'r = R · cos(60°) = 6370 · 0,5 = 3185 km.',
        breakdown: [
          { label: 'Képlet', value: 'r = R · cos(φ)' },
          { label: 'Számítás', value: '6370 · 0,5 = 3185 km' }
        ]
      },
      {
        id: 'eq-l2-q9',
        prompt: 'Mekkora a fenti 60°-os szélességi kör kerülete (K = 2πr)?',
        options: ['kb. 20 000 km (pontosan fele az Egyenlítőnek)', 'kb. 40 000 km', 'kb. 10 000 km', 'kb. 30 000 km'],
        correctAnswer: 'kb. 20 000 km (pontosan fele az Egyenlítőnek)',
        explanation: 'K = 2 · π · 3185 = 20 012 km ≈ 20 000 km, ami fele az Egyenlítő 40 000 km-es kerületének.',
        breakdown: [
          { label: 'Számítás', value: '2 · π · 3185 ≈ 20 000 km' }
        ]
      },
      {
        id: 'eq-l2-q10',
        prompt: 'Ha egy expedíció az Északi-sarktól elindulva pontosan 1000 km-t halad egyenesen dél felé, körülbelül hány fokos szélességre érkezik?',
        options: ['kb. 81° É (90° - 1000/111°)', 'kb. 80° É', 'kb. 75° É', 'kb. 85° É'],
        correctAnswer: 'kb. 81° É (90° - 1000/111°)',
        explanation: '1000 km / 111,1 km/fok ≈ 9° elmozdulás. 90° - 9° = 81° Északi szélesség.',
        breakdown: [
          { label: 'Fokkülönbség', value: '1000 / 111,1 ≈ 9°' },
          { label: 'Új szélesség', value: '90° - 9° = 81° É' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mesterfok, Eratoszthenész és Időzónák',
    subtitle: 'Eratoszthenész aránypárja, időzónák és 15°/óra, forgási sebesség és műholdak',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Csillagászat',
    questions: [
      {
        id: 'eq-l3-q1',
        prompt: 'Eratoszthenész Kr. e. kb. 240-ben a nyári napfordulókor Alexandriában 7,2°-os szögeltérést mért. A teljes 360°-os körnek hányadrésze ez a 7,2°?',
        options: ['1/50-ed része (360° / 7,2° = 50)', '1/24-ed része', '1/12-ed része', '1/36-od része'],
        correctAnswer: '1/50-ed része (360° / 7,2° = 50)',
        explanation: '360° / 7,2° = 50, tehát a két város közötti ív a Föld teljes kerületének pontosan 1/50-ed része.',
        breakdown: [
          { label: 'Arány', value: '7,2° / 360° = 1 / 50' }
        ]
      },
      {
        id: 'eq-l3-q2',
        prompt: 'Ha a két város távolsága 5000 stádium volt, mekkora kerületet kapott Eratoszthenész a Földre?',
        options: ['250 000 stádium (50 × 5000 stádium)', '100 000 stádium', '500 000 stádium', '360 000 stádium'],
        correctAnswer: '250 000 stádium (50 × 5000 stádium)',
        explanation: 'K = 50 · 5000 = 250 000 stádium. Egy egyiptomi stádium kb. 157,5 m volt, így 250 000 · 157,5 m ≈ 39 375 km, elképesztő pontosság!',
        breakdown: [
          { label: 'Számítás', value: '50 · 5000 = 250 000 stádium ≈ 40 000 km' }
        ]
      },
      {
        id: 'eq-l3-q3',
        prompt: 'A Föld 24 óra alatt 360°-ot fordul. Hány fok hosszúságkülönbségnek felel meg pontosan 1 óra időeltérés?',
        options: ['15° (360° / 24)', '10°', '20°', '30°'],
        correctAnswer: '15° (360° / 24)',
        explanation: '360° / 24 óra = 15°/óra. Ezért osztották fel a Földet 24 db 15°-os időzónára.',
        breakdown: [
          { label: 'Számítás', value: '360° / 24 h = 15° / h' }
        ]
      },
      {
        id: 'eq-l3-q4',
        prompt: 'Hány perc helyi napidő-különbséget jelent 1° hosszúsági fok eltérés két hely között?',
        options: ['4 perc (60 perc / 15°)', '1 perc', '15 perc', '10 perc'],
        correctAnswer: '4 perc (60 perc / 15°)',
        explanation: '1 óra = 60 perc. 60 perc / 15° = 4 perc/fok.',
        breakdown: [
          { label: 'Számítás', value: '60 perc / 15° = 4 perc / fok' }
        ]
      },
      {
        id: 'eq-l3-q5',
        prompt: 'Budapest keleti hosszúsága kb. 19°, a Greenwich-i kezdőmeridián 0°. Hozzávetőlegesen mekkora a valós helyi napidő különbsége a két helynek?',
        options: ['kb. 76 perc (1 óra 16 perc)', 'kb. 19 perc', 'kb. 38 perc', 'kb. 120 perc'],
        correctAnswer: 'kb. 76 perc (1 óra 16 perc)',
        explanation: '19° · 4 perc/fok = 76 perc = 1 óra 16 perc. Budapesten ennyivel korábban delel a Nap, mint Greenwich-ben.',
        breakdown: [
          { label: 'Számítás', value: '19 · 4 perc = 76 perc = 1 óra 16 perc' }
        ]
      },
      {
        id: 'eq-l3-q6',
        prompt: 'Hozzávetőlegesen mekkora a Föld forgásából származó kerületi sebesség az Egyenlítőn (K ≈ 40 000 km, t = 24 h)?',
        options: ['kb. 1670 km/h', 'kb. 1000 km/h', 'kb. 3000 km/h', 'kb. 500 km/h'],
        correctAnswer: 'kb. 1670 km/h',
        explanation: 'v = K / t = 40 000 km / 24 h ≈ 1666,7 km/h ≈ 1670 km/h.',
        breakdown: [
          { label: 'Képlet', value: 'v = s / t = K / 24' },
          { label: 'Sebesség', value: '40 000 / 24 ≈ 1667 km/h' }
        ]
      },
      {
        id: 'eq-l3-q7',
        prompt: 'Mekkora a forgási kerületi sebesség az Északi- vagy Déli-sarkon (90° szélesség)?',
        options: ['0 km/h', '1670 km/h', '835 km/h', '100 km/h'],
        correctAnswer: '0 km/h',
        explanation: 'Mivel a sarkok a forgástengely döféspontjai, sugaruk r = 0, így nem írnak le kört, kerületi sebességük 0 km/h.',
        breakdown: [
          { label: 'Sugár', value: 'r = 0 km' },
          { label: 'Sebesség', value: 'v = 0 km/h' }
        ]
      },
      {
        id: 'eq-l3-q8',
        prompt: 'Egy távérzékelő műhold h = 630 km magasan kering a Föld felszíne felett körpályán. Mennyi a műhold körpályájának sugara a Föld középpontjától?',
        options: ['7000 km (6370 + 630)', '6370 km', '630 km', '12 740 km'],
        correctAnswer: '7000 km (6370 + 630)',
        explanation: 'A pályasugár a Föld sugara plusz a keringési magasság: rpálya = R + h = 6370 + 630 = 7000 km.',
        breakdown: [
          { label: 'Képlet', value: 'rpálya = R + h' },
          { label: 'Összeg', value: '6370 + 630 = 7000 km' }
        ]
      },
      {
        id: 'eq-l3-q9',
        prompt: 'Hol helyezkedik el a nemzetközi dátumválasztó vonal a Földön?',
        options: [
          'A 180°-os hosszúsági kör mentén a Csendes-óceánon',
          'A 0°-os Greenwich-i délkörön',
          'Az Egyenlítő mentén',
          'Az Északi-sarkon'
        ],
        correctAnswer: 'A 180°-os hosszúsági kör mentén a Csendes-óceánon',
        explanation: 'A dátumválasztó vonal a Greenwich-csel átellenes 180°-os meridián mentén húzódik a Csendes-óceánon.',
        breakdown: [
          { label: 'Helyzet', value: '180° hosszúsági kör (Csendes-óceán)' }
        ]
      },
      {
        id: 'eq-l3-q10',
        prompt: 'Ha a Föld felszínének területe A ≈ 5,1 · 10⁸ km², és 1 kg/cm² a légnyomás (10 000 kg/m² = 10⁷ kg/km²), nagyságrendileg mekkora a Föld teljes légkörének tömege?',
        options: ['kb. 5,1 · 10¹⁸ kg (5 billió tonna)', 'kb. 5,1 · 10¹² kg', 'kb. 1000 tonna', 'kb. 10²⁴ kg'],
        correctAnswer: 'kb. 5,1 · 10¹⁸ kg (5 billió tonna)',
        explanation: 'A = 5,1 · 10⁸ km² = 5,1 · 10¹⁴ m². Nyomás p = 10⁵ N/m² = 10⁴ kg/m² · g. Tömeg M = 5,1 · 10¹⁴ · 10⁴ = 5,1 · 10¹⁸ kg ≈ 5 billió tonna.',
        breakdown: [
          { label: 'Felszín', value: '5,1 · 10¹⁴ m²' },
          { label: 'Légkörtömeg', value: 'kb. 5,1 · 10¹⁸ kg (5 trillió kg = 5 billió tonna)' }
        ]
      }
    ]
  }
};

export const EarthQuiz: React.FC<EarthQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A Föld (Geometriai Kvíz)"
      subtitle="A Föld mint gömb matematikai modellje, fokhálózat, főkörök, felszín, térfogat és Eratoszthenész mérése"
      topicId="g8-solids-earth"
      documentId="g8-solids-earth"
      badge="8. Osztály • VII. Testek"
      topicBadge="8. OSZTÁLY • VII. TESTEK • 🌍 5. KVÍZ"
      badgeText="8. OSZTÁLY • VII. TESTEK • 🌍 5. KVÍZ"
      badgeColor="teal"
      themeColor="teal"
      emoji="🌍"
      cheatSheetTitle="A Föld Geometriájának Képtára és Képlettára"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a fogalmakat, adatokat és számításokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-teal-600" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Földrajzi Adatok',
              subtitle: 'Párosítsd a Föld méreteit és a fokhálózat elemeit!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapadatok'
            },
            2: {
              title: '2. Szint: Felszín, Térfogat és Távolságszámítás',
              subtitle: 'Párosítsd a numerikus értékeket és számításokat!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Számítások'
            },
            3: {
              title: '3. Szint: Mesterfok, Eratoszthenész és Időzónák',
              subtitle: 'Párosítsd a történelmi és csillagászati összefüggéseket!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Mesterfok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <EarthMatcher
              key={`earth-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a fokhálózat vonalait, dimenzióit és állításait!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-600" />,
          levels: {
            1: {
              title: '1. Szint: Szélességi vs. Hosszúsági Körök',
              subtitle: 'Válogasd szét: Szélességi / Hosszúsági / Mindkettő!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Fokhálózat'
            },
            2: {
              title: '2. Szint: Geometriai Mennyiségek Dimenziói',
              subtitle: 'Kategorizáld: Hosszúság (1D) / Felszín (2D) / Térfogat (3D)!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Dimenziók'
            },
            3: {
              title: '3. Szint: Állítások a Föld Geometriájáról',
              subtitle: 'Döntsd el: Mindig Igaz / Csak Néha / Mindig Hamis!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Logika'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <EarthSorter
              key={`earth-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={EarthMatcher}
      sorterComponent={EarthSorter}
    />
  );
};

export default EarthQuiz;
