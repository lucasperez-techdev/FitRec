import axios from "axios";

const API_KEY = "T8OMglRS9Tuu5U0FpKciegnwkYFSWhFj"; 

// Function to fetch real-time weather
export async function getWeather(lat: number, lon: number) {
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${API_KEY}`;
  
  const response = await axios.get(url);
  return response.data;
} 