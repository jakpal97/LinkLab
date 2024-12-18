import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Copy } from 'lucide-react'

export default function Dashboard() {
	const [baseUrl, setBaseUrl] = useState('https://dentaltree.pl')
	const [utmSource, setUtmSource] = useState('')
	const [utmMedium, setUtmMedium] = useState('')
	const [utmCampaign, setUtmCampaign] = useState('')
	const [utmId, setUtmId] = useState('')
	const [utmContent, setUtmContent] = useState('')
	const [generatedUrl, setGeneratedUrl] = useState('')

	const handleGenerateUrl = (e: React.FormEvent) => {
		e.preventDefault()

		const params = new URLSearchParams()
		if (utmSource) params.set('utm_source', utmSource)
		if (utmMedium) params.set('utm_medium', utmMedium)
		if (utmCampaign) params.set('utm_campaign', utmCampaign)
		if (utmId) params.set('utm_id', utmId)
		if (utmContent) params.set('utm_content', utmContent)

		const fullUrl = `${baseUrl}?${params.toString()}`
		setGeneratedUrl(fullUrl)
	}

	const handleCopyToClipboard = () => {
		if (generatedUrl) {
			navigator.clipboard.writeText(generatedUrl).then(() => {
				alert('URL skopiowany do schowka!')
			})
		}
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-semibold">URL Builder</h1>
			<p className="mt-2 text-gray-600">Generuj linki UTM do analizy kampanii marketingowych.</p>

			
			<Dialog>
				<DialogTrigger asChild>
					<Button className="mt-4">Generuj  link</Button>
				</DialogTrigger>

				
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>URL Builder</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleGenerateUrl} className="space-y-4">
						<div>
							<label htmlFor="baseUrl" className="block text-sm font-medium">
								Podstawowy URL:
							</label>
							<Input
								type="text"
								id="baseUrl"
								value={baseUrl}
								onChange={e => setBaseUrl(e.target.value)}
								placeholder="https://dentaltree.pl"
							/>
						</div>

						<div>
							<label htmlFor="utm_source" className="block text-sm font-medium">
								utm_source:
							</label>
							<Input type="text" id="utm_source" value={utmSource} onChange={e => setUtmSource(e.target.value)} />
						</div>

						<div>
							<label htmlFor="utm_medium" className="block text-sm font-medium">
								utm_medium:
							</label>
							<Input type="text" id="utm_medium" value={utmMedium} onChange={e => setUtmMedium(e.target.value)} />
						</div>

						<div>
							<label htmlFor="utm_campaign" className="block text-sm font-medium">
								utm_campaign:
							</label>
							<Input type="text" id="utm_campaign" value={utmCampaign} onChange={e => setUtmCampaign(e.target.value)} />
						</div>

						<div>
							<label htmlFor="utm_id" className="block text-sm font-medium">
								utm_id:
							</label>
							<Input type="text" id="utm_id" value={utmId} onChange={e => setUtmId(e.target.value)} />
						</div>

						<div>
							<label htmlFor="utm_content" className="block text-sm font-medium">
								utm_content:
							</label>
							<Input type="text" id="utm_content" value={utmContent} onChange={e => setUtmContent(e.target.value)} />
						</div>

						<Button type="submit" className="w-full">
							Generuj URL
						</Button>
					</form>

					{generatedUrl && (
						<div className="mt-4">
							<h3 className="text-sm font-semibold">Wygenerowany URL:</h3>
							<div className="flex items-center gap-2 mt-2">
								<Input type="text" value={generatedUrl} readOnly className="text-lg h-12" />
								<Button variant="outline" onClick={handleCopyToClipboard} className="text-lg h-12">
									<Copy className="w-4 h-4 mr-2" /> Kopiuj
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
