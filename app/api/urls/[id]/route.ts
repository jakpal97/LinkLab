import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request, context: { params: { id: string } }) {
	try {
		const { id } = context.params

		if (!id) {
			return NextResponse.json({ error: 'ID is required' }, { status: 400 })
		}

		// Sprawdzenie, czy link istnieje
		const url = await prisma.url.findUnique({
			where: { id },
		})

		if (!url) {
			return NextResponse.json({ error: 'URL not found' }, { status: 404 })
		}

		// Usunięcie linku z bazy
		await prisma.url.delete({
			where: { id },
		})

		return NextResponse.json({ message: 'URL deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting URL:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
