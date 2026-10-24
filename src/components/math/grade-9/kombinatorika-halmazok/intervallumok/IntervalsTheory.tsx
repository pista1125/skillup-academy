import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  MoveHorizontal,
  Compass,
  Layers,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Binary,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Maximize2
} from 'lucide-react';
import {
  OpenIntervalSvg,
  ClosedIntervalSvg,
  HalfOpenIntervalSvg,
  InfiniteIntervalSvg,
  IntervalIntersectionSvg,
  IntervalUnionSvg,
  IntervalDifferenceSvg,
  DiscreteVsContinuousSvg
} from './IntervalsFigures';

interface IntervalsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const IntervalsTheory: React.FC<IntervalsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV LABOR: Két Intervallum Műveleti Vizsgáló ---
  const [a1, setA1] = useState<number>(-2);
  const [b1, setB1] = useState<number>(3);
  const [a1Closed, setA1Closed] = useState<boolean>(true);
  const [b1Closed, setB1Closed] = useState<boolean>(true);

  const [a2, setA2] = useState<number>(0);
  const [b2, setB2] = useState<number>(5);
  const [a2Closed, setA2Closed] = useState<boolean>(true);
  const [b2Closed, setB2Closed] = useState<boolean>(false);

  // Műveletek számítása
  const labResults = useMemo(() => {
    // I1 formázás
    const i1Str = `${a1Closed ? '[' : '('}${a1}, ${b1}${b1Closed ? ']' : ')'}`;
    // I2 formázás
    const i2Str = `${a2Closed ? '[' : '('}${a2}, ${b2}${b2Closed ? ']' : ')'}`;

    // Metszet számítása
    const interLeft = Math.max(a1, a2);
    const interRight = Math.min(b1, b2);

    let interStr = '∅ (üres halmaz, nincsenek közös pontok)';
    let hasInter = false;

    if (interLeft < interRight) {
      hasInter = true;
      const leftClosed = interLeft === a1 && interLeft === a2 ? (a1Closed && a2Closed) : interLeft === a1 ? a1Closed : a2Closed;
      const rightClosed = interRight === b1 && interRight === b2 ? (b1Closed && b2Closed) : interRight === b1 ? b1Closed : b2Closed;
      interStr = `${leftClosed ? '[' : '('}${interLeft}, ${interRight}${rightClosed ? ']' : ')'}`;
    } else if (interLeft === interRight) {
      const leftClosed = (a1 <= interLeft && (a1 < interLeft || a1Closed)) && (a2 <= interLeft && (a2 < interLeft || a2Closed));
      const rightClosed = (b1 >= interLeft && (b1 > interLeft || b1Closed)) && (b2 >= interLeft && (b2 > interLeft || b2Closed));
      if (leftClosed && rightClosed) {
        interStr = `{${interLeft}} (egyetlen pont)`;
        hasInter = true;
      }
    }

    // Unió számítása
    let unionStr = '';
    if (Math.max(a1, a2) <= Math.min(b1, b2)) {
      // Átfednek vagy érintkeznek
      const uLeft = Math.min(a1, a2);
      const uRight = Math.max(b1, b2);
      const leftClosed = uLeft === a1 && uLeft === a2 ? (a1Closed || a2Closed) : uLeft === a1 ? a1Closed : a2Closed;
      const rightClosed = uRight === b1 && uRight === b2 ? (b1Closed || b2Closed) : uRight === b1 ? b1Closed : b2Closed;
      unionStr = `${leftClosed ? '[' : '('}${uLeft}, ${uRight}${rightClosed ? ']' : ')'}`;
    } else {
      // Diszjunktak
      unionStr = `${i1Str} ∪ ${i2Str}`;
    }

    return { i1Str, i2Str, interStr, unionStr, hasInter };
  }, [a1, b1, a1Closed, b1Closed, a2, b2, a2Closed, b2Closed]);

  // Kidolgozott feladatok lenyitó állapota
  const [openTasks, setOpenTasks] = useState<Record<string, boolean>>({});
  const toggleTask = (id: string) => {
    setOpenTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TheoryTemplate
      title="9. Témakör: Intervallumok a Valós Számegyenesen"
      subtitle="Folytonos számhalmazok, nyílt és zárt végpontok, végtelen félegyenesek és halmazműveletek"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 📏 INTERVALLUMOK"
      documentId="intervals-theory"
      pdfFilename="9_osztaly_intervallumok_valos_szamegyenesen.pdf"
      themeColor="cyan"
      quickRule={{
        label: 'A Legfontosabb Intervallumszabályok',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm font-semibold">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                Zárt intervallum:
              </span>
              <span className="font-mono text-emerald-950 dark:text-emerald-200">
                [a; b] = {`{ x ∈ ℝ | a ≤ x ≤ b }`}
              </span>
              <span className="text-[11px] text-slate-500">(teli karika ●, végpontok beletartoznak)</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-[11px]">
                Nyílt intervallum:
              </span>
              <span className="font-mono text-cyan-950 dark:text-cyan-200">
                ]a; b[ vagy (a; b) = {`{ x ∈ ℝ | a < x < b }`}
              </span>
              <span className="text-[11px] text-slate-500">(üres karika ○, nem tartoznak bele)</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                Arany szabály:
              </span>
              <span className="text-amber-950 dark:text-amber-200 text-xs font-semibold">
                A ±∞ mellé <strong>MINDIG nyílt (kerek)</strong> zárójel jár: ]−∞; b] vagy [a; +∞[!
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz az intervallumok gyakorlására?"
      practiceSubtitle="Teszteld a tudásodat a 30 kérdéses kvízben és mind a 3 játékmódban!"
      practiceButtonText="Gyakorló Kvíz Indítása"
    >
      {/* 1. SZEKCIÓ: AZ INTERVALLUM FOGALMA */}
      <TheorySection
        title="1. Az Intervallum Fogalma és a Valós Számegyenes"
        icon={<MoveHorizontal className="w-5 h-5" />}
      >
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A mindennapi életben és a matematikában lépten-nyomon olyan feltételekkel találkozunk, mint például:
          <em> „A testhőmérséklet 36,0 °C és 37,2 °C között normális”</em>, vagy <em>„A sebességkorlátozás legfeljebb 90 km/h”</em>.
          Ezek a tartományok nem csupán néhány diszkrét értéket tartalmaznak, hanem <strong>végtelen sok valós szám folytonos összességét</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="Diszkrét Halmaz vs. Folytonos Intervallum"
            color="sky"
          >
            <DiscreteVsContinuousSvg size={240} className="my-2" />
            <ul className="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Diszkrét halmaz:</strong> pl. {'{1, 2, 3}'} pontosan <strong>3 darab elszigetelt pontból</strong> áll. A számok között nincsenek köztes elemek.
              </li>
              <li>
                <strong>Valós intervallum:</strong> pl. [1; 3] az 1 és 3 közötti <strong>összes valós számot</strong> tartalmazza (pl. 1,414; √2; 2,5; π − 1). Ez <strong>végtelen sok pont</strong> folytonos szakasza!
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Jelölési Rendszerek: Magyar és Nemzetközi"
            color="indigo"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              A zárójelek típusa mutatja meg, hogy a határoló végpont beletartozik-e az intervallumba:
            </p>
            <div className="space-y-2 text-xs sm:text-sm font-mono">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">[a, b] – ZÁRT:</span> a végpontok <strong>beletartoznak</strong> ($a \le x \le b$). Számegyenesen: <strong>teli karika (●)</strong>.
              </div>
              <div className="p-2 rounded-lg bg-cyan-50 dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800">
                <span className="font-bold text-cyan-700 dark:text-cyan-300">(a, b) vagy ]a, b[ – NYÍLT:</span> a végpontok <strong>NEM tartoznak bele</strong> ($a &lt; x &lt; b$). Számegyenesen: <strong>üres karika (○)</strong>.
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              Magyarországon a kerek $(a, b)$ és a fordított szögletes $]a, b[$ jelölés egyaránt elfogadott és egyenértékű a nyílt végpontok jelölésére.
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Miért fontos a végpontok pontos megkülönböztetése?"
          type="tip"
        >
          Gondolj a vizsgaeredményekre! Ha egy dolgozatnál $60$ ponttól jár a 4-es osztályzat, akkor a pontszámod a $[60, 79]$ zárt tartományba esik (a 60 ponttal még éppen 4-es vagy).
          Ha viszont a feltétel $x &gt; 60$ lenne (nyílt $(60, 79]$), akkor 60 ponttal még nem kapnád meg! A határok tehát döntő fontosságúak.
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: INTERVALLUMOK FAJTÁI */}
      <TheorySection
        title="2. Korlátos és Végtelen Intervallumok Osztályozása"
        icon={<Compass className="w-5 h-5" />}
      >
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Az intervallumokat a végpontjaik száma és zártsága szerint osztályozzuk:
        </p>

        {/* 4 Alaptípus Kártyák */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
          <div className="p-3.5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-850 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-400">Zárt Intervallum</div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5 font-mono">[a, b]</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">$a \le x \le b$</p>
            </div>
            <ClosedIntervalSvg a={-1} b={3} size={150} className="my-1.5" label="[-1, 3]" />
            <span className="text-[10.5px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 p-1 rounded-md text-center">
              Mindkét végpont beletartozik (● és ●)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border-2 border-cyan-200 dark:border-cyan-900/60 bg-white dark:bg-slate-850 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase text-cyan-700 dark:text-cyan-400">Nyílt Intervallum</div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5 font-mono">(a, b) / ]a, b[</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">$a &lt; x &lt; b$</p>
            </div>
            <OpenIntervalSvg a={-2} b={2} size={150} className="my-1.5" label="(-2, 2)" />
            <span className="text-[10.5px] font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 p-1 rounded-md text-center">
              Egyik végpont sem tartozik bele (○ és ○)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-850 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase text-purple-700 dark:text-purple-400">Balról zárt, jobbról nyílt</div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5 font-mono">[a, b) / [a, b[</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">$a \le x &lt; b$</p>
            </div>
            <HalfOpenIntervalSvg a={-2} b={2} leftClosed={true} size={150} className="my-1.5" label="[-2, 2)" />
            <span className="text-[10.5px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 p-1 rounded-md text-center">
              Bal teli (●), jobb üres (○)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border-2 border-violet-200 dark:border-violet-900/60 bg-white dark:bg-slate-850 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-black uppercase text-violet-700 dark:text-violet-400">Balról nyílt, jobbról zárt</div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5 font-mono">(a, b] / ]a, b]</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">$a &lt; x \le b$</p>
            </div>
            <HalfOpenIntervalSvg a={-1} b={3} leftClosed={false} size={150} className="my-1.5" label="(-1, 3]" />
            <span className="text-[10.5px] font-bold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 p-1 rounded-md text-center">
              Bal üres (○), jobb teli (●)
            </span>
          </div>
        </div>

        {/* Végtelen intervallumok (Félegyenesek) */}
        <div className="my-4 p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 space-y-3">
          <h4 className="text-sm font-black text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Végtelen Intervallumok (Félegyenesek a számegyenesen)
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha egy halmaznak nincs alsó vagy felső korlátja, akkor a $\pm\infty$ (végtelen) szimbólumot használjuk:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900">
              <span className="font-bold text-xs text-amber-800 dark:text-amber-300">Jobbra végtelen (alulról korlátos):</span>
              <ul className="text-xs space-y-1 mt-1 font-mono">
                <li>{"[a; +∞[ = { x ∈ ℝ | x ≥ a }"}</li>
                <li>{"]a; +∞[ = { x ∈ ℝ | x > a }"}</li>
              </ul>
              <InfiniteIntervalSvg bound={0} direction="right" isClosed={true} size={180} className="mt-2" label="[0; +∞[" />
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900">
              <span className="font-bold text-xs text-amber-800 dark:text-amber-300">Balra végtelen (felülről korlátos):</span>
              <ul className="text-xs space-y-1 mt-1 font-mono">
                <li>{"]-∞; b] = { x ∈ ℝ | x ≤ b }"}</li>
                <li>{"]-∞; b[ = { x ∈ ℝ | x < b }"}</li>
              </ul>
              <InfiniteIntervalSvg bound={2} direction="left" isClosed={false} size={180} className="mt-2" label="]-∞; 2[" />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-100/70 dark:bg-amber-900/50 text-xs font-bold text-amber-950 dark:text-amber-200">
            ⚠️ <strong>SZENT SZABÁLY:</strong> A $-\infty$ és $+\infty$ mellé <strong>MINDIG kerek / nyílt zárójel</strong> jár! Miért? Mert a végtelen nem egy konkrét szám, amit elérhetnénk vagy zártan magunkba foglalhatnánk!
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: MŰVELETEK INTERVALLUMOKKAL */}
      <TheorySection
        title="3. Halmazműveletek Intervallumokkal (Metszet, Unió, Különbség)"
        icon={<Layers className="w-5 h-5" />}
      >
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Mivel az intervallumok a valós számok (ℝ) részhalmazai, érvényesek rájuk a korábban tanult halmazműveletek:
          a <strong>metszet (∩)</strong>, az <strong>unió (∪)</strong> és a <strong>különbség (\)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-4">
          <TheoryCard
            title="1. Metszet (∩): A Közös Rész"
            color="emerald"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Azon pontok halmaza, amelyek <strong>mindkét</strong> intervallumhoz hozzátartoznak:
            </p>
            <div className="p-2 rounded bg-emerald-50 dark:bg-slate-900 font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 text-center">
              [-2, 3] ∩ [0, 5] = [0, 3]
            </div>
            <IntervalIntersectionSvg a1={-2} b1={3} a2={0} b2={5} size={200} className="my-2" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ha nincs közös pont (diszjunktak), a metszet az <strong>üres halmaz ($\emptyset$)</strong>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Unió (∪): Az Egyesítés"
            color="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Azon pontok halmaza, amelyek <strong>legalább az egyik</strong> intervallumba beletartoznak:
            </p>
            <div className="p-2 rounded bg-amber-50 dark:bg-slate-900 font-mono text-xs font-bold text-amber-800 dark:text-amber-300 text-center">
              [-2, 2] ∪ [1, 5] = [-2, 5]
            </div>
            <IntervalUnionSvg a1={-2} b1={2} a2={1} b2={5} size={200} className="my-2" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ha a két intervallum nem ér össze (pl. $[1, 2] \cup [4, 5]$), akkor az unió nem vonható össze egyetlen intervallummá!
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Különbség (\): Az Elvonás"
            color="rose"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Az első intervallumból elhagyjuk a másodikba eső pontokat:
            </p>
            <div className="p-2 rounded bg-rose-50 dark:bg-slate-900 font-mono text-xs font-bold text-rose-800 dark:text-rose-300 text-center">
              [1, 5] \ [3, 7] = [1, 3)
            </div>
            <IntervalDifferenceSvg size={200} className="my-2" />
            <p className="text-[11px] text-rose-700 dark:text-rose-400 font-bold">
              🔥 FIGYELEM: A 3-as pont zárt volt a kivont halmazban, ezért kikerült az eredményből ⟹ a 3-nál <strong>NYÍLT</strong> lett!
            </p>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="A Legnagyobb Buktató: A Különbségképzés Végpontjai!"
          description="A diákok 80%-a itt veszít pontot a dolgozatban és az érettségin:"
          traps={[
            'Ha az elvont halmaz tartalmazta a közös határpontot (teli karika volt), akkor azt a pontot ELVONTUK, így a megmaradt halmazban ott NYÍLT (üres karika) marad: [1, 5] \\ [3, 7] = [1, 3).',
            'Ha az elvont halmaz NEM tartalmazta a határpontot (nyílt karika volt nála), akkor a pont NEM került elvonásra, így BENT MARAD (zárt lesz): [1, 5] \\ (3, 7) = [1, 3].',
            'Komplementer képzésnél: R \\ [2, 5] = (-∞, 2) ∪ (5, +∞). A határoknál mindkét oldalon nyílt lesz, mert a 2 és az 5 a kivont zárt halmazban volt!'
          ]}
        />
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV MŰVELETI SZIMULÁTOR */}
      <TheorySection
        title="4. Interaktív Intervallum Laboratórium"
        icon={<SlidersHorizontal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          Állítsd be az $I_1$ és $I_2$ intervallumok végpontjait és zárt/nyílt állapotát, és figyeld meg az eredményeket élőben:
        </p>

        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-cyan-50/70 via-white to-indigo-50/60 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-cyan-200 dark:border-cyan-800 shadow-sm space-y-4">
          {/* Vezérlők */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* I1 Beállító */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-cyan-200 dark:border-cyan-900 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-700 dark:text-cyan-300 uppercase">
                  1. Intervallum (I₁): <span className="font-mono text-sm">{labResults.i1Str}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setA1Closed(!a1Closed)}
                  className={`px-2 py-1 text-xs font-black rounded-lg border transition-all ${
                    a1Closed ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white dark:bg-slate-900 text-indigo-700 border-indigo-300'
                  }`}
                >
                  Bal: {a1Closed ? '[ Zárt' : '( Nyílt'}
                </button>
                <input
                  type="range"
                  min={-4}
                  max={Math.min(b1 - 1, 3)}
                  value={a1}
                  onChange={(e) => setA1(Number(e.target.value))}
                  className="flex-1 accent-cyan-600 cursor-pointer"
                />
                <span className="font-mono font-bold text-xs w-5 text-center">{a1}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setB1Closed(!b1Closed)}
                  className={`px-2 py-1 text-xs font-black rounded-lg border transition-all ${
                    b1Closed ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white dark:bg-slate-900 text-indigo-700 border-indigo-300'
                  }`}
                >
                  Jobb: {b1Closed ? 'Zárt ]' : 'Nyílt )'}
                </button>
                <input
                  type="range"
                  min={Math.max(a1 + 1, -2)}
                  max={5}
                  value={b1}
                  onChange={(e) => setB1(Number(e.target.value))}
                  className="flex-1 accent-cyan-600 cursor-pointer"
                />
                <span className="font-mono font-bold text-xs w-5 text-center">{b1}</span>
              </div>
            </div>

            {/* I2 Beállító */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-purple-200 dark:border-purple-900 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-700 dark:text-purple-300 uppercase">
                  2. Intervallum (I₂): <span className="font-mono text-sm">{labResults.i2Str}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setA2Closed(!a2Closed)}
                  className={`px-2 py-1 text-xs font-black rounded-lg border transition-all ${
                    a2Closed ? 'bg-purple-600 text-white border-purple-700' : 'bg-white dark:bg-slate-900 text-purple-700 border-purple-300'
                  }`}
                >
                  Bal: {a2Closed ? '[ Zárt' : '( Nyílt'}
                </button>
                <input
                  type="range"
                  min={-4}
                  max={Math.min(b2 - 1, 3)}
                  value={a2}
                  onChange={(e) => setA2(Number(e.target.value))}
                  className="flex-1 accent-purple-600 cursor-pointer"
                />
                <span className="font-mono font-bold text-xs w-5 text-center">{a2}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setB2Closed(!b2Closed)}
                  className={`px-2 py-1 text-xs font-black rounded-lg border transition-all ${
                    b2Closed ? 'bg-purple-600 text-white border-purple-700' : 'bg-white dark:bg-slate-900 text-purple-700 border-purple-300'
                  }`}
                >
                  Jobb: {b2Closed ? 'Zárt ]' : 'Nyílt )'}
                </button>
                <input
                  type="range"
                  min={Math.max(a2 + 1, -2)}
                  max={6}
                  value={b2}
                  onChange={(e) => setB2(Number(e.target.value))}
                  className="flex-1 accent-purple-600 cursor-pointer"
                />
                <span className="font-mono font-bold text-xs w-5 text-center">{b2}</span>
              </div>
            </div>
          </div>

          {/* Dinamikus Eredmény Kijelző */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-emerald-50/90 dark:bg-emerald-950/50 rounded-xl border border-emerald-300 dark:border-emerald-800">
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block uppercase">
                Metszet (I₁ ∩ I₂) – Közös Pontok:
              </span>
              <span className="text-sm sm:text-base font-mono font-black text-emerald-950 dark:text-emerald-200 mt-1 block">
                {labResults.interStr}
              </span>
            </div>

            <div className="p-3 bg-amber-50/90 dark:bg-amber-950/50 rounded-xl border border-amber-300 dark:border-amber-800">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block uppercase">
                Unió (I₁ ∪ I₂) – Egyesített Halmaz:
              </span>
              <span className="text-sm sm:text-base font-mono font-black text-amber-950 dark:text-amber-200 mt-1 block">
                {labResults.unionStr}
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: KIDOLGOZOTT TÍPUSFELADATOK */}
      <TheorySection
        title="5. Kidolgozott Típusfeladatok Részletes Megoldással"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
          Kattints a feladatokra a részletes levezetés és a megoldás megtekintéséhez:
        </p>

        <div className="space-y-3">
          {/* 1. Feladat */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTask('t1')}
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 flex items-center justify-center text-xs font-black">
                  1
                </span>
                Ábrázolás és tagság: $A = [-3, 2)$ esetén mely állítások igazak?
              </h4>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openTasks['t1'] ? 'rotate-90' : ''}`} />
            </div>
            {openTasks['t1'] && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <p><strong>Kérdés:</strong> Igaz-e, hogy: (a) $-3 \in A$; (b) $2 \in A$; (c) $0 \in A$; (d) $1,999 \in A$?</p>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 space-y-1 font-mono text-xs">
                  <div>(a) <strong>-3 ∈ A: IGAZ</strong>, mert a bal oldali szögletes zárójel zárt (teli karika).</div>
                  <div>(b) <strong>2 ∈ A: HAMIS</strong>, mert a jobb oldali kerek zárójel nyílt (üres karika), a 2 nem eleme.</div>
                  <div>(c) <strong>0 ∈ A: IGAZ</strong>, mert $-3 \le 0 &lt; 2$.</div>
                  <div>(d) <strong>1,999 ∈ A: IGAZ</strong>, mivel $1,999 &lt; 2$.</div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Feladat */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTask('t2')}
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 flex items-center justify-center text-xs font-black">
                  2
                </span>
                Metszet és Unió: $A = [-4, 3]$ és $B = (1, 6)$
              </h4>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openTasks['t2'] ? 'rotate-90' : ''}`} />
            </div>
            {openTasks['t2'] && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <p><strong>Megoldás levezetése:</strong></p>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 space-y-1.5 font-mono text-xs">
                  <div>• <strong>A ∩ B (Metszet):</strong> Közös rész a két intervallum között. A bal határ a nagyobbik ($1$), a jobb határ a kisebbik ($3$).</div>
                  <div className="pl-3 font-bold text-emerald-700 dark:text-emerald-300">A ∩ B = (1, 3] (1-nél nyílt, mert B-nek nem eleme; 3-nál zárt, mert mindkettőnek eleme).</div>
                  <div>• <strong>A ∪ B (Unió):</strong> A legkisebb értéktől ($-4$) a legnagyobbig ($6$).</div>
                  <div className="pl-3 font-bold text-amber-700 dark:text-amber-300">A ∪ B = [-4, 6) (-4 zárt, 6 nyílt).</div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Feladat */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTask('t3')}
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 flex items-center justify-center text-xs font-black">
                  3
                </span>
                Trükkös Különbségképzés: $A = [-2, 5]$ és $B = [1, 8)$ esetén $A \setminus B$ és $B \setminus A$
              </h4>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openTasks['t3'] ? 'rotate-90' : ''}`} />
            </div>
            {openTasks['t3'] && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 space-y-2 font-mono text-xs">
                  <div>
                    <strong>A \ B:</strong> Az $A = [-2, 5]$-ből levonjuk az $1$-től induló pontokat.
                    <br />
                    Mivel a $B$-ben az $1$ ZÁRT (tehát az $1$ elvonásra kerül), a megmaradó részben az $1$ már NEM szerepelhet!
                    <br />
                    <span className="font-bold text-rose-700 dark:text-rose-300 text-sm">A \ B = [-2, 1)</span>
                  </div>
                  <div>
                    <strong>B \ A:</strong> A $B = [1, 8)$-ből levonjuk az $A$ részét (ami $5$-ig tart).
                    <br />
                    Mivel az $A$-ban az $5$ ZÁRT (tehát az $5$-öt is elvontuk), a megmaradó $B$ rész $5$-nél NYÍLT-ként indul!
                    <br />
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">B \ A = (5, 8)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Feladat */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTask('t4')}
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 flex items-center justify-center text-xs font-black">
                  4
                </span>
                Végtelen Intervallumok Metszete: $(-\infty, 4] \cap (1, +\infty)$
              </h4>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openTasks['t4'] ? 'rotate-90' : ''}`} />
            </div>
            {openTasks['t4'] && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  A két félegyenes átfedi egymást az $1$ és $4$ értékek között:
                </p>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  (-∞, 4] ∩ (1, +∞) = (1, 4]
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Két végtelen félegyenes metszete gyakran egy <strong>korlátos intervallum</strong>!
                </p>
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: TÖRTÉNETI KITEKINTŐ */}
      <TheorySection
        title="6. Matematikai Kitekintő: Richard Dedekind és a Kontinuum"
        icon={<Info className="w-5 h-5 text-indigo-500" />}
      >
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/80 dark:from-slate-900 dark:to-slate-850 border border-indigo-200 dark:border-indigo-900 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-2">
          <p>
            Gondolkodtál már azon, miért olyan különleges a valós számegyenes? A racionális számok (ℚ) között is végtelen sok szám van, mégis tele van „lyukakkal” (például nincs olyan tört, aminek a négyzete pontosan 2 lenne: √2 ∉ ℚ).
          </p>
          <p>
            <strong>Richard Dedekind</strong> (1831–1916) német matematikus 1872-ben publikálta a zseniális <em>Dedekind-szelet (Dedekind-vágás)</em> elméletét:
            a valós számok rendszere <strong>folytonos (kontinuum)</strong>, nincsenek benne hézagok. Ha a számegyenest bárhol kettévágjuk, a vágási pontnál pontosan egy valós szám áll. Ez a folytonosság teszi lehetővé, hogy az intervallumokat szakadásmentes vonalakként kezelhessük!
          </p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default IntervalsTheory;
