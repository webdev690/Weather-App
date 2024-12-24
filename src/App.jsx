import React, { useState } from "react"

const Weather = () => {
  const [city, setCity] = useState("") 
  const [weatherData, setWeatherData] = useState(null) 
  const [isLoading, setIsLoading] = useState(false) 
  const [error, setError] = useState(null) 

  const fetchWeather = async () => {
    if (!city) return

    const apiKey = "your_api_key" 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=03ca64e2033e4cbeda039ef24cb05172`

    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("City not found or API error")
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setWeatherData(null)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeather() // Trigger fetchWeather on Enter key
    }
  }

  return (
    <div className="text-center">
      <h1 className="text-center text-4xl font-bold">Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress} // Listen for Enter key on input
      />
      <button
        disabled={!city}
        onClick={fetchWeather}
        className="border cursor-pointer border-black rounded text-white bg-slate-600 p-1"
      >
        Get Weather
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && !error && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°K</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default Weather
