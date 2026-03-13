import { 
  Star, 
  Hexagon, 
  Triangle, 
  Square, 
  Circle, 
  Heart, 
  Moon, 
  Sun, 
  Cloud, 
  Zap, 
  ArrowUp, 
  ArrowRight, 
  ArrowDown, 
  ArrowLeft,
  MoveUpRight,
  MoveDownRight,
  MoveDownLeft,
  MoveUpLeft,
  Infinity,
  Plus,
  Minus,
  Divide,
  Percent,
  Variable,
  Hash,
  Crown,
  Ghost,
  Trophy,
  Anchor,
  Compass,
  Music,
  Bell,
  Check,
  X,
  Shield,
  Key,
  Flame,
  Bomb,
  Target,
  Rocket
} from 'lucide-react';

export interface ShapeDefinition {
  id: string;
  name: string;
  category: 'geometric' | 'arrows' | 'symbols' | 'logic' | 'objects' | 'icons';
  type: 'shape' | 'lucide' | 'emoji';
  content: string;
}

export const SHAPE_LIBRARY: ShapeDefinition[] = [
  // Geometric
  { id: 'circle', name: 'Kör', category: 'geometric', type: 'shape', content: 'circle' },
  { id: 'square', name: 'Négyzet', category: 'geometric', type: 'shape', content: 'square' },
  { id: 'triangle', name: 'Háromszög', category: 'geometric', type: 'shape', content: 'triangle' },
  { id: 'pentagon', name: 'Ötszög', category: 'geometric', type: 'shape', content: 'pentagon' },
  { id: 'hexagon', name: 'Hatszög', category: 'geometric', type: 'shape', content: 'hexagon' },
  { id: 'octagon', name: 'Nyolcszög', category: 'geometric', type: 'shape', content: 'octagon' },
  { id: 'diamond', name: 'Rombusz', category: 'geometric', type: 'shape', content: 'diamond' },
  { id: 'star_4', name: '4-ágú Csillag', category: 'geometric', type: 'shape', content: 'star_4' },
  { id: 'star_5', name: '5-ágú Csillag', category: 'geometric', type: 'shape', content: 'star_5' },
  { id: 'star_6', name: '6-ágú Csillag', category: 'geometric', type: 'shape', content: 'star_6' },
  { id: 'ellipse', name: 'Ellipszis', category: 'geometric', type: 'shape', content: 'ellipse' },
  { id: 'trapezoid', name: 'Trapéz', category: 'geometric', type: 'shape', content: 'trapezoid' },
  { id: 'parallelogram', name: 'Paralelogramma', category: 'geometric', type: 'shape', content: 'parallelogram' },
  { id: 'cross', name: 'Kereszt', category: 'geometric', type: 'shape', content: 'cross' },

  // Arrows
  { id: 'arrow_up', name: 'Nyíl Fel', category: 'arrows', type: 'lucide', content: 'ArrowUp' },
  { id: 'arrow_right', name: 'Nyíl Jobbra', category: 'arrows', type: 'lucide', content: 'ArrowRight' },
  { id: 'arrow_down', name: 'Nyíl Le', category: 'arrows', type: 'lucide', content: 'ArrowDown' },
  { id: 'arrow_left', name: 'Nyíl Balra', category: 'arrows', type: 'lucide', content: 'ArrowLeft' },
  { id: 'arrow_ur', name: 'Nyíl Fel-Jobb', category: 'arrows', type: 'lucide', content: 'MoveUpRight' },
  { id: 'arrow_dr', name: 'Nyíl Le-Jobb', category: 'arrows', type: 'lucide', content: 'MoveDownRight' },
  { id: 'arrow_dl', name: 'Nyíl Le-Bal', category: 'arrows', type: 'lucide', content: 'MoveDownLeft' },
  { id: 'arrow_ul', name: 'Nyíl Fel-Bal', category: 'arrows', type: 'lucide', content: 'MoveUpLeft' },
  { id: 'double_arrow_v', name: 'Kettős Nyíl V', category: 'arrows', type: 'shape', content: 'double_arrow_v' },
  { id: 'double_arrow_h', name: 'Kettős Nyíl H', category: 'arrows', type: 'shape', content: 'double_arrow_h' },

  // Logic & Math
  { id: 'plus', name: 'Plusz', category: 'logic', type: 'lucide', content: 'Plus' },
  { id: 'minus', name: 'Mínusz', category: 'logic', type: 'lucide', content: 'Minus' },
  { id: 'multiply', name: 'Szorzás', category: 'logic', type: 'lucide', content: 'X' },
  { id: 'divide', name: 'Osztás', category: 'logic', type: 'lucide', content: 'Divide' },
  { id: 'percent', name: 'Százalék', category: 'logic', type: 'lucide', content: 'Percent' },
  { id: 'infinity', name: 'Végtelen', category: 'logic', type: 'lucide', content: 'Infinity' },
  { id: 'variable', name: 'Változó (x)', category: 'logic', type: 'lucide', content: 'Variable' },
  { id: 'hash', name: 'Kettőskereszt', category: 'logic', type: 'lucide', content: 'Hash' },
  { id: 'equal', name: 'Egyenlő', category: 'logic', type: 'shape', content: 'equal' },
  { id: 'not_equal', name: 'Nem Egyenlő', category: 'logic', type: 'shape', content: 'not_equal' },

  // Icons & Symbols
  { id: 'heart', name: 'Szív', category: 'symbols', type: 'lucide', content: 'Heart' },
  { id: 'sun', name: 'Nap', category: 'symbols', type: 'lucide', content: 'Sun' },
  { id: 'moon', name: 'Hold', category: 'symbols', type: 'lucide', content: 'Moon' },
  { id: 'cloud', name: 'Felhő', category: 'symbols', type: 'lucide', content: 'Cloud' },
  { id: 'zap', name: 'Villám', category: 'symbols', type: 'lucide', content: 'Zap' },
  { id: 'flame', name: 'Tűz', category: 'symbols', type: 'lucide', content: 'Flame' },
  { id: 'bomb', name: 'Bomba', category: 'symbols', type: 'lucide', content: 'Bomb' },
  { id: 'rocket', name: 'Rakéta', category: 'symbols', type: 'lucide', content: 'Rocket' },
  { id: 'target', name: 'Céltábla', category: 'symbols', type: 'lucide', content: 'Target' },
  { id: 'shield', name: 'Pajzs', category: 'symbols', type: 'lucide', content: 'Shield' },

  // Objects
  { id: 'trophy', name: 'Trófea', category: 'objects', type: 'lucide', content: 'Trophy' },
  { id: 'crown', name: 'Korona', category: 'objects', type: 'lucide', content: 'Crown' },
  { id: 'key', name: 'Kulcs', category: 'objects', type: 'lucide', content: 'Key' },
  { id: 'anchor', name: 'Horgony', category: 'objects', type: 'lucide', content: 'Anchor' },
  { id: 'compass', name: 'Iránytű', category: 'objects', type: 'lucide', content: 'Compass' },
  { id: 'music', name: 'Zene', category: 'objects', type: 'lucide', content: 'Music' },
  { id: 'bell', name: 'Harang', category: 'objects', type: 'lucide', content: 'Bell' },
  { id: 'ghost', name: 'Szellem', category: 'objects', type: 'lucide', content: 'Ghost' },

  // Emojis (Groups of 10)
  { id: 'dog', name: 'Kutya', category: 'icons', type: 'emoji', content: '🐶' },
  { id: 'cat', name: 'Macska', category: 'icons', type: 'emoji', content: '🐱' },
  { id: 'mouse', name: 'Egér', category: 'icons', type: 'emoji', content: '🐭' },
  { id: 'rabbit', name: 'Nyúl', category: 'icons', type: 'emoji', content: '🐰' },
  { id: 'bear', name: 'Medve', category: 'icons', type: 'emoji', content: '🐻' },
  { id: 'frog', name: 'Béka', category: 'icons', type: 'emoji', content: '🐸' },
  { id: 'monkey', name: 'Majom', category: 'icons', type: 'emoji', content: '🐵' },
  { id: 'lion', name: 'Oroszlán', category: 'icons', type: 'emoji', content: '🦁' },
  { id: 'tiger', name: 'Tigris', category: 'icons', type: 'emoji', content: '🐯' },
  { id: 'panda', name: 'Panda', category: 'icons', type: 'emoji', content: '🐼' },
  
  { id: 'apple', name: 'Alma', category: 'icons', type: 'emoji', content: '🍎' },
  { id: 'pear', name: 'Körte', category: 'icons', type: 'emoji', content: '🍐' },
  { id: 'banana', name: 'Banán', category: 'icons', type: 'emoji', content: '🍌' },
  { id: 'grapes', name: 'Szőlő', category: 'icons', type: 'emoji', content: '🍇' },
  { id: 'strawberry', name: 'Eper', category: 'icons', type: 'emoji', content: '🍓' },
  { id: 'melon', name: 'Dinnye', category: 'icons', type: 'emoji', content: '🍉' },
  { id: 'pineapple', name: 'Ananász', category: 'icons', type: 'emoji', content: '🍍' },
  { id: 'cherry', name: 'Cseresznye', category: 'icons', type: 'emoji', content: '🍒' },
  { id: 'peach', name: 'Barack', category: 'icons', type: 'emoji', content: '🍑' },
  { id: 'kiwi', name: 'Kiwi', category: 'icons', type: 'emoji', content: '🥝' },
];

export const CATEGORIES = [
  { id: 'geometric', label: 'Alakzatok', icon: Square },
  { id: 'arrows', label: 'Nyilak', icon: ArrowRight },
  { id: 'logic', label: 'Matek/Logika', icon: Variable },
  { id: 'symbols', label: 'Szimbólumok', icon: Zap },
  { id: 'objects', label: 'Tárgyak', icon: Trophy },
  { id: 'icons', label: 'Emoji/Ikon', icon: Rocket },
];

export const COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Slate', value: '#475569' },
  { name: 'Black', value: '#000000' },
];
