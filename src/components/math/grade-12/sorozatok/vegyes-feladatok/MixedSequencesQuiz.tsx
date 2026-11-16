import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MixedSequencesMatcher } from './MixedSequencesMatcher';
import { MixedSequencesSorter } from './MixedSequencesSorter';
import { QFig, SeqBarChart, SText, S_BLUE, S_RED, S_AMBER, S_INK } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const pts = (v: number[], c = S_BLUE) => (
  <QFig>
    <SeqBarChart values={v} x={30} y={16} w={190} h={110} points color={c} showValues valueDigits={0} />
    <SText x={120} y={156} t="Milyen sorozat ez?" s={11} c={S_RED} b />
  </QFig>
);

const FIG_Q1 = pts([2, 6, 18, 54], S_RED);
const FIG_Q3 = pts([1, 4, 9, 16]);

const FIG_Q7 = (
  <QFig>
    <line x1={20} y1={90} x2={225} y2={90} stroke={S_INK} />
    {[0, 1, 2].map((v) => (
      <g key={v}>
        <line x1={20 + v * 100} y1={84} x2={20 + v * 100} y2={96} stroke={S_INK} />
        <SText x={20 + v * 100} y={112} t={String(v)} s={11} b />
      </g>
    ))}
    {[1, 0.5, 0.25, 0.125, 0.0625].reduce<{ x: number; el: React.ReactNode[] }>(
      (acc, p, i) => {
        const w = p * 100;
        acc.el.push(<rect key={i} x={acc.x} y={66 - i * 3} width={w} height={14} fill={[S_BLUE, '#059669', S_AMBER, '#7c3aed', S_RED][i]} opacity={0.8} />);
        acc.x += w;
        return acc;
      },
      { x: 20, el: [] }
    ).el}
    <SText x={120} y={40} t="1 + 1/2 + 1/4 + 1/8 + 1/16 = ?" s={11} c={S_RED} b />
  </QFig>
);

const FIG_PUMPKIN = (
  <QFig>
    {[1, 2, 3, 4].map((k, r) => (
      <g key={r}>
        {Array.from({ length: k * k }, (_, i) => (
          <circle key={i} cx={28 + r * 55 + (i % k) * 11} cy={40 + Math.floor(i / k) * 11} r={5} fill={S_AMBER} stroke="#92400e" strokeWidth="0.8" />
        ))}
        <SText x={28 + r * 55 + (k - 1) * 5.5} y={110} t={`${k}. szint`} s={9.5} />
      </g>
    ))}
    <SText x={120} y={140} t="az n-edik szinten n² tök" s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_Q15 = (
  <QFig>
    {[8, 10, 12].map((cnt, r) => (
      <g key={r}>
        {Array.from({ length: cnt }, (_, i) => (
          <rect key={i} x={120 - cnt * 6 + i * 12} y={30 + r * 16} width={10.5} height={13} fill={r === 0 || i === 0 || i === cnt - 1 ? '#9f1239' : '#94a3b8'} rx={1.5} />
        ))}
      </g>
    ))}
    <SText x={120} y={94} t="⋮" s={16} c="#475569" />
    <SText x={120} y={124} t="8, 10, 12, … járólap" s={10.5} />
    <SText x={120} y={146} t="összesen 858 lap – hány sor?" s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_CAKE = (() => {
  const tri = (cx: number, cy: number, a: number): [number, number][] =>
    [0, 1, 2].map((k) => {
      const t = ((-90 + k * 120) * Math.PI) / 180;
      return [cx + (a / Math.sqrt(3)) * Math.cos(t), cy + (a / Math.sqrt(3)) * Math.sin(t)] as [number, number];
    });
  let P = tri(110, 92, 130);
  const L: [number, number][][] = [];
  for (let i = 0; i < 3; i++) {
    L.push(P);
    P = P.map((p, k) => {
      const q = P[(k + 1) % 3];
      return [p[0] + (q[0] - p[0]) / 3, p[1] + (q[1] - p[1]) / 3] as [number, number];
    });
  }
  return (
    <QFig>
      {L.map((T, i) => (
        <polygon key={i} points={T.map((p) => p.join(',')).join(' ')} fill={['#fde68a', '#fbcfe8', '#bfdbfe'][i]} stroke={S_INK} strokeWidth="1.3" />
      ))}
      <SText x={110} y={150} t="30 cm" s={10.5} c={S_BLUE} b />
      <SText x={206} y={60} t="harmadoló-" s={9.5} />
      <SText x={206} y={72} t="pontok" s={9.5} />
    </QFig>
  );
})();

// HF 1. grafikonja: számtani (piros kör) és mértani (kék rombusz) sorozat első 3-3 tagja
const FIG_HF1 = (() => {
  const u = 22;
  const ox = 70;
  const oy = 140;
  const X = (x: number) => ox + x * u;
  const Y = (y: number) => oy - y * u;
  return (
    <QFig h={175}>
      {[-1, 0, 1, 2, 3, 4].map((x) => (
        <line key={`gx${x}`} x1={X(x)} y1={Y(-1)} x2={X(x)} y2={Y(5)} stroke="#e2e8f0" />
      ))}
      {[-1, 0, 1, 2, 3, 4, 5].map((y) => (
        <line key={`gy${y}`} x1={X(-1)} y1={Y(y)} x2={X(4)} y2={Y(y)} stroke="#e2e8f0" />
      ))}
      <line x1={X(-1)} y1={oy} x2={X(4) + 6} y2={oy} stroke={S_INK} strokeWidth="1.3" />
      <line x1={ox} y1={Y(-1)} x2={ox} y2={Y(5) - 6} stroke={S_INK} strokeWidth="1.3" />
      <SText x={X(1)} y={oy + 13} t="1" s={10} />
      <SText x={ox - 8} y={Y(1) + 4} t="1" s={10} />
      <SText x={ox - 8} y={oy + 13} t="0" s={10} />
      {[4, 1.5, -1].map((v, i) => (
        <circle key={`a${i}`} cx={X(i + 1)} cy={Y(v)} r={4} fill={S_RED} stroke="#7f1d1d" strokeWidth="0.8" />
      ))}
      {[2, 3, 4.5].map((v, i) => (
        <rect key={`g${i}`} x={X(i + 1) - 4} y={Y(v) - 4} width={8} height={8} transform={`rotate(45 ${X(i + 1)} ${Y(v)})`} fill={S_BLUE} stroke="#1e3a8a" strokeWidth="0.8" />
      ))}
      <circle cx={X(4) + 4} cy={Y(4.4)} r={3.5} fill={S_RED} />
      <SText x={X(4) + 10} y={Y(4.4) + 3.5} t="számtani" s={9} a="start" />
      <rect x={X(4) + 1} y={Y(3.6) - 3} width={6} height={6} transform={`rotate(45 ${X(4) + 4} ${Y(3.6)})`} fill={S_BLUE} />
      <SText x={X(4) + 10} y={Y(3.6) + 3.5} t="mértani" s={9} a="start" />
    </QFig>
  );
})();

const MIXED_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'mx-q1',
    questionTypeBadge: 'Felismerés',
    figure: FIG_Q1,
    level: 1,
    question: 'Milyen sorozat kezdete a 2; 6; 18; 54?',
    options: ['mértani sorozat, q = 3', 'számtani sorozat, d = 4', 'számtani sorozat, d = 3', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'A szomszédos tagok hányadosa állandó: 6/2 = 18/6 = 54/18 = 3. A különbségek (4; 12; 36) nem állandók.'
  },
  {
    id: 'mx-q2',
    questionTypeBadge: 'Felismerés',
    level: 1,
    question: 'Milyen sorozat kezdete az 5; 8; 11; 14?',
    options: ['számtani sorozat, d = 3', 'mértani sorozat, q = 1,6', 'mértani sorozat, q = 3', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'A különbségek állandók: 8 − 5 = 11 − 8 = 14 − 11 = 3. A hányadosok (1,6; 1,375; …) különbözők.'
  },
  {
    id: 'mx-q3',
    questionTypeBadge: 'Felismerés',
    figure: FIG_Q3,
    level: 1,
    question: 'Milyen sorozat kezdete az 1; 4; 9; 16 (négyzetszámok)?',
    options: ['se nem számtani, se nem mértani', 'számtani sorozat, d = 3', 'mértani sorozat, q = 4', 'számtani és mértani is'],
    correctAnswer: 0,
    explanation: 'A különbségek 3; 5; 7 – nem állandók; a hányadosok 4; 2,25; 1,78 – sem állandók. Ez a négyzetszámok sorozata.'
  },
  {
    id: 'mx-q4',
    questionTypeBadge: 'Számtani közép',
    level: 1,
    question: 'A 4; x; 10 számok ebben a sorrendben egy számtani sorozat egymást követő tagjai. Mennyi x?',
    options: ['7', '6', '√40', '14'],
    correctAnswer: 0,
    explanation: 'A középső tag a szomszédok számtani közepe: x = (4 + 10)/2 = 7.'
  },
  {
    id: 'mx-q5',
    questionTypeBadge: 'Mértani közép',
    level: 1,
    question: 'A 4; x; 9 pozitív számok ebben a sorrendben egy mértani sorozat egymást követő tagjai. Mennyi x?',
    options: ['6', '6,5', '36', '5'],
    correctAnswer: 0,
    explanation: 'x² = 4 · 9 = 36, és x > 0, ezért x = 6 (a mértani közép). A 6,5 a számtani közép lenne.'
  },
  {
    id: 'mx-q6',
    questionTypeBadge: 'n-edik tag',
    level: 1,
    question: 'Egy számtani sorozat első tagja 5, differenciája 2. Mennyi a 10. tagja?',
    options: ['23', '25', '20', '2560'],
    correctAnswer: 0,
    explanation: 'a₁₀ = a₁ + 9d = 5 + 18 = 23.'
  },
  {
    id: 'mx-q7',
    questionTypeBadge: 'Mértani összeg',
    figure: FIG_Q7,
    level: 1,
    question: 'Mennyi az 1 + 1/2 + 1/4 + 1/8 + 1/16 összeg?',
    options: ['31/16 = 1,9375', '2', '15/8 = 1,875', '1/32'],
    correctAnswer: 0,
    explanation: 'b₁ = 1, q = 1/2, n = 5: S₅ = (1 − 1/32)/(1/2) = 31/16. A 2-t nem éri el.'
  },
  {
    id: 'mx-q8',
    questionTypeBadge: 'Felismerés',
    level: 1,
    question: 'Milyen sorozat a 7; 7; 7; 7; … állandó sorozat?',
    options: ['számtani (d = 0) és mértani (q = 1) is', 'csak számtani', 'csak mértani', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'Szomszédos tagjainak különbsége állandóan 0, hányadosa állandóan 1, így mindkét definíciónak megfelel.'
  },
  {
    id: 'mx-q9',
    questionTypeBadge: 'Tökpiramis',
    figure: FIG_PUMPKIN,
    level: 1,
    question: 'A tökpiramis legfelső szintjén 1 tök van, felülről az n-edik szinten n². Hány tök van a felső négy szinten összesen?',
    options: ['30', '16', '20', '100'],
    correctAnswer: 0,
    explanation: '1 + 4 + 9 + 16 = 30. (Képlettel: 4 · 5 · 9 / 6 = 30.)'
  },
  {
    id: 'mx-q10',
    questionTypeBadge: 'Négyzetösszeg',
    level: 1,
    question: 'Az 1² + 2² + … + n² = n(n + 1)(2n + 1)/6 képlet szerint mennyi az 1² + 2² + … + 7² összeg?',
    options: ['140', '28', '196', '120'],
    correctAnswer: 0,
    explanation: '7 · 8 · 15 / 6 = 140. (28 = 1 + 2 + … + 7, 196 = 28².)'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'mx-q11',
    questionTypeBadge: 'Tagszám',
    level: 2,
    question: 'Egy számtani sorozat első tagja 5, differenciája 2. Az első taggal kezdve összeadtuk a sorozat egymást követő tagjait, és 357-et kaptunk. Hány tagot adtunk össze?',
    options: ['17', '21', '18', '16'],
    correctAnswer: 0,
    explanation: 'Sₙ = (10 + 2(n − 1))/2 · n = n(n + 4) = 357 ⇒ n² + 4n − 357 = 0 ⇒ n = 17 (17 · 21 = 357).'
  },
  {
    id: 'mx-q12',
    questionTypeBadge: 'Egyenlőtlenség',
    level: 2,
    question: 'Egy mértani sorozat első tagja 16, kvóciense 1,07. Hány olyan tagja van a sorozatnak, amely kisebb 1000-nél?',
    options: ['62', '61', '24', '63'],
    correctAnswer: 0,
    explanation: '16 · 1,07ⁿ⁻¹ < 1000 ⇒ n − 1 < lg 62,5/lg 1,07 ≈ 61,1 ⇒ n ≤ 62 (a₆₂ ≈ 992, a₆₃ ≈ 1061).'
  },
  {
    id: 'mx-q13',
    questionTypeBadge: 'Egyenlőtlenség',
    level: 2,
    question: 'Egy mértani sorozat első tagja 16, kvóciense 1,07. Összeadtuk az első n tagját, és az összeg kisebb 1000-nél. Legfeljebb hány tagot adhattunk össze?',
    options: ['24', '25', '62', '23'],
    correctAnswer: 0,
    explanation: '16 · (1,07ⁿ − 1)/0,07 < 1000 ⇒ 1,07ⁿ < 5,375 ⇒ n < 24,9 ⇒ legfeljebb 24 (S₂₄ ≈ 930,8; S₂₅ ≈ 1012).'
  },
  {
    id: 'mx-q14',
    questionTypeBadge: 'Mértani összeg',
    level: 2,
    question: 'A {bₙ} mértani sorozat első tagja 1, hányadosa 1/2. Mennyi az első 10 tag összegének pontos értéke?',
    options: ['1023/512', '1023/1024', '2', '511/256'],
    correctAnswer: 0,
    explanation: 'S₁₀ = (1 − (1/2)¹⁰)/(1/2) = 2 · 1023/1024 = 1023/512 ≈ 1,998.'
  },
  {
    id: 'mx-q15',
    questionTypeBadge: 'Érettségi 2009',
    figure: FIG_Q15,
    level: 2,
    question: 'Angéla az első sorba 8 járólapot rakott, minden további sorba kettővel többet, mint az előzőbe. Összesen 858 lapot használt fel. Hány sort rakott le?',
    options: ['26', '33', '22', '27'],
    correctAnswer: 0,
    explanation: 'a₁ = 8, d = 2: Sₙ = n(n + 7) = 858 ⇒ n² + 7n − 858 = 0 ⇒ n = 26 (26 · 33 = 858).'
  },
  {
    id: 'mx-q16',
    questionTypeBadge: 'Faiskola',
    level: 2,
    question: 'Egy faiskolában az első sorba 40 csemetét ültettek, minden további sorba 4-gyel többet. Összesen 1020 csemete van. Hány sorba ültettek?',
    options: ['15', '17', '25', '12'],
    correctAnswer: 0,
    explanation: 'Sₙ = (80 + 4(n − 1))/2 · n = n(38 + 2n) = 1020 ⇒ n² + 19n − 510 = 0 ⇒ n = 15.'
  },
  {
    id: 'mx-q17',
    questionTypeBadge: 'Számtani összeg',
    level: 2,
    question: 'Egy számtani sorozat első tagja 10, differenciája 2. Legalább hány tagját kell összeadni, hogy az összeg nagyobb legyen 1000-nél?',
    options: ['28', '27', '17', '496'],
    correctAnswer: 0,
    explanation: 'Sₙ = n(n + 9) > 1000: S₂₇ = 27 · 36 = 972, S₂₈ = 28 · 37 = 1036 ⇒ legalább 28 tag.'
  },
  {
    id: 'mx-q18',
    questionTypeBadge: 'Mértani összeg',
    level: 2,
    question: 'Egy mértani sorozat első tagja 10, kvóciense 1,2. Legalább hány tagját kell összeadni, hogy az összeg nagyobb legyen 1000-nél?',
    options: ['17', '16', '28', '26'],
    correctAnswer: 0,
    explanation: '10 · (1,2ⁿ − 1)/0,2 > 1000 ⇒ 1,2ⁿ > 21 ⇒ n > lg 21/lg 1,2 ≈ 16,7 ⇒ n = 17.'
  },
  {
    id: 'mx-q19',
    questionTypeBadge: 'Négyzetösszeg',
    level: 2,
    question: 'Mennyi az 1² + 2² + … + 25² összeg?',
    options: ['5525', '325', '15 625', '5850'],
    correctAnswer: 0,
    explanation: '25 · 26 · 51 / 6 = 5525. (325 = 1 + 2 + … + 25.)'
  },
  {
    id: 'mx-q20',
    questionTypeBadge: 'Két tagból a 7. tag',
    level: 2,
    question: 'Egy mértani sorozat 5. tagja −4, 9. tagja −49 (tankönyv, HF 2. a)). Mennyi a 7. tagja?',
    options: ['−14', '14 vagy −14', '14', '−26,5'],
    correctAnswer: 0,
    explanation: 'q⁴ = −49 : (−4) = 12,25 ⇒ q² = 3,5 (q² > 0). a₇ = a₅ · q² = −4 · 3,5 = −14. A +14 nem lehet: a₇ előjele a₅-ével egyezik. (A −26,5 a számtani közép.)'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'mx-q21',
    questionTypeBadge: 'Érettségi 2006',
    level: 3,
    question: 'Egy mértani és egy számtani sorozat első tagja is 5. A mértani sorozat 3. és 5. tagja rendre a számtani sorozat 4. és 16. tagjával egyenlő. Mennyi d és q (nem konstans sorozatok esetén)?',
    options: ['d = 5, q = 2 vagy q = −2', 'd = 5, q = 2', 'd = 2, q = 5', 'd = 15, q = 4'],
    correctAnswer: 0,
    explanation: '5q² = 5 + 3d, 5q⁴ = 5 + 15d ⇒ q⁴ − 1 = 5(q² − 1) ⇒ q² = 4 (vagy q² = 1, d = 0). q = ±2, d = 5.'
  },
  {
    id: 'mx-q22',
    questionTypeBadge: 'Érettségi 2009',
    level: 3,
    question: 'Angéla 26 sort rakott le (8, 10, …, 58 lap). 4 csomagot vett, csomagonként 225 lap, ennek 16%-a bordó. Bordó lett az első és utolsó sor, valamint a többi sor két szélső lapja. Hány bordó és hány szürke lap maradt ki?',
    options: ['30 bordó, 12 szürke', '42 bordó, 0 szürke', '12 bordó, 30 szürke', '78 bordó, 12 szürke'],
    correctAnswer: 0,
    explanation: 'Bordó: 144 van, lerakva 8 + 58 + 2 · 24 = 114 ⇒ 30 marad. Szürke: 756 van, lerakva 858 − 114 = 744 ⇒ 12 marad.'
  },
  {
    id: 'mx-q23',
    questionTypeBadge: 'Mértani sorozat',
    level: 3,
    question: 'Egy mértani sorozat kvóciense −3, első 10 tagjának összege −7381. Mennyi a 7. tagja?',
    options: ['364,5', '−364,5', '729', '121,5'],
    correctAnswer: 0,
    explanation: 'a₁ · ((−3)¹⁰ − 1)/(−4) = −14 762 · a₁ = −7381 ⇒ a₁ = 0,5; a₇ = 0,5 · (−3)⁶ = 364,5.'
  },
  {
    id: 'mx-q24',
    questionTypeBadge: 'Torta',
    figure: FIG_CAKE,
    level: 3,
    question: 'Csilla 30 cm oldalú szabályos háromszög oldalait harmadolta, és a csúcsoktól számított első osztópontokat körbe összekötötte. Mekkora az új szabályos háromszög oldala?',
    options: ['10√3 ≈ 17,32 cm', '10 cm', '20 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'Koszinusztétel a 10 és 20 cm-es szakaszokra (60°): √(100 + 400 − 200) = √300 = 10√3 ≈ 17,32 cm.'
  },
  {
    id: 'mx-q25',
    questionTypeBadge: 'Torta',
    figure: FIG_CAKE,
    level: 3,
    question: 'A négyszintes torta szintjeinek oldalai 30; 10√3; 10; 10/√3 cm. Kb. milyen hosszú a háromszögek kerületén körbefutó cukordíszítés összesen?',
    options: ['≈ 189,3 cm', '≈ 63,1 cm', '≈ 135 cm', '360 cm'],
    correctAnswer: 0,
    explanation: 'A kerületek mértani sorozatot alkotnak (q = 1/√3): 90 + 51,96 + 30 + 17,32 ≈ 189,3 cm. (63,1 cm csak az oldalak összege.)'
  },
  {
    id: 'mx-q26',
    questionTypeBadge: 'Korlát',
    level: 3,
    question: 'Bence szerint akárhány tagját adjuk össze az 1; 1/2; 1/4; … sorozatnak, az összeg sosem éri el a 2-t. Melyik indoklás helyes?',
    options: [
      'Igaz, mert Sₙ = 2 − (1/2)ⁿ⁻¹, és (1/2)ⁿ⁻¹ > 0',
      'Hamis, mert S₁₅ ezredekre kerekítve 2,000',
      'Hamis, mert végtelen sok pozitív szám összege végtelen',
      'Igaz, mert minden tag kisebb 1-nél'
    ],
    correctAnswer: 0,
    explanation: 'Sₙ = (1 − (1/2)ⁿ)/(1/2) = 2 − (1/2)ⁿ⁻¹ < 2 minden n-re. A kerekített 2,000 csak közelítés; az első tag (1) nem kisebb 1-nél.'
  },
  {
    id: 'mx-q27',
    questionTypeBadge: 'Mértani közép',
    level: 3,
    question: 'Egy mértani sorozat 5. tagja 4, 9. tagja 324. Mennyi a 7. tagja?',
    options: ['36', '36 vagy −36', '164', '−36'],
    correctAnswer: 0,
    explanation: 'q⁴ = 81 ⇒ q² = 9, és a₇ = a₅ · q² = 36. Mivel q² > 0, a₇ előjele azonos a₅-ével, így −36 nem lehet.'
  },
  {
    id: 'mx-q28',
    questionTypeBadge: 'Számtaniból mértani',
    level: 3,
    question: 'Három szám számtani sorozatot alkot, összegük 15. Ha az elsőhöz 1-et, a másodikhoz 1-et, a harmadikhoz 9-et adunk, mértani sorozatot kapunk. Melyik lehet a három szám?',
    options: ['1; 5; 9 vagy 17; 5; −7', 'csak 1; 5; 9', '3; 5; 7', '2; 5; 8'],
    correctAnswer: 0,
    explanation: 'A számok 5 − d; 5; 5 + d. (6 − d)(14 + d) = 6² ⇒ d² + 8d − 48 = 0 ⇒ d = 4 vagy −12: 2; 6; 18 (q = 3) vagy 18; 6; 2 (q = 1/3).'
  },
  {
    id: 'mx-q29',
    questionTypeBadge: 'Grafikonról',
    figure: FIG_HF1,
    level: 3,
    question: 'A grafikonon egy számtani (piros) és egy mértani (kék) sorozat első 3-3 tagja látszik (tankönyv, HF 1.). Mennyi a számtani sorozat első 25 tagjának összege?',
    options: ['−650', '−550', '−700', '650'],
    correctAnswer: 0,
    explanation: 'Számtani: 4; 1,5; −1 ⇒ a₁ = 4, d = −2,5; S₂₅ = (2 · 4 + 24 · (−2,5))/2 · 25 = −26 · 25 = −650. (A mértani: 2; 3; 4,5 ⇒ q = 1,5, b₁₀ = 2 · 1,5⁹ ≈ 76,89, S₂₅ = 4 · (1,5²⁵ − 1) ≈ 101 000,67.)'
  },
  {
    id: 'mx-q30',
    questionTypeBadge: 'Torta',
    figure: FIG_CAKE,
    level: 3,
    question: 'A tortaszintek felülete (szabályos háromszögek) mértani sorozatot alkot. Mekkora a hányadosa, és kb. mekkora a 4 szint alapterülete összesen?',
    options: ['q = 1/3, ≈ 577,4 cm²', 'q = 1/√3, ≈ 577,4 cm²', 'q = 1/3, ≈ 389,7 cm²', 'q = 1/9, ≈ 438,4 cm²'],
    correctAnswer: 0,
    explanation: 'A hasonlóság aránya 1/√3, a területeké ennek négyzete, 1/3. 389,7 · (1 − (1/3)⁴)/(1 − 1/3) ≈ 577,4 cm².'
  }
];

export const MixedSequencesQuiz: React.FC<{
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
      topicId="g12-seq-vegyes-quiz"
      subtopicId="vegyes-feladatok"
      title="7. Vegyes feladatok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: sorozatok felismerése, számtani és mértani közép, tagszám, egyenlőtlenségek, érettségi feladatok."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={MIXED_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számtani sorozat',
          items: ['aₙ = a₁ + (n − 1)d', 'Sₙ = (a₁ + aₙ)/2 · n', 'Sₙ = (2a₁ + (n − 1)d)/2 · n', 'aₙ = (aₙ₋₁ + aₙ₊₁)/2']
        },
        {
          title: 'Mértani sorozat',
          items: ['aₙ = a₁ · qⁿ⁻¹', 'Sₙ = a₁(qⁿ − 1)/(q − 1), q ≠ 1', 'aₙ² = aₙ₋₁ · aₙ₊₁', 'aₖ és aₘ ⇒ qᵐ⁻ᵏ = aₘ/aₖ']
        },
        {
          title: 'Stratégia',
          items: [
            'Ismeretlen n számtaninál: másodfokú egyenlet.',
            'Ismeretlen n mértaninál: logaritmus.',
            '„Legalább” ⇒ felfelé, „legfeljebb” ⇒ lefelé kerekítünk.',
            '1² + … + n² = n(n + 1)(2n + 1)/6.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MixedSequencesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <MixedSequencesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default MixedSequencesQuiz;
