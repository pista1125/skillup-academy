import { COMPETENCY_TASKS } from './consolidated_tasks';

export const ALL_TASKS = COMPETENCY_TASKS;

// Function to generate a practice test consisting of 31 tasks evenly selected from the matrix
function generateEvenPracticeTest() {
  const cells: { [key: string]: any[] } = {};
  
  // Initialize cells
  const contentAreas = ['M', 'H', 'A', 'S'];
  const thinkingLevels = ['T', 'A', 'K'];
  for (const c of contentAreas) {
    for (const l of thinkingLevels) {
      cells[`${c}::${l}`] = [];
    }
  }
  
  // Group all tasks into the 12 matrix cells
  for (const task of COMPETENCY_TASKS) {
    const key = `${task.contentArea}::${task.thinkingLevel}`;
    if (cells[key]) {
      cells[key].push(task);
    }
  }
  
  // Sort tasks in each cell by id to ensure deterministic sorting
  for (const key in cells) {
    cells[key].sort((a, b) => a.id.localeCompare(b.id));
  }
  
  const selectedTasks: any[] = [];
  
  // Draw tasks evenly from each cell
  // We want exactly 31 tasks.
  // 12 cells * 2 tasks/cell = 24 tasks
  // Remaining 7 tasks will be drawn from 7 cells.
  
  // Let's draw 2 tasks from each of the 12 cells
  for (const c of contentAreas) {
    for (const l of thinkingLevels) {
      const key = `${c}::${l}`;
      const list = cells[key];
      // Draw first 2 tasks
      if (list && list.length > 0) selectedTasks.push(list[0]);
      if (list && list.length > 1) selectedTasks.push(list[1]);
    }
  }
  
  // Now we need 31 - selectedTasks.length tasks.
  // Let's draw the 3rd task from the cells until we reach 31 tasks
  let drawnCount = selectedTasks.length;
  if (drawnCount < 31) {
    // Cells list to draw from in order
    const extraDrawOrder = [
      'M::T', 'M::A', 'H::T', 'H::A', 'A::T', 'A::A', 'S::T', 
      'S::A', 'M::K', 'H::K', 'A::K', 'S::K'
    ];
    for (const key of extraDrawOrder) {
      if (drawnCount >= 31) break;
      const list = cells[key];
      if (list && list.length > 2) {
        selectedTasks.push(list[2]);
        drawnCount++;
      }
    }
  }
  
  // Double-check if we still need more (e.g. if some cells didn't have enough tasks)
  if (drawnCount < 31) {
    for (const key in cells) {
      if (drawnCount >= 31) break;
      const list = cells[key];
      // Draw any remaining tasks that are not yet selected
      for (const t of list) {
        if (drawnCount >= 31) break;
        if (!selectedTasks.some(st => st.id === t.id)) {
          selectedTasks.push(t);
          drawnCount++;
        }
      }
    }
  }
  
  // Sort the final selected tasks by ID (or keep them grouped by content area)
  selectedTasks.sort((a, b) => a.id.localeCompare(b.id));
  
  return {
    id: 'PM-01',
    title: '1. Országos Kompetenciamérés Próbateszt',
    tasks: selectedTasks
  };
}

export const ALL_PRACTICE_TESTS: any[] = [
  generateEvenPracticeTest()
];

