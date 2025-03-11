"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Définition des traductions (conservez toutes les traductions existantes)
const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.findJobs": "Find Jobs",
    "nav.companies": "Companies",
    "nav.resources": "Resources",
    "nav.about": "About",
    "nav.aboutUs": "About Us",
    "nav.signIn": "Sign in",
    "nav.register": "Register",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",
    "nav.companyReviews": "Company Reviews",
    "nav.careerAdvice": "Career Advice",
    "nav.profile": "Profile",
    "nav.logout": "Logout",

    // Hero
    "hero.title": "One Application, Endless Opportunities",
    "hero.subtitle":
      "AI-powered job matching that connects you with your perfect internship. Apply once, reach hundreds of companies.",
    "hero.searchPlaceholder": "Job title, keywords, or company",
    "hero.searchButton": "Search Jobs",

    // Features
    "features.title": "Why Choose ONE APPLY",
    "features.subtitle": "Smart features that make your job search easier and more effective",
    "features.ai.title": "AI-Powered Matching",
    "features.ai.description": "Our AI analyzes your skills and experience to find the perfect job matches",
    "features.oneClick.title": "One-Click Apply",
    "features.oneClick.description": "Apply to multiple positions with a single application and profile",
    "features.analytics.title": "Smart Analytics",
    "features.analytics.description": "Track your application status and get insights on your job search",

    // Stats
    "stats.activeJobs": "Active Jobs",
    "stats.companies": "Companies",
    "stats.jobSeekers": "Job Seekers",
    "stats.successRate": "Success Rate",

    // How it works
    "how.title": "How ONE APPLY Works",
    "how.subtitle": "Three simple steps to your next opportunity",
    "how.step1.title": "Create Your Profile",
    "how.step1.description": "Upload your resume or build your profile with our easy-to-use tools",
    "how.step2.title": "Get Matched",
    "how.step2.description": "Our AI matches your profile with relevant job opportunities",
    "how.step3.title": "Apply & Track",
    "how.step3.description": "Apply with one click and track your application status in real-time",

    // CTA
    "cta.title": "Ready to Start Your Journey?",
    "cta.subtitle": "Join thousands of job seekers who found their perfect match with ONE APPLY",
    "cta.intern": "I'm Looking for an Internship",
    "cta.company": "I'm Hiring Interns",

    // Partners
    "partners.title": "Our Partners",
    "partners.subtitle": "We collaborate with leading organizations to provide the best opportunities",

    // Testimonials
    "testimonials.title": "What Our Users Say",
    "testimonials.subtitle": "Hear from students who found their perfect internships",
    "testimonials.previous": "Previous testimonial",
    "testimonials.next": "Next testimonial",

    // Footer
    "footer.jobSeekers": "For Job Seekers",
    "footer.employers": "For Employers",
    "footer.company": "Company",
    "footer.copyright": "All rights reserved.",
    "footer.careerAdvice": "Career Advice",
    "footer.salaryGuide": "Salary Guide",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfService": "Terms of Service",
    "footer.contact": "Contact",
    "footer.slogan": "Making job search smarter with AI-powered matching",

    // Auth
    "auth.signIn": "Sign In",
    "auth.signInButton": "Sign In",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.createAccount": "Create an account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.rememberMe": "Remember me",
    "auth.forgotPassword": "Forgot password?",
    "auth.orContinueWith": "Or continue with",
    "auth.google": "Google",
    auth: {
      loading: "Processing authentication...",
      success: "Authentication successful!",
      error: {
        generic: "Authentication error",
        tokenMissing: "JWT token is missing",
        tokenDecode: "Error decoding token",
      },
    },

    // Register
    "register.title": "Choose Your Registration Type",
    "register.subtitle": "Select the option that best describes you",
    "register.intern.title": "I am a Job Seeker",
    "register.intern.description": "Create an account to find and apply for internships and jobs",
    "register.intern.button": "Register as Job Seeker",
    "register.company.title": "I am an Employer",
    "register.company.description": "Create an account to post jobs and find qualified candidates",
    "register.company.button": "Register as Employer",

    // Register Intern
    "registerIntern.title": "Register as Intern",
    "registerIntern.subtitle": "Create an account to find and apply for internships",
    "registerIntern.firstName": "First Name",
    "registerIntern.lastName": "Last Name",
    "registerIntern.email": "Email",
    "registerIntern.password": "Password",
    "registerIntern.confirmPassword": "Confirm Password",
    "registerIntern.birthDate": "Birth Date",
    "registerIntern.phone": "Phone (optional)",
    "registerIntern.profileImage": "Profile Image (optional)",
    "registerIntern.terms": "I agree to the",
    "registerIntern.termsLink": "Terms of Service",
    "registerIntern.and": "and",
    "registerIntern.privacyLink": "Privacy Policy",
    "registerIntern.createAccount": "Create Account",
    "registerIntern.creatingAccount": "Creating Account...",
    "registerIntern.passwordRequirements":
      "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.",

    // Register Company
    "registerCompany.title": "Register as Company",
    "registerCompany.subtitle": "Create an account to post internships and find candidates",
    "registerCompany.companyName": "Company Name",
    "registerCompany.email": "Email",
    "registerCompany.password": "Password",
    "registerCompany.confirmPassword": "Confirm Password",
    "registerCompany.address": "Address",
    "registerCompany.industryType": "Industry Type",
    "registerCompany.selectIndustry": "Select an industry",
    "registerCompany.website": "Website (optional)",
    "registerCompany.phone": "Phone (optional)",
    "registerCompany.companyLogo": "Company Logo (optional)",
    "registerCompany.terms": "I agree to the",
    "registerCompany.termsLink": "Terms of Service",
    "registerIntern.and": "and",
    "registerCompany.privacyLink": "Privacy Policy",
    "registerCompany.createAccount": "Create Account",
    "registerCompany.creatingAccount": "Creating Account...",
    "registerCompany.passwordRequirements":
      "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.",

    // Career Advice
    "careerAdvice.title": "Boost Your Career with Expert Advice",
    "careerAdvice.subtitle": "Practical resources to improve your employability and stand out in the job market",
    "careerAdvice.card.readMore": "Read More",
    "careerAdvice.card.readLess": "Read Less",

    // CV Advice
    "careerAdvice.cv.title": "How to Create an Attractive Resume",
    "careerAdvice.cv.shortDescription": "Layout, keywords, examples",
    "careerAdvice.cv.fullDescription": `
      <h4>Transform Your Resume into a Winning Asset</h4>
      <p>A well-crafted resume is your ticket to getting noticed by recruiters. Here are some key tips:</p>
      <ul>
        <li><strong>Clear and professional layout:</strong> Use clean fonts (Arial, Calibri), consistent spacing, and a logical structure.</li>
        <li><strong>Keyword optimization:</strong> Adapt your resume to each job by including relevant keywords from the job description.</li>
        <li><strong>Quantify achievements:</strong> Use numbers and metrics to demonstrate your impact (e.g., "Increased sales by 20%").</li>
        <li><strong>Proofread thoroughly:</strong> Eliminate spelling and grammar errors that can make a poor impression.</li>
      </ul>
      <p><strong>Bonus tip:</strong> Include personal projects or certifications to showcase your initiative and continuous learning.</p>
    `,

    // Profile Advice
    "careerAdvice.profile.title": "Optimize Your LinkedIn and GitHub Profiles",
    "careerAdvice.profile.shortDescription": "Visibility and organization",
    "careerAdvice.profile.fullDescription": `
      <h4>Become Visible to Recruiters</h4>
      <p>Your online presence is crucial in today's job market. Here's how to optimize it:</p>
      <h5>LinkedIn:</h5>
      <ul>
        <li>Create a compelling headline that includes your expertise and aspirations</li>
        <li>Write a concise but impactful bio highlighting your skills and experience</li>
        <li>Use the Skills section strategically, prioritizing those most relevant to your target roles</li>
        <li>Request recommendations from colleagues and supervisors</li>
      </ul>
      <h5>GitHub:</h5>
      <ul>
        <li>Organize your repositories with clear, descriptive names</li>
        <li>Create detailed README files explaining your projects' purpose and technologies used</li>
        <li>Pin your most impressive projects to the top of your profile</li>
        <li>Maintain consistent activity to show your ongoing commitment</li>
      </ul>
      <p><strong>Pro tip:</strong> Add links to your LinkedIn and GitHub profiles in your resume to create a cohesive personal brand.</p>
    `,

    // Interview Advice
    "careerAdvice.interview.title": "How to Prepare for a Job Interview",
    "careerAdvice.interview.shortDescription": "Questions, STAR technique",
    "careerAdvice.interview.fullDescription": `
      <h4>Master the Art of Persuasion</h4>
      <p>Interviews can be nerve-wracking, but proper preparation will help you shine:</p>
      <h5>Common Questions and How to Answer:</h5>
      <ul>
        <li><strong>"Tell me about yourself"</strong> - Prepare a concise 1-2 minute summary of your relevant experience and skills</li>
        <li><strong>"What are your strengths/weaknesses?"</strong> - Be honest but strategic, showing self-awareness and growth</li>
        <li><strong>"Why do you want to work here?"</strong> - Research the company thoroughly and connect their values to your goals</li>
      </ul>
      <h5>STAR Technique for Behavioral Questions:</h5>
      <p>Structure your answers with:</p>
      <ul>
        <li><strong>Situation:</strong> Set the context</li>
        <li><strong>Task:</strong> Explain your responsibility</li>
        <li><strong>Action:</strong> Describe what you did</li>
        <li><strong>Result:</strong> Share the outcome and what you learned</li>
      </ul>
      <p><strong>Don't forget:</strong> Prepare thoughtful questions to ask the interviewer, demonstrating your interest and research.</p>
    `,

    // Market Trends
    "careerAdvice.trends.title": "Job Market Trends and In-Demand Skills",
    "careerAdvice.trends.shortDescription": "Growing sectors, hot skills",
    "careerAdvice.trends.fullDescription": `
      <h4>Stay Ahead of the Market</h4>
      <p>Understanding current trends helps you focus your skill development in the right areas:</p>
      <h5>Growing Sectors (2025):</h5>
      <ul>
        <li><strong>Technology:</strong> AI/ML, cybersecurity, cloud computing</li>
        <li><strong>Healthcare:</strong> Telemedicine, health informatics, biotechnology</li>
        <li><strong>Green Energy:</strong> Renewable energy, sustainability, carbon management</li>
        <li><strong>Digital Marketing:</strong> Content creation, SEO, social media strategy</li>
      </ul>
      <h5>Most In-Demand Skills:</h5>
      <ul>
        <li><strong>Technical:</strong> Data analysis, programming (Python, JavaScript), AI/ML</li>
        <li><strong>Soft Skills:</strong> Communication, adaptability, problem-solving, teamwork</li>
        <li><strong>Business:</strong> Project management, digital literacy, critical thinking</li>
      </ul>
      <p><strong>How to acquire these skills:</strong> Consider online courses (Coursera, Udemy), bootcamps, personal projects, or volunteering for relevant tasks in your current role.</p>
    `,

    // Expert Advice
    "careerAdvice.experts.title": "HR and Recruiter Insights",
    "careerAdvice.experts.shortDescription": "Articles from recruitment professionals",
    "careerAdvice.experts.fullDescription": `
      <h4>Secrets from Recruitment Professionals</h4>
      <p>Learn directly from those who make hiring decisions:</p>
      <h5>Featured Articles:</h5>
      <ul>
        <li><strong>"What Recruiters Really Look for in a Resume"</strong> - by Sarah Johnson, Senior Recruiter at Tech Innovations Inc.</li>
        <li><strong>"Common Mistakes to Avoid in Your Application"</strong> - by Michael Chen, HR Director at Global Solutions</li>
        <li><strong>"How to Impress in the First 5 Minutes of an Interview"</strong> - by Priya Patel, Talent Acquisition Manager</li>
      </ul>
      <p>Our experts emphasize that authenticity, preparation, and clear communication are key factors in successful applications. They recommend tailoring your approach to each company's culture while highlighting your unique value proposition.</p>
      <p><strong>Expert tip:</strong> "Don't just tell us about your skills—show us how you've applied them to solve real problems." - James Wilson, Hiring Manager</p>
    `,

    // CTA Section
    "careerAdvice.cta.title": "Ready to Put This Advice into Action?",
    "careerAdvice.cta.description":
      "Upload your resume to our AI-powered platform and get personalized feedback to improve your chances of landing your dream job.",
    "careerAdvice.cta.button": "Improve Your Score Now",

    // Newsletter Section
    "careerAdvice.newsletter.title": "Stay Updated with Career Tips",
    "careerAdvice.newsletter.description":
      "Subscribe to our newsletter for the latest advice, industry insights, and job market trends.",
    "careerAdvice.newsletter.placeholder": "Your email address",
    "careerAdvice.newsletter.button": "Subscribe",

    // Company Reviews
    "companyReviews.title": "Find the Right Company for You",
    "companyReviews.searchPlaceholder": "Search for a company",
    "companyReviews.searchButton": "Search",
    "companyReviews.salaryLink": "Looking for salary information? Check our salary guide",
    "companyReviews.mostSearched": "Most Searched Companies",
    "companyReviews.reviews": "reviews",
    "companyReviews.salaries": "Salaries",
    "companyReviews.questions": "Interview Questions",
    "companyReviews.jobs": "Jobs",

    // Profile
    "profile.message": "Message",
    "profile.contact": "Contact",
    "profile.editProfile": "Edit Profile",
    "profile.contactInformation": "Contact Information",
    "profile.education": "Education",
    "profile.classOf": "Class of",
    "profile.languages": "Languages",
    "profile.languageLevel.native": "Native",
    "profile.languageLevel.fluent": "Fluent",
    "profile.languageLevel.intermediate": "Intermediate",
    "profile.languageLevel.basic": "Basic",
    "profile.socialLinks": "Social Links",
    "profile.portfolioWebsite": "Portfolio Website",
    "profile.skills": "Skills",
    "profile.certifications": "Certifications",
    "profile.projects": "Projects",
    "profile.viewProject": "View Project",
    "profile.experience": "Experience",
    "profile.visitWebsite": "Visit Website",
    "profile.companyDetails": "Company Details",
    "profile.foundedIn": "Founded in",
    "profile.benefitsAndPerks": "Benefits & Perks",
    "profile.connectWithUs": "Connect With Us",
    "profile.aboutUs": "About Us",
    "profile.openPositions": "Open Positions",
    "profile.applyNow": "Apply Now",
    "profile.posted": "Posted",
    "profile.companyCulture": "Company Culture",
    "profile.officeCulture": "Office Culture",
    "profile.teamBuilding": "Team Building",
  },
  fr: {
    // Header
    "nav.home": "Accueil",
    "nav.findJobs": "Trouver des emplois",
    "nav.companies": "Entreprises",
    "nav.resources": "Ressources",
    "nav.about": "À propos",
    "nav.aboutUs": "À propos de nous",
    "nav.signIn": "Se connecter",
    "nav.register": "S'inscrire",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",
    "nav.companyReviews": "Avis sur les entreprises",
    "nav.careerAdvice": "Conseils de carrière",
    "nav.profile": "Profil",
    "nav.logout": "Déconnexion",

    // Hero
    "hero.title": "Une candidature, des opportunités infinies",
    "hero.subtitle":
      "Mise en relation alimentée par l'IA qui vous connecte avec votre stage parfait. Postulez une fois, atteignez des centaines d'entreprises.",
    "hero.searchPlaceholder": "Titre du poste, mots-clés ou entreprise",
    "hero.searchButton": "Rechercher des emplois",

    // Features
    "features.title": "Pourquoi choisir ONE APPLY",
    "features.subtitle": "Des fonctionnalités intelligentes qui facilitent votre recherche d'emploi",
    "features.ai.title": "Correspondance par IA",
    "features.ai.description": "Notre IA analyse vos compétences et votre expérience pour trouver les emplois parfaits",
    "features.oneClick.title": "Candidature en un clic",
    "features.oneClick.description": "Postulez à plusieurs postes avec une seule candidature et un seul profil",
    "features.analytics.title": "Analyses intelligentes",
    "features.analytics.description":
      "Suivez l'état de votre candidature et obtenez des informations sur votre recherche d'emploi",

    // Stats
    "stats.activeJobs": "Emplois actifs",
    "stats.companies": "Entreprises",
    "stats.jobSeekers": "Chercheurs d'emploi",
    "stats.successRate": "Taux de réussite",

    // How it works
    "how.title": "Comment fonctionne ONE APPLY",
    "how.subtitle": "Trois étapes simples vers votre prochaine opportunité",
    "how.step1.title": "Créez votre profil",
    "how.step1.description": "Téléchargez votre CV ou créez votre profil avec nos outils faciles à utiliser",
    "how.step2.title": "Obtenez des correspondances",
    "how.step2.description": "Notre IA associe votre profil aux opportunités d'emploi pertinentes",
    "how.step3.title": "Postulez et suivez",
    "how.step3.description": "Postulez en un clic et suivez l'état de votre candidature en temps réel",

    // CTA
    "cta.title": "Prêt à commencer votre voyage?",
    "cta.subtitle": "Rejoignez des milliers de chercheurs d'emploi qui ont trouvé leur match parfait avec ONE APPLY",
    "cta.intern": "Je cherche un stage",
    "cta.company": "Je recrute des stagiaires",

    // Partners
    "partners.title": "Nos Partenaires",
    "partners.subtitle":
      "Nous collaborons avec des organisations de premier plan pour offrir les meilleures opportunités",

    // Testimonials
    "testimonials.title": "Ce que disent nos utilisateurs",
    "testimonials.subtitle": "Écoutez les étudiants qui ont trouvé leurs stages parfaits",
    "testimonials.previous": "Témoignage précédent",
    "testimonials.next": "Témoignage suivant",

    // Footer
    "footer.jobSeekers": "Pour les chercheurs d'emploi",
    "footer.employers": "Pour les employeurs",
    "footer.company": "Entreprise",
    "footer.copyright": "Tous droits réservés.",
    "footer.careerAdvice": "Conseils de carrière",
    "footer.salaryGuide": "Guide des salaires",
    "footer.privacyPolicy": "Politique de confidentialité",
    "footer.termsOfService": "Conditions d'utilisation",
    "footer.contact": "Contact",
    "footer.slogan": "Rendre la recherche d'emploi plus intelligente grâce à la mise en relation par IA",

    // Auth
    "auth.signIn": "Se connecter",
    "auth.signInButton": "Se connecter",
    "auth.dontHaveAccount": "Vous n'avez pas de compte ?",
    "auth.alreadyHaveAccount": "Vous avez déjà un compte ?",
    "auth.createAccount": "Créer un compte",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.rememberMe": "Se souvenir de moi",
    "auth.forgotPassword": "Mot de passe oublié ?",
    "auth.orContinueWith": "Ou continuer avec",
    "auth.google": "Google",
    auth: {
      loading: "Traitement de l'authentification...",
      success: "Authentification réussie !",
      error: {
        generic: "Erreur d'authentification",
        tokenMissing: "Le token JWT est manquant",
        tokenDecode: "Erreur lors du décodage du token",
      },
    },

    // Register
    "register.title": "Choisissez votre type d'inscription",
    "register.subtitle": "Sélectionnez l'option qui vous décrit le mieux",
    "register.intern.title": "Je suis un chercheur d'emploi",
    "register.intern.description": "Créez un compte pour trouver et postuler à des stages et des emplois",
    "register.intern.button": "S'inscrire comme chercheur d'emploi",
    "register.company.title": "Je suis un employeur",
    "register.company.description":
      "Créez un compte pour publier des offres d'emploi et trouver des candidats qualifiés",
    "register.company.button": "S'inscrire comme employeur",

    // Register Intern
    "registerIntern.title": "S'inscrire comme Stagiaire",
    "registerIntern.subtitle": "Créez un compte pour trouver et postuler à des stages",
    "registerIntern.firstName": "Prénom",
    "registerIntern.lastName": "Nom",
    "registerIntern.email": "Email",
    "registerIntern.password": "Mot de passe",
    "registerIntern.confirmPassword": "Confirmer le mot de passe",
    "registerIntern.birthDate": "Date de naissance",
    "registerIntern.phone": "Téléphone (optionnel)",
    "registerIntern.profileImage": "Photo de profil (optionnel)",
    "registerIntern.terms": "J'accepte les",
    "registerIntern.termsLink": "Conditions d'utilisation",
    "registerIntern.and": "et la",
    "registerIntern.privacyLink": "Politique de confidentialité",
    "registerIntern.createAccount": "Créer un compte",
    "registerIntern.creatingAccount": "Création du compte...",
    "registerIntern.passwordRequirements":
      "Le mot de passe doit contenir au moins 8 caractères, incluant majuscules, minuscules, chiffres et caractères spéciaux.",

    // Register Company
    "registerCompany.title": "S'inscrire comme Entreprise",
    "registerCompany.subtitle": "Créez un compte pour publier des stages et trouver des candidats",
    "registerCompany.companyName": "Nom de l'entreprise",
    "registerCompany.email": "Email",
    "registerCompany.password": "Mot de passe",
    "registerCompany.confirmPassword": "Confirmer le mot de passe",
    "registerCompany.address": "Adresse",
    "registerCompany.industryType": "Type d'industrie",
    "registerCompany.selectIndustry": "Sélectionnez une industrie",
    "registerCompany.website": "Site web (optionnel)",
    "registerCompany.phone": "Téléphone (optionnel)",
    "registerCompany.companyLogo": "Logo de l'entreprise (optionnel)",
    "registerCompany.terms": "J'accepte les",
    "registerCompany.termsLink": "Conditions d'utilisation",
    "registerIntern.and": "et la",
    "registerCompany.privacyLink": "Politique de confidentialité",
    "registerCompany.createAccount": "Créer un compte",
    "registerCompany.creatingAccount": "Création du compte...",
    "registerCompany.passwordRequirements":
      "Le mot de passe doit contenir au moins 8 caractères, incluant majuscules, minuscules, chiffres et caractères spéciaux.",

    // Career Advice
    "careerAdvice.title": "Boostez Votre Carrière avec des Conseils d'Experts",
    "careerAdvice.subtitle":
      "Des ressources pratiques pour améliorer votre employabilité et vous démarquer sur le marché du travail",
    "careerAdvice.card.readMore": "Lire Plus",
    "careerAdvice.card.readLess": "Lire Moins",

    // CV Advice
    "careerAdvice.cv.title": "Comment créer un CV attractif",
    "careerAdvice.cv.shortDescription": "Mise en page, mots-clés, exemples",
    "careerAdvice.cv.fullDescription": `
      <h4>Transformez votre CV en atout gagnant</h4>
      <p>Un CV bien conçu est votre ticket pour attirer l'attention des recruteurs. Voici quelques conseils clés :</p>
      <ul>
        <li><strong>Mise en page claire et professionnelle :</strong> Utilisez des polices lisibles (Arial, Calibri), un espacement cohérent et une structure logique.</li>
        <li><strong>Optimisation des mots-  un espacement cohérent et une structure logique.</li>
        <li><strong>Optimisation des mots-clés :</strong> Adaptez votre CV à chaque offre en incluant des mots-clés pertinents de la description du poste.</li>
        <li><strong>Quantifiez vos réalisations :</strong> Utilisez des chiffres et des métriques pour démontrer votre impact (ex. : "Augmentation des ventes de 20%").</li>
        <li><strong>Relisez attentivement :</strong> Éliminez les fautes d'orthographe et de grammaire qui peuvent donner une mauvaise impression.</li>
      </ul>
      <p><strong>Astuce bonus :</strong> Incluez des projets personnels ou des certifications pour mettre en valeur votre initiative et votre apprentissage continu.</p>
    `,

    // Profile Advice
    "careerAdvice.profile.title": "Optimiser son profil LinkedIn et GitHub",
    "careerAdvice.profile.shortDescription": "Visibilité et organisation",
    "careerAdvice.profile.fullDescription": `
      <h4>Devenez visible pour les recruteurs</h4>
      <p>Votre présence en ligne est cruciale sur le marché du travail actuel. Voici comment l'optimiser :</p>
      <h5>LinkedIn :</h5>
      <ul>
        <li>Créez un titre accrocheur qui inclut votre expertise et vos aspirations</li>
        <li>Rédigez une bio concise mais percutante mettant en avant vos compétences et votre expérience</li>
        <li>Utilisez stratégiquement la section Compétences, en priorisant celles les plus pertinentes pour vos postes cibles</li>
        <li>Demandez des recommandations à vos collègues et superviseurs</li>
      </ul>
      <h5>GitHub :</h5>
      <ul>
        <li>Organisez vos repositories avec des noms clairs et descriptifs</li>
        <li>Créez des fichiers README détaillés expliquant l'objectif et les technologies utilisées dans vos projets</li>
        <li>Épinglez vos projets les plus impressionnants en haut de votre profil</li>
        <li>Maintenez une activité constante pour montrer votre engagement continu</li>
      </ul>
      <p><strong>Conseil pro :</strong> Ajoutez des liens vers vos profils LinkedIn et GitHub dans votre CV pour créer une marque personnelle cohérente.</p>
    `,

    // Interview Advice
    "careerAdvice.interview.title": "Comment préparer un entretien d'embauche",
    "careerAdvice.interview.shortDescription": "Questions, technique STAR",
    "careerAdvice.interview.fullDescription": `
      <h4>Maîtrisez l'art de convaincre</h4>
      <p>Les entretiens peuvent être stressants, mais une bonne préparation vous aidera à briller :</p>
      <h5>Questions courantes et comment y répondre :</h5>
      <ul>
        <li><strong>"Parlez-moi de vous"</strong> - Préparez un résumé concis de 1-2 minutes de votre expérience et compétences pertinentes</li>
        <li><strong>"Quelles sont vos forces/faiblesses ?"</strong> - Soyez honnête mais stratégique, montrant conscience de soi et croissance</li>
        <li><strong>"Pourquoi voulez-vous travailler ici ?"</strong> - Recherchez l'entreprise en profondeur et reliez leurs valeurs à vos objectifs</li>
      </ul>
      <h5>Technique STAR pour les questions comportementales :</h5>
      <p>Structurez vos réponses avec :</p>
      <ul>
        <li><strong>Situation :</strong> Établissez le contexte</li>
        <li><strong>Tâche :</strong> Expliquez votre responsabilité</li>
        <li><strong>Action :</strong> Décrivez ce que vous avez fait</li>
        <li><strong>Résultat :</strong> Partagez le résultat et ce que vous avez appris</li>
      </ul>
      <p><strong>N'oubliez pas :</strong> Préparez des questions réfléchies à poser à l'intervieweur, démontrant votre intérêt et vos recherches.</p>
    `,

    // Market Trends
    "careerAdvice.trends.title": "Tendances du marché du travail et compétences recherchées",
    "careerAdvice.trends.shortDescription": "Secteurs en croissance, compétences prisées",
    "careerAdvice.trends.fullDescription": `
      <h4>Restez en avance sur le marché</h4>
      <p>Comprendre les tendances actuelles vous aide à orienter votre développement de compétences dans les bonnes directions :</p>
      <h5>Secteurs en croissance (2025) :</h5>
      <ul>
        <li><strong>Technologie :</strong> IA/ML, cybersécurité, cloud computing</li>
        <li><strong>Santé :</strong> Télémédecine, informatique de santé, biotechnologie</li>
        <li><strong>Énergie verte :</strong> Énergies renouvelables, durabilité, gestion carbone</li>
        <li><strong>Marketing digital :</strong> Création de contenu, SEO, stratégie de médias sociaux</li>
      </ul>
      <h5>Compétences les plus demandées :</h5>
      <ul>
        <li><strong>Techniques :</strong> Analyse de données, programmation (Python, JavaScript), IA/ML</li>
        <li><strong>Soft Skills :</strong> Communication, adaptabilité, résolution de problèmes, travail d'équipe</li>
        <li><strong>Business :</strong> Gestion de projet, littératie numérique, pensée critique</li>
      </ul>
      <p><strong>Comment acquérir ces compétences :</strong> Envisagez des cours en ligne (Coursera, Udemy), des bootcamps, des projets personnels, ou du volontariat pour des tâches pertinentes dans votre rôle actuel.</p>
    `,

    // Expert Advice
    "careerAdvice.experts.title": "Conseils d'experts RH et recruteurs",
    "careerAdvice.experts.shortDescription": "Articles de professionnels du recrutement",
    "careerAdvice.experts.fullDescription": `
      <h4>Les secrets des professionnels du recrutement</h4>
      <p>Apprenez directement de ceux qui prennent les décisions d'embauche :</p>
      <h5>Articles en vedette :</h5>
      <ul>
        <li><strong>"Ce que les recruteurs regardent vraiment dans un CV"</strong> - par Sarah Johnson, Recruteuse Senior chez Tech Innovations Inc.</li>
        <li><strong>"Erreurs courantes à éviter dans votre candidature"</strong> - par Michael Chen, Directeur RH chez Global Solutions</li>
        <li><strong>"Comment impressionner dans les 5 premières minutes d'un entretien"</strong> - par Priya Patel, Responsable Acquisition de Talents</li>
      </ul>
      <p>Nos experts soulignent que l'authenticité, la préparation et une communication claire sont des facteurs clés dans les candidatures réussies. Ils recommandent d'adapter votre approche à la culture de chaque entreprise tout en mettant en avant votre proposition de valeur unique.</p>
      <p><strong>Conseil d'expert :</strong> "Ne nous parlez pas seulement de vos compétences—montrez-nous comment vous les avez appliquées pour résoudre de vrais problèmes." - James Wilson, Responsable du Recrutement</p>
    `,

    // CTA Section
    "careerAdvice.cta.title": "Prêt à mettre ces conseils en pratique ?",
    "careerAdvice.cta.description":
      "Téléchargez votre CV sur notre plateforme alimentée par l'IA et obtenez des commentaires personnalisés pour améliorer vos chances de décrocher l'emploi de vos rêves.",
    "careerAdvice.cta.button": "Améliorez votre score maintenant",

    // Newsletter Section
    "careerAdvice.newsletter.title": "Restez informé des conseils de carrière",
    "careerAdvice.newsletter.description":
      "Abonnez-vous à notre newsletter pour les derniers conseils, analyses sectorielles et tendances du marché du travail.",
    "careerAdvice.newsletter.placeholder": "Votre adresse email",
    "careerAdvice.newsletter.button": "S'abonner",

    // Company Reviews
    "companyReviews.title": "Trouvez l'entreprise qui vous convient",
    "companyReviews.searchPlaceholder": "Rechercher une entreprise",
    "companyReviews.searchButton": "Rechercher",
    "companyReviews.salaryLink": "Vous cherchez des informations sur les salaires ? Consultez notre guide des salaires",
    "companyReviews.mostSearched": "Entreprises les plus recherchées",
    "companyReviews.reviews": "avis",
    "companyReviews.salaries": "Salaires",
    "companyReviews.questions": "Questions d'entretien",
    "companyReviews.jobs": "Emplois",

    // Profile
    "profile.message": "Message",
    "profile.contact": "Contact",
    "profile.editProfile": "Modifier le profil",
    "profile.contactInformation": "Coordonnées",
    "profile.education": "Formation",
    "profile.classOf": "Promotion",
    "profile.languages": "Langues",
    "profile.languageLevel.native": "Natif",
    "profile.languageLevel.fluent": "Courant",
    "profile.languageLevel.intermediate": "Intermédiaire",
    "profile.languageLevel.basic": "Notions",
    "profile.socialLinks": "Réseaux sociaux",
    "profile.portfolioWebsite": "Site web personnel",
    "profile.skills": "Compétences",
    "profile.certifications": "Certifications",
    "profile.projects": "Projets",
    "profile.viewProject": "Voir le projet",
    "profile.experience": "Expérience",
    "profile.visitWebsite": "Visiter le site",
    "profile.companyDetails": "Détails de l'entreprise",
    "profile.foundedIn": "Fondée en",
    "profile.benefitsAndPerks": "Avantages et bénéfices",
    "profile.connectWithUs": "Connectez-vous avec nous",
    "profile.aboutUs": "À propos de nous",
    "profile.openPositions": "Postes ouverts",
    "profile.applyNow": "Postuler maintenant",
    "profile.posted": "Publié",
    "profile.companyCulture": "Culture d'entreprise",
    "profile.officeCulture": "Culture de bureau",
    "profile.teamBuilding": "Renforcement d'équipe",
  },
  ar: {
    // Header
    "nav.home": "الرئيسية",
    "nav.findJobs": "البحث عن وظائف",
    "nav.companies": "الشركات",
    "nav.resources": "الموارد",
    "nav.about": "حول",
    "nav.aboutUs": "من نحن",
    "nav.signIn": "تسجيل الدخول",
    "nav.register": "التسجيل",
    "nav.contact": "اتصل بنا",
    "nav.faq": "الأسئلة الشائعة",
    "nav.companyReviews": "تقييمات الشركات",
    "nav.careerAdvice": "نصائح مهنية",
    "nav.profile": "الملف الشخصي",
    "nav.logout": "تسجيل الخروج",

    // Hero
    "hero.title": "طلب واحد، فرص لا نهاية لها",
    "hero.subtitle":
      "مطابقة الوظائف المدعومة بالذكاء الاصطناعي التي تربطك بتدريبك المثالي. قدم طلبًا واحدًا، وصل إلى مئات الشركات.",
    "hero.searchPlaceholder": "عنوان الوظيفة، الكلمات الرئيسية، أو الشركة",
    "hero.searchButton": "البحث عن وظائف",

    // Features
    "features.title": "لماذا تختار ONE APPLY",
    "features.subtitle": "ميزات ذكية تجعل بحثك عن وظيفة أسهل وأكثر فعالية",
    "features.ai.title": "مطابقة بالذكاء الاصطناعي",
    "features.ai.description": "يحلل الذكاء الاصطناعي لدينا مهاراتك وخبرتك للعثور على الوظائف المثالية",
    "features.oneClick.title": "تقديم بنقرة واحدة",
    "features.oneClick.description": "قدم طلبًا للعديد من المناصب بطلب واحد وملف تعريف واحد",
    "features.analytics.title": "تحليلات ذكية",
    "features.analytics.description": "تتبع حالة طلبك واحصل على رؤى حول بحثك عن وظيفة",

    // Stats
    "stats.activeJobs": "وظائف نشطة",
    "stats.companies": "شركات",
    "stats.jobSeekers": "باحثون عن عمل",
    "stats.successRate": "معدل النجاح",

    // How it works
    "how.title": "كيف يعمل ONE APPLY",
    "how.subtitle": "ثلاث خطوات بسيطة إلى فرصتك التالية",
    "how.step1.title": "أنشئ ملفك الشخصي",
    "how.step1.description": "قم بتحميل سيرتك الذاتية أو بناء ملفك الشخصي باستخدام أدواتنا سهلة الاستخدام",
    "how.step2.title": "احصل على مطابقات",
    "how.step2.description": "يطابق الذكاء الاصطناعي لدينا ملفك الشخصي مع فرص العمل ذات الصلة",
    "how.step3.title": "قدم وتتبع",
    "how.step3.description": "قدم بنقرة واحدة وتتبع حالة طلبك في الوقت الفعلي",

    // CTA
    "cta.title": "هل أنت مستعد لبدء رحلتك؟",
    "cta.subtitle": "انضم إلى آلاف الباحثين عن عمل الذين وجدوا مطابقتهم المثالية مع ONE APPLY",
    "cta.intern": "أبحث عن تدريب",
    "cta.company": "أقوم بتوظيف متدربين",

    // Partners
    "partners.title": "شركاؤنا",
    "partners.subtitle": "نتعاون مع منظمات رائدة لتقديم أفضل الفرص",

    // Testimonials
    "testimonials.title": "ماذا يقول مستخدمونا",
    "testimonials.subtitle": "اسمع من الطلاب الذين وجدوا تدريباتهم المثالية",
    "testimonials.previous": "الشهادة السابقة",
    "testimonials.next": "الشهادة التالية",

    // Footer
    "footer.jobSeekers": "للباحثين عن عمل",
    "footer.employers": "لأصحاب العمل",
    "footer.company": "الشركة",
    "footer.copyright": "جميع الحقوق محفوظة.",
    "footer.careerAdvice": "نصائح مهنية",
    "footer.salaryGuide": "دليل الرواتب",
    "footer.privacyPolicy": "سياسة الخصوصية",
    "footer.termsOfService": "شروط الخدمة",
    "footer.contact": "اتصل بنا",
    "footer.slogan": "جعل البحث عن وظيفة أكثر ذكاءً من خلال المطابقة بالذكاء الاصطناعي",

    // Auth
    "auth.signIn": "تسجيل الدخول",
    "auth.signInButton": "تسجيل الدخول",
    "auth.dontHaveAccount": "ليس لديك حساب؟",
    "auth.alreadyHaveAccount": "لديك حساب بالفعل؟",
    "auth.createAccount": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.rememberMe": "تذكرني",
    "auth.forgotPassword": "نسيت كلمة المرور؟",
    "auth.orContinueWith": "أو تابع باستخدام",
    "auth.google": "جوجل",
    auth: {
      loading: "معالجة المصادقة...",
      success: "تمت المصادقة بنجاح!",
      error: {
        generic: "خطأ في المصادقة",
        tokenMissing: "رمز JWT مفقود",
        tokenDecode: "خطأ في فك تشفير الرمز",
      },
    },

    // Register
    "register.title": "اختر نوع التسجيل",
    "register.subtitle": "حدد الخيار الذي يصفك بشكل أفضل",
    "register.intern.title": "أنا باحث عن عمل",
    "register.intern.description": "أنشئ حسابًا للعثور على تدريبات ووظائف والتقدم لها",
    "register.intern.button": "التسجيل كباحث عن عمل",
    "register.company.title": "أنا صاحب عمل",
    "register.company.description": "أنشئ حسابًا لنشر الوظائف والعثور على مرشحين مؤهلين",
    "register.company.button": "التسجيل كصاحب عمل",

    // Register Intern
    "registerIntern.title": "التسجيل كمتدرب",
    "registerIntern.subtitle": "أنشئ حسابًا للعثور على تدريبات والتقدم لها",
    "registerIntern.firstName": "الاسم الأول",
    "registerIntern.lastName": "اسم العائلة",
    "registerIntern.email": "البريد الإلكتروني",
    "registerIntern.password": "كلمة المرور",
    "registerIntern.confirmPassword": "تأكيد كلمة المرور",
    "registerIntern.birthDate": "تاريخ الميلاد",
    "registerIntern.phone": "الهاتف (اختياري)",
    "registerIntern.profileImage": "صورة الملف الشخصي (اختياري)",
    "registerIntern.terms": "أوافق على",
    "registerIntern.termsLink": "شروط الخدمة",
    "registerIntern.and": "و",
    "registerIntern.privacyLink": "سياسة الخصوصية",
    "registerIntern.createAccount": "إنشاء حساب",
    "registerIntern.creatingAccount": "جاري إنشاء الحساب...",
    "registerIntern.passwordRequirements":
      "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وتتضمن أحرفًا كبيرة وصغيرة وأرقامًا ورموزًا خاصة.",

    // Register Company
    "registerCompany.title": "التسجيل كشركة",
    "registerCompany.subtitle": "أنشئ حسابًا لنشر فرص التدريب والعثور على مرشحين",
    "registerCompany.companyName": "اسم الشركة",
    "registerCompany.email": "البريد الإلكتروني",
    "registerCompany.password": "كلمة المرور",
    "registerCompany.confirmPassword": "تأكيد كلمة المرور",
    "registerCompany.address": "العنوان",
    "registerCompany.industryType": "نوع الصناعة",
    "registerCompany.selectIndustry": "اختر صناعة",
    "registerCompany.website": "الموقع الإلكتروني (اختياري)",
    "registerCompany.phone": "الهاتف (اختياري)",
    "registerCompany.companyLogo": "شعار الشركة (اختياري)",
    "registerCompany.terms": "أوافق على",
    "registerCompany.termsLink": "شروط الخدمة",
    "registerIntern.and": "و",
    "registerCompany.privacyLink": "سياسة الخصوصية",
    "registerCompany.createAccount": "إنشاء حساب",
    "registerCompany.creatingAccount": "جاري إنشاء الحساب...",
    "registerCompany.passwordRequirements":
      "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وتتضمن أحرفًا كبيرة وصغيرة وأرقامًا ورموزًا خاصة.",

    // Career Advice
    "careerAdvice.title": "عزز مسيرتك المهنية بنصائح الخبراء",
    "careerAdvice.subtitle": "موارد عملية لتحسين فرص توظيفك والتميز في سوق العمل",
    "careerAdvice.card.readMore": "اقرأ المزيد",
    "careerAdvice.card.readLess": "اقرأ أقل",

    // CV Advice
    "careerAdvice.cv.title": "كيفية إنشاء سيرة ذاتية جذابة",
    "careerAdvice.cv.shortDescription": "التنسيق، الكلمات المفتاحية، الأمثلة",
    "careerAdvice.cv.fullDescription": `
      <h4>حول سيرتك الذاتية إلى أصل رابح</h4>
      <p>السيرة الذاتية المصممة جيدًا هي تذكرتك للفت انتباه المجندين. إليك بعض النصائح الرئيسية:</p>
      <ul>
        <li><strong>تخطيط واضح ومهني:</strong> استخدم خطوطًا نظيفة (Arial، Calibri)، تباعدًا متسقًا، وهيكلًا منطقيًا.</li>
        <li><strong>تحسين الكلمات المفتاحية:</strong> قم بتكييف سيرتك الذاتية مع كل وظيفة من خلال تضمين كلمات مفتاحية ذات صلة من وصف الوظيفة.</li>
        <li><strong>قم بتحديد إنجازاتك كميًا:</strong> استخدم الأرقام والمقاييس لإظهار تأثيرك (مثل "زيادة المبيعات بنسبة 20٪").</li>
        <li><strong>تدقيق شامل:</strong> تخلص من أخطاء الإملاء والنحو التي يمكن أن تعطي انطباعًا سيئًا.</li>
      </ul>
      <p><strong>نصيحة إضافية:</strong> قم بتضمين مشاريع شخصية أو شهادات لإظهار مبادرتك وتعلمك المستمر.</p>
    `,

    // Profile Advice
    "careerAdvice.profile.title": "تحسين ملفك الشخصي على LinkedIn وGitHub",
    "careerAdvice.profile.shortDescription": "الظهور والتنظيم",
    "careerAdvice.profile.fullDescription": `
      <h4>كن مرئيًا للمجندين</h4>
      <p>وجودك على الإنترنت أمر بالغ الأهمية في سوق العمل اليوم. إليك كيفية تحسينه:</p>
      <h5>LinkedIn:</h5>
      <ul>
        <li>قم بإنشاء عنوان جذاب يتضمن خبرتك وطموحاتك</li>
        <li>اكتب سيرة ذاتية موجزة ولكن مؤثرة تسلط الضوء على مهاراتك وخبرتك</li>
        <li>استخدم قسم المهارات بشكل استراتيجي، مع إعطاء الأولوية للمهارات الأكثر صلة بالأدوار المستهدفة</li>
        <li>اطلب توصيات من زملائك ومشرفيك</li>
      </ul>
      <h5>GitHub:</h5>
      <ul>
        <li>نظم مستودعاتك بأسماء واضحة ووصفية</li>
        <li>قم بإنشاء ملفات README مفصلة تشرح الغرض من مشاريعك والتقنيات المستخدمة</li>
        <li>ثبت مشاريعك الأكثر إثارة للإعجاب في أعلى ملفك الشخصي</li>
        <li>حافظ على نشاط مستمر لإظهار التزامك المستمر</li>
      </ul>
      <p><strong>نصيحة احترافية:</strong> أضف روابط إلى ملفاتك الشخصية على LinkedIn وGitHub في سيرتك الذاتية لإنشاء علامة شخصية متماسكة.</p>
    `,

    // Interview Advice
    "careerAdvice.interview.title": "كيفية التحضير لمقابلة عمل",
    "careerAdvice.interview.shortDescription": "الأسئلة، تقنية STAR",
    "careerAdvice.interview.fullDescription": `
      <h4>أتقن فن الإقناع</h4>
      <p>يمكن أن تكون المقابلات مرهقة للأعصاب، لكن الإعداد المناسب سيساعدك على التألق:</p>
      <h5>الأسئلة الشائعة وكيفية الإجابة عليها:</h5>
      <ul>
        <li><strong>"أخبرني عن نفسك"</strong> - قم بإعداد ملخص موجز من 1-2 دقيقة عن خبرتك ومهاراتك ذات الصلة</li>
        <li><strong>"ما هي نقاط قوتك/ضعفك؟"</strong> - كن صادقًا ولكن استراتيجيًا، مظهرًا الوعي الذاتي والنمو</li>
        <li><strong>"لماذا تريد العمل هنا؟"</strong> - ابحث عن الشركة بعمق واربط قيمها بأهدافك</li>
      </ul>
      <h5>تقنية STAR للأسئلة السلوكية:</h5>
      <p>قم بهيكلة إجاباتك باستخدام:</p>
      <ul>
        <li><strong>الموقف (Situation):</strong> حدد السياق</li>
        <li><strong>المهمة (Task):</strong> اشرح مسؤوليتك</li>
        <li><strong>الإجراء (Action):</strong> صف ما فعلته</li>
        <li><strong>النتيجة (Result):</strong> شارك النتيجة وما تعلمته</li>
      </ul>
      <p><strong>لا تنس:</strong> قم بإعداد أسئلة مدروسة لطرحها على المحاور، مما يدل على اهتمامك وبحثك.</p>
    `,

    // Market Trends
    "careerAdvice.trends.title": "اتجاهات سوق العمل والمهارات المطلوبة",
    "careerAdvice.trends.shortDescription": "القطاعات النامية، المهارات الساخنة",
    "careerAdvice.trends.fullDescription": `
      <h4>ابق متقدمًا على السوق</h4>
      <p>فهم الاتجاهات الحالية يساعدك على توجيه تطوير مهاراتك في الاتجاهات الصحيحة:</p>
      <h5>القطاعات النامية (2025):</h5>
      <ul>
        <li><strong>التكنولوجيا:</strong> الذكاء الاصطناعي/التعلم الآلي، الأمن السيبراني، الحوسبة السحابية</li>
        <li><strong>الرعاية الصحية:</strong> الطب عن بعد، المعلوماتية الصحية، التكنولوجيا الحيوية</li>
        <li><strong>الطاقة الخضراء:</strong> الطاقة المتجددة، الاستدامة، إدارة الكربون</li>
        <li><strong>التسويق الرقمي:</strong> إنشاء المحتوى، تحسين محركات البحث، استراتيجية وسائل التواصل الاجتماعي</li>
      </ul>
      <h5>المهارات الأكثر طلبًا:</h5>
      <ul>
        <li><strong>التقنية:</strong> تحليل البيانات، البرمجة (Python، JavaScript)، الذكاء الاصطناعي/التعلم الآلي</li>
        <li><strong>المهارات الشخصية:</strong> التواصل، القدرة على التكيف، حل المشكلات، العمل الجماعي</li>
        <li><strong>الأعمال:</strong> إدارة المشاريع، المعرفة الرقمية، التفكير النقدي</li>
      </ul>
      <p><strong>كيفية اكتساب هذه المهارات:</strong> فكر في الدورات عبر الإنترنت (Coursera، Udemy)، المعسكرات التدريبية، المشاريع الشخصية، أو التطوع للمهام ذات الصلة في دورك الحالي.</p>
    `,

    // Expert Advice
    "careerAdvice.experts.title": "رؤى خبراء الموارد البشرية والتوظيف",
    "careerAdvice.experts.shortDescription": "مقالات من محترفي التوظيف",
    "careerAdvice.experts.fullDescription": `
      <h4>أسرار من محترفي التوظيف</h4>
      <p>تعلم مباشرة من أولئك الذين يتخذون قرارات التوظيف:</p>
      <h5>مقالات مميزة:</h5>
      <ul>
        <li><strong>"ما الذي يبحث عنه المجندون حقًا في السيرة الذاتية"</strong> - بقلم سارة جونسون، مجندة أولى في Tech Innovations Inc.</li>
        <li><strong>"الأخطاء الشائعة التي يجب تجنبها في طلبك"</strong> - بقلم مايكل تشين، مدير الموارد البشرية في Global Solutions</li>
        <li><strong>"كيفية إحداث انطباع في الدقائق الخمس الأولى من المقابلة"</strong> - بقلم بريا باتيل، مديرة اكتساب المواهب</li>
      </ul>
      <p>يؤكد خبراؤنا أن الأصالة والإعداد والتواصل الواضح هي عوامل رئيسية في الطلبات الناجحة. يوصون بتكييف نهجك مع ثقافة كل شركة مع إبراز عرض القيمة الفريد الخاص بك.</p>
      <p><strong>نصيحة خبير:</strong> "لا تخبرنا فقط عن مهاراتك—أرنا كيف طبقتها لحل مشاكل حقيقية." - جيمس ويلسون، مدير التوظيف</p>
    `,

    // CTA Section
    "careerAdvice.cta.title": "هل أنت جاهز لتطبيق هذه النصائح؟",
    "careerAdvice.cta.description":
      "قم بتحميل سيرتك الذاتية على منصتنا المدعومة بالذكاء الاصطناعي واحصل على ملاحظات مخصصة لتحسين فرصك في الحصول على وظيفة أحلامك.",
    "careerAdvice.cta.button": "حسّن درجتك الآن",

    // Newsletter Section
    "careerAdvice.newsletter.title": "ابق على اطلاع بنصائح المهنة",
    "careerAdvice.newsletter.description":
      "اشترك في نشرتنا الإخبارية للحصول على أحدث النصائح ورؤى الصناعة واتجاهات سوق العمل.",
    "careerAdvice.newsletter.placeholder": "عنوان بريدك الإلكتروني",
    "careerAdvice.newsletter.button": "اشترك",

    // Company Reviews
    "companyReviews.title": "ابحث عن الشركة المناسبة لك",
    "companyReviews.searchPlaceholder": "ابحث عن شركة",
    "companyReviews.searchButton": "بحث",
    "companyReviews.salaryLink": "تبحث عن معلومات الرواتب؟ تحقق من دليل الرواتب لدينا",
    "companyReviews.mostSearched": "الشركات الأكثر بحثًا",
    "companyReviews.reviews": "تقييمات",
    "companyReviews.salaries": "الرواتب",
    "companyReviews.questions": "أسئلة المقابلة",
    "companyReviews.jobs": "الوظائف",

    // Profile
    "profile.message": "رسالة",
    "profile.contact": "اتصال",
    "profile.editProfile": "تعديل الملف الشخصي",
    "profile.contactInformation": "معلومات الاتصال",
    "profile.education": "التعليم",
    "profile.classOf": "دفعة",
    "profile.languages": "اللغات",
    "profile.languageLevel.native": "اللغة الأم",
    "profile.languageLevel.fluent": "متقن",
    "profile.languageLevel.intermediate": "متوسط",
    "profile.languageLevel.basic": "مبتدئ",
    "profile.socialLinks": "روابط التواصل الاجتماعي",
    "profile.portfolioWebsite": "موقع المحفظة",
    "profile.skills": "المهارات",
    "profile.certifications": "الشهادات",
    "profile.projects": "المشاريع",
    "profile.viewProject": "عرض المشروع",
    "profile.experience": "الخبرة",
    "profile.visitWebsite": "زيارة الموقع",
    "profile.companyDetails": "تفاصيل الشركة",
    "profile.foundedIn": "تأسست في",
    "profile.benefitsAndPerks": "المزايا والفوائد",
    "profile.connectWithUs": "تواصل معنا",
    "profile.aboutUs": "من نحن",
    "profile.openPositions": "الوظائف المتاحة",
    "profile.applyNow": "تقدم الآن",
    "profile.posted": "نُشر",
    "profile.companyCulture": "ثقافة الشركة",
    "profile.officeCulture": "ثقافة المكتب",
    "profile.teamBuilding": "بناء الفريق",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en", // Langue par défaut: anglais
  setLanguage: () => {},
  t: (key: string) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialiser avec la langue par défaut (anglais)
  const [language, setLanguage] = useState<Language>("en")

  // Effet pour définir la direction RTL pour l'arabe et stocker la langue dans localStorage
  useEffect(() => {
    // Set RTL direction for Arabic
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

    // Store the selected language in localStorage
    localStorage.setItem("language", language)

    // Déclencher un événement personnalisé pour informer les autres composants du changement de langue
    const event = new CustomEvent("languageChange", { detail: { language } })
    window.dispatchEvent(event)
  }, [language])

  // Effet pour récupérer la langue stockée au chargement initial
  useEffect(() => {
    // Get the stored language on initial load
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && ["en", "fr", "ar"].includes(storedLanguage)) {
      setLanguage(storedLanguage)
    }
  }, [])

  // Fonction de traduction
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

