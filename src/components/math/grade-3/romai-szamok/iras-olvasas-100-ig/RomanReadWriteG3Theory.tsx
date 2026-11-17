import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { TensOnesTableSvg, WriteStepsSvg, ReadStepsSvg, LengthTrapSvg, RomanNumberLineSvg } from './RomanReadWriteG3Figures';
import { SIGN_COLOR, TENS_ROMAN, ONES_ROMAN, toRoman, splitRoman, sumAllSigns } from './RomanReadWriteG3Utils';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const Rom: React.FC<{ s: string; size?: string }> = ({ s, size = 'text-2xl' }) => (
  <span className={`font-serif font-black ${size} tracking-wide`}>
    {s ? (
      s.split('').map((ch, i) => (
        <span key={i} style={{ color: SIGN_COLOR[ch] }}>
          {ch}
        </span>
      ))
    ) : (
      <span className="text-slate-400 text-base">nincs</span>
    )}
  </span>
);

/** Labor II: feladat – írás (arab → római) vagy olvasás (római → arab). */
type Task = { mode: 'write' | 'read'; n: number };
const newTask = (prev?: Task): Task => {
  for (;;) {
    const n = rnd(11, 100);
    const t: Task = { mode: prev ? (prev.mode === 'write' ? 'read' : 'write') : 'write', n };
    if (!prev || prev.n !== n) return t;
  }
};

/** Olvasási feladat válaszlehetőségei: a jó válasz + tipikus hibák. */
const readChoices = (n: number): number[] => {
  const s = toRoman(n);
  const cands = [sumAllSigns(s), n + 10, n - 10, n + 2, n - 2, n + 1];
  const out = [n];
  for (const c of cands) if (c >= 1 && c <= 100 && !out.includes(c) && out.length < 4) out.push(c);
  return out.sort((a, b) => a - b);
};

export const RomanReadWriteG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Átváltó
  const [n, setN] = useState<number>(47);
  const change = (d: number) => setN(Math.max(1, Math.min(100, n + d)));
  const parts = splitRoman(n);
  const tens = Math.floor(n / 10);
  const ones = n % 10;

  // Labor II: Írd le! / Olvasd le!
  const [task, setTask] = useState<Task>({ mode: 'write', n: 64 });
  const [tPick, setTPick] = useState<number | null>(null);
  const [ePick, setEPick] = useState<number | null>(null);
  const [fb, setFb] = useState<{ ok: boolean; text: string } | null>(null);
  const [choices, setChoices] = useState<number[]>(readChoices(64));
  const tt = Math.floor(task.n / 10);
  const te = task.n % 10;
  const checkWrite = () => {
    if (tPick === null || ePick === null) {
      setFb({ ok: false, text: 'Válassz egy tízesrészt és egy egyesrészt is!' });
    } else if (tPick === tt && ePick === te) {
      setFb({ ok: true, text: `Szuper! ${task.n} = ${tt * 10} + ${te} = ${toRoman(task.n)}.` });
    } else if (tPick !== tt) {
      setFb({ ok: false, text: `Nézd meg a tízeseket! A ${task.n}-ben ${tt} tízes van, ez ${tt * 10}.` });
    } else {
      setFb({ ok: false, text: `A tízesrész jó! A ${task.n}-ben ${te} egyes van.` });
    }
  };
  const pickRead = (v: number) => {
    const s = toRoman(task.n);
    const p = splitRoman(task.n);
    if (v === task.n) setFb({ ok: true, text: `Szuper! ${p.t || '–'} = ${tt * 10}, ${p.e || '–'} = ${te}. ${s} = ${task.n}.` });
    else if (v === sumAllSigns(s)) setFb({ ok: false, text: 'Minden jelet hozzáadtál. Van itt kisebb jel a nagyobb előtt? Azt el kell venni!' });
    else setFb({ ok: false, text: `Vágd ketté: tízesrész ${p.t || 'nincs'}, egyesrész ${p.e || 'nincs'}. Mennyi az egyik, mennyi a másik?` });
  };
  const next = () => {
    const t = newTask(task);
    setTask(t);
    setTPick(null);
    setEPick(null);
    setFb(null);
    setChoices(readChoices(t.n));
  };

  return (
    <TheoryTemplate
      topicId="g3-roman-numbers"
      subtopicId="iras-olvasas-100-ig"
      grade={3}
      chapterId="romai-szamok"
      title="2. Római számok írása és olvasása 100-ig"
      subtitle="Bontsd a számot tízesekre és egyesekre, és máris le tudod írni rómaiul!"
      badge="3. OSZTÁLY • II. A RÓMAI SZÁMOK • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_romai_szamok_irasa_olvasasa_tananyag.pdf"
      practiceTitle="Készen állsz a római számokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TÍZESRÉSZ + EGYESRÉSZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              94 = 90 + 4 = XC + IV = XCIV
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Írás:</strong> bontsd tízesekre és egyesekre, írd le mindkettőt, és tedd egymás mellé.</li>
              <li><strong>Olvasás:</strong> vágd ketté a tízesrészre és az egyesrészre, és add össze őket.</li>
              <li>Elöl áll a tízesrész, utána az egyesrész.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 26–27. o." badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Már ismered az öt jelet: <strong>I = 1, V = 5, X = 10, L = 50, C = 100</strong>. Ismered a szabályokat is.
          </p>
          <p>
            Most megtanulod, hogyan írj le <strong>bármilyen számot 100-ig</strong> rómaiul. És azt is, hogyan olvass el egy hosszú római számot.
          </p>
        </div>
        <RomanNumberLineSvg />
      </TheorySection>

      <TheorySection title="2. A két segítő sor" badge="Táblázat" badgeColor="sky">
        <TensOnesTableSvg />
        <p className="text-sm text-slate-700">
          Minden szám egy <strong>tízesrészből</strong> és egy <strong>egyesrészből</strong> áll. Mindkettőt kikeresheted a táblázatból.
        </p>
        <TheoryCallout type="tip" title="Figyeld meg!">
          A tízesek sora ugyanúgy épül, mint az egyeseké. Csak az I helyett X, a V helyett L, az X helyett C áll. Nézd: IV és XL, IX és XC.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Így írj rómaiul!" badge="Írás" badgeColor="emerald">
        <WriteStepsSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TheoryCard title="1. lépés" badge="bontás" badgeColor="sky">
            <p className="text-sm text-slate-700">94 = 90 + 4</p>
          </TheoryCard>
          <TheoryCard title="2. lépés" badge="két rész" badgeColor="amber">
            <p className="text-sm text-slate-700">90 = XC, 4 = IV</p>
          </TheoryCard>
          <TheoryCard title="3. lépés" badge="egymás mellé" badgeColor="emerald">
            <p className="text-sm text-slate-700">XC + IV = XCIV</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Így olvass!" badge="Olvasás" badgeColor="emerald">
        <ReadStepsSvg />
        <p className="text-sm text-slate-700">
          Keresd meg, hol kezdődik az egyesrész: az első <strong>I</strong> vagy <strong>V</strong> jelnél. Ami előtte van, az a tízesrész.
        </p>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <TheoryTable
          headers={['Szám', 'Bontás', 'Tízesrész', 'Egyesrész', 'Rómaiul']}
          rows={[
            ['27', '20 + 7', 'XX', 'VII', 'XXVII'],
            ['36', '30 + 6', 'XXX', 'VI', 'XXXVI'],
            ['48', '40 + 8', 'XL', 'VIII', 'XLVIII'],
            ['63', '60 + 3', 'LX', 'III', 'LXIII'],
            ['85', '80 + 5', 'LXXX', 'V', 'LXXXV'],
            ['99', '90 + 9', 'XC', 'IX', 'XCIX'],
            ['70', '70 + 0', 'LXX', '–', 'LXX']
          ]}
        />
        <TheoryCallout type="info" title="Ha nincs egyes">
          A kerek tízeseknél nincs egyesrész. A 70 csak LXX, nem kell utána semmi. (Nullára nincs római jel.)
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Melyik a nagyobb?" badge="Összehasonlítás" badgeColor="purple">
        <LengthTrapSvg />
        <p className="text-sm text-slate-700">
          A <strong>hosszabb</strong> római szám nem mindig a <strong>nagyobb</strong>! Előbb olvasd el mindkettőt, aztán hasonlítsd össze.
        </p>
        <TheoryTable
          headers={['Előtte', 'A szám', 'Utána']}
          rows={[
            ['XXXVIII (38)', 'XXXIX (39)', 'XL (40)'],
            ['XLVIII (48)', 'XLIX (49)', 'L (50)'],
            ['LXXIX (79)', 'LXXX (80)', 'LXXXI (81)']
          ]}
        />
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hogyan írjuk a 99-et?"
          wrong="IC"
          wrongExplanation="Az I csak a V és az X elé kerülhet. A C elé nem!"
          correct="XCIX = XC + IX"
          correctExplanation="99 = 90 + 9. A 90 = XC, a 9 = IX."
          tip="Mindig bonts tízesrészre és egyesrészre!"
        />
        <TheoryTrapBox
          title="Hogyan írjuk a 45-öt?"
          wrong="VL"
          wrongExplanation="A V-t soha nem vonjuk el."
          correct="XLV = XL + V"
          correctExplanation="45 = 40 + 5. A 40 = XL, az 5 = V."
          tip="Elöl a tízesrész, utána az egyesrész."
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="8. Labor I: Római átváltó" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[-10, -1].map((d) => (
              <button key={d} onClick={() => change(d)} className="px-3 rounded-xl bg-slate-200 font-black text-lg min-h-[52px] min-w-[60px]">
                {d}
              </button>
            ))}
            <div className="px-5 py-2 rounded-2xl bg-sky-100 text-sky-900 text-4xl font-black min-w-[100px] text-center">{n}</div>
            {[1, 10].map((d) => (
              <button key={d} onClick={() => change(d)} className="px-3 rounded-xl bg-amber-400 text-white font-black text-lg min-h-[52px] min-w-[60px]">
                +{d}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 400 90" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            {Array.from({ length: tens }, (_, i) => (
              <rect key={`t${i}`} x={14 + i * 18} y="14" width="12" height="62" rx="2" fill="#60a5fa" stroke="#1e40af" />
            ))}
            {Array.from({ length: ones }, (_, i) => (
              <rect key={`e${i}`} x={14 + tens * 18 + 12 + i * 16} y="62" width="13" height="13" rx="2" fill="#fbbf24" stroke="#92400e" />
            ))}
          </svg>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-2">
              <div className="text-xs text-blue-800 font-bold">tízesrész: {tens * 10}</div>
              <Rom s={parts.t} />
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-2">
              <div className="text-xs text-amber-800 font-bold">egyesrész: {ones}</div>
              <Rom s={parts.e} />
            </div>
            <div className="rounded-xl bg-emerald-50 border-2 border-emerald-300 p-2">
              <div className="text-xs text-emerald-800 font-bold">együtt: {n}</div>
              <Rom s={toRoman(n)} />
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={() => setN(rnd(1, 100))} className="px-5 py-2 rounded-xl bg-amber-500 text-white font-bold min-h-[48px]">
              Új szám
            </button>
          </div>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="9. Labor II: Írd le! Olvasd le!" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          {task.mode === 'write' ? (
            <>
              <div className="bg-purple-50 rounded-xl p-3 text-center text-purple-900">
                Írd le rómaiul: <span className="text-3xl font-black">{task.n}</span>
              </div>
              <div className="text-sm font-bold text-blue-800">1. Válaszd ki a tízesrészt!</div>
              <div className="grid grid-cols-5 gap-2">
                {TENS_ROMAN.slice(1).map((s, i) => (
                  <button
                    key={s}
                    onClick={() => {
                      setTPick(i + 1);
                      setFb(null);
                    }}
                    className={`rounded-xl border-2 min-h-[48px] ${tPick === i + 1 ? 'bg-blue-200 border-blue-600' : 'bg-blue-50 border-blue-200'}`}
                  >
                    <Rom s={s} size="text-base" />
                  </button>
                ))}
              </div>
              <div className="text-sm font-bold text-amber-800">2. Válaszd ki az egyesrészt!</div>
              <div className="grid grid-cols-5 gap-2">
                {ONES_ROMAN.map((s, i) => (
                  <button
                    key={`e${i}`}
                    onClick={() => {
                      setEPick(i);
                      setFb(null);
                    }}
                    className={`rounded-xl border-2 min-h-[48px] ${ePick === i ? 'bg-amber-200 border-amber-600' : 'bg-amber-50 border-amber-200'}`}
                  >
                    <Rom s={s} size="text-base" />
                  </button>
                ))}
              </div>
              <div className="text-center min-h-[44px] rounded-xl border-2 border-dashed border-slate-300 p-2">
                <Rom s={(tPick !== null ? TENS_ROMAN[tPick] : '') + (ePick !== null ? ONES_ROMAN[ePick] : '')} size="text-3xl" />
              </div>
              <div className="flex justify-center">
                <button onClick={checkWrite} className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold min-h-[48px]">
                  Ellenőrzés
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-purple-50 rounded-xl p-3 text-center text-purple-900">
                Olvasd le! Melyik szám ez? <div className="mt-1"><Rom s={toRoman(task.n)} size="text-4xl" /></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {choices.map((v) => (
                  <button key={v} onClick={() => pickRead(v)} className="rounded-2xl bg-purple-100 border-2 border-purple-400 text-purple-900 text-2xl font-black py-3 min-h-[60px]">
                    {v}
                  </button>
                ))}
              </div>
            </>
          )}
          {fb && <div className={`rounded-xl p-3 text-center text-sm font-bold ${fb.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{fb.text}</div>}
          <div className="flex justify-center">
            <button onClick={next} className="px-5 py-2 rounded-xl bg-slate-700 text-white font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RomanReadWriteG3Theory;
