"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth-service";

export default function OAuth2Redirect() {
  const router = useRouter();
  const hasRunRef = useRef(false);
  const [message, setMessage] = useState("Redirection en cours...");

  useEffect(() => {
    if (hasRunRef.current || typeof window === "undefined") return;

    hasRunRef.current = true;

    async function handleOAuthRedirect() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        setMessage("Erreur : Code OAuth manquant.");
        setTimeout(() => router.replace("/sign-in"), 2000);
        return;
      }

      try {
        const response = await authService.exchangeCodeForToken(code);

        if (response.success && response.role) {
          // 🚀 Forcer explicitement la mise à jour de React :
          await authService.getUserInfo(); // Ceci actualise immédiatement React
          window.dispatchEvent(new Event("storage"));
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userRole", response.role);

            localStorage.setItem("oauth-redirect",Date.now().toString());
          const redirectPath = response.role === "intern" ? "/profile/intern" : "/profile/company";

          // Forcer React à recharger complètement la route (solution immédiate et définitive)
         // window.location.replace(redirectPath);
            router.push(redirectPath)
        } else {
          throw new Error(response.message || "Erreur OAuth inconnue.");
        }
      } catch (error) {
        console.error("❌ Erreur OAuth :", error);
        setMessage("Erreur lors de la connexion OAuth.");
        setTimeout(() => router.replace("/sign-in"), 2000);
      }
    }

    handleOAuthRedirect();
  }, [router]);

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">{message}</h1>
        </div>
      </div>
  );
}
