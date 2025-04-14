import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobeIcon } from "@radix-ui/react-icons";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useState } from "react";
import { DebateHistory } from "@/interfaces";
import { ExpandableCard } from "@/components/expandable-card";
// import axios, { AxiosResponse } from "axios";
// import { SearchRequestDto } from "@/interfaces/search-request.dto";
import { Spinner } from "@/components/ui/spinner";
import { ShineBorder } from "@/components/magicui/shine-border";
import React from "react";

export function SearchPage() {
  const [items, setItems] = useState<DebateHistory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [researching, setResearching] = useState<boolean>(false);

  const research = async () => {
    setResearching(true);
    setItems([]);

    try {
      const eventSource = new EventSource(
        `http://localhost:4000/test/sse?question=${encodeURIComponent(
          searchText
        )}&rounds=2`
      );

      // Handle messages
      eventSource.onmessage = ({ data }) => {
        const historyItem: DebateHistory = JSON.parse(data);
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
