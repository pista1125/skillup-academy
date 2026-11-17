import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RomanEverydayG3Matcher } from './RomanEverydayG3Matcher';
import { RomanEverydayG3Sorter } from './RomanEverydayG3Sorter';
import { FONT, SERIF, RomanClock, BookG, PlaqueG, CalendarG, StickText, MirrorHalf } from './RomanEverydayG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const ClockQ: React.FC<{ hour?: number; iiii?: boolean; hideIdx?: number; hideHands?: boolean }> = ({ hour = 0, iiii, hideIdx, hideHands }) => (
  <QFig h={170}>
    <RomanClock cx={120} cy={85} r={76} hour={hour} minute={0} useIIII={iiii} hideIdx={hideIdx} hideHands={hideHands} />
  </QFig>
);

const StickQ: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={90}>
    <StickText text={text} cx={120} y={22} h={text.length > 9 ? 40 : 46} />
  </QFig>
);

const MirrorQ: React.FC<{ text: string; hh?: number }> = ({ text, hh = 40 }) => (
  <QFig h={130}>
    <MirrorHalf text={text} cx={120} lineY={66} hh={hh} />
    <text x="120" y="108" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
    <text x="120" y="124" textAnchor="middle" fontSize="9" fill="#64748b">a piros vonal a tükör</text>
  </QFig>
);

const VMirrorQ: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={110}>
    <StickText text={text} cx={70} y={26} h={50} />
    <line x1="120" y1="14" x2="120" y2="96" stroke={UNK} strokeWidth="2.5" />
    <text x="170" y="64" textAnchor="middle" fontSize="28" fontWeight="bold" fill={UNK}>?</text>
    <text x="120" y="106" textAnchor="middle" fontSize="9" fill="#64748b">tükör</text>
  </QFig>
);

const BookQ: React.FC<{ label: string }> = ({ label }) => (
  <QFig h={120}>
    <BookG x={40} y={14} w={160} label={label} color="#7c3aed" />
  </QFig>
);

const PlaqueQ: React.FC<{ text: string; sub?: string }> = ({ text, sub }) => (
  <QFig h={130}>
    <circle cx="120" cy="26" r="14" fill="#a8a29e" />
    <path d="M 96 76 Q 98 44 120 42 Q 142 44 144 76 Z" fill="#a8a29e" />
    <PlaqueG x={60} y={76} w={120} h={42} text={text} sub={sub} fill="#e7e5e4" stroke="#57534e" fs={18} />
  </QFig>
);

const SignQ: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={100}>
    <rect x="40" y="18" width="160" height="64" rx="6" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
    <rect x="45" y="23" width="150" height="54" rx="4" fill="none" stroke="#fff" strokeWidth="1.5" />
    <text x="120" y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">Rigó utca</text>
    <text x="120" y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#fde047" fontFamily={SERIF}>{text}</text>
  </QFig>
);

const CalQ: React.FC<{ main: string; top?: string }> = ({ main, top = '2026.' }) => (
  <QFig h={130}>
    <CalendarG x={70} y={12} w={100} top={top} main={main} bottom="hónap: ?" />
  </QFig>
);

const TwoCalQ: React.FC<{ a: string; b: string; na: string; nb: string }> = ({ a, b, na, nb }) => (
  <QFig h={130}>
    <CalendarG x={22} y={10} w={86} top={na} main={a} />
    <CalendarG x={132} y={10} w={86} top={nb} main={b} />
    <text x="120" y="54" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ROMAN_EVERYDAY_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'rme-q1',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={9} />,
    question: 'Hány órát mutat az óra?',
    options: ['9 órát', '11 órát', '10 órát', '8 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató (piros) a IX-en áll. IX = 10 – 1 = 9. Ez 9 óra.'
  },
  {
    id: 'rme-q2',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={4} />,
    question: 'Hány órát mutat az óra?',
    options: ['4 órát', '6 órát', '5 órát', '3 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató a IV-en áll. Az I a V előtt van, ezért elvesszük: 5 – 1 = 4.'
  },
  {
    id: 'rme-q3',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hideIdx={0} hideHands />,
    question: 'Melyik szám hiányzik az óra tetejéről?',
    options: ['XII', 'IIX', 'XXI', 'XI'],
    correctAnswer: 0,
    explanation: 'Az óra tetején a 12 áll. 12 = 10 + 2, római számmal XII.'
  },
  {
    id: 'rme-q4',
    level: 1,
    questionTypeBadge: 'Könyv',
    figure: <BookQ label="VIII." />,
    question: 'Hányadik fejezetnél van nyitva a könyv?',
    options: ['a nyolcadiknál', 'a hetediknél', 'a kilencediknél', 'a harmadiknál'],
    correctAnswer: 0,
    explanation: 'VIII = 5 + 1 + 1 + 1 = 8. A pont azt jelenti: hányadik. Ez a nyolcadik fejezet.'
  },
  {
    id: 'rme-q5',
    level: 1,
    questionTypeBadge: 'Király',
    figure: <PlaqueQ text="IV. Béla" sub="király" />,
    question: 'Hogyan olvassuk a szobor tábláját?',
    options: ['negyedik Béla', 'hatodik Béla', 'ötödik Béla', 'négy Béla'],
    correctAnswer: 0,
    explanation: 'IV = 4. A pont miatt sorszámként olvassuk: negyedik Béla. Nem „négy Béla”!'
  },
  {
    id: 'rme-q6',
    level: 1,
    questionTypeBadge: 'Dátum',
    figure: <CalQ main="XI. 17." />,
    question: 'Melyik hónap van a naptárlapon?',
    options: ['november', 'szeptember', 'október', 'december'],
    correctAnswer: 0,
    explanation: 'XI = 10 + 1 = 11. A 11. hónap a november.'
  },
  {
    id: 'rme-q7',
    level: 1,
    questionTypeBadge: 'Kerület',
    figure: <SignQ text="XIII. kerület" />,
    question: 'Hányadik kerületben van a Rigó utca?',
    options: ['a 13. kerületben', 'a 12. kerületben', 'a 31. kerületben', 'a 8. kerületben'],
    correctAnswer: 0,
    explanation: 'XIII = 10 + 1 + 1 + 1 = 13. A 13. kerületben van.'
  },
  {
    id: 'rme-q8',
    level: 1,
    questionTypeBadge: 'Dátum',
    question: 'Egy dátumban a hónap helyén III. áll. Melyik hónap ez?',
    options: ['március', 'február', 'április', 'május'],
    correctAnswer: 0,
    explanation: 'III = 3. A 3. hónap a március (január, február, március).'
  },
  {
    id: 'rme-q9',
    level: 1,
    questionTypeBadge: 'Pálcika',
    question: 'Hány pálcika kell a VII kirakásához?',
    options: ['4', '3', '7', '2'],
    correctAnswer: 0,
    explanation: 'A V 2 pálcika, a két I még 2. Összesen 2 + 1 + 1 = 4 pálcika.'
  },
  {
    id: 'rme-q10',
    level: 1,
    questionTypeBadge: 'Tükrözés',
    figure: <MirrorQ text="V" hh={44} />,
    question: 'Tükrözd a V-t a piros vonalra! Mi lesz a V-ből és a tükörképéből?',
    options: ['X', 'V', 'I', 'L'],
    correctAnswer: 0,
    explanation: 'A V tükörképe fejjel lefelé álló V. A kettő együtt X.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'rme-q11',
    level: 2,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={11} />,
    question: 'Hány órát mutat az óra?',
    options: ['11 órát', '9 órát', '12 órát', '1 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató a XI-en áll. Az I az X után van, ezért hozzáadjuk: 10 + 1 = 11. (A IX lenne a 9.)'
  },
  {
    id: 'rme-q12',
    level: 2,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={4} iiii />,
    question: 'Ezen a régi órán IIII áll a IV helyett. Hány órát mutat?',
    options: ['4 órát', '6 órát', '3 órát', '8 órát'],
    correctAnswer: 0,
    explanation: 'A IIII is 4-et jelent: 1 + 1 + 1 + 1 = 4. Ilyet csak órán látsz, máshol IV-et írunk.'
  },
  {
    id: 'rme-q13',
    level: 2,
    questionTypeBadge: 'Könyv',
    figure: <BookQ label="XIV." />,
    question: 'Zsombor ennél a fejezetnél tart. Hányadik fejezet ez?',
    options: ['a 14.', 'a 16.', 'a 15.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'XIV = X + IV = 10 + 4 = 14. Az I a V előtt áll, ezért elvesszük (nem 16!).'
  },
  {
    id: 'rme-q14',
    level: 2,
    questionTypeBadge: 'Király',
    question: 'Melyik király neve előtt áll a legnagyobb sorszám? I. István, II. András, III. Béla, IV. Béla',
    options: ['IV. Béla', 'III. Béla', 'II. András', 'I. István'],
    correctAnswer: 0,
    explanation: 'I = 1, II = 2, III = 3, IV = 4. A legnagyobb a 4: IV. Béla.'
  },
  {
    id: 'rme-q15',
    level: 2,
    questionTypeBadge: 'Dátum',
    question: 'Hogyan írjuk római számmal a hónapot? 2026. április 9.',
    options: ['2026. IV. 9.', '2026. VI. 9.', '2026. IIII. 9.', '2026. IV. IX.'],
    correctAnswer: 0,
    explanation: 'Az április a 4. hónap: IV. A napot (9.) arab számmal írjuk.'
  },
  {
    id: 'rme-q16',
    level: 2,
    questionTypeBadge: 'Dátum',
    question: 'Panni születésnapja: IX. 23. Melyik napon van?',
    options: ['szeptember 23.', 'november 23.', 'október 23.', 'július 23.'],
    correctAnswer: 0,
    explanation: 'IX = 10 – 1 = 9. A 9. hónap a szeptember. (A XI lenne a november.)'
  },
  {
    id: 'rme-q17',
    level: 2,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="VI-V=X" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['V + V = X', 'V – V = X', 'VI + V = X', 'VII – V = X'],
    correctAnswer: 0,
    explanation: 'Most 6 – 5 = 10, hamis. Vedd ki az I-t a VI-ból, és tedd a mínuszra: V + V = X, vagyis 5 + 5 = 10.'
  },
  {
    id: 'rme-q18',
    level: 2,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="XII+IV=VII" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['XII – IV = VIII', 'XII + IV = VIII', 'XI + IV = VIII', 'XII – IV = VII'],
    correctAnswer: 0,
    explanation: 'Most 12 + 4 = 7, hamis. A + álló pálcikáját tedd a VII végére: XII – IV = VIII, vagyis 12 – 4 = 8.'
  },
  {
    id: 'rme-q19',
    level: 2,
    questionTypeBadge: 'Tükrözés',
    figure: <MirrorQ text="VII" />,
    question: 'Tükrözd a pálcikákat a piros vonalra! Melyik szám lesz belőle?',
    options: ['XII', 'VII', 'XVII', 'XIII'],
    correctAnswer: 0,
    explanation: 'A V-ből a tükörképével X lesz, a két I megnyúlik, de I marad. Ez XII = 12.'
  },
  {
    id: 'rme-q20',
    level: 2,
    questionTypeBadge: 'Tükrözés',
    figure: <VMirrorQ text="IV" />,
    question: 'A IV-et álló tükör mellé teszed. Mit látsz a tükörben?',
    options: ['VI', 'IV', 'IX', 'XI'],
    correctAnswer: 0,
    explanation: 'Az álló tükörben a bal és a jobb oldal helyet cserél. Az I a V másik oldalára kerül: VI.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'rme-q21',
    level: 3,
    questionTypeBadge: 'Sorszám',
    question: '2024-ben Párizsban a XXXIII. nyári olimpiát rendezték. Hányadik lesz a következő?',
    options: ['a XXXIV.', 'a XXXV.', 'a XXXIIII.', 'a XXXII.'],
    correctAnswer: 0,
    explanation: 'XXXIII = 33. A következő a 34.: XXX + IV = XXXIV. (Négy I nem állhat egymás mellett!)'
  },
  {
    id: 'rme-q22',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={9} />,
    question: 'Melyik számon áll a kismutató 3 óra múlva?',
    options: ['XII', 'VI', 'XI', 'III'],
    correctAnswer: 0,
    explanation: 'Most 9 óra van (IX). 9 + 3 = 12. A kismutató a XII-n lesz.'
  },
  {
    id: 'rme-q23',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={7} />,
    question: 'Melyik számon állt a kismutató 2 órával korábban?',
    options: ['V', 'IX', 'VI', 'IV'],
    correctAnswer: 0,
    explanation: 'Most 7 óra van (VII). 7 – 2 = 5. Két órája a V-ön állt.'
  },
  {
    id: 'rme-q24',
    level: 3,
    questionTypeBadge: 'Könyv',
    question: 'Kristóf könyve XX fejezetből áll. Most fejezte be a XVI. fejezetet. Hány fejezet van még hátra?',
    options: ['4', '5', '6', '14'],
    correctAnswer: 0,
    explanation: 'XX = 20, XVI = 16. Még hátra van: 17., 18., 19., 20. Ez 20 – 16 = 4 fejezet.'
  },
  {
    id: 'rme-q25',
    level: 3,
    questionTypeBadge: 'Király',
    question: 'Hány Béla nevű király uralkodott IV. Béla előtt?',
    options: ['3', '4', '5', '1'],
    correctAnswer: 0,
    explanation: 'IV. Béla a negyedik Béla. Előtte volt I., II. és III. Béla: 3 király.'
  },
  {
    id: 'rme-q26',
    level: 3,
    questionTypeBadge: 'Dátum',
    figure: <TwoCalQ a="III. 8." b="V. 8." na="Botond" nb="Vilma" />,
    question: 'Hány hónappal később van Vilma születésnapja, mint Botondé?',
    options: ['2 hónappal', '3 hónappal', '5 hónappal', '8 hónappal'],
    correctAnswer: 0,
    explanation: 'III = 3 (március), V = 5 (május). 5 – 3 = 2. Két hónappal később.'
  },
  {
    id: 'rme-q27',
    level: 3,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="IV-I=IV" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['IV + I = V', 'IV – I = V', 'IV + I = IV', 'IV – II = IV'],
    correctAnswer: 0,
    explanation: 'Most 4 – 1 = 4, hamis. Vedd ki az utolsó IV-ből az I-t (V marad), és tedd a mínuszra: IV + I = V, 4 + 1 = 5.'
  },
  {
    id: 'rme-q28',
    level: 3,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="XX-X=XXIX" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['XX + X = XXX', 'XX – X = XXX', 'XX + X = XXIX', 'XXI – X = XXIX'],
    correctAnswer: 0,
    explanation: 'Most 20 – 10 = 29, hamis. Vedd ki az I-t a XXIX-ből (XXX lesz), és tedd a mínuszra: 20 + 10 = 30.'
  },
  {
    id: 'rme-q29',
    level: 3,
    questionTypeBadge: 'Tükrözés',
    figure: <MirrorQ text="VITIV_" hh={30} />,
    question: 'Tükrözd a pálcikákat a piros vonalra! Mennyi a kapott művelet eredménye?',
    options: ['20', '10', '22', '2'],
    correctAnswer: 0,
    explanation: 'A tükörképpel ez lesz: XI + IX = . XI = 11, IX = 9, 11 + 9 = 20.'
  },
  {
    id: 'rme-q30',
    level: 3,
    questionTypeBadge: 'Sorszám',
    question: 'A III. emeleten laksz. 3 emelettel feljebb mész. Hányadik emeletre érsz?',
    options: ['a VI. emeletre', 'az V. emeletre', 'a IV. emeletre', 'a IX. emeletre'],
    correctAnswer: 0,
    explanation: 'III = 3. 3 + 3 = 6. A 6. emelet római számmal VI.'
  }
];

export const RomanEverydayG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId="g3-rom-mindennapok-quiz"
      subtopicId="romai-szamok-a-mindennapokban"
      title="3. Római számok a mindennapokban és fejtörők – Kvíz"
      subtitle="30 feladat 3 szinten: óra, sorszámok, dátumok, pálcikás fejtörők, tükrözés."
      badge="3. OSZTÁLY • II. A RÓMAI SZÁMOK • KVÍZ"
      questions={ROMAN_EVERYDAY_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az óra számai',
          items: ['I II III IV V VI', 'VII VIII IX X XI XII', 'Régi órákon: IIII = 4', 'Piros (kicsi) mutató: az óra']
        },
        {
          title: 'Sorszám és dátum',
          items: ['IV. Béla = negyedik Béla', 'XIII. kerület = 13. kerület', '2026. XI. 17. = november 17.', 'Csak a hónap római szám!']
        },
        {
          title: 'Pálcikák',
          items: ['I = 1, V = 2, X = 2 pálcika', '+ = 2, – = 1, = = 2 pálcika', 'Tükörben: V-ből X, ⊥-ből +', 'A végén szabályos szám legyen!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RomanEverydayG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <RomanEverydayG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default RomanEverydayG3Quiz;
