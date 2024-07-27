import React, { useState } from "react";
import { motion } from "framer-motion";

const cities = [
  "Buenos Aires",
  "Sydney",
  "San Francisco",
  "London",
  "Auckland",
];

const CustomAnimatedRadio = ({
  onSelectionChange,
}: {
  onSelectionChange: (city: string) => void;
}) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSelect = (city: string) => {
    setSelectedCity(city);
    onSelectionChange(city);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-black">Select your city</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {cities.map((city) => (
          <motion.div
            key={city}
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer
                        ${
                          selectedCity === city
                            ? "bg-purple-100"
                            : "bg-gray-100"
                        }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(city)}
          >
            <motion.div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${
                            selectedCity === city
                              ? "border-purple-500"
                              : "border-gray-400"
                          }`}
              animate={{
                backgroundColor: selectedCity === city ? "#8B5CF6" : "#FFFFFF",
              }}
              transition={{ duration: 0.2 }}
            >
              {selectedCity === city && (
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
            <span
              className={`text-sm ${
                selectedCity === city
                  ? "text-purple-700 font-medium"
                  : "text-gray-700"
              }`}
            >
              {city}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomAnimatedRadio;
