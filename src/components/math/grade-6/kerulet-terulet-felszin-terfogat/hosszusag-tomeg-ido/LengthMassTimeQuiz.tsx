import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { LengthMassTimeMatcher } from './LengthMassTimeMatcher';
import { LengthMassTimeSorter } from './LengthMassTimeSorter';

interface LengthMassTimeQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetContent: CheatSheetContent = {
  title: 'Szabálytár: Hosszúság, Tömeg, Idő',
  sections: [
    {
      title: '1. A mérés alapszabálya',
      content:
        'Mért mennyiség = Mérőszám × Mértékegység.\nHa a mértékegység kisebb lesz, a mérőszám annyiszor nagyobbodik (szorzás).\nHa a mértékegység nagyobb lesz, a mérőszám annyiszor kisebbé válik (osztás).'
    },
    {
      title: '2. Hosszúság mértékegységei',
      content:
        'Alapmértékegység: méter (m).\n1 km = 1000 m\n1 m = 10 dm = 100 cm = 1000 mm\n1 dm = 10 cm = 100 mm\n1 cm = 10 mm'
    },
    {
      title: '3. Tömeg mértékegységei',
      content:
        'Alapmértékegység: kilogramm (kg) és gramm (g).\n1 t (tonna) = 1000 kg = 10 q (mázsa)\n1 q (mázsa) = 100 kg\n1 kg = 100 dkg = 1000 g\n1 dkg = 10 g\n1 g = 1000 mg'
    },
    {
      title: '4. Idő mértékegységei (vegyes alapú)',
      content:
        '1 nap = 24 óra (h)\n1 h = 60 perc (min) = 3600 másodperc (s)\n1 min = 60 s\nFél óra = 30 perc = 0,5 h\nNegyed óra = 15 perc = 0,25 h\nHáromnegyed óra = 45 perc = 0,75 h\nVigyázat: 1,5 óra = 90 perc, nem 1 óra 50 perc!'
    }
  ]
};

// SVG Ábrák a releváns feladatokhoz (segítség, de NEM árulja el a végeredményt!)
const RulerSvg: React.FC = () => (
  <div className="flex justify-center my-2">
    <svg viewBox="0 0 320 60" className="w-full max-w-[280px] h-auto drop-shadow-xs">
      <rect x="10" y="10" width="300" height="40" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      {/* Skála vonalak */}
      {[...Array(11)].map((_, i) => (
        <g key={i}>
          <line x1={20 + i * 28} y1="10" x2={20 + i * 28} y2="30" stroke="#854d0e" strokeWidth="2" />
          <text x={20 + i * 28} y="44" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#854d0e">
            {i}
          </text>
        </g>
      ))}
      <text x="300" y="44" fontSize="10" fontWeight="bold" textAnchor="end" fill="#ca8a04">cm</text>
    </svg>
  </div>
);

const ScaleSvg: React.FC = () => (
  <div className="flex justify-center my-2">
    <svg viewBox="0 0 240 100" className="w-full max-w-[220px] h-auto drop-shadow-xs">
      {/* Alapzat és oszlop */}
      <rect x="100" y="80" width="40" height="12" rx="3" fill="#64748b" />
      <line x1="120" y1="25" x2="120" y2="80" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      {/* Kar */}
      <line x1="40" y1="30" x2="200" y2="30" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
      <circle cx="120" cy="30" r="5" fill="#0369a1" />
      {/* Bal serpenyő zsinórok és tálca */}
      <line x1="40" y1="30" x2="25" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="40" y1="30" x2="55" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M 20 65 Q 40 75 60 65 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      {/* Jobb serpenyő zsinórok és tálca */}
      <line x1="200" y1="30" x2="185" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="200" y1="30" x2="215" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M 180 65 Q 200 75 220 65 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      <text x="40" y="85" fontSize="10" fontWeight="bold" fill="#0369a1" textAnchor="middle">kg</text>
      <text x="200" y="85" fontSize="10" fontWeight="bold" fill="#0369a1" textAnchor="middle">g</text>
    </svg>
  </div>
);

const ClockDialSvg: React.FC = () => (
  <div className="flex justify-center my-2">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-xs">
      <circle cx="60" cy="60" r="54" fill="#f8fafc" stroke="#6366f1" strokeWidth="3" />
      {/* Óra jelölések */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 60 + 44 * Math.sin(angle);
        const y1 = 60 - 44 * Math.cos(angle);
        const x2 = 60 + 50 * Math.sin(angle);
        const y2 = 60 - 50 * Math.cos(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="2" />;
      })}
      {/* 14:25 mutatók: óramutató 2 és 3 között, percmutató 5-ösön */}
      <line x1="60" y1="60" x2="80" y2="48" stroke="#312e81" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="60" x2="85" y2="88" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="4" fill="#1e1b4b" />
    </svg>
  </div>
);

const ConversionArrowSvg: React.FC = () => (
  <div className="flex justify-center my-2">
    <svg viewBox="0 0 260 50" className="w-full max-w-[240px] h-auto drop-shadow-xs">
      <rect x="10" y="10" width="70" height="30" rx="6" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="45" y="29" fontSize="12" fontWeight="bold" fill="#0e7490" textAnchor="middle">óra (h)</text>
      
      {/* Nyíl jobbra */}
      <line x1="85" y1="25" x2="165" y2="25" stroke="#0891b2" strokeWidth="2" strokeDasharray="3,3" />
      <polygon points="165 21, 175 25, 165 29" fill="#0891b2" />
      <text x="127" y="19" fontSize="10" fontWeight="bold" fill="#0891b2" textAnchor="middle">× 60</text>

      <rect x="180" y="10" width="70" height="30" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="29" fontSize="12" fontWeight="bold" fill="#15803d" textAnchor="middle">perc (min)</text>
    </svg>
  </div>
);

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'lmt-q1',
    level: 1,
    question: 'Hány méter 5 kilométer ($5\\text{ km}$)?',
    options: ['$500\\text{ m}$', '$5000\\text{ m}$', '$50\\text{ m}$', '$50\\,000\\text{ m}$'],
    correctAnswer: 1,
    hint: 'A „kilo” előtag ezret jelent ($1\\text{ km} = 1000\\text{ m}$). Szorozz 1000-rel!',
    explanation: '$1\\text{ km} = 1000\\text{ m}$, így $5\\text{ km} = 5 \\times 1000\\text{ m} = 5000\\text{ m}$.'
  },
  {
    id: 'lmt-q2',
    level: 1,
    question: 'Hány centiméter $4{,}5\\text{ méter}$?',
    figure: <RulerSvg />,
    options: ['$45\\text{ cm}$', '$450\\text{ cm}$', '$4500\\text{ cm}$', '$4{,}50\\text{ cm}$'],
    correctAnswer: 1,
    hint: 'Egy méterben 100 centiméter van ($1\\text{ m} = 100\\text{ cm}$). Szorozd meg a 4,5-et 100-zal!',
    explanation: '$1\\text{ m} = 100\\text{ cm}$, így $4{,}5\\text{ m} = 4{,}5 \\times 100 = 450\\text{ cm}$.'
  },
  {
    id: 'lmt-q3',
    level: 1,
    question: 'Hány milliméter $8\\text{ cm}$?',
    options: ['$80\\text{ mm}$', '$800\\text{ mm}$', '$0{,}8\\text{ mm}$', '$8\\text{ mm}$'],
    correctAnswer: 0,
    hint: 'Gondolj az iskolai vonalzóra: minden centiméter 10 kis milliméteres beosztásra van osztva.',
    explanation: '$1\\text{ cm} = 10\\text{ mm}$, így $8\\text{ cm} = 8 \\times 10\\text{ mm} = 80\\text{ mm}$.'
  },
  {
    id: 'lmt-q4',
    level: 1,
    question: 'Hány kilogramm 3 tonna ($3\\text{ t}$)?',
    options: ['$300\\text{ kg}$', '$3000\\text{ kg}$', '$30\\text{ kg}$', '$30\\,000\\text{ kg}$'],
    correctAnswer: 1,
    hint: '1 tonna az 1000 kilogramm ($1\\text{ t} = 1000\\text{ kg}$).',
    explanation: '$1\\text{ t} = 1000\\text{ kg}$, ezért $3\\text{ t} = 3 \\times 1000 = 3000\\text{ kg}$.'
  },
  {
    id: 'lmt-q5',
    level: 1,
    question: 'Hány gramm $25\\text{ dkg}$ (dekagramm)?',
    figure: <ScaleSvg />,
    options: ['$250\\text{ g}$', '$2500\\text{ g}$', '$25\\text{ g}$', '$2{,}5\\text{ g}$'],
    correctAnswer: 0,
    hint: '$1\\text{ dkg} = 10\\text{ g}$. Szorozz 10-zel!',
    explanation: '$1\\text{ dkg} = 10\\text{ g}$, így $25\\text{ dkg} = 25 \\times 10 = 250\\text{ g}$.'
  },
  {
    id: 'lmt-q6',
    level: 1,
    question: 'Hány dekagramm $1{,}2\\text{ kg}$?',
    options: ['$12\\text{ dkg}$', '$120\\text{ dkg}$', '$1200\\text{ dkg}$', '$1{,}20\\text{ dkg}$'],
    correctAnswer: 1,
    hint: '$1\\text{ kg} = 100\\text{ dkg}$. Szorozz 100-zal!',
    explanation: '$1\\text{ kg} = 100\\text{ dkg}$, tehát $1{,}2\\text{ kg} = 1{,}2 \\times 100 = 120\\text{ dkg}$.'
  },
  {
    id: 'lmt-q7',
    level: 1,
    question: 'Hány perc 2 és fél óra ($2{,}5\\text{ h}$)?',
    figure: <ConversionArrowSvg />,
    options: ['$120\\text{ perc}$', '$150\\text{ perc}$', '$250\\text{ perc}$', '$130\\text{ perc}$'],
    correctAnswer: 1,
    hint: '2 óra az $2 \\times 60 = 120\\text{ perc}$. Fél óra az 30 perc.',
    explanation: '$2\\text{ h} = 120\\text{ perc}$, a fél óra ($0{,}5\\text{ h}$) pedig $30\\text{ perc}$. Összesen: $120 + 30 = 150\\text{ perc}$.'
  },
  {
    id: 'lmt-q8',
    level: 1,
    question: 'Hány másodperc 3 perc ($3\\text{ min}$)?',
    options: ['$180\\text{ s}$', '$300\\text{ s}$', '$150\\text{ s}$', '$30\\text{ s}$'],
    correctAnswer: 0,
    hint: 'Egy perc 60 másodperc. Szorozd meg a 3-at 60-nal!',
    explanation: '$1\\text{ min} = 60\\text{ s}$, így $3\\text{ min} = 3 \\times 60 = 180\\text{ másodperc (s)}$.'
  },
  {
    id: 'lmt-q9',
    level: 1,
    question: 'Hány óra egy nap fele (fél nap)?',
    options: ['$6\\text{ óra}$', '$12\\text{ óra}$', '$18\\text{ óra}$', '$10\\text{ óra}$'],
    correctAnswer: 1,
    hint: 'Egy teljes napban 24 óra van. Oszd el 2-vel!',
    explanation: 'Egy nap 24 órából áll, így a fele: $24 : 2 = 12\\text{ óra}$.'
  },
  {
    id: 'lmt-q10',
    level: 1,
    question: 'Melyik a nagyobb mennyiség: $450\\text{ g}$ vagy $0{,}5\\text{ kg}$?',
    options: [
      '$0{,}5\\text{ kg}$ a nagyobb',
      '$450\\text{ g}$ a nagyobb',
      'Pontosan egyenlőek',
      'Nem összehasonlíthatóak'
    ],
    correctAnswer: 0,
    hint: 'Váltsd át a $0{,}5\\text{ kg}$-ot grammba: $0{,}5 \\times 1000 = 500\\text{ g}$.',
    explanation: '$0{,}5\\text{ kg} = 500\\text{ g}$. Mivel $500\\text{ g} > 450\\text{ g}$, ezért $0{,}5\\text{ kg}$ a nagyobb.'
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ==========================================
  {
    id: 'lmt-q11',
    level: 2,
    question: 'Hány kilométer $3200\\text{ méter}$?',
    options: ['$32\\text{ km}$', '$3{,}2\\text{ km}$', '$0{,}32\\text{ km}$', '$320\\text{ km}$'],
    correctAnswer: 1,
    hint: 'Kisebb mértékegységről váltunk nagyobbra (m-ről km-re), ezért osztunk 1000-rel.',
    explanation: '$3200\\text{ m} = 3200 : 1000 = 3{,}2\\text{ km}$.'
  },
  {
    id: 'lmt-q12',
    level: 2,
    question: 'Hány deciméter $0{,}75\\text{ méter}$?',
    options: ['$75\\text{ dm}$', '$7{,}5\\text{ dm}$', '$0{,}075\\text{ dm}$', '$750\\text{ dm}$'],
    correctAnswer: 1,
    hint: '$1\\text{ m} = 10\\text{ dm}$. Szorozz 10-zel (a tizedesvessző egy helyiértékkel jobbra lép).',
    explanation: '$0{,}75\\text{ m} = 0{,}75 \\times 10 = 7{,}5\\text{ dm}$.'
  },
  {
    id: 'lmt-q13',
    level: 2,
    question: 'Hány méter $650\\text{ milliméter}$?',
    options: ['$6{,}5\\text{ m}$', '$0{,}65\\text{ m}$', '$0{,}065\\text{ m}$', '$65\\text{ m}$'],
    correctAnswer: 1,
    hint: '$1\\text{ m} = 1000\\text{ mm}$. Oszd el a 650-et 1000-rel!',
    explanation: '$1\\text{ m} = 1000\\text{ mm}$, így $650\\text{ mm} = 650 : 1000 = 0{,}65\\text{ m}$.'
  },
  {
    id: 'lmt-q14',
    level: 2,
    question: 'Hány mázsa ($q$) $450\\text{ kg}$?',
    options: ['$45\\text{ q}$', '$4{,}5\\text{ q}$', '$0{,}45\\text{ q}$', '$4500\\text{ q}$'],
    correctAnswer: 1,
    hint: '1 mázsa pontosan 100 kilogramm ($1\\text{ q} = 100\\text{ kg}$). Oszd el 100-zal!',
    explanation: '$1\\text{ q} = 100\\text{ kg}$, ezért $450\\text{ kg} = 450 : 100 = 4{,}5\\text{ q}$.'
  },
  {
    id: 'lmt-q15',
    level: 2,
    question: 'Hány tonna $750\\text{ kilogramm}$?',
    options: ['$7{,}5\\text{ t}$', '$0{,}75\\text{ t}$', '$75\\text{ t}$', '$0{,}075\\text{ t}$'],
    correctAnswer: 1,
    hint: '1 tonna = 1000 kg. Oszd el a 750-et 1000-rel!',
    explanation: '$750\\text{ kg} = 750 : 1000 = 0{,}75\\text{ t}$ (háromnegyed tonna).'
  },
  {
    id: 'lmt-q16',
    level: 2,
    question: 'Hány kilogramm $1\\text{ t } 3\\text{ q } 50\\text{ kg}$ összesen?',
    options: ['$1350\\text{ kg}$', '$1450\\text{ kg}$', '$135\\text{ kg}$', '$1035\\text{ kg}$'],
    correctAnswer: 0,
    hint: 'Válts át minden tagot kg-ba: $1\\text{ t} = 1000\\text{ kg}$, $3\\text{ q} = 300\\text{ kg}$, plusz még $50\\text{ kg}$.',
    explanation: '$1\\text{ t} = 1000\\text{ kg}$, $3\\text{ q} = 300\\text{ kg}$. Összeadva: $1000 + 300 + 50 = 1350\\text{ kg}$.'
  },
  {
    id: 'lmt-q17',
    level: 2,
    question: 'Hány óra $1\\text{ óra } 45\\text{ perc}$ tizedestört alakban felírva?',
    figure: <ConversionArrowSvg />,
    options: ['$1{,}45\\text{ óra}$', '$1{,}75\\text{ óra}$', '$1{,}3\\text{ óra}$', '$1{,}5\\text{ óra}$'],
    correctAnswer: 1,
    hint: 'A 45 perc a 60 perc háromnegyed része: $\\frac{45}{60} = \\frac{3}{4} = 0{,}75$.',
    explanation: '45 perc az óra $\\frac{45}{60} = 0{,}75$ része. Így $1\\text{ óra } 45\\text{ perc} = 1{,}75\\text{ óra}$. (Vigyázat: nem 1,45!)'
  },
  {
    id: 'lmt-q18',
    level: 2,
    question: 'Hány másodperc pontosan 1 óra ($1\\text{ h}$)?',
    options: ['$600\\text{ s}$', '$3600\\text{ s}$', '$1200\\text{ s}$', '$60\\,000\\text{ s}$'],
    correctAnswer: 1,
    hint: '1 órában 60 perc van, és minden perc 60 másodperc. Szorozd össze: $60 \\times 60$.',
    explanation: '$1\\text{ h} = 60\\text{ min} = 60 \\times 60\\text{ s} = 3600\\text{ s}$.'
  },
  {
    id: 'lmt-q19',
    level: 2,
    question: 'Anna vonata 14:25-kor indul és 16:10-kor ér célba. Hány percig tart az utazás?',
    figure: <ClockDialSvg />,
    options: ['$95\\text{ perc}$', '$105\\text{ perc}$', '$115\\text{ perc}$', '$85\\text{ perc}$'],
    correctAnswer: 1,
    hint: '14:25-től 15:00-ig 35 perc telik el. 15:00-tól 16:10-ig 70 perc. Add össze!',
    explanation: '14:25-től 15:00-ig: 35 perc. 15:00-tól 16:10-ig: 1 óra 10 perc = 70 perc. Összesen: $35 + 70 = 105\\text{ perc}$ (1 óra 45 perc).'
  },
  {
    id: 'lmt-q20',
    level: 2,
    question: 'Melyik a leghosszabb a felsoroltak közül?',
    options: ['$2500\\text{ mm}$', '$26\\text{ dm}$', '$0{,}003\\text{ km}$', '$2{,}4\\text{ m}$'],
    correctAnswer: 2,
    hint: 'Válts át mindent méterbe: $2500\\text{ mm} = 2{,}5\\text{ m}$, $26\\text{ dm} = 2{,}6\\text{ m}$, $0{,}003\\text{ km} = 3\\text{ m}$.',
    explanation: 'Közös egységben (m):\n• $2500\\text{ mm} = 2{,}5\\text{ m}$\n• $26\\text{ dm} = 2{,}6\\text{ m}$\n• $0{,}003\\text{ km} = 3\\text{ m}$\n• $2{,}4\\text{ m}$\nA leghosszabb a $0{,}003\\text{ km} = 3\\text{ m}$.'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ==========================================
  {
    id: 'lmt-q21',
    level: 3,
    question: 'Egy futó percenként $250\\text{ métert}$ tesz meg. Hány kilométert fut fél óra alatt?',
    options: ['$5\\text{ km}$', '$7{,}5\\text{ km}$', '$10\\text{ km}$', '$6{,}5\\text{ km}$'],
    correctAnswer: 1,
    hint: 'Fél óra = 30 perc. Számold ki a teljes métert ($30 \\times 250\\text{ m}$), majd váltsd át km-be!',
    explanation: '30 perc alatt megtett út: $30 \\times 250\\text{ m} = 7500\\text{ m}$. Kilométerbe váltva: $7500 : 1000 = 7{,}5\\text{ km}$.'
  },
  {
    id: 'lmt-q22',
    level: 3,
    question: 'Egy teherautó rakománya: 12 zsák búza (egyenként $50\\text{ kg}$) és 4 mázsa kukorica. Hány tonna a teljes rakomány tömege?',
    figure: <ScaleSvg />,
    options: ['$0{,}8\\text{ t}$', '$1\\text{ t}$', '$1{,}2\\text{ t}$', '$10\\text{ t}$'],
    correctAnswer: 1,
    hint: '12 zsák búza: $12 \\times 50 = 600\\text{ kg}$. 4 mázsa = $400\\text{ kg}$. Add össze és váltsd tonnába!',
    explanation: 'Búza tömege: $12 \\times 50\\text{ kg} = 600\\text{ kg}$. Kukorica tömege: $4\\text{ q} = 400\\text{ kg}$. Össztömeg: $600 + 400 = 1000\\text{ kg} = 1\\text{ t}$.'
  },
  {
    id: 'lmt-q23',
    level: 3,
    question: 'Mennyi az eredmény milliméterben: $0{,}04\\text{ m} + 3{,}5\\text{ cm}$?',
    options: ['$75\\text{ mm}$', '$39\\text{ mm}$', '$7{,}5\\text{ mm}$', '$390\\text{ mm}$'],
    correctAnswer: 0,
    hint: '$0{,}04\\text{ m} = 0{,}04 \\times 1000 = 40\\text{ mm}$. $3{,}5\\text{ cm} = 35\\text{ mm}$.',
    explanation: '$0{,}04\\text{ m} = 40\\text{ mm}$, $3{,}5\\text{ cm} = 35\\text{ mm}$. Összeadva: $40 + 35 = 75\\text{ mm}$.'
  },
  {
    id: 'lmt-q24',
    level: 3,
    question: 'Egy süteményhez $0{,}35\\text{ kg}$ liszt, $15\\text{ dkg}$ cukor és $50\\text{ g}$ vaj kell. Hány gramm a három hozzávaló együttes tömege?',
    options: ['$550\\text{ g}$', '$450\\text{ g}$', '$600\\text{ g}$', '$505\\text{ g}$'],
    correctAnswer: 0,
    hint: 'Válts át mindent grammba: $0{,}35\\text{ kg} = 350\\text{ g}$, $15\\text{ dkg} = 150\\text{ g}$.',
    explanation: 'Liszt: $350\\text{ g}$, cukor: $150\\text{ g}$, vaj: $50\\text{ g}$. Összesen: $350 + 150 + 50 = 550\\text{ g}$.'
  },
  {
    id: 'lmt-q25',
    level: 3,
    question: 'Egy gyalogtúra három szakaszból áll: $4{,}2\\text{ km}$, $3800\\text{ m}$ és $5500\\text{ m}$. Hány kilométer a teljes táv?',
    options: ['$13{,}5\\text{ km}$', '$12{,}5\\text{ km}$', '$14\\text{ km}$', '$13\\text{ km}$'],
    correctAnswer: 0,
    hint: 'Váltsd át a métereket kilométerbe: $3800\\text{ m} = 3{,}8\\text{ km}$ és $5500\\text{ m} = 5{,}5\\text{ km}$.',
    explanation: 'A távok km-ben: $4{,}2\\text{ km} + 3{,}8\\text{ km} + 5{,}5\\text{ km} = 13{,}5\\text{ km}$.'
  },
  {
    id: 'lmt-q26',
    level: 3,
    question: 'Hány másodperc $2\\text{ óra } 15\\text{ perc } 30\\text{ másodperc}$?',
    options: ['$8130\\text{ s}$', '$7830\\text{ s}$', '$8250\\text{ s}$', '$7230\\text{ s}$'],
    correctAnswer: 0,
    hint: '2 óra = $2 \\times 3600 = 7200\\text{ s}$. 15 perc = $15 \\times 60 = 900\\text{ s}$. Plusz még 30 s.',
    explanation: '$2\\text{ h} = 7200\\text{ s}$, $15\\text{ min} = 900\\text{ s}$. Összesen: $7200 + 900 + 30 = 8130\\text{ s}$.'
  },
  {
    id: 'lmt-q27',
    level: 3,
    question: 'Egy 12 méteres szalagból levágnak 8 darab $45\\text{ cm}$-es és 4 darab $1{,}2\\text{ m}$-es darabot. Hány méter szalag marad?',
    figure: <RulerSvg />,
    options: ['$3{,}6\\text{ m}$', '$4{,}2\\text{ m}$', '$2{,}8\\text{ m}$', '$4{,}6\\text{ m}$'],
    correctAnswer: 0,
    hint: '8 darab 45 cm = $360\\text{ cm} = 3{,}6\\text{ m}$. 4 darab 1,2 m = $4{,}8\\text{ m}$. Vond ki a 12-ből!',
    explanation: 'Levágott részek: $8 \\times 0{,}45\\text{ m} = 3{,}6\\text{ m}$, és $4 \\times 1{,}2\\text{ m} = 4{,}8\\text{ m}$. Összesen levágtak: $3{,}6 + 4{,}8 = 8{,}4\\text{ m}$. Marad: $12 - 8{,}4 = 3{,}6\\text{ m}$.'
  },
  {
    id: 'lmt-q28',
    level: 3,
    question: 'Egy csiga percenként $15\\text{ cm}$-t halad. Hány métert tesz meg 2 óra alatt egyenletes sebességgel?',
    options: ['$18\\text{ m}$', '$30\\text{ m}$', '$1{,}8\\text{ m}$', '$36\\text{ m}$'],
    correctAnswer: 0,
    hint: '2 óra az $2 \\times 60 = 120\\text{ perc}$. Szorozd össze: $120 \\times 15\\text{ cm}$, majd váltsd méterbe!',
    explanation: '120 perc alatt: $120 \\times 15\\text{ cm} = 1800\\text{ cm}$. Méterbe váltva ($: 100$): $18\\text{ m}$.'
  },
  {
    id: 'lmt-q29',
    level: 3,
    question: 'Ha $0{,}6\\text{ kg}$ sajt $2400\\text{ Ft}$-ba kerül, hány forintba kerül $15\\text{ dkg}$ ugyanabból a sajtból?',
    figure: <ScaleSvg />,
    options: ['$600\\text{ Ft}$', '$400\\text{ Ft}$', '$800\\text{ Ft}$', '$750\\text{ Ft}$'],
    correctAnswer: 0,
    hint: '$0{,}6\\text{ kg} = 60\\text{ dkg}$. Ha 60 dkg 2400 Ft, akkor 1 dkg = 40 Ft. Szorozz 15-tel!',
    explanation: '$0{,}6\\text{ kg} = 60\\text{ dkg} = 2400\\text{ Ft}$. 1 dkg sajt: $2400 : 60 = 40\\text{ Ft}$. 15 dkg ára: $15 \\times 40 = 600\\text{ Ft}$.'
  },
  {
    id: 'lmt-q30',
    level: 3,
    question: 'Egy kerékpáros sebessége $18\\text{ km/h}$. Hány métert tesz meg 1 másodperc alatt?',
    options: ['$5\\text{ m}$', '$3\\text{ m}$', '$18\\text{ m}$', '$0{,}5\\text{ m}$'],
    correctAnswer: 0,
    hint: '$18\\text{ km} = 18\\,000\\text{ m}$, 1 óra pedig $3600\\text{ s}$. Oszd el a métereket a másodpercekkel!',
    explanation: '$18\\text{ km/h} = \\frac{18\\,000\\text{ m}}{3600\\text{ s}} = \\frac{180}{36} = 5\\text{ m/s}$. Tehát 1 másodperc alatt 5 métert tesz meg.'
  }
];

export const LengthMassTimeQuiz: React.FC<LengthMassTimeQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Hosszúság, tömeg, idő Kvíz"
      subtitle="Mértékegységek átváltása, tizedestörtek és összetett gyakorlati feladatok"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      topicId="g6-length-mass-time-quiz"
      topicTitle="Hosszúság, tömeg, idő"
      questions={questions}
      cheatSheet={cheatSheetContent}
      matcherComponent={LengthMassTimeMatcher}
      sorterComponent={LengthMassTimeSorter}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default LengthMassTimeQuiz;
