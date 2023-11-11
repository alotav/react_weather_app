import {useState}from 'react'
import axios from 'axios'

// import dotenv from 'dotenv'
// dotenv.config();


const App = () => {

  const [data,setData] = useState({})

  const [location,setLocation] = useState('')

  const api_key = import.meta.env.VITE_API_KEY;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`

  const searchLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
    }
  }

  return (
    <div className='app'>
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter Location'
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {/* ternario verifica si hay data */}
            {data.main ? <h1>{data.main.temp}° C</h1> : null}
            
          </div>
          <div className="description">
            <p>
              {/* ternario verifica si hay data */}
            {data.main ? <p>{data.weather[0].main}</p> : null}
            </p>
          </div>
        </div>
        
{/* ternario para verificar si ingresaron datos */}
{data.name != undefined &&
          <div className="bottom">
          <div className="feels">
            <p className="bold">

              {data.main ? <p className="bold">{data.main.feels_like}° C</p> : null}

            </p>
            <p className="light">Feels Like</p>
          </div>
          <div className="humidity">

            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}

            <p className="light">Humidity</p>
          </div>
          <div className="wind">

            {data.main ? <p className="bold">{data.wind.speed} m/s</p> : null}

            <p className="light">Wind Speed</p>
          </div>
        </div>

}

      </div>
    </div>
  )
}

export default App
