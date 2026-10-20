import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Shapes,
  Puzzle,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Circle,
  Square,
  Triangle,
  Lightbulb,
  Dice5,
  Binary
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface LogicGamesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const LogicGamesTheory: React.FC<LogicGamesTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // =========================================================================
  // 1. Interaktív Logikai Készlet (Dienes-lap) és Különbség Kereső
  // =========================================================================
  type Shape = 'kor' | 'negyzet' | 'haromszog' | 'teglalap';
  type Color = 'piros' | 'sarga' | 'kek' | 'zold';
  type Size = 'nagy' | 'kicsi';
  type Hole = 'lyukas' | 'teli';

  interface DienesPiece {
    shape: Shape;
    color: Color;
    size: Size;
    hole: Hole;
  }

  const [currentPiece, setCurrentPiece] = useState<DienesPiece>({
    shape: 'kor',
    color: 'piros',
    size: 'nagy',
    hole: 'teli'
  });

  const [candidatePiece, setCandidatePiece] = useState<DienesPiece>({
    shape: 'haromszog',
    color: 'piros',
    size: 'kicsi',
    hole: 'teli'
  });

  const countDifferences = (a: DienesPiece, b: DienesPiece): { diffCount: number; details: string[] } => {
    const details: string[] = [];
    if (a.shape !== b.shape) details.push(`Forma: ${a.shape} ≠ ${b.shape}`);
    if (a.color !== b.color) details.push(`Szín: ${a.color} ≠ ${b.color}`);
    if (a.size !== b.size) details.push(`Méret: ${a.size} ≠ ${b.size}`);
    if (a.hole !== b.hole) details.push(`Lyukasság: ${a.hole} ≠ ${b.hole}`);
    return { diffCount: details.length, details };
  };

  const diffResult = countDifferences(currentPiece, candidatePiece);

  // Színek leképezése
  const getColorHex = (c: Color): { bg: string; border: string; text: string } => {
    switch (c) {
      case 'piros': return { bg: '#ef4444', border: '#b91c1c', text: 'Piros' };
      case 'sarga': return { bg: '#eab308', border: '#a16207', text: 'Sárga' };
      case 'kek': return { bg: '#3b82f6', border: '#1d4ed8', text: 'Kék' };
      case 'zold': return { bg: '#22c55e', border: '#15803d', text: 'Zöld' };
    }
  };

  const renderDienesSvg = (piece: DienesPiece, sizeMultiplier: number = 1) => {
    const isLarge = piece.size === 'nagy';
    const baseW = isLarge ? 80 * sizeMultiplier : 50 * sizeMultiplier;
    const baseH = isLarge ? 80 * sizeMultiplier : 50 * sizeMultiplier;
    const colorInfo = getColorHex(piece.color);
    const isHole = piece.hole === 'lyukas';

    return (
      <svg
        className="mx-auto drop-shadow-md transition-all duration-300"
        width={100 * sizeMultiplier}
        height={100 * sizeMultiplier}
        viewBox="0 0 100 100"
      >
        <defs>
          <mask id={`hole-mask-${piece.shape}-${piece.color}-${piece.size}-${piece.hole}-${sizeMultiplier}`}>
            <rect x="0" y="0" width="100" height="100" fill="white" />
            {isHole && <circle cx="50" cy="50" r={isLarge ? 12 : 7} fill="black" />}
          </mask>
        </defs>

        <g mask={`url(#hole-mask-${piece.shape}-${piece.color}-${piece.size}-${piece.hole}-${sizeMultiplier})`}>
          {piece.shape === 'kor' && (
            <circle
              cx="50"
              cy="50"
              r={baseW / 2}
              fill={colorInfo.bg}
              stroke={colorInfo.border}
              strokeWidth="3"
            />
          )}
          {piece.shape === 'negyzet' && (
            <rect
              x={50 - baseW / 2}
              y={50 - baseH / 2}
              width={baseW}
              height={baseH}
              rx="4"
              fill={colorInfo.bg}
              stroke={colorInfo.border}
              strokeWidth="3"
            />
          )}
          {piece.shape === 'haromszog' && (
            <polygon
              points={`50,${50 - baseH / 2} ${50 + baseW / 2},${50 + baseH / 2} ${50 - baseW / 2},${50 + baseH / 2}`}
              fill={colorInfo.bg}
              stroke={colorInfo.border}
              strokeWidth="3"
            />
          )}
          {piece.shape === 'teglalap' && (
            <rect
              x={50 - (baseW * 1.2) / 2}
              y={50 - (baseH * 0.7) / 2}
              width={baseW * 1.2}
              height={baseH * 0.7}
              rx="4"
              fill={colorInfo.bg}
              stroke={colorInfo.border}
              strokeWidth="3"
            />
          )}
        </g>
        {isHole && (
          <circle
            cx="50"
            cy="50"
            r={isLarge ? 12 : 7}
            fill="none"
            stroke={colorInfo.border}
            strokeWidth="2"
            strokeDasharray="2,2"
          />
        )}
      </svg>
    );
  };

  // =========================================================================
  // 2. Interaktív Venn-diagram Szemléltető (Számok és Metszetek)
  // =========================================================================
  type VennHighlight = 'all' | 'onlyA' | 'intersection' | 'onlyB' | 'outside' | 'union';
  const [vennMode, setVennMode] = useState<VennHighlight>('all');

  // Számok 1-től 16-ig
  // A halmaz: Páros számok {2, 4, 6, 8, 10, 12, 14, 16}
  // B halmaz: 3-mal osztható számok {3, 6, 9, 12, 15}
  // Metszet (A és B): {6, 12}
  // Csak A: {2, 4, 8, 10, 14, 16}
  // Csak B: {3, 9, 15}
  // Kívül (Egyik sem): {1, 5, 7, 11, 13}

  return (
    <TheoryTemplate
      title="1. Játékok és Logikai Feladványok"
      subtitle="A logikai készlet 4 tulajdonsága, különbségi játékok, halmazműveletek (metszet, unió) és Venn-diagramok 5. osztályban"
      themeColor="purple"
      badgeText="5. OSZTÁLY • VII. TÉMAKÖR: ADATGYŰJTÉS, STATISZTIKA • 📖 TANANYAG"
      documentId="grade-5-jatekok-theory"
      pdfFilename="5_osztaly_VII_1_jatekok_logika_tananyag.pdf"
      practiceTitle="Készen állsz a logikai feladványok és halmazok gyakorlására?"
      practiceSubtitle="Teszteld tudásodat a Dienes-készletről, metszetről, unióról és a skatulya-elvről!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
    >
      {/* 1. RÉSZ: A LOGIKAI KÉSZLET */}
      <TheorySection
        title="1. A Dienes-féle Logikai Készlet és a 4 Tulajdonság"
        icon={<Puzzle className="w-5 h-5" />}
        badge="Alapfogalmak"
      >
        <TheoryCallout
          variant="info"
          title="Mi az a logikai készlet és mire használjuk?"
        >
          A matematika és a statisztika egyik legfontosabb alaptevékenysége az <strong>adatok és tárgyak csoportosítása</strong>,
          közös tulajdonságaik szerinti szétválogatása. A Dienes Zoltán által kifejlesztett logikai készlet
          olyan műanyag lapokból áll, ahol minden egyes lap pontosan meghatározott tulajdonságokkal rendelkezik.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <TheoryCard
            title="1. Forma"
            icon={<Shapes className="w-5 h-5 text-purple-600" />}
            badge="4 féle"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              A készlet 4 különböző geometriai síkidomot tartalmaz:
            </p>
            <ul className="text-xs space-y-1 mt-2 text-slate-700 dark:text-slate-200">
              <li>• <strong>Kör</strong> (nincs éle, nincs csúcsa)</li>
              <li>• <strong>Négyzet</strong> (4 egyenlő oldal, 4 derékszög)</li>
              <li>• <strong>Háromszög</strong> (3 oldal, 3 csúcs)</li>
              <li>• <strong>Téglalap</strong> (szemközti oldalak egyenlők)</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="2. Szín"
            icon={<Sparkles className="w-5 h-5 text-pink-600" />}
            badge="4 féle"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Minden forma 4 ragyogó alapszínben fordul elő:
            </p>
            <div className="flex gap-2 mt-3">
              <span className="w-6 h-6 rounded-full bg-red-500 border border-red-700 inline-block shadow-sm" title="Piros" />
              <span className="w-6 h-6 rounded-full bg-yellow-400 border border-yellow-600 inline-block shadow-sm" title="Sárga" />
              <span className="w-6 h-6 rounded-full bg-blue-500 border border-blue-700 inline-block shadow-sm" title="Kék" />
              <span className="w-6 h-6 rounded-full bg-green-500 border border-green-700 inline-block shadow-sm" title="Zöld" />
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Méret"
            icon={<Layers className="w-5 h-5 text-indigo-600" />}
            badge="2 féle"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Kétféle nagyságrendű lap létezik:
            </p>
            <ul className="text-xs space-y-1 mt-2 text-slate-700 dark:text-slate-200">
              <li>• <strong>Nagy méretű</strong> (kétszeres felület)</li>
              <li>• <strong>Kis méretű</strong> (kisebb kiterjedés)</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="4. Lyukasság"
            icon={<Circle className="w-5 h-5 text-teal-600" />}
            badge="2 féle"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              A lapok közepe szerint két csoport van:
            </p>
            <ul className="text-xs space-y-1 mt-2 text-slate-700 dark:text-slate-200">
              <li>• <strong>Teli</strong> (nincs rajta lyuk)</li>
              <li>• <strong>Lyukas</strong> (közepén kör alakú nyílás)</li>
            </ul>
          </TheoryCard>
        </div>

        <FormulaBox
          title="Hány lapból áll a teljes logikai készlet?"
          formula="Összesen = 4 \times 4 \times 2 \times 2 = 64\text{ lap}"
          description="Minden lehetséges tulajdonság-kombinációból (4 forma × 4 szín × 2 méret × 2 lyukasság) pontosan 1 darab lap található a készletben! Nincs két teljesen azonos lap."
          color="purple"
        />

        {/* INTERAKTÍV KÜLÖNBSÉGI SZIMULÁTOR */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-xl bg-purple-600 text-white">
              <Puzzle className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-purple-950 dark:text-purple-200">
              Interaktív Különbség-Kereső Játék
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            A „különbségi játékokban” azt vizsgáljuk, hogy két lap hány tulajdonságban tér el egymástól.
            Válaszd ki az <strong>alaplapot</strong>, majd állíts be egy <strong>összehasonlító lapot</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* 1. Alaplap */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 flex flex-col items-center">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">
                1. Kártya (Alaplap)
              </span>
              <div className="h-32 flex items-center justify-center">
                {renderDienesSvg(currentPiece, 1.2)}
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 capitalize mt-2">
                {currentPiece.size} {currentPiece.color} {currentPiece.hole} {currentPiece.shape}
              </div>

              {/* Módosító gombok */}
              <div className="grid grid-cols-4 gap-1 mt-4 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setCurrentPiece(p => ({
                    ...p,
                    shape: p.shape === 'kor' ? 'negyzet' : p.shape === 'negyzet' ? 'haromszog' : p.shape === 'haromszog' ? 'teglalap' : 'kor'
                  }))}
                >
                  Forma
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setCurrentPiece(p => ({
                    ...p,
                    color: p.color === 'piros' ? 'sarga' : p.color === 'sarga' ? 'kek' : p.color === 'kek' ? 'zold' : 'piros'
                  }))}
                >
                  Szín
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setCurrentPiece(p => ({
                    ...p,
                    size: p.size === 'nagy' ? 'kicsi' : 'nagy'
                  }))}
                >
                  Méret
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setCurrentPiece(p => ({
                    ...p,
                    hole: p.hole === 'lyukas' ? 'teli' : 'lyukas'
                  }))}
                >
                  Lyuk
                </Button>
              </div>
            </div>

            {/* 2. Összehasonlító lap */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 flex flex-col items-center">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
                2. Kártya (Összehasonlító)
              </span>
              <div className="h-32 flex items-center justify-center">
                {renderDienesSvg(candidatePiece, 1.2)}
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 capitalize mt-2">
                {candidatePiece.size} {candidatePiece.color} {candidatePiece.hole} {candidatePiece.shape}
              </div>

              {/* Módosító gombok */}
              <div className="grid grid-cols-4 gap-1 mt-4 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setCandidatePiece(p => ({
                    ...p,
                    shape: p.shape === 'kor' ? 'negyzet' : p.shape === 'negyzet' ? 'haromszog' : p.shape === 'haromszog' ? 'teglalap' : 'kor'
                  }))}
                >
                  Forma
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setCandidatePiece(p => ({
                    ...p,
                    color: p.color === 'piros' ? 'sarga' : p.color === 'sarga' ? 'kek' : p.color === 'kek' ? 'zold' : 'piros'
                  }))}
                >
                  Szín
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setCandidatePiece(p => ({
                    ...p,
                    size: p.size === 'nagy' ? 'kicsi' : 'nagy'
                  }))}
                >
                  Méret
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => setCandidatePiece(p => ({
                    ...p,
                    hole: p.hole === 'lyukas' ? 'teli' : 'lyukas'
                  }))}
                >
                  Lyuk
                </Button>
              </div>
            </div>
          </div>

          {/* Eredmény kiértékelés */}
          <div className="mt-6 p-4 rounded-xl bg-purple-100/80 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-purple-900 dark:text-purple-200">
                Különbség mértéke:{' '}
                <span className="text-lg px-2 py-0.5 rounded bg-purple-600 text-white font-extrabold ml-1">
                  {diffResult.diffCount} tulajdonság
                </span>
              </div>
              <div className="text-xs text-purple-800 dark:text-purple-300 mt-1">
                {diffResult.diffCount === 0 && 'A két kártya teljesen megegyezik!'}
                {diffResult.diffCount === 1 && 'Egykülönbséges pár: pontosan 1 dologban térnek el.'}
                {diffResult.diffCount === 2 && 'Kétkülönbséges pár: 2 tulajdonság egyezik, 2 eltér.'}
                {diffResult.diffCount === 3 && 'Háromkülönbséges pár: csak 1 közös tulajdonságuk maradt.'}
                {diffResult.diffCount === 4 && 'Teljes ellentétpár: minden tulajdonságuk különbözik!'}
              </div>
            </div>
            {diffResult.details.length > 0 && (
              <div className="text-xs text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-800">
                <strong>Eltérések:</strong> {diffResult.details.join(', ')}
              </div>
            )}
          </div>
        </div>

        <TheoryTrapBox
          title="Gyakori Csapda: A négyzet és a téglalap a készletben"
          trap="A geometriában minden négyzet téglalap is, de a logikai készletben a „téglalap” feliratú lapok olyan téglalapok, amelyeknek a szomszédos oldalai nem egyenlők (nem négyzetek)!"
          correction="A logikai készletben a 4 forma (kör, négyzet, háromszög, téglalap) 4 teljesen különálló kategóriát alkot, nincsenek átfedésben!"
        />
      </TheorySection>

      {/* 2. RÉSZ: HALMAZOK ÉS VENN-DIAGRAMOK */}
      <TheorySection
        title="2. Halmazok, Halmazműveletek és a Venn-diagram"
        icon={<Circle className="w-5 h-5" />}
        badge="Halmazelmélet alapok"
      >
        <TheoryCallout
          variant="tip"
          title="Mi az a halmaz?"
        >
          A matematikában a <strong>halmaz</strong> bizonyos dolgoknak, elemeknek olyan összessége,
          amelyről <strong>egyértelműen eldönthető</strong> minden dologról, hogy beletartozik-e vagy sem.
          Például: „a 10-nél kisebb páros számok” halmazt alkotnak, de „a szép virágok” nem alkotnak halmazt, mert a szépség ízlés dolga.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <TheoryCard
            title="Elem és Nem elem"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            badge="Jelölések"
          >
            <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">x ∈ A</span>
                <div>
                  <strong>Eleme:</strong> Az x beletartozik az A halmazba.<br />
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Pl.: 4 ∈ Páros számok</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 shrink-0">y ∉ A</span>
                <div>
                  <strong>Nem eleme:</strong> Nem tartozik bele.<br />
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Pl.: 5 ∉ Páros számok</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 shrink-0">∅</span>
                <div>
                  <strong>Üres halmaz:</strong> Egyetlen eleme sincs.<br />
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Pl.: 1-nél kisebb természetes számok</span>
                </div>
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Metszet (Közös rész)"
            icon={<Binary className="w-5 h-5 text-indigo-600" />}
            badge="A ∩ B (ÉS)"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Azon elemek összessége, amelyek <strong>mindkét</strong> halmaznak egyszerre elemei:
            </p>
            <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-900 dark:text-indigo-200 my-2 flex items-center gap-2">
              <span className="font-mono text-sm px-2 py-0.5 rounded bg-indigo-200/70 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100">A ∩ B</span>
              <span>A és B közös része (ÉS)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Példa: Piros lapok ÉS Körök metszete = Piros körök.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Unió (Egyesítés)"
            icon={<Layers className="w-5 h-5 text-pink-600" />}
            badge="A ∪ B (VAGY)"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Azon elemek, amelyek <strong>legalább az egyik</strong> halmazban benne vannak:
            </p>
            <div className="p-2.5 rounded-lg bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 text-xs font-bold text-pink-900 dark:text-pink-200 my-2 flex items-center gap-2">
              <span className="font-mono text-sm px-2 py-0.5 rounded bg-pink-200/70 dark:bg-pink-900 text-pink-900 dark:text-pink-100">A ∪ B</span>
              <span>A és B egyesítése (VAGY)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Példa: Olyan lapok, amelyek pirosak VAGY körök (vagy mindkettő).
            </p>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV VENN-DIAGRAM SZEMLÉLTETŐ */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-xl bg-indigo-600 text-white">
              <Circle className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-indigo-950 dark:text-indigo-200">
              Interaktív Venn-diagram: Számok Szétválogatása 1-től 16-ig
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            Vizsgáljuk a számokat 1-től 16-ig! Legyen <strong className="text-blue-600">A = Páros számok</strong>, és{' '}
            <strong className="text-purple-600">B = 3-mal osztható számok</strong>. Kattints az alábbi gombokra a különböző területek kiemeléséhez!
          </p>

          {/* Gombok a tartományokhoz */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <Button
              size="sm"
              variant={vennMode === 'all' ? 'default' : 'outline'}
              className="text-xs"
              onClick={() => setVennMode('all')}
            >
              Minden tartomány
            </Button>
            <Button
              size="sm"
              variant={vennMode === 'onlyA' ? 'default' : 'outline'}
              className="text-xs border-blue-400 text-blue-700 dark:text-blue-300"
              onClick={() => setVennMode('onlyA')}
            >
              Csak az A halmaz (Páros, de nem 3-mal osztható)
            </Button>
            <Button
              size="sm"
              variant={vennMode === 'intersection' ? 'default' : 'outline'}
              className="text-xs border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-200 font-bold"
              onClick={() => {
                setVennMode('intersection');
                confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
              }}
            >
              Metszet A ∩ B (Páros ÉS 3-mal osztható: 6, 12)
            </Button>
            <Button
              size="sm"
              variant={vennMode === 'onlyB' ? 'default' : 'outline'}
              className="text-xs border-purple-400 text-purple-700 dark:text-purple-300"
              onClick={() => setVennMode('onlyB')}
            >
              Csak a B halmaz (3-mal osztható páratlanok)
            </Button>
            <Button
              size="sm"
              variant={vennMode === 'outside' ? 'default' : 'outline'}
              className="text-xs border-slate-400 text-slate-700 dark:text-slate-300"
              onClick={() => setVennMode('outside')}
            >
              Kívül lévők (Egyik sem)
            </Button>
            <Button
              size="sm"
              variant={vennMode === 'union' ? 'default' : 'outline'}
              className="text-xs border-pink-500 text-pink-700 dark:text-pink-300 font-bold"
              onClick={() => setVennMode('union')}
            >
              Unió A ∪ B (Bármelyikben benne van)
            </Button>
          </div>

          {/* SVG Venn diagram */}
          <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-inner">
            <svg viewBox="0 0 400 240" className="w-full h-auto">
              {/* Alaphalmaz doboza */}
              <rect
                x="10"
                y="10"
                width="380"
                height="220"
                rx="12"
                fill={vennMode === 'outside' ? '#f1f5f9' : '#fafafa'}
                className="dark:fill-slate-950"
                stroke={vennMode === 'outside' ? '#64748b' : '#cbd5e1'}
                strokeWidth={vennMode === 'outside' ? '3' : '1.5'}
              />
              <text x="25" y="32" fontSize="12" fontWeight="bold" fill="#64748b">
                Alaphalmaz: Számok 1-től 16-ig
              </text>

              {/* A kör (Páros) */}
              <circle
                cx="150"
                cy="125"
                r="85"
                fill={
                  vennMode === 'onlyA' || vennMode === 'union'
                    ? '#bfdbfe'
                    : '#93c5fd'
                }
                fillOpacity={
                  vennMode === 'onlyB' || vennMode === 'outside'
                    ? 0.15
                    : vennMode === 'onlyA' || vennMode === 'union'
                    ? 0.55
                    : 0.35
                }
                stroke="#2563eb"
                strokeWidth={vennMode === 'onlyA' || vennMode === 'union' ? '3' : '2'}
              />
              <text x="95" y="65" fontSize="13" fontWeight="bold" fill="#1d4ed8">
                A: Páros
              </text>

              {/* B kör (3-mal osztható) */}
              <circle
                cx="250"
                cy="125"
                r="85"
                fill={
                  vennMode === 'onlyB' || vennMode === 'union'
                    ? '#e9d5ff'
                    : '#c084fc'
                }
                fillOpacity={
                  vennMode === 'onlyA' || vennMode === 'outside'
                    ? 0.15
                    : vennMode === 'onlyB' || vennMode === 'union'
                    ? 0.55
                    : 0.35
                }
                stroke="#9333ea"
                strokeWidth={vennMode === 'onlyB' || vennMode === 'union' ? '3' : '2'}
              />
              <text x="260" y="65" fontSize="13" fontWeight="bold" fill="#7e22ce">
                B: 3-mal oszt.
              </text>

              {/* Metszet kiemelése */}
              {(vennMode === 'intersection' || vennMode === 'union') && (
                <path
                  d="M 200 68 A 85 85 0 0 1 200 182 A 85 85 0 0 1 200 68 Z"
                  fill="#818cf8"
                  fillOpacity="0.75"
                  stroke="#4f46e5"
                  strokeWidth="2.5"
                />
              )}

              {/* Számok elhelyezése */}
              {/* Csak A: 2, 4, 8, 10, 14, 16 */}
              <g fontSize="13" fontWeight="bold" fill={vennMode === 'onlyA' ? '#1d4ed8' : '#334155'} className="dark:fill-slate-200">
                <text x="105" y="105">2</text>
                <text x="135" y="100">4</text>
                <text x="100" y="135">8</text>
                <text x="130" y="140">10</text>
                <text x="95" y="165">14</text>
                <text x="130" y="170">16</text>
              </g>

              {/* Metszet (A és B): 6, 12 */}
              <g fontSize="14" fontWeight="extrabold" fill={vennMode === 'intersection' ? '#ffffff' : '#312e81'} className="dark:fill-indigo-100">
                <text x="195" y="115" textAnchor="middle">6</text>
                <text x="195" y="145" textAnchor="middle">12</text>
              </g>

              {/* Csak B: 3, 9, 15 */}
              <g fontSize="13" fontWeight="bold" fill={vennMode === 'onlyB' ? '#7e22ce' : '#334155'} className="dark:fill-slate-200">
                <text x="270" y="110">3</text>
                <text x="295" y="135">9</text>
                <text x="265" y="160">15</text>
              </g>

              {/* Kívül: 1, 5, 7, 11, 13 */}
              <g fontSize="13" fontWeight="bold" fill={vennMode === 'outside' ? '#0f172a' : '#64748b'} className="dark:fill-slate-400">
                <text x="35" y="70">1</text>
                <text x="340" y="70">5</text>
                <text x="40" y="200">7</text>
                <text x="330" y="200">11</text>
                <text x="190" y="215">13</text>
              </g>
            </svg>
          </div>

          <div className="mt-4 text-center text-xs text-slate-600 dark:text-slate-300">
            {vennMode === 'all' && 'Látod mind a 4 tartományt: Csak A (6 db), Metszet (2 db), Csak B (3 db) és Kívül (5 db). Összesen: 6 + 2 + 3 + 5 = 16 szám!'}
            {vennMode === 'onlyA' && 'A páros számok közül kivettük azokat, amelyek 3-mal is oszthatók (a 6-ot és 12-t). Maradt 6 db szám.'}
            {vennMode === 'intersection' && 'A metszetbe azok kerültek, amelyek PÁROSAK ÉS 3-MAL OSZTHATÓK is (vagyis 6-tal oszthatók): a 6 és a 12!'}
            {vennMode === 'onlyB' && 'A 3-mal osztható számok közül csak a páratlanok: 3, 9, 15 (3 db szám).'}
            {vennMode === 'outside' && 'Ezek sem párosak, sem 3-mal nem oszthatók: 1, 5, 7, 11, 13 (5 db szám).'}
            {vennMode === 'union' && 'Az unióba beletartozik minden szám, ami legalább az egyik karikában benne van: 6 + 2 + 3 = 11 db szám.'}
          </div>
        </div>

        <ExampleBox
          title="Gyakorlati Példa: Halmazok elemeinek száma (|A ∪ B| képlete)"
          problem="Egy 25 fős osztályban 16 tanuló kosárlabdázik, 14 tanuló focizik, és 8-an mindkét sportot űzik. Hányan sportolnak legalább az egyik sportágban, és hányan nem sportolnak egyikben sem?"
          steps={[
            {
              label: '1. Lépés: Metszet beírása a Venn-diagramba',
              value: 'A közös rész (mindkettőt űzik) = 8 fő.'
            },
            {
              label: '2. Lépés: Csak az egyik sportot űzők kiszámítása',
              value: 'Csak kosarasok = 16 − 8 = 8 fő. Csak focisták = 14 − 8 = 6 fő.'
            },
            {
              label: '3. Lépés: Az unió (összes sportoló) meghatározása',
              value: 'Összes sportoló = Csak kosár (8) + Metszet (8) + Csak foci (6) = 22 fő.'
            },
            {
              label: '4. Lépés: Kívül lévők (nem sportolók)',
              value: 'Nem sportolók = 25 − 22 = 3 fő.'
            }
          ]}
        />
      </TheorySection>

      {/* 3. RÉSZ: CARROLL-DIAGRAM ÉS TÁBLÁZATOS ELRENDEZÉS */}
      <TheorySection
        title="3. A Carroll-diagram: Kétszer kettes táblázat"
        icon={<Binary className="w-5 h-5" />}
        badge="Rendszerezés"
      >
        <TheoryCallout
          variant="info"
          title="Lewis Carroll találmánya"
        >
          A híres író és matematikus, Lewis Carroll (az <em>Alice Csodaországban</em> szerzője) javasolta,
          hogy két tulajdonság és azok ellentettjei alapján készítsünk egy kétdimenziós táblázatot.
          Ez a <strong>Carroll-diagram</strong>.
        </TheoryCallout>

        <p className="text-sm text-slate-700 dark:text-slate-300 my-4">
          Nézzük meg ugyanazt a fenti 16 számot Carroll-diagramban rendezve:
        </p>

        <TheoryTable
          headers={['Tulajdonság', '3-mal osztható (B)', '3-mal NEM osztható (nem B)', 'Összesen']}
          rows={[
            ['Páros (A)', '6, 12 (2 db)', '2, 4, 8, 10, 14, 16 (6 db)', '8 db páros'],
            ['Páratlan (nem A)', '3, 9, 15 (3 db)', '1, 5, 7, 11, 13 (5 db)', '8 db páratlan'],
            ['Összesen', '5 db 3-mal oszt.', '11 db nem 3-mal oszt.', '16 db összesen']
          ]}
        />

        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 my-4 space-y-1">
          <div>• <strong>A Carroll-diagram nagy előnye:</strong> A sorok és oszlopok összegei azonnal ellenőrizhetők!</div>
          <div>• Sorok összege: 2 + 6 = 8 és 3 + 5 = 8, mindkettő összege 8 + 8 = 16.</div>
          <div>• Oszlopok összege: 2 + 3 = 5 és 6 + 5 = 11, mindkettő összege 5 + 11 = 16.</div>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: LOGIKAI JÁTÉKOK, REJTVÉNYEK ÉS STRATÉGIÁK */}
      <TheorySection
        title="4. Logikai Játékok, Rejtvények és Gondolkodási Stratégiák"
        icon={<Lightbulb className="w-5 h-5" />}
        badge="Gondolkodásfejlesztés"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <TheoryCard
            title="1. Barkóba és Felezési Stratégia"
            icon={<HelpCircle className="w-5 h-5 text-purple-600" />}
            badge="Információelmélet"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Gondoltam egy lapra a 64 lapos logikai készletből. Hány eldöntendő (igen/nem) kérdésből lehet biztosan kitalálni?
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-xs font-semibold text-purple-900 dark:text-purple-200 mt-2 space-y-1">
              <div>1. kérdés: Piros vagy sárga? → Felezés: 32 marad</div>
              <div>2. kérdés: Piros? → 16 marad (megvan a szín)</div>
              <div>3. kérdés: Kör vagy négyzet? → 8 marad</div>
              <div>4. kérdés: Kör? → 4 marad (megvan a forma)</div>
              <div>5. kérdés: Nagy méretű? → 2 marad (megvan a méret)</div>
              <div>6. kérdés: Lyukas? → <strong>1 marad: Megvan a lap!</strong></div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Mivel 2⁶ = 64 (kétállású döntésekkel), <strong>pontosan 6 kérdésből</strong> bármelyik lap biztosan kitalálható!
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. A Skatulya-elv (Dirichlet-elv)"
            icon={<Dice5 className="w-5 h-5 text-indigo-600" />}
            badge="Biztos események"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              „Ha n darab skatulyába több mint n darab golyót teszünk, akkor legalább egy skatulyába egynél több golyó kerül.”
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-xs font-semibold text-indigo-900 dark:text-indigo-200 mt-2 space-y-1">
              <div><strong>Klasszikus zoknis feladat:</strong></div>
              <div>A fiókban 10 fekete és 10 fehér zokni van. A sötétben húzunk.</div>
              <div>• Hány zoknit kell húznunk, hogy <em>biztosan</em> legyen köztük egy pár (2 egyforma)?</div>
              <div>• <strong>Megoldás: 3 zoknit!</strong> Mivel csak 2 szín van, a 3. zokni színe valamelyik előzővel megegyezik.</div>
            </div>
          </TheoryCard>
        </div>

        <ExampleBox
          title="Igazmondók és Hazugok Szigete"
          problem="Találkozol két szigetlakóval: Ádámmal és Bélával. Az egyikük mindig igazat mond, a másikuk mindig hazudik. Ádám azt mondja: „Béla hazudik.” Mit mondhatunk Ádámról és Béláról?"
          steps={[
            {
              label: '1. Eset: Tegyük fel, hogy Ádám mond igazat!',
              value: 'Ha Ádám igazmondó, akkor az állítása igaz, vagyis Béla valóban hazudik. Ez tökéletesen lehetséges, nincs ellentmondás.'
            },
            {
              label: '2. Eset: Tegyük fel, hogy Ádám hazudik!',
              value: 'Ha Ádám hazug, akkor az állítása hamis, vagyis Béla NEM hazudik (igazat mond). Ez is lehetséges, ekkor Béla az igazmondó és Ádám a hazug.'
            },
            {
              label: 'Következtetés',
              value: 'Ádám és Béla valóban ellentétes típusúak: az egyikük igazmondó, a másikuk hazug, de önmagában ebből az egy mondatból nem dönthető el, melyikük az.'
            }
          ]}
        />
      </TheorySection>

      {/* ÖSSZEFOGLALÓ ELLENŐRZŐ KÁRTYÁK */}
      <TheorySection
        title="5. Összefoglaló Aranyszabályok a Dolgozathoz"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badge="Memoriter"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          {/* 1. Kártya: Logikai készlet */}
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-2xs">
              <Puzzle className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-purple-950 dark:text-purple-100">
              Logikai Készlet
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-mono font-bold text-xs border border-purple-200 dark:border-purple-700">
              4 × 4 × 2 × 2 = 64 lap
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
              Nincs két egyforma lap. Minden lehetséges tulajdonság-kombináció létezik!
            </div>
          </div>

          {/* 2. Kártya: Metszet */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-12 h-10 mb-2 flex items-center justify-center">
              <svg className="w-12 h-8" viewBox="0 0 54 32">
                <circle cx="21" cy="16" r="13" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" className="dark:fill-indigo-950/60" />
                <circle cx="33" cy="16" r="13" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" className="dark:fill-indigo-950/60" />
                <path d="M 27 4.5 A 13 13 0 0 1 27 27.5 A 13 13 0 0 1 27 4.5" fill="#6366f1" />
              </svg>
            </div>
            <div className="font-bold text-sm text-indigo-950 dark:text-indigo-100">
              Metszet (A ∩ B)
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 font-bold text-xs border border-indigo-200 dark:border-indigo-700">
              ÉS kapcsolat (Közös rész)
            </div>
            <div className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
              Azon elemek, amelyek mindkét halmaz feltételének egyszerre megfelelnek.
            </div>
          </div>

          {/* 3. Kártya: Unió */}
          <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-12 h-10 mb-2 flex items-center justify-center">
              <svg className="w-12 h-8" viewBox="0 0 54 32">
                <circle cx="21" cy="16" r="13" fill="#f43f5e" fillOpacity="0.4" stroke="#e11d48" strokeWidth="1.5" />
                <circle cx="33" cy="16" r="13" fill="#f43f5e" fillOpacity="0.4" stroke="#e11d48" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="font-bold text-sm text-pink-950 dark:text-pink-100">
              Unió (A ∪ B)
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-pink-100 dark:bg-pink-900/60 text-pink-900 dark:text-pink-200 font-bold text-xs border border-pink-200 dark:border-pink-700">
              VAGY kapcsolat (Egyesítés)
            </div>
            <div className="text-xs text-pink-700 dark:text-pink-300 leading-relaxed">
              Azon elemek, amelyek legalább az egyik halmaz feltételének megfelelnek.
            </div>
          </div>

          {/* 4. Kártya: Skatulya-elv */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shadow-2xs">
              <Dice5 className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
              Skatulya-elv
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-mono font-bold text-xs border border-emerald-200 dark:border-emerald-700">
              k kategória → k + 1 elem
            </div>
            <div className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Ha k-féle tulajdonság van, k + 1 húzás garantálja, hogy lesz legalább egy egyforma pár!
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
