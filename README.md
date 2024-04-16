
# Weather App

This is a weather application built using React.js, TypeScript, and Tailwind CSS. It provides real-time weather information for cities worldwide by fetching data from two APIs: one for retrieving city data and another for fetching weather information.

## Features

- Display weather information for cities worldwide.
- View current weather conditions, including temperature, weather description, humidity, wind speed, and atmospheric pressure.
- Get forecast data such as temperature highs and lows, weather descriptions, and precipitation chances.
- Infinite scroll functionality to display a list of cities with pagination.
- Autocomplete search for finding cities quickly.
- Filter and sorting options for each column in the cities table.
- Clicking on a city name navigates to the weather page for that city.
- Right-clicking on a city name and opening it in a new tab also opens the weather page for the city in the new tab.

## APIs Used

- **Cities Data API**: Utilized to fetch data for cities worldwide, including city name, country, timezone, etc. API link: [https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name](https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name)
- **Weather API**: Used to retrieve real-time weather information for cities, including temperature, weather description, humidity, wind speed, and atmospheric pressure. API link: [https://openweathermap.org/](https://openweathermap.org/)

## Usage

1. Clone the repository: `git clone https://github.com/yourusername/weather-app.git`
2. Navigate to the project directory: `cd weather-app`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit `http://localhost:3000` to view the application.

