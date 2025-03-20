'use client'
import messageImage from '../../public/message.png'
import chartImage from '../../public/emojistar.png'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useScroll, useTransform, motion, useAnimation } from 'framer-motion'

export const CallToAction = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end end'],
	})

	const translateY = useTransform(scrollYProgress, [0, 1], [-80, 80])
	const bounceControls = useAnimation()
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange(value => {
			if (value === 1) {
				bounceControls.start({
					y: [-20, 20, -10, 10, 0],
					transition: { duration: 0.9, repeat: 0 },
				})
			}
		})

		return () => unsubscribe()
	}, [scrollYProgress, bounceControls])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email.includes('@')) {
			setMessage('Please enter a valid email address.')
			return
		}

		setLoading(true)
		setMessage('')

		const res = await fetch('/api/send-email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		})

		if (res.ok) {
			setMessage('Email sent successfully! Check your inbox.')
			setEmail('')
		} else {
			setMessage('Error sending email. Please try again.')
		}

		setLoading(false)
	}

	return (
		<div id="cta-section" className="bg-black text-white py-[72px] sm:py-24 text-center" ref={containerRef}>
			<div className="container max-w-xl relative">
				<motion.div style={{ translateY }} animate={bounceControls}>
					<Image src={messageImage} alt="message icon" className="absolute top-[90px] left-[calc(100%+100px)]" />
				</motion.div>
				<motion.div style={{ translateY }} animate={bounceControls}>
					<Image src={chartImage} alt="chart icon" className="absolute top-[-90px] right-[calc(100%+100px)]" />
				</motion.div>
				<h2 className="font-bold text-5xl tracking-tighter sm:text-6xl">Get free trial of our app</h2>
				<p className="text-xl text-white/70 mt-5">
					Celebrate the joy of shortening links with our app and unlock the power of effortless link management
				</p>
				<form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-2.5 max-w-sm mx-auto sm:flex-row">
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className="h-12 bg-white/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] sm:flex-1"
					/>
					<button type="submit" className="bg-white text-black h-12 rounded-lg px-5" disabled={loading}>
						{loading ? 'Sending...' : 'Get Started'}
					</button>
				</form>
				{message && <p className="mt-3 text-sm">{message}</p>}
			</div>
		</div>
	)
}
