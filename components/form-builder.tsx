import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip' // Upewnij się, że ten import jest prawidłowy
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Info } from 'lucide-react'

export default function Dashboard() {
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
			<div className="p-6">
				<h1 className="text-2xl font-semibold">URL Builder</h1>
				<p className="mt-2 text-gray-600 flex items-center gap-1">
					Generuj linki UTM do analizy kampanii marketingowych. Najedź na ikonkę
					<span className="inline-flex items-center ml-1">
						<Info className="w-5 h-5 text-black" />
					</span>
					aby sprawdzić szczegóły.
				</p>

				<form onSubmit={handleGenerateUrl} className="space-y-4 mt-4">
					<div>
						<label htmlFor="baseUrl" className="block  font-medium flex items-center gap-2">
							Podstawowy URL:
							<Tooltip>
								<TooltipTrigger>
									<span className="text-gray-500 cursor-pointer ">
										<Info className="w-5 h-5 text-black " />
									</span>
								</TooltipTrigger>
								<TooltipContent className="text-xl">
									<p>Podstawowy adres URL do którego zostaną dodane parametry UTM.</p>
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

					<div>
						<label htmlFor="utm_source" className="block  font-medium flex items-center gap-2">
							utm_source:
							<Tooltip>
								<TooltipTrigger>
									<span className="text-gray-500 cursor-pointer">
										<Info className="w-5 h-5 text-black" />
									</span>
								</TooltipTrigger>
								<TooltipContent className="text-xl">
									<p>Źródło ruchu, np. Google, newsletter, Facebook.</p>
								</TooltipContent>
							</Tooltip>
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
						<label htmlFor="utm_medium" className="block font-medium flex items-center gap-2">
							utm_medium:
							<Tooltip>
								<TooltipTrigger>
									<span className="text-gray-500 cursor-pointer">
										<Info className="w-5 h-5 text-black" />
									</span>
								</TooltipTrigger>
								<TooltipContent className="text-xl">
									<p>Rodzaj kanału promocji, np. email, CPC (koszt za kliknięcie), social media.</p>
								</TooltipContent>
							</Tooltip>
						</label>
						<Input
							type="text"
							id="utm_medium"
							value={utmMedium}
							onChange={e => setUtmMedium(e.target.value)}
							placeholder="Kanał kampanii"
						/>
					</div>

					<div>
						<label htmlFor="utm_campaign" className="block font-medium flex items-center gap-2">
							utm_campaign:
							<Tooltip>
								<TooltipTrigger>
									<span className="text-gray-500 cursor-pointer">
										<Info className="w-5 h-5 text-black" />
									</span>
								</TooltipTrigger>
								<TooltipContent className="text-xl">
									<p>Nazwa kampanii marketingowej, np. promocja-wiosna.</p>
								</TooltipContent>
							</Tooltip>
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
						<label htmlFor="utm_id" className="block font-medium flex items-center gap-2">
							utm_id:
							<Tooltip>
								<TooltipTrigger>
									<span className="text-gray-500 cursor-pointer">
										<Info className="w-5 h-5 text-black" />
									</span>
								</TooltipTrigger>
								<TooltipContent className="text-xl">
									<p>Unikalny identyfikator kampanii reklamowej. Opcjonalne.</p>
								</TooltipContent>
							</Tooltip>
						</label>
						<Input
							type="text"
							id="utm_id"
							value={utmId}
							onChange={e => setUtmId(e.target.value)}
							placeholder="ID kampanii"
						/>
					</div>

					<div>
						<label htmlFor="utm_content" className="block font-medium flex items-center gap-2">
							utm_content:
							<Tooltip>
								<TooltipTrigger>
									<span className="text-gray-500 cursor-pointer">
										<Info className="w-5 h-5 text-black" />
									</span>
								</TooltipTrigger>
								<TooltipContent className="text-xl">
									<p>Treść lub wariant reklamy, np. różne banery, linki A/B testowe.</p>
								</TooltipContent>
							</Tooltip>
						</label>
						<Input
							type="text"
							id="utm_content"
							value={utmContent}
							onChange={e => setUtmContent(e.target.value)}
							placeholder="Treść kampanii"
						/>
					</div>

					<Button type="submit" className="w-full text-xl h-12">
						Generuj swój URL
					</Button>
				</form>

				{generatedUrl && (
					<div className="mt-4">
						<h3 className=" font-semibold text-xl">Wygenerowany URL:</h3>
						<div className="flex items-center gap-2 mt-2">
							<Input type="text" value={generatedUrl} readOnly className="text-xl h-12" />
							<Button variant="outline" onClick={handleCopyToClipboard} className="text-xl h-12">
								<Copy className="w-4 h-4 mr-2" /> Kopiuj
							</Button>
						</div>
					</div>
				)}
			</div>
		</TooltipProvider>
	)
}
