
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
 try{
	const urls = await prisma.url.findMany({
		orderBy: { createdAt: 'desc'},
		take: 5,
	})
	return NextResponse.json(urls)
 }catch(error){
	console.log(error)
	return NextResponse.json({error: 'Internal Server Error', status: 500})
 }

}
