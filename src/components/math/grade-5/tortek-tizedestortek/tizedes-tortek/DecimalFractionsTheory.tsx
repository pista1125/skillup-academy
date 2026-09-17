import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Layers,
  ArrowRight,
  Divide,
  HelpCircle,
  RefreshCw,
  PieChart,
  Binary,
  BookOpen,
  Award,
  Coins,
  Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface DecimalFractionsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const DecimalFractionsTheory: React.FC<DecimalFractionsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Place Value Explorer State
  const [wholePart, setWholePart] = useState<number>(3);
  const [tenths, setTenths] = useState<number>(4);
  const [hundredths, setHundredths] = useState<number>(7);
  const [thousandths, setThousandths] = useState<number>(5);

  const decimalVal = `${wholePart},${tenths}${hundredths}${thousandths}`;
  const numValue = wholePart + tenths * 0.1 + hundredths * 0.01 + thousandths * 0.001;

  // Words formatting in Hungarian
  const readWords = `${wholePart} egész, ${tenths}${hundredths}${thousandths} ezred`;

  return (
    <TheoryTemplate
      title="Tizedes törtek alapjai – Helyiértékek és értelmezés"
      subtitle="Fedezd fel a tizedes törtek felépítését, a tizedesvessző szerepét, a helyiérték-táblázatot és a helyiértékes bontást!"
      badgeText="🪙 5. Osztály • II. Törtek, tizedes törtek"
      documentId="decimal-fractions-theory-content"
      pdfFilename="5_osztaly_tizedes_tortek_alapjai_tananyag.pdf"
      quickRule={{
        label: 'TIZEDES HELYIÉRTÉKEK ÉS ÁTVÁLTÁS',
        formula: '0,1 = 1/10 (tized) | 0,01 = 1/100 (század) | 0,001 = 1/1000 (ezred)'
      }}
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: MI A TIZEDES TÖRT ÉS MIÉRT VAN RÁ SZÜKSÉG? */}
      <TheorySection
        number={1}
        title="A tizedes tört fogalma és a tizedesvessző"
        icon={<Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <TheoryCard
          title="A tízes számrendszer kiterjesztése 1-nél kisebb részekre"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              A mindennapi életben a mennyiségek (pl. pénz, hosszúság, tömeg) ritkán mérhetők pontosan egész számokkal. 
              A <strong>tizedes tört</strong> olyan tört alak, amely a tízes számrendszer helyiértékeinek logikáját folytatja az 1 egésznél kisebb részekre is.
            </p>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <div className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
                <span>🔑 A tizedesvessző szerepe:</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                A <strong>tizedesvessző</strong> választja el a szám <strong>egész részét</strong> a tört résztől (az 1-nél kisebb helyiértékektől).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-700">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Egész rész (balra)</div>
                  <div className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">3 egész</div>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-rose-300 dark:border-rose-700">
                  <div className="text-[11px] font-bold text-rose-500 uppercase">Tizedesvessző</div>
                  <div className="text-xl font-black text-rose-600 dark:text-rose-400 font-mono">, (vessző)</div>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-700">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Törtrész (jobbra)</div>
                  <div className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">75 század</div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: HELYIÉRTÉK-TÁBLÁZAT ÉS TIZEDESJEGYEK */}
      <TheorySection
        number={2}
        title="Helyiértékek a tizedesvessző után"
        icon={<Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <TheoryCard
          title="Hogyan csökkennek a helyiértékek tizedére?"
          icon={<Binary className="w-5 h-5 text-indigo-500" />}
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Ahogy balról jobbra haladunk a számjegyeken, minden egyes helyiérték az előzőnek a <strong>tizedrésze</strong> (<MathText>1/10</MathText>-e):
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b">
                    <th className="p-2.5 border">Százasok (Sz)</th>
                    <th className="p-2.5 border">Tízesek (T)</th>
                    <th className="p-2.5 border">Egyesek (E)</th>
                    <th className="p-2.5 border bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-black">,</th>
                    <th className="p-2.5 border bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200">Tizedek (t)</th>
                    <th className="p-2.5 border bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200">Századok (sz)</th>
                    <th className="p-2.5 border bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200">Ezredek (e)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono">
                  <tr className="bg-slate-50/50 dark:bg-slate-900/40 text-[11px] text-slate-500">
                    <td className="p-2 border">100</td>
                    <td className="p-2 border">10</td>
                    <td className="p-2 border">1</td>
                    <td className="p-2 border bg-rose-50 dark:bg-rose-950/30 font-bold">Vessző</td>
                    <td className="p-2 border text-amber-600 dark:text-amber-400 font-bold">0,1 = <MathText>1/10</MathText></td>
                    <td className="p-2 border text-amber-600 dark:text-amber-400 font-bold">0,01 = <MathText>1/100</MathText></td>
                    <td className="p-2 border text-amber-600 dark:text-amber-400 font-bold">0,001 = <MathText>1/1000</MathText></td>
                  </tr>
                  <tr className="font-bold text-sm bg-white dark:bg-slate-900">
                    <td className="p-2 border text-slate-400">0</td>
                    <td className="p-2 border text-slate-400">0</td>
                    <td className="p-2 border text-indigo-600 dark:text-indigo-400">3</td>
                    <td className="p-2 border text-rose-600 font-black">,</td>
                    <td className="p-2 border text-emerald-600 dark:text-emerald-400">4</td>
                    <td className="p-2 border text-emerald-600 dark:text-emerald-400">7</td>
                    <td className="p-2 border text-emerald-600 dark:text-emerald-400">5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-800 text-xs text-slate-700 dark:text-slate-300">
              <strong>Kiolvasás:</strong> 3 egész, 475 ezred (mindig az <em>utolsó helyiérték</em> nevét mondjuk a törtrész végén!).
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZAKASZ: HELYIÉRTÉKES BONTÁS ÉS KÖZÖNSÉGES TÖRT ALAK */}
      <TheorySection
        number={3}
        title="Helyiértékes bontás és kapcsolat a törtekkel"
        icon={<Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Helyiértékes összegként való felírás"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          >
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Minden tizedes tört felbontható az egyes helyiértékek összegeként:
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl font-mono text-center font-bold text-xs space-y-1 border">
                <div className="text-amber-700 dark:text-amber-300">2,354 felbontása:</div>
                <div><MathText>2,354 = 2 + 0,3 + 0,05 + 0,004</MathText></div>
                <div className="text-[11px] text-slate-500">vagy törtekkel:</div>
                <div><MathText>2,354 = 2 + 3/10 + 5/100 + 4/1000</MathText></div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Átírás tizedestörtből közönséges törtté"
            icon={<RefreshCw className="w-5 h-5 text-indigo-500" />}
          >
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <strong>1 tizedesjegy (tizedek):</strong> Nevező a 10.
                <div className="font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-0.5"><MathText>0,7 = 7/10</MathText> és <MathText>1,3 = 13/10 = 1 3/10</MathText></div>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <strong>2 tizedesjegy (századok):</strong> Nevező a 100.
                <div className="font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-0.5"><MathText>0,25 = 25/100 = 1/4</MathText></div>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <strong>3 tizedesjegy (ezredek):</strong> Nevező az 1000.
                <div className="font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-0.5"><MathText>0,125 = 125/1000 = 1/8</MathText></div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: INTERAKTÍV HELYIÉRTÉK ÉS TIZEDESTÖRT LABORATÓRIUM */}
      <TheorySection
        number={4}
        title="Interaktív Helyiérték és Tizedestört Laboratórium"
        icon={<Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 border-2 border-amber-200 dark:border-amber-800">
          <div className="text-center mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Állíts össze tetszőleges tizedes törtet!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mozgasd a csúszkákat a helyiértékek beállításához és figyeld az átváltásokat!
            </p>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border text-center shadow-xs">
              <label className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block uppercase">Egyesek ({wholePart})</label>
              <input type="range" min={0} max={9} value={wholePart} onChange={(e) => setWholePart(Number(e.target.value))} className="w-full accent-indigo-600 mt-1 cursor-pointer" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border text-center shadow-xs">
              <label className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block uppercase">Tizedek ({tenths})</label>
              <input type="range" min={0} max={9} value={tenths} onChange={(e) => setTenths(Number(e.target.value))} className="w-full accent-amber-600 mt-1 cursor-pointer" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border text-center shadow-xs">
              <label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase">Századok ({hundredths})</label>
              <input type="range" min={0} max={9} value={hundredths} onChange={(e) => setHundredths(Number(e.target.value))} className="w-full accent-emerald-600 mt-1 cursor-pointer" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border text-center shadow-xs">
              <label className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block uppercase">Ezredek ({thousandths})</label>
              <input type="range" min={0} max={9} value={thousandths} onChange={(e) => setThousandths(Number(e.target.value))} className="w-full accent-purple-600 mt-1 cursor-pointer" />
            </div>
          </div>

          {/* Results Visualizer */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-4 text-center">
            <div className="text-3xl sm:text-4xl font-mono font-black text-amber-700 dark:text-amber-300">
              {decimalVal}
            </div>

            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl text-center text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-amber-900 dark:text-amber-200">Szöveges kiolvasás: </span>
              <span className="italic font-medium">{readWords}</span>
            </div>

            {/* Place value breakdown cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
                <div className="font-bold text-slate-700 dark:text-slate-200">Helyiértékes tizedestört összeg:</div>
                <div className="font-mono text-indigo-600 dark:text-indigo-400">
                  {wholePart} + {(tenths * 0.1).toFixed(1).replace('.', ',')} + {(hundredths * 0.01).toFixed(2).replace('.', ',')} + {(thousandths * 0.001).toFixed(3).replace('.', ',')}
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
                <div className="font-bold text-slate-700 dark:text-slate-200">Közönséges tört összeg:</div>
                <div className="font-mono text-emerald-600 dark:text-emerald-400">
                  <MathText>{wholePart} + {tenths}/10 + {hundredths}/100 + {thousandths}/1000</MathText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: A TIZEDESTÖRT VÉGÉN LÉVŐ NULLÁK SZABÁLYA */}
      <TheorySection
        number={5}
        title="A nullák szabálya a tizedes törtekben"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. Nullák a tört legvégén (Érték NEM változik)"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha a tizedes tört <strong>végére nullákat írunk vagy onnan nullákat törlünk</strong>, a tizedes tört értéke <strong>nem változik</strong>:
            </p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl font-mono text-center font-bold text-xs text-emerald-800 dark:text-emerald-300">
              0,5 = 0,50 = 0,500 = 0,5000
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Ez a közönséges törteknél a 10-zel, 100-zal való bővítésnek felel meg: <MathText>5/10 = 50/100 = 500/1000</MathText>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Nullák a tizedesvessző után, számjegyek előtt (Érték VÁLTOZIK!)"
            icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha a tizedesvessző és az első nem nulla számjegy közé írunk nullát, a tört értéke <strong>tizedére, századára csökken</strong>:
            </p>
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl font-mono text-center font-bold text-xs text-rose-700 dark:text-rose-300">
              0,5 (5 tized) ≠ 0,05 (5 század) ≠ 0,005 (5 ezred)
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              A 0 eltolja a számjegyet kisebb helyiértékre!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: GYAKORI HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={6}
        title="Gyakori hibák – Kerüld el a csapdákat!"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Századok és tizedek összekeverése"
            wrong="3 század = 0,3"
            correct="3 század = 0,03 (és 3 tized = 0,3)"
            explanation="A századok a tizedesvessző utáni 2. helyiértéken állnak! Ha 0,3-at írsz, az 3 tized (azaz 30 század)!"
          />

          <TheoryTrapBox
            title="2. Hosszabb számjegy automatikusan nagyobb?"
            wrong="0,175 > 0,4 (mert 175 > 4)"
            correct="0,4 = 0,400 > 0,175"
            explanation="Tizedestörteknél nem a jegyek száma dönt! Hasonlítsd össze a tizedeket: 4 tized > 1 tized!"
          />

          <TheoryTrapBox
            title="3. Nulla elhagyása az egyes helyiértéken"
            wrong=",75 leírása"
            correct="0,75 leírása kötelező"
            explanation="Ha nincs egész rész, kötelező kitenni a 0-t a tizedesvessző elé: 0,75!"
          />

          <TheoryTrapBox
            title="4. Tizedesvessző utáni nullák elhagyása belül"
            wrong="2,05 = 2,5"
            correct="2,05 ≠ 2,5 (2,05 = 2 egész 5 század, 2,5 = 2 egész 50 század)"
            explanation="Csak a szám legvégén álló felesleges nullákat lehet elhagyni, a szám belsejében álló helyiértékjelölő nullát tilos törölni!"
          />
        </div>
      </TheorySection>

      {/* 7. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={7}
        title="Tizedes törtek helyiérték- és átváltási táblázata"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryTable
          title="Gyakori tizedestörtek és tört megfelelőik"
          headers={['Tizedes tört', 'Helyiértékes megnevezés', 'Közönséges tört', 'Egyszerűsített alak']}
          rows={[
            ['0,1', '1 tized', '1/10', '1/10'],
            ['0,5', '5 tized (50 század)', '5/10', '1/2 (fél)'],
            ['0,25', '25 század', '25/100', '1/4 (negyed)'],
            ['0,75', '75 század', '75/100', '3/4 (háromnegyed)'],
            ['0,2', '2 tized (20 század)', '2/10', '1/5 (ötöd)'],
            ['0,125', '125 ezred', '125/1000', '1/8 (nyolcad)'],
            ['1,5', '1 egész 5 tized', '15/10', '1 1/2'],
            ['2,05', '2 egész 5 század', '205/100', '2 1/20']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DecimalFractionsTheory;
