export type NumberLineMode = 'integers' | 'fractions' | 'magnitudes';

export type MagnitudeScale = 1 | 10 | 100 | 1000;

export type FractionDisplayType = 'fraction' | 'mixed';

export interface PointMarker {
  id: string;
  value: number;
  label?: string;
  color: string;
  isStart?: boolean;
  isResult?: boolean;
  fraction?: { num: number; den: number };
}

export interface NumberArrow {
  id: string;
  startValue: number;
  length: number; // Signed distance in units
  yLevel: number; // 1, 2, 3...
  color: string;
  label?: string;
  operationText?: string;
  effectiveStep?: number;
  fractionData?: {
    startNum: number;
    startDen: number;
    stepNum: number;
    stepDen: number;
    endNum: number;
    endDen: number;
  };
}

export interface SignRuleInfo {
  start: number;
  op: '+' | '-';
  operand: number;
  effectiveSign: '+' | '-';
  effectiveStep: number;
  end: number;
  direction: 'left' | 'right';
  ruleSummary: string;
  pedagogicalNote: string;
  formulaDisplay: string;
}

export interface PresetExample {
  id: string;
  category: NumberLineMode;
  badge: string;
  title: string;
  description: string;
  mode: NumberLineMode;
  start: number;
  op: '+' | '-';
  operand: number;
  denominator?: number;
  magnitude?: MagnitudeScale;
  fractionStart?: { num: number; den: number };
  fractionStep?: { num: number; den: number };
}
