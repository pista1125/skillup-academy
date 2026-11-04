import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  TransformationsOverviewSvg,
  PolygonDiagonalsAnglesSvg
} from './SummaryFigures';
import {
  Trophy,
  Layers,
  Sparkles,
  Boxes,
  HelpCircle,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface SummaryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

export const SummaryTheory: React.FC<SummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
  topicId = 'g9-trans-osszefoglalas',
  topicTitle = '8. Gyakorlás, tudáspróba'
}) => {
  // Labor State
  const [activeTab, setActiveTab] = useState<'polygon' | 'composition'>('polygon');
  const [polygonN, setPolygonN] = useState<number>(6); // Sokszög oldalszám

  // Kompozíció State
  const [compT1, setCompT1] = useState<'refl1' | 'refl2' | 'central1'>('refl1');
  const [compT2, setCompT2] = useState<'refl-parallel' | 'refl-intersect' | 'central2'>('refl-parallel');

  // Sokszög számítások
  const sumAngles = (polygonN - 2) * 180;
  const regularAngle = sumAngles / polygonN;
  const exteriorAngle = 360 / polygonN;
  const totalDiagonals = (polygonN * (polygonN - 3)) / 2;
  const diagonalsFromOneVertex = polygonN - 3;

  return (
    <TheoryTemplate
      title="8. Gyakorlás és tudáspróba - Geometria Összefoglalás"
      subtitle="A teljes VI. témakör átfogó összefoglalása: transzformációk, szerkesztések, négyszögek, sokszögek és területképletek"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG • 8. TÉMAZÁRÓ ÖSSZEFOGLALÁS"
      themeColor="rose"
      topicId={topicId}
      topicTitle={topicTitle}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a 90 kérdéses záró tudáspróbára?"
      practiceSubtitle="Tedd próbára tudásodat a teljes VI. témakört lefedő, 3 szinten 90 feladatból álló záró kvízben!"
      practiceButtonText="90 Kérdéses Kvíz indítása"
      quickRule={{
        label: "Témazáró aranyszabály: Sokszögek átlói & szögei",
        formula: "S_n = (n−2)·180° | d_n = n(n−3)/2 | Külső szögek összege: 360°",
        align: "center"
      }}
    >
      {/* 1. RÉSZ: Transzformációk Nagy Összefoglalása */}
      <TheorySection
        title="1. Egybevágósági Transzformációk Rendszere"
        badge="Transzformációk"
        icon={<Layers className="w-5 h-5 text-rose-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A sík egybevágósági transzformációi <strong>távolságtartó</strong> és <strong>szögtartó</strong> leképezések. A sík minden alakzata egybevágó a képével.
        </p>

        <div className="flex justify-center my-6">
          <TransformationsOverviewSvg size={440} />
        </div>

        {/* Transzformációk táblázata */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Transzformáció</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Fixpontok</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Fixegyenesek</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Körüljárási Irány</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-pink-600">Tengelyes tükrözés</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">A tengely minden pontja</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">A tengely (pontról pontra) és a tengelyre merőleges egyenesek</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-rose-600">Megfordul (irányváltó)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-blue-600">Középpontos tükrözés</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Csak az O középpont</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Az O-n átmenő összes egyenes</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">Változatlan (iránytartó)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-purple-600">Forgatás (α ≠ k·360°)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Csak az O forgásközéppont</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nincs (kivéve α = 180°, ami középpontos tükrözés)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">Változatlan (iránytartó)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-emerald-600">Eltolás (v ≠ 0)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nincs egyetlen fixpontja sem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">A v vektorral párhuzamos egyenesek</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-emerald-600">Változatlan (iránytartó)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-amber-600">Csúsztatva tükrözés</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Nincs egyetlen fixpontja sem</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">Egyetlen fixegyenese a tükrözés tengelye</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-bold text-rose-600">Megfordul (irányváltó)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: Sokszögek Átlói és Szögösszegei */}
      <TheorySection
        title="2. Sokszögek Átlói és Szögösszegei"
        badge="Sokszögek"
        icon={<Boxes className="w-5 h-5 text-indigo-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A konvex $n$-szögek belső tulajdonságait a háromszögekre történő felbontás segítségével határozzuk meg.
        </p>

        <div className="flex justify-center my-6">
          <PolygonDiagonalsAnglesSvg size={440} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Belső Szögek Összege</h5>
            <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm my-1">
              S_n = (n − 2) · 180°
            </div>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Mert egy csúcsból húzott átlókkal az $n$-szög $(n − 2)$ darab háromszögre bontható.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Összes Átló Száma</h5>
            <div className="font-mono font-bold text-purple-600 dark:text-purple-400 text-sm my-1">
              <MathText>{"$d_n = \\frac{n(n - 3)}{2}$"}</MathText>
            </div>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Egy csúcsból $(n − 3)$ átló húzható (önmagába és 2 szomszédjába nem), a kettővel való osztás az oda-vissza számlálást korrigálja.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h5 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Külső Szögek Összege</h5>
            <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm my-1">
              <MathText>{"$\\Sigma_{\\text{külső}} = 360^\\circ$"}</MathText>
            </div>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Bármilyen sokszögre érvényes! Szabályos sokszögben egy külső szög <MathText>{"$\\frac{360^\\circ}{n}$"}</MathText>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. RÉSZ: Négyszögek és Területképletek Átfogó Összegzése */}
      <TheorySection
        title="3. Négyszögek és Területképleteik Mester-Táblázata"
        badge="Területek"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A tanult nevezetes négyszögek tulajdonságai, szimmetriái és területképletei egyetlen pillantással:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                <th className="p-2 border border-slate-200 dark:border-slate-700">Alakzat</th>
                <th className="p-2 border border-slate-200 dark:border-slate-700">Definíció / Szimmetria</th>
                <th className="p-2 border border-slate-200 dark:border-slate-700">Átlók Viszonya</th>
                <th className="p-2 border border-slate-200 dark:border-slate-700">Területképlet (T)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-2 font-bold border border-slate-200 dark:border-slate-700">Téglalap</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">Minden szöge 90° • 2 tengely, középpontos</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">e = f és felezik egymást</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">T = a · b</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-2 font-bold border border-slate-200 dark:border-slate-700">Négyzet</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">Egyenlő oldalak és 90° • 4 tengely, 90° forgás</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">e = f, e ⊥ f, feleznek és szögfelezők</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">T = a² = d² / 2</td>
              </tr>
              <tr>
                <td className="p-2 font-bold border border-slate-200 dark:border-slate-700">Paralelogramma</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">Két párhuzamos oldalpár • 0 tengely, középpontos</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">Felezik egymást</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">T = a · m_a = b · m_b</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-2 font-bold border border-slate-200 dark:border-slate-700">Rombusz</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">Egyenlő oldalak • 2 tengely (átlók), középpontos</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">e ⊥ f, felezik egymást és szögfelezők</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">T = (e · f) / 2 = a · m</td>
              </tr>
              <tr>
                <td className="p-2 font-bold border border-slate-200 dark:border-slate-700">Deltoid</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">Két-két szomszédos oldal egyenlő • 1 tengely</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">e ⊥ f, szimmetriaátló felezi a másikat</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">T = (e · f) / 2</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-2 font-bold border border-slate-200 dark:border-slate-700">Trapéz</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">Legalább egy párhuzamos oldalpár (a || c)</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700">Különbözők (húrtrapéznál egyenlők)</td>
                <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">T = ((a + c) / 2) · m = k · m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: Interaktív Labor (A tananyag végén!) */}
      <TheorySection
        title="4. Interaktív Labor: Geometriai Nagymester Műhely"
        badge="Interaktív Labor"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Számolj ki sokszög-tulajdonságokat tetszőleges oldalszámra, vagy vizsgáld meg a transzformációk kompozíciójának meglepő eredményeit!
        </p>

        {/* Labor Fül-Választó */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('polygon')}
            className={`px-4 py-2.5 font-medium text-sm rounded-t-lg transition-all ${
              activeTab === 'polygon'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Sokszög Kalkulátor
          </button>
          <button
            onClick={() => setActiveTab('composition')}
            className={`px-4 py-2.5 font-medium text-sm rounded-t-lg transition-all ${
              activeTab === 'composition'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Transzformáció Kompozíció Elemző
          </button>
        </div>

        {/* 1. Fül: Sokszög Kalkulátor */}
        {activeTab === 'polygon' && (
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
                  Sokszög oldalszáma (n):
                </span>
                <span className="text-xs text-slate-500">
                  Mozgasd a csúszkát 3-tól 16-ig a szögösszegek és átlók kiszámításához!
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="3"
                  max="16"
                  value={polygonN}
                  onChange={(e) => setPolygonN(Number(e.target.value))}
                  className="w-44 accent-indigo-600 cursor-pointer"
                />
                <span className="text-base font-bold font-mono text-indigo-700 dark:text-indigo-300 w-12 text-right">
                  n = {polygonN}
                </span>
              </div>
            </div>

            {/* Számítási eredménykártyák */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-2xs text-slate-500 block mb-0.5">Belső Szögek Összege</span>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono">{sumAngles}°</p>
                <span className="text-2xs text-slate-400">({polygonN} − 2) · 180°</span>
              </div>

              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-2xs text-slate-500 block mb-0.5">Egy Belső Szög (Szabályos)</span>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">{regularAngle.toFixed(1)}°</p>
                <span className="text-2xs text-slate-400">{sumAngles}° / {polygonN}</span>
              </div>

              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-2xs text-slate-500 block mb-0.5">Egy Külső Szög</span>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono">{exteriorAngle.toFixed(1)}°</p>
                <span className="text-2xs text-slate-400">360° / {polygonN}</span>
              </div>

              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-2xs text-slate-500 block mb-0.5">Összes Átló Száma</span>
                <p className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono">{totalDiagonals} db</p>
                <span className="text-2xs text-slate-400">1 csúcsból {diagonalsFromOneVertex} db</span>
              </div>
            </div>

            {/* Sokszög SVG */}
            <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
              <svg viewBox="0 0 200 160" className="w-48 h-40 select-none">
                {(() => {
                  const cx = 100, cy = 80, r = 60;
                  const points: [number, number][] = [];
                  for (let i = 0; i < polygonN; i++) {
                    const angle = (i * 2 * Math.PI) / polygonN - Math.PI / 2;
                    points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
                  }
                  const polyString = points.map(p => p.join(',')).join(' ');

                  // Átlók kirajzolása halványan
                  const lines = [];
                  for (let i = 0; i < polygonN; i++) {
                    for (let j = i + 2; j < polygonN; j++) {
                      if (i === 0 && j === polygonN - 1) continue; // oldal, nem átló
                      lines.push(
                        <line
                          key={`${i}-${j}`}
                          x1={points[i][0]}
                          y1={points[i][1]}
                          x2={points[j][0]}
                          y2={points[j][1]}
                          stroke="#cbd5e1"
                          strokeWidth="0.8"
                        />
                      );
                    }
                  }

                  return (
                    <g>
                      {lines}
                      <polygon points={polyString} fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      {points.map(([px, py], idx) => (
                        <circle key={idx} cx={px} cy={py} r="3" fill="#312e81" />
                      ))}
                    </g>
                  );
                })()}
              </svg>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                Szabályos {polygonN}-szög és átlóhálózata
              </span>
            </div>
          </div>
        )}

        {/* 2. Fül: Transzformáció Kompozíció Elemző */}
        {activeTab === 'composition' && (
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Válassz két egymást követő transzformációt:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 block mb-2">1. Transzformáció (T₁)</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="comp1"
                      checked={compT1 === 'refl1'}
                      onChange={() => setCompT1('refl1')}
                      className="accent-rose-600"
                    />
                    <span>Tengelyes tükrözés t₁ tengelyre</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="comp1"
                      checked={compT1 === 'central1'}
                      onChange={() => setCompT1('central1')}
                      className="accent-rose-600"
                    />
                    <span>Középpontos tükrözés O₁ pontra</span>
                  </label>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 block mb-2">2. Transzformáció (T₂)</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="comp2"
                      checked={compT2 === 'refl-parallel'}
                      onChange={() => setCompT2('refl-parallel')}
                      className="accent-rose-600"
                    />
                    <span>Párhuzamos tengelyre (t₂ || t₁) tükrözés</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="comp2"
                      checked={compT2 === 'refl-intersect'}
                      onChange={() => setCompT2('refl-intersect')}
                      className="accent-rose-600"
                    />
                    <span>Metsző tengelyre (t₂ metsz t₁) tükrözés</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="comp2"
                      checked={compT2 === 'central2'}
                      onChange={() => setCompT2('central2')}
                      className="accent-rose-600"
                    />
                    <span>Másik pontra (O₂) középpontos tükrözés</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Eredmény kártya */}
            <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-xl border border-rose-200 dark:border-rose-800">
              <span className="text-2xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider block mb-1">
                Eredő Kompozíció (T₂ ∘ T₁):
              </span>
              <p className="text-base font-bold text-rose-950 dark:text-rose-100">
                {compT1 === 'refl1' && compT2 === 'refl-parallel' && 'Párhuzamos Eltolás (v = 2d vektorral a tengelyekre merőlegesen)'}
                {compT1 === 'refl1' && compT2 === 'refl-intersect' && 'Forgatás a metszéspont körül 2α szöggel'}
                {compT1 === 'refl1' && compT2 === 'central2' && 'Csúsztatva Tükrözés egy párhuzamos tengelyre'}
                {compT1 === 'central1' && compT2 === 'central2' && 'Párhuzamos Eltolás a két pont közötti 2 · O₁O₂ vektorral'}
                {compT1 === 'central1' && compT2.startsWith('refl') && 'Csúsztatva Tükrözés'}
              </p>
              <p className="text-xs text-rose-800 dark:text-rose-300 mt-1">
                {compT1 === 'refl1' && compT2 === 'refl-parallel' && 'Két irányváltó művelet kompozíciója mindig iránytartó eltolást eredményez!'}
                {compT1 === 'refl1' && compT2 === 'refl-intersect' && 'Két metsző egyenesre való tükrözés mindig forgatást ad az α szög kétszeresével!'}
                {compT1 === 'central1' && compT2 === 'central2' && 'Két középpontos tükrözés egymásutánja mindig tiszta eltolás!'}
              </p>
            </div>
          </div>
        )}
      </TheorySection>
    </TheoryTemplate>
  );
};

