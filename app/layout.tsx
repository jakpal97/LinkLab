import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Roboto } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import clsx from 'clsx'

// Importowanie lokalnych czcionek
const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

// Importowanie czcionki Roboto z Google Fonts
const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
	title: 'LinkLab',
	description: 'App for shortening URLs',
	icons: {
		icon: '/favicon.png',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={clsx(
						geistSans.variable,
						geistMono.variable,
						roboto.className,
						'antialiased w-full' // Poprawione klasy CSS
					)}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}