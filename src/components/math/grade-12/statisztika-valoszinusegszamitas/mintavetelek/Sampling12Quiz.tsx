import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Sampling12Matcher } from './Sampling12Matcher';
import { Sampling12Sorter } from './Sampling12Sorter';
import { SFig, SText, SPie, SWheel, S_BLUE, S_GREEN, S_AMBER, S_PURPLE, S_RED, S_INK, S_AXIS } from './statKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const splitFig = (total: string, left: string, right: string, pickL: string, pickR: string) => (
  <SFig w={260} h={110} className="w-full max-w-[300px] h-auto mx-auto">
    <SText x={130} y={16} t={total} s={8.5} b c={S_AXIS} />
    <rect x={14} y={22} width={232} height={50} rx={9} fill="#ffffff" stroke={S_INK} />
    <rect x={18} y={26} width={86} height={42} rx={7} fill={S_GREEN} fillOpacity={0.18} stroke={S_GREEN} />
    <rect x={108} y={26} width={134} height={42} rx={7} fill={S_BLUE} fillOpacity={0.12} stroke={S_BLUE} />
    <SText x={61} y={50} t={left} s={8} b c={S_GREEN} />
    <SText x={175} y={50} t={right} s={8} b c={S_BLUE} />
    <SText x={61} y={90} t={pickL} s={8.5} b c={S_GREEN} />
    <SText x={175} y={90} t={pickR} s={8.5} b c={S_BLUE} />
  </SFig>
);

const FIG_LOTTO2 = splitFig('90 szám, 5-öt húznak', '5 nyerő', '85 nem nyerő', '2 találat', '3 nem talált');
const FIG_MUZLI = splitFig('20 edény, 4-et választ', '5 natúr', '15 csokis', '1 db', '3 db');
const FIG_FAV = splitFig('90 szám, 5-öt húznak', '? kedvenc', 'többi', '3 db', '2 db');
const FIG_GIRLS = splitFig('49 végzős, 2-t választ', '26 lány', '23 fiú', '2 lány', '0 fiú');

const FIG_CLASSES = (
  <SFig w={240} h={84} className="w-full max-w-[280px] h-auto mx-auto">
    <rect x={12} y={12} width={100} height={50} rx={8} fill="#ffffff" stroke={S_AXIS} />
    <rect x={128} y={12} width={100} height={50} rx={8} fill="#ffffff" stroke={S_AXIS} />
    <SText x={62} y={32} t="12. a" s={9} b />
    <SText x={62} y={50} t="11 lány, 13 fiú" s={8} c={S_RED} />
    <SText x={178} y={32} t="12. b" s={9} b />
    <SText x={178} y={50} t="15 lány, 10 fiú" s={8} c={S_RED} />
    <SText x={120} y={76} t="mindkét osztályból 1-1 diák" s={8} c={S_AXIS} />
  </SFig>
);

const FIG_PIZZA = (
  <SFig w={230} h={130} className="w-full max-w-[270px] h-auto mx-auto" title="36 tanuló">
    <SPie cx={70} cy={74} r={46} values={[120, 160, 80]} labels={['120°', '160°', '80°']} colors={[S_BLUE, S_RED, S_PURPLE]} />
    {[
      ['Margherita', S_BLUE],
      ['Carbonara', S_RED],
      ['Pepperónis', S_PURPLE]
    ].map(([t, c], i) => (
      <g key={t}>
        <rect x={136} y={52 + i * 18} width={9} height={9} fill={c} fillOpacity={0.8} />
        <SText x={150} y={60 + i * 18} t={t} s={8} a="start" />
      </g>
    ))}
  </SFig>
);

const FIG_WHEEL = (
  <SFig w={200} h={140} className="w-full max-w-[240px] h-auto mx-auto">
    <SWheel
      cx={100}
      cy={78}
      r={52}
      s={8}
      sectors={[
        { label: 'Nyertél!', deg: 90, color: S_GREEN, showDeg: true },
        { label: 'Sajnos nem', deg: 270, color: '#94a3b8', showDeg: true }
      ]}
    />
  </SFig>
);

const coinsFig = (
  <SFig w={240} h={70} className="w-full max-w-[280px] h-auto mx-auto">
    {['1.', '2.', '3.', '4.'].map((t, i) => (
      <g key={t}>
        <circle cx={48 + i * 48} cy={32} r={16} fill="#fde68a" stroke={S_AMBER} strokeWidth={1.5} />
        <SText x={48 + i * 48} y={36} t="?" s={11} b />
        <SText x={48 + i * 48} y={62} t={`${t} házimunka`} s={7} c={S_AXIS} />
      </g>
    ))}
  </SFig>
);

const SAMPLING_12_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  {
    id: 'sm12-q1',
    questionTypeBadge: 'Mintavétel típusa',
    level: 1,
    question: 'Milyen mintavételnek felel meg az ötöslottó húzása?',
    options: ['visszatevés nélküli mintavétel', 'visszatevéses mintavétel', 'binomiális eloszlású ismételt kísérlet', 'egyik sem, ez nem mintavétel'],
    correctAnswer: 0,
    explanation: 'A kihúzott számot nem teszik vissza, egyszerre 5 különböző számot húznak: visszatevés nélküli mintavétel.'
  },
  {
    id: 'sm12-q2',
    questionTypeBadge: 'Binomiális együttható',
    level: 1,
    question: 'Mennyi (5 alatt 2), azaz hányféleképpen választható ki 5 nyerő számból 2?',
    options: ['10', '20', '25', '5'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) = 5 · 4 / 2 = 10. A 20 a sorrendet is figyelembe vevő kiválasztások száma.'
  },
  {
    id: 'sm12-q3',
    questionTypeBadge: 'Összes eset',
    level: 1,
    question: 'Hogyan adható meg az ötöslottóban az összes lehetséges húzás (eset) száma?',
    options: ['(90 alatt 5)', '90⁵', '90 · 89 · 88 · 87 · 86', '5 · 90'],
    correctAnswer: 0,
    explanation: '90 elemből 5-öt választunk, és a sorrend nem számít: (90 alatt 5) = 43 949 268. (90 · 89 · … · 86 a sorrendet is figyelembe venné.)'
  },
  {
    id: 'sm12-q4',
    questionTypeBadge: 'Binomiális eloszlás',
    level: 1,
    question: 'Egy szabályos pénzérmét háromszor feldobunk. Mennyi a valószínűsége, hogy pontosan 2 fejet kapunk?',
    options: ['3/8', '1/8', '2/3', '1/4'],
    correctAnswer: 0,
    explanation: '(3 alatt 2) · 0,5² · 0,5 = 3 · 1/8 = 3/8. (1/8 csak egy konkrét sorrend valószínűsége.)'
  },
  {
    id: 'sm12-q5',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Egy kísérletet n-szer megismétlünk, mindegyik p valószínűséggel kedvező. Melyik képlet adja meg, hogy pontosan k kedvező lesz?',
    options: ['(n alatt k) · p^k · (1 − p)^{n − k}', 'p^k · (1 − p)^{n − k}', '(n alatt k) · p^{n − k} · (1 − p)^k', 'k · p · (1 − p)'],
    correctAnswer: 0,
    explanation: 'Binomiális eloszlás: a k kedvező kísérlet helye (n alatt k)-féle lehet, egy ilyen sorrend valószínűsége p^k · (1 − p)^{n − k}.'
  },
  {
    id: 'sm12-q6',
    questionTypeBadge: 'Kosárra dobás',
    level: 1,
    question: '9 dobásból 3 talált a kosárba. Hányféleképpen alakulhatott, hogy melyik dobások voltak sikeresek?',
    options: ['84', '504', '27', '126'],
    correctAnswer: 0,
    explanation: '(9 alatt 3) = 9 · 8 · 7 / 6 = 84. (504 a sorrendet is számolná, 126 = (9 alatt 4).)'
  },
  {
    id: 'sm12-q7',
    questionTypeBadge: 'Két osztály',
    level: 1,
    question: 'Az elnök mindkét osztályból véletlenszerűen kiválaszt egy-egy diákot. Mennyi a valószínűsége, hogy mindkettő lány?',
    figure: FIG_CLASSES,
    options: ['0,275', '≈ 0,531', '0,25', '≈ 0,138'],
    correctAnswer: 0,
    explanation: 'Összesen 24 · 25 = 600 lehetőség, ebből 11 · 15 = 165 kedvező: 165 / 600 = 0,275.'
  },
  {
    id: 'sm12-q8',
    questionTypeBadge: 'Visszatevés nélkül',
    level: 1,
    question: 'Egy dobozban 5 piros és 5 fehér golyó van. Visszatevés nélkül kihúzunk kettőt. Mennyi a valószínűsége, hogy mindkettő piros?',
    options: ['2/9', '1/4', '1/2', '1/5'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) / (10 alatt 2) = 10 / 45 = 2/9 ≈ 0,222. (1/4 a visszatevéses eset valószínűsége lenne.)'
  },
  {
    id: 'sm12-q9',
    questionTypeBadge: 'Ismételt kísérlet',
    level: 1,
    question: 'Egy szabályos kockával négyszer dobunk. Mennyi a valószínűsége, hogy mind a négy dobás hatos?',
    options: ['1/1296', '4/6', '1/24', '1/216'],
    correctAnswer: 0,
    explanation: 'A dobások függetlenek: (1/6)⁴ = 1/1296.'
  },
  {
    id: 'sm12-q10',
    questionTypeBadge: 'Érettségi 2021',
    level: 1,
    question: 'Az {1; 2; 3; 4; 5} halmazból véletlenszerűen kiválasztunk két különböző számot. Mennyi a valószínűsége, hogy átlaguk egész szám?',
    options: ['0,4', '0,5', '0,6', '0,3'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) = 10 pár. Az átlag egész, ha a két szám azonos paritású: {1; 3}, {1; 5}, {3; 5}, {2; 4} → 4 / 10 = 0,4.'
  },
  // ------------------------------- 2. szint -------------------------------
  {
    id: 'sm12-q11',
    questionTypeBadge: 'Ötöslottó',
    level: 2,
    question: 'Mennyi a valószínűsége az ötöslottóban a kéttalálatos szelvénynek (három tizedesjegyre)?',
    figure: FIG_LOTTO2,
    options: ['≈ 0,022', '≈ 0,002', '≈ 0,026', '≈ 0,4'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) · (85 alatt 3) / (90 alatt 5) = 10 · 98 770 / 43 949 268 ≈ 0,0225. (0,002: elmaradt a (5 alatt 2); 0,026: visszatevéses modell.)'
  },
  {
    id: 'sm12-q12',
    questionTypeBadge: 'Visszatevés nélkül',
    level: 2,
    question: 'Egy újságíró a 49 végzős diák közül (26 lány) véletlenszerűen kiválaszt kettőt. Mennyi a valószínűsége, hogy mindkettő lány?',
    figure: FIG_GIRLS,
    options: ['≈ 0,276', '≈ 0,282', '≈ 0,531', '≈ 0,138'],
    correctAnswer: 0,
    explanation: '(26 alatt 2) / (49 alatt 2) = 325 / 1176 ≈ 0,276. (0,282 = (26/49)² visszatevéssel lenne.)'
  },
  {
    id: 'sm12-q13',
    questionTypeBadge: 'Binomiális eloszlás',
    level: 2,
    question: 'A mellékhatás valószínűsége 3%. 100 véletlenszerű vizsgálatnál mennyi a valószínűsége, hogy egyik esetben sem lép fel mellékhatás?',
    options: ['≈ 0,048', '0,97', '≈ 0,952', '0,03'],
    correctAnswer: 0,
    explanation: '0,97^{100} ≈ 0,048, azaz kb. 5%. (0,952 a „legalább egy mellékhatás” valószínűsége.)'
  },
  {
    id: 'sm12-q14',
    questionTypeBadge: 'Binomiális eloszlás',
    level: 2,
    question: 'Ugyanebben a helyzetben (n = 100, p = 0,03) mennyi a valószínűsége, hogy éppen három esetben lép fel mellékhatás?',
    options: ['≈ 0,227', '≈ 0,0000014', '0,03', '≈ 0,420'],
    correctAnswer: 0,
    explanation: '(100 alatt 3) · 0,03³ · 0,97^{97} ≈ 0,227. (0,0000014 a binomiális együttható nélkül jönne ki.)'
  },
  {
    id: 'sm12-q15',
    questionTypeBadge: 'Palacsinta',
    level: 2,
    question: 'Minden palacsinta egymástól függetlenül 0,1 valószínűséggel szakad el. Mennyi a valószínűsége, hogy 8 palacsintából pontosan 1 szakad el?',
    options: ['≈ 0,383', '≈ 0,048', '0,1', '≈ 0,430'],
    correctAnswer: 0,
    explanation: '(8 alatt 1) · 0,1 · 0,9⁷ = 8 · 0,1 · 0,4783 ≈ 0,383. (0,430 = 0,9⁸: egy sem szakad el.)'
  },
  {
    id: 'sm12-q16',
    questionTypeBadge: 'Szerencsekerék',
    level: 2,
    question: 'A szerencsekerék 0,25 valószínűséggel áll meg a „Nyertél!” feliratnál. 10-szer megpörgetjük. Mennyi a valószínűsége, hogy pontosan kétszer nyerünk?',
    figure: FIG_WHEEL,
    options: ['≈ 0,282', '≈ 0,006', '≈ 0,250', '0,2'],
    correctAnswer: 0,
    explanation: '(10 alatt 2) · 0,25² · 0,75⁸ = 45 · 0,0625 · 0,1001 ≈ 0,282. (0,250 a pontosan 3 nyerés valószínűsége.)'
  },
  {
    id: 'sm12-q17',
    questionTypeBadge: 'Társasjáték',
    level: 2,
    question: 'Aki legalább hármast dob, húzhat szerencsekártyát. Négyen játszanak. Mennyi a valószínűsége, hogy mindenki húzhat?',
    options: ['16/81 ≈ 0,198', '2/3', '1/81', '1/16'],
    correctAnswer: 0,
    explanation: 'Egy játékosra p = 4/6 = 2/3, a dobások függetlenek: (2/3)⁴ = 16/81 ≈ 0,198.'
  },
  {
    id: 'sm12-q18',
    questionTypeBadge: 'Érettségi 2022',
    level: 2,
    question: '20 edényből 5-ben natúr, 15-ben csokis müzli van. Véletlenszerűen kiválasztanak 4-et. Mennyi a valószínűsége, hogy pontosan egyben natúr müzli lesz?',
    figure: FIG_MUZLI,
    options: ['≈ 0,470', '≈ 0,422', '0,25', '≈ 0,094'],
    correctAnswer: 0,
    explanation: '5 · (15 alatt 3) / (20 alatt 4) = 5 · 455 / 4845 ≈ 0,470. (0,422 a visszatevéses binomiális modell eredménye.)'
  },
  {
    id: 'sm12-q19',
    questionTypeBadge: 'Kördiagram',
    level: 2,
    question: 'A kördiagram 36 tanuló kedvenc pizzáját mutatja. Véletlenszerűen kiválasztunk 5 tanulót. Mennyi a valószínűsége, hogy pontosan ketten választottak Carbonarát?',
    figure: FIG_PIZZA,
    options: ['≈ 0,363', '≈ 0,339', '0,4', '≈ 0,0021'],
    correctAnswer: 0,
    explanation: '160° → 160/360 · 36 = 16 Carbonara-párti, 20 más. (16 alatt 2) · (20 alatt 3) / (36 alatt 5) = 120 · 1140 / 376 992 ≈ 0,363. (A 0,339 a visszatevéses, binomiális modell eredménye lenne.)'
  },
  {
    id: 'sm12-q20',
    questionTypeBadge: 'Kosárra dobás',
    level: 2,
    question: '12 dobás ment mellé, és 3 talált a kosárba. Hányféleképpen alakulhatott, hogy melyik dobások voltak sikeresek?',
    options: ['455', '220', '36', '2730'],
    correctAnswer: 0,
    explanation: 'Összesen 15 dobás volt, ebből kell kiválasztani a 3 sikereset: (15 alatt 3) = 455. (220 = (12 alatt 3).)'
  },
  // ------------------------------- 3. szint -------------------------------
  {
    id: 'sm12-q21',
    questionTypeBadge: 'Legfeljebb k',
    level: 3,
    question: 'n = 100 vizsgálat, p = 0,03. Mennyi a valószínűsége, hogy háromnál kevesebb esetben lép fel mellékhatás?',
    options: ['≈ 0,420', '≈ 0,647', '≈ 0,580', '≈ 0,225'],
    correctAnswer: 0,
    explanation: 'P(0) + P(1) + P(2) ≈ 0,048 + 0,147 + 0,225 ≈ 0,420. (0,647 a 3-at is tartalmazná.)'
  },
  {
    id: 'sm12-q22',
    questionTypeBadge: 'Palacsinta',
    level: 3,
    question: 'Mennyi a valószínűsége, hogy 8 palacsintából legfeljebb kettő szakad el (p = 0,1)?',
    options: ['≈ 0,962', '≈ 0,149', '≈ 0,531', '≈ 0,038'],
    correctAnswer: 0,
    explanation: '0,9⁸ + 8 · 0,1 · 0,9⁷ + 28 · 0,01 · 0,9⁶ ≈ 0,430 + 0,383 + 0,149 ≈ 0,962.'
  },
  {
    id: 'sm12-q23',
    questionTypeBadge: 'Szerencsekerék',
    level: 3,
    question: 'A kereket (p = 0,25) 10-szer megpörgetjük. Mennyi a valószínűsége, hogy kétszer vagy háromszor nyerünk?',
    figure: FIG_WHEEL,
    options: ['≈ 0,532', '≈ 0,070', '≈ 0,282', '≈ 0,468'],
    correctAnswer: 0,
    explanation: 'A két esemény kizárja egymást, így összeadjuk: 0,282 + 0,250 ≈ 0,532. (0,070 a szorzatuk lenne.)'
  },
  {
    id: 'sm12-q24',
    questionTypeBadge: 'Kedvenc számok',
    level: 3,
    question: 'Sándor kedvenc számai a 90-nél nem nagyobb négyzetszámok és köbszámok. Hány kedvenc száma van?',
    options: ['11', '13', '9', '12'],
    correctAnswer: 0,
    explanation: '9 négyzetszám (1, 4, …, 81) és 4 köbszám (1, 8, 27, 64); az 1 és a 64 mindkettő, ezért 9 + 4 − 2 = 11.'
  },
  {
    id: 'sm12-q25',
    questionTypeBadge: 'Ötöslottó',
    level: 3,
    question: 'Sándornak 11 kedvenc száma van az 1–90 közül. Mennyi a valószínűsége, hogy a kihúzott öt számból pontosan három a kedvencei közül való?',
    figure: FIG_FAV,
    options: ['≈ 0,0116', '≈ 0,0141', '≈ 0,376', '≈ 0,0000105'],
    correctAnswer: 0,
    explanation: '(11 alatt 3) · (79 alatt 2) / (90 alatt 5) = 165 · 3081 / 43 949 268 ≈ 0,0116. (0,0141 a visszatevéses modell, 0,376 a pontosan egy kedvenc valószínűsége.)'
  },
  {
    id: 'sm12-q26',
    questionTypeBadge: 'Visszafelé számolás',
    level: 3,
    question: 'Egy játékban minden új mezőn ugyanakkora valószínűséggel nő a pontszám. Két új mezőre lépve 0,64 a valószínűsége, hogy mindkétszer nő. Mennyi ez a valószínűség egy mezőn?',
    options: ['0,8', '0,32', '0,64', '0,4'],
    correctAnswer: 0,
    explanation: 'A két mező független: p · p = 0,64, így p = √0,64 = 0,8.'
  },
  {
    id: 'sm12-q27',
    questionTypeBadge: 'Társasjáték',
    level: 3,
    question: 'Négy játékos dob (legalább hármas: kártyát húzhat). Mennyi a valószínűsége, hogy pontosan két játékos húzhat kártyát?',
    options: ['24/81 ≈ 0,296', '4/81 ≈ 0,049', '6/16 = 0,375', '1/3'],
    correctAnswer: 0,
    explanation: '(4 alatt 2) · (2/3)² · (1/3)² = 6 · 4/81 = 24/81 ≈ 0,296. (0,375 a p = 0,5 esetre igaz.)'
  },
  {
    id: 'sm12-q28',
    questionTypeBadge: 'Kördiagram',
    level: 3,
    question: 'A 36 tanulóból (lásd a kördiagramot) 5-öt választunk. Mennyi a valószínűsége, hogy közülük pontosan egy választotta a pepperónis pizzát?',
    figure: FIG_PIZZA,
    options: ['≈ 0,434', '≈ 0,407', '≈ 0,222', '≈ 0,206'],
    correctAnswer: 0,
    explanation: '80° → 80/360 · 36 = 8 fő pepperónis, 28 más. 8 · (28 alatt 4) / (36 alatt 5) = 8 · 20 475 / 376 992 ≈ 0,434. (0,407 a visszatevéses modell, 0,222 = 8/36 csak egy tanulóra vonatkozik.)'
  },
  {
    id: 'sm12-q29',
    questionTypeBadge: 'Ráadás',
    level: 3,
    question: 'Bence és Hajni 4 házimunkáról egyenként pénzfeldobással dönt. Mennyi a valószínűsége, hogy NEM 2–2 arányban oszlanak meg a munkák?',
    figure: coinsFig,
    options: ['0,625', '0,375', '0,5', '0,875'],
    correctAnswer: 0,
    explanation: 'P(2–2) = (4 alatt 2) / 2⁴ = 6/16 = 0,375, így a komplementer 1 − 0,375 = 0,625 – a legvalószínűbb kimenetel mégsem valószínűbb, mint a többi együtt.'
  },
  {
    id: 'sm12-q30',
    questionTypeBadge: 'Biztosító',
    level: 3,
    question: 'Minden ügyfél egymástól függetlenül 0,005 valószínűséggel szenved el káreseményt egy év alatt. Mennyi a valószínűsége, hogy 1200 ügyfélből pontosan 3-nak lesz kára?',
    options: ['≈ 0,089', '≈ 0,134', '≈ 0,0025', '≈ 0,017'],
    correctAnswer: 0,
    explanation: '(1200 alatt 3) · 0,005³ · 0,995^{1197} ≈ 0,089. (0,134 a pontosan 4, 0,017 a legfeljebb 1 kár valószínűsége.)'
  }
];

export const Sampling12Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g12-stat-mintavetelek-quiz"
      subtopicId="mintavetelek"
      title="10. Mintavételek – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: visszatevés nélküli és visszatevéses mintavétel, binomiális eloszlás."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={SAMPLING_12_QUESTIONS}
      cheatSheets={[
        {
          title: 'Visszatevés nélkül',
          items: [
            'N elem, M tulajdonsággal, n-et választunk.',
            'P(k) = (M alatt k) · (N − M alatt n − k) / (N alatt n)',
            'Ötöslottó: összes eset (90 alatt 5) = 43 949 268.',
            '2 találat: 10 · 98 770 / 43 949 268 ≈ 0,0225.'
          ]
        },
        {
          title: 'Visszatevéssel (binomiális)',
          items: [
            'n független ismétlés, mindegyik p valószínűséggel kedvező.',
            'P(pontosan k) = (n alatt k) · p^k · (1 − p)^{n − k}',
            'Egyik sem: (1 − p)^n; mind: p^n.',
            'Legfeljebb k: P(0) + P(1) + … + P(k).'
          ]
        },
        {
          title: 'Binomiális együtthatók',
          items: [
            '(n alatt k) = n · (n − 1) · … · (n − k + 1) / k!',
            '(9 alatt 3) = 84, (9 alatt 4) = 126, (12 alatt 3) = 220',
            '(13 alatt 4) = 715, (15 alatt 3) = 455',
            '(49 alatt 2) = 1176, (26 alatt 2) = 325'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Sampling12Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <Sampling12Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default Sampling12Quiz;
