import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type ClicksPerDay = {
	date: string
	count: number
}

type TrafficSource = {
	referrer: string
	count: number
}

type DashboardData = {
	clicksPerDay: ClicksPerDay[]
	totalClicks: number
	trafficSources: TrafficSource[]
}

export default function DashboardChart() {
	const [data, setData] = useState<DashboardData | null>(null)
	const [loading, setLoading] = useState(true)
	const [isDarkMode, setIsDarkMode] = useState(true)

	useEffect(() => {
		// Check local storage for theme preference
		const savedTheme = localStorage.getItem('theme')
		setIsDarkMode(savedTheme ? savedTheme === 'dark' : true)

		fetch('/api/dashboard')
			.then(res => res.json())
			.then((data: DashboardData) => {
				console.log('Pobrane dane:', data)
				setData(data)
				setLoading(false)
			})
			.catch(err => {
				console.error('Błąd pobierania danych Dashboardu:', err)
				setLoading(false)
			})
			
		// Listen for theme changes
		const handleStorageChange = () => {
			const currentTheme = localStorage.getItem('theme')
			setIsDarkMode(currentTheme === 'dark')
		}
		
		window.addEventListener('storage', handleStorageChange)
		return () => window.removeEventListener('storage', handleStorageChange)
	}, [])

	if (loading) {
		return <div className={`p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Ładowanie danych...</div>
	}

	if (!data || data.totalClicks === 0) {
		return (
			<div className={`p-6 ${isDarkMode ? 'bg-purple-900 bg-opacity-20 text-white' : 'bg-white text-black'} rounded-lg shadow-md w-full min-h-[300px]`}>
				<h2 className="text-2xl font-bold mb-4">Brak danych do wyświetlenia</h2>
				<p>Kliknij w skrócony link, aby zapisać kliknięcia i zobaczyć statystyki.</p>
			</div>
		)
	}

	return (
		<div className={`max-w-7xl mx-auto w-full p-6 ${isDarkMode ? 'text-white' : 'bg-white text-black'} rounded-lg`}>
			<h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>
			<p className="mb-4">
				<span className="font-bold">📅 Łączna liczba kliknięć:</span> {data.totalClicks}
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Wykres słupkowy kliknięć per dzień */}
				<div className={`rounded-lg p-4 ${isDarkMode ? 'bg-white bg-opacity-10' : 'border shadow-md'}`}>
					<h2 className="text-xl font-bold mb-2">📆 Kliknięcia na dzień</h2>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data.clicksPerDay} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
							<XAxis 
								dataKey="date" 
								stroke={isDarkMode ? "#d1d5db" : "#000"} 
							/>
							<YAxis 
								stroke={isDarkMode ? "#d1d5db" : "#000"} 
							/>
							<Tooltip 
								contentStyle={{ 
									backgroundColor: isDarkMode ? '#4a1b83' : '#fff', 
									color: isDarkMode ? '#fff' : '#000',
									border: isDarkMode ? '1px solid #bb86fc' : '1px solid #ccc'
								}} 
								cursor={{ fill: isDarkMode ? 'rgba(187, 134, 252, 0.2)' : '#f0f0f0' }} 
							/>
							<Bar 
								dataKey="count" 
								fill={isDarkMode ? "#bb86fc" : "#8884d8"} 
								barSize={50} 
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Źródła ruchu */}
				<div className={`rounded-lg p-4 ${isDarkMode ? 'bg-white bg-opacity-10' : 'border shadow-md'}`}>
					<h2 className="text-xl font-bold mb-2">🌍 Źródła ruchu</h2>
					{data?.trafficSources && data.trafficSources.length > 0 ? (
						data.trafficSources.map((source: TrafficSource) => (
							<div 
								key={source.referrer} 
								className={`flex justify-between py-1 ${isDarkMode ? 'border-b border-purple-400 border-opacity-30' : 'border-b'}`}
							>
								<span>{source.referrer}</span>
								<span className="font-bold">{source.count} kliknięć</span>
							</div>
						))
					) : (
						<p className={isDarkMode ? "text-gray-300" : "text-gray-500"}>Brak danych o źródłach ruchu</p>
					)}
				</div>
			</div>
            
            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => (window.location.href = '/api/export')}
                    className={`${
                        isDarkMode 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white px-4 py-2 rounded-lg transition-colors duration-300`}>
                    📥 Pobierz CSV
                </button>
            </div>
		</div>
	)
}