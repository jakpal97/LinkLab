import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await context.params
		const auth = getAuth(req)
		const clerkId = auth.userId

		if (!id || !clerkId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		// Pobranie użytkownika z bazy
		const user = await prisma.user.findUnique({
			where: { clerkId },
			select: { id: true },
		})

		if (!user) {
			return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
		}

		// Pobranie linku z bazy
		const url = await prisma.url.findUnique({
			where: { id },
		})

		if (!url || url.userId !== user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		await prisma.url.delete({
			where: { id },
		})

		return NextResponse.json({ message: 'URL deleted successfully' })
	} catch (error) {
		console.error('Error deleting URL:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}