import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

/**
 * Exports a given HTML element (or element ID) to a PDF file.
 * Handles multi-page worksheets with '.print-page' elements page-by-page for crisp A4 output.
 * Fallback to browser print if image generation fails.
 */
export async function exportElementToPDF(elementOrId: string | HTMLElement, title: string) {
  const element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
  if (!element) {
    toast.error('A letöltendő tananyag elem nem található.');
    return;
  }

  const toastId = toast.loading('PDF dokumentum előkészítése és letöltése...');

  try {
    const pageElements = element.querySelectorAll<HTMLElement>('.print-page');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    if (pageElements.length > 0) {
      for (let i = 0; i < pageElements.length; i++) {
        const pageEl = pageElements[i];
        if (i > 0) {
          pdf.addPage();
        }
        const canvas = await toPng(pageEl, {
          quality: 0.98,
          pixelRatio: 2,
          cacheBust: true,
          backgroundColor: '#ffffff',
          filter: (node: HTMLElement) => {
            if (node.classList && node.classList.contains('no-pdf')) {
              return false;
            }
            return true;
          }
        });
        pdf.addImage(canvas, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
    } else {
      const canvas = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#ffffff',
        filter: (node: HTMLElement) => {
          if (node.classList && node.classList.contains('no-pdf')) {
            return false;
          }
          return true;
        }
      });

      const imgProps = pdf.getImageProperties(canvas);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
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
