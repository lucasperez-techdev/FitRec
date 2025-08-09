'use client';
import { useState } from 'react';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChat((prev) => [...prev, { role: 'user', content: message }]);

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
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
        <div className="h-80 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-2 space-y-2">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-blue-900 self-end'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about outfits..."
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}