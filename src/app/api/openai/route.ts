// app/api/openai/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// async function loadMarkdownFiles(): Promise<string> {
//   const directoryPath = path.join(process.cwd(), 'public', 'core');
//   const fileNames = await fs.readdir(directoryPath);
//   const markdownFiles = [];

//   for (const fileName of fileNames) {
//     if (fileName.endsWith('.md')) {
//       const content = await fs.readFile(path.join(directoryPath, fileName), 'utf8');
//       markdownFiles.push({ name: fileName, content });
//     }
//   }

//   // Create the markdown string to be appended to the OpenAI prompt
//   return markdownFiles
//     .map((file: { name: string; content: string; }) => `${file.content}\nsource: ${file.name}`)
//     .join("\n\n");
// }

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text();
    console.log("Received body text:", bodyText);

    let body;
    try {
      body = JSON.parse(bodyText);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing message in request body' }, { status: 400 });
    }

    console.log("Message sent to api/openai:", message);

    // const markdownString = await loadMarkdownFiles();

    const prompt = `
      You are a health specialist analyzing the same user's data for a week. Each day of data contains wellbeing, activity and sleep scores. Inside of each score there are factors.
      Your analysis should be comprehensive, focusing on general trends and behaviors rather than specific numerical scores.
      Please structure your response in the following format, using markdown headers:
      # Weekly Health Summary
      ## Overall Trends
      ## Strengths
      ## Areas for Improvement
      ## Impact on Well-being
      Remember to maintain a supportive and encouraging tone throughout your analysis.
      Focus on empowering the user with knowledge and practical advice for optimal health.
    \n\nAdditional Information:\n`;

    console.log("Sending request to OpenAI...");

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
      model: "gpt-4-turbo", // or "gpt-3.5-turbo" if you don't have access to GPT-4
      response_format: { type: "json_object" },
    });

    console.log("OpenAI request received.");

    const response = chatCompletion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('Empty response from OpenAI');
    }

    console.log("OpenAI raw response:", response);

    const parsedResponse = JSON.parse(response);
    console.log("Parsed OpenAI response:", parsedResponse);

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error('Error in API route:', error);
    console.log("error in request")
    return NextResponse.json({ error: (error as Error).message || 'An error occurred while processing your request.' }, { status: 500 });
  }
}