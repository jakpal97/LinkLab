import { Feature } from './Feature'
import { FaHammer, FaLink, FaChartBar } from 'react-icons/fa'
const features = [
	{
		title: 'Advanced Analytics',
		description:
			'Track clicks, analyze visitor demographics, and monitor link performance in real-time with detailed statistics and visual reports.',
		icon: <FaChartBar className="w-8 h-8" />,
	},
	{
		title: 'Smart Link Shortening',
		description:
			'Create concise, memorable links instantly. Customize your URLs with branded domains and custom slugs for better recognition.',
		icon: <FaLink className="w-8 h-8" />,
	},
	{
		title: 'Link Management',
		description:
			'Organize, edit, and manage all your shortened links from one dashboard. Group links by campaigns and track their performance easily.',
		icon: <FaHammer className="w-8 h-8" />,
	},
]
export const Features = () => {
	return (
		<div className="bg-black  text-white  py-[72px] sm:py-24">
			<div className="container">
				<h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
					Everything you need in one place
				</h2>
				<div className="max-w-xl mx-auto">
					<p className="text-center mt-5 text-xl text-white/70">
						Transform your long URLs into powerful marketing tools. Get detailed insights and manage your links with our
						advanced tools.
					</p>
				</div>
				<div className="mt-16 flex flex-col sm:flex-row gap-4">
					{features.map(({ title, description, icon }) => (
						<Feature key={title} title={title} description={description} icon={icon} />
					))}
				</div>
			</div>
		</div>
	)
}
