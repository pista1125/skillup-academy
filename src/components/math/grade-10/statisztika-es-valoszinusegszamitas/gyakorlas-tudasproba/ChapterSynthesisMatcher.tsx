import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface ChapterSynthesisMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  level?: number;
  currentLevel?: number;
  onSelectLevel?: (level: number) => void;
  [key: string]: any;
}

const matcherLevels: Record<number, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Statisztikai alapfogalmak és valószínűségi alaptörvények',
    subtitle: 'Párosítsd a statisztika és valószínűségszámítás alapfogalmait a definíciójukkal és képletükkel!',
    pairs: [
      {
        id: 'csm1-1',
        left: 'Számtani közép (átlag: x̄)',
        right: 'Az adatok összege osztva a darabszámmal: Σxᵢ / n'
      },
      {
        id: 'csm1-2',
        left: 'Módusz (Mo)',
        right: 'A minta leggyakoribb, legtöbbször előforduló értéke'
      },
      {
        id: 'csm1-3',
        left: 'Medián (Me)',
        right: 'A nagyság szerint rendezett adatsor pontosan középső eleme'
      },
      {
        id: 'csm1-4',
        left: 'Terjedelem (R)',
        right: 'A legnagyobb és legkisebb adat különbsége: x_max – x_min'
      },
      {
        id: 'csm1-5',
        left: 'Számtani és mértani közép kapcsolata',
        right: 'Két nemnegatív számra mindig A ≥ G (egyenlőség ha a = b)'
      },
      {
        id: 'csm1-6',
        left: 'Átlagtól vett előjeles eltérések összege',
        right: 'Mindig pontosan nulla: Σ(xᵢ – x̄) = 0'
      },
      {
        id: 'csm1-7',
        left: 'Relatív gyakoriság (g_k)',
        right: 'Gyakoriság és a kísérletek számának hányadosa: k / n'
      },
      {
        id: 'csm1-8',
        left: 'Klasszikus valószínűség (Laplace)',
        right: 'Kedvező elemi események / Összes egyenlően esélyes esemény'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Összetett szabályok, szórás és valószínűségi tételek',
    subtitle: 'Párosítsd a halmazos formulákat, szóródási mutatókat és összetett összefüggéseket!',
    pairs: [
      {
        id: 'csm2-1',
        left: 'Logikai szita képlete 2 eseményre',
        right: 'P(A ∪ B) = P(A) + P(B) – P(A ∩ B)'
      },
      {
        id: 'csm2-2',
        left: 'Komplementer esemény valószínűsége',
        right: 'P(Ā) = 1 – P(A), mert A és Ā kizáró és teljes rendszert alkot'
      },
      {
        id: 'csm2-3',
        left: 'Súlyozott számtani közép',
        right: 'x̄_w = Σ(wᵢ · xᵢ) / Σwᵢ'
      },
      {
        id: 'csm2-4',
        left: 'Szórás (s) definíciója',
        right: 'Az átlagtól vett négyzetes eltérések átlagának négyzetgyöke'
      },
      {
        id: 'csm2-5',
        left: 'Két szabályos kocka eseménytere',
        right: 'Összesen 6 · 6 = 36 egyenlően esélyes elemi kimenetel'
      },
      {
        id: 'csm2-6',
        left: 'Egymást kizáró események uniója',
        right: 'P(A ∪ B) = P(A) + P(B), mivel P(A ∩ B) = 0'
      },
      {
        id: 'csm2-7',
        left: 'Relatív megváltozás képlete',
        right: '(x₂ – x₁) / x₁ = Δx / x₁'
      },
      {
        id: 'csm2-8',
        left: 'Lehetetlen esemény (∅) és Biztos esemény (I)',
        right: 'P(∅) = 0 és P(I) = 1'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi és felvételi típusfeladatok szintézise',
    subtitle: 'Párosítsd a tankönyvi és érettségi reprezentatív feladatokat a helyes levezetéssel és végeredménnyel!',
    pairs: [
      {
        id: 'csm3-1',
        left: 'Jánosék almái: heti napi bevétel átlaga',
        right: '5 840 Ft/nap'
      },
      {
        id: 'csm3-2',
        left: '30 fős osztály matematika érettségi átlaga',
        right: '3,20'
      },
      {
        id: 'csm3-3',
        left: 'Kétkockás kétjegyű szám: négyzetszám',
        right: '4/36 = 1/9'
      },
      {
        id: 'csm3-4',
        left: 'Két iskola versenyátlaga (34 és 42 pont, közös: 36)',
        right: 'Létszámarány: n₁ = 3n₂'
      },
      {
        id: 'csm3-5',
        left: 'Kamarakórus korelnök nélkül (átlag 43 ➔ 42)',
        right: '12 fős kórus'
      },
      {
        id: 'csm3-6',
        left: 'Háromjegyű szám (900 db) osztható 5-tel',
        right: '1/5 = 20%'
      },
      {
        id: 'csm3-7',
        left: 'Peti 4 fényképe: senki sem kapja a sajátját',
        right: '9/24 = 37,5%'
      },
      {
        id: 'csm3-8',
        left: 'Zoknihúzás (18 kék csíkos, 12 fekete): azonos szín',
        right: '438 / 870 ≈ 50,3%'
      }
    ]
  }
};

export const ChapterSynthesisMatcher: React.FC<ChapterSynthesisMatcherProps> = (props) => {
  const { onBack, onSwitchToTheory, onSwitchToQuiz, ...restProps } = props;
  return (
    <MatcherTemplate
      topicTitle="Statisztika és Valószínűségszámítás"
      subtopicTitle="Fejezeti összefoglalás és tudáspróba"
      badgeText="FEJEZETI SZINTÉZIS PÁROSÍTÓ"
      levels={matcherLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      {...restProps}
    />
  );
};

export default ChapterSynthesisMatcher;

