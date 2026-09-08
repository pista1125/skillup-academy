import { describe, it, expect } from 'vitest';
import {
  CasioEvaluator,
  CasioMemory,
  decimalToFraction,
  decimalToDms,
  calculate1VarStats,
  generateTable,
  factorial,
  permutations,
  combinations
} from './casioEvaluator';

const createMemory = (overrides?: Partial<CasioMemory>): CasioMemory => ({
  Ans: 0,
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  X: 0,
  Y: 0,
  M: 0,
  ...overrides,
});

describe('CasioEvaluator', () => {
  it('evaluates basic arithmetic and operator precedence', () => {
    const memory = createMemory();
    const evaluator = new CasioEvaluator(memory, 'DEG');

    expect(evaluator.evaluate('2 + 3 * 4')).toBe(14);
    expect(evaluator.evaluate('(2 + 3) * 4')).toBe(20);
    expect(evaluator.evaluate('10 - 2^3')).toBe(2);
    expect(evaluator.evaluate('100 / 4 / 5')).toBe(5);
    expect(evaluator.evaluate('50%')).toBe(0.5);
    expect(evaluator.evaluate('200 * 15%')).toBe(30);
  });

  it('evaluates implicit multiplications correctly', () => {
    const memory = createMemory({ A: 5, Ans: 10 });
    const evaluator = new CasioEvaluator(memory, 'DEG');

    expect(evaluator.evaluate('2(3 + 4)')).toBe(14);
    expect(evaluator.evaluate('(2 + 3)(4 + 5)')).toBe(45);
    expect(evaluator.evaluate('2A')).toBe(10);
    expect(evaluator.evaluate('3Ans')).toBe(30);
    expect(evaluator.evaluate('2sin(30)')).toBeCloseTo(1);
  });

  it('evaluates trigonometric functions with angle modes', () => {
    const memory = createMemory();
    const degEval = new CasioEvaluator(memory, 'DEG');
    const radEval = new CasioEvaluator(memory, 'RAD');

    expect(degEval.evaluate('sin(30)')).toBeCloseTo(0.5);
    expect(degEval.evaluate('cos(60)')).toBeCloseTo(0.5);
    expect(degEval.evaluate('tan(45)')).toBeCloseTo(1);
    expect(degEval.evaluate('sin⁻¹(0.5)')).toBeCloseTo(30);
    expect(degEval.evaluate('cos⁻¹(0.5)')).toBeCloseTo(60);
    expect(degEval.evaluate('tan⁻¹(1)')).toBeCloseTo(45);

    expect(radEval.evaluate('sin(π / 2)')).toBeCloseTo(1);
    expect(radEval.evaluate('cos(π)')).toBeCloseTo(-1);
  });

  it('evaluates logarithms, roots, and powers', () => {
    const memory = createMemory();
    const evaluator = new CasioEvaluator(memory, 'DEG');

    expect(evaluator.evaluate('log(1000)')).toBe(3);
    expect(evaluator.evaluate('ln(e)')).toBeCloseTo(1);
    expect(evaluator.evaluate('√(144)')).toBe(12);
    expect(evaluator.evaluate('∛(27)')).toBe(3);
    expect(evaluator.evaluate('2^5')).toBe(32);
    expect(evaluator.evaluate('4^(-1)')).toBe(0.25);
  });

  it('evaluates combinatorics', () => {
    const memory = createMemory();
    const evaluator = new CasioEvaluator(memory, 'DEG');

    expect(factorial(5)).toBe(120);
    expect(permutations(5, 2)).toBe(20);
    expect(combinations(5, 2)).toBe(10);

    expect(evaluator.evaluate('5!')).toBe(120);
    expect(evaluator.evaluate('5 nPr 2')).toBe(20);
    expect(evaluator.evaluate('5 nCr 2')).toBe(10);
  });

  it('handles fractions and conversions', () => {
    expect(decimalToFraction(0.75)).toEqual({ num: 3, den: 4 });
    expect(decimalToFraction(0.3333333333)).toEqual({ num: 1, den: 3 });
    expect(decimalToFraction(2.5)).toEqual({ num: 5, den: 2 });
    expect(decimalToDms(12.5)).toBe('12°30′0″');
  });

  it('calculates 1-variable statistics correctly', () => {
    const data = [10, 12, 14, 16, 18];
    const stats = calculate1VarStats(data);

    expect(stats.n).toBe(5);
    expect(stats.mean).toBe(14);
    expect(stats.sumX).toBe(70);
    expect(stats.sumX2).toBe(1020);
    expect(stats.median).toBe(14);
    expect(stats.min).toBe(10);
    expect(stats.max).toBe(18);
  });

  it('generates function value table correctly', () => {
    const memory = createMemory();
    const rows = generateTable('2*X + 1', 0, 4, 1, memory, 'DEG');

    expect(rows.length).toBe(5);
    expect(rows[0]).toEqual({ stepIndex: 1, x: 0, fx: 1 });
    expect(rows[2]).toEqual({ stepIndex: 3, x: 2, fx: 5 });
    expect(rows[4]).toEqual({ stepIndex: 5, x: 4, fx: 9 });
  });
});
