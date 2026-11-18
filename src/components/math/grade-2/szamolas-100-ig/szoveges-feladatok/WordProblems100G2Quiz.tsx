import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WordProblems100G2Matcher } from './WordProblems100G2Matcher';
import { WordProblems100G2Sorter } from './WordProblems100G2Sorter';
import { QFig, BarPart, BarSeg, CompareBarsPart, CompareRow, IconPart, IconKind, WP_UNK } from './WordProblems100G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const PWQ: React.FC<{ segs: BarSeg[]; total: string; icon?: IconKind }> = ({ segs, total, icon }) => (
  <QFig h={96}>
    {icon && <IconPart kind={icon} x={28} y={64} s={1.2} />}
    <BarPart x={icon ? 56 : 20} y={50} w={icon ? 188 : 220} h={32} segs={segs} total={total} fontSize={16} />
  </QFig>
);

const CmpQ: React.FC<{ rows: [CompareRow, CompareRow]; diff?: string }> = ({ rows, diff }) => (
  <QFig h={96}>
    <CompareBarsPart x={12} y={14} w={236} h={28} nameW={70} rows={rows} diffLabel={diff} fontSize={15} />
  </QFig>
);

const ChainQ: React.FC<{ boxes: string[]; ops: string[] }> = ({ boxes, ops }) => {
  const n = boxes.length;
  const bw = 46;
  const step = (260 - 24 - bw) / (n - 1);
  return (
    <QFig h={86}>
      {boxes.map((b, i) => {
        const bx = 12 + i * step;
        const isQ = b === '?' || b === '□';
        return (
          <g key={i}>
            <rect x={bx} y={34} width={bw} height="34" rx="8" fill={isQ ? '#fee2e2' : '#fef3c7'} stroke={isQ ? WP_UNK : '#d97706'} strokeWidth="2.2" />
            <text x={bx + bw / 2} y={58} textAnchor="middle" fontSize="18" fontWeight="900" fill={isQ ? WP_UNK : '#78350f'}>
              {b}
            </text>
            {i < n - 1 && (
              <g>
                <line x1={bx + bw + 3} y1={51} x2={bx + step - 6} y2={51} stroke="#334155" strokeWidth="2" />
                <path d={`M ${bx + step - 10} 46 L ${bx + step - 3} 51 L ${bx + step - 10} 56 Z`} fill="#334155" />
                <text x={bx + bw / 2 + step / 2} y={28} textAnchor="middle" fontSize="15" fontWeight="900" fill={ops[i].startsWith('−') ? '#be123c' : '#1d4ed8'}>
                  {ops[i]}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

const PriceQ: React.FC<{ items: { icon: IconKind; name: string; price: number }[]; have?: number }> = ({ items, have }) => {
  const step = 240 / items.length;
  return (
    <QFig h={have ? 112 : 92}>
      {items.map((it, i) => {
        const cx = 10 + step * i + step / 2;
        return (
          <g key={i}>
            <IconPart kind={it.icon} x={cx} y={28} s={1.3} />
            <text x={cx} y={58} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
              {it.name}
            </text>
            <rect x={cx - 28} y={64} width="56" height="22" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
            <text x={cx} y={80} textAnchor="middle" fontSize="14" fontWeight="900" fill="#78350f">
              {it.price} Ft
            </text>
          </g>
        );
      })}
      {have !== undefined && (
        <text x="130" y="104" textAnchor="middle" fontSize="14" fontWeight="900" fill="#15803d">
          Neked van: {have} Ft
        </text>
      )}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const WORD_PROBLEMS100_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'wp100g2-q1',
    level: 1,
    questionTypeBadge: 'Összesen',
    figure: <PWQ icon="bead" segs={[{ label: '23', v: 23 }, { label: '14', v: 14 }]} total="?" />,
    question: 'Dorka 23 piros és 14 kék gyöngyöt fűzött fel. Hány gyöngy ez összesen?',
    options: ['37', '9', '36', '47'],
    correctAnswer: 0,
    explanation: '23 + 14 = 37. Összesen 37 gyöngy.'
  },
  {
    id: 'wp100g2-q2',
    level: 1,
    questionTypeBadge: 'Maradt',
    figure: <PWQ icon="apple" segs={[{ label: '?', v: 32 }, { label: '24', v: 24, crossed: true }]} total="56" />,
    question: 'A kosárban 56 alma volt. Megettek 24-et. Hány alma maradt?',
    options: ['32', '80', '22', '31'],
    correctAnswer: 0,
    explanation: '56 − 24 = 32. Ellenőrzés: 32 + 24 = 56. 32 alma maradt.'
  },
  {
    id: 'wp100g2-q3',
    level: 1,
    questionTypeBadge: 'Melyik művelet?',
    question: 'Hanna 40 matricájából 10-et elajándékoz. Melyik művelettel számolod ki, hány marad?',
    options: ['40 − 10', '40 + 10', '10 + 40', '40 − 30'],
    correctAnswer: 0,
    explanation: 'Elajándékoz, tehát kevesebb lesz: kivonunk. 40 − 10 = 30.'
  },
  {
    id: 'wp100g2-q4',
    level: 1,
    questionTypeBadge: 'Együtt',
    figure: <PWQ icon="chestnut" segs={[{ label: '52', v: 52 }, { label: '30', v: 30 }]} total="?" />,
    question: 'Ábel 52 gesztenyét gyűjtött, Nóra 30-at. Hányat gyűjtöttek együtt?',
    options: ['82', '22', '55', '72'],
    correctAnswer: 0,
    explanation: '52 + 30 = 82. 5 tízes + 3 tízes = 8 tízes, a 2 egyes marad.'
  },
  {
    id: 'wp100g2-q5',
    level: 1,
    questionTypeBadge: 'Maradt',
    figure: <ChainQ boxes={['60', '?']} ops={['− 20']} />,
    question: 'A buszon 60-an ültek. 20-an leszálltak. Hányan maradtak a buszon?',
    options: ['40', '80', '58', '30'],
    correctAnswer: 0,
    explanation: 'Leszálltak, tehát kevesebben lettek: 60 − 20 = 40.'
  },
  {
    id: 'wp100g2-q6',
    level: 1,
    questionTypeBadge: 'Ennyivel több',
    figure: (
      <CmpQ
        rows={[
          { name: 'Olivér', label: '34', v: 34 },
          { name: 'Emma', label: '?', v: 54 }
        ]}
        diff="20"
      />
    ),
    question: 'Olivér 34 kavicsot talált. Emma 20-szal többet. Hány kavicsot talált Emma?',
    options: ['54', '14', '36', '44'],
    correctAnswer: 0,
    explanation: 'Emma többet talált, az ő szalagja hosszabb: 34 + 20 = 54.'
  },
  {
    id: 'wp100g2-q7',
    level: 1,
    questionTypeBadge: 'Ennyivel kevesebb',
    figure: (
      <CmpQ
        rows={[
          { name: 'sárga', label: '65 Ft', v: 65 },
          { name: 'zöld', label: '?', v: 35 }
        ]}
        diff="30"
      />
    ),
    question: 'A sárga labda 65 Ft. A zöld 30 Ft-tal olcsóbb. Mennyibe kerül a zöld labda?',
    options: ['35 Ft', '95 Ft', '62 Ft', '45 Ft'],
    correctAnswer: 0,
    explanation: 'Olcsóbb = kevesebbe kerül: 65 − 30 = 35 Ft.'
  },
  {
    id: 'wp100g2-q8',
    level: 1,
    questionTypeBadge: 'Mennyi kell még?',
    figure: <PWQ icon="puzzle" segs={[{ label: '40', v: 40 }, { label: '?', v: 20 }]} total="60" />,
    question: 'A kirakó 60 darabos. 40 darab már a helyén van. Hány darab hiányzik még?',
    options: ['20', '100', '30', '10'],
    correctAnswer: 0,
    explanation: '40 + □ = 60, tehát □ = 60 − 40 = 20.'
  },
  {
    id: 'wp100g2-q9',
    level: 1,
    questionTypeBadge: 'Hozzátesz',
    figure: <PWQ icon="pencil" segs={[{ label: '34', v: 34 }, { label: '5', v: 8 }]} total="?" />,
    question: 'Egy dobozban 34 ceruza van. Beleteszünk még 5-öt. Hány ceruza lesz benne?',
    options: ['39', '29', '84', '38'],
    correctAnswer: 0,
    explanation: '34 + 5 = 39. Csak az egyesek változnak: 4 + 5 = 9.'
  },
  {
    id: 'wp100g2-q10',
    level: 1,
    questionTypeBadge: 'Válasz',
    question: 'A számolás: 64 − 21 = 43. A kérdés: Hány madár maradt a fán? Melyik a jó válasz?',
    options: ['43 madár maradt a fán.', '64 madár maradt a fán.', '21 madár maradt a fán.', '85 madár maradt a fán.'],
    correctAnswer: 0,
    explanation: 'A válaszban a művelet eredménye (43) áll, egész mondatban.'
  },

  // ---------- 2. szint ----------
  {
    id: 'wp100g2-q11',
    level: 2,
    questionTypeBadge: 'Összesen',
    figure: <PWQ icon="book" segs={[{ label: '38', v: 38 }, { label: '27', v: 27 }]} total="?" />,
    question: 'A polcon 38 mesekönyv és 27 verseskönyv van. Hány könyv ez összesen?',
    options: ['65', '55', '11', '64'],
    correctAnswer: 0,
    explanation: '38 + 27: 38 + 20 = 58, 58 + 7 = 65.'
  },
  {
    id: 'wp100g2-q12',
    level: 2,
    questionTypeBadge: 'Maradt',
    figure: <PWQ icon="cherry" segs={[{ label: '?', v: 36 }, { label: '36', v: 36, crossed: true }]} total="72" />,
    question: 'Zsófi 72 szem cseresznyét szedett. 36-ot megevett. Hány szem maradt?',
    options: ['36', '44', '46', '34'],
    correctAnswer: 0,
    explanation: '72 − 36: 72 − 30 = 42, 42 − 6 = 36. Ellenőrzés: 36 + 36 = 72.'
  },
  {
    id: 'wp100g2-q13',
    level: 2,
    questionTypeBadge: 'Mennyivel több?',
    figure: (
      <CmpQ
        rows={[
          { name: 'Bálint', label: '74', v: 74 },
          { name: 'Nóra', label: '50', v: 50 }
        ]}
        diff="?"
      />
    ),
    question: 'Bálint 74 pontot szerzett, Nóra 50-et. Mennyivel szerzett többet Bálint?',
    options: ['24', '34', '26', '14'],
    correctAnswer: 0,
    explanation: 'A nagyobbikból kivonjuk a kisebbet: 74 − 50 = 24.'
  },
  {
    id: 'wp100g2-q14',
    level: 2,
    questionTypeBadge: 'Árlista',
    figure: (
      <PriceQ
        items={[
          { icon: 'card', name: 'radír', price: 28 },
          { icon: 'book', name: 'füzet', price: 35 },
          { icon: 'pencil', name: 'ceruza', price: 40 }
        ]}
      />
    ),
    question: 'Mennyit fizetsz, ha a radírt és a füzetet veszed meg?',
    options: ['63 Ft', '53 Ft', '68 Ft', '75 Ft'],
    correctAnswer: 0,
    explanation: 'Radír 28 Ft, füzet 35 Ft: 28 + 35 = 63 Ft. A ceruza most nem kell!'
  },
  {
    id: 'wp100g2-q15',
    level: 2,
    questionTypeBadge: 'Ennyivel kevesebb',
    figure: (
      <CmpQ
        rows={[
          { name: '1. polc', label: '54', v: 54 },
          { name: '2. polc', label: '?', v: 46 }
        ]}
        diff="8"
      />
    ),
    question: 'Az első polcon 54 könyv van. A másodikon 8-cal kevesebb. Hány könyv van a második polcon?',
    options: ['46', '62', '56', '44'],
    correctAnswer: 0,
    explanation: '54 − 8: 54 − 4 = 50, 50 − 4 = 46.'
  },
  {
    id: 'wp100g2-q16',
    level: 2,
    questionTypeBadge: 'Mennyi van hátra?',
    figure: <PWQ icon="star" segs={[{ label: '65', v: 65 }, { label: '?', v: 35 }]} total="100" />,
    question: 'Levente 100 lépést akar megtenni. Már 65-öt megtett. Hány lépés van még hátra?',
    options: ['35', '45', '25', '30'],
    correctAnswer: 0,
    explanation: '65 + 35 = 100, tehát 100 − 65 = 35 lépés van hátra.'
  },
  {
    id: 'wp100g2-q17',
    level: 2,
    questionTypeBadge: 'Mennyi volt?',
    figure: <PWQ icon="star" segs={[{ label: '40', v: 40 }, { label: '25', v: 25, crossed: true }]} total="?" />,
    question: 'Dorka elajándékozott 25 matricát. Maradt 40. Hány matricája volt az elején?',
    options: ['65', '15', '55', '64'],
    correctAnswer: 0,
    explanation: 'Az egész = ami maradt + amit elajándékozott: 40 + 25 = 65.'
  },
  {
    id: 'wp100g2-q18',
    level: 2,
    questionTypeBadge: 'Kérdés és művelet',
    question: 'Emma 30 Ft-ot kapott, Nóra 50 Ft-ot. Melyik kérdésre felel az 50 − 30?',
    options: ['Mennyivel kapott többet Nóra?', 'Mennyit kaptak együtt?', 'Mennyit kapott Emma?', 'Mennyit kapott Nóra?'],
    correctAnswer: 0,
    explanation: 'Az 50 − 30 a különbség: Nóra 20 Ft-tal kapott többet. Az „együtt” 50 + 30 lenne.'
  },
  {
    id: 'wp100g2-q19',
    level: 2,
    questionTypeBadge: 'Maradt',
    figure: <PWQ icon="leaf" segs={[{ label: '?', v: 45 }, { label: '40', v: 40, crossed: true }]} total="85" />,
    question: 'A fán 85 levél volt. Lehullott 40. Hány levél maradt a fán?',
    options: ['45', '81', '55', '35'],
    correctAnswer: 0,
    explanation: '85 − 40: 8 tízes − 4 tízes = 4 tízes, az 5 egyes marad: 45.'
  },
  {
    id: 'wp100g2-q20',
    level: 2,
    questionTypeBadge: 'Hosszúság',
    figure: <PWQ icon="ribbon" segs={[{ label: '?', v: 55 }, { label: '35', v: 35, crossed: true }]} total="90 cm" />,
    question: 'A szalag 90 cm hosszú. Levágunk belőle 35 cm-t. Milyen hosszú szalag marad?',
    options: ['55 cm', '65 cm', '45 cm', '54 cm'],
    correctAnswer: 0,
    explanation: '90 − 35: 90 − 30 = 60, 60 − 5 = 55 cm.'
  },

  // ---------- 3. szint ----------
  {
    id: 'wp100g2-q21',
    level: 3,
    questionTypeBadge: 'Csapda: „ez több”',
    figure: (
      <CmpQ
        rows={[
          { name: 'Levente', label: '58', v: 58 },
          { name: 'Zsófi', label: '?', v: 44 }
        ]}
        diff="14"
      />
    ),
    question: 'Levente 58 matricát gyűjtött. Ez 14-gyel több, mint Zsófié. Hány matricája van Zsófinak?',
    options: ['44', '72', '46', '34'],
    correctAnswer: 0,
    explanation: 'Leventének van több, Zsófinak kevesebb: 58 − 14 = 44.'
  },
  {
    id: 'wp100g2-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <ChainQ boxes={['24', '□', '?']} ops={['+ 30', '− 15']} />,
    question: 'Hanna vett 24 gyöngyöt, aztán még 30-at. 15-öt felfűzött. Hány gyöngy maradt?',
    options: ['39', '54', '69', '9'],
    correctAnswer: 0,
    explanation: '1. lépés: 24 + 30 = 54. 2. lépés: 54 − 15 = 39.'
  },
  {
    id: 'wp100g2-q23',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: (
      <CmpQ
        rows={[
          { name: 'Ábel', label: '35', v: 35 },
          { name: 'Nóra', label: '?', v: 45 }
        ]}
        diff="10"
      />
    ),
    question: 'Ábel 35 kavicsot gyűjtött. Nóra 10-zel többet. Hány kavicsot gyűjtöttek együtt?',
    options: ['80', '45', '70', '25'],
    correctAnswer: 0,
    explanation: 'Nóra: 35 + 10 = 45. Együtt: 35 + 45 = 80.'
  },
  {
    id: 'wp100g2-q24',
    level: 3,
    questionTypeBadge: 'Három szám',
    figure: (
      <PWQ
        icon="chestnut"
        segs={[
          { label: '23', v: 23 },
          { label: '31', v: 31 },
          { label: '15', v: 15 }
        ]}
        total="?"
      />
    ),
    question: 'Hétfőn 23, kedden 31, szerdán 15 gesztenyét gyűjtött az osztály. Hány gesztenye ez összesen?',
    options: ['69', '54', '59', '79'],
    correctAnswer: 0,
    explanation: '23 + 31 = 54, és 54 + 15 = 69.'
  },
  {
    id: 'wp100g2-q25',
    level: 3,
    questionTypeBadge: 'Mennyi van hátra?',
    figure: (
      <PWQ
        icon="puzzle"
        segs={[
          { label: '40', v: 40 },
          { label: '35', v: 35 },
          { label: '?', v: 25 }
        ]}
        total="100"
      />
    ),
    question: 'A kirakó 100 darabos. Lili 40 darabot, Bence 35-öt rakott be. Hány darab van még hátra?',
    options: ['25', '75', '35', '15'],
    correctAnswer: 0,
    explanation: 'Berakták: 40 + 35 = 75. Hátra van: 100 − 75 = 25.'
  },
  {
    id: 'wp100g2-q26',
    level: 3,
    questionTypeBadge: 'Csapda: „rövidebb”',
    figure: (
      <CmpQ
        rows={[
          { name: 'kék', label: '?', v: 43 },
          { name: 'piros', label: '28', v: 28 }
        ]}
        diff="15"
      />
    ),
    question: 'A piros szalag 28 cm. Ez 15 cm-rel rövidebb a kéknél. Milyen hosszú a kék szalag?',
    options: ['43 cm', '13 cm', '33 cm', '42 cm'],
    correctAnswer: 0,
    explanation: 'A piros a rövidebb, a kék a hosszabb: 28 + 15 = 43 cm.'
  },
  {
    id: 'wp100g2-q27',
    level: 3,
    questionTypeBadge: 'Le és fel',
    figure: <ChainQ boxes={['51', '□', '?']} ops={['− 18', '+ 7']} />,
    question: 'A villamoson 51-en utaztak. 18-an leszálltak, 7-en felszálltak. Hányan utaznak most?',
    options: ['40', '33', '26', '62'],
    correctAnswer: 0,
    explanation: '1. lépés: 51 − 18 = 33. 2. lépés: 33 + 7 = 40.'
  },
  {
    id: 'wp100g2-q28',
    level: 3,
    questionTypeBadge: 'Vásárlás',
    figure: (
      <PriceQ
        items={[
          { icon: 'pencil', name: 'ceruza', price: 35 },
          { icon: 'card', name: 'radír', price: 20 }
        ]}
        have={80}
      />
    ),
    question: 'Van 80 Ft-od. Veszel egy ceruzát és egy radírt. Mennyi pénzed marad?',
    options: ['25 Ft', '45 Ft', '55 Ft', '60 Ft'],
    correctAnswer: 0,
    explanation: 'Fizetsz: 35 + 20 = 55 Ft. Marad: 80 − 55 = 25 Ft.'
  },
  {
    id: 'wp100g2-q29',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: (
      <CmpQ
        rows={[
          { name: 'fiúk', label: '46', v: 46 },
          { name: 'lányok', label: '61', v: 61 }
        ]}
        diff="?"
      />
    ),
    question: 'A fiúk 46, a lányok 61 pontot szereztek. Hány pont kellett volna még a fiúknak, hogy annyi legyen, mint a lányoké?',
    options: ['15', '25', '5', '14'],
    correctAnswer: 0,
    explanation: '46 + □ = 61. 46 + 4 = 50, 50 + 11 = 61, tehát 15 pont.'
  },
  {
    id: 'wp100g2-q30',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    question: 'Egy dobozban 60 golyó van. Ábel kivesz 20-at, aztán visszatesz 5-öt. Melyik műveletsor mutatja ezt?',
    options: ['60 − 20 + 5', '60 + 20 − 5', '60 − 20 − 5', '60 + 20 + 5'],
    correctAnswer: 0,
    explanation: 'Kivesz → kivonás (− 20). Visszatesz → összeadás (+ 5). 60 − 20 + 5 = 45.'
  }
];

export const WordProblems100G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szamolas-100-ig"
    topicId="g2-c100-szoveges-quiz"
    subtopicId="szoveges-feladatok"
    title="5. Szöveges feladatok – Kvíz"
    subtitle="30 feladat 3 szinten: összesen, maradt, mennyi kell még, ennyivel több/kevesebb, két lépés és csapdák."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • KVÍZ"
    questions={WORD_PROBLEMS100_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Az 5 lépés',
        items: ['Adatok: mit tudok?', 'Terv: + vagy −?', 'Számolás', 'Ellenőrzés fordított művelettel', 'Válasz egész mondatban']
      },
      {
        title: 'Melyik művelet?',
        items: ['Összesen, együtt → +', 'Maradt, elvitt, megevett → −', 'Mennyi kell még? → −', 'Mennyivel több? → nagyobb − kisebb']
      },
      {
        title: 'Csapdák',
        items: ['„Ez 14-gyel több, mint Zsófié” → Zsófinak kevesebb!', 'Rajzolj szalagot: több = hosszabb', 'Két lépés: előbb az egyik, aztán a másik', 'Mindig nézd meg a mértékegységet!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <WordProblems100G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <WordProblems100G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default WordProblems100G2Quiz;
