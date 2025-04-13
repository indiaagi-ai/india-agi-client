import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobeIcon } from "@radix-ui/react-icons";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useState } from "react";
import { DebateHistory } from "@/interfaces";
import { ExpandableCard } from "@/components/expandable-card";
import axios, { AxiosResponse } from "axios";
import { SearchRequestDto } from "@/interfaces/search-request.dto";
import { Spinner } from "@/components/ui/spinner";

export function SearchPage() {
  const [items, setItems] = useState<DebateHistory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [researching, setResearching] = useState<boolean>(false);

  const research = async () => {
    setResearching(true);
    const searchRequestBody: SearchRequestDto = {
      question: searchText,
      rounds: 2,
    };
    try {
      const searchResponse: AxiosResponse<DebateHistory[]> = await axios.post(
        "http://localhost:4000/test/collaborative-llm",
        searchRequestBody
      );
      setItems(searchResponse.data);
    } catch (e) {
      console.error(e);
    } finally {
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
            <ExpandableCard key={index} item={item} />
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
