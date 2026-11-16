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
  AbacusSvg,
  PlaceValueTableSvg,
  NumberLine1000Svg,
  RoundingLineSvg,
  TissueBoxesSvg,
  HundredGridSvg,
  PV_COLORS
} from './Numbers1000Figures';

const ONES = ['', 'egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
const TENS_ALONE = ['', 'tíz', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
const TENS_PREFIX = ['', 'tizen', 'huszon', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];

/** Szám (0–1000) betűvel, a tankönyv írásmódja szerint (pl. hatszáznegyvenegy). */
export const numberToHungarianWords = (n: number): string => {
  if (n === 0) return 'nulla';
  if (n === 1000) return 'ezer';
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const e = n % 10;
  let s = '';
  if (h > 0) s += (h === 1 ? '' : h === 2 ? 'két' : ONES[h]) + 'száz';
  if (t > 0) s += e === 0 ? TENS_ALONE[t] : TENS_PREFIX[t];
  s += ONES[e];
  return s;
};

const fmt = (n: number) => String(n);

// ---------------------------------------------------------------------------
// Labor I – Számépítő golyós számológéppel
// ---------------------------------------------------------------------------
const TARGETS = [346, 407, 520, 638, 905, 199, 760, 84];

const PlaceValueBuilder: React.FC = () => {
  const [digits, setDigits] = useState<{ sz: number; t: number; e: number }>({ sz: 2, t: 4, e: 1 });
  const [targetIdx, setTargetIdx] = useState(0);
  const [checked, setChecked] = useState<null | boolean>(null);
  const value = digits.sz * 100 + digits.t * 10 + digits.e;
  const target = TARGETS[targetIdx];

  const change = (key: 'sz' | 't' | 'e', d: number) => {
    setChecked(null);
    setDigits((prev) => ({ ...prev, [key]: Math.max(0, Math.min(9, prev[key] + d)) }));
  };

  const cols: { key: 'sz' | 't' | 'e'; name: string; color: string; unit: number }[] = [
    { key: 'sz', name: 'százas', color: PV_COLORS.szazas, unit: 100 },
    { key: 't', name: 'tízes', color: PV_COLORS.tizes, unit: 10 },
    { key: 'e', name: 'egyes', color: PV_COLORS.egyes, unit: 1 }
  ];

  return (
    <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-base font-bold text-slate-700">
          Feladat: rakd ki a golyós számológépen ezt a számot:{' '}
          <span className="text-2xl font-black text-blue-700">{target}</span>
        </div>
        <button
          onClick={() => {
            setTargetIdx((i) => (i + 1) % TARGETS.length);
            setChecked(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700"
        >
          Új szám ➜
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {cols.map((c) => (
          <div key={c.key} className="rounded-2xl border-2 p-3 flex flex-col items-center gap-2" style={{ borderColor: c.color }}>
            <div className="font-bold text-sm" style={{ color: c.color }}>
              {c.name} ({c.unit})
            </div>
            <svg viewBox="0 0 60 150" className="w-14 h-36">
              <line x1="30" y1="5" x2="30" y2="140" stroke="#1e3a8a" strokeWidth="3" />
              <rect x="5" y="140" width="50" height="6" rx="3" fill="#1e3a8a" />
              {Array.from({ length: digits[c.key] }).map((_, i) => (
                <circle key={i} cx="30" cy={132 - i * 14} r="6.5" fill={c.color} stroke="#0f172a" strokeWidth="0.8" />
              ))}
            </svg>
            <div className="flex gap-2">
              <button
                onClick={() => change(c.key, -1)}
                className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-2xl font-black text-slate-700"
                aria-label={`${c.name} elvétel`}
              >
                −
              </button>
              <button
                onClick={() => change(c.key, 1)}
                className="w-12 h-12 rounded-xl text-2xl font-black text-white"
                style={{ backgroundColor: c.color }}
                aria-label={`${c.name} hozzáadás`}
              >
                +
              </button>
            </div>
            <div className="text-xs text-slate-600">
              {digits[c.key]} · {c.unit} = <strong>{digits[c.key] * c.unit}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-center space-y-1">
        <div className="font-mono text-lg font-black text-blue-900">
          {digits.sz * 100} + {digits.t * 10} + {digits.e} = {fmt(value)}
        </div>
        <div className="text-sm text-slate-700">
          Betűvel: <strong>{numberToHungarianWords(value)}</strong>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setChecked(value === target)}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
          Ellenőrzöm
        </button>
        {checked === true && <span className="text-emerald-700 font-bold">Szuper! Pontosan ezt a számot raktad ki. 🎉</span>}
        {checked === false && (
          <span className="text-rose-700 font-bold">
            Még nem jó. A {target} = {Math.floor(target / 100)} százas + {Math.floor((target % 100) / 10)} tízes + {target % 10} egyes.
          </span>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Kerekítő számegyenes
// ---------------------------------------------------------------------------
const ROUND_NUMBERS = [372, 595, 608, 920, 950, 975, 245, 137, 640, 851, 449, 999];

const RoundingLab: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState<'tizes' | 'szazas'>('tizes');
  const [picked, setPicked] = useState<number | null>(null);
  const n = ROUND_NUMBERS[idx];
  const step = mode === 'tizes' ? 10 : 100;
  const lower = Math.floor(n / step) * step;
  const upper = lower + step;
  const isRound = n % step === 0;
  const correct = isRound ? n : n - lower < upper - n ? lower : upper;

  const x0 = 30;
  const x1 = 370;
  const sx = (v: number) => x0 + ((x1 - x0) * (v - lower)) / step;
  const ticks = Array.from({ length: 11 }).map((_, i) => lower + (i * step) / 10);

  const choices = isRound ? [n, n + step] : [lower, upper];

  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setMode('tizes');
            setPicked(null);
          }}
          className={`px-4 py-2 rounded-xl text-sm font-bold ${mode === 'tizes' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Tízesre kerekítés
        </button>
        <button
          onClick={() => {
            setMode('szazas');
            setPicked(null);
          }}
          className={`px-4 py-2 rounded-xl text-sm font-bold ${mode === 'szazas' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Százasra kerekítés
        </button>
        <button
          onClick={() => {
            setIdx((i) => (i + 1) % ROUND_NUMBERS.length);
            setPicked(null);
          }}
          className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 ml-auto"
        >
          Új szám ➜
        </button>
      </div>

      <div className="text-center text-lg font-bold text-slate-700">
        Kerekítsd {mode === 'tizes' ? 'tízesre' : 'százasra'}: <span className="text-3xl font-black text-orange-600">{n}</span>
      </div>

      <svg viewBox="0 0 400 100" className="w-full h-auto bg-orange-50 rounded-xl border border-orange-200">
        <line x1={x0} y1="55" x2={x1} y2="55" stroke="#0f172a" strokeWidth="2" />
        {ticks.map((v, i) => (
          <line key={i} x1={sx(v)} x2={sx(v)} y1={i % 5 === 0 ? 45 : 50} y2={i % 5 === 0 ? 65 : 60} stroke="#334155" strokeWidth={i % 5 === 0 ? 1.6 : 0.8} />
        ))}
        <text x={sx(lower)} y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{lower}</text>
        <text x={sx(upper)} y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{upper}</text>
        <text x={sx(lower + step / 2)} y="84" textAnchor="middle" fontSize="10" fill="#94a3b8">{lower + step / 2} (közép)</text>
        <circle cx={sx(n)} cy="55" r="7" fill="#ea580c" />
        <text x={sx(n)} y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ea580c">{n}</text>
      </svg>

      <div className="flex flex-wrap justify-center gap-3">
        {choices.map((c) => (
          <button
            key={c}
            onClick={() => setPicked(c)}
            className={`min-w-[120px] px-5 py-3 rounded-xl text-xl font-black border-2 ${
              picked === c
                ? c === correct
                  ? 'bg-emerald-500 border-emerald-600 text-white'
                  : 'bg-rose-500 border-rose-600 text-white'
                : 'bg-white border-orange-300 text-slate-800 hover:bg-orange-50'
            }`}
          >
            {n} ≈ {c}
          </button>
        ))}
      </div>

      {picked !== null && (
        <TheoryCallout type={picked === correct ? 'success' : 'warning'} title={picked === correct ? 'Ügyes vagy!' : 'Nézd meg még egyszer!'}>
          {isRound
            ? `Ez a szám kerek ${mode === 'tizes' ? 'tízes' : 'százas'}, ezért a kerekített értéke maga a szám: ${n} ≈ ${n}.`
            : n - lower === upper - n
            ? `Ez a szám pont középen van a két szomszéd (${lower} és ${upper}) között. Ilyenkor a nagyobb szomszédra kerekítünk: ${n} ≈ ${upper}.`
            : `Távolság a kisebb szomszédtól (${lower}): ${n - lower}, a nagyobb szomszédtól (${upper}): ${upper - n}. A közelebbi szomszéd nyer: ${n} ≈ ${correct}.`}
        </TheoryCallout>
      )}
    </div>
  );
};

export const Numbers1000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="szamok-0-tol-1000-ig"
      title="1. Számok 0-tól 1000-ig"
      subtitle="Ismételjük át a háromjegyű számokat: százasok, tízesek, egyesek, számegyenes, számszomszédok és kerekítés."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="blue"
      pdfFilename="4_osztaly_szamok_0_tol_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz a számok 1000-ig gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — HELYI ÉRTÉK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                641 = 6 százas + 4 tízes + 1 egyes = 600 + 40 + 1
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Alaki érték:</strong> maga a leírt számjegy (6, 4, 1).
              </li>
              <li>
                <strong>Valódi érték:</strong> amennyit a számjegy a helyén ér (600, 40, 1).
              </li>
              <li>
                <strong>Kerekítés:</strong> a közelebbi szomszédhoz. Ha pont középen van, a nagyobbhoz!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 4–5. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A nyári szünetben a gyerekek sok helyen jártak. Kitti a <strong>324 m</strong> magas Megyer-hegynél, Alex a <strong>946 m</strong> magasan fekvő Szent Anna-tónál nyaralt.
            </p>
            <p>Ezek háromjegyű számok. Ebben a leckében átismételjük, amit 3. osztályban tanultál:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>hogyan épül fel egy szám százasokból, tízesekből és egyesekből,</li>
              <li>hogyan írjuk le számjeggyel és betűvel,</li>
              <li>hol a helye a számegyenesen, kik a szomszédai,</li>
              <li>hogyan kerekítjük tízesre és százasra.</li>
            </ul>
          </div>
          <NumberLine1000Svg />
        </div>
      </TheorySection>

      {/* 2. Helyiérték */}
      <TheorySection title="2. Alaki érték, helyi érték, valódi érték" badge="Tankönyv 6. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PlaceValueTableSvg />
          <div className="space-y-3">
            <TheoryCard title="Alaki érték" badge="a számjegy" badgeColor="blue">
              <p className="text-sm text-slate-700">A 273-ban az alaki értékek: 2, 7 és 3. Ezt a számjegyet látod leírva.</p>
            </TheoryCard>
            <TheoryCard title="Helyi érték" badge="a hely" badgeColor="sky">
              <p className="text-sm text-slate-700">Megmutatja, melyik helyen áll a számjegy: egyesek, tízesek, százasok (és ezresek) helye.</p>
            </TheoryCard>
            <TheoryCard title="Valódi érték" badge="amennyit ér" badgeColor="emerald">
              <p className="text-sm text-slate-700">A 7-es a tízesek helyén áll, ezért 70-et ér. A 2-es a százasok helyén 200-at ér.</p>
            </TheoryCard>
          </div>
        </div>
        <TheoryCallout type="info" title="Szám betűvel">
          A számokat betűvel egybeírjuk: 641 = <strong>hatszáznegyvenegy</strong>, 226 = <strong>kétszázhuszonhat</strong>, 406 = <strong>négyszázhat</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Nézzük meg együtt – számlálás */}
      <TheorySection title="3. Nézzük meg együtt! Hány darab van?" badge="Tankönyv 5–7. o." badgeColor="teal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Golyós számológép" badge="3. feladat" badgeColor="amber">
            <AbacusSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">3 piros (100) + 4 kék (10) + 6 sárga (1) golyó: 300 + 40 + 6 = <strong>346</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Zsebkendők csomagban" badge="4. feladat" badgeColor="blue">
            <TissueBoxesSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">Egy dobozban 100, egy csomagban 10 zsebkendő van. 2 doboz, 3 csomag, 5 darab: <strong>235</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Milliméterpapír" badge="MF 5. o." badgeColor="emerald">
            <HundredGridSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">Egy nagy négyzet 100, egy csík 10 kis négyzet. 2 nagy négyzet + 2 csík + 4 kicsi = <strong>224</strong>.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Pénzzel is így számolunk!">
          Egy 500 Ft-os bankjegy, két 100 Ft-os és egy 20 Ft-os érme: 500 + 200 + 20 = <strong>720 Ft</strong>. Kezdd mindig a legnagyobb pénzzel!
        </TheoryCallout>
      </TheorySection>

      {/* 4. Számszomszédok */}
      <TheorySection title="4. Számszomszédok" badge="Tankönyv 8. o." badgeColor="purple">
        <p className="text-sm text-slate-700 leading-relaxed">
          Minden számnak van kisebb és nagyobb <strong>egyes</strong>, <strong>tízes</strong> és <strong>százas szomszédja</strong>. Ha a szám maga kerek tízes vagy kerek százas, akkor a szomszédja a következő (vagy előző) kerek szám.
        </p>
        <TheoryTable
          headers={['Kisebb százas', 'Kisebb tízes', 'Kisebb egyes', 'Szám', 'Nagyobb egyes', 'Nagyobb tízes', 'Nagyobb százas']}
          rows={[
            ['100', '190', '197', '198', '199', '200', '200'],
            ['300', '370', '371', '372', '373', '380', '400'],
            ['900', '920', '924', '925', '926', '930', '1000']
          ]}
        />
        <TheoryCallout type="info" title="Nézd meg a 198-at!">
          A 198 nagyobb tízes szomszédja és nagyobb százas szomszédja is a 200 — ez nem hiba!
        </TheoryCallout>
      </TheorySection>

      {/* 5. Kerekítés */}
      <TheorySection title="5. Kerekítés tízesre és százasra" badge="Tankönyv 9. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Tízesre kerekítés:</strong> az a tízes szomszéd, amelyikhez közelebb van a szám a számegyenesen.
            </p>
            <p>
              <strong>Ha pont középen van</strong> (5-re végződik), akkor a <strong>nagyobb</strong> tízes szomszédra kerekítünk: 595 ≈ 600.
            </p>
            <p>
              <strong>Százasra kerekítés:</strong> ugyanígy, a közelebbi százas szomszédhoz. Középen (50-re végződik) a nagyobbhoz: 950 ≈ 1000.
            </p>
            <p>A kerek tízesek és százasok kerekített értéke maga a szám: 600 ≈ 600.</p>
          </div>
          <RoundingLineSvg />
        </div>
        <TheoryTable
          headers={['Szám', 'Tízesre kerekítve', 'Százasra kerekítve']}
          rows={[
            ['608', '610', '600'],
            ['920', '920', '900'],
            ['950', '950', '1000'],
            ['975', '980', '1000']
          ]}
        />
      </TheorySection>

      {/* 6. Nézzük meg együtt – fejtörők */}
      <TheorySection title="6. Nézzük meg együtt! Rajtszámok" badge="Tankönyv 8–9. o." badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Számkártyák: 9, 7, 0, 8" badge="14. feladat" badgeColor="sky">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>A legnagyobb háromjegyű szám: a legnagyobb számjegyek előre → <strong>987</strong>.</li>
              <li>A legkisebb: a 0 nem állhat elöl! Előre a 7, utána a 0, majd a 8 → <strong>708</strong>.</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="Kitalálós rajtszám" badge="16. feladat" badgeColor="purple">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>A százasok helyén álló számjegy valódi értéke 600 → a szám 6__.</li>
              <li>A tízesek helyén a legnagyobb számjegy, a 9 áll → 69_.</li>
              <li>A számjegyek összege 20: 6 + 9 = 15, még 5 kell → <strong>695</strong>.</li>
            </ol>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz! A nulla is számít" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A hiányzó tízes helyére 0 kerül"
          wrong="négyszázhat = 46"
          wrongExplanation="Kimaradt a tízesek helye! Így csak negyvenhat lett belőle."
          correct="négyszázhat = 406"
          correctExplanation="4 százas, 0 tízes, 6 egyes. Ha nincs tízes, a tízesek helyére 0-t írunk."
          tip="Írd be a számot a helyiérték-táblázatba: minden helyre kerüljön egy számjegy!"
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Játékos labor I: Számépítő golyós számológép" badge="Labor" badgeColor="blue">
        <p className="text-sm text-slate-600">Tegyél fel vagy vegyél le golyókat! Rakd ki a kért számot, aztán nyomd meg az Ellenőrzöm gombot.</p>
        <PlaceValueBuilder />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Játékos labor II: Kerekítő számegyenes" badge="Labor" badgeColor="orange">
        <p className="text-sm text-slate-600">Nézd meg, melyik szomszédhoz van közelebb a narancs pötty, és válaszd ki a kerekített értéket!</p>
        <RoundingLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Numbers1000Theory;
