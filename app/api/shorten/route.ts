import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { getAuth } from '@clerk/nextjs/server' // Clerk

const prisma = new PrismaClient()
const DEFAULT_DOMAIN = 'link-lab.pl' // ✅ Twoja domyślna domena

export async function POST(request: NextRequest) {
	const { url, customSlug } = await request.json()
	const auth = getAuth(request)
	const clerkId = auth.userId // Pobranie ID użytkownika Clerk

	if (!url || !clerkId) {
		return NextResponse.json({ error: 'URL and user authentication required' }, { status: 400 })
	}

	try {
		// Pobieramy użytkownika z bazy na podstawie Clerk ID
		const user = await prisma.user.findUnique({
			where: { clerkId },
		})

		// Jeśli użytkownik nie istnieje w bazie - zwróć błąd
		if (!user) {
			return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
		}

		// ✅ Jeśli użytkownik ma premium → używa własnej domeny, jeśli nie → `link-lab.pl`
		const domain = user.customDomain || DEFAULT_DOMAIN

		// ✅ Sprawdzamy, czy niestandardowy slug nie jest już zajęty
		if (customSlug) {
			const existingSlug = await prisma.url.findUnique({
				where: { customSlug },
			})
			if (existingSlug) {
				return NextResponse.json({ error: 'This slug is already taken' }, { status: 400 })
			}
		}

		// Tworzymy nowy skrócony link
		const short = customSlug || nanoid(6)

		const newUrl = await prisma.url.create({
			data: {
				original: url,
				short,
				userId: user.id,
				customSlug: customSlug || null,
				customDomain: domain, // ✅ Każdy link ma przypisaną domenę
			},
		})

		return NextResponse.json({ short: `${domain}/${newUrl.short}` })
	} catch (error) {
		console.error('Error processing request:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
