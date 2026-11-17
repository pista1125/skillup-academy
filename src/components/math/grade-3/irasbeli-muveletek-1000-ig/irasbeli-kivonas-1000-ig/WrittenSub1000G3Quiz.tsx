import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenSub1000G3Matcher } from './WrittenSub1000G3Matcher';
import { WrittenSub1000G3Sorter } from './WrittenSub1000G3Sorter';
import { WrittenSubG3ColumnG, columnSubSize, WrittenSubG3ColumnProps } from '../../irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';
import { QFig, UNK, ItemIcon, ItemKind, PriceTag, Wallet, ThousandBar } from './WrittenSub1000G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Írásbeli kivonás oszlopban, a kérdésábra közepén. */
const ColQ: React.FC<WrittenSubG3ColumnProps & { note?: string }> = ({ note, ...p }) => {
  const props = { cell: 27, cols: Number(String(p.minuend).replace(/\D/g, '9')) >= 1000 ? 4 : 3, ...p };
  const { w, h } = columnSubSize(props);
  const H = h + 16 + (note ? 16 : 0);
  return (
    <QFig h={H}>
      <WrittenSubG3ColumnG {...props} x={(240 - w) / 2} y={8} />
      {note && <text x="120" y={H - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">{note}</text>}
    </QFig>
  );
};

/** Egyenlőség dobozokkal: '?' = keresett. */
const EqQ: React.FC<{ parts: string[] }> = ({ parts }) => {
  const op = (p: string) => p === '+' || p === '=' || p === '−' || p === '≈';
  const ws = parts.map((p) => (op(p) ? 18 : p.length > 3 ? 56 : 48));
  const total = ws.reduce((a, b) => a + b, 0) + (parts.length - 1) * 4;
  let x = (240 - total) / 2;
  return (
    <QFig h={66}>
      {parts.map((p, i) => {
        const w = ws[i];
        const x0 = x;
        x += w + 4;
        if (op(p)) return <text key={i} x={x0 + w / 2} y="41" textAnchor="middle" fontSize="21" fontWeight="bold" fill="#334155">{p}</text>;
        const q = p === '?';
        return (
          <g key={i}>
            <rect x={x0} y="14" width={w} height="36" rx="8" fill={q ? '#fee2e2' : '#eff6ff'} stroke={q ? UNK : '#2563eb'} strokeWidth="1.8" />
            <text x={x0 + w / 2} y="39" textAnchor="middle" fontSize="18" fontWeight="bold" fill={q ? UNK : '#1e3a8a'}>{p}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Sáv 1000-ig. */
const BarQ: React.FC<{ done: number; label: string; title: string }> = ({ done, label, title }) => (
  <QFig h={96}>
    <text x="120" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">{title}</text>
    <ThousandBar x={16} y={30} w={208} done={done} label={label} h={28} />
  </QFig>
);

/** Túra 1000 m: délelőtt + délután, a maradék rész „?”. */
const HikeQ: React.FC = () => {
  const k = 208 / 1000;
  return (
    <QFig h={96}>
      <text x="120" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">1000 m-es túra</text>
      <rect x="16" y="30" width={365 * k} height="28" rx="4" fill="#bae6fd" stroke="#334155" />
      <text x={16 + (365 * k) / 2} y="49" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">365 m</text>
      <rect x={16 + 365 * k} y="30" width={280 * k} height="28" rx="4" fill="#fde68a" stroke="#334155" />
      <text x={16 + 365 * k + (280 * k) / 2} y="49" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">280 m</text>
      <rect x={16 + 645 * k} y="30" width={355 * k} height="28" rx="4" fill="#fee2e2" stroke={UNK} strokeDasharray="5 3" />
      <text x={16 + 645 * k + (355 * k) / 2} y="49" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
      <text x={16 + (365 * k) / 2} y="76" textAnchor="middle" fontSize="11" fill="#475569">délelőtt</text>
      <text x={16 + 365 * k + (280 * k) / 2} y="76" textAnchor="middle" fontSize="11" fill="#475569">délután</text>
      <text x={16 + 645 * k + (355 * k) / 2} y="76" textAnchor="middle" fontSize="11" fill="#475569">még hátra</text>
    </QFig>
  );
};

/** Két hegy magassággal. */
const MountainsQ: React.FC = () => (
  <QFig h={120}>
    <path d="M 20 104 L 80 22 L 140 104 Z" fill="#86efac" stroke="#166534" strokeWidth="2" />
    <path d="M 66 41 L 80 22 L 94 41 Z" fill="#fff" stroke="#166534" strokeWidth="1.2" />
    <text x="80" y="88" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">914 m</text>
    <path d="M 130 104 L 180 50 L 230 104 Z" fill="#bbf7d0" stroke="#166534" strokeWidth="2" />
    <text x="180" y="92" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">657 m</text>
    <line x1="80" y1="22" x2="214" y2="22" stroke={UNK} strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="180" y1="50" x2="214" y2="50" stroke={UNK} strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="210" y1="24" x2="210" y2="48" stroke={UNK} strokeWidth="2" />
    <text x="222" y="40" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Pénztárca és tárgyak árcédulával. */
const PayQ: React.FC<{ wallet: number; items: { kind: ItemKind; price: number }[] }> = ({ wallet, items }) => (
  <QFig h={100}>
    <Wallet x={10} y={28} text={`${wallet} Ft`} w={84} />
    {items.map((it, i) => {
      const cx = 140 + i * 66 - (items.length - 1) * 0;
      return (
        <g key={i}>
          <ItemIcon kind={it.kind} cx={cx} cy={34} />
          <PriceTag x={cx - 32} y={60} text={`${it.price} Ft`} w={64} fs={12.5} />
        </g>
      );
    })}
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const WRITTEN_SUB_1000_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'ws1k-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <ColQ minuend={832} subtrahend={467} result="???" />,
    question: 'Mennyi a különbség?',
    options: ['365', '475', '435', '375'],
    correctAnswer: 0,
    explanation: '7-hez 5, az 12, maradt 1. 6 meg 1 az 7, 7-hez 6, az 13, maradt 1. 4 meg 1 az 5, 5-höz 3, az 8. A különbség 365.'
  },
  {
    id: 'ws1k-q2',
    level: 1,
    questionTypeBadge: '0 a kisebbítendőben',
    figure: <ColQ minuend={540} subtrahend={236} highlight={0} />,
    question: 'Az egyeseknél felül 0 van. A 6-tól meddig pótolsz?',
    options: ['10-ig, és maradt 1', '0-ig', '6-ig', '16-ig, és maradt 1'],
    correctAnswer: 0,
    explanation: 'A 0-ig nem tudunk felfelé számolni. Ezért 10-ig pótolunk: 6-hoz 4, az 10. Leírom a 4-et, maradt 1.'
  },
  {
    id: 'ws1k-q3',
    level: 1,
    questionTypeBadge: 'Tízesek',
    figure: <ColQ minuend={704} subtrahend={258} result="  6" carries={[null, 1]} highlight={1} />,
    question: 'Az egyeseknél maradt 1. Mit mondasz a tízeseknél?',
    options: ['5 meg 1 az 6. 6-hoz 4, az 10.', '5-höz 5, az 10.', '0-hoz 5, az 5.', '5 meg 1 az 6. 6-hoz 6, az 12.'],
    correctAnswer: 0,
    explanation: 'A maradékot a kivonandó jegyéhez adjuk: 5 meg 1 az 6. Felül 0 van, ezért 10-ig pótolunk: 6-hoz 4, az 10. Leírom a 4-et, maradt 1.'
  },
  {
    id: 'ws1k-q4',
    level: 1,
    questionTypeBadge: 'Kerek százasból',
    figure: <ColQ minuend={600} subtrahend={274} result="???" />,
    question: 'Számold ki írásban!',
    options: ['326', '436', '474', '336'],
    correctAnswer: 0,
    explanation: '4-hez 6, az 10, maradt 1. 7 meg 1 az 8, 8-hoz 2, az 10, maradt 1. 2 meg 1 az 3, 3-hoz 3, az 6. A különbség 326.'
  },
  {
    id: 'ws1k-q5',
    level: 1,
    questionTypeBadge: 'Az 1000-ből',
    figure: <ColQ minuend={1000} subtrahend={347} result=" ???" />,
    question: 'Mennyi a különbség?',
    options: ['653', '763', '347', '753'],
    correctAnswer: 0,
    explanation: '7-hez 3, az 10, maradt 1. 4 meg 1 az 5, 5-höz 5, az 10, maradt 1. 3 meg 1 az 4, 4-hez 6, az 10, maradt 1. Az ezreseknél 1-hez 0, az 1 – ezt nem írjuk le. 653.'
  },
  {
    id: 'ws1k-q6',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik összeadással ellenőrzöd ezt: 1000 − 347 = 653?',
    options: ['653 + 347 = 1000', '653 + 1000 = 347', '1000 + 347 = 653', '347 + 347 = 653'],
    correctAnswer: 0,
    explanation: 'különbség + kivonandó = kisebbítendő. 653 + 347 = 1000. Megkaptuk a kisebbítendőt, tehát jó.'
  },
  {
    id: 'ws1k-q7',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <PayQ wallet={1000} items={[{ kind: 'book', price: 685 }]} />,
    question: '1000 Ft-od van. Megveszed a 685 Ft-os könyvet. Mennyi pénzed marad?',
    options: ['315 Ft', '425 Ft', '325 Ft', '415 Ft'],
    correctAnswer: 0,
    explanation: '1000 − 685: 5-höz 5, az 10, maradt 1. 8 meg 1 az 9, 9-hez 1, az 10, maradt 1. 6 meg 1 az 7, 7-hez 3, az 10. 315 Ft marad.'
  },
  {
    id: 'ws1k-q8',
    level: 1,
    questionTypeBadge: 'Pótlás',
    figure: <ColQ minuend={1000} subtrahend={386} result="   ?" highlight={0} />,
    question: 'Az egyeseknél: 6-hoz mennyi kell, hogy 10 legyen?',
    options: ['4', '6', '14', '3'],
    correctAnswer: 0,
    explanation: '6-hoz 4, az 10. Leírom a 4-et, és maradt 1.'
  },
  {
    id: 'ws1k-q9',
    level: 1,
    questionTypeBadge: '0 a tízeseknél',
    figure: <ColQ minuend={905} subtrahend={362} result="???" />,
    question: 'Számold ki írásban!',
    options: ['543', '643', '663', '553'],
    correctAnswer: 0,
    explanation: '2-höz 3, az 5. A 0 kisebb, mint a 6: 6-hoz 4, az 10, maradt 1. 3 meg 1 az 4, 4-hez 5, az 9. A különbség 543.'
  },
  {
    id: 'ws1k-q10',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <EqQ parts={['812', '−', '395', '≈', '?']} />,
    question: 'Becsüld meg a különbséget! Kerekíts százasra!',
    options: ['400', '500', '300', '600'],
    correctAnswer: 0,
    explanation: '812 ≈ 800, 395 ≈ 400. 800 − 400 = 400. (A pontos különbség 417.)'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'ws1k-q11',
    level: 2,
    questionTypeBadge: 'Kétszer maradt 1',
    figure: <ColQ minuend={703} subtrahend={498} result="???" />,
    question: 'Mennyi a különbség?',
    options: ['205', '315', '215', '305'],
    correctAnswer: 0,
    explanation: '8-hoz 5, az 13, maradt 1. 9 meg 1 az 10. 10-hez 0, az 10: leírom a 0-t, maradt 1. 4 meg 1 az 5, 5-höz 2, az 7. A különbség 205.'
  },
  {
    id: 'ws1k-q12',
    level: 2,
    questionTypeBadge: 'Az 1000-ből',
    figure: <ColQ minuend={1000} subtrahend={509} result=" ???" />,
    question: 'Számold ki írásban!',
    options: ['491', '501', '591', '481'],
    correctAnswer: 0,
    explanation: '9-hez 1, az 10, maradt 1. 0 meg 1 az 1, 1-hez 9, az 10, maradt 1. 5 meg 1 az 6, 6-hoz 4, az 10. A különbség 491.'
  },
  {
    id: 'ws1k-q13',
    level: 2,
    questionTypeBadge: 'Hiányzó jegy',
    figure: <ColQ minuend="8?2" subtrahend={357} result={465} />,
    question: 'Melyik számjegy hiányzik a kisebbítendőből?',
    options: ['2', '3', '1', '7'],
    correctAnswer: 0,
    explanation: 'Ellenőrizd összeadással: 465 + 357 = 822. A hiányzó jegy 2.'
  },
  {
    id: 'ws1k-q14',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <ColQ minuend={1000} subtrahend={347} />,
    question: 'Hányszor marad 1, amíg kiszámolod?',
    options: ['háromszor', 'egyszer', 'kétszer', 'egyszer sem'],
    correctAnswer: 0,
    explanation: 'Az egyeseknél, a tízeseknél és a százasoknál is 10-ig pótolunk. Mindháromszor maradt 1.'
  },
  {
    id: 'ws1k-q15',
    level: 2,
    questionTypeBadge: 'Mennyivel több?',
    question: 'Mennyivel több a 805, mint a 468?',
    options: ['337-tel', '447-tel', '463-mal', '347-tel'],
    correctAnswer: 0,
    explanation: '805 − 468: 8-hoz 7, az 15, maradt 1. 6 meg 1 az 7, 7-hez 3, az 10, maradt 1. 4 meg 1 az 5, 5-höz 3, az 8. 337-tel több.'
  },
  {
    id: 'ws1k-q16',
    level: 2,
    questionTypeBadge: 'Hibavadász',
    figure: <ColQ minuend={602} subtrahend={375} result={337} note="Egy gyerek ezt számolta." />,
    question: 'Mi a hiba?',
    options: ['Elfelejtette a maradékot.', 'Jó az eredmény.', 'Fordítva pótolt.', 'Rosszul írta egymás alá a számokat.'],
    correctAnswer: 0,
    explanation: 'Ellenőrzés: 337 + 375 = 712, nem 602. A maradékot nem adta hozzá: 7 meg 1 az 8, és 3 meg 1 az 4. A jó eredmény 227.'
  },
  {
    id: 'ws1k-q17',
    level: 2,
    questionTypeBadge: 'Kerek százasból',
    figure: <ColQ minuend={400} subtrahend={163} result="???" />,
    question: 'Számold ki írásban!',
    options: ['237', '347', '363', '247'],
    correctAnswer: 0,
    explanation: '3-hoz 7, az 10, maradt 1. 6 meg 1 az 7, 7-hez 3, az 10, maradt 1. 1 meg 1 az 2, 2-höz 2, az 4. A különbség 237.'
  },
  {
    id: 'ws1k-q18',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    figure: <ColQ op="+" minuend={464} subtrahend={436} result="???" note="Ellenőrzés: 900 − 436 = 464?" />,
    question: 'Egy gyerek így számolt: 900 − 436 = 464. Mit mutat az ellenőrzés?',
    options: ['900 jön ki, tehát jó.', '800 jön ki, tehát hibás.', '1000 jön ki, tehát hibás.', '890 jön ki, tehát hibás.'],
    correctAnswer: 0,
    explanation: '464 + 436: 4 meg 6 az 10, maradt 1. 6 meg 3 az 9, meg 1 az 10, maradt 1. 4 meg 4 az 8, meg 1 az 9. 900 – a kisebbítendő, tehát jó.'
  },
  {
    id: 'ws1k-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó jegy',
    figure: <ColQ minuend={1000} subtrahend="4?8" result={572} />,
    question: 'Melyik számjegy hiányzik a kivonandóból?',
    options: ['2', '3', '1', '7'],
    correctAnswer: 0,
    explanation: 'A kivonandó = kisebbítendő − különbség: 1000 − 572 = 428. A hiányzó jegy 2. Ellenőrzés: 572 + 428 = 1000.'
  },
  {
    id: 'ws1k-q20',
    level: 2,
    questionTypeBadge: 'Pótlás 1000-re',
    figure: <BarQ done={726} label="726" title="Mennyi hiányzik az 1000-hez?" />,
    question: 'Mennyi hiányzik a 726-ból az 1000-hez?',
    options: ['274', '384', '284', '374'],
    correctAnswer: 0,
    explanation: '1000 − 726: 6-hoz 4, az 10, maradt 1. 2 meg 1 az 3, 3-hoz 7, az 10, maradt 1. 7 meg 1 az 8, 8-hoz 2, az 10. 274 hiányzik.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'ws1k-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarQ done={547} label="kész: 547" title="1000 darabos kirakó" />,
    question: 'Egy 1000 darabos kirakóból 547 darab már a helyén van. Hány darab van még hátra?',
    options: ['453', '563', '553', '463'],
    correctAnswer: 0,
    explanation: '1000 − 547: 7-hez 3, az 10, maradt 1. 4 meg 1 az 5, 5-höz 5, az 10, maradt 1. 5 meg 1 az 6, 6-hoz 4, az 10. 453 darab van hátra.'
  },
  {
    id: 'ws1k-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <HikeQ />,
    question: 'A túra 1000 m hosszú. Délelőtt 365 m-t, délután 280 m-t mentetek. Hány méter van még hátra?',
    options: ['355 m', '645 m', '465 m', '365 m'],
    correctAnswer: 0,
    explanation: 'Eddig: 365 + 280 = 645 m. Hátra van: 1000 − 645 = 355 m.'
  },
  {
    id: 'ws1k-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy könyv 512 oldalas. Eddig 278 oldalt olvastál el. Hány oldal van még hátra?',
    options: ['234', '344', '366', '244'],
    correctAnswer: 0,
    explanation: '512 − 278: 8-hoz 4, az 12, maradt 1. 7 meg 1 az 8, 8-hoz 3, az 11, maradt 1. 2 meg 1 az 3, 3-hoz 2, az 5. 234 oldal van hátra.'
  },
  {
    id: 'ws1k-q24',
    level: 3,
    questionTypeBadge: 'Mennyivel több?',
    figure: <MountainsQ />,
    question: 'Az egyik hegy 914 m, a másik 657 m magas. Mennyivel magasabb az első?',
    options: ['257 m-rel', '367 m-rel', '343 m-rel', '267 m-rel'],
    correctAnswer: 0,
    explanation: '914 − 657: 7-hez 7, az 14, maradt 1. 5 meg 1 az 6, 6-hoz 5, az 11, maradt 1. 6 meg 1 az 7, 7-hez 2, az 9. 257 m-rel magasabb.'
  },
  {
    id: 'ws1k-q25',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <EqQ parts={['?', '+', '287', '=', '1000']} />,
    question: 'Gondoltam egy számot. Hozzáadtam 287-et, és 1000 lett. Melyik számra gondoltam?',
    options: ['713', '823', '723', '813'],
    correctAnswer: 0,
    explanation: 'Visszafelé: 1000 − 287 = 713. Ellenőrzés: 713 + 287 = 1000.'
  },
  {
    id: 'ws1k-q26',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Egy számhoz 236-ot kellett volna adni. Véletlenül kivontad, és 418 lett. Mi lett volna a jó eredmény?',
    options: ['890', '654', '418', '182'],
    correctAnswer: 0,
    explanation: 'Előbb a szám: 418 + 236 = 654. A jó eredmény: 654 + 236 = 890.'
  },
  {
    id: 'ws1k-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <EqQ parts={['803', '−', '?', '=', '547']} />,
    question: 'Melyik szám hiányzik?',
    options: ['256', '366', '344', '246'],
    correctAnswer: 0,
    explanation: 'A kivonandó = kisebbítendő − különbség: 803 − 547 = 256. Ellenőrzés: 547 + 256 = 803.'
  },
  {
    id: 'ws1k-q28',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <PayQ wallet={1000} items={[{ kind: 'kite', price: 385 }, { kind: 'bear', price: 240 }]} />,
    question: '1000 Ft-od van. Megveszed a sárkányt és a macit. Mennyi pénzed marad?',
    options: ['375 Ft', '625 Ft', '485 Ft', '385 Ft'],
    correctAnswer: 0,
    explanation: 'A két ajándék: 385 + 240 = 625 Ft. Marad: 1000 − 625 = 375 Ft.'
  },
  {
    id: 'ws1k-q29',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik különbség a legnagyobb?',
    options: ['1000 − 368', '900 − 345', '805 − 197', '700 − 86'],
    correctAnswer: 0,
    explanation: '1000 − 368 = 632, 900 − 345 = 555, 805 − 197 = 608, 700 − 86 = 614. A legnagyobb a 632.'
  },
  {
    id: 'ws1k-q30',
    level: 3,
    questionTypeBadge: 'Hibavadász',
    question: 'Melyik kivonás eredménye HIBÁS?',
    options: ['700 − 254 = 456', '1000 − 625 = 375', '603 − 258 = 345', '810 − 367 = 443'],
    correctAnswer: 0,
    explanation: '700 − 254: 4-hez 6, az 10, maradt 1. 5 meg 1 az 6, 6-hoz 4, az 10, maradt 1. 2 meg 1 az 3, 3-hoz 4, az 7. Az eredmény 446, nem 456. Ellenőrzés: 446 + 254 = 700.'
  }
];

export const WrittenSub1000G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-muveletek-1000-ig"
    topicId="g3-wops-kivonas-quiz"
    subtopicId="irasbeli-kivonas-1000-ig"
    title="2. Írásbeli kivonás 1000-ig – Kvíz"
    subtitle="30 feladat 3 szinten: pótlásos kivonás, 0 a kisebbítendőben, kivonás az 1000-ből, ellenőrzés, szöveges feladatok."
    badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • KVÍZ"
    questions={WRITTEN_SUB_1000_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Pótlás', items: ['Egyesekkel kezdj!', 'A kivonandótól pótolj felfelé: 3-hoz 4, az 7', 'Kisebb a felső jegy? Pótolj 10-zel többig: maradt 1', 'A maradékot add a következő kivonandó-jegyhez'] },
      { title: '0 felül', items: ['0 a kisebbítendőben: 10-ig pótolj', '6-hoz 4, az 10 – maradt 1', 'Az 1000-ből: négy oszlop', 'Az elejére 0-t nem írunk'] },
      { title: 'Ellenőrzés', items: ['különbség + kivonandó = kisebbítendő', '653 + 347 = 1000', 'Becslés: kerekíts százasra!'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<WrittenSub1000G3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<WrittenSub1000G3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default WrittenSub1000G3Quiz;
