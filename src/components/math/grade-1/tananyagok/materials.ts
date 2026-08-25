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

export const GRADE_1_MATERIALS: Material[] = [
    {
        id: 'mat01ta1',
        title: 'Matematika 1. Tankönyv I. kötet',
        description: 'Általános iskolai tankönyv 1. évfolyam I. kötet (OH-MAT01TA_I)',
        fileName: 'OH-MAT01TA_I__teljes.pdf',
        path: getStorageUrl('1_osztaly', 'OH-MAT01TA_I__teljes.pdf')
    },
    {
        id: 'mat01ta2',
        title: 'Matematika 1. Tankönyv II. kötet',
        description: 'Általános iskolai tankönyv 1. évfolyam II. kötet (OH-MAT01TA_II)',
        fileName: 'OH-MAT01TA_II__teljes.pdf',
        path: getStorageUrl('1_osztaly', 'OH-MAT01TA_II__teljes.pdf')
    },
    {
        id: 'mat01ma1',
        title: 'Matematika 1. Munkafüzet I. kötet',
        description: 'Általános iskolai munkafüzet 1. évfolyam I. kötet (OH-MAT01MA_I)',
        fileName: 'OH-MAT01MA_I__teljes.pdf',
        path: getStorageUrl('1_osztaly', 'OH-MAT01MA_I__teljes.pdf')
    },
    {
        id: 'mat01ma2',
        title: 'Matematika 1. Munkafüzet II. kötet',
        description: 'Általános iskolai munkafüzet 1. évfolyam II. kötet (OH-MAT01MA_II)',
        fileName: 'OH-MAT01MA_II__teljes.pdf',
        path: getStorageUrl('1_osztaly', 'OH-MAT01MA_II__teljes.pdf')
    }
];
