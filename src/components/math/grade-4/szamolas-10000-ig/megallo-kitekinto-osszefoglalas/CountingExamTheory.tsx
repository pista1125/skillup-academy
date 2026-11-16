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
  SumPyramidSvg,
  RoundAndMultiplySvg,
  FairyWingsSvg,
  OperationChainSvg,
  TentsSvg,
  ProductGridSvg,
  SumPyramid
} from './CountingExamFigures';

// ---------------------------------------------------------------------------
// Labor I: vegyes feladatok generátora
// ---------------------------------------------------------------------------
type TaskKind = 'kerekites' | 'osszeadas' | 'kivonas' | 'szorzas' | 'osztas' | 'sorrend' | 'romai';

const KINDS: { id: TaskKind; label: string }[] = [
  { id: 'kerekites', label: 'Kerekítés' },
  { id: 'osszeadas', label: 'Összeadás' },
  { id: 'kivonas', label: 'Kivonás' },
  { id: 'szorzas', label: 'Szorzás' },
  { id: 'osztas', label: 'Osztás' },
  { id: 'sorrend', label: 'Műveleti sorrend' },
  { id: 'romai', label: 'Római szám' }
];

type Task = { text: string; answer: string; hint: string };

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export const toRoman = (n: number): string => {
  const parts: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  let s = '';
  let r = n;
  for (const [v, t] of parts) {
    while (r >= v) {
      s += t;
      r -= v;
    }
  }
  return s;
};

const fmt = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));

export const makeTask = (kind: TaskKind): Task => {
  switch (kind) {
    case 'kerekites': {
      const n = rnd(1001, 9899);
      const which = rnd(0, 2);
      const unit = [10, 100, 1000][which];
      const name = ['tízesre', 'százasra', 'ezresre'][which];
      const r = Math.round(n / unit) * unit;
      return { text: `Kerekítsd ${name}: ${n}`, answer: fmt(r), hint: `Nézd a ${['egyesek', 'tízesek', 'százasok'][which]} számjegyét: 0–4 → le, 5–9 → fel.` };
    }
    case 'osszeadas': {
      const a = rnd(1200, 5800);
      const b = rnd(300, 9999 - a);
      return { text: `${a} + ${b} =`, answer: fmt(a + b), hint: 'Írásban: jobbról balra, a maradékot (átvitelt) is add hozzá!' };
    }
    case 'kivonas': {
      const a = rnd(2000, 9999);
      const b = rnd(300, a - 100);
      return { text: `${a} − ${b} =`, answer: fmt(a - b), hint: 'Ellenőrizd összeadással: az eredmény + a kivonandó = a kisebbítendő.' };
    }
    case 'szorzas': {
      if (rnd(0, 1) === 0) {
        const a = rnd(2, 9);
        const b = rnd(2, 9) * [10, 100][rnd(0, 1)];
        return { text: `${a} · ${b} =`, answer: fmt(a * b), hint: `Számold ki fejben: ${a} · ${b / (b >= 100 ? 100 : 10)}, aztán írd mögé a nullákat!` };
      }
      const a = rnd(112, 333);
      const b = rnd(2, 3);
      return { text: `${a} · ${b} =`, answer: fmt(a * b), hint: 'Írásban: az egyesekkel kezdd, a maradékot add hozzá a következő szorzathoz!' };
    }
    case 'osztas': {
      const b = rnd(2, 9);
      const q = rnd(2, 9) * [10, 100][rnd(0, 1)];
      return { text: `${fmt(b * q)} : ${b} =`, answer: fmt(q), hint: `Ellenőrizd szorzással: ? · ${b} = ${fmt(b * q)}.` };
    }
    case 'sorrend': {
      const t = rnd(0, 2);
      if (t === 0) {
        const a = rnd(3, 9) * 100;
        const b = rnd(2, 9);
        const c = rnd(2, 9) * 10;
        return { text: `${a} + ${b} · ${c} =`, answer: fmt(a + b * c), hint: 'Előbb a szorzás, aztán az összeadás!' };
      }
      if (t === 1) {
        const b = rnd(2, 9);
        const q = rnd(2, 9) * 10;
        const a = rnd(b * q / 10 + 1, 99) * 10;
        return { text: `${a} − ${b * q} : ${b} =`, answer: fmt(a - q), hint: 'Előbb az osztás, aztán a kivonás!' };
      }
      const a = rnd(10, 40) * 10;
      const b = rnd(5, 30) * 10;
      const c = rnd(2, 4);
      return { text: `(${a} + ${b}) · ${c} =`, answer: fmt((a + b) * c), hint: 'Előbb a zárójelben lévő műveletet végezd el!' };
    }
    case 'romai':
    default: {
      const n = rnd(4, 39);
      if (rnd(0, 1) === 0) return { text: `Melyik szám ez: ${toRoman(n)}?`, answer: String(n), hint: 'I = 1, V = 5, X = 10. Ha I áll V vagy X előtt, kivonjuk.' };
      return { text: `Írd le római számmal: ${n}`, answer: toRoman(n), hint: 'Egy jel legfeljebb háromszor állhat egymás mellett: 4 = IV, 9 = IX.' };
    }
  }
};

const norm = (s: string) => s.replace(/\s/g, '').toUpperCase();

// ---------------------------------------------------------------------------
// Labor II: összegpiramis
// ---------------------------------------------------------------------------
const PYR_PRESETS: { name: string; base: [number, number, number] }[] = [
  { name: 'Tankönyv 29/2. (barna)', base: [321, 135, 228] },
  { name: 'Kerek százasok', base: [1200, 2500, 1800] },
  { name: 'Ezres számok', base: [2345, 1655, 3420] },
  { name: 'Nagy piramis', base: [4050, 1950, 2380] }
];

export const CountingExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [kind, setKind] = useState<TaskKind>('kerekites');
  const [task, setTask] = useState<Task>(() => makeTask('kerekites'));
  const [guess, setGuess] = useState('');
  const [checked, setChecked] = useState<null | boolean>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const newTask = (k: TaskKind = kind) => {
    setKind(k);
    setTask(makeTask(k));
    setGuess('');
    setChecked(null);
  };
  const check = () => {
    if (!guess.trim()) return;
    const ok = norm(guess) === norm(task.answer);
    setChecked(ok);
    if (checked === null) setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }));
  };

  // Labor II
  const [base, setBase] = useState<[number, number, number]>(PYR_PRESETS[0].base);
  const [inp, setInp] = useState<{ l: string; r: string; t: string }>({ l: '', r: '', t: '' });
  const [pyrChecked, setPyrChecked] = useState(false);
  const left = base[0] + base[1];
  const right = base[1] + base[2];
  const top = left + right;
  const okL = Number(inp.l.replace(/\s/g, '')) === left;
  const okR = Number(inp.r.replace(/\s/g, '')) === right;
  const okT = Number(inp.t.replace(/\s/g, '')) === top;
  const topTooBig = top > 10000;
  const changeBase = (i: number, d: number) => {
    const nb = [...base] as [number, number, number];
    nb[i] = Math.max(0, Math.min(4999, nb[i] + d));
    setBase(nb);
    setInp({ l: '', r: '', t: '' });
    setPyrChecked(false);
  };
  const inputCls = (ok: boolean) =>
    `w-24 text-center text-lg font-black rounded-xl border-2 px-2 py-2 min-h-[44px] ${
      pyrChecked ? (ok ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-rose-500 bg-rose-50 text-rose-800') : 'border-slate-300 bg-white'
    }`;

  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="megallo-kitekinto-osszefoglalas"
      grade={4}
      chapterId="szamolas-10000-ig"
      title="13. Megálló, Kitekintő – tudáspróba"
      subtitle="Az I. fejezet összefoglalása: számok 10 000-ig, kerekítés, fejben és írásban számolás, műveleti sorrend, nyitott mondatok, szöveges feladatok, római számok és logikai lapok."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="amber"
      pdfFilename="4_osztaly_szamolas_10000_ig_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a fejezetzáró tudáspróbára?"
      practiceSubtitle="Tedd próbára a tudásodat a 3 szintes, 90 kérdéses kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AMIT A FEJEZETBŐL TUDNOD KELL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              zárójel → szorzás, osztás → összeadás, kivonás
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Helyiérték:</strong> 4506 = 4 E + 5 sz + 0 t + 6 e. A 0-t is le kell írni!</li>
              <li><strong>Kerekítés:</strong> 0, 1, 2, 3, 4 → lefelé; 5, 6, 7, 8, 9 → felfelé (75 ≈ 80, 7451 ≈ 7500).</li>
              <li><strong>Ellenőrzés:</strong> a kivonást összeadással, az osztást szorzással ellenőrizd.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz – számok */}
      <TheorySection title="1. Amit már tudsz: a számok" badge="Ismétlés" badgeColor="blue">
        <p className="text-sm text-slate-700 leading-relaxed mb-3">
          Ügyes voltál! Ebben a fejezetben nagyon sok mindent megtanultál. Nézzük át együtt, mi mindent tudsz már a számokról!
        </p>
        <TheoryTable
          headers={['Mit tudsz?', 'Szabály', 'Példa', 'Lecke']}
          rows={[
            ['Számok írása, olvasása', 'ezresek (E), százasok (sz), tízesek (t), egyesek (e)', 'hatezer-ötszázhuszonnyolc = 6528', '1., 9.'],
            ['Valódi érték', 'a számjegy annyit ér, ahol áll', 'a 368-ban a 3 valódi értéke 300', '1., 9.'],
            ['Számszomszédok', 'egyes, tízes, százas, ezres szomszéd', '589: 580 < 589 < 590 és 500 < 589 < 600', '1., 10.'],
            ['Kerekítés', '0–4 → le, 5–9 → fel; a következő kisebb helyiérték dönt', '3862 ≈ 3860, 128 ≈ 100, 5500 ≈ 6000', '1., 10.'],
            ['Sorozatok', 'keresd meg, mennyivel nő vagy csökken', '8010, 8000, 7990, 7980, 7970 …', '1., 9.'],
            ['Fele, negyede, tizede', ': 2, : 4, : 10', '10 000 fele 5000, negyede 2500, tizede 1000', '12.'],
            ['Római számok', 'I = 1, V = 5, X = 10; a kisebb jel elöl: kivonás', 'XIX = 19, XXXIX = 39, XXVI = 26', '7.']
          ]}
        />
      </TheorySection>

      {/* 2. Amit már tudsz – műveletek */}
      <TheorySection title="2. Amit már tudsz: a műveletek" badge="Ismétlés" badgeColor="indigo">
        <TheoryTable
          headers={['Mit tudsz?', 'Hogyan?', 'Példa', 'Lecke']}
          rows={[
            ['Fejben összeadás, kivonás', 'részletekben: előbb a százasok, aztán a tízesek', '450 + 220 = 650 + 20 = 670', '2., 11.'],
            ['Írásbeli összeadás, kivonás', 'jobbról balra, ne felejtsd el a maradékot!', '277 + 565 = 842, 944 − 576 = 368', '2., 11.'],
            ['Szorzás, osztás kerek számmal', 'a nullák nélkül számolj, aztán írd vissza őket', '7 · 40 = 280, 6400 : 20 = 320', '3., 12.'],
            ['Írásbeli szorzás egyjegyűvel', 'az egyesekkel kezdd, a maradékot add hozzá', '243 · 4 = 972', '3.'],
            ['Műveleti sorrend', 'zárójel → szorzás, osztás → összeadás, kivonás', '610 − 490 : 7 = 610 − 70 = 540', '4.'],
            ['Becslés', 'kerekített számokkal előre megsaccolod', '564 + 138 ≈ 600 + 100 = 700', '2., 11.']
          ]}
        />
      </TheorySection>

      {/* 3. Amit már tudsz – feladatmegoldás */}
      <TheorySection title="3. Amit már tudsz: feladatmegoldás és logika" badge="Ismétlés" badgeColor="teal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Nyitott mondatok (5. lecke)" badge="□ △ ○" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>▲ + 254 = 522 → ▲ = 522 − 254 = <strong>268</strong></li>
              <li>● − 539 = 289 → ● = 289 + 539 = <strong>828</strong></li>
              <li>390 &lt; □ &lt; 480: pl. 400, 450, 479 – de a 390 és a 480 nem jó!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Szöveges feladatok (6. lecke)" badge="5 lépés" badgeColor="emerald">
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li>Olvasd el figyelmesen!</li>
              <li>Írd ki az adatokat, készíts rajzot!</li>
              <li>Tervezd meg a műveletet, becsülj!</li>
              <li>Számolj, aztán ellenőrizz!</li>
              <li>Írj szöveges választ!</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="Logikai lapok (8. lecke)" badge="48 lap" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>4 szín (piros, sárga, kék, zöld), 3 forma (kör, négyzet, háromszög), 2 méret, lyukas vagy nem lyukas.</li>
              <li>4 · 3 · 2 · 2 = <strong>48</strong> lap, nincs két egyforma.</li>
              <li>„Négyzet vagy kör” → 32 lap; „Nem kicsi” → csak a nagyok.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Nézzük meg együtt! – Megálló I. */}
      <TheorySection title="4. Nézzük meg együtt! – Megálló (1000-ig)" badge="Tankönyv 29–30. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Összegpiramis" badge="29/2. feladat" badgeColor="orange">
            <SumPyramidSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>B = 321 + 135 = <strong>456</strong>, C = 135 + 228 = <strong>363</strong>.</li>
              <li>A = 456 + 363 = <strong>819</strong>.</li>
              <li>Ha felülről hiányzik a szám, kivonással megyünk lefelé: 962 − 453 = 509.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Kerekíts, aztán szorozz!" badge="29/1. feladat" badgeColor="emerald">
            <RoundAndMultiplySvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>75 ≈ 80: 80 · 6 = 480, 80 · 8 = 640, 80 · 9 = 720, 80 · 7 = 560.</li>
              <li>115 ≈ 120: 120 · 2 = 240, 120 · 3 = 360, 120 · 4 = 480, 120 · 5 = 600.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Karesz kerékpártúrája" badge="29/3. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>Adatok:</strong> 4 nap, az első 3 napon 56–56 km, összesen 213 km.</li>
              <li><strong>Terv:</strong> 213 − 3 · 56.</li>
              <li><strong>Számolás:</strong> 3 · 56 = 168, 213 − 168 = 45.</li>
              <li><strong>Ellenőrzés:</strong> 56 + 56 + 56 + 45 = 213. ✓</li>
              <li><strong>Válasz:</strong> az utolsó napon <strong>45 km-t</strong> tettek meg.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Ki melyik sátorban lakott?" badge="Kitekintő 30/2." badgeColor="purple">
            <TentsSvg className="w-full h-auto mb-2" names={['Norbi', 'Attila', 'Levente', 'Botond', 'Zoli']} />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Attila és Zoli nem zöld sátorban lakott → a sárgákban (2. és 5.).</li>
              <li>Zoli nem páros sátorban → Zoli az 5.-ben, Attila a 2.-ban.</li>
              <li>Norbi és Levente sem páros → az 1. és a 3. az övék, a 4. Botondé.</li>
              <li>Botond Levente szomszédja → Levente a 3.-ban, Norbi az 1.-ben.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Nézzük meg együtt! – Megálló II. */}
      <TheorySection title="5. Nézzük meg együtt! – Megálló (10 000-ig)" badge="Tankönyv 51–52. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Tündérszárnyak és koboldsapkák" badge="51/4. feladat" badgeColor="rose">
            <FairyWingsSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Kék szárny = 60, így zöld sapka = 60 + 60 + 60 = <strong>180</strong>.</li>
              <li>60 + rózsaszín = 180 → rózsaszín szárny = <strong>120</strong>.</li>
              <li>120 − 3 barna = 1 barna → 4 barna = 120 → barna sapka = <strong>30</strong>.</li>
              <li>3 zöld szárny = 30 + 180 = 210 → zöld szárny = <strong>70</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Műveletlánc" badge="51/5. feladat" badgeColor="purple">
            <OperationChainSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              6400 : 20 = 320 → 320 · 5 = 1600 → 1600 : 80 = 20 → 20 · 100 = <strong>2000</strong>. Mindig az előző eredménnyel számolj tovább!
            </p>
          </TheoryCard>
          <TheoryCard title="C) Szorzatrács" badge="Kitekintő 52/4." badgeColor="blue">
            <ProductGridSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A · D = 5500 és A · B = 8800. Próbáljuk: A = 110 → D = 50, B = 80. ✓</li>
              <li>B · C = 8000 → C = 100; B · E = 9600 → E = 120; C · F = 7000 → F = 70.</li>
              <li>D · G = 4500 → G = 90; E · H = 7200 → H = 60; F · I = 9100 → I = 130.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Szöveges feladatok 10 000-ig" badge="51/7., 52/1., 52/7." badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>4000 kobold 5 nap alatt: 4000 : 5 = <strong>800</strong> naponta; evőeszköz: 800 · 3 = <strong>2400</strong>.</li>
              <li>Tati 8350 m-re, Teó 5640 m-rel közelebb: 8350 − 5640 = <strong>2710 m</strong>.</li>
              <li>Szörpök: levendulás 2700 dl, bodzás 2700 + 1300 = 4000 dl, kamillás 2700 − 1400 = 1300 dl, összesen <strong>8000 dl</strong>.</li>
              <li>Persely: 3550 : 10 = 355 nap = 50 hét + 5 nap → <strong>péntek</strong> este tört el.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Vigyázz */}
      <TheorySection title="6. Vigyázz! A műveleti sorrend csapdája" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="„A 312-nek és a 89 háromszorosának a különbsége”"
          wrong="312 − 89 = 223, aztán 223 · 3 = 669"
          wrongExplanation="Itt csak a 89-et kell megszorozni 3-mal, nem a különbséget. A szöveg szerint a 312-ből a háromszorost vonjuk ki."
          correct="312 − 89 · 3 = 312 − 267 = 45"
          correctExplanation="Előbb a szorzás (89 · 3 = 267), aztán a kivonás. Fonyód és Siófok között 45 km van."
          tip="Ha előbb a különbséget akarnád szorozni, zárójelet kellene írni: (312 − 89) · 3."
        />
        <TheoryCallout type="warning" title="Még egy gyakori hiba: a kerekítés">
          A 7451 százasra kerekítve 7500, mert a <strong>tízesek</strong> helyén 5 áll. Nem az utolsó számjegyet (1) kell nézni, hanem azt, amelyik a kerekítés helye után jön!
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Labor I: Vegyes feladatok – gyakorolj!" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1">1. Válassz feladattípust!</div>
            <div className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <button
                  key={k.id}
                  onClick={() => newTask(k.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-black min-h-[44px] ${k.id === kind ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'}`}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center space-y-3">
            <div className="text-2xl font-black text-slate-800">{task.text}</div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <input
                value={guess}
                onChange={(e) => {
                  setGuess(e.target.value);
                  setChecked(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') check();
                }}
                aria-label="A te válaszod"
                placeholder="?"
                className="w-36 text-center text-2xl font-black rounded-xl border-2 border-amber-300 px-2 py-2 min-h-[48px]"
              />
              <button onClick={check} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black min-h-[48px]">
                Ellenőrzöm
              </button>
              <button onClick={() => newTask()} className="px-4 py-2 rounded-xl bg-slate-700 text-white font-black min-h-[48px]">
                Új feladat
              </button>
            </div>
            {checked === true && <div className="rounded-xl p-2 bg-emerald-100 text-emerald-800 font-bold">Szuper, ez helyes! 🎉</div>}
            {checked === false && (
              <div className="rounded-xl p-2 bg-rose-100 text-rose-800 font-bold">
                Még nem jó. Tipp: {task.hint}
                <button onClick={() => setGuess(task.answer)} className="ml-2 underline">
                  Mutasd a megoldást
                </button>
              </div>
            )}
            <div className="text-xs text-slate-500">
              Eredményed: {score.ok} jó válasz / {score.all} feladat
            </div>
          </div>
          <TheoryCallout type="tip" title="Így gyakorolj!">
            Minden feladattípusból oldj meg legalább 3-at! Ha hibázol, olvasd el a tippet, és próbáld újra.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Labor II: Építs összegpiramist!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PYR_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setBase(p.base);
                  setInp({ l: '', r: '', t: '' });
                  setPyrChecked(false);
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 min-h-[44px]"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500">Az alsó sor számai (változtasd a gombokkal):</div>
              {base.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button onClick={() => changeBase(i, -100)} className="w-12 min-h-[44px] rounded-lg bg-rose-100 text-rose-800 font-black">−100</button>
                  <button onClick={() => changeBase(i, -10)} className="w-11 min-h-[44px] rounded-lg bg-rose-50 text-rose-800 font-black">−10</button>
                  <span className="w-16 text-center text-lg font-black text-slate-800">{b}</span>
                  <button onClick={() => changeBase(i, 10)} className="w-11 min-h-[44px] rounded-lg bg-emerald-50 text-emerald-800 font-black">+10</button>
                  <button onClick={() => changeBase(i, 100)} className="w-12 min-h-[44px] rounded-lg bg-emerald-100 text-emerald-800 font-black">+100</button>
                </div>
              ))}
              <div className="text-xs font-bold text-slate-500 pt-2">Számold ki a hiányzó téglákat!</div>
              <div className="flex flex-col items-center gap-2">
                <input aria-label="csúcs" value={inp.t} onChange={(e) => { setInp({ ...inp, t: e.target.value }); setPyrChecked(false); }} className={inputCls(okT)} placeholder="?" />
                <div className="flex gap-2">
                  <input aria-label="bal középső" value={inp.l} onChange={(e) => { setInp({ ...inp, l: e.target.value }); setPyrChecked(false); }} className={inputCls(okL)} placeholder="?" />
                  <input aria-label="jobb középső" value={inp.r} onChange={(e) => { setInp({ ...inp, r: e.target.value }); setPyrChecked(false); }} className={inputCls(okR)} placeholder="?" />
                </div>
              </div>
              <div className="flex justify-center">
                <button onClick={() => setPyrChecked(true)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black min-h-[48px]">
                  Ellenőrzöm
                </button>
              </div>
              {pyrChecked && (
                <div className={`rounded-xl p-2 text-center font-bold ${okL && okR && okT ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {okL && okR && okT
                    ? 'Hibátlan piramis! 🏆'
                    : `Nézd meg újra! Bal: ${base[0]} + ${base[1]}, jobb: ${base[1]} + ${base[2]}, a csúcs a két középső összege.`}
                </div>
              )}
              {topTooBig && (
                <TheoryCallout type="info" title="Nagy szám!">
                  A csúcs most nagyobb 10 000-nél. Ilyen nagy számokkal majd később számolunk – csökkentsd az alsó számokat!
                </TheoryCallout>
              )}
            </div>
            <svg viewBox="0 0 300 120" className="w-full h-auto bg-amber-50 rounded-xl border border-amber-200" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <SumPyramid
                rows={[
                  [pyrChecked && okT ? String(top) : '?'],
                  [pyrChecked && okL ? String(left) : '?', pyrChecked && okR ? String(right) : '?'],
                  base.map(String)
                ]}
                cx={150}
                y={18}
                w={70}
                h={28}
              />
            </svg>
          </div>
          <TheoryCallout type="tip" title="Ügyes trükk">
            A csúcs mindig: bal szélső + 2 · középső + jobb szélső. Az alsó középső szám ugyanis mindkét középső téglába beleszámít! Pl. 321 + 2 · 135 + 228 = 819.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CountingExamTheory;
