const taskModules = import.meta.glob('./tasks/**/*.js', { eager: true });
export const ALL_TASKS = Object.values(taskModules).map((mod: any) => mod.default);

const testModules = import.meta.glob('./practice-tests/**/*.js', { eager: true });

function buildPracticeTests() {
  const testsMap: Record<string, any> = {};
  
  for (const [path, mod] of Object.entries(testModules)) {
    const parts = path.split('/');
    const folder = parts[parts.length - 2];
    const file = parts[parts.length - 1];
    const data = (mod as any).default;

    if (!testsMap[folder]) {
      testsMap[folder] = { id: folder, title: `${folder}. próbamérés`, tasks: [] };
    }

    if (file === 'meta.js') {
      testsMap[folder].title = data.title || testsMap[folder].title;
    } else {
      testsMap[folder].tasks.push(data);
    }
  }

  return Object.values(testsMap)
    .map((test: any) => ({
      ...test,
      tasks: test.tasks.sort((a: any, b: any) => a.id.localeCompare(b.id))
    }))
    .sort((a: any, b: any) => a.id.localeCompare(b.id));
}

export const ALL_PRACTICE_TESTS = buildPracticeTests();
