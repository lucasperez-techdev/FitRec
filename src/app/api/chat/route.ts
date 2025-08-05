import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful weather and outfit recommendation assistant.' },
      { role: 'user', content: message },
    ],
  });

  return NextResponse.json({
    reply: response.choices[0].message?.content || 'No response',
  });
}