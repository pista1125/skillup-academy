import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface PracticalSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Modellek Függvénytípusa',
    subtitle: 'Sorold be a hétköznapi jelenségeket a megfelelő matematikai függvénycsaládba!',
    categories: [
      {
        id: 'cat-linear',
        name: 'Lineáris Modell (f(x) = mx + b)',
        description: 'Egyenletes növekedés vagy csökkenés, állandó változási sebesség',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-quadratic',
        name: 'Másodfokú Modell (Parabola)',
        description: 'Gravitációs gyorsuló mozgás, területszámítás, fékút és nyereség-csúcs',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-piecewise',
        name: 'Szakaszonkénti / Lépcsős Modell',
        description: 'Sávos tarifák, megkezdett órák díja, kedvezményes küszöbök',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Lineáris
      { id: 'ps1-1', label: 'Taxi viteldíj fix alapdíjjal és kilométerdíjjal', category: 'cat-linear' },
      { id: 'ps1-2', label: 'Egyenletes sebességgel haladó autó út-idő függvénye', category: 'cat-linear' },
      { id: 'ps1-3', label: 'Egyenletesen csöpögő csap vízmennyisége az időben', category: 'cat-linear' },
      { id: 'ps1-4', label: 'Költségfüggvény állandó darabonkénti önköltséggel: K(x) = 20 000 + 500x', category: 'cat-linear' },
      // Másodfokú
      { id: 'ps1-5', label: 'Függőlegesen felhajított kő magasság-idő függvénye', category: 'cat-quadratic' },
      { id: 'ps1-6', label: 'Autó fékútjának hossza a sebesség függvényében (s = k · v²)', category: 'cat-quadratic' },
      { id: 'ps1-7', label: 'Adott kerületű téglalap területe az egyik oldal függvényében', category: 'cat-quadratic' },
      { id: 'ps1-8', label: 'Árcsökkentés hatása a profitra: csúcspontos parabola', category: 'cat-quadratic' },
      // Lépcsős / Szakaszonkénti
      { id: 'ps1-9', label: 'Parkolási díj minden megkezdett óra után', category: 'cat-piecewise' },
      { id: 'ps1-10', label: 'Csomagküldési díj súlykategóriák (0-2 kg, 2-5 kg, 5-10 kg) szerint', category: 'cat-piecewise' },
      { id: 'ps1-11', label: 'Mobilcsomag 100 lebeszélhető ingyen perccel, majd percdíjjal', category: 'cat-piecewise' },
      { id: 'ps1-12', label: 'Villanyszámla átlagfogyasztás feletti emelt tarifával', category: 'cat-piecewise' }
    ]
  },
  2: {
    title: '2. Szint: Reális Értelmezési Tartományok',
    subtitle: 'Csoportosítsd a gyakorlati feladatok változóit a valóságban lehetséges értékhalmazuk szerint!',
    categories: [
      {
        id: 'cat-domain-naturals',
        name: 'Nemnegatív Egészek (x ∈ ℕ₀)',
        description: 'Csak egész darabszámok, személyek száma (nem törhető szét)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-domain-positive-reals',
        name: 'Pozitív Valós Számok (x ∈ ℝ⁺)',
        description: 'Folytonos mennyiségek: hosszúság, tömeg, folyadék, ár',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-domain-bounded-interval',
        name: 'Véges Zárt Szakasz ([0; T])',
        description: 'Véges ideig tartó fizikai folyamatok a leállásig / kiürülésig',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      // Egészek
      { id: 'ps2-1', label: 'Eladott színházjegyek száma egy előadásra', category: 'cat-domain-naturals' },
      { id: 'ps2-2', label: 'Legyártott kerékpárok darabszáma a gyárban', category: 'cat-domain-naturals' },
      { id: 'ps2-3', label: 'Autóbuszon tartózkodó utasok száma', category: 'cat-domain-naturals' },
      { id: 'ps2-4', label: 'Családi ház szobáinak száma', category: 'cat-domain-naturals' },
      // Pozitív valós számok
      { id: 'ps2-5', label: 'Kertkerítés oldalhossza méterben', category: 'cat-domain-positive-reals' },
      { id: 'ps2-6', label: 'Egy doboz alapterülete cm²-ben', category: 'cat-domain-positive-reals' },
      { id: 'ps2-7', label: 'Gépjármű átlagos üzemanyag-fogyasztása (liter)', category: 'cat-domain-positive-reals' },
      { id: 'ps2-8', label: 'Termék egységára forintban', category: 'cat-domain-positive-reals' },
      // Véges szakasz
      { id: 'ps2-9', label: 'Feldobott kő repülési ideje a becsapódásig ([0; t_becsapódás])', category: 'cat-domain-bounded-interval' },
      { id: 'ps2-10', label: '500 literes víztartály kiürülésének időtartama ([0; 20 perc])', category: 'cat-domain-bounded-interval' },
      { id: 'ps2-11', label: 'Laptop akkumulátor lemerülése a teljes töltöttségtől ([0; 8 óra])', category: 'cat-domain-bounded-interval' },
      { id: 'ps2-12', label: 'Egy jégtömb teljes elolvadásának időintervalluma', category: 'cat-domain-bounded-interval' }
    ]
  },
  3: {
    title: '3. Szint: Gazdasági Eredmény Zónák',
    subtitle: 'Sorold be a vállalkozás állapotait az árbevétel B(x) és összköltség K(x) viszonya alapján!',
    categories: [
      {
        id: 'cat-zone-loss',
        name: 'Veszteséges Zóna (B(x) < K(x))',
        description: 'A bevétel még nem fedi a költségeket, a profit negatív',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-zone-breakeven',
        name: 'Fedezeti Pont (B(x) = K(x))',
        description: 'A nyereség pontosan 0, a költségek megtérültek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-zone-profit',
        name: 'Nyereséges Zóna (B(x) > K(x))',
        description: 'A bevétel meghaladja a költségeket, tiszta profit keletkezik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Veszteség
      { id: 'ps3-1', label: 'Az eladott mennyiség kevesebb a fedezeti pontnál (x < x_fed)', category: 'cat-zone-loss' },
      { id: 'ps3-2', label: 'K(x) = 50 000 + 1000x, de csak x = 10 db fogy el 2000 Ft-ért', category: 'cat-zone-loss' },
      { id: 'ps3-3', label: 'A fix beruházási költségeket a bevétel még nem termelte ki', category: 'cat-zone-loss' },
      { id: 'ps3-4', label: 'A profitgörbe az x-tengely alatt fut (P(x) < 0)', category: 'cat-zone-loss' },
      // Fedezet
      { id: 'ps3-5', label: 'A költség- és bevételi egyenesek metszéspontja a grafikonon', category: 'cat-zone-breakeven' },
      { id: 'ps3-6', label: 'K(x) = 40 000 + 1000x, B(x) = 3000x, és pontosan x = 20 db-ot adnak el', category: 'cat-zone-breakeven' },
      { id: 'ps3-7', label: 'A vállalkozás se nem nyer, se nem veszít (P(x) = 0)', category: 'cat-zone-breakeven' },
      { id: 'ps3-8', label: 'A küszöbmennyiség, ahonnan minden újabb eladás tiszta hasznot hoz', category: 'cat-zone-breakeven' },
      // Nyereség
      { id: 'ps3-9', label: 'Az eladott darabszám meghaladja a fedezeti értéket (x > x_fed)', category: 'cat-zone-profit' },
      { id: 'ps3-10', label: 'K(x) = 40 000 + 1000x, eladva x = 50 db 3000 Ft-os áron', category: 'cat-zone-profit' },
      { id: 'ps3-11', label: 'A profitgörbe az x-tengely felett halad (P(x) > 0)', category: 'cat-zone-profit' },
      { id: 'ps3-12', label: 'Tiszta osztalék fizethető a tulajdonosoknak az adózott haszonból', category: 'cat-zone-profit' }
    ]
  }
};

export const PracticalSorter: React.FC<PracticalSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'gyakorlati-feladatok',
  topicTitle = 'Gyakorlati Feladatok & Modellezés'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      title="Gyakorlati Modellezés Csoportosító"
      subtitle="Kategorizáld a valós élethelyzeteket függvénytípusuk, értelmezési tartományuk és gazdasági eredményük szerint!"
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

