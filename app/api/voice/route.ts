import { NextResponse } from 'next/server';
import { openai } from '../../../lib/openai';
import type { ChatMessage } from '../../../types/chat';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = body?.messages as ChatMessage[] | undefined;

    if (!openai || !process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key is missing.' }, { status: 500 });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Request must include a message array.' }, { status: 400 });
    }

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: messages.map((message) => ({ role: message.role, content: message.content })),
      temperature: 0.85,
      max_output_tokens: 512,
    });

    const outputItem = response.output?.[0];
    let text = '';

    if ('content' in outputItem) {
      text = Array.isArray(outputItem.content)
        ? outputItem.content.map((item: any) => item?.text ?? '').join(' ')
        : typeof outputItem.content === 'string'
        ? outputItem.content
        : '';
    }

    return NextResponse.json({ response: { content: text.trim() } });
  } catch (error) {
    console.error('Voice API error', error);
    return NextResponse.json({ error: 'Unable to generate assistant response.' }, { status: 500 });
  }
}
