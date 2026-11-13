import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PracticeExamTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-tudasproba/PracticeExamTheory';
import { PracticeExamQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-tudasproba/PracticeExamQuiz';
import { PracticeExamMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-tudasproba/PracticeExamMatcher';
import { PracticeExamSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-tudasproba/PracticeExamSorter';
import {
  SynthesisConceptMapSvg,
  ExamChecklistTreeSvg,
  InequalityRegionsSvg,
  NonlinearSystemsIntersectionSvg,
  GradingRubricTrophySvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-tudasproba/PracticeExamFigures';

describe('Grade 10 Topic VIII - Gyakorlás, fejezeti tudáspróba - Components', () => {
  it('renders PracticeExamTheory without throwing', () => {
    const { container } = render(<PracticeExamTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('10. Gyakorlás, fejezeti tudáspróba');
    expect(container.textContent).toContain('FONTOS SZABÁLYOK');
    expect(container.textContent).toContain('Univerzális Másodfokú Egyenlet és Egyenlőtlenség Vizsgáló');
  });

  it('renders PracticeExamQuiz with 90 questions without throwing', () => {
    const { container } = render(<PracticeExamQuiz />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('10. Gyakorlás, fejezeti tudáspróba');
    expect(container.textContent).toContain('30 Kérdés');
    expect(container.textContent).toContain('61–90. kérdés');
  });

  it('renders PracticeExamMatcher without throwing', () => {
    const { container } = render(<PracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PracticeExamSorter without throwing', () => {
    const { container } = render(<PracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all 5 figures SVGs without throwing', () => {
    const { container: c1 } = render(<SynthesisConceptMapSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<ExamChecklistTreeSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<InequalityRegionsSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<NonlinearSystemsIntersectionSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<GradingRubricTrophySvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});
