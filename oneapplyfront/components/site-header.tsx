"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSelector } from "@/components/language-selector";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { authService } from "@/services/auth-service";

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePath, setProfilePath] = useState("/profile");

  const checkAuth = async () => {
    const authenticated = await authService.isAuthenticated() ;
    setIsAuthenticated(authenticated);

    if (authenticated) {
      const role = await authService.getUserRole();
      setProfilePath(role === "intern" ? "/profile/intern" : "/profile/company");
    }
  };

  useEffect(() => {
    // 🔥 Vérifie l'authentification au chargement de la page
    checkAuth();

    // 🚀 Ajoute un écouteur d'événement pour détecter les changements (connexion/déconnexion)
    const handleStorageEvent = () => {
      checkAuth(); // Met à jour l'état d'authentification
    };

    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [pathname]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");
  const isAboutActive = () => ["/about", "/contact", "/faq", "/privacy-policy", "/terms-of-service"].some(isActive);

  return (
      <header className={`w-full py-3 px-4 flex items-center justify-between border-b shadow-sm ${theme === "dark" ? "bg-[#1a2337] border-[#292929]" : "bg-white border-gray-200"}`}>
        <Link href="/">
          <Image src={theme === "dark" ? "/one-apply-logo-dark.svg" : "/one-apply-logo.svg"} alt="ONE APPLY" width={150} height={40} priority />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={`${isActive("/") ? "text-primary font-semibold" : "text-gray-700"}`}>{t("nav.home")}</Link>
          <Link href="/company-reviews" className={`${isActive("/company-reviews") ? "text-primary font-semibold" : "text-gray-700"}`}>{t("nav.companyReviews")}</Link>

          <DropdownMenu>
            <DropdownMenuTrigger className={`${isAboutActive() ? "text-primary font-semibold" : "text-gray-700"} flex items-center`}>
              {t("nav.aboutUs")}<ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><Link href="/about">{t("nav.about")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/contact">{t("nav.contact")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/faq">{t("nav.faq")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/privacy-policy">{t("footer.privacyPolicy")}</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/terms-of-service">{t("footer.termsOfService")}</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/career-advice" className={`${isActive("/career-advice") ? "text-primary font-semibold" : "text-gray-700"}`}>{t("nav.careerAdvice")}</Link>

          {isAuthenticated && (
              <Link href={profilePath} className={`${isActive(profilePath) ? "text-primary font-semibold" : "text-gray-700"}`}>{t("nav.profile")}</Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />

          <div className="hidden md:flex gap-3">
            {isAuthenticated ? (
                <Button onClick={() => {
                  authService.logout();
                  window.dispatchEvent(new Event("storage")); // 🔥 Force la mise à jour après logout
                }}>
                  {t("nav.logout")}
                </Button>
            ) : (
                <>
                  <Link href="/sign-in">{t("nav.signIn")}</Link>
                  <Link href="/register"><Button>{t("nav.register")}</Button></Link>
                </>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {mobileMenuOpen && (
            <div className={`fixed inset-0 top-[57px] z-50 p-4 flex flex-col ${theme === "dark" ? "bg-[#1a2337]" : "bg-white"}`}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>{t("nav.home")}</Link>
              <Link href="/company-reviews" onClick={() => setMobileMenuOpen(false)}>{t("nav.companyReviews")}</Link>
              {isAuthenticated && <Link href={profilePath} onClick={() => setMobileMenuOpen(false)}>{t("nav.profile")}</Link>}
              <Button onClick={() => {
                authService.logout();
                window.dispatchEvent(new Event("storage")); // 🔥 Force la mise à jour après logout
              }}>
                {t("nav.logout")}
              </Button>
            </div>
        )}
      </header>
  );
}
