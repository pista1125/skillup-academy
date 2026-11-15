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
  PracticeMazeSvg,
  FlagColoringSvg,
  FountainColoringSvg,
  ExamRoomSvg,
  NineDigitComplementSvg
} from './CombinatoricsPractice2Figures';

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const binom = (n: number, k: number): number => (k < 0 || k > n ? 0 : Math.round(fact(n) / (fact(k) * fact(n - k))));
/** n mező kiszínezése PONTOSAN j színnel (mind a j szín előfordul) – szita-formula. */
const surjections = (n: number, j: number): number => {
  let s = 0;
  for (let i = 0; i <= j; i++) s += (i % 2 === 0 ? 1 : -1) * binom(j, i) * Math.pow(j - i, n);
  return s;
};
const fmtInt = (x: number) => x.toLocaleString('hu-HU');

export const CombinatoricsPractice2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: „van benne d számjegy” – n jegyű számok
  const [digit, setDigit] = useState<number>(9);
  const [len, setLen] = useState<number>(3);

  // Labor II: színezések
  const [fields, setFields] = useState<number>(3);
  const [colors, setColors] = useState<number>(5);

  const lab1 = useMemo(() => {
    const total = 9 * Math.pow(10, len - 1);
    const without = digit === 0 ? Math.pow(9, len) : 8 * Math.pow(9, len - 1);
    const good = total - without;
    // ellenőrzés „nyers erővel”: végigszámoljuk az összes n jegyű számot
    let brute = 0;
    const lo = Math.pow(10, len - 1);
    const hi = Math.pow(10, len);
    const d = String(digit);
    for (let x = lo; x < hi; x++) if (String(x).includes(d)) brute++;
    return { total, without, good, brute };
  }, [digit, len]);

  const lab2 = useMemo(() => {
    const rows: { j: number; ways: number; surj: number; count: number }[] = [];
    for (let j = 1; j <= Math.min(fields, colors); j++) {
      const surj = surjections(fields, j);
      rows.push({ j, ways: binom(colors, j), surj, count: binom(colors, j) * surj });
    }
    const all = Math.pow(colors, fields);
    const sum = rows.reduce((s, r) => s + r.count, 0);
    const half = fields % 2 === 0 ? (binom(fields, fields / 2) / 2) * colors * (colors - 1) : NaN;
    return { rows, all, sum, half };
  }, [fields, colors]);

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="gyakorlas-kombinatorika-2"
      title="7. Gyakorlás – összeszámlálási ötletek"
      subtitle="Zászlók, kitűzők, szökőkutak és ülésrendek: hogyan bontsuk lépésekre, esetekre egy összeszámlálást, és hogyan kerüljük el a kihagyott vagy kétszer számolt eseteket?"
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_kombinatorika_gyakorlas_2_tananyag.pdf"
      practiceTitle="Készen állsz az összetett kombinatorikai feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÖTLETEK AZ ÖSSZESZÁMLÁLÁSHOZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                különálló esetek ⇒ ÖSSZEADÁS · egymás utáni döntések ⇒ SZORZÁS · „jó” = összes − „rossz”
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Gondold végig, milyen <strong>lépések, döntések</strong> vezetnek egy konkrét eset összeállításához!
              </li>
              <li>
                Esetszétválasztásnál a csoportok <strong>ne fedjék egymást</strong> – különben egyes esetek többször számítanak.
              </li>
              <li>
                Ha a kimaradó („rossz”) eseteket könnyebb megszámolni, vond le őket az összesből.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a helyes válaszok útvesztője" badge="Tankönyv 66. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PracticeMazeSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Juss el a bal felső sarokból a jobb alsóba úgy, hogy mindig a helyes válasz irányába lépsz tovább! A mezők kérdései a fejezet eddigi modelljeit ismétlik:
            </p>
            <TheoryTable
              headers={['Kérdés', 'Modell', 'Eredmény']}
              rows={[
                ['10 elemű halmaz 4 elemű részhalmazai', 'kombináció: C(10; 4)', '210'],
                ['7 karakteres kód a 0; 1 jegyekből', 'ismétléses variáció: 2⁷', '128'],
                ['5 gyerek sorba állása', 'permutáció: 5!', '120'],
                ['Kockával 3 dobás sorozata', 'ismétléses variáció: 6³', '216'],
                ['3 fehér és 4 piros bábu sorba', 'ismétléses permutáció: 7! / (3! · 4!)', '35'],
                ['10 gyerekből titkár és jegyző', 'variáció: 10 · 9', '90'],
                ['8 fős döntő első 3 helyezettje', 'variáció: 8 · 7 · 6', '336'],
                ['Háromjegyű pozitív egészek', 'szorzási szabály: 9 · 10 · 10', '900']
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 2. Összefoglaló */}
      <TheorySection title="2. Összefoglaló: a fejezet modelljei" badge="Ismétlés" badgeColor="indigo">
        <TheoryTable
          headers={['Kérdés', 'Modell', 'Képlet', 'Példa']}
          rows={[
            ['Minden elemet sorba rendezünk', 'permutáció', 'n!', '5 gyerek: 120'],
            ['Sorba rendezés, azonos elemekkel', 'ismétléses permutáció', 'n! / (k₁! · k₂! · …)', '3 fehér + 4 piros: 35'],
            ['k elem kiválasztása, számít a sorrend', 'variáció', 'n · (n − 1) · … · (n − k + 1)', '8-ból dobogó: 336'],
            ['k hely kitöltése, ismétlődhet', 'ismétléses variáció', 'nᵏ', '3 kockadobás: 216'],
            ['k elem kiválasztása, nem számít a sorrend', 'kombináció', 'C(n; k) = n! / (k! · (n − k)!)', '10-ből 4: 210'],
            ['Különálló esetek', 'esetszétválasztás', 'összeadás', 'legfeljebb 3 elemű részhalmaz: 1 + 9 + 36 + 84'],
            ['A „rossz” esetek egyszerűbbek', 'komplementer', 'összes − rossz', '9-est tartalmazó: 900 − 648']
          ]}
        />
      </TheorySection>

      {/* 3. Kidolgozott 1 */}
      <TheorySection title="3. Kidolgozott feladat: a négysávos zászló" badge="Kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Hányféleképpen színezhetjük ki a négysávos zászlót a piros, fehér, zöld, kék, sárga, narancssárga színekkel <strong>kétszínűre</strong> úgy, hogy két-két sáv azonos színű legyen? (A szomszédos sávok lehetnek azonos színűek.)
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>Döntsük el, melyik sávok legyenek azonos színűek!</strong> Elég kiválasztani, melyik sáv egyezzen a felső sávval: <strong>3 lehetőség</strong>.
              </li>
              <li>
                <strong>Színezzük ki a kiválasztott zászlót!</strong> A felső sávpár 6-féle, a másik pár 5-féle színű lehet: 6 · 5 = <strong>30</strong>.
              </li>
              <li>
                Minden elrendezés 30-féleképpen színezhető, így a lehetőségek száma <strong>3 · 30 = 90</strong>.
              </li>
            </ol>
          </div>
          <FlagColoringSvg />
        </div>
      </TheorySection>

      {/* 4. Elmélet */}
      <TheorySection title="4. Ötletek az összeszámláláshoz" badge="Elmélet" badgeColor="teal">
        <TheoryTable
          headers={['Kérdés, helyzet', 'Ötlet']}
          rows={[
            ['Bontsd fel az eseteket jól összeszámolható csoportokra, amelyek között nincs azonos!', 'Esetszétválasztás: a különálló csoportokban lévő lehetőségek számát össze kell adni.'],
            ['Milyen lépések, döntések vezetnek egy konkrét eset összeállításához?', 'Ha egy lépésben minden döntést ugyanannyiféleképpen folytathatsz, a lehetőségek számát össze kell szorozni.'],
            ['A kedvező vagy a kimaradó eseteket könnyebb összeszámolni?', '„Jó” esetek száma = összes eset száma − „rossz” esetek száma.'],
            ['A tárgyakhoz válasszuk az embereket, vagy az emberekhez a tárgyakat?', 'Néha érdemes nézőpontot váltani – a „rekeszek” feliratát te választhatod ki.'],
            ['Csak kevés számú eset fordul elő.', 'Jól rendszerezve sorold fel az összeset, és számold össze.'],
            ['Sok-sok elem szerepel a feladatban.', 'Gondold végig, hogyan oldanád meg, ha csak kevesebb elem szerepelne.']
          ]}
        />
      </TheorySection>

      {/* 5. Érettségi feladatok */}
      <TheorySection title="5. Érettségi feladatok megoldással" badge="Feladatok" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. A kitűző három mezője (2012)" badge="Érettségi" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              5 szín (piros, kék, fehér, sárga, zöld), mezőnként egy szín, a mezők lehetnek azonos színűek.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a) Háromszínű:</strong> a három mező különböző színű: 5 · 4 · 3 = <strong>60</strong>.</li>
              <li>
                <strong>b) Kétszínű:</strong> összes színezés 5³ = 125, ebből egyszínű 5, háromszínű 60 ⇒ 125 − 5 − 60 = <strong>60</strong>.
                (Másképp: a két szín C(5; 2) = 10-féle, a 3 mező két színnel, mindkettőt használva 2³ − 2 = 6-féle ⇒ 10 · 6 = 60.)
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. A szökőkút (2014)" badge="Érettségi" badgeColor="sky">
            <FountainColoringSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Melyik két szín szerepel? A 3 színből 2-t választunk: C(3; 2) = 3.</li>
              <li>A 6 vízsugárból melyik 3 kapja az egyik (pl. az ábécében előbbi) színt? C(6; 3) = 20.</li>
              <li>Összesen 3 · 20 = <strong>60</strong> látvány.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Háromgombócos fagylalt (2018)" badge="Érettségi" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>6 íz, 3 gombóc, pontosan kétféle íz, számít a sorrend.</li>
              <li>Melyik íz szerepel kétszer: 6-féle; melyik egyszer: 5-féle ⇒ 30 ízválasztás.</li>
              <li>Az egyszeri íz helye a tölcsérben: 3-féle (pl. dió-dió-vanília, dió-vanília-dió, vanília-dió-dió).</li>
              <li>Összesen 30 · 3 = <strong>90</strong> kérés.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Julcsi és Tercsi a vizsgán (2018)" badge="Érettségi" badgeColor="orange">
            <ExamRoomSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Egymás melletti padpár soronként 3, a 3 sorban 9.</li>
              <li>A két lány a padpáron 2-féle sorrendben ülhet: 9 · 2 = 18.</li>
              <li>A többi 10 vizsgázó a maradék 10 padon 10!-féleképpen: <strong>18 · 10! = 65 318 400</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Kidolgozott 2 */}
      <TheorySection title="6. Kidolgozott feladat: hol a hiba?" badge="Kidolgozott feladat" badgeColor="amber">
        <p className="text-sm text-slate-700 leading-relaxed">
          Hány olyan háromjegyű szám van, amelyben szerepel a kilences számjegy? Négy hibás gondolatmenet – és a hibájuk:
        </p>
        <TheoryTable
          headers={['Gondolatmenet', 'Eredmény', 'A hiba']}
          rows={[
            ['a) Az első jegy a 9-es, a többi bármi: 1 · 10 · 10', '100', 'Kimaradnak azok, amelyekben az első jegy nem 9, de a 2. vagy 3. igen (pl. 291, 319, 599).'],
            ['b) Első jegy 9-féle, második 10-féle, a harmadik a 9-es: 9 · 10 · 1', '90', 'Kimaradnak azok, amelyek nem 9-re végződnek, de van bennük 9-es (pl. 913, 290).'],
            ['c) A 9-es helye szerint 3 eset: 1 · 10 · 10 + 9 · 1 · 10 + 9 · 10 · 1', '280', 'A több 9-est tartalmazó számokat többször számoltuk (pl. 299 a 2. és a 3. esetben is).'],
            ['d) A 9-es helye 3-féle, a többi bármi, levonjuk a 0-val kezdődőket: 3 · 10 · 10 − 1 · 10 · 10', '200', 'Többszörös számolás (299), és a 0-val kezdődő számhármasokból nem 100 van a 300 között.']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Helyes megoldás 1: a „rossz esetek”" badge="Komplementer" badgeColor="emerald">
            <NineDigitComplementSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Háromjegyű szám 9 · 10 · 10 = 900 van. Kilences nélkül: az első helyre 8-féle (nem 0, nem 9), a másik kettőre 9-féle jegy: 8 · 9 · 9 = 648. Tehát <strong>900 − 648 = 252</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Helyes megoldás 2: esetszétválasztás" badge="A 9-esek száma" badgeColor="indigo">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>1 db 9-es az 1. helyen: 1 · 9 · 9 = 81</li>
              <li>1 db 9-es a 2. helyen: 8 · 1 · 9 = 72; a 3. helyen: 8 · 9 · 1 = 72</li>
              <li>2 db 9-es: 1–2. hely: 9; 1–3. hely: 9; 2–3. hely: 8 (az első jegy sem 0, sem 9)</li>
              <li>3 db 9-es: 999 – 1 lehetőség</li>
              <li>Összesen: 81 + 72 + 72 + 9 + 9 + 8 + 1 = <strong>252</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Házi feladatok */}
      <TheorySection title="7. Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="HF 1–3." badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> 3 házaspár egy sorban, mindenki a párja mellett: a párok sorrendje 3!, párokon belül 2 · 2 · 2 ⇒ <strong>48</strong>.</li>
              <li>
                <strong>HF 2.</strong> Vasúti fülke 4 + 4 üléssel: egymás melletti ülőhelypár 2 · 3 = 6, szemközti 4 ⇒ 10 helypár, a két lány 2-féle sorrendben, a többi 6 ember 6!-féleképpen: 10 · 2 · 720 = <strong>14 400</strong>.
              </li>
              <li><strong>HF 3.</strong> 8 csapat első fordulója: az 1. csapat ellenfele 7-féle, a következő párosítatlané 5-féle, … ⇒ 7 · 5 · 3 · 1 = <strong>105</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 4. A költő neve" badge="Rejtvény" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>4 fiú és 4 lány táncoló párjai: 4! = 24 → R</li>
              <li>Csupa páros jegyű háromjegyű szám: 4 · 5 · 5 = 100 → N</li>
              <li>7 csapat körmérkőzése: C(7; 2) = 21 → A / Y</li>
              <li>Legfeljebb 3 elemű részhalmazok {'{'}1; …; 9{'}'}-ben: 1 + 9 + 36 + 84 = 130 → A</li>
              <li>7 almából 2 hibás – hányadikra húzta őket: C(7; 2) = 21 → Y / A</li>
              <li>A betűk: <strong>ARANY</strong> (Arany János).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 8. Csapda */}
      <TheorySection title="8. Tipikus hiba: átfedő esetek" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az esetek nem különállók – egyes lehetőségeket többször számolunk"
          wrong="„A 9-es lehet az 1., a 2. vagy a 3. helyen”: 100 + 90 + 90 = 280"
          wrongExplanation="A 299 a „9-es a 2. helyen” és a „9-es a 3. helyen” esetben is benne van, a 999 mindhárom esetben. Az összeadási szabály csak akkor használható, ha az esetek között nincs közös elem."
          correct="Komplementer: 900 − 648 = 252, vagy esetek a 9-esek SZÁMA szerint: 81 + 72 + 72 + 9 + 9 + 8 + 1 = 252"
          correctExplanation="Ha a csoportokat a 9-esek száma és pontos helye határozza meg, minden szám pontosan egy csoportba kerül."
          tip="Ellenőrizd egy konkrét példával (pl. 299), hogy hány esetben számoltad meg! Pontosan egyszer kell."
        />
      </TheorySection>

      {/* 9. Labor I */}
      <TheorySection title="9. Interaktív Laboratórium I: Van benne d számjegy?" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a keresett számjegy d: {digit}</label>
              <input
                type="range"
                min="0"
                max="9"
                value={digit}
                onChange={(e) => setDigit(Number(e.target.value))}
                className="w-full accent-violet-600"
                aria-label="keresett számjegy"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a számok jegyeinek száma n: {len}</label>
              <input
                type="range"
                min="2"
                max="5"
                value={len}
                onChange={(e) => setLen(Number(e.target.value))}
                className="w-full accent-emerald-600"
                aria-label="jegyek száma"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm font-mono text-slate-700 space-y-1">
            <div>összes {len} jegyű szám: 9 · 10^{len - 1} = {fmtInt(lab1.total)}</div>
            <div>
              nincs benne {digit}: {digit === 0 ? `9^${len}` : `8 · 9^${len - 1}`} = {fmtInt(lab1.without)}
              <span className="text-xs text-slate-500">
                {digit === 0 ? ' (minden helyre 9-féle nem nulla jegy)' : ' (első hely: nem 0 és nem d)'}
              </span>
            </div>
            <div>
              van benne {digit}: {fmtInt(lab1.total)} − {fmtInt(lab1.without)} = <strong>{fmtInt(lab1.good)}</strong>
            </div>
            <div className={lab1.brute === lab1.good ? 'text-emerald-700 font-sans font-bold' : 'text-rose-700 font-sans font-bold'}>
              Ellenőrzés az összes szám végignézésével: {fmtInt(lab1.brute)} {lab1.brute === lab1.good ? '✓ egyezik' : '✗ eltér'}
            </div>
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            d = 9 és n = 3 esetén a tankönyvi 252 adódik. A d = 0 eset más: a nulla eleve nem lehet az első helyen, ezért „nincs benne 0” esetén minden helyre 9-féle jegy kerülhet.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 10. Labor II */}
      <TheorySection title="10. Interaktív Laboratórium II: Színezés-számláló" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">mezők (sávok, vízsugarak) száma: {fields}</label>
              <input
                type="range"
                min="2"
                max="8"
                value={fields}
                onChange={(e) => setFields(Number(e.target.value))}
                className="w-full accent-purple-600"
                aria-label="mezők száma"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">választható színek száma: {colors}</label>
              <input
                type="range"
                min="2"
                max="8"
                value={colors}
                onChange={(e) => setColors(Number(e.target.value))}
                className="w-full accent-rose-600"
                aria-label="színek száma"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Kitűző (3 mező, 5 szín)', f: 3, c: 5 },
              { name: 'Zászló (4 sáv, 6 szín)', f: 4, c: 6 },
              { name: 'Szökőkút (6 sugár, 3 szín)', f: 6, c: 3 }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setFields(p.f);
                  setColors(p.c);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <TheoryTable
            headers={['Pontosan ennyi színt használunk', 'Melyik színek?', 'Színezés úgy, hogy mind szerepeljen', 'Lehetőségek']}
            rows={lab2.rows.map((r) => [
              `${r.j}`,
              `C(${colors}; ${r.j}) = ${fmtInt(r.ways)}`,
              fmtInt(r.surj),
              <strong key={r.j}>{fmtInt(r.count)}</strong>
            ])}
          />
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div className="font-mono">
              Ellenőrzés: a sorok összege {fmtInt(lab2.sum)} = {colors}^{fields} = {fmtInt(lab2.all)} {lab2.sum === lab2.all ? '✓' : '✗'}
            </div>
            <div>
              {fields % 2 === 0 ? (
                <>
                  Két szín, <strong>fele-fele</strong> arányban ({fields / 2}–{fields / 2} mező): C({fields}; {fields / 2}) / 2 elrendezés · {colors} · {colors - 1} színezés ={' '}
                  <strong>{fmtInt(lab2.half)}</strong>
                </>
              ) : (
                <>Páratlan sok mezőnél nem lehet a két szín fele-fele arányban.</>
              )}
            </div>
          </div>
          <TheoryCallout type="success" title="Próbáld ki a tankönyvi adatokkal!">
            Kitűző: háromszínű 60, kétszínű 60. Zászló: két-két sáv azonos színű ⇒ fele-fele 90. Szökőkút: 3-3 vízsugár azonos színű ⇒ fele-fele 60.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CombinatoricsPractice2Theory;
