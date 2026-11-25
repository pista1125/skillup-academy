import { describe, expect, it } from 'vitest';
import { fold, highlight, indexEntry, parseQuery, prettyTitle, searchEntries } from '@/lib/search/search';
import { getBaseIndex } from '@/lib/search/searchIndex';

describe('keresés – segédfüggvények', () => {
  it('ékezet- és kisbetű-független', () => {
    expect(fold('Függvények ŐSZ Űr')).toBe('fuggvenyek osz ur');
  });

  it('a csupa nagybetűs címeket olvashatóvá teszi, a római számot megtartja', () => {
    expect(prettyTitle('V. HOZZÁRENDELÉSEK, FÜGGVÉNYEK')).toBe('V. Hozzárendelések, függvények');
    expect(prettyTitle('II. TÖRTEK')).toBe('II. Törtek');
    expect(prettyTitle('Törtek összeadása')).toBe('Törtek összeadása');
  });

  it('az évfolyamszámot külön veszi ki a lekérdezésből', () => {
    expect(parseQuery('törtek 6')).toEqual({ tokens: ['tortek'], gradeNum: 6 });
    expect(parseQuery('6. osztály')).toEqual({ tokens: [], gradeNum: 6 });
    expect(parseQuery('100 ig')).toEqual({ tokens: ['100', 'ig'], gradeNum: null });
  });

  it('kiemeli a találatot az eredeti, ékezetes szövegben', () => {
    const parts = highlight('Függvények ábrázolása', 'fugg');
    expect(parts[0]).toEqual({ text: 'Függ', match: true });
    expect(parts[1].match).toBe(false);
  });

  it('minden szónak illeszkednie kell, a címbeli találat erősebb', () => {
    const entries = [
      indexEntry({ id: 'a', kind: 'lesson', title: 'Törtek szorzása', path: '/a', keywords: '' }),
      indexEntry({ id: 'b', kind: 'lesson', title: 'Szorzás', path: '/b', keywords: 'törtek' }),
      indexEntry({ id: 'c', kind: 'lesson', title: 'Osztás', path: '/c' }),
    ];
    const r = searchEntries(entries, 'tort szor');
    expect(r.map((e) => e.id)).toEqual(['a', 'b']);
  });
});

describe('keresés – valódi index', () => {
  const index = getBaseIndex();

  it('tartalmazza az évfolyamokat, témaköröket, leckéket, eszközöket és játékokat', () => {
    const kinds = new Set(index.map((e) => e.kind));
    for (const k of ['grade', 'topic', 'lesson', 'tool', 'game', 'competency']) expect(kinds.has(k as never)).toBe(true);
    expect(index.filter((e) => e.kind === 'lesson').length).toBeGreaterThan(500);
  });

  it('nincs ismétlődő azonosító, és minden lecke szekció-mélylinket kap', () => {
    const ids = index.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of index.filter((x) => x.kind === 'lesson')) expect(e.path).toMatch(/\?szekcio=/);
  });

  it('„fugg” ékezet nélkül is megtalálja a függvényeket', () => {
    const r = searchEntries(index, 'fugg');
    expect(r.length).toBeGreaterThan(0);
    expect(r.slice(0, 5).every((e) => fold(e.title + ' ' + (e.subtitle ?? '')).includes('fugg'))).toBe(true);
  });

  it('„törtek 6” csak a 6. osztály (vagy évfolyam nélküli) tartalmát adja, élen a 6-os témakörrel', () => {
    const r = searchEntries(index, 'törtek 6');
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((e) => e.gradeNum == null || e.gradeNum === 6)).toBe(true);
    expect(r[0].gradeNum).toBe(6);
  });

  it('„6. osztály” az évfolyamot adja elsőnek', () => {
    const r = searchEntries(index, '6. osztály');
    expect(r[0].kind).toBe('grade');
    expect(r[0].path).toBe('/6-osztaly');
  });

  it('eszközt és játékot is talál', () => {
    expect(searchEntries(index, 'szamologep').some((e) => e.kind === 'tool')).toBe(true);
    expect(searchEntries(index, 'sakk').some((e) => e.kind === 'game')).toBe(true);
  });
});
