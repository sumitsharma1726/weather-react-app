// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import styled, { keyframes } from 'styled-components';
// const bgImage = require("./images/bg.jpg");
// const sunIcon = require("./images/sunny.png");
// const rainIcon = require("./images/rainy.png");
// const cloudIcon = require("./images/cloudy.png");

// interface WeatherData {
//   name: string;
//   weather: { main: string; description: string }[];
//   main: { temp: number; temp_min: number; temp_max: number; humidity: number; pressure: number };
//   wind: { speed: number };
// }

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const ContentContainer = styled.div`
//   animation: ${fadeIn} 0.1s ease-in-out;
// `;

// const WeatherPage: React.FC = () => {
//   const { cityName } = useParams<{ cityName: string }>();
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const response = await axios.get<WeatherData>(
//           `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b156257d61ad1c68fb852d5a9aab013c`
//         );
//         setWeatherData(response.data);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//       }
//     };
//     fetchWeatherData();
//   }, [cityName]);

//   const getImage = () => {
//     if (!weatherData) return '';
//     const weather = weatherData.weather[0].main.toLowerCase();
//     switch (weather) {
//       case 'clear':
//         return sunIcon;
//       case 'rain':
//         return rainIcon;
//       case 'clouds':
//         return cloudIcon;
//       default:
//         return '';
//     }
//   };

//   return (
//     <ContentContainer>
//       <nav className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <Link to="/">
//             <button className="bg-black text-white border border-white rounded px-2 py-1 focus:outline-none">
//              Back to Cities
//             </button>
//           </Link>
//           <h1 className="text-sm font-serif font-bold text-blue-950 ml-2  sm:block sm:text-lg">
//             Hey, check out today's weather information
//           </h1>
//         </div>
//       </nav>

//       {weatherData ? (
//         <div className="relative min-h-screen flex flex-col justify-center items-center">
//           <div
//             className="absolute inset-0 bg-cover bg-center filter blur-sm"
//             style={{ backgroundImage: `url(${bgImage})` }}
//           ></div>
//           <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
//             <div className="bg-white bg-opacity-20 rounded-lg mx-2 flex flex-col justify-between w-11/12 h-auto p-4 md:flex-row md:rounded-full md:p-20 lg:p-24 xl:p-32 2xl:p-40">
//               <div className="w-full flex flex-col items-center justify-center text-white mb-4 md:w-1/2 md:mb-0">
//                 <div className="text-3xl mb-2 text-slate-950 font-serif">{cityName}</div>
//                 <p className="text-xl font-serif font-semiboldibold">
//                   {weatherData.main.temp}°C
//                 </p>
//                 <img
//                   src={getImage()}
//                   alt="icon"
//                   className="w-20 h-20 m-2"
//                 />
//               </div>
//               <div className="w-full flex flex-col items-start justify-center text-white px-2 md:w-1/2 md:px-8">
//                 <h2 className="text-2xl mb-4 font-serif text-slate-950">Weather Details</h2>
//                 <p className="text-base font-serif font-semiboldibold">
//                   Maximum Temperature: {weatherData.main.temp_max}°C
//                 </p>
//                 <p className="text-base font-serif font-semiboldibold">
//                   Minimum Temperature: {weatherData.main.temp_min}°C
//                 </p>
//                 <p className="text-base font-serif font-semiboldibold">
//                   Weather Description: {weatherData.weather[0].description}
//                 </p>
//                 <p className="text-base font-serif font-semiboldibold">
//                   Humidity: {weatherData.main.humidity}%
//                 </p>
//                 <p className="text-base font-serif font-semiboldibold">
//                   Wind Speed: {weatherData.wind.speed} m/s
//                 </p>
//                 <p className="text-base font-serif font-semiboldibold">
//                   Atmospheric Pressure: {weatherData.main.pressure} hPa
//                 </p>
//               </div>
//             </div>
//           </div>
//           <h1 className="text-lg font-serif font-bold text-blue-950 mt-2  sm:hidden ">
//             Hey, check out today's weather information
//           </h1>
//         </div>
//       ) : (
//         <div className='flex justify-items-center h-96 mt-20'  style={{ backgroundImage: `url(${bgImage})` }}>
//          <p className='text-4xl p-5 text-slate-950'>Loading weather data......</p>
//         </div>
       
//       )}
//     </ContentContainer>
//   );
// };

// export default WeatherPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Import weather icons

const bgImage = require("./images/bg.webp");
const sunIcon = require("./images/sunny.png");
const rainIcon = require("./images/rainy.png");
const cloudIcon = require("./images/cloudy.png");
const logo = require("./images/weather-app.png");

// Define interface for weather data
interface WeatherData {
  name: string;
  weather: { main: string; description: string }[];
  main: { temp: number; temp_min: number; temp_max: number; humidity: number; pressure: number };
  wind: { speed: number };
}

// Keyframe animation for fade-in effect
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled component for content container
const ContentContainer = styled.div`
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const WeatherPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b156257d61ad1c68fb852d5a9aab013c`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, [cityName]);

  const getBackgroundImage = () => {
    if (!weatherData) return '';
    const weather = weatherData.weather[0].main.toLowerCase();
    switch (weather) {
      case 'clear':
        return sunIcon;
      case 'rain':
        return rainIcon;
      case 'clouds':
        return cloudIcon;
      default:
        return '';
    }
  };

  return (
    <ContentContainer>
      <nav className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none">
            Cities List
          </button>
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Today's Weather in {cityName}</h1>
      </nav>

      {weatherData ? (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
             style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
          <div className="bg-white bg-opacity-70 rounded-lg p-8 max-w-lg">
            <img src={logo} alt="Weather Icon" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">{weatherData.weather[0].main}</h2>
            <p className="text-sm mb-4">{weatherData.weather[0].description}</p>
            <div className="text-lg font-bold">
              {weatherData.main.temp}°C
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Max: {weatherData.main.temp_max}°C / Min: {weatherData.main.temp_min}°C
            </div>
            <div className="text-sm">
              Humidity: {weatherData.main.humidity}%
            </div>
            <div className="text-sm">
              Wind: {weatherData.wind.speed} m/s
            </div>
            <div className="text-sm">
              Pressure: {weatherData.main.pressure} hPa
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-cover bg-center"
             style={{ backgroundImage: `url(${bgImage})` }}>
          <p className="text-lg font-bold text-white">Loading weather data...</p>
        </div>
      )}
    </ContentContainer>
  );
};

export default WeatherPage;
