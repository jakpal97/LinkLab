import { prisma } from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { userId } = getAuth(req) // Pobieramy userId z Clerk

	if (!userId) {
		return NextResponse.json({ error: 'Nieautoryzowany' }, { status: 401 })
	}

	// Pobieramy użytkownika z bazy danych
	const user = await prisma.user.findUnique({
		where: { clerkId: userId },
		include: {
			urls: {
				include: {
					clicks: true,
				},
			},
		},
	})

	if (!user) {
		return NextResponse.json({ error: 'Użytkownik nie znaleziony w bazie' }, { status: 404 })
	}

	// Przetwarzamy dane do statystyk
	const clicksPerDay: Record<string, number> = {}
	const trafficSources: Record<string, number> = {}

	user.urls.forEach(url => {
		url.clicks.forEach(click => {
			// Liczba kliknięć w danym dniu
			const date = click.timestamp.toISOString().split('T')[0]
			clicksPerDay[date] = (clicksPerDay[date] || 0) + 1

			// Liczba kliknięć z konkretnego źródła ruchu
			if (click.referrer) {
				trafficSources[click.referrer] = (trafficSources[click.referrer] || 0) + 1
			}
		})
	})

	return NextResponse.json({
		clicksPerDay: Object.entries(clicksPerDay).map(([date, count]) => ({ date, count })),
		totalClicks: user.urls.reduce((acc, url) => acc + url.clicks.length, 0),
		trafficSources: Object.entries(trafficSources).map(([referrer, count]) => ({ referrer, count })),
	})
}
