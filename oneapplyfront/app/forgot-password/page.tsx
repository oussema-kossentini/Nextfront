'use client';

import {verify} from "node:crypto";

const BASE_URL = "http://localhost:3000"; // Ton backend NestJS


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Link } from 'lucide-react';
import {authService} from "@/services/auth-service";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
console.log("email:",email);
            await authService.sendResetCode(email);
                router.push(`verifyEmailForgetpassword?email=${encodeURIComponent(email)}`);

        } catch (err) {
            setError('Invalid email or failed to send code. Please try again.');
        }

finally
    { setIsLoading(false); }}
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Forgot your password?
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Enter your email address and we'll send you a code to reset your password.
                        </p>
                    </div>
                    <form className="space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] p-6 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-[#292929]" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button
                            type="submit"
                            className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]"
                        >
                            Send Reset Code
                        </Button>
                    </form>
                    <div className="text-center">
                        <Link href="/sign-in" className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90">
                            Back to sign in
                        </Link>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}