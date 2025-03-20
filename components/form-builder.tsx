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
				alert('URL copied to clipboard!')
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
						Generate UTM links for marketing campaign analysis.<br></br> Hover over the icon
						<span className="inline-flex items-center ml-1">
							<Info className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-black'}`} />
						</span>
						to check details.
					</p>

					<form onSubmit={handleGenerateUrl} className="space-y-4 mt-4">
						<div>
							<label htmlFor="baseUrl" className="block font-medium flex items-center gap-2">
								Base URL:
								<Tooltip>
									<TooltipTrigger>
										<Info className="w-5 h-5 text-gray-500 cursor-pointer" />
									</TooltipTrigger>
									<TooltipContent className="text-sm">
										The main URL to which UTM parameters will be added.
									</TooltipContent>
								</Tooltip>
							</label>
							<Input
								type="text"
								id="baseUrl"
								value={baseUrl}
								onChange={e => setBaseUrl(e.target.value)}
								placeholder="Enter the base URL"
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
									placeholder="Traffic source"
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
									placeholder="Campaign channel"
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
									placeholder="Campaign name"
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
									placeholder="Campaign ID"
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
								placeholder="Campaign content"
							/>
						</div>

						<Button type="submit" className="w-full text-xl h-12 mt-4">
							Generate URL
						</Button>
					</form>

					{generatedUrl && (
						<div className="mt-4">
							<h3 className="font-semibold text-xl">Generated URL:</h3>
							<div className="flex items-center gap-2 mt-2">
								<Input type="text" value={generatedUrl} readOnly className="text-xl h-12" />
								<Button variant="outline" onClick={handleCopyToClipboard} className="text-xl h-12">
									<Copy className="w-4 h-4 mr-2" /> Copy
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</TooltipProvider>
	)
}
