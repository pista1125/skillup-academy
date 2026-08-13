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

const getStorageUrl = (folder: string, fileName: string) => {
    return `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(folder)}%2F${encodeURIComponent(fileName)}?alt=media`;
};

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

const GRADE_9_MATERIALS: Material[] = [
    {
        id: 'mat09ta',
        title: 'Matematika 9. Tankönyv',
        description: 'Középiskolai tankönyv kilencedik évfolyam számára (OH-MAT09TA)',
        fileName: 'OH-MAT09TA__teljes.pdf',
        path: getStorageUrl('9_osztaly', 'OH-MAT09TA__teljes.pdf')
    },
    {
        id: 'mat09ma',
        title: 'Matematika 9. Munkafüzet',
        description: 'Középiskolai munkafüzet kilencedik évfolyam számára (OH-MAT09MA)',
        fileName: 'OH-MAT09MA__teljes.pdf',
        path: getStorageUrl('9_osztaly', 'OH-MAT09MA__teljes.pdf')
    }
];

interface MaterialGalleryProps {
    grade: GradeLevel;
    onView: (material: Material) => void;
    initialMaterialId?: string | null;
}

export function MaterialGallery({ grade, onView, initialMaterialId }: MaterialGalleryProps) {
    const materials =
        grade === 5 ? GRADE_5_MATERIALS :
        grade === 6 ? GRADE_6_MATERIALS :
        grade === 7 ? GRADE_7_MATERIALS :
        grade === 8 ? GRADE_8_MATERIALS :
        (grade === 'high-1' || grade === 9) ? GRADE_9_MATERIALS :
        GRADE_7_MATERIALS;

    useEffect(() => {
        if (initialMaterialId) {
            const material = materials.find(m => m.id === initialMaterialId);
            if (material) {
                onView(material);
            }
        }
    }, [initialMaterialId, grade]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
