import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";


interface StateInfo {
  id: string;
  geoname_id: string;
  name: string;
  cou_name_en: string;
  country_code: string;
  timezone: string;
  population: number;
}

interface ApiResponse {
  total_count: number;
  results: StateInfo[];
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedRow = styled.tr`
  animation: ${fadeIn} 1s ease-in-out;
  transition: opacity 0.1s ease-in-out;
`;

const CityLink: React.FC<{ cityName: string }> = ({ cityName }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(`/weather/${cityName}`);
  };

  return (
    <Link
      to={`/weather/${cityName}`}
      className="text-blue-500 hover:underline"
      onClick={handleClick}
    >
      {cityName}
    </Link>
  );
};

function App() {
  const [city, setCity] = useState<StateInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const start = (currentPage - 1) * 10;
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&start=${start}`;

    axios
      .get<ApiResponse>(url)
      .then((response) => {
        const resultsWithIds = response.data.results.map((item) => ({
          ...item,
          id: uuidv4(), // Generate a unique ID using the uuid library
        }));

        setTimeout(() => {
          setCity((prevCities) => [...prevCities, ...resultsWithIds]);
          setTotalPages(Math.ceil(response.data.total_count / 10));
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight * 0.9 &&
        currentPage < totalPages &&
        !loading
      ) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages, loading]);

  return (
    <>
      <div className="bg-slate-900 m-5 rounded-md flex justify-center items-center p-5 sm:p-2">
        <h1 className="text-sm font-serif text-red-100 font-bold sm:text-lg md:text-xl">
          Discover the weather in every city you go by just clicking or right
          clicking on the city name
        </h1>
      
      </div>
      <div
        className="App flex justify-center bg-gradient-to-r from-blue-900 to-pink-700 min-h-screen bg-cover bg-center"
        
      >
        <div className="overflow-x-auto w-auto text-xs px-2 sm:px-2 sm:w-full sm:text-base md:px-2 md:w-full ">
          <table className="w-11/12 mt-10 ml-3 table-auto text-sm md:text-base">
            <thead className="bg-blue-950">
              <tr>
                <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left sm:px-2 sm:py-1">
                  City Id
                </th>
                <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left sm:px-2 sm:py-1">
                  City Name
                </th>
                <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left sm:px-2 sm:py-1">
                  Country
                </th>
                <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left sm:px-2 sm:py-1">
                  Timezone
                </th>
                <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left sm:px-2 sm:py-1">
                  Country Code
                </th>
              </tr>
            </thead>
            <tbody>
              {city.map((cities) => (
                <AnimatedRow key={cities.id} className="bg-white">
                  <td className="px-4 py-2 border sm:px-2 sm:py-1">
                    {cities.geoname_id}
                  </td>
                  <td className="px-4 py-2 border sm:px-2 sm:py-1">
                    <CityLink cityName={cities.name} />
                  </td>
                  <td className="px-4 py-2 border sm:px-2 sm:py-1">
                    {cities.cou_name_en}
                  </td>
                  <td className="px-4 py-2 border sm:px-2 sm:py-1">
                    {cities.timezone}
                  </td>
                  <td className="px-4 py-2 border sm:px-2 sm:py-1">
                    {cities.country_code}
                  </td>
                </AnimatedRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import { Link, useNavigate } from "react-router-dom";
// const season = require("./images/season.png");
// const img1 = require("./images/bg.jpg");

// interface StateInfo {
//   id: string;
//   geoname_id: string;
//   name: string;
//   cou_name_en: string;
//   country_code: string;
//   timezone: string;
//   population: number;
// }

// interface ApiResponse {
//   total_count: number;
//   results: StateInfo[];
// }

// const CityLink: React.FC<{ cityName: string }> = ({ cityName }) => {
//   const handleRightClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
//     event.preventDefault();
//     window.open(`/weather/${cityName}`, '_blank');
//   };

//   return (
//     <Link
//       to={`/weather/${cityName}`}
//       className="text-blue-500 hover:underline"
//       onContextMenu={handleRightClick}
//     >
//       {cityName}
//     </Link>
//   );
// };

// function App() {
//   const [city, setCity] = useState<StateInfo[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const start = (currentPage - 1) * 10;
//     const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&start=${start}`;

//     axios
//       .get<ApiResponse>(url)
//       .then((response) => {
//         const resultsWithIds = response.data.results.map((item) => ({
//           ...item,
//           id: uuidv4(), // Generate a unique ID using the uuid library
//         }));

//         setCity((prevCities) => [...prevCities, ...resultsWithIds]);
//         setTotalPages(Math.ceil(response.data.total_count / 10));
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [currentPage]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollHeight = document.documentElement.scrollHeight;
//       const scrollTop = document.documentElement.scrollTop;
//       const clientHeight = document.documentElement.clientHeight;

//       if (
//         scrollTop + clientHeight >= scrollHeight * 0.9 &&
//         currentPage < totalPages
//       ) {
//         setCurrentPage(currentPage + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [currentPage, totalPages]);

//   return (
//     <>
//     <div className="bg-white flex justify-center items-center p-5"><h1 className="text-2xl font-serif text-black font-bold">Discover the weather in every city you go 
//     by just clicking or right clicking on the city name</h1>
//     <img className="w-12 h-12 mx-4" src={season} /></div>
//     <div className="App flex justify-center" style={{ backgroundImage: `url(${img1})` }} >
        
//       <table className="w-11/12 mt-10 table-auto">
      
        
//         <thead className="bg-blue-950">
//           <tr>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left">City Id</th>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left">City Name</th>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left">Country</th>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left">Timezone</th>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600 text-left">
//               Country Code
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {city.map((cities) => (
//             <tr key={cities.id} className="bg-white">
//               <td className="px-4 py-2 border">{cities.geoname_id}</td>
//               <td className="px-4 py-2 border">
//                 <CityLink cityName={cities.name} />
//               </td>
//               <td className="px-4 py-2 border">{cities.cou_name_en}</td>
//               <td className="px-4 py-2 border">{cities.timezone}</td>
//               <td className="px-4 py-2 border">{cities.country_code}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// }

// export default App;





// ======================================================= Using Axios ==========================================================

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface stateInfo {
//   geoname_id: string;
//   name: string;
//   cou_name_en: string;
//   country_code: string;
//   timezone: string;
//   population: number;
// }

// interface ApiResponse {
//   total_count: number;
//   results: stateInfo[];
// }

// function App() {
//   const [city, setCity] = useState<stateInfo[]>([]);
//   useEffect(() => {
//     axios
//       .get<ApiResponse>(
//         "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
//       )
//       .then((response) => {
//         setCity(response.data.results);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
//   return (
//     <div className="App flex justify-center bg-slate-600">
//       <table className="w-11/12 mt-5 table-auto">
//         <thead className="bg-gray-600">
//           <tr>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600">City Id</th>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600">City Name</th>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600">Country</th>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600">Timezone</th>
//             <th className="px-4 py-2 bg-gray-200 text-gray-600">
//               Country Code
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {city.map((cities) => (
//             <tr key={cities.geoname_id} className="bg-white">
//               <td className="px-4 py-2 border">{cities.geoname_id}</td>
//               <td className="px-4 py-2 border">{cities.name}</td>
//               <td className="px-4 py-2 border">{cities.cou_name_en}</td>
//               <td className="px-4 py-2 border">{cities.timezone}</td>
//               <td className="px-4 py-2 border">{cities.country_code}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;

//  ===================================================== fetch method =================================================

// import React, { useEffect, useState } from 'react';
// import './App.css';
// interface StateInfo {
//   geoname_id: string;
//   dem: number;
//   name: string;
//   cou_name_en: string;
//   country_code: string;
//   timezone: string;
//   population: number;
// }

// function App() {
//   const [cities, setCities] = useState<StateInfo[]>([]);

//   useEffect(() => {
//     fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20')
//       .then(response => response.json())
//       .then(data => setCities(data.results));
//   }, []);

//   return (
//     <>
//       {cities.map((city) => (
//         <div key={city.geoname_id}>{city.name}</div>
//       ))}
//     </>
//   );
// }

// export default App;
