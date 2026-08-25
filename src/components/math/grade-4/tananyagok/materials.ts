export interface Material {
    id: string;
    title: string;
    description: string;
    fileName: string;
    path: string;
}

const FIREBASE_STORAGE_BASE = "https://firebasestorage.googleapis.com/v0/b/diakzona.firebasestorage.app/o";

export const getStorageUrl = (folder: string, fileName: string) => {
    return `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(folder)}%2F${encodeURIComponent(fileName)}?alt=media`;
};

export const GRADE_4_MATERIALS: Material[] = [
    {
        id: 'mat04ta',
        title: 'Matematika 4. Tankönyv',
        description: 'Általános iskolai tankönyv negyedik évfolyam számára (OH-MAT04TA)',
        fileName: 'OH-MAT04TA__teljes.pdf',
        path: getStorageUrl('4_osztaly', 'OH-MAT04TA__teljes.pdf')
    },
    {
        id: 'mat04ma1',
        title: 'Matematika 4. Munkafüzet I. kötet',
        description: 'Általános iskolai munkafüzet I. kötet negyedik évfolyam számára (OH-MAT04MA_I)',
        fileName: 'OH-MAT04MA_I__teljes.pdf',
        path: getStorageUrl('4_osztaly', 'OH-MAT04MA_I__teljes.pdf')
    },
    {
        id: 'mat04ma2',
        title: 'Matematika 4. Munkafüzet II. kötet',
        description: 'Általános iskolai munkafüzet II. kötet negyedik évfolyam számára (OH-MAT04MA_II)',
        fileName: 'OH-MAT04MA_II__teljes.pdf',
        path: getStorageUrl('4_osztaly', 'OH-MAT04MA_II__teljes.pdf')
    }
];
