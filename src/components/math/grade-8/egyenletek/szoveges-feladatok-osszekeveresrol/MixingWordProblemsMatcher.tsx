import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MixingWordProblemsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Töménység',
    subtitle: 'Párosítsd a keverési fogalmakat és alapértékeket a helyes jelentésükkel!',
    pairs: [
      {
        id: 'p1',
        prompt: '200 g 10%-os sóoldat tiszta sótartalma',
        value: '20 g só (200 · 0,10)'
      },
      {
        id: 'p2',
        prompt: 'Tiszta víz töménysége keveréskor',
        value: '0% (nem tartalmaz oldott sót)'
      },
      {
        id: 'p3',
        prompt: 'Tiszta só / cukor töménysége',
        value: '100% (csak tiszta oldott anyag)'
      },
      {
        id: 'p4',
        prompt: 'Két oldat össztömege',
        value: 'm_ö = m₁ + m₂'
      },
      {
        id: 'p5',
        prompt: '14 karátos arany arányos része',
        value: '14 / 24 rész (kb. 58,3%)'
      },
      {
        id: 'p6',
        prompt: '18 karátos arany arányos része',
        value: '18 / 24 = 3 / 4 rész (75%)'
      },
      {
        id: 'p7',
        prompt: 'Színarany (tiszta arany) karátja',
        value: '24 karátos (100% tiszta fém)'
      },
      {
        id: 'p8',
        prompt: '500 g 20%-os sóoldat tiszta sója',
        value: '100 g tiszta só'
      },
      {
        id: 'p9',
        prompt: 'Tömegszázalék definíciója',
        value: '(m_oldott / m_oldat) · 100%'
      },
      {
        id: 'p10',
        prompt: '1 liter tiszta víz tömege',
        value: '1 kg (1000 gramm)'
      }
    ]
  },
  2: {
    title: '2. Szint: Keverési Egyenletek és Átírások',
    subtitle: 'Kösd össze a szöveges keverési szituációt a helyesen felírt egyenlettel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'x kg 15%-os és (50-x) kg 40%-osból 50 kg 30%-os',
        value: '15x + 40(50 - x) = 50 · 30'
      },
      {
        id: 'p2',
        prompt: '4 kg 25%-oshoz y kg tiszta víz hozzáadása',
        value: '4 · 25 + y · 0 = (4 + y) · p_új'
      },
      {
        id: 'p3',
        prompt: '300 g 12%-oshoz s g kristályos só adása',
        value: '300 · 12 + s · 100 = (300 + s) · p_új'
      },
      {
        id: 'p4',
        prompt: '600 g 10%-osból v g víz elpárologtatása',
        value: '600 · 10 = (600 - v) · p_új'
      },
      {
        id: 'p5',
        prompt: '200 g 14K aranyhoz x g 18K arany olvasztása 16K-hoz',
        value: '200 · 14 + x · 18 = (200 + x) · 16'
      },
      {
        id: 'p6',
        prompt: '3 kg 20 °C-os és 2 kg 70 °C-os víz keverése',
        value: '3 · 20 + 2 · 70 = 5 · T_közös'
      },
      {
        id: 'p7',
        prompt: 'Két egyenlő tömegű, 10% és 30% oldat keveréke',
        value: 'Számtani átlag: pontosan 20%'
      },
      {
        id: 'p8',
        prompt: '100 g 50%-os oldathoz 100 g tiszta víz',
        value: 'Felére hígul: 25%-os lesz'
      },
      {
        id: 'p9',
        prompt: '500 g 4%-os ecethez ecetsav (100%) adása 8%-hoz',
        value: '500 · 4 + 100x = (500 + x) · 8'
      },
      {
        id: 'p10',
        prompt: 'Általános keverési megmaradási egyenlet',
        value: 'm₁ · p₁ + m₂ · p₂ = (m₁ + m₂) · p_keverék'
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos Feladatok és Eredmények',
    subtitle: 'Párosítsd a keverési szöveges feladatot a pontos végeredménnyel!',
    pairs: [
      {
        id: 'p1',
        prompt: '3 kg 20%-os + 2 kg 30%-os sóoldat keveréke',
        value: '24%-os (120 g só / 5 kg)'
      },
      {
        id: 'p2',
        prompt: '4 kg 15%-os cukoroldathoz 2 kg tiszta víz',
        value: '10%-os (60 kg / 6 kg)'
      },
      {
        id: 'p3',
        prompt: 'Hány g só kell 180 g 10%-oshoz, hogy 20%-os legyen?',
        value: '22,5 g tiszta só'
      },
      {
        id: 'p4',
        prompt: '300 g 14K aranyhoz hány g 18K kell 15K-hoz?',
        value: '100 g 18 karátos arany'
      },
      {
        id: 'p5',
        prompt: '600 g 10%-osból hány g víz távozzon 15%-hoz?',
        value: '200 g víz párologjon el'
      },
      {
        id: 'p6',
        prompt: '2 kg 20 °C-os + 3 kg 70 °C-os víz keveréke',
        value: '50 °C közös hőmérséklet'
      },
      {
        id: 'p7',
        prompt: '10%-os és 40%-osból 60 kg 20%-os keverék',
        value: '40 kg 10%-os és 20 kg 40%-os'
      },
      {
        id: 'p8',
        prompt: '400 g 15%-oshoz hány g víz kell 10%-hoz?',
        value: '200 g tiszta víz'
      },
      {
        id: 'p9',
        prompt: '800 g 5%-os sóoldat tiszta víztartalma',
        value: '760 g víz (és 40 g só)'
      },
      {
        id: 'p10',
        prompt: '500 g 18 karátos arany tiszta aranytartalma',
        value: '375 g tiszta arany (75%)'
      }
    ]
  }
};

export const MixingWordProblemsMatcher: React.FC<MixingWordProblemsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-eq-mixing-matcher',
  topicTitle = 'Keverési Feladatok Párosító'
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Keverési Feladatok Párosító"
      subtitle="Párosítsd a kifejezéseket, keverési egyenleteket és eredményeket!"
      badge="PÁROSÍTÓ JÁTÉK"
      themeColor="teal"
      topicId={topicId}
      topicTitle={topicTitle}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default MixingWordProblemsMatcher;
