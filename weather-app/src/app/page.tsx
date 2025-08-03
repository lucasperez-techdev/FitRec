"use client";
import { useEffect, useState } from "react";
import { getWeather } from "./weather";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    getWeather(44.9778, -93.2650) // Minneapolis example
      .then(data => setWeather(data))
      .catch(err => console.error(err));
  }, []);

  if (!weather) return <p className="text-center text-xl mt-20">Loading weather...</p>;

  const values = weather.data.values;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-6">🌤 Weather App</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <p className="text-2xl">Temperature: {values.temperature}°C</p>
        <p className="text-xl mt-2">Humidity: {values.humidity}%</p>
        <p className="text-xl mt-2">Wind Speed: {values.windSpeed} km/h</p>
      </div>
    </main>
  );
}
