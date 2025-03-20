import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

interface RedirectPageProps {
	params: Promise<{ shortcode: string }>
}

export default async function RedirectPage({ params }: RedirectPageProps) {
	const { shortcode } = await params

	// Pobranie URL z bazy danych
	const url = await prisma.url.findFirst({
		where: {
			OR: [{ short: shortcode }, { customSlug: shortcode }],
		},
	})
	if(!url){
		return <div>404 - nie znaleziono linku. </div>
	}
	const referrer = '' // Jeśli masz dostęp do `document.referrer`, dodaj go tutaj
	const ipAddress = '' // Jeśli masz middleware do pobierania IP, dodaj go tutaj
	const userAgent = '' // Możesz pobrać `req.headers['user-agent']` w Next.js API Route

	// **Zapisz kliknięcie w tabeli `Click`**
	await prisma.click.create({
		data: {
			urlId: url.id, // Powiązanie z URL-em
			referrer: referrer || 'Direct', // Jeśli brak referrera, oznacz jako Direct
			ipAddress: ipAddress || 'Unknown',
			userAgent: userAgent || 'Unknown',
		},
	})

	// Aktualizacja liczby wyświetleń
	await prisma.url.update({
		where: { id: url.id },
		data: { views: { increment: 1 } },
	})

	// Przekierowanie
	redirect(url.original)
}
