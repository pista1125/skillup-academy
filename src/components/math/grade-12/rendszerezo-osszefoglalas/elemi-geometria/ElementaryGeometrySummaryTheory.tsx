import React, { useMemo, useRef, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  fmt,
  Pt,
  dist,
  angleAt,
  circumcenter,
  incenter,
  inradius,
  orthocenter,
  centroid,
  RightAt,
  S_BLUE,
  S_RED,
  S_GREEN,
  S_PURPLE,
  S_INK
} from './sumKit';
import {
  DistanceTypesSvg,
  AnglePairsSvg,
  CircumIncircleSvg,
  OrthoCentroidSvg,
  QuadrilateralFamilySvg,
  RightTriangleBisectorSvg,
  PolygonDiagonalsSvg
} from './ElementaryGeometrySummaryFigures';

/** Pont helyzete a háromszöghöz képest (belül / határon / kívül), baricentrikus koordinátákkal. */
const where = (P: Pt, A: Pt, B: Pt, C: Pt) => {
  const s = (p: Pt, q: Pt, r: Pt) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  const area = s(A, B, C);
  if (Math.abs(area) < 1e-9) return 'elfajuló háromszög';
  const m = Math.min(s(B, C, P) / area, s(C, A, P) / area, s(A, B, P) / area);
  if (Math.abs(m) < 0.02) return 'a háromszög határán';
  return m > 0 ? 'a háromszög belsejében' : 'a háromszögön kívül';
};

export const ElementaryGeometrySummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: háromszög nevezetes pontjai
  const [pts, setPts] = useState<Pt[]>([
    [70, 250],
    [330, 250],
    [150, 80]
  ]);
  const [drag, setDrag] = useState<number | null>(null);
  const [show, setShow] = useState({ K: true, O: true, M: true, S: true });
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Labor II: sokszögek
  const [n, setN] = useState<number>(7);
  const [allDiag, setAllDiag] = useState<boolean>(false);

  const [A, B, C] = pts;
  const geo = useMemo(() => {
    const K = circumcenter(A, B, C);
    const O = incenter(A, B, C);
    const M = orthocenter(A, B, C);
    const S = centroid(A, B, C);
    const angA = angleAt(A, B, C);
    const angB = angleAt(B, A, C);
    const angC = angleAt(C, A, B);
    const maxAng = Math.max(angA, angB, angC);
    const type = Math.abs(maxAng - 90) < 1 ? 'derékszögű' : maxAng > 90 ? 'tompaszögű' : 'hegyesszögű';
    return { K, O, M, S, R: dist(K, A), r: inradius(A, B, C), angA, angB, angC, type };
  }, [A, B, C]);

  const toSvg = (e: React.PointerEvent<SVGSVGElement>): Pt | null => {
    const svg = svgRef.current;
    if (!svg || !svg.getScreenCTM) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const q = p.matrixTransform(ctm.inverse());
    return [Math.max(15, Math.min(385, q.x)), Math.max(15, Math.min(285, q.y))];
  };

  const poly = useMemo(() => {
    const R = 110;
    return Array.from({ length: n }, (_, i): Pt => {
      const t = -Math.PI / 2 + (2 * Math.PI * i) / n;
      return [140 + R * Math.cos(t), 135 + R * Math.sin(t)];
    });
  }, [n]);
  const diagFromOne = n - 3;
  const diagAll = (n * (n - 3)) / 2;
  const innerSum = (n - 2) * 180;
  const oneAngle = innerSum / n;

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="elemi-geometria"
      title="7. Elemi geometria – rendszerező összefoglalás"
      subtitle="Térelemek kölcsönös helyzete és távolsága, szögek és szögpárok, a háromszög nevezetes vonalai és pontjai, négyszögek és sokszögek."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="emerald"
      pdfFilename="12_osztaly_osszefoglalas_elemi_geometria_tananyag.pdf"
      practiceTitle="Készen állsz az elemi geometriai érettségi feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'KÉPLETTÁR — ELEMI GEOMETRIA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
                <div className="text-[11px] font-bold text-emerald-700">Háromszög</div>
                <div className="font-mono text-sm font-black text-emerald-900 dark:text-emerald-200">α + β + γ = 180°</div>
                <div className="font-mono text-sm font-black text-emerald-900 dark:text-emerald-200">c &lt; a + b</div>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
                <div className="text-[11px] font-bold text-indigo-700">n oldalú konvex sokszög</div>
                <div className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">(n − 2) · 180°</div>
                <div className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">n(n − 3)/2 átló</div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Külső szögek összege háromszögben és minden konvex sokszögben 360°.</li>
              <li>Oldalfelező merőlegesek → köré írt kör (K), belső szögfelezők → beírt kör (O), magasságok → M, súlyvonalak → S.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Térelemek: kölcsönös helyzet, távolság, hajlásszög" badge="Tankönyv 144–145. o." badgeColor="emerald">
        <TheoryTable
          headers={['', 'Fogalom', 'Tartalom']}
          rows={[
            ['D', 'Kölcsönös helyzet', 'Két egyenes metsző (1 közös pont), párhuzamos (egy síkban, nincs közös pont, vagy egybeesik) vagy kitérő (nincs őket tartalmazó sík). Egyenes és sík: illeszkedik, metszi (1 közös pont) vagy párhuzamos. Két sík: metsző (metszésvonal) vagy párhuzamos.'],
            ['D', 'Távolság közös ponttal', 'Ha két térelemnek van közös pontja, a távolságuk 0.'],
            ['D', 'Távolság közös pont nélkül', 'Pont és egyenes / sík: a merőleges szakasz hossza. Párhuzamos egyenesek, egyenes és vele párhuzamos sík, párhuzamos síkok: az egyik egy pontjának távolsága a másiktól.'],
            ['D', 'Szög, fok', 'Közös kezdőpontú két félegyenes két szögtartományra bontja a síkot. 1° a teljesszög 360-ad része, 1° = 60′, 1′ = 60″.'],
            ['T', 'Nevezetes szögpárok', 'Egyállású, csúcs-, váltószögek egyenlők; mellékszögek és kiegészítő szögek összege 180°; pótszögeké 90°; merőleges szárú szögek egyenlők vagy összegük 180°.'],
            ['D', 'Hajlásszög', 'Két metsző egyenes: a nem nagyobbik szög (≤ 90°). Egyenes és sík: az egyenes és a síkra eső merőleges vetületének szöge. Két sík: a metszésvonal egy pontjában rá merőlegesen, a két síkban állított egyenesek szöge. Párhuzamosaké 0°.']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <DistanceTypesSvg />
          <AnglePairsSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. A háromszög" badge="Tankönyv 146–147. o." badgeColor="blue">
        <TheoryTable
          headers={['', 'Fogalom', 'Tartalom']}
          rows={[
            ['T', 'Szögek', 'Belső szögek összege 180°; minden külső szög a két nem mellette fekvő belső szög összege; külső szögek összege 360°.'],
            ['T', 'Háromszög-egyenlőtlenség', 'Bármely két oldal összege nagyobb a harmadiknál: c < a + b, a < b + c, b < a + c.'],
            ['T', 'Szögek és oldalak', 'Egyenlő oldalakkal szemben egyenlő szögek vannak (és fordítva); hosszabb oldallal szemben nagyobb szög.'],
            ['D', 'Osztályozás', 'Szögei szerint hegyes-, derék- vagy tompaszögű (a legnagyobb szög dönt). Oldalai szerint egyenlő szárú (szárak, alap, szárszög) vagy szabályos.'],
            ['D', 'Nevezetes ponthalmazok', 'Két ponttól egyenlő távol: a szakaszfelező merőleges. Két metsző egyenestől egyenlő távol: a két szögfelező egyenes (merőlegesek egymásra). Kör: adott ponttól adott távolságra lévő pontok a síkon; gömb: ugyanez a térben.'],
            ['T', 'Oldalfelező merőlegesek', 'Egy pontban metszik egymást: a köré írt kör középpontja (K). Hegyesszögűben belső pont, derékszögűben az átfogó felezőpontja, tompaszögűben külső pont.'],
            ['T', 'Belső szögfelezők', 'Egy pontban metszik egymást: a beírt kör középpontja (O), mindig belső pont.'],
            ['T', 'Magasságvonalak', 'Egy pontban metszik egymást: a magasságpont (M). Hegyesszögűben belső pont, derékszögűben a derékszögű csúcs, tompaszögűben külső pont.'],
            ['T', 'Súlyvonalak', 'Egy pontban metszik egymást: a súlypont (S) – a súlyvonal oldalhoz közelebbi harmadolópontja, mindig belső pont.']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CircumIncircleSvg />
          <OrthoCentroidSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Négyszögek és sokszögek" badge="Tankönyv 147–148. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Négyszög:</strong> belső és külső szögeinek összege is 360°.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Trapéz:</strong> van két párhuzamos oldala (alapok); egy száron fekvő szögek összege 180°. A <strong>húrtrapéz</strong> alapon fekvő szögei egyenlők, tengelyesen szimmetrikus.
              </li>
              <li>
                <strong>Paralelogramma:</strong> szemközti oldalai párhuzamosak; szemközti szögei egyenlők, egy oldalon fekvő szögeinek összege 180°, szemközti oldalai egyenlők, átlói felezik egymást; középpontosan szimmetrikus.
              </li>
              <li>
                <strong>Deltoid:</strong> az egyik átló egyenesére tengelyesen szimmetrikus; két-két szomszédos oldala egyenlő, van két egyenlő szemközti szöge, egyik átlóját a másik átló egyenese merőlegesen felezi.
              </li>
              <li>
                <strong>Rombusz:</strong> minden oldala egyenlő – paralelogramma és deltoid is. <strong>Téglalap:</strong> minden szöge derékszög, átlói felezik egymást, tengelyesen és középpontosan szimmetrikus. <strong>Négyzet:</strong> téglalap és rombusz is.
              </li>
              <li>
                <strong>n oldalú konvex sokszög:</strong> egy csúcsból n − 3 átló, összesen n(n − 3)/2 átló; belső szögösszeg (n − 2) · 180°, külső szögösszeg 360°. <strong>Szabályos sokszög</strong> (minden oldal és szög egyenlő): egy szöge (n − 2) · 180°/n; páros n-re tengelyesen és középpontosan, páratlanra csak tengelyesen szimmetrikus.
              </li>
            </ul>
          </div>
          <QuadrilateralFamilySvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladat: magasság és szögfelező" badge="Kidolgozott 1." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Az ABC derékszögű háromszög AB átfogójához tartozó magasságvonal 20°-os szöget zár be a C-ből induló szögfelezővel. Mekkorák a hegyesszögek?</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>∢TCP = 20°. CP felezi a 90°-os szöget: ∢BCP = ∢PCA = 45°.</li>
              <li>∢BCT = ∢BCP − ∢TCP = 45° − 20° = 25°.</li>
              <li>A BCT derékszögű háromszögben ∢TBC és ∢BCT pótszögek: ∢TBC = 90° − 25° = 65°.</li>
              <li>
                Az ABC háromszögben ∢CAB = 90° − 65° = 25°. A hegyesszögek: <strong>25° és 65°</strong>.
              </li>
              <li>Másképp: ∢BCT és ∢CAB merőleges szárú hegyesszögek, ezért egyenlők (25°).</li>
            </ol>
          </div>
          <RightTriangleBisectorSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Kidolgozott feladatok: oldalhosszak és átlók" badge="Kidolgozott 2–3." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>2.</strong> Egy háromszög két oldala 35 cm és 91 cm, a harmadik (c) egész cm.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>c &lt; 35 + 91, 35 &lt; 91 + c, 91 &lt; 35 + c ⇒ 56 &lt; c &lt; 126.</li>
              <li>
                <strong>a)</strong> legkisebb 57 cm, legnagyobb 125 cm. <strong>b)</strong> 125 − 56 = <strong>69</strong> nem egybevágó háromszög.
              </li>
              <li>
                <strong>c)</strong> Két egyenlő szög ⇔ két egyenlő oldal: c = 35 nem lehet, c = 91 igen ⇒ <strong>1</strong> ilyen háromszög van.
              </li>
            </ol>
            <p>
              <strong>3.</strong> Egy konvex sokszög egyik csúcsából húzott átlók a belső szöget 23°, 42°, 30°, 47°, 8°-os részekre bontják.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>5 szögtartomány ⇒ 4 átló ⇒ n − 3 = 4 ⇒ n = 7.</li>
              <li>A szög 150°, a belső szögösszeg (7 − 2) · 180° = 900° ⇒ 900°/150° = <strong>6</strong>-szoros.</li>
            </ol>
          </div>
          <PolygonDiagonalsSvg />
        </div>
      </TheorySection>

      <TheorySection title="6. Megoldott feladatok a feladatsorból" badge="I. rész" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Szögek" badge="A1, A2, A5, A7, A12" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Óramutatók: 7 órakor 150°, fél 4-kor 75° (a kismutató 3,5 · 30° = 105°-nál áll).</li>
              <li>Négyszög: A belső 76°, D belső 360° − 76° − 74° − 80° = 130°, D külső szöge 50°.</li>
              <li>Külső szögek 3 : 5 : 7 ⇒ 72°, 120°, 168° ⇒ belsők 108°, 60°, 12°.</li>
              <li>Paralelogramma, két szög különbsége 23°: 78,5° és 101,5°.</li>
              <li>Pótszögek, az egyik ötszörös: 15° és 75°; merőleges szárúak, különbség 23°: 78,5° és 101,5°.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Távolság, sokszögek, állítások" badge="A3, A4, A6, A9–A11" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>5 cm-es kocka: A és a CC′D′D sík: 5 cm; BD′ és ABCD: 0 (B közös pont); AD′ és CC′B′B: 5 cm (párhuzamosak); ABCD és A′B′CD síkok: 0 (metszők).</li>
              <li>Igaz: minden paralelogramma trapéz; váltószögek lehetnek kiegészítők (2 · 90°); négyszögnek lehet 180°-nál nagyobb szöge (konkáv).</li>
              <li>1800° ⇒ n = 12 ⇒ egy csúcsból 9 átló. 65 átló ⇒ n = 13 ⇒ egy szög 1980°/13 ≈ 152,31°.</li>
              <li>Derékszögű háromszög: K az átfogó felezőpontja, M a derékszögű csúcs, KM = r = 8 cm ⇒ átmérő 16 cm.</li>
              <li>3,8 cm; 2,9 cm; 6,4 cm: 3,8 + 2,9 = 6,7 &gt; 6,4 ⇒ van ilyen háromszög.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Tipikus hiba: egységek és „a többi két szög”" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Átváltás és helyes oldalpár a háromszög-egyenlőtlenségben"
          wrong="3,8; 0,29; 64 → 3,8 + 0,29 < 64, tehát nincs ilyen háromszög."
          wrongExplanation="Különböző mértékegységeket hasonlítottunk össze (cm, dm, mm)."
          correct="3,8 cm; 2,9 cm; 6,4 cm: a két rövidebb összege 6,7 cm > 6,4 cm ⇒ van ilyen háromszög."
          correctExplanation="Elég azt ellenőrizni, hogy a két rövidebb oldal összege nagyobb-e a leghosszabbnál – azonos egységben!"
          tip="Hasonlóan: a külső szög a két NEM mellette fekvő belső szög összege, nem a mellette fekvőé."
        />
        <TheoryCallout type="warning" title="Tompaszögű háromszög">
          Tompaszögű háromszögben a köré írt kör középpontja és a magasságpont is a háromszögön kívül van – a beírt kör középpontja és a súlypont viszont mindig belül.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium I: nevezetes pontok" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <svg
                ref={svgRef}
                viewBox="0 0 400 300"
                className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200 touch-none select-none"
                onPointerMove={(e) => {
                  if (drag === null) return;
                  const p = toSvg(e);
                  if (!p) return;
                  setPts((old) => old.map((q, i) => (i === drag ? p : q)));
                }}
                onPointerUp={() => setDrag(null)}
                onPointerLeave={() => setDrag(null)}
                fontFamily="system-ui, sans-serif"
              >
                {show.K && Number.isFinite(geo.R) && geo.R < 2000 && <circle cx={geo.K[0]} cy={geo.K[1]} r={geo.R} fill="none" stroke={S_BLUE} strokeWidth="1.2" strokeDasharray="5 4" />}
                {show.O && <circle cx={geo.O[0]} cy={geo.O[1]} r={geo.r} fill="none" stroke={S_GREEN} strokeWidth="1.2" />}
                <polygon points={`${A} ${B} ${C}`} fill="#e0e7ff" fillOpacity="0.55" stroke={S_INK} strokeWidth="2" />
                {geo.type === 'derékszögű' &&
                  [0, 1, 2].map((i) => {
                    const ang = [geo.angA, geo.angB, geo.angC][i];
                    if (Math.abs(ang - 90) >= 1) return null;
                    const V = pts[i];
                    return <RightAt key={i} V={V} P={pts[(i + 1) % 3]} Q={pts[(i + 2) % 3]} r={14} />;
                  })}
                {show.K && <circle cx={geo.K[0]} cy={geo.K[1]} r="4.5" fill={S_BLUE} />}
                {show.O && <circle cx={geo.O[0]} cy={geo.O[1]} r="4.5" fill={S_GREEN} />}
                {show.M && <circle cx={geo.M[0]} cy={geo.M[1]} r="4.5" fill={S_RED} />}
                {show.S && <circle cx={geo.S[0]} cy={geo.S[1]} r="4.5" fill={S_PURPLE} />}
                {show.K && (
                  <text x={geo.K[0] + 6} y={geo.K[1] - 6} fontSize="12" fill={S_BLUE} fontWeight="bold">
                    K
                  </text>
                )}
                {show.O && (
                  <text x={geo.O[0] + 6} y={geo.O[1] + 14} fontSize="12" fill={S_GREEN} fontWeight="bold">
                    O
                  </text>
                )}
                {show.M && (
                  <text x={geo.M[0] + 6} y={geo.M[1] - 6} fontSize="12" fill={S_RED} fontWeight="bold">
                    M
                  </text>
                )}
                {show.S && (
                  <text x={geo.S[0] - 16} y={geo.S[1] + 4} fontSize="12" fill={S_PURPLE} fontWeight="bold">
                    S
                  </text>
                )}
                {pts.map((P, i) => (
                  <g key={i} onPointerDown={() => setDrag(i)} style={{ cursor: 'grab' }}>
                    <circle cx={P[0]} cy={P[1]} r="11" fill="#ffffff" fillOpacity="0.01" />
                    <circle cx={P[0]} cy={P[1]} r="6" fill={S_INK} />
                    <text x={P[0] + 8} y={P[1] - 8} fontSize="13" fontWeight="bold" fill={S_INK}>
                      {['A', 'B', 'C'][i]}
                    </text>
                  </g>
                ))}
              </svg>
              <p className="text-xs text-slate-500 mt-1">Húzd a csúcsokat egérrel vagy ujjal!</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['K', 'köré írt kör (K)', 'bg-blue-600'],
                    ['O', 'beírt kör (O)', 'bg-emerald-600'],
                    ['M', 'magasságpont (M)', 'bg-red-600'],
                    ['S', 'súlypont (S)', 'bg-purple-600']
                  ] as [keyof typeof show, string, string][]
                ).map(([k, t, c]) => (
                  <button
                    key={k}
                    onClick={() => setShow((s) => ({ ...s, [k]: !s[k] }))}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${show[k] ? `${c} text-white` : 'bg-slate-100 text-slate-600'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'hegyesszögű', v: [[70, 250], [330, 250], [150, 80]] as Pt[] },
                  { t: 'derékszögű', v: [[80, 250], [320, 250], [80, 90]] as Pt[] },
                  { t: 'tompaszögű', v: [[60, 250], [340, 250], [120, 180]] as Pt[] },
                  { t: 'szabályos', v: [[100, 250], [300, 250], [200, 250 - 100 * Math.sqrt(3)]] as Pt[] }
                ].map((p) => (
                  <button key={p.t} onClick={() => setPts(p.v)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-blue-100">
                    {p.t}
                  </button>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-blue-900 space-y-1">
                <div>
                  α ≈ {fmt(geo.angA, 1)}°, β ≈ {fmt(geo.angB, 1)}°, γ ≈ {fmt(geo.angC, 1)}° (összeg: {fmt(geo.angA + geo.angB + geo.angC, 1)}°)
                </div>
                <div>
                  A háromszög <strong>{geo.type}</strong>.
                </div>
                <div>K: {where(geo.K, A, B, C)}</div>
                <div>M: {where(geo.M, A, B, C)}</div>
                <div>O és S: mindig a háromszög belsejében.</div>
                <div className="text-xs text-slate-600">
                  AS : SF = 2 : 1 (S harmadolópont); K, S és M egy egyenesen van (Euler-egyenes), KS : SM = 1 : 2.
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Interaktív Laboratórium II: sokszögek szögei és átlói" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Oldalszám: n = {n}</label>
                <input type="range" min="3" max="20" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-purple-600" aria-label="n" />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <input type="checkbox" checked={allDiag} onChange={(e) => setAllDiag(e.target.checked)} />
                az összes átló mutatása
              </label>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900 space-y-1">
                <div>
                  Egy csúcsból induló átlók: n − 3 = <strong>{diagFromOne}</strong>
                </div>
                <div>
                  Összes átló: n(n − 3)/2 = {n} · {n - 3}/2 = <strong>{diagAll}</strong>
                </div>
                <div>
                  Belső szögösszeg: (n − 2) · 180° = <strong>{innerSum}°</strong>
                </div>
                <div>
                  Szabályos {n}-szög egy belső szöge: <strong>{fmt(oneAngle, 2)}°</strong>, külső szöge: <strong>{fmt(360 / n, 2)}°</strong>
                </div>
                <div className="text-xs text-slate-600">
                  Egy csúcsból húzott átlók {n - 2} háromszögre bontják a sokszöget – innen a (n − 2) · 180°. Szimmetria: {n % 2 === 0 ? 'tengelyesen és középpontosan is' : 'csak tengelyesen'} szimmetrikus.
                </div>
              </div>
            </div>
            <svg viewBox="0 0 280 270" className="w-full max-w-sm h-auto mx-auto bg-slate-50 rounded-xl border border-slate-200">
              <polygon points={poly.map((p) => p.join(',')).join(' ')} fill="#f3e8ff" stroke={S_INK} strokeWidth="2" />
              {allDiag
                ? poly.flatMap((p, i) =>
                    poly.slice(i + 2).map((q, k) => {
                      const j = i + 2 + k;
                      if (i === 0 && j === n - 1) return null;
                      return <line key={`${i}-${j}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={i === 0 ? S_RED : '#a78bfa'} strokeWidth={i === 0 ? 1.6 : 0.8} />;
                    })
                  )
                : poly.slice(2, n - 1).map((q, k) => <line key={k} x1={poly[0][0]} y1={poly[0][1]} x2={q[0]} y2={q[1]} stroke={S_RED} strokeWidth="1.6" />)}
              {poly.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r={i === 0 ? 4.5 : 3} fill={i === 0 ? S_RED : S_INK} />
              ))}
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ElementaryGeometrySummaryTheory;
