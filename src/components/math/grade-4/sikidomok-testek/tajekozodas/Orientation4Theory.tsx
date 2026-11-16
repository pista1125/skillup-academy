import React, { useEffect, useRef, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { TownMapSvg, CodeReadingSvg, ChessBoardSvg, ChessPiecesSvg, GridWalkSvg, TownMap, MAP_PLACES, MAP_COLS } from './Orientation4Figures';

// ---------------------------------------------------------------------------
// Labor I: mezőkódok a Kisváros térképén
// ---------------------------------------------------------------------------
const FIND_CODES = ['C4', 'E2', 'A5', 'F1', 'B3', 'D4', 'E5', 'C1'];
const NAME_TASKS = ['B2', 'E4', 'D1', 'A3', 'F5', 'C3'];
const neighbours = (code: string): string[] => {
  const c = MAP_COLS.indexOf(code[0]);
  const r = Number(code.slice(1));
  const out: string[] = [`${r}${code[0]}`];
  if (c + 1 < MAP_COLS.length) out.push(`${MAP_COLS[c + 1]}${r}`);
  else out.push(`${MAP_COLS[c - 1]}${r}`);
  out.push(`${code[0]}${r < 5 ? r + 1 : r - 1}`);
  return out;
};

// ---------------------------------------------------------------------------
// Labor II: séta a négyzetrács vonalai mentén
// ---------------------------------------------------------------------------
type DirId = 'É' | 'K' | 'D' | 'NY' | 'ÉK' | 'DK' | 'DNY' | 'ÉNY';
const VEC: Record<DirId, [number, number]> = {
  É: [0, -1],
  K: [1, 0],
  D: [0, 1],
  NY: [-1, 0],
  ÉK: [1, -1],
  DK: [1, 1],
  DNY: [-1, 1],
  ÉNY: [-1, -1]
};
const PAD: (DirId | null)[] = ['ÉNY', 'É', 'ÉK', 'NY', null, 'K', 'DNY', 'D', 'DK'];
const ARROW: Record<DirId, string> = { É: '↑', K: '→', D: '↓', NY: '←', ÉK: '↗', DK: '↘', DNY: '↙', ÉNY: '↖' };

const WALKS: { name: string; start: [number, number]; steps: [number, DirId][] }[] = [
  { name: 'Házikó', start: [3, 8], steps: [[4, 'K'], [3, 'É'], [2, 'ÉNY'], [2, 'DNY'], [3, 'D']] },
  { name: 'Lépcső', start: [3, 7], steps: [[1, 'É'], [1, 'K'], [1, 'É'], [1, 'K'], [1, 'É'], [1, 'K'], [3, 'D'], [3, 'NY']] },
  { name: 'Hajó', start: [2, 6], steps: [[1, 'É'], [1, 'K'], [1, 'É'], [2, 'K'], [1, 'D'], [2, 'K'], [1, 'DNY'], [4, 'NY']] },
  { name: 'Plusz jel', start: [3, 5], steps: [[1, 'É'], [1, 'K'], [1, 'É'], [1, 'K'], [1, 'D'], [1, 'K'], [1, 'D'], [1, 'NY'], [1, 'D'], [1, 'NY'], [1, 'É'], [1, 'NY']] }
];
const unitSteps = (steps: [number, DirId][]) => steps.flatMap(([n, d]) => Array.from({ length: n }, () => d));

export const Orientation4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [mode, setMode] = useState<'find' | 'name'>('find');
  const [fIdx, setFIdx] = useState<number>(0);
  const [nIdx, setNIdx] = useState<number>(0);
  const [clicked, setClicked] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const findCode = FIND_CODES[fIdx];
  const nameCode = NAME_TASKS[nIdx];
  const namePlace = MAP_PLACES.find((p) => p.code === nameCode)!;
  const nameOptions = [nameCode, ...neighbours(nameCode)].sort();

  // Labor II
  const [wIdx, setWIdx] = useState<number>(0);
  const [done, setDone] = useState<number>(0);
  const [msg, setMsg] = useState<string>('');
  const walk = WALKS[wIdx];
  const units = unitSteps(walk.steps);
  const pts: [number, number][] = [walk.start];
  units.slice(0, done).forEach((d) => {
    const [x, y] = pts[pts.length - 1];
    pts.push([x + VEC[d][0], y + VEC[d][1]]);
  });
  const finished = done >= units.length;
  // melyik lépéscsoportnál tartunk?
  let acc = 0;
  let groupIdx = walk.steps.length;
  for (let i = 0; i < walk.steps.length; i++) {
    if (done < acc + walk.steps[i][0]) {
      groupIdx = i;
      break;
    }
    acc += walk.steps[i][0];
  }
  const doneRef = useRef(done);
  doneRef.current = done;
  const unitsRef = useRef(units);
  unitsRef.current = units;

  const step = (d: DirId) => {
    const u = unitsRef.current;
    const k = doneRef.current;
    if (k >= u.length) return;
    if (u[k] === d) {
      setDone(k + 1);
      setMsg(k + 1 >= u.length ? 'Kész! Visszaértél a kiindulópontba, elkészült az ábra.' : '');
    } else {
      setMsg(`Hoppá! Most nem ${d} felé kell lépni. Nézd meg a kiemelt lépést!`);
    }
  };
  const labRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = labRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, DirId> = { ArrowUp: 'É', ArrowDown: 'D', ArrowLeft: 'NY', ArrowRight: 'K' };
      const d = map[e.key];
      if (d) {
        e.preventDefault();
        step(d);
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  const U = 26;
  const btn = 'min-h-[48px] px-4 rounded-xl font-bold text-sm border-2 transition active:scale-95';

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="tajekozodas"
      grade={4}
      chapterId="sikidomok-testek"
      title="8. Tájékozódás"
      subtitle="Hol van a város a térképen? Hol áll a huszár a sakktáblán? Betűvel és számmal pontosan megadhatjuk egy mező helyét."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="cyan"
      pdfFilename="4_osztaly_tajekozodas_tananyag.pdf"
      practiceTitle="Készen állsz a tájékozódós feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A MEZŐ KÓDJA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-cyan-50/90 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/80 text-center">
              <span className="font-mono text-base font-black text-cyan-900 dark:text-cyan-200">
                Kód = az OSZLOP betűje + a SOR száma (például G1, C4, e4)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A G1 azt jelenti, hogy a G jelű oszlop 1-es mezőjében van a keresett hely.</li>
              <li>
                A sakktáblán az oszlopok a–h, a sorok 1–8. A bábu helye például: <strong>e1</strong>.
              </li>
              <li>A négyzetrácson az irányt a világtájakkal adjuk meg: 3É = 3 lépés észak felé (felfelé).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Hol van a térképen?" badge="Tankönyv 130. o. 1. feladat" badgeColor="cyan">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A tankönyv Magyarország-térképét vonalak <strong>mezőkre</strong> osztják. Az oszlopokat betűk (A, B, C, …), a sorokat számok (1, 2, 3, …) jelölik.
            </p>
            <p>
              <strong>„A G1 azt jelenti, hogy a G jelű oszlop 1-es mezőjében van a keresett város.”</strong>
            </p>
            <p>Így gyakorolunk mi is a Kisváros térképén: a posta a C3 mezőben van, az iskola a B2-ben.</p>
          </div>
          <TownMapSvg />
        </div>
      </TheorySection>

      {/* 2. A kód leolvasása */}
      <TheorySection title="2. Hogyan olvassuk le a kódot?" badge="Elmélet" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CodeReadingSvg />
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
            <li>Menj fel (vagy le) a mezőből az oszlop tetejére: ott a <strong>betű</strong>.</li>
            <li>Menj oldalra a sor elejére: ott a <strong>szám</strong>.</li>
            <li>
              Írd le őket ebben a sorrendben: először a betű, aztán a szám: <strong>C4</strong>.
            </li>
            <li>Visszafelé: a C4 kódhoz keresd meg a C oszlopot és a 4. sort – ahol találkoznak, ott a mező.</li>
          </ol>
        </div>
      </TheorySection>

      {/* 3. Sakktábla */}
      <TheorySection title="3. Sakktábla-szerű jelölés" badge="Tankönyv 130. o. 2. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ChessBoardSvg />
          <ChessPiecesSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A sakktábla mezői" badge="8 · 8 = 64" badgeColor="amber">
            <p className="text-sm text-slate-700">
              A sakktáblán 8 oszlop (a, b, c, d, e, f, g, h) és 8 sor (1–8) van, összesen 8 · 8 = 64 mező. A világos és a sötét bábuk helyét ugyanúgy adjuk meg: oszlop betűje + sor száma.
            </p>
          </TheoryCard>
          <TheoryCard title="Ha több azonos bábu van" badge="mindegyik helye" badgeColor="sky">
            <p className="text-sm text-slate-700">
              A világos bástyák az <strong>a1</strong> és a <strong>h1</strong> mezőn állnak. Ilyenkor mindegyik bábu helyét meg kell adni.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Nézzük meg együtt! */}
      <TheorySection title="4. Nézzük meg együtt! Haladás a négyzetrácson" badge="Munkafüzet 41. o. 2. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GridWalkSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Haladj a négyzetrács oldala mentén a megadott irányok szerint! A ponttól kezdd!</p>
            <TheoryTable
              headers={['Lépés', 'Mit jelent?']}
              rows={[
                ['4K', '4 oldalnyit keletre (jobbra)'],
                ['3É', '3 oldalnyit északra (fel)'],
                ['2ÉNY', '2 átlót északnyugatra (balra fel)'],
                ['2DNY', '2 átlót délnyugatra (balra le)'],
                ['3D', '3 oldalnyit délre (le) – visszaértél!']
              ]}
            />
          </div>
        </div>
        <TheoryCallout type="tip" title="Ellenőrizd a végén!">
          Ha az ábra zárt, a végén pontosan a kiindulópontba kell visszaérned. Ha nem, valahol elszámoltad a lépéseket.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Vigyázz! */}
      <TheorySection title="5. Vigyázz! Előbb a betű, és nézd meg, merre nőnek a számok!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Fordított sorrend és rossz irány"
          wrong="A templom helye: 1D. Az e4 mező fölötti mező az e3."
          wrongExplanation="A kódban előbb az oszlop betűje áll, aztán a sor száma: D1. A sakktáblán az 1. sor van alul, ezért felfelé nőnek a számok: e4 fölött az e5 van."
          correct="templom: D1; az e4 fölötti mező: e5"
          correctExplanation="A tankönyvi térképen az 1. sor felül van, a sakktáblán alul. Mindig nézd meg, hol kezdődik a számozás!"
          tip="A sakktáblán kisbetűt írunk (e4), a térképen nagybetűt (G1)."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Labor I: Mezőkód-kereső a Kisváros térképén" badge="Labor" badgeColor="cyan">
        <div className="bg-white border-2 border-cyan-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => {
                setMode('find');
                setClicked(null);
              }}
              className={`${btn} ${mode === 'find' ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-cyan-50'}`}
            >
              Keresd meg a mezőt!
            </button>
            <button
              onClick={() => {
                setMode('name');
                setPicked(null);
              }}
              className={`${btn} ${mode === 'name' ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-cyan-50'}`}
            >
              Mi a kódja?
            </button>
          </div>
          {mode === 'find' ? (
            <>
              <p className="text-center text-base font-bold text-cyan-900">
                Kattints a(z) <span className="font-mono text-xl">{findCode}</span> mezőre!
              </p>
              <svg viewBox="0 0 310 262" className="w-full max-w-md mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200 touch-manipulation">
                <TownMap
                  onCell={(c) => setClicked(c)}
                  marks={clicked ? { [clicked]: clicked === findCode ? '#86efac' : '#fca5a5', ...(clicked !== findCode ? { [findCode]: '#fde68a' } : {}) } : undefined}
                />
              </svg>
              {clicked && (
                <div className={`p-3 rounded-xl text-center font-bold ${clicked === findCode ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                  {clicked === findCode
                    ? `Pontosan! ${findCode}: a ${findCode[0]} oszlop és a ${findCode.slice(1)}. sor találkozása.`
                    : `Ez a(z) ${clicked} mező. A ${findCode} a ${findCode[0]} oszlopban és a ${findCode.slice(1)}. sorban van (sárgával jelöltem).`}
                </div>
              )}
              <div className="text-center">
                <button
                  onClick={() => {
                    setFIdx((i) => (i + 1) % FIND_CODES.length);
                    setClicked(null);
                  }}
                  className={`${btn} bg-cyan-100 text-cyan-900 border-cyan-300 hover:bg-cyan-200`}
                >
                  Következő kód
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-base font-bold text-cyan-900">
                Melyik mezőben van a(z) <span className="underline">{namePlace.name}</span>? (sárgával kiemelve)
              </p>
              <svg viewBox="0 0 310 262" className="w-full max-w-md mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
                <TownMap highlight={nameCode} />
              </svg>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {nameOptions.map((o) => {
                  const cls =
                    picked === null
                      ? 'bg-white border-slate-300 hover:bg-cyan-50'
                      : o === nameCode
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                        : o === picked
                          ? 'bg-rose-100 border-rose-500 text-rose-900'
                          : 'bg-white border-slate-200 opacity-60';
                  return (
                    <button key={o} onClick={() => picked === null && setPicked(o)} className={`min-h-[56px] rounded-xl border-2 font-mono text-xl font-bold transition active:scale-95 ${cls}`}>
                      {o}
                    </button>
                  );
                })}
              </div>
              {picked && (
                <div className={`p-3 rounded-xl text-center font-bold ${picked === nameCode ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                  {picked === nameCode
                    ? 'Ügyes! Előbb az oszlop betűje, aztán a sor száma.'
                    : /^[0-9]/.test(picked)
                      ? `Fordított sorrend! Előbb a betű jön: ${nameCode}.`
                      : `Nem egészen: a(z) ${namePlace.name} a ${nameCode[0]} oszlopban és a ${nameCode.slice(1)}. sorban van: ${nameCode}.`}
                </div>
              )}
              <div className="text-center">
                <button
                  onClick={() => {
                    setNIdx((i) => (i + 1) % NAME_TASKS.length);
                    setPicked(null);
                  }}
                  className={`${btn} bg-cyan-100 text-cyan-900 border-cyan-300 hover:bg-cyan-200`}
                >
                  Következő hely
                </button>
              </div>
            </>
          )}
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Labor II: Séta a négyzetrácson – kövesd az utasítást!" badge="Labor" badgeColor="emerald">
        <div ref={labRef} tabIndex={0} className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4 outline-none focus:ring-2 focus:ring-emerald-300">
          <div className="flex flex-wrap gap-2 justify-center">
            {WALKS.map((w, i) => (
              <button
                key={w.name}
                onClick={() => {
                  setWIdx(i);
                  setDone(0);
                  setMsg('');
                }}
                className={`${btn} ${wIdx === i ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'}`}
              >
                {w.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 font-mono text-base">
            {walk.steps.map(([n, d], i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded-lg border-2 ${i < groupIdx ? 'bg-emerald-100 border-emerald-300 text-emerald-800 line-through' : i === groupIdx ? 'bg-amber-200 border-amber-500 text-amber-900 font-black' : 'bg-white border-slate-200 text-slate-700'}`}
              >
                {n}
                {d}
              </span>
            ))}
          </div>
          <p className="text-xs text-center text-slate-500">
            Minden gombnyomás 1 lépés. Átlós lépés (pl. ÉK): egy kis négyzet átlóján megyünk át. Kattints ide, és a billentyűzet nyilaival is léphetsz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
            <svg viewBox={`0 0 ${10 * U + 2} ${10 * U + 2}`} className="w-full max-w-sm mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
              {Array.from({ length: 11 }, (_, i) => (
                <g key={i}>
                  <line x1={1 + i * U} y1={1} x2={1 + i * U} y2={1 + 10 * U} stroke="#cbd5e1" />
                  <line x1={1} y1={1 + i * U} x2={1 + 10 * U} y2={1 + i * U} stroke="#cbd5e1" />
                </g>
              ))}
              {pts.length > 1 && (
                <polyline
                  points={pts.map(([x, y]) => `${1 + x * U},${1 + y * U}`).join(' ')}
                  fill={finished ? '#bbf7d0' : 'none'}
                  stroke="#059669"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
              <circle cx={1 + walk.start[0] * U} cy={1 + walk.start[1] * U} r="5" fill="#0f172a" />
              <circle cx={1 + pts[pts.length - 1][0] * U} cy={1 + pts[pts.length - 1][1] * U} r="7" fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
              <text x={10 * U - 6} y={18} textAnchor="end" fontSize="13" fontWeight="bold" fill="#dc2626">
                É ↑
              </text>
            </svg>
            <div className="grid grid-cols-3 gap-2 w-[210px] mx-auto">
              {PAD.map((d, i) =>
                d === null ? (
                  <div key={i} className="flex items-center justify-center text-xs font-bold text-slate-400">
                    {done}/{units.length}
                  </div>
                ) : (
                  <button
                    key={d}
                    onClick={() => step(d)}
                    className={`${btn} px-1 ${d.length === 1 || d === 'NY' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'}`}
                    aria-label={`lépés ${d}`}
                  >
                    {d} {ARROW[d]}
                  </button>
                )
              )}
            </div>
          </div>
          {msg && (
            <div className={`p-3 rounded-xl text-center font-bold ${finished ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>{msg}</div>
          )}
          <div className="text-center">
            <button
              onClick={() => {
                setDone(0);
                setMsg('');
              }}
              className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`}
            >
              Újrakezdem
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Orientation4Theory;
