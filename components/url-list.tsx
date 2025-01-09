'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { CopyIcon, EyeIcon, Check } from 'lucide-react'


// // Definicja interfejsu dla obiektu URL
// interface Url {
// 	id: string
// 	short: string
// 	original: string
// 	views: number
// }
type Url = {
	id: string
	short: string
	original: string
	views: number
}

export default function UrlList() {
	const [urls, setUrls] = useState<Url[]>([])
	const [copied, setCopied] = useState<boolean>(false)
	const [copyUrl, setCopyUrl] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const shortenerUrl = (code: string) => `${process.env.NEXT_PUBLIC_DOMAIN}/${code}`
	const fetchUrls = async () => {
		setIsLoading(true)
		try {
			const response = await fetch('/api/urls')
			const data = await response.json()
			setUrls(data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleCopyUrl = (code: string) => {
		const fullUrl = `${shortenerUrl(code)}`
		navigator.clipboard.writeText(fullUrl).then(() => {
			setCopied(true)
			setCopyUrl(code)
			setTimeout(() => {
				setCopied(false)
				setCopyUrl('')
			}, 3000)
		})
	}

	useEffect(() => {
		fetchUrls()
	}, [])
	if (isLoading) {
		return (
			<div className="animate-pulse">
				<div className="h-8 bg-grey-200 rounded w-1/4 mb-4"></div>
				<ul className="space-y-2">
					{[1, 2, 3].map(num => (
						<li
							key={num}
							className="flex items-center gap-2 rounded-md border bg-card p-4 text-card-foreground justify-between">
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
							<div className="flex items-center gap-3">
								<div className="h-5 w-5 bg-gray-200 rounded"></div>
								<span className="flex items-center gap-2">
									<div className="h-4 w-4 bg-gray-200 rounded"></div>
									<div className="h-4 bg-gray-200 w-10 rounded"></div>
								</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		)
	}

	return (
		<>
		<div>
			<h2 className="text-2xl font-bold mb-2">Ostatnie linki</h2>

			<ul className="space-y-2">
				{urls.map(url => (
					<li
						key={url.id}
						className="flex items-center gap-2 justify-between border p-2 bg-card rounded-md text-card-foreground  ">
						<Link href={`/${url.short}`} target="_blank" className="text-blue-500">
							{shortenerUrl(url.short)}
						</Link>
						<div className="flex items-center gap-3">
							<Button
								onClick={() => handleCopyUrl(url.short)}
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:bg-muted">
								{copied && copyUrl == url.short ? <Check className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
							</Button>
							<span className="flex items-center">
								<EyeIcon className="h-4 w-4" />
								{url.views}
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
		</>
	)
}
