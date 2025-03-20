import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
	try {
		const session = await auth()
		const clerkId = session?.userId

		if (!clerkId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		// Sprawdź czy request ma body
		let userData
		try {
			userData = await req.json()
		} catch (error) {
			return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
		}

		if (!userData.email) {
			return NextResponse.json({ error: 'Email is required' }, { status: 400 })
		}

		// Sprawdź, czy użytkownik już istnieje w bazie
		const existingUser = await prisma.user.findUnique({
			where: { clerkId },
		})

		if (existingUser) {
			return NextResponse.json({ message: 'User already exists', user: existingUser }, { status: 200 })
		}

		// Dodaj użytkownika do bazy
		const newUser = await prisma.user.create({
			data: {
				clerkId,
				email: userData.email,
			},
		})

		return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 })
	} catch (error) {
		console.error('Registration error:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}
