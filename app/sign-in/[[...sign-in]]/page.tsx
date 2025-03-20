'use client'

import { SignIn, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignInPage() {
	const { isLoaded, isSignedIn } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (isLoaded && isSignedIn) {
			router.push('/dashboard')
		}
	}, [isLoaded, isSignedIn, router])

	if (!isLoaded) return <p>Loading Clerk...</p>

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<SignIn routing="path" path="/sign-in" afterSignInUrl="/dashboard" />
		</div>
	)
}

// 'use client'

// import * as Clerk from '@clerk/elements/common'
// import * as SignIn from '@clerk/elements/sign-in'
// import { Button } from '@/components/ui/button'

// export default function SignInPage() {
// 	return (
// 		<div className="grid w-full flex-grow items-center bg-white px-4 sm:justify-center">
// 			<SignIn.Root>
// 				{/* Krok start: tylko pole email i przycisk logowania */}
// 				<SignIn.Step name="start" className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8">
// 					<header className="text-center">
// 						<svg
// 							xmlns="http://www.w3.org/2000/svg"
// 							width="24"
// 							height="24"
// 							fill="none"
// 							stroke="currentColor"
// 							strokeLinecap="round"
// 							strokeLinejoin="round"
// 							strokeWidth="2"
// 							className="mx-auto size-10"
// 							viewBox="0 0 24 24">
// 							<title>Logo</title>
// 							<path d="M16 20V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
// 							<rect width="20" height="14" x="2" y="6" rx="2" />
// 						</svg>
// 						<h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">Zaloguj się do Invoicipedia</h1>
// 					</header>
// 					<Clerk.GlobalError className="block text-sm text-red-600" />
// 					<Clerk.Field name="identifier">
// 						<Clerk.Label className="sr-only">Email</Clerk.Label>
// 						<Clerk.Input
// 							type="email"
// 							required
// 							placeholder="Email"
// 							className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
// 						/>
// 						<Clerk.FieldError className="mt-2 block text-xs text-red-600" />
// 					</Clerk.Field>
// 					<SignIn.Action submit asChild>
// 						<Button className="w-full font-bold">Zaloguj się</Button>
// 					</SignIn.Action>
// 				</SignIn.Step>

// 				{/* Krok weryfikacji: tylko kod email */}
// 				<SignIn.Step name="verifications" className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8">
// 					<SignIn.Strategy name="email_code">
// 						<header className="text-center">
// 							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" className="mx-auto size-10">
// 								<title>Logo</title>
// 								<mask id="a" width="40" height="40" x="0" y="0" maskUnits="userSpaceOnUse">
// 									<circle cx="20" cy="20" r="20" fill="#D9D9D9" />
// 								</mask>
// 								<g fill="#0A0A0A" mask="url(#a)">
// 									<path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
// 									<path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
// 								</g>
// 							</svg>
// 							<h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">Zweryfikuj kod z emaila</h1>
// 						</header>
// 						<Clerk.GlobalError className="block text-sm text-red-600" />
// 						<Clerk.Field name="code">
// 							<Clerk.Label className="sr-only">Kod z emaila</Clerk.Label>
// 							<Clerk.Input
// 								type="otp"
// 								required
// 								placeholder="Kod z emaila"
// 								className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
// 							/>
// 							<Clerk.FieldError className="mt-2 block text-xs text-red-600" />
// 						</Clerk.Field>
// 						<SignIn.Action submit asChild>
// 							<Button className="w-full font-bold">Kontynuuj</Button>
// 						</SignIn.Action>
// 					</SignIn.Strategy>
// 				</SignIn.Step>
// 			</SignIn.Root>
// 		</div>
// 	)
// }
