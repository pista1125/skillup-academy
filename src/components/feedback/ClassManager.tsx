import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Check, X, Users, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export const STUDENT_AVATARS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', 
  '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦉',
  '🦄', '🐝', '🐛', '🦋', '🐢', '🐙', '🐧', '🐥'
];

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
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

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
                  <span className="text-lg bg-white border border-slate-200 h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer" title="Kattints másik avatárhóz" onClick={() => setNewStudentAvatar(STUDENT_AVATARS[(STUDENT_AVATARS.indexOf(newStudentAvatar) + 1) % STUDENT_AVATARS.length])}>
                    {newStudentAvatar}
                  </span>
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
                  <div key={student.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl bg-slate-50 h-10 w-10 flex items-center justify-center rounded-full border border-slate-100">
                        {student.avatar_id}
                      </div>
                      <span className="font-medium text-slate-800">{student.name}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => deleteStudent(student.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
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
