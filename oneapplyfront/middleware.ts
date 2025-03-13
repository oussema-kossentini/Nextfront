import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // ✅ Utilise `jose` pour décoder le token JWT

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "problem de recupperation ");

export async function middleware(request: NextRequest) {
  console.log("🔍 Middleware activé :", request.nextUrl.pathname);

  const isAuthPage =
      request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname.startsWith("/register");

  const protectedRoutes = ["/profile", "/dashboard"];

  //  Vérifier si l'utilisateur a un token
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    console.warn("⚠️ Aucun token trouvé, redirection vers /sign-in.");
    if (!isAuthPage) {
     // return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  // Décoder le JWT en utilisant `jose`
  let userRole;
  try {
    const { payload } = await jwtVerify(authToken, SECRET_KEY);
    userRole = payload.role;
  } catch (error) {
    console.error("❌ Erreur lors du décodage du token :", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (!userRole) {
    console.warn("⚠️ Aucun rôle trouvé, redirection vers /sign-in.");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  //  Rediriger les utilisateurs connectés loin de /sign-in et /register
  if (isAuthPage) {
    const redirectPath = userRole === "company" ? "/profile/company" : "/profile/intern";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  //  Bloquer l'accès aux espaces non autorisés
  if (request.nextUrl.pathname.startsWith("/profile/intern") && userRole !== "intern") {
    console.warn("🚫 Accès interdit à /profile/intern pour une company.");
    return NextResponse.redirect(new URL("/profile/company", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/profile/company") && userRole !== "company") {
    console.warn("🚫 Accès interdit à /profile/company pour un intern.");
    return NextResponse.redirect(new URL("/profile/intern", request.url));
  }

  return NextResponse.next();
}

//  Routes protégées par le middleware
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/sign-in", "/register/:path*"],
};
