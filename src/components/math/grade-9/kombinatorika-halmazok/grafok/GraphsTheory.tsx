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
  Network,
  Share2,
  GitFork,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Eye,
  Sliders,
  Scale,
  ArrowRight,
  ListOrdered,
  Shuffle,
  Hash,
  Compass,
  KeyRound,
  MapPin,
  Layers,
  Users,
  Trophy,
  Dices
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface GraphsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const GraphsTheory: React.FC<GraphsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Fokszám és Élszám Kalkulátor Labor ---
  const [degrees, setDegrees] = useState<number[]>([2, 3, 2, 1]);
  const sumDegrees = degrees.reduce((acc, curr) => acc + curr, 0);
  const isValidParity = sumDegrees % 2 === 0;
  const edgeCount = sumDegrees / 2;
  const oddDegreeCount = degrees.filter(d => d % 2 !== 0).length;

  const updateDegree = (index: number, delta: number) => {
    setDegrees(prev => {
      const next = [...prev];
      const maxDegree = prev.length - 1; // egyszerű gráfban d <= n - 1
      const newVal = Math.max(0, Math.min(maxDegree, next[index] + delta));
      next[index] = newVal;
      return next;
    });
  };

  const addVertex = () => {
    if (degrees.length < 6) {
      setDegrees(prev => [...prev, 0]);
    }
  };

  const removeVertex = () => {
    if (degrees.length > 3) {
      setDegrees(prev => prev.slice(0, prev.length - 1));
    }
  };

  // --- Interaktív Teljes Gráf Labor ---
  const [completeGraphN, setCompleteGraphN] = useState<number>(4);
  const completeEdges = (completeGraphN * (completeGraphN - 1)) / 2;

  // --- Mini Önellenőrző Kvíz Állapotok ---
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="Gráfok – Alapfogalmak és Tételek"
      subtitle="Csúcsok, élek, fokszámok, a kézfogási lemma (Euler-tétel), nevezetes gráfcsaládok és hálózati modellezés a 9. osztályos matematikában"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🕸️ TANANYAG"
      themeColor="emerald"
      documentId="graphs-theory-document"
      pdfFilename="9_osztaly_grafok_tananyag.pdf"
      quickRule={{
        label: 'A Két Legfontosabb Gráfelméleti Alaptétel',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Euler-tétel (Kézfogási lemma): </span>
              <MathText text="\sum_{v \in V} d(v) = 2 \cdot |E| \quad \text{(a fokszámok összege mindig páros!)}" />
            </div>
            <div>
              <span className="text-teal-600 dark:text-teal-400 font-black">Fa tétel ($n$ csúcsú fa élszáma): </span>
              <MathText text="|E_{\text{fa}}| = n - 1 \quad \text{(összefüggő, körmentes gráf)}" />
            </div>
          </div>
        )
      }}
      practiceTitle="Készen állsz a gráfos feladványokra?"
      practiceSubtitle="30 válogatott feladat 3 szinten, kézfogási lemmával, fadiagramokkal és hálózatmodellezéssel!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
    >
      {/* =========================================================================
          1. FEJEZET: A GRÁF FOGALMA ÉS ALAPELEMEI
          ========================================================================= */}
      <TheorySection
        number={1}
        title="A Gráf Fogalma és Alapelemei"
        badge="Alapfogalmak"
        badgeColor="emerald"
        icon={<Network className="w-5 h-5 text-emerald-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A <strong>gráf</strong> olyan matematikai struktúra, amely <strong>csúcsokból</strong> (pontokból) és az őket összekötő <strong>élekből</strong> (vonalakból) áll. Gráfokkal modellezhetjük az internetet, a közösségi média ismeretségeit, a vasúti és közúti hálózatokat, vagy éppen egy sakkbajnokság körmérkőzéseit.
          </p>
          <p>
            A csúcsok halmazát általában <MathText text="V" />-vel (angolul <em>vertices</em>), az élek halmazát <MathText text="E" />-vel (angolul <em>edges</em>) jelöljük. A gráfot magát így írjuk le: <MathText text="G = (V, E)" />.
          </p>

          <TheoryCallout
            title="Az Egyszerű Gráf Meghatározása"
            type="tip"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs sm:text-sm leading-relaxed">
              Egy gráfot <strong>egyszerű gráfnak</strong> nevezünk, ha:
              <br />
              1. <strong>Nincs benne hurokél</strong> (egy él nem köthet össze egy csúcsot önmagával), és
              <br />
              2. <strong>Nincsenek benne többszörös (párhuzamos) élek</strong> (két csúcs között legfeljebb egyetlen él húzódhat).
              <br />
              <em>Középiskolában – ha a feladat külön nem jelzi – mindig egyszerű gráfokkal dolgozunk!</em>
            </p>
          </TheoryCallout>

          {/* SVG ÁBRA 1A: Egyszerű Gráf vs. Általános Gráf (Hurokél és Párhuzamos él) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Szemléltető Ábra: Egyszerű Gráf vs. Általános Gráf (Multigráf)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Bal oldal: Egyszerű gráf */}
              <div className="bg-emerald-50/40 dark:bg-slate-850 p-3 rounded-xl border border-emerald-200 dark:border-slate-700 flex flex-col items-center">
                <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1 text-center">
                  A) EGYSZERŰ GRÁF (Szabályos modell)
                </div>
                <svg viewBox="0 0 240 170" className="w-full max-w-xs h-auto select-none">
                  {/* Élek */}
                  <line x1="60" y1="50" x2="180" y2="50" stroke="#059669" strokeWidth="2.5" />
                  <line x1="180" y1="50" x2="180" y2="130" stroke="#059669" strokeWidth="2.5" />
                  <line x1="180" y1="130" x2="60" y2="130" stroke="#059669" strokeWidth="2.5" />
                  <line x1="60" y1="130" x2="60" y2="50" stroke="#059669" strokeWidth="2.5" />
                  <line x1="60" y1="50" x2="180" y2="130" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />

                  {/* 4 Csúcs */}
                  <g transform="translate(60, 50)">
                    <circle r="15" fill="#047857" stroke="#a7f3d0" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">A</text>
                  </g>
                  <g transform="translate(180, 50)">
                    <circle r="15" fill="#047857" stroke="#a7f3d0" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">B</text>
                  </g>
                  <g transform="translate(180, 130)">
                    <circle r="15" fill="#047857" stroke="#a7f3d0" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">C</text>
                  </g>
                  <g transform="translate(60, 130)">
                    <circle r="15" fill="#047857" stroke="#a7f3d0" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">D</text>
                  </g>

                  {/* Pipák */}
                  <rect x="35" y="145" width="170" height="20" rx="4" fill="#d1fae5" stroke="#10b981" />
                  <text x="120" y="158" className="text-[9.5px] font-black fill-emerald-900" textAnchor="middle">
                    ✓ Nincs hurokél • Nincs párhuzamos él
                  </text>
                </svg>
              </div>

              {/* Jobb oldal: Nem egyszerű gráf (hurok + többszörös) */}
              <div className="bg-rose-50/40 dark:bg-slate-850 p-3 rounded-xl border border-rose-200 dark:border-slate-700 flex flex-col items-center">
                <div className="text-[11px] font-bold text-rose-800 dark:text-rose-300 mb-1 text-center">
                  B) NEM EGYSZERŰ GRÁF (Multigráf / Általános gráf)
                </div>
                <svg viewBox="0 0 240 170" className="w-full max-w-xs h-auto select-none">
                  {/* Párhuzamos élek A és B között */}
                  <path d="M 60 50 C 120 20, 120 20, 180 50" fill="none" stroke="#e11d48" strokeWidth="2" />
                  <path d="M 60 50 C 120 80, 120 80, 180 50" fill="none" stroke="#e11d48" strokeWidth="2" />
                  <text x="120" y="32" className="text-[8.5px] font-black fill-rose-700" textAnchor="middle">Többszörös él!</text>

                  {/* Sima él B és C között */}
                  <line x1="180" y1="50" x2="180" y2="130" stroke="#64748b" strokeWidth="2" />

                  {/* Hurokél C csúcson */}
                  <path d="M 180 130 C 230 110, 230 170, 180 130" fill="none" stroke="#e11d48" strokeWidth="2" />
                  <text x="210" y="156" className="text-[8.5px] font-black fill-rose-700" textAnchor="middle">Hurokél!</text>

                  {/* Csúcsok */}
                  <g transform="translate(60, 50)">
                    <circle r="15" fill="#be123c" stroke="#fecdd3" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">A</text>
                  </g>
                  <g transform="translate(180, 50)">
                    <circle r="15" fill="#be123c" stroke="#fecdd3" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">B</text>
                  </g>
                  <g transform="translate(180, 130)">
                    <circle r="15" fill="#be123c" stroke="#fecdd3" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">C</text>
                  </g>

                  {/* Figyelmeztetés */}
                  <rect x="25" y="145" width="190" height="20" rx="4" fill="#fee2e2" stroke="#f87171" />
                  <text x="120" y="158" className="text-[9.5px] font-black fill-rose-900" textAnchor="middle">
                    ❌ Hurokél és többszörös él nem egyszerű!
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* SVG ÁBRA 1B: Különleges Csúcsok (Izolált pont, Függőcsúcs/Levél) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>Szemléltető Ábra: Különleges Csúcsok (Izolált csúcs, Levélcsúcs és Belső csúcsok)</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <svg viewBox="0 0 540 180" className="w-full max-w-xl h-auto select-none font-sans">
                {/* Élek */}
                <line x1="70" y1="90" x2="160" y2="90" stroke="#059669" strokeWidth="2.5" />
                <line x1="160" y1="90" x2="250" y2="50" stroke="#059669" strokeWidth="2.5" />
                <line x1="160" y1="90" x2="250" y2="130" stroke="#059669" strokeWidth="2.5" />
                <line x1="250" y1="50" x2="250" y2="130" stroke="#059669" strokeWidth="2.5" />
                <line x1="250" y1="90" x2="350" y2="90" stroke="#059669" strokeWidth="2.5" />

                {/* 1. Levélcsúcs (Függőcsúcs, d = 1) */}
                <circle cx="70" cy="90" r="18" fill="#d97706" stroke="#fde68a" strokeWidth="2.5" />
                <text x="70" y="94" className="text-[12px] font-black fill-white" textAnchor="middle">L₁</text>
                <rect x="25" y="120" width="90" height="26" rx="5" fill="#fef3c7" stroke="#f59e0b" />
                <text x="70" y="133" className="text-[9.5px] font-black fill-amber-900" textAnchor="middle">Levélcsúcs</text>
                <text x="70" y="143" className="text-[8.5px] font-bold fill-amber-700" textAnchor="middle">fokszám: d = 1</text>

                {/* 2. Belső csomópontok */}
                <circle cx="160" cy="90" r="18" fill="#047857" stroke="#a7f3d0" strokeWidth="2.5" />
                <text x="160" y="94" className="text-[12px] font-black fill-white" textAnchor="middle">B₁</text>
                <text x="160" y="125" className="text-[9.5px] font-bold fill-emerald-800" textAnchor="middle">d = 3</text>

                <circle cx="250" cy="50" r="18" fill="#047857" stroke="#a7f3d0" strokeWidth="2.5" />
                <text x="250" y="54" className="text-[12px] font-black fill-white" textAnchor="middle">B₂</text>
                <text x="250" y="25" className="text-[9.5px] font-bold fill-emerald-800" textAnchor="middle">d = 2</text>

                <circle cx="250" cy="130" r="18" fill="#047857" stroke="#a7f3d0" strokeWidth="2.5" />
                <text x="250" y="134" className="text-[12px] font-black fill-white" textAnchor="middle">B₃</text>
                <text x="250" y="160" className="text-[9.5px] font-bold fill-emerald-800" textAnchor="middle">d = 2</text>

                {/* 3. További levélcsúcs */}
                <circle cx="350" cy="90" r="18" fill="#d97706" stroke="#fde68a" strokeWidth="2.5" />
                <text x="350" y="94" className="text-[12px] font-black fill-white" textAnchor="middle">L₂</text>
                <rect x="305" y="120" width="90" height="26" rx="5" fill="#fef3c7" stroke="#f59e0b" />
                <text x="350" y="133" className="text-[9.5px] font-black fill-amber-900" textAnchor="middle">Levélcsúcs</text>
                <text x="350" y="143" className="text-[8.5px] font-bold fill-amber-700" textAnchor="middle">fokszám: d = 1</text>

                {/* 4. Izolált csúcs (különálló, d = 0) */}
                <circle cx="470" cy="90" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2.5" />
                <text x="470" y="94" className="text-[12px] font-black fill-white" textAnchor="middle">I</text>
                <rect x="420" y="120" width="100" height="26" rx="5" fill="#f1f5f9" stroke="#94a3b8" />
                <text x="470" y="133" className="text-[9.5px] font-black fill-slate-800" textAnchor="middle">Izolált csúcs</text>
                <text x="470" y="143" className="text-[8.5px] font-bold fill-slate-600" textAnchor="middle">fokszám: d = 0</text>
              </svg>
              <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300 mt-2">
                Egy csúcsból kiinduló élek száma a csúcs fokszáma. Ha <MathText text="d = 0" />, a csúcs izolált (senkivel sincs összekötve). Ha <MathText text="d = 1" />, függőcsúcs (levél).
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. FEJEZET: FOKSZÁMOK ÉS A KÉZFOGÁSI LEMMA (EULER-TÉTEL)
          ========================================================================= */}
      <TheorySection
        number={2}
        title="Fokszámok és a Kézfogási Lemma (Euler-tétel)"
        badge="Főtétel"
        badgeColor="teal"
        icon={<Share2 className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Egy csúcs <strong>fokszáma</strong> (<MathText text="d(v)" />) a belőle kiinduló élek száma. A gráfelmélet egyik legfontosabb és leggyakrabban használt tétele a <strong>kézfogási lemma</strong> (vagy Euler-fokszámtétel).
          </p>

          <TheoryCallout
            title="A Kézfogási Lemma (Euler-tétel)"
            type="info"
            icon={<Sparkles className="w-5 h-5 text-teal-600" />}
          >
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                Bármely véges gráfban a csúcsok fokszámainak összege megegyezik az élek számának kétszeresével:
              </p>
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-center font-mono font-black text-sm text-teal-900 dark:text-teal-200">
                <MathText text="\sum_{v \in V} d(v) = 2 \cdot |E|" />
              </div>
              <p className="font-semibold text-teal-900 dark:text-teal-300 pt-1">
                Alapvető Következmény: Minden gráfban a fokszámok összege PÁROS szám! Ebből következően a páratlan fokszámú csúcsok száma csak PÁROS lehet!
              </p>
            </div>
          </TheoryCallout>

          {/* SVG ÁBRA 2: A Kézfogási Lemma Vizuális Levezetése */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Share2 className="w-4 h-4 text-teal-600" />
              <span>Szemléltető Ábra: Miért a Kétszerese? Minden Él Két Végpontot Érint (+2 a Fokszámokhoz)</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <svg viewBox="0 0 540 190" className="w-full max-w-xl h-auto select-none font-sans">
                {/* 1 Él kiterítése */}
                <line x1="140" y1="85" x2="400" y2="85" stroke="#0d9488" strokeWidth="4" />

                {/* Bal végpont csúcs */}
                <circle cx="140" cy="85" r="28" fill="#115e59" stroke="#5eead4" strokeWidth="3" />
                <text x="140" y="82" className="text-[13px] font-black fill-white" textAnchor="middle">„u”</text>
                <text x="140" y="97" className="text-[9px] font-bold fill-teal-200" textAnchor="middle">1. csúcs</text>

                {/* Jobb végpont csúcs */}
                <circle cx="400" cy="85" r="28" fill="#115e59" stroke="#5eead4" strokeWidth="3" />
                <text x="400" y="82" className="text-[13px] font-black fill-white" textAnchor="middle">„v”</text>
                <text x="400" y="97" className="text-[9px] font-bold fill-teal-200" textAnchor="middle">2. csúcs</text>

                {/* Bal nyíl és fokszám járulék */}
                <path d="M 180 65 L 155 75" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <rect x="95" y="125" width="90" height="24" rx="5" fill="#fef3c7" stroke="#f59e0b" />
                <text x="140" y="141" className="text-[10px] font-black fill-amber-900" textAnchor="middle">
                  +1 fok „u”-nál
                </text>

                {/* Jobb nyíl és fokszám járulék */}
                <path d="M 360 65 L 385 75" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <rect x="355" y="125" width="90" height="24" rx="5" fill="#fef3c7" stroke="#f59e0b" />
                <text x="400" y="141" className="text-[10px] font-black fill-amber-900" textAnchor="middle">
                  +1 fok „v”-nél
                </text>

                {/* Középső felirat: 1 él = +2 fokszám */}
                <rect x="200" y="25" width="140" height="32" rx="6" fill="#ccfbf1" stroke="#14b8a6" />
                <text x="270" y="45" className="text-[11px] font-black fill-teal-950" textAnchor="middle">
                  1 Él = Két végpont
                </text>

                <rect x="180" y="120" width="180" height="34" rx="6" fill="#0f766e" />
                <text x="270" y="141" className="text-[11.5px] font-black fill-white" textAnchor="middle">
                  Összes fokszám: +2
                </text>
              </svg>
              <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300 mt-2">
                Minden kézfogásban pontosan 2 kéz vesz részt. Ezért a kézfogások összege mindig kétszerese a kézfogások számának: <MathText text="\sum d(v) = 2 \cdot e" />.
              </div>
            </div>
          </div>

          {/* SVG ÁBRA 3: Lehetséges vs. Lehetetlen Fokszám-sorozatok */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Scale className="w-4 h-4 text-teal-600" />
              <span>Szemléltető Ábra: Lehetséges és Lehetetlen Fokszám-sorozatok Ellenőrzése</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lehetetlen eset */}
              <div className="p-3.5 bg-rose-50/60 dark:bg-slate-850 rounded-xl border border-rose-200 dark:border-rose-900/60 space-y-2">
                <div className="flex items-center gap-2 font-black text-xs text-rose-700 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>LEHETETLEN: (3, 3, 3, 3, 3)</span>
                </div>
                <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                  <p>5 ember mindegyikének 3 ismerőse van:</p>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono font-bold text-rose-800 dark:text-rose-300 text-center">
                    Összeg = 3 + 3 + 3 + 3 + 3 = 15 (PÁRATLAN!)
                  </div>
                  <p className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold">
                    ❌ A kézfogási lemma szerint az összegnek párosnak kellene lennie (15 nem osztható 2-vel). Ilyen gráf NEM LÉTEZIK!
                  </p>
                </div>
              </div>

              {/* Lehetséges eset */}
              <div className="p-3.5 bg-emerald-50/60 dark:bg-slate-850 rounded-xl border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                <div className="flex items-center gap-2 font-black text-xs text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>LEHETSÉGES: (3, 3, 2, 2, 2)</span>
                </div>
                <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                  <p>5 ember, fokszámok: 3, 3, 2, 2, 2:</p>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono font-bold text-emerald-800 dark:text-emerald-300 text-center">
                    Összeg = 3 + 3 + 2 + 2 + 2 = 12 (PÁROS!)
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    ✓ Élek száma: e = 12 / 2 = 6 él. Páratlan fokú csúcsok száma: 2 db (páros). Ez a gráf megrajzolható!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interaktív Fokszám és Élszám Kalkulátor Labor */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-50/70 via-emerald-50/40 to-slate-50 dark:from-slate-900 dark:via-teal-950/20 dark:to-slate-850 border-2 border-teal-200/80 dark:border-teal-900/60 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 dark:border-teal-900/40 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                  Interaktív Fokszám- és Élszám Labor
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={addVertex} disabled={degrees.length >= 6} className="h-7 text-xs font-bold">
                  + Csúcs ({degrees.length})
                </Button>
                <Button size="sm" variant="outline" onClick={removeVertex} disabled={degrees.length <= 3} className="h-7 text-xs font-bold">
                  - Csúcs
                </Button>
              </div>
            </div>

            {/* Csúcsok fokszámai gombok */}
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Állítsd a csúcsok fokszámait (egyszerű gráfban d &le; {degrees.length - 1}):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {degrees.map((deg, idx) => (
                  <div key={`deg-box-${idx}`} className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-teal-200 dark:border-slate-700 flex flex-col items-center gap-1.5 shadow-xs">
                    <span className="text-[11px] font-black text-teal-700 dark:text-teal-300">{idx + 1}. Csúcs (v_{idx + 1})</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">{deg}</span>
                    <div className="flex gap-1 w-full">
                      <button
                        onClick={() => updateDegree(idx, -1)}
                        disabled={deg <= 0}
                        className="flex-1 py-0.5 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 font-black text-xs disabled:opacity-30"
                      >
                        -
                      </button>
                      <button
                        onClick={() => updateDegree(idx, 1)}
                        disabled={deg >= degrees.length - 1}
                        className="flex-1 py-0.5 rounded bg-teal-100 dark:bg-teal-900/60 hover:bg-teal-200 text-teal-800 dark:text-teal-200 font-black text-xs disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kiértékelés box */}
            <div className={`p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${isValidParity ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'}`}>
              <div className="space-y-0.5 text-xs text-center sm:text-left">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Fokszámok összege: <strong className="text-sm font-mono">{sumDegrees}</strong> ({isValidParity ? 'PÁROS ✓' : 'PÁRATLAN ❌'})
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  Páratlan fokszámú csúcsok száma: <strong>{oddDegreeCount} db</strong> ({oddDegreeCount % 2 === 0 ? 'Páros ✓' : 'Páratlan ❌'})
                </div>
              </div>

              <div className="text-center sm:text-right">
                {isValidParity ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-black text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    Létezhet ilyen gráf! Élek száma: e = {edgeCount}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-black text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    Lehetetlen gráf (Euler-tétel sértés)!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. FEJEZET: NEVEZETES GRÁFTÍPUSOK ÉS ÉLSZÁMUK
          ========================================================================= */}
      <TheorySection
        number={3}
        title="Nevezetes Gráftípusok és Élszámuk"
        badge="Gráfcsaládok"
        badgeColor="indigo"
        icon={<Compass className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A kombinatorikai és geometriai feladatokban gyakran találkozunk különleges szimmetriájú, szabályos gráfokkal. Ezek élszáma közvetlenül kiszámítható a csúcsok számából.
          </p>

          {/* SVG ÁBRA 4: Nevezetes Gráftípusok Galériája */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Szemléltető Ábra: A Legfontosabb Szabályos Gráfcsaládok Vizuális Galériája</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 700 230" className="w-full min-w-[650px] h-auto select-none font-sans">
                {/* 1. Teljes Gráf K4 */}
                <g transform="translate(10, 10)">
                  <rect width="155" height="210" rx="10" fill="#ffffff" stroke="#cbd5e1" />
                  <rect x="10" y="8" width="135" height="22" rx="4" fill="#ede9fe" />
                  <text x="77" y="23" className="text-[10px] font-black fill-purple-900" textAnchor="middle">1. TELJES GRÁF (K₄)</text>

                  {/* K4 élek */}
                  <line x1="45" y1="55" x2="110" y2="55" stroke="#7c3aed" strokeWidth="2" />
                  <line x1="110" y1="55" x2="110" y2="120" stroke="#7c3aed" strokeWidth="2" />
                  <line x1="110" y1="120" x2="45" y2="120" stroke="#7c3aed" strokeWidth="2" />
                  <line x1="45" y1="120" x2="45" y2="55" stroke="#7c3aed" strokeWidth="2" />
                  <line x1="45" y1="55" x2="110" y2="120" stroke="#7c3aed" strokeWidth="1.5" />
                  <line x1="110" y1="55" x2="45" y2="120" stroke="#7c3aed" strokeWidth="1.5" />

                  {/* K4 csúcsok */}
                  {[{ x: 45, y: 55 }, { x: 110, y: 55 }, { x: 110, y: 120 }, { x: 45, y: 120 }].map((p, i) => (
                    <circle key={`k4-${i}`} cx={p.x} cy={p.y} r="10" fill="#6d28d9" stroke="#ddd6fe" strokeWidth="2" />
                  ))}

                  <text x="77" y="155" className="text-[11px] font-black fill-purple-950" textAnchor="middle">e = n(n-1) / 2</text>
                  <text x="77" y="172" className="text-[10px] font-bold fill-purple-700" textAnchor="middle">K₄ esetén: 6 él</text>
                  <text x="77" y="192" className="text-[9px] font-semibold fill-slate-500" textAnchor="middle">Mindenki mindenkivel</text>
                </g>

                {/* 2. Körgráf C5 */}
                <g transform="translate(180, 10)">
                  <rect width="155" height="210" rx="10" fill="#ffffff" stroke="#cbd5e1" />
                  <rect x="10" y="8" width="135" height="22" rx="4" fill="#dbeafe" />
                  <text x="77" y="23" className="text-[10px] font-black fill-blue-900" textAnchor="middle">2. KÖRGRÁF (C₅)</text>

                  {/* C5 ötszög élek */}
                  <line x1="77" y1="50" x2="120" y2="78" stroke="#2563eb" strokeWidth="2" />
                  <line x1="120" y1="78" x2="105" y2="125" stroke="#2563eb" strokeWidth="2" />
                  <line x1="105" y1="125" x2="50" y2="125" stroke="#2563eb" strokeWidth="2" />
                  <line x1="50" y1="125" x2="35" y2="78" stroke="#2563eb" strokeWidth="2" />
                  <line x1="35" y1="78" x2="77" y2="50" stroke="#2563eb" strokeWidth="2" />

                  {/* C5 csúcsok */}
                  {[{ x: 77, y: 50 }, { x: 120, y: 78 }, { x: 105, y: 125 }, { x: 50, y: 125 }, { x: 35, y: 78 }].map((p, i) => (
                    <circle key={`c5-${i}`} cx={p.x} cy={p.y} r="9" fill="#1d4ed8" stroke="#bfdbfe" strokeWidth="2" />
                  ))}

                  <text x="77" y="155" className="text-[11px] font-black fill-blue-950" textAnchor="middle">e = n él</text>
                  <text x="77" y="172" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">C₅ esetén: 5 él</text>
                  <text x="77" y="192" className="text-[9px] font-semibold fill-slate-500" textAnchor="middle">Minden csúcs foka = 2</text>
                </g>

                {/* 3. Útgráf P4 */}
                <g transform="translate(350, 10)">
                  <rect width="155" height="210" rx="10" fill="#ffffff" stroke="#cbd5e1" />
                  <rect x="10" y="8" width="135" height="22" rx="4" fill="#ecfdf5" />
                  <text x="77" y="23" className="text-[10px] font-black fill-emerald-900" textAnchor="middle">3. ÚTGRÁF (P₄)</text>

                  {/* P4 élek */}
                  <line x1="25" y1="85" x2="60" y2="85" stroke="#059669" strokeWidth="2.5" />
                  <line x1="60" y1="85" x2="95" y2="85" stroke="#059669" strokeWidth="2.5" />
                  <line x1="95" y1="85" x2="130" y2="85" stroke="#059669" strokeWidth="2.5" />

                  {/* P4 csúcsok */}
                  {[25, 60, 95, 130].map((x, i) => (
                    <circle key={`p4-${i}`} cx={x} cy={85} r="9" fill="#047857" stroke="#a7f3d0" strokeWidth="2" />
                  ))}

                  <text x="77" y="155" className="text-[11px] font-black fill-emerald-950" textAnchor="middle">e = n - 1 él</text>
                  <text x="77" y="172" className="text-[10px] font-bold fill-emerald-700" textAnchor="middle">P₄ esetén: 3 él</text>
                  <text x="77" y="192" className="text-[9px] font-semibold fill-slate-500" textAnchor="middle">Nyílt láncolat</text>
                </g>

                {/* 4. Csillaggráf S5 */}
                <g transform="translate(520, 10)">
                  <rect width="165" height="210" rx="10" fill="#ffffff" stroke="#cbd5e1" />
                  <rect x="10" y="8" width="145" height="22" rx="4" fill="#fef3c7" />
                  <text x="82" y="23" className="text-[10px] font-black fill-amber-900" textAnchor="middle">4. CSILLAGGRÁF (S₅)</text>

                  {/* S5 élek a középpontból */}
                  <line x1="82" y1="88" x2="40" y2="55" stroke="#d97706" strokeWidth="2" />
                  <line x1="82" y1="88" x2="125" y2="55" stroke="#d97706" strokeWidth="2" />
                  <line x1="82" y1="88" x2="125" y2="120" stroke="#d97706" strokeWidth="2" />
                  <line x1="82" y1="88" x2="40" y2="120" stroke="#d97706" strokeWidth="2" />

                  {/* S5 levelek */}
                  {[{ x: 40, y: 55 }, { x: 125, y: 55 }, { x: 125, y: 120 }, { x: 40, y: 120 }].map((p, i) => (
                    <circle key={`s5-leaf-${i}`} cx={p.x} cy={p.y} r="8" fill="#b45309" stroke="#fed7aa" strokeWidth="1.5" />
                  ))}
                  {/* S5 központ */}
                  <circle cx="82" cy="88" r="12" fill="#78350f" stroke="#fde68a" strokeWidth="2.5" />

                  <text x="82" y="155" className="text-[11px] font-black fill-amber-950" textAnchor="middle">e = n - 1 él</text>
                  <text x="82" y="172" className="text-[10px] font-bold fill-amber-700" textAnchor="middle">1 központ (d = n-1)</text>
                  <text x="82" y="192" className="text-[9px] font-semibold fill-slate-500" textAnchor="middle">A levelek foka = 1</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Interaktív Teljes Gráf Labor */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/50 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-850 border-2 border-indigo-200/80 dark:border-indigo-900/60 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 dark:border-indigo-900/40 pb-2">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                  Interaktív Teljes Gráf (K_n) Kiszámító Labor
                </h4>
              </div>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100/80 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                Élek száma: <strong className="text-sm font-mono">{completeEdges}</strong> él
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Válassz csúcsszámot (n):
              </span>
              <div className="flex gap-2">
                {[3, 4, 5, 6, 8, 10].map(n => (
                  <Button
                    key={`kn-btn-${n}`}
                    size="sm"
                    variant={completeGraphN === n ? 'default' : 'outline'}
                    onClick={() => setCompleteGraphN(n)}
                    className="h-8 text-xs font-bold"
                  >
                    K_{n}
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-indigo-900/60 text-xs">
              <span className="text-slate-600 dark:text-slate-400">Levezetés a kézfogási szabállyal: </span>
              <span className="font-mono font-black text-indigo-700 dark:text-indigo-300">
                <MathText text={`e = \\frac{n(n-1)}{2} = \\frac{${completeGraphN} \\cdot ${completeGraphN - 1}}{2} = ${completeEdges}`} /> él.
              </span>
              <span className="text-slate-500 dark:text-slate-400 block sm:inline sm:ml-2 text-[11px]">
                (Minden csúcs foka pontosan {completeGraphN - 1}.)
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. FEJEZET: ÖSSZEFÜGGŐSÉG, FÁK ÉS KÖRÖK
          ========================================================================= */}
      <TheorySection
        number={4}
        title="Összefüggőség, Fák és Körök"
        badge="Struktúrák"
        badgeColor="blue"
        icon={<GitFork className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Egy gráfot <strong>összefüggőnek</strong> nevezünk, ha bármely két csúcsa között vezet él-sorozat (út). Ha egy gráf nem összefüggő, akkor több különálló <em>összefüggőségi komponensre</em> esik szét.
          </p>

          {/* SVG ÁBRA 5: Összefüggő vs. Nem Összefüggő Gráf */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <GitFork className="w-4 h-4 text-blue-600" />
              <span>Szemléltető Ábra: Összefüggő Gráf vs. Több Komponensből Álló Gráf</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Összefüggő */}
              <div className="bg-blue-50/50 dark:bg-slate-850 p-3 rounded-xl border border-blue-200 dark:border-slate-700 flex flex-col items-center">
                <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 mb-1 text-center">
                  A) ÖSSZEFÜGGŐ GRÁF (1 Komponens)
                </div>
                <svg viewBox="0 0 240 140" className="w-full max-w-xs h-auto select-none">
                  <line x1="50" y1="40" x2="120" y2="40" stroke="#2563eb" strokeWidth="2.5" />
                  <line x1="120" y1="40" x2="190" y2="40" stroke="#2563eb" strokeWidth="2.5" />
                  <line x1="120" y1="40" x2="120" y2="105" stroke="#2563eb" strokeWidth="2.5" />
                  <line x1="120" y1="105" x2="50" y2="105" stroke="#2563eb" strokeWidth="2.5" />

                  {[
                    { x: 50, y: 40, label: '1' },
                    { x: 120, y: 40, label: '2' },
                    { x: 190, y: 40, label: '3' },
                    { x: 120, y: 105, label: '4' },
                    { x: 50, y: 105, label: '5' }
                  ].map(p => (
                    <circle key={`conn-${p.label}`} cx={p.x} cy={p.y} r="12" fill="#1d4ed8" stroke="#bfdbfe" strokeWidth="2" />
                  ))}

                  <rect x="40" y="115" width="160" height="20" rx="4" fill="#dbeafe" stroke="#3b82f6" />
                  <text x="120" y="128" className="text-[9.5px] font-black fill-blue-900" textAnchor="middle">
                    Bármely pontból eljuthatunk bárhova
                  </text>
                </svg>
              </div>

              {/* Nem összefüggő */}
              <div className="bg-amber-50/50 dark:bg-slate-850 p-3 rounded-xl border border-amber-200 dark:border-slate-700 flex flex-col items-center">
                <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 mb-1 text-center">
                  B) NEM ÖSSZEFÜGGŐ GRÁF (2 Külön Komponens)
                </div>
                <svg viewBox="0 0 240 140" className="w-full max-w-xs h-auto select-none">
                  {/* 1. komponens: háromszög */}
                  <line x1="45" y1="40" x2="95" y2="40" stroke="#d97706" strokeWidth="2.5" />
                  <line x1="95" y1="40" x2="70" y2="85" stroke="#d97706" strokeWidth="2.5" />
                  <line x1="70" y1="85" x2="45" y2="40" stroke="#d97706" strokeWidth="2.5" />
                  <circle cx="45" cy="40" r="10" fill="#b45309" stroke="#fde68a" strokeWidth="2" />
                  <circle cx="95" cy="40" r="10" fill="#b45309" stroke="#fde68a" strokeWidth="2" />
                  <circle cx="70" cy="85" r="10" fill="#b45309" stroke="#fde68a" strokeWidth="2" />

                  {/* 2. komponens: különálló szakasz */}
                  <line x1="160" y1="65" x2="205" y2="65" stroke="#d97706" strokeWidth="2.5" />
                  <circle cx="160" cy="65" r="10" fill="#b45309" stroke="#fde68a" strokeWidth="2" />
                  <circle cx="205" cy="65" r="10" fill="#b45309" stroke="#fde68a" strokeWidth="2" />

                  <rect x="35" y="115" width="170" height="20" rx="4" fill="#fef3c7" stroke="#f59e0b" />
                  <text x="120" y="128" className="text-[9.5px] font-black fill-amber-900" textAnchor="middle">
                    Nincs átjárás a két rész között!
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <TheoryCallout
            title="A Fa Fogalma és a Fa Tétel"
            type="tip"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          >
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p>
                A <strong>fát</strong> úgy definiáljuk, mint <strong>összefüggő, körmentes egyszerű gráfot</strong>.
              </p>
              <div className="p-2 bg-emerald-100/60 dark:bg-emerald-950/60 rounded font-black text-emerald-900 dark:text-emerald-200">
                Fa Tétel: Minden <MathText text="n" /> csúcsú fának pontosan <MathText text="n - 1" /> éle van!
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Egy fában bármely két csúcs között pontosan egyetlen egyszerű út vezet. Ha bármelyik élt elhagyjuk, a fa szétesik; ha bármely két nem összekötött csúcs közé behúzunk egy új élt, kör keletkezik!
              </p>
            </div>
          </TheoryCallout>

          {/* SVG ÁBRA 6: Fák Különböző Formái (n = 5 csúcsú fák) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Network className="w-4 h-4 text-emerald-600" />
              <span>Szemléltető Ábra: Fák Családja – 3 Különböző Felépítésű 5 Csúcsú Fa (Mindnek pontosan 4 éle van!)</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 620 180" className="w-full min-w-[580px] h-auto select-none font-sans">
                {/* 1. Fa: Útfaszerkezet (P5) */}
                <g transform="translate(15, 10)">
                  <rect width="180" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" />
                  <text x="90" y="24" className="text-[10px] font-black fill-emerald-900" textAnchor="middle">A) ÚTSZERŰ FA (Lánc)</text>
                  <line x1="25" y1="75" x2="60" y2="75" stroke="#059669" strokeWidth="2" />
                  <line x1="60" y1="75" x2="95" y2="75" stroke="#059669" strokeWidth="2" />
                  <line x1="95" y1="75" x2="130" y2="75" stroke="#059669" strokeWidth="2" />
                  <line x1="130" y1="75" x2="160" y2="75" stroke="#059669" strokeWidth="2" />
                  {[25, 60, 95, 130, 160].map((x, i) => (
                    <circle key={`tree1-${i}`} cx={x} cy={75} r="8" fill="#047857" stroke="#a7f3d0" strokeWidth="1.5" />
                  ))}
                  <text x="90" y="118" className="text-[11px] font-black fill-emerald-950" textAnchor="middle">5 csúcs, 4 él</text>
                  <text x="90" y="136" className="text-[9px] font-bold fill-slate-500" textAnchor="middle">Max fok = 2</text>
                </g>

                {/* 2. Fa: Elágazó fa (Y alak) */}
                <g transform="translate(215, 10)">
                  <rect width="180" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" />
                  <text x="90" y="24" className="text-[10px] font-black fill-teal-900" textAnchor="middle">B) ELÁGAZÓ FA (Y forma)</text>
                  <line x1="35" y1="75" x2="85" y2="75" stroke="#0d9488" strokeWidth="2" />
                  <line x1="85" y1="75" x2="135" y2="45" stroke="#0d9488" strokeWidth="2" />
                  <line x1="85" y1="75" x2="135" y2="105" stroke="#0d9488" strokeWidth="2" />
                  <line x1="135" y1="45" x2="165" y2="45" stroke="#0d9488" strokeWidth="2" />
                  {[{ x: 35, y: 75 }, { x: 85, y: 75 }, { x: 135, y: 45 }, { x: 135, y: 105 }, { x: 165, y: 45 }].map((p, i) => (
                    <circle key={`tree2-${i}`} cx={p.x} cy={p.y} r="8" fill="#0f766e" stroke="#99f6e4" strokeWidth="1.5" />
                  ))}
                  <text x="90" y="118" className="text-[11px] font-black fill-teal-950" textAnchor="middle">5 csúcs, 4 él</text>
                  <text x="90" y="136" className="text-[9px] font-bold fill-slate-500" textAnchor="middle">Elágazási pont: d = 3</text>
                </g>

                {/* 3. Fa: Csillagfa (S5) */}
                <g transform="translate(415, 10)">
                  <rect width="180" height="155" rx="8" fill="#ffffff" stroke="#cbd5e1" />
                  <text x="90" y="24" className="text-[10px] font-black fill-amber-900" textAnchor="middle">C) CSILLAGFA (Centrum)</text>
                  <line x1="90" y1="75" x2="45" y2="45" stroke="#d97706" strokeWidth="2" />
                  <line x1="90" y1="75" x2="135" y2="45" stroke="#d97706" strokeWidth="2" />
                  <line x1="90" y1="75" x2="135" y2="105" stroke="#d97706" strokeWidth="2" />
                  <line x1="90" y1="75" x2="45" y2="105" stroke="#d97706" strokeWidth="2" />
                  {[{ x: 45, y: 45 }, { x: 135, y: 45 }, { x: 135, y: 105 }, { x: 45, y: 105 }].map((p, i) => (
                    <circle key={`tree3-leaf-${i}`} cx={p.x} cy={p.y} r="7" fill="#b45309" stroke="#fed7aa" strokeWidth="1.5" />
                  ))}
                  <circle cx="90" cy="75" r="11" fill="#78350f" stroke="#fde68a" strokeWidth="2" />
                  <text x="90" y="118" className="text-[11px] font-black fill-amber-950" textAnchor="middle">5 csúcs, 4 él</text>
                  <text x="90" y="136" className="text-[9px] font-bold fill-slate-500" textAnchor="middle">Központ foka: d = 4</text>
                </g>
              </svg>
            </div>
            <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300">
              Bármilyen alakú is a fa: ha n csúcsa van és összefüggő, körmentes, az élek száma mindig pontosan <MathText text="n - 1" />!
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. FEJEZET: GRÁFMODELLEK A GYAKORLATBAN (KÉTPARTI ÉS IRÁNYÍTOTT GRÁFOK)
          ========================================================================= */}
      <TheorySection
        number={5}
        title="Gráfmodellek a Gyakorlatban"
        badge="Alkalmazások"
        badgeColor="purple"
        icon={<Users className="w-5 h-5 text-purple-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A való életben a csúcsok gyakran két különböző csoportba sorolhatók, és kapcsolatok csak a csoportok <em>között</em> jönnek létre. Az ilyen gráfokat <strong>páros gráfoknak (kétparti gráfoknak)</strong> nevezzük.
          </p>

          {/* SVG ÁBRA 7: Kétparti Gráf (Bipartite Graph K3,3) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Szemléltető Ábra: Teljes Kétparti Gráf (K₃,₃ – pl. 3 fiú és 3 lány táncpárjai: 3 · 3 = 9 él)</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <svg viewBox="0 0 520 200" className="w-full max-w-lg h-auto select-none font-sans">
                {/* 1. Csoport háttér (Fiúk) */}
                <rect x="70" y="15" width="100" height="150" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeDasharray="3 3" />
                <text x="120" y="32" className="text-[10px] font-black fill-blue-800" textAnchor="middle">„A” Osztály (Fiúk)</text>

                {/* 2. Csoport háttér (Lányok) */}
                <rect x="350" y="15" width="100" height="150" rx="10" fill="#fdf2f8" stroke="#f472b6" strokeDasharray="3 3" />
                <text x="400" y="32" className="text-[10px] font-black fill-pink-800" textAnchor="middle">„B” Osztály (Lányok)</text>

                {/* 9 összekötő él */}
                {[55, 95, 135].map(y1 =>
                  [55, 95, 135].map(y2 => (
                    <line key={`bipartite-${y1}-${y2}`} x1="120" y1={y1} x2="400" y2={y2} stroke="#a855f7" strokeWidth="1.2" opacity="0.6" />
                  ))
                )}

                {/* Bal csúcsok (F1, F2, F3) */}
                {[
                  { y: 55, name: 'F₁' },
                  { y: 95, name: 'F₂' },
                  { y: 135, name: 'F₃' }
                ].map(p => (
                  <g key={`b-left-${p.name}`}>
                    <circle cx="120" cy={p.y} r="14" fill="#2563eb" stroke="#bfdbfe" strokeWidth="2" />
                    <text x="120" y={p.y + 4} className="text-[10px] font-black fill-white" textAnchor="middle">{p.name}</text>
                  </g>
                ))}

                {/* Jobb csúcsok (L1, L2, L3) */}
                {[
                  { y: 55, name: 'L₁' },
                  { y: 95, name: 'L₂' },
                  { y: 135, name: 'L₃' }
                ].map(p => (
                  <g key={`b-right-${p.name}`}>
                    <circle cx="400" cy={p.y} r="14" fill="#db2777" stroke="#fbcfe8" strokeWidth="2" />
                    <text x="400" y={p.y + 4} className="text-[10px] font-black fill-white" textAnchor="middle">{p.name}</text>
                  </g>
                ))}

                {/* Eredmény tábla */}
                <rect x="185" y="170" width="150" height="24" rx="5" fill="#f3e8ff" stroke="#c084fc" />
                <text x="260" y="186" className="text-[10.5px] font-black fill-purple-900" textAnchor="middle">
                  Élek száma: 3 · 3 = 9 él
                </text>
              </svg>
              <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300 mt-2">
                Páros gráfban nincs él egyazon csoporton belül. Ha az egyik osztályban <MathText text="n" />, a másikban <MathText text="m" /> csúcs van, a teljes kétparti gráf élszáma: <MathText text="e = n \cdot m" />.
              </div>
            </div>
          </div>

          {/* SVG ÁBRA 8: 4 Csapatos Bajnokság Körmérkőzés Gráfja */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span>Szemléltető Ábra: 4 Csapatos Bajnokság Irányított Mérkőzésgráfja (Ki kit győzött le?)</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <svg viewBox="0 0 500 190" className="w-full max-w-md h-auto select-none font-sans">
                <defs>
                  <marker id="tournArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
                  </marker>
                </defs>

                {/* Irányított nyilak (mérkőzések kimenetele: nyíl a győztestől a veszteshez) */}
                <line x1="160" y1="50" x2="330" y2="50" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tournArrow)" />
                <line x1="160" y1="50" x2="330" y2="135" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tournArrow)" />
                <line x1="160" y1="50" x2="160" y2="130" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tournArrow)" />
                <line x1="340" y1="50" x2="340" y2="130" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tournArrow)" />
                <line x1="340" y1="50" x2="175" y2="135" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tournArrow)" />
                <line x1="160" y1="140" x2="330" y2="140" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tournArrow)" />

                {/* 4 Csapat csomópontjai */}
                <g transform="translate(150, 50)">
                  <circle r="18" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                  <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">A</text>
                  <text x="-40" y="4" className="text-[9px] font-bold fill-indigo-700 dark:text-indigo-400">3 győzelem</text>
                </g>

                <g transform="translate(350, 50)">
                  <circle r="18" fill="#4338ca" stroke="#a5b4fc" strokeWidth="2.5" />
                  <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">B</text>
                  <text x="45" y="4" className="text-[9px] font-bold fill-indigo-700 dark:text-indigo-400">2 győzelem</text>
                </g>

                <g transform="translate(150, 140)">
                  <circle r="18" fill="#6366f1" stroke="#c7d2fe" strokeWidth="2.5" />
                  <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">C</text>
                  <text x="-40" y="4" className="text-[9px] font-bold fill-indigo-700 dark:text-indigo-400">1 győzelem</text>
                </g>

                <g transform="translate(350, 140)">
                  <circle r="18" fill="#94a3b8" stroke="#e2e8f0" strokeWidth="2.5" />
                  <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">D</text>
                  <text x="45" y="4" className="text-[9px] font-bold fill-slate-500">0 győzelem</text>
                </g>
              </svg>
              <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300 mt-2">
                Körmérkőzéses bajnokságban mindenki mindenkivel egyszer játszik &rarr; összes meccs: <MathText text="\frac{4 \cdot 3}{2} = 6" />.
                A győzelmek száma a kifoknak felel meg.
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          6. FEJEZET: TIPIKUS CSAPDÁK ÉS GYAKORI HIBÁK
          ========================================================================= */}
      <TheorySection
        number={6}
        title="Tipikus Csapdák és Gyakori Hibák"
        badge="Figyelem"
        badgeColor="rose"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm">
          {/* SVG ÁBRA 9: Az "n - 1 élű, de nem összefüggő gráf" csapdája */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-900/60 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Szemléltető Ábra: A „Csak az Élek Száma Nem Elég a Fához” Csapdája</span>
            </div>

            <div className="bg-rose-50/50 dark:bg-slate-850 p-3 rounded-xl border border-rose-200 dark:border-rose-900/40 flex flex-col items-center">
              <svg viewBox="0 0 500 150" className="w-full max-w-md h-auto select-none font-sans">
                {/* Bal komponens: Kör (3 csúcs, 3 él) */}
                <polygon points="120,35 70,105 170,105" fill="#fee2e2" stroke="#dc2626" strokeWidth="2.5" />
                <circle cx="120" cy="35" r="10" fill="#b91c1c" stroke="#fecaca" strokeWidth="2" />
                <circle cx="70" cy="105" r="10" fill="#b91c1c" stroke="#fecaca" strokeWidth="2" />
                <circle cx="170" cy="105" r="10" fill="#b91c1c" stroke="#fecaca" strokeWidth="2" />
                <text x="120" y="80" className="text-[10px] font-black fill-rose-900" textAnchor="middle">Kör (C₃)</text>

                {/* Jobb komponens: Izolált csúcs (1 csúcs, 0 él) */}
                <circle cx="340" cy="70" r="12" fill="#475569" stroke="#cbd5e1" strokeWidth="2.5" />
                <text x="340" y="74" className="text-[9px] font-black fill-white" textAnchor="middle">I</text>
                <text x="340" y="100" className="text-[9.5px] font-bold fill-slate-600" textAnchor="middle">Különálló pont</text>

                {/* Összegzés */}
                <rect x="50" y="120" width="400" height="24" rx="4" fill="#fff1f2" stroke="#f43f5e" />
                <text x="250" y="136" className="text-[10px] font-black fill-rose-950" textAnchor="middle">
                  n = 4 csúcs, e = 3 él (n - 1 él!) &rarr; MÉGSEM FA, mert NEM ÖSSZEFÜGGŐ és KÖRT TARTALMAZ!
                </text>
              </svg>
              <div className="text-[11px] font-bold text-rose-800 dark:text-rose-300 mt-1">
                A fához két feltétel KELL egyszerre: 1. Összefüggő LEGYEN ÉS 2. Körmentes LEGYEN! Önmagában az <MathText text="e = n - 1" /> nem garantálja a fát.
              </div>
            </div>
          </div>

          <TheoryTrapBox
            title="1. Csapda: Páratlan fokszámú csúcsok száma páratlan"
            wrong="Létezhet-e olyan 7 fős társaság, ahol mindenkinek pontosan 3 barátja van? Hibás válasz: Igen, mert 3 < 7."
            wrongExplanation="A kézfogási lemma szerint a fokszámok összege 7 · 3 = 21 lenne, ami páratlan szám!"
            correct="Helyes válasz: NEM létezhet. A fokszámok összege mindig páros (2 · e), és páratlan fokszámú csúcsból csak páros darab lehet (itt 7 db lenne)."
            correctExplanation="Ha egy feladatban az adott fokszámok összege páratlan, a gráf azonnal kizárható!"
            tip="Mindig add össze a fokszámokat fejben: ha páratlan, nem létezik!"
          />

          <TheoryTrapBox
            title="2. Csapda: Maximális fokszám egyszerű gráfban"
            wrong="Egy 6 csúcsú egyszerű gráfban lehet-e valamelyik csúcs fokszáma 6? Hibás válasz: Igen, ha mindenkihez fut él."
            wrongExplanation="Egy csúcs egyszerű gráfban nem köthető össze önmagával (nincs hurokél), és máshoz is csak legfeljebb 1 él futhat."
            correct="Helyes válasz: NEM, a maximális fokszám n - 1 = 5 lehet! Egy 6 fős társaságban legfeljebb 5 másik emberrel lehet kezet fogni."
            correctExplanation="Egyszerű n csúcsú gráfban minden fokszámra érvényes: 0 <= d(v) <= n - 1."
            tip="Egyszerű gráfban a legnagyobb lehetséges fokszám n - 1!"
          />

          <TheoryTrapBox
            title="3. Csapda: Kézfogások és a sorrend kérdése"
            wrong="5 ember kezet fog egymással. Hány kézfogás történik? Hibás számítás: 5 · 4 = 20."
            wrongExplanation="Az 5 · 4 azt jelentené, hogy A kezet fog B-vel és B kezet fog A-val két külön kézfogás."
            correct="Helyes válasz: (5 · 4) / 2 = 10 kézfogás történik."
            correctExplanation="A kézfogás kölcsönös (rendezetlen pár), ezért a szorzatot osztani kell 2-vel (teljes gráf élszáma)."
            tip="Kézfogásnál, körmérkőzésnél mindig osztunk 2-vel!"
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          7. FEJEZET: ÖSSZEFOGLALÓ RENDSZEREZŐ TÁBLÁZAT ÉS DÖNTÉSI FA
          ========================================================================= */}
      <TheorySection
        number={7}
        title="Összefoglaló Rendszerező Táblázat és Döntési Fa"
        badge="Áttekintés"
        badgeColor="teal"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
      >
        <TheoryTable
          headers={['Gráftípus', 'Jelölés', 'Csúcsok (n)', 'Élek Száma (e)', 'Csúcsok Fokszámai', 'Fő Jellemző']}
          rows={[
            [
              'Teljes gráf',
              'Kₙ',
              'n',
              'n(n-1) / 2',
              'Minden csúcs foka n - 1',
              'Bármely két csúcs össze van kötve'
            ],
            [
              'Körgráf',
              'Cₙ',
              'n (>= 3)',
              'n',
              'Minden csúcs foka 2 (2-reguláris)',
              'Egyetlen zárt körvonal'
            ],
            [
              'Útgráf',
              'Pₙ',
              'n',
              'n - 1',
              '2 db végpont foka 1; többi foka 2',
              'Körmentes lánc'
            ],
            [
              'Csillaggráf',
              'Sₙ',
              'n',
              'n - 1',
              '1 db centrum (d = n-1); n-1 db levél (d = 1)',
              'Minden él a centrumból indul'
            ],
            [
              'Fa (általános)',
              'Tₙ',
              'n',
              'n - 1',
              'Legalább 2 db levélcsúcs (d = 1)',
              'Összefüggő és körmentes'
            ],
            [
              'Teljes kétparti gráf',
              'Kₙ,ₘ',
              'n + m',
              'n · m',
              'n db csúcs foka m; m db csúcs foka n',
              'Csak a két halmaz között futnak élek'
            ]
          ]}
        />

        {/* SVG ÁBRA 10: Gráfelméleti Módszerválasztó Döntési Folyamatábra */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-black text-xs sm:text-sm">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Szemléltető Ábra: Gráfelméleti Feladatmegoldó Döntési Fa</span>
          </div>

          <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <svg viewBox="0 0 640 260" className="w-full min-w-[580px] h-auto select-none font-sans">
              <defs>
                <marker id="flowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#059669" />
                </marker>
                <marker id="flowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                </marker>
              </defs>

              {/* Felső Start Csomópont */}
              <rect x="220" y="8" width="200" height="36" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="320" y="24" className="text-[10px] font-bold fill-sky-300" textAnchor="middle">FELADAT ELEMZÉSE</text>
              <text x="320" y="37" className="text-[11.5px] font-black fill-white" textAnchor="middle">Milyen kérdést kaptunk?</text>

              {/* 2 Ág: Fokszámok létezése vs. Élszámolás */}
              <path d="M 280 44 C 200 65, 160 75, 140 90" fill="none" stroke="#2563eb" strokeWidth="2" markerEnd="url(#flowBlue)" />
              <path d="M 360 44 C 440 65, 480 75, 500 90" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#flowGreen)" />

              {/* Bal Ág: Létezhet-e a gráf? */}
              <rect x="50" y="90" width="180" height="40" rx="8" fill="#2563eb" stroke="#93c5fd" />
              <text x="140" y="106" className="text-[10px] font-bold fill-blue-100" textAnchor="middle">1. LÉTEZHET-E A GRÁF?</text>
              <text x="140" y="122" className="text-[12px] font-black fill-white" textAnchor="middle">Euler-tétel ellenőrzése</text>

              {/* Jobb Ág: Hány él van? */}
              <rect x="410" y="90" width="180" height="40" rx="8" fill="#059669" stroke="#6ee7b7" />
              <text x="500" y="106" className="text-[10px] font-bold fill-emerald-100" textAnchor="middle">2. HÁNY ÉLE VAN A GRÁFNAK?</text>
              <text x="500" y="122" className="text-[12px] font-black fill-white" textAnchor="middle">Típus szerinti képlet</text>

              {/* Bal alsó kártyák */}
              <rect x="15" y="155" width="115" height="85" rx="8" fill="#eff6ff" stroke="#3b82f6" />
              <text x="72" y="174" className="text-[10px] font-black fill-blue-900" textAnchor="middle">Fokszámösszeg</text>
              <text x="72" y="194" className="text-[12px] font-black fill-blue-700" textAnchor="middle">&sum; d(v) páros?</text>
              <text x="72" y="214" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">Ha páratlan &rarr;</text>
              <text x="72" y="228" className="text-[9.5px] font-extrabold fill-rose-700" textAnchor="middle">LEHETETLEN!</text>

              <rect x="145" y="155" width="115" height="85" rx="8" fill="#ede9fe" stroke="#7c3aed" />
              <text x="202" y="174" className="text-[10px] font-black fill-purple-900" textAnchor="middle">Max fokszám</text>
              <text x="202" y="194" className="text-[12px] font-black fill-purple-700" textAnchor="middle">d(v) &le; n - 1?</text>
              <text x="202" y="214" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">Egyszerű gráfban</text>
              <text x="202" y="228" className="text-[9.5px] font-bold fill-purple-900" textAnchor="middle">nem lehet &ge; n</text>

              {/* Jobb alsó kártyák */}
              <rect x="350" y="155" width="130" height="85" rx="8" fill="#ecfdf5" stroke="#10b981" />
              <text x="415" y="174" className="text-[10px] font-black fill-emerald-900" textAnchor="middle">Mindenki mindenkivel</text>
              <text x="415" y="194" className="text-[12px] font-black fill-emerald-700" textAnchor="middle">e = n(n-1) / 2</text>
              <text x="415" y="214" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">Kézfogások, meccsek,</text>
              <text x="415" y="228" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">teljes gráf (Kₙ)</text>

              <rect x="495" y="155" width="130" height="85" rx="8" fill="#fefce8" stroke="#eab308" />
              <text x="560" y="174" className="text-[10px] font-black fill-amber-900" textAnchor="middle">Összefüggő fa</text>
              <text x="560" y="194" className="text-[12px] font-black fill-amber-700" textAnchor="middle">e = n - 1</text>
              <text x="560" y="214" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">Körmentes hálózat,</text>
              <text x="560" y="228" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">vízvezeték, fadiagram</text>
            </svg>
          </div>
          <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300">
            A gráfelméleti feladatok megoldásának kulcsa a fokszámok összegének vizsgálata (Euler-tétel) és a gráf struktúrájának (teljes, fa vagy kör) azonosítása!
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          8. FEJEZET: GYORS ÖNELLENŐRZŐ MINI KVÍZ
          ========================================================================= */}
      <TheorySection
        number={8}
        title="Gyors Önellenőrző Kvíz"
        badge="Teszteld magad!"
        badgeColor="amber"
        icon={<HelpCircle className="w-5 h-5 text-amber-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm">
          {/* 1. Kérdés */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              1. Létezhet-e olyan egyszerű gráf, amelynek csúcsfokszámai: 3, 3, 3, 1?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Igen, megrajzolható', isCorrect: false },
                { label: 'Nem, mert a fokszámok összege 10, de egy 4 csúcsú gráfban a maximális fokszám legfeljebb 3 lehet', isCorrect: false },
                { label: 'Nem, mert 4 csúcs esetén a maximális fokszám 3 lehet ugyan, de a fokszámokból nem lehet 3 db 3-as és 1 db 1-es (ha három csúcs mindenkihez kapcsolódik, a negyedik foka legalább 3)', isCorrect: true },
                { label: 'Nem, mert a fokszámok összege páratlan', isCorrect: false }
              ].map((opt, idx) => (
                <button
                  key={`g-q1-opt-${idx}`}
                  onClick={() => setQuiz1Answer(idx)}
                  className={`p-2.5 rounded-lg border text-left font-bold transition-all text-xs ${
                    quiz1Answer === idx
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300'
                      : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <div className={`p-2 rounded text-xs font-semibold ${quiz1Answer === 2 ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40' : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40'}`}>
                {quiz1Answer === 2
                  ? 'Kiváló logika! Bár a fokszámok összege 3+3+3+1 = 10 páros, ha három csúcs foka 3 egy 4 csúcsú egyszerű gráfban, akkor mindháromnak össze kell lennie kötve a negyedikkel is, így a negyedik foka legalább 3 lenne!'
                  : 'Gondold végig a csúcsok kapcsolatait! Bár az összeg (10) páros, 4 csúcsnál ha három csúcs mindenkivel össze van kötve, a 4. csúcs foka nem lehet csak 1.'}
              </div>
            )}
          </div>

          {/* 2. Kérdés */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              2. Egy 7 csúcsú fa alakú számítógépes hálózatban hány kábelre (élre) van szükség az összes gép összekötéséhez?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: '6 kábel', isCorrect: true },
                { label: '7 kábel', isCorrect: false },
                { label: '21 kábel', isCorrect: false }
              ].map((opt, idx) => (
                <button
                  key={`g-q2-opt-${idx}`}
                  onClick={() => setQuiz2Answer(idx)}
                  className={`p-2.5 rounded-lg border text-left font-bold transition-all text-xs ${
                    quiz2Answer === idx
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300'
                      : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <div className={`p-2 rounded text-xs font-semibold ${quiz2Answer === 0 ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40' : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40'}`}>
                {quiz2Answer === 0
                  ? 'Helyes! A fa tétel szerint minden n csúcsú fa éleinek száma e = n - 1. Tehát 7 csúcsnál pontosan 7 - 1 = 6 élre van szükség.'
                  : 'Hibás! A fa definíciója szerint egy összefüggő körmentes hálózatban n csúcshoz pontosan n - 1 él tartozik (7 - 1 = 6).'}
              </div>
            )}
          </div>

          {/* 3. Kérdés */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              3. Egy 6 fős társaságban mindenki mindenkivel kezet fog. Hány kézfogás történik összesen?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: '30 kézfogás', isCorrect: false },
                { label: '15 kézfogás', isCorrect: true },
                { label: '12 kézfogás', isCorrect: false }
              ].map((opt, idx) => (
                <button
                  key={`g-q3-opt-${idx}`}
                  onClick={() => setQuiz3Answer(idx)}
                  className={`p-2.5 rounded-lg border text-left font-bold transition-all text-xs ${
                    quiz3Answer === idx
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300'
                      : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <div className={`p-2 rounded text-xs font-semibold ${quiz3Answer === 1 ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40' : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40'}`}>
                {quiz3Answer === 1
                  ? 'Tökéletes! Ez a K₆ teljes gráf élszáma: e = (6 · 5) / 2 = 15 kézfogás.'
                  : 'Ne felejtsd el elosztani kettővel! Az 6 · 5 = 30-ban minden kézfogást kétszer számolnánk (mindkét résztvevő felől), így (6 · 5) / 2 = 15.'}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GraphsTheory;
