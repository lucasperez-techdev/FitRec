"use client";
import { useWeather } from "@/contexts/WeatherContext";

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
        🌤 Current Weather
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
    </div>
  );
} 