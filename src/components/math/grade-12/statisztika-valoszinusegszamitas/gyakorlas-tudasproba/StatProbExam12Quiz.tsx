import React from 'react';
import { QuizTemplate, QuizQuestion, DifficultyLevel } from '../QuizTemplate';
import { StatProbExam12Matcher } from './StatProbExam12Matcher';
import { StatProbExam12Sorter } from './StatProbExam12Sorter';
import {
  SFig,
  SText,
  STable,
  SWheel,
  SPie,
  SBoxPlot,
  SBarChart,
  SVenn,
  WheelSector,
  S_BLUE,
  S_GREEN,
  S_AMBER,
  S_PURPLE,
  S_RED,
  S_TEAL,
  S_INK,
  S_AXIS
} from './statKit';

// ---------------------------------------------------------------------------
// Segédfüggvény a kérdésekhez (correctAnswer mindig 0 – a sablon keveri a válaszokat)
// ---------------------------------------------------------------------------
const Q = (
  n: number,
  level: DifficultyLevel,
  badge: string,
  question: string,
  options: string[],
  explanation: string,
  figure?: React.ReactNode
): QuizQuestion => ({
  id: `spe12-q${n}`,
  level,
  questionTypeBadge: badge,
  question,
  options,
  correctAnswer: 0,
  explanation,
  ...(figure ? { figure } : {})
});

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const wheelFig = (sectors: WheelSector[]) => (
  <SFig w={220} h={150} className="w-full max-w-[250px] h-auto mx-auto">
    <SWheel cx={110} cy={82} r={56} s={7.5} sectors={sectors} />
  </SFig>
);

const FIG_WHEEL_TP = wheelFig([
  { label: '3000 Ft', deg: 60, color: S_RED, showDeg: true },
  { label: '200 Ft', deg: 150, color: S_BLUE, showDeg: true },
  { label: '5000 Ft', deg: 30, color: S_PURPLE, showDeg: true },
  { label: '500 Ft', deg: 120, color: S_AMBER, showDeg: true }
]);

const FIG_WHEEL_90 = wheelFig([
  { label: 'nyer', deg: 90, color: S_GREEN, showDeg: true },
  { label: 'nem nyer', deg: 270, color: '#94a3b8', showDeg: true }
]);

const FIG_VURSTLI = wheelFig([
  { label: '0 Ft', deg: 60, color: '#94a3b8' },
  { label: '200 Ft', deg: 60, color: S_BLUE },
  { label: '900 Ft', deg: 60, color: S_GREEN },
  { label: '0 Ft', deg: 60, color: '#94a3b8' },
  { label: '100 Ft', deg: 60, color: S_AMBER },
  { label: '1200 Ft', deg: 60, color: S_PURPLE }
]);

const diceFig = (mark: (a: number, b: number) => string | null, caption: string) => (
  <SFig w={200} h={170} className="w-full max-w-[240px] h-auto mx-auto">
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <SText x={52 + i * 20} y={18} t={String(i + 1)} s={8} b c={S_AXIS} />
        <SText x={34} y={35 + i * 20} t={String(i + 1)} s={8} b c={S_AXIS} />
      </g>
    ))}
    {Array.from({ length: 36 }, (_, idx) => {
      const a = Math.floor(idx / 6) + 1;
      const b = (idx % 6) + 1;
      const m = mark(a, b);
      return (
        <g key={idx}>
          <rect x={42 + (b - 1) * 20} y={22 + (a - 1) * 20} width={20} height={20} fill={m ? '#e0e7ff' : '#ffffff'} stroke="#94a3b8" strokeWidth={0.6} />
          <SText x={52 + (b - 1) * 20} y={35 + (a - 1) * 20} t={String(a + b)} s={7} c={S_AXIS} />
        </g>
      );
    })}
    <SText x={100} y={160} t={caption} s={7.5} c={S_AXIS} />
  </SFig>
);

const FIG_DICE_SUM = diceFig(() => null, 'a cellákban a két dobás összege');

const FIG_BOX_Q = (
  <SFig w={260} h={110} className="w-full max-w-[300px] h-auto mx-auto">
    <SBoxPlot q={[10, 25, 35, 50, 70]} axMin={5} axMax={75} ticks={[]} x0={20} w={220} y={50} bh={28} qLabels={['Q0', 'Q1', 'Q2', 'Q3', 'Q4']} />
    {[
      ['A', 17.5],
      ['B', 30],
      ['C', 42.5],
      ['D', 60]
    ].map(([t, v]) => (
      <SText key={t as string} x={20 + (((v as number) - 5) / 70) * 220} y={92} t={t as string} s={10} b c={S_PURPLE} />
    ))}
  </SFig>
);

const FIG_BOX_SWIM = (
  <SFig w={260} h={110} className="w-full max-w-[300px] h-auto mx-auto" title="Úszóidők (s)">
    <SBoxPlot q={[50.59, 50.62, 50.7, 50.76, 50.81]} axMin={50.55} axMax={50.85} ticks={[50.55, 50.6, 50.65, 50.7, 50.75, 50.8, 50.85]} x0={20} w={220} y={48} bh={26} />
  </SFig>
);

const FIG_BOX_OUT = (
  <SFig w={260} h={110} className="w-full max-w-[300px] h-auto mx-auto">
    <SBoxPlot q={[4, 10, 14, 20, 28]} axMin={0} axMax={40} ticks={[0, 10, 20, 30, 40]} x0={20} w={220} y={48} bh={26} qLabels={[null, 'Q1 = 10', null, 'Q3 = 20', null]} />
  </SFig>
);

const FIG_STOCKS = (
  <SFig w={260} h={84} className="w-full max-w-[300px] h-auto mx-auto">
    <STable
      x={10}
      y={8}
      colW={[100, 70, 70]}
      rowH={18}
      s={8}
      rows={[
        ['', 'A részvény', 'B részvény'],
        ['átlagos árfolyam', '12 500 Ft', '1840 Ft'],
        ['átlagos hozam', '13%', '24%'],
        ['hozam szórása', '3%', '6%']
      ]}
    />
  </SFig>
);

const FIG_GRADES_PIE = (
  <SFig w={240} h={140} className="w-full max-w-[280px] h-auto mx-auto" title="24 fő, matematika">
    <SPie cx={72} cy={80} r={48} values={[60, 150, 45, 105]} labels={['60°', '150°', '45°', '?']} colors={[S_GREEN, S_BLUE, S_RED, S_TEAL]} />
    {[
      ['jeles (4 fő)', S_GREEN],
      ['jó', S_BLUE],
      ['elégséges', S_RED],
      ['közepes', S_TEAL]
    ].map(([t, c], i) => (
      <g key={t}>
        <rect x={140} y={50 + i * 18} width={9} height={9} fill={c} fillOpacity={0.8} />
        <SText x={154} y={58 + i * 18} t={t} s={8} a="start" />
      </g>
    ))}
  </SFig>
);

const FIG_GRADES = (
  <SFig w={250} h={100} className="w-full max-w-[290px] h-auto mx-auto">
    <STable
      x={10}
      y={8}
      colW={[60, 32, 32, 32, 32, 32]}
      rowH={18}
      s={8}
      rows={[
        ['', 'magyar', 'mat.', 'tört.', 'angol', 'földr.'],
        ['András', 3, 4, 4, 3, 5],
        ['Bea', 4, 5, 4, 5, 5],
        ['Cili', '?', '?', '?', '?', '?']
      ]}
    />
  </SFig>
);

const FIG_TARGET = (
  <SFig w={200} h={150} className="w-full max-w-[220px] h-auto mx-auto">
    <circle cx={100} cy={75} r={62} fill={S_BLUE} fillOpacity={0.1} stroke={S_INK} />
    <circle cx={100} cy={75} r={37} fill={S_AMBER} fillOpacity={0.18} stroke={S_INK} />
    <circle cx={100} cy={75} r={12} fill={S_RED} fillOpacity={0.35} stroke={S_INK} />
    <line x1={100} y1={75} x2={112} y2={75} stroke={S_INK} />
    <SText x={106} y={71} t="5" s={7} />
    <line x1={112} y1={75} x2={137} y2={75} stroke={S_INK} strokeDasharray="3 2" />
    <SText x={125} y={71} t="10" s={7} />
    <line x1={137} y1={75} x2={162} y2={75} stroke={S_INK} strokeDasharray="3 2" />
    <SText x={150} y={71} t="10" s={7} />
    <SText x={100} y={146} t="belső kör átmérője 10 cm, gyűrűk 10 cm szélesek" s={6.5} c={S_AXIS} />
  </SFig>
);

const FIG_PAPER = (
  <SFig w={220} h={150} className="w-full max-w-[250px] h-auto mx-auto">
    <rect x={20} y={20} width={180} height={120} fill="#ffffff" stroke={S_INK} />
    {[
      [20, 20, 0],
      [200, 20, 90],
      [200, 140, 180],
      [20, 140, 270]
    ].map(([x, y, r]) => {
      const R = 60;
      const a0 = (r * Math.PI) / 180;
      const a1 = ((r + 90) * Math.PI) / 180;
      const p0 = [x + R * Math.cos(a0), y + R * Math.sin(a0)];
      const p1 = [x + R * Math.cos(a1), y + R * Math.sin(a1)];
      return (
        <path
          key={`${x}-${y}`}
          d={`M ${x} ${y} L ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A ${R} ${R} 0 0 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Z`}
          fill={S_RED}
          fillOpacity={0.2}
          stroke={S_RED}
        />
      );
    })}
    <SText x={110} y={14} t="30 cm" s={8} />
    <SText x={10} y={84} t="20 cm" s={8} rot={-90} />
    <SText x={56} y={36} t="10 cm" s={7} c={S_RED} />
  </SFig>
);

const FIG_ROD = (
  <SFig w={260} h={70} className="w-full max-w-[300px] h-auto mx-auto">
    <rect x={20} y={26} width={220} height={12} fill="#fde68a" stroke={S_INK} />
    {[0, 20, 40, 60, 80, 100].map((v) => (
      <g key={v}>
        <line x1={20 + v * 2.2} y1={22} x2={20 + v * 2.2} y2={42} stroke={S_INK} />
        <SText x={20 + v * 2.2} y={54} t={`${v}`} s={7.5} c={S_AXIS} />
      </g>
    ))}
    <circle cx={64} cy={32} r={3.5} fill={S_RED} />
    <SText x={130} y={16} t="méterrúd (cm)" s={8} c={S_AXIS} />
  </SFig>
);

const FIG_VENN_SHOP = (
  <SFig w={240} h={160} className="w-full max-w-[270px] h-auto mx-auto">
    <SVenn onlyA="48%" both="12%" onlyB="13%" none="?" labelA="törzskártya" labelB="kupon" labelU="vásárlók" />
  </SFig>
);

const FIG_CLASSES_HIST = (
  <SFig w={250} h={150} className="w-full max-w-[290px] h-auto mx-auto" title="Gyakoriság osztályonként">
    <SBarChart
      x0={30}
      y0={124}
      w={200}
      h={90}
      gap={0}
      yMax={6}
      ticks={[0, 2, 4, 6]}
      showValues
      tickFmt={(v) => String(v)}
      color={S_TEAL}
      data={[
        { label: '1–25', value: 4 },
        { label: '26–50', value: 5 },
        { label: '51–75', value: 1 }
      ]}
    />
    <SText x={130} y={145} t="havi csapadék (mm)" s={7.5} c={S_AXIS} />
  </SFig>
);

const FIG_TOWN = (
  <SFig w={290} h={80} className="w-full max-w-[320px] h-auto mx-auto">
    <STable
      x={6}
      y={8}
      colW={[54, 54, 54, 54, 54]}
      rowH={20}
      s={7.5}
      rows={[
        ['', 'alapfok', 'szakisk.', 'érettségi', 'felsőfok'],
        ['nők', 1927, 1281, 2271, 1121],
        ['férfiak', 1610, 1963, 1845, 982]
      ]}
      highlight={[[2, 2]]}
    />
  </SFig>
);

const STAT_PROB_EXAM_12_QUESTIONS: QuizQuestion[] = [
  // =============================== 1. szint (30) ===============================
  Q(1, 1, 'Reprezentatív minta', 'Mikor nevezünk egy mintavételt reprezentatívnak?', [
    'ha a minta adatai megfelelő módon tükrözik a teljes adatsokaságot',
    'ha a minta nagyon nagy, pl. több millió válaszból áll',
    'ha csak önkéntes jelentkezőket kérdezünk meg',
    'ha a mintában minden csoportból ugyanannyi ember van'
  ], 'Reprezentatív a minta, ha jól tükrözi a sokaságot – pl. a csoportok létszámarányai a mintában közelítőleg ugyanazok, mint a sokaságban. A Literary Digest 2,4 millió válasza sem volt reprezentatív.'),
  Q(2, 1, 'Torzított minta', 'Miért tévedett nagyot a Literary Digest 1936-os közvélemény-kutatása 2,4 millió válasz ellenére?', [
    'mert a megkérdezettek (olvasók, autó- és telefontulajdonosok) a vagyonosabb rétegből kerültek ki',
    'mert túl kevés embert kérdeztek meg',
    'mert a válaszokat rosszul adták össze',
    'mert csak nőket kérdeztek meg'
  ], 'A minta erősen torzított volt: mindhárom csoportba a vagyonosabb amerikaiak tartoztak. A Gallup 50 000 fős reprezentatív mintával pontos becslést adott.'),
  Q(3, 1, 'Átlag', 'Dávid angoljegyei: 3; 3; 3; 5; 5. Mennyi a jegyek átlaga?', ['3,8', '4', '3', '3,5'], '(3 + 3 + 3 + 5 + 5) / 5 = 19 / 5 = 3,8.'),
  Q(4, 1, 'Medián', 'Mennyi a 3; 3; 3; 5; 5 jegyek mediánja?', ['3', '3,8', '4', '5'], 'A rendezett adatsor középső (3.) eleme: 3.'),
  Q(5, 1, 'Módusz', 'András érettségi jegyei: 3; 4; 4; 3; 5. Mi az adatsor módusza?', ['3 és 4 (két módusz)', '4', '3,8', 'nincs módusza'], 'A 3 és a 4 is kétszer szerepel, a 5 egyszer – mindkettő leggyakoribb érték.'),
  Q(6, 1, 'Terjedelem', 'Mennyi a 9; 2; 7; 4 adatsor terjedelme?', ['7', '9', '5,5', '5'], 'Terjedelem = legnagyobb − legkisebb = 9 − 2 = 7.'),
  Q(7, 1, 'Szórás', 'Mennyi a 2; 4; 6; 8 adatsor szórása?', ['√5 ≈ 2,24', '5', '2', '20'], 'x̄ = 5; eltérésnégyzetek: 9, 1, 1, 9 → átlaguk 5 = σ², σ = √5 ≈ 2,24.'),
  Q(8, 1, 'Dobozdiagram', 'Mit jelöl a dobozdiagramon a Q2 érték?', ['a mediánt', 'az alsó kvartilist', 'a felső kvartilist', 'az átlagot'], 'Q0 minimum, Q1 alsó kvartilis, Q2 medián, Q3 felső kvartilis, Q4 maximum.'),
  Q(9, 1, 'Félterjedelem', 'Mit nevez a tankönyv félterjedelemnek?', ['a felső és az alsó kvartilis különbségét (Q3 − Q1)', 'a terjedelem felét', 'a maximum és a medián különbségét', 'a medián és a minimum különbségét'], 'A maximum és a minimum különbsége a terjedelem, a felső és az alsó kvartilis különbsége a félterjedelem.'),
  Q(10, 1, 'Osztályközép', 'Mennyi a 125–129 darabos osztály osztályközepe?', ['127', '125', '129', '4'], 'Az osztályközép a két osztályhatár számtani közepe: (125 + 129) / 2 = 127.'),
  Q(11, 1, 'Eseménytér', 'Feldobunk egy 10, egy 20 és egy 50 forintost. Hány elemi eseményből áll az eseménytér?', ['8', '6', '3', '9'], 'Mindhárom érme kétféleképpen eshet: 2³ = 8 elemi esemény (FFF, FFI, …, III).'),
  Q(12, 1, 'Lehetetlen esemény', 'Három érme feldobásánál melyik a lehetetlen esemény?', [
    'a fejek és az írások száma egyenlő',
    'a fejek száma legfeljebb 3',
    'pontosan két fejet dobunk',
    'mindhárom érme írás'
  ], '3 = fejek + írások, ezért nem lehetnek egyenlők. (A „legfeljebb 3 fej” a biztos esemény.)'),
  Q(13, 1, 'Komplementer', 'P(A) = 0,3. Mennyi az A esemény komplementerének (Ā) valószínűsége?', ['0,7', '0,3', '1,3', '0'], 'P(Ā) = 1 − P(A) = 1 − 0,3 = 0,7.'),
  Q(14, 1, 'Események összege', 'Mit jelent az A + B esemény?', ['legalább az egyik esemény bekövetkezik', 'mindkét esemény bekövetkezik', 'egyik sem következik be', 'pontosan az egyik következik be'], 'Az A és B összege az az esemény, amely pontosan akkor következik be, ha A és B közül legalább az egyik bekövetkezik.'),
  Q(15, 1, 'Események szorzata', 'Mit jelent az A · B esemény?', ['A és B is bekövetkezik', 'A vagy B bekövetkezik', 'A bekövetkezik, B nem', 'egyik sem következik be'], 'Az A és B szorzata pontosan akkor következik be, ha A és B is bekövetkezik. Kizáró eseményeknél ez a lehetetlen esemény.'),
  Q(16, 1, 'Klasszikus valószínűség', 'Mennyi a valószínűsége, hogy egy szabályos kockával páros számot dobunk?', ['1/2', '1/3', '1/6', '2/3'], 'Kedvező: 2, 4, 6 (3 eset), összes: 6 → 3/6 = 1/2.'),
  Q(17, 1, 'Két kocka', 'Két szabályos kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok összege 5?', ['1/9', '1/12', '5/36', '1/6'], 'Kedvező: (1;4), (2;3), (3;2), (4;1) – 4 eset a 36-ból: 4/36 = 1/9.', FIG_DICE_SUM),
  Q(18, 1, 'Geometriai valószínűség', 'Egy szerencsekerék nyerő cikkének középponti szöge 90°. Mennyi a nyerés valószínűsége egy pörgetésnél?', ['1/4', '1/2', '1/90', '1/3'], 'Szerencsekeréknél a valószínűség: középponti szög / 360° = 90° / 360° = 1/4.', FIG_WHEEL_90),
  Q(19, 1, 'Céltábla', 'A céltábla belső körének átmérője 10 cm, a két körgyűrű egyaránt 10 cm széles. Mennyi a valószínűsége, hogy a lövés a belső körlapot találja el?', ['1/25', '1/5', '1/3', '1/9'], 'r = 5 cm, R = 25 cm: P = 5²π / (25²π) = 25 / 625 = 1/25. (1/5 a sugarak aránya.)', FIG_TARGET),
  Q(20, 1, 'Várható érték', 'Mennyi egy szabályos kockával dobott szám várható értéke?', ['3,5', '3', '6', '21'], 'E = (1 + 2 + … + 6) / 6 = 21 / 6 = 3,5.'),
  Q(21, 1, 'Kupon', 'A kuponok 90%-a 1000 Ft, 8%-a 2000 Ft, a többi 8000 Ft értékű. Mennyi egy kupon várható értéke?', ['1220 Ft', '3667 Ft', '1060 Ft', '1000 Ft'], 'E = 0,9 · 1000 + 0,08 · 2000 + 0,02 · 8000 = 900 + 160 + 160 = 1220 Ft. (3667 Ft az értékek egyszerű átlaga.)'),
  Q(22, 1, 'Szerencsekerék', 'Mennyi a nyeremény várható értéke az ábra 6 egyenlő cikkre osztott kerekén?', ['400 Ft', '480 Ft', '0 Ft', '1200 Ft'], 'E = (0 + 0 + 100 + 200 + 900 + 1200) / 6 = 2400 / 6 = 400 Ft.', FIG_VURSTLI),
  Q(23, 1, 'Mintavétel típusa', 'Milyen mintavétel a hatoslottó húzása (45 számból 6 különböző)?', ['visszatevés nélküli', 'visszatevéses', 'geometriai', 'egyik sem'], 'A kihúzott számokat nem teszik vissza: visszatevés nélküli mintavétel.'),
  Q(24, 1, 'Binomiális együttható', 'Mennyi (9 alatt 2)?', ['36', '72', '18', '81'], '(9 alatt 2) = 9 · 8 / 2 = 36. (72 a sorrendet is figyelembe venné.)'),
  Q(25, 1, 'Binomiális eloszlás', 'Egy területen 0,7 valószínűséggel csíp meg a pók. Mennyi a valószínűsége, hogy 5 alkalomból egyszer sem csíp meg?', ['0,3⁵ ≈ 0,0024', '0,7⁵ ≈ 0,168', '0,3', '5 · 0,3'], 'Minden alkalommal 0,3 a „nem csíp” valószínűsége, az alkalmak függetlenek: 0,3⁵ = 0,00243.'),
  Q(26, 1, 'Első húzás', 'A 20 szóbeli tételből 9 a XX. századhoz kapcsolódik. Mennyi a valószínűsége, hogy aki elsőnek húz, NEM XX. századi tételt húz?', ['0,55', '0,45', '9/11', '0,5'], '20 − 9 = 11 nem XX. századi tétel: 11/20 = 0,55.'),
  Q(27, 1, 'Kockázat', 'Két részvény átlagos hozama azonos. Melyik a kockázatosabb?', ['amelyiknek nagyobb a hozamainak szórása', 'amelyiknek nagyobb az árfolyama', 'amelyiknek kisebb a szórása', 'egyforma a kockázatuk'], 'Azonos átlagos hozamnál a nagyobb szórású részvény hozama változékonyabb, ezért kockázatosabb.'),
  Q(28, 1, 'Hozam', 'Egy részvény árfolyama 25 600 Ft-ról 26 624 Ft-ra nőtt. Mekkora a hozam?', ['4%', '1024%', '3,85%', '40%'], '26 624 / 25 600 = 1,04, vagyis az árfolyam 4%-kal nőtt. (3,85% az új árhoz viszonyítva jönne ki.)'),
  Q(29, 1, 'Kizáró események', 'A és B egymást kizáró események, P(A) = 0,2, P(B) = 0,3. Mennyi P(A + B)?', ['0,5', '0,06', '0,44', '0,1'], 'Kizáró eseményeknél P(A + B) = P(A) + P(B) = 0,5. (0,06 a szorzat lenne.)'),
  Q(30, 1, 'Független események', 'A és B független események, P(A) = 0,5, P(B) = 0,4. Mennyi P(A · B)?', ['0,2', '0,9', '0,45', '0,1'], 'Független eseményeknél P(A · B) = P(A) · P(B) = 0,5 · 0,4 = 0,2.'),

  // =============================== 2. szint (30) ===============================
  Q(31, 2, 'Súlyozott átlag', 'Eszter első félévi 9 jegyének átlaga 3, a második félévi 6 jegyéé 4,5. Mennyi az egész évi átlaga?', ['3,6', '3,75', '3,9', '4'], '(9 · 3 + 6 · 4,5) / 15 = (27 + 27) / 15 = 3,6. (3,75 a két átlag egyszerű átlaga.)'),
  Q(32, 2, 'Szórás', 'Mennyi András jegyeinek (3; 4; 4; 3; 5) szórása?', ['≈ 0,75', '0,56', '0,8', '≈ 1,22'], 'x̄ = 3,8; eltérések: −0,8; 0,2; 0,2; −0,8; 1,2 → négyzetösszeg 2,8, σ² = 0,56, σ ≈ 0,75. (0,56 a szórásnégyzet.)', FIG_GRADES),
  Q(33, 2, 'Szórás = 0', 'Cili jegyeinek szórása 0, átlaga András (3,8) és Bea (4,6) átlaga közé esik. Mik Cili jegyei?', ['mind az öt jegye 4', 'mind az öt jegye 5', '3; 4; 4; 5; 5', 'mind az öt jegye 3'], 'σ = 0 azt jelenti, hogy minden jegy egyenlő; az egyetlen egész szám 3,8 és 4,6 között a 4.', FIG_GRADES),
  Q(34, 2, 'Kördiagram', 'A 24 fős osztályban jeles osztályzatot 4 tanuló ért el. Hányan érettségiztek közepes eredménnyel?', ['7', '6', '8', '5'], '4 fő ↔ 60°, így 1 fő ↔ 15°. Közepes: 360° − 60° − 150° − 45° = 105° → 105 / 15 = 7 fő.', FIG_GRADES_PIE),
  Q(35, 2, 'Súlyozott átlag', 'Egy iskola 373 helyben lakó (átlag 3,11), 120 kollégista (4,12) és 89 bejáró (3,78) tanulójának mennyi a félévi átlaga?', ['≈ 3,42', '≈ 3,67', '≈ 3,50', '≈ 3,78'], '(373 · 3,11 + 120 · 4,12 + 89 · 3,78) / 582 ≈ 1990,85 / 582 ≈ 3,42. (3,67 a három csoportátlag egyszerű átlaga.)'),
  Q(36, 2, 'Kiugró adat', 'A dobozdiagramon Q1 = 10, Q3 = 20. Az alábbi adatok közül melyik számít kiugró adatnak?', ['36', '34', '0', '30'], 'Félterjedelem: 20 − 10 = 10, ennek másfélszerese 15. Kiugró, ami 20 + 15 = 35-nél nagyobb vagy 10 − 15 = −5-nél kisebb: csak a 36.', FIG_BOX_OUT),
  Q(37, 2, 'Osztályközepek', 'A havi csapadék gyakorisága: 1–25 mm: 4 hónap, 26–50 mm: 5 hónap, 51–75 mm: 1 hónap. Mennyi az átlag az osztályközepekkel számolva?', ['30,5 mm', '38 mm', '25 mm', '33 mm'], 'Osztályközepek: 13, 38, 63 mm. (4 · 13 + 5 · 38 + 1 · 63) / 10 = 305 / 10 = 30,5 mm.', FIG_CLASSES_HIST),
  Q(38, 2, 'Dobozdiagram', 'Egy nagy adatsokaság dobozdiagramja alapján az adatok körülbelül hány százaléka nagyobb vagy egyenlő az alsó kvartilisnél?', ['75%', '25%', '50%', '100%'], 'A Q0, Q1, Q2, Q3, Q4 értékek négy, egyenként kb. 25%-os részre osztják az adatokat; Q1 felett 3 rész van: 75%.', FIG_BOX_Q),
  Q(39, 2, 'Két kocka', 'Két kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok szorzata 4?', ['1/12', '1/9', '1/18', '1/6'], 'Kedvező: (1;4), (2;2), (4;1) – 3 eset: 3/36 = 1/12.'),
  Q(40, 2, 'Események szorzata', 'Két kocka: A = „az összeg 5”, B = „a szorzat 4”. Mennyi P(A · B)?', ['1/18', '1/108', '0', '7/36'], 'Mindkettő teljesül: (1;4) és (4;1) – 2 eset: 2/36 = 1/18. (1/108 = P(A) · P(B) lenne, de az események nem függetlenek.)', FIG_DICE_SUM),
  Q(41, 2, 'Események összege', 'Két kocka: A = „az összeg 5”, B = „a szorzat 4”. Mennyi P(A + B)?', ['5/36', '7/36', '1/18', '1/9'], 'P(A + B) = P(A) + P(B) − P(A · B) = (4 + 3 − 2) / 36 = 5/36. (7/36 kétszer számolná a közös eseteket.)', FIG_DICE_SUM),
  Q(42, 2, 'Legalább egy', 'Két kockával dobunk. Mennyi a valószínűsége, hogy legalább az egyik dobás hatos?', ['11/36', '1/3', '1/6', '10/36'], 'Komplementer: egyik sem hatos: 25/36, így 1 − 25/36 = 11/36. (1/3 a (6;6) kétszeri számolásából jönne.)'),
  Q(43, 2, 'Legalább egy', 'Két kockával dobunk. Mennyi a valószínűsége, hogy legalább az egyik dobott szám osztója az 5-nek (1 vagy 5)?', ['5/9', '1/3', '4/9', '2/3'], 'Egyik sem 1 vagy 5: (4/6)² = 16/36, így 1 − 16/36 = 20/36 = 5/9.'),
  Q(44, 2, 'Eseménytér', 'Három érmét dobunk fel. Mennyi a valószínűsége, hogy több fejet dobunk, mint írást?', ['1/2', '3/8', '1/8', '5/8'], 'Kedvező: FFF, FFI, FIF, IFF – 4 a 8-ból: 1/2.'),
  Q(45, 2, 'Események összege', 'Három érme (10, 20, 50 Ft). A: „a 10 forintoson írás”, B: „pontosan egy fej”. Mennyi P(A + B)?', ['5/8', '7/8', '1/4', '1/2'], 'A: IFF, IFI, IIF, III (4); B: FII, IFI, IIF (3); közös: IFI, IIF (2). P(A + B) = (4 + 3 − 2) / 8 = 5/8.'),
  Q(46, 2, 'Geometriai valószínűség', 'Az előző céltáblán (r = 5 cm, gyűrűk 10 cm) mennyi a valószínűsége, hogy a lövés a belső körgyűrűt (5 és 15 cm közé) találja?', ['8/25', '9/25', '2/5', '16/25'], '(15² − 5²)π / (25²π) = 200 / 625 = 8/25. (9/25 a teljes 15 cm-es körlap.)', FIG_TARGET),
  Q(47, 2, 'Geometriai valószínűség', 'Egy hangya véletlenszerű helyen van az 1 m-es méterrúdon. Mennyi a valószínűsége, hogy közelebb van a 20 cm-es ponthoz, mint a 100 cm-es véghez?', ['0,6', '0,2', '0,4', '0,5'], 'A 20 és 100 felezőpontja 60: a 60 cm-nél kisebb pontok vannak közelebb a 20-hoz. P = 60 / 100 = 0,6.', FIG_ROD),
  Q(48, 2, 'Várható érték', 'Mennyi a nyeremény várható értéke az ábrán látható kerék egy pörgetésénél?', ['≈ 1166,67 Ft', '2175 Ft', '≈ 1083,33 Ft', '1000 Ft'], 'E = (3000 · 60 + 200 · 150 + 5000 · 30 + 500 · 120) / 360 = 420 000 / 360 ≈ 1166,67 Ft. (2175 Ft az egyszerű átlag.)', FIG_WHEEL_TP),
  Q(49, 2, 'Szervező nyeresége', 'A kerék várható nyereménye 400 Ft, egy pörgetés 500 Ft. Mennyi a működtető várható nyeresége 100 pörgetésen?', ['10 000 Ft', '100 Ft', '40 000 Ft', '50 000 Ft'], 'Pörgetésenként 500 − 400 = 100 Ft, 100 pörgetésen 10 000 Ft.'),
  Q(50, 2, 'Várható hozam', 'Egy részvény hozama 0,5 valószínűséggel 22%, 0,4 valószínűséggel −12%, 0,1 valószínűséggel 8%. Mennyi a várható hozam?', ['7%', '6%', '18%', '6,4%'], 'E = 0,5 · 22 + 0,4 · (−12) + 0,1 · 8 = 11 − 4,8 + 0,8 = 7%.'),
  Q(51, 2, 'Legfeljebb egyszer', 'A pók 0,7 valószínűséggel csíp. Mennyi a valószínűsége, hogy 5 alkalomból legfeljebb egyszer csíp meg?', ['≈ 0,0308', '≈ 0,0284', '≈ 0,0024', '≈ 0,1631'], '0,3⁵ + 5 · 0,7 · 0,3⁴ = 0,00243 + 0,02835 ≈ 0,0308. (0,0284 csak a „pontosan egyszer”.)'),
  Q(52, 2, 'Hatoslottó', 'Hány 6-tal osztható szám van az 1; 2; …; 45 számok között?', ['7', '8', '6', '45/6'], '6, 12, 18, 24, 30, 36, 42 – 7 szám (48 > 45).'),
  Q(53, 2, 'Binomiális eloszlás', 'Egy dobozdiagram 4 osztályába (A, B, C, D) az adatok negyede-negyede esik. Visszatevéssel 12 adatot választunk. Mennyi a valószínűsége, hogy pontosan 3 kisebb az alsó kvartilisnél?', ['≈ 0,258', '0,25', '≈ 0,0156', '≈ 0,211'], 'P(A osztály) = 0,25: (12 alatt 3) · 0,25³ · 0,75⁹ = 220 · 0,015625 · 0,0751 ≈ 0,258.', FIG_BOX_Q),
  Q(54, 2, 'Mind kedvező', 'Ugyanebben a helyzetben mennyi a valószínűsége, hogy mind a 12 adat a B vagy a C osztályba esik?', ['0,5¹² ≈ 0,000244', '0,5', '0,25¹²', '12 · 0,5'], 'Egy adat 0,5 valószínűséggel esik B-be vagy C-be, a választások függetlenek: 0,5¹² ≈ 0,000244.', FIG_BOX_Q),
  Q(55, 2, 'Ötöslottó', 'Mennyi a valószínűsége az ötöslottóban a pontosan kéttalálatos szelvénynek?', ['≈ 0,0225', '≈ 0,0022', '≈ 0,0260', '≈ 0,2'], '(5 alatt 2) · (85 alatt 3) / (90 alatt 5) = 10 · 98 770 / 43 949 268 ≈ 0,0225.'),
  Q(56, 2, 'PIN-kód', 'A PIN-kód a 3; 6; 6; 9 számjegyekből áll valamilyen sorrendben. Mennyi a valószínűsége, hogy egy véletlen sorrend a helyes?', ['1/12', '1/24', '1/4', '1/6'], 'A két 6-os miatt 4! / 2! = 12 különböző sorrend van, így P = 1/12. (1/24 a két 6-os megkülönböztetéséből jönne.)'),
  Q(57, 2, 'Sorsjegy', '1000 sorsjegy nyereményének várható értéke darabonként 350 Ft, ára 500 Ft. Mennyi a kereskedő haszna, ha mindet eladja?', ['150 000 Ft', '350 000 Ft', '500 000 Ft', '150 Ft'], 'Bevétel 500 000 Ft, kifizetés 1000 · 350 = 350 000 Ft, haszon 150 000 Ft.'),
  Q(58, 2, 'Hozam', 'Egy részvény áprilisi árfolyama 26 624 Ft, a májusi hozama 8%. Mennyi a májusi árfolyam?', ['28 753,92 Ft', '26 632 Ft', '28 624 Ft', '24 494,08 Ft'], '26 624 · 1,08 = 28 753,92 Ft. (24 494,08 Ft 8%-os csökkenés lenne.)'),
  Q(59, 2, 'Relatív szórás', 'A részvény: átlagos hozam 13%, szórás 3%; B részvény: 24%, 6%. Melyik a kockázatosabb a relatív szórás alapján?', ['B (0,25 > ≈ 0,23)', 'A (≈ 0,23 > 0,25)', 'egyformák', 'A, mert drágább'], 'Eltérő átlagnál a relatív szórást nézzük: A: 3/13 ≈ 0,23; B: 6/24 = 0,25 → B a kockázatosabb. Az átlagos árfolyam nem számít.', FIG_STOCKS),
  Q(60, 2, 'Félrevezető diagram', 'Az eladások januárban 9114 kg, júniusban 9185 kg voltak, a diagram tengelye 9110-től indul. Valójában hány százalékos a növekedés?', ['≈ 0,8%', '≈ 7,8%', '71%', '≈ 80%'], '(9185 − 9114) / 9114 = 71 / 9114 ≈ 0,0078 ≈ 0,8%. A nem 0-tól induló tengely torzítja az arányokat.'),

  // =============================== 3. szint (30) ===============================
  Q(61, 3, 'Érettségi 2021', 'Dávid jegyei 3; 3; 3; 5; 5. János 5 jegyének mediánja 1-gyel nagyobb, átlaga 1-gyel kisebb, mint Dávidé. Mik János jegyei?', ['1; 1; 4; 4; 4', '1; 2; 4; 4; 3', '2; 2; 4; 4; 4', '1; 1; 4; 4; 5'], 'János: medián 4, átlag 2,8 → összeg 14. Rendezve a ≤ b ≤ 4 ≤ d ≤ e, d + e ≥ 8, így a + b ≤ 2 → a = b = 1, d = e = 4.'),
  Q(62, 3, 'Érettségi 2012', 'Dávid 5 érettségi jegyének mediánja 4, átlaga 4,4. Hányféleképpen kerülhetnek ezek a jegyek az 5 tárgy mellé?', ['10', '120', '5', '20'], 'Összeg 22, medián 4 → a jegyek 4; 4; 4; 5; 5. A két ötös helye (5 alatt 2) = 10-féle.'),
  Q(63, 3, 'Átlag javítása', 'Az iskolában 373 helyben lakó (3,11), 120 kollégista (4,12) és 89 bejáró (3,78). Mennyivel kellene a helyben lakók átlagának javulnia, hogy az iskolai átlag 3,5 legyen?', ['≈ 0,12', '≈ 0,39', '≈ 0,08', '≈ 0,23'], 'Kell: 3,5 · 582 = 2037. A többiek: 120 · 4,12 + 89 · 3,78 = 830,82. 2037 − 830,82 = 1206,18 → 1206,18 / 373 ≈ 3,234, javulás ≈ 0,12.'),
  Q(64, 3, 'Visszatevés nélkül', 'Az 582 diákból 120 kollégista. Véletlenszerűen kiválasztunk 6 tanulót. Mennyi a valószínűsége, hogy pontosan hárman kollégisták?', ['≈ 0,087', '≈ 0,206', '≈ 0,5', '≈ 0,0088'], '(120 alatt 3) · (462 alatt 3) / (582 alatt 6) ≈ 0,087. (0,206 ≈ 120 / 582 csak egy diák kollégista voltának valószínűsége.)'),
  Q(65, 3, 'PIN-kód', 'Teri néni háromszor próbálkozhat a 12 lehetséges sorrend egyikével (nem ismétel). Mennyi a valószínűsége, hogy három próbából eltalálja?', ['1/4', '1/12', '3/4', '1/1728'], 'Elsőre 1/12, csak másodikra (11/12) · (1/11) = 1/12, csak harmadikra is 1/12 → összesen 3/12 = 1/4.'),
  Q(66, 3, 'PIN-kód', 'Mennyi a valószínűsége, hogy Teri néni CSAK a második próbálkozásra találja el a kódot (a rossz sorrendet nem ismétli)?', ['1/12', '11/144', '1/11', '1/6'], '(11/12) · (1/11) = 1/12. (11/144 akkor lenne, ha a rossz sorrendet újra beüthetné.)'),
  Q(67, 3, 'Hozamok szórása', 'Egy részvény havi hozamai: 4%, 8%, −2%, −4%. Mennyi a hozamok szórása?', ['≈ 4,77%', '22,75%', '1,5%', '≈ 5,51%'], 'Átlag 1,5%; eltérések: 2,5; 6,5; −3,5; −5,5 → négyzetösszeg 91, σ² = 22,75, σ ≈ 4,77%. (22,75 a szórásnégyzet.)'),
  Q(68, 3, 'Biztosító', 'Minden ügyfél 0,005 valószínűséggel szenved el káreseményt. Mennyi a valószínűsége, hogy 1200 ügyfélből pontosan 3-nak lesz?', ['≈ 0,089', '≈ 0,134', '≈ 0,0025', '≈ 0,044'], '(1200 alatt 3) · 0,005³ · 0,995^{1197} ≈ 0,089. (0,134: pontosan 4; 0,044: pontosan 2.)'),
  Q(69, 3, 'Biztosító', 'Ugyanebben a modellben mennyi a valószínűsége, hogy legfeljebb 1 ügyfélnek lesz káreseménye?', ['≈ 0,017', '≈ 0,0025', '≈ 0,0145', '≈ 0,983'], '0,995^{1200} + 1200 · 0,005 · 0,995^{1199} ≈ 0,0025 + 0,0147 ≈ 0,017.'),
  Q(70, 3, 'Legfeljebb k', 'Dobozdiagram-modell: 12 adatot választunk visszatevéssel. Mennyi a valószínűsége, hogy legfeljebb 2 adat nagyobb vagy egyenlő a felső kvartilisnél?', ['≈ 0,391', '≈ 0,232', '≈ 0,649', '≈ 0,159'], 'p = 0,25: P(0) + P(1) + P(2) ≈ 0,032 + 0,127 + 0,232 ≈ 0,391.', FIG_BOX_Q),
  Q(71, 3, 'Hatoslottó', 'A hatoslottón 45 számból 6-ot húznak. Mennyi a valószínűsége, hogy pontosan kettő osztható 6-tal?', ['≈ 0,190', '≈ 0,170', '≈ 0,0026', '≈ 0,311'], '7 szám osztható 6-tal, 38 nem. (7 alatt 2) · (38 alatt 4) / (45 alatt 6) = 21 · 73 815 / 8 145 060 ≈ 0,190.'),
  Q(72, 3, 'Visszatevés nélkül', '20 tétel, ebből 9 XX. századi; 6 diák húz, a tételeket nem teszik vissza. Mennyi a valószínűsége, hogy pontosan 2 diák húz XX. századi tételt?', ['≈ 0,306', '≈ 0,278', '≈ 0,119', '≈ 0,426'], '(9 alatt 2) · (11 alatt 4) / (20 alatt 6) = 36 · 330 / 38 760 ≈ 0,306. (0,426 a legfeljebb 2.)'),
  Q(73, 3, 'Legfeljebb k', 'Ugyanebben a helyzetben mennyi a valószínűsége, hogy legfeljebb 2 diák húz XX. századi tételt?', ['≈ 0,426', '≈ 0,306', '≈ 0,574', '≈ 0,119'], '[(11 alatt 6) + 9 · (11 alatt 5) + 36 · (11 alatt 4)] / 38 760 = (462 + 4158 + 11 880) / 38 760 ≈ 0,426.'),
  Q(74, 3, 'Három kocka maximuma', 'Három (különböző) kockával dobunk, a katonai erő a legnagyobb dobott szám. Mennyi a valószínűsége, hogy a katonai erő 2?', ['7/216', '8/216', '1/36', '3/216'], 'Maximum legfeljebb 2: 2³ = 8 dobás; ebből le kell vonni a csupa 1-est: 8 − 1 = 7 → 7/216.'),
  Q(75, 3, 'Három kocka maximuma', 'Hány olyan dobás van három különböző kockával, amelynél a legnagyobb dobott szám 3?', ['19', '27', '9', '8'], 'Maximum legfeljebb 3: 27, legfeljebb 2: 8 → 27 − 8 = 19.'),
  Q(76, 3, 'Három kocka maximuma', 'Mennyi a valószínűsége, hogy három kockával dobva a legnagyobb dobott szám 4?', ['37/216', '64/216', '27/216', '1/6'], '4³ − 3³ = 64 − 27 = 37 kedvező dobás: 37/216 ≈ 0,171.'),
  Q(77, 3, 'Venn-diagram', 'A vásárlók 60%-ának van törzskártyája, 25%-uk használ kupont, 12%-uk mindkettőt. Mennyi a valószínűsége, hogy egy véletlen vásárló a két kedvezmény valamelyikét használja?', ['0,73', '0,85', '0,61', '0,97'], 'P(A + B) = 0,60 + 0,25 − 0,12 = 0,73.', FIG_VENN_SHOP),
  Q(78, 3, 'Venn-diagram', 'Az előző áruháznak kb. 10 000 vásárlója van. Hányan nem élnek egyik kedvezménnyel sem?', ['≈ 2700', '≈ 1500', '≈ 7300', '≈ 1200'], 'Egyik sem: 100% − 73% = 27% → 10 000 · 0,27 = 2700.', FIG_VENN_SHOP),
  Q(79, 3, 'Adatgyűjtés', 'Egy biztosító 5000 ügyfelének 72%-a rendszeresen vezet. Az 5000-ből 6% volt balesetben érintett, a nem rendszeres vezetők között ez 9%. Hány rendszeres vezető volt érintett?', ['174', '126', '300', '259'], 'Nem rendszeres: 1400 fő, ebből 9% = 126. Összesen 0,06 · 5000 = 300 baleset → rendszeres: 300 − 126 = 174.'),
  Q(80, 3, 'Osztályközepek', 'Osztályközepek és gyakoriságok: 10 (2), 20 (6), 30 (2). Mennyi a szórás az osztályközepekkel számolva?', ['≈ 6,32', '40', '≈ 8,16', '≈ 4,47'], 'Átlag 20; eltérésnégyzetek összege 2 · 100 + 6 · 0 + 2 · 100 = 400, σ² = 40, σ ≈ 6,32.'),
  Q(81, 3, 'Kiugró adat', 'Tamás úszóidőinek dobozdiagramján Q1 = 50,62 s és Q3 = 50,76 s. Melyik idő számítana kiugró adatnak?', ['50,40 s', '50,45 s', '50,90 s', '50,59 s'], 'Félterjedelem 0,14 s, másfélszerese 0,21 s. Kiugró: 50,62 − 0,21 = 50,41 s alatt vagy 50,76 + 0,21 = 50,97 s felett. Csak az 50,40 s.', FIG_BOX_SWIM),
  Q(82, 3, 'Diverzifikáció', 'Fele A, fele B részvény: a hozam 0,5 valószínűséggel 10%, 0,4-del 2%, 0,1-del 9% (várható érték 6,7%). Mennyi a szórás?', ['≈ 3,85%', '≈ 14,81%', '≈ 12,3%', '≈ 1,93%'], 'Eltérések 3,3; −4,7; 2,3 → 0,5 · 10,89 + 0,4 · 22,09 + 0,1 · 5,29 = 14,81, σ ≈ 3,85%. Kisebb, mint az A (≈ 16%) és a B (≈ 8,6%) kockázata.'),
  Q(83, 3, 'Geometriai valószínűség', 'Egy 20 cm × 30 cm-es papírlapon véletlenszerűen kiválasztunk egy pontot. Mennyi a valószínűsége, hogy minden csúcstól 10 cm-nél távolabb van?', ['≈ 0,476', '≈ 0,524', '≈ 0,869', '≈ 0,333'], 'A csúcsok 10 cm-es környezete 4 negyedkör = egy 10 cm sugarú kör: 100π ≈ 314,16 cm². P = 1 − 100π / 600 ≈ 0,476.', FIG_PAPER),
  Q(84, 3, 'Függetlenség', 'Két kockával dobunk. Melyik eseménypár független?', [
    '„az első dobás hatos” és „az összeg 7”',
    '„az összeg 5” és „a szorzat 4”',
    '„legalább az egyik hatos” és „az összeg 7”',
    '„az első dobás hatos” és „az összeg 12”'
  ], 'P(első 6) = 1/6, P(összeg 7) = 6/36 = 1/6, P(mindkettő) = P((6;1)) = 1/36 = 1/6 · 1/6 → függetlenek. A többinél P(A · B) ≠ P(A) · P(B).'),
  Q(85, 3, 'Binomiális eloszlás', 'Hat szabályos kockával dobunk. Mennyi a valószínűsége, hogy pontosan két dobás hatos?', ['≈ 0,201', '≈ 0,0080', '1/3', '≈ 0,0134'], '(6 alatt 2) · (1/6)² · (5/6)⁴ = 15 · 625 / 46 656 ≈ 0,201. (0,0080: pontosan négy négyes; 0,0134: a binomiális együttható nélkül.)'),
  Q(86, 3, 'Komplementer', 'Feldobunk 10 szabályos pénzérmét. Mennyi a valószínűsége, hogy van köztük legalább egy fej?', ['1023/1024 ≈ 0,999', '1/1024', '1/2', '10/1024'], 'Komplementer: mind írás: (1/2)^{10} = 1/1024. P = 1 − 1/1024 = 1023/1024.'),
  Q(87, 3, 'Binomiális eloszlás', 'Egy érmét 8-szor feldobunk. Mennyi a valószínűsége, hogy több fej lesz, mint írás?', ['93/256 ≈ 0,363', '1/2', '163/256 ≈ 0,637', '70/256 ≈ 0,273'], 'Legalább 5 fej: (56 + 28 + 8 + 1) / 256 = 93/256. (Nem 1/2, mert a 4–4 döntetlen 70/256 valószínűségű.)'),
  Q(88, 3, 'Selejt', 'Egy gép 0,015 valószínűséggel gyárt selejtet. Mennyi a valószínűsége, hogy a következő 140 termékből legfeljebb 1 selejtes?', ['≈ 0,377', '≈ 0,121', '≈ 0,256', '≈ 0,623'], '0,985^{140} + 140 · 0,015 · 0,985^{139} ≈ 0,121 + 0,256 ≈ 0,377.'),
  Q(89, 3, 'Reprezentatív minta', 'Egy város 13 000 lakosából 1963 szakiskolai végzettségű férfi. Hány ilyen személy kerüljön a 2000 fős reprezentatív mintába?', ['302', '196', '250', '1963'], 'A minta a lakosság 2000 / 13 000 = 2/13 része: 1963 · 2/13 ≈ 302 fő.', FIG_TOWN),
  Q(90, 3, 'Visszatevés nélkül', 'Az egyjegyű pozitív egészek (1–9) közül véletlenszerűen kiválasztunk hetet. Mennyi a valószínűsége, hogy pontosan négy páratlan?', ['5/9', '15/28', '5/36', '1/2'], '5 páratlan, 4 páros szám: (5 alatt 4) · (4 alatt 3) / (9 alatt 7) = 5 · 4 / 36 = 5/9. (15/28 a „6 számból pontosan 2 osztható 3-mal” esemény valószínűsége.)')
];

export const StatProbExam12Quiz: React.FC<{
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
      topicId="g12-stat-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="11. Gyakorlás, tudáspróba – Kvíz"
      subtitle="Fejezetzáró kvíz: 90 kérdés 3 nehézségi szinten – statisztikai jellemzők, diagramok, események, valószínűség, várható érték, mintavételek."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={STAT_PROB_EXAM_12_QUESTIONS}
      cheatSheets={[
        {
          title: 'Statisztika',
          items: [
            'x̄ = (x₁ + … + xₙ) / n; medián, módusz, terjedelem',
            'σ = √(eltérésnégyzetek átlaga); relatív szórás σ / x̄',
            'Dobozdiagram: Q0–Q4; félterjedelem Q3 − Q1',
            'Kiugró: Q3 + 1,5 · (Q3 − Q1) felett vagy Q1 − 1,5 · (Q3 − Q1) alatt'
          ]
        },
        {
          title: 'Események, valószínűség',
          items: [
            'P(A) = kedvező / összes; P(Ā) = 1 − P(A)',
            'P(A + B) = P(A) + P(B) − P(A · B)',
            'Független: P(A · B) = P(A) · P(B)',
            'Geometriai: kedvező terület / teljes; kerék: szög / 360°'
          ]
        },
        {
          title: 'Várható érték, mintavétel',
          items: [
            'E = x₁p₁ + … + xₙpₙ',
            'Visszatevés nélkül: (M alatt k)(N − M alatt n − k) / (N alatt n)',
            'Visszatevéssel: (n alatt k) p^k (1 − p)^{n − k}',
            'Egyik sem: (1 − p)^n; legalább egy: 1 − (1 − p)^n'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StatProbExam12Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <StatProbExam12Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default StatProbExam12Quiz;
