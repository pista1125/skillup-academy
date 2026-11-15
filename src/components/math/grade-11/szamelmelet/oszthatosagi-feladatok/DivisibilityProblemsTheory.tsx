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
  CompositeRuleVennSvg,
  DivisorTable1260Svg,
  ElectionTimelineSvg,
  BusScheduleSvg,
  BonbonBoxSvg
} from './DivisibilityProblemsFigures';

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** A d osztó felbontása páronként relatív prím prímhatványokra. */
const primePowerParts = (d: number): number[] => {
  const parts: number[] = [];
  let n = d;
  for (let p = 2; p * p <= n; p++) {
    if (n % p === 0) {
      let pp = 1;
      while (n % p === 0) {
        n /= p;
        pp *= p;
      }
      parts.push(pp);
    }
  }
  if (n > 1) parts.push(n);
  return parts;
};

type RuleCheck = { part: number; rule: string; detail: string; ok: boolean };

const checkPart = (digits: string, part: number): RuleCheck => {
  const n = BigInt(digits);
  const last = (k: number) => Number(digits.slice(-k));
  const digitSum = digits.split('').reduce((s, c) => s + Number(c), 0);
  switch (part) {
    case 2:
      return { part, rule: 'az utolsó jegy páros', detail: `utolsó jegy: ${last(1)}`, ok: last(1) % 2 === 0 };
    case 4:
      return { part, rule: 'az utolsó két jegyből álló szám osztható 4-gyel', detail: `${String(last(2)).padStart(2, '0')}`, ok: last(2) % 4 === 0 };
    case 8:
      return { part, rule: 'az utolsó három jegyből álló szám osztható 8-cal', detail: `${String(last(3)).padStart(3, '0')}`, ok: last(3) % 8 === 0 };
    case 3:
      return { part, rule: 'a számjegyek összege osztható 3-mal', detail: `számjegyösszeg: ${digitSum}`, ok: digitSum % 3 === 0 };
    case 9:
      return { part, rule: 'a számjegyek összege osztható 9-cel', detail: `számjegyösszeg: ${digitSum}`, ok: digitSum % 9 === 0 };
    case 5:
      return { part, rule: '0-ra vagy 5-re végződik', detail: `utolsó jegy: ${last(1)}`, ok: last(1) % 5 === 0 };
    case 25:
      return { part, rule: '00-ra, 25-re, 50-re vagy 75-re végződik', detail: `${String(last(2)).padStart(2, '0')}`, ok: last(2) % 25 === 0 };
    default:
      return { part, rule: `osztás ${part}-vel/-val`, detail: '', ok: n % BigInt(part) === 0n };
  }
};

const DIVISORS = [6, 10, 12, 15, 18, 20, 24, 36, 45, 60, 72, 100];

type Preset = { label: string; p: number; a: number; q: number; b: number; nameA: string; nameB: string };
const PRESETS: Preset[] = [
  { label: 'Országgyűlés + elnök', p: 4, a: 1990, q: 5, b: 2017, nameA: 'országgyűlési választás', nameB: 'elnökválasztás' },
  { label: 'Országgyűlés + EP', p: 4, a: 1990, q: 5, b: 2004, nameA: 'országgyűlési választás', nameB: 'EP-választás' },
  { label: 'Elnök + EP', p: 5, a: 2017, q: 5, b: 2004, nameA: 'elnökválasztás', nameB: 'EP-választás' }
];

export const DivisibilityProblemsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: összetett oszthatósági szabály
  const [numText, setNumText] = useState<string>('765');
  const [divisor, setDivisor] = useState<number>(45);
  const digits = numText.replace(/\D/g, '').replace(/^0+(?=\d)/, '') || '0';
  const parts = primePowerParts(divisor);
  const checks = parts.map((p) => checkPart(digits, p));
  const allOk = checks.every((c) => c.ok);
  const realOk = BigInt(digits) % BigInt(divisor) === 0n;

  // Labor II: két ismétlődő esemény
  const [p, setP] = useState<number>(4);
  const [a, setA] = useState<number>(1990);
  const [q, setQ] = useState<number>(5);
  const [b, setB] = useState<number>(2017);
  const [names, setNames] = useState<[string, string]>(['országgyűlési választás', 'elnökválasztás']);
  const from = 2018;
  const g = gcd(p, q);
  const L = (p / g) * q;
  const possible = (((a - b) % g) + g) % g === 0;
  const common: number[] = [];
  if (possible) {
    for (let y = from; y <= from + 200 && common.length < 5; y++) {
      if ((((y - a) % p) + p) % p === 0 && (((y - b) % q) + q) % q === 0) common.push(y);
    }
  }

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="oszthatosagi-feladatok"
      title="6. Oszthatósági feladatok"
      subtitle="Összetett oszthatósági szabályok, osztók összeállítása, és lnko-, lkkt-feladatok a hétköznapokból: választások, buszok, dobozok."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_oszthatosagi_feladatok_tananyag.pdf"
      practiceTitle="Készen állsz az oszthatósági feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÖSSZETETT OSZTHATÓSÁG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              a | n és b | n és (a; b) = 1 ⇒ a · b | n
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az összetett számmal való oszthatóságot <strong>relatív prím</strong> tényezőkre bontva vizsgáljuk: 45 = 5 · 9, 12 = 3 · 4, 18 = 2 · 9.</li>
              <li>Nem relatív prím tényezőkkel <strong>nem</strong> szabad: 4 | 12 és 6 | 12, de 24 ∤ 12.</li>
              <li>Ismétlődő események közös időpontjai az <strong>lkkt</strong> szerint ismétlődnek: 4 és 5 év ⇒ 20 évente.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: osztható-e 45-tel a 765 és a 2900?" badge="Tankönyv 140. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Mivel 45 = 5 · 9, és az 5 és a 9 relatív prímek, elegendő az 5-re és a 9-re tanult szabályt alkalmazni.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>765:</strong> 5-re végződik, és 7 + 6 + 5 = 18, ami osztható 9-cel ⇒ <strong>osztható 45-tel</strong> (765 = 45 · 17).</li>
              <li><strong>2900:</strong> 0-ra végződik (5 | 2900), de 2 + 9 + 0 + 0 = 11, ami nem osztható 9-cel ⇒ <strong>nem osztható 45-tel</strong>.</li>
            </ul>
          </div>
          <CompositeRuleVennSvg />
        </div>
      </TheorySection>

      {/* 2. Összetett szabályok */}
      <TheorySection title="2. Összetett oszthatósági szabályok" badge="Elmélet" badgeColor="indigo">
        <p className="text-sm text-slate-700 mb-3">Egy természetes szám <strong>akkor és csak akkor</strong> osztható …</p>
        <TheoryTable
          headers={['… -val/-vel', 'ha osztható', 'gyakorlatban']}
          rows={[
            ['6', '2-vel és 3-mal', 'páros, és a számjegyösszeg osztható 3-mal'],
            ['10', '2-vel és 5-tel', '0-ra végződik'],
            ['10, 100, 1000, …', '—', '0-ra, 00-ra, 000-ra… végződik'],
            ['12', '3-mal és 4-gyel', 'számjegyösszeg 3 | …, az utolsó két jegy 4 | …'],
            ['15', '3-mal és 5-tel', 'számjegyösszeg 3 | …, 0-ra vagy 5-re végződik'],
            ['18', '2-vel és 9-cel', 'páros, és a számjegyösszeg osztható 9-cel'],
            ['45', '5-tel és 9-cel', '0-ra vagy 5-re végződik, számjegyösszeg 9 | …']
          ]}
        />
        <TheoryCallout type="info" title="Miért kell, hogy relatív prímek legyenek?">
          A 2 · 6 = 12, de a „2-vel és 6-tal osztható” számok a [2; 6] = 6 többszörösei – a 6 vagy a 18 is ilyen, mégsem osztható 12-vel. Ha (a; b) = 1, akkor [a; b] = a · b, ezért a két feltétel együtt pontosan az a · b-vel való oszthatóságot jelenti.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Csoportmunka */}
      <TheorySection title="3. Kidolgozott feladatok (csoportmunka)" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Az 1260 összes osztója (1. feladat)" badge="Feladat" badgeColor="emerald">
            <DivisorTable1260Svg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              1260 = 2² · 3² · 5 · 7. Minden osztó 2<sup>a</sup> · 3<sup>b</sup> · 5<sup>c</sup> · 7<sup>d</sup> alakú, ahol a, b ∈ {'{'}0; 1; 2{'}'}, c, d ∈ {'{'}0; 1{'}'}. Az osztók száma 3 · 3 · 2 · 2 = <strong>36</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="B) (3xy; xy) = 3 (2. feladat)" badge="Feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A háromjegyű 3xy = 300 + xy, ezért (3xy; xy) = (300 + xy; xy) = (300; xy).</li>
              <li>300 = 2² · 3 · 5², így (300; xy) = 3 pontosan akkor, ha xy osztható 3-mal, <strong>páratlan</strong> és <strong>5-tel nem osztható</strong>.</li>
              <li>x, y egyjegyű pozitív egészek (y ≠ 0): xy ∈ {'{'}21, 27, 33, 39, 51, 57, 63, 69, 81, 87, 93, 99{'}'} – <strong>12 lehetőség</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Igazak-e? (3. feladat)" badge="Feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 3 | n ⇒ 3 | n²: igaz. <strong>b)</strong> 3 | n² ⇒ 3 | n: igaz, mert a 3 prím. <strong>c)</strong> 3 | n ⇒ 9 | n²: igaz, (3k)² = 9k².</li>
              <li><strong>d)</strong> 10², 10³, … mind a 100 többszöröse ⇒ 25-tel osztható: igaz.</li>
              <li><strong>e)</strong> 3 egymást követő egész szorzata 6-tal osztható: igaz (van köztük páros és 3-mal osztható).</li>
              <li><strong>f)</strong> 5 egymást követő egész szorzata 0-ra végződik: igaz (van köztük páros és 5-tel osztható).</li>
              <li><strong>g)</strong> 4 | n ⇒ az n után következő második páros szám, n + 4 is osztható 4-gyel: igaz.</li>
              <li><strong>h)</strong> Két tag összegére bontva a tagok is 3-mal oszthatók: <strong>hamis</strong>, 6 = 1 + 5.</li>
              <li><strong>i)</strong> Két tényező szorzatára bontva mindkét tényező 3-mal osztható: <strong>hamis</strong>, 6 = 2 · 3.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Választások (4. feladat)" badge="Feladat" badgeColor="violet">
            <ElectionTimelineSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Országgyűlés: 1990 + 4k; elnök: 2017 + 5m. Közös év 2017 után: <strong>2022</strong>, utána [4; 5] = 20 évente (2042, …).</li>
              <li><strong>b)</strong> EP: 2004 + 5m. Országgyűléssel közös: 2014, legközelebb <strong>2034</strong>.</li>
              <li><strong>c)</strong> Mindhárom: <strong>soha</strong> – az elnökválasztás évei 5-tel osztva 2, az EP-választáséi 4 maradékot adnak.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) lnko és lkkt egymásba ágyazva (5. feladat)" badge="Feladat" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A = 48, B = 60, C = 75: <strong>a)</strong> (A; [B; C]) = (48; 300) = 12; <strong>b)</strong> ([A; B]; C) = (240; 75) = 15; <strong>c)</strong> [(A; B); C] = [12; 75] = 300; <strong>d)</strong> [B; (A; C)] = [60; 3] = 60.</li>
              <li>Mindig igaz: <strong>b) | c)</strong>, mert ([A; B]; C) osztója C-nek, C pedig osztója [(A; B); C]-nek. (Ugyanígy a) | c), a) | d) és b) | d) is mindig teljesül.)</li>
              <li>Két egyenlő is lehet: pl. A = 1, B = 2, C = 3 esetén a) = b) = 1.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Buszjáratok (6. feladat)" badge="Feladat" badgeColor="orange">
            <BusScheduleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>6.00–8.00 (8 és 5 perc): [8; 5] = 40 ⇒ 6.00, 6.40, 7.20, 8.00.</li>
              <li>8.00–9.00 (9 és 5 perc): 8.45. 9.00–14.00 (9 és 11 perc, a 2. járat 9.00-tól): [9; 11] = 99 ⇒ 10.06, 11.45, 13.24.</li>
              <li>14.00–16.00 (8 és 11 perc): 14.08, 15.36. 16.00–20.00 (8 és 7 perc, mindkettő 16.00-tól): 16.00, 16.56, 17.52, 18.48, 19.44. 20.00–21.00 (12 és 7 perc): 20.12.</li>
              <li>Összesen <strong>16</strong> közös indulás.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Fermat + HF */}
      <TheorySection title="4. A kis Fermat-tétel és a házi feladatok" badge="Ellenőrzés" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCallout type="tip" title="Kis Fermat-tétel (1636)">
              Ha p prímszám és a pozitív egész, akkor a<sup>p</sup> − a osztható p-vel.
            </TheoryCallout>
            <TheoryTable
              headers={['a', 'p', 'a^p − a', 'hányados']}
              rows={[
                ['2', '3', '6', '6 : 3 = 2'],
                ['2', '5', '30', '30 : 5 = 6'],
                ['3', '3', '24', '24 : 3 = 8'],
                ['3', '5', '240', '240 : 5 = 48'],
                ['4', '3', '60', '60 : 3 = 20'],
                ['4', '5', '1020', '1020 : 5 = 204'],
                ['4', '7', '16 380', '16 380 : 7 = 2340'],
                ['5', '13', '1 220 703 120', '93 900 240'],
                ['8', '11', '8 589 934 584', '780 903 144']
              ]}
            />
          </div>
          <div className="space-y-3">
            <BonbonBoxSvg />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> páros + páros = páros; páratlan + páratlan = páros; páros + páratlan = páratlan; páratlan · páratlan = páratlan; páros · páros = páros; páratlan · páros = páros.</li>
              <li><strong>HF 2.</strong> [a; b] = 48, (a; b) = 6: a = 6u, b = 6v, (u; v) = 1, u · v = 8 ⇒ <strong>6 és 48</strong>.</li>
              <li><strong>HF 3.</strong> (3575; 3125) = 25 &lt; [72; 15] = 360 &lt; [75; 40] = 600 &lt; (5120; 4480) = 640.</li>
              <li><strong>HF 4.</strong> Minden élnek a 4, 16 és 20 közös többszörösének kell lennie: [4; 16; 20] = 80 ⇒ <strong>80 × 80 × 80 cm</strong>, 512 000 : 1280 = <strong>400 doboz</strong>. A második legkisebb: 80 × 80 × 160 cm, <strong>800 doboz</strong>.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: nem relatív prím tényezők" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="24 = 2 · 12, tehát elég a 2-vel és a 12-vel való oszthatóság? NEM!"
          wrong="A 36 osztható 2-vel és 12-vel, tehát osztható 24-gyel."
          wrongExplanation="A 2 és a 12 nem relatív prímek: a 2-vel és 12-vel osztható számok a [2; 12] = 12 többszörösei. 36 : 24 nem egész."
          correct="24 = 3 · 8 és (3; 8) = 1: a szám osztható 24-gyel ⇔ osztható 3-mal és 8-cal."
          correctExplanation="A 36 osztható 3-mal, de az utolsó három jegyéből álló 036 nem osztható 8-cal, így 24 ∤ 36. Mindig relatív prím tényezőpárra bontsunk (pl. prímhatványokra)!"
          tip="Bontsd az osztót prímhatványok szorzatára (24 = 2³ · 3), és mindegyik prímhatványra külön alkalmazd a szabályt."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Összetett oszthatóság ellenőrzése" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a vizsgált szám</label>
              <input
                type="text"
                inputMode="numeric"
                value={numText}
                maxLength={15}
                onChange={(e) => setNumText(e.target.value)}
                className="w-full border border-emerald-300 rounded-lg p-2 font-mono text-lg"
                aria-label="vizsgált szám"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">osztó</label>
              <div className="flex flex-wrap gap-1.5">
                {DIVISORS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDivisor(d)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${divisor === d ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-700">
            {divisor} = {parts.join(' · ')} {parts.length > 1 ? '(páronként relatív prímek)' : '(prímhatvány)'}
          </div>
          <div className="space-y-2">
            {checks.map((c) => (
              <div key={c.part} className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border p-2.5 text-sm ${c.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <span><strong>{c.part} | {digits}?</strong> – {c.rule}</span>
                <span className="font-mono text-xs">{c.detail} ⇒ {c.ok ? 'igen' : 'nem'}</span>
              </div>
            ))}
          </div>
          <div className={`rounded-xl p-3 font-bold text-center ${allOk ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
            {allOk ? `${digits} osztható ${divisor}-vel/-val` : `${digits} nem osztható ${divisor}-vel/-val`}
            {allOk === realOk ? ' ✓ (osztással ellenőrizve)' : ''}
          </div>
          <p className="text-xs text-slate-500">Próbáld ki: 765 és 2900 a 45-tel; 1260 a 36-tal és a 72-vel; 5238 a 18-cal.</p>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Mikor esik egybe két ismétlődő esemény?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((pr) => (
              <button
                key={pr.label}
                onClick={() => {
                  setP(pr.p);
                  setA(pr.a);
                  setQ(pr.q);
                  setB(pr.b);
                  setNames([pr.nameA, pr.nameB]);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {pr.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600">1. esemény ({names[0]}): {p} évente</label>
              <input type="range" min="2" max="12" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-purple-600" aria-label="első periódus" />
              <label className="block text-xs font-semibold text-slate-600">egyszer volt: {a}</label>
              <input type="range" min="1990" max="2020" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full accent-purple-600" aria-label="első kezdőév" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600">2. esemény ({names[1]}): {q} évente</label>
              <input type="range" min="2" max="12" value={q} onChange={(e) => setQ(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="második periódus" />
              <label className="block text-xs font-semibold text-slate-600">egyszer volt: {b}</label>
              <input type="range" min="1990" max="2020" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="második kezdőév" />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-2">
            <div>
              ({p}; {q}) = {g}, [{p}; {q}] = <strong>{L}</strong>. A két kezdőév különbsége {Math.abs(a - b)}, ami {possible ? '' : 'nem '}osztható {g}-vel/-val.
            </div>
            {possible ? (
              <div>
                Közös évek {from}-tól/-től: <strong>{common.join(', ')}</strong> – ezután {L} évente ismétlődnek.
              </div>
            ) : (
              <div className="font-bold text-rose-700">A két esemény soha nem esik ugyanarra az évre!</div>
            )}
          </div>
          <TheoryCallout type="tip" title="Miért?">
            Ha a két esemény egybeesik egy évben, akkor attól kezdve pontosan az lkkt lépésenként esik újra egybe. Egybeesés csak akkor lehetséges, ha a kezdőévek különbsége osztható a periódusok lnko-jával – két 5 éves ciklusnál a különbségnek 5 többszörösének kellene lennie (2017 − 2004 = 13 nem az).
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DivisibilityProblemsTheory;
