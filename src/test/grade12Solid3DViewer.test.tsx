import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Solid3DViewer, makeBox, makePrism, makePyramid, makeCylinder, makeCone, makeFrustumCone, makeFrustumPyramid, makeSphere,
} from '@/components/math/grade-12/tergeometria/shared/Solid3DViewer';

describe('Grade 12 Solid3DViewer', () => {
  it('renders every generated solid', () => {
    const solids = [makeBox(4, 2.5, 2), makePrism(6, 2, 3), makePyramid(4, 2, 3), makeCylinder(2, 3), makeCone(2, 3), makeFrustumCone(3, 1.5, 2), makeFrustumPyramid(4, 3, 1.5, 2), makeSphere(2)];
    for (const s of solids) {
      const { container, unmount } = render(<Solid3DViewer solid={s} />);
      expect(container.querySelectorAll('line').length).toBe(s.edges.length);
      unmount();
    }
  });

  it('dashes the three hidden edges of a box in the default view', () => {
    const { container } = render(<Solid3DViewer solid={makeBox(4, 2.5, 2)} />);
    const dashed = Array.from(container.querySelectorAll('line')).filter((l) => l.getAttribute('stroke-dasharray'));
    expect(dashed.length).toBe(3);
    expect(container.textContent).toContain('A');
  });
});
