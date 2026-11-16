import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SphereAreaVolumeMatcher } from './SphereAreaVolumeMatcher';
import { SphereAreaVolumeSorter } from './SphereAreaVolumeSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
type FPt = [number, number];
const fR = (n: number) => Math.round(n * 10) / 10;
const F_INK = '#0f172a';
const F_BLUE = '#2563eb';
const F_RED = '#dc2626';
const F_UNK = '#dc2626';
const F_AUX = '#64748b';

const QFig: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x="120" y="15" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

const QText: React.FC<{ p: FPt; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  p,
  t,
  size = 11,
  color,
  anchor = 'middle'
}) => (
  <text
    x={fR(p[0])}
    y={fR(p[1])}
    fontSize={size}
    fontWeight="bold"
    textAnchor={anchor}
    dominantBaseline="middle"
    fill={t.includes('?') ? F_UNK : color ?? F_INK}
  >
    {t}
  </text>
);

const QEll: React.FC<{ cx: number; cy: number; rx: number; ry: number; color?: string }> = ({ cx, cy, rx, ry, color = F_AUX }) => (
  <g>
    <path d={`M ${fR(cx - rx)} ${cy} A ${fR(rx)} ${fR(ry)} 0 0 1 ${fR(cx + rx)} ${cy}`} fill="none" stroke={color} strokeWidth="1.1" strokeDasharray="4 3" />
    <path d={`M ${fR(cx - rx)} ${cy} A ${fR(rx)} ${fR(ry)} 0 0 0 ${fR(cx + rx)} ${cy}`} fill="none" stroke={color} strokeWidth="1.2" />
  </g>
);

/** Gömb sugár- vagy átmérő-jelöléssel; a jobb oldalon kérdéses mennyiség. */
const BallFig: React.FC<{ lbl: string; diameter?: boolean; ask?: string; title?: string; color?: string }> = ({ lbl, diameter, ask, title, color = F_BLUE }) => (
  <QFig title={title}>
    <circle cx="85" cy="84" r="54" fill="rgba(37,99,235,0.08)" stroke={color} strokeWidth="1.8" />
    <QEll cx={85} cy={84} rx={54} ry={15} />
    <line x1={diameter ? 31 : 85} y1="84" x2="139" y2="84" stroke={F_RED} strokeWidth="1.8" />
    <circle cx="85" cy="84" r="2" fill={F_INK} />
    <QText p={[diameter ? 85 : 112, 74]} t={lbl} size={10.5} color={F_RED} />
    {ask && <QText p={[192, 84]} t={ask} size={11} />}
  </QFig>
);

const FIG_SHOT = (
  <QFig title="Ólomgolyó → sörétek">
    <circle cx="70" cy="82" r="50" fill="rgba(100,116,139,0.25)" stroke="#334155" strokeWidth="1.8" />
    <line x1="70" y1="82" x2="120" y2="82" stroke={F_RED} strokeWidth="1.6" />
    <QText p={[95, 74]} t="2 cm" size={10} color={F_RED} />
    {Array.from({ length: 20 }, (_, i) => (
      <circle key={i} cx={145 + (i % 5) * 16} cy={50 + Math.floor(i / 5) * 16} r="3" fill="rgba(100,116,139,0.35)" stroke="#334155" strokeWidth="0.8" />
    ))}
    <QText p={[177, 125]} t="r = 1 mm, db = ?" size={9.5} />
  </QFig>
);

const FIG_RIND = (r: number, R: number, thick: string) => (
  <QFig title={`${2 * R} cm átmérő, ${thick} héj`}>
    <circle cx="80" cy="84" r="58" fill="#4ade80" stroke="#15803d" strokeWidth="1.8" />
    <circle cx="80" cy="84" r={(58 * r) / R} fill="#fca5a5" stroke={F_RED} strokeWidth="1.2" />
    <line x1="80" y1="84" x2="138" y2="84" stroke={F_INK} strokeWidth="1.2" strokeDasharray="3 2" />
    <QText p={[109, 76]} t={`${R}`} size={10} />
    <QText p={[190, 70]} t="ehető rész" size={10} />
    <QText p={[190, 88]} t="= ? %" size={11} />
  </QFig>
);

const FIG_BOILER = (ask: string) => (
  <QFig title="Félgömb végű kazán">
    {(() => {
      const r = 34;
      const x0 = 90;
      const x1 = 150;
      const cy = 78;
      return (
        <g>
          <path
            d={`M ${x0} ${cy - r} L ${x1} ${cy - r} A ${r} ${r} 0 0 1 ${x1} ${cy + r} L ${x0} ${cy + r} A ${r} ${r} 0 0 1 ${x0} ${cy - r} Z`}
            fill="rgba(37,99,235,0.1)"
            stroke={F_BLUE}
            strokeWidth="1.6"
          />
          <path d={`M ${x0} ${cy - r} A 9 ${r} 0 0 0 ${x0} ${cy + r}`} fill="none" stroke={F_BLUE} strokeWidth="1.1" />
          <path d={`M ${x0} ${cy - r} A 9 ${r} 0 0 1 ${x0} ${cy + r}`} fill="none" stroke={F_BLUE} strokeWidth="1" strokeDasharray="3 2" />
          <path d={`M ${x1} ${cy - r} A 9 ${r} 0 0 0 ${x1} ${cy + r}`} fill="none" stroke={F_BLUE} strokeWidth="1.1" />
          <path d={`M ${x1} ${cy - r} A 9 ${r} 0 0 1 ${x1} ${cy + r}`} fill="none" stroke={F_BLUE} strokeWidth="1" strokeDasharray="3 2" />
          <line x1={x0} y1={cy + r + 10} x2={x1} y2={cy + r + 10} stroke={F_INK} strokeWidth="1" />
          <QText p={[120, cy + r + 20]} t="3,5 m" size={9.5} />
          <line x1={x1 + r + 10} y1={cy - r} x2={x1 + r + 10} y2={cy + r} stroke={F_INK} strokeWidth="1" />
          <QText p={[x1 + r + 26, cy]} t="4 m" size={9.5} />
          <QText p={[120, cy]} t={ask} size={11} />
        </g>
      );
    })()}
  </QFig>
);

const FIG_ARCH = (
  <QFig title="Gömb a köré írt hengerben">
    <line x1="70" y1="25" x2="70" y2="125" stroke={F_BLUE} strokeWidth="1.6" />
    <line x1="170" y1="25" x2="170" y2="125" stroke={F_BLUE} strokeWidth="1.6" />
    <ellipse cx="120" cy="25" rx="50" ry="12" fill="rgba(37,99,235,0.08)" stroke={F_BLUE} strokeWidth="1.5" />
    <QEll cx={120} cy={125} rx={50} ry={12} color={F_BLUE} />
    <circle cx="120" cy="75" r="50" fill="rgba(234,88,12,0.12)" stroke="#ea580c" strokeWidth="1.6" />
    <line x1="120" y1="75" x2="170" y2="75" stroke={F_RED} strokeWidth="1.4" />
    <circle cx="120" cy="75" r="2" fill={F_INK} />
    <QText p={[145, 68]} t="r" size={10} color={F_RED} />
    <QText p={[205, 75]} t="V : V = ?" size={10} />
  </QFig>
);

const FIG_MUG = (
  <QFig title="Bögre 1,5 dl vízzel + vasgolyó">
    <path d="M 70 30 L 70 130 L 150 130 L 150 30" fill="none" stroke={F_INK} strokeWidth="1.8" />
    <rect x="71" y="88" width="78" height="41" fill="rgba(59,130,246,0.25)" />
    <line x1="71" y1="80" x2="149" y2="80" stroke={F_BLUE} strokeWidth="1.2" strokeDasharray="3 2" />
    <circle cx="110" cy="115" r="14" fill="rgba(100,116,139,0.6)" stroke="#334155" strokeWidth="1.2" />
    <line x1="70" y1="140" x2="150" y2="140" stroke={F_INK} strokeWidth="1" />
    <QText p={[110, 146]} t="7,2 cm" size={9} />
    <QText p={[110, 115]} t="3 cm" size={8.5} color="#ffffff" />
    <QText p={[190, 84]} t="Δh = ?" size={11} />
  </QFig>
);

const FIG_BUBBLES = (
  <QFig title="10 buborék → 1 nagy buborék">
    {Array.from({ length: 10 }, (_, i) => (
      <circle key={i} cx={30 + (i % 5) * 20} cy={60 + Math.floor(i / 5) * 22} r="9" fill="rgba(56,189,248,0.2)" stroke="#0284c7" strokeWidth="1.2" />
    ))}
    <QText p={[70, 120]} t="d = 30 mm" size={9.5} />
    <text x="128" y="74" fontSize="16" fill={F_AUX}>→</text>
    <circle cx="185" cy="72" r="32" fill="rgba(56,189,248,0.15)" stroke="#0284c7" strokeWidth="1.5" />
    <QText p={[185, 72]} t="A = ?" size={11} />
  </QFig>
);

const FIG_CANDLES = (
  <QFig title="Két gömbgyertyából egy">
    <circle cx="45" cy="80" r="32" fill="rgba(250,204,21,0.25)" stroke="#ca8a04" strokeWidth="1.5" />
    <circle cx="110" cy="88" r="24" fill="rgba(250,204,21,0.25)" stroke="#ca8a04" strokeWidth="1.5" />
    <QText p={[45, 80]} t="4 cm" size={10} />
    <QText p={[110, 88]} t="3 cm" size={10} />
    <text x="140" y="92" fontSize="16" fill={F_AUX}>→</text>
    <circle cx="195" cy="82" r="36" fill="rgba(250,204,21,0.25)" stroke="#ca8a04" strokeWidth="1.5" />
    <QText p={[195, 82]} t="r = ?" size={11} />
  </QFig>
);

const SPHERE_AREA_VOLUME_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sav-q1',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik képlet adja meg az r sugarú gömb felszínét?',
    options: ['A = 4r²π', 'A = r²π', 'A = 4r³π / 3', 'A = 2r²π'],
    correctAnswer: 0,
    explanation: 'A gömb felszíne négy főkör területe: A = 4r²π. (r²π egy főkör területe, 4r³π / 3 a térfogat.)'
  },
  {
    id: 'sav-q2',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik képlet adja meg az r sugarú gömb térfogatát?',
    options: ['V = 4r³π / 3', 'V = 4r²π', 'V = r³π', 'V = 4r³π'],
    correctAnswer: 0,
    explanation: 'Az r sugarú gömb térfogata V = 4r³π / 3 (a sugár köbével arányos).'
  },
  {
    id: 'sav-q3',
    questionTypeBadge: 'Gömb felszíne',
    figure: <BallFig lbl="r = 3 cm" ask="A = ?" />,
    level: 1,
    question: 'Mekkora a 3 cm sugarú gömb felszíne?',
    options: ['36π ≈ 113,1 cm²', '9π ≈ 28,3 cm²', '12π ≈ 37,7 cm²', '108π ≈ 339,3 cm²'],
    correctAnswer: 0,
    explanation: 'A = 4 · 3² · π = 36π ≈ 113,1 cm².'
  },
  {
    id: 'sav-q4',
    questionTypeBadge: 'Gömb térfogata',
    figure: <BallFig lbl="r = 6 cm" ask="V = ?" />,
    level: 1,
    question: 'Mekkora a 6 cm sugarú gömb térfogata?',
    options: ['288π ≈ 904,8 cm³', '144π ≈ 452,4 cm³', '216π ≈ 678,6 cm³', '48π ≈ 150,8 cm³'],
    correctAnswer: 0,
    explanation: 'V = 4 · 6³ · π / 3 = 4 · 216 · π / 3 = 288π ≈ 904,8 cm³. (144π a 4r²π hibás képletből jönne.)'
  },
  {
    id: 'sav-q5',
    questionTypeBadge: 'Átmérőből',
    figure: <BallFig lbl="d = 10 cm" diameter ask="A = ?" />,
    level: 1,
    question: 'Mekkora a 10 cm átmérőjű gömb felszíne?',
    options: ['100π ≈ 314,2 cm²', '400π ≈ 1256,6 cm²', '25π ≈ 78,5 cm²', '500π / 3 ≈ 523,6 cm²'],
    correctAnswer: 0,
    explanation: 'r = 5 cm, A = 4 · 25 · π = 100π ≈ 314,2 cm². (400π az átmérővel mint sugárral számolt hibás érték.)'
  },
  {
    id: 'sav-q6',
    questionTypeBadge: 'Dinnye tömege',
    figure: <BallFig lbl="d = 20 cm" diameter ask="m ≈ ?" title="Gömb alakú dinnye" color="#16a34a" />,
    level: 1,
    question: 'Körülbelül mekkora egy 20 cm átmérőjű, gömb alakú dinnye tömege, ha sűrűsége a vízével egyezik?',
    options: ['≈ 4,2 kg', '≈ 33,5 kg', '≈ 1,3 kg', '≈ 8 kg'],
    correctAnswer: 0,
    explanation: 'r = 10 cm: V = 4 · 1000 · π / 3 ≈ 4189 cm³ ≈ 4,2 dm³, ami ≈ 4,2 liter „víz”, azaz ≈ 4,2 kg. (33,5 kg a 20 cm-es „sugárral” jönne ki.)'
  },
  {
    id: 'sav-q7',
    questionTypeBadge: 'Térfogat becslése',
    level: 1,
    question: 'Körülbelül mekkora egy 8 kg tömegű dinnye térfogata, ha sűrűsége közelítőleg a víz sűrűsége?',
    options: ['8 dm³', '8 cm³', '0,8 dm³', '80 dm³'],
    correctAnswer: 0,
    explanation: '1 dm³ = 1 liter víz tömege 1 kg, ezért 8 kg dinnye térfogata ≈ 8 dm³.'
  },
  {
    id: 'sav-q8',
    questionTypeBadge: 'Visszafelé',
    level: 1,
    question: 'Egy gömb felszíne 64π cm². Mekkora a sugara?',
    options: ['4 cm', '8 cm', '16 cm', '2 cm'],
    correctAnswer: 0,
    explanation: '4r²π = 64π ⇒ r² = 16 ⇒ r = 4 cm. (8 cm a 4-gyel való osztás elhagyásából jönne.)'
  },
  {
    id: 'sav-q9',
    questionTypeBadge: 'Visszafelé',
    level: 1,
    question: 'Egy gömb térfogata 36π cm³. Mekkora a sugara?',
    options: ['3 cm', '9 cm', '6 cm', '√27 ≈ 5,2 cm'],
    correctAnswer: 0,
    explanation: '4r³π / 3 = 36π ⇒ r³ = 27 ⇒ r = 3 cm.'
  },
  {
    id: 'sav-q10',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Miért nem lehet a gömb felszínét hálóból (kiterítésből) kiszámítani, mint a hasábét vagy a hengerét?',
    options: [
      'Mert a gömbfelület nem teríthető ki síkba',
      'Mert a gömbnek nincs felszíne',
      'Mert a gömbnek végtelen sok lapja van, de ezek mind négyzetek',
      'Mert a gömb felszíne a sugártól nem függ'
    ],
    correctAnswer: 0,
    explanation: 'A gömbfelület nem teríthető ki síkba; a képletét felsőbb matematikai módszerekkel igazolják.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'sav-q11',
    questionTypeBadge: 'Dinnye átmérője',
    level: 2,
    question: 'Körülbelül mekkora egy 8 kg tömegű, gömb alakú dinnye átmérője? (Sűrűsége ≈ 1 kg/dm³.)',
    options: ['≈ 25 cm', '≈ 12,4 cm', '≈ 40 cm', '≈ 32 cm'],
    correctAnswer: 0,
    explanation: '4r³π / 3 = 8 dm³ ⇒ r³ = 6 / π ≈ 1,91 ⇒ r ≈ ∛1,91 ≈ 1,24 dm. Az átmérő ≈ 2,48 dm ≈ 25 cm. (12,4 cm a sugár.)',
    breakdown: ['V ≈ 8 dm³', 'r³ = 3 · 8 / (4π) = 6 / π ≈ 1,91', 'r ≈ 1,24 dm', 'd ≈ 2,5 dm = 25 cm']
  },
  {
    id: 'sav-q12',
    questionTypeBadge: 'Sörétek',
    figure: FIG_SHOT,
    level: 2,
    question: 'Egy 2 cm sugarú ólomgolyóból 1 mm sugarú söréteket öntenek. Hány darab sörét készíthető?',
    options: ['8000', '400', '20', '800'],
    correctAnswer: 0,
    explanation: '2 cm = 20 mm. A térfogatok aránya (20 / 1)³ = 8000, tehát 8000 sörét készíthető. (400 a felszínek aránya.)'
  },
  {
    id: 'sav-q13',
    questionTypeBadge: 'Sörétek',
    level: 2,
    question: 'A 2 cm sugarú golyóból öntött 8000 darab 1 mm sugarú sörét együttes felszíne hányszorosa a golyó felszínének?',
    options: ['20-szorosa', '1-szerese (ugyanannyi)', '400-szorosa', '8000-szerese'],
    correctAnswer: 0,
    explanation: '8000 · 4 · 1² · π : (4 · 20² · π) = 8000 : 400 = 20. Az aprózással a felszín jelentősen nő, a térfogat változatlan.'
  },
  {
    id: 'sav-q14',
    questionTypeBadge: 'Ehető rész',
    figure: FIG_RIND(11, 12, '1 cm'),
    level: 2,
    question: 'Egy 24 cm átmérőjű, gömb alakú dinnye héja 1 cm vastag. A térfogat hány százaléka az ehető belső rész?',
    options: ['≈ 77,0 %', '≈ 91,7 %', '≈ 84,0 %', '≈ 57,9 %'],
    correctAnswer: 0,
    explanation: 'A belső rész sugara 11 cm: (11 / 12)³ ≈ 0,770, azaz ≈ 77,0 %. (91,7 % a sugarak, 84,0 % a felszínek aránya; 57,9 % a 2 cm-es héjhoz tartozik.)'
  },
  {
    id: 'sav-q15',
    questionTypeBadge: 'Ehető rész',
    figure: FIG_RIND(10, 12, '2 cm'),
    level: 2,
    question: 'Egy 24 cm átmérőjű, gömb alakú dinnye héja 2 cm vastag. A térfogat hány százaléka az ehető belső rész?',
    options: ['≈ 57,9 %', '≈ 83,3 %', '≈ 69,4 %', '≈ 77,0 %'],
    correctAnswer: 0,
    explanation: 'A belső sugár 10 cm: (10 / 12)³ ≈ 0,579 ⇒ ≈ 57,9 %. Látványos: 1 cm-rel vastagabb héj kb. 19 százalékponttal kevesebb ehető részt jelent.'
  },
  {
    id: 'sav-q16',
    questionTypeBadge: 'A Föld felszíne',
    level: 2,
    question: 'Mekkora a Föld felszíne, ha 6371 km sugarú gömbnek tekintjük?',
    options: ['≈ 5,1 · 10⁸ km²', '≈ 1,3 · 10⁸ km²', '≈ 1,08 · 10¹² km²', '≈ 4,0 · 10⁴ km²'],
    correctAnswer: 0,
    explanation: 'A = 4 · 6371² · π ≈ 510 000 000 km² ≈ 5,1 · 10⁸ km². (1,3 · 10⁸ csak egy főkör, 1,08 · 10¹² a térfogat km³-ben, 4 · 10⁴ az Egyenlítő hossza.)'
  },
  {
    id: 'sav-q17',
    questionTypeBadge: 'A Föld felszíne',
    level: 2,
    question: 'Földünk felületének kb. 70,8%-át víz borítja. Hány km²-t borít víz (R = 6371 km)?',
    options: ['≈ 3,6 · 10⁸ km²', '≈ 5,1 · 10⁸ km²', '≈ 1,5 · 10⁸ km²', '≈ 7,2 · 10⁸ km²'],
    correctAnswer: 0,
    explanation: '0,708 · 4 · 6371² · π ≈ 0,708 · 5,10 · 10⁸ ≈ 3,61 · 10⁸ km². (1,5 · 10⁸ a szárazföld.)'
  },
  {
    id: 'sav-q18',
    questionTypeBadge: 'Szappanbuborék',
    level: 2,
    question: 'Mekkora 10 darab, egyenként 30 mm átmérőjű gömb alakú szappanbuborék együttes felszíne?',
    options: ['≈ 282,7 cm²', '≈ 1131 cm²', '≈ 28,3 cm²', '≈ 1414 cm²'],
    correctAnswer: 0,
    explanation: 'r = 15 mm: egy buborék 4 · 225 · π = 900π ≈ 2827 mm², tízé ≈ 28 274 mm² ≈ 282,7 cm². (1131 cm² az átmérővel számolva; 1 cm² = 100 mm².)'
  },
  {
    id: 'sav-q19',
    questionTypeBadge: 'Szappanbuborék',
    figure: FIG_BUBBLES,
    level: 2,
    question: 'A tíz 30 mm átmérőjű buborék egyetlen buborékká egyesül, amelynek térfogata a tíz térfogatának összege. Mekkora a nagy buborék felszíne?',
    options: ['≈ 131,2 cm²', '≈ 282,7 cm²', '≈ 28,3 cm²', '≈ 609 cm²'],
    correctAnswer: 0,
    explanation: 'R³ = 10 · 15³ ⇒ R = 15 · ∛10 ≈ 32,3 mm. A = 4R²π ≈ 13 124 mm² ≈ 131,2 cm². Egyesüléskor a felszín kisebb lesz (∛10² ≈ 4,64-szeres egy kicsihez képest, nem 10-szeres).'
  },
  {
    id: 'sav-q20',
    questionTypeBadge: 'Összetett test',
    figure: FIG_BOILER('A = ?'),
    level: 2,
    question: 'Egy kazán alakja félgömb végű henger: a henger magassága 3,5 m, alapkörének átmérője 4 m. Mekkora a kazántest felszíne?',
    options: ['30π ≈ 94,2 m²', '38π ≈ 119,4 m²', '22π ≈ 69,1 m²', '46π ≈ 144,5 m²'],
    correctAnswer: 0,
    explanation: 'A két félgömb együtt egy 2 m sugarú gömb: 4 · 4 · π = 16π. A palást 2 · 2 · π · 3,5 = 14π. Összesen 30π ≈ 94,2 m². (38π-ben hibásan a henger alaplapjai is benne vannak.)'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'sav-q21',
    questionTypeBadge: 'Összetett test',
    figure: FIG_BOILER('V = ?'),
    level: 3,
    question: 'Mekkora az előző kazán (henger: M = 3,5 m, d = 4 m, két félgömb véggel) térfogata?',
    options: ['74π / 3 ≈ 77,5 m³', '≈ 60,7 m³', '14π ≈ 44,0 m³', '≈ 209,4 m³'],
    correctAnswer: 0,
    explanation: 'V = r²π · M + 4r³π / 3 = 4π · 3,5 + 32π / 3 = 14π + 32π / 3 = 74π / 3 ≈ 77,5 m³. (60,7 m³ ha csak egy félgömböt számolunk; 209,4 m³ ha a henger sugarának az átmérőt vesszük.)'
  },
  {
    id: 'sav-q22',
    questionTypeBadge: 'Összeöntés',
    figure: FIG_CANDLES,
    level: 3,
    question: 'Egy 4 cm és egy 3 cm sugarú gömbgyertyából egyetlen gömbgyertyát öntenek. Mekkora lesz a sugara?',
    options: ['∛91 ≈ 4,50 cm', '7 cm', '5 cm', '∛7 ≈ 1,91 cm'],
    correctAnswer: 0,
    explanation: 'A térfogatok összeadódnak: 4r³π / 3 = 4 · 4³π / 3 + 4 · 3³π / 3 ⇒ r³ = 64 + 27 = 91 ⇒ r ≈ 4,50 cm. (5 cm a „Pitagorasz” r² = 16 + 9 hibás gondolatából jönne.)'
  },
  {
    id: 'sav-q23',
    questionTypeBadge: 'Összeöntés',
    level: 3,
    question: 'A két eredeti gyertya (4 cm és 3 cm sugarú) együttes felszíne hány százaléka az új, ∛91 cm sugarú gyertya felszínének?',
    options: ['≈ 123,6 %', '100 %', '≈ 80,9 %', '≈ 138,9 %'],
    correctAnswer: 0,
    explanation: '(4² + 3²) / (∛91)² = 25 / 20,23 ≈ 1,236 ⇒ ≈ 123,6 %. Összeöntéskor a térfogat megmarad, a felszín csökken.'
  },
  {
    id: 'sav-q24',
    questionTypeBadge: 'Bolygók',
    level: 3,
    question: 'A Mars térfogata a Földének kb. 15,1%-a. Hányszor annyi ideig tartana a Mars felszínének feltérképezése, ha az idő a felszínnel arányos (mindkettő gömb)?',
    options: ['≈ 0,28-szor annyi', '≈ 0,151-szer annyi', '≈ 0,53-szor annyi', '≈ 0,39-szer annyi'],
    correctAnswer: 0,
    explanation: 'A sugarak aránya ∛0,151 ≈ 0,532, a felszínek aránya ennek négyzete: 0,151^{2/3} ≈ 0,284. Tehát kb. 0,28-szor annyi idő kell.',
    breakdown: ['V-arány = k³ = 0,151', 'k = ∛0,151 ≈ 0,532', 'A-arány = k² ≈ 0,284']
  },
  {
    id: 'sav-q25',
    questionTypeBadge: 'Energiatartalom',
    level: 3,
    question: 'Máté megette egy 20 cm átmérőjű gömb alakú dinnye felét. A héj 1 cm vastag, sűrűség 1 g/cm³, az energiatartalom 30 kcal / 100 g. Kb. hány kilokalóriát vitt be?',
    options: ['≈ 458 kcal', '≈ 628 kcal', '≈ 916 kcal', '≈ 322 kcal'],
    correctAnswer: 0,
    explanation: 'Belső sugár 9 cm: a fél ehető rész 2 · 9³ · π / 3 ≈ 1527 cm³ ≈ 1527 g, energiája 15,27 · 30 ≈ 458 kcal. (628 kcal a héjjal együtt, 916 kcal az egész dinnye belseje, 322 kcal a 2 cm-es héjnál.)'
  },
  {
    id: 'sav-q26',
    questionTypeBadge: 'Rekorddinnye',
    level: 3,
    question: 'A 2012-es év legnehezebb dinnyéje 53 kg-os volt. Gömb alakúnak és vízsűrűségűnek tekintve kb. mekkora volt az átmérője?',
    options: ['≈ 46,6 cm', '≈ 23,3 cm', '≈ 32,3 cm', '≈ 37,6 cm'],
    correctAnswer: 0,
    explanation: 'V ≈ 53 dm³: r³ = 3 · 53 / (4π) ≈ 12,65 ⇒ r ≈ 2,33 dm, az átmérő ≈ 4,66 dm ≈ 46,6 cm. (23,3 cm a sugár; 32,3 cm a 3-as szorzó elhagyásából jönne.)'
  },
  {
    id: 'sav-q27',
    questionTypeBadge: 'Arkhimédész',
    figure: FIG_ARCH,
    level: 3,
    question: 'Arkhimédész szerint hogyan aránylik a gömb térfogata a köré írt egyenes körhenger (r sugár, 2r magasság) térfogatához?',
    options: ['2 : 3', '1 : 2', '3 : 4', '1 : 3'],
    correctAnswer: 0,
    explanation: 'V_henger = r²π · 2r = 2r³π, V_gömb = 4r³π / 3 = (2/3) · 2r³π. A gömb felszíne (4r²π) pedig a henger palástjával (2rπ · 2r) egyenlő.'
  },
  {
    id: 'sav-q28',
    questionTypeBadge: 'Vízszint emelkedése',
    figure: FIG_MUG,
    level: 3,
    question: 'Egy 7,2 cm belső átmérőjű henger alakú bögrében víz van. Mennyivel emelkedik a vízszint, ha egy 3 cm átmérőjű vasgolyót teszünk bele (a golyót ellepi a víz)?',
    options: ['≈ 3,5 mm', '≈ 2,8 cm', '≈ 0,9 mm', '≈ 1,4 cm'],
    correctAnswer: 0,
    explanation: 'V_golyó = 4 · 1,5³ · π / 3 ≈ 14,14 cm³. A bögre alapterülete 3,6² · π ≈ 40,72 cm². Emelkedés: 14,14 / 40,72 ≈ 0,347 cm ≈ 3,5 mm. (2,8 cm a golyó átmérőjét sugárnak véve jönne ki.)'
  },
  {
    id: 'sav-q29',
    questionTypeBadge: 'Ehető rész',
    level: 3,
    question: 'Két 36 cm átmérőjű gömb alakú dinnye közül az egyik héja 1 cm, a másiké 2 cm vastag. Hány százalékponttal több ehető a vékony héjúban?',
    options: ['≈ 14 százalékponttal', '≈ 5,6 százalékponttal', '≈ 2,8 százalékponttal', 'Ugyanannyi ehető mindkettőben'],
    correctAnswer: 0,
    explanation: '(17 / 18)³ ≈ 84,2 %, (16 / 18)³ ≈ 70,2 %; a különbség ≈ 14 százalékpont. (5,6 a sugarak arányának különbsége.)'
  },
  {
    id: 'sav-q30',
    questionTypeBadge: 'Mérőszámok',
    level: 3,
    question: 'Mekkora sugarú gömbnél egyenlő a felszín (cm²) és a térfogat (cm³) mérőszáma?',
    options: ['r = 3 cm', 'r = 1 cm', 'r = 4 cm', 'r = 4/3 cm'],
    correctAnswer: 0,
    explanation: '4r²π = 4r³π / 3 ⇒ 1 = r / 3 ⇒ r = 3 (cm). Ekkor A = V = 36π mérőszámú.'
  }
];

export const SphereAreaVolumeQuiz: React.FC<{
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
      topicId="g12-ter-gomb-felszin-terfogat-quiz"
      subtopicId="a-gomb-felszine-es-terfogata"
      title="7. A gömb felszíne és térfogata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: felszín- és térfogatképlet, dinnyék, sörétek, buborékok, összetett testek."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={SPHERE_AREA_VOLUME_QUESTIONS}
      cheatSheets={[
        {
          title: 'Képletek',
          items: [
            'A = 4r²π (négy főkör területe)',
            'V = 4r³π / 3',
            'Átmérőből: r = d / 2',
            'Visszafelé: r = √(A / (4π)); r = ∛(3V / (4π))'
          ]
        },
        {
          title: 'Mértékegységek',
          items: [
            '1 dm³ = 1 liter = 1000 cm³',
            '1 liter víz ≈ 1 kg (sűrűség ≈ 1 g/cm³)',
            '1 cm² = 100 mm²; 1 cm³ = 1000 mm³',
            'A: négyzetes, V: köbös mértékegység'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'd = 20 cm-es dinnye ≈ 4,2 kg; 8 kg-os dinnye átmérője ≈ 25 cm',
            '2 cm-es golyó → 8000 db 1 mm-es sörét, felszínük 20-szoros',
            '24 cm-es dinnye: 1 cm héj ⇒ ≈ 77 %, 2 cm héj ⇒ ≈ 58 % ehető',
            'Arkhimédész: A_gömb = henger palástja, V_gömb = 2/3 · V_henger'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SphereAreaVolumeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SphereAreaVolumeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SphereAreaVolumeQuiz;
