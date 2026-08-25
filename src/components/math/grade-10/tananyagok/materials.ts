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

export const GRADE_10_MATERIALS: Material[] = [
    {
        id: 'mat10ta1',
        title: 'Matematika 10. Tankönyv I. kötet',
        description: 'Középiskolai tankönyv 10. évfolyam I. kötet (OH-MAT10TA_I)',
        fileName: 'OH-MAT10TA_I__teljes.pdf',
        path: getStorageUrl('10_osztaly', 'OH-MAT10TA_I__teljes.pdf')
    },
    {
        id: 'mat10ta2',
        title: 'Matematika 10. Tankönyv II. kötet',
        description: 'Középiskolai tankönyv 10. évfolyam II. kötet (OH-MAT10TA_II)',
        fileName: 'OH-MAT10TA_II__teljes.pdf',
        path: getStorageUrl('10_osztaly', 'OH-MAT10TA_II__teljes.pdf')
    },
    {
        id: 'mat10fgv',
        title: 'Négyjegyű függvénytáblázatok 9–12.',
        description: 'Matematikai, fizikai, kémiai összefüggések és adatok (OH-FGV912GY)',
        fileName: 'OH-FGV912GY__teljes.pdf',
        path: getStorageUrl('10_osztaly', 'OH-FGV912GY__teljes.pdf')
    },
    {
        id: 'mat10gy',
        title: 'Matematika 9–12. Gyakorló és feladatgyűjtemény',
        description: 'Gyakorló és érettségire felkészítő feladatgyűjtemény (OH-MAT912GY)',
        fileName: 'OH-MAT912GY__teljes.pdf',
        path: getStorageUrl('10_osztaly', 'OH-MAT912GY__teljes.pdf')
    },
    {
        id: 'mat10ae',
        title: 'Matematika 9–12. Az emelt szintű érettségihez',
        description: 'Középiskolai tananyag az emelt szintű érettségihez (OH-MAT912AE)',
        fileName: 'OH-MAT912AE__teljes.pdf',
        path: getStorageUrl('10_osztaly', 'OH-MAT912AE__teljes.pdf')
    },
    {
        id: 'mat10sne',
        title: 'Matematika 10. SNI Munkafüzet 2. kötet',
        description: 'Sajátos nevelési igényű tanulók számára készült munkafüzet (OH-SNE-MAT10M-2)',
        fileName: 'OH-SNE-MAT10M-2__teljes.pdf',
        path: getStorageUrl('10_osztaly', 'OH-SNE-MAT10M-2__teljes.pdf')
    }
];
