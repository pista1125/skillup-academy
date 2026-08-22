export type OperationType = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION' | 'POWER' | 'ROOT' | 'MIXED';
export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD';

export interface MathProblem {
    id: string;
    question: string;
    answer: number;
    operation: OperationType;
    grade: number;
    difficulty: DifficultyType;
    explanation?: string;
}

export interface OperationMeta {
    id: OperationType;
    symbol: string;
    title: string;
    description: string;
    color: string;
    borderColor: string;
    bgColor: string;
    textColor: string;
    minGrade: number;
    icon: string;
}

export const OPERATION_DEFINITIONS: Record<OperationType, OperationMeta> = {
    ADDITION: {
        id: 'ADDITION',
        symbol: '+',
        title: 'Összeadás',
        description: 'Pozitív és negatív számok, törtrészek összeadása',
        color: 'from-blue-500 to-indigo-600',
        borderColor: 'border-blue-300 hover:border-blue-500',
        bgColor: 'bg-blue-50 text-blue-700',
        textColor: 'text-blue-600',
        minGrade: 1,
        icon: '➕'
    },
    SUBTRACTION: {
        id: 'SUBTRACTION',
        symbol: '−',
        title: 'Kivonás',
        description: 'Kivonás, különbségek, negatív eredmények',
        color: 'from-emerald-500 to-teal-600',
        borderColor: 'border-emerald-300 hover:border-emerald-500',
        bgColor: 'bg-emerald-50 text-emerald-700',
        textColor: 'text-emerald-600',
        minGrade: 1,
        icon: '➖'
    },
    MULTIPLICATION: {
        id: 'MULTIPLICATION',
        symbol: '×',
        title: 'Szorzás',
        description: 'Szorzótáblák, többjegyű és előjeles szorzás',
        color: 'from-amber-500 to-orange-600',
        borderColor: 'border-amber-300 hover:border-amber-500',
        bgColor: 'bg-amber-50 text-amber-700',
        textColor: 'text-amber-600',
        minGrade: 2,
        icon: '✖️'
    },
    DIVISION: {
        id: 'DIVISION',
        symbol: '÷',
        title: 'Osztás',
        description: 'Bennfoglalás, egész osztás és törtek',
        color: 'from-rose-500 to-pink-600',
        borderColor: 'border-rose-300 hover:border-rose-500',
        bgColor: 'bg-rose-50 text-rose-700',
        textColor: 'text-rose-600',
        minGrade: 3,
        icon: '➗'
    },
    POWER: {
        id: 'POWER',
        symbol: 'xⁿ',
        title: 'Hatványozás',
        description: 'Négyzetek, köbök, n-edik hatványok és szabályok',
        color: 'from-purple-500 to-violet-600',
        borderColor: 'border-purple-300 hover:border-purple-500',
        bgColor: 'bg-purple-50 text-purple-700',
        textColor: 'text-purple-600',
        minGrade: 7,
        icon: '⚡'
    },
    ROOT: {
        id: 'ROOT',
        symbol: '√x',
        title: 'Gyökvonás',
        description: 'Négyzetgyök, köbgyök és n-edik gyökök',
        color: 'from-cyan-500 to-blue-600',
        borderColor: 'border-cyan-300 hover:border-cyan-500',
        bgColor: 'bg-cyan-50 text-cyan-700',
        textColor: 'text-cyan-600',
        minGrade: 9,
        icon: '📐'
    },
    MIXED: {
        id: 'MIXED',
        symbol: '🎲',
        title: 'Vegyes Műveletek',
        description: 'Minden, az évfolyamodhoz tartozó művelet vegyesen!',
        color: 'from-fuchsia-500 to-pink-600',
        borderColor: 'border-fuchsia-300 hover:border-fuchsia-500',
        bgColor: 'bg-fuchsia-50 text-fuchsia-700',
        textColor: 'text-fuchsia-600',
        minGrade: 1,
        icon: '🎯'
    }
};

export const DIFFICULTY_CONFIG: Record<DifficultyType, { label: string; speed: number; color: string; desc: string; badge: string }> = {
    EASY: {
        label: 'Könnyű',
        speed: 420,
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:border-emerald-500',
        desc: 'Alap feladatok, kényelmes és nyugodt tempó',
        badge: '🟢 Könnyű'
    },
    MEDIUM: {
        label: 'Közepes',
        speed: 240,
        color: 'bg-blue-100 text-blue-800 border-blue-300 hover:border-blue-500',
        desc: 'Szabványos évfolyamszint, normál sebesség',
        badge: '🟡 Közepes'
    },
    HARD: {
        label: 'Nehéz',
        speed: 140,
        color: 'bg-rose-100 text-rose-800 border-rose-300 hover:border-rose-500',
        desc: 'Igazi bajnok szint! Gyors kígyó és komoly fejszámolás',
        badge: '🔴 Nehéz'
    }
};

/**
 * Returns available operations for a specific grade (1-12)
 */
export function getAvailableOperationsForGrade(grade: number): OperationType[] {
    const ops: OperationType[] = ['ADDITION', 'SUBTRACTION'];

    if (grade >= 2) {
        ops.push('MULTIPLICATION');
    }
    if (grade >= 3) {
        ops.push('DIVISION');
    }
    if (grade >= 7) {
        ops.push('POWER');
    }
    if (grade >= 9) {
        ops.push('ROOT');
    }

    // Mixed is always available for all grades combining their unlocked operations
    ops.push('MIXED');

    return ops;
}

/**
 * Random integer helper [min, max] inclusive
 */
function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pick random element from array
 */
function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Grade-specific Addition Problem Generator
 */
function generateAddition(grade: number, diff: DifficultyType): MathProblem {
    let a = 0;
    let b = 0;

    if (grade === 1) {
        if (diff === 'EASY') {
            a = randInt(1, 5);
            b = randInt(1, 5);
        } else if (diff === 'MEDIUM') {
            a = randInt(1, 9);
            b = randInt(1, 10 - a); // within 10
            if (Math.random() > 0.4) {
                // with bridge to 15
                a = randInt(5, 9);
                b = randInt(1, 6);
            }
        } else {
            // Hard: up to 20 with tens crossing
            a = randInt(6, 12);
            b = randInt(5, 8);
        }
    } else if (grade === 2) {
        if (diff === 'EASY') {
            a = randInt(10, 30);
            b = randInt(1, 9);
        } else if (diff === 'MEDIUM') {
            a = randInt(15, 60);
            b = randInt(10, 35);
        } else {
            a = randInt(25, 68);
            b = randInt(18, 32);
        }
    } else if (grade === 3 || grade === 4) {
        if (diff === 'EASY') {
            a = randInt(20, 80);
            b = randInt(10, 50);
        } else if (diff === 'MEDIUM') {
            a = randInt(100, 500);
            b = randInt(50, 450);
            if (Math.random() > 0.5) {
                a = Math.round(a / 10) * 10;
                b = Math.round(b / 10) * 10;
            }
        } else {
            a = randInt(150, 650);
            b = randInt(180, 350);
        }
    } else if (grade === 5 || grade === 6) {
        if (diff === 'EASY') {
            a = randInt(120, 800);
            b = randInt(150, 600);
        } else if (diff === 'MEDIUM') {
            if (Math.random() > 0.5 && grade >= 6) {
                a = randInt(-25, 25);
                b = randInt(-25, 25);
            } else {
                a = randInt(250, 1500);
                b = randInt(150, 850);
            }
        } else {
            a = randInt(-50, 50);
            b = randInt(-50, 50);
        }
    } else {
        // Grades 7-12
        if (diff === 'EASY') {
            a = randInt(-30, 70);
            b = randInt(-30, 70);
        } else if (diff === 'MEDIUM') {
            a = randInt(-100, 100);
            b = randInt(-100, 100);
        } else {
            a = randInt(-250, 250);
            b = randInt(-250, 250);
        }
    }

    const answer = a + b;
    const bStr = b < 0 ? `(${b})` : `${b}`;
    return {
        id: Math.random().toString(36).substring(2, 9),
        question: `${a} + ${bStr}`,
        answer,
        operation: 'ADDITION',
        grade,
        difficulty: diff
    };
}

/**
 * Grade-specific Subtraction Problem Generator
 */
function generateSubtraction(grade: number, diff: DifficultyType): MathProblem {
    let a = 0;
    let b = 0;

    if (grade === 1) {
        if (diff === 'EASY') {
            a = randInt(3, 10);
            b = randInt(1, a);
        } else if (diff === 'MEDIUM') {
            a = randInt(10, 18);
            b = randInt(2, 8);
        } else {
            a = randInt(12, 20);
            b = randInt(5, a);
        }
    } else if (grade === 2) {
        if (diff === 'EASY') {
            a = randInt(15, 40);
            b = randInt(1, 9);
        } else if (diff === 'MEDIUM') {
            a = randInt(30, 90);
            b = randInt(10, a - 5);
        } else {
            a = randInt(50, 100);
            b = randInt(15, 48);
        }
    } else if (grade === 3 || grade === 4) {
        if (diff === 'EASY') {
            a = randInt(50, 100);
            b = randInt(15, a - 5);
        } else if (diff === 'MEDIUM') {
            a = randInt(200, 800);
            b = randInt(50, a - 50);
            if (Math.random() > 0.5) {
                a = Math.round(a / 10) * 10;
                b = Math.round(b / 10) * 10;
            }
        } else {
            a = randInt(400, 1000);
            b = randInt(150, a - 20);
        }
    } else if (grade === 5 || grade === 6) {
        if (diff === 'EASY') {
            a = randInt(200, 1000);
            b = randInt(50, a - 10);
        } else if (diff === 'MEDIUM') {
            if (grade >= 6 || Math.random() > 0.6) {
                a = randInt(-20, 20);
                b = randInt(-20, 20);
            } else {
                a = randInt(500, 2000);
                b = randInt(200, a - 50);
            }
        } else {
            a = randInt(-60, 60);
            b = randInt(-60, 60);
        }
    } else {
        // Grades 7-12
        if (diff === 'EASY') {
            a = randInt(-40, 80);
            b = randInt(-40, 80);
        } else if (diff === 'MEDIUM') {
            a = randInt(-120, 120);
            b = randInt(-120, 120);
        } else {
            a = randInt(-300, 300);
            b = randInt(-300, 300);
        }
    }

    const answer = a - b;
    const bStr = b < 0 ? `(${b})` : `${b}`;
    return {
        id: Math.random().toString(36).substring(2, 9),
        question: `${a} − ${bStr}`,
        answer,
        operation: 'SUBTRACTION',
        grade,
        difficulty: diff
    };
}

/**
 * Grade-specific Multiplication Problem Generator (2nd grade+)
 */
function generateMultiplication(grade: number, diff: DifficultyType): MathProblem {
    let a = 0;
    let b = 0;

    if (grade === 2) {
        // Grade 2: specifically 2, 5, 10 multiplication tables and basics
        if (diff === 'EASY') {
            a = 2;
            b = randInt(1, 10);
            if (Math.random() > 0.5) [a, b] = [b, a];
        } else if (diff === 'MEDIUM') {
            const tables = [2, 5, 10];
            a = pickRandom(tables);
            b = randInt(1, 10);
            if (Math.random() > 0.5) [a, b] = [b, a];
        } else {
            const tables = [2, 3, 4, 5, 10];
            a = pickRandom(tables);
            b = randInt(1, 10);
            if (Math.random() > 0.5) [a, b] = [b, a];
        }
    } else if (grade === 3 || grade === 4) {
        if (diff === 'EASY') {
            a = randInt(2, 6);
            b = randInt(2, 9);
        } else if (diff === 'MEDIUM') {
            a = randInt(6, 9);
            b = randInt(6, 9);
        } else {
            if (Math.random() > 0.4) {
                a = randInt(11, 15);
                b = randInt(2, 6);
            } else {
                a = randInt(10, 40);
                b = randInt(2, 5);
            }
        }
    } else if (grade === 5 || grade === 6) {
        if (diff === 'EASY') {
            a = randInt(6, 12);
            b = randInt(6, 12);
        } else if (diff === 'MEDIUM') {
            if (grade >= 6 && Math.random() > 0.4) {
                a = randInt(-12, 12);
                b = randInt(-12, 12);
                if (a === 0) a = 7;
                if (b === 0) b = -4;
            } else {
                a = randInt(12, 25);
                b = randInt(3, 9);
            }
        } else {
            a = randInt(-15, 15);
            b = randInt(-12, 12);
            if (a === 0) a = -8;
            if (b === 0) b = 9;
        }
    } else {
        // High school (7-12)
        if (diff === 'EASY') {
            a = randInt(-12, 12);
            b = randInt(-10, 10);
            if (a === 0) a = 4;
            if (b === 0) b = -6;
        } else if (diff === 'MEDIUM') {
            a = randInt(-20, 20);
            b = randInt(-15, 15);
            if (a === 0) a = -13;
            if (b === 0) b = 7;
        } else {
            a = randInt(-25, 25);
            b = randInt(-20, 20);
            if (a === 0) a = 16;
            if (b === 0) b = -14;
        }
    }

    const answer = a * b;
    const aStr = a < 0 ? `(${a})` : `${a}`;
    const bStr = b < 0 ? `(${b})` : `${b}`;
    return {
        id: Math.random().toString(36).substring(2, 9),
        question: `${aStr} × ${bStr}`,
        answer,
        operation: 'MULTIPLICATION',
        grade,
        difficulty: diff
    };
}

/**
 * Grade-specific Division Problem Generator (3rd grade+)
 */
function generateDivision(grade: number, diff: DifficultyType): MathProblem {
    let divisor = 2;
    let quotient = 2;

    if (grade === 3 || grade === 4) {
        if (diff === 'EASY') {
            divisor = randInt(2, 5);
            quotient = randInt(2, 9);
        } else if (diff === 'MEDIUM') {
            divisor = randInt(6, 9);
            quotient = randInt(4, 9);
        } else {
            divisor = randInt(3, 9);
            quotient = randInt(11, 20);
        }
    } else if (grade === 5 || grade === 6) {
        if (diff === 'EASY') {
            divisor = randInt(4, 10);
            quotient = randInt(6, 12);
        } else if (diff === 'MEDIUM') {
            if (grade >= 6 && Math.random() > 0.4) {
                divisor = pickRandom([-9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9]);
                quotient = randInt(-12, 12);
                if (quotient === 0) quotient = 6;
            } else {
                divisor = randInt(6, 15);
                quotient = randInt(10, 25);
            }
        } else {
            divisor = pickRandom([-15, -12, -8, -6, -4, 4, 6, 8, 12, 15]);
            quotient = randInt(-25, 25);
            if (quotient === 0) quotient = -7;
        }
    } else {
        // Grades 7-12
        if (diff === 'EASY') {
            divisor = pickRandom([-10, -9, -8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8, 9, 10]);
            quotient = randInt(-12, 12);
            if (quotient === 0) quotient = 8;
        } else if (diff === 'MEDIUM') {
            divisor = pickRandom([-16, -14, -12, -8, -7, 7, 8, 12, 14, 16]);
            quotient = randInt(-20, 20);
            if (quotient === 0) quotient = -11;
        } else {
            divisor = pickRandom([-25, -20, -18, -15, -12, 12, 15, 18, 20, 25]);
            quotient = randInt(-30, 30);
            if (quotient === 0) quotient = 14;
        }
    }

    const dividend = divisor * quotient;
    const divStr = dividend < 0 ? `(${dividend})` : `${dividend}`;
    const disStr = divisor < 0 ? `(${divisor})` : `${divisor}`;

    return {
        id: Math.random().toString(36).substring(2, 9),
        question: `${divStr} ÷ ${disStr}`,
        answer: quotient,
        operation: 'DIVISION',
        grade,
        difficulty: diff
    };
}

/**
 * Grade-specific Power (Hatványozás) Problem Generator (7th grade+)
 */
function generatePower(grade: number, diff: DifficultyType): MathProblem {
    let base = 2;
    let exponent = 2;
    let answer = 4;
    let question = '2²';

    const SUPERSCRIPTS: Record<number, string> = {
        0: '⁰',
        1: '¹',
        2: '²',
        3: '³',
        4: '⁴',
        5: '⁵',
        6: '⁶',
        7: '⁷',
        8: '⁸',
        9: '⁹'
    };

    const toSuperscript = (n: number) => {
        if (n < 0) return `⁻${Math.abs(n).toString().split('').map(d => SUPERSCRIPTS[Number(d)] || d).join('')}`;
        return n.toString().split('').map(d => SUPERSCRIPTS[Number(d)] || d).join('');
    };

    if (grade === 7) {
        if (diff === 'EASY') {
            base = randInt(2, 10);
            exponent = 2;
            answer = Math.pow(base, exponent);
            question = `${base}${toSuperscript(exponent)}`;
        } else if (diff === 'MEDIUM') {
            const pool = [
                { b: randInt(11, 15), exp: 2 },
                { b: 2, exp: randInt(3, 5) },
                { b: 3, exp: 3 },
                { b: 4, exp: 3 },
                { b: 5, exp: 3 },
                { b: 10, exp: randInt(2, 3) }
            ];
            const chosen = pickRandom(pool);
            base = chosen.b;
            exponent = chosen.exp;
            answer = Math.pow(base, exponent);
            question = `${base}${toSuperscript(exponent)}`;
        } else {
            const pool = [
                { b: -2, exp: randInt(2, 4) },
                { b: -3, exp: randInt(2, 3) },
                { b: -5, exp: 2 },
                { b: randInt(4, 99), exp: 0 },
                { b: 2, exp: 6 },
                { b: 3, exp: 4 }
            ];
            const chosen = pickRandom(pool);
            base = chosen.b;
            exponent = chosen.exp;
            answer = Math.pow(base, exponent);
            const baseStr = base < 0 ? `(${base})` : `${base}`;
            question = `${baseStr}${toSuperscript(exponent)}`;
        }
    } else if (grade === 8) {
        if (diff === 'EASY') {
            base = randInt(2, 12);
            exponent = 2;
            answer = Math.pow(base, exponent);
            question = `${base}${toSuperscript(exponent)}`;
        } else if (diff === 'MEDIUM') {
            const pool = [
                { b: randInt(12, 16), exp: 2 },
                { b: 2, exp: randInt(4, 6) },
                { b: 3, exp: randInt(3, 4) },
                { b: -4, exp: 3 },
                { b: -2, exp: 5 },
                { b: 10, exp: randInt(2, 4) }
            ];
            const chosen = pickRandom(pool);
            base = chosen.b;
            exponent = chosen.exp;
            answer = Math.pow(base, exponent);
            const baseStr = base < 0 ? `(${base})` : `${base}`;
            question = `${baseStr}${toSuperscript(exponent)}`;
        } else {
            const pool = [
                { b: -2, exp: 6 },
                { b: -3, exp: 4 },
                { b: -5, exp: 3 },
                { b: 2, exp: 7 },
                { b: randInt(16, 20), exp: 2 },
                { b: randInt(12, 99), exp: 0 }
            ];
            const chosen = pickRandom(pool);
            base = chosen.b;
            exponent = chosen.exp;
            answer = Math.pow(base, exponent);
            const baseStr = base < 0 ? `(${base})` : `${base}`;
            question = `${baseStr}${toSuperscript(exponent)}`;
        }
    } else {
        // High school (9-12)
        if (diff === 'EASY') {
            const pool = [
                { b: randInt(3, 15), exp: 2 },
                { b: 2, exp: randInt(3, 5) },
                { b: 3, exp: 3 },
                { b: -3, exp: 2 },
                { b: -2, exp: 3 }
            ];
            const chosen = pickRandom(pool);
            base = chosen.b;
            exponent = chosen.exp;
            answer = Math.pow(base, exponent);
            const baseStr = base < 0 ? `(${base})` : `${base}`;
            question = `${baseStr}${toSuperscript(exponent)}`;
        } else if (diff === 'MEDIUM') {
            const pool = [
                { b: randInt(14, 20), exp: 2 },
                { b: 2, exp: randInt(6, 8) },
                { b: 3, exp: 4 },
                { b: 4, exp: 3 },
                { b: 5, exp: 3 },
                { b: -2, exp: 7 },
                { b: -4, exp: 3 }
            ];
            const chosen = pickRandom(pool);
            base = chosen.b;
            exponent = chosen.exp;
            answer = Math.pow(base, exponent);
            const baseStr = base < 0 ? `(${base})` : `${base}`;
            question = `${baseStr}${toSuperscript(exponent)}`;
        } else {
            const pool = [
                { b: randInt(21, 25), exp: 2 },
                { b: 2, exp: 8 },
                { b: 2, exp: 9 },
                { b: 3, exp: 5 },
                { b: -3, exp: 5 },
                { b: -2, exp: 8 },
                { b: -5, exp: 4 }
            ];
            const chosen = pickRandom(pool);
            base = chosen.b;
            exponent = chosen.exp;
            answer = Math.pow(base, exponent);
            const baseStr = base < 0 ? `(${base})` : `${base}`;
            question = `${baseStr}${toSuperscript(exponent)}`;
        }
    }

    return {
        id: Math.random().toString(36).substring(2, 9),
        question,
        answer,
        operation: 'POWER',
        grade,
        difficulty: diff
    };
}

/**
 * Grade-specific Root (Gyökvonás) Problem Generator (9th grade+)
 */
function generateRoot(grade: number, diff: DifficultyType): MathProblem {
    let question = '√16';
    let answer = 4;

    if (diff === 'EASY') {
        const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
        const rad = pickRandom(perfectSquares);
        answer = Math.round(Math.sqrt(rad));
        question = `√${rad}`;
    } else if (diff === 'MEDIUM') {
        if (Math.random() > 0.35) {
            const mediumSquares = [121, 144, 169, 196, 225, 256, 289, 324, 400, 625];
            const rad = pickRandom(mediumSquares);
            answer = Math.round(Math.sqrt(rad));
            question = `√${rad}`;
        } else {
            const cubeRoots = [
                { rad: 8, ans: 2 },
                { rad: 27, ans: 3 },
                { rad: 64, ans: 4 },
                { rad: 125, ans: 5 },
                { rad: 216, ans: 6 },
                { rad: 1000, ans: 10 }
            ];
            const chosen = pickRandom(cubeRoots);
            answer = chosen.ans;
            question = `³√${chosen.rad}`;
        }
    } else {
        const hardRoots = [
            { q: '⁴√16', ans: 2 },
            { q: '⁴√81', ans: 3 },
            { q: '⁵√32', ans: 2 },
            { q: '³√(−27)', ans: -3 },
            { q: '³√(−64)', ans: -4 },
            { q: '³√(−125)', ans: -5 },
            { q: '√441', ans: 21 },
            { q: '√484', ans: 22 },
            { q: '√576', ans: 24 },
            { q: '√625', ans: 25 },
            { q: '√900', ans: 30 },
            { q: '√(16 × 9)', ans: 12 },
            { q: '√(25 × 4)', ans: 10 },
            { q: '√(100 − 36)', ans: 8 },
            { q: '√(169 − 25)', ans: 12 }
        ];
        const chosen = pickRandom(hardRoots);
        question = chosen.q;
        answer = chosen.ans;
    }

    return {
        id: Math.random().toString(36).substring(2, 9),
        question,
        answer,
        operation: 'ROOT',
        grade,
        difficulty: diff
    };
}

/**
 * Main problem generator function
 */
export function generateSnakeProblem(
    operation: OperationType,
    grade: number,
    difficulty: DifficultyType = 'MEDIUM'
): MathProblem {
    const availableOps = getAvailableOperationsForGrade(grade).filter(op => op !== 'MIXED');

    let opToUse = operation;
    if (operation === 'MIXED') {
        opToUse = pickRandom(availableOps);
    }

    if (!availableOps.includes(opToUse)) {
        opToUse = pickRandom(availableOps);
    }

    switch (opToUse) {
        case 'ADDITION':
            return generateAddition(grade, difficulty);
        case 'SUBTRACTION':
            return generateSubtraction(grade, difficulty);
        case 'MULTIPLICATION':
            return generateMultiplication(grade, difficulty);
        case 'DIVISION':
            return generateDivision(grade, difficulty);
        case 'POWER':
            return generatePower(grade, difficulty);
        case 'ROOT':
            return generateRoot(grade, difficulty);
        default:
            return generateAddition(grade, difficulty);
    }
}

/**
 * Smart distractor (wrong answer) generator
 * Creates plausible, tricky distractors based on the correct answer.
 */
export function generateSnakeDistractors(correctAnswer: number, count: number = 3): number[] {
    const distractors = new Set<number>();

    const candidates: number[] = [
        correctAnswer + 1,
        correctAnswer - 1,
        correctAnswer + 2,
        correctAnswer - 2,
        correctAnswer + 10,
        correctAnswer - 10,
        correctAnswer + 5,
        correctAnswer - 5,
        -correctAnswer,
        correctAnswer * 2,
        Math.floor(correctAnswer / 2),
        correctAnswer + 3,
        correctAnswer - 3
    ];

    const shuffled = candidates
        .filter(n => Number.isFinite(n) && n !== correctAnswer)
        .sort(() => Math.random() - 0.5);

    for (const c of shuffled) {
        if (distractors.size >= count) break;
        distractors.add(c);
    }

    let offset = 4;
    while (distractors.size < count) {
        const randVal = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
        if (randVal !== correctAnswer) {
            distractors.add(randVal);
        }
        offset += randInt(1, 3);
    }

    return Array.from(distractors);
}
