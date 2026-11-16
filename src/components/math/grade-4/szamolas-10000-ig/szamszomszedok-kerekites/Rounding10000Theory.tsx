import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  NeighboursTableSvg,
  RoundingNumberLineSvg,
  MountainsSvg,
  MineCartsSvg,
  ZoomNeighboursSvg,
  roundTo
} from './Rounding10000Figures';

const fmt = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));

const PLACES: { p: number; name: string; to: string; color: string }[] = [
  { p: 10, name: 'tízes', to: 'tízesre', color: '#0284c7' },
  { p: 100, name: 'százas', to: 'százasra', color: '#dc2626' },
  { p: 1000, name: 'ezres', to: 'ezresre', color: '#16a34a' }
];

const ROUNDS: { place: number; target: number; nums: number[] }[] = [
  { place: 100, target: 4800, nums: [4751, 4845, 3900, 4123, 4799, 3799, 4805, 4010] },
  { place: 1000, target: 4000, nums: [4751, 4845, 3900, 4123, 4799, 3799, 4805, 4010] },
  { place: 100, target: 1500, nums: [1450, 1449, 1588, 1549, 1399, 1560, 1532, 1499, 1435] },
  { place: 1000, target: 3000, nums: [2400, 2500, 3600, 3510, 3499, 2499, 2312, 2901, 3852] },
  { place: 10, target: 3250, nums: [3245, 3244, 3250, 3254, 3255, 3249, 3239, 3251] }
];

export const Rounding10000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: kerekítő számegyenes
  const [n, setN] = useState<number>(4763);
  const [placeIdx, setPlaceIdx] = useState<number>(1);
  const place = PLACES[placeIdx];
  const lo = n === 10000 ? 10000 - place.p : Math.floor(n / place.p) * place.p;
  const hi = lo + place.p;
  const rounded = roundTo(n, place.p);
  const isRound = n % place.p === 0;
  const change = (d: number) => setN(Math.max(0, Math.min(10000, n + d)));
  const X0 = 40;
  const X1 = 420;
  const xOf = (v: number) => X0 + ((X1 - X0) * (v - lo)) / place.p;

  // Labor II: lámpások
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const round = ROUNDS[roundIdx];
  const roundPlace = PLACES.find((p) => p.p === round.place)!;
  const good = round.nums.filter((v) => roundTo(v, round.place) === round.target);
  const allRight = checked && good.every((v) => picked.includes(v)) && picked.every((v) => good.includes(v));
  const toggle = (v: number) => {
    setChecked(false);
    setPicked(picked.includes(v) ? picked.filter((x) => x !== v) : [...picked, v]);
  };

  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="szamszomszedok-kerekites"
      grade={4}
      chapterId="szamolas-10000-ig"
      title="10. Számszomszédok, kerekítés"
      subtitle="Kik a szám szomszédjai? Melyik kerek számhoz van közelebb? Tanuljunk meg tízesre, százasra és ezresre kerekíteni!"
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="orange"
      pdfFilename="4_osztaly_szamszomszedok_kerekites_tananyag.pdf"
      practiceTitle="Készen állsz a kerekítésre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A KÖZELEBBI SZOMSZÉD',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              4200 ≈ 4000 • 3800 ≈ 4000 • 3500 ≈ 4000
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Egy szám ezresre kerekített értéke az az <strong>ezres szomszédja</strong>, amelyikhez <strong>közelebb</strong> van a számegyenesen.</li>
              <li>Ha pont <strong>középen</strong> van, a <strong>nagyobb</strong> szomszédra kerekítünk.</li>
              <li>A kerek szám kerekített értéke maga a szám (7000 ≈ 7000). A jel: <strong>≈</strong> (körülbelül egyenlő).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 43. o." badgeColor="orange">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Debrida lakóinak száma, a hegyek magassága, egy pénztárca tartalma – ilyenkor sokszor nem kell a pontos szám, elég, ha <strong>körülbelül</strong> tudjuk. Ilyenkor <strong>kerekítünk</strong>.
          </p>
          <p>
            Ehhez először meg kell keresni a szám <strong>szomszédjait</strong>: a két legközelebbi kerek tízest, százast vagy ezrest, amelyek közé a szám esik.
          </p>
        </div>
      </TheorySection>

      {/* 2. Számszomszédok */}
      <TheorySection title="2. A számszomszédok" badge="Tankönyv 43. o., 1. feladat" badgeColor="sky">
        <NeighboursTableSvg />
        <ZoomNeighboursSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Egyes szomszédok" badge="±1" badgeColor="amber">
            <p className="text-sm text-slate-700">Eggyel kisebb és eggyel nagyobb: 5363 és 5365.</p>
          </TheoryCard>
          <TheoryCard title="Tízes, százas, ezres szomszédok" badge="kerek számok" badgeColor="sky">
            <p className="text-sm text-slate-700">
              Az a két kerek tízes (százas, ezres), amelyek közé a szám esik. Az 5364-nél: <strong>5360 és 5370</strong>, <strong>5300 és 5400</strong>, <strong>5000 és 6000</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Megjegyzés a tankönyvhöz">
          A tankönyv 43. oldalán a táblázatban sajtóhiba van: az 5364 kisebb tízes szomszédja nem 5380, hanem <strong>5360</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kerekítés */}
      <TheorySection title="3. Kerekítés a számegyenesen" badge="Szabály" badgeColor="orange">
        <RoundingNumberLineSvg />
        <TheoryTable
          headers={['Szám', 'tízesre', 'százasra', 'ezresre']}
          rows={[
            ['5364', '≈ 5360', '≈ 5400', '≈ 5000'],
            ['4763', '≈ 4760', '≈ 4800', '≈ 5000'],
            ['3500', '≈ 3500', '≈ 3500', '≈ 4000'],
            ['9963', '≈ 9960', '≈ 10 000', '≈ 10 000']
          ]}
        />
        <TheoryCallout type="tip" title="Ügyes trükk: nézd a következő jegyet!">
          Ha százasra kerekítesz, nézd meg a <strong>tízesek</strong> helyén álló jegyet. Ha 0, 1, 2, 3 vagy 4, lefelé kerekítesz (a kisebb szomszéd). Ha 5, 6, 7, 8 vagy 9, felfelé (a nagyobb szomszéd). Tízesre kerekítésnél az egyeseket, ezresre kerekítésnél a százasokat nézd.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Nézzük meg együtt */}
      <TheorySection title="4. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MountainsSvg />
          <TheoryCard title="A) Melyik hegyről beszélnek?" badge="3. c) feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Tádé: százasra kerekítve 10 000 m. Ez csak 9950 és 10 000 között lehet.</li>
              <li>Teó: ezresre kerekítve 10 000 m.</li>
              <li>A hegyek közül csak a <strong>9963 m</strong> ilyen: 9963 ≈ 10 000 (százasra is, ezresre is).</li>
              <li>A 8500 m-es hegy ezresre kerekítve 9000 m (pont középen van, ezért felfelé).</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MineCartsSvg />
          <TheoryCard title="B) Hány drágakő van a csillében?" badge="4. feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>≈ 7000 (ezresre): 6449 ≈ 6000, 7500 ≈ 8000, <strong>7449 ≈ 7000</strong>, 6333 ≈ 6000.</li>
              <li>≈ 9000 (ezresre): <strong>8500</strong>, mert pont középen van, és felfelé kerekítünk.</li>
              <li>≈ 6500 (százasra): <strong>6540</strong>.</li>
              <li>≈ 2300 (százasra): <strong>2250</strong> (középen van, felfelé).</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Mennyi lehet a kunyhók száma?" badge="7. c) feladat" badgeColor="purple">
          <p className="text-sm text-slate-700">
            A kunyhók számának tízesre kerekített értéke 3250. Ilyen számok: <strong>3245, 3246, 3247, 3248, 3249, 3250, 3251, 3252, 3253, 3254</strong>. A 3244 már 3240-re, a 3255 már 3260-ra kerekedik.
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 5. Vigyázz */}
      <TheorySection title="5. Vigyázz! Ne kerekíts lépcsőzetesen!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A 4449 kerekítése ezresre"
          wrong="4449 → 4450 → 4500 → 5000"
          wrongExplanation="Ha előbb tízesre, aztán százasra, aztán ezresre kerekítesz, elcsúszol! Minden lépésben nagyobb lett a szám."
          correct="4449 ≈ 4000"
          correctExplanation="A 4449 a 4000 és az 5000 között van, és a 4000-hez van közelebb (a százasok helyén 4 áll)."
          tip="Mindig az eredeti számot kerekítsd, egyetlen lépésben!"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Labor I: Kerekítő számegyenes" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PLACES.map((p, i) => (
              <button
                key={p.p}
                onClick={() => setPlaceIdx(i)}
                className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[44px] ${i === placeIdx ? 'text-white' : 'bg-slate-100 text-slate-700'}`}
                style={i === placeIdx ? { background: p.color } : undefined}
              >
                Kerekítés {p.to}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[-1000, -100, -10, -1].map((d) => (
              <button key={d} onClick={() => change(d)} className="px-3 py-2 rounded-lg bg-slate-100 font-bold text-sm min-h-[44px] min-w-[52px]">
                {d}
              </button>
            ))}
            <div className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 text-2xl font-black min-w-[96px] text-center">{fmt(n)}</div>
            {[1, 10, 100, 1000].map((d) => (
              <button key={d} onClick={() => change(d)} className="px-3 py-2 rounded-lg bg-slate-100 font-bold text-sm min-h-[44px] min-w-[52px]">
                +{d}
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full accent-orange-600"
            aria-label="szám"
          />
          <svg viewBox="0 0 460 120" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            <line x1={X0} y1="70" x2={X1} y2="70" stroke={place.color} strokeWidth="3" />
            {Array.from({ length: 11 }, (_, j) => (
              <line key={j} x1={X0 + j * 38} y1={j === 5 ? 60 : 64} x2={X0 + j * 38} y2={j === 5 ? 80 : 76} stroke={place.color} strokeWidth={j === 5 ? 2 : 1} />
            ))}
            <circle cx={X0} cy="70" r="7" fill={rounded === lo ? place.color : '#fff'} stroke={place.color} strokeWidth="2.5" />
            <circle cx={X1} cy="70" r="7" fill={rounded === hi ? place.color : '#fff'} stroke={place.color} strokeWidth="2.5" />
            <text x={X0} y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill={place.color}>{fmt(lo)}</text>
            <text x={X1} y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill={place.color}>{fmt(hi)}</text>
            <text x={(X0 + X1) / 2} y="98" textAnchor="middle" fontSize="10" fill="#64748b">közép: {fmt(lo + place.p / 2)}</text>
            <circle cx={xOf(n)} cy="70" r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
            <text x={xOf(n)} y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">{fmt(n)}</text>
            {!isRound && (
              <path
                d={`M ${xOf(n)} 56 Q ${(xOf(n) + (rounded === lo ? X0 : X1)) / 2} 22 ${rounded === lo ? X0 + 4 : X1 - 4} 58`}
                fill="none"
                stroke="#78350f"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            )}
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-center">
            <div className="bg-slate-50 rounded-xl p-2 border">
              Kisebb {place.name} szomszéd: <strong>{fmt(lo)}</strong> (távolság: {n - lo})
            </div>
            <div className="bg-slate-50 rounded-xl p-2 border">
              Nagyobb {place.name} szomszéd: <strong>{fmt(hi)}</strong> (távolság: {hi - n})
            </div>
            <div className="rounded-xl p-2 font-bold text-white" style={{ background: place.color }}>
              {fmt(n)} ≈ {fmt(rounded)}
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            {isRound
              ? 'Ez a szám már kerek, ezért a kerekített értéke önmaga.'
              : n - lo === hi - n
                ? 'Pont középen van! Ilyenkor a nagyobb szomszédra kerekítünk.'
                : `A(z) ${fmt(rounded)} van közelebb, ezért erre kerekítünk.`}
          </p>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Labor II: A Varázshegy lámpásai" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-purple-50 rounded-xl p-3 text-sm text-purple-900">
            Kapcsold fel azokat a lámpásokat, amelyek számának <strong>{roundPlace.to}</strong> kerekített értéke <strong>{fmt(round.target)}</strong>!
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {round.nums.map((v) => {
              const on = picked.includes(v);
              const ok = roundTo(v, round.place) === round.target;
              const wrong = checked && on !== ok;
              return (
                <button
                  key={v}
                  onClick={() => toggle(v)}
                  className={`rounded-2xl border-2 py-3 font-black text-lg min-h-[64px] transition-colors ${
                    on ? 'bg-yellow-300 border-yellow-500 text-yellow-900 shadow-[0_0_14px_rgba(250,204,21,0.8)]' : 'bg-slate-700 border-slate-800 text-slate-100'
                  } ${wrong ? 'ring-4 ring-rose-500' : ''}`}
                >
                  {v}
                  {checked && <div className="text-[10px] font-bold">≈ {fmt(roundTo(v, round.place))}</div>}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setChecked(true)} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[44px]">
              Ellenőrzés
            </button>
            <button
              onClick={() => {
                setRoundIdx((roundIdx + 1) % ROUNDS.length);
                setPicked([]);
                setChecked(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[44px]"
            >
              Következő feladat
            </button>
          </div>
          {checked && (
            <div className={`rounded-xl p-2 text-center text-sm font-bold ${allRight ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {allRight
                ? `Szuper! Mind a(z) ${good.length} lámpást eltaláltad.`
                : `Még nem jó. A pirosan keretezett lámpásokat nézd meg újra! (${good.length} lámpás a jó)`}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Rounding10000Theory;
