import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  PrizeCasesSvg,
  RookBoardSvg,
  FlagStripesSvg,
  DiceTargetSvg,
  TigerEnclosuresSvg
} from './CaseAnalysisFigures';

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};
const fmtInt = (x: number) => x.toLocaleString('hu-HU');
const fmtDec = (x: number, d = 2) => x.toFixed(d).replace('.', ',');

type PrizeCase = { label: string; calc: string; value: number };

/** Egyforma jutalmak szétosztása n diák között: esetek aszerint, ki hány jutalmat kap. */
const prizeCases = (n: number, r: number): PrizeCase[] => {
  if (r === 2)
    return [
      { label: 'egy diák kapja mindkettőt', calc: `${n}`, value: n },
      { label: 'két diák 1-1-et', calc: `(${n} alatt 2)`, value: binom(n, 2) }
    ];
  if (r === 3)
    return [
      { label: 'egy diák kapja mind a 3-at', calc: `${n}`, value: n },
      { label: 'egy diák 2-t, egy másik 1-et', calc: `${n} · ${n - 1}`, value: n * (n - 1) },
      { label: 'három diák 1-1-et', calc: `(${n} alatt 3)`, value: binom(n, 3) }
    ];
  return [
    { label: 'egy diák kapja mind a 4-et', calc: `${n}`, value: n },
    { label: 'egy diák 3-at, egy másik 1-et', calc: `${n} · ${n - 1}`, value: n * (n - 1) },
    { label: 'két diák 2-2-t', calc: `(${n} alatt 2)`, value: binom(n, 2) },
    { label: 'egy diák 2-t, két másik 1-1-et', calc: `${n} · (${n - 1} alatt 2)`, value: n * binom(n - 1, 2) },
    { label: 'négy diák 1-1-et', calc: `(${n} alatt 4)`, value: binom(n, 4) }
  ];
};

export const CaseAnalysisTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: egyforma jutalmak
  const [students, setStudents] = useState<number>(12);
  const [prizes, setPrizes] = useState<number>(3);

  // Labor II: dobássorozatok
  const [throws, setThrows] = useState<number>(4);
  const [target, setTarget] = useState<number>(22);

  const cases = prizeCases(students, prizes);
  const caseSum = cases.reduce((a, c) => a + c.value, 0);
  const naive = students ** prizes;
  const naiveDiv = naive / [1, 1, 2, 6, 24][prizes];

  const dice = useMemo(() => {
    // dist[s] = hány dobássorozat összege s
    let dist: number[] = [1];
    for (let t = 0; t < throws; t++) {
      const next = new Array(dist.length + 6).fill(0);
      dist.forEach((cnt, s) => {
        for (let v = 1; v <= 6; v++) next[s + v] += cnt;
      });
      dist = next;
    }
    return dist;
  }, [throws]);
  const maxSum = 6 * throws;
  const tEff = Math.min(target, maxSum + 1);
  const goodRows = [] as { s: number; c: number }[];
  for (let s = Math.max(tEff, throws); s <= maxSum; s++) goodRows.push({ s, c: dice[s] });
  const good = goodRows.reduce((a, r) => a + r.c, 0);
  const all = 6 ** throws;

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="esetszetvalasztas"
      title="6. Esetszétválasztás"
      subtitle="Ha egyetlen képlet nem ad helyes választ, bontsuk a feladatot egymást kizáró esetekre, számoljuk meg mindegyiket, és adjuk össze!"
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="teal"
      pdfFilename="11_osztaly_esetszetvalasztas_tananyag.pdf"
      practiceTitle="Készen állsz az esetszétválasztásos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — VÁLASSZUK KÜLÖN AZ ESETEKET!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-base font-black text-teal-900 dark:text-teal-200">
              összes lehetőség = 1. eset + 2. eset + … + utolsó eset
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az eseteknek <strong>egymást kizárónak</strong> kell lenniük (egyszerre nem következhetnek be), és együtt le kell fedniük <strong>minden</strong> lehetőséget.</li>
              <li>Egy-egy eseten belül már a megszokott módszerekkel számolunk (szorzás, n!, (n alatt k)).</li>
              <li>Néha egyszerűbb a <strong>komplementer</strong>: az összes esetből vonjuk ki a rosszakat (pl. 4! − 3! = 18).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: 3 egyforma jutalom 12 diák között" badge="Tankönyv 64. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Hányféleképpen osztható ki 3 egyforma jutalom 12 diák között, ha egy diák akár több jutalmat is kaphat?
            </p>
            <p>
              <strong>Nem célravezető:</strong> mindhárom jutalmat 12-féleképpen oszthatjuk ki (12³), de mivel a jutalmak egyformák, egyes eseteket többször számoltunk – ráadásul nem ugyanannyiszor! A „mindhármat más kapja” esetet 3! = 6-szor, a többit kevesebbszer, ezért nem oszthatunk egyetlen számmal.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>1. eset:</strong> mindegyik jutalmat ugyanaz kapja: <strong>12</strong>.</li>
              <li>
                <strong>2. eset:</strong> egy diák egyet, egy másik kettőt kap: 12 · 11 = <strong>132</strong> (a két diák különböző módon jutalmazott, ezért számít a sorrendjük).
              </li>
              <li><strong>3. eset:</strong> három diák kap 1-1 jutalmat: (12 alatt 3) = <strong>220</strong>.</li>
            </ul>
            <p className="font-bold text-teal-800">Az esetek egyszerre nem következhetnek be: 12 + 132 + 220 = 364.</p>
          </div>
          <PrizeCasesSvg />
        </div>
      </TheorySection>

      {/* 2. Módszer */}
      <TheorySection title="2. Az esetszétválasztás módszere" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="1. Szempont választása" badge="Lépés" badgeColor="teal">
            <p className="text-sm text-slate-700">
              Keressünk egy tulajdonságot, amely szerint az esetek tisztán szétválnak: ki hány jutalmat kap; milyen színű a felső sáv; mennyi a dobások összege; hány tigris kerül a kisebb kifutóba.
            </p>
          </TheoryCard>
          <TheoryCard title="2. Esetenként számolunk" badge="Lépés" badgeColor="sky">
            <p className="text-sm text-slate-700">
              Minden eseten belül egyszerűbb a feladat: itt már szorzunk, sorba rendezünk vagy kiválasztunk. Figyeljünk, hogy egy eseten belül számít-e a sorrend!
            </p>
          </TheoryCard>
          <TheoryCard title="3. Összeadjuk" badge="Lépés" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Ha az esetek kizárják egymást és lefedik az összes lehetőséget, a végeredmény az esetszámok összege. Ellenőrizzük: nincs-e kimaradt vagy kétszer számolt eset?
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Komplementer: amikor a rossz eseteket könnyebb megszámolni">
          A gyorsváltó-feladatban (5. a) 4 csapat 4! = 24 sorrendje közül azokban rossz a sorrend, amelyekben a Delfinek a negyedikek: 3! = 6. A jó sorrendek száma 24 − 6 = <strong>18</strong>. Ez is esetszétválasztás: az összes eset = jó esetek + rossz esetek.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Feladatok */}
      <TheorySection title="3. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Bástyák a 3 × 3-as táblán (1. feladat)" badge="Feladat" badgeColor="amber">
            <RookBoardSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> A fehér bástya 9 mezőre kerülhet; sorát és oszlopát kizárva a feketének 4 mező marad: 9 · 4 = <strong>36</strong>.</li>
              <li><strong>b)</strong> Két egyforma bástyánál minden elhelyezést kétszer számoltunk: 36 / 2 = <strong>18</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A 3 sávos zászló (2. feladat)" badge="Feladat" badgeColor="rose">
            <FlagStripesSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>Felül piros:</strong> középre 3 szín (nem piros), alulra 2 (nem piros, nem a középső): 3 · 2 = 6.</li>
              <li><strong>Felül nem piros:</strong> felülre 3, középre 2 (nem piros, nem a felső), alulra 2: 3 · 2 · 2 = 12.</li>
              <li>Összesen <strong>18</strong> zászló.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Célba érés 4 dobással (4. feladat)" badge="Feladat" badgeColor="teal">
            <DiceTargetSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              A 4 dobás összege legalább 22, legfeljebb 24 lehet. Esetek az összeg szerint: 24 → 1; 23 → 4; 22 → 4 + 6 = 10. Összesen <strong>15</strong> dobássorozat.
            </p>
          </TheoryCard>
          <TheoryCard title="D) A 4 × 100-as gyorsváltó (5. feladat)" badge="Érettségi 2005" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> A Delfinek nem negyedikek: 4! − 3! = 24 − 6 = <strong>18</strong> (vagy: a Delfinek helye 3-féle, a többieké 3! ⇒ 3 · 6 = 18).</li>
              <li>
                <strong>b)</strong> Az élen kettős holtverseny (a többiek nem holtversenyben): az élen állók (4 alatt 2) = 6-féle pár, a 3. és 4. hely 2-féle ⇒ 12 lista. Ebből rossz, ahol a Delfinek utolsók: (3 alatt 2) = 3. Marad <strong>9</strong> eredménylista.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Tigrisek a kifutókban (6. feladat)" badge="Érettségi 2015" badgeColor="orange">
            <TigerEnclosuresSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A feltételek miatt csak 3 + 6 vagy 4 + 5 lehet a felosztás (kisebb + nagyobb).</li>
              <li><strong>3 + 6:</strong> kisebben 1 hím és 2 nőstény: (4 alatt 1) · (5 alatt 2) = 4 · 10 = 40.</li>
              <li><strong>4 + 5:</strong> kisebben 2 hím és 2 nőstény: (4 alatt 2) · (5 alatt 2) = 6 · 10 = 60.</li>
              <li>Összesen <strong>100</strong> elhelyezés.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> 3 egyforma csoki 10 főnek: a) 10; b) ketten nyernek: 10 · 9 = 90; c) (10 alatt 3) = 120; d) 10 + 90 + 120 = 220.</li>
              <li><strong>HF 2.</strong> Négyjegyű, 5-tel osztható, különböző számjegyek: 0-ra végződik 9 · 8 · 7 = 504, 5-re végződik 8 · 8 · 7 = 448 ⇒ <strong>952</strong>.</li>
              <li>
                <strong>HF 3.</strong> Párok: A–H = 84; B–I = 125; D–F = 120; E–G = 720. A C) (15 + 20 = 35) párja hiányzik, pl. J) „Hányféleképpen választhatunk ki 7 emberből 3-at?” – (7 alatt 3) = 35.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Feladat', 'Szétválasztás szempontja', 'Esetek', 'Eredmény']}
          rows={[
            ['3 jutalom, 12 diák', 'ki hány jutalmat kap', '12 + 132 + 220', '364'],
            ['zászló', 'a felső sáv piros-e', '6 + 12', '18'],
            ['4 dobás, ≥ 22', 'a dobások összege', '1 + 4 + 10', '15'],
            ['tigrisek', 'hány tigris kerül a kisebb kifutóba', '40 + 60', '100'],
            ['HF 2. (5-tel osztható)', 'az utolsó számjegy 0 vagy 5', '504 + 448', '952']
          ]}
        />
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: osztás egy közös számmal" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Egyforma jutalmak: 12³ / 3! nem jó!"
          wrong="12³ / 3! = 1728 / 6 = 288 lehetőség"
          wrongExplanation="Az osztás csak akkor helyes, ha MINDEN esetet ugyanannyiszor számoltunk. Itt a „három különböző diák” esetet 6-szor, az „egy diák 2-t, más 1-et” esetet 3-szor, a „mindet egy diák” esetet csak 1-szer – ezért egyetlen osztó nem javítja ki a hibát."
          correct="12 + 132 + 220 = 364 lehetőség"
          correctExplanation="Szétválasztjuk az eseteket aszerint, ki hány jutalmat kap, és mindegyiket külön számoljuk. Ellenőrzés: 12 · 1 + 132 · 3 + 220 · 6 = 1728 = 12³."
          tip="Ha nem minden elrendezés ugyanannyiszor szerepel a „túlszámolt” eredményben, válassz esetszétválasztást!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Egyforma jutalmak szétosztása" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">diákok száma: {students}</label>
              <input type="range" min="4" max="20" value={students} onChange={(e) => setStudents(Number(e.target.value))} className="w-full accent-teal-600" aria-label="diákok száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">egyforma jutalmak száma</label>
              <div className="flex gap-2">
                {[2, 3, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrizes(p)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold ${prizes === p ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-800 hover:bg-teal-100'}`}
                  >
                    {p} jutalom
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-teal-50 text-teal-900">
                <tr>
                  <th className="p-2 text-left">Eset</th>
                  <th className="p-2 text-left">Számolás</th>
                  <th className="p-2 text-right">Lehetőség</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c, i) => (
                  <tr key={c.label} className="border-t border-slate-200">
                    <td className="p-2">{i + 1}. {c.label}</td>
                    <td className="p-2 font-mono">{c.calc}</td>
                    <td className="p-2 text-right font-bold">{fmtInt(c.value)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-teal-300 bg-teal-50">
                  <td className="p-2 font-bold" colSpan={2}>Összesen (az esetek kizárják egymást)</td>
                  <td className="p-2 text-right font-black text-teal-800">{fmtInt(caseSum)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 p-3 text-sm text-rose-900">
            Hibás „gyors” módszer: {students}^{prizes} / {prizes}! = {fmtInt(naive)} / {[1, 1, 2, 6, 24][prizes]} ≈ {fmtDec(naiveDiv)} – {Number.isInteger(naiveDiv) ? 'egész szám, mégsem a helyes eredmény' : 'nem is egész szám'}!
          </div>
          <p className="text-xs text-slate-500">
            A 12 diák, 3 jutalom beállítás a tankönyvi kidolgozott feladat (364); 10 fő és 3 csoki a HF 1. d) (220).
          </p>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Célba érünk-e a dobásokkal?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">dobások száma: {throws}</label>
              <input type="range" min="1" max="5" value={throws} onChange={(e) => setThrows(Number(e.target.value))} className="w-full accent-purple-600" aria-label="dobások száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">lépések a célig: {target}</label>
              <input type="range" min="1" max="30" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="lépések a célig" />
            </div>
          </div>
          <button
            onClick={() => {
              setThrows(4);
              setTarget(22);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
          >
            Tankönyvi feladat: 4 dobás, 22 lépés
          </button>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-2">
            {target > maxSum ? (
              <div className="font-bold text-rose-700">{throws} dobással legfeljebb {maxSum} lépés tehető meg – nem lehet célba érni.</div>
            ) : (
              <>
                <div>Esetek a dobások összege szerint (legalább {target}):</div>
                <div className="flex flex-wrap gap-2">
                  {goodRows.map((r) => (
                    <span key={r.s} className="px-2 py-1 rounded-lg bg-purple-100 text-purple-900 text-xs font-bold">
                      összeg {r.s}: {fmtInt(r.c)}
                    </span>
                  ))}
                </div>
                <div>
                  Kedvező dobássorozatok: {goodRows.length > 6 ? `${goodRows.length} eset összege` : goodRows.map((r) => fmtInt(r.c)).join(' + ')} = <strong>{fmtInt(good)}</strong>
                </div>
                <div className="text-xs text-slate-500">
                  Ellenőrzés komplementerrel: 6^{throws} = {fmtInt(all)} összes sorozat − {fmtInt(all - good)} rossz = {fmtInt(good)}.
                </div>
              </>
            )}
          </div>
          <TheoryCallout type="tip" title="Melyik az ügyesebb út?">
            Ha a cél közel van a maximumhoz (pl. 22 a 24-ből), kevés a kedvező eset – ezeket érdemes közvetlenül, összeg szerint szétválasztva megszámolni. Ha a cél kicsi, kevés a rossz eset – ekkor a komplementer a gyorsabb.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CaseAnalysisTheory;
