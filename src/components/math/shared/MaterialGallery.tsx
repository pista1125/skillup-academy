import { useState, useEffect } from 'react';
import { GradeLevel } from '@/types/education';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, FileText, BookOpen } from 'lucide-react';

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

export { GRADE_1_MATERIALS } from '@/components/math/grade-1/tananyagok/materials';
export { GRADE_2_MATERIALS } from '@/components/math/grade-2/tananyagok/materials';
export { GRADE_3_MATERIALS } from '@/components/math/grade-3/tananyagok/materials';
export { GRADE_4_MATERIALS } from '@/components/math/grade-4/tananyagok/materials';
export { GRADE_5_MATERIALS } from '@/components/math/grade-5/tananyagok/materials';
export { GRADE_6_MATERIALS } from '@/components/math/grade-6/tananyagok/materials';
export { GRADE_7_MATERIALS } from '@/components/math/grade-7/tananyagok/materials';
export { GRADE_8_MATERIALS } from '@/components/math/grade-8/tananyagok/materials';
export { GRADE_9_MATERIALS } from '@/components/math/grade-9/tananyagok/materials';
export { GRADE_10_MATERIALS } from '@/components/math/grade-10/tananyagok/materials';
export { GRADE_11_MATERIALS } from '@/components/math/grade-11/tananyagok/materials';
export { GRADE_12_MATERIALS } from '@/components/math/grade-12/tananyagok/materials';

import { GRADE_1_MATERIALS } from '@/components/math/grade-1/tananyagok/materials';
import { GRADE_2_MATERIALS } from '@/components/math/grade-2/tananyagok/materials';
import { GRADE_3_MATERIALS } from '@/components/math/grade-3/tananyagok/materials';
import { GRADE_4_MATERIALS } from '@/components/math/grade-4/tananyagok/materials';
import { GRADE_5_MATERIALS } from '@/components/math/grade-5/tananyagok/materials';
import { GRADE_6_MATERIALS } from '@/components/math/grade-6/tananyagok/materials';
import { GRADE_7_MATERIALS } from '@/components/math/grade-7/tananyagok/materials';
import { GRADE_8_MATERIALS } from '@/components/math/grade-8/tananyagok/materials';
import { GRADE_9_MATERIALS } from '@/components/math/grade-9/tananyagok/materials';
import { GRADE_10_MATERIALS } from '@/components/math/grade-10/tananyagok/materials';
import { GRADE_11_MATERIALS } from '@/components/math/grade-11/tananyagok/materials';
import { GRADE_12_MATERIALS } from '@/components/math/grade-12/tananyagok/materials';

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
