"use client";

import React, { useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import CustomTextEntry from "../app/components/CustomTextEntry";
import SymptomButtons from "../app/components/SymptomButtons";

type ButtonState = "current" | "potential" | "default";

interface Symptoms {
  current_symptoms: string[];
  potential_symptoms: string[];
}

export default function Home() {
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


  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (value: string): void => {
    setInputValue(value);
  };

  const sendGroq = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResponse("");
    setSymptoms({ current_symptoms: [], potential_symptoms: [] });

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Received data:", data);

      if (data.current_symptoms || data.potential_symptoms) {
        setSymptoms({
          current_symptoms: data.current_symptoms || [],
          potential_symptoms: data.potential_symptoms || [],
        });
        setResponse("Symptoms identified. See buttons below for details.");
      } else if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse("Received an unexpected response format.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse(
        `An error occurred: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-2 text-black">Achoo</h1>
      <p className="text-xl mb-8 text-black">
        Your personal sickness assistant
      </p>
      <div className="w-full max-w-2xl">
        <CustomTextEntry
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={sendGroq}
          placeholder="Enter your description..."
        />

        <Textarea
          isReadOnly
          label="LLM Output"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Response will appear here..."
          color="default"
          className="max-w-xs text-black rounded border-gray-300 border bg-gray-200 px mt-4 mb-4"
          value={isLoading ? "Loading..." : response}
        />

        <SymptomButtons
          currentSymptoms={symptoms.current_symptoms}
          potentialSymptoms={symptoms.potential_symptoms}
          onSymptomClick={handleSymptomClick}
        />
      </div>
    </main>
  );
}