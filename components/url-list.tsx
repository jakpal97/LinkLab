'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { CopyIcon, EyeIcon, Check, TrashIcon } from 'lucide-react'

type Url = {
	id: string
	short: string
	original: string
	views: number
}

export default function UrlList({ refresh }: { refresh: boolean }) {
	const [urls, setUrls] = useState<Url[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [copiedUrl, setCopiedUrl] = useState<string | null>(null) // Przechowuje skopiowany link

	const searchParams = useSearchParams()
	const router = useRouter()

	const page = parseInt(searchParams.get('page') || '1', 10) // Pobieramy aktualną stronę
	const pageSize = 15
	const totalPages = Math.ceil(totalCount / pageSize)

	const fetchUrls = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`/api/urls?page=${page}`)
			const data = await response.json()
			setUrls(data.urls)
			setTotalCount(data.totalCount) // Pobieramy liczbę wszystkich linków
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	// 🔄 Odświeżanie listy po zmianie strony lub dodaniu linku
	useEffect(() => {
		fetchUrls()
	}, [page, refresh])

	const goToPage = (newPage: number) => {
		router.push(`?page=${newPage}`)
	}

	const handleCopyUrl = (short: string) => {
		const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${short}`
		navigator.clipboard.writeText(fullUrl).then(() => {
			setCopiedUrl(short) // Ustawienie skopiowanego linku
			setTimeout(() => setCopiedUrl(null), 3000) // Reset po 3 sekundach
		})
	}

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
				<h2 className="text-2xl font-bold mb-2">Ostatnie linki</h2>

				<ul className="space-y-2">
					{urls.map(url => (
						<li
							key={url.id}
							className="flex items-center justify-between border p-2 bg-card rounded-md text-card-foreground">
							<Link href={`/${url.short}`} target="_blank" className="text-blue-500">
								{process.env.NEXT_PUBLIC_DOMAIN}/{url.short}
							</Link>
							<div className="flex items-center gap-3">
								{/* Kopiowanie linku */}
								<Button onClick={() => handleCopyUrl(url.short)} variant="ghost" size="icon">
									{copiedUrl === url.short ? (
										<Check className="w-4 h-4 text-green-500" />
									) : (
										<CopyIcon className="w-4 h-4" />
									)}
								</Button>

								{/* Licznik wyświetleń */}
								<span className="flex items-center">
									<EyeIcon className="h-4 w-4" />
									{url.views}
								</span>

								{/* Przycisk usuwania linku */}
								<Button
									onClick={() => handleDelete(url.id)}
									variant="ghost"
									size="icon"
									className="text-red-500 hover:text-red-700">
									<TrashIcon className="w-4 h-4" />
								</Button>
							</div>
						</li>
					))}
				</ul>

				{/* PAGINACJA */}
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
