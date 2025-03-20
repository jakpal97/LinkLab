'use client'
import { useRef } from 'react'
import appScreen from '../../public/dashboard.png'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export const ProductShowcase = () => {
	const appImage = useRef<HTMLImageElement>(null)
	const { scrollYProgress } = useScroll({
		target: appImage,
		offset: ['start end', 'end end'],
	})
	const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0])
	const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1])
	return (
		<div className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CA8] py-[72px] sm:py-24">
			<div className="container">
				<h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter ">Take a look at our app</h2>
				<div className="max-w-xl mx-auto">
					<p className="text-xl text-center text-white/70 mt-5">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi animi delectus iure expedita veniam
						voluptatem? Laboriosam porro ex fugiat molestiae.
					</p>
				</div>
				<motion.div style={{ opacity: opacity, rotateX: rotateX, transformPerspective: '800px' }}>
					<Image src={appScreen} alt="Ekran główny wyglądu apliakcji" className="mt-14 mx-auto" ref={appImage} />
				</motion.div>
			</div>
		</div>
	)
}
