import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MixedWordProblemsSorterProps {
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
    title: '1. Szint: Főbb Vegyes Feladattípusok Csoportosítása',
    subtitle: 'Sorold be a feladatokat Fejek & Lábak, Padok & Hiány-Többlet, vagy Egyenletrendszerek kategóriába!',
    categories: [
      {
        id: 'cat-heads',
        name: 'Fejek & Lábak / Jegyárak',
        description: 'Kétféle egyed, ismert összes darabszám és össztulajdonság',
        badgeColor: 'bg-violet-100 text-violet-800 border-violet-300'
      },
      {
        id: 'cat-benches',
        name: 'Padok, Polcok, Lépcsők',
        description: 'Kétféle elrendezés, ülőhely-hiány vagy üresen maradt padok',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-systems',
        name: 'Egyenletrendszer & Számok',
        description: 'Összeg, különbség, arányok és két független feltétel',
        badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Tyúkok (2 láb) és nyulak (4 láb) száma az udvarban',
        category: 'cat-heads'
      },
      {
        id: 's2',
        label: 'Diákjegyek (2000 Ft) és felnőttjegyek (3000 Ft) eladási bevétele',
        category: 'cat-heads'
      },
      {
        id: 's3',
        label: 'A perselyben 20 Ft-os és 50 Ft-os pénzérmék vannak',
        category: 'cat-heads'
      },
      {
        id: 's4',
        label: 'Autók és motorkerékpárok a parkolóban (összesen 40 jármű, 130 kerék)',
        category: 'cat-heads'
      },
      {
        id: 's5',
        label: 'Ha 2 diák ül padonként, 5 állva marad; ha 3 diák ül, 2 pad üres',
        category: 'cat-benches'
      },
      {
        id: 's6',
        label: 'Könyvek elhelyezése a polcokon: 15 könyv / polc esetén 8 nem fér el',
        category: 'cat-benches'
      },
      {
        id: 's7',
        label: 'Lépcsőn kettesével és hármasával lépkedve a lépésszámok különbsége 7',
        category: 'cat-benches'
      },
      {
        id: 's8',
        label: 'Ebédet osztanak: ha minden tálcára 4 pogácsa kerül, 3 kimarad',
        category: 'cat-benches'
      },
      {
        id: 's9',
        label: 'Két szám összege 64, különbsége 18',
        category: 'cat-systems'
      },
      {
        id: 's10',
        label: 'Apa és fia életkora: apa most 3-szorosa, 12 év múlva 2-szerese lesz',
        category: 'cat-systems'
      },
      {
        id: 's11',
        label: 'Két szám aránya 3 : 5, összegük 72',
        category: 'cat-systems'
      },
      {
        id: 's12',
        label: 'Egy szám harmadának és negyedének összege 28',
        category: 'cat-systems'
      }
    ]
  },
  2: {
    title: '2. Szint: Egyenletmodellek Besorolása',
    subtitle: 'Milyen feladattípus algebrai egyenlete látható az adott sorban?',
    categories: [
      {
        id: 'cat-eq-heads',
        name: 'Kétféle Egyed Modell',
        description: 'c₁·x + c₂·(N - x) = Összérték',
        badgeColor: 'bg-violet-100 text-violet-800 border-violet-300'
      },
      {
        id: 'cat-eq-benches',
        name: 'Hiány-Többlet Padmodell',
        description: 'k₁·p + maradék = k₂·(p - üres)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-eq-systems',
        name: 'Egyenletrendszer / Összeg',
        description: 'x + y = A és x - y = B vagy arányos összegek',
        badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: '2x + 4(35 - x) = 94 (tyúkok és nyulak lábai)',
        category: 'cat-eq-heads'
      },
      {
        id: 's14',
        label: '2000x + 3000(120 - x) = 280 000 (jegybevételek)',
        category: 'cat-eq-heads'
      },
      {
        id: 's15',
        label: '50x + 100(60 - x) = 4200 (érmék értéke)',
        category: 'cat-eq-heads'
      },
      {
        id: 's16',
        label: '4x + 2(40 - x) = 130 (autók és motorok kerekei)',
        category: 'cat-eq-heads'
      },
      {
        id: 's17',
        label: '2p + 5 = 3(p - 2) (diákok száma a padokban)',
        category: 'cat-eq-benches'
      },
      {
        id: 's18',
        label: '15p + 8 = 18(p - 1) (könyvek a polcokon)',
        category: 'cat-eq-benches'
      },
      {
        id: 's19',
        label: 'x / 2 - x / 3 = 7 (lépcsőfokok kettesével és hármasával)',
        category: 'cat-eq-benches'
      },
      {
        id: 's20',
        label: '4a + 3 = 5(a - 1) (asztalok és vendégek száma)',
        category: 'cat-eq-benches'
      },
      {
        id: 's21',
        label: 'x + y = 64 és x - y = 18 (kétismeretlenes rendszer)',
        category: 'cat-eq-systems'
      },
      {
        id: 's22',
        label: '3x + 12 = 2(x + 12) (életkorok változása 12 év múlva)',
        category: 'cat-eq-systems'
      },
      {
        id: 's23',
        label: 'x / 3 + x / 4 = 28 (egy szám harmada és negyede)',
        category: 'cat-eq-systems'
      },
      {
        id: 's24',
        label: '3x + 5x = 72 (arányos részek összege)',
        category: 'cat-eq-systems'
      }
    ]
  },
  3: {
    title: '3. Szint: Megoldási Stratégiák és Elvek',
    subtitle: 'Melyik matematikai gondolatmenetet alkalmazzuk a feladat megoldásakor?',
    categories: [
      {
        id: 'cat-strat-heads',
        name: 'Darabszám Szétbontás (x és N - x)',
        description: 'Egyikből x db, másikból (N - x) db, majd szorzás az egységárral',
        badgeColor: 'bg-violet-100 text-violet-800 border-violet-300'
      },
      {
        id: 'cat-strat-benches',
        name: 'Tartók / Helyek Ismeretlenként (p)',
        description: 'A padok vagy polcok száma az ismeretlen, az elemek száma egyenlő',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-strat-elim',
        name: 'Kétismeretlenes Elimináció',
        description: 'Behelyettesítés vagy egyenlő együtthatók algebrai összeadása',
        badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: 'Ha az egyik egyedből x darab van, a másikból (Összes - x) darab lesz',
        category: 'cat-strat-heads'
      },
      {
        id: 's26',
        label: 'Minden tyúknak és nyúlnak adunk 2 lábat gondolatban, a maradék a nyulaké',
        category: 'cat-strat-heads'
      },
      {
        id: 's27',
        label: 'A darabszámot megszorozzuk az 1 jegyre vagy érmére eső forintértékkel',
        category: 'cat-strat-heads'
      },
      {
        id: 's28',
        label: 'Kétféle címlet esetén az összérték: c₁·x + c₂·(N - x)',
        category: 'cat-strat-heads'
      },
      {
        id: 's29',
        label: 'A padok számát jelöljük p-vel, mert a diákok száma mindkét esetben ugyanaz',
        category: 'cat-strat-benches'
      },
      {
        id: 's30',
        label: 'Az üresen maradt padokat le kell vonni a padok számából a szorzás előtt: k·(p - u)',
        category: 'cat-strat-benches'
      },
      {
        id: 's31',
        label: 'Lépcsőfokoknál az összes fok (x) osztva a lépésközzel adja a lépésszámot',
        category: 'cat-strat-benches'
      },
      {
        id: 's32',
        label: 'A kimaradó tanulókat hozzáadjuk a betelt padok férőhelyéhez: k·p + maradék',
        category: 'cat-strat-benches'
      },
      {
        id: 's33',
        label: 'Az egyik egyenletből kifejezett változót behelyettesítjük a másik egyenletbe',
        category: 'cat-strat-elim'
      },
      {
        id: 's34',
        label: 'Az egyenleteket összeadjuk, ha az egyik változó együtthatói ellentétesek',
        category: 'cat-strat-elim'
      },
      {
        id: 's35',
        label: 'Két szám összegét és különbségét összeadva a kisebb szám kiejthető: 2x = A + B',
        category: 'cat-strat-elim'
      },
      {
        id: 's36',
        label: 'A két lineáris egyenes metszéspontja adja a kétismeretlenes rendszer gyökét',
        category: 'cat-strat-elim'
      }
    ]
  }
};

export const MixedWordProblemsSorter: React.FC<MixedWordProblemsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-eq-mixed-sorter',
  topicTitle = 'Vegyes Feladatok Csoportosító'
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Vegyes Feladatok Csoportosító"
      subtitle="Kategorizáld a fejek és lábak, padok és diákok, valamint az egyenletrendszerek modelljeit!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      themeColor="violet"
      topicId={topicId}
      topicTitle={topicTitle}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default MixedWordProblemsSorter;
