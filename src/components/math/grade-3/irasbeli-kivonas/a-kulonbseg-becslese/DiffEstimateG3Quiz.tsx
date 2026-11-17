import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { DiffEstimateG3Matcher } from './DiffEstimateG3Matcher';
import { DiffEstimateG3Sorter } from './DiffEstimateG3Sorter';
import { QFig, UNK, PriceTag, ItemIcon, ItemKind } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Számegyenes-darab lo..hi, egy megjelölt számmal; a keresett kerek szám nincs kiírva. */
const LineQ: React.FC<{ lo: number; hi: number; n: number; step: number }> = ({ lo, hi, n, step }) => {
  const X = (v: number) => 24 + ((v - lo) * 192) / (hi - lo);
  const ticks = (hi - lo) / step;
  return (
    <QFig h={92}>
      <line x1="14" y1="56" x2="226" y2="56" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: ticks + 1 }).map((_, k) => {
        const v = lo + k * step;
        const end = v === lo || v === hi;
        const mid = v === (lo + hi) / 2;
        return <line key={v} x1={X(v)} y1={end ? 46 : mid ? 49 : 52} x2={X(v)} y2={end ? 66 : mid ? 63 : 60} stroke={mid ? '#f59e0b' : '#334155'} strokeWidth={end ? 2 : 1.3} />;
      })}
      <text x={X(lo)} y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">{lo}</text>
      <text x={X(hi)} y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">{hi}</text>
      <circle cx={X(n)} cy="56" r="5" fill={UNK} />
      <text x={X(n)} y="34" textAnchor="middle" fontSize="17" fontWeight="bold" fill={UNK}>{n}</text>
    </QFig>
  );
};

/** Becslés dobozokkal: a ≈ ? − ? */
const EstQ: React.FC<{ a: number; b: number; label: string }> = ({ a, b, label }) => (
  <QFig h={84}>
    <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">{label}</text>
    <rect x="16" y="30" width="56" height="34" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
    <text x="44" y="53" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#78350f">{a}</text>
    <text x="84" y="53" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">−</text>
    <rect x="96" y="30" width="56" height="34" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
    <text x="124" y="53" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0c4a6e">{b}</text>
    <text x="168" y="53" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">≈</text>
    <rect x="182" y="30" width="44" height="34" rx="8" fill="#fee2e2" stroke={UNK} strokeWidth="1.8" />
    <text x="204" y="53" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Becslés-sáv 0–500, fölötte a kivonás. */
const StripQ: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={96}>
    <rect x="66" y="10" width="108" height="30" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
    <text x="120" y="31" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#78350f">{text}</text>
    <text x="120" y="54" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>?</text>
    {[0, 100, 200, 300, 400, 500].map((v, i) => (
      <g key={v}>
        <rect x={8 + i * 38} y="60" width="36" height="26" rx="5" fill="#fff" stroke="#94a3b8" strokeWidth="1.4" />
        <text x={26 + i * 38} y="78" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">{v}</text>
      </g>
    ))}
  </QFig>
);

/** Pénztárca − tárgy(ak). */
const BuyQ: React.FC<{ wallet: number; items: { kind: ItemKind; price: number }[] }> = ({ wallet, items }) => (
  <QFig h={92}>
    <rect x="12" y="30" width="78" height="46" rx="9" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <rect x="12" y="22" width="78" height="14" rx="5" fill="#f59e0b" stroke="#a16207" strokeWidth="2" />
    <text x="51" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#713f12">{wallet} Ft</text>
    <text x="104" y="60" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">−</text>
    {items.map((it, i) => {
      const cx = items.length === 1 ? 172 : 148 + i * 62;
      return (
        <g key={i}>
          <ItemIcon kind={it.kind} cx={cx} cy={32} s={0.85} />
          <PriceTag x={cx - 28} y={54} text={`${it.price} Ft`} w={58} fs={11.5} />
        </g>
      );
    })}
  </QFig>
);

/** Szalagok (hossz). */
const RibbonQ: React.FC<{ total: number; cut: number }> = ({ total, cut }) => {
  const W = 200;
  const wc = (W * cut) / total;
  return (
    <QFig h={84}>
      <rect x="20" y="24" width={W} height="20" rx="4" fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.5" />
      <rect x={20 + W - wc} y="24" width={wc} height="20" rx="4" fill="#fbcfe8" stroke="#9d174d" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={20 + W - wc} y1="16" x2={20 + W - wc} y2="52" stroke="#334155" strokeWidth="2" strokeDasharray="3 2" />
      <text x="22" y="16" textAnchor="start" fontSize="12" fontWeight="bold" fill="#334155">{total} cm</text>
      <text x={20 + W - wc / 2} y="66" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9d174d">levágunk {cut} cm-t</text>
      <text x={20 + (W - wc) / 2} y="66" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>≈ ?</text>
    </QFig>
  );
};

/** Pontos érték és két becslés-doboz. */
const CompareQ: React.FC<{ op: string; exact: number; a: string; b: string }> = ({ op, exact, a, b }) => (
  <QFig h={92}>
    <text x="120" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{op} = {exact}</text>
    <rect x="16" y="38" width="96" height="40" rx="9" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
    <text x="64" y="54" textAnchor="middle" fontSize="11" fill="#7f1d1d">{a.split(':')[0]}</text>
    <text x="64" y="71" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7f1d1d">{a.split(':')[1]}</text>
    <rect x="128" y="38" width="96" height="40" rx="9" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" />
    <text x="176" y="54" textAnchor="middle" fontSize="11" fill="#1e3a8a">{b.split(':')[0]}</text>
    <text x="176" y="71" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">{b.split(':')[1]}</text>
  </QFig>
);

/** Kivonás eredménnyel – jó lehet? */
const ResultQ: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={66}>
    <rect x="30" y="14" width="180" height="38" rx="9" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
    <text x="120" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#4c1d95">{text}</text>
  </QFig>
);

/** Tornaterem: összes hely és a leülők. */
const SeatsQ: React.FC = () => (
  <QFig h={86}>
    {Array.from({ length: 3 }).map((_, r) =>
      Array.from({ length: 10 }).map((__, c) => (
        <rect key={`${r}-${c}`} x={22 + c * 14} y={14 + r * 16} width="11" height="11" rx="2" fill={r * 10 + c < 12 ? '#60a5fa' : '#e2e8f0'} stroke="#334155" strokeWidth="0.8" />
      ))
    )}
    <text x="180" y="30" textAnchor="start" fontSize="11.5" fontWeight="bold" fill="#334155">315 hely</text>
    <text x="180" y="48" textAnchor="start" fontSize="11.5" fontWeight="bold" fill="#2563eb">128 ül</text>
    <text x="180" y="66" textAnchor="start" fontSize="11.5" fontWeight="bold" fill={UNK}>szabad ≈ ?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIFF_ESTIMATE_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint: kerekítés, egyszerű becslés ----------------
  {
    id: 'des-q1',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineQ lo={300} hi={400} n={382} step={10} />,
    question: 'Mennyi a 382 százasra kerekítve?',
    options: ['400', '300', '380', '390'],
    correctAnswer: 0,
    explanation: 'A 382-ben 8 tízes van. Ez több, mint 5, ezért felfelé kerekítünk: 400.'
  },
  {
    id: 'des-q2',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineQ lo={140} hi={150} n={145} step={1} />,
    question: 'Mennyi a 145 tízesre kerekítve?',
    options: ['150', '140', '100', '200'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 5 áll. Az 5-öst felfelé kerekítjük: 150.'
  },
  {
    id: 'des-q3',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineQ lo={200} hi={300} n={249} step={10} />,
    question: 'Mennyi a 249 százasra kerekítve?',
    options: ['200', '300', '250', '240'],
    correctAnswer: 0,
    explanation: 'A 249-ben 4 tízes van. Ez kevesebb, mint 5, ezért lefelé kerekítünk: 200.'
  },
  {
    id: 'des-q4',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'Melyik jel jelenti azt, hogy „körülbelül”?',
    options: ['≈', '=', '<', '+'],
    correctAnswer: 0,
    explanation: 'A hullámos egyenlőségjel (≈) azt jelenti: körülbelül. Például 382 ≈ 400.'
  },
  {
    id: 'des-q5',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <EstQ a={410} b={190} label="százasra kerekítve" />,
    question: 'Becsüld meg százasra kerekítve: 410 − 190',
    options: ['200', '220', '300', '100'],
    correctAnswer: 0,
    explanation: '410 ≈ 400, 190 ≈ 200. 400 − 200 = 200.'
  },
  {
    id: 'des-q6',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <EstQ a={368} b={121} label="tízesre kerekítve" />,
    question: 'Becsüld meg tízesre kerekítve: 368 − 121',
    options: ['250', '247', '200', '240'],
    correctAnswer: 0,
    explanation: '368 ≈ 370, 121 ≈ 120. 370 − 120 = 250. (A 247 a pontos eredmény, nem a becslés.)'
  },
  {
    id: 'des-q7',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    question: 'Melyik számból lesz 300, ha százasra kerekítjük?',
    options: ['263', '238', '352', '209'],
    correctAnswer: 0,
    explanation: '263 ≈ 300, mert 6 tízese van. 238 ≈ 200, 352 ≈ 400, 209 ≈ 200.'
  },
  {
    id: 'des-q8',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg százasra kerekítve: 498 − 302',
    options: ['200', '196', '300', '100'],
    correctAnswer: 0,
    explanation: '498 ≈ 500, 302 ≈ 300. 500 − 300 = 200.'
  },
  {
    id: 'des-q9',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQ lo={200} hi={300} n={275} step={10} />,
    question: 'Melyik kerek százashoz van közelebb a 275?',
    options: ['300', '200', '280', '270'],
    correctAnswer: 0,
    explanation: 'A 275 a 250-en túl van, tehát közelebb van a 300-hoz.'
  },
  {
    id: 'des-q10',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineQ lo={450} hi={460} n={455} step={1} />,
    question: 'Mennyi a 455 tízesre kerekítve?',
    options: ['460', '450', '500', '400'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 5 áll, ezért felfelé kerekítünk: 460.'
  },

  // ---------------- 2. szint: becslés kétféleképpen ----------------
  {
    id: 'des-q11',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <EstQ a={382} b={145} label="százasra kerekítve" />,
    question: 'Becsüld meg százasra kerekítve: 382 − 145',
    options: ['300', '200', '230', '240'],
    correctAnswer: 0,
    explanation: '382 ≈ 400, 145 ≈ 100. 400 − 100 = 300.'
  },
  {
    id: 'des-q12',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <EstQ a={382} b={145} label="tízesre kerekítve" />,
    question: 'Becsüld meg tízesre kerekítve: 382 − 145',
    options: ['230', '240', '300', '220'],
    correctAnswer: 0,
    explanation: '382 ≈ 380, 145 ≈ 150 (az 5-öst felfelé kerekítjük). 380 − 150 = 230.'
  },
  {
    id: 'des-q13',
    level: 2,
    questionTypeBadge: 'Melyik pontosabb?',
    figure: <CompareQ op="382 − 145" exact={237} a="százasra:300" b="tízesre:230" />,
    question: 'A pontos eredmény 237. Melyik becslés van közelebb hozzá?',
    options: ['a tízesre kerekített (230)', 'a százasra kerekített (300)', 'egyformán közel vannak', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'A 230 csak 7-tel kevesebb a 237-nél. A 300 63-mal több. A tízesre kerekített becslés a pontosabb.'
  },
  {
    id: 'des-q14',
    level: 2,
    questionTypeBadge: 'Becslés-sáv',
    figure: <StripQ text="486 − 97" />,
    question: 'Melyik dobozba kerül a 486 − 97? Becsülj százasra kerekítve!',
    options: ['400', '300', '500', '390'],
    correctAnswer: 0,
    explanation: '486 ≈ 500, 97 ≈ 100. 500 − 100 = 400.'
  },
  {
    id: 'des-q15',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <BuyQ wallet={500} items={[{ kind: 'book', price: 278 }]} />,
    question: '500 Ft-od van. Megveszed a 278 Ft-os könyvet. Körülbelül mennyi marad? Becsülj tízesre!',
    options: ['220 Ft', '222 Ft', '200 Ft', '230 Ft'],
    correctAnswer: 0,
    explanation: '278 ≈ 280. 500 − 280 = 220. Körülbelül 220 Ft marad. (Pontosan 222 Ft.)'
  },
  {
    id: 'des-q16',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg tízesre kerekítve: 455 − 236',
    options: ['220', '210', '300', '230'],
    correctAnswer: 0,
    explanation: '455 ≈ 460 (az 5 felfelé visz), 236 ≈ 240. 460 − 240 = 220.'
  },
  {
    id: 'des-q17',
    level: 2,
    questionTypeBadge: 'Hosszúság',
    figure: <RibbonQ total={352} cut={148} />,
    question: 'A szalag 352 cm hosszú. Levágunk belőle 148 cm-t. Körülbelül mennyi marad? Becsülj tízesre!',
    options: ['200 cm', '204 cm', '300 cm', '210 cm'],
    correctAnswer: 0,
    explanation: '352 ≈ 350, 148 ≈ 150. 350 − 150 = 200. Körülbelül 200 cm marad.'
  },
  {
    id: 'des-q18',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Melyik kivonás becsült értéke 200, ha százasra kerekítünk?',
    options: ['412 − 189', '412 − 289', '312 − 289', '462 − 189'],
    correctAnswer: 0,
    explanation: '412 ≈ 400, 189 ≈ 200. 400 − 200 = 200. A többinél 100, 0 és 300 jön ki.'
  },
  {
    id: 'des-q19',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <EstQ a={293} b={147} label="tízesre kerekítve" />,
    question: 'Becsüld meg tízesre kerekítve: 293 − 147',
    options: ['140', '146', '150', '100'],
    correctAnswer: 0,
    explanation: '293 ≈ 290, 147 ≈ 150. 290 − 150 = 140.'
  },
  {
    id: 'des-q20',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg százasra kerekítve: 251 − 149',
    options: ['200', '100', '102', '150'],
    correctAnswer: 0,
    explanation: '251 ≈ 300, 149 ≈ 100. 300 − 100 = 200. A pontos érték 102 – itt a tízesre kerekítés sokkal jobb lenne: 250 − 150 = 100.'
  },

  // ---------------- 3. szint: ellenőrzés, szöveges feladatok ----------------
  {
    id: 'des-q21',
    level: 3,
    questionTypeBadge: 'Ellenőrzés',
    figure: <ResultQ text="382 − 145 = 337" />,
    question: 'Valaki ezt számolta ki. Becsülj tízesre! Jó lehet az eredmény?',
    options: ['Nem, mert a becslés 230.', 'Igen, mert a becslés 330.', 'Igen, mert a becslés 340.', 'Nem, mert a becslés 400.'],
    correctAnswer: 0,
    explanation: '380 − 150 = 230. A 337 nagyon messze van a 230-tól. Hibás! (A jó eredmény 237.)'
  },
  {
    id: 'des-q22',
    level: 3,
    questionTypeBadge: 'Ellenőrzés',
    figure: <EstQ a={463} b={218} label="tízesre kerekítve" />,
    question: 'Melyik lehet a 463 − 218 pontos eredménye? Becsülj előbb!',
    options: ['245', '345', '145', '681'],
    correctAnswer: 0,
    explanation: '460 − 220 = 240. Ehhez a 245 van közel. Valóban 463 − 218 = 245.'
  },
  {
    id: 'des-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <SeatsQ />,
    question: 'A tornateremben 315 hely van. 128 gyerek leül. Körülbelül hány hely marad szabadon? Becsülj tízesre!',
    options: ['190', '187', '200', '290'],
    correctAnswer: 0,
    explanation: '315 ≈ 320, 128 ≈ 130. 320 − 130 = 190. Körülbelül 190 hely marad szabadon.'
  },
  {
    id: 'des-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A pékségben reggel 486 kifli volt. Délig 213-at eladtak. Körülbelül hány kifli maradt? Becsülj százasra!',
    options: ['300', '273', '200', '270'],
    correctAnswer: 0,
    explanation: '486 ≈ 500, 213 ≈ 200. 500 − 200 = 300. Körülbelül 300 kifli maradt.'
  },
  {
    id: 'des-q25',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <BuyQ wallet={500} items={[{ kind: 'book', price: 198 }, { kind: 'puzzle', price: 97 }]} />,
    question: '500 Ft-od van. Megveszed mindkettőt. Becsülj százasra! Elég a pénz?',
    options: ['Igen, kb. 200 Ft marad.', 'Nem, kb. 100 Ft hiányzik.', 'Igen, kb. 400 Ft marad.', 'Nem, kb. 200 Ft hiányzik.'],
    correctAnswer: 0,
    explanation: '198 ≈ 200, 97 ≈ 100. Együtt kb. 300 Ft. 500 − 300 = 200. Elég, és kb. 200 Ft marad.'
  },
  {
    id: 'des-q26',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    question: 'Egy kivonást tízesre kerekítve becsültünk: 380 − 150. Melyik lehetett az eredeti kivonás?',
    options: ['377 − 148', '386 − 148', '377 − 155', '374 − 152'],
    correctAnswer: 0,
    explanation: '377 ≈ 380 és 148 ≈ 150. A 386 ≈ 390, a 155 ≈ 160, a 374 ≈ 370 – azok nem jók.'
  },
  {
    id: 'des-q27',
    level: 3,
    questionTypeBadge: 'Becslés-sáv',
    figure: <StripQ text="389 − 191" />,
    question: 'Melyik dobozba kerül a 389 − 191? Becsülj százasra!',
    options: ['200', '100', '300', '190'],
    correctAnswer: 0,
    explanation: '389 ≈ 400, 191 ≈ 200. 400 − 200 = 200.'
  },
  {
    id: 'des-q28',
    level: 3,
    questionTypeBadge: 'Hosszúság',
    figure: <RibbonQ total={452} cut={179} />,
    question: 'A kötél 452 cm. Levágunk belőle 179 cm-t. Körülbelül mennyi marad? Becsülj tízesre!',
    options: ['270 cm', '273 cm', '300 cm', '280 cm'],
    correctAnswer: 0,
    explanation: '452 ≈ 450, 179 ≈ 180. 450 − 180 = 270. Körülbelül 270 cm marad.'
  },
  {
    id: 'des-q29',
    level: 3,
    questionTypeBadge: 'Melyik pontosabb?',
    figure: <CompareQ op="438 − 265" exact={173} a="százasra:?" b="tízesre:?" />,
    question: '438 − 265 = 173. Melyik becslés van közelebb a pontos eredményhez?',
    options: ['tízesre: 170', 'százasra: 100', 'százasra: 200', 'tízesre: 180'],
    correctAnswer: 0,
    explanation: 'Tízesre: 440 − 270 = 170. Százasra: 400 − 300 = 100. A 170 van közelebb a 173-hoz.'
  },
  {
    id: 'des-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A könyv 312 oldalas. Már elolvastál 189 oldalt. Körülbelül hány oldal van még hátra? Becsülj tízesre!',
    options: ['120', '123', '100', '130'],
    correctAnswer: 0,
    explanation: '312 ≈ 310, 189 ≈ 190. 310 − 190 = 120. Körülbelül 120 oldal van hátra.'
  }
];

export const DiffEstimateG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-kivonas"
    topicId="g3-wsub-becsles-quiz"
    subtopicId="a-kulonbseg-becslese"
    title="2. A különbség becslése – Kvíz"
    subtitle="30 feladat 3 szinten: kerekítés százasra és tízesre, becsült különbség, melyik becslés pontosabb, ellenőrzés."
    badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • KVÍZ"
    questions={DIFF_ESTIMATE_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Százasra kerekítés', items: ['Nézd a tízeseket!', '0–4: lefelé, 5–9: felfelé', '249 ≈ 200, 250 ≈ 300'] },
      { title: 'Tízesre kerekítés', items: ['Nézd az egyeseket!', '0–4: lefelé, 5–9: felfelé', '382 ≈ 380, 145 ≈ 150'] },
      { title: 'Becslés', items: ['Előbb kerekíts, aztán vonj ki!', '382 − 145 ≈ 380 − 150 = 230', 'A tízesre kerekített általában pontosabb'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<DiffEstimateG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<DiffEstimateG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default DiffEstimateG3Quiz;
