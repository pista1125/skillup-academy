import React, { useMemo, useState, useEffect, useRef } from 'react';
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
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Single task navigation state
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  // Fullscreen state and ref
  const mainRef = useRef<HTMLElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Reset active task index when filters or search query change
  useEffect(() => {
    setActiveTaskIndex(0);
  }, [contentFilter, thinkingFilter, search]);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!mainRef.current) return;
    if (!document.fullscreenElement) {
      mainRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Sync state with browser fullscreen changes (e.g. Esc key pressed)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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

  return (
    <div className={`competency-matrix-shell ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <aside className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button className="btn-back" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            ← Vissza a főoldalra
          </button>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(false)}
            title="Menü bezárása"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
        </div>
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
            onClick={() => {
              setContentFilter(null);
              if (!thinkingFilter && !search) setIsSidebarOpen(true);
            }}
          >
            <span>Mind</span>
            <span className="count">{tasks.length}</span>
          </button>
          {contentAreas.map((c) => {
            const isActive = contentFilter === c.id;
            return (
              <button
                key={c.id}
                className={`filter-chip ${isActive ? 'active' : ''}`}
                onClick={() => {
                  const nextFilter = isActive ? null : c.id;
                  setContentFilter(nextFilter);
                  if (nextFilter) {
                    setIsSidebarOpen(false);
                  } else if (!thinkingFilter && !search) {
                    setIsSidebarOpen(true);
                  }
                }}
              >
                <span className="dot" style={{ background: c.color }} />
                <span>{c.name}</span>
                <span className="count">{countByContent[c.id] || 0}</span>
              </button>
            );
          })}
        </div>

        <div className="filter-group">
          <h3>Gondolkodási szint</h3>
          <button
            className={`filter-chip ${!thinkingFilter ? 'active' : ''}`}
            onClick={() => {
              setThinkingFilter(null);
              if (!contentFilter && !search) setIsSidebarOpen(true);
            }}
          >
            <span>Mind</span>
            <span className="count">{tasks.length}</span>
          </button>
          {thinkingLevels.map((l) => {
            const isActive = thinkingFilter === l.id;
            return (
              <button
                key={l.id}
                className={`filter-chip ${isActive ? 'active' : ''}`}
                onClick={() => {
                  const nextFilter = isActive ? null : l.id;
                  setThinkingFilter(nextFilter);
                  if (nextFilter) {
                    setIsSidebarOpen(false);
                  } else if (!contentFilter && !search) {
                    setIsSidebarOpen(true);
                  }
                }}
              >
                <span className="dot" style={{ background: l.color }} />
                <span>{l.name}</span>
                <span className="count">{countByThinking[l.id] || 0}</span>
              </button>
            );
          })}
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

      <main className="main" ref={mainRef}>
        {!isSidebarOpen && (
          <button 
            className="sidebar-toggle-open"
            onClick={() => setIsSidebarOpen(true)}
            title="Menü megnyitása"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            Menü
          </button>
        )}

        {view === 'practice' ? (
          <PracticeTests contentAreas={contentAreas} thinkingLevels={thinkingLevels} />
        ) : (<>
        <header className="main-header" style={{ paddingLeft: !isSidebarOpen ? 80 : 0 }}>
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
          
          {/* Top-right controls: dropdown select and clear button */}
          {(contentFilter || thinkingFilter || search) && filtered.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>Ugrás:</span>
                <select
                  value={activeTaskIndex}
                  onChange={(e) => setActiveTaskIndex(Number(e.target.value))}
                  className="task-select-dropdown"
                >
                  {filtered.map((t, idx) => (
                    <option key={t.id} value={idx}>
                      {idx + 1}. feladat: {t.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <button className="btn btn-secondary" onClick={() => { setContentFilter(null); setThinkingFilter(null); setSearch(''); setIsSidebarOpen(true); }}>
                Szűrők törlése
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" onClick={() => { setContentFilter(null); setThinkingFilter(null); setSearch(''); setIsSidebarOpen(true); }}>
              Szűrők törlése
            </button>
          )}
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
                    <button key={l.id} className="cell" onClick={() => { setContentFilter(c.id); setThinkingFilter(l.id); setIsSidebarOpen(false); }}>
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
              <div className="single-task-container">
                {filtered[activeTaskIndex] && (
                  <TaskCard 
                    key={filtered[activeTaskIndex].id} 
                    task={filtered[activeTaskIndex]} 
                    contentAreas={contentAreas} 
                    thinkingLevels={thinkingLevels} 
                  />
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, gap: 16, flexWrap: 'wrap' }}>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => { setContentFilter(null); setThinkingFilter(null); setSearch(''); setIsSidebarOpen(true); }}
                    style={{ padding: '10px 20px' }}
                  >
                    ← Vissza a mátrixhoz
                  </button>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={toggleFullscreen}
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                      title="Teljes képernyős mód"
                    >
                      {isFullscreen ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"/></svg>
                          <span>Kilépés</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                          <span>Teljes képernyő</span>
                        </>
                      )}
                    </button>

                    <button
                      className="btn btn-secondary"
                      disabled={activeTaskIndex === 0}
                      onClick={() => setActiveTaskIndex(prev => prev - 1)}
                      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      ← Előző
                    </button>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', padding: '0 8px' }}>
                      {activeTaskIndex + 1} / {filtered.length}
                    </span>
                    <button
                      className="btn btn-secondary"
                      disabled={activeTaskIndex === filtered.length - 1}
                      onClick={() => setActiveTaskIndex(prev => prev + 1)}
                      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      Következő →
                    </button>
                  </div>
                </div>
              </div>
            )}
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
