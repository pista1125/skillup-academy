import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { GeometryEscapeRoomMatcher } from './GeometryEscapeRoomMatcher';
import { GeometryEscapeRoomSorter } from './GeometryEscapeRoomSorter';

interface GeometryEscapeRoomQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const quizLevels: QuizLevelConfig[] = [
  // 1. SZINT: 1. ZÁR - A SZÖGEK ÉS ÁTLÓK TITKA
  {
    level: 1,
    title: '1. szint: 1. Zár – A Szögek és Átlók Titka',
    subtitle: 'Törd fel az első lakatot sokszögek belső és külső szögeinek, valamint átlóinak kódjaival!',
    description: '10 rejtvényes feladvány a titkos szög- és átlókódok megfejtéséhez.',
    questions: [
      {
        id: 'q1-1',
        title: '1. Zárkód: Háromszög belső szögösszege',
        question: 'Az első rézlakat tárcsája a háromszög belső szögeinek összegét kéri fokban. Mi a helyes lakatkód?',
        options: ['180°', '360°', '90°', '270°'],
        correctAnswer: '180°',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,55 85,55 50,15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="50" cy="40" r="10" fill="#6d28d9" />
            <text x="50" y="43" textAnchor="middle" className="text-[9px] font-black fill-white">180</text>
          </svg>
        ),
        explanation: 'Bármely háromszög belső szögeinek összege pontosan 180°. Az első kód: 180.',
        hint: 'Képlet: (3 - 2) · 180° = 180°.'
      },
      {
        id: 'q1-2',
        title: '2. Zárkód: Hiányzó belső szög',
        question: 'Egy kódolt háromszög két sarka 45° és 65°. A harmadik sarok értéke nyitja a második zárat. Mi ez a szám?',
        options: ['70°', '80°', '60°', '75°'],
        correctAnswer: '70°',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,55 85,55 40,15" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="28" y="50" className="text-[7.5px] font-bold fill-purple-900">45°</text>
            <text x="70" y="50" className="text-[7.5px] font-bold fill-purple-900">65°</text>
            <text x="40" y="28" textAnchor="middle" className="text-[8px] font-bold fill-red-600">?</text>
          </svg>
        ),
        explanation: '180° - 45° - 65° = 70°. A lakat kódja: 70.',
        hint: '180°-ból vonj ki 45°-ot és 65°-ot!'
      },
      {
        id: 'q1-3',
        title: '3. Zárkód: Négyszög belső szögösszege',
        question: 'A négyszög alakú acélrekesz kódja megegyezik a konvex négyszögek belső szögösszegével. Mennyi ez az érték?',
        options: ['360°', '180°', '540°', '720°'],
        correctAnswer: '360°',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,50 80,50 70,18 25,18" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1="25" y1="18" x2="80" y2="50" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" />
            <text x="47" y="38" textAnchor="middle" className="text-[8px] font-bold fill-purple-900">2 × 180°</text>
          </svg>
        ),
        explanation: 'A négyszög egy átlóval két háromszögre bontható: 2 · 180° = 360°. Képlet: (4 - 2) · 180° = 360°.',
        hint: '(4 - 2) · 180° = 360°.'
      },
      {
        id: 'q1-4',
        title: '4. Zárkód: Ötszög átlóinak száma',
        question: 'A falba vésett pentagramma csillag az ötszög összes átlóját ábrázolja. Hány átlója van az ötszögnek?',
        options: ['5 átló', '10 átló', '6 átló', '2 átló'],
        correctAnswer: '5 átló',
        figure: (
          <svg viewBox="0 0 90 75" className="w-28 h-20">
            <polygon points="45,10 80,35 67,70 23,70 10,35" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1="45" y1="10" x2="67" y2="70" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 1" />
            <line x1="45" y1="10" x2="23" y2="70" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 1" />
            <line x1="80" y1="35" x2="23" y2="70" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 1" />
            <line x1="80" y1="35" x2="10" y2="35" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 1" />
            <line x1="67" y1="70" x2="10" y2="35" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 1" />
            <text x="45" y="44" textAnchor="middle" className="text-[8px] font-bold fill-purple-900">d = 5</text>
          </svg>
        ),
        explanation: 'd = 5 · (5 - 3) / 2 = 5 · 2 / 2 = 5 átló. Az ötszög kódja: 5.',
        hint: 'd = n(n-3)/2, ahol n = 5.'
      },
      {
        id: 'q1-5',
        title: '5. Zárkód: Hatszög belső szögösszege',
        question: 'A hatoldalú titkos ajtózár numerikus kódja a hatszög (n = 6) belső szögeinek összege. Mi a kód?',
        options: ['720°', '540°', '900°', '1080°'],
        correctAnswer: '720°',
        figure: (
          <svg viewBox="0 0 90 70" className="w-28 h-20">
            <polygon points="25,12 65,12 80,35 65,58 25,58 10,35" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="45" y="38" textAnchor="middle" className="text-[8px] font-black fill-purple-900">720°</text>
          </svg>
        ),
        explanation: 'S_6 = (6 - 2) · 180° = 4 · 180° = 720°. A kód: 720.',
        hint: '(6 - 2) · 180° = 4 · 180°.'
      },
      {
        id: 'q1-6',
        title: '6. Zárkód: Külső szög tétele',
        question: 'Egy háromszög két belső szöge 35° és 45°. Mennyi a harmadik csúcshoz tartozó külső szög, ami kinyitja ezt a rekeszt?',
        options: ['80°', '100°', '70°', '90°'],
        correctAnswer: '80°',
        explanation: 'A külső szög tétele szerint a külső szög egyenlő a két nem mellette fekvő belső szög összegével: 35° + 45° = 80°.',
        hint: 'α\' = β + γ = 35° + 45°.'
      },
      {
        id: 'q1-7',
        title: '7. Zárkód: Háromszög-egyenlőtlenség csapda',
        question: 'A kamra padlóján 4 rúdkészlet fekszik. Csak azzal a készlettel nyitható a csapóajtó, amiből valódi háromszög építhető. Melyik az?',
        options: [
          '5 cm, 7 cm, 10 cm',
          '3 cm, 4 cm, 8 cm',
          '2 cm, 5 cm, 7 cm',
          '1 cm, 2 cm, 4 cm'
        ],
        correctAnswer: '5 cm, 7 cm, 10 cm',
        explanation: 'Csak az 5, 7, 10 cm elégíti ki a háromszög-egyenlőtlenséget: 5 + 7 = 12 > 10. A többinél 3+4 < 8, 2+5 = 7 (nem nagyobb!), 1+2 < 4.',
        hint: 'A két rövidebb rúd összege nagyobb kell legyen a leghosszabbnál!'
      },
      {
        id: 'q1-8',
        title: '8. Zárkód: Szabályos hatszög 1 szöge',
        question: 'Egy szabályos hatszög alakú gombot a belső szögének nagyságára kell forgatni. Hány fokos a szög?',
        options: ['120°', '108°', '135°', '140°'],
        correctAnswer: '120°',
        explanation: 'A hatszög belső szögösszege 720°. Mivel 6 egyforma szöge van: 720° / 6 = 120°. A kód: 120.',
        hint: '720° / 6 = 120°.'
      },
      {
        id: 'q1-9',
        title: '9. Zárkód: Nyolcszög átlói',
        question: 'Egy nyolcszög alakú páncélkazetta átlóinak száma a nyitókód. Hány átlója van a nyolcszögnek (n = 8)?',
        options: ['20 átló', '16 átló', '24 átló', '28 átló'],
        correctAnswer: '20 átló',
        explanation: 'd_8 = 8 · (8 - 3) / 2 = 8 · 5 / 2 = 40 / 2 = 20 átló. A kód: 20.',
        hint: '8 · (8 - 3) / 2 = 8 · 5 / 2.'
      },
      {
        id: 'q1-10',
        title: '10. Zárkód: Külső szögek összege',
        question: 'Egy misztikus tízszög külső szögeinek összege az 1. Zár mesterkódja. Mennyi bármely konvex sokszög külső szögeinek összege?',
        options: ['360°', '180°', '720°', '1440°'],
        correctAnswer: '360°',
        explanation: 'Bármely konvex sokszög külső szögeinek összege pontosan 360°, az oldalak számától függetlenül! Az 1. Zár feltörve!',
        hint: 'A külső szögek összege mindig pontosan egy teljes fordulat: 360°.'
      }
    ]
  },

  // 2. SZINT: 2. ZÁR - A SÍKIDOMOK TERÜLETMÁTRIXA
  {
    level: 2,
    title: '2. szint: 2. Zár – A Síkidomok Területmátrixa',
    subtitle: 'Nyisd ki a második kaput háromszögek, négyszögek és trapézok területkódjaival!',
    description: '10 kódfejtő feladvány síkidomok területszámításával és mértékegységekkel.',
    questions: [
      {
        id: 'q2-1',
        title: '1. Területkód: Háromszög',
        question: 'Egy háromszög alapja 14 cm, magassága 8 cm. Mi a lakat száma (T)?',
        options: ['56', '112', '28', '42'],
        correctAnswer: '56',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,55 85,55 45,15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <line x1="45" y1="15" x2="45" y2="55" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="65" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">a = 14</text>
            <text x="48" y="38" className="text-[7.5px] font-bold fill-red-600">m = 8</text>
          </svg>
        ),
        explanation: 'T = (a · m) / 2 = (14 · 8) / 2 = 112 / 2 = 56 cm². A kód: 56.',
        hint: '(14 · 8) / 2 = 56.'
      },
      {
        id: 'q2-2',
        title: '2. Területkód: Paralelogramma',
        question: 'Egy paralelogramma alapja 12 cm, magassága 7 cm. Mekkora a titkos rekesz területe?',
        options: ['84 cm²', '42 cm²', '168 cm²', '38 cm²'],
        correctAnswer: '84 cm²',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,50 65,50 85,18 35,18" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <line x1="35" y1="18" x2="35" y2="50" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="40" y="60" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">a = 12</text>
            <text x="38" y="36" className="text-[7.5px] font-bold fill-red-600">m = 7</text>
          </svg>
        ),
        explanation: 'T = a · m = 12 · 7 = 84 cm². A kód: 84.',
        hint: 'T = a · m_a = 12 · 7.'
      },
      {
        id: 'q2-3',
        title: '3. Területkód: Trapéz kódfejtés',
        question: 'Egy trapéz párhuzamos oldalai 16 cm és 8 cm, magassága 5 cm. Mekkora a terület-kód?',
        options: ['60', '120', '40', '80'],
        correctAnswer: '60',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,52 85,52 65,18 35,18" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="50" y="14" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">c = 8</text>
            <text x="50" y="62" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">a = 16</text>
            <text x="38" y="38" className="text-[7.5px] font-bold fill-red-600">m = 5</text>
          </svg>
        ),
        explanation: 'Középvonal: k = (16 + 8) / 2 = 12 cm. Terület: T = 12 · 5 = 60 cm². A kód: 60.',
        hint: 'k = (16 + 8) / 2 = 12, T = 12 · 5.'
      },
      {
        id: 'q2-4',
        title: '4. Területkód: Deltoid átlók',
        question: 'Egy deltoid alakú zárszerkezet átlói e = 18 cm és f = 10 cm. Mi a nyitószám?',
        options: ['90', '180', '45', '140'],
        correctAnswer: '90',
        figure: (
          <svg viewBox="0 0 90 70" className="w-28 h-20">
            <polygon points="45,8 75,32 45,62 15,32" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            <line x1="45" y1="8" x2="45" y2="62" stroke="#9d174d" strokeWidth="1" />
            <line x1="15" y1="32" x2="75" y2="32" stroke="#9d174d" strokeWidth="1" />
            <text x="47" y="24" className="text-[7px] font-bold fill-pink-900">e=18</text>
            <text x="58" y="30" className="text-[7px] font-bold fill-pink-900">f=10</text>
          </svg>
        ),
        explanation: 'T = (e · f) / 2 = (18 · 10) / 2 = 180 / 2 = 90 cm². A kód: 90.',
        hint: '(18 · 10) / 2 = 90.'
      },
      {
        id: 'q2-5',
        title: '5. Területkód: Derékszögű háromszög',
        question: 'Egy derékszögű háromszög két befogója 9 cm és 12 cm. Mekkora a területe?',
        options: ['54 cm²', '108 cm²', '27 cm²', '42 cm²'],
        correctAnswer: '54 cm²',
        figure: (
          <svg viewBox="0 0 90 70" className="w-28 h-20">
            <polygon points="15,55 75,55 15,15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <path d="M 15 47 A 8 8 0 0 1 23 55" fill="none" stroke="#7c3aed" strokeWidth="1" />
            <circle cx="19" cy="51" r="1.1" fill="#7c3aed" />
            <text x="8" y="35" className="text-[7px] font-bold fill-purple-900">b=12</text>
            <text x="45" y="65" className="text-[7px] font-bold fill-purple-900">a=9</text>
          </svg>
        ),
        explanation: 'T = (a · b) / 2 = (9 · 12) / 2 = 108 / 2 = 54 cm². A kód: 54.',
        hint: 'Befogók szorzatának fele: (9 · 12) / 2.'
      },
      {
        id: 'q2-6',
        title: '6. Területkód: Rombusz területe átlókból',
        question: 'Egy rombusz átlói e = 16 cm és f = 12 cm. Mi a lakat kódja?',
        options: ['96', '192', '48', '112'],
        correctAnswer: '96',
        explanation: 'T = (e · f) / 2 = (16 · 12) / 2 = 192 / 2 = 96 cm². A kód: 96.',
        hint: '(16 · 12) / 2 = 96.'
      },
      {
        id: 'q2-7',
        title: '7. Területkód: Trapéz középvonalból',
        question: 'Egy trapéz k középvonala 11 cm, magassága 6 cm. Mekkora a területe?',
        options: ['66 cm²', '33 cm²', '132 cm²', '55 cm²'],
        correctAnswer: '66 cm²',
        explanation: 'T = k · m = 11 · 6 = 66 cm². A kód: 66.',
        hint: 'T = k · m = 11 · 6.'
      },
      {
        id: 'q2-8',
        title: '8. Területkód: Hektár és négyzetméter',
        question: 'A kódfejtő tábla felirata: Hány m²-t ér 0,5 hektár (ha)?',
        options: ['5 000 m²', '500 m²', '50 000 m²', '50 m²'],
        correctAnswer: '5 000 m²',
        explanation: '1 ha = 10 000 m², ezért 0,5 ha = 0,5 · 10 000 = 5 000 m². A kód: 5000.',
        hint: '1 ha = 10 000 m², ennek a fele 5 000 m².'
      },
      {
        id: 'q2-9',
        title: '9. Területkód: Átdarabolási elv',
        question: 'Egy paralelogrammát átvágtunk a magassága mentén és átrendezve téglalappá alakítottuk. Megváltozott-e a területe?',
        options: [
          'Nem változott, a területe pontosan ugyanakkora maradt',
          'Igen, a téglalap területe nagyobb lett',
          'Igen, a téglalap területe kisebb lett',
          'Attól függ, mekkora a tompaszöge'
        ],
        correctAnswer: 'Nem változott, a területe pontosan ugyanakkora maradt',
        explanation: 'Az átdarabolás során az alakzat területe megmarad (konzerválódik): T = a · m_a.',
        hint: 'A darabok csak áthelyeződtek, semmi sem veszett el!'
      },
      {
        id: 'q2-10',
        title: '10. Területkód: 2. Zár mesterkód',
        question: 'Egy derékszögű háromszög befogói 15 cm és 20 cm, átfogója 25 cm. Mekkora az átfogóhoz tartozó m_c magasság, ami feltöri a 2. Zárat?',
        options: ['12 cm', '10 cm', '15 cm', '12,5 cm'],
        correctAnswer: '12 cm',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <polygon points="15,55 85,55 15,15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <line x1="15" y1="55" x2="43.5" y2="38.7" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 1" />
            <text x="32" y="44" className="text-[7.5px] font-bold fill-red-600">m_c = ?</text>
            <text x="50" y="65" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">c = 25</text>
          </svg>
        ),
        explanation: 'T = (15 · 20) / 2 = 150 cm². Átfogóból: (25 · m_c) / 2 = 150 ⟹ 25 · m_c = 300 ⟹ m_c = 12 cm. A 2. Zár feltörve!',
        hint: 'T = 150 cm², 25 · m_c / 2 = 150 ⟹ m_c = 12.'
      }
    ]
  },

  // 3. SZINT: 3. ZÁR - A TESTEK HÁLÓZATA ÉS A MESTERKÓD
  {
    level: 3,
    title: '3. szint: 3. Zár – A Testek Hálózata és a Mesterkód',
    subtitle: 'Hasábok térfogata, felszíne és az Euler-képlet segítségével nyisd ki a végső kijáratot!',
    description: '10 emelt szintű kódfejtő feladat a szabadulás eléréséhez.',
    questions: [
      {
        id: 'q3-1',
        title: '1. Mesterkód: Kocka térfogat',
        question: 'Egy kocka alakú aranyláda éle a = 5 cm. Mekkora a térfogat-kódja (V)?',
        options: ['125', '150', '25', '75'],
        correctAnswer: '125',
        figure: (
          <svg viewBox="0 0 90 75" className="w-28 h-20">
            <polygon points="20,25 45,15 70,15 45,25" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <polygon points="45,25 70,15 70,45 45,55" fill="#fde68a" stroke="#d97706" strokeWidth="1.2" />
            <polygon points="20,25 45,25 45,55 20,55" fill="#fef9c3" stroke="#d97706" strokeWidth="1.2" />
            <text x="32" y="65" textAnchor="middle" className="text-[7.5px] font-bold fill-amber-900">a = 5</text>
          </svg>
        ),
        explanation: 'V = a³ = 5³ = 5 · 5 · 5 = 125 cm³. A kód: 125.',
        hint: '5 · 5 · 5 = 125.'
      },
      {
        id: 'q3-2',
        title: '2. Mesterkód: Téglatest térfogat',
        question: 'Egy titkos rekesz élei 4 cm, 5 cm és 6 cm. Mekkora a térfogata?',
        options: ['120 cm³', '60 cm³', '148 cm³', '240 cm³'],
        correctAnswer: '120 cm³',
        explanation: 'V = a · b · c = 4 · 5 · 6 = 120 cm³. A kód: 120.',
        hint: '4 · 5 · 6 = 120.'
      },
      {
        id: 'q3-3',
        title: '3. Mesterkód: Háromoldalú hasáb térfogat',
        question: 'Egy háromoldalú hasáb alapja egy 24 cm² területű háromszög, magassága M = 8 cm. Mi a térfogat-kód?',
        options: ['192', '96', '384', '144'],
        correctAnswer: '192',
        figure: (
          <svg viewBox="0 0 90 75" className="w-28 h-20">
            <polygon points="20,20 50,15 35,30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <polygon points="20,55 50,50 35,65" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
            <line x1="20" y1="20" x2="20" y2="55" stroke="#2563eb" strokeWidth="1" />
            <line x1="50" y1="15" x2="50" y2="50" stroke="#2563eb" strokeWidth="1" />
            <line x1="35" y1="30" x2="35" y2="65" stroke="#2563eb" strokeWidth="1.2" />
            <text x="58" y="40" className="text-[7px] font-bold fill-blue-900">M = 8</text>
            <text x="35" y="24" textAnchor="middle" className="text-[6.5px] font-bold fill-blue-900">T_a=24</text>
          </svg>
        ),
        explanation: 'V = T_a · M = 24 · 8 = 192 cm³. A kód: 192.',
        hint: '24 · 8 = 192.'
      },
      {
        id: 'q3-4',
        title: '4. Mesterkód: Akvárium vízszint emelkedés',
        question: 'Egy 40 cm × 25 cm alapterületű víztartályba 5 liter vizet öntünk. Hány cm-t emelkedik a vízszint?',
        options: ['5 cm', '4 cm', '2 cm', '10 cm'],
        correctAnswer: '5 cm',
        figure: (
          <svg viewBox="0 0 100 70" className="w-28 h-20">
            <rect x="20" y="20" width="50" height="40" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <rect x="20" y="42" width="50" height="18" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.2" />
            <text x="45" y="68" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">40 × 25 cm</text>
            <text x="75" y="52" className="text-[7px] font-bold fill-blue-700">Δm = ?</text>
          </svg>
        ),
        explanation: '5 liter = 5 dm³ = 5000 cm³. Alapterület: T_a = 40 · 25 = 1000 cm². Vízszintemelkedés: Δm = 5000 / 1000 = 5 cm. A kód: 5.',
        hint: '5000 cm³ / 1000 cm² = 5 cm.'
      },
      {
        id: 'q3-5',
        title: '5. Mesterkód: Euler-tétel oktaéderre',
        question: 'Egy oktaédernek 6 csúcsa és 8 lapja van. Hány éle van ennek a testnek?',
        options: ['12 él', '14 él', '10 él', '16 él'],
        correctAnswer: '12 él',
        figure: (
          <svg viewBox="0 0 90 75" className="w-28 h-20">
            <polygon points="45,8 20,35 45,44" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="45,8 70,35 45,44" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="45,62 20,35 45,44" fill="#818cf8" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="45,62 70,35 45,44" fill="#6366f1" stroke="#4f46e5" strokeWidth="1.2" />
            <text x="45" y="72" textAnchor="middle" className="text-[7px] font-bold fill-indigo-900">Oktaéder: C=6, L=8</text>
          </svg>
        ),
        explanation: 'C + L = E + 2 ⟹ 6 + 8 = E + 2 ⟹ 14 = E + 2 ⟹ E = 12 él. A kód: 12.',
        hint: '6 + 8 - 2 = 12.'
      },
      {
        id: 'q3-6',
        title: '6. Mesterkód: Tetraéder Euler-ellenőrzés',
        question: 'A szabályos tetraédernek 4 csúcsa és 4 lapja van. Hány éle van?',
        options: ['6 él', '8 él', '4 él', '12 él'],
        correctAnswer: '6 él',
        figure: (
          <svg viewBox="0 0 90 70" className="w-28 h-20">
            <polygon points="45,10 18,50 48,60" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
            <polygon points="45,10 48,60 70,45" fill="#f97316" stroke="#ea580c" strokeWidth="1.2" />
            <text x="45" y="68" textAnchor="middle" className="text-[7px] font-bold fill-orange-950">Tetraéder: C=4, L=4</text>
          </svg>
        ),
        explanation: 'C + L = E + 2 ⟹ 4 + 4 = E + 2 ⟹ 8 = E + 2 ⟹ E = 6 él. A kód: 6.',
        hint: '4 + 4 - 2 = 6.'
      },
      {
        id: 'q3-7',
        title: '7. Mesterkód: 3×3×3 festett kocka',
        question: 'Egy 3×3×3-as kifestett kocka 27 darab 1×1×1-es kiskockára van vágva. Hány kiskockának van pontosan 3 lapja kifestve?',
        options: ['8 darabnak (a 8 sarokkocka)', '12 darabnak', '6 darabnak', '1 darabnak'],
        correctAnswer: '8 darabnak (a 8 sarokkocka)',
        explanation: 'Pontosan 3 lapja csak a sarokkockáknak van festve. Mivel a kockának 8 sarka van: pontosan 8 darab kiskocka ilyen! A kód: 8.',
        hint: 'Csak a kocka sarkain lévő kiskockáknak látszik 3 oldala!'
      },
      {
        id: 'q3-8',
        title: '8. Mesterkód: Kocka testháló hiba',
        question: 'A kódfejtő képernyőn 4 négyzet találkozik egyetlen csúcspontban (2×2-es tömb). Összehajtható-e ebből kocka?',
        options: [
          'Nem, mert a lapok átfednék egymást',
          'Igen, ez a klasszikus kockaháló',
          'Igen, ha a másik két lap szemben van',
          'Csak akkor, ha 1 cm-esek'
        ],
        correctAnswer: 'Nem, mert a lapok átfednék egymást',
        figure: (
          <svg viewBox="0 0 90 70" className="w-28 h-20">
            <rect x="25" y="12" width="18" height="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            <rect x="43" y="12" width="18" height="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            <rect x="25" y="30" width="18" height="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            <rect x="43" y="30" width="18" height="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            <circle cx="43" cy="30" r="4" fill="#dc2626" />
            <text x="43" y="58" textAnchor="middle" className="text-[6.5px] font-bold fill-red-600">2×2 tömb: NEM háló</text>
          </svg>
        ),
        explanation: 'Ha 4 négyzet találkozik egy pontban, felhajtáskor a lapok átfedik egymást. Ez nem testháló!',
        hint: 'A 2x2-es négyzettömb nem hajtogatható össze 3D testté.'
      },
      {
        id: 'q3-9',
        title: '9. Mesterkód: Kocka felszínének változása',
        question: 'Ha egy kocka élét a 3-szorosára növeljük (a ⟶ 3a), hányszorosára nő a teljes felszíne?',
        options: ['9-szeresére (3² = 9)', '3-szorosára', '27-szeresére', '6-szorosára'],
        correctAnswer: '9-szeresére (3² = 9)',
        explanation: 'A felszín területi mérték, így a méretarány négyzetével növekszik: A = 6 · (3a)² = 6 · 9a² = 9 · A. A kód: 9.',
        hint: 'A felszín négyzetes arányban nő: 3² = 9.'
      },
      {
        id: 'q3-10',
        title: '10. Mesterkód: A Végső Szabadulókulcs',
        question: 'A végső kapun a felirat: Egy ötoldalú hasábnak hány lapja (L) és hány csúcsa (C) van? Mennyi a C + L összege?',
        options: ['17 (C = 10, L = 7)', '15 (C = 10, L = 5)', '12 (C = 6, L = 6)', '20 (C = 10, L = 10)'],
        correctAnswer: '17 (C = 10, L = 7)',
        figure: (
          <svg viewBox="0 0 90 75" className="w-28 h-20">
            {/* Golden master lock icon */}
            <rect x="25" y="30" width="40" height="32" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M 35 30 L 35 20 A 10 10 0 0 1 55 20 L 55 30" fill="none" stroke="#ca8a04" strokeWidth="2.5" />
            <circle cx="45" cy="44" r="3" fill="#854d0e" />
            <line x1="45" y1="47" x2="45" y2="54" stroke="#854d0e" strokeWidth="2" strokeLinecap="round" />
            <text x="45" y="70" textAnchor="middle" className="text-[6.5px] font-black fill-amber-900">MESTERKÓD: 17</text>
          </svg>
        ),
        explanation: 'Ötoldalú hasábnál: C = 2 · 5 = 10 csúcs, L = 5 + 2 = 7 lap. C + L = 10 + 7 = 17. (Élek száma: E = 3 · 5 = 15, és 17 = 15 + 2!). GRATULÁLUNK, KISZABADULTÁL!',
        hint: 'Alul 5 csúcs + felül 5 csúcs = 10. Lapok: 2 alap + 5 palást = 7. Összegük: 10 + 7 = 17.'
      }
    ]
  }
];

const cheatSheetCards = [
  {
    title: '1. Zár: Szögek & Átlók',
    formula: 'S_n = (n-2)·180° • d_n = n(n-3)/2',
    explanation: 'Külső szögek összege mindig 360°. Háromszög: 180°, négyszög: 360°, ötszög: 540°, hatszög: 720°.'
  },
  {
    title: '2. Zár: Területkódok',
    formula: 'T_△ = (a·m)/2 • T_trap = k·m',
    explanation: 'Paralelogramma: T = a·m. Deltoid & rombusz: T = (e·f)/2. Aranyhíd: 1 ha = 10 000 m².'
  },
  {
    title: '3. Zár: Térfogat & Euler',
    formula: 'V = T_a·M • C + L = E + 2',
    explanation: 'Kocka: V = a³, A = 6a². Folyadék: 1 dm³ = 1 liter = 1000 cm³. Euler: Csúcsok + Lapok = Élek + 2.'
  }
];

export const GeometryEscapeRoomQuiz: React.FC<GeometryEscapeRoomQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="11. Geometriai Szabadulószoba Kvíz"
      subtitle="Fejtsd meg a 3 titkos zár kódját geometriai számításokkal, és nyisd ki a szabaduló kaput!"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 🔐 11. SZABADULÓSZOBA"
      topicId="g7-geom-escape-room"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <GeometryEscapeRoomMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <GeometryEscapeRoomSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any) => (
        <GeometryEscapeRoomMatcher
          {...props}
          key={`escape-room-matcher-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(props: any) => (
        <GeometryEscapeRoomSorter
          {...props}
          key={`escape-room-sorter-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
