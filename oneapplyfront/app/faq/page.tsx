"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function FAQPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    general: true,
    jobSeekers: false,
    employers: false,
    scoring: false,
    privacy: false,
    support: false,
  })

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const faqData = {
    general: [
      {
        question: "Qu'est-ce que ONE APPLY ?",
        answer:
          "ONE APPLY est une plateforme de recrutement intelligente qui automatise les candidatures et connecte les chercheurs d'emploi avec les recruteurs en utilisant l'IA.",
      },
      {
        question: "Est-ce que l'utilisation de la plateforme est gratuite ?",
        answer:
          "Oui, pour les candidats, l'inscription et l'utilisation de la plateforme sont entièrement gratuites. Les entreprises peuvent avoir des options payantes pour accéder à des fonctionnalités avancées.",
      },
      {
        question: "Qui peut utiliser cette plateforme ?",
        answer:
          "Toute personne à la recherche d'un emploi ou d'un stage, ainsi que les recruteurs et entreprises souhaitant embaucher des talents qualifiés.",
      },
    ],
    jobSeekers: [
      {
        question: "Comment puis-je m'inscrire sur la plateforme ?",
        answer:
          'Cliquez sur le bouton "S\'inscrire", remplissez vos informations personnelles et téléchargez votre CV.',
      },
      {
        question: "Comment fonctionne l'application automatique aux offres ?",
        answer:
          "Après avoir rempli votre profil, notre IA analyse votre CV et vos compétences. Elle postule automatiquement aux offres où votre score est suffisant.",
      },
      {
        question: "Puis-je modifier mon CV après l'inscription ?",
        answer:
          "Oui, vous pouvez mettre à jour votre CV, vos certifications et vos compétences à tout moment via votre espace personnel.",
      },
      {
        question: "Comment puis-je améliorer mon score pour obtenir plus d'entretiens ?",
        answer:
          'Ajoutez plus de compétences, certifications et expériences pour renforcer votre profil. Consultez notre section "Career Advice" pour des conseils.',
      },
      {
        question: 'Que signifie "présélectionné" dans mon statut ?',
        answer:
          "Cela signifie que vous avez été identifié comme un bon candidat pour une offre et que le recruteur peut vous contacter pour un entretien.",
      },
    ],
    employers: [
      {
        question: "Comment puis-je publier une offre d'emploi ?",
        answer:
          'Connectez-vous, accédez à votre tableau de bord et cliquez sur "Publier une offre". Remplissez les détails du poste et notre IA vous proposera les meilleurs candidats automatiquement.',
      },
      {
        question: "Comment le système de scoring aide-t-il les recruteurs ?",
        answer:
          "Notre IA analyse les compétences et l'expérience des candidats et leur attribue un score basé sur la pertinence par rapport à l'offre. Les recruteurs voient ainsi uniquement les meilleurs profils en priorité.",
      },
      {
        question: "Puis-je filtrer les candidats manuellement ?",
        answer:
          "Oui, vous pouvez ajouter des critères personnalisés et trier les candidats selon leurs compétences, score, localisation, etc.",
      },
      {
        question: "Puis-je contacter directement un candidat ?",
        answer:
          "Oui, une fois un candidat présélectionné, vous pouvez le contacter via son profil et réserver un entretien via Calendly.",
      },
    ],
    scoring: [
      {
        question: "Comment fonctionne le scoring des candidats ?",
        answer:
          "Notre IA utilise un barème de scoring basé sur : les compétences requises pour l'offre, l'expérience professionnelle et les certifications, la correspondance des mots-clés entre l'offre et le profil du candidat.",
      },
      {
        question: "Mon score peut-il évoluer ?",
        answer:
          "Oui ! Vous pouvez améliorer votre score en ajoutant de nouvelles compétences, certifications et expériences.",
      },
      {
        question: "L'IA prend-elle en compte les soft skills ?",
        answer:
          "Pour l'instant, notre système analyse les compétences techniques et l'expérience. Une future mise à jour pourrait intégrer les soft skills via des tests de personnalité.",
      },
    ],
    privacy: [
      {
        question: "Mes données personnelles sont-elles protégées ?",
        answer:
          "Oui, nous respectons les règlements sur la protection des données (RGPD) et utilisons des protocoles de sécurité avancés pour protéger vos informations.",
      },
      {
        question: "Qui peut voir mon CV ?",
        answer: "Seuls les recruteurs dont les offres correspondent à votre profil peuvent voir votre CV.",
      },
      {
        question: "Puis-je supprimer mon compte ?",
        answer:
          "Oui, vous pouvez supprimer votre compte et vos données à tout moment en allant dans Paramètres > Supprimer mon compte.",
      },
    ],
    support: [
      {
        question: "J'ai un problème avec mon compte, comment obtenir de l'aide ?",
        answer:
          "Vous pouvez nous contacter via notre support client à support@oneapply.com ou via le chat en ligne disponible sur notre site.",
      },
      {
        question: "Quels sont les délais de réponse du support ?",
        answer: "Nous répondons généralement sous 24 à 48 heures.",
      },
      {
        question: "Puis-je signaler une offre frauduleuse ?",
        answer:
          "Oui, si vous pensez qu'une offre est suspecte, vous pouvez cliquer sur \"Signaler une offre\" directement sur l'annonce ou nous contacter à support@oneapply.com.",
      },
    ],
  }

  const filterFAQs = () => {
    if (!searchQuery.trim()) return faqData

    const filteredData: Record<string, any[]> = {}

    Object.entries(faqData).forEach(([category, questions]) => {
      const filteredQuestions = questions.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      if (filteredQuestions.length > 0) {
        filteredData[category] = filteredQuestions
      }
    })

    return filteredData
  }

  const filteredFAQs = filterFAQs()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Foire Aux Questions</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Trouvez des réponses aux questions les plus fréquentes sur ONE APPLY et notre plateforme de recrutement
              intelligente.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher dans la FAQ..."
                  className="pl-10 py-6 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              {Object.keys(filteredFAQs).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xl text-gray-600">
                    Aucun résultat trouvé pour "{searchQuery}". Veuillez essayer une autre recherche.
                  </p>
                </div>
              ) : (
                <>
                  {/* General */}
                  {filteredFAQs.general && filteredFAQs.general.length > 0 && (
                    <div className="mb-8">
                      <button
                        className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => toggleCategory("general")}
                      >
                        <span>Général</span>
                        {openCategories.general ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {openCategories.general && (
                        <div className="mt-4 space-y-4">
                          {filteredFAQs.general.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                              <p className="text-gray-600">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Job Seekers */}
                  {filteredFAQs.jobSeekers && filteredFAQs.jobSeekers.length > 0 && (
                    <div className="mb-8">
                      <button
                        className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => toggleCategory("jobSeekers")}
                      >
                        <span>Candidats (Job Seekers)</span>
                        {openCategories.jobSeekers ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {openCategories.jobSeekers && (
                        <div className="mt-4 space-y-4">
                          {filteredFAQs.jobSeekers.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                              <p className="text-gray-600">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Employers */}
                  {filteredFAQs.employers && filteredFAQs.employers.length > 0 && (
                    <div className="mb-8">
                      <button
                        className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => toggleCategory("employers")}
                      >
                        <span>Recruteurs (Employers)</span>
                        {openCategories.employers ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {openCategories.employers && (
                        <div className="mt-4 space-y-4">
                          {filteredFAQs.employers.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                              <p className="text-gray-600">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Scoring & AI */}
                  {filteredFAQs.scoring && filteredFAQs.scoring.length > 0 && (
                    <div className="mb-8">
                      <button
                        className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => toggleCategory("scoring")}
                      >
                        <span>Scoring & IA</span>
                        {openCategories.scoring ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {openCategories.scoring && (
                        <div className="mt-4 space-y-4">
                          {filteredFAQs.scoring.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                              <p className="text-gray-600">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Privacy & Security */}
                  {filteredFAQs.privacy && filteredFAQs.privacy.length > 0 && (
                    <div className="mb-8">
                      <button
                        className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => toggleCategory("privacy")}
                      >
                        <span>Confidentialité et Sécurité</span>
                        {openCategories.privacy ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {openCategories.privacy && (
                        <div className="mt-4 space-y-4">
                          {filteredFAQs.privacy.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                              <p className="text-gray-600">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Support & Contact */}
                  {filteredFAQs.support && filteredFAQs.support.length > 0 && (
                    <div className="mb-8">
                      <button
                        className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => toggleCategory("support")}
                      >
                        <span>Support & Contact</span>
                        {openCategories.support ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {openCategories.support && (
                        <div className="mt-4 space-y-4">
                          {filteredFAQs.support.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                              <p className="text-gray-600">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

