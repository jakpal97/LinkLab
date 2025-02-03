import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await context.params // Dodaj `await`, bo `context.params` to Promise

		if (!id) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
		}

		const url = await prisma.url.findUnique({
			where: { id },
		})

		if (!url) {
			return NextResponse.json({ error: 'URL not found' }, { status: 404 })
		}

		await prisma.url.delete({
			where: { id },
		})

		return NextResponse.json({ message: 'URL deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting URL:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
