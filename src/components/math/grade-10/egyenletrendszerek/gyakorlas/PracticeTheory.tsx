import React, { useState } from 'react';
import { TheoryTemplate, TheoryCardItem } from '../TheoryTemplate';
import {
  StrategyDecisionTreeSvg,
  WineBarrelsSvg,
  CircularMotionSvg,
  ForestGridSvg,
  BuffetReceiptSvg,
  ParametricSystemsSvg
} from './PracticeFigures';
import { Calculator, CheckCircle2, AlertCircle, Compass, Zap, Target } from 'lucide-react';

interface PracticeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticeTheory: React.FC<PracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív paraméter-vizsgáló állapot:
  // I.  2x + p·y = 6
  // II. 4x + 6y = q
  const [paramP, setParamP] = useState<number>(3);
  const [paramQ, setParamQ] = useState<number>(12);

  // Determináns: 2·6 - 4·p = 12 - 4p
  const det = 12 - 4 * paramP;

  let parametricStatus = '';
  let statusBadgeColor = '';
  let detailsText = '';

  if (Math.abs(det) > 0.001) {
    parametricStatus = 'Pontosan 1 megoldáspár (Metsző egyenesek)';
    statusBadgeColor = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
    const yVal = (2 * paramQ - 24) / (-4 * paramP + 12);
    const xVal = (6 - paramP * yVal) / 2;
    detailsText = `p ≠ 3 ⟹ x = ${xVal.toFixed(2)}, y = ${yVal.toFixed(2)}`;
  } else {
    // det === 0, vizsgáljuk q-t: 4x + 6y = 2·(2x + 3y) = 2·6 = 12
    if (Math.abs(paramQ - 12) < 0.001) {
      parametricStatus = 'Végtelen sok megoldás (Egybeeső egyenesek, 0 = 0)';
      statusBadgeColor = 'border-blue-500/30 bg-blue-500/10 text-blue-300';
      detailsText = 'A II. egyenlet pontosan 2-szerese az I. egyenletnek (Azonosság).';
    } else {
      parametricStatus = 'Nincs megoldás (Párhuzamos egyenesek, 0 = ellentmondás)';
      statusBadgeColor = 'border-rose-500/30 bg-rose-500/10 text-rose-300';
      detailsText = `Kivonás után: 0 = ${paramQ - 12} (Ellentmondás, üres halmaz ∅).`;
    }
  }

  const theoryCards: TheoryCardItem[] = [
    {
      id: 'card-strategy-selection',
      title: '1. A Leghatékonyabb Módszer Kiválasztása',
      subtitle: 'Hogyan spórolhatsz időt és kerülheted el a törtes számolást?',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Bármely lineáris egyenletrendszer megoldható elvileg behelyettesítéssel és eliminációval is,
            de a feladat jellegétől függően az egyik sokkal gyorsabb és kevesebb hibalehetőséget rejt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="font-bold text-purple-900 block mb-1">Behelyettesítés, ha:</span>
              <span>Van olyan ismeretlen, amelynek együtthatója <strong>1 vagy −1</strong> (pl. <code className="font-mono">x + 3y = 7</code>).</span>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="font-bold text-blue-900 block mb-1">Elimináció, ha:</span>
              <span>Minden együttható 1-nél nagyobb egész, de kis egész szorzókkal kiejthető (pl. <code className="font-mono">2x + 3y</code> és <code className="font-mono">4x − y</code>).</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="font-bold text-amber-900 block mb-1">Közös nevező, ha:</span>
              <span>Törtes együtthatók szerepelnek: <strong>mindig szorozzunk be a legkisebb közös többszörössel</strong> rögtön az elején!</span>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Tankönyvi példa (42. o.): <code className="font-mono">7x + 4y = −10</code> és <code className="font-mono">8y − 9x = 210</code> esetén rendezzük oszlopokba a tagokat (<code className="font-mono">−9x + 8y = 210</code>), és szorozzuk az I. egyenletet 2-vel!
          </p>
        </div>
      ),
      figure: <StrategyDecisionTreeSvg size={240} />
    },
    {
      id: 'card-parametric-analysis',
      title: '2. Paraméteres Egyenletrendszerek Elemzése',
      subtitle: 'Milyen p valós paraméter esetén van 1, 0 vagy végtelen sok gyök?',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Paraméteres vizsgálatnál az ismeretlenek együtthatói vagy a konstans tagok egy <code className="bg-slate-100 font-mono text-pink-600 px-1">p</code> valós
            számtól függenek.
          </p>

          <div className="p-3 bg-slate-100 rounded-lg border border-slate-300 text-xs font-mono space-y-1">
            <div className="text-slate-900 font-bold">Standard alak:</div>
            <div>I.  a₁x + b₁y = c₁</div>
            <div>II. a₂x + b₂y = c₂</div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-0.5"></span>
              <span><strong>1 megoldáspár:</strong> <code className="font-mono">a₁/a₂ ≠ b₁/b₂</code> (az együtthatók aránya nem egyezik, a két egyenes metszi egymást).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-0.5"></span>
              <span><strong>0 megoldás (∅):</strong> <code className="font-mono">a₁/a₂ = b₁/b₂ ≠ c₁/c₂</code> (az egyenesek párhuzamosak, ellentmondás: 0 = k).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-0.5"></span>
              <span><strong>Végtelen sok megoldás:</strong> <code className="font-mono">a₁/a₂ = b₁/b₂ = c₁/c₂</code> (az egyenesek egybeesnek, azonosság: 0 = 0).</span>
            </div>
          </div>
        </div>
      ),
      figure: <ParametricSystemsSvg size={240} />
    },
    {
      id: 'card-buffet-and-furniture',
      title: '3. Érettségi Típusfeladatok: Büfé és Vásárlás',
      subtitle: 'Valós árak és kedvezmények modellezése (2006, 2018 érettségi)',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Az érettségi vizsgákon gyakran szerepelnek olyan kétismeretlenes feladatok, ahol a vásárolt tételek
            mennyisége vagy ára változik meg.
          </p>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-1.5">
            <div className="font-bold text-amber-900">Péter és Pál a büfében (2018):</div>
            <div>• Péter: 2 szendvics + 2 víz = 740 Ft ⟹ <code className="font-mono font-bold">sz + v = 370 Ft</code></div>
            <div>• Pál: 3 szendvics + 1 víz = 890 Ft</div>
            <div className="text-amber-950 font-semibold pt-1">
              (3sz + v) − (sz + v) = 2sz = 520 Ft ⟹ <strong>1 szendvics = 260 Ft</strong>, <strong>1 víz = 110 Ft</strong> ✓
            </div>
          </div>

          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs space-y-1.5">
            <div className="font-bold text-purple-900">Bútorvásárlás leértékeléssel (2006):</div>
            <div>3 asztal és 14 szék eredetileg 99 000 Ft: <code className="font-mono">3a + 14sz = 99 000</code></div>
            <div>Asztal 20%-kal olcsóbb (0,8a), szék 1/3-ával olcsóbb (2/3 sz): <code className="font-mono">0,8(3a) + (2/3)(14sz) = 70 800</code></div>
            <div className="text-purple-950 font-semibold pt-1">
              Megoldás: <strong>1 asztal = 19 000 Ft</strong>, <strong>1 szék = 3 000 Ft</strong> ✓
            </div>
          </div>
        </div>
      ),
      figure: <BuffetReceiptSvg size={240} />
    },
    {
      id: 'card-forest-grid',
      title: '4. Erdőgazdaság Parcellái: Négyzetrácsos Téglalap-modellek',
      subtitle: 'Sorok és oszlopok szorzata, a másodfokú tagok kiejtése',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Amikor egy parcella, terem vagy nézőtér elrendezését vizsgáljuk, a teljes darabszám a sorok száma
            és a soronkénti egyedek szorzata: <code className="bg-slate-100 font-mono px-1">Összes = x · y</code>.
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
            <div className="font-bold text-slate-800">A felírt egyenletek az erdőgazdaságban (42. o.):</div>
            <div>• Tölgy: (x − 4)(y − 5) = xy − 360 ⟹ xy − 5x − 4y + 20 = xy − 360 ⟹ <strong>5x + 4y = 380</strong></div>
            <div>• Platán: (x + 3)(y + 2) = xy + 228 ⟹ xy + 2x + 3y + 6 = xy + 228 ⟹ <strong>2x + 3y = 222</strong></div>
          </div>

          <p className="text-sm">
            Kiküszöbölve x-et (I · 2, II · 5): <code className="font-mono">10x + 8y = 760</code> és <code className="font-mono">10x + 15y = 1110</code>.
            Kivonva: <code className="font-mono">7y = 350 ⟹ y = 50 fa/sor</code>, és <code className="font-mono">x = 36 sor</code>.
            Összesen <strong>1800 fenyőfa</strong> volt a kiinduló parcellában!
          </p>
        </div>
      ),
      figure: <ForestGridSvg size={240} />
    },
    {
      id: 'card-wine-barrels',
      title: '5. Két Hordó Bor: Öntögetési és Megfordításos Problémák',
      subtitle: 'Visszafelé következtetés és algebrai mérlegegyenlet (Tankönyv 43. o.)',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Az öntögetéses feladatoknál a teljes folyadékmennyiség nem változik, csak átcsoportosul a tárolók között.
          </p>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1">
            <div className="font-bold text-rose-900">Két lépés követése (összesen 480 liter):</div>
            <div>1. A-ból B-be annyit, amennyi B-ben volt: A-ban marad <code className="font-mono">x − y</code>, B-ben lesz <code className="font-mono">2y</code>.</div>
            <div>2. B-ből A-ba annyit, amennyi A-ban maradt: A megduplázódik: <code className="font-mono">2(x − y)</code>, B csökken: <code className="font-mono">2y − (x − y) = 3y − x</code>.</div>
            <div className="text-rose-950 font-semibold pt-1">
              A végén egyenlők: 2x − 2y = 3y − x ⟹ 3x = 5y. Mivel x + y = 480 ⟹ <strong>x = 300 liter és y = 180 liter</strong>.
            </div>
          </div>

          <p className="text-xs text-slate-600">
            <strong>Gondolkozz visszafelé:</strong> A végén mindkettőben 240 liter van. Előtte A-ban 120 l volt (mert most duplázódott), így B-ben 360 l volt. A legelső lépés előtt B-ben ennek a fele, vagyis 180 l volt, A-ban pedig 480 − 180 = 300 liter!
          </p>
        </div>
      ),
      figure: <WineBarrelsSvg size={240} />
    },
    {
      id: 'card-circular-motion',
      title: '6. Körpályán Haladó Mozgások',
      subtitle: 'Relatív sebesség: Szembe haladva (v₁ + v₂), egy irányba haladva (v₁ − v₂)',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Körpályán szemközti pontokból induló testeknél a köztük lévő kezdeti távolság a kerület fele:
            <code className="bg-slate-100 font-mono px-1">s₀ = K / 2 = 1500 m</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="font-bold text-blue-900 block mb-1">Egymással szembe:</span>
              <span>A relatív sebesség az összegük:</span>
              <div className="font-mono font-bold text-blue-950 mt-1">(v₁ + v₂) · p = 1500</div>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <span className="font-bold text-indigo-900 block mb-1">Egy irányba:</span>
              <span>A gyorsabb elhúz a lassabbtól (különbség):</span>
              <div className="font-mono font-bold text-indigo-950 mt-1">(v₁ − v₂) · 15p = 1500</div>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            A két egyenletből: <code className="font-mono">v₁ + v₂ = 15(v₁ − v₂) ⟹ 14v₁ = 16v₂ ⟹ v₁ = 8/7 v₂</code>.
          </p>
        </div>
      ),
      figure: <CircularMotionSvg size={240} />
    }
  ];

  return (
    <TheoryTemplate
      title="4. Gyakorlás – Feladatmegoldási Stratégiák"
      subtitle="Módszerválasztás, paraméteres rendszerek, érettségi és logikai szöveges problémák"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 10. LECKE"
      themeColor="amber"
      pdfFilename="10_osztaly_egyenletrendszerek_4_gyakorlas.pdf"
      ruleTitle="A stratégiaválasztás alapszabálya"
      ruleFormula="1-es együttható esetén behelyettesítés, azonos együtthatóknál kivonás, törteknél azonnali beszorzás a legkisebb közös többszörössel!"
      practiceTitle="Készen állsz a stratégiai feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses gyakorló kvízben!"
      cards={theoryCards}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      interactiveSection={
        <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
                  <Calculator className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  Interaktív Labor: Paraméteres Rendszer Viselkedése
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Állítsd a p és q paramétert az I. (2x + py = 6) és II. (4x + 6y = q) egyenletben, és figyeld a megoldásszámot!
              </p>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${statusBadgeColor}`}>
              {parametricStatus}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Csúszka: p paraméter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">p paraméter (y együtthatója az I-ben):</span>
                <span className="font-mono text-purple-400 font-bold">{paramP}</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={paramP}
                onChange={(e) => setParamP(parseFloat(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0</span>
                <span className="text-yellow-400 font-bold">3 (kritikus)</span>
                <span>6</span>
              </div>
            </div>

            {/* 2. Csúszka: q konstans tag a II-ben */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">q konstans (jobb oldal a II-ben):</span>
                <span className="font-mono text-cyan-400 font-bold">{paramQ}</span>
              </div>
              <input
                type="range"
                min="6"
                max="18"
                step="1"
                value={paramQ}
                onChange={(e) => setParamQ(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>6</span>
                <span className="text-blue-400 font-bold">12 (dupla)</span>
                <span>18</span>
              </div>
            </div>
          </div>

          {/* Részletek és magyarázat */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2 font-mono text-xs">
            <div className="text-slate-400">
              Egyenletrendszer alakja:
            </div>
            <div className="space-y-1 text-slate-200">
              <div>I.  2x + {paramP}y = 6</div>
              <div>II. 4x + 6y = {paramQ}</div>
            </div>
            <div className="pt-2 border-t border-slate-700/60 text-slate-300">
              Determináns: 2·6 − 4·({paramP}) = <span className="font-bold text-yellow-300">{det}</span> | {detailsText}
            </div>
          </div>
        </div>
      }
      tips={[
        {
          title: 'Ha egyismeretlenesre tudsz egyszerűsíteni egyetlen lépésben, tedd meg!',
          content: 'Például ha látod, hogy az egyik egyenletben x + y = 6, a másikban 2(x + y) + 3z = 18, akkor ne bonts zárójelet: írd be egyben az (x + y) helyére a 6-ot!'
        },
        {
          title: 'Szöveges feladatoknál készíts táblázatot vagy vázlatot!',
          content: 'Öntögetésnél, parcelláknál vagy lovasoknál a kezdeti és a megváltozott állapotok sorba rendezése azonnal kiadja az egyenleteket.'
        },
        {
          title: 'Ellenőrzés: mindkét eredeti egyenletbe helyettesíts vissza!',
          content: 'Gyakori hiba, hogy csak az egyik egyenletbe írjuk vissza a kapott számpárt. Mindkét egyenletnek egyidejűleg teljesülnie kell!'
        }
      ]}
    />
  );
};

