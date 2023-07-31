import React from 'react';
import { useQuery } from 'react-query';
import Card from '../components/Card';
//import axios from 'axios';
import List from './../cities.json';
import { CARD_IMAGES, CelciusValue } from '../shared/constants.js';
import { getWeatherDataUrl } from '../shared/APIHelper.js';

const Home = () => {
  //const [weatherData, setWeatherData] = useState([]);
  //const [loading, setLoading] = useState(true);

  const getCityIds = () => {
    return List.List.map((city) => city.CityCode).join(',');
    //return List.List.map((city) => city.CityCode);
  };

  console.log(getCityIds());

  const { data, isLoading, error, isError } = useQuery("data", () => {
    return fetch(
      `http://api.openweathermap.org/data/2.5/group?id=${getCityIds()}&appid=1891735cfb394923413c67a90e76954f`
    )
      .then((response) => response.json());
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error! {error.message}</div>
  }

  /*if (!data || !data.list || data.list.length === 0) {
    return <div>No data available</div>;
  }*/

  console.log(data);

  return (
    <div className="home_container">
        <div className="home_card_container">
          {data.list.map((data, idx) => (
            <Card
              key={idx}
              cityName={List.List[idx].CityName}
              img={CARD_IMAGES(idx)}
              status={data.weather[0].description}
              temp={CelciusValue(data.main.temp)}
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
