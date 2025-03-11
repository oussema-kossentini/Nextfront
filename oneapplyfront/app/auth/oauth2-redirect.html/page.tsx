"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { authService } from "@/services/auth-service"

export default function OAuth2Redirect() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function handleOAuth2Redirect() {
      try {
        // Get code from URL parameters
        const code = searchParams.get("code")

        if (!code) {
          console.error("❌ No authorization code received")
          setStatus("error")
          setErrorMessage("No authorization code received")
          return
        }

        console.log("🔍 Authorization code received:", code)

        // Exchange code for token
        const data = await authService.exchangeCodeForToken(code)

        if (!data.access_token) {
          throw new Error("No token received from server")
        }

        console.log("✅ Token received from server")

        // Post message to opener if this is a popup
        if (window.opener) {
          window.opener.postMessage(
            {
              type: "authorization_code",
              token: data.access_token,
              userInfo: data.userInfo,
            },
            window.location.origin,
          )
          console.log("✅ Token and user info sent to opener")

          // Close popup after a short delay
          setTimeout(() => {
            window.close()
          }, 1000)
        } else {
          // If not a popup, redirect to appropriate profile page based on user role
          console.log("✅ Redirecting to profile page")

          if (data.userInfo && data.userInfo.role) {
            const redirectPath = data.userInfo.role === "intern" ? "/profile/intern" : "/profile/company"
            router.push(redirectPath)
          } else {
            // Default to home page if role is not available
            router.push("/")
          }
        }

        setStatus("success")
      } catch (error) {
        console.error("❌ Error handling OAuth redirect:", error)
        setStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Unknown error")
      }
    }

    handleOAuth2Redirect()
  }, [searchParams, router])

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Authentication in progress...</h1>
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h1>
        <p className="text-center mb-4">{errorMessage}</p>
        <button
          onClick={() => router.push("/sign-in")}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Return to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-green-500 mb-4">Authentication Successful</h1>
      <p className="text-center">You have successfully signed in. Redirecting to your profile...</p>
    </div>
  )
}

