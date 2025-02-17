'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { CopyIcon, EyeIcon, Check, TrashIcon, ChevronDown, ChevronUp } from 'lucide-react'

type Url = {
	id: string
	short: string
	original: string
	views: number
	createdAt: string
	params?: { utm_source?: string; utm_campaign?: string }
}

export default function UrlList({ refresh }: { refresh: boolean }) {
	const [urls, setUrls] = useState<Url[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
	const [page, setPage] = useState<number>(1)
	const [expandedLinks, setExpandedLinks] = useState<{ [key: string]: boolean }>({})
	const [sortOption, setSortOption] = useState<string>("trafność") // 🔥 Nowy stan dla sortowania

	const router = useRouter()
	const pageSize = 15
	const totalPages = Math.ceil(totalCount / pageSize)

	// Pobieramy aktualną stronę z URL na starcie
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const currentPage = parseInt(urlParams.get('page') || '1', 10)
		setPage(currentPage)
	}, [])

	const toggleExpand = (id: string) => {
		setExpandedLinks(prev => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	// ✅ Pobieranie linków z API z obsługą paginacji i sortowania
	const fetchUrls = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`/api/urls?page=${page}&sort=${sortOption}`)
			const data = await response.json()
			setUrls(data.urls)
			setTotalCount(data.totalCount)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	// ✅ Wywołujemy pobieranie po zmianie strony, sortowania lub odświeżeniu
	useEffect(() => {
		fetchUrls()
	}, [page, refresh, sortOption])

	// ✅ Zmiana strony w paginacji
	const goToPage = (newPage: number) => {
		router.push(`?page=${newPage}`)
		setPage(newPage)
	}

	// ✅ Kopiowanie linku do schowka
	const handleCopyUrl = (short: string) => {
		const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${short}`
		navigator.clipboard.writeText(fullUrl).then(() => {
			setCopiedUrl(short)
			setTimeout(() => setCopiedUrl(null), 3000)
		})
	}

	// ✅ Usuwanie linku
	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`/api/urls/${id}`, {
				method: 'DELETE',
			})
			if (response.ok) {
				setUrls(prevUrls => prevUrls.filter(url => url.id !== id))
			} else {
				console.error('Błąd podczas usuwania linku')
			}
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	if (isLoading) {
		return <p>Ładowanie...</p>
	}

	return (
		<>
			<div>
				{/* 🔥 Nagłówek + Sortowanie (po lewej stronie) */}
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-4">
						<h2 className="text-2xl font-bold">Ostatnie linki</h2>
						{/* 🔥 Dropdown do sortowania */}
						<select
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
							className="border p-2 rounded"
						>
							<option value="trafność">Trafność: największa</option>
							<option value="najnowsze">Data: najnowsze</option>
						</select>
					</div>
				</div>

				<ul className="space-y-2">
					{urls.map(url => (
						<li
							key={url.id}
							className="flex items-center justify-between border p-2 bg-card rounded-md text-card-foreground">
							<Link href={`/${url.short}`} target="_blank" className="text-blue-500">
								{process.env.NEXT_PUBLIC_DOMAIN}/{url.short}
							</Link>
							<Button onClick={() => toggleExpand(url.id)} variant="ghost" size="icon">
								{expandedLinks[url.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
							</Button>
							<div className="flex items-center gap-3">
								<Button onClick={() => handleCopyUrl(url.short)} variant="ghost" size="icon">
									{copiedUrl === url.short ? (
										<Check className="w-4 h-4 text-green-500" />
									) : (
										<CopyIcon className="w-4 h-4" />
									)}
								</Button>

								<span className="flex items-center">
									<EyeIcon className="h-4 w-4" />
									{url.views}
								</span>

								<Button
									onClick={() => handleDelete(url.id)}
									variant="ghost"
									size="icon"
									className="text-red-500 hover:text-red-700">
									<TrashIcon className="w-4 h-4" />
								</Button>
							</div>
							{expandedLinks[url.id] && (
								<div className="mt-2 p-2 border-t">
									<p className="text-sm text-gray-500">Dodano: {new Date(url.createdAt).toLocaleString()}</p>
									{url.params && (
										<>
											{url.params.utm_source && <p className="text-sm">UTM Source: {url.params.utm_source}</p>}
											{url.params.utm_campaign && <p className="text-sm">Kampania: {url.params.utm_campaign}</p>}
										</>
									)}
								</div>
							)}
						</li>
					))}
				</ul>

				{/* 🔥 PAGINACJA */}
				<div className="flex justify-center mt-4 gap-2">
					<Button onClick={() => goToPage(page - 1)} disabled={page <= 1}>
						Poprzednia
					</Button>
					<span>
						Strona {page} z {totalPages}
					</span>
					<Button onClick={() => goToPage(page + 1)} disabled={page >= totalPages}>
						Następna
					</Button>
				</div>
			</div>
		</>
	)
}
