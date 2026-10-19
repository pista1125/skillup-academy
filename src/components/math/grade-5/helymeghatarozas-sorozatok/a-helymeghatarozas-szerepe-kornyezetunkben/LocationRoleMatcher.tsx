import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LocationRoleMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LocationRoleMatcher: React.FC<LocationRoleMatcherProps> = ({
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

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: ALAPVETŐ ÉGTÁJAK ÉS MINDENNAPI FOGALMAK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető égtájak és mindennapi fogalmak',
      subtitle: 'Párosítsd a fő égtájakat és az alapvető helymeghatározási módokat a leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Észak (É)',
          value: 'A térképeken hagyományosan felfelé mutató fő égtáj (0°)'
        },
        {
          id: 'p1-2',
          prompt: 'Kelet (K)',
          value: 'A térképen jobbra látható, a Nap felkelésének iránya (90°)'
        },
        {
          id: 'p1-3',
          prompt: 'Dél (D)',
          value: 'A térképen lefelé mutató irány, a Nap déli delelésének iránya (180°)'
        },
        {
          id: 'p1-4',
          prompt: 'Nyugat (Ny)',
          value: 'A térképen balra található, a Nap lenyugvásának iránya (270°)'
        },
        {
          id: 'p1-5',
          prompt: 'Viszonyítási pont (Origó)',
          value: 'A rögzített kiindulási pont, amelyhez képest megadjuk a helyzetet'
        },
        {
          id: 'p1-6',
          prompt: 'Pontos lakcím',
          value: 'Település, közterület neve, házszám, emelet és ajtó együttese'
        },
        {
          id: 'p1-7',
          prompt: 'Színház- és mozijegy',
          value: 'Két adat határozza meg a helyet: a sor száma és a szék száma'
        },
        {
          id: 'p1-8',
          prompt: 'Sakktábla mezője (pl. e4)',
          value: 'Egy betűvel jelölt oszlop (a-h) és egy számmal jelölt sor (1-8) metszéspontja'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: MELLÉK ÉGTÁJAK ÉS TÉRKÉPHÁLÓ
    // ========================================================
    2: {
      title: '2. Szint: Mellék égtájak és térképi koordináták',
      subtitle: 'Párosítsd az átlós mellék égtájakat és a térképészeti fogalmakat!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Északkelet (ÉK)',
          value: 'Észak és Kelet közötti mellék égtáj (45°)'
        },
        {
          id: 'p2-2',
          prompt: 'Délkelet (DK)',
          value: 'Kelet és Dél közötti mellék égtáj (135°)'
        },
        {
          id: 'p2-3',
          prompt: 'Délnyugat (DNy)',
          value: 'Dél és Nyugat közötti mellék égtáj (225°)'
        },
        {
          id: 'p2-4',
          prompt: 'Északnyugat (ÉNy)',
          value: 'Nyugat és Észak közötti mellék égtáj (315°)'
        },
        {
          id: 'p2-5',
          prompt: 'Térképi cella (pl. C3)',
          value: 'A térkép margóján lévő oszlopbetű és sorszám kereszteződésében lévő négyzet'
        },
        {
          id: 'p2-6',
          prompt: 'Iránytű mágnestűje',
          value: 'A festett (piros) hegye mindig a Föld mágneses északi iránya felé mutat'
        },
        {
          id: 'p2-7',
          prompt: 'GPS rendszer',
          value: 'Műholdak rádiójelei alapján méterre pontos koordinátákat adó műszer'
        },
        {
          id: 'p2-8',
          prompt: 'Házszámozási szabály',
          value: 'A magyar utcákban a haladási irány szerint jobb oldalon a páros, bal oldalon a páratlan számok vannak'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TERMÉSZETI JELEK ÉS TÖBBDIMENZIÓS HELYMEGHATÁROZÁS
    // ========================================================
    3: {
      title: '3. Szint: Természeti jelek és dimenziók',
      subtitle: 'Párosítsd a természeti tájékozódási jeleket és a koordináták dimenzióit!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Sarkcsillag az égen',
          value: 'A Kis Medve csillagkép végén található, éjszaka pontosan északra mutat'
        },
        {
          id: 'p3-2',
          prompt: 'Déli napsütés árnyéka',
          value: 'Déli 12 órakor a legmagasabban álló Nap miatt az árnyékunk pontosan észak felé vetül'
        },
        {
          id: 'p3-3',
          prompt: 'Fák és kövek mohás oldala',
          value: 'A közvetlen napfénytől és kiszáradástól védettebb északi, északnyugati oldalon gyakoribb'
        },
        {
          id: 'p3-4',
          prompt: '1 dimenziós helymeghatározás',
          value: '1 adat elegendő: pl. hányadik kilométernél tartunk az autópályán'
        },
        {
          id: 'p3-5',
          prompt: '2 dimenziós helymeghatározás',
          value: '2 adat szükséges a síkban: pl. sor és szék a moziban, vagy x és y koordináta'
        },
        {
          id: 'p3-6',
          prompt: '3 dimenziós helymeghatározás',
          value: '3 adat kell a térben: szélesség, hosszúság és tengerszint feletti magasság'
        },
        {
          id: 'p3-7',
          prompt: 'Földrajzi fokhálózat',
          value: 'Szélességi körök (Egyenlítőtől É/D) és hosszúsági körök (Greenwichtől K/Ny)'
        },
        {
          id: 'p3-8',
          prompt: 'Geocaching játék',
          value: 'Szabadidős kincskereső játék GPS koordináták segítségével rejtett ládák után'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-role-quiz"
      title="Helymeghatározás és Tájékozódás Párosító"
      subtitle="Kattints egy fogalomra a bal oldalon, majd keresd meg a hozzá tartozó párját a jobb oldalon!"
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
