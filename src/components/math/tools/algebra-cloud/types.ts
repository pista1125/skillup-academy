export type ThemeCategoryId = 'fruits' | 'animals' | 'vehicles' | 'food' | 'treasures';

export interface ThemeItemDef {
  id: string;
  name: string; // pl. 'Alma'
  emoji: string; // pl. '🍎'
  variable: string; // pl. 'a'
  color: string; // Tailwind color class or hex
  bgGradient: string;
  borderColor: string;
  textColor: string;
}

export interface ThemeCategory {
  id: ThemeCategoryId;
  name: string;
  icon: string;
  color: string;
  items: ThemeItemDef[];
}

export type RepresentationMode = 
  | 'concrete' // Level 1: Csak egyedi emojik
  | 'concrete-fused' // Level 2: Emojik + csoportos összetapadt tömbök (2-es, 3-as, 4-es, 5-ös)
  | 'bridge' // Level 4: Emojik és betűk együtt (pl. 2🍎 = 2a)
  | 'abstract' // Level 5: Tiszta algebrai tagok (pl. 3x, 2y, 5)
  | 'signed'; // Level 6: Pozitív és negatív tagok (-3x, +2y, -4)

export interface CloudItem {
  id: string;
  symbol: string; // 'a', 'b', 'c', 'x', 'y', '1'
  type: 'variable' | 'constant';
  emoji?: string;
  label?: string;
  coefficient: number; // pl. +1, +2, +3, -1, -2
  category?: ThemeCategoryId;
  isFusedBlock?: boolean; // Ha true, a vizuális megjelenés egy összetapadt kapszula
  fusedSize?: number; // 2, 3, 4, 5
}

export interface CloudContainer {
  id: string;
  title: string;
  multiplier: number; // e.g. 1, 2, 3, -1, -2 (szorzó a zárójelfelbontáshoz / kiemeléshez: 2·[...])
  items: CloudItem[];
  colorTheme: string;
}

export type ToolTab = 'sandbox' | 'missions' | 'challenges';

export interface MissionStep {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  story: string;
  instruction: string;
  category: ThemeCategoryId;
  repMode: RepresentationMode;
  clouds: CloudContainer[];
  expectedAction: 'combine' | 'zero_pairs' | 'expand' | 'factor' | 'add_items';
  targetCheck: (clouds: CloudContainer[]) => boolean;
  hint: string;
  successMessage: string;
}

export interface PracticeChallenge {
  id: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'combine' | 'zero_pairs' | 'expand' | 'factor';
  title: string;
  question: string;
  category: ThemeCategoryId;
  repMode: RepresentationMode;
  initialClouds: CloudContainer[];
  checkAnswer: (clouds: CloudContainer[]) => boolean;
  expectedExpr: string;
  hint: string;
  explanation: string;
}
