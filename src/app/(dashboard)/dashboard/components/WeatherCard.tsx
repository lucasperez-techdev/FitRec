"use client";
import { useWeather } from "@/contexts/WeatherContext";

interface WeatherValues {
  temperatureApparent: number;
}

function getOutfitSuggestion(values: WeatherValues) {
  const { temperatureApparent } = values;

  if (temperatureApparent < 0) return "🧥 Heavy coat, gloves, and hat!";
  if (temperatureApparent < 10) return "🧥 Jacket or hoodie.";
  if (temperatureApparent < 20) return "👕 Long sleeves or light jacket.";
  return "😎 T-shirt and shorts!";
}

export default function WeatherCard() {
  const { weather, loading, error } = useWeather();

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        🌤 Weather & Outfit Suggestion
      </h2>
      
      <div className="space-y-2 text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">Temp:</span> {weather.temperature}°C
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">Feels Like:</span> {weather.temperatureApparent}°C
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">Wind:</span> {weather.windSpeed} km/h
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Last updated: {weather.lastUpdated.toLocaleTimeString()}
        </p>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {getOutfitSuggestion(weather)}
        </p>
      </div>
    </div>
  );
} 