import { useState } from 'react'

export default function PostGenerator() {
	const [topic, setTopic] = useState('')
	const [tone, setTone] = useState('informative')
	const [generatedPost, setGeneratedPost] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleGeneratePost = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const response = await fetch('/api/post-generator', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ topic, tone }),
			})

			if (!response.ok) {
				throw new Error('Failed to generate post')
			}

			const data = await response.json()
			setGeneratedPost(data.post)
		} catch (error) {
			console.error(error)
			alert('Something went wrong. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-semibold">Social Media Post Generator</h1>
			<p className="mt-2 text-gray-600">Generate creative posts for Facebook and Instagram using AI.</p>

			<form onSubmit={handleGeneratePost} className="space-y-4 mt-4">
				<div>
					<label htmlFor="topic" className="block text-sm font-medium">
						Post Topic
					</label>
					<input
						type="text"
						id="topic"
						value={topic}
						onChange={e => setTopic(e.target.value)}
						placeholder="Enter the topic of the post (e.g., product promotion)"
						className="w-full px-3 py-2 border rounded"
						required
					/>
				</div>

				<div>
					<label htmlFor="tone" className="block text-sm font-medium">
						Post Tone
					</label>
					<select
						id="tone"
						value={tone}
						onChange={e => setTone(e.target.value)}
						className="w-full px-3 py-2 border rounded">
						<option value="informative">Informative</option>
						<option value="friendly">Friendly</option>
						<option value="promotional">Promotional</option>
						<option value="humorous">Humorous</option>
					</select>
				</div>

				<button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded" disabled={isLoading}>
					{isLoading ? 'Generating...' : 'Generate Post'}
				</button>
			</form>

			{generatedPost && (
				<div className="mt-4">
					<h2 className="text-lg font-semibold">Generated Post:</h2>
					<p className="mt-2 p-4 border rounded bg-gray-100 whitespace-pre-line">{generatedPost}</p>
				</div>
			)}
		</div>
	)
}
