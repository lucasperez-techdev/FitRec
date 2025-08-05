"use client";
import { useEffect, useState } from "react";
import { getWeather } from "../../../../lib/weather"; 

function getOutfitSuggestion(values: any) {
  const { temperatureApparent, precipitationType } = values;

  if (precipitationType === 1) return "🌧 Bring an umbrella or rain jacket!";
  if (precipitationType === 2) return "❄️ Wear boots and a warm coat!";

  if (temperatureApparent < 0) return "🧥 Heavy coat, gloves, and hat!";
  if (temperatureApparent < 10) return "🧥 Jacket or hoodie.";
  if (temperatureApparent < 20) return "👕 Long sleeves or light jacket.";
  return "😎 T-shirt and shorts!";
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          getWeather(latitude, longitude)
            .then((data) => {
              setWeather(data);
              setLoading(false);
            })
            .catch(() => {
              setError("Failed to fetch weather data.");
              setLoading(false);
            });
        },
        () => {
          setError("Location access denied. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  if (loading) return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );

  if (!weather) return null;

  const values = weather.data.values;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        🌤 Weather & Outfit Suggestion
      </h2>
      
      <div className="space-y-2 text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">Temp:</span> {values.temperature}°C
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">Feels Like:</span> {values.temperatureApparent}°C
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">Wind:</span> {values.windSpeed} km/h
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">Precipitation:</span> {
            values.precipitationType === 0 ? "None" : 
            values.precipitationType === 1 ? "Rain" : "Snow"
          }
        </p>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {getOutfitSuggestion(values)}
        </p>
      </div>
    </div>
  );
} 