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
  PowersReviewDefinitionSvg,
  PowersReviewLadderSvg,
  PowersReviewIdentitiesSvg,
  PowersReviewMagicSquareSvg,
  PowersReviewOrderingSvg
} from './PowersReviewFigures';

/** Hatvány írásmód: alap + felső index. */
const P: React.FC<{ b: React.ReactNode; e: React.ReactNode }> = ({ b, e }) => (
  <span className="whitespace-nowrap">
    {b}
    <sup>{e}</sup>
  </span>
);

const fmt = (x: number, d = 6) => {
  if (!Number.isFinite(x)) return '–';
  if (x !== 0 && (Math.abs(x) >= 1e9 || Math.abs(x) < 1e-6)) {
    const [m, e] = x.toExponential(4).split('e');
    return `${m.replace('.', ',').replace('-', '−')} · 10^${Number(e)}`;
  }
  const s = Number(x.toFixed(d)).toString();
  return s.replace('.', ',').replace('-', '−');
};

/** Racionális szám tört alakja egész alapú hatványhoz: p/q. */
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const powerFraction = (base: number, n: number): string => {
  if (base === 0) return n > 0 ? '0' : 'nincs értelmezve';
  const abs = Math.abs(base);
  const k = Math.abs(n);
  const big = Math.pow(abs, k);
  if (!Number.isSafeInteger(big)) return '';
  const sign = base < 0 && k % 2 === 1 ? '−' : '';
  if (n >= 0) return `${sign}${big.toLocaleString('hu-HU')}`;
  return `${sign}1/${big.toLocaleString('hu-HU')}`;
};

// Labor II – bűvös négyzet. null = kitöltendő mező.
const MAGIC_GIVEN: (number | null)[][] = [
  [null, 22, 18],
  [null, 15, null],
  [null, 8, null]
];
const MAGIC_SOLUTION = [
  [5, 22, 18],
  [28, 15, 2],
  [12, 8, 25]
];
const ENGLISH: Record<number, string> = {
  5: 'five',
  22: 'twenty-two',
  18: 'eighteen',
  28: 'twenty-eight',
  15: 'fifteen',
  2: 'two',
  12: 'twelve',
  8: 'eight',
  25: 'twenty-five'
};

export const PowersReviewTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: hatvány-felfedező
  const [base, setBase] = useState<number>(-2);
  const [exp, setExp] = useState<number>(-3);
  const value = base === 0 && exp <= 0 ? NaN : Math.pow(base, exp);
  const factors = Math.abs(exp) <= 8 && Math.abs(exp) >= 2 ? Array.from({ length: Math.abs(exp) }, () => (base < 0 ? `(${base})` : `${base}`)).join(' · ') : '';
  const signText =
    base === 0
      ? exp > 0
        ? 'A 0 pozitív kitevős hatványa 0.'
        : exp === 0
          ? '0⁰ nem értelmezett.'
          : '0 negatív kitevős hatványa nincs értelmezve (0-val nem lehet osztani).'
      : base > 0
        ? 'Pozitív alap ⇒ minden egész kitevőre pozitív hatvány.'
        : exp % 2 === 0
          ? 'Negatív alap, páros kitevő ⇒ pozitív hatvány.'
          : 'Negatív alap, páratlan kitevő ⇒ negatív hatvány.';
  const sizeText =
    !Number.isFinite(value) || base === 0
      ? ''
      : Math.abs(value) > 1
        ? 'abszolút értéke 1-nél nagyobb'
        : Math.abs(value) === 1
          ? 'abszolút értéke pontosan 1'
          : 'abszolút értéke 1-nél kisebb';

  // Labor II: bűvös négyzet
  const [cells, setCells] = useState<string[][]>(MAGIC_GIVEN.map((row) => row.map((v) => (v === null ? '' : String(v)))));
  const num = (r: number, c: number) => {
    const t = cells[r][c].trim();
    return t === '' ? NaN : Number(t.replace('−', '-'));
  };
  const lines: { name: string; idx: [number, number][] }[] = [
    { name: '1. sor', idx: [[0, 0], [0, 1], [0, 2]] },
    { name: '2. sor', idx: [[1, 0], [1, 1], [1, 2]] },
    { name: '3. sor', idx: [[2, 0], [2, 1], [2, 2]] },
    { name: '1. oszlop', idx: [[0, 0], [1, 0], [2, 0]] },
    { name: '2. oszlop', idx: [[0, 1], [1, 1], [2, 1]] },
    { name: '3. oszlop', idx: [[0, 2], [1, 2], [2, 2]] },
    { name: 'főátló', idx: [[0, 0], [1, 1], [2, 2]] },
    { name: 'mellékátló', idx: [[0, 2], [1, 1], [2, 0]] }
  ];
  const lineSums = lines.map((l) => l.idx.reduce((s, [r, c]) => s + num(r, c), 0));
  const solved = lineSums.every((s) => s === 45);
  const setCell = (r: number, c: number, v: string) =>
    setCells((prev) => prev.map((row, i) => row.map((x, j) => (i === r && j === c ? v : x))));

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="hatvanyozas-ismetles"
      title="1. Hatványozás – ismétlés"
      subtitle="Egész kitevőjű hatványok: értelmezés (pozitív, nulla és negatív kitevő), a hatványazonosságok, számolás 2 és 3 hatványaival – és egy szabadulószoba, amelynek kódját hatványokkal fejthetjük meg."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_hatvanyozas_ismetles_tananyag.pdf"
      practiceTitle="Készen állsz a hatványozásos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — EGÉSZ KITEVŐJŰ HATVÁNYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center space-y-1">
              <div className="font-mono text-sm font-black text-violet-900 dark:text-violet-200">
                a⁰ = 1 (a ≠ 0) · a⁻ⁿ = (1/a)ⁿ = 1/aⁿ (a ≠ 0)
              </div>
              <div className="font-mono text-sm font-black text-violet-900 dark:text-violet-200">
                aᵐ · aⁿ = aᵐ⁺ⁿ · aᵐ : aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐⁿ · (ab)ⁿ = aⁿbⁿ · (a/b)ⁿ = aⁿ/bⁿ
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Negatív kitevő ≠ negatív szám: 2⁻³ = 1/8 &gt; 0. A kitevő az alap reciprokára vonatkozik.</li>
              <li>Negatív alapnál a zárójel számít: (−3)² = 9, de −3² = −9.</li>
              <li>0⁰ nem értelmezett, és a 0-nak negatív kitevős hatványa sincs.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a szabadulószoba lakatja" badge="Tankönyv 80. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy szabadulószoba kulcsa egy lakattal zárt ládában van; a háromjegyű kódot hatványokkal lehet megfejteni. Először a megadott számokat kell
              <strong> 2 hatványaként</strong> felírni: <P b="4" e="11" /> = <P b="(2²)" e="11" /> = <P b="2" e="22" />, <P b="512" e="2" /> = <P b="(2⁹)" e="2" /> = <P b="2" e="18" />,
              <P b="32" e="3" /> = <P b="2" e="15" />, <P b="16" e="2" /> = <P b="2" e="8" />.
            </p>
            <p>
              A 3 × 3-as táblázatot úgy kell kiegészíteni 2 hatványaival, hogy minden sorban, oszlopban és átlóban <strong>ugyanannyi legyen a szorzat</strong>.
              Mivel <P b="2" e="a" /> · <P b="2" e="b" /> · <P b="2" e="c" /> = <P b="2" e="a+b+c" />, elég a <strong>kitevőket összeadni</strong>: a középső oszlopból 22 + 15 + 8 = 45 a bűvös összeg.
            </p>
            <p>
              A kitevők angol nevének betűszámai (five = 4, twenty-two = 9, …) ismét bűvös négyzetet adnak (összeg 21). Számjegyeik összege 45, és
              <strong> 45⁻¹ = 1/45 = 0,0222…</strong>, így a kód: <strong>022</strong>. Kipróbálhatod a II. laborban!
            </p>
          </div>
          <PowersReviewMagicSquareSvg />
        </div>
      </TheorySection>

      {/* 2. Értelmezés */}
      <TheorySection title="2. Az egész kitevőjű hatvány értelmezése" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PowersReviewDefinitionSvg />
          <TheoryCard title="Definíciók" badge="Értelmezés" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Ha a valós szám és n 1-nél nagyobb természetes szám, akkor <P b="a" e="n" /> olyan n tényezős szorzat, amelynek minden tényezője a.</li>
              <li>Bármely valós szám első hatványa önmaga: <P b="a" e="1" /> = a.</li>
              <li>Bármely 0-tól különböző valós szám nulladik hatványa 1: <P b="a" e="0" /> = 1. (<P b="0" e="0" /> nem értelmezett.)</li>
              <li>
                Egy 0-tól különböző szám negatív egész kitevős hatványa: az <strong>alap reciprokát</strong> a kitevő ellentettjére emeljük:
                <P b=" a" e="−n" /> = <P b="(1/a)" e="n" /> = 1/<P b="a" e="n" />.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <PowersReviewLadderSvg />
      </TheorySection>

      {/* 3. Azonosságok */}
      <TheorySection title="3. A hatványazonosságok" badge="Azonosságok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PowersReviewIdentitiesSvg />
          <div className="space-y-3">
            <TheoryTable
              headers={['Azonosság', 'Képlet', 'Feltétel']}
              rows={[
                ['azonos alapú hatványok szorzata', 'aᵐ · aⁿ = aᵐ⁺ⁿ', '–'],
                ['azonos alapú hatványok hányadosa', 'aᵐ : aⁿ = aᵐ⁻ⁿ', 'a ≠ 0'],
                ['hatvány hatványa', '(aᵐ)ⁿ = aᵐ·ⁿ', '–'],
                ['szorzat hatványa', '(a · b)ⁿ = aⁿ · bⁿ', '–'],
                ['hányados hatványa', '(a / b)ⁿ = aⁿ / bⁿ', 'b ≠ 0']
              ]}
            />
            <TheoryCallout type="info" title="Mikor érvényesek?">
              a, b ∈ R és m, n ∈ Z esetén, ha a kifejezésekben szereplő minden hatványnak van értelme. Az azonosságokat pozitív egész kitevőkre bizonyítottuk, majd
              kiterjesztettük egész kitevőkre – a negatív kitevő definíciója éppen úgy van megválasztva, hogy az azonosságok érvényben maradjanak.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Tankönyv 81–82. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Melyik nagyobb? (1. feladat)" badge="Számológép nélkül" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> <P b="2" e="−3" /> = 1/8 és <P b="3" e="−2" /> = 1/9 ⇒ <strong><P b="2" e="−3" /> a nagyobb</strong>.</li>
              <li><strong>b)</strong> <P b="5" e="−2" /> = 1/25 &gt; 0, míg −<P b="5" e="2" /> = −25 ⇒ <strong><P b="5" e="−2" /></strong>.</li>
              <li><strong>c)</strong> <P b="3" e="−2" /> = 1/9, <P b="(−3)" e="2" /> = 9 ⇒ <strong><P b="(−3)" e="2" /></strong>.</li>
              <li><strong>d)</strong> <P b="(−2)" e="−2" /> = 1/4, <P b="(−3)" e="−2" /> = 1/9 ⇒ <strong><P b="(−2)" e="−2" /></strong>.</li>
              <li><strong>e)</strong> <P b="(−5)" e="−1" /> = −0,2 és <P b="(−1)" e="−5" /> = −1 ⇒ <strong><P b="(−5)" e="−1" /></strong>.</li>
              <li><strong>f)</strong> <P b="7" e="0" /> = 1, <P b="0" e="7" /> = 0 ⇒ <strong><P b="7" e="0" /></strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Írd fel 2 hatványaként! (2. feladat)" badge="Azonosságok" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> <P b="2" e="3" /> · <P b="(2⁻²)" e="−5" /> = <P b="2" e="3" /> · <P b="2" e="10" /> = <strong><P b="2" e="13" /></strong></li>
              <li><strong>b)</strong> <P b="(2⁻³)" e="−1" /> : <P b="(2⁻⁴)" e="−3" /> = <P b="2" e="3" /> : <P b="2" e="12" /> = <strong><P b="2" e="−9" /></strong></li>
              <li><P b="4" e="11" /> = <P b="2" e="22" />; <P b="8" e="−2" /> = <P b="2" e="−6" />; <P b="(1/4)" e="−3" /> = <P b="4" e="3" /> = <P b="2" e="6" /></li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Módszer: minden alapot írj át 2 hatványára, majd alkalmazd a hatvány hatványa, a szorzat és a hányados szabályát.</p>
          </TheoryCard>
          <TheoryCard title="C) Két egész szám hányadosaként (3. feladat)" badge="Negatív kitevő" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              (<P b="3" e="−1" /> − <P b="3" e="−2" />) : 3 = (1/3 − 1/9) : 3 = (2/9) : 3 = <strong>2/27</strong>.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mt-2">
              Helyettesítési érték „ügyesen” (4. feladat): ha a = 123 456, akkor a · <P b="(a²)" e="−1" /> · <P b="a" e="−3" /> : (<P b="(a⁻³)" e="−2" /> · <P b="a" e="−9" />) =
              <P b=" a" e="−4" /> : <P b="a" e="−3" /> = <P b="a" e="−1" /> = <strong>1/123 456</strong> – előbb egyszerűsítünk, csak utána helyettesítünk!
            </p>
          </TheoryCard>
          <TheoryCard title="D) Növekvő sorrend (5. feladat)" badge="Előjel és nagyság" badgeColor="rose">
            <PowersReviewOrderingSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Negatívak: B = <P b="(−3)" e="75" /> (nagy abszolút értékű) és E = <P b="(−3)" e="−75" /> (nagyon közel a 0-hoz) ⇒ B &lt; E.</li>
              <li>Kicsi pozitívak: C = <P b="5" e="−10" /> = 1/<P b="5" e="10" /> &lt; F = <P b="3" e="−10" /> = 1/<P b="3" e="10" />.</li>
              <li>Nagy pozitívak: A = <P b="7" e="80" /> &lt; D = <P b="(2³)" e="80" /> = <P b="8" e="80" />.</li>
              <li><strong>B &lt; E &lt; C &lt; F &lt; A &lt; D</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Melyik valós szám? (HF 3.)" badge="Visszafelé" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><P b="x" e="3" /> = 8/27 ⇒ x = 2/3; <P b="x" e="−1" /> = 1/5 ⇒ x = 5.</li>
              <li><P b="x" e="4" /> = 16/81 ⇒ x = ±2/3 (páros kitevő: két megoldás!).</li>
              <li><P b="x" e="−2" /> = 4/9 ⇒ <P b="x" e="2" /> = 9/4 ⇒ x = ±3/2.</li>
              <li><P b="x" e="0" /> = 1 ⇒ minden x ≠ 0; <P b="x" e="6" /> = −1/64 ⇒ nincs ilyen valós szám.</li>
              <li><P b="x" e="−10" /> = 1024 = <P b="2" e="10" /> ⇒ x = ±1/2.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Igaz vagy hamis? (HF 4.)" badge="Mind igaz!" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Van pozitív szám, amelynek négyzete nagyobb a köbénél: igaz (pl. 0,5² = 0,25 &gt; 0,125).</li>
              <li>Minden negatív szám negyedik hatványa nagyobb a köbénél: igaz (pozitív &gt; negatív).</li>
              <li>Negatív szám negatív kitevős hatványa lehet pozitív: igaz, pl. <P b="(−2)" e="−2" /> = 1/4.</li>
              <li>Van szám, amelynek (−1)-edik hatványa önmaga: igaz, 1 és −1.</li>
              <li>2 minden páros kitevős hatványa 4 hatványa: igaz, <P b="2" e="2k" /> = <P b="4" e="k" />.</li>
              <li>Van negatív szám végtelen sok egyenlő hatvánnyal: igaz, −1 (minden páros hatványa 1).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: negatív kitevő és negatív alap" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A negatív kitevő nem teszi negatívvá a hatványt, a zárójel viszont számít"
          wrong="2⁻³ = −8 vagy 2⁻³ = −6; −3² = 9"
          wrongExplanation="A negatív kitevő a reciprokot jelenti, nem az előjelet: 2⁻³ = 1/2³ = 1/8. A −3² kifejezésben a hatványozás erősebb művelet, mint az előjel: −3² = −(3²) = −9; csak (−3)² = 9."
          correct="2⁻³ = 1/8 > 0; (−3)² = 9, −3² = −9; (−2)⁻³ = −1/8"
          correctExplanation="Az előjelet az alap és a kitevő paritása dönti el: pozitív alap ⇒ mindig pozitív; negatív alap ⇒ páros kitevőnél pozitív, páratlannál negatív (a kitevő előjelétől függetlenül)."
          tip="Ellenőrzés: ha az alap pozitív, a hatvány sosem lehet negatív – akármilyen egész a kitevő."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Hatvány-felfedező" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alap a: {fmt(base)}</label>
              <input
                type="range"
                min="-5"
                max="10"
                step="1"
                value={base}
                onChange={(e) => setBase(Number(e.target.value))}
                className="w-full accent-violet-600"
                aria-label="alap"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kitevő n: {fmt(exp)}</label>
              <input
                type="range"
                min="-8"
                max="8"
                step="1"
                value={exp}
                onChange={(e) => setExp(Number(e.target.value))}
                className="w-full accent-rose-600"
                aria-label="kitevő"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div className="text-lg">
              <P b={base < 0 ? `(${fmt(base)})` : fmt(base)} e={fmt(exp)} /> ={' '}
              {exp < 0 && base !== 0 ? (
                <>
                  <P b={`(1/${base < 0 ? `(${fmt(base)})` : fmt(base)})`} e={fmt(-exp)} /> = 1 / <P b={base < 0 ? `(${fmt(base)})` : fmt(base)} e={fmt(-exp)} /> ={' '}
                </>
              ) : null}
              <strong className="text-violet-700">{powerFraction(base, exp) || fmt(value)}</strong>
              {Number.isFinite(value) && exp < 0 && base !== 0 && <span className="text-slate-500"> ≈ {fmt(value)}</span>}
            </div>
            {factors && exp > 0 && <div className="font-mono text-xs">= {factors}</div>}
            {factors && exp < 0 && base !== 0 && <div className="font-mono text-xs">= 1 / ({factors})</div>}
            <div>{signText}</div>
            {sizeText && <div className="text-xs text-slate-500">A hatvány {sizeText}.</div>}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: '2⁻³', b: 2, e: -3 },
              { name: '3⁻²', b: 3, e: -2 },
              { name: '(−3)²', b: -3, e: 2 },
              { name: '(−2)⁻²', b: -2, e: -2 },
              { name: '(−5)⁻¹', b: -5, e: -1 },
              { name: '7⁰', b: 7, e: 0 },
              { name: '0⁰', b: 0, e: 0 }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setBase(p.b);
                  setExp(p.e);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-100 text-violet-800 hover:bg-violet-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            Ha a kitevőt 1-gyel csökkented, a hatvány a-ad részére változik (2-es alapnál felére). Negatív alapnál a kitevő paritásával váltakozik az előjel.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Fejtsd meg a szabadulószoba kódját!" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Írd be a hiányzó <strong>kitevőket</strong>, hogy a 2 hatványaiból álló négyzet minden sorában, oszlopában és átlójában ugyanannyi legyen a szorzat!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="grid grid-cols-3 gap-2 max-w-xs">
              {cells.map((row, r) =>
                row.map((v, c) => {
                  const fixed = MAGIC_GIVEN[r][c] !== null;
                  return (
                    <div key={`${r}-${c}`} className={`rounded-xl border-2 p-2 text-center ${fixed ? 'bg-violet-50 border-violet-300' : 'bg-white border-emerald-300'}`}>
                      <span className="text-lg font-bold text-slate-800">2</span>
                      {fixed ? (
                        <sup className="text-sm font-bold text-violet-800">{v}</sup>
                      ) : (
                        <input
                          type="text"
                          inputMode="numeric"
                          value={v}
                          onChange={(e) => setCell(r, c, e.target.value)}
                          className="w-10 ml-0.5 align-super border border-slate-300 rounded px-1 text-xs"
                          aria-label={`kitevő ${r + 1}. sor ${c + 1}. oszlop`}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-xs text-slate-700 space-y-0.5 font-mono">
              {lines.map((l, i) => (
                <div key={l.name} className={lineSums[i] === 45 ? 'text-emerald-700' : 'text-slate-600'}>
                  {l.name}: 2^({Number.isFinite(lineSums[i]) ? lineSums[i] : '?'}) {lineSums[i] === 45 ? '✓' : ''}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCells(MAGIC_GIVEN.map((row) => row.map((v) => (v === null ? '' : String(v)))))}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              Újrakezdés
            </button>
            <button
              onClick={() => setCells(MAGIC_SOLUTION.map((row) => row.map(String)))}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
            >
              Megoldás mutatása
            </button>
          </div>
          {solved ? (
            <div className="space-y-2">
              <TheoryTable
                headers={['Kitevő', 'Angolul', 'Betűk száma']}
                rows={MAGIC_SOLUTION.flat().map((e) => [String(e), ENGLISH[e], String(ENGLISH[e].replace('-', '').length)])}
              />
              <TheoryCallout type="success" title="Kész a bűvös négyzet!">
                A betűszámok (4, 9, 8 / 11, 7, 3 / 6, 5, 10) ismét bűvös négyzetet adnak: minden összeg 21. Számjegyeik összege 4 + 9 + 8 + 1 + 1 + 7 + 3 + 6 + 5 + 1 + 0 = 45,
                és 45⁻¹ = 1/45 = 0,0222… ⇒ a titkos kód: <strong>022</strong>.
              </TheoryCallout>
            </div>
          ) : (
            <TheoryCallout type="info" title="Tipp">
              2ᵃ · 2ᵇ · 2ᶜ = 2ᵃ⁺ᵇ⁺ᶜ, ezért a kitevők összegének kell mindenhol ugyanannyinak lennie. A középső oszlop teljes: 22 + 15 + 8 = 45.
            </TheoryCallout>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PowersReviewTheory;
