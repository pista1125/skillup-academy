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
  TensOnesBlocksSvg,
  HundredBoardSvg,
  PlaceValueTableSvg,
  NeighboursNumberLineSvg,
  PurseMoneySvg,
  EvenOddSvg
} from './Numbers100G3Figures';
import { TenRod, OneCube } from './Numbers100G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

// ---------------------------------------------------------------------------
// Labor II – lépések a százas táblán
// ---------------------------------------------------------------------------
type Dir = 'jobbra' | 'balra' | 'lefelé' | 'felfelé';
interface Step { dir: Dir; n: number }
const DELTA: Record<Dir, [number, number]> = { jobbra: [0, 1], balra: [0, -1], 'lefelé': [1, 0], 'felfelé': [-1, 0] };
const VALUE: Record<Dir, string> = { jobbra: '+1', balra: '−1', 'lefelé': '+10', 'felfelé': '−10' };

const makeWalk = (): { start: number; steps: Step[] } => {
  for (;;) {
    const start = rnd(1, 100);
    let r = Math.floor((start - 1) / 10);
    let c = (start - 1) % 10;
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
    v += (dr * 10 + dc) * s.n;
    path.push(v);
  });
  return path;
};

const stepText = (s: Step) => `${s.dir} ${s.n}-${s.n === 1 ? 'et' : s.n === 2 ? 't' : s.n === 3 ? 'at' : 'et'}`;

export const Numbers100G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: építő
  const [target, setTarget] = useState<number>(46);
  const [tens, setTens] = useState<number>(0);
  const [ones, setOnes] = useState<number>(0);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const built = tens * 10 + ones;
  const newBuild = () => {
    let t = rnd(11, 99);
    if (Math.random() < 0.08) t = 100;
    setTarget(t);
    setTens(0);
    setOnes(0);
    setMsg1(null);
  };
  const check1 = () => {
    const T = Math.floor(target / 10);
    const E = target % 10;
    if (built === target && ones < 10) {
      setMsg1({ ok: true, text: `Ügyes vagy! ${tens} tízes + ${ones} egyes = ${target}.` });
    } else if (built === target) {
      setMsg1({ ok: false, text: `A szám jó, de 10 egyeskockát cserélj be egy tízesrúdra! Nyomd meg a „Beváltom” gombot.` });
    } else if (tens !== T && ones === E) {
      setMsg1({ ok: false, text: `Az egyesek jók. ${target} = ${T} tízes + ${E} egyes. Neked ${tens} rudad van.` });
    } else if (tens === T) {
      setMsg1({ ok: false, text: `A tízesrudak jók. Most nézd az egyeseket: ${E} kocka kell, neked ${ones} van.` });
    } else {
      setMsg1({ ok: false, text: `Most ${built} van az asztalon. De ${target} = ${T} tízes + ${E} egyes. Próbáld újra!` });
    }
  };

  // Labor II: százas tábla
  const [walk, setWalk] = useState(() => ({ start: 34, steps: [{ dir: 'jobbra', n: 2 }, { dir: 'lefelé', n: 3 }] as Step[] }));
  const [clicked, setClicked] = useState<number | null>(null);
  const path = walkPath(walk.start, walk.steps);
  const goal = path[path.length - 1];
  const solved = clicked === goal;
  const newWalk = () => {
    setWalk(makeWalk());
    setClicked(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-count-100"
      subtopicId="szamok-100-ig"
      grade={3}
      chapterId="szamolas-100-ig"
      title="1. Számok 100-ig"
      subtitle="Tízesek és egyesek, a százas tábla, a számegyenes, számszomszédok, páros és páratlan számok."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG"
      themeColor="sky"
      pdfFilename="3_osztaly_szamok_100_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — TÍZESEK ÉS EGYESEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              46 = 4 t + 6 e = 40 + 6
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az első jegy a <strong>tízesek</strong>, a második az <strong>egyesek</strong> száma.</li>
              <li>10 egyes = 1 tízes. 10 tízes = 1 százas = <strong>100</strong>.</li>
              <li>Páros szám végén 0, 2, 4, 6 vagy 8 áll.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 4–7. o." badgeColor="sky">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Ismét 100-ig számolunk. Ezt már tavaly is csináltad!</p>
          <p>Most megnézzük, miből áll egy szám: <strong>tízesekből</strong> és <strong>egyesekből</strong>.</p>
          <p>Megkeressük a számok helyét a <strong>százas táblán</strong> és a <strong>számegyenesen</strong>.</p>
        </div>
      </TheorySection>

      {/* 2. Tízesek és egyesek */}
      <TheorySection title="2. Tízesek és egyesek" badge="Kirakjuk" badgeColor="blue">
        <TensOnesBlocksSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Egy tízesrúd = 10 kocka" badge="10 e = 1 t" badgeColor="blue">
            <p className="text-sm text-slate-700">Egy rúdban 10 kis kocka van. Ezért egy rúd egy <strong>tízes</strong>. Egy kocka egy <strong>egyes</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Számjegyek helye" badge="4 | 6" badgeColor="amber">
            <p className="text-sm text-slate-700">A <strong>46</strong>-ban a 4 a tízeseket, a 6 az egyeseket mutatja. Leírva: <strong>46 = 4 t + 6 e = 40 + 6</strong>.</p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <PurseMoneySvg />
          <TheoryCard title="Pénzzel is megy!" badge="Ft" badgeColor="purple">
            <p className="text-sm text-slate-700">Az 50 Ft 5 tízes, a 20 Ft 2 tízes, az 5 Ft 5 egyes. Összesen 7 tízes és 5 egyes: <strong>75 Ft</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Helyiérték-táblázat */}
      <TheorySection title="3. A helyiérték-táblázat" badge="százas • tízes • egyes" badgeColor="orange">
        <PlaceValueTableSvg />
        <TheoryCallout type="info" title="Mi a 100?">
          A 100 az első <strong>háromjegyű</strong> szám. 10 tízes = 1 százas = 100. A táblázatban így írjuk: 1 százas, 0 tízes, 0 egyes.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Százas tábla */}
      <TheorySection title="4. A százas tábla" badge="Lépegetés" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <HundredBoardSvg />
          <div className="space-y-3 text-sm text-slate-700">
            <p>Egy sorban 10 szám van. Minden sor egy újabb tízessel kezdődik.</p>
            <p><strong>Jobbra</strong> lépsz: a szám 1-gyel nő. <strong>Balra</strong>: 1-gyel csökken.</p>
            <p><strong>Lefelé</strong> lépsz: a szám 10-zel nő. <strong>Felfelé</strong>: 10-zel csökken.</p>
            <p className="italic text-slate-500">Melyik számok bújtak el a „?” mögé? (27, 49, 63, 86)</p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Számszomszédok, páros, páratlan */}
      <TheorySection title="5. Számszomszédok, páros és páratlan számok" badge="Számegyenes" badgeColor="teal">
        <NeighboursNumberLineSvg />
        <TheoryTable
          headers={['kisebb tízes', 'kisebb egyes', 'szám', 'nagyobb egyes', 'nagyobb tízes']}
          rows={[
            ['60', '62', '63', '64', '70'],
            ['30', '34', '35', '36', '40'],
            ['80', '88', '89', '90', '90'],
            ['10', '10', '11', '12', '20']
          ]}
        />
        <TheoryCallout type="tip" title="Egyes és tízes szomszéd">
          Az <strong>egyes szomszéd</strong> 1-gyel kisebb vagy nagyobb. A <strong>tízes szomszédok</strong> az a két kerek tízes, amelyek közé a szám esik. A 89 nagyobb egyes és nagyobb tízes szomszédja is a 90.
        </TheoryCallout>
        <EvenOddSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Páros számok" badge="0, 2, 4, 6, 8" badgeColor="emerald">
            <p className="text-sm text-slate-700">Párokba rakva nem marad ki semmi. Az utolsó jegyük 0, 2, 4, 6 vagy 8. Például: 24, 50, 98.</p>
          </TheoryCard>
          <TheoryCard title="Páratlan számok" badge="1, 3, 5, 7, 9" badgeColor="orange">
            <p className="text-sm text-slate-700">Párokba rakva egy kimarad. Az utolsó jegyük 1, 3, 5, 7 vagy 9. Például: 17, 45, 99.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Mennyit ér?" badge="3 t + 17 e" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>17 egyesből 10-et beváltunk: az 1 tízes.</li>
              <li>Marad 7 egyes.</li>
              <li>3 tízes + 1 tízes = 4 tízes.</li>
              <li>Tehát <strong>3 t + 17 e = 47</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Lépj a táblán!" badge="Százas tábla" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Indulj az 52-ről.</li>
              <li>Lépj 3-at jobbra: 53, 54, <strong>55</strong>.</li>
              <li>Lépj 2-t lefelé: 65, <strong>75</strong>.</li>
              <li>Megérkeztél a <strong>75</strong>-höz.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Melyik számra gondoltam?" badge="Fejtörő" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A tízes szomszédai 30 és 40.</li>
              <li>Páros szám.</li>
              <li>Az egyesek helyén 7-nél nagyobb jegy áll.</li>
              <li>A 30 és 40 közötti páros számok: 32, 34, 36, 38. Csak a 38 végén áll 7-nél nagyobb jegy: <strong>38</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="2 t + 15 e – mennyi ez?"
          wrong="2 t + 15 e = 215"
          wrongExplanation="Nem szabad egymás mellé írni a számokat! 15 egyes több, mint egy tízes."
          correct="2 t + 15 e = 20 + 15 = 35"
          correctExplanation="A 15 egyesből 1 tízes és 5 egyes lesz. Így 3 tízes és 5 egyes: 35."
          tip="Ha 9-nél több egyesed van, válts be 10-et egy tízesre!"
        />
        <TheoryCallout type="warning" title="Ne cseréld fel a jegyeket!">
          A <strong>hetvenegy</strong> 71 (7 tízes, 1 egyes). A <strong>tizenhét</strong> 17 (1 tízes, 7 egyes).
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Építsd meg a számot!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900">
            Rakd ki a számot rudakkal és kockákkal: <span className="text-3xl font-black align-middle ml-2">{target}</span>
          </div>
          <svg viewBox="0 0 360 150" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            {Array.from({ length: Math.min(tens, 10) }, (_, i) => (
              <TenRod key={i} x={12 + i * 18} y={10} s={12} />
            ))}
            {Array.from({ length: Math.min(ones, 19) }, (_, i) => (
              <OneCube key={i} x={210 + (i % 5) * 18} y={14 + Math.floor(i / 5) * 18} s={14} />
            ))}
            {built === 0 && (
              <text x="180" y="72" textAnchor="middle" fontSize="14" fill="#64748b">Az asztal még üres. Nyomd meg a gombokat!</text>
            )}
            <text x="100" y="142" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">{tens} tízes</text>
            <text x="255" y="142" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#a16207">{ones} egyes</text>
          </svg>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button onClick={() => { setTens(Math.min(10, tens + 1)); setMsg1(null); }} className="px-3 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm min-h-[48px]">+ tízesrúd</button>
            <button onClick={() => { setTens(Math.max(0, tens - 1)); setMsg1(null); }} className="px-3 py-3 rounded-xl bg-blue-100 text-blue-800 font-bold text-sm min-h-[48px]">− tízesrúd</button>
            <button onClick={() => { setOnes(Math.min(19, ones + 1)); setMsg1(null); }} className="px-3 py-3 rounded-xl bg-yellow-400 text-yellow-950 font-bold text-sm min-h-[48px]">+ egyeskocka</button>
            <button onClick={() => { setOnes(Math.max(0, ones - 1)); setMsg1(null); }} className="px-3 py-3 rounded-xl bg-yellow-100 text-yellow-900 font-bold text-sm min-h-[48px]">− egyeskocka</button>
          </div>
          {ones >= 10 && tens < 10 && (
            <button onClick={() => { setOnes(ones - 10); setTens(tens + 1); setMsg1(null); }} className="w-full px-3 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm min-h-[48px]">
              Beváltom: 10 kocka → 1 rúd
            </button>
          )}
          <div className="text-center text-lg font-bold text-slate-700">
            Most: {tens} t + {ones} e = {built}
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

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Lépegess a százas táblán!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-sm text-emerald-900 text-center">
            Indulás: <strong className="text-lg">{walk.start}</strong>. Lépj {stepText(walk.steps[0])}, majd {stepText(walk.steps[1])}! Koppints oda, ahová érkezel!
          </div>
          <div className="grid grid-cols-10 gap-0.5 sm:gap-1 max-w-md mx-auto">
            {Array.from({ length: 100 }, (_, k) => {
              const n = k + 1;
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
                  className={`aspect-square rounded border text-[11px] sm:text-sm font-bold min-h-[28px] ${cls}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          {clicked !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${solved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {solved
                ? `Szuper! ${walk.start} → ${path[1]} → ${goal}.`
                : `Nem ez. Ha ${walk.steps.map((s) => `${s.dir} lépsz: ${VALUE[s.dir]}`).join('; ha ')}. Az út zölddel látszik. Koppints újra!`}
            </div>
          )}
          <button onClick={newWalk} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Numbers100G3Theory;
