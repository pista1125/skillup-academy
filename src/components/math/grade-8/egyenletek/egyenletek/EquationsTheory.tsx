import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Scale,
  Calculator,
  Equal,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Zap,
  ShieldCheck,
  Split,
  Layers
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface EquationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const EquationsTheory: React.FC<EquationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive equation balance simulator state: 4x + 6 = 2x + 16
  const [leftX, setLeftX] = useState<number>(4);
  const [leftC, setLeftC] = useState<number>(6);
  const [rightX, setRightX] = useState<number>(2);
  const [rightC, setRightC] = useState<number>(16);
  const [history, setHistory] = useState<string[]>(['Kezdő állapot: 4x + 6 = 2x + 16']);

  const handleSubtract2X = () => {
    if (leftX >= 2 && rightX >= 2) {
      setLeftX(prev => prev - 2);
      setRightX(prev => prev - 2);
      setHistory(prev => [...prev, 'Mindkét oldalból kivonunk 2x-et (-2x)']);
    }
  };

  const handleSubtract6 = () => {
    if (leftC >= 6 && rightC >= 6) {
      setLeftC(prev => prev - 6);
      setRightC(prev => prev - 6);
      setHistory(prev => [...prev, 'Mindkét oldalból kivonunk 6-ot (-6)']);
    }
  };

  const handleDivide2 = () => {
    if (leftX === 2 && rightX === 0 && leftC === 0) {
      setLeftX(1);
      setRightC(prev => prev / 2);
      setHistory(prev => [...prev, 'Mindkét oldalt elosztjuk 2-vel (:2) -> x = ' + (rightC / 2)]);
    }
  };

  const resetSimulator = () => {
    setLeftX(4);
    setLeftC(6);
    setRightX(2);
    setRightC(16);
    setHistory(['Kezdő állapot: 4x + 6 = 2x + 16']);
  };

  const isSolved = leftX === 1 && rightX === 0 && leftC === 0;

  return (
    <TheoryTemplate
      title="Elsőfokú és Törtes Egyenletek Megoldása"
      subtitle="A mérlegelv precíz alkalmazása, zárójelbontás, közös nevező, értelmezési tartomány és ellenőrzés a 8. osztályban"
      badgeText="8. OSZTÁLY • III. EGYENLETEK • 💡 TANANYAG"
      pdfFilename="8_osztaly_egyenletek_tananyag.pdf"
      themeColor="purple"
      quickRule={{
        label: "A Mérlegelv Alaptörvénye",
        formula: "B = J ⟺ B ± c = J ± c  és  B · c = J · c  (c ≠ 0)"
      }}
      practiceTitle="Készen állsz az egyenletmegoldó feladványokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses, 3 nehézségi szintű interaktív kvízben levezetésekkel és magyarázatokkal!"
      practiceButtonText="Egyenletek Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. Szekció: Alapfogalmak */}
      <TheorySection
        number={1}
        title="Az Egyenlet Alapfogalmai: Alaphalmaz, Értelmezési Tartomány és Gyök"
        icon={<Equal className="w-5 h-5 text-purple-600" />}
        badge="Alapok"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <TheoryCard
            title="Mi az egyenlet?"
            badge="Definíció"
            badgeColor="purple"
            variant="highlight"
            icon={<Equal className="w-4 h-4 text-purple-600" />}
          >
            <p>
              Az <strong>egyenlet</strong> két algebrai kifejezés egyenlőségét állítja, amelyben legalább egy ismeretlen változó (leggyakrabban <MathText>x</MathText>) szerepel.
            </p>
            <div className="p-2 rounded-xl bg-purple-100/60 dark:bg-purple-950/40 text-center font-mono font-bold text-xs">
              <MathText>Bal oldal = Jobb oldal (B = J)</MathText>
            </div>
            <p className="text-[11px] text-slate-500">
              A feladat olyan értékek felkutatása, amelyekre az egyenlőség igaz kijelentéssé válik.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Alaphalmaz és Értelmezési Tartomány"
            badge="Fontos!"
            badgeColor="blue"
            variant="formula"
            icon={<ShieldCheck className="w-4 h-4 text-blue-600" />}
          >
            <p>
              <strong>Alaphalmaz (<MathText>A</MathText>):</strong> az a számhalmaz, amelyen a megoldást keressük (pl. <MathText>ℕ, ℤ, ℚ, ℝ</MathText>).
            </p>
            <p>
              <strong>Értelmezési tartomány (<MathText>É.T.</MathText>):</strong> az alaphalmaz azon részhalmaza, amelyre az egyenletben szereplő műveletek elvégezhetők.
            </p>
            <div className="p-2 rounded-xl bg-blue-100/60 dark:bg-blue-950/40 text-center font-bold text-xs text-blue-900 dark:text-blue-200">
              Törtes nevező esetén: <MathText>Nevező ≠ 0</MathText>!
            </div>
          </TheoryCard>

          <TheoryCard
            title="Megoldáshalmaz és Gyök"
            badge="Kimenetel"
            badgeColor="emerald"
            variant="example"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          >
            <p>
              <strong>Gyök (megoldás):</strong> az az érték, amelyet az ismeretlen helyére helyettesítve a bal és jobb oldal számszerűen egyenlő lesz.
            </p>
            <p>
              <strong>Igazsághalmaz (<MathText>M</MathText>):</strong> a gyökök összessége. Lehetséges esetek:
            </p>
            <ul className="list-disc pl-4 text-xs space-y-1">
              <li>Pontosan 1 megoldás (pl. <MathText>M = {"{5}"}</MathText>)</li>
              <li>Nincs megoldás: üres halmaz (<MathText>M = ∅</MathText>)</li>
              <li>Végtelen sok megoldás (azonosság: <MathText>M = É.T.</MathText>)</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: Mérlegelv Szimulátor */}
      <TheorySection
        number={2}
        title="A Mérlegelv Működése – Interaktív Egyenletszimulátor"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
        badge="Szimulátor"
        badgeColor="indigo"
      >
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 dark:from-slate-900 dark:to-slate-850 p-5 sm:p-6 rounded-3xl border-2 border-indigo-200/90 dark:border-indigo-800/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-indigo-100 dark:border-indigo-800/60 pb-3">
            <div>
              <span className="text-[11px] font-black uppercase text-indigo-700 dark:text-indigo-300 tracking-wider">
                Vizuális Mérlegelv Demonstráció
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Oldd meg a kétkarú mérlegen: <MathText>4x + 6 = 2x + 16</MathText>
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetSimulator}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Alaphelyzet
            </Button>
          </div>

          {/* Vizuális Mérleg Rajz */}
          <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 shadow-2xs">
            <div className="w-full max-w-lg flex items-end justify-between gap-4 py-2">
              {/* Bal Kar Serpenyő */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-300 dark:border-indigo-700 min-h-[90px] justify-center transition-all">
                <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-1">Bal oldal</div>
                <div className="flex flex-wrap gap-1.5 items-center justify-center">
                  {Array.from({ length: leftX }).map((_, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs shadow-2xs">
                      x
                    </span>
                  ))}
                  {leftC > 0 && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-white font-mono font-bold text-xs shadow-2xs">
                      +{leftC}
                    </span>
                  )}
                  {leftX === 0 && leftC === 0 && (
                    <span className="text-xs text-slate-400 font-bold">0</span>
                  )}
                </div>
                <div className="mt-2 text-xs font-black text-slate-800 dark:text-slate-100 font-mono">
                  {leftX > 0 ? `${leftX}x` : ''} {leftC > 0 ? (leftX > 0 ? `+ ${leftC}` : `${leftC}`) : (leftX === 0 ? '0' : '')}
                </div>
              </div>

              {/* Mérleg Középcsapágy */}
              <div className="flex flex-col items-center justify-center px-2">
                <div className="w-12 h-1 bg-slate-400 dark:bg-slate-600 rounded-full mb-1"></div>
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-slate-700 dark:border-b-slate-300"></div>
                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-1">=</span>
              </div>

              {/* Jobb Kar Serpenyő */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border-2 border-purple-300 dark:border-purple-700 min-h-[90px] justify-center transition-all">
                <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400 mb-1">Jobb oldal</div>
                <div className="flex flex-wrap gap-1.5 items-center justify-center">
                  {Array.from({ length: rightX }).map((_, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-purple-600 text-white font-mono font-bold text-xs shadow-2xs">
                      x
                    </span>
                  ))}
                  {rightC > 0 && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-white font-mono font-bold text-xs shadow-2xs">
                      +{rightC}
                    </span>
                  )}
                  {rightX === 0 && rightC === 0 && (
                    <span className="text-xs text-slate-400 font-bold">0</span>
                  )}
                </div>
                <div className="mt-2 text-xs font-black text-slate-800 dark:text-slate-100 font-mono">
                  {rightX > 0 ? `${rightX}x` : ''} {rightC > 0 ? (rightX > 0 ? `+ ${rightC}` : `${rightC}`) : (rightX === 0 ? '0' : '')}
                </div>
              </div>
            </div>

            {/* Siker Banner */}
            {isSolved && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-900 dark:text-emerald-200 text-center font-bold text-sm flex items-center justify-center gap-2 animate-in zoom-in-95">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Bravó! Kifejezted az ismeretlent: <MathText>x = 5</MathText>!</span>
              </div>
            )}
          </div>

          {/* Lépések Vezérlő Gombjai */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Válassz mérlegelvi lépést:</div>
            <div className="flex flex-wrap gap-2.5">
              <Button
                size="sm"
                onClick={handleSubtract2X}
                disabled={rightX === 0}
                className="rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs"
              >
                1. Lépés: Mindkét oldalból kivonunk 2x-et (-2x)
              </Button>

              <Button
                size="sm"
                onClick={handleSubtract6}
                disabled={leftC === 0 || rightX > 0}
                className="rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-2xs"
              >
                2. Lépés: Mindkét oldalból kivonunk 6-ot (-6)
              </Button>

              <Button
                size="sm"
                onClick={handleDivide2}
                disabled={leftX !== 2 || leftC !== 0}
                className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
              >
                3. Lépés: Mindkét oldalt elosztjuk 2-vel (: 2)
              </Button>
            </div>
          </div>

          {/* Napló */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <div className="font-bold text-slate-500 uppercase text-[10px]">Alkalmazott lépések naplója:</div>
            {history.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono">
                <ArrowRight className="w-3 h-3 text-indigo-500 shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: A 8 Lépéses Mester-Algoritmus */}
      <TheorySection
        number={3}
        title="Az Egyenletmegoldás 8 Lépéses Mester-Algoritmusa"
        icon={<Calculator className="w-5 h-5 text-blue-600" />}
        badge="Módszertan"
        badgeColor="blue"
      >
        <TheoryCard
          title="A biztos módszer: hogyan haladj lépésről lépésre bármely egyenletnél?"
          badge="Útmutató"
          badgeColor="blue"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20">
                <div className="font-black text-xs text-purple-700 dark:text-purple-300">1. Kikötés (É.T.)</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Ha a nevezőben van <MathText>x</MathText>, a nevező nem lehet 0!
                </p>
              </div>

              <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20">
                <div className="font-black text-xs text-blue-700 dark:text-blue-300">2. Közös nevező</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Szorozd meg <strong>minden tagot</strong> a nevezők legkisebb közös többszörösével!
                </p>
              </div>

              <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20">
                <div className="font-black text-xs text-indigo-700 dark:text-indigo-300">3. Zárójelbontás</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Bontsd fel a zárójeleket beszorzással, fokozottan figyelve az előjelekre!
                </p>
              </div>

              <div className="p-3 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50/40 dark:bg-cyan-950/20">
                <div className="font-black text-xs text-cyan-700 dark:text-cyan-300">4. Összevonás</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Mindkét oldalon külön-külön vond össze az egynemű tagokat!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/40 dark:bg-teal-950/20">
                <div className="font-black text-xs text-teal-700 dark:text-teal-300">5. Rendezés mérlegelvvel</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Ismeretlenek az egyik oldalra, tiszta számok a másik oldalra rendezése.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20">
                <div className="font-black text-xs text-emerald-700 dark:text-emerald-300">6. Együtthatóval osztás</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Oszd el mindkét oldalt <MathText>x</MathText> együtthatójával: <MathText>x = …</MathText>
                </p>
              </div>

              <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20">
                <div className="font-black text-xs text-amber-700 dark:text-amber-300">7. Kikötés-összevetés</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Ellenőrizd: benne van-e a kapott szám az Értelmezési Tartományban?
                </p>
              </div>

              <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/40 dark:bg-rose-950/20">
                <div className="font-black text-xs text-rose-700 dark:text-rose-300">8. Ellenőrzés</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Helyettesítsd be a gyököt az <strong>eredeti</strong> bal és jobb oldalba!
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szekció: Zárójeles és Törtes Egyenletek Mintapéldái */}
      <TheorySection
        number={4}
        title="Részletesen Kidolgozott Mintapéldák a Tankönyvből"
        icon={<Layers className="w-5 h-5 text-emerald-600" />}
        badge="Mintapéldák"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Mintapélda: Zárójeles */}
          <TheoryCard
            title="1. Mintapélda: Többszörös Zárójeles Egyenlet"
            badge="Zárójelbontás"
            badgeColor="purple"
            variant="highlight"
          >
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 font-mono font-bold text-center">
                <MathText>4(2x - 3) - 2(x + 5) = 3(x - 2) + 8</MathText>
              </div>
              <div className="space-y-1 font-mono text-[12px] bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                <div>1. Zárójelbontás:</div>
                <div className="pl-3 text-indigo-600 dark:text-indigo-400">8x - 12 - 2x - 10 = 3x - 6 + 8</div>
                <div>2. Összevonás mindkét oldalon:</div>
                <div className="pl-3 text-indigo-600 dark:text-indigo-400">6x - 22 = 3x + 2</div>
                <div>3. Mérlegelv: mindkét oldalból kivonunk 3x-et (/ - 3x):</div>
                <div className="pl-3 text-indigo-600 dark:text-indigo-400">3x - 22 = 2</div>
                <div>4. Mérlegelv: hozzáadunk 22-t (/ + 22):</div>
                <div className="pl-3 text-indigo-600 dark:text-indigo-400">3x = 24</div>
                <div>5. Osztunk 3-mal (/ : 3):</div>
                <div className="pl-3 font-bold text-emerald-600 dark:text-emerald-400">x = 8</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs">
                <strong>Ellenőrzés:</strong>
                <div>Bal oldal: <MathText>{"4(2 \\cdot 8 - 3) - 2(8 + 5) = 4(13) - 2(13) = 52 - 26 = 26"}</MathText></div>
                <div>Jobb oldal: <MathText>{"3(8 - 2) + 8 = 3(6) + 8 = 18 + 8 = 26"}</MathText></div>
                <div className="text-emerald-700 dark:text-emerald-300 font-bold mt-0.5">Bal = Jobb = 26 ✓ Megoldás: x = 8.</div>
              </div>
            </div>
          </TheoryCard>

          {/* 2. Mintapélda: Törtes */}
          <TheoryCard
            title="2. Mintapélda: Törtes Egyenlet Közös Nevezővel"
            badge="Törtek"
            badgeColor="teal"
            variant="example"
          >
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 font-mono font-bold text-center">
                <MathText>{"\\frac{x + 1}{3} - \\frac{2x - 5}{4} = 1"}</MathText>
              </div>
              <div className="space-y-1 font-mono text-[12px] bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                <div>1. Közös nevező a 12. Beszorozzuk az egyenlet <strong>minden tagját</strong> 12-vel (/ · 12):</div>
                <div className="pl-3 text-teal-600 dark:text-teal-400">4(x + 1) - 3(2x - 5) = 12 · 1</div>
                <div>2. Zárójelbontás (ügyelve a -3 szorzóra!):</div>
                <div className="pl-3 text-teal-600 dark:text-teal-400">4x + 4 - 6x + 15 = 12</div>
                <div>3. Összevonás a bal oldalon:</div>
                <div className="pl-3 text-teal-600 dark:text-teal-400">-2x + 19 = 12</div>
                <div>4. Mérlegelv: kivonunk 19-et (/ - 19):</div>
                <div className="pl-3 text-teal-600 dark:text-teal-400">-2x = -7</div>
                <div>5. Osztunk (-2)-vel (/ : (-2)):</div>
                <div className="pl-3 font-bold text-emerald-600 dark:text-emerald-400">
                  <MathText>{"x = \\frac{-7}{-2} = 3,5"}</MathText>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs">
                <strong>Ellenőrzés:</strong>
                <div>Bal oldal: <MathText>{"\\frac{3,5 + 1}{3} - \\frac{2(3,5) - 5}{4} = \\frac{4,5}{3} - \\frac{2}{4} = 1,5 - 0,5 = 1"}</MathText></div>
                <div>Jobb oldal: <MathText>1</MathText></div>
                <div className="text-emerald-700 dark:text-emerald-300 font-bold mt-0.5">Bal = Jobb = 1 ✓ Megoldás: x = 3,5.</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Szekció: Különleges Kimenetelek */}
      <TheorySection
        number={5}
        title="Különleges Esetek: Azonosság, Ellentmondás és Hamis Gyök"
        icon={<Split className="w-5 h-5 text-amber-600" />}
        badge="Fontos Esetek"
        badgeColor="amber"
      >
        <TheoryTable
          headers={['Kimenetel típusa', 'Rendezés után kapott alak', 'Geometriai / Grafikus jelentés', 'Megoldáshalmaz (M)']}
          rows={[
            [
              'Egyértelmű megoldás',
              'x = a (pl. x = 4)',
              'Két egyenes metszéspontja egyetlen pont',
              'M = { a } (pontosan 1 szám)'
            ],
            [
              'Azonosság (Minden szám jó)',
              '0x = 0 vagy 5 = 5',
              'A két oldal egyenese egybeesik egymással',
              'M = É.T. (alapértelmezetten minden valós szám: R)'
            ],
            [
              'Ellentmondás (Nincs megoldás)',
              '0x = b (ahol b ≠ 0, pl. 0 = 7)',
              'A két oldal egyenesei párhuzamosak, nincs metszéspont',
              'M = ∅ (üres halmaz, nincs megoldás)'
            ],
            [
              'Hamis gyök (Kikötés-sértés)',
              'x = c jön ki, de a kikötés szerint x ≠ c',
              'A pont nem tartozik az értelmezési tartományhoz',
              'M = ∅ (a kapott szám hamis gyök)'
            ]
          ]}
        />
      </TheorySection>

      {/* 6. Szekció: Tipikus Csapdák */}
      <TheorySection
        number={6}
        title="Gyakori Csapdahelyzetek és Tipikus Hibák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            trap="A törtvonal előtti mínuszjel miatti előjelhiba"
            wrong="-\frac{2x - 5}{3} ⟹ -2x - 5"
            wrongExplanation="Gyakori hiba, hogy a mínuszjelet csak a számláló első tagjára (2x) vonatkoztatják, és a -5 előjele változatlan marad!"
            correct="-\frac{2x - 5}{3} = \frac{-(2x - 5)}{3} = \frac{-2x + 5}{3}"
            correctExplanation="A törtvonal zárójelként funkcionál! A negatív előjel a számláló minden tagjának előjelét megfordítja!"
            tip="Mindig tegyél képzeletben (vagy ceruzával) zárójelet a számláló köré, mielőtt beszoroznál a közös nevezővel!"
          />

          <TheoryTrapBox
            trap="A számtagok beszorzásának elfelejtése"
            wrong="\frac{x}{3} + 2 = 5   /· 3 ⟹ x + 2 = 15"
            wrongExplanation="Gyakori hiba, hogy a nevező eltüntetésekor a diák csak a törteket és a jobb oldalt szorozza meg, a tört nélküli +2 tagot kifelejti!"
            correct="\frac{x}{3} + 2 = 5   /· 3 ⟹ x + 6 = 15 ⟹ x = 9"
            correctExplanation="A mérlegelv értelmében a bal oldal MINDEN egyes tagját meg kell szorozni 3-mal: 3 · (x/3) + 3 · 2 = 3 · 5!"
            tip="Számold meg, hány tag van az egyenletben, és mindegyikhez írd oda a szorzótényezőt!"
          />

          <TheoryTrapBox
            trap="Ismeretlennel való osztás (Gyökvesztés veszélye!)"
            wrong="x² = 4x   /: x ⟹ x = 4"
            wrongExplanation="Ismeretlennel (x-szel) osztva elveszítjük az x = 0 gyököt, hiszen nullával nem oszthatunk!"
            correct="x² - 4x = 0 ⟹ x(x - 4) = 0 ⟹ x₁ = 0,  x₂ = 4"
            correctExplanation="Egy szorzat akkor 0, ha legalább az egyik tényezője 0! Így mindkét megoldást megkapjuk."
            tip="Soha ne ossz olyan kifejezéssel, amely ismeretlent tartalmaz, hacsak nem bizonyítottad, hogy sosem lehet 0!"
          />

          <TheoryTrapBox
            trap="Kikötés elmulasztása törtes egyenleteknél"
            wrong="\frac{6}{x - 3} = 2 ⟹ x = 3 esetén a tört \frac{6}{0} lenne"
            wrongExplanation="Ha egyenletmegoldás után nem vetjük össze a kapott gyököt a kikötéssel, nullával való osztást fogadhatunk el helyesnek!"
            correct="Kikötés: x - 3 ≠ 0 ⟹ x ≠ 3. Ha x = 3 adódna, az hamis gyök, M = ∅."
            correctExplanation="A kikötést mindig az egyenlet felírásának legelső pillanatában végezd el!"
            tip="A nevező nem lehet 0: ezt írd fel a füzet szélére pirossal mindjárt a feladat kezdetén!"
          />
        </div>
      </TheorySection>

      {/* 7. Szekció: Ellenőrzés */}
      <TheorySection
        number={7}
        title="Az Ellenőrzés Művészete: Miért és Hogyan Ellenőrizzünk?"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        badge="Biztonság"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCallout type="warning" title="Hová helyettesítsünk vissza?">
            <p>
              Mindig az <strong>eredeti, legelső felírt egyenletbe</strong> helyettesítsünk vissza! Ha a már átrendezett sorba helyettesítünk, akkor egy korábbi számolási vagy előjelhibát nem fogunk észrevenni, mert az átrendezett sorra már kijöhet a helytelen szám!
            </p>
          </TheoryCallout>

          <TheoryCallout type="success" title="Külön bal oldal, külön jobb oldal!">
            <p>
              Az ellenőrzés során a bal oldalt (<MathText>B</MathText>) és a jobb oldalt (<MathText>J</MathText>) egymástól teljesen függetlenül számoljuk ki. Nem rendezünk mérlegelvet, hanem kiszámítjuk mindkettő pontos számértékét. Ha <MathText>B = J</MathText>, a gyök helyes!
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EquationsTheory;
