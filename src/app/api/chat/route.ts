import { NextResponse } from 'next/server';
import { model } from '@/lib/firebase';

export async function POST(req: Request) {
  const { message, weatherContext } = await req.json();

  try {
    let prompt = `You are a helpful weather and outfit recommendation assistant. `;
    
    if (weatherContext) {
      prompt += `${weatherContext} `;
    }
    
    prompt += `Please provide helpful advice about outfits based on weather conditions and user preferences. User message: ${message}`;
    
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