import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('responded')
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const visibleCountries = countries
    .filter(countries => {
      const { name } = countries;
      const search = newSearch.toLowerCase()
      if (newSearch === '') return false;
      if (name.toLowerCase().includes(search)) return true;
    })

  const [country] = visibleCountries
  if ( country && city !== country.capital && visibleCountries.length === 1) {
    setCity(country.capital)
    getWeather({ city: country.capital, setNewWeather })
  }

  return (
    <div>
      <Input newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Countries visibleCountries={visibleCountries} newSearch={newSearch} setNewSearch={setNewSearch} newWeather={newWeather} setNewWeather={setNewWeather} city={city} setCity={setCity} />
    </div>
  )
}


const Input = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      Find countries:
      <input
        value={newSearch}
        onChange={handleSearchChange}
      />
    </div>
  )
}

const Countries = ({ visibleCountries, newSearch, setNewSearch, newWeather, setNewWeather, city, setCity }) => {
  
  if (visibleCountries.length === 0) {
    return (
      <p>No results...</p>
    )
  }

  if (visibleCountries.length === 1) {
    const details = true
    const [country] = visibleCountries

    return (      
      <Country key={country.numericCode} country={country} details={details} setNewSearch={setNewSearch} newWeather={newWeather} />
    )
  }

  if (visibleCountries.length <= 10) {
    const details = false
    return (
      <ul>
        {visibleCountries.map(country =>
        (<li key={country.numericCode}>
          <Country country={country} details={details} setNewSearch={setNewSearch} newWeather={newWeather} />
        </li>)
        )}
      </ul>
    )
  }

  if (visibleCountries.length > 10) {
    return (
      <p>Too many results, specify</p>
    )
  }
}

const Language = ({ language }) => {
  return (
    language.name
  )
}

const Country = ({ country, details, setNewSearch, newWeather }) => {

  if (!details) {
    return (
      <div>
        {country.name}
        <button onClick={() => setNewSearch(country.name)}>show</button>
      </div>
    )
  }

  if (details) {
    return (
      <div>
        {country.name}
        <br />
        capital: {country.capital}
        <br />
        population: {country.population}
        <br />
        <p>languages</p>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>
              <Language language={language} />
            </li>
          ))}
        </ul>
        <br />
        <img src={country.flag} height="200" />
        <br />
        <br />
        <p>Weather:</p>
        <Wheather newWeather={newWeather} />
        <br />
      </div>
    )
  }
}

const Wheather = ({ newWeather }) => {
  console.log({ newWeather })
  return (
    <div>
      <li>
        Temperature: {newWeather?.current?.temperature} 
      </li>
      <li>
        Wind speed: {newWeather?.current?.wind_speed} direction: {newWeather?.current?.wind_dir}
      </li>  
      <img src={newWeather?.current?.weather_icons} height="200" />   
    </div>
  )
}

const getWeather = ({ city, setNewWeather }) => {
  const api_key = process.env.REACT_APP_API_KEY

  axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
    .then(response => {
      setNewWeather(response.data)
    })
}



export default App
