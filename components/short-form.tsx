'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { LinkIcon, Loader2, ExternalLink } from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'

interface ShortenFormProps {
	handleUrlShortened: () => void
}

export default function ShortForm({ handleUrlShortened }: ShortenFormProps) {
	const [url, setUrl] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const router = useRouter()

	const handleOnSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setErrorMessage(null)

		// Walidacja URL przed wysłaniem do API
		try {
			new URL(url)
		} catch {
			setErrorMessage('Niepoprawny URL. Wprowadź poprawny link rozpoczynający się od http:// lub https://')
			setIsLoading(false)
			return
		}

		try {
			const response = await fetch('/api/shorten', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url }),
			})

			if (!response.ok) {
				setUrl('')
				router.push(`?page=1`)
				const errorData = await response.json()
				throw new Error(errorData.error || 'Wystąpił błąd podczas skracania URL')
			}

			await response.json()
			setUrl('')
			handleUrlShortened()
		} catch (error) {
			setErrorMessage(error instanceof Error ? error.message : 'Nieznany błąd')
		} finally {
			setIsLoading(false)
		}
	}

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText()
			setUrl(text)
		} catch (err) {
			console.error('Nie udało się wkleić tekstu ze schowka:', err)
		}
	}

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="bg-white rounded-lg shadow-sm border p-6">
				<div className="flex items-center gap-2 mb-4">
					<LinkIcon className="h-5 w-5 text-blue-500" />
					<h2 className="text-xl font-bold">Skracacz linków</h2>
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
							<Button
								type="button"
								variant="ghost"
								className="absolute right-2 top-2 text-xs text-gray-500 hover:text-gray-700"
								onClick={handlePaste}>
								Wklej
							</Button>
						</div>
						{url && (
							<p className="mt-1 text-xs text-gray-500 truncate">
								{url.length > 60 ? `${url.substring(0, 60)}...` : url}
							</p>
						)}
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
								<span>Skróć swój link</span>
							</>
						)}
					</Button>
				</form>

				{errorMessage && (
					<Alert variant="destructive" className="mt-4">
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>
				)}

				<div className="mt-4 pt-4 border-t text-sm text-gray-500">
					<p>Skróć długie linki za darmo. Śledź statystyki i zarządzaj swoimi linkami w jednym miejscu.</p>
				</div>
			</div>
		</div>
	)
}
