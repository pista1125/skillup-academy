import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox
} from '../TheoryTemplate';
import {
  TrendingUp,
  TrendingDown,
  Repeat,
  Plus,
  Minus,
  X,
  Divide,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ListOrdered,
  Search
} from 'lucide-react';

export interface SequencesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const SequencesTheory: React.FC<SequencesTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív Sorozat Generátor Állapot ---
  const [startVal, setStartVal] = useState<number>(3);
  const [selectedRuleKey, setSelectedRuleKey] = useState<'add3' | 'add5' | 'sub4' | 'mul2' | 'addN'>('add3');

  const RULES = {
    add3: {
      name: '+3 hozzáadása (számtani növekvő)',
      stepDesc: '+3',
      computeNext: (prev: number, i: number) => prev + 3
    },
    add5: {
      name: '+5 hozzáadása (számtani növekvő)',
      stepDesc: '+5',
      computeNext: (prev: number, i: number) => prev + 5
    },
    sub4: {
      name: '-4 levonása (csökkenő)',
      stepDesc: '-4',
      computeNext: (prev: number, i: number) => prev - 4
    },
    mul2: {
      name: '·2 duplázás (mértani ugrásszerű)',
      stepDesc: '·2',
      computeNext: (prev: number, i: number) => prev * 2
    },
    addN: {
      name: 'Változó lépésköz: +1, +2, +3, +4...',
      stepDesc: '+i',
      computeNext: (prev: number, i: number) => prev + i
    }
  };

  const activeRule = RULES[selectedRuleKey];

  // Sorozat 8 elemének generálása
  const sequenceElements: number[] = [startVal];
  for (let i = 1; i < 8; i++) {
    sequenceElements.push(activeRule.computeNext(sequenceElements[i - 1], i));
  }

  return (
    <TheoryTemplate
      documentId="grade-5-sequences-theory"
      pdfFilename="5_osztaly_V_8_sorozatok.pdf"
      title="Számsorozatok és képzési szabályok"
      subtitle="A sorozat fogalma, kezdőtag és lépésköz, számtani (összeadó/kivonó) és mértani (szorzó/osztó) sorozatok, változó lépésközű minták és hiányzó tagok felderítése"
      themeColor="orange"
      emoji="🔢"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 8. TANANYAG"
      quickRule={{
        label: 'A sorozat alapképlete (állandó d lépésközzel)',
        formula: 'a_n = a_1 + (n - 1) \\cdot d \\qquad \\text{ahol } a_1 \\text{ a kezdőtag, } d \\text{ az állandó lépésköz, } n \\text{ a sorszám}'
      }}
      practiceTitle="Készen állsz a sorozatok feladványaira?"
      practiceSubtitle="Fejts meg hiányzó tagokat és folytass sorozatokat a 30 feladatos kvízben és az interaktív játékokban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A SOROZAT FOGALMA ÉS TAGJAI */}
      <TheorySection
        id="sorozat-fogalma"
        title="1. A Számsorozat Fogalma, Tagjai és Jelölése"
        subtitle="Hogyan épül fel egy számsorozat a matematikában?"
        badge="ALAPFOGALMAK"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="A számsorozat"
            badge="RENDEZETT LISTA"
            color="orange"
            icon={<ListOrdered className="w-5 h-5 text-orange-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Számok olyan <strong>szabályos, rendezett sora</strong>, ahol minden számnak pontos helye és sorszáma van.
            </p>
            <div className="p-2 bg-orange-50 dark:bg-orange-950/40 rounded text-xs text-orange-900 dark:text-orange-200">
              Példa: 2, 5, 8, 11, 14, 17, 20...
            </div>
          </TheoryCard>

          <TheoryCard
            title="Tagok és Sorszámok"
            badge="INDEXELÉS"
            color="blue"
            icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A sorozat elemeit <strong>tagoknak</strong> nevezzük. Sorszámuk jelöli a helyüket:
            </p>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs text-blue-900 dark:text-blue-200 font-medium flex items-center justify-between flex-wrap gap-2 border border-blue-200/60 dark:border-blue-900/40">
              <span className="flex items-center gap-1.5"><strong className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">a₁</strong> = 1. tag</span>
              <span className="flex items-center gap-1.5"><strong className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">a₂</strong> = 2. tag</span>
              <span className="flex items-center gap-1.5"><strong className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">aₙ</strong> = n-edik tag</span>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Képzési Szabály"
            badge="A RECEPT"
            color="emerald"
            icon={<Repeat className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A szabály megadja, hogyan kapjuk meg az egyik tagból a következő tagot.
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded text-xs text-emerald-900 dark:text-emerald-200">
              Például: „Kezdőtag: 2, minden lépésben adj hozzá 3-at!”
            </div>
          </TheoryCard>
        </div>

        {/* 1. INTERAKTÍV ESZKÖZ: SOROZAT GENERÁTOR */}
        <div className="mt-6 p-4 md:p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/30 rounded-2xl border-2 border-orange-300 dark:border-orange-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-orange-600 text-white">
                  Interaktív Labor
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Élő Számsorozat Generátor
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Válassz ki egy szabályt, és nézd meg, hogyan épül fel lépésről lépésre a sorozat!
              </p>
            </div>

            {/* Szabály választó gombok */}
            <div className="flex gap-1.5 flex-wrap">
              {[
                { id: 'add3', label: '+3' },
                { id: 'add5', label: '+5' },
                { id: 'sub4', label: '-4' },
                { id: 'mul2', label: '·2' },
                { id: 'addN', label: '+1,+2,+3...' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRuleKey(r.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedRuleKey === r.id
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Kezdőérték beállító */}
          <div className="mb-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-orange-200 dark:border-orange-800 flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Kezdőtag (a₁):
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 5, 10, 50].map(v => (
                <button
                  key={v}
                  onClick={() => setStartVal(v)}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${
                    startVal === v
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Sorozat Tagjainak Vizuális Megjelenítése */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-orange-200 dark:border-orange-800 shadow-inner overflow-x-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Szabály: {activeRule.name}
            </div>
            <div className="flex items-center gap-2 min-w-[550px] py-2">
              {sequenceElements.map((elem, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/60 dark:to-amber-950/60 border-2 border-orange-400 dark:border-orange-600 flex items-center justify-center text-sm font-black text-orange-950 dark:text-orange-100 shadow-sm">
                      {elem}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 font-mono">
                      a{['₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈'][idx] || (idx + 1)}
                    </span>
                  </div>

                  {idx < sequenceElements.length - 1 && (
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">
                        {selectedRuleKey === 'addN' ? `+${idx + 1}` : activeRule.stepDesc}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-400 -my-0.5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: GYAKORI KÉPZÉSI SZABÁLYOK */}
      <TheorySection
        id="szabaly-tipusok"
        title="2. A Legfontosabb Sorozattípusok"
        subtitle="Milyen matematikai műveletekkel képezhetünk sorozatokat?"
        badge="SZABÁLYTÍPUSOK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Állandó hozzáadás (+d)"
            badge="NÖVEKVŐ SZÁMTANI"
            color="emerald"
            icon={<Plus className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Minden taghoz <strong>ugyanazt a számot adjuk hozzá</strong>. A tagok közötti különbség állandó.
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded text-xs font-mono text-emerald-900 dark:text-emerald-200">
              4, 7, 10, 13, 16, 19... (szabály: +3)
            </div>
          </TheoryCard>

          <TheoryCard
            title="Állandó levonás (-d)"
            badge="CSÖKKENŐ SZÁMTANI"
            color="rose"
            icon={<Minus className="w-5 h-5 text-rose-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Minden tagból <strong>ugyanazt a számot vonjuk ki</strong>. A sorozat értékei folyamatosan csökkennek.
            </p>
            <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded text-xs font-mono text-rose-900 dark:text-rose-200">
              45, 38, 31, 24, 17, 10... (szabály: -7)
            </div>
          </TheoryCard>

          <TheoryCard
            title="Állandó szorzás (·q)"
            badge="MÉRTANI GYORSULÓ"
            color="blue"
            icon={<X className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Minden tagot <strong>ugyanazzal a számmal szorzunk</strong>. Az értékek rendkívül gyorsan növekednek (duplázódnak, triplázódnak).
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded text-xs font-mono text-blue-900 dark:text-blue-200">
              1, 2, 4, 8, 16, 32, 64... (szabály: ·2)
            </div>
          </TheoryCard>

          <TheoryCard
            title="Változó lépésközű sorozatok"
            badge="ÖSSZETETT"
            color="purple"
            icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A lépésköz maga is egy szabályos sorozatot alkot (pl. minden lépésben 1-gyel többet adunk hozzá).
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded text-xs font-mono text-purple-900 dark:text-purple-200">
              1, 2, 4, 7, 11, 16, 22... (+1, +2, +3, +4...)
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: HIÁNYZÓ TAGOK ÉS DETEKTÍV MÓDSZER */}
      <TheorySection
        id="hianyzo-tagok"
        title="3. Hiányzó Tagok és Kakukktojások Felderítése"
        subtitle="Hogyan oldhatunk meg hiányos vagy hibás számsorozatokat?"
        badge="MEGOLDÁSI STRATÉGIA"
      >
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            3 Lépéses Sorozatdetektív Módszer:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-orange-600">1. Lépés: Különbségek</span>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Számítsd ki az egymást követő ismert tagok különbségét vagy hányadosát!
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-orange-600">2. Lépés: Szabály ellenőrzése</span>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Nézd meg, hogy a kapott szabály illeszkedik-e az összes többi ismert tagra!
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-orange-600">3. Lépés: Kitöltés és próba</span>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Számold ki a hiányzó tagokat, és ellenőrizd, hogy a sor végéig folyamatos marad-e a szabály!
              </p>
            </div>
          </div>

          {/* Példa feladvány */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200">
            <div className="font-bold mb-1">Gyakorlati példa hiánypótlásra:</div>
            <div className="font-mono text-sm py-1 font-bold text-amber-900 dark:text-amber-100">
              5, &nbsp; <span className="underline decoration-wavy text-orange-600">__</span>, &nbsp; 13, &nbsp; 17, &nbsp; <span className="underline decoration-wavy text-orange-600">__</span>, &nbsp; 25
            </div>
            <div className="mt-1 space-y-0.5">
              <div>&bull; A 13 és a 17 szomszédosak: 17 - 13 = <strong>4</strong> &rarr; a lépésköz +4!</div>
              <div>&bull; Első hiányzó: 5 + 4 = <strong>9</strong> (és 9 + 4 = 13, tökéletes!).</div>
              <div>&bull; Második hiányzó: 17 + 4 = <strong>21</strong> (és 21 + 4 = 25, stimmel!).</div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
