'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'

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
		setErrorMessage(null) // Resetujemy błąd

		// ✅ **Walidacja URL przed wysłaniem do API**
		try {
			new URL(url) // Sprawdza, czy URL jest poprawny
		} catch {
			setErrorMessage('Niepoprawny URL. Wprowadź poprawny link.')
			setIsLoading(false)
			return
		}

		try {
			const response = await fetch('/api/shorten', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url }),
			})

			// ✅ **Sprawdzanie, czy serwer zwrócił poprawny status**
			if (!response.ok) {
				setUrl('')
				router.push(`?page=1`)
				const errorData = await response.json()
				throw new Error(errorData.error || 'Wystąpił błąd podczas skracania URL')
			}

			await response.json()
			setUrl('')
			handleUrlShortened() // Odświeżenie listy linków
		} catch (error) {
			setErrorMessage(error instanceof Error ? error.message : 'Nieznany błąd')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<form onSubmit={handleOnSubmit} className="mb-4 space-y-2">
				<Input
					value={url}
					onChange={e => setUrl(e.target.value)}
					className="h-12"
					type="url"
					placeholder="Wprowadź URL do skrócenia"
					required
				/>
				<Button className="w-full p-5 text-xl" type="submit" disabled={isLoading}>
					{isLoading ? 'Trwa skracanie...' : 'Skróć swój link'}
				</Button>
			</form>

			{/* ✅ **Wyświetlanie komunikatu o błędzie** */}
			{errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
		</div>
	)
}
