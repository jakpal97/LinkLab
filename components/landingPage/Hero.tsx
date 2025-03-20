'use client'
import ArrowIcon from '../../icons/arrow-w.svg'
import cursorImage from '../../public/cursor.png'
import chainImage from '../../public/chain.png'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaArrowCircleRight } from 'react-icons/fa'

export const Hero = () => {
	const scrollToCallToAction = () => {
		const element = document.getElementById('cta-section')
		element?.scrollIntoView({ behavior: 'smooth' })
	}
	return (
		<div className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip">
			<div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] ld:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2  bg-[radial-gradient(closest-side,#000_80%,#9560EB)] top-[calc(100%-120px)] sm:top[calc(100%-130px)]"></div>
			<div className="container relative">
				<div className="flex align-center justify-center">
					<a href="#" className=" inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30">
						<span className="bg-[linear-gradient(to_right,#0D92F4,#77CDFF,#F95454,#C62E2E)]  text-transparent bg-clip-text [-webkit-background-clip:text] ">
							New Features are here !
						</span>
						<span className="inline-flex items-center gap-1">
							<span className="">Read more</span>
							<ArrowIcon />
						</span>
					</a>
				</div>
				<div className="flex justify-center mt-8">
					<div className="inline-flex relative">
						<h1 className="text-7xl sm:text-9xl font-bold trancting-tighter text-center  inline-flex">
							New way to
							<br /> shorten your URL{"'"}s
						</h1>
						<motion.div
							className="absolute left-[0px] top-[250px]  md:left-[-50px] max-[843px]:hidden  "
							drag
							dragSnapToOrigin>
							<Image
								src={cursorImage}
								height="200"
								width="200"
								alt="cursor image"
								className="max-w-none"
								draggable="false"
							/>
						</motion.div>
						<motion.div className="absolute right-[-20px] top-[-130px] hidden lg:inline " drag dragSnapToOrigin>
							<Image
								src={chainImage}
								alt="chain image"
								height="300"
								width="300"
								className="max-w-none "
								draggable="false"
							/>
						</motion.div>
					</div>
				</div>
				<div className="flex justify-center">
					<p className="text-center text-xl mt-8 max-w-lg">
						🚀 Shorten, Track, Optimize! Turn long, clunky URLs into powerful marketing assets. Monitor clicks in real
						time, gain valuable insights, and take control of your links like never before.
					</p>
				</div>
				<div className="flex flex-col justify-center mt-8 max-w-[250px] mx-auto">
					<button
						onClick={scrollToCallToAction}
						className="bg-white text-black py-3 px-5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-black hover:text-white">
						<FaArrowCircleRight className="text-xl" />
						<span>Get started today!</span>
					</button>
				</div>
			</div>
		</div>
	)
}
