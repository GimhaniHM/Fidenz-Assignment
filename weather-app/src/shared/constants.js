// Constants related to the API
export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// for card images
export const CARD_IMAGES = (idx) => {
    switch (idx) {
      case 0:
        return require('../img/1.png');
      case 1:
        return require('../img/2.png');
      case 2:
        return require('../img/3.png');
      case 3:
        return require('../img/4.png');
      case 4:
        return require('../img/5.png');
      case 5:
        return require('../img/3.png');
      case 6:
        return require('../img/2.png');
      default:
        return null;
    }
  };

// for Celcius value
  export const CelciusValue = (temp) => {
    return Math.round(temp - 273.15);
  };