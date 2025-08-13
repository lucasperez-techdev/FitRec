import { UserPrefs } from './prefs';

export interface AIUserContext {
  style: string;
  colors: string[];
  comfort: string;
  rainGear: boolean;
  footwear: string;
  hasPreferences: boolean;
}

export interface WeatherData {
  temperature: number;
  temperatureApparent: number;
  windSpeed: number;
  location: {
    latitude: number;
    longitude: number;
  };
  lastUpdated: Date;
}

export function formatPreferencesForAI(preferences: UserPrefs): AIUserContext {
  return {
    style: preferences.style || 'not specified',
    colors: preferences.colors.length > 0 ? preferences.colors : ['no preference'],
    comfort: preferences.comfort || 'not specified',
    rainGear: preferences.rainGear,
    footwear: preferences.footwear || 'not specified',
    hasPreferences: preferences.style !== "" || 
                   preferences.colors.length > 0 || 
                   preferences.comfort !== "" || 
                   preferences.footwear !== ""
  };
}

export function generateAIPrompt(preferences: UserPrefs, weatherInfo?: WeatherData | null): string {
  const context = formatPreferencesForAI(preferences);
  
  let prompt = `You are FitRec, a specialized AI fashion advisor focused on providing practical, weather-appropriate outfit recommendations. Your role is to help users choose clothing that matches their personal style preferences and current weather conditions.

IMPORTANT INSTRUCTIONS:
- Provide clear, concise outfit recommendations
- Focus on practical, wearable suggestions
- Consider weather conditions and user comfort preferences
- Suggest specific clothing items when possible
- Keep responses conversational but professional
- Avoid markdown formatting, emojis, or special characters
- Use plain text only
- Keep responses under 150 words unless more detail is specifically requested

`;
  
  if (context.hasPreferences) {
    // Enhanced comfort preference descriptions
    let comfortDescription = '';
    if (context.comfort === 'cold') {
      comfortDescription = 'runs cold (feels colder than most people and often needs extra layers or warmer clothing)';
    } else if (context.comfort === 'hot') {
      comfortDescription = 'runs hot (feels warmer than most people and prefers lighter, more breathable clothing)';
    } else if (context.comfort === 'neutral') {
      comfortDescription = 'has neutral temperature sensitivity (comfortable with standard clothing recommendations)';
    }

    prompt += `USER PREFERENCES:
- Style: ${context.style}
- Favorite colors: ${context.colors.join(', ')}
- Temperature sensitivity: ${comfortDescription}
- Rain gear: ${context.rainGear ? 'willing to wear' : 'prefers not to'}
- Footwear: ${context.footwear}

IMPORTANT: When the user runs cold, they need warmer clothing than typical recommendations. When they run hot, they need lighter, more breathable clothing than typical recommendations. Always adjust your suggestions accordingly.`;
  } else {
    prompt += `The user hasn't set specific preferences yet. Provide general but helpful advice that covers different style options.`;
  }
  
  if (weatherInfo) {
    prompt += `

CURRENT WEATHER:
- Temperature: ${weatherInfo.temperature}°C
- Feels like: ${weatherInfo.temperatureApparent}°C
- Wind speed: ${weatherInfo.windSpeed} km/h

Base your recommendations on these weather conditions. Consider temperature, wind chill, and appropriate layering.`;
  }
  
  prompt += `

RESPONSE FORMAT:
- Start with a brief weather assessment
- Provide 2-3 specific outfit suggestions
- Mention any special considerations (rain, wind, etc.)
- Keep language natural and conversational
- No bullet points, lists, or special formatting

Remember: You are helping someone get dressed for their day. Be practical, considerate of their preferences, and weather-aware.`;
  
  return prompt;
}

export function getPreferenceSummary(preferences: UserPrefs): string {
  if (!preferences.style && preferences.colors.length === 0 && !preferences.comfort && !preferences.footwear) {
    return "No preferences set yet. Set your preferences to get personalized recommendations!";
  }
  
  const parts = [];
  
  if (preferences.style) {
    parts.push(`${preferences.style} style`);
  }
  
  if (preferences.colors.length > 0) {
    parts.push(`prefers ${preferences.colors.join(', ')} colors`);
  }
  
  if (preferences.comfort) {
    const comfortText = preferences.comfort === 'cold' ? 'runs cold (needs warmer clothing)' : 
                       preferences.comfort === 'hot' ? 'runs hot (prefers lighter clothing)' : 'neutral temperature sensitivity';
    parts.push(comfortText);
  }
  
  if (preferences.footwear) {
    parts.push(`prefers ${preferences.footwear}`);
  }
  
  if (preferences.rainGear) {
    parts.push('willing to wear rain gear');
  }
  
  return parts.join(', ');
}

export function generateFollowUpPrompt(userMessage: string, preferences: UserPrefs, weatherInfo?: WeatherData | null): string {
  const basePrompt = generateAIPrompt(preferences, weatherInfo);
  
  return `${basePrompt}

USER'S SPECIFIC QUESTION: "${userMessage}"

Focus your response specifically on what they're asking about. If they're asking for general advice, provide comprehensive recommendations. If they're asking about a specific situation or item, address that directly while considering their preferences and current weather.

REMINDER: Always factor in their temperature sensitivity - if they run cold, suggest warmer options than typical; if they run hot, suggest lighter options than typical.`;
} 