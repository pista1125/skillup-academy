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
  NumberTheoryExamExponentTableSvg,
  NumberTheoryExamDigitsSvg,
  NumberTheoryExamCalendarSvg,
  NumberTheoryExamBaseConversionSvg,
  NumberTheoryExamNumberSetsSvg,
  NumberTheoryExamTheodorusSvg
} from './NumberTheoryPracticeExamFigures';

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sup = (e: number) => String(e).split('').map((d) => SUP[Number(d)]).join('');
const sub = (e: number) => String(e).split('').map((d) => SUB[Number(d)]).join('');

/** Prímtényezős felbontás: [prím, kitevő] párok. */
const factor = (n: number): [number, number][] => {
  const res: [number, number][] = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e > 0) res.push([p, e]);
  }
  if (m > 1) res.push([m, 1]);
  return res;
};

const showFactor = (f: [number, number][]): string => (f.length === 0 ? '1' : f.map(([p, e]) => (e > 1 ? `${p}${sup(e)}` : `${p}`)).join(' · '));

const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const DIGITS = '0123456789ABCDEF';

export const NumberTheoryPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: LNKO, LKKT, osztók száma
  const [aText, setAText] = useState<string>('240');
  const [bText, setBText] = useState<string>('756');
  const a = Number(aText.trim());
  const b = Number(bText.trim());
  const valid = Number.isInteger(a) && Number.isInteger(b) && a >= 2 && b >= 2 && a <= 1e7 && b <= 1e7;
  const fa = valid ? factor(a) : [];
  const fb = valid ? factor(b) : [];
  const primes = Array.from(new Set([...fa.map(([p]) => p), ...fb.map(([p]) => p)])).sort((x, y) => x - y);
  const expOf = (f: [number, number][], p: number) => f.find(([q]) => q === p)?.[1] ?? 0;
  const gcdF: [number, number][] = primes.map((p) => [p, Math.min(expOf(fa, p), expOf(fb, p))] as [number, number]).filter(([, e]) => e > 0);
  const lcmF: [number, number][] = primes.map((p) => [p, Math.max(expOf(fa, p), expOf(fb, p))] as [number, number]).filter(([, e]) => e > 0);
  const val = (f: [number, number][]) => f.reduce((acc, [p, e]) => acc * Math.pow(p, e), 1);
  const gcdV = val(gcdF);
  const lcmV = val(lcmF);
  const divCount = (f: [number, number][]) => f.reduce((acc, [, e]) => acc * (e + 1), 1);

  // Labor II: számrendszer-átváltó
  const [numText, setNumText] = useState<string>('53');
  const [base, setBase] = useState<number>(2);
  const N = Number(numText.trim());
  const validN = Number.isInteger(N) && N >= 1 && N <= 1e9;
  const steps: { n: number; q: number; r: number }[] = [];
  if (validN) {
    let m = N;
    while (m > 0) {
      steps.push({ n: m, q: Math.floor(m / base), r: m % base });
      m = Math.floor(m / base);
    }
  }
  const converted = steps
    .map((s) => DIGITS[s.r])
    .reverse()
    .join('');
  const expansion = converted
    .split('')
    .map((d, i) => `${DIGITS.indexOf(d)} · ${base}${sup(converted.length - 1 - i)}`)
    .join(' + ');

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="gyakorlas-tudasproba"
      title="11. Gyakorlás, tudáspróba"
      subtitle="A számelmélet fejezet összefoglalása: számhalmazok, osztók és prímek, LNKO és LKKT, oszthatósági szabályok, logika, számrendszerek, irracionális számok – gyakorló feladatok és két tudáspróba megoldással."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_szamelmelet_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a számelmélet tudáspróbára?"
      practiceSubtitle="Mérd fel tudásodat a fejezet egészét átfogó, 3 szintre bontott, 90 kérdéses kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — SZÁMELMÉLET ÖSSZEFOGLALÓ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              (a; b): kisebbik kitevők;  [a; b]: nagyobbik kitevők;  (a; b) · [a; b] = a · b
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Oszthatóság:</strong> 2, 4, 8 és 5, 25, 125 – az utolsó 1, 2, 3 jegy; 3 és 9 – a számjegyek összege; 11 – a váltakozó előjelű számjegyösszeg.
              </li>
              <li>
                Összetett osztó: <strong>relatív prím</strong> tényezőkre bontva vizsgáljuk (15 = 3 · 5, 24 = 3 · 8); 6 | n és 8 | n-ből csak 24 | n következik.
              </li>
              <li>
                <strong>Számrendszerek:</strong> átváltás tízesbe helyiérték-táblázattal, tízesből ismételt maradékos osztással.
              </li>
              <li>
                <strong>Irracionális</strong> az a valós szám, amely nem írható fel két egész szám hányadosaként: tizedes tört alakja végtelen, nem szakaszos.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. A fejezet összefoglalása" badge="Ismétlés" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Számhalmazok (1. és 10. lecke)" badge="N ⊂ Z ⊂ Q ⊂ R" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>N zárt az összeadásra és a szorzásra, Z a kivonásra is, Q mind a négy alapműveletre (0-val nem osztunk).</li>
              <li>Az egyszerűsített tört tizedes tört alakja véges ⇔ a nevezőben csak 2 és 5 prímtényező van; különben végtelen szakaszos.</li>
              <li>Irracionális: √2, √3, √5, π, 0,1211221112…; a √4 = 2 viszont racionális.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Osztó, többszörös, prím (2. lecke)" badge="a | b" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>a | b: van olyan c pozitív egész, hogy a · c = b.</li>
              <li>Prím: pontosan 2 pozitív osztója van; összetett: 2-nél több. Az 1 egyik sem; egyetlen páros prím a 2.</li>
              <li>A prímtényezős felbontás egyértelmű; n = p₁^α₁ · … · pₖ^αₖ osztóinak száma (α₁ + 1) · … · (αₖ + 1).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="LNKO, LKKT (3. lecke)" badge="(a; b), [a; b]" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>LNKO: a közös prímtényezők a legkisebb kitevőn; LKKT: minden prímtényező a legnagyobb kitevőn.</li>
              <li>Relatív prímek: (a; b) = 1, pl. 8 és 15.</li>
              <li>Szöveges feladatok: egyenlő szétosztás → LNKO; egyszerre ismétlődő események → LKKT.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Oszthatósági szabályok, maradékok (4–6. lecke)" badge="Szabályok" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Maradékokkal számolhatunk: az összeg (szorzat) maradéka a maradékok összegének (szorzatának) maradéka.</li>
              <li>Ha a | b és a | c, akkor a | b + c; ha a | b, akkor a | k · b.</li>
              <li>Ismeretlen számjegy (3A407B): a szabályokból egyenként szűrjük a lehetőségeket.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Oszthatóság és logika (5. lecke)" badge="és, vagy, ha… akkor" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>„p és q” csak akkor igaz, ha mindkettő igaz; „p vagy q” akkor hamis, ha mindkettő hamis.</li>
              <li>„Minden …” tagadása: „Van olyan …, amely nem …”.</li>
              <li>A „ha A, akkor B” megfordítása „ha B, akkor A” – logikai értéke eltérhet.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Számrendszerek (7–8. lecke)" badge="alapszám" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>n alapú számrendszerben n számjegy van: 0, 1, …, n − 1 (12-esben A = 10, B = 11; 16-osban F = 15).</li>
              <li>1201₃ = 1 · 27 + 2 · 9 + 0 · 3 + 1 = 46; 53 = 110101₂.</li>
              <li>A 2-es szám 3-asával csoportosítva 8-as, 4-esével 16-os számrendszerbe írható át.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="mt-4">
          <NumberTheoryExamNumberSetsSvg />
        </div>
      </TheorySection>

      {/* 2. Feladat 1 és 4 */}
      <TheorySection title="2. Gyakorló feladatok: LNKO és LKKT prímtényezős alakban (1. és 4. feladat)" badge="Tankönyv 156. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryCard title="1. K = 2⁴ · 3 · 5 = 240 és L = 2² · 3³ · 7 = 756" badge="Megoldás" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  a) (K; L) = 2² · 3 = 12, [K; L] = 2⁴ · 3³ · 5 · 7 = 15 120, összegük <strong>15 132</strong>.
                </li>
                <li>
                  b) Négyzetszámban minden kitevő páros: L · M-ben a 3³ és a 7 kitevőjét kell párossá tenni, pl. <strong>M = 3 · 7 = 21</strong> (L · 21 = 2² · 3⁴ · 7²).
                </li>
                <li>
                  c) [K; N] = 2⁴ · 3³ · 5² · 7³: N-ben 3³, 5², 7³ kell, a 2 kitevője 0–4 lehet, pl. <strong>N = 3³ · 5² · 7³</strong>.
                </li>
              </ul>
            </TheoryCard>
            <TheoryCard title="4. Határozd meg b-t!" badge="Megoldás" badgeColor="sky">
              <p>a = 2³ · 3² · 5⁴ · 7; [a; b] = 2³ · 3⁴ · 5⁶ · 7² · 11; (a; b) = 2 · 3² · 5⁴ · 7.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                <li>2: a-ban 3, az LNKO-ban 1 ⇒ b-ben 1 (az LKKT-ban 3 – stimmel).</li>
                <li>3: az LNKO-ban 2 = a kitevője ⇒ b-ben a nagyobb, 4.</li>
                <li>5: b-ben 6; 7: b-ben 2; 11: b-ben 1.</li>
              </ul>
              <p className="mt-1">
                <strong>b = 2 · 3⁴ · 5⁶ · 7² · 11</strong>
              </p>
            </TheoryCard>
          </div>
          <NumberTheoryExamExponentTableSvg />
        </div>
      </TheorySection>

      {/* 3. Feladat 2, 3 */}
      <TheorySection title="3. Gyakorló feladatok: oszthatóság, igaz–hamis (2. és 3. feladat)" badge="Tankönyv 156. o." badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="2. n < 30, teljesüljön az oszthatóság!" badge="Maradékok" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>a) 4 | 132 457 + n: 57 négyes maradéka 1, ezért n maradéka 3 ⇒ n = 3; 7; 11; 15; 19; 23; 27.</li>
              <li>b) 9 | 3471 − 2n: a számjegyösszeg 15, így 3471 kilences maradéka 6 ⇒ 2n maradéka is 6 ⇒ n = 3; 12; 21.</li>
              <li>c) 5 | 1516 + 7n: 1 + 7n végződése 0 vagy 5 ⇒ n = 2; 7; 12; 17; 22; 27.</li>
              <li>d) 15 | 6n − 42 = 6(n − 7): 5 | n − 7 ⇒ n = 7; 12; 17; 22; 27 (ha 6n − 42 ≥ 0).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Igaz vagy hamis?" badge="Indoklás" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>a) Különböző prímek relatív prímek: <strong>igaz</strong>, közös osztójuk csak az 1.</li>
              <li>b) 5 egymást követő természetes szám szorzata osztható 10-zel: <strong>igaz</strong>, van köztük páros és 5-tel osztható.</li>
              <li>c) Prím és összetett szám relatív prímek: <strong>hamis</strong>, pl. 3 és 6.</li>
              <li>d) Az első 10 prím összege páros: <strong>hamis</strong>, 2 + 3 + … + 29 = 129.</li>
              <li>e) Van páratlan sok osztójú szám: <strong>igaz</strong>, a négyzetszámok, pl. a 9 osztói 1, 3, 9.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Feladat 5, 6 */}
      <TheorySection title="4. Gyakorló feladatok: logika, számrendszerek, törtek (5. és 6. feladat)" badge="Tankönyv 156. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="5. Kijelentések" badge="Logika" badgeColor="violet">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>p: 53 = 110101₂ – <strong>igaz</strong> (32 + 16 + 4 + 1).</li>
                <li>q: 27 háromjegyű szám van a hármas számrendszerben – <strong>hamis</strong>: 100₃ = 9-től 222₃ = 26-ig 18 darab.</li>
                <li>r: van olyan alap, ahol 16 · 5 = 106 – <strong>igaz</strong>: (n + 6) · 5 = n² + 6 ⇒ n² − 5n − 24 = 0 ⇒ n = 8.</li>
                <li>s: n alapnál a legnagyobb számjegy n − 1 – <strong>igaz</strong>.</li>
                <li>b) „53 = 101011₂” nem a p tagadása (a tagadás: „az 53 kettes alakja nem 110101”), ráadásul 101011₂ = 43.</li>
                <li>c) p vagy q: igaz; p és r: igaz; q és s: hamis; q vagy s: igaz.</li>
                <li>d) Megfordítás: „Ha egy számrendszerben a legnagyobb számjegy n − 1, akkor az alapja n.” – igaz.</li>
              </ul>
            </TheoryCard>
          </div>
          <TheoryCard title="6. Törtek: 12/A; B/18; 51/C; 72/D" badge="Törtek" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>a) 12/A végtelen szakaszos: A = 7 vagy 9 (12/9 = 4/3).</li>
              <li>e) 12/A véges: A = 1; 2; 3; 4; 5; 6; 8.</li>
              <li>b) 20-nál kisebb összetett számok: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18 – mind osztható 2-vel vagy 3-mal, így mind a 10 esetben egyszerűsíthető.</li>
              <li>c) 51 = 3 · 17, ezért C = 2 · 17 = 34: 51/34 = 3/2 = 1,5.</li>
              <li>d) 72 = 2³ · 3² ⇒ D = 2 vagy 3.</li>
              <li>f) A B/18 bármelyik másikkal: 12 és 18, 51 és 18, 72 és 18 közös osztója biztosan nagyobb 1-nél.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Tudáspróba I */}
      <TheorySection title="5. Tudáspróba I. – megoldások" badge="Tankönyv 157. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm">
            <TheoryCard title="1. 3A407B osztható legyen a) 4-gyel; b) 15-tel" badge="Szabályok" badgeColor="emerald">
              <p>a) 4 | 7B ⇒ B = 2 vagy 6, A tetszőleges (20 szám). b) B = 0: A = 1; 4; 7; B = 5: A = 2; 5; 8 (6 szám).</p>
            </TheoryCard>
            <TheoryCard title="2. Gyógyfürdő: 45, 18 és 30 naponta" badge="LKKT" badgeColor="sky">
              <p>[45; 18; 30] = 90 nap; 90 = 12 · 7 + 6, a szombat után 6 nappal <strong>péntek</strong> van – a barátnak igaza volt.</p>
            </TheoryCard>
            <TheoryCard title="3. Átváltások" badge="Számrendszer" badgeColor="violet">
              <p>a) 1201₃ = 46; b) 53 = 110101₂.</p>
            </TheoryCard>
            <TheoryCard title="4. Igaz-e?" badge="Indoklás" badgeColor="rose">
              <ul className="list-disc pl-5 space-y-1">
                <li>a) Hamis: a 0 és az 1 se nem prím, se nem összetett.</li>
                <li>b) Igaz: ababab = ab · 10 101 = ab · 3 · 7 · 13 · 37 (számjegyösszeg 3(a + b)).</li>
                <li>c) Igaz: 2 · 3 · 5 · 7 = 210 többszöröse, pl. 1050.</li>
                <li>d) Igaz (pozitív egészekre): a közös osztó mindkét számnak osztója, így nem nagyobb a kisebbiknél.</li>
                <li>e) Hamis: 5 | 15, de 10 ∤ 15 – csak a „ha 10 | n, akkor 5 | n” irány igaz.</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="5. Raktár: 2100 doboz csempe, 450 léc, 735 zsák cement" badge="LNKO" badgeColor="amber">
              <p>
                2100 = 2² · 3 · 5² · 7; 450 = 2 · 3² · 5²; 735 = 3 · 5 · 7² ⇒ LNKO = 3 · 5 = <strong>15</strong> lerakat; mindegyik 140 doboz csempét, 30 lécet és 49 zsák cementet kap.
              </p>
            </TheoryCard>
          </div>
          <div className="space-y-4">
            <NumberTheoryExamDigitsSvg />
            <NumberTheoryExamCalendarSvg />
          </div>
        </div>
      </TheorySection>

      {/* 6. Tudáspróba II */}
      <TheorySection title="6. Tudáspróba II. – megoldások" badge="Tankönyv 157. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm">
            <TheoryCard title="1. a = 3⁵ · 5² · 7³; (a; b) = 3³ · 5² · 7³; [a; b] = 3⁵ · 5² · 7³" badge="Kitevők" badgeColor="emerald">
              <p>
                [a; b] = a, tehát b | a; az LNKO pedig maga b. Így <strong>b = 3³ · 5² · 7³</strong>.
              </p>
            </TheoryCard>
            <TheoryCard title="2. A138B2 osztható legyen a) 4-gyel; b) 24-gyel" badge="Szabályok" badgeColor="sky">
              <p>
                a) 4 | B2 ⇒ B = 1; 3; 5; 7; 9, A = 1…9. b) 24 = 3 · 8: 8 | 8B2 ⇒ B = 3 (832) vagy 7 (872); 3 | 14 + A + B ⇒ B = 3: A = 1; 4; 7, B = 7: A = 3; 6; 9.
              </p>
            </TheoryCard>
            <TheoryCard title="3. Sportklub" badge="Maradékok" badgeColor="violet">
              <p>
                A létszám 2, 3, 4, 5, 6-tal osztva 1 maradékot ad ⇒ [2; 3; 4; 5; 6] = 60 többszöröse + 1: 61, 121, 181, … A 11-gyel osztható legkisebb: <strong>121</strong> (11 sor × 11 fő).
              </p>
            </TheoryCard>
            <TheoryCard title="4. 11021₃ → kettes számrendszer" badge="Számrendszer" badgeColor="teal">
              <p>11021₃ = 81 + 27 + 0 + 6 + 1 = 115 = 1110011₂.</p>
            </TheoryCard>
            <TheoryCard title="5. Kijelentések" badge="Logika" badgeColor="rose">
              <ul className="list-disc pl-5 space-y-1">
                <li>A: 38/22 = 19/11 végtelen szakaszos – igaz. B: 6 | n és 8 | n ⇒ 48 | n – hamis (24). C: végtelen sok prím van – igaz. D: hamis (2 + 3 = 5). E: hamis, a p prím nem relatív prím a 2p összetett számhoz.</li>
                <li>B megfordítása: „Ha egy természetes szám osztható 48-cal, akkor osztható 6-tal és 8-cal.” – igaz.</li>
                <li>D tagadása: „Nem igaz, hogy bármely két prímszám összege páros.” / „Van két olyan prímszám, amelyek összege páratlan.”</li>
                <li>A vagy D: igaz; C és E: hamis.</li>
              </ul>
            </TheoryCard>
          </div>
          <div className="space-y-4">
            <NumberTheoryExamBaseConversionSvg />
            <NumberTheoryExamTheodorusSvg />
            <TheoryCallout type="info" title="Irracionális hosszúságú szakaszok">
              A Pitagorasz-tétellel √n hosszú szakasz szerkeszthető: az 1 és 1 befogójú háromszög átfogója √2, az új 1 egységes befogóval √3, és így tovább (Theodorus-spirál). A 2 és 1 befogójú háromszög átfogója √5.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: összetett osztó szétbontása nem relatív prím tényezőkre" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ha egy szám osztható 6-tal és 8-cal, akkor osztható 48-cal?"
          wrong="6 · 8 = 48, tehát 48 | n"
          wrongExplanation="A 6 és a 8 nem relatív prímek (közös osztójuk a 2), így a szorzatukkal való oszthatóság nem következik. Ellenpélda: 24 osztható 6-tal és 8-cal, de 48-cal nem."
          correct="6 | n és 8 | n ⇒ [6; 8] = 24 | n"
          correctExplanation="Két oszthatóságból a legkisebb közös többszörössel való oszthatóság következik. A szorzattal csak akkor, ha a két osztó relatív prím: 3 | n és 8 | n ⇒ 24 | n."
          tip="Összetett osztónál bonts relatív prím tényezőkre: 24 = 3 · 8 (nem 4 · 6!), 15 = 3 · 5, 60 = 3 · 4 · 5."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: LNKO, LKKT és az osztók száma" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a (2 és 10 000 000 közötti egész)</label>
              <input type="text" value={aText} onChange={(e) => setAText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 font-mono" aria-label="a szám" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">b (2 és 10 000 000 közötti egész)</label>
              <input type="text" value={bText} onChange={(e) => setBText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-emerald-200 font-mono" aria-label="b szám" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['240', '756'],
              ['2100', '450'],
              ['45', '18'],
              ['12', '18'],
              ['8', '15'],
              ['360', '588']
            ].map(([x, y]) => (
              <button
                key={`${x}-${y}`}
                onClick={() => {
                  setAText(x);
                  setBText(y);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              >
                {x} és {y}
              </button>
            ))}
          </div>
          {!valid ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Adj meg két 2 és 10 000 000 közötti egész számot!</div>
          ) : (
            <div className="space-y-3">
              <TheoryTable
                headers={['prím', ...primes.map(String)]}
                rows={[
                  [`a = ${fmt(a)}`, ...primes.map((p) => String(expOf(fa, p)))],
                  [`b = ${fmt(b)}`, ...primes.map((p) => String(expOf(fb, p)))],
                  ['(a; b) – kisebbik', ...primes.map((p) => String(Math.min(expOf(fa, p), expOf(fb, p))))],
                  ['[a; b] – nagyobbik', ...primes.map((p) => String(Math.max(expOf(fa, p), expOf(fb, p))))]
                ]}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-1">
                  <div className="font-bold text-emerald-800">Prímtényezős alak</div>
                  <div>a = {showFactor(fa)}</div>
                  <div>b = {showFactor(fb)}</div>
                </div>
                <div className="bg-sky-50 rounded-xl border border-sky-200 p-4 space-y-1">
                  <div className="font-bold text-sky-800">LNKO és LKKT</div>
                  <div>
                    (a; b) = {showFactor(gcdF)} = <strong>{fmt(gcdV)}</strong>
                  </div>
                  <div>
                    [a; b] = {showFactor(lcmF)} = <strong>{fmt(lcmV)}</strong>
                  </div>
                  <div>{gcdV === 1 ? 'a és b relatív prímek' : 'a és b nem relatív prímek'}</div>
                </div>
                <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 space-y-1">
                  <div className="font-bold text-violet-800">Ellenőrzés, osztók száma</div>
                  <div>
                    (a; b) · [a; b] = {fmt(gcdV * lcmV)} = a · b {gcdV * lcmV === a * b ? '✓' : ''}
                  </div>
                  <div>a pozitív osztóinak száma: {divCount(fa)}</div>
                  <div>b pozitív osztóinak száma: {divCount(fb)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: számrendszer-átváltó" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">tízes számrendszerbeli szám (1 – 1 000 000 000)</label>
              <input type="text" value={numText} onChange={(e) => setNumText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-teal-200 font-mono" aria-label="szám" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">az új számrendszer alapszáma: {base}</label>
              <input type="range" min={2} max={16} value={base} onChange={(e) => setBase(Number(e.target.value))} className="w-full accent-teal-600" aria-label="alapszám" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['53', 2],
              ['46', 3],
              ['115', 2],
              ['1347', 12],
              ['214', 16],
              ['70', 8]
            ].map(([x, y]) => (
              <button
                key={`${x}-${y}`}
                onClick={() => {
                  setNumText(String(x));
                  setBase(Number(y));
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100"
              >
                {x} → {y}-es
              </button>
            ))}
          </div>
          {!validN ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Adj meg egy 1 és 1 000 000 000 közötti egész számot!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1 font-mono">
                <div className="font-bold text-teal-800 font-sans">Ismételt maradékos osztás {base}-vel</div>
                {steps.map((s, i) => (
                  <div key={i}>
                    {fmt(s.n)} : {base} = {fmt(s.q)}, maradék {s.r}
                    {s.r > 9 ? ` (= ${DIGITS[s.r]})` : ''}
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-2">
                <div className="font-bold text-emerald-800">Eredmény (a maradékok alulról felfelé)</div>
                <div className="text-2xl font-mono font-black text-emerald-900">
                  {fmt(N)} = {converted}
                  {sub(base)}
                </div>
                <div className="text-xs text-slate-600">Visszaellenőrzés helyi értékekkel: {expansion} = {fmt(N)}</div>
                <div className="text-xs text-slate-600">
                  Jegyek száma: {converted.length}; a legnagyobb felhasználható számjegy: {DIGITS[base - 1]}
                </div>
              </div>
            </div>
          )}
          <TheoryCallout type="tip" title="Próbáld ki!">
            Írd át a 115-öt kettesbe, majd a 46-ot hármasba: a Tudáspróba 3. és 4. feladatának eredményét kapod. A 214 tizenhatos alakja D6₁₆ – ugyanez kettesben 1101 0110₂, négyesével csoportosítva.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumberTheoryPracticeExamTheory;
