import React, { useMemo, useState } from 'react';
import TaskCard from './TaskCard';
import PracticeTests from './PracticeTests';
import { CONTENT_AREAS, THINKING_LEVELS } from './taxonomy';
import { ALL_TASKS } from './loader';
import '@/styles/competency-matrix.css';
import 'katex/dist/katex.min.css';

export default function CompetencyMatrixHub({ onBack }: { onBack: () => void }) {
  const [tasks] = useState(ALL_TASKS);
  const taxonomy = { contentAreas: CONTENT_AREAS, thinkingLevels: THINKING_LEVELS };
  const [view, setView] = useState('browse'); // 'browse' | 'practice'
  const [contentFilter, setContentFilter] = useState<string | null>(null);
  const [thinkingFilter, setThinkingFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = tasks;
    if (contentFilter) list = list.filter((t) => t.contentArea === contentFilter);
    if (thinkingFilter) list = list.filter((t) => t.thinkingLevel === thinkingFilter);
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(s) ||
          t.question.toLowerCase().includes(s) ||
          (t.keywords || []).some((k) => k.toLowerCase().includes(s))
      );
    }
    return list;
  }, [tasks, contentFilter, thinkingFilter, search]);

  const countByContent = useMemo(() => {
    const c = {};
    for (const t of tasks) c[t.contentArea] = (c[t.contentArea] || 0) + 1;
    return c;
  }, [tasks]);
  const countByThinking = useMemo(() => {
    const c = {};
    for (const t of tasks) c[t.thinkingLevel] = (c[t.thinkingLevel] || 0) + 1;
    return c;
  }, [tasks]);
  const countMatrix = useMemo(() => {
    const m = {};
    for (const t of tasks) {
      const k = `${t.contentArea}::${t.thinkingLevel}`;
      m[k] = (m[k] || 0) + 1;
    }
    return m;
  }, [tasks]);

  const { contentAreas, thinkingLevels } = taxonomy;

  const handleHome = () => {
    // This will be provided via props if needed, but for now we just use a local clear
    setContentFilter(null);
    setThinkingFilter(null);
    setSearch('');
  };


  return (
    <div className="competency-matrix-shell">
      <aside className="sidebar">
        <button className="btn-back" onClick={onBack} style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
          ← Vissza a főoldalra
        </button>
        <h1>Kompetencia 6.</h1>
        <div className="subtitle">Matematika feladatok — OKM 2021 tartalmi keret alapján</div>

        <div className="filter-group">
          <h3>Nézet</h3>
          <button
            className={`filter-chip ${view === 'browse' ? 'active' : ''}`}
            onClick={() => setView('browse')}
          >
            <span>📚 Feladatböngésző</span>
            <span className="count">{tasks.length}</span>
          </button>
          <button
            className={`filter-chip ${view === 'practice' ? 'active' : ''}`}
            onClick={() => setView('practice')}
          >
            <span>📝 Próbamérések</span>
            <span className="count">10</span>
          </button>
        </div>

        {view === 'browse' && (
        <div className="filter-group">
          <h3>Keresés</h3>
          <input
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cím, kulcsszó..."
          />
        </div>
        )}

        {view === 'browse' && (<>
        <div className="filter-group">
          <h3>Tartalmi terület</h3>
          <button
            className={`filter-chip ${!contentFilter ? 'active' : ''}`}
            onClick={() => setContentFilter(null)}
          >
            <span>Mind</span>
            <span className="count">{tasks.length}</span>
          </button>
          {contentAreas.map((c) => (
            <button
              key={c.id}
              className={`filter-chip ${contentFilter === c.id ? 'active' : ''}`}
              onClick={() => setContentFilter(contentFilter === c.id ? null : c.id)}
            >
              <span className="dot" style={{ background: c.color }} />
              <span>{c.name}</span>
              <span className="count">{countByContent[c.id] || 0}</span>
            </button>
          ))}
        </div>

        <div className="filter-group">
          <h3>Gondolkodási szint</h3>
          <button
            className={`filter-chip ${!thinkingFilter ? 'active' : ''}`}
            onClick={() => setThinkingFilter(null)}
          >
            <span>Mind</span>
            <span className="count">{tasks.length}</span>
          </button>
          {thinkingLevels.map((l) => (
            <button
              key={l.id}
              className={`filter-chip ${thinkingFilter === l.id ? 'active' : ''}`}
              onClick={() => setThinkingFilter(thinkingFilter === l.id ? null : l.id)}
            >
              <span className="dot" style={{ background: l.color }} />
              <span>{l.name}</span>
              <span className="count">{countByThinking[l.id] || 0}</span>
            </button>
          ))}
        </div>

        <div className="filter-group">
          <h3>Matematikai ismeretek</h3>
          <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
            A feladatok az Országos Kompetenciamérés <strong>6. évfolyamos</strong>
            {' '}matematika tartalmi keretére épülnek. A mátrix {contentAreas.length} tartalmi területet
            {' '}és {thinkingLevels.length} gondolkodási szintet fed le.
          </div>
        </div>
        </>)}
      </aside>

      <main className="main">
        {view === 'practice' ? (
          <PracticeTests contentAreas={contentAreas} thinkingLevels={thinkingLevels} />
        ) : (<>
        <header className="main-header">
          <div>
            <h2>
              {contentFilter || thinkingFilter
                ? filtered.length + ' feladat'
                : 'Összes feladat'}
            </h2>
            <div className="meta">
              {contentFilter && `Tartalmi: ${contentAreas.find((c) => c.id === contentFilter)?.name}. `}
              {thinkingFilter && `Gondolkodási: ${thinkingLevels.find((l) => l.id === thinkingFilter)?.name}. `}
              {!contentFilter && !thinkingFilter && `${tasks.length} feladat a teljes mátrixban.`}
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => { setContentFilter(null); setThinkingFilter(null); setSearch(''); }}>
            Szűrők törlése
          </button>
        </header>

        {/* Show matrix OR Task list (not both at once) */}
        {(!contentFilter && !thinkingFilter && !search) ? (
          <div className="matrix">
            <div className="head top-head" />
            {thinkingLevels.map((l) => (
              <div key={l.id} className="head">{l.name}</div>
            ))}
            {contentAreas.map((c) => (
              <React.Fragment key={c.id}>
                <div className="row-head">
                  <span className="dot" style={{ background: c.color, width: 12, height: 12, borderRadius: '50%' }} />
                  {c.name}
                </div>
                {thinkingLevels.map((l) => {
                  const cnt = countMatrix[`${c.id}::${l.id}`] || 0;
                  return (
                    <button key={l.id} className="cell" onClick={() => { setContentFilter(c.id); setThinkingFilter(l.id); }}>
                      <div className="count" style={{ color: cnt > 0 ? c.color : '#cbd5e1' }}>{cnt}</div>
                      <div className="cell-desc">{cnt} feladat</div>
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <>
            {filtered.length === 0 ? (
              <div className="empty-state">
                Ezekhez a szűrőkhöz nincs feladat. Próbálj másikat választani.
              </div>
            ) : (
              <div className="task-list">
                {filtered.map((t) => (
                  <TaskCard key={t.id} task={t} contentAreas={contentAreas} thinkingLevels={thinkingLevels} />
                ))}
              </div>
            )}
            
            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setContentFilter(null); setThinkingFilter(null); setSearch(''); }}
                style={{ padding: '12px 24px', fontSize: 16 }}
              >
                ← Vissza a mátrixhoz
              </button>
            </div>
          </>
        )}
        </>)}
      </main>
    </div>
  );
}

function FullMessage({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 40, color: '#64748b', textAlign: 'center', maxWidth: 600, margin: '80px auto' }}>
      {children}
    </div>
  );
}
