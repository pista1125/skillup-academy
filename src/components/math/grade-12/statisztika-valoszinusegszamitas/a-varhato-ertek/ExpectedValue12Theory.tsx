import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { LuckyWheelSvg, WheelTableSvg, AngleWheelSvg, StockScenarioSvg, CoinHeadsSvg, TargetBoardSvg } from './ExpectedValue12Figures';
import { SFig, SText, SWheel, S_BLUE, S_RED, S_AXIS, S_GRID, S_PALETTE, hu } from './statKit';

const PROBS = [0.5, 0.4, 0.1];
const RA = [22, -12, 8];
const RB = [-2, 16, 10];

const portfolio = (w: number) => {
  const r = RA.map((a, i) => w * a + (1 - w) * RB[i]);
  const e = r.reduce((s, x, i) => s + PROBS[i] * x, 0);
  const v = r.reduce((s, x, i) => s + PROBS[i] * (x - e) ** 2, 0);
  return { r, e, sd: Math.sqrt(v) };
};

interface Sec {
  value: number;
  deg: number;
}

const START: Sec[] = [
  { value: 0, deg: 120 },
  { value: 100, deg: 60 },
  { value: 200, deg: 60 },
  { value: 900, deg: 60 },
  { value: 1200, deg: 60 }
];

export const ExpectedValue12Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: szerencsekerék-szerkesztő
  const [secs, setSecs] = useState<Sec[]>(START);
  const [stake, setStake] = useState<number>(500);
  const [spins, setSpins] = useState<{ n: number; sum: number; last: number | null }>({ n: 0, sum: 0, last: null });
  const ev = secs.reduce((s, x) => s + (x.deg / 360) * x.value, 0);
  const mostLikely = secs.reduce((b, x) => (x.deg > b.deg ? x : b), secs[0]);
  const setDeg = (i: number, d: number) => {
    // az utolsó cikk szöge = 360° − a többi
    const next = secs.map((s, j) => (j === i ? { ...s, deg: d } : s));
    const others = next.slice(0, -1).reduce((s, x) => s + x.deg, 0);
    if (others > 350) return;
    next[next.length - 1] = { ...next[next.length - 1], deg: 360 - others };
    setSecs(next);
    setSpins({ n: 0, sum: 0, last: null });
  };
  const setVal = (i: number, v: number) => {
    setSecs(secs.map((s, j) => (j === i ? { ...s, value: v } : s)));
    setSpins({ n: 0, sum: 0, last: null });
  };
  const spin = (k: number) => {
    let sum = 0;
    let last = 0;
    for (let t = 0; t < k; t++) {
      let u = Math.random() * 360;
      let val = secs[secs.length - 1].value;
      for (const s of secs) {
        if (u < s.deg) {
          val = s.value;
          break;
        }
        u -= s.deg;
      }
      sum += val;
      last = val;
    }
    setSpins((p) => ({ n: p.n + k, sum: p.sum + sum, last }));
  };

  // Labor II: portfólió
  const [wPct, setWPct] = useState<number>(50);
  const pf = portfolio(wPct / 100);
  const curve = useMemo(() => Array.from({ length: 101 }, (_, i) => portfolio(i / 100)), []);
  const best = curve.reduce((b, x, i) => (x.sd < curve[b].sd ? i : b), 0);

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="a-varhato-ertek"
      title="9. A várható érték"
      subtitle="Szerencsekerekek, sorsjegyek és részvények: a kimenetelek valószínűségekkel súlyozott átlaga."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_a_varhato_ertek_tananyag.pdf"
      practiceTitle="Készen állsz a várható érték feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A VÁRHATÓ ÉRTÉK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">E = x₁ · p₁ + x₂ · p₂ + … + xₙ · pₙ</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>x₁, …, xₙ</strong> a lehetséges kimenetelek (valós számok), <strong>p₁, …, pₙ</strong> a valószínűségeik (p₁ + … + pₙ = 1).
              </li>
              <li>A várható érték a lehetséges kimenetelek valószínűségekkel súlyozott átlaga. Jele: E.</li>
              <li>Sok kísérlet esetén a kimenetelek átlaga a várható érték közelében lesz – de E nem azonos a legvalószínűbb eredménnyel.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: a vurstli szerencsekereke" badge="Tankönyv 94. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az ábra szerinti szerencsekereket egy vurstliban működteti egy vállalkozó. <strong>a)</strong> Mennyi a nyeremény várható értéke egy
              pörgetésnél? <strong>b)</strong> Mennyi a vállalkozó várható nyeresége egy pörgetésen, ha egy pörgetés 500 Ft-ba kerül?
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>A kerék 6 egyenlő cikkből áll, ezért minden cikk valószínűsége 1/6. A „nem nyert” két cikken szerepel: P(0 Ft) = 2/6.</li>
              <li>Táblázatba foglaljuk a nyereményeket és valószínűségeiket.</li>
              <li>Minden nyereményt megszorzunk a valószínűségével, és a szorzatokat összeadjuk.</li>
              <li>
                <strong>a)</strong> E = (0 + 100 + 200 + 900 + 1200) / 6 = 2400 / 6 = <strong>400 Ft</strong>.
              </li>
              <li>
                <strong>b)</strong> A vállalkozó várható nyeresége pörgetésenként 500 − 400 = <strong>100 Ft</strong>.
              </li>
            </ol>
          </div>
          <LuckyWheelSvg />
        </div>
        <WheelTableSvg />
      </TheorySection>

      <TheorySection title="2. Elmélet: a várható érték (ismétlés)" badge="Elmélet" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A várható érték csak olyan esetben értelmezhető, amikor <strong>minden elemi esemény kimenetele valós számmal jellemezhető</strong>
              (pl. nyeremény forintban, dobott szám, fejek száma, hozam %-ban).
            </p>
            <p>
              Ha nagyszámú kísérletet végzünk, a kimenetelek átlaga egy jól meghatározható érték közelében lesz. Ez az érték a lehetséges kimenetelek
              valószínűségéből számolható: ez a <strong>várható érték</strong>, jele <strong>E</strong>.
            </p>
            <TheoryCallout type="warning" title="Megjegyzés">
              A várható érték nem azonos a legvalószínűbb eredménnyel. A vurstli kerekén a legvalószínűbb kimenetel a 0 Ft (2/6), a várható érték mégis
              400 Ft.
            </TheoryCallout>
          </div>
          <CoinHeadsSvg />
        </div>
        <TheoryTable
          headers={['Statisztika', 'Valószínűségszámítás']}
          rows={[
            ['relatív gyakoriság', 'valószínűség'],
            ['átlag, súlyozott átlag', 'várható érték'],
            ['adatok szórása', 'valószínűségi szórás (kockázat)']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Feladatok a tankönyvből" badge="Feladatok" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Szerencsekerék eltérő szögekkel" badge="1. feladat" badgeColor="sky">
            <AngleWheelSvg className="w-full max-w-[260px] h-auto mx-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A valószínűség a középponti szög / 360°: P(300 Ft) = 80/360, P(400 Ft) = 100/360, P(900 Ft) = 70/360, P(2000 Ft) = 60/360, P(3000 Ft) = 50/360.</li>
              <li>E = (300 · 80 + 400 · 100 + 900 · 70 + 2000 · 60 + 3000 · 50) / 360 = 397 000 / 360 ≈ <strong>1102,78 Ft</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Két részvény várható hozama" badge="2. feladat" badgeColor="purple">
            <StockScenarioSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>E(A) = 0,5 · 22 + 0,4 · (−12) + 0,1 · 8 = 11 − 4,8 + 0,8 = <strong>7%</strong>.</li>
              <li>E(B) = 0,5 · (−2) + 0,4 · 16 + 0,1 · 10 = −1 + 6,4 + 1 = <strong>6,4%</strong>.</li>
              <li>Fele A, fele B: (7 + 6,4) / 2 = <strong>6,7%</strong> (vagy esetenként 10%, 2%, 9% súlyozott átlaga).</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <TheoryCard title="C) A dobott fejek száma" badge="3. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Egy érme: 0 · ½ + 1 · ½ = <strong>0,5</strong>.</li>
              <li>Két érme: 0 · ¼ + 1 · ½ + 2 · ¼ = <strong>1</strong>.</li>
              <li>Három érme: 0 · ⅛ + 1 · ⅜ + 2 · ⅜ + 3 · ⅛ = 12/8 = <strong>1,5</strong>.</li>
              <li>Általában n érmével a fejek számának várható értéke n / 2.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Házi feladatok" badge="HF 1–2." badgeColor="indigo">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                Árfolyam: 0,3 · 5640 + 0,6 · 5710 + 0,1 · 5120 = 1692 + 3426 + 512 = <strong>5630 Ft</strong>; várható hozam: 5630 / 5330 ≈ 1,0563 →
                <strong> 5,63%</strong>.
              </li>
              <li>
                Céltábla: a belső kör területe a teljes ¼-e, így P(40) = P(50) = 1/16 + 1/16 = 1/8, P(10) = P(20) = 3/8. E = (3 · 10 + 3 · 20 + 40 + 50) / 8
                = <strong>22,5</strong>.
              </li>
            </ul>
            <TargetBoardSvg className="w-full max-w-[220px] h-auto mx-auto mt-2" />
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Ráadás: várható hozam és kockázat" badge="Ráadás" badgeColor="purple">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Befektetésnél nemcsak a várható hozamot kell figyelni, hanem a kockázatot is. A valószínűségszámításban is értelmezhető a szórás: a kimenetelek
            várható értéktől való eltérését négyzetre emeljük, ezek valószínűséggel súlyozott átlaga a szórásnégyzet, ennek gyöke a szórás.
          </p>
          <TheoryTable
            headers={['', 'csak A', 'csak B', 'fele A, fele B']}
            rows={[
              ['várható hozam', '7,0%', '6,4%', '6,7%'],
              ['szórás (kockázat)', '√257 ≈ 16,0%', '√73,44 ≈ 8,6%', '√14,81 ≈ 3,85%']
            ]}
          />
          <p>
            Pl. az A részvénynél az eltérések 15, −19 és 1: 0,5 · 225 + 0,4 · 361 + 0,1 · 1 = 257, σ ≈ 16,0%. A vegyes befektetés kockázata mindkét
            részvényénél kisebb: amikor az egyik rosszul teljesít, a másik jól (<strong>diverzifikációs hatás</strong>).
          </p>
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: a várható érték nem a legvalószínűbb érték" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A várható értéket nem „várjuk” egyetlen kísérletben"
          wrong="Egy kockadobásnál a dobott szám várható értéke 3,5, tehát leggyakrabban 3,5-et fogunk dobni."
          wrongExplanation="3,5-et nem is lehet dobni! A várható érték nem feltétlenül lehetséges kimenetel, és nem is a legvalószínűbb érték."
          correct="E = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 3,5: sok dobás átlaga lesz 3,5 közelében."
          correctExplanation="A várható érték a hosszú távú átlagot írja le, nem egyetlen kísérlet eredményét."
          tip="Ellenőrizd mindig, hogy a valószínűségek összege 1 – különben hibás az eloszlás-táblázat!"
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: Szerencsekerék-szerkesztő" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              {secs.map((s, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 items-center">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600">
                      {i + 1}. cikk nyereménye: {s.value} Ft
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="100"
                      value={s.value}
                      onChange={(e) => setVal(i, Number(e.target.value))}
                      className="w-full accent-indigo-600"
                      aria-label={`${i + 1}. cikk nyereménye`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600">
                      szöge: {s.deg}°{i === secs.length - 1 ? ' (360° − a többi)' : ''}
                    </label>
                    {i < secs.length - 1 ? (
                      <input
                        type="range"
                        min="10"
                        max="200"
                        step="10"
                        value={s.deg}
                        onChange={(e) => setDeg(i, Number(e.target.value))}
                        className="w-full accent-amber-600"
                        aria-label={`${i + 1}. cikk szöge`}
                      />
                    ) : (
                      <div className="h-5 rounded bg-slate-100" />
                    )}
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">egy pörgetés ára (tét): {stake} Ft</label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={stake}
                  onChange={(e) => setStake(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="tét"
                />
              </div>
            </div>
            <SFig w={240} h={170} className="w-full max-w-[300px] h-auto mx-auto">
              <SWheel
                cy={90}
                r={66}
                s={7.5}
                sectors={secs.map((s, i) => ({ label: `${s.value} Ft`, deg: s.deg, color: S_PALETTE[i], showDeg: true }))}
              />
            </SFig>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            {[
              ['várható nyeremény E', `${hu(ev, 2)} Ft`],
              ['legvalószínűbb nyeremény', `${mostLikely.value} Ft`],
              ['szervező várható nyeresége', `${hu(stake - ev, 2)} Ft`],
              ['pörgetések átlaga', spins.n ? `${hu(spins.sum / spins.n, 2)} Ft` : '–']
            ].map(([t, v]) => (
              <div key={t} className="bg-indigo-50 rounded-xl p-2 border border-indigo-200">
                <div className="text-[11px] text-slate-500">{t}</div>
                <div className="font-mono font-black text-indigo-900">{v}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {[1, 10, 100, 1000].map((k) => (
              <button key={k} onClick={() => spin(k)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white">
                {k} pörgetés
              </button>
            ))}
            <button
              onClick={() => {
                setSecs(START);
                setStake(500);
                setSpins({ n: 0, sum: 0, last: null });
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700"
            >
              vissza a tankönyvi kerékhez
            </button>
            <span className="text-xs text-slate-600">
              eddig {spins.n} pörgetés{spins.last !== null ? `, utolsó: ${spins.last} Ft` : ''}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            {stake > ev + 1e-9
              ? 'A tét nagyobb a várható nyereménynél: hosszú távon a szervező nyer.'
              : stake < ev - 1e-9
                ? 'A tét kisebb a várható nyereménynél: hosszú távon a játékos jár jól.'
                : 'A tét egyenlő a várható nyereménnyel: hosszú távon egyik fél sem nyer.'}{' '}
            Sok pörgetés után a pörgetések átlaga a várható érték közelébe kerül.
          </p>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: Kockázat és diverzifikáció" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600">
              A pénz {wPct}%-át az A, {100 - wPct}%-át a B részvénybe fektetjük
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={wPct}
              onChange={(e) => setWPct(Number(e.target.value))}
              className="w-full accent-purple-600"
              aria-label="A részvény aránya"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <TheoryTable
              headers={['eset', 'p', 'hozam']}
              rows={pf.r.map((x, i) => [`${i + 1}. eset`, hu(PROBS[i], 1), `${hu(x, 2)}%`])}
            />
            <SFig w={260} h={150} className="w-full max-w-[340px] h-auto mx-auto" title="szórás (kockázat) az A arányának függvényében">
              {[0, 5, 10, 15].map((t) => (
                <g key={t}>
                  <line x1={34} y1={128 - t * 6} x2={250} y2={128 - t * 6} stroke={S_GRID} />
                  <SText x={30} y={131 - t * 6} t={`${t}%`} s={7} a="end" c={S_AXIS} />
                </g>
              ))}
              <path
                d={curve.map((c, i) => `${i ? 'L' : 'M'} ${(34 + i * 2.16).toFixed(1)} ${(128 - c.sd * 6).toFixed(1)}`).join(' ')}
                fill="none"
                stroke={S_BLUE}
                strokeWidth={2}
              />
              <circle cx={34 + wPct * 2.16} cy={128 - pf.sd * 6} r={4} fill={S_RED} />
              <line x1={34} y1={128} x2={250} y2={128} stroke={S_AXIS} />
              <SText x={34} y={140} t="csak B" s={7} a="start" c={S_AXIS} />
              <SText x={250} y={140} t="csak A" s={7} a="end" c={S_AXIS} />
            </SFig>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
            <div className="bg-purple-50 rounded-xl p-2 border border-purple-200">
              <div className="text-[11px] text-slate-500">várható hozam</div>
              <div className="font-mono font-black text-purple-900">{hu(pf.e, 2)}%</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-2 border border-purple-200">
              <div className="text-[11px] text-slate-500">szórás (kockázat)</div>
              <div className="font-mono font-black text-purple-900">{hu(pf.sd, 2)}%</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-2 border border-purple-200">
              <div className="text-[11px] text-slate-500">legkisebb kockázat</div>
              <div className="font-mono font-black text-purple-900">
                {best}% A-nál: {hu(curve[best].sd, 2)}%
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            A várható hozam lineárisan változik 6,4% és 7% között, a kockázat viszont a két szélső eset között jóval kisebb lehet, mint bármelyik részvényé
            külön-külön.
          </p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ExpectedValue12Theory;
