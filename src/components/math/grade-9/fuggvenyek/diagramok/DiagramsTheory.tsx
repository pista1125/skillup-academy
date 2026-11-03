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
  BarChartSvg,
  PieChartSvg,
  LineChartSvg
} from './DiagramsFigures';
import {
  PieChart,
  BarChart2,
  TrendingUp,
  Sliders,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Hash,
  Percent,
  Compass,
  ArrowRight
} from 'lucide-react';

interface DiagramsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const DiagramsTheory: React.FC<DiagramsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV KÖRDIAGRAM ÉS SZÖGKALKULÁTOR LABOR ---
  const [percentA, setPercentA] = useState<number>(40);
  const [percentB, setPercentB] = useState<number>(35);

  const calculatedValues = useMemo(() => {
    const safeA = Math.min(100, Math.max(0, percentA));
    const safeB = Math.min(100 - safeA, Math.max(0, percentB));
    const safeC = Math.max(0, 100 - safeA - safeB);

    const degA = ((safeA / 100) * 360).toFixed(1);
    const degB = ((safeB / 100) * 360).toFixed(1);
    const degC = ((safeC / 100) * 360).toFixed(1);

    return {
      safeA,
      safeB,
      safeC,
      degA,
      degB,
      degC
    };
  }, [percentA, percentB]);

  return (
    <TheoryTemplate
      title="2. Diagramok a matematikában"
      subtitle="Oszlop-, sáv-, kör- és vonaldiagramok készítése, szektorszögek számítása és megtévesztő ábrázolások leleplezése"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 2. DIAGRAMOK"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a diagramok feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Kördiagram középponti szögének képlete",
        formula: "α = (p / 100) · 360°  (1% = 3,6°)",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: OSZLOP- ÉS SÁVDIAGRAMOK
      ========================================================================= */}
      <TheorySection
        title="1. Oszlop- és Sávdiagramok (Kategóriák összehasonlítása)"
        icon={<BarChart2 className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Mennyiségi és minőségi adatok gyors vizuális összevetése"
          icon={<BarChart2 className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Az oszlopdiagramon az adatok nagyságát függőleges téglalapok magassága, a sávdiagramon pedig vízszintes sávok hossza jelzi. Akkor használjuk, ha különböző kategóriák (pl. osztályok, tantárgyak, termékek) gyakoriságát vagy mért értékeit szeretnénk összehasonlítani.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <BarChartSvg size={280} />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="font-bold text-blue-800 dark:text-blue-300">Azonos szélesség:</span> Az oszlopok szélessége mindig azonos és tetszőleges, a jelentést kizárólag a magasságuk hordozza.
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Nulláról induló skála:</span> A függőleges értéktengelynek szinte mindig 0-ról kell indulnia az arányok megtartása érdekében.
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-800 dark:text-amber-300">Oszlopok közötti hézag:</span> Különálló (diszkrét) kategóriák esetén az oszlopok között szünetet (közt) hagyunk.
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: KÖRDIAGRAMOK ÉS KÖZÉPPONTI SZÖGEK
      ========================================================================= */}
      <TheorySection
        title="2. Kördiagramok (Rész-egész arányok szemléltetése)"
        icon={<PieChart className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="A teljes sokaság (100%) és a teljesszög (360°) kapcsolata"
          icon={<Compass className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A kördiagram az egyes részek egészhez viszonyított arányát mutatja be. A teljes kör ($360^\circ$) felel meg a teljes sokaságnak ($100\%$). Egy adott $p\%$ nagyságú részesedéshez tartozó körcikk középponti szöge:
          </p>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center my-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Középponti szög kiszámítása:</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-950 dark:text-indigo-200 mt-1">
              α = (p / 100) · 360° = p · 3,6°
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Jegyezd meg: 1% részesedés pontosan 3,6°-os középponti szögnek felel meg!
            </div>
          </div>

          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 my-4">
            <PieChartSvg size={280} />
          </div>

          {/* =========================================================================
              INTERAKTÍV KÖRCIKK & SZÖG LABOR
          ========================================================================= */}
          <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Interaktív Kördiagram Szektorszög-kalkulátor
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Állítsd be a szektorok százalékos arányát, és figyeld meg a hozzájuk tartozó fokos szögeket!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-blue-600">„A” kategória:</span>
                    <span>{calculatedValues.safeA}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={percentA}
                    onChange={(e) => setPercentA(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-600">„B” kategória:</span>
                    <span>{calculatedValues.safeB}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={100 - calculatedValues.safeA}
                    value={percentB}
                    onChange={(e) => setPercentB(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                  <div className="flex justify-between font-bold text-amber-600 dark:text-amber-400">
                    <span>„C” kategória (maradék):</span>
                    <span>{calculatedValues.safeC}%</span>
                  </div>
                </div>
              </div>

              {/* Számított szögek kártyái */}
              <div className="space-y-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-semibold text-blue-700 dark:text-blue-400">A szektorszöge (kék):</span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {calculatedValues.degA}°
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">B szektorszöge (zöld):</span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {calculatedValues.degB}°
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">C szektorszöge (borostyán):</span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    {calculatedValues.degC}°
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 font-bold text-slate-800 dark:text-slate-200">
                  <span>Összeg:</span>
                  <span>100% ➔ 360,0°</span>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: VONALDIAGRAMOK ÉS TRENDEK
      ========================================================================= */}
      <TheorySection
        title="3. Vonaldiagramok (Időbeli változások és folyamatok)"
        icon={<TrendingUp className="w-6 h-6 text-sky-600" />}
      >
        <TheoryCard
          title="Folytonos folyamatok, hőmérséklet, árfolyam és sebesség ábrázolása"
          icon={<TrendingUp className="w-5 h-5 text-sky-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A vonaldiagramon az időbeli pontokat egyenes szakaszokkal kötjük össze. Segítségével azonnal látható a növekedési vagy csökkenési irány (trend), a kiugró csúcsértékek és a mélypontok.
          </p>

          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-4">
            <LineChartSvg size={300} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">Meredek emelkedés:</span>
              Gyors növekedés az adott időintervallumban (pl. kedd és szerda között).
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">Vízszintes szakasz:</span>
              Változatlan, állandó érték, stagnálás az idő múlásával.
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
              <span className="font-bold text-rose-900 dark:text-rose-300 block mb-1">Lejtő szakasz:</span>
              Csökkenő tendencia, értékvesztés (pl. szerda és csütörtök között).
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS CSAPDÁK DOBOZ
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus hibák és megtévesztő diagramok az érettségin"
        traps={[
          {
            wrong: 'Az oszlopdiagram függőleges tengelye nem 0-ról indul (csonkolt tengely).',
            correct: 'Ha a skála 90-ről indul 0 helyett, egy 92 és 96 közötti kis különbség vizuálisan háromszorosnak tűnik! Mindig nézd meg a függőleges tengely kezdőértékét!',
            explanation: 'A csonkolt tengely a médiában és reklámokban a leggyakoribb manipulatív technika.'
          },
          {
            wrong: 'Kördiagram középponti szögének számításakor a százalékértéket osztjuk 360-nal.',
            correct: 'A helyes képlet: α = (p / 100) · 360° = p · 3,6°. Például 25% szöge: 25 · 3,6° = 90°.',
            explanation: 'Gondolj a negyedkörre: 25% = negyedrész, 360° / 4 = 90°.'
          },
          {
            wrong: 'Oszlopok szélességének változtatása a magasság mellett.',
            correct: 'Az oszlopdiagramon KIZÁRÓLAG a magasság arányos a gyakorisággal! Ha egy oszlopot szélesebbre is rajzolnak, a területe négyzetesen nő, ami megtévesztő.',
            explanation: 'Az oszlopok szélességének mindig teljesen egyformának kell lennie.'
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryCard
        title="Mikor melyik diagramtípust válasszuk?"
        icon={<Hash className="w-6 h-6 text-blue-600" />}
      >
        <TheoryTable
          headers={['Diagram típusa', 'Mikor ezt használd?', 'Fő erőssége', 'Példa a gyakorlatból']}
          rows={[
            ['Oszlopdiagram', 'Különálló kategóriák összehasonlítására', 'Pontos nagyságrendi különbségek láthatók', 'Osztályok tanulmányi átlagai'],
            ['Sávdiagram', 'Sok kategória vagy hosszú feliratok esetén', 'Könnyen olvasható vízszintes címkék', 'Országok népessége'],
            ['Kördiagram', 'Rész-egész arányok szemléltetésére (100%)', 'Azonnal látszik a többség vagy kisebbség', 'Pártok választási eredményei'],
            ['Vonaldiagram', 'Időbeli változások, tendenciák követésére', 'Emelkedés, esés és ritmus jól követhető', 'Napi hőmérséklet vagy valutaárfolyam']
          ]}
        />
      </TheoryCard>
    </TheoryTemplate>
  );
};

