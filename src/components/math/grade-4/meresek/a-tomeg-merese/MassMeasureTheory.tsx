import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { BalanceScaleSvg, MassUnitLadderSvg, HarvestChartSvg, ContainersSvg, KitchenScalesSvg } from './MassMeasureFigures';

const sp = (n: number) => Math.abs(n) < 10000 ? String(n) : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** g → „X kg Y dkg Z g” olvasható alak */
const fmtMass = (g: number) => {
  const kg = Math.floor(g / 1000);
  const dkg = Math.floor((g % 1000) / 10);
  const gr = g % 10;
  const parts: string[] = [];
  if (kg) parts.push(`${kg} kg`);
  if (dkg) parts.push(`${dkg} dkg`);
  if (gr) parts.push(`${gr} g`);
  return parts.length ? parts.join(' ') : '0 g';
};

// ---------------------------------------------------------------------------
// Labor I: kétkarú mérleg
// ---------------------------------------------------------------------------
const OBJECTS = [
  { name: 'egy alma', emoji: '🍎', g: 230 },
  { name: 'egy darab sajt', emoji: '🧀', g: 250 },
  { name: 'egy tábla csoki', emoji: '🍫', g: 150 },
  { name: 'egy szilva', emoji: '🍑', g: 60 },
  { name: 'egy zacskó liszt', emoji: '🌾', g: 1000 },
  { name: 'egy zacskó bazsalikom', emoji: '🌿', g: 8 },
  { name: 'egy cukkini', emoji: '🥒', g: 900 }
];
const WEIGHTS = [
  { label: '50 dkg', g: 500 },
  { label: '20 dkg', g: 200 },
  { label: '10 dkg', g: 100 },
  { label: '5 dkg', g: 50 },
  { label: '2 dkg', g: 20 },
  { label: '1 dkg', g: 10 },
  { label: '5 g', g: 5 },
  { label: '2 g', g: 2 },
  { label: '1 g', g: 1 }
];

// ---------------------------------------------------------------------------
// Labor II: átváltó feladatok
// ---------------------------------------------------------------------------
type ConvTask = { text: string; answer: string; options: string[] };
const rnd = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const makeTask = (): ConvTask => {
  const kind = rnd(0, 5);
  let text = '';
  let answer = '';
  let wrong: string[] = [];
  if (kind === 0) {
    const kg = rnd(2, 9);
    text = `${kg} kg = ? dkg`;
    answer = `${kg * 100} dkg`;
    wrong = [`${kg * 10} dkg`, `${sp(kg * 1000)} dkg`, `${kg} dkg`];
  } else if (kind === 1) {
    const kg = rnd(2, 9);
    text = `${kg} kg = ? g`;
    answer = `${sp(kg * 1000)} g`;
    wrong = [`${kg * 100} g`, `${kg * 10} g`, `${sp(kg * 10000)} g`];
  } else if (kind === 2) {
    const dkg = rnd(2, 9) * 10 + rnd(1, 9);
    text = `${dkg} dkg = ? g`;
    answer = `${dkg * 10} g`;
    wrong = [`${dkg * 100} g`, `${dkg} g`, `${sp(dkg * 1000)} g`];
  } else if (kind === 3) {
    const kg = rnd(1, 3);
    const dkg = rnd(1, 9) * 10 + rnd(0, 9);
    text = `${kg} kg ${dkg} dkg = ? dkg`;
    answer = `${kg * 100 + dkg} dkg`;
    wrong = [`${kg * 10 + dkg} dkg`, `${sp(kg * 1000 + dkg)} dkg`, `${kg + dkg} dkg`];
  } else if (kind === 4) {
    const dkg = rnd(1, 9);
    const g = rnd(1, 9);
    text = `${dkg} dkg ${g} g = ? g`;
    answer = `${dkg * 10 + g} g`;
    wrong = [`${dkg * 100 + g} g`, `${dkg + g} g`, `${dkg * 1000 + g} g`];
  } else {
    const g = rnd(11, 99);
    if (g % 10 === 0 || g % 10 === Math.floor(g / 10)) return makeTask();
    text = `${g} g = ? dkg ? g`;
    answer = `${Math.floor(g / 10)} dkg ${g % 10} g`;
    wrong = [`${Math.floor(g / 10) * 10} dkg ${g % 10} g`, `${g % 10} dkg ${Math.floor(g / 10)} g`, `${g} dkg`];
  }
  const uniq = Array.from(new Set(wrong.filter((w) => w !== answer))).slice(0, 3);
  return { text, answer, options: shuffle([answer, ...uniq]) };
};

const FIRST_TASK: ConvTask = {
  text: '2 kg 35 dkg = ? dkg',
  answer: '235 dkg',
  options: ['55 dkg', '235 dkg', '2035 dkg', '37 dkg']
};

export const MassMeasureTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [objIdx, setObjIdx] = useState<number>(0);
  const [pan, setPan] = useState<number[]>([]);
  const obj = OBJECTS[objIdx];
  const right = pan.reduce((a, i) => a + WEIGHTS[i].g, 0);
  const diff = obj.g - right;
  const tilt = Math.max(-12, Math.min(12, diff / 25));
  const balanced = diff === 0;

  // Labor II
  const [task, setTask] = useState<ConvTask>(FIRST_TASK);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<{ good: number; all: number }>({ good: 0, all: 0 });

  const pick = (o: string) => {
    if (picked) return;
    setPicked(o);
    setScore((s) => ({ good: s.good + (o === task.answer ? 1 : 0), all: s.all + 1 }));
  };

  const rad = (tilt * Math.PI) / 180;
  const L = { x: 200 - 130 * Math.cos(rad), y: 80 + 130 * Math.sin(rad) };
  const R = { x: 200 + 130 * Math.cos(rad), y: 80 - 130 * Math.sin(rad) };

  return (
    <TheoryTemplate
      topicId="g4-measurements"
      subtopicId="a-tomeg-merese"
      title="4. A tömeg mérése"
      subtitle="Kilogramm, dekagramm és gramm: mérjünk kétkarú mérleggel, váltsunk át, és számoljunk receptekkel, terméssel, rakománnyal!"
      badge="4. OSZTÁLY • II. MÉRÉSEK • TANANYAG"
      themeColor="rose"
      pdfFilename="4_osztaly_a_tomeg_merese_tananyag.pdf"
      practiceTitle="Készen állsz a tömeges feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A TÖMEG MÉRTÉKEGYSÉGEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
              <span className="font-mono text-base font-black text-rose-900 dark:text-rose-200">
                1 kg = 100 dkg = 1000 g &nbsp;•&nbsp; 1 dkg = 10 g
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A gramm jele: <strong>g</strong>. Az 1 dkg-nál könnyebb dolgokat grammban mérjük.</li>
              <li>Nagyobb egységről kisebbre: a szám nagyobb lesz (kg → dkg: · 100, dkg → g: · 10).</li>
              <li>Összehasonlítás és összeadás előtt válts azonos egységre!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Kilogramm, dekagramm, gramm" badge="Tankönyv 61–62. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A tömeget <strong>mérleggel</strong> mérjük. A kétkarú mérleg akkor van egyensúlyban, ha a két serpenyőben <strong>ugyanakkora</strong> a tömeg.
            </p>
            <p>
              Már tudod: <strong>1 kg = 100 dkg</strong>. Az 1 dkg-nál könnyebb dolgokhoz (fűszer, gemkapocs) kisebb egység kell: ez a <strong>gramm (g)</strong>.
            </p>
            <p>
              <strong>1 dkg = 10 g</strong>, ezért <strong>1 kg = 1000 g</strong>.
            </p>
          </div>
          <BalanceScaleSvg />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MassUnitLadderSvg />
          <KitchenScalesSvg />
        </div>
      </TheorySection>

      {/* 2. Mennyi lehet a tömege? */}
      <TheorySection title="2. Becsüld meg! Mennyi lehet a tömege?" badge="Tankönyv 62–63. o." badgeColor="emerald">
        <TheoryTable
          headers={['Mi ez?', 'A tömege (kb.)', 'Melyik egység illik hozzá?']}
          rows={[
            ['egy zacskó bazsalikom', '8 g', 'g'],
            ['egy szilva', '6 dkg', 'dkg vagy g'],
            ['egy alma', '230 g', 'g vagy dkg'],
            ['egy darab sajt', '25 dkg', 'dkg'],
            ['egy cukkini', '90 dkg', 'dkg'],
            ['egy zsák dió', '1500 dkg = 15 kg', 'kg']
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="10 dkg-nál kevesebb" badge="< 100 g" badgeColor="emerald">
            <p className="text-sm text-slate-700">bazsalikom 8 g, tárkonylevél 5 g, rozmaring 15 g, petrezselyem 30 g</p>
          </TheoryCard>
          <TheoryCard title="Pont 10 dkg" badge="= 100 g" badgeColor="amber">
            <p className="text-sm text-slate-700">őrölt fekete bors 100 g</p>
          </TheoryCard>
          <TheoryCard title="10 dkg-nál több" badge="> 100 g" badgeColor="rose">
            <p className="text-sm text-slate-700">kakaó 150 g, mustár 200 g, csípős paprika 200 g, őrölt paprika 250 g, ételízesítő 500 g</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Nézzük meg együtt! */}
      <TheorySection title="3. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <HarvestChartSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>A) A családi gazdaság termése (Tankönyv 3. feladat).</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sütőtökből termett a legkevesebb (300 kg).</li>
              <li>Sárgarépából (600 kg) kétszer annyi termett, mint sütőtökből – nem háromszor!</li>
              <li>Összesen: 1000 + 750 + 300 + 1000 + 600 = <strong>3650 kg</strong></li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="B) Mennyit vihet az autó?" badge="Tankönyv 3. d)" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Megengedett össztömeg: 3500 kg</li>
              <li>Az autó: 1250 kg, a sofőr: 90 kg → 1250 + 90 = 1340 kg</li>
              <li>Rakomány legfeljebb: 3500 − 1340 = <strong>2160 kg</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Nagyi receptje grammban" badge="Tankönyv 8. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>10 dkg liszt = 100 g, 10 dkg porcukor = 100 g</li>
              <li>14 dkg kristálycukor = 140 g, 18 dkg vaj = 180 g</li>
              <li>5 púpozott evőkanál liszt = 10 dkg, tehát 1 evőkanál ≈ 2 dkg = 20 g</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ContainersSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>D) Konténerek (Tankönyv 4. feladat).</strong> Egy konténerbe legfeljebb 2200 kg rakomány fér. Mennyi fér még bele?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>sárgarépa: 2200 − 1600 = <strong>600 kg</strong></li>
              <li>hagyma: 2200 − 2020 = <strong>180 kg</strong></li>
              <li>burgonya: 2200 − 180 = <strong>2020 kg</strong></li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. Vigyázz! */}
      <TheorySection title="4. Vigyázz! A dekagramm és a gramm nem ugyanaz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Keverted a g-ot és a dkg-ot?"
          wrong="50 dkg keksz + 10 g vaníliás cukor = 60 dkg"
          wrongExplanation="A 10 g nem 10 dkg! A 10 g csak 1 dkg."
          correct="50 dkg + 10 g = 50 dkg + 1 dkg = 51 dkg"
          correctExplanation="Előbb váltsd át mindet ugyanarra a mértékegységre, csak utána add össze!"
          tip="1 kg = 100 dkg, de 1 kg = 1000 g. A kg → dkg váltásnál 100-zal, a kg → g váltásnál 1000-rel szorzunk."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Labor I: Kétkarú mérleg" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              A bal serpenyőben {obj.name} van. Tegyél súlyokat a jobb serpenyőbe, amíg a mérleg egyensúlyba nem kerül! (Egy rárakott súlyra kattintva leveszed.)
            </p>
            <button
              onClick={() => {
                setObjIdx((i) => (i + 1) % OBJECTS.length);
                setPan([]);
              }}
              className="px-4 py-2 rounded-xl bg-rose-100 text-rose-800 font-bold hover:bg-rose-200 active:scale-95 transition"
            >
              Mást mérek
            </button>
          </div>
          <svg viewBox="0 0 400 230" className="w-full max-w-lg mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
            <polygon points="200,80 175,205 225,205" fill="#64748b" />
            <rect x="150" y="203" width="100" height="12" rx="5" fill="#334155" />
            <line x1={L.x} y1={L.y} x2={R.x} y2={R.y} stroke="#334155" strokeWidth="7" strokeLinecap="round" />
            <circle cx="200" cy="80" r="7" fill="#f59e0b" />
            {[L, R].map((p, i) => (
              <g key={i}>
                <line x1={p.x} y1={p.y} x2={p.x - 34} y2={p.y + 60} stroke="#475569" strokeWidth="1.5" />
                <line x1={p.x} y1={p.y} x2={p.x + 34} y2={p.y + 60} stroke="#475569" strokeWidth="1.5" />
                <path d={`M ${p.x - 50} ${p.y + 60} Q ${p.x} ${p.y + 84} ${p.x + 50} ${p.y + 60} Z`} fill="#94a3b8" stroke="#334155" strokeWidth="2" />
              </g>
            ))}
            <text x={L.x} y={L.y + 54} textAnchor="middle" fontSize="30">{obj.emoji}</text>
            <text x={R.x} y={R.y + 56} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">
              {right > 0 ? fmtMass(right) : 'üres'}
            </text>
            <text x="200" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill={balanced ? '#15803d' : '#b91c1c'}>
              {balanced ? 'Egyensúly!' : diff > 0 ? 'A bal oldal nehezebb' : 'A jobb oldal nehezebb'}
            </text>
          </svg>
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
            {WEIGHTS.map((w, i) => (
              <button
                key={w.label}
                onClick={() => setPan((p) => [...p, i])}
                className="min-h-[52px] rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 active:scale-95 transition"
              >
                + {w.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center min-h-[36px]">
            {pan.map((wi, k) => (
              <button
                key={k}
                onClick={() => setPan((p) => p.filter((_, idx) => idx !== k))}
                className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-900 text-sm font-bold border border-blue-300 hover:bg-rose-100"
                aria-label={`${WEIGHTS[wi].label} levétele`}
              >
                {WEIGHTS[wi].label} ✕
              </button>
            ))}
          </div>
          {balanced && (
            <div className="p-3 rounded-xl text-center font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Ügyes! {obj.name.charAt(0).toUpperCase() + obj.name.slice(1)} tömege {fmtMass(obj.g)} = {sp(obj.g)} g.
            </div>
          )}
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Labor II: Tömeg-átváltó" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-slate-700">Válaszd ki a helyes átváltást! (kg → dkg: · 100, dkg → g: · 10, kg → g: · 1000)</p>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-bold">
              Pontok: {score.good} / {score.all}
            </span>
          </div>
          <div className="text-center font-mono text-3xl font-black text-purple-900 py-3">{task.text}</div>
          <div className="grid grid-cols-2 gap-3">
            {task.options.map((o) => {
              const cls = !picked
                ? 'bg-white border-slate-300 hover:bg-purple-50'
                : o === task.answer
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                  : o === picked
                    ? 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-slate-200 opacity-60';
              return (
                <button key={o} onClick={() => pick(o)} className={`min-h-[56px] rounded-xl border-2 font-mono text-xl font-bold transition active:scale-95 ${cls}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked && (
            <div className={`p-3 rounded-xl text-center font-bold ${picked === task.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {picked === task.answer ? 'Szuper, eltaláltad!' : `Nem egészen. A helyes válasz: ${task.answer}.`}
            </div>
          )}
          <div className="text-center">
            <button
              onClick={() => {
                setTask(makeTask());
                setPicked(null);
              }}
              className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 active:scale-95 transition"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MassMeasureTheory;
