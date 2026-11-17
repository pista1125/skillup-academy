import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { RomanClockFaceSvg, ClockIIIIvsIVSvg, RomanEverywhereSvg, MonthsRomanSvg, MatchstickMoveSvg, MirrorRomanSvg } from './RomanEverydayG3Figures';
import { RomanClock, CLOCK_NUMS, layoutSticks, Stick, evalStickEq, toRoman } from './RomanEverydayG3Parts';

/** A pálcika-labor feladatai. Mindegyik pontosan egy pálcika áthelyezésével, egyféleképpen oldható meg (számítógéppel ellenőrizve). */
export const STICK_PUZZLES: { start: string; solution: string }[] = [
  { start: 'VI-V=X', solution: 'V+V=X' },
  { start: 'IV-I=IV', solution: 'IV+I=V' },
  { start: 'XI-I=XIII', solution: 'XI+I=XII' },
  { start: 'IX-II=X', solution: 'IX+I=X' },
  { start: 'XII+IV=VII', solution: 'XII-IV=VIII' },
  { start: 'III+III=IV', solution: 'III+III=VI' },
  { start: 'XVI-I=XVIII', solution: 'XVI+I=XVII' },
  { start: 'XIV-IV=VIII', solution: 'XIV-VI=VIII' },
  { start: 'XIII-II=XVI', solution: 'XIII+II=XV' },
  { start: 'XX-X=XXIX', solution: 'XX+X=XXX' }
];

const show = (eq: string) => eq.replace(/-/g, ' – ').replace(/\+/g, ' + ').replace(/=/g, ' = ');

export const RomanEverydayG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---------- Labor I: római óra ----------
  const [clockMode, setClockMode] = useState<'set' | 'read'>('set');
  const [target, setTarget] = useState<number>(7);
  const [handAt, setHandAt] = useState<number>(12);
  const [clockMsg, setClockMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [readPick, setReadPick] = useState<number | null>(null);
  const newClockTask = (mode = clockMode) => {
    let t = target;
    while (t === target) t = 1 + Math.floor(Math.random() * 12);
    setTarget(t);
    setHandAt(mode === 'read' ? t : 12);
    setClockMsg(null);
    setReadPick(null);
  };
  const tapNumeral = (h: number) => {
    if (clockMode !== 'set') return;
    setHandAt(h);
    if (h === target) setClockMsg({ ok: true, text: `Szuper! A kismutató ezen áll: ${toRoman(h)}. Ez ${h} óra.` });
    else setClockMsg({ ok: false, text: `Ez a ${toRoman(h)}, vagyis ${h}. Neked ${target} óra kell. Keresd ezt: ${toRoman(target)}!` });
  };
  const readOptions = (() => {
    const t = target;
    const set = new Set<number>([t]);
    const cands = [t === 4 ? 6 : t === 6 ? 4 : t === 9 ? 11 : t === 11 ? 9 : ((t + 1) % 12) + 1, (t % 12) + 1, ((t + 10) % 12) + 1, ((t + 5) % 12) + 1, ((t + 3) % 12) + 1];
    for (const c of cands) if (set.size < 4) set.add(c);
    return [...set].sort((a, b) => a - b);
  })();

  // ---------- Labor II: pálcika-fejtörő ----------
  const [pIdx, setPIdx] = useState<number>(0);
  const [eq, setEq] = useState<string>(STICK_PUZZLES[0].start);
  const [held, setHeld] = useState<boolean>(false);
  const [placed, setPlaced] = useState<boolean>(false);
  const puzzle = STICK_PUZZLES[pIdx];
  const H = 54;
  const lay = layoutSticks(eq, H, 0, 0, 0.3 * H);
  const W = lay.width + 60;
  const ox = 30;
  const oy = 22;
  const res = placed ? evalStickEq(eq) : null;
  const startEval = evalStickEq(puzzle.start);

  const pick = (glyph: number, role?: string) => {
    if (held || placed) return;
    if (role === 'I') setEq(eq.slice(0, glyph) + eq.slice(glyph + 1));
    else if (role === '+v' || role === '=t') setEq(eq.slice(0, glyph) + '-' + eq.slice(glyph + 1));
    else return;
    setHeld(true);
  };
  const putI = (pos: number) => {
    if (!held) return;
    setEq(eq.slice(0, pos) + 'I' + eq.slice(pos));
    setHeld(false);
    setPlaced(true);
  };
  const putOn = (glyph: number, ch: '+' | '=') => {
    if (!held) return;
    setEq(eq.slice(0, glyph) + ch + eq.slice(glyph + 1));
    setHeld(false);
    setPlaced(true);
  };
  const resetPuzzle = (i = pIdx) => {
    setEq(STICK_PUZZLES[i].start);
    setHeld(false);
    setPlaced(false);
  };

  // a pálcika felvehető-e
  const pickable = (role?: string) => role === 'I' || role === '+v' || role === '=t';

  return (
    <TheoryTemplate
      topicId="g3-roman-numbers"
      subtopicId="romai-szamok-a-mindennapokban"
      grade={3}
      chapterId="romai-szamok"
      title="3. Római számok a mindennapokban és fejtörők"
      subtitle="Hol látsz ma római számot? Olvasd le az órát, a fejezetet, a dátumot! Aztán jöhetnek a pálcikás fejtörők."
      badge="3. OSZTÁLY • II. A RÓMAI SZÁMOK • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_romai_szamok_a_mindennapokban_tananyag.pdf"
      practiceTitle="Készen állsz a római fejtörőkre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A RÓMAI SZÁM SOKSZOR SORSZÁM',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              IV. Béla = negyedik Béla • VII. fejezet = hetedik fejezet
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A pont a római szám után azt jelenti: <strong>hányadik</strong>.</li>
              <li>A dátumban a <strong>hónap</strong> áll római számmal: 2026. XI. 17. = november 17.</li>
              <li>Pálcikás fejtörőnél a végén minden számnak <strong>szabályos</strong> római számnak kell lennie.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 26–27. o." badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>A római számokat ma is sok helyen látod. Nézz körül!</p>
          <RomanEverywhereSvg />
          <p>
            Ma <strong>elolvasod</strong> ezeket. Utána <strong>pálcikákkal</strong> játszunk: egy pálcikát áthelyezel, és a hamis egyenlőségből igaz lesz.
          </p>
        </div>
      </TheorySection>

      {/* 2. Óra */}
      <TheorySection title="2. A római számlapos óra" badge="Óra" badgeColor="orange">
        <RomanClockFaceSvg />
        <TheoryTable
          headers={['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']}
          rows={[['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']]}
        />
        <p className="text-sm text-slate-700">A kismutató (piros) mutatja az órát. A nagymutató (kék) a perceket.</p>
        <ClockIIIIvsIVSvg />
        <TheoryCallout type="info" title="Érdekes!">
          Sok régi órán a 4 helyén <strong>IIII</strong> áll, nem IV. Ez csak az órákon szokás. Máshol mindig <strong>IV</strong>-et írunk!
        </TheoryCallout>
      </TheorySection>

      {/* 3. Sorszámok */}
      <TheorySection title="3. Hányadik? – sorszámok római számmal" badge="Sorszám" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Királyok, királynők" badge="Történelem" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>I. István – első István</li>
              <li>IV. Béla – negyedik Béla</li>
              <li>II. Rákóczi Ferenc – második Rákóczi Ferenc</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Könyv, kerület, emelet" badge="Mindennap" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>XII. fejezet – tizenkettedik fejezet</li>
              <li>XIII. kerület – Budapest tizenharmadik kerülete</li>
              <li>III. emelet – harmadik emelet</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Budapest kerületei">
          Budapestnek <strong>23</strong> kerülete van: az I.-től a <strong>XXIII.</strong> kerületig.
        </TheoryCallout>
        <TheoryCallout type="info" title="Csak olvasd! – évszázadok">
          A századokat is római számmal írjuk. Most a <strong>XXI. században</strong> (huszonegyedik században) élünk. Ezt elég elolvasnod.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Dátum */}
      <TheorySection title="4. A hónapok római számmal" badge="Dátum" badgeColor="sky">
        <MonthsRomanSvg />
        <TheoryTable
          headers={['Így írjuk', 'Így olvassuk']}
          rows={[
            ['2026. III. 15.', '2026. március 15.'],
            ['2026. VIII. 20.', '2026. augusztus 20.'],
            ['2026. XII. 24.', '2026. december 24.']
          ]}
        />
        <p className="text-sm text-slate-700">Sorrend: év, hónap, nap. Csak a <strong>hónap</strong> római szám, a nap nem!</p>
      </TheorySection>

      {/* 5. Nézzük meg együtt */}
      <TheorySection title="5. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Mikor van Vilma születésnapja?" badge="Dátum" badgeColor="sky">
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li>A kártyán ez áll: <strong>2018. VI. 9.</strong></li>
              <li>A hónap: VI = 5 + 1 = 6. A 6. hónap a <strong>június</strong>.</li>
              <li>A nap: 9.</li>
              <li>Vilma születésnapja: <strong>június 9.</strong></li>
            </ol>
          </TheoryCard>
          <TheoryCard title="B) Hány fejezet van még hátra?" badge="Könyv" badgeColor="purple">
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li>Noel könyve XV fejezetből áll. Most a XII. fejezetet olvassa.</li>
              <li>XV = 15, XII = 12.</li>
              <li>Utána jön még: 13., 14., 15. fejezet.</li>
              <li>Még <strong>3</strong> fejezet van hátra.</li>
            </ol>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Pálcikák */}
      <TheorySection title="6. Pálcikás fejtörők" badge="Fejtörő" badgeColor="orange">
        <MatchstickMoveSvg />
        <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
          <li>Olvasd el arab számokkal: VI – V = X → 6 – 5 = 10. Ez hamis.</li>
          <li>Vegyél el egy pálcikát: a VI-ból V lesz.</li>
          <li>Tedd a mínuszra: a – jelből + lesz.</li>
          <li>Ellenőrizd: V + V = X → 5 + 5 = 10. Igaz!</li>
        </ol>
        <TheoryCallout type="tip" title="Pálcikák száma">
          I = 1 pálcika • V = 2 • X = 2 • + = 2 • – = 1 • = = 2. A XIV-hez 5 pálcika kell.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Tükör */}
      <TheorySection title="7. Tükrözés" badge="Tükör" badgeColor="sky">
        <MirrorRomanSvg />
        <p className="text-sm text-slate-700">
          A piros vonal a tükör. A <strong>V</strong> és a tükörképe együtt <strong>X</strong>. Az <strong>I</strong> megnyúlik, de I marad. A ⊥ jelből <strong>+</strong> lesz.
        </p>
      </TheorySection>

      {/* 8. Vigyázz */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="IV. Béla nem „négy Béla”"
          wrong="IV. Béla = négy Béla"
          wrongExplanation="Nem négy király van! A pont azt jelenti: hányadik."
          correct="IV. Béla = negyedik Béla"
          correctExplanation="Ő volt a negyedik Béla nevű király."
          tip="Ha pont van a római szám után, mondd így: első, második, harmadik…"
        />
        <TheoryTrapBox
          title="A IIII nem szabályos megoldás"
          wrong="III + I = IIII"
          wrongExplanation="Négy egyforma jel nem állhat egymás mellett (csak az órán látsz ilyet)."
          correct="III + I = IV"
          correctExplanation="A fejtörő végén mindig szabályos római számok legyenek."
        />
      </TheorySection>

      {/* 9. Labor I */}
      <TheorySection title="9. Labor I: Római óra" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['set', 'read'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setClockMode(m);
                  newClockTask(m);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[44px] ${clockMode === m ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {m === 'set' ? 'Állítsd be!' : 'Olvasd le!'}
              </button>
            ))}
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-base font-bold text-orange-900 text-center">
            {clockMode === 'set' ? `Koppints arra a számra, ahová a kismutató kell: ${target} óra!` : 'Hány órát mutat az óra?'}
          </div>
          <svg viewBox="0 0 260 260" className="w-full max-w-[300px] h-auto mx-auto">
            <RomanClock cx={130} cy={130} r={120} hour={handAt % 12} minute={0} />
            {clockMode === 'set' &&
              CLOCK_NUMS.map((_, k) => {
                const a = (k * 30 - 90) * (Math.PI / 180);
                return (
                  <circle
                    key={k}
                    cx={130 + 79 * Math.cos(a)}
                    cy={130 + 79 * Math.sin(a)}
                    r={19}
                    fill="transparent"
                    stroke={handAt % 12 === k && clockMsg ? (clockMsg.ok ? '#16a34a' : '#e11d48') : 'transparent'}
                    strokeWidth="3"
                    style={{ cursor: 'pointer' }}
                    onClick={() => tapNumeral(k === 0 ? 12 : k)}
                    role="button"
                    aria-label={`${k === 0 ? 12 : k} óra`}
                  />
                );
              })}
          </svg>
          {clockMode === 'read' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {readOptions.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setReadPick(o);
                    setClockMsg(
                      o === target
                        ? { ok: true, text: `Ügyes! A kismutató ezen áll: ${toRoman(target)}. Ez ${target} óra.` }
                        : { ok: false, text: `Nem ez. A ${o} római alakja ${toRoman(o)}. Nézd meg, melyik számra mutat a piros mutató!` }
                    );
                  }}
                  className={`rounded-xl py-3 text-lg font-black min-h-[52px] border-2 ${readPick === o ? (o === target ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500') : 'bg-slate-50 border-slate-200'}`}
                >
                  {o} óra
                </button>
              ))}
            </div>
          )}
          {clockMsg && <div className={`rounded-xl p-2 text-center text-sm font-bold ${clockMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{clockMsg.text}</div>}
          <button onClick={() => newClockTask()} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-bold min-h-[44px]">
            Új feladat
          </button>
        </div>
      </TheorySection>

      {/* 10. Labor II */}
      <TheorySection title="10. Labor II: Pálcika-fejtörő" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-purple-50 rounded-xl p-3 text-sm text-purple-900">
            <strong>{pIdx + 1}. fejtörő.</strong> Tegyél át <strong>egy</strong> pálcikát, hogy igaz legyen! Előbb koppints a pálcikára, aztán a szürke helyre.
            <div className="mt-1 text-xs">Most: {show(puzzle.start)} → {startEval.text} – ez hamis.</div>
          </div>
          <svg viewBox={`0 0 ${W} ${H + 44}`} className="w-full h-auto bg-amber-50 rounded-xl border border-amber-200" style={{ maxHeight: 170 }}>
            <g transform={`translate(${ox} ${oy})`}>
              {lay.sticks.map((s, i) => (
                <g key={i} onClick={() => pick(s.glyph, s.role)} style={{ cursor: !held && !placed && pickable(s.role) ? 'pointer' : 'default' }}>
                  <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="transparent" strokeWidth={18} />
                  <Stick s={s} h={H} />
                </g>
              ))}
              {held &&
                Array.from({ length: eq.length + 1 }, (_, pos) => {
                  const b = lay.boxes;
                  const x = pos === 0 ? b[0].x - 0.17 * H : pos === eq.length ? b[pos - 1].x + b[pos - 1].w + 0.17 * H : (b[pos - 1].x + b[pos - 1].w + b[pos].x) / 2;
                  return (
                    <g key={`g${pos}`} onClick={() => putI(pos)} style={{ cursor: 'pointer' }}>
                      <rect x={x - 9} y={-6} width={18} height={H + 12} fill="#e2e8f0" opacity={0.6} rx={4} />
                      <Stick s={{ x1: x, y1: 0, x2: x, y2: H }} h={H} dashed />
                    </g>
                  );
                })}
              {held &&
                lay.boxes.map((b, i) =>
                  b.ch === '-' ? (
                    <g key={`m${i}`}>
                      <g onClick={() => putOn(i, '+')} style={{ cursor: 'pointer' }}>
                        <rect x={b.x + b.w / 2 - 9} y={H / 2 - 0.32 * H} width={18} height={0.64 * H} fill="#ddd6fe" opacity={0.7} rx={4} />
                        <Stick s={{ x1: b.x + b.w / 2, y1: H / 2 - 0.29 * H, x2: b.x + b.w / 2, y2: H / 2 + 0.29 * H }} h={H} dashed />
                      </g>
                      <g onClick={() => putOn(i, '=')} style={{ cursor: 'pointer' }}>
                        <rect x={b.x} y={-14} width={b.w} height={14} fill="#bbf7d0" opacity={0.7} rx={4} />
                        <Stick s={{ x1: b.x + 0.04 * H, y1: -7, x2: b.x + b.w - 0.04 * H, y2: -7 }} h={H} dashed />
                      </g>
                    </g>
                  ) : null
                )}
            </g>
          </svg>
          <div className="text-center text-sm text-slate-600">
            {held ? 'A pálcika a kezedben van. Hová teszed? (szürke: új I, lila: + jel, zöld: = jel)' : placed ? '' : 'Válassz egy pálcikát!'}
          </div>
          {res && (
            <div className={`rounded-xl p-2 text-center text-sm font-bold ${res.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {res.ok
                ? `Igaz lett! ${show(eq)} → ${res.text}. Szuper!`
                : res.bad
                  ? `${res.text} Kezdd újra!`
                  : `Most ez áll: ${res.text}. Ez még nem igaz. Kezdd újra!`}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => resetPuzzle()} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[44px]">
              Újrakezdem
            </button>
            <button
              onClick={() => {
                const n = (pIdx + 1) % STICK_PUZZLES.length;
                setPIdx(n);
                resetPuzzle(n);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[44px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RomanEverydayG3Theory;
