import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter2KnowledgeTestMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Fejezeti Alapfogalmak és Definíciók (Könnyű)',
    subtitle: 'Párosítsd a fejezet 12 témakörének alapfogalmait a leírásukkal!',
    pairs: [
      {
        id: 'cm-1-1',
        prompt: 'Természetes számok (ℕ)',
        value: 'A nemnegatív egész számok halmaza: {0, 1, 2, 3, ...}'
      },
      {
        id: 'cm-1-2',
        prompt: 'Racionális számok (ℚ)',
        value: 'Két egész szám hányadosaként (p/q, q ≠ 0) felírható számok'
      },
      {
        id: 'cm-1-3',
        prompt: 'Irracionális számok (ℝ \\ ℚ)',
        value: 'Végtelen nem szakaszos tizedestörtek (pl. √2, π)'
      },
      {
        id: 'cm-1-4',
        prompt: 'Egyenes arányosság',
        value: 'A két összetartozó mennyiség hányadosa állandó (y / x = k)'
      },
      {
        id: 'cm-1-5',
        prompt: 'Fordított arányosság',
        value: 'A két összetartozó mennyiség szorzata állandó (x · y = k)'
      },
      {
        id: 'cm-1-6',
        prompt: 'Normálalak fogalma',
        value: 'a · 10ᵏ alakú szám, ahol 1 ≤ a < 10 és k egész szám'
      },
      {
        id: 'cm-1-7',
        prompt: 'Kamatos kamat alaptétele',
        value: 'Tₙ = T₀ · qⁿ (exponenciális növekedés kamattal)'
      },
      {
        id: 'cm-1-8',
        prompt: 'Nulladik hatvány (a⁰, a ≠ 0)',
        value: 'Definíció szerint pontosan 1-gyel egyenlő'
      }
    ]
  },
  2: {
    title: '2. Szint: Matematikai Azonosságok és Formák (Közepes)',
    subtitle: 'Párosítsd az algebrai azonosságokat a helyes kifejtésükkel!',
    pairs: [
      {
        id: 'cm-2-1',
        prompt: 'Azonos alapú hatványok szorzata: aⁿ · aᵏ',
        value: 'aⁿ⁺ᵏ (kitevők összeadása)'
      },
      {
        id: 'cm-2-2',
        prompt: 'Azonos alapú hatványok hányadosa: aⁿ / aᵏ',
        value: 'aⁿ⁻ᵏ (kitevők kivonása)'
      },
      {
        id: 'cm-2-3',
        prompt: 'Hatvány hatványa: (aⁿ)ᵏ',
        value: 'aⁿˣᵏ (kitevők összeszorzása)'
      },
      {
        id: 'cm-2-4',
        prompt: 'Negatív kitevős hatvány: a⁻ⁿ',
        value: '1 / aⁿ (a hatvány reciproka)'
      },
      {
        id: 'cm-2-5',
        prompt: 'Szorzat négyzetgyöke: √(a · b)',
        value: '√a · √b (tényezőnkénti gyökvonás nemnegatívokra)'
      },
      {
        id: 'cm-2-6',
        prompt: 'Négyzet négyzetgyöke: √(a²)',
        value: '|a| (mindig nemnegatív abszolútérték)'
      },
      {
        id: 'cm-2-7',
        prompt: 'Növekedési kamattényező: q',
        value: 'q = 1 + p / 100 (pl. 8%-nál 1,08)'
      },
      {
        id: 'cm-2-8',
        prompt: 'Amortizációs tényező: q',
        value: 'q = 1 - p / 100 (pl. 15%-os csökkenésnél 0,85)'
      }
    ]
  },
  3: {
    title: '3. Szint: Értékszámítások és Mintafeladatok (Nehéz)',
    subtitle: 'Párosítsd a kifejezéseket a pontos numerikus értékükkel!',
    pairs: [
      {
        id: 'cm-3-1',
        prompt: '2⁻³ pontos értéke',
        value: '1 / 8 = 0,125'
      },
      {
        id: 'cm-3-2',
        prompt: '√72 legegyszerűbb gyökalakban',
        value: '6√2 (mivel 72 = 36 · 2)'
      },
      {
        id: 'cm-3-3',
        prompt: '-4² értéke (zárójel nélkül)',
        value: '-16 (a hatványozás előbbre való)'
      },
      {
        id: 'cm-3-4',
        prompt: '(-4)² értéke (zárójellel)',
        value: '+16 (negatív szám négyzete pozitív)'
      },
      {
        id: 'cm-3-5',
        prompt: '(3 · 10⁴)² normálalakban',
        value: '9 · 10⁸'
      },
      {
        id: 'cm-3-6',
        prompt: '20% emelés majd 20% leárazás eredője',
        value: '4%-os csökkenés (1,2 · 0,8 = 0,96)'
      },
      {
        id: 'cm-3-7',
        prompt: '0,3̇ (0,333...) törtalakban',
        value: '1/3'
      },
      {
        id: 'cm-3-8',
        prompt: '√((-9)²) pontos értéke',
        value: '+9 (nemnegatív valós gyök)'
      }
    ]
  }
};

export const Chapter2KnowledgeTestMatcher: React.FC<Chapter2KnowledgeTestMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-tudasproba-matcher',
  topicTitle = 'II. Fejezeti Összefoglalás & Tudáspróba'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`c2-test-matcher-${activeLevel}`}
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      pairs={config.pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="rose"
    />
  );
};

export default Chapter2KnowledgeTestMatcher;
