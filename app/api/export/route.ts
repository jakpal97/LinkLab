import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Parser } from 'json2csv'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const auth = getAuth(req)
		const clerkId = auth.userId

		if (!clerkId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		// ✅ Pobranie linków użytkownika
		const user = await prisma.user.findUnique({
			where: { clerkId },
			select: { id: true },
		})

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		const urls = await prisma.url.findMany({
			where: { userId: user.id },
			select: {
				original: true,
				short: true,
				views: true,
				createdAt: true,
				params: true,
			},
		})

		// ✅ Przygotowanie danych do CSV
		const urlsWithCampaign = urls.map(url => {
			const params = typeof url.params === 'string' ? JSON.parse(url.params) : url.params

			return {
				'Original URL': url.original,
				'Short URL': `${process.env.NEXT_PUBLIC_DOMAIN}/${url.short}`,
				Views: url.views,
				'Created At': url.createdAt.toISOString(),
				'UTM Campaign': params?.utm_campaign || 'Brak',
			}
		})
		// ✅ Ustawienie separatora jako `;` dla lepszej zgodności z Excel
		const json2csvParser = new Parser({ delimiter: ';', quote: '"' })
		const csv = json2csvParser.parse(urlsWithCampaign)

		// ✅ Dodanie BOM, aby Excel poprawnie wykrywał kodowanie
		const csvWithBOM = '\ufeff' + csv

		return new NextResponse(csvWithBOM, {
			headers: {
				'Content-Type': 'text/csv; charset=utf-8',
				'Content-Disposition': 'attachment; filename="export.csv"',
			},
		})
	} catch (error) {
		console.error('Błąd eksportu CSV:', error)
		return NextResponse.json({ error: 'Błąd generowania CSV' }, { status: 500 })
	}
}
