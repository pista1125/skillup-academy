import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

/**
 * Exports a given HTML element to a PDF file.
 * Fallback to browser print if image generation fails.
 */
export async function exportElementToPDF(elementId: string, title: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    toast.error('A letöltendő tananyag elem nem található.');
    return;
  }

  const toastId = toast.loading('PDF dokumentum előkészítése és letöltése...');

  try {
    const canvas = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#ffffff',
      filter: (node: HTMLElement) => {
        // Exclude elements marked with 'no-pdf'
        if (node.classList && node.classList.contains('no-pdf')) {
          return false;
        }
        return true;
      }
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(canvas);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const pageHeight = pdf.internal.pageSize.getHeight();
    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(canvas, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(canvas, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    const safeFilename = title
      .toLowerCase()
      .replace(/[^a-z0-9áéíóöőúüű]/gi, '_')
      .replace(/_+/g, '_');

    pdf.save(`${safeFilename}_diakzona.pdf`);
    toast.success('PDF tananyag sikeresen letöltve!', { id: toastId });
  } catch (error) {
    console.error('PDF export hiba:', error);
    toast.dismiss(toastId);
    toast.info('PDF mentés nyomtatási nézetben megnyitva...');
    window.print();
  }
}
