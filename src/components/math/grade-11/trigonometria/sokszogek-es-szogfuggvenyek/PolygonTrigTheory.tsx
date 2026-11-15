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
  IsoscelesSplitSvg,
  EmbankmentSvg,
  HungaryTriangleSvg,
  ObtuseTangentSvg,
  TriangulationSvg
} from './PolygonTrigFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  return (Number(s) === 0 ? (0).toFixed(d) : s).replace('.', ',').replace('-', '−');
};

export const PolygonTrigTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: paralelogramma
  const [pa, setPa] = useState<number>(6);
  const [pb, setPb] = useState<number>(4);
  const [palpha, setPalpha] = useState<number>(60);

  // Labor II: trapéz (töltés) felbontása
  const [top, setTop] = useState<number>(4.5);
  const [bottom, setBottom] = useState<number>(10);
  const [legL, setLegL] = useState<number>(3.8);
  const [legR, setLegR] = useState<number>(4.2);

  // Labor I számítások
  const area = pa * pb * Math.sin(toRad(palpha));
  const eShort = Math.sqrt(pa * pa + pb * pb - 2 * pa * pb * Math.cos(toRad(palpha)));
  const fLong = Math.sqrt(pa * pa + pb * pb + 2 * pa * pb * Math.cos(toRad(palpha)));
  const tgAlpha = palpha === 90 ? NaN : Math.tan(toRad(palpha));
  const tgBeta = palpha === 90 ? NaN : Math.tan(toRad(180 - palpha));
  const sc = Math.min(260 / (pa + pb * Math.abs(Math.cos(toRad(palpha)))), 150 / (pb * Math.sin(toRad(palpha))));
  const shift = pb * Math.cos(toRad(palpha)) * sc;
  const P0 = { x: 40 + Math.max(0, -shift), y: 185 };
  const P1 = { x: P0.x + pa * sc, y: P0.y };
  const P3 = { x: P0.x + shift, y: P0.y - pb * Math.sin(toRad(palpha)) * sc };
  const P2 = { x: P1.x + shift, y: P3.y };

  // Labor II számítások: háromszög (bottom − top, legL, legR)
  const t = bottom - top;
  const trapValid = t > 0 && legL + legR > t && legL + t > legR && legR + t > legL;
  const angLeft = trapValid ? toDeg(Math.acos((legL * legL + t * t - legR * legR) / (2 * legL * t))) : NaN;
  const angRight = trapValid ? toDeg(Math.acos((legR * legR + t * t - legL * legL) / (2 * legR * t))) : NaN;
  const height = trapValid ? legL * Math.sin(toRad(angLeft)) : NaN;
  const trapArea = trapValid ? ((top + bottom) / 2) * height : NaN;
  const ts = trapValid ? Math.min(280 / bottom, 120 / height) : 1;
  const T0 = { x: 30, y: 180 };
  const TA = T0;
  const TB = { x: T0.x + bottom * ts, y: T0.y };
  const TD = trapValid ? { x: T0.x + legL * Math.cos(toRad(angLeft)) * ts, y: T0.y - height * ts } : T0;
  const TC = { x: TD.x + top * ts, y: TD.y };
  const TE = { x: T0.x + top * ts, y: T0.y };

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="sokszogek-es-szogfuggvenyek"
      title="13. Sokszögek és szögfüggvények"
      subtitle="Sokszögek felbontása háromszögekre, a szinusz- és koszinusztétel alkalmazása térképen és a terepen, valamint a tompaszög tangense."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_sokszogek_es_szogfuggvenyek_tananyag.pdf"
      practiceTitle="Készen állsz a sokszöges trigonometriai feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SOKSZÖGEK ÉS A TOMPASZÖG TANGENSE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                tg α = sin α / cos α &nbsp; (α ≠ 90°)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Sokszöget <strong>átlókkal, magassággal</strong> vagy <strong>paralelogrammára és háromszögre</strong> bontunk, és a háromszögekben szinusz-, koszinusztételt, területképletet alkalmazunk.
              </li>
              <li>
                Tompaszög tangense <strong>negatív</strong>: tg(180° − α) = −tg α. A <strong>90°-nak nincs tangense</strong> (cos 90° = 0).
              </li>
              <li>
                Háromszög területe: <strong>T = ½ · a · b · sin γ</strong>; paralelogrammáé: <strong>T = a · b · sin α</strong>.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Csoportmunka 1 */}
      <TheorySection title="1. Felbontás háromszögekre: a 42°-os szárszög" badge="Tankönyv 36. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy egyenlő szárú háromszög 42°-os szárszögét α, β és γ szögekre bontottuk úgy, hogy a szögszárak a <strong>120 m-es alapot</strong> három <strong>40 m-es</strong> részre osztják.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>a)</strong> Alapon fekvő szögek: (180° − 42°) / 2 = <strong>69°</strong>. Az alaphoz tartozó magasság felezi az alapot: szár = 60 / cos 69° ≈ <strong>167,4 m</strong>, a magasság m = 60 · tg 69° ≈ 156,3 m.</li>
              <li><strong>b)</strong> α = γ, mert az ábra szimmetrikus a magasságra: a két szélső háromszög egymás tükörképe (egybevágók).</li>
              <li><strong>c)</strong> A középső háromszöget a magasság két derékszögű háromszögre bontja: tg(β/2) = 20 / 156,3 ⇒ β/2 ≈ 7,3°, <strong>β ≈ 14,6°</strong>, így <strong>α = γ = (42° − 14,6°) / 2 ≈ 13,7°</strong>.</li>
            </ul>
          </div>
          <IsoscelesSplitSvg />
        </div>
        <TheoryCallout type="tip" title="Stratégia">
          Sokszögekben mindig keressünk olyan háromszöget, amelyben három adat (köztük legalább egy oldal) ismert. Szimmetria, magasság vagy egy átló gyakran ilyen háromszöget hoz létre.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Csoportmunka 2 */}
      <TheorySection title="2. Trapéz felbontása: a vasúti töltés" badge="2. feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <EmbankmentSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A töltés keresztmetszete trapéz: a <strong>korona</strong> (felső párhuzamos oldal) 4,5 m, a <strong>rézsűk</strong> (szárak) 3,8 m és 4,2 m, az <strong>alap</strong> 10 m.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A 3,8 m-es szárral párhuzamost húzunk: a trapéz egy 4,5 m × 3,8 m-es paralelogrammára és egy <strong>3,8 – 4,2 – 5,5 m</strong>-es háromszögre bomlik.</li>
              <li>Koszinusztétellel: cos φ = (3,8² + 5,5² − 4,2²) / (2 · 3,8 · 5,5) ⇒ φ ≈ <strong>49,7°</strong> (a meredekebb, 3,8 m-es oldal), illetve ≈ <strong>43,6°</strong> (a lankásabb, 4,2 m-es oldal).</li>
              <li>A töltés magassága: m = 3,8 · sin 49,7° ≈ <strong>2,9 m</strong> (ugyanennyi 4,2 · sin 43,6° is).</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 3. Tompaszög tangense */}
      <TheorySection title="3. Elmélet: a tompaszög tangense" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az α hegyesszögre teljesül, hogy <strong>tg α = sin α / cos α</strong>. A tangens kiterjesztéséhez ezt a képletet alkalmazzuk.
            </p>
            <p>
              Vigyázni kell: derékszög esetén ez nem vezet eredményre, mert cos 90° = 0, és 0-val nem lehet osztani. Ezért <strong>a 90°-nak nincs tangense</strong>.
            </p>
            <TheoryCard title="Definíció" badge="tompaszög" badgeColor="indigo">
              <p className="text-sm text-slate-700">
                Az α tompaszög tangense: <strong>tg α = sin α / cos α</strong>. Mivel tompaszögre sin α &gt; 0 és cos α &lt; 0, a tompaszög tangense <strong>negatív</strong>, és tg α = −tg(180° − α).
              </p>
            </TheoryCard>
          </div>
          <ObtuseTangentSvg />
        </div>
        <TheoryTable
          headers={['α', '100°', '120°', '135°', '150°', '170°']}
          rows={[
            ['180° − α', '80°', '60°', '45°', '30°', '10°'],
            ['tg α', '≈ −5,671', '−√3 ≈ −1,732', '−1', '−√3/3 ≈ −0,577', '≈ −0,176']
          ]}
        />
      </TheorySection>

      {/* 4. Térkép */}
      <TheorySection title="4. Háromszög a térképen: Pécs–Budapest–Győr" badge="4. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <HungaryTriangleSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Győr–Budapest 108 km, Budapest–Pécs 170 km, Pécs–Győr 185 km (légvonalban).</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>a)</strong> A leghosszabb (185 km-es) oldallal szemközti szög Budapestnél: cos β = (108² + 170² − 185²) / (2 · 108 · 170) ≈ 0,172 ⇒ <strong>β ≈ 80,1°</strong>.</li>
              <li>Pécsnél (a 108 km-rel szemben): <strong>α ≈ 35,1°</strong>; Győrnél: <strong>γ ≈ 64,8°</strong> (összegük 180°).</li>
              <li><strong>b)</strong> T = ½ · 108 · 170 · sin 80,1° ≈ <strong>9042 km²</strong>, ami Magyarország területének (93 030 km²) ≈ <strong>9,7%</strong>-a.</li>
            </ul>
          </div>
        </div>
        <TheoryCallout type="info" title="Házi feladat: Kaposvár, Tatabánya, Miskolc, Békéscsaba">
          Kaposvár–Békéscsaba 260 km, Békéscsaba–Miskolc 160 km, a Békéscsabánál lévő szög 91° ⇒ koszinusztétellel Kaposvár–Miskolc ≈ 307,7 km – ezt a mérési adatok pontossága miatt célszerű inkább <strong>10 km-re kerekítve (≈ 310 km)</strong> megadni. Ezután a Tatabánya–Miskolc (190 km) oldalból és a Tatabányánál lévő 126°-os szögből szinusztétellel: Kaposvár–Tatabánya ≈ 155 km.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Házi feladatok – terület */}
      <TheorySection title="5. Kidolgozott feladatok: terület és oldalak" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Oldal és súlyvonal" badge="HF 1." badgeColor="sky">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Egy háromszög 48 cm-es oldala a hozzá tartozó 39 cm-es súlyvonallal 48°-os szöget alkot.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A súlyvonal a háromszöget két egyenlő területű részre bontja (24 cm-es alapok, közös magasság).</li>
                <li><strong>a)</strong> T = 2 · ½ · 24 · 39 · sin 48° ≈ <strong>695,6 cm²</strong>.</li>
                <li><strong>b)</strong> Koszinusztétel a két részháromszögben (48° és 132°): √(24² + 39² − 2 · 24 · 39 · cos 48°) ≈ <strong>29,1 cm</strong> és √(24² + 39² − 2 · 24 · 39 · cos 132°) ≈ <strong>57,9 cm</strong>.</li>
                <li>A legnagyobb szög a 57,9 cm-es oldallal szemben: <strong>≈ 94,1°</strong>.</li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Terület két oldalból – két eset" badge="HF 2." badgeColor="purple">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Egy háromszög területe 60 cm², két oldala 15 cm és 16 cm.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>60 = ½ · 15 · 16 · sin γ ⇒ sin γ = 0,5 ⇒ <strong>γ = 30° vagy γ = 150°</strong>.</li>
                <li><strong>γ = 30°:</strong> harmadik oldal ≈ <strong>8,08 cm</strong>, a többi szög ≈ 81,9° és ≈ 68,1°.</li>
                <li><strong>γ = 150°:</strong> harmadik oldal ≈ <strong>29,94 cm</strong>, a többi szög ≈ 15,5° és ≈ 14,5°.</li>
              </ul>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Ráadás */}
      <TheorySection title="6. Ráadás: helymeghatározás (előremetszés)" badge="Ráadás" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A szinusztétel és a koszinusztétel a geodéziai mérések, a térképkészítés (<strong>háromszögelés</strong>) és – az időméréssel kiegészítve – a <strong>GPS</strong> működésének alapja.
            </p>
            <p>
              Sík terepen három alappont: AB = 200 m, BC = 300 m, AC = 250 m. A BC szakasz két végpontjából szögméréssel meghatározzuk a P tereptárgy irányát (40° és 60°). A P-nél lévő szög 80°, így szinusztétellel:
            </p>
            <div className="bg-violet-50 p-3 rounded-xl border border-violet-200 text-center font-mono font-bold text-violet-900">
              d₁ = 300 · sin 60° / sin 80° ≈ 264 m; &nbsp; d₂ = 300 · sin 40° / sin 80° ≈ 196 m
            </div>
          </div>
          <TriangulationSvg />
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: a szinuszból csak az egyik szöget vesszük" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="sin γ = 0,5 ⇒ „γ = 30°” – és elfelejtjük a tompaszöget"
          wrong="60 = ½ · 15 · 16 · sin γ ⇒ sin γ = 0,5 ⇒ γ = 30° (egyetlen megoldás)"
          wrongExplanation="A számológép sin⁻¹ funkciója csak a hegyesszöget adja meg. A 150°-os szög szinusza is 0,5, és ezzel is 60 cm² a terület – a háromszög harmadik oldala ekkor ≈ 29,94 cm, nem ≈ 8,08 cm."
          correct="sin γ = 0,5 ⇒ γ = 30° vagy γ = 180° − 30° = 150° – mindkettőt végig kell számolni"
          correctExplanation="Szinuszból mindig két szög jön szóba (hegyes és tompa); koszinuszból és tangensből viszont 0° és 180° között egyértelmű a szög."
          tip="Tangensnél figyelj az előjelre: tg α < 0 ⇒ α tompaszög; tg 90° nem létezik."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: Paralelogramma – terület, átlók, tangens" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a oldal: {fmt(pa, 1)} cm</label>
                <input type="range" min="1" max="12" step="0.5" value={pa} onChange={(e) => setPa(Number(e.target.value))} className="w-full accent-blue-600" aria-label="a oldal" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">b oldal: {fmt(pb, 1)} cm</label>
                <input type="range" min="1" max="12" step="0.5" value={pb} onChange={(e) => setPb(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="b oldal" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">α szög: {palpha}° (a szomszédos szög: {180 - palpha}°)</label>
                <input type="range" min="5" max="175" value={palpha} onChange={(e) => setPalpha(Number(e.target.value))} className="w-full accent-rose-600" aria-label="alfa szög" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>T = a · b · sin α = <strong>{fmt(area)} cm²</strong></div>
                <div>α-val szemközti átló: √(a² + b² − 2ab cos α) ≈ <strong>{fmt(eShort)} cm</strong></div>
                <div>a szomszédos szöggel szemközti átló: √(a² + b² + 2ab cos α) ≈ <strong>{fmt(fLong)} cm</strong></div>
                <div className="text-xs text-slate-500">ellenőrzés: e² + f² = {fmt(eShort * eShort + fLong * fLong)} = 2(a² + b²) = {fmt(2 * (pa * pa + pb * pb))}</div>
                <div>
                  tg {palpha}° = {palpha === 90 ? 'nincs értelmezve' : fmt(tgAlpha, 3)}; tg {180 - palpha}° = {palpha === 90 ? 'nincs értelmezve' : fmt(tgBeta, 3)}
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                A két szomszédos szög kiegészítő szög: szinuszuk egyenlő (ezért a terület bármelyikkel számolható), tangensük egymás ellentettje.
              </p>
            </div>
            <svg viewBox="0 0 340 210" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <polygon points={`${P0.x},${P0.y} ${P1.x},${P1.y} ${P2.x},${P2.y} ${P3.x},${P3.y}`} fill="rgba(59,130,246,0.12)" stroke="#2563eb" strokeWidth="2" />
              <line x1={P1.x} y1={P1.y} x2={P3.x} y2={P3.y} stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
              <line x1={P0.x} y1={P0.y} x2={P2.x} y2={P2.y} stroke="#059669" strokeWidth="2" strokeDasharray="5 4" />
              <path
                d={`M ${P0.x + 22} ${P0.y} A 22 22 0 0 0 ${(P0.x + 22 * Math.cos(toRad(palpha))).toFixed(2)} ${(P0.y - 22 * Math.sin(toRad(palpha))).toFixed(2)}`}
                fill="rgba(239,68,68,0.15)"
                stroke="#dc2626"
                strokeWidth="1.5"
              />
              <text x={P0.x + 26} y={P0.y - 6} fontSize="11" fontWeight="bold" fill="#b91c1c">{palpha}°</text>
              <text x={(P0.x + P1.x) / 2} y={P0.y + 16} fontSize="11" textAnchor="middle" fill="#1d4ed8">a</text>
              <text x={(P0.x + P3.x) / 2 - 8} y={(P0.y + P3.y) / 2} fontSize="11" textAnchor="end" fill="#047857">b</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: Trapéz felbontása – a töltés" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'korona (felső oldal, m)', val: top, set: setTop },
              { label: 'alap (alsó oldal, m)', val: bottom, set: setBottom },
              { label: 'bal rézsű (m)', val: legL, set: setLegL },
              { label: 'jobb rézsű (m)', val: legR, set: setLegR }
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={f.val}
                  onChange={(e) => f.set(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                  aria-label={f.label}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
              {trapValid ? (
                <>
                  <div>segédháromszög: {fmt(legL, 1)} – {fmt(legR, 1)} – {fmt(t, 1)} m</div>
                  <div>bal rézsű emelkedési szöge ≈ <strong>{fmt(angLeft, 1)}°</strong></div>
                  <div>jobb rézsű emelkedési szöge ≈ <strong>{fmt(angRight, 1)}°</strong></div>
                  <div>a töltés magassága m ≈ <strong>{fmt(height)} m</strong></div>
                  <div>a keresztmetszet területe ≈ <strong>{fmt(trapArea)} m²</strong></div>
                  <div className="font-sans text-xs text-slate-500 pt-1">
                    A meredekebb oldal: {angLeft > angRight ? 'a bal' : angLeft < angRight ? 'a jobb' : 'egyforma meredekek'}.
                  </div>
                </>
              ) : (
                <div className="font-sans text-rose-700 font-bold">
                  Ilyen trapéz nincs: a korona legyen rövidebb az alapnál, és a két rézsű a különbségükkel (alap − korona) háromszöget alkosson!
                </div>
              )}
            </div>
            <svg viewBox="0 0 340 200" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {trapValid && (
                <g>
                  <polygon points={`${TA.x},${TA.y} ${TE.x},${TE.y} ${TC.x},${TC.y} ${TD.x},${TD.y}`} fill="rgba(59,130,246,0.15)" stroke="#2563eb" strokeWidth="2" />
                  <polygon points={`${TE.x},${TE.y} ${TB.x},${TB.y} ${TC.x},${TC.y}`} fill="rgba(245,158,11,0.2)" stroke="#d97706" strokeWidth="2" />
                  <line x1={TD.x} y1={TD.y} x2={TD.x} y2={TA.y} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x={TD.x + 4} y={(TD.y + TA.y) / 2} fontSize="10" fill="#6d28d9">m</text>
                  <text x={(TA.x + TB.x) / 2} y={TA.y + 14} fontSize="10" textAnchor="middle" fill="#334155">alap</text>
                  <text x={(TD.x + TC.x) / 2} y={TD.y - 6} fontSize="10" textAnchor="middle" fill="#1d4ed8">korona</text>
                </g>
              )}
            </svg>
          </div>
          <TheoryCallout type="success" title="Tankönyvi adatok">
            Korona 4,5 m, alap 10 m, rézsűk 3,8 m és 4,2 m ⇒ emelkedési szögek ≈ 49,7° és ≈ 43,6°, magasság ≈ 2,9 m.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PolygonTrigTheory;
