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
  PropertiesChecklistSvg,
  ParitySymmetrySvg,
  BoundednessSvg
} from './CharacterizationFigures';
import {
  TrendingUp,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Compass,
  ArrowRight,
  Calculator,
  Scale,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CharacterizationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type FunctionPreset = 'linear' | 'abs' | 'quadratic' | 'hyperbola' | 'constant';

export const CharacterizationTheory: React.FC<CharacterizationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV FÜGGVÉNYJELLEMZŐ LABOR ---
  const [selectedPreset, setSelectedPreset] = useState<FunctionPreset>('abs');

  const presetData = useMemo(() => {
    switch (selectedPreset) {
      case 'linear':
        return {
          title: 'f(x) = 2x - 4',
          type: 'Lineáris függvény',
          domain: 'D_f = ℝ',
          range: 'R_f = ℝ',
          zeros: 'x₀ = 2 (egy zérushely)',
          monotonicity: 'A teljes D_f halmazon szigorúan monoton növekvő',
          parity: 'Sem páros, sem páratlan (nem szimmetrikus a tengelyre/origóra)',
          boundedness: 'Nem korlátos (sem alulról, sem felülről)',
          color: '#2563eb'
        };
      case 'abs':
        return {
          title: 'f(x) = |x - 2| - 3',
          type: 'Abszolútérték-függvény',
          domain: 'D_f = ℝ',
          range: 'R_f = [-3; +∞[',
          zeros: 'x₁ = -1, x₂ = 5 (két zérushely)',
          monotonicity: ']-∞; 2] intervallumon szig. csökkenő, [2; +∞[ intervallumon szig. növekvő',
          parity: 'Sem páros, sem páratlan (az eltolt csúcs C(2; -3) miatt nincs tengely/origó szimmetria)',
          boundedness: 'Alulról korlátos (legkisebb értéke -3), felülről nem korlátos',
          color: '#e11d48'
        };
      case 'quadratic':
        return {
          title: 'f(x) = x² - 4',
          type: 'Másodfokú függvény (parabola)',
          domain: 'D_f = ℝ',
          range: 'R_f = [-4; +∞[',
          zeros: 'x₁ = -2, x₂ = 2',
          monotonicity: ']-∞; 0] intervallumon szig. csökkenő, [0; +∞[ intervallumon szig. növekvő',
          parity: 'PÁROS függvény: f(-x) = (-x)² - 4 = x² - 4 = f(x) (y-tengelyre tükrös)',
          boundedness: 'Alulról korlátos (alsó korlát: -4), felülről nem korlátos',
          color: '#7c3aed'
        };
      case 'hyperbola':
        return {
          title: 'f(x) = 4 / x',
          type: 'Fordított arányosság (hiperbola)',
          domain: 'D_f = ℝ \\ {0}',
          range: 'R_f = ℝ \\ {0}',
          zeros: 'Nincs zérushely (a számláló 4 ≠ 0)',
          monotonicity: 'A ]-∞; 0[ és ]0; +∞[ nyílt intervallumokon szakaszonként szig. csökkenő',
          parity: 'PÁRATLAN függvény: f(-x) = 4/(-x) = -4/x = -f(x) (origóra középpontosan tükrös)',
          boundedness: 'Nem korlátos sem alulról, sem felülről',
          color: '#0d9488'
        };
      case 'constant':
        return {
          title: 'f(x) = 3',
          type: 'Konstans függvény',
          domain: 'D_f = ℝ',
          range: 'R_f = {3} (egyelemű halmaz)',
          zeros: 'Nincs zérushely (3 sosem 0)',
          monotonicity: 'Konstans (állandó, tágabb értelemben monoton nő és monoton csökken is)',
          parity: 'PÁROS függvény: f(-x) = 3 = f(x) (y-tengelyre tükrös)',
          boundedness: 'KORLÁTOS (mindkét oldalról: k = 3, K = 3)',
          color: '#d97706'
        };
    }
  }, [selectedPreset]);

  // SVG koordináta transzformáció (320x240, origó 160, 120, 1 egység = 20px)
  const toSvgX = (x: number) => 160 + x * 20;
  const toSvgY = (y: number) => 120 - y * 20;

  return (
    <TheoryTemplate
      title="11. Függvények jellemzése"
      subtitle="A függvények átfogó vizsgálata 6 alapvető szempont szerint: értelmezési tartomány, értékkészlet, zérushely, monotonitás, paritás és korlátosság."
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      estimatedTime="25-30 perc"
      quickRule={{
        label: "A függvényvizsgálat 6 alapszempontja",
        formula: "1. Értelmezési tartomány (D_f) | 2. Értékkészlet (R_f) | 3. Zérushely | 4. Monotonitás | 5. Paritás | 6. Korlátosság",
        align: "right"
      }}
    >
      {/* 1. SZEKCIÓ: A 6 SZEMPONTÚ VIZSGÁLATI KERETRENDSZER */}
      <TheorySection
        title="A függvényvizsgálat szempontrendszere"
        subtitle="Mi az a 6 alaptulajdonság, amely teljes körűen leírja bármelyik függvényt?"
        icon={<BookOpen className="w-6 h-6 text-teal-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-slate-700 leading-relaxed text-xs">
            <p className="text-sm">
              Egy függvény pontos megismeréséhez nem elég a képletét tudni; szisztematikusan fel kell térképeznünk viselkedését az alábbi <strong>6 szempont</strong> mentén:
            </p>
            <ol className="list-decimal pl-4 space-y-1.5 text-slate-800">
              <li><strong>Értelmezési tartomány (D_f):</strong> Milyen x értékek helyettesíthetők be?</li>
              <li><strong>Értékkészlet (R_f):</strong> Milyen y értékeket vesz fel a függvény?</li>
              <li><strong>Zérushelyek (x₀):</strong> Hol metszi az x tengelyt (f(x) = 0)?</li>
              <li><strong>Menet (Monotonitás):</strong> Hol növekszik és hol csökken a függvényérték?</li>
              <li><strong>Paritás (Szimmetria):</strong> Páros (y-tengely), páratlan (origó) vagy semmilyen?</li>
              <li><strong>Korlátosság:</strong> Korlátos-e alulról, felülről, vagy mindkét oldalról?</li>
            </ol>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <PropertiesChecklistSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              A 6 alapvető jellemzési szempont
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: INTERAKTÍV FÜGGVÉNYJELLEMZŐ LABOR */}
      <TheorySection
        title="Interaktív Függvényjellemző Labor"
        subtitle="Válassz ki egy függvénytípust, és vizsgáld meg a teljes, 6 szempontú jellemzését a grafikon mellett!"
        icon={<Sliders className="w-6 h-6 text-teal-500" />}
      >
        <div className="bg-gradient-to-br from-teal-50/40 via-white to-blue-50/40 p-6 rounded-2xl border border-teal-100 shadow-sm space-y-6">
          {/* Típusválasztó gombok */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'abs', label: '1. Abszolútérték: |x - 2| - 3' },
              { id: 'linear', label: '2. Lineáris: 2x - 4' },
              { id: 'quadratic', label: '3. Parabola: x² - 4' },
              { id: 'hyperbola', label: '4. Hiperbola: 4/x' },
              { id: 'constant', label: '5. Konstans: 3' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPreset(item.id as FunctionPreset)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  selectedPreset === item.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Vizualizáció + Elemző kártya */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG grafikon */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-inner">
              <svg
                width={320}
                height={240}
                viewBox="0 0 320 240"
                className="select-none bg-slate-50 rounded-lg"
              >
                {/* Rács */}
                {[-6, -4, -2, 2, 4, 6].map((i) => (
                  <line key={`jx-${i}`} x1={toSvgX(i)} y1={10} x2={toSvgX(i)} y2={230} stroke="#e2e8f0" strokeWidth="1" />
                ))}
                {[-4, -2, 2, 4].map((i) => (
                  <line key={`jy-${i}`} x1={20} y1={toSvgY(i)} x2={300} y2={toSvgY(i)} stroke="#e2e8f0" strokeWidth="1" />
                ))}

                {/* Főtengelyek */}
                <line x1={20} y1={120} x2={300} y2={120} stroke="#475569" strokeWidth="2" />
                <line x1={160} y1={10} x2={160} y2={230} stroke="#475569" strokeWidth="2" />
                <text x={295} y={115} fill="#475569" fontSize="11" fontWeight="bold">x</text>
                <text x={166} y={20} fill="#475569" fontSize="11" fontWeight="bold">y</text>
                <text x={164} y={134} fill="#94a3b8" fontSize="10">0</text>

                {/* Görbe rajzolása az aktív preset szerint */}
                {selectedPreset === 'linear' && (
                  <line x1={toSvgX(-2)} y1={toSvgY(2 * -2 - 4)} x2={toSvgX(5)} y2={toSvgY(2 * 5 - 4)} stroke={presetData.color} strokeWidth="3" />
                )}
                {selectedPreset === 'abs' && (
                  <>
                    <line x1={toSvgX(-4)} y1={toSvgY(Math.abs(-4 - 2) - 3)} x2={toSvgX(2)} y2={toSvgY(-3)} stroke={presetData.color} strokeWidth="3" />
                    <line x1={toSvgX(2)} y1={toSvgY(-3)} x2={toSvgX(6)} y2={toSvgY(Math.abs(6 - 2) - 3)} stroke={presetData.color} strokeWidth="3" />
                    <circle cx={toSvgX(2)} cy={toSvgY(-3)} r={5} fill={presetData.color} stroke="#ffffff" strokeWidth="1.5" />
                  </>
                )}
                {selectedPreset === 'quadratic' && (
                  <path
                    d={`M ${toSvgX(-3.1)} ${toSvgY(9.6 - 4)} Q ${toSvgX(0)} ${toSvgY(-5.5)} ${toSvgX(3.1)} ${toSvgY(9.6 - 4)}`}
                    fill="none"
                    stroke={presetData.color}
                    strokeWidth="3"
                  />
                )}
                {selectedPreset === 'hyperbola' && (
                  <>
                    <path d={`M ${toSvgX(0.7)} ${toSvgY(5.5)} Q ${toSvgX(2)} ${toSvgY(2)} ${toSvgX(5.5)} ${toSvgY(0.7)}`} fill="none" stroke={presetData.color} strokeWidth="3" />
                    <path d={`M ${toSvgX(-5.5)} ${toSvgY(-0.7)} Q ${toSvgX(-2)} ${toSvgY(-2)} ${toSvgX(-0.7)} ${toSvgY(-5.5)}`} fill="none" stroke={presetData.color} strokeWidth="3" />
                  </>
                )}
                {selectedPreset === 'constant' && (
                  <line x1={toSvgX(-6)} y1={toSvgY(3)} x2={toSvgX(6)} y2={toSvgY(3)} stroke={presetData.color} strokeWidth="3" />
                )}
              </svg>
              <span className="text-xs font-bold text-slate-700 mt-2 font-mono">
                {presetData.title} &nbsp;({presetData.type})
              </span>
            </div>

            {/* 6 szempontú jellemzés kártya */}
            <div className="lg:col-span-6 space-y-2 bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-xs">
              <span className="font-bold text-teal-800 uppercase tracking-wider block text-xs border-b pb-1">
                A 6 Szempontú Teljes Jellemzés:
              </span>
              <div className="space-y-1.5 pt-1 text-slate-700">
                <p><strong>1. Értelmezési tartomány:</strong> <code className="font-mono font-bold text-teal-700">{presetData.domain}</code></p>
                <p><strong>2. Értékkészlet:</strong> <code className="font-mono font-bold text-teal-700">{presetData.range}</code></p>
                <p><strong>3. Zérushely:</strong> <code className="font-mono font-bold text-amber-700">{presetData.zeros}</code></p>
                <p><strong>4. Monotonitás:</strong> <span className="text-slate-800">{presetData.monotonicity}</span></p>
                <p><strong>5. Paritás:</strong> <span className="text-slate-800 font-medium">{presetData.parity}</span></p>
                <p><strong>6. Korlátosság:</strong> <span className="text-slate-800 font-medium">{presetData.boundedness}</span></p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: PARITÁS - PÁROS ÉS PÁRATLAN SZIMMETRIA */}
      <TheorySection
        title="Paritás: Páros és Páratlan függvények"
        subtitle="Milyen szimmetriát mutat a grafikon az y-tengelyre és az origóra nézve?"
        icon={<Scale className="w-6 h-6 text-teal-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-slate-700 leading-relaxed text-xs">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg space-y-1">
              <strong className="text-teal-900 text-sm block">Páros függvény (y-tengelyes tükrözés)</strong>
              <p className="font-mono font-bold text-teal-800">f(-x) = f(x) minden x ∈ D_f esetén</p>
              <p>
                A grafikon tükrös a függőleges y-tengelyre: a jobb oldali szár pontos tükörképe a bal oldalnak.
                <br />
                <em>Példák:</em> <code className="font-bold">f(x) = x²</code>, <code className="font-bold">f(x) = |x|</code>, konstans függvények.
              </p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg space-y-1">
              <strong className="text-purple-900 text-sm block">Páratlan függvény (origóra középpontos szimmetria)</strong>
              <p className="font-mono font-bold text-purple-800">f(-x) = -f(x) minden x ∈ D_f esetén</p>
              <p>
                A grafikon 180 fokkal elforgatva az origó körül önmagába megy át.
                <br />
                <em>Példák:</em> <code className="font-bold">f(x) = x</code>, <code className="font-bold">f(x) = x³</code>, <code className="font-bold">f(x) = 1/x</code>.
              </p>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Figyelem: A legtöbb függvény se nem páros, se nem páratlan (pl. f(x) = 2x - 3)! A paritás kivételes szimmetria.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <ParitySymmetrySvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Páros (y-tengely) vs Páratlan (origó) szimmetria
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: KORLÁTOSSÁG FOGALMA */}
      <TheorySection
        title="Korlátosság: Alsó és Felső korlát"
        subtitle="Vannak-e olyan vízszintes egyenesek, amelyek alatt vagy felett nem lép ki a grafikon?"
        icon={<Sparkles className="w-6 h-6 text-teal-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-slate-700 leading-relaxed text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <strong className="text-blue-900 block mb-0.5">1. Alulról korlátos</strong>
              Létezik olyan <code className="font-bold">k</code> valós szám, amelynél a függvény egyetlen értéke sem kisebb: <code className="font-mono font-bold">f(x) ≥ k</code>.
              <br />
              <em>Példa:</em> <code className="font-bold">f(x) = x²</code> (alsó korlát k = 0, R_f = [0; +∞[).
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <strong className="text-rose-900 block mb-0.5">2. Felülről korlátos</strong>
              Létezik olyan <code className="font-bold">K</code> valós szám, amelynél a függvény egyetlen értéke sem nagyobb: <code className="font-mono font-bold">f(x) ≤ K</code>.
              <br />
              <em>Példa:</em> <code className="font-bold">f(x) = -|x| + 5</code> (felső korlát K = 5).
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <strong className="text-emerald-900 block mb-0.5">3. Korlátos függvény</strong>
              Egyszerre alulról és felülről is korlátos: <code className="font-mono font-bold">k ≤ f(x) ≤ K</code>. A grafikon egy vízszintes sávba zárható.
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <BoundednessSvg size={280} />
            <span className="text-xs text-slate-500 mt-2 text-center">
              Alsó és felső korlát közötti korlátos sáv
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYAKORI TÉVEDÉSEK */}
      <TheorySection
        title="Gyakori tévedések és buktatók"
        subtitle="Figyelj ezekre a jellemzési feladatok megoldásakor!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. 'Nem páros' nem jelent páratlant!"
            trap="Ha egy függvényről belátjuk, hogy nem páros, azonnal rávágjuk, hogy páratlan."
            solution="A paritás nem olyan, mint a számok párossága! A legtöbb függvény SEM páros, SEM páratlan (pl. f(x) = 2x + 1)."
          />
          <TheoryTrapBox
            title="2. Df és Rf tengelyeinek felcserélése"
            trap="Az értelmezési tartományt az y tengelyről, az értékkészletet az x tengelyről olvassuk le."
            solution="D_f MINDIG a vízszintes x tengely vetülete (bemenet), míg R_f a függőleges y tengely vetülete (kimenet)!"
          />
          <TheoryTrapBox
            title="3. Monotonitási intervallumok zárójelei"
            trap="A parabolánál azt írjuk, hogy ]-∞; +∞[ intervallumon monoton növekvő."
            solution="A parabola x = 0-ig csökken, majd onnan növekszik! A két szakaszt külön kell leírni: ]-∞; 0] és [0; +∞[."
          />
          <TheoryTrapBox
            title="4. Korlát vs. Szélsőérték"
            trap="Azt gondoljuk, hogy a korlátnak muszáj megegyeznie a szélsőértékkel."
            solution="A szélsőértéket a függvény felveszi (minimum/maximum). Egy alsó korlát lehet bármilyen szám a függvény alatt (pl. f(x)=x²-re -10 is érvényes alsó korlát)."
          />
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        title="Függvénytípusok jellemzési összehasonlítása"
        subtitle="A 9. osztályban tanult alapfüggvények tulajdonságai"
        icon={<Lightbulb className="w-6 h-6 text-teal-500" />}
      >
        <TheoryTable
          headers={['Függvény', 'Df', 'Rf', 'Zérushely', 'Paritás', 'Korlátosság']}
          rows={[
            ['f(x) = x (főátló)', 'ℝ', 'ℝ', 'x₀ = 0', 'PÁRATLAN', 'Nem korlátos'],
            ['f(x) = |x| (abszolútérték)', 'ℝ', '[0; +∞[', 'x₀ = 0', 'PÁROS', 'Alulról korlátos (k=0)'],
            ['f(x) = x² (parabola)', 'ℝ', '[0; +∞[', 'x₀ = 0', 'PÁROS', 'Alulról korlátos (k=0)'],
            ['f(x) = 1/x (hiperbola)', 'ℝ \\ {0}', 'ℝ \\ {0}', 'Nincs', 'PÁRATLAN', 'Nem korlátos'],
            ['f(x) = c (konstans)', 'ℝ', '{c}', 'Nincs (ha c≠0)', 'PÁROS', 'KORLÁTOS (k=c, K=c)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

