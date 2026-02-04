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

const GRADE_5_MATERIALS: Material[] = [
    {
        id: 'mat05ma',
        title: 'Matematika 5. Tankönyv',
        description: 'Általános iskolai tankönyv ötödik évfolyam számára (OH-MAT05MA)',
        fileName: 'OH-MAT05TA__teljes.pdf',
        path: '/assets/materials/math/grade5/OH-MAT05TA__teljes.pdf'
    },
    {
        id: 'mat05ta',
        title: 'Matematika 5. Munkafüzet',
        description: 'Általános iskolai munkafüzet ötödik évfolyam számára (OH-MAT05TA)',
        fileName: 'OH-MAT05MA__teljes.pdf',
        path: '/assets/materials/math/grade5/OH-MAT05MA__teljes.pdf'
    }
];

const GRADE_6_MATERIALS: Material[] = [
    {
        id: 'mat06ma',
        title: 'Matematika 6. Tankönyv',
        description: 'Általános iskolai tankönyv hatodik évfolyam számára (OH-MAT06MA)',
        fileName: 'OH-MAT06MA__teljes.pdf',
        path: '/assets/materials/math/grade6/OH-MAT06MA__teljes.pdf'
    },
    {
        id: 'mat06ta',
        title: 'Matematika 6. Munkafüzet',
        description: 'Általános iskolai munkafüzet hatodik évfolyam számára (OH-MAT06TA)',
        fileName: 'OH-MAT06TA__teljes.pdf',
        path: '/assets/materials/math/grade6/OH-MAT06TA__teljes.pdf'
    }
];

const GRADE_7_MATERIALS: Material[] = [
    {
        id: 'primtenyezos-7',
        title: 'Prímtényezős felbontás',
        description: 'Interaktív segédlet a prímtényezőkre bontáshoz és az oszthatósághoz',
        fileName: 'primtenyezos_felbontas.pdf',
        path: '/assets/materials/math/grade7/primtenyezos_felbontas.pdf'
    },
    {
        id: 'oszthatosag-7',
        title: 'Oszthatósági szabályok',
        description: 'Bevezetés az oszthatósági szabályokba (letölthető PPT)',
        fileName: 'oszthatosagi_szabalyok.pptx',
        path: '/assets/materials/math/grade7/oszthatosagi_szabalyok.pptx'
    }
];

interface MaterialGalleryProps {
    grade: GradeLevel;
    onView: (material: Material) => void;
}

export function MaterialGallery({ grade, onView }: MaterialGalleryProps) {
    const materials = grade === 5 ? GRADE_5_MATERIALS : grade === 6 ? GRADE_6_MATERIALS : GRADE_7_MATERIALS;

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
            <div className="md:col-span-2 p-8 bg-blue-50/50 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col items-center text-center space-y-2">
                <Eye className="w-10 h-10 text-blue-400 opacity-50" />
                <h4 className="font-bold text-blue-900">További anyagok</h4>
                <p className="text-sm text-blue-800/60 max-w-md">
                    Ha van egyéb PDF fájlod, másold a <code>public/assets/materials/math/grade{grade}</code> mappába, és töltsd be itt!
                </p>
            </div>
        </div>
    );
}
