import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";

interface MarkdownDisplayProps {
  data: string;
}


const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ data }) => {
  const trimmedData = data.trim();

    console.log("Data Type:", typeof data);
    console.log("Trimmed Data Type:", typeof trimmedData);

    console.log("Data Value:", data);
    console.log("Trimmed Data Value:", trimmedData);


  return (
    <div className="markdown-body p-4 bg-white shadow-md rounded text-black">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
