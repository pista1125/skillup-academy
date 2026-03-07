export type SudokuDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type SudokuType = 'classic' | 'extreme' | 'mini4' | 'mini6';

export interface SudokuCell {
    value: number;
    isInitial: boolean;
    notes: number[];
}

export const generateSudoku = (type: SudokuType, difficulty: SudokuDifficulty): { board: number[][], solution: number[][] } => {
    const size = type === 'mini4' ? 4 : type === 'mini6' ? 6 : 9;
    const subgridW = type === 'mini4' ? 2 : type === 'mini6' ? 3 : 3;
    const subgridH = type === 'mini4' ? 2 : type === 'mini6' ? 2 : 3;

    // 1. Create an empty board
    const solution: number[][] = Array.from({ length: size }, () => Array(size).fill(0));

    // 2. Fill the board using backtracking
    fillBoard(solution, size, subgridW, subgridH, type === 'extreme');

    // 3. Create a puzzle by removing numbers
    const board = solution.map(row => [...row]);
    const cellsToRemove = getCellsToRemove(size, difficulty);

    let removed = 0;
    const positions = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            positions.push([r, c]);
        }
    }
    // Shuffle positions
    positions.sort(() => Math.random() - 0.5);

    for (const [r, c] of positions) {
        if (removed >= cellsToRemove) break;
        board[r][c] = 0;
        removed++;
    }

    return { board, solution };
};

const fillBoard = (board: number[][], size: number, subW: number, subH: number, isExtreme: boolean): boolean => {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === 0) {
                const numbers = Array.from({ length: size }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
                for (const num of numbers) {
                    if (isValid(board, row, col, num, size, subW, subH, isExtreme)) {
                        board[row][col] = num;
                        if (fillBoard(board, size, subW, subH, isExtreme)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
};

export const isValid = (
    board: number[][],
    row: number,
    col: number,
    num: number,
    size: number,
    subW: number,
    subH: number,
    isExtreme: boolean
): boolean => {
    // Check row
    for (let x = 0; x < size; x++) {
        if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < size; x++) {
        if (board[x][col] === num) return false;
    }

    // Check subgrid
    const startRow = Math.floor(row / subH) * subH;
    const startCol = Math.floor(col / subW) * subW;
    for (let r = 0; r < subH; r++) {
        for (let c = 0; c < subW; c++) {
            if (board[startRow + r][startCol + c] === num) return false;
        }
    }

    // Check diagonals for Extreme (Sudoku-X)
    if (isExtreme) {
        // Main diagonal
        if (row === col) {
            for (let i = 0; i < size; i++) {
                if (board[i][i] === num) return false;
            }
        }
        // Anti-diagonal
        if (row + col === size - 1) {
            for (let i = 0; i < size; i++) {
                if (board[i][size - 1 - i] === num) return false;
            }
        }
    }

    return true;
};

const getCellsToRemove = (size: number, difficulty: SudokuDifficulty): number => {
    const total = size * size;
    if (size === 4) return difficulty === 'easy' ? 6 : 8;
    if (size === 6) return difficulty === 'easy' ? 12 : 18;

    switch (difficulty) {
        case 'easy': return Math.floor(total * 0.4);
        case 'medium': return Math.floor(total * 0.55);
        case 'hard': return Math.floor(total * 0.65);
        case 'expert': return Math.floor(total * 0.75);
        default: return Math.floor(total * 0.5);
    }
};
