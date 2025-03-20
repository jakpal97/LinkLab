'use client'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import UrlShortnerContainer from '@/components/url-shortner-container'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
	const { user, isSignedIn } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (!isSignedIn) {
			router.push('/sign-in') // Tylko na kliencie
		} else if (user) {
			// Dodanie użytkownika do bazy
			fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: user.primaryEmailAddress?.emailAddress }),
			})
		}
	}, [isSignedIn, user, router])

	if (!isSignedIn) return null

	return <UrlShortnerContainer />
}
