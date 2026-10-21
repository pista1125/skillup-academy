import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  UserPlus, 
  Plus, 
  Trash2, 
  Edit2, 
  KeyRound, 
  Loader2, 
  GraduationCap, 
  Check, 
  X,
  Search,
  School
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  subscribeTeacherClasses,
  createTeacherClass,
  deleteTeacherClass,
  updateTeacherClassName,
  addStudentToClassByCode,
  removeStudentFromClass,
  TeacherClass,
  ClassStudent
} from '@/services/teacherClassService';

export default function ClassManager() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [newClassName, setNewClassName] = useState('');
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  
  // Student addition state
  const [studentCodeInput, setStudentCodeInput] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [studentSearchFilter, setStudentSearchFilter] = useState('');

  // Class renaming state
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editClassName, setEditClassName] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);

    const unsubscribe = subscribeTeacherClasses(
      user.uid,
      (fetchedClasses) => {
        setClasses(fetchedClasses);
        setIsLoading(false);
        if (fetchedClasses.length > 0 && !selectedClassId) {
          setSelectedClassId(fetchedClasses[0].id);
        } else if (fetchedClasses.length > 0 && selectedClassId && !fetchedClasses.some(c => c.id === selectedClassId)) {
          setSelectedClassId(fetchedClasses[0].id);
        }
      },
      (error) => {
        console.error('Error fetching classes:', error);
        toast.error('Hiba az osztályok betöltésekor');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const selectedClass = classes.find(c => c.id === selectedClassId) || null;

  const handleCreateClass = async () => {
    if (!user) return;
    const trimmed = newClassName.trim();
    if (!trimmed) {
      toast.error('Kérlek, adj meg egy osztálynevet!');
      return;
    }

    setIsCreatingClass(true);
    try {
      const newId = await createTeacherClass(user.uid, trimmed);
      toast.success(`"${trimmed}" osztály sikeresen létrehozva!`);
      setNewClassName('');
      setSelectedClassId(newId);
    } catch (error: any) {
      toast.error(error.message || 'Hiba az osztály létrehozásakor');
    } finally {
      setIsCreatingClass(false);
    }
  };

  const handleDeleteClass = async (classId: string, className: string) => {
    if (!confirm(`Biztosan törlöd a(z) "${className}" osztályt? A beiratkozott diákok és adatok törlődnek ebből az osztályból.`)) {
      return;
    }

    try {
      await deleteTeacherClass(classId);
      toast.success(`"${className}" osztály törölve.`);
      if (selectedClassId === classId) {
        const remaining = classes.filter(c => c.id !== classId);
        setSelectedClassId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (error) {
      toast.error('Hiba az osztály törlésekor');
    }
  };

  const handleStartRename = (cls: TeacherClass) => {
    setEditingClassId(cls.id);
    setEditClassName(cls.name);
  };

  const handleSaveRename = async (classId: string) => {
    const trimmed = editClassName.trim();
    if (!trimmed) return;
    try {
      await updateTeacherClassName(classId, trimmed);
      toast.success('Osztálynév frissítve');
      setEditingClassId(null);
    } catch (error) {
      toast.error('Hiba a név mentésekor');
    }
  };

  const handleAddStudent = async () => {
    if (!selectedClassId) {
      toast.error('Előbb válassz ki egy osztályt!');
      return;
    }

    const cleanCode = studentCodeInput.replace(/\s+/g, '').trim();
    if (!cleanCode || cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      toast.error('A megadott azonosítónak pontosan 6 számjegyből kell állnia (pl. 582914)!');
      return;
    }

    setIsAddingStudent(true);
    try {
      const result = await addStudentToClassByCode(selectedClassId, cleanCode);
      if (result.success) {
        toast.success(`✓ ${result.studentName || 'Diák'} sikeresen hozzáadva az osztályhoz!`);
        setStudentCodeInput('');
      } else {
        toast.error(result.error || 'Nem sikerült hozzáadni a diákot.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Hiba a diák hozzáadásakor.');
    } finally {
      setIsAddingStudent(false);
    }
  };

  const handleRemoveStudent = async (student: ClassStudent) => {
    if (!selectedClassId) return;
    if (!confirm(`Biztosan törlöd ${student.name} tanulót az osztályból?`)) return;

    try {
      await removeStudentFromClass(selectedClassId, student.userId);
      toast.success(`${student.name} eltávolítva az osztályból.`);
    } catch (error) {
      toast.error('Hiba a diák eltávolításakor.');
    }
  };

  const filteredStudents = selectedClass?.students?.filter(s => {
    if (!studentSearchFilter.trim()) return true;
    const query = studentSearchFilter.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.userCode.includes(query) ||
      (s.email && s.email.toLowerCase().includes(query))
    );
  }) || [];

  return (
    <div className="w-full space-y-4">
      {/* Informative Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-3 sm:p-4 text-white shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black flex items-center gap-2">
              Osztályok és Diákok Kezelése
              <span className="text-[10px] font-bold uppercase bg-white/25 px-2 py-0.5 rounded-full">
                Valós szinkron
              </span>
            </h2>
            <p className="text-xs text-emerald-100">
              A profilodban és itt rögzített osztályok és 6 jegyű kóddal felvett diákok teljesen közösek.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-sm">
          <Users className="w-3.5 h-3.5" />
          <span>{classes.length} Osztály</span>
          <span className="opacity-60">•</span>
          <span>{classes.reduce((acc, c) => acc + (c.students?.length || 0), 0)} Diák</span>
        </div>
      </div>

      {/* Main 2-Column Split: Classes list (left) & Student roster (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Bal Oszlop: Osztályok Listája & Új Osztály Létrehozása (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl p-3 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              🏫 Osztályaim ({classes.length})
            </h3>
          </div>

          {/* Új osztály hozzáadása */}
          <div className="flex gap-1.5">
            <Input
              placeholder="Új osztály (pl. 7. osztály)..."
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateClass()}
              className="h-8 text-xs rounded-xl bg-white border-slate-200"
            />
            <Button
              size="sm"
              disabled={isCreatingClass || !newClassName.trim()}
              onClick={handleCreateClass}
              className="h-8 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0"
            >
              {isCreatingClass ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>

          {/* Osztályok görgethető listája */}
          <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-0.5">
            {isLoading ? (
              <p className="text-xs text-slate-400 py-6 text-center">Osztályok betöltése...</p>
            ) : classes.length === 0 ? (
              <div className="text-center py-6 px-3 bg-white rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                Még nincs osztályod. Írd be a nevet felül, és kattints a <strong>+</strong> gombra!
              </div>
            ) : (
              classes.map((cls) => {
                const isSelected = selectedClassId === cls.id;
                const isEditing = editingClassId === cls.id;
                const studentCount = cls.students?.length || 0;

                return (
                  <div
                    key={cls.id}
                    onClick={() => setSelectedClassId(cls.id)}
                    className={cn(
                      "p-2.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between group",
                      isSelected
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-600 shadow-xs"
                        : "bg-white hover:bg-slate-100/80 text-slate-800 border-slate-200/80"
                    )}
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 flex-1 mr-1" onClick={(e) => e.stopPropagation()}>
                        <Input
                          value={editClassName}
                          onChange={(e) => setEditClassName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(cls.id)}
                          className="h-7 text-xs bg-white text-slate-800 rounded-lg"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(cls.id)}
                          className="p-1 hover:bg-white/20 rounded text-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingClassId(null)}
                          className="p-1 hover:bg-white/20 rounded text-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-xs truncate">{cls.name}</p>
                          {isSelected && <Check className="w-3 h-3 text-white shrink-0" />}
                        </div>
                        <p className={cn(
                          "text-[10px] flex items-center gap-1 mt-0.5",
                          isSelected ? "text-emerald-100" : "text-slate-400"
                        )}>
                          <GraduationCap className="w-3 h-3" />
                          <span>{studentCount} diák</span>
                        </p>
                      </div>
                    )}

                    {!isEditing && (
                      <div className="flex items-center gap-0.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartRename(cls);
                          }}
                          className={cn(
                            "p-1 rounded-lg hover:bg-black/10 transition-colors",
                            isSelected ? "text-white" : "text-slate-400 hover:text-slate-700"
                          )}
                          title="Átnevezés"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClass(cls.id, cls.name);
                          }}
                          className={cn(
                            "p-1 rounded-lg hover:bg-black/10 transition-colors",
                            isSelected ? "text-white hover:text-rose-200" : "text-slate-400 hover:text-rose-500"
                          )}
                          title="Törlés"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Jobb Oszlop: Beiratkozott diákok névsora & 6 számjegyű kódos felvétel (8 cols) */}
        <div className="lg:col-span-8 space-y-3.5">
          {selectedClass ? (
            <div className="bg-slate-50/70 rounded-2xl p-3 sm:p-4 border border-slate-200/80 space-y-3.5">
              {/* Fejléc: Kijelölt osztály neve & gyors összefoglaló */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    🏫
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 leading-tight">
                      {selectedClass.name}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {selectedClass.students?.length || 0} beiratkozott diák
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-slate-200/70">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Diákfelvétel 6 jegyű kóddal</span>
                </div>
              </div>

              {/* 6 számjegyű kódos diák-hozzáadás sáv */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 p-3 rounded-xl border border-emerald-200/70 space-y-2">
                <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                  Diák felvétele 6 számjegyű kód alapján:
                </Label>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      placeholder="Írd be a diák 6 jegyű kódját (pl. 582914)..."
                      value={studentCodeInput}
                      onChange={(e) => setStudentCodeInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddStudent()}
                      maxLength={8}
                      className="pl-8 h-9 text-xs sm:text-sm font-mono tracking-wider bg-white rounded-xl border-slate-300"
                    />
                  </div>
                  <Button
                    onClick={handleAddStudent}
                    disabled={isAddingStudent || !studentCodeInput.trim()}
                    className="h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs"
                  >
                    {isAddingStudent ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Hozzáadás</span>
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-[10px] text-slate-500 flex items-center gap-1 pt-0.5">
                  <span>💡</span>
                  <span>A diákok a saját profiljukban vagy a fejlécben látják a személyes 6 jegyű kódjukat.</span>
                </p>
              </div>

              {/* Kereső / Szűrő a meglévő diákok között */}
              {selectedClass.students && selectedClass.students.length > 5 && (
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    placeholder="Diák keresése név vagy kód alapján..."
                    value={studentSearchFilter}
                    onChange={(e) => setStudentSearchFilter(e.target.value)}
                    className="pl-8 h-8 text-xs rounded-xl bg-white border-slate-200"
                  />
                </div>
              )}

              {/* Diákok Névtára (Roster Grid) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <span>Beiratkozott Tanulók ({filteredStudents.length})</span>
                </div>

                {(!selectedClass.students || selectedClass.students.length === 0) ? (
                  <div className="text-center py-10 px-4 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                    <GraduationCap className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-bold text-slate-600 mb-1">Még nincsenek diákok ebben az osztályban</p>
                    <p className="text-[11px] max-w-sm mx-auto">
                      Kérd el a tanulóidtól a személyes 6 jegyű kódjukat, és a fenti zöld mezőbe beírva azonnal felveheted őket!
                    </p>
                  </div>
                ) : filteredStudents.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">Nincs a keresésnek megfelelő diák.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-0.5">
                    {filteredStudents.map((student) => {
                      const avatar = student.avatarUrl || '🎒';
                      const isImgAvatar = avatar.startsWith('http') || avatar.startsWith('data:') || avatar.startsWith('/');

                      return (
                        <div
                          key={student.userId || student.userCode}
                          className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-300 transition-all shadow-2xs group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-1">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold shrink-0 overflow-hidden">
                              {isImgAvatar ? (
                                <img src={avatar} alt={student.name} className="w-full h-full object-cover" />
                              ) : (
                                <span>{avatar}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-xs text-slate-800 truncate leading-tight">
                                {student.name}
                              </p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                  #{student.userCode}
                                </span>
                                {student.email && (
                                  <span className="text-[10px] text-slate-400 truncate max-w-[110px]">
                                    {student.email}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveStudent(student)}
                            className="h-7 w-7 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                            title="Diák eltávolítása az osztályból"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 p-8 text-slate-400 text-xs">
              <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="font-bold text-slate-600 mb-1">Nincs kiválasztott osztály</p>
              <p>Válassz ki egy osztályt a bal oldali listából a tanulók megtekintéséhez és kezeléséhez!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
