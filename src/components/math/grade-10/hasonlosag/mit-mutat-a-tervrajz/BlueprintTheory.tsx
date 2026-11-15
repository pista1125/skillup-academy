import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  RoofTrussGyulaSvg,
  PoolGeometrySvg,
  ScaleBarMapSvg,
  EngineeringDimensioningSvg,
  ScaleReductionEnlargementSvg
} from './BlueprintFigures';

export const BlueprintTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Laboratory 1 state: Scale Selector & Converter
  const [selectedScaleIndex, setSelectedScaleIndex] = useState<number>(2); // default 1:100
  const [drawnLengthCm, setDrawnLengthCm] = useState<number>(5);
  const [drawnAreaCm2, setDrawnAreaCm2] = useState<number>(12);

  // Laboratory 2 state: Lovarda Simulator tab
  const [activeLovardaTab, setActiveLovardaTab] = useState<'truss' | 'pool' | 'net'>('pool');
  const [shallowDepth, setShallowDepth] = useState<number>(1.2);
  const [deepDepth, setDeepDepth] = useState<number>(1.6);

  const scales = [
    { label: '1 : 20 (Részletrajz)', N: 20, isEnlargement: false, unit: 'm', factor: 0.2 },
    { label: '1 : 50 (Kivitelezési terv)', N: 50, isEnlargement: false, unit: 'm', factor: 0.5 },
    { label: '1 : 100 (Építészeti terv)', N: 100, isEnlargement: false, unit: 'm', factor: 1.0 },
    { label: '1 : 200 (Helyszínrajz)', N: 200, isEnlargement: false, unit: 'm', factor: 2.0 },
    { label: '1 : 25 000 (Turistatérkép)', N: 25000, isEnlargement: false, unit: 'm', factor: 250 },
    { label: '1 : 100 000 (Autóstérkép)', N: 100000, isEnlargement: false, unit: 'km', factor: 1.0 },
    { label: '5 : 1 (Mikro nagyítás)', N: 0.2, isEnlargement: true, unit: 'mm', factor: 2.0 }
  ];

  const currentScale = scales[selectedScaleIndex];

  // Real world calculations
  const realLengthMeters = currentScale.isEnlargement
    ? (drawnLengthCm * 10) / 5 // in mm
    : (drawnLengthCm * currentScale.N) / 100; // in m
  const realAreaM2 = currentScale.isEnlargement
    ? 0
    : (drawnAreaCm2 * Math.pow(currentScale.N, 2)) / 10000;

  // Pool calculations
  const poolLength = 20;
  const poolWidth = 13;
  const avgDepth = (shallowDepth + deepDepth) / 2;
  const poolVolumeM3 = Math.round(poolLength * poolWidth * avgDepth * 10) / 10;
  const bottomSlopeLength = Math.round(Math.sqrt(Math.pow(poolLength, 2) + Math.pow(deepDepth - shallowDepth, 2)) * 1000) / 1000;

  return (
    <TheoryTemplate
      topicId="g10-hasonlosag"
      subtopicId="mit-mutat-a-tervrajz"
      title="5. Ráadás – Mit mutat a tervrajz?"
      subtitle="Műszaki tervrajzok, méretarányok (1 : N), kótázási szabályok, a Gyulai Várfürdő Lovarda épületének fa tartóváza és az úszómedence egyenes fektetett hasábja."
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="blue"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — MŰSZAKI TERVRAJZOK ÉS MÉRETARÁNY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80">
              <span className="text-xs font-black text-blue-900 dark:text-blue-200 block mb-1">
                ✓ Méretarány (M = 1 : N) és kótázási alaptörvény:
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs font-black text-blue-900 dark:text-blue-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-blue-300">
                  d_valós = N · d_rajz
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-blue-300">
                  T_valós = N² · T_rajz
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Kótázási szabály:</strong> A tervrajzra írt szám (kóta) mindig a <em>valóságos méretet</em> jelöli <strong>milliméterben</strong>!
              </li>
              <li>
                <strong>Gyulai tartóváz (181°-os csapda):</strong> A kerekített szögek összege $181^\circ$, de a pontos szögek összege szigorúan $180^\circ$.
              </li>
              <li>
                <strong>Gyulai úszómedence:</strong> Egyenes fektetett trapéz alapú hasáb ($V = T_a \cdot m = 364$ m³).
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: A MÉRETARÁNY FOGALMA ÉS FAJTÁI */}
      <TheorySection
        title="1. A méretarány fogalma, típusai és szabványos jelölése"
        lead="A mérnöki tervezésben, építészetben és térképészetben a tárgyakat ritkán tudjuk 1 : 1 méretben megrajzolni. A méretarány határozza meg a papíron látható és a valós méretek matematikai kapcsolatát."
      >
        <TheoryCard title="A méretarány definíciója és kategóriái">
          <p className="mb-3 text-slate-700 leading-relaxed">
            A <strong>méretarány</strong> (jele: <span className="font-mono font-bold">M</span>) az a viszonyszám, amely
            megmutatja, hogy a rajzon mért távolság hányszorosa a valóságos távolságnak:
          </p>
          <div className="bg-slate-50 border-l-4 border-indigo-500 p-4 rounded-r-lg my-3 space-y-2 text-sm text-slate-800 font-mono">
            <p>M = Rajzbeli hosszúság : Valóságos hosszúság</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-xs font-bold text-blue-700 uppercase">1. Kicsinyítés (1 : N)</span>
              <p className="text-xs text-slate-700 mt-1">
                A rajz kisebb a valóságnál. <strong>1 cm a rajzon = N cm a valóságban.</strong> Épületek, hidak,
                térképek ábrázolására. (Pl. 1 : 50, 1 : 100, 1 : 25 000).
              </p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="text-xs font-bold text-emerald-700 uppercase">2. Természetes nagyság (1 : 1)</span>
              <p className="text-xs text-slate-700 mt-1">
                A rajz és a valóság pontosan egybevágó. Kéziszerszámok, könyvek, telefonok gyártási rajzai.
              </p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="text-xs font-bold text-purple-700 uppercase">3. Nagyítás (N : 1)</span>
              <p className="text-xs text-slate-700 mt-1">
                A rajz nagyobb a valóságnál. <strong>N cm a rajzon = 1 cm a valóságban.</strong> Óraalkatrészek,
                mikroelektronika. (Pl. 2 : 1, 5 : 1, 20 : 1).
              </p>
            </div>
          </div>
        </TheoryCard>

        <ScaleReductionEnlargementSvg />
      </TheorySection>

      {/* 2. SECTION: MŰSZAKI RAJZOK, KÓTÁZÁS ÉS A GYULAI TARTÓVÁZ */}
      <TheorySection
        title="2. Műszaki kótázás és a Gyulai Várfürdő fa tartóváza"
        lead="Miért állnak a tervrajzokon mértékegység nélküli számok, miért adódik a szögek összegeként 181°, és hogyan rögzíti a mérnök az épületszerkezet valós méreteit?"
      >
        <RoofTrussGyulaSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A mérnöki kótázás alapszabálya: Milliméter" color="blue">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              A műszaki életben a rajzra írt szám a <strong>kóta</strong>. A legfontosabb mérnöki szabály:{' '}
              <span className="font-semibold text-slate-900">
                a méretek mindig milliméterben (mm) értendők, és a mértékegységet nem írjuk ki!
              </span>
            </p>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              <li><span className="font-mono font-bold">13 036</span> = 13 036 mm = <strong>13,036 méter</strong></li>
              <li><span className="font-mono font-bold">7113</span> = 7113 mm = <strong>7,113 méter</strong></li>
              <li><span className="font-mono font-bold">6523</span> = 6523 mm = <strong>6,523 méter</strong></li>
              <li><span className="font-mono font-bold">7664</span> = 7664 mm = <strong>7,664 méter</strong></li>
            </ul>
          </TheoryCard>

          <TheoryCard title="A 181°-os belső szögek rejtélye" color="amber">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              A tartóváz bal oldali nagy háromszögében a tervrajzon a következő szögek szerepelnek:{' '}
              <span className="font-mono font-bold">24°, 24°, 133°</span>. Ezek összege:{' '}
              <span className="font-mono font-bold text-amber-900">24° + 24° + 133° = 181°</span>!
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>A magyarázat:</strong> A fa tartószerkezet pontos gyártási méreteit a milliméteres hosszak
              határozzák meg. A szögeket a tervrajzon a könnyebb olvashatóság kedvéért{' '}
              <strong>egész fokra kerekítették</strong>. A valóságban a szögek törtértékek voltak (pl. 24,35° és 132,7°),
              és a kerekítési hibák összegződése miatt látunk 181°-ot a papíron.
            </p>
          </TheoryCard>
        </div>

        <EngineeringDimensioningSvg />

        <TheoryTrapBox
          title="Tévhit: A vonalzóval lemért távolság felülírja a rajzra írt kótaszámot?"
          trap="Azt hinni, hogy ha a papíron a vonalzóval más méretet mérünk, mint a kótaszám, akkor a kótaszám hibás."
          correction="Soha! A mérnöki „kótabölcsesség” aranyszabálya: a tervrajzra nyomtatott kótaszám a szent és sérthetetlen gyártási méret. A papír a nyomtatás, szkennelés vagy páratartalom hatására megnyúlhat, a kótaszám azonban a valóságos tárgy egzakt méretét rögzíti."
        />
      </TheorySection>

      {/* 3. SECTION: A LOVARDA ÚSZÓMEDENCE GEOMETRIÁJA */}
      <TheorySection
        title="3. A Lovarda úszómedence geometriája"
        lead="Feszített víztükör, egyenletes mélyülés 1,2 m-től 1,6 m-ig: miért alkot a víztömeg egyenes hasábot, és mekkora a medence valódi térfogata?"
      >
        <PoolGeometrySvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Bence vs. Jocó: Hasáb-e a medence víztömege?" color="indigo">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              <strong>A szakmai vita:</strong> Bence kijelenti, hogy a víztömeg egyenes hasáb. Jocó szerint nem, mert
              a medence fenéklapja nem párhuzamos a víztükörrel.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>A matematikai igazság:</strong> Bencének van igaza! Egy hasáb alaplapjai nem feltétlenül a vízszintes
              „alsó és felső” lapok. A medence két hosszanti oldalfala egymással párhuzamos{' '}
              <strong>derékszögű trapéz</strong>! Ez a két trapéz alkotja a hasáb alaplapjait, a hasáb magassága pedig a
              medence 13 méteres szélessége. Tehát ez egy <em>fektetett egyenes trapézalapú hasáb</em>.
            </p>
          </TheoryCard>

          <TheoryCard title="Víztérfogat és fenéklemez pontos kiszámítása" color="emerald">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              A trapéz alakú oldallap területe:
            </p>
            <div className="bg-emerald-50 p-2 rounded text-xs font-mono text-emerald-900 mb-2">
              T_trapéz = ((1,2 + 1,6) / 2) · 20 m = 1,4 · 20 = 28 m²
            </div>
            <p className="text-xs text-slate-700">
              A teljes víztérfogat (a 13 m-es magassággal szorozva):{' '}
              <span className="font-mono font-bold text-emerald-800">V = 28 m² · 13 m = 364 m³</span> = 364 000 liter!
            </p>
            <p className="text-xs text-slate-700 mt-2">
              A lejtős fenéklemez hossza a Pitagorasz-tétellel:{' '}
              <span className="font-mono">L = √(20² + 0,4²) = √400,16 ≈ 20,004 méter</span>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SECTION: I. LABORATÓRIUM - INTERAKTÍV TERVRAJZI KALKULÁTOR */}
      <TheorySection
        title="4. I. Laboratórium: Tervrajzi Méretarány & Terület Kalkulátor"
        lead="Válassz mérnöki méretarányt, állítsd a rajzon mért centimétereket, és nézd meg az azonnali valóságos hossz- és területátváltást dinamikus vonalas mértékkel!"
      >
        <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          {/* Scale selection pills */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Mérnöki méretarány kiválasztása:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {scales.map((sc, idx) => (
                <button
                  key={sc.label}
                  type="button"
                  onClick={() => setSelectedScaleIndex(idx)}
                  className={`p-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                    selectedScaleIndex === idx
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {sc.label.split('(')[0]}
                  <span className="block text-[10px] opacity-80">{sc.label.split('(')[1]?.replace(')', '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders for length and area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase">Rajzon mért távolság:</label>
                <span className="text-sm font-mono font-bold text-blue-600">{drawnLengthCm} cm</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={drawnLengthCm}
                onChange={(e) => setDrawnLengthCm(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-[11px] text-slate-500">1 cm-től 25 cm-ig a papíron</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase">Rajzon mért terület:</label>
                <span className="text-sm font-mono font-bold text-emerald-600">{drawnAreaCm2} cm²</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={drawnAreaCm2}
                onChange={(e) => setDrawnAreaCm2(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-[11px] text-slate-500">1 cm²-től 50 cm²-ig a rajzon</span>
            </div>
          </div>

          {/* Calculated Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Valóságos Távolság</span>
              <p className="text-2xl font-mono font-bold text-blue-900 my-1">
                {currentScale.isEnlargement
                  ? `${realLengthMeters} mm`
                  : realLengthMeters >= 1000
                  ? `${Math.round((realLengthMeters / 1000) * 100) / 100} km`
                  : `${Math.round(realLengthMeters * 10) / 10} m`}
              </p>
              <p className="text-xs text-blue-700 font-medium">
                Képlet: {drawnLengthCm} cm × {currentScale.N}
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Valóságos Terület</span>
              <p className="text-2xl font-mono font-bold text-emerald-900 my-1">
                {currentScale.isEnlargement
                  ? 'Nagyításnál mikroszkopikus'
                  : realAreaM2 >= 10000
                  ? `${Math.round((realAreaM2 / 10000) * 100) / 100} ha (${Math.round(realAreaM2)} m²)`
                  : `${Math.round(realAreaM2 * 10) / 10} m²`}
              </p>
              <p className="text-xs text-emerald-700 font-medium">
                Képlet: {drawnAreaCm2} cm² × {currentScale.N}²
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SECTION: II. LABORATÓRIUM - GYULAI LOVARDA SZIMULÁTOR */}
      <TheorySection
        title="5. II. Laboratórium: Lovarda Építészeti és Vízgépészeti Szimuláció"
        lead="Mérd fel a Gyulai Várfürdő Lovarda épületének tartószerkezetét és medencéjét az interaktív paraméterek változtatásával!"
      >
        {/* Subtabs */}
        <div className="flex border-b border-slate-200 mb-4">
          <button
            type="button"
            onClick={() => setActiveLovardaTab('pool')}
            className={`py-2 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeLovardaTab === 'pool'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            🏊 Úszómedence Hasáb & Térfogat
          </button>
          <button
            type="button"
            onClick={() => setActiveLovardaTab('truss')}
            className={`py-2 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeLovardaTab === 'truss'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            🏛️ Tartóváz Szögek & Kerekítés
          </button>
          <button
            type="button"
            onClick={() => setActiveLovardaTab('net')}
            className={`py-2 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeLovardaTab === 'net'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            📐 1 : 200 Kiterített Medenceháló
          </button>
        </div>

        {/* Tab 1: Pool Volume Simulator */}
        {activeLovardaTab === 'pool' && (
          <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Medence mélységprofiljának szimulációja (Hossz = 20 m, Szélesség = 13 m)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Sekély végfal mélysége:</span>
                  <span className="font-mono font-bold text-blue-600">{shallowDepth} m</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.5"
                  step="0.1"
                  value={shallowDepth}
                  onChange={(e) => setShallowDepth(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Mély végfal mélysége:</span>
                  <span className="font-mono font-bold text-indigo-600">{deepDepth} m</span>
                </div>
                <input
                  type="range"
                  min="1.4"
                  max="2.5"
                  step="0.1"
                  value={deepDepth}
                  onChange={(e) => setDeepDepth(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg text-slate-800 space-y-1.5 text-xs">
              <p>• <strong>Átlagos vízmélység:</strong> ({shallowDepth} + {deepDepth}) / 2 = <strong>{avgDepth} méter</strong></p>
              <p>• <strong>Trapéz oldalfal területe:</strong> {avgDepth} m × 20 m = <strong>{Math.round(avgDepth * 20 * 10) / 10} m²</strong></p>
              <p>• <strong>Teljes víztérfogat:</strong> {Math.round(avgDepth * 20 * 10) / 10} m² × 13 m = <strong className="text-blue-800 text-sm font-mono">{poolVolumeM3} m³ ({poolVolumeM3 * 1000} liter)</strong></p>
              <p>• <strong>Ferde fenéklemez hossza:</strong> √(20² + {(Math.round((deepDepth - shallowDepth) * 10) / 10)}²) = <strong>{bottomSlopeLength} m</strong></p>
            </div>
          </div>
        )}

        {/* Tab 2: Roof Truss */}
        {activeLovardaTab === 'truss' && (
          <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Gyulai Lovarda Tetőszerkezeti Táblázat</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700 border border-slate-200">
                <thead className="bg-slate-100 text-slate-900 font-bold">
                  <tr>
                    <th className="p-2 border">Gerenda / Elem</th>
                    <th className="p-2 border">Tervrajzra írt szám</th>
                    <th className="p-2 border">Tervrajzon mért méret (1:100)</th>
                    <th className="p-2 border">Valóságos hossz</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border font-medium">Szélső főgerenda</td>
                    <td className="p-2 border font-mono">13 036</td>
                    <td className="p-2 border font-mono">130,36 mm (13 cm)</td>
                    <td className="p-2 border font-bold text-blue-700">13,036 méter</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Belső andráskereszt rúd</td>
                    <td className="p-2 border font-mono">7113</td>
                    <td className="p-2 border font-mono">71,13 mm (7,1 cm)</td>
                    <td className="p-2 border font-bold text-blue-700">7,113 méter</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Alsó összekötő gerenda</td>
                    <td className="p-2 border font-mono">7664</td>
                    <td className="p-2 border font-mono">76,64 mm (7,7 cm)</td>
                    <td className="p-2 border font-bold text-blue-700">7,664 méter</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Függőleges rácsrúd</td>
                    <td className="p-2 border font-mono">6523</td>
                    <td className="p-2 border font-mono">65,23 mm (6,5 cm)</td>
                    <td className="p-2 border font-bold text-blue-700">6,523 méter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Net in 1:200 */}
        {activeLovardaTab === 'net' && (
          <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              A 4 oldallap megszerkesztése 1 : 200 kicsinyítésben
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-indigo-700 block mb-1">Két hosszanti oldallap (Derékszögű trapéz):</span>
                <p>• Hosszúság (magasság a rajzon): 20 m / 200 = <strong>10,0 cm</strong></p>
                <p>• Sekély alap él: 1,2 m / 200 = <strong>0,6 cm (6 mm)</strong></p>
                <p>• Mély alap él: 1,6 m / 200 = <strong>0,8 cm (8 mm)</strong></p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-emerald-700 block mb-1">Két végfal (Téglalap):</span>
                <p>• Szélesség mindkettőnél: 13 m / 200 = <strong>6,5 cm</strong></p>
                <p>• Sekély végfal magassága: 1,2 m / 200 = <strong>0,6 cm (6 mm)</strong></p>
                <p>• Mély végfal magassága: 1,6 m / 200 = <strong>0,8 cm (8 mm)</strong></p>
              </div>
            </div>
          </div>
        )}
      </TheorySection>
    </TheoryTemplate>
  );
};

