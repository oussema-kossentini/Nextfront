"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/otp-input";
import { useLanguage } from "@/contexts/language-context";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useUser } from "@/contexts/UserContext";
import {authService} from "@/services/auth-service";
import {decryptData, generateKey} from "@/app/utils/crypto-utils";

export default function VerifyEmail() {
    const { t } = useLanguage();
    const router = useRouter();
    const { setUser } = useUser();
    const [otp, setOtp] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedEmail = localStorage.getItem("emailvrf");
            setEmail(storedEmail);
            console.log("✅ Email récupéré depuis localStorage :", storedEmail);
        }
    }, []);

    const handleVerify = async () => {
        if (!email) {
            setError("Aucune adresse e-mail trouvée. Veuillez vous inscrire à nouveau.");
            return;
        }

        setIsVerifying(true);
        setError("");

        try {
            console.log("📡 Envoi de la requête OTP...");

            const response = await fetch("http://localhost:3000/auth/GiveTokenAfterVerifyOtp", {
                method: "POST",
                credentials: "include", // ✅ Assure que les cookies sont envoyés et reçus
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, otp }),
            });

            if (!response.ok) {
                throw new Error("❌ Erreur lors de la vérification OTP.");
            }

            // ✅ Vérifier que le serveur envoie bien un `Set-Cookie`
            const setCookieHeader = response.headers.get("set-cookie");
            console.log("🍪 Set-Cookie reçu :", setCookieHeader);

            const responseData = await response.json();

            if (responseData.message !== "✅ Account successfully verified!") {
                setError("Une erreur est survenue. Veuillez réessayer.");
                return;
            }

            console.log("✅ Vérification réussie ! Récupération des infos utilisateur...");

            // ✅ Récupération des informations utilisateur après vérification
            const userResponse = await fetch("http://localhost:3000/auth/me", {
                method: "GET",
                credentials: "include", // ✅ Très important pour envoyer les cookies
            });

            if (!userResponse.ok) {
                throw new Error("❌ Impossible de récupérer les informations utilisateur.");
            }
            localStorage.setItem("isAuthenticated", "true");

            const userDatafetch = await userResponse.json();
            console.log("👤 Données utilisateur récupérées :", userDatafetch);

            setUser(userDatafetch);
            console.log("🟢 Utilisateur mis à jour dans le contexte.");

            setIsVerified(true);

            // ✅ Redirection en fonction du rôle
            if (userDatafetch.role === "intern") {
                router.push("/profile/intern");
            } else if (userDatafetch.role === "company") {
                router.push("/profile/company");
            }
        } catch (err) {
            console.error("❌ Erreur :", err);
            setError("Invalid verification code. Vérifiez votre code OTP.");
        } finally {
            setIsVerifying(false);
        }
    };


    const handleResend = async () => {
        if (!email) {
            alert("No email found. Please register again.");
            return;
        }

        try {
            await axios.post("http://localhost:3000/auth/resend-otp", { email });
            alert("A new verification code has been sent to your email.");
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            alert(axiosError.response?.data?.message || "Failed to resend verification code.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1 flex items-center justify-center py-12 px-4">
                {isVerified ? (
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t("verifyEmail.success.title")}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("verifyEmail.success.subtitle")}</p>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Link href="/sign-in">
                                <Button className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]">
                                    {t("verifyEmail.success.continue")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t("verifyEmail.title")}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("verifyEmail.subtitle")}</p>
                        </div>

                        <div className="mt-8 space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] dark:border-[#292929] p-6 rounded-lg shadow-sm dark:shadow-none">
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                                    {t("verifyEmail.enterCode")}
                                </label>
                                <OTPInput length={6} onComplete={setOtp} className="mb-4" />
                                {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}
                            </div>

                            <div className="flex flex-col space-y-4">
                                <Button
                                    type="button"
                                    className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]"
                                    onClick={handleVerify}
                                    disabled={otp.length !== 6 || isVerifying}
                                >
                                    {isVerifying ? t("verifyEmail.verifying") : t("verifyEmail.verifyButton")}
                                </Button>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("verifyEmail.didntReceive")}</p>
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="text-sm font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                                    >
                                        {t("verifyEmail.resend")}
                                    </button>
                                </div>

                                <Link href="/sign-in" className="text-center font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90">
                                    {t("verifyEmail.backToSignIn")}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <SiteFooter />
        </div>
    );
}
