import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { InverseOpsMatcher } from './InverseOpsMatcher';
import { InverseOpsSorter } from './InverseOpsSorter';
import { FlowchartSvg } from './InverseOpsFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Nyíllánc a tankönyv 105. oldali ábrái szerint; alul az összevont nyíl. */
const QChain: React.FC<{ boxes: string[]; ops: string[]; bottom?: string }> = ({ boxes, ops, bottom }) => {
  const n = boxes.length;
  const bw = 50;
  const gap = (220 - n * bw) / (n - 1);
  const xs = boxes.map((_, i) => 10 + i * (bw + gap));
  return (
    <QFig h={bottom ? 110 : 80}>
      {boxes.map((b, i) => {
        const unk = b.includes('?');
        return (
          <g key={i}>
            <rect x={xs[i]} y="30" width={bw} height="26" rx="13" fill={unk ? '#fee2e2' : '#d1fae5'} stroke={unk ? C_UNK : '#047857'} strokeWidth="1.5" />
            <text x={xs[i] + bw / 2} y="48" textAnchor="middle" fontSize="12" fontWeight="bold" fill={unk ? C_UNK : '#0f172a'}>{b}</text>
            {i < n - 1 && (
              <g>
                <line x1={xs[i] + bw + 2} y1="43" x2={xs[i + 1] - 4} y2="43" stroke="#dc2626" strokeWidth="1.6" />
                <polygon points={`${xs[i + 1] - 2},43 ${xs[i + 1] - 8},39 ${xs[i + 1] - 8},47`} fill="#dc2626" />
                <text x={(xs[i] + bw + xs[i + 1]) / 2} y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill={ops[i].includes('?') ? C_UNK : '#7f1d1d'}>{ops[i]}</text>
              </g>
            )}
          </g>
        );
      })}
      {bottom && (
        <g>
          <path d={`M ${xs[0] + bw / 2} 58 L ${xs[0] + bw / 2} 86 L ${xs[n - 1] + bw / 2} 86 L ${xs[n - 1] + bw / 2} 62`} fill="none" stroke="#2563eb" strokeWidth="1.6" />
          <polygon points={`${xs[n - 1] + bw / 2},58 ${xs[n - 1] + bw / 2 - 4},65 ${xs[n - 1] + bw / 2 + 4},65`} fill="#2563eb" />
          <text x="120" y="102" textAnchor="middle" fontSize="12" fontWeight="bold" fill={bottom.includes('?') ? C_UNK : '#1d4ed8'}>{bottom}</text>
        </g>
      )}
    </QFig>
  );
};

/** Szalagmodell: két rész és az egész, egyik „?”. */
const QBar: React.FC<{ parts: string[]; whole: string }> = ({ parts, whole }) => {
  const w = 200 / parts.length;
  return (
    <QFig h={100}>
      {parts.map((p, i) => (
        <g key={i}>
          <rect x={20 + i * w} y="22" width={w} height="28" fill={p === '?' ? '#fee2e2' : i % 2 ? '#fbcfe8' : '#bfdbfe'} stroke="#334155" />
          <text x={20 + i * w + w / 2} y="41" textAnchor="middle" fontSize="12" fontWeight="bold" fill={p === '?' ? C_UNK : '#0f172a'}>{p}</text>
        </g>
      ))}
      <path d="M 20 58 L 20 66 L 220 66 L 220 58" fill="none" stroke="#334155" strokeWidth="1.5" />
      <text x="120" y="86" textAnchor="middle" fontSize="13" fontWeight="bold" fill={whole.includes('?') ? C_UNK : '#0f172a'}>{whole}</text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const INVERSE_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'inv-q1',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <QChain boxes={['1258', 'A = ?']} ops={['+ 2425']} />,
    question: 'Melyik számot helyettesíti az A betű? 1258 + 2425 = A',
    options: ['3683', '3673', '4683', '1167'],
    correctAnswer: 0,
    explanation: 'Írásban: 8 + 5 = 13, leírom a 3-at, maradt 1. 5 + 2 + 1 = 8. 2 + 4 = 6. 1 + 2 = 3. Az eredmény 3683.'
  },
  {
    id: 'inv-q2',
    level: 1,
    questionTypeBadge: 'Ellentett művelet',
    question: 'Melyik művelet csinálja vissza a „+ 1345” lépést?',
    options: ['− 1345', '+ 1345', ': 1345', '· 1345'],
    correctAnswer: 0,
    explanation: 'Az összeadást a kivonás csinálja vissza: ha hozzáadok 1345-öt, majd elveszek 1345-öt, visszakapom a kiinduló számot.'
  },
  {
    id: 'inv-q3',
    level: 1,
    questionTypeBadge: 'Ellentett művelet',
    question: 'Melyik művelet csinálja vissza a „· 2” lépést?',
    options: [': 2', '· 2', '− 2', '+ 2'],
    correctAnswer: 0,
    explanation: 'A szorzást az osztás csinálja vissza: 1800 · 2 = 3600, és 3600 : 2 = 1800.'
  },
  {
    id: 'inv-q4',
    level: 1,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <QChain boxes={['?', '4135']} ops={['+ 1345']} />,
    question: 'Ha a gondolt számhoz hozzáadom az 1345-öt, 4135 lesz. Melyik számra gondoltam?',
    options: ['2790', '5480', '2890', '2780'],
    correctAnswer: 0,
    explanation: 'Visszafelé kivonunk: 4135 − 1345 = 2790. Ellenőrzés: 2790 + 1345 = 4135.'
  },
  {
    id: 'inv-q5',
    level: 1,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <QChain boxes={['?', '3600']} ops={['· 2']} />,
    question: 'Ha a gondolt számot megszorzom kettővel, 3600 lesz. Melyik számra gondoltam?',
    options: ['1800', '7200', '3598', '1700'],
    correctAnswer: 0,
    explanation: 'Visszafelé osztunk: 3600 : 2 = 1800. Ellenőrzés: 1800 · 2 = 3600.'
  },
  {
    id: 'inv-q6',
    level: 1,
    questionTypeBadge: 'Összevonás',
    figure: <QChain boxes={['1258', 'A', 'B']} ops={['+ 2425', '+ 3575']} bottom="egy lépésben: ?" />,
    question: 'Melyik egyetlen művelet vezet a 1258-tól egyenesen a B-hez?',
    options: ['+ 6000', '+ 1150', '+ 5900', '− 6000'],
    correctAnswer: 0,
    explanation: 'Két összeadás helyett hozzáadhatjuk a két szám összegét: 2425 + 3575 = 6000. Tehát + 6000.'
  },
  {
    id: 'inv-q7',
    level: 1,
    questionTypeBadge: 'Összevonás',
    figure: <QChain boxes={['8248', 'J', 'K']} ops={[': 4', ': 2']} bottom="egy lépésben: ?" />,
    question: 'Előbb 4-gyel, aztán 2-vel osztunk. Melyik egyetlen osztás adja ugyanezt?',
    options: [': 8', ': 6', ': 2', '· 8'],
    correctAnswer: 0,
    explanation: 'Negyedének a fele a nyolcada: 4 · 2 = 8, tehát : 8.'
  },
  {
    id: 'inv-q8',
    level: 1,
    questionTypeBadge: 'Összevonás',
    question: 'Előbb 2-vel, aztán 3-mal szorzunk. Melyik egyetlen szorzás adja ugyanezt?',
    options: ['· 6', '· 5', ': 6', '· 23'],
    correctAnswer: 0,
    explanation: 'Kétszeresének a háromszorosa a hatszorosa: 2 · 3 = 6, tehát · 6.'
  },
  {
    id: 'inv-q9',
    level: 1,
    questionTypeBadge: 'Összevonás',
    figure: <QChain boxes={['4258', 'E', 'F']} ops={['− 1425', '− 1275']} bottom="egy lépésben: ?" />,
    question: 'Előbb 1425-öt, aztán 1275-öt veszünk el. Melyik egyetlen lépés adja ugyanezt?',
    options: ['− 2700', '− 150', '− 2600', '+ 2700'],
    correctAnswer: 0,
    explanation: 'Két kivonás helyett elvehetjük a két szám összegét: 1425 + 1275 = 2700, tehát − 2700.'
  },
  {
    id: 'inv-q10',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Hogyan ellenőrzöd a 4135 − 1345 = 2790 kivonást?',
    options: ['2790 + 1345 = 4135', '4135 + 1345 = 5480', '2790 − 1345 = 1445', '4135 + 2790 = 6925'],
    correctAnswer: 0,
    explanation: 'A kivonást összeadással ellenőrizzük: a különbséghez hozzáadjuk a kivonandót, és a kisebbítendőt kell kapnunk.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'inv-q11',
    level: 2,
    questionTypeBadge: 'Nyíllánc',
    figure: <QChain boxes={['2682', '4246', 'D = ?']} ops={['+ 1564', '+ 2536']} />,
    question: '2682 + 1564 = 4246 (C). Mennyi D = C + 2536?',
    options: ['6782', '6772', '6882', '4100'],
    correctAnswer: 0,
    explanation: '4246 + 2536: 6 + 6 = 12, leírom a 2-t, maradt 1; 4 + 3 + 1 = 8; 2 + 5 = 7; 4 + 2 = 6. D = 6782.'
  },
  {
    id: 'inv-q12',
    level: 2,
    questionTypeBadge: 'Összevonás',
    question: 'Melyik egyetlen művelet vezet a 2682-től a 6782-höz, ha az út + 1564 és + 2536 volt?',
    options: ['+ 4100', '+ 4000', '+ 972', '− 4100'],
    correctAnswer: 0,
    explanation: '1564 + 2536 = 4100. Ellenőrzés: 2682 + 4100 = 6782.'
  },
  {
    id: 'inv-q13',
    level: 2,
    questionTypeBadge: 'Nyíllánc',
    figure: <QChain boxes={['8248', 'J', 'K = ?']} ops={[': 4', ': 2']} />,
    question: '8248 : 4 = J, aztán J : 2 = K. Mennyi K?',
    options: ['1031', '2062', '4124', '1013'],
    correctAnswer: 0,
    explanation: '8248 : 4 = 2062, 2062 : 2 = 1031. Egy lépésben: 8248 : 8 = 1031.'
  },
  {
    id: 'inv-q14',
    level: 2,
    questionTypeBadge: 'Nyíllánc',
    figure: <QChain boxes={['6828', 'L', 'M = ?']} ops={[': 3', ': 2']} />,
    question: '6828 : 3 = L, aztán L : 2 = M. Mennyi M?',
    options: ['1138', '2276', '1183', '1148'],
    correctAnswer: 0,
    explanation: '6828 : 3 = 2276, 2276 : 2 = 1138. Egy lépésben: 6828 : 6 = 1138.'
  },
  {
    id: 'inv-q15',
    level: 2,
    questionTypeBadge: 'Nyíllánc',
    figure: <QChain boxes={['942', 'R', 'S = ?']} ops={['· 2', '· 4']} />,
    question: '942 · 2 = R, aztán R · 4 = S. Mennyi S?',
    options: ['7536', '5652', '1884', '7516'],
    correctAnswer: 0,
    explanation: '942 · 2 = 1884, 1884 · 4 = 7536. Egy lépésben: 942 · 8 = 7536.'
  },
  {
    id: 'inv-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó művelet',
    figure: <QChain boxes={['9426', '6284', '3142']} ops={['− 3142', '− 3142']} bottom="? (egy lépésben)" />,
    question: 'A 9426-ból kétszer egymás után elvesszük a 3142-t. Mi kerül az alsó nyílra?',
    options: ['− 6284', '+ 6284', '− 3142', '− 6184'],
    correctAnswer: 0,
    explanation: 'Kétszer 3142 = 6284. Tehát egy lépésben − 6284: 9426 − 6284 = 3142.'
  },
  {
    id: 'inv-q17',
    level: 2,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <QChain boxes={['?', '', '7200']} ops={['+ 2400', '· 2']} />,
    question: 'A gondolt számhoz hozzáadtam 2400-at, az összeget megszoroztam kettővel: 7200 lett. Melyik számra gondoltam?',
    options: ['1200', '2400', '3600', '4800'],
    correctAnswer: 0,
    explanation: 'Visszafelé, az utolsó lépéstől: 7200 : 2 = 3600, aztán 3600 − 2400 = 1200.'
  },
  {
    id: 'inv-q18',
    level: 2,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'A gondolt számhoz hozzáadtam a 2400 kétszeresét, így 7200-at kaptam. Melyik számra gondoltam?',
    options: ['2400', '1200', '4800', '9600'],
    correctAnswer: 0,
    explanation: 'A 2400 kétszerese 4800. Visszafelé: 7200 − 4800 = 2400.'
  },
  {
    id: 'inv-q19',
    level: 2,
    questionTypeBadge: 'Osztandó',
    question: 'Mennyi az osztandó, ha az osztó 7, a hányados 528, a maradék 2?',
    options: ['3698', '3696', '3694', '535'],
    correctAnswer: 0,
    explanation: 'Osztandó = hányados · osztó + maradék: 528 · 7 = 3696, 3696 + 2 = 3698.'
  },
  {
    id: 'inv-q20',
    level: 2,
    questionTypeBadge: 'Kisebbítendő',
    figure: <QBar parts={['3587', '3645']} whole="kisebbítendő = ?" />,
    question: 'Melyik szám a kisebbítendő, ha a különbség 3645, a kivonandó 3587?',
    options: ['7232', '58', '6122', '7222'],
    correctAnswer: 0,
    explanation: 'Kisebbítendő = különbség + kivonandó: 3645 + 3587 = 7232. Ellenőrzés: 7232 − 3587 = 3645.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'inv-q21',
    level: 3,
    questionTypeBadge: 'Hiányzó tag',
    figure: <QBar parts={['789', '4789', '?']} whole="9564" />,
    question: 'Melyik szám a háromtagú összeadás harmadik tagja, ha a másik két tag 789 és 4789, az összeg 9564?',
    options: ['3986', '4775', '3996', '4986'],
    correctAnswer: 0,
    explanation: 'Az összegből elvesszük a két ismert tagot: 9564 − 789 = 8775, 8775 − 4789 = 3986.'
  },
  {
    id: 'inv-q22',
    level: 3,
    questionTypeBadge: 'Szorzandó',
    question: 'Melyik szám a szorzandó, ha a szorzó 7, a szorzat 2492?',
    options: ['356', '346', '366', '2485'],
    correctAnswer: 0,
    explanation: 'Szorzandó = szorzat : szorzó: 2492 : 7 = 356. Ellenőrzés: 356 · 7 = 2492.'
  },
  {
    id: 'inv-q23',
    level: 3,
    questionTypeBadge: 'Összeg fele',
    question: 'Mennyi a 4646 és a 3788 összegének a fele?',
    options: ['4217', '8434', '6540', '4227'],
    correctAnswer: 0,
    explanation: '(4646 + 3788) : 2 = 8434 : 2 = 4217. Vigyázz, a 4646 + 3788 : 2 = 6540 mást jelent!'
  },
  {
    id: 'inv-q24',
    level: 3,
    questionTypeBadge: 'Harmadok különbsége',
    question: 'Mennyi az 5436 harmadának és a 3042 harmadának a különbsége?',
    options: ['798', '2394', '4422', '808'],
    correctAnswer: 0,
    explanation: '5436 : 3 = 1812, 3042 : 3 = 1014, 1812 − 1014 = 798. Ugyanennyi: (5436 − 3042) : 3 = 2394 : 3 = 798.'
  },
  {
    id: 'inv-q25',
    level: 3,
    questionTypeBadge: 'Egyenlő értékű',
    question: 'Melyik műveletsor egyenlő a (4646 + 3788) : 2 értékével?',
    options: ['4646 : 2 + 3788 : 2', '4646 + 3788 : 2', '4646 : 2 + 3788', '(4646 + 3788) · 2'],
    correctAnswer: 0,
    explanation: 'Az összeg fele ugyanannyi, mint a tagok felének összege: 2323 + 1894 = 4217.'
  },
  {
    id: 'inv-q26',
    level: 3,
    questionTypeBadge: 'Folyamatábra',
    figure: <FlowchartSvg className="w-full max-w-[200px] h-auto mx-auto" />,
    question: 'Indulj az 1348-ból a folyamatábra szerint! Melyik számhoz érkezel a CÉL-ban?',
    options: ['2696', '5392', '1348', '4044'],
    correctAnswer: 0,
    explanation: '1348 + 1348 = 2696 (kisebb 5000-nél), + 1348 = 4044 (kisebb), + 1348 = 5392 (nem kisebb). 5392 : 2 = 2696.'
  },
  {
    id: 'inv-q27',
    level: 3,
    questionTypeBadge: 'Folyamatábra',
    figure: <FlowchartSvg className="w-full max-w-[200px] h-auto mx-auto" />,
    question: 'Indulj az 1000-ből ugyanezen a folyamatábrán! Melyik számhoz érkezel?',
    options: ['2522', '5044', '2348', '1174'],
    correctAnswer: 0,
    explanation: '1000 → 2348 → 3696 → 5044. Az 5044 már nem kisebb 5000-nél, ezért elosztjuk 2-vel: 2522.'
  },
  {
    id: 'inv-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A repülő 1 óra alatt 963 km-t, a gyorsvonat 119 km-t tesz meg. 7 óra alatt hány kilométerrel tesz meg több utat a repülő?',
    options: ['5908 km-rel', '844 km-rel', '6741 km-rel', '5808 km-rel'],
    correctAnswer: 0,
    explanation: '1 óra alatt 963 − 119 = 844 km-rel többet. 7 óra alatt 7-szer ennyivel: 7 · 844 = 5908 km. (Vagy: 6741 − 833 = 5908.)'
  },
  {
    id: 'inv-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Mennyivel tesz meg több utat a repülő 9 óra alatt, mint a gyorsvonat (963 km és 119 km óránként)?',
    options: ['7596 km-rel', '7496 km-rel', '5908 km-rel', '8667 km-rel'],
    correctAnswer: 0,
    explanation: 'Óránként 844 km a különbség, 9 óra alatt 9 · 844 = 7596 km.'
  },
  {
    id: 'inv-q30',
    level: 3,
    questionTypeBadge: 'Hiányzó számok',
    figure: <QChain boxes={['1264', '?', '?']} ops={['+ 2478', '+ 2478']} bottom="+ 4956" />,
    question: 'Az 1264-hez kétszer egymás után hozzáadjuk a 2478-at. Melyik szám lesz a végén?',
    options: ['6220', '3742', '6210', '4956'],
    correctAnswer: 0,
    explanation: '1264 + 2478 = 3742, 3742 + 2478 = 6220. Egy lépésben: 1264 + 4956 = 6220.'
  }
];

export const InverseOpsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId="g4-wops-kapcsolatok-quiz"
      subtopicId="a-muveletek-kozotti-kapcsolatok"
      title="6. A műveletek közötti kapcsolatok – Kvíz"
      subtitle="30 feladat 3 szinten: ellentett műveletek, összevonás, gondolt szám, hiányzó számok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • KVÍZ"
      questions={INVERSE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Ellentett műveletek',
          items: ['+ ⇄ − (összeadás – kivonás)', '· ⇄ : (szorzás – osztás)', 'Kivonást összeadással ellenőrzünk.', 'Osztást szorzással ellenőrzünk.']
        },
        {
          title: 'Összevonás',
          items: ['+ 2425, majd + 3575 → + 6000', '− 1425, majd − 1275 → − 2700', ': 4, majd : 2 → : 8', '· 2, majd · 3 → · 6']
        },
        {
          title: 'Visszafelé számolás',
          items: [
            '□ + 1345 = 4135 → □ = 4135 − 1345 = 2790',
            '(□ + 2400) · 2 = 7200 → 7200 : 2 − 2400 = 1200',
            'Osztandó = hányados · osztó + maradék',
            'Az utolsó lépést csináld vissza először!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <InverseOpsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <InverseOpsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default InverseOpsQuiz;
