import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobeIcon } from "@radix-ui/react-icons";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useState } from "react";
import { DebateHistory, Provider } from "@/interfaces";
import { ExpandableCard } from "@/components/expandable-card";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import OpenAISvg from "@/assets/openai.svg";
import GoogleSvg from "@/assets/google.svg";
import AnthropicSvg from "@/assets/anthropic.svg";
import XAISvg from "@/assets/xai.svg";
import Divider from "@/components/ui/divider";
import { ShineBorder } from "@/components/magicui/shine-border";

export function SearchPage() {
  const [items, setItems] = useState<DebateHistory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [researching, setResearching] = useState<boolean>(false);
  const [provider, setProvider] = useState<Provider>(Provider.OpenAI);

  const providers = [
    { id: Provider.OpenAI, icon: OpenAISvg },
    { id: Provider.Google, icon: GoogleSvg },
    { id: Provider.Anthropic, icon: AnthropicSvg },
    { id: Provider.xAI, icon: XAISvg },
  ];

  const research = async () => {
    setResearching(true);
    setItems([]);

    try {
      const eventSource = new EventSource(
        `${
          import.meta.env.VITE_API_BASE_URL
        }test/sse?question=${encodeURIComponent(searchText)}&rounds=3`
      );

      // Handle messages
      eventSource.onmessage = ({ data }) => {
        const historyItem: DebateHistory = JSON.parse(data);
        switch (historyItem.model) {
          case "OpenAI":
            setProvider(Provider.OpenAI);
            break;
          case "Google":
            setProvider(Provider.Google);
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
      {researching && (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl flex justify-around">
            {providers.map(({ id, icon }) => (
              <div key={id} className="w-full">
                {id === provider ? (
                  <div className="relative w-16 h-16 rounded-full">
                    <ShineBorder
                      shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                      borderWidth={8}
                      duration={2}
                    />
                    <img
                      src={icon}
                      className="w-16 h-16 rounded-full bg-blue-100 p-3"
                    />
                  </div>
                ) : (
                  <img
                    src={icon}
                    className="w-16 h-16 rounded-full bg-blue-100 p-3"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-full">
        <AnimatedList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === "RoundUpdate" ? (
                <Divider
                  label={`Round ${item.roundNumber} ended ...`}
                  dotted={false}
                />
              ) : (
                <ExpandableCard item={item} />
              )}
            </React.Fragment>
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
