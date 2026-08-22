import { describe, it, expect } from 'vitest';
import {
    getAvailableOperationsForGrade,
    generateSnakeProblem,
    generateSnakeDistractors,
    DifficultyType,
    OperationType
} from '../components/math/games/snake/mathSnakeGenerator';

describe('Math Snake Generator Tests', () => {
    it('enforces correct grade-level operation constraints', () => {
        // Grade 1: Only +, -, and MIXED
        const g1Ops = getAvailableOperationsForGrade(1);
        expect(g1Ops).toContain('ADDITION');
        expect(g1Ops).toContain('SUBTRACTION');
        expect(g1Ops).toContain('MIXED');
        expect(g1Ops).not.toContain('MULTIPLICATION');
        expect(g1Ops).not.toContain('DIVISION');
        expect(g1Ops).not.toContain('POWER');
        expect(g1Ops).not.toContain('ROOT');

        // Grade 2: +, -, ×, and MIXED
        const g2Ops = getAvailableOperationsForGrade(2);
        expect(g2Ops).toContain('MULTIPLICATION');
        expect(g2Ops).not.toContain('DIVISION');
        expect(g2Ops).not.toContain('POWER');
        expect(g2Ops).not.toContain('ROOT');

        // Grade 3-6: +, -, ×, ÷, and MIXED
        const g3Ops = getAvailableOperationsForGrade(3);
        expect(g3Ops).toContain('DIVISION');
        expect(g3Ops).not.toContain('POWER');
        expect(g3Ops).not.toContain('ROOT');

        const g5Ops = getAvailableOperationsForGrade(5);
        expect(g5Ops).toContain('MULTIPLICATION');
        expect(g5Ops).toContain('DIVISION');
        expect(g5Ops).not.toContain('POWER');

        // Grade 7-8: +, -, ×, ÷, POWER, and MIXED
        const g7Ops = getAvailableOperationsForGrade(7);
        expect(g7Ops).toContain('POWER');
        expect(g7Ops).not.toContain('ROOT');

        // Grade 9-12: +, -, ×, ÷, POWER, ROOT, and MIXED (all 6 + mixed)
        const g9Ops = getAvailableOperationsForGrade(9);
        expect(g9Ops).toContain('POWER');
        expect(g9Ops).toContain('ROOT');
        expect(g9Ops.length).toBe(7); // 6 ops + MIXED

        const g12Ops = getAvailableOperationsForGrade(12);
        expect(g12Ops).toContain('ROOT');
        expect(g12Ops.length).toBe(7);
    });

    it('generates valid problems for all grades (1-12), operations, and difficulties', () => {
        const difficulties: DifficultyType[] = ['EASY', 'MEDIUM', 'HARD'];

        for (let grade = 1; grade <= 12; grade++) {
            const availableOps = getAvailableOperationsForGrade(grade);

            for (const op of availableOps) {
                for (const diff of difficulties) {
                    for (let iter = 0; iter < 10; iter++) {
                        const problem = generateSnakeProblem(op, grade, diff);

                        expect(problem).toBeDefined();
                        expect(problem.question).toBeTruthy();
                        expect(typeof problem.answer).toBe('number');
                        expect(Number.isFinite(problem.answer)).toBe(true);
                        expect(Number.isNaN(problem.answer)).toBe(false);

                        // Verify distractors
                        const distractors = generateSnakeDistractors(problem.answer, 3);
                        expect(distractors.length).toBe(3);
                        expect(distractors).not.toContain(problem.answer);
                        distractors.forEach(d => {
                            expect(Number.isFinite(d)).toBe(true);
                            expect(Number.isNaN(d)).toBe(false);
                        });
                    }
                }
            }
        }
    });
});
