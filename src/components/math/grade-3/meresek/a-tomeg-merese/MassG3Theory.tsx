import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ScaleKindsSvg, WeightSetSvg, KgEqualsDkgSvg, KgDkgSplitSvg, KitchenDialSvg, PantryChartSvg } from './MassG3Figures';
import { FONT, Weight } from './MassG3Parts';
import { Ico, SackIcon } from '../mit-mivel-merunk/WhatToMeasureG3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** dkg → „1 kg 35 dkg” alak */
export const kgDkg = (d: number) => {
  const kg = Math.floor(d / 100);
  const r = d % 100;
  if (kg === 0) return `${r} dkg`;
  if (r === 0) return `${kg} kg`;
  return `${kg} kg ${r} dkg`;
};

// ---------------------------------------------------------------------------
// Labor I – kétkarú mérleg
// ---------------------------------------------------------------------------
const WEIGHTS = [100, 50, 20, 10, 5] as const;
const W_SIZE: Record<number, number> = { 100: 40, 50: 34, 20: 30, 10: 26, 5: 22 };
const THINGS = ['liszt', 'cukor', 'rizs', 'krumpli', 'alma', 'dió'];
const az = (n: string) => (/^[aáeéiíoóöőuúüű]/i.test(n) ? 'az' : 'a');
const Az = (n: string) => (az(n) === 'az' ? 'Az' : 'A');

const BalanceLab: React.FC<{ target: number; thing: string; pan: number[]; onRemove: (i: number) => void }> = ({ target, thing, pan, onRemove }) => {
  const sum = pan.reduce((a, b) => a + b, 0);
  const deg = sum === target ? 0 : sum > target ? 9 : -9;
  const a = (deg * Math.PI) / 180;
  const L = 140;
  const lx = 200 - L * Math.cos(a);
  const ly = 64 - L * Math.sin(a);
  const rx = 200 + L * Math.cos(a);
  const ry = 64 + L * Math.sin(a);
  const tr = 'transform 0.6s ease';
  // súlyok elrendezése a jobb serpenyőben
  const placed: { v: number; cx: number; by: number; w: number }[] = [];
  let x = -52;
  let by = 0;
  pan.forEach((v) => {
    const w = W_SIZE[v];
    if (x + w > 52) {
      x = -52;
      by -= 30;
    }
    placed.push({ v, cx: x + w / 2, by, w });
    x += w + 3;
  });
  const panShape = (
    <g>
      <line x1="0" y1="0" x2="-48" y2="70" stroke="#475569" strokeWidth="2" />
      <line x1="0" y1="0" x2="48" y2="70" stroke="#475569" strokeWidth="2" />
      <path d="M-62 70 Q0 96 62 70 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2.5" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 250" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
      <rect x="185" y="64" width="30" height="160" fill="#64748b" />
      <path d="M130 238 L270 238 L250 222 L150 222 Z" fill="#475569" />
      <g style={{ transform: `rotate(${deg}deg)`, transformOrigin: '200px 64px', transition: tr }}>
        <rect x="56" y="58" width="288" height="12" rx="6" fill="#334155" />
        <path d="M200 64 L192 20 L208 20 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
      </g>
      <circle cx="200" cy="64" r="8" fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
      <g style={{ transform: `translate(${lx}px, ${ly}px)`, transition: tr }}>
        {panShape}
        <Ico x={-34} y={2} s={0.68}>
          <SackIcon label="?" fs={30} />
        </Ico>
        <text x="0" y="-8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">{thing}</text>
      </g>
      <g style={{ transform: `translate(${rx}px, ${ry}px)`, transition: tr }}>
        {panShape}
        {placed.map((p, i) => (
          <g key={i} onClick={() => onRemove(i)} style={{ cursor: 'pointer' }}>
            <Weight
              cx={p.cx}
              by={78 + p.by}
              w={p.w}
              label={p.v === 100 ? '1 kg' : String(p.v)}
              kg={p.v === 100}
              unit={p.v === 100 ? undefined : 'dkg'}
              fs={p.v === 100 ? 11 : p.w * 0.42}
            />
          </g>
        ))}
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Labor II – átváltás
// ---------------------------------------------------------------------------
type Conv = { kind: 'toDkg' | 'toKg' | 'missing'; a: number };
const makeConv = (): Conv => {
  const k = rnd(0, 2);
  if (k === 0) return { kind: 'toDkg', a: rnd(101, 199) };
  if (k === 1) return { kind: 'toKg', a: rnd(101, 199) };
  return { kind: 'missing', a: rnd(11, 95) };
};

const inputCls = 'w-24 text-center text-2xl font-black rounded-xl border-2 border-sky-300 py-2 focus:outline-none focus:border-sky-600';

export const MassG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [target, setTarget] = useState(85);
  const [thing, setThing] = useState('liszt');
  const [pan, setPan] = useState<number[]>([]);
  const sum = pan.reduce((a, b) => a + b, 0);
  const balanced = sum === target;
  const newBalance = () => {
    setTarget(5 * rnd(3, 40));
    setThing(THINGS[rnd(0, THINGS.length - 1)]);
    setPan([]);
  };

  // Labor II
  const [conv, setConv] = useState<Conv>({ kind: 'toDkg', a: 137 });
  const [in1, setIn1] = useState('');
  const [in2, setIn2] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const newConv = () => {
    setConv(makeConv());
    setIn1('');
    setIn2('');
    setMsg(null);
  };
  const check = () => {
    const v1 = parseInt(in1, 10);
    const v2 = parseInt(in2, 10);
    const kg = Math.floor(conv.a / 100);
    const r = conv.a % 100;
    if (conv.kind === 'toDkg') {
      if (v1 === conv.a) setMsg({ ok: true, text: `Ügyes! ${kgDkg(conv.a)} = 100 dkg + ${r} dkg = ${conv.a} dkg.` });
      else if (v1 === kg + r) setMsg({ ok: false, text: 'Az 1 kg nem 1 dkg! 1 kg = 100 dkg. Ehhez add hozzá a dkg-ot!' });
      else if (r >= 10 && String(v1) === `${kg}0${r}`) setMsg({ ok: false, text: `Ne írd egymás mellé a számokat! 100 dkg + ${r} dkg = ?` });
      else setMsg({ ok: false, text: `Nem ennyi. 1 kg = 100 dkg. Mennyi 100 + ${r}?` });
    } else if (conv.kind === 'toKg') {
      if (v1 === kg && v2 === r) setMsg({ ok: true, text: `Szuper! ${conv.a} dkg = 100 dkg + ${r} dkg = ${kgDkg(conv.a)}.` });
      else if (v1 !== kg) setMsg({ ok: false, text: `Nézd a kg-ot! 100 dkg = 1 kg. A ${conv.a} dkg-ban 1 egész kg van.` });
      else setMsg({ ok: false, text: `A kg jó! A maradék: ${conv.a} − 100 = ?` });
    } else {
      if (v1 === 100 - conv.a) setMsg({ ok: true, text: `Pontosan! ${conv.a} dkg + ${100 - conv.a} dkg = 100 dkg = 1 kg.` });
      else if (Math.abs(v1 + conv.a - 100) === 10) setMsg({ ok: false, text: 'Majdnem! Figyelj a tízesekre. Adj hozzá, és ellenőrizd: 100 lesz?' });
      else setMsg({ ok: false, text: `1 kg = 100 dkg. Mennyi kell még ${conv.a}-hoz, hogy 100 legyen? Ellenőrizd összeadással!` });
    }
  };

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="a-tomeg-merese"
      grade={3}
      chapterId="meresek"
      title="2. A tömeg mérése"
      subtitle="Mérlegek, a kilogramm és az új mértékegység: a dekagramm."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="slate"
      pdfFilename="3_osztaly_a_tomeg_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — KG ÉS DKG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-center font-mono text-base font-black text-slate-900 dark:text-slate-100">
              1 kg = 100 dkg
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>dkg = dekagramm. Kisebb, mint a kg.</li>
              <li>1 kg 35 dkg = 100 dkg + 35 dkg = 135 dkg.</li>
              <li>Összehasonlítás előtt válts át dkg-ra!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 45–46. o." badgeColor="slate">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A tömeget mérleggel mérjük. Eddig a <strong>kilogrammot (kg)</strong> ismerted.</p>
          <p>De milyen nehéz egy alma? Ez sokkal kevesebb 1 kg-nál. Ehhez kell egy kisebb mértékegység: a <strong>dekagramm (dkg)</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Sokféle mérleg" badge="Mivel mérünk?" badgeColor="sky">
        <ScaleKindsSvg />
        <TheoryCallout type="info" title="Kétkarú mérleg">
          A nehezebb oldal lefelé billen. Ha a két oldal egyforma nehéz, a mérleg <strong>egyensúlyban</strong> van: a karja vízszintes.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Az új mértékegység: a dekagramm" badge="dkg" badgeColor="amber">
        <WeightSetSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="dekagramm" badge="dkg" badgeColor="amber">
            <p className="text-sm text-slate-700">Így írjuk röviden: <strong>dkg</strong>. Néha így is látod: dag.</p>
          </TheoryCard>
          <TheoryCard title="Egy alma" badge="kb. 15 dkg" badgeColor="rose">
            <p className="text-sm text-slate-700">Egy közepes alma kb. 15–20 dkg.</p>
          </TheoryCard>
          <TheoryCard title="Egy csoki" badge="kb. 10 dkg" badgeColor="purple">
            <p className="text-sm text-slate-700">Egy tábla csoki kb. 10 dkg.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. 1 kg = 100 dkg" badge="Egyensúly" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <KgEqualsDkgSvg />
          <div className="space-y-3 text-sm text-slate-700">
            <p>A bal oldalon 1 kg van. A jobb oldalon dkg-os súlyok. A mérleg egyensúlyban van.</p>
            <p>Tehát <strong>1 kg = 100 dkg</strong>.</p>
            <TheoryTable
              headers={['súlyok', 'együtt']}
              rows={[
                ['50 dkg + 50 dkg', '100 dkg = 1 kg'],
                ['50 dkg + 20 dkg + 20 dkg + 10 dkg', '100 dkg = 1 kg'],
                ['5 db 20 dkg-os', '100 dkg = 1 kg']
              ]}
            />
          </div>
        </div>
        <TheoryCallout type="tip" title="A boltban hallod">
          „Fél kiló” = 50 dkg. 50 dkg + 50 dkg = 1 kg.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. kg és dkg együtt" badge="Átváltás" badgeColor="orange">
        <KgDkgSplitSvg />
        <TheoryTable
          headers={['kg és dkg', 'csak dkg']}
          rows={[
            ['1 kg 35 dkg', '135 dkg'],
            ['1 kg 5 dkg', '105 dkg'],
            ['1 kg 50 dkg', '150 dkg'],
            ['2 kg', '200 dkg']
          ]}
        />
        <TheoryCallout type="info" title="Visszafelé is megy">
          172 dkg = 100 dkg + 72 dkg = <strong>1 kg 72 dkg</strong>. A 100 dkg-ból lesz az 1 kg.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Melyik a nehezebb?" badge="< > =" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Előbb válts át!" badge="dkg-ra" badgeColor="purple">
            <p className="text-sm text-slate-700">1 kg 8 dkg ○ 180 dkg</p>
            <p className="text-sm text-slate-700">1 kg 8 dkg = 108 dkg.</p>
            <p className="text-sm text-slate-700 font-bold">108 dkg &lt; 180 dkg</p>
          </TheoryCard>
          <TheoryCard title="Egész kg szomszédok" badge="kg" badgeColor="sky">
            <p className="text-sm text-slate-700">137 dkg = 1 kg 37 dkg.</p>
            <p className="text-sm text-slate-700 font-bold">1 kg &lt; 137 dkg &lt; 2 kg</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Olvasd le!" badge="Számlap, diagram" badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <KitchenDialSvg />
          <div className="space-y-2 text-sm text-slate-700">
            <p>A konyhai mérleg számlapján a mutató megmutatja a tömeget.</p>
            <p>A számok között kis vonalak is vannak. Számold meg, hány vonalat lépsz!</p>
          </div>
        </div>
        <PantryChartSvg />
        <TheoryCallout type="tip" title="A diagram">
          Minden oszlop egy élelmiszer. Nézd meg, hol ér véget! A rizs pontosan 100 dkg = 1 kg. Az alma 130 dkg, ez 30 dkg-mal több 1 kg-nál.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) A kosár" badge="Összeadás" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>40 dkg sajt, 25 dkg sonka, 1 kg alma.</li>
              <li>1 kg = 100 dkg.</li>
              <li>40 + 25 + 100 = 165.</li>
              <li>Ez <strong>165 dkg = 1 kg 65 dkg</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mennyi hiányzik?" badge="1 kg-ig" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A tálon 65 dkg szilva van.</li>
              <li>1 kg-ot szeretnél.</li>
              <li>65 + □ = 100.</li>
              <li>□ = <strong>35 dkg</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) A mérleg" badge="Egyensúly" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Bal: egy doboz.</li>
              <li>Jobb: 1 kg + 20 dkg + 5 dkg.</li>
              <li>Egyensúly van.</li>
              <li>A doboz <strong>1 kg 25 dkg = 125 dkg</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="1 kg 5 dkg = ?"
          wrong="1 kg 5 dkg = 15 dkg"
          wrongExplanation="Az 1 kg nem 1 dkg és nem 10 dkg! Így túl kevés lesz."
          correct="1 kg 5 dkg = 105 dkg"
          correctExplanation="1 kg = 100 dkg. 100 dkg + 5 dkg = 105 dkg."
          tip="Az 1 kg helyére mindig 100 dkg-ot gondolj!"
        />
        <TheoryCallout type="warning" title="Ne írd egymás mellé!">
          1 kg 50 dkg nem 1050 dkg. Helyesen: 100 + 50 = <strong>150 dkg</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="10. Labor I: Hozd egyensúlyba a mérleget!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 text-sm">
            Milyen nehéz {az(thing)} <strong>{thing}</strong>? Tegyél súlyokat a jobb oldalra, amíg egyensúly lesz! A súlyra koppintva leveszed.
          </div>
          <BalanceLab target={target} thing={thing} pan={pan} onRemove={(i) => setPan(pan.filter((_, k) => k !== i))} />
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {WEIGHTS.map((w) => (
              <button
                key={w}
                disabled={balanced || pan.length >= 10}
                onClick={() => setPan([...pan, w])}
                className={`px-2 py-3 rounded-xl font-bold text-sm min-h-[52px] text-white disabled:opacity-40 ${w === 100 ? 'bg-slate-700' : 'bg-slate-500'}`}
              >
                + {w === 100 ? '1 kg' : `${w} dkg`}
              </button>
            ))}
            <button onClick={() => setPan([])} className="px-2 py-3 rounded-xl font-bold text-sm min-h-[52px] bg-slate-100 text-slate-700 border-2 border-slate-300">
              Kiürítem
            </button>
          </div>
          <div className="text-center text-base font-bold text-slate-700">A jobb oldalon: {sum === 0 ? '0 dkg' : `${sum} dkg${sum >= 100 ? ` = ${kgDkg(sum)}` : ''}`}</div>
          <div className={`rounded-xl p-3 text-center text-sm font-bold ${balanced ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-50 text-amber-900'}`}>
            {balanced
              ? `Egyensúly! ${Az(thing)} ${thing} tömege ${target} dkg${target >= 100 ? ` = ${kgDkg(target)}` : ''}.`
              : sum < target
                ? `${Az(thing)} ${thing} oldala van lent. ${Az(thing)} ${thing} nehezebb. Tegyél még súlyt!`
                : 'A súlyok oldala van lent. Túl sok a súly. Koppints egy súlyra, és vedd le!'}
          </div>
          <button onClick={newBalance} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">
            Új feladat
          </button>
        </div>
      </TheorySection>

      <TheorySection title="11. Labor II: Váltsd át!" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-4 flex flex-wrap items-center justify-center gap-2 text-2xl font-black text-sky-900">
            {conv.kind === 'toDkg' && (
              <>
                <span>{kgDkg(conv.a)} =</span>
                <input inputMode="numeric" value={in1} onChange={(e) => { setIn1(e.target.value); setMsg(null); }} className={inputCls} aria-label="dkg" />
                <span>dkg</span>
              </>
            )}
            {conv.kind === 'toKg' && (
              <>
                <span>{conv.a} dkg =</span>
                <input inputMode="numeric" value={in1} onChange={(e) => { setIn1(e.target.value); setMsg(null); }} className={inputCls} aria-label="kg" />
                <span>kg</span>
                <input inputMode="numeric" value={in2} onChange={(e) => { setIn2(e.target.value); setMsg(null); }} className={inputCls} aria-label="dkg" />
                <span>dkg</span>
              </>
            )}
            {conv.kind === 'missing' && (
              <>
                <span>{conv.a} dkg +</span>
                <input inputMode="numeric" value={in1} onChange={(e) => { setIn1(e.target.value); setMsg(null); }} className={inputCls} aria-label="dkg" />
                <span>dkg = 1 kg</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
            <button onClick={newConv} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          {msg && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg.text}</div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MassG3Theory;
