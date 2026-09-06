import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Checkbox } from "@/components/ui/checkbox";
import { auth, db } from "@/lib/firebase";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithPopup, 
    GoogleAuthProvider,
    sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
            />
        </svg>
    );
}

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'teacher' | 'student'>('student');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // Password visibility toggles
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            toast.error("Kérjük, előbb add meg az e-mail címedet a fenti mezőben!");
            return;
        }
        setResetLoading(true);
        try {
            await sendPasswordResetEmail(auth, email.trim());
            toast.success(`Jelszó-visszaállító link elküldve a(z) ${email} címre! Kérjük, ellenőrizd a beérkező leveleidet.`);
        } catch (error: any) {
            console.error("Password reset error:", error);
            toast.error(error.message || "Nem sikerült elküldeni a jelszó-visszaállító levelet.");
        } finally {
            setResetLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
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
        if (!acceptedTerms) {
            toast.error("Kérjük, fogadd el a Felhasználási feltételeket és az Adatkezelési tájékoztatót!");
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (fullName) {
                await updateProfile(user, { displayName: fullName });
            }

            // Create initial profile document in Firestore
            await setDoc(doc(db, 'profiles', user.uid), {
                id: user.uid,
                full_name: fullName || null,
                username: email.split('@')[0],
                role: role,
                avatar_url: user.photoURL || null,
                updated_at: new Date().toISOString(),
            });

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
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Ensure profile exists in Firestore
            await setDoc(doc(db, 'profiles', user.uid), {
                id: user.uid,
                full_name: user.displayName || null,
                username: user.email?.split('@')[0] || null,
                role: role,
                avatar_url: user.photoURL || null,
                updated_at: new Date().toISOString(),
            }, { merge: true });

            toast.success("Sikeres bejelentkezés!");
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Hiba a Google bejelentkezés során");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 shadow-2xl">
                <DialogHeader className="pb-1">
                    <DialogTitle className="text-2xl font-black text-center tracking-tight">Üdv a DiákZónában!</DialogTitle>
                    <DialogDescription className="text-center text-xs sm:text-sm">
                        Jelentkezz be vagy regisztrálj az extra funkciókért.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={defaultTab} className="w-full mt-3">
                    <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-4">
                        <TabsTrigger value="login" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                            Belépés
                        </TabsTrigger>
                        <TabsTrigger value="register" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
                            Regisztráció
                        </TabsTrigger>
                    </TabsList>

                    {/* LOGIN TAB */}
                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-3.5">
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-xs font-semibold">E-mail cím</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="pelda@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-xl h-10"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-semibold">Jelszó</Label>
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        disabled={resetLoading}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
                                    >
                                        {resetLoading ? "Küldés..." : "Elfelejtett jelszó?"}
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showLoginPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="rounded-xl h-10 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                                        tabIndex={-1}
                                        title={showLoginPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
                                    >
                                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full rounded-xl h-11 font-bold bg-gradient-math mt-2 shadow-md hover:shadow-lg transition-all" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4 mr-2" /> Bejelentkezés</>}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* REGISTER TAB */}
                    <TabsContent value="register">
                        <form onSubmit={handleRegister} className="space-y-3.5">
                            {/* Role selector first */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Ki vagy Te?</Label>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setRole('student')}
                                        className={cn(
                                            "flex items-center justify-center gap-2 py-2 px-3 rounded-xl border-2 transition-all text-center",
                                            role === 'student' 
                                                ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm dark:bg-indigo-950/40 dark:border-indigo-400 dark:text-indigo-300" 
                                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                                        )}
                                    >
                                        <span className="text-xl">🎒</span>
                                        <span className="text-xs font-bold">Diák vagyok</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('teacher')}
                                        className={cn(
                                            "flex items-center justify-center gap-2 py-2 px-3 rounded-xl border-2 transition-all text-center",
                                            role === 'teacher' 
                                                ? "bg-rose-50 border-rose-500 text-rose-700 shadow-sm dark:bg-rose-950/40 dark:border-rose-400 dark:text-rose-300" 
                                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                                        )}
                                    >
                                        <span className="text-xl">👨‍🏫</span>
                                        <span className="text-xs font-bold">Tanár vagyok</span>
                                    </button>
                                </div>
                            </div>

                            {/* Name and Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="fullName" className="text-xs font-semibold">Teljes név</Label>
                                    <Input
                                        id="fullName"
                                        placeholder="Pl. Kiss Péter"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        className="rounded-xl h-10"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="reg-email" className="text-xs font-semibold">E-mail cím</Label>
                                    <Input
                                        id="reg-email"
                                        type="email"
                                        placeholder="pelda@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="rounded-xl h-10"
                                    />
                                </div>
                            </div>

                            {/* Password and Confirm Password logically together */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="reg-password" className="text-xs font-semibold">Jelszó</Label>
                                    <div className="relative">
                                        <Input
                                            id="reg-password"
                                            type={showRegPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="rounded-xl h-10 pr-9"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegPassword(!showRegPassword)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                                            tabIndex={-1}
                                            title={showRegPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
                                        >
                                            {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="confirm-password" className="text-xs font-semibold">Megerősítés</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirm-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="rounded-xl h-10 pr-9"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                                            tabIndex={-1}
                                            title={showConfirmPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-2 pt-1">
                                <Checkbox
                                    id="accept-terms"
                                    checked={acceptedTerms}
                                    onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                                    className="mt-0.5 border-slate-300 dark:border-slate-700 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                />
                                <Label htmlFor="accept-terms" className="text-xs text-slate-500 leading-snug cursor-pointer select-none font-medium">
                                    Elolvastam és elfogadom a{" "}
                                    <Link to="/felhasznalasi-feltetelek" target="_blank" className="text-emerald-500 hover:text-emerald-400 font-bold underline">
                                        Felhasználási feltételeket
                                    </Link>{" "}
                                    és az{" "}
                                    <Link to="/adatkezeles" target="_blank" className="text-emerald-500 hover:text-emerald-400 font-bold underline">
                                        Adatkezelési tájékoztatót
                                    </Link>
                                    .
                                </Label>
                            </div>

                            <Button type="submit" className="w-full rounded-xl h-11 font-bold bg-gradient-math shadow-md hover:shadow-lg transition-all" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><UserPlus className="w-4 h-4 mr-2" /> Regisztráció</>}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                <div className="relative my-3.5">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-slate-950 px-2 text-slate-400 font-medium">Vagy folytasd ezzel</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl h-11 font-semibold border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 text-sm"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                    ) : (
                        <>
                            <GoogleLogo className="w-5 h-5 flex-shrink-0" />
                            <span>Bejelentkezés Google-fiókkal</span>
                        </>
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
