export type TowerOperationType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';
export type TowerDifficultyType = 'EASY' | 'MEDIUM' | 'HARD';

export interface TowerProblem {
    id: number;
    question: string;
    target: number;
    current: number;
}

export interface TowerRoundData {
    tower1: TowerProblem;
    tower2: TowerProblem;
    availableBlocks: number[]; // e.g. [1, 10], [1, 10, 100], [1, 10, 100, 1000]
}

export const TOWER_OPERATION_DEFINITIONS: Record<TowerOperationType, {
    title: string;
    symbol: string;
    description: string;
    color: string;
    borderColor: string;
}> = {
    addition: {
        title: 'Összeadás',
        symbol: '+',
        description: 'Építs tornyokat összeadási feladatok megoldásával!',
        color: 'from-blue-500 to-indigo-600',
        borderColor: 'border-blue-200 hover:border-blue-400'
    },
    subtraction: {
        title: 'Kivonás',
        symbol: '−',
        description: 'Számold ki a különbséget és emeld a tornyot a magasba!',
        color: 'from-rose-500 to-pink-600',
        borderColor: 'border-rose-200 hover:border-rose-400'
    },
    multiplication: {
        title: 'Szorzás',
        symbol: '×',
        description: 'Szorzótáblák és szorzatok építése blokkokból!',
        color: 'from-amber-500 to-orange-600',
        borderColor: 'border-amber-200 hover:border-amber-400'
    },
    division: {
        title: 'Osztás',
        symbol: '÷',
        description: 'Bennfoglalás és osztás pontos toronymagassággal!',
        color: 'from-purple-500 to-violet-600',
        borderColor: 'border-purple-200 hover:border-purple-400'
    },
    mixed: {
        title: 'Vegyes Műveletek',
        symbol: '🔀',
        description: 'Minden alapművelet vegyesen a maximális kihívásért!',
        color: 'from-emerald-500 to-teal-600',
        borderColor: 'border-emerald-200 hover:border-emerald-400'
    }
};

export const TOWER_DIFFICULTY_CONFIG: Record<TowerDifficultyType, {
    label: string;
    desc: string;
    color: string;
    badge: string;
}> = {
    EASY: {
        label: 'Könnyű',
        desc: 'Kerek számok, egyszerűbb számolási feladatok',
        color: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800',
        badge: '🟢 Kezdő'
    },
    MEDIUM: {
        label: 'Közepes',
        desc: 'Kiegyensúlyozott feladatok az évfolyam követelményei szerint',
        color: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-800',
        badge: '🔵 Haladó'
    },
    HARD: {
        label: 'Nehéz',
        desc: 'Összetettebb fejszámolás, nagyobb számkörök és átlépések',
        color: 'border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-800',
        badge: '🔴 Mester'
    }
};

export function getAvailableOperationsForTowerGrade(grade: number): TowerOperationType[] {
    if (grade === 1) {
        return ['addition', 'subtraction', 'mixed'];
    }
    if (grade === 2) {
        return ['addition', 'subtraction', 'multiplication', 'mixed'];
    }
    // Grade 3 and 4
    return ['addition', 'subtraction', 'multiplication', 'division', 'mixed'];
}

export function getAvailableBlocksForGrade(grade: number): number[] {
    if (grade === 1) {
        return [1, 10];
    }
    if (grade === 2) {
        return [1, 10, 100];
    }
    // Grade 3 & 4
    return [1, 10, 100, 1000];
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSingleTowerProblem(
    id: number,
    operation: TowerOperationType,
    grade: number,
    difficulty: TowerDifficultyType
): TowerProblem {
    let resolvedOp = operation;
    if (resolvedOp === 'mixed') {
        const available = getAvailableOperationsForTowerGrade(grade).filter(op => op !== 'mixed');
        resolvedOp = available[Math.floor(Math.random() * available.length)];
    }

    let a = 0;
    let b = 0;
    let question = '';
    let target = 0;

    // ==========================================
    // GRADE 1 (Range: 1 - 20)
    // ==========================================
    if (grade === 1) {
        if (resolvedOp === 'addition') {
            if (difficulty === 'EASY') {
                a = getRandomInt(1, 6);
                b = getRandomInt(1, 10 - a);
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(10, 15);
                b = getRandomInt(1, 20 - a);
            } else { // HARD (cross 10)
                a = getRandomInt(6, 9);
                b = getRandomInt(11 - a, 9);
            }
            target = a + b;
            question = `${a} + ${b}`;
        } else { // subtraction
            if (difficulty === 'EASY') {
                a = getRandomInt(4, 10);
                b = getRandomInt(1, a - 1);
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(11, 20);
                b = getRandomInt(1, a - 10);
            } else { // HARD (cross 10)
                a = getRandomInt(11, 18);
                b = getRandomInt(a - 9, 9);
            }
            target = a - b;
            question = `${a} − ${b}`;
        }
    }
    // ==========================================
    // GRADE 2 (Range: 1 - 100)
    // ==========================================
    else if (grade === 2) {
        if (resolvedOp === 'addition') {
            if (difficulty === 'EASY') {
                // Round tens or simple addition up to 50
                a = getRandomInt(1, 4) * 10;
                b = getRandomInt(1, 5) * 10;
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(12, 45);
                b = getRandomInt(10, 50);
            } else {
                a = getRandomInt(25, 58);
                b = getRandomInt(25, 42);
            }
            target = a + b;
            question = `${a} + ${b}`;
        } else if (resolvedOp === 'subtraction') {
            if (difficulty === 'EASY') {
                a = getRandomInt(4, 10) * 10;
                b = getRandomInt(1, (a / 10) - 1) * 10;
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(30, 80);
                b = getRandomInt(11, a - 10);
            } else {
                a = getRandomInt(50, 100);
                b = getRandomInt(25, a - 5);
            }
            target = a - b;
            question = `${a} − ${b}`;
        } else { // multiplication (2, 5, 10)
            const tables = [2, 5, 10];
            const t = tables[Math.floor(Math.random() * tables.length)];
            const mult = difficulty === 'EASY' ? getRandomInt(2, 5) : getRandomInt(2, 10);
            target = t * mult;
            question = `${t} × ${mult}`;
        }
    }
    // ==========================================
    // GRADE 3 (Range: 1 - 1000)
    // ==========================================
    else if (grade === 3) {
        if (resolvedOp === 'addition') {
            if (difficulty === 'EASY') {
                a = getRandomInt(10, 45) * 10;
                b = getRandomInt(10, 45) * 10;
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(120, 480);
                b = getRandomInt(110, 480);
            } else {
                a = getRandomInt(250, 580);
                b = getRandomInt(180, 410);
            }
            target = a + b;
            question = `${a} + ${b}`;
        } else if (resolvedOp === 'subtraction') {
            if (difficulty === 'EASY') {
                a = getRandomInt(40, 90) * 10;
                b = getRandomInt(10, (a / 10) - 10) * 10;
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(350, 850);
                b = getRandomInt(110, a - 50);
            } else {
                a = getRandomInt(500, 1000);
                b = getRandomInt(220, a - 80);
            }
            target = a - b;
            question = `${a} − ${b}`;
        } else if (resolvedOp === 'multiplication') {
            // Full 1-10 table or tens multiplication
            if (difficulty === 'EASY') {
                a = getRandomInt(2, 9);
                b = getRandomInt(2, 9);
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(2, 9);
                b = getRandomInt(10, 30);
            } else {
                a = getRandomInt(4, 9);
                b = getRandomInt(25, 90);
            }
            target = a * b;
            question = `${a} × ${b}`;
        } else { // division
            if (difficulty === 'EASY') {
                b = getRandomInt(2, 9);
                target = getRandomInt(2, 9);
                a = b * target;
            } else if (difficulty === 'MEDIUM') {
                b = getRandomInt(2, 10);
                target = getRandomInt(10, 30);
                a = b * target;
            } else {
                b = getRandomInt(3, 9);
                target = getRandomInt(25, 80);
                a = b * target;
            }
            question = `${a} ÷ ${b}`;
        }
    }
    // ==========================================
    // GRADE 4 (Range: 1 - 10 000)
    // ==========================================
    else {
        if (resolvedOp === 'addition') {
            if (difficulty === 'EASY') {
                a = getRandomInt(10, 45) * 100;
                b = getRandomInt(10, 45) * 100;
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(1200, 4800);
                b = getRandomInt(1100, 4800);
            } else {
                a = getRandomInt(2450, 5820);
                b = getRandomInt(1890, 4150);
            }
            target = a + b;
            question = `${a} + ${b}`;
        } else if (resolvedOp === 'subtraction') {
            if (difficulty === 'EASY') {
                a = getRandomInt(40, 90) * 100;
                b = getRandomInt(10, (a / 100) - 10) * 100;
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(3500, 8500);
                b = getRandomInt(1200, a - 500);
            } else {
                a = getRandomInt(5000, 9900);
                b = getRandomInt(2350, a - 800);
            }
            target = a - b;
            question = `${a} − ${b}`;
        } else if (resolvedOp === 'multiplication') {
            if (difficulty === 'EASY') {
                a = getRandomInt(10, 50);
                b = getRandomInt(2, 9);
            } else if (difficulty === 'MEDIUM') {
                a = getRandomInt(40, 150);
                b = getRandomInt(5, 15);
            } else {
                a = getRandomInt(120, 450);
                b = getRandomInt(8, 22);
            }
            target = a * b;
            question = `${a} × ${b}`;
        } else { // division
            if (difficulty === 'EASY') {
                b = getRandomInt(2, 9);
                target = getRandomInt(20, 90);
                a = b * target;
            } else if (difficulty === 'MEDIUM') {
                b = getRandomInt(3, 9);
                target = getRandomInt(80, 350);
                a = b * target;
            } else {
                b = getRandomInt(4, 15);
                target = getRandomInt(150, 650);
                a = b * target;
            }
            question = `${a} ÷ ${b}`;
        }
    }

    return {
        id,
        question,
        target,
        current: 0
    };
}

export function generateTowerRound(
    operation: TowerOperationType,
    grade: number,
    difficulty: TowerDifficultyType
): TowerRoundData {
    const tower1 = generateSingleTowerProblem(1, operation, grade, difficulty);
    const tower2 = generateSingleTowerProblem(2, operation, grade, difficulty);
    const availableBlocks = getAvailableBlocksForGrade(grade);

    return {
        tower1,
        tower2,
        availableBlocks
    };
}
