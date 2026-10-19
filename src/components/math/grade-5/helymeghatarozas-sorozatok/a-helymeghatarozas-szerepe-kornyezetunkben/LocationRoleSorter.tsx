import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LocationRoleSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LocationRoleSorter: React.FC<LocationRoleSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // ========================================================
    // 1. SZINT: TÁJÉKOZÓDÁSI MÓDSZEREK TÍPUSA
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-nature',
          name: 'Természeti tájékozódás',
          description: 'Égitestek, Nap állása, növényzet és természetes jelek megfigyelése',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-civic',
          name: 'Épített környezet és címzés',
          description: 'Ember alkotta megállapodások: utcanevek, házszámok, ülésrendek, táblák',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-tech',
          name: 'Modern digitális technológia',
          description: 'Műholdas navigáció, GPS, okostelefonos térképek és applikációk',
          badgeColor: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'A Nap déli delelésének megfigyelése',
          categoryId: 'cat-nature',
          explanation: 'Délben a Nap pontosan délen áll, az árnyékunk pedig észak felé mutat.'
        },
        {
          id: 's1-2',
          text: 'Budapest, Petőfi Sándor utca 12., 3. emelet',
          categoryId: 'cat-civic',
          explanation: 'Pontos lakcím az épített környezetben.'
        },
        {
          id: 's1-3',
          text: 'Waze vagy Google Maps autós útvonaltervezés',
          categoryId: 'cat-tech',
          explanation: 'Modern műholdas és mobilhálózatos digitális navigáció.'
        },
        {
          id: 's1-4',
          text: 'A Sarkcsillag megkeresése az éjszakai égbolton',
          categoryId: 'cat-nature',
          explanation: 'A Sarkcsillag éjjel a legbiztosabb tájékozódási pont az északi irány megtalálására.'
        },
        {
          id: 's1-5',
          text: 'Színházjegy: Földszint 8. sor 15. szék',
          categoryId: 'cat-civic',
          explanation: 'Nézőtéri székazonosítás emberi megállapodás szerint.'
        },
        {
          id: 's1-6',
          text: 'GPS koordináták leolvasása okosórával (pl. 47°29′ É, 19°02′ K)',
          categoryId: 'cat-tech',
          explanation: 'A Föld körüli műholdak rádiójeleit feldolgozó modern technológia.'
        },
        {
          id: 's1-7',
          text: 'Fák törzsének északi oldalán sűrűbb mohásodás',
          categoryId: 'cat-nature',
          explanation: 'A kevésbé napsütötte északi oldalon maradó nedvesség miatt alakul ki a moha.'
        },
        {
          id: 's1-8',
          text: 'Iskolai ülésrend: „középső padsor, 2. pad, bal oldal”',
          categoryId: 'cat-civic',
          explanation: 'Tantermi térbeli beosztás a tanári asztalhoz viszonyítva.'
        },
        {
          id: 's1-9',
          text: 'Geocaching láda keresése mobiltelefonos kincskereső appal',
          categoryId: 'cat-tech',
          explanation: 'Műholdas navigációra épülő modern szabadtéri játék.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZÜKSÉGES ADATOK SZÁMA (DIMENZIÓK)
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-1d',
          name: '1 adat elegendő (Egydimenziós)',
          description: 'Egy vonal, útvonal vagy sor mentén egyetlen szám megadja a pontos helyet',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-2d',
          name: '2 adat szükséges (Síkbeli / 2D)',
          description: 'Egy sík felületen, térképen vagy nézőtéren két koordináta (pl. sor és oszlop) kell',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-3d',
          name: '3 adat szükséges (Térbeli / 3D)',
          description: 'A térben magasság vagy mélység is szükséges a szélesség és hosszúság mellé',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Kilométerkő az autópályán (pl. M1-es autópálya 34. km)',
          categoryId: 'cat-1d',
          explanation: 'Az autópálya nyomvonala mentén egyetlen távolságadat elegendő a hely behatárolására.'
        },
        {
          id: 's2-2',
          text: 'Mozijegy: 5. sor 8. szék',
          categoryId: 'cat-2d',
          explanation: 'A mozi síkjában két adat (sor és szék) kell a félreérthetetlen azonosításhoz.'
        },
        {
          id: 's2-3',
          text: 'Repülőgép pillanatnyi helyzete (szélesség, hosszúság és 10 000 m magasság)',
          categoryId: 'cat-3d',
          explanation: 'A légtérben a repülési magasság elengedhetetlen harmadik koordináta.'
        },
        {
          id: 's2-4',
          text: 'Házszám egy adott utcában (pl. Fő utca 27.)',
          categoryId: 'cat-1d',
          explanation: 'Ha már tudjuk az utcát, ott a házak egy vonalban sorakoznak, a házszám 1 adat.'
        },
        {
          id: 's2-5',
          text: 'Sakktábla mezőjének megadása (pl. e4 vagy g8)',
          categoryId: 'cat-2d',
          explanation: 'A sakktábla felületén egy betű (oszlop) és egy szám (sor) adja a helyet.'
        },
        {
          id: 's2-6',
          text: 'Tengeralattjáró pozíciója (koordináták és 200 méteres merülési mélység)',
          categoryId: 'cat-3d',
          explanation: 'A víz alatt a mélység a harmadik elengedhetetlen térbeli adat.'
        },
        {
          id: 's2-7',
          text: 'Sorszám a postai sorszámosztó gépből (pl. 42-es ügyfél)',
          categoryId: 'cat-1d',
          explanation: 'A várakozási sorban egyetlen szám jelöli ki a helyedet a sorrendben.'
        },
        {
          id: 's2-8',
          text: 'Várostérképen a könyvtár helye: C3 mező',
          categoryId: 'cat-2d',
          explanation: 'A papírtérkép síkján oszlopbetű és sorszám metszete a cella.'
        },
        {
          id: 's2-9',
          text: 'Társasházi lakás: Kossuth tér 5., 4. emelet 2. ajtó',
          categoryId: 'cat-3d',
          explanation: 'Az épületen belüli magassági szint (emelet) térbeli harmadik adat.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ÉGTÁJAK BESOROLÁSA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-cardinal',
          name: 'Fő égtájak (90°-os szögek)',
          description: 'A 4 alapvető égtáj: Észak (0°), Kelet (90°), Dél (180°), Nyugat (270°)',
          badgeColor: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800'
        },
        {
          id: 'cat-north-inter',
          name: 'Északi félkör mellék égtájai',
          description: 'Az északi irány felé mutató átlós irányok: Északkelet (45°) és Északnyugat (315°)',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
        },
        {
          id: 'cat-south-inter',
          name: 'Déli félkör mellék égtájai',
          description: 'A déli irány felé mutató átlós irányok: Délkelet (135°) és Délnyugat (225°)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Észak (0° / 360°) – a térképen felfelé mutató irány',
          categoryId: 'cat-cardinal',
          explanation: 'A négy fő égtáj egyike, az iránytű alapvető viszonyítási iránya.'
        },
        {
          id: 's3-2',
          text: 'Északkelet (ÉK, 45°) – Észak és Kelet közötti irány',
          categoryId: 'cat-north-inter',
          explanation: 'Az északi félkörben lévő, észak felől keletre hajló mellék égtáj.'
        },
        {
          id: 's3-3',
          text: 'Délkelet (DK, 135°) – Kelet és Dél közötti irány',
          categoryId: 'cat-south-inter',
          explanation: 'A déli félkörben lévő, dél felől keletre nyúló mellék égtáj.'
        },
        {
          id: 's3-4',
          text: 'Kelet (90°) – ahol a Nap felkel a reggeli órákban',
          categoryId: 'cat-cardinal',
          explanation: 'A négy fő égtáj egyike, a térképen jobb oldalra mutat.'
        },
        {
          id: 's3-5',
          text: 'Északnyugat (ÉNy, 315°) – Nyugat és Észak közötti irány',
          categoryId: 'cat-north-inter',
          explanation: 'Az északi félkör átlós mellék égtája nyugat felé.'
        },
        {
          id: 's3-6',
          text: 'Délnyugat (DNy, 225°) – Dél és Nyugat közötti irány',
          categoryId: 'cat-south-inter',
          explanation: 'A déli félkör átlós mellék égtája nyugat felé.'
        },
        {
          id: 's3-7',
          text: 'Dél (180°) – amerre a Nap délben legmagasabban áll',
          categoryId: 'cat-cardinal',
          explanation: 'A négy fő égtáj egyike, a térképen lefelé néz.'
        },
        {
          id: 's3-8',
          text: 'Nyugat (270°) – a naplemente iránya a látóhatáron',
          categoryId: 'cat-cardinal',
          explanation: 'A négy fő égtáj egyike, a térképen bal oldalra mutat.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-role-quiz"
      title="Helymeghatározás és Tájékozódás Csoportosító"
      subtitle="Húzd vagy kattintással helyezd a kifejezéseket a megfelelő kategóriába!"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
