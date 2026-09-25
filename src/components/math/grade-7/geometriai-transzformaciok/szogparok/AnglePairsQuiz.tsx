import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AnglePairsMatcher } from './AnglePairsMatcher';
import { AnglePairsSorter } from './AnglePairsSorter';
import {
  Compass,
  Sparkles,
  MoveHorizontal,
  Target
} from 'lucide-react';

interface AnglePairsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Mellékszögek és Csúcsszögek',
    icon: <Compass className="w-4 h-4 text-amber-600" />,
    formula: 'Mellékszögek: α + β = 180°; Csúcsszögek: α = α\'',
    note: 'Mellékszögek egyenesszöget alkotnak, csúcsszögek a metszéspontra vett középpontos tükörképek.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="40" x2="140" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="20" y1="10" x2="140" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="80" cy="25" r="2.5" fill="#d97706" />
        <text x="50" y="28" className="text-[8px] font-bold fill-amber-700">α</text>
        <text x="105" y="28" className="text-[8px] font-bold fill-amber-700">α'</text>
        <text x="77" y="15" className="text-[8px] font-bold fill-sky-700">β</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Pótszögek és Kiegészítő szögek',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: 'Pótszögek: α + β = 90°; Kiegészítő: α + β = 180°',
    note: 'Pótszögek derékszöget alkotnak (pl. derékszögű háromszög hegyesszögei).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="40" y1="42" x2="120" y2="42" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="42" x2="40" y2="8" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="42" x2="100" y2="15" stroke="#10b981" strokeWidth="2" />
        <text x="65" y="32" className="text-[8px] font-bold fill-emerald-700">α + β = 90°</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Párhuzamos Szárú Szögek',
    icon: <MoveHorizontal className="w-4 h-4 text-sky-600" />,
    formula: 'Egyállású: α = β; Váltószög: α = β; Társszög: α + β = 180°',
    note: 'F-alak és Z-alak egyenlő, C-alak (társszögek) összege 180°.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="15" y1="16" x2="145" y2="16" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="15" y1="36" x2="145" y2="36" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="45" y1="45" x2="115" y2="5" stroke="#d97706" strokeWidth="1.8" />
        <text x="100" y="14" className="text-[7px] font-bold fill-amber-700">α (F)</text>
        <text x="82" y="34" className="text-[7px] font-bold fill-amber-700">α (F)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Merőleges Szárú Szögek',
    icon: <Target className="w-4 h-4 text-purple-600" />,
    formula: 'Azonos típus: α = β; Különböző típus: α + β = 180°',
    note: 'Két hegyesszög vagy két tompaszög egyenlő, hegyes és tompa összege 180°.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="25" y="28" className="text-[8px] font-bold fill-purple-700">hegyes = hegyes | hegyes + tompa = 180°</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapok és Nevezetes Szögpárok',
    subtitle: 'Mellékszögek, csúcsszögek, pótszögek és kiegészítő szögek felismerése és számítása',
    range: '1–10. kérdés',
    focus: 'Mellékszögek, csúcsszögek, pótszögek, 90° és 180°',
    color: 'amber',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-300 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    questions: [
      {
        id: 'q1',
        question: 'Mekkora a 70°-os szög mellékszöge (β)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="10" y1="70" x2="190" y2="70" stroke="#94a3b8" strokeWidth="2" />
            <line x1="100" y1="70" x2="140" y2="15" stroke="#d97706" strokeWidth="2.5" />
            <circle cx="100" cy="70" r="3" fill="#d97706" />
            <text x="125" y="62" className="text-[10px] font-bold fill-amber-700">70°</text>
            <text x="65" y="60" className="text-[10px] font-bold fill-sky-700">β = ?</text>
          </svg>
        ),
        options: ['110°', '20°', '70°', '120°'],
        correctAnswer: 0,
        explanation: 'A mellékszögek együtt egyenesszöget (180°) alkotnak: β = 180° - 70° = 110°.',
        hint: 'A mellékszögek összege mindig pontosan 180°.'
      },
      {
        id: 'q2',
        question: 'Két egyenes metszéspontjában az egyik szög 45°. Mekkora a vele szemközti csúcsszög (α\')?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="75" x2="180" y2="15" stroke="#94a3b8" strokeWidth="2" />
            <line x1="20" y1="15" x2="180" y2="75" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="100" cy="45" r="3" fill="#d97706" />
            <text x="45" y="48" className="text-[10px] font-bold fill-amber-700">45°</text>
            <text x="145" y="48" className="text-[10px] font-bold fill-amber-700">α' = ?</text>
          </svg>
        ),
        options: ['135°', '45°', '90°', '55°'],
        correctAnswer: 1,
        explanation: 'A csúcsszögek egymás középpontos tükörképei, ezért nagyságuk mindig egyenlő: α\' = 45°.',
        hint: 'A csúcsszögek mindig egyenlő nagyságúak.'
      },
      {
        id: 'q3',
        question: 'Egy szög 4-szer akkora, mint a mellékszöge. Mekkora a kisebbik szög (α)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="15" y1="70" x2="185" y2="70" stroke="#94a3b8" strokeWidth="2" />
            <line x1="120" y1="70" x2="160" y2="15" stroke="#d97706" strokeWidth="2" />
            <text x="140" y="62" className="text-[9px] font-bold fill-amber-700">α</text>
            <text x="60" y="55" className="text-[9px] font-bold fill-sky-700">4α</text>
          </svg>
        ),
        options: ['45°', '36°', '30°', '40°'],
        correctAnswer: 1,
        explanation: 'A két mellékszög összege 180°: α + 4α = 5α = 180° ⟹ α = 180° / 5 = 36°.',
        hint: 'Írd fel egyenletként: α + 4α = 180°.'
      },
      {
        id: 'q4',
        question: 'Két csúcsszög összege 130°. Mekkorák a szögek egyenként?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="30" y1="75" x2="170" y2="15" stroke="#94a3b8" strokeWidth="1.8" />
            <line x1="30" y1="15" x2="170" y2="75" stroke="#94a3b8" strokeWidth="1.8" />
            <text x="40" y="48" className="text-[9px] font-bold fill-amber-700">α</text>
            <text x="150" y="48" className="text-[9px] font-bold fill-amber-700">α</text>
            <text x="65" y="85" className="text-[9px] font-bold fill-slate-600">α + α = 130°</text>
          </svg>
        ),
        options: ['65°', '50°', '70°', '130°'],
        correctAnswer: 0,
        explanation: 'Mivel a csúcsszögek egyenlők: 2α = 130° ⟹ α = 65°.',
        hint: 'A csúcsszögek egyenlők, így oszd el az összeget kettővel.'
      },
      {
        id: 'q5',
        question: 'Lehet-e két tompaszög egymás mellékszöge?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="65" x2="180" y2="65" stroke="#94a3b8" strokeWidth="2" />
            <text x="45" y="40" className="text-[10px] font-bold fill-rose-600">tompaszög + tompaszög &gt; 180°?</text>
          </svg>
        ),
        options: [
          'Nem, mert két tompaszög összege szigorúan nagyobb 180°-nál',
          'Igen, bármely két tompaszög lehet mellékszög',
          'Csak akkor, ha mindkettő 95°-os',
          'Csak akkor, ha az egyenesek merőlegesek'
        ],
        correctAnswer: 0,
        explanation: 'Egy tompaszög nagyobb 90°-nál, így két tompaszög összege biztosan nagyobb 180°-nál, míg a mellékszögek összege pontosan 180°.',
        hint: 'Gondold végig: ha mindkettő > 90°, mekkora az összegük?'
      },
      {
        id: 'q6',
        question: 'Mekkora a 28°-os szög pótszöge?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="50" y1="75" x2="150" y2="75" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="75" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="75" x2="120" y2="35" stroke="#10b981" strokeWidth="2" />
            <text x="80" y="70" className="text-[10px] font-bold fill-emerald-700">28°</text>
            <text x="58" y="45" className="text-[10px] font-bold fill-sky-700">?</text>
          </svg>
        ),
        options: ['62°', '72°', '152°', '52°'],
        correctAnswer: 0,
        explanation: 'A pótszögek összege 90°: 90° - 28° = 62°.',
        hint: 'A pótszögek összege 90° (derékszög).'
      },
      {
        id: 'q7',
        question: 'Egy szög 20°-kal nagyobb a pótszögénél. Mekkora a szög (α)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="40" y1="75" x2="140" y2="75" stroke="#94a3b8" strokeWidth="2" />
            <line x1="40" y1="75" x2="40" y2="15" stroke="#94a3b8" strokeWidth="2" />
            <line x1="40" y1="75" x2="115" y2="25" stroke="#10b981" strokeWidth="2" />
            <text x="65" y="86" className="text-[9px] font-bold fill-slate-700">α + (α - 20°) = 90°</text>
          </svg>
        ),
        options: ['55°', '35°', '60°', '50°'],
        correctAnswer: 0,
        explanation: 'Legyen a szög α, pótszöge α - 20°. α + (α - 20°) = 90° ⟹ 2α = 110° ⟹ α = 55° (pótszöge 35°).',
        hint: 'A két szög összege 90°, különbségük 20°.'
      },
      {
        id: 'q8',
        question: 'Mekkora a 135°-os szög kiegészítő szöge?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="65" x2="180" y2="65" stroke="#94a3b8" strokeWidth="2" />
            <line x1="90" y1="65" x2="135" y2="15" stroke="#0284c7" strokeWidth="2" />
            <text x="50" y="55" className="text-[10px] font-bold fill-sky-700">135°</text>
            <text x="110" y="58" className="text-[10px] font-bold fill-amber-700">?</text>
          </svg>
        ),
        options: ['45°', '55°', '35°', '90°'],
        correctAnswer: 0,
        explanation: 'A kiegészítő szögek összege 180°: 180° - 135° = 45°.',
        hint: 'A kiegészítő szögek összege 180°.'
      },
      {
        id: 'q9',
        question: 'Derékszögű háromszög egyik hegyesszöge 42°. Mekkora a másik hegyesszög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="30,75 160,75 30,15" fill="none" stroke="#16a34a" strokeWidth="2" />
            <rect x="30" y="63" width="12" height="12" fill="none" stroke="#16a34a" strokeWidth="1.2" />
            <text x="125" y="70" className="text-[10px] font-bold fill-emerald-700">42°</text>
            <text x="35" y="32" className="text-[10px] font-bold fill-sky-700">β = ?</text>
          </svg>
        ),
        options: ['48°', '38°', '58°', '138°'],
        correctAnswer: 0,
        explanation: 'A derékszögű háromszög két hegyesszöge pótszögpárt alkot: 90° - 42° = 48°.',
        hint: 'A belső szögek összege 180°, amiből 90°-ot a derékszög tesz ki.'
      },
      {
        id: 'q10',
        question: 'Egy szög és a kiegészítő szöge aránya 2 : 3. Mekkora a nagyobbik szög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="65" x2="180" y2="65" stroke="#94a3b8" strokeWidth="2" />
            <line x1="95" y1="65" x2="125" y2="15" stroke="#d97706" strokeWidth="2" />
            <text x="55" y="55" className="text-[10px] font-bold fill-sky-700">3 rész</text>
            <text x="115" y="58" className="text-[10px] font-bold fill-amber-700">2 rész</text>
          </svg>
        ),
        options: ['108°', '72°', '120°', '100°'],
        correctAnswer: 0,
        explanation: 'A teljes 180°-ot 2 + 3 = 5 egyenlő részre osztjuk: 180° / 5 = 36°. A nagyobbik szög 3 × 36° = 108°.',
        hint: 'Összesen 5 rész felel meg 180°-nak.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Párhuzamos Szárú Szögek',
    subtitle: 'Egyállású szögek (F), váltószögek (Z), társszögek (C) és a párhuzamossági kritérium',
    range: '11–20. kérdés',
    focus: 'Párhuzamosokat metsző egyenes, egyállású, váltó- és társszögek',
    color: 'teal',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-300 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    questions: [
      {
        id: 'q11',
        question: 'Két párhuzamos egyenest metsz egy harmadik. Az egyik egyállású szög 65°. Mekkora a másik egyállású szög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="30" x2="180" y2="30" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="2" />
            <line x1="60" y1="80" x2="140" y2="15" stroke="#d97706" strokeWidth="2" />
            <text x="125" y="26" className="text-[9px] font-bold fill-amber-700">65°</text>
            <text x="105" y="60" className="text-[9px] font-bold fill-amber-700">?</text>
          </svg>
        ),
        options: ['65°', '115°', '25°', '130°'],
        correctAnswer: 0,
        explanation: 'Párhuzamos egyenesek esetén az egyállású szögek (F-alak) mindig egyenlőek: α = 65°.',
        hint: 'Az egyállású szögek szárai azonos irányba mutatnak, így egyenlők.'
      },
      {
        id: 'q12',
        question: 'Milyen betű alakjához hasonlít a belső váltószögek szárelrendezése?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="30" y1="25" x2="150" y2="25" stroke="#16a34a" strokeWidth="2.5" />
            <line x1="150" y1="25" x2="50" y2="65" stroke="#16a34a" strokeWidth="2.5" />
            <line x1="50" y1="65" x2="170" y2="65" stroke="#16a34a" strokeWidth="2.5" />
            <text x="85" y="48" className="text-[14px] font-black fill-emerald-800">Z</text>
          </svg>
        ),
        options: ['Z-alak', 'F-alak', 'C-alak', 'X-alak'],
        correctAnswer: 0,
        explanation: 'A belső váltószögek egy Z betűt (vagy fordított Z-t) formálnak: ellentétes oldalon ellentétes irányú szárakkal bírnak.',
        hint: 'A váltószögek a két párhuzamos közötti átlós száron ülnek.'
      },
      {
        id: 'q13',
        question: 'Ha e ∥ f és az egyik belső szög 115°, mekkora a belső váltószöge?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="30" x2="180" y2="30" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="2" />
            <line x1="50" y1="75" x2="150" y2="20" stroke="#16a34a" strokeWidth="2" />
            <text x="75" y="43" className="text-[9px] font-bold fill-emerald-700">115°</text>
            <text x="115" y="58" className="text-[9px] font-bold fill-emerald-700">?</text>
          </svg>
        ),
        options: ['115°', '65°', '75°', '180°'],
        correctAnswer: 0,
        explanation: 'Párhuzamos egyenesek belső váltószögei egyenlők egymással, így az is 115°.',
        hint: 'Váltószögek párhuzamosoknál mindig egyenlőek.'
      },
      {
        id: 'q14',
        question: 'Melyik feltétel szükséges ahhoz, hogy két váltószög egyenlő nagyságú legyen?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="25" x2="180" y2="35" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="2" />
            <text x="65" y="82" className="text-[9px] font-bold fill-slate-700">Feltétel a párhuzamosság (e ∥ f)?</text>
          </svg>
        ),
        options: [
          'A két metszett egyenesnek párhuzamosnak kell lennie',
          'A metszőegyenesnek merőlegesnek kell lennie',
          'Mindkét szögnek tompaszögnek kell lennie',
          'Nem szükséges semmilyen feltétel, mindig egyenlők'
        ],
        correctAnswer: 0,
        explanation: 'A váltószögek (és egyállású szögek) kizárólag akkor egyenlők, ha a két metszett egyenes párhuzamos egymással.',
        hint: 'Ha az egyenesek nem párhuzamosak, a váltószögek nem egyeznek meg.'
      },
      {
        id: 'q15',
        question: 'Az F betűhöz hasonló szögpár elrendezés melyik szögpár típusra utal?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="40" y1="20" x2="140" y2="20" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="40" y1="50" x2="140" y2="50" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="40" y1="80" x2="40" y2="10" stroke="#d97706" strokeWidth="2.5" />
            <text x="90" y="40" className="text-[14px] font-black fill-amber-700">F</text>
          </svg>
        ),
        options: ['Egyállású szögek', 'Csúcsszögek', 'Társszögek', 'Mellékszögek'],
        correctAnswer: 0,
        explanation: 'Az F-alak az egyállású szögek vizuális mintája, ahol a szárak azonos irányba mutatnak.',
        hint: 'F mint Egyállású (azonos állású szárak).'
      },
      {
        id: 'q16',
        question: 'Két párhuzamos egyenes közötti társszögpár egyik tagja 74°. Mekkora a másik szög (β)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="30" x2="180" y2="30" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="2" />
            <line x1="50" y1="75" x2="150" y2="20" stroke="#7c3aed" strokeWidth="2" />
            <text x="65" y="45" className="text-[9px] font-bold fill-purple-700">74°</text>
            <text x="60" y="60" className="text-[9px] font-bold fill-purple-700">β = ?</text>
          </svg>
        ),
        options: ['106°', '74°', '116°', '96°'],
        correctAnswer: 0,
        explanation: 'A párhuzamos szárú társszögek (C-alak) összege 180°: β = 180° - 74° = 106°.',
        hint: 'A társszögek összege mindig 180°.'
      },
      {
        id: 'q17',
        question: 'Két egyenest metsz egy harmadik. Az azonos oldali belső szögek összege 178°. Párhuzamos-e a két egyenes?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="35" x2="180" y2="25" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="2" />
            <text x="45" y="82" className="text-[9px] font-bold fill-rose-600">α + β = 178° ≠ 180°</text>
          </svg>
        ),
        options: [
          'Nem, mert a párhuzamossághoz pontosan 180° kellene',
          'Igen, mert közel van a 180°-hoz',
          'Igen, ha a szögek hegyesszögek',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        explanation: 'A párhuzamossági kritérium szerint két egyenes pontosan akkor párhuzamos, ha a társszögek összege szigorúan 180°. 178° esetén a két egyenes a kisebb szög felé metszik egymást.',
        hint: 'A geometriában a párhuzamosság szigorú feltétele a pontosan 180°-os összeg.'
      },
      {
        id: 'q18',
        question: 'Egy trapéz egyik szárán fekvő alsó belső szöge 52°. Mekkora az ugyanazon a száron lévő felső belső szög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="30,70 170,70 140,25 60,25" fill="none" stroke="#d97706" strokeWidth="2" />
            <text x="38" y="65" className="text-[9px] font-bold fill-amber-700">52°</text>
            <text x="64" y="38" className="text-[9px] font-bold fill-purple-700">?</text>
          </svg>
        ),
        options: ['128°', '52°', '138°', '38°'],
        correctAnswer: 0,
        explanation: 'A trapéz párhuzamos alapjai miatt a száron fekvő szögek társszögpárt alkotnak: 180° - 52° = 128°.',
        hint: 'A trapéz szárai metszik a két párhuzamos alapot, így a száron fekvő szögek társszögek.'
      },
      {
        id: 'q19',
        question: 'Párhuzamosok közötti társszögek egyike kétszer akkora, mint a másik. Mekkora a tompaszög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="30" x2="180" y2="30" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="2" />
            <text x="65" y="80" className="text-[9px] font-bold fill-slate-700">α + 2α = 180°</text>
          </svg>
        ),
        options: ['120°', '60°', '100°', '135°'],
        correctAnswer: 0,
        explanation: 'α + 2α = 3α = 180° ⟹ α = 60°, a nagyobbik tompaszög pedig 2 × 60° = 120°.',
        hint: 'A két szög aránya 1 : 2, összegük 180°.'
      },
      {
        id: 'q20',
        question: 'Milyen típusú szögpárt alkot egy szög és a váltószögének a mellékszöge?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="30" x2="180" y2="30" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="50" y1="75" x2="150" y2="20" stroke="#d97706" strokeWidth="1.8" />
            <text x="60" y="82" className="text-[9px] font-bold fill-purple-700">váltószög mellékszöge = társszög</text>
          </svg>
        ),
        options: ['Társszögek (összegük 180°)', 'Csúcsszögek (egyenlők)', 'Pótszögek (összegük 90°)', 'Nullszög'],
        correctAnswer: 0,
        explanation: 'Mivel a váltószög egyenlő az eredeti szöggel, annak mellékszöge 180°-ra egészíti ki azt, tehát társszögek.',
        hint: 'Gondolj a definícióra: α + mellékszög = 180°.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Merőleges Szárak és Összetett Ábrák',
    subtitle: 'Merőleges szárú szögek, cikcakk szabály (töröttvonal) és sokszögek szögei',
    range: '21–30. kérdés',
    focus: 'Merőleges szárak, Z-szabály töröttvonalra, háromszög és sokszög szögek',
    color: 'purple',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-300 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    questions: [
      {
        id: 'q21',
        question: 'Két hegyesszög szárai páronként merőlegesek egymásra. Mi az összefüggés közöttük?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="30" y1="70" x2="110" y2="70" stroke="#94a3b8" strokeWidth="1.8" />
            <line x1="30" y1="70" x2="80" y2="25" stroke="#94a3b8" strokeWidth="1.8" />
            <line x1="110" y1="70" x2="110" y2="15" stroke="#d97706" strokeWidth="1.8" />
            <line x1="80" y1="25" x2="135" y2="45" stroke="#d97706" strokeWidth="1.8" />
            <text x="50" y="65" className="text-[9px] font-bold fill-amber-700">α</text>
            <text x="115" y="45" className="text-[9px] font-bold fill-amber-700">β = α</text>
          </svg>
        ),
        options: [
          'Egyenlő nagyságúak (α = β)',
          'Összegük 180°',
          'Összegük 90°',
          'Nincs közöttük kapcsolat'
        ],
        correctAnswer: 0,
        explanation: 'Ha két szög szárai páronként merőlegesek és mindkettő azonos típusú (mindkettő hegyesszög), akkor egyenlők.',
        hint: 'Azonos típusú merőleges szárú szögek egyenlők.'
      },
      {
        id: 'q22',
        question: 'Két szög szárai páronként merőlegesek. Egyikük 40°-os hegyesszög, a másik tompaszög. Mekkora a tompaszög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <text x="35" y="45" className="text-[10px] font-bold fill-amber-700">hegyes: 40° | tompa: 180° - 40° = ?</text>
          </svg>
        ),
        options: ['140°', '40°', '50°', '120°'],
        correctAnswer: 0,
        explanation: 'Különböző típusú (egyik hegyes, másik tompa) merőleges szárú szögek összege 180°: 180° - 40° = 140°.',
        hint: 'Különböző típus esetén összegük 180°.'
      },
      {
        id: 'q23',
        question: 'Két párhuzamos egyenes között egy töréspont található. A felső szög 30°, az alsó 45°. Mekkora a középső szög (γ)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="20" x2="180" y2="20" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="75" x2="180" y2="75" stroke="#0284c7" strokeWidth="2" />
            <polyline points="50,20 120,48 60,75" fill="none" stroke="#d97706" strokeWidth="2.5" />
            <text x="65" y="32" className="text-[9px] font-bold fill-amber-700">30°</text>
            <text x="75" y="70" className="text-[9px] font-bold fill-amber-700">45°</text>
            <text x="125" y="52" className="text-[9px] font-bold fill-emerald-600">γ = ?</text>
          </svg>
        ),
        options: ['75°', '15°', '105°', '90°'],
        correctAnswer: 0,
        explanation: 'A törésponton átmenő párhuzamos segédegyenes két váltószögre bontja a szöget: γ = 30° + 45° = 75°.',
        hint: 'Csúcsszabály: a balra nyíló szögek összege egyenlő a jobbra nyíló szög nagyságával.'
      },
      {
        id: 'q24',
        question: 'Párhuzamosok közötti cikcakk vonalnál a jobbra néző szögek: 25° és 40°. Mekkora a balra néző szög (x)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="18" x2="180" y2="18" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="20" y1="75" x2="180" y2="75" stroke="#0284c7" strokeWidth="1.8" />
            <polyline points="40,18 110,46 50,75" fill="none" stroke="#d97706" strokeWidth="2" />
            <text x="50" y="88" className="text-[9px] font-bold fill-slate-700">x = 25° + 40° = ?</text>
          </svg>
        ),
        options: ['65°', '15°', '115°', '85°'],
        correctAnswer: 0,
        explanation: 'A balra nyíló és jobbra nyíló szögek összege megegyezik: x = 25° + 40° = 65°.',
        hint: 'Add össze a két jobbra néző szöget.'
      },
      {
        id: 'q25',
        question: 'Igaz-e, hogy két tompaszög lehet egyenlő nagyságú, ha száraik páronként merőlegesek?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <text x="35" y="45" className="text-[10px] font-bold fill-amber-700">tompaszög = tompaszög (merőleges szárakkal)?</text>
          </svg>
        ),
        options: [
          'Igen, mert azonos típusú merőleges szárú szögek egyenlők',
          'Nem, csak a hegyesszögek lehetnek egyenlők',
          'Nem, tompaszögek összege mindig 180°',
          'Csak akkor, ha mindkettő 120°'
        ],
        correctAnswer: 0,
        explanation: 'Igen! A szabály kimondja: ha mindkét szög hegyesszög VAGY mindkét szög tompaszög, akkor nagyságuk pontosan megegyezik (α = β).',
        hint: 'Azonos típus (mindkettő tompa) esetén egyenlőség áll fenn.'
      },
      {
        id: 'q26',
        question: 'Egy háromszög külső szöge 118°, az egyik nem szomszédos belső szöge 54°. Mekkora a másik belső szög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="30,70 140,70 90,20" fill="none" stroke="#16a34a" strokeWidth="2" />
            <line x1="140" y1="70" x2="185" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="145" y="65" className="text-[9px] font-bold fill-amber-700">118°</text>
            <text x="40" y="65" className="text-[9px] font-bold fill-emerald-700">54°</text>
            <text x="85" y="35" className="text-[9px] font-bold fill-sky-700">β = ?</text>
          </svg>
        ),
        options: ['64°', '54°', '74°', '62°'],
        correctAnswer: 0,
        explanation: 'A háromszög bármely külső szöge egyenlő a két nem szomszédos belső szög összegével: β = 118° - 54° = 64°.',
        hint: 'Külső szög = két belső szög összege.'
      },
      {
        id: 'q27',
        question: 'Egy paralelogramma két szomszédos szögének különbsége 40°. Mekkora a kisebbik szög (α)?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="30,70 120,70 150,25 60,25" fill="none" stroke="#0284c7" strokeWidth="2" />
            <text x="42" y="65" className="text-[9px] font-bold fill-sky-700">α</text>
            <text x="110" y="65" className="text-[9px] font-bold fill-amber-700">α + 40°</text>
          </svg>
        ),
        options: ['70°', '60°', '80°', '50°'],
        correctAnswer: 0,
        explanation: 'A paralelogramma szomszédos szögei társszögek: α + (α + 40°) = 180° ⟹ 2α = 140° ⟹ α = 70° (a nagyobbik 110°).',
        hint: 'A paralelogramma szomszédos szögeinek összege 180°.'
      },
      {
        id: 'q28',
        question: 'Melyik szögpár segítségével bizonyítjuk, hogy a háromszög belső szögeinek összege 180°?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="40,70 160,70 100,25" fill="none" stroke="#16a34a" strokeWidth="2" />
            <line x1="30" y1="25" x2="170" y2="25" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />
            <text x="45" y="20" className="text-[8px] font-bold fill-emerald-700">váltószögek a csúcsnál</text>
          </svg>
        ),
        options: [
          'Belső váltószögek az alappal párhuzamos egyenes mentén',
          'Csúcsszögek a magasságvonalaknál',
          'Pótszögek a súlypontnál',
          'Merőleges szárú szögek az oldalfelezőknél'
        ],
        correctAnswer: 0,
        explanation: 'A csúcson át az alappal párhuzamos egyenest húzva a csúcsnál lévő három szög egyenesszöget (180°) alkot, és a két szélső szög belső váltószöge az alsó alapszögeknek.',
        hint: 'A csúcson átmenő párhuzamos egyenes és az oldalak Z-alakú váltószögeket hoznak létre.'
      },
      {
        id: 'q29',
        question: 'Egy húrtrapéz egyik hegyesszöge 68°. Mekkora a tompaszöge?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="30,70 170,70 145,25 55,25" fill="none" stroke="#7c3aed" strokeWidth="2" />
            <text x="40" y="65" className="text-[9px] font-bold fill-purple-700">68°</text>
            <text x="60" y="38" className="text-[9px] font-bold fill-amber-700">?</text>
          </svg>
        ),
        options: ['112°', '122°', '68°', '102°'],
        correctAnswer: 0,
        explanation: 'A trapéz száron fekvő szögei társszögek, ezért összegük 180°: 180° - 68° = 112°.',
        hint: 'A száron fekvő szögek összege 180°.'
      },
      {
        id: 'q30',
        question: 'Két metsző egyenes által bezárt 4 szög közül 3 szög összege 290°. Mekkora a negyedik szög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="75" x2="180" y2="15" stroke="#94a3b8" strokeWidth="2" />
            <line x1="20" y1="15" x2="180" y2="75" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="100" cy="45" r="3" fill="#d97706" />
            <text x="50" y="85" className="text-[9px] font-bold fill-slate-700">teljes szög = 360°</text>
          </svg>
        ),
        options: ['70°', '90°', '110°', '80°'],
        correctAnswer: 0,
        explanation: 'A metszéspont körüli 4 szög együttesen egy teljes szöget (360°) tesz ki: 360° - 290° = 70°.',
        hint: 'Egy pont körüli teljes szög 360°.'
      }
    ]
  }
};

export const AnglePairsQuiz: React.FC<AnglePairsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-angle-pairs-quiz"
      documentId="7_osztaly_szogparok_kviz"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🎯 KVÍZ"
      topicBadge="📐 7. Osztály • III. Geometriai transzformációk"
      title="Szögpárok Kvíz"
      topicTitle="7. Szögpárok"
      subtitle="30 feladat (3 szinten 10-10 kérdés): Mellékszögek, csúcsszögek, pótszögek, kiegészítő, váltó- és társszögek"
      themeColor="amber"
      pdfFilename="7_osztaly_szogparok_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetCards={cheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={<AnglePairsMatcher onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<AnglePairsSorter onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
};

export default AnglePairsQuiz;
