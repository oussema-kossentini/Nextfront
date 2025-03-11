"use client"

// Configuration de l'authentification Google
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
// L'URI de redirection doit pointer vers le backend sur le port 3000
const REDIRECT_URI = "http://localhost:3000/auth/oauth2-redirect"

// Classe pour gérer l'authentification Google
export class GoogleAuthService {
  // Générer l'URL d'authentification Google
  static getAuthUrl() {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: "email profile openid",
      access_type: "offline",
      prompt: "consent",
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  // Méthode pour initier le processus de connexion
  static login() {
    // Ouvrir la fenêtre d'authentification Google
    window.location.href = this.getAuthUrl()
  }

  // Méthode pour traiter le token JWT reçu
  static handleAuthToken(token: string) {
    try {
      // Stocker le token JWT dans localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("isAuthenticated", "true")

      // Décoder le token JWT pour obtenir les informations utilisateur
      // Note: Dans une application réelle, vous devriez utiliser une bibliothèque comme jwt-decode
      // Ici, nous simulons simplement la récupération des informations utilisateur
      const mockUser = {
        id: "google-user-123",
        email: "user@example.com",
        firstName: "Google",
        lastName: "User",
        role: "intern", // ou "company" selon le token décodé
      }

      // Stocker les informations de l'utilisateur dans localStorage
      localStorage.setItem("user", JSON.stringify(mockUser))

      return {
        success: true,
        user: mockUser,
      }
    } catch (error) {
      console.error("Erreur lors du traitement du token:", error)
      return {
        success: false,
        error: "Échec du traitement du token",
      }
    }
  }
}

