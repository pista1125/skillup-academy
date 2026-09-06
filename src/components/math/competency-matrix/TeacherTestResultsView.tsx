import React, { useState, useEffect, useMemo } from 'react';
import { 
  getTeacherCompetencySubmissions, 
  deleteCompetencySubmission, 
  CompetencyTestSubmission 
} from '@/services/competencySubmissionService';
import { exportCompetencySubmissionToPDF, formatAnswer } from '@/utils/competencyPdfExport';
import { toast } from 'sonner';
import { 
  BarChart3, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Users, 
  FileText, 
  RefreshCw,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const MD_PLUGINS = { remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex] };

const AREA_LABELS: { [key: string]: { name: string; color: string } } = {
  M: { name: 'Mennyiségek', color: '#2563eb' },
  H: { name: 'Hozzárendelések', color: '#0891b2' },
  A: { name: 'Alakzatok', color: '#16a34a' },
  S: { name: 'Statisztika', color: '#b45309' }
};

interface TeacherTestResultsViewProps {
  onBackToBrowse?: () => void;
}

export default function TeacherTestResultsView({ onBackToBrowse }: TeacherTestResultsViewProps) {
  const [submissions, setSubmissions] = useState<CompetencyTestSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<CompetencyTestSubmission | null>(null);
  const [modalFilter, setModalFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Filters
  const [testFilter, setTestFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'score_desc' | 'score_asc' | 'name_asc'>('date_desc');

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getTeacherCompetencySubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Hiba történt az eredmények betöltése során.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Biztosan törölni szeretnéd ezt a kitöltési eredményt?')) return;
    try {
      await deleteCompetencySubmission(id);
      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast.success('Kitöltés sikeresen törölve.');
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast.error('Hiba történt a törlés során.');
    }
  };

  // Filtered and sorted submissions
  const filteredSubmissions = useMemo(() => {
    let list = [...submissions];

    if (testFilter !== 'all') {
      list = list.filter(s => s.testId === testFilter);
    }

    if (statusFilter !== 'all') {
      list = list.filter(s => {
        const status = s.status || 'completed';
        return status === statusFilter;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s => 
        s.studentName.toLowerCase().includes(q) || 
        (s.studentEmail && s.studentEmail.toLowerCase().includes(q)) ||
        (s.testTitle && s.testTitle.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'date_desc') {
        return (new Date(b.completedAt || b.startedAt || 0).getTime()) - (new Date(a.completedAt || a.startedAt || 0).getTime());
      }
      if (sortBy === 'date_asc') {
        return (new Date(a.completedAt || a.startedAt || 0).getTime()) - (new Date(b.completedAt || b.startedAt || 0).getTime());
      }
      if (sortBy === 'score_desc') {
        return b.percentage - a.percentage;
      }
      if (sortBy === 'score_asc') {
        return a.percentage - b.percentage;
      }
      if (sortBy === 'name_asc') {
        return a.studentName.localeCompare(b.studentName);
      }
      return 0;
    });

    return list;
  }, [submissions, testFilter, statusFilter, searchQuery, sortBy]);

  // Summary statistics
  const stats = useMemo(() => {
    const totalCount = submissions.length;
    if (totalCount === 0) return { totalCount: 0, completedCount: 0, inProgressCount: 0, uniqueStudents: 0, avgPercentage: 0, maxScore: 0 };

    const completedCount = submissions.filter(s => s.status === 'completed' || !s.status).length;
    const inProgressCount = submissions.filter(s => s.status === 'in_progress').length;
    const uniqueStudents = new Set(submissions.map(s => s.userId || s.studentEmail || s.studentName)).size;
    const avgPercentage = Math.round(submissions.reduce((acc, s) => acc + (s.percentage || 0), 0) / totalCount);
    const maxScore = Math.max(...submissions.map(s => s.score || 0));

    return { totalCount, completedCount, inProgressCount, uniqueStudents, avgPercentage, maxScore };
  }, [submissions]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}p ${secs}mp`;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '—';
    try {
      return new Date(isoString).toLocaleString('hu-HU', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', paddingBottom: 60 }}>
      {/* Header */}
      <div className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2>📊 Diákok Próbamérés Eredményei</h2>
            <span style={{ fontSize: 12, fontWeight: 700, background: '#dbeafe', color: '#1d4ed8', padding: '3px 8px', borderRadius: 6 }}>
              Tanári Nézet
            </span>
          </div>
          <div className="meta">
            A 10 országos kompetenciamérés próbateszt kitöltéseinek valós idejű tanári összesítése, értékelése és PDF exportja.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button 
            className="btn btn-secondary" 
            onClick={fetchSubmissions} 
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Frissítés</span>
          </button>
          {onBackToBrowse && (
            <button className="btn btn-secondary" onClick={onBackToBrowse}>
              ← Vissza
            </button>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            <FileText className="w-4 h-4 text-blue-500" />
            Összes Kitöltés
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>
            {stats.totalCount} <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>db</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'flex', gap: 8 }}>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>🟢 {stats.completedCount} befejezett</span>
            {stats.inProgressCount > 0 && (
              <span style={{ color: '#d97706', fontWeight: 600 }}>🟡 {stats.inProgressCount} folyamatban</span>
            )}
          </div>
        </div>

        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            <Users className="w-4 h-4 text-indigo-500" />
            Diákok Száma
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>
            {stats.uniqueStudents} <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>fő</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Egyedi azonosított tanuló
          </div>
        </div>

        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            Átlagos Eredmény
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: stats.avgPercentage >= 70 ? '#16a34a' : stats.avgPercentage >= 50 ? '#d97706' : '#dc2626' }}>
            {stats.avgPercentage}%
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Minden rögzített feladatsorra
          </div>
        </div>

        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            <Award className="w-4 h-4 text-amber-500" />
            Legjobb Pontszám
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>
            {stats.maxScore} <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>/ 31 pont</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Maximálisan elért pont
          </div>
        </div>
      </div>

      {/* Filter and search bar */}
      <div style={{ 
        background: 'var(--bg-elev)', 
        border: '1px solid var(--border)', 
        borderRadius: 'var(--radius)', 
        padding: '16px 20px', 
        marginBottom: 20, 
        display: 'flex', 
        gap: 16, 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow)' 
      }}>
        {/* Test Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>Próbateszt:</label>
          <select 
            value={testFilter} 
            onChange={(e) => setTestFilter(e.target.value)}
            className="task-select-dropdown"
            style={{ maxWidth: 200 }}
          >
            <option value="all">Minden próbamérés</option>
            {Array.from({ length: 10 }).map((_, i) => {
              const num = String(i + 1).padStart(2, '0');
              return (
                <option key={num} value={`PM-${num}`}>
                  {i + 1}. Próbateszt (PM-{num})
                </option>
              );
            })}
          </select>
        </div>

        {/* Status Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>Állapot:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="task-select-dropdown"
            style={{ maxWidth: 190 }}
          >
            <option value="all">Minden állapot ({stats.totalCount})</option>
            <option value="completed">🟢 Befejezett ({stats.completedCount})</option>
            <option value="in_progress">🟡 Folyamatban / Megszakadt ({stats.inProgressCount})</option>
          </select>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200, maxWidth: 320 }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Keresés diák neve vagy emailje..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                fontSize: 13,
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>Rendezés:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="task-select-dropdown"
            style={{ maxWidth: 180 }}
          >
            <option value="date_desc">Legújabb elöl</option>
            <option value="date_asc">Legrégebbi elöl</option>
            <option value="score_desc">Legmagasabb pont</option>
            <option value="score_asc">Legalacsonyabb pont</option>
            <option value="name_asc">Diák neve (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Submissions List */}
      {loading ? (
        <div className="empty-state" style={{ padding: 48 }}>
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-500" />
          <div>Eredmények betöltése a felhőből...</div>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="empty-state" style={{ padding: 48 }}>
          <BookOpen className="w-10 h-10 mx-auto mb-3 text-slate-400" />
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
            {submissions.length === 0 ? 'Még nem érkezett kitöltés' : 'Nincs a szűrésnek megfelelő kitöltés'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {submissions.length === 0 
              ? 'Amikor a diákjaid elkezdenek vagy beküldenek egy próbamérést, az eredményeik itt fognak megjelenni.'
              : 'Próbáld meg módosítani a fenti szűrőket vagy a keresési feltételt.'}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredSubmissions.map((sub) => {
            const isInProgress = sub.status === 'in_progress';
            const answeredCount = sub.answeredCount ?? Object.keys(sub.answers || {}).length;
            const isGood = sub.percentage >= 70;
            const isMedium = sub.percentage >= 50 && sub.percentage < 70;
            const badgeBg = isInProgress ? '#fef3c7' : isGood ? '#dcfce7' : isMedium ? '#fef3c7' : '#fee2e2';
            const badgeColor = isInProgress ? '#b45309' : isGood ? '#15803d' : isMedium ? '#b45309' : '#b91c1c';

            return (
              <div 
                key={sub.id}
                onClick={() => setSelectedSubmission(sub)}
                style={{
                  background: 'var(--bg-elev)',
                  border: `1px solid ${isInProgress ? '#fcd34d' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                className="hover:border-blue-300 hover:shadow-md"
              >
                {/* Left: Student & Test info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 240 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: isInProgress ? '#fffbeb' : '#eff6ff',
                    color: isInProgress ? '#d97706' : '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 16,
                    border: `1.5px solid ${isInProgress ? '#fde68a' : '#bfdbfe'}`,
                    flexShrink: 0
                  }}>
                    {sub.studentName ? sub.studentName.charAt(0).toUpperCase() : '?'}
                  </div>

                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{sub.studentName}</span>
                      {isInProgress && (
                        <span style={{ 
                          fontSize: 11, 
                          fontWeight: 700, 
                          background: '#fef3c7', 
                          color: '#b45309', 
                          padding: '2px 7px', 
                          borderRadius: 4, 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: 4 
                        }}>
                          <Clock className="w-3 h-3" />
                          Folyamatban ({answeredCount}/{sub.totalTasks})
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {sub.studentEmail || 'Nincs email megadva'}
                    </div>
                  </div>
                </div>

                {/* Middle: Test details */}
                <div style={{ minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ 
                      fontSize: 11, 
                      fontWeight: 800, 
                      background: '#e0f2fe', 
                      color: '#0369a1', 
                      padding: '2px 6px', 
                      borderRadius: 4 
                    }}>
                      {sub.testId}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                      {sub.testTitle || 'Kompetenciamérés'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock className="w-3.5 h-3.5" />
                      {formatDuration(sub.durationSeconds)}
                    </span>
                    <span>·</span>
                    <span>{formatDate(sub.completedAt || sub.startedAt)}</span>
                  </div>
                </div>

                {/* Score & Breakdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    padding: '8px 14px',
                    borderRadius: 10,
                    background: badgeBg,
                    color: badgeColor,
                    textAlign: 'center',
                    minWidth: 100,
                    border: isInProgress ? '1px dashed #f59e0b' : 'none'
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1 }}>
                      {sub.percentage}%
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, marginTop: 2 }}>
                      {isInProgress ? `${answeredCount}/${sub.totalTasks} kész` : `${sub.score} / ${sub.totalTasks} pont`}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedSubmission(sub); }}
                      className="btn btn-secondary"
                      style={{ padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                      title="Részletes feladatlap megtekintése"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Részletek</span>
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); exportCompetencySubmissionToPDF(sub); }}
                      className="btn btn-primary"
                      style={{ padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                      title="Kiértékelt feladatlap letöltése PDF-ben"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={(e) => handleDelete(sub.id!, e)}
                      className="btn btn-secondary text-red-500 hover:text-red-700 hover:bg-red-50"
                      style={{ padding: '8px 10px', fontSize: 12 }}
                      title="Eredmény törlése"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Modal */}
      {selectedSubmission && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: 16
        }}>
          <div style={{
            background: 'var(--bg-elev)',
            borderRadius: 'var(--radius)',
            maxWidth: 960,
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              background: 'var(--bg)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ background: '#2563eb', color: '#fff', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
                    {selectedSubmission.testId}
                  </span>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>
                    {selectedSubmission.studentName} — {selectedSubmission.testTitle}
                  </h3>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Email: {selectedSubmission.studentEmail || '—'} · Kitöltve: {formatDate(selectedSubmission.completedAt || selectedSubmission.startedAt)} · Időtartam: {formatDuration(selectedSubmission.durationSeconds)}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  className="btn btn-primary"
                  onClick={() => exportCompetencySubmissionToPDF(selectedSubmission)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13 }}
                >
                  <Download className="w-4 h-4" />
                  <span>PDF Letöltés</span>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedSubmission(null)}
                  style={{ padding: '8px 14px', fontSize: 13 }}
                >
                  Bezárás ✕
                </button>
              </div>
            </div>

            {/* In-progress warning banner */}
            {selectedSubmission.status === 'in_progress' && (
              <div style={{
                padding: '12px 24px',
                background: '#fffbeb',
                borderBottom: '1px solid #fde68a',
                color: '#92400e',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Folyamatban / Félbeszakadt teszt:</strong> A diák eddig {selectedSubmission.answeredCount ?? Object.keys(selectedSubmission.answers || {}).length} / {selectedSubmission.totalTasks} feladatot válaszolt meg. Az alábbiakban a valós időben mentett válaszok láthatók.
                </span>
              </div>
            )}

            {/* Modal Subheader / Performance stats */}
            <div style={{
              padding: '16px 24px',
              background: 'var(--bg-elev)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16
            }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  background: selectedSubmission.percentage >= 70 ? '#dcfce7' : selectedSubmission.percentage >= 50 ? '#fef3c7' : '#fee2e2',
                  color: selectedSubmission.percentage >= 70 ? '#15803d' : selectedSubmission.percentage >= 50 ? '#b45309' : '#b91c1c',
                  fontWeight: 800,
                  fontSize: 16
                }}>
                  {selectedSubmission.score} / {selectedSubmission.totalTasks} pont ({selectedSubmission.percentage}%)
                </div>

                {/* Area breakdown pills */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['M', 'H', 'A', 'S'].map(area => {
                    const stats = selectedSubmission.breakdownByArea?.[area] || { total: 0, correct: 0 };
                    return (
                      <span key={area} style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--bg)', border: '1px solid var(--border)' }}>
                        {AREA_LABELS[area]?.name}: {stats.correct}/{stats.total}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Modal Questions filter */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => setModalFilter('all')}
                  className={`btn ${modalFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: 11 }}
                >
                  Mind ({Object.keys(selectedSubmission.answers || {}).length})
                </button>
                <button
                  onClick={() => setModalFilter('wrong')}
                  className={`btn ${modalFilter === 'wrong' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: 11 }}
                >
                  Csak hibás ({Object.values(selectedSubmission.answers || {}).filter(a => !a.isCorrect).length})
                </button>
                <button
                  onClick={() => setModalFilter('correct')}
                  className={`btn ${modalFilter === 'correct' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: 11 }}
                >
                  Csak helyes ({Object.values(selectedSubmission.answers || {}).filter(a => a.isCorrect).length})
                </button>
              </div>
            </div>

            {/* Modal Body: Question list */}
            <div style={{ padding: 24, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.values(selectedSubmission.answers || {})
                .filter(ans => {
                  if (modalFilter === 'wrong') return !ans.isCorrect;
                  if (modalFilter === 'correct') return ans.isCorrect;
                  return true;
                })
                .map((ans, idx) => {
                  const isCorrect = ans.isCorrect;
                  return (
                    <div 
                      key={ans.taskId || idx}
                      style={{
                        border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                        background: isCorrect ? '#f0fdf4' : '#fef2f2',
                        borderRadius: 10,
                        padding: 16
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            background: isCorrect ? '#16a34a' : '#dc2626',
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: 6
                          }}>
                            {ans.taskId}
                          </span>
                          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
                            {ans.title}
                          </span>
                          <span style={{ fontSize: 11, background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4 }}>
                            {AREA_LABELS[ans.contentArea]?.name || ans.contentArea}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 13, color: isCorrect ? '#15803d' : '#b91c1c' }}>
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Helyes válasz (+1 pont)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              <span>Hibás válasz (0 pont)</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Question Text */}
                      <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 12, lineHeight: 1.5 }}>
                        <ReactMarkdown {...MD_PLUGINS}>{ans.question}</ReactMarkdown>
                      </div>

                      {/* Answers comparison */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 12,
                        background: 'var(--bg-elev)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 13,
                        marginBottom: 10
                      }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: 11, fontWeight: 600 }}>
                            Diák válasza:
                          </span>
                          <strong style={{ color: isCorrect ? '#15803d' : '#b91c1c', fontSize: 14 }}>
                            {formatAnswer(ans.selectedAnswer)}
                          </strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: 11, fontWeight: 600 }}>
                            Helyes válasz:
                          </span>
                          <strong style={{ color: '#15803d', fontSize: 14 }}>
                            {formatAnswer(ans.correctAnswer)}
                          </strong>
                        </div>
                      </div>

                      {/* Solution */}
                      {ans.solution && (
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.7)',
                          borderLeft: '3px solid #3b82f6',
                          borderRadius: '0 8px 8px 0',
                          padding: '10px 14px',
                          fontSize: 12,
                          color: '#334155'
                        }}>
                          <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>
                            Megoldás levezetése:
                          </div>
                          <ReactMarkdown {...MD_PLUGINS}>{ans.solution}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
