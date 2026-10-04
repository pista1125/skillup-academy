import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FrequencyStatisticsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A Három Középérték Jellemzői',
    subtitle: 'Válogasd szét az állításokat és tulajdonságokat: Számtani átlag, Medián vagy Módusz!',
    categories: [
      {
        id: 'cat-mean',
        name: 'Számtani Átlag (x̄)',
        description: 'Összeg osztva a darabszámmal, érzékeny a kiugró értékekre',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-median',
        name: 'Medián (Me)',
        description: 'Növekvő sorba rendezett adatok közepe, nem érzékeny a szélsőségekre',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-mode',
        name: 'Módusz (Mo)',
        description: 'A mintában leggyakrabban előforduló érték, nem-számszerű adatokra is jó',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Minden egyes adat konkrét számértékét felhasználja az összegzésben', category: 'cat-mean' },
      { id: 's1-2', label: 'Egyetlen extrém magas érték erősen felfelé húzza', category: 'cat-mean' },
      { id: 's1-3', label: 'Gyakran olyan törtszám, ami a mintában sosem fordult elő (pl. 3,67)', category: 'cat-mean' },
      { id: 's1-4', label: 'Kiszámítása: az összes adat összege osztva a mintanagysággal (N)', category: 'cat-mean' },
      { id: 's1-5', label: 'A nagyság szerint növekvő sorba rendezett adatsor középső eleme', category: 'cat-median' },
      { id: 's1-6', label: 'Páros darabszám esetén a két középső adat számtani közepe', category: 'cat-median' },
      { id: 's1-7', label: 'Kiváló mutató kiugró keresetekkel rendelkező fizetési adatoknál', category: 'cat-median' },
      { id: 's1-8', label: 'Az adatok pontosan fele kisebb vagy egyenlő nála, fele nagyobb vagy egyenlő', category: 'cat-median' },
      { id: 's1-9', label: 'A mintában a legnagyobb gyakorisággal bíró érték', category: 'cat-mode' },
      { id: 's1-10', label: 'Nem-számszerű (szöveges) adatokra is megadható (pl. kedvenc szín)', category: 'cat-mode' },
      { id: 's1-11', label: 'Lehet belőle több is egy adatsorban (pl. kétpúpú minta)', category: 'cat-mode' },
      { id: 's1-12', label: 'Ha minden adat pontosan egyszer fordul elő, akkor nincs módusz', category: 'cat-mode' }
    ]
  },
  2: {
    title: '2. Szint: Diagramtípusok és Előnyeik',
    subtitle: 'Kategorizáld a tulajdonságokat és alkalmazásokat: Oszlopdiagram, Kördiagram vagy Táblázat!',
    categories: [
      {
        id: 'cat-bar',
        name: 'Oszlopdiagram (Gyakoriságok)',
        description: 'Téglalapok magassága mutatja az értékek gyakoriságát',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-pie',
        name: 'Kördiagram (Rész-egész)',
        description: 'Körcikkek szöge arányos a relatív gyakorisággal (360 fokon)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-table',
        name: 'Gyakorisági Táblázat',
        description: 'Nyers számok, abszolút és relatív gyakoriságok pontos rögzítése',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Különböző érdemjegyek gyakoriságának közvetlen magassági összevetése', category: 'cat-bar' },
      { id: 's2-2', label: 'A függőleges tengelyen a darabszám (k) szerepel', category: 'cat-bar' },
      { id: 's2-3', label: 'A legmagasabb oszlop azonnal kijelöli a móduszt', category: 'cat-bar' },
      { id: 's2-4', label: 'Az oszlopok szélessége azonos, távolságuk egyenletes', category: 'cat-bar' },
      { id: 's2-5', label: 'Költségvetés vagy pártok választási részarányának szemléltetése', category: 'cat-pie' },
      { id: 's2-6', label: 'A körcikk középponti szögének képlete: alfa = (k / N) · 360°', category: 'cat-pie' },
      { id: 's2-7', label: 'A körcikkek összege kötelezően kiteszi a teljes 360 fokot', category: 'cat-pie' },
      { id: 's2-8', label: '50%-os részesedés pontosan 180 fokos félkört jelent', category: 'cat-pie' },
      { id: 's2-9', label: 'Rögzíti az adatokat, azok darabszámát (k) és arányát (k/N)', category: 'cat-table' },
      { id: 's2-10', label: 'A relatív gyakorisági oszlop összege pontosan 1,00 (100%)', category: 'cat-table' },
      { id: 's2-11', label: 'Megkönnyíti a súlyozott átlag kézi kiszámítását', category: 'cat-table' },
      { id: 's2-12', label: 'A mintanagyság (N) a gyakoriságok összegéből azonnal leolvasható', category: 'cat-table' }
    ]
  },
  3: {
    title: '3. Szint: A Statisztikai Munka 3 Fázisa',
    subtitle: 'Sorold be a statisztikai vizsgálat teendőit a megfelelő lépésbe!',
    categories: [
      {
        id: 'cat-collect',
        name: '1. Adatgyűjtés & Rendezés',
        description: 'Adatok felvétele, számlálás, növekvő sorba rendezés',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-calc',
        name: '2. Mutatók Kiszámítása',
        description: 'Átlag, módusz, medián, terjedelem és gyakoriságok számolása',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-vis',
        name: '3. Ábrázolás & Következtetés',
        description: 'Oszlop- vagy kördiagram rajzolása, elemzés, döntéshozatal',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Kérdőíves felmérés készítése az osztályban', category: 'cat-collect' },
      { id: 's3-2', label: 'A dolgozatjegyek nagyság szerinti növekvő sorrendbe állítása', category: 'cat-collect' },
      { id: 's3-3', label: 'A hiányzó vagy hibásan kitöltött adatok kiszűrése', category: 'cat-collect' },
      { id: 's3-4', label: 'Strigulázás a gyakoriságok megszámlálásához', category: 'cat-collect' },
      { id: 's3-5', label: 'A számtani átlag kiszámítása az adatok összegéből', category: 'cat-calc' },
      { id: 's3-6', label: 'A leggyakoribb érték (módusz) kiválasztása', category: 'cat-calc' },
      { id: 's3-7', label: 'A sorba rendezett lista középső elemének (medián) megkeresése', category: 'cat-calc' },
      { id: 's3-8', label: 'A legnagyobb és legkisebb adat különbségének (terjedelem) képzése', category: 'cat-calc' },
      { id: 's3-9', label: 'Oszlopdiagram szerkesztése egyenletes léptékű tengellyel', category: 'cat-vis' },
      { id: 's3-10', label: 'Kördiagram rajzolása szögmérővel a középponti szögek alapján', category: 'cat-vis' },
      { id: 's3-11', label: 'Következtetés levonása a tanulmányi eredmények szóródásáról', category: 'cat-vis' },
      { id: 's3-12', label: 'A cipőbolti rendelési készlet összeállítása a kapott módusz alapján', category: 'cat-vis' }
    ]
  }
};

export const FrequencyStatisticsSorter: React.FC<FrequencyStatisticsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-func-frequency',
  topicTitle = 'Gyakoriság, Relatív Gyakoriság, Átlag'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      themeColor="emerald"
    />
  );
};

export default FrequencyStatisticsSorter;
