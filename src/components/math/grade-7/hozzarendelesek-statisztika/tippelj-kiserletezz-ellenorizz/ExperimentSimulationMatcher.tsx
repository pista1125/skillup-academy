import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface ExperimentSimulationMatcherProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

const LEVEL_1_PAIRS: MatcherPair[] = [
  {
    id: 'exp-m1-1',
    prompt: '1. Tippelj lépés',
    value: 'Az elméleti klasszikus valószínűség kiszámítása: P = k / n',
  },
  {
    id: 'exp-m1-2',
    prompt: '2. Kísérletezz lépés',
    value: 'Sok próba (N) elvégzése és az eredmények rögzítése táblázatban',
  },
  {
    id: 'exp-m1-3',
    prompt: '3. Ellenőrizz lépés',
    value: 'A relatív gyakoriság (g = k / N) összevetése az elmélettel',
  },
  {
    id: 'exp-m1-4',
    prompt: 'A nagy számok törvénye',
    value: 'Sok kísérlet esetén a relatív gyakoriság megközelíti az elméleti valószínűséget (g ≈ P)',
  },
  {
    id: 'exp-m1-5',
    prompt: 'Kis mintaméret (pl. N = 10)',
    value: 'Nagy véletlen ingadozás, a relatív gyakoriság még erősen eltérhet',
  },
  {
    id: 'exp-m1-6',
    prompt: 'Nagy mintaméret (pl. N = 1000)',
    value: 'Stabil eredmény, a relatív gyakoriság szinte pontosan a valószínűséghez simul',
  },
  {
    id: 'exp-m1-7',
    prompt: 'Szimmetrikus kísérleti eszköz',
    value: 'A kimenetelek egyenlően valószínűek (pl. szabályos kocka, érme)',
  },
  {
    id: 'exp-m1-8',
    prompt: 'Aszimmetrikus eszköz (pl. rajzszög)',
    value: 'Nincs elméleti képlet, csak kísérleti úton becsülhető az esély',
  },
];

const LEVEL_2_PAIRS: MatcherPair[] = [
  {
    id: 'exp-m2-1',
    prompt: '100 érmedobásból 54 fej',
    value: 'g = 54% (eltérés: +4% az elméleti 50%-hoz képest)',
  },
  {
    id: 'exp-m2-2',
    prompt: '100 érmedobásból 48 fej',
    value: 'g = 48% (eltérés: -2% az elméleti 50%-hoz képest)',
  },
  {
    id: 'exp-m2-3',
    prompt: '60 kockadobásból 10 hatos',
    value: 'g = 10/60 = 1/6 (pontosan egyezik a 16,7%-os elmélettel)',
  },
  {
    id: 'exp-m2-4',
    prompt: '60 kockadobásból 15 hatos',
    value: 'g = 15/60 = 25% (eltérés: +8,3% a várt 16,7%-hoz képest)',
  },
  {
    id: 'exp-m2-5',
    prompt: '1000 érmedobásból 503 fej',
    value: 'g = 50,3% (minimális, mindössze 0,3%-os hiba)',
  },
  {
    id: 'exp-m2-6',
    prompt: '10 érmedobásból 8 fej',
    value: 'g = 80% (erős véletlen kilengés a kis minta miatt)',
  },
  {
    id: 'exp-m2-7',
    prompt: '200 dobásból 98 páros',
    value: 'g = 49% (alig 1% eltérés a várt 50%-tól)',
  },
  {
    id: 'exp-m2-8',
    prompt: '100 rajzszögből 62 hegyes',
    value: 'g = 62% (kísérleti tapasztalati valószínűség)',
  },
];

const LEVEL_3_PAIRS: MatcherPair[] = [
  {
    id: 'exp-m3-1',
    prompt: 'Abszolút hiba képlete',
    value: '|g - P| (a relatív gyakoriság és az elméleti érték különbsége)',
  },
  {
    id: 'exp-m3-2',
    prompt: 'Számítógépes szimuláció',
    value: 'Gyors véletlenszám-generálás akár több tízezer próba modellezésére',
  },
  {
    id: 'exp-m3-3',
    prompt: 'Két érme: két Fej elmélete',
    value: 'P = 1/4 = 25% (FF kimenetel)',
  },
  {
    id: 'exp-m3-4',
    prompt: 'Két érme: vegyes dobás (F és Í)',
    value: 'P = 2/4 = 50% (FÍ és ÍF együttesen)',
  },
  {
    id: 'exp-m3-5',
    prompt: 'A relatív gyakoriság határértéke',
    value: 'Végtelen sok kísérlet esetén pontosan a valószínűség (lim g = P)',
  },
  {
    id: 'exp-m3-6',
    prompt: 'Visszatevéses mintavétel',
    value: 'A valószínűségek minden egyes húzásnál változatlanok maradnak',
  },
  {
    id: 'exp-m3-7',
    prompt: 'Visszatevés nélküli húzás',
    value: 'A maradék elemek száma és az esélyek minden lépésben módosulnak',
  },
  {
    id: 'exp-m3-8',
    prompt: 'Kocka páratlan dobása (elmélet)',
    value: 'P = 3/6 = 50% (kedvező számok: 1, 3, 5)',
  },
];

export const ExperimentSimulationMatcher: React.FC<ExperimentSimulationMatcherProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  topicId = 'g7-stats-exp',
}) => {
  return (
    <MatcherTemplate
      title="Kísérleti Statisztika Párosító"
      subtitle="Párosítsd a kísérleti módszertan lépéseit, a mintaméreteket és a mérési eredményeket!"
      topicTitle="7. Tippelj, kísérletezz, ellenőrizz!"
      badge="PÁROSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="orange"
      topicId={topicId}
      grade={7}
      chapterId="hozzarendelesek-statisztika"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      levelsConfig={{
        1: {
          title: '1. szint: Módszertan és a nagy számok törvénye',
          description: 'Párosítsd a statisztikai kísérlet alapfogalmait és törvényszerűségeit!',
          pairs: LEVEL_1_PAIRS,
        },
        2: {
          title: '2. szint: Kísérleti mérések és eltérések',
          description: 'Kösd össze a mérési adatokat a számított relatív gyakorisággal és hibával!',
          pairs: LEVEL_2_PAIRS,
        },
        3: {
          title: '3. szint: Statisztikai összefüggések és modellek',
          description: 'Párosítsd az elméleti és kísérleti összefüggéseket!',
          pairs: LEVEL_3_PAIRS,
        },
      }}
    />
  );
};

export default ExperimentSimulationMatcher;
