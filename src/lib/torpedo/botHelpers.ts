export const COLS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
export const ROWS = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];


export const SHIP_TYPES = [
  { size: 4, count: 1 },
  { size: 3, count: 2 },
  { size: 2, count: 3 },
  { size: 1, count: 4 },
];

export interface BotShipCell {
  x: number;
  y: number;
}

export interface BotShip {
  size: number;
  orientation: 'h' | 'v';
  cells: BotShipCell[];
}

export interface BotMove {
  x: number;
  y: number;
  hit: boolean;
  timestamp: string;
}

/**
 * Checks if a ship placement is valid (no overlap, and must not touch other ships, even diagonally).
 */
export const isValidPlacementForBot = (
  x: number,
  y: number,
  size: number,
  orient: 'h' | 'v',
  ships: BotShip[]
): BotShipCell[] | null => {
  const cells: BotShipCell[] = [];
  const colIdx = COLS.indexOf(x);
  const rowIdx = ROWS.indexOf(y);

  for (let i = 0; i < size; i++) {
    let curX, curY;
    if (orient === 'h') {
      if (colIdx + i >= COLS.length) return null;
      curX = COLS[colIdx + i];
      curY = y;
    } else {
      if (rowIdx + i >= ROWS.length) return null;
      curX = x;
      curY = ROWS[rowIdx + i];
    }
    cells.push({ x: curX, y: curY });
  }

  // Check overlap AND touching (distance between indices <= 1)
  for (const cell of cells) {
    for (const ship of ships) {
      for (const sCell of ship.cells) {
        const dx = Math.abs(COLS.indexOf(cell.x) - COLS.indexOf(sCell.x));
        const dy = Math.abs(ROWS.indexOf(cell.y) - ROWS.indexOf(sCell.y));
        if (dx <= 1 && dy <= 1) return null; // Too close or overlapping
      }
    }
  }

  return cells;
};

/**
 * Generates a full valid flotta of ships for the bot.
 */
export const generateBotShips = (): BotShip[] => {
  let newShips: BotShip[] = [];
  const allShipSizes = SHIP_TYPES.flatMap(t => Array(t.count).fill(t.size)).sort((a, b) => b - a);

  for (const size of allShipSizes) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
      const x = COLS[Math.floor(Math.random() * COLS.length)];
      const y = ROWS[Math.floor(Math.random() * ROWS.length)];
      const orient = Math.random() > 0.5 ? 'h' : 'v';
      const cells = isValidPlacementForBot(x, y, size, orient, newShips);
      if (cells) {
        newShips.push({ size, orientation: orient, cells });
        placed = true;
      }
      attempts++;
    }
    if (!placed) {
      // Retry whole generation if stuck
      return generateBotShips();
    }
  }
  return newShips;
};

/**
 * Helper to get adjacent cells of a coordinate.
 */
const getAdjacentCells = (x: number, y: number): { x: number; y: number }[] => {
  const colIdx = COLS.indexOf(x);
  const rowIdx = ROWS.indexOf(y);
  const adjacent = [];

  // North
  if (rowIdx - 1 >= 0) adjacent.push({ x, y: ROWS[rowIdx - 1] });
  // South
  if (rowIdx + 1 < ROWS.length) adjacent.push({ x, y: ROWS[rowIdx + 1] });
  // West
  if (colIdx - 1 >= 0) adjacent.push({ x: COLS[colIdx - 1], y });
  // East
  if (colIdx + 1 < COLS.length) adjacent.push({ x: COLS[colIdx + 1], y });

  return adjacent;
};

/**
 * Calculates the next shot coordinate for the bot.
 */
export const getBotNextMove = (
  difficulty: 'easy' | 'medium' | 'hard',
  playerShips: BotShip[],
  botMoves: BotMove[]
): { x: number; y: number } => {
  // 1. Compile list of all possible cells and which ones are shot
  const allPossible: { x: number; y: number }[] = [];
  for (const x of COLS) {
    for (const y of ROWS) {
      allPossible.push({ x, y });
    }
  }

  const hasBeenShot = (x: number, y: number) =>
    botMoves.some(m => m.x === x && m.y === y);

  const unshotCells = allPossible.filter(c => !hasBeenShot(c.x, c.y));
  if (unshotCells.length === 0) {
    // Should never happen, but fallback
    return { x: 0, y: 0 };
  }

  // Helper to find player ship cell status
  const getDamagedButNotSunkShips = () => {
    return playerShips.filter(ship => {
      const hits = ship.cells.filter(cell =>
        botMoves.some(m => m.x === cell.x && m.y === cell.y && m.hit)
      );
      return hits.length > 0 && hits.length < ship.size;
    });
  };

  // --- EASY DIFFICULTY ---
  if (difficulty === 'easy') {
    return unshotCells[Math.floor(Math.random() * unshotCells.length)];
  }

  // --- MEDIUM & HARD LOGIC FOR TARGETING DAMAGED SHIPS ---
  const damagedShips = getDamagedButNotSunkShips();

  if (damagedShips.length > 0) {
    // Pick the first damaged ship we find
    const targetShip = damagedShips[0];
    const shipHits = targetShip.cells.filter(cell =>
      botMoves.some(m => m.x === cell.x && m.y === cell.y && m.hit)
    );

    if (shipHits.length === 1 || difficulty === 'medium') {
      // For Medium or if there's only 1 hit: find adjacent cells to any hits
      const candidates: { x: number; y: number }[] = [];
      for (const hit of shipHits) {
        const adj = getAdjacentCells(hit.x, hit.y);
        for (const cell of adj) {
          if (!hasBeenShot(cell.x, cell.y) && !candidates.some(c => c.x === cell.x && c.y === cell.y)) {
            candidates.push(cell);
          }
        }
      }
      if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
      }
    } else {
      // HARD DIFFICULTY with 2+ hits: Determine alignment and target ends
      const isHorizontal = shipHits.every(h => h.y === shipHits[0].y);
      const candidates: { x: number; y: number }[] = [];

      if (isHorizontal) {
        // Sort hits by x-axis index
        shipHits.sort((a, b) => COLS.indexOf(a.x) - COLS.indexOf(b.x));
        const firstIdx = COLS.indexOf(shipHits[0].x);
        const lastIdx = COLS.indexOf(shipHits[shipHits.length - 1].x);
        const y = shipHits[0].y;

        // Try left end
        if (firstIdx - 1 >= 0) {
          const leftCell = { x: COLS[firstIdx - 1], y };
          if (!hasBeenShot(leftCell.x, leftCell.y)) candidates.push(leftCell);
        }
        // Try right end
        if (lastIdx + 1 < COLS.length) {
          const rightCell = { x: COLS[lastIdx + 1], y };
          if (!hasBeenShot(rightCell.x, rightCell.y)) candidates.push(rightCell);
        }
      } else {
        // Vertical: Sort hits by y-axis index
        shipHits.sort((a, b) => ROWS.indexOf(a.y) - ROWS.indexOf(b.y));
        const firstIdx = ROWS.indexOf(shipHits[0].y);
        const lastIdx = ROWS.indexOf(shipHits[shipHits.length - 1].y);
        const x = shipHits[0].x;

        // Try top end (lower rowIdx in ROWS means higher y value e.g. 5,4,3...)
        if (firstIdx - 1 >= 0) {
          const topCell = { x, y: ROWS[firstIdx - 1] };
          if (!hasBeenShot(topCell.x, topCell.y)) candidates.push(topCell);
        }
        // Try bottom end
        if (lastIdx + 1 < ROWS.length) {
          const bottomCell = { x, y: ROWS[lastIdx + 1] };
          if (!hasBeenShot(bottomCell.x, bottomCell.y)) candidates.push(bottomCell);
        }
      }

      if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
      }

      // Fallback if ends are blocked (e.g. adjacent ships or border)
      const fallbackCandidates: { x: number; y: number }[] = [];
      for (const hit of shipHits) {
        const adj = getAdjacentCells(hit.x, hit.y);
        for (const cell of adj) {
          if (!hasBeenShot(cell.x, cell.y)) fallbackCandidates.push(cell);
        }
      }
      if (fallbackCandidates.length > 0) {
        return fallbackCandidates[Math.floor(Math.random() * fallbackCandidates.length)];
      }
    }
  }

  // --- HUNT PHASE (No damaged ships) ---

  // For Hard mode, add a 10% chance to sonar scan / cheat to find a ship cell
  if (difficulty === 'hard') {
    if (Math.random() < 0.10) {
      // Find all player ship cells that are not hit yet
      const unhitShipCells: { x: number; y: number }[] = [];
      for (const ship of playerShips) {
        for (const cell of ship.cells) {
          if (!hasBeenShot(cell.x, cell.y)) {
            unhitShipCells.push(cell);
          }
        }
      }
      if (unhitShipCells.length > 0) {
        return unhitShipCells[Math.floor(Math.random() * unhitShipCells.length)];
      }
    }

    // Otherwise, hunt using checkerboard parity pattern
    const checkerboardUnshot = unshotCells.filter(cell => {
      const colIdx = COLS.indexOf(cell.x);
      const rowIdx = ROWS.indexOf(cell.y);
      return (colIdx + rowIdx) % 2 === 0;
    });

    if (checkerboardUnshot.length > 0) {
      return checkerboardUnshot[Math.floor(Math.random() * checkerboardUnshot.length)];
    }
  }

  // Fallback (for medium, or hard when checkerboard is depleted)
  return unshotCells[Math.floor(Math.random() * unshotCells.length)];
};
