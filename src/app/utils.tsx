import { Symptoms, JigsawStackResult } from "./types";

export async function sendGroq(
  message: string,
  systemPrompt: string
): Promise<any> {
  if (!message.trim()) return;

  try {
    const res = await fetch("/api/groq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, systemPrompt }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Received data:", data);
    return data;
  } catch (error) {
    console.error("Error in sendGroq:", error);
    throw error;
  }
}

export async function getWeekInsight(): Promise<string> {
  try {
    const scoresResponse = await fetch(
      "/sahha_sample_data/sample_sahha_scores_full.json"
    );
    if (!scoresResponse.ok) {
      throw new Error(
        `Failed to fetch sample data: ${scoresResponse.status} ${scoresResponse.statusText}`
      );
    }

    const scoresData = await scoresResponse.json();
    const firstRow = scoresData[0];
    const startDate = new Date(firstRow.scoreDateTime);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    const weekData: string[] = [];

    for (const row of scoresData) {
      const rowDate = new Date(row.scoreDateTime);
      if (rowDate >= startDate && rowDate <= endDate) {
        weekData.push(JSON.stringify(row));
      }
      if (weekData.length === 21) {
        break;
      }
    }

    const queryObject = {
      message: `Week Time Series Data: ${JSON.stringify(weekData)}`,
    };

    const result = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryObject),
    });

    if (!result.ok) {
      throw new Error(
        `API request failed: ${result.status} ${result.statusText}`
      );
    }

    const json = await result.json();
    return json.response;
  } catch (err) {
    console.error("Error in getWeekInsight:", err);
    throw err;
  }
}

export async function scrapeWithJigsawStack(
  url: string,
  elementPrompts: string[]
): Promise<JigsawStackResult> {
  try {
    const response = await fetch("/api/jigsawstack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        elementPrompts,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error scraping with JigsawStack:", error);
    throw error;
  }
}

export async function chainedFunction(
  url: string,
  elementPrompts: string[],
  inputValue: string,
  setLoadingStep: (step: string | null) => void,
  setSymptoms: React.Dispatch<React.SetStateAction<Symptoms>>,
  setSahhaOutput: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<void> {
  try {
    setLoadingStep("Groking your yucky sickness...");
    const symptomPrompt = `
      You are a personal health assistant. Based on the user's description of their symptoms, 
      output a JSON object with the following structure:
      {
        "current_symptoms": ["symptom1", "symptom2", ...],
        "potential_symptoms": ["symptom1", "symptom2", ...]
      }
      Ensure only the names of the symptoms are provided.`;

    const symptomResult = await sendGroq(inputValue, symptomPrompt);
    setSymptoms(symptomResult);

    setLoadingStep("Jigsawing and stacking recent events...");
    const jigsawResult = await scrapeWithJigsawStack(url, elementPrompts);
    console.log("Jigsaw Result:", jigsawResult);

    setLoadingStep("Getting inference...");
    const structuredMessage = `
      User Input: ${inputValue}\n
      Current Events: ${JSON.stringify(jigsawResult)}\n
      Current Symptoms: ${JSON.stringify(symptomResult.current_symptoms)}
      Past Week Health Summary: ${await getWeekInsight()}

      Based on the above information, please provide a detailed analysis and potential diagnosis.`;

    const queryObject = {
      message: structuredMessage,
    };

    const result = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryObject),
    });

    if (!result.ok) {
      throw new Error(
        `API request failed: ${result.status} ${result.statusText}`
      );
    }

    const data = await result.json();
    setSahhaOutput(data.response);
    console.log("API response data retrieved successfully and stored");
  } catch (error) {
    console.error("Error in chained function:", error);
    throw error;
  }
}

export async function handleChainedFunction(
  inputValue: string,
  setIsLoading: (isLoading: boolean) => void,
  setResponse: (response: string) => void,
  setSymptoms: React.Dispatch<React.SetStateAction<Symptoms>>,
  setLoadingStep: (step: string | null) => void,
  setSahhaOutput: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  if (!inputValue.trim()) return;

  setIsLoading(true);
  setResponse("");
  setSymptoms({ current_symptoms: [], potential_symptoms: [] });
  setLoadingStep(null);

  try {
    const url =
      "https://www.kqed.org/news/11987343/covid-bay-area-wastewater-variant-symptoms-isolation-guidance";
    const elementPrompts = ["title", "headlines", "covid cases"];

    await chainedFunction(
      url,
      elementPrompts,
      inputValue,
      setLoadingStep,
      setSymptoms,
      setSahhaOutput
    );

    await new Promise((resolve) => setTimeout(resolve, 100));
  } catch (error) {
    console.error("Error in handleChainedFunction:", error);
    setResponse(
      `An error occurred: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  } finally {
    setIsLoading(false);
    setLoadingStep(null);
  }
}
