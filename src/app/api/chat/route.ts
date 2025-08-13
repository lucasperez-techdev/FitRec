import { NextResponse } from 'next/server';
import { model } from '@/lib/firebase';
import { generateFollowUpPrompt } from '@/lib/aiUtils';

export async function POST(req: Request) {
  const { message, weatherContext, userPreferences } = await req.json();

  try {
    // Use the enhanced prompt system for better AI responses
    let prompt = generateFollowUpPrompt(message, userPreferences, null);
    
    // Add additional weather context if available
    if (weatherContext) {
      prompt += `\n\nAdditional Weather Context: ${weatherContext}`;
    }
    
    // Add specific instructions for response quality
    prompt += `\n\nFINAL INSTRUCTIONS:
- Respond as if you're a helpful fashion advisor having a conversation
- Be specific about clothing items and layering
- Consider the user's comfort preferences and style
- Keep the tone friendly and practical
- If the user asks about specific items, provide alternatives that match their preferences
- Always factor in the current weather conditions
- CRITICAL: Adjust clothing recommendations based on temperature sensitivity:
  * If user runs cold: suggest warmer clothing than typical for the weather
  * If user runs hot: suggest lighter, more breathable clothing than typical for the weather
  * If user is neutral: use standard temperature-appropriate recommendations`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text() || 'No response';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { reply: 'Sorry, I encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}