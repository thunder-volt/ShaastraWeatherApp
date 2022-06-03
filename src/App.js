import React, { useState } from "react";
const api = {
  key: "9c7e2dda1191fdaba91f9d60e763f203",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);

        });
      fetch(`${api.base}forecast?q=${query}&appid=7bb828b3677fe3d6fd77dacfde016000`)
        .then(res => res.json())
        .then(result => {
          setForecast(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  return <div className={(typeof weather.main != "undefined")
    ? ((weather.main.temp > 298) ? 'app warm' : 'app') : 'app'}>
    <main>
      <div className="search-box">
        <input type="text"
          className="search-bar"
          placeholder="Search.."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search} />

      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name},{weather.sys.country}
            </div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp) - 273}°C
              </div>
              <div className="weather">{weather.weather.main}</div>
            </div>
          </div>

          <div className="nxt-day">
            <div className="day">
              <div className="head">Day1</div>
              {Math.round(forecast.list[1].main.temp) - 273}°C
            </div>
            <div className="day">
              <div className="head">Day2</div>
              {Math.round(forecast.list[2].main.temp) - 273}°C
            </div>
            <div className="day">
              <div className="head">Day3</div>
              {Math.round(forecast.list[3].main.temp) - 273}°C
            </div>
          </div >
        </div>
      ) : ('')
      }

    </main >
  </div >
}

export default App;
