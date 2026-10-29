import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Compass,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileCode,
  Layers,
  HelpCircle,
  Hash,
  Scale
} from 'lucide-react';
import {
  GeometricPrimitivesSvg,
  AngleTypesSvg,
  AdjacentAndVerticalAnglesSvg,
  ParallelTransversalAnglesSvg,
  ComplementaryAnglesSvg
} from './PlaneGeometryFigures';

interface PlaneGeometryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PlaneGeometryTheory: React.FC<PlaneGeometryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV SZÖGVIZSGÁLÓ ÉS SZÖGPÁR LABOR ÁLLAPOTOK ---
  const [angleDeg, setAngleDeg] = useState<number>(50);

  // Szög tulajdonságainak és kapcsolatainak kiértékelése
  const angleDetails = useMemo(() => {
    let typeName = '';
    let typeDesc = '';
    let badgeColor = '';

    if (angleDeg === 0) {
      typeName = 'Nullszög';
      typeDesc = 'A szög szárai egybeesnek, a szögtartomány egyetlen félegyenes.';
      badgeColor = 'bg-slate-100 text-slate-800 border-slate-300';
    } else if (angleDeg > 0 && angleDeg < 90) {
      typeName = 'Hegyesszög';
      typeDesc = '0° és 90° közé eső szög.';
      badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
    } else if (angleDeg === 90) {
      typeName = 'Derékszög';
      typeDesc = 'Pontosan 90°-os szög. A szárai egymásra merőlegesek (jelölése negyedkörív ponttal).';
      badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (angleDeg > 90 && angleDeg < 180) {
      typeName = 'Tompaszög';
      typeDesc = '90° és 180° közé eső szög.';
      badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    } else if (angleDeg === 180) {
      typeName = 'Egyenesszög';
      typeDesc = 'Pontosan 180°-os szög. A szárai egymás meghosszabbításai, egy egyenest alkotnak.';
      badgeColor = 'bg-purple-100 text-purple-800 border-purple-300';
    } else if (angleDeg > 180 && angleDeg < 360) {
      typeName = 'Homorúszög';
      typeDesc = '180° és 360° közé eső szög.';
      badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    } else {
      typeName = 'Teljesszög';
      typeDesc = 'Pontosan 360°-os szög. A szárai egybeesnek, lefedve a teljes síkot.';
      badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-300';
    }

    // Számítások kapcsolódó szögpárokhoz
    const compAngle = angleDeg <= 90 ? 90 - angleDeg : null;
    const suppAngle = angleDeg <= 180 ? 180 - angleDeg : null;

    // Dinamikus SVG koordináták a szög kirajzolásához
    const rad = (angleDeg * Math.PI) / 180;
    const r = 85;
    const cx = 110;
    const cy = 110;
    const endX = cx + r * Math.cos(-rad);
    const endY = cy + r * Math.sin(-rad);
    const largeArcFlag = angleDeg > 180 ? 1 : 0;
    const arcPath =
      angleDeg === 0
        ? ''
        : angleDeg >= 360
        ? `M ${cx + 30} ${cy} A 30 30 0 1 0 ${cx - 30} ${cy} A 30 30 0 1 0 ${cx + 30} ${cy}`
        : `M ${cx + 35} ${cy} A 35 35 0 ${largeArcFlag} 0 ${cx + 35 * Math.cos(-rad)} ${cy + 35 * Math.sin(-rad)}`;

    return {
      typeName,
      typeDesc,
      badgeColor,
      compAngle,
      suppAngle,
      cx,
      cy,
      r,
      endX,
      endY,
      arcPath
    };
  }, [angleDeg]);

  return (
    <TheoryTemplate
      title="1. A sík geometriája"
      subtitle="Geometriai alapelemek, axiómák, szögfajták és nevezetes szögpárok összefüggései"
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • 1. TÉMAKÖR"
      themeColor="blue"
      documentId="plane-geometry-theory"
      pdfFilename="9_osztaly_a_sik_geometriaja_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Síkgeometria Alaptételei & Fő Szabályai',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-black">Csúcsszögek:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">α = α'</span>
              <span className="text-slate-500 font-normal text-xs">(mindig egyenlők)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-black">Mellékszögek:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">α + β = 180°</span>
              <span className="text-slate-500 font-normal text-xs">(összegük egyenesszög)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Pótszögek:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">α + β = 90°</span>
              <span className="text-slate-500 font-normal text-xs">(összegük derékszög)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-black">Párhuzamos szárú szögek (e ∥ f):</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">váltószögek (Z) & egyállásúak (F) egyenlők</span>
            </div>
          </div>
        )
      }}
    >
      {/* =========================================================================
          1. SZEKCIÓ: GEOMETRIAI ALAPELEMEK ÉS AXIÓMÁK
      ========================================================================= */}
      <TheorySection
        title="1. Geometriai alapelemek és axiómák"
        icon={<Compass className="w-6 h-6 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A geometria axiomatikus felépítésű tudomány. Az elmélet alapját az <strong>alapfogalmak</strong> (amelyeket
              nem definiálunk visszamenőleg, hanem szemléletes tapasztalatból fogadunk el) és az <strong>axiómák</strong> képezik
              (bizonyítás nélkül igaznak elfogadott alapvető tételek).
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li>
                <strong>Alapfogalmak:</strong> <em>Pont</em> (0 dimenziós, nincs kiterjedése), <em>egyenes</em> (1 dimenziós, mindkét irányban végtelen), <em>sík</em> (2 dimenziós, minden irányban végtelen felület).
              </li>
              <li>
                <strong>Alaprelációk:</strong> <em>Illeszkedés</em> (a pont rajta van az egyenesen: <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">P ∈ e</code>), <em>közöttiség</em> (egyenes pontjainak sorrendje).
              </li>
              <li>
                <strong>Származtatott alakzatok:</strong>
                <ul className="pl-6 pt-1 space-y-1 list-circle text-xs">
                  <li><strong>Félegyenes:</strong> Az egyenesnek egy tetszőleges pontja által két részre osztott, egyik irányban végtelen fele (kezdőpontja van).</li>
                  <li><strong>Szakasz:</strong> Két pont (végpontok) által határolt egyenesdarab. Két pont távolsága a szakasz hossza.</li>
                  <li><strong>Félsík:</strong> Egy egyenes a síkot két egymást kizáró félsíkra osztja fel, az egyenes a félsíkok határvonala.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <GeometricPrimitivesSvg size={340} />
          </div>
        </div>

        <TheoryCallout
          variant="info"
          title="A síkgeometria két kulcsaxiómája"
        >
          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-700">
            <li>Két különböző pontra a síkban <strong>pontosan egyetlen egyenes</strong> illeszkedik.</li>
            <li>Egy egyenesre és egy rajta kívül fekvő pontra <strong>pontosan egyetlen olyan egyenes</strong> húzható a síkban, amely párhuzamos az adott egyenessel (<em>euklideszi párhuzamossági axióma</em>).</li>
          </ol>
        </TheoryCallout>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: SZÖGEK SZÁRMAZTATÁSA ÉS FAJTÁI
      ========================================================================= */}
      <TheorySection
        title="2. A szög fogalma és szögfajták méretük szerint"
        icon={<Layers className="w-6 h-6 text-blue-600" />}
      >
        <p className="text-slate-700 leading-relaxed text-sm mb-4">
          A sík egy pontjából (a szög csúcsából) kiinduló két félegyenes (a szög szárai) a síkot két szögtartományra
          osztja. Ha a szárak nem egybeesők vagy egymás meghosszabbításai, az egyik tartomány kisebb, mint egy félsík
          (konvex szögtartomány), a másik nagyobb (homorú szögtartomány).
        </p>

        <div className="flex justify-center my-4">
          <AngleTypesSvg size={360} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-xl space-y-1">
            <span className="font-bold text-blue-900 text-sm block">Hegyesszög</span>
            <code className="text-xs font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200 inline-block">
              0° &lt; α &lt; 90°
            </code>
            <p className="text-xs text-slate-600 pt-1">Kisebb, mint a derékszög. Tipikus háromszögszög.</p>
          </div>

          <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1">
            <span className="font-bold text-emerald-900 text-sm block">Derékszög</span>
            <code className="text-xs font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 inline-block">
              α = 90°
            </code>
            <p className="text-xs text-slate-600 pt-1">Szárai egymásra merőlegesek. Magyar jelölése: <strong>negyedkörív, benne ponttal</strong>.</p>
          </div>

          <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl space-y-1">
            <span className="font-bold text-amber-900 text-sm block">Tompaszög</span>
            <code className="text-xs font-mono font-bold text-amber-700 bg-white px-2 py-0.5 rounded border border-amber-200 inline-block">
              90° &lt; α &lt; 180°
            </code>
            <p className="text-xs text-slate-600 pt-1">Nagyobb a derékszögnél, de kisebb az egyenesszögnél.</p>
          </div>

          <div className="p-3.5 bg-purple-50/50 border border-purple-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-900 text-sm block">Egyenesszög</span>
            <code className="text-xs font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200 inline-block">
              α = 180°
            </code>
            <p className="text-xs text-slate-600 pt-1">A két szár egymás meghosszabbítása, pontosan egy egyenest alkotnak.</p>
          </div>

          <div className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-900 text-sm block">Homorúszög</span>
            <code className="text-xs font-mono font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200 inline-block">
              180° &lt; α &lt; 360°
            </code>
            <p className="text-xs text-slate-600 pt-1">Nagyobb az egyenesszögnél. Nem konvex szög, "kívülről" kerüli meg a csúcsot.</p>
          </div>

          <div className="p-3.5 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-1">
            <span className="font-bold text-indigo-900 text-sm block">Nullszög & Teljesszög</span>
            <code className="text-xs font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 inline-block">
              α = 0° vagy α = 360°
            </code>
            <p className="text-xs text-slate-600 pt-1">0°-nál a szárak egybeesnek (üres belső), 360°-nál az egész síkot lefedik.</p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: METSZŐ EGYENESEK SZÖGPÁRJAI: CSÚCSSZÖGEK ÉS MELLÉKSZÖGEK
      ========================================================================= */}
      <TheorySection
        title="3. Metsző egyenesek szögpárjai"
        icon={<Scale className="w-6 h-6 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Amikor a síkban két egyenes metszi egymást egy pontban, összesen <strong>4 szög</strong> keletkezik.
              Ezek között két alapvető geometriai szögpár-kapcsolat figyelhető meg:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl">
                <span className="font-bold text-blue-900 block text-sm mb-1">1. Csúcsszögek (Szemközti szögek)</span>
                <p className="text-xs text-slate-600">
                  Olyan szögpár, melynek szárai egymás meghosszabbításai.
                </p>
                <div className="mt-2 text-xs font-semibold text-blue-800">
                  Tétel: A csúcsszögek mindig egyenlő nagyságúak: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">α = α'</code>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl">
                <span className="font-bold text-amber-900 block text-sm mb-1">2. Mellékszögek (Szomszédos kiegészítő szögek)</span>
                <p className="text-xs text-slate-600">
                  Egy közös száruk van, a másik két száruk pedig egymás meghosszabbítása (egy egyenest alkotnak).
                </p>
                <div className="mt-2 text-xs font-semibold text-amber-800">
                  Tétel: A mellékszögek összege mindig 180°: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">α + β = 180°</code>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <AdjacentAndVerticalAnglesSvg size={340} />
          </div>
        </div>

        <TheoryCallout
          variant="tip"
          title="Bizonyítás: Miért egyenlők a csúcsszögek?"
        >
          <p className="text-sm text-slate-700">
            Jelölje a két szomszédos mellékszöget α és β, ekkor <code>α + β = 180°</code>.
            De a szemközti α' és a mellette lévő β szintén mellékszögek, így <code>α' + β = 180°</code>.
            Kivonva a két egyenletet egymásból: <code>α - α' = 0 ⟹ α = α'</code>. Tehát a csúcsszögek nagysága mindig megegyezik!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: PÓTSZÖGEK ÉS DERÉKSZÖGŰ KAPCSOLATOK
      ========================================================================= */}
      <TheorySection
        title="4. Pótszögek és a merőlegesség"
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
            <p>
              Két szöget <strong>pótszögeknek</strong> (komplementer szögeknek) nevezünk, ha az összegük pontosan <strong>90°</strong> (derékszög):
            </p>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-center font-bold text-base text-emerald-800">
              α + β = 90° ⟺ β = 90° - α
            </div>
            <p className="text-xs text-slate-600">
              Például egy derékszögű háromszög két hegyesszöge mindig egymás pótszöge, hiszen a háromszög belső szögeinek összege 180°, amiből a derékszög 90°-ot elvesz, így a maradék két szög összege mindig 90°.
            </p>
          </div>
          <div className="flex justify-center">
            <ComplementaryAnglesSvg size={300} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: PÁRHUZAMOS SZÁRÚ SZÖGEK (EGYÁLLÁSÚ, VÁLTÓ- ÉS TÁRSSZÖGEK)
      ========================================================================= */}
      <TheorySection
        title="5. Párhuzamos szárú szögek metsző egyenessel"
        icon={<FileCode className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Ha két párhuzamos egyenest (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">e ∥ f</code>) egy
              harmadik, metsző egyenes (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">m</code>) metsz,
              összesen 8 szög keletkezik. Ezek páronként nevezetes geometriai kapcsolatban állnak egymással:
            </p>
            <ul className="space-y-3 text-xs">
              <li className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                <strong className="text-blue-900 block text-sm">Egyállású szögek (F-szögek):</strong>
                A metsző egyenes azonos oldalán, azonos irányban elhelyezkedő szögek. Párhuzamos eltolással fedésbe hozhatók, ezért <strong>egyenlőek</strong> (<code className="font-bold">α = α₁</code>).
              </li>
              <li className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-900 block text-sm">Váltószögek (Z-szögek):</strong>
                A metsző egyenes ellentétes oldalán, egymással szemben "váltakozva" elhelyezkedő belső vagy külső szögek. Szintén <strong>egyenlőek</strong> (<code className="font-bold">α = α₂</code>).
              </li>
              <li className="p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                <strong className="text-amber-900 block text-sm">Társszögek (C-szögek / U-szögek):</strong>
                A metsző egyenes azonos oldalán, a párhuzamosok "között" elhelyezkedő belső szögek. Összegük mindig <strong>180°</strong> (<code className="font-bold">α + β = 180°</code>).
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <ParallelTransversalAnglesSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV SZÖGVIZSGÁLÓ & SZÖGPÁR LABOR (A TANANYAG VÉGÉN)
      ========================================================================= */}
      <TheoryCard
        title="Interaktív Szögvizsgáló & Szögpár Labor"
        icon={<Sliders className="w-6 h-6 text-blue-600" />}
      >
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-sm">
            Mozgasd a csúszkát a szög nagyságának változtatásához! Figyeld meg az aktuális szög geometriai típusát,
            vizuális ábrázolását (<strong>90°-nál a magyar negyedkörív + pont jelöléssel</strong>), valamint a kapcsolódó <strong>pótszögét</strong> és <strong>mellékszögét</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
            {/* Bal oldali vezérlők és szög rajzolás */}
            <div className="md:col-span-6 flex flex-col items-center justify-center space-y-4">
              {/* Dinamikus SVG szögkirajzolás */}
              <div className="w-full flex justify-center bg-white rounded-xl border border-slate-200 p-2 shadow-inner">
                <svg viewBox="0 0 220 220" width={220} height={200} className="select-none">
                  <defs>
                    <marker id="armArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
                    </marker>
                  </defs>

                  {/* Fix kezdő szár (vízszintes jobbra) */}
                  <line
                    x1={angleDetails.cx}
                    y1={angleDetails.cy}
                    x2={angleDetails.cx + angleDetails.r + 10}
                    y2={angleDetails.cy}
                    stroke="#1e293b"
                    strokeWidth="2.5"
                    markerEnd="url(#armArrow)"
                  />

                  {/* Forgó szár */}
                  {angleDeg > 0 && angleDeg < 360 && (
                    <line
                      x1={angleDetails.cx}
                      y1={angleDetails.cy}
                      x2={angleDetails.endX}
                      y2={angleDetails.endY}
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      markerEnd="url(#armArrow)"
                    />
                  )}

                  {/* Szögív ha nem 90 fok */}
                  {angleDetails.arcPath && angleDeg !== 90 && (
                    <path
                      d={angleDetails.arcPath}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Derékszög jelölése 90°-nál: magyar szabvány negyedkörív ponttal */}
                  {angleDeg === 90 && (
                    <g>
                      <path
                        d={`M ${angleDetails.cx + 26} ${angleDetails.cy} A 26 26 0 0 0 ${angleDetails.cx} ${angleDetails.cy - 26}`}
                        fill="rgba(5, 150, 105, 0.12)"
                        stroke="#059669"
                        strokeWidth="2"
                      />
                      <circle cx={angleDetails.cx + 10} cy={angleDetails.cy - 10} r="2.5" fill="#059669" />
                    </g>
                  )}

                  {/* Csúcspont */}
                  <circle cx={angleDetails.cx} cy={angleDetails.cy} r="4.5" fill="#1e293b" />
                  <text x={angleDetails.cx - 16} y={angleDetails.cy + 16} fontSize="13" fontWeight="bold" fill="#475569">
                    O
                  </text>
                </svg>
              </div>

              {/* Slider vezérlő */}
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">Szög nagysága (α):</span>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-mono font-bold text-base shadow-sm">
                    {angleDeg}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={angleDeg}
                  onChange={(e) => setAngleDeg(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>0°</span>
                  <span>90°</span>
                  <span>180°</span>
                  <span>270°</span>
                  <span>360°</span>
                </div>
              </div>
            </div>

            {/* Jobb oldali elemző kártya */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Szög besorolása</span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${angleDetails.badgeColor}`}>
                    {angleDetails.typeName}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{angleDetails.typeDesc}</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Kapcsolódó szögpárok</span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Pótszög */}
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-500 font-semibold block mb-1">Pótszög (90° - α):</span>
                    {angleDetails.compAngle !== null ? (
                      <span className="font-mono font-bold text-sm text-emerald-600">
                        {angleDetails.compAngle}°
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Nem értelmezett (α &gt; 90°)</span>
                    )}
                  </div>

                  {/* Mellékszög */}
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-500 font-semibold block mb-1">Mellékszög (180° - α):</span>
                    {angleDetails.suppAngle !== null ? (
                      <span className="font-mono font-bold text-sm text-amber-600">
                        {angleDetails.suppAngle}°
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Nem értelmezett (α &gt; 180°)</span>
                    )}
                  </div>
                </div>

                <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900">
                  <strong>Csúcsszög:</strong> Két egyenes metszésekor a szemközti csúcsszög nagysága pontosan megegyezik vele: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-blue-700">α' = {angleDeg}°</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS CSAPDÁK DOBOZ
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus hibák és érettségi csapdák a síkgeometriában"
        traps={[
          {
            wrong: 'A feladatban szereplő két szöget váltószögnek tekintjük, de nincs megadva, hogy az egyenesek párhuzamosak.',
            correct: 'A váltószögek és egyállású szögek egyenlősége KIZÁRÓLAG akkor érvényes, ha a szárak párhuzamosak (e ∥ f)! Ha az egyenesek nem párhuzamosak, a szögek nagysága eltérő.',
            explanation: 'Mindig keresd a szövegben vagy ábrán az e ∥ f párhuzamossági jelölést!'
          },
          {
            wrong: 'Pótszög és mellékszög fogalmának összekeverése (pl. 40° mellékszögeként 50°-ot számolunk).',
            correct: 'A pótszög 90°-ra egészít ki (90° - 40° = 50°), a MELLÉKSZÖG viszont 180°-ra egészít ki (180° - 40° = 140°)!',
            explanation: 'Mnemonic: Pót = Pici (90°), Mellék = Magasabb (180°).'
          },
          {
            wrong: 'Homorúszöget tompaszögnek nevezünk 180° felett (pl. 210°).',
            correct: 'A tompaszög szigorúan 90° és 180° közé esik. 180° és 360° között a szög neve HOMORÚSZÖG.',
            explanation: 'A homorúszögek "behorpadnak", konvex sokszög belső szögeként nem fordulhatnak elő háromszögekben.'
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryCard
        title="Szögpárok és Szögkapcsolatok Gyors Áttekintője"
        icon={<Hash className="w-6 h-6 text-blue-600" />}
      >
        <TheoryTable
          headers={['Szögpár megnevezése', 'Geometriai elhelyezkedés', 'Összefüggés / Képlet', 'Példaértékek']}
          rows={[
            ['Csúcsszögek', 'Két metsző egyenes szemközti szögei', 'α = α\' (Egyenlők)', '65° és 65°'],
            ['Mellékszögek', 'Egy egyenesen fekvő, közös szárú szögek', 'α + β = 180°', '65° és 115°'],
            ['Pótszögek', 'Derékszöget alkotó szögpár', 'α + β = 90°', '25° és 65°'],
            ['Egyállású szögek', 'Párhuzamosok és metsző, azonos állás (F)', 'α = α₁ (Egyenlők, ha e ∥ f)', '72° és 72°'],
            ['Váltószögek', 'Párhuzamosok és metsző, ellentétes oldal (Z)', 'α = α₂ (Egyenlők, ha e ∥ f)', '72° és 72°'],
            ['Társszögek', 'Párhuzamosok közötti azonos oldali szögek (C)', 'α + β = 180° (ha e ∥ f)', '72° és 108°']
          ]}
        />
      </TheoryCard>
    </TheoryTemplate>
  );
};
