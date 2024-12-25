import React from "react"
import { useState } from "react"

const App = () => {
  const [city, Setcity] = useState("")
  const [Temp, SetTemp] = useState(null)
  const [Weather, setWeather] = useState(null)
  const [Error, setError] = useState(null)
  const fetchData = async (city) => {
    if (!city) return
    const API_key = "03ca64e2033e4cbeda039ef24cb05172"
    try {
      const respone = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
      )
      const json = await respone.json()
      setWeather(json)
    } catch (error) {
      throw new error()
    }
  }
  const Handlekey = (event) => {
    if (event.key === "Enter") {
      fetchData(city)
    }
  }
  // fetchData("london")
  return (
    <>
      <input
        type="text"
        onChange={(e) => Setcity(e.target.value)}
        value={city}
        onKeyPress={Handlekey}
      />
      <button
        onClick={() => {
          fetchData(city)
        }}
        disabled={!city}
      >
        Search
      </button>
      <div>{Weather && <div>{Weather.main.temp}</div>}</div>
    </>
  )
}

export default App
