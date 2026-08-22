import { describe, it, expect } from 'vitest';
import {
    generateTowerRound,
    generateSingleTowerProblem,
    getAvailableOperationsForTowerGrade,
    getAvailableBlocksForGrade,
    TowerOperationType,
    TowerDifficultyType
} from '../components/math/games/toronyepites/towerProblemGenerator';

describe('Tower Problem Generator Tests', () => {
    it('returns correct available operations for each grade', () => {
        expect(getAvailableOperationsForTowerGrade(1)).toEqual(['addition', 'subtraction', 'mixed']);
        expect(getAvailableOperationsForTowerGrade(2)).toEqual(['addition', 'subtraction', 'multiplication', 'mixed']);
        expect(getAvailableOperationsForTowerGrade(3)).toContain('division');
        expect(getAvailableOperationsForTowerGrade(4)).toContain('division');
    });

    it('returns correct building blocks for each grade', () => {
        expect(getAvailableBlocksForGrade(1)).toEqual([1, 10]);
        expect(getAvailableBlocksForGrade(2)).toEqual([1, 10, 100]);
        expect(getAvailableBlocksForGrade(3)).toEqual([1, 10, 100, 1000]);
        expect(getAvailableBlocksForGrade(4)).toEqual([1, 10, 100, 1000]);
    });

    it('generates valid problems for all grades (1-4), operations and difficulties', () => {
        const grades = [1, 2, 3, 4];
        const difficulties: TowerDifficultyType[] = ['EASY', 'MEDIUM', 'HARD'];

        for (const grade of grades) {
            const operations = getAvailableOperationsForTowerGrade(grade);

            for (const op of operations) {
                for (const diff of difficulties) {
                    for (let i = 0; i < 5; i++) {
                        const problem = generateSingleTowerProblem(1, op, grade, diff);

                        expect(problem.id).toBe(1);
                        expect(problem.question.length).toBeGreaterThan(0);
                        expect(problem.target).toBeGreaterThan(0);
                        expect(Number.isInteger(problem.target)).toBe(true);

                        if (grade === 1) {
                            expect(problem.target).toBeLessThanOrEqual(20);
                        } else if (grade === 2) {
                            expect(problem.target).toBeLessThanOrEqual(100);
                        } else if (grade === 3) {
                            expect(problem.target).toBeLessThanOrEqual(1000);
                        } else if (grade === 4) {
                            expect(problem.target).toBeLessThanOrEqual(10000);
                        }
                    }
                }
            }
        }
    });

    it('generates complete rounds with 2 towers', () => {
        const round = generateTowerRound('mixed', 2, 'MEDIUM');
        expect(round.tower1).toBeDefined();
        expect(round.tower2).toBeDefined();
        expect(round.availableBlocks).toEqual([1, 10, 100]);
    });
});
