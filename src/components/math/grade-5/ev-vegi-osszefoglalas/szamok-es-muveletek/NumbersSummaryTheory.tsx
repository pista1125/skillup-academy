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
  Calculator,
  Binary,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  Info,
  Layers,
  ShieldCheck,
  Scale
} from 'lucide-react';

export interface NumbersSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const NumbersSummaryTheory: React.FC<NumbersSummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // Interaktív számegyenes / előjeles összeadás szimulátor
  const [balance, setBalance] = useState<number>(3);

  const addValue = (val: number) => {
    setBalance(prev => Math.max(-10, Math.min(10, prev + val)));
  };

  const resetBalance = () => {
    setBalance(3);
  };

  return (
    <TheoryTemplate
      title="1. Természetes és egész számok, műveletek"
      subtitle="Helyiérték-rendszer, római számok, kerekítés és becslés, műveleti sorrend és az egész számok világa"
      themeColor="blue"
      color="blue"
      badgeText="5. OSZTÁLY • VIII. TÉMAKÖR: ÉV VÉGI ÖSSZEFOGLALÁS • 📖 TANANYAG"
      documentId="grade-5-numbers-summary-theory"
      pdfFilename="5_osztaly_VIII_1_szamok_muveletek_osszefoglalas.pdf"
      practiceTitle="Készen állsz az egész számok év végi ismétlésére?"
      practiceSubtitle="Gyakorold a helyiértéket, kerekítést, műveleti sorrendet és előjeles számolást 30 vizsgafeladaton!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      summaryContent={
        <div className="space-y-4">
          <p className="text-sm">
            Az 5. osztályos matematika alapköve a számok biztos ismerete. Ebben az alfejezetben felelevenítjük a <strong>tízes alapú helyiértékes rendszert</strong>, a <strong>római számírást</strong>, a <strong>műveleti sorrend szigorú hierarchiáját</strong>, valamint a <strong>negatív számok és a számegyenes</strong> logikáját.
          </p>

          <FormulaBox
            title="A műveleti sorrend aranyszabálya"
            formula="\text{1. Zárójelek (belsőből kifelé)} \quad \longrightarrow \quad \text{2. Szorzás / Osztás} \quad \longrightarrow \quad \text{3. Összeadás / Kivonás}"
            description="Azonos szintű műveleteket (pl. szorzás és osztás, vagy összeadás és kivonás) mindig szigorúan balról jobbra haladva végzünk el!"
            color="blue"
          />

          {/* Interaktív Előjeles Számegyenes & Egyenleg Szimulátor */}
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 text-sm">
                <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Interaktív Egyenleg és Számegyenes Modell (Vagyon & Adósság)</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={resetBalance}
                className="h-8 text-xs border-blue-300 dark:border-blue-700"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Visszaállítás (3)
              </Button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Próbáld ki, hogyan mozgatják a pozitív és negatív műveletek az egyenlegedet a számegyenesen:
            </p>

            {/* Vizuális Számegyenes */}
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-blue-100 dark:border-slate-800">
              <div className="text-center font-bold text-sm mb-2">
                Jelenlegi érték:{' '}
                <span className={balance > 0 ? 'text-emerald-600' : balance < 0 ? 'text-rose-600' : 'text-blue-600'}>
                  {balance > 0 ? `+${balance}` : balance}
                </span>{' '}
                <span className="text-xs font-normal text-slate-500">
                  ({balance > 0 ? 'vagyon' : balance < 0 ? 'adósság' : 'nulla egyenleg'})
                </span>
              </div>

              <div className="w-full flex justify-center py-2 overflow-x-auto">
                <svg viewBox="0 0 520 80" className="w-full max-w-lg h-auto select-none font-sans">
                  {/* Fő számegyenes vonal nyíllal */}
                  <line x1="20" y1="40" x2="500" y2="40" stroke="#64748b" strokeWidth="2.5" />
                  <polygon points="505,40 495,35 495,45" fill="#64748b" />

                  {/* Negatív zóna háttér */}
                  <rect x="25" y="15" width="235" height="50" rx="6" fill="#fecdd3" opacity="0.3" />
                  {/* Pozitív zóna háttér */}
                  <rect x="260" y="15" width="235" height="50" rx="6" fill="#bbf7d0" opacity="0.3" />

                  {/* Beosztások -10-től +10-ig */}
                  {Array.from({ length: 21 }).map((_, i) => {
                    const val = i - 10;
                    const x = 25 + i * 23.5;
                    const isZero = val === 0;
                    const isCurrent = val === balance;
                    return (
                      <g key={val}>
                        <line
                          x1={x}
                          y1={isZero ? 25 : 33}
                          x2={x}
                          y2={isZero ? 55 : 47}
                          stroke={isZero ? '#0f172a' : '#94a3b8'}
                          strokeWidth={isZero ? 2.5 : 1.5}
                        />
                        {Math.abs(val) % 2 === 0 && (
                          <text
                            x={x}
                            y="65"
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight={isZero ? 'bold' : 'normal'}
                            fill={isZero ? '#0f172a' : val < 0 ? '#e11d48' : '#16a34a'}
                          >
                            {val}
                          </text>
                        )}
                        {/* Aktuális pozíció jelző */}
                        {isCurrent && (
                          <circle
                            cx={x}
                            cy="40"
                            r="7"
                            fill={balance > 0 ? '#16a34a' : balance < 0 ? '#e11d48' : '#2563eb'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Gombok az interakcióhoz */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => addValue(3)}
                  className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="w-3 h-3 mr-1" /> +3 hozzáadása (Vagyon nő)
                </Button>
                <Button
                  size="sm"
                  onClick={() => addValue(-4)}
                  className="h-7 text-xs bg-rose-600 hover:bg-rose-700 text-white"
                >
                  <Minus className="w-3 h-3 mr-1" /> −4 levonása (Adósság nő)
                </Button>
                <Button
                  size="sm"
                  onClick={() => addValue(5)}
                  className="h-7 text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  +5
                </Button>
                <Button
                  size="sm"
                  onClick={() => addValue(-5)}
                  className="h-7 text-xs bg-rose-700 hover:bg-rose-800 text-white"
                >
                  −5
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* =================================================================== */}
      {/* 1. SZEKCIÓ: HELYIÉRTÉK-RENDSZER ÉS RÓMAI SZÁMOK                    */}
      {/* =================================================================== */}
      <TheorySection
        title="1. Helyiérték-rendszer és római számok"
        color="blue"
      >
        <TheoryCard title="A tízes számrendszer és a helyiérték táblázat" color="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            A mi számrendszerünk <strong>tízes alapú és helyiértékes</strong>. Ez azt jelenti, hogy 10 darab számjegyből (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) bármekkora számot fel tudunk építeni, és egy számjegy értéke attól függ, hogy hanyadik helyen áll.
          </p>

          <TheoryTable
            headers={["Milliók (M)", "Százezresek (SZe)", "Tízezresek (TE)", "Ezresek (E)", "Százasok (Sz)", "Tízesek (T)", "Egyesek (E)"]}
            rows={[
              ["1 000 000", "100 000", "10 000", "1 000", "100", "10", "1"],
              ["4", "2", "8", "5", "3", "7", "1"]
            ]}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic text-center">
            Példa: A táblázatban szereplő szám kiolvasása: <em>4 millió 285 ezer 371</em>.
          </p>

          {/* Vizuális összehasonlító kártyák a helyiértékhez */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3 text-xs">
            <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <div className="font-bold text-blue-900 dark:text-blue-200">Alaki érték</div>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">Magának a leírt számjegynek a rajzolata. A <strong>7</strong>-es alaki értéke 7.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <div className="font-bold text-indigo-900 dark:text-indigo-200">Helyiérték</div>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">A pozíció értéke. Ha a tízesek helyén áll, a helyiértéke <strong>10</strong>.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <div className="font-bold text-teal-900 dark:text-teal-200">Valódi érték</div>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">Alaki érték × Helyiérték: 7 × 10 = <strong>70</strong>.</p>
            </div>
          </div>

          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 mb-2">
            A római számírás 7 alapszimbóluma és szabályai
          </h4>
          <TheoryTable
            headers={["I", "V", "X", "L", "C", "D", "M"]}
            rows={[
              ["1", "5", "10", "50", "100", "500", "1 000"]
            ]}
          />

          <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
            <div>• <strong>Összeadás elve:</strong> Ha kisebb értékű jel áll a nagyobb után, hozzáadjuk: VI = 5 + 1 = 6; XI = 10 + 1 = 11; CL = 100 + 50 = 150.</div>
            <div>• <strong>Kivonás elve:</strong> Ha kisebb értékű jel áll a nagyobb előtt, levonjuk: IV = 5 − 1 = 4; IX = 10 − 1 = 9; XC = 100 − 10 = 90; CD = 500 − 100 = 400.</div>
            <div>• <strong>Ismétlési korlát:</strong> Egy szimbólum (I, X, C, M) legfeljebb <strong>háromszor</strong> állhat egymás után (pl. VIII = 8, de 9 már IX, nem VIIII). V, L, D soha nem ismétlődik!</div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 2. SZEKCIÓ: MŰVELETI SORREND ÉS ZÁRÓJELEK                          */}
      {/* =================================================================== */}
      <TheorySection
        title="2. Műveleti sorrend és a zárójelek ereje"
        color="blue"
      >
        <TheoryCard title="Hogyan számolunk pontosan hiba nélkül?" color="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            A matematikában a műveleteknek szigorú hierarchiája van. Ha nem tartod be a sorrendet, teljesen hibás eredményre jutsz!
          </p>

          {/* Vizuális Műveleti Piramis */}
          <div className="w-full flex justify-center py-2">
            <svg viewBox="0 0 460 140" className="w-full max-w-md h-auto select-none font-sans">
              {/* Piramis 1. szint: Zárójelek */}
              <polygon points="230,10 160,50 300,50" fill="#3b82f6" />
              <text x="230" y="35" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">1. (Zárójelek)</text>

              {/* Piramis 2. szint: Szorzás / Osztás */}
              <polygon points="160,53 300,53 340,90 120,90" fill="#0284c7" />
              <text x="230" y="75" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">2. Szorzás (·) és Osztás (:)</text>

              {/* Piramis 3. szint: Összeadás / Kivonás */}
              <polygon points="120,93 340,93 380,130 80,130" fill="#0369a1" />
              <text x="230" y="115" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">3. Összeadás (+) és Kivonás (−)</text>
            </svg>
          </div>

          <ExampleBox
            title="Mintapélda: Zárójelek és műveleti hierarchia"
            color="blue"
            problem="Számítsd ki a következő kifejezés pontos értékét: 50 − 4 · (6 + 3) + 18 : 2"
            steps={[
              "1. lépés (Zárójel feloldása): 6 + 3 = 9. A kifejezés most: 50 − 4 · 9 + 18 : 2.",
              "2. lépés (Szorzás és osztás balról jobbra): 4 · 9 = 36 és 18 : 2 = 9. A kifejezés most: 50 − 36 + 9.",
              "3. lépés (Összeadás és kivonás balról jobbra): 50 − 36 = 14, majd 14 + 9 = 23."
            ]}
            solution="Az eredmény: 23."
          />
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 3. SZEKCIÓ: KEREKÍTÉS ÉS BECSLÉS                                   */}
      {/* =================================================================== */}
      <TheorySection
        title="3. Kerekítés és becslés aranyszabályai"
        color="blue"
      >
        <TheoryCard title="A kerekítés biztos szabálya" color="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
            Mindig a kerekítendő helyiérték <strong>közvetlen jobb oldalán</strong> álló szomszéd számjegyet kell megfigyelni:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm mb-1">
                ⬇️ Lefelé kerekítés (0, 1, 2, 3, 4)
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                A kijelölt helyiértéken lévő számjegy <strong>változatlan marad</strong>, a mögötte lévők nullák lesznek.
                <br />
                <em>Pl.: 482 tízesre kerekítve: 480 (mert a 2 &lt; 5).</em>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <div className="font-bold text-blue-900 dark:text-blue-200 text-sm mb-1">
                ⬆️ Felfelé kerekítés (5, 6, 7, 8, 9)
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                A kijelölt helyiértéken lévő számjegy <strong>1-gyel növekszik</strong>, a mögötte lévők nullák lesznek.
                <br />
                <em>Pl.: 487 tízesre kerekítve: 490 (mert a 7 ≥ 5).</em>
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =================================================================== */}
      {/* 4. SZEKCIÓ: NEGATÍV SZÁMOK ÉS ELLENTETTEK                          */}
      {/* =================================================================== */}
      <TheorySection
        title="4. Negatív számok és a számegyenes"
        color="blue"
      >
        <TheoryCard title="Hogyan bánjunk a negatív számokkal?" color="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            A nulla alatti hőmérséklet, az adósság vagy a lifttel a mélygarázsba való utazás mind a <strong>negatív számok</strong> birodalma.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">Ellentett számok</div>
              <p className="text-slate-600 dark:text-slate-400">
                Két szám egymás ellentettje, ha a nullától egyenlő távolságra vannak a számegyenes ellentétes oldalain.
                <br />
                <strong>+5 ellentettje: −5</strong>; <strong>−12 ellentettje: +12</strong>; <strong>0 ellentettje: 0</strong>.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">Abszolút érték (|x|)</div>
              <p className="text-slate-600 dark:text-slate-400">
                A számnak a nullától mért távolsága. Soha nem lehet negatív!
                <br />
                <strong>|+7| = 7</strong>; <strong>|−7| = 7</strong>; <strong>|0| = 0</strong>.
              </p>
            </div>
          </div>

          <TheoryCallout type="tip">
            <strong>Összeadás és kivonás trükkje:</strong> Gondolj mindig a pénztárcádra!
            <br />
            • $(+3) + (-5) = -2$: Volt 3 Ft vagyonod, de jött 5 Ft tartozás ➔ most 2 Ft adósságban vagy ($-2$).
            <br />
            • $(-4) - (+2) = -6$: Volt 4 Ft adósságod, és még elvettek tőled 2 Ft-ot ➔ most 6 Ft adósságod van ($-6$).
          </TheoryCallout>
        </TheoryCard>

        {/* Tipikus Csapdák Box */}
        <TheoryTrapBox
          traps={[
            {
              title: "Csapda 1: Műveleti sorrend zárójel nélkül",
              description: "A 20 + 5 · 2 NEM (20 + 5) · 2 = 50, hanem előbb elvégezzük a szorzást: 5 · 2 = 10, majd 20 + 10 = 30!"
            },
            {
              title: "Csapda 2: Két negatív szám összehasonlítása",
              description: "A negatív számoknál a nullához közelebbi a nagyobb! Például −2 > −10, mert a −2 °C melegebb, mint a −10 °C fagy!"
            },
            {
              title: "Csapda 3: Negatív szám abszolút értéke",
              description: "A távolság soha nem negatív. Ezért |−8| = +8, nem pedig −8!"
            }
          ]}
        />
      </TheorySection>

      {/* =================================================================== */}
      {/* 5. SZEKCIÓ: DOLGOZAT-ARANYSZABÁLYOK ÉS MEMORITER                   */}
      {/* =================================================================== */}
      <TheorySection
        title="5. Összefoglaló Aranyszabályok a Dolgozathoz (Memoriter)"
        color="blue"
      >
        <TheoryCard title="4 aranyszabály, amit soha ne felejts el!" color="blue">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Helyiérték */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    1
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Helyiérték szorzása</h4>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg text-center font-mono font-bold text-blue-900 dark:text-blue-200 text-xs border border-blue-100 dark:border-blue-900 mb-2">
                  Valódi érték = Alaki érték × Helyiérték
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Egy számjegy valódi értékét mindig az határozza meg, hogy melyik oszlopban (egyes, tízes, százas...) áll.
                </p>
              </div>
            </div>

            {/* 2. Műveleti sorrend */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    2
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Zárójel ➔ Szorzás/Osztás ➔ Összeadás</h4>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg text-center font-mono font-bold text-indigo-900 dark:text-indigo-200 text-xs border border-indigo-100 dark:border-indigo-900 mb-2">
                  ( ) &gt; · , : &gt; + , −
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Azonos szintű műveleteket szigorúan balról jobbra haladva oldunk meg!
                </p>
              </div>
            </div>

            {/* 3. Kerekítés */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    3
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Kerekítés határa: 5</h4>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg text-center font-mono font-bold text-emerald-900 dark:text-emerald-200 text-xs border border-emerald-100 dark:border-emerald-900 mb-2">
                  0, 1, 2, 3, 4 ➔ lefelé | 5, 6, 7, 8, 9 ➔ felfelé
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Mindig a kerekítendő helyiérték jobb szomszédját vizsgáld meg!
                </p>
              </div>
            </div>

            {/* 4. Negatív számok */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border border-rose-200 dark:border-rose-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow">
                    4
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Negatív számok rendezése</h4>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg text-center font-mono font-bold text-rose-900 dark:text-rose-200 text-xs border border-rose-100 dark:border-rose-900 mb-2">
                  A számegyenesen a balra lévő mindig kisebb!
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  −8 kisebb, mint −2! Két negatív szám közül az a nagyobb, amelyik közelebb van a 0-hoz.
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};
