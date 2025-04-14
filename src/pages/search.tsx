import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobeIcon } from "@radix-ui/react-icons";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useState } from "react";
import { DebateHistory, HistoryType, Provider } from "@/interfaces";
import { ExpandableCard } from "@/components/expandable-card";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import OpenAISvg from "@/assets/openai.svg";
import GoogleSvg from "@/assets/google.svg";
import AnthropicSvg from "@/assets/anthropic.svg";
import XAISvg from "@/assets/xai.svg";

export function SearchPage() {
  const [items, setItems] = useState<DebateHistory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [researching, setResearching] = useState<boolean>(false);
  const [provider, setProvider] = useState<Provider>(Provider.OpenAI);

  const research = async () => {
    setResearching(true);
    setItems([]);

    try {
      const eventSource = new EventSource(
        `${
          import.meta.env.VITE_API_BASE_URL
        }test/sse?question=${encodeURIComponent(searchText)}&rounds=2`
      );

      // Handle messages
      eventSource.onmessage = ({ data }) => {
        const historyItem: DebateHistory = JSON.parse(data);
        switch (historyItem.model) {
          case "OpenAI":
            if (historyItem.type === HistoryType.textResponse) {
              setProvider(Provider.Google);
            } else {
              setProvider(Provider.OpenAI);
            }
            break;
          case "Google":
            if (historyItem.type === HistoryType.textResponse) {
              setProvider(Provider.OpenAI);
            } else {
              setProvider(Provider.Google);
            }
            break;
          case "Anthropic":
            setProvider(Provider.Anthropic);
            break;
          case "xAI":
            setProvider(Provider.xAI);
            break;
        }
        setItems((prevVal) => [...prevVal, historyItem]);
      };

      // Handle errors
      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        eventSource.close();
        setResearching(false);
      };

      // Handle completion
      eventSource.addEventListener("complete", () => {
        eventSource.close();
        setResearching(false);
      });
    } catch (e) {
      console.error("Error setting up EventSource:", e);
      setResearching(false);
    }
  };

  return (
      <div className="flex flex-col gap-5 w-full max-w-6xl">
        <div className="flex flex-col items-center space-x-2 space-y-2 md:flex-row md:space-y-0">
          <Input
            type="search"
            value={searchText}
            disabled={researching}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                research();
              }
            }}
            placeholder="Enter your query..."
          />
          <Button type="button" onClick={research} disabled={researching}>
            {researching ? (
              <Spinner size="sm" className="bg-black" />
            ) : (
              <>
                <GlobeIcon className="mr-2 h-4 w-4" />
                Research
              </>
            )}
          </Button>
        </div>
        <div className="w-full flex justify-center">
          {researching &&
            (() => {
              switch (provider) {
                case Provider.OpenAI:
                  return (
                    <div className="w-full max-w-2xl flex justify-around">
                      <SparklesText>
                        <img
                          src={OpenAISvg}
                          className="w-16 h-16 rounded-full bg-white p-1"
                        ></img>
                      </SparklesText>
                      <img
                        src={GoogleSvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                      <img
                        src={AnthropicSvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                      <img
                        src={XAISvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                    </div>
                  );
                case Provider.Google:
                  return (
                    <div className="w-full h-16 max-w-2xl flex justify-around">
                      <img
                        src={OpenAISvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      ></img>
                      <SparklesText>
                        <img
                          src={GoogleSvg}
                          className="w-16 h-16 rounded-full bg-white p-1"
                        />
                      </SparklesText>
                      <img
                        src={AnthropicSvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                      <img
                        src={XAISvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                    </div>
                  );
                case Provider.Anthropic:
                  return (
                    <div className="w-full h-16 max-w-2xl flex justify-around">
                      <img
                        src={OpenAISvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      ></img>
                      <img
                        src={GoogleSvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                      <SparklesText>
                        <img
                          src={AnthropicSvg}
                          className="w-16 h-16 rounded-full bg-white p-1"
                        />
                      </SparklesText>
                      <img
                        src={XAISvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                    </div>
                  );
                case Provider.xAI:
                  return (
                    <div className="w-full h-16 max-w-2xl flex justify-around">
                      <img
                        src={OpenAISvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      ></img>
                      <img
                        src={GoogleSvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                      <img
                        src={AnthropicSvg}
                        className="w-16 h-16 rounded-full bg-white p-1"
                      />
                      <SparklesText>
                        <img
                          src={XAISvg}
                          className="w-16 h-16 rounded-full bg-white p-1"
                        />
                      </SparklesText>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
        </div>
        <div className="w-full">
          <AnimatedList>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <ExpandableCard item={item} />
              </React.Fragment>
            ))}
          </AnimatedList>
        </div>
      </div>
  );
}
