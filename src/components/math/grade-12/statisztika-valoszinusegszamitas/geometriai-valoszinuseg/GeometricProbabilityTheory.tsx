import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { TargetRingsSvg, LuckyWheelSvg, AntRodSvg, TileCoinSvg, FlowerPotSvg, PaperCornersSvg, Target } from './GeometricProbabilityFigures';
import { sectorPath, fmt, F_RED, F_AMBER, F_BLUE, F_GREEN, C_EDGE } from './probKit';

const RING_COLORS = ['bg-rose-100 text-rose-900', 'bg-amber-100 text-amber-900', 'bg-blue-100 text-blue-900'];
const WHEEL_FILLS = [F_BLUE, F_RED, F_GREEN];
const WHEEL_NAMES = ['kék', 'piros', 'zöld'];

export const GeometricProbabilityTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: céltábla
  const [r1, setR1] = useState<number>(5);
  const [r2, setR2] = useState<number>(15);
  const R = 25;
  const [shots, setShots] = useState<[number, number][]>([]);
  // Labor II: szerencsekerék
  const [ang1, setAng1] = useState<number>(120);
  const [ang2, setAng2] = useState<number>(90);
  const [spin, setSpin] = useState<{ angle: number | null; counts: number[] }>({ angle: null, counts: [0, 0, 0] });

  const rr1 = Math.min(r1, r2 - 1);
  const pIn = (rr1 * rr1) / (R * R);
  const pMid = (r2 * r2 - rr1 * rr1) / (R * R);
  const pOut = (R * R - r2 * r2) / (R * R);
  const region = ([x, y]: [number, number]) => {
    const d = Math.hypot(x, y);
    return d < rr1 ? 0 : d < r2 ? 1 : 2;
  };
  const hits = [0, 1, 2].map((k) => shots.filter((s) => region(s) === k).length);
  const shoot = (n: number) => {
    const add: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const rho = R * Math.sqrt(Math.random());
      const t = 2 * Math.PI * Math.random();
      add.push([rho * Math.cos(t), rho * Math.sin(t)]);
    }
    setShots((s) => [...s, ...add].slice(-3000));
  };

  const a2 = Math.min(ang2, 360 - ang1 - 10);
  const a3 = 360 - ang1 - a2;
  const angles = [ang1, a2, a3];
  const sectorOf = (a: number) => (a < ang1 ? 0 : a < ang1 + a2 ? 1 : 2);
  const doSpin = (n: number) => {
    setSpin((s) => {
      const counts = [...s.counts];
      let last = 0;
      for (let i = 0; i < n; i++) {
        last = Math.random() * 360;
        counts[sectorOf(last)]++;
      }
      return { angle: last, counts };
    });
  };
  const totalSpins = spin.counts.reduce((x, y) => x + y, 0);

  const S = 4.2;
  const CX = 120;
  const CY = 120;

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="geometriai-valoszinuseg"
      title="8. Geometriai valószínűség"
      subtitle="Céltábla, szerencsekerék, hangya a méterrúdon, érme a csempén, bogár a virágcserépben: hosszúságok, területek, szögek és térfogatok aránya."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="violet"
      pdfFilename="12_osztaly_geometriai_valoszinuseg_tananyag.pdf"
      practiceTitle="Készen állsz a geometriai valószínűség feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — GEOMETRIAI VALÓSZÍNŰSÉG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">P(A) = az A-hoz tartozó mérték / a teljes eseménytér mértéke</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Mérték: hosszúság, terület, térfogat vagy szög – mindig ugyanaz a fajta a számlálóban és a nevezőben.</li>
              <li>Végtelen sok elemi esemény (pont) van, ezért nem darabszámokat, hanem mértékeket osztunk.</li>
              <li>Szerencsekerék: P = a körcikk középponti szöge / 360°.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: a céltábla" badge="Tankönyv 92. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A céltábla belső körének átmérője 10 cm, mindkét körgyűrű szélessége 10 cm. Egy véletlenszerű lövés eltalálja a táblát. Mekkora valószínűséggel találja el a középső körlapot, a belső, illetve a külső körgyűrűt?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Az elemi események a céltábla pontjai – ezekből <strong>végtelen sok</strong> van, a „kedvező / összes darabszám” nem értelmezhető. Ezért a kedvező <strong>terület</strong> és a teljes körlap területének hányadosát vesszük.
              </li>
              <li>A sugarak: 5 cm, 15 cm, 25 cm.</li>
              <li>
                P(belső kör) = 5²π / 25²π = <strong>1/25</strong>; P(belső körgyűrű) = (15² − 5²)π / 25²π = <strong>8/25</strong>; P(külső körgyűrű) = (25² − 15²)π / 25²π = <strong>16/25</strong>.
              </li>
              <li>Az utolsó a komplementerrel is jön: 1 − (1/25 + 8/25) = 16/25.</li>
            </ul>
          </div>
          <TargetRingsSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Geometriai valószínűség" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha egy esemény bekövetkezését egy <strong>geometriai mennyiséggel</strong> (hosszúság, terület, térfogat, szög) jellemezzük, akkor a szemlélet alapján az esemény valószínűsége arányos az adott mennyiség mértékével. Ezért az eseményhez tartozó mennyiség mértékét osztjuk a teljes eseménytérhez tartozó ugyanezen mennyiség mértékével.
            </p>
            <TheoryTable
              headers={['Helyzet', 'Mérték', 'Példa']}
              rows={[
                ['pont egy szakaszon', 'hosszúság', 'hangya a méterrúdon'],
                ['pont egy síkidomban', 'terület', 'céltábla, csempe, papírlap'],
                ['pont egy testben', 'térfogat', 'pont a gömbben, bogár a cserépben'],
                ['forgó mutató', 'középponti szög', 'szerencsekerék: szög / 360°']
              ]}
            />
          </div>
          <LuckyWheelSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok a tankönyvből" badge="Mintapéldák" badgeColor="amber">
        <TheoryCard title="A) Hangya a méterrúdon" badge="1. feladat" badgeColor="sky">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <AntRodSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                <strong>a)</strong> A 0-s véghez közelebb: a rúd első fele, 50 cm → <strong>1/2</strong>.
              </li>
              <li>
                <strong>b)</strong> A középponthoz közelebb, mint bármelyik véghez: a 25 és 75 cm közötti rész, 50 cm → <strong>1/2</strong>.
              </li>
              <li>
                <strong>c)</strong> A 20 cm-es ponthoz közelebb, mint a 100 cm-es véghez: a felezőpont 60 cm-nél van, a kedvező rész 0–60 cm → <strong>0,6</strong>.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="B) Kör és gömb: közelebb a középponthoz" badge="2. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A pont akkor van közelebb a középponthoz, mint a határhoz, ha a középponttól mért távolsága kisebb R/2-nél.</li>
              <li>
                <strong>a)</strong> Körlap: (R/2)²π / R²π = <strong>1/4</strong>.
              </li>
              <li>
                <strong>b)</strong> Gömb: (4/3)(R/2)³π / (4/3)R³π = <strong>1/8</strong>.
              </li>
              <li>
                <strong>4. feladat:</strong> R = 16 cm-es tábla 4 egyenlő valószínűségű tartománya: a sugarak 16 · √(k/4): <strong>8; 8√2 ≈ 11,31; 8√3 ≈ 13,86; 16 cm</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) 50 forintos a csempés padlón" badge="3. feladat" badgeColor="emerald">
            <TileCoinSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Az érme (r = 1,4 cm) akkor nem érint fugát, ha a középpontja a csempe széleitől legalább 1,4 cm-re van: egy 20 − 2,8 = 17,2 cm oldalú négyzetben.</li>
              <li>Egy csempéhez 20,5 cm × 20,5 cm-es rész tartozik (csempe + a fugák fele): P = 17,2² / 20,5² ≈ <strong>0,704</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="D) Bogár a virágcserépben" badge="5. feladat" badgeColor="rose">
            <FlowerPotSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Alapkör sugara 9 cm, fedőkör sugara 6 cm, alkotó 10 cm: m = √(10² − 3²) = √91 ≈ 9,54 cm.</li>
              <li>A fedőlaptól 3 cm-re a metszet sugara 6 + 3 · 3/√91 ≈ 6,94 cm. A felső 3 cm-es csonkakúp-szelet térfogata (π · 3/3)(6² + 6 · 6,94 + 6,94²) ≈ 395,4 cm³.</li>
              <li>
                A teljes cserép: (π · √91 / 3)(9² + 9 · 6 + 6²) ≈ 1708,2 cm³, így P ≈ <strong>0,23</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Pont a papírlapon" badge="HF 2." badgeColor="teal">
            <PaperCornersSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A csúcsoktól legfeljebb 10 cm-re eső részek 4 negyedkört alkotnak (együtt egy 10 cm sugarú kört), ezek nem fedik egymást, mert 20 ≥ 2 · 10.</li>
              <li>
                P = (600 − 100π) / 600 ≈ <strong>0,476</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="HF 4.: a négy körnegyedre osztott céltábla">
          Ha a belső kör átmérője feleakkora, mint a külsőé, akkor a belső kör a tábla területének 1/4 része, minden belső körnegyed 1/16, minden külső „gyűrűnegyed” 3/16. Két 10-es külső rész esetén P(10) = 2 · 3/16 = 3/8; két 40-es belső rész esetén P(40) = 2/16 = 1/8; P(legalább 40) = a belső kör = 1/4.
        </TheoryCallout>
        <TheoryCallout type="tip" title="HF 1.: a négy tartományra osztott monitor">
          A 34,5 cm × 19,5 cm-es monitort (672,75 cm²) az egyik átló két háromszögre, a középpont köré rajzolt 8 cm sugarú kör pedig két félkörre (B és C) bontja.
          a) Az A vagy B tartomány a bal felső háromszög: P = <strong>1/2</strong>. b) B vagy C a teljes kör: P = 64π / 672,75 ≈ <strong>0,299</strong>. c) D = a jobb
          alsó háromszög a félkör nélkül: P = (336,375 − 32π) / 672,75 ≈ <strong>0,351</strong>.
        </TheoryCallout>
        <TheoryCallout type="tip" title="HF 3.: a kettétört festett méterrúd">
          A rúd 10 cm-enként felváltva piros és fehér, a 0–10 cm-es rész piros. A 42 cm-nél kettétört rúd rövidebb darabján piros: 0–10, 20–30, 40–42 → 22 cm, P = 22/42 ≈
          0,524; a hosszabb darabon piros: 42–50, 60–70, 80–90 → 28 cm, P = 28/58 ≈ 0,483. A <strong>rövidebb (42 cm-es) darabon</strong> nagyobb a valószínűség.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: sugár helyett terület" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A területek aránya a sugarak arányának négyzete"
          wrong="P(belső kör) = 5/25 = 1/5, mert a sugár ötöde."
          wrongExplanation="A lövés a tábla bármely pontjába eshet, így a területek számítanak. Az 1/5 a sugarak (hosszúságok) aránya."
          correct="P = 5²π / 25²π = (5/25)² = 1/25."
          correctExplanation="Síkban a hasonló alakzatok területaránya a hasonlósági arány négyzete, térben (gömb, kúp) a térfogataránya a köbe: a gömbös feladatban (1/2)³ = 1/8."
          tip="Mindig ugyanazt a fajta mértéket oszd: hosszt hosszal, területet területtel, térfogatot térfogattal, szöget 360°-kal."
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: céltábla-szimulátor" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A belső kör sugara: r₁ = {rr1} cm</label>
                <input type="range" min="1" max="23" value={rr1} onChange={(e) => setR1(Number(e.target.value))} className="w-full accent-rose-600" aria-label="belső sugár" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A középső kör sugara: r₂ = {r2} cm (a tábla sugara 25 cm)</label>
                <input type="range" min="2" max="24" value={r2} onChange={(e) => setR2(Math.max(Number(e.target.value), rr1 + 1))} className="w-full accent-amber-600" aria-label="középső sugár" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  { t: 'belső kör', p: pIn, h: hits[0] },
                  { t: 'belső gyűrű', p: pMid, h: hits[1] },
                  { t: 'külső gyűrű', p: pOut, h: hits[2] }
                ].map((b, i) => (
                  <div key={b.t} className={`rounded-xl p-2 ${RING_COLORS[i]}`}>
                    <div className="font-bold">{b.t}</div>
                    <div className="font-mono">P = {fmt(b.p, 4)}</div>
                    <div className="font-mono">rel. gyak.: {shots.length ? fmt(b.h / shots.length, 3) : '–'}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 10, 100, 1000].map((n) => (
                  <button key={n} onClick={() => shoot(n)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-600 text-white">
                    {n} lövés
                  </button>
                ))}
                <button onClick={() => setShots([])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 text-slate-700">
                  Törlés
                </button>
              </div>
              <div className="text-xs text-slate-600">
                Lövések száma: {shots.length}. A valószínűség = terület / teljes terület (pl. r₁²/25²); sok lövés után a relatív gyakoriságok ehhez közelítenek.
              </div>
            </div>
            <svg viewBox="0 0 240 240" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
              <Target cx={CX} cy={CY} radii={[rr1 * S, r2 * S, R * S]} fills={[F_RED, F_AMBER, F_BLUE]} />
              {shots.map(([x, y], i) => (
                <circle key={i} cx={CX + x * S} cy={CY + y * S} r={1.6} fill={C_EDGE} opacity={0.8} />
              ))}
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: szerencsekerék" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A kék körcikk szöge: {ang1}°</label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={ang1}
                  onChange={(e) => {
                    setAng1(Number(e.target.value));
                    setSpin({ angle: null, counts: [0, 0, 0] });
                  }}
                  className="w-full accent-blue-600"
                  aria-label="kék szög"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A piros körcikk szöge: {a2}°</label>
                <input
                  type="range"
                  min="10"
                  max="340"
                  step="5"
                  value={a2}
                  onChange={(e) => {
                    setAng2(Number(e.target.value));
                    setSpin({ angle: null, counts: [0, 0, 0] });
                  }}
                  className="w-full accent-rose-600"
                  aria-label="piros szög"
                />
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 text-sm text-purple-900 space-y-1">
                {angles.map((a, i) => (
                  <div key={i} className="font-mono">
                    P({WHEEL_NAMES[i]}) = {a}°/360° ≈ {fmt(a / 360, 4)}
                    {totalSpins > 0 ? ` · rel. gyak.: ${fmt(spin.counts[i] / totalSpins, 3)}` : ''}
                  </div>
                ))}
                <div className="text-xs text-slate-600">A zöld körcikk szöge: 360° − {ang1}° − {a2}° = {a3}°.</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 10, 100, 1000].map((n) => (
                  <button key={n} onClick={() => doSpin(n)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white">
                    {n === 1 ? 'Pörgesd meg!' : `${n} pörgetés`}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-600">
                Pörgetések: {totalSpins}
                {spin.angle !== null ? ` · az utolsó: ${WHEEL_NAMES[sectorOf(spin.angle)]} (${fmt(spin.angle, 1)}°)` : ''}
              </div>
            </div>
            <svg viewBox="0 0 240 240" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
              {(() => {
                let acc = 0;
                return angles.map((a, i) => {
                  const a0 = acc;
                  acc += a;
                  return <path key={i} d={sectorPath(120, 125, 100, a0, acc)} fill={WHEEL_FILLS[i]} stroke={C_EDGE} strokeWidth={1.4} />;
                });
              })()}
              {spin.angle !== null && (
                <line
                  x1={120}
                  y1={125}
                  x2={120 + 92 * Math.sin((spin.angle * Math.PI) / 180)}
                  y2={125 - 92 * Math.cos((spin.angle * Math.PI) / 180)}
                  stroke={C_EDGE}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              )}
              <circle cx={120} cy={125} r={6} fill={C_EDGE} />
              <rect x={100} y={4} width={40} height={14} rx={4} fill={F_AMBER} />
              <text x={120} y={14} fontSize={9} textAnchor="middle" fill={C_EDGE}>
                0°
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GeometricProbabilityTheory;
