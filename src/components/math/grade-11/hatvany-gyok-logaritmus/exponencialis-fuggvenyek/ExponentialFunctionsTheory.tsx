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
  ExponentialFunctionsBase2Svg,
  ExponentialFunctionsDiscreteSvg,
  ExponentialFunctionsFamilySvg,
  ExponentialFunctionsIrrationalSvg,
  ExponentialFunctionsMirrorSvg,
  expPath
} from './ExponentialFunctionsFigures';

const fmt = (x: number, d = 3) => {
  if (!Number.isFinite(x)) return '–';
  const s = Number(x.toFixed(d)).toString();
  return s.replace('.', ',').replace('-', '−');
};

/** Tört vagy tizedes tört beolvasása ("1/3", "0,5", "2"). */
const parseNum = (s: string): number => {
  const t = s.trim().replace(',', '.');
  if (t.includes('/')) {
    const [a, b] = t.split('/').map(Number);
    return b ? a / b : NaN;
  }
  return t === '' ? NaN : Number(t);
};

/** Rejtett alapok a grafikon-nyomozóhoz: alap és a rácson jól leolvasható pont. */
const DETECTIVE: { a: number; px: number; label: string }[] = [
  { a: 3, px: 1, label: '3' },
  { a: 0.5, px: -2, label: '1/2' },
  { a: 2, px: 2, label: '2' },
  { a: 1 / 3, px: -1, label: '1/3' },
  { a: 4, px: 1, label: '4' },
  { a: 0.25, px: -1, label: '1/4' },
  { a: 5, px: 1, label: '5' },
  { a: 0.2, px: -1, label: '1/5' }
];

/** HF 2. pontjai (f = 3ˣ, g = (1/3)ˣ, h = 9ˣ). */
const HF2_POINTS: { name: string; x: number; y: number; text: string }[] = [
  { name: 'P₁', x: 0.5, y: Math.sqrt(3), text: '(1/2; √3)' },
  { name: 'P₂', x: -1, y: 1 / 3, text: '(−1; 1/3)' },
  { name: 'P₃', x: -0.5, y: 1 / 3, text: '(−1/2; 1/3)' },
  { name: 'P₄', x: 1, y: 0, text: '(1; 0)' },
  { name: 'P₆', x: 0, y: 1, text: '(0; 1)' },
  { name: 'P₇', x: 1 / 3, y: Math.cbrt(3), text: '(1/3; ∛3)' },
  { name: 'P₈', x: -2, y: 9, text: '(−2; 9)' }
];

export const ExponentialFunctionsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [a, setA] = useState<number>(2);
  const [xt, setXt] = useState<number>(1.5);
  const [mirror, setMirror] = useState<boolean>(false);
  const isConst = Math.abs(a - 1) < 1e-9;
  const ox = 200;
  const oy = 250;
  const k = 40;
  const yMax = 5.6;
  const yT = Math.pow(a, xt);

  // Labor II
  const [idx, setIdx] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [pointIdx, setPointIdx] = useState<number>(0);
  const cur = DETECTIVE[idx];
  const g = parseNum(guess);
  const correct = Number.isFinite(g) && Math.abs(g - cur.a) < 1e-6;
  const py = Math.pow(cur.a, cur.px);
  const ox2 = 170;
  const oy2 = 230;
  const k2 = 34;
  const pt = HF2_POINTS[pointIdx];
  const onF = Math.abs(Math.pow(3, pt.x) - pt.y) < 1e-9;
  const onG = Math.abs(Math.pow(1 / 3, pt.x) - pt.y) < 1e-9;
  const onH = Math.abs(Math.pow(9, pt.x) - pt.y) < 1e-9;
  const onAny = [onF && 'f(x) = 3ˣ', onG && 'g(x) = (1/3)ˣ', onH && 'h(x) = 9ˣ'].filter(Boolean) as string[];

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="exponencialis-fuggvenyek"
      title="7. Exponenciális függvények"
      subtitle="Az x ↦ aˣ függvény: értelmezés irracionális kitevőre, grafikon, értékkészlet, monotonitás, szélsőérték, zérushely. Növekvő, ha a > 1; csökkenő, ha 0 < a < 1."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_exponencialis_fuggvenyek_tananyag.pdf"
      practiceTitle="Készen állsz az exponenciális függvényes feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ a ALAPÚ EXPONENCIÁLIS FÜGGVÉNY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">f : R → R; x ↦ aˣ (a &gt; 0, a ≠ 1)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Értelmezési tartomány:</strong> R; <strong>értékkészlet:</strong> R⁺ (a pozitív valós számok).</li>
              <li><strong>a &gt; 1:</strong> szigorúan monoton növekvő; <strong>0 &lt; a &lt; 1:</strong> szigorúan monoton csökkenő.</li>
              <li>Nincs szélsőértéke, nincs zérushelye; grafikonja mindig átmegy a (0; 1) ponton.</li>
              <li>Az x ↦ 1ˣ konstans függvény – nem soroljuk az exponenciális függvények közé.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a 2ˣ függvény véges sok pontban" badge="Tankönyv 96. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Számológép segítségével ábrázoltuk az x ↦ 2ˣ hozzárendelési szabályú függvényt, amelynek értelmezési tartománya a {'{'}−2,6; −2,5; −2,4; …; 3,1{'}'} halmaz.
              A grafikon <strong>58 pontból</strong> áll.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A függvény <strong>szigorúan monoton növekvő</strong>.</li>
              <li>Értékkészlete 58 elemű halmaz; legkisebb eleme 2<sup>−2,6</sup> ≈ 0,165, legnagyobb eleme 2<sup>3,1</sup> ≈ 8,574.</li>
              <li>Ha más értelmezési tartományt választunk, a szigorú monoton növekedés biztosan megmarad.</li>
            </ul>
          </div>
          <ExponentialFunctionsDiscreteSvg />
        </div>
      </TheorySection>

      {/* 2. Irracionális kitevő */}
      <TheorySection title="2. Hatvány irracionális kitevőre" badge="Tankönyv 96. o." badgeColor="indigo">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Az eddigi műveletekkel az x ↦ 2ˣ szabályhoz csak a racionális számok halmazának valamely részhalmazát választhatjuk értelmezési tartománynak. Felsőbb matematikai
            ismeretekkel a hatvány fogalma <strong>irracionális kitevőre</strong> is egyértelműen kiterjeszthető úgy, hogy a kiterjesztés megőrzi a szigorú monotonitást, és
            az azonosságok érvényben maradnak.
          </p>
          <p>
            Például √2 irracionális, és 1,414 &lt; √2 &lt; 1,415. A 2<sup>√2</sup> hatványt úgy kell értelmezni, hogy 2<sup>1,414</sup> &lt; 2<sup>√2</sup> &lt; 2<sup>1,415</sup>,
            azaz 2,665 &lt; 2<sup>√2</sup> &lt; 2,667 teljesüljön – sőt bármely r₁ &lt; √2 &lt; r₂ racionális számokra 2<sup>r₁</sup> &lt; 2<sup>√2</sup> &lt; 2<sup>r₂</sup>.
          </p>
          <p>
            Számológéppel: 2<sup>√2</sup> ≈ <strong>2,665</strong>.
          </p>
        </div>
        <ExponentialFunctionsIrrationalSvg />
      </TheorySection>

      {/* 3. Elmélet */}
      <TheorySection title="3. A kettes alapú és az a alapú exponenciális függvény" badge="Elmélet" badgeColor="teal">
        <ExponentialFunctionsBase2Svg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A kettes alapú exponenciális függvény" badge="x ↦ 2ˣ" badgeColor="violet">
            <p className="text-sm text-slate-700">
              A valós számok halmazán értelmezett x ↦ 2ˣ függvényt <strong>kettes alapú exponenciális függvénynek</strong> nevezzük. Grafikonja folytonos vonallal rajzolható.
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-700 mt-2 space-y-0.5">
              <li>D<sub>f</sub> = R; R<sub>f</sub> = R⁺;</li>
              <li>szigorúan monoton növekvő;</li>
              <li>nincs szélsőértéke (nincs legnagyobb és legkisebb értéke);</li>
              <li>nincs zérushelye.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Definíció: a alapú exponenciális függvény" badge="a > 0, a ≠ 1" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Ha a pozitív szám, de nem egyenlő 1-gyel, akkor a valós számok halmazán értelmezett x ↦ aˣ függvényt <strong>a alapú exponenciális függvénynek</strong> nevezzük.
              (Az <em>exponens</em> latin szó jelentése: hatványkitevő; a függvény exponenciális, ha a független változó a hatványkitevőben van.)
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-700 mt-2 space-y-0.5">
              <li>R<sub>f</sub> = R⁺;</li>
              <li>ha 1 &lt; a: szigorúan monoton <strong>növekvő</strong>; ha 0 &lt; a &lt; 1: szigorúan monoton <strong>csökkenő</strong>;</li>
              <li>nincs szélsőértéke, nincs zérushelye.</li>
            </ul>
          </TheoryCard>
        </div>
        <ExponentialFunctionsFamilySvg />
        <TheoryCallout type="info" title="Megjegyzés: miért nem exponenciális az 1ˣ?">
          Az x ↦ 1ˣ függvény minden függvényértéke 1, tehát konstans függvény. Szinte minden lényeges tulajdonságában különbözik az exponenciális függvényektől, ezért – bár formailag
          elfogadható lenne – nem soroljuk közéjük.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Feladatok megoldása" badge="Tankönyv 96–97. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Értéktáblázat: 3ˣ, 0,5ˣ, 1,5ˣ" badge="Ábrázolás" badgeColor="sky">
            <TheoryTable
              headers={['x', '−2', '−1', '0', '1', '2', '3']}
              rows={[
                ['3ˣ', '1/9', '1/3', '1', '3', '9', '27'],
                ['0,5ˣ', '4', '2', '1', '0,5', '0,25', '0,125'],
                ['1,5ˣ', '4/9', '2/3', '1', '1,5', '2,25', '3,375']
              ]}
            />
            <p className="text-sm text-slate-700 mt-2">
              f(x) = 3ˣ és h(x) = 1,5ˣ szigorúan monoton növekvő, g(x) = 0,5ˣ szigorúan monoton csökkenő; mindhárom értékkészlete R⁺, egyiknek sincs szélsőértéke, zérushelye.
            </p>
          </TheoryCard>
          <TheoryCard title="1. d) Melyik két egész szám közé esik?" badge="Becslés" badgeColor="violet">
            <TheoryTable
              headers={['Szám', 'Becslés a grafikonról', 'Számológéppel']}
              rows={[
                [<span key="a">3<sup>7/8</sup></span>, '2 és 3 között', '≈ 2,615'],
                [<span key="b">3<sup>−3/5</sup></span>, '0 és 1 között', '≈ 0,517'],
                [<span key="c">0,5<sup>−5/4</sup></span>, '2 és 3 között', '≈ 2,378'],
                [<span key="d">1,5<sup>3/2</sup></span>, '1 és 2 között', '≈ 1,837']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="3. (3/4)ˣ, (4/3)ˣ, (3/4)⁻ˣ, (4/3)⁻ˣ" badge="Tükrözés" badgeColor="indigo">
            <p className="text-sm text-slate-700">
              (3/4)⁻ˣ = ((3/4)⁻¹)ˣ = (4/3)ˣ és (4/3)⁻ˣ = (3/4)ˣ, ezért <strong>f = k</strong> és <strong>g = h</strong>: a közös koordináta-rendszerben csak két különböző
              grafikon van, és ezek egymás tükörképei az y tengelyre.
            </p>
          </TheoryCard>
          <TheoryCard title="HF 1. f(x) = 0,25ˣ" badge="Függvényérték" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> f(0) = 1; f(1) = 0,25; f(−1) = 4; f(−5) = 4⁵ = 1024; f(5) = 1/1024 ≈ 0,000977.</li>
              <li><strong>b)</strong> f(−a) = 1/f(a), azaz f(a) · f(−a) = 1.</li>
              <li><strong>d)</strong> 0,25ˣ = 3 megoldása a grafikonról ≈ −0,8 (számológéppel x ≈ −0,792, mert 0,25<sup>−0,792</sup> ≈ 3).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 2. f = 3ˣ, g = (1/3)ˣ, h = 9ˣ – melyik pont melyik grafikonon?" badge="Pontillesztés" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>P₁(1/2; √3), P₂(−1; 1/3), P₇(1/3; ∛3) → f; P₈(−2; 9) → g; P₃(−1/2; 1/3) → h.</li>
              <li>P₆(0; 1) mindhárom grafikonon rajta van; P₄(1; 0) egyiken sem (exponenciális függvény sosem 0).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="HF 3. 5ˣ, (1/5)ˣ, 5⁻ˣ" badge="Azonos függvények" badgeColor="slate">
            <p className="text-sm text-slate-700">(1/5)ˣ = 5⁻ˣ, tehát g = h; a grafikonjuk az f(x) = 5ˣ grafikonjának tükörképe az y tengelyre.</p>
          </TheoryCard>
        </div>
        <ExponentialFunctionsMirrorSvg />
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: az exponenciális függvény nem metszi az x tengelyt" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="aˣ sosem 0 és sosem negatív – és a negatív kitevő nem negatív értéket ad"
          wrong="2⁻³ = −8; a grafikon a negatív x-eknél az x tengely alá megy; a (3; 0) pont rajta van a 0,5ˣ grafikonján"
          wrongExplanation="A negatív kitevő reciprokot jelent, nem negatív előjelet: 2⁻³ = 1/2³ = 1/8. Az exponenciális függvény értékkészlete R⁺, ezért a grafikon mindig az x tengely felett van; az x tengelyhez közelít, de sosem éri el (nincs zérushelye)."
          correct="2⁻³ = 1/8 > 0; 0,5³ = 0,125 ≠ 0; aˣ > 0 minden valós x-re"
          correctExplanation="Ha 0 < a < 1, a grafikon jobbra halad az x tengelyhez közel, ha a > 1, balra. Az y tengelyt mindig a (0; 1) pontban metszi."
          tip="A csökkenő vagy növekvő döntéshez csak az alapot nézd: a > 1 növekvő, 0 < a < 1 csökkenő. a⁻ˣ = (1/a)ˣ, így a⁻ˣ a > 1 esetén csökkenő!"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Az aˣ függvény felfedezése" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">alap a: {fmt(a, 2)}</label>
                <input
                  type="range"
                  min="0.1"
                  max="4"
                  step="0.05"
                  value={a}
                  onChange={(e) => setA(Number(e.target.value))}
                  className="w-full accent-violet-600"
                  aria-label="alap"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {[0.25, 0.5, 0.8, 1, 1.5, 2, 3].map((v) => (
                    <button key={v} onClick={() => setA(v)} className="px-2 py-0.5 rounded bg-violet-100 text-violet-800 text-xs font-bold hover:bg-violet-200">
                      {fmt(v, 2)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">x érték (nyomkövetés): {fmt(xt, 2)}</label>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.05"
                  value={xt}
                  onChange={(e) => setXt(Number(e.target.value))}
                  className="w-full accent-pink-600"
                  aria-label="x érték"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-600">
                <input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} aria-label="tükörkép" />
                mutasd a (1/a)ˣ = a⁻ˣ grafikonját is
              </label>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
                {isConst ? (
                  <div className="text-amber-700 font-bold">a = 1: az x ↦ 1ˣ konstans függvény (minden értéke 1) – nem exponenciális függvény!</div>
                ) : (
                  <>
                    <div className="text-lg">
                      f({fmt(xt, 2)}) = {fmt(a, 2)}
                      <sup>{fmt(xt, 2)}</sup> ≈ <strong className="text-violet-700">{fmt(yT, 4)}</strong>
                    </div>
                    <div>
                      Monotonitás: <strong className={a > 1 ? 'text-emerald-700' : 'text-sky-700'}>{a > 1 ? 'szigorúan monoton növekvő (a > 1)' : 'szigorúan monoton csökkenő (0 < a < 1)'}</strong>
                    </div>
                    <div className="text-xs">Értékkészlet: R⁺; zérushely: nincs; szélsőérték: nincs; f(0) = 1, f(1) = {fmt(a, 2)}, f(−1) = {fmt(1 / a, 3)}.</div>
                  </>
                )}
              </div>
            </div>
            <svg viewBox="0 0 400 280" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((t) => (
                <g key={t}>
                  <line x1={ox + t * k} y1="20" x2={ox + t * k} y2={oy} stroke="#e2e8f0" />
                  <text x={ox + t * k} y={oy + 14} fontSize="10" textAnchor="middle" fill="#64748b">
                    {String(t).replace('-', '−')}
                  </text>
                </g>
              ))}
              {[1, 2, 3, 4, 5].map((t) => (
                <g key={t}>
                  <line x1="30" y1={oy - t * k} x2="370" y2={oy - t * k} stroke="#e2e8f0" />
                  <text x={ox - 5} y={oy - t * k + 4} fontSize="10" textAnchor="end" fill="#64748b">
                    {t}
                  </text>
                </g>
              ))}
              <line x1="30" y1={oy} x2="375" y2={oy} stroke="#475569" strokeWidth="1.5" />
              <line x1={ox} y1={oy + 10} x2={ox} y2="15" stroke="#475569" strokeWidth="1.5" />
              {mirror && !isConst && <path d={expPath(1 / a, ox, oy, k, -4.2, 4.2, yMax)} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 4" />}
              <path d={isConst ? `M ${ox - 4.2 * k} ${oy - k} L ${ox + 4.2 * k} ${oy - k}` : expPath(a, ox, oy, k, -4.2, 4.2, yMax)} fill="none" stroke={isConst ? '#f59e0b' : '#7c3aed'} strokeWidth="3" />
              <circle cx={ox} cy={oy - k} r="4" fill="#0f172a" />
              {yT <= yMax && (
                <g>
                  <line x1={ox + xt * k} y1={oy} x2={ox + xt * k} y2={oy - yT * k} stroke="#be185d" strokeDasharray="3 3" />
                  <line x1={ox} y1={oy - yT * k} x2={ox + xt * k} y2={oy - yT * k} stroke="#be185d" strokeDasharray="3 3" />
                  <circle cx={ox + xt * k} cy={oy - yT * k} r="5" fill="#be185d" />
                </g>
              )}
              <text x="370" y="272" fontSize="11" textAnchor="end" fill="#7c3aed" fontWeight="bold">
                y = {fmt(a, 2)}ˣ
              </text>
              {mirror && !isConst && (
                <text x="30" y="272" fontSize="11" fill="#0369a1" fontWeight="bold">
                  y = (1/{fmt(a, 2)})ˣ
                </text>
              )}
            </svg>
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            Minden görbe átmegy a (0; 1) ponton. Minél nagyobb a (a &gt; 1), annál meredekebben nő a görbe jobbra; 0 &lt; a &lt; 1-nél balra nő. Az a és az 1/a alapú görbe egymás tükörképe az y tengelyre.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Grafikon-nyomozó és pontillesztés" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <svg viewBox="0 0 340 260" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((t) => (
                <line key={`v${t}`} x1={ox2 + t * k2} y1="20" x2={ox2 + t * k2} y2={oy2} stroke="#e2e8f0" />
              ))}
              {[1, 2, 3, 4, 5, 6].map((t) => (
                <line key={`h${t}`} x1="25" y1={oy2 - t * k2} x2="315" y2={oy2 - t * k2} stroke="#e2e8f0" />
              ))}
              <line x1="25" y1={oy2} x2="320" y2={oy2} stroke="#475569" strokeWidth="1.5" />
              <line x1={ox2} y1={oy2 + 10} x2={ox2} y2="12" stroke="#475569" strokeWidth="1.5" />
              <text x={ox2 + k2} y={oy2 + 14} fontSize="10" textAnchor="middle" fill="#334155">
                1
              </text>
              <text x={ox2 - 5} y={oy2 - k2 + 4} fontSize="10" textAnchor="end" fill="#334155">
                1
              </text>
              <path d={expPath(cur.a, ox2, oy2, k2, -4.4, 4.4, 6.5)} fill="none" stroke="#7c3aed" strokeWidth="3" />
              <circle cx={ox2 + cur.px * k2} cy={oy2 - py * k2} r="5" fill="#be185d" />
              <text x={ox2 + cur.px * k2 + 8} y={oy2 - py * k2 - 6} fontSize="11" fill="#be185d" fontWeight="bold">
                rácspont
              </text>
              <text x="320" y="252" fontSize="10" textAnchor="end" fill="#475569">
                1 négyzet oldala = 1 egység
              </text>
            </svg>
            <div className="space-y-3">
              <p className="text-sm text-slate-700">
                A grafikon egy x ↦ aˣ függvényé (tankönyv, 2. feladat). Olvasd le a megjelölt rácspont koordinátáit, és add meg az alapot (pl. <span className="font-mono">3</span>,{' '}
                <span className="font-mono">1/2</span> vagy <span className="font-mono">0,5</span>)!
              </p>
              <div className="flex gap-2 items-center">
                <span className="font-mono text-sm">a =</span>
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => {
                    setGuess(e.target.value);
                    setChecked(false);
                  }}
                  className="border border-slate-300 rounded-lg px-2 py-1 text-sm w-28"
                  aria-label="alap tipp"
                />
                <button onClick={() => setChecked(true)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-700">
                  Ellenőrzés
                </button>
                <button
                  onClick={() => {
                    setIdx((idx + 1) % DETECTIVE.length);
                    setGuess('');
                    setChecked(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  Új grafikon
                </button>
              </div>
              {checked && (
                <div className={`rounded-xl border p-3 text-sm ${correct ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                  {correct ? (
                    <>
                      Helyes! A rácspont ({String(cur.px).replace('-', '−')}; {fmt(py, 3)}), és ({cur.label})
                      <sup>{String(cur.px).replace('-', '−')}</sup> = {fmt(py, 3)}. A hozzárendelés: x ↦ ({cur.label})ˣ.
                    </>
                  ) : (
                    <>
                      Nem jó. Tipp: a görbe {cur.a > 1 ? 'növekvő, tehát a > 1' : 'csökkenő, tehát 0 < a < 1'}. A rácspont x-koordinátája {String(cur.px).replace('-', '−')}; melyik
                      alap ennyiedik hatványa a leolvasott y?
                    </>
                  )}
                </div>
              )}
              <div className="text-xs text-slate-500">
                Feladat {idx + 1} / {DETECTIVE.length}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div className="text-sm font-bold text-purple-800">Pontillesztés (HF 2.): f(x) = 3ˣ, g(x) = (1/3)ˣ, h(x) = 9ˣ</div>
            <div className="flex flex-wrap gap-2">
              {HF2_POINTS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPointIdx(i)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${pointIdx === i ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                >
                  {p.name}
                  {p.text}
                </button>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
              <div className="font-mono text-xs">
                f({fmt(pt.x, 3)}) ≈ {fmt(Math.pow(3, pt.x), 4)}; g({fmt(pt.x, 3)}) ≈ {fmt(Math.pow(1 / 3, pt.x), 4)}; h({fmt(pt.x, 3)}) ≈ {fmt(Math.pow(9, pt.x), 4)}; a pont y-ja ≈{' '}
                {fmt(pt.y, 4)}
              </div>
              <div>
                {pt.name}
                {pt.text}:{' '}
                <strong className="text-purple-700">
                  {onAny.length === 0 ? 'egyik grafikonon sincs rajta' : onAny.length === 3 ? 'mindhárom grafikonon rajta van' : `rajta van: ${onAny.join(', ')}`}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ExponentialFunctionsTheory;
