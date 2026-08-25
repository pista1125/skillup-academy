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

export const GRADE_3_MATERIALS: Material[] = [
    {
        id: 'mat03ta',
        title: 'Matematika 3. Tankönyv',
        description: 'Általános iskolai tankönyv harmadik évfolyam számára (OH-MAT03TA)',
        fileName: 'OH-MAT03TA__teljes.pdf',
        path: getStorageUrl('3_osztaly', 'OH-MAT03TA__teljes.pdf')
    },
    {
        id: 'mat03ma1',
        title: 'Matematika 3. Munkafüzet I. kötet',
        description: 'Általános iskolai munkafüzet I. kötet harmadik évfolyam számára (OH-MAT03MA_I)',
        fileName: 'OH-MAT03MA_I__teljes.pdf',
        path: getStorageUrl('3_osztaly', 'OH-MAT03MA_I__teljes.pdf')
    },
    {
        id: 'mat03ma2',
        title: 'Matematika 3. Munkafüzet II. kötet',
        description: 'Általános iskolai munkafüzet II. kötet harmadik évfolyam számára (OH-MAT03MA_II)',
        fileName: 'OH-MAT03MA_II__teljes.pdf',
        path: getStorageUrl('3_osztaly', 'OH-MAT03MA_II__teljes.pdf')
    }
];
