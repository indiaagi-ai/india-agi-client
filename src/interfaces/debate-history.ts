import { Item } from "@/interfaces";

export interface DebateHistory {
  type: "InternetSearch" | "TextResponse";
  model: "OpenAI" | "Anthropic" | "Google" | "xAI" | "Groq";
  response?: string;
  internetSearch?: InternetSearch;
}

export enum HistoryType {
  internetSearch = "InternetSearch",
  textResponse = "TextResponse",
}

export interface InternetSearch {
  searchQuery: string;
  searchResponse: Item[];
}
