"use client";

import React, { useState, useEffect } from "react";
import { Textarea, Button, Spinner } from "@nextui-org/react";
import CustomTextEntry from "../app/components/CustomTextEntry";
import SymptomButtons from "../app/components/SymptomButtons";
import CustomAnimatedRadio from "../app/components/CustomAnimatedRadio";
import HealthSummary from "../app/components/HealthSummary";  // Adjust the import path as necessary

import { RadioGroup, Radio } from "@nextui-org/react";



type ButtonState = "current" | "potential" | "default";

interface Symptoms {
  current_symptoms: string[];
  potential_symptoms: string[];
}


interface MarkdownFile {
  name: string;
  content: string;
}
export default function Home() {
  // Add a new state variable for tracking the current step
  const [loadingStep, setLoadingStep] = useState<string | null>(null);

  //Get health data
  const [Sahha_healthData, setHealthData] = useState<string>("");
  

  useEffect(() => {
    fetch("/api/health-data")
      .then((response) => response.json())
      .then((data) => setHealthData(data.data))
      .catch((error) => console.error("Error loading health data:", error));
  }, []);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    console.log("Selected city:", city);
    // You can perform any other actions with the selected city here
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [symptoms, setSymptoms] = useState<Symptoms>({
    current_symptoms: [],
    potential_symptoms: [],
  });

  // Sympytom Buttons
  const handleSymptomClick = (symptom: string, state: ButtonState) => {
    if (state === "potential") {
      setSymptoms((prevSymptoms) => ({
        current_symptoms: [...prevSymptoms.current_symptoms, symptom],
        potential_symptoms: prevSymptoms.potential_symptoms.filter(
          (s) => s !== symptom
        ),
      }));
    }
  };

  // Textfield Placeholder animation
  const [placeholderText, setPlaceholderText] = useState("");

  useEffect(() => {
    const placeholderTexts = [
      "I heard you're sick. whats your symptoms..",
      "Feeling weird? I reckon its strep..",
      "Stop taking soo long..",
      "Probably shouldn't have gone out last night..",
      "What's your symptoms mate..",
    ];
    let currentPlaceholderIndex = 0;
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;

    const typeText = () => {
      const fullPlaceholder = placeholderTexts[currentPlaceholderIndex];
      typingInterval = setInterval(() => {
        setPlaceholderText(fullPlaceholder.slice(0, currentIndex));
        currentIndex++;
        if (currentIndex > fullPlaceholder.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            currentIndex = 0;
            currentPlaceholderIndex =
              (currentPlaceholderIndex + 1) % placeholderTexts.length;
            typeText();
          }, 2000); // Wait for 2 seconds before showing the next placeholder
        }
      }, 50);
    };

    typeText();

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  /////

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (value: string): void => {
    setInputValue(value);
  };
  ////////////////////////////////////////////////////////////////////
  //*Send Groq Data
  // Updated sendGroq function
  const sendGroq = async (
    message: string,
    systemPrompt: string
  ): Promise<void> => {
    if (!message.trim()) return;

    setIsLoading(true);

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

      if (
        systemPrompt.includes(
          "output a JSON object with the following structure"
        )
      ) {
        // This is the symptom identification prompt
        if (data.current_symptoms || data.potential_symptoms) {
          setSymptoms({
            current_symptoms: data.current_symptoms || [],
            potential_symptoms: data.potential_symptoms || [],
          });
        }
      } else {
        // This is the LLM analysis prompt
        setResponse(data.response || JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error in sendGroq:", error);
      setResponse(
        `An error occurred: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////////
  async function getWeekInsight() {
    console.log("DEBUG 1");

    console.log("Starting getWeekInsight function");
    try {
      const scoresResponse = await fetch(
        "/sahha_sample_data/sample_sahha_scores_full.json"
      );
      console.log("Sample scores response status:", scoresResponse.status);

      if (!scoresResponse.ok) {
        throw new Error(
          `Failed to fetch sample data: ${scoresResponse.status} ${scoresResponse.statusText}`
        );
      }

      //Getting Whole week of data
      /* ################################################################# */

      const scoresData = await scoresResponse.json();
      const firstRow = scoresData[0];
      const startDate = new Date(firstRow.scoreDateTime);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // Get the end date (7 days inclusive)

      const weekData: string[] = [];

      for (const row of scoresData) {
        const rowDate = new Date(row.scoreDateTime);
        if (rowDate >= startDate && rowDate <= endDate) {
          weekData.push(JSON.stringify(row));
        }
        if (weekData.length === 21) {
          break; // Exit loop if we've found all 21 rows (7 days * 3 types)
        }
      }

      console.log("Week data retrieved successfully:", weekData);

      const queryObject = {
        message: `Week Time Series Data: ${JSON.stringify(weekData)}`,
      };

      console.log("QueryObject:", queryObject); // For debugging

      const result = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryObject),
      });
      //Over here?
      if (!result.ok) {
        throw new Error(
          `API request failed: ${result.status} ${result.statusText}`
        );
      }

      const json = await result.json();
      setSahhaOutput(json); // Adjust according to the actual data structure
      console.log("API response data retrieved successfully and stored");
    } catch (err) {
      console.error("Error in getWeekInsight:", err);
    } finally {
      console.log("getWeekInsight function completed");
    }
  }

  ///Sauua button
  // const SahhaConnectButton = () => {
  // const [buttonText, setButtonText] = useState("Connect Sahha Data");

  // const handleSahhaClick = () => {
  //   setButtonText("Connected Sahha Data");
  // };

  ///Sahha button
  const SahhaConnectButton = () => {
    const [isConnected, setIsConnected] = useState(false);

    const handleSahhaClick = () => {
      console.log("sahha button clicked");
      if (!isConnected) {
        setIsConnected(true);
        getWeekInsight(); // Call getWeekInsight when button is clicked
      }
    };

    return (
      <button
        className={`rounded-md p-4 text-lg mb-4 ${
          isConnected ? "bg-green-500 text-white" : "bg-black text-white"
        }`}
        onClick={handleSahhaClick}
      >
        {isConnected ? (
          <>
            <span className="mr-2">&#10003;</span> ✅ Sahha Data Connected
          </>
        ) : (
          " ✅ Sahha Data Connected"
        )}
      </button>
    );
  };

  const [jigsawResult, setJigsawResult] = useState(null);
  async function scrapeWithJigsawStack(url: string, elementPrompts: string[]) {
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

  const [sahhaOutput, setSahhaOutput] = useState<string>();

  // Update the chainedFunction to use the new loadingStep state
  async function chainedFunction(
    url: string,
    elementPrompts: string[],
    inputValue: string
  ) {
    try {
      // Step 1: First Groq call for symptoms
      setLoadingStep("Groking your yucky sickness...");
      const symptomPrompt = `
        You are a personal health assistant. Based on the user's description of their symptoms, 
        output a JSON object with the following structure:
        {
          "current_symptoms": ["symptom1", "symptom2", ...],
          "potential_symptoms": ["symptom1", "symptom2", ...]
        }
        Ensure only the names of the symptoms are provided.`;

      await sendGroq(inputValue, symptomPrompt);

      // Step 2: Call Jigsaw
      setLoadingStep("Jigsawing and stacking recent events...");
      const jigsawResult = await scrapeWithJigsawStack(url, elementPrompts);
      setJigsawResult(jigsawResult);
      console.log("Jigsaw Result:", jigsawResult);

      // Step 3: Second GPT4 call for LLM analysis
      setLoadingStep("Getting inference...");
      // const analysisPrompt = `
      //   You are a medical assistant. Use the provided current events and current symptoms to provide a more detailed analysis.
      //   The current events provide wider geographical context for the user.
      //   Output your response as a JSON object with the following structure:
      //   {
      //     "response": "Your detailed analysis and potential diagnosis here"
      //   }`;
      const structuredMessage = `
        User Input: ${inputValue}\n
        Current Events: ${JSON.stringify(jigsawResult)}\n
        Current Symptoms: ${JSON.stringify(symptoms.current_symptoms)}
        Past Week Health Summary: ${JSON.stringify(Sahha_healthData)}

        Based on the above information, please provide a detailed analysis and potential diagnosis.`;

      const queryObject = {
        message: `${JSON.stringify(structuredMessage)}`,
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
      console.log("Type of data.response:", typeof data.response); // This will log the type of data.response
      const responseAsString = JSON.stringify(data.response); // Convert the response to a string
      console.log("Type of responseAsString:", typeof responseAsString); // This will log the type of responseAsString
      setSahhaOutput(data.response); // Store the string version of the response
      console.log("API response data retrieved successfully and stored");
      console.log("Chained function completed successfully");

      console.log("Chained function completed successfully");
    } catch (error) {
      console.error("Error in chained function:", error);
      setResponse(
        `An error occurred: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoadingStep(null); // Reset loading step when done
    }
  }

  // Update the handleChainedFunction to reset loadingStep
  const handleChainedFunction = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResponse("");
    setSymptoms({ current_symptoms: [], potential_symptoms: [] });
    setLoadingStep(null); // Reset loading step

    try {
      const url =
        "https://www.kqed.org/news/11987343/covid-bay-area-wastewater-variant-symptoms-isolation-guidance";
      const elementPrompts = ["title", "headlines", "covid cases"];

      await chainedFunction(url, elementPrompts, inputValue);

      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log("Updated symptoms:", symptoms);
      console.log("Updated response:", response);
    } catch (error) {
      console.error("Error in handleChainedFunction:", error);
      setResponse(
        `An error occurred: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
      setLoadingStep(null); // Ensure loading step is reset
    }
  };

  // Updated LoadingIndicator component with custom CSS spinner
  const LoadingIndicator = () => {
    if (loadingStep) {
      return (
        <div className="flex items-center space-x-2 text-gray-600 my-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
          <span>{loadingStep}</span>
        </div>
      );
    } else {
      return null;
    }
  };

  ////////////////////////////////////////////////////////////////////

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-9xl font-bold mb-4 text-black font-pixelated">
        Achoo
      </h1>
      <p className="text-2xl mb-8 text-black pb-5">
        Super Supportive Sickness Buddy
      </p>
      {/* Sahha button  */}
      <SahhaConnectButton />

      <div className="p-8">
        <CustomAnimatedRadio onSelectionChange={handleCityChange} />
        {selectedCity && (
          <p className="mt-4 text-lg text-gray-500">
            You selected: {selectedCity}
          </p>
        )}
      </div>

      <div className="w-full max-w-4xl">
        <CustomTextEntry
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleChainedFunction}
          placeholder={placeholderText}
        />

        <div className="flex justify-center w-full">
          <LoadingIndicator />
        </div>

        {/* <Textarea
          isReadOnly
          label="LLM Output"
          variant="bordered"
          labelPlacement="outside"
          placeholder=""
          color="default"
          className="max-w-xs text-black rounded border-gray-300 border bg-gray-200 px mt-4 mb-4"
          value={isLoading ? "Loading..." : response}
        /> */}

        <SymptomButtons
          currentSymptoms={symptoms.current_symptoms}
          potentialSymptoms={symptoms.potential_symptoms}
          onSymptomClick={handleSymptomClick}
        />

        {!isLoading && sahhaOutput && (
          <div className="p-8">
            {" "}
            {/* Adjust padding as needed */}
            <HealthSummary data={sahhaOutput} />
          </div>
        )}
      </div>
    </main>
  );
}