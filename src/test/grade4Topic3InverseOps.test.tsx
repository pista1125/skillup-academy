import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import {
  InverseOpsTheory,
  BACK_TASKS,
  solveBackwards,
  runFlowchart,
  inverseOf
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-kozotti-kapcsolatok/InverseOpsTheory';
import { InverseOpsQuiz } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-kozotti-kapcsolatok/InverseOpsQuiz';
import { InverseOpsMatcher } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-kozotti-kapcsolatok/InverseOpsMatcher';
import { InverseOpsSorter } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-kozotti-kapcsolatok/InverseOpsSorter';
import {
  InversePairsSvg,
  CombineArrowsSvg,
  ThinkNumberSvg,
  FlowchartSvg,
  HalfOfSumSvg
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-kozotti-kapcsolatok/InverseOpsFigures';

describe('Grade 4 Topic III - 6. A műveletek közötti kapcsolatok - Components', () => {
  it('renders InverseOpsTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<InverseOpsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders InverseOpsQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<InverseOpsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders InverseOpsMatcher without throwing', () => {
    const { container } = render(<InverseOpsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders InverseOpsSorter without throwing', () => {
    const { container } = render(<InverseOpsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [InversePairsSvg, CombineArrowsSvg, ThinkNumberSvg, FlowchartSvg, HalfOfSumSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('solves the textbook "melyik számra gondoltam" tasks backwards', () => {
    expect(inverseOf({ s: '+', n: 5 })).toEqual({ s: '−', n: 5 });
    expect(inverseOf({ s: ':', n: 4 })).toEqual({ s: '·', n: 4 });
    const answers = BACK_TASKS.map((t) => solveBackwards(t.ops, t.result));
    expect(answers).toEqual([2790, 1800, 1200, 8248, 4258, 1066]);
  });

  it('runs the workbook flowchart', () => {
    expect(runFlowchart(1348).at(-1)).toBe(2696);
    expect(runFlowchart(2696).at(-1)).toBe(2696);
    expect(runFlowchart(4044).at(-1)).toBe(2696);
    expect(runFlowchart(1000).at(-1)).toBe(2522);
  });
});
