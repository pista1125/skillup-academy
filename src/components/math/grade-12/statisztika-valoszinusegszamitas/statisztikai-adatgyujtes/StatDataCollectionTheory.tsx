import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { LiteraryDigestSvg, StratifiedSampleSvg, CouponVennSvg, InsuranceTreeSvg, VisitorSharesSvg } from './StatDataCollectionFigures';
import { SFig, SVenn } from './statKit';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

const STRATA = [
  { g: 'Nő', e: 'legf. alapfokú', n: 1927 },
  { g: 'Nő', e: 'szakiskola', n: 1281 },
  { g: 'Nő', e: 'érettségi', n: 2271 },
  { g: 'Nő', e: 'felsőfokú', n: 1121 },
  { g: 'Férfi', e: 'legf. alapfokú', n: 1610 },
  { g: 'Férfi', e: 'szakiskola', n: 1963 },
  { g: 'Férfi', e: 'érettségi', n: 1845 },
  { g: 'Férfi', e: 'felsőfokú', n: 982 }
];
const TOTAL = STRATA.reduce((s, r) => s + r.n, 0); // 13 000

/** Arányos elosztás a legnagyobb maradékok módszerével (az egészrészek összege + a legnagyobb törtrészek). */
const allocate = (weights: number[], n: number) => {
  const tot = weights.reduce((a, b) => a + b, 0);
  const exact = weights.map((w) => (w * n) / tot);
  const base = exact.map(Math.floor);
  let rest = n - base.reduce((a, b) => a + b, 0);
  const order = exact.map((x, i) => ({ i, f: x - Math.floor(x) })).sort((a, b) => b.f - a.f);
  for (const o of order) {
    if (rest <= 0) break;
    base[o.i] += 1;
    rest -= 1;
  }
  return { exact, alloc: base };
};

export const StatDataCollectionTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: reprezentatív minta építő
  const [sampleN, setSampleN] = useState<number>(2000);
  const [biased, setBiased] = useState<boolean>(false);
  // Labor II: Venn-diagram százalékokkal
  const [pA, setPA] = useState<number>(60);
  const [pB, setPB] = useState<number>(25);
  const [pAB, setPAB] = useState<number>(12);
  const [customers, setCustomers] = useState<number>(10000);

  const lab1 = useMemo(() => {
    const weights = STRATA.map((r) => (biased ? (r.e === 'érettségi' || r.e === 'felsőfokú' ? r.n : 0) : r.n));
    return allocate(weights, sampleN);
  }, [sampleN, biased]);
  const highShareSample = (lab1.alloc[3] + lab1.alloc[7]) / sampleN;
  const highSharePop = (1121 + 982) / TOTAL;

  const maxAB = Math.min(pA, pB);
  const minAB = Math.max(0, pA + pB - 100);
  const ab = Math.min(Math.max(pAB, minAB), maxAB);
  const onlyA = pA - ab;
  const onlyB = pB - ab;
  const union = pA + pB - ab;
  const none = 100 - union;

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="statisztikai-adatgyujtes"
      title="1. Statisztikai adatgyűjtés"
      subtitle="Miért tévedett 2,4 millió válasz alapján a Literary Digest? A reprezentatív minta, a rétegek arányai és a valószínűség a mintában."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="teal"
      pdfFilename="12_osztaly_statisztikai_adatgyujtes_tananyag.pdf"
      practiceTitle="Készen állsz az adatgyűjtéses feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — REPREZENTATÍV MINTA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center">
              <span className="font-mono text-base font-black text-teal-900 dark:text-teal-200">
                minta egy osztályából = mintanagyság · (osztály létszáma / teljes sokaság)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Reprezentatív</strong> a minta, ha az adatai megfelelő módon tükrözik a teljes adatsokaságot.
              </li>
              <li>Ha a sokaság egymástól elkülönülő csoportokra (osztályokra) bontható, a csoportok létszámarányai a mintában közelítőleg ugyanazok, mint a sokaságban.</li>
              <li>A minta nagysága is fontos – de egy torzított minta nagyon nagy elemszámmal sem lesz jó.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: a nagy tévedés 1936-ban" badge="Tankönyv 76. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A <strong>Literary Digest</strong> magazin négyévente megbízhatóan előre jelezte az amerikai elnökválasztás eredményét. 1936-ban azonban
              <strong> 2,4 millió</strong> válasz alapján Alfred Landont hozta ki magabiztos (+19%) győztesnek – Franklin D. Roosevelt viszont elsöprő
              fölénnyel (+24%) nyert.
            </p>
            <p>
              A hibához hozzájárult, hogy a saját olvasóikat, valamint az autó- és telefontulajdonosokat kérdezték meg – mindhárom csoportba a vagyonosabb
              amerikaiak tartoztak, így a felmérés <strong>erősen torzított</strong>.
            </p>
            <p>
              Ugyanekkor a <strong>Gallup</strong> cég már egy <strong>50 000 fős reprezentatív minta</strong> alapján pontos becslést adott.
            </p>
          </div>
          <LiteraryDigestSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Reprezentatív minta" badge="Elmélet" badgeColor="indigo">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            A statisztikai adatgyűjtés során gondosan meg kell határozni a <strong>gyűjtés körülményeit</strong>, a <strong>gyűjtés módszertanát</strong> és a
            <strong> kiválasztott mintát</strong>.
          </p>
          <p>
            Akkor mondunk <strong>reprezentatívnak</strong> egy mintavételt, ha a mintához tartozó adatok megfelelő módon tükrözik a teljes adatsokaságot.
          </p>
        </div>
        <TheoryTable
          headers={['Kritérium', 'Mit jelent?', 'Példa']}
          rows={[
            ['arányos csoportok', 'a csoportok (osztályok) létszámarányai a mintában ≈ a sokaságbeli arányok', 'életkor, iskolai végzettség, lakókörnyezet szerint'],
            ['megfelelő mintanagyság', 'túl kicsi mintából nagy a véletlen ingadozás', 'a Gallup 50 000 fős mintája'],
            ['torzításmentes kiválasztás', 'ne csak egy jól elkülönülő csoportból kérdezzünk', 'csak autótulajdonosok ✗']
          ]}
        />
        <TheoryCallout type="info" title="Arányos (rétegzett) minta készítése">
          Ha a sokaság N fős, a minta n fős, és egy osztályba N<sub>i</sub> fő tartozik, akkor a mintában ebből az osztályból n · N<sub>i</sub> / N főt
          kérdezünk meg (egészre kerekítve úgy, hogy az összeg pontosan n legyen).
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <TheoryCard title="A) 2000 fős reprezentatív minta egy város lakosságából" badge="1. feladat" badgeColor="sky">
          <StratifiedSampleSvg className="w-full max-w-[560px] h-auto mx-auto mb-3" />
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>
              A lakosság: 6600 nő + 6400 férfi = <strong>13 000 fő</strong>, 8 osztályban (nem × legmagasabb végzettség).
            </li>
            <li>
              <strong>a)</strong> Minden osztály létszámát megszorozzuk 2000 / 13 000-del: pl. 1963 · 2000 / 13 000 = 302. A kerekített értékek összege 1999,
              ezért az egyik ,46-os értéket (296,46) felfelé kerekítjük: 297.
            </li>
            <li>
              <strong>b)</strong> A teljes lakosságból: P(férfi és szakiskola) = 1963 / 13 000 ≈ <strong>0,151</strong>.
            </li>
            <li>
              <strong>c)</strong> A mintából: 302 / 2000 = <strong>0,151</strong> – a reprezentatív mintában ugyanaz, mint a sokaságban.
            </li>
            <li>
              <strong>d)</strong> Érettségizett nő az is, akinek felsőfokú a legmagasabb végzettsége: (349 + 172) / 2000 = 521 / 2000 ≈ <strong>0,26</strong>.
            </li>
          </ul>
        </TheoryCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="B) Törzsvásárlói kártya és kupon" badge="2. feladat" badgeColor="purple">
            <CouponVennSvg className="w-full max-w-[320px] h-auto mx-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Mindkettő: 12%; csak kártya: 60 − 12 = 48%; csak kupon: 25 − 12 = 13%.</li>
              <li>
                <strong>b)</strong> Valamelyiket használja: 60 + 25 − 12 = 73%, a valószínűség <strong>0,73</strong>.
              </li>
              <li>
                <strong>c)</strong> Egyiket sem: 100 − 73 = 27%, azaz 10 000 vásárlóból kb. <strong>2700 fő</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Baleseti statisztika egy biztosítónál" badge="3. feladat" badgeColor="emerald">
            <InsuranceTreeSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Rendszeres vezető: 72% · 5000 = 3600 fő; nem rendszeres: 1400 fő.</li>
              <li>
                <strong>a)</strong> A nem rendszeres vezetők 9%-a: 0,09 · 1400 = <strong>126 fő</strong>.
              </li>
              <li>
                <strong>b)</strong> Összes baleset: 6% · 5000 = 300, így rendszeres vezető: 300 − 126 = <strong>174 fő</strong>.
              </li>
              <li>
                <strong>c)</strong> A balesetet szenvedettek közül: 174 / 300 = <strong>0,58</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="D) Reprezentatív-e a látogatók 1000 fős mintája?" badge="Házi feladat 1." badgeColor="rose">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <VisitorSharesSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                KSH 2021 (ezer fő): Románia 9260, Szlovákia 6295, Ausztria 5729, Lengyelország 1482, Németország 2488, összesen 25 254. A minta oszlopösszegei: 365,
                250, 226, 60, 99 (összesen 1000).
              </li>
              <li>A nemzetek aránya a mintában (36,5%, 25%, 22,6%, 6%, 9,9%) szinte pontosan a sokaságbeli arány – ebből a szempontból reprezentatív.</li>
              <li>
                A tartózkodás hossza szerint viszont nem: az 1 naposak a sokaság 84,1%-át adják, a mintának csak 74,5%-át.
              </li>
              <li>
                Legfeljebb 3 éjszakát maradók közül német: (1038 + 540) / 23 335 ≈ <strong>0,068</strong>.
              </li>
            </ul>
          </div>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: a nagy minta nem mindig jó minta" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A mintanagyság nem pótolja a reprezentativitást"
          wrong="Minél több embert kérdezünk meg, annál pontosabb az eredmény – akárhonnan is válogatjuk őket."
          wrongExplanation="A Literary Digest 2,4 millió választ gyűjtött, mégis tévedett, mert a megkérdezettek csoportjai (olvasók, autó- és telefontulajdonosok) nem tükrözték a választók összetételét."
          correct="Előbb a kiválasztás legyen torzításmentes és arányos, csak utána számít a nagyobb elemszám."
          correctExplanation="A Gallup 50 000 fős, de reprezentatív mintája pontosabb volt, mint a 2,4 milliós torzított minta."
          tip="Ha a „legmagasabb végzettség” szerint osztályozunk, az érettségizettek közé a felsőfokú végzettségűek is beletartoznak – figyeld a kérdés pontos szövegét!"
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: Reprezentatív minta építő" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">A minta nagysága: n = {sampleN} fő</label>
              <input type="range" min="100" max="5000" step="100" value={sampleN} onChange={(e) => setSampleN(Number(e.target.value))} className="w-full accent-teal-600" aria-label="mintanagyság" />
            </div>
            <div className="flex flex-wrap gap-2 items-end">
              <button onClick={() => setBiased(false)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!biased ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                arányos (rétegzett) minta
              </button>
              <button onClick={() => setBiased(true)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${biased ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                torzított: csak az egyetemi könyvtár előtt kérdezünk
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-teal-50">
                  <th className="border border-slate-200 p-1.5">osztály</th>
                  <th className="border border-slate-200 p-1.5">lakosság</th>
                  <th className="border border-slate-200 p-1.5">arány</th>
                  <th className="border border-slate-200 p-1.5">pontos érték</th>
                  <th className="border border-slate-200 p-1.5">a mintában (fő)</th>
                </tr>
              </thead>
              <tbody>
                {STRATA.map((r, i) => (
                  <tr key={i}>
                    <td className="border border-slate-200 p-1.5 text-left">
                      {r.g}, {r.e}
                    </td>
                    <td className="border border-slate-200 p-1.5">{r.n}</td>
                    <td className="border border-slate-200 p-1.5">{fmt((100 * r.n) / TOTAL, 1)}%</td>
                    <td className="border border-slate-200 p-1.5">{fmt(lab1.exact[i], 2)}</td>
                    <td className={`border border-slate-200 p-1.5 font-black ${lab1.alloc[i] === 0 ? 'text-rose-600' : 'text-teal-800'}`}>{lab1.alloc[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
            <div className="bg-teal-50 rounded-xl p-2 border border-teal-200">
              <div className="text-[11px] text-slate-500">a minta összesen</div>
              <div className="font-mono font-black text-teal-900">{lab1.alloc.reduce((a, b) => a + b, 0)} fő</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-2 border border-teal-200">
              <div className="text-[11px] text-slate-500">felsőfokú aránya a lakosságban</div>
              <div className="font-mono font-black text-teal-900">{fmt(100 * highSharePop, 1)}%</div>
            </div>
            <div className={`rounded-xl p-2 border ${biased ? 'bg-rose-50 border-rose-200' : 'bg-teal-50 border-teal-200'}`}>
              <div className="text-[11px] text-slate-500">felsőfokú aránya a mintában</div>
              <div className={`font-mono font-black ${biased ? 'text-rose-700' : 'text-teal-900'}`}>{fmt(100 * highShareSample, 1)}%</div>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            {biased
              ? 'A torzított mintában az alapfokú és szakiskolai végzettségűek egyáltalán nem szerepelnek – akármekkora n mellett sem lesz reprezentatív a minta.'
              : 'Kerekítés: az egészrészek után a legnagyobb törtrészű osztályok kapnak +1 főt, így az összeg pontosan n. Az arányok minden n mellett megmaradnak.'}
          </p>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: Két szempont egy Venn-diagramon" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Van törzsvásárlói kártyája (A): {pA}%</label>
                <input type="range" min="0" max="100" value={pA} onChange={(e) => setPA(Number(e.target.value))} className="w-full accent-blue-600" aria-label="A aránya" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Használja a kuponokat (B): {pB}%</label>
                <input type="range" min="0" max="100" value={pB} onChange={(e) => setPB(Number(e.target.value))} className="w-full accent-amber-600" aria-label="B aránya" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Mindkettő (A · B): {ab}% <span className="text-slate-400">(lehetséges: {minAB}–{maxAB}%)</span>
                </label>
                <input type="range" min={minAB} max={maxAB} value={ab} onChange={(e) => setPAB(Number(e.target.value))} className="w-full accent-purple-600" aria-label="A és B aránya" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A vásárlók száma</label>
                <input
                  type="number"
                  min={0}
                  value={customers}
                  onChange={(e) => setCustomers(Math.max(0, Number(e.target.value) || 0))}
                  className="w-40 border border-slate-300 rounded-lg px-2 py-1 text-sm"
                  aria-label="vásárlók száma"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-purple-50 rounded-xl p-2 border border-purple-200">
                  <div className="text-[11px] text-slate-500">valamelyiket: P(A + B)</div>
                  <div className="font-mono font-black text-purple-900">{fmt(union / 100, 2)}</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-2 border border-purple-200">
                  <div className="text-[11px] text-slate-500">egyiket sem</div>
                  <div className="font-mono font-black text-purple-900">
                    {none}% ≈ {Math.round((customers * none) / 100)} fő
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600">P(A + B) = P(A) + P(B) − P(A · B): a metszetet kétszer számolnánk, ezért egyszer levonjuk.</p>
            </div>
            <SFig w={240} h={170} className="w-full max-w-[340px] h-auto mx-auto">
              <SVenn onlyA={`${onlyA}%`} both={`${ab}%`} onlyB={`${onlyB}%`} none={`${none}%`} labelA={`A: kártya (${pA}%)`} labelB={`B: kupon (${pB}%)`} labelU="vásárlók" cy={88} />
            </SFig>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatDataCollectionTheory;
