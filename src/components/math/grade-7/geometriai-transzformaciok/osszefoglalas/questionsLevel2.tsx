import React from 'react';
import { Question } from '../QuizTemplate';

export const summaryQuestionsLevel2: Question[] = [
  {
    id: 'sum-31',
    level: 2,
    question: 'Egy háromszög két belső szöge α = 54° és β = 68°. Mekkora a harmadik belső szög (γ)?',
    options: [
      '58° (mivel 180° - (54° + 68°) = 58°)',
      '68°',
      '48°',
      '62°'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög belső szögeinek összege 180°. γ = 180° - 54° - 68° = 58°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,70 130,70 75,20" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
        <text x="44" y="66" className="text-[8px] font-bold fill-teal-800">54°</text>
        <text x="106" y="66" className="text-[8px] font-bold fill-teal-800">68°</text>
        <text x="75" y="34" className="text-[9px] font-black fill-rose-600">γ = ?</text>
      </svg>
    )
  },
  {
    id: 'sum-32',
    level: 2,
    question: 'Egy egyenlő szárú háromszög szárszöge 40°. Mekkorák az alapon fekvő szögei?',
    options: [
      '70° és 70° (mivel (180° - 40°) / 2 = 70°)',
      '60° és 60°',
      '50° és 50°',
      '40° és 100°'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenlő szárú háromszög alapjain fekvő szögek egyenlők: α = (180° - 40°) / 2 = 140° / 2 = 70°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="40,70 120,70 80,15" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
        <text x="80" y="32" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">40°</text>
        <text x="50" y="66" className="text-[8px] font-bold fill-amber-800">α</text>
        <text x="105" y="66" className="text-[8px] font-bold fill-amber-800">α</text>
      </svg>
    )
  },
  {
    id: 'sum-33',
    level: 2,
    question: 'Egy egyenlő szárú háromszög egyik alapon fekvő szöge 55°. Mekkora a szárszöge?',
    options: [
      '70° (mivel 180° - 2 · 55° = 70°)',
      '55°',
      '80°',
      '65°'
    ],
    correctAnswer: 0,
    explanation: 'A két alapszög összege 55° + 55° = 110°. A szárszög: 180° - 110° = 70°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="40,70 120,70 80,20" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
        <text x="50" y="66" className="text-[8px] font-bold fill-amber-800">55°</text>
        <text x="102" y="66" className="text-[8px] font-bold fill-amber-800">55°</text>
        <text x="80" y="36" textAnchor="middle" className="text-[9px] font-black fill-rose-600">?</text>
      </svg>
    )
  },
  {
    id: 'sum-34',
    level: 2,
    question: 'Mekkora a háromszög külső szöge a nem mellette fekvő két belső szög ismeretében?',
    options: [
      'Egyenlő a két nem mellette fekvő belső szög összegével (α\' = β + γ)',
      'Egyenlő a mellette fekvő belső szöggel',
      'Mindig pontosan 90°',
      'Egyenlő a három belső szög különbségével'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög bármely külső szöge egyenlő a két nem mellette fekvő belső szög összegével: α\' = 180° - α = β + γ.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="35,65 110,65 75,25" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <line x1="110" y1="65" x2="145" y2="65" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M 125 65 A 15 15 0 0 0 119 55" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <text x="126" y="58" className="text-[8px] font-bold fill-rose-600">α'</text>
        <text x="80" y="78" textAnchor="middle" className="text-[8px] font-bold fill-sky-800">α' = β + γ</text>
      </svg>
    )
  },
  {
    id: 'sum-35',
    level: 2,
    question: 'Szerkeszthető-e háromszög az a = 4 cm, b = 7 cm és c = 12 cm oldalhosszakkal?',
    options: [
      'Nem, mert sérül a háromszög-egyenlőtlenség (4 + 7 = 11 < 12)',
      'Igen, mert minden oldal pozitív szám',
      'Igen, mert derékszögű háromszöget ad',
      'Igen, két különböző háromszög is szerkeszthető'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög-egyenlőtlenség szerint bármely két oldal összege nagyobb kell legyen a harmadiknál. Mivel 4 + 7 = 11 < 12, a körívek nem metszik egymást.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="55" x2="140" y2="55" stroke="#475569" strokeWidth="2" />
        <path d="M 20 55 A 40 40 0 0 1 50 25" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <path d="M 140 55 A 50 50 0 0 0 100 20" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <text x="80" y="42" textAnchor="middle" className="text-[8px] font-black fill-rose-600">4 + 7 &lt; 12 (0 db)</text>
      </svg>
    )
  },
  {
    id: 'sum-36',
    level: 2,
    question: 'Egy paralelogramma egyik belső szöge 72°. Mekkora a mellette lévő szomszédos belső szög?',
    options: [
      '108° (mivel a szomszédos szögek társszögek: 180° - 72° = 108°)',
      '72°',
      '18°',
      '118°'
    ],
    correctAnswer: 0,
    explanation: 'A paralelogramma szomszédos belső szögei párhuzamos szárak közé eső társszögek, ezért összegük mindig 180°: 180° - 72° = 108°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,65 110,65 130,25 50,25" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
        <text x="44" y="60" className="text-[9px] font-bold fill-teal-700">72°</text>
        <text x="105" y="60" className="text-[9px] font-bold fill-amber-700">108°</text>
      </svg>
    )
  },
  {
    id: 'sum-37',
    level: 2,
    question: 'Milyen tulajdonságúak egy rombusz átlói egymáshoz képest?',
    options: [
      'Merőlegesek egymásra és felezik egymást',
      'Egyenlő hosszúak és nem merőlegesek',
      'Párhuzamosak egymással',
      'Nem metszik egymást'
    ],
    correctAnswer: 0,
    explanation: 'A rombusz átlói merőlegesen felezik egymást, és egyben felezik a rombusz belső szögeit is.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,15 130,45 80,75 30,45" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2" />
        <line x1="80" y1="15" x2="80" y2="75" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="30" y1="45" x2="130" y2="45" stroke="#ef4444" strokeWidth="1.5" />
        {/* Hungarian right angle: circular arc + dot */}
        <path d="M 80 38 A 7 7 0 0 1 87 45" fill="none" stroke="#ef4444" strokeWidth="1" />
        <circle cx="83.5" cy="41.5" r="0.8" fill="#ef4444" />
      </svg>
    )
  },
  {
    id: 'sum-38',
    level: 2,
    question: 'Melyik állítás igaz a téglalap átlóira?',
    options: [
      'Egyenlő hosszúak és felezik egymást',
      'Merőlegesek egymásra és egyenlőtlenek',
      'Felezik a téglalap belső szögeit',
      'Különböző hosszúságúak'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap átlói mindig egyenlő hosszúak és felezik egymást (de általában nem merőlegesek egymásra, csak ha négyzetről van szó).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <rect x="35" y="25" width="90" height="40" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <line x1="35" y1="65" x2="125" y2="25" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="35" y1="25" x2="125" y2="65" stroke="#0284c7" strokeWidth="1.5" />
        <circle cx="80" cy="45" r="2.5" fill="#0284c7" />
        <text x="80" y="80" textAnchor="middle" className="text-[8px] font-bold fill-sky-800">e = f (egyenlők)</text>
      </svg>
    )
  },
  {
    id: 'sum-39',
    level: 2,
    question: 'Egy deltoid átlói e = 8 cm és f = 6 cm. Milyen szögben metszik egymást az átlók?',
    options: [
      '90°-os derékszögben',
      '60°-os szögben',
      '45°-os szögben',
      '120°-os tompaszögben'
    ],
    correctAnswer: 0,
    explanation: 'A deltoid tengelyes szimmetriája miatt az átlói mindig merőlegesek egymásra (90°-ot zárnak be).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,15 120,45 80,75 40,45" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
        <line x1="80" y1="15" x2="80" y2="75" stroke="#e11d48" strokeWidth="1.5" />
        <line x1="40" y1="45" x2="120" y2="45" stroke="#e11d48" strokeWidth="1.5" />
        {/* Hungarian right angle: circular arc + dot */}
        <path d="M 80 37 A 8 8 0 0 1 88 45" fill="none" stroke="#e11d48" strokeWidth="1" />
        <circle cx="84" cy="41" r="0.9" fill="#e11d48" />
      </svg>
    )
  },
  {
    id: 'sum-40',
    level: 2,
    question: 'Egy háromszög egyik súlyvonalának hossza s = 15 cm. Milyen hosszú a csúcs felőli és az oldal felőli darabja?',
    options: [
      'Csúcs felőli: 10 cm, oldal felőli: 5 cm (2 : 1 arány)',
      'Mindkét darab 7,5 cm (felezik egymást)',
      'Csúcs felőli: 12 cm, oldal felőli: 3 cm',
      'Csúcs felőli: 5 cm, oldal felőli: 10 cm'
    ],
    correctAnswer: 0,
    explanation: 'A súlypont a súlyvonalat 2 : 1 arányban osztja: 15 / 3 = 5 cm (1 rész), így a csúcs felőli rész 2 · 5 = 10 cm, az oldal felőli 5 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="70" x2="130" y2="20" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="96" cy="37" r="3" fill="#e11d48" />
        <text x="60" y="58" className="text-[8px] font-bold fill-purple-700">10 cm</text>
        <text x="110" y="26" className="text-[8px] font-bold fill-purple-700">5 cm</text>
        <text x="96" y="31" className="text-[9px] font-black fill-rose-600">S</text>
      </svg>
    )
  },
  {
    id: 'sum-41',
    level: 2,
    question: 'Egy háromszög c oldala 16 cm hosszú. Milyen hosszú a c oldallal párhuzamos középvonal (k)?',
    options: [
      '8 cm (mivel k = c / 2 = 16 / 2 = 8 cm)',
      '16 cm',
      '4 cm',
      '32 cm'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög középvonala összeköti két oldal felezőpontját, párhuzamos a harmadik oldallal és hossza pontosan fele annak: k = c / 2 = 8 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="25,70 135,70 80,20" fill="none" stroke="#475569" strokeWidth="2" />
        <line x1="52.5" y1="45" x2="107.5" y2="45" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 2" />
        <text x="80" y="40" textAnchor="middle" className="text-[9px] font-bold fill-teal-700">k = 8 cm</text>
        <text x="80" y="82" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">c = 16 cm</text>
      </svg>
    )
  },
  {
    id: 'sum-42',
    level: 2,
    question: 'Egy derékszögű háromszög átfogója c = 10 cm. Mekkora a köré írt kör sugara (r)?',
    options: [
      '5 cm (az átfogó fele, Thalész-tétel miatt: r = c / 2)',
      '10 cm',
      '2,5 cm',
      '7,5 cm'
    ],
    correctAnswer: 0,
    explanation: 'A Thalész-tétel szerint a derékszögű háromszög köré írt körének középpontja az átfogó felezőpontja, így a sugár az átfogó fele: r = 10 / 2 = 5 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <path d="M 30 65 A 45 45 0 0 1 120 65" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 2" />
        <polygon points="30,65 120,65 65,27" fill="none" stroke="#475569" strokeWidth="2" />
        <circle cx="75" cy="65" r="2.5" fill="#0ea5e9" />
        {/* Hungarian right angle: circular arc + dot */}
        <path d="M 61 34 A 7 7 0 0 0 71 31" fill="none" stroke="#e11d48" strokeWidth="1" />
        <circle cx="65" cy="33" r="0.8" fill="#e11d48" />
        <text x="75" y="78" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">r = 5 cm</text>
      </svg>
    )
  },
  {
    id: 'sum-43',
    level: 2,
    question: 'Hol található a tompaszögű háromszög magasságpontja (M)?',
    options: [
      'A háromszögön kívül',
      'A háromszög belsejében',
      'A leghosszabb oldal felezőpontján',
      'A tompaszögű csúcsban'
    ],
    correctAnswer: 0,
    explanation: 'Tompaszögű háromszögben a hegyesszögekből húzott magasságok csak az oldalak meghosszabbítására bocsáthatók, így metszéspontjuk a háromszögön kívülre esik.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="45,65 110,65 135,40" fill="none" stroke="#475569" strokeWidth="1.8" />
        <circle cx="20" cy="20" r="3" fill="#e11d48" />
        <text x="24" y="24" className="text-[9px] font-bold fill-rose-600">M (kívül)</text>
      </svg>
    )
  },
  {
    id: 'sum-44',
    level: 2,
    question: 'Hol található a derékszögű háromszög magasságpontja (M)?',
    options: [
      'Pontosan a derékszögű csúcsban',
      'Az átfogó felezőpontján',
      'A háromszög belsejében',
      'A háromszögön kívül'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszög két befogója maga is magasságvonal, így metszéspontjuk pontosan a derékszögű csúcs.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="40,65 120,65 40,25" fill="none" stroke="#475569" strokeWidth="2" />
        <circle cx="40" cy="65" r="3.5" fill="#e11d48" />
        <text x="26" y="75" className="text-[9px] font-bold fill-rose-600">M</text>
        {/* Hungarian right angle: circular arc + dot */}
        <path d="M 40 57 A 8 8 0 0 1 48 65" fill="none" stroke="#475569" strokeWidth="1" />
        <circle cx="43.5" cy="61.5" r="0.8" fill="#475569" />
      </svg>
    )
  },
  {
    id: 'sum-45',
    level: 2,
    question: 'Melyik három nevezetes pont fekszik egy egyenesen (az Euler-egyenesen) minden háromszögben?',
    options: [
      'A magasságpont (M), a súlypont (S) és a köré írt kör középpontja (O)',
      'A beírt kör középpontja (I), a súlypont (S) és a magasságpont (M)',
      'A három csúcspont',
      'A három oldalfelező pont'
    ],
    correctAnswer: 0,
    explanation: 'Leonhard Euler tétele kimondja, hogy az M, S és O pontok mindig egy egyenesre esnek, és |MS| = 2 · |SO|.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="25" y1="65" x2="135" y2="25" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="40" cy="60" r="3" fill="#e11d48" />
        <circle cx="80" cy="45" r="3" fill="#7c3aed" />
        <circle cx="120" cy="30" r="3" fill="#0d9488" />
        <text x="35" y="73" className="text-[8px] font-bold fill-rose-600">M</text>
        <text x="76" y="58" className="text-[8px] font-bold fill-purple-700">S</text>
        <text x="117" y="43" className="text-[8px] font-bold fill-teal-700">O</text>
      </svg>
    )
  },
  {
    id: 'sum-46',
    level: 2,
    question: 'Mennyi a belső szögek összege egy tetszőleges konvex n-oldalú sokszögben?',
    options: [
      '(n - 2) · 180°',
      'n · 180°',
      '(n - 3) · 180°',
      '360° / n'
    ],
    correctAnswer: 0,
    explanation: 'Bármely konvex n-szög egy csúcsból induló átlókkal n - 2 darab háromszögre bontható, így szögösszege (n - 2) · 180°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,15 125,35 110,75 50,75 35,35" fill="#f8fafc" stroke="#475569" strokeWidth="1.8" />
        <text x="80" y="52" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">(n - 2) · 180°</text>
      </svg>
    )
  },
  {
    id: 'sum-47',
    level: 2,
    question: 'Mekkora egy szabályos ötszög egyetlen belső szöge?',
    options: [
      '108° (mivel (5 - 2) · 180° / 5 = 540° / 5 = 108°)',
      '120°',
      '72°',
      '90°'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos ötszög belső szögösszege (5 - 2) · 180° = 540°. 5 egyenlő szög esetén egy szög: 540° / 5 = 108°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,18 120,38 108,72 52,72 40,38" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
        <text x="80" y="50" textAnchor="middle" className="text-[10px] font-black fill-teal-900">108°</text>
      </svg>
    )
  },
  {
    id: 'sum-48',
    level: 2,
    question: 'Mekkora egy szabályos hatszög egyetlen belső szöge?',
    options: [
      '120° (mivel (6 - 2) · 180° / 6 = 720° / 6 = 120°)',
      '108°',
      '135°',
      '60°'
    ],
    correctAnswer: 0,
    explanation: 'A hatszög belső szögösszege (6 - 2) · 180° = 720°. Egy belső szög: 720° / 6 = 120°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,15 115,30 115,60 80,75 45,60 45,30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="80" y="48" textAnchor="middle" className="text-[10px] font-black fill-amber-900">120°</text>
      </svg>
    )
  },
  {
    id: 'sum-49',
    level: 2,
    question: 'Mekkora egy szabályos nyolcszög egyetlen belső szöge?',
    options: [
      '135° (mivel (8 - 2) · 180° / 8 = 1080° / 8 = 135°)',
      '120°',
      '140°',
      '150°'
    ],
    correctAnswer: 0,
    explanation: 'A nyolcszög belső szögösszege 6 · 180° = 1080°. Egy belső szög: 1080° / 8 = 135°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="65,15 95,15 118,38 118,68 95,85 65,85 42,68 42,38" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
        <text x="80" y="54" textAnchor="middle" className="text-[10px] font-black fill-indigo-900">135°</text>
      </svg>
    )
  },
  {
    id: 'sum-50',
    level: 2,
    question: 'Hány átló húzható egy konvex n-szög egyetlen csúcsából?',
    options: [
      'n - 3 darab',
      'n - 2 darab',
      'n darab',
      '(n - 3) / 2 darab'
    ],
    correctAnswer: 0,
    explanation: 'Egy csúcsból nem húzható átló önmagába és a 2 szomszédos csúcsba (mert azok oldalak), így n - 3 darab átló indulhat.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,18 120,40 105,75 55,75 40,40" fill="none" stroke="#475569" strokeWidth="1.8" />
        <line x1="80" y1="18" x2="105" y2="75" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="80" y1="18" x2="55" y2="75" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="80" cy="18" r="2.5" fill="#ef4444" />
        <text x="80" y="50" textAnchor="middle" className="text-[9px] font-bold fill-rose-600">d = n - 3</text>
      </svg>
    )
  },
  {
    id: 'sum-51',
    level: 2,
    question: 'Hány darab átlója van összesen egy konvex ötszögnek?',
    options: [
      '5 darab (mivel (5 · (5 - 3)) / 2 = 10 / 2 = 5)',
      '10 darab',
      '2 darab',
      '8 darab'
    ],
    correctAnswer: 0,
    explanation: 'Az összes átló képlete: D = n(n - 3)/2 = 5 · 2 / 2 = 5 darab átló.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,18 120,40 105,75 55,75 40,40" fill="none" stroke="#475569" strokeWidth="1.5" />
        <line x1="80" y1="18" x2="105" y2="75" stroke="#7c3aed" strokeWidth="1.2" />
        <line x1="80" y1="18" x2="55" y2="75" stroke="#7c3aed" strokeWidth="1.2" />
        <line x1="120" y1="40" x2="55" y2="75" stroke="#7c3aed" strokeWidth="1.2" />
        <line x1="120" y1="40" x2="40" y2="40" stroke="#7c3aed" strokeWidth="1.2" />
        <line x1="105" y1="75" x2="40" y2="40" stroke="#7c3aed" strokeWidth="1.2" />
      </svg>
    )
  },
  {
    id: 'sum-52',
    level: 2,
    question: 'Hány darab átlója van összesen egy konvex hatszögnek?',
    options: [
      '9 darab (mivel (6 · 3) / 2 = 9)',
      '6 darab',
      '12 darab',
      '18 darab'
    ],
    correctAnswer: 0,
    explanation: 'Az összes átló száma: D = n(n - 3) / 2 = 6 · 3 / 2 = 9 darab.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,18 115,32 115,60 80,74 45,60 45,32" fill="none" stroke="#475569" strokeWidth="1.8" />
        <line x1="80" y1="18" x2="80" y2="74" stroke="#0ea5e9" strokeWidth="1.2" />
        <line x1="115" y1="32" x2="45" y2="60" stroke="#0ea5e9" strokeWidth="1.2" />
        <line x1="115" y1="60" x2="45" y2="32" stroke="#0ea5e9" strokeWidth="1.2" />
        <text x="80" y="86" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">D = 9 db</text>
      </svg>
    )
  },
  {
    id: 'sum-53',
    level: 2,
    question: 'Mikor nevezünk egy egyenest a kör érintőjének?',
    options: [
      'Ha a középponttól való távolsága pontosan megegyezik a kör sugarával (d = r)',
      'Ha a távolsága kisebb a sugárnál (d < r)',
      'Ha átmegy a kör középpontján',
      'Ha a távolsága nagyobb a sugárnál (d > r)'
    ],
    correctAnswer: 0,
    explanation: 'Az érintő távolsága a középponttól pontosan d = r, ezért pontosan egyetlen közös pontja van a körrel.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="70" cy="45" r="26" fill="none" stroke="#0d9488" strokeWidth="2" />
        <line x1="96" y1="15" x2="96" y2="75" stroke="#e11d48" strokeWidth="2" />
        <line x1="70" y1="45" x2="96" y2="45" stroke="#0d9488" strokeWidth="1.5" />
        <text x="83" y="40" className="text-[8px] font-bold fill-teal-800">d = r</text>
      </svg>
    )
  },
  {
    id: 'sum-54',
    level: 2,
    question: 'Két kör sugara r₁ = 5 cm és r₂ = 3 cm. Mekkora a középpontjaik távolsága (d), ha kívülről érintik egymást?',
    options: [
      '8 cm (mivel d = r₁ + r₂ = 5 + 3 = 8 cm)',
      '2 cm (mivel 5 - 3 = 2 cm)',
      '15 cm',
      '4 cm'
    ],
    correctAnswer: 0,
    explanation: 'Két kívülről érintkező kör középpontjainak távolsága a két sugár összege: d = r₁ + r₂ = 5 + 3 = 8 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="55" cy="45" r="25" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <circle cx="95" cy="45" r="15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="80" cy="45" r="2" fill="#ef4444" />
        <text x="75" y="78" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">d = 5 + 3 = 8 cm</text>
      </svg>
    )
  },
  {
    id: 'sum-55',
    level: 2,
    question: 'Mit állít a Thalész-tétel?',
    options: [
      'Bármely kör átmérőjének két végpontja a körvonal bármely más pontjából derékszögben látszik',
      'A kör kerülete arányos a sugár négyzetével',
      'A háromszög belső szögeinek összege 180°',
      'Két párhuzamos egyenes nem metszi egymást'
    ],
    correctAnswer: 0,
    explanation: 'Thalész tétele szerint ha egy kör átmérőjének végpontjait összekötjük a körvonal tetszőleges harmadik pontjával, derékszögű (90°-os) háromszöget kapunk.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <path d="M 30 65 A 45 45 0 0 1 120 65" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
        <line x1="30" y1="65" x2="120" y2="65" stroke="#475569" strokeWidth="2" />
        <line x1="30" y1="65" x2="70" y2="25" stroke="#e11d48" strokeWidth="1.8" />
        <line x1="120" y1="65" x2="70" y2="25" stroke="#e11d48" strokeWidth="1.8" />
        {/* Hungarian right angle: circular arc + dot */}
        <path d="M 64 32 A 7 7 0 0 0 76 30" fill="none" stroke="#e11d48" strokeWidth="1.2" />
        <circle cx="70" cy="32" r="0.8" fill="#e11d48" />
      </svg>
    )
  },
  {
    id: 'sum-56',
    level: 2,
    question: 'Hogyan szerkeszthető meg egy 30°-os szög?',
    options: [
      'A 60°-os szabályos háromszög-szög szögfelezőjének megszerkesztésével',
      'Egy derékszög harmadolásával vonalzóval',
      'Egy 45°-os szögből 15° levonásával közvetlenül',
      'Csak szögmérővel'
    ],
    correctAnswer: 0,
    explanation: 'A 60°-os szög alapszerkesztésként előállítható, ennek szögfelezője pontosan 30°-os szöget eredményez.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="65" x2="120" y2="65" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="65" x2="70" y2="20" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="30" y1="65" x2="105" y2="35" stroke="#e11d48" strokeWidth="2" />
        <text x="65" y="58" className="text-[9px] font-bold fill-rose-600">30°</text>
      </svg>
    )
  },
  {
    id: 'sum-57',
    level: 2,
    question: 'Hogyan szerkeszthető meg egy 45°-os szög?',
    options: [
      'A 90°-os derékszög szögfelezőjének megszerkesztésével',
      'Három darab 15°-os szög összeadásával',
      'Egy egyenlő szárú háromszög alapjának felezésével',
      'A 60°-os szögből 15° becslésével'
    ],
    correctAnswer: 0,
    explanation: 'Egyenesre állított merőlegessel derékszöget (90°) szerkesztünk, majd ennek szögfelezője adja a 45°-os szöget.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="65" x2="120" y2="65" stroke="#0f766e" strokeWidth="2" />
        <line x1="50" y1="65" x2="50" y2="15" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="50" y1="65" x2="95" y2="20" stroke="#e11d48" strokeWidth="2" />
        <text x="75" y="55" className="text-[9px] font-bold fill-rose-600">45°</text>
      </svg>
    )
  },
  {
    id: 'sum-58',
    level: 2,
    question: 'Hogyan szerkeszthető meg egy 75°-os szög?',
    options: [
      'Egy 45°-os és egy 30°-os szög egymás mellé szerkesztésével (45° + 30° = 75°)',
      'A 150°-os tompaszög becslésével',
      'Egy 90°-os szögből 20° levonásával',
      'Csak szögmérővel'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a 45° (90° felezése) és a 30° (60° felezése) is alapszerkesztés, összegük pontosan 75°-ot ad.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="65" x2="120" y2="65" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="65" x2="55" y2="15" stroke="#e11d48" strokeWidth="2" />
        <text x="55" y="50" className="text-[9px] font-bold fill-rose-600">75°</text>
      </svg>
    )
  },
  {
    id: 'sum-59',
    level: 2,
    question: 'Egy háromszög két oldala a = 6 cm, b = 8 cm, a közbezárt szögük γ = 60°. Melyik alapeset szerint szerkeszthető meg egyértelműen?',
    options: [
      'o-sz-o (két oldal és a közbezárt szög)',
      'o-o-o (három oldal)',
      'sz-o-sz (egy oldal és két szög)',
      'o-o-sz (kisebbikkel szemközti szög)'
    ],
    correctAnswer: 0,
    explanation: 'Két oldal és a közbezárt szög (o-sz-o) egyértelműen meghatározza a háromszöget (egybevágósági alapeset).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="65" x2="120" y2="65" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="65" x2="70" y2="25" stroke="#0f766e" strokeWidth="2" />
        <line x1="70" y1="25" x2="120" y2="65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        <text x="45" y="58" className="text-[8px] font-bold fill-rose-600">60°</text>
      </svg>
    )
  },
  {
    id: 'sum-60',
    level: 2,
    question: 'Egy háromszög alapja c = 7 cm, a rajta fekvő két szög α = 40° és β = 55°. Mi garantálja, hogy a háromszög megszerkeszthető?',
    options: [
      'A két szög összege kisebb 180°-nál (40° + 55° = 95° < 180°), így a szárak metszik egymást',
      'Minden szög hegyesszög',
      'Az alap hosszabb mint 5 cm',
      'Csak akkor, ha α = β'
    ],
    correctAnswer: 0,
    explanation: 'A harmadik szög γ = 180° - 95° = 85° > 0°, így a szárak nem párhuzamosak és nem széttartók, hanem egyetlen pontban metszik egymást.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="65" x2="120" y2="65" stroke="#0f766e" strokeWidth="2" />
        <line x1="30" y1="65" x2="80" y2="20" stroke="#0ea5e9" strokeWidth="1.5" />
        <line x1="120" y1="65" x2="80" y2="20" stroke="#0ea5e9" strokeWidth="1.5" />
        <circle cx="80" cy="20" r="2.5" fill="#e11d48" />
        <text x="42" y="60" className="text-[8px] font-bold fill-sky-800">40°</text>
        <text x="100" y="60" className="text-[8px] font-bold fill-sky-800">55°</text>
      </svg>
    )
  }
];
