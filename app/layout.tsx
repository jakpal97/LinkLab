import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Roboto } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

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

export const metadata: Metadata = {
	title: 'LinkLab',
	description: 'App for shortening URLs',
	icons: {
		icon: '/favicon.png',
	},
}
const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'], // Wybierz style, które Cię interesują
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased w-full  `}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
