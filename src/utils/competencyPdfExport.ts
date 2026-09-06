import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';
import { CompetencyTestSubmission } from '@/services/competencySubmissionService';

export function formatAnswer(val: any): string {
  if (val === null || val === undefined) return 'Nem adott meg választ';
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) {
    return val.map(item => formatAnswer(item)).join(', ');
  }
  if (typeof val === 'object') {
    return Object.entries(val)
      .map(([k, v]) => `${k}: ${formatAnswer(v)}`)
      .join(', ');
  }
  return String(val);
}

const AREA_NAMES: { [key: string]: string } = {
  M: 'Mennyiségek',
  H: 'Hozzárendelések és összefüggések',
  A: 'Alakzatok és térbeli tájékozódás',
  S: 'Statisztika és valószínűség'
};

const LEVEL_NAMES: { [key: string]: string } = {
  T: 'Tudás és közvetlen alkalmazás',
  A: 'Alkalmazás és modellezés',
  K: 'Érvelés és problémamegoldás'
};

/**
 * Generates and downloads a clean, printable PDF report for a student's competency test submission.
 */
export async function exportCompetencySubmissionToPDF(submission: CompetencyTestSubmission): Promise<void> {
  const toastId = toast.loading('PDF feladatlap generálása folyamatban...');

  // Create loading overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(15, 23, 42, 0.7)';
  overlay.style.backdropFilter = 'blur(4px)';
  overlay.style.zIndex = '100000';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = '#ffffff';
  overlay.innerHTML = `
    <div style="font-size: 32px; margin-bottom: 12px; animation: spin 1s linear infinite;">📄</div>
    <div style="font-size: 16px; font-weight: 700;">Kiértékelt feladatlap PDF előkészítése...</div>
    <div style="font-size: 13px; color: #cbd5e1; margin-top: 4px;">Kérlek várj néhány másodpercet</div>
  `;
  document.body.appendChild(overlay);

  // Create temporary container placed at top of DOM for accurate rendering
  const container = document.createElement('div');
  container.id = 'competency-pdf-export-container';
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.padding = '36px 40px';
  container.style.background = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  container.style.lineHeight = '1.5';
  container.style.boxSizing = 'border-box';
  container.style.zIndex = '99999';
  container.style.pointerEvents = 'none';
  container.style.opacity = '1';

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} perc ${secs} mp`;
  };

  const formattedDate = submission.completedAt 
    ? new Date(submission.completedAt).toLocaleString('hu-HU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    : new Date().toLocaleDateString('hu-HU');

  const answersArray = Object.values(submission.answers || {});

  // Build HTML for the PDF
  container.innerHTML = `
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <div style="font-size: 11px; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <span>Országos Kompetenciamérés — Kiértékelt Diákfeladatlap</span>
            ${submission.status === 'in_progress' ? '<span style="background: #fef3c7; color: #b45309; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">FOLYAMATBAN / MEGSZAKADT</span>' : ''}
          </div>
          <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">
            ${submission.testTitle || submission.testId}
          </h1>
          <div style="font-size: 13px; color: #64748b;">
            SkillUp Academy — Matematika 6. évfolyam
          </div>
        </div>
        <div style="text-align: right; background: ${submission.status === 'in_progress' ? '#fffbeb' : submission.percentage >= 70 ? '#f0fdf4' : submission.percentage >= 50 ? '#fffbeb' : '#fef2f2'}; border: 1px solid ${submission.status === 'in_progress' ? '#fde68a' : submission.percentage >= 70 ? '#bbf7d0' : submission.percentage >= 50 ? '#fde68a' : '#fecaca'}; border-radius: 12px; padding: 10px 18px;">
          <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">
            ${submission.status === 'in_progress' ? 'Részeredmény' : 'Eredmény'}
          </div>
          <div style="font-size: 24px; font-weight: 900; color: ${submission.status === 'in_progress' ? '#b45309' : submission.percentage >= 70 ? '#15803d' : submission.percentage >= 50 ? '#b45309' : '#b91c1c'};">
            ${submission.score} / ${submission.totalTasks} (${submission.percentage}%)
          </div>
          ${submission.status === 'in_progress' ? `<div style="font-size: 10px; font-weight: 700; color: #b45309; margin-top: 2px;">${answersArray.length} / ${submission.totalTasks} feladat rögzítve</div>` : ''}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 16px; padding: 12px 16px; background: #f8fafc; border-radius: 8px; font-size: 12px;">
        <div>
          <span style="color: #64748b; display: block; font-size: 11px;">Diák neve:</span>
          <strong style="color: #0f172a;">${submission.studentName}</strong>
        </div>
        <div>
          <span style="color: #64748b; display: block; font-size: 11px;">Email címe:</span>
          <strong style="color: #0f172a;">${submission.studentEmail || '—'}</strong>
        </div>
        <div>
          <span style="color: #64748b; display: block; font-size: 11px;">Kitöltés ideje:</span>
          <strong style="color: #0f172a;">${formattedDate}</strong>
        </div>
        <div>
          <span style="color: #64748b; display: block; font-size: 11px;">Időtartam:</span>
          <strong style="color: #0f172a;">${formatDuration(submission.durationSeconds)}</strong>
        </div>
      </div>
    </div>

    <!-- Breakdown Table -->
    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 10px 0; color: #1e293b; text-transform: uppercase; letter-spacing: 0.05em;">
        Tartalmi területek szerinti eredmények
      </h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
        ${['M', 'H', 'A', 'S'].map(area => {
          const stats = submission.breakdownByArea?.[area] || { total: 0, correct: 0 };
          const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
          return `
            <div style="padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
              <div style="font-size: 11px; font-weight: 700; color: #475569; margin-bottom: 4px;">${AREA_NAMES[area] || area}</div>
              <div style="font-size: 16px; font-weight: 800; color: #0f172a;">
                ${stats.correct} / ${stats.total} <span style="font-size: 12px; font-weight: 600; color: #64748b;">(${pct}%)</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Questions list -->
    <div>
      <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 14px 0; color: #1e293b; text-transform: uppercase; letter-spacing: 0.05em;">
        Részletes feladatlap és válaszok (${answersArray.length} feladat)
      </h3>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${answersArray.map((ans, idx) => {
          const isCorrect = ans.isCorrect;
          const formattedStudentAns = formatAnswer(ans.selectedAnswer);
          const formattedCorrectAns = formatAnswer(ans.correctAnswer);
          return `
            <div style="border: 1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}; background: ${isCorrect ? '#f0fdf4' : '#fff5f5'}; border-radius: 10px; padding: 14px; page-break-inside: avoid;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="background: ${isCorrect ? '#16a34a' : '#dc2626'}; color: #ffffff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 6px;">
                    ${idx + 1}. feladat (${ans.taskId})
                  </span>
                  <span style="font-weight: 700; font-size: 13px; color: #0f172a;">${ans.title || ''}</span>
                  <span style="font-size: 10px; background: #e2e8f0; color: #475569; padding: 2px 6px; border-radius: 4px;">
                    ${AREA_NAMES[ans.contentArea]?.split(' ')[0] || ans.contentArea} · ${LEVEL_NAMES[ans.thinkingLevel]?.split(' ')[0] || ans.thinkingLevel}
                  </span>
                </div>
                <span style="font-size: 12px; font-weight: 700; color: ${isCorrect ? '#16a34a' : '#dc2626'};">
                  ${isCorrect ? '✓ HELYES (+1 pont)' : '✗ HIBÁS (0 pont)'}
                </span>
              </div>

              <div style="font-size: 12px; color: #1e293b; margin-bottom: 8px; line-height: 1.4;">
                ${ans.question ? ans.question.replace(/\n/g, '<br/>') : ''}
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 8px 10px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 11.5px; margin-bottom: 8px;">
                <div>
                  <span style="color: #64748b; font-weight: 600;">Diák válasza:</span> 
                  <strong style="color: ${isCorrect ? '#16a34a' : '#dc2626'}; margin-left: 4px;">${formattedStudentAns}</strong>
                </div>
                <div>
                  <span style="color: #64748b; font-weight: 600;">Helyes válasz:</span> 
                  <strong style="color: #16a34a; margin-left: 4px;">${formattedCorrectAns}</strong>
                </div>
              </div>

              ${ans.solution ? `
                <div style="font-size: 11px; color: #475569; background: #f8fafc; padding: 8px 10px; border-radius: 6px; border-left: 3px solid #3b82f6;">
                  <strong style="color: #1e293b; display: block; margin-bottom: 2px;">Megoldás levezetése:</strong>
                  <div style="line-height: 1.4;">${ans.solution.replace(/\*\*/g, '').replace(/\n/g, '<br/>')}</div>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    // Give browser time to layout and render fonts
    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await toPng(container, {
      quality: 0.98,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#ffffff'
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pageHeight = 297;
    const imgProps = pdf.getImageProperties(canvas);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = pdfHeight;
    let page = 0;

    while (heightLeft > 0) {
      if (page > 0) {
        pdf.addPage();
      }
      const position = -(page * pageHeight);
      pdf.addImage(canvas, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      page++;
    }

    const safeStudentName = (submission.studentName || 'diak')
      .toLowerCase()
      .replace(/[^a-z0-9áéíóöőúüű]/gi, '_')
      .replace(/_+/g, '_');
    
    const filename = `${safeStudentName}_${submission.testId || 'probameres'}_ertekeles.pdf`;

    pdf.save(filename);
    toast.success('Kiértékelt feladatlap PDF sikeresen letöltve!', { id: toastId });
  } catch (error) {
    console.error('Competency PDF export error:', error);
    toast.error('Hiba történt a PDF generálása során.', { id: toastId });
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }
}
