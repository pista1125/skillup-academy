import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { CoinProbabilityVennSvg, ClassicDiceSvg, BoardGameStepsSvg, ThreeDigitSlotsSvg, IndependentDiceSvg, boardStep } from './EventProbabilityFigures';
import { DiceGrid, F_BLUE, F_RED, F_PURPLE, F_GREEN, fmt, frac } from './probKit';

type EvKey = 'sum' | 'sumGe' | 'six' | 'step' | 'stepGe' | 'prodEven';
const EVS: Record<EvKey, { name: string; label: (k: number) => string; test: (w: number, b: number, k: number) => boolean; kMin: number; kMax: number; usesK: boolean }> = {
  sum: { name: 'összeg = k', label: (k) => `a dobások összege ${k}`, test: (w, b, k) => w + b === k, kMin: 2, kMax: 12, usesK: true },
  sumGe: { name: 'összeg ≥ k', label: (k) => `a dobások összege legalább ${k}`, test: (w, b, k) => w + b >= k, kMin: 2, kMax: 12, usesK: true },
  six: { name: 'van hatos', label: () => 'van hatos dobás', test: (w, b) => w === 6 || b === 6, kMin: 0, kMax: 0, usesK: false },
  prodEven: { name: 'szorzat páros', label: () => 'a dobások szorzata páros', test: (w, b) => (w * b) % 2 === 0, kMin: 0, kMax: 0, usesK: false },
  step: { name: 'társasjáték: lépés = k', label: (k) => `a társasjátékban ${k}-et lép`, test: (w, b, k) => boardStep(w, b) === k, kMin: 3, kMax: 12, usesK: true },
  stepGe: { name: 'társasjáték: lépés ≥ k', label: (k) => `a társasjátékban legalább ${k}-et lép`, test: (w, b, k) => boardStep(w, b) >= k, kMin: 3, kMax: 12, usesK: true }
};

type IndKey = 'w6' | 'b6' | 'wEven' | 'sum7' | 'sum8' | 'six' | 'bOdd' | 'eq';
const IND: Record<IndKey, { name: string; test: (w: number, b: number) => boolean }> = {
  w6: { name: 'a fehér hatos', test: (w) => w === 6 },
  b6: { name: 'a fekete hatos', test: (_w, b) => b === 6 },
  wEven: { name: 'a fehér páros', test: (w) => w % 2 === 0 },
  bOdd: { name: 'a fekete páratlan', test: (_w, b) => b % 2 === 1 },
  sum7: { name: 'az összeg 7', test: (w, b) => w + b === 7 },
  sum8: { name: 'az összeg 8', test: (w, b) => w + b === 8 },
  six: { name: 'van hatos', test: (w, b) => w === 6 || b === 6 },
  eq: { name: 'a két dobás egyenlő', test: (w, b) => w === b }
};

const ALL: [number, number][] = [];
for (let w = 1; w <= 6; w++) for (let b = 1; b <= 6; b++) ALL.push([w, b]);
const count = (f: (w: number, b: number) => boolean) => ALL.filter(([w, b]) => f(w, b)).length;

export const EventProbabilityTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [ev, setEv] = useState<EvKey>('sum');
  const [k, setK] = useState<number>(7);
  const [sim, setSim] = useState<{ n: number; hit: number }>({ n: 0, hit: 0 });
  // Labor II
  const [ia, setIa] = useState<IndKey>('w6');
  const [ib, setIb] = useState<IndKey>('sum7');

  const def = EVS[ev];
  const kk = Math.min(Math.max(k, def.kMin), def.kMax);
  const fav = count((w, b) => def.test(w, b, kk));
  const p = fav / 36;

  const roll = (times: number) => {
    let hit = 0;
    for (let i = 0; i < times; i++) {
      const w = 1 + Math.floor(Math.random() * 6);
      const b = 1 + Math.floor(Math.random() * 6);
      if (def.test(w, b, kk)) hit++;
    }
    setSim((s) => ({ n: s.n + times, hit: s.hit + hit }));
  };
  const chooseEv = (e: EvKey) => {
    setEv(e);
    setSim({ n: 0, hit: 0 });
  };

  const nA = count(IND[ia].test);
  const nB = count(IND[ib].test);
  const nAB = count((w, b) => IND[ia].test(w, b) && IND[ib].test(w, b));
  const indep = nAB * 36 === nA * nB;

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="esemeny-valoszinusege"
      title="7. Esemény valószínűsége"
      subtitle="Klasszikus valószínűség: kedvező / összes elemi esemény, a komplementer és a kizáró események valószínűsége, független események."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="violet"
      pdfFilename="12_osztaly_esemeny_valoszinusege_tananyag.pdf"
      practiceTitle="Készen állsz a valószínűség-számításra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KLASSZIKUS VALÓSZÍNŰSÉG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">P(A) = kedvező elemi események száma / összes elemi esemény száma</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Feltétel: az elemi események egyformán valószínűek, és a számuk véges.</li>
              <li>
                <strong>Komplementer:</strong> P(Ā) = 1 − P(A). <strong>Kizáró események:</strong> P(A + B) = P(A) + P(B), P(A · B) = 0.
              </li>
              <li>
                <strong>Független események:</strong> P(A · B) = P(A) · P(B).
              </li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: valószínűségek a három érmével" badge="Tankönyv 90. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Feldobunk egy 10, egy 20 és egy 50 forintost. A: a 10 forintoson írás látható; B: az érmék között pontosan egy fej látható.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az eseménytér 2³ = 8 elemi eseményből áll, és ezek egyformán valószínűek.</li>
              <li>
                A-hoz 4, B-hez 3 elemi esemény tartozik: P(A) = 4/8 = <strong>0,5</strong>, P(B) = 3/8 = <strong>0,375</strong>.
              </li>
              <li>
                A + B-hez 5, A · B-hez 2 elemi esemény tartozik: P(A + B) = 5/8 = <strong>0,625</strong>, P(A · B) = 2/8 = <strong>0,25</strong>.
              </li>
            </ul>
          </div>
          <CoinProbabilityVennSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Esemény valószínűsége" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha az elemi események egyformán valószínűek (és a számuk véges), akkor az A esemény valószínűsége a <strong>kedvező elemi események</strong> (amikor A bekövetkezik) és az <strong>összes elemi esemény</strong> számának hányadosa.
            </p>
            <TheoryTable
              headers={['Szabály', 'Képlet']}
              rows={[
                ['klasszikus valószínűség', 'P(A) = kedvező / összes'],
                ['határok', '0 ≤ P(A) ≤ 1; P(lehetetlen) = 0, P(biztos) = 1'],
                ['komplementer', 'P(Ā) = 1 − P(A)'],
                ['kizáró események összege', 'P(A + B) = P(A) + P(B)'],
                ['kizáró események szorzata', 'P(A · B) = 0'],
                ['független események', 'P(A · B) = P(A) · P(B)']
              ]}
            />
          </div>
          <ClassicDiceSvg />
        </div>
        <TheoryCallout type="info" title="Független események">
          Az A és a B események függetlenek, ha P(A · B) = P(A) · P(B). Ez akkor teljesül, ha B valószínűsége ugyanakkora akkor, ha A bekövetkezik, mint akkor, ha nem – és viszont. Két kockánál az, hogy az első hatos, nincs hatással arra, hogy a második hatos-e. Függetlenséget a P(A · B) = P(A) · P(B) egyenlőség ellenőrzésével bizonyítunk.
        </TheoryCallout>
        <IndependentDiceSvg />
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok a tankönyvből" badge="Mintapéldák" badgeColor="amber">
        <TheoryCard title="A) Háromjegyű számok és az 5-ös számjegy" badge="1. feladat" badgeColor="sky">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <ThreeDigitSlotsSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Összes háromjegyű szám: 999 − 99 = 900 (első jegy 9-féle, a többi 10-féle).</li>
              <li>
                <strong>a)</strong> egyik jegye sem 5: 8 · 9 · 9 = 648, P = 648/900 = <strong>0,72</strong>.
              </li>
              <li>
                <strong>b)</strong> legalább egy 5-ös: a komplementerrel 1 − 0,72 = <strong>0,28</strong>.
              </li>
              <li>
                <strong>c)</strong> pontosan egy 5-ös: 1 · 9 · 9 + 8 · 1 · 9 + 8 · 9 · 1 = 225, P = 225/900 = <strong>0,25</strong>.
              </li>
              <li>HF: különböző jegyek: 9 · 9 · 8 = 648 → 0,72; mindhárom jegy &lt; 4: 3 · 4 · 4 = 48 → 48/900 = 4/75 ≈ 0,053.</li>
            </ul>
          </div>
        </TheoryCard>
        <TheoryCard title="B) Társasjáték két kockával" badge="2. feladat" badgeColor="purple">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <BoardGameStepsSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Ha a fehérrel nem 1-est dob, a lépés a két dobás összege; ha 1-est, a fehér kockát 6-osra fordítja (pl. 1 és 4 → 6 + 4 = 10).</li>
              <li>
                <strong>a)</strong> hat: (2;4), (3;3), (4;2), (5;1) → 4/36 = <strong>1/9</strong>. <strong>b)</strong> nyolc vagy kilenc: 6 + 5 = 11 → <strong>11/36</strong>.
              </li>
              <li>
                <strong>c)</strong> legfeljebb négy: (2;1), (2;2), (3;1) → 3/36 = <strong>1/12</strong>. <strong>d)</strong> legalább tíz: 9 → 9/36 = <strong>1/4</strong>.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Független-e? Három szabályos érme" badge="4. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A: mindhárom azonos (FFF, III) → P(A) = 2/8 = 1/4. B: több fej, mint írás (FFF, FFI, FIF, IFF) → P(B) = 4/8 = 1/2. C: ugyanannyi fej, mint írás → lehetetlen, P(C) = 0.</li>
              <li>
                A · B = {'{'}FFF{'}'} → P(A · B) = 1/8, és P(A) · P(B) = 1/4 · 1/2 = 1/8. <strong>Tehát A és B függetlenek.</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Érkezési sorrend – nem független" badge="HF 3." badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Öt lány véletlen sorrendben érkezik: 5! = 120 sorrend.</li>
              <li>A: Anna harmadik → 4!/5! = 1/5; B: Bea negyedik → 1/5; C: Cili és Dóri közvetlenül egymás után → 4 · 2 · 3!/120 = 48/120 = 2/5.</li>
              <li>
                A · B: 3!/120 = 1/20, de P(A) · P(B) = 1/25. Mivel 1/20 ≠ 1/25, <strong>A és B nem függetlenek</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="E) A technikum kosárlabdázói" badge="3. feladat" badgeColor="sky">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>
              A táblázat adatai: 165 lány; a fiúk aránya 75%; 270 kosárlabdázó; a lányok ≈ 18%-a kosarazik. A kitöltött táblázat: <strong>660</strong> tanuló (165 lány =
              25%, 495 fiú = 75%), kosárlabdázó lány 165 · 0,18 ≈ <strong>30</strong>, fiú <strong>240</strong> (a fiúk ≈ 48,5%-a).
            </li>
            <li>b) P(lány) = 165 / 660 = 0,25; P(fiú) = 0,75.</li>
            <li>
              c) P(kosárlabdázó) = 270 / 660 ≈ 0,409; P(nem kosarazó lány) = 135 / 660 ≈ 0,205; P(kosaras lány vagy nem kosaras fiú) = (30 + 255) / 660 ≈ 0,432; P(kosaras fiú
              vagy nem kosaras lány) = (240 + 135) / 660 ≈ 0,568.
            </li>
            <li>
              d) E: kosárlabdázik, F: fiú. P(E · F) = 240 / 660 ≈ 0,364, P(E) · P(F) ≈ 0,409 · 0,75 ≈ 0,307 → <strong>E és F nem függetlenek</strong>.
            </li>
          </ul>
        </TheoryCard>
        <TheoryCallout type="tip" title="HF 2.: a ház lakói">
          67 lakó, 15 gyerek (40%-uk fiú: 6 fiú, 9 lány), 52 felnőtt (57,7%-uk nő: 30 nő, 22 férfi). P(gyerek) = 15/67, P(felnőtt nő) = 30/67, P(felnőtt vagy fiú) = (52 + 6)/67 = 58/67, P(lány) = 9/67.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: a valószínűségek összeadása" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="P(A + B) = P(A) + P(B) csak kizáró eseményekre igaz"
          wrong="A három érménél P(A + B) = 0,5 + 0,375 = 0,875."
          wrongExplanation="Az IIF és az IFI kimenetel A-hoz és B-hez is tartozik, így kétszer számoltuk őket. A helyes érték 5/8 = 0,625."
          correct="Kizáró eseményeknél P(A + B) = P(A) + P(B); egyébként számold meg közvetlenül az A + B kedvező elemi eseményeit."
          correctExplanation="Általában P(A + B) = P(A) + P(B) − P(A · B): 0,5 + 0,375 − 0,25 = 0,625."
          tip="„Legalább egy” típusú kérdésnél a komplementer gyorsabb: P(legalább egy 5-ös) = 1 − P(egy 5-ös sincs)."
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: kedvező / összes és a szimuláció" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(EVS) as EvKey[]).map((e) => (
                  <button
                    key={e}
                    onClick={() => chooseEv(e)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${ev === e ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {EVS[e].name}
                  </button>
                ))}
              </div>
              {def.usesK && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">k = {kk}</label>
                  <input
                    type="range"
                    min={def.kMin}
                    max={def.kMax}
                    value={kk}
                    onChange={(e) => {
                      setK(Number(e.target.value));
                      setSim({ n: 0, hit: 0 });
                    }}
                    className="w-full accent-violet-600"
                    aria-label="k értéke"
                  />
                </div>
              )}
              <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 text-sm text-violet-900 space-y-1">
                <div>
                  A: <strong>{def.label(kk)}</strong>
                </div>
                <div className="font-mono">
                  P(A) = {fav}/36 = {frac(fav, 36)} ≈ {fmt(p, 4)}
                </div>
                <div className="font-mono">P(Ā) = 1 − P(A) ≈ {fmt(1 - p, 4)}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[10, 100, 1000].map((t) => (
                  <button key={t} onClick={() => roll(t)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white">
                    Dobj {t}-szor!
                  </button>
                ))}
                <button onClick={() => setSim({ n: 0, hit: 0 })} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 text-slate-700">
                  Törlés
                </button>
              </div>
              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 text-sm text-emerald-900">
                {sim.n === 0 ? (
                  'Még nem dobtál. A relatív gyakoriság sok dobás után a valószínűség közelébe kerül.'
                ) : (
                  <span>
                    {sim.n} dobásból {sim.hit}-szer következett be: relatív gyakoriság = {fmt(sim.hit / sim.n, 4)} (valószínűség ≈ {fmt(p, 4)})
                  </span>
                )}
              </div>
            </div>
            <svg viewBox="0 0 250 230" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <DiceGrid
                x={50}
                y={36}
                cell={31}
                fs={10}
                text={(w, b) => (ev === 'step' || ev === 'stepGe' ? String(boardStep(w, b)) : ev === 'prodEven' ? String(w * b) : String(w + b))}
                hl={(w, b) => (def.test(w, b, kk) ? F_GREEN : undefined)}
              />
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: független-e a két esemény?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              {([['A', ia, setIa, 'bg-blue-600'], ['B', ib, setIb, 'bg-rose-600']] as [string, IndKey, (k: IndKey) => void, string][]).map(([nm, val, set, col]) => (
                <div key={nm}>
                  <span className="block text-xs font-semibold text-slate-600 mb-1">{nm} esemény (fehér és fekete kocka)</span>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(IND) as IndKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => set(key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${val === key ? `${col} text-white` : 'bg-slate-100 text-slate-700'}`}
                      >
                        {IND[key].name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className={`rounded-xl border p-4 text-sm space-y-1 ${indep ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                <div className="font-mono">
                  P(A) = {nA}/36, P(B) = {nB}/36
                </div>
                <div className="font-mono">
                  P(A · B) = {nAB}/36 = {frac(nAB, 36)}
                </div>
                <div className="font-mono">
                  P(A) · P(B) = ({nA} · {nB})/1296 = {frac(nA * nB, 1296)}
                </div>
                <div className="font-black">{indep ? 'Egyenlők: A és B függetlenek.' : 'Nem egyenlők: A és B nem függetlenek.'}</div>
              </div>
            </div>
            <svg viewBox="0 0 250 230" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <DiceGrid
                x={50}
                y={36}
                cell={31}
                fs={9}
                text={(w, b) => `${w};${b}`}
                hl={(w, b) => {
                  const a = IND[ia].test(w, b);
                  const bb = IND[ib].test(w, b);
                  return a && bb ? F_PURPLE : a ? F_BLUE : bb ? F_RED : undefined;
                }}
              />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EventProbabilityTheory;
