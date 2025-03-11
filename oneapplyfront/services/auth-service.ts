const BASE_URL = "http://localhost:3000"; // Ton backend NestJS

class AuthService {
  async login(email: string, password: string) {
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

      const data = await response.json();

      // Ajoute explicitement la mise à jour locale du login
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", data.user.role);
      window.dispatchEvent(new Event("storage"));

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }


  async registerIntern(internData: any) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register-intern`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Envoie les cookies
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //hot el cookies
        body: JSON.stringify(companyData),
      });
      localStorage.setItem("isAuthenticated", "true");



      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return await response.json();
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
  /*async getUserRole() {
    try {
      const userInfo = await this.getUserInfo();
      return userInfo?.role || null; // ✅ Retourne le rôle si disponible
    } catch {
      return null;
    }
  }
  */
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
  async exchangeCodeForToken7(code: string) {
    try {
      const response = await fetch(`${BASE_URL}/auth/exchange-code?code=${encodeURIComponent(code)}`, {
        method: "GET",
        credentials: "include", // ✅ Utilisation des cookies pour stocker le token
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to exchange code: ${errorText}`);
      }

      const data = await response.json();
      window.dispatchEvent(new Event("storage")); // ✅ Met à jour l'état de l'authentification
      return data;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw error;
    }
  }

  async checkAndRedirectByRole(router?: any) {
    const userInfo = await this.getUserInfo();
    if (!userInfo) return false;

    switch (userInfo.role) {
      case "intern":
        if (router) router.push("/profile/intern");
        else window.location.href = "/profile/intern";
        return true;
      case "company":
        if (router) router.push("/profile/company");
        else window.location.href = "/profile/company";
        return true;
      default:
        return false;
    }
  }
}

export const authService = new AuthService();
