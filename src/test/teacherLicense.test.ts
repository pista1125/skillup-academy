import { describe, expect, it } from 'vitest';
import { gradeFromClassName } from '@/components/paywall/TeacherLicense';

describe('tanári licenc – évfolyam az osztály nevéből', () => {
  it.each([
    ['6.a', 6],
    ['6. osztály', 6],
    ['11. B', 11],
    ['12.c', 12],
    ['5. Osztály', 5],
    ['Matek 7', 7],
    ['elso', null],
    ['', null],
  ])('%s → %s', (name, grade) => {
    expect(gradeFromClassName(name)).toBe(grade);
  });
});
