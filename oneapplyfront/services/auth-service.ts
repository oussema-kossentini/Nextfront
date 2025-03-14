import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Ton backend NestJS

class AuthService {
/*  async login(email: string, password: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ indispensable pour gérer les cookies (déjà présent, bien !)
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
      }

      localStorage.setItem("isAuthenticated", "true");

      window.dispatchEvent(new Event("storage"));

    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  */
  async login(email: string, password: string) {
    const response = await axios.post("http://localhost:3001/auth/login", { email, password }, {
      withCredentials: true // Important pour gérer les cookies si le token est envoyé via cookie
    });
    return response.data; // Doit retourner { message: "Log in successfully!", token?: string }
  }
 /* async login(email: string, password: string) {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("isAuthenticated", "true");
      const data = await response.json();
      console.log("🔍 Réponse de login:", data); // ✅ Vérifier ce que login retourne
      return data;

    } catch (error) {
      console.error("❌ Erreur de connexion:", error);
      throw error;
    }
  }
*/
  async sendOtp(email: string) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/send-otp1`, { email });
      console.log("✅ OTP envoyé avec succès :", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erreur lors de l'envoi de l'OTP :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de l'envoi de l'OTP.");
    }
  }

  async registerIntern(internData: any) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register-intern`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(internData),
      });
      localStorage.setItem("isAuthenticated", "true");
     // localStorage.setItem("userRole", response.role);


      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }
  async registerCompany(companyData: any) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register-company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });
      localStorage.setItem("isAuthenticated", "true");

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === 'Email already exists') {
          throw new Error('Email already exists');
        } else {
          throw new Error('Registration failed');
        }
      }

      const data = await response.json();
      //localStorage.setItem("isAuthenticated", "true");

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }


  async getUserInfo() {
    try {
      console.log("🔍 Vérification du token dans les cookies...");
      const token = this.getAuthToken();
      if (!token) {
        console.warn("⚠️ Aucun token trouvé dans les cookies.");
        return null;
      }

      console.log("✅ Récupération des informations utilisateur via /auth/me...");
      const response = await fetch("http://localhost:3000/auth/me", {
        method: "GET",
        credentials: "include", // ✅ Envoie bien le cookie `authToken`
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("❌ Erreur lors de la récupération des infos utilisateur.");
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Erreur dans getUserInfo:", error);
      return null;
    }
  }

  getAuthToken() {
    const match = document.cookie.match(new RegExp('(^| )authToken=([^;]+)'));
    return match ? match[2] : null;
  }

  async logout() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.clear();
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // ✅ Supprime le cookie d'auth côté serveur
      });

      window.dispatchEvent(new Event("storage")); // ✅ Notifie le front que l'utilisateur est déconnecté
      window.location.href = "/sign-in"; // ✅ Redirige l'utilisateur après déconnexion
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  /*async isAuthenticated() {

    try {
      const userInfo = await this.getUserInfo(); // ✅ Vérifie si l'utilisateur est connecté via `/auth/me`
      return !!userInfo; // ✅ Retourne true si `userInfo` existe
    } catch {
      return false;
    }
  }*/
  async isAuthenticated() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated === "true";
  }
  async getUserRole() {
    return localStorage.getItem("userRole") || null;
  }

  initiateGoogleLogin() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:3001/oauth2-redirect"; // Correspond à ton backend
    const scope = "email profile openid";

    if (!clientId) {
      console.error("Google OAuth client ID is missing");
      return;
    }

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=code&scope=${scope}&prompt=select_account`;

    window.location.href = googleAuthUrl; // ✅ Redirection vers Google
  }
  async exchangeCodeForToken(code: string) {
    try {
      console.log("🔍 Exchanging code for token...");
      const response = await fetch(`${BASE_URL}/auth/exchange-code?code=${encodeURIComponent(code)}`, {
        method: "GET",
        credentials: "include",
      });

      console.log("✅ Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Failed to exchange code:", errorText);
        throw new Error(`Failed to exchange code: ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Code exchanged successfully, response:", data);
      window.dispatchEvent(new Event("storage")); // ✅ Met à jour l'état de l'authentification
      return data;
    } catch (error) {
      console.error("❌ Error exchanging code for token:", error);
      throw error;
    }
  }



}

export const authService = new AuthService();
