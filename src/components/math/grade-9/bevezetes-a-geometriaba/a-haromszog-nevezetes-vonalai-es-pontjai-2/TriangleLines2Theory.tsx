// Updated TriangleLines2Theory
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
  Triangle,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Layers,
  Scale,
  Compass,
  Circle,
  Move
} from 'lucide-react';
import {
  AltitudesAndOrthocenterSVG,
  MediansAndCentroidSVG,
  MidlinesSVG,
  EulerLineSVG
} from './TriangleLines2Figures';

interface TriangleLines2TheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const TriangleLines2Theory: React.FC<TriangleLines2TheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV EULER-EGYENES ÉS NEVEZETES PONTOK LABOR ÁLLAPOTOK ---
  const [triangleShape, setTriangleShape] = useState<'acute' | 'right' | 'obtuse' | 'equilateral'>('acute');
  const [cOffset, setCOffset] = useState<number>(0); // C csúcs x-eltolása

  // Interaktív háromszög pontjai és nevezetes pontjai:
  // A(60, 200), B(300, 200)
  // C függ a választott típustól és cOffset-től
  const triData = useMemo(() => {
    let Ax = 60, Ay = 200;
    let Bx = 300, By = 200;
    let Cx = 180 + cOffset, Cy = 60;

    if (triangleShape === 'right') {
      Cx = 60; // Derékszög A-ban
      Cy = 80;
    } else if (triangleShape === 'obtuse') {
      Cx = 30 + cOffset * 0.5; // Balra nyúlik, tompaszög A-nál
      Cy = 100;
    } else if (triangleShape === 'equilateral') {
      Cx = 180;
      Cy = 200 - 240 * (Math.sqrt(3) / 2); // ~ -7.8, skálázzuk le
      // Legyen alap 160: A(100, 190), B(260, 190), Cx=180, Cy=190 - 160*sqrt(3)/2 = 190 - 138.56 = 51.44
      Ax = 100; Ay = 190;
      Bx = 260; By = 190;
      Cx = 180; Cy = 51.44;
    }

    // Súlypont: S = (A + B + C) / 3
    const Sx = (Ax + Bx + Cx) / 3;
    const Sy = (Ay + By + Cy) / 3;

    // Körülírt kör középpontja (O):
    // Oldalfelező merőlegesek metszése
    // AB felezője: ((Ax+Bx)/2, Ay) = (Mab_x, Mab_y), meredeksége függőleges (x = Mab_x)
    const Mab_x = (Ax + Bx) / 2;
    // AC felezője:
    const Mac_x = (Ax + Cx) / 2;
    const Mac_y = (Ay + Cy) / 2;
    // AC meredeksége: m_ac = (Cy - Ay) / (Cx - Ax)
    // AC merőleges meredeksége: -1 / m_ac = -(Cx - Ax) / (Cy - Ay)
    let Ox = Mab_x;
    let Oy = Sy;
    if (Math.abs(Cy - Ay) > 0.001) {
      const slope_perp_ac = -(Cx - Ax) / (Cy - Ay);
      // y - Mac_y = slope_perp_ac * (x - Mac_x)
      // x = Mab_x behelyettesítésével:
      Oy = Mac_y + slope_perp_ac * (Mab_x - Mac_x);
    }

    // Euler-egyenes összefüggése:
    // A magasságpont M kielégíti: S - O vektor = 1/3 * (M - O) => M = 3*S - 2*O
    const Mx = 3 * Sx - 2 * Ox;
    const My = 3 * Sy - 2 * Oy;

    // Távolságok:
    const distMS = Math.sqrt((Mx - Sx) ** 2 + (My - Sy) ** 2);
    const distSO = Math.sqrt((Sx - Ox) ** 2 + (Sy - Oy) ** 2);
    const ratio = distSO > 0.5 ? (distMS / distSO).toFixed(2) : '1.00 (egybeesnek)';

    // M helyzete szöveg
    let mPosText = 'A háromszög belső tartományában található';
    if (triangleShape === 'right') {
      mPosText = 'Pontosan a derékszögű csúcsban (A) van';
    } else if (triangleShape === 'obtuse' || Cx < 55) {
      mPosText = 'A háromszögön KÍVÜL található (a tompaszög csúcsa mögött)';
    } else if (triangleShape === 'equilateral') {
      mPosText = 'M, S és O mind egybeesnek a középpontban';
    }

    return {
      Ax, Ay, Bx, By, Cx, Cy,
      Sx: Number(Sx.toFixed(1)),
      Sy: Number(Sy.toFixed(1)),
      Ox: Number(Ox.toFixed(1)),
      Oy: Number(Oy.toFixed(1)),
      Mx: Number(Mx.toFixed(1)),
      My: Number(My.toFixed(1)),
      distMS: Number(distMS.toFixed(1)),
      distSO: Number(distSO.toFixed(1)),
      ratio,
      mPosText
    };
  }, [triangleShape, cOffset]);

  return (
    <TheoryTemplate
      title="8. A háromszög nevezetes vonalai és pontjai II."
      subtitle="Magasságvonalak és magasságpont (M), súlyvonalak és a 2:1 súlypontarány (S), középvonalak és az Euler-egyenes összefüggései"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-nevezetes-vonalak-2"
      themeColor="teal"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "A legfontosabb tételek és arányok egy pillantásra",
        formula: "|AS| : |SF_a| = 2 : 1 \\quad \\text{és} \\quad |MS| = 2 \\cdot |SO|",
        rules: [
          "Magasságpont (M): A magasságvonalak metszéspontja. Hegyesszögű háromszögben BELÜL, derékszögűben a DERÉKSZÖGŰ CSÚCSBAN, tompaszögűben a háromszögön KÍVÜL található.",
          "Súlypont (S): A súlyvonalak metszéspontja. MINDIG a háromszög belsejében van, és a súlyvonalakat 2 : 1 arányban osztja úgy, hogy a CSÚCS FELŐLI szakasz a 2 rész, az oldal felőli az 1 rész (|AS| = 2/3 * s_a).",
          "Középvonalak: Két oldal felezőpontját összekötő szakasz párhuzamos a 3. oldallal, és hossza annak fele (k = a / 2). A három középvonal 4 egybevágó kis háromszögre bontja az eredetit.",
          "Euler-egyenes: Nem szabályos háromszögben a körülírt kör középpontja (O), a súlypont (S) és a magasságpont (M) egy egyenesre esik, sorrendjük M - S - O, és |MS| = 2 · |SO|."
        ]
      }}
    >
      {/* 1. FEJEZET: Magasságvonalak és a magasságpont */}
      <TheorySection
        title="1. A háromszög magasságvonalai és a magasságpont (M)"
        badge="1. Alaptétel"
        color="teal"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A háromszög <strong>magasságvonala</strong> a csúcsból a szemközti oldalegyenesre
              bocsátott merőleges egyenes. A csúcs és a merőleges talppontja közötti szakaszt
              nevezzük a háromszög <em>magasságának</em> ($m_a, m_b, m_c$).
            </p>

            <TheoryCard title="Tétel a magasságvonalak metszéspontjáról" color="teal">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                A háromszög három magasságvonala egy közös pontban metszi egymást. Ezt a pontot a
                háromszög <strong>magasságpontjának</strong> (ortocentrumának) nevezzük, jele: <strong>M</strong>.
              </p>
            </TheoryCard>

            <div className="p-3.5 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
              <h4 className="text-sm font-bold text-teal-900 dark:text-teal-200 mb-2">
                A magasságpont elhelyezkedése a háromszög típusától függően:
              </h4>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <li>• <strong>Hegyesszögű háromszög:</strong> $M$ a háromszög <em>belső tartományában</em> van.</li>
                <li>• <strong>Derékszögű háromszög:</strong> $M$ pontosan a <em>derékszögű csúccsal esik egybe</em>, mert a két befogó maga két magasságvonal!</li>
                <li>• <strong>Tompaszögű háromszög:</strong> $M$ a háromszögön <em>KÍVÜL</em> helyezkedik el, a tompaszögű csúcs mögötti külső szögtartományban.</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <AltitudesAndOrthocenterSVG />
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: Súlyvonalak és súlypont */}
      <TheorySection
        title="2. Súlyvonalak, súlypont (S) és a 2 : 1 arány tétele"
        badge="2. Alaptétel"
        color="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <MediansAndCentroidSVG />
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A háromszög <strong>súlyvonala</strong> a csúcsot a szemközti oldal felezőpontjával
              összekötő szakasz ($s_a, s_b, s_c$).
            </p>

            <TheoryCard title="A súlypont és az osztásarány tétele" color="emerald">
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>
                  A háromszög három súlyvonala egy közös pontban metszi egymást: ez a <strong>súlypont (S)</strong>.
                </p>
                <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                  A súlypont mindhárom súlyvonalat 2 : 1 arányban osztja két részre úgy, hogy a
                  <span className="underline decoration-emerald-500"> csúcs felőli szakasz a hosszabb</span> (2 rész),
                  az oldalfelező felőli pedig a rövidebb (1 rész).
                </p>
                <div className="p-2 bg-white dark:bg-slate-900 rounded border border-emerald-300 dark:border-emerald-700 font-mono text-center text-xs">
                  |AS| = 2/3 · s_a &nbsp;és&nbsp; |SF_a| = 1/3 · s_a
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout type="tip" title="Fizikai és területi érdekességek">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                • <strong>Tömegközéppont:</strong> Homogén tömegeloszlású háromszög lemez az $S$ pontján alátámasztva egyensúlyban marad.<br />
                • <strong>Területfelezés:</strong> Egy súlyvonal két egyenlő területű félre vágja a háromszöget. A három súlyvonal együtt pontosan <strong>6 darab azonos területű</strong> ($T/6$) kis háromszögre bontja a síkidomot!
              </p>
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: Középvonalak */}
      <TheorySection
        title="3. Középvonalak és a 4 egybevágó háromszög"
        badge="3. Geometriai konstrukció"
        color="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A háromszög <strong>középvonala</strong> két oldal felezőpontját összekötő szakasz.
              Mivel a háromszögnek 3 oldala van, pontosan 3 középvonala létezik ($k_a, k_b, k_c$).
            </p>

            <TheoryCard title="A középvonal tétele" color="purple">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A háromszög bármely középvonala <strong>párhuzamos a harmadik oldallal</strong>,
                és hossza pontosan <strong>feleakkora</strong>, mint a párhuzamos oldal hossza:
              </p>
              <div className="mt-2 text-center text-sm font-bold text-purple-700 dark:text-purple-300">
                k_c ∥ AB &nbsp;és&nbsp; k_c = |AB| / 2
              </div>
            </TheoryCard>

            <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <p className="font-semibold text-purple-900 dark:text-purple-200">
                A középvonalak által alkotott belső háromszög:
              </p>
              <p>• A három középvonal az eredeti háromszöget <strong>4 darab egymással egybevágó</strong> kis háromszögre osztja.</p>
              <p>• Minden kis háromszög területe pontosan a negyede az eredetinek: T_kis = T / 4.</p>
              <p>• Kerülete pedig pontosan a fele az eredetinek: K_kis = K / 2.</p>
            </div>
          </div>

          <div className="flex justify-center">
            <MidlinesSVG />
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: Euler-egyenes és nevezetes pontok */}
      <TheorySection
        title="4. Az Euler-egyenes és a négy nevezetes pont összefüggése"
        badge="4. Csúcstétel"
        color="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <EulerLineSVG />
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Leonhard Euler svájci matematikus fedezte fel 1765-ben, hogy a háromszög nevezetes pontjai
              nem függetlenek egymástól, hanem csodálatos szabályosságot követnek.
            </p>

            <TheoryCard title="Az Euler-egyenes tétele" color="amber">
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Bármely <strong>nem szabályos</strong> háromszögben a körülírt kör középpontja ($O$),
                  a súlypont ($S$) és a magasságpont ($M$) <strong>egy egyenesre esik</strong>. Ezt a közös egyenest
                  nevezzük <strong>Euler-egyenesnek</strong>.
                </p>
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-300 dark:border-amber-700 text-xs">
                  <p className="font-bold text-amber-900 dark:text-amber-200 mb-1">Sorrend és arány:</p>
                  <p>A pontok sorrendje az egyenesen mindig: <strong>M — S — O</strong>.</p>
                  <p className="font-semibold text-amber-800 dark:text-amber-300 mt-1">
                    A súlypont a magasságpont és a körülírt kör középpontja közötti távolságot 2 : 1 arányban osztja:
                  </p>
                  <p className="font-mono text-center font-bold text-sm mt-1 text-slate-900 dark:text-white">
                    |MS| = 2 · |SO|
                  </p>
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout type="info" title="Mi a helyzet a beírt kör középpontjával (I)?">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                A beírt kör középpontja ($I$) általános háromszögben <strong>NINCS rajta</strong> az Euler-egyenesen!
                Csak egyenlő szárú háromszögben esik rá (ekkor a szimmetriatengely maga az Euler-egyenes),
                szabályos háromszögben pedig mind a négy pont ($O = I = M = S$) <strong>egybeolvad egyetlen ponttá</strong>!
              </p>
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 5. FEJEZET: Interaktív Nevezetes Pontok és Euler-egyenes Labor */}
      <TheorySection
        title="5. Interaktív Labor: Nevezetes Pontok és az Euler-egyenes Élőben"
        badge="Gyakorlati szimuláció"
        color="teal"
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600" />
                Háromszög Geometria & Euler-egyenes Vizsgáló
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Válassz háromszögtípust vagy mozgasd a C csúcsot, és figyeld meg az M, S, O pontok vándorlását!
              </p>
            </div>

            {/* Háromszögtípus választó gombok */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setTriangleShape('acute'); setCOffset(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  triangleShape === 'acute'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Hegyesszögű
              </button>
              <button
                onClick={() => { setTriangleShape('right'); setCOffset(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  triangleShape === 'right'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Derékszögű
              </button>
              <button
                onClick={() => { setTriangleShape('obtuse'); setCOffset(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  triangleShape === 'obtuse'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Tompaszögű
              </button>
              <button
                onClick={() => { setTriangleShape('equilateral'); setCOffset(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  triangleShape === 'equilateral'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Szabályos
              </button>
            </div>
          </div>

          {/* Csúszka C pozíciójának finomhangolásához hegyesszögű / tompaszögű esetén */}
          {triangleShape !== 'equilateral' && triangleShape !== 'right' && (
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap flex items-center gap-1.5">
                <Move className="w-4 h-4 text-teal-600" />
                C csúcs vízszintes helyzete:
              </label>
              <input
                type="range"
                min="-90"
                max="90"
                value={cOffset}
                onChange={(e) => setCOffset(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300 w-12 text-right">
                {cOffset > 0 ? `+${cOffset}` : cOffset}
              </span>
            </div>
          )}

          {/* Interaktív rajzvászon és statisztikák rácsban */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Diagram */}
            <div className="lg:col-span-7 flex justify-center">
              <svg
                viewBox="0 0 360 260"
                className="w-full max-w-md h-auto bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 p-2 shadow-inner"
              >
                {/* Rács és tengelyek */}
                <line x1="20" y1="200" x2="340" y2="200" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />

                {/* Háromszög sokszög */}
                <polygon
                  points={`${triData.Ax},${triData.Ay} ${triData.Bx},${triData.By} ${triData.Cx},${triData.Cy}`}
                  fill="rgba(13, 148, 136, 0.08)"
                  stroke="#0d9488"
                  strokeWidth="2.5"
                />

                {/* Euler-egyenes rajzolása, ha nem szabályos háromszög */}
                {triangleShape !== 'equilateral' && (
                  <line
                    x1={triData.Mx + (triData.Mx - triData.Ox) * 0.4}
                    y1={triData.My + (triData.My - triData.Oy) * 0.4}
                    x2={triData.Ox - (triData.Mx - triData.Ox) * 0.4}
                    y2={triData.Oy - (triData.My - triData.Oy) * 0.4}
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Pontok és feliratok */}
                {/* A, B, C csúcsok */}
                <circle cx={triData.Ax} cy={triData.Ay} r="3.5" fill="#334155" />
                <text x={triData.Ax - 15} y={triData.Ay + 5} fontSize="11" fontWeight="bold" fill="#334155">A</text>

                <circle cx={triData.Bx} cy={triData.By} r="3.5" fill="#334155" />
                <text x={triData.Bx + 8} y={triData.By + 5} fontSize="11" fontWeight="bold" fill="#334155">B</text>

                <circle cx={triData.Cx} cy={triData.Cy} r="4" fill="#0d9488" />
                <text x={triData.Cx} y={triData.Cy - 10} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f766e">C</text>

                {/* Derékszög jelölése magyar szabvánnyal, ha derékszögű */}
                {triangleShape === 'right' && (
                  <g>
                    <path d="M 60 185 A 15 15 0 0 1 75 200" fill="none" stroke="#0d9488" strokeWidth="1.2" />
                    <circle cx="67" cy="193" r="1.2" fill="#0d9488" />
                  </g>
                )}

                {/* O pont (körülírt kör) */}
                <circle cx={triData.Ox} cy={triData.Oy} r="5" fill="#7c3aed" />
                <text x={triData.Ox + 8} y={triData.Oy + 4} fontSize="11" fontWeight="bold" fill="#7c3aed">O</text>

                {/* S pont (súlypont) */}
                <circle cx={triData.Sx} cy={triData.Sy} r="5" fill="#f59e0b" />
                <text x={triData.Sx + 8} y={triData.Sy + 4} fontSize="11" fontWeight="bold" fill="#b45309">S</text>

                {/* M pont (magasságpont) */}
                <circle cx={triData.Mx} cy={triData.My} r="5" fill="#dc2626" />
                <text x={triData.Mx - 18} y={triData.My - 4} fontSize="11" fontWeight="bold" fill="#dc2626">M</text>
              </svg>
            </div>

            {/* Elemző panel kártyák */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3 bg-teal-50/70 dark:bg-slate-800/80 rounded-xl border border-teal-200 dark:border-teal-800">
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300 block mb-1">
                  1. Magasságpont (M) helyzete:
                </span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {triData.mPosText}
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 dark:bg-slate-800/80 rounded-xl border border-amber-200 dark:border-amber-800">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  2. Euler-egyenes és távolságarány:
                </span>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>|MS| (M és S távolsága):</span>
                    <strong className="font-mono">{triData.distMS} px</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>|SO| (S és O távolsága):</span>
                    <strong className="font-mono">{triData.distSO} px</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-amber-200 dark:border-amber-800 font-bold text-amber-900 dark:text-amber-200">
                    <span>|MS| / |SO| arány:</span>
                    <span className="font-mono text-sm">{triData.ratio}</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400">
                <strong className="text-slate-800 dark:text-slate-200">Aranyszabály:</strong> A súlypont ($S$) távolsága a magasságponttól ($M$) mindig pontosan a <em>kétszerese</em> a körülírt kör középpontjától ($O$) vett távolságának!
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* CSAPDÁK ÉS TIPUSHIBAK */}
      <TheoryTrapBox
        traps={[
          {
            title: "A súlypont osztásarányának iránya (2:1 vs 1:2)",
            description: "Gyakori tévedés felcserélni a szakaszokat. A CSÚCS felőli szakasz a hosszabb (|AS| = 2/3 · s_a), az oldal felezőpontja felőli pedig a rövidebb (|SF_a| = 1/3 · s_a). Tehát ha a teljes súlyvonal 12 cm, akkor a csúcs felőli rész 8 cm, az oldal felőli 4 cm!",
            severity: "critical"
          },
          {
            title: "A magasságpont mindig a háromszög belsejében van?",
            description: "NEM! Csak hegyesszögű háromszögben van belül. Tompaszögű háromszögnél a magasságpont a háromszögön KÍVÜLRE esik, míg derékszögű háromszögben pontosan a DERÉKSZÖGŰ CSÚCCSAL esik egybe.",
            severity: "warning"
          },
          {
            title: "Középvonal vs. Súlyvonal összekeverése",
            description: "A középvonal KÉT OLDALFELEZŐ PONTOT köt össze (hossza a harmadik oldal fele, azzal párhuzamos). A súlyvonal ezzel szemben egy CSÚCSOT köt össze a SZEMKÖZTI oldalfelező ponttal!",
            severity: "warning"
          },
          {
            title: "A beírt kör középpontja (I) is rajta van az Euler-egyenesen?",
            description: "Általános háromszögben NEM! Csak O, S és M alkotja az Euler-egyenest. Az I pont csak egyenlő szárú vagy szabályos háromszögben esik az egyenesre.",
            severity: "info"
          }
        ]}
      />

      {/* ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheoryTable
        title="A négy nevezetes pont és vonal összehasonlító táblázata"
        headers={["Nevezetes vonal", "Metszéspont jele", "Neve", "Hol helyezkedik el?", "Főbb tétel / arány"]}
        rows={[
          [
            "Oldalfelező merőlegesek",
            "O",
            "Körülírt kör középpontja",
            "Hegyesszögűben belül, derékszögűben az átfogó felezőpontja, tompaszögűben kívül",
            "Egyenlő távolságra van a háromszög mindhárom csúcsától (R sugár)"
          ],
          [
            "Belső szögfelezők",
            "I",
            "Beírt kör középpontja",
            "MINDIG a háromszög belsejében",
            "Egyenlő távolságra van a háromszög mindhárom oldalegyenesétől (r sugár)"
          ],
          [
            "Magasságvonalak",
            "M",
            "Magasságpont (ortocentrum)",
            "Hegyesszögűben belül, derékszögűben a derékszögű csúcs, tompaszögűben kívül",
            "Az Euler-egyenes egyik végpontja; |MS| = 2 · |SO|"
          ],
          [
            "Súlyvonalak",
            "S",
            "Súlypont (tömegközéppont)",
            "MINDIG a háromszög belsejében",
            "2 : 1 arányban osztja a súlyvonalakat a csúcs felől; 6 azonos területű részre bont"
          ]
        ]}
      />
    </TheoryTemplate>
  );
};

