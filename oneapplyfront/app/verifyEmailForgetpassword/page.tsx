'use client';

const BASE_URL = "http://localhost:3001"; // Ton backend NestJS

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { OTPInput } from '@/components/otp-input';
import { CheckCircle2, Link } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { useLanguage } from '@/contexts/language-context';

export default function VerifyCodePage() {
    const { t } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');
    const [resendDisabled, setResendDisabled] = useState(true);
    const [timeLeft, setTimeLeft] = useState(30);

    // Timer pour "Resend"
    useEffect(() => {
        if (timeLeft > 0 && resendDisabled) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setResendDisabled(false);
        }
    }, [timeLeft, resendDisabled]);

    // Vérification du code
    const handleVerify = async () => {
        setIsVerifying(true);
        setError('');
        try {
            const response = await fetch(`${BASE_URL}/auth/verification-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                setIsVerified(true);
            }
        } catch (err) {
            setError('Invalid or expired code. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

// Renvoyer le code
    const handleResend = async () => {
        setError('');
        try {
            const response = await fetch(`${BASE_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });


            if (response.ok) {
                const data = await response.json();
                setResendDisabled(true);
                setTimeLeft(30);
            } else {
                throw new Error('Resend failed');
            }
        } catch (err) {
            setError('Failed to resend code. Please try again.');
        }
    };

    // Redirection après vérification réussie
    useEffect(() => {
        if (isVerified) {
            console.log('isVerified updated to:', isVerified); // Vérifie la mise à jour
            router.push(`reset-password?email=${encodeURIComponent(email)}`);
        }
    }, [isVerified, router, email]);

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
                                {t('verifyEmail.success.title')}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {t('verifyEmail.success.subtitle')}
                            </p>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <Button
                                onClick={() => router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)}
                                className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]"
                            >
                                {t('verifyEmail.success.continue')}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t('verifyEmail.title')}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                We have sent a reset code to your email {email || 'your email'}.
                            </p>
                        </div>
                        <div className="mt-8 space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] dark:border-[#292929] p-6 rounded-lg shadow-sm dark:shadow-none">
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                                    {t('verifyEmail.enterCode')}
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
                                    {isVerifying ? t('verifyEmail.verifying') : t('verifyEmail.verifyButton')}
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

                                <Link
                                    href="/sign-in"
                                    className="text-center font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
                                >
                                    {t('verifyEmail.backToSignIn')}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <SiteFooter/>
        </div>
    );
}

