import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import {
  FriezePatternsSvg,
  TessellationSvg,
  EscherTessellationSvg
} from './AppliedFigures';
import {
  Sparkles,
  Layers,
  Boxes,
  Palette,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface AppliedTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

export const AppliedTheory: React.FC<AppliedTheoryProps> = ({
  onBack,
  onStartQuiz,
  topicId = 'g9-trans-gyakorlat',
  topicTitle = '5. Egybevágósági transzformációk a gyakorlatban'
}) => {
  // Interaktív Labor State
  const [activeTab, setActiveTab] = useState<'frieze' | 'angles' | 'escher'>('frieze');
  const [friezeType, setFriezeType] = useState<'hop' | 'step' | 'sidle' | 'spin'>('step');
  const [polygonSides, setPolygonSides] = useState<number>(6);
  const [escherCurve, setEscherCurve] = useState<number>(20);

  // Szabályos sokszög belső szöge: ((n - 2) * 180) / n
  const interiorAngle = ((polygonSides - 2) * 180) / polygonSides;
  const countAtVertex = Math.round(360 / interiorAngle);
  const totalAngleAround = countAtVertex * interiorAngle;
  const isPerfectTessellation = Math.abs(totalAngleAround - 360) < 0.001;

  return (
    <TheoryTemplate
      title="5. Egybevágósági transzformációk a gyakorlatban"
      subtitle="A 7 szalagornamens (frizcsoportok), a sík parkettázása és Escher-féle mozaikok geometriája 9. osztályban"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG • 5. TRANSZFORMÁCIÓK A GYAKORLATBAN"
      themeColor="cyan"
      topicId={topicId}
      topicTitle={topicTitle}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a gyakorlati transzformációk feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Aranyszabály: Parkettázhatóság feltétele",
        formula: "A csúcsok körül: k · α = 360° | Szabályos sokszöggel csak: 3-, 4- és 6-szög!",
        align: "center"
      }}
    >
      {/* 1. RÉSZ: Szalagornamensek (Frizek) */}
      <TheorySection
        title="1. Szalagornamensek (Frizek) és a 7 Szimmetriacsoport"
        badge="Díszítősorok"
        icon={<Layers className="w-5 h-5 text-cyan-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A <strong>szalagornamens</strong> (más néven <em>friz</em> vagy díszítősor) egy síkbeli, egy irányban periodikusan ismétlődő mintázat. Építészeti homlokzatokon, kerámiaedényeken, textilszegélyeken és kerítéseken évezredek óta alkalmazzák.
        </p>

        <div className="flex justify-center my-6">
          <FriezePatternsSvg size={440} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              A Frizek Alapvető Szimmetriái
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
              <li><strong>Eltolás (v):</strong> Minden frizben közös az egyenes menti periodikus eltolás.</li>
              <li><strong>Hosszanti tengelyes tükrözés:</strong> A díszítősor felezővonalára való tükrözés.</li>
              <li><strong>Keresztirányú tükrözések:</strong> A haladási irányra merőleges szimmetriatengelyek sora.</li>
              <li><strong>180°-os forgatás (Középpontos tükrözés):</strong> Két szomszédos motívum közötti pont körüli félfordulat.</li>
              <li><strong>Csúsztatva tükrözés:</strong> Fél periódusnyi eltolás és a hossztengelyre történő tükrözés egymásutánja.</li>
            </ul>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/40 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800">
            <h4 className="font-semibold text-cyan-900 dark:text-cyan-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              A Matematika Meglepő Tétele: Pontosan 7 Frizcsoport Létezik!
            </h4>
            <p className="text-sm text-cyan-800 dark:text-cyan-300 leading-relaxed">
              Bármilyen bonyolult művészi mintát is rajzolunk egy sávban, a lehetséges szimmetriák kombinációjának száma matematikailag <strong>szigorúan 7</strong>. Se több, se kevesebb nem lehetséges a sík geometriai törvényszerűségei miatt!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: Parkettázás és Síklefedés */}
      <TheorySection
        title="2. Parkettázás és Síklefedés (Tesszelláció)"
        badge="Síklefedések"
        icon={<Boxes className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Egy síkidomot vagy síkidomok halmazát akkor nevezünk <strong>síklefedőnek</strong> (parkettázónak), ha a síkot hézagmentesen és átfedésmentesen képes lefedni.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200 dark:border-amber-800 my-4">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-1 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
            A Csúcs Körüli Szögek Aranyszabálya
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            Egy csúcsban találkozó sokszögek belső szögeinek összege pontosan <strong>360°-ot</strong> kell hogy kitegyen, különben hézag (lyuk) vagy átfedés (egymásra torlódás) keletkezik:
            <br />
            <span className="font-mono font-bold text-base block mt-2 text-center text-amber-950 dark:text-amber-100">
              k · α = 360° (ahol k egész szám, α pedig a sokszög belső szöge)
            </span>
          </p>
        </div>

        <div className="flex justify-center my-6">
          <TessellationSvg size={440} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-1">1. Szabályos Háromszög</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Belső szög: <strong>60°</strong>.<br />
              Egy csúcs körül: <strong>6 darab</strong> találkozik.<br />
              6 × 60° = 360°. Tökéletes parkettázás.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-1">2. Négyzet</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Belső szög: <strong>90°</strong>.<br />
              Egy csúcs körül: <strong>4 darab</strong> találkozik.<br />
              4 × 90° = 360°. Hagyományos sakktábla-rács.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-1">3. Szabályos Hatszög</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Belső szög: <strong>120°</strong>.<br />
              Egy csúcs körül: <strong>3 darab</strong> találkozik.<br />
              3 × 120° = 360°. Méhsejt-szerkezet.
            </p>
          </div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-xl border border-rose-200 dark:border-rose-800 my-4">
          <h4 className="font-bold text-rose-900 dark:text-rose-200 mb-1 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            Miért Nem Parkettáz a Szabályos Ötszög?
          </h4>
          <p className="text-sm text-rose-800 dark:text-rose-300 leading-relaxed">
            A szabályos ötszög belső szöge: (5 − 2) · 180° / 5 = <strong>108°</strong>.<br />
            Ha 3 ötszöget teszünk egy csúcs köré: 3 · 108° = <strong>324°</strong> (marad egy 36°-os hézag!).<br />
            Ha 4 ötszöget próbálnánk: 4 · 108° = <strong>432° &gt; 360°</strong> (átfednék egymást). Mivel a 108 nem osztója a 360-nak, önmagában szabályos ötszögekkel <strong>nem fedhető le a sík!</strong>
          </p>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 my-4">
          <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">
            Zseniális Tétel: Bármely Általános Háromszög és Négyszög Parkettáz!
          </h4>
          <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
            Meglepő, de <strong>tetszőleges alakú</strong> háromszöggel vagy tetszőleges konvex/konkáv négyszöggel hézagmentesen lefedhető a sík! A trükk a <em>180°-os forgatás (oldalfelező pont körüli tükrözés)</em>: az oldalfelezők körüli forgatásokkal a belső szögek (α + β + γ = 180°, illetve négyszögnél α + β + γ + δ = 360°) pontosan kitöltik a csúcs körüli teljes szöget!
          </p>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: Escher Művészete és Természeti Szimmetriák */}
      <TheorySection
        title="3. Csúsztatva Tükrözés, Escher Művészete és Természeti Szimmetriák"
        badge="Művészet & Természet"
        icon={<Palette className="w-5 h-5 text-purple-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          <strong>Maurits Cornelis Escher (1898–1972)</strong> holland grafikusművész világhírűvé vált olyan fametszeteiről és litográfiáiról, amelyeken madarak, halak, gyíkok és fantázialények fedik le a síkot hézagmentesen.
        </p>

        <div className="flex justify-center my-6">
          <EscherTessellationSvg size={440} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Hogyan Készül egy Escher-Alakzat?
            </h4>
            <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-decimal list-inside">
              <li>Kiindulunk egy ismert síklefedő alapidomból (pl. négyzet vagy paralelogramma).</li>
              <li>Az egyik oldalból tetszőleges alakú darabot vágunk ki.</li>
              <li>A kivágott formát <strong>eltoljuk vagy elforgatjuk</strong> a szemközti oldalra.</li>
              <li>Mivel a levágott és hozzáadott terület megegyezik, az alakzat területe állandó marad, és a csempék pont illeszkednek!</li>
            </ol>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Szimmetriák a Természetben és Technikában
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
              <li><strong>Hópehely:</strong> 60°-os forgásszimmetria és 6 tengelyes szimmetria (hexagonális vízkristály).</li>
              <li><strong>Lábnyomok sora a homokban:</strong> Csúsztatva tükrözés (jobb és bal láb váltakozva tolódik előre).</li>
              <li><strong>Kristályrácsok:</strong> Atomok 3 dimenziós periodikus eltolási és forgatási rendszere (Bravais-rácsok).</li>
              <li><strong>Kerékpárlánc és fogaskerekek:</strong> Eltolásos és forgásszimmetriás erőátvitel.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: Interaktív Labor (A tananyag legvégén!) */}
      <TheorySection
        title="4. Interaktív Labor: Friz és Parketta Műhely"
        badge="Interaktív Labor"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Kísérletezz a szalagornamensek felépítésével, ellenőrizd a csúcs körüli szögek feltételét, vagy hozz létre saját Escher-stílusú eltolt csempét!
        </p>

        {/* Labor Fül-Választó */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('frieze')}
            className={`px-4 py-2.5 font-medium text-sm rounded-t-lg transition-all ${
              activeTab === 'frieze'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Friz Generátor
          </button>
          <button
            onClick={() => setActiveTab('angles')}
            className={`px-4 py-2.5 font-medium text-sm rounded-t-lg transition-all ${
              activeTab === 'angles'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Csúcs Körüli Szögvizsgáló
          </button>
          <button
            onClick={() => setActiveTab('escher')}
            className={`px-4 py-2.5 font-medium text-sm rounded-t-lg transition-all ${
              activeTab === 'escher'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Escher Csempe Műhely
          </button>
        </div>

        {/* 1. Fül: Friz Generátor */}
        {activeTab === 'frieze' && (
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Válassz Friz Transzformációt:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFriezeType('hop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    friezeType === 'hop' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Tiszta Eltolás (Hop)
                </button>
                <button
                  onClick={() => setFriezeType('step')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    friezeType === 'step' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Csúsztatva Tükrözés (Step)
                </button>
                <button
                  onClick={() => setFriezeType('sidle')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    friezeType === 'sidle' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Függőleges Tükrözés (Sidle)
                </button>
                <button
                  onClick={() => setFriezeType('spin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    friezeType === 'spin' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
                  }`}
                >
                  180° Forgatás (Spinning Hop)
                </button>
              </div>
            </div>

            {/* Friz Vászon */}
            <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
              <svg viewBox="0 0 540 120" className="w-full max-w-2xl mx-auto h-28 select-none">
                {/* Alapvonal */}
                <line x1="10" y1="60" x2="530" y2="60" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

                {/* Motívumok generálása */}
                {friezeType === 'hop' && (
                  [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                    <g key={i} transform={`translate(${30 + i * 65}, 35)`}>
                      <path d="M 0 35 L 0 5 L 20 18 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
                      <circle cx="0" cy="5" r="3" fill="#1e40af" />
                    </g>
                  ))
                )}

                {friezeType === 'step' && (
                  [0, 1, 2, 3, 4].map(i => (
                    <React.Fragment key={i}>
                      {/* Felső */}
                      <g transform={`translate(${30 + i * 110}, 25)`}>
                        <path d="M 0 0 L 25 0 L 12 -22 Z" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
                      </g>
                      {/* Alsó csúsztatott tükörkép */}
                      <g transform={`translate(${85 + i * 110}, 95)`}>
                        <path d="M 0 0 L 25 0 L 12 22 Z" fill="#059669" stroke="#065f46" strokeWidth="1.5" />
                      </g>
                    </React.Fragment>
                  ))
                )}

                {friezeType === 'sidle' && (
                  [0, 1, 2, 3, 4].map(i => (
                    <g key={i} transform={`translate(${30 + i * 105}, 35)`}>
                      <line x1="45" y1="0" x2="45" y2="50" stroke="#e9d5ff" strokeWidth="1.5" strokeDasharray="3 2" />
                      {/* Bal elem */}
                      <path d="M 15 40 L 40 40 L 40 10 Z" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
                      {/* Jobb tükrözött elem */}
                      <path d="M 75 40 L 50 40 L 50 10 Z" fill="#9333ea" stroke="#6b21a8" strokeWidth="1.5" />
                    </g>
                  ))
                )}

                {friezeType === 'spin' && (
                  [0, 1, 2, 3, 4, 5].map(i => (
                    <g key={i} transform={`translate(${30 + i * 85}, 60)`}>
                      <g transform={i % 2 === 1 ? 'rotate(180)' : 'rotate(0)'}>
                        <path d="M -15 -25 L 15 -25 L 0 -5 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                        <circle cx="0" cy="0" r="2.5" fill="#d97706" />
                      </g>
                    </g>
                  ))
                )}
              </svg>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center">
              {friezeType === 'hop' && 'Egyszerű periodikus eltolás jobbra egyforma v vektorral.'}
              {friezeType === 'step' && 'Lábnyom-szimmetria: eltolás fél lépéssel + tengelyes tükrözés a felezővonalra.'}
              {friezeType === 'sidle' && 'Merőleges tengelyek mentén tükrözött motívumpárok sora.'}
              {friezeType === 'spin' && 'Váltakozó irányok: minden lépésben egy pont körüli 180°-os félfordulat keletkezik.'}
            </p>
          </div>
        )}

        {/* 2. Fül: Csúcs Körüli Szögvizsgáló */}
        {activeTab === 'angles' && (
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Szabályos sokszög oldalszáma (n):
              </label>
              <div className="flex gap-2">
                {[3, 4, 5, 6, 8, 10, 12].map(n => (
                  <button
                    key={n}
                    onClick={() => setPolygonSides(n)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      polygonSides === n
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    n = {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500">Egy Belső Szög</span>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{interiorAngle.toFixed(1)}°</p>
                <span className="text-2xs text-slate-400">({polygonSides} − 2) · 180° / {polygonSides}</span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500">Csúcs Körül Elhelyezhető</span>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{countAtVertex} db</p>
                <span className="text-2xs text-slate-400">Összeg: {totalAngleAround.toFixed(1)}°</span>
              </div>
              <div className={`p-3 rounded-xl border flex flex-col justify-center items-center ${
                isPerfectTessellation
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-800 dark:text-rose-300'
              }`}>
                <span className="text-xs font-semibold">Síklefedési Eredmény</span>
                <p className="text-base font-bold flex items-center gap-1 mt-0.5">
                  {isPerfectTessellation ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Önállóan Parkettáz!
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Rés vagy Átfedés!
                    </>
                  )}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
              {polygonSides === 3 && 'Szabályos háromszög (60°): 6 × 60° = 360°. Tökéletes zárt csillagpont!'}
              {polygonSides === 4 && 'Négyzet (90°): 4 × 90° = 360°. Standard derékszögű síklefedés.'}
              {polygonSides === 5 && 'Szabályos ötszög (108°): 3 × 108° = 324° (36° üres hézag marad, nem osztja a 360-at).'}
              {polygonSides === 6 && 'Szabályos hatszög (120°): 3 × 120° = 360°. Optimális méhsejt-szerkezet.'}
              {polygonSides === 8 && 'Szabályos nyolcszög (135°): 2 × 135° = 270° (90° hézag marad, négyzetekkel kiegészítve parkettázhat).'}
              {polygonSides > 8 && `Szabályos ${polygonSides}-szög (${interiorAngle.toFixed(1)}°): Önállóan nem fedi le a síkot.`}
            </p>
          </div>
        )}

        {/* 3. Fül: Escher Csempe Műhely */}
        {activeTab === 'escher' && (
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
                  Escher Oldaldeformáció Mértéke:
                </span>
                <span className="text-xs text-slate-500">
                  Mozgasd a csúszkát: a bal oldalból kivágott darab azonnal átkerül a jobb oldalra!
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={escherCurve}
                  onChange={(e) => setEscherCurve(Number(e.target.value))}
                  className="w-40 accent-purple-600 cursor-pointer"
                />
                <span className="text-sm font-bold font-mono text-purple-700 dark:text-purple-300 w-12 text-right">
                  {escherCurve} px
                </span>
              </div>
            </div>

            {/* Escher Csempe Megjelenítése */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-center">
              <svg viewBox="0 0 420 180" className="w-full max-w-md h-40 select-none">
                {/* 1. Alapnégyzet balra */}
                <g transform="translate(40, 30)">
                  <rect x="0" y="0" width="100" height="100" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="3 3" />
                  <path
                    d={`M 0 0 C ${escherCurve} 25, ${-escherCurve} 75, 0 100 L 100 100 C ${100 + escherCurve} 75, ${100 - escherCurve} 25, 100 0 Z`}
                    fill="#c084fc"
                    stroke="#7e22ce"
                    strokeWidth="2"
                  />
                  <text x="50" y="55" fontSize="11" fontWeight="bold" fill="#6b21a8" textAnchor="middle">
                    Egyedi Csempe
                  </text>
                </g>

                {/* Eltolási nyíl */}
                <path d="M 170 80 L 205 80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#purple-arr)" />

                {/* 2. Egymásba illeszkedő 2 csempe jobbra */}
                <g transform="translate(225, 30)">
                  {/* Csempe 1 */}
                  <path
                    d={`M 0 0 C ${escherCurve} 25, ${-escherCurve} 75, 0 100 L 75 100 C ${75 + escherCurve} 75, ${75 - escherCurve} 25, 75 0 Z`}
                    fill="#a855f7"
                    stroke="#6b21a8"
                    strokeWidth="1.5"
                  />
                  {/* Csempe 2 (illeszkedik) */}
                  <path
                    d={`M 75 0 C ${75 + escherCurve} 25, ${75 - escherCurve} 75, 75 100 L 150 100 C ${150 + escherCurve} 75, ${150 - escherCurve} 25, 150 0 Z`}
                    fill="#fbbf24"
                    stroke="#b45309"
                    strokeWidth="1.5"
                  />
                  <text x="75" y="118" fontSize="10" fontWeight="bold" fill="#047857" textAnchor="middle">
                    Hézagmentes kapcsolódás!
                  </text>
                </g>
              </svg>
            </div>
          </div>
        )}
      </TheorySection>
    </TheoryTemplate>
  );
};

