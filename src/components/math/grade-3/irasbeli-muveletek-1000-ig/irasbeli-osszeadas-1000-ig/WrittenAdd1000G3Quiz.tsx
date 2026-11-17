import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenAdd1000G3Matcher } from './WrittenAdd1000G3Matcher';
import { WrittenAdd1000G3Sorter } from './WrittenAdd1000G3Sorter';
import { WrittenAddG3ColumnG, columnAddSize, WrittenAddG3ColumnProps } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';
import { QFig, UNK, ItemIcon, ItemKind, PriceTag, Bar } from './WrittenAdd1000G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Írásbeli összeadás oszlopban, a kérdésábra közepén. */
const ColQ: React.FC<WrittenAddG3ColumnProps & { note?: string }> = ({ note, ...p }) => {
  const props = { cell: p.addends.length > 3 ? 24 : 27, ...p };
  const { w, h } = columnAddSize(props);
  const H = h + 16 + (note ? 16 : 0);
  return (
    <QFig h={H}>
      <WrittenAddG3ColumnG {...props} x={(240 - w) / 2} y={8} />
      {note && <text x="120" y={H - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">{note}</text>}
    </QFig>
  );
};

/** Tárgyak árcédulával. */
const TagsQ: React.FC<{ items: { kind: ItemKind; price: number }[] }> = ({ items }) => {
  const w = 228 / items.length;
  return (
    <QFig h={100}>
      {items.map((it, i) => (
        <g key={i}>
          <ItemIcon kind={it.kind} cx={6 + i * w + w / 2} cy={34} />
          <PriceTag x={6 + i * w + (w - 64) / 2} y={60} text={`${it.price} Ft`} w={64} fs={12.5} />
        </g>
      ))}
    </QFig>
  );
};

/** Adatok doboz a szöveges feladathoz. */
const DataQ: React.FC<{ rows: [string, string][] }> = ({ rows }) => (
  <QFig h={24 + rows.length * 22}>
    <text x="14" y="22" fontSize="12.5" fontWeight="bold" fill="#7c2d12">Adatok:</text>
    {rows.map(([k, v], i) => (
      <g key={k}>
        <text x="80" y={22 + i * 22} fontSize="13" fill="#0f172a">{k}</text>
        <text x="222" y={22 + i * 22} textAnchor="end" fontSize="14" fontWeight="bold" fill={v.includes('?') ? UNK : '#0f172a'}>{v}</text>
      </g>
    ))}
  </QFig>
);

/** Egyenlőség dobozokkal: '?' = keresett. */
const EqQ: React.FC<{ parts: string[] }> = ({ parts }) => {
  const op = (p: string) => p === '+' || p === '=' || p === '−' || p === '≈';
  const nw = parts.length > 5 ? 38 : 48;
  const ws = parts.map((p) => (op(p) ? 18 : p.length > 3 ? nw + 8 : nw));
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
            <text x={x0 + w / 2} y="39" textAnchor="middle" fontSize={w < 44 ? 16 : 18} fontWeight="bold" fill={q ? UNK : "#1e3a8a"}>{p}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Számkártyák. */
const CardsQ: React.FC<{ ds: number[] }> = ({ ds }) => (
  <QFig h={74}>
    {ds.map((d, i) => {
      const x = 120 - (ds.length * 46) / 2 + i * 46 + 4;
      return (
        <g key={i}>
          <rect x={x} y="12" width="38" height="50" rx="7" fill="#fff" stroke="#7c3aed" strokeWidth="2.4" />
          <text x={x + 19} y="47" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#4c1d95">{d}</text>
        </g>
      );
    })}
  </QFig>
);

/** Sorozat dobozokban. */
const SeqQ: React.FC<{ items: string[] }> = ({ items }) => (
  <QFig h={64}>
    {items.map((v, i) => {
      const x = 10 + i * 56;
      const q = v === '?';
      return (
        <g key={i}>
          <rect x={x} y="14" width="50" height="34" rx="8" fill={q ? '#fee2e2' : '#ecfdf5'} stroke={q ? UNK : '#059669'} strokeWidth="1.8" />
          <text x={x + 25} y="37" textAnchor="middle" fontSize="16" fontWeight="bold" fill={q ? UNK : '#064e3b'}>{v}</text>
        </g>
      );
    })}
  </QFig>
);

/** Két nap szalagja: a második nap hosszabb. */
const TwoDaysQ: React.FC = () => (
  <QFig h={104}>
    <text x="12" y="31" fontSize="12" fill="#475569">1. nap</text>
    <Bar x={58} y={16} w={86} label="346 km" fill="#bae6fd" />
    <text x="12" y="65" fontSize="12" fill="#475569">2. nap</text>
    <Bar x={58} y={50} w={86} label="346 km" fill="#bae6fd" />
    <Bar x={144} y={50} w={40} label="158" fill="#fde68a" />
    <text x="120" y="96" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={UNK}>A két nap együtt: ?</text>
  </QFig>
);

/** Papírgyűjtés: három szalag, cél 700 kg. */
const GoalQ: React.FC = () => (
  <QFig h={100}>
    <Bar x={14} y={20} w={185 * 0.3} label="185" fill="#bae6fd" />
    <Bar x={14 + 185 * 0.3} y={20} w={237 * 0.3} label="237" fill="#fde68a" />
    <Bar x={14 + 422 * 0.3} y={20} w={209 * 0.3} label="209" fill="#bbf7d0" />
    <line x1={14 + 700 * 0.3} y1="10" x2={14 + 700 * 0.3} y2="56" stroke={UNK} strokeWidth="2.5" strokeDasharray="5 3" />
    <text x={14 + 700 * 0.3 - 4} y="72" textAnchor="end" fontSize="12" fontWeight="bold" fill={UNK}>cél: 700 kg</text>
    <text x="120" y="92" textAnchor="middle" fontSize="12" fill="#475569">Elérik a célt?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const WRITTEN_ADD_1000_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'wa1k-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <ColQ addends={[476, 358]} result="???" />,
    question: 'Mennyi az összeg?',
    options: ['834', '724', '824', '734'],
    correctAnswer: 0,
    explanation: 'Egyesek: 6 meg 8 az 14, leírom a 4-et, maradt 1. Tízesek: 7 meg 5 az 12, meg 1 az 13, leírom a 3-at, maradt 1. Százasok: 4 meg 3 az 7, meg 1 az 8. Az összeg 834.'
  },
  {
    id: 'wa1k-q2',
    level: 1,
    questionTypeBadge: 'Egyesek',
    figure: <ColQ addends={[243, 135, 128]} result="  ?" highlight={0} />,
    question: 'Melyik jegyet írod le az egyesek helyére?',
    options: ['6', '16', '1', '5'],
    correctAnswer: 0,
    explanation: '3 meg 5 meg 8 az 16. Az utolsó jegyet, a 6-ot írom le. Maradt 1.'
  },
  {
    id: 'wa1k-q3',
    level: 1,
    questionTypeBadge: 'Maradék',
    figure: <ColQ addends={[159, 217, 346]} result="  2" carries={[null, '?']} highlight={0} />,
    question: 'Az egyeseknél 9 meg 7 meg 6 az 22. Mennyi maradt?',
    options: ['2', '1', '0', '22'],
    correctAnswer: 0,
    explanation: 'A 22-ből leírom a 2-t, és maradt 2. A 2-t a tízesekhez adjuk hozzá.'
  },
  {
    id: 'wa1k-q4',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Egy oszlopban az összeg 25 lett. Mit csinálsz?',
    options: ['Leírom az 5-öt, maradt 2.', 'Leírom a 2-t, maradt 5.', 'Leírom a 25-öt.', 'Leírom az 5-öt, maradt 1.'],
    correctAnswer: 0,
    explanation: 'A 25 = 2 tízes és 5 egyes. Az utolsó jegyet, az 5-öt írom le. Maradt 2.'
  },
  {
    id: 'wa1k-q5',
    level: 1,
    questionTypeBadge: 'Pont 1000',
    figure: <ColQ addends={[563, 437]} result="????" cols={4} />,
    question: 'Mennyi az összeg?',
    options: ['1000', '990', '900', '100'],
    correctAnswer: 0,
    explanation: 'Minden oszlopban 10 lett: leírom a 0-t, maradt 1. A százasok után maradt 1 az ezresek helyére kerül. Az összeg 1000.'
  },
  {
    id: 'wa1k-q6',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <EqQ parts={['412', '+', '289', '≈', '?']} />,
    question: 'Becsüld meg az összeget! Kerekíts százasra!',
    options: ['700', '600', '800', '1000'],
    correctAnswer: 0,
    explanation: '412 ≈ 400, 289 ≈ 300. 400 + 300 = 700. (A pontos összeg 701.)'
  },
  {
    id: 'wa1k-q7',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <TagsQ items={[{ kind: 'kite', price: 345 }, { kind: 'ball', price: 280 }]} />,
    question: 'Mennyibe kerül együtt a sárkány és a labda?',
    options: ['625 Ft', '525 Ft', '615 Ft', '725 Ft'],
    correctAnswer: 0,
    explanation: 'Egyesek: 5 meg 0 az 5. Tízesek: 4 meg 8 az 12, leírom a 2-t, maradt 1. Százasok: 3 meg 2 az 5, meg 1 az 6. Együtt 625 Ft.'
  },
  {
    id: 'wa1k-q8',
    level: 1,
    questionTypeBadge: 'Három tag',
    figure: <ColQ addends={[506, 87, 249]} result="???" />,
    question: 'Számold ki írásban!',
    options: ['842', '722', '832', '852'],
    correctAnswer: 0,
    explanation: 'Egyesek: 6 meg 7 meg 9 az 22, leírom a 2-t, maradt 2. Tízesek: 0 meg 8 meg 4 az 12, meg 2 az 14, maradt 1. Százasok: 5 meg 2 az 7, meg 1 az 8. Az összeg 842.'
  },
  {
    id: 'wa1k-q9',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    figure: <DataQ rows={[['mesekönyv', '450 db'], ['ismeretterjesztő', '375 db'], ['összesen', '? db']]} />,
    question: 'A könyvtárban 450 mesekönyv és 375 ismeretterjesztő könyv van. Hány könyv van összesen?',
    options: ['825', '725', '815', '835'],
    correctAnswer: 0,
    explanation: '450 + 375: 0 meg 5 az 5. 5 meg 7 az 12, leírom a 2-t, maradt 1. 4 meg 3 az 7, meg 1 az 8. Összesen 825 könyv.'
  },
  {
    id: 'wa1k-q10',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Hogyan ellenőrizheted a 248 + 175 + 396 összeadást?',
    options: ['Alulról felfelé is összeadom.', 'Kivonom a tagokat egymásból.', 'Csak az egyeseket nézem meg.', 'Minden tagot 10-zel növelem.'],
    correctAnswer: 0,
    explanation: 'A tagok sorrendje nem számít. Ha alulról felfelé is összeadod, ugyanannak kell kijönnie: 819.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'wa1k-q11',
    level: 2,
    questionTypeBadge: 'Négy tag',
    figure: <ColQ addends={[125, 238, 146, 327]} result="???" />,
    question: 'Mennyi a négy tag összege?',
    options: ['836', '716', '826', '846'],
    correctAnswer: 0,
    explanation: 'Egyesek: 5 meg 8 meg 6 meg 7 az 26, leírom a 6-ot, maradt 2. Tízesek: 2 meg 3 meg 4 meg 2 az 11, meg 2 az 13, maradt 1. Százasok: 1 meg 2 meg 1 meg 3 az 7, meg 1 az 8. Az összeg 836.'
  },
  {
    id: 'wa1k-q12',
    level: 2,
    questionTypeBadge: 'Maradt 2',
    figure: <ColQ addends={[389, 296, 245]} result="???" />,
    question: 'Számold ki írásban!',
    options: ['930', '710', '820', '830'],
    correctAnswer: 0,
    explanation: 'Egyesek: 9 meg 6 meg 5 az 20, leírom a 0-t, maradt 2. Tízesek: 8 meg 9 meg 4 az 21, meg 2 az 23, leírom a 3-at, maradt 2. Százasok: 3 meg 2 meg 2 az 7, meg 2 az 9. Az összeg 930.'
  },
  {
    id: 'wa1k-q13',
    level: 2,
    questionTypeBadge: 'Hiányzó jegy',
    figure: <ColQ addends={['4?7', 286]} result={753} />,
    question: 'Melyik számjegy hiányzik?',
    options: ['6', '7', '5', '3'],
    correctAnswer: 0,
    explanation: 'Egyesek: 7 meg 6 az 13, maradt 1. Százasok: 4 meg 2 az 6, de 7 áll alatta, tehát a tízeseknél 1 maradt. Tízesek: ? meg 8, meg 1 = 15. ? = 6. Ellenőrzés: 467 + 286 = 753.'
  },
  {
    id: 'wa1k-q14',
    level: 2,
    questionTypeBadge: 'Pont 1000',
    figure: <ColQ addends={[694, 306]} cols={4} />,
    question: 'Hány jegyű lesz az összeg?',
    options: ['négyjegyű', 'háromjegyű', 'kétjegyű', 'egyjegyű'],
    correctAnswer: 0,
    explanation: '694 + 306 = 1000. A százasok után is marad 1, ez az ezresek helyére kerül. Az 1000 négyjegyű szám.'
  },
  {
    id: 'wa1k-q15',
    level: 2,
    questionTypeBadge: 'Pótlás 1000-re',
    figure: <ColQ addends={[640, '???']} result={1000} cols={4} />,
    question: 'Melyik számot kell a 640-hez adni, hogy 1000 legyen?',
    options: ['360', '460', '350', '260'],
    correctAnswer: 0,
    explanation: '640 + 360 = 1000. Ellenőrzés: 0 meg 0 az 0. 4 meg 6 az 10, maradt 1. 6 meg 3 az 9, meg 1 az 10, maradt 1. Az 1 az ezresek helyére kerül.'
  },
  {
    id: 'wa1k-q16',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <TagsQ items={[{ kind: 'mug', price: 285 }, { kind: 'jar', price: 190 }, { kind: 'bear', price: 345 }]} />,
    question: 'Mennyibe kerül a három dolog együtt?',
    options: ['820 Ft', '610 Ft', '720 Ft', '830 Ft'],
    correctAnswer: 0,
    explanation: 'Egyesek: 5 meg 0 meg 5 az 10, maradt 1. Tízesek: 8 meg 9 meg 4 az 21, meg 1 az 22, leírom a 2-t, maradt 2. Százasok: 2 meg 1 meg 3 az 6, meg 2 az 8. Együtt 820 Ft.'
  },
  {
    id: 'wa1k-q17',
    level: 2,
    questionTypeBadge: 'Hibavadász',
    figure: <ColQ addends={[357, 268, 194]} result={719} note="Egy gyerek ezt számolta." />,
    question: 'Mi a hiba?',
    options: ['A tízeseknél 2 maradt, nem 1.', 'Az egyeseknél hibázott.', 'Jó az eredmény.', 'Rosszul írta egymás alá a tagokat.'],
    correctAnswer: 0,
    explanation: 'Tízesek: 5 meg 6 meg 9 az 20, meg 1 az 21. Leírom az 1-et, maradt 2. A százasoknál 6 meg 2 az 8. A jó eredmény 819.'
  },
  {
    id: 'wa1k-q18',
    level: 2,
    questionTypeBadge: 'Pont 1000',
    question: 'Melyik összeadás eredménye pont 1000?',
    options: ['458 + 542', '458 + 532', '448 + 542', '468 + 522'],
    correctAnswer: 0,
    explanation: '458 + 542: 8 meg 2 az 10, maradt 1. 5 meg 4 az 9, meg 1 az 10, maradt 1. 4 meg 5 az 9, meg 1 az 10. Ez 1000. A többi 990.'
  },
  {
    id: 'wa1k-q19',
    level: 2,
    questionTypeBadge: 'Három tag',
    figure: <ColQ addends={[275, 348, 377]} result="????" cols={4} />,
    question: 'Mennyi az összeg?',
    options: ['1000', '880', '990', '900'],
    correctAnswer: 0,
    explanation: 'Egyesek: 5 meg 8 meg 7 az 20, maradt 2. Tízesek: 7 meg 4 meg 7 az 18, meg 2 az 20, maradt 2. Százasok: 2 meg 3 meg 3 az 8, meg 2 az 10. Az összeg 1000.'
  },
  {
    id: 'wa1k-q20',
    level: 2,
    questionTypeBadge: 'Tízesek',
    figure: <ColQ addends={[186, 357, 279]} result=" ?2" carries={[null, 2]} highlight={1} />,
    question: 'Az egyeseknél maradt 2. Melyik jegyet írod le a tízesek helyére?',
    options: ['2', '0', '1', '3'],
    correctAnswer: 0,
    explanation: 'Tízesek: 8 meg 5 meg 7 az 20, meg 2 az 22. Leírom a 2-t, maradt 2. (Az összeg 822.)'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'wa1k-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <DataQ rows={[['hétfő', '264 fő'], ['kedd', '187 fő'], ['szerda', '349 fő'], ['összesen', '? fő']]} />,
    question: 'Egy múzeumba hétfőn 264, kedden 187, szerdán 349 látogató érkezett. Hányan voltak összesen?',
    options: ['800', '680', '790', '900'],
    correctAnswer: 0,
    explanation: 'Egyesek: 4 meg 7 meg 9 az 20, maradt 2. Tízesek: 6 meg 8 meg 4 az 18, meg 2 az 20, maradt 2. Százasok: 2 meg 1 meg 3 az 6, meg 2 az 8. Összesen 800 látogató.'
  },
  {
    id: 'wa1k-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <TwoDaysQ />,
    question: 'Egy család az első napon 346 km-t autózott. A második napon 158 km-rel többet. Hány km-t tettek meg a két nap alatt?',
    options: ['850 km', '504 km', '750 km', '840 km'],
    correctAnswer: 0,
    explanation: 'Második nap: 346 + 158 = 504 km. A két nap együtt: 346 + 504 = 850 km.'
  },
  {
    id: 'wa1k-q23',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <EqQ parts={['386', '+', '427', '+', '100', '=', '?']} />,
    question: 'Melyik számra gondoltam? A 386 és a 427 összegénél 100-zal nagyobb.',
    options: ['913', '813', '803', '923'],
    correctAnswer: 0,
    explanation: 'Az összeg: 386 + 427 = 813. Ennél 100-zal nagyobb: 913.'
  },
  {
    id: 'wa1k-q24',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsQ ds={[1, 4, 6]} />,
    question: 'Rakd ki a legnagyobb és a legkisebb háromjegyű számot a kártyákból! Mennyi a kettő összege?',
    options: ['787', '641', '777', '797'],
    correctAnswer: 0,
    explanation: 'A legnagyobb: 641, a legkisebb: 146. 641 + 146 = 787.'
  },
  {
    id: 'wa1k-q25',
    level: 3,
    questionTypeBadge: 'Hiányzó jegy',
    figure: <ColQ addends={[258, '3?4']} result={632} />,
    question: 'Melyik számjegy hiányzik?',
    options: ['7', '6', '8', '3'],
    correctAnswer: 0,
    explanation: 'Egyesek: 8 meg 4 az 12, maradt 1. Tízesek: 5 meg ? meg 1-nek 13-nak kell lennie (3 áll alatta, és a százasoknál 2 meg 3 meg 1 az 6). 5 + 7 + 1 = 13, tehát ? = 7. Ellenőrzés: 258 + 374 = 632.'
  },
  {
    id: 'wa1k-q26',
    level: 3,
    questionTypeBadge: 'Elég a pénz?',
    figure: <TagsQ items={[{ kind: 'car', price: 365 }, { kind: 'book', price: 248 }, { kind: 'plant', price: 379 }]} />,
    question: 'Van 1000 Ft-od. Megveheted mind a hármat?',
    options: ['Igen, mert 992 Ft-ba kerül.', 'Nem, mert több, mint 1000 Ft.', 'Igen, mert 872 Ft-ba kerül.', 'Igen, mert 982 Ft-ba kerül.'],
    correctAnswer: 0,
    explanation: '365 + 248 + 379: egyesek 22, maradt 2. Tízesek: 6 meg 4 meg 7 az 17, meg 2 az 19, maradt 1. Százasok: 8, meg 1 az 9. 992 Ft. Ez nem több 1000 Ft-nál, elég a pénz.'
  },
  {
    id: 'wa1k-q27',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <SeqQ items={['164', '321', '478', '?']} />,
    question: 'Mindig ugyanannyit adunk hozzá. Melyik szám jön?',
    options: ['635', '625', '535', '645'],
    correctAnswer: 0,
    explanation: '321 − 164 = 157, és 478 − 321 = 157. Tehát mindig 157-et adunk hozzá: 478 + 157 = 635.'
  },
  {
    id: 'wa1k-q28',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Az egyik dobozban 375 gyöngy van, a másikban 148-cal több. Hány gyöngy van a két dobozban együtt?',
    options: ['898', '523', '798', '888'],
    correctAnswer: 0,
    explanation: 'A második dobozban: 375 + 148 = 523 gyöngy. Együtt: 375 + 523 = 898 gyöngy.'
  },
  {
    id: 'wa1k-q29',
    level: 3,
    questionTypeBadge: 'Hibavadász',
    question: 'Melyik összeadás eredménye HIBÁS?',
    options: ['268 + 345 = 623', '197 + 406 = 603', '358 + 274 = 632', '429 + 381 = 810'],
    correctAnswer: 0,
    explanation: '268 + 345: 8 meg 5 az 13, maradt 1. 6 meg 4 az 10, meg 1 az 11, maradt 1. 2 meg 3 az 5, meg 1 az 6. Az eredmény 613, nem 623.'
  },
  {
    id: 'wa1k-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <GoalQ />,
    question: 'Három osztály papírt gyűjtött: 185 kg, 237 kg és 209 kg. A cél 700 kg volt. Elérték a célt?',
    options: ['Nem, csak 631 kg lett.', 'Igen, 731 kg lett.', 'Nem, csak 621 kg lett.', 'Igen, pont 700 kg lett.'],
    correctAnswer: 0,
    explanation: 'Egyesek: 5 meg 7 meg 9 az 21, maradt 2. Tízesek: 8 meg 3 meg 0 az 11, meg 2 az 13, maradt 1. Százasok: 1 meg 2 meg 2 az 5, meg 1 az 6. 631 kg, ez kevesebb, mint 700 kg.'
  }
];

export const WrittenAdd1000G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-muveletek-1000-ig"
    topicId="g3-wops-osszeadas-quiz"
    subtopicId="irasbeli-osszeadas-1000-ig"
    title="1. Írásbeli összeadás 1000-ig – Kvíz"
    subtitle="30 feladat 3 szinten: több tag, maradt 2, pont 1000, becslés, ellenőrzés, szöveges feladatok."
    badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • KVÍZ"
    questions={WRITTEN_ADD_1000_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Lépések', items: ['Egymás alá, helyi érték szerint', 'Egyesek → tízesek → százasok', 'Az utolsó jegyet írd le, a többi a maradék'] },
      { title: 'Maradék', items: ['10–19: maradt 1', '20–29: maradt 2', 'A maradékot a következő oszlophoz adod', 'A százasok után maradt 1: ezresek helyére, 1000'] },
      { title: 'Ellenőrzés', items: ['Becslés: kerekíts százasra!', 'Add össze alulról felfelé is', 'Ugyanannak kell kijönnie'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<WrittenAdd1000G3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<WrittenAdd1000G3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default WrittenAdd1000G3Quiz;
