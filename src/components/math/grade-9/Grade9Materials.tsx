import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Download, Eye, FileText } from 'lucide-react';
import { GRADE_9_MATERIALS, Material } from './tananyagok/materials';

interface Grade9MaterialsProps {
    onView?: (material: Material) => void;
}

export const Grade9Materials: React.FC<Grade9MaterialsProps> = ({ onView }) => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-7 h-7 text-blue-200" />
                    <h2 className="text-2xl font-black">9. Osztályos Matematika Tananyagok</h2>
                </div>
                <p className="text-blue-100 text-sm max-w-2xl">
                    Hivatalos tankönyvek, munkafüzetek és emelt szintű érettségi felkészítő anyagok 9. évfolyam számára.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GRADE_9_MATERIALS.map((material) => (
                    <Card
                        key={material.id}
                        className="overflow-hidden border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 rounded-2xl group flex flex-col justify-between bg-white"
                    >
                        <CardHeader className="bg-gradient-to-br from-slate-50 to-blue-50/30 border-b border-slate-100 p-5">
                            <div className="flex items-start gap-3.5">
                                <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <CardTitle className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {material.title}
                                    </CardTitle>
                                    <p className="text-xs text-slate-500 font-medium line-clamp-2">
                                        {material.description}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 flex items-center justify-between gap-3 bg-white">
                            <span className="text-[11px] font-semibold text-slate-400 truncate max-w-[150px]">
                                {material.fileName}
                            </span>
                            <div className="flex items-center gap-2">
                                {onView && (
                                    <Button
                                        onClick={() => onView(material)}
                                        variant="outline"
                                        size="sm"
                                        className="h-9 px-3 text-xs font-bold gap-1.5 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                        Megnyitás
                                    </Button>
                                )}
                                <Button
                                    asChild
                                    size="sm"
                                    className="h-9 px-3 text-xs font-bold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow rounded-xl"
                                >
                                    <a href={material.path} target="_blank" rel="noopener noreferrer" download>
                                        <Download className="w-3.5 h-3.5" />
                                        Letöltés
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Grade9Materials;
