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

export const GRADE_11_MATERIALS: Material[] = [
    {
        id: 'mat11ta',
        title: 'Matematika 11. Tankönyv',
        description: 'Középiskolai tankönyv 11. évfolyam számára (OH-MAT11TA)',
        fileName: 'OH-MAT11TA__teljes.pdf',
        path: getStorageUrl('11_osztaly', 'OH-MAT11TA__teljes.pdf')
    },
    {
        id: 'mat11fgv',
        title: 'Négyjegyű függvénytáblázatok 9–12.',
        description: 'Matematikai, fizikai, kémiai összefüggések és adatok (OH-FGV912GY)',
        fileName: 'OH-FGV912GY__teljes.pdf',
        path: getStorageUrl('11_osztaly', 'OH-FGV912GY__teljes.pdf')
    },
    {
        id: 'mat11ae',
        title: 'Matematika 9–12. Az emelt szintű érettségihez',
        description: 'Középiskolai tananyag az emelt szintű érettségihez (OH-MAT912AE)',
        fileName: 'OH-MAT912AE__teljes.pdf',
        path: getStorageUrl('11_osztaly', 'OH-MAT912AE__teljes.pdf')
    }
];
