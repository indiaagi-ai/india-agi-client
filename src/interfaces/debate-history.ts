import { Item } from "@/interfaces";

export interface DebateHistory {
  type: "InternetSearch" | "TextResponse" | "RoundUpdate" | "ProviderUpdate";
  model: "OpenAI" | "Anthropic" | "Google" | "xAI" | "Groq";
  response?: string;
  internetSearch?: InternetSearch;
  roundNumber?: number;
}

export enum HistoryType {
  internetSearch = "InternetSearch",
  textResponse = "TextResponse",
  roundUpdate = "RoundUpdate",
}

export interface InternetSearch {
  searchQuery: string;
  searchResponse: Item[];
}
