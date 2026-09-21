import React from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import {
  BisectorOverviewDiagram,
  BisectorConstructionDiagram,
  CircumscribedCircleDiagram
} from './BisectorDiagrams';
import { Scissors, Compass, ShieldCheck, AlertTriangle, Lightbulb, Target, Sparkles } from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

export interface BisectorTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export function BisectorTheory({ onBack, onStartQuiz }: BisectorTheoryProps) {
  const sections: TheorySection[] = [
    // 1. FEJEZET: FOGALOM ÉS DEFINÍCIÓ
    {
      id: 'definition',
      title: '1. A szakaszfelező merőleges fogalma és jelölése',
      icon: <Scissors className="w-5 h-5 text-teal-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A síkgeometria egyik legfontosabb nevezetes egyenese a <strong>szakaszfelező merőleges</strong>. 
            Tekintsünk a síkban egy tetszőleges <MathText>AB</MathText> szakaszt és annak pontos <MathText>F</MathText> felezőpontját!
          </p>

          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border-2 border-teal-200 dark:border-teal-800/60 shadow-xs">
            <h4 className="font-black text-teal-950 dark:text-teal-200 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              A szakaszfelező merőleges definíciója
            </h4>
            <p className="text-xs sm:text-sm text-teal-900 dark:text-teal-300 font-medium">
              Egy szakasz <strong>felezőmerőlegesének</strong> nevezzük a szakasz felezőpontján (<MathText>F</MathText>) 
              átmenő és a szakaszra <strong>merőleges</strong> (<MathText>90^\circ</MathText>-os derékszöget bezáró) egyenest.
            </p>
            <div className="mt-2 text-xs font-mono font-bold text-teal-800 dark:text-teal-200">
              Jelölése: f_AB    ahol    f_AB ⊥ AB    és    F ∈ f_AB
            </div>
          </div>

          <BisectorOverviewDiagram />
        </div>
      )
    },

    // 2. FEJEZET: PONTHALMAZ ÉS TÁVOLSÁGTARTÁS
    {
      id: 'locus-theorem',
      title: '2. A felezőmerőleges mint geometriai ponthalmaz (Tétel)',
      icon: <Target className="w-5 h-5 text-teal-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A felezőmerőleges nem csupán egy merőleges vonal, hanem egy különleges távolsági szabályt követő 
            <strong>geometriai ponthalmaz</strong> is a síkban.
          </p>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-2 border-teal-300 dark:border-teal-800">
            <h4 className="font-black text-teal-950 dark:text-teal-200 text-sm sm:text-base flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              A szakaszfelező merőleges alaptétele (Mindkét irányban igaz!)
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              <p>
                <strong>1. Egyenes állítás:</strong> A szakaszfelező merőleges <em>bármelyik</em> <MathText>P</MathText> pontja 
                <strong>egyenlő távolságra</strong> van a szakasz két végpontjától (<MathText>A</MathText> és <MathText>B</MathText>):
              </p>
              <div className="text-center font-mono font-black text-teal-700 dark:text-teal-300 text-sm py-1 bg-white/70 dark:bg-slate-900/70 rounded-lg border border-teal-200 dark:border-teal-800">
                d(P, A) = d(P, B)    azaz    PA = PB
              </div>
              <p>
                <strong>2. Megfordítás:</strong> Ha a sík egy <MathText>P</MathText> pontja egyenlő távolságra van az <MathText>A</MathText> és <MathText>B</MathText> pontoktól 
                (<MathText>PA = PB</MathText>), akkor ez a pont <strong>biztosan rajta fekszik</strong> az <MathText>AB</MathText> szakasz felezőmerőlegesén!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs">
              <strong className="text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1 font-bold">
                <Lightbulb className="w-4 h-4 text-amber-600" /> Egyenlő szárú háromszögek:
              </strong>
              <p className="text-slate-600 dark:text-slate-300">
                A felezőmerőleges tetszőleges <MathText>P</MathText> pontját összekötve <MathText>A</MathText>-val és <MathText>B</MathText>-vel mindig egy <strong>egyenlő szárú háromszöget</strong> (<MathText>\triangle APB</MathText>) kapunk, amelynek alapja <MathText>AB</MathText>, szárai <MathText>PA = PB</MathText>.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/60 text-xs">
              <strong className="text-purple-800 dark:text-purple-300 flex items-center gap-1.5 mb-1 font-bold">
                <ShieldCheck className="w-4 h-4 text-purple-600" /> Félsíkok távolságai:
              </strong>
              <p className="text-slate-600 dark:text-slate-300">
                A felezőmerőleges két félsíkra osztja a síkot: az <MathText>A</MathText> felőli pontokra <MathText>PA &lt; PB</MathText> (közelebb vannak <MathText>A</MathText>-hoz), a <MathText>B</MathText> felőli pontokra <MathText>PB &lt; PA</MathText>.
              </p>
            </div>
          </div>
        </div>
      )
    },

    // 3. FEJEZET: SZERKESZTÉS KÖRZŐVEL ÉS VONALZÓVAL
    {
      id: 'construction',
      title: '3. Szerkesztés körzővel és vonalzóval',
      icon: <Compass className="w-5 h-5 text-teal-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A szakaszfelező merőleges szerkesztése az euklideszi geometria egyik legalapvetőbb művelete. 
            Mivel a felezőmerőleges pontjai egyenlő távolságra vannak <MathText>A</MathText>-tól és <MathText>B</MathText>-től, 
            elég megkeresnünk <strong>két ilyen pontot</strong> (<MathText>M_1</MathText> és <MathText>M_2</MathText>), és összekötni őket!
          </p>

          <BisectorConstructionDiagram />

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800/60">
            <h4 className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Gyakori buktató a szerkesztésnél:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              A körzőnyílásnak mindenképpen <strong>nagyobbnak kell lennie a szakasz felénél</strong> (<MathText>r &gt; AB / 2</MathText>). 
              Ha a sugár kisebb lenne, a körívek nem metszenék egymást a síkban!
            </p>
          </div>
        </div>
      )
    },

    // 4. FEJEZET: TENGELYES SZIMMETRIA
    {
      id: 'symmetry',
      title: '4. A szakasz és a felezőmerőleges szimmetriája',
      icon: <Scissors className="w-5 h-5 text-teal-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Egy szakasznak a síkban pontosan <strong>2 szimmetriatengelye</strong> van:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
              <div>
                <strong>1. A szakasz egyenese:</strong> A szakaszt tartalmazó egyenesre tükrözve a szakasz minden pontja önmagába megy át.
              </div>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
              <div>
                <strong>2. A szakaszfelező merőleges:</strong> Erre tükrözve az <MathText>A</MathText> pont képe a <MathText>B</MathText> pont lesz, a <MathText>B</MathText> pont képe az <MathText>A</MathText> pont, a felezőpont (<MathText>F</MathText>) pedig fixpont marad.
              </div>
            </li>
          </ul>

          <div className="p-3.5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm">
            <span className="font-bold text-teal-800 dark:text-teal-300">Tengelyes tükrözés definíciója a pontpárokra:</span>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5">
              Két pont (<MathText>A</MathText> és <MathText>A'</MathText>) akkor tükörképe egymásnak a <MathText>t</MathText> tengelyre nézve, ha a <MathText>t</MathText> egyenes az <MathText>AA'</MathText> szakasz <strong>felezőmerőlegese</strong>!
            </p>
          </div>
        </div>
      )
    },

    // 5. FEJEZET: HÁROMSZÖG KÖRÜLÍRT KÖRE
    {
      id: 'circumcircle',
      title: '5. Háromszög oldalfelező merőlegesei és a körülírt kör',
      icon: <Compass className="w-5 h-5 text-teal-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Minden háromszögnek 3 oldala van (<MathText>a, b, c</MathText>), és mindegyik oldalhoz tartozik egy oldalfelező merőleges (<MathText>f_a, f_b, f_c</MathText>).
          </p>

          <CircumscribedCircleDiagram />

          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm space-y-2">
            <h4 className="font-bold text-indigo-950 dark:text-indigo-200 text-sm sm:text-base">
              Körülírt kör középpontjának (<MathText>O</MathText>) helyzete a háromszög típusa szerint:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-sky-600 block">1. Hegyesszögű △:</span>
                Az <MathText>O</MathText> középpont a háromszög <strong>belsejében</strong> helyezkedik el.
              </div>
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-emerald-600 block">2. Derékszögű △:</span>
                Az <MathText>O</MathText> középpont pontosan az <strong>átfogó felezőpontjára</strong> esik (Thalész-tétel).
              </div>
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600 block">3. Tompaszögű △:</span>
                Az <MathText>O</MathText> középpont a háromszögön <strong>kívülre</strong> esik (a tompaszöggel szemközti oldal mögé).
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="A szakasz felezőmerőlegese"
      subtitle="Definíció, ponthalmaz tétel, szerkesztés körzővel, szimmetriatengely és körülírt kör"
      badge="📐 6. Osztály • III. Geometria • 4. Fejezet"
      themeColor="teal"
      sections={sections}
      quickRule={{
        label: 'A szakaszfelező merőleges alapszabályai',
        formula: 'd(P, A) = d(P, B)    és    f_AB ⊥ AB    és    OA = OB = OC = R'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
}
