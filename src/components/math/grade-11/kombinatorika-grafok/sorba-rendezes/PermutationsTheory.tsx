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
  CircusParadeSvg,
  AdjacentBlockSvg,
  CircularParadeSvg,
  AlternatingSeatsSvg,
  FactorialGrowthSvg
} from './PermutationsFigures';

const group = (v: bigint | number) => {
  const s = typeof v === 'bigint' ? v.toString() : Math.round(v).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const factBig = (n: number): bigint => {
  let r = 1n;
  for (let i = 2; i <= n; i++) r *= BigInt(i);
  return r;
};

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));

const permutations = (arr: string[]): string[][] => {
  if (arr.length <= 1) return [arr.slice()];
  const out: string[][] = [];
  arr.forEach((x, i) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    permutations(rest).forEach((p) => out.push([x, ...p]));
  });
  return out;
};

const LETTERS = ['T', 'O', 'P', 'L', 'E', 'Z'];

type Mode = 'none' | 'adjacent' | 'notAdjacent' | 'ends' | 'circle';

const MODES: { id: Mode; label: string }[] = [
  { id: 'none', label: 'nincs megkötés' },
  { id: 'adjacent', label: 'T és O egymás mellett' },
  { id: 'notAdjacent', label: 'T és O nem egymás mellett' },
  { id: 'ends', label: 'T a bal, O a jobb szélen' },
  { id: 'circle', label: 'körbe állnak (forgatás nem számít)' }
];

export const PermutationsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: sorrendek számlálása
  const [n, setN] = useState<number>(5);
  const [mode, setMode] = useState<Mode>('adjacent');

  // Labor II: faktoriális-számológép
  const [k, setK] = useState<number>(10);

  const lab1 = useMemo(() => {
    const items = LETTERS.slice(0, n);
    const all = permutations(items);
    const adj = (p: string[]) => Math.abs(p.indexOf('T') - p.indexOf('O')) === 1;
    let good: string[][];
    if (mode === 'adjacent') good = all.filter(adj);
    else if (mode === 'notAdjacent') good = all.filter((p) => !adj(p));
    else if (mode === 'ends') good = all.filter((p) => p[0] === 'T' && p[p.length - 1] === 'O');
    else if (mode === 'circle') good = all.filter((p) => p[0] === 'T');
    else good = all;
    const formula =
      mode === 'adjacent'
        ? `2 · ${n - 1}! = ${2 * fact(n - 1)}`
        : mode === 'notAdjacent'
          ? `${n}! − 2 · ${n - 1}! = ${fact(n)} − ${2 * fact(n - 1)} = ${fact(n) - 2 * fact(n - 1)}`
          : mode === 'ends'
            ? `${n - 2}! = ${fact(n - 2)}`
            : mode === 'circle'
              ? `${n}! : ${n} = ${n - 1}! = ${fact(n - 1)}`
              : `${n}! = ${fact(n)}`;
    return { total: all.length, count: good.length, examples: good.slice(0, 8).map((p) => p.join('-')), formula };
  }, [n, mode]);

  const kFact = factBig(k);
  const expansion = k === 0 ? '0! = 1 (megállapodás)' : Array.from({ length: k }, (_, i) => k - i).join(' · ');

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="sorba-rendezes"
      title="2. Sorba rendezés"
      subtitle="Hányféle sorrendben vonulhat fel 5 cirkuszi vadállat? A faktoriális, a sorba rendezés és a megkötések: rögzített helyek, egymás mellé kerülő és egymás mellé nem kerülő elemek, körbe rendezés."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="orange"
      pdfFilename="11_osztaly_sorba_rendezes_tananyag.pdf"
      practiceTitle="Készen állsz a sorba rendezési feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — n KÜLÖNBÖZŐ ELEM SORBA RENDEZÉSE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center">
              <span className="font-mono text-base font-black text-orange-900 dark:text-orange-200">
                n! = n · (n − 1) · (n − 2) · … · 2 · 1,   0! = 1
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Rögzített helyű elemek:</strong> rögzítjük őket, a többit sorba rendezzük a maradék helyekre.</li>
              <li><strong>Két elem egymás mellett:</strong> egy elemnek tekintjük ⇒ (n − 1)! sorrend, és a két elem sorrendje 2-féle: 2 · (n − 1)!.</li>
              <li><strong>Két elem nem kerülhet egymás mellé:</strong> az összesből kivonjuk az egymás melletti eseteket: n! − 2 · (n − 1)!.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: cirkuszi felvonulás" badge="Tankönyv 52. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A cirkuszban 5 vadállat vonul szorosan egymás után: egy <strong>t</strong>igris, egy <strong>o</strong>roszlán, egy
              <strong> p</strong>árduc, egy <strong>l</strong>eopárd és egy <strong>e</strong>lefánt.
            </p>
            <p>
              <strong>a)</strong> Hány különböző sorrendben vonulhatnak? Az első helyre 5, a másodikra 4, … az utolsóra 1 állat
              kerülhet: <strong>5 · 4 · 3 · 2 · 1 = 5! = 120</strong>.
            </p>
          </div>
          <CircusParadeSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A faktoriális" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryCard title="Sorba rendezés" badge="Definíció" badgeColor="orange">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha sorba rendezünk n darab különböző elemet, akkor a lehetséges sorrendek száma
              <strong> n · (n − 1) · … · 1</strong>. Ezt a szorzatot így jelöljük: <strong>n!</strong> (kiolvasva: n faktoriális).
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>A faktoriálist technikai okokból 0-ra is értelmezzük: <strong>0! = 1</strong>.</li>
              <li>Hasznos összefüggés: n! = n · (n − 1)!, ezért például 10! : 9! = 10.</li>
              <li>A faktoriális nagyon gyorsan nő: 10! = 3 628 800, 20! ≈ 2,43 · 10¹⁸.</li>
            </ul>
          </TheoryCard>
          <FactorialGrowthSvg />
        </div>
      </TheorySection>

      {/* 3. Megkötések */}
      <TheorySection title="3. Sorba rendezés megkötésekkel" badge="Stratégia" badgeColor="teal">
        <TheoryTable
          headers={['Megkötés', 'Ötlet', 'Példa (5 állat)']}
          rows={[
            ['Néhány elem helye meg van határozva', 'Ezeket rögzítjük, a többi elemet sorba rendezzük a megmaradt helyekre', 'T elöl, O hátul: 3! = 6'],
            ['Két elemnek egymás mellé kell kerülnie', 'Egy elemnek tekintjük; eggyel kevesebb elemet rendezünk, és a két elem sorrendje kétféle', '2 · 4! = 48'],
            ['Két elem nem kerülhet egymás mellé', 'Az összes esetből kivonjuk azokat, amikor egymás mellé kerülnek', '5! − 2 · 4! = 72'],
            ['Körbe rendezés (nincs „első”)', 'Minden körsorrendet n-szer számoltunk (elforgatások)', '5! : 5 = 24']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="b) és c) A tigris és az oroszlán" badge="Megoldás" badgeColor="amber">
            <AdjacentBlockSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha az oroszlán közvetlenül a tigris után áll, kettőjüket egy „objektumnak” tekintjük: 4 objektum, 4! = 24 sorrend. Az
              oroszlán a tigris előtt is lehet (újabb 24), így <strong>2 · 4! = 48</strong>. Nem egymás után:
              <strong> 5! − 2 · 4! = 120 − 48 = 72</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="d) Körbevonulás" badge="Megoldás" badgeColor="teal">
            <CircularParadeSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A T-O-P-L-E sor most ugyanaz, mint az O-P-L-E-T, a P-L-E-T-O, az L-E-T-O-P és az E-T-O-P-L. Minden esetnek további négy,
              lényegében nem különböző változata van, ezért a 120 esetben mindegyiket ötször számoltuk: <strong>120 : 5 = 24</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Öttusa: 12 akadály (érettségi, 2015)" badge="1. feladat" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              Először az 5 A, majd a 4 B, végül a 3 C típusú akadály következik, a típusokon belül a sorrend szabad. A három csoport
              sorrendje rögzített, a csoportokon belül: <strong>5! · 4! · 3! = 120 · 24 · 6 = 17 280</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="B) 10 tanuló a tornapadon" badge="2. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> 10! = 3 628 800</li>
              <li><strong>b)</strong> Csilla és Panni egymás mellett: 2 · 9! = 725 760</li>
              <li><strong>c)</strong> Zoli és Gábor nem egymás mellett: 10! − 2 · 9! = 2 903 040</li>
              <li>
                <strong>d)</strong> Csilla–Panni egymás mellett, Zoli–Gábor nem: a Csilla–Panni blokkos esetekből (2 · 9!) kivonjuk azokat,
                ahol Zoli–Gábor is blokk (2 · 2 · 8! = 161 280): 725 760 − 161 280 = <strong>564 480</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) 12 tanuló egyesével kimegy" badge="3. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> 12! = 479 001 600</li>
              <li><strong>b)</strong> Csilla és Panni a „két utolsó”: 10! · 2! = 7 257 600</li>
              <li><strong>c)</strong> Zoli, Gábor és Peti az „első három”: 3! · 9! = 2 177 280</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Lány, fiú, lány, fiú… a nézőtéren" badge="4. feladat" badgeColor="rose">
            <AlternatingSeatsSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A lányok helyei (1., 3., 5.) és a fiúk helyei (2., 4., 6.) rögzítettek; a lányok 3!, a fiúk 3! sorrendben ülhetnek:
              <strong> 3! · 3! = 36</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="E) Tíz számjegykártya" badge="5. feladat" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> 10! = 3 628 800 sorrend</li>
              <li><strong>b)</strong> csökkenő sorrend: csak <strong>1</strong> (9876543210)</li>
              <li><strong>c)</strong> tízjegyű szám (nem 0-val kezdődik): 10! − 9! = 9 · 9! = 3 265 920</li>
              <li><strong>d)</strong> 10-zel osztható (0 a végén): 9! = 362 880</li>
              <li>
                <strong>e)</strong> 3-mal osztható: a jegyek összege 0 + 1 + … + 9 = 45, ami osztható 3-mal, tehát <strong>mind a 3 265 920</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Tánciskola: 7 fiú, 7 lány" badge="6. feladat" badgeColor="indigo">
            <p className="text-sm text-slate-700 leading-relaxed">
              Rögzítsük a lányok sorrendjét; az első lány párja 7-féle, a másodiké 6-féle, … : <strong>7! = 5040</strong> párosítás.
            </p>
          </TheoryCard>
          <TheoryCard title="G) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> a) 9! = 362 880; b) András bal, Bence jobb szélen: 7! = 5040.</li>
              <li><strong>HF 2.</strong> Színház, 4 hely: a) 4! = 24; b) Anna és Béla egymás mellett: 2 · 3! = 12; c) nem egymás mellett: 24 − 12 = 12.</li>
              <li><strong>HF 3.</strong> 35 állomás: a) 35 · 34 = 1190 jegy; b) legfeljebb 1190 : 2 = 595 különböző ár.</li>
              <li>
                <strong>HF 4.</strong> a) 0! = 1; b) 11! : (5! · 6!) = 462; c) 11! : (5! + 6!) = 47 520; d) 10! : 9! = 10; e) 19! : 20! = 1/20 = 0,05; f) (5!)² = 14 400.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: elmarad a blokkon belüli sorrend" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="„Egy objektumnak tekintjük” – de a blokkon belül is van sorrend"
          wrong="A tigris és az oroszlán egymás mellett: 4! = 24 sorrend"
          wrongExplanation="Ez csak azokat a sorrendeket számolja, amelyekben az oroszlán a tigris UTÁN áll. Az oroszlán a tigris előtt is állhat – ez újabb 24 eset. Hasonló hiba a „nem egymás mellett” esetben 5! − 4! = 96-ot számolni."
          correct="2 · 4! = 48, illetve nem egymás mellett: 5! − 2 · 4! = 72"
          correctExplanation="Két összekötött elem kétféle sorrendben állhat a blokkon belül, ezért a blokkos sorrendek számát 2-vel szorozzuk."
          tip="Ellenőrizd kis esetre! 3 elemre (T, O, P): egymás mellett 2 · 2! = 4 (TOP, OTP, PTO, POT), nem egymás mellett 3! − 4 = 2 (TPO, OPT)."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Sorrendek számlálása megkötésekkel" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Elemek száma: {n} ({LETTERS.slice(0, n).join(', ')})
            </label>
            <input
              type="range"
              min="3"
              max="6"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full accent-orange-600"
              aria-label="elemek száma"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  mode === m.id ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div>Összes sorrend: {n}! = {lab1.total}</div>
            <div>
              Megfelelő sorrendek (a gép mindet végignézte): <strong className="text-orange-700">{lab1.count}</strong>
            </div>
            <div className="font-mono text-xs">Képlettel: {lab1.formula}</div>
            <div className="text-xs text-slate-500 font-mono break-words">
              Példák: {lab1.examples.join(', ')}
              {lab1.count > 8 ? ', …' : ''}
            </div>
            {mode === 'circle' && (
              <div className="text-xs text-slate-500">
                Körnél csak a T-vel kezdődő sorokat soroltuk fel: minden körsorrendnek pontosan egy ilyen „elforgatása” van.
              </div>
            )}
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            A „T és O egymás mellett” és a „T és O nem egymás mellett” esetek száma együtt mindig n!. A körbe rendezés (n − 1)!-t ad.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Faktoriális-számológép" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">n = {k}</label>
            <input
              type="range"
              min="0"
              max="25"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="w-full accent-purple-600"
              aria-label="n értéke"
            />
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div className="font-mono text-xs break-words">{k}! = {expansion}</div>
            <div>
              <strong className="text-purple-700 break-words">{k}! = {group(kFact)}</strong>
            </div>
            <div className="text-xs text-slate-500">
              {kFact.toString().length} jegyű szám
              {k >= 1 ? ` · ${k}! : ${k - 1}! = ${k}` : ''}
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-600">A 4. házi feladat kifejezései</div>
          <TheoryTable
            headers={['Kifejezés', 'Érték', 'Ötlet']}
            rows={[
              ['0!', '1', 'megállapodás'],
              ['11! / (5! · 6!)', group(factBig(11) / (factBig(5) * factBig(6))), '39 916 800 : 86 400'],
              ['11! / (5! + 6!)', group(factBig(11) / (factBig(5) + factBig(6))), '5! + 6! = 120 + 720 = 840'],
              ['10! / 9!', String(fact(10) / fact(9)), '10! = 10 · 9!'],
              ['19! / 20!', '1/20 = 0,05', '20! = 20 · 19!'],
              ['(5!)²', group(fact(5) ** 2), '120² (nem 10!)']
            ]}
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PermutationsTheory;
