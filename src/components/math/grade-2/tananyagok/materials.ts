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

export const GRADE_2_MATERIALS: Material[] = [
    {
        id: 'mat02ta1',
        title: 'Matematika 2. Tankönyv I. kötet',
        description: 'Általános iskolai tankönyv 2. évfolyam I. kötet (OH-MAT02TA_I)',
        fileName: 'OH-MAT02TA_I__teljes.pdf',
        path: getStorageUrl('2_osztaly', 'OH-MAT02TA_I__teljes.pdf')
    },
    {
        id: 'mat02ta2',
        title: 'Matematika 2. Tankönyv II. kötet',
        description: 'Általános iskolai tankönyv 2. évfolyam II. kötet (OH-MAT02TA_II)',
        fileName: 'OH-MAT02TA_II__teljes.pdf',
        path: getStorageUrl('2_osztaly', 'OH-MAT02TA_II__teljes.pdf')
    },
    {
        id: 'mat02ma1',
        title: 'Matematika 2. Munkafüzet I. kötet',
        description: 'Általános iskolai munkafüzet 2. évfolyam I. kötet (OH-MAT02MA_I)',
        fileName: 'OH-MAT02MA_I__teljes.pdf',
        path: getStorageUrl('2_osztaly', 'OH-MAT02MA_I__teljes.pdf')
    },
    {
        id: 'mat02ma2',
        title: 'Matematika 2. Munkafüzet II. kötet',
        description: 'Általános iskolai munkafüzet 2. évfolyam II. kötet (OH-MAT02MA_II)',
        fileName: 'OH-MAT02MA_II__teljes.pdf',
        path: getStorageUrl('2_osztaly', 'OH-MAT02MA_II__teljes.pdf')
    }
];
