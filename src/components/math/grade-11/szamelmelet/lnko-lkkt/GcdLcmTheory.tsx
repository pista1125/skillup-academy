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
  WallpaperStripsSvg,
  PrimeVennSvg,
  CommonMultiplesSvg,
  SquareTilingSvg,
  EuclidRectangleSvg
} from './GcdLcmFigures';

const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (n: number) => String(n).split('').map((c) => SUP[c]).join('');
const fmtInt = (x: number) => x.toLocaleString('hu-HU');

const factorMap = (n: number): Map<number, number> => {
  const m = new Map<number, number>();
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    while (x % p === 0) {
      m.set(p, (m.get(p) ?? 0) + 1);
      x /= p;
    }
  }
  if (x > 1) m.set(x, (m.get(x) ?? 0) + 1);
  return m;
};
const powStr = (p: number, e: number) => (e > 1 ? `${p}${sup(e)}` : `${p}`);
const prodStr = (parts: [number, number][]) => (parts.length ? parts.map(([p, e]) => powStr(p, e)).join(' · ') : '1');
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

type Step = { a: number; b: number; q: number; r: number };
const euclidSteps = (a0: number, b0: number): Step[] => {
  const steps: Step[] = [];
  let a = Math.max(a0, b0);
  let b = Math.min(a0, b0);
  while (b > 0) {
    const q = Math.floor(a / b);
    const r = a % b;
    steps.push({ a, b, q, r });
    a = b;
    b = r;
  }
  return steps;
};

const parse = (s: string) => Math.floor(Number(s.replace(/\s/g, '')));
const ok = (n: number) => Number.isFinite(n) && n >= 1 && n <= 1000000;

export const GcdLcmTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: prímtényezős Venn-diagram
  const [aText, setAText] = useState<string>('4536');
  const [bText, setBText] = useState<string>('528');
  const a = parse(aText);
  const b = parse(bText);
  const valid = ok(a) && ok(b);
  const fa = valid ? factorMap(a) : new Map<number, number>();
  const fb = valid ? factorMap(b) : new Map<number, number>();
  const primes = Array.from(new Set([...fa.keys(), ...fb.keys()])).sort((x, y) => x - y);
  const onlyA: [number, number][] = [];
  const onlyB: [number, number][] = [];
  const common: [number, number][] = [];
  const lcmParts: [number, number][] = [];
  primes.forEach((p) => {
    const ea = fa.get(p) ?? 0;
    const eb = fb.get(p) ?? 0;
    const mn = Math.min(ea, eb);
    if (mn > 0) common.push([p, mn]);
    if (ea > mn) onlyA.push([p, ea - mn]);
    if (eb > mn) onlyB.push([p, eb - mn]);
    lcmParts.push([p, Math.max(ea, eb)]);
  });
  const g = valid ? gcd(a, b) : 1;
  const l = valid ? (a / g) * b : 1;

  // Labor II: euklideszi algoritmus lépésenként
  const [eaText, setEaText] = useState<string>('1176');
  const [ebText, setEbText] = useState<string>('252');
  const [shown, setShown] = useState<number>(1);
  const ea = parse(eaText);
  const eb = parse(ebText);
  const eValid = ok(ea) && ok(eb);
  const steps = eValid ? euclidSteps(ea, eb) : [];
  const vis = Math.min(shown, steps.length);
  const eDone = vis >= steps.length && steps.length > 0;
  const eg = eValid ? gcd(ea, eb) : 1;

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="lnko-lkkt"
      title="3. Legnagyobb közös osztó, legkisebb közös többszörös"
      subtitle="Közös osztók és közös többszörösök: a prímtényezős felbontásból és az euklideszi algoritmussal."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_lnko_lkkt_tananyag.pdf"
      practiceTitle="Készen állsz az LNKO és LKKT feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — LNKO ÉS LKKT A PRÍMTÉNYEZŐKBŐL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-sm font-black text-emerald-900 dark:text-emerald-200">
                (a; b): a <u>közös</u> prímtényezők a <u>legkisebb</u> hatványon
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center text-sm font-black text-sky-900 dark:text-sky-200">
                [a; b]: <u>minden</u> prímtényező a <u>legnagyobb</u> hatványon
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>(a; b) = 1 esetén a és b <strong>relatív prímek</strong>, pl. (22; 75) = 1.</li>
              <li>(1; n) = 1 és [1; n] = n. Két számra mindig (a; b) · [a; b] = a · b.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a tapétacsíkok szélessége" badge="Tankönyv 128. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy 240 cm széles és 320 cm hosszú szobát egyforma szélességű függőleges csíkokkal tapétázunk. Legfeljebb milyen széles csíkokat vágjunk, hogy minden falra <strong>egész számú</strong> csík férjen?
            </p>
            <p className="font-mono text-xs bg-slate-50 p-2 rounded-lg border border-slate-200">
              240 osztói: 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 30, 40, 48, 60, <strong className="text-emerald-700">80</strong>, 120, 240<br />
              320 osztói: 1, 2, 4, 5, 8, 10, 16, 20, 32, 40, 64, <strong className="text-emerald-700">80</strong>, 160, 320
            </p>
            <p>
              A mindkét felsorolásban szereplő számok a <strong>közös osztók</strong>; a legnagyobb a <strong>80</strong>. Tehát 80 cm széles csíkokat vágunk.
            </p>
          </div>
          <WallpaperStripsSvg />
        </div>
      </TheorySection>

      {/* 2. LNKO */}
      <TheorySection title="2. A legnagyobb közös osztó" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700">
            <TheoryCard title="Definíciók" badge="(a; b)" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Ha a osztója b-nek és c-nek is, akkor a a b és c <strong>közös osztója</strong>. Bármely két pozitív egésznek közös osztója az 1; közös osztóból véges sok van, és egyik sem nagyobb a számoknál.</li>
                <li>A közös osztók közül a legnagyobb a <strong>legnagyobb közös osztó</strong>, jele: <strong>(a; b)</strong>.</li>
                <li>Ha (a; b) = 1, akkor a és b <strong>relatív prímek</strong>.</li>
              </ul>
            </TheoryCard>
            <p>
              Pl. a 18 és a 120 közös osztói: 1, 2, 3, 6, így (18; 120) = 6. A 22 és a 75 egyetlen közös osztója az 1: (22; 75) = 1.
            </p>
            <p>
              <strong>Meghatározás:</strong> összeszorozzuk a <strong>közös prímtényezőket</strong> az előforduló <strong>legkisebb hatványon</strong>. (Nagyobb hatványt véve lenne olyan szám, amelynek az már nem osztója.)
            </p>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 font-mono text-sm text-emerald-900 font-bold">
              4536 = 2³ · 3⁴ · 7; 528 = 2⁴ · 3 · 11 ⇒ (4536; 528) = 2³ · 3 = 24
            </div>
          </div>
          <PrimeVennSvg />
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladat: díjak */}
      <TheorySection title="3. Kidolgozott feladat: a fotópályázat díjai" badge="Kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A művelődési központ 6, 8 vagy 10 képet díjaz majd egyenlő összeggel, de a költségvetést most kell elkészíteni: az összegnek 6, 8 és 10 egyenlő részre is oszthatónak kell lennie.
            </p>
            <p>
              <strong>a)</strong> Mekkora a legkisebb összeg, ha a díjak ezerrel oszthatók? A 8 és 10 közös többszörösei: 40, 80, 120, 160, 200, 240, …; ezek közül a 6-nak is többszöröse: 120, 240, … A legkisebb a 120, tehát <strong>120 000 Ft</strong> (6 díjnál 20 000, 8 díjnál 15 000, 10 díjnál 12 000 Ft fejenként).
            </p>
            <p>
              <strong>b)</strong> Legfeljebb 200 000 Ft szánható díjakra, és nem kell ezerrel oszthatónak lennie. A 120 többszörösei közül a legnagyobb 200 000 alatti: 200 000 : 120 ≈ 1666,7, így 1666 · 120 = <strong>199 920 Ft</strong> (33 320, 24 990, illetve 19 992 Ft fejenként).
            </p>
          </div>
          <CommonMultiplesSvg />
        </div>
      </TheorySection>

      {/* 4. LKKT */}
      <TheorySection title="4. A legkisebb közös többszörös" badge="Elmélet" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Definíciók" badge="[a; b]" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Ha a többszöröse b-nek és c-nek is, akkor a a b és c <strong>közös többszöröse</strong>. Közös többszörös pl. a két szám szorzata; végtelen sok van belőlük.</li>
              <li>A pozitív egészek bármely részhalmazának van legkisebb eleme, így a közös többszörösök között is: ez a <strong>legkisebb közös többszörös</strong>, jele: <strong>[a; b]</strong>.</li>
              <li>Pl. 18 és 120 közös többszörösei: 360, 720, 1080, … ⇒ [18; 120] = 360.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Meghatározás prímtényezőkből" badge="Módszer" badgeColor="emerald">
            <p className="text-sm text-slate-700 mb-2">
              Összeszorozzuk a számokban szereplő <strong>összes prímtényezőt</strong> az előforduló <strong>legnagyobb hatványon</strong>.
            </p>
            <div className="p-2 rounded-lg bg-sky-50 border border-sky-200 font-mono text-xs text-sky-900 font-bold">
              [4536; 528] = 2⁴ · 3⁴ · 7 · 11 = 99 792
            </div>
            <p className="text-xs text-slate-500 mt-2">Ellenőrzés: 24 · 99 792 = 2 395 008 = 4536 · 528.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Mikor LNKO, mikor LKKT?">
          <strong>LNKO</strong>, ha egy mennyiséget <strong>egyenlő részekre bontunk</strong> (csíkok, négyzet alakú lapok, csomagok): a darab mérete mindkét számnak osztója. <strong>LKKT</strong>, ha <strong>ismétlődő ciklusok találkozását</strong> vagy több részre is osztható összeget keresünk (díjak, aukciók, téglalapokból kirakott négyzet).
        </TheoryCallout>
      </TheorySection>

      {/* 5. Euklidesz */}
      <TheorySection title="5. Kiegészítés: az euklideszi algoritmus" badge="Módszer" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Nagy számoknál a prímtényezős felbontás fáradságos. Az <strong>euklideszi algoritmus</strong> maradékos osztásokkal dolgozik: ha a = q · b + r, akkor a és b közös osztói ugyanazok, mint b és r közös osztói, így (a; b) = (b; r).
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Osszuk el a nagyobb számot a kisebbel maradékosan.</li>
              <li>Ezután az osztót osszuk el a maradékkal, és így tovább.</li>
              <li>Ha a maradék 0, az <strong>utolsó nem nulla maradék</strong> a legnagyobb közös osztó.</li>
            </ol>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 font-mono text-xs text-purple-900">
              675 = 1 · 495 + 180<br />495 = 2 · 180 + 135<br />180 = 1 · 135 + 45<br />135 = 3 · 45 + 0 ⇒ (675; 495) = 45
            </div>
          </div>
          <EuclidRectangleSvg />
        </div>
      </TheorySection>

      {/* 6. Feladatok */}
      <TheorySection title="6. Tankönyvi feladatok – ellenőrzött eredmények" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TheoryCard title="Bence téglalapjai (4. és 9. feladat)" badge="Feladat" badgeColor="emerald">
            <SquareTilingSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>4.</strong> A 84 × 126-os téglalap négyzetekre bontásakor a négyzet oldala a (84; 126) = 42 osztója: 1, 2, 3, 6, 7, 14, 21, 42 cm. A legtöbb négyzet 84 · 126 = 10 584 (1 cm), a legkevesebb 2 · 3 = 6 (42 cm).</li>
              <li><strong>9.</strong> 84 × 126-os téglalapokból kirakott négyzet oldala közös többszörös: a legkisebb [84; 126] = 252 cm, ehhez 3 · 2 = 6 téglalap kell. Más lehetőség: 504 cm (24 db), 756 cm (54 db).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Órai feladatok" badge="Feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>1.</strong> (675; 495) = 45; (1176; 252) = 84; (288; 528; 936) = 24; d) 7 · 13⁴.</li>
              <li><strong>2.</strong> 477/318 = 3/2 (LNKO 159); 618/1545 = 2/5 (LNKO 309).</li>
              <li><strong>3.</strong> Nem prím c: (240; c) = 10 pl. 10, 50, 70; (240; c) = 1 pl. 49, 77, 91; (240; c) = 240 pl. 240, 480.</li>
              <li><strong>5.</strong> [36; 180] = 180; [15; 22] = 330; [600; 1260; 2340] = 163 800; d) 2³ · 3⁴ · 5 · 7² · 11³.</li>
              <li><strong>6.</strong> 15/242 + 5/99 = 245/2178 (közös nevező 2178); 8/15 + 4/63 − 13/70 = 259/630 = 37/90.</li>
              <li><strong>7.</strong> [16; 20; 24] = 240; 1000 és 2000 között 4 közös többszörös: 1200, 1440, 1680, 1920.</li>
              <li><strong>8.</strong> Nem prím c: [20; c] = 60 pl. 6, 12, 15, 30; [20; c] = 20 pl. 4, 10, 20; [20; c] = 220 pl. 22, 44, 55.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Házi feladat', 'Eredmény']}
          rows={[
            ['1. a) 2³ · 5⁷ és 2⁵ · 3 · 5⁸', 'LNKO 2³ · 5⁷, LKKT 2⁵ · 3 · 5⁸'],
            ['1. b) 2³ · 5⁷ és 3² · 11 · 19⁴', 'LNKO 1 (relatív prímek), LKKT a szorzat'],
            ['1. c) 2³ · 5⁷; 2² · 5³; 2⁴ · 5⁸', 'LNKO 2² · 5³, LKKT 2⁴ · 5⁸'],
            ['2. 740 és 63; 39 és 351; 12, 36, 144', '(1; 46 620); (39; 351); (12; 144)'],
            ['3. szám a 24-gyel', 'a) LNKO 6: pl. 6, 18, 30; b) LKKT 72: pl. 9, 18, 72; c) LNKO 8 és LKKT 48: 16'],
            ['4. aukciók 8 és 6 napos ciklussal', '[8; 6] = 24 nap múlva'],
            ['5. 3,3 m × 4,2 m padló', '(330; 420) = 30 cm-es lap, 11 · 14 = 154 db']
          ]}
        />
        <TheoryCallout type="info" title="Ráadás: tökéletes és barátságos számok">
          Egy szám <strong>tökéletes</strong>, ha egyenlő a nála kisebb osztói összegével (6 = 1 + 2 + 3; 28; 496), <strong>szűkölködő</strong>, ha az összeg kisebb (8, 34, 1024), <strong>bővelkedő</strong>, ha nagyobb (12, 100). A 220 és 284 <strong>barátságos számpár</strong>: egyikük önmagánál kisebb osztóinak összege a másik (ugyanígy 1184 és 1210).
        </TheoryCallout>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: felcserélt szabályok" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="LNKO: közös tényezők, LEGKISEBB kitevő!"
          wrong="(4536; 528) = 2⁴ · 3⁴ = 1296"
          wrongExplanation="A legnagyobb kitevőt vettük: a 2⁴ nem osztója a 4536-nak, a 3⁴ nem osztója az 528-nak – ez nem is közös osztó."
          correct="(4536; 528) = 2³ · 3 = 24"
          correctExplanation="A közös prímek (2 és 3) a legkisebb előforduló kitevőn. A 7 és a 11 nem közös, kimarad. A legnagyobb kitevő és minden prím az LKKT-hoz kell: 2⁴ · 3⁴ · 7 · 11."
          tip="Ellenőrzés: (a; b) · [a; b] = a · b. Az LNKO nem lehet nagyobb a kisebbik számnál, az LKKT nem lehet kisebb a nagyobbiknál."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: Prímtényezős Venn-diagram" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a</label>
              <input type="text" inputMode="numeric" value={aText} onChange={(e) => setAText(e.target.value)} className="w-32 px-3 py-1.5 rounded-lg border border-slate-300 font-mono" aria-label="első szám" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">b</label>
              <input type="text" inputMode="numeric" value={bText} onChange={(e) => setBText(e.target.value)} className="w-32 px-3 py-1.5 rounded-lg border border-slate-300 font-mono" aria-label="második szám" />
            </div>
            {[
              [240, 320],
              [18, 120],
              [4536, 528],
              [22, 75],
              [84, 126]
            ].map(([x, y]) => (
              <button
                key={`${x}-${y}`}
                onClick={() => {
                  setAText(String(x));
                  setBText(String(y));
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${a === x && b === y ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
              >
                {x} és {y}
              </button>
            ))}
          </div>
          {!valid ? (
            <div className="text-sm font-bold text-rose-700">Adj meg két 1 és 1 000 000 közötti egész számot!</div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-300 p-3">
                  <div className="text-xs font-bold text-emerald-700 mb-1">csak a-ban</div>
                  <div className="font-mono font-bold text-emerald-900">{prodStr(onlyA)}</div>
                </div>
                <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-3">
                  <div className="text-xs font-bold text-amber-700 mb-1">közös rész</div>
                  <div className="font-mono font-bold text-amber-900">{prodStr(common)}</div>
                </div>
                <div className="rounded-2xl bg-sky-50 border-2 border-sky-300 p-3">
                  <div className="text-xs font-bold text-sky-700 mb-1">csak b-ben</div>
                  <div className="font-mono font-bold text-sky-900">{prodStr(onlyB)}</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>{fmtInt(a)} = {a === 1 ? '1' : prodStr(Array.from(fa.entries()))}</div>
                <div>{fmtInt(b)} = {b === 1 ? '1' : prodStr(Array.from(fb.entries()))}</div>
                <div className="font-bold text-emerald-800">
                  ({fmtInt(a)}; {fmtInt(b)}) = {prodStr(common)} = {fmtInt(g)}
                  {g === 1 ? ' – relatív prímek!' : ''}
                </div>
                <div className="font-bold text-sky-800">
                  [{fmtInt(a)}; {fmtInt(b)}] = {prodStr(lcmParts.filter(([, e]) => e > 0))} = {fmtInt(l)}
                </div>
                <div className="text-xs text-slate-500">
                  Ellenőrzés: {fmtInt(g)} · {fmtInt(l)} = {fmtInt(g * l)} = {fmtInt(a)} · {fmtInt(b)}
                </div>
              </div>
            </>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: Euklideszi algoritmus lépésenként" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">első szám</label>
              <input
                type="text"
                inputMode="numeric"
                value={eaText}
                onChange={(e) => {
                  setEaText(e.target.value);
                  setShown(1);
                }}
                className="w-32 px-3 py-1.5 rounded-lg border border-slate-300 font-mono"
                aria-label="első szám az euklideszi algoritmushoz"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">második szám</label>
              <input
                type="text"
                inputMode="numeric"
                value={ebText}
                onChange={(e) => {
                  setEbText(e.target.value);
                  setShown(1);
                }}
                className="w-32 px-3 py-1.5 rounded-lg border border-slate-300 font-mono"
                aria-label="második szám az euklideszi algoritmushoz"
              />
            </div>
            <button
              onClick={() => setShown((s) => s + 1)}
              disabled={!eValid || eDone}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-40"
            >
              Következő lépés
            </button>
            <button onClick={() => setShown(1000)} disabled={!eValid} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200 disabled:opacity-40">
              Mind
            </button>
            {[
              [1176, 252],
              [675, 495],
              [1071, 680],
              [4536, 528]
            ].map(([x, y]) => (
              <button
                key={`${x}-${y}`}
                onClick={() => {
                  setEaText(String(x));
                  setEbText(String(y));
                  setShown(1);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {x}; {y}
              </button>
            ))}
          </div>
          {!eValid ? (
            <div className="text-sm font-bold text-rose-700">Adj meg két 1 és 1 000 000 közötti egész számot!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-purple-50 text-purple-900">
                  <tr>
                    <th className="p-2 text-left">Lépés</th>
                    <th className="p-2 text-left">Maradékos osztás</th>
                    <th className="p-2 text-right">Maradék</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.slice(0, vis).map((s, i) => (
                    <tr key={i} className={`border-t border-slate-200 ${s.r === 0 ? 'bg-purple-50' : ''}`}>
                      <td className="p-2">{i + 1}.</td>
                      <td className="p-2 font-mono">
                        {fmtInt(s.a)} = {s.q} · {fmtInt(s.b)} + {fmtInt(s.r)}
                      </td>
                      <td className={`p-2 text-right font-bold ${s.r === 0 ? 'text-slate-400' : 'text-purple-800'}`}>{fmtInt(s.r)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {eValid && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
              {eDone ? (
                <>
                  <div className="font-bold text-purple-800">
                    A maradék 0 lett, az utolsó nem nulla maradék: ({fmtInt(ea)}; {fmtInt(eb)}) = {fmtInt(eg)}
                    {eg === 1 ? ' – a két szám relatív prím.' : ''}
                  </div>
                  <div>
                    LKKT a szorzatból: [{fmtInt(ea)}; {fmtInt(eb)}] = {fmtInt(ea)} · {fmtInt(eb)} : {fmtInt(eg)} = {fmtInt((ea / eg) * eb)}
                  </div>
                  <div className="text-xs text-slate-500">Lépések száma: {steps.length}</div>
                </>
              ) : (
                <div>
                  Most: ({fmtInt(steps[vis - 1]?.a ?? ea)}; {fmtInt(steps[vis - 1]?.b ?? eb)}) = ({fmtInt(steps[vis - 1]?.b ?? eb)}; {fmtInt(steps[vis - 1]?.r ?? 0)}). Folytasd, amíg a maradék 0 nem lesz!
                </div>
              )}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GcdLcmTheory;
