'use client'
import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface ShortenFormProps {
	handleUrlShortened: () => void
}
export default function ShortForm({handleUrlShortened}: ShortenFormProps) {
	const [url, setUrl] = useState<string>('') 
	const [isLoading, setIsLoading]= useState<boolean>(false)

	const handleOnSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const response = await fetch('/api/shorten', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({  url }), 
			})


			await response.json()
			setUrl('')
			handleUrlShortened()
			
			
		}catch(error){
			console.log(error)

		}finally{
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
		</div>
	)
}
