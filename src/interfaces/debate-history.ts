import { Item } from "@/interfaces";

export interface DebateHistory {
  type:
    | "InternetSearch"
    | "TextResponse"
    | "RoundUpdate"
    | "ProviderUpdate"
    | "FinalConsensusButtons";
  model: "OpenAI" | "Anthropic" | "Google" | "xAI" | "Groq" | "DeepSeek";
  response?: string;
  internetSearch?: InternetSearch;
  roundNumber?: number;
}

export enum HistoryType {
  internetSearch = "InternetSearch",
  textResponse = "TextResponse",
  roundUpdate = "RoundUpdate",
  finalConsensusButtons = "FinalConsensusButtons",
}

export interface InternetSearch {
  searchQuery: string;
  searchResponse: Item[];
}
