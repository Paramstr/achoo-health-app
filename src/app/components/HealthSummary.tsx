import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownDisplayProps {
  data: string;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ data }) => {
  return (
    <div className="markdown-display p-4 bg-white shadow-md rounded text-black">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
