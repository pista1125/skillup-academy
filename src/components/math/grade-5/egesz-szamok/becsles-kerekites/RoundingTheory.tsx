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
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Calculator,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface RoundingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type RoundingPlace = 10 | 100 | 1000 | 10000 | 100000;

export function RoundingTheory({ onBack, onStartQuiz }: RoundingTheoryProps) {
  // Interactive Simulator State
  const [inputNumber, setInputNumber] = useState<string>('4376');
  const [targetPlace, setTargetPlace] = useState<RoundingPlace>(100);

  // Estimation Calculator State
  const [estNum1, setEstNum1] = useState<string>('384');
  const [estNum2, setEstNum2] = useState<string>('195');
  const [estOp, setEstOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [estPlace, setEstPlace] = useState<RoundingPlace>(100);

  const getRoundingAnalysis = (numStr: string, place: RoundingPlace) => {
    const num = parseInt(numStr, 10);
    if (isNaN(num) || num < 0 || num > 9999999) return null;

    const rounded = Math.round(num / place) * place;
    const lower = Math.floor(num / place) * place;
    const upper = lower + place;
    const midpoint = lower + place / 2;

    const placeIdxFromRight = Math.log10(place);
    const digitString = num.toString();
    const len = digitString.length;

    const decisionIdx = len - placeIdxFromRight;
    const decisionDigit = decisionIdx >= 0 && decisionIdx < len ? parseInt(digitString[decisionIdx], 10) : 0;
    const isRoundUp = decisionDigit >= 5;

    return {
      num,
      rounded,
      lower,
      upper,
      midpoint,
      decisionDigit,
      isRoundUp,
      placeName:
        place === 10
          ? 'tízesekre'
          : place === 100
          ? 'százasokra'
          : place === 1000
          ? 'ezresekre'
          : place === 10000
          ? 'tízezresekre'
          : 'százezresekre'
    };
  };

  const analysis = getRoundingAnalysis(inputNumber, targetPlace);

  const getEstimationAnalysis = () => {
    const n1 = parseInt(estNum1, 10);
    const n2 = parseInt(estNum2, 10);
    if (isNaN(n1) || isNaN(n2)) return null;

    const r1 = Math.round(n1 / estPlace) * estPlace;
    const r2 = Math.round(n2 / estPlace) * estPlace;

    let exact = 0;
    let estimated = 0;

    if (estOp === '+') {
      exact = n1 + n2;
      estimated = r1 + r2;
    } else if (estOp === '-') {
      exact = n1 - n2;
      estimated = r1 - r2;
    } else if (estOp === '*') {
      exact = n1 * n2;
      estimated = r1 * r2;
    } else if (estOp === '/') {
      if (n2 === 0 || r2 === 0) return null;
      exact = Math.round((n1 / n2) * 100) / 100;
      estimated = Math.round((r1 / r2) * 100) / 100;
    }

    const diff = Math.abs(exact - estimated);
    return { n1, n2, r1, r2, exact, estimated, diff };
  };

  const estAnalysis = getEstimationAnalysis();

  return (
    <TheoryTemplate
      title="Becslés és Kerekítés"
      subtitle="Kerekítési szabályok (tízesre, százasra, ezresre), döntő számjegy, becslés műveletek előtt és hibahatárok"
      topicBadge="5. Osztály • I. Az egész számok"
      topicNumber="7."
      documentId="rounding-theory-content"
      pdfFileName="Becsles_Kerekites_Tananyag"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'Kerekítési Szabály',
        formula: '0, 1, 2, 3, 4 ➔ Lefelé  |  5, 6, 7, 8, 9 ➔ Felfelé',
        detail: 'Mindig a kerekítendő helyiérték utáni közvetlen jobb oldali jegy dönt!'
      }}
    >
      {/* 1. Szakasz: Miért kerekítünk és becslünk? */}
      <TheorySection
        number={1}
        title="Mi a kerekítés és mi a becslés?"
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A mindennapi életben és a matematikában gyakran nincs szükség a számok hajszálpontos értékére, vagy a pontos számolás előtt szeretnénk <strong>megbecsülni az eredmény nagyságrendjét</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="Kerekítés"
              badge="Egyszerűbb szám"
              variant="amber"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Egy számot helyettesítünk a hozzá legközelebb eső <strong>kerek számmal</strong> (0-ra, 00-ra, 000-ra végződő számmal). Jele: <strong>≈</strong> (kerekítve egyenlő).
              </p>
            </TheoryCard>

            <TheoryCard
              title="Becslés"
              badge="Várható eredmény"
              variant="blue"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Műveletvégzés előtt a számokat kerekítjük, és a kerekített értékekkel számolunk fejben, hogy ellenőrizni tudjuk a pontos végeredmény reális nagyságát.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szakasz: A kerekítés aranyszabálya */}
      <TheorySection
        number={2}
        title="A kerekítés aranyszabálya és a döntő számjegy"
        badgeColor="amber"
      >
        <div className="space-y-4">
          <TheoryCallout
            title="Hogyan kerekítünk 3 egyszerű lépésben?"
            variant="tip"
          >
            <ol className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 list-decimal list-inside">
              <li><strong>Jelöld ki a kerekítendő helyiértéket</strong> (pl. tízes, százas, ezres)!</li>
              <li><strong>Nézd meg a közvetlenül utána (jobbra) álló számjegyet</strong> (ez a döntő jegy)!</li>
              <li>
                Ha a döntő jegy <strong>0, 1, 2, 3, 4</strong> ➔ <strong>LEFELÉ kerekítünk</strong> (a kerekített helyiérték változatlan marad, utána minden 0 lesz).<br />
                Ha a döntő jegy <strong>5, 6, 7, 8, 9</strong> ➔ <strong>FELFELÉ kerekítünk</strong> (a kerekített helyiérték 1-gyel nő, utána minden 0 lesz).
              </li>
            </ol>
          </TheoryCallout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
              <div className="flex items-center gap-1.5 text-blue-800 dark:text-blue-300 font-bold text-xs">
                <ArrowDownRight className="w-4 h-4 text-blue-600" />
                <span>Lefelé kerekítés (0, 1, 2, 3, 4)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Példák tízesre: <strong>43</strong> ≈ 40 (döntő jegy: 3)<br />
                Példák százasra: <strong>529</strong> ≈ 500 (döntő jegy: 2)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span>Felfelé kerekítés (5, 6, 7, 8, 9)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Példák tízesre: <strong>47</strong> ≈ 50 (döntő jegy: 7)<br />
                Példák százasra: <strong>581</strong> ≈ 600 (döntő jegy: 8)<br />
                <strong>5-ös szabály:</strong> 45 ≈ 50, 250 ≈ 300 (a felezőpont felfelé kerekedik!)
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szakasz: Kerekítés különböző helyiértékekre */}
      <TheorySection
        number={3}
        title="Kerekítés különböző helyiértékekre (Összehasonlító táblázat)"
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Nézzük meg a <strong>4 785</strong> szám kerekítését a különböző helyiértékekre:
          </p>

          <TheoryTable
            headers={['Kerekítés szintje', 'Kerekítendő hely', 'Döntő számjegy', 'Irány', 'Kerekített érték']}
            rows={[
              ['Tízesre (10)', '8 (tízesek)', '5 (egyesek)', 'Felfelé (≥5)', '4 785 ≈ 4 790'],
              ['Százasra (100)', '7 (százasok)', '8 (tízesek)', 'Felfelé (≥5)', '4 785 ≈ 4 800'],
              ['Ezresre (1000)', '4 (ezresek)', '7 (százasok)', 'Felfelé (≥5)', '4 785 ≈ 5 000'],
              ['Tízezresre (10000)', '0 (tízezresek)', '4 (ezresek)', 'Lefelé (<5)', '4 785 ≈ 0']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. Szakasz: Becslés műveletek előtt */}
      <TheorySection
        number={4}
        title="Becslés alkalmazása műveletek előtt"
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Összeadás és kivonás előtt mindig érdemes <strong>kerekített értékekkel becslést (B)</strong> végezni:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="Összeadás becslése"
              badge="Példa: 384 + 195"
              variant="emerald"
            >
              <div className="space-y-1 text-xs font-mono">
                <div>Becslés százasra: 400 + 200 = <strong>600</strong></div>
                <div>Pontos érték: 384 + 195 = <strong>579</strong></div>
                <div className="text-slate-500 text-[11px]">Eltérés: 21 egység (nagyon jó közelítés!)</div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="Kivonás becslése"
              badge="Példa: 712 - 289"
              variant="blue"
            >
              <div className="space-y-1 text-xs font-mono">
                <div>Becslés százasra: 700 - 300 = <strong>400</strong></div>
                <div>Pontos érték: 712 - 289 = <strong>423</strong></div>
                <div className="text-slate-500 text-[11px]">Eltérés: 23 egység.</div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szakasz: Tipikus Hibák és Csapdák */}
      <TheorySection
        number={5}
        title="Tipikus Tévhitek és Csapdák"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TheoryTrapBox
            title="Több jegy figyelembe vétele"
            wrong="A 436 százasra kerekítésekor a 6-ost nézni"
            correct="Csak a közvetlen jobb oldali jegy dönt (a 3-as a tízes helyen ➔ 400)"
            explanation="A kerekítésnél KIZÁRÓLAG a kerekítendő hely közvetlen szomszédja (jobbra) számít!"
          />
          <TheoryTrapBox
            title="Az 5-ös végű számok kerekítése"
            wrong="A 45 lefelé kerekítése 40-re"
            correct="A pontos felezőpont (5-ös jegy) mindig FELFELÉ kerekedik (45 ≈ 50)!"
            explanation="5, 6, 7, 8, 9 esetén mindig felfelé kerekítünk a szabály szerint."
          />
          <TheoryTrapBox
            title="Átforduló 9-esek ezresre/százasra kerekítésekor"
            wrong="496 tízesre kerekítve = 490 vagy 4100"
            correct="496 tízesre kerekítve = 500 (9 + 1 = 10, átlép a százasokra)"
            explanation="Ha a kerekítendő helyen 9-es áll és felfelé kerekítünk, az átfordul 0-ra és a bal oldali jegy 1-gyel nő!"
          />
          <TheoryTrapBox
            title="Kerekítési helyiérték eltévesztése"
            wrong="A 782 tízesre kerekítve = 800"
            correct="Tízesre: 782 ≈ 780; Százasra: 782 ≈ 800!"
            explanation="Mindig olvasd el figyelmesen, hogy tízesre, százasra vagy ezresre kérik a kerekítést."
          />
        </div>
      </TheorySection>

      {/* 6. Szakasz: Interaktív Kerekítő és Becslő Labor (no-pdf) */}
      <TheorySection
        number={6}
        title="Interaktív Kerekítő & Becslő Labor"
        badgeColor="amber"
        className="no-pdf"
      >
        <div className="space-y-6 no-pdf">
          {/* Rounding Explorer */}
          <div className="p-5 bg-gradient-to-br from-amber-50/60 to-orange-50/60 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl border border-amber-200/80 dark:border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                Írj be egy számot:
              </label>
              <input
                type="number"
                min="0"
                max="9999999"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                className="w-full sm:w-36 px-3 py-2 text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl"
              />
              <div className="flex flex-wrap gap-1.5">
                {[10, 100, 1000, 10000].map((place) => (
                  <button
                    key={place}
                    onClick={() => setTargetPlace(place as RoundingPlace)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-bold rounded-xl border transition-all",
                      targetPlace === place
                        ? "bg-amber-600 text-white border-amber-700 shadow-sm"
                        : "bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {place === 10 ? 'Tízesre' : place === 100 ? 'Százasra' : place === 1000 ? 'Ezresre' : 'Tízezresre'}
                  </button>
                ))}
              </div>
            </div>

            {analysis && (
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-400">
                    Kerekítés {analysis.placeName}:
                  </span>
                  <span className="font-mono text-xl font-black text-amber-700 dark:text-amber-300">
                    {analysis.num.toLocaleString('hu-HU')} ≈ {analysis.rounded.toLocaleString('hu-HU')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg">
                    <span className="text-slate-400 block">Döntő számjegy:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                      {analysis.decisionDigit}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg">
                    <span className="text-slate-400 block">Kerekítés iránya:</span>
                    <span className={cn(
                      "font-bold font-mono text-sm",
                      analysis.isRoundUp ? "text-emerald-600" : "text-blue-600"
                    )}>
                      {analysis.isRoundUp ? 'FELFELÉ (≥5)' : 'LEFELÉ (<5)'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg">
                    <span className="text-slate-400 block">Szomszédok:</span>
                    <span className="font-bold font-mono text-xs text-slate-700 dark:text-slate-300">
                      {analysis.lower.toLocaleString('hu-HU')} és {analysis.upper.toLocaleString('hu-HU')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default RoundingTheory;
