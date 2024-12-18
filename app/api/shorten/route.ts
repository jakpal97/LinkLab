import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
	const { url } = await request.json() // Otrzymujemy URL

	if (!url) {
		return NextResponse.json({ error: 'URL is required' }, { status: 400 })
	}

	// Wyodrębniamy parametry z URL
	const urlObj = new URL(url)
	const searchParams = urlObj.searchParams

	// Tworzymy obiekt params
	const params: Record<string, string> = {}

	// Przechodzimy po dostępnych parametrach i dodajemy je do obiektu
	searchParams.forEach((value, key) => {
		params[key] = value
	})

	// Generowanie krótkiego linku
	const short = nanoid(6)

	const newUrl = await prisma.url.create({
		data: {
			original: url,
			short,
			params: Object.keys(params).length > 0 ? params : null, // Jeśli brak parametrów, zapisujemy null
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
