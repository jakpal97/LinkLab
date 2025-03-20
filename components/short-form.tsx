'use client'
import { useState, useEffect } from 'react'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { LinkIcon, Loader2, ExternalLink } from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'
import { useRouter } from 'next/navigation'

interface ShortenFormProps {
	handleUrlShortened?: () => void
}

export default function ShortForm({ handleUrlShortened }: ShortenFormProps) {
	const [url, setUrl] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [urlShortened, setUrlShortened] = useState(false)
	const router = useRouter()

	const handleOnSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setErrorMessage(null)

		try {
			const response = await fetch('/api/shorten', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url }),
			})

			if (!response.ok) throw new Error('Błąd podczas skracania URL')

			await response.json()
			setUrl('')
			setUrlShortened(true)
			handleUrlShortened?.()
			router.refresh()   
		} catch (error) {
			setErrorMessage(error instanceof Error ? error.message : 'Nieznany błąd')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (urlShortened) {
			console.log('URL został skrócony, można odświeżyć listę')
		}
	}, [urlShortened])

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="bg-white rounded-lg shadow-sm border p-6">
				<div className="flex items-center gap-2 mb-4">
					<LinkIcon className="h-5 w-5 text-blue-500" />
					<h2 className="text-xl font-bold">URL Shortner</h2>
				</div>

				<form onSubmit={handleOnSubmit} className="space-y-4">
					<div className="relative">
						<div className="flex">
							<Input
								value={url}
								onChange={e => setUrl(e.target.value)}
								className="h-14 pr-28 text-base focus-visible:ring-blue-500"
								type="url"
								placeholder="https://twoj-dlugi-link.pl/przykładowa-strona"
								required
							/>
						</div>
					</div>

					<Button
						className="w-full h-14 text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
						type="submit"
						disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="h-5 w-5 animate-spin" />
								<span>Trwa skracanie...</span>
							</>
						) : (
							<>
								<ExternalLink className="h-5 w-5" />
								<span>Shorten your url</span>
							</>
						)}
					</Button>
				</form>

				{errorMessage && (
					<Alert variant="destructive" className="mt-4">
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	)
}
