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
  FileCode,
  Layers,
  Scale,
  Compass,
  Circle,
  Award
} from 'lucide-react';
import {
  CircumcircleSvg,
  IncircleSvg,
  RightTriangleCirclesSvg
} from './TriangleLines1Figures';

interface TriangleLines1TheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const TriangleLines1Theory: React.FC<TriangleLines1TheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV HÁROMSZÖG KÖREI LABOR ÁLLAPOTOK ---
  const [triangleType, setTriangleType] = useState<'acute' | 'right' | 'obtuse'>('right');
  const [sideLegA, setSideLegA] = useState<number>(6); // Derékszögű esetén a befogó
  const [sideLegB, setSideLegB] = useState<number>(8); // Derékszögű esetén b befogó

  // Számítások derékszögű háromszögre
  const circleData = useMemo(() => {
    const c = Math.sqrt(sideLegA * sideLegA + sideLegB * sideLegB);
    const R = c / 2;
    const r = (sideLegA + sideLegB - c) / 2;
    const s = (sideLegA + sideLegB + c) / 2;
    const area = (sideLegA * sideLegB) / 2;

    return {
      c: Number(c.toFixed(2)),
      R: Number(R.toFixed(2)),
      r: Number(r.toFixed(2)),
      s: Number(s.toFixed(2)),
      area: Number(area.toFixed(2))
    };
  }, [sideLegA, sideLegB]);

  return (
    <TheoryTemplate
      title="7. A háromszög nevezetes vonalai és pontjai I."
      subtitle="Az oldalfelező merőlegesek és szögfelezők, a körülírt kör (O) és a beírt kör (I) középpontjainak tételei"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-nevezetes-vonalak-1"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • TANANYAG"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "FŐ SZABÁLYOK: OLDALFELEZŐK, SZÖGFELEZŐK ÉS KÖRÖK",
        description: "A háromszög köré és beírt körének legfontosabb összefüggései:",
        formula: "O: |OA|=|OB|=|OC|=R  |  I: d(I, a)=d(I, b)=d(I, c)=r",
        details: (
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-violet-600 dark:text-violet-400 font-black">Oldalfelező merőlegesek metszéspontja (O):</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">a köré írható kör középpontja (csúcsoktól egyenlő távol)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-600 dark:text-pink-400 font-black">Belső szögfelezők metszéspontja (I):</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">a beírt kör középpontja (oldalaktól egyenlő távol, mindig belül)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-black">Derékszögű háromszög körei:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">R = c / 2 (átfogó felezőpontja)  |  r = (a + b - c) / 2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Területi összefüggés:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">T = r · s  (ahol s = (a + b + c) / 2 a félkerület)</span>
            </div>
          </div>
        )
      }}
    >
      {/* =========================================================================
          1. SZEKCIÓ: AZ OLDALFELEZŐ MERŐLEGESEK ÉS A KÖRÜLÍRT KÖR
      ========================================================================= */}
      <TheorySection
        title="1. Az oldalfelező merőlegesek és a háromszög köré írható kör"
        icon={<Circle className="w-6 h-6 text-violet-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A háromszög oldalfelező merőlegesei az egyes oldalak felezőpontjába állított merőleges egyenesek ($f_a, f_b, f_c$).
            </p>
            <TheoryCallout
              title="Tétel az oldalfelező merőlegesekről"
              type="info"
            >
              A háromszög három oldalfelező merőlegese egyetlen pontban metszi egymást. Ez az $O$ pont a háromszög <strong>köré írható körének középpontja</strong>, mert mindhárom csúcstól egyenlő távolságra van:
              <div className="font-mono text-center font-bold text-violet-800 dark:text-violet-300 py-1">
                $|OA| = |OB| = |OC| = R$
              </div>
            </TheoryCallout>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-violet-50 rounded-lg border border-violet-200">
                <strong className="text-violet-900 block text-sm">Az O pont helyzete a háromszög típusától függően:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>Hegyesszögű háromszög:</strong> az $O$ pont a háromszögön <strong>belül</strong> van.</li>
                  <li><strong>Derékszögű háromszög:</strong> az $O$ pont pontosan az <strong>átfogó felezőpontja</strong> ($R = c / 2$, Thalész-tétel!).</li>
                  <li><strong>Tompaszögű háromszög:</strong> az $O$ pont a háromszögön <strong>kívül</strong> helyezkedik el.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <CircumcircleSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: A BELSŐ SZÖGFELEZŐK ÉS A BEÍRT KÖR
      ========================================================================= */}
      <TheorySection
        title="2. A belső szögfelezők és a háromszögbe írt kör"
        icon={<Compass className="w-6 h-6 text-pink-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A háromszög belső szögfelezői a csúcsokból induló, a belső szögeket felező félegyenesek ($w_\alpha, w_\beta, w_\gamma$).
            </p>
            <TheoryCallout
              title="Tétel a belső szögfelezőkről"
              type="tip"
            >
              A háromszög három belső szögfelezője egy pontban metszi egymást. Ez az $I$ pont a háromszögbe <strong>írt kör középpontja</strong>, mert mindhárom oldaltól egyenlő távolságra van:
              <div className="font-mono text-center font-bold text-pink-800 dark:text-pink-300 py-1">
                $d(I, a) = d(I, b) = d(I, c) = r$
              </div>
            </TheoryCallout>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-pink-50 rounded-lg border border-pink-200">
                <strong className="text-pink-900 block text-sm">Mindig belső pont:</strong>
                A beírt kör középpontja ($I$) kivétel nélkül <strong>minden háromszög esetén a háromszög belsejében</strong> található (sohasem eshet kívülre vagy oldalra!).
              </li>
              <li className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-900 block text-sm">A beírt kör sugara és a terület kapcsolata:</strong>
                Ha a háromszöget az $I$ pontból a csúcsokhoz húzott szakaszokkal három kis háromszögre bontjuk:
                <div className="font-mono mt-1 text-emerald-800 font-bold">
                  T = (a · r) / 2 + (b · r) / 2 + (c · r) / 2 = r · (a + b + c) / 2 = r · s  →  r = T / s
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <IncircleSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: DERÉKSZÖGŰ HÁROMSZÖG KÖREI
      ========================================================================= */}
      <TheorySection
        title="3. A derékszögű háromszög körei (nevezetes képletek)"
        icon={<Award className="w-6 h-6 text-blue-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Derékszögű háromszög esetén a körök sugaraira rendkívül elegáns, zárt algebrai képletek érvényesek:
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="font-bold text-blue-900 text-sm">1. Körülírt kör sugara:</div>
                <div className="font-mono text-base font-bold text-blue-700 mt-1">
                  R = c / 2
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  A Thalész-tétel szerint a derékszögű csúcs a körvonalon van, az átfogó pedig a kör átmérője.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="font-bold text-emerald-900 text-sm">2. Beírt kör sugara:</div>
                <div className="font-mono text-base font-bold text-emerald-700 mt-1">
                  r = (a + b - c) / 2
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Az érintőszakaszok tétele alapján a derékszögű csúcsnál lévő érintőszakasz pontosan r, a másik két csúcsból indulók pedig a - r és b - r. Mivel ezek összege c: (a - r) + (b - r) = c → r = (a + b - c) / 2.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <RightTriangleCirclesSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: A SZÖGFELEZŐ-TÉTEL
      ========================================================================= */}
      <TheorySection
        title="4. A szögfelező-tétel (oldalarányok a szemközti oldalon)"
        icon={<Scale className="w-6 h-6 text-amber-600" />}
      >
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            A belső szögfelező nemcsak a szöget felezi, hanem a szemközti oldalt is egy meghatározott arányban osztja:
          </p>
          <TheoryCallout
            title="A belső szögfelező tétele"
            type="info"
          >
            A háromszög belső szögfelezője a szemközti oldalt a szomszédos oldalak arányában osztja két szakaszra (x és y):
            <div className="font-mono text-center font-bold text-amber-800 dark:text-amber-300 py-1 text-base">
              x / y = b / c
            </div>
            <strong>Példa:</strong> Ha egy háromszög két szomszédos oldala b = 6 cm és c = 9 cm, a szemközti oldal hossza a = 10 cm, akkor a szögfelező ezt 2 : 3 arányban bontja: x = 4 cm és y = 6 cm.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV HÁROMSZÖG KÖREI LABOR (A TANANYAG VÉGÉN)
      ========================================================================= */}
      <TheoryCard
        title="Interaktív Háromszög Körei Laboratórium"
        icon={<Sliders className="w-6 h-6 text-violet-600" />}
      >
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-sm">
            Állítsd be a derékszögű háromszög $a$ és $b$ befogóját a csúszkákkal! Figyeld meg a körülírt kör sugarának ($R = c/2$) és a beírt kör sugarának ($r = (a + b - c)/2$) valós idejű alakulását!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            {/* Bal: Csúszkák és számítások */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-blue-700 dark:text-blue-400">a befogó hossza:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{sideLegA} cm</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="1"
                  value={sideLegA}
                  onChange={(e) => setSideLegA(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="text-indigo-700 dark:text-indigo-400">b befogó hossza:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{sideLegB} cm</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="1"
                  value={sideLegB}
                  onChange={(e) => setSideLegB(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Kiértékelés kártya */}
              <div className="p-4 rounded-xl border bg-violet-50/70 border-violet-200 text-slate-800 space-y-2 text-xs">
                <div className="font-bold text-violet-900 border-b border-violet-200 pb-1">
                  Számított értékek (Pitagorasz + Körtételek):
                </div>
                <div className="font-mono space-y-1">
                  <div>• Átfogó: c = √({sideLegA}² + {sideLegB}²) = <strong>{circleData.c} cm</strong></div>
                  <div className="text-blue-700 font-bold">• Körülírt kör sugara: R = c / 2 = <strong>{circleData.R} cm</strong></div>
                  <div className="text-emerald-700 font-bold">• Beírt kör sugara: r = (a + b - c) / 2 = <strong>{circleData.r} cm</strong></div>
                  <div className="pt-1 text-slate-600 border-t border-violet-200">
                    Terület: T = {circleData.area} cm² | Félkerület: s = {circleData.s} cm (r · s = {circleData.area})
                  </div>
                </div>
              </div>
            </div>

            {/* Jobb: Dinamikus SVG illusztráció */}
            <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[200px]">
              <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto select-none">
                {(() => {
                  const maxSide = Math.max(sideLegA, sideLegB);
                  const scale = 100 / maxSide;
                  const w = sideLegA * scale;
                  const h = sideLegB * scale;
                  const cx = 40;
                  const cy = 150;
                  const rPx = circleData.r * scale;

                  return (
                    <g>
                      {/* Háromszög */}
                      <polygon points={`${cx},${cy} ${cx + w},${cy} ${cx},${cy - h}`} fill="rgba(124, 58, 237, 0.08)" stroke="#7c3aed" strokeWidth="2.5" />

                      {/* Magyar derékszög a csúcsban: negyedkörív ponttal */}
                      <path d={`M ${cx} ${cy - 12} A 12 12 0 0 1 ${cx + 12} ${cy}`} fill="none" stroke="#7c3aed" strokeWidth="1.2" />
                      <circle cx={cx + 4} cy={cy - 4} r="1.2" fill="#7c3aed" />

                      {/* Körülírt kör felezőpontja (O) az átfogón */}
                      <circle cx={cx + w / 2} cy={cy - h / 2} r="3.5" fill="#2563eb" />
                      <text x={cx + w / 2 + 8} y={cy - h / 2 - 4} fontSize="9" fontWeight="bold" fill="#2563eb">O (R={circleData.R})</text>

                      {/* Beírt kör */}
                      <circle cx={cx + rPx} cy={cy - rPx} r={rPx} fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
                      <circle cx={cx + rPx} cy={cy - rPx} r="2.5" fill="#047857" />
                      <text x={cx + rPx - 3} y={cy - rPx - 5} fontSize="9" fontWeight="bold" fill="#047857">I (r={circleData.r})</text>
                    </g>
                  );
                })()}
              </svg>
              <div className="text-[11px] text-slate-500 mt-2 text-center">
                Magyar derékszög-jelölés a befogók csúcsánál
              </div>
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS BUKTATÓK
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus buktatók a háromszög nevezetes pontjainál"
        traps={[
          {
            trap: "A beírt kör és a körülírt kör középpontjának felcserélése",
            correction: "A CSÚCSOKTÓL az OLDALFELEZŐK (O - körülírt kör) vannak egyenlő távol! Az OLDALAKTÓL pedig a SZÖGFELEZŐK (I - beírt kör) vannak egyenlő távol!",
            severity: "critical"
          },
          {
            trap: "Azt hiszik, az O pont mindig a háromszögön belül van",
            correction: "Csak hegyesszögű háromszögnél esik belülre! Derékszögűnél az átfogó felezőpontja, tompaszögűnél pedig a háromszögön KÍVÜLRE esik!",
            severity: "critical"
          },
          {
            trap: "Szögfelező és oldalfelező összekeverése",
            correction: "Általános háromszögben a szögfelező NEM a szemközti oldal felezőpontjába fut, hanem az oldalarányok szerint osztja azt! Csak egyenlő szárú háromszög alapjánál esik egybe a két vonal.",
            severity: "moderate"
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryTable
        title="A nevezetes vonalak és pontok összehasonlítása"
        headers={['Nevezetes vonal', 'Metszéspont (neve)', 'Egyenlő távolságra van', 'Elhelyezkedés']}
        rows={[
          ['Oldalfelező merőlegesek', 'Körülírt kör középpontja (O)', 'A háromszög mindhárom CSÚCSÁTÓL (|OA|=|OB|=|OC|=R)', 'Hegyesnél belül, deréknál átfogón, tompánál kívül'],
          ['Belső szögfelezők', 'Beírt kör középpontja (I)', 'A háromszög mindhárom OLDALÁTÓL (d=r)', 'MINDIG a háromszögön belül'],
          ['Derékszögű háromszög', 'O: átfogó felezőpontja', 'R = c / 2', 'Átfogó közepe'],
          ['Derékszögű háromszög', 'I: r sugár', 'r = (a + b - c) / 2', 'Belső pont']
        ]}
      />
    </TheoryTemplate>
  );
};

