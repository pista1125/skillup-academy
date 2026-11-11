import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  ClockHandsAngleSvg,
  WindshieldWiperCoverageSvg
} from './EverydayArcsSectorsFigures';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Clock,
  Sparkles,
  Cog,
  Gauge,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EverydayArcsSectorsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const EverydayArcsSectorsTheory: React.FC<EverydayArcsSectorsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State ---
  const [activeTab, setActiveTab] = useState<'bike' | 'wiper' | 'clock'>('bike');

  // Kerékpár állapot:
  const [wheelDiamCm, setWheelDiamCm] = useState<number>(70); // 28" kb 71 cm
  const [rpm, setRpm] = useState<number>(120); // fordulat / perc

  // Szélvédőtörlő állapot:
  const [wiperAngle, setWiperAngle] = useState<number>(110); // fok
  const [outerR, setOuterR] = useState<number>(55); // cm
  const [innerR, setInnerR] = useState<number>(15); // cm

  // Óramutató állapot:
  const [hours, setHours] = useState<number>(3);
  const [minutes, setMinutes] = useState<number>(15);

  const PI = Math.PI;

  // Kerékpár számítások:
  const wheelCircM = (PI * wheelDiamCm) / 100; // méterben
  const speedMpm = wheelCircM * rpm; // méter / perc
  const speedKmh = (speedMpm * 60) / 1000; // km/h

  // Szélvédőtörlő számítások (körgyűrű-cikk):
  const wipedAreaCm2 = (PI * (outerR * outerR - innerR * innerR) * wiperAngle) / 360;
  const wipedAreaM2 = wipedAreaCm2 / 10000;

  // Óramutató számítások:
  // Kismutató: 30 fok / óra + 0.5 fok / perc
  const hourAngle = ((hours % 12) * 30 + minutes * 0.5) % 360;
  // Nagymutató: 6 fok / perc
  const minuteAngle = (minutes * 6) % 360;
  let angleDiff = Math.abs(hourAngle - minuteAngle);
  if (angleDiff > 180) angleDiff = 360 - angleDiff;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="Körívek és körcikkek a mindennapokban"
      subtitle="A gördülés fizikája, kerékpár áttételek, szélvédőtörlő lapátok felülete, óramutatók bezárt szöge és mérnöki alkalmazások."
      themeColor="amber"
      pdfFilename="10_osztaly_korivek_korcikkek_mindennapokban_tananyag.pdf"
      quickRule={{
        label: 'A KÖR-MECHANIKA ÉS MINDENNAPI ALKALMAZÁSOK KÉPLETEI',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-amber-50/90 p-2.5 rounded-xl border border-amber-200">
              <span className="font-black text-amber-900 block mb-0.5">Alapvető gyakorlati összefüggések:</span>
              <ul className="space-y-1 font-mono text-amber-950 mt-1">
                <li>• <strong>Gördülés:</strong> Megtett út s = N · K = N · πd, sebesség: v = s / t</li>
                <li>• <strong>Fogaskerekek &amp; Áttétel:</strong> n₁ · r₁ = n₂ · r₂ (kerületi sebesség azonos!)</li>
                <li>• <strong>Szélvédőtörlő / Permetező:</strong> T = [π(R² - r²) · α] / 360°</li>
                <li>• <strong>Óramutatók:</strong> Kismutató 0,5°/perc (30°/óra), nagymutató 6°/perc</li>
              </ul>
            </div>
            <div className="bg-rose-50 p-2 rounded-lg border border-rose-200 text-rose-800 text-[11px] leading-tight">
              <strong>⚠️ ÓRAMUTATÓ CSAPDA:</strong> 3:15-kor a két mutató <u>NEM</u> fedi egymást! 15 perc alatt a kismutató elmozdul: 15 · 0,5° = 7,5°-ot!
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a mindennapi kör-mechanikai feladatokra?"
      practiceSubtitle="Számíts sebességet, törölt területet és óramutató szöget a kvízben!"
      interactiveSection={
        <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950 border-2 border-amber-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl shadow-lg">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-amber-100">
                  Interaktív Műszaki &amp; Hétköznapi Kör-Labor
                </h3>
                <p className="text-xs text-amber-300/80">
                  Válassz modellt: kerékpár sebesség kalkulátor, szélvédőtörlő felület vagy óramutató szögvizsgáló!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'bike' ? 'bg-amber-500 text-slate-950 font-bold border-amber-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('bike')}
              >
                🚴 Kerékpár Sebesség
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'wiper' ? 'bg-amber-500 text-slate-950 font-bold border-amber-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('wiper')}
              >
                🚗 Szélvédőtörlő
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'clock' ? 'bg-amber-500 text-slate-950 font-bold border-amber-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('clock')}
              >
                ⏰ Óramutató Szög
              </Button>
            </div>
          </div>

          {/* 1. Mód: Kerékpár */}
          {activeTab === 'bike' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-amber-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Kerék méret és fordulatszám
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Kerékátmérő (d):</span>
                    <span className="font-mono text-amber-300 font-bold">{wheelDiamCm} cm ({((wheelDiamCm / 2.54).toFixed(0))}")</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="80"
                    step="1"
                    value={wheelDiamCm}
                    onChange={(e) => setWheelDiamCm(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Fordulatszám (n):</span>
                    <span className="font-mono text-cyan-300 font-bold">{rpm} fordulat/perc</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="240"
                    step="5"
                    value={rpm}
                    onChange={(e) => setRpm(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/60 space-y-1">
                    <span className="text-amber-400 font-bold block">1 kerékfordulat útja (K):</span>
                    <p className="font-mono text-slate-100 text-lg font-bold">
                      {wheelCircM.toFixed(3)} m
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">K = π · {wheelDiamCm} cm</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 space-y-1">
                    <span className="text-emerald-400 font-bold block">Haladási sebesség (v):</span>
                    <p className="font-mono text-emerald-300 text-2xl font-black">
                      {speedKmh.toFixed(1)} km/h
                    </p>
                    <p className="text-[11px] text-emerald-400 font-mono">{(speedKmh / 3.6).toFixed(2)} m/s</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400 block mb-1">Mérnöki következtetés:</strong>
                  Ha 1 órán át folyamatosan tekersz ezzel a fordulattal, pontosan <span className="font-mono text-emerald-300 font-bold">{speedKmh.toFixed(1)} km</span> távolságot teszel meg. A sebesség egyenesen arányos a kerék átmérőjével és a fordulatszámmal!
                </div>
              </div>
            </div>
          )}

          {/* 2. Mód: Szélvédőtörlő */}
          {activeTab === 'wiper' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-amber-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Törlőlapát méretei és szögtartománya
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Törlési szög (α):</span>
                    <span className="font-mono text-amber-300 font-bold">{wiperAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="150"
                    step="5"
                    value={wiperAngle}
                    onChange={(e) => setWiperAngle(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Külső hatósugár (R):</span>
                    <span className="font-mono text-cyan-300 font-bold">{outerR} cm</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="75"
                    step="1"
                    value={outerR}
                    onChange={(e) => setOuterR(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Belső kar (r):</span>
                    <span className="font-mono text-teal-300 font-bold">{innerR} cm</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={innerR}
                    onChange={(e) => setInnerR(Number(e.target.value))}
                    className="w-full accent-teal-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-800/60 space-y-2">
                  <span className="text-cyan-400 font-bold block text-xs uppercase tracking-wider">
                    Letörölt szélvédő felület (Körgyűrű-cikk):
                  </span>
                  <p className="font-mono text-2xl font-black text-cyan-200">
                    {wipedAreaCm2.toFixed(1)} cm² &nbsp;
                    <span className="text-base text-emerald-400 font-normal">({wipedAreaM2.toFixed(3)} m²)</span>
                  </p>
                  <p className="text-xs text-slate-300 font-mono">
                    Képlet: [π · ({outerR}² - {innerR}²) · {wiperAngle}°] / 360°
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Mód: Óramutató */}
          {activeTab === 'clock' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-amber-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Pontos idő beállítása
                </span>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Óra (1-12):</span>
                    <span className="font-mono text-rose-300 font-bold">{hours} óra</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>Perc (0-59):</span>
                    <span className="font-mono text-blue-300 font-bold">{minutes} perc</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="59"
                    step="1"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => { setHours(3); setMinutes(15); }}>
                    3:15 (Klasszikus csapda)
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => { setHours(6); setMinutes(0); }}>
                    6:00 (180°)
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => { setHours(3); setMinutes(0); }}>
                    3:00 (90°)
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-amber-400 font-bold block text-xs uppercase tracking-wider">
                    Időpont: {hours}:{minutes < 10 ? '0' + minutes : minutes}
                  </span>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs text-slate-300">
                    <div>Kismutató szöge: <strong className="text-rose-400">{hourAngle.toFixed(1)}°</strong></div>
                    <div>Nagymutató szöge: <strong className="text-blue-400">{minuteAngle}°</strong></div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-200">Két mutató bezárt szöge:</span>
                    <span className="text-2xl font-black text-amber-300 font-mono">{angleDiff.toFixed(1)}°</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >
      {/* 1. Szakasz: A gördülés geometriája */}
      <TheorySection
        id="gordules-geometria"
        number={1}
        title="A gördülés fizikája és a megtett út"
        badge="MECHANIKA"
        badgeColor="amber"
      >
        <TheoryCard title="Egy fordulat = egy teljes kerület" color="amber">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Amikor egy kör alakú kerék tisztán, csúszásmentesen gördül a talajon, a kerületének minden egyes pontja 
            egymás után érintkezik az útfelülettel. Ez azt jelenti, hogy <strong>pontosan egyetlen teljes fordulat alatt a kerék 
            egy teljes kerületnyi (<MathText>{'K = 2\\pi r = \\pi d'}</MathText>) távolságot tesz meg előre</strong>!
          </p>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 font-mono text-amber-950 dark:text-amber-300 font-bold text-xs sm:text-sm my-3 space-y-1">
            <div>Megtett út: <MathText>{'s = N \\cdot K = N \\cdot \\pi d'}</MathText> &nbsp; (ahol N a fordulatok száma)</div>
            <div>Sebesség: <MathText>{'v = \\frac{s}{t} = \\frac{N \\cdot \\pi d}{t}'}</MathText></div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: Szélvédőtörlő és permetező */}
      <TheorySection
        id="szelvedotorlo-permetezo"
        number={2}
        title="Szélvédőtörlő lapátok és körszórófejek fedése"
        badge="GÉPÉSZET"
        badgeColor="orange"
      >
        <TheoryCard title="A körgyűrű-cikk mint műszaki felület" color="orange">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Egy gépkocsi szélvédőtörlő lapátja egy rögzített forgástengely körül fordul el <MathText>{'\\alpha'}</MathText> szögben.
                Mivel a lapát nem a forgásponttól indul, hanem van egy belső (<MathText>{'r'}</MathText>) merevítő karja, 
                a megtisztított felület egy <strong>körgyűrű-cikk</strong>:
              </p>
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 font-mono text-orange-950 dark:text-orange-300 font-bold">
                <MathText>{'T = \\frac{\\pi (R^2 - r^2) \\cdot \\alpha}{360^\\circ}'}</MathText>
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <WindshieldWiperCoverageSvg size={300} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szakasz: Az óra számlapja */}
      <TheorySection
        id="ora-szamlapja"
        number={3}
        title="Az óramutatók geometriája és szögei"
        badge="IDŐMÉRÉS"
        badgeColor="rose"
      >
        <TheoryCard title="Hogyan mozognak az óramutatók percről percre?" color="rose">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Az analóg óra számlapja egy <MathText>{'360^\\circ'}</MathText>-os kör, melyet 12 órás beosztás oszt 12 egyenlő körcikkre. 
                Egyetlen óraosztás szöge: <MathText>{'360^\\circ / 12 = 30^\\circ'}</MathText>.
              </p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                <li><strong>Nagymutató sebessége:</strong> <MathText>{'360^\\circ / 60 = 6^\\circ/\\text{perc}'}</MathText></li>
                <li><strong>Kismutató sebessége:</strong> <MathText>{'30^\\circ / 60 = 0{,}5^\\circ/\\text{perc}'}</MathText></li>
              </ul>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs">
                <span className="font-bold text-rose-900 dark:text-rose-200 block">Miért nem 0° a szög 3:15-kor?</span>
                Mert 15 perc alatt a kismutató elment a 3-as osztástól: <MathText>{'15 \\cdot 0{,}5^\\circ = 7{,}5^\\circ'}</MathText>-kal lefelé!
                A nagymutató eközben pont a 3-ason (90°-on) áll, így a bezárt szögük <strong>7,5°</strong>!
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <ClockHandsAngleSvg size={240} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};
