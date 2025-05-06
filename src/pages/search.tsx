import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobeIcon } from "@radix-ui/react-icons";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useState, useRef, forwardRef, useEffect } from "react";
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
import { LoopIcon, Share2Icon, DownloadIcon } from "@radix-ui/react-icons";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { v4 as randomUUID } from "uuid";
import { motion } from "motion/react";
import axios from "axios";

export function SearchPage() {
  const [items, setItems] = useState<DebateHistory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [researching, setResearching] = useState<boolean>(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [round, setRound] = useState<number>(1);
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const ROUNDS = 3;

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

  const handleDownload = async () => {
    let consensus: string = "";
    for (const item of items) {
      if (item.type === "TextResponse" && item.response) {
        consensus = item.response;
      }
    }
    consensus = consensus.replace("\n", "\n\n");
    const content = { content: consensus }; // Adjust content as needed
    const response = await fetch(
      "https://genie.hemenparekh.ai/genie/download",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${randomUUID()}.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}test/log-share`);
    // Get the consensus text from items
    let consensus = "";

    for (const item of items) {
      if (item.type === "TextResponse" && item.response) {
        consensus = item.response;
      }
    }

    // Create message with context about IndiaAGI.ai
    const messagePrefix =
      "I posed following question to www.IndiaAGI.ai, And got a very useful answer shown below";

    const fullMessage =
      messagePrefix + "\n\n" + searchText + "\n\n" + consensus;

    // URL encode the message
    const encodedText = encodeURIComponent(fullMessage);

    // Create the WhatsApp share URL
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const tooltipSetting = localStorage.getItem("showToolTip");

    if (tooltipSetting === null) {
      localStorage.setItem("showToolTip", "true");
      setToolTipVisible(true);
    } else {
      setToolTipVisible(tooltipSetting === "true");
    }
  }, []);

  const handleTooltipDismiss = () => {
    setToolTipVisible(false);
  };

  useEffect(() => {
    const tooltipSetting = localStorage.getItem("showToolTip");
    if (searchText.length > 0) {
      setToolTipVisible(false);
    } else {
      setToolTipVisible(tooltipSetting === "true");
    }
  }, [searchText]);

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
    if (searchText.length === 0) {
      return;
    }

    setResearching(true);
    setItems([]);
    setProvider(Provider.OpenAI);
    setRound(1);

    localStorage.setItem("showToolTip", "false");
    setToolTipVisible(false);

    try {
      const eventSource = new EventSource(
        `${
          import.meta.env.VITE_API_BASE_URL
        }test/sse?question=${encodeURIComponent(searchText)}&rounds=${ROUNDS}`
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
          if (historyItem.roundNumber === ROUNDS) {
            const finalConsensusButtons: DebateHistory = {
              type: "FinalConsensusButtons",
              model: "xAI",
            };
            setItems((prevVal) => [...prevVal, finalConsensusButtons]);
          } else {
            setRound(historyItem.roundNumber + 1);
          }
        } else if (historyItem.type !== "ProviderUpdate") {
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
      <div className="relative flex flex-col items-center space-x-2 space-y-2 md:flex-row md:space-y-0">
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
          autoFocus
        />

        {toolTipVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 z-20"
          >
            <div className="w-full">
              <div className="bg-blue-600 text-white p-3 rounded-lg shadow-lg max-w-xs">
                <p className="font-medium text-sm mb-2">
                  Experience AI collaboration in action!
                </p>
                <p className="text-xs mb-3">
                  Ask a question to see Claude, ChatGPT, Gemini and Grok discuss
                  your query and provide a consensus answer.
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleTooltipDismiss}
                    className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-medium hover:cursor-pointer"
                  >
                    Okay
                  </button>
                </div>
              </div>
              {/* Tooltip Arrow */}
              <div className="w-4 h-4 bg-blue-600 transform rotate-45 absolute left-1/2 -top-2 -ml-2"></div>
            </div>
          </motion.div>
        )}

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
              <div className="bg-blue-100 px-5 rounded-sm max-h-20 overflow-y-scroll">
                {searchText}
              </div>
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
        </div>

        {items.length > 0 && (
          <div className="w-full md:w-3/6 h-[60vh] overflow-y-scroll border border-dashed border-black rounded-3xl p-5">
            <AnimatedList>
              {items.map((item, index) => {
                let content;

                switch (item.type) {
                  case "RoundUpdate":
                    content = (
                      <Divider
                        label={`Round ${item.roundNumber} ended ...`}
                        dotted={false}
                      />
                    );
                    break;
                  case "FinalConsensusButtons":
                    content = (
                      <div className="grid grid-cols-2 gap-4">
                        <InteractiveHoverButton onClick={handleDownload}>
                          <span className="flex items-center gap-2">
                            Download <DownloadIcon />
                          </span>
                        </InteractiveHoverButton>
                        <InteractiveHoverButton onClick={handleShare}>
                          <span className="flex items-center gap-2">
                            Share <Share2Icon />
                          </span>
                        </InteractiveHoverButton>
                      </div>
                    );
                    break;
                  default:
                    content = <ExpandableCard item={item} />;
                }

                return <React.Fragment key={index}>{content}</React.Fragment>;
              })}
            </AnimatedList>
          </div>
        )}
      </div>
    </div>
  );
}
