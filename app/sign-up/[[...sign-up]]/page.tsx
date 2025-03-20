'use client'

import { SignUp, useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignUpPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const registerUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          setLoading(true)
          const token = await getToken() // Pobieramy token autoryzacyjny

          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Przekazujemy token Clerk do API
            },
            body: JSON.stringify({
              email: user.primaryEmailAddress?.emailAddress, // Pobieramy e-mail użytkownika z Clerk
            }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            console.error('Błąd rejestracji:', errorData)
            return
          }

          console.log('Użytkownik dodany do bazy')
          router.push('/dashboard')
        } catch (error) {
          console.error('Błąd podczas rejestracji:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    registerUser()
  }, [isLoaded, isSignedIn, user, getToken, router])

  if (!isLoaded) return <p>Ładowanie Clerk...</p>

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p>Rejestrowanie...</p>
      ) : (
        <SignUp routing="path" path="/sign-up" afterSignUpUrl="/dashboard" />
      )}
    </div>
  )
}
