import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CylinderMatcher } from './CylinderMatcher';
import { CylinderSorter } from './CylinderSorter';
import { P2, KFig, KLine, KText, KPoly, KRight, KCyl, K_RED, K_BLUE, K_GREEN, K_PURPLE, K_EDGE, K_AMBER } from './figKit';

// ---------------------------------------------------------------------------
// Kérdésábrák (takart élek szaggatottak, derékszög: negyedkörív ponttal)
// ---------------------------------------------------------------------------

/** Álló henger r és m felirattal, opcionális tengelymetszettel és átlóval. */
const CylQ: React.FC<{ rx: number; h: number; lr?: string; lm?: string; ld?: string; axial?: boolean; diag?: boolean; ly?: string }> = ({
  rx,
  h,
  lr,
  lm,
  ld,
  axial,
  diag,
  ly
}) => {
  const cx = 110;
  const by = 132;
  const ty = by - h;
  return (
    <KFig>
      <KCyl cx={cx} by={by} rx={rx} ry={rx * 0.3} h={h} />
      {axial && <KPoly p={[[cx - rx, ty], [cx + rx, ty], [cx + rx, by], [cx - rx, by]]} fill="#fde68a" op={0.45} c={K_AMBER} w={1.3} dash />}
      {diag && <KLine a={[cx - rx, by]} b={[cx + rx, ty]} c={K_RED} w={2.4} />}
      {diag && <KRight v={[cx + rx, by]} p1={[cx - rx, by]} p2={[cx + rx, ty]} r={9} />}
      {lr && (
        <>
          <KLine a={[cx, by]} b={[cx + rx, by]} c={K_GREEN} w={2} />
          <KText p={[cx + rx + 6, by + 6]} t={lr} a="start" s={10.5} c={K_GREEN} />
        </>
      )}
      {ly && <KText p={[cx, by + 22]} t={ly} s={10.5} c={K_GREEN} />}
      {lm && <KText p={[cx + rx + 8, (ty + by) / 2]} t={lm} s={10.5} c={K_BLUE} a="start" />}
      {ld && <KText p={[cx - 8, (ty + by) / 2 - 8]} t={ld} s={11} c={K_RED} />}
    </KFig>
  );
};

const FIG_Q4 = (() => {
  const ax = 60;
  const by = 130;
  return (
    <KFig>
      <KLine a={[ax, by + 12]} b={[ax, by - 112]} c={K_PURPLE} w={1.3} dash />
      <KPoly p={[[ax, by - 100], [ax + 60, by - 100], [ax + 60, by], [ax, by]]} fill="#c7d2fe" c={K_EDGE} w={2} />
      <KRight v={[ax, by]} p1={[ax + 60, by]} p2={[ax, by - 100]} r={9} />
      <KText p={[ax + 30, by + 11]} t="3 cm" s={10.5} c={K_BLUE} />
      <KText p={[ax - 10, by - 50]} t="5 cm" s={10.5} c={K_BLUE} a="end" />
      <text x="150" y="70" fontSize="10.5" fill="#334155">tengely: az</text>
      <text x="150" y="85" fontSize="10.5" fill="#334155">5 cm-es oldal</text>
      <text x="150" y="110" fontSize="11" fontWeight="bold" fill={K_RED}>r = ?</text>
    </KFig>
  );
})();

const FIG_Q5 = <CylQ rx={40} h={100} lr="4 cm" lm="10 cm" axial />;
const FIG_Q6 = <CylQ rx={45} h={90} lr="5 cm" lm="m = ?" axial />;
const FIG_Q11 = (
  <KFig>
    <KPoly p={[[30, 30], [92, 30], [92, 118], [30, 118]]} fill="#fef3c7" c={K_EDGE} w={1.6} />
    <KLine a={[30, 30]} b={[30, 118]} c={K_RED} w={3} />
    <KLine a={[92, 30]} b={[92, 118]} c={K_RED} w={3} />
    <KText p={[61, 22]} t="21 cm" s={10} c={K_BLUE} />
    <KText p={[61, 132]} t="29,5 cm: összeragasztva" s={9.5} c={K_RED} />
    <KCyl cx={175} by={130} rx={26} ry={8} h={100} />
    <KLine a={[175, 130]} b={[201, 130]} c={K_GREEN} w={2} />
    <KText p={[214, 134]} t="r = ?" s={10} />
  </KFig>
);
const FIG_Q13 = <CylQ rx={26} h={104} ly="r = 8 cm" lm="32 cm" diag ld="?" />;
const FIG_Q16 = <CylQ rx={48} h={96} lm="12 cm" ly="négyzet tengelymetszet" axial />;
const FIG_Q19 = <CylQ rx={30} h={84} lm="12 cm" diag ld="13" ly="r = ?" />;

const FIG_Q20 = (() => {
  const c: P2 = [80, 80];
  const R = 58;
  return (
    <KFig>
      <circle cx={c[0]} cy={c[1]} r={R} fill="#fef3c7" stroke={K_EDGE} strokeWidth="1.8" />
      {Array.from({ length: 8 }, (_, i) => {
        const t = (i * Math.PI) / 4;
        return <KLine key={i} a={c} b={[c[0] + R * Math.cos(t), c[1] - R * Math.sin(t)]} c="#92400e" w={1.2} />;
      })}
      <path d={`M ${c[0]} ${c[1]} L ${c[0] + R} ${c[1]} A ${R} ${R} 0 0 0 ${(c[0] + R * Math.cos(Math.PI / 4)).toFixed(1)} ${(c[1] - R * Math.sin(Math.PI / 4)).toFixed(1)} Z`} fill="#a16207" fillOpacity="0.5" />
      <text x="150" y="60" fontSize="10.5" fill="#334155">felülnézet</text>
      <text x="150" y="80" fontSize="10.5" fill="#334155">d = 16 cm</text>
      <text x="150" y="100" fontSize="10.5" fill="#334155">m = 10 cm</text>
      <text x="150" y="122" fontSize="11" fontWeight="bold" fill={K_RED}>1 cikk teteje: ?</text>
    </KFig>
  );
})();

const FIG_Q21 = (() => {
  const c: P2 = [85, 80];
  const R = 62;
  const r = 12.4;
  return (
    <KFig>
      <circle cx={c[0]} cy={c[1]} r={R} fill="#fef9c3" stroke={K_EDGE} strokeWidth="2" />
      <circle cx={c[0]} cy={c[1]} r={r} fill="#fde68a" stroke={K_RED} strokeWidth="1.8" />
      {[90, 210, 330].map((d, i) => {
        const t = (d * Math.PI) / 180;
        return <KLine key={i} a={[c[0] + r * Math.cos(t), c[1] - r * Math.sin(t)]} b={[c[0] + R * Math.cos(t), c[1] - R * Math.sin(t)]} c={K_BLUE} w={2.2} />;
      })}
      <KText p={[c[0] + 12, c[1] - 38]} t="12" s={10} c={K_BLUE} />
      <KText p={[c[0], c[1] + 2]} t="?" s={10} />
      <text x="158" y="62" fontSize="10" fill="#334155">palást:</text>
      <text x="158" y="77" fontSize="10" fill="#334155">1885 cm²</text>
      <text x="158" y="100" fontSize="10" fill="#334155">magasság:</text>
      <text x="158" y="115" fontSize="10" fill="#334155">20 cm</text>
    </KFig>
  );
})();

const FIG_Q28 = <CylQ rx={26} h={104} ly="r = 8 cm" lm="m = ?" diag ld="40" />;

const FIG_Q30 = (() => {
  const c: P2 = [70, 80];
  const R = 55;
  const d = 33; // 3/5 · 55
  const half = Math.sqrt(R * R - d * d);
  return (
    <KFig>
      <circle cx={c[0]} cy={c[1]} r={R} fill="#e0e7ff" stroke={K_EDGE} strokeWidth="1.8" />
      <KLine a={[c[0] + d, c[1] - half]} b={[c[0] + d, c[1] + half]} c={K_RED} w={2.6} />
      <KLine a={c} b={[c[0] + d, c[1]]} c={K_PURPLE} w={1.6} />
      <KLine a={c} b={[c[0] + d, c[1] - half]} c={K_GREEN} w={1.6} />
      <KRight v={[c[0] + d, c[1]]} p1={c} p2={[c[0] + d, c[1] - half]} r={8} />
      <circle cx={c[0]} cy={c[1]} r="2" fill={K_EDGE} />
      <KText p={[c[0] + d / 2, c[1] + 10]} t="3" s={10} c={K_PURPLE} />
      <KText p={[c[0] + 8, c[1] - 26]} t="5" s={10} c={K_GREEN} />
      <text x="140" y="60" fontSize="10" fill="#334155">felülnézet</text>
      <text x="140" y="78" fontSize="10" fill="#334155">r = 5 cm, m = 10 cm</text>
      <text x="140" y="96" fontSize="10" fill="#334155">a tengelytől 3 cm-re</text>
      <text x="140" y="114" fontSize="10.5" fontWeight="bold" fill={K_RED}>metszet területe: ?</text>
    </KFig>
  );
})();

const CYLINDER_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'cy-q1',
    questionTypeBadge: 'Tengelymetszet',
    level: 1,
    question: 'Milyen síkidom az egyenes körhenger tengelymetszete?',
    options: ['téglalap', 'kör', 'ellipszis', 'trapéz'],
    correctAnswer: 0,
    explanation: 'A tengelymetszetet az alap- és fedőkör egy-egy párhuzamos átmérője és a végpontjaikba állított két alkotó határolja: 2r × m-es téglalap.'
  },
  {
    id: 'cy-q2',
    questionTypeBadge: 'Alkotó',
    level: 1,
    question: 'Mekkora az egyenes körhenger alkotójának hossza?',
    options: ['a testmagassággal egyenlő', 'az alapkör sugarával egyenlő', 'az alapkör kerületével egyenlő', 'az alapkör átmérőjével egyenlő'],
    correctAnswer: 0,
    explanation: 'Az alkotók az alaplapra merőleges, palástra illeszkedő szakaszok, ezért hosszuk az alaplap és a fedőlap távolságával, a testmagassággal egyenlő.'
  },
  {
    id: 'cy-q3',
    questionTypeBadge: 'Palást',
    level: 1,
    question: 'Milyen síkidomot kapunk, ha az egyenes körhenger palástját síkba terítjük?',
    options: ['2rπ és m oldalú téglalapot', 'r sugarú kört', 'körcikket', 'r és m oldalú téglalapot'],
    correctAnswer: 0,
    explanation: 'A palást kiterítve téglalap, egyik oldala az alapkör kerülete (2rπ), a másik a henger magassága (m).'
  },
  {
    id: 'cy-q4',
    questionTypeBadge: 'Forgatás',
    figure: FIG_Q4,
    level: 1,
    question: 'Egy 3 cm × 5 cm-es téglalapot az 5 cm-es oldalának egyenese körül forgatunk. Mekkora a keletkező henger alapkörének sugara?',
    options: ['3 cm', '5 cm', '1,5 cm', '2,5 cm'],
    correctAnswer: 0,
    explanation: 'A tengelyen fekvő 5 cm-es oldal lesz a magasság, a rá merőleges 3 cm-es oldal a sugár.'
  },
  {
    id: 'cy-q5',
    questionTypeBadge: 'Tengelymetszet',
    figure: FIG_Q5,
    level: 1,
    question: 'Egy henger alapkörének sugara 4 cm, magassága 10 cm. Mekkora a tengelymetszet területe?',
    options: ['80 cm²', '40 cm²', '160π cm²', '50 cm²'],
    correctAnswer: 0,
    explanation: 'A tengelymetszet 2r × m-es téglalap: 8 · 10 = 80 cm². (40 akkor jönne ki, ha a sugárral szoroznánk az átmérő helyett.)'
  },
  {
    id: 'cy-q6',
    questionTypeBadge: 'Egyenlő oldalú henger',
    figure: FIG_Q6,
    level: 1,
    question: 'Egy henger tengelymetszete négyzet, alapkörének sugara 5 cm. Milyen magas a henger?',
    options: ['10 cm', '5 cm', '2,5 cm', '5π cm'],
    correctAnswer: 0,
    explanation: 'Négyzet tengelymetszetnél m = 2r = 10 cm (egyenlő oldalú henger).'
  },
  {
    id: 'cy-q7',
    questionTypeBadge: 'Tengely',
    level: 1,
    question: 'Mi a henger tengelye?',
    options: [
      'a két körlap középpontját összekötő egyenes',
      'az alapkör egy átmérője',
      'a palást egy alkotója',
      'a tengelymetszet átlója'
    ],
    correctAnswer: 0,
    explanation: 'A két körlap (alaplap és fedőlap) középpontjait összekötő egyenes a henger tengelye.'
  },
  {
    id: 'cy-q8',
    questionTypeBadge: 'Síkmetszet',
    level: 1,
    question: 'Milyen síkidom a henger alaplappal párhuzamos síkmetszete?',
    options: ['az alapkörrel egybevágó kör', 'téglalap', 'az alapkörnél kisebb kör', 'ellipszis'],
    correctAnswer: 0,
    explanation: 'A henger minden alaplappal párhuzamos metszete egybevágó az alapkörrel (r sugarú kör).'
  },
  {
    id: 'cy-q9',
    questionTypeBadge: 'Alapkör',
    level: 1,
    question: 'Mekkora a 3 cm sugarú henger alapkörének kerülete?',
    options: ['6π ≈ 18,85 cm', '9π ≈ 28,27 cm', '3π ≈ 9,42 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'K = 2rπ = 6π ≈ 18,85 cm. (9π cm² a területe lenne.)'
  },
  {
    id: 'cy-q10',
    questionTypeBadge: 'Felismerés',
    level: 1,
    question: 'Melyik tárgy alakja NEM egyenes körhenger?',
    options: ['a focilabda', 'a jéghoki korongja', 'a hirdetőoszlop', 'a konzervdoboz'],
    correctAnswer: 0,
    explanation: 'A focilabda gömb alakú; a korong, a hirdetőoszlop és a konzervdoboz egyenes körhenger.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'cy-q11',
    questionTypeBadge: 'Papírhenger',
    figure: FIG_Q11,
    level: 2,
    question: 'Egy 21 cm × 29,5 cm-es lap két hosszabb oldalát átfedés nélkül összeragasztjuk. Mekkora a henger alapkörének sugara?',
    options: ['≈ 3,34 cm', '≈ 4,70 cm', '10,5 cm', '≈ 6,68 cm'],
    correctAnswer: 0,
    explanation: 'A szabadon maradt 21 cm-es oldalak alkotják a kört: 2rπ = 21 ⇒ r = 21 / (2π) ≈ 3,34 cm. (6,68 cm az átmérő.)'
  },
  {
    id: 'cy-q12',
    questionTypeBadge: 'Tengelymetszet',
    level: 2,
    question: 'Mekkora az előző (21 cm kerületű, 29,5 cm magas) henger tengelymetszetének területe?',
    options: ['≈ 197,2 cm²', '≈ 98,6 cm²', '619,5 cm²', '≈ 309,8 cm²'],
    correctAnswer: 0,
    explanation: 'T = 2r · m ≈ 6,685 · 29,5 ≈ 197,2 cm² (= 21 · 29,5 / π).'
  },
  {
    id: 'cy-q13',
    questionTypeBadge: 'Fakanál',
    figure: FIG_Q13,
    level: 2,
    question: 'Legfeljebb milyen hosszú fakanál fér el teljes hosszában egy 8 cm sugarú, 32 cm magas forgáshenger alakú fazékban?',
    options: ['≈ 35,78 cm', '≈ 32,98 cm', '40 cm', '48 cm'],
    correctAnswer: 0,
    explanation: 'A leghosszabb szakasz a tengelymetszet átlója: √(16² + 32²) = √1280 ≈ 35,78 cm. (32,98 cm a sugárral számolt hibás érték.)'
  },
  {
    id: 'cy-q14',
    questionTypeBadge: 'Forgatás',
    level: 2,
    question: 'Egy 2,6 cm × 4,5 cm-es téglalapot a rövidebb oldalának egyenese körül forgatunk. Mekkora a henger alapkörének területe?',
    options: ['≈ 63,62 cm²', '≈ 21,24 cm²', '≈ 28,27 cm²', '≈ 36,76 cm²'],
    correctAnswer: 0,
    explanation: 'A rövidebb oldal a tengely (m = 2,6 cm), a sugár 4,5 cm: T = 4,5² · π ≈ 63,62 cm².'
  },
  {
    id: 'cy-q15',
    questionTypeBadge: 'Forgatás',
    level: 2,
    question: 'Ugyanezt a 2,6 cm × 4,5 cm-es téglalapot a hosszabb oldalának egyenese körül forgatjuk. Mekkora most az alapkör területe?',
    options: ['≈ 21,24 cm²', '≈ 63,62 cm²', '≈ 16,34 cm²', '≈ 8,17 cm²'],
    correctAnswer: 0,
    explanation: 'Most a sugár a rövidebb oldal: T = 2,6² · π = 6,76π ≈ 21,24 cm².'
  },
  {
    id: 'cy-q16',
    questionTypeBadge: 'Egyenlő oldalú henger',
    figure: FIG_Q16,
    level: 2,
    question: 'Egy henger tengelymetszete 12 cm oldalú négyzet. Mekkora az alapkör területe?',
    options: ['36π ≈ 113,1 cm²', '144π ≈ 452,4 cm²', '144 cm²', '12π ≈ 37,7 cm²'],
    correctAnswer: 0,
    explanation: 'A négyzet oldala az átmérő: 2r = 12 ⇒ r = 6 cm, T = 36π ≈ 113,1 cm².'
  },
  {
    id: 'cy-q17',
    questionTypeBadge: 'Arányok',
    level: 2,
    question: 'Egy henger sugara 2 cm, magassága 5 cm. Hányszorosa a palást területe az alapkör területének?',
    options: ['5-szöröse', '2,5-szerese', '10-szerese', '1,25-szorosa'],
    correctAnswer: 0,
    explanation: 'T_palást / T_alap = 2rπm / (r²π) = 2m / r = 10 / 2 = 5.'
  },
  {
    id: 'cy-q18',
    questionTypeBadge: 'Védőfólia',
    level: 2,
    question: 'Egy 32 cm oldalú négyzet alakú fóliával, feldarabolás nélkül, egy rétegben vonunk be egy cső palástját. Mekkora a cső átmérője?',
    options: ['≈ 10,19 cm', '≈ 5,09 cm', '32 cm', '16 cm'],
    correctAnswer: 0,
    explanation: 'A fólia egyik oldala a cső kerülete: dπ = 32 ⇒ d ≈ 10,19 cm, a cső hossza 32 cm.'
  },
  {
    id: 'cy-q19',
    questionTypeBadge: 'Tengelymetszet átlója',
    figure: FIG_Q19,
    level: 2,
    question: 'Egy 12 cm magas henger tengelymetszetének átlója 13 cm. Mekkora az alapkör sugara?',
    options: ['2,5 cm', '5 cm', '6,5 cm', '≈ 8,83 cm'],
    correctAnswer: 0,
    explanation: '(2r)² + 12² = 13² ⇒ 2r = 5 ⇒ r = 2,5 cm.'
  },
  {
    id: 'cy-q20',
    questionTypeBadge: 'Torta',
    figure: FIG_Q20,
    level: 2,
    question: 'A 16 cm átmérőjű, 10 cm magas hengeres torta tetejét kakaóporral szórták meg, majd 8 egyenlő cikkre vágták. Mekkora egy cikk kakaós felülete?',
    options: ['8π ≈ 25,13 cm²', '32π ≈ 100,5 cm²', '2π ≈ 6,28 cm²', '20π ≈ 62,83 cm²'],
    correctAnswer: 0,
    explanation: 'A tető területe 8² · π = 64π cm², egy cikké ennek nyolcada: 8π ≈ 25,13 cm².'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'cy-q21',
    questionTypeBadge: 'Lámpaernyő',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy 20 cm magas hengeres lámpaernyő palástja 1885 cm². A külső kört három 12 cm-es, sugárirányú pálca köti a koncentrikus belső körhöz. Mekkora a belső kör átmérője?',
    options: ['6 cm', '3 cm', '30 cm', '18 cm'],
    correctAnswer: 0,
    explanation: '2Rπ · 20 = 1885 ⇒ R ≈ 15 cm. A belső kör sugara 15 − 12 = 3 cm, átmérője 6 cm.',
    breakdown: ['2Rπ = 1885 / 20 = 94,25 cm', 'R = 94,25 / (2π) ≈ 15 cm', 'r = 15 − 12 = 3 cm', 'd = 6 cm']
  },
  {
    id: 'cy-q22',
    questionTypeBadge: 'Torta',
    level: 3,
    question: 'A 16 cm átmérőjű, 10 cm magas torta oldalát fehér mázzal vonták be; 8 egyenlő cikkre vágják. Mekkora egy cikk mázas oldalfelülete?',
    options: ['20π ≈ 62,83 cm²', '160π ≈ 502,7 cm²', '10π ≈ 31,42 cm²', '8π ≈ 25,13 cm²'],
    correctAnswer: 0,
    explanation: 'A palást 2 · 8 · π · 10 = 160π cm², ennek nyolcada 20π ≈ 62,83 cm².'
  },
  {
    id: 'cy-q23',
    questionTypeBadge: 'Tengelymetszet',
    level: 3,
    question: 'Egy forgáshenger tengelymetszetének és alapkörének területe egyenlő, az alapkör sugara 4 cm. Milyen magas a henger?',
    options: ['2π ≈ 6,28 cm', '4π ≈ 12,57 cm', '8 cm', 'π ≈ 3,14 cm'],
    correctAnswer: 0,
    explanation: '2r · m = r²π ⇒ m = rπ/2 = 4π/2 = 2π ≈ 6,28 cm. (Általában m a sugár π/2-szerese.)'
  },
  {
    id: 'cy-q24',
    questionTypeBadge: 'Igaz–hamis',
    level: 3,
    question: 'Melyik állítás HAMIS?',
    options: [
      'Ha a tengelymetszet négyzet, akkor r : m = 2 : 1.',
      'A palást és az alapkör területének hányadosa 2m / r.',
      'Ha a tengelymetszet és az alapkör területe egyenlő, akkor m = rπ/2.',
      'Az egyenes körhenger alkotói párhuzamosak a tengellyel.'
    ],
    correctAnswer: 0,
    explanation: 'Négyzet tengelymetszetnél m = 2r, tehát r : m = 1 : 2, nem 2 : 1. A többi állítás igaz.'
  },
  {
    id: 'cy-q25',
    questionTypeBadge: 'Forgatás',
    level: 3,
    question: 'Egy 3 cm × 8 cm-es téglalapot egyszer a rövidebb, egyszer a hosszabb oldalegyenese körül forgatunk. Hányszorosa az első henger alapkörének területe a másodikénak?',
    options: ['64/9 ≈ 7,11-szerese', '8/3 ≈ 2,67-szerese', '9/64-szerese', '4-szerese'],
    correctAnswer: 0,
    explanation: 'Rövidebb oldal körül r = 8: 64π; hosszabb körül r = 3: 9π. Az arány 64/9 ≈ 7,11.'
  },
  {
    id: 'cy-q26',
    questionTypeBadge: 'Papírhenger',
    level: 3,
    question: 'Egy 20 cm × 30 cm-es lapból egyszer a hosszabb, egyszer a rövidebb oldalak összeragasztásával készítünk hengert. Mekkora a tengelymetszetek területe?',
    options: ['mindkettőé 600/π ≈ 191 cm²', '600 cm² és 600 cm²', '≈ 127 cm² és ≈ 286 cm²', 'mindkettőé 300/π ≈ 95,5 cm²'],
    correctAnswer: 0,
    explanation: 'T = 2r · m = (K / π) · m, és K · m mindkét esetben a lap területe, 600 cm². Így mindkettő 600/π ≈ 191 cm².'
  },
  {
    id: 'cy-q27',
    questionTypeBadge: 'Palástból',
    level: 3,
    question: 'Egy 10 cm magas henger palástjának területe 100π cm². Mekkora a tengelymetszet területe?',
    options: ['100 cm²', '50 cm²', '100π cm²', '200 cm²'],
    correctAnswer: 0,
    explanation: '2rπ · 10 = 100π ⇒ r = 5 cm. A tengelymetszet 2r · m = 10 · 10 = 100 cm².'
  },
  {
    id: 'cy-q28',
    questionTypeBadge: 'Fakanál',
    figure: FIG_Q28,
    level: 3,
    question: 'Egy 8 cm sugarú hengeres edénybe egy 40 cm-es pálcát szeretnénk teljes hosszában beletenni. Legalább milyen magas legyen az edény?',
    options: ['≈ 36,66 cm', '32 cm', '≈ 39,19 cm', '24 cm'],
    correctAnswer: 0,
    explanation: 'A pálca a tengelymetszet átlójára kerül: m = √(40² − 16²) = √1344 ≈ 36,66 cm.'
  },
  {
    id: 'cy-q29',
    questionTypeBadge: 'Egyenlő oldalú henger',
    level: 3,
    question: 'Egy egyenlő oldalú henger alapkörének kerülete 31,4 cm. Mekkora a tengelymetszet területe?',
    options: ['≈ 100 cm²', '≈ 50 cm²', '≈ 314 cm²', '≈ 25 cm²'],
    correctAnswer: 0,
    explanation: '2rπ = 31,4 ⇒ r ≈ 5 cm, m = 2r ≈ 10 cm. A tengelymetszet ≈ 10 × 10-es négyzet: ≈ 100 cm².'
  },
  {
    id: 'cy-q30',
    questionTypeBadge: 'Síkmetszet',
    figure: FIG_Q30,
    level: 3,
    question: 'Egy 5 cm sugarú, 10 cm magas hengert a tengelyével párhuzamos, attól 3 cm-re lévő síkkal elmetszünk. Mekkora a metszet területe?',
    options: ['80 cm²', '100 cm²', '60 cm²', '40 cm²'],
    correctAnswer: 0,
    explanation: 'A metszet téglalap, egyik oldala a húr: 2 · √(5² − 3²) = 8 cm, a másik a magasság (10 cm): 80 cm².'
  }
];

export const CylinderQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="tergeometria"
      topicId="g12-ter-henger-quiz"
      subtopicId="a-henger"
      title="4. A henger – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a henger részei, tengelymetszet, forgatás, papírhengerek, síkmetszetek."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={CYLINDER_QUESTIONS}
      cheatSheets={[
        {
          title: 'A henger részei',
          items: [
            'Alaplap és fedőlap: egybevágó, párhuzamos körlapok (r).',
            'Alkotó: merőleges az alaplapra, hossza = m.',
            'Tengely: a két kör középpontját összekötő egyenes.',
            'Palást kiterítve: 2rπ × m-es téglalap.'
          ]
        },
        {
          title: 'Tengelymetszet',
          items: [
            '2r × m-es téglalap, területe 2r · m.',
            'Átlója: √((2r)² + m²) – a leghosszabb benne elférő szakasz.',
            'Egyenlő oldalú henger: négyzet, m = 2r.',
            'Alappal párhuzamos metszet: r sugarú kör.'
          ]
        },
        {
          title: 'Forgatás és papírhenger',
          items: [
            'Téglalap forgatása: tengelyen fekvő oldal = m, másik oldal = r.',
            'Papírlap: a ragasztott oldal = m, a szabad oldal = 2rπ.',
            'r = K / (2π)',
            'Palást / alapkör = 2m / r'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<CylinderMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<CylinderSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default CylinderQuiz;
