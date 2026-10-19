import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Scale,
  FlaskConical,
  Clock,
  ArrowRightLeft,
  Search,
  BookOpen,
  Calculator,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';

export interface WordProblemsSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const WordProblemsSummaryTheory: React.FC<WordProblemsSummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  return (
    <TheoryTemplate
      title="VI. Fejezet: Mérés, Arányosság és Szöveges Feladatok Összefoglalása"
      subtitle="Átfogó rendszerezés és ismétlés: tömeg, űrtartalom, idő, egyenes arányosság, lebontogatási módszer és a szöveges feladatmegoldás stratégiái"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR: MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK • 📖 TANANYAG"
      documentId="5_osztaly_osszefoglalas_elmelet"
      pdfFilename="5_osztaly_fejezet6_osszefoglalas.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz || onSwitchToQuiz}
      onSwitchToQuiz={onSwitchToQuiz}
      quickRule={{
        label: 'A VI. Fejezet Főtétele',
        formula: 'Mérés (átváltások) → Arányosság (egységár) → Modellalkotás (egyenlet & ellenőrzés)'
      }}
    >
      {/* 1. RÉSZ: A HÁROM ALAPVETŐ MÉRÉS ÉS MÉRTÉKEGYSÉGEK */}
      <TheorySection
        id="summary-sec-1"
        title="1. Mérések és Váltószámok Rendszere"
        subtitle="A tömeg, az űrtartalom és az idő mértékegységeinek összefoglaló tablója"
        icon={<Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
      >
        <TheoryCard
          title="Tömeg, Űrtartalom és Idő Mértékei"
          description="Emlékezz a váltószámokra! Nagyobbra váltva osztunk, kisebbre váltva szorzunk a váltószámmal."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5 text-xs">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                <Scale className="w-4 h-4" /> Tömegmértékek
              </div>
              <p>• <strong>1 t (tonna):</strong> 1000 kg</p>
              <p>• <strong>1 q (mázsa):</strong> 100 kg</p>
              <p>• <strong>1 kg:</strong> 100 dkg = 1000 g</p>
              <p>• <strong>1 dkg:</strong> 10 g</p>
              <p>• <strong>1 g:</strong> 1000 mg</p>
            </div>

            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1.5 text-xs">
              <div className="font-bold flex items-center gap-1.5 text-cyan-800 dark:text-cyan-300">
                <FlaskConical className="w-4 h-4" /> Űrtartalom mértékek
              </div>
              <p>• <strong>1 hl (hektoliter):</strong> 100 l</p>
              <p>• <strong>1 l (liter):</strong> 10 dl = 1000 ml</p>
              <p>• <strong>1 dl:</strong> 10 cl = 100 ml</p>
              <p>• <strong>1 cl:</strong> 10 ml</p>
              <p className="font-bold text-cyan-900 dark:text-cyan-200 bg-cyan-100 dark:bg-cyan-900/50 p-1 rounded">
                ⭐ 1 liter = 1 dm³ = 1000 cm³
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1.5 text-xs">
              <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                <Clock className="w-4 h-4" /> Időmértékek (60-as alap)
              </div>
              <p>• <strong>1 nap:</strong> 24 óra</p>
              <p>• <strong>1 h (óra):</strong> 60 min (perc) = 3600 s</p>
              <p>• <strong>1 min (perc):</strong> 60 s (másodperc)</p>
              <p>• <strong>1 hét:</strong> 7 nap = 168 óra</p>
              <p>• <strong>1 év:</strong> 365 nap (szökőév: 366)</p>
            </div>
          </div>

          <FormulaBox
            title="Az aranyszabály az átváltásoknál"
            formula="Kisebb egység felé haladva SZORZUNK (·), nagyobb egység felé haladva OSZTUNK (:)"
            explanation="Például: 2,5 kg = 2,5 · 100 = 250 dkg (kisebb egység, szorozzuk). 4500 ml = 4500 : 1000 = 4,5 liter (nagyobb egység, osztjuk)."
          />
        </TheoryCard>
      </TheorySection>

      {/* 2. RÉSZ: VÁLTOZÓ MENNYISÉGEK ÉS EGYENES ARÁNYOSSÁG */}
      <TheorySection
        id="summary-sec-2"
        title="2. Arányosság és Változó Mennyiségek"
        subtitle="Hogyan változik az egyik mennyiség, amikor a másik növekszik?"
        icon={<TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
      >
        <TheoryCard
          title="Egyenes Arányosság és a Hármasszabály"
          description="Két összetartozó mennyiség egyenesen arányos, ha ahányszorosára növeljük az egyiket, pontosan annyiszorosára nő a másik is."
        >
          <TheoryTable
            headers={['Tulajdonság', 'Egyenes arányosság', 'Fordított jellegű összefüggés']}
            rows={[
              ['Meghatározás', 'Hányszorosára nő az egyik, annyiszorosára nő a másik.', 'Hányszorosára nő az egyik, annyiad részére csökken a másik.'],
              ['Állandó érték', 'Hányadosuk állandó: y : x = k (állandó)', 'Szorzatuk állandó: x · y = k (állandó)'],
              ['Hétköznapi példa', 'Több kilogramm alma több forintba kerül.', 'Több munkás kevesebb nap alatt építi fel a házat.'],
              ['Számolási stratégia', '1 egység értékének kiszámítása (egységre következtetés).', 'A teljes munkamennyiség („embernapok”) kiszámítása.']
            ]}
          />

          <ExampleBox
            title="Példa: A klasszikus hármasszabály"
            steps={[
              { label: 'Feladat', value: '4 db füzet ára 1400 Ft. Mennyibe kerül 7 db ilyen füzet?' },
              { label: '1. lépés (Egységár)', value: '1 db füzet ára: 1400 Ft : 4 = 350 Ft.' },
              { label: '2. lépés (Keresett mennyiség)', value: '7 db füzet ára: 7 · 350 Ft = 2450 Ft.' },
              { label: 'Válasz', value: '7 darab füzet 2450 Ft-ba kerül.' }
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* 3. RÉSZ: NYITOTT MONDATOK ÉS A LEBONTOGATÁS */}
      <TheorySection
        id="summary-sec-3"
        title="3. Nyitott Mondatok, Egyenletek és Mérlegelv"
        subtitle="Hogyan hámozzuk le a műveleteket az ismeretlenről?"
        icon={<Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
      >
        <TheoryCard
          title="A Lebontogatási Módszer és a Mérlegelv"
          description="Az egyenletek olyanok, mint az egyensúlyban lévő kétkarú mérleg: ha mindkét oldalról ugyanazt a műveletet hajtjuk végre, az egyensúly megmarad."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs space-y-1">
              <strong>Fordított műveletek párjai:</strong>
              <p>• Összeadás (+) ↔ Kivonás (−)</p>
              <p>• Szorzás (·) ↔ Osztás (:)</p>
              <p>• Lebontási sorrend: <strong>a legkülső művelettel kezdjük!</strong></p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs space-y-1">
              <strong>Alaphalmaz és Igazsághalmaz:</strong>
              <p>• <strong>Alaphalmaz (A):</strong> A megengedett számok.</p>
              <p>• <strong>Igazsághalmaz (I):</strong> Azok, amik igazzá teszik az állítást.</p>
              <p>• <strong>Ellenőrzés:</strong> Mindig kötelező behelyettesíteni az eredetibe!</p>
            </div>
          </div>

          <ExampleBox
            title="Összetett lebontogatási feladat"
            steps={[
              { label: 'Egyenlet', value: '(4 · x − 6) : 5 + 3 = 9' },
              { label: '1. lépés (−3)', value: '(4 · x − 6) : 5 = 6' },
              { label: '2. lépés (·5)', value: '4 · x − 6 = 30' },
              { label: '3. lépés (+6)', value: '4 · x = 36' },
              { label: '4. lépés (:4)', value: 'x = 9' },
              { label: 'Ellenőrzés', value: '(4 · 9 − 6) : 5 + 3 = (36 − 6) : 5 + 3 = 30 : 5 + 3 = 6 + 3 = 9 (Igaz!)' }
            ]}
          />

          <TheoryTrapBox
            title="Vigyázz a kivonandó keresésekor!"
            content="Ha a kivonandó az ismeretlen: a − x = b esetén x = a − b! Például: 50 − x = 18 → x = 50 − 18 = 32 (nem pedig 50 + 18)!"
          />
        </TheoryCard>
      </TheorySection>

      {/* 4. RÉSZ: A SZÖVEGES FELADATOK 5 LÉPÉSE ÉS MODELLJEI */}
      <TheorySection
        id="summary-sec-4"
        title="4. Szöveges Feladatok Megoldási Stratégiája"
        subtitle="Az 5 aranyszabály, a szakaszos ábrázolás és a mindennapi élet modelljei"
        icon={<ShoppingCart className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
      >
        <TheoryCard
          title="A Sikeres Feladatmegoldás 5 Lépése"
          description="Soha ne kapkodj! Haladj szisztematikusan a lépéseken keresztül!"
        >
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs my-3 font-semibold">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-blue-600 block text-lg font-black mb-1">1.</span>
              Adatok lejegyzése, ismeretlen megjelölése
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-purple-600 block text-lg font-black mb-1">2.</span>
              Tervkészítés (Szakaszos ábra vagy egyenlet)
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <span className="text-amber-600 block text-lg font-black mb-1">3.</span>
              Pontos számolás és kiszámítás
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-emerald-600 block text-lg font-black mb-1">4.</span>
              Valóságos szöveges ellenőrzés
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <span className="text-rose-600 block text-lg font-black mb-1">5.</span>
              Válaszadás mértékegységgel, kerek mondatban
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <TheoryCallout
              type="tip"
              title="A Szakaszos Ábrázolás Varázslata"
              message="Ha két dolog összege és különbsége vagy aránya ismert, rajzolj szakaszokat! Például: Petinek 3-szor annyi van, mint Robinak → Robi 1 szakasz, Peti 3 szakasz, együtt 4 egyenlő rész!"
            />
            <TheoryCallout
              type="info"
              title="Készpénzes Fizetés és Kerekítés Magyarországon"
              message="A forintos végösszeg készpénznél az 5 Ft-os érmékhez kerekedik: 1, 2 Ft → 0 Ft | 3, 4 Ft → 5 Ft | 6, 7 Ft → 5 Ft | 8, 9 Ft → 10 Ft."
            />
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WordProblemsSummaryTheory;
