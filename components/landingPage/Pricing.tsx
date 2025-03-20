import React from 'react'

export const Pricing = () => {
	const packages = [
		{
			name: 'Trial',
			price: '0.00',
			period: '24 hours',
			description: 'Perfect for trying out our service',
			features: [
				'Up to 5 shortened links',
				'Basic analytics',
				'Standard support',
				'Basic link customization',
				'Click tracking',
			],
			isPopular: false,
			buttonText: 'Start Free Trial',
		},
		{
			name: 'Premium',
			price: '$12.00',
			period: 'per month',
			description: 'Unlimited access to all features',
			features: [
				'Unlimited shortened links',
				'Advanced analytics',
				'Priority support',
				'Custom branded domains',
				'Advanced link customization',
				'Detailed click analytics',
				'API access',
				'Team collaboration',
			],
			isPopular: true,
			buttonText: 'Get Premium',
		},
	]

	return (
		<div  className="bg-black py-[72px] sm:py-24">
			<div className="w-full  max-w-5xl mx-auto px-4 py-12">
				<h2 id="price-section" className="text-3xl font-bold text-center text-white mb-12">Choose Your Plan</h2>

				<div className="grid md:grid-cols-2 gap-8">
					{packages.map((pkg, index) => (
						<div
							key={index}
							className={`rounded-xl p-6 backdrop-blur-sm relative ${
								pkg.isPopular
									? 'bg-purple-800 bg-opacity-30 border border-purple-400'
									: 'bg-purple-900 bg-opacity-20 border border-purple-700'
							}`}>
							{pkg.isPopular && (
								<div className="absolute -top-3 right-6 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
									MOST POPULAR
								</div>
							)}

							<h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
							<div className="flex items-baseline mb-4">
								<span className="text-4xl font-bold text-white">{pkg.price}</span>
								<span className="text-sm text-purple-200 ml-2">{pkg.period}</span>
							</div>

							<p className="text-purple-200 mb-6">{pkg.description}</p>

							<ul className="mb-8 space-y-3">
								{pkg.features.map((feature, i) => (
									<li key={i} className="flex items-start">
										<svg
											className="w-5 h-5 text-purple-300 mr-2 mt-0.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
										</svg>
										<span className="text-white">{feature}</span>
									</li>
								))}
							</ul>

							<button
								className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
									pkg.isPopular
										? 'bg-purple-500 hover:bg-purple-400 text-white'
										: 'bg-purple-800 hover:bg-purple-700 text-white'
								}`}>
								{pkg.buttonText}
							</button>
						</div>
					))}
				</div>

				<div className="text-center mt-8 text-purple-300 text-sm">
					All plans include a 24 hour free trial. No credit card required.
				</div>
			</div>
		</div>
	)
}
