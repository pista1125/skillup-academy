import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter3EquationsSummaryMatcherProps {
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
    title: '1. Szint: Alapvető Egyenlettípusok és Modellképletek',
    subtitle: 'Párosítsd a szöveges témakört a hozzá tartozó matematikai képlettel vagy modellel!',
    pairs: [
      {
        id: 'esm1',
        prompt: 'Számelméleti kétjegyű szám felírása helyiérték szerint',
        value: '10a + b (felcserélve: 10b + a)'
      },
      {
        id: 'esm2',
        prompt: 'Életkoros feladat időeltolódása x év múlva',
        value: 'Apa + x = k · (Fia + x)'
      },
      {
        id: 'esm3',
        prompt: 'Keverési feladat oldott anyag megmaradási törvénye',
        value: 'm₁ · p₁ + m₂ · p₂ = m_ö · p_ö'
      },
      {
        id: 'esm4',
        prompt: 'Egyenletes mozgás alapösszefüggése',
        value: 's = v · t'
      },
      {
        id: 'esm5',
        prompt: 'Közös munkavégzés 1 óra alatt elvégzett munkarésze',
        value: '1/t₁ + 1/t₂ = 1/t_együtt'
      },
      {
        id: 'esm6',
        prompt: 'Téglalap kerületének egyenlete',
        value: 'K = 2(a + b)'
      },
      {
        id: 'esm7',
        prompt: 'Egyszerű banki kamat képlete',
        value: 'K = (T · p · t) / 100'
      },
      {
        id: 'esm8',
        prompt: '20%-os áremelés algebrai szorzótényezője',
        value: 'Új ár = Eredeti ár · 1,20'
      }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Szituációk és Algebrai Modellek',
    subtitle: 'Találd meg a feladatszöveghez tartozó pontos egyenletet vagy összefüggést!',
    pairs: [
      {
        id: 'esm9',
        prompt: 'Szemből induló járművek találkozási ideje (s távolság)',
        value: 't = s / (v₁ + v₂)'
      },
      {
        id: 'esm10',
        prompt: '25%-os leárazás utáni eredeti ár kiszámítása',
        value: 'Eredeti ár = Akciós ár / 0,75'
      },
      {
        id: 'esm11',
        prompt: 'Egy szám és 3-szorosának összege 48',
        value: 'x + 3x = 48 ⇒ x = 12'
      },
      {
        id: 'esm12',
        prompt: 'Apa 3-szor annyi idős, mint fia, korkülönbségük 24 év',
        value: '3x - x = 24 ⇒ x = 12 (apa 36)'
      },
      {
        id: 'esm13',
        prompt: 'Tyúkok és nyulak: 20 állatnak együtt 56 lába van',
        value: '2t + 4(20 - t) = 56 ⇒ 12 tyúk'
      },
      {
        id: 'esm14',
        prompt: 'Két szám összege 30, arányuk 2 : 3',
        value: '2x + 3x = 30 ⇒ x = 6 (12 és 18)'
      },
      {
        id: 'esm15',
        prompt: 'Egyenes szöget (180°) osztunk 3 : 2 arányban',
        value: '3x + 2x = 180° ⇒ 108° és 72°'
      },
      {
        id: 'esm16',
        prompt: '50 000 Ft betét évi 6%-os kamatra fél évre (t = 0,5)',
        value: 'Kamat = 50 000 · 0,06 · 0,5 = 1500 Ft'
      }
    ]
  },
  3: {
    title: '3. Szint: Felvételi Típusú Feladványok és Egzakt Gyökeik',
    subtitle: 'Párosítsd az összetett feladatot a pontos végeredménnyel!',
    pairs: [
      {
        id: 'esm17',
        prompt: 'Kétjegyű szám jegyei összege 9, felcserélve 27-tel nő',
        value: 'A keresett szám a 36 (felcserélve: 63)'
      },
      {
        id: 'esm18',
        prompt: 'Oldd meg: 4(x - 2) + 3 = 2(x + 5) - 1',
        value: 'x = 7 (4x - 5 = 2x + 9)'
      },
      {
        id: 'esm19',
        prompt: '3 kg 20%-os és 2 kg 30%-os sóoldat keverékének töménysége',
        value: '24% sótartalmú oldat keletkezik'
      },
      {
        id: 'esm20',
        prompt: 'Gyorsabb autó 20 km/h-val előz, mikor dolgozza le a 100 km-t?',
        value: 't = 100 / 20 = 5 óra múlva éri utol'
      },
      {
        id: 'esm21',
        prompt: 'Csap 3 óra alatt tölt, lefolyó 6 óra alatt üríti ki a medencét',
        value: '1/3 - 1/6 = 1/6 ⇒ 6 óra alatt telik meg'
      },
      {
        id: 'esm22',
        prompt: 'Derékszögű háromszög egyik hegyesszöge 4-szerese a másiknak',
        value: 'α + 4α = 90° ⇒ 18° és 72°'
      },
      {
        id: 'esm23',
        prompt: '20% áremelés után azonnali 20% leértékelés eredménye',
        value: '1,20 · 0,80 = 0,96 (4%-os árcsökkenés)'
      },
      {
        id: 'esm24',
        prompt: 'Oldd meg: 2(x - 3) = 2x + 5 a valós számok halmazán',
        value: 'Ellentmondás (-6 = 5): nincs megoldás (x ∈ ∅)'
      }
    ]
  }
};

export const Chapter3EquationsSummaryMatcher: React.FC<Chapter3EquationsSummaryMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-eq-summary',
  topicTitle = 'III. Fejezet Témazáró Párosító'
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="III. Fejezet Témazáró Párosító"
      subtitle="Párosítsd az egyenleteket, képleteket, szöveges modelleket és megoldásokat!"
      badge="TÉMAZÁRÓ PÁROSÍTÓ"
      themeColor="amber"
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

export default Chapter3EquationsSummaryMatcher;
