import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PasswordsTheory } from '@/components/math/grade-11/kombinatorika-grafok/jelszavak/PasswordsTheory';
import { PasswordsQuiz } from '@/components/math/grade-11/kombinatorika-grafok/jelszavak/PasswordsQuiz';
import { PasswordsMatcher } from '@/components/math/grade-11/kombinatorika-grafok/jelszavak/PasswordsMatcher';
import { PasswordsSorter } from '@/components/math/grade-11/kombinatorika-grafok/jelszavak/PasswordsSorter';
import {
  PasswordSlotsSvg,
  PasswordSlotsRepeatSvg,
  PasswordTreeSvg,
  FourDigitSchemesSvg,
  LogoColoringSvg
} from '@/components/math/grade-11/kombinatorika-grafok/jelszavak/PasswordsFigures';

describe('Grade 11 Topic II - 16. Jelszavak - Components', () => {
  it('renders PasswordsTheory without throwing', () => {
    const { container } = render(<PasswordsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PasswordsQuiz without throwing', () => {
    const { container } = render(<PasswordsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PasswordsMatcher without throwing', () => {
    const { container } = render(<PasswordsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PasswordsSorter without throwing', () => {
    const { container } = render(<PasswordsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PasswordSlotsSvg, PasswordSlotsRepeatSvg, PasswordTreeSvg, FourDigitSchemesSvg, LogoColoringSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
