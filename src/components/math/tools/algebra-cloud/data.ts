import { ThemeCategory, MissionStep, PracticeChallenge, CloudContainer, CloudItem, RepresentationMode } from './types';

export const THEME_CATEGORIES: ThemeCategory[] = [
  {
    id: 'fruits',
    name: 'Gyümölcsök',
    icon: '🍎',
    color: 'from-red-500 to-amber-500',
    items: [
      { id: 'apple', name: 'Alma', emoji: '🍎', variable: 'a', color: 'bg-red-500', bgGradient: 'from-red-50 to-red-100', borderColor: 'border-red-300', textColor: 'text-red-700' },
      { id: 'pear', name: 'Körte', emoji: '🍐', variable: 'k', color: 'bg-lime-500', bgGradient: 'from-lime-50 to-lime-100', borderColor: 'border-lime-300', textColor: 'text-lime-800' },
      { id: 'lemon', name: 'Citrom', emoji: '🍋', variable: 'c', color: 'bg-yellow-400', bgGradient: 'from-yellow-50 to-yellow-100', borderColor: 'border-yellow-300', textColor: 'text-amber-700' },
      { id: 'strawberry', name: 'Eper', emoji: '🍓', variable: 'e', color: 'bg-rose-500', bgGradient: 'from-rose-50 to-rose-100', borderColor: 'border-rose-300', textColor: 'text-rose-700' },
      { id: 'banana', name: 'Banán', emoji: '🍌', variable: 'b', color: 'bg-amber-400', bgGradient: 'from-amber-50 to-amber-100', borderColor: 'border-amber-300', textColor: 'text-amber-800' },
    ]
  },
  {
    id: 'animals',
    name: 'Állatok',
    icon: '🐾',
    color: 'from-amber-500 to-orange-500',
    items: [
      { id: 'cat', name: 'Cica', emoji: '🐱', variable: 'c', color: 'bg-amber-500', bgGradient: 'from-amber-50 to-amber-100', borderColor: 'border-amber-300', textColor: 'text-amber-800' },
      { id: 'dog', name: 'Kutya', emoji: '🐶', variable: 'k', color: 'bg-orange-500', bgGradient: 'from-orange-50 to-orange-100', borderColor: 'border-orange-300', textColor: 'text-orange-800' },
      { id: 'panda', name: 'Panda', emoji: '🐼', variable: 'p', color: 'bg-slate-700', bgGradient: 'from-slate-100 to-slate-200', borderColor: 'border-slate-300', textColor: 'text-slate-800' },
      { id: 'fox', name: 'Róka', emoji: '🦊', variable: 'r', color: 'bg-orange-600', bgGradient: 'from-orange-50 to-red-100', borderColor: 'border-orange-300', textColor: 'text-orange-700' },
      { id: 'rabbit', name: 'Nyuszi', emoji: '🐰', variable: 'n', color: 'bg-pink-400', bgGradient: 'from-pink-50 to-pink-100', borderColor: 'border-pink-300', textColor: 'text-pink-700' },
    ]
  },
  {
    id: 'vehicles',
    name: 'Járművek',
    icon: '🚀',
    color: 'from-blue-500 to-cyan-500',
    items: [
      { id: 'car', name: 'Autó', emoji: '🚗', variable: 'x', color: 'bg-blue-500', bgGradient: 'from-blue-50 to-blue-100', borderColor: 'border-blue-300', textColor: 'text-blue-700' },
      { id: 'rocket', name: 'Rakéta', emoji: '🚀', variable: 'y', color: 'bg-indigo-600', bgGradient: 'from-indigo-50 to-indigo-100', borderColor: 'border-indigo-300', textColor: 'text-indigo-800' },
      { id: 'bike', name: 'Bicikli', emoji: '🚲', variable: 'b', color: 'bg-teal-500', bgGradient: 'from-teal-50 to-teal-100', borderColor: 'border-teal-300', textColor: 'text-teal-800' },
      { id: 'boat', name: 'Vitorlás', emoji: '⛵', variable: 'v', color: 'bg-cyan-500', bgGradient: 'from-cyan-50 to-cyan-100', borderColor: 'border-cyan-300', textColor: 'text-cyan-800' },
      { id: 'plane', name: 'Repülő', emoji: '✈️', variable: 'z', color: 'bg-sky-500', bgGradient: 'from-sky-50 to-sky-100', borderColor: 'border-sky-300', textColor: 'text-sky-800' },
    ]
  },
  {
    id: 'food',
    name: 'Finomságok',
    icon: '🍕',
    color: 'from-orange-500 to-rose-500',
    items: [
      { id: 'pizza', name: 'Pizza', emoji: '🍕', variable: 'p', color: 'bg-orange-500', bgGradient: 'from-orange-50 to-orange-100', borderColor: 'border-orange-300', textColor: 'text-orange-800' },
      { id: 'burger', name: 'Burger', emoji: '🍔', variable: 'b', color: 'bg-amber-600', bgGradient: 'from-amber-50 to-amber-100', borderColor: 'border-amber-300', textColor: 'text-amber-800' },
      { id: 'icecream', name: 'Fagyi', emoji: '🍦', variable: 'f', color: 'bg-pink-400', bgGradient: 'from-pink-50 to-pink-100', borderColor: 'border-pink-300', textColor: 'text-pink-700' },
      { id: 'donut', name: 'Fánk', emoji: '🍩', variable: 'd', color: 'bg-purple-400', bgGradient: 'from-purple-50 to-purple-100', borderColor: 'border-purple-300', textColor: 'text-purple-800' },
      { id: 'cookie', name: 'Keksz', emoji: '🍪', variable: 'k', color: 'bg-yellow-600', bgGradient: 'from-yellow-50 to-amber-100', borderColor: 'border-yellow-300', textColor: 'text-yellow-900' },
    ]
  },
  {
    id: 'treasures',
    name: 'Kincsek & Tárgyak',
    icon: '💎',
    color: 'from-purple-500 to-pink-500',
    items: [
      { id: 'diamond', name: 'Gyémánt', emoji: '💎', variable: 'x', color: 'bg-cyan-500', bgGradient: 'from-cyan-50 to-cyan-100', borderColor: 'border-cyan-300', textColor: 'text-cyan-800' },
      { id: 'star', name: 'Csillag', emoji: '⭐', variable: 'y', color: 'bg-amber-400', bgGradient: 'from-yellow-50 to-yellow-100', borderColor: 'border-yellow-300', textColor: 'text-amber-700' },
      { id: 'gift', name: 'Ajándék', emoji: '🎁', variable: 'a', color: 'bg-red-500', bgGradient: 'from-red-50 to-pink-100', borderColor: 'border-red-300', textColor: 'text-red-700' },
      { id: 'balloon', name: 'Lufi', emoji: '🎈', variable: 'l', color: 'bg-rose-500', bgGradient: 'from-rose-50 to-rose-100', borderColor: 'border-rose-300', textColor: 'text-rose-700' },
      { id: 'coin', name: 'Érme (Egység)', emoji: '🪙', variable: '1', color: 'bg-yellow-500', bgGradient: 'from-yellow-50 to-amber-100', borderColor: 'border-yellow-300', textColor: 'text-amber-800' },
    ]
  }
];

export const ABSTRACT_VARIABLES = [
  { symbol: 'x', label: 'x változó', color: 'bg-blue-500', bgGradient: 'from-blue-50 to-blue-100', borderColor: 'border-blue-300', textColor: 'text-blue-700' },
  { symbol: 'y', label: 'y változó', color: 'bg-indigo-500', bgGradient: 'from-indigo-50 to-indigo-100', borderColor: 'border-indigo-300', textColor: 'text-indigo-700' },
  { symbol: 'a', label: 'a változó', color: 'bg-emerald-500', bgGradient: 'from-emerald-50 to-emerald-100', borderColor: 'border-emerald-300', textColor: 'text-emerald-700' },
  { symbol: 'b', label: 'b változó', color: 'bg-amber-500', bgGradient: 'from-amber-50 to-amber-100', borderColor: 'border-amber-300', textColor: 'text-amber-700' },
  { symbol: 'c', label: 'c változó', color: 'bg-rose-500', bgGradient: 'from-rose-50 to-rose-100', borderColor: 'border-rose-300', textColor: 'text-rose-700' },
  { symbol: '1', emoji: '🪙', label: '1 Konstans (Érme)', color: 'bg-yellow-500', bgGradient: 'from-yellow-50 to-amber-100', borderColor: 'border-yellow-300', textColor: 'text-amber-800' },
];

export function createInitialCloud(id: string, title: string = '1. Felhő', colorTheme: string = 'blue'): CloudContainer {
  return {
    id,
    title,
    multiplier: 1,
    items: [],
    colorTheme,
  };
}

// Helper: formats a mathematical expression for a cloud container
export function formatCloudExpression(cloud: CloudContainer, mode: RepresentationMode = 'concrete', itemized: boolean = false): string {
  if (!cloud || !cloud.items || cloud.items.length === 0) return '0';

  let inner = '';

  if (itemized) {
    // Show each item as a separate term
    const terms = cloud.items.map((item, idx) => {
      const isNeg = item.coefficient < 0;
      const absVal = Math.abs(item.coefficient);
      const sign = isNeg ? '- ' : (idx > 0 ? '+ ' : '');

      if (mode === 'concrete' || mode === 'concrete-fused') {
        const emo = item.emoji || item.symbol;
        return `${sign}${absVal > 1 ? absVal : ''}${emo}`;
      } else if (mode === 'bridge') {
        const emo = item.emoji ? ` (${item.emoji})` : '';
        const sym = item.symbol === '1' ? '' : item.symbol;
        return `${sign}${absVal === 1 && sym ? '' : absVal}${sym}${emo}`;
      } else {
        const sym = item.symbol === '1' ? '' : item.symbol;
        return `${sign}${absVal === 1 && sym ? '' : absVal}${sym}`;
      }
    });
    inner = terms.join(' ');
  } else {
    // Group by symbol/emoji
    const groups = new Map<string, { coeff: number; emoji?: string; label?: string; type: string; symbol: string }>();

    cloud.items.forEach(item => {
      const key = item.symbol || item.emoji || 'x';
      const existing = groups.get(key) || { 
        coeff: 0, 
        emoji: item.emoji, 
        label: item.label, 
        type: item.type,
        symbol: item.symbol
      };
      existing.coeff += (Number(item.coefficient) || 0);
      if (item.emoji && !existing.emoji) existing.emoji = item.emoji;
      groups.set(key, existing);
    });

    const parts: string[] = [];

    groups.forEach((group, key) => {
      if (group.coeff === 0) return;
      const isNeg = group.coeff < 0;
      const absCoeff = Math.abs(group.coeff);
      const sign = isNeg ? (parts.length > 0 ? '- ' : '-') : (parts.length > 0 ? '+ ' : '');

      if (mode === 'concrete' || mode === 'concrete-fused') {
        const displayEmoji = group.emoji || key;
        parts.push(`${sign}${absCoeff > 1 ? absCoeff : ''}${displayEmoji}`);
      } else if (mode === 'bridge') {
        const displayEmoji = group.emoji ? ` (${group.emoji})` : '';
        const varSymbol = group.symbol === '1' ? '' : group.symbol;
        if (group.symbol === '1') {
          parts.push(`${sign}${absCoeff}${displayEmoji}`);
        } else {
          parts.push(`${sign}${absCoeff === 1 ? '' : absCoeff}${varSymbol}${displayEmoji}`);
        }
      } else {
        // abstract or signed
        if (group.symbol === '1') {
          parts.push(`${sign}${absCoeff}`);
        } else {
          const coeffStr = absCoeff === 1 ? '' : `${absCoeff}`;
          parts.push(`${sign}${coeffStr}${group.symbol}`);
        }
      }
    });

    inner = parts.length > 0 ? parts.join(' ') : '0';
  }

  if (cloud.multiplier !== 1) {
    if (cloud.multiplier === -1) {
      return `-(${inner})`;
    }
    return `${cloud.multiplier} · (${inner})`;
  }

  return inner;
}

// 8 Guided Mission Steps
export const GUIDED_MISSIONS: MissionStep[] = [
  {
    id: 1,
    title: '1. Küldetés: Gyümölcsszedés a Felhőbe',
    subtitle: 'Konkrét egyes elemek hozzáadása és összevonása',
    badge: '1. Szint: Konkrét Alapok',
    story: 'Peti egy felhőbe pakol 3 almát 🍎 és 4 körtét 🍐. Nézzük meg, hogyan számoljuk össze a felhő tartalmát!',
    instruction: 'Kattints az "Összevonás" gombra a felhő alján, hogy az azonos gyümölcsök egyetlen kártyává álljanak össze!',
    category: 'fruits',
    repMode: 'concrete',
    clouds: [
      {
        id: 'cloud-1',
        title: 'Gyümölcsös Felhő',
        multiplier: 1,
        colorTheme: 'red',
        items: [
          { id: 'i1', symbol: 'a', type: 'variable', emoji: '🍎', label: 'Alma', coefficient: 1 },
          { id: 'i2', symbol: 'a', type: 'variable', emoji: '🍎', label: 'Alma', coefficient: 1 },
          { id: 'i3', symbol: 'a', type: 'variable', emoji: '🍎', label: 'Alma', coefficient: 1 },
          { id: 'i4', symbol: 'k', type: 'variable', emoji: '🍐', label: 'Körte', coefficient: 1 },
          { id: 'i5', symbol: 'k', type: 'variable', emoji: '🍐', label: 'Körte', coefficient: 1 },
          { id: 'i6', symbol: 'k', type: 'variable', emoji: '🍐', label: 'Körte', coefficient: 1 },
          { id: 'i7', symbol: 'k', type: 'variable', emoji: '🍐', label: 'Körte', coefficient: 1 },
        ]
      }
    ],
    expectedAction: 'combine',
    targetCheck: (clouds) => {
      const c = clouds[0];
      if (!c || c.items.length !== 2) return false;
      const apples = c.items.find(i => i.symbol === 'a')?.coefficient || 0;
      const pears = c.items.find(i => i.symbol === 'k')?.coefficient || 0;
      return apples === 3 && pears === 4;
    },
    hint: 'Kattints a felhő alatti "✨ Összevonás" gombra!',
    successMessage: 'Szuper! 3 alma + 4 körte nem keverhető össze, de a 3 alma egybefogható: 3🍎 és 4🍐!',
  },
  {
    id: 2,
    title: '2. Küldetés: Csomagolt Tömbök (2-es, 3-as almatömb)',
    subtitle: 'Összetapadt többes elemek összevonása',
    badge: '2. Szint: Többes Tömbök',
    story: 'A piacon az almákat néha 2-es vagy 3-as összetapadt csomagokban árulják. Ha van 1 db 2-es almatömböd és 2 db 3-as almatömböd, összesen hány almád van?',
    instruction: 'Vond össze a csomagolt almatömböket a felhőben!',
    category: 'fruits',
    repMode: 'concrete-fused',
    clouds: [
      {
        id: 'cloud-1',
        title: 'Csomagolt Gyümölcsök',
        multiplier: 1,
        colorTheme: 'orange',
        items: [
          { id: 'f1', symbol: 'a', type: 'variable', emoji: '🍎', label: '2-es Almatömb', coefficient: 2, isFusedBlock: true, fusedSize: 2 },
          { id: 'f2', symbol: 'a', type: 'variable', emoji: '🍎', label: '3-as Almatömb', coefficient: 3, isFusedBlock: true, fusedSize: 3 },
          { id: 'f3', symbol: 'a', type: 'variable', emoji: '🍎', label: '3-as Almatömb', coefficient: 3, isFusedBlock: true, fusedSize: 3 },
          { id: 'f4', symbol: 'k', type: 'variable', emoji: '🍐', label: '2-es Körtetömb', coefficient: 2, isFusedBlock: true, fusedSize: 2 },
        ]
      }
    ],
    expectedAction: 'combine',
    targetCheck: (clouds) => {
      const c = clouds[0];
      if (!c || c.items.length !== 2) return false;
      const apples = c.items.find(i => i.symbol === 'a')?.coefficient || 0;
      const pears = c.items.find(i => i.symbol === 'k')?.coefficient || 0;
      return apples === 8 && pears === 2;
    },
    hint: 'Kattints az "✨ Összevonás" gombra! 2 + 3 + 3 = 8 alma!',
    successMessage: 'Pontos! 2 + 3 + 3 = 8 alma (8🍎) és 2 körte (2🍐)! Az összetapadt tömbök segítik a szorzás megértését.',
  },
  {
    id: 3,
    title: '3. Küldetés: Állatok és Járművek Világa',
    subtitle: '5 különböző témakategória használata',
    badge: '3. Szint: Kategóriák',
    story: 'Nem csak gyümölcsökkel számolhatunk! A cicák 🐱 és kutyák 🐶, vagy autók 🚗 és rakéták 🚀 ugyanúgy csoportosíthatók.',
    instruction: 'Vond össze a felhőben lévő cicákat, kutyákat és pandákat!',
    category: 'animals',
    repMode: 'concrete-fused',
    clouds: [
      {
        id: 'cloud-1',
        title: 'Állatos Felhő',
        multiplier: 1,
        colorTheme: 'amber',
        items: [
          { id: 'a1', symbol: 'c', type: 'variable', emoji: '🐱', label: '2-es Cica', coefficient: 2, isFusedBlock: true, fusedSize: 2 },
          { id: 'a2', symbol: 'c', type: 'variable', emoji: '🐱', label: 'Cica', coefficient: 1 },
          { id: 'a3', symbol: 'k', type: 'variable', emoji: '🐶', label: '3-as Kutya', coefficient: 3, isFusedBlock: true, fusedSize: 3 },
          { id: 'a4', symbol: 'k', type: 'variable', emoji: '🐶', label: '2-es Kutya', coefficient: 2, isFusedBlock: true, fusedSize: 2 },
          { id: 'a5', symbol: 'p', type: 'variable', emoji: '🐼', label: 'Panda', coefficient: 1 },
        ]
      }
    ],
    expectedAction: 'combine',
    targetCheck: (clouds) => {
      const c = clouds[0];
      if (!c || c.items.length !== 3) return false;
      const cats = c.items.find(i => i.symbol === 'c')?.coefficient || 0;
      const dogs = c.items.find(i => i.symbol === 'k')?.coefficient || 0;
      const pandas = c.items.find(i => i.symbol === 'p')?.coefficient || 0;
      return cats === 3 && dogs === 5 && pandas === 1;
    },
    hint: '3 cica (3🐱) + 5 kutya (5🐶) + 1 panda (1🐼). Kattints az Összevonásra!',
    successMessage: 'Kiváló! 3 cica, 5 kutya és 1 panda. Bármilyen tárgyat csoportosíthatunk így!',
  },
  {
    id: 4,
    title: '4. Küldetés: A Nagy Kódolás (Emojikból Betűk!)',
    subtitle: 'Híd a konkrét és az absztrakt algebra között',
    badge: '4. Szint: Híd az Algebrába',
    story: 'A matematikusok lusták minden alkalommal lerajzolni az almát 🍎 vagy a macskát 🐱, ezért betűkkel jelölik őket: 🍎 = a, 🍐 = k, 🚗 = x.',
    instruction: 'Nézd meg a felhőt Híd módban: 3a (3🍎) + 2k (2🍐) + a (🍎) = 4a + 2k!',
    category: 'fruits',
    repMode: 'bridge',
    clouds: [
      {
        id: 'cloud-1',
        title: 'Híd Felhő (Emojik + Betűk)',
        multiplier: 1,
        colorTheme: 'emerald',
        items: [
          { id: 'b1', symbol: 'a', type: 'variable', emoji: '🍎', label: '3a (3 Alma)', coefficient: 3 },
          { id: 'b2', symbol: 'k', type: 'variable', emoji: '🍐', label: '2k (2 Körte)', coefficient: 2 },
          { id: 'b3', symbol: 'a', type: 'variable', emoji: '🍎', label: '1a (1 Alma)', coefficient: 1 },
        ]
      }
    ],
    expectedAction: 'combine',
    targetCheck: (clouds) => {
      const c = clouds[0];
      if (!c || c.items.length !== 2) return false;
      const a = c.items.find(i => i.symbol === 'a')?.coefficient || 0;
      const k = c.items.find(i => i.symbol === 'k')?.coefficient || 0;
      return a === 4 && k === 2;
    },
    hint: '3a + 1a = 4a, és 2k marad. Vond össze!',
    successMessage: 'Látod? 3a + a = 4a! A betűs kifejezés pontosan ugyanaz, mint 3 alma + 1 alma!',
  },
  {
    id: 5,
    title: '5. Küldetés: Egynemű Algebrai Tagok Összevonása',
    subtitle: 'Tiszta algebrai változók (x, y) és konstans számok',
    badge: '5. Szint: Absztrakt Algebra',
    story: 'Most már elhagyhatjuk az emojikat! A felhőben x, y és konstans számok vannak: 2x + 5y + 3x + 4 + 2y + 6.',
    instruction: 'Vond össze az egynemű tagokat (az x-eket az x-ekkel, az y-okat az y-okkal, a számokat a számokkal)!',
    category: 'vehicles',
    repMode: 'abstract',
    clouds: [
      {
        id: 'cloud-1',
        title: 'Algebrai Kifejezés',
        multiplier: 1,
        colorTheme: 'blue',
        items: [
          { id: 'x1', symbol: 'x', type: 'variable', coefficient: 2 },
          { id: 'y1', symbol: 'y', type: 'variable', coefficient: 5 },
          { id: 'x2', symbol: 'x', type: 'variable', coefficient: 3 },
          { id: 'c1', symbol: '1', type: 'constant', coefficient: 4 },
          { id: 'y2', symbol: 'y', type: 'variable', coefficient: 2 },
          { id: 'c2', symbol: '1', type: 'constant', coefficient: 6 },
        ]
      }
    ],
    expectedAction: 'combine',
    targetCheck: (clouds) => {
      const c = clouds[0];
      if (!c || c.items.length !== 3) return false;
      const x = c.items.find(i => i.symbol === 'x')?.coefficient || 0;
      const y = c.items.find(i => i.symbol === 'y')?.coefficient || 0;
      const cVal = c.items.find(i => i.symbol === '1')?.coefficient || 0;
      return x === 5 && y === 7 && cVal === 10;
    },
    hint: '2x + 3x = 5x; 5y + 2y = 7y; 4 + 6 = 10. Eredmény: 5x + 7y + 10.',
    successMessage: 'Tökéletes algebrai összevonás! 5x + 7y + 10 a legegyszerűbb alak.',
  },
  {
    id: 6,
    title: '6. Küldetés: Pozitív és Negatív Erők (Nullapárok!)',
    subtitle: 'Előjeles tagok és semlegesítés (+x és -x kiejtése)',
    badge: '6. Szint: Előjeles Tagok',
    story: 'Egy +x és egy -x találkozásakor kioltják egymást (mint az anyag és az antianyag)! Ezt nevezzük Nullapárnak: +x + (-x) = 0.',
    instruction: 'Vond össze a felhőt, és nézd meg, hogyan semlegesítik egymást a pozitív és negatív tagok: 4x - 2x + 3 - 5!',
    category: 'treasures',
    repMode: 'signed',
    clouds: [
      {
        id: 'cloud-1',
        title: 'Előjeles Felhő',
        multiplier: 1,
        colorTheme: 'purple',
        items: [
          { id: 'px1', symbol: 'x', type: 'variable', coefficient: 4 },
          { id: 'nx1', symbol: 'x', type: 'variable', coefficient: -2 },
          { id: 'pc1', symbol: '1', type: 'constant', coefficient: 3 },
          { id: 'nc1', symbol: '1', type: 'constant', coefficient: -5 },
        ]
      }
    ],
    expectedAction: 'zero_pairs',
    targetCheck: (clouds) => {
      const c = clouds[0];
      if (!c || c.items.length !== 2) return false;
      const x = c.items.find(i => i.symbol === 'x')?.coefficient || 0;
      const cVal = c.items.find(i => i.symbol === '1')?.coefficient || 0;
      return x === 2 && cVal === -2;
    },
    hint: '4x + (-2x) = 2x, és 3 + (-5) = -2. Eredmény: 2x - 2.',
    successMessage: 'Bravó! 4x - 2x = 2x, és 3 - 5 = -2. A nullapárok egyszerűsítették a kifejezést!',
  },
  {
    id: 7,
    title: '7. Küldetés: Zárójelbontó Varázslat 2·(y + c)',
    subtitle: 'Külső szorzó beszorzása a felhő belső tagjaival',
    badge: '7. Szint: Zárójelfelbontás',
    story: 'Ha a felhő előtt egy "2·" szorzó van, az azt jelenti: 2 db ilyen felhőnk van! Beszorzáskor minden belső tagot megduplázunk: 2 · (3x + 4y) = 6x + 8y.',
    instruction: 'Kattints a "🔓 Zárójel felbontása" gombra a felhőnél!',
    category: 'vehicles',
    repMode: 'abstract',
    clouds: [
      {
        id: 'cloud-1',
        title: '2·(3x + 4y) Zárójeles Felhő',
        multiplier: 2,
        colorTheme: 'indigo',
        items: [
          { id: 'x1', symbol: 'x', type: 'variable', coefficient: 3 },
          { id: 'y1', symbol: 'y', type: 'variable', coefficient: 4 },
        ]
      }
    ],
    expectedAction: 'expand',
    targetCheck: (clouds) => {
      const c = clouds[0];
      if (!c || c.multiplier !== 1) return false;
      const x = c.items.find(i => i.symbol === 'x')?.coefficient || 0;
      const y = c.items.find(i => i.symbol === 'y')?.coefficient || 0;
      return x === 6 && y === 8;
    },
    hint: 'Kattints a "🔓 Zárójel felbontása" gombra! 2 · 3x = 6x, 2 · 4y = 8y.',
    successMessage: 'Varázslatos! 2 · (3x + 4y) = 6x + 8y! A zárójel elé írt szorzó minden belső tagot megszoroz.',
  },
  {
    id: 8,
    title: '8. Küldetés: Kiemelés Mesterfokon (4a + 6b = ?)',
    subtitle: 'Közös tényező keresése és kiemelése zárójel elé',
    badge: '8. Szint: Kiemelés',
    story: 'A kiemelés a zárójelfelbontás megfordítása! Ha a felhőben 4a + 6b van, észrevehetjük, hogy mindkét szám osztható 2-vel (LNKO = 2). A 2-t kiemelve: 2 · (2a + 3b).',
    instruction: 'Kattints a "📦 Közös tényező kiemelése" gombra a felhőnél!',
    category: 'fruits',
    repMode: 'bridge',
    clouds: [
      {
        id: 'cloud-1',
        title: 'Kiemelendő Felhő',
        multiplier: 1,
        colorTheme: 'violet',
        items: [
          { id: 'a1', symbol: 'a', type: 'variable', emoji: '🍎', label: '4a', coefficient: 4 },
          { id: 'b1', symbol: 'b', type: 'variable', emoji: '🍌', label: '6b', coefficient: 6 },
        ]
      }
    ],
    expectedAction: 'factor',
    targetCheck: (clouds) => {
      const c = clouds[0];
      if (!c || c.multiplier !== 2) return false;
      const a = c.items.find(i => i.symbol === 'a')?.coefficient || 0;
      const b = c.items.find(i => i.symbol === 'b')?.coefficient || 0;
      return a === 2 && b === 3;
    },
    hint: 'Kattints a "📦 Kiemelés" gombra! A 4 és 6 legnagyobb közös osztója a 2.',
    successMessage: 'Fantasztikus! 4a + 6b = 2·(2a + 3b)! Ezzel elérted az algebrai mesterszintet!',
  }
];

// Practice Challenges
export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  {
    id: 'ch-1',
    level: 'easy',
    type: 'combine',
    title: 'Gyümölcskosár összevonása',
    question: 'Vond össze a felhőben lévő almákat és körtéket a legegyszerűbb alakra!',
    category: 'fruits',
    repMode: 'concrete',
    initialClouds: [
      {
        id: 'ch-c1',
        title: '1. Felhő',
        multiplier: 1,
        colorTheme: 'red',
        items: [
          { id: 'i1', symbol: 'a', type: 'variable', emoji: '🍎', coefficient: 2 },
          { id: 'i2', symbol: 'k', type: 'variable', emoji: '🍐', coefficient: 3 },
          { id: 'i3', symbol: 'a', type: 'variable', emoji: '🍎', coefficient: 4 },
          { id: 'i4', symbol: 'k', type: 'variable', emoji: '🍐', coefficient: 1 },
        ]
      }
    ],
    expectedExpr: '6🍎 + 4🍐',
    checkAnswer: (clouds) => {
      const c = clouds[0];
      if (!c || c.items.length !== 2) return false;
      const a = c.items.find(i => i.symbol === 'a')?.coefficient || 0;
      const k = c.items.find(i => i.symbol === 'k')?.coefficient || 0;
      return a === 6 && k === 4;
    },
    hint: 'Számold össze az almákat: 2 + 4 = 6🍎, és a körtéket: 3 + 1 = 4🍐.',
    explanation: '2🍎 + 3🍐 + 4🍎 + 1🍐 = (2+4)🍎 + (3+1)🍐 = 6🍎 + 4🍐'
  },
  {
    id: 'ch-2',
    level: 'medium',
    type: 'combine',
    title: 'Algebrai tagok összevonása',
    question: 'Végezd el az egynemű tagok összevonását: 5x + 3y + 2x + 7 + 4y - 3',
    category: 'vehicles',
    repMode: 'signed',
    initialClouds: [
      {
        id: 'ch-c2',
        title: 'Algebra Felhő',
        multiplier: 1,
        colorTheme: 'blue',
        items: [
          { id: 'i1', symbol: 'x', type: 'variable', coefficient: 5 },
          { id: 'i2', symbol: 'y', type: 'variable', coefficient: 3 },
          { id: 'i3', symbol: 'x', type: 'variable', coefficient: 2 },
          { id: 'i4', symbol: '1', type: 'constant', coefficient: 7 },
          { id: 'i5', symbol: 'y', type: 'variable', coefficient: 4 },
          { id: 'i6', symbol: '1', type: 'constant', coefficient: -3 },
        ]
      }
    ],
    expectedExpr: '7x + 7y + 4',
    checkAnswer: (clouds) => {
      const c = clouds[0];
      if (!c || c.items.length !== 3) return false;
      const x = c.items.find(i => i.symbol === 'x')?.coefficient || 0;
      const y = c.items.find(i => i.symbol === 'y')?.coefficient || 0;
      const cVal = c.items.find(i => i.symbol === '1')?.coefficient || 0;
      return x === 7 && y === 7 && cVal === 4;
    },
    hint: 'x tagok: 5x + 2x = 7x; y tagok: 3y + 4y = 7y; számok: 7 - 3 = 4.',
    explanation: '(5+2)x + (3+4)y + (7-3) = 7x + 7y + 4'
  },
  {
    id: 'ch-3',
    level: 'medium',
    type: 'expand',
    title: 'Zárójel felbontása szorzással',
    question: 'Bontsd fel a zárójelet: 3 · (4x - 2y + 5)',
    category: 'vehicles',
    repMode: 'signed',
    initialClouds: [
      {
        id: 'ch-c3',
        title: '3·(4x - 2y + 5)',
        multiplier: 3,
        colorTheme: 'indigo',
        items: [
          { id: 'i1', symbol: 'x', type: 'variable', coefficient: 4 },
          { id: 'i2', symbol: 'y', type: 'variable', coefficient: -2 },
          { id: 'i3', symbol: '1', type: 'constant', coefficient: 5 },
        ]
      }
    ],
    expectedExpr: '12x - 6y + 15',
    checkAnswer: (clouds) => {
      const c = clouds[0];
      if (!c || c.multiplier !== 1) return false;
      const x = c.items.find(i => i.symbol === 'x')?.coefficient || 0;
      const y = c.items.find(i => i.symbol === 'y')?.coefficient || 0;
      const cVal = c.items.find(i => i.symbol === '1')?.coefficient || 0;
      return x === 12 && y === -6 && cVal === 15;
    },
    hint: 'Szorozd meg mindhárom tagot 3-mal: 3·4x = 12x, 3·(-2y) = -6y, 3·5 = 15.',
    explanation: '3 · 4x + 3 · (-2y) + 3 · 5 = 12x - 6y + 15'
  },
  {
    id: 'ch-4',
    level: 'hard',
    type: 'factor',
    title: 'Közös szorzó kiemelése',
    question: 'Kiemeléssel alakítsd szorzattá a kifejezést: 6a + 9b - 12',
    category: 'fruits',
    repMode: 'signed',
    initialClouds: [
      {
        id: 'ch-c4',
        title: '6a + 9b - 12',
        multiplier: 1,
        colorTheme: 'purple',
        items: [
          { id: 'i1', symbol: 'a', type: 'variable', coefficient: 6 },
          { id: 'i2', symbol: 'b', type: 'variable', coefficient: 9 },
          { id: 'i3', symbol: '1', type: 'constant', coefficient: -12 },
        ]
      }
    ],
    expectedExpr: '3 · (2a + 3b - 4)',
    checkAnswer: (clouds) => {
      const c = clouds[0];
      if (!c || c.multiplier !== 3) return false;
      const a = c.items.find(i => i.symbol === 'a')?.coefficient || 0;
      const b = c.items.find(i => i.symbol === 'b')?.coefficient || 0;
      const cVal = c.items.find(i => i.symbol === '1')?.coefficient || 0;
      return a === 2 && b === 3 && cVal === -4;
    },
    hint: 'A 6, 9 és 12 legnagyobb közös osztója a 3. Emelj ki 3-at!',
    explanation: 'LNKO(6, 9, 12) = 3. Tehát: 3 · (6/3 a + 9/3 b - 12/3) = 3 · (2a + 3b - 4)'
  }
];
