import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    // Call your NestJS backend to exchange the code for a token
    const response = await fetch("http://localhost:3000/auth/google/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { error: error.message || "Failed to authenticate with Google" },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred during Google authentication" },
      { status: 500 },
    )
  }
}

