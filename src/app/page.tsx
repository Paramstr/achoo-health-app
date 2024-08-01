"use client";

import React, { useState, useEffect } from "react";
import * as Components from "../app/components/index";
import { handleChainedFunction } from "./utils";
import { Symptoms, ButtonState } from "./types";

export default function Home() {
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const [Sahha_healthData, setHealthData] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [symptoms, setSymptoms] = useState<Symptoms>({
    current_symptoms: [],
    potential_symptoms: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sahhaOutput, setSahhaOutput] = useState<string>();
  const [placeholderText, setPlaceholderText] = useState("");

  //For retrieving Sahha Health Data
  useEffect(() => {
    fetch("/api/health-data")
      .then((response) => response.json())
      .then((data) => setHealthData(data.data))
      .catch((error) => console.error("Error loading health data:", error));
  }, []);

  //For Input Box
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
          }, 2000);
        }
      }, 50);
    };

    typeText();

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  //Handle City Selection
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    console.log("Selected city:", city);
  };

  const handleInputChange = (value: string): void => {
    setInputValue(value);
  };

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

  const onSubmit = () => {
    handleChainedFunction(
      inputValue,
      setIsLoading,
      setResponse,
      setSymptoms,
      setLoadingStep,
      setSahhaOutput
    );
  };

  //Sahha Button
  const SahhaConnectButton = () => {
    const [isConnected, setIsConnected] = useState(false);

    const handleSahhaClick = () => {
      console.log("sahha button clicked");
      if (!isConnected) {
        setIsConnected(true);
        // Assuming getWeekInsight is now handled within handleChainedFunction
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-9xl font-bold mb-4 text-black font-pixelated">
        Achoo
      </h1>
      <p className="text-2xl mb-8 text-black pb-5">
        Super Supportive Sickness Buddy 🤧
      </p>
      <SahhaConnectButton />

      <div className="p-8">
        <Components.CustomAnimatedRadio onSelectionChange={handleCityChange} />
        {selectedCity && (
          <p className="mt-4 text-lg text-gray-500">
            You selected: {selectedCity}
          </p>
        )}
      </div>

      <div className="w-full max-w-4xl">
        <Components.CustomTextEntry
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={onSubmit}
          placeholder={placeholderText}
        />

        <div className="flex justify-center w-full">
          <LoadingIndicator />
        </div>

        <Components.SymptomButtons
          currentSymptoms={symptoms.current_symptoms}
          potentialSymptoms={symptoms.potential_symptoms}
          onSymptomClick={handleSymptomClick}
        />

        {!isLoading && sahhaOutput && (
          <div className="p-8">
            <Components.HealthSummary data={sahhaOutput} />
          </div>
        )}
      </div>
    </main>
  );
}
