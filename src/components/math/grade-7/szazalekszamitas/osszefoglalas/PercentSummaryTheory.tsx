import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  FormulaCard,
  ExampleCard,
  AlertBox,
  RuleBox,
  QuickQuiz
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  Percent,
  Calculator,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  BookOpen,
  Scale,
  PieChart,
  CheckCircle2,
  DollarSign,
  FlaskConical
} from 'lucide-react';

interface PercentSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PercentSummaryTheory: React.FC<PercentSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  return (
    <TheoryTemplate
      title="V. Százalékszámítás – Fejezeti Összefoglalás"
      subtitle="A 7. osztályos százalékszámítás és arányosság teljes elméleti és gyakorlati összefoglalása egy helyen"
      colorScheme="rose"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      badge="7. Osztály • Matematika V. Témakör"
    >
      {/* 1. Szekció: Az Alapfogalmak és a Hármas Szabály */}
      <TheorySection
        number={1}
        title="A Százalékszámítás Alapfogalmai és Alapképlete"
        subtitle="Alap (A), Százalékláb (p%), Százalékérték (É) és a százalék mint tört / tizedestört"
        colorScheme="rose"
        icon={<Percent className="w-5 h-5 text-rose-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A százalék a latin <em>„per centum”</em> (százanként) kifejezésből származik, és egy mennyiség{' '}
          <strong>századrészét</strong> jelenti: <MathText text="1\% = \frac{1}{100} = 0,01" />. Az ezrelék az egy ezredrészt jelenti: <MathText text="1‰ = \frac{1}{1000} = 0,001 = 0,1\%" />.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <FormulaCard
            title="Százalékérték (É)"
            formula="É = A \cdot \frac{p}{100} = A \cdot q"
            description="Az egésznek a megadott hányada vagy része. Például 800 Ft 25%-a = 800 · 0,25 = 200 Ft."
            badge="Részérték"
            color="rose"
          />
          <FormulaCard
            title="Százalékalap (A)"
            formula="A = \frac{É}{p / 100} = \frac{É}{q}"
            description="A teljes egész, azaz a 100%. Ha 300 Ft a 15%, akkor az egész: 300 / 0,15 = 2000 Ft."
            badge="A 100%"
            color="emerald"
          />
          <FormulaCard
            title="Százalékláb (p%)"
            formula="p\% = \frac{É}{A} \cdot 100\%"
            description="A rész és az egész aránya százalékban. 50-nek a 15-ös része: 15 / 50 · 100% = 30%."
            badge="Hány százalék?"
            color="cyan"
          />
        </div>

        <RuleBox title="A Százalékszámítás Hármas Alapszabálya" color="rose">
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Tört vagy tizedes szorzó (q):</strong> a százaléklábat átváltjuk tizedestörtté (<MathText text="q = p / 100" />), és azzal szorzunk.</li>
            <li><strong>1%-os következtetés:</strong> Kiszámítjuk az 1%-ot (osztunk a százaléklábbal vagy 100-zal), majd megszorozzuk a keresett százalékkal.</li>
            <li><strong>Következtetés egyenes arányossággal:</strong> Aránypárt írunk fel: <MathText text="\frac{É}{A} = \frac{p}{100}" />.</li>
          </ul>
        </RuleBox>
      </TheorySection>

      {/* 2. Szekció: Arányosság és Arányos Osztás */}
      <TheorySection
        number={2}
        title="Arányosságok és Arányos Osztás"
        subtitle="Egyenes és fordított arányosság, arányos részekre bontás"
        colorScheme="blue"
        icon={<Scale className="w-5 h-5 text-blue-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A százalékszámítás az arányosság közvetlen alkalmazása. Két mennyiség viszonyát két alapesetben vizsgáljuk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <ExampleCard
            title="Egyenes arányosság"
            subtitle="Hányadosuk állandó: y / x = c"
            steps={[
              { label: 'Tulajdonság', value: 'Ha az egyik valahányszorosára nő, a másik is annyiszorosára nő.' },
              { label: 'Grafikon', value: 'Az origóból (0; 0) kiinduló félegyenes.' },
              { label: 'Példa', value: 'Menetidő állandó sebességnél, áruk ára a tömeg függvényében.' }
            ]}
            color="blue"
          />
          <ExampleCard
            title="Fordított arányosság"
            subtitle="Szorzatuk állandó: x · y = c"
            steps={[
              { label: 'Tulajdonság', value: 'Ha az egyik valahányszorosára nő, a másik annyiad részére csökken.' },
              { label: 'Grafikon', value: 'Hiperbolaág a pozitív síknegyedben.' },
              { label: 'Példa', value: 'Munkások száma és munkaidő, sebesség és menetidő adott úton.' }
            ]}
            color="indigo"
          />
        </div>

        <AlertBox title="Arányos osztás algoritmusa" type="info">
          Ha 120 000 Ft-ot kell elosztani 2 : 3 : 5 arányban:
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Összes rész: 2 + 3 + 5 = 10 rész.</li>
            <li>Egy rész értéke: 120 000 : 10 = 12 000 Ft.</li>
            <li>Részek kiszámítása: 2 · 12 000 = 24 000 Ft; 3 · 12 000 = 36 000 Ft; 5 · 12 000 = 60 000 Ft.</li>
            <li>Ellenőrzés: 24 000 + 36 000 + 60 000 = 120 000 Ft.</li>
          </ol>
        </AlertBox>
      </TheorySection>

      {/* 3. Szekció: Árváltozások és Szorzótényezők */}
      <TheorySection
        number={3}
        title="Árváltozások és Egylépéses Szorzótényezők"
        subtitle="Százalékos növekedés, leértékelés, ÁFA és árrés"
        colorScheme="amber"
        icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A modern matematikai gyakorlatban a növekedést és csökkenést <strong>egylépéses szorzással</strong> számoljuk ki:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <FormulaCard
            title="p%-os növekedés (Áremelés)"
            formula="\text{Új érték} = A \cdot \left(1 + \frac{p}{100}\right)"
            description="+20%-os áremelésnél a szorzó: 1 + 0,20 = 1,20. Pl. 5000 · 1,20 = 6000 Ft."
            badge="+p% szorzója"
            color="amber"
          />
          <FormulaCard
            title="p%-os csökkenés (Leértékelés)"
            formula="\text{Új érték} = A \cdot \left(1 - \frac{p}{100}\right)"
            description="-15%-os akciónál a szorzó: 1 - 0,15 = 0,85. Pl. 8000 · 0,85 = 6800 Ft."
            badge="-p% szorzója"
            color="rose"
          />
        </div>

        <RuleBox title="Gyakori Szorzótényezők és ÁFA Szabályok" color="amber">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-sm">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-slate-800">
              <div className="font-bold text-amber-600">+10%</div>
              <div className="text-xs text-slate-500">· 1,10</div>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-slate-800">
              <div className="font-bold text-amber-600">+27% (ÁFA)</div>
              <div className="text-xs text-slate-500">· 1,27</div>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-slate-800">
              <div className="font-bold text-rose-600">-20%</div>
              <div className="text-xs text-slate-500">· 0,80</div>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-slate-800">
              <div className="font-bold text-rose-600">-35%</div>
              <div className="text-xs text-slate-500">· 0,65</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
            <strong>Bruttó és nettó ár kapcsolata:</strong> <MathText text="\text{Bruttó} = \text{Nettó} \cdot 1,27" />, így visszaszámoláskor <MathText text="\text{Nettó} = \text{Bruttó} : 1,27" />.
          </p>
        </RuleBox>
      </TheorySection>

      {/* 4. Szekció: Összetett Feladatok és Keverékek */}
      <TheorySection
        number={4}
        title="Összetett Árváltozások és Keverési Feladatok"
        subtitle="Egymást követő árváltozások láncolása, kamatos kamat és tömegszázalék"
        colorScheme="purple"
        icon={<FlaskConical className="w-5 h-5 text-purple-600" />}
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Több egymást követő változás esetén a szorzótényezők <strong>összeszorzódnak</strong>. Fontos, hogy a százalékok nem adódnak össze, mert a második változás már a megváltozott új alapra vonatkozik!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <FormulaCard
            title="Láncolt Árváltozás"
            formula="\text{Végár} = A \cdot q_1 \cdot q_2"
            description="+20% majd -20% nem ad 0%-ot! Szorzó: 1,20 · 0,80 = 0,96, azaz a termék 4%-kal olcsóbb lett."
            badge="Alapváltás"
            color="purple"
          />
          <FormulaCard
            title="Keverék Tömegszázaléka"
            formula="w\% = \frac{m_{\text{oldott}}}{m_{\text{oldat}}} \cdot 100\%"
            description="Az oldott anyag tömegének és a teljes oldat (oldott anyag + víz) tömegének aránya."
            badge="Tömegszázalék"
            color="teal"
          />
        </div>

        <ExampleCard
          title="Keverési feladat megoldása táblázattal"
          subtitle="200 g 15%-os és 300 g 25%-os sóoldat összeöntése"
          steps={[
            { label: '1. oldat sótartalma', value: '200 g · 0,15 = 30 g só' },
            { label: '2. oldat sótartalma', value: '300 g · 0,25 = 75 g só' },
            { label: 'Keverék teljes tömege', value: '200 g + 300 g = 500 g keverék' },
            { label: 'Összes sótartalom', value: '30 g + 75 g = 105 g só' },
            { label: 'Keverék töménysége', value: '105 g / 500 g = 0,21 ⟹ 21%-os oldat' }
          ]}
          color="purple"
        />
      </TheorySection>

      {/* 5. Szekció: Tipikus Hibák és Gyors Ellenőrzés */}
      <TheorySection
        number={5}
        title="Tipikus Csapdák és Megoldási Módszertan"
        subtitle="Mire figyelj oda mindig a témazáróban és felvételin?"
        colorScheme="slate"
        icon={<CheckCircle2 className="w-5 h-5 text-slate-700" />}
      >
        <div className="space-y-3">
          <AlertBox title="1. Csapda: Százalékok összeadása az alapváltás helyett" type="warning">
            Ha egy termék ára először nő 10%-kal, majd 10%-kal csökken, nem kapjuk vissza az eredeti árat!
            1 · 1,10 · 0,90 = 0,99 (1%-os veszteség). Mindig szorozd a tényezőket!
          </AlertBox>

          <AlertBox title="2. Csapda: A 'miből indulunk ki' alap tévesztése" type="warning">
            Ha egy ruha akciós ára 6800 Ft (-15% után), akkor a 6800 Ft a 85%!
            Nem a 6800 Ft 15%-át kell hozzáadni, hanem: 6800 : 0,85 = 8000 Ft az eredeti ár!
          </AlertBox>

          <AlertBox title="3. Csapda: Víz hozzáadása hígításkor" type="info">
            Tiszta víz hozzáadásakor az oldott anyag (só, cukor) mennyisége nem változik, csak az oldat teljes tömege nő meg!
          </AlertBox>
        </div>

        <div className="mt-6">
          <QuickQuiz
            question="Egy kabát árát 25%-kal felemelték, majd a szezon végén 20%-kal leértékelték. Hogyan változott a kabát ára az eredetihez képest?"
            options={[
              '5%-kal drágább lett',
              'Pontosan az eredeti árra állt vissza',
              '2%-kal olcsóbb lett',
              '4%-kal drágább lett'
            ]}
            correctIndex={1}
            explanation="A szorzók szorzata: 1,25 · 0,80 = 1,00, tehát a kabát ára pontosan 100%-a maradt az eredetinek!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PercentSummaryTheory;
