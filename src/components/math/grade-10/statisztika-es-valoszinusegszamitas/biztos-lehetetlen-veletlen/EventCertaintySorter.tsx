import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface EventCertaintySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  level?: number;
  currentLevel?: number;
  onSelectLevel?: (level: number) => void;
  [key: string]: any;
}

const sorterLevels: Record<number, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Események típusai: Biztos, véletlen vagy lehetetlen?',
    instruction: 'Döntsd el a véletlen kísérletek kimeneteleiről, hogy melyik alapvető eseménykategóriába tartoznak!',
    categories: [
      {
        id: 'cat-impossible',
        name: 'Lehetetlen esemény (P = 0)',
        description: 'Semmilyen körülmények között nem valósulhat meg (üres halmaz)',
        color: 'rose'
      },
      {
        id: 'cat-random',
        name: 'Véletlen esemény (0 < P < 1)',
        description: 'Bekövetkezhet, de nem garantált (valószínűsége 0 és 1 közé esik)',
        color: 'amber'
      },
      {
        id: 'cat-certain',
        name: 'Biztos esemény (P = 1)',
        description: 'Minden kísérlet során garantáltan bekövetkezik (eseménytér maga)',
        color: 'emerald'
      }
    ],
    items: [
      {
        id: 'ecs1-1',
        content: 'Három érmét feldobva mindhármon más oldal látható',
        categoryId: 'cat-impossible',
        explanation: 'Az érmének csak két oldala van (fej vagy írás), ezért 3 különböző oldal lehetetlen (P = 0).'
      },
      {
        id: 'ecs1-2',
        content: 'Egy szabályos kockával dobva a kapott szám legfeljebb 6',
        categoryId: 'cat-certain',
        explanation: 'A kocka oldalai {1, 2, 3, 4, 5, 6}, mindegyik kisebb vagy egyenlő 6-tal: biztos esemény (P = 1).'
      },
      {
        id: 'ecs1-3',
        content: 'Két kockával dobva az összeg pontosan 7',
        categoryId: 'cat-random',
        explanation: '6 kedvező eset van a 36-ból: bekövetkezhet, de nem biztos (P = 6/36 = 1/6).'
      },
      {
        id: 'ecs1-4',
        content: 'Egy kockával dobva negatív számot kapunk',
        categoryId: 'cat-impossible',
        explanation: 'A kockán csak pozitív egész számok vannak: lehetetlen esemény (P = 0).'
      },
      {
        id: 'ecs1-5',
        content: 'Két érmét feldobva legalább az egyiken írás látható',
        categoryId: 'cat-random',
        explanation: '3 esetben teljesül a 4-ből (FI, IF, II): véletlen esemény (P = 3/4 = 75%).'
      },
      {
        id: 'ecs1-6',
        content: 'Egy szabályos kockával dobva a szám osztója 60-nak',
        categoryId: 'cat-certain',
        explanation: 'Az 1, 2, 3, 4, 5, 6 mindegyike osztója a 60-nak, így a dobás garantáltan osztó (P = 1).'
      },
      {
        id: 'ecs1-7',
        content: 'Két kockával dobva a dobott számok összege nagyobb 12-nél',
        categoryId: 'cat-impossible',
        explanation: 'A maximálisan elérhető összeg 6 + 6 = 12, így a 12-nél nagyobb összeg lehetetlen (P = 0).'
      },
      {
        id: 'ecs1-8',
        content: 'Magyar kártyacsomagból (32 lap) piros színű lapot húzunk',
        categoryId: 'cat-random',
        explanation: '8 piros lap van a 32-ből: bekövetkezhet, de nem biztos (P = 8/32 = 25%).'
      },
      {
        id: 'ecs1-9',
        content: 'Két kockával dobva az összeg legalább 2',
        categoryId: 'cat-certain',
        explanation: 'A minimális összeg 1 + 1 = 2, így az összeg mindig legalább 2 (P = 1).'
      },
      {
        id: 'ecs1-10',
        content: 'Egy pénzérmével fejet dobunk',
        categoryId: 'cat-random',
        explanation: 'Véletlen esemény, 50% eséllyel valósul meg (P = 0,5).'
      },
      {
        id: 'ecs1-11',
        content: 'Egy szabályos kockával dobott szám osztható 10-zel',
        categoryId: 'cat-impossible',
        explanation: 'A kockán nincs 10-zel osztható szám ({1,2,3,4,5,6}), így P = 0.'
      },
      {
        id: 'ecs1-12',
        content: 'Egy kockával páros VAGY páratlan számot dobunk',
        categoryId: 'cat-certain',
        explanation: 'Minden egész szám vagy páros, vagy páratlan, így ez a teljes eseménytér (P = 1).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Eseményelméleti állítások ellenőrzése',
    instruction: 'Döntsd el az eseményekre és valószínűségekre vonatkozó állításokról, hogy igazak vagy tévhitek!',
    categories: [
      {
        id: 'cat-true',
        name: 'Matematikai Igazság',
        description: 'Helyes eseményelméleti és valószínűségi összefüggés',
        color: 'emerald'
      },
      {
        id: 'cat-false',
        name: 'Tévhit / Hiba',
        description: 'Hibás állítás vagy fogalmi csapda',
        color: 'rose'
      }
    ],
    items: [
      {
        id: 'ecs2-1',
        content: 'A klasszikus véges modellben a lehetetlen esemény valószínűsége pontosan 0',
        categoryId: 'cat-true',
        explanation: 'Igaz: a kedvező elemi események száma 0, így 0 / n = 0.'
      },
      {
        id: 'ecs2-2',
        content: 'A biztos esemény ellentettje a lehetetlen esemény, így P(Ā) = 1 - 1 = 0',
        categoryId: 'cat-true',
        explanation: 'Igaz: az eseménytér komplementere az üres halmaz.'
      },
      {
        id: 'ecs2-3',
        content: 'Ha egy esemény bekövetkezési esélye 99%, akkor az biztos eseménynek számít',
        categoryId: 'cat-false',
        explanation: 'Tévhit: amíg P < 1, addig az esemény nem biztos, hanem véletlen esemény.'
      },
      {
        id: 'ecs2-4',
        content: 'Két egymást kizáró esemény összege (uniója) nem adhat biztos eseményt',
        categoryId: 'cat-false',
        explanation: 'Tévhit: egy esemény és az ellentettje egymást kizárják, uniójuk mégis a biztos esemény.'
      },
      {
        id: 'ecs2-5',
        content: 'Tetszőleges esemény valószínűségére mindig érvényes: 0 ≤ P(A) ≤ 1',
        categoryId: 'cat-true',
        explanation: 'Igaz: a valószínűség értéke nem lehet negatív és nem haladhatja meg az 1-et.'
      },
      {
        id: 'ecs2-6',
        content: 'A „legalább 1 találat” és a „pontosan 0 találat” egymás ellentett eseményei',
        categoryId: 'cat-true',
        explanation: 'Igaz: vagy egyetlen találat sincs, vagy van legalább egy; a kettő összege 1.'
      },
      {
        id: 'ecs2-7',
        content: 'Ha egy esemény 10-szer egymás után nem valósult meg, akkor az lehetetlen esemény',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a véletlen ingadozás nem változtatja meg a kísérlet elméleti lehetőségét.'
      },
      {
        id: 'ecs2-8',
        content: 'Egymást kizáró események egyszerre, egyidejűleg soha nem következhetnek be',
        categoryId: 'cat-true',
        explanation: 'Igaz: ez az egymást kizáró események pontos halmazelméleti definíciója (metszetük üres).'
      },
      {
        id: 'ecs2-9',
        content: 'A valószínűség értéke lehet 1,2 vagy negatív szám is a szélsőértékeknél',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a valószínűség definíció szerint kizárólag a [0; 1] zárt intervallumba eshet.'
      },
      {
        id: 'ecs2-10',
        content: 'A véletlen esemény valószínűsége szigorúan a (0; 1) nyílt intervallumba esik',
        categoryId: 'cat-true',
        explanation: 'Igaz: a véletlen esemény se nem lehetetlen (P > 0), se nem biztos (P < 1).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Véletlen események valószínűségi sávjai',
    instruction: 'Számítsd ki az események valószínűségét, és válogasd őket az alacsony, közepes vagy nagy esély sávjába!',
    categories: [
      {
        id: 'cat-low',
        name: 'Alacsony esély (P < 25%)',
        description: 'Valószínűsége kisebb mint 25%',
        color: 'blue'
      },
      {
        id: 'cat-mid',
        name: 'Közepes esély (25% ≤ P ≤ 50%)',
        description: 'Valószínűsége 25% és 50% közé esik',
        color: 'emerald'
      },
      {
        id: 'cat-high',
        name: 'Nagy esély (P > 50%)',
        description: 'Valószínűsége nagyobb mint 50%',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'ecs3-1',
        content: 'Két kockával dobva a dobott számok összege 5',
        categoryId: 'cat-low',
        explanation: '4 kedvező eset a 36-ból: P = 4/36 = 1/9 ≈ 11,1%.'
      },
      {
        id: 'ecs3-2',
        content: 'Két kockával dobva az összeg kisebb 5-nél',
        categoryId: 'cat-low',
        explanation: 'Összeg 2, 3 vagy 4: 1 + 2 + 3 = 6 eset a 36-ból: P = 6/36 ≈ 16,7%.'
      },
      {
        id: 'ecs3-3',
        content: 'Két érmét feldobva mindkét érmén fej lesz',
        categoryId: 'cat-mid',
        explanation: 'Csak az FF eset felel meg a 4-ből: P = 1/4 = 25%.'
      },
      {
        id: 'ecs3-4',
        content: 'Egy kockával dobva az eredmény osztója 5-nek',
        categoryId: 'cat-mid',
        explanation: 'Osztók az 1 és az 5: 2 eset a 6-ból, P = 2/6 ≈ 33,3%.'
      },
      {
        id: 'ecs3-5',
        content: 'Két érmét feldobva az egyik fej, a másik írás lesz',
        categoryId: 'cat-mid',
        explanation: 'Kedvező esetek: FI és IF: P = 2/4 = 50%.'
      },
      {
        id: 'ecs3-6',
        content: 'Egy kockával dobva az eredmény kisebb 5-nél',
        categoryId: 'cat-high',
        explanation: 'Kedvező esetek: {1, 2, 3, 4}: P = 4/6 = 2/3 ≈ 66,7%.'
      },
      {
        id: 'ecs3-7',
        content: 'Két érmét feldobva legalább az egyik írás',
        categoryId: 'cat-high',
        explanation: 'FI, IF, II: P = 3/4 = 75%.'
      },
      {
        id: 'ecs3-8',
        content: 'Magyar kártyából tök vagy makk színű lapot húzunk',
        categoryId: 'cat-mid',
        explanation: '8 tök + 8 makk = 16 lap a 32-ből: P = 16/32 = 50%.'
      },
      {
        id: 'ecs3-9',
        content: 'Két kockával dobva az összeg legalább 10',
        categoryId: 'cat-low',
        explanation: '10-es (3 db), 11-es (2 db), 12-es (1 db): 6/36 ≈ 16,7%.'
      },
      {
        id: 'ecs3-10',
        content: 'Két kockával dobva a számok összege páratlan',
        categoryId: 'cat-mid',
        explanation: '18 kedvező eset a 36-ból: P = 18/36 = 50%.'
      },
      {
        id: 'ecs3-11',
        content: 'Két kockával dobva a dobott számok szorzata páros',
        categoryId: 'cat-high',
        explanation: 'Csak páratlan × páratlan ad páratlant (9 db), így páros: 27/36 = 75%.'
      },
      {
        id: 'ecs3-12',
        content: 'Két kockával dobva mindkét kockán azonos számot kapunk',
        categoryId: 'cat-low',
        explanation: '6 kedvező eset a főátlón: P = 6/36 = 1/6 ≈ 16,7%.'
      }
    ]
  }
};

export const EventCertaintySorter: React.FC<EventCertaintySorterProps> = (props) => {
  const { onBack, onSwitchToTheory, onSwitchToQuiz, ...restProps } = props;

  return (
    <SorterTemplate
      topicTitle="Biztos, lehetetlen, véletlen események"
      topicBadge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="amber"
      levels={sorterLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      {...restProps}
    />
  );
};

export default EventCertaintySorter;
