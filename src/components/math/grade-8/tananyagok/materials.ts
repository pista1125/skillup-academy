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

export const GRADE_8_MATERIALS: Material[] = [
    {
        id: 'mat08ta',
        title: 'Matematika 8. Tankönyv',
        description: 'Általános iskolai tankönyv nyolcadik évfolyam számára (OH-MAT08TA)',
        fileName: 'OH-MAT08TA__teljes.pdf',
        path: getStorageUrl('8_osztaly', 'OH-MAT08TA__teljes.pdf')
    },
    {
        id: 'mat08ma',
        title: 'Matematika 8. Munkafüzet',
        description: 'Általános iskolai munkafüzet nyolcadik évfolyam számára (OH-MAT08MA)',
        fileName: 'OH-MAT08MA__teljes.pdf',
        path: getStorageUrl('8_osztaly', 'OH-MAT08MA__teljes.pdf')
    }
];
