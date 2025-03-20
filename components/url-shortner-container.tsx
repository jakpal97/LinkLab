'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SignOutButton } from '@clerk/nextjs'
import { Home, Link2, Settings, LogOut, Sun, Moon, Download } from 'lucide-react'
import DashboardChart from './dashboard'
import UrlBuilder from './form-builder'
import UrlList from './url-list'
import ShortForm from './short-form'

export default function SidebarContainer() {
	const [activeComponent, setActiveComponent] = useState('dashboard')
	const [darkMode, setDarkMode] = useState(true)
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

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
				darkMode ? 'bg-gradient-to-br from-purple-900 to-indigo-900 text-white' : 'bg-white text-black'
			} flex h-screen w-full transition-colors duration-300`}>
			{/* Sidebar */}
			<div
				className={`fixed left-0 top-0 h-full flex flex-col transition-all duration-300 ${
					isSidebarExpanded ? 'w-48' : 'w-16'
				} ${darkMode ? 'bg-purple-950 bg-opacity-80' : 'bg-gray-100'}`}
				onMouseEnter={() => setIsSidebarExpanded(true)}
				onMouseLeave={() => setIsSidebarExpanded(false)}>
				<div className="flex items-center p-3">
					<Image src="/logoLinkLab.png" alt="Logo" width={32} height={32} priority />
					{isSidebarExpanded && <span className="ml-3 font-bold">LinkLab</span>}
				</div>
				<ul className="mt-10 space-y-4">
					<li>
						<button
							onClick={() => setActiveComponent('dashboard')}
							className={`flex items-center p-3 w-full rounded-lg transition-all duration-300 ${
								activeComponent === 'dashboard' ? (darkMode ? 'bg-purple-600' : 'bg-blue-500 text-white') : ''
							}`}>
							<Home className="w-6 h-6" />
							{isSidebarExpanded && <span className="ml-3">Dashboard</span>}
						</button>
					</li>
					<li>
						<button
							onClick={() => setActiveComponent('shortener')}
							className={`flex items-center p-3 w-full rounded-lg transition-all duration-300 ${
								activeComponent === 'shortener' ? (darkMode ? 'bg-purple-600' : 'bg-blue-500 text-white') : ''
							}`}>
							<Link2 className="w-6 h-6" />
							{isSidebarExpanded && <span className="ml-3">URL Shortener</span>}
						</button>
					</li>
					<li>
						<button
							onClick={() => setActiveComponent('builder')}
							className={`flex items-center p-3 w-full rounded-lg transition-all duration-300 ${
								activeComponent === 'builder' ? (darkMode ? 'bg-purple-600' : 'bg-blue-500 text-white') : ''
							}`}>
							<Settings className="w-6 h-6" />
							{isSidebarExpanded && <span className="ml-3">URL Builder</span>}
						</button>
					</li>
				</ul>
				<div className="mt-auto space-y-4 p-3">
					<button
						onClick={toggleDarkMode}
						className={`flex items-center p-3 w-full rounded-lg transition-all duration-300 ${
							darkMode ? 'text-white hover:bg-purple-700' : 'text-black hover:bg-gray-200'
						}`}>
						{darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
						{isSidebarExpanded && <span className="ml-3">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
					</button>
					<SignOutButton redirectUrl="/">
						<button
							className={`flex items-center p-3 w-full rounded-lg transition-all duration-300 ${
								darkMode ? 'text-white hover:bg-red-600' : 'text-black hover:bg-red-200'
							}`}>
							<LogOut className="w-6 h-6" />
							{isSidebarExpanded && <span className="ml-3">Wyloguj się</span>}
						</button>
					</SignOutButton>
				</div>
			</div>
			{/* Główna zawartość */}
			<div className="ml-16 w-full p-6">
				{activeComponent === 'dashboard' && <DashboardChart darkMode={darkMode} />}
				{activeComponent === 'shortener' && (
					<div>
						<ShortForm />
						<UrlList refresh={true} />
					</div>
				)}
				{activeComponent === 'builder' && (
					<div>
						<h1 className="text-2xl font-bold mb-4">URL Builder</h1>
						<UrlBuilder darkMode={darkMode} />
					</div>
				)}
			</div>
		</div>
	)
}
