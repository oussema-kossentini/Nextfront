import { authService } from "@/services/auth-service"

const API_URL = "http://localhost:3001"

interface FetchOptions extends RequestInit {
  requireAuth?: boolean
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = false, ...fetchOptions } = options
  const url = `${API_URL}${endpoint}`

  const headers = new Headers(fetchOptions.headers)
  headers.set("Content-Type", "application/json")

  if (requireAuth) {
    const token = authService.getToken()
    if (!token) {
      throw new Error("Authentication required")
    }
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "An error occurred")
  }

  return response.json()
}

