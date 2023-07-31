import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Card from '../components/Card';

const CityInfo = () => {
    const { CityCode } = useParams();
  const findCityDataById = (cityDataList, CityCode) => {
    return cityDataList.find((city) => city.id === parseInt(CityCode));
  };


  const cityData = useSelector((state) => findCityDataById(state.weather.data.list, CityCode));

  if (!cityData) {
    return (
      <div className="city_details_container">
        <p>City not found.</p>
      </div>
    );
  }


  return (
    <div className="city_details_container">
      <Card
        backImgUrl="../img/back.png"
        cityName={cityData.name}
        img={getCardImage(CityCode)}
        status={cityData.weather[0].description}
        temp={convertKelvinToCelsius(cityData.main.temp)}
        pressure={cityData.main.pressure}
        humidity={cityData.main.humidity}
        visibility={cityData.visibility / 1000}
        sunrise={cityData.sys.sunrise}
        sunset={cityData.sys.sunset}
        windSpeed={cityData.wind.speed}
        windDegree={cityData.wind.deg}
        tempMin={cityData.main.temp_min}
        tempMax={cityData.main.temp_max}
        time={new Date(cityData.dt * 1000).toLocaleTimeString()}
        //isCityInfo={true}
      />
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



export default CityInfo;