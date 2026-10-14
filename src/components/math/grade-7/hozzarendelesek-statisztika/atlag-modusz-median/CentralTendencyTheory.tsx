import React, { useState } from 'react';
import { TheoryTemplate } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Calculator, Hash, AlignCenter, ArrowUpDown, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CentralTendencyTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface DatasetPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  rawValues: number[];
  sortedValues: number[];
  unit: string;
}

const PRESETS: DatasetPreset[] = [
  {
    id: 'grades',
    name: '1. Dolgozatjegyek (páratlan n = 7)',
    category: 'Iskolai statisztika',
    description: '7 tanuló matematika témazáró dolgozatának eredménye: 4, 5, 3, 5, 4, 3, 5.',
    rawValues: [4, 5, 3, 5, 4, 3, 5],
    sortedValues: [3, 3, 4, 4, 5, 5, 5],
    unit: 'érdemjegy',
  },
  {
    id: 'points',
    name: '2. Kosárlabda pontszámok (páros n = 6)',
    category: 'Sportstatisztika',
    description: 'Egy játékos által szerzett pontok 6 mérkőzésen: 14, 8, 20, 12, 24, 18.',
    rawValues: [14, 8, 20, 12, 24, 18],
    sortedValues: [8, 12, 14, 18, 20, 24],
    unit: 'pont',
  },
  {
    id: 'temperature',
    name: '3. Napi hőmérsékletek (fagyos és enyhe, n = 7)',
    category: 'Meteorológia',
    description: 'Egy kora tavaszi hét napi középhőmérsékletei: 3, -2, 5, 0, 3, 1, 11 °C.',
    rawValues: [3, -2, 5, 0, 3, 1, 11],
    sortedValues: [-2, 0, 1, 3, 3, 5, 11],
    unit: '°C',
  },
];

export const CentralTendencyTheory: React.FC<CentralTendencyTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('grades');

  const preset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  // Calculations
  const n = preset.rawValues.length;
  const sum = preset.rawValues.reduce((a, b) => a + b, 0);
  const mean = Math.round((sum / n) * 100) / 100;

  // Mode calculation
  const freqMap: Record<number, number> = {};
  preset.rawValues.forEach(v => {
    freqMap[v] = (freqMap[v] || 0) + 1;
  });
  let maxFreq = 0;
  Object.values(freqMap).forEach(f => {
    if (f > maxFreq) maxFreq = f;
  });
  const modes = Object.keys(freqMap)
    .filter(k => freqMap[Number(k)] === maxFreq && maxFreq > 1)
    .map(Number);

  // Median calculation
  const isOdd = n % 2 !== 0;
  let medianText = '';
  let medianValue = 0;
  if (isOdd) {
    const midIdx = Math.floor(n / 2);
    medianValue = preset.sortedValues[midIdx];
    medianText = `${medianValue}`;
  } else {
    const mid1 = preset.sortedValues[n / 2 - 1];
    const mid2 = preset.sortedValues[n / 2];
    medianValue = (mid1 + mid2) / 2;
    medianText = `(${mid1} + ${mid2}) / 2 = ${medianValue}`;
  }

  // Range
  const minVal = preset.sortedValues[0];
  const maxVal = preset.sortedValues[n - 1];
  const range = maxVal - minVal;

  return (
    <TheoryTemplate
      title="4. Átlag, módusz, medián és terjedelem"
      subtitle="A statisztikai adatelemzés alapvető középértékei és helyzetmutatói a 7. osztályban"
      topicBadge="7. OSZTÁLY • VIII. HOZZÁRENDELÉSEK, STATISZTIKA"
      themeColor="emerald"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
      practiceSubtitle="30 feladat statisztikai számításokkal, rendezéssel és magyarázatokkal"
      practiceButtonText="Teszteld a tudásod (30 kérdés)"
      quickRule={{
        label: 'A 4 statisztikai alappillér',
        formula: 'Átlag = Összeg / n | Módusz = Leggyakoribb érték | Medián = Rendezett középső | Terjedelem = Maximum - Minimum'
      }}
      sections={[
        {
          id: 'sec-overview',
          title: 'A 4 legfontosabb statisztikai mutató áttekintése',
          badge: 'Alapfogalmak',
          badgeColor: 'emerald',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A statisztikában a begyűjtött adatokat (például osztályzatok, mérési eredmények, árak) szeretnénk néhány jól értelmezhető számmal jellemezni. Erre szolgálnak a <strong>középértékek (helyzetmutatók)</strong> és a <strong>szóródási mutatók</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    Számtani közép (Átlag - x̄)
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Az adatok összegének és az adatok számának a hányadosa. Minden adat egyformán beleszámít.
                  </p>
                  <div className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 pt-1">
                    x̄ = (összeg) / n
                  </div>
                </Card>

                <Card className="p-3.5 bg-sky-50/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold text-xs">
                    <Hash className="w-4 h-4 text-sky-600" />
                    Módusz ($Mo$)
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    A mintában a <strong>legtöbbször előforduló</strong> (legnagyobb gyakoriságú) érték. Kategóriákra is működik!
                  </p>
                  <div className="text-[10px] font-mono font-bold text-sky-700 dark:text-sky-300 pt-1">
                    Leggyakoribb adat
                  </div>
                </Card>

                <Card className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold text-xs">
                    <AlignCenter className="w-4 h-4 text-indigo-600" />
                    Medián ($Me$)
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    A <strong>nagyság szerint rendezett</strong> adatsor pontosan középső eleme (párosnál a két középső átlaga).
                  </p>
                  <div className="text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-300 pt-1">
                    Középső érték
                  </div>
                </Card>

                <Card className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 rounded-xl space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                    <ArrowUpDown className="w-4 h-4 text-amber-600" />
                    Terjedelem ($R$)
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    A legnagyobb és a legkisebb adat közötti különbség. A szóródás legegyszerűbb mutatója.
                  </p>
                  <div className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 pt-1">
                    R = x_max - x_min
                  </div>
                </Card>
              </div>
            </div>
          )
        },
        {
          id: 'sec-median-steps',
          title: 'Hogyan számoljuk a mediánt? (Páros és páratlan elemszám)',
          badge: 'Fontos lépések',
          badgeColor: 'indigo',
          content: (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
                  <strong>A Medián aranyszabálya:</strong> Soha ne keresd a mediánt az eredeti, rendezetlen adatsorban! Az 1. lépés mindig a <strong>nagyság szerinti (növekvő) sorba rendezés</strong>!
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5 shadow-xs">
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center font-bold">1</span>
                    Páratlan elemszám esetén ($n$ páratlan)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Ha az adatok száma páratlan, akkor a növekvő sorrendbe állítás után pontosan <strong>egy darab középső elem</strong> létezik. Ez a szám a medián!
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div>Adatok (n = 5): 7, 2, 9, 4, 5</div>
                    <div>Rendezve: 2, 4, <strong>5</strong>, 7, 9</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">Me = 5</div>
                  </div>
                </Card>

                <Card className="p-4 bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl space-y-2.5 shadow-xs">
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 text-xs flex items-center justify-center font-bold">2</span>
                    Páros elemszám esetén (n páros)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Ha az adatok száma páros, nincs egyetlen középső elem; a <strong>két középső szám számtani közepét</strong> vesszük!
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div>Adatok (n = 6): 3, 8, 1, 10, 4, 6</div>
                    <div>Rendezve: 1, 3, <strong>4</strong>, <strong>6</strong>, 8, 10</div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-bold">Me = (4 + 6) / 2 = 5</div>
                  </div>
                </Card>
              </div>
            </div>
          )
        },
        {
          id: 'sec-outliers',
          title: 'Átlag vs. Medián: Miért van szükség mindkettőre?',
          badge: 'Adatelemzés',
          badgeColor: 'teal',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Miért nem elég csak az átlagot kiszámolni? Azért, mert az átlag <strong>nagyon érzékeny a kiugró (szélsőséges) adatokra</strong>, míg a medián <strong>robusztus (ellenálló)</strong> marad:
              </p>

              <div className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Gyakorlati példa: Fizetések egy 5 fős kisvállalkozásnál (ezer Ft-ban)
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div>4 dolgozó fizetése: $350, 360, 380, 410$ ezer Ft.</div>
                  <div>A cégtulajdonos fizetése (kiugró adat): $2500$ ezer Ft.</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs">
                    <strong className="text-rose-800 dark:text-rose-300">Átlagfizetés:</strong><br />
                    (350 + 360 + 380 + 410 + 2500) / 5 = <strong>800 ezer Ft</strong>.<br />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">Megtévesztő, hiszen a dolgozók 80%-a ennek felét sem keresi!</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs">
                    <strong className="text-emerald-800 dark:text-emerald-300">Mediánfizetés:</strong><br />
                    Rendezve: 350, 360, <strong>380</strong>, 410, 2500 → <strong>380 ezer Ft</strong>.<br />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">Valósághű képet ad a tipikus dolgozói keresetről!</span>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'sec-interactive-lab',
          title: 'Interaktív Statisztikai Laboratórium',
          badge: 'Élő számítás',
          badgeColor: 'emerald',
          content: (
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Válaszd ki az alábbi mintaadatsorok egyikét, és figyeld meg az adatok rendezését, a medián kijelölését, valamint az átlag és a terjedelem azonnali kiszámítását!
              </p>

              {/* Preset Selector */}
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <Button
                    key={p.id}
                    variant={selectedPresetId === p.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPresetId(p.id)}
                    className={
                      selectedPresetId === p.id
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                        : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }
                  >
                    {p.name}
                  </Button>
                ))}
              </div>

              {/* Interactive Calculation Card */}
              <Card className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      {preset.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{preset.name}</h3>
                  </div>
                  <div className="text-xs text-slate-400">
                    Elemszám: <strong className="text-white">{n} adat</strong> ({isOdd ? 'Páratlan' : 'Páros'})
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {preset.description}
                </p>

                {/* Data values visual pills */}
                <div className="space-y-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium">Eredeti (nyers) adatsor:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {preset.rawValues.map((val, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Növekvő nagyságrendbe állítva (Mediánhoz):
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {preset.sortedValues.map((val, idx) => {
                        let isMedianItem = false;
                        if (isOdd && idx === Math.floor(n / 2)) isMedianItem = true;
                        if (!isOdd && (idx === n / 2 - 1 || idx === n / 2)) isMedianItem = true;

                        return (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                              isMedianItem
                                ? 'bg-indigo-600 text-white border-2 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] scale-105'
                                : 'bg-slate-800 border border-slate-700 text-slate-300'
                            }`}
                          >
                            {val}
                            {isMedianItem && <span className="ml-1 text-[9px] text-indigo-200">★</span>}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Calculated statistics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                    <span className="text-slate-400 text-[11px]">Átlag (x̄):</span>
                    <div className="text-base font-extrabold text-emerald-400 mt-1">
                      {mean} <span className="text-[10px] text-slate-400 font-normal">{preset.unit}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">Összeg: {sum} / {n}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                    <span className="text-slate-400 text-[11px]">Módusz ($Mo$):</span>
                    <div className="text-base font-extrabold text-sky-400 mt-1">
                      {modes.length > 0 ? modes.join(', ') : 'Nincs'}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      {modes.length > 0 ? `(${maxFreq}× szerepel)` : 'Minden adat 1×'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                    <span className="text-slate-400 text-[11px]">Medián ($Me$):</span>
                    <div className="text-base font-extrabold text-indigo-400 mt-1">
                      {medianText}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      {isOdd ? 'Középső elem' : 'Két középső átlaga'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                    <span className="text-slate-400 text-[11px]">Terjedelem ($R$):</span>
                    <div className="text-base font-extrabold text-amber-400 mt-1">
                      {range} <span className="text-[10px] text-slate-400 font-normal">{preset.unit}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">{maxVal} - ({minVal})</span>
                  </div>
                </div>
              </Card>
            </div>
          )
        }
      ]}
      selfCheckQuestions={[
        {
          id: 'sc-ct-1',
          question: 'Mi a legelső kötelező lépés egy adathalmaz mediánjának meghatározásakor?',
          options: [
            'Az adatok nagyság szerinti (növekvő) sorba rendezése',
            'Az összes adat összeadása és elosztása kettővel',
            'A legnagyobb és a legkisebb adat kiválasztása',
            'A leggyakoribb szám megkeresése'
          ],
          correctAnswer: 0,
          explanation: 'A medián a rendezett minta középső adata! Rendezetlen adatsorból a középen lévő elem kiválasztása teljesen hibás eredményt ad.'
        },
        {
          id: 'sc-ct-2',
          question: 'Hogyan számítjuk ki egy 6 elemű (páros elemszámú) rendezett adatsor mediánját?',
          options: [
            'A 3. és a 4. adat számtani közepét (átlagát) vesszük',
            'Mindig pontosan a 3. adatot választjuk',
            'Mindig pontosan a 4. adatot választjuk',
            'Páros elemszám esetén nem létezik medián'
          ],
          correctAnswer: 0,
          explanation: 'Páros elemszám (n = 6) esetén nincs egyetlen kitüntetett középső adat, ezért a két középen álló elem (a 3. és 4.) számtani közepét (átlagát) tekintjük mediánnak.'
        },
        {
          id: 'sc-ct-3',
          question: 'Egy 5 fős csoport életkora: 12, 12, 13, 14, 49 év. Melyik mutató mutatja meg leginkább a csoport jellemző életkorát?',
          options: [
            'A medián (13 év), mert nem torzítja el a kiugró 49 éves adat',
            'Az átlag (20 év), mert az minden adatot tartalmaz',
            'A terjedelem (37 év)',
            'Semelyik sem'
          ],
          correctAnswer: 0,
          explanation: 'Az átlagot a kiugró 49 éves érték felhúzza 20 évre (pedig a gyerekek 12-14 évesek). A medián (13 év) robusztus, így reálisan tükrözi a tipikus életkort.'
        },
        {
          id: 'sc-ct-4',
          question: 'Mennyi a [3, 7, 7, 11] adatsor terjedelme?',
          options: [
            '8 (mivel 11 - 3 = 8)',
            '7',
            '4',
            '28'
          ],
          correctAnswer: 0,
          explanation: 'A terjedelem a legnagyobb és a legkisebb elem különbsége: R = Max - Min = 11 - 3 = 8.'
        }
      ]}
    />
  );
};

export default CentralTendencyTheory;
