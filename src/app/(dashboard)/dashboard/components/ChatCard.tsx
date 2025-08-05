'use client';
import { useState } from 'react';

export default function ChatCard() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    
    // Add user message to chat
    setChat((prev) => [...prev, { role: 'user', content: message }]);

    try {
      // Send message to our API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Add AI reply to chat
      setChat((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      setMessage('');
    } catch (error) {
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        💬 Outfit Assistant
      </h2>
      
      <div className="h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-3 space-y-2 mb-4">
        {chat.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-8">
            Ask me about outfit recommendations based on weather!
          </p>
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