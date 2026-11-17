import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  FiveHundredsSvg,
  TensBoardSvg,
  Blocks347Svg,
  Abacus263Svg,
  PlaceValue405Svg,
  ExchangeSvg,
  NumberLine500Svg,
  DigitCardsSvg
} from './Numbers500G3Figures';
import { FONT, UNK, BlockRow, blockRowWidth } from './Numbers500G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
/** Névelő a szám elé: „az 5”, „az 500”, „a 340”. */
const art = (n: number) => (String(n)[0] === '5' || n === 1 ? 'az' : 'a');
const Art = (n: number) => (art(n) === 'az' ? 'Az' : 'A');

// ---------------------------------------------------------------------------
// Labor I – Rendetlen kupac: váltsd be, aztán mondd meg a számot!
// ---------------------------------------------------------------------------
interface Pile { sz: number; t: number; e: number }
const pileValue = (p: Pile) => p.sz * 100 + p.t * 10 + p.e;

const makePile = (): Pile => {
  for (;;) {
    const sz = rnd(0, 3);
    const t = rnd(sz === 0 ? 12 : 4, 16);
    const e = Math.random() < 0.6 ? rnd(10, 16) : rnd(0, 9);
    const p = { sz, t, e };
    const v = pileValue(p);
    if (v >= 101 && v <= 500 && (t >= 10 || e >= 10)) return p;
  }
};

const pileOptions = (p: Pile): number[] => {
  const v = pileValue(p);
  const wrong = [
    p.sz * 100 + (p.t % 10) * 10 + (p.e % 10), // a beváltott tízest / százast elfelejti
    v - 100,
    v + 10,
    v - 10,
    v + 100
  ].filter((w) => w !== v && w >= 0 && w <= 500);
  const out = [v];
  for (const w of wrong) if (!out.includes(w) && out.length < 4) out.push(w);
  return shuffle(out);
};

const pileScale = (p: Pile) => {
  let s = 6;
  while (s > 2.6 && blockRowWidth(p.sz, p.t, p.e, s) > 320) s -= 0.2;
  return s;
};

// ---------------------------------------------------------------------------
// Labor II – Hol lakik a szám? (számegyenes)
// ---------------------------------------------------------------------------
type LineMode = 'kozel' | 'messze';
interface LineTask { lo: number; step: number; target: number }
const makeLineTask = (mode: LineMode): LineTask => {
  if (mode === 'kozel') {
    const lo = rnd(0, 4) * 100;
    let k = rnd(1, 9);
    while (k === 5) k = rnd(1, 9);
    return { lo, step: 10, target: lo + k * 10 };
  }
  const k = [1, 3, 5, 7, 9][rnd(0, 4)];
  return { lo: 0, step: 50, target: k * 50 };
};

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[72px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const Numbers500G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [pile, setPile] = useState<Pile>({ sz: 2, t: 13, e: 12 });
  const [start, setStart] = useState<Pile>({ sz: 2, t: 13, e: 12 });
  const [opts, setOpts] = useState<number[]>([342, 232, 352, 242]);
  const [picked, setPicked] = useState<number | null>(null);
  const [pileMsg, setPileMsg] = useState<string>('');
  const pv = pileValue(pile);
  const tidy = pile.t < 10 && pile.e < 10;
  const solved = picked === pv;
  const newPile = () => {
    const p = makePile();
    setPile(p);
    setStart(p);
    setOpts(pileOptions(p));
    setPicked(null);
    setPileMsg('');
  };
  const pickPile = (v: number) => {
    if (solved) return;
    setPicked(v);
    if (v === pv) {
      setPileMsg('');
      return;
    }
    const forgot = pile.sz * 100 + (pile.t % 10) * 10 + (pile.e % 10);
    if (!tidy) setPileMsg('Előbb váltsd be! Ha 10 vagy több rúd vagy kocka van, nyomd meg a zöld gombot.');
    else if (v === forgot) setPileMsg('A beváltott rudat vagy lapot is számold!');
    else setPileMsg(`Számold meg újra: ${pile.sz} lap, ${pile.t} rúd, ${pile.e} kocka.`);
  };
  const s1 = pileScale(pile);
  const w1 = blockRowWidth(pile.sz, pile.t, pile.e, s1);

  // ---- Labor II ----
  const [mode, setMode] = useState<LineMode>('kozel');
  const [lt, setLt] = useState<LineTask>({ lo: 300, step: 10, target: 370 });
  const [tap, setTap] = useState<number | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const lineDone = tap === lt.target;
  const newLine = (m: LineMode = mode) => {
    let t = makeLineTask(m);
    while (t.target === lt.target) t = makeLineTask(m);
    setMode(m);
    setLt(t);
    setTap(null);
  };
  const tapTick = (v: number) => {
    if (lineDone) return;
    setTap(v);
    setStreak((s) => (v === lt.target ? s + 1 : 0));
  };
  const LW = 340;
  const lx0 = 24;
  const lx1 = LW - 24;
  const ticks = Array.from({ length: 11 }, (_, i) => lt.lo + i * lt.step);
  const hi = lt.lo + 10 * lt.step;
  const LX = (v: number) => lx0 + ((lx1 - lx0) * (v - lt.lo)) / (hi - lt.lo);
  const labelSet = lt.step === 10 ? [lt.lo, lt.lo + 50, hi] : [0, 100, 200, 300, 400, 500];
  const diff = tap === null ? 0 : (lt.target - tap) / lt.step;

  return (
    <TheoryTemplate
      topicId="g3-count-500"
      subtopicId="szamok-500-ig"
      grade={3}
      chapterId="szamolas-500-ig"
      title="1. Számok 500-ig"
      subtitle="Százasok, tízesek, egyesek 500-ig: kirakás, golyós számoló, helyiérték, beváltás, számegyenes."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_szamok_500_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — SZÁZAS, TÍZES, EGYES',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              347 = 3 sz + 4 t + 7 e = 300 + 40 + 7
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>5 százas = <strong>500</strong>. Ez most a legnagyobb szám.</li>
              <li>10 egyes = 1 tízes. 10 tízes = 1 százas.</li>
              <li>Ha egy helyen nincs semmi, oda <strong>0</strong> kerül: 407.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 52–55. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>200-ig már tudsz számolni. Most továbbmegyünk <strong>500-ig</strong>!</p>
          <p>Jön a harmadik, a negyedik és az ötödik száz.</p>
          <p>Kirakjuk, leírjuk, összehasonlítjuk a számokat. Megtanulunk <strong>beváltani</strong> is.</p>
        </div>
      </TheorySection>

      {/* 2. Öt százas */}
      <TheorySection title="2. Öt százas" badge="100-tól 500-ig" badgeColor="amber">
        <FiveHundredsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Számolj százasával: <strong>100, 200, 300, 400, 500</strong>.</p>
          <p>Minden százban 100 szám van. Öt százban 500.</p>
        </div>
        <TensBoardSvg />
        <TheoryCallout type="info" title="A kerek tízesek táblája">
          Ebben a táblában minden szám kerek tízes. Jobbra lépsz: 10-zel több. Lefelé lépsz: 100-zal több. Melyik számok bújtak el? (340, 370, 460)
        </TheoryCallout>
      </TheorySection>

      {/* 3. Százas, tízes, egyes */}
      <TheorySection title="3. Kirakjuk a számot" badge="Lap, rúd, kocka" badgeColor="blue">
        <Blocks347Svg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Kocka" badge="1" badgeColor="amber">
            <p className="text-sm text-slate-700">Egy kis kocka 1-et ér. Ez az <strong>egyes</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Rúd" badge="10" badgeColor="blue">
            <p className="text-sm text-slate-700">Egy rúdban 10 kocka van. Ez a <strong>tízes</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Lap" badge="100" badgeColor="rose">
            <p className="text-sm text-slate-700">Egy lapban 10 rúd van. Ez a <strong>százas</strong>.</p>
          </TheoryCard>
        </div>
        <Abacus263Svg />
        <TheoryCallout type="tip" title="Golyós számoló">
          A piros golyó 100-at, a kék 10-et, a sárga 1-et ér. Számold meg a golyókat rudanként!
        </TheoryCallout>
      </TheorySection>

      {/* 4. Helyiérték */}
      <TheorySection title="4. Alaki érték, helyiérték, valódi érték" badge="Helyiérték-táblázat" badgeColor="purple">
        <PlaceValue405Svg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Alaki érték" badge="a jegy" badgeColor="slate">
            <p className="text-sm text-slate-700">A leírt számjegy. A 450-ben: 4, 5 és 0.</p>
          </TheoryCard>
          <TheoryCard title="Helyiérték" badge="a hely" badgeColor="purple">
            <p className="text-sm text-slate-700">Ahol a jegy áll: a százasok, a tízesek vagy az egyesek helye.</p>
          </TheoryCard>
          <TheoryCard title="Valódi érték" badge="amennyit ér" badgeColor="emerald">
            <p className="text-sm text-slate-700">A 450-ben az 5-ös a tízesek helyén áll. Ezért <strong>50</strong>-et ér.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Beváltás */}
      <TheorySection title="5. Beváltás" badge="10 → 1" badgeColor="emerald">
        <ExchangeSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Ha 10 rúd van, cseréld be <strong>1 lapra</strong>. Ha 10 kocka van, cseréld be <strong>1 rúdra</strong>.</p>
          <p>A szám nem változik, csak rendezettebb lesz.</p>
        </div>
        <TheoryTable
          headers={['Kupac', 'Beváltva', 'A szám']}
          rows={[
            ['1 sz + 12 t + 4 e', '2 sz + 2 t + 4 e', '224'],
            ['3 sz + 6 t + 13 e', '3 sz + 7 t + 3 e', '373'],
            ['26 t + 8 e', '2 sz + 6 t + 8 e', '268'],
            ['47 t', '4 sz + 7 t', '470']
          ]}
        />
      </TheorySection>

      {/* 6. Betűvel */}
      <TheorySection title="6. Számok betűvel" badge="Egy szóba írjuk" badgeColor="sky">
        <TheoryTable
          headers={['Számmal', 'Betűvel']}
          rows={[
            ['213', 'kétszáztizenhárom'],
            ['340', 'háromszáznegyven'],
            ['408', 'négyszáznyolc'],
            ['455', 'négyszázötvenöt'],
            ['500', 'ötszáz']
          ]}
        />
        <TheoryCallout type="info" title="Egybeírjuk!">
          Ezeket a számokat egy szóba írjuk: <strong>háromszáznegyven</strong>, nem „három száz negyven”.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Számegyenes, sorozatok */}
      <TheorySection title="7. Számegyenes és számsorok" badge="0–500" badgeColor="teal">
        <NumberLine500Svg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Egy kis osztás itt 10-et ér. A hosszabb vonalak az 50-esek.</p>
          <p>A 260 a 200 és a 300 között van, a 250 után jön.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Ötvenesével" badge="+50" badgeColor="teal">
            <p className="text-sm text-slate-700">0, 50, 100, 150, 200, 250, 300, …</p>
          </TheoryCard>
          <TheoryCard title="Harmincasával vissza" badge="−30" badgeColor="rose">
            <p className="text-sm text-slate-700">450, 420, 390, 360, 330, …</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 8. Számkártyák */}
      <TheorySection title="8. Számok kártyákból" badge="Számkártyák" badgeColor="purple">
        <DigitCardsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A 3, a 0 és a 4 kártyából <strong>négy</strong> háromjegyű számot rakhatsz ki.</p>
          <p>A 034 nem háromjegyű szám, mert 0-val kezdődik. Az csak 34.</p>
        </div>
      </TheorySection>

      {/* 9. Mintapéldák */}
      <TheorySection title="9. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) 3 sz + 14 t + 2 e = ?" badge="Beváltás" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>14 tízes = 10 tízes + 4 tízes.</li>
              <li>10 tízes = 1 százas.</li>
              <li>Így 4 sz + 4 t + 2 e = <strong>442</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Növekvő sorrend" badge="Összehasonlítás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Számok: 415, 154, 451, 145.</li>
              <li>Előbb a százasok: 1 &lt; 4.</li>
              <li>Utána a tízesek: 145 &lt; 154, 415 &lt; 451.</li>
              <li><strong>145, 154, 415, 451</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Mennyi pénz?" badge="Pénz" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Két 200 Ft-os: 400 Ft.</li>
              <li>Egy 50 Ft-os: 450 Ft.</li>
              <li>Két 20 Ft-os és egy 5 Ft-os: 45 Ft.</li>
              <li>Összesen <strong>495 Ft</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 10. Vigyázz */}
      <TheorySection title="10. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Négyszázhat – hogyan írjuk?"
          wrong="4006 vagy 46"
          wrongExplanation="A négyszáz nem 400 után írt 6. És a 0-t sem hagyhatod el!"
          correct="406"
          correctExplanation="4 százas, 0 tízes, 6 egyes. A tízesek helyén nincs semmi, ezért oda 0 kerül."
          tip="Háromjegyű számban mindig 3 jegy van."
        />
        <TheoryCallout type="warning" title="Sok golyó ≠ nagy szám">
          9 sárga golyó csak 9. 1 piros golyó 100! Mindig azt nézd, <strong>melyik rúdon</strong> van a golyó.
        </TheoryCallout>
      </TheorySection>

      {/* 11. Labor I */}
      <TheorySection title="11. Labor I: Rendetlen kupac" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newPile} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-slate-600">
              Kezdetben: {start.sz} lap, {start.t} rúd, {start.e} kocka
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">Váltsd be, aztán mondd meg: melyik szám van az asztalon?</div>
          <svg viewBox="0 0 340 90" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width="338" height="88" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <BlockRow x={(340 - w1) / 2} y={(90 - s1 * 10) / 2} sz={pile.sz} t={pile.t} e={pile.e} s={s1} />
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-rose-50 border-2 border-rose-200 p-2"><div className="text-2xl font-black text-rose-700">{pile.sz}</div><div className="text-xs font-bold text-rose-600">lap</div></div>
            <div className={`rounded-xl border-2 p-2 ${pile.t >= 10 ? 'bg-amber-50 border-amber-400' : 'bg-blue-50 border-blue-200'}`}><div className="text-2xl font-black text-blue-700">{pile.t}</div><div className="text-xs font-bold text-blue-600">rúd</div></div>
            <div className={`rounded-xl border-2 p-2 ${pile.e >= 10 ? 'bg-amber-50 border-amber-400' : 'bg-yellow-50 border-yellow-200'}`}><div className="text-2xl font-black text-yellow-700">{pile.e}</div><div className="text-xs font-bold text-yellow-700">kocka</div></div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              disabled={pile.e < 10 || solved}
              onClick={() => { setPile({ ...pile, e: pile.e - 10, t: pile.t + 1 }); setPileMsg(''); setPicked(null); }}
              className="px-3 py-3 rounded-xl bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm min-h-[52px]"
            >
              10 kocka → 1 rúd
            </button>
            <button
              disabled={pile.t < 10 || solved}
              onClick={() => { setPile({ ...pile, t: pile.t - 10, sz: pile.sz + 1 }); setPileMsg(''); setPicked(null); }}
              className="px-3 py-3 rounded-xl bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm min-h-[52px]"
            >
              10 rúd → 1 lap
            </button>
          </div>
          {tidy && !solved && <div className="text-center text-sm font-bold text-emerald-700">Minden be van váltva! Melyik szám ez?</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            {opts.map((v) => (
              <OptButton key={v} v={v} onClick={() => pickPile(v)} state={solved && v === pv ? 'ok' : picked === v && v !== pv ? 'bad' : null} />
            ))}
          </div>
          {pileMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{pileMsg}</div>}
          {solved && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {start.sz} sz + {start.t} t + {start.e} e = {pv}. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* 12. Labor II */}
      <TheorySection title="12. Labor II: Hol lakik a szám?" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => newLine(mode)} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={() => newLine('kozel')} className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${mode === 'kozel' ? 'bg-sky-100 border-sky-500 text-sky-900' : 'bg-white border-slate-300 text-slate-700'}`}>Egy százon belül</button>
            <button onClick={() => newLine('messze')} className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${mode === 'messze' ? 'bg-sky-100 border-sky-500 text-sky-900' : 'bg-white border-slate-300 text-slate-700'}`}>0-tól 500-ig</button>
            <div className="ml-auto text-sm font-bold text-sky-800 bg-sky-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900 font-bold">
            Koppints oda, ahol {art(lt.target)} <span className="text-2xl">{lt.target}</span> lakik! (Egy osztás {lt.step}-et ér.)
          </div>
          <svg viewBox={`0 0 ${LW} 110`} className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width={LW - 2} height="108" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <line x1={lx0 - 12} y1="60" x2={lx1 + 10} y2="60" stroke="#334155" strokeWidth="2" />
            <path d={`M ${lx1 + 10} 55 L ${lx1 + 18} 60 L ${lx1 + 10} 65 Z`} fill="#334155" />
            {ticks.map((v) => {
              const big = labelSet.includes(v);
              const chosen = tap === v;
              const ok = chosen && v === lt.target;
              return (
                <g key={v} onClick={() => tapTick(v)} style={{ cursor: 'pointer' }}>
                  <rect x={LX(v) - 13} y="22" width="26" height="76" fill="transparent" />
                  <line x1={LX(v)} y1={big ? 50 : 54} x2={LX(v)} y2={big ? 70 : 66} stroke="#334155" strokeWidth={big ? 2 : 1.4} />
                  {big && <text x={LX(v)} y="88" textAnchor="middle" fontSize="12" fill="#475569">{v}</text>}
                  {chosen && (
                    <g>
                      <circle cx={LX(v)} cy="60" r="7" fill={ok ? '#16a34a' : UNK} stroke="#fff" strokeWidth="1.5" />
                      {!big && <text x={LX(v)} y="40" textAnchor="middle" fontSize="13" fontWeight="bold" fill={ok ? '#16a34a' : UNK}>{v}</text>}
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          {tap !== null && !lineDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              Ez {art(tap)} {tap}. {Art(lt.target)} {lt.target} innen {Math.abs(diff)} osztással {diff > 0 ? 'jobbra' : 'balra'} van. Próbáld újra!
            </div>
          )}
          {lineDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! Itt lakik {art(lt.target)} {lt.target}.{streak >= 3 ? ` Már ${streak} jó válasz egymás után!` : ''} Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Numbers500G3Theory;
