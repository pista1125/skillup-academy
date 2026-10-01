import { NumberLineMode, MagnitudeScale, FractionDisplayType, SignRuleInfo } from './types';

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num: 0, den: 1 };
  const sign = (num < 0 ? -1 : 1) * (den < 0 ? -1 : 1);
  const common = gcd(num, den);
  return {
    num: sign * (Math.abs(num) / common),
    den: Math.abs(den) / common
  };
}

export interface MixedFraction {
  whole: number;
  num: number;
  den: number;
  isNegative: boolean;
  isZero: boolean;
  isInteger: boolean;
}

export function toMixedFraction(num: number, den: number): MixedFraction {
  if (den === 0 || num === 0) {
    return { whole: 0, num: 0, den: 1, isNegative: false, isZero: true, isInteger: true };
  }

  const isNeg = (num < 0 && den > 0) || (num > 0 && den < 0);
  const absNum = Math.abs(num);
  const absDen = Math.abs(den);

  const whole = Math.floor(absNum / absDen);
  const rem = absNum % absDen;

  const common = gcd(rem, absDen);

  return {
    whole,
    num: rem / common,
    den: absDen / common,
    isNegative: isNeg,
    isZero: false,
    isInteger: rem === 0
  };
}

export function formatFractionText(
  num: number,
  den: number,
  mode: FractionDisplayType = 'fraction',
  allowSimplified: boolean = false
): string {
  if (den === 0) return '0';
  if (num === 0) return '0';

  if (allowSimplified) {
    const simp = simplifyFraction(num, den);
    if (simp.den === 1) return `${simp.num}`;
  }

  if (mode === 'mixed') {
    const mixed = toMixedFraction(num, den);
    if (mixed.isInteger) {
      return `${mixed.isNegative ? '-' : ''}${mixed.whole}`;
    }
    const signStr = mixed.isNegative ? '-' : '';
    if (mixed.whole === 0) {
      return `${signStr}${mixed.num}/${mixed.den}`;
    }
    return `${signStr}${mixed.whole} ${mixed.num}/${mixed.den}`;
  }

  // Pure fraction mode
  const isNeg = (num < 0 && den > 0) || (num > 0 && den < 0);
  const absNum = Math.abs(num);
  const absDen = Math.abs(den);
  if (absNum % absDen === 0) {
    return `${isNeg ? '-' : ''}${absNum / absDen}`;
  }
  return `${isNeg ? '-' : ''}${absNum}/${absDen}`;
}

/**
 * Computes pedagogical explanation of integer addition/subtraction.
 * e.g. -2 + (-3) => start: -2, op: '+', operand: -3
 */
export function computeSignRule(start: number, op: '+' | '-', operand: number): SignRuleInfo {
  let effectiveStep: number;
  let effectiveSign: '+' | '-';
  let direction: 'left' | 'right';
  let ruleSummary: string;
  let pedagogicalNote: string;

  if (op === '+') {
    if (operand >= 0) {
      effectiveStep = operand;
      effectiveSign = '+';
      direction = 'right';
      ruleSummary = `+ (+${operand}) = +${operand}`;
      pedagogicalNote = `Pozitív számot adunk hozzá, ezért a számegyenesen JOBBRA lépünk ${operand} egységet.`;
    } else {
      const absVal = Math.abs(operand);
      effectiveStep = -absVal;
      effectiveSign = '-';
      direction = 'left';
      ruleSummary = `+ (-${absVal}) = -${absVal}`;
      pedagogicalNote = `A plusz és a mínusz találkozásakor KIVONÁS keletkezik (+ és - együttesen mínusz), ezért BALRA lépünk ${absVal} egységet.`;
    }
  } else {
    // op === '-'
    if (operand >= 0) {
      effectiveStep = -operand;
      effectiveSign = '-';
      direction = 'left';
      ruleSummary = `- (+${operand}) = -${operand}`;
      pedagogicalNote = `Pozitív számot vonunk ki, a kivonás csökkenti az értéket, ezért BALRA lépünk ${operand} egységet.`;
    } else {
      const absVal = Math.abs(operand);
      effectiveStep = absVal;
      effectiveSign = '+';
      direction = 'right';
      ruleSummary = `- (-${absVal}) = +${absVal}`;
      pedagogicalNote = `Két negatív előjel találkozásakor (- és -) ÖSSZEADÁS keletkezik, a mínusz elvétele növeli az értéket, ezért JOBBRA lépünk ${absVal} egységet!`;
    }
  }

  const end = start + effectiveStep;
  const opDisplay = operand < 0 ? `(${operand})` : `${operand}`;
  const formulaDisplay = `${start} ${op} ${opDisplay} = ${start} ${effectiveSign} ${Math.abs(operand)} = ${end}`;

  return {
    start,
    op,
    operand,
    effectiveSign,
    effectiveStep,
    end,
    direction,
    ruleSummary,
    pedagogicalNote,
    formulaDisplay
  };
}

/**
 * Snap values to appropriate divisions based on mode and scale
 */
export function snapNumberLineValue(
  val: number,
  mode: NumberLineMode,
  denominator: number = 4,
  magnitude: MagnitudeScale = 1
): number {
  if (mode === 'fractions') {
    const safeDen = Math.max(1, Math.min(24, denominator));
    const step = 1 / safeDen;
    return Math.round(val / step) * step;
  }

  if (mode === 'magnitudes') {
    let step = 1;
    if (magnitude === 10) step = 1;
    else if (magnitude === 100) step = 10;
    else if (magnitude === 1000) step = 100;
    return Math.round(val / step) * step;
  }

  // Integer mode
  return Math.round(val);
}
