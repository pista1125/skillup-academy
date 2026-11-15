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
  TowerPerspectiveSvg,
  TowerTwoTrianglesSvg,
  TowerFromLSvg,
  LedLampSvg,
  PyramidRoofSvg,
  CubeDiagonalSvg
} from './TowerHeightTrigFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

const PEDESTAL = 47;
const STATUE_TOP = 93;
const viewAngle = (d: number) => toDeg(Math.atan(STATUE_TOP / d)) - toDeg(Math.atan(PEDESTAL / d));
const BEST_DIST = Math.sqrt(PEDESTAL * STATUE_TOP);

export const TowerHeightTrigTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: toronymérés
  const [base, setBase] = useState<number>(250);
  const [angleL, setAngleL] = useState<number>(36);
  const [angleK, setAngleK] = useState<number>(32);

  // Labor II: látószög-kereső
  const [dist, setDist] = useState<number>(70);

  const ak = base * Math.tan(toRad(angleL));
  const ab = ak * Math.tan(toRad(angleK));
  const al = base / Math.cos(toRad(angleL));
  const lambda = toDeg(Math.atan(ab / al));

  // Labor I felülnézeti rajz
  const topScale = Math.min(150 / base, 150 / ak);
  const TK = { x: 30, y: 180 };
  const TL = { x: TK.x + base * topScale, y: TK.y };
  const TA = { x: TK.x, y: TK.y - ak * topScale };
  // Labor I oldalnézeti rajz
  const sideScale = Math.min(130 / ak, 140 / ab);
  const SK = { x: 190, y: 180 };
  const SA = { x: SK.x + ak * sideScale, y: SK.y };
  const SB = { x: SA.x, y: SA.y - ab * sideScale };

  // Labor II
  const a1 = toDeg(Math.atan(PEDESTAL / dist));
  const a2 = toDeg(Math.atan(STATUE_TOP / dist));
  const view = a2 - a1;
  const sampleDists = [30, 50, 60, 66, 70, 80, 100, 150];
  const graphW = 300;
  const graphH = 110;
  const maxView = viewAngle(BEST_DIST);
  const gx = (d: number) => 20 + ((d - 5) / (200 - 5)) * graphW;
  const gy = (v: number) => 130 - (v / (maxView * 1.1)) * graphH;
  const curve = Array.from({ length: 80 }, (_, i) => 5 + (i * 195) / 79)
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${gx(d).toFixed(1)} ${gy(viewAngle(d)).toFixed(1)}`)
    .join(' ');

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="milyen-magas-a-torony"
      title="Ráadás: Milyen magas a torony?"
      subtitle="Megközelíthetetlen talppontú torony magassága két mérésből – derékszögű háromszögek a térben, vízszintes és függőleges síkban."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="amber"
      pdfFilename="11_osztaly_milyen_magas_a_torony_tananyag.pdf"
      practiceTitle="Készen állsz a térbeli magasságmérésre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — DERÉKSZÖGŰ HÁROMSZÖGEK A TÉRBEN',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="font-mono text-base font-black text-amber-900 dark:text-amber-200">
                AK = KL · tg(ALK∢) &nbsp;⇒&nbsp; AB = AK · tg(AKB∢)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A függőleges torony (AB) <strong>minden vízszintes egyenesre merőleges</strong>, ezért az AKB és az ALB háromszög is derékszögű (A-nál).
              </li>
              <li>
                Ha a talpponthoz nem jutunk el, a vízszintes síkban egy másik derékszögű háromszöggel (AKL, derékszög K-nál) számítjuk ki a távolságot.
              </li>
              <li>A vízszintes síkban mért szög (ALK∢) nem emelkedési szög – mindig nézd meg, melyik síkban van a szög!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat 1 */}
      <TheorySection title="1. Kidolgozott feladat: a torony a folyó túlsó partján" badge="Tankönyv 22. o." badgeColor="amber">
        <TowerPerspectiveSvg />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Sík vidéken, egy folyó közelében álló torony magasságát (AB) szeretnénk megállapítani, de csak a folyó túlsó partján tudunk méréseket végezni.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A toronnyal szemközti K pontban megmérjük az AKB∢-et: <strong>32°</strong>. Az ABK derékszögű háromszögből: AB = AK · tg 32°.</li>
              <li>Először tehát AK kell. A parton AK-ra merőlegesen elmegyünk <strong>250 m</strong>-t, az L pontba, és megmérjük az ALK∢-et: <strong>36°</strong>.</li>
              <li>Az ALK derékszögű háromszögből: AK = 250 · tg 36° ≈ <strong>182 m</strong>.</li>
              <li>AB = AK · tg 32° ≈ 182 · tg 32° ≈ <strong>114 m</strong>.</li>
            </ul>
          </div>
          <TowerTwoTrianglesSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladat 2 */}
      <TheorySection title="2. Kidolgozott feladat: mekkora szögben látjuk a tornyot L-ből?" badge="2. kidolgozott feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az AB függőleges, ezért minden vízszintes egyenesre merőleges, így az AL egyenesre is: az <strong>LAB háromszög derékszögű</strong>. Ennek L-nél fekvő hegyesszögét keressük.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az AKL háromszögből: cos 36° = 250 / AL ⇒ AL = 250 : cos 36° ≈ <strong>309 m</strong>.</li>
              <li>Az LAB háromszögből: tg λ = AB / AL ≈ 114 / 309 ≈ 0,369.</li>
              <li>Ebből <strong>λ ≈ 20°</strong>: az L pontból 20°-os szögben látjuk a tornyot.</li>
            </ul>
          </div>
          <TowerFromLSvg />
        </div>
      </TheorySection>

      {/* 3. Feladatok */}
      <TheorySection title="3. További térbeli feladatok" badge="Feladatok" badgeColor="teal">
        <TheoryTable
          headers={['Feladat', 'Derékszögű háromszög', 'Eredmény']}
          rows={[
            ['1. a) A torony a KL felezőpontjából (M)', 'AM = √(182² + 125²) ≈ 220,5 m; tg = 114 / 220,5', '≈ 27,2°'],
            ['1. b) Hová menjünk K-tól, hogy 15°-ban lássuk?', 'A-tól AB : tg 15° ≈ 423,6 m; Pitagorasz az AKP △-ben', 'K-tól ≈ 383 m-re'],
            ['4. Téglatest 3,2 m; 6,9 m; 8,4 m – testátló és oldallapok', 'testátló ≈ 11,33 m; sin = (merőleges él) / átló', '≈ 16,4°; ≈ 37,5°; ≈ 47,8°'],
            ['6. Szabályos tetraéder oldaléle', 'a vetület a köré írt kör sugara: a/√3', 'a magassággal ≈ 35,3°; az alaplappal ≈ 54,7°']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="LED-lámpák (2. feladat)" badge="r = h · tg(φ/2)" badgeColor="sky">
            <LedLampSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A függőleges fénytengely felezi a világítási szöget. 40 cm magasan:</li>
              <li>40°: r = 40 · tg 20° ≈ 14,6 cm ⇒ átmérő ≈ <strong>29,1 cm</strong>; 110°: r = 40 · tg 55° ≈ 57,1 cm ⇒ átmérő ≈ <strong>114,3 cm</strong>.</li>
              <li>b) 80 cm-es asztal 0,6 m-ről: tg(φ/2) = 40/60 ⇒ φ/2 ≈ 33,7° ⇒ legalább <strong>≈ 67,4°</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Gúla alakú háztető (3. feladat)" badge="40°" badgeColor="rose">
            <PyramidRoofSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) A magasság, a fél alapél (5 m) és az oldallap magassága derékszögű háromszöget alkot: h = 5 · tg 40° ≈ <strong>4,2 m</strong>.</li>
              <li>b) Oldallap-magasság 5 : cos 40° ≈ 6,53 m, a tető 4 · (10 · 6,53 / 2) ≈ <strong>130,5 m²</strong>.</li>
              <li>c) Oldalél: x = √(h² + (5√2)²) ≈ <strong>8,2 m</strong>; vízszintessel bezárt szöge tg α = h / (5√2) ⇒ <strong>α ≈ 30,7°</strong>.</li>
              <li>d) Két szomszédos oldalél: sin(θ/2) = 5 / x ⇒ θ ≈ <strong>74,9°</strong>; két szemközti a csúcsnál: ≈ <strong>118,6°</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="A kocka testátlója (5. feladat)" badge="ACB∢" badgeColor="indigo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <CubeDiagonalSvg />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) Az AB él merőleges a fedőlapra, így a fedőlap minden egyenesére, BC-re is: az ABC háromszög derékszögű (B-nél).</li>
              <li>b) 3,2 cm-es élnél: AB = 3,2 cm, BC = 3,2 · √2 ≈ 4,53 cm, AC = 3,2 · √3 ≈ 5,54 cm.</li>
              <li>c) BC az AC egyenes merőleges vetülete a fedőlapra, ezért az ACB∢ a testátló és a fedőlap szöge.</li>
              <li>d) tg ACB∢ = 3,2 / (3,2√2) = 1/√2 ⇒ <strong>ACB∢ ≈ 35,3°</strong> (az élhossztól független).</li>
            </ul>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Házi feladatok */}
      <TheorySection title="4. Házi feladatok eredményei" badge="Házi feladat" badgeColor="emerald">
        <TheoryTable
          headers={['Feladat', 'Megoldás menete', 'Eredmény']}
          rows={[
            ['1. Péter szeme 6 m magasan; a fa alja 10°-os depressziószögben, teteje 22°-os emelkedési szögben', 'távolság = 6 : tg 10° ≈ 34,0 m; felső rész = 34,0 · tg 22° ≈ 13,7 m', 'fa ≈ 19,7 m'],
            ['2. a) 76°-os spotlámpa 260 cm magasan', 'r = 2,6 · tg 38° ≈ 2,03 m; T = r²π', '≈ 13,0 m²'],
            ['2. b) Legfeljebb 8 m²-t világítson be', 'r ≤ √(8/π) ≈ 1,60 m; h = r : tg 38°', 'legfeljebb ≈ 2,04 m magasan'],
            ['3. A kocka A csúcsa és BC felezőpontja (F)', 'AB = a, BF = a√2/2 ⇒ tg = √2; a normális irányú összetevő a/2', 'fedőlappal és alaplappal ≈ 54,7°; oldallappal ≈ 24,1°'],
            ['4. K-ból 28°, a K-tól 250 m-re lévő L-ből 18°, AKL∢ = 90°', 'AK = h : tg 28°, AL = h : tg 18°, AL² = AK² + 250²', 'h ≈ 102,6 m']
          ]}
        />
        <TheoryCallout type="info" title="Depressziószög">
          A depressziószög (lehajlási szög) a megfigyelőtől egy nála alacsonyabban fekvő pontra irányuló látósugárnak a vízszintes síkkal bezárt szöge – az emelkedési szög „lefelé” párja.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Ráadás */}
      <TheorySection title="5. Ráadás: honnan látszik a legnagyobb szögben a Szabadság-szobor?" badge="Ráadás" badgeColor="violet">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Az 5. lecke 5. feladatából: a talapzat 47 m, a szobor 46 m magas (teteje 93 m-en). A d távolságból a szobor látószöge
            <strong> φ(d) = tg⁻¹(93 / d) − tg⁻¹(47 / d)</strong>. Közelről és nagyon messziről is kicsi; valahol közte van a legnagyobb.
          </p>
          <TheoryTable
            headers={['d (m)', ...sampleDists.map((d) => String(d))]}
            rows={[['φ (fok)', ...sampleDists.map((d) => fmt(viewAngle(d), 2))]]}
          />
          <p>
            A táblázat (vagy a II. labor) szerint a legnagyobb látószög kb. <strong>d ≈ 66 m</strong>-nél van (pontosan d = √(47 · 93) ≈ 66,1 m), és ott a szobor kb. <strong>19,18°</strong>-os szögben látszik – alig többet, mint 70 m-ről (≈ 19,15°).
          </p>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: rossz háromszög, rossz sík" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az L pontból mért emelkedési szög"
          wrong="tg λ = AB / KL = 114 / 250 ⇒ λ ≈ 24,4°"
          wrongExplanation="A KL szakasz nem befogója az LAB háromszögnek! Az L-ből a torony talppontjáig mért vízszintes távolság AL, ami az AKL háromszög átfogója."
          correct="AL = 250 : cos 36° ≈ 309 m, tg λ = AB / AL ≈ 114 / 309 ⇒ λ ≈ 20°"
          correctExplanation="Minden szögnél döntsd el: vízszintes síkban (felülnézet) vagy függőleges síkban (oldalnézet) fekszik-e, és melyik derékszögű háromszöghöz tartozik."
          tip="A 36° (ALK∢) a talajon mért szög, nem emelkedési szög – a torony csúcsa nem szerepel benne."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Toronymérés a folyó túlpartjáról" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">KL bázistávolság: {base} m</label>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={base}
                onChange={(e) => setBase(Number(e.target.value))}
                className="w-full accent-slate-600"
                aria-label="bázistávolság"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">ALK∢ (vízszintes sík): {angleL}°</label>
              <input
                type="range"
                min="10"
                max="80"
                step="1"
                value={angleL}
                onChange={(e) => setAngleL(Number(e.target.value))}
                className="w-full accent-violet-600"
                aria-label="ALK szög"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">AKB∢ (emelkedési szög K-ból): {angleK}°</label>
              <input
                type="range"
                min="5"
                max="70"
                step="1"
                value={angleK}
                onChange={(e) => setAngleK(Number(e.target.value))}
                className="w-full accent-red-600"
                aria-label="AKB szög"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
              <div>1. AK = KL · tg ALK∢ = {base} · tg {angleL}° ≈ {fmt(ak, 1)} m</div>
              <div>2. AB = AK · tg AKB∢ ≈ {fmt(ak, 1)} · tg {angleK}° ≈ <strong>{fmt(ab, 1)} m</strong></div>
              <div>3. AL = KL : cos ALK∢ ≈ {fmt(al, 1)} m</div>
              <div>4. tg λ = AB / AL ⇒ λ ≈ <strong>{fmt(lambda, 1)}°</strong> (L-ből)</div>
              <div className="text-xs text-slate-500 pt-1">Tankönyvi adatok: 250 m, 36°, 32° ⇒ AK ≈ 182 m, AB ≈ 114 m, λ ≈ 20°.</div>
            </div>
            <svg viewBox="0 0 340 210" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <text x="85" y="16" fontSize="10" textAnchor="middle" fill="#475569">felülnézet</text>
              <text x="260" y="16" fontSize="10" textAnchor="middle" fill="#475569">oldalnézet</text>
              <polygon points={`${TK.x},${TK.y} ${TL.x},${TL.y} ${TA.x},${TA.y}`} fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="2" />
              {/* derékszög K-nál: negyedkörív ponttal */}
              <path d={`M ${TK.x + 11} ${TK.y} A 11 11 0 0 0 ${TK.x} ${TK.y - 11}`} fill="none" stroke="#475569" strokeWidth="1.5" />
              <circle cx={TK.x + 4.3} cy={TK.y - 4.3} r="1.6" fill="#475569" />
              <text x={TK.x - 4} y={TK.y + 14} fontSize="10" fontWeight="bold" fill="#0f172a">K</text>
              <text x={TL.x - 4} y={TL.y + 14} fontSize="10" fontWeight="bold" fill="#0f172a">L</text>
              <text x={TA.x - 12} y={TA.y + 4} fontSize="10" fontWeight="bold" fill="#0f172a">A</text>
              <text x={TL.x - 30} y={TL.y - 5} fontSize="10" fill="#6d28d9">{angleL}°</text>
              <polygon points={`${SK.x},${SK.y} ${SA.x},${SA.y} ${SB.x},${SB.y}`} fill="rgba(220,38,38,0.12)" stroke="#dc2626" strokeWidth="2" />
              {/* derékszög A-nál: negyedkörív ponttal */}
              <path d={`M ${SA.x - 11} ${SA.y} A 11 11 0 0 1 ${SA.x} ${SA.y - 11}`} fill="none" stroke="#475569" strokeWidth="1.5" />
              <circle cx={SA.x - 4.3} cy={SA.y - 4.3} r="1.6" fill="#475569" />
              <line x1={SA.x} y1={SA.y} x2={SB.x} y2={SB.y} stroke="#047857" strokeWidth="3" />
              <text x={SK.x - 4} y={SK.y + 14} fontSize="10" fontWeight="bold" fill="#0f172a">K</text>
              <text x={SA.x - 4} y={SA.y + 14} fontSize="10" fontWeight="bold" fill="#0f172a">A</text>
              <text x={SB.x + 4} y={SB.y + 4} fontSize="10" fontWeight="bold" fill="#0f172a">B</text>
              <text x={SK.x + 22} y={SK.y - 5} fontSize="10" fill="#b91c1c">{angleK}°</text>
              <text x={SA.x + 4} y={(SA.y + SB.y) / 2} fontSize="10" fill="#047857">{fmt(ab, 0)} m</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Látószög-kereső (Szabadság-szobor)" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">távolság a talapzattól (d): {dist} m</label>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="1"
                  value={dist}
                  onChange={(e) => setDist(Number(e.target.value))}
                  className="w-full accent-violet-600"
                  aria-label="távolság"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">alja: tg⁻¹(47/d)</div>
                  <div className="font-mono font-black text-blue-900">{fmt(a1, 2)}°</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-2 border border-rose-200">
                  <div className="text-[11px] text-slate-500">teteje: tg⁻¹(93/d)</div>
                  <div className="font-mono font-black text-rose-900">{fmt(a2, 2)}°</div>
                </div>
                <div className="bg-violet-50 rounded-xl p-2 border border-violet-200">
                  <div className="text-[11px] text-slate-500">a szobor látószöge</div>
                  <div className="font-mono font-black text-violet-900">{fmt(view, 2)}°</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Keresd meg, hol a legnagyobb a látószög! (Segítség: a maximum d = √(47 · 93) ≈ {fmt(BEST_DIST, 1)} m-nél van, értéke ≈ {fmt(maxView, 2)}°.)
              </p>
            </div>
            <svg viewBox="0 0 340 160" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1="20" y1="130" x2="325" y2="130" stroke="#94a3b8" />
              <line x1="20" y1="15" x2="20" y2="130" stroke="#94a3b8" />
              <path d={curve} fill="none" stroke="#7c3aed" strokeWidth="2" />
              <line x1={gx(BEST_DIST)} y1={gy(maxView)} x2={gx(BEST_DIST)} y2="130" stroke="#a78bfa" strokeDasharray="3 3" />
              <circle cx={gx(dist)} cy={gy(view)} r="5" fill="#dc2626" />
              <text x="322" y="145" fontSize="10" textAnchor="end" fill="#475569">d (m) → 200</text>
              <text x="24" y="14" fontSize="10" fill="#475569">φ (fok)</text>
              <text x={gx(BEST_DIST)} y="145" fontSize="10" textAnchor="middle" fill="#6d28d9">≈ 66</text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TowerHeightTrigTheory;
