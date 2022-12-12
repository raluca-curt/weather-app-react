import React, { useState } from 'react'

function App() {
  const [data, setData] = useState({});

  const [location, setLocation] = useState('')

  // Fetch data
  const searchLocation = event => {
    // Search location if enter is pressed
    if (event.key === 'Enter')
    {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=652bae603a41caaf52e8b9203745b6c9`)
        .then(res => res.json())
        .then(actualData => {
          setData(actualData)
          console.log(actualData)
      })
    }
  }

  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        placeholder='Search'
        // Update location while typing
        onChange={event => setLocation(event.target.value)}
        // Search location once key is presssed
        onKeyDown={searchLocation}
        type='text'></input>
      </div>

      <div className='container'>
        {/* Main data */}
        <div className='main-data'>

          {/* City name */}
          <div className='location'>
            <h2>
              {data.name}
            </h2>
          </div>
          {/* Temp */}
          <div className='temp'>
            {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
          </div>
        </div>

        {/* Secondary data */}
        {data.name !== undefined &&
        <div className='secondary-data'>
          {/* Description */}
          <div className='description flex'>
            <p>Description</p>
            {data.weather ? <p className='bold'>{data.weather[0].description}</p> : null}
          </div>
          {/* Feels like */}
          <div className='feels-like flex'>
            <p>Feels like</p>
            {data.main ? <p className='bold'>{Math.round(data.main.feels_like)}°C</p> : null}
          </div>
          {/* Humidity */}
          <div className='humidity flex'>
            <p>Humidity</p>
            {data.main ? <p className='bold'>{Math.round(data.main.humidity)}%</p> : null}
          </div>
          {/* Wind speed */}
          <div className='wind-speed flex'>
            <p>Wind Speed</p>
            {data.wind ? <p className='bold'>{Math.round(data.wind.speed)} meter/sec</p> : null}
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
