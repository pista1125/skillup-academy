import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { SpeedTrainSvg, EqualQuotientsSvg, DoublingChainSvg, SpoonsHalvingSvg, GardenersTableSvg } from './Relations4Figures';

// ---------------------------------------------------------------------------
// Labor I – Következtetés táblázattal
// ---------------------------------------------------------------------------
type TableScenario = {
  id: string;
  title: string;
  story: string;
  topLabel: string;
  bottomLabel: string;
  given: [number, number];
  cols: { top: number; ans: number }[];
  hint: string;
};

export const TABLE_SCENARIOS: TableScenario[] = [
  {
    id: 'train',
    title: 'Gyorsvonat',
    story: 'A vonat 1 óra alatt 600 km-t tesz meg. Mekkora utat tesz meg több óra alatt?',
    topLabel: 'Idő (óra)',
    bottomLabel: 'Út (km)',
    given: [1, 600],
    cols: [
      { top: 2, ans: 1200 },
      { top: 3, ans: 1800 },
      { top: 4, ans: 2400 },
      { top: 5, ans: 3000 },
      { top: 6, ans: 3600 }
    ],
    hint: 'Kétszer annyi idő alatt kétszer annyi utat tesz meg: szorozd meg a 600-at az órák számával!'
  },
  {
    id: 'balloon',
    title: 'Hajtogatós lufi',
    story: '10 lufi ára 600 Ft. Hány lufit kapsz a különböző összegekért?',
    topLabel: 'Összeg (Ft)',
    bottomLabel: 'Lufi (db)',
    given: [600, 10],
    cols: [
      { top: 60, ans: 1 },
      { top: 300, ans: 5 },
      { top: 360, ans: 6 },
      { top: 180, ans: 3 },
      { top: 540, ans: 9 }
    ],
    hint: '1 lufi ára 600 : 10 = 60 Ft. Nézd meg, hányszor van meg a 60 az összegben!'
  },
  {
    id: 'game',
    title: 'Társasjáték Évinek',
    story: 'A társasjáték 4080 Ft. A barátok egyenlően fizetnek. Mennyit ad egy barát?',
    topLabel: 'Barátok (fő)',
    bottomLabel: 'Egy barát (Ft)',
    given: [1, 4080],
    cols: [
      { top: 10, ans: 408 },
      { top: 5, ans: 816 },
      { top: 2, ans: 2040 },
      { top: 4, ans: 1020 },
      { top: 8, ans: 510 }
    ],
    hint: 'Itt fordítva van: kétszer annyi barát → feleannyi pénz fejenként. Oszd el a 4080-at a barátok számával!'
  },
  {
    id: 'plants',
    title: 'Virágpalánták',
    story: '240 palántát ültetnek el. Mindenki ugyanannyit ültet. Hány palánta jut egy kertészre?',
    topLabel: 'Kertészek (fő)',
    bottomLabel: 'Palánta / fő',
    given: [1, 240],
    cols: [
      { top: 2, ans: 120 },
      { top: 3, ans: 80 },
      { top: 4, ans: 60 },
      { top: 5, ans: 48 },
      { top: 6, ans: 40 },
      { top: 10, ans: 24 }
    ],
    hint: 'Több kertész → kevesebb palánta fejenként. Oszd el a 240-et a kertészek számával!'
  }
];

const TableLab: React.FC = () => {
  const [sid, setSid] = useState(0);
  const sc = TABLE_SCENARIOS[sid];
  const [vals, setVals] = useState<string[]>(() => sc.cols.map(() => ''));
  const [checked, setChecked] = useState(false);

  const pick = (i: number) => {
    setSid(i);
    setVals(TABLE_SCENARIOS[i].cols.map(() => ''));
    setChecked(false);
  };

  const okAt = (i: number) => Number(vals[i]) === sc.cols[i].ans && vals[i].trim() !== '';
  const allOk = sc.cols.every((_, i) => okAt(i));

  return (
    <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {TABLE_SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => pick(i)}
            className={`px-4 py-2 rounded-xl text-sm font-black ${i === sid ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {s.title}
          </button>
        ))}
      </div>
      <p className="text-sm font-bold text-slate-700">{sc.story}</p>
      <div className="overflow-x-auto">
        <table className="border-collapse text-center text-base">
          <tbody>
            <tr>
              <th className="border-2 border-teal-300 bg-teal-50 px-3 py-2 text-sm">{sc.topLabel}</th>
              <td className="border-2 border-teal-300 px-3 py-2 font-black">{sc.given[0]}</td>
              {sc.cols.map((c) => (
                <td key={c.top} className="border-2 border-teal-300 px-3 py-2 font-black">
                  {c.top}
                </td>
              ))}
            </tr>
            <tr>
              <th className="border-2 border-teal-300 bg-teal-50 px-3 py-2 text-sm">{sc.bottomLabel}</th>
              <td className="border-2 border-teal-300 px-3 py-2 font-black text-teal-700">{sc.given[1]}</td>
              {sc.cols.map((c, i) => (
                <td key={c.top} className="border-2 border-teal-300 p-1">
                  <input
                    inputMode="numeric"
                    aria-label={`${sc.bottomLabel} ${c.top}`}
                    value={vals[i]}
                    onChange={(e) => {
                      const v = [...vals];
                      v[i] = e.target.value.replace(/[^0-9]/g, '');
                      setVals(v);
                      setChecked(false);
                    }}
                    className={`w-20 h-12 text-center text-lg font-black rounded-lg border-2 outline-none ${
                      !checked ? 'border-slate-300' : okAt(i) ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50'
                    }`}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setChecked(true)} className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black">
          Ellenőrzöm
        </button>
        <button
          onClick={() => {
            setVals(sc.cols.map(() => ''));
            setChecked(false);
          }}
          className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
        >
          Törlöm
        </button>
      </div>
      {checked && allOk && (
        <TheoryCallout type="success" title="Minden mező jó! 🎉">
          Ügyesen következtettél. Próbáld ki a többi történetet is!
        </TheoryCallout>
      )}
      {checked && !allOk && (
        <TheoryCallout type="warning" title="Van még piros mező">
          {sc.hint}
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Szorzat- és hányadosőrző
// ---------------------------------------------------------------------------
type KeeperMode = 'mul' | 'div';
const MUL_STARTS: [number, number][] = [
  [600, 8],
  [300, 9],
  [3600, 2],
  [1600, 4]
];
const DIV_STARTS: [number, number][] = [
  [120, 40],
  [240, 60],
  [1200, 40]
];

/** Elvégezhető-e a lépés egész számokkal, 10 000-es számkörben? */
export const canApply = (v: number, op: string): boolean => {
  const [sign, k] = [op[0], Number(op.slice(1))];
  if (sign === '·') return v * k <= 10000;
  return v % k === 0;
};
export const applyOp = (v: number, op: string): number => {
  const k = Number(op.slice(1));
  return op[0] === '·' ? v * k : v / k;
};

const KEEPER_OPS = ['·2', ':2', '·3', ':3', '·10', ':10'];

const KeeperLab: React.FC = () => {
  const [mode, setMode] = useState<KeeperMode>('mul');
  const [startIdx, setStartIdx] = useState(0);
  const starts = mode === 'mul' ? MUL_STARTS : DIV_STARTS;
  const start = starts[Math.min(startIdx, starts.length - 1)];
  const [a, setA] = useState(start[0]);
  const [b, setB] = useState(start[1]);
  const [found, setFound] = useState<string[]>([]);
  const target = mode === 'mul' ? start[0] * start[1] : start[0] / start[1];
  const value = mode === 'mul' ? a * b : b !== 0 && a % b === 0 ? a / b : null;
  const sign = mode === 'mul' ? '·' : ':';

  const reset = (m: KeeperMode, i: number) => {
    const s = (m === 'mul' ? MUL_STARTS : DIV_STARTS)[i];
    setMode(m);
    setStartIdx(i);
    setA(s[0]);
    setB(s[1]);
    setFound([]);
  };

  const change = (which: 'a' | 'b', op: string) => {
    const na = which === 'a' ? applyOp(a, op) : a;
    const nb = which === 'b' ? applyOp(b, op) : b;
    setA(na);
    setB(nb);
    const v = mode === 'mul' ? na * nb : na % nb === 0 ? na / nb : null;
    const key = `${na} ${sign} ${nb}`;
    if (v === target && !(na === start[0] && nb === start[1]) && !found.includes(key)) setFound([...found, key]);
  };

  const opButtons = (which: 'a' | 'b', v: number) => (
    <div className="grid grid-cols-3 gap-1.5">
      {KEEPER_OPS.map((op) => {
        const ok = canApply(v, op) && !(which === 'b' && op[0] === ':' && v / Number(op.slice(1)) < 1);
        return (
          <button
            key={op}
            disabled={!ok}
            onClick={() => change(which, op)}
            className={`h-11 rounded-xl text-base font-black border-2 ${
              ok ? 'bg-white border-teal-300 text-teal-800 hover:bg-teal-50' : 'bg-slate-100 border-slate-200 text-slate-300'
            }`}
          >
            {op.replace('·', '· ').replace(':', ': ')}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => reset('mul', 0)}
          className={`px-4 py-2 rounded-xl text-sm font-black ${mode === 'mul' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Szorzatőrző
        </button>
        <button
          onClick={() => reset('div', 0)}
          className={`px-4 py-2 rounded-xl text-sm font-black ${mode === 'div' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Hányadosőrző
        </button>
        <span className="w-4" />
        {starts.map((s, i) => (
          <button
            key={i}
            onClick={() => reset(mode, i)}
            className={`px-3 py-2 rounded-xl text-sm font-bold ${i === startIdx ? 'bg-amber-100 text-amber-900 border-2 border-amber-400' : 'bg-slate-50 text-slate-600 border-2 border-slate-200'}`}
          >
            {s[0]} {sign} {s[1]}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600">
        {mode === 'mul'
          ? `Változtasd meg a tényezőket úgy, hogy a szorzat ${target} maradjon! Keress legalább 3 új megoldást!`
          : `Változtasd meg az osztandót és az osztót úgy, hogy a hányados ${target} maradjon! Keress legalább 3 új megoldást!`}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 text-center">{mode === 'mul' ? '1. tényező' : 'osztandó'}</div>
          <div className="text-3xl font-black text-center text-slate-800">{a}</div>
          {opButtons('a', a)}
        </div>
        <div className="text-4xl font-black text-amber-600 text-center">{sign}</div>
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 text-center">{mode === 'mul' ? '2. tényező' : 'osztó'}</div>
          <div className="text-3xl font-black text-center text-slate-800">{b}</div>
          {opButtons('b', b)}
        </div>
      </div>
      <div
        className={`text-center text-lg font-black rounded-xl p-3 ${
          value === target ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-300' : 'bg-rose-50 text-rose-700 border-2 border-rose-300'
        }`}
      >
        {a} {sign} {b} = {value === null ? 'nem egész szám' : value}{' '}
        {value === target ? '✔ ugyanannyi!' : `✘ nem ${target} – javítsd ki a másik számmal!`}
      </div>
      <div className="text-sm text-slate-700">
        <strong>Megtalált megoldások ({found.length}):</strong> {found.length ? found.join(';  ') : 'még nincs'}
      </div>
      {found.length >= 3 && (
        <TheoryCallout type="success" title="Szuper! 🎉">
          {mode === 'mul'
            ? 'Ha az egyik tényezőt valahányszorosára növeled, a másikat ugyanannyiad részére kell csökkentened.'
            : 'Ha az osztandót és az osztót is ugyanannyiszorosára változtatod, a hányados nem változik.'}
        </TheoryCallout>
      )}
    </div>
  );
};

export const Relations4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId="g4-written-ops"
      subtopicId="osszefuggesek-kovetkeztetesek"
      title="5. Összefüggések, következtetések"
      subtitle="Egyről többre, többről egyre: táblázatok, nyíldiagramok, változatlan szorzat és hányados."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TANANYAG"
      themeColor="teal"
      pdfFilename="4_osztaly_osszefuggesek_kovetkeztetesek_tananyag.pdf"
      practiceTitle="Készen állsz a következtetéses feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — HOGYAN KÖVETKEZTETÜNK?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center">
              <span className="font-mono text-base font-black text-teal-900 dark:text-teal-200">12 kanál → 768 Ft &nbsp; | : 2 &nbsp; 6 kanál → 384 Ft</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kétszer annyi idő alatt kétszer annyi utat tesz meg a vonat.</li>
              <li>Kétszer annyi kertész között feleannyi palánta jut egy kertészre.</li>
              <li>A szorzat nem változik: az egyik tényező kétszerese, a másik fele (600 · 8 = 1200 · 4).</li>
              <li>A hányados nem változik: az osztandó és az osztó is tízszerese (12 : 4 = 120 : 40).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 103. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Sok feladatban két mennyiség <strong>összefügg</strong> egymással: az idő és a megtett út, a darabszám és az ár, a dolgozók száma és az egy főre jutó munka.
            </p>
            <p>
              Ha ismerjük az összefüggést, egy adatból <strong>következtetni</strong> tudunk a többire. Ehhez legtöbbször egy <strong>táblázat</strong> vagy egy <strong>nyíldiagram</strong> segít.
            </p>
            <TheoryCallout type="info" title="Egyről többre">
              A japán gyorsvonat 1 óra alatt 600 km-t tenne meg. 2 óra alatt 2 · 600 = 1200 km-t, 6 óra alatt 6 · 600 = 3600 km-t.
            </TheoryCallout>
          </div>
          <SpeedTrainSvg />
        </div>
      </TheorySection>

      {/* 2. Nézzük meg együtt */}
      <TheorySection title="2. Nézzük meg együtt! Vonat, kanál, akvárium" badge="Tankönyv 103–104. o." badgeColor="indigo">
        <TheoryTable
          headers={['Feladat', 'Gondolatmenet', 'Eredmény']}
          rows={[
            ['Mennyi idő alatt tesz meg a vonat 5400 km-t?', '5400 km-ben hányszor van meg a 600 km? 5400 : 600', '9 óra'],
            ['Hány perc alatt ér a vonat 300 km-re?', '300 km a 600 km fele → fél óra', '30 perc'],
            ['12 kiskanál 768 Ft. Mennyi 6 kiskanál?', 'Feleannyi kanál → feleannyi pénz: 768 : 2', '384 Ft'],
            ['900 dl-es akvárium 9 perc alatt telik meg. Mennyi víz folyik 1 perc alatt?', '900 dl : 9', '100 dl'],
            ['Mennyi idő alatt telik meg a 100 l-es akvárium?', '100 l = 1000 dl, 1000 dl : 100 dl', '10 perc'],
            ['A metró 3 percenként jár, egy szerelvényben 1023 utas fér el. Hány utas utazhat negyedóra alatt?', '15 perc : 3 = 5 szerelvény, 5 · 1023', '5115 utas']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SpoonsHalvingSvg />
          <TheoryCard title="Nyíldiagram: kétszerese, négyszerese" badge="4. feladat" badgeColor="orange">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha egy szám kétszerese 1500, akkor a szám 1500 : 2 = <strong>750</strong>. A négyszerese a kétszeresének kétszerese: 1500 · 2 = <strong>3000</strong>. A nyolcszorosa a négyszeresének kétszerese: 3000 · 2 = <strong>6000</strong>.
            </p>
            <DoublingChainSvg className="w-full h-auto mt-3" />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szorzat és hányados */}
      <TheorySection title="3. Mikor nem változik a szorzat és a hányados?" badge="Tankönyv 103. o., 2–3. feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <EqualQuotientsSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryCard title="Hányados" badge="2. feladat" badgeColor="sky">
              <p>
                Ha az osztandót és az osztót is ugyanannyiszorosára változtatjuk, a hányados <strong>nem változik</strong>: 12 : 4 = 120 : 40 = 1200 : 400 = 3. Ugyanígy 12 : 3 = 120 : 30 = 240 : 60 = 4.
              </p>
            </TheoryCard>
            <TheoryCard title="Szorzat" badge="3. feladat" badgeColor="emerald">
              <p>
                Ha az egyik tényezőt kétszeresére növeljük, a másikat a felére csökkentjük, a szorzat <strong>nem változik</strong>: 600 · 8 = 1200 · 4 = 2400 · 2 = 4800. Hasonlóan 300 · 9 = 900 · 3 = 2700.
              </p>
            </TheoryCard>
            <p>
              Lépésenként is oszthatunk: 456 : 2 = 228, 228 : 3 = 76 – ez ugyanaz, mint egyszerre 456 : 6 = 76.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 4. Fordított összefüggés, kiszámítható-e */}
      <TheorySection title="4. Több kertész, kevesebb munka – és van elég adat?" badge="Tankönyv 104. o., 6–7. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GardenersTableSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              240 palántát ültetnek. 2 kertész esetén egy kertész 120-at ültet, 4 kertész esetén 60-at, 10 kertész esetén csak 24-et. Itt <strong>kétszer annyi kertész → feleannyi palánta</strong> jut egy kertészre.
            </p>
            <TheoryCallout type="tip" title="Kiszámítható-e?">
              Mielőtt számolsz, nézd meg, van-e elég adat! „Hétfőn 236 utas utazott – hányan utaztak egy hét alatt?” Ezt nem lehet kiszámolni, mert a többi napon más lehet az utasok száma. A komp viszont kiszámolható: napi 4 oda-vissza út = 8 út, 3 km 208 m = 3208 m, 3208 m : 8 = <strong>401 m</strong> a két állomás távolsága.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 5. Vigyázz */}
      <TheorySection title="5. Vigyázz! Nem mindig „kétszer annyi”" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Szorzott, pedig osztania kellett volna"
          wrong="240 palánta, 4 kertész → 240 · 4 = 960 palánta fejenként"
          wrongExplanation="Azt gondolta, hogy több kertész esetén több palánta jut egy emberre. Pedig a palánták száma ugyanannyi marad, csak többen osztoznak rajta."
          correct="240 palánta, 4 kertész → 240 : 4 = 60 palánta fejenként"
          correctExplanation="Több kertész között feleannyi, harmadannyi … palánta jut egy főre: osztunk."
          tip="Kérdezd meg magadtól: ha nő az egyik mennyiség, akkor a másik nő vagy csökken?"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Játékos labor I: Töltsd ki a táblázatot!" badge="Labor" badgeColor="teal">
        <p className="text-sm text-slate-600">Válassz egy történetet, írd be a hiányzó számokat, aztán nyomd meg az „Ellenőrzöm” gombot!</p>
        <TableLab />
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Játékos labor II: Szorzatőrző és hányadosőrző" badge="Labor" badgeColor="amber">
        <p className="text-sm text-slate-600">
          A gombokkal változtasd a számokat! Ha az egyiket megváltoztattad, a másikkal hozd helyre úgy, hogy az eredmény ugyanannyi legyen!
        </p>
        <KeeperLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Relations4Theory;
