import { useState, useEffect, useRef } from 'react';
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
  Bell,
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
  Shield,
  Mail,
  Settings as SettingsIcon,
  GraduationCap
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useThemeSync } from '@/components/ThemeToggle';
import { 
  TeacherClass, 
  subscribeTeacherClasses, 
  createTeacherClass, 
  deleteTeacherClass, 
  addStudentToClassByCode, 
  removeStudentFromClass 
} from '@/services/teacherClassService';

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
  const [studentCodeInput, setStudentCodeInput] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isCreatingClass, setIsCreatingClass] = useState(false);

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
        setSelectedClassId((prev) => prev || classes[0].id);
      }
    });
    return () => unsubscribe();
  }, [user, role]);

  const handleCreateClass = async () => {
    if (!newClassName.trim() || !user) return;
    setIsCreatingClass(true);
    try {
      const classId = await createTeacherClass(user.uid, newClassName.trim());
      setNewClassName('');
      setSelectedClassId(classId);
      toast.success('Osztály sikeresen létrehozva!');
    } catch (error: any) {
      toast.error('Hiba az osztály létrehozásakor: ' + error.message);
    } finally {
      setIsCreatingClass(false);
    }
  };

  const handleDeleteClass = async (classId: string, className: string) => {
    if (!window.confirm(`Biztosan törölni szeretnéd a(z) "${className}" osztályt?`)) return;
    try {
      await deleteTeacherClass(classId);
      toast.success('Osztály sikeresen törölve.');
      if (selectedClassId === classId) {
        const remaining = teacherClasses.filter(c => c.id !== classId);
        setSelectedClassId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (error: any) {
      toast.error('Hiba a törlés során: ' + error.message);
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

  const handleRemoveStudent = async (classId: string, studentUserId: string, studentName: string) => {
    if (!window.confirm(`Biztosan eltávolítod ${studentName} diákot ebből az osztályból?`)) return;
    try {
      await removeStudentFromClass(classId, studentUserId);
      toast.success(`${studentName} sikeresen eltávolítva az osztályból.`);
    } catch (error: any) {
      toast.error('Hiba az eltávolításkor: ' + error.message);
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-xl"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Vissza a főoldalra
          </Button>
          <div className="flex items-center gap-2">
             <span className={cn(
               "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm",
               role === 'teacher' ? "bg-rose-100 text-rose-600 border border-rose-200" : "bg-indigo-100 text-indigo-600 border border-indigo-200"
             )}>
               {role === 'teacher' ? 'Tanár' : 'Diák'}
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none text-center relative overflow-hidden">
               {/* Background Glow */}
               <div className={cn(
                 "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20",
                 role === 'teacher' ? "bg-rose-500" : "bg-indigo-500"
               )}></div>

               <div className="relative">
                <div className="relative inline-block group mb-4">
                  <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-2xl mx-auto ring-4 ring-slate-50 dark:ring-slate-900 transition-transform group-hover:scale-105 duration-500 overflow-hidden">
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
                    className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors z-10"
                  >
                    <Camera className="w-4 h-4 text-slate-500" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                  />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{fullName || 'Névtelen'}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{user?.email}</p>

                {/* 6-Digit User Code Box */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50 text-left">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-black uppercase text-indigo-700 dark:text-indigo-300 tracking-wider flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5" />
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
                      className="h-6 px-2 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 rounded-md"
                    >
                      <Copy className="w-3 h-3 mr-1" /> Másolás
                    </Button>
                  </div>
                  <div className="text-2xl font-black tracking-widest text-indigo-950 dark:text-indigo-100 font-mono text-center py-1">
                    {profile?.user_code ? `${profile.user_code.slice(0, 3)} ${profile.user_code.slice(3)}` : 'Betöltés...'}
                  </div>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 text-center mt-1 leading-snug">
                    {role === 'teacher' 
                      ? 'Ezzel az azonosítóval rendelkezel a rendszerben.'
                      : 'Ezt a kódot add meg a tanárodnak, hogy felvehessen az osztályába!'}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('personal')}
                  className={cn(
                    "w-full justify-start rounded-xl py-5 font-bold",
                    activeTab === 'personal' ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <User className="w-5 h-5 mr-3" />
                  Személyes Adatok
                </Button>

                {role === 'teacher' && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveTab('classes')}
                    className={cn(
                      "w-full justify-start rounded-xl py-5 font-bold",
                      activeTab === 'classes' ? "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400" : "text-slate-600 dark:text-slate-400"
                    )}
                  >
                    <GraduationCap className="w-5 h-5 mr-3 text-rose-500" />
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
                    "w-full justify-start rounded-xl py-5 font-bold",
                    activeTab === 'activity' ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <History className="w-5 h-5 mr-3" />
                  Aktivitásaim
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('settings')}
                  className={cn(
                    "w-full justify-start rounded-xl py-5 font-bold",
                    activeTab === 'settings' ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <Layout className="w-5 h-5 mr-3" />
                  Beállítások
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <Award className="w-6 h-6 text-amber-500 mb-2" />
                <span className="text-2xl font-black text-slate-800 dark:text-white">12</span>
                <span className="text-[10px] font-bold uppercase text-slate-400">Jelvény</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
                <span className="text-2xl font-black text-slate-800 dark:text-white">85%</span>
                <span className="text-[10px] font-bold uppercase text-slate-400">Haladás</span>
              </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none min-h-[600px] animate-in fade-in zoom-in-95 duration-500">
              
              {activeTab === 'personal' && (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Személyes Profilom</h3>
                    <p className="text-slate-500 dark:text-slate-400">Itt tudod módosítani az alapvető adataidat, amik az oldalon megjelennek.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Teljes Neved</Label>
                       <div className="relative">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                         <Input 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-14 pl-12 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-lg"
                            placeholder="Pl. Kovács István"
                         />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Karakterválasztás</Label>
                        {googlePhoto && avatarUrl !== googlePhoto && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-indigo-600 dark:text-indigo-400 font-bold p-0 h-auto"
                            onClick={() => setAvatarUrl(googlePhoto)}
                          >
                            Használd a Google fotóm
                          </Button>
                        )}
                       </div>
                       <div className="grid grid-cols-6 gap-3 pt-2">
                         {AVATARS.map((emoji) => (
                           <button
                             key={emoji}
                             onClick={() => setAvatarUrl(emoji)}
                             className={cn(
                               "h-14 rounded-2xl flex items-center justify-center text-2xl transition-all hover:scale-110",
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

                    <div className="space-y-2 pt-4">
                       <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Státuszod az oldalon</Label>
                       <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setRole('student')}
                            className={cn(
                              "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group",
                              role === 'student' 
                                ? "bg-indigo-50 border-indigo-500 shadow-md" 
                                : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300"
                            )}
                          >
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform",
                              role === 'student' ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                            )}>🎒</div>
                            <div className="text-left">
                              <p className={cn("font-black leading-tight", role === 'student' ? "text-indigo-900 dark:text-indigo-100" : "text-slate-600 dark:text-slate-400")}>Diák vagyok</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tanulói fiók</p>
                            </div>
                          </button>
                          <button
                            onClick={() => setRole('teacher')}
                            className={cn(
                              "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group",
                              role === 'teacher' 
                                ? "bg-rose-50 border-rose-500 shadow-md" 
                                : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300"
                            )}
                          >
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform",
                              role === 'teacher' ? "bg-rose-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                            )}>👨‍🏫</div>
                            <div className="text-left">
                              <p className={cn("font-black leading-tight", role === 'teacher' ? "text-rose-900 dark:text-rose-100" : "text-slate-600 dark:text-slate-400")}>Tanár vagyok</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Adminisztratív fiók</p>
                            </div>
                          </button>
                       </div>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end">
                    <Button 
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-xl shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Beállítások Mentése'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Teacher Class & Student Management */}
              {activeTab === 'classes' && role === 'teacher' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2 flex items-center gap-3">
                      <GraduationCap className="w-8 h-8 text-rose-500" />
                      Osztályaim és Diákjaim
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      Hozz létre osztályokat, és add hozzá a diákokat a <strong>6 jegyű azonosító kódjuk</strong> alapján. A kompetenciamérés eredménytárában kizárólag a saját osztályaidba felvett diákok feladatlapjait fogod látni.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6">
                    {/* Left: Class list */}
                    <div className="md:col-span-4 bg-slate-50 dark:bg-slate-950/60 p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col min-h-[460px]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                          Osztályok ({teacherClasses.length})
                        </span>
                      </div>

                      {/* Add new class form */}
                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="Új osztály (pl. 6.A)..."
                          value={newClassName}
                          onChange={(e) => setNewClassName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleCreateClass()}
                          className="h-10 rounded-xl text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        />
                        <Button
                          size="icon"
                          onClick={handleCreateClass}
                          disabled={isCreatingClass || !newClassName.trim()}
                          className="h-10 w-10 shrink-0 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                          title="Osztály létrehozása"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Class list items */}
                      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                        {teacherClasses.length === 0 ? (
                          <div className="text-center py-10 text-slate-400 text-xs italic">
                            Még nem hoztál létre osztályt. Írd be a nevet fent (pl. 6.A) és nyomj a + gombra!
                          </div>
                        ) : (
                          teacherClasses.map((c) => {
                            const isSelected = selectedClassId === c.id;
                            const count = c.students?.length || 0;
                            return (
                              <div
                                key={c.id}
                                onClick={() => setSelectedClassId(c.id)}
                                className={cn(
                                  "flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border",
                                  isSelected
                                    ? "bg-white dark:bg-slate-900 border-rose-500 shadow-md shadow-rose-500/5 text-rose-900 dark:text-rose-100 font-bold ring-2 ring-rose-500/20"
                                    : "bg-white/60 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                                )}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="truncate">{c.name}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                                    {count} diák
                                  </span>
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClass(c.id, c.name);
                                  }}
                                  className="h-7 w-7 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                                  title="Osztály törlése"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Right: Enrolled students in selected class */}
                    <div className="md:col-span-8 bg-slate-50 dark:bg-slate-950/60 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col min-h-[460px]">
                      {!selectedClass ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12">
                          <Users className="w-12 h-12 mb-3 opacity-30 text-rose-500" />
                          <p className="font-bold text-base text-slate-600 dark:text-slate-300">
                            Válassz ki vagy hozz létre egy osztályt a bal oldali listában!
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800">
                            <div>
                              <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">
                                🏫 {selectedClass.name} diákjai
                              </h4>
                              <p className="text-xs text-slate-400 mt-0.5">
                                Összesen {selectedClass.students?.length || 0} diák van rögzítve ebben az osztályban.
                              </p>
                            </div>
                          </div>

                          {/* Add student by 6-digit code input */}
                          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-5 shadow-sm">
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                              Diák felvétele 6 számjegyű kód alapján:
                            </Label>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                  placeholder="Írd be a diák 6 jegyű kódját (pl. 582914)..."
                                  value={studentCodeInput}
                                  onChange={(e) => setStudentCodeInput(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && handleAddStudent()}
                                  maxLength={10}
                                  className="pl-9 h-11 rounded-xl text-sm font-mono tracking-wider bg-slate-50/50 dark:bg-slate-950/50"
                                />
                              </div>
                              <Button
                                onClick={handleAddStudent}
                                disabled={isAddingStudent || !studentCodeInput.trim()}
                                className="h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/10"
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
                            <p className="text-[11px] text-slate-400 mt-2">
                              💡 <em>Tipp: A diák a saját profiljában látja a személyes 6 jegyű kódját, amit bármikor megadhat neked.</em>
                            </p>
                          </div>

                          {/* Student roster */}
                          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                            {(!selectedClass.students || selectedClass.students.length === 0) ? (
                              <div className="text-center py-12 text-slate-400 text-sm italic bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6">
                                Ebben az osztályban még nincsenek diákok. Kérd el a diákjaidtól a 6 jegyű kódjukat, és add hozzá őket a fenti mezőben!
                              </div>
                            ) : (
                              selectedClass.students.map((student) => (
                                <div
                                  key={student.userId || student.userCode}
                                  className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-slate-300 transition-all"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-lg font-black shrink-0">
                                      {student.avatarUrl && student.avatarUrl.length <= 4 
                                        ? student.avatarUrl 
                                        : student.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                                          {student.name}
                                        </span>
                                        <span className="font-mono text-[11px] font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-800">
                                          🔑 {student.userCode}
                                        </span>
                                      </div>
                                      <div className="text-xs text-slate-400">
                                        {student.email || 'Nincs megadva email'}
                                      </div>
                                    </div>
                                  </div>

                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleRemoveStudent(selectedClass.id, student.userId, student.name)}
                                    className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl"
                                    title="Diák eltávolítása az osztályból"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Aktivitásaim</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Nézd meg, miket csináltál mostanában az oldalon.</p>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200/50 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                            {i === 1 ? '🧩' : i === 2 ? '🧮' : '🎯'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100">{i === 1 ? 'Sudoku Generátor' : i === 2 ? 'Egyenletmegoldó' : 'Céltáblás Visszajelzés'}</p>
                            <p className="text-xs text-slate-400 font-medium">2026. március 15. • 18:4{i}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-xs font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full uppercase">Sikeres</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <p className="text-sm font-medium italic">Itt fogod látni az összes korábbi tevékenységed...</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1">
                      ⚙️ Beállítások
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
                      Fiókod biztonsági beállításai, jelszókezelés és megjelenési témák.
                    </p>
                  </div>

                  {/* 1. PASSWORD CHANGE / SECURITY CARD */}
                  <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/40 dark:shadow-none space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-800 dark:text-slate-100">
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
                              className="rounded-xl h-11 pr-10 bg-slate-50/50 dark:bg-slate-950/50"
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
                              className="rounded-xl h-11 pr-10 bg-slate-50/50 dark:bg-slate-950/50"
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
                          className="rounded-xl h-11 px-6 font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 flex items-center gap-2"
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
                          className="rounded-xl h-11 px-4 font-bold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                        >
                          {isSendingResetEmail ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Mail className="w-4 h-4 text-blue-500" />
                              <span>Jelszó-visszaállító link küldése e-mailben</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* 2. THEME & APPEARANCE CARD */}
                  <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/40 dark:shadow-none space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-800 dark:text-slate-100">
                          Megjelenés és Téma
                        </h4>
                        <p className="text-xs text-slate-400">
                          Válts a hófehér (Light) és a tiszta fekete (Dark) megjelenési módok között.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-w-lg">
                      <button
                        type="button"
                        onClick={() => setTheme('light')}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                          theme === 'light'
                            ? "bg-indigo-50/50 border-indigo-600 shadow-md shadow-indigo-600/10 dark:bg-indigo-950/30"
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                        )}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                          <Sun className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Világos Téma</p>
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
                          "flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                          theme === 'dark'
                            ? "bg-indigo-950/30 border-indigo-500 shadow-md shadow-indigo-500/10"
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                        )}
                      >
                        <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-yellow-300 shadow-sm shrink-0">
                          <Moon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Sötét Téma</p>
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
                  <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800 space-y-3">
                    <h4 className="text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Fiók Információk
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                        <span className="text-slate-400 block mb-1">E-mail cím:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100 truncate block">{user?.email}</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                        <span className="text-slate-400 block mb-1">Szerepkör:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">{role === 'teacher' ? '👨‍🏫 Tanár' : '🎒 Diák'}</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
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
    </div>
  );
}
