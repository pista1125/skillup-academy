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
  HundredsTensOnesSvg,
  SecondHundredBoardSvg,
  PlaceValue200Svg,
  Abacus200Svg,
  Money200Svg,
  NumberWordsSvg
} from './Numbers200G3Figures';
import { HundredFlat, TenRod, OneCube } from './Numbers200G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

// ---------------------------------------------------------------------------
// Labor II – lépések a második százas táblán (101–200)
// ---------------------------------------------------------------------------
type Dir = 'jobbra' | 'balra' | 'lefelé' | 'felfelé';
interface Step { dir: Dir; n: number }
const DELTA: Record<Dir, [number, number]> = { jobbra: [0, 1], balra: [0, -1], 'lefelé': [1, 0], 'felfelé': [-1, 0] };
const VALUE: Record<Dir, string> = { jobbra: '+1', balra: '−1', 'lefelé': '+10', 'felfelé': '−10' };
const SUFFIX: Record<number, string> = { 1: 'et', 2: 't', 3: 'at', 4: 'et' };

const makeWalk = (): { start: number; steps: Step[] } => {
  for (;;) {
    const start = rnd(101, 200);
    let r = Math.floor((start - 101) / 10);
    let c = (start - 101) % 10;
    const horiz: Dir = Math.random() < 0.5 ? 'jobbra' : 'balra';
    const vert: Dir = Math.random() < 0.5 ? 'lefelé' : 'felfelé';
    const order: Dir[] = Math.random() < 0.5 ? [horiz, vert] : [vert, horiz];
    const steps: Step[] = order.map((d) => ({ dir: d, n: rnd(1, 4) }));
    let ok = true;
    steps.forEach((s) => {
      r += DELTA[s.dir][0] * s.n;
      c += DELTA[s.dir][1] * s.n;
      if (r < 0 || r > 9 || c < 0 || c > 9) ok = false;
    });
    if (ok) return { start, steps };
  }
};

const walkPath = (start: number, steps: Step[]) => {
  const path = [start];
  let v = start;
  steps.forEach((s) => {
    const [dr, dc] = DELTA[s.dir];
    for (let i = 0; i < s.n; i++) {
      v += dr * 10 + dc;
      path.push(v);
    }
  });
  return path;
};

const stepText = (s: Step) => `${s.dir} ${s.n}-${SUFFIX[s.n]}`;

export const Numbers200G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: építő (százas lap, tízesrúd, egyeskocka)
  const [target, setTarget] = useState<number>(136);
  const [h, setH] = useState<number>(0);
  const [t, setT] = useState<number>(0);
  const [e, setE] = useState<number>(0);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const built = h * 100 + t * 10 + e;
  const reset1 = () => setMsg1(null);
  const newBuild = () => {
    setTarget(rnd(101, 200));
    setH(0);
    setT(0);
    setE(0);
    setMsg1(null);
  };
  const check1 = () => {
    const H = Math.floor(target / 100);
    const T = Math.floor((target % 100) / 10);
    const E = target % 10;
    if (built === target && t < 10 && e < 10) {
      setMsg1({ ok: true, text: `Ügyes vagy! ${h} százas + ${t} tízes + ${e} egyes = ${target}.` });
    } else if (built === target) {
      setMsg1({ ok: false, text: 'A szám jó! De válts be: 10 kocka helyett 1 rúd, 10 rúd helyett 1 lap legyen.' });
    } else if (h !== H) {
      setMsg1({ ok: false, text: `Nézd a százasokat! Ehhez a számhoz ${H} százas kell. Neked ${h} lapod van.` });
    } else if (t !== T && e === E) {
      setMsg1({ ok: false, text: `A százas és az egyesek jók. Most a tízesek: ${T} rúd kell, neked ${t} van.` });
    } else if (t === T) {
      setMsg1({ ok: false, text: `A tízesek jók. Most az egyesek: ${E} kocka kell, neked ${e} van.` });
    } else {
      setMsg1({ ok: false, text: `Most ${built} van az asztalon. De ${target} = ${H} százas + ${T} tízes + ${E} egyes. Próbáld újra!` });
    }
  };

  // Labor II: második százas tábla
  const [walk, setWalk] = useState(() => ({ start: 134, steps: [{ dir: 'jobbra', n: 3 }, { dir: 'lefelé', n: 2 }] as Step[] }));
  const [clicked, setClicked] = useState<number | null>(null);
  const path = walkPath(walk.start, walk.steps);
  const goal = path[path.length - 1];
  const corner = path[walk.steps[0].n];
  const solved = clicked === goal;
  const newWalk = () => {
    setWalk(makeWalk());
    setClicked(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-count-200"
      subtopicId="szamok-200-ig"
      grade={3}
      chapterId="szamolas-200-ig"
      title="1. Számok 200-ig"
      subtitle="Százasok, tízesek és egyesek, a második százas tábla, alaki és valódi érték, számok betűvel."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_szamok_200_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — SZÁZAS, TÍZES, EGYES',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              136 = 1 sz + 3 t + 6 e = 100 + 30 + 6
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>10 egyes = 1 tízes. 10 tízes = 1 százas.</li>
              <li>2 százas = <strong>200</strong>. Ez a legnagyobb szám most.</li>
              <li>A számjegy <strong>valódi értéke</strong> attól függ, hol áll.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 28–31. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>100-ig már tudsz számolni. Most továbbmegyünk <strong>200-ig</strong>!</p>
          <p>A 100 után jön a második száz: 101, 102, 103, … egészen 200-ig.</p>
          <p>Megnézzük, miből áll egy háromjegyű szám: <strong>százasból</strong>, <strong>tízesekből</strong> és <strong>egyesekből</strong>.</p>
        </div>
      </TheorySection>

      {/* 2. A második száz */}
      <TheorySection title="2. A második százas tábla" badge="101–200" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SecondHundredBoardSvg />
          <div className="space-y-3 text-sm text-slate-700">
            <p>Ez a tábla 101-gyel kezdődik és 200-zal végződik. Ebben is <strong>100 szám</strong> van.</p>
            <p>Hasonlít az első százas táblára. Csak minden szám elején ott a <strong>száz</strong>: 1 → 101, 25 → 125.</p>
            <p><strong>Jobbra</strong> lépsz: 1-gyel több. <strong>Lefelé</strong> lépsz: 10-zel több.</p>
            <p className="italic text-slate-500">Melyik számok bújtak el a „?” mögé? (117, 139, 161, 178, 195)</p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Százas, tízes, egyes */}
      <TheorySection title="3. Százasok, tízesek, egyesek" badge="Kirakjuk" badgeColor="blue">
        <HundredsTensOnesSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Egy rúd = 10 kocka" badge="10 e = 1 t" badgeColor="blue">
            <p className="text-sm text-slate-700">Egy tízesrúdban 10 kis kocka van.</p>
          </TheoryCard>
          <TheoryCard title="Egy lap = 10 rúd" badge="10 t = 1 sz" badgeColor="rose">
            <p className="text-sm text-slate-700">A százas lapot 10 rúd adja ki. Ez 100 kocka.</p>
          </TheoryCard>
          <TheoryCard title="Két lap = 200" badge="2 sz" badgeColor="amber">
            <p className="text-sm text-slate-700">Két százas lap együtt <strong>200</strong>. Kétszáz.</p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <Abacus200Svg />
          <Money200Svg />
        </div>
        <TheoryCallout type="info" title="Golyós számoló és pénz">
          A golyós számolón a piros golyó 100-at, a kék 10-et, a sárga 1-et ér. A pénznél is így számolunk: előbb a nagy érméket, aztán a kicsiket.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Helyiérték */}
      <TheorySection title="4. Alaki érték, helyiérték, valódi érték" badge="Helyiérték-táblázat" badgeColor="orange">
        <PlaceValue200Svg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Alaki érték" badge="a jegy" badgeColor="slate">
            <p className="text-sm text-slate-700">Maga a leírt számjegy. A 158-ban: 1, 5 és 8.</p>
          </TheoryCard>
          <TheoryCard title="Helyiérték" badge="a hely" badgeColor="orange">
            <p className="text-sm text-slate-700">Az a hely, ahol a jegy áll: százasok, tízesek vagy egyesek helye.</p>
          </TheoryCard>
          <TheoryCard title="Valódi érték" badge="mennyit ér" badgeColor="emerald">
            <p className="text-sm text-slate-700">Mennyit ér a jegy a helyén. Az 5 a tízesek helyén <strong>50</strong>-et ér.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Ugyanaz a jegy, más érték">
          A 151-ben két 1-es van. Az első 100-at ér, az utolsó csak 1-et!
        </TheoryCallout>
      </TheorySection>

      {/* 5. Betűvel */}
      <TheorySection title="5. Számok betűvel" badge="Olvasás, írás" badgeColor="teal">
        <NumberWordsSvg />
        <TheoryTable
          headers={['számmal', 'betűvel']}
          rows={[
            ['101', 'százegy'],
            ['110', 'száztíz'],
            ['119', 'száztizenkilenc'],
            ['125', 'százhuszonöt'],
            ['170', 'százhetven'],
            ['200', 'kétszáz']
          ]}
        />
        <TheoryCallout type="tip" title="Egybe írjuk!">
          A 200-ig terjedő számokat betűvel <strong>egy szóba</strong> írjuk: százhuszonöt, kétszáz.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Számsorok, összehasonlítás */}
      <TheorySection title="6. Számsorok, kisebb és nagyobb" badge="< >" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Tízesével lépünk" badge="+10" badgeColor="purple">
            <p className="text-sm text-slate-700">100, 110, 120, 130, … 190, 200.</p>
            <p className="text-sm text-slate-700">Visszafelé: 200, 190, 180, …</p>
          </TheoryCard>
          <TheoryCard title="Melyik a nagyobb?" badge="< >" badgeColor="sky">
            <p className="text-sm text-slate-700">Előbb a százasokat nézd, aztán a tízeseket, végül az egyeseket.</p>
            <p className="text-sm text-slate-700 font-bold">174 &gt; 147, mert 7 tízes több, mint 4 tízes.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Mi van közöttük?">
          150 &lt; □ &lt; 155. Ide ezek kerülhetnek: 151, 152, 153, 154. A 150 és a 155 már nem!
        </TheoryCallout>
      </TheorySection>

      {/* 7. Nézzük meg együtt */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Mennyit ér?" badge="1 sz + 5 t + 13 e" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A 13 egyesből 10-et beváltunk 1 tízesre.</li>
              <li>Marad 3 egyes.</li>
              <li>5 tízes + 1 tízes = 6 tízes.</li>
              <li>Tehát 1 sz + 6 t + 3 e = <strong>163</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Lépj a táblán!" badge="101–200" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Indulj a 128-ról.</li>
              <li>Lépj 3-at lefelé: 138, 148, <strong>158</strong>.</li>
              <li>Lépj 2-t balra: 157, <strong>156</strong>.</li>
              <li>Megérkeztél a <strong>156</strong>-hoz.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Melyik számra gondoltam?" badge="Fejtörő" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>180 és 190 között van.</li>
              <li>A tízesek és az egyesek helyén ugyanaz a jegy áll.</li>
              <li>A tízes jegy 8. Így az egyes jegy is 8.</li>
              <li>A szám: <strong>188</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 8. Vigyázz */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hogyan írod le: százhét?"
          wrong="százhét = 1007"
          wrongExplanation="Nem írjuk egymás mellé a 100-at és a 7-et! Így négyjegyű szám lenne, sokkal nagyobb."
          correct="százhét = 107"
          correctExplanation="1 százas, 0 tízes, 7 egyes. A tízesek helyére 0 kerül."
          tip="Ha nincs tízes, írj 0-t a tízesek helyére!"
        />
        <TheoryCallout type="warning" title="Ne keverd össze!">
          1 százas + 7 tízes = <strong>170</strong>. 1 százas + 7 egyes = <strong>107</strong>. 1 tízes + 7 egyes = <strong>17</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 9. Labor I */}
      <TheorySection title="9. Labor I: Építsd meg a számot!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900">
            Rakd ki lapokkal, rudakkal és kockákkal: <span className="text-3xl font-black align-middle ml-2">{target}</span>
          </div>
          <svg viewBox="0 0 440 150" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            {Array.from({ length: h }, (_, i) => (
              <HundredFlat key={i} x={8 + i * 76} y={10} s={7} />
            ))}
            {Array.from({ length: t }, (_, i) => (
              <TenRod key={i} x={164 + i * 10} y={10} s={7} />
            ))}
            {Array.from({ length: e }, (_, i) => (
              <OneCube key={i} x={362 + (i % 5) * 14} y={14 + Math.floor(i / 5) * 14} s={11} />
            ))}
            {built === 0 && (
              <text x="220" y="62" textAnchor="middle" fontSize="14" fill="#64748b">Az asztal még üres. Nyomd meg a gombokat!</text>
            )}
            <text x="80" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">{h} százas</text>
            <text x="260" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">{t} tízes</text>
            <text x="396" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#a16207">{e} egyes</text>
          </svg>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button onClick={() => { setH(Math.min(2, h + 1)); reset1(); }} className="px-3 py-3 rounded-xl bg-rose-500 text-white font-bold text-sm min-h-[48px]">+ százas lap</button>
            <button onClick={() => { setT(Math.min(19, t + 1)); reset1(); }} className="px-3 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm min-h-[48px]">+ tízesrúd</button>
            <button onClick={() => { setE(Math.min(19, e + 1)); reset1(); }} className="px-3 py-3 rounded-xl bg-yellow-400 text-yellow-950 font-bold text-sm min-h-[48px]">+ egyeskocka</button>
            <button onClick={() => { setH(Math.max(0, h - 1)); reset1(); }} className="px-3 py-3 rounded-xl bg-rose-100 text-rose-800 font-bold text-sm min-h-[48px]">− százas lap</button>
            <button onClick={() => { setT(Math.max(0, t - 1)); reset1(); }} className="px-3 py-3 rounded-xl bg-blue-100 text-blue-800 font-bold text-sm min-h-[48px]">− tízesrúd</button>
            <button onClick={() => { setE(Math.max(0, e - 1)); reset1(); }} className="px-3 py-3 rounded-xl bg-yellow-100 text-yellow-900 font-bold text-sm min-h-[48px]">− egyeskocka</button>
          </div>
          {(e >= 10 || (t >= 10 && h < 2)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {e >= 10 && t < 19 && (
                <button onClick={() => { setE(e - 10); setT(t + 1); reset1(); }} className="px-3 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm min-h-[48px]">
                  Beváltom: 10 kocka → 1 rúd
                </button>
              )}
              {t >= 10 && h < 2 && (
                <button onClick={() => { setT(t - 10); setH(h + 1); reset1(); }} className="px-3 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm min-h-[48px]">
                  Beváltom: 10 rúd → 1 lap
                </button>
              )}
            </div>
          )}
          <div className="text-center text-lg font-bold text-slate-700">
            Most: {h} sz + {t} t + {e} e = {built}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check1} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
            <button onClick={newBuild} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>
          )}
        </div>
      </TheorySection>

      {/* 10. Labor II */}
      <TheorySection title="10. Labor II: Lépegess a második százas táblán!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-sm text-emerald-900 text-center">
            Indulás: <strong className="text-lg">{walk.start}</strong>. Lépj {stepText(walk.steps[0])}, majd {stepText(walk.steps[1])}! Koppints oda, ahová érkezel!
          </div>
          <div className="grid grid-cols-10 gap-0.5 sm:gap-1 max-w-md mx-auto">
            {Array.from({ length: 100 }, (_, k) => {
              const n = 101 + k;
              const isStart = n === walk.start;
              const isClicked = n === clicked;
              const showPath = clicked !== null && !solved && path.includes(n);
              let cls = 'bg-white text-slate-700 border-slate-200';
              if (isStart) cls = 'bg-amber-300 text-amber-950 border-amber-500';
              if (showPath && !isStart) cls = 'bg-emerald-100 text-emerald-800 border-emerald-400';
              if (isClicked) cls = solved ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600';
              return (
                <button
                  key={n}
                  onClick={() => !solved && setClicked(n)}
                  className={`aspect-square rounded border text-[9px] sm:text-xs font-bold min-h-[28px] ${cls}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          {clicked !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${solved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {solved
                ? `Szuper! ${walk.start} → ${corner} → ${goal}.`
                : `Nem ez. Ha ${walk.steps.map((s) => `${s.dir} lépsz: ${VALUE[s.dir]}`).join('; ha ')}. Az út zölddel látszik. Koppints újra!`}
            </div>
          )}
          <button onClick={newWalk} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Numbers200G3Theory;
