"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function GoogleAuthRedirect() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get("code")

        if (!code) {
          setError("No authorization code received from Google")
          return
        }

        // In a real app, you would exchange this code for a token
        // For now, we'll just redirect to the home page
        router.push("/")
      } catch (error) {
        console.error("Error handling Google callback:", error)
        setError("Failed to authenticate with Google")
      }
    }

    handleGoogleCallback()
  }, [router])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
        <p className="mt-2">{error}</p>
        <button onClick={() => router.push("/sign-in")} className="mt-4 px-4 py-2 bg-primary text-white rounded">
          Return to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Authenticating...</h1>
      <p className="mt-2">Please wait while we complete your sign-in process.</p>
    </div>
  )
}

