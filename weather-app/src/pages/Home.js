import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import List from './../cities.json';

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Function to fetch weather data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/group?id=${getCityIds()}&appid=1891735cfb394923413c67a90e76954f`
        );
        setWeatherData(response.data.list);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();

     // Set interval to fetch data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => {
        clearInterval(interval);
      };
  }, []);

  const getCityIds = () => {
    return List.List.map((city) => city.CityCode).join(',');
  };

  return (
    <div className="home_container">
      <div className="home_card_container">
        {weatherData.map((data, idx) => (
          <Card
            key={idx}
            cityName={List.List[idx].CityName}
            img={getCardImage(idx)}
            status={data.weather[0].description}
            temp={convertKelvinToCelsius(data.main.temp)}
            pressure={data.main.pressure}
            humidity={data.main.humidity}
            visibility={data.visibility / 1000}
            sunrise={data.sys.sunrise}
            sunset={data.sys.sunset}
            windSpeed={data.wind.speed}
            windDegree={data.wind.deg}
            tempMin={data.main.temp_min}
            tempMax={data.main.temp_max}
            time={new Date().toLocaleTimeString()}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
