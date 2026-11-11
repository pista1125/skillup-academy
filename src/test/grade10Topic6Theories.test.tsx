import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TriangleCongruenceTheory } from '@/components/math/grade-10/egybevagosag-es-kor/haromszogek-egybevagosaganak-alapesetei/TriangleCongruenceTheory';
import { CongruentTrianglesTheory } from '@/components/math/grade-10/egybevagosag-es-kor/egybevago-haromszogek/CongruentTrianglesTheory';
import { CircleCircumferenceAreaTheory } from '@/components/math/grade-10/egybevagosag-es-kor/a-kor-kerulete-es-terulete/CircleCircumferenceAreaTheory';
import { CentralAngleArcSectorTheory } from '@/components/math/grade-10/egybevagosag-es-kor/kozepponti-szog-koriv-korcikk/CentralAngleArcSectorTheory';
import { CirclePracticeTheory } from '@/components/math/grade-10/egybevagosag-es-kor/gyakorlas-kor-alapok/CirclePracticeTheory';
import { EverydayArcsSectorsTheory } from '@/components/math/grade-10/egybevagosag-es-kor/korivek-korcikkek-a-mindennapokban/EverydayArcsSectorsTheory';
import { PolygonsAndCirclesTheory } from '@/components/math/grade-10/egybevagosag-es-kor/sokszogek-es-korok/PolygonsAndCirclesTheory';
import { PolygonCirclePracticeTheory } from '@/components/math/grade-10/egybevagosag-es-kor/gyakorlas-sokszogek-korok/PolygonCirclePracticeTheory';
import { GeometryReviewTheory } from '@/components/math/grade-10/egybevagosag-es-kor/ismetles/GeometryReviewTheory';

import { PolygonsAndCirclesMatcher } from '@/components/math/grade-10/egybevagosag-es-kor/sokszogek-es-korok/PolygonsAndCirclesMatcher';
import { PolygonsAndCirclesSorter } from '@/components/math/grade-10/egybevagosag-es-kor/sokszogek-es-korok/PolygonsAndCirclesSorter';
import { PolygonCirclePracticeMatcher } from '@/components/math/grade-10/egybevagosag-es-kor/gyakorlas-sokszogek-korok/PolygonCirclePracticeMatcher';
import { PolygonCirclePracticeSorter } from '@/components/math/grade-10/egybevagosag-es-kor/gyakorlas-sokszogek-korok/PolygonCirclePracticeSorter';
import { GeometryReviewMatcher } from '@/components/math/grade-10/egybevagosag-es-kor/ismetles/GeometryReviewMatcher';
import { GeometryReviewSorter } from '@/components/math/grade-10/egybevagosag-es-kor/ismetles/GeometryReviewSorter';

describe('Grade 10 Topic VI - Egybevágóság és kör - Theory Components', () => {
  it('renders TriangleCongruenceTheory without throwing', () => {
    const { container } = render(<TriangleCongruenceTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CongruentTrianglesTheory without throwing', () => {
    const { container } = render(<CongruentTrianglesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CircleCircumferenceAreaTheory without throwing', () => {
    const { container } = render(<CircleCircumferenceAreaTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CentralAngleArcSectorTheory without throwing', () => {
    const { container } = render(<CentralAngleArcSectorTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CirclePracticeTheory without throwing', () => {
    const { container } = render(<CirclePracticeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders EverydayArcsSectorsTheory without throwing', () => {
    const { container } = render(<EverydayArcsSectorsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PolygonsAndCirclesTheory without throwing', () => {
    const { container } = render(<PolygonsAndCirclesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PolygonCirclePracticeTheory without throwing', () => {
    const { container } = render(<PolygonCirclePracticeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders GeometryReviewTheory without throwing', () => {
    const { container } = render(<GeometryReviewTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PolygonsAndCirclesMatcher and PolygonsAndCirclesSorter with content', () => {
    const matcherResult = render(<PolygonsAndCirclesMatcher />);
    expect(matcherResult.container).toBeTruthy();
    // Verify cards exist in matcher
    expect(matcherResult.container.querySelectorAll('button').length).toBeGreaterThan(0);

    const sorterResult = render(<PolygonsAndCirclesSorter />);
    expect(sorterResult.container).toBeTruthy();
  });

  it('renders PolygonCirclePracticeMatcher and PolygonCirclePracticeSorter with content', () => {
    const matcherResult = render(<PolygonCirclePracticeMatcher />);
    expect(matcherResult.container).toBeTruthy();
    expect(matcherResult.container.querySelectorAll('button').length).toBeGreaterThan(0);

    const sorterResult = render(<PolygonCirclePracticeSorter />);
    expect(sorterResult.container).toBeTruthy();
  });

  it('renders GeometryReviewMatcher and GeometryReviewSorter with content', () => {
    const matcherResult = render(<GeometryReviewMatcher />);
    expect(matcherResult.container).toBeTruthy();
    expect(matcherResult.container.querySelectorAll('button').length).toBeGreaterThan(0);

    const sorterResult = render(<GeometryReviewSorter />);
    expect(sorterResult.container).toBeTruthy();
  });
});

