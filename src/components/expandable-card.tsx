import {
  Bell,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { type DebateHistory, HistoryType } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { ShineBorder } from "@/components/magicui/shine-border";
import OpenAISvg from "@/assets/openai.svg";
import GoogleSvg from "@/assets/google.svg";
import AnthropicSvg from "@/assets/anthropic.svg";
import XAISvg from "@/assets/xai.svg";

export function ExpandableCard({ item }: { item: DebateHistory }) {
  const [expanded, setExpanded] = useState(false);

  const getModelName = (
    provider: "OpenAI" | "Anthropic" | "Google" | "xAI" | "Groq"
  ): string => {
    switch (provider) {
      case "OpenAI":
        return "GPT";
      case "Google":
        return "Gemini";
      case "Anthropic":
        return "Claude";
      case "xAI":
        return "Grok";
      case "Groq":
        return "Llama";
    }
  };

  // Determine icon and color based on provider
  const getProviderStyles = (
    provider: "OpenAI" | "Anthropic" | "Google" | "xAI" | "Groq"
  ) => {
    switch (provider) {
      case "OpenAI":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
          icon: <img src={OpenAISvg} className="w-5 h-5 rounded-full" />,
        };
      case "Google":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
          icon: <img src={GoogleSvg} className="w-5 h-5 rounded-full" />,
        };
      case "Anthropic":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
          icon: <img src={AnthropicSvg} className="w-5 h-5 rounded-full" />,
        };
      case "xAI":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
          icon: <img src={XAISvg} className="w-5 h-5 rounded-full" />,
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          borderColor: "border-gray-200",
          icon: <Bell className="h-5 w-5" />,
        };
    }
  };

  const providerStyles = getProviderStyles(item.model);

  return (
    <Card
      className={`border ${
        providerStyles.borderColor
      } shadow-sm transition-all duration-300 mb-4 backdrop-blur-md [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ${
        expanded ? "ring-2 ring-offset-2 ring-gray-200" : ""
      }`}
    >
      <ShineBorder
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        borderWidth={5}
      />

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-full ${providerStyles.bgColor} ${providerStyles.textColor} flex-shrink-0`}
          >
            {item.type === HistoryType.internetSearch ? (
              <Search className="h-5 w-5" />
            ) : (
              providerStyles.icon
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-medium">
                {getModelName(item.model)}{" "}
                {item.type === HistoryType.internetSearch
                  ? "searched the Internet"
                  : "Responsed"}
              </div>
            </div>

            {item.type === HistoryType.internetSearch &&
              item.internetSearch && (
                <div className="space-y-2">
                  <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                    <p className="text-sm font-medium font-fira_code">
                      Search query: "{item.internetSearch.searchQuery}"
                    </p>
                  </BoxReveal>
                  <div className="space-y-3 mt-2">
                    {item.internetSearch.searchResponse
                      .slice(0, expanded ? undefined : 2)
                      .map((result, idx) => (
                        <div
                          key={idx}
                          className="bg-[#f0f4f9] p-3 rounded-md text-sm"
                        >
                          <div className="flex justify-between items-start">
                            <a
                              href={result.link}
                              className="font-medium text-blue-600 hover:underline block mb-1 flex-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                                <>{result.title}</>
                              </BoxReveal>
                            </a>
                            <a
                              href={result.link}
                              className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                            <p className="text-gray-600 mb-2">
                              {result.snippet}
                            </p>
                          </BoxReveal>
                          {expanded && (
                            <p className="text-gray-700 text-xs mt-2 border-t pt-2">
                              <ReactMarkdown>{result.content}</ReactMarkdown>
                            </p>
                          )}
                        </div>
                      ))}
                    {!expanded &&
                      item.internetSearch.searchResponse.length > 2 && (
                        <p className="text-xs text-gray-500">
                          + {item.internetSearch.searchResponse.length - 2} more
                          results
                        </p>
                      )}
                  </div>
                </div>
              )}

            {item.type === HistoryType.textResponse && item.response && (
              <div className="text-sm whitespace-pre-line font-fira_code">
                {expanded ? (
                  <ReactMarkdown>{item.response}</ReactMarkdown>
                ) : (
                  <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                    <ReactMarkdown>{`${item.response.substring(
                      0,
                      300
                    )}...`}</ReactMarkdown>
                  </BoxReveal>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-gray-500 hover:text-gray-700 flex items-center gap-1"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" /> Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" /> Show more
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
