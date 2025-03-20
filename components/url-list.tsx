'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import { Copy, Check, Eye, Trash, ChevronDown, ChevronUp, ExternalLink, Calendar, Tag } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'

type Url = {
	id: string
	short: string
	original: string
	views: number
	createdAt: string
	params?: { utm_source?: string; utm_campaign?: string }
	customDomain?: string
}

export default function UrlList({ refresh }: { refresh: boolean }) {
	const { user } = useUser()
	const [urls, setUrls] = useState<Url[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
	const [page, setPage] = useState<number>(1)
	const [expandedLinks, setExpandedLinks] = useState<{ [key: string]: boolean }>({})
	const [sortOption, setSortOption] = useState<string>('trafność')

	const router = useRouter()
	const pageSize = 15
	const totalPages = Math.ceil(totalCount / pageSize)

	const fetchUrls = useCallback(async () => {
		if (!user) {
			console.log('Brak użytkownika, nie pobieram URL-i')
			return
		}

		setIsLoading(true)
		try {
			console.log('Pobieranie URL-i dla userId:', user.id)
			const response = await fetch(`/api/urls?page=${page}&sort=${sortOption}`)
			const data = await response.json()
			console.log('Otrzymane dane:', data)

			setUrls(data.urls || [])
			setTotalCount(data.totalCount || 0)
		} catch (error) {
			console.error('Błąd pobierania URL:', error)
		} finally {
			setIsLoading(false)
		}
	}, [user, page, sortOption]) // Zależności, które mogą się zmieniać

	useEffect(() => {
		if (user) fetchUrls()
	}, [user, page, refresh, sortOption, fetchUrls])

	const handleCopyUrl = (short: string, customDomain?: string) => {
		const domain = customDomain || process.env.NEXT_PUBLIC_DOMAIN
		const fullUrl = `${domain}/${short}`
		navigator.clipboard.writeText(fullUrl).then(() => {
			setCopiedUrl(short)
			setTimeout(() => setCopiedUrl(null), 3000)
		})
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Czy na pewno chcesz usunąć ten link?')) return

		try {
			const response = await fetch(`/api/urls/${id}`, { method: 'DELETE' })
			if (response.ok) {
				setUrls(prevUrls => prevUrls.filter(url => url.id !== id))
				setTotalCount(prev => prev - 1)
			} else {
				console.error('Błąd podczas usuwania linku')
			}
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	const toggleExpand = (id: string) => {
		setExpandedLinks(prev => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	if (!user) {
		return (
			<Card className="w-full">
				<CardContent className="p-6 text-center">
					<p className="text-gray-600">Musisz być zalogowany, aby zobaczyć swoje linki.</p>
					<Button className="mt-4" onClick={() => router.push('/login')}>
						Zaloguj się
					</Button>
				</CardContent>
			</Card>
		)
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Twoje linki</h2>
				<Select value={sortOption} onValueChange={setSortOption}>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder="Sortowanie" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="trafność">Trafność: największa</SelectItem>
						<SelectItem value="najnowsze">Data: najnowsze</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{isLoading ? (
				<div className="space-y-3">
					{[1, 2, 3].map(i => (
						<Card key={i}>
							<CardContent className="p-4 flex items-center justify-between">
								<Skeleton className="h-6 w-64" />
								<div className="flex gap-3">
									<Skeleton className="h-8 w-8 rounded-full" />
									<Skeleton className="h-8 w-8 rounded-full" />
									<Skeleton className="h-8 w-8 rounded-full" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<>
					{urls.length > 0 ? (
						<div className="space-y-3">
							{urls.map(url => (
								<Card key={url.id} className="overflow-hidden shadow-sm hover:shadow transition-shadow duration-200">
									<CardContent className="p-0">
										<div className="p-4 flex items-center justify-between flex-wrap gap-2">
											<div className="flex items-center gap-2">
												<Link
													href={`/${url.short}`}
													target="_blank"
													className="text-blue-600 hover:text-blue-800 font-medium truncate max-w-[250px] sm:max-w-[300px] inline-flex items-center gap-1">
													{url.customDomain
														? `${url.customDomain}/${url.short}`
														: `${process.env.NEXT_PUBLIC_DOMAIN}/${url.short}`}
													<ExternalLink className="w-3 h-3" />
												</Link>

												<Badge variant="outline" className="flex items-center gap-1">
													<Eye className="w-3 h-3" /> {url.views}
												</Badge>
											</div>

											<div className="flex items-center gap-2">
												<Button
													onClick={() => handleCopyUrl(url.short, url.customDomain)}
													variant="outline"
													size="sm"
													className={copiedUrl === url.short ? 'text-green-600' : ''}>
													{copiedUrl === url.short ? (
														<>
															<Check className="w-4 h-4 mr-1" />
															Skopiowano
														</>
													) : (
														<>
															<Copy className="w-4 h-4 mr-1" />
															Kopiuj
														</>
													)}
												</Button>

												<Button onClick={() => toggleExpand(url.id)} variant="ghost" size="sm">
													{expandedLinks[url.id] ? (
														<>
															Mniej <ChevronUp className="w-4 h-4 ml-1" />
														</>
													) : (
														<>
															Więcej <ChevronDown className="w-4 h-4 ml-1" />
														</>
													)}
												</Button>

												<Button
													onClick={() => handleDelete(url.id)}
													variant="outline"
													size="sm"
													className="text-red-500 hover:text-white hover:bg-red-500 transition-colors">
													<Trash className="w-4 h-4" />
												</Button>
											</div>
										</div>

										{expandedLinks[url.id] && (
											<div className="bg-gray-50 p-4 border-t">
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div className="space-y-2">
														<div className="flex items-center gap-2 text-sm text-gray-600">
															<Calendar className="w-4 h-4" />
															<span>Dodano: {new Date(url.createdAt).toLocaleString()}</span>
														</div>

														{url.original && (
															<div className="text-sm text-gray-600 break-all">
																<span className="font-semibold">Oryginalny URL:</span> {url.original}
															</div>
														)}
													</div>

													{url.params && (
														<div className="space-y-2">
															<h4 className="text-sm font-semibold flex items-center gap-2">
																<Tag className="w-4 h-4" />
																Parametry śledzenia
															</h4>

															{url.params.utm_source && (
																<div className="text-sm text-gray-600">
																	<span className="font-medium">UTM Source:</span> {url.params.utm_source}
																</div>
															)}

															{url.params.utm_campaign && (
																<div className="text-sm text-gray-600">
																	<span className="font-medium">Kampania:</span> {url.params.utm_campaign}
																</div>
															)}
														</div>
													)}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<Card className="shadow-sm">
							<CardContent className="p-8 text-center">
								<p className="text-gray-500 mb-4">Brak skróconych linków</p>
								<Button onClick={() => router.push('/')}>Utwórz pierwszy link</Button>
							</CardContent>
						</Card>
					)}
				</>
			)}

			{totalPages > 0 && (
				<div className="flex justify-center mt-6 gap-2">
					<Button
						onClick={() => setPage(prev => Math.max(prev - 1, 1))}
						disabled={page <= 1 || isLoading}
						variant="outline">
						Poprzednia
					</Button>

					<div className="flex items-center px-4 py-2 bg-gray-100 rounded-md">
						Strona {page} z {totalPages}
					</div>

					<Button
						onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
						disabled={page >= totalPages || isLoading}
						variant="outline">
						Następna
					</Button>
				</div>
			)}
		</div>
	)
}
