import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FinanceLoansMatcher } from './FinanceLoansMatcher';
import { FinanceLoansSorter } from './FinanceLoansSorter';
import { QFig, SText, S_BLUE, S_RED, S_GREEN, S_AMBER, S_INK } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const sawtooth = (T0: number, q: number, x: number, n: number, labels: string[]) => {
  const pts: [number, number][] = [[0, T0]];
  let T = T0;
  for (let k = 1; k <= n; k++) {
    T *= q;
    pts.push([k, T]);
    T = Math.max(0, T - x);
    pts.push([k, T]);
  }
  const max = Math.max(...pts.map((p) => p[1]));
  const X = (t: number) => 30 + (t / n) * 190;
  const Y = (v: number) => 130 - (v / max) * 100;
  return (
    <QFig>
      <line x1={30} y1={130} x2={225} y2={130} stroke="#64748b" />
      <line x1={30} y1={130} x2={30} y2={20} stroke="#64748b" />
      {pts.slice(0, -1).map((p, i) => {
        const r = pts[i + 1];
        const pay = p[0] === r[0];
        return <line key={i} x1={X(p[0])} y1={Y(p[1])} x2={X(r[0])} y2={Y(r[1])} stroke={pay ? S_GREEN : S_RED} strokeWidth="2.2" strokeDasharray={pay ? '4 3' : undefined} />;
      })}
      {Array.from({ length: n + 1 }, (_, k) => (
        <SText key={k} x={X(k)} y={144} t={`${k}`} s={9.5} c="#475569" />
      ))}
      {labels.map((t, i) => (
        <SText key={i} x={232} y={30 + i * 14} t={t} s={9.5} c={i === 0 ? S_RED : S_GREEN} a="end" b />
      ))}
      <SText x={128} y={158} t="eltelt évek" s={9} c="#475569" />
    </QFig>
  );
};

const FIG_TAMAS = sawtooth(2000000, 1.1, 2662000 / 3.31, 3, ['+10% kamat', '− x részlet']);

const FIG_ONLY_INTEREST = (
  <QFig>
    <rect x={40} y={50} width={50} height={70} fill={S_BLUE} opacity={0.8} />
    <rect x={40} y={42} width={50} height={8} fill={S_AMBER} />
    <SText x={65} y={136} t="1. év vége" s={9.5} />
    <SText x={65} y={36} t="? (csak kamat)" s={9.5} c={S_RED} b />
    <rect x={140} y={50} width={50} height={70} fill={S_BLUE} opacity={0.8} />
    <rect x={140} y={42} width={50} height={8} fill={S_AMBER} />
    <SText x={165} y={136} t="2. év vége" s={9.5} />
    <SText x={165} y={36} t="? (a többi)" s={9.5} c={S_RED} b />
    <SText x={120} y={156} t="2 000 000 Ft, 8%" s={10} c={S_INK} b />
  </QFig>
);

const FIG_ANTAL = (
  <QFig>
    {[20000, 15690.5, 10950.05, 5735.56].map((k, i) => {
      const s = 100 / 63095;
      const t = 63095 - k;
      return (
        <g key={i}>
          <rect x={30 + i * 50} y={130 - t * s} width={34} height={t * s} fill={S_BLUE} opacity={0.85} />
          <rect x={30 + i * 50} y={130 - 100} width={34} height={k * s} fill={S_AMBER} />
          <SText x={47 + i * 50} y={144} t={`${i + 1}. év`} s={9} />
        </g>
      );
    })}
    <SText x={120} y={18} t="63 095 Ft részletek: kamat (sárga) + tőke (kék)" s={9} />
    <SText x={120} y={158} t="200 000 Ft, 10%, 4 év" s={9.5} c={S_RED} b />
  </QFig>
);

const FIG_QUARTERS = sawtooth(1000000, 1.03, 269027.045, 4, ['+3% negyedévente', '− x részlet']);

const FINANCE_LOANS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'fl-q1',
    questionTypeBadge: 'Egyösszegű',
    level: 1,
    question: 'Egy cég 2 000 000 Ft hitelt vesz fel 1 évre, a kamatláb 8%. Mennyit kell visszafizetnie, ha egy év múlva egy összegben fizet?',
    options: ['2 160 000 Ft', '2 080 000 Ft', '2 016 000 Ft', '160 000 Ft'],
    correctAnswer: 0,
    explanation: '2 000 000 · 1,08 = 2 160 000 Ft (160 000 Ft kamat + a tőke).'
  },
  {
    id: 'fl-q2',
    questionTypeBadge: 'Egyösszegű',
    level: 1,
    question: 'Tamás 2 000 000 Ft hitelt vesz fel 3 évre, évi 10%-os kamatra. Mennyit kellene visszafizetnie egy összegben, kamatos kamattal, 3 év múlva?',
    options: ['2 662 000 Ft', '2 600 000 Ft', '2 420 000 Ft', '2 412 690 Ft'],
    correctAnswer: 0,
    explanation: '2 000 000 · 1,1³ = 2 662 000 Ft. (2 600 000 Ft egyszerű kamattal, 2 412 690 Ft a 3 egyenlő részlet összege.)'
  },
  {
    id: 'fl-q3',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Mi történik a hiteltartozással minden időszak végén?',
    options: [
      'Először hozzáadódik a kamat, majd a befizetett törlesztőrészlettel csökken',
      'Először csökken a részlettel, és csak a maradék kamatozik a következő időszakban sem',
      'Csak a futamidő végén számolnak kamatot',
      'A törlesztőrészlet mindig csak a kamatot fedezi'
    ],
    correctAnswer: 0,
    explanation: 'A tankönyv szerint minden időtartam végén először az esedékes kamat adódik a tartozáshoz, utána a törlesztőrészlettel csökken a tartozás.'
  },
  {
    id: 'fl-q4',
    questionTypeBadge: 'Csak kamat',
    figure: FIG_ONLY_INTEREST,
    level: 1,
    question: 'Egy cég 2 000 000 Ft-ot vesz fel 2 évre, 8%-ra; az első év végén csak az éves kamatot fizeti vissza. Mennyit fizet az első év végén?',
    options: ['160 000 Ft', '1 080 000 Ft', '2 160 000 Ft', '80 000 Ft'],
    correctAnswer: 0,
    explanation: 'Az első év kamata 2 000 000 · 0,08 = 160 000 Ft; a tartozás így 2 000 000 Ft marad.'
  },
  {
    id: 'fl-q5',
    questionTypeBadge: 'Kamatláb',
    level: 1,
    question: 'Judit 350 000 Ft hitelt vett fel; az első év végén csak az esedékes kamatot fizette vissza, ami 38 500 Ft. Mennyi az éves kamatláb?',
    options: ['11%', '10%', '3,85%', '12%'],
    correctAnswer: 0,
    explanation: '38 500 : 350 000 = 0,11, azaz 11%.'
  },
  {
    id: 'fl-q6',
    questionTypeBadge: 'Periódus',
    level: 1,
    question: 'Kálmán hitelének kamatlába évi 12%, és negyedévente törleszt. Mekkora a negyedéves kamatláb?',
    options: ['3%', '12%', '4%', '≈ 2,87%'],
    correctAnswer: 0,
    explanation: 'A kamatláb éves időtartamra vonatkozik: 12% : 4 = 3% negyedévente, q = 1,03.'
  },
  {
    id: 'fl-q7',
    questionTypeBadge: 'Kamatrész',
    figure: FIG_ANTAL,
    level: 1,
    question: 'Antal 200 000 Ft hitelt vett fel 10%-ra, 4 egyenlő éves részletben (63 095 Ft) törleszt. Mennyi az első részletből a kamat?',
    options: ['20 000 Ft', '43 095 Ft', '6 310 Ft', '15 774 Ft'],
    correctAnswer: 0,
    explanation: 'Az első évben a teljes 200 000 Ft kamatozik: 200 000 · 0,1 = 20 000 Ft.'
  },
  {
    id: 'fl-q8',
    questionTypeBadge: 'Tőkerész',
    figure: FIG_ANTAL,
    level: 1,
    question: 'Antal első 63 095 Ft-os részletéből 20 000 Ft a kamat. Mennyivel csökken a tőketartozása?',
    options: ['43 095 Ft-tal', '63 095 Ft-tal', '20 000 Ft-tal', '50 000 Ft-tal'],
    correctAnswer: 0,
    explanation: 'A tőketörlesztés = részlet − kamat = 63 095 − 20 000 = 43 095 Ft; marad 156 905 Ft.'
  },
  {
    id: 'fl-q9',
    questionTypeBadge: 'Kockázat',
    level: 1,
    question: 'Miért kockázatos külföldi pénznemben hitelt felvenni, ha a fizetésünket forintban kapjuk?',
    options: [
      'Mert a külföldi pénznem árfolyama később jelentősen megváltozhat',
      'Mert külföldi hitelre nem kell kamatot fizetni',
      'Mert a részletek forintban mindig csökkennek',
      'Mert devizahitelt nem lehet egyenlő részletekben törleszteni'
    ],
    correctAnswer: 0,
    explanation: 'Ha a forint gyengül, a devizában rögzített részlet és tartozás forintban kifejezve megnő.'
  },
  {
    id: 'fl-q10',
    questionTypeBadge: 'Kockázat',
    level: 1,
    question: 'A tankönyv szerint melyik statisztikai mutató ad lehetőséget a kockázat matematikai mérésére?',
    options: ['a szórás', 'a medián', 'a módusz', 'a kamatláb'],
    correctAnswer: 0,
    explanation: 'A kockázat mérésére a szórás számítása ad egy lehetőséget (a statisztika fejezetben szerepel példa).'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'fl-q11',
    questionTypeBadge: 'Annuitás',
    figure: FIG_TAMAS,
    level: 2,
    question: 'Tamás 2 000 000 Ft hitelt 3 év alatt, évi 10%-os kamat mellett, 3 egyenlő éves részletben fizet vissza. Kb. mekkora egy részlet?',
    options: ['≈ 804 230 Ft', '≈ 887 333 Ft', '≈ 733 333 Ft', '≈ 666 667 Ft'],
    correctAnswer: 0,
    explanation: '2 662 000 = 1,21x + 1,1x + x = 3,31x ⇒ x ≈ 804 230 Ft. (887 333 = 2 662 000 : 3 hibás módszer.)'
  },
  {
    id: 'fl-q12',
    questionTypeBadge: 'Annuitás',
    level: 2,
    question: 'Tamás 3 részlete egyenként ≈ 804 230 Ft. Összesen mennyit fizet vissza?',
    options: ['≈ 2 412 690 Ft', '2 662 000 Ft', '2 000 000 Ft', '≈ 2 200 000 Ft'],
    correctAnswer: 0,
    explanation: '3 · 804 230 = 2 412 690 Ft – kevesebb, mint az egyösszegű 2 662 000 Ft, mert a befizetett részletek után nincs kamat.'
  },
  {
    id: 'fl-q13',
    questionTypeBadge: 'Csak kamat',
    figure: FIG_ONLY_INTEREST,
    level: 2,
    question: 'A cég 2 000 000 Ft-ot vett fel 2 évre 8%-ra, az első év végén csak a kamatot (160 000 Ft) fizette. Mennyit fizet a második év végén?',
    options: ['2 160 000 Ft', '2 332 800 Ft', '2 000 000 Ft', '2 172 800 Ft'],
    correctAnswer: 0,
    explanation: 'A tartozás az első év után is 2 000 000 Ft, ez a második évben 8%-ot kamatozik: 2 160 000 Ft.'
  },
  {
    id: 'fl-q14',
    questionTypeBadge: 'Részletek',
    level: 2,
    question: 'Egy cég 2 000 000 Ft-ot vesz fel 3 évre 8%-ra; az első és a második év végén 500 000 Ft-ot fizet. Mennyit kell fizetnie a harmadik év végén?',
    options: ['1 396 224 Ft', '1 519 424 Ft', '1 292 800 Ft', '1 000 000 Ft'],
    correctAnswer: 0,
    explanation: '1. év: 2 160 000 − 500 000 = 1 660 000; 2. év: 1 792 800 − 500 000 = 1 292 800; 3. év: 1 292 800 · 1,08 = 1 396 224 Ft.'
  },
  {
    id: 'fl-q15',
    questionTypeBadge: 'Csak kamat',
    level: 2,
    question: 'Judit 350 000 Ft hitelét 2 év alatt fizeti vissza 11%-os kamatra; az első év végén csak a 38 500 Ft kamatot fizette. Mennyit fizet a második év végén?',
    options: ['388 500 Ft', '427 000 Ft', '350 000 Ft', '431 235 Ft'],
    correctAnswer: 0,
    explanation: 'A tartozás 350 000 Ft maradt, ez a második évben 11%-ot kamatozik: 350 000 · 1,11 = 388 500 Ft.'
  },
  {
    id: 'fl-q16',
    questionTypeBadge: 'Negyedéves részlet',
    figure: FIG_QUARTERS,
    level: 2,
    question: 'Kálmán 1 000 000 Ft hitelt vesz fel egy évre, évi 12%, minden negyedév végén 4 egyenlő részletben törleszt. Kb. mekkora a részlet?',
    options: ['≈ 269 027 Ft', '280 000 Ft', '250 000 Ft', '≈ 329 234 Ft'],
    correctAnswer: 0,
    explanation: 'q = 1,03: x = 1 000 000 · 1,03⁴ · 0,03/(1,03⁴ − 1) ≈ 269 027 Ft. (280 000 Ft = 1 120 000 : 4 hibás módszer.)'
  },
  {
    id: 'fl-q17',
    questionTypeBadge: 'Kamatrész',
    level: 2,
    question: 'Antal tőketartozása az első részlet után 156 905 Ft (10%-os kamat). Kb. mennyi a második részletből a kamat?',
    options: ['≈ 15 691 Ft', '20 000 Ft', '≈ 47 405 Ft', '≈ 16 905 Ft'],
    correctAnswer: 0,
    explanation: '156 905 · 0,1 = 15 690,5 ≈ 15 691 Ft; a tőketörlesztés 63 095 − 15 690,5 ≈ 47 405 Ft.'
  },
  {
    id: 'fl-q18',
    questionTypeBadge: 'Tőketartozás',
    level: 2,
    question: 'Antal 156 905 Ft-os tőketartozásából a második 63 095 Ft-os részlettel ≈ 47 405 Ft-ot törleszt. Kb. mennyi marad?',
    options: ['≈ 109 501 Ft', '93 810 Ft', '≈ 141 214 Ft', '≈ 113 810 Ft'],
    correctAnswer: 0,
    explanation: '156 905 − 47 404,5 ≈ 109 501 Ft. (93 810 = 156 905 − 63 095 a kamatot figyelmen kívül hagyná.)'
  },
  {
    id: 'fl-q19',
    questionTypeBadge: 'Csapda',
    level: 2,
    question: 'Miért kevesebb Tamás egyenlő részlete (≈ 804 230 Ft), mint az egyösszegű tartozás harmada (≈ 887 333 Ft)?',
    options: [
      'Mert a már befizetett részletek csökkentik a tartozást, és arra a bank nem számol kamatot',
      'Mert a bank részletfizetésnél kisebb kamatlábat alkalmaz',
      'Mert részletfizetésnél egyszerű kamattal számolnak',
      'Mert a harmadik részlet után még marad tartozás'
    ],
    correctAnswer: 0,
    explanation: 'A tankönyv megjegyzése: a befizetett részletek csökkentették a hiteltartozást, és arra a bank már nem számít fel kamatot.'
  },
  {
    id: 'fl-q20',
    questionTypeBadge: 'Annuitás',
    level: 2,
    question: '2 000 000 Ft hitelt 2 egyenlő éves részletben fizetünk vissza, évi 10%-os kamat mellett. Kb. mekkora egy részlet?',
    options: ['≈ 1 152 381 Ft', '1 210 000 Ft', '1 100 000 Ft', '1 000 000 Ft'],
    correctAnswer: 0,
    explanation: '2 000 000 · 1,1² = x · 1,1 + x ⇒ 2 420 000 = 2,1x ⇒ x ≈ 1 152 381 Ft.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'fl-q21',
    questionTypeBadge: 'Annuitás',
    level: 3,
    question: 'Szilárd 500 000 Ft hitelt vesz fel, 3 év alatt, 3 egyenlő éves részletben törleszt, a kamatláb 13%. Kb. mekkora a törlesztőrészlet?',
    options: ['≈ 211 761 Ft', '≈ 240 483 Ft', '≈ 186 667 Ft', '≈ 166 667 Ft'],
    correctAnswer: 0,
    explanation: 'x = 500 000 · 1,13³ · 0,13/(1,13³ − 1) ≈ 211 761 Ft. (≈ 240 483 = 500 000 · 1,13³ : 3.)'
  },
  {
    id: 'fl-q22',
    questionTypeBadge: 'Törlesztőtábla',
    level: 3,
    question: 'Szilárd részlete ≈ 211 761 Ft (500 000 Ft, 13%). Mennyi az első részletből a tőketörlesztés?',
    options: ['≈ 146 761 Ft', '65 000 Ft', '≈ 166 667 Ft', '≈ 211 761 Ft'],
    correctAnswer: 0,
    explanation: 'Kamat: 500 000 · 0,13 = 65 000 Ft; tőketörlesztés: 211 761 − 65 000 ≈ 146 761 Ft; marad ≈ 353 239 Ft.'
  },
  {
    id: 'fl-q23',
    questionTypeBadge: 'Törlesztőtábla',
    level: 3,
    question: 'Szilárd tőketartozása az első részlet után ≈ 353 239 Ft (13%). Kb. mennyi a második év kamata?',
    options: ['≈ 45 921 Ft', '65 000 Ft', '≈ 27 529 Ft', '≈ 24 362 Ft'],
    correctAnswer: 0,
    explanation: '353 239 · 0,13 ≈ 45 921 Ft. (≈ 24 362 Ft a harmadik év kamata.)'
  },
  {
    id: 'fl-q24',
    questionTypeBadge: 'Képlet',
    level: 3,
    question: 'T hitelt n egyenlő részletben törlesztünk, az időszaki kamattényező q. Melyik képlet adja a törlesztőrészletet?',
    options: ['x = T · qⁿ · (q − 1)/(qⁿ − 1)', 'x = T · qⁿ / n', 'x = T · (qⁿ − 1)/(q − 1)', 'x = T · q / n'],
    correctAnswer: 0,
    explanation: 'T · qⁿ = x(qⁿ⁻¹ + … + q + 1) = x(qⁿ − 1)/(q − 1) ⇒ x = T · qⁿ(q − 1)/(qⁿ − 1).'
  },
  {
    id: 'fl-q25',
    questionTypeBadge: 'Mértani sorozat',
    level: 3,
    question: 'Tamás egyenletében (2 662 000 = 3,31x) honnan jön a 3,31?',
    options: ['1,1² + 1,1 + 1, egy mértani sorozat első 3 tagjának összege', '1,1³ · 3', '3 · 1,1 + 0,01', '1,1³ − 1'],
    correctAnswer: 0,
    explanation: 'Az 1. részlet 2 évig, a 2. egy évig „kamatozik”, a 3. nem: 1,21 + 1,1 + 1 = 3,31 = (1,1³ − 1)/(1,1 − 1).'
  },
  {
    id: 'fl-q26',
    questionTypeBadge: 'Kamatteher',
    level: 3,
    question: 'Kálmán 1 000 000 Ft-os hitelét 4 negyedéves, ≈ 269 027 Ft-os részletben fizeti vissza. Kb. mennyi a teljes kamatteher?',
    options: ['≈ 76 108 Ft', '120 000 Ft', '≈ 125 509 Ft', '≈ 30 000 Ft'],
    correctAnswer: 0,
    explanation: '4 · 269 027 − 1 000 000 ≈ 76 108 Ft. (120 000 Ft lenne egy összegben, 1 év után egyszerű kamattal.)'
  },
  {
    id: 'fl-q27',
    questionTypeBadge: 'Havi részlet',
    level: 3,
    question: '1 200 000 Ft hitelt 12 egyenlő havi részletben fizetünk vissza, évi 12%-os kamatlábbal (havi 1%). Kb. mekkora a havi részlet?',
    options: ['≈ 106 619 Ft', '112 000 Ft', '100 000 Ft', '≈ 113 362 Ft'],
    correctAnswer: 0,
    explanation: 'q = 1,01, n = 12: x = 1 200 000 · 1,01¹² · 0,01/(1,01¹² − 1) ≈ 106 619 Ft.'
  },
  {
    id: 'fl-q28',
    questionTypeBadge: 'Árfolyamkockázat',
    level: 3,
    question: 'Valaki 10 000 € tartozással rendelkezik; a felvételkor 1 € = 380 Ft volt, most 1 € = 418 Ft. Mennyi a tartozása forintban, és hány %-kal nőtt?',
    options: ['4 180 000 Ft, 10%-kal', '3 800 000 Ft, 0%-kal', '4 180 000 Ft, 38%-kal', '4 560 000 Ft, 20%-kal'],
    correctAnswer: 0,
    explanation: '10 000 · 418 = 4 180 000 Ft; 418/380 = 1,1, tehát az euróban változatlan tartozás forintban 10%-kal nőtt.'
  },
  {
    id: 'fl-q29',
    questionTypeBadge: 'Kamatteher',
    level: 3,
    question: 'Tamás (2 000 000 Ft, 3 év, 10%, ≈ 804 230 Ft-os részletek) összesen mennyi kamatot fizet?',
    options: ['≈ 412 690 Ft', '662 000 Ft', '600 000 Ft', '≈ 249 310 Ft'],
    correctAnswer: 0,
    explanation: '3 · 804 230 − 2 000 000 = 412 690 Ft. (662 000 Ft az egyösszegű visszafizetés kamata.)'
  },
  {
    id: 'fl-q30',
    questionTypeBadge: 'Kamatteher',
    figure: FIG_ANTAL,
    level: 3,
    question: 'Antal 200 000 Ft hitelét 4 × 63 095 Ft-tal fizeti vissza. Mennyi a négy részlet kamatrészeinek összege?',
    options: ['52 380 Ft', '80 000 Ft', '20 000 Ft', '92 820 Ft'],
    correctAnswer: 0,
    explanation: 'A tőkerészek összege a felvett 200 000 Ft, így a kamatrészek összege 4 · 63 095 − 200 000 = 52 380 Ft (20 000 + 15 690,5 + 10 950 + 5 736 ≈ 52 377 + kerekítés).'
  }
];

export const FinanceLoansQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="sorozatok"
      topicId="g12-seq-hitelek-quiz"
      subtopicId="penzugyi-feladatok-2-hitelek-es-kockazatok"
      title="9. Pénzügyi feladatok II. – hitelek és kockázatok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: egyösszegű és részletes visszafizetés, egyenlő törlesztőrészlet, kamat- és tőkerész, kockázatok."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={FINANCE_LOANS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Visszafizetési módok',
          items: ['egy összegben n év múlva: T · qⁿ', 'csak kamat: T · (q − 1) évente, a végén T · q', 'tartozás a k-adik részlet után: Tₖ = Tₖ₋₁ · q − x', 'a végén a tartozás 0']
        },
        {
          title: 'Egyenlő részletek',
          items: ['T · qⁿ = x · (qⁿ − 1)/(q − 1)', 'x = T · qⁿ · (q − 1)/(qⁿ − 1)', 'Tamás: 2 662 000 = 3,31x ⇒ x ≈ 804 230 Ft', 'negyedéves részlet: q = 1 + p/400']
        },
        {
          title: 'Kamat- és tőkerész',
          items: ['kamatrész = aktuális tőketartozás · (q − 1)', 'tőkerész = részlet − kamatrész', 'a kamatrész csökken, a tőkerész nő', 'kockázat: árfolyam, változékony érték; mérés: szórás']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FinanceLoansMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <FinanceLoansSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default FinanceLoansQuiz;
