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

export const GRADE_9_MATERIALS: Material[] = [
    {
        id: 'mat09ta1',
        title: 'Matematika 9. Tankönyv I. kötet',
        description: 'Középiskolai tankönyv 9. évfolyam I. kötet (OH-MAT09TA_I)',
        fileName: 'OH-MAT09TA_I__teljes.pdf',
        path: getStorageUrl('9_osztaly', 'OH-MAT09TA_I__teljes.pdf')
    },
    {
        id: 'mat09ta2',
        title: 'Matematika 9. Tankönyv II. kötet',
        description: 'Középiskolai tankönyv 9. évfolyam II. kötet (OH-MAT09TA_II)',
        fileName: 'OH-MAT09TA_II__teljes.pdf',
        path: getStorageUrl('9_osztaly', 'OH-MAT09TA_II__teljes.pdf')
    },
    {
        id: 'mat09megoldas2',
        title: 'Matematika 9. II. kötet Megoldások',
        description: 'Részletes feladatmegoldások a 9. osztályos II. kötethez (OH-MAT09-TA_II)',
        fileName: 'OH-MAT09-TA_II-Megoldások-OA-2023-10-18.pdf',
        path: getStorageUrl('9_osztaly', 'OH-MAT09-TA_II-Megoldások-OA-2023-10-18.pdf')
    },
    {
        id: 'mat09ae',
        title: 'Matematika 9–12. Az emelt szintű érettségihez',
        description: 'Középiskolai tananyag az emelt szintű érettségihez (OH-MAT912AE)',
        fileName: 'OH-MAT912AE__teljes.pdf',
        path: getStorageUrl('9_osztaly', 'OH-MAT912AE__teljes.pdf')
    }
];
