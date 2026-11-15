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
  ScarfPatternSvg,
  TwoColorRowSvg,
  CircleChordsSvg,
  SubsetCountsSvg,
  MuseumVisitorsSvg
} from './BinomialCoefficientsFigures';

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const fmtInt = (x: number) => x.toLocaleString('hu-HU').replace(/ /g, ' ');

/** Álló binomiális együttható: (n alatt k). */
const Binom: React.FC<{ n: React.ReactNode; k: React.ReactNode; className?: string }> = ({ n, k, className = '' }) => (
  <span className={`inline-flex items-center align-middle mx-0.5 ${className}`}>
    <span className="text-[1.6em] leading-none font-light">(</span>
    <span className="inline-flex flex-col items-center leading-tight text-[0.85em] font-bold px-0.5">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-[1.6em] leading-none font-light">)</span>
  </span>
);

export const BinomialCoefficientsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: kalkulátor + rekeszek
  const [n, setN] = useState<number>(7);
  const [k, setK] = useState<number>(3);
  const [picked, setPicked] = useState<number[]>([0, 1, 2]);

  // Labor II: részhalmazok soronként
  const [row, setRow] = useState<number>(7);
  const [sel, setSel] = useState<number>(2);

  const kk = Math.min(k, n);
  const value = binom(n, kk);
  const ordered = Array.from({ length: kk }, (_, i) => n - i);
  const orderedValue = ordered.reduce((a, b) => a * b, 1);

  const changeN = (v: number) => {
    setN(v);
    const nk = Math.min(k, v);
    setK(nk);
    setPicked(Array.from({ length: nk }, (_, i) => i));
  };
  const changeK = (v: number) => {
    setK(v);
    setPicked(Array.from({ length: v }, (_, i) => i));
  };
  const randomPick = () => {
    const idx = Array.from({ length: n }, (_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    setPicked(idx.slice(0, kk).sort((a, b) => a - b));
  };
  const toggleSlot = (i: number) => {
    setPicked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].sort((a, b) => a - b)));
  };

  const rowVals = Array.from({ length: row + 1 }, (_, i) => binom(row, i));
  const rowMax = Math.max(...rowVals);
  const selK = Math.min(sel, row);
  const mirror = row - selK;

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="binomialis-egyutthatok"
      title="4. Binomiális együtthatók"
      subtitle="Hányféle sálmintát köthet Anita? Az (n alatt k) jelentése, kiszámítása faktoriálisokkal és számológéppel, a szimmetria és a kétféle elem sorba rendezése."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="purple"
      pdfFilename="11_osztaly_binomialis_egyutthatok_tananyag.pdf"
      practiceTitle="Készen állsz a binomiális együtthatós feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — n ALATT A k',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center font-mono text-base font-black text-purple-900 dark:text-purple-200">
              <Binom n="n" k="k" /> = n · (n − 1) · … · (n − k + 1) / k! = n! / (k! · (n − k)!)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Ennyiféleképpen választhatunk ki <strong>n különböző elem közül k darabot</strong>, ha minden elemet legfeljebb egyszer választunk, és <strong>nem számít a sorrend</strong>.
              </li>
              <li>
                Ugyanennyi egy n elemű halmaz <strong>k elemű részhalmazainak</strong> száma.
              </li>
              <li>
                <strong>Szimmetria:</strong> <Binom n="n" k="k" /> = <Binom n="n" k="n − k" />; továbbá <Binom n="n" k="0" /> = 1 és <Binom n="0" k="0" /> = 1.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: Anita sálat köt" badge="Tankönyv 56. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Anita hétszemenként ismétlődő mintát köt: a 7 szemből <strong>3 sima</strong> és <strong>4 fordított</strong> lesz. Hányféle minta közül választhat?
            </p>
            <p>
              Rajzoljunk 7 rekeszt! Olyan ez, mintha kalapból húznánk – csak most a <strong>rekeszek sorszámait</strong> „húzzuk ki”: melyik 3 helyre kerül sima szem. A 3 helyet 7 · 6 · 5-féleképpen jelölhetnénk ki sorban, de ugyanaz a 3 hely 3! sorrendben is kijelölhető, és mind ugyanazt a mintát adja.
            </p>
            <p className="font-bold text-purple-800">
              Mintaszám: 7 · 6 · 5 / 3! = <Binom n={7} k={3} /> = 35.
            </p>
          </div>
          <ScarfPatternSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Kiválasztás, ha nem számít a sorrend" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Az n alatt a k jelentése" badge="Definíció" badgeColor="purple">
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                Ha n különböző elem közül kiválasztunk k darabot (n, k ∈ ℕ⁺, n ≥ k) úgy, hogy minden elemet legfeljebb egyszer választhatunk, és nem számít a kiválasztás sorrendje, akkor a lehetőségek száma <Binom n="n" k="k" />.
              </p>
              <p>
                Az <Binom n="n" k="k" /> kifejezéseket (k, n ∈ ℕ, n ≥ k) <strong>binomiális együtthatóknak</strong> nevezzük. Megadja, hogy egy n elemű halmaznak hány k elemű részhalmaza van.
              </p>
            </div>
          </TheoryCard>
          <TheoryCard title="Mikor nem számít a sorrend?" badge="Megjegyzés" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>részhalmazt választunk ki (pl. melyik 6 tantárgy, melyik 3 lap);</li>
              <li>
                két elemet választunk, és a kapcsolatuk „szimmetrikus” – kézfogás, szakasz két végpontja, mérkőzés, két szám, amelyeknek csak az összege érdekes;
              </li>
              <li>a kiválasztott elemek <strong>ugyanolyan szerepbe</strong> kerülnek (pl. mind riportalany).</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              Az elemeknek lehet sorszámuk (nézőtéri helyek, rekeszek) – ettől még nem számít, milyen sorrendben jelöljük ki őket.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TwoColorRowSvg />
          <TheoryCard title="Kétféle elem sorba rendezése" badge="Elmélet 2." badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              3 egyforma piros és 5 egyforma sárga elemet rendezünk sorba. Minden sorrend egy 8 hosszú sor, amelyben 3 helyen piros áll. A 8 hely közül kell kiválasztani a 3 piros helyét – a kiválasztás sorrendje nem számít:
            </p>
            <p className="text-sm font-bold text-amber-800 mt-2">
              <Binom n={8} k={3} /> = 56. Ugyanennyi, ha a sárgák 5 helyét választjuk: <Binom n={8} k={5} /> = 56, tehát <Binom n={8} k={3} /> = <Binom n={8} k={5} />.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Kiszámítás */}
      <TheorySection title="3. A binomiális együtthatók kiszámítása" badge="Képletek" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="Szorzatos alak" badge="1." badgeColor="teal">
            <p className="text-sm text-slate-700">
              <Binom n={11} k={6} /> = 11 · 10 · 9 · 8 · 7 · 6 / 6! = 332 640 / 720 = <strong>462</strong>
            </p>
            <p className="text-xs text-slate-500 mt-2">A számlálóban k darab, n-től csökkenő tényező; a nevezőben k!.</p>
          </TheoryCard>
          <TheoryCard title="Faktoriálisos alak" badge="2." badgeColor="indigo">
            <p className="text-sm text-slate-700">
              Bővítsünk 5!-sal: <Binom n={11} k={6} /> = 11! / (6! · 5!). Általánosan:
            </p>
            <p className="text-sm font-bold text-indigo-800 mt-1">
              <Binom n="n" k="k" /> = n! / (k! · (n − k)!)
            </p>
          </TheoryCard>
          <TheoryCard title="Számológéppel" badge="3." badgeColor="slate">
            <p className="text-sm text-slate-700">
              Sok számológépen az <strong>nCr</strong> funkció számolja: <Binom n={11} k={6} /> → <span className="font-mono">11 nCr 6</span> = 462.
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Kifejezés', 'Kérdés', 'Érték']}
          rows={[
            [<Binom key="a" n={5} k={0} />, 'Egy 5 elemű halmaznak hány 0 elemű részhalmaza van?', '1 (az üres halmaz)'],
            [<Binom key="b" n="n" k={0} />, 'Egy n elemű halmaznak hány 0 elemű részhalmaza van?', '1'],
            [<Binom key="c" n={0} k={0} />, 'Egy 0 elemű halmaznak hány 0 elemű részhalmaza van?', '1'],
            [<Binom key="d" n="n" k={1} />, 'Hányféleképpen választhatunk ki 1 elemet n közül?', 'n'],
            [<Binom key="e" n="n" k="n" />, 'Hány n elemű részhalmaza van egy n elemű halmaznak?', '1 (maga a halmaz)']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SubsetCountsSvg />
          <TheoryCard title="Szimmetria" badge="Elmélet 4." badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha 11 gyerek közül kiválasztjuk azt a 6-ot, aki kimegy a teremből, ezzel egyúttal kiválasztottuk azt az 5-öt is, aki bent marad. Ezért
            </p>
            <p className="text-sm font-bold text-rose-800 mt-1">
              <Binom n={11} k={6} /> = <Binom n={11} k={5} />, általánosan <Binom n="n" k="k" /> = <Binom n="n" k="n − k" />.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Egy 7 elemű halmaz részhalmazai: 1, 7, 21, 35, 35, 21, 7, 1 – összesen 128 = 2⁷ (minden elemről eldöntjük, benne van-e).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Kamilla órarendje (1. feladat)" badge="Kidolgozott feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>11 tantárgyból hétfőn 6-ból van egy-egy órája.</li>
              <li>
                <strong>a)</strong> Melyik 6 tantárgy? Sorrend nem számít: <Binom n={11} k={6} /> = <strong>462</strong>.
              </li>
              <li>
                <strong>b)</strong> Órarend: a sorrend is számít: 11 · 10 · 9 · 8 · 7 · 6 = <strong>332 640</strong> (= 462 · 6!).
              </li>
              <li>
                <strong>HF 1.</strong> Kedden 5 tantárgy: <Binom n={11} k={5} /> = <Binom n={11} k={6} /> = 462 – ugyanannyi, mert az 5 kiválasztása egyben a kimaradó 6 kiválasztása. Az 5 kiválasztott tárgyból 5! = 120 órarend készíthető, a hétfői 6-ból 6! = 720, tehát kevesebb.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) 7 · 6 vagy 7 · 6 / 2? (2. feladat)" badge="Kidolgozott feladat" badgeColor="emerald">
            <CircleChordsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <Binom n={7} k={2} /> = 21: <strong>A</strong> kézfogás, <strong>C</strong> körmérkőzés, <strong>D</strong> szakaszok, <strong>F</strong> két kártyalap.
              </li>
              <li>
                7 · 6 = 42: <strong>B</strong> SMS (A→B ≠ B→A), <strong>E</strong> titkár és jegyző (két különböző szerep), <strong>G</strong> hajók (A-ról B-re ≠ B-ről A-ra).
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Magyar kártya (4. feladat)" badge="Kidolgozott feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>a)</strong> 32 lapból 3: <Binom n={32} k={3} /> = 32 · 31 · 30 / 6 = <strong>4960</strong>.
              </li>
              <li>
                <strong>b)</strong> A maradék 29 lapból még 2: <Binom n={29} k={2} /> = 29 · 28 / 2 = <strong>406</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Négyjegyű számok egyesekből és kettesekből (5. feladat)" badge="Kidolgozott feladat" badgeColor="purple">
            <p className="text-sm text-slate-700 mb-1">A 4 helyből kiválasztjuk a kettesek helyét (a többi helyre egyes kerül):</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 5 egyes, 1 kettes: 0 vagy 1 kettes ⇒ 1 + 4 = <strong>5</strong></li>
              <li><strong>b)</strong> 4 egyes, 2 kettes: 0, 1 vagy 2 kettes ⇒ 1 + 4 + 6 = <strong>11</strong></li>
              <li><strong>c)</strong> 3 egyes, 3 kettes: 1, 2 vagy 3 kettes ⇒ 4 + 6 + 4 = <strong>14</strong></li>
              <li><strong>d)</strong> 2 egyes, 4 kettes: 2, 3 vagy 4 kettes ⇒ 6 + 4 + 1 = <strong>11</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) A riporter a múzeumban (6. feladat)" badge="Kompetenciamérés 2011" badgeColor="teal">
            <MuseumVisitorsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>a)</strong> 14 órakor bent: (22 + 30 + 35 + 40) − (2 + 10 + 45 + 36) = 127 − 93 = 34 fő ⇒ <Binom n={34} k={3} /> = <strong>5984</strong>.
              </li>
              <li>
                <strong>b)</strong> 15 óra után már senki sem jön be, tehát az utolsó fél órában / záráskor távozók: 164 − 136 = 28 fő ⇒ <Binom n={28} k={4} /> = <strong>20 475</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 2.</strong> 15 színből 4: <Binom n={15} k={4} /> = 1365.</li>
              <li><strong>HF 3.</strong> 6 lila és 3 sárga gyöngy egy sorban: <Binom n={9} k={3} /> = 84.</li>
              <li><strong>3. feladat c)</strong> Egy 7 elemű halmaz összes részhalmaza: 128.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: számít-e a sorrend?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Rendezett és rendezetlen kiválasztás összekeverése"
          wrong="7 ember közül titkár és jegyző: (7 alatt 2) = 21"
          wrongExplanation="A titkár és a jegyző két KÜLÖNBÖZŐ szerep: ha Anna titkár és Béla jegyző, az más eset, mint ha Béla titkár és Anna jegyző. Itt számít a sorrend, nem szabad 2!-sal osztani."
          correct="Titkár és jegyző: 7 · 6 = 42; két egyenrangú küldött: (7 alatt 2) = 21"
          correctExplanation="Akkor osztunk k!-sal, ha a kiválasztott k elem ugyanabba a szerepbe kerül (részhalmazt választunk)."
          tip="Kérdezd meg magadtól: ha felcserélem a kiválasztott két elemet, más esetet kapok? Ha igen, a sorrend számít."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: n alatt a k kalkulátor" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">n (elemek száma): {n}</label>
              <input
                type="range"
                min="1"
                max="20"
                value={n}
                onChange={(e) => changeN(Number(e.target.value))}
                className="w-full accent-purple-600"
                aria-label="n"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">k (kiválasztott elemek): {kk}</label>
              <input
                type="range"
                min="0"
                max={n}
                value={kk}
                onChange={(e) => changeK(Number(e.target.value))}
                className="w-full accent-fuchsia-600"
                aria-label="k"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: n }, (_, i) => (
              <button
                key={i}
                onClick={() => toggleSlot(i)}
                className={`w-9 h-9 rounded-lg text-xs font-bold border-2 transition ${
                  picked.includes(i) ? 'bg-purple-600 border-purple-800 text-white' : 'bg-white border-purple-200 text-purple-700'
                }`}
                aria-label={`${i + 1}. hely`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={randomPick}
              className="px-3 h-9 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
            >
              Véletlen kiválasztás
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Kijelölve: {picked.length} hely {picked.length === kk ? '– ez egy a lehetséges kiválasztások közül.' : `(pontosan ${kk} helyet jelölj ki).`}
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm font-mono text-slate-700 space-y-1">
            <div>
              Sorrenddel (rendezett): {kk === 0 ? '1 (üres szorzat)' : `${ordered.join(' · ')} = ${fmtInt(orderedValue)}`}
            </div>
            <div>
              Osztva k!-sal: {fmtInt(orderedValue)} / {kk}! = {fmtInt(orderedValue)} / {fmtInt(fact(kk))}
            </div>
            <div className="text-base text-purple-800">
              <Binom n={n} k={kk} /> = <strong>{fmtInt(value)}</strong> = <Binom n={n} k={n - kk} />
            </div>
            <div className="text-xs text-slate-500">
              Faktoriálisokkal: {n}! / ({kk}! · {n - kk}!) • számológépen: {n} nCr {kk}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Sálminta (7, 3)', v: [7, 3] },
              { name: 'Piros-sárga (8, 3)', v: [8, 3] },
              { name: 'Tantárgyak (11, 6)', v: [11, 6] },
              { name: 'Gyöngyszínek (15, 4)', v: [15, 4] },
              { name: 'Kézfogás (7, 2)', v: [7, 2] }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setN(p.v[0]);
                  changeK(p.v[1]);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Hány k elemű részhalmaz?" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">A halmaz elemszáma n: {row}</label>
            <input
              type="range"
              min="0"
              max="12"
              value={row}
              onChange={(e) => setRow(Number(e.target.value))}
              className="w-full accent-blue-600"
              aria-label="halmaz elemszáma"
            />
          </div>
          <div className="flex items-end gap-1 h-48 border-b-2 border-slate-400 px-1">
            {rowVals.map((v, i) => {
              const active = i === selK;
              const twin = i === mirror && !active;
              return (
                <button
                  key={i}
                  onClick={() => setSel(i)}
                  className="flex-1 flex flex-col items-center justify-end h-full"
                  aria-label={`${i} elemű részhalmazok`}
                >
                  <span className="text-[10px] font-bold text-blue-900 mb-0.5">{v}</span>
                  <span
                    className={`w-full rounded-t ${active ? 'bg-rose-500' : twin ? 'bg-rose-300' : 'bg-blue-500'}`}
                    style={{ height: `${Math.max(4, (v / rowMax) * 150)}px` }}
                  />
                </button>
              );
            })}
          </div>
          <div className="flex gap-1 px-1">
            {rowVals.map((_, i) => (
              <span key={i} className="flex-1 text-center text-[10px] text-slate-500">k={i}</span>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div>
              Kattints egy oszlopra! Kiválasztva: <Binom n={row} k={selK} /> = <strong>{fmtInt(binom(row, selK))}</strong>, a párja a szimmetria miatt{' '}
              <Binom n={row} k={mirror} /> = <strong>{fmtInt(binom(row, mirror))}</strong>.
            </div>
            <div>
              Az összes részhalmaz száma: {rowVals.join(' + ')} = <strong>{fmtInt(2 ** row)} = 2^{row}</strong>
            </div>
          </div>
          <TheoryCallout type="tip" title="Miért 2ⁿ az összeg?">
            Egy részhalmaz megadásához minden elemről eldöntjük, hogy benne van-e (2 lehetőség). Ez n elemre 2 · 2 · … · 2 = 2ⁿ eset – és mindegyik részhalmaznak valahány (0, 1, …, n) eleme van.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default BinomialCoefficientsTheory;
