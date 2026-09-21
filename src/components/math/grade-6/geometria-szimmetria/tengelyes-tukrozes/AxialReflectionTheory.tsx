import React from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import {
  PointReflectionDiagram,
  TriangleReflectionDiagram,
  CoordinateReflectionDiagram,
  InteractiveReflectionSimulator
} from './AxialReflectionDiagrams';
import { Sparkles, Compass, ShieldCheck, Target, Lightbulb, MoveHorizontal, ArrowRightLeft, Layers } from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

export interface AxialReflectionTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export function AxialReflectionTheory({ onBack, onStartQuiz }: AxialReflectionTheoryProps) {
  const sections: TheorySection[] = [
    // 1. FEJEZET: A TENGELYES TÜKRÖZÉS FOGALMA
    {
      id: 'definition',
      title: '1. A tengelyes tükrözés fogalma és definíciója',
      icon: <ArrowRightLeft className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A <strong>tengelyes tükrözés</strong> egy geometriai transzformáció, amely a sík minden pontjához 
            egy adott <MathText>t</MathText> egyenesre (a <em>tükrözés tengelyére</em>) vonatkoztatva egyértelműen 
            hozzárendeli a tükörképét.
          </p>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800/60 shadow-xs">
            <h4 className="font-black text-emerald-950 dark:text-emerald-200 text-sm sm:text-base flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              A tengelyes tükrözés pontos definíciója
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 font-medium">
              <p>
                Legyen <MathText>t</MathText> egy rögzített egyenes a síkban, és <MathText>P</MathText> a sík egy tetszőleges pontja:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>
                  Ha a pont a tengelyen van (<MathText>{"P \\in t"}</MathText>), akkor a képe önmaga: <MathText>{"P' = P"}</MathText>. 
                  Ezeket a pontokat <strong>fixpontoknak</strong> (helyben maradó pontoknak) nevezzük.
                </li>
                <li>
                  Ha a pont nincs a tengelyen (<MathText>{"P \\notin t"}</MathText>), akkor a képe az a <MathText>{"P'"}</MathText> pont, 
                  amelyre a <MathText>t</MathText> tengely a <MathText>{"PP'"}</MathText> szakasz <strong>felezőmerőlegese</strong>.
                </li>
              </ul>
            </div>
            <div className="mt-3 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-300 dark:border-emerald-700 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-200 text-center">
              PP' ⊥ t    és    d(P, t) = d(P', t)
            </div>
          </div>

          <PointReflectionDiagram />
        </div>
      )
    },

    // 2. FEJEZET: A TENGELYES TÜKRÖZÉS TULAJDONSÁGAI
    {
      id: 'properties',
      title: '2. A tengelyes tükrözés alaptulajdonságai (invariánsok)',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A tengelyes tükrözés a sík alapvető <strong>egybevágósági transzformációja</strong>. Számos 
            olyan geometriai tulajdonsága van, amely a tükrözés során változatlan marad (invariáns):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                1. Távolságtartó (hossztartó)
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Bármely két pont távolsága megegyezik a képeik távolságával: <MathText>{"|A'B'| = |AB|"}</MathText>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                2. Szögtartó
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A szögek nagysága nem változik: egy 60°-os szög tükörképe szintén pontosan 60°-os szög.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                3. Egyenestartó és párhuzamosságtartó
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Egyenes képe egyenes, és párhuzamos egyenesek tükörképei is egymással párhuzamosak (<MathText>{"e \\parallel f \\implies e' \\parallel f'"}</MathText>).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                4. Involúció (Önmaga inverze)
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Ha egy alakzatot kétszer egymás után tükrözünk ugyanarra a tengelyre, visszakapjuk az eredeti alakzatot: <MathText>{"(P')' = P"}</MathText>.
              </p>
            </div>
          </div>

          {/* Kiemelt figyelmeztető doboz: Körüljárási irány */}
          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-800/60 shadow-xs">
            <h4 className="font-black text-rose-950 dark:text-rose-200 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <Target className="w-5 h-5 text-rose-600" />
              Kritikus különbség: A körüljárási irány megfordul!
            </h4>
            <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-300 font-medium leading-relaxed">
              Bár az alakzat egybevágó marad az eredetivel, a tengelyes tükrözés <strong>megfordítja a síkbeli körüljárási irányt</strong>! 
              Ha az <MathText>ABC</MathText> háromszög csúcsai az óramutató járásával ellentétes (pozitív) irányban követik egymást, 
              akkor a tükörkép <MathText>{"A'B'C'"}</MathText> háromszögben a csúcsok az <strong>óramutató járásával megegyező (negatív)</strong> irányban haladnak.
            </p>
          </div>

          <TriangleReflectionDiagram />
        </div>
      )
    },

    // 3. FEJEZET: TÜKRÖZÉS A KOORDINÁTA-RENDSZERBEN
    {
      id: 'coordinates',
      title: '3. Tengelyes tükrözés a koordináta-rendszerben',
      icon: <MoveHorizontal className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A derékszögű koordináta-rendszerben a tengelyekre történő tükrözés rendkívül egyszerű algebrai szabályokkal írható le:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-800/60 shadow-xs">
              <h4 className="font-black text-rose-950 dark:text-rose-200 text-sm sm:text-base mb-1">
                Tükrözés az x-tengelyre
              </h4>
              <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-300 font-medium">
                Az <MathText>x</MathText> koordináta nem változik, az <MathText>y</MathText> koordináta az <strong>ellentettjére vált</strong>:
              </p>
              <div className="mt-2 text-center text-sm font-mono font-black text-rose-700 dark:text-rose-300 bg-white/70 dark:bg-slate-900/60 py-1.5 rounded-lg">
                P(x; y) ⟶ P_x(x; -y)
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Példa: <MathText>{"P(3; 5) \\to P'(3; -5)"}</MathText>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800/60 shadow-xs">
              <h4 className="font-black text-emerald-950 dark:text-emerald-200 text-sm sm:text-base mb-1">
                Tükrözés az y-tengelyre
              </h4>
              <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 font-medium">
                Az <MathText>y</MathText> koordináta nem változik, az <MathText>x</MathText> koordináta az <strong>ellentettjére vált</strong>:
              </p>
              <div className="mt-2 text-center text-sm font-mono font-black text-emerald-700 dark:text-emerald-300 bg-white/70 dark:bg-slate-900/60 py-1.5 rounded-lg">
                P(x; y) ⟶ P_y(-x; y)
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Példa: <MathText>{"P(3; 5) \\to P'(-3; 5)"}</MathText>
              </p>
            </div>
          </div>

          <CoordinateReflectionDiagram />
        </div>
      )
    },

    // 4. FEJEZET: ALAKZATOK SZERKESZTÉSE ÉS A TENGELY KERESÉSE
    {
      id: 'constructions',
      title: '4. Alakzatok tükrözése és a szimmetriatengely megszerkesztése',
      icon: <Compass className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A sokszögek és összetett alakzatok tükrözése a csúcspontok egyenkénti tükrözésével történik:
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
              <strong>1. Pont tükrözésének lépései:</strong>
              <ol className="list-decimal list-inside space-y-1 mt-1 pl-1 text-slate-600 dark:text-slate-400">
                <li>Merőlegest bocsátunk a <MathText>P</MathText> pontból a <MathText>t</MathText> tengelyre (talppont: <MathText>F</MathText>).</li>
                <li>Körzőnyílásba vesszük a <MathText>PF</MathText> szakaszt.</li>
                <li>A tengely túloldalára rámérjük ezt a távolságot a merőleges egyenesre: <MathText>{"FP' = PF"}</MathText>.</li>
              </ol>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
              <strong>2. A tükrözési tengely megszerkesztése két pontból:</strong>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Ha adott egy <MathText>A</MathText> pont és annak <MathText>{"A'"}</MathText> tükörképe, a tükrözés tengelye 
                pontosan az <MathText>{"AA'"}</MathText> szakasz <strong>felezőmerőlegese</strong>! Ezt a 4. fejezetben tanult 
                két köríves szerkesztéssel könnyedén felvehetjük.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
            <h5 className="font-bold text-amber-950 dark:text-amber-200 text-xs sm:text-sm flex items-center gap-1.5 mb-1">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Tipp: Tengelyt metsző szakasz tükrözése
            </h5>
            <p className="text-xs text-amber-900 dark:text-amber-300">
              Ha az <MathText>AB</MathText> szakasz metszi a <MathText>t</MathText> tengelyt egy <MathText>M</MathText> pontban, 
              akkor az <MathText>M</MathText> pont képe önmaga (<MathText>{"M' = M"}</MathText>), így a tükörkép <MathText>{"A'B'"}</MathText> szakasz 
              is pontosan ebben az <MathText>M</MathText> pontban fogja metszeni a tengelyt!
            </p>
          </div>
        </div>
      )
    },

    // 5. FEJEZET: INTERAKTÍV TÜKRÖZÉS LABOR
    {
      id: 'simulator',
      title: '5. Interaktív Tengelyes Tükrözés Labor',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            Próbáld ki a tükrözést a gyakorlatban! Mozgasd a pontot, a háromszöget vagy a zászlót, 
            és figyeld meg a távolságtartást és a körüljárási irány megfordulását!
          </p>
          <InteractiveReflectionSimulator />
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Tengelyes tükrözés"
      subtitle="Definíció, távolság- és szögtartás, körüljárási irány és koordinátatükrözés"
      badge="📐 6. Osztály • III. Geometria • 6. Fejezet"
      topicId="g6-axial-reflection-theory"
      themeColor="teal"
      pdfFilename="tengelyes-tukrozes-6-osztaly.pdf"
      quickRule={{
        label: 'A tükrözés alapszabálya',
        formula: "PP' ⊥ t  és  d(P, t) = d(P', t)"
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
}
