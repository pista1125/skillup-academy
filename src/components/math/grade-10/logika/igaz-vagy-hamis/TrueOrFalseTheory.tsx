import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard
} from '../TheoryTemplate';
import {
  LogicStatementSvg,
  ExcludedMiddleSvg,
  BoundaryNegationSvg,
  PaintedCubeSvg
} from './TrueOrFalseFigures';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Scale,
  Brain,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrueOrFalseTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface InteractiveSentence {
  id: string;
  sentence: string;
  isStatement: boolean;
  truthValue?: 'IGAZ' | 'HAMIS';
  category: 'Állítás' | 'Nem állítás';
  reason: string;
  negation?: string;
  trapWarning?: string;
}

const SAMPLE_SENTENCES: InteractiveSentence[] = [
  {
    id: 's1',
    sentence: 'A sósav kémiai képlete HCl.',
    isStatement: true,
    truthValue: 'IGAZ',
    category: 'Állítás',
    reason: 'Egyértelmű tényállítás, amely a kémiában igazoltan igaz.',
    negation: 'A sósav kémiai képlete nem HCl.'
  },
  {
    id: 's2',
    sentence: 'Svájc fővárosa Zürich.',
    isStatement: true,
    truthValue: 'HAMIS',
    category: 'Állítás',
    reason: 'Kijelentő mondat, melynek igazságértéke egyértelműen hamis, ugyanis Svájc fővárosa Bern.',
    negation: 'Svájc fővárosa nem Zürich.'
  },
  {
    id: 's3',
    sentence: 'Hány óra van most?',
    isStatement: false,
    category: 'Nem állítás',
    reason: 'Kérdő mondat. Nem határoz meg tényállást, így nem lehet igaz vagy hamis.',
    trapWarning: 'Kérdéseknek, parancsoknak és óhajoknak nincs logikai igazságértékük!'
  },
  {
    id: 's4',
    sentence: 'Budapest sokkal szebb város, mint Tokió.',
    isStatement: false,
    category: 'Nem állítás',
    reason: 'Szubjektív értékítélet, egyéni ízlés kérdése. Nincs objektív mérce a „szépségre”.',
    trapWarning: 'A vélemények és értékítéletek nem matematikai állítások!'
  },
  {
    id: 's5',
    sentence: 'Két páros természetes szám összege osztható 4-gyel.',
    isStatement: true,
    truthValue: 'HAMIS',
    category: 'Állítás',
    reason: 'A matematikában ezt úgy értjük: „MINDIG osztható 4-gyel”. Bár 2 + 6 = 8 (osztható), de 4 + 6 = 10 nem osztható 4-gyel. Egyetlen ellenpélda elegendő a cáfolathoz!',
    negation: 'Van olyan két páros szám, amelyek összege nem osztható 4-gyel.',
    trapWarning: 'Köznyelvben azt mondanánk: „néha igen”. A logikában nincs „néha”: vagy mindig igaz, vagy hamis!'
  },
  {
    id: 's6',
    sentence: 'Többen vagyunk a teremben, mint 32.',
    isStatement: true,
    truthValue: 'IGAZ',
    category: 'Állítás',
    reason: 'A létszám megszámolható tény. Ha 33 vagy több ember van bent, igaz; ha 32 vagy kevesebb, hamis.',
    negation: 'Legfeljebb 32-en vagyunk a teremben. (Kevesebben vagyunk, mint 33)',
    trapWarning: 'A „Kevesebben vagyunk, mint 32” NEM tagadás, mert ha épp 32-en vagyunk, mindkettő hamis lenne!'
  }
];

export const TrueOrFalseTheory: React.FC<TrueOrFalseTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedSentence, setSelectedSentence] = useState<InteractiveSentence>(SAMPLE_SENTENCES[0]);

  return (
    <TheoryTemplate
      title="1. Igaz vagy hamis?"
      subtitle="Kijelentések, igazságértékek, a klasszikus logika alaptörvényei és a tagadás elve"
      badge="10. OSZTÁLY • I. LOGIKA"
      topicBadge="10. OSZTÁLY • I. LOGIKA • 1. LECKE"
      pdfFilename="10_osztaly_logika_1_igaz_vagy_hamis.pdf"
      themeColor="indigo"
      ruleTitle="A klasszikus logika alaptétele (Kizárt harmadik)"
      ruleFormula="Minden A állításra: A ∨ ¬A azonosan igaz (nincs harmadik eset)"
      practiceTitle="Készen állsz a logikai feladványokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben és fejtörőkben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* --- 1. RÉSZ: MI AZ ÁLLÍTÁS A MATEMATIKÁBAN? --- */}
      <TheorySection
        number={1}
        title="Mi az állítás (kijelentés) a logikában?"
        badge="Alapfogalom"
        badgeColor="indigo"
      >
        <TheoryCard
          title="Az állítás (kijelentés) pontos meghatározása"
          color="indigo"
          icon={<Brain className="w-5 h-5 text-indigo-600" />}
          variant="highlight"
          description="A logikában azokat a kijelentő mondatokat nevezzük állításoknak (más szóval kijelentéseknek), amelyekről egyértelműen és objektíven eldönthető, hogy a tartalmuk igaz vagy hamis."
          properties={[
            'Objektivitás: Nem függhet attól, hogy ki mondja, vagy kinek mi az egyéni ízlése.',
            'Egyértelmű eldönthetőség: Nem szükséges, hogy mi személyesen azonnal tudjuk a választ (pl. kísérlet vagy számolás kellhet hozzá), de a valóságban egyértelműen igaznak vagy hamisnak kell lennie.',
            'Kétértékű logika: Minden állítás pontosan egy logikai értéket vesz fel: IGAZ (I, 1) vagy HAMIS (H, 0).'
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeometryFigureCard
            title="Az állítás feldolgozása a logikában"
            badge="Folyamatábra"
            color="indigo"
            description="Egy mondat csak akkor állítás, ha az objektív szűrőn átmenve pontosan az IGAZ vagy a HAMIS állapotba kerül."
            figure={<LogicStatementSvg size={280} />}
          />

          <TheoryCard
            title="Mi NEM állítás a matematikában?"
            color="rose"
            icon={<XCircle className="w-5 h-5 text-rose-500" />}
            properties={[
              'Kérdő mondat: „Hány óra van?”, „Hol van a könyv?”',
              'Felszólítás, parancs: „Oldd meg a másodfokú egyenletet!”, „Gyere ide!”',
              'Óhajtó mondat: „Bárcsak ötöst kapnék matematikából!”',
              'Szubjektív vélemény, ízlésbeli ítélet: „Budapest szebb, mint Tokió.”, „A fagylalt finom.”',
              'Nyitott mondat (amíg nincs rögzítve az ismeretlen): „x > 5” (ez csak akkor válik állítássá, ha x értékét megadjuk).'
            ]}
          />
        </div>

        <TheoryTable
          headers={['Mondat típusa', 'Példa a tankönyvből', 'Állítás?', 'Magyarázat / Érték']}
          rows={[
            ['Tényállítás (kémia)', '„A sósav képlete HCl.”', 'IGEN', 'Igaz állítás (objektív természettudományos tény)'],
            ['Tényállítás (földrajz)', '„Svájc fővárosa Zürich.”', 'IGEN', 'Hamis állítás (Bern a főváros, egyértelműen hamis)'],
            ['Kérdés', '„Hány óra van?”', 'NEM', 'Kérdő mondat, nincs igazságértéke'],
            ['Ízlés, szubjektív vélemény', '„Budapest szebb város, mint Tokió.”', 'NEM', 'Nincs objektív mérce a szépségre'],
            ['Matematikai tulajdonság', '„A 17 prímszám.”', 'IGEN', 'Igaz állítás (csak 1-gyel és önmagával osztható)'],
            ['Felszólítás', '„Figyelj az órán!”', 'NEM', 'Parancs / kérés, nem tényállás']
          ]}
        />
      </TheorySection>

      {/* --- 2. RÉSZ: A KLASSZIKUS LOGIKA ALAPTÖRVÉNYEI --- */}
      <TheorySection
        number={2}
        title="A klasszikus logika alaptörvényei"
        badge="Alapelvek"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. A harmadik kizárásának elve (tertium non datur)"
            color="purple"
            icon={<Scale className="w-5 h-5 text-purple-600" />}
            variant="highlight"
            description="Egy állítás vagy igaz, vagy hamis, harmadik eset nincs. Nem létezik „félig igaz”, „talán igaz”, vagy „egyszerre semelyik”."
          >
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Ez a klasszikus kétértékű (arisztotelészi) logika sarokköve. Minden jól meghatározott matematikai kijelentésnek van egy rögzített logikai értéke az univerzumban.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Az ellentmondásmentesség elve"
            color="teal"
            icon={<CheckCircle2 className="w-5 h-5 text-teal-600" />}
            variant="highlight"
            description="Egy állítás nem lehet egyszerre igaz és hamis is. Egy kijelentés nem mondhat ellent önmagának."
          >
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Ha bebizonyítjuk, hogy egy állítás hamis, akkor abból azonnal következik, hogy nem lehet igaz (és fordítva). Ezen alapul a közvetett (indirekt) bizonyítás módszere is!
            </p>
          </TheoryCard>
        </div>

        <GeometryFigureCard
          title="A kijelentések kétértékű világa"
          badge="Szemléltetés"
          color="purple"
          description="A klasszikus logikában a világ két éles kategóriára oszlik: az IGAZ és a HAMIS kijelentésekre. Nincs átjárás és nincs harmadik mező."
          figure={<ExcludedMiddleSvg className="w-full max-w-2xl" />}
        />

        <TheoryCallout type="info" title="Érdekesség: Logikai értékek jelölése">
          A matematikában és az informatikában a logikai értékeket gyakran jelöljük betűkkel vagy számokkal:
          <ul className="list-disc list-inside mt-1 space-y-0.5">
            <li><strong>Igaz:</strong> <code className="font-bold text-emerald-600">I</code> (vagy angolul <code>T</code> = True), illetve binárisan <strong>1</strong>.</li>
            <li><strong>Hamis:</strong> <code className="font-bold text-rose-600">H</code> (vagy angolul <code>F</code> = False), illetve binárisan <strong>0</strong>.</li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* --- 3. RÉSZ: KÖZNYELV VS. MATEMATIKAI NYELV (A REJTETT KVANTOROK) --- */}
      <TheorySection
        number={3}
        title="Köznyelv kontra Matematika – A rejtett kvantorok"
        badge="Gyakori Hiba"
        badgeColor="amber"
      >
        <TheoryTrapBox
          title="„Két páros szám összege osztható 4-gyel” – Igaz vagy hamis?"
          wrong="„Ez attól függ: néha igen (2 + 6 = 8), néha nem (4 + 6 = 10), szóval lehet is meg nem is.”"
          wrongExplanation="A köznyelv gyakran megengedi a laza fogalmazást. A matematikában azonban egy állítás nem lehet „néha igaz, néha hamis”!"
          correct="A matematikában az állítás HAMIS. Mivel nincs ott korlátozás, úgy értendő: „MINDEN két páros szám összege osztható 4-gyel”."
          correctExplanation="Egy általános érvényűnek megfogalmazott állítás megdöntéséhez EGYETLEN ellenpélda is elegendő: 4 + 6 = 10, ami nem osztható 4-gyel."
          tip="Jegyezd meg: ha egy állításban nem szerepel kötőszó vagy feltétel, a matematikában a „mindig” / „minden esetben” szót kell odagondolni!"
        />

        <TheoryCard
          title="Az ellenpélda ereje a cáfolatban"
          color="amber"
          icon={<Lightbulb className="w-5 h-5 text-amber-600" />}
          description="Egy általános („minden”) állítás igazságához az összes létező esetet igazolni kell (vagy általános bizonyítást adni). A cáfolatához viszont BŐVEN ELÉG EGYETLEN ellenpéldát találni!"
          properties={[
            'Állítás: „Minden prímszám páratlan.” -> Hamis, mert a 2 prímszám és páros (ellenpélda!).',
            'Állítás: „Minden négyszög átlói merőlegesek egymásra.” -> Hamis, a téglalap átlói nem merőlegesek (ellenpélda!).',
            'Állítás: „Bármely két páratlan szám összege páros.” -> Igaz, általánosan: (2k+1) + (2m+1) = 2(k+m+1), ami mindig 2 többszöröse.'
          ]}
        />
      </TheorySection>

      {/* --- 4. RÉSZ: A TAGADÁS (NEGÁCIÓ) ALAPJAI ÉS BUKTATÓI --- */}
      <TheorySection
        number={4}
        title="A tagadás (negáció) és a leggyakoribb tévedések"
        badge="Tagadás Elve"
        badgeColor="teal"
      >
        <TheoryCard
          title="A tagadás definíciója"
          color="teal"
          icon={<Scale className="w-5 h-5 text-teal-600" />}
          variant="highlight"
          description="Minden A állításnak létezik tagadása (jele: ¬A vagy ~A, olvasd: „nem A”). A ¬A állítás pontosan akkor igaz, ha A hamis, és akkor hamis, ha A igaz."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Buktató: Nem elég, ha egyszerre nem lehetnek igazak!"
            wrong="A: „Panni kutyája fekete.” – Tagadás: „Panni kutyája tarka.”"
            wrongExplanation="Bár fekete és tarka nem lehet egyszerre a kutya, de mi van, ha a kutya FEHÉR? Akkor mindkét mondat egyszerre HAMIS lenne!"
            correct="Helyes tagadás: „Panni kutyája nem fekete.”"
            correctExplanation="Két állítás csak akkor tagadása egymásnak, ha SEMMILYEN körülmények között nem lehetnek egyszerre hamisak sem!"
          />

          <TheoryTrapBox
            title="2. Buktató: Mennyiségi állítások határesetei"
            wrong="A: „Többen vagyunk, mint 32.” (x > 32) – Tagadás: „Kevesebben vagyunk, mint 32.” (x < 32)"
            wrongExplanation="Ha pontosan 32-en vagyunk az osztályban, akkor egyik sem teljesül: mindkét mondat hamis!"
            correct="Helyes tagadás: „Legfeljebb 32-en vagyunk.” (x ≤ 32, azaz kevesebben, mint 33)"
            correctExplanation="A szigorú egyenlőtlenség (> vagy <) tagadása mindig megengedő egyenlőtlenség (≤ vagy ≥)!"
          />
        </div>

        <GeometryFigureCard
          title="A határpont szerepe a számegyenesen"
          badge="Szemléltetés"
          color="teal"
          description="A határértéket tartalmazó kijelentések tagadásánál a határpontnak pontosan az egyik kijelentésbe be kell tartoznia!"
          figure={<BoundaryNegationSvg size={320} />}
        />

        <TheoryTable
          headers={['Eredeti állítás (A)', 'Matematikai jelentés', 'Hibás tagadás (Gyakori hiba)', 'Helyes tagadás (¬A)']}
          rows={[
            ['„Legalább 100 barátom van.”', 'x ≥ 100', '„Legfeljebb 100 barátom van.” (100-nál mindkettő igaz!)', '„Legfeljebb 99 barátom van.” / „Kevesebb mint 100” (x < 100)'],
            ['„Ez a könyv maximum 300 oldalas.”', 'x ≤ 300', '„Ez a könyv legfeljebb 299 oldalas.”', '„Több mint 300 oldalas.” / „Legalább 301 oldalas” (x > 300)'],
            ['„A csapat több mint 8 gólt rúgott.”', 'g > 8', '„A csapat kevesebb mint 8 gólt rúgott.”', '„Legfeljebb 8 gólt rúgott a csapat.” (g ≤ 8)'],
            ['„A ládában minden alma piros.”', 'Minden elemre igaz', '„A ládában egyetlen alma sem piros.”', '„Van a ládában olyan alma, amely nem piros.”']
          ]}
        />
      </TheorySection>

      {/* --- 5. RÉSZ: ÖSSZETETT FELADATOK ÉS KOMPETENCIAMÉRÉSEK --- */}
      <TheorySection
        number={5}
        title="Érettségi és Kompetenciamérés típusú fejtörők"
        badge="Alkalmazás"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeometryFigureCard
            title="A festett kocka logikája (Kompetenciamérés)"
            badge="Gyakorlati Feladvány"
            color="rose"
            description="Egy 3×3×3-as kockát kívülről pirosra festünk, majd 27 kis kockára vágunk. Döntsd el az állítások igazságértékét!"
            figure={<PaintedCubeSvg size={260} />}
          />

          <TheoryCard
            title="A 27 kis kocka lapjainak pontos logikája"
            color="rose"
            properties={[
              'Csúcskockák (8 db): Mindegyiknek pontosan 3 lapja piros.',
              'Élkockák (12 db): Mindegyiknek pontosan 2 lapja piros.',
              'Oldallapközépi kockák (6 db): Mindegyiknek pontosan 1 lapja piros.',
              'Belső magkocka (1 db): Egyetlen lapja sem piros (0 piros lap).',
              'Állítás: „12 olyan kis kocka van, melynek pontosan 2 lapja piros.” -> IGAZ (az élkockák).',
              'Állítás: „Legalább 2 piros lapja van 20 kis kockának.” -> IGAZ (8 csúcs + 12 él = 20 kocka).'
            ]}
          />
        </div>

        <TheoryCard
          title="A 4 aranyműves segéd fejtörője (Tankönyvi feladat)"
          color="amber"
          icon={<Brain className="w-5 h-5 text-amber-600" />}
          description="Négy arany nyakláncról (1., 2., 3., 4.) a segédek az alábbiakat állítják. Tudjuk, hogy pontosan ketten mondanak igazat és ketten tévednek:"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <strong>Tóbiás:</strong> „A 2. a legkönnyebb.”
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <strong>Kázmér:</strong> „A 4. a legkönnyebb.”
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <strong>Móric:</strong> „A 2. a legnehezebb, a 3. a legkönnyebb.”
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <strong>Jónás:</strong> „A 2. nem a legnehezebb, de nem is a legkönnyebb.”
            </div>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
            <strong>Logikai következtetés:</strong> Vegyük észre, hogy a 2. nyakláncról három különböző állítás van:
            Tóbiás szerint a legkönnyebb, Móric szerint a legnehezebb, Jónás szerint sem nem a legnehezebb, sem nem a legkönnyebb.
            Ez a három kijelentés a 2. nyaklánc súlyára nézve kizárja egymást, és egyben lefedi az összes esetet! Ezért a három közül <em>pontosan egy</em> segédnek van igaza.
            Mivel összesen két igaz állítás van, a negyedik segédnek, <strong>Kázmérnak biztosan igaza van</strong>! Ebből következően a 4. a legkönnyebb. Így Tóbiás és Móric állítása is hamis (mert ők mást mondtak a legkönnyebbnek), tehát <strong>Kázmér és Jónás mondott igazat</strong>, Tóbiás és Móric tévedett!
          </div>
        </TheoryCard>
      </TheorySection>

      {/* --- 6. RÉSZ: INTERAKTÍV MONDATVIZSGÁLÓ ÉS GYAKORLÓ LABOR --- */}
      <TheorySection
        number={6}
        title="Interaktív Állítás- és Igazságérték Laboratórium"
        badge="Interaktív Gyakorlás"
        badgeColor="indigo"
      >
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800/60 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 dark:border-indigo-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-100">
                  Próbáld ki magad: Állítások és Tagadásuk Vizsgálata
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kattints az alábbi mintamondatokra a hivatalos tankönyvből, és nézd meg az azonnali logikai elemzést!
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Tankönyvi Példatár
            </span>
          </div>

          {/* Gombok a mintamondatok kiválasztásához */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {SAMPLE_SENTENCES.map((item) => {
              const isSelected = selectedSentence.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSentence(item)}
                  className={`text-left p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  <div className="truncate">{item.sentence}</div>
                  <div className={`text-[10px] mt-0.5 font-bold ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {item.category} {item.truthValue ? `• ${item.truthValue}` : ''}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Elemző Kártya */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/60 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400">
                Vizsgált mondat:
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    selectedSentence.isStatement
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                      : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300'
                  }`}
                >
                  {selectedSentence.category}
                </span>
                {selectedSentence.truthValue && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      selectedSentence.truthValue === 'IGAZ'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {selectedSentence.truthValue} (érték: {selectedSentence.truthValue === 'IGAZ' ? '1' : '0'})
                  </span>
                )}
              </div>
            </div>

            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 italic bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              „{selectedSentence.sentence}”
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  Miért ez a besorolás?
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                  {selectedSentence.reason}
                </p>
              </div>

              {selectedSentence.negation && (
                <div className="space-y-1">
                  <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                    Helyes tagadás (¬A):
                  </div>
                  <p className="text-purple-700 dark:text-purple-300 font-semibold leading-relaxed pl-5">
                    „{selectedSentence.negation}”
                  </p>
                </div>
              )}
            </div>

            {selectedSentence.trapWarning && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Figyelem:</span> {selectedSentence.trapWarning}
                </div>
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

