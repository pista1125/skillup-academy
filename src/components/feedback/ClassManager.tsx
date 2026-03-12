import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Check, X, Users, UserPlus, Smile } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

export const AVATAR_CATEGORIES = [
  {
    id: 'animals',
    name: 'Állatos',
    icon: '🐶',
    avatars: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', 
      '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐥', '🦆'
    ]
  },
  {
    id: 'fantasy',
    name: 'Fantázia',
    icon: '🧞',
    avatars: [
      '🦄', '🐲', '🐉', '🧜', '🧚', '🧙', '🧛', '🧟', '🧞', '👻', 
      '👽', '👾', '🤖', '🎃', '👹', '👺', '🤡', '🤴', '👸', '🦸'
    ]
  },
  {
    id: 'objects',
    name: 'Tárgyak',
    icon: '🚀',
    avatars: [
      '🎒', '🎨', '🎭', '🎸', '⚽', '🏀', '🎮', '🛹', '🚲', '🚀', 
      '🛸', '🚁', '⛵', '🚂', '🚗', '📱', '💻', '💡', '💎', '🎁'
    ]
  },
  {
    id: 'cute',
    name: 'Cuki',
    icon: '🌈',
    avatars: [
      '🦋', '🐝', '🐞', '🍄', '🌻', '🌈', '🍭', '🍩', '🍦', '🧸', 
      '🎀', '🎈', '🧁', '🍪', '🥑', '🍓', '🐣', '🐿️', '🦔', '🐾'
    ]
  },
  {
    id: 'cool',
    name: 'Vagány',
    icon: '⚡',
    avatars: [
      '🕶️', '🎧', '🎸', '🏁', '🌋', '🌊', '🌪️', '⚡', '🔥', '❄️', 
      '🛡️', '⚔️', '🏆', '🎖️', '👑', '🧢', '👟', '🏍️', '🛰️', '🎱'
    ]
  }
];

export const STUDENT_AVATARS = AVATAR_CATEGORIES.flatMap(c => c.avatars);

interface ClassGroup {
  id: string;
  name: string;
}

interface Student {
  id: string;
  class_id: string;
  name: string;
  avatar_id: string;
}

export function ClassManager() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [newClassName, setNewClassName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentAvatar, setNewStudentAvatar] = useState(STUDENT_AVATARS[0]);
  
  // Edit states
  const [editingClass, setEditingClass] = useState<ClassGroup | null>(null);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentAvatar, setEditStudentAvatar] = useState('');
  // Avatar Picker State
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarMode, setAvatarMode] = useState<'new' | 'edit'>('new');
  const [activeCategory, setActiveCategory] = useState(AVATAR_CATEGORIES[0].id);

  useEffect(() => {
    if (user) {
      fetchClasses();
    }
  }, [user]);

  useEffect(() => {
    if (selectedClassId) {
      fetchStudents(selectedClassId);
    } else {
      setStudents([]);
    }
  }, [selectedClassId]);

  const fetchClasses = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('feedback_classes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Hiba az osztályok letöltésekor');
      console.error(error);
    } else {
      setClasses(data || []);
      if (data && data.length > 0 && !selectedClassId) {
        setSelectedClassId(data[0].id);
      }
    }
    setIsLoading(false);
  };

  const fetchStudents = async (classId: string) => {
    const { data, error } = await supabase
      .from('feedback_students')
      .select('*')
      .eq('class_id', classId)
      .order('name');

    if (error) {
      toast.error('Hiba a diákok letöltésekor');
      console.error(error);
    } else {
      setStudents(data || []);
    }
  };

  const addClass = async () => {
    if (!newClassName.trim() || !user) return;
    
    const { data, error } = await supabase
      .from('feedback_classes')
      .insert({ teacher_id: user.id, name: newClassName.trim() })
      .select()
      .single();

    if (error) {
      toast.error('Hiba az osztály létrehozásakor');
    } else if (data) {
      toast.success('Osztály létrehozva');
      setClasses([data, ...classes]);
      setNewClassName('');
      setSelectedClassId(data.id);
    }
  };

  const deleteClass = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt az osztályt? Minden diák és visszajelzés is törlődik!')) return;
    
    const { error } = await supabase
      .from('feedback_classes')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Hiba a törlés során');
    } else {
      toast.success('Osztály törölve');
      setClasses(classes.filter(c => c.id !== id));
      if (selectedClassId === id) {
        setSelectedClassId(classes.length > 1 ? classes.find(c => c.id !== id)?.id || null : null);
      }
    }
  };

  const addStudent = async () => {
    if (!newStudentName.trim() || !selectedClassId) return;
    
    const { data, error } = await supabase
      .from('feedback_students')
      .insert({ 
        class_id: selectedClassId, 
        name: newStudentName.trim(),
        avatar_id: newStudentAvatar
      })
      .select()
      .single();

    if (error) {
      toast.error('Hiba a diák hozzáadásakor');
    } else if (data) {
      toast.success('Diák hozzáadva');
      setStudents([...students, data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewStudentName('');
      // Válasszunk véletlenszerűen egy másik avatárt
      setNewStudentAvatar(STUDENT_AVATARS[Math.floor(Math.random() * STUDENT_AVATARS.length)]);
    }
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt a diákot?')) return;
    
    const { error } = await supabase
      .from('feedback_students')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Hiba a törlés során');
    } else {
      toast.success('Diák törölve');
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const updateStudent = async () => {
    if (!editingStudentId || !editStudentName.trim()) return;

    const { error } = await supabase
      .from('feedback_students')
      .update({
        name: editStudentName.trim(),
        avatar_id: editStudentAvatar
      })
      .eq('id', editingStudentId);

    if (error) {
      toast.error('Hiba a mentés során');
    } else {
      toast.success('Diák adatai frissítve');
      setStudents(students.map(s => 
        s.id === editingStudentId 
          ? { ...s, name: editStudentName.trim(), avatar_id: editStudentAvatar } 
          : s
      ));
      setEditingStudentId(null);
    }
  };

  const startEditStudent = (student: Student) => {
    setEditingStudentId(student.id);
    setEditStudentName(student.name);
    setEditStudentAvatar(student.avatar_id);
  };

  const openAvatarPicker = (mode: 'new' | 'edit') => {
    setAvatarMode(mode);
    setIsAvatarModalOpen(true);
  };

  const selectAvatar = (avatar: string) => {
    if (avatarMode === 'new') {
      setNewStudentAvatar(avatar);
    } else {
      setEditStudentAvatar(avatar);
    }
    setIsAvatarModalOpen(false);
  };

  if (isLoading && classes.length === 0) {
    return <div className="p-8 text-center text-slate-500">Töltés...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Bal oldal: Osztályok listája */}
      <div className="w-full md:w-1/3 border-r md:pr-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          Osztályaim
        </h3>
        
        <div className="flex gap-2 mb-6">
          <Input 
            placeholder="Új osztály neve..." 
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addClass()}
          />
          <Button onClick={addClass} disabled={!newClassName.trim()} size="icon" className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {classes.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4 bg-slate-50 rounded-lg">Még nincs felvéve osztály.</p>
          ) : (
            classes.map(cls => (
              <div 
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                  selectedClassId === cls.id 
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-medium' 
                    : 'hover:bg-slate-50 border border-transparent text-slate-600'
                }`}
              >
                <span>{cls.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-slate-400 hover:text-red-500"
                  onClick={(e) => { e.stopPropagation(); deleteClass(cls.id); }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Jobb oldal: Választott osztály diákjai */}
      <div className="w-full md:w-2/3">
        {selectedClassId ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Diákok - {classes.find(c => c.id === selectedClassId)?.name}
              </h3>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {students.length} fő
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100">
              <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-500" />
                Új diák felvétele
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input 
                    placeholder="Diák neve..." 
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addStudent()}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openAvatarPicker('new')}
                    className="text-2xl bg-white border border-slate-200 h-10 w-10 flex items-center justify-center rounded-lg hover:border-indigo-300 transition-colors"
                    title="Profilkép választása"
                  >
                    {newStudentAvatar}
                  </button>
                  <Button onClick={addStudent} disabled={!newStudentName.trim()} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Hozzáadás
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {students.length === 0 ? (
                <div className="col-span-full text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                  Nincsenek diákok ebben az osztályban. Adj hozzá párat fentre!
                </div>
              ) : (
                students.map(student => (
                  <div key={student.id} className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    {editingStudentId === student.id ? (
                      <div className="p-3 space-y-3 bg-indigo-50/30">
                        <div className="flex gap-2">
                           <button 
                            onClick={() => openAvatarPicker('edit')}
                            className="text-2xl bg-white border border-slate-200 h-10 w-10 flex items-center justify-center rounded-lg hover:border-indigo-300 shrink-0"
                          >
                            {editStudentAvatar}
                          </button>
                          <Input 
                            value={editStudentName}
                            onChange={(e) => setEditStudentName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && updateStudent()}
                            className="h-10"
                            autoFocus
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={updateStudent} size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-8">
                            <Check className="w-4 h-4 mr-1" /> Mentés
                          </Button>
                          <Button onClick={() => setEditingStudentId(null)} variant="outline" size="sm" className="h-8">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl bg-slate-50 h-10 w-10 flex items-center justify-center rounded-full border border-slate-100">
                            {student.avatar_id}
                          </div>
                          <span className="font-medium text-slate-800">{student.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                            onClick={() => startEditStudent(student)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                            onClick={() => deleteStudent(student.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Avatar Picker Modal */}
            <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
              <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-[2.5rem] p-0 overflow-hidden">
                <div className="flex flex-col h-[550px]">
                  <DialogHeader className="p-8 pb-4">
                    <DialogTitle className="text-3xl font-black text-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smile className="w-8 h-8 text-indigo-500" />
                        Válassz avatárt!
                      </div>
                      <div className="text-sm font-bold text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                        {STUDENT_AVATARS.length} lehetőség
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-1 overflow-hidden">
                    {/* Category Sidebar */}
                    <div className="w-48 bg-slate-50/50 border-r border-slate-100 p-4 flex flex-col gap-2">
                      {AVATAR_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-2xl transition-all text-left font-bold text-sm",
                            activeCategory === cat.id
                              ? "bg-white text-indigo-600 shadow-md ring-1 ring-slate-200"
                              : "text-slate-500 hover:bg-white/50 hover:text-slate-800"
                          )}
                        >
                          <span className="text-xl">{cat.icon}</span>
                          {cat.name}
                        </button>
                      ))}
                    </div>

                    {/* Avatar Grid */}
                    <div className="flex-1 overflow-y-auto p-6 pt-2 custom-scrollbar">
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                        {AVATAR_CATEGORIES.find(c => c.id === activeCategory)?.avatars.map((avatar, idx) => (
                          <button
                            key={idx}
                            onClick={() => selectAvatar(avatar)}
                            className={cn(
                              "text-4xl aspect-square flex items-center justify-center rounded-2xl transition-all border-2",
                              (avatarMode === 'new' ? newStudentAvatar === avatar : editStudentAvatar === avatar)
                                ? "bg-indigo-50 border-indigo-500 scale-110 shadow-md"
                                : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50 shadow-sm"
                            )}
                          >
                            <span className="transform transition-transform hover:scale-125 duration-200">{avatar}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                    <Button 
                      onClick={() => setIsAvatarModalOpen(false)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl px-10"
                    >
                      Kész
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-400">
            <Users className="w-16 h-16 mb-4 text-slate-200" />
            <p>Válassz egy osztályt a bal oldali listából,</p>
            <p>vagy hozz létre egy újat!</p>
          </div>
        )}
      </div>
    </div>
  );
}
