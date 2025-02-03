import { getAuth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
	const { userId } = getAuth(request) // ⬅ Używamy getAuth zamiast auth
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { url } = await request.json()
	if (!url) {
		return NextResponse.json({ error: 'URL is required' }, { status: 400 })
	}

	// Wyodrębniamy parametry UTM z URL
	const urlObj = new URL(url)
	const searchParams = urlObj.searchParams

	const params: Record<string, string> = {}
	searchParams.forEach((value, key) => {
		params[key] = value
	})

	// Generujemy unikalny skrócony link
	const short = nanoid(6)

	// Zapisujemy link w bazie danych, przypisując go do `userId`
	const newUrl = await prisma.url.create({
		data: {
			original: url,
			short,
			params: Object.keys(params).length > 0 ? params : {},
			userId, // Przechowujemy właściciela linku
		},
	})

	return NextResponse.json({ short: newUrl.short })
}
// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';
// import { nanoid } from 'nanoid';

// const prisma = new PrismaClient();

// export async function POST(request: NextRequest) {
//   try {
//     // Odczytaj dane JSON z żądania
//     const { url, utm_source, utm_id, utm_content } = await request.json();

//     if (!url) {
//       return NextResponse.json({ error: 'URL is required' }, { status: 400 });
//     }

//     // Wygeneruj unikalny skrót (np. abc123)
//     const short = nanoid(6);

//     // Zapisz dane do bazy
//     const newUrl = await prisma.url.create({
//       data: {
//         original: url,
//         short,
//         params: {
//           utm_source: utm_source || null,
//           utm_id: utm_id || null,
//           utm_content: utm_content || null,
//         },
//       },
//     });

//     // Zwróć skrócony link
//     return NextResponse.json({ short: newUrl.short });
//   } catch (error) {
//     console.error('Error in POST:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
