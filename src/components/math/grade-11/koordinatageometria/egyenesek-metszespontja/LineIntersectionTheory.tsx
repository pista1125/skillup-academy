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
  LineIntersectionPlane,
  LineIntersectionShipsSvg,
  LineIntersectionExampleSvg,
  LineIntersectionCasesSvg,
  LineIntersectionMedianSvg,
  LIPlaneLine,
  LIPt
} from './LineIntersectionFigures';

const num = (x: number) => String(x).replace('.', ',').replace('-', '−');

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** p/q tört egyszerűsítve, magyar írásmóddal. */
const frac = (p: number, q: number) => {
  if (q < 0) {
    p = -p;
    q = -q;
  }
  const g = gcd(Math.round(Math.abs(p)), Math.round(Math.abs(q))) || 1;
  const a = p / g;
  const b = q / g;
  if (b === 1) return num(a);
  return `${a < 0 ? '−' : ''}${Math.abs(a)}/${b} ≈ ${(p / q).toFixed(3).replace('.', ',').replace('-', '−')}`;
};

/** ax + by = c szöveges alakja. */
const eqStr = (a: number, b: number, c: number) => {
  const parts: string[] = [];
  if (a !== 0) parts.push(`${a === 1 ? '' : a === -1 ? '−' : num(a)}x`);
  if (b !== 0) {
    const bb = Math.abs(b) === 1 ? '' : num(Math.abs(b));
    if (parts.length) parts.push(`${b > 0 ? '+' : '−'} ${bb}y`);
    else parts.push(`${b < 0 ? '−' : ''}${bb}y`);
  }
  if (!parts.length) parts.push('0');
  return `${parts.join(' ')} = ${num(c)}`;
};

/** Az ax + by = c egyenes két pontja (rajzoláshoz). */
const twoPoints = (a: number, b: number, c: number): [LIPt, LIPt] | null => {
  if (b !== 0) return [[0, c / b], [1, (c - a) / b]];
  if (a !== 0) return [[c / a, 0], [c / a, 1]];
  return null;
};

type Coef = { a: number; b: number; c: number };

const PRESETS: { name: string; e: Coef; f: Coef }[] = [
  { name: 'Hajók', e: { a: 5, b: 4, c: 7 }, f: { a: 4, b: -1, c: 14 } },
  { name: 'Elmélet 1.', e: { a: 3, b: 1, c: -1 }, f: { a: 2, b: -3, c: -19 } },
  { name: 'Elmélet 2. (∅)', e: { a: 5, b: 3, c: 43 }, f: { a: 15, b: 9, c: 7 } },
  { name: '1. d) (egybeeső)', e: { a: 1, b: -1, c: 4 }, f: { a: 5, b: -5, c: 20 } },
  { name: '1. b)', e: { a: 3, b: -1, c: 16 }, f: { a: 2, b: 5, c: 5 } }
];

export const LineIntersectionTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [e, setE] = useState<Coef>({ a: 3, b: 1, c: -1 });
  const [f, setF] = useState<Coef>({ a: 2, b: -3, c: -19 });
  // Labor II
  const [p, setP] = useState<LIPt>([-1, 3]);

  const D = e.a * f.b - f.a * e.b;
  const Dx = e.c * f.b - f.c * e.b;
  const Dy = e.a * f.c - f.a * e.c;
  const validE = e.a !== 0 || e.b !== 0;
  const validF = f.a !== 0 || f.b !== 0;
  let verdict: 'one' | 'none' | 'same' | 'invalid' = 'invalid';
  if (validE && validF) verdict = D !== 0 ? 'one' : Dx === 0 && Dy === 0 ? 'same' : 'none';
  const sx = D !== 0 ? Dx / D : NaN;
  const sy = D !== 0 ? Dy / D : NaN;

  const lines: LIPlaneLine[] = [];
  const tpE = validE ? twoPoints(e.a, e.b, e.c) : null;
  const tpF = validF ? twoPoints(f.a, f.b, f.c) : null;
  if (tpE) lines.push({ p: tpE[0], q: tpE[1], color: '#2563eb', label: 'e', labelAt: 0.92, width: 3 });
  if (tpF) lines.push({ p: tpF[0], q: tpF[1], color: '#dc2626', label: 'f', labelAt: 0.1, width: 2.4, dashed: verdict === 'same' });

  const coefInput = (which: 'e' | 'f', key: keyof Coef, v: number) => (
    <input
      type="number"
      step={1}
      value={v}
      onChange={(ev) => {
        const n = Number(ev.target.value);
        if (!Number.isFinite(n)) return;
        const val = Math.max(-200, Math.min(200, Math.round(n)));
        if (which === 'e') setE({ ...e, [key]: val });
        else setF({ ...f, [key]: val });
      }}
      className="w-14 rounded-md border border-slate-300 px-1.5 py-1 text-sm font-mono text-center"
      aria-label={`${which} ${key}`}
    />
  );

  // Labor II: hajók
  const eVal = 5 * p[0] + 4 * p[1];
  const fVal = 4 * p[0] - p[1];
  const onE = eVal === 7;
  const onF = fVal === 14;

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="egyenesek-metszespontja"
      title="14. Egyenesek metszéspontja"
      subtitle="Két egyenes közös pontjait a két egyenletből álló egyenletrendszer megoldásai adják: metsző, párhuzamos és egybeeső egyenesek."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_egyenesek_metszespontja_tananyag.pdf"
      practiceTitle="Készen állsz a metszéspontok kiszámítására?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KÉT EGYENES METSZÉSPONTJA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">közös pont ⇔ az egyenletrendszer megoldása</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Egy pont akkor van rajta egy egyenesen, ha koordinátáit az egyenletbe <strong>behelyettesítve igaz</strong> kijelentést kapunk.
              </li>
              <li>
                A metszéspontot a két egyenletből álló egyenletrendszer adja: <strong>behelyettesítő módszer</strong> vagy <strong>egyenlő együtthatók módszere</strong>.
              </li>
              <li>
                Egy megoldás: metsző egyenesek; nincs megoldás: párhuzamos egyenesek; végtelen sok megoldás: egybeeső egyenesek.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: két hajó pályája" badge="Tankönyv 252. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Két hajó mozgását a monitoron követve azt látjuk, hogy a <strong>NewSea</strong> az <strong>e: 5x + 4y = 7</strong>, a <strong>DrunkenSailor</strong> pedig az <strong>f: 4x − y = 14</strong> egyenletű egyenesen mozog. Áthaladnak-e a hajók az A(−1; 3), a B(3; −2) és a C(4; 2) pontokon?
            </p>
            <p><strong>Megoldás.</strong> A pontok koordinátáit behelyettesítjük mindkét egyenletbe:</p>
            <TheoryTable
              headers={['Pont', 'e: 5x + 4y = 7', 'f: 4x − y = 14', 'Következtetés']}
              rows={[
                ['A(−1; 3)', '−5 + 12 = 7 ✓', '−4 − 3 = 14 ✗', 'csak e-n'],
                ['B(3; −2)', '15 − 8 = 7 ✓', '12 + 2 = 14 ✓', 'mindkettőn'],
                ['C(4; 2)', '20 + 8 = 7 ✗', '16 − 2 = 14 ✓', 'csak f-en']
              ]}
            />
            <p>
              Mivel két különböző egyenesről van szó, a metszéspontjuk a <strong>B(3; −2)</strong> pont: a NewSea az A és B, a DrunkenSailor a B és C ponton halad át.
            </p>
          </div>
          <LineIntersectionShipsSvg />
        </div>
        <TheoryCallout type="info" title="Megjegyzés">
          A metszéspont koordinátái a két pálya egyenletéből felírt egyenletrendszer megoldásaként is adódnak. A megoldáshoz a behelyettesítő módszert és az egyenlő együtthatók módszerét is használhatjuk.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Két egyenes metszéspontja" badge="Elmélet" badgeColor="indigo">
        <TheoryCallout type="tip" title="Tétel">
          Ha ismerjük két síkbeli alakzat egyenletét, akkor a két egyenletből álló kétismeretlenes egyenletrendszer megoldásai éppen a két síkbeli alakzat <strong>közös pontjait</strong> adják meg.
        </TheoryCallout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p className="font-bold">1. példa: 3x + y = −1 és 2x − 3y = −19</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az első egyenletből y = −3x − 1 (behelyettesítő módszer).</li>
              <li>2x − 3(−3x − 1) = −19 ⇒ 2x + 9x + 3 = −19 ⇒ 11x = −22 ⇒ <strong>x = −2</strong>.</li>
              <li>y = −3 · (−2) − 1 = <strong>5</strong>.</li>
              <li>A metszéspont: <strong>(−2; 5)</strong>. Ellenőrzés: −6 + 5 = −1 ✓, −4 − 15 = −19 ✓.</li>
            </ul>
            <p className="font-bold">2. példa: 5x + 3y = 43 és 15x + 9y = 7</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az első egyenlet 3-szorosa: 15x + 9y = 129, ami ellentmond a 15x + 9y = 7 egyenletnek.</li>
              <li>A megoldáshalmaz az <strong>üres halmaz</strong>: a két egyenesnek nincs közös pontja – párhuzamosak.</li>
            </ul>
          </div>
          <LineIntersectionExampleSvg />
        </div>
        <LineIntersectionCasesSvg className="w-full h-auto max-w-2xl mx-auto" />
        <TheoryTable
          headers={['Az egyenletrendszer', 'Megoldások száma', 'A két egyenes']}
          rows={[
            ['3x − y = 16 és 2x + 5y = 5', '1: (5; −1)', 'metsző'],
            ['6x − 10y = 3 és −3x + 5y = 2', '0 (a 2. egyenlet −2-szerese 6x − 10y = −4)', 'párhuzamos'],
            ['x − y = 4 és 5x − 5y = 20', 'végtelen sok (a 2. az 1. ötszöröse)', 'egybeeső']
          ]}
        />
      </TheorySection>

      {/* 3. Tankönyvi feladatok */}
      <TheorySection title="3. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Egyenlő együtthatók (1. a)" badge="3x − 7y = −7, 6x − 7y = −28" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A két egyenletben y együtthatója egyenlő; kivonjuk az elsőt a másodikból: 3x = −21 ⇒ <strong>x = −7</strong>.</li>
              <li>3 · (−7) − 7y = −7 ⇒ −7y = 14 ⇒ <strong>y = −2</strong>.</li>
              <li>A közös pont: <strong>(−7; −2)</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Egyenes adott metszésponttal (2. feladat)" badge="e: −3x + 2y = 10" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> A (−3; 0,5) pont rajta van e-n (9 + 1 = 10), így minden más, rajta átmenő egyenes ott metszi e-t, pl. <strong>x = −3</strong> vagy <strong>y = 0,5</strong>.</li>
              <li><strong>b)</strong> e: y = 3/2 x + 5, így az origón átmenő, ugyanilyen meredekségű egyenes <strong>y = 3/2 x</strong> (azaz 3x − 2y = 0).</li>
              <li><strong>c)</strong> e 2 abszcisszájú pontja: −6 + 2y = 10 ⇒ y = 8, tehát (2; 8). A −3 meredekségű egyenes: y − 8 = −3(x − 2), azaz <strong>y = −3x + 14</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Az oldal felezőpontja (3. feladat)" badge="AB: 7x − 3y = −13" badgeColor="emerald">
            <LineIntersectionMedianSvg className="w-full max-w-[260px] h-auto mx-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A C-ből induló súlyvonal az AB oldalt a felezőpontjában metszi, ezért F az AB oldalegyenes és a súlyvonal (−6x + 2y = 14) metszéspontja.</li>
              <li>A második egyenletből y = 3x + 7; behelyettesítve 7x − 9x − 21 = −13 ⇒ x = −4, y = −5.</li>
              <li>Az AB oldal felezőpontja: <strong>F(−4; −5)</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> 4x − 5y = 13 metszéspontja x + 2y = 0-val (2; −1); x + 3y = 2-vel (49/17; −5/17); x + 4y = 4-gyel (24/7; 1/7).</li>
              <li><strong>HF 2.</strong> f: 5x − 3y = 7 (m = 5/3): b) y = 3/5 x; c) f 1 ordinátájú pontja (2; 1), a keresett egyenes y = −3x + 7.</li>
              <li><strong>HF 3.</strong> A két súlyvonal (2x + 6y = 5 és x − 5y = 6,5) metszéspontja a súlypont: <strong>S(4; −0,5)</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: csak az egyik egyenletbe helyettesítünk" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A metszéspontnak MINDKÉT egyenletet ki kell elégítenie"
          wrong="A(−1; 3): 5 · (−1) + 4 · 3 = 7 ✓ ⇒ A a két hajó pályájának metszéspontja"
          wrongExplanation="Az A pont csak az e egyenesre illeszkedik: az f egyenletébe helyettesítve −4 − 3 = −7 ≠ 14."
          correct="B(3; −2): 15 − 8 = 7 ✓ és 12 + 2 = 14 ✓ ⇒ B a metszéspont"
          correctExplanation="A kiszámolt (x; y) számpárt mindig ellenőrizzük mindkét egyenletbe visszahelyettesítve."
          tip="Ha az egyenletrendszer ellentmondásra (pl. 0 = 122) vezet, az egyenesek párhuzamosak; ha azonosságra (0 = 0), egybeesnek."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Két egyenes – egy egyenletrendszer" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            {PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setE(pr.e);
                  setF(pr.f);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 text-sm font-mono">
                <span className="font-bold text-blue-700 mr-1">e:</span>
                {coefInput('e', 'a', e.a)} x +{coefInput('e', 'b', e.b)} y ={coefInput('e', 'c', e.c)}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-sm font-mono">
                <span className="font-bold text-red-700 mr-1">f:</span>
                {coefInput('f', 'a', f.a)} x +{coefInput('f', 'b', f.b)} y ={coefInput('f', 'c', f.c)}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1" data-testid="li-system-result">
                <div>e: {eqStr(e.a, e.b, e.c)}</div>
                <div>f: {eqStr(f.a, f.b, f.c)}</div>
                {verdict === 'invalid' ? (
                  <div className="text-rose-700">Az x és y együtthatója nem lehet egyszerre 0.</div>
                ) : (
                  <>
                    <div className="text-xs text-slate-500 pt-1">
                      Egyenlő együtthatók: (e) · {num(f.b)} − (f) · {num(e.b)} ⇒ ({num(D)}) · x = {num(Dx)}
                    </div>
                    {verdict === 'one' && (
                      <div className="text-emerald-800">
                        Egyetlen megoldás: x = {frac(Dx, D)}, y = {frac(Dy, D)} ⇒ <strong>metsző egyenesek</strong>
                      </div>
                    )}
                    {verdict === 'none' && (
                      <div className="text-rose-700">
                        {Dx !== 0 ? `0 · x = ${num(Dx)}` : `0 · y = ${num(Dy)}`} – ellentmondás ⇒ nincs megoldás, <strong>párhuzamos egyenesek</strong>
                      </div>
                    )}
                    {verdict === 'same' && (
                      <div className="text-purple-700">
                        0 · x = 0 – azonosság ⇒ végtelen sok megoldás, <strong>egybeeső egyenesek</strong>
                      </div>
                    )}
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 italic">
                Írd át az együtthatókat! Ha a két egyenlet bal oldala egymás számszorosa, az egyenesek párhuzamosak – ha a jobb oldal is ugyanannyiszoros, akkor egybeesnek.
              </p>
            </div>
            <LineIntersectionPlane
              xMin={-8}
              xMax={8}
              yMin={-8}
              yMax={8}
              unit={17}
              ticks="all"
              tickStep={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={lines}
              points={verdict === 'one' && Math.abs(sx) <= 8 && Math.abs(sy) <= 8 ? [{ at: [sx, sy], label: 'M', color: '#7c3aed' }] : []}
            />
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Rajta van-e a pont? (hajópályák)" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <LineIntersectionPlane
              xMin={-4}
              xMax={7}
              yMin={-5}
              yMax={6}
              unit={26}
              ticks="all"
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              onPointClick={(x, y) => setP([x, y])}
              lines={[
                { p: [-1, 3], q: [3, -2], color: '#2563eb', label: 'e', labelAt: 0.08 },
                { p: [3, -2], q: [4, 2], color: '#dc2626', label: 'f', labelAt: 0.92 }
              ]}
              points={[{ at: p, label: `P(${num(p[0])}; ${num(p[1])})`, color: onE && onF ? '#7c3aed' : '#0f172a' }]}
            />
            <div className="space-y-3">
              <p className="text-xs text-slate-500 italic">Kattints egy rácspontra, vagy válassz a tankönyvi pontok közül!</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['A(−1; 3)', [-1, 3]],
                    ['B(3; −2)', [3, -2]],
                    ['C(4; 2)', [4, 2]],
                    ['O(0; 0)', [0, 0]]
                  ] as [string, LIPt][]
                ).map(([name, pt]) => (
                  <button
                    key={name}
                    onClick={() => setP(pt)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1" data-testid="li-point-check">
                <div className={onE ? 'text-emerald-700' : 'text-rose-700'}>
                  e: 5 · ({num(p[0])}) + 4 · ({num(p[1])}) = {num(eVal)} {onE ? '= 7 ✓ rajta van' : '≠ 7 ✗ nincs rajta'}
                </div>
                <div className={onF ? 'text-emerald-700' : 'text-rose-700'}>
                  f: 4 · ({num(p[0])}) − ({num(p[1])}) = {num(fVal)} {onF ? '= 14 ✓ rajta van' : '≠ 14 ✗ nincs rajta'}
                </div>
                <div className="pt-1 font-bold text-purple-800">
                  {onE && onF
                    ? 'A P pont mindkét pályán rajta van: ez a metszéspont!'
                    : onE
                      ? 'Csak a NewSea pályáján van.'
                      : onF
                        ? 'Csak a DrunkenSailor pályáján van.'
                        : 'Egyik pályán sincs rajta.'}
                </div>
              </div>
              <TheoryCallout type="success" title="Figyeld meg!">
                Csak egyetlen rácspont ad mindkét egyenletre igaz kijelentést – a két egyenes metszéspontja. Az egyenletrendszer 5x + 4y = 7, 4x − y = 14 megoldása ugyanez: x = 3, y = −2.
              </TheoryCallout>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LineIntersectionTheory;
