"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Mail, Phone, Edit } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/language-context";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function InternProfile() {
  const { user } = useUser(); // ✅ Récupérer les données utilisateur du UserContext
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in"); // ✅ Rediriger si non connecté
    }
  }, [user, router]);

  if (!user) return <p className="text-center py-10">Chargement...</p>;

  return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <SiteHeader />

        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Profile Header */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Avatar */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden">
                    <Image
                        src={user.image || "/placeholder.svg"}
                        alt={user.firstName || "Utilisateur"}
                        fill
                        className="object-cover"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-primary font-medium mb-2">{user.role === "intern" ? "Intern" : "Company"}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{user.address || "Adresse non renseignée"}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <Button variant="outline" className="gap-2">
                        <Mail className="h-4 w-4" />
                        {t("profile.message")}
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Phone className="h-4 w-4" />
                        {t("profile.contact")}
                      </Button>
                      {!isEditing && (
                          <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                            <Edit className="h-4 w-4" />
                            {t("profile.editProfile")}
                          </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">{t("profile.contactInformation")}</h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Phone className="h-4 w-4" />
                        <span>{user.phone || "Numéro non renseigné"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Education (Seulement si intern) */}
                  {user.role === "intern" && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">{t("profile.education")}</h2>
                        <div className="space-y-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            Date de naissance : {user.birthDate || "Non renseigné"}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Statut : {user.status || "Non renseigné"}
                          </p>
                        </div>
                      </div>
                  )}

                  {/* Company Information (Seulement si company) */}
                  {user.role === "company" && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">{t("profile.companyInfo")}</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                          Nom de l'entreprise : {user.companyName || "Non renseigné"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Secteur d'activité : {user.industryType || "Non renseigné"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Site web : {user.website ? (
                            <Link href={user.website} className="text-primary hover:underline">
                              {user.website}
                            </Link>
                        ) : "Non renseigné"}
                        </p>
                      </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="md:col-span-2 space-y-6">
                  {/* Ajout d'une section générique si d'autres infos sont nécessaires */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Autres informations</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      Membre depuis : {new Date(user.createdAt || "").toLocaleDateString() || "Date inconnue"}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Vérifié : {user.isVerified ? "✅ Oui" : "❌ Non"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
  );
}
