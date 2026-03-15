import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, LogIn, UserPlus, Chrome, GraduationCap, School } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'teacher' | 'student'>('student');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            toast.success("Sikeres bejelentkezés!");
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Hiba a bejelentkezés során");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("A jelszavak nem egyeznek!");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role,
                    }
                }
            });
            if (error) throw error;
            toast.success("Sikeres regisztráció! Most már be vagy jelentkezve.");
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Hiba a regisztráció során");
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (error: any) {
            toast.error(error.message || "Hiba a Google bejelentkezés során");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] rounded-3xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-center tracking-tight">Üdv a DiákZónában!</DialogTitle>
                    <DialogDescription className="text-center">
                        Jelentkezz be vagy regisztrálj az extra funkciókért.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={defaultTab} className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6">
                        <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                            Belépés
                        </TabsTrigger>
                        <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                            Regisztráció
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail cím</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="pelda@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Jelszó</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                            <Button type="submit" className="w-full rounded-xl h-11 font-bold bg-gradient-math" disabled={loading}>
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5 mr-2" /> Bejelentkezés</>}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="register">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Teljes név</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Pl. Kiss Péter"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-email">E-mail cím</Label>
                                <Input
                                    id="reg-email"
                                    type="email"
                                    placeholder="pelda@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-password">Jelszó</Label>
                                <Input
                                    id="reg-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                             <div className="space-y-2">
                                <Label>Ki vagy Te?</Label>
                                <div className="grid grid-cols-2 gap-3 mt-1">
                                    <button
                                        type="button"
                                        onClick={() => setRole('student')}
                                        className={cn(
                                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center",
                                            role === 'student' 
                                                ? "bg-indigo-50 border-indigo-500 shadow-sm" 
                                                : "bg-white border-slate-100 hover:border-slate-200"
                                        )}
                                    >
                                        <span className="text-2xl mb-1">🎒</span>
                                        <span className={cn("text-xs font-bold", role === 'student' ? "text-indigo-700" : "text-slate-600")}>Diák vagyok</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('teacher')}
                                        className={cn(
                                            "flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center",
                                            role === 'teacher' 
                                                ? "bg-rose-50 border-rose-500 shadow-sm" 
                                                : "bg-white border-slate-100 hover:border-slate-200"
                                        )}
                                    >
                                        <span className="text-2xl mb-1">👨‍🏫</span>
                                        <span className={cn("text-xs font-bold", role === 'teacher' ? "text-rose-700" : "text-slate-600")}>Tanár vagyok</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Jelszó megerősítése</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                            <Button type="submit" className="w-full rounded-xl h-11 font-bold bg-gradient-math" disabled={loading}>
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-5 h-5 mr-2" /> Regisztráció</>}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">Vagy folytasd ezzel</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl h-11 font-bold border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <Chrome className="w-5 h-5 text-[#4285F4]" />
                            Google Authentication
                        </>
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
