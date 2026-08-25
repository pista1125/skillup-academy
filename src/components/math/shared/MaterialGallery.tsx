import { useState, useEffect } from 'react';
import { GradeLevel } from '@/types/education';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, FileText, BookOpen } from 'lucide-react';

interface Material {
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

export const GRADE_2_MATERIALS: Material[] = [
    {
        id: 'mat02ta1',
        title: 'Matematika 2. Tankönyv I. kötet',
        description: 'Általános iskolai tankönyv 2. évfolyam I. kötet (OH-MAT02TA_I)',
        fileName: 'OH-MAT02TA_I__teljes.pdf',
        path: getStorageUrl('2_osztaly', 'OH-MAT02TA_I__teljes.pdf')
    },
    {
        id: 'mat02ta2',
        title: 'Matematika 2. Tankönyv II. kötet',
        description: 'Általános iskolai tankönyv 2. évfolyam II. kötet (OH-MAT02TA_II)',
        fileName: 'OH-MAT02TA_II__teljes.pdf',
        path: getStorageUrl('2_osztaly', 'OH-MAT02TA_II__teljes.pdf')
    },
    {
        id: 'mat02ma1',
        title: 'Matematika 2. Munkafüzet I. kötet',
        description: 'Általános iskolai munkafüzet 2. évfolyam I. kötet (OH-MAT02MA_I)',
        fileName: 'OH-MAT02MA_I__teljes.pdf',
        path: getStorageUrl('2_osztaly', 'OH-MAT02MA_I__teljes.pdf')
    },
    {
        id: 'mat02ma2',
        title: 'Matematika 2. Munkafüzet II. kötet',
        description: 'Általános iskolai munkafüzet 2. évfolyam II. kötet (OH-MAT02MA_II)',
        fileName: 'OH-MAT02MA_II__teljes.pdf',
        path: getStorageUrl('2_osztaly', 'OH-MAT02MA_II__teljes.pdf')
    }
];

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

const GRADE_4_MATERIALS: Material[] = [
    {
        id: 'mat04ta',
        title: 'Matematika 4. Tankönyv',
        description: 'Általános iskolai tankönyv negyedik évfolyam számára (OH-MAT04TA)',
        fileName: 'OH-MAT04TA__teljes.pdf',
        path: getStorageUrl('4_osztaly', 'OH-MAT04TA__teljes.pdf')
    },
    {
        id: 'mat04ma1',
        title: 'Matematika 4. Munkafüzet I. kötet',
        description: 'Általános iskolai munkafüzet I. kötet negyedik évfolyam számára (OH-MAT04MA_I)',
        fileName: 'OH-MAT04MA_I__teljes.pdf',
        path: getStorageUrl('4_osztaly', 'OH-MAT04MA_I__teljes.pdf')
    },
    {
        id: 'mat04ma2',
        title: 'Matematika 4. Munkafüzet II. kötet',
        description: 'Általános iskolai munkafüzet II. kötet negyedik évfolyam számára (OH-MAT04MA_II)',
        fileName: 'OH-MAT04MA_II__teljes.pdf',
        path: getStorageUrl('4_osztaly', 'OH-MAT04MA_II__teljes.pdf')
    }
];

const GRADE_5_MATERIALS: Material[] = [
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

const GRADE_6_MATERIALS: Material[] = [
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

const GRADE_7_MATERIALS: Material[] = [
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

const GRADE_8_MATERIALS: Material[] = [
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

export const GRADUATION_MATERIALS: Material[] = [
    {
        id: 'grad_gy',
        title: 'Matematika 9–12. Gyakorló és feladatgyűjtemény',
        description: 'Gyakorló és érettségire felkészítő feladatgyűjtemény (OH-MAT912GY)',
        fileName: 'OH-MAT912GY__teljes.pdf',
        path: getStorageUrl('12_osztaly', 'OH-MAT912GY__teljes.pdf')
    },
    {
        id: 'grad_fgv',
        title: 'Négyjegyű függvénytáblázatok 9–12.',
        description: 'Hivatalos érettségi négyjegyű függvénytáblázatok (OH-FGV912GY)',
        fileName: 'OH-FGV912GY__teljes.pdf',
        path: getStorageUrl('12_osztaly', 'OH-FGV912GY__teljes.pdf')
    },
    {
        id: 'grad_ae',
        title: 'Matematika 9–12. Az emelt szintű érettségihez',
        description: 'Középiskolai tananyag az emelt szintű érettségihez (OH-MAT912AE)',
        fileName: 'OH-MAT912AE__teljes.pdf',
        path: getStorageUrl('12_osztaly', 'OH-MAT912AE__teljes.pdf')
    }
];

interface MaterialGalleryProps {
    grade: GradeLevel;
    onView: (material: Material) => void;
    initialMaterialId?: string | null;
}

export function MaterialGallery({ grade, onView, initialMaterialId }: MaterialGalleryProps) {
    const materials =
        (grade === 1 || grade === '1') ? GRADE_1_MATERIALS :
        (grade === 2 || grade === '2') ? GRADE_2_MATERIALS :
        (grade === 3 || grade === '3') ? GRADE_3_MATERIALS :
        (grade === 4 || grade === '4') ? GRADE_4_MATERIALS :
        (grade === 5 || grade === '5') ? GRADE_5_MATERIALS :
        (grade === 6 || grade === '6') ? GRADE_6_MATERIALS :
        (grade === 7 || grade === '7') ? GRADE_7_MATERIALS :
        (grade === 8 || grade === '8') ? GRADE_8_MATERIALS :
        (grade === 'high-1' || grade === 9 || grade === '9') ? GRADE_9_MATERIALS :
        (grade === 'high-2' || grade === 10 || grade === '10') ? GRADE_10_MATERIALS :
        (grade === 'high-3' || grade === 11 || grade === '11') ? GRADE_11_MATERIALS :
        (grade === 'high-4' || grade === 12 || grade === '12') ? GRADE_12_MATERIALS :
        (grade === 'graduation') ? GRADUATION_MATERIALS :
        GRADE_1_MATERIALS;

    useEffect(() => {
        if (initialMaterialId) {
            const material = materials.find(m => m.id === initialMaterialId);
            if (material) {
                onView(material);
            }
        }
    }, [initialMaterialId, grade]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {materials.map((material) => (
                <Card key={material.id} className="overflow-hidden border-2 hover:border-primary/50 transition-colors group">
                    <CardHeader className="bg-slate-50 border-b group-hover:bg-primary/5 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold">{material.title}</CardTitle>
                                <p className="text-xs text-muted-foreground">{material.fileName}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {material.description}
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 gap-2"
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = material.path;
                                    link.download = material.fileName;
                                    link.click();
                                }}
                            >
                                <Download className="w-4 h-4" />
                                Letöltés
                            </Button>
                            <Button
                                className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700"
                                onClick={() => onView(material)}
                            >
                                <BookOpen className="w-4 h-4" />
                                Interaktív Óra
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
