import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const WeatherCard = ({ title, value, icon, delay }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <p className="mt-2 text-gray-600 text-center">
        {value} {icon && <img src={icon} alt="Weather icon" className="inline-block w-10 h-10 ml-2" />}
      </p>
    </motion.div>
  );
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "b0bca82a487a5f101e8c79764175c25e";

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setError("");
      setWeatherData(null);
      setLoading(true);

      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        const response = await axios.get(API_URL);
        if (response.data.cod === 200) {
          setWeatherData(response.data);
        } else {
          setError("City not found. Please check the spelling and try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="container mx-auto ">
      <Navbar />

      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Weather Monitoring</h1>
      <p className="text-gray-700 mb-6">Stay updated on climate conditions affecting your crops.</p>

      <div className="flex items-center mb-8">
        <input
          type="text"
          placeholder="Enter city, country"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setCity(city)}
          className="ml-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-blue-500 mb-4">Loading weather data...</p>}

      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <WeatherCard
            title="Temperature"
            value={`${weatherData.main.temp}°C`}
            icon={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            delay={0.1}
          />
          <WeatherCard
            title="Weather"
            value={weatherData.weather[0].description}
            icon={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            delay={0.2}
          />
          <WeatherCard title="Humidity" value={`${weatherData.main.humidity}%`} delay={0.3} />
          <WeatherCard title="Wind Speed" value={`${weatherData.wind.speed} m/s`} delay={0.4} />
          <WeatherCard title="Pressure" value={`${weatherData.main.pressure} hPa`} delay={0.5} />
          <WeatherCard title="Visibility" value={`${(weatherData.visibility / 1000).toFixed(1)} km`} delay={0.6} />
        </div>
      )}

      {weatherData && (
        <div className="mt-8">
          <MapContainer center={[weatherData.coord.lat, weatherData.coord.lon]} zoom={10} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
              <Popup>
                {weatherData.name}: {weatherData.weather[0].description}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

    </div>
  );
};

export default Weather;
