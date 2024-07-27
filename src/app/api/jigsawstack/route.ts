import { NextRequest, NextResponse } from 'next/server';

const JIGSAW_API_KEY = process.env.JIGSAW_API_KEY;
const JIGSAW_API_ENDPOINT = 'https://api.jigsawstack.com/v1/ai/scrape';

export async function POST(request: NextRequest) {
  try {
    const { url, elementPrompts } = await request.json();

    if (!url || !elementPrompts || !Array.isArray(elementPrompts)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    console.log("Sending request to JigsawStack:");
    console.log({ url, elementPrompts });

    const response = await fetch(JIGSAW_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': JIGSAW_API_KEY || '',
      },
      body: JSON.stringify({
        url,
        element_prompts: elementPrompts,
      }),
    });

    if (!response.ok) {
      throw new Error(`JigsawStack API responded with status: ${response.status}`);
    }

    const data = await response.json();

    console.log("CONSOLE: JigsawStack request received.");
    console.log(data);

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}