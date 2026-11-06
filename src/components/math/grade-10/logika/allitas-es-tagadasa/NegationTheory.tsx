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
  NegationTruthCriterionSvg,
  QuantifierDualitySvg,
  InequalityNegationSvg,
  VennFriendGroupSvg
} from './NegationFigures';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
  Brain,
  HelpCircle,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NegationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface InteractiveNegationItem {
  id: string;
  original: string;
  quantifierType: 'Általános (∀)' | 'Létezési (∃)' | 'Határérték / Reláció' | 'Rejtett kvantor';
  truthValue: 'IGAZ' | 'HAMIS' | 'Kontextusfüggő';
  correctNegation: string;
  alternativeNegation?: string;
  trapNegation: string;
  trapReason: string;
  explanation: string;
}

const INTERACTIVE_ITEMS: InteractiveNegationItem[] = [
  {
    id: 'neg-1',
    original: 'Az utcában minden autó Opel.',
    quantifierType: 'Általános (∀)',
    truthValue: 'Kontextusfüggő',
    correctNegation: 'Van olyan autó az utcában, amely nem Opel. (vagy: Nem minden autó Opel.)',
    alternativeNegation: 'Létezik legalább egy olyan autó, ami más márkájú.',
    trapNegation: 'Egyik autó sem Opel az utcában. (vagy: Minden autó Skoda.)',
    trapReason: 'Ez túl sokat mond! Ha az utcában áll 3 Opel és 1 Ford, akkor mindkét mondat egyszerre hamis lenne, tehát nem egymás tagadásai.',
    explanation: 'A „minden” állítás cáfolatához egyetlen ellenpélda (pl. egy Ford vagy Skoda) bőségesen elegendő.'
  },
  {
    id: 'neg-2',
    original: 'Minden diák szereti a matematikát.',
    quantifierType: 'Általános (∀)',
    truthValue: 'HAMIS',
    correctNegation: 'Van olyan diák, aki nem szereti a matematikát.',
    alternativeNegation: 'Nem minden diák szereti a matematikát.',
    trapNegation: 'Egyik diák sem szereti a matematikát.',
    trapReason: 'A tagadás nem az ellentétes végletet jelenti, hanem a kijelentés érvényességének megtörését.',
    explanation: 'A „minden P” tagadása pontosan a „van olyan, ami nem P”. Ha akár csak egyetlen diák sem szereti, az eredeti állítás máris megbukott.'
  },
  {
    id: 'neg-3',
    original: 'Van olyan macska, amelyik fekete.',
    quantifierType: 'Létezési (∃)',
    truthValue: 'IGAZ',
    correctNegation: 'Nincs olyan macska, amelyik fekete. (vagy: Minden macska nem fekete.)',
    alternativeNegation: 'Egyetlen macska sem fekete.',
    trapNegation: 'Van olyan macska, amelyik nem fekete.',
    trapReason: 'Gondolj bele: ha a világon van fekete macska is és fehér macska is, akkor mindkét mondat egyszerre IGAZ! Egymás tagadásai sosem lehetnek egyszerre igazak.',
    explanation: 'A létezési kvantoros állítás („van olyan”) tagadása azt követeli meg, hogy kivétel nélkül egyetlenegy se létezzen az adott tulajdonsággal.'
  },
  {
    id: 'neg-4',
    original: 'A dobozban legalább 5 piros golyó van.',
    quantifierType: 'Határérték / Reláció',
    truthValue: 'Kontextusfüggő',
    correctNegation: 'A dobozban kevesebb mint 5 (legfeljebb 4) piros golyó van.',
    alternativeNegation: 'A piros golyók száma < 5.',
    trapNegation: 'A dobozban legfeljebb 5 piros golyó van.',
    trapReason: 'Ha pontosan 5 golyó van a dobozban, akkor az eredeti állítás is igaz (5 ≥ 5) és a hibás tagadás is igaz (5 ≤ 5)! A határpontnak a komplementerbe kell kerülnie.',
    explanation: 'Az x ≥ 5 tagadása x < 5. A „legalább” (≥) tagadása mindig „kevesebb mint” (<).'
  },
  {
    id: 'neg-5',
    original: 'Minden prímszám páratlan.',
    quantifierType: 'Általános (∀)',
    truthValue: 'HAMIS',
    correctNegation: 'Van olyan prímszám, amely nem páratlan (páros).',
    alternativeNegation: 'Nem minden prímszám páratlan.',
    trapNegation: 'Minden prímszám páros.',
    trapReason: 'Ez a hibás mondat szintén hamis lenne! Egy állítás és helyes tagadása közül az egyiknek kötelezően igaznak kell lennie.',
    explanation: 'A 2-es szám az egyetlen páros prímszám: ez az egyetlen ellenpélda teszi hamissá az állítást, és igazzá a tagadását.'
  },
  {
    id: 'neg-6',
    original: 'A háromszög belső szögeinek összege 180°.',
    quantifierType: 'Rejtett kvantor',
    truthValue: 'IGAZ',
    correctNegation: 'Van olyan háromszög, amelynek belső szögeinek összege nem 180°.',
    alternativeNegation: 'Nem minden háromszög belső szögeinek összege 180°.',
    trapNegation: 'Egyik háromszög belső szögeinek összege sem 180°.',
    trapReason: 'A geometriai tételek univerzális igazságok: a rejtett „minden” szót kell feloldani és „van olyan”-ná alakítani.',
    explanation: 'A tétel kimondatlanul is azt jelenti: „Minden síkbeli háromszög belső szögeinek összege 180°”. Tagadásakor a „van olyan” lép életbe.'
  },
  {
    id: 'neg-7',
    original: 'Nincs Roxfort Hagrid nélkül.',
    quantifierType: 'Létezési (∃)',
    truthValue: 'Kontextusfüggő',
    correctNegation: 'Van Roxfort Hagrid nélkül.',
    alternativeNegation: 'Létezik olyan Roxfort, ahol nincs Hagrid.',
    trapNegation: 'Nincs Roxfort Hagriddal.',
    trapReason: 'A „nincs X Y nélkül” egy tagadó létezési állítás. Ennek közvetlen negációja a létezés: „Van X Y nélkül”.',
    explanation: 'Hivatalos tankönyvi feladat: a tagadás a hiány tagadása, vagyis az állapot megengedése.'
  }
];

export const NegationTheory: React.FC<NegationTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>('neg-1');
  const activeItem = INTERACTIVE_ITEMS.find((it) => it.id === selectedItemId) || INTERACTIVE_ITEMS[0];

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • I. LOGIKA"
      title="2. Állítás és tagadása"
      description="A tagadás logikai feltétele, a 'minden' (∀) és 'van olyan' (∃) kvantorok negálása, relációk és határértékek tagadása"
      ruleFormula="¬(∀x P(x)) ≡ ∃x ¬P(x) és ¬(∃x P(x)) ≡ ∀x ¬P(x)"
      ruleDescription="A tagadás aranyszabálya: Egy állítás és tagadása nem lehet egyszerre igaz, és nem lehet egyszerre hamis sem! Pontosan az egyik igaz."
      ruleCard="A TAGADÁS DUALITÁSI TÖRVÉNYE"
      pdfFileName="10_osztaly_allitas_es_tagadasa.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZAKASZ */}
      <TheorySection
        number={1}
        title="Mikor tagadása egy kijelentés a másiknak? A kettős feltétel!"
        badge="ALAPELV"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A mindennapi beszédben gyakran mondjuk egy állításra, hogy a „tagadása” egy másiknak, ha egyszerűen
            ellentétes véleményt fejez ki. A matematikában és a formális logikában azonban a{' '}
            <strong className="text-indigo-600 dark:text-indigo-400">tagadás (negáció)</strong> fogalma rendkívül
            szigorú és egyértelmű szabályhoz kötött.
          </p>

          <TheoryCard
            title="A Negáció Definíciója és Kettős Feltétele"
            subtitle="A logikai nem (¬A vagy ~A)"
            color="indigo"
          >
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Egy <span className="font-bold">A</span> állítás tagadását{' '}
                <strong className="text-indigo-600 dark:text-indigo-400">¬A</strong>-val jelöljük (olvasd: „nem A”).
                A ¬A kijelentés akkor és csak akkor tekinthető A helyes tagadásának, ha teljesül mindkét feltétel:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                  <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" /> 1. Feltétel:
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    Nem lehetnek egyszerre igazak (ha A igaz, ¬A kötelezően hamis).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <div className="font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" /> 2. Feltétel (Gyakori hiba!):
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    Nem lehetnek egyszerre hamisak sem (ha A hamis, ¬A kötelezően igaz)!
                  </p>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Svg demonstration */}
          <GeometryFigureCard
            title="A Tankönyvi Példa: Autók az utcában"
            caption="Miért NEM tagadása egymásnak a „Minden autó piros” és a „Nincs piros autó” mondat?"
            badge="SZEMLÉLTETÉS"
          >
            <NegationTruthCriterionSvg />
          </GeometryFigureCard>

          <TheoryTrapBox
            title="A Tipikus Csapda: A szélső ellentét NEM a logikai tagadás!"
            description="Képzeljük el az utcát, ahol 2 piros autó és 1 kék autó parkol. Ekkor:
            • A: „Az utcában minden autó piros.” → HAMIS (mert ott áll a kék autó).
            • B: „Nincs az utcában piros autó.” → Szintén HAMIS (hiszen látunk két pirosat is!).
            Mivel mindkét mondat egyszerre hamis, a B mondat NEM az A tagadása! A helyes tagadás: „Van olyan autó az utcában, amely nem piros.” (Ez a kék autó miatt valóban IGAZ!)."
          />
        </div>
      </TheorySection>

      {/* 2. SZAKASZ */}
      <TheorySection
        number={2}
        title="A kvantorok világa: Minden (∀) és Van olyan (∃)"
        badge="KVANTOROK"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A matematikában leggyakrabban előforduló kijelentések valamilyen mennyiségi hatókört fogalmaznak meg.
            Az ilyen mennyiségjelölő szavakat és szimbólumokat nevezzük{' '}
            <strong className="text-indigo-600 dark:text-indigo-400">kvantoroknak</strong>. Két alapvető kvantort
            használunk:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="Általános Kvantor (∀)"
              subtitle="Univerzális kvantor: „Minden”, „Bármely”, „Mindegyik”"
              color="indigo"
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  A <strong>∀</strong> jel a latin <em>omnis</em> vagy az angol <em>all</em> szóból ered (fejre állított A betű).
                </p>
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono text-indigo-700 dark:text-indigo-300">
                  ∀x ∈ H : P(x) („A H halmaz minden elemére teljesül a P tulajdonság.”)
                </div>
                <div className="p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-800 dark:text-rose-200">
                  <strong className="font-black">Az ellenpélda ereje:</strong> Egy „minden” állítás roppant igényes:
                  ha a világegyetemben akár csak egyetlen kivétel vagy ellenpélda akad, az állítás máris bukik (hamis lesz)!
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="Létezési Kvantor (∃)"
              subtitle="Egzisztenciális kvantor: „Van olyan”, „Létezik legalább egy”"
              color="emerald"
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  A <strong>∃</strong> jel az angol <em>exists</em> szóból származik (megfordított E betű).
                </p>
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono text-emerald-700 dark:text-emerald-300">
                  ∃x ∈ H : P(x) („Létezik legalább egy x eleme H-nak, amire teljesül a P tulajdonság.”)
                </div>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-200">
                  <strong className="font-black">Az igazolás ereje:</strong> A „van olyan” állítás bizonyításához
                  elegendő egyetlen konkrét működő példát mutatni. Nem kell minden esetet megvizsgálni!
                </div>
              </div>
            </TheoryCard>
          </div>

          <GeometryFigureCard
            title="A Kvantorok és a Tagadás Átváltási Szabálya"
            caption="Hogyan fordul meg a kvantor a tagadás során? A tagadás dualitási elve."
            badge="SZABÁLY"
          >
            <QuantifierDualitySvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ */}
      <TheorySection
        number={3}
        title="Kvantoros állítások tagadásának aranyszabályai"
        badge="SZABÁLYTÁR"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Amikor egy kvantort tartalmazó mondatot tagadunk, két dolgot hajtunk végre:
            <br />
            <strong>1. A kvantor megfordul:</strong> a „minden” átvált „van olyan”-ra, a „van olyan” pedig átvált „nincs olyan”-ra (vagy „minden ... nem”-re).
            <br />
            <strong>2. A tulajdonságot (állítmányt) negáljuk.</strong>
          </p>

          <TheoryTable
            title="Kvantoros Állítások és Helyes Tagadásaik Összehasonlító Táblázata"
            headers={['Eredeti Állítás', 'Logikai Kvantor', 'Helyes Tagadás', 'Tipikus Hiba (CSAPDA!)']}
            rows={[
              [
                'Minden diák szeret tanulni.',
                '∀ (Minden)',
                'Van olyan diák, aki nem szeret tanulni.',
                'Egyik diák sem szeret tanulni.'
              ],
              [
                'A ládában minden kocka barna.',
                '∀ (Minden)',
                'A ládában van olyan kocka, amely nem barna. (Nem minden kocka barna)',
                'A ládában minden kocka fekete.'
              ],
              [
                'Minden bankbetét fix kamatozású.',
                '∀ (Minden)',
                'Van olyan bankbetét, amely nem fix kamatozású.',
                'Nincs fix kamatozású bankbetét.'
              ],
              [
                'Van olyan macska, amelyik fekete.',
                '∃ (Van olyan)',
                'Nincs olyan macska, amelyik fekete. (Minden macska nem fekete)',
                'Van olyan macska, amelyik nem fekete.'
              ],
              [
                'Van olyan négyszög, ami szabályos.',
                '∃ (Van olyan)',
                'Egyetlen négyszög sem szabályos. (Nincs olyan...)',
                'Van olyan négyszög, ami nem szabályos.'
              ],
              [
                'Minden prímszám páratlan.',
                '∀ (Minden)',
                'Van olyan prímszám, ami nem páratlan (páros).',
                'Minden prímszám páros.'
              ]
            ]}
          />

          <TheoryCallout
            title="Megjegyzés a köznyelvi használatról"
            type="info"
          >
            A hétköznapi életben a „minden” szót gyakran pontatlanul használjuk: például 
            <em>„Minden idegszálával a meccsre figyelt”</em> vagy <em>„Mindenki ezt a sorozatot nézi”</em>.
            A matematikában azonban a „minden” szigorúan 100%-os kivételmentességet követel meg!
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ */}
      <TheorySection
        number={4}
        title="Rejtett kvantorok a geometriában és algebrában"
        badge="TÉTELEK"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A legtöbb matematikai tétel megfogalmazásakor a „minden” szót egyszerűen{' '}
            <strong className="text-indigo-600 dark:text-indigo-400">nem tesszük ki</strong>, mert a kontextusból
            magától értetődőnek tekintjük. Amikor azonban feladatként a tétel tagadását kell képeznünk, először mindig
            gondolatban ki kell tennünk a rejtett kvantort!
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                1. Példa: „A háromszög belső szögeinek összege 180°.”
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <strong>Rejtett értelmezés:</strong> <em>Minden</em> háromszög belső szögeinek összege 180°.
                <br />
                <strong>Helyes tagadás:</strong> <em>Van olyan háromszög</em>, amelynek a belső szögeinek összege nem 180°.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                2. Példa: „A rombusz átlói merőlegesek egymásra.”
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <strong>Rejtett értelmezés:</strong> <em>Minden</em> rombusz átlói merőlegesek egymásra.
                <br />
                <strong>Helyes tagadás:</strong> <em>Van olyan rombusz</em>, amelynek átlói nem merőlegesek egymásra.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                3. Példa: „Két páros szám összege osztható 4-gyel.”
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <strong>Rejtett értelmezés:</strong> <em>Bármely két</em> páros szám összege osztható 4-gyel. (Ez egy hamis állítás!).
                <br />
                <strong>Helyes tagadás:</strong> <em>Van olyan két</em> páros szám, amelyek összege nem osztható 4-gyel. (Pl. 2 + 4 = 6).
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ */}
      <TheorySection
        number={5}
        title="Határértékek és egyenlőtlenségek tagadása"
        badge="KOMPLEMENTER"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Egyenlőtlenségek és mennyiségi határok tagadásakor az aranyszabály: a határpontnak pontosan az egyik
            tartományba kell tartoznia (vagy az eredetibe, vagy a tagadásba). Nem maradhat ki a határ, és nem szerepelhet
            kétszer sem!
          </p>

          <GeometryFigureCard
            title="A Számegyenes Két Felosztása: A határpont vándorlása"
            caption="Figyeld meg: ha x ≥ 5 tartalmazza az 5-öt (teli kör), akkor a tagadás x < 5 nem tartalmazhatja azt (üres kör)!"
            badge="SZÁMEGYENES"
          >
            <InequalityNegationSvg />
          </GeometryFigureCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-xs text-slate-500">Állítás:</div>
              <div className="font-black text-emerald-700 dark:text-emerald-300 text-base">x ≥ a („legalább a”)</div>
              <div className="text-xs text-slate-500 mt-1">Tagadása:</div>
              <div className="font-black text-indigo-700 dark:text-indigo-300 text-base">x &lt; a („kevesebb mint a”)</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-xs text-slate-500">Állítás:</div>
              <div className="font-black text-emerald-700 dark:text-emerald-300 text-base">x &gt; a („több mint a”)</div>
              <div className="text-xs text-slate-500 mt-1">Tagadása:</div>
              <div className="font-black text-indigo-700 dark:text-indigo-300 text-base">x ≤ a („legfeljebb a”)</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-xs text-slate-500">Állítás:</div>
              <div className="font-black text-emerald-700 dark:text-emerald-300 text-base">x ≤ a („legfeljebb a”)</div>
              <div className="text-xs text-slate-500 mt-1">Tagadása:</div>
              <div className="font-black text-indigo-700 dark:text-indigo-300 text-base">x &gt; a („több mint a”)</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-xs text-slate-500">Állítás:</div>
              <div className="font-black text-emerald-700 dark:text-emerald-300 text-base">x = a („pontosan a”)</div>
              <div className="text-xs text-slate-500 mt-1">Tagadása:</div>
              <div className="font-black text-indigo-700 dark:text-indigo-300 text-base">x ≠ a („nem a”)</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZAKASZ */}
      <TheorySection
        number={6}
        title="Emelt szintű érdekesség: A vacuous truth és a Venn-diagram"
        badge="EMELT SZINT"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Gondolkodtál már azon, mit jelent a mondat: <em>„Minden csokimat odaadom neked”</em>, ha egyáltalán
            nincs a zsebedben egyetlen darab csoki sem?
          </p>

          <TheoryCard
            title="A Csoki-paradoxon (Üres halmaz esete)"
            subtitle="Mi az igazságérték, ha az alaphalmaz elemeinek száma 0?"
            color="purple"
          >
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                A formális logikában ha nincs csokid, akkor <strong>nem tudsz olyan csokit mutatni, amit nem adtál oda</strong>.
                Ezért a tagadás (<em>„Van olyan csokim, amit nem adtam oda”</em>) egyértelműen <strong>HAMIS</strong>.
              </p>
              <p>
                Mivel a tagadás hamis, a harmadik kizárásának elve miatt az eredeti állítás kötelezően <strong>IGAZ</strong>!
                Ezt a jelenséget a matematikában <em>„triviális igazságnak” (vacuous truth)</em> nevezik:
                minden üres halmazról tett univerzális kijelentés igaz (pl. „Minden 10 lábú pegazus tud zongorázni”).
              </p>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="Tankönyvi Feladat: Baráti társaság sportolási szokásai"
            caption="Döntsd el a Venn-diagram alapján, hogy melyik állítás igaz és mi a pontos tagadása!"
            badge="DIAGRAM"
          >
            <VennFriendGroupSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 7. SZAKASZ: INTERAKTÍV LABOR A TANANYAG LEGÉGÉN */}
      <TheorySection
        number={7}
        title="Interaktív Kvantor- és Tagadás-Elemző Labor"
        badge="GYAKORLÓ LABOR"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Kattints az alábbi hivatalos tankönyvi és érettségi mintamondatokra! Figyeld meg a kvantor típusát,
            a helyes tagadás megfogalmazását, valamint a leggyakoribb félrevezető csapdát!
          </p>

          {/* Interactive sentence picker pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {INTERACTIVE_ITEMS.map((item) => {
              const isSelected = item.id === selectedItemId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`text-left p-2.5 rounded-xl border transition-all text-xs font-medium ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.01]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  <div className="line-clamp-1 font-semibold">{item.original}</div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.quantifierType}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed analysis of selected item */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800/60 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Vizsgált Mondat Elemzése
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 italic mt-0.5">
                  „{activeItem.original}”
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                  {activeItem.quantifierType}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    activeItem.truthValue === 'IGAZ'
                      ? 'bg-emerald-600 text-white'
                      : activeItem.truthValue === 'HAMIS'
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {activeItem.truthValue}
                </span>
              </div>
            </div>

            {/* Explanation columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Correct Negation */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Helyes Logikai Tagadás (¬A):
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 font-bold">
                  „{activeItem.correctNegation}”
                </div>
                {activeItem.alternativeNegation && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    <em>Vagy más szavakkal:</em> „{activeItem.alternativeNegation}”
                  </p>
                )}
                <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                  {activeItem.explanation}
                </p>
              </div>

              {/* Trap / False Negation */}
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-2">
                <div className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> Tipikus Hibás Tagadás (CSAPDA!):
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 font-bold">
                  „{activeItem.trapNegation}”
                </div>
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  <strong className="font-semibold">Miért téves?</strong> {activeItem.trapReason}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

