import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server' // Pobieramy dane autoryzacyjne użytkownika

export async function GET(req: NextRequest) {
	const auth = getAuth(req)
	const clerkId = auth.userId // Pobieramy Clerk ID

	if (!clerkId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	// Pobieramy użytkownika z bazy
	const user = await prisma.user.findUnique({
		where: { clerkId }, // Szukamy po Clerk ID
		select: { id: true }, // Pobieramy tylko ID użytkownika
	})

	if (!user) {
		return NextResponse.json({ error: 'User not found' }, { status: 404 })
	}

	// Pobieramy tylko linki należące do zalogowanego użytkownika
	const urls = await prisma.url.findMany({
		where: { userId: user.id },
		select: {
			id: true,
			original: true,
			short: true,
			views: true,
			createdAt: true,
			params: true,
			customDomain: true,
			customSlug: true,
		},
	})

	return NextResponse.json({ urls })
}
