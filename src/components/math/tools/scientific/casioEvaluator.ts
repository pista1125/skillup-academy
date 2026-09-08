/**
 * Casio fx-82ES Plus Natural-V.P.A.M. Mathematical Evaluator Engine
 */

export type AngleMode = 'DEG' | 'RAD' | 'GRA';

export interface CasioMemory {
  Ans: number;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  X: number;
  Y: number;
  M: number;
}

export interface CalculationHistoryItem {
  id: string;
  expression: string;
  displayExpression: string;
  result: number;
  displayResult: string;
  fractionResult?: string;
  timestamp: number;
  angleMode: AngleMode;
}

export interface StatResult {
  n: number;
  mean: number;
  sumX: number;
  sumX2: number;
  sampleStdDev: number; // s or sx
  popStdDev: number; // sigma x
  min: number;
  max: number;
  median: number;
  q1: number;
  q3: number;
}

export interface TableRow {
  stepIndex: number;
  x: number;
  fx: number | null;
  error?: string;
}

// Greatest Common Divisor
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b > 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Convert decimal to exact fraction (if close to rational)
export function decimalToFraction(val: number, maxDenominator = 10000): { num: number; den: number } | null {
  if (!Number.isFinite(val) || Math.abs(val) > 1e12) return null;
  if (Math.abs(val - Math.round(val)) < 1e-10) {
    return { num: Math.round(val), den: 1 };
  }

  const sign = val < 0 ? -1 : 1;
  val = Math.abs(val);

  let bestNumerator = 1;
  let bestDenominator = 1;
  let bestError = Math.abs(val - 1);

  // Continued fraction expansion
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = val;

  for (let i = 0; i < 30; i++) {
    const a = Math.floor(b);
    const auxH = a * h1 + h2;
    const auxK = a * k1 + k2;

    if (auxK > maxDenominator) break;

    h2 = h1;
    h1 = auxH;
    k2 = k1;
    k1 = auxK;

    const currentVal = h1 / k1;
    const error = Math.abs(val - currentVal);
    if (error < bestError) {
      bestNumerator = h1;
      bestDenominator = k1;
      bestError = error;
    }

    if (error < 1e-9) break;
    if (Math.abs(b - a) < 1e-12) break;
    b = 1 / (b - a);
  }

  if (bestError < 1e-7 && bestDenominator <= maxDenominator) {
    const d = gcd(bestNumerator, bestDenominator);
    return {
      num: sign * (bestNumerator / d),
      den: bestDenominator / d,
    };
  }

  return null;
}

// Format number in Casio style
export function formatCasioNumber(val: number, maxDigits = 10): string {
  if (isNaN(val)) return 'Math ERROR';
  if (!isFinite(val)) return val > 0 ? 'Infinity' : '-Infinity';
  if (Object.is(val, -0)) return '0';

  // Floating point precision cleanup
  const rounded = Number(val.toPrecision(12));
  if (Math.abs(rounded) < 1e-12 && rounded !== 0) return '0';

  // Check integer
  if (Number.isInteger(rounded) && Math.abs(rounded) < 1e10) {
    return rounded.toString();
  }

  // Scientific notation for very large/small
  if (Math.abs(rounded) >= 1e10 || (Math.abs(rounded) < 1e-4 && Math.abs(rounded) > 0)) {
    const expStr = rounded.toExponential(6);
    const [mantissa, exponent] = expStr.split('e');
    const cleanMantissa = parseFloat(mantissa).toString();
    const expNum = parseInt(exponent, 10);
    return `${cleanMantissa}×10^(${expNum})`;
  }

  // Standard float
  let str = rounded.toFixed(8);
  str = str.replace(/\.?0+$/, '');
  return str;
}

// Factorial n!
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error('Math ERROR');
  if (n > 170) throw new Error('Math ERROR'); // overflow
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// Permutations nPr = n! / (n-r)!
export function permutations(n: number, r: number): number {
  n = Math.round(n);
  r = Math.round(r);
  if (n < 0 || r < 0 || r > n) throw new Error('Math ERROR');
  let res = 1;
  for (let i = 0; i < r; i++) {
    res *= (n - i);
  }
  return res;
}

// Combinations nCr = n! / (r! * (n-r)!)
export function combinations(n: number, r: number): number {
  n = Math.round(n);
  r = Math.round(r);
  if (n < 0 || r < 0 || r > n) throw new Error('Math ERROR');
  if (r === 0 || r === n) return 1;
  if (r > n / 2) r = n - r;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = (res * (n - i + 1)) / i;
  }
  return Math.round(res);
}

// Degrees-Minutes-Seconds convert to decimal
export function dmsToDecimal(deg: number, min = 0, sec = 0): number {
  return deg + min / 60 + sec / 3600;
}

// Decimal to DMS format string
export function decimalToDms(val: number): string {
  const sign = val < 0 ? '-' : '';
  val = Math.abs(val);
  const d = Math.floor(val);
  const remainderM = (val - d) * 60;
  const m = Math.floor(remainderM);
  const s = ((remainderM - m) * 60);
  return `${sign}${d}°${m}′${s.toFixed(2).replace(/\.?0+$/, '')}″`;
}

// Polar to Rectangular
export function polToRec(r: number, theta: number, angleMode: AngleMode): { x: number; y: number } {
  const rad = angleToRad(theta, angleMode);
  return {
    x: r * Math.cos(rad),
    y: r * Math.sin(rad),
  };
}

// Rectangular to Polar
export function recToPol(x: number, y: number, angleMode: AngleMode): { r: number; theta: number } {
  const r = Math.hypot(x, y);
  let thetaRad = Math.atan2(y, x);
  let theta = radToAngle(thetaRad, angleMode);
  return { r, theta };
}

export function angleToRad(val: number, mode: AngleMode): number {
  switch (mode) {
    case 'DEG': return (val * Math.PI) / 180;
    case 'GRA': return (val * Math.PI) / 200;
    case 'RAD': return val;
  }
}

export function radToAngle(val: number, mode: AngleMode): number {
  switch (mode) {
    case 'DEG': return (val * 180) / Math.PI;
    case 'GRA': return (val * 200) / Math.PI;
    case 'RAD': return val;
  }
}

/**
 * Tokenizer & Recursive Descent Parser for Casio expressions
 */
export class CasioEvaluator {
  private pos = 0;
  private str = '';
  private angleMode: AngleMode;
  private memory: CasioMemory;

  constructor(memory: CasioMemory, angleMode: AngleMode = 'DEG') {
    this.memory = memory;
    this.angleMode = angleMode;
  }

  public evaluate(rawExpr: string): number {
    const prepared = this.preprocess(rawExpr);
    this.str = prepared;
    this.pos = 0;

    const result = this.parseExpression();
    this.skipWhitespace();
    if (this.pos < this.str.length) {
      throw new Error('Syntax ERROR');
    }

    if (!Number.isFinite(result)) {
      throw new Error('Math ERROR');
    }

    // Clean up slight floating point noise (e.g. sin(180) = 1.22e-16 -> 0)
    if (Math.abs(result) < 1e-14) return 0;
    return result;
  }

  private preprocess(expr: string): string {
    let s = expr.trim();
    if (!s) return '0';

    // Replace display symbols
    s = s.replace(/×/g, '*');
    s = s.replace(/÷/g, '/');
    s = s.replace(/−/g, '-');
    s = s.replace(/π/g, `(${Math.PI})`);

    // Implicit multiplications:
    // e.g. 2sin( -> 2*sin(
    // 5( -> 5*(
    // )3 -> )*3
    // )( -> )*(
    // 2sqrt -> 2*sqrt
    // 2Ans -> 2*Ans
    // 2A -> 2*A
    s = s.replace(/(\d|\))\s*(\(|sin|cos|tan|asin|acos|atan|sinh|cosh|tanh|asinh|acosh|atanh|ln|log|sqrt|cbrt|Ans|[A-FX-Z])/g, '$1*$2');
    s = s.replace(/(\))\s*(\d)/g, '$1*$2');

    return s;
  }

  private peek(): string {
    return this.pos < this.str.length ? this.str[this.pos] : '';
  }

  private next(): string {
    return this.str[this.pos++];
  }

  private skipWhitespace() {
    while (this.pos < this.str.length && /\s/.test(this.str[this.pos])) {
      this.pos++;
    }
  }

  private match(pattern: string): boolean {
    this.skipWhitespace();
    if (this.str.slice(this.pos, this.pos + pattern.length) === pattern) {
      this.pos += pattern.length;
      return true;
    }
    return false;
  }

  private parseExpression(): number {
    return this.parseAddSub();
  }

  private parseAddSub(): number {
    let left = this.parseMulDiv();
    while (true) {
      this.skipWhitespace();
      if (this.match('+')) {
        left += this.parseMulDiv();
      } else if (this.match('-')) {
        left -= this.parseMulDiv();
      } else {
        break;
      }
    }
    return left;
  }

  private parseMulDiv(): number {
    let left = this.parsePower();
    while (true) {
      this.skipWhitespace();
      if (this.match('*')) {
        left *= this.parsePower();
      } else if (this.match('/')) {
        const right = this.parsePower();
        if (Math.abs(right) < 1e-15) throw new Error('Math ERROR');
        left /= right;
      } else if (this.match('%')) {
        left = left / 100;
      } else if (this.match('nPr') || this.match('P')) {
        const right = this.parsePower();
        left = permutations(left, right);
      } else if (this.match('nCr') || this.match('C')) {
        const right = this.parsePower();
        left = combinations(left, right);
      } else {
        break;
      }
    }
    return left;
  }

  private parsePower(): number {
    let left = this.parseUnary();
    this.skipWhitespace();
    if (this.match('^')) {
      const right = this.parsePower(); // Right-associative
      const res = Math.pow(left, right);
      if (isNaN(res)) throw new Error('Math ERROR');
      return res;
    }
    if (this.match('!')) {
      return factorial(left);
    }
    return left;
  }

  private parseUnary(): number {
    this.skipWhitespace();
    if (this.match('+')) {
      return this.parseUnary();
    }
    if (this.match('-')) {
      return -this.parseUnary();
    }
    return this.parsePrimary();
  }

  private parsePrimary(): number {
    this.skipWhitespace();

    // Grouping: ( expr )
    if (this.match('(')) {
      const val = this.parseExpression();
      this.skipWhitespace();
      if (this.match(')')) {
        // Closed properly
      }
      return val;
    }

    // Mathematical Functions
    if (this.match('sin⁻¹(') || this.match('asin(') || this.match('arcsin(')) {
      const arg = this.parseExpression();
      this.match(')');
      if (arg < -1 || arg > 1) throw new Error('Math ERROR');
      return radToAngle(Math.asin(arg), this.angleMode);
    }
    if (this.match('cos⁻¹(') || this.match('acos(') || this.match('arccos(')) {
      const arg = this.parseExpression();
      this.match(')');
      if (arg < -1 || arg > 1) throw new Error('Math ERROR');
      return radToAngle(Math.acos(arg), this.angleMode);
    }
    if (this.match('tan⁻¹(') || this.match('atan(') || this.match('arctan(')) {
      const arg = this.parseExpression();
      this.match(')');
      return radToAngle(Math.atan(arg), this.angleMode);
    }
    if (this.match('sinh⁻¹(') || this.match('asinh(')) {
      const arg = this.parseExpression();
      this.match(')');
      return Math.asinh(arg);
    }
    if (this.match('cosh⁻¹(') || this.match('acosh(')) {
      const arg = this.parseExpression();
      this.match(')');
      if (arg < 1) throw new Error('Math ERROR');
      return Math.acosh(arg);
    }
    if (this.match('tanh⁻¹(') || this.match('atanh(')) {
      const arg = this.parseExpression();
      this.match(')');
      if (Math.abs(arg) >= 1) throw new Error('Math ERROR');
      return Math.atanh(arg);
    }
    if (this.match('sinh(')) {
      const arg = this.parseExpression();
      this.match(')');
      return Math.sinh(arg);
    }
    if (this.match('cosh(')) {
      const arg = this.parseExpression();
      this.match(')');
      return Math.cosh(arg);
    }
    if (this.match('tanh(')) {
      const arg = this.parseExpression();
      this.match(')');
      return Math.tanh(arg);
    }
    if (this.match('sin(')) {
      const arg = this.parseExpression();
      this.match(')');
      const rad = angleToRad(arg, this.angleMode);
      return Math.sin(rad);
    }
    if (this.match('cos(')) {
      const arg = this.parseExpression();
      this.match(')');
      const rad = angleToRad(arg, this.angleMode);
      return Math.cos(rad);
    }
    if (this.match('tan(')) {
      const arg = this.parseExpression();
      this.match(')');
      const rad = angleToRad(arg, this.angleMode);
      // Tan 90 deg singularity
      if (Math.abs(Math.cos(rad)) < 1e-12) throw new Error('Math ERROR');
      return Math.tan(rad);
    }
    if (this.match('ln(')) {
      const arg = this.parseExpression();
      this.match(')');
      if (arg <= 0) throw new Error('Math ERROR');
      return Math.log(arg);
    }
    if (this.match('log(') || this.match('log10(')) {
      const arg = this.parseExpression();
      this.match(')');
      if (arg <= 0) throw new Error('Math ERROR');
      return Math.log10(arg);
    }
    if (this.match('sqrt(') || this.match('√(')) {
      const arg = this.parseExpression();
      this.match(')');
      if (arg < 0) throw new Error('Math ERROR');
      return Math.sqrt(arg);
    }
    if (this.match('sqrt') || this.match('√')) {
      const arg = this.parseUnary();
      if (arg < 0) throw new Error('Math ERROR');
      return Math.sqrt(arg);
    }
    if (this.match('cbrt(') || this.match('∛(')) {
      const arg = this.parseExpression();
      this.match(')');
      return Math.cbrt(arg);
    }
    if (this.match('cbrt') || this.match('∛')) {
      const arg = this.parseUnary();
      return Math.cbrt(arg);
    }
    if (this.match('abs(')) {
      const arg = this.parseExpression();
      this.match(')');
      return Math.abs(arg);
    }
    if (this.match('Pol(')) {
      const x = this.parseExpression();
      this.match(',');
      const y = this.parseExpression();
      this.match(')');
      const pol = recToPol(x, y, this.angleMode);
      this.memory.X = pol.r;
      this.memory.Y = pol.theta;
      return pol.r;
    }
    if (this.match('Rec(')) {
      const r = this.parseExpression();
      this.match(',');
      const theta = this.parseExpression();
      this.match(')');
      const rec = polToRec(r, theta, this.angleMode);
      this.memory.X = rec.x;
      this.memory.Y = rec.y;
      return rec.x;
    }
    if (this.match('Ran#') || this.match('Ran')) {
      return Math.random();
    }
    if (this.match('RanInt#(') || this.match('RanInt(')) {
      const a = this.parseExpression();
      this.match(',');
      const b = this.parseExpression();
      this.match(')');
      const min = Math.min(a, b);
      const max = Math.max(a, b);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Constants & Variables
    if (this.match('π') || this.match('PI')) {
      return Math.PI;
    }
    if (this.match('e') && !/[a-zA-Z]/.test(this.peek())) {
      return Math.E;
    }
    if (this.match('Ans')) {
      return this.memory.Ans;
    }

    // Check Memory Variables: A, B, C, D, E, F, X, Y, M
    const memoryVars: (keyof CasioMemory)[] = ['A', 'B', 'C', 'D', 'E', 'F', 'X', 'Y', 'M'];
    for (const v of memoryVars) {
      if (this.match(v) && !/[a-zA-Z]/.test(this.peek())) {
        return this.memory[v];
      }
    }

    // Number literal (integers, decimals, and scientific 1e5 / 10^x)
    return this.parseNumber();
  }

  private parseNumber(): number {
    this.skipWhitespace();
    const start = this.pos;

    while (this.pos < this.str.length && /[0-9.]/.test(this.str[this.pos])) {
      this.pos++;
    }

    // Scientific notation e.g. 1.23E4 or 1.23e4
    if (this.pos < this.str.length && (this.str[this.pos] === 'E' || this.str[this.pos] === 'e')) {
      if (/[0-9+\-]/.test(this.str[this.pos + 1])) {
        this.pos++;
        if (this.str[this.pos] === '+' || this.str[this.pos] === '-') {
          this.pos++;
        }
        while (this.pos < this.str.length && /[0-9]/.test(this.str[this.pos])) {
          this.pos++;
        }
      }
    }

    const numStr = this.str.slice(start, this.pos);
    if (numStr === '' || numStr === '.') {
      throw new Error('Syntax ERROR');
    }

    const val = Number(numStr);
    if (isNaN(val)) throw new Error('Syntax ERROR');
    return val;
  }
}

/**
 * 1-Variable Statistics Calculator
 */
export function calculate1VarStats(data: number[]): StatResult {
  if (data.length === 0) {
    throw new Error('Nincsenek megadott adatok.');
  }

  const n = data.length;
  let sumX = 0;
  let sumX2 = 0;

  for (const x of data) {
    sumX += x;
    sumX2 += x * x;
  }

  const mean = sumX / n;

  // Population variance and standard deviation
  const popVariance = data.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / n;
  const popStdDev = Math.sqrt(popVariance);

  // Sample variance and standard deviation (s)
  const sampleVariance = n > 1 ? data.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / (n - 1) : 0;
  const sampleStdDev = Math.sqrt(sampleVariance);

  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const getMedian = (arr: number[]): number => {
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
  };

  const median = getMedian(sorted);

  const mid = Math.floor(sorted.length / 2);
  const lowerHalf = sorted.slice(0, mid);
  const upperHalf = sorted.length % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);

  const q1 = lowerHalf.length > 0 ? getMedian(lowerHalf) : min;
  const q3 = upperHalf.length > 0 ? getMedian(upperHalf) : max;

  return {
    n,
    mean,
    sumX,
    sumX2,
    sampleStdDev,
    popStdDev,
    min,
    max,
    median,
    q1,
    q3,
  };
}

/**
 * Generate Function Value Table for TABLE mode: f(x) from Start to End by Step
 */
export function generateTable(
  formula: string,
  start: number,
  end: number,
  step: number,
  memory: CasioMemory,
  angleMode: AngleMode
): TableRow[] {
  if (step <= 0) throw new Error('A lépésköznek (Step) > 0-nak kell lennie');
  if (start > end) throw new Error('A Start érték nem lehet nagyobb, mint az End');
  if ((end - start) / step > 100) throw new Error('Túl sok táblázat-sor (maximum 100 engedélyezett)');

  const rows: TableRow[] = [];
  let index = 1;

  for (let x = start; x <= end + 1e-9; x += step) {
    const cleanX = Number(x.toPrecision(10));
    const memCopy: CasioMemory = { ...memory, X: cleanX };
    const evaluator = new CasioEvaluator(memCopy, angleMode);

    try {
      // Evaluate formula with x
      const fx = evaluator.evaluate(formula);
      rows.push({
        stepIndex: index++,
        x: cleanX,
        fx,
      });
    } catch (e: any) {
      rows.push({
        stepIndex: index++,
        x: cleanX,
        fx: null,
        error: e.message || 'Math ERROR',
      });
    }
  }

  return rows;
}
