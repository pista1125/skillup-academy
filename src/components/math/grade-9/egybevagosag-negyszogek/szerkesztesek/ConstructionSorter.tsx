import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConstructionSorterProps {
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
    title: '1. Szint: Mértani Helyek a Síkban',
    subtitle: 'Sorold be az állításokat és geometriai pontokat a megfelelő mértani helyhez!',
    categories: [
      {
        id: 'cat-bisect',
        name: 'Szakaszfelező Merőleges',
        description: 'Két rögzített ponttól (A és B) egyenlő távolságra fekvő pontok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-anglebisect',
        name: 'Szögfelező Egyenes / Félegyenes',
        description: 'Két metsző egyenestől / szögszártól egyenlő távolságra fekvő pontok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-circle',
        name: 'Körvonal / Körív',
        description: 'Egy rögzített ponttól fix R távolságra lévő pontok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Szakaszfelező merőleges
      { id: 'cs1-1', label: 'Két adott ponttól (A és B) egyenlő távolságra fekvő pontok összessége', category: 'cat-bisect' },
      { id: 'cs1-2', label: 'Háromszög körülírt körének középpontja (három oldal felezőmerőlegesének metszéspontja)', category: 'cat-bisect' },
      { id: 'cs1-3', label: 'Egy szakaszt derékszögben és a felezőpontjában metsző egyenes', category: 'cat-bisect' },
      { id: 'cs1-4', label: 'Húrtrapéz szimmetriatengelye az alapok mentén', category: 'cat-bisect' },
      // Szögfelező
      { id: 'cs1-5', label: 'Két metsző egyenestől egyenlő távolságra fekvő pontok mértani helye', category: 'cat-anglebisect' },
      { id: 'cs1-6', label: 'Háromszög beírt körének középpontja (belső szögfelezők közös pontja)', category: 'cat-anglebisect' },
      { id: 'cs1-7', label: 'A szög mindkét szárától azonos merőleges távolságú belső pontok', category: 'cat-anglebisect' },
      { id: 'cs1-8', label: 'Rombusz és deltoid belső szögét felező szimmetriaátló', category: 'cat-anglebisect' },
      // Körvonal
      { id: 'cs1-9', label: 'Egy rögzített O ponttól pontosan R távolságra elhelyezkedő pontok halmaza', category: 'cat-circle' },
      { id: 'cs1-10', label: 'Háromszög harmadik csúcsa, ha az egyik oldal és a másik két oldal hossza ismert', category: 'cat-circle' },
      { id: 'cs1-11', label: 'Thalész-tétel szerinti derékszögű csúcsok mértani helye az átmérő felett', category: 'cat-circle' },
      { id: 'cs1-12', label: 'Körzővel kijelölhető fix távolságú pontok íve a vonalzón mért hossz alapján', category: 'cat-circle' }
    ]
  },
  2: {
    title: '2. Szint: Szögek Euklideszi Megszerkeszthetősége',
    subtitle: 'Válogasd szét a szögeket aszerint, hogy körzővel és vonalzóval euklideszi módon megszerkeszthetők-e!',
    categories: [
      {
        id: 'cat-constructible',
        name: 'Szerkeszthető Szögek',
        description: 'Véges sok euklideszi körző- és vonalzó-lépéssel előállíthatók',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-nonconstructible',
        name: 'NEM Szerkeszthető Szögek',
        description: 'Euklideszi eszközökkel pontosan nem szerkeszthetők (pl. szögharmadolási akadály)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Szerkeszthető
      { id: 'cs2-1', label: '60°-os szög (szabályos háromszögből)', category: 'cat-constructible' },
      { id: 'cs2-2', label: '45°-os szög (derékszög felezésével)', category: 'cat-constructible' },
      { id: 'cs2-3', label: '75°-os szög (60° és 15° összegeként)', category: 'cat-constructible' },
      { id: 'cs2-4', label: '15°-os szög (60° egymás utáni felezéseivel)', category: 'cat-constructible' },
      { id: 'cs2-5', label: '105°-os szög (90° + 15° vagy 60° + 45°)', category: 'cat-constructible' },
      { id: 'cs2-6', label: '135°-os szög (90° + 45° vagy 180° − 45°)', category: 'cat-constructible' },
      // Nem szerkeszthető
      { id: 'cs2-7', label: '20°-os szög (általános szögharmadolási probléma)', category: 'cat-nonconstructible' },
      { id: 'cs2-8', label: '40°-os szög (harmadolás hiányában nem állítható elő)', category: 'cat-nonconstructible' },
      { id: 'cs2-9', label: '50°-os szög (20° pótszöge szerkeszthetetlensége miatt)', category: 'cat-nonconstructible' },
      { id: 'cs2-10', label: '10°-os szög (a 20° felezése sem oldható meg euklideszi alapokból)', category: 'cat-nonconstructible' },
      { id: 'cs2-11', label: '70°-os szög (algebrailag 3. fokú egyenlethez vezet)', category: 'cat-nonconstructible' },
      { id: 'cs2-12', label: '80°-os szög (nem a 15° többszöröse vagy Gauss-féle szerkeszthető szög)', category: 'cat-nonconstructible' }
    ]
  },
  3: {
    title: '3. Szint: Háromszög-szerkesztések Megoldhatósági Esetei',
    subtitle: 'Csoportosítsd az adott adatokból adódó háromszög-szerkesztési eseteket megoldásaik száma szerint!',
    categories: [
      {
        id: 'cat-unique',
        name: 'Egyértelmű (1 Megoldás)',
        description: 'Egyetlen egybevágó háromszög létezik az adott adatokkal',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-two',
        name: 'Két Megoldás (2 Háromszög)',
        description: 'Két nem egybevágó háromszög is kielégíti a feltételeket',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-impossible',
        name: 'Nincs Megoldás (0 Háromszög)',
        description: 'A feltételek ellentmondásosak vagy megsértik a geometriai tételeket',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Egyértelmű (1 megoldás)
      { id: 'cs3-1', label: 'Három oldal adott: a = 5 cm, b = 6 cm, c = 7 cm (egyenlőtlenség teljesül)', category: 'cat-unique' },
      { id: 'cs3-2', label: 'Két oldal és közbezárt szög: a = 4 cm, b = 6 cm, γ = 50°', category: 'cat-unique' },
      { id: 'cs3-3', label: 'Egy oldal és a két rajta fekvő szög: c = 8 cm, α = 40°, β = 60°', category: 'cat-unique' },
      { id: 'cs3-4', label: 'Két oldal és a nagyobbikkal szemközti szög: a = 8 cm, b = 5 cm, α = 60°', category: 'cat-unique' },
      // Két megoldás
      { id: 'cs3-5', label: 'Két oldal és a kisebbikkel szemközti hegyesszög: a = 4 cm, b = 6 cm, α = 35° (a körív kétszer metszi a szögszárat)', category: 'cat-two' },
      { id: 'cs3-6', label: 'Ha a magasság rövidebb a keresett szárnál, de a szár rövidebb a másik adott oldalnál (m_a < a < b)', category: 'cat-two' },
      { id: 'cs3-7', label: 'Két oldal és kisebbikkel szemközti szög esetén a körzőív a vetületi talppont két oldalán metszi a szárat', category: 'cat-two' },
      { id: 'cs3-8', label: 'a = 5 cm, b = 8 cm, α = 30° (b · sin 30° = 4 cm < 5 cm < 8 cm)', category: 'cat-two' },
      // Nincs megoldás (0)
      { id: 'cs3-9', label: 'Három oldal: a = 3 cm, b = 4 cm, c = 10 cm (3 + 4 < 10, háromszög-egyenlőtlenség sérül)', category: 'cat-impossible' },
      { id: 'cs3-10', label: 'Két adott szög összege meghaladja a 180°-ot: α = 100°, β = 95°', category: 'cat-impossible' },
      { id: 'cs3-11', label: 'Két oldal és kisebbikkel szemközti szög: a = 2 cm, b = 10 cm, α = 30° (a < b · sin(α) = 5 cm, nem éri el az egyenest)', category: 'cat-impossible' },
      { id: 'cs3-12', label: 'Tompaszög van a kisebbik adott oldallal szemben: a = 4 cm, b = 7 cm, α = 110° (lehetetlen konfiguráció)', category: 'cat-impossible' }
    ]
  }
};

export const ConstructionSorter: React.FC<ConstructionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-trans-szerkesztes',
  topicTitle = '4. Szerkesztések'
}) => {
  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
      initialLevel={currentLevel || level}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

