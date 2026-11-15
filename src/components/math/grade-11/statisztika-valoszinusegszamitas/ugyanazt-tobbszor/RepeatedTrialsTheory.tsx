import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  RepeatedTrialsPenaltySvg,
  RepeatedTrialsChainSvg,
  RepeatedTrialsExactlyOnceSvg,
  RepeatedTrialsSnakeTreeSvg,
  RepeatedTrialsFirstSixSvg
} from './RepeatedTrialsFigures';

/** Magyar formátum: tizedesvessző, legfeljebb `d` tizedesjegy. */
const fmt = (x: number, d = 4): string => {
  if (!Number.isFinite(x)) return '–';
  if (x !== 0 && Math.abs(x) < Math.pow(10, -d)) return x.toExponential(2).replace('.', ',');
  const r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
  return r.toLocaleString('hu-HU', { maximumFractionDigits: d });
};

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};

const P_PRESETS: { name: string; p: number }[] = [
  { name: 'Özséb tizenegyese (0,7)', p: 0.7 },
  { name: 'Kató kosárra dob (0,6)', p: 0.6 },
  { name: 'kígyómarás (0,8)', p: 0.8 },
  { name: 'pénzérme fej (0,5)', p: 0.5 },
  { name: 'kocka hatos (1/6)', p: 1 / 6 },
  { name: 'selejtes termék (0,05)', p: 0.05 }
];

const Sup: React.FC<{ children: React.ReactNode }> = ({ children }) => <sup className="text-[0.7em]">{children}</sup>;

export const RepeatedTrialsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: valószínűségi fagráf
  const [treeN, setTreeN] = useState<number>(3);
  const [treeP, setTreeP] = useState<number>(0.8);
  const [treeK, setTreeK] = useState<number>(2);
  const k = Math.min(treeK, treeN);
  const leaves = useMemo(() => {
    const out: { path: boolean[]; prob: number; hits: number }[] = [];
    const total = 1 << treeN;
    for (let m = 0; m < total; m++) {
      const path = Array.from({ length: treeN }, (_, i) => ((m >> (treeN - 1 - i)) & 1) === 0);
      const hits = path.filter(Boolean).length;
      out.push({ path, prob: Math.pow(treeP, hits) * Math.pow(1 - treeP, treeN - hits), hits });
    }
    return out;
  }, [treeN, treeP]);
  const byHits = Array.from({ length: treeN + 1 }, (_, h) => leaves.filter((l) => l.hits === h).reduce((s, l) => s + l.prob, 0));
  const selCount = leaves.filter((l) => l.hits === k).length;

  // Labor II: n-szeres ismétlés eloszlása
  const [n, setN] = useState<number>(5);
  const [p, setP] = useState<number>(0.6);
  const dist = useMemo(() => Array.from({ length: n + 1 }, (_, j) => binom(n, j) * Math.pow(p, j) * Math.pow(1 - p, n - j)), [n, p]);
  const maxP = Math.max(...dist, 1e-9);
  const pAll = Math.pow(p, n);
  const pNone = Math.pow(1 - p, n);
  const pOnlyFirst = p * Math.pow(1 - p, n - 1);
  const pOnce = n * pOnlyFirst;
  const mode = dist.indexOf(maxP);

  // fagráf rajzolása
  const W = 560;
  const levelGap = treeN === 1 ? 120 : treeN === 2 ? 80 : 62;
  const treeH = 30 + treeN * levelGap + 60;
  const leafCount = 1 << treeN;
  const leafX = (i: number) => 30 + ((i + 0.5) * (W - 60)) / leafCount;
  const nodeX = (lvl: number, i: number) => {
    const span = 1 << (treeN - lvl);
    return (leafX(i * span) + leafX(i * span + span - 1)) / 2;
  };

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="ugyanazt-tobbszor"
      title="12. Ugyanazt többször"
      subtitle="Független kísérletek ismétlése: ha minden alkalommal ugyanaz a valószínűség, a lépések valószínűségét összeszorozzuk."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_ugyanazt_tobbszor_tananyag.pdf"
      practiceTitle="Készen állsz az ismételt kísérletekre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — FÜGGETLEN KÍSÉRLETEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              „és” egymás után → szorzás;  „vagy” (kizáró esetek) → összeadás
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Az esemény valószínűsége minden kísérletben <strong>p</strong>, annak valószínűsége, hogy nem következik be: <strong>1 − p</strong>.
              </li>
              <li>
                n kísérletből mindegyikben bekövetkezik: <strong>p<Sup>n</Sup></strong>; egyikben sem: <strong>(1 − p)<Sup>n</Sup></strong>.
              </li>
              <li>
                Csak az elsőben következik be: <strong>p · (1 − p)<Sup>n − 1</Sup></strong>; pontosan egyszer: <strong>n · p · (1 − p)<Sup>n − 1</Sup></strong>.
              </li>
              <li>Feltétel: a kísérletek függetlenek, egyik kimenetele sincs hatással a következőre.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: Özséb két tizenegyese" badge="Tankönyv 192. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Özséb 10 tizenegyesből átlagosan 7-et rúg be, ezért úgy modellezzük, hogy minden rúgása az előzőktől <strong>függetlenül</strong> 0,7 valószínűséggel megy be (és 0,3 valószínűséggel nem). Két tizenegyest rúg.
            </p>
            <p>
              <strong>a)</strong> Mindkettő bemegy: 0,7 · 0,7 = <strong>0,49</strong>.
            </p>
            <p>
              <strong>b)</strong> Az első bemegy, a második nem: 0,7 · 0,3 = <strong>0,21</strong>.
            </p>
            <p>
              <strong>c)</strong> Egyik bemegy, a másik nem – ez kétféleképpen fordulhat elő: első be, második nem (0,21), <em>vagy</em> első nem, második be (0,3 · 0,7 = 0,21). A két eset kizárja egymást, ezért összeadjuk: <strong>0,42</strong>.
            </p>
            <p>
              <strong>d)</strong> Egyik sem megy be: 0,3 · 0,3 = <strong>0,09</strong>.
            </p>
            <TheoryCallout type="tip" title="Ellenőrzés">
              Az a), c) és d) esetek minden lehetőséget pontosan egyszer tartalmaznak, ezért 0,49 + 0,42 + 0,09 = 1.
            </TheoryCallout>
          </div>
          <RepeatedTrialsPenaltySvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: ugyanaz a kísérlet, ugyanaz a valószínűség" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha ugyanazt a kísérletet többször egymás után megismételjük, feltehető, hogy a korábbi kísérletek eredménye nincs hatással a következőre: a kísérletek <strong>függetlenek</strong>. Ilyen például:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>kockával dobunk többször egymás után;</li>
              <li>egy gép állandó hibaszázalékkal dolgozik;</li>
              <li>valaki mindig ugyanolyan valószínűséggel végez el egy tevékenységet.</li>
            </ul>
            <p>
              Ekkor minden alkalommal ugyanaz egy konkrét esemény valószínűsége: bekövetkezik <strong>p</strong>, nem következik be <strong>1 − p</strong> valószínűséggel.
            </p>
            <TheoryTable
              headers={['Kérdés', 'Valószínűség']}
              rows={[
                ['n-szer ismételve minden alkalommal bekövetkezik', <span key="a" className="font-mono">p · p · … · p = p<Sup>n</Sup></span>],
                ['egyik alkalommal sem következik be', <span key="b" className="font-mono">(1 − p)<Sup>n</Sup></span>],
                ['csak az első alkalommal következik be', <span key="c" className="font-mono">p · (1 − p)<Sup>n − 1</Sup></span>],
                ['pontosan egyszer következik be', <span key="d" className="font-mono">n · p · (1 − p)<Sup>n − 1</Sup></span>]
              ]}
            />
          </div>
          <div className="space-y-4">
            <RepeatedTrialsChainSvg />
            <RepeatedTrialsExactlyOnceSvg />
          </div>
        </div>
      </TheorySection>

      {/* 3. Megjegyzés */}
      <TheorySection title="3. Mi az újdonság?" badge="Megjegyzés" badgeColor="teal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Nem esetszámlálással számolunk" badge="Új módszer" badgeColor="teal">
            <p className="text-sm text-slate-700">
              Eddig a valószínűséget a „kedvező esetek száma / összes eset száma” képlettel kaptuk. Most azt használjuk ki, hogy az egyes lépésekben <strong>külön-külön ismerjük</strong> az események valószínűségét, és ezeket szorozzuk össze.
            </p>
          </TheoryCard>
          <TheoryCard title="Fontos feltétel: függetlenség" badge="Feltétel" badgeColor="amber">
            <p className="text-sm text-slate-700">
              A lépések kimenetele nem hathat a következőre. Ez nem teljesül, ha <strong>visszatevés nélkül</strong> húzunk néhány elem közül (lásd a 11. leckét): ott minden lépésben változik a valószínűség. A tizenegyesrúgásoknál pedig a függetlenség csak egy egyszerűsített matematikai modell.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Tankönyvi feladatok */}
      <TheorySection title="4. Tankönyvi feladatok" badge="Tankönyv 193. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. feladat: Kató ötször dob kosárra (p = 0,6)" badge="Feladat" badgeColor="amber">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                a) mindegyiket bedobja: 0,6<Sup>5</Sup> = <strong>0,07776</strong>
              </li>
              <li>
                b) egyiket sem dobja be: 0,4<Sup>5</Sup> = <strong>0,01024</strong>
              </li>
              <li>
                c) csak az elsőt dobja be: 0,6 · 0,4<Sup>4</Sup> = <strong>0,01536</strong>
              </li>
              <li>
                d) pontosan egyet dob be: 5 · 0,6 · 0,4<Sup>4</Sup> = <strong>0,0768</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. feladat: kockával háromszor dobunk" badge="Feladat" badgeColor="sky">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                a) mindhárom hatos: (1/6)<Sup>3</Sup> = <strong>1/216 ≈ 0,0046</strong>
              </li>
              <li>
                b) csak az első hatos: 1/6 · (5/6)<Sup>2</Sup> = <strong>25/216 ≈ 0,1157</strong>
              </li>
              <li>
                c) pontosan egy hatos: 3 · 25/216 = <strong>75/216 = 25/72 ≈ 0,3472</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. feladat: hibás gép, 20 termék (p = 0,05)" badge="Feladat" badgeColor="rose">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                a) mind selejtes: 0,05<Sup>20</Sup> ≈ 9,5 · 10<Sup>−27</Sup> (gyakorlatilag 0)
              </li>
              <li>
                b) nincs selejtes: 0,95<Sup>20</Sup> ≈ <strong>0,3585</strong>
              </li>
              <li>
                c), d) csak a 2. (illetve csak a 3.) selejtes: 0,05 · 0,95<Sup>19</Sup> ≈ <strong>0,0189</strong>
              </li>
              <li>
                e) pontosan egy selejtes: 20 · 0,05 · 0,95<Sup>19</Sup> ≈ <strong>0,3774</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. feladat: mikor jön az első hatos?" badge="Feladat" badgeColor="emerald">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                ötödikre az első hatos: (5/6)<Sup>4</Sup> · 1/6 ≈ 0,0804
              </li>
              <li>
                a) elsőre hatos: 1/6 ≈ 0,167 &gt; második az első hatos: 5/6 · 1/6 = 5/36 ≈ 0,139 → <strong>az elsőre dobott hatos valószínűbb</strong>
              </li>
              <li>
                b) a 4. dobás először kisebb 5-nél (p = 4/6 = 2/3): (1/3)<Sup>3</Sup> · 2/3 = <strong>2/81 ≈ 0,0247</strong>
              </li>
              <li>
                c) az 5. dobás először osztója 5-nek (1 vagy 5, p = 1/3): (2/3)<Sup>4</Sup> · 1/3 = <strong>16/243 ≈ 0,0658</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. feladat: szerencsekerék visszafelé" badge="Feladat" badgeColor="violet">
            <p className="text-sm text-slate-700">
              Ha a NYERT valószínűsége p, akkor „egyik NYERT, másik NEM NYERT”: 2 · p · (1 − p) = 0,48, azaz p − p<Sup>2</Sup> = 0,24, p<Sup>2</Sup> − p + 0,24 = 0. Megoldásai: <strong>p = 0,6 vagy p = 0,4</strong> – a feltételekből mindkettő lehetséges.
            </p>
          </TheoryCard>
          <TheoryCard title="Házi feladatok" badge="Házi" badgeColor="slate">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                1. Négy kockadobás: egyik sem hatos (5/6)<Sup>4</Sup> ≈ 0,4823; csak az első (vagy csak a második) hatos 125/1296 ≈ 0,0965; pontosan egy hatos 500/1296 ≈ 0,3858.
              </li>
              <li>
                2. A harmadik dobás az első hatos: (5/6)<Sup>2</Sup> · 1/6 = 25/216 ≈ 0,1157.
              </li>
              <li>
                3. Érme 8-szor: mind fej = mind írás = 1/256; pontosan egy fej = pontosan egy írás = 8/256 = 1/32.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <div className="mt-4">
          <RepeatedTrialsFirstSixSvg />
        </div>
      </TheorySection>

      {/* 5. Ráadás: fagráf */}
      <TheorySection title="5. Ráadás: valószínűségi feladatok megoldása gráf segítségével" badge="Tankönyv 195. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy számítógépes játékban a kígyós mezőre lépő játékost a kígyó 0,8 valószínűséggel megmarja. A játékos háromszor lép kígyós mezőre. Az <strong>irányított fagráf</strong> éleire ráírjuk a valószínűségeket; egy ág valószínűsége az élein álló számok <strong>szorzata</strong>.
            </p>
            <TheoryTable
              headers={['Marások száma', '0', '1', '2', '3']}
              rows={[
                ['ágak száma', '1', '3', '3', '1'],
                ['valószínűség', '0,2³ = 0,008', '3 · 0,8 · 0,2² = 0,096', '3 · 0,8² · 0,2 = 0,384', '0,8³ = 0,512']
              ]}
            />
            <p>Mivel más lehetőség nincs: 0,008 + 0,096 + 0,384 + 0,512 = 1.</p>
          </div>
          <RepeatedTrialsSnakeTreeSvg />
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: elfelejtett sorrend" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Kató ötször dob (p = 0,6). Mennyi a valószínűsége, hogy pontosan egyszer talál?"
          wrong="0,6 · 0,4⁴ = 0,01536"
          wrongExplanation="Ez csak annak a valószínűsége, hogy az ELSŐ dobás talál, a többi nem. A találat azonban bármelyik dobásnál lehet."
          correct="5 · 0,6 · 0,4⁴ = 0,0768"
          correctExplanation="Az 5 elrendezés (a találat az 1., 2., …, 5. helyen) kizárja egymást, és mindegyik valószínűsége ugyanakkora, ezért n-nel szorzunk."
          tip="Fordítva is gyakori hiba: „mindegyik dobás talál” esetén NEM kell szorozni semmivel, mert ez csak egyféleképpen fordulhat elő."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: valószínűségi fagráf" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Állítsd be, hányszor ismételjük a kísérletet (n) és mekkora a siker valószínűsége (p)! Válaszd ki a sikerek számát (k): a gráf kiemeli a hozzá tartozó ágakat, és összeadja a valószínűségüket.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kísérletek száma: n = {treeN}</label>
              <input type="range" min={1} max={3} step={1} value={treeN} onChange={(e) => setTreeN(Number(e.target.value))} className="w-full accent-sky-600" aria-label="fagráf n" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">siker valószínűsége: p = {fmt(treeP, 2)}</label>
              <input type="range" min={0.05} max={0.95} step={0.05} value={treeP} onChange={(e) => setTreeP(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="fagráf p" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-1">sikerek száma: k</span>
              <div className="flex gap-1">
                {Array.from({ length: treeN + 1 }, (_, h) => (
                  <button
                    key={h}
                    onClick={() => setTreeK(h)}
                    className={`w-9 h-8 rounded-lg text-sm font-bold border-2 ${h === k ? 'bg-sky-600 text-white border-sky-700' : 'bg-sky-50 text-sky-800 border-sky-200'}`}
                    aria-label={`k = ${h}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <svg viewBox={`0 0 ${W} ${treeH}`} className="w-full h-auto max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width={W - 4} height={treeH - 4} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            {Array.from({ length: treeN }, (_, lvl) =>
              Array.from({ length: 1 << lvl }, (_, i) => {
                const x = nodeX(lvl, i);
                const y = 30 + lvl * levelGap;
                const y2 = y + levelGap;
                const xs = nodeX(lvl + 1, 2 * i);
                const xf = nodeX(lvl + 1, 2 * i + 1);
                // az él kiemelt, ha legalább egy alatta lévő kiemelt levélhez vezet
                const span = 1 << (treeN - lvl - 1);
                const onSel = (start: number) => leaves.slice(start, start + span).some((l) => l.hits === k);
                const sStart = 2 * i * span;
                const fStart = (2 * i + 1) * span;
                return (
                  <g key={`${lvl}-${i}`}>
                    <line x1={x} y1={y} x2={xs} y2={y2} stroke="#059669" strokeWidth={onSel(sStart) ? 3 : 1.2} opacity={onSel(sStart) ? 1 : 0.35} />
                    <line x1={x} y1={y} x2={xf} y2={y2} stroke="#e11d48" strokeWidth={onSel(fStart) ? 3 : 1.2} opacity={onSel(fStart) ? 1 : 0.35} />
                    <text x={(x + xs) / 2 - 6} y={(y + y2) / 2} fontSize="10" textAnchor="end" fill="#047857">
                      {fmt(treeP, 2)}
                    </text>
                    <text x={(x + xf) / 2 + 6} y={(y + y2) / 2} fontSize="10" fill="#be123c">
                      {fmt(1 - treeP, 2)}
                    </text>
                    <circle cx={x} cy={y} r="4.5" fill="#0369a1" />
                  </g>
                );
              })
            )}
            {leaves.map((l, i) => {
              const x = leafX(i);
              const y = 30 + treeN * levelGap;
              const sel = l.hits === k;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="5" fill={sel ? '#0284c7' : '#94a3b8'} />
                  <text x={x} y={y + 18} fontSize="10" textAnchor="middle" fill="#334155">
                    {l.path.map((s) => (s ? 'S' : 'K')).join('')}
                  </text>
                  <text x={x} y={y + 32} fontSize="9.5" textAnchor="middle" fontWeight={sel ? 'bold' : 'normal'} fill={sel ? '#0369a1' : '#64748b'}>
                    {fmt(l.prob, 4)}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="text-xs text-slate-500 text-center">S = siker (zöld él, p), K = kudarc (piros él, 1 − p)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-sky-50 rounded-xl border border-sky-200 p-4 space-y-1">
              <div className="font-bold text-sky-800">Pontosan {k} siker</div>
              <div>
                kiemelt ágak száma: <strong>{selCount}</strong>, mindegyik valószínűsége: <span className="font-mono">{fmt(treeP, 2)}<Sup>{k}</Sup> · {fmt(1 - treeP, 2)}<Sup>{treeN - k}</Sup> = {fmt(Math.pow(treeP, k) * Math.pow(1 - treeP, treeN - k), 4)}</span>
              </div>
              <div className="text-lg">
                P = {selCount} · {fmt(Math.pow(treeP, k) * Math.pow(1 - treeP, treeN - k), 4)} ≈ <strong className="text-sky-900">{fmt(byHits[k], 4)}</strong>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-1">
              <div className="font-bold text-emerald-800">Az összes lehetőség</div>
              {byHits.map((v, h) => (
                <div key={h} className="flex items-center gap-2">
                  <span className="w-20">{h} siker:</span>
                  <span className="font-mono w-16">{fmt(v, 4)}</span>
                  <div className="h-2 rounded bg-emerald-500" style={{ width: `${v * 160}px` }} />
                </div>
              ))}
              <div className="text-xs text-slate-600">összeg: {fmt(byHits.reduce((s, v) => s + v, 0), 4)} – mindig 1.</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: hányszor sikerül n kísérletből?" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Az oszlopdiagram azt mutatja, mekkora valószínűséggel lesz a siker 0, 1, 2, …, n alkalommal. A két szélső oszlopot (0 és n) és az 1-es oszlopot már ebben a leckében ki tudjuk számolni; az általános képletet a 13. leckében tanuljuk.
          </p>
          <div className="flex flex-wrap gap-2">
            {P_PRESETS.map((pr) => (
              <button key={pr.name} onClick={() => setP(pr.p)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100">
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kísérletek száma: n = {n}</label>
              <input type="range" min={1} max={20} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-teal-600" aria-label="kísérletek száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">siker valószínűsége: p = {fmt(p, 3)}</label>
              <input type="range" min={0.01} max={0.99} step={0.01} value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="siker valószínűsége" />
            </div>
          </div>
          <svg viewBox="0 0 560 230" className="w-full h-auto max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="556" height="226" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <line x1="40" y1="190" x2="545" y2="190" stroke="#334155" />
            <line x1="40" y1="190" x2="40" y2="20" stroke="#334155" />
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line x1="40" y1={190 - t * 160} x2="545" y2={190 - t * 160} stroke="#e2e8f0" />
                <text x="35" y={194 - t * 160} fontSize="9" textAnchor="end" fill="#64748b">
                  {fmt(t * maxP, 2)}
                </text>
              </g>
            ))}
            {dist.map((v, j) => {
              const bw = 505 / (n + 1);
              const x = 40 + j * bw;
              const h = (v / maxP) * 160;
              const special = j === 0 || j === 1 || j === n;
              return (
                <g key={j}>
                  <rect x={x + bw * 0.15} y={190 - h} width={bw * 0.7} height={h} rx="2" fill={special ? '#0d9488' : '#99f6e4'} stroke="#0f766e" strokeWidth="0.8" />
                  <text x={x + bw / 2} y="204" fontSize={n > 14 ? 8 : 10} textAnchor="middle" fill="#334155">
                    {j}
                  </text>
                </g>
              );
            })}
            <text x="292" y="222" fontSize="10" textAnchor="middle" fill="#64748b">
              sikerek száma
            </text>
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1 font-mono">
              <div>
                mindegyik sikeres: p<Sup>{n}</Sup> ≈ <strong>{fmt(pAll)}</strong>
              </div>
              <div>
                egyik sem sikeres: (1 − p)<Sup>{n}</Sup> ≈ <strong>{fmt(pNone)}</strong>
              </div>
              <div>
                csak az első sikeres: p · (1 − p)<Sup>{n - 1}</Sup> ≈ <strong>{fmt(pOnlyFirst)}</strong>
              </div>
              <div>
                pontosan egy sikeres: {n} · p · (1 − p)<Sup>{n - 1}</Sup> ≈ <strong>{fmt(pOnce)}</strong>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 space-y-1">
              <div className="font-bold text-amber-800">Mit látunk?</div>
              <div>
                a legvalószínűbb sikerszám: <strong>{mode}</strong> (valószínűsége ≈ {fmt(maxP)})
              </div>
              <div>
                legalább egy siker: 1 − (1 − p)<Sup>{n}</Sup> ≈ <strong>{fmt(1 - pNone)}</strong>
              </div>
              <div className="text-xs text-slate-600">Figyeld meg: n növelésével a „mindegyik sikeres” valószínűsége gyorsan csökken, a csúcs pedig n · p környékére vándorol.</div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RepeatedTrialsTheory;
