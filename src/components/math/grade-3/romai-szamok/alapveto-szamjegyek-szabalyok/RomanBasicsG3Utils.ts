// Római szám segédfüggvények (1–100) – 1. lecke
export const SIGN_VALUE: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100 };

/** A jelek színe – minden ábrán és laborban ugyanaz. */
export const SIGN_COLOR: Record<string, string> = {
  I: '#2563eb',
  V: '#16a34a',
  X: '#ea580c',
  L: '#9333ea',
  C: '#dc2626'
};

const TENS = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', 'C'];
const ONES = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

/** Arab szám (1–100) → római szám. */
export const toRoman = (n: number): string => TENS[Math.floor(n / 10)] + ONES[n % 10];

/** Római szám értéke a szokásos szabállyal (kisebb jel a nagyobb előtt: elvesszük). */
export const romanValue = (s: string): number => {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const v = SIGN_VALUE[s[i]];
    const next = SIGN_VALUE[s[i + 1]] ?? 0;
    total += v < next ? -v : v;
  }
  return total;
};

/** Minden jelhez: hozzáadjuk (+) vagy elvesszük (−)? */
export const signOps = (s: string): { ch: string; v: number; minus: boolean }[] =>
  s.split('').map((ch, i) => {
    const v = SIGN_VALUE[ch];
    const next = SIGN_VALUE[s[i + 1]] ?? 0;
    return { ch, v, minus: v < next };
  });

/**
 * Megmondja, mi a baj egy jelsorral. null, ha helyes római szám 1 és 100 között.
 */
export const romanProblem = (s: string): string | null => {
  if (!s) return null;
  if (/(.)\1\1\1/.test(s)) return 'Négy egyforma jel nem állhat egymás mellett! Legfeljebb 3 lehet.';
  if (/VV/.test(s)) return 'A V-t nem írjuk kétszer egymás mellé. 5 + 5 = 10, ez az X.';
  if (/LL/.test(s)) return 'Az L-t nem írjuk kétszer egymás mellé. 50 + 50 = 100, ez a C.';
  if (/CC/.test(s)) return 'Most csak 100-ig dolgozunk.';
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i];
    const b = s[i + 1];
    if (SIGN_VALUE[a] < SIGN_VALUE[b]) {
      const pair = a + b;
      if (!['IV', 'IX', 'XL', 'XC'].includes(pair)) {
        if (a === 'I') return 'Az I-t csak a V és az X elé írhatjuk (IV, IX).';
        if (a === 'X') return 'Az X-et csak az L és a C elé írhatjuk (XL, XC).';
        return `A ${a}-t soha nem írjuk nagyobb jel elé, nem vonjuk el.`;
      }
    }
  }
  const v = romanValue(s);
  if (v > 100) return 'Ez több, mint 100. Most csak 100-ig dolgozunk.';
  if (v < 1) return 'Ez nem római szám.';
  if (toRoman(v) !== s) return `Ezt nem így írjuk. A ${v} helyesen: ${toRoman(v)}.`;
  return null;
};
