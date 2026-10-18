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
  Droplets,
  FlaskConical,
  RotateCcw,
  Scale
} from 'lucide-react';

export interface VolumeMeasureTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const VolumeMeasureTheory: React.FC<VolumeMeasureTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Térfogat és Űrmérték Laboratórium ---
  const [cubesA, setCubesA] = useState<number>(4);
  const [cubesB, setCubesB] = useState<number>(3);
  const [cubesC, setCubesC] = useState<number>(2);

  // Kiszámított térfogat egységkockákban
  const totalUnitCubes = cubesA * cubesB * cubesC;
  const singleLayerCubes = cubesA * cubesB;

  // Űrmérték szimulátor érték
  const [inputValue, setInputValue] = useState<number>(1.5);
  const [inputUnit, setInputUnit] = useState<'l' | 'dl' | 'cl' | 'ml' | 'hl' | 'dm3' | 'cm3' | 'm3'>('l');

  // Normalizálás literbe
  const getLiters = (): number => {
    switch (inputUnit) {
      case 'ml': return inputValue / 1000;
      case 'cl': return inputValue / 100;
      case 'dl': return inputValue / 10;
      case 'l': return inputValue;
      case 'hl': return inputValue * 100;
      case 'cm3': return inputValue / 1000; // 1 cm³ = 1 ml = 0.001 l
      case 'dm3': return inputValue;        // 1 dm³ = 1 l
      case 'm3': return inputValue * 1000;  // 1 m³ = 1000 l
      default: return inputValue;
    }
  };

  const liters = getLiters();

  return (
    <TheoryTemplate
      documentId="grade-5-volume-measure-theory"
      pdfFilename="5_osztaly_IV_7_terfogat_merese.pdf"
      title="A térfogat és űrmérték mérése"
      subtitle="A térbeli kiterjedés mérése egységkockákkal, a köbmértékek és űrmértékek rendszere, és a varázslatos kapcsolatok (1 dm³ = 1 liter, 1 cm³ = 1 ml)"
      themeColor="cyan"
      emoji="🧪"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 7. TANANYAG"
      quickRule={{
        label: 'A fejezet aranyszabálya',
        formula: '1\\text{ dm}^3 = 1\\text{ liter} \\quad | \\quad 1\\text{ cm}^3 = 1\\text{ ml} \\quad | \\quad 1\\text{ m}^3 = 1000\\text{ liter} = 10\\text{ hl}'
      }}
      practiceTitle="Készen állsz a térfogat és űrmértékek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A TÉRFOGAT FOGALMA */}
      <TheorySection
        id="fogalom"
        title="1. Mi a térfogat? Mennyi helyet foglal egy test?"
        subtitle="A testek háromdimenziós kiterjedése és az egységkockák világa"
        badge="ALAPFOGALOM"
      >
        <TheoryCard title="A térbeli kiterjedés és mérése">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A környezetünkben lévő minden valóságos test nemcsak hosszú és széles, hanem <strong>magassága (vagy vastagsága)</strong> is van.
            Azt a térrészt, amelyet egy test a térben elfoglal, a test <strong>térfogatának</strong> (vagy köbtartalmának) nevezzük.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-xl bg-cyan-50/80 dark:bg-slate-800/80 border border-cyan-200 dark:border-cyan-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-600 dark:text-cyan-400 block mb-1">
                A térfogat jele
              </span>
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                V
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                A latin „volumen” (terjedelem, tekercs) szóból származik.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50/80 dark:bg-slate-800/80 border border-sky-200 dark:border-sky-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-sky-600 dark:text-sky-400 block mb-1">
                Hogyan mérjük?
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                Egységkockával
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Megszámoljuk, hány darab egységkockából építhető fel a test.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/80 dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 block mb-1">
                Alapmértékegységek
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                cm³, dm³, m³, liter
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Köbmértékek szilárd testeknél, űrmértékek folyadékoknál.
              </p>
            </div>
          </div>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-md h-32 mx-auto" viewBox="0 0 360 100">
              {/* 1D: Szakasz */}
              <g transform="translate(20, 25)">
                <line x1="0" y1="20" x2="60" y2="20" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                <circle cx="0" cy="20" r="3" fill="#0284c7" />
                <circle cx="60" cy="20" r="3" fill="#0284c7" />
                <text x="30" y="10" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">1 cm</text>
                <text x="30" y="42" textAnchor="middle" className="text-xs font-black fill-sky-800 dark:fill-sky-300">1D: Hosszúság</text>
                <text x="30" y="55" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">vonal (cm)</text>
              </g>

              {/* 2D: Négyzet */}
              <g transform="translate(140, 15)">
                <rect x="0" y="0" width="40" height="40" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" rx="2" />
                <text x="20" y="-4" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">1 cm</text>
                <text x="-8" y="24" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300" transform="rotate(-90 -8 24)">1 cm</text>
                <text x="20" y="24" textAnchor="middle" className="text-[10px] font-black fill-sky-950">1 cm²</text>
                <text x="20" y="52" textAnchor="middle" className="text-xs font-black fill-sky-800 dark:fill-sky-300">2D: Terület</text>
                <text x="20" y="65" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">lapos felület (cm²)</text>
              </g>

              {/* 3D: Kocka */}
              <g transform="translate(260, 10)">
                <polygon points="0,15 15,3 47,3 32,15" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                <polygon points="32,15 47,3 47,35 32,47" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
                <rect x="0" y="15" width="32" height="32" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" rx="1" />
                <text x="16" y="34" textAnchor="middle" className="text-[10px] font-black fill-sky-950">1 cm³</text>
                <text x="22" y="57" textAnchor="middle" className="text-xs font-black fill-cyan-800 dark:fill-cyan-300">3D: Térfogat</text>
                <text x="22" y="70" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">térbeli test (cm³)</text>
              </g>
            </svg>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600" />
              Az 1D, 2D és 3D mértékek összehasonlítása:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block">1D: Hosszúság (h)</span>
                <span className="text-slate-500">Egysége: 1 cm (szakasz). Váltószám: 10.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block">2D: Terület (T)</span>
                <span className="text-slate-500">Egysége: 1 cm² (négyzet). Váltószám: 100.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
                <span className="font-bold text-cyan-800 dark:text-cyan-300 block">3D: Térfogat (V)</span>
                <span className="text-cyan-700 dark:text-cyan-400">Egysége: 1 cm³ (kocka). Váltószám: 1000!</span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A KÖBMÉRTÉKEK RENDSZERE */}
      <TheorySection
        id="kobmertekek"
        title="2. A köbmértékek rendszere és a váltószám: 1000"
        subtitle="Miért éppen 1000 a szomszédos köbmértékek váltószáma?"
        badge="VÁLTÓSZÁMOK"
      >
        <TheoryCard title="Miért 1000 a váltószám a köbmértékeknél?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Képzelj el egy <strong>1 dm</strong> élű kockát! Mivel 1 dm = 10 cm, ezért:
          </p>

          <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm mb-4">
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span>Egy sorba <strong>10 darab</strong> 1 cm³-es kiskockát tehetünk le.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span>Az alsó lapon egy rétegben <strong>10 · 10 = 100 darab</strong> kiskocka lesz.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span>Mivel a magassága is 10 cm, pontosan <strong>10 réteget</strong> tudunk egymásra rakni!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold font-mono">10 · 10 · 10 = 1000</span>
              <span>kiskocka alkotja az 1 dm³-es nagy kockát. Ezért <strong>1 dm³ = 1000 cm³</strong>!</span>
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/40 dark:to-blue-950/40 border border-cyan-200 dark:border-cyan-800 text-center my-3">
            <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-700 dark:text-cyan-300 block mb-2">
              A KÖBMÉRTÉKEK VÁLTÁSI LÁNCA (VÁLTÓSZÁM: 1000)
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700">1 mm³</span>
              <span className="text-cyan-600 dark:text-cyan-400">· 1000 →</span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700">1 cm³</span>
              <span className="text-cyan-600 dark:text-cyan-400">· 1000 →</span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700">1 dm³</span>
              <span className="text-cyan-600 dark:text-cyan-400">· 1000 →</span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700">1 m³</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <strong className="text-cyan-700 dark:text-cyan-400 block mb-1">Nagyobból kisebbe (Szorzunk 1000-rel):</strong>
              <div className="space-y-1 font-mono text-slate-700 dark:text-slate-300">
                <div>• 1 m³ = 1000 dm³</div>
                <div>• 1 dm³ = 1000 cm³</div>
                <div>• 1 cm³ = 1000 mm³</div>
                <div>• 2,5 dm³ = 2500 cm³</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <strong className="text-cyan-700 dark:text-cyan-400 block mb-1">Kisebből nagyobba (Osztunk 1000-rel):</strong>
              <div className="space-y-1 font-mono text-slate-700 dark:text-slate-300">
                <div>• 1000 mm³ = 1 cm³</div>
                <div>• 1000 cm³ = 1 dm³</div>
                <div>• 1000 dm³ = 1 m³</div>
                <div>• 4500 cm³ = 4,5 dm³</div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: AZ ŰRMÉRTÉKEK RENDSZERE */}
      <TheorySection
        id="urmertekek"
        title="3. Az űrmértékek: folyadékok és tartályok kapacitása"
        subtitle="Liter, deciliter, centiliter, milliliter és a hektoliter világa"
        badge="FOLYADÉKOK"
      >
        <TheoryCard title="Folyadékok mérése: az űrtartalom">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A folyadékoknak (víz, tej, gyümölcslé) nincs állandó alakjuk, felveszik annak az edénynek az alakját, amibe beleöntjük őket.
            Ezért a mindennapi életben <strong>űrmértékeket</strong> használunk a folyadékok mennyiségének és az edények befogadóképességének mérésére.
            Az űrmérték alapegysége a <strong>liter (l)</strong>.
          </p>

          <TheoryTable
            headers={['Mértékegység', 'Jele', 'Értéke literben', 'Tipikus mindennapi példa']}
            rows={[
              ['Milliliter', 'ml', '0,001 l (ezredrész)', 'Gyógyszeres cseppek, injekció, kávéskanál (5 ml)'],
              ['Centiliter', 'cl', '0,01 l (századrész)', 'Eszpresszó csésze, felespohár (4-5 cl)'],
              ['Deciliter', 'dl', '0,1 l (tizedrész)', 'Vizespohár, bögre tea (2-3 dl)'],
              ['Liter', 'l', '1 l (alapegység)', 'Tejesdoboz, ásványvizes flakon (1,5 l)'],
              ['Hektoliter', 'hl', '100 l (százszoros)', 'Boroshordó, kerti medence, ciszterna']
            ]}
          />

          <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-center my-3">
            <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-700 dark:text-cyan-300 block mb-2">
              AZ ŰRMÉRTÉKEK VÁLTÁSI LÁNCA
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700">1 ml</span>
              <span className="text-cyan-600 dark:text-cyan-400">· 10 →</span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700">1 cl</span>
              <span className="text-cyan-600 dark:text-cyan-400">· 10 →</span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700">1 dl</span>
              <span className="text-cyan-600 dark:text-cyan-400">· 10 →</span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700">1 liter (l)</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold text-amber-600 dark:text-amber-400">· 100 →</span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">1 hl</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              Figyeld meg: ml, cl, dl, l között <strong>10</strong> a váltószám, de a liter és a hektoliter (hl) között <strong>100</strong>!
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: AZ ARANYSZABÁLYOK - A HÍD A KÉT RENDSZER KÖZÖTT */}
      <TheorySection
        id="aranyszabalyok"
        title="4. A Híd: Köbmértékek és űrmértékek kapcsolata"
        subtitle="A három legfontosabb aranyszabály, amit sosem szabad elfelejteni"
        badge="ARANYSZABÁLYOK"
      >
        <TheoryCard title="A két mértékrendszer összekapcsolása">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A köbmértékek és az űrmértékek ugyanazt a háromdimenziós teret mérik, csak más megnevezéssel.
            Az átjárást három pontos azonosság (aranyszabály) biztosítja:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/40 dark:to-teal-950/40 border-2 border-cyan-400 dark:border-cyan-600 text-center shadow-sm">
              <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-700 dark:text-cyan-300 block mb-1">
                1. FŐ ARANYSZABÁLY
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white my-1">
                1 dm³ = 1 liter
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Egy pontosan 10 cm × 10 cm × 10 cm-es kocka üregébe pont <strong>1 liter</strong> víz fér bele!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/40 dark:to-blue-950/40 border-2 border-sky-400 dark:border-sky-600 text-center shadow-sm">
              <span className="text-xs uppercase tracking-wider font-extrabold text-sky-700 dark:text-sky-300 block mb-1">
                2. KIS ARANYSZABÁLY
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white my-1">
                1 cm³ = 1 ml
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Egy szem kockacukor méretű kockába pontosan <strong>1 milliliter</strong> folyadék fér.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-2 border-indigo-400 dark:border-indigo-600 text-center shadow-sm">
              <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-700 dark:text-indigo-300 block mb-1">
                3. NAGY ARANYSZABÁLY
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white my-1">
                1 m³ = 1000 l = 10 hl
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Egy 1 méteres óriáskockába <strong>1000 liter</strong> (10 hektoliter) víz fér, ami kereken 1 tonna tömegű!
              </p>
            </div>
          </div>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-md h-40 mx-auto" viewBox="0 0 340 140">
              {/* 1 dm³ kocka */}
              <g transform="translate(30, 15)">
                <polygon points="0,25 25,5 75,5 50,25" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                <polygon points="50,25 75,5 75,55 50,75" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
                <rect x="0" y="25" width="50" height="50" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" rx="1" />
                <text x="25" y="55" textAnchor="middle" className="text-xs font-black fill-cyan-900">1 dm³</text>
                <text x="25" y="90" textAnchor="middle" className="text-[10px] font-bold fill-slate-600 dark:fill-slate-400">10 × 10 × 10 cm</text>
              </g>

              {/* Egyenlőségjel */}
              <text x="140" y="65" textAnchor="middle" className="text-2xl font-black fill-cyan-600 dark:fill-cyan-400">=</text>

              {/* 1 liter vizes kancsó */}
              <g transform="translate(180, 15)">
                <rect x="20" y="15" width="40" height="60" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                <rect x="22" y="30" width="36" height="43" rx="1" fill="#38bdf8" opacity="0.6" />
                <line x1="20" y1="35" x2="28" y2="35" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="20" y1="45" x2="26" y2="45" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="20" y1="55" x2="28" y2="55" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="20" y1="65" x2="26" y2="65" stroke="#0284c7" strokeWidth="1.5" />
                <path d="M 60 25 C 72 25, 72 55, 60 55" fill="none" stroke="#0284c7" strokeWidth="2" />
                <text x="40" y="56" textAnchor="middle" className="text-xs font-black fill-sky-950">1 liter</text>
                <text x="40" y="90" textAnchor="middle" className="text-[10px] font-bold fill-slate-600 dark:fill-slate-400">10 dl = 1000 ml</text>
              </g>

              {/* Alsó aranyszabály összefoglaló */}
              <text x="170" y="125" textAnchor="middle" className="text-xs font-black fill-cyan-900 dark:fill-cyan-100">
                Aranyszabály: 1 dm³ térfogatú üregbe PONT 1 liter víz fér!
              </text>
            </svg>
          </div>

          <TheoryCallout variant="tip" title="Gyakorlati jótanács az átváltáshoz">
            Ha köbmértékből űrmértékbe (vagy fordítva) kell váltanod, mindig menj át a <strong>hídon</strong>:
            <br />
            <strong>1. lépés:</strong> Váltsd át köbdeciméterbe (dm³)!
            <br />
            <strong>2. lépés:</strong> Mivel 1 dm³ = 1 liter, most már literben vagy!
            <br />
            <strong>3. lépés:</strong> A litert váltsd át a kívánt űrmértékbe (dl, cl, ml vagy hl)!
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV TÉRFOGAT ÉS ŰRMÉRTÉK LABOR */}
      <TheorySection
        id="labor"
        title="5. Interaktív Laboratórium: Egységkocka építő és Űrmérték-átváltó"
        subtitle="Kísérletezz a testek felépítésével és a mértékegységek azonnali átszámításával!"
        badge="INTERAKTÍV"
      >
        <TheoryCard title="1. Rész: Építs testet egységkockákból!">
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
            Állítsd be a téglatest hosszúságát, szélességét és magasságát egységkockákban, és figyeld meg a rétegek felépülését!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Hosszúság (a):</span>
                <span className="text-cyan-600 font-mono">{cubesA} kocka</span>
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={cubesA}
                onChange={(e) => setCubesA(Number(e.target.value))}
                className="w-full accent-cyan-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Szélesség (b):</span>
                <span className="text-cyan-600 font-mono">{cubesB} kocka</span>
              </label>
              <input
                type="range"
                min="1"
                max="6"
                value={cubesB}
                onChange={(e) => setCubesB(Number(e.target.value))}
                className="w-full accent-cyan-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Magasság / rétegek (c):</span>
                <span className="text-cyan-600 font-mono">{cubesC} réteg</span>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={cubesC}
                onChange={(e) => setCubesC(Number(e.target.value))}
                className="w-full accent-cyan-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Vizuális 3D rácsos szemléltető */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[200px]">
              <svg className="w-56 h-40" viewBox="0 0 200 140">
                {/* Izometrikus kocka-tömb ábra */}
                <rect x="30" y="45" width="90" height="60" fill="#cffafe" stroke="#0891b2" strokeWidth="2" />
                <polygon points="30,45 65,20 155,20 120,45" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5" />
                <polygon points="120,45 155,20 155,80 120,105" fill="#a5f3fc" stroke="#0891b2" strokeWidth="1.5" />
                
                {/* Rácsvonalak demonstráció */}
                <line x1="30" y1="75" x2="120" y2="75" stroke="#0891b2" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="75" y1="45" x2="75" y2="105" stroke="#0891b2" strokeWidth="1" strokeDasharray="3,3" />

                <text x="75" y="125" textAnchor="middle" className="text-[11px] font-bold fill-cyan-950">
                  {cubesA} × {cubesB} × {cubesC} egység
                </text>
              </svg>
              <span className="text-xs text-slate-500 mt-1">
                Alsó réteg: {cubesA} · {cubesB} = {singleLayerCubes} kocka. {cubesC} réteg egymáson.
              </span>
            </div>

            {/* Számított eredmények */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                <span className="text-xs text-cyan-700 dark:text-cyan-400 block font-bold">ÖSSZES EGYSÉGKOCKA</span>
                <span className="text-3xl font-black text-cyan-950 dark:text-cyan-100">
                  {totalUnitCubes} db
                </span>
                <span className="text-xs text-cyan-700 dark:text-cyan-300 block mt-1">
                  V = {cubesA} · {cubesB} · {cubesC} = {totalUnitCubes} egységkocka
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block">Ha 1 kocka = 1 cm³:</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{totalUnitCubes} cm³ = {totalUnitCubes} ml</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block">Ha 1 kocka = 1 dm³:</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{totalUnitCubes} dm³ = {totalUnitCubes} liter</strong>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* 2. Rész: Váltás kalkulátor */}
        <TheoryCard title="2. Rész: Valós idejű űrmérték és köbmérték kalkulátor">
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
            Írj be egy értéket és válassz mértékegységet! Nézd meg, hogyan alakul át azonnal az összes többi egységbe!
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="w-36">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Mennyiség:</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="10000"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value) || 0)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
              />
            </div>

            <div className="w-40">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Mértékegység:</label>
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value as any)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm"
              >
                <option value="ml">ml (milliliter)</option>
                <option value="cl">cl (centiliter)</option>
                <option value="dl">dl (deciliter)</option>
                <option value="l">l (liter)</option>
                <option value="hl">hl (hektoliter)</option>
                <option value="cm3">cm³ (köbcentiméter)</option>
                <option value="dm3">dm³ (köbdeciméter)</option>
                <option value="m3">m³ (köbméter)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Literben:</span>
              <span className="font-mono font-bold text-cyan-900 dark:text-cyan-200 text-sm">
                {liters >= 10000 ? liters.toExponential(2) : liters} l
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Deciliterben:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                {(liters * 10).toFixed(2).replace(/\.00$/, '')} dl
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Milliliterben:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                {(liters * 1000).toFixed(1).replace(/\.0$/, '')} ml
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Hektoliterben:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                {(liters / 100).toFixed(3).replace(/\.?0+$/, '')} hl
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Köbdeciméterben:</span>
              <span className="font-mono font-bold text-teal-900 dark:text-teal-200 text-sm">
                {liters} dm³
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Köbcentiméterben:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                {(liters * 1000).toFixed(1).replace(/\.0$/, '')} cm³
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Köbméterben:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                {(liters / 1000).toFixed(4).replace(/\.?0+$/, '')} m³
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Centiliterben:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                {(liters * 100).toFixed(1).replace(/\.0$/, '')} cl
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÍPUSHIBÁK */}
      <TheorySection
        id="csapdak"
        title="6. Gyakori csapdák és mire figyelj nagyon!"
        subtitle="Ezeket a hibákat ejtik el leggyakrabban a diákok a dolgozatokban"
        badge="FIGYELEM"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. CSAPDA: 10-zel vagy 100-zal váltani köbmértékeknél',
              description: 'A hosszúságnál 10, a területnél 100, de a TÉRFOGATNÁL 1000 a váltószám! Például: 1 m³ = 1000 dm³ (nem 10 és nem 100!).'
            },
            {
              title: '2. CSAPDA: A köbméter nem 1 liter!',
              description: 'Sokan azt hiszik, hogy 1 m³ = 1 liter. Nem! 1 dm³ = 1 liter. Az 1 m³ egy hatalmas kocka: 1000 liter vizet tartalmaz!'
            },
            {
              title: '3. CSAPDA: Hektoliter és liter váltószáma 100, nem 10!',
              description: 'Míg a deci, centi, milli között 10 a szorzó, addig a „hektoliter” a görög hekaton (száz) szóból származik: 1 hl = 100 liter!'
            },
            {
              title: '4. CSAPDA: Milliliter és köbcentiméter keverése',
              description: 'Jegyezd meg örökre: 1 cm³ = 1 ml. Pontosan ugyanaz a térfogat! Egy 500 ml-es üdítős palack pontosan 500 cm³ térfogatú.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
