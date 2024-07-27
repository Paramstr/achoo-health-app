import React from "react";
import { Button } from "@nextui-org/react";

const CartoonButton = ({ color, textColor, children }: { color: string, textColor: string, children: React.ReactNode }) => (
  <Button
    className={`
      ${color === "green" ? "bg-green-400" : "bg-yellow-400"}
      ${textColor}
      font-bold py-2 px-4 rounded-lg
      border-b-4 border-r-4
      ${color === "green" ? "border-green-700" : "border-yellow-700"}
      shadow-inner
      transform hover:scale-105 transition-transform duration-200
      active:translate-y-1 active:border-b-2 active:border-r-2
    `}
    size="sm"
  >
    {children}
  </Button>
);

export default function SymptomButtons({ currentSymptoms, potentialSymptoms }: { currentSymptoms: string[], potentialSymptoms: string[] }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-black">Current Symptoms:</h3>
        <div className="flex flex-wrap gap-2">
          {currentSymptoms.map((symptom, index) => (
            <CartoonButton key={index} color="green" textColor="text-white">
              {symptom}
            </CartoonButton>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 - text-black">Potential Symptoms:</h3>
        <div className="flex flex-wrap gap-2">
          {potentialSymptoms.map((symptom, index) => (
            <CartoonButton key={index} color="yellow" textColor="text-black">
              {symptom}
            </CartoonButton>
          ))}
        </div>
      </div>
    </div>
  );
}
