import React from "react";
import { Button } from "@nextui-org/react";

type ButtonState = "current" | "potential" | "default";

interface CartoonButtonProps {
  state: ButtonState;
  children: React.ReactNode;
  onClick: () => void;
}

const CartoonButton: React.FC<CartoonButtonProps> = ({
  state,
  children,
  onClick,
}) => {
  const getButtonStyles = (state: ButtonState): string => {
    switch (state) {
      case "current":
        return "bg-green-500 text-white border-green-700";
      // border-green-700"
      case "potential":
        return "bg-yellow-400 text-black border-yellow-600";
      default:
        return "bg-gray-300 text-black border-gray-500";
    }
  };

  return (
    <Button
      className={`
        ${getButtonStyles(state)}
        font-bold py-2 px-4 rounded-lg
        border-b-4 border-r-20
        
        transform hover:scale-105 transition-transform duration-200
        active:translate-y-1 active:border-b-2 active:border-r-2
      `}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

interface SymptomButtonsProps {
  currentSymptoms: string[];
  potentialSymptoms: string[];
  onSymptomClick: (symptom: string, state: ButtonState) => void;
}

const SymptomButtons: React.FC<SymptomButtonsProps> = ({
  currentSymptoms,
  potentialSymptoms,
  onSymptomClick,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-black">
          Current Symptoms:
        </h3>
        <div className="flex flex-wrap gap-2">
          {currentSymptoms.map((symptom, index) => (
            <CartoonButton key={index} state="current" onClick={() => {}}>
              {symptom}
            </CartoonButton>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-black">
          Potential Symptoms:
        </h3>
        <div className="flex flex-wrap gap-2">
          {potentialSymptoms.map((symptom, index) => (
            <CartoonButton
              key={index}
              state="potential"
              onClick={() => onSymptomClick(symptom, "potential")}
            >
              {symptom}
            </CartoonButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SymptomButtons;
