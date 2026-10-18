import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  Box,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  Grid,
  Layers,
  Scissors,
  Check,
  Eye,
  RotateCcw
} from 'lucide-react';

export interface CuboidCubeTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const CuboidCubeTheory: React.FC<CuboidCubeTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív 3D / Háló Stúdió Állapotok ---
  const [bodyType, setBodyType] = useState<'cuboid' | 'cube'>('cuboid');
  const [viewMode, setViewMode] = useState<'3d' | 'net'>('3d');
  const [edgeA, setEdgeA] = useState<number>(6);
  const [edgeB, setEdgeB] = useState<number>(4);
  const [edgeC, setEdgeC] = useState<number>(5);
  const [unit, setUnit] = useState<'cm' | 'dm' | 'm'>('cm');

  const actualA = edgeA;
  const actualB = bodyType === 'cube' ? edgeA : edgeB;
  const actualC = bodyType === 'cube' ? edgeA : edgeC;

  const totalEdgeLength = bodyType === 'cube'
    ? 12 * actualA
    : 4 * (actualA + actualB + actualC);

  return (
    <TheoryTemplate
      documentId="grade-5-cuboid-cube-theory"
      pdfFilename="5_osztaly_IV_5_teglatest_kocka.pdf"
      title="Téglatest és kocka geometriája"
      subtitle="Térbeli testek fogalma, a téglatest és kocka csúcsai, élei és lapjai, párhuzamos és merőleges elemek, síkbeli hálók és az élek összhossza"
      themeColor="purple"
      emoji="📦"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 5. TANANYAG"
      quickRule={{
        label: 'A fejezet aranyszabálya',
        formula: '8 \\text{ csúcs} \\quad | \\quad 12 \\text{ él} \\quad | \\quad 6 \\text{ lap} \\quad | \\quad \\text{Élek összhossza: } 4 \\cdot (a + b + c) \\text{ vagy } 12 \\cdot a'
      }}
      practiceTitle="Készen állsz a téglatest és kocka feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: SÍKIDOMOK VS. TÉRBELI TESTEK */}
      <TheorySection
        id="bevezetes"
        title="1. A térbeli testek világa: Sík vs. Tér (2D vs. 3D)"
        subtitle="Hogyan lépünk ki a füzetlap síkjából a háromdimenziós valóságba?"
        badge="ALAPFOGALOM"
      >
        <TheoryCard title="Mi a különbség a síkidom és a geometriai test között?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Eddig olyan alakzatokkal foglalkoztunk, amelyek elférnek egy sima papírlapon (2 dimenzió: hosszúság és szélesség, pl. szakasz, téglalap, négyzet).
            A valóságban azonban a tárgyaknak van vastagságuk vagy magasságuk is: <strong>teret töltenek be</strong>. Ezek a <strong>geometriai testek</strong>.
          </p>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-md h-36 mx-auto" viewBox="0 0 360 110">
              {/* 2D: Téglalap */}
              <g transform="translate(30, 15)">
                <rect x="0" y="10" width="80" height="50" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="2" />
                <text x="40" y="5" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">a (szélesség)</text>
                <text x="-8" y="38" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300" transform="rotate(-90 -8 38)">b (magasság)</text>
                <text x="40" y="38" textAnchor="middle" className="text-xs font-bold fill-slate-500">2D Síkidom</text>
                <text x="40" y="75" textAnchor="middle" className="text-[10px] font-black fill-slate-800 dark:fill-slate-200">Sík felület (T)</text>
              </g>

              {/* Nyíl */}
              <path d="M 155 45 L 185 45 M 178 38 L 186 45 L 178 52" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="170" y="32" textAnchor="middle" className="text-[10px] font-bold fill-purple-600 dark:fill-purple-400">+ Mélység (c)</text>

              {/* 3D: Téglatest */}
              <g transform="translate(225, 12)">
                {/* Back edges */}
                <line x1="25" y1="20" x2="25" y2="65" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="0" y1="65" x2="25" y2="65" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="25" y1="65" x2="85" y2="65" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                {/* Faces */}
                <polygon points="0,20 25,5 85,5 60,20" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                <polygon points="60,20 85,5 85,50 60,65" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
                <rect x="0" y="20" width="60" height="45" fill="#faf5ff" stroke="#9333ea" strokeWidth="2" rx="1" />
                {/* Dimensions */}
                <text x="30" y="78" textAnchor="middle" className="text-[9px] font-bold fill-purple-800 dark:fill-purple-300">a (hossz)</text>
                <text x="-6" y="45" textAnchor="middle" className="text-[9px] font-bold fill-purple-800 dark:fill-purple-300" transform="rotate(-90 -6 45)">c (magasság)</text>
                <text x="78" y="14" textAnchor="middle" className="text-[9px] font-bold fill-purple-800 dark:fill-purple-300">b (mélység)</text>
                <text x="30" y="46" textAnchor="middle" className="text-xs font-black fill-purple-950 dark:fill-purple-200">3D Test</text>
                <text x="42" y="90" textAnchor="middle" className="text-[10px] font-black fill-purple-700 dark:fill-purple-300">Térfogat + Felszín</text>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-lg block mb-1">📄</span>
              <strong className="text-slate-800 dark:text-slate-100 text-sm block mb-1">Síkidomok (2D)</strong>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                Csak 2 kiterjedésük van: szélesség (<MathText text="a" />) és hosszúság (<MathText text="b" />).
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400">
                <li>Nincs mélységük, laposak (pl. téglalap, négyzet, kör).</li>
                <li>Mérhető rajta: kerület (<MathText text="K" />) és terület (<MathText text="T" />).</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs">
              <span className="text-lg block mb-1">📦</span>
              <strong className="text-purple-900 dark:text-purple-200 text-sm block mb-1">Térbeli testek (3D)</strong>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                3 kiterjedésük van: hosszúság (<MathText text="a" />), szélesség (<MathText text="b" />) és magasság (<MathText text="c" />).
              </p>
              <ul className="list-disc list-inside space-y-1 text-purple-700 dark:text-purple-300">
                <li>Kézbe vehető, kiterjedt tárgyak (pl. téglatest, kocka, gömb).</li>
                <li>Mérhető rajta: élek hossza, felszín (<MathText text="A" />) és térfogat (<MathText text="V" />).</li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A TÉGLATEST FELÉPÍTÉSE */}
      <TheorySection
        id="teglatest"
        title="2. A téglatest felépítése: Csúcsok, élek, lapok"
        subtitle="A téglatest háromdimenziós anatómiája: a határoló elemek és kapcsolataik"
        badge="GEOMETRIAI ELEMEK"
      >
        <TheoryCard title="A téglatest három legfontosabb alkotóeleme">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A <strong>téglatest</strong> olyan térbeli test, amelyet <strong>6 darab téglalap</strong> határol.
            A mindennapi életben téglatest alakú a cipősdoboz, a gyufásdoboz, a tégla, a könyv vagy egy szekrény.
          </p>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-64 h-52 mx-auto" viewBox="0 0 240 185">
              {/* Takart élek (szaggatott) */}
              <line x1="45" y1="120" x2="45" y2="40" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="15" y1="150" x2="45" y2="120" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="45" y1="120" x2="165" y2="120" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* Lapok kitöltése */}
              <polygon points="15,70 45,40 165,40 135,70" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="1.5" opacity="0.7" />
              <polygon points="135,70 165,40 165,120 135,150" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.5" opacity="0.7" />
              <rect x="15" y="70" width="120" height="80" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" opacity="0.85" rx="1" />

              {/* Látható élek */}
              <line x1="15" y1="70" x2="45" y2="40" stroke="#7e22ce" strokeWidth="1.5" />
              <line x1="45" y1="40" x2="165" y2="40" stroke="#7e22ce" strokeWidth="1.5" />
              <line x1="165" y1="40" x2="135" y2="70" stroke="#7e22ce" strokeWidth="1.5" />
              <line x1="165" y1="40" x2="165" y2="120" stroke="#7e22ce" strokeWidth="1.5" />
              <line x1="135" y1="150" x2="165" y2="120" stroke="#7e22ce" strokeWidth="1.5" />

              {/* Csúcsok (8 pont) */}
              {/* Alsó lap: A(15,150), B(135,150), C(165,120), D(45,120) */}
              <circle cx="15" cy="150" r="3.5" fill="#7e22ce" />
              <text x="8" y="165" className="text-[11px] font-black fill-purple-900 dark:fill-purple-200">A</text>
              <circle cx="135" cy="150" r="3.5" fill="#7e22ce" />
              <text x="140" y="165" className="text-[11px] font-black fill-purple-900 dark:fill-purple-200">B</text>
              <circle cx="165" cy="120" r="3.5" fill="#7e22ce" />
              <text x="174" y="124" className="text-[11px] font-black fill-purple-900 dark:fill-purple-200">C</text>
              <circle cx="45" cy="120" r="3" fill="#94a3b8" />
              <text x="48" y="116" className="text-[10px] font-bold fill-slate-500">D</text>

              {/* Felső lap: E(15,70), F(135,70), G(165,40), H(45,40) */}
              <circle cx="15" cy="70" r="3.5" fill="#7e22ce" />
              <text x="5" y="65" className="text-[11px] font-black fill-purple-900 dark:fill-purple-200">E</text>
              <circle cx="135" cy="70" r="3.5" fill="#7e22ce" />
              <text x="142" y="70" className="text-[11px] font-black fill-purple-900 dark:fill-purple-200">F</text>
              <circle cx="165" cy="40" r="3.5" fill="#7e22ce" />
              <text x="174" y="38" className="text-[11px] font-black fill-purple-900 dark:fill-purple-200">G</text>
              <circle cx="45" cy="40" r="3.5" fill="#7e22ce" />
              <text x="38" y="32" className="text-[11px] font-black fill-purple-900 dark:fill-purple-200">H</text>

              {/* Élek feliratai */}
              <text x="75" y="166" textAnchor="middle" className="text-xs font-black fill-purple-700 dark:fill-purple-300">a (hosszúság)</text>
              <text x="162" y="78" textAnchor="middle" className="text-xs font-black fill-purple-700 dark:fill-purple-300">b (szélesség)</text>
              <text x="4" y="115" textAnchor="middle" className="text-xs font-black fill-purple-700 dark:fill-purple-300">c</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-purple-50/80 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-purple-600 dark:text-purple-400 block mb-1">
                Csúcsok száma
              </span>
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                8 db
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                A sarkok pontjai (A, B, C, D alul, E, F, G, H felül).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/80 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">
                Élek száma
              </span>
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                12 db
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                3 darab 4-es párhuzamos csoportban (4a, 4b, 4c).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-pink-50/80 dark:bg-slate-800/80 border border-pink-200 dark:border-pink-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-pink-600 dark:text-pink-400 block mb-1">
                Lapok száma
              </span>
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                6 db
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                3 pár egymással szemközti, egybevágó téglalaplap.
              </p>
            </div>
          </div>

          <div className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">
              A téglatest éleinek összhossza (Drótváz modell):
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              Képzeld el, hogy drótból elkészíted a téglatest keretét! Minden csúcsból 3 különböző irányú él indul ki (<MathText text="a, b, c" />). Mivel mindegyik élből pontosan <strong>4 darab</strong> van:
            </p>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-700 font-mono text-center text-base font-black text-purple-700 dark:text-purple-300">
              Ö_é = 4 · a + 4 · b + 4 · c = 4 · (a + b + c)
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: A KOCKA */}
      <TheorySection
        id="kocka"
        title="3. A kocka: A legszabályosabb téglatest"
        subtitle="Minden oldallap egybevágó négyzet, és mind a 12 él azonos hosszúságú"
        badge="SZABÁLYOS TEST"
      >
        <TheoryCard title="A kocka különleges tulajdonságai">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            A <strong>kocka</strong> a téglatest egy különleges fajtája: olyan téglatest, amelynek mindhárom éle egyenlő hosszúságú (<MathText text="a = b = c" />).
          </p>

          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs mb-3">
            <strong className="text-amber-900 dark:text-amber-200 text-sm block mb-1">
              Jegyezd meg jól:
            </strong>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Minden kocka téglatest</strong> (hiszen a négyzet is téglalap), de <strong>nem minden téglatest kocka</strong>! Pontosan úgy, ahogy minden négyzet téglalap, de nem minden téglalap négyzet.
            </p>
          </div>

          <TheoryTable
            headers={['Tulajdonság', 'Téglatest', 'Kocka']}
            rows={[
              ['Lapok alakja', '6 db téglalap (szemköztiek egybevágók)', '6 db egybevágó négyzet'],
              ['Lapok száma', '6 db', '6 db (mint a játékkockán 1-től 6-ig)'],
              ['Csúcsok száma', '8 db', '8 db'],
              ['Élek száma', '12 db (4a + 4b + 4c)', '12 db egyenlő él (mind „a”)'],
              ['Élek összhossza', '4 · (a + b + c)', '12 · a']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: SÍKBELI HÁLÓ ÉS AXONOMETRIA */}
      <TheorySection
        id="halo-abrazolas"
        title="4. Síkbeli háló (kiterítés) és térbeli ábrázolás"
        subtitle="Hogyan készíthetünk dobozt papírból, és hogyan rajzolunk testet síkban?"
        badge="ÁBRÁZOLÁS"
      >
        <TheoryCard title="A test síkbeli hálója (Kiterítés)">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Ha egy kartondobozt az élei mentén felvágunk és kiterítünk a síkba, a test <strong>síkbeli hálóját</strong> kapjuk.
            Összehajtva a háló lapjait hézagmentesen le kell fedniük a testet anélkül, hogy átfednék egymást.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs mb-2">
                A kocka kereszt alakú hálója (6 négyzet)
              </h4>
              <svg className="w-40 h-40 mx-auto" viewBox="0 0 120 120">
                {/* Latin kereszt háló */}
                <rect x="45" y="5" width="30" height="30" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                <rect x="15" y="35" width="30" height="30" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                <rect x="45" y="35" width="30" height="30" fill="#d8b4fe" stroke="#9333ea" strokeWidth="1.5" />
                <rect x="75" y="35" width="30" height="30" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                <rect x="45" y="65" width="30" height="30" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                <rect x="45" y="95" width="30" height="30" fill="#d8b4fe" stroke="#9333ea" strokeWidth="1.5" />
                <text x="60" y="52" textAnchor="middle" className="text-[8px] font-bold fill-purple-900">Alap</text>
                <text x="60" y="112" textAnchor="middle" className="text-[8px] font-bold fill-purple-900">Fedőlap</text>
              </svg>
              <p className="text-[11px] text-slate-500 mt-2">
                A kockának összesen 11 különböző síkbeli hálója létezik!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs mb-2">
                Axonometrikus ábrázolás (Láthatóság)
              </h4>
              <svg className="w-44 h-36 mx-auto" viewBox="0 0 140 100">
                {/* Téglatest axonometrikusan */}
                {/* Takart élek (szaggatott) */}
                <line x1="25" y1="70" x2="25" y2="30" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="25" y1="70" x2="65" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="25" y1="70" x2="10" y2="85" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />

                {/* Látható élek (folytonos) */}
                <rect x="10" y="45" width="70" height="40" fill="none" stroke="#7e22ce" strokeWidth="2" />
                <polygon points="10,45 25,30 95,30 80,45" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="1.5" opacity="0.6" />
                <polygon points="80,45 95,30 95,70 80,85" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.5" opacity="0.6" />
                <line x1="80" y1="45" x2="95" y2="30" stroke="#7e22ce" strokeWidth="2" />
                <line x1="80" y1="85" x2="95" y2="70" stroke="#7e22ce" strokeWidth="2" />
                <line x1="95" y1="30" x2="95" y2="70" stroke="#7e22ce" strokeWidth="2" />
              </svg>
              <p className="text-[11px] text-slate-500 mt-2">
                A nem látható, takart éleket <strong>szaggatott vonallal</strong> rajzoljuk!
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV TÉGLATEST ÉS KOCKA STÚDIÓ */}
      <TheorySection
        id="laboratorium"
        title="5. Interaktív Téglatest és Kocka 3D Stúdió"
        subtitle="Változtasd az élek hosszát, válts 3D és síkbeli háló nézet között, és számold meg az elemeket!"
        badge="INTERAKTÍV ESZKÖZ"
      >
        <TheoryCard title="Térbeli Modell és Háló Labor">
          {/* Módválasztó gombok */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => {
                setBodyType('cuboid');
                setEdgeA(6);
                setEdgeB(4);
                setEdgeC(5);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                bodyType === 'cuboid'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              📦 Téglatest (a, b, c)
            </button>
            <button
              onClick={() => {
                setBodyType('cube');
                setEdgeA(5);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                bodyType === 'cube'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              🎲 Kocka (a = b = c)
            </button>

            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  viewMode === '3d'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                3D Drótváz
              </button>
              <button
                onClick={() => setViewMode('net')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  viewMode === 'net'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Síkbeli háló
              </button>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>{bodyType === 'cube' ? 'Oldalél (a):' : 'Hosszúság (a):'}</span>
                <span className="font-mono text-purple-700 dark:text-purple-300">{edgeA} {unit}</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                value={edgeA}
                onChange={(e) => setEdgeA(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {bodyType === 'cuboid' && (
              <>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Szélesség (b):</span>
                    <span className="font-mono text-purple-700 dark:text-purple-300">{edgeB} {unit}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={edgeB}
                    onChange={(e) => setEdgeB(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Magasság (c):</span>
                    <span className="font-mono text-purple-700 dark:text-purple-300">{edgeC} {unit}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={edgeC}
                    onChange={(e) => setEdgeC(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>

          {/* Vizualizáció és Számított adatok */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {/* SVG Megjelenítő */}
            <div className="flex-1 flex items-center justify-center min-h-[180px] p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              {viewMode === '3d' ? (
                <svg className="w-52 h-44" viewBox="0 0 160 140">
                  {/* Belső takart vonalak */}
                  <line x1="30" y1="95" x2="30" y2="45" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="30" y1="95" x2="90" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="30" y1="95" x2="15" y2="115" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Felső lap */}
                  <polygon points="15,65 30,45 105,45 90,65" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" opacity="0.7" />
                  {/* Jobb oldallap */}
                  <polygon points="90,65 105,45 105,95 90,115" fill="#e9d5ff" stroke="#9333ea" strokeWidth="2" opacity="0.7" />
                  {/* Elülső lap */}
                  <polygon points="15,65 90,65 90,115 15,115" fill="#d8b4fe" stroke="#9333ea" strokeWidth="2" opacity="0.6" />

                  {/* Méretcímkék */}
                  <text x="52" y="128" textAnchor="middle" className="text-[10px] font-black fill-purple-950">a = {actualA} {unit}</text>
                  <text x="108" y="90" textAnchor="start" className="text-[10px] font-black fill-purple-950">c = {actualC} {unit}</text>
                  <text x="10" y="85" textAnchor="end" className="text-[9px] font-bold fill-slate-500">b = {actualB} {unit}</text>
                </svg>
              ) : (
                <svg className="w-48 h-48" viewBox="0 0 140 140">
                  {/* Kiterített háló */}
                  <rect x="50" y="10" width="35" height="25" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                  <rect x="15" y="35" width="35" height="35" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                  <rect x="50" y="35" width="35" height="35" fill="#d8b4fe" stroke="#9333ea" strokeWidth="1.5" />
                  <rect x="85" y="35" width="35" height="35" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                  <rect x="50" y="70" width="35" height="25" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                  <rect x="50" y="95" width="35" height="35" fill="#d8b4fe" stroke="#9333ea" strokeWidth="1.5" />
                  <text x="67" y="55" textAnchor="middle" className="text-[8px] font-bold fill-purple-900">Alap</text>
                  <text x="67" y="115" textAnchor="middle" className="text-[8px] font-bold fill-purple-900">Fedél</text>
                </svg>
              )}
            </div>

            {/* Számított adatok panelje */}
            <div className="w-full md:w-64 space-y-2">
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                  Élek összhossza (keret)
                </span>
                <div className="text-lg font-black font-mono text-purple-900 dark:text-purple-100">
                  {bodyType === 'cube'
                    ? `12 · ${actualA} = ${totalEdgeLength} ${unit}`
                    : `4 · (${actualA} + ${actualB} + ${actualC}) = ${totalEdgeLength} ${unit}`}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block">Csúcsok</span>
                  <strong className="text-sm text-slate-800 dark:text-slate-100">8</strong>
                </div>
                <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block">Élek</span>
                  <strong className="text-sm text-slate-800 dark:text-slate-100">12</strong>
                </div>
                <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block">Lapok</span>
                  <strong className="text-sm text-slate-800 dark:text-slate-100">6</strong>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORLATI CSAPDÁK */}
      <TheorySection
        id="csapdak"
        title="6. Gyakorlati alkalmazások és tipikus csapdák"
        subtitle="Akvárium kerete, dobozkészítés és a 3 leggyakoribb hiba"
        badge="GYAKORLATI ÉLET"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. CSAPDA: Csúcsok (8) és Lapok (6) összekeverése',
              description: 'A diákok gyakran összekeverik a lapok és csúcsok számát. Segít a játékkocka analógia: a dobókockának 6 oldala van (1-től 6-ig pontozva), tehát 6 LAPJA van! A sarkok a csúcsok: 4 sarok alul, 4 sarok felül = összesen 8 CSÚCS!',
              example: 'Lapok = 6 db (mint a dobókockán) | Csúcsok = 8 db (4 alul + 4 felül) | Élek = 12 db'
            },
            {
              title: '2. CSAPDA: Téglatest élhossz-összegénél a 4-es szorzó elfelejtése',
              description: 'Ha a kérdés az, mennyi léc vagy drót kell egy 5 cm × 4 cm × 3 cm méretű téglatest keretéhez, SOKAN csak összeadják az oldalakat (5 + 4 + 3 = 12 cm). Ez HIBÁS! Minden élből 4 darab van a térben (4 hosszúság, 4 szélesség, 4 oszlop), így a helyes képlet: 4 · (5 + 4 + 3) = 4 · 12 = 48 cm!',
              example: 'HIBÁS: 5 + 4 + 3 = 12 cm ❌ | HELYES: 4 · (5 + 4 + 3) = 48 cm ✅'
            },
            {
              title: '3. CSAPDA: Kockaháló szabály: nem lehet egymás mellett két szemközti lap',
              description: 'Egy síkbeli alakzat csak akkor hajtogatható kockává, ha 6 négyzetből áll, és nincsenek benne olyan egymásba nyíló lapok, amelyek összehajtáskor fednék egymást. Például 4 négyzet egymás mellett egy sorban és 1-1 alul-felül működik, de 5 négyzet egy sorban SOHA nem adhat kockát!',
              example: 'Egy sorban legfeljebb 4 négyzet állhat egy érvényes kockahálóban!'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
