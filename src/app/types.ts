export interface Symptoms {
  current_symptoms: string[];
  potential_symptoms: string[];
}

export interface MarkdownFile {
  name: string;
  content: string;
}

export type ButtonState = "current" | "potential" | "default";

export interface JigsawStackResult {
  // Define the structure of the JigsawStack result here
  // For example:
  title?: string;
  headlines?: string[];
  covidCases?: number;
}