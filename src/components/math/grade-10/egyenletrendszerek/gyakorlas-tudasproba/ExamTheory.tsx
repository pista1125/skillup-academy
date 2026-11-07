import React, { useState } from 'react';
import { TheoryTemplate, TheoryCardItem } from '../TheoryTemplate';
import {
  TwoFleasSvg,
  ThreeVehiclesSvg,
  ConcertPostersSvg,
  MarketVegetablesSvg,
  TwoFactoriesSvg,
  ComprehensiveExamSummarySvg
} from './ExamFigures';
import { Award, CheckCircle2, Target, Calculator, Compass, Sparkles, Layers } from 'lucide-react';

interface ExamTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ExamTheory: React.FC<ExamTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Fejezeti Szimulátor: Két bolha ugrása a rácson
  // 1. bolha: (0; -2)-ből indulva, meredeksége 2 ⟹ y = 2x - 2
  // 2. bolha: x + y = C összegű rácspontok (alapérték C = 7)
  const [fleaTargetSum, setFleaTargetSum] = useState<number>(7);

  // 2x - 2 = C - x ⟹ 3x = C + 2 ⟹ x = (C + 2) / 3
  const interX = (fleaTargetSum + 2) / 3;
  const interY = fleaTargetSum - interX;
  const isIntegerPoint = Number.isInteger(interX);

  const theoryCards: TheoryCardItem[] = [
    {
      id: 'card-exam-summary',
      title: '1. A Fejezet Átfogó Rendszerezése',
      subtitle: 'Grafikus, algebrai, másodfokú és szöveges eszköztár egy pillantásra',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            A 10. osztályos <strong>Egyenletrendszerek</strong> fejezet a matematika egyik legfontosabb
            eszközkészletét adja a kezünkbe: több egyidejű feltétel matematikai modellezését és megoldását.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="font-bold text-blue-900 block mb-1">1. Grafikus Szemlélet</span>
              <span>A megoldáspár az egyenesek vagy görbék közös <strong>metszéspontja</strong> (x₀; y₀). Metsző (1 mo.), párhuzamos (0 mo.), egybeeső (végtelen sok mo.).</span>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="font-bold text-purple-900 block mb-1">2. Algebrai Módszerek</span>
              <span><strong>Behelyettesítés:</strong> kifejezés az 1-es együtthatóból. <strong>Elimináció:</strong> egyenlő együtthatók összeadással/kivonással.</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="font-bold text-amber-900 block mb-1">3. Bővített Rendszerek</span>
              <span><strong>3 ismeretlen:</strong> Gauss-elimináció (3 ➔ 2 ➔ 1). <strong>Másodfokúak:</strong> kör és egyenes, parabola szelői (D &gt; 0, D = 0, D &lt; 0).</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="font-bold text-emerald-900 block mb-1">4. Szöveges Modellezés</span>
              <span>Összetett problémák: inverz arányosság (xy kiesése), keverési mérlegek, munkavégzés és sebességek.</span>
            </div>
          </div>
        </div>
      ),
      figure: <ComprehensiveExamSummarySvg size={240} />
    },
    {
      id: 'card-fleas-problem',
      title: '2. Két Bolha a Rácson (Geometriai Rácsmodell)',
      subtitle: 'Tankönyv 44. o. 3. feladat: Pontok, egyenesek és rácspontok',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Egy bolha a <code className="bg-slate-100 font-mono px-1">(0; −2)</code> rácspontból indul, és minden ugrással
            1-et lép jobbra és 2-t felfelé. Ez pontosan az <code className="bg-slate-100 font-mono text-pink-600 px-1">y = 2x − 2</code> egyenletű
            egyenes rácspontjainak halmaza!
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
            <div>• A másik bolha olyan rácspontokba ugrik, ahol <code className="font-mono font-bold">x + y = 7</code> (x, y ≥ 0).</div>
            <div>• Egyenlővé téve a két összefüggést: <code className="font-mono">2x − 2 = 7 − x ⟹ 3x = 9 ⟹ x = 3</code>.</div>
            <div>• Ebből: <code className="font-mono">y = 7 − 3 = 4</code>.</div>
            <div className="text-emerald-700 font-bold pt-1">
              Mindkét bolha érinti a (3; 4) közös rácspontot! ✓
            </div>
          </div>
        </div>
      ),
      figure: <TwoFleasSvg size={240} />
    },
    {
      id: 'card-vehicles-speed',
      title: '3. Járművek és Menetidők (Sebesség-modell)',
      subtitle: 'Tankönyv 44. o. 4. feladat: Kisbusz, személyautó és teherautó',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Három jármű sebessége és menetideje Kisváros és Nagyváros között összefüggést képez:
          </p>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1">
            <div className="font-bold text-blue-900">A felírt összefüggések (s = v · t):</div>
            <div>• Személyautó: sebessége <code className="font-mono">v + 15</code>, ideje 1 órával kevesebb: <code className="font-mono">s / v − s / (v + 15) = 1</code></div>
            <div>• Teherautó: sebessége <code className="font-mono">v − 15</code>, ideje 1,5 órával több: <code className="font-mono">s / (v − 15) − s / v = 1,5</code></div>
            <div className="text-blue-950 font-semibold pt-1">
              A két egyenlet arányából adódik: <strong>v_busz = 75 km/h</strong>, <strong>s = 450 km</strong>.
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Így a személyautó átlagsebessége 90 km/h (5 óra alatt ér oda), a kisbuszé 75 km/h (6 óra alatt), a teherautóé 60 km/h (7,5 óra alatt).
          </p>
        </div>
      ),
      figure: <ThreeVehiclesSvg size={240} />
    },
    {
      id: 'card-concert-posters',
      title: '4. Zenekari Plakátok: Azonos Terület, Különböző Kerület',
      subtitle: 'Tankönyv 45. o. 4. feladat: Téglalapok dimenziói és arányai',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Három zenekar óriásplakátja azonos területű (<code className="bg-slate-100 font-mono px-1">T = xy</code>):
          </p>

          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs space-y-1.5">
            <div>• Béta plakát: (x + 4)(y − 2) = xy ⟹ xy − 2x + 4y − 8 = xy ⟹ <strong>−x + 2y = 4</strong></div>
            <div>• Gamma plakát: (x − 4)(y + 3) = xy ⟹ xy + 3x − 4y − 12 = xy ⟹ <strong>3x − 4y = 12</strong></div>
            <div className="text-purple-950 font-semibold pt-1">
              Az I. egyenletet 2-vel szorozva: −2x + 4y = 8. Hozzáadva a II-höz: x = 20 dm ⟹ y = 12 dm.
            </div>
            <div className="text-emerald-700 font-bold">
              Alfa: 20 × 12 dm (K = 64 dm) | Béta: 24 × 10 dm (K = 68 dm) | Gamma: 16 × 15 dm (K = 62 dm).
            </div>
          </div>
        </div>
      ),
      figure: <ConcertPostersSvg size={240} />
    },
    {
      id: 'card-market-grandma',
      title: '5. Nagymama a Piacon (Ár- és Kedvezménymérleg)',
      subtitle: 'Tankönyv 45. o. 2. feladat: Százalékos és törtrészes árképzés',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Nagymama lecsóhoz vásárol alapanyagokat:
          </p>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-1">
            <div>• 1. Árusnál: 1,5 kg paradicsom és 1 kg paprika = 850 Ft ⟹ <code className="font-mono font-bold">1,5x + y = 850</code></div>
            <div>• 2. Árusnál: paradicsom 1/3-ával olcsóbb (2/3 x), paprika 25%-kal drágább (1,25 y) ⟹ 50 Ft-tal kevesebb: <code className="font-mono font-bold">1,5·(2/3 x) + 1,25y = 800</code></div>
            <div>• Azaz: <code className="font-mono">x + 1,25y = 800</code>. Kivonva: <code className="font-mono">0,5x − 0,25y = 50</code>.</div>
            <div className="text-amber-950 font-bold pt-1">
              Megoldás: 1 kg paradicsom = 300 Ft, 1 kg paprika = 400 Ft ✓
            </div>
          </div>
        </div>
      ),
      figure: <MarketVegetablesSvg size={240} />
    },
    {
      id: 'card-two-factories',
      title: '6. Két Üzem Alkatrészgyártása (Munkafeladat)',
      subtitle: 'Tankönyv 45. o. 3. feladat: Megbetegedés és gépesítés hatása',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Két üzem 20 nap alatt 480 alkatrészt tervez készíteni (napi <code className="font-mono">x + y = 24 db</code>).
            5 nap után (120 db kész) a hátralévő 15 napra:
          </p>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1">
            <div>• A üzem termelése 28%-kal csökken ⟹ <code className="font-mono">0,72x</code></div>
            <div>• B üzem termelése 20%-kal nő ⟹ <code className="font-mono">1,2y</code></div>
            <div>• 15 nap alatt elkészül a maradék 360 db ⟹ <code className="font-mono">0,72x + 1,2y = 24 db/nap</code>.</div>
            <div className="text-emerald-950 font-bold pt-1">
              Megoldás: x = 10 db/nap (összesen 200 db), y = 14 db/nap (összesen 280 db).
            </div>
          </div>
        </div>
      ),
      figure: <TwoFactoriesSvg size={240} />
    }
  ];

  return (
    <TheoryTemplate
      title="5. Gyakorlás, Tudáspróba – Fejezeti Összefoglaló"
      subtitle="A 10. osztályos Egyenletrendszerek teljes tananyagának átfogó szintézise és záró felkészülése"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 11. LECKE"
      themeColor="rose"
      pdfFilename="10_osztaly_egyenletrendszerek_5_tudasproba.pdf"
      ruleTitle="A fejezeti összefoglaló alaptétele"
      ruleFormula="A szöveges feladatok megoldásának kulcsa a pontos modellalkotás és a kapott gyökök ellenőrzése az eredeti szöveg alapján!"
      practiceTitle="Készen állsz a 90 kérdéses fejezeti nagytesztre?"
      practiceSubtitle="Tedd próbára tudásodat mindhárom szinten a záró tudáspróbán!"
      cards={theoryCards}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      interactiveSection={
        <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <Award className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  Interaktív Labor: A Két Bolha Metszéspontja
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Változtasd a 2. bolha koordináta-összegét (C)! Figyeld meg, mikor adódik egész számú közös rácspont!
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              {isIntegerPoint ? 'Rácsponton metszik egymást (Egész koordináták) ✓' : 'Nem rácsponton metszik egymást'}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">2. bolha célösszege (x + y = C):</span>
              <span className="font-mono text-emerald-400 font-bold">{fleaTargetSum}</span>
            </div>
            <input
              type="range"
              min="1"
              max="16"
              step="1"
              value={fleaTargetSum}
              onChange={(e) => setFleaTargetSum(parseInt(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>C = 1</span>
              <span className="text-yellow-400 font-bold">C = 7 (Tankönyvi feladat)</span>
              <span>C = 16</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
              <div className="text-slate-400 uppercase font-bold">Egyenletrendszer:</div>
              <div className="text-rose-300">I.  y = 2x − 2  (1. bolha pályája)</div>
              <div className="text-cyan-300">II. x + y = {fleaTargetSum}  (2. bolha feltétele)</div>
              <div className="text-slate-400 pt-1">Összeadva: 2x − 2 = {fleaTargetSum} − x ⟹ 3x = {fleaTargetSum + 2}</div>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
              <div className="text-slate-400 uppercase font-bold">Közös pont koordinátái:</div>
              <div className="text-emerald-400 text-sm font-bold">
                x = {interX.toFixed(2)} | y = {interY.toFixed(2)}
              </div>
              <div className="text-slate-300 pt-1">
                {isIntegerPoint
                  ? `Valódi rácspont: M(${interX}; ${interY})!`
                  : `Tört koordináták: a bolhák csak egész rácspontokra ugranak, így nincs valódi találkozás!`}
              </div>
            </div>
          </div>
        </div>
      }
      tips={[
        {
          title: '30 feladat szintenként a magabiztos tudásért!',
          content: 'A tudáspróba 3 szintjén mind a 30-30 feladatot gondosan oldd meg: az 1. szint a stabil alapokat, a 2. szint az érettségi magabiztosságot, a 3. szint a versenyszintű készségeket mélyíti el.'
        },
        {
          title: 'A szöveges feladatoknál mindig ellenőrizz szöveg szerint is!',
          content: 'Nem elég, hogy a számpár kielégíti a levezetett egyenletet. Ellenőrizd, hogy a darabszám, liter, km/h pozitív-e, és reális-e a valóságban!'
        },
        {
          title: 'Ismerd fel az azonosságot és az ellentmondást egyetlen pillantásból!',
          content: 'Ha a bal oldalak aránya megegyezik a jobb oldalak arányával, 0 = 0 (végtelen sok mo.). Ha a bal oldalak arányosak, de a jobb oldalak nem, 0 = k (nincs megoldás).'
        }
      ]}
    />
  );
};

