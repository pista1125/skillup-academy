import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Award,
  BookOpen,
  Scale,
  Brain,
  Calculator,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Coins,
  Percent,
  Compass,
  Users,
  Footprints,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface Chapter3EquationsSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const Chapter3EquationsSummaryTheory: React.FC<Chapter3EquationsSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Modellválasztó Állapot ---
  const [selectedModel, setSelectedModel] = useState<
    'numbers' | 'ages' | 'mixture' | 'motion' | 'work' | 'geometry' | 'finance'
  >('numbers');

  // --- Mérlegelv Szimulátor Állapot ---
  const [balanceStep, setBalanceStep] = useState<number>(0);

  const balanceSteps = [
    {
      step: 0,
      title: 'Kiinduló Egyenlet',
      left: '3x + 5',
      right: 'x + 13',
      action: 'Vond le mindkét oldalból az x-et (-x)!',
      tip: 'A kisebb ismeretlent érdemes eltüntetni az egyik oldalról.'
    },
    {
      step: 1,
      title: '1. Lépés: x levonása mindkét oldalból',
      left: '2x + 5',
      right: '13',
      action: 'Vond le mindkét oldalból az 5-öt (-5)!',
      tip: 'Az ismeretlenes tagokat az egyik oldalon, a számokat a másikon gyűjtjük össze.'
    },
    {
      step: 2,
      title: '2. Lépés: 5 levonása mindkét oldalból',
      left: '2x',
      right: '8',
      action: 'Oszd el mindkét oldalt 2-vel (:2)!',
      tip: 'Az ismeretlen együtthatójával osztunk.'
    },
    {
      step: 3,
      title: '3. Lépés: Megoldás és Ellenőrzés',
      left: 'x',
      right: '4',
      action: 'Ellenőrzés: Bal = 3·4 + 5 = 17, Jobb = 4 + 13 = 17. Egyenlő!',
      tip: 'A kapott gyök x = 4. A mérleg egyensúlyban marad!'
    }
  ];

  return (
    <TheoryTemplate
      title="III. Fejezet: Egyenletek és Szöveges Feladatok Összefoglalása"
      subtitle="A mérlegelv, zárójeles és törtes egyenletek, valamint a 7 fő szöveges feladattípus teljes szintézise"
      badge="FEJEZETI TÉMAZÁRÓ ÖSSZEFOGLALÓ"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      estimatedTime="30 perc"
    >
      {/* 1. Szekció: A Szöveges Feladatmegoldás 4 Aranyszabálya */}
      <TheorySection
        number={1}
        title="A Szöveges Feladatmegoldás 4 Lépéses Módszere"
        icon={<Award className="w-5 h-5 text-amber-600" />}
        badge="Módszertan"
        badgeColor="amber"
      >
        <TheoryCard
          title="Hogyan Lesz a Hétköznapi Szövegből Megoldott Egyenlet?"
          badge="4 Lépéses Algoritmus"
          badgeColor="amber"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A 8. osztályos matematika és a középiskolai felvételi legfontosabb kompetenciája a szöveges problémák algebrai modellé alakítása. A sikeres megoldás minden esetben ezen a 4 fázison alapul:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-200">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs">1</span>
                  Értelmezés & Adatok
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Figyelmes elolvasás, adatok kigyűjtése, mértékegységek egyeztetése, táblázat vagy ábra készítése.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-blue-900 dark:text-blue-200">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs">2</span>
                  Ismeretlen & Modell
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ismeretlen (x) pontos meghatározása, többi mennyiség kifejezése x-szel, matematikai egyenlőség felírása.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-900 dark:text-emerald-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs">3</span>
                  Egyenlet Megoldása
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Mérlegelv alkalmazása: zárójelek felbontása, közös nevező, egynemű tagok összevonása, x kifejezése.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-purple-900 dark:text-purple-200">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-black text-xs">4</span>
                  Ellenőrzés & Válasz
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Visszahelyettesítés az <em>eredeti szövegbe</em> (nem a felírt egyenletbe!), és teljes, kerek szöveges válasz adása.
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szekció: Az Egyenletmegoldás Alapszabályai & Csapdái */}
      <TheorySection
        number={2}
        title="Egyenletmegoldási Szabályok és Tipikus Csapdák"
        icon={<Scale className="w-5 h-5 text-amber-600" />}
        badge="Algebrai Alapok"
        badgeColor="amber"
      >
        <TheoryCard
          title="A Mérlegelv és a Megoldhatóság Esetei"
          badge="Szabályok"
          badgeColor="amber"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  1. Egyetlen Megoldás
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  Amikor az egyenlet rendezése után az x egyértelmű értéket kap: <span className="font-mono font-bold text-amber-800 dark:text-amber-300">x = a</span>.
                </div>
                <div className="text-[11px] text-slate-500">Példa: 2x = 8 ⇒ x = 4.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  2. Azonosság (Végtelen sok)
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  Amikor mindkét oldal teljesen azonos: <span className="font-mono font-bold text-blue-800 dark:text-blue-300">0 · x = 0</span>.
                </div>
                <div className="text-[11px] text-slate-500">Minden valós szám megoldás: x ∈ ℝ.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  3. Ellentmondás (Nincs megoldás)
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  Amikor lehetetlen egyenlőségre jutunk: <span className="font-mono font-bold text-rose-800 dark:text-rose-300">0 · x = c (c ≠ 0)</span>.
                </div>
                <div className="text-[11px] text-slate-500">Nincs megoldás: x ∈ ∅.</div>
              </div>
            </div>

            <TheoryTrapBox
              title="A 3 Leggyakoribb Hibaforrás a Felvételin"
              icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
            >
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
                  <strong>1. Zárójel előtti mínusz előjel:</strong> Ha zárójel előtt mínusz áll, a zárójel felbontásakor MINDEN belső tag előjele megfordul! Pl. <span className="font-mono font-bold text-rose-700 dark:text-rose-300">-(3x - 7) = -3x + 7</span> (nem -3x - 7!).
                </div>
                <div>
                  <strong>2. Törtvonal előtti mínusz előjel:</strong> A törtvonal zárójelként funkcionál. Ha a tört előtt mínusz áll, a számláló összes tagjának előjele vált!
                </div>
                <div>
                  <strong>3. Törtes egyenlet kikötése:</strong> Nevezőben lévő ismeretlen esetén kötelező kikötni, hogy a nevező nem lehet 0! Pl. ha az egyenletben <span className="font-mono font-bold">1 / (x - 3)</span> szerepel, kikötés: <span className="font-mono font-bold text-amber-700 dark:text-amber-300">x ≠ 3</span>.
                </div>
              </div>
            </TheoryTrapBox>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szekció: A 7 Szöveges Feladattípus Modellkatalógusa */}
      <TheorySection
        number={3}
        title="A 7 Fő Szöveges Feladattípus Modellkatalógusa"
        icon={<BookOpen className="w-5 h-5 text-amber-600" />}
        badge="Átfogó Tár"
        badgeColor="amber"
      >
        <TheoryTable
          headers={['Feladattípus', 'Alapegyenlet / Képlet', 'Ismeretlenek Beállítása', 'Kulcs Szabály']}
          rows={[
            [
              '1. Számelméleti (Kétjegyű számok)',
              '10a + b (felcserélve: 10b + a)',
              'a: tízesek száma, b: egyesek száma',
              'A szám értéke a helyiértékek összege!'
            ],
            [
              '2. Életkoros feladványok',
              'Apa + x = k · (Fia + x)',
              'x: az eltelt évek száma',
              'A két ember közötti korkülönbség soha nem változik!'
            ],
            [
              '3. Keverés & Ötvözet',
              'm₁ · p₁ + m₂ · p₂ = m_ö · p_ö',
              'm: tömeg, p: tömegszázalék',
              'A tiszta oldott anyag tömege nem vész el!'
            ],
            [
              '4. Mozgásos feladatok',
              's = v · t (szembe: v₁ + v₂, utolérés: v₁ - v₂)',
              's: út, v: sebesség, t: idő',
              'Mértékegységek egyeztetése kötelező (km/h és óra)!'
            ],
            [
              '5. Munkavégzés & Csapok',
              '1/t₁ + 1/t₂ = 1/t_együtt',
              't: az önálló elvégzés ideje',
              'Az 1 óra (időegység) alatt elvégzett munkarészek adódnak össze!'
            ],
            [
              '6. Geometriai szöveges feladatok',
              'K = 2(a + b), T = a · b, α + β + γ = 180°',
              'Oldalak, szögek kifejezése x-szel',
              'A háromszög belső szögeinek összege mindig 180°!'
            ],
            [
              '7. Pénzügyi feladatok & Kamat',
              'K = (T · p · t) / 100, Új ár = x · q₁ · q₂',
              'T: tőke, p: kamatláb, t: évek',
              'Az árváltozások szorzótényezői láncolódnak, nem adódnak össze!'
            ]
          ]}
        />
      </TheorySection>

      {/* 4. Szekció: Interaktív Modellválasztó és Mérlegelv Laboratórium */}
      <TheorySection
        number={4}
        title="Interaktív Modellválasztó és Mérlegelv Laboratórium"
        icon={<Sliders className="w-5 h-5 text-amber-600" />}
        badge="Interaktív Gyakorló"
        badgeColor="amber"
      >
        <TheoryCard
          title="Gyakorlati Szimuláció és Lépésről Lépésre Levezetés"
          badge="Labor"
          badgeColor="amber"
        >
          <div className="space-y-6">
            {/* 1. Labor Fül: Modellválasztó */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-4">
              <div className="text-xs uppercase font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-600" />
                Válassz egy modellt az azonnali mintalevezetéshez:
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'numbers', label: '1. Számok', icon: <Calculator className="w-3.5 h-3.5" /> },
                  { id: 'ages', label: '2. Életkor', icon: <Users className="w-3.5 h-3.5" /> },
                  { id: 'mixture', label: '3. Keverés', icon: <Percent className="w-3.5 h-3.5" /> },
                  { id: 'motion', label: '4. Mozgás', icon: <Footprints className="w-3.5 h-3.5" /> },
                  { id: 'work', label: '5. Munka', icon: <Compass className="w-3.5 h-3.5" /> },
                  { id: 'geometry', label: '6. Geometria', icon: <Compass className="w-3.5 h-3.5" /> },
                  { id: 'finance', label: '7. Pénzügy', icon: <Coins className="w-3.5 h-3.5" /> }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedModel(item.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedModel === item.id
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-amber-200 hover:bg-amber-100/50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Modell részletei */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 space-y-2.5 text-xs">
                {selectedModel === 'numbers' && (
                  <>
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Számelméleti minta: Kétjegyű szám számjegyeinek felcserélése
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Egy kétjegyű számban a tízesek száma 3-mal nagyobb az egyesekénél. Ha a számjegyeket felcseréljük, az új szám 27-tel kisebb lesz.
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-slate-800 font-mono text-amber-950 dark:text-amber-100 space-y-1">
                      <div>Eredeti szám: 10(x + 3) + x = 11x + 30</div>
                      <div>Felcserélt szám: 10x + (x + 3) = 11x + 3</div>
                      <div>Egyenlet: (11x + 30) - (11x + 3) = 27 (Azonosság, minden ilyen kétjegyű számra igaz: 41, 52, 63, 74, 85, 96!)</div>
                    </div>
                  </>
                )}

                {selectedModel === 'ages' && (
                  <>
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Életkoros minta: Apa és fia életkora x év múlva
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Apa most 42 éves, fia 14 éves. Hány év múlva lesz apa életkora pontosan kétszerese a fiáénak?
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-slate-800 font-mono text-amber-950 dark:text-amber-100 space-y-1">
                      <div>Egyenlet: 42 + x = 2 · (14 + x)</div>
                      <div>42 + x = 28 + 2x ⇒ x = 14 év múlva!</div>
                      <div>Ellenőrzés: 14 év múlva apa 56 éves, fia 28 éves. 56 = 2 · 28!</div>
                    </div>
                  </>
                )}

                {selectedModel === 'mixture' && (
                  <>
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Keverési minta: Két oldat összeöntése
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      3 kg 20%-os cukoroldatot összekeverünk 5 kg 40%-os cukoroldattal. Hány százalékos lesz a keverék?
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-slate-800 font-mono text-amber-950 dark:text-amber-100 space-y-1">
                      <div>Tiszta cukor: 3 · 20 + 5 · 40 = 60 + 200 = 260</div>
                      <div>Össztömeg: 3 + 5 = 8 kg</div>
                      <div>Százalék: p = 260 / 8 = 32,5% cukortartalom!</div>
                    </div>
                  </>
                )}

                {selectedModel === 'motion' && (
                  <>
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Mozgásos minta: Két jármű szemből indul
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Két város távolsága 300 km. Egyszerre indul szemből egy 60 km/h-s és egy 90 km/h-s autó. Mikor találkoznak?
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-slate-800 font-mono text-amber-950 dark:text-amber-100 space-y-1">
                      <div>Relatív sebesség szemből: v_összes = 60 + 90 = 150 km/h</div>
                      <div>Egyenlet: 150 · t = 300 ⇒ t = 2 óra múlva találkoznak!</div>
                      <div>Megtett utak: 60 · 2 = 120 km és 90 · 2 = 180 km (120 + 180 = 300 km).</div>
                    </div>
                  </>
                )}

                {selectedModel === 'work' && (
                  <>
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Munkavégzési minta: Két csap együttes töltése
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Az egyik csap 4 óra, a másik 6 óra alatt tölti meg a medencét. Mennyi idő alatt töltik meg együtt?
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-slate-800 font-mono text-amber-950 dark:text-amber-100 space-y-1">
                      <div>1 óra alatt elvégzett munka: 1/4 + 1/6 = 3/12 + 2/12 = 5/12 rész</div>
                      <div>Együttes idő: t = 12 / 5 = 2,4 óra = 2 óra 24 perc!</div>
                    </div>
                  </>
                )}

                {selectedModel === 'geometry' && (
                  <>
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Geometriai minta: Téglalap oldalai és kerülete
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Egy téglalap egyik oldala 4 cm-rel hosszabb a másiknál. A téglalap kerülete 48 cm. Mekkorák az oldalai?
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-slate-800 font-mono text-amber-950 dark:text-amber-100 space-y-1">
                      <div>Oldalak: a = x, b = x + 4</div>
                      <div>Kerület: 2 · (x + x + 4) = 48 ⇒ 4x + 8 = 48 ⇒ 4x = 40 ⇒ x = 10 cm</div>
                      <div>Oldalak hossza: 10 cm és 14 cm. Terület: 10 · 14 = 140 cm²!</div>
                    </div>
                  </>
                )}

                {selectedModel === 'finance' && (
                  <>
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      Pénzügyi minta: Áremelés majd leárazás láncolása
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Egy 40 000 Ft-os terméket 20%-kal megemeltek, majd az új árat 25%-kal csökkentették. Mennyi lett a végső ár?
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-slate-800 font-mono text-amber-950 dark:text-amber-100 space-y-1">
                      <div>Láncszorzás: 40 000 · 1,20 · 0,75 = 40 000 · 0,90 = 36 000 Ft</div>
                      <div>Az ár az eredetinek 90%-a lett ⇒ 10%-kal csökkent az eredeti árhoz képest!</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 2. Labor Fül: Mérlegelv Lépegető */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-600" />
                  Mérlegelv Szimulátor: {balanceSteps[balanceStep].title}
                </div>
                <span className="text-xs font-mono font-bold text-amber-600">
                  {balanceStep + 1} / {balanceSteps.length} Lépés
                </span>
              </div>

              {/* Vizuális mérleg */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center justify-center gap-6 w-full max-w-md">
                  <div className="flex-1 p-3 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-center font-mono font-black text-lg text-amber-900 dark:text-amber-200">
                    {balanceSteps[balanceStep].left}
                  </div>
                  <div className="text-2xl font-black text-slate-400">=</div>
                  <div className="flex-1 p-3 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center font-mono font-black text-lg text-emerald-900 dark:text-emerald-200">
                    {balanceSteps[balanceStep].right}
                  </div>
                </div>

                <div className="text-xs text-center text-slate-600 dark:text-slate-300 font-medium">
                  <strong>Végrehajtott művelet:</strong> {balanceSteps[balanceStep].action}
                </div>

                <div className="text-[11px] text-center text-amber-700 dark:text-amber-300 italic">
                  💡 {balanceSteps[balanceStep].tip}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setBalanceStep(prev => Math.max(0, prev - 1))}
                  disabled={balanceStep === 0}
                  className="text-xs"
                >
                  Előző Lépés
                </Button>
                <Button
                  size="sm"
                  onClick={() => setBalanceStep(prev => Math.min(balanceSteps.length - 1, prev + 1))}
                  disabled={balanceStep === balanceSteps.length - 1}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs"
                >
                  Következő Lépés
                </Button>
                {balanceStep === balanceSteps.length - 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setBalanceStep(0)}
                    className="text-xs text-slate-500"
                  >
                    Újrakezdés
                  </Button>
                )}
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szekció: Kétismeretlenes Egyenletrendszerek Rendszerezése */}
      <TheorySection
        number={5}
        title="Kétismeretlenes Lineáris Egyenletrendszerek"
        icon={<Compass className="w-5 h-5 text-amber-600" />}
        badge="Egyenletrendszerek"
        badgeColor="amber"
      >
        <TheoryCard
          title="A Két Fő Megoldási Stratégia"
          badge="Módszertan"
          badgeColor="amber"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Ha a szöveges feladatban két független feltétel szerepel két ismeretlennel (pl. fejek száma és lábak száma, vagy jegyek száma és bevétel), kétismeretlenes egyenletrendszert írunk fel:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="font-bold text-blue-900 dark:text-blue-200">
                  1. Behelyettesítő Módszer
                </div>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-1">
                  <div>Az egyik egyenletből kifejezzük az egyik ismeretlent (pl. y = 40 - x), és behelyettesítjük a másik egyenletbe.</div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-blue-800 dark:text-blue-300">
                    2x + 4(40 - x) = 110 ⇒ x azonnal kiszámítható!
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-2">
                <div className="font-bold text-emerald-900 dark:text-emerald-200">
                  2. Egyenlő Együtthatók (Összeadás)
                </div>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-1">
                  <div>Az egyenleteket beszorozzuk úgy, hogy az egyik ismeretlen együtthatója egymás ellentettje legyen, majd összeadjuk a két egyenletet.</div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-emerald-800 dark:text-emerald-300">
                    (x + y = 50) + (x - y = 14) ⇒ 2x = 64 ⇒ x = 32!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Chapter3EquationsSummaryTheory;
