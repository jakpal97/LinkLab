'use client'
import { useState } from 'react'
import PlusIcon from '../../icons/plus.svg'

import MinusIcon from '../../icons/minus.svg'
import { AnimatePresence, motion } from 'framer-motion'

const items = [
	{
		question: 'How does the URL shortening service work?',
		answer:
			'Our service takes your long URL and creates a shortened, easy-to-share version. When someone clicks the shortened link, they are automatically redirected to your original URL. All clicks are tracked and analyzed in real-time.',
	},
	{
		question: 'Can I use my own domain for shortened links?',
		answer:
			"Yes! Premium users can use their own custom domains for branded links. After upgrading to Premium, you'll receive detailed instructions on how to configure your domain's DNS settings and integrate it with our service. This allows you to create shortened links using your brand's domain (e.g., yourdomain.com/short-link) instead of our default domain.",
	},
	{
		question: 'What features are included in the free trial?',
		answer:
			'The 24-hour free trial includes access to basic link shortening features, allowing you to create up to 5 shortened links, basic analytics tracking, and standard click monitoring. No credit card is required to start your trial.',
	},
	{
		question: 'What analytics data do you provide?',
		answer:
			'Our analytics system tracks click counts, visitor locations, devices used, referral sources, and peak usage times. Premium users get access to advanced metrics including detailed visitor demographics and custom reporting tools.',
	},
	{
		question: 'Can I customize my shortened URLs?',
		answer:
			'Yes! Premium users can create custom branded links using their own domain name and customize the URL slugs to make them more memorable and on-brand. Free trial users can use our standard URL shortening format.',
	},
	{
		question: 'Is there a limit to how many links I can create?',
		answer:
			'Free trial users can create up to 5 shortened links. Premium users have unlimited link creation capability and can manage all their links from a single dashboard.',
	},
	{
		question: 'How long do shortened links remain active?',
		answer:
			'All shortened links remain active indefinitely as long as your account is active. Premium users have guaranteed link persistence and can also set expiration dates for temporary links if desired.',
	},
]
const AcordeonItrem = ({ question, answer }: { question: string; answer: string }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className="py-7 border-b border-white/30" onClick={() => setIsOpen(!isOpen)}>
			<div className="flex items-center  ">
				<span className="flex-1 text-lg font-bold">{question}</span>
				{isOpen ? <MinusIcon /> : <PlusIcon />}
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0, marginTop: 0 }}
						animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
						exit={{ opacity: 0, height: 0, marginTop: 0 }}>
						{answer}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export const FAQs = () => {
	return (
		<div className="bg-black text-white py-[72px] sm:py-24 bg-gradient-to-b from-[#5D2CA8] to-black">
			<div className="container">
				<h2 className="text-center text-5xl sm:text-6xl sm-max-w-[800px] mx-auto font-bold tracking-tighter">
					Frequently asked questions
				</h2>
				<div className="mt-12 max-w-[800px] mx-auto">
					{items.map(({ question, answer }) => (
						<AcordeonItrem key={question} question={question} answer={answer} />
					))}
				</div>
			</div>
		</div>
	)
}
