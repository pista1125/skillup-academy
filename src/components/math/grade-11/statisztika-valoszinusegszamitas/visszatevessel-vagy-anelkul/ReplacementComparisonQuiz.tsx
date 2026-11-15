import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ReplacementComparisonMatcher } from './ReplacementComparisonMatcher';
import { ReplacementComparisonSorter } from './ReplacementComparisonSorter';
import { ReplacementComparisonBars, rcBinomialP, rcHyperP, RC_POTION_ITEMS } from './ReplacementComparisonFigures';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Urna golyókkal, alatta a húzás módja. */
const UrnFig: React.FC<{ reds: number; blues: number; caption: string }> = ({ reds, blues, caption }) => {
  const total = reds + blues;
  const cols = Math.min(6, total);
  const step = 24;
  const rows = Math.ceil(total / cols);
  const w = cols * step;
  const x0 = 120 - w / 2 + step / 2;
  const bottom = 24 + rows * step + 4;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="146" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <path
        d={`M ${120 - w / 2 - 8} 10 L ${120 - w / 2 - 8} ${bottom - 8} Q ${120 - w / 2 - 8} ${bottom} ${120 - w / 2} ${bottom} L ${120 + w / 2} ${bottom} Q ${120 + w / 2 + 8} ${bottom} ${120 + w / 2 + 8} ${bottom - 8} L ${120 + w / 2 + 8} 10`}
        fill="#f1f5f9"
        stroke="#64748b"
        strokeWidth="1.5"
      />
      {Array.from({ length: total }, (_, i) => (
        <circle
          key={i}
          cx={x0 + (i % cols) * step}
          cy={24 + Math.floor(i / cols) * step}
          r="9.5"
          fill={i < reds ? '#fb7185' : '#38bdf8'}
          stroke={i < reds ? '#be123c' : '#0369a1'}
          strokeWidth="1.3"
        />
      ))}
      <text x="120" y={Math.min(bottom + 18, 126)} fontSize="10" textAnchor="middle" fill="#334155">
        {reds} piros, {blues} kék golyó
      </text>
      <text x="120" y={Math.min(bottom + 32, 141)} fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
        {caption}
      </text>
    </svg>
  );
};

/** Sokaság → minta doboz. */
const PopFig: React.FC<{ pop: string; part: string; sample: string; mode?: string }> = ({ pop, part, sample, mode }) => (
  <svg viewBox="0 0 240 120" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="12" y="16" width="112" height="70" rx="10" fill="#ffffff" stroke="#334155" />
    <text x="68" y="40" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      {pop}
    </text>
    <text x="68" y="62" fontSize="10" textAnchor="middle" fill="#b45309">
      {part}
    </text>
    <path d="M 128 51 L 150 51" stroke="#334155" strokeWidth="1.6" />
    <path d="M 146 46 L 152 51 L 146 56" fill="none" stroke="#334155" strokeWidth="1.6" />
    <rect x="156" y="26" width="72" height="50" rx="10" fill="#e0f2fe" stroke="#0284c7" />
    <text x="192" y="55" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      {sample}
    </text>
    {mode && (
      <text x="120" y="106" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        {mode}
      </text>
    )}
  </svg>
);

/** Tomi zsákja (kicsiben). */
const PotionFig: React.FC<{ caption: string }> = ({ caption }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="146" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {RC_POTION_ITEMS.map((it, i) => (
      <g key={it.name}>
        <circle cx="22" cy={20 + i * 21} r="7" fill={it.fill} stroke={it.stroke} strokeWidth="1.5" />
        <text x="36" y={24 + i * 21} fontSize="10.5" fill="#0f172a">
          {it.count} db {it.name}
        </text>
      </g>
    ))}
    <text x="120" y="138" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      {caption}
    </text>
  </svg>
);

const r = (n: number) => Array.from({ length: n + 1 }, (_, k) => k);

const REPLACEMENT_COMPARISON_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'rc-q1',
    level: 1,
    questionTypeBadge: 'Modellválasztás',
    question: 'Egy urnából golyót húzunk, megnézzük a színét, majd visszatesszük, és ezt 5-ször megismételjük. Melyik modell írja le ezt a kísérletet?',
    options: ['visszatevéses mintavétel (binomiális eloszlás)', 'visszatevés nélküli mintavétel', 'egyszerre húzás', 'egyik sem, ez nem véletlen kísérlet'],
    correctAnswer: 0,
    explanation: 'Minden húzás előtt ugyanaz az urna tartalma, a húzások függetlenek: ez a visszatevéses mintavétel, a kedvező húzások száma binomiális eloszlású.'
  },
  {
    id: 'rc-q2',
    level: 1,
    questionTypeBadge: 'Modellválasztás',
    question: 'Az ötös lottó sorsolásán 90 számból 5-öt húznak ki. Milyen mintavétel ez?',
    options: ['visszatevés nélküli', 'visszatevéses', 'binomiális', 'hol visszatevéses, hol nem'],
    correctAnswer: 0,
    explanation: 'Egy kihúzott számot nem tesznek vissza, minden szám legfeljebb egyszer szerepelhet: visszatevés nélküli mintavétel (ugyanaz, mint egyszerre 5-öt húzni).'
  },
  {
    id: 'rc-q3',
    level: 1,
    questionTypeBadge: 'Visszatevéssel',
    question: 'Két golyót húzunk visszatevéssel. Mennyi a valószínűsége, hogy mindkettő piros?',
    figure: <UrnFig reds={4} blues={6} caption="2 húzás visszatevéssel" />,
    options: ['4/25', '2/15', '2/5', '4/5'],
    correctAnswer: 0,
    explanation: 'Mindkét húzásnál 4/10 a piros valószínűsége: 4/10 · 4/10 = 16/100 = 4/25. (A 2/15 a visszatevés nélküli eredmény.)'
  },
  {
    id: 'rc-q4',
    level: 1,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'Két golyót húzunk visszatevés nélkül. Mennyi a valószínűsége, hogy mindkettő piros?',
    figure: <UrnFig reds={4} blues={6} caption="2 húzás visszatevés nélkül" />,
    options: ['2/15', '4/25', '3/10', '1/5'],
    correctAnswer: 0,
    explanation: '4/10 · 3/9 = 12/90 = 2/15, vagy (4 alatt 2) / (10 alatt 2) = 6/45 = 2/15.'
  },
  {
    id: 'rc-q5',
    level: 1,
    questionTypeBadge: 'Feltételes húzás',
    question: 'Visszatevés nélkül húzunk, és az első golyó piros volt. Mennyi a valószínűsége, hogy a második is piros?',
    figure: <UrnFig reds={4} blues={6} caption="az első kihúzott golyó piros" />,
    options: ['1/3', '2/5', '4/9', '3/10'],
    correctAnswer: 0,
    explanation: 'Az urnában 9 golyó maradt, köztük 3 piros: 3/9 = 1/3. (Visszatevéssel 4/10 = 2/5 maradna.)'
  },
  {
    id: 'rc-q6',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mikor tér el kevéssé a visszatevéses és a visszatevés nélküli mintavétel eredménye?',
    options: ['ha a sokaság sokkal nagyobb, mint a minta', 'ha a minta nagyobb, mint a sokaság fele', 'ha a vizsgált tulajdonság aránya pontosan 50%', 'soha, a két eredmény mindig nagyon különbözik'],
    correctAnswer: 0,
    explanation: 'Népes sokaságból kis mintát véve egy-egy kiválasztás alig változtatja meg a maradék arányát, ezért a két modell szinte ugyanazt adja (lásd a 250 és 2500 fős sorsolást).'
  },
  {
    id: 'rc-q7',
    level: 1,
    questionTypeBadge: 'Modellválasztás',
    question: '24 jelentkezőből 3 diákot sorsolnak ki egy csereprogramra. Melyik modell alkalmazható pontosan?',
    figure: <PopFig pop="24 jelentkező" part="15 tizenkettedikes" sample="3 diák" mode="egy diák csak egyszer utazhat" />,
    options: ['csak a visszatevés nélküli', 'csak a visszatevéses', 'mindkettő pontosan ugyanazt adja', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'Ugyanazt a diákot nem sorsolhatják ki kétszer, ezért a visszatevés nélküli modell a pontos. A visszatevéses itt csak közelítés lenne (és 24 főnél nem is túl jó).'
  },
  {
    id: 'rc-q8',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Visszatevéses mintavételnél egy húzásnál p a „kedvező” valószínűsége. Mennyi a valószínűsége, hogy n húzásból pontosan k kedvező?',
    options: ['(n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ', 'pᵏ · (1 − p)ⁿ⁻ᵏ', '(n alatt k) · pⁿ', 'k · p · (1 − p)'],
    correctAnswer: 0,
    explanation: 'Binomiális eloszlás: egy adott sorrend valószínűsége pᵏ(1 − p)ⁿ⁻ᵏ, és (n alatt k)-féle sorrendben lehetnek a kedvező húzások.'
  },
  {
    id: 'rc-q9',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'N elemből S rendelkezik egy tulajdonsággal. Visszatevés nélkül n elemet választunk. Mi a valószínűsége, hogy pontosan k-nak van meg a tulajdonsága?',
    options: ['(S alatt k) · (N − S alatt n − k) / (N alatt n)', '(n alatt k) · (S/N)ᵏ', '(S alatt k) / (N alatt n)', '(N alatt n) / ((S alatt k) · (N − S alatt n − k))'],
    correctAnswer: 0,
    explanation: 'Összes eset: (N alatt n). Kedvező: a k elemet az S közül, a többi n − k elemet az N − S közül választjuk.'
  },
  {
    id: 'rc-q10',
    level: 1,
    questionTypeBadge: 'Kidolgozott feladat',
    question: '50 munkadarabból 20 selejtes, 15-öt vizsgálnak. 5, 6 vagy 7 selejtes valószínűsége visszatevéssel ≈ 0,57, visszatevés nélkül ≈ 0,65. Melyik állítás igaz?',
    options: ['van különbség, de nem túl nagy', 'a két eredménynek egyeznie kellene', 'a visszatevéses eredmény biztosan hibás', 'a különbség nagyobb lenne, ha több munkadarab lenne'],
    correctAnswer: 0,
    explanation: 'A tankönyv szerint a különbség létezik, de nem túl nagy – és még kisebb lenne, ha nem 50, hanem sokkal több munkadarab lenne.'
  },

  // LEVEL 2
  {
    id: 'rc-q11',
    level: 2,
    questionTypeBadge: 'Binomiális',
    question: 'A metrón egy utasnak 0,92 valószínűséggel van érvényes jegye. Mennyi a valószínűsége, hogy 50 ellenőrzött utas közül mindegyiknek van?',
    options: ['≈ 0,0155', '≈ 0,92', '≈ 0,046', '≈ 0,0672'],
    correctAnswer: 0,
    explanation: '0,92⁵⁰ ≈ 0,0155. (A 0,0672 annak a valószínűsége, hogy pontosan 49-nek van jegye.)'
  },
  {
    id: 'rc-q12',
    level: 2,
    questionTypeBadge: 'Döntés',
    question: 'Az ellenőr azt jelenti: 50 utasból a) mindenkinek volt jegye; b) senkinek sem volt. A főnök csak a legalább 5%-os valószínűségű eseményt fogadja el (p = 0,92). Melyiket fogadja el?',
    options: ['egyiket sem', 'csak az a) állítást', 'csak a b) állítást', 'mindkettőt'],
    correctAnswer: 0,
    explanation: 'P(a) = 0,92⁵⁰ ≈ 0,0155 < 0,05 és P(b) = 0,08⁵⁰ ≈ 1,4 · 10⁻⁵⁵ < 0,05, így egyiket sem fogadja el.'
  },
  {
    id: 'rc-q13',
    level: 2,
    questionTypeBadge: 'Visszatevéssel',
    question: 'A 60 utasból 12 tanulóbérletes (20%). Az ellenőr visszatevéses módszerrel 10 jegyet néz meg. Mennyi a valószínűsége, hogy egy tanulóbérletes sincs köztük?',
    figure: <PopFig pop="60 utas" part="12 tanulóbérletes" sample="10 ellenőrzés" mode="visszatevéssel" />,
    options: ['≈ 0,107', '≈ 0,087', '≈ 0,2', '≈ 0,893'],
    correctAnswer: 0,
    explanation: '0,8¹⁰ ≈ 0,107. (Visszatevés nélkül (48 alatt 10) / (60 alatt 10) ≈ 0,087 lenne.)'
  },
  {
    id: 'rc-q14',
    level: 2,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'Ugyanez a busz (60 utas, 12 tanulóbérletes), de az ellenőr 10 különböző utast kérdez meg. Mennyi a valószínűsége, hogy egy tanulóbérletes sincs köztük?',
    figure: <PopFig pop="60 utas" part="12 tanulóbérletes" sample="10 különböző" mode="visszatevés nélkül" />,
    options: ['≈ 0,087', '≈ 0,107', '≈ 0,8', '≈ 0,013'],
    correctAnswer: 0,
    explanation: '(48 alatt 10) / (60 alatt 10) ≈ 0,087. Ez kisebb, mint 0,8¹⁰ ≈ 0,107: ha már sok nem tanulóbérletest kérdezett, a maradékban nő a tanulóbérletesek aránya.'
  },
  {
    id: 'rc-q15',
    level: 2,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'Tomi visszatevés nélkül húz 3 összetevőt. Mennyi a valószínűsége, hogy nincs köztük csattanó maszlag?',
    figure: <PotionFig caption="3 húzás visszatevés nélkül" />,
    options: ['14/55', '8/27', '1/3', '41/55'],
    correctAnswer: 0,
    explanation: 'A 12 összetevőből 8 nem maszlag: (8 alatt 3) / (12 alatt 3) = 56/220 = 14/55 ≈ 0,255. (8/27 = (2/3)³ a visszatevéses eredmény.)'
  },
  {
    id: 'rc-q16',
    level: 2,
    questionTypeBadge: 'Komplementer',
    question: 'Tomi visszatevéssel húz 4 összetevőt. Mennyi a valószínűsége, hogy van köztük csattanó maszlag?',
    figure: <PotionFig caption="4 húzás visszatevéssel" />,
    options: ['65/81', '16/81', '1/3', '4/3'],
    correctAnswer: 0,
    explanation: 'Egy húzásnál 8/12 = 2/3 eséllyel nem maszlag. P(nincs) = (2/3)⁴ = 16/81, így P(van) = 1 − 16/81 = 65/81 ≈ 0,802.'
  },
  {
    id: 'rc-q17',
    level: 2,
    questionTypeBadge: 'Egyenlőtlenség',
    question: 'Tomi zsákjában 12 összetevő van, ebből 1 légyölő galóca. Legalább hány galócát kell még beletennie, hogy elsőre 0,3-nél nagyobb valószínűséggel galócát húzzon?',
    figure: <PotionFig caption="x galócát tesz még bele" />,
    options: ['4', '3', '5', '2'],
    correctAnswer: 0,
    explanation: '(1 + x)/(12 + x) > 0,3 ⇔ 1 + x > 3,6 + 0,3x ⇔ 0,7x > 2,6 ⇔ x > 3,71… Tehát x = 4 (5/16 = 0,3125); x = 3-nál 4/15 ≈ 0,267.'
  },
  {
    id: 'rc-q18',
    level: 2,
    questionTypeBadge: 'Visszatevés nélkül',
    question: '24 jelentkezőből (15 tizenkettedikes, 9 tizenegyedikes) 3-at sorsolnak ki. Mennyi a valószínűsége, hogy mindhárom tizenkettedikes?',
    figure: <PopFig pop="24 jelentkező" part="15 tizenkettedikes" sample="3 diák" />,
    options: ['455/2024 ≈ 0,225', '(15/24)³ ≈ 0,244', '15/24 ≈ 0,625', '3/24 = 0,125'],
    correctAnswer: 0,
    explanation: '(15 alatt 3) / (24 alatt 3) = 455/2024 ≈ 0,225. A (15/24)³ hibás, mert ugyanaz a diák nem sorsolható ki kétszer.'
  },
  {
    id: 'rc-q19',
    level: 2,
    questionTypeBadge: 'Binomiális',
    question: 'A balkezesek aránya 11%. Mennyi a valószínűsége, hogy egy véletlenszerű 17 fős csoportban nincs balkezes?',
    options: ['≈ 0,138', '≈ 0,11', '≈ 0,89', '≈ 0,290'],
    correctAnswer: 0,
    explanation: '0,89¹⁷ ≈ 0,138. (A 0,290 a pontosan 1 balkezes valószínűsége.)'
  },
  {
    id: 'rc-q20',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Az urnából 3 golyót húzunk. Mennyi a valószínűsége, hogy pontosan 1 piros lesz köztük visszatevéssel, illetve visszatevés nélkül?',
    figure: <UrnFig reds={3} blues={7} caption="3 húzás – kétféleképpen" />,
    options: ['0,441 és 0,525', '0,525 és 0,441', '0,3 és 0,3', '0,147 és 0,175'],
    correctAnswer: 0,
    explanation: 'Visszatevéssel: 3 · 0,3 · 0,7² = 0,441. Visszatevés nélkül: (3 alatt 1)(7 alatt 2) / (10 alatt 3) = 63/120 = 0,525.'
  },

  // LEVEL 3
  {
    id: 'rc-q21',
    level: 3,
    questionTypeBadge: 'Visszatevéssel',
    question: 'A buszon 60 utas van, az ellenőr „visszatevéses módszerrel” 10-szer kér jegyet. Mennyi a valószínűsége, hogy Bencétől legfeljebb egyszer kéri?',
    options: ['≈ 0,989', '≈ 0,845', '≈ 0,143', '≈ 0,833'],
    correctAnswer: 0,
    explanation: 'Egy ellenőrzésnél 1/60 eséllyel Bence: (59/60)¹⁰ + 10 · (1/60) · (59/60)⁹ ≈ 0,845 + 0,143 ≈ 0,989.'
  },
  {
    id: 'rc-q22',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Tomi zsákjában 3 mandragóra van a 12 összetevő között. Melyik a nagyobb: egyszerre hármat húzva pontosan 2 mandragóra, vagy visszatevéssel hármat húzva legalább 2 mandragóra?',
    figure: <PotionFig caption="mandragóra: 3 db a 12-ből" />,
    options: ['a visszatevéses „legalább 2” (10/64 ≈ 0,156)', 'az egyszerre húzott „pontosan 2” (27/220 ≈ 0,123)', 'egyenlők', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'Egyszerre: (3 alatt 2) · 9 / (12 alatt 3) = 27/220 ≈ 0,123. Visszatevéssel (p = 1/4): 3 · (1/4)² · (3/4) + (1/4)³ = 9/64 + 1/64 = 10/64 ≈ 0,156.'
  },
  {
    id: 'rc-q23',
    level: 3,
    questionTypeBadge: 'Visszatevés nélkül',
    question: '24 jelentkezőből (15 tizenkettedikes, 9 tizenegyedikes) 3-at sorsolnak ki. Mennyi a valószínűsége, hogy két tizenkettedikes és egy tizenegyedikes lesz?',
    figure: <PopFig pop="24 jelentkező" part="15 + 9 diák" sample="3 diák" />,
    options: ['945/2024 ≈ 0,467', '≈ 0,439', '105/2024 ≈ 0,052', '315/2024 ≈ 0,156'],
    correctAnswer: 0,
    explanation: '(15 alatt 2) · (9 alatt 1) / (24 alatt 3) = 105 · 9 / 2024 = 945/2024 ≈ 0,467. (0,439 = 3 · (15/24)² · (9/24) a visszatevéses közelítés.)'
  },
  {
    id: 'rc-q24',
    level: 3,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'A nézőtéren 60 jelölt ül, 12-en egy baráti társaság tagjai. 5 játékost sorsolnak ki (mindenki csak egyszer). Mennyi a valószínűsége, hogy pontosan ketten barátok?',
    figure: <PopFig pop="60 néző" part="12 barát" sample="5 játékos" />,
    options: ['≈ 0,209', '≈ 0,205', '≈ 0,259', '≈ 0,033'],
    correctAnswer: 0,
    explanation: '(12 alatt 2) · (48 alatt 3) / (60 alatt 5) ≈ 0,209. (A binomiális közelítés (5 alatt 2) · 0,2² · 0,8³ ≈ 0,205 lenne.)'
  },
  {
    id: 'rc-q25',
    level: 3,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'A boltban 64 LEGO-figura van, ebből 4 űrhajós. Mennyi a valószínűsége, hogy 5 megvásárolt figura között nem lesz űrhajós?',
    figure: <PopFig pop="64 csomag" part="4 űrhajós" sample="5 figura" />,
    options: ['≈ 0,716', '≈ 0,724', '≈ 0,284', '≈ 0,027'],
    correctAnswer: 0,
    explanation: '(60 alatt 5) / (64 alatt 5) = 5 461 512 / 7 624 512 ≈ 0,716. (Visszatevéssel (15/16)⁵ ≈ 0,724; 0,027 a pontosan 2 űrhajós valószínűsége.)'
  },
  {
    id: 'rc-q26',
    level: 3,
    questionTypeBadge: 'Binomiális',
    question: 'A balkezesek aránya 11%. Mennyi a valószínűsége, hogy egy 17 fős csoportban legalább 1, de legfeljebb 4 balkezes van?',
    figure: <ReplacementComparisonBars className={FIG_CLASS} width={300} height={190} showLegend={false} withRep={r(6).map((k) => rcBinomialP(17, k, 0.11))} highlight={[1, 2, 3, 4]} xLabel="balkezesek száma" />,
    options: ['≈ 0,830', '≈ 0,862', '≈ 0,753', '≈ 0,968'],
    correctAnswer: 0,
    explanation: 'P(1) + P(2) + P(3) + P(4) ≈ 0,290 + 0,287 + 0,177 + 0,077 ≈ 0,830. (0,862 = 1 − P(0) a „legalább 1” valószínűsége.)'
  },
  {
    id: 'rc-q27',
    level: 3,
    questionTypeBadge: 'Diagram',
    question: 'A diagram 20 utalvány kisorsolását mutatja egy 30% nyugdíjast tartalmazó társaságban. Mi történik, ha a létszám 250-ről 2500-ra nő (a 30% marad)?',
    figure: (
      <ReplacementComparisonBars
        className={FIG_CLASS}
        width={300}
        height={200}
        showLegend={false}
        withRep={r(20).map((k) => rcBinomialP(20, k, 0.3))}
        withoutRep={r(20).map((k) => rcHyperP(250, 75, 20, k))}
        yMax={0.2}
        xLabel="250 fő: kék = visszatevéssel, narancs = nélküle"
      />
    ),
    options: [
      'a két eloszlás közötti különbség szinte eltűnik',
      'a visszatevéses eloszlás megváltozik, a másik nem',
      'a különbség megtízszereződik',
      'a nyugdíjasok várható nyereménye a tízszeresére nő'
    ],
    correctAnswer: 0,
    explanation: 'A binomiális eloszlás csak n = 20-tól és p = 0,3-tól függ, nem változik. A visszatevés nélküli eloszlás nagyobb létszámnál egyre közelebb kerül hozzá – 2500 főnél szinte eltűnik a különbség.'
  },
  {
    id: 'rc-q28',
    level: 3,
    questionTypeBadge: 'Ismétlődés',
    question: '250 fő között visszatevéssel sorsolnak ki 20 utalványt. Mennyi a valószínűsége, hogy valaki legalább 2 utalványt nyer?',
    options: ['≈ 0,54', '≈ 0,08', '≈ 0,46', '≈ 0,92'],
    correctAnswer: 0,
    explanation: 'Mind a 20 nyertes különböző: (250 · 249 · … · 231) / 250²⁰ ≈ 0,458. Így legalább egy ismétlődés: 1 − 0,458 ≈ 0,54. (2500 főnél ez csak ≈ 0,073.) Az eloszlások mégis közel vannak egymáshoz!'
  },
  {
    id: 'rc-q29',
    level: 3,
    questionTypeBadge: 'Értelmezés',
    question: 'A minőség-ellenőrzésnél (50 darab, 20 selejtes, 15 vizsgált) visszatevés nélkül nagyobb (≈ 0,65) az 5, 6 vagy 7 selejtes valószínűsége, mint visszatevéssel (≈ 0,57). Mi ennek az oka?',
    options: [
      'visszatevés nélkül a kihúzott selejtesek csökkentik a maradék selejtarányt, így az eredmény jobban a 40% körül marad',
      'visszatevés nélkül több munkadarabot vizsgálnak meg',
      'visszatevéssel a selejtes darabok valószínűsége minden húzásnál nő',
      'a visszatevéses modellben nincs 0,4 valószínűség'
    ],
    correctAnswer: 0,
    explanation: 'Visszatevés nélkül a sokaság „emlékszik”: sok selejtes után kevesebb marad, kevés után több. Ez a 6 körüli (40%-os) értékek felé tereli az eredményt, a szélsőséges értékek ritkábbak.'
  },
  {
    id: 'rc-q30',
    level: 3,
    questionTypeBadge: 'Visszatevés nélkül',
    question: '64 LEGO-figurából 4 űrhajós. Mennyi a valószínűsége, hogy 5 megvásárolt figura között pontosan 2 űrhajós lesz?',
    figure: <PopFig pop="64 csomag" part="4 űrhajós" sample="5 figura" mode="pontosan 2 űrhajós?" />,
    options: ['≈ 0,027', '≈ 0,032', '≈ 0,0008', '≈ 0,25'],
    correctAnswer: 0,
    explanation: '(4 alatt 2) · (60 alatt 3) / (64 alatt 5) = 6 · 34 220 / 7 624 512 ≈ 0,027. (A binomiális közelítés (5 alatt 2) · (1/16)² · (15/16)³ ≈ 0,032 lenne.)'
  }
];

export const ReplacementComparisonQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g11-stat-visszatevessel-vagy-anelkul-quiz"
      subtopicId="visszatevessel-vagy-anelkul"
      title="15. Ráadás – Visszatevéssel vagy anélkül? – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: modellválasztás, binomiális és visszatevés nélküli valószínűségek, a két eredmény összehasonlítása."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={REPLACEMENT_COMPARISON_QUESTIONS}
      cheatSheets={[
        {
          title: 'Visszatevéssel',
          items: [
            'a húzások függetlenek, p állandó',
            'P(k) = (n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ',
            'P(egy sem) = (1 − p)ⁿ',
            'P(legalább egy) = 1 − (1 − p)ⁿ'
          ]
        },
        {
          title: 'Visszatevés nélkül',
          items: [
            'egy elem legfeljebb egyszer = egyszerre húzás',
            'P(k) = (S alatt k)(N − S alatt n − k) / (N alatt n)',
            'egymás után: 4/10 · 3/9 …',
            'sorsolás, lottó, kis sokaság'
          ]
        },
        {
          title: 'Ellenőrzött eredmények',
          items: [
            'selejt: 0,57 (vissza) és 0,65 (nélkül)',
            'metró: 0,92⁵⁰ ≈ 0,0155',
            'busz, 0 bérletes: 0,107 és 0,087',
            'Tomi: 14/55; 65/81; x = 4'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ReplacementComparisonMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ReplacementComparisonSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ReplacementComparisonQuiz;
