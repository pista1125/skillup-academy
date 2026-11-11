import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  MathText
} from '../TheoryTemplate';
import {
  CoinFlipLawOfLargeNumbersSvg,
  ThreeCoinsOutcomesSvg,
  DiceSimulationFrequencySvg
} from './RandomFrequencyFigures';
import {
  Sliders,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Dices,
  CircleDot,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RandomFrequencyTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const RandomFrequencyTheory: React.FC<RandomFrequencyTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Érmedobás Szimulátor Labor State ---
  const [totalFlips, setTotalFlips] = useState<number>(100);
  const [headsCount, setHeadsCount] = useState<number>(49);

  const relativeFrequency = totalFlips > 0 ? headsCount / totalFlips : 0;
  const deviation = Math.abs(relativeFrequency - 0.5);

  const handlePreset = (preset: 't50' | 't100' | 't200' | 't400' | 'random100') => {
    if (preset === 't50') {
      setTotalFlips(50);
      setHeadsCount(24);
    } else if (preset === 't100') {
      setTotalFlips(100);
      setHeadsCount(49);
    } else if (preset === 't200') {
      setTotalFlips(200);
      setHeadsCount(93);
    } else if (preset === 't400') {
      setTotalFlips(400);
      setHeadsCount(201);
    } else {
      // Szimulált véletlen generálás 100 dobásra
      let h = 0;
      for (let i = 0; i < 100; i++) {
        if (Math.random() < 0.5) h++;
      }
      setTotalFlips(100);
      setHeadsCount(h);
    }
  };

  const addFlips = (count: number) => {
    let extraHeads = 0;
    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.5) extraHeads++;
    }
    setTotalFlips((prev) => prev + count);
    setHeadsCount((prev) => prev + extraHeads);
  };

  const handleReset = () => {
    setTotalFlips(100);
    setHeadsCount(49);
  };

  const interactiveSection = (
    <div className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 border border-violet-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-violet-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-violet-500 text-slate-950 rounded-2xl shadow-lg">
            <Dices className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-violet-100">
              Interaktív Érmedobó &amp; Stabilitás Szimulátor
            </h3>
            <p className="text-xs text-violet-300/80">
              Kísérletezz élőben! Figyeld meg, hogyan simul a relatív gyakoriság a kísérletek számának növelésével 0,5-höz!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-violet-900"
            onClick={() => handlePreset('t50')}
          >
            Tankönyv: 50 dobás
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-violet-900"
            onClick={() => handlePreset('t200')}
          >
            Tankönyv: 200 dobás
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-violet-900"
            onClick={() => handlePreset('t400')}
          >
            Tankönyv: 400 dobás
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-violet-900"
            onClick={() => handlePreset('random100')}
          >
            Új 100 véletlen dobás
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-8 text-violet-300 hover:text-white"
            onClick={handleReset}
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Alaphelyzet
          </Button>
        </div>
      </div>

      {/* Dobás gombok és statisztikák */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-300">Folytasd a kísérletet további dobásokkal:</div>
          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-violet-600 hover:bg-violet-700 text-white text-xs h-9 px-3"
              onClick={() => addFlips(10)}
            >
              +10 Dobás
            </Button>
            <Button
              className="bg-violet-600 hover:bg-violet-700 text-white text-xs h-9 px-3"
              onClick={() => addFlips(50)}
            >
              +50 Dobás
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-9 px-3"
              onClick={() => addFlips(100)}
            >
              +100 Dobás
            </Button>
          </div>
          <p className="text-[11px] text-slate-400">
            A szimulátor valódi pseudorandom algoritmust használ minden egyes érmedobáshoz (p = 0,5).
          </p>
        </div>

        {/* Eredményjelző kártyák */}
        <div className="md:col-span-7 grid grid-cols-3 gap-3">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-violet-700/40 text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Összes dobás (n)</div>
            <div className="text-2xl font-black text-violet-300 mt-1">{totalFlips}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">kísérlet</div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-fuchsia-700/40 text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Fejek száma (k)</div>
            <div className="text-2xl font-black text-fuchsia-300 mt-1">{headsCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">gyakoriság</div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-emerald-700/40 text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Relatív gyakoriság (k/n)</div>
            <div className="text-2xl font-black text-emerald-300 mt-1">{relativeFrequency.toFixed(4)}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">({(relativeFrequency * 100).toFixed(1)}%)</div>
          </div>
        </div>
      </div>

      {/* Vizuális mérősáv */}
      <div className="bg-slate-800/60 p-4 rounded-xl border border-violet-800/30 space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-300">Közeledés az elméleti 0,5 valószínűséghez:</span>
          <span className={deviation < 0.02 ? 'text-emerald-400' : 'text-amber-400'}>
            Eltérés: {deviation.toFixed(4)} ({deviation < 0.02 ? 'kiváló egyezés!' : 'még ingadozik'})
          </span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden flex relative">
          <div
            className="h-full bg-violet-500 transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, relativeFrequency * 100))}%` }}
          ></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-400 z-10"></div>
        </div>
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>0,0 (0%)</span>
          <span className="text-red-400 font-bold">0,5 (Elméleti P)</span>
          <span>1,0 (100%)</span>
        </div>
      </div>
    </div>
  );

  return (
    <TheoryTemplate
      title="Véletlen? – Relatív gyakoriság"
      subtitle="Véletlen kísérletek, események gyakorisága, a relatív gyakoriság empirikus stabilitása és a valószínűség szemléletes megalapozása"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="violet"
      documentId="grade10-random-frequency-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK: VÉLETLEN ÉS RELATÍV GYAKORISÁG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-violet-50/90 dark:bg-violet-950/40 p-2.5 rounded-xl border border-violet-200 dark:border-violet-800">
              <span className="font-black text-violet-900 dark:text-violet-300 block mb-1">
                Alapdefiníciók és tételek:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>Gyakoriság (<MathText>{'$k$'}</MathText>):</strong> a kedvező bekövetkezések pontos darabszáma (<MathText>{'$0 \\le k \\le n$'}</MathText>).</li>
                <li>• <strong>Relatív gyakoriság (<MathText>{'$g$'}</MathText>):</strong> <MathText>{'$g = \\frac{k}{n}$'}</MathText>, értéke mindig a <MathText>{'$[0; 1]$'}</MathText> zárt intervallumba esik!</li>
                <li>• <strong>Stabilitás törvénye:</strong> <MathText>{'$n \\to \\infty$'}</MathText> esetén a relatív gyakoriság a valószínűséghez (<MathText>{'$P(A)$'}</MathText>) simul!</li>
              </ul>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px] leading-tight">
              <strong>⚠️ TIBOR CSAPDÁJA:</strong> 3 érme feldobásakor a kimenetelek NEM 1/4 esélyűek! Az elemi események száma <MathText>{'$2^3 = 8$'}</MathText>, így 1 fej és 2 írás valószínűsége <MathText>{'$\\frac{3}{8} = 37,5\\%$'}</MathText>!
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Teszteld a tudásodat a relatív gyakoriságból!"
      practiceSubtitle="Gyakorold az érmedobások, kockák és kísérletek valószínűségi logikáját 30 feladaton át!"
      practiceButtonText="Kvíz indítása"
      tips={[
        {
          title: 'Gyakoriság vs. Relatív gyakoriság',
          content: 'A gyakoriság egy darabszám (pl. 24 fej), míg a relatív gyakoriság egy arány vagy százalék (24/50 = 48%). Csak a relatív gyakoriság teszi összehasonlíthatóvá a különböző hosszúságú kísérleteket!'
        },
        {
          title: 'Függetlenség az érméknél',
          content: 'Az érmének nincs memóriája: ha egymás után ötször fejet dobtunk, a hatodik dobásnál a fej és az írás esélye továbbra is pontosan 50-50% marad.'
        },
        {
          title: 'Elemi események felírása',
          content: 'Több érme vagy kocka esetén mindig készíts táblázatot vagy fadiagramot, hogy egyetlen mikroszkopikus elemi esemény se maradjon ki!'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/40 dark:via-purple-950/30 dark:to-fuchsia-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-violet-300/80 dark:border-violet-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-violet-200/80 dark:border-violet-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-violet-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-100 dark:bg-violet-900/60 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok a véletlenhez és relatív gyakorisághoz
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-violet-700 dark:text-violet-300 bg-violet-100/80 dark:bg-violet-900/40 px-3 py-1.5 rounded-xl border border-violet-200 dark:border-violet-800 self-start sm:self-auto">
            5 aranyszabály a valószínűségszámítás alapjaihoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-violet-200 dark:border-violet-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-violet-100 dark:bg-violet-900/60 text-violet-800 dark:text-violet-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Véletlen kísérlet és esemény</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A véletlen kísérlet azonos körülmények között <b>bármikor megismételhető</b>, de egyedi kimenetele előre nem jósolható meg biztosan.
              </p>
              <div className="my-2 p-2 bg-violet-50 dark:bg-violet-950/50 rounded-xl text-center font-bold text-violet-800 dark:text-violet-300 text-xs sm:text-sm border border-violet-100 dark:border-violet-800">
                <MathText>{'A \\subseteq \\Omega \\quad (\\text{az esemény a kimenetelek részhalmaza})'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-violet-700 dark:text-violet-400 font-medium mt-1">
              💡 Példa: egy szabályos érme feldobása vagy kockadobás.
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/60 text-fuchsia-800 dark:text-fuchsia-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Relatív gyakoriság képlete</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha az <MathText>{'$n$'}</MathText> kísérletből a vizsgált esemény <MathText>{'$k$'}</MathText>-szor fordult elő, a relatív gyakoriság:
              </p>
              <div className="my-2 p-2 bg-fuchsia-50 dark:bg-fuchsia-950/50 rounded-xl text-center font-bold text-fuchsia-800 dark:text-fuchsia-300 text-xs sm:text-sm border border-fuchsia-100 dark:border-fuchsia-800">
                <MathText>{'g(A) = \\frac{k}{n} \\quad \\text{és} \\quad 0 \\le g(A) \\le 1'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-fuchsia-700 dark:text-fuchsia-400 font-medium mt-1">
              💡 Százalékban kifejezve mindig 0% és 100% közötti érték.
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A relatív gyakoriság stabilitása</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Kis kísérletszámnál a relatív gyakoriság erősen ingadozik, de a kísérletek számának növelésével egy <b>fix számhoz (valószínűség)</b> simul:
              </p>
              <div className="my-2 p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm border border-emerald-100 dark:border-emerald-800">
                <MathText>{'\\frac{k}{n} \\xrightarrow{n \\to \\infty} P(A)'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
              💡 Ez a nagy számok empirikus alaptörvénye.
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-rose-200 dark:border-rose-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tibor csapdája (3 érme)</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                3 érménél NEM 4 egyenlő eset van! Az elemi események száma <MathText>{'$2^3 = 8$'}</MathText>. Az „1 fej és 2 írás” 3 elemi esetből áll:
              </p>
              <div className="my-2 p-2 bg-rose-50 dark:bg-rose-950/50 rounded-xl text-center font-bold text-rose-800 dark:text-rose-300 text-xs sm:text-sm border border-rose-100 dark:border-rose-800">
                <MathText>{'P(1\\text{ fej}, 2\\text{ írás}) = \\frac{3}{8} = 37,5\\% \\quad (\\ne 25\\%!)'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-400 font-medium mt-1">
              ⚠️ Az összetett események nem mindig egyformán valószínűek!
            </p>
          </div>

          {/* 5. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center">5</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A „játékos tévedése” (Gambler's Fallacy)</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tévhit: <i>„Ha már négyszer egymás után írást dobtunk, most már biztosan fejnek kell jönnie, hogy kiegyenlítődjön!”</i>
              </p>
              <div className="my-2 p-2.5 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-amber-900 dark:text-amber-200 text-xs space-y-1 border border-amber-200 dark:border-amber-800">
                <div>• Az érmének és a dobókockának <b>nincs memóriája</b>: a korábbi dobások nem befolyásolják a következőt!</div>
                <div>• Az ötödik dobásnál a fej valószínűsége <b>továbbra is pontosan 0,5</b> marad.</div>
              </div>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">
              🎯 A kísérletek egymástól függetlenek!
            </p>
          </div>
        </div>
      </div>

      {/* 1. SZEKCIÓ: VÉLETLEN KÍSÉRLET ÉS RELATÍV GYAKORISÁG */}
      <TheorySection
        title="1. A véletlen kísérlet és a relatív gyakoriság fogalma"
        subtitle="Hogyan ragadható meg matematikailag a kiszámíthatatlan véletlen?"
        badge="ALAPFOGALMAK"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              A hétköznapi életben gyakran mondjuk: <i>„véletlen, hogy kivel találkozunk az utcán”</i> vagy <i>„véletlen, hogy milyen számot húznak a lottón”</i>. A matematikában a véletlent pontosan definiált <b>véletlen kísérleteken</b> keresztül vizsgáljuk.
            </p>

            <TheoryCard title="A pénzérme feldobásának kísérlete" accentColor="violet">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
                Feldobunk egy 100 forintos érmét. A kimenetel vagy Fej (F), vagy Írás (I) lesz.
              </p>
              <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-xl text-xs sm:text-sm space-y-1.5 border border-violet-200 dark:border-violet-800">
                <div>• <b>Kísérletek száma (<MathText>{'$n$'}</MathText>):</b> A dobások teljes száma (pl. <MathText>{'$n = 50$'}</MathText>).</div>
                <div>• <b>Gyakoriság (<MathText>{'$k$'}</MathText>):</b> Hányszor lett fej a dobás (pl. <MathText>{'$k = 24$'}</MathText> alkalommal).</div>
                <div>• <b>Relatív gyakoriság (<MathText>{'$g$'}</MathText>):</b> A bekövetkezések aránya:
                  <div className="text-center font-bold text-violet-800 dark:text-violet-300 py-1">
                    <MathText>{'g = \\frac{k}{n} = \\frac{24}{50} = \\mathbf{0,48} \\quad (48\\%)'}</MathText>
                  </div>
                </div>
                <div className="pt-1 border-t border-violet-200 text-violet-900 dark:text-violet-300 font-medium text-[11px]">
                  Miért fontosabb a relatív gyakoriság? Ha valaki 50 dobásból 24 fejet kap, az 48%. Ha valaki 400 dobásból 201 fejet, az 50,25%. A relatív gyakoriság teszi az eredményeket összehasonlíthatóvá!
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <CoinFlipLawOfLargeNumbersSvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              1. Ábra: A fejek relatív gyakoriságának stabilizálódása 400 dobás során
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A RELATÍV GYAKORISÁG STABILITÁSA */}
      <TheorySection
        title="2. A relatív gyakoriság empirikus stabilitása"
        subtitle="Hogyan válik a sok-sok véletlen kimenetelből megbízható szabályosság?"
        badge="NAGY SZÁMOK TÖRVÉNYE"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p>
            A tankönyvi osztálykísérletben a diákok összesítették a dobásaikat 50, 100, 150 egészen 400 dobásig. Figyeljük meg a táblázat adatait:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-violet-100 dark:bg-violet-900/60 text-violet-900 dark:text-violet-200 font-bold">
                <tr>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Dobások száma (n)</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">50</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">100</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">150</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">200</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">250</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">300</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">350</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700 font-black text-violet-700 dark:text-violet-300">400</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800/80">
                <tr>
                  <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">Fejek száma (k)</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">24</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">49</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">69</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">93</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">116</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">148</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">172</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-black">201</td>
                </tr>
                <tr className="bg-violet-50/50 dark:bg-violet-950/30">
                  <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">Relatív gyakoriság (k/n)</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">0,48</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">0,49</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">0,46</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">0,47</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">0,46</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">0,49</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700">0,49</td>
                  <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-black text-emerald-600 dark:text-emerald-400">0,5025 ≈ 0,50</td>
                </tr>
              </tbody>
            </table>
          </div>

          <TheoryCallout title="Mit jelent a valószínűség a valóságban?" type="info">
            A hétköznapi kijelentés: <i>„a fej valószínűsége 0,5”</i> nem azt jelenti, hogy 10 dobásból pontosan 5 fej lesz! Azt jelenti, hogy <b>nagyon sok dobást végezve</b> a fejek aránya tetszőleges pontossággal megközelíti a 0,5-et.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: HÁROM ÉRME ÉS TIBOR TÉVEDÉSE */}
      <TheorySection
        title="3. Három érme feldobása: 8 elemi esemény és Tibor tévedése"
        subtitle="Miért nem egyformán valószínűek a látszólag hasonló kimenetelek?"
        badge="KOMBINATORIKUS HÁTTÉR"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 flex flex-col items-center">
            <ThreeCoinsOutcomesSvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              2. Ábra: A 3 érme 8 mikroszkopikus elemi eseménye
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              Dobjunk fel egyszerre 3 különböző érmét (egy 5 Ft-ost, egy 10 Ft-ost és egy 20 Ft-ost). Hányféle kimenetel lehetséges? Mivel mindegyik érme kétféle lehet (F vagy I), a szorzási szabály szerint összesen:
            </p>
            <div className="text-center font-bold text-violet-800 dark:text-violet-300 py-1 text-base">
              <MathText>{'2 \\cdot 2 \\cdot 2 = 2^3 = \\mathbf{8\\text{ elemi esemény}}'}</MathText>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-slate-900 dark:text-white">A 8 egyenlően valószínű elemi eset:</div>
              <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 font-mono">
                <div>• FFF (3 fej) ➔ 1 db</div>
                <div>• III (3 írás) ➔ 1 db</div>
                <div>• FFI, FIF, IFF (2F, 1I) ➔ 3 db</div>
                <div>• FII, IFI, IIF (1F, 2I) ➔ 3 db</div>
              </div>
            </div>

            <TheoryTrapBox title="TIBOR TÉVEDÉSE: Miért nem 1/4 az esély?">
              Tibor szerint csak 4 eset van: (3F, 3I, 2F1I, 1F2I), ezért a valószínűség <MathText>{'$1/4 = 25\\%$'}</MathText>.
              <br />
              <b>A hiba oka:</b> Ez a 4 eset <u>nem egyenlően valószínű</u>! Míg a 3F csak egyetlen módon (FFF) valósulhat meg, addig az 1 fej és 2 írás <b>3 különböző módon</b> (FII, IFI, IIF) jöhet létre.
              <br />
              Ezért: <MathText>{'$P(1\\text{ fej, } 2\\text{ írás}) = \\frac{3}{8} = \\mathbf{37,5\\%}$'}</MathText>!
            </TheoryTrapBox>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: KOCKADOBÁSOK ÉS SZIMULÁCIÓ */}
      <TheorySection
        title="4. Kockadobások számítógépes szimulációja: 850 dobás elemzése"
        subtitle="Összetett események relatív gyakoriságának meghatározása nagy adathalmazban"
        badge="SZIMULÁCIÓS ELEMZÉS"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              Számítógéppel generáltunk 850 darab véletlen kockadobást. Az egyes oldalak gyakorisága a következőképpen alakult:
            </p>

            <TheoryCard title="850 dobás statisztikai összesítése" accentColor="emerald">
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">• 1-es: 126 db (14,8%)</div>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300">• 2-es (P): 180 db (21,2%)</div>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300">• 3-as (P): 152 db (17,9%)</div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-800 dark:text-purple-300">• 4-es (Ö): 138 db (16,2%)</div>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300">• 5-ös (P): 119 db (14,0%)</div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-800 dark:text-purple-300">• 6-os (Ö): 135 db (15,9%)</div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl space-y-1.5 border border-emerald-200 dark:border-emerald-800">
                  <div>a) <b>Prímszám dobása {'{2, 3, 5}'}:</b>
                    <br />
                    Gyakoriság: <MathText>{'$180 + 152 + 119 = \\mathbf{451\\text{ db}}$'}</MathText>.
                    <br />
                    Relatív gyakoriság: <MathText>{'$\\frac{451}{850} \\approx \\mathbf{53,06\\%}$'}</MathText> (elméleti: <MathText>{'$\\frac{3}{6} = 50\\%$'}</MathText>).
                  </div>
                  <div>b) <b>Összetett szám dobása {'{4, 6}'}:</b>
                    <br />
                    Gyakoriság: <MathText>{'$138 + 135 = \\mathbf{273\\text{ db}}$'}</MathText>.
                    <br />
                    Relatív gyakoriság: <MathText>{'$\\frac{273}{850} \\approx \\mathbf{32,12\\%}$'}</MathText> (elméleti: <MathText>{'$\\frac{2}{6} \\approx 33,33\\%$'}</MathText>).
                  </div>
                  <div>c) <b>Legalább 5-ös dobása {'{5, 6}'}:</b>
                    <br />
                    Gyakoriság: <MathText>{'$119 + 135 = \\mathbf{254\\text{ db}}$'}</MathText> (relatív: <MathText>{'$\\frac{254}{850} \\approx \\mathbf{29,88\\%}$'}</MathText>).
                  </div>
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <DiceSimulationFrequencySvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              3. Ábra: 850 kockadobás kimenetelei és összetett eseményei
            </span>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

