import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

    const prompt = `
        # 🏥 Health Analysis Guide

        You are a health specialist analyzing the user's data for a week. Each day of data contains wellbeing, activity, and sleep scores. Your analysis should be comprehensive, focusing on general trends and behaviors rather than specific numerical scores.

        ## 📊 Weekly Health Summary

        ### 📈 Overall Trends
        [Provide a brief overview of the general health trends observed over the week]

        ### 💪 Strengths
        - **[Strength Title]**: [Description of the strength]
        - **[Strength Title]**: [Description of the strength]

        ### 🎯 Areas for Improvement
        - **[Area Title]**: [Description of the area needing improvement]
        - **[Area Title]**: [Description of the area needing improvement]

        ### 🌟 Impact on Wellbeing

        #### 😊 Positive Impacts
        - **[Aspect]**: [Description of the positive impact]
        - **[Aspect]**: [Description of the positive impact]

        #### ⚠️ Potential Risks
        - **[Risk]**: [Description of the potential risk]
        - **[Risk]**: [Description of the potential risk]

        ### 💡 Advice
        [Provide practical advice for improving overall health based on the analysis]

        ## 🤒 Current Symptoms
        - [Symptom 1]
        - [Symptom 2]
        - [Symptom 3]

        ## 🩺 Potential Diagnosis
        **Condition**: [Name of the potential condition]

        **Description**: [Brief description of the condition]

        **Recommendations**:
        1. 💊 [Recommendation 1]
        2. 🍎 [Recommendation 2]
        3. 🧘 [Recommendation 3]

        Maintain a supportive and encouraging tone throughout your analysis. Focus on empowering the user with knowledge and practical advice for optimal health. Ensure all sections are filled with appropriate content based on the provided data.
        Provide your answer in strict markdown format.

        Additional Information:
        [Any additional context or information provided by the user]
    `;

    console.log("Sending request to OpenAI...");

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
      model: "gpt-4o", // or "gpt-3.5-turbo" if you don't have access to GPT-4
    });

    console.log("OpenAI request received.");

    const response = chatCompletion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('Empty response from OpenAI');
    }

    console.log("OpenAI response:", response);

    return NextResponse.json({ response });

  } catch (error) {
    console.error('Error in API route:', error);
    console.log("error in request")
    return NextResponse.json({ error: (error as Error).message || 'An error occurred while processing your request.' }, { status: 500 });
  }
}