"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/password-input";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/language-context";
import { authService } from "@/services/auth-service";
import { useUser } from "@/contexts/UserContext";

export default function SignIn() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Vérification de la session existante
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userData = await authService.getUserInfo();
        if (userData?.idUser) {
          setUser(userData);
        }
      } catch (error) {
        console.warn("⚠️ Aucun utilisateur authentifié.");
      }
    };
    checkUserSession();
  }, [setUser]);

  // Redirection après mise à jour de l'utilisateur
  useEffect(() => {
    if (user?.id) {
      const destination = user.role === "company" ? "/profile/company" : "/profile/intern";
      router.push(destination);
    }
  }, [user, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const loginResponse = await authService.login(email, password);
      if (loginResponse.message !== "Log in successfully!") {
        throw new Error("Réponse inattendue du serveur");
      }

      const userData = await authService.getUserInfo();
      if (!userData || !userData.idUser) {
        throw new Error("Impossible de récupérer les données utilisateur");
      }

      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || t("auth.invalidCredentials");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.initiateGoogleLogin();
    } catch (error: any) {
      setError(error.message || "Google authentication failed.");
    }
  };

  return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">{t("auth.signIn")}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{t("auth.welcomeBack")}</p>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-6">
                  {error}
                </div>
            )}

            <form className="space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] p-6 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-[#292929]" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">{t("auth.email")}</label>
                <Input id="email" type="email" placeholder={t("auth.enterEmail")} value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium">{t("auth.password")}</label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">{t("auth.forgotPassword")}</Link>
                </div>
                <PasswordInput id="password" name="password" placeholder={t("auth.enterPassword")} value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
              </div>
              <div className="flex items-center">
                <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">{t("auth.rememberMe")}</label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("auth.signingIn") : t("auth.signInButton")}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300 dark:border-gray-700"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-background text-gray-500 dark:text-gray-400">{t("auth.orContinueWith")}</span></div>
              </div>
              <div className="mt-6">
                <Button onClick={handleGoogleLogin} className="w-full" variant="outline">{t("auth.continueWithGoogle")}</Button>
              </div>
              <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
                {t("auth.dontHaveAccount")}{" "} <Link href="/register" className="text-primary hover:underline">{t("auth.signUp")}</Link>
              </p>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
  );
}