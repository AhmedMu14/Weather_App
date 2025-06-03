import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "b9ad31ea3357e7198465f95c71bc926d";
    const fetchWeather = async (cityName) => {
        if (!cityName) return;
        setloading(true);
        setError(null);
        try {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
            const res = await axios.get(URL);
            setWeather(res.data);
        } catch (err) {
            setError("City is not found. Please try again");
            setWeather(null);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        fetchWeather("Karachi")
    }, []);

    const handelSearch = () => {
        const trimmed = city.trim();
        if (!trimmed){
            setError("city not found. please try again")
        setloading(true);
        return;
    }
    fetchWeather(trimmed);
    };
 return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-extrabold mb-10 text-white drop-shadow-lg">
        🌤 Weather App
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-grow px-3 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 text-gray-800 font-semibold transition"
        />
        <button
          onClick={handelSearch}
          className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 active:bg-purple-900 transition text-white font-bold px-5 py-3 rounded-xl shadow-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-300 font-semibold mb-6 text-lg drop-shadow-md">
          {error}
        </p>
      )}

      {weather && (
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center text-gray-800">
          <h2 className="text-4xl font-extrabold mb-2">{weather.name}</h2>
          <p className="capitalize text-xl font-semibold text-purple-700 mb-4">
            {weather.weather[0].main} — {weather.weather[0].description}
          </p>
          <p className="text-6xl font-black mb-4">{Math.round(weather.main.temp)}°C</p>
          <div className="flex justify-around text-gray-600 text-sm font-semibold">
            <div>
              <p>Feels Like</p>
              <p className="text-lg text-purple-700">
                {Math.round(weather.main.feels_like)}°C
              </p>
            </div>
            <div>
              <p>Humidity</p>
              <p className="text-lg text-purple-700">{weather.main.humidity}%</p>
            </div>
            <div>
              <p>Wind</p>
              <p className="text-lg text-purple-700">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
