import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  ChevronLeft, 
  Loader2, 
  Check, 
  Moon, 
  Sun,
  Layout,
  History,
  TrendingUp,
  Award,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const AVATARS = [
  '🎒', '🎓', '👨‍🏫', '👩‍🏫', '🖍️', '🧪', '🧬', '🚀', '🎨', '🧩', '🎸', '⚽'
];

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [role, setRole] = useState<'teacher' | 'student'>(profile?.role || 'student');
  const [activeTab, setActiveTab] = useState<'personal' | 'activity' | 'settings'>('personal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const googlePhoto = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

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
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

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

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
          role: role,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshProfile();
      toast.success('Profil sikeresen frissítve!');
    } catch (error: any) {
      toast.error(error.message || 'Hiba a profil frissítésekor');
    } finally {
      setLoading(false);
    }
  };

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || '??';

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
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('personal')}
                  className={cn(
                    "w-full justify-start rounded-xl py-6 font-bold",
                    activeTab === 'personal' ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <User className="w-5 h-5 mr-3" />
                  Személyes Adatok
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('activity')}
                  className={cn(
                    "w-full justify-start rounded-xl py-6 font-bold",
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
                    "w-full justify-start rounded-xl py-6 font-bold",
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

              {activeTab === 'activity' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Aktivitásaim</h3>
                    <p className="text-slate-500 dark:text-slate-400">Nézd meg, miket csináltál mostanában az oldalon.</p>
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
                <div className="space-y-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Beállítások</h3>
                    <p className="text-slate-500 dark:text-slate-400">Személyre szabhatod az oldal működését és megjelenését.</p>
                  </div>

                  <div className="space-y-6">
                     <div className="p-6 bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-slate-200/50 dark:border-slate-800 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center">
                           <Sun className="w-6 h-6" />
                         </div>
                         <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100">Sötét / Világos Mód</p>
                            <p className="text-xs text-slate-500 font-medium tracking-tight">Válts a környezetednek megfelelő témára</p>
                         </div>
                       </div>
                       <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800">
                         Váltás
                       </Button>
                     </div>

                     <div className="p-6 bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-slate-200/50 dark:border-slate-800 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center">
                           <Bell className="w-6 h-6" />
                         </div>
                         <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100">Értesítések</p>
                            <p className="text-xs text-slate-500 font-medium tracking-tight">Kérsz-e értesítést az új feladatokról?</p>
                         </div>
                       </div>
                       <div className="bg-indigo-600 h-6 w-11 rounded-full relative cursor-pointer">
                         <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
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
