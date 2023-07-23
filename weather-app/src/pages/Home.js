import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import List from './../cities.json';

const Home = () => {

  // used variable to store the fetched weather data for all cities
  const [weatherData, setWeatherData] = useState([]);

  // Used variable to store the last update time for each city's data
  const [lastUpdateTimes, setLastUpdateTimes] = useState({});

  // Function to fetch weather data for a specific city
  const fetchData = async (cityId) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=1891735cfb394923413c67a90e76954f`
      );
      setWeatherData((prevData) => {
        const newData = [...prevData];
        const cityIndex = newData.findIndex((data) => data.id === cityId);
        if (cityIndex !== -1) {
          newData[cityIndex] = response.data;
        } else {
          newData.push(response.data);
        }
        return newData;
      });

      // Record the current time as the last update time for the specific city
      setLastUpdateTimes((prevTimes) => ({
        ...prevTimes,
        [cityId]: Date.now(), // Record the current time as the last update time
      }));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {

    // Function to fetch weather data for all cities based on last update time

    const fetchDataForCities = async () => {
      const currentTime = Date.now();
      for (const city of List.List) {
        const lastUpdateTime = lastUpdateTimes[city.CityCode] || 0;
        if (currentTime - lastUpdateTime >= 5 * 60 * 1000) {
          // Fetch data only if 5 minutes have passed since the last update
          await fetchData(city.CityCode);
        }
      }
    };

    fetchDataForCities();

    // Set interval to fetch data every 5 minutes
    const interval = setInterval(fetchDataForCities, 5 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [lastUpdateTimes]);

  const getCityIds = () => {
    return List.List.map((city) => city.CityCode).join(',');
  };

  return (
    <div className="home_container">
      <div className="home_card_container">
        {weatherData.map((data, idx) => {
          const cityData = List.List[idx];
          if (!cityData) {
            // Skip rendering if city data is missing
            return null;
          }

          return (
            <Card
              key={idx}
              cityName={cityData.CityName}
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
          );
        })}
      </div>
    </div>
  );
};

const getCardImage = (idx) => {
  switch (idx) {
    case 0:
      return require('./../img/1.png');
    case 1:
      return require('./../img/2.png');
    case 2:
      return require('./../img/3.png');
    case 3:
      return require('./../img/4.png');
    case 4:
      return require('./../img/5.png');
    case 5:
      return require('./../img/3.png');
    case 6:
      return require('./../img/2.png');
    default:
      return null;
  }
};

const convertKelvinToCelsius = (temp) => {
  return Math.round(temp - 273.15);
};

export default Home;
