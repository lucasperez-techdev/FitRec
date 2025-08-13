'use client';
import { useState } from 'react';
import { useWeather } from '@/contexts/WeatherContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { getPreferenceSummary } from '@/lib/aiUtils';

interface WeatherData {
  temperatureApparent: number;
}

export default function ChatCard() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { weather } = useWeather();
  const { preferences, hasPreferences } = usePreferences();

  const getOutfitSuggestion = (weatherData: WeatherData) => {
    const { temperatureApparent } = weatherData;

    if (temperatureApparent < 0) return "🧥 Heavy coat, gloves, and hat!";
    if (temperatureApparent < 10) return "🧥 Jacket or hoodie.";
    if (temperatureApparent < 20) return "👕 Long sleeves or light jacket.";
    return "😎 T-shirt and shorts!";
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    
    // Add user message to chat and clear input immediately
    setChat((prev) => [...prev, { role: 'user', content: message }]);
    setMessage(''); // Clear message input immediately

    try {
      // Prepare weather context for AI
      let weatherContext = '';
      if (weather) {
        const outfitSuggestion = getOutfitSuggestion(weather);
        weatherContext = `Current weather context: Temperature ${weather.temperature}°C, feels like ${weather.temperatureApparent}°C, wind speed ${weather.windSpeed} km/h. Location: ${weather.location.latitude}, ${weather.location.longitude}. Initial outfit suggestion: ${outfitSuggestion}. `;
      }

      // Send message to our API with enhanced prompt system
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          weatherContext,
          userPreferences: preferences
        }),
      });

      const data = await res.json();

      // Add AI reply to chat
      setChat((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setChat((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const preferenceSummary = getPreferenceSummary(preferences);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        💬 Outfit Assistant
      </h2>
      
      {hasPreferences && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Your preferences:</strong> {preferenceSummary}
          </p>
        </div>
      )}
      
      <div className="h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-3 space-y-2 mb-4">
        {chat.length === 0 ? (
          <div className="text-center mt-8 space-y-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Ask me about outfit recommendations based on weather!
            </p>
            {!hasPreferences && (
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Set your preferences in Profile Settings for personalized recommendations
              </p>
            )}
            <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              <p className="font-medium mb-2">Try asking:</p>
              <div className="space-y-1">
                <p>What should I wear today?</p>
                <p>I have a meeting, any outfit ideas?</p>
                <p>What&apos;s good for this weather?</p>
                <p>Can you suggest some casual outfits?</p>
              </div>
            </div>
          </div>
        ) : (
          chat.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 ml-8'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white mr-8'
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
        {isLoading && (
          <div className="p-2 rounded text-sm bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white mr-8">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about outfits..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !message.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
} 