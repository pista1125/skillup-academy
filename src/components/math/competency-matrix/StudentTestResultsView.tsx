import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  subscribeStudentCompetencySubmissions, 
  getStudentCompetencySubmissions,
  CompetencyTestSubmission 
} from '@/services/competencySubmissionService';
import { exportCompetencySubmissionToPDF, formatAnswer } from '@/utils/competencyPdfExport';
import { toast } from 'sonner';
import { 
  BarChart3, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Award, 
  FileText, 
  RefreshCw, 
  Play, 
  ArrowRight, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import MathView from './MathView';

const AREA_LABELS: { [key: string]: { name: string; color: string } } = {
  M: { name: 'Mennyiségek', color: '#2563eb' },
  H: { name: 'Hozzárendelések', color: '#0891b2' },
  A: { name: 'Alakzatok', color: '#16a34a' },
  S: { name: 'Statisztika', color: '#b45309' }
};

const LEVEL_LABELS: { [key: string]: { name: string; color: string } } = {
  T: { name: 'Tudás', color: '#6366f1' },
  A: { name: 'Alkalmazás', color: '#0ea5e9' },
  K: { name: 'Konstruálás', color: '#8b5cf6' }
};

interface StudentTestResultsViewProps {
  onBackToBrowse?: () => void;
  onSelectPractice?: (testId?: string) => void;
}

export default function StudentTestResultsView({ onBackToBrowse, onSelectPractice }: StudentTestResultsViewProps) {
  const { user, profile } = useAuth();

  const [submissions, setSubmissions] = useState<CompetencyTestSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<CompetencyTestSubmission | null>(null);
  const [modalFilter, setModalFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Filters
  const [testFilter, setTestFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'score_desc' | 'score_asc'>('date_desc');

  // Subscribe in real-time to student's own submissions
  useEffect(() => {
    if (!user) {
      setSubmissions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeStudentCompetencySubmissions(
      user.uid,
      (data) => {
        setSubmissions(data);
        setLoading(false);

        // Keep opened detailed modal synchronized
        setSelectedSubmission((current) => {
          if (!current || !current.id) return current;
          const fresh = data.find((s) => s.id === current.id);
          return fresh || current;
        });
      },
      (error) => {
        console.error('Real-time student submissions error:', error);
        toast.error('Hiba az eredményeid betöltése során.');
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

  const fetchSubmissions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getStudentCompetencySubmissions(user.uid);
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Hiba történt az eredmények frissítése során.');
    } finally {
      setLoading(false);
    }
  };

  // Filtered & sorted submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      if (testFilter !== 'all' && sub.testId !== testFilter) return false;
      if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'date_desc') {
        const timeA = a.createdAt?.toDate?.()?.getTime() || (a.startedAt ? new Date(a.startedAt).getTime() : 0);
        const timeB = b.createdAt?.toDate?.()?.getTime() || (b.startedAt ? new Date(b.startedAt).getTime() : 0);
        return timeB - timeA;
      }
      if (sortBy === 'date_asc') {
        const timeA = a.createdAt?.toDate?.()?.getTime() || (a.startedAt ? new Date(a.startedAt).getTime() : 0);
        const timeB = b.createdAt?.toDate?.()?.getTime() || (b.startedAt ? new Date(b.startedAt).getTime() : 0);
        return timeA - timeB;
      }
      if (sortBy === 'score_desc') return (b.percentage || 0) - (a.percentage || 0);
      if (sortBy === 'score_asc') return (a.percentage || 0) - (b.percentage || 0);
      return 0;
    });
  }, [submissions, testFilter, statusFilter, sortBy]);

  // Overall Statistics
  const stats = useMemo(() => {
    const totalCount = submissions.length;
    const completedList = submissions.filter((s) => s.status === 'completed');
    const completedCount = completedList.length;
    const inProgressCount = totalCount - completedCount;

    const avgPercentage = completedCount > 0
      ? Math.round(completedList.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / completedCount)
      : 0;

    const maxScore = completedList.length > 0
      ? Math.max(...completedList.map((s) => s.score || 0))
      : 0;

    const maxPercentage = completedList.length > 0
      ? Math.max(...completedList.map((s) => s.percentage || 0))
      : 0;

    return {
      totalCount,
      completedCount,
      inProgressCount,
      avgPercentage,
      maxScore,
      maxPercentage
    };
  }, [submissions]);

  // Format helpers
  const formatDuration = (sec: number) => {
    if (!sec || sec <= 0) return '—';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}p ${s < 10 ? '0' : ''}${s}mp`;
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

  if (!user) {
    return (
      <div style={{ maxWidth: 700, margin: '60px auto', textAlign: 'center', padding: '40px 24px', background: 'var(--bg-elev)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#2563eb' }}>
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>
          Jelentkezz be az eredményeid megtekintéséhez!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.6 }}>
          A próbamérések kitöltéseit és pontszámait a fiókodban tároljuk, így bármikor visszanézheted a megoldásaidat és letöltheted a kiértékelt PDF feladatlapodat.
        </p>
        {onBackToBrowse && (
          <button className="btn btn-primary" onClick={onBackToBrowse}>
            ← Vissza a feladatokhoz
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', paddingBottom: 60 }}>
      {/* Header */}
      <div className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text)' }}>
              📊 Eredményeim
            </h2>
            <span style={{ fontSize: 12, fontWeight: 700, background: '#e0e7ff', color: '#4338ca', padding: '3px 10px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <GraduationCap className="w-3.5 h-3.5" />
              Saját kitöltések
            </span>
          </div>
          <div className="meta" style={{ marginTop: 4 }}>
            A 6. évfolyamos matematikai kompetenciamérés próbatesztjeid részletes eredményei, értékelése és levezetései.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button 
            className="btn btn-secondary" 
            onClick={fetchSubmissions} 
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            title="Eredmények újratöltése"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Frissítés</span>
          </button>
          {onBackToBrowse && (
            <button className="btn btn-secondary" onClick={onBackToBrowse}>
              ← Vissza a böngészőhöz
            </button>
          )}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            <FileText className="w-4 h-4 text-blue-500" />
            Összes Kitöltött Mérés
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>
            {stats.totalCount} <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>db próbateszt</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'flex', gap: 8 }}>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>🟢 {stats.completedCount} befejezve</span>
            {stats.inProgressCount > 0 && (
              <span style={{ color: '#d97706', fontWeight: 600 }}>🟡 {stats.inProgressCount} folyamatban</span>
            )}
          </div>
        </div>

        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            Átlagos Teljesítmény
          </div>
          <div style={{ 
            fontSize: 26, 
            fontWeight: 800, 
            color: stats.avgPercentage >= 70 ? '#16a34a' : stats.avgPercentage >= 50 ? '#d97706' : stats.totalCount > 0 ? '#dc2626' : 'var(--text)' 
          }}>
            {stats.avgPercentage}%
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Befejezett próbatesztek átlaga
          </div>
        </div>

        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 18, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            <Award className="w-4 h-4 text-amber-500" />
            Eddigi Legjobb Eredmény
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>
            {stats.maxScore} <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>/ 31 pont</span>
            {stats.maxPercentage > 0 && (
              <span style={{ fontSize: 14, fontWeight: 700, color: '#16a34a', marginLeft: 8 }}>({stats.maxPercentage}%)</span>
            )}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Legmagasabb elért pontszám
          </div>
        </div>
      </div>

      {/* Filter and sorting toolbar */}
      <div style={{
        background: 'var(--bg-elev)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '14px 18px',
        marginBottom: 20,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow)'
      }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Test selection filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Teszt:</span>
            <select
              value={testFilter}
              onChange={(e) => setTestFilter(e.target.value)}
              className="task-select-dropdown"
              style={{ padding: '6px 10px', fontSize: 12 }}
            >
              <option value="all">Minden Próbamérés</option>
              {Array.from({ length: 10 }).map((_, idx) => {
                const id = `PM-${(idx + 1).toString().padStart(2, '0')}`;
                return <option key={id} value={id}>{id} ({idx + 1}. Próbateszt)</option>;
              })}
            </select>
          </div>

          {/* Status filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Állapot:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="task-select-dropdown"
              style={{ padding: '6px 10px', fontSize: 12 }}
            >
              <option value="all">Mind ({submissions.length})</option>
              <option value="completed">Csak befejezett ({stats.completedCount})</option>
              <option value="in_progress">Folyamatban ({stats.inProgressCount})</option>
            </select>
          </div>
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Rendezés:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="task-select-dropdown"
            style={{ padding: '6px 10px', fontSize: 12 }}
          >
            <option value="date_desc">Legújabb elöl</option>
            <option value="date_asc">Legrégebbi elöl</option>
            <option value="score_desc">Legjobb eredmény</option>
            <option value="score_asc">Leggyengébb eredmény</option>
          </select>
        </div>
      </div>

      {/* Submissions List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div className="animate-spin" style={{ display: 'inline-block', marginBottom: 12 }}>
            <RefreshCw className="w-8 h-8 text-blue-500" />
          </div>
          <div>Eredményeid betöltése folyamatban...</div>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div style={{ 
          background: 'var(--bg-elev)', 
          border: '1px dashed var(--border)', 
          borderRadius: 'var(--radius)', 
          padding: '48px 24px', 
          textAlign: 'center', 
          color: 'var(--text-muted)' 
        }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#2563eb' }}>
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
            {submissions.length === 0 ? 'Még nem töltöttél ki próbatesztet!' : 'Nincs a szűrőknek megfelelő eredmény'}
          </h3>
          <p style={{ fontSize: 13, maxWidth: 440, margin: '0 auto 20px', lineHeight: 1.5 }}>
            {submissions.length === 0 
              ? 'Próbáld ki az 1. Országos Kompetenciamérés Próbatesztet 31 változatos feladattal, és kövesd nyomon a fejlődésedet!'
              : 'Próbáld meg módosítani a fenti szűrőket vagy a tesztválasztást.'}
          </p>
          {onSelectPractice && (
            <button 
              className="btn btn-primary" 
              onClick={() => onSelectPractice('PM-01')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px' }}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>1. Próbamérés megnyitása</span>
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredSubmissions.map((sub) => {
            const isInProgress = sub.status === 'in_progress';
            const answeredCount = sub.answeredCount ?? Object.keys(sub.answers || {}).length;

            let badgeBg = '#f1f5f9';
            let badgeColor = '#475569';
            if (isInProgress) {
              badgeBg = '#fef3c7';
              badgeColor = '#b45309';
            } else if (sub.percentage >= 70) {
              badgeBg = '#dcfce7';
              badgeColor = '#15803d';
            } else if (sub.percentage >= 50) {
              badgeBg = '#fef3c7';
              badgeColor = '#b45309';
            } else {
              badgeBg = '#fee2e2';
              badgeColor = '#b91c1c';
            }

            return (
              <div
                key={sub.id}
                style={{
                  background: 'var(--bg-elev)',
                  border: isInProgress ? '1px dashed #f59e0b' : '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Test details */}
                <div style={{ minWidth: 260, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ 
                      fontSize: 11, 
                      fontWeight: 800, 
                      background: '#e0f2fe', 
                      color: '#0369a1', 
                      padding: '3px 8px', 
                      borderRadius: 5 
                    }}>
                      {sub.testId}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                      {sub.testTitle || 'Kompetenciamérés'}
                    </span>
                    {isInProgress && (
                      <span style={{ 
                        fontSize: 11, 
                        fontWeight: 700, 
                        background: '#fef3c7', 
                        color: '#b45309', 
                        padding: '2px 8px', 
                        borderRadius: 4, 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 4 
                      }}>
                        <Clock className="w-3 h-3" />
                        Folyamatban ({answeredCount}/{sub.totalTasks} kész)
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock className="w-3.5 h-3.5" />
                      Időtartam: {formatDuration(sub.durationSeconds)}
                    </span>
                    <span>·</span>
                    <span>Időpont: {formatDate(sub.completedAt || sub.startedAt)}</span>
                  </div>
                </div>

                {/* Score badge & Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    background: badgeBg,
                    color: badgeColor,
                    textAlign: 'center',
                    minWidth: 110,
                    border: isInProgress ? '1px dashed #f59e0b' : 'none'
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1 }}>
                      {sub.percentage}%
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, marginTop: 2 }}>
                      {isInProgress ? `${answeredCount}/${sub.totalTasks} kész` : `${sub.score} / ${sub.totalTasks} pont`}
                    </div>
                  </div>

                  {/* Actions: View Details & PDF Download (Strictly NO deletion) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button
                      onClick={() => setSelectedSubmission(sub)}
                      className="btn btn-secondary"
                      style={{ padding: '8px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                      title="Részletes feladatlap megtekintése"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Részletek</span>
                    </button>

                    <button
                      onClick={() => exportCompetencySubmissionToPDF(sub)}
                      className="btn btn-primary"
                      style={{ padding: '8px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                      title="Kiértékelt feladatlap letöltése PDF formátumban"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>

                    {isInProgress && onSelectPractice && (
                      <button
                        onClick={() => onSelectPractice(sub.testId)}
                        className="btn btn-secondary"
                        style={{ padding: '8px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, borderColor: '#f59e0b', color: '#b45309' }}
                        title="Folytatás a próbateszt kitöltésénél"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Folytatás</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Modal: Question by question review */}
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
                    {selectedSubmission.testTitle} — Részletes Kiértékelés
                  </h3>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Kitöltve: {formatDate(selectedSubmission.completedAt || selectedSubmission.startedAt)} · Időtartam: {formatDuration(selectedSubmission.durationSeconds)}
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

            {/* In-progress banner */}
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
                  <strong>Folyamatban lévő kitöltés:</strong> Eddig {selectedSubmission.answeredCount ?? Object.keys(selectedSubmission.answers || {}).length} / {selectedSubmission.totalTasks} feladatot válaszoltál meg. Az alábbiakban az eddig elmentett válaszaid láthatók.
                </span>
              </div>
            )}

            {/* Stats Subheader */}
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
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
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
                    const areaStat = selectedSubmission.breakdownByArea?.[area] || { total: 0, correct: 0 };
                    return (
                      <span key={area} style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, background: 'var(--bg)', border: '1px solid var(--border)' }}>
                        {AREA_LABELS[area]?.name}: {areaStat.correct}/{areaStat.total}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Question filter tabs */}
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

            {/* Modal Body: Task-by-task Review */}
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
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 4,
                            background: AREA_LABELS[ans.contentArea]?.color || '#64748b',
                            color: '#fff'
                          }}>
                            {AREA_LABELS[ans.contentArea]?.name || ans.contentArea}
                          </span>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 4,
                            background: LEVEL_LABELS[ans.thinkingLevel]?.color || '#64748b',
                            color: '#fff'
                          }}>
                            {LEVEL_LABELS[ans.thinkingLevel]?.name || ans.thinkingLevel}
                          </span>
                          <span style={{
                            fontSize: 12,
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            color: isCorrect ? '#16a34a' : '#dc2626',
                            marginLeft: 4
                          }}>
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                1 / 1 pont
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                0 / 1 pont
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 12, lineHeight: 1.6 }}>
                        <MathView text={ans.question} />
                      </div>

                      {/* Answer Comparison */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 12 }}>
                        <div style={{
                          background: 'var(--bg-elev)',
                          border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
                          borderRadius: 8,
                          padding: 10
                        }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>
                            A TE VÁLASZOD:
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: isCorrect ? '#16a34a' : '#dc2626' }}>
                            <MathView text={formatAnswer(ans.selectedAnswer)} />
                          </div>
                        </div>

                        <div style={{
                          background: 'var(--bg-elev)',
                          border: '1px solid #bbf7d0',
                          borderRadius: 8,
                          padding: 10
                        }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>
                            HELYES VÁLASZ:
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#16a34a' }}>
                            <MathView text={formatAnswer(ans.correctAnswer)} />
                          </div>
                        </div>
                      </div>

                      {/* Solution / Explanation */}
                      {ans.solution && (
                        <div style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: 8,
                          padding: '10px 14px',
                          fontSize: 12,
                          color: 'var(--text)'
                        }}>
                          <div style={{ fontWeight: 800, color: 'var(--text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            Megoldás és levezetés:
                          </div>
                          <div style={{ lineHeight: 1.6 }}>
                            <MathView text={ans.solution} />
                          </div>
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
