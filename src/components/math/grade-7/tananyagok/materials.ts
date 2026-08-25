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

export const GRADE_7_MATERIALS: Material[] = [
    {
        id: 'mat07ta',
        title: 'Matematika 7. Tankönyv',
        description: 'Általános iskolai tankönyv hetedik évfolyam számára (OH-MAT07TA)',
        fileName: 'OH-MAT07TA__teljes.pdf',
        path: getStorageUrl('7_osztaly', 'OH-MAT07TA__teljes.pdf')
    },
    {
        id: 'mat07ma',
        title: 'Matematika 7. Munkafüzet',
        description: 'Általános iskolai munkafüzet hetedik évfolyam számára (OH-MAT07MA)',
        fileName: 'OH-MAT07MA__teljes.pdf',
        path: getStorageUrl('7_osztaly', 'OH-MAT07MA__teljes.pdf')
    }
];
