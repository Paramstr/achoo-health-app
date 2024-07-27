// app/api/groq/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const prompt = `
    You are a personal health assistant. Based on the user's description of their symptoms, 
    output a JSON object with the following structure:
    {
      "current_symptoms": ["symptom1", "symptom2", ...],
      "potential_symptoms": ["symptom1", "symptom2", ...]
    }
    Ensure only the names of the symptoms are provided.
    User: ${message}`;

    console.log("Sending request to Groq:");
    console.log(prompt);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-70b-versatile",
      response_format: { type: "json_object" },
    });

    const response = chatCompletion.choices[0]?.message?.content || "{}";
    console.log("CONSOLE: Groq request received.");
    console.log(response)

    // Parse the JSON response
    const parsedResponse = JSON.parse(response);

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}