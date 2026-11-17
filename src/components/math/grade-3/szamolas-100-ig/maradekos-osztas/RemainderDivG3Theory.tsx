import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import { PacksSvg, NotationSvg, CheckSvg, RemainderCycleSvg, SticksSvg } from './RemainderDivG3Figures';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Véletlen maradékos osztás: osztó 2–9, hányados 1–10, maradék > 0, osztandó ≤ 99. */
const makeTask = (avoid?: { n: number; d: number }) => {
  for (;;) {
    const d = rnd(2, 9);
    const q = rnd(1, 10);
    const r = rnd(1, d - 1);
    const n = q * d + r;
    if (n <= 99 && (!avoid || avoid.n !== n || avoid.d !== d)) return { n, d };
  }
};

const Stepper: React.FC<{ label: string; value: number; onChange: (v: number) => void; max: number }> = ({ label, value, onChange, max }) => (
  <div className="flex items-center justify-center gap-3 bg-slate-50 rounded-xl p-2 border">
    <button onClick={() => onChange(Math.max(0, value - 1))} className="w-12 h-12 rounded-xl bg-slate-200 text-2xl font-black" aria-label={`${label} kevesebb`}>
      −
    </button>
    <div className="text-center min-w-[90px]">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-2xl font-black text-slate-800">{value}</div>
    </div>
    <button onClick={() => onChange(Math.min(max, value + 1))} className="w-12 h-12 rounded-xl bg-amber-500 text-white text-2xl font-black" aria-label={`${label} több`}>
      +
    </button>
  </div>
);

export const RemainderDivG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Csomagoló
  const [pack, setPack] = useState<{ n: number; d: number }>({ n: 23, d: 4 });
  const [bags, setBags] = useState<number>(0);
  const [packMsg, setPackMsg] = useState<string | null>(null);
  const [qIn, setQIn] = useState<number>(0);
  const [rIn, setRIn] = useState<number>(0);
  const [packCheck, setPackCheck] = useState<{ ok: boolean; text: string } | null>(null);
  const loose = pack.n - bags * pack.d;
  const done = loose < pack.d;
  const fillBag = () => {
    if (loose >= pack.d) {
      setBags(bags + 1);
      setPackMsg(null);
    } else {
      setPackMsg(`Csak ${loose} korong maradt. Ez kevesebb, mint ${pack.d}, nem lesz belőle tele zacskó. Ez a maradék!`);
    }
  };
  const checkPack = () => {
    const q = Math.floor(pack.n / pack.d);
    const r = pack.n % pack.d;
    if (qIn === q && rIn === r) {
      setPackCheck({ ok: true, text: `Szuper! ${pack.n} : ${pack.d} = ${q} marad ${r}. Ellenőrzés: ${q} · ${pack.d} + ${r} = ${pack.n}.` });
    } else if (rIn >= pack.d) {
      setPackCheck({ ok: false, text: `A maradék nem lehet ${rIn}, mert az osztó ${pack.d}. A maradék mindig kisebb, mint az osztó!` });
    } else if (qIn !== q) {
      setPackCheck({ ok: false, text: `Számold meg a tele zacskókat! Ennyi a hányados.` });
    } else {
      setPackCheck({ ok: false, text: `A hányados jó! Most számold meg a zacskón kívüli korongokat.` });
    }
  };
  const newPack = () => {
    setPack(makeTask(pack));
    setBags(0);
    setPackMsg(null);
    setQIn(0);
    setRIn(0);
    setPackCheck(null);
  };

  // Labor II: Maradék-vadász
  const [hunt, setHunt] = useState<{ n: number; d: number }>({ n: 38, d: 7 });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [huntMsg, setHuntMsg] = useState<string | null>(null);
  const hq = Math.floor(hunt.n / hunt.d);
  const hr = hunt.n % hunt.d;
  const pickQ = (q: number) => {
    if (q === hq) {
      setStep(2);
      setHuntMsg(`Jó! ${hq} · ${hunt.d} = ${hq * hunt.d}. Mennyi marad a ${hunt.n}-ből?`);
    } else if (q * hunt.d > hunt.n) {
      setHuntMsg(`Túl sok! ${q} · ${hunt.d} = ${q * hunt.d}, ez több, mint ${hunt.n}.`);
    } else {
      setHuntMsg(`Még belefér! ${q + 1} · ${hunt.d} = ${(q + 1) * hunt.d}, ez sem több, mint ${hunt.n}.`);
    }
  };
  const pickR = (r: number) => {
    if (r === hr) {
      setStep(3);
      setHuntMsg(`Ügyes! ${hunt.n} : ${hunt.d} = ${hq} marad ${hr}, mert ${hq} · ${hunt.d} + ${hr} = ${hunt.n}.`);
    } else if (r >= hunt.d) {
      setHuntMsg(`Vigyázz! A maradék kisebb, mint az osztó (${hunt.d}).`);
    } else {
      setHuntMsg(`Számold ki: ${hunt.n} − ${hq * hunt.d} = ?`);
    }
  };
  const newHunt = () => {
    setHunt(makeTask(hunt));
    setStep(1);
    setHuntMsg(null);
  };

  // korongok elhelyezése a Csomagolóban
  const bagW = 84;
  const looseRows = Math.ceil(loose / 20);

  return (
    <TheoryTemplate
      topicId="g3-count-100"
      subtopicId="maradekos-osztas"
      grade={3}
      chapterId="szamolas-100-ig"
      title="4. Maradékos osztás"
      subtitle="Mi történik, ha nem lehet mindent egyformán szétosztani? Akkor marad valamennyi!"
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_maradekos_osztas_tananyag.pdf"
      practiceTitle="Készen állsz a maradékos osztásra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A MARADÉK KISEBB, MINT AZ OSZTÓ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              17 : 5 = 3 marad 2, mert 3 · 5 + 2 = 17
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Keresd meg, hányszor van meg az osztó az osztandóban!</li>
              <li>Ami kimarad, az a <strong>maradék</strong>. Mindig <strong>kisebb, mint az osztó</strong>.</li>
              <li>Ellenőrzés: <strong>hányados · osztó + maradék = osztandó</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 14. o." badgeColor="orange">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Néha nem lehet mindent egyformán szétosztani.</p>
          <p>
            Ilyenkor <strong>marad</strong> valamennyi. Ezt hívjuk <strong>maradékos osztásnak</strong>.
          </p>
        </div>
      </TheorySection>

      <TheorySection title="2. Rakjuk ki!" badge="Korongokkal" badgeColor="amber">
        <PacksSvg />
        <SticksSvg />
        <p className="text-sm text-slate-700">
          16 pálcikából 5 háromszög lesz. 1 pálcika marad, abból már nem lesz háromszög.
        </p>
      </TheorySection>

      <TheorySection title="3. Így írjuk le" badge="Lejegyzés" badgeColor="sky">
        <NotationSvg />
        <TheoryCallout type="info" title="Mindkét írásmód jó">
          Írhatod szóval: <strong>17 : 5 = 3 marad 2</strong>. A füzetben a maradékot az osztandó egyesei alá is írhatod.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. A maradék szabálya" badge="Szabály" badgeColor="purple">
        <RemainderCycleSvg />
        <p className="text-sm text-slate-700">
          4-gyel osztva a maradék csak 0, 1, 2 vagy 3 lehet. Ha 4 maradna, abból még egy csoport lenne!
        </p>
      </TheorySection>

      <TheorySection title="5. Ellenőrzés" badge="Szorzás és összeadás" badgeColor="emerald">
        <CheckSvg />
        <p className="text-sm text-slate-700">
          Szorozd meg a hányadost az osztóval, és add hozzá a maradékot. Ha az osztandót kapod, jól számoltál!
        </p>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) 29 : 4 = ?" badge="lépésenként" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Mondd a 4-es sort: 4, 8, …, 24, <strong>28</strong>, 32.</li>
              <li>A 32 már több, mint 29. A 28 jó: 7 · 4 = 28.</li>
              <li>29 − 28 = 1. Tehát <strong>29 : 4 = 7 marad 1</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) 50 : 8 = ?" badge="ellenőrzéssel" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>6 · 8 = 48, a 7 · 8 = 56 már túl sok.</li>
              <li>50 − 48 = 2. Tehát <strong>50 : 8 = 6 marad 2</strong>.</li>
              <li>Ellenőrzés: 6 · 8 + 2 = 50. Jó!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány autó kell?" badge="gondolkodj" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>14 gyerek megy kirándulni. Egy autóba 4 gyerek fér.</li>
              <li>14 : 4 = 3 marad 2.</li>
              <li>A 2 gyereknek is kell hely! Ezért <strong>4 autó kell</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz! Túl nagy maradék" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="26 : 4"
          wrong="26 : 4 = 5 marad 6"
          wrongExplanation="A 6 nagyobb, mint a 4. A 6-ból még egy négyes csoport kijön!"
          correct="26 : 4 = 6 marad 2"
          correctExplanation="6 · 4 = 24, és 26 − 24 = 2. A 2 kisebb, mint a 4."
          tip="Mindig nézd meg: kisebb-e a maradék, mint az osztó?"
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="8. Labor I: Csomagoló" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-orange-50 rounded-xl p-3 text-base text-orange-900 font-bold text-center">
            {pack.n} korongod van. Egy zacskóba {pack.d} korong kerül. Csomagold be!
          </div>
          <svg viewBox="0 0 460 250" className="w-full h-auto bg-amber-50 rounded-xl border border-amber-200">
            {Array.from({ length: loose }, (_, i) => (
              <circle key={`l${i}`} cx={30 + (i % 20) * 21} cy={22 + Math.floor(i / 20) * 21} r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
            ))}
            {loose === 0 && (
              <text x="230" y="40" textAnchor="middle" fontSize="13" fill="#64748b">
                Nem maradt kint korong.
              </text>
            )}
            <line x1="10" y1={Math.max(1, looseRows) * 21 + 12} x2="450" y2={Math.max(1, looseRows) * 21 + 12} stroke="#fcd34d" strokeDasharray="4 4" />
            {bags === 0 && (
              <text x="230" y="180" textAnchor="middle" fontSize="14" fill="#94a3b8">
                Ide kerülnek a tele zacskók.
              </text>
            )}
            {Array.from({ length: bags }, (_, b) => {
              const bx = 10 + (b % 5) * 90;
              const by = 128 + Math.floor(b / 5) * 60;
              const perLine = Math.ceil(pack.d / 2);
              return (
                <g key={`b${b}`}>
                  <rect x={bx} y={by} width={bagW} height="52" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                  {Array.from({ length: pack.d }, (_, k) => {
                    const row = Math.floor(k / perLine);
                    const inLine = row === 0 ? perLine : pack.d - perLine;
                    return (
                      <circle
                        key={k}
                        cx={bx + bagW / 2 - ((inLine - 1) * 15) / 2 + (k % perLine) * 15}
                        cy={by + 16 + row * 20}
                        r="6"
                        fill="#ef4444"
                        stroke="#991b1b"
                        strokeWidth="1"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={fillBag} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold min-h-[48px]">
              Tölts meg egy zacskót!
            </button>
            <button onClick={newPack} className="px-5 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          <div className="text-center text-sm text-slate-700">
            Tele zacskó: <strong>{bags}</strong> • Kint maradt: <strong>{loose}</strong>
          </div>
          {packMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-amber-100 text-amber-900">{packMsg}</div>}
          {done && (
            <div className="space-y-3">
              <p className="text-center font-bold text-slate-800">
                Írd le: {pack.n} : {pack.d} = ? marad ?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Stepper label="hányados" value={qIn} onChange={(v) => { setQIn(v); setPackCheck(null); }} max={10} />
                <Stepper label="maradék" value={rIn} onChange={(v) => { setRIn(v); setPackCheck(null); }} max={9} />
              </div>
              <div className="flex justify-center">
                <button onClick={checkPack} className="px-5 py-3 rounded-xl bg-orange-600 text-white font-bold min-h-[48px]">
                  Ellenőrzés
                </button>
              </div>
              {packCheck && (
                <div className={`rounded-xl p-3 text-center text-sm font-bold ${packCheck.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {packCheck.text}
                </div>
              )}
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="9. Labor II: Maradék-vadász" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center text-3xl font-black text-purple-900 bg-purple-50 rounded-xl py-4">
            {hunt.n} : {hunt.d} = {step > 1 ? hq : '?'} marad {step > 2 ? hr : '?'}
          </div>
          {step === 1 && (
            <>
              <p className="text-center text-sm text-slate-600">1. lépés: Hányszor van meg a {hunt.d} a {hunt.n}-ben?</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                  <button key={q} onClick={() => pickQ(q)} className="rounded-xl border-2 border-purple-200 py-3 text-xl font-black text-purple-900 min-h-[56px] bg-white">
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-center text-sm text-slate-600">2. lépés: Mennyi a maradék?</p>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }, (_, i) => i).map((r) => (
                  <button key={r} onClick={() => pickR(r)} className="rounded-xl border-2 border-rose-200 py-3 text-xl font-black text-rose-800 min-h-[56px] bg-white">
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}
          {huntMsg && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${step === 3 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
              {huntMsg}
            </div>
          )}
          <div className="flex justify-center">
            <button onClick={newHunt} className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RemainderDivG3Theory;
