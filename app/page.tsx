'use client'

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import UrlShortnerContainer from '@/components/url-shortner-container'

export default function Home() {
	return (
		<>
			{/* Jeśli użytkownik jest zalogowany, pokaż główny komponent */}
			<SignedIn>
				<UrlShortnerContainer />
			</SignedIn>

			{/* Jeśli użytkownik nie jest zalogowany, przekieruj na stronę logowania Clerk */}
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	)
}
