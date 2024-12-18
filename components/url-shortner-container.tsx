'use client'
import { useState } from 'react'
import ShortForm from './short-form'
import UrlList from './url-list'
import Dashboard from './form-builder'

export default function UrlShortnerContainer() {
	const [activeComponent, setActiveComponent] = useState<'shortener' | 'builder'>('shortener')

	return (
		<div className="flex min-h-screen w-full ">
			<div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 py-4">
				<h1 className="text-3xl font-bold px-6">Welcome to URL multitool !!</h1>
			</div>
			{/* Sidebar */}
			<div className="w-1/5 bg-gray-100 p-6 shadow-md">
				<h2 className="text-2xl font-bold mb-6">Menu</h2>
				<ul className="space-y-4">
					<li>
						<button
							onClick={() => setActiveComponent('shortener')}
							className={`w-full text-left p-3 rounded ${
								activeComponent === 'shortener' ? 'bg-black text-white' : 'hover:bg-gray-200'
							}`}>
							URL Shortener
						</button>
					</li>
					<li>
						<button
							onClick={() => setActiveComponent('builder')}
							className={`w-full text-left p-3 rounded ${
								activeComponent === 'builder' ? 'bg-black text-white' : 'hover:bg-gray-200'
							}`}>
							URL Builder
						</button>
					</li>
				</ul>
			</div>

			<div className="w-full  flex flex-col align-center items-center justify-center bg-gray-50">
				<div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
					{activeComponent === 'shortener' && (
						<>
							<h1 className="text-3xl font-bold text-center mb-6 rounded">URL Shortener</h1>
							<ShortForm handleUrlShortened={() => {}} />
							<UrlList />
						</>
					)}
					{activeComponent === 'builder' && (
						<>
							<h1 className="text-3xl font-bold text-center pl-10 rounded">URL Builder</h1>
							<Dashboard />
						</>
					)}
				</div>
			</div>
		</div>
	)
}
