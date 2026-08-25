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

export const GRADE_5_MATERIALS: Material[] = [
    {
        id: 'mat05ta',
        title: 'Matematika 5. Tankönyv',
        description: 'Általános iskolai tankönyv ötödik évfolyam számára (OH-MAT05TA)',
        fileName: 'OH-MAT05TA__teljes.pdf',
        path: getStorageUrl('5_osztaly', 'OH-MAT05TA__teljes.pdf')
    },
    {
        id: 'mat05ma',
        title: 'Matematika 5. Munkafüzet',
        description: 'Általános iskolai munkafüzet ötödik évfolyam számára (OH-MAT05MA)',
        fileName: 'OH-MAT05MA__teljes.pdf',
        path: getStorageUrl('5_osztaly', 'OH-MAT05MA__teljes.pdf')
    }
];
