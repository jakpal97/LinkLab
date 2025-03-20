import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Info } from 'lucide-react'

interface UrlBuilderProps {
	darkMode: boolean
}

export default function UrlBuilder({ darkMode }: UrlBuilderProps) {
	const [baseUrl, setBaseUrl] = useState('')
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
		<TooltipProvider>
			<div className="flex justify-center items-center">
				<div
					className={`shadow-lg rounded-lg p-6 w-full max-w-3xl ${
						darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
					}`}>
					<h1 className="text-4xl font-semibold text-center">URL Builder</h1>
					<p className="py-6 text-center">
						Generuj linki UTM do analizy kampanii marketingowych.<br></br> Najedź na ikonkę
						<span className="inline-flex items-center ml-1">
							<Info className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-black'}`} />
						</span>
						aby sprawdzić szczegóły.
					</p>

					<form onSubmit={handleGenerateUrl} className="space-y-4 mt-4">
						<div>
							<label htmlFor="baseUrl" className="block font-medium flex items-center gap-2">
								Podstawowy URL:
								<Tooltip>
									<TooltipTrigger>
										<Info className="w-5 h-5 text-gray-500 cursor-pointer" />
									</TooltipTrigger>
									<TooltipContent className="text-sm">
										Podstawowy adres URL do którego zostaną dodane parametry UTM.
									</TooltipContent>
								</Tooltip>
							</label>
							<Input
								type="text"
								id="baseUrl"
								value={baseUrl}
								onChange={e => setBaseUrl(e.target.value)}
								placeholder="Wprowadź podstawowy URL"
								required
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="utm_source" className="block font-medium">
									utm_source:
								</label>
								<Input
									type="text"
									id="utm_source"
									value={utmSource}
									onChange={e => setUtmSource(e.target.value)}
									placeholder="Źródło ruchu"
								/>
							</div>
							<div>
								<label htmlFor="utm_medium" className="block font-medium">
									utm_medium:
								</label>
								<Input
									type="text"
									id="utm_medium"
									value={utmMedium}
									onChange={e => setUtmMedium(e.target.value)}
									placeholder="Kanał kampanii"
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="utm_campaign" className="block font-medium">
									utm_campaign:
								</label>
								<Input
									type="text"
									id="utm_campaign"
									value={utmCampaign}
									onChange={e => setUtmCampaign(e.target.value)}
									placeholder="Nazwa kampanii"
								/>
							</div>
							<div>
								<label htmlFor="utm_id" className="block font-medium">
									utm_id:
								</label>
								<Input
									type="text"
									id="utm_id"
									value={utmId}
									onChange={e => setUtmId(e.target.value)}
									placeholder="ID kampanii"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="utm_content" className="block font-medium">
								utm_content:
							</label>
							<Input
								type="text"
								id="utm_content"
								value={utmContent}
								onChange={e => setUtmContent(e.target.value)}
								placeholder="Treść kampanii"
							/>
						</div>

						<Button type="submit" className="w-full text-xl h-12 mt-4">
							Generuj swój URL
						</Button>
					</form>

					{generatedUrl && (
						<div className="mt-4">
							<h3 className="font-semibold text-xl">Wygenerowany URL:</h3>
							<div className="flex items-center gap-2 mt-2">
								<Input type="text" value={generatedUrl} readOnly className="text-xl h-12" />
								<Button variant="outline" onClick={handleCopyToClipboard} className="text-xl h-12">
									<Copy className="w-4 h-4 mr-2" /> Kopiuj
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</TooltipProvider>
	)
}
