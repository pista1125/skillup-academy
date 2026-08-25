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

export const GRADE_12_MATERIALS: Material[] = [
    {
        id: 'mat12gy',
        title: 'Matematika 9–12. Gyakorló és feladatgyűjtemény',
        description: 'Gyakorló és érettségire felkészítő feladatgyűjtemény (OH-MAT912GY)',
        fileName: 'OH-MAT912GY__teljes.pdf',
        path: getStorageUrl('12_osztaly', 'OH-MAT912GY__teljes.pdf')
    },
    {
        id: 'mat12fgv',
        title: 'Négyjegyű függvénytáblázatok 9–12.',
        description: 'Matematikai, fizikai, kémiai összefüggések és adatok (OH-FGV912GY)',
        fileName: 'OH-FGV912GY__teljes.pdf',
        path: getStorageUrl('12_osztaly', 'OH-FGV912GY__teljes.pdf')
    },
    {
        id: 'mat12ae',
        title: 'Matematika 9–12. Az emelt szintű érettségihez',
        description: 'Középiskolai tananyag az emelt szintű érettségihez (OH-MAT912AE)',
        fileName: 'OH-MAT912AE__teljes.pdf',
        path: getStorageUrl('12_osztaly', 'OH-MAT912AE__teljes.pdf')
    }
];
