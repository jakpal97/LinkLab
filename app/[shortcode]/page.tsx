import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

interface RedirectPageProps {
	params: Promise< { shortcode: string }>
}

export default async function RedirectPage({ params }: RedirectPageProps) {
	const { shortcode } = await params

	// Pobranie URL z bazy danych
	const url = await prisma.url.findUnique({
		where: { short: shortcode },
	})

	if (!url) {
		return <div>404 - Nie znaleziono Linku</div>
	}

	// Aktualizacja liczby wyświetleń
	await prisma.url.update({
		where: { id: url.id },
		data: { views: { increment: 1 } },
	})

	// Przekierowanie
	redirect(url.original)
}
