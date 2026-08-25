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

export const GRADE_6_MATERIALS: Material[] = [
    {
        id: 'mat06ta',
        title: 'Matematika 6. Tankönyv',
        description: 'Általános iskolai tankönyv hatodik évfolyam számára (OH-MAT06TA)',
        fileName: 'OH-MAT06TA__teljes.pdf',
        path: getStorageUrl('6_osztaly', 'OH-MAT06TA__teljes.pdf')
    },
    {
        id: 'mat06ma',
        title: 'Matematika 6. Munkafüzet',
        description: 'Általános iskolai munkafüzet hatodik évfolyam számára (OH-MAT06MA)',
        fileName: 'OH-MAT06MA__teljes.pdf',
        path: getStorageUrl('6_osztaly', 'OH-MAT06MA__teljes.pdf')
    }
];
