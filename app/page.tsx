'use client'
import { useUser, SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import UrlShortnerContainer from '@/components/url-shortner-container'

export default function Home() {
	const { isSignedIn } = useUser()

	if (!isSignedIn) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-2xl font-bold mb-4">Musisz się zalogować, aby zobaczyć swoje linki.</h1>
				<SignInButton mode="modal">
					<Button className="bg-blue-500 text-white px-4 py-2 rounded">Zaloguj się</Button>
				</SignInButton>
			</div>
		)
	}

	return <UrlShortnerContainer />
}
