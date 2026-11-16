import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NegativesExamTheory, makeNegTask, normalizeAnswer, TF_STATEMENTS } from '@/components/math/grade-4/negativ-szamok/gyakorlas-tudasproba/NegativesExamTheory';
import { NegativesExamQuiz, NEGATIVES_EXAM_QUESTIONS } from '@/components/math/grade-4/negativ-szamok/gyakorlas-tudasproba/NegativesExamQuiz';
import { NegativesExamMatcher } from '@/components/math/grade-4/negativ-szamok/gyakorlas-tudasproba/NegativesExamMatcher';
import { NegativesExamSorter } from '@/components/math/grade-4/negativ-szamok/gyakorlas-tudasproba/NegativesExamSorter';
import { ExamOverviewSvg, ChangeRuleSvg, TempLadderSvg, HeightDepthSvg } from '@/components/math/grade-4/negativ-szamok/gyakorlas-tudasproba/NegativesExamFigures';

const num = (s: string) => Number(s.replace('−', '-').replace(/[^\d-]/g, ''));

describe('Grade 4 Topic IV - 4. Gyakorlás, tudáspróba - Components', () => {
  it('renders NegativesExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<NegativesExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders NegativesExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<NegativesExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    expect(NEGATIVES_EXAM_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(NEGATIVES_EXAM_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(NEGATIVES_EXAM_QUESTIONS.map((q) => q.id)).size).toBe(90);
    NEGATIVES_EXAM_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    const withFig = NEGATIVES_EXAM_QUESTIONS.filter((q) => q.figure).length;
    expect(withFig).toBeGreaterThanOrEqual(36);
  });

  it('generated questions have correct answers', () => {
    const byId = (id: string) => NEGATIVES_EXAM_QUESTIONS.find((q) => q.id === id)!;
    expect(byId('nx-e1').options[0]).toBe('−4 °C');
    expect(byId('nx-e10').options[0]).toBe('9');
    expect(byId('nx-e15').options[0]).toBe('−3 > −8');
    expect(byId('nx-e20').options[0]).toBe('−1');
    expect(byId('nx-e25').options[0]).toBe('−2 fabatka');
    expect(byId('nx-m7').options[0]).toBe('−7 °C');
    expect(byId('nx-m9').options[0]).toBe('15 °C-kal');
    expect(byId('nx-m12').options[0]).toBe('−17, −7, −5, −2, 0, 13');
    expect(byId('nx-m13').options[0]).toBe('25, 6, 1, −4, −8, −10');
    expect(byId('nx-h1').options[0]).toBe('20 °C-kal');
    expect(byId('nx-h2').options[0]).toBe('14 °C-kal');
    expect(byId('nx-h6').options[0]).toBe('−20 °C');
    expect(byId('nx-h11').options[0]).toBe('−4 fabatka');
    expect(byId('nx-h17').options[0]).toBe('−12');
    expect(byId('nx-h28').options[0]).toBe('18, 0, −3, −5, −21, −30');
  });

  it('lab task generator produces consistent tasks', () => {
    expect(normalizeAnswer('-5 °C')).toBe('−5');
    expect(normalizeAnswer(' 15 fok ')).toBe('15');
    (['valtozas', 'kulonbseg', 'ellentett', 'szocske', 'fabatka', 'osszehasonlitas', 'szomszed'] as const).forEach((k) => {
      for (let i = 0; i < 40; i++) {
        const t = makeNegTask(k);
        expect(t.text).toBeTruthy();
        expect(t.answer).toBeTruthy();
        if (k === 'osszehasonlitas') expect(['<', '>']).toContain(t.answer);
        else expect(Number.isFinite(num(t.answer))).toBe(true);
        if (k === 'kulonbseg') expect(num(t.answer)).toBeGreaterThan(0);
      }
    });
    expect(TF_STATEMENTS.length).toBeGreaterThanOrEqual(8);
  });

  it('renders NegativesExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<NegativesExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NegativesExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<NegativesExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [ExamOverviewSvg, ChangeRuleSvg, TempLadderSvg, HeightDepthSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
