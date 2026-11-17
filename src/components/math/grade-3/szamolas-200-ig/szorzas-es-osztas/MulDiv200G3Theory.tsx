import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import {
  MulDiv200TensSvg,
  MulDiv200LadderSvg,
  MulDiv200SharingSvg,
  MulDiv200GroupingSvg,
  MulDiv200CoinsSvg,
  MulDiv200FamilySvg
} from './MulDiv200G3Figures';
import { FONT, RodGroups, INK, rodPerLine, art, ban, at, asSfx } from './MulDiv200G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Labor II: feladatgenerátor (minden szám 0 és 200 között)
// kind 0: a · T = □    1: P : a = □    2: P : T = □    3: □ · a = P
// (T kerek tízes, P = a · T ≤ 200)
// ---------------------------------------------------------------------------
export type MulDiv200Option = { v: number; msg: string };
export type MulDiv200Task = { kind: number; text: string; ans: number; options: MulDiv200Option[]; check: string };

export const makeMulDiv200Task = (kindIn?: number): MulDiv200Task => {
  const kind = kindIn ?? rnd(0, 3);
  let a = rnd(2, 9);
  let t = rnd(2, 9);
  while (a * t > 20) {
    a = rnd(2, 9);
    t = rnd(2, 9);
  }
  const T = t * 10;
  const P = a * T;
  const wrong: MulDiv200Option[] = [];
  let text = '';
  let ans = 0;
  let check = '';
  if (kind === 0) {
    text = `${a} · ${T} = □`;
    ans = P;
    check = `${a} · ${t} tízes = ${a * t} tízes = ${P}`;
    wrong.push({ v: a * t, msg: `Ez csak ${a} · ${t}. De ${T} tízes van benne: ${a} · ${t} tízes = ${a * t} tízes. Ne hagyd le a nullát!` });
    wrong.push({ v: a + T, msg: 'Összeadtad a két számot. Itt szorozni kell!' });
    wrong.push({ v: P + T, msg: `Eggyel több csoportot számoltál. Csak ${a} csoport van, mindegyikben ${T}.` });
    wrong.push({ v: P - T, msg: `Eggyel kevesebb csoportot számoltál. ${a} csoport kell, mindegyikben ${T}.` });
  } else if (kind === 1) {
    text = `${P} : ${a} = □`;
    ans = T;
    check = `${P} = ${a * t} tízes. ${a * t} tízes : ${a} = ${t} tízes = ${T}`;
    wrong.push({ v: t, msg: `Ez csak ${a * t} : ${a}. De ${P} = ${a * t} tízes, így az eredmény is tízes: ${t} tízes = ${T}.` });
    wrong.push({ v: P - a, msg: 'Kivontál. Itt osztani kell: egyenlő részekre bontjuk a számot.' });
    wrong.push({ v: T + 10, msg: `Ellenőrizd szorzással: ${a} · ${T + 10} = ${a * (T + 10)}, nem ${P}.` });
    if (T - 10 > 0) wrong.push({ v: T - 10, msg: `Ellenőrizd szorzással: ${a} · ${T - 10} = ${a * (T - 10)}, nem ${P}.` });
  } else if (kind === 2) {
    text = `${P} : ${T} = □`;
    ans = a;
    check = `${a * t} tízes : ${t} tízes = ${a}, mert ${a} · ${T} = ${P}`;
    wrong.push({ v: a * 10, msg: `Ellenőrizd: ${a * 10} · ${T} sokkal több lenne 200-nál. Hányszor van meg ${art(T)} ${T} ${art(P)} ${ban(P)}?` });
    wrong.push({ v: P - T, msg: `Egyszer vontad ki ${art(T)} ${at(T)}. Ugráld végig: hány ${asSfx(T)} ugrás kell ${P}-ig?` });
    wrong.push({ v: a + 1, msg: `${a + 1} · ${T} = ${(a + 1) * T}. Ez több, mint ${P}.` });
    wrong.push({ v: a - 1, msg: `${a - 1} · ${T} = ${(a - 1) * T}. Ez kevesebb, mint ${P}.` });
  } else {
    text = `□ · ${a} = ${P}`;
    ans = T;
    check = `${T} · ${a} = ${P}, mert ${t} tízes · ${a} = ${a * t} tízes`;
    wrong.push({ v: t, msg: `${t} · ${a} csak ${t * a}. Tízesekkel számolj: ${t} tízes · ${a} = ${a * t} tízes = ${P}.` });
    wrong.push({ v: P - a, msg: 'Kivontál. Melyik számot kell szorozni, hogy kijöjjön az eredmény?' });
    wrong.push({ v: T + 10, msg: `${T + 10} · ${a} = ${(T + 10) * a}, ez több, mint ${P}.` });
    if (T - 10 > 0) wrong.push({ v: T - 10, msg: `${T - 10} · ${a} = ${(T - 10) * a}, ez kevesebb, mint ${P}.` });
  }
  const uniq = wrong.filter((w, i, arr) => w.v !== ans && w.v > 0 && w.v <= 200 && arr.findIndex((x) => x.v === w.v) === i);
  const three = shuffle(uniq).slice(0, 3);
  return { kind, text, ans, check, options: shuffle([{ v: ans, msg: '' }, ...three]) };
};

const KIND_LABELS = ['Szorzás', 'Részekre osztás', 'Hányszor van meg?', 'Hiányzó tényező'];

export const MulDiv200G3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I: tízesrudak csoportosítása
  const [task, setTask] = useState<{ a: number; t: number }>({ a: 3, t: 4 });
  const [groups, setGroups] = useState(1);
  const [per, setPer] = useState(1);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const clampG = (v: number) => Math.max(1, Math.min(8, v));
  const clampP = (v: number) => Math.max(1, Math.min(9, v));
  const labLines = Math.ceil(groups / rodPerLine(groups, per));
  const labH = 14 + labLines * 56 + 14;
  const check1 = () => {
    const P = task.a * task.t * 10;
    if (groups === task.a && per === task.t) {
      setMsg1({ ok: true, text: `Szuper! ${task.a} csoport, mindegyikben ${task.t} tízes. ${task.a} · ${task.t} tízes = ${task.a * task.t} tízes, vagyis ${task.a} · ${task.t * 10} = ${P}.` });
    } else if (groups === task.t && per === task.a) {
      setMsg1({ ok: false, text: `Majdnem! Most ${groups} csoportod van, mindegyikben ${per} tízes. Ez is ${P}, de a feladat ${task.a} csoportot kért.` });
    } else if (groups !== task.a) {
      setMsg1({ ok: false, text: `Most ${groups} csoportod van. ${task.a} csoport kell!` });
    } else {
      setMsg1({ ok: false, text: `A csoportok száma jó. Egy csoportban ${task.t * 10} legyen, az ${task.t} tízesrúd.` });
    }
  };
  const new1 = () => {
    let a = rnd(2, 6);
    let t = rnd(2, 9);
    while (a * t > 20 || (a === task.a && t === task.t)) {
      a = rnd(2, 6);
      t = rnd(2, 9);
    }
    setTask({ a, t });
    setGroups(1);
    setPer(1);
    setMsg1(null);
  };

  // Labor II
  const [t2, setT2] = useState<MulDiv200Task>(() => ({
    kind: 1,
    text: '120 : 4 = □',
    ans: 30,
    check: '120 = 12 tízes. 12 tízes : 4 = 3 tízes = 30',
    options: [
      { v: 3, msg: 'Ez csak 12 : 4. De 120 = 12 tízes, így az eredmény is tízes: 3 tízes = 30.' },
      { v: 30, msg: '' },
      { v: 40, msg: 'Ellenőrizd szorzással: 4 · 40 = 160, nem 120.' },
      { v: 116, msg: 'Kivontál. Itt osztani kell: egyenlő részekre bontjuk a számot.' }
    ]
  }));
  const [pick2, setPick2] = useState<number | null>(null);
  const ok2 = pick2 === t2.ans;
  const new2 = () => {
    setT2(makeMulDiv200Task());
    setPick2(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-count-200"
      subtopicId="szorzas-es-osztas"
      grade={3}
      chapterId="szamolas-200-ig"
      title="5. Szorzás és osztás"
      subtitle="Kerek tízesekkel szorzunk és osztunk 200-ig. A szorzótábla segít!"
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_szorzas_es_osztas_200_ig_tananyag.pdf"
      practiceTitle="Készen állsz a tízesekre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZÁMOLJ TÍZESEKKEL!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              4 · 30 = 4 · 3 tízes = 12 tízes = 120
            </div>
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              120 : 4 = 12 tízes : 4 = 3 tízes = 30
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A kerek tízest mondd <strong>tízesekben</strong>: 30 = 3 tízes.</li>
              <li>Számolj a <strong>szorzótáblával</strong>, aztán ne felejtsd el: az eredmény is <strong>tízes</strong>!</li>
              <li>Az osztást <strong>szorzással ellenőrizd</strong>: 30 · 4 = 120.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 38–40. o." badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>A szorzótáblát már tudod. Most <strong>kerek tízesekkel</strong> szorzunk és osztunk.</p>
          <p>A kerek tízes: 10, 20, 30 … 200. Ezekben az egyesek helyén 0 áll.</p>
          <p>Egy kék rúd a képeken mindig <strong>1 tízes</strong>, vagyis 10.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Egyforma csoportok tízesekből" badge="Kirakjuk" badgeColor="blue">
        <MulDiv200TensSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Összeadással hosszú" badge="+" badgeColor="sky">
            <p className="text-sm text-slate-700">40 + 40 + 40 = 120</p>
          </TheoryCard>
          <TheoryCard title="Szorzással rövid" badge="·" badgeColor="amber">
            <p className="text-sm text-slate-700">
              3 · 40 = 120. Ugyanannyi, mint <strong>40 · 3</strong>, mert a tényezők felcserélhetők.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. A szorzótábla segít" badge="3 lépés" badgeColor="emerald">
        <MulDiv200LadderSvg />
        <TheoryCallout type="tip" title="Így gondolkodj!">
          Ha tudod, hogy <strong>6 · 3 = 18</strong>, akkor azt is tudod, hogy <strong>6 · 30 = 180</strong>. A 30 tízszer akkora, mint a 3, ezért a szorzat is
          tízszer akkora.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Kétféle osztás" badge="Részekre osztás, bennfoglalás" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <MulDiv200SharingSvg />
            <p className="text-sm text-slate-700">
              <strong>Mennyi jut egyre?</strong> 160-at 4 egyenlő részre osztunk. 16 tízes : 4 = 4 tízes. Egy részben <strong>40</strong> van.
            </p>
          </div>
          <div className="space-y-2">
            <MulDiv200GroupingSvg />
            <p className="text-sm text-slate-700">
              <strong>Hányszor van meg?</strong> A 160-ban a 40 négyszer van meg. 16 tízes : 4 tízes = <strong>4</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="5. Pénzzel is megy" badge="Forint" badgeColor="orange">
        <MulDiv200CoinsSvg />
        <p className="text-sm text-slate-700">
          Hét darab 20 forintos 140 forint. Fordítva: a 140 forintban a 20 forint 7-szer van meg.
        </p>
      </TheorySection>

      <TheorySection title="6. Műveletcsalád és összefüggések" badge="Összefüggés" badgeColor="rose">
        <MulDiv200FamilySvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Tízszer akkora tényező" badge="szorzás" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>4 · 5 = 20</li>
              <li>4 · 50 = 200</li>
              <li>Az egyik tényező tízszer akkora lett, a szorzat is tízszer akkora.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Mindkettő tízszer akkora" badge="osztás" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>12 : 3 = 4</li>
              <li>120 : 30 = 4</li>
              <li>Az osztandó és az osztó is tízszer akkora lett. A hányados ugyanannyi maradt!</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) 7 · 20 = ?" badge="szorzás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>20 = 2 tízes.</li>
              <li>7 · 2 tízes = 14 tízes.</li>
              <li>14 tízes = <strong>140</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) 150 : 3 = ?" badge="osztás" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>150 = 15 tízes.</li>
              <li>15 tízes : 3 = 5 tízes = <strong>50</strong>.</li>
              <li>Ellenőrzés: 50 · 3 = 150. Jó!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány tálca kell?" badge="szöveges" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A pékségben 180 pogácsa sült. Egy tálcára 30 fér.</li>
              <li>Hányszor van meg a 30 a 180-ban? 18 tízes : 3 tízes = 6.</li>
              <li><strong>6 tálca kell.</strong> Ellenőrzés: 6 · 30 = 180.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz! Ne veszítsd el a nullát!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A tízesek eltűnnek?"
          wrong="4 · 30 = 12"
          wrongExplanation="Itt csak 4 · 3-at számoltunk. De a 30 nem 3, hanem 3 tízes!"
          correct="4 · 30 = 120"
          correctExplanation="4 · 3 tízes = 12 tízes. A 12 tízes 120."
          tip="Ugyanígy osztásnál: 120 : 4 nem 3, hanem 30. Ellenőrizz: 30 · 4 = 120."
        />
        <TheoryCallout type="warning" title="Két osztás, két eredmény">
          <strong>160 : 4 = 40</strong>, de <strong>160 : 40 = 4</strong>. Mindig nézd meg, mivel osztasz!
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="9. Labor I: Rakd ki tízesrudakkal!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-blue-50 rounded-xl p-3 text-lg text-blue-900 font-bold text-center">
            Rakd ki: {task.a} · {task.t * 10}
          </div>
          <p className="text-center text-sm text-slate-600">
            {task.a} csoport kell. Egy csoportban {task.t * 10} legyen!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Csoportok', v: groups, set: (v: number) => setGroups(clampG(v)) },
              { label: 'Tízesrúd egy csoportban', v: per, set: (v: number) => setPer(clampP(v)) }
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-3 bg-slate-50 rounded-xl p-2 border">
                <button
                  onClick={() => {
                    s.set(s.v - 1);
                    setMsg1(null);
                  }}
                  className="w-12 h-12 rounded-xl bg-slate-200 text-2xl font-black"
                  aria-label={`${s.label} kevesebb`}
                >
                  −
                </button>
                <div className="text-center min-w-[120px]">
                  <div className="text-xs text-slate-500">{s.label}</div>
                  <div className="text-2xl font-black text-slate-800">{s.v}</div>
                </div>
                <button
                  onClick={() => {
                    s.set(s.v + 1);
                    setMsg1(null);
                  }}
                  className="w-12 h-12 rounded-xl bg-blue-500 text-white text-2xl font-black"
                  aria-label={`${s.label} több`}
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <svg viewBox={`0 0 240 ${labH}`} className="w-full max-w-md h-auto mx-auto bg-blue-50/40 rounded-xl border border-blue-100" fontFamily={FONT}>
            <RodGroups groups={groups} per={per} y={14} rodH={40} />
            <text x="120" y={labH - 8} textAnchor="middle" fontSize="11" fill={INK}>
              {groups} csoport · {per} tízes
            </text>
          </svg>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check1} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button onClick={new1} className="px-5 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{msg1.text}</div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="10. Labor II: Melyik a jó szám?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center text-xs font-bold uppercase tracking-wide text-purple-500">{KIND_LABELS[t2.kind]}</div>
          <div className="text-center text-3xl font-black text-purple-900 bg-purple-50 rounded-xl py-4 tracking-wide">
            {ok2 ? t2.text.replace('□', String(t2.ans)) : t2.text}
          </div>
          <p className="text-center text-sm text-slate-600">Melyik szám kerül a □ helyére? Koppints rá!</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t2.options.map((o) => {
              const chosen = pick2 === o.v;
              return (
                <button
                  key={o.v}
                  onClick={() => setPick2(o.v)}
                  className={`rounded-2xl border-2 py-4 text-2xl font-black min-h-[64px] ${
                    chosen ? (o.v === t2.ans ? 'bg-emerald-200 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-white border-purple-200 text-purple-900'
                  }`}
                >
                  {o.v}
                </button>
              );
            })}
          </div>
          {pick2 !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {ok2 ? `Ügyes! ${t2.check}.` : t2.options.find((o) => o.v === pick2)?.msg}
            </div>
          )}
          <div className="flex justify-center">
            <button onClick={new2} className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulDiv200G3Theory;
