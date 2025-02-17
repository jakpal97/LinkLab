import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const searchParams = new URL(req.url).searchParams
		const page = parseInt(searchParams.get('page') || '1', 10) 
		const sort = searchParams.get('sort') || 'trafność'
		const pageSize = 15
		const skip = (page - 1) * pageSize 

		
		let orderBy = {}
		if (sort === 'trafność') {
			orderBy = { views: 'desc' } 
		} else if (sort === 'najnowsze') {
			orderBy = { createdAt: 'desc' } 
		}

		const urls = await prisma.url.findMany({
			orderBy,
			skip,
			take: pageSize,
			select: {
				id: true,
				original: true,
				short: true,
				views: true,
				createdAt: true,
				params: true,
			},
		})

		const totalCount = await prisma.url.count()

		return NextResponse.json({ urls, totalCount, page, pageSize })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
