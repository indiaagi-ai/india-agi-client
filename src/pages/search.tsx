import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobeIcon } from "@radix-ui/react-icons";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useState, useRef, forwardRef } from "react";
import { DebateHistory, Provider } from "@/interfaces";
import { ExpandableCard } from "@/components/expandable-card";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import OpenAISvg from "@/assets/openai.svg";
import GoogleSvg from "@/assets/google.svg";
import AnthropicSvg from "@/assets/anthropic.svg";
import XAISvg from "@/assets/xai.svg";
import Divider from "@/components/ui/divider";
import UserSvg from "@/assets/user.svg";
import { ShineBorder } from "@/components/magicui/shine-border";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { cn } from "@/lib/utils";
import { LoopIcon } from "@radix-ui/react-icons";
import { BoxReveal } from "@/components/magicui/box-reveal";

export function SearchPage() {
  const [items, setItems] = useState<DebateHistory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [researching, setResearching] = useState<boolean>(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [round, setRound] = useState<number>(1);

  const providers = [
    { id: Provider.OpenAI, icon: OpenAISvg },
    { id: Provider.Google, icon: GoogleSvg },
    { id: Provider.Anthropic, icon: AnthropicSvg },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const consensusContainerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  const userIconRef = useRef<HTMLDivElement>(null);
  const userQueryRef = useRef<HTMLDivElement>(null);

  const getModelRef = (provider: Provider) => {
    switch (provider) {
      case Provider.OpenAI:
        return div1Ref;
      case Provider.Google:
        return div2Ref;
      case Provider.Anthropic:
        return div3Ref;
      case Provider.xAI:
        return div4Ref;
    }
  };

  const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
  >(({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 relative flex items-center justify-center",
          className
        )}
      >
        {children}
      </div>
    );
  });

  const research = async () => {
    setResearching(true);
    setItems([]);
    setProvider(Provider.OpenAI);
    setRound(1);

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
        if (historyItem.type === "RoundUpdate" && historyItem.roundNumber) {
          if (historyItem.roundNumber === 3) return;
          setRound(historyItem.roundNumber + 1);
        }
        if (historyItem.type !== "ProviderUpdate") {
          setItems((prevVal) => [...prevVal, historyItem]);
        }
      };

      // Handle errors
      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        eventSource.close();
        setResearching(false);
        setProvider(null);
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
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-3/6 flex justify-center">
          {(researching || items.length > 0) && (
            <div
              className="relative flex flex-col gap-10 w-full h-[60vh] max-w-6xl border border-dashed border-black p-5 rounded-3xl justify-center"
              ref={outerContainerRef}
            >
              <Circle ref={userIconRef}>
                <div className="relative w-16 h-16 rounded-full">
                  <img
                    src={UserSvg}
                    className="w-16 h-16 rounded-full bg-blue-100 p-3"
                  />
                </div>
              </Circle>
              <Circle ref={userQueryRef}>
                <div className="bg-blue-100 px-5 rounded-sm">{searchText}</div>
              </Circle>
              <AnimatedBeam
                containerRef={outerContainerRef}
                fromRef={userIconRef}
                toRef={userQueryRef}
                duration={5}
              />
              <div
                className="flex flex-col w-full gap-5 relative"
                ref={mainContainerRef}
              >
                <div
                  className="w-full max-w-2xl flex justify-around mx-auto relative border border-dashed border-black rounded-3xl p-5 z-10 bg-[#faf9f5]"
                  ref={containerRef}
                >
                  <div className="absolute -top-3 left-4 px-2 bg-[#faf9f5] font-medium z-20 flex items-center gap-2">
                    <LoopIcon />
                    <BoxReveal boxColor={"#5046e6"} duration={0.5} key={round}>
                      <>Round: {round}</>
                    </BoxReveal>
                  </div>
                  {/* Render the circles first */}
                  {providers.map(({ id, icon }) => (
                    <div key={id} className="flex justify-center items-center">
                      {id === provider ? (
                        <Circle ref={getModelRef(id)}>
                          <div className="relative w-16 h-16 rounded-full">
                            <ShineBorder
                              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                              borderWidth={8}
                              duration={1}
                            />
                            <img
                              src={icon}
                              className="w-16 h-16 rounded-full bg-blue-100 p-3"
                            />
                          </div>
                        </Circle>
                      ) : (
                        <Circle ref={getModelRef(id)}>
                          <img
                            src={icon}
                            className="w-16 h-16 rounded-full bg-blue-100 p-3"
                          />
                        </Circle>
                      )}
                      <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={div1Ref}
                        toRef={div2Ref}
                        duration={5}
                      />
                      <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={div2Ref}
                        toRef={div3Ref}
                        duration={5}
                      />
                    </div>
                  ))}
                </div>
                <div
                  className="w-full max-w-2xl flex justify-center mx-auto relative"
                  ref={consensusContainerRef}
                >
                  <div className="z-10 bg-blue-100 flex justify-center items-center rounded-3xl relative px-5">
                    {provider === Provider.xAI && (
                      <ShineBorder
                        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                        borderWidth={8}
                        duration={1}
                      />
                    )}
                    <img src={XAISvg} className="rounded-full p-3 h-16 w-16" />
                    <span>Consensus Engine</span>
                  </div>
                </div>
                <AnimatedBeam
                  containerRef={mainContainerRef}
                  fromRef={containerRef}
                  toRef={consensusContainerRef}
                  startXOffset={-10}
                  endXOffset={-10}
                  duration={5}
                />
                <AnimatedBeam
                  containerRef={mainContainerRef}
                  fromRef={containerRef}
                  toRef={consensusContainerRef}
                  startXOffset={10}
                  endXOffset={10}
                  duration={5}
                  reverse
                />
              </div>
              <AnimatedBeam
                containerRef={outerContainerRef}
                fromRef={userIconRef}
                toRef={mainContainerRef}
                duration={5}
              />
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="w-full md:w-3/6 h-[60vh] overflow-y-scroll border border-dashed border-black rounded-3xl p-5">
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
        )}
      </div>
    </div>
  );
}
