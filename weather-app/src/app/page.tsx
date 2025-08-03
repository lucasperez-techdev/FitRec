"use client";
import { useEffect, useState } from "react";
import { getWeather } from "./weather";

function getOutfitSuggestion(values: any) {
  const { temperatureApparent, precipitationType } = values;

  if (precipitationType === 1) return "🌧 Bring an umbrella or rain jacket!";
  if (precipitationType === 2) return "❄️ Wear boots and a warm coat!";

  if (temperatureApparent < 0) return "🧥 Heavy coat, gloves, and hat!";
  if (temperatureApparent < 10) return "🧥 Jacket or hoodie.";
  if (temperatureApparent < 20) return "👕 Long sleeves or light jacket.";
  return "😎 T-shirt and shorts!";
}

export default function Home() {
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

  if (loading) return <p className="text-center text-xl mt-20">📍 Detecting your location...</p>;
  if (error) return <p className="text-center text-xl mt-20 text-red-500">{error}</p>;
  if (!weather) return null;

  const values = weather.data.values;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-6">🌤 Weather Outfit Suggestion</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 text-center w-80">
        <p className="text-2xl">Temp: {values.temperature}°C</p>
        <p className="text-xl mt-2">Feels Like: {values.temperatureApparent}°C</p>
        <p className="text-xl mt-2">Wind: {values.windSpeed} km/h</p>
        <p className="text-xl mt-2">
          Precipitation: {values.precipitationType === 0 ? "None" : values.precipitationType === 1 ? "Rain" : "Snow"}
        </p>

        <p className="text-lg mt-4 font-semibold">
          Suggestion: {getOutfitSuggestion(values)}
        </p>
      </div>
    </main>
  );
}