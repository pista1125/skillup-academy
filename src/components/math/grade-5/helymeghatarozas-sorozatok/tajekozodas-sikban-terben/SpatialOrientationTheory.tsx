import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox
} from '../TheoryTemplate';
import {
  Globe,
  Compass,
  Box,
  Layers,
  MapPin,
  Move3d,
  Navigation,
  Eye,
  Mountain,
  Plane,
  Sparkles,
  Maximize2,
  CheckCircle2
} from 'lucide-react';

export interface SpatialOrientationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const SpatialOrientationTheory: React.FC<SpatialOrientationTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- 1. Interaktív 3D Kocka/Pont Pozicionáló Állapot ---
  const [spatialCoord, setSpatialCoord] = useState<{ x: number; y: number; z: number }>({ x: 2, y: 1, z: 3 });

  // --- 2. Interaktív Fokhálózat Választó Állapot ---
  const [selectedCity, setSelectedCity] = useState<string>('Budapest');

  const CITIES_DATA: Record<string, { lat: string; lon: string; alt: string; desc: string; cx: number; cy: number }> = {
    'Budapest': {
      lat: 'É. sz. 47,5°',
      lon: 'K. h. 19,0°',
      alt: '102 m (Gellért-hegy: 235 m)',
      desc: 'Magyarország fővárosa a mérsékelt övben, a Duna két partján.',
      cx: 195,
      cy: 68
    },
    'London (Greenwich)': {
      lat: 'É. sz. 51,5°',
      lon: '0,0° (Kezdő délkör)',
      alt: '11 m',
      desc: 'A királyi csillagvizsgáló, ahonnan a világ a hosszúsági fokokat és az időzónákat méri.',
      cx: 175,
      cy: 62
    },
    'Kairó (Egyiptom)': {
      lat: 'É. sz. 30,0°',
      lon: 'K. h. 31,2°',
      alt: '23 m',
      desc: 'Észak-Afrikai nagyváros a Nílus deltájánál, közel a piramisokhoz.',
      cx: 208,
      cy: 98
    },
    'Quito (Ecuador)': {
      lat: 'D. sz. 0,2° (Egyenlítő)',
      lon: 'Ny. h. 78,5°',
      alt: '2850 m (magas hegyvidék)',
      desc: 'Közvetlenül az Egyenlítő mellett fekvő andoki főváros.',
      cx: 95,
      cy: 148
    },
    'Sydney (Ausztrália)': {
      lat: 'D. sz. 33,9°',
      lon: 'K. h. 151,2°',
      alt: '19 m',
      desc: 'A déli félgömb nagyvárosa a Csendes-óceán partján.',
      cx: 310,
      cy: 205
    }
  };

  const activeCity = CITIES_DATA[selectedCity] || CITIES_DATA['Budapest'];

  return (
    <TheoryTemplate
      documentId="grade-5-spatial-orientation-theory"
      pdfFilename="5_osztaly_V_5_tajekozodas_sikban_terben.pdf"
      title="Tájékozódás síkban és térben (kiegészítő tananyag)"
      subtitle="A dimenziók világa (1D, 2D, 3D), a térbeli koordináták (szélesség, hosszúság, magasság), a földgömb földrajzi fokhálózata és a 3D kockamodellek"
      themeColor="teal"
      emoji="🌐"
      badge="5. OSZTÁLY • V. HELYMEGHATÁROZÁS, SOROZATOK • 5. KIEGÉSZÍTŐ TANANYAG"
      quickRule={{
        label: 'A dimenziók és koordináták alapszabálya',
        formula: '\\text{1D (vonal): } (x) \\quad | \\quad \\text{2D (sík): } (x; y) \\quad | \\quad \\text{3D (tér): } (x; y; z)'
      }}
      practiceTitle="Készen állsz a térbeli tájékozódás feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben és az interaktív térbeli játékokban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A DIMENZIÓK VILÁGA */}
      <TheorySection
        id="dimenziok-vilaga"
        title="1. Dimenziók a geometriában és a mindennapi életben"
        subtitle="Hány koordinátára van szükség egy pont helyzetének egyértelmű megadásához?"
        badge="ALAPFOGALMAK"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1 Dimenzió (1D): A vonal"
            badge="1 ADAT SZÜKSÉGES"
            color="indigo"
            icon={<Move3d className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egy egyenesen vagy vonalon való elhelyezkedéshez <strong>egyetlen koordináta ($x$)</strong> elegendő.
            </p>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-xs text-indigo-950 dark:text-indigo-200 space-y-1">
              <div className="font-bold">Példák a valóságban:</div>
              <div>&bull; Hőmérő higanyszála (-5 °C)</div>
              <div>&bull; Kilométerkő az autópályán (M7-es 45. km)</div>
              <div>&bull; Vonalzó számozott beosztása</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2 Dimenzió (2D): A sík"
            badge="2 ADAT SZÜKSÉGES"
            color="purple"
            icon={<Layers className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egy sík felületen a pont helyzetét <strong>két koordináta $(x; y)$</strong> határozza meg (szélesség és magasság).
            </p>
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-xs text-purple-950 dark:text-purple-200 space-y-1">
              <div className="font-bold">Példák a valóságban:</div>
              <div>&bull; Papírlapra rajzolt koordináta-rendszer</div>
              <div>&bull; Sakktábla mezői (e4)</div>
              <div>&bull; Okostelefon vagy számítógép képernyője</div>
              <div>&bull; Térképen való keresés</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3 Dimenzió (3D): A tér"
            badge="3 ADAT SZÜKSÉGES"
            color="teal"
            icon={<Box className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A minket körülvevő valóságban a helymeghatározáshoz <strong>három koordináta $(x; y; z)$</strong> szükséges!
            </p>
            <div className="p-2.5 bg-teal-50 dark:bg-teal-950/40 rounded-lg text-xs text-teal-950 dark:text-teal-200 space-y-1">
              <div className="font-bold">A 3 térbeli irány:</div>
              <div>&bull; <strong>Szélesség (x)</strong>: jobbra-balra</div>
              <div>&bull; <strong>Hosszúság / mélység (y)</strong>: előre-hátra</div>
              <div>&bull; <strong>Magasság (z)</strong>: fel-le</div>
            </div>
          </TheoryCard>
        </div>

        {/* 1. INTERAKTÍV ESZKÖZ: 3D TÉRBELI KOORDINÁTA SZIMULÁTOR */}
        <div className="mt-6 p-4 md:p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/30 rounded-2xl border-2 border-teal-300 dark:border-teal-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-teal-600 text-white">
                  Interaktív 3D Modell
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Térbeli Pont és Kockapozicionáló (x; y; z)
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Állítsd be a 3 tengely értékét, és figyeld meg az izometrikus térbeli elhelyezkedést!
              </p>
            </div>

            <div className="text-lg font-black text-teal-800 dark:text-teal-200 bg-white dark:bg-slate-800 px-3 py-1 rounded-xl border border-teal-200 dark:border-teal-700 shadow-sm">
              P(x: {spatialCoord.x}; y: {spatialCoord.y}; z: {spatialCoord.z})
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 3D Izometrikus SVG nézet */}
            <div className="lg:col-span-7 flex justify-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-teal-200 dark:border-teal-800/60 shadow-inner">
              <svg viewBox="-140 -120 280 240" className="w-full max-w-[340px] h-64 select-none">
                {/* 3D Tengelyek: Origó középen alul (0, 40) */}
                {/* Z-tengely (magasság): függőlegesen fel */}
                <line x1="0" y1="40" x2="0" y2="-90" stroke="#0d9488" strokeWidth="2.5" />
                <polygon points="0,-90 -4,-82 4,-82" fill="#0d9488" />
                <text x="8" y="-85" className="text-[10px] font-bold fill-teal-700">z (magasság)</text>

                {/* X-tengely (szélesség): jobbra-le 30 fokban */}
                <line x1="0" y1="40" x2="110" y2="85" stroke="#2563eb" strokeWidth="2.5" />
                <polygon points="110,85 100,80 103,88" fill="#2563eb" />
                <text x="114" y="90" className="text-[10px] font-bold fill-blue-700">x (szélesség)</text>

                {/* Y-tengely (mélység): balra-le 30 fokban */}
                <line x1="0" y1="40" x2="-110" y2="85" stroke="#7c3aed" strokeWidth="2.5" />
                <polygon points="-110,85 -103,88 -100,80" fill="#7c3aed" />
                <text x="-120" y="98" className="text-[10px] font-bold fill-purple-700">y (mélység)</text>

                {/* Origó pont */}
                <circle cx="0" cy="40" r="4" fill="#f59e0b" />
                <text x="-14" y="36" className="text-[9px] font-black fill-amber-600">O(0;0;0)</text>

                {/* Számított koordináta vetületek */}
                {/* 1 egység X = +25px x, +10.5px y */}
                {/* 1 egység Y = -25px x, +10.5px y */}
                {/* 1 egység Z = 0px x, -28px y */}
                {(() => {
                  const px = spatialCoord.x * 25 - spatialCoord.y * 25;
                  const py = 40 + spatialCoord.x * 10.5 + spatialCoord.y * 10.5 - spatialCoord.z * 28;
                  const groundX = spatialCoord.x * 25 - spatialCoord.y * 25;
                  const groundY = 40 + spatialCoord.x * 10.5 + spatialCoord.y * 10.5;

                  return (
                    <g>
                      {/* Alaprajzi síkbeli vetület a padlón */}
                      <line x1="0" y1="40" x2={spatialCoord.x * 25} y2={40 + spatialCoord.x * 10.5} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
                      <line x1={spatialCoord.x * 25} y1={40 + spatialCoord.x * 10.5} x2={groundX} y2={groundY} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx={groundX} cy={groundY} r="3" fill="#94a3b8" />
                      <text x={groundX + 6} y={groundY + 8} className="text-[8px] fill-slate-400">padlóvetület</text>

                      {/* Függőleges oszlop a padlótól a pontig */}
                      <line x1={groundX} y1={groundY} x2={px} y2={py} stroke="#0d9488" strokeWidth="2.5" strokeDasharray="4 2" />

                      {/* Magassági kis kocka a pontban */}
                      <circle cx={px} cy={py} r="6" fill="#0d9488" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                      <text x={px + 9} y={py - 6} className="text-[11px] font-black fill-teal-900 dark:fill-teal-200">
                        P({spatialCoord.x}; {spatialCoord.y}; {spatialCoord.z})
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Vezérlő csúszkák és gombok */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-teal-200 dark:border-teal-800 space-y-3 shadow-sm">
                <div>
                  <div className="flex justify-between text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">
                    <span>X tengely (szélesség):</span>
                    <span>{spatialCoord.x} egység</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={spatialCoord.x}
                    onChange={(e) => setSpatialCoord(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
                    <span>Y tengely (mélység):</span>
                    <span>{spatialCoord.y} egység</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={spatialCoord.y}
                    onChange={(e) => setSpatialCoord(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
                    <span>Z tengely (magasság / emelet):</span>
                    <span>{spatialCoord.z} egység</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={spatialCoord.z}
                    onChange={(e) => setSpatialCoord(prev => ({ ...prev, z: parseInt(e.target.value) }))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-semibold text-teal-800 dark:text-teal-300">Példa:</div>
                  Egy épületben a <strong>{spatialCoord.x}. szoba</strong> a <strong>{spatialCoord.y}. folyosón</strong>, a <strong>{spatialCoord.z}. emeleten</strong> található!
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A FÖLDRAJZI FOKHÁLÓZAT */}
      <TheorySection
        id="foldrajzi-fokhalozat"
        title="2. A Földrajzi Fokhálózat: Gömbkoordináták a Földön"
        subtitle="Hogyan határozzák meg a GPS vevők és a térképészek a Föld bármely pontját?"
        badge="FÖLDRAJZ ÉS MATEMATIKA"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Szélességi körök (Észak és Dél)"
            badge="PARALLELEK"
            color="teal"
            icon={<Globe className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A Föld forgástengelyére merőleges körök, amelyek egymással párhuzamosak.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>
                &bull; <strong>Egyenlítő:</strong> A leghosszabb szélességi kör, a Földet Északi és Déli félgömbre osztja. Értéke: <strong>0°</strong>.
              </li>
              <li>
                &bull; <strong>Északi szélesség (É. sz. / N):</strong> Az Egyenlítőtől északra 0°-tól 90°-ig (Északi-sark).
              </li>
              <li>
                &bull; <strong>Déli szélesség (D. sz. / S):</strong> Az Egyenlítőtől délre 0°-tól 90°-ig (Déli-sark).
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Hosszúsági körök (Kelet és Nyugat)"
            badge="MERIDIÁNOK"
            color="blue"
            icon={<Compass className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A két sarkpontot (Északi és Déli sark) összekötő félkörök, úgynevezett délkörök.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>
                &bull; <strong>Kezdő délkör:</strong> A londoni <strong>Greenwich</strong> csillagvizsgálón áthaladó hosszúsági kör: <strong>0°</strong>.
              </li>
              <li>
                &bull; <strong>Keleti hosszúság (K. h. / E):</strong> A kezdő délkörtől keletre 0°-tól 180°-ig (pl. Magyarország).
              </li>
              <li>
                &bull; <strong>Nyugati hosszúság (Ny. h. / W):</strong> A kezdő délkörtől nyugatra 0°-tól 180°-ig (pl. Amerika).
              </li>
            </ul>
          </TheoryCard>
        </div>

        {/* 2. INTERAKTÍV ESZKÖZ: FÖLDRAJZI FOKHÁLÓZAT FELFEDEZŐ */}
        <div className="mt-6 p-4 md:p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-teal-600 text-white">
                  Földrajzi Pozicionáló
                </span>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">
                  Világvárosok Koordinátái a Földgömbön
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Kattints egy városra a szélességi és hosszúsági fokok, valamint a tengerszint feletti magasság megtekintéséhez!
              </p>
            </div>

            {/* Város választó gombok */}
            <div className="flex gap-1.5 flex-wrap">
              {Object.keys(CITIES_DATA).map((cityName) => (
                <button
                  key={cityName}
                  onClick={() => setSelectedCity(cityName)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedCity === cityName
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cityName.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Térkép vázlat */}
            <div className="lg:col-span-7 flex justify-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
              <svg viewBox="0 0 360 220" className="w-full max-w-[360px] h-56 select-none bg-sky-50 dark:bg-slate-950 rounded-lg">
                {/* Rácsháló: Szélességi és hosszúsági körök */}
                {[40, 80, 110, 140, 180].map((y) => (
                  <line key={`lat-${y}`} x1="0" y1={y} x2="360" y2={y} stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                ))}
                {[60, 120, 175, 240, 300].map((x) => (
                  <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="220" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                ))}

                {/* Egyenlítő (y = 148) */}
                <line x1="0" y1="148" x2="360" y2="148" stroke="#ef4444" strokeWidth="1.5" />
                <text x="355" y="144" textAnchor="end" className="text-[7px] font-bold fill-rose-600">Egyenlítő (0°)</text>

                {/* Kezdő délkör Greenwich (x = 175) */}
                <line x1="175" y1="0" x2="175" y2="220" stroke="#2563eb" strokeWidth="1.5" />
                <text x="178" y="10" className="text-[7px] font-bold fill-blue-600">Kezdő délkör (0°)</text>

                {/* Kontinensek egyszerű stilizált körvonalai */}
                {/* Európa/Ázsia */}
                <ellipse cx="230" cy="80" rx="60" ry="35" className="fill-[#e2e8f0] dark:fill-[#334155]" opacity="0.6" />
                {/* Afrika */}
                <ellipse cx="190" cy="140" rx="30" ry="40" className="fill-[#e2e8f0] dark:fill-[#334155]" opacity="0.6" />
                {/* Amerika */}
                <ellipse cx="90" cy="90" rx="35" ry="30" className="fill-[#e2e8f0] dark:fill-[#334155]" opacity="0.6" />
                <ellipse cx="110" cy="165" rx="25" ry="35" className="fill-[#e2e8f0] dark:fill-[#334155]" opacity="0.6" />
                {/* Ausztrália */}
                <ellipse cx="300" cy="180" rx="25" ry="18" className="fill-[#e2e8f0] dark:fill-[#334155]" opacity="0.6" />

                {/* Város jelölő pont */}
                <circle
                  cx={activeCity.cx}
                  cy={activeCity.cy}
                  r="6"
                  fill="#0d9488"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="animate-ping"
                />
                <circle
                  cx={activeCity.cx}
                  cy={activeCity.cy}
                  r="5"
                  fill="#0d9488"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={activeCity.cx + 8}
                  y={activeCity.cy - 6}
                  className="text-[9px] font-black fill-slate-900 dark:fill-white"
                >
                  {selectedCity}
                </text>
              </svg>
            </div>

            {/* Részletes Város Információs Kártya */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-teal-200 dark:border-teal-800 shadow-sm space-y-2">
                <div className="text-base font-bold text-teal-800 dark:text-teal-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  {selectedCity}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {activeCity.desc}
                </div>

                <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-500">Szélességi fok:</span>
                    <span className="font-bold text-teal-700 dark:text-teal-300">{activeCity.lat}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-500">Hosszúsági fok:</span>
                    <span className="font-bold text-blue-700 dark:text-blue-300">{activeCity.lon}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-semibold text-slate-500">Tengerszint feletti magasság:</span>
                    <span className="font-bold text-amber-700 dark:text-amber-300">{activeCity.alt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: TÉRBELI KOCKAÉPÍTMÉNYEK ÉS NÉZETEK */}
      <TheorySection
        id="kockaepitmenyek-nezetei"
        title="3. Térbeli Kockaépítmények és a Három Nézet"
        subtitle="Hogyan írhatunk le egy térbeli testet síkbeli rajzokkal?"
        badge="TÉRLÁTÁS"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Felülnézet (alaprajz)"
            badge="FENTRŐL"
            color="indigo"
            icon={<Eye className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Azt mutatja, hogy melyik rácsnégyzeten van kocka, és gyakran beírjuk, hogy hány kocka van egymásra pakolva (emeletszám).
            </p>
            <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
              Szélesség (x) és mélység (y).
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Elölnézet"
            badge="SZEMBŐL"
            color="teal"
            icon={<Maximize2 className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Közvetlenül szemből nézve látjuk az oszlopok maximális magasságát.
            </p>
            <div className="text-[11px] font-semibold text-teal-700 dark:text-teal-300">
              Szélesség (x) és magasság (z).
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Oldalnézet"
            badge="OLDALRÓL"
            color="amber"
            icon={<Move3d className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Balról vagy jobbról nézve látjuk az építmény mélységét és emeleteit.
            </p>
            <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">
              Mélység (y) és magasság (z).
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
