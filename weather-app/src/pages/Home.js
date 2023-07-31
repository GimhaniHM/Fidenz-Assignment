import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import Card from '../components/Card';
import List from './../cities.json';
import { fetchWeatherData } from '../features/weatherSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    const cityIds = getCityIds();
    dispatch(fetchWeatherData(cityIds));
  }, [dispatch]);

  const getCityIds = () => {
    return List.List.map((city) => city.CityCode).join(',');
  };

  const handleCardClick = (CityCode) => {
    navigate(`/${CityCode}`);

  };

  return (
    <div className="home_container">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="home_card_container">
          <Grid container spacing={2}>
            {data?.list?.map((data, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  cityName={List.List[idx].CityName}
                  countryName={data.sys.country}
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
                  //isCityInfo={false}
                  onClick={() =>
                    handleCardClick(
                      List.List[idx].CityCode
                  )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
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
      case 7:
        return require('./../img/1.png');
    default:
      return null;
  }
};

const convertKelvinToCelsius = (temp) => {
  return Math.round(temp - 273.15);
};

export default Home;
