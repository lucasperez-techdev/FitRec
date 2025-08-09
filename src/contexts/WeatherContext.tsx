'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getWeather } from '@/lib/weather';

interface WeatherData {
  temperature: number;
  temperatureApparent: number;
  windSpeed: number;
  location: {
    latitude: number;
    longitude: number;
  };
  lastUpdated: Date;
}

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (latitude: number, longitude: number) => {
    try {
      const data = await getWeather(latitude, longitude);
      
      // Check if the data structure is correct
      if (!data.data || !data.data.values) {
        throw new Error('Invalid weather data structure');
      }

      const weatherData: WeatherData = {
        temperature: data.data.values.temperature,
        temperatureApparent: data.data.values.temperatureApparent,
        windSpeed: data.data.values.windSpeed,
        location: { latitude, longitude },
        lastUpdated: new Date(),
      };
      setWeather(weatherData);
      setError(null);
      
      // Store in localStorage for caching (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.setItem('weatherData', JSON.stringify({
          ...weatherData,
          lastUpdated: weatherData.lastUpdated.toISOString(),
        }));
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      console.error('Weather fetch error:', err);
    }
  }, []);

  const refreshWeather = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setError('Location access denied. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, [fetchWeather]);

  useEffect(() => {
    const initializeWeather = async () => {
      // Check if we have cached weather data (only on client side)
      if (typeof window !== 'undefined') {
        const cachedWeather = localStorage.getItem('weatherData');
        if (cachedWeather) {
          try {
            const parsedWeather = JSON.parse(cachedWeather);
            const lastUpdated = new Date(parsedWeather.lastUpdated);
            const now = new Date();
            const timeDiff = now.getTime() - lastUpdated.getTime();
            const minutesDiff = timeDiff / (1000 * 60);

            // If cached data is less than 30 minutes old, use it
            if (minutesDiff < 30) {
              setWeather({
                ...parsedWeather,
                lastUpdated,
              });
              setLoading(false);
              return;
            }
          } catch (err) {
            console.error('Error parsing cached weather data:', err);
            // Continue to fetch fresh data if cache is corrupted
          }
        }
      }

      // Fetch fresh weather data
      await refreshWeather();
      setLoading(false);
    };

    initializeWeather();

    // Set up interval to refresh weather every 30 minutes
    const interval = setInterval(() => {
      refreshWeather();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [refreshWeather]);

  const value = {
    weather,
    loading,
    error,
    refreshWeather,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
} 