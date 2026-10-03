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
  FlaskConical,
  Droplets,
  Flame,
  Scale,
  Sparkles,
  Calculator,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Percent,
  Thermometer,
  Waves
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface MixingWordProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const MixingWordProblemsTheory: React.FC<MixingWordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Labor Állapotok ---
  const [activeTab, setActiveTab] = useState<'mixing' | 'dilution'>('mixing');

  // TAB 1: Két oldat keverése
  const [m1, setM1] = useState<number>(300); // gramm
  const [p1, setP1] = useState<number>(10);  // %
  const [m2, setM2] = useState<number>(200); // gramm
  const [p2, setP2] = useState<number>(35);  // %

  const solute1 = (m1 * p1) / 100;
  const solute2 = (m2 * p2) / 100;
  const totalMass = m1 + m2;
  const totalSolute = solute1 + solute2;
  const resultingPercent = totalMass > 0 ? (totalSolute / totalMass) * 100 : 0;

  // TAB 2: Hígítás / Töményítés
  const [baseMass, setBaseMass] = useState<number>(400); // gramm
  const [basePercent, setBasePercent] = useState<number>(25); // %
  const [processType, setProcessType] = useState<'water' | 'solute' | 'evaporate'>('water');
  const [addedMass, setAddedMass] = useState<number>(100); // gramm

  let finalMass = baseMass;
  let finalSolute = (baseMass * basePercent) / 100;

  if (processType === 'water') {
    finalMass = baseMass + addedMass;
    // finalSolute változatlan
  } else if (processType === 'solute') {
    finalMass = baseMass + addedMass;
    finalSolute = finalSolute + addedMass;
  } else if (processType === 'evaporate') {
    const safeEvap = Math.min(addedMass, baseMass - finalSolute - 10);
    finalMass = Math.max(finalSolute + 1, baseMass - safeEvap);
    // finalSolute változatlan
  }

  const finalPercent = finalMass > 0 ? (finalSolute / finalMass) * 100 : 0;

  return (
    <TheoryTemplate
      title="Szöveges Feladatok: Keverések és Elegyek"
      subtitle="Az oldott anyag megmaradásának törvénye, tömegszázalék, hígítás, töményítés és karátos ötvözetek a 8. osztályos matematikában"
      badgeText="8. OSZTÁLY • III. EGYENLETEK • 💡 TANANYAG"
      pdfFilename="8_osztaly_keveresi_szoveges_feladatok.pdf"
      themeColor="teal"
      quickRule={{
        label: "A Keverési Feladatok Alapvető Megmaradási Törvénye",
        formula: "m₁ · p₁ + m₂ · p₂ = (m₁ + m₂) · p_keverék   (Tiszta anyagok összege állandó)"
      }}
      practiceTitle="Készen állsz a keverési feladatok megoldására?"
      practiceSubtitle="Gyakorold be a 30 kérdéses, 3 szintű kvízben, és tedd próbára a tudásod a beépített kártyapárosítóval és csoportosítóval!"
      practiceButtonText="Keverési Feladatok Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. Szekció: A Keverési Feladatok Alapelve és a Megmaradási Törvény */}
      <TheorySection
        number={1}
        title="A Keverési Feladatok Alapelve és a Megmaradási Törvény"
        icon={<FlaskConical className="w-5 h-5 text-teal-600" />}
        badge="Alapfogalmak"
        badgeColor="teal"
      >
        <TheoryCard
          title="Mi történik valójában, amikor oldatokat vagy ötvözeteket keverünk össze?"
          badge="A Megmaradás Törvénye"
          badgeColor="teal"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A keverési feladatok a 8. osztályos matematika és fizika-kémia egyik leggyakoribb, legfontosabb témakörei.
              Bár a feladatok sokfélék lehetnek (sóoldatok, cukros tea, ecet, alkohol, arany ékszerek vagy rézötvözetek),{' '}
              <strong className="text-teal-700 dark:text-teal-300">
                minden keverési feladat mögött pontosan ugyanaz az egyetlen fizikai-matematikai alaptörvény áll
              </strong>:
            </p>

            <TheoryCallout
              variant="teal"
              title="A Tiszta Anyag (Oldott Anyag / Tiszta Fém) Megmaradásának Törvénye"
              icon={<Scale className="w-5 h-5 text-teal-600" />}
            >
              <div className="text-center font-bold text-slate-800 dark:text-slate-100 py-2">
                <span className="text-teal-700 dark:text-teal-300">1. oldat tiszta anyaga</span>
                {' + '}
                <span className="text-teal-700 dark:text-teal-300">2. oldat tiszta anyaga</span>
                {' = '}
                <span className="text-teal-700 dark:text-teal-300">Keverék tiszta anyaga</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-1">
                Összekeverés közben tiszta só, cukor vagy arany magától sem nem keletkezik, sem el nem tűnik!
              </p>
            </TheoryCallout>

            {/* 3 Oszlopos Modell Áttekintés */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20">
                <div className="flex items-center gap-2 font-bold text-xs text-teal-800 dark:text-teal-300 mb-1">
                  <Droplets className="w-4 h-4 text-teal-600" />
                  Oldat és Komponensek
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Az oldat két részből áll: <strong>oldószerből</strong> (többnyire víz) és{' '}
                  <strong>oldott anyagból</strong> (só, cukor, sav).
                  <br />
                  <span className="font-mono text-teal-700 dark:text-teal-300 text-[11px] block mt-1">
                    m_oldat = m_oldószer + m_oldott
                  </span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-1">
                  <Percent className="w-4 h-4 text-emerald-600" />
                  Tömegszázalék (p%)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Azt fejezi ki, hogy az oldat 100 grammjában hány gramm tiszta oldott anyag van:
                  <br />
                  <span className="font-mono text-emerald-700 dark:text-emerald-300 text-[11px] inline-flex items-center gap-1 mt-1">
                    <span>p% =</span>
                    <Fraction num="m_oldott" den="m_oldat" size="sm" />
                    <span>· 100%</span>
                  </span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20">
                <div className="flex items-center gap-2 font-bold text-xs text-blue-800 dark:text-blue-300 mb-1">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  Tiszta Anyag Tömeg
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ha ismerjük az oldat tömegét (<MathText>m</MathText>) és töménységét (<MathText>p%</MathText>), a tiszta só tömege:
                  <br />
                  <span className="font-mono text-blue-700 dark:text-blue-300 text-[11px] inline-flex items-center gap-1 mt-1">
                    <span>m_tiszta = m ·</span>
                    <Fraction num="p" den="100" size="sm" />
                  </span>
                </p>
              </div>
            </div>

            {/* A Keverési Alapegyenlet Levezetése */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60">
              <h4 className="text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
                A Keverési Alapegyenlet Levezetése
              </h4>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="flex items-center gap-1">
                  <span>1. Az 1. edényben lévő tiszta só:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-100 inline-flex items-center gap-0.5">
                    <span>m₁ ·</span>
                    <Fraction num="p₁" den="100" size="sm" />
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>2. A 2. edényben lévő tiszta só:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-100 inline-flex items-center gap-0.5">
                    <span>m₂ ·</span>
                    <Fraction num="p₂" den="100" size="sm" />
                  </span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span>3. A keverék össztömege</span>
                  <span className="font-mono font-bold text-teal-600">m_ö = m₁ + m₂</span>
                  <span>, benne lévő tiszta só:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-100 inline-flex items-center gap-0.5">
                    <span>(m₁ + m₂) ·</span>
                    <Fraction num="p_ö" den="100" size="sm" />
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  Felírjuk az egyenlőséget, majd beszorzunk 100-zal, hogy eltűnjenek a törtek:
                  <div className="my-2 p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 text-center font-mono font-black text-sm text-teal-900 dark:text-teal-200">
                    m₁ · p₁ + m₂ · p₂ = (m₁ + m₂) · p_keverék
                  </div>
                  <span className="text-[11px] text-slate-500 italic block text-center">
                    Ez a legegyszerűbb, legáttekinthetőbb alak: nem kell tizedestörtekkel bajlódni!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szekció: Speciális Esetek: Hígítás, Töményítés és Elpárologtatás */}
      <TheorySection
        number={2}
        title="Speciális Esetek: Hígítás (0%), Töményítés (100%) és Elpárologtatás"
        icon={<Droplets className="w-5 h-5 text-teal-600" />}
        badge="Gyakori Esetek"
        badgeColor="teal"
      >
        <TheoryCard
          title="A 3 Különleges Határeset a Keverési Feladatokban"
          badge="Modellezés"
          badgeColor="teal"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Gyakran nem két különböző oldatot öntünk össze, hanem tiszta vizet adunk az oldathoz (hígítás), tiszta sót/cukrot oldunk fel benne (töményítés), vagy vizet párologtatunk el.
              A nagyszerű hír az, hogy <strong className="text-teal-700 dark:text-teal-300">nem kell új képleteket megtanulnod</strong>: ugyanez a keverési egyenlet tökéletesen működik!
            </p>

            <TheoryTable
              headers={['Esemény', 'Hozzáadott / Elvett anyag', 'Töménység (p)', 'Egyenletbeli Tag', 'Hatás a keverékre']}
              rows={[
                [
                  '1. Hígítás vízzel',
                  'Tiszta víz hozzáadása (m_víz)',
                  'p = 0%',
                  'm_víz · 0 = 0',
                  'Az össztömeg nő, a töménység csökken'
                ],
                [
                  '2. Töményítés tiszta anyaggal',
                  'Tiszta só / cukor hozzáadása (m_só)',
                  'p = 100%',
                  'm_só · 100',
                  'Az össztömeg nő, a töménység meredeken nő'
                ],
                [
                  '3. Víz elpárologtatása',
                  'Víz távozik gőz formájában (m_elp)',
                  'p = 0%',
                  'm_új = m_eredeti - m_elp',
                  'A tiszta só változatlan marad, az oldat sűrűbb lesz'
                ]
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/60">
                <div className="flex items-center gap-2 text-xs font-black text-sky-800 dark:text-sky-300 mb-1">
                  <Droplets className="w-4 h-4 text-sky-600" />
                  Hígítás Példa (p = 0%)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  500 g 20%-os sóoldathoz 300 g tiszta vizet adunk.
                  <br />
                  <span className="font-mono text-slate-700 dark:text-slate-300 block my-1">
                    500 · 20 + 300 · 0 = (500 + 300) · p_új
                  </span>
                  <span className="font-mono text-sky-700 dark:text-sky-300 font-bold block">
                    10 000 + 0 = 800 · p_új  →  p_új = 12,5%
                  </span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
                <div className="flex items-center gap-2 text-xs font-black text-amber-800 dark:text-amber-300 mb-1">
                  <Flame className="w-4 h-4 text-amber-600" />
                  Elpárologtatás Példa
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  600 g 10%-os oldatból elpárologtatunk 200 g vizet.
                  <br />
                  <span className="font-mono text-slate-700 dark:text-slate-300 block my-1">
                    Só mennyisége: 600 · 10 = 6000
                  </span>
                  <span className="font-mono text-amber-700 dark:text-amber-300 font-bold block">
                    Új tömeg = 600 - 200 = 400 g  →  p_új = 6000 / 400 = 15%
                  </span>
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szekció: Ötvözetek, Arany és Karát Számítás */}
      <TheorySection
        number={3}
        title="Ötvözetek, Nemesfémek és a Karát Számítás"
        icon={<Award className="w-5 h-5 text-teal-600" />}
        badge="Nemesfémek"
        badgeColor="teal"
      >
        <TheoryCard
          title="Fémek és Ékszerek: Mi a karát és hogyan működik a keverés?"
          badge="Ötvözetek"
          badgeColor="teal"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A tiszta arany (és az ezüst) túlságosan lágy fém ahhoz, hogy közvetlenül tartós ékszereket, órákat vagy érméket készítsenek belőle.
              Ezért más fémekkel (rézzel, ezüsttel, nikkellel) ötvözik, hogy keményebb, ellenállóbb legyen.
              Az ötvözet aranytartalmát <strong>karátban</strong> vagy <strong>ezrelékben (‰)</strong> fejezzük ki.
            </p>

            <TheoryCallout
              variant="teal"
              title="A Karát Rendszer Aranyszabálya"
              icon={<Award className="w-5 h-5 text-amber-600" />}
            >
              <div className="text-center font-bold text-slate-800 dark:text-slate-100 py-1">
                A tiszta, 100%-os színarany pontosan <span className="text-amber-600 dark:text-amber-400">24 karátos</span>.
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-1 flex items-center justify-center gap-1">
                <span>Ezért 1 karát = az össztömeg</span>
                <Fraction num="1" den="24" size="sm" />
                <span>része (kb. 4,167%).</span>
              </p>
            </TheoryCallout>

            {/* Karát Gyakori Értékek */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-center">
                <div className="text-xs font-bold text-amber-700">14 Karát</div>
                <div className="text-base font-black text-slate-800 dark:text-slate-100 font-mono my-0.5">58,3%</div>
                <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                  <Fraction num="14" den="24" size="sm" />
                  <span>= 583‰ (leggyakoribb)</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-center">
                <div className="text-xs font-bold text-amber-700">18 Karát</div>
                <div className="text-base font-black text-slate-800 dark:text-slate-100 font-mono my-0.5">75,0%</div>
                <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                  <Fraction num="18" den="24" size="sm" />
                  <span>= 750‰ (luxus ékszer)</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-center">
                <div className="text-xs font-bold text-amber-700">24 Karát</div>
                <div className="text-base font-black text-slate-800 dark:text-slate-100 font-mono my-0.5">100,0%</div>
                <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                  <Fraction num="24" den="24" size="sm" />
                  <span>= 999,9‰ (színarany)</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60 text-center">
                <div className="text-xs font-bold text-teal-700">Karát Egyenlet</div>
                <div className="text-xs font-black text-teal-800 dark:text-teal-300 font-mono my-0.5">m₁·K₁ + m₂·K₂</div>
                <div className="text-[10px] text-slate-500">= (m₁ + m₂) · K_ö (közvetlenül karáttal is számolhatunk!)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-100">Tipp az ötvözetek számításához:</strong> Ha a feladatban minden arany karátban van megadva, nem kötelező átváltani százalékra vagy ezrelékre! A 24-gyel való osztás mindkét oldalon kiesik, így közvetlenül a karátértékekkel is felírhatjuk a keverési egyenletet:
              <div className="mt-1 font-mono font-bold text-teal-700 dark:text-teal-300 text-center">
                m₁ · K₁ + m₂ · K₂ = (m₁ + m₂) · K_új
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szekció: Folyadékok Hőmérséklet-keveredése (Kalorimetria) */}
      <TheorySection
        number={4}
        title="Különböző Hőmérsékletű Folyadékok Keverése (Kalorimetria)"
        icon={<Thermometer className="w-5 h-5 text-teal-600" />}
        badge="Fizikai Kapcsolat"
        badgeColor="teal"
      >
        <TheoryCard
          title="Miért pontosan ugyanaz a meleg víz és hideg víz összekeverése, mint a sóoldat?"
          badge="Hőmérséklet-egyenlet"
          badgeColor="teal"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A 8. osztályos fizikában a kalorimetrikus egyenlet a leadott és felvett hőmennyiség egyenlőségét fejezi ki (<MathText>Q_leadott = Q_felvett</MathText>).
              Ha azonos fajtájú folyadékokat (pl. vizet vízzel) keverünk össze, a fajhők (<MathText>c</MathText>) kiejthetők, és az egyenlet{' '}
              <strong className="text-teal-700 dark:text-teal-300">formailag teljesen megegyezik a tömegszázalékos keverési egyenlettel</strong>:
            </p>

            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 text-center">
              <div className="text-xs uppercase font-bold text-teal-700 dark:text-teal-400">Hőmérsékleti Keverési Egyenlet</div>
              <div className="text-base font-black text-teal-900 dark:text-teal-100 font-mono my-1">
                m₁ · T₁ + m₂ · T₂ = (m₁ + m₂) · T_közös
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                Ahol <MathText>m_1, m_2</MathText> a vizek tömege, <MathText>T_1, T_2</MathText> pedig a kiindulási hőmérsékletük °C-ban.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
              <strong>Példa:</strong> 2 liter (2 kg) 20 °C-os vízhez 3 liter (3 kg) 70 °C-os forró vizet öntünk:
              <br />
              <span className="font-mono text-slate-800 dark:text-slate-200 block my-1">
                2 · 20 + 3 · 70 = (2 + 3) · T_k  →  40 + 210 = 5 · T_k  →  250 = 5 · T_k  →  T_k = 50 °C.
              </span>
              A keverék végső közös hőmérséklete 50 °C lesz!
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szekció: Interaktív Keverési Labor Szimulátor (Leljesebben, elméleti szekciók után!) */}
      <TheorySection
        number={5}
        title="Interaktív Keverési Labor Szimulátor"
        icon={<FlaskConical className="w-5 h-5 text-teal-600" />}
        badge="Szimulátor"
        badgeColor="teal"
      >
        <TheoryCard
          title="Kísérletezz valós időben a tömegekkel, töménységekkel és hígítással!"
          badge="Interaktív Műhely"
          badgeColor="teal"
        >
          {/* Fülváltó */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Válaszd ki a laboratóriumi kísérlet típusát:
            </span>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'mixing' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('mixing')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeTab === 'mixing'
                    ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-2xs'
                    : 'border-teal-200 text-teal-700 dark:text-teal-300'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Két Oldat Összekeverése
              </Button>
              <Button
                variant={activeTab === 'dilution' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('dilution')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeTab === 'dilution'
                    ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-2xs'
                    : 'border-teal-200 text-teal-700 dark:text-teal-300'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                Hígítás / Töményítés
              </Button>
            </div>
          </div>

          {/* TAB 1: Két Oldat Keverése */}
          {activeTab === 'mixing' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-900/60 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Állítsd be az 1. és a 2. lombik adatait a csúszkákkal:
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setM1(300);
                      setP1(10);
                      setM2(200);
                      setP2(35);
                    }}
                    className="rounded-xl text-xs font-bold border-teal-300 text-teal-700 hover:bg-teal-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Mintapélda (300g 10% + 200g 35%)
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1. Lombik vezérlő */}
                  <div className="p-3.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60 space-y-3">
                    <div className="flex items-center justify-between text-xs font-black text-teal-800 dark:text-teal-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">1</span>
                        1. Oldat (Lombik A)
                      </span>
                      <span className="font-mono text-teal-700">{solute1.toFixed(1)} g só</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        <span>Tömeg (m₁):</span>
                        <span className="font-mono font-black text-teal-700">{m1} g</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={m1}
                        onChange={(e) => setM1(parseInt(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        <span>Töménység (p₁):</span>
                        <span className="font-mono font-black text-teal-700">{p1}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        step="1"
                        value={p1}
                        onChange={(e) => setP1(parseInt(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* 2. Lombik vezérlő */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                    <div className="flex items-center justify-between text-xs font-black text-indigo-800 dark:text-indigo-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                        2. Oldat (Lombik B)
                      </span>
                      <span className="font-mono text-indigo-700">{solute2.toFixed(1)} g só</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        <span>Tömeg (m₂):</span>
                        <span className="font-mono font-black text-indigo-700">{m2} g</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={m2}
                        onChange={(e) => setM2(parseInt(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        <span>Töménység (p₂):</span>
                        <span className="font-mono font-black text-indigo-700">{p2}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        step="1"
                        value={p2}
                        onChange={(e) => setP2(parseInt(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Grafikus Lombik Vizualizáció és Számítás */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-indigo-500/10 border border-teal-300 dark:border-teal-800 flex flex-col md:flex-row items-center justify-around gap-4">
                  <div className="flex items-center gap-3">
                    {/* Kis A lombik */}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-20 rounded-b-2xl border-2 border-teal-500 bg-teal-50 relative overflow-hidden flex items-end justify-center shadow-inner">
                        <div
                          className="w-full bg-teal-500/60 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ height: `${Math.min(100, (m1 / 1000) * 100)}%` }}
                        >
                          {p1}%
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-teal-800 dark:text-teal-300 mt-1">{m1}g</span>
                    </div>

                    <span className="text-xl font-black text-slate-400">+</span>

                    {/* Kis B lombik */}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-20 rounded-b-2xl border-2 border-indigo-500 bg-indigo-50 relative overflow-hidden flex items-end justify-center shadow-inner">
                        <div
                          className="w-full bg-indigo-500/60 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ height: `${Math.min(100, (m2 / 1000) * 100)}%` }}
                        >
                          {p2}%
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 mt-1">{m2}g</span>
                    </div>

                    <span className="text-xl font-black text-slate-400">=</span>

                    {/* Nagy közös lombik */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-24 rounded-b-3xl border-3 border-emerald-600 bg-emerald-50 relative overflow-hidden flex items-end justify-center shadow-md">
                        <div
                          className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 transition-all duration-300 flex flex-col items-center justify-center text-white"
                          style={{ height: `${Math.min(100, (totalMass / 2000) * 100)}%` }}
                        >
                          <span className="text-xs font-black">{resultingPercent.toFixed(1)}%</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-emerald-800 dark:text-emerald-300 mt-1">{totalMass}g</span>
                    </div>
                  </div>

                  {/* Kiszámolt Eredmények és Levezetés */}
                  <div className="flex-1 max-w-md space-y-1.5 text-xs">
                    <div className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      Összes só: {m1} · {p1/100} + {m2} · {p2/100} = <span className="text-emerald-600 font-black">{totalSolute.toFixed(1)} g</span>
                    </div>
                    <div className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      Össztömeg: {m1} + {m2} = <span className="text-teal-600 font-black">{totalMass} g</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 font-mono text-center">
                      <span className="text-slate-500 text-[11px]">Keverék töménysége: </span>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {resultingPercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 text-center">
                      Észrevétel: A kapott töménység ({resultingPercent.toFixed(1)}%) mindig a kiindulási töménységek közé esik ({Math.min(p1, p2)}% és {Math.max(p1, p2)}% között)!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hígítás és Töményítés */}
          {activeTab === 'dilution' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-900/60 space-y-4">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Válaszd ki a műveletet:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setProcessType('water')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        processType === 'water'
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white dark:bg-slate-800 text-slate-700 border-slate-300'
                      }`}
                    >
                      💧 Hígítás vízzel (0%)
                    </button>
                    <button
                      onClick={() => setProcessType('solute')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        processType === 'solute'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white dark:bg-slate-800 text-slate-700 border-slate-300'
                      }`}
                    >
                      🧂 Só hozzáadása (100%)
                    </button>
                    <button
                      onClick={() => setProcessType('evaporate')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        processType === 'evaporate'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white dark:bg-slate-800 text-slate-700 border-slate-300'
                      }`}
                    >
                      🔥 Víz elpárologtatása
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Alapoldat */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Kiindulási oldat ({baseMass} g, {basePercent}%-os)
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Tömeg: {baseMass} g</span>
                      <span>Tiszta só: {((baseMass * basePercent) / 100).toFixed(1)} g</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="800"
                      step="50"
                      value={baseMass}
                      onChange={(e) => setBaseMass(parseInt(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  {/* Műveleti tömeg */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>
                        {processType === 'water' && 'Hozzáadott víz tömege:'}
                        {processType === 'solute' && 'Hozzáadott tiszta só:'}
                        {processType === 'evaporate' && 'Elpárologtatott víz tömege:'}
                      </span>
                      <span className="font-mono text-teal-600 font-black">{addedMass} g</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="10"
                      value={addedMass}
                      onChange={(e) => setAddedMass(parseInt(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                {/* Eredményjelző kártya */}
                <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-300 dark:border-teal-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-500">Új oldat tömege:</div>
                    <div className="text-lg font-black text-slate-800 dark:text-slate-100 font-mono">
                      {finalMass.toFixed(0)} g
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Tiszta oldott anyag: {finalSolute.toFixed(1)} g
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="text-xs text-teal-700 dark:text-teal-400 font-bold">Új tömegszázalék:</div>
                    <div className="text-2xl font-black text-teal-700 dark:text-teal-300 font-mono">
                      {finalPercent.toFixed(2)}%
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {finalPercent < basePercent ? '📉 Az oldat hígabb lett' : '📈 Az oldat töményebb lett'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TheoryCard>
      </TheorySection>

      {/* 6. Szekció: Részletesen Kidolgozott Mintapéldák a Tankönyvből */}
      <TheorySection
        number={6}
        title="Részletesen Kidolgozott Mintapéldák a Tankönyvből"
        icon={<Calculator className="w-5 h-5 text-teal-600" />}
        badge="Kidolgozott Feladatok"
        badgeColor="teal"
      >
        <TheoryCard
          title="1. Mintapélda: Két különböző töménységű sóoldat keverése"
          badge="Két Ismeretlen / Helyettesítés"
          badgeColor="teal"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 font-medium text-slate-800 dark:text-slate-200">
              <strong>Feladat:</strong> Hány kg 15%-os és hány kg 40%-os sóoldatot kell összekevernünk, hogy 50 kg 30%-os oldatot kapjunk?
            </div>

            <div className="space-y-2">
              <div>
                <strong>1. Ismeretlen kiválasztása:</strong> Legyen a 15%-os oldat tömege <MathText>x</MathText> kg.
                Mivel az össztömegnek 50 kg-nak kell lennie, a 40%-os oldat tömege <MathText>50 - x</MathText> kg.
              </div>

              <div>
                <strong>2. A megmaradási egyenlet felírása (100-zal beszorzott alak):</strong>
                <div className="p-2.5 my-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center text-teal-700 dark:text-teal-300 font-bold">
                  15 · x + 40 · (50 - x) = 50 · 30
                </div>
              </div>

              <div>
                <strong>3. Egyenlet megoldása lépésről lépésre:</strong>
                <div className="font-mono space-y-1 pl-3 border-l-2 border-teal-400 my-1 text-slate-700 dark:text-slate-300">
                  <div>15x + 2000 - 40x = 1500</div>
                  <div>-25x + 2000 = 1500   /- 2000</div>
                  <div>-25x = -500   /: (-25)</div>
                  <div className="text-teal-600 dark:text-teal-400 font-black">x = 20 kg</div>
                </div>
              </div>

              <div>
                <strong>4. A másik mennyiség kiszámítása:</strong>
                A 40%-os oldat tömege: <MathText>50 - 20 = 30</MathText> kg.
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                <strong>Szöveges ellenőrzés a valóságban:</strong>
                <br />
                20 kg 15%-osban: 20 · 0,15 = 3 kg só.
                <br />
                30 kg 40%-osban: 30 · 0,40 = 12 kg só.
                <br />
                Összes só = 3 + 12 = 15 kg só.
                <br />
                50 kg 30%-os oldatban: 50 · 0,30 = 15 kg só. <strong>Pontosan egyezik!</strong>
              </div>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard
          title="2. Mintapélda: Hígítás tiszta vízzel"
          badge="Víz Hozzáadása"
          badgeColor="teal"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/60 font-medium text-slate-800 dark:text-slate-200">
              <strong>Feladat:</strong> 6 kg 35%-os savoldatunk van. Hány kg tiszta vizet kell hozzáöntenünk, hogy 20%-os savat kapjunk?
            </div>

            <div className="space-y-2">
              <div>
                <strong>1. Ismeretlen:</strong> Legyen a hozzáadott víz tömege <MathText>x</MathText> kg. A tiszta vízben nincs sav, tehát <MathText>p = 0%</MathText>.
                Az új össztömeg <MathText>6 + x</MathText> kg lesz.
              </div>

              <div>
                <strong>2. Egyenlet felírása:</strong>
                <div className="p-2.5 my-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center text-sky-700 dark:text-sky-300 font-bold">
                  6 · 35 + x · 0 = (6 + x) · 20
                </div>
              </div>

              <div>
                <strong>3. Megoldás:</strong>
                <div className="font-mono space-y-1 pl-3 border-l-2 border-sky-400 my-1 text-slate-700 dark:text-slate-300">
                  <div>210 + 0 = 120 + 20x</div>
                  <div>210 = 120 + 20x   /- 120</div>
                  <div>90 = 20x   /: 20</div>
                  <div className="text-sky-600 dark:text-sky-400 font-black">x = 4,5 kg</div>
                </div>
              </div>

              <div>
                <strong>Válasz:</strong> 4,5 kg tiszta vizet kell hozzáadni. Az új oldat tömege 10,5 kg lesz, savtartalma: 6 · 0,35 = 2,1 kg; 10,5 · 0,20 = 2,1 kg.
              </div>
            </div>
          </div>
        </TheoryCard>

        <TheoryCard
          title="3. Mintapélda: Karátos aranyötvözet készítése"
          badge="Ötvözet"
          badgeColor="teal"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 font-medium text-slate-800 dark:text-slate-200">
              <strong>Feladat:</strong> Egy ékszerésznek 300 g 14 karátos aranya van. Hány gramm 18 karátos aranyat kell hozzáolvasztania, hogy 15 karátos aranyötvözetet kapjon?
            </div>

            <div className="space-y-2">
              <div>
                <strong>Közvetlen karát-egyenlet felírása:</strong>
                Legyen a hozzáolvasztott 18 karátos arany tömege <MathText>y</MathText> gramm.
                <div className="p-2.5 my-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center text-amber-700 dark:text-amber-300 font-bold">
                  300 · 14 + y · 18 = (300 + y) · 15
                </div>
              </div>

              <div className="font-mono space-y-1 pl-3 border-l-2 border-amber-400 my-1 text-slate-700 dark:text-slate-300">
                <div>4200 + 18y = 4500 + 15y   /- 15y</div>
                <div>4200 + 3y = 4500   /- 4200</div>
                <div>3y = 300   /: 3</div>
                <div className="text-amber-600 dark:text-amber-400 font-black">y = 100 g</div>
              </div>

              <div>
                <strong>Válasz:</strong> 100 gramm 18 karátos aranyat kell hozzáolvasztani. Az így kapott 400 gramm ötvözet pontosan 15 karátos lesz!
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 7. Szekció: Gyakori Csapdahelyzetek és Típustévesztések */}
      <TheorySection
        number={7}
        title="Gyakori Csapdahelyzetek és Típustévesztések"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        badge="Csapdák & Tévhitek"
        badgeColor="amber"
      >
        <TheoryTrapBox
          wrongExample="200 g 10%-os és 300 g 40%-os oldat keveréke: (10% + 40%) / 2 = 25%-os lesz."
          correctExample="A tömegek különbözőek, így a súlyozott átlag számít: (200·10 + 300·40) / 500 = (2000 + 12000) / 500 = 14000 / 500 = 28%!"
          explanation="A százalékokat NEM lehet egyszerű számtani átlaggal számolni, ha a tömegek nem egyenlőek! Mindig a tiszta sókat és az össztömeget kell felírni."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              1. Csapda: A tiszta víz töménységének elhibázása
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sokan beírnak 100-at vagy 1-et a víz helyére. Ne feledd: a tiszta vízben <strong>0 g só van</strong>, tehát a töménysége szigorúan <span className="font-bold text-rose-600">0%</span>! Emiatt a szorzata kiesik az egyenlet bal oldalán (<MathText>m · 0 = 0</MathText>).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              2. Csapda: Tiszta só hozzáadása vs oldat tömege
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha kristályos sót adunk az oldathoz, a só a jobb oldalon az <strong>oldat össztömegét is növeli</strong>!
              <br />
              Helyes felírás: <MathText>m_1 · p_1 + x · 100 = (m_1 + x) · p_új</MathText>. Ne felejtsd el az <MathText>x</MathText>-et az össztömeghez is hozzáadni!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 8. Szekció: Szöveges Ellenőrzés és Mértékegység Egyeztetés */}
      <TheorySection
        number={8}
        title="Szöveges Ellenőrzés és Mértékegységek"
        icon={<ShieldCheck className="w-5 h-5 text-teal-600" />}
        badge="Összegzés"
        badgeColor="teal"
      >
        <TheoryCard
          title="A 3 Aranyszabály a hibátlan beadáshoz"
          badge="Checklist"
          badgeColor="teal"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong>Azonos mértékegységek:</strong> Minden tömeget azonos egységben (vagy mindent grammban, vagy mindent kg-ban) használj! Víz esetén 1 liter víz tömege pontosan 1 kg (1000 g).
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong>Logikai józansági próba:</strong> A kapott keverék százaléka mindig a hígabb és a töményebb oldat közé kell hogy essen (<MathText>p_1 &lt; p_ö &lt; p_2</MathText>). Ha hígításnál nagyobb százalék jött ki, azonnal keresd meg a hibát!
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong>Visszahelyettesítés az eredeti szövegbe:</strong> Számold ki mindkét komponens tényleges sótartalmát, és nézd meg, hogy az össztömeggel számolt eredménnyel egyenlő-e!
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MixingWordProblemsTheory;
