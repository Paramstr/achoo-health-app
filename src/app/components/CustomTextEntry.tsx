import React, { useRef, useEffect } from "react";

interface CustomTextEntryProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const CustomTextEntry: React.FC<CustomTextEntryProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Enter your text here...",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="w-full p-3 text-black border-2 border-black rounded-lg resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ minHeight: "48px" }}
      />
    </div>
  );
};

export default CustomTextEntry;
