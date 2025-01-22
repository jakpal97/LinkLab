'use client'
import { useState, useEffect } from 'react'
import ShortForm from './short-form'
import UrlList from './url-list'
import Dashboard from './form-builder'
import PostGenerator from './post-generator'

export default function UrlShortnerContainer() {
	const [activeComponent, setActiveComponent] = useState<'shortener' | 'builder' | 'generator'>('shortener')
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) setDarkMode(savedTheme === 'dark')
	}, [])

	const toggleDarkMode = () => {
		setDarkMode(prev => !prev)
		localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
	}

	return (
		<div
			className={`${
				darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
			} flex min-h-screen w-full transition-colors duration-300`}>
			<div className="fixed top-0 left-0 w-full shadow-md z-10 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}">
				<div className="flex justify-between px-6">
					<img src='./logoLinkLab-removebg-preview.png' alt='LinkLab' className='h-12'></img>
					<button
						onClick={toggleDarkMode}
						className="px-4 py-2 border rounded-lg ${darkMode ? 'border-white' : 'border-black'}">
						{darkMode ? 'Light Mode' : 'Dark Mode'}
					</button>
				</div>
			</div>

			{/* Sidebar */}
			<div className={`w-1/5 p-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
				<h2 className="text-2xl font-bold mb-6"></h2>
				<ul className="space-y-4 pt-20">
					<li>
						<button
							onClick={() => setActiveComponent('shortener')}
							className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${
								activeComponent === 'shortener' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
							}
                            `}>
							URL Shortener
						</button>
					</li>
					<li>
						<button
							onClick={() => setActiveComponent('builder')}
							className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${
								activeComponent === 'builder' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
							}
                            `}>
							URL Builder
						</button>
					</li>
					<li>
						<button
							onClick={() => setActiveComponent('generator')}
							className={`w-full text-left p-3 rounded-lg transition-colors duration-300 hidden ${
								activeComponent === 'generator' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
							}
                            `}>
							Post Generator
						</button>
					</li>
				</ul>
			</div>

			<div className="w-4/5 flex flex-col items-center justify-center">
				<div className={`w-full max-w-4xl p-10 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
					{activeComponent === 'shortener' && (
						<>
							<h1 className="text-3xl font-bold text-center mb-6">URL Shortener</h1>
							<ShortForm handleUrlShortened={() => {}} />
							<UrlList />
						</>
					)}
					{activeComponent === 'builder' && (
						<>
							<h1 className="text-3xl font-bold text-center mb-6">Zbuduj swój własny URL !</h1>
							<Dashboard />
						</>
					)}
					{activeComponent === 'generator' && (
						<>
							<h1 className="text-3xl font-bold text-center mb-6">Wygeneruj Post na social media !</h1> 
							<PostGenerator/>
						</>
					)}
				</div>
				
			</div>
		</div>
	)
}
