import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Maximize2,
  Box,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Scale,
  FlaskConical,
  Grid,
  Zap,
  TrendingUp
} from 'lucide-react';
import {
  AreaConversionLadderSvg,
  Why100AreaGridSvg,
  VolumeConversionLadderSvg,
  Why1000VolumeCubeSvg,
  GoldenBridgeVolumeLiterSvg
} from './AreaVolumeMeasurementDiagrams';

interface AreaVolumeMeasurementTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const AreaVolumeMeasurementTheory: React.FC<AreaVolumeMeasurementTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [mode, setMode] = useState<'area' | 'volume'>('area');
  const [areaValue, setAreaValue] = useState<number>(2.5); // m²
  const [volumeValue, setVolumeValue] = useState<number>(1.2); // m³

  // Átváltások
  const areaInDm2 = areaValue * 100;
  const areaInCm2 = areaValue * 10000;
  const areaInHa = areaValue / 10000;

  const volumeInDm3 = volumeValue * 1000;
  const volumeInLiters = volumeInDm3;
  const volumeInHl = volumeValue * 10;
  const volumeInCm3 = volumeValue * 1000000;

  const sections: TheorySection[] = [
    {
      id: 'terulet-fogalma',
      title: 'A terület mérése és a 100-as váltószám',
      badge: 'Alapszabály',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Egy síkidom <strong>területe</strong> azt fejezi ki, hogy hányszor fér el benne a választott egység, az <strong>egységnégyzet</strong>.
            A hosszúság mérésénél a váltószám általában 10, de a területnél <strong>100</strong>!
          </p>

          {/* Kiemelt aranyszabály */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 via-purple-50/50 to-indigo-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
              <Sparkles className="w-3 h-3 text-indigo-600" /> Miért éppen 100 a váltószám?
            </span>
            <div className="text-base sm:text-lg font-mono font-bold text-slate-800 dark:text-slate-100">
              1 dm = 10 cm &nbsp;⟹&nbsp; 1 dm² = 10 cm · 10 cm = 100 cm²
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Mivel a négyzetnek két iránya (hossza és szélessége) van, a hosszúság 10-es szorzója mindkét irányban megjelenik: 10 · 10 = 100.
            </p>
          </div>

          {/* SVG 1: Terület váltószám lépcső */}
          <AreaConversionLadderSvg />

          {/* SVG 2: Miért 100 a váltószám grid ábra */}
          <Why100AreaGridSvg />

          {/* Terület mértékegységek kártyák */}
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/70 dark:bg-indigo-950/20 space-y-3">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2 text-sm">
              <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Gyakorlati területmértékek összefoglalása
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block">1 cm²</span>
                <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">= 100 mm²</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block">1 dm²</span>
                <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">= 100 cm²</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block">1 m²</span>
                <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">= 100 dm² = 10 000 cm²</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Mezőgazdasági</span>
                <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">1 a = 100 m² | 1 ha = 100 a</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 italic pt-1">
              Jegyezd meg jól: <strong>1 hektár (ha) = 100 ár (a) = 10 000 m²</strong>, és <strong>1 km² = 100 ha = 1 000 000 m²</strong>!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'terfogat-fogalma',
      title: 'A térfogat mérése és az 1000-es váltószám',
      badge: 'Térbeli testek',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Egy test <strong>térfogata</strong> (űrtartalma) a test által a térből elfoglalt rész nagyságát jelenti. 
            Mérésekor azt számoljuk meg, hogy hány darab <strong>egységkocka</strong> tölti ki a test belsejét.
          </p>

          {/* SVG 3: Térfogat váltólánc */}
          <VolumeConversionLadderSvg />

          {/* SVG 4: Miért 1000 izometrikus rétegek */}
          <Why1000VolumeCubeSvg />

          <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/50 bg-teal-50/70 dark:bg-teal-950/20 space-y-3">
            <h4 className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2 text-sm">
              <Box className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Térfogat mértékegységek gyors táblázata
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-800">
                <span className="font-bold text-teal-800 dark:text-teal-300 block">1 cm³</span>
                <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">= 1000 mm³</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-800">
                <span className="font-bold text-teal-800 dark:text-teal-300 block">1 dm³</span>
                <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">= 1000 cm³</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-800">
                <span className="font-bold text-teal-800 dark:text-teal-300 block">1 m³</span>
                <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">= 1000 dm³ = 1 000 000 cm³</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'urtartalom-hid',
      title: 'A legfontosabb híd: Térfogat és Űrtartalom kapcsolata',
      badge: 'Kulcsösszefüggés',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Folyadékok, gázok vagy tárolóedények esetén a köbméter helyett a <strong>liter (l)</strong> és <strong>hektoliter (hl)</strong> mértékegységeket használjuk.
            A köbdeciméter és a liter között közvetlen, 1:1 egyenlőség áll fenn!
          </p>

          {/* SVG 5: Az aranyhíd */}
          <GoldenBridgeVolumeLiterSvg />

          <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
              <FlaskConical className="w-3 h-3 text-emerald-600" /> Az aranyhíd
            </span>
            <div className="text-lg sm:text-2xl font-mono font-black text-emerald-950 dark:text-emerald-100 tracking-wide">
              1 dm³ = 1 liter (l) &nbsp;&nbsp;|&nbsp;&nbsp; 1 cm³ = 1 milliliter (ml)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Egy pontosan 10 cm × 10 cm × 10 cm belső méretű kockába hajszálpontosan <strong>1 liter víz</strong> fér bele!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 block">1 köbméter (m³) hordóban</span>
              <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                1 m³ = 1000 dm³ = <strong>1000 liter</strong> = <strong>10 hektoliter (hl)</strong>
              </p>
              <p className="text-[11px] text-slate-500">1 hl = 100 liter = 100 dm³.</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-teal-700 dark:text-teal-400 block">Kisebb űrmértékek</span>
              <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                1 l = 10 dl = 100 cl = 1000 ml
              </p>
              <p className="text-[11px] text-slate-500">Fél liter = 5 dl = 500 ml = 500 cm³.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'atvaltasi-strategia',
      title: 'Hogyan váltsunk át biztosan? (Szorzás vs. Osztás)',
      badge: 'Módszertan',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az átváltás iránya dönti el, hogy szoroznunk vagy osztanunk kell a váltószámmal:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-1.5">
              <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-emerald-600" />
                Nagyobbról kisebbre váltunk: SZORZUNK!
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                A kisebb mértékegységből <strong>több</strong> darab kell ugyanakkora mérethez.
              </p>
              <div className="font-mono text-[11px] text-emerald-900 dark:text-emerald-200 bg-white dark:bg-slate-900 p-2 rounded border border-emerald-100 dark:border-emerald-800">
                • 3 m² = 3 · 100 = 300 dm²<br />
                • 0,4 m³ = 0,4 · 1000 = 400 dm³ (= 400 l)
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-950/20 space-y-1.5">
              <div className="font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-sky-600" />
                Kisebbről nagyobbra váltunk: OSZTUNK!
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                A nagyobb mértékegységből <strong>kevesebb</strong> darab szükséges.
              </p>
              <div className="font-mono text-[11px] text-sky-900 dark:text-sky-200 bg-white dark:bg-slate-900 p-2 rounded border border-sky-100 dark:border-sky-800">
                • 750 dm² = 750 : 100 = 7,5 m²<br />
                • 2500 cm³ = 2500 : 1000 = 2,5 dm³ (= 2,5 l)
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'csapdak',
      title: 'Veszélyzóna: Gyakori tévedések és csapdák',
      badge: 'Csapdák',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ezek a leggyakoribb hibák dolgozatokban, amikre nagyon figyelj oda:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                1. A 10-es váltószám téves használata
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                <code className="text-rose-700 font-bold">HIBÁS:</code> 1 m² = 10 dm².<br />
                <code className="text-emerald-700 font-bold">HELYES:</code> 1 m² = <strong>100 dm²</strong>! A terület mindig 100-as lépcsőkben vált!
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                2. Hektár és négyzetméter keverése
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                1 ha nem 100 m², hanem <strong>10 000 m²</strong>! (1 ha = 100 a, és 1 a = 100 m², tehát 100 · 100 = 10 000 m²).
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                3. Térfogat és liter összekeverése
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                1 liter nem 1 m³, hanem <strong>1 dm³</strong>! 1 m³ víz az pontosan <strong>1000 liter</strong>, ami egy egész köbméteres tartály!
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                4. Deciliter és milliliter
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                1 liter = 10 dl = 1000 ml. 1 dl tehát 100 ml (és 100 cm³), nem pedig 10 ml!
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="A terület és a térfogat mérése"
      subtitle="Mértékegységrendszer, 100-as és 1000-es váltószámok, űrtartalom és átváltások"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET • 📖 TANANYAG"
      themeColor="indigo"
      pdfFilename="6_osztaly_V_terulet_es_terfogat_merese_tananyag.pdf"
      quickRule={{
        label: 'A két legfontosabb aranyszabály',
        formula: 'Terület váltószám: 100  |  Térfogat váltószám: 1000 (1 dm³ = 1 liter)'
      }}
      practiceTitle="Készen állsz a kvízre és az átváltásokra?"
      practiceSubtitle="Gyakorold a terület- és térfogatmértékek átváltását 3 nehézségi szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív átváltási szimulátor labor */}
      <Card className="p-4 sm:p-5 border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/60 to-white dark:from-slate-900 dark:to-indigo-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/60 dark:border-indigo-900/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500 text-white shadow-xs">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                  Interaktív Átváltási Labor
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Mozgasd a csúszkát és figyeld meg az összetartozó mértékegységek párhuzamos értékeit!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
              <Button
                variant={mode === 'area' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('area')}
                className={`h-7 px-2.5 text-xs font-semibold ${mode === 'area' ? 'bg-indigo-600 text-white' : ''}`}
              >
                <Grid className="w-3.5 h-3.5 mr-1" /> Terület (100)
              </Button>
              <Button
                variant={mode === 'volume' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('volume')}
                className={`h-7 px-2.5 text-xs font-semibold ${mode === 'volume' ? 'bg-indigo-600 text-white' : ''}`}
              >
                <Box className="w-3.5 h-3.5 mr-1" /> Térfogat (1000)
              </Button>
            </div>
          </div>

          {mode === 'area' ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Kijelölt felület nagysága:
                  </span>
                  <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400 text-sm">
                    {areaValue.toFixed(1)} m²
                  </span>
                </div>
                <Slider
                  value={[areaValue]}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onValueChange={(val) => setAreaValue(val[0])}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0,1 m²</span>
                  <span>5,0 m²</span>
                  <span>10,0 m²</span>
                </div>
              </div>

              {/* Értékkártyák */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Négyzetdeciméter</span>
                  <span className="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-300">
                    {areaInDm2.toFixed(0)} dm²
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">· 100</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Négyzetcentiméter</span>
                  <span className="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-300">
                    {areaInCm2.toLocaleString('hu-HU')} cm²
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">· 10 000</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Ár (a)</span>
                  <span className="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-300">
                    {(areaValue / 100).toFixed(3)} a
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">: 100</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Hektár (ha)</span>
                  <span className="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-300">
                    {areaInHa.toFixed(5)} ha
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">: 10 000</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Tartály térfogata:
                  </span>
                  <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400 text-sm">
                    {volumeValue.toFixed(1)} m³
                  </span>
                </div>
                <Slider
                  value={[volumeValue]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  onValueChange={(val) => setVolumeValue(val[0])}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0,1 m³</span>
                  <span>2,5 m³</span>
                  <span>5,0 m³</span>
                </div>
              </div>

              {/* Térfogat értékkártyák */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Köbdeciméter (dm³)</span>
                  <span className="font-mono font-bold text-sm text-teal-700 dark:text-teal-300">
                    {volumeInDm3.toFixed(0)} dm³
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">· 1000</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Liter (1:1 dm³)</span>
                  <span className="font-mono font-bold text-sm text-emerald-700 dark:text-emerald-300">
                    {volumeInLiters.toLocaleString('hu-HU')} liter
                  </span>
                  <span className="text-[9px] text-emerald-600 block mt-0.5 font-bold">1 dm³ = 1 l</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Hektoliter (hl)</span>
                  <span className="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-300">
                    {volumeInHl.toFixed(1)} hl
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">· 10</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">Köbcentiméter (cm³)</span>
                  <span className="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-300">
                    {volumeInCm3.toLocaleString('hu-HU')} cm³
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">· 1 000 000</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default AreaVolumeMeasurementTheory;
