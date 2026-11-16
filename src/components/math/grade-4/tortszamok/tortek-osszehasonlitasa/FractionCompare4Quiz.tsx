import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FractionCompare4Matcher } from './FractionCompare4Matcher';
import { FractionCompare4Sorter } from './FractionCompare4Sorter';
import { BarG, PieG } from './FractionCompare4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – kis SVG-k, az ismeretlent „?” jelöli
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; title?: string; h?: number }> = ({ children, title, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x="120" y="17" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

const T: React.FC<{ x: number; y: number; t: string; s?: number; c?: string; a?: 'start' | 'middle' | 'end' }> = ({ x, y, t, s = 12, c, a = 'middle' }) => (
  <text x={x} y={y} fontSize={s} fontWeight="bold" textAnchor={a} fill={t.includes('?') ? '#dc2626' : c ?? '#0f172a'}>
    {t}
  </text>
);

/** Két csík egymás alatt, mellettük a felirat, köztük „?”. */
const TwoBars: React.FC<{ a: [number, number]; b: [number, number]; la: string; lb: string; title?: string }> = ({ a, b, la, lb, title }) => (
  <QFig title={title}>
    <BarG x={16} y={30} w={150} h={26} parts={a[1]} filled={a[0]} color="#f97316" />
    <T x={174} y={48} t={la} a="start" s={12} c="#c2410c" />
    <T x={91} y={86} t="?" s={20} />
    <BarG x={16} y={100} w={150} h={26} parts={b[1]} filled={b[0]} color="#2563eb" />
    <T x={174} y={118} t={lb} a="start" s={12} c="#1d4ed8" />
  </QFig>
);

/** Két pizza egymás mellett. */
const TwoPies: React.FC<{ a: [number, number]; b: [number, number]; la: string; lb: string; title?: string }> = ({ a, b, la, lb, title }) => (
  <QFig title={title}>
    <PieG cx={62} cy={76} r={42} parts={a[1]} filled={a[0]} pizza />
    <T x={62} y={138} t={la} c="#9a3412" />
    <T x={120} y={84} t="?" s={22} />
    <PieG cx={178} cy={76} r={42} parts={b[1]} filled={b[0]} pizza />
    <T x={178} y={138} t={lb} c="#9a3412" />
  </QFig>
);

/** 0 m – 1 km pálya 100 m-es beosztással, RAJT és CÉL felirattal (zászlók nélkül, hogy ne árulja el a választ). */
const Track: React.FC<{ title?: string; note?: string }> = ({ title, note }) => {
  const X = (m: number) => 20 + (200 * m) / 1000;
  return (
    <QFig title={title} h={130}>
      <line x1={20} y1={70} x2={226} y2={70} stroke="#334155" strokeWidth={2} />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={X(i * 100)} y1={i % 5 === 0 ? 63 : 66} x2={X(i * 100)} y2={i % 5 === 0 ? 77 : 74} stroke="#334155" strokeWidth={i % 5 === 0 ? 2 : 1.2} />
      ))}
      <T x={X(0)} y={92} t="0 m" s={10} />
      <T x={X(500)} y={92} t="500 m" s={10} />
      <T x={X(1000)} y={92} t="1 km" s={10} />
      <T x={X(0)} y={52} t="RAJT" s={10} c="#15803d" />
      <T x={X(1000)} y={52} t="CÉL" s={10} c="#b91c1c" />
      {note && <T x={120} y={118} t={note} s={11} c="#1d4ed8" />}
    </QFig>
  );
};

/** 12 autó a parkolóban: 3 kék, 3 piros, 4 zöld, 2 sárga. */
const PARK_COLORS = ['#2563eb', '#dc2626', '#16a34a', '#2563eb', '#16a34a', '#eab308', '#dc2626', '#16a34a', '#2563eb', '#eab308', '#16a34a', '#dc2626'];
const ParkingLot: React.FC = () => (
  <QFig title="Autók a parkolóban">
    {PARK_COLORS.map((c, i) => {
      const x = 18 + (i % 6) * 36;
      const y = 32 + Math.floor(i / 6) * 56;
      return (
        <g key={i}>
          <rect x={x} y={y} width={28} height={44} rx={8} fill={c} stroke="#1e293b" strokeWidth={1.2} />
          <rect x={x + 5} y={y + 8} width={18} height={9} rx={2} fill="#e0f2fe" />
          <rect x={x + 5} y={y + 28} width={18} height={7} rx={2} fill="#e0f2fe" />
        </g>
      );
    })}
  </QFig>
);

// ---- Ábrák az egyes kérdésekhez ----
const FIG_Q1 = <TwoPies a={[1, 3]} b={[1, 4]} la="1 harmad" lb="1 negyed" title="Két egyforma pizzából 1-1 szelet" />;
const FIG_Q2 = <TwoBars a={[3, 4]} b={[1, 4]} la="3 negyed" lb="1 negyed" title="Két egyforma csokitábla" />;
const FIG_Q5 = (
  <QFig title="Hány negyed rész az egész?" h={90}>
    <BarG x={20} y={32} w={200} h={30} parts={4} filled={4} color="#22c55e" />
    <T x={120} y={80} t="1 egész = ? negyed" />
  </QFig>
);
const FIG_Q7 = <TwoPies a={[1, 2]} b={[1, 5]} la="1 ketted" lb="1 ötöd" />;
const FIG_Q10 = <Track title="Az 1 km-es versenypálya" note="1 tized km = ? m • 3 tized km = ? m" />;
const FIG_Q13 = (
  <QFig title="A kör 1 ketted része színes" h={130}>
    <PieG cx={120} cy={66} r={40} parts={2} filled={1} color="#22c55e" empty="#ffffff" />
    <T x={120} y={124} t="1 ketted = ?" />
  </QFig>
);
const FIG_Q16 = <Track title="1 km = 1000 m" note="1 negyed km = ? m • 1 ötöd km = ? m" />;
const FIG_Q18 = <TwoBars a={[3, 8]} b={[2, 4]} la="3 nyolcad" lb="2 negyed" />;
const FIG_Q19 = (
  <QFig title="Hány hatod fér az 1 harmad alá?" h={110}>
    <BarG x={20} y={30} w={200} h={24} parts={3} filled={1} color="#eab308" />
    <BarG x={20} y={62} w={200} h={24} parts={6} filled={0} color="#3b82f6" />
    <T x={54} y={102} t="1 harmad = ? hatod" a="start" />
  </QFig>
);
const FIG_Q20 = <ParkingLot />;
const FIG_Q21 = (
  <QFig title="Ugróverseny – a pálya 2 m = 200 cm" h={150}>
    {[
      { l: 'mókus: 3 negyed', p: 4, n: 3, c: '#f97316' },
      { l: 'béka: 4 tized', p: 10, n: 4, c: '#22c55e' },
      { l: 'nyúl: 4 ötöd', p: 5, n: 4, c: '#a855f7' }
    ].map((j, i) => (
      <g key={j.l}>
        <T x={14} y={38 + i * 40} t={j.l} a="start" s={11} />
        <BarG x={14} y={43 + i * 40} w={180} h={14} parts={j.p} filled={j.n} color={j.c} />
        <T x={214} y={55 + i * 40} t="? cm" s={11} />
      </g>
    ))}
  </QFig>
);
const FIG_Q23 = (
  <QFig title="Budapest → úti cél: 1000 km" h={130}>
    <T x={14} y={42} t="Zoliék: 2 negyed" a="start" s={11} />
    <BarG x={14} y={48} w={212} h={16} parts={4} filled={2} color="#0ea5e9" />
    <T x={14} y={88} t="Laciék: 4 tized" a="start" s={11} />
    <BarG x={14} y={94} w={212} h={16} parts={10} filled={4} color="#f43f5e" />
    <T x={226} y={124} t="cél" a="end" s={10} />
  </QFig>
);
const FIG_Q25 = <Track title="Hol állnak a zászlók?" note="3 negyed km • 4 ötöd km • 3 ötöd km" />;
const FIG_Q26 = <TwoPies a={[2, 3]} b={[2, 4]} la="Mona: 2 harmad" lb="Manó: 2 negyed" title="Egy egész pizza 2400 Ft" />;
const FIG_Q28 = (
  <QFig title="A 400 literes dézsa" h={150}>
    <rect x={80} y={28} width={80} height={110} rx={6} fill="#ffffff" stroke="#334155" strokeWidth={2} />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={80} y={28 + i * 11} width={80} height={11} fill={i >= 4 ? '#60a5fa' : '#ffffff'} stroke="#94a3b8" strokeWidth={0.8} />
    ))}
    <line x1={74} y1={83} x2={166} y2={83} stroke="#dc2626" strokeWidth={2} strokeDasharray="5 3" />
    <T x={170} y={87} t="fele" a="start" s={11} c="#dc2626" />
    <T x={40} y={100} t="6 tized" s={11} c="#1d4ed8" />
  </QFig>
);

export const FRACTION_COMPARE_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint: alapok ----------------
  {
    id: 'fc4-q1',
    questionTypeBadge: 'Pizzaszeletek',
    figure: FIG_Q1,
    level: 1,
    question: 'Két egyforma pizzából vágtunk 1-1 szeletet. Melyik szelet a nagyobb?',
    options: ['1 harmad', '1 negyed', 'egyforma nagyok'],
    correctAnswer: 0,
    explanation: 'A harmadoknál 3 részre, a negyedeknél 4 részre vágtuk a pizzát. Kevesebb részre vágva egy szelet nagyobb, ezért 1 harmad > 1 negyed.'
  },
  {
    id: 'fc4-q2',
    questionTypeBadge: 'Ugyanolyan részek',
    figure: FIG_Q2,
    level: 1,
    question: 'Melyik jel kerül a helyére? 3 negyed ☐ 1 negyed',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: 'Mindkét csík negyed részekre van vágva. 3 rész több, mint 1 rész, ezért 3 negyed > 1 negyed.'
  },
  {
    id: 'fc4-q3',
    questionTypeBadge: 'Legnagyobb',
    level: 1,
    question: 'Melyik a legtöbb ugyanabból a csokitáblából?',
    options: ['4 ötöd', '3 ötöd', '2 ötöd', '1 ötöd'],
    correctAnswer: 0,
    explanation: 'Mindegyik ötöd rész ugyanakkora. Az a legtöbb, amelyikből a legtöbb részt vesszük: 4 ötöd.'
  },
  {
    id: 'fc4-q4',
    questionTypeBadge: 'Legkisebb rész',
    level: 1,
    question: 'Ugyanakkora tortákat vágtunk fel. Melyik a legkisebb szelet?',
    options: ['1 tized', '1 hatod', '1 harmad', '1 ketted'],
    correctAnswer: 0,
    explanation: 'Minél több részre vágjuk a tortát, annál kisebb egy szelet. A 10 részre vágott tortából lesz a legkisebb szelet: 1 tized.'
  },
  {
    id: 'fc4-q5',
    questionTypeBadge: '1 egész',
    figure: FIG_Q5,
    level: 1,
    question: 'Az egész csík színes. Hány negyed rész ez?',
    options: ['4 negyed', '1 negyed', '2 negyed', '3 negyed'],
    correctAnswer: 0,
    explanation: 'A csík 4 egyenlő részből áll, és mind a 4 színes. 4 negyed = 1 egész.'
  },
  {
    id: 'fc4-q6',
    questionTypeBadge: 'Más néven',
    level: 1,
    question: 'A bordó rúd alá 4 rózsaszín rúd fér. Hány rózsaszín rúd ér a bordó rúd felével? Hogyan nevezzük még a felet?',
    options: ['2 rózsaszín rúd: 2 negyed', '1 rózsaszín rúd: 1 negyed', '3 rózsaszín rúd: 3 negyed', '2 rózsaszín rúd: 2 harmad'],
    correctAnswer: 0,
    explanation: 'A 4 rózsaszín rúd fele 2 rúd. Egy rúd 1 negyed, kettő 2 negyed. Tehát a fele = 2 negyed (Tankönyv 149. o., 5. feladat).'
  },
  {
    id: 'fc4-q7',
    questionTypeBadge: 'Relációs jel',
    figure: FIG_Q7,
    level: 1,
    question: 'Melyik jel kerül a helyére? 1 ketted ☐ 1 ötöd',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: 'Az 1 ketted a pizza fele. Az 1 ötödnél 5 részre vágtuk, ez sokkal kisebb szelet. 1 ketted > 1 ötöd.'
  },
  {
    id: 'fc4-q8',
    questionTypeBadge: 'Csokitábla',
    level: 1,
    question: 'Kitti a csokitábla 2 hatodát, Mona egy ugyanilyen tábla 4 hatodát ette meg. Ki evett több csokit?',
    options: ['Mona', 'Kitti', 'Ugyanannyit ettek.'],
    correctAnswer: 0,
    explanation: 'A hatod részek egyformák. Mona 4 részt evett, Kitti csak 2-t: 4 hatod > 2 hatod.'
  },
  {
    id: 'fc4-q9',
    questionTypeBadge: '1 egész',
    level: 1,
    question: 'A francia zászló 3 harmadból áll: kék, fehér, piros. Melyik jel kerül a helyére? 3 harmad ☐ 1 egész',
    options: ['=', '<', '>'],
    correctAnswer: 0,
    explanation: 'Ha mind a 3 harmad részt összetesszük, megkapjuk az egészet: 3 harmad = 1 egész.'
  },
  {
    id: 'fc4-q10',
    questionTypeBadge: 'Pálya',
    figure: FIG_Q10,
    level: 1,
    question: 'Az 1 km-es versenypályán két zászló áll: az egyik 1 tized km-nél, a másik 3 tized km-nél. Melyik van közelebb a RAJT-hoz?',
    options: ['az 1 tized km-es zászló', 'a 3 tized km-es zászló', 'egyforma messze vannak'],
    correctAnswer: 0,
    explanation: '1 tized km = 100 m, 3 tized km = 300 m. A 100 m közelebb van a RAJT-hoz, mert 1 tized < 3 tized.'
  },

  // ---------------- 2. szint: sorba rendezés, egyenlőség ----------------
  {
    id: 'fc4-q11',
    questionTypeBadge: 'Sorba rendezés',
    level: 2,
    question: 'Melyik a helyes növekvő sorrend (a legkisebbtől a legnagyobbig)?',
    options: [
      '1 hatod < 1 negyed < 1 harmad < 1 ketted',
      '1 ketted < 1 harmad < 1 negyed < 1 hatod',
      '1 harmad < 1 hatod < 1 ketted < 1 negyed',
      '1 negyed < 1 hatod < 1 ketted < 1 harmad'
    ],
    correctAnswer: 0,
    explanation: 'Minél több részre vágunk, annál kisebb egy rész. A legkisebb az 1 hatod, a legnagyobb az 1 ketted (a fele).'
  },
  {
    id: 'fc4-q12',
    questionTypeBadge: 'Ugyanannyi rész',
    level: 2,
    question: 'Melyik jel kerül a helyére? 2 harmad ☐ 2 ötöd',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: 'Mindkét esetben 2 részt veszünk. Egy harmad nagyobb, mint egy ötöd, ezért 2 harmad > 2 ötöd.'
  },
  {
    id: 'fc4-q13',
    questionTypeBadge: 'Egyenlő törtek',
    figure: FIG_Q13,
    level: 2,
    question: 'Melyik egyenlő 1 ketteddel?',
    options: ['4 nyolcad', '4 negyed', '2 hatod', '1 negyed'],
    correctAnswer: 0,
    explanation: 'Ha a kört 8 részre vágjuk, a fele 4 rész: 1 ketted = 4 nyolcad. A 4 negyed már az egész kör, a 2 hatod csak 1 harmad.'
  },
  {
    id: 'fc4-q14',
    questionTypeBadge: 'Relációs jel',
    level: 2,
    question: 'Melyik jel kerül a helyére? 5 tized ☐ 1 ketted',
    options: ['=', '<', '>'],
    correctAnswer: 0,
    explanation: 'A 10 tized rész fele 5 tized. Tehát 5 tized = 1 ketted, mindkettő a fele.'
  },
  {
    id: 'fc4-q15',
    questionTypeBadge: 'Pizza ára',
    level: 2,
    question: 'Az egész pizza 2400 Ft. Melyik szelet drágább: az 1 ötöd vagy az 1 hatod szelet?',
    options: ['az 1 ötöd szelet: 480 Ft', 'az 1 hatod szelet: 400 Ft', 'az 1 hatod szelet: 480 Ft', 'egyforma az áruk'],
    correctAnswer: 0,
    explanation: '2400 : 5 = 480 Ft, 2400 : 6 = 400 Ft. Az 1 ötöd szelet nagyobb, ezért drágább (Munkafüzet II. 66. o.).'
  },
  {
    id: 'fc4-q16',
    questionTypeBadge: 'Pálya',
    figure: FIG_Q16,
    level: 2,
    question: 'Melyik zászló van messzebb a RAJT-tól az 1 km-es pályán: az 1 negyed km-es vagy az 1 ötöd km-es?',
    options: ['az 1 negyed km-es (250 m)', 'az 1 ötöd km-es (200 m)', 'az 1 ötöd km-es (500 m)', 'egyforma messze vannak'],
    correctAnswer: 0,
    explanation: '1000 : 4 = 250 m és 1000 : 5 = 200 m. A 250 m messzebb van, mert 1 negyed > 1 ötöd.'
  },
  {
    id: 'fc4-q17',
    questionTypeBadge: '1 egész',
    level: 2,
    question: 'Melyik tört kisebb 1 egésznél?',
    options: ['3 negyed', '4 negyed', '5 negyed', '6 hatod'],
    correctAnswer: 0,
    explanation: 'Az 1 egész 4 negyed (vagy 6 hatod). A 3 negyedből még 1 negyed hiányzik az egészhez, tehát kisebb. Az 5 negyed már több, mint 1 egész.'
  },
  {
    id: 'fc4-q18',
    questionTypeBadge: 'Csíkok',
    figure: FIG_Q18,
    level: 2,
    question: 'Melyik jel kerül a helyére? 3 nyolcad ☐ 2 negyed',
    options: ['<', '>', '='],
    correctAnswer: 0,
    explanation: 'A 2 negyed a csík fele, ez 4 nyolcad. A 3 nyolcad 1 nyolcaddal kevesebb, ezért 3 nyolcad < 2 negyed.'
  },
  {
    id: 'fc4-q19',
    questionTypeBadge: 'Törtfal',
    figure: FIG_Q19,
    level: 2,
    question: 'Hány hatod rész ér annyit, mint 1 harmad?',
    options: ['2 hatod', '3 hatod', '1 hatod', '6 hatod'],
    correctAnswer: 0,
    explanation: 'Ha minden harmad részt kettévágunk, hatodokat kapunk. Egy harmad tehát 2 hatod.'
  },
  {
    id: 'fc4-q20',
    questionTypeBadge: 'Parkoló',
    figure: FIG_Q20,
    level: 2,
    question: 'A parkolóban 12 autó áll. Az autók 1 negyede kék, 1 harmada zöld. Melyik színű autóból van több?',
    options: ['zöldből: 4 autó', 'kékből: 4 autó', 'kékből: 3 autó', 'ugyanannyi van'],
    correctAnswer: 0,
    explanation: '12 : 4 = 3 kék autó és 12 : 3 = 4 zöld autó. Zöldből van több, mert 1 harmad > 1 negyed.'
  },

  // ---------------- 3. szint: szöveges feladatok ----------------
  {
    id: 'fc4-q21',
    questionTypeBadge: 'Ugróverseny',
    figure: FIG_Q21,
    level: 3,
    question: 'Ugróversenyt rendeztek a 2 m-es pályán. A mókus a táv 3 negyedét, a béka a 4 tizedét, a nyúl a 4 ötödét ugrotta meg. Ki lett a győztes?',
    options: ['a nyúl (160 cm)', 'a mókus (150 cm)', 'a béka (80 cm)', 'a mókus (160 cm)'],
    correctAnswer: 0,
    explanation: '2 m = 200 cm. Mókus: 200 : 4 · 3 = 150 cm. Béka: 200 : 10 · 4 = 80 cm. Nyúl: 200 : 5 · 4 = 160 cm. A nyúl ugrott a legnagyobbat.'
  },
  {
    id: 'fc4-q22',
    questionTypeBadge: 'Ugróverseny',
    level: 3,
    question: 'Ugyanezen a 2 m-es pályán hány centiméterrel ugrott többet a nyúl (4 ötöd) a mókusnál (3 negyed)?',
    options: ['10 cm-rel', '1 cm-rel', '50 cm-rel', '80 cm-rel'],
    correctAnswer: 0,
    explanation: 'Nyúl: 160 cm, mókus: 150 cm. 160 − 150 = 10 cm. Tehát 4 ötöd egy kicsit több, mint 3 negyed.'
  },
  {
    id: 'fc4-q23',
    questionTypeBadge: 'Utazás',
    figure: FIG_Q23,
    level: 3,
    question: 'Zoliék és Laciék egy 1000 km-re lévő városba utaznak. Zoliék az út 2 negyed részét, Laciék a 4 tized részét tették meg. Ki jár közelebb az úti célhoz?',
    options: ['Zoliék, mert 2 negyed > 4 tized', 'Laciék, mert 4 tized > 2 negyed', 'Laciék, mert a 4 több, mint a 2', 'Egyforma messze vannak.'],
    correctAnswer: 0,
    explanation: 'Zoliék: 1000 : 4 · 2 = 500 km. Laciék: 1000 : 10 · 4 = 400 km. Zoliék többet utaztak, ezért közelebb vannak a célhoz.'
  },
  {
    id: 'fc4-q24',
    questionTypeBadge: 'Utazás',
    level: 3,
    question: 'Az előző feladatban hány kilométert kell még utazniuk Laciéknak (4 tized résznél járnak az 1000 km-es úton)?',
    options: ['600 km-t', '400 km-t', '500 km-t', '960 km-t'],
    correctAnswer: 0,
    explanation: 'Laciék 1000 : 10 · 4 = 400 km-t tettek meg. Még 1000 − 400 = 600 km van hátra.'
  },
  {
    id: 'fc4-q25',
    questionTypeBadge: 'Sorba rendezés',
    figure: FIG_Q25,
    level: 3,
    question: 'Három zászló áll az 1 km-es pályán: 3 negyed km-nél, 4 ötöd km-nél és 3 ötöd km-nél. Milyen sorrendben éri el őket a ló a RAJT-tól?',
    options: [
      '3 ötöd km, 3 negyed km, 4 ötöd km',
      '3 negyed km, 3 ötöd km, 4 ötöd km',
      '4 ötöd km, 3 negyed km, 3 ötöd km',
      '3 ötöd km, 4 ötöd km, 3 negyed km'
    ],
    correctAnswer: 0,
    explanation: '3 ötöd km = 600 m, 3 negyed km = 750 m, 4 ötöd km = 800 m. A ló előbb a 600 m-hez, aztán a 750 m-hez, végül a 800 m-hez ér.'
  },
  {
    id: 'fc4-q26',
    questionTypeBadge: 'Pizza ára',
    figure: FIG_Q26,
    level: 3,
    question: 'Az egész pizza 2400 Ft. Mona 2 harmad, Manó 2 negyed pizzát vett. Ki fizetett többet, és mennyivel?',
    options: ['Mona, 400 Ft-tal', 'Manó, 400 Ft-tal', 'Mona, 200 Ft-tal', 'Ugyanannyit fizettek.'],
    correctAnswer: 0,
    explanation: 'Mona: 2400 : 3 · 2 = 1600 Ft. Manó: 2400 : 4 · 2 = 1200 Ft. 1600 − 1200 = 400, tehát Mona 400 Ft-tal többet fizetett.'
  },
  {
    id: 'fc4-q27',
    questionTypeBadge: 'Csokitábla',
    level: 3,
    question: 'Kitti a csokitábla 1 harmadát, Dóra egy ugyanilyen tábla 3 hatodát ette meg. Ki evett többet?',
    options: ['Dóra, mert 1 harmad = 2 hatod < 3 hatod', 'Kitti, mert a harmad nagyobb, mint a hatod', 'Ugyanannyit ettek.', 'Kitti, mert 1 harmad = 4 hatod'],
    correctAnswer: 0,
    explanation: 'Az 1 harmad 2 hatoddal egyenlő. Dóra 3 hatodot evett, ez több, mint 2 hatod. (A 3 hatod éppen a tábla fele.)'
  },
  {
    id: 'fc4-q28',
    questionTypeBadge: 'Dézsa',
    figure: FIG_Q28,
    level: 3,
    question: 'Fanniék 400 literes dézsájának már a 6 tized része megtelt vízzel. Több mint a fele van tele?',
    options: ['Igen: 240 liter van benne, a fele 200 liter.', 'Nem: 240 liter van benne, a fele 300 liter.', 'Nem: pontosan a fele van tele.', 'Igen: 360 liter van benne.'],
    correctAnswer: 0,
    explanation: '400 : 10 · 6 = 240 liter. A dézsa fele 400 : 2 = 200 liter. 6 tized > 5 tized (a fele), tehát több mint a fele tele van.'
  },
  {
    id: 'fc4-q29',
    questionTypeBadge: 'Recept',
    level: 3,
    question: 'A sportszelethez 50 dkg kekszet, 25 dkg margarint és 25 dkg cukrot tettek a tálba. Melyik összetevőből van a legtöbb, és ez hányad része az egésznek?',
    options: ['kekszből: 1 ketted (2 negyed)', 'kekszből: 1 harmad', 'margarinból: 1 negyed', 'cukorból: 1 ketted'],
    correctAnswer: 0,
    explanation: 'Összesen 50 + 25 + 25 = 100 dkg. A keksz 50 dkg, ez a 100 dkg fele: 1 ketted = 2 negyed. A margarin és a cukor 1-1 negyed (Munkafüzet II. 71. o.).'
  },
  {
    id: 'fc4-q30',
    questionTypeBadge: 'Két tört között',
    level: 3,
    question: 'Melyik tört van 1 negyed és 3 negyed között?',
    options: ['2 negyed', '1 nyolcad', '7 nyolcad', '5 negyed'],
    correctAnswer: 0,
    explanation: '1 negyed < 2 negyed < 3 negyed. Az 1 nyolcad kisebb 1 negyednél, a 7 nyolcad nagyobb 3 negyednél (3 negyed = 6 nyolcad), az 5 negyed pedig több 1 egésznél.'
  }
];

export const FractionCompare4Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-frac-osszehasonlitas-quiz"
      subtopicId="tortek-osszehasonlitasa"
      title="4. Törtek összehasonlítása – Kvíz"
      subtitle="30 feladat 3 szinten: melyik a nagyobb, egyenlő törtek, sorba rendezés, zászlók a pályán, szöveges feladatok."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • KVÍZ"
      questions={FRACTION_COMPARE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Melyik a nagyobb?',
          items: [
            'Ugyanolyan részek: több rész = több. 1 negyed < 2 negyed < 3 negyed',
            'Ugyanannyi rész: több részre vágva kisebb egy rész.',
            '1 ketted > 1 harmad > 1 negyed > 1 ötöd > 1 hatod',
            '2 harmad > 2 negyed > 2 ötöd'
          ]
        },
        {
          title: 'Más néven ugyanannyi',
          items: [
            'fél = 1 ketted = 2 negyed = 4 nyolcad = 5 tized',
            '1 harmad = 2 hatod',
            '1 egész = 2 ketted = 3 harmad = 4 negyed = 10 tized',
            'Csak ugyanakkora egészek részeit hasonlítsd össze!'
          ]
        },
        {
          title: 'Számolással is megy',
          items: [
            'Számold ki mindkét törtrészt, és a számokat hasonlítsd össze!',
            '1 km = 1000 m: 1 negyed km = 250 m, 1 ötöd km = 200 m',
            '2 m = 200 cm: 3 negyed = 150 cm, 4 ötöd = 160 cm',
            '2400 Ft-nak 1 harmada 800 Ft, 1 negyede 600 Ft'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FractionCompare4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <FractionCompare4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default FractionCompare4Quiz;
