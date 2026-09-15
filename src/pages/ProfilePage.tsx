import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { auth, db, storage } from '@/lib/firebase';
import { updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  User, 
  Camera, 
  ChevronLeft, 
  Loader2, 
  Sun,
  Moon,
  Layout,
  History,
  TrendingUp,
  Award,
  Copy,
  Users,
  Plus,
  Trash2,
  UserPlus,
  Check,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Mail,
  GraduationCap,
  BarChart3,
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Pencil,
  X,
  AlertTriangle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useThemeSync } from '@/components/ThemeToggle';
import { 
  TeacherClass, 
  subscribeTeacherClasses, 
  createTeacherClass, 
  deleteTeacherClass, 
  updateTeacherClassName,
  addStudentToClassByCode, 
  removeStudentFromClass 
} from '@/services/teacherClassService';
import { 
  subscribeUserProgress, 
  QuizProgressRecord 
} from '@/services/quizProgressService';
import { ClassQuizProgressMatrix } from '@/components/feedback/ClassQuizProgressMatrix';

const AVATARS = [
  '🎒', '🎓', '👨‍🏫', '👩‍🏫', '🖍️', '🧪', '🧬', '🚀', '🎨', '🧩', '🎸', '⚽'
];

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useThemeSync();

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [role, setRole] = useState<'teacher' | 'student'>(profile?.role || 'student');
  const [activeTab, setActiveTab] = useState<'personal' | 'classes' | 'activity' | 'settings'>('personal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync activeTab with URL query parameter (?tab=settings etc.)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['personal', 'classes', 'activity', 'settings'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [location.search]);

  // Password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isSendingResetEmail, setIsSendingResetEmail] = useState(false);

  // Teacher class management states
  const [teacherClasses, setTeacherClasses] = useState<TeacherClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [newClassName, setNewClassName] = useState('');
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [showAddClassInput, setShowAddClassInput] = useState(false);
  const [studentCodeInput, setStudentCodeInput] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [classViewMode, setClassViewMode] = useState<'roster' | 'quiz_matrix'>('roster');
  const [isEditingClassName, setIsEditingClassName] = useState(false);
  const [editClassNameValue, setEditClassNameValue] = useState('');
  const [isSavingClassName, setIsSavingClassName] = useState(false);
  const [classToDelete, setClassToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeletingClass, setIsDeletingClass] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState<{ classId: string; studentUserId: string; studentName: string } | null>(null);
  const [isRemovingStudent, setIsRemovingStudent] = useState(false);

  // Student user progress & activity states
  const [userProgressMap, setUserProgressMap] = useState<Record<string, QuizProgressRecord>>({});
  const [activityFilter, setActivityFilter] = useState<'all' | 'quiz' | 'matcher' | 'sorter'>('all');

  const googlePhoto = user?.photoURL;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('A kép mérete nem lehet nagyobb, mint 2MB');
      return;
    }

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const storageRef = ref(storage, `avatars/${user.uid}/${Date.now()}.${fileExt}`);
      await uploadBytes(storageRef, file);
      const publicUrl = await getDownloadURL(storageRef);

      setAvatarUrl(publicUrl);
      toast.success('Kép sikeresen feltöltve! Ne felejtsd el elmenteni a módosításokat.');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Hiba a kép feltöltésekor: ' + (error.message || 'Ismeretlen hiba'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
      setRole(profile.role || 'student');
    }
  }, [profile]);

  // Subscribe to teacher's classes
  useEffect(() => {
    if (!user || role !== 'teacher') return;
    const unsubscribe = subscribeTeacherClasses(user.uid, (classes) => {
      setTeacherClasses(classes);
      if (classes.length > 0) {
        setSelectedClassId((prev) => {
          if (prev && classes.some(c => c.id === prev)) return prev;
          return classes[0].id;
        });
      } else {
        setSelectedClassId(null);
      }
    });
    return () => unsubscribe();
  }, [user, role]);

  // Subscribe to student's quiz & game activities
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeUserProgress(user.uid, (progressMap) => {
      setUserProgressMap(progressMap);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    setIsEditingClassName(false);
  }, [selectedClassId]);

  // Unique activity records sorted by most recent
  const activityList = useMemo(() => {
    const rawList = Object.values(userProgressMap).filter((item) => item.completed && item.quizId);
    // Deduplicate by quizId
    const uniqueMap = new Map<string, QuizProgressRecord>();
    rawList.forEach((r) => {
      if (!uniqueMap.has(r.quizId)) {
        uniqueMap.set(r.quizId, r);
      } else {
        const existing = uniqueMap.get(r.quizId)!;
        if (new Date(r.lastCompletedAt).getTime() > new Date(existing.lastCompletedAt).getTime()) {
          uniqueMap.set(r.quizId, r);
        }
      }
    });

    const list = Array.from(uniqueMap.values());
    list.sort((a, b) => new Date(b.lastCompletedAt).getTime() - new Date(a.lastCompletedAt).getTime());
    return list;
  }, [userProgressMap]);

  // Filtered activity list
  const filteredActivities = useMemo(() => {
    if (activityFilter === 'all') return activityList;
    return activityList.filter((a) => a.gameType === activityFilter);
  }, [activityList, activityFilter]);

  // Student calculated stats
  const studentStats = useMemo(() => {
    const totalCompleted = activityList.length;
    if (totalCompleted === 0) return { count: 0, avgScore: 0, perfectCount: 0 };
    const scoreSum = activityList.reduce((acc, r) => acc + (r.bestScore || 0), 0);
    const avgScore = Math.round(scoreSum / totalCompleted);
    const perfectCount = activityList.filter((r) => r.bestScore === 100).length;
    return { count: totalCompleted, avgScore, perfectCount };
  }, [activityList]);

  // Teacher calculated stats
  const teacherStats = useMemo(() => {
    const totalClasses = teacherClasses.length;
    const totalStudents = teacherClasses.reduce((acc, c) => acc + (c.students?.length || 0), 0);
    return { totalClasses, totalStudents };
  }, [teacherClasses]);

  const handleCreateClass = async () => {
    if (!newClassName.trim() || !user) return;
    setIsCreatingClass(true);
    try {
      const classId = await createTeacherClass(user.uid, newClassName.trim());
      setNewClassName('');
      setShowAddClassInput(false);
      setSelectedClassId(classId);
      toast.success('Osztály sikeresen létrehozva!');
    } catch (error: any) {
      toast.error('Hiba az osztály létrehozásakor: ' + error.message);
    } finally {
      setIsCreatingClass(false);
    }
  };

  const confirmDeleteClass = async () => {
    if (!classToDelete) return;
    setIsDeletingClass(true);
    try {
      await deleteTeacherClass(classToDelete.id);
      toast.success(`A(z) "${classToDelete.name}" osztály sikeresen törölve.`);
      if (selectedClassId === classToDelete.id) {
        const remaining = teacherClasses.filter(c => c.id !== classToDelete.id);
        setSelectedClassId(remaining.length > 0 ? remaining[0].id : null);
      }
      setClassToDelete(null);
    } catch (error: any) {
      toast.error('Hiba a törlés során: ' + error.message);
    } finally {
      setIsDeletingClass(false);
    }
  };

  const handleStartEditingClassName = () => {
    if (!selectedClass) return;
    setEditClassNameValue(selectedClass.name);
    setIsEditingClassName(true);
  };

  const handleSaveClassName = async () => {
    if (!selectedClass || !editClassNameValue.trim()) return;
    if (editClassNameValue.trim() === selectedClass.name) {
      setIsEditingClassName(false);
      return;
    }
    setIsSavingClassName(true);
    try {
      await updateTeacherClassName(selectedClass.id, editClassNameValue.trim());
      toast.success('Osztály neve sikeresen módosítva! 🎉');
      setIsEditingClassName(false);
    } catch (error: any) {
      toast.error('Hiba az átnevezés során: ' + error.message);
    } finally {
      setIsSavingClassName(false);
    }
  };

  const handleAddStudent = async () => {
    if (!selectedClassId || !studentCodeInput.trim()) return;
    setIsAddingStudent(true);
    try {
      const res = await addStudentToClassByCode(selectedClassId, studentCodeInput.trim());
      if (res.success) {
        toast.success(`Diák sikeresen hozzáadva: ${res.studentName}! 🎉`);
        setStudentCodeInput('');
      } else {
        toast.error(res.error || 'Nem sikerült hozzáadni a diákot.');
      }
    } catch (error: any) {
      toast.error('Hiba történt: ' + error.message);
    } finally {
      setIsAddingStudent(false);
    }
  };

  const confirmRemoveStudent = async () => {
    if (!studentToRemove) return;
    setIsRemovingStudent(true);
    try {
      await removeStudentFromClass(studentToRemove.classId, studentToRemove.studentUserId);
      toast.success(`${studentToRemove.studentName} sikeresen eltávolítva az osztályból.`);
      setStudentToRemove(null);
    } catch (error: any) {
      toast.error('Hiba az eltávolításkor: ' + error.message);
    } finally {
      setIsRemovingStudent(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await setDoc(doc(db, 'profiles', user.uid), {
        id: user.uid,
        full_name: fullName,
        avatar_url: avatarUrl,
        role: role,
        updated_at: new Date().toISOString(),
      }, { merge: true });

      await refreshProfile();
      toast.success('Profil sikeresen frissítve!');
    } catch (error: any) {
      toast.error(error.message || 'Hiba a profil frissítésekor');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error('Nincs bejelentkezett felhasználó!');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('A jelszónak legalább 6 karakter hosszúnak kell lennie!');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('A megadott új jelszavak nem egyeznek!');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      toast.success('A jelszavad sikeresen megváltozott! 🎉');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      console.error('Password update error:', error);
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Biztonsági okokból a jelszó módosításához friss bejelentkezés szükséges. Kérjük, küldj jelszó-visszaállító linket az e-mailedre!');
      } else {
        toast.error(error.message || 'Hiba történt a jelszó módosítása során.');
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSendResetEmail = async () => {
    if (!user?.email) {
      toast.error('Nem található érvényes e-mail cím a fiókhoz!');
      return;
    }
    setIsSendingResetEmail(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success(`Jelszó-visszaállító link elküldve a(z) ${user.email} címre! Kérjük, nézd meg a beérkező leveleidet.`);
    } catch (error: any) {
      console.error('Password reset email error:', error);
      toast.error(error.message || 'Nem sikerült elküldeni a jelszó-visszaállító e-mailt.');
    } finally {
      setIsSendingResetEmail(false);
    }
  };

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || '??';

  const selectedClass = teacherClasses.find(c => c.id === selectedClassId) || null;

  // Format Hungarian date nicely
  const formatDate = (isoString?: string) => {
    if (!isoString) return '—';
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat('hu-HU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(d);
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/70 dark:border-slate-800/80">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-2xl hover:bg-white dark:hover:bg-slate-900 font-bold transition-all shadow-2xs"
          >
            <ChevronLeft className="w-5 h-5 mr-1 text-slate-500" />
            Vissza a főoldalra
          </Button>
          
          <div className="flex items-center gap-3">
            <span className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xs flex items-center gap-1.5",
              role === 'teacher' 
                ? "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-900" 
                : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900"
            )}>
              {role === 'teacher' ? '👨‍🏫 Tanári Fiók' : '🎒 Diák Fiók'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none text-center relative overflow-hidden">
               {/* Background Glow */}
               <div className={cn(
                 "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none",
                 role === 'teacher' ? "bg-rose-500" : "bg-indigo-500"
               )}></div>

               <div className="relative">
                <div className="relative inline-block group mb-4">
                  <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-2xl mx-auto ring-4 ring-slate-100 dark:ring-slate-800 transition-transform group-hover:scale-105 duration-300 overflow-hidden">
                    <AvatarImage src={avatarUrl} className="object-cover" />
                    <AvatarFallback className={cn(
                      "text-3xl font-black text-white",
                      role === 'teacher' ? "bg-gradient-to-br from-rose-500 to-orange-500" : "bg-gradient-to-br from-indigo-500 to-purple-500"
                    )}>
                      {(avatarUrl && !avatarUrl.startsWith('http')) ? avatarUrl : initials}
                    </AvatarFallback>
                  </Avatar>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors z-10"
                    title="Profilkép módosítása"
                  >
                    <Camera className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight truncate">
                  {fullName || 'Névtelen Felhasználó'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                  {user?.email}
                </p>

                {/* 6-Digit User Code Box */}
                <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-pink-50/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50 text-left shadow-2xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10.5px] font-black uppercase text-indigo-800 dark:text-indigo-300 tracking-wider flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                      {role === 'teacher' ? 'Tanári Kódod' : 'Saját Diák Kódod'}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (profile?.user_code) {
                          navigator.clipboard.writeText(profile.user_code);
                          toast.success(`Kód kimásolva: ${profile.user_code}`);
                        }
                      }}
                      className="h-6 px-2 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100 dark:text-indigo-300 rounded-md"
                    >
                      <Copy className="w-3 h-3 mr-1" /> Másolás
                    </Button>
                  </div>
                  <div className="text-2xl font-black tracking-widest text-indigo-950 dark:text-indigo-100 font-mono text-center py-1">
                    {profile?.user_code ? `${profile.user_code.slice(0, 3)} ${profile.user_code.slice(3)}` : 'Betöltés...'}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center mt-0.5 leading-snug">
                    {role === 'teacher' 
                      ? 'Ezzel az azonosítóval rendelkezel a rendszerben.'
                      : 'Ezt a kódot add meg a tanárodnak a csatlakozáshoz.'}
                  </p>
                </div>
              </div>

              {/* Navigation Menu in Sidebar */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('personal')}
                  className={cn(
                    "w-full justify-start rounded-2xl py-3 px-4 font-bold text-sm transition-all",
                    activeTab === 'personal' 
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 shadow-2xs border border-indigo-100 dark:border-indigo-900" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <User className="w-4 h-4 mr-3" />
                  Személyes Adatok
                </Button>

                {role === 'teacher' && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveTab('classes')}
                    className={cn(
                      "w-full justify-start rounded-2xl py-3 px-4 font-bold text-sm transition-all",
                      activeTab === 'classes' 
                        ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 shadow-2xs border border-rose-100 dark:border-rose-900" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <GraduationCap className="w-4 h-4 mr-3 text-rose-500" />
                    <span>Osztályaim & Diákjaim</span>
                    {teacherClasses.length > 0 && (
                      <span className="ml-auto bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                        {teacherClasses.length}
                      </span>
                    )}
                  </Button>
                )}

                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('activity')}
                  className={cn(
                    "w-full justify-start rounded-2xl py-3 px-4 font-bold text-sm transition-all",
                    activeTab === 'activity' 
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 shadow-2xs border border-indigo-100 dark:border-indigo-900" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <History className="w-4 h-4 mr-3" />
                  <span>Aktivitásaim</span>
                  {activityList.length > 0 && (
                    <span className="ml-auto bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                      {activityList.length}
                    </span>
                  )}
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('settings')}
                  className={cn(
                    "w-full justify-start rounded-2xl py-3 px-4 font-bold text-sm transition-all",
                    activeTab === 'settings' 
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 shadow-2xs border border-indigo-100 dark:border-indigo-900" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <Layout className="w-4 h-4 mr-3" />
                  Beállítások
                </Button>
              </div>
            </div>

            {/* Live Role-Specific Statistics Cards (replaces hardcoded badges/progress) */}
            {role === 'teacher' ? (
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-1.5 shadow-2xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">
                    {teacherStats.totalClasses}
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    Osztály
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1.5 shadow-2xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">
                    {teacherStats.totalStudents}
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    Összes Diák
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-white dark:bg-slate-900 p-4.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">
                    {studentStats.count}
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    Befejezve
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1.5 shadow-2xs">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">
                    {studentStats.avgScore}%
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    Átlageredmény
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none min-h-[620px] transition-all">
              
              {/* TAB 1: PERSONAL DETAILS */}
              {activeTab === 'personal' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1.5 flex items-center gap-2.5">
                      <User className="w-7 h-7 text-indigo-600" />
                      Személyes Profilom
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      Itt tudod módosítani az alapvető adataidat, amik az oldalon megjelennek.
                    </p>
                  </div>

                  <div className="space-y-6 max-w-2xl">
                    <div className="space-y-2">
                       <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                         Teljes Neved
                       </Label>
                       <div className="relative">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                         <Input 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-13 pl-12 rounded-2xl bg-slate-50/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-base"
                            placeholder="Pl. Kovács István"
                         />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                          Karakter / Avatar választás
                        </Label>
                        {googlePhoto && avatarUrl !== googlePhoto && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-indigo-600 dark:text-indigo-400 font-bold p-0 h-auto text-xs"
                            onClick={() => setAvatarUrl(googlePhoto)}
                          >
                            Használd a Google fotóm
                          </Button>
                        )}
                       </div>
                       <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-1">
                         {AVATARS.map((emoji) => (
                           <button
                             key={emoji}
                             type="button"
                             onClick={() => setAvatarUrl(emoji)}
                             className={cn(
                               "h-14 rounded-2xl flex items-center justify-center text-2xl transition-all hover:scale-110 cursor-pointer",
                               avatarUrl === emoji 
                                 ? "bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-100 dark:ring-indigo-900/30" 
                                 : "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-300"
                             )}
                           >
                             {emoji}
                           </button>
                         ))}
                       </div>
                    </div>

                    <div className="space-y-2 pt-2">
                       <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                         Státuszod az oldalon
                       </Label>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={cn(
                              "flex items-center gap-4 p-4.5 rounded-2xl border-2 transition-all cursor-pointer group text-left",
                              role === 'student' 
                                ? "bg-indigo-50/80 border-indigo-600 shadow-md ring-2 ring-indigo-500/20 dark:bg-indigo-950/40" 
                                : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                            )}
                          >
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0",
                              role === 'student' ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                            )}>🎒</div>
                            <div>
                              <p className={cn("font-black text-base leading-tight", role === 'student' ? "text-indigo-950 dark:text-indigo-100" : "text-slate-700 dark:text-slate-300")}>
                                Diák vagyok
                              </p>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                Tanulói fiók
                              </p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRole('teacher')}
                            className={cn(
                              "flex items-center gap-4 p-4.5 rounded-2xl border-2 transition-all cursor-pointer group text-left",
                              role === 'teacher' 
                                ? "bg-rose-50/80 border-rose-600 shadow-md ring-2 ring-rose-500/20 dark:bg-rose-950/40" 
                                : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                            )}
                          >
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0",
                              role === 'teacher' ? "bg-rose-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                            )}>👨‍🏫</div>
                            <div>
                              <p className={cn("font-black text-base leading-tight", role === 'teacher' ? "text-rose-950 dark:text-rose-100" : "text-slate-700 dark:text-slate-300")}>
                                Tanár vagyok
                              </p>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                Adminisztratív fiók
                              </p>
                            </div>
                          </button>
                       </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Button 
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="h-12 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
                      Beállítások Mentése
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 2: TEACHER CLASS & STUDENT MANAGEMENT (REDESIGNED FULL-WIDTH TOP-BAR LAYOUT) */}
              {activeTab === 'classes' && role === 'teacher' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Tab Top Title & Instructions */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-slate-800">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1 flex items-center gap-2.5">
                        <GraduationCap className="w-7 h-7 text-rose-500" />
                        Osztályaim és Diákjaim
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
                        Kezeld az osztályaidat, vedd fel a diákokat a 6 jegyű kódjuk alapján, vagy kövesd a haladásukat a teljes szélességű mátrixban.
                      </p>
                    </div>

                    {/* Mode Toggle Switcher */}
                    {selectedClass && (
                      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 self-start md:self-auto shrink-0 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setClassViewMode('roster')}
                          className={cn(
                            "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                            classViewMode === 'roster'
                              ? "bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-200/60 dark:border-indigo-800"
                              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                          )}
                        >
                          <Users className="w-4 h-4 text-indigo-500" />
                          <span>Diákok névsora ({selectedClass.students?.length || 0})</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setClassViewMode('quiz_matrix')}
                          className={cn(
                            "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                            classViewMode === 'quiz_matrix'
                              ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                          )}
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Kvíz & Játék Mátrix</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Horizontal Class Selector Bar */}
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400 pl-2 pr-1">
                      Osztály:
                    </span>

                    {teacherClasses.map((c) => {
                      const isSelected = selectedClassId === c.id;
                      const studentCount = c.students?.length || 0;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedClassId(c.id)}
                          className={cn(
                            "group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs",
                            isSelected
                              ? "bg-rose-600 text-white font-black shadow-md shadow-rose-600/15 ring-2 ring-rose-500/20 scale-[1.02]"
                              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-300"
                          )}
                        >
                          <span>🏫 {c.name}</span>
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-mono font-black",
                            isSelected 
                              ? "bg-rose-700/80 text-white" 
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          )}>
                            {studentCount} diák
                          </span>
                        </button>
                      );
                    })}

                    {/* New Class Inline / Button */}
                    {showAddClassInput ? (
                      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-rose-300 dark:border-rose-800 animate-in fade-in zoom-in-95">
                        <Input
                          placeholder="Új osztály neve (pl. 7.B)..."
                          value={newClassName}
                          onChange={(e) => setNewClassName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleCreateClass()}
                          autoFocus
                          className="h-8 w-44 rounded-lg text-xs bg-transparent border-0 focus-visible:ring-0"
                        />
                        <Button
                          size="sm"
                          onClick={handleCreateClass}
                          disabled={isCreatingClass || !newClassName.trim()}
                          className="h-7 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                        >
                          {isCreatingClass ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Létrehoz'}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setShowAddClassInput(false);
                            setNewClassName('');
                          }}
                          className="h-7 px-2 rounded-lg text-xs text-slate-400 hover:text-slate-700"
                        >
                          Mégse
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowAddClassInput(true)}
                        className="h-8 px-3 rounded-xl border-dashed border-rose-300 dark:border-rose-800/80 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Új osztály</span>
                      </Button>
                    )}
                  </div>

                  {/* Class Workspace Content */}
                  {!selectedClass ? (
                    <div className="py-20 text-center bg-slate-50/70 dark:bg-slate-950/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
                      <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                        🏫
                      </div>
                      <h4 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-1">
                        Még nincs kiválasztott osztály
                      </h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
                        Hozz létre egy osztályt a fenti <strong>„Új osztály”</strong> gombbal, vagy válassz ki egy meglévőt!
                      </p>
                      <Button
                        onClick={() => setShowAddClassInput(true)}
                        className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 h-9"
                      >
                        <Plus className="w-4 h-4 mr-1.5" />
                        Első osztály létrehozása
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* Top Action & Meta row for active class */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200/70 dark:border-slate-800">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-lg shrink-0">
                            🏫
                          </div>

                          {isEditingClassName ? (
                            <div className="flex items-center gap-2 flex-1 max-w-md animate-in fade-in zoom-in-95">
                              <Input
                                value={editClassNameValue}
                                onChange={(e) => setEditClassNameValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveClassName();
                                  if (e.key === 'Escape') setIsEditingClassName(false);
                                }}
                                placeholder="Osztály új neve (pl. 8. osztály)..."
                                autoFocus
                                className="h-10 text-sm font-bold bg-white dark:bg-slate-900 rounded-xl border-rose-300 dark:border-rose-800 focus-visible:ring-rose-500/20"
                              />
                              <Button
                                size="sm"
                                onClick={handleSaveClassName}
                                disabled={isSavingClassName || !editClassNameValue.trim()}
                                className="h-10 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shrink-0 shadow-sm shadow-emerald-600/20"
                              >
                                {isSavingClassName ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Mentés</span>
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsEditingClassName(false)}
                                className="h-10 px-2.5 rounded-xl text-slate-400 hover:text-slate-700 text-xs shrink-0"
                                title="Mégse"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 truncate">
                                  {selectedClass.name}
                                </h4>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={handleStartEditingClassName}
                                  className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors shrink-0"
                                  title="Osztály nevének átírása / szerkesztése"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                              <p className="text-xs text-slate-400">
                                {selectedClass.students?.length || 0} felvett diák az osztályban
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          {!isEditingClassName && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleStartEditingClassName}
                              className="h-8 px-3 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 hover:text-indigo-600 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                              title="Osztály nevének átírása (pl. jövőre eggyel nagyobb évfolyamra)"
                            >
                              <Pencil className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Átnevezés</span>
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setClassToDelete({ id: selectedClass.id, name: selectedClass.name })}
                            className="h-8 px-3 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold flex items-center gap-1.5"
                            title="Osztály végleges törlése"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Osztály törlése</span>
                          </Button>
                        </div>
                      </div>

                      {/* MODE A: ROSTER (DIÁKOK NÉVSORA) */}
                      {classViewMode === 'roster' && (
                        <div className="space-y-6">
                          
                          {/* Add Student Card */}
                          <div className="bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-purple-500/10 dark:from-emerald-950/30 dark:to-indigo-950/20 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800">
                            <div className="max-w-xl">
                              <Label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 block flex items-center gap-1.5">
                                <UserPlus className="w-4 h-4 text-emerald-600" />
                                Diák felvétele 6 számjegyű azonosító kód alapján:
                              </Label>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                  <Input
                                    placeholder="Írd be a diák 6 jegyű kódját (pl. 582914)..."
                                    value={studentCodeInput}
                                    onChange={(e) => setStudentCodeInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddStudent()}
                                    maxLength={10}
                                    className="pl-9 h-11 rounded-xl text-sm font-mono tracking-wider bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs"
                                  />
                                </div>
                                <Button
                                  onClick={handleAddStudent}
                                  disabled={isAddingStudent || !studentCodeInput.trim()}
                                  className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/15"
                                >
                                  {isAddingStudent ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <>
                                      <UserPlus className="w-4 h-4" />
                                      <span>Hozzáadás</span>
                                    </>
                                  )}
                                </Button>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                                <span>💡</span> 
                                <em>A diák a saját profiljában látja a személyes 6 jegyű kódját (pl. a fenti bal oldalsávban).</em>
                              </p>
                            </div>
                          </div>

                          {/* Enrolled Students Grid */}
                          <div>
                            <div className="flex items-center justify-between mb-3.5">
                              <h5 className="text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Beiratkozott Tanulók ({selectedClass.students?.length || 0})
                              </h5>
                            </div>

                            {(!selectedClass.students || selectedClass.students.length === 0) ? (
                              <div className="text-center py-12 text-slate-400 text-sm italic bg-slate-50/50 dark:bg-slate-950/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
                                Ebben az osztályban még nincsenek diákok. Kérd el a tanulóidtól a 6 jegyű kódjukat, és add hozzá őket a fenti mezőben!
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                                {selectedClass.students.map((student) => (
                                  <div
                                    key={student.userId || student.userCode}
                                    className="flex items-center justify-between p-4 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-800 transition-all group"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center text-lg font-black shrink-0">
                                        {student.avatarUrl && student.avatarUrl.length <= 4 
                                          ? student.avatarUrl 
                                          : student.name.charAt(0).toUpperCase()}
                                      </div>
                                      <div className="min-w-0 truncate">
                                        <div className="font-black text-sm text-slate-800 dark:text-slate-100 truncate">
                                          {student.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                          <span className="font-mono text-[10px] font-black bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-200/70 dark:border-indigo-800">
                                            🔑 {student.userCode}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => setStudentToRemove({ classId: selectedClass.id, studentUserId: student.userId, studentName: student.name })}
                                      className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl shrink-0 transition-colors"
                                      title="Diák eltávolítása az osztályból"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* MODE B: QUIZ & GAME MATRIX (FULL 100% WIDTH VIEW) */}
                      {classViewMode === 'quiz_matrix' && (
                        <div className="w-full">
                          <ClassQuizProgressMatrix currentClass={selectedClass} />
                        </div>
                      )}

                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: REAL USER ACTIVITIES & PROGRESS (CONNECTED TO FIRESTORE) */}
              {activeTab === 'activity' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Activity Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-slate-800">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1 flex items-center gap-2.5">
                        <History className="w-7 h-7 text-indigo-600" />
                        Aktivitásaim és Eredményeim
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                        Valós idejű áttekintés az elvégzett kvízekről, párosítókról és csoportosítókról.
                      </p>
                    </div>

                    <Button
                      onClick={() => navigate('/matek')}
                      className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs h-10 px-4.5 shadow-md shadow-indigo-600/15 flex items-center gap-2 self-start sm:self-auto"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Gyakorlás indítása</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Summary Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800">
                      <div className="text-[10.5px] font-black uppercase text-slate-400 tracking-wider mb-1">
                        Összes elvégzett modul
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {studentStats.count} <span className="text-xs font-medium text-slate-400">feladat</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800">
                      <div className="text-[10.5px] font-black uppercase text-slate-400 tracking-wider mb-1">
                        Átlagos teljesítmény
                      </div>
                      <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                        {studentStats.avgScore}%
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800">
                      <div className="text-[10.5px] font-black uppercase text-slate-400 tracking-wider mb-1">
                        Hibátlan (100%) eredmények
                      </div>
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        {studentStats.perfectCount} <span className="text-xs font-medium text-slate-400">db ⭐</span>
                      </div>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActivityFilter('all')}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer",
                        activityFilter === 'all'
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      )}
                    >
                      Összes ({activityList.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivityFilter('quiz')}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer",
                        activityFilter === 'quiz'
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      )}
                    >
                      🎯 Kvízek ({activityList.filter(a => a.gameType === 'quiz').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivityFilter('matcher')}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer",
                        activityFilter === 'matcher'
                          ? "bg-purple-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      )}
                    >
                      🧩 Párosítók ({activityList.filter(a => a.gameType === 'matcher').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivityFilter('sorter')}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer",
                        activityFilter === 'sorter'
                          ? "bg-amber-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      )}
                    >
                      ⚖️ Csoportosítók ({activityList.filter(a => a.gameType === 'sorter').length})
                    </button>
                  </div>

                  {/* Activities List */}
                  {filteredActivities.length === 0 ? (
                    <div className="py-16 text-center bg-slate-50/60 dark:bg-slate-950/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
                      <div className="w-16 h-16 rounded-3xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                        🎯
                      </div>
                      <h4 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-1">
                        Még nem végeztél el ilyen feladatot
                      </h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
                        Látogass el a Matematika menübe, tölts ki interaktív kvízeket és játékokat, és itt nyomon követheted a fejlődésedet!
                      </p>
                      <Button
                        onClick={() => navigate('/matek')}
                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 h-10 shadow-md shadow-indigo-600/10"
                      >
                        Irány a feladatok 🚀
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredActivities.map((act) => {
                        const score = act.bestScore || 0;
                        const isPerfect = score === 100;
                        const isGood = score >= 70;
                        const icon = act.gameType === 'quiz' ? '🎯' : act.gameType === 'matcher' ? '🧩' : '⚖️';
                        const typeLabel = act.gameType === 'quiz' ? 'Kvíz' : act.gameType === 'matcher' ? 'Párosító' : 'Csoportosító';

                        return (
                          <div 
                            key={act.id} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4.5 bg-slate-50/80 dark:bg-slate-950/50 rounded-2xl border border-slate-200/70 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800/60 gap-3"
                          >
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                                {icon}
                              </div>
                              <div>
                                <h5 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100">
                                  {act.topicTitle || act.topicId}
                                </h5>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                                  <span className="font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/80">
                                    {act.grade}. Osztály • {typeLabel}
                                  </span>
                                  {act.attemptsCount > 1 && (
                                    <span className="font-medium text-slate-400">
                                      • {act.attemptsCount}x próbálkozás
                                    </span>
                                  )}
                                  <span className="text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(act.lastCompletedAt)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 self-end sm:self-auto">
                              <div className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-black text-xs sm:text-sm border shadow-2xs",
                                isPerfect 
                                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                  : isGood
                                  ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                  : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                              )}>
                                {isPerfect && <span>⭐</span>}
                                <span>{score}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1 flex items-center gap-2.5">
                      <Layout className="w-7 h-7 text-indigo-600" />
                      Beállítások
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      Fiókod biztonsági beállításai, jelszókezelés és megjelenési témák.
                    </p>
                  </div>

                  {/* 1. PASSWORD CHANGE / SECURITY CARD */}
                  <div className="bg-slate-50/70 dark:bg-slate-950/50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-800 dark:text-slate-100">
                          Jelszó Megváltoztatása
                        </h4>
                        <p className="text-xs text-slate-400">
                          Állíts be egy új, biztonságos jelszót a fiókodhoz (legalább 6 karakter).
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="new-pass" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Új jelszó
                          </Label>
                          <div className="relative">
                            <Input
                              id="new-pass"
                              type={showNewPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                              className="rounded-xl h-11 pr-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                              tabIndex={-1}
                              title={showNewPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
                            >
                              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="confirm-pass" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Új jelszó megerősítése
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirm-pass"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={confirmNewPassword}
                              onChange={(e) => setConfirmNewPassword(e.target.value)}
                              required
                              className="rounded-xl h-11 pr-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                              tabIndex={-1}
                              title={showConfirmPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Button
                          type="submit"
                          disabled={isUpdatingPassword || !newPassword || !confirmNewPassword}
                          className="rounded-xl h-10 px-5 font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 flex items-center gap-2 text-xs"
                        >
                          {isUpdatingPassword ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Jelszó Mentése</span>
                            </>
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSendResetEmail}
                          disabled={isSendingResetEmail}
                          className="rounded-xl h-10 px-4 font-bold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-xs"
                        >
                          {isSendingResetEmail ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Mail className="w-4 h-4 text-blue-500" />
                              <span>Jelszó-visszaállító link e-mailben</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* 2. THEME & APPEARANCE CARD */}
                  <div className="bg-slate-50/70 dark:bg-slate-950/50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-800 dark:text-slate-100">
                          Megjelenés és Téma
                        </h4>
                        <p className="text-xs text-slate-400">
                          Válts a hófehér (Light) és a tiszta sötét (Dark) megjelenési módok között.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-w-lg">
                      <button
                        type="button"
                        onClick={() => setTheme('light')}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer",
                          theme === 'light'
                            ? "bg-white border-indigo-600 shadow-md shadow-indigo-600/10 ring-2 ring-indigo-500/10"
                            : "bg-white/60 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                        )}
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                          <Sun className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-black text-sm text-slate-800 dark:text-slate-100">Világos Téma</p>
                          <p className="text-[11px] text-slate-400 font-medium">Tiszta fehér háttér</p>
                        </div>
                        {theme === 'light' && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setTheme('dark')}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer",
                          theme === 'dark'
                            ? "bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-500/10"
                            : "bg-white/60 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                        )}
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-yellow-300 shadow-sm shrink-0">
                          <Moon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-black text-sm text-slate-800 dark:text-slate-100">Sötét Téma</p>
                          <p className="text-[11px] text-slate-400 font-medium">Tiszta fekete háttér</p>
                        </div>
                        {theme === 'dark' && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 3. ACCOUNT INFO SUMMARY CARD */}
                  <div className="bg-slate-50/70 dark:bg-slate-950/50 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Fiók Információk
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                      <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block mb-1">E-mail cím:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100 truncate block">{user?.email}</span>
                      </div>
                      <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block mb-1">Szerepkör:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">{role === 'teacher' ? '👨‍🏫 Tanár' : '🎒 Diák'}</span>
                      </div>
                      <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block mb-1">Egyedi Kód:</span>
                        <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">{profile?.user_code || '—'}</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* DELETE CLASS CONFIRMATION DIALOG */}
      <Dialog open={!!classToDelete} onOpenChange={(open) => !open && setClassToDelete(null)}>
        <DialogContent className="max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-xl font-black text-slate-900 dark:text-white">
              Biztosan törölni szeretnéd az osztályt?
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              A(z) <strong className="text-slate-800 dark:text-slate-200">„{classToDelete?.name}”</strong> osztály véglegesen törlődik a fiókodból.
              <br /><br />
              <span className="text-xs text-slate-400">
                (A diákok saját fiókja és elmentett feladatai nem törlődnek, de ebből az osztálycsoportból kikerülnek.)
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setClassToDelete(null)}
              disabled={isDeletingClass}
              className="rounded-xl h-11 px-5 font-bold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            >
              Mégse
            </Button>
            <Button
              type="button"
              onClick={confirmDeleteClass}
              disabled={isDeletingClass}
              className="rounded-xl h-11 px-5 font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 flex items-center gap-2"
            >
              {isDeletingClass ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span>Igen, osztály törlése</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* REMOVE STUDENT CONFIRMATION DIALOG */}
      <Dialog open={!!studentToRemove} onOpenChange={(open) => !open && setStudentToRemove(null)}>
        <DialogContent className="max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-xl font-black text-slate-900 dark:text-white">
              Diák eltávolítása az osztályból
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Biztosan eltávolítod <strong className="text-slate-800 dark:text-slate-200">„{studentToRemove?.studentName}”</strong> diákot ebből az osztályból?
              <br /><br />
              <span className="text-xs text-slate-400">
                A diák profilja megmarad a rendszerben, és bármikor újra hozzáadható a 6 jegyű kódjával.
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStudentToRemove(null)}
              disabled={isRemovingStudent}
              className="rounded-xl h-11 px-5 font-bold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            >
              Mégse
            </Button>
            <Button
              type="button"
              onClick={confirmRemoveStudent}
              disabled={isRemovingStudent}
              className="rounded-xl h-11 px-5 font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 flex items-center gap-2"
            >
              {isRemovingStudent ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span>Diák eltávolítása</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
