import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import { MulArraySvg, MulDivNamesSvg, GroupingSvg, SharingSvg, SevenJumpsSvg, FamilySvg } from './MulDiv100G3Figures';

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
// Labor II: hiányzó szám a műveletcsaládban
// kind 0: □ · b = p   1: a · □ = p   2: p : a = □   3: p : □ = b
// ---------------------------------------------------------------------------
interface FamTask {
  a: number;
  b: number;
  kind: number;
  options: number[];
}
const famAnswer = (t: FamTask) => (t.kind === 0 ? t.a : t.kind === 1 ? t.b : t.kind === 2 ? t.b : t.a);
const makeFamTask = (a: number, b: number, kind: number, doShuffle: boolean): FamTask => {
  const p = a * b;
  const t = { a, b, kind, options: [] as number[] };
  const ans = famAnswer(t);
  const wrong = [p, a + b, ans + 1, ans - 1, kind < 2 ? (kind === 0 ? b : a) : p - ans].filter(
    (v, i, arr) => v > 0 && v !== ans && arr.indexOf(v) === i
  );
  const three = (doShuffle ? shuffle(wrong) : wrong).slice(0, 3);
  t.options = doShuffle ? shuffle([ans, ...three]) : [ans, ...three].sort((x, y) => x - y);
  return t;
};
const famText = (t: FamTask, fill?: number) => {
  const p = t.a * t.b;
  const box = fill === undefined ? '□' : String(fill);
  switch (t.kind) {
    case 0:
      return `${box} · ${t.b} = ${p}`;
    case 1:
      return `${t.a} · ${box} = ${p}`;
    case 2:
      return `${p} : ${t.a} = ${box}`;
    default:
      return `${p} : ${box} = ${t.b}`;
  }
};

export const MulDiv100G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: korongrács
  const [task, setTask] = useState<{ r: number; c: number }>({ r: 3, c: 6 });
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);
  const [gridMsg, setGridMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const clamp = (v: number) => Math.max(1, Math.min(10, v));
  const checkGrid = () => {
    const p = task.r * task.c;
    if (rows === task.r && cols === task.c) {
      setGridMsg({ ok: true, text: `Szuper! ${task.r} sor, soronként ${task.c} korong: ${task.r} · ${task.c} = ${p}. Ellenőrzés: ${p} : ${task.c} = ${task.r}.` });
    } else if (rows === task.c && cols === task.r) {
      setGridMsg({
        ok: false,
        text: `Majdnem! Most ${rows} sorod van, soronként ${cols} koronggal. Ez is ${p} korong, mert a tényezők felcserélhetők. De a feladat ${task.r} sort kért.`
      });
    } else {
      setGridMsg({
        ok: false,
        text: `Most ${rows} · ${cols} = ${rows * cols} korong van. Kell: ${task.r} sor, és minden sorban ${task.c} korong.`
      });
    }
  };
  const newGrid = () => {
    let r = rnd(2, 9);
    let c = rnd(2, 9);
    while (r === task.r && c === task.c) {
      r = rnd(2, 9);
      c = rnd(2, 9);
    }
    setTask({ r, c });
    setRows(1);
    setCols(1);
    setGridMsg(null);
  };

  // Labor II
  const [fam, setFam] = useState<FamTask>(() => makeFamTask(7, 6, 0, false));
  const [famPick, setFamPick] = useState<number | null>(null);
  const famAns = famAnswer(fam);
  const famOk = famPick === famAns;
  const famHint = (v: number) => {
    const p = fam.a * fam.b;
    if (fam.kind < 2) {
      return `Próbáld ki: ${famText(fam, v).replace(` = ${p}`, '')} = ${fam.kind === 0 ? v * fam.b : fam.a * v}, nem ${p}. Melyik szám szorozva ad ${p}-t?`;
    }
    if (fam.kind === 2) {
      return `Ellenőrizd szorzással: ${v} · ${fam.a} = ${v * fam.a}, nem ${p}.`;
    }
    return `Ellenőrizd szorzással: ${fam.b} · ${v} = ${fam.b * v}, nem ${p}.`;
  };
  const newFam = () => {
    setFam(makeFamTask(rnd(2, 10), rnd(2, 9), rnd(0, 3), true));
    setFamPick(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-count-100"
      subtopicId="szorzas-es-osztas"
      grade={3}
      chapterId="szamolas-100-ig"
      title="3. Szorzás és osztás"
      subtitle="Ismételjük át a szorzótáblát! Hogyan függ össze a szorzás és az osztás?"
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_szorzas_es_osztas_tananyag.pdf"
      practiceTitle="Készen állsz a szorzótáblára?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SZORZÁS ÉS AZ OSZTÁS PÁROK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              6 · 8 = 48 → 48 : 8 = 6 és 48 : 6 = 8
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Szorzásnál a <strong>tényezők felcserélhetők</strong>: 6 · 8 = 8 · 6.</li>
              <li>Az osztást <strong>szorzással ellenőrizzük</strong>: 48 : 6 = 8, mert 8 · 6 = 48.</li>
              <li>Osztásnál a számok <strong>nem cserélhetők</strong> fel.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 11. o." badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>A szorzótáblát már ismered. Most átismételjük.</p>
          <p>
            Megnézzük, hogyan hívjuk a számokat a műveletben. Megtanuljuk, hogyan <strong>segít a szorzás az osztásban</strong>.
          </p>
        </div>
      </TheorySection>

      <TheorySection title="2. A szorzás: egyforma csoportok" badge="Kirakjuk" badgeColor="orange">
        <MulArraySvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Összeadással hosszú" badge="+" badgeColor="sky">
            <p className="text-sm text-slate-700">7 + 7 + 7 + 7 = 28</p>
          </TheoryCard>
          <TheoryCard title="Szorzással rövid" badge="·" badgeColor="amber">
            <p className="text-sm text-slate-700">
              4 · 7 = 28. Ha az oszlopokat nézed: 7 · 4 = 28. <strong>Ugyanannyi!</strong>
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. A számok neve" badge="Elnevezések" badgeColor="sky">
        <MulDivNamesSvg />
        <TheoryCallout type="tip" title="Jegyezd meg!">
          Szorzásnál: <strong>tényező · tényező = szorzat</strong>. Osztásnál: <strong>osztandó : osztó = hányados</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Kétféle osztás" badge="Bennfoglalás, részekre osztás" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <GroupingSvg />
            <p className="text-sm text-slate-700">
              <strong>Hány csoport lesz?</strong> 18 gyöngyből hármas csoportokat rakunk. 6 csoport lesz.
            </p>
          </div>
          <div className="space-y-2">
            <SharingSvg />
            <p className="text-sm text-slate-700">
              <strong>Mennyi jut egyre?</strong> 12 almát 3 tányérra osztunk. Mindegyikre 4 jut.
            </p>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="5. Műveletcsalád és ellenőrzés" badge="Összefüggés" badgeColor="rose">
        <FamilySvg />
        <p className="text-sm text-slate-700">
          Három szám, négy művelet. Ha tudod a szorzást, tudod az osztást is!
        </p>
        <SevenJumpsSvg />
        <p className="text-sm text-slate-700">
          A 7-es szorzótábla: 0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70. A 63-ig 9-et ugrik a béka: <strong>63 : 7 = 9</strong>.
        </p>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) □ · 6 = 42" badge="hiányzó tényező" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Melyik számot szorzod 6-tal, hogy 42 legyen?</li>
              <li>Mondd a 6-os sort: 6, 12, 18, 24, 30, 36, <strong>42</strong>.</li>
              <li>Ez a 7. szám: <strong>7 · 6 = 42</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) 56 : 8 = ?" badge="osztás" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Gondolj a szorzásra: ? · 8 = 56.</li>
              <li>7 · 8 = 56, tehát <strong>56 : 8 = 7</strong>.</li>
              <li>Ellenőrzés: 7 · 8 = 56. Jó!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány pad kell?" badge="szöveges" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>32 gyerek ül le. Egy padra 4 gyerek fér.</li>
              <li>Hány négyes csoport van 32-ben? 32 : 4 = 8.</li>
              <li><strong>8 pad kell.</strong> Ellenőrzés: 8 · 4 = 32.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz! Az osztásnál nem cserélhetsz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Szorzás és osztás nem ugyanúgy viselkedik"
          wrong="20 : 4 = 4 : 20"
          wrongExplanation="A szorzásnál cserélhetsz (4 · 5 = 5 · 4), de az osztásnál nem!"
          correct="20 : 4 = 5"
          correctExplanation="Az osztandó mindig elöl áll. 20 korongot osztunk 4 felé: mindenkinek 5 jut."
          tip="Ellenőrizz mindig szorzással: 5 · 4 = 20."
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="8. Labor I: Korongrács" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-orange-50 rounded-xl p-3 text-base text-orange-900 font-bold text-center">
            Rakj ki {task.r} sort! Minden sorban {task.c} korong legyen!
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Sorok', v: rows, set: setRows },
              { label: 'Korong egy sorban', v: cols, set: setCols }
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-3 bg-slate-50 rounded-xl p-2 border">
                <button
                  onClick={() => {
                    s.set(clamp(s.v - 1));
                    setGridMsg(null);
                  }}
                  className="w-12 h-12 rounded-xl bg-slate-200 text-2xl font-black"
                  aria-label={`${s.label} kevesebb`}
                >
                  −
                </button>
                <div className="text-center min-w-[110px]">
                  <div className="text-xs text-slate-500">{s.label}</div>
                  <div className="text-2xl font-black text-slate-800">{s.v}</div>
                </div>
                <button
                  onClick={() => {
                    s.set(clamp(s.v + 1));
                    setGridMsg(null);
                  }}
                  className="w-12 h-12 rounded-xl bg-orange-500 text-white text-2xl font-black"
                  aria-label={`${s.label} több`}
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 330 330" className="w-full max-w-xs h-auto mx-auto bg-amber-50 rounded-xl border border-amber-200">
            {Array.from({ length: rows }, (_, r) =>
              Array.from({ length: cols }, (_, c) => (
                <circle key={`${r}-${c}`} cx={165 - (cols - 1) * 15 + c * 30} cy={165 - (rows - 1) * 15 + r * 30} r="11" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
              ))
            )}
          </svg>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={checkGrid} className="px-5 py-3 rounded-xl bg-orange-600 text-white font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button onClick={newGrid} className="px-5 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          {gridMsg && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${gridMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
              {gridMsg.text}
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="9. Labor II: Melyik szám hiányzik?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center text-3xl font-black text-purple-900 bg-purple-50 rounded-xl py-4 tracking-wide">
            {famText(fam, famOk ? famAns : undefined)}
          </div>
          <p className="text-center text-sm text-slate-600">Melyik szám kerül a □ helyére? Koppints rá!</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {fam.options.map((v) => {
              const chosen = famPick === v;
              return (
                <button
                  key={v}
                  onClick={() => setFamPick(v)}
                  className={`rounded-2xl border-2 py-4 text-2xl font-black min-h-[64px] ${
                    chosen ? (v === famAns ? 'bg-emerald-200 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-white border-purple-200 text-purple-900'
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
          {famPick !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${famOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {famOk
                ? `Ügyes! A család: ${fam.a} · ${fam.b} = ${fam.a * fam.b}, ${fam.b} · ${fam.a} = ${fam.a * fam.b}, ${fam.a * fam.b} : ${fam.a} = ${fam.b}, ${fam.a * fam.b} : ${fam.b} = ${fam.a}.`
                : famHint(famPick)}
            </div>
          )}
          <div className="flex justify-center">
            <button onClick={newFam} className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulDiv100G3Theory;
