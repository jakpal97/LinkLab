import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)
		const page = parseInt(searchParams.get('page') || '1', 10) // Pobieramy stronę z URL
		const pageSize = 15 // Ilość linków na stronę
		const skip = (page - 1) * pageSize // Obliczamy, ile rekordów pominąć

		const urls = await prisma.url.findMany({
			orderBy: { createdAt: 'desc' },
			skip, // Pomijamy określoną liczbę rekordów
			take: pageSize, // Pobieramy tylko 15 rekordów
		})

		const totalCount = await prisma.url.count() // Pobieramy liczbę wszystkich linków

		return NextResponse.json({ urls, totalCount, page, pageSize })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Internal Server Error', status: 500 })
	}
}
