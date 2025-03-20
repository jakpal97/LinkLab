import { Banner } from '@/components/landingPage/Banner'

import { Navbar } from '@/components/landingPage/Navbar'
import { Hero } from '@/components/landingPage/Hero'
import { Features } from '@/components/landingPage/Features'
import { ProductShowcase } from '@/components/landingPage/ProductShowcase'
import { FAQs } from '@/components/landingPage/FAQs'
import { CallToAction } from '@/components/landingPage/CallToAction'
import { Footer } from '@/components/landingPage/Footer'
import { Pricing } from '@/components/landingPage/Pricing'

export default function LandingPage() {
	return (
		<>
			<Banner />
			<Navbar />
			<Hero />
			<Features />
			<ProductShowcase />
			<FAQs />
			<Pricing />
			<CallToAction />
			<Footer />
		</>
	)
}
