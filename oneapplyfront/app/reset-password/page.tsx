"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { authService } from "@/services/auth-service";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { t } = useLanguage();

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong">("weak");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Vérification du token de réinitialisation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const resetToken = sessionStorage.getItem("resetToken");
      if (!resetToken) {
        console.warn("⛔ Accès refusé ! Redirection vers la vérification OTP.");
        router.replace(`/verifyEmailForgetpassword?email=${encodeURIComponent(email)}`);
      }
    }
  }, [router, email]);

  // ✅ Gestion des changements dans les inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Callback optimisé pour gérer la force du mot de passe
  const handleStrengthChange = useCallback((strength: "weak" | "medium" | "strong") => {
    console.log("💪 Strength updated:", strength);
    setPasswordStrength(strength);
  }, []);

  // ✅ Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Vérification de la correspondance des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.passwordsDoNotMatch") || "Passwords do not match.");
      return;
    }

    // Vérification de la force du mot de passe
    if (passwordStrength === "weak") {
      setError(t("auth.passwordTooWeak") || "Password is too weak. Please use a stronger password.");
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(email, formData.password);
      sessionStorage.removeItem("resetToken");
      console.log("✅ Mot de passe réinitialisé avec succès !");
      router.push("/sign-in");
    } catch (err: any) {
      console.error("❌ Erreur :", err);
      setError(t("auth.resetPasswordFailed") || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t("auth.resetPasswordTitle") || "Reset your password"}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t("auth.resetPasswordSubtitle") || "Create a new password for your account"}
              </p>
            </div>

            <form
                className="space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] p-6 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-[#292929]"
                onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                {/* Champ mot de passe */}
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("registerIntern.password")}*
                </label>
                <PasswordInput
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    showStrengthMeter
                    onStrengthChange={handleStrengthChange} // ✅ Ajout du callback
                    className="mt-1"
                    placeholder="Enter new password"
                />

                {/* Champ confirmation mot de passe */}
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("registerIntern.confirmPassword")}*
                </label>
                <PasswordInput
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder={t("forgetpassword.confirmPassword") || "Confirm new password"}
                />
              </div>

              {/* Affichage d'erreur */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Bouton de soumission */}
              <Button type="submit" className="w-full bg-primary text-white" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset password"}
              </Button>
            </form>

            {/* Lien vers la connexion */}
            <div className="text-center">
              <Link href="/sign-in" className="text-primary hover:underline">
                Back to sign in
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
  );
}
